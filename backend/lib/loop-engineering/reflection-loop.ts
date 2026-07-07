import { EventEmitter } from 'events';
import crypto from 'crypto';
import { AIServiceManager, createAIMessage } from '../../services/ai/ai-model-abstraction';
import {
  LoopState, LoopResult, LoopIterationResult,
  LoopContext, ReflectionConfig, SelfCritiqueConfig, LoopStatus,
  DEFAULT_REFLECTION_CONFIG, DEFAULT_SELF_CRITIQUE_CONFIG
} from './types';

const DEFAULT_CRITIQUE_PROMPT = `Review your response above critically. Identify:
1. Inaccuracies or errors in facts, logic, or reasoning
2. Missing information that would make the response more complete
3. Areas where the response could be clearer or more actionable
4. Assumptions you made that might not be valid

Provide a structured critique. Be honest and thorough.`;

const DEFAULT_IMPROVEMENT_PROMPT = `Based on the critique above, produce an improved version of your response.
Address EVERY issue raised in the critique.
The improved response should be complete and standalone.`;

export class ReflectionLoop extends EventEmitter {
  private aiService: AIServiceManager;
  private activeLoops = new Map<string, LoopState>();

  constructor(aiService: AIServiceManager) {
    super();
    this.aiService = aiService;
  }

