import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { db as pgDb } from '../db/connection';
import { aiAgentEvents } from '../db/drizzle-schema';
import { eq, and, desc, gte, lte, sql } from 'drizzle-orm';
import { logAudit } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

/**
 * Consolidated Decision Logging Service
 * Combines functionality from:
 * - decision-logging-service.ts
 * - unified-decision-logging-service.ts
 */

export interface DecisionContext {
  input: any;
  environment: any;
  constraints: any[];
  objectives: string[];
  sessionId?: string;
  taskId?: string;
  userId?: string;
  organizationId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface DecisionReasoning {
  primary: string;
  alternatives: {
    option: string;
    reasoning: string;
    confidence: number;
    pros: string[];
    cons: string[];
    expectedOutcome: string;
  }[];
  factors: {
    factor: string;
    weight: number;
    impact: number;
  }[];
  confidence: number;
  uncertainty: string;
}

export interface DecisionAlternative {
  id: string;
  option: string;
  reasoning: string;
  confidence: number;
  pros: string[];
  cons: string[];
  expectedOutcome: string;
  risk: 'low' | 'medium' | 'high';
  cost?: number;
  timeToImplement?: number;
}

export interface DecisionOutcome {
  selected: string;
  actual: string;
  success: boolean;
  performance: {
    accuracy: number;
    efficiency: number;
    satisfaction: number;
  };
  feedback?: string;
  lessons: string[];
  metrics: Record<string, number>;
}

export interface DecisionImpact {
  immediate: {
    resourceUsage: number;
    timeCost: number;
    quality: number;
  };
  shortTerm: {
    productivity: number;
    userSatisfaction: number;
    errorRate: number;
  };
  longTerm: {
    scalability: number;
    maintainability: number;
    adaptability: number;
  };
  business: {
    revenue: number;
    cost: number;
    risk: number;
  };
}

export interface DecisionLog {
  id: string;
  organizationId: string;
  agentId?: string;
  agentName?: string;
  agentType?: string;
  sessionId?: string;
  taskId?: string;
  userId?: string;
  decisionType: 'routing' | 'response_generation' | 'tool_selection' | 'error_handling' | 'resource_allocation' | 'confidence_adjustment' | 'strategy_selection' | 'individual' | 'collaborative' | 'coordinated' | 'automated';
  category: 'routing' | 'resource_allocation' | 'conflict_resolution' | 'task_assignment' | 'consensus' | 'escalation' | 'error_handling';
  priority: 'low' | 'medium' | 'high' | 'critical';
  context: DecisionContext;
  reasoning: DecisionReasoning;
  outcome: DecisionOutcome;
  impact: DecisionImpact;
  alternatives: DecisionAlternative[];
  timestamp: Date;
  duration: number;
  participants: string[];
  tags: string[];
  metadata: Record<string, any>;
}

export interface DecisionQuery {
  organizationId?: string;
  agentId?: string;
  sessionId?: string;
  userId?: string;
  decisionType?: string;
  category?: string;
  priority?: string;
  startDate?: Date;
  endDate?: Date;
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface DecisionAnalytics {
  totalDecisions: number;
  decisionsByType: Record<string, number>;
  decisionsByCategory: Record<string, number>;
  decisionsByPriority: Record<string, number>;
  averageConfidence: number;
  successRate: number;
  averageDuration: number;
  topAgents: { agentId: string; agentName: string; decisions: number; successRate: number }[];
  trends: {
    date: string;
    decisions: number;
    successRate: number;
    averageConfidence: number;
  }[];
  performance: {
    accuracy: number;
    efficiency: number;
    satisfaction: number;
  };
}

export class ConsolidatedDecisionLoggingService extends EventEmitter {
  private decisionCache: Map<string, DecisionLog> = new Map();
  private batchSize: number = 100;
  private flushInterval: number = 5000; // 5 seconds
  private pendingDecisions: DecisionLog[] = [];
  private flushTimer?: NodeJS.Timeout;

