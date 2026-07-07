import { EventEmitter } from 'events';
import crypto from 'crypto';
import { AIServiceManager, createAIMessage } from '../../services/ai/ai-model-abstraction';
import { ToolExecutor } from '../tool-executor';
import { AgentTool } from '../../services/ai-agent-service';
import {
  LoopState, LoopResult, LoopIterationResult,
  LoopContext, PlanningConfig, LoopStatus, ToolResult,
  DEFAULT_PLANNING_CONFIG
} from './types';

interface SubTask {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: string;
  error?: string;
  assignedTool?: string;
  dependsOn: string[];
}

export class PlanningLoop extends EventEmitter {
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
    config: PlanningConfig = DEFAULT_PLANNING_CONFIG
  ): Promise<LoopResult> {
    const loopId = crypto.randomUUID();
    const startTime = Date.now();
    const mergedConfig = { ...DEFAULT_PLANNING_CONFIG, ...config };
    const iterations: LoopIterationResult[] = [];
    let totalTokensUsed = 0;
    let totalLatency = 0;
    let status: LoopStatus = 'running';

    const loopState: LoopState = {
      id: loopId,
      type: 'planning',
      status: 'running',
      iteration: 0,
      messages: [createAIMessage('system', systemPrompt)],
      toolResults: [],
      accumulatedOutput: '',
      startTime,
      metadata: { ...context.metadata },
    };
    this.activeLoops.set(loopId, loopState);

    try {
      this.emit('loop:planning_started', { loopId });

      const decomposition = await this.decomposeTask(systemPrompt, userInput, tools, mergedConfig);
      const subTasks = decomposition.subTasks;
      totalTokensUsed += decomposition.tokensUsed;

      iterations.push({
        iteration: 1,
        thought: 'Task decomposition plan',
        output: JSON.stringify(subTasks.map(s => ({ id: s.id, name: s.name, description: s.description, dependsOn: s.dependsOn })), null, 2),
        tokensUsed: decomposition.tokensUsed,
        latency: decomposition.latency,
      });

      loopState.accumulatedOutput = `Plan: ${subTasks.length} sub-tasks identified.\n`;

      const executionResults: string[] = [];
      let allSucceeded = true;

      for (let i = 0; i < mergedConfig.maxIterations && allSucceeded; i++) {
        this.emit('loop:execution_phase', { loopId, phase: i + 1 });

        const readyTasks = this.getReadyTasks(subTasks);
        if (readyTasks.length === 0 && subTasks.every(s => s.status === 'completed')) {
          break;
        }

        for (const task of readyTasks) {
          task.status = 'running';
          this.emit('loop:task_started', { loopId, taskId: task.id, taskName: task.name });

          const result = await this.executeTask(task, systemPrompt, tools, context, mergedConfig);
          totalTokensUsed += result.tokensUsed;

          task.status = result.success ? 'completed' : 'failed';
          task.result = result.output;
          task.error = result.error;

          executionResults.push(`[${task.status.toUpperCase()}] ${task.name}: ${result.output.substring(0, 200)}`);

          this.emit('loop:task_completed', {
            loopId,
            taskId: task.id,
            taskName: task.name,
            status: task.status,
          });

          iterations.push({
            iteration: iterations.length + 1,
            thought: `Executing task: ${task.name}`,
            action: task.assignedTool,
            output: result.output,
            toolResults: result.toolResults,
            tokensUsed: result.tokensUsed,
            latency: result.latency,
          });

          if (task.status === 'failed' && mergedConfig.replanOnFailure) {
            const replanResult = await this.replanTask(task, systemPrompt, userInput, tools, mergedConfig);
            totalTokensUsed += replanResult.tokensUsed;
            if (replanResult.alternativeApproach) {
              task.description = replanResult.alternativeApproach;
              task.status = 'pending';
            }
          }

          if (task.status === 'failed' && !mergedConfig.replanOnFailure) {
            allSucceeded = false;
            break;
          }
        }
      }

      const failedTasks = subTasks.filter(s => s.status === 'failed');
      status = failedTasks.length > 0 && !mergedConfig.replanOnFailure ? 'failed' : 'completed';

      this.emit('loop:synthesizing', { loopId });

      const synthesis = await this.synthesizeResults(systemPrompt, userInput, subTasks, mergedConfig);
      totalTokensUsed += synthesis.tokensUsed;

      const finalOutput = synthesis.output;

      iterations.push({
        iteration: iterations.length + 1,
        thought: 'Synthesizing final results from all completed tasks',
        output: finalOutput,
        tokensUsed: synthesis.tokensUsed,
        latency: synthesis.latency,
      });

      loopState.accumulatedOutput = finalOutput;

      const result: LoopResult = {
        success: status === 'completed',
        finalOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        loopType: 'planning',
        iterationsCount: iterations.length,
      };

      loopState.status = status;
      loopState.endTime = Date.now();

      this.emit('loop:completed', { loopId, result });
      return result;

    } catch (err) {
      status = 'failed';
      loopState.status = status;
      loopState.endTime = Date.now();
      loopState.error = err instanceof Error ? err.message : 'Planning loop failed';

      return {
        success: false,
        finalOutput: loopState.accumulatedOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        error: loopState.error,
        loopType: 'planning',
        iterationsCount: iterations.length,
      };
    } finally {
      this.activeLoops.delete(loopId);
    }
  }

  private async decomposeTask(
    systemPrompt: string,
    userInput: string,
    tools: AgentTool[],
    config: PlanningConfig
  ): Promise<{ subTasks: SubTask[]; tokensUsed: number; latency: number }> {
    const startTime = Date.now();

    const toolMap = tools.map(t => `- ${t.name}: ${t.description}`).join('\n');

    const decomposeMessages = [
      createAIMessage('system', `You are a task decomposition planner. Break down complex tasks into sub-tasks.

Available tools:
${toolMap || 'No tools available'}

Respond in JSON format ONLY:
{
  "subTasks": [
    {
      "id": "step-1",
      "name": "short name",
      "description": "detailed description of what to do",
      "assignedTool": "tool_name or null if no tool needed",
      "dependsOn": ["step-id"] // IDs of tasks that must complete first
    }
  ]
}

Rules:
- Max ${config.maxSubTasks || 8} sub-tasks
- Each task should be atomic and focused
- Identify dependencies between tasks
- Only assign tools that are available
- If a task needs a tool, assign it; otherwise set assignedTool to null`),
      createAIMessage('user', userInput),
    ];

    const response = await this.aiService.chat(decomposeMessages, config.model);
    const latency = Date.now() - startTime;

    let subTasks: SubTask[] = [];
    try {
      const jsonMatch = response.content.match(/```json\s*([\s\S]*?)\s*```/) || response.content.match(/\{[\s\S]*"subTasks"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        subTasks = (parsed.subTasks || []).map((st: any, idx: number) => ({
          id: st.id || `step-${idx + 1}`,
          name: st.name || `Step ${idx + 1}`,
          description: st.description || '',
          status: 'pending' as const,
          assignedTool: st.assignedTool || undefined,
          dependsOn: st.dependsOn || [],
        }));
      }
    } catch {
      subTasks = this.fallbackDecompose(userInput);
    }

    if (subTasks.length === 0) {
      subTasks = this.fallbackDecompose(userInput);
    }

    return { subTasks, tokensUsed: response.usage?.totalTokens || 0, latency };
  }

  private fallbackDecompose(userInput: string): SubTask[] {
    return [
      {
        id: 'step-1',
        name: 'Analyze request',
        description: `Analyze and understand the user's request: ${userInput.substring(0, 200)}`,
        status: 'pending',
        dependsOn: [],
      },
      {
        id: 'step-2',
        name: 'Execute primary action',
        description: 'Execute the primary action based on analysis',
        status: 'pending',
        dependsOn: ['step-1'],
      },
      {
        id: 'step-3',
        name: 'Verify and finalize',
        description: 'Verify results and produce final output',
        status: 'pending',
        dependsOn: ['step-2'],
      },
    ];
  }

  private getReadyTasks(subTasks: SubTask[]): SubTask[] {
    const completedIds = new Set(
      subTasks.filter(s => s.status === 'completed').map(s => s.id)
    );

    return subTasks.filter(s => {
      if (s.status !== 'pending') return false;
      return s.dependsOn.every(depId => completedIds.has(depId));
    });
  }

  private async executeTask(
    task: SubTask,
    systemPrompt: string,
    tools: AgentTool[],
    context: LoopContext,
    config: PlanningConfig
  ): Promise<{ success: boolean; output: string; error?: string; tokensUsed: number; latency: number; toolResults?: ToolResult[] }> {
    const startTime = Date.now();
    const toolResults: ToolResult[] = [];

    try {
      if (task.assignedTool && tools.length > 0) {
        const tool = tools.find(t => t.name === task.assignedTool);
        if (tool) {
          const executeMessages = [
            createAIMessage('system', `You are executing this task: ${task.name}\n${task.description}`),
            createAIMessage('user', `Execute the tool "${task.assignedTool}" with appropriate parameters to complete this task.`),
          ];

          const response = await this.aiService.chat(executeMessages, config.model);

          const toolContext = {
            agentId: context.agentId,
            sessionId: context.sessionId,
            organizationId: context.organizationId,
            userId: context.userId,
            aiResponse: response.content,
            metadata: context.metadata,
          };

          const toolResult = await this.toolExecutor.executeTool(tool, toolContext);
          toolResults.push({
            toolName: tool.name,
            input: response.content,
            output: toolResult.result,
            success: toolResult.success,
            error: toolResult.error,
            duration: Date.now() - startTime,
          });

          return {
            success: toolResult.success,
            output: toolResult.success
              ? `Tool executed: ${task.name}\nResult: ${JSON.stringify(toolResult.result)}`
              : `Tool failed: ${toolResult.error}`,
            error: toolResult.error,
            tokensUsed: response.usage?.totalTokens || 0,
            latency: Date.now() - startTime,
            toolResults,
          };
        }
      }

      const executeMessages = [
        createAIMessage('system', `${systemPrompt}\n\nYou are executing this specific sub-task:\nTask: ${task.name}\nDescription: ${task.description}`),
        createAIMessage('user', `Complete this sub-task based on the overall goal.`),
      ];

      const response = await this.aiService.chat(executeMessages, config.model);

      return {
        success: true,
        output: response.content,
        tokensUsed: response.usage?.totalTokens || 0,
        latency: Date.now() - startTime,
        toolResults,
      };
    } catch (err) {
      return {
        success: false,
        output: '',
        error: err instanceof Error ? err.message : 'Task execution failed',
        tokensUsed: 0,
        latency: Date.now() - startTime,
      };
    }
  }

  private async replanTask(
    failedTask: SubTask,
    systemPrompt: string,
    userInput: string,
    tools: AgentTool[],
    config: PlanningConfig
  ): Promise<{ alternativeApproach?: string; tokensUsed: number }> {
    const startTime = Date.now();

    const replanMessages = [
      createAIMessage('system', `The following sub-task failed:
Task: ${failedTask.name}
Description: ${failedTask.description}
Error: ${failedTask.error}

Suggest an alternative approach or a different way to accomplish this task's goal.
Be specific and practical.`),
      createAIMessage('user', userInput),
    ];

    const response = await this.aiService.chat(replanMessages, config.model);

    return {
      alternativeApproach: response.content,
      tokensUsed: response.usage?.totalTokens || 0,
    };
  }

  private async synthesizeResults(
    systemPrompt: string,
    userInput: string,
    subTasks: SubTask[],
    config: PlanningConfig
  ): Promise<{ output: string; tokensUsed: number; latency: number }> {
    const startTime = Date.now();

    const taskResults = subTasks.map(s =>
      `Task: ${s.name}
Status: ${s.status}
Result: ${s.result || 'N/A'}
${s.error ? `Error: ${s.error}` : ''}`
    ).join('\n\n---\n\n');

    const synthesisMessages = [
      createAIMessage('system', `${systemPrompt}\n\nYou are synthesizing the results of multiple sub-tasks into a coherent final response.`),
      createAIMessage('user', `Original request: ${userInput}\n\nSub-task results:\n${taskResults}\n\nSynthesize these results into a comprehensive, well-structured final response.`),
    ];

    const response = await this.aiService.chat(synthesisMessages, config.model);

    return {
      output: response.content,
      tokensUsed: response.usage?.totalTokens || 0,
      latency: Date.now() - startTime,
    };
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