  async execute(
    systemPrompt: string,
    userInput: string,
    context: LoopContext,
    config: ReflectionConfig = DEFAULT_REFLECTION_CONFIG
  ): Promise<LoopResult> {
    const loopId = crypto.randomUUID();
    const startTime = Date.now();
    const mergedConfig = { ...DEFAULT_REFLECTION_CONFIG, ...config };
    const iterations: LoopIterationResult[] = [];
    let totalTokensUsed = 0;
    let totalLatency = 0;
    let currentOutput = '';
    let status: LoopStatus = 'running';

    const loopState: LoopState = {
      id: loopId,
      type: 'reflection',
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
      const initialMessages = [createAIMessage('system', systemPrompt), createAIMessage('user', userInput)];

      this.emit('loop:generating_initial', { loopId });

      const initialResponse = await this.aiService.chat(initialMessages, mergedConfig.model);
      currentOutput = initialResponse.content;
      totalTokensUsed += initialResponse.usage?.totalTokens || 0;
      totalLatency += initialResponse.latency || 0;

      iterations.push({
        iteration: 1,
        output: currentOutput,
        thought: 'Initial generation',
        tokensUsed: initialResponse.usage?.totalTokens || 0,
        latency: initialResponse.latency || 0,
      });

      loopState.accumulatedOutput = currentOutput;

      for (let i = 2; i <= mergedConfig.maxIterations; i++) {
        this.emit('loop:reflection_iteration', { loopId, iteration: i, maxIterations: mergedConfig.maxIterations });

        loopState.iteration = i;
        const iterStart = Date.now();

        const critiqueMessages = [
          createAIMessage('system', systemPrompt),
          createAIMessage('user', userInput),
          createAIMessage('assistant', currentOutput),
          createAIMessage('user', mergedConfig.critiquePrompt || DEFAULT_CRITIQUE_PROMPT),
        ];

        const critiqueResponse = await this.aiService.chat(critiqueMessages, mergedConfig.model);
        totalTokensUsed += critiqueResponse.usage?.totalTokens || 0;

        const improvementMessages = [
          createAIMessage('system', systemPrompt),
          createAIMessage('user', userInput),
          createAIMessage('assistant', `Previous version:\n${currentOutput}\n\nCritique:\n${critiqueResponse.content}`),
          createAIMessage('user', mergedConfig.improvementPrompt || DEFAULT_IMPROVEMENT_PROMPT),
        ];

        const improvedResponse = await this.aiService.chat(improvementMessages, mergedConfig.model);
        totalTokensUsed += improvedResponse.usage?.totalTokens || 0;
        totalLatency += Date.now() - iterStart;

        const improved = improvedResponse.content;
        const qualityScore = this.estimateQualityScore(currentOutput, improved);

        iterations.push({
          iteration: i,
          output: improved,
          critique: critiqueResponse.content,
          score: qualityScore,
          tokensUsed: (critiqueResponse.usage?.totalTokens || 0) + (improvedResponse.usage?.totalTokens || 0),
          latency: Date.now() - iterStart,
        });

        if (qualityScore >= (mergedConfig.qualityThreshold || 8)) {
          currentOutput = improved;
          status = 'completed';
          break;
        }

        const noImprovement = improved === currentOutput || this.detectNoImprovement(iterations);
        if (noImprovement) {
          status = 'completed';
          break;
        }

        currentOutput = improved;
        loopState.accumulatedOutput = currentOutput;
      }

      const result: LoopResult = {
        success: true,
        finalOutput: currentOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        loopType: 'reflection',
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
      loopState.error = err instanceof Error ? err.message : 'Reflection loop failed';

      return {
        success: false,
        finalOutput: currentOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        error: loopState.error,
        loopType: 'reflection',
        iterationsCount: iterations.length,
      };
    } finally {
      this.activeLoops.delete(loopId);
    }
  }

  async executeSelfCritique(
    systemPrompt: string,
    userInput: string,
    context: LoopContext,
    config: SelfCritiqueConfig = DEFAULT_SELF_CRITIQUE_CONFIG
  ): Promise<LoopResult> {
    const loopId = crypto.randomUUID();
    const startTime = Date.now();
    const mergedConfig = { ...DEFAULT_SELF_CRITIQUE_CONFIG, ...config };
    const iterations: LoopIterationResult[] = [];
    let totalTokensUsed = 0;
    let totalLatency = 0;
    let currentOutput = '';
    let status: LoopStatus = 'running';

    const loopState: LoopState = {
      id: loopId,
      type: 'self_critique',
      status: 'running',
      iteration: 0,
      messages: [createAIMessage('system', systemPrompt)],
      toolResults: [],
      accumulatedOutput: '',
      startTime,
      metadata: { ...context.metadata },
    };
    this.activeLoops.set(loopId, loopState);

    const criteriaStr = mergedConfig.criteria.map((c, i) => `${i + 1}. ${c}`).join('\n');

    try {
      const initialMessages = [createAIMessage('system', systemPrompt), createAIMessage('user', userInput)];

      this.emit('loop:generating_initial', { loopId });

      const initialResponse = await this.aiService.chat(initialMessages, mergedConfig.model);
      currentOutput = initialResponse.content;
      totalTokensUsed += initialResponse.usage?.totalTokens || 0;
      totalLatency += initialResponse.latency || 0;

      iterations.push({
        iteration: 1,
        output: currentOutput,
        thought: 'Initial generation before self-critique',
        score: 0,
        tokensUsed: initialResponse.usage?.totalTokens || 0,
        latency: initialResponse.latency || 0,
      });

      for (let i = 0; i < mergedConfig.maxRounds; i++) {
        this.emit('loop:self_critique_round', { loopId, round: i + 1, maxRounds: mergedConfig.maxRounds });

        loopState.iteration = i + 2;
        const roundStart = Date.now();

        const evaluateMessages = [
          createAIMessage('system', `You are a strict evaluator. Score the assistant's response on each criterion from 1-10.
Criteria:
${criteriaStr}

Respond in JSON format:
{
  "scores": { "criterion_name": score },
  "averageScore": number,
  "critique": "detailed feedback on what to improve",
  "passed": true/false
}`),
          createAIMessage('user', `Task: ${userInput}`),
          createAIMessage('assistant', currentOutput),
        ];

        const evalResponse = await this.aiService.chat(evaluateMessages, mergedConfig.model);
        totalTokensUsed += evalResponse.usage?.totalTokens || 0;

        const { scores, averageScore, critique, passed } = this.parseEvaluation(evalResponse.content);

        if (passed || averageScore >= mergedConfig.scoreThreshold) {
          iterations.push({
            iteration: i + 2,
            output: currentOutput,
            score: averageScore,
            critique,
            tokensUsed: evalResponse.usage?.totalTokens || 0,
            latency: Date.now() - roundStart,
          });
          status = 'completed';
          break;
        }

        const improveMessages = [
          createAIMessage('system', systemPrompt),
          createAIMessage('user', userInput),
          createAIMessage('assistant', `My previous response:\n${currentOutput}`),
          createAIMessage('user', `Your previous response scored ${averageScore.toFixed(1)}/10. 
Critique: ${critique}

Improve your response to address ALL issues raised. Focus especially on the lowest-scoring criteria.`),
        ];

        const improvedResponse = await this.aiService.chat(improveMessages, mergedConfig.model);
        totalTokensUsed += improvedResponse.usage?.totalTokens || 0;
        totalLatency += Date.now() - roundStart;

        currentOutput = improvedResponse.content;
        loopState.accumulatedOutput = currentOutput;

        iterations.push({
          iteration: i + 2,
          output: currentOutput,
          score: averageScore,
          critique,
          tokensUsed: (evalResponse.usage?.totalTokens || 0) + (improvedResponse.usage?.totalTokens || 0),
          latency: Date.now() - roundStart,
        });

        if (this.detectNoImprovement(iterations.slice(-2))) {
          status = 'completed';
          break;
        }
      }

      if (status === 'running') {
        status = 'max_iterations_reached';
      }

      const result: LoopResult = {
        success: true,
        finalOutput: currentOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        loopType: 'self_critique',
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
      loopState.error = err instanceof Error ? err.message : 'Self-critique loop failed';

      return {
        success: false,
        finalOutput: currentOutput,
        iterations,
        totalTokensUsed,
        totalLatency,
        status,
        error: loopState.error,
        loopType: 'self_critique',
        iterationsCount: iterations.length,
      };
    } finally {
      this.activeLoops.delete(loopId);
    }
  }

  private parseEvaluation(content: string): {
    scores: Record<string, number>;
    averageScore: number;
    critique: string;
    passed: boolean;
  } {
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/\{[\s\S]*"averageScore"[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
        return {
          scores: parsed.scores || {},
          averageScore: parsed.averageScore || 5,
          critique: parsed.critique || 'No critique provided',
          passed: parsed.passed ?? false,
        };
      }
    } catch {
      // Fall through
    }

    const scoreMatch = content.match(/averageScore[:\s]+(\d+(?:\.\d+)?)/i);
    const passedMatch = content.match(/passed[:\s]+(true|false)/i);
    const critiqueMatch = content.match(/critique[:\s]+"([^"]+)"/i) || content.match(/critique[:\s]+'([^']+)'/i);

    return {
      scores: {},
      averageScore: scoreMatch ? parseFloat(scoreMatch[1]) : 5,
      critique: critiqueMatch?.[1] || 'Evaluation parsed from text',
      passed: passedMatch?.[1] === 'true' || false,
    };
  }

  private estimateQualityScore(previous: string, improved: string): number {
    if (improved.length > previous.length * 1.2) return 6;
    if (improved !== previous) return 7;
    return 5;
  }

  private detectNoImprovement(iterations: LoopIterationResult[]): boolean {
    if (iterations.length < 2) return false;
    const last = iterations[iterations.length - 1];
    const prev = iterations[iterations.length - 2];
    if (last.output === prev.output) return true;
    if (last.score !== undefined && prev.score !== undefined && last.score <= prev.score) return true;
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