  constructor() {
    super();
    this.startBatchProcessing();
  }

  /**
   * Log a decision
   */
  async logDecision(decision: Omit<DecisionLog, 'id' | 'timestamp' | 'duration'>): Promise<DecisionLog> {
    const decisionLog: DecisionLog = {
      ...decision,
      id: uuidv4(),
      timestamp: new Date(),
      duration: 0, // Will be calculated when outcome is recorded
    };

    // Add to batch for processing
    this.pendingDecisions.push(decisionLog);

    // Cache for quick access
    this.decisionCache.set(decisionLog.id, decisionLog);

    // Emit event for real-time monitoring
    this.emit('decision:logged', decisionLog);

    return decisionLog;
  }

  /**
   * Record decision outcome
   */
  async recordOutcome(decisionId: string, outcome: Partial<DecisionOutcome>): Promise<boolean> {
    const decision = this.decisionCache.get(decisionId);
    if (!decision) return false;

    const updatedOutcome = { ...decision.outcome, ...outcome };
    decision.outcome = updatedOutcome;
    decision.duration = Date.now() - decision.timestamp.getTime();

    // Update cache
    this.decisionCache.set(decisionId, decision);

    // Update database
    try {
      await pgDb
        .update(aiAgentEvents)
        .set({
          details: {
            ...decision,
            outcome: updatedOutcome,
          }
        })
        .where(eq(aiAgentEvents.id, decisionId));

      this.emit('decision:outcome_recorded', { decisionId, outcome: updatedOutcome });
      return true;
    } catch (error) {
      logger.error('[ConsolidatedDecisionLoggingService] Failed to record outcome:', error);
      return false;
    }
  }

  /**
   * Query decisions
   */
  async queryDecisions(query: DecisionQuery): Promise<{ decisions: DecisionLog[]; total: number }> {
    let dbQuery = pgDb.select().from(aiAgentEvents);

    // Apply filters
    const conditions = [eq(aiAgentEvents.eventType, 'decision')];
    
    if (query.organizationId) {
      conditions.push(eq(aiAgentEvents.organizationId, query.organizationId));
    }
    
    if (query.agentId) {
      conditions.push(eq(aiAgentEvents.agentId, query.agentId));
    }
    
    if (query.sessionId) {
      conditions.push(sql`${aiAgentEvents.details}->>'sessionId' = ${query.sessionId}`);
    }
    
    if (query.userId) {
      conditions.push(sql`${aiAgentEvents.details}->>'userId' = ${query.userId}`);
    }
    
    if (query.decisionType) {
      conditions.push(sql`${aiAgentEvents.details}->>'decisionType' = ${query.decisionType}`);
    }
    
    if (query.category) {
      conditions.push(sql`${aiAgentEvents.details}->>'category' = ${query.category}`);
    }
    
    if (query.priority) {
      conditions.push(sql`${aiAgentEvents.details}->>'priority' = ${query.priority}`);
    }
    
    if (query.startDate) {
      conditions.push(gte(aiAgentEvents.createdAt, query.startDate));
    }
    
    if (query.endDate) {
      conditions.push(lte(aiAgentEvents.createdAt, query.endDate));
    }

    if (conditions.length > 1) {
      dbQuery = dbQuery.where(and(...conditions));
    }

    // Get total count
    const [{ count }] = await pgDb
      .select({ count: sql`count(*)` })
      .from(dbQuery.as('subquery'));

    // Get paginated results
    const events = await dbQuery
      .orderBy(desc(aiAgentEvents.createdAt))
      .limit(query.limit || 100)
      .offset(query.offset || 0);

    const decisions = events
      .map(event => this.parseDecisionFromEvent(event))
      .filter(decision => decision !== null) as DecisionLog[];

    return {
      decisions,
      total: Number(count)
    };
  }

