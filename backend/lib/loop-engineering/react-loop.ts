import { EventEmitter } from 'events';
import crypto from 'crypto';
import { AIServiceManager, AIMessage, AIResponse, createAIMessage } from '../../services/ai/ai-model-abstraction';
import { ToolExecutor } from '../tool-executor';
import { AgentTool } from '../../services/ai-agent-service';
import {
  LoopState, LoopResult, LoopIterationResult, ToolResult,
  LoopContext, ReActConfig, LoopStatus,
  DEFAULT_REACT_CONFIG
} from './types';

export class ReActLoop extends EventEmitter {
  private aiService: AIServiceManager;
  private toolExecutor: ToolExecutor;
  private activeLoops = new Map<string, LoopState>();

  constructor(aiService: AIServiceManager, toolExecutor: ToolExecutor) {
    super();
    this.aiService = aiService;
    this.toolExecutor = toolExecutor;
  }

  async execute(
    systemPrompt: string,
    userInput: string,
    tools: AgentTool[],
    context: LoopContext,
    config: ReActConfig = DEFAULT_REACT_CONFIG
  ): Promise<LoopResult> {
    const loopId = crypto.randomUUID();
    const startTime = Date.now();
    const mergedConfig = { ...DEFAULT_REACT_CONFIG, ...config };
    const iterations: LoopIterationResult[] = [];
    let totalTokensUsed = 0;
    let totalLatency = 0;
    let finalOutput = '';
    let status: LoopStatus = 'running';

    const toolDescriptions = this.buildToolDescriptions(tools);
    const reactSystemPrompt = this.buildReActPrompt(systemPrompt, toolDescriptions);

    const messages: AIMessage[] = [
      createAIMessage('system', reactSystemPrompt),
      createAIMessage('user', userInput),
    ];

    const loopState: LoopState = {
      id: loopId,
      type: 'react',
      status: 'running',
      iteration: 0,
      messages,
      toolResults: [],
      accumulatedOutput: '',
      startTime,
      metadata: { ...context.metadata },
    };
    this.activeLoops.set(loopId, loopState);

    try {
      for (let i = 0; i < mergedConfig.maxIterations; i++) {
        loopState.iteration = i + 1;
        const iterStart = Date.now();

        this.emit('loop:iteration', { loopId, iteration: i + 1, maxIterations: mergedConfig.maxIterations });

        let response: AIResponse;
        try {
          response = await this.aiService.chat(messages, mergedConfig.model);
        } catch (err) {
          const iterResult: LoopIterationResult = {
            iteration: i + 1,
            error: err instanceof Error ? err.message : 'AI call failed',
            tokensUsed: 0,
            latency: Date.now() - iterStart,
          };
          iterations.push(iterResult);
          status = 'failed';
          break;
        }

        const latency = Date.now() - iterStart;
        totalTokensUsed += response.usage?.totalTokens || 0;
        totalLatency += latency;

        const parsed = this.parseResponse(response.content, mergedConfig.toolCallFormat);
        const iterResult: LoopIterationResult = {
          iteration: i + 1,
          thought: parsed.thought,
          action: parsed.action,
          actionInput: parsed.actionInput,
          output: parsed.finalAnswer || response.content,
          tokensUsed: response.usage?.totalTokens || 0,
          latency,
        };

        messages.push(createAIMessage('assistant', response.content));

        if (parsed.finalAnswer) {
          finalOutput = parsed.finalAnswer;
          iterations.push(iterResult);
          status = 'completed';
          break;
        }

        if (parsed.action && tools.length > 0) {
          const tool = tools.find(t => t.name === parsed.action);
          if (tool) {
            const toolResult = await this.executeTool(tool, parsed.actionInput, context, loopId);
            iterResult.toolResults = [toolResult];
            loopState.toolResults.push(toolResult);

            const observationMsg = this.formatToolObservation(tool.name, toolResult);
            messages.push(createAIMessage('user', observationMsg));
          } else {
            const unknownToolMsg = `Tool "${parsed.action}" is not available. Available tools: ${tools.map(t => t.name).join(', ')}`;
            messages.push(createAIMessage('user', unknownToolMsg));
          }
        }

        iterations.push(iterResult);

        if (this.shouldStopEarly(mergedConfig, loopState)) {
          status = 'completed';
          break;
        }

        this.emit('loop:progress', {
          loopId,
          iteration: i + 1,
          thought: parsed.thought,
          action: parsed.action,
          messageCount: messages.length,
        });
      }

      if (status === 'running') {
        status = 'max_iterations_reached';
        finalOutput = finalOutput || iterations[iterations.length - 1]?.output || 'Max iterations reached without final answer.';
      }

      const result: LoopResult = {
        success: status === 'completed',
        finalOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        loopType: 'react',
        iterationsCount: iterations.length,
      };

      loopState.status = status;
      loopState.endTime = Date.now();
      loopState.accumulatedOutput = finalOutput;

      this.emit('loop:completed', { loopId, result });
      return result;

    } catch (err) {
      status = 'failed';
      loopState.status = status;
      loopState.endTime = Date.now();
      loopState.error = err instanceof Error ? err.message : 'Loop execution failed';

      return {
        success: false,
        finalOutput: '',
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        error: loopState.error,
        loopType: 'react',
        iterationsCount: iterations.length,
      };
    } finally {
      this.activeLoops.delete(loopId);
    }
  }

