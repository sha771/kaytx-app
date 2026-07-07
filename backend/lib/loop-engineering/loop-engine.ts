import { EventEmitter } from 'events';
import crypto from 'crypto';
import { AIServiceManager } from '../../services/ai/ai-model-abstraction';
import { ToolExecutor } from '../tool-executor';
import { AgentTool } from '../../services/ai-agent-service';
import { ReActLoop } from './react-loop';
import { ReflectionLoop } from './reflection-loop';
import { PlanningLoop } from './planning-loop';
import {
  LoopType, LoopResult, LoopContext,
  LoopConfig, LoopState,
  ReActConfig, ReflectionConfig, SelfCritiqueConfig, PlanningConfig,
  DEFAULT_REACT_CONFIG, DEFAULT_REFLECTION_CONFIG,
  DEFAULT_SELF_CRITIQUE_CONFIG, DEFAULT_PLANNING_CONFIG
} from './types';

export interface LoopRequest {
  type: LoopType;
  systemPrompt: string;
  userInput: string;
  tools?: AgentTool[];
  context: LoopContext;
  config?: LoopConfig;
}

export class LoopEngine extends EventEmitter {
  private reactLoop: ReActLoop;
  private reflectionLoop: ReflectionLoop;
  private planningLoop: PlanningLoop;
  private activeLoops = new Map<string, { type: LoopType; state: LoopState }>();

  constructor(aiService: AIServiceManager, toolExecutor: ToolExecutor) {
    super();
    this.reactLoop = new ReActLoop(aiService, toolExecutor);
    this.reflectionLoop = new ReflectionLoop(aiService);
    this.planningLoop = new PlanningLoop(aiService, toolExecutor);

    this.forwardEvents(this.reactLoop, 'react');
    this.forwardEvents(this.reflectionLoop, 'reflection');
    this.forwardEvents(this.planningLoop, 'planning');
  }

  async execute(request: LoopRequest): Promise<LoopResult> {
    const { type, systemPrompt, userInput, tools, context, config } = request;

    this.emit('loop:started', {
      loopType: type,
      agentId: context.agentId,
      sessionId: context.sessionId,
    });

    switch (type) {
      case 'react':
        return this.executeReAct(systemPrompt, userInput, tools || [], context, config as ReActConfig);
      case 'reflection':
        return this.executeReflection(systemPrompt, userInput, context, config as ReflectionConfig);
      case 'self_critique':
        return this.executeSelfCritique(systemPrompt, userInput, context, config as SelfCritiqueConfig);
      case 'planning':
        return this.executePlanning(systemPrompt, userInput, tools || [], context, config as PlanningConfig);
      case 'tool_use':
        return this.executeReAct(systemPrompt, userInput, tools || [], context, {
          ...DEFAULT_REACT_CONFIG,
          ...config,
          maxIterations: config?.maxIterations || 5,
        } as ReActConfig);
      default:
        return {
          success: false,
          finalOutput: '',
          iterations: [],
          totalTokensUsed: 0,
          totalLatency: 0,
          status: 'failed',
          error: `Unknown loop type: ${type}`,
          loopType: type,
          iterationsCount: 0,
        };
    }
  }

  private async executeReAct(
    systemPrompt: string,
    userInput: string,
    tools: AgentTool[],
    context: LoopContext,
    config?: ReActConfig
  ): Promise<LoopResult> {
    return this.reactLoop.execute(systemPrompt, userInput, tools, context, config);
  }

  private async executeReflection(
    systemPrompt: string,
    userInput: string,
    context: LoopContext,
    config?: ReflectionConfig
  ): Promise<LoopResult> {
    return this.reflectionLoop.execute(systemPrompt, userInput, context, config);
  }

  private async executeSelfCritique(
    systemPrompt: string,
    userInput: string,
    context: LoopContext,
    config?: SelfCritiqueConfig
  ): Promise<LoopResult> {
    return this.reflectionLoop.executeSelfCritique(systemPrompt, userInput, context, config);
  }

  private async executePlanning(
    systemPrompt: string,
    userInput: string,
    tools: AgentTool[],
    context: LoopContext,
    config?: PlanningConfig
  ): Promise<LoopResult> {
    return this.planningLoop.execute(systemPrompt, userInput, tools, context, config);
  }

  cancel(loopId: string): boolean {
    return (
      this.reactLoop.cancelLoop(loopId) ||
      this.reflectionLoop.cancelLoop(loopId) ||
      this.planningLoop.cancelLoop(loopId)
    );
  }

  getActiveLoops(): { loopId: string; type: LoopType }[] {
    const loops: { loopId: string; type: LoopType }[] = [];

    if (this.reactLoop.getActiveLoopCount() > 0) loops.push({ loopId: 'react-active', type: 'react' });
    if (this.reflectionLoop.getActiveLoopCount() > 0) loops.push({ loopId: 'reflection-active', type: 'reflection' });
    if (this.planningLoop.getActiveLoopCount() > 0) loops.push({ loopId: 'planning-active', type: 'planning' });

    return loops;
  }

  getStats(): {
    totalActiveLoops: number;
    reactLoops: number;
    reflectionLoops: number;
    planningLoops: number;
  } {
    return {
      totalActiveLoops: this.reactLoop.getActiveLoopCount() + this.reflectionLoop.getActiveLoopCount() + this.planningLoop.getActiveLoopCount(),
      reactLoops: this.reactLoop.getActiveLoopCount(),
      reflectionLoops: this.reflectionLoop.getActiveLoopCount(),
      planningLoops: this.planningLoop.getActiveLoopCount(),
    };
  }

  private forwardEvents(source: EventEmitter, prefix: string): void {
    const events = ['loop:iteration', 'loop:progress', 'loop:completed', 'loop:cancelled',
      'loop:tool_executed', 'loop:generating_initial', 'loop:reflection_iteration',
      'loop:self_critique_round', 'loop:planning_started', 'loop:execution_phase',
      'loop:task_started', 'loop:task_completed', 'loop:synthesizing'];

    for (const event of events) {
      source.on(event, (data: any) => {
        this.emit(event, { ...data, loopType: prefix });
      });
    }
  }
}
