/**
 * Agent Scheduling Service
 * Comprehensive scheduling system for AI agents with timing controls
 */

import { eq, and, or, gte, lte, desc, asc, sql, inArray } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  agentSchedules,
  agentTimeBlocks,
  agentRecurringSchedules,
  agentAvailability,
  scheduleExecutions,
  type AgentSchedule,
  type AgentTimeBlock,
  type AgentRecurringSchedule,
  type AgentAvailability,
  type ScheduleExecution,
} from '../db/drizzle-schema';
import { logAudit } from '../lib/audit';
import { notificationService } from './notification-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('AgentScheduling');

// Schedule Types
export type ScheduleType = 'one-time' | 'recurring' | 'conditional' | 'event-driven';
export type ScheduleStatus = 'active' | 'paused' | 'completed' | 'failed' | 'draft';
export type RecurrencePattern = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

// Time Zone Support
export interface TimeZoneConfig {
  timeZone: string;
  observeDST: boolean;
  businessHours: {
    start: string; // HH:mm format
    end: string;
    daysOfWeek: number[]; // 0-6, 0 = Sunday
  };
}

// Schedule Configuration
export interface ScheduleConfig {
  scheduleType: ScheduleType;
  priority: PriorityLevel;
  timeZone: string;
  startDate: Date;
  endDate?: Date;
  recurrence?: {
    pattern: RecurrencePattern;
    interval: number;
    daysOfWeek?: number[];
    daysOfMonth?: number[];
    monthsOfYear?: number[];
    endCondition: 'never' | 'after' | 'on-date';
    endAfterOccurrences?: number;
    endOnDate?: Date;
  };
  conditions?: {
    requireApproval: boolean;
    approvalTimeout: number; // minutes
    dependencies?: string[]; // Other schedule IDs
    conditions?: {
      type: 'agent-status' | 'time-of-day' | 'workload' | 'custom';
      operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains';
      value: any;
      targetAgentId?: string;
    }[];
  };
  notifications?: {
    beforeExecution: boolean;
    onCompletion: boolean;
    onFailure: boolean;
    recipients: string[];
    channels: ('email' | 'sms' | 'push' | 'slack')[];
  };
  resources?: {
    maxConcurrentExecutions: number;
    timeout: number; // minutes
    retryAttempts: number;
    retryDelay: number; // minutes
  };
}

// Execution Context
export interface ExecutionContext {
  scheduleId: string;
  executionId: string;
  agentId: string;
  userId?: string;
  organizationId: string;
  triggerTime: Date;
  metadata?: Record<string, any>;
}

// Schedule Result
export interface ScheduleResult {
  success: boolean;
  executionId?: string;
  message: string;
  nextRunTime?: Date;
  error?: string;
}

// Schedule Statistics
export interface ScheduleStats {
  totalSchedules: number;
  activeSchedules: number;
  completedExecutions: number;
  failedExecutions: number;
  upcomingExecutions: number;
  averageExecutionTime: number;
  successRate: number;
}

// Agent Availability Window
export interface AvailabilityWindow {
  id: string;
  agentId: string;
  date: Date;
  startTime: string; // HH:mm
  endTime: string;
  isAvailable: boolean;
  reason?: string;
  recurrenceId?: string;
}

// Time Block for Scheduling
export interface TimeBlock {
  id: string;
  agentId: string;
  name: string;
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  daysOfWeek: number[];
  type: 'work' | 'break' | 'meeting' | 'training' | 'maintenance' | 'custom';
  color?: string;
  isRecurring: boolean;
  recurrencePattern?: RecurrencePattern;
  priority: PriorityLevel;
  isActive: boolean;
}

class AgentSchedulingService {
  private executionTimers: Map<string, NodeJS.Timeout> = new Map();
  private isInitialized: boolean = false;

  // Initialize the scheduling service
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Load all active schedules and set up their next executions
    const activeSchedules = await this.getActiveSchedules();
    for (const schedule of activeSchedules) {
      await this.scheduleNextExecution(schedule);
    }

