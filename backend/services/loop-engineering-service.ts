import { EventEmitter } from 'events';
import crypto from 'crypto';
import { db } from '../db/connection';
import { aiAgentEvents, aiConversations } from '../db/drizzle-schema';
import { eq, sql } from 'drizzle-orm';
import { createLogger } from '../lib/production-logger';

import { LoopEngine, LoopRequest, LoopResult, LoopType, LoopContext, LoopConfig } from '../lib/loop-engineering';
import { AIServiceManager } from '../services/ai/ai-model-abstraction';
import { ToolExecutor } from '../lib/tool-executor';
import { AgentConfig, AgentTool } from './ai-agent-service';
import { ConversationManager } from '../lib/conversation-manager';

const logger = createLogger('LoopEngineeringService');

export interface LoopExecutionRequest {
  agentId: string;
  organizationId: string;
  sessionId?: string;
  userId?: string;
  input: string;
  loopType: LoopType;
  config?: LoopConfig;
  tools?: AgentTool[];
  systemPrompt?: string;
  metadata?: Record<string, any>;
}

export interface LoopExecutionRecord {
  id: string;
  agentId: string;
  organizationId: string;
  sessionId: string;
  loopType: LoopType;
  status: string;
  input: string;
  output: string;
  iterations: number;
  totalTokensUsed: number;
  totalLatency: number;
  error?: string;
  startedAt: Date;
  completedAt?: Date;
  metadata?: Record<string, any>;
}

export class LoopEngineeringService extends EventEmitter {
  private loopEngine: LoopEngine;
  private aiService: AIServiceManager;
  private toolExecutor: ToolExecutor;
  private conversationManager: ConversationManager;
  private executionHistory = new Map<string, LoopExecutionRecord[]>();
  private activeExecutions = new Map<string, LoopExecutionRecord>();

  constructor(
    aiService: AIServiceManager,
    toolExecutor: ToolExecutor,
    conversationManager: ConversationManager
  ) {
    super();
    this.aiService = aiService;
    this.toolExecutor = toolExecutor;
    this.conversationManager = conversationManager;
    this.loopEngine = new LoopEngine(aiService, toolExecutor);

    this.forwardLoopEvents();
  }

  async execute(request: LoopExecutionRequest): Promise<LoopResult> {
    const executionId = crypto.randomUUID();
    const sessionId = request.sessionId || crypto.randomUUID();
    const systemPrompt = request.systemPrompt || this.buildDefaultSystemPrompt(request.agentId);

    const loopContext: LoopContext = {
      agentId: request.agentId,
      sessionId,
      organizationId: request.organizationId,
      userId: request.userId,
      metadata: request.metadata || {},
    };

    const loopRequest: LoopRequest = {
      type: request.loopType,
      systemPrompt,
      userInput: request.input,
      tools: request.tools,
      context: loopContext,
      config: request.config,
    };

    const record: LoopExecutionRecord = {
      id: executionId,
      agentId: request.agentId,
      organizationId: request.organizationId,
      sessionId,
      loopType: request.loopType,
      status: 'running',
      input: request.input,
      output: '',
      iterations: 0,
      totalTokensUsed: 0,
      totalLatency: 0,
      startedAt: new Date(),
      metadata: request.metadata,
    };

    this.activeExecutions.set(executionId, record);

    try {
      await this.conversationManager.manageConversation(
        sessionId,
        request.agentId,
        request.input,
        { organizationId: request.organizationId, userId: request.userId, metadata: request.metadata }
      );

      this.emit('execution:started', { executionId, request: loopRequest });

      const result = await this.loopEngine.execute(loopRequest);

      record.status = result.status;
      record.output = result.finalOutput;
      record.iterations = result.iterationsCount;
      record.totalTokensUsed = result.totalTokensUsed;
      record.totalLatency = result.totalLatency;
      record.completedAt = new Date();

      if (result.error) {
        record.error = result.error;
      }

      await this.persistExecution(record);

      if (!this.executionHistory.has(request.agentId)) {
        this.executionHistory.set(request.agentId, []);
      }
      this.executionHistory.get(request.agentId)!.push(record);

      this.emit('execution:completed', { executionId, result });

      return result;
    } catch (err) {
      record.status = 'failed';
      record.error = err instanceof Error ? err.message : 'Loop execution failed';
      record.completedAt = new Date();

      this.emit('execution:failed', { executionId, error: record.error });

      return {
        success: false,
        finalOutput: '',
        iterations: [],
        totalTokensUsed: 0,
        totalLatency: 0,
        status: 'failed',
        error: record.error,
        loopType: request.loopType,
        iterationsCount: 0,
      };
    } finally {
      this.activeExecutions.delete(executionId);
    }
  }

  cancelExecution(executionId: string): boolean {
    return this.loopEngine.cancel(executionId);
  }

  getExecution(executionId: string): LoopExecutionRecord | undefined {
    return this.activeExecutions.get(executionId);
  }

  getExecutionHistory(agentId: string): LoopExecutionRecord[] {
    return this.executionHistory.get(agentId) || [];
  }

  getActiveExecutions(): LoopExecutionRecord[] {
    return Array.from(this.activeExecutions.values());
  }

  getStats() {
    return this.loopEngine.getStats();
  }

  private buildDefaultSystemPrompt(agentId: string): string {
    return `You are an AI agent (ID: ${agentId}) powered by the Kaytx Loop Engineering System.
You operate in an autonomous closed-loop cycle: you reason, take actions, observe results, and iterate until you achieve the goal.

Guidelines:
- Think step by step before acting
- Use available tools to gather information and take actions
- Learn from tool results and adjust your approach
- When you have sufficient information, provide a clear final answer
- Never fabricate information or tool results`;
  }

  private async persistExecution(record: LoopExecutionRecord): Promise<void> {
    try {
      await db.insert(aiAgentEvents).values({
        organizationId: record.organizationId,
        agentId: record.agentId,
        eventType: 'loop_engineering.execution',
        status: record.status === 'completed' ? 'success' : record.status === 'failed' ? 'error' : 'running',
        action: `Loop execution: ${record.loopType}`,
        details: {
          loopType: record.loopType,
          iterations: record.iterations,
          totalTokensUsed: record.totalTokensUsed,
          totalLatency: record.totalLatency,
          input: record.input.substring(0, 500),
          output: record.output.substring(0, 500),
        },
        metadata: {
          executionId: record.id,
          sessionId: record.sessionId,
          userId: record.metadata?.userId,
          ...record.metadata,
        },
      } as any);
    } catch (error) {
      logger.warn('[LoopEngineeringService] Failed to persist execution record', { error });
    }
  }

  private forwardLoopEvents(): void {
    const events = [
      'loop:started', 'loop:iteration', 'loop:progress', 'loop:completed',
      'loop:cancelled', 'loop:tool_executed', 'loop:planning_started',
      'loop:execution_phase', 'loop:task_started', 'loop:task_completed',
      'loop:synthesizing', 'loop:generating_initial', 'loop:reflection_iteration',
      'loop:self_critique_round',
    ];

    for (const event of events) {
      this.loopEngine.on(event, (data: any) => {
        this.emit(event, data);
      });
    }
  }
}