  /**
   * Get decision analytics
   */
  async getAnalytics(query: {
    organizationId: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<DecisionAnalytics> {
    const conditions = [
      eq(aiAgentEvents.organizationId, query.organizationId),
      eq(aiAgentEvents.eventType, 'decision')
    ];
    
    if (query.startDate) {
      conditions.push(gte(aiAgentEvents.createdAt, query.startDate));
    }
    
    if (query.endDate) {
      conditions.push(lte(aiAgentEvents.createdAt, query.endDate));
    }

    const events = await pgDb
      .select()
      .from(aiAgentEvents)
      .where(and(...conditions));

    const decisions = events
      .map(event => this.parseDecisionFromEvent(event))
      .filter(decision => decision !== null) as DecisionLog[];

    // Calculate analytics
    const totalDecisions = decisions.length;
    const decisionsByType: Record<string, number> = {};
    const decisionsByCategory: Record<string, number> = {};
    const decisionsByPriority: Record<string, number> = {};
    let totalConfidence = 0;
    let successfulDecisions = 0;
    let totalDuration = 0;

    const agentStats: Record<string, { name: string; decisions: number; successes: number }> = {};
    const dailyStats: Record<string, { decisions: number; successes: number; confidence: number[] }> = {};

    for (const decision of decisions) {
      // Count by type
      decisionsByType[decision.decisionType] = (decisionsByType[decision.decisionType] || 0) + 1;
      
      // Count by category
      decisionsByCategory[decision.category] = (decisionsByCategory[decision.category] || 0) + 1;
      
      // Count by priority
      decisionsByPriority[decision.priority] = (decisionsByPriority[decision.priority] || 0) + 1;
      
      // Confidence metrics
      totalConfidence += decision.reasoning.confidence;
      
      // Success metrics
      if (decision.outcome.success) {
        successfulDecisions++;
      }
      
      // Duration metrics
      totalDuration += decision.duration;
      
      // Agent stats
      if (decision.agentId) {
        if (!agentStats[decision.agentId]) {
          agentStats[decision.agentId] = { name: decision.agentName || 'Unknown', decisions: 0, successes: 0 };
        }
        agentStats[decision.agentId].decisions++;
        if (decision.outcome.success) {
          agentStats[decision.agentId].successes++;
        }
      }
      
      // Daily stats
      const dateKey = decision.timestamp.toISOString().split('T')[0];
      if (!dailyStats[dateKey]) {
        dailyStats[dateKey] = { decisions: 0, successes: 0, confidence: [] };
      }
      dailyStats[dateKey].decisions++;
      if (decision.outcome.success) {
        dailyStats[dateKey].successes++;
      }
      dailyStats[dateKey].confidence.push(decision.reasoning.confidence);
    }

    // Calculate top agents
    const topAgents = Object.entries(agentStats)
      .map(([agentId, stats]) => ({
        agentId,
        agentName: stats.name,
        decisions: stats.decisions,
        successRate: stats.decisions > 0 ? stats.successes / stats.decisions : 0
      }))
      .sort((a, b) => b.decisions - a.decisions)
      .slice(0, 10);

    // Calculate trends
    const trends = Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        decisions: stats.decisions,
        successRate: stats.decisions > 0 ? stats.successes / stats.decisions : 0,
        averageConfidence: stats.confidence.length > 0 ? stats.confidence.reduce((a, b) => a + b, 0) / stats.confidence.length : 0
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Calculate performance metrics
    const performance = {
      accuracy: decisions.length > 0 ? decisions.reduce((sum, d) => sum + d.outcome.performance.accuracy, 0) / decisions.length : 0,
      efficiency: decisions.length > 0 ? decisions.reduce((sum, d) => sum + d.outcome.performance.efficiency, 0) / decisions.length : 0,
      satisfaction: decisions.length > 0 ? decisions.reduce((sum, d) => sum + d.outcome.performance.satisfaction, 0) / decisions.length : 0,
    };

    return {
      totalDecisions,
      decisionsByType,
      decisionsByCategory,
      decisionsByPriority,
      averageConfidence: totalDecisions > 0 ? totalConfidence / totalDecisions : 0,
      successRate: totalDecisions > 0 ? successfulDecisions / totalDecisions : 0,
      averageDuration: totalDecisions > 0 ? totalDuration / totalDecisions : 0,
      topAgents,
      trends,
      performance,
    };
  }

  /**
   * Get decision by ID
   */
  async getDecision(decisionId: string, organizationId?: string): Promise<DecisionLog | null> {
    // Check cache first
    const cached = this.decisionCache.get(decisionId);
    if (cached && (!organizationId || cached.organizationId === organizationId)) {
      return cached;
    }

    // Query database
    const [event] = await pgDb
      .select()
      .from(aiAgentEvents)
      .where(and(
        eq(aiAgentEvents.id, decisionId),
        eq(aiAgentEvents.eventType, 'decision'),
        organizationId ? eq(aiAgentEvents.organizationId, organizationId) : undefined
      ))
      .limit(1);

    if (!event) return null;

    const decision = this.parseDecisionFromEvent(event);
    if (decision) {
      this.decisionCache.set(decisionId, decision);
    }

    return decision;
  }

  /**
   * Delete decision
   */
  async deleteDecision(decisionId: string, organizationId: string): Promise<boolean> {
    const decision = this.decisionCache.get(decisionId);
    if (!decision || decision.organizationId !== organizationId) {
      return false;
    }

    try {
      await pgDb
        .delete(aiAgentEvents)
        .where(and(
          eq(aiAgentEvents.id, decisionId),
          eq(aiAgentEvents.organizationId, organizationId)
        ));

      this.decisionCache.delete(decisionId);
      this.emit('decision:deleted', { decisionId });
      return true;
    } catch (error) {
      logger.error('[ConsolidatedDecisionLoggingService] Failed to delete decision:', error);
      return false;
    }
  }

  /**
   * Start batch processing
   */
  private startBatchProcessing(): void {
    this.flushTimer = setInterval(() => {
      this.flushPendingDecisions();
    }, this.flushInterval);
  }

  /**
   * Flush pending decisions to database
   */
  private async flushPendingDecisions(): Promise<void> {
    if (this.pendingDecisions.length === 0) return;

    const decisionsToFlush = this.pendingDecisions.splice(0, this.batchSize);
    
    try {
      await pgDb.insert(aiAgentEvents).values(
        decisionsToFlush.map(decision => ({
          id: decision.id,
          organizationId: decision.organizationId,
          agentId: decision.agentId,
          agentType: decision.agentType || 'ai_agent',
          agentName: decision.agentName,
          eventType: 'decision',
          status: 'success',
          action: 'decision_made',
          details: decision,
          metadata: {
            decisionType: decision.decisionType,
            category: decision.category,
            priority: decision.priority,
            participants: decision.participants,
            tags: decision.tags,
          },
          createdAt: decision.timestamp,
        }))
      );

      this.emit('decisions:flushed', { count: decisionsToFlush.length });
    } catch (error) {
      logger.error('[ConsolidatedDecisionLoggingService] Failed to flush decisions:', error);
      
      // Re-add failed decisions to pending for retry
      this.pendingDecisions.unshift(...decisionsToFlush);
      
      this.emit('decisions:error', { error, count: decisionsToFlush.length });
    }
  }

  /**
   * Parse decision from database event
   */
  private parseDecisionFromEvent(event: any): DecisionLog | null {
    try {
      const details = event.details || {};
      
      return {
        id: event.id,
        organizationId: event.organizationId,
        agentId: event.agentId,
        agentName: event.agentName,
        agentType: event.agentType,
        sessionId: details.sessionId,
        taskId: details.taskId,
        userId: details.userId,
        decisionType: details.decisionType || 'individual',
        category: details.category || 'routing',
        priority: details.priority || 'medium',
        context: details.context || {},
        reasoning: details.reasoning || {
          primary: '',
          alternatives: [],
          factors: [],
          confidence: 0,
          uncertainty: '',
        },
        outcome: details.outcome || {
          selected: '',
          actual: '',
          success: false,
          performance: {
            accuracy: 0,
            efficiency: 0,
            satisfaction: 0,
          },
          lessons: [],
          metrics: {},
        },
        impact: details.impact || {
          immediate: { resourceUsage: 0, timeCost: 0, quality: 0 },
          shortTerm: { productivity: 0, userSatisfaction: 0, errorRate: 0 },
          longTerm: { scalability: 0, maintainability: 0, adaptability: 0 },
          business: { revenue: 0, cost: 0, risk: 0 },
        },
        alternatives: details.alternatives || [],
        timestamp: event.createdAt,
        duration: 0,
        participants: details.participants || [],
        tags: details.tags || [],
        metadata: details.metadata || {},
      };
    } catch (error) {
      logger.error('[ConsolidatedDecisionLoggingService] Failed to parse decision:', error);
      return null;
    }
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined as any;
    }

    // Flush any remaining decisions
    await this.flushPendingDecisions();
    
    this.decisionCache.clear();
    this.pendingDecisions = [];
    
    logger.info(`Cleaned up resources`);
  }

  /**
   * Update decision outcome (from decision-logger.ts)
   */
  async updateDecisionOutcome(
    decisionId: string,
    outcome: 'success' | 'partial' | 'failure',
    metadata?: Record<string, any>
  ): Promise<boolean> {
    try {
      const decision = this.decisionCache.get(decisionId);
      
      if (decision) {
        decision.outcome = outcome;
        decision.metadata = { ...decision.metadata, ...metadata };
        decision.updatedAt = new Date();
      }

      // Update in database
      await pgDb.update(aiAgentEvents)
        .set({ 
          outcome,
          metadata: metadata ? sql`metadata || ${JSON.stringify(metadata)}` : undefined,
          updatedAt: new Date()
        })
        .where(eq(aiAgentEvents.id, decisionId));

      this.emit('decision:outcome_updated', { decisionId, outcome });
      return true;
    } catch (error) {
      logger.error('[ConsolidatedDecisionLoggingService] Failed to update decision outcome:', error);
      return false;
    }
  }

  /**
   * Get decision statistics (from decision-logger.ts)
   */
  async getDecisionStats(organizationId: string, timeRange?: { start: Date; end: Date }): Promise<{
    total: number;
    byOutcome: Record<string, number>;
    byAgent: Record<string, number>;
    averageConfidence: number;
  }> {
    const conditions = [eq(aiAgentEvents.organizationId, organizationId)];
    
    if (timeRange) {
      conditions.push(sql`${aiAgentEvents.timestamp} >= ${timeRange.start}`);
      conditions.push(sql`${aiAgentEvents.timestamp} <= ${timeRange.end}`);
    }

    const decisions = await pgDb.select()
      .from(aiAgentEvents)
      .where(and(...conditions));

    const byOutcome: Record<string, number> = {};
    const byAgent: Record<string, number> = {};
    let totalConfidence = 0;

    for (const decision of decisions) {
      const outcome = decision.outcome || 'unknown';
      byOutcome[outcome] = (byOutcome[outcome] || 0) + 1;

      const agentId = decision.agentId || 'unknown';
      byAgent[agentId] = (byAgent[agentId] || 0) + 1;

      const metadata = decision.metadata as Record<string, any>;
      if (metadata?.confidence) {
        totalConfidence += metadata.confidence;
      }
    }

    return {
      total: decisions.length,
      byOutcome,
      byAgent,
      averageConfidence: decisions.length > 0 ? totalConfidence / decisions.length : 0,
    };
  }

  /**
   * Get decisions by agent
   */
  async getDecisionsByAgent(
    agentId: string,
    options?: {
      limit?: number;
      offset?: number;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<DecisionLog[]> {
    const conditions = [eq(aiAgentEvents.agentId, agentId)];
    
    if (options?.startDate) {
      conditions.push(sql`${aiAgentEvents.timestamp} >= ${options.startDate}`);
    }
    if (options?.endDate) {
      conditions.push(sql`${aiAgentEvents.timestamp} <= ${options.endDate}`);
    }

    const decisions = await pgDb.select()
      .from(aiAgentEvents)
      .where(and(...conditions))
      .orderBy(desc(aiAgentEvents.timestamp))
      .limit(options?.limit || 50)
      .offset(options?.offset || 0);

    return decisions.map(d => this.mapDbEventToDecisionLog(d));
  }

  /**
   * Map database event to DecisionLog
   */
  private mapDbEventToDecisionLog(dbEvent: any): DecisionLog {
    const metadata = dbEvent.metadata as Record<string, any> || {};
    
    return {
      id: dbEvent.id,
      timestamp: dbEvent.timestamp,
      agentId: dbEvent.agentId || 'unknown',
      sessionId: metadata.sessionId,
      organizationId: dbEvent.organizationId,
      decision: {
        type: metadata.decisionType || 'unknown',
        input: metadata.input || {},
        output: metadata.output || {},
        reasoning: metadata.reasoning || '',
        confidence: metadata.confidence || 0,
      },
      context: {
        previousDecisions: metadata.previousDecisions || [],
        externalData: metadata.externalData || {},
        userPreferences: metadata.userPreferences || {},
        constraints: metadata.constraints || [],
      },
      outcome: dbEvent.outcome || 'pending',
      impact: metadata.impact || {},
      metadata: metadata,
      updatedAt: dbEvent.updatedAt || dbEvent.timestamp,
    };
  }
}

export const consolidatedDecisionLoggingService = new ConsolidatedDecisionLoggingService();

// Backward compatibility aliases (from decision-logger.ts)
export const decisionLogger = {
  log: (agentId: string, decision: any, context: any, organizationId: string) => 
    consolidatedDecisionLoggingService.logDecision({
      agentId,
      organizationId,
      sessionId: context?.sessionId,
      decision: {
        type: decision.type || 'unknown',
        input: decision.input || {},
        output: decision.output || {},
        reasoning: decision.reasoning || '',
        confidence: decision.confidence || 0,
      },
      context: {
        previousDecisions: context?.previousDecisions || [],
        externalData: context?.externalData || {},
        userPreferences: context?.userPreferences || {},
        constraints: context?.constraints || [],
      },
    }),
  recordOutcome: (decisionId: string, outcome: 'success' | 'partial' | 'failure', metadata?: Record<string, any>) =>
    consolidatedDecisionLoggingService.recordOutcome(decisionId, outcome, metadata),
  updateOutcome: (decisionId: string, outcome: 'success' | 'partial' | 'failure', metadata?: Record<string, any>) =>
    consolidatedDecisionLoggingService.updateDecisionOutcome(decisionId, outcome, metadata),
  getDecisions: (organizationId: string, options?: any) =>
    consolidatedDecisionLoggingService.queryDecisions(organizationId, options),
  getDecisionById: (decisionId: string) =>
    consolidatedDecisionLoggingService.getDecision(decisionId),
  getDecisionStats: (organizationId: string, timeRange?: { start: Date; end: Date }) =>
    consolidatedDecisionLoggingService.getDecisionStats(organizationId, timeRange),
  getDecisionsByAgent: (agentId: string, options?: any) =>
    consolidatedDecisionLoggingService.getDecisionsByAgent(agentId, options),
  getAnalytics: (organizationId: string, options?: any) =>
    consolidatedDecisionLoggingService.getAnalytics(organizationId, options),
  cleanup: () => consolidatedDecisionLoggingService.cleanup(),
};
