/**
 * Agent Task History Service
 * 
 * This service maintains comprehensive history of all tasks, actions, and decisions
 * for AI agents, enabling accountability, learning, and continuous improvement.
 */

import { db } from '../db';
import { task_history, aiAgents } from '../db/drizzle-schema';
import { eq, and, desc, gte, lte, count } from 'drizzle-orm';

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskOutcome = 'success' | 'failure' | 'partial' | 'timeout' | 'cancelled';

export interface TaskHistoryEntry {
  id?: string;
  organizationId: string;
  agentId: string;
  taskType: string;
  taskName: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  inputData?: Record<string, any>;
  outputData?: Record<string, any>;
  decisionsMade?: Array<{
    decision: string;
    rationale: string;
    timestamp: Date;
    alternatives?: string[];
  }>;
  outcome?: TaskOutcome;
  effectivenessScore?: number;
  durationMs?: number;
  startedAt: Date;
  completedAt?: Date;
  metadata?: Record<string, any>;
}

export interface TaskAnalytics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  successRate: number;
  averageDuration: number;
  byType: Record<string, number>;
  byOutcome: Record<TaskOutcome, number>;
  byPriority: Record<TaskPriority, number>;
  trendData: Array<{
    date: string;
    count: number;
    successRate: number;
  }>;
}