  private buildReActPrompt(systemPrompt: string, toolDescriptions: string): string {
    return `${systemPrompt}

You are running in a ReAct (Reasoning + Acting) loop. You must think step by step and decide whether to use a tool or provide a final answer.

${toolDescriptions}

FORMAT:
You MUST respond in the following JSON format:
\`\`\`json
{
  "thought": "Your step-by-step reasoning about what to do next",
  "action": "tool_name", // or null if you have the final answer
  "actionInput": { "param1": "value1" }, // parameters for the tool, or null
  "finalAnswer": "Your final response to the user" // or null if using a tool
}
\`\`\`

RULES:
1. First, think about what you need to do.
2. If you need information or want to perform an action, use a tool.
3. After receiving tool results, incorporate them into your reasoning.
4. When you have enough information, provide a final answer.
5. NEVER make up tool results - only use actual tool outputs.
6. If a tool fails, try a different approach or tool.`;
  }

  private buildToolDescriptions(tools: AgentTool[]): string {
    if (!tools || tools.length === 0) {
      return 'No tools are available. You must answer based on your knowledge alone.';
    }

    return `AVAILABLE TOOLS:
${tools.map(t => {
  const paramsStr = t.parameters ? Object.entries(t.parameters).map(([k, v]) => `    - ${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`).join('\n') : '    (no parameters)';
  return `  - ${t.name}: ${t.description}
    Parameters:
${paramsStr}`;
}).join('\n')}`;
  }

  private parseResponse(content: string, format?: string): {
    thought?: string;
    action?: string;
    actionInput?: any;
    finalAnswer?: string;
  } {
    if (!content) return {};

    if (format === 'json') {
      try {
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*"thought"[\s\S]*"finalAnswer"[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          return {
            thought: parsed.thought,
            action: parsed.action || null,
            actionInput: parsed.actionInput || null,
            finalAnswer: parsed.finalAnswer || null,
          };
        }
      } catch {
        // Fall through to text parsing
      }
    }

    const thoughtMatch = content.match(/Thought:\s*(.+?)(?:\n|$)/i);
    const actionMatch = content.match(/Action:\s*(\w+)/i);
    const actionInputMatch = content.match(/Action Input:\s*(\{[\s\S]*?\}|`[^`]+`|"[^"]+")/i);
    const finalMatch = content.match(/Final Answer:\s*([\s\S]*)/i);

    let actionInput: any = undefined;
    if (actionInputMatch) {
      try {
        actionInput = JSON.parse(actionInputMatch[1]);
      } catch {
        actionInput = actionInputMatch[1].replace(/^`|`$/g, '').replace(/^"|"$/g, '');
      }
    }

    return {
      thought: thoughtMatch?.[1]?.trim(),
      action: actionMatch?.[1]?.trim(),
      actionInput,
      finalAnswer: finalMatch?.[1]?.trim(),
    };
  }

  private async executeTool(
    tool: AgentTool,
    input: any,
    context: LoopContext,
    loopId: string
  ): Promise<ToolResult> {
    const startTime = Date.now();
    try {
      const toolContext = {
        agentId: context.agentId,
        sessionId: context.sessionId,
        organizationId: context.organizationId,
        userId: context.userId,
        aiResponse: typeof input === 'string' ? input : JSON.stringify(input),
        metadata: context.metadata,
      };

      const result = await this.toolExecutor.executeTool(tool, toolContext);

      this.emit('loop:tool_executed', {
        loopId,
        toolName: tool.name,
        success: result.success,
        duration: Date.now() - startTime,
      });

      return {
        toolName: tool.name,
        input,
        output: result.result || result.error,
        success: result.success,
        error: result.error,
        duration: Date.now() - startTime,
      };
    } catch (err) {
      return {
        toolName: tool.name,
        input,
        output: null,
        success: false,
        error: err instanceof Error ? err.message : 'Tool execution failed',
        duration: Date.now() - startTime,
      };
    }
  }

  private formatToolObservation(toolName: string, result: ToolResult): string {
    if (result.success) {
      return `[TOOL RESULT: ${toolName}]
\`\`\`
${typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)}
\`\`\`

Continue your reasoning. Decide if you need another tool or if you can provide a final answer.`;
    }

    return `[TOOL RESULT: ${toolName} - FAILED]
Error: ${result.error}

Try a different approach or use a different tool to achieve your goal.`;
  }

  private shouldStopEarly(config: ReActConfig, state: LoopState): boolean {
    if (config.stopConditions) {
      for (const condition of config.stopConditions) {
        if (condition.type === 'max_iterations' && state.iteration >= (condition.value || config.maxIterations)) {
          return true;
        }
        if (condition.type === 'tool_complete' && condition.evaluate) {
          return condition.evaluate(state);
        }
        if (condition.type === 'custom' && condition.evaluate) {
          return condition.evaluate(state);
        }
      }
    }
    return false;
  }

  getActiveLoop(loopId: string): LoopState | undefined {
    return this.activeLoops.get(loopId);
  }

  cancelLoop(loopId: string): boolean {
    const loop = this.activeLoops.get(loopId);
    if (loop) {
      loop.status = 'cancelled';
      loop.endTime = Date.now();
      this.emit('loop:cancelled', { loopId });
      return true;
    }
    return false;
  }

  getActiveLoopCount(): number {
    return this.activeLoops.size;
  }
}