    this.isInitialized = true;
    logger.info('Agent Scheduling Service initialized');
  }

  // Create a new schedule
  async createSchedule(
    agentId: string,
    name: string,
    description: string,
    config: ScheduleConfig,
    taskData: Record<string, any>,
    userId?: string,
    organizationId?: string
  ): Promise<ScheduleResult> {
    try {
      // Validate schedule configuration
      const validation = this.validateScheduleConfig(config);
      if (!validation.valid) {
        return { success: false, message: validation.error || 'Invalid configuration' };
      }

      // Calculate next run time
      const nextRunTime = this.calculateNextRunTime(config);

      // Create schedule record
      const [schedule] = await db.insert(agentSchedules).values({
        id: crypto.randomUUID(),
        agentId,
        name,
        description,
        scheduleType: config.scheduleType,
        status: 'active',
        priority: config.priority,
        timeZone: config.timeZone,
        startDate: config.startDate,
        endDate: config.endDate,
        nextRunTime,
        config: JSON.stringify(config),
        taskData: JSON.stringify(taskData),
        createdBy: userId,
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      // Handle recurrence if applicable
      if (config.recurrence && config.scheduleType === 'recurring') {
        await this.createRecurringPattern(schedule.id, config.recurrence);
      }

      // Schedule the first execution
      await this.scheduleNextExecution(schedule);

      // Audit log
      await logAudit({
        userId: userId || 'system',
        organizationId: organizationId || 'system',
        action: 'schedule_created',
        resource: 'agent_schedule',
        resourceId: schedule.id,
        details: { agentId, scheduleType: config.scheduleType, name },
      });

      // Send notification if configured
      if (config.notifications?.beforeExecution) {
        await this.sendScheduleNotification(schedule, 'created');
      }

      return {
        success: true,
        executionId: schedule.id,
        message: 'Schedule created successfully',
        nextRunTime,
      };
    } catch (error) {
      logger.error('Error creating schedule', error as Error);
      return {
        success: false,
        message: 'Failed to create schedule',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Update an existing schedule
  async updateSchedule(
    scheduleId: string,
    updates: Partial<ScheduleConfig>,
    taskData?: Record<string, any>,
    userId?: string
  ): Promise<ScheduleResult> {
    try {
      const existingSchedule = await this.getScheduleById(scheduleId);
      if (!existingSchedule) {
        return { success: false, message: 'Schedule not found' };
      }

      // Merge configs
      const existingConfig = JSON.parse(existingSchedule.config as string) as ScheduleConfig;
      const mergedConfig = { ...existingConfig, ...updates };

      // Calculate new next run time if start date changed
      let nextRunTime = existingSchedule.nextRunTime;
      if (updates.startDate) {
        nextRunTime = this.calculateNextRunTime(mergedConfig);
      }

      const updateData: any = {
        config: JSON.stringify(mergedConfig),
        updatedAt: new Date(),
      };

      if (updates.scheduleType) updateData.scheduleType = updates.scheduleType;
      if (updates.priority) updateData.priority = updates.priority;
      if (updates.timeZone) updateData.timeZone = updates.timeZone;
      if (updates.startDate) updateData.startDate = updates.startDate;
      if (updates.endDate !== undefined) updateData.endDate = updates.endDate;
      if (nextRunTime !== existingSchedule.nextRunTime) updateData.nextRunTime = nextRunTime;
      if (taskData) updateData.taskData = JSON.stringify(taskData);

      await db.update(agentSchedules)
        .set(updateData)
        .where(eq(agentSchedules.id, scheduleId));

      // Update recurrence if changed
      if (updates.recurrence) {
        await db.delete(agentRecurringSchedules)
          .where(eq(agentRecurringSchedules.scheduleId, scheduleId));
        await this.createRecurringPattern(scheduleId, updates.recurrence);
      }

      // Cancel old timer and reschedule
      this.cancelScheduleTimer(scheduleId);
      const updatedSchedule = await this.getScheduleById(scheduleId);
      if (updatedSchedule) {
        await this.scheduleNextExecution(updatedSchedule);
      }

      await logAudit({
        userId: userId || 'system',
        organizationId: existingSchedule.organizationId || 'system',
        action: 'schedule_updated',
        resource: 'agent_schedule',
        resourceId: scheduleId,
        details: { updates: Object.keys(updates) },
      });

      return {
        success: true,
        message: 'Schedule updated successfully',
        nextRunTime: nextRunTime || undefined,
      };
    } catch (error) {
      logger.error('Error updating schedule', error as Error);
      return {
        success: false,
        message: 'Failed to update schedule',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Pause a schedule
  async pauseSchedule(scheduleId: string, userId?: string): Promise<ScheduleResult> {
    try {
      await db.update(agentSchedules)
        .set({ status: 'paused', updatedAt: new Date() })
        .where(eq(agentSchedules.id, scheduleId));

      // Cancel the timer
      this.cancelScheduleTimer(scheduleId);

      await logAudit({
        userId: userId || 'system',
        action: 'schedule_paused',
        resource: 'agent_schedule',
        resourceId: scheduleId,
      });

      return { success: true, message: 'Schedule paused successfully' };
    } catch (error) {
      logger.error('Error pausing schedule', error as Error);
      return { success: false, message: 'Failed to pause schedule' };
    }
  }

  // Resume a schedule
  async resumeSchedule(scheduleId: string, userId?: string): Promise<ScheduleResult> {
    try {
      const schedule = await this.getScheduleById(scheduleId);
      if (!schedule) {
        return { success: false, message: 'Schedule not found' };
      }

      // Recalculate next run time
      const config = JSON.parse(schedule.config as string) as ScheduleConfig;
      const nextRunTime = this.calculateNextRunTime(config);

      await db.update(agentSchedules)
        .set({ status: 'active', nextRunTime, updatedAt: new Date() })
        .where(eq(agentSchedules.id, scheduleId));

      // Reschedule execution
      const updatedSchedule = await this.getScheduleById(scheduleId);
      if (updatedSchedule) {
        await this.scheduleNextExecution(updatedSchedule);
      }

      await logAudit({
        userId: userId || 'system',
        action: 'schedule_resumed',
        resource: 'agent_schedule',
        resourceId: scheduleId,
      });

      return {
        success: true,
        message: 'Schedule resumed successfully',
        nextRunTime,
      };
    } catch (error) {
      logger.error('Error resuming schedule', error as Error);
      return { success: false, message: 'Failed to resume schedule' };
    }
  }

  // Delete a schedule
  async deleteSchedule(scheduleId: string, userId?: string): Promise<ScheduleResult> {
    try {
      // Cancel any pending executions
      this.cancelScheduleTimer(scheduleId);

      // Delete related records
      await db.delete(agentRecurringSchedules)
        .where(eq(agentRecurringSchedules.scheduleId, scheduleId));
      await db.delete(scheduleExecutions)
        .where(eq(scheduleExecutions.scheduleId, scheduleId));
      await db.delete(agentSchedules)
        .where(eq(agentSchedules.id, scheduleId));

      await logAudit({
        userId: userId || 'system',
        action: 'schedule_deleted',
        resource: 'agent_schedule',
        resourceId: scheduleId,
      });

      return { success: true, message: 'Schedule deleted successfully' };
    } catch (error) {
      logger.error('Error deleting schedule', error as Error);
      return { success: false, message: 'Failed to delete schedule' };
    }
  }

  // Execute a schedule immediately (manual trigger)
  async executeScheduleNow(scheduleId: string, userId?: string): Promise<ScheduleResult> {
    try {
      const schedule = await this.getScheduleById(scheduleId);
      if (!schedule) {
        return { success: false, message: 'Schedule not found' };
      }

      const execution = await this.executeSchedule(schedule, userId);

      return {
        success: execution.success,
        executionId: execution.executionId,
        message: execution.success ? 'Schedule executed successfully' : 'Schedule execution failed',
      };
    } catch (error) {
      logger.error('Error executing schedule manually', error as Error);
      return { success: false, message: 'Failed to execute schedule' };
    }
  }

  // Create time block for agent
  async createTimeBlock(
    agentId: string,
    timeBlock: Omit<TimeBlock, 'id'>,
    userId?: string
  ): Promise<ScheduleResult> {
    try {
      const [block] = await db.insert(agentTimeBlocks).values({
        id: crypto.randomUUID(),
        agentId,
        name: timeBlock.name,
        startTime: timeBlock.startTime,
        endTime: timeBlock.endTime,
        daysOfWeek: timeBlock.daysOfWeek,
        type: timeBlock.type,
        color: timeBlock.color || '#3B82F6',
        isRecurring: timeBlock.isRecurring,
        recurrencePattern: timeBlock.recurrencePattern,
        priority: timeBlock.priority,
        isActive: timeBlock.isActive,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).returning();

      await logAudit({
        userId: userId || 'system',
        action: 'time_block_created',
        resource: 'agent_time_block',
        resourceId: block.id,
        details: { agentId, name: timeBlock.name, type: timeBlock.type },
      });

      return {
        success: true,
        executionId: block.id,
        message: 'Time block created successfully',
      };
    } catch (error) {
      logger.error('Error creating time block', error as Error);
      return { success: false, message: 'Failed to create time block' };
    }
  }

  // Set agent availability
  async setAvailability(
    agentId: string,
    windows: Omit<AvailabilityWindow, 'id'>[],
    userId?: string
  ): Promise<ScheduleResult> {
    try {
      // Delete existing availability for the date range
      const dates = [...new Set(windows.map(w => w.date.toISOString().split('T')[0]))];
      
      for (const dateStr of dates) {
        await db.delete(agentAvailability)
          .where(
            and(
              eq(agentAvailability.agentId, agentId),
              sql`DATE(${agentAvailability.date}) = ${dateStr}`
            )
          );
      }

      // Insert new availability
      for (const window of windows) {
        await db.insert(agentAvailability).values({
          id: crypto.randomUUID(),
          agentId,
          date: window.date,
          startTime: window.startTime,
          endTime: window.endTime,
          isAvailable: window.isAvailable,
          reason: window.reason,
          recurrenceId: window.recurrenceId,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await logAudit({
        userId: userId || 'system',
        action: 'availability_set',
        resource: 'agent_availability',
        details: { agentId, windowsCount: windows.length },
      });

      return {
        success: true,
        message: `Set ${windows.length} availability windows`,
      };
    } catch (error) {
      logger.error('Error setting availability', error as Error);
      return { success: false, message: 'Failed to set availability' };
    }
  }

  // Get agent schedule statistics
  async getScheduleStats(
    agentId?: string,
    organizationId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<ScheduleStats> {
    try {
      let query = db.select().from(agentSchedules);
      
      if (agentId) {
        query = query.where(eq(agentSchedules.agentId, agentId));
      }
      if (organizationId) {
        query = query.where(eq(agentSchedules.organizationId, organizationId));
      }

      const schedules = await query;

      // Get executions
      let executionQuery = db.select().from(scheduleExecutions);
      if (startDate && endDate) {
        executionQuery = executionQuery.where(
          and(
            gte(scheduleExecutions.startedAt, startDate),
            lte(scheduleExecutions.startedAt, endDate)
          )
        );
      }
      if (agentId) {
        executionQuery = executionQuery.where(eq(scheduleExecutions.agentId, agentId));
      }

      const executions = await executionQuery;

      const completedExecutions = executions.filter(e => e.status === 'completed');
      const failedExecutions = executions.filter(e => e.status === 'failed');

      // Calculate average execution time
      const executionTimes = completedExecutions
        .filter(e => e.completedAt && e.startedAt)
        .map(e => {
          const start = new Date(e.startedAt!);
          const end = new Date(e.completedAt!);
          return (end.getTime() - start.getTime()) / 1000 / 60; // minutes
        });

      const averageExecutionTime = executionTimes.length > 0
        ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
        : 0;

      // Calculate success rate
      const totalCompleted = completedExecutions.length + failedExecutions.length;
      const successRate = totalCompleted > 0
        ? (completedExecutions.length / totalCompleted) * 100
        : 0;

      // Count upcoming executions
      const upcomingExecutions = schedules.filter(
        s => s.status === 'active' && s.nextRunTime && new Date(s.nextRunTime) > new Date()
      ).length;

      return {
        totalSchedules: schedules.length,
        activeSchedules: schedules.filter(s => s.status === 'active').length,
        completedExecutions: completedExecutions.length,
        failedExecutions: failedExecutions.length,
        upcomingExecutions,
        averageExecutionTime: Math.round(averageExecutionTime * 100) / 100,
        successRate: Math.round(successRate * 100) / 100,
      };
    } catch (error) {
      logger.error('Error getting schedule stats', error as Error);
      return {
        totalSchedules: 0,
        activeSchedules: 0,
        completedExecutions: 0,
        failedExecutions: 0,
        upcomingExecutions: 0,
        averageExecutionTime: 0,
        successRate: 0,
      };
    }
  }

  // Get schedules for an agent
  async getAgentSchedules(
    agentId: string,
    options?: {
      status?: ScheduleStatus;
      type?: ScheduleType;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<AgentSchedule[]> {
    let query = db.select().from(agentSchedules)
      .where(eq(agentSchedules.agentId, agentId))
      .orderBy(desc(agentSchedules.createdAt));

    if (options?.status) {
      query = query.where(eq(agentSchedules.status, options.status));
    }
    if (options?.type) {
      query = query.where(eq(agentSchedules.scheduleType, options.type));
    }

    return await query;
  }

  // Get schedule execution history
  async getExecutionHistory(
    scheduleId?: string,
    agentId?: string,
    limit: number = 50
  ): Promise<ScheduleExecution[]> {
    let query = db.select().from(scheduleExecutions)
      .orderBy(desc(scheduleExecutions.startedAt))
      .limit(limit);

    if (scheduleId) {
      query = query.where(eq(scheduleExecutions.scheduleId, scheduleId));
    }
    if (agentId) {
      query = query.where(eq(scheduleExecutions.agentId, agentId));
    }

    return await query;
  }

  // Private helper methods

  private async getActiveSchedules(): Promise<AgentSchedule[]> {
    return await db.select().from(agentSchedules)
      .where(eq(agentSchedules.status, 'active'));
  }

  private async getScheduleById(scheduleId: string): Promise<AgentSchedule | null> {
    const [schedule] = await db.select().from(agentSchedules)
      .where(eq(agentSchedules.id, scheduleId));
    return schedule || null;
  }

  private async createRecurringPattern(
    scheduleId: string,
    recurrence: NonNullable<ScheduleConfig['recurrence']>
  ): Promise<void> {
    await db.insert(agentRecurringSchedules).values({
      id: crypto.randomUUID(),
      scheduleId,
      pattern: recurrence.pattern,
      interval: recurrence.interval,
      daysOfWeek: recurrence.daysOfWeek,
      daysOfMonth: recurrence.daysOfMonth,
      monthsOfYear: recurrence.monthsOfYear,
      endCondition: recurrence.endCondition,
      endAfterOccurrences: recurrence.endAfterOccurrences,
      endOnDate: recurrence.endOnDate,
      currentOccurrence: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private validateScheduleConfig(config: ScheduleConfig): { valid: boolean; error?: string } {
    if (!config.scheduleType) {
      return { valid: false, error: 'Schedule type is required' };
    }
    if (!config.startDate) {
      return { valid: false, error: 'Start date is required' };
    }
    if (config.endDate && config.endDate < config.startDate) {
      return { valid: false, error: 'End date must be after start date' };
    }
    if (config.scheduleType === 'recurring' && !config.recurrence) {
      return { valid: false, error: 'Recurrence configuration required for recurring schedules' };
    }
    return { valid: true };
  }

  private calculateNextRunTime(config: ScheduleConfig): Date | null {
    const now = new Date();
    let nextRun = new Date(config.startDate);

    // If start date is in the past, calculate from now
    if (nextRun < now) {
      if (config.scheduleType === 'one-time') {
        return null; // One-time schedule in the past
      }
      nextRun = now;
    }

    // For recurring schedules, calculate the next occurrence
    if (config.recurrence && config.scheduleType === 'recurring') {
      nextRun = this.calculateNextRecurrence(nextRun, config.recurrence);
    }

    // Check if beyond end date
    if (config.endDate && nextRun > config.endDate) {
      return null;
    }

    return nextRun;
  }

  private calculateNextRecurrence(
    fromDate: Date,
    recurrence: NonNullable<ScheduleConfig['recurrence']>
  ): Date {
    const next = new Date(fromDate);

    switch (recurrence.pattern) {
      case 'daily':
        next.setDate(next.getDate() + recurrence.interval);
        break;
      case 'weekly':
        if (recurrence.daysOfWeek && recurrence.daysOfWeek.length > 0) {
          // Find next occurrence on specified day of week
          let daysToAdd = 1;
          while (daysToAdd <= 7) {
            const checkDate = new Date(fromDate);
            checkDate.setDate(checkDate.getDate() + daysToAdd);
            if (recurrence.daysOfWeek.includes(checkDate.getDay())) {
              next.setDate(fromDate.getDate() + daysToAdd);
              break;
            }
            daysToAdd++;
          }
        } else {
          next.setDate(next.getDate() + (recurrence.interval * 7));
        }
        break;
      case 'monthly':
        if (recurrence.daysOfMonth && recurrence.daysOfMonth.length > 0) {
          next.setDate(recurrence.daysOfMonth[0]);
          next.setMonth(next.getMonth() + recurrence.interval);
        } else {
          next.setMonth(next.getMonth() + recurrence.interval);
        }
        break;
      case 'yearly':
        if (recurrence.monthsOfYear && recurrence.monthsOfYear.length > 0) {
          next.setMonth(recurrence.monthsOfYear[0]);
        }
        next.setFullYear(next.getFullYear() + recurrence.interval);
        break;
      default:
        next.setDate(next.getDate() + recurrence.interval);
    }

    return next;
  }

  private async scheduleNextExecution(schedule: AgentSchedule): Promise<void> {
    if (schedule.status !== 'active' || !schedule.nextRunTime) return;

    const nextRun = new Date(schedule.nextRunTime);
    const now = new Date();
    const delay = nextRun.getTime() - now.getTime();

    if (delay <= 0) {
      // Execute immediately if overdue
      await this.executeSchedule(schedule);
      return;
    }

    // Schedule the execution
    const timer = setTimeout(async () => {
      await this.executeSchedule(schedule);
    }, delay);

    this.executionTimers.set(schedule.id, timer);
  }

  private cancelScheduleTimer(scheduleId: string): void {
    const timer = this.executionTimers.get(scheduleId);
    if (timer) {
      clearTimeout(timer);
      this.executionTimers.delete(scheduleId);
    }
  }

  private async executeSchedule(
    schedule: AgentSchedule,
    triggeredBy?: string
  ): Promise<{ success: boolean; executionId?: string; error?: string }> {
    const executionId = crypto.randomUUID();
    const config = JSON.parse(schedule.config as string) as ScheduleConfig;

    try {
      // Check conditions
      if (config.conditions?.conditions && config.conditions.conditions.length > 0) {
        const conditionsMet = await this.evaluateConditions(config.conditions.conditions);
        if (!conditionsMet) {
          // Skip this execution, schedule next one
          await this.updateNextRunTime(schedule);
          return { success: false, executionId, error: 'Conditions not met' };
        }
      }

      // Check dependencies
      if (config.conditions?.dependencies && config.conditions.dependencies.length > 0) {
        const dependenciesMet = await this.checkDependencies(config.conditions.dependencies);
        if (!dependenciesMet) {
          return { success: false, executionId, error: 'Dependencies not met' };
        }
      }

      // Create execution record
      await db.insert(scheduleExecutions).values({
        id: executionId,
        scheduleId: schedule.id,
        agentId: schedule.agentId,
        status: 'running',
        startedAt: new Date(),
        triggeredBy: triggeredBy || 'system',
        metadata: JSON.stringify({ triggerTime: new Date().toISOString() }),
      });

      // Send pre-execution notification
      if (config.notifications?.beforeExecution) {
        await this.sendScheduleNotification(schedule, 'starting');
      }

      // Execute the task (integrate with agent service)
      // This would call the actual agent execution service
      const taskResult = await this.runAgentTask(schedule, executionId);

      // Update execution record
      const endTime = new Date();
      await db.update(scheduleExecutions)
        .set({
          status: taskResult.success ? 'completed' : 'failed',
          completedAt: endTime,
          result: JSON.stringify(taskResult),
          errorMessage: taskResult.error,
        })
        .where(eq(scheduleExecutions.id, executionId));

      // Send completion notification
      if (config.notifications) {
        if (taskResult.success && config.notifications.onCompletion) {
          await this.sendScheduleNotification(schedule, 'completed');
        } else if (!taskResult.success && config.notifications.onFailure) {
          await this.sendScheduleNotification(schedule, 'failed', taskResult.error);
        }
      }

      // Update next run time for recurring schedules
      if (schedule.scheduleType === 'recurring') {
        await this.updateNextRunTime(schedule);
      } else {
        // Mark one-time schedule as completed
        await db.update(agentSchedules)
          .set({ status: 'completed', updatedAt: new Date() })
          .where(eq(agentSchedules.id, schedule.id));
      }

      return { success: taskResult.success, executionId };
    } catch (error) {
      logger.error('Error executing scheduled task', error as Error);

      // Update execution record with failure
      await db.update(scheduleExecutions)
        .set({
          status: 'failed',
          completedAt: new Date(),
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        })
        .where(eq(scheduleExecutions.id, executionId));

      // Handle retry
      if (config.resources && config.resources.retryAttempts > 0) {
        await this.scheduleRetry(schedule, executionId, config.resources);
      }

      return {
        success: false,
        executionId,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  private async runAgentTask(
    schedule: AgentSchedule,
    executionId: string
  ): Promise<{ success: boolean; result?: any; error?: string }> {
    // This would integrate with the agent execution service
    // For now, return success as a placeholder
    try {
      const taskData = JSON.parse(schedule.taskData as string || '{}');

      // Integrate with AI agent service
      // const result = await aiAgentService.executeTask({
      //   agentId: schedule.agentId,
      //   task: taskData,
      //   executionId,
      // });

      return { success: true, result: { taskData, executionId } };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Task execution failed',
      };
    }
  }

  private async updateNextRunTime(schedule: AgentSchedule): Promise<void> {
    const config = JSON.parse(schedule.config as string) as ScheduleConfig;
    const nextRunTime = this.calculateNextRunTime(config);

    if (nextRunTime) {
      await db.update(agentSchedules)
        .set({ nextRunTime, updatedAt: new Date() })
        .where(eq(agentSchedules.id, schedule.id));

      // Schedule the next execution
      const updatedSchedule = await this.getScheduleById(schedule.id);
      if (updatedSchedule) {
        await this.scheduleNextExecution(updatedSchedule);
      }
    } else {
      // No more runs
      await db.update(agentSchedules)
        .set({ status: 'completed', updatedAt: new Date() })
        .where(eq(agentSchedules.id, schedule.id));
    }
  }

  private async scheduleRetry(
    schedule: AgentSchedule,
    executionId: string,
    resources: NonNullable<ScheduleConfig['resources']>
  ): Promise<void> {
    // Get current retry count
    const [execution] = await db.select().from(scheduleExecutions)
      .where(eq(scheduleExecutions.id, executionId));

    if (!execution) return;

    const retryCount = execution.retryCount || 0;

    if (retryCount < resources.retryAttempts) {
      // Schedule retry
      setTimeout(async () => {
        await db.update(scheduleExecutions)
          .set({ retryCount: retryCount + 1 })
          .where(eq(scheduleExecutions.id, executionId));

        // Retry execution
        await this.executeSchedule(schedule);
      }, resources.retryDelay * 60 * 1000);
    }
  }

  private async evaluateConditions(
    conditions: NonNullable<ScheduleConfig['conditions']>['conditions']
  ): Promise<boolean> {
    for (const condition of conditions || []) {
      let conditionMet = false;

      switch (condition.type) {
        case 'agent-status':
          // Check agent status
          conditionMet = true; // Placeholder
          break;
        case 'time-of-day':
          const hour = new Date().getHours();
          conditionMet = this.evaluateCondition(hour, condition.operator, condition.value);
          break;
        case 'workload':
          // Check agent workload
          conditionMet = true; // Placeholder
          break;
        case 'custom':
          // Custom condition logic
          conditionMet = true; // Placeholder
          break;
      }

      if (!conditionMet) return false;
    }

    return true;
  }

  private evaluateCondition(
    actual: any,
    operator: string,
    expected: any
  ): boolean {
    switch (operator) {
      case 'equals':
        return actual === expected;
      case 'not-equals':
        return actual !== expected;
      case 'greater-than':
        return actual > expected;
      case 'less-than':
        return actual < expected;
      case 'contains':
        return String(actual).includes(String(expected));
      default:
        return false;
    }
  }

  private async checkDependencies(dependencyIds: string[]): Promise<boolean> {
    for (const depId of dependencyIds) {
      const [lastExecution] = await db.select().from(scheduleExecutions)
        .where(eq(scheduleExecutions.scheduleId, depId))
        .orderBy(desc(scheduleExecutions.completedAt))
        .limit(1);

      if (!lastExecution || lastExecution.status !== 'completed') {
        return false;
      }
    }
    return true;
  }

  private async sendScheduleNotification(
    schedule: AgentSchedule,
    event: 'created' | 'starting' | 'completed' | 'failed',
    errorMessage?: string
  ): Promise<void> {
    const config = JSON.parse(schedule.config as string) as ScheduleConfig;
    if (!config.notifications) return;

    const messages: Record<string, string> = {
      created: `Schedule "${schedule.name}" has been created and will run at ${schedule.nextRunTime?.toLocaleString()}`,
      starting: `Schedule "${schedule.name}" is starting now`,
      completed: `Schedule "${schedule.name}" completed successfully`,
      failed: `Schedule "${schedule.name}" failed: ${errorMessage || 'Unknown error'}`,
    };

    for (const channel of config.notifications.channels) {
      for (const recipient of config.notifications.recipients) {
        try {
          switch (channel) {
            case 'email':
              await notificationService.sendEmail({
                to: recipient,
                subject: `Agent Schedule ${event.charAt(0).toUpperCase() + event.slice(1)}`,
                body: messages[event],
              });
              break;
            case 'sms':
              await notificationService.sendSMS({
                to: recipient,
                message: messages[event],
              });
              break;
            case 'push':
              await notificationService.sendPush({
                userId: recipient,
                title: `Schedule ${event}`,
                body: messages[event],
              });
              break;
            case 'slack':
              await notificationService.sendSlack({
                channel: recipient,
                text: messages[event],
              });
              break;
          }
        } catch (error) {
          logger.error(`Failed to send ${channel} notification`, error as Error);
        }
      }
    }
  }

  // Cleanup method for graceful shutdown
  cleanup(): void {
    for (const [scheduleId, timer] of this.executionTimers.entries()) {
      clearTimeout(timer);
    }
    this.executionTimers.clear();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const agentSchedulingService = new AgentSchedulingService();