class TaskHistoryService {
  /**
   * Start tracking a new task
   */
  async startTask(task: Omit<TaskHistoryEntry, 'status' | 'startedAt'>): Promise<TaskHistoryEntry> {
    const result = await db.insert(task_history).values({
      organization_id: task.organizationId,
      agent_id: task.agentId,
      task_type: task.taskType,
      task_name: task.taskName,
      description: task.description,
      status: 'pending',
      priority: task.priority,
      input_data: task.inputData || {},
      output_data: task.outputData || {},
      decisions_made: task.decisionsMade || [],
      metadata: task.metadata || {},
      started_at: new Date(),
    }).returning();

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      taskType: result[0].task_type,
      taskName: result[0].task_name,
      description: result[0].description,
      status: result[0].status as TaskStatus,
      priority: result[0].priority as TaskPriority,
      inputData: result[0].input_data,
      outputData: result[0].output_data,
      decisionsMade: result[0].decisions_made,
      outcome: result[0].outcome as TaskOutcome,
      effectivenessScore: result[0].effectiveness_score,
      durationMs: result[0].duration_ms,
      startedAt: result[0].started_at,
      completedAt: result[0].completed_at,
      metadata: result[0].metadata,
    };
  }

  /**
   * Update task status to in_progress
   */
  async updateTaskInProgress(taskId: string): Promise<void> {
    await db.update(task_history)
      .set({ 
        status: 'in_progress',
        updated_at: new Date()
      })
      .where(eq(task_history.id, taskId));
  }

  /**
   * Complete a task with outcome and results
   */
  async completeTask(taskId: string, completion: {
    status: 'completed' | 'failed' | 'cancelled';
    outcome: TaskOutcome;
    outputData?: Record<string, any>;
    effectivenessScore?: number;
    decisionsMade?: Array<{
      decision: string;
      rationale: string;
      timestamp: Date;
      alternatives?: string[];
    }>;
    metadata?: Record<string, any>;
  }): Promise<TaskHistoryEntry> {
    const result = await db.update(task_history)
      .set({
        status: completion.status,
        outcome: completion.outcome,
        output_data: completion.outputData || {},
        effectiveness_score: completion.effectivenessScore,
        decisions_made: completion.decisionsMade || [],
        completed_at: new Date(),
        updated_at: new Date(),
        metadata: completion.metadata,
      })
      .where(eq(task_history.id, taskId))
      .returning();

    if (!result[0]) {
      throw new Error(`Task not found: ${taskId}`);
    }

    // Calculate duration
    const duration = result[0].completed_at && result[0].started_at
      ? new Date(result[0].completed_at).getTime() - new Date(result[0].started_at).getTime()
      : undefined;

    if (duration !== undefined) {
      await db.update(task_history)
        .set({ duration_ms: duration })
        .where(eq(task_history.id, taskId));
    }

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      taskType: result[0].task_type,
      taskName: result[0].task_name,
      description: result[0].description,
      status: result[0].status as TaskStatus,
      priority: result[0].priority as TaskPriority,
      inputData: result[0].input_data,
      outputData: result[0].output_data,
      decisionsMade: result[0].decisions_made,
      outcome: result[0].outcome as TaskOutcome,
      effectivenessScore: result[0].effectiveness_score,
      durationMs: duration,
      startedAt: result[0].started_at,
      completedAt: result[0].completed_at,
      metadata: result[0].metadata,
    };
  }

  /**
   * Get task by ID
   */
  async getTaskById(taskId: string): Promise<TaskHistoryEntry> {
    const result = await db.select()
      .from(task_history)
      .where(eq(task_history.id, taskId))
      .limit(1);

    if (!result[0]) {
      throw new Error(`Task not found: ${taskId}`);
    }

    return {
      id: result[0].id,
      organizationId: result[0].organization_id,
      agentId: result[0].agent_id,
      taskType: result[0].task_type,
      taskName: result[0].task_name,
      description: result[0].description,
      status: result[0].status as TaskStatus,
      priority: result[0].priority as TaskPriority,
      inputData: result[0].input_data,
      outputData: result[0].output_data,
      decisionsMade: result[0].decisions_made,
      outcome: result[0].outcome as TaskOutcome,
      effectivenessScore: result[0].effectiveness_score,
      durationMs: result[0].duration_ms,
      startedAt: result[0].started_at,
      completedAt: result[0].completed_at,
      metadata: result[0].metadata,
    };
  }

  /**
   * Get task history for an agent
   */
  async getAgentTaskHistory(agentId: string, options?: {
    limit?: number;
    offset?: number;
    status?: TaskStatus;
    taskType?: string;
    outcome?: TaskOutcome;
    dateRange?: { start: Date; end: Date };
  }): Promise<TaskHistoryEntry[]> {
    let query = db.select()
      .from(task_history)
      .where(eq(task_history.agent_id, agentId))
      .orderBy(desc(task_history.started_at));

    if (options?.status) {
      query = query.where(and(
        eq(task_history.agent_id, agentId),
        eq(task_history.status, options.status)
      ));
    }

    if (options?.taskType) {
      query = query.where(and(
        eq(task_history.agent_id, agentId),
        eq(task_history.task_type, options.taskType)
      ));
    }

    if (options?.outcome) {
      query = query.where(and(
        eq(task_history.agent_id, agentId),
        eq(task_history.outcome, options.outcome)
      ));
    }

    if (options?.dateRange) {
      query = query.where(and(
        eq(task_history.agent_id, agentId),
        gte(task_history.started_at, options.dateRange.start),
        lte(task_history.started_at, options.dateRange.end)
      ));
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.offset(options.offset);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      taskType: row.task_type,
      taskName: row.task_name,
      description: row.description,
      status: row.status as TaskStatus,
      priority: row.priority as TaskPriority,
      inputData: row.input_data,
      outputData: row.output_data,
      decisionsMade: row.decisions_made,
      outcome: row.outcome as TaskOutcome,
      effectivenessScore: row.effectiveness_score,
      durationMs: row.duration_ms,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      metadata: row.metadata,
    }));
  }

  /**
   * Search task history across organization
   */
  async searchTasks(organizationId: string, query: {
    searchTerm?: string;
    agentId?: string;
    taskType?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dateRange?: { start: Date; end: Date };
    limit?: number;
  }): Promise<TaskHistoryEntry[]> {
    let dbQuery = db.select()
      .from(task_history)
      .where(eq(task_history.organization_id, organizationId))
      .orderBy(desc(task_history.started_at));

    if (query.agentId) {
      dbQuery = dbQuery.where(eq(task_history.agent_id, query.agentId));
    }

    if (query.taskType) {
      dbQuery = dbQuery.where(eq(task_history.task_type, query.taskType));
    }

    if (query.status) {
      dbQuery = dbQuery.where(eq(task_history.status, query.status));
    }

    if (query.priority) {
      dbQuery = dbQuery.where(eq(task_history.priority, query.priority));
    }

    if (query.dateRange) {
      dbQuery = dbQuery.where(and(
        gte(task_history.started_at, query.dateRange.start),
        lte(task_history.started_at, query.dateRange.end)
      ));
    }

    if (query.limit) {
      dbQuery = dbQuery.limit(query.limit);
    }

    const results = await dbQuery;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      taskType: row.task_type,
      taskName: row.task_name,
      description: row.description,
      status: row.status as TaskStatus,
      priority: row.priority as TaskPriority,
      inputData: row.input_data,
      outputData: row.output_data,
      decisionsMade: row.decisions_made,
      outcome: row.outcome as TaskOutcome,
      effectivenessScore: row.effectiveness_score,
      durationMs: row.duration_ms,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      metadata: row.metadata,
    }));
  }

  /**
   * Get task analytics for an agent
   */
  async getTaskAnalytics(agentId: string, options?: {
    dateRange?: { start: Date; end: Date };
  }): Promise<TaskAnalytics> {
    let baseQuery = db.select().from(task_history).where(eq(task_history.agent_id, agentId));

    if (options?.dateRange) {
      baseQuery = baseQuery.where(and(
        eq(task_history.agent_id, agentId),
        gte(task_history.started_at, options.dateRange.start),
        lte(task_history.started_at, options.dateRange.end)
      ));
    }

    const tasks = await baseQuery;

    const analytics: TaskAnalytics = {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      failedTasks: tasks.filter(t => t.status === 'failed').length,
      successRate: 0,
      averageDuration: 0,
      byType: {},
      byOutcome: {
        success: 0,
        failure: 0,
        partial: 0,
        timeout: 0,
        cancelled: 0,
      },
      byPriority: {
        low: 0,
        medium: 0,
        high: 0,
        critical: 0,
      },
      trendData: [],
    };

    analytics.successRate = tasks.length > 0 ? analytics.completedTasks / tasks.length : 0;

    // Calculate average duration
    const tasksWithDuration = tasks.filter(t => t.duration_ms !== null && t.duration_ms !== undefined);
    if (tasksWithDuration.length > 0) {
      analytics.averageDuration = tasksWithDuration.reduce((sum, t) => sum + (t.duration_ms || 0), 0) / tasksWithDuration.length;
    }

    // Group by type
    tasks.forEach(task => {
      analytics.byType[task.task_type] = (analytics.byType[task.task_type] || 0) + 1;
    });

    // Group by outcome
    tasks.forEach(task => {
      if (task.outcome) {
        analytics.byOutcome[task.outcome as TaskOutcome]++;
      }
    });

    // Group by priority
    tasks.forEach(task => {
      analytics.byPriority[task.priority as TaskPriority]++;
    });

    // Generate trend data (last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const trendMap = new Map<string, { count: number; successCount: number }>();

    tasks.filter(t => t.started_at >= last30Days).forEach(task => {
      const date = task.started_at.toISOString().split('T')[0];
      const existing = trendMap.get(date) || { count: 0, successCount: 0 };
      existing.count++;
      if (task.status === 'completed') {
        existing.successCount++;
      }
      trendMap.set(date, existing);
    });

    analytics.trendData = Array.from(trendMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        count: data.count,
        successRate: data.count > 0 ? data.successCount / data.count : 0,
      }));

    return analytics;
  }

  /**
   * Get similar tasks for learning and reference
   */
  async getSimilarTasks(agentId: string, taskType: string, options?: {
    limit?: number;
    status?: TaskStatus;
    outcome?: TaskOutcome;
  }): Promise<TaskHistoryEntry[]> {
    let query = db.select()
      .from(task_history)
      .where(and(
        eq(task_history.agent_id, agentId),
        eq(task_history.task_type, taskType)
      ))
      .orderBy(desc(task_history.started_at));

    if (options?.status) {
      query = query.where(eq(task_history.status, options.status));
    }

    if (options?.outcome) {
      query = query.where(eq(task_history.outcome, options.outcome));
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const results = await query;

    return results.map(row => ({
      id: row.id,
      organizationId: row.organization_id,
      agentId: row.agent_id,
      taskType: row.task_type,
      taskName: row.task_name,
      description: row.description,
      status: row.status as TaskStatus,
      priority: row.priority as TaskPriority,
      inputData: row.input_data,
      outputData: row.output_data,
      decisionsMade: row.decisions_made,
      outcome: row.outcome as TaskOutcome,
      effectivenessScore: row.effectiveness_score,
      durationMs: row.duration_ms,
      startedAt: row.started_at,
      completedAt: row.completed_at,
      metadata: row.metadata,
    }));
  }

  /**
   * Add a decision record to a task
   */
  async addDecisionRecord(taskId: string, decision: {
    decision: string;
    rationale: string;
    alternatives?: string[];
  }): Promise<void> {
    const task = await this.getTaskById(taskId);
    const decisions = task.decisionsMade || [];

    decisions.push({
      ...decision,
      timestamp: new Date(),
    });

    await db.update(task_history)
      .set({ decisions_made: decisions })
      .where(eq(task_history.id, taskId));
  }

  /**
   * Delete old task history (cleanup)
   */
  async deleteOldTasks(organizationId: string, olderThan: Date): Promise<number> {
    const result = await db.delete(task_history)
      .where(and(
        eq(task_history.organization_id, organizationId),
        lt(task_history.started_at, olderThan)
      ));

    return result.rowCount || 0;
  }
}

// Helper function for drizzle-orm
function lt(column: any, value: any): any {
  return { lt: value };
}

function gte(column: any, value: any): any {
  return { gte: value };
}

function lte(column: any, value: any): any {
  return { lte: value };
}

export const taskHistoryService = new TaskHistoryService();
