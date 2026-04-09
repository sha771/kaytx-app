import { db } from '../db/connection';
import { eq, and, gte, lte, desc, sql, inArray } from 'drizzle-orm';
import * as crypto from 'crypto';
import { EventEmitter } from 'events';
import { workflows, workflowExecutions } from '../db/drizzle-schema';

import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface WorkflowDefinition {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  trigger: {
    type: 'manual' | 'scheduled' | 'event' | 'webhook';
    config: Record<string, any>;
  };
  steps: WorkflowStep[];
  settings: {
    timeout?: number;
    retryPolicy?: {
      maxAttempts: number;
      backoffMs: number;
    };
    notifications?: {
      onSuccess?: string[];
      onFailure?: string[];
    };
  };
  status: 'active' | 'inactive' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStep {
  id: string;
  type: 'action' | 'condition' | 'parallel' | 'delay' | 'webhook' | 'email' | 'data_transform';
  name: string;
  config: Record<string, any>;
  nextSteps?: string[];
  condition?: {
    type: 'if' | 'switch';
    rules: {
      condition: string;
      nextStep: string;
    }[];
  };
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  organizationId: string;
  triggerData: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  currentStepId?: string;
  stepResults: {
    stepId: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    result?: any;
    error?: string;
    startedAt?: Date;
    completedAt?: Date;
  }[];
  metadata: {
    triggeredBy?: string;
    triggeredAt: Date;
    completedAt?: Date;
    error?: string;
    retryCount?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  definition: Omit<WorkflowDefinition, 'id' | 'organizationId' | 'createdAt' | 'updatedAt'>;
  tags: string[];
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface WorkflowExecutionContext {
  executionId: string;
  workflowId: string;
  organizationId: string;
  triggerData: Record<string, any>;
  stepResults: Record<string, any>;
  variables: Record<string, any>;
}

export class UnifiedWorkflowService extends EventEmitter {
  private activeExecutions: Map<string, WorkflowExecution> = new Map();
  private stepHandlers: Map<string, (step: WorkflowStep, context: WorkflowExecutionContext) => Promise<any>> = new Map();
  private executionQueue: WorkflowExecution[] = [];
  private maxConcurrentExecutions: number = 10;
  private queueProcessorInterval?: NodeJS.Timeout;
  private isProcessingQueue: boolean = false;

  constructor() {
    super();
    this.initializeStepHandlers();
    this.startQueueProcessor();
  }

  /**
   * Create a new workflow
   */
  async createWorkflow(organizationId: string, workflowData: Omit<WorkflowDefinition, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkflowDefinition> {
    try {
      const workflow: WorkflowDefinition = {
        ...workflowData,
        id: crypto.randomUUID(),
        organizationId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store workflow in database (simplified - would use actual workflow table)
      logger.info(`Created workflow: ${workflow.id} for org: ${organizationId}`);

      this.emit('workflow:created', workflow);
      return workflow;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('[WorkflowService] Failed to create workflow:', error);
      throw new Error(`Failed to create workflow: ${errorMessage}`);
    }
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(workflowId: string, organizationId: string, triggerData: Record<string, any>): Promise<WorkflowExecution> {
    try {
      // Get workflow definition
      const workflow = await this.getWorkflow(workflowId, organizationId);
      if (!workflow) {
        throw new Error('Workflow not found');
      }

      const execution: WorkflowExecution = {
        id: crypto.randomUUID(),
        workflowId,
        organizationId,
        triggerData,
        status: 'pending',
        stepResults: [],
        metadata: {
          triggeredAt: new Date(),
          retryCount: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Store execution
      this.activeExecutions.set(execution.id, execution);

      // Add to queue
      this.executionQueue.push(execution);
      this.processQueue();

      this.emit('workflow:started', execution);
      return execution;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('[WorkflowService] Failed to execute workflow:', error);
      throw new Error(`Failed to execute workflow: ${errorMessage}`);
    }
  }

  /**
   * Get workflow by ID
   */
  async getWorkflow(workflowId: string, organizationId: string): Promise<WorkflowDefinition | null> {
    try {
      const [workflow] = await db.select()
        .from(workflows)
        .where(and(
          eq(workflows.id, workflowId),
          eq(workflows.organizationId, organizationId)
        ))
        .limit(1);

      if (!workflow) return null;

      // Map database record to WorkflowDefinition interface
      return {
        id: workflow.id,
        organizationId: workflow.organizationId,
        name: workflow.name,
        description: workflow.description || '',
        trigger: workflow.trigger as { type: 'manual' | 'scheduled' | 'event' | 'webhook'; config: Record<string, any> },
        steps: (workflow.actions as unknown as WorkflowStep[] || []).map((action: any, index: number) => ({
          id: action.id || `step-${index}`,
          type: action.type || 'action',
          name: action.name || `Step ${index + 1}`,
          config: action.config || {},
          nextSteps: action.nextSteps,
          condition: action.condition,
        })),
        settings: {
          timeout: 30000,
          retryPolicy: { maxAttempts: 3, backoffMs: 1000 },
          notifications: { onSuccess: [], onFailure: [] },
        },
        status: workflow.status as 'active' | 'inactive' | 'archived',
        createdAt: workflow.createdAt,
        updatedAt: workflow.updatedAt,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      logger.error('[WorkflowService] Failed to get workflow:', error);
      throw new Error(`Failed to get workflow: ${errorMessage}`);
    }
  }

  /**
   * List workflows for organization
   */
  async listWorkflows(organizationId: string, filters?: {
    status?: string;
    category?: string;
    limit?: number;
    offset?: number;
  }): Promise<WorkflowDefinition[]> {
    try {
      const conditions = [eq(workflows.organizationId, organizationId)];

      if (filters?.status) {
        conditions.push(eq(workflows.status, filters.status));
      }

      const workflowList = await db.select()
        .from(workflows)
        .where(and(...conditions))
        .orderBy(desc(workflows.updatedAt))
        .limit(filters?.limit || 50)
        .offset(filters?.offset || 0);

      return workflowList.map(workflow => ({
        id: workflow.id,
        organizationId: workflow.organizationId,
        name: workflow.name,
        description: workflow.description || '',
        trigger: workflow.trigger as { type: 'manual' | 'scheduled' | 'event' | 'webhook'; config: Record<string, any> },
        steps: (workflow.actions as unknown as WorkflowStep[] || []).map((action: any, index: number) => ({
          id: action.id || `step-${index}`,
          type: action.type || 'action',
          name: action.name || `Step ${index + 1}`,
          config: action.config || {},
          nextSteps: action.nextSteps,
          condition: action.condition,
        })),
        settings: {
          timeout: 30000,
          retryPolicy: { maxAttempts: 3, backoffMs: 1000 },
          notifications: { onSuccess: [], onFailure: [] },
        },
        status: workflow.status as 'active' | 'inactive' | 'archived',
        createdAt: workflow.createdAt,
        updatedAt: workflow.updatedAt,
      }));
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to list workflows:', error);
      throw new Error('Failed to list workflows');
    }
  }

  /**
   * Update workflow
   */
  async updateWorkflow(workflowId: string, organizationId: string, updates: Partial<WorkflowDefinition>): Promise<WorkflowDefinition> {
    try {
      const existing = await this.getWorkflow(workflowId, organizationId);
      if (!existing) {
        throw new Error('Workflow not found');
      }

      // Update in database
      const [updated] = await db.update(workflows)
        .set({
          name: updates.name ?? existing.name,
          description: updates.description ?? existing.description,
          status: updates.status ?? existing.status,
          trigger: updates.trigger ?? existing.trigger,
          actions: updates.steps ? updates.steps.map(step => ({
            id: step.id,
            type: step.type,
            name: step.name,
            config: step.config,
            nextSteps: step.nextSteps,
            condition: step.condition,
          })) : existing.steps,
          updatedAt: new Date(),
        })
        .where(and(
          eq(workflows.id, workflowId),
          eq(workflows.organizationId, organizationId)
        ))
        .returning();

      const updatedWorkflow: WorkflowDefinition = {
        ...existing,
        ...updates,
        updatedAt: new Date(),
      };

      this.emit('workflow:updated', updatedWorkflow);
      return updatedWorkflow;
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to update workflow:', error);
      throw new Error('Failed to update workflow');
    }
  }

  /**
   * Delete workflow
   */
  async deleteWorkflow(workflowId: string, organizationId: string): Promise<boolean> {
    try {
      const workflow = await this.getWorkflow(workflowId, organizationId);
      if (!workflow) {
        return false;
      }

      // Check for active executions
      const activeExecutions = Array.from(this.activeExecutions.values())
        .filter(exec => exec.workflowId === workflowId && exec.status === 'running');

      if (activeExecutions.length > 0) {
        throw new Error('Cannot delete workflow with active executions');
      }

      // Delete from database
      await db.delete(workflows)
        .where(and(
          eq(workflows.id, workflowId),
          eq(workflows.organizationId, organizationId)
        ));

      logger.info(`Deleted workflow: ${workflowId}`);

      this.emit('workflow:deleted', workflow);
      return true;
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to delete workflow:', error);
      throw new Error('Failed to delete workflow');
    }
  }

  /**
   * Get workflow execution
   */
  async getExecution(executionId: string, organizationId: string): Promise<WorkflowExecution | null> {
    try {
      const execution = this.activeExecutions.get(executionId);
      if (execution && execution.organizationId === organizationId) {
        return execution;
      }
      return null;
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to get execution:', error);
      throw new Error('Failed to get execution');
    }
  }

  /**
   * List workflow executions
   */
  async listExecutions(organizationId: string, filters: {
    workflowId?: string;
    status?: string;
    dateRange?: { start: Date; end: Date };
    limit?: number;
    offset?: number;
  } = {}): Promise<WorkflowExecution[]> {
    try {
      const executions = Array.from(this.activeExecutions.values())
        .filter(exec => exec.organizationId === organizationId)
        .filter(exec => !filters?.workflowId || exec.workflowId === filters.workflowId)
        .filter(exec => !filters?.status || exec.status === filters.status)
        .filter(exec => {
          if (!filters?.dateRange) return true;
          return exec.createdAt >= filters.dateRange.start && exec.createdAt <= filters.dateRange.end;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(filters?.offset || 0, (filters?.offset || 0) + (filters?.limit || 50));

      return executions;
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to list executions:', error);
      throw new Error('Failed to list executions');
    }
  }

  /**
   * Cancel workflow execution
   */
  async cancelExecution(executionId: string, organizationId: string): Promise<boolean> {
    try {
      const execution = await this.getExecution(executionId, organizationId);
      if (!execution) {
        return false;
      }

      if (execution.status === 'completed' || execution.status === 'cancelled') {
        return false;
      }

      execution.status = 'cancelled';
      execution.updatedAt = new Date();

      this.emit('workflow:cancelled', execution);
      return true;
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to cancel execution:', error);
      throw new Error('Failed to cancel execution');
    }
  }

  /**
   * Get workflow templates
   */
  async getTemplates(category?: string): Promise<WorkflowTemplate[]> {
    try {
      // Simplified - would query actual database
      logger.info(`Getting templates${category ? ` for category: ${category}` : ''}`);
      return []; // Placeholder
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to get templates:', error);
      throw new Error('Failed to get templates');
    }
  }

  /**
   * Create workflow from template
   */
  async createFromTemplate(templateId: string, organizationId: string, customizations?: Partial<WorkflowDefinition>): Promise<WorkflowDefinition> {
    try {
      const templates = await this.getTemplates();
      const template = templates.find(t => t.id === templateId);
      
      if (!template) {
        throw new Error('Template not found');
      }

      const workflowData: Omit<WorkflowDefinition, 'id' | 'createdAt' | 'updatedAt'> = {
        ...template.definition,
        ...customizations,
        organizationId,
        status: 'inactive', // Start as inactive until reviewed
      };

      return await this.createWorkflow(organizationId, workflowData);
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to create from template:', error);
      throw new Error('Failed to create from template');
    }
  }

  /**
   * Get workflow statistics
   */
  async getWorkflowStats(organizationId: string): Promise<{
    totalWorkflows: number;
    activeWorkflows: number;
    totalExecutions: number;
    runningExecutions: number;
    successRate: number;
    averageExecutionTime: number;
    executionsByStatus: Record<string, number>;
    executionsByWorkflow: {
      workflowId: string;
      workflowName: string;
      executions: number;
      successRate: number;
    }[];
  }> {
    try {
      // Get workflow counts from database
      const [totalWorkflowsResult] = await db.select({
        count: sql<number>`count(*)::int`
      })
        .from(workflows)
        .where(eq(workflows.organizationId, organizationId));

      const [activeWorkflowsResult] = await db.select({
        count: sql<number>`count(*)::int`
      })
        .from(workflows)
        .where(and(
          eq(workflows.organizationId, organizationId),
          eq(workflows.status, 'active')
        ));

      // Get execution stats from database
      const executions = await db.select()
        .from(workflowExecutions)
        .where(eq(workflowExecutions.organizationId, organizationId));

      const completedExecutions = executions.filter(exec => exec.status === 'completed');
      const failedExecutions = executions.filter(exec => exec.status === 'failed');
      const runningExecutions = executions.filter(exec => exec.status === 'running');

      const successRate = completedExecutions.length + failedExecutions.length > 0
        ? completedExecutions.length / (completedExecutions.length + failedExecutions.length)
        : 0;

      const averageExecutionTime = completedExecutions.length > 0
        ? completedExecutions.reduce((sum, exec) => {
            const duration = exec.endTime && exec.startTime
              ? new Date(exec.endTime).getTime() - new Date(exec.startTime).getTime()
              : 0;
            return sum + duration;
          }, 0) / completedExecutions.length
        : 0;

      const executionsByStatus = executions.reduce((acc, exec) => {
        acc[exec.status] = (acc[exec.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get workflow names for grouping
      const workflowIds = Array.from(new Set(executions.map(e => e.workflowId)));
      const workflowData = workflowIds.length > 0
        ? await db.select({ id: workflows.id, name: workflows.name })
            .from(workflows)
            .where(and(
              eq(workflows.organizationId, organizationId),
              inArray(workflows.id, workflowIds)
            ))
        : [];

      const workflowNameMap = new Map(workflowData.map(w => [w.id, w.name]));

      // Group by workflow
      const executionsByWorkflow = executions.reduce((acc, exec) => {
        const existing = acc.find(item => item.workflowId === exec.workflowId);
        if (existing) {
          existing.executions++;
          if (exec.status === 'completed') existing.successRate++;
        } else {
          acc.push({
            workflowId: exec.workflowId,
            workflowName: workflowNameMap.get(exec.workflowId) || `Workflow ${exec.workflowId}`,
            executions: 1,
            successRate: exec.status === 'completed' ? 1 : 0,
          });
        }
        return acc;
      }, [] as { workflowId: string; workflowName: string; executions: number; successRate: number }[]);

      // Calculate success rates
      executionsByWorkflow.forEach(item => {
        item.successRate = item.executions > 0 ? item.successRate / item.executions : 0;
      });

      return {
        totalWorkflows: totalWorkflowsResult?.count || 0,
        activeWorkflows: activeWorkflowsResult?.count || 0,
        totalExecutions: executions.length,
        runningExecutions: runningExecutions.length,
        successRate,
        averageExecutionTime,
        executionsByStatus,
        executionsByWorkflow,
      };
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to get stats:', error);
      throw new Error('Failed to get workflow stats');
    }
  }

  /**
   * Initialize step handlers
   */
  private initializeStepHandlers(): void {
    // Action step handler
    this.stepHandlers.set('action', async (step, context) => {
      logger.info(`Executing action step: ${step.name}`);
      // Implement action logic based on step.config
      return { success: true, data: {} };
    });

    // Condition step handler
    this.stepHandlers.set('condition', async (step, context) => {
      logger.info(`Evaluating condition: ${step.name}`);
      // Implement condition evaluation logic
      return { success: true, result: true };
    });

    // Delay step handler
    this.stepHandlers.set('delay', async (step, context) => {
      const delayMs = step.config.duration || 1000;
      logger.info(`Delaying for ${delayMs}ms`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      return { success: true };
    });

    // Webhook step handler
    this.stepHandlers.set('webhook', async (step, context) => {
      const url = step.config.url;
      const method = step.config.method || 'POST';
      const data = step.config.data || {};

      logger.info(`Calling webhook: ${method} ${url}`);
      
      // Make webhook call
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.statusText}`);
      }

      return { success: true, data: await response.json() };
    });

    // Email step handler
    this.stepHandlers.set('email', async (step, context) => {
      const to = step.config.to;
      const subject = step.config.subject;
      const body = step.config.body;

      logger.info(`Sending email to: ${to}`);
      // Implement email sending logic
      return { success: true, messageId: crypto.randomUUID() };
    });

    // Data transform step handler
    this.stepHandlers.set('data_transform', async (step, context) => {
      const transform = step.config.transform;
      logger.info(`Transforming data`);
      // Implement data transformation logic
      return { success: true, data: context };
    });
  }

  /**
   * Process execution queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.executionQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    try {
      while (this.executionQueue.length > 0 && this.activeExecutions.size < this.maxConcurrentExecutions) {
        const execution = this.executionQueue.shift()!;
        await this.processExecution(execution);
      }
    } catch (error: any) {
      logger.error('[WorkflowService] Error processing queue:', error);
    } finally {
      this.isProcessingQueue = false;
    }
  }

  /**
   * Process individual execution
   */
  private async processExecution(execution: WorkflowExecution): Promise<void> {
    try {
      execution.status = 'running';
      execution.updatedAt = new Date();

      // Get workflow definition
      const workflow = await this.getWorkflow(execution.workflowId, execution.organizationId);
      if (!workflow) {
        throw new Error('Workflow not found');
      }

      // Process workflow steps
      let currentStepIndex = 0;
      const steps = workflow.steps;

      while (currentStepIndex < steps.length && execution.status === 'running') {
        const step = steps[currentStepIndex];
        execution.currentStepId = step.id;

        try {
          const stepResult = await this.executeStep(step, execution);
          
          execution.stepResults.push({
            stepId: step.id,
            status: 'completed',
            result: stepResult,
            startedAt: new Date(),
            completedAt: new Date(),
          });

          // Determine next step
          currentStepIndex = this.getNextStepIndex(step, stepResult, workflow.steps, currentStepIndex);
        } catch (error) {
          execution.stepResults.push({
            stepId: step.id,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            startedAt: new Date(),
            completedAt: new Date(),
          });

          // Handle retry logic
          if (workflow.settings.retryPolicy && execution.metadata.retryCount! < workflow.settings.retryPolicy.maxAttempts) {
            execution.metadata.retryCount!++;
            execution.status = 'pending';
            // Add back to queue with delay
            setTimeout(() => {
              this.executionQueue.push(execution);
              this.processQueue();
            }, workflow.settings.retryPolicy.backoffMs);
            return;
          } else {
            execution.status = 'failed';
            execution.metadata.error = error instanceof Error ? error.message : 'Unknown error';
            break;
          }
        }
      }

      if (execution.status === 'running') {
        execution.status = 'completed';
        execution.metadata.completedAt = new Date();
      }

      execution.updatedAt = new Date();
      
      // Send notifications
      if (execution.status === 'completed' && workflow.settings.notifications?.onSuccess) {
        await this.sendNotifications(workflow.settings.notifications.onSuccess, execution);
      } else if (execution.status === 'failed' && workflow.settings.notifications?.onFailure) {
        await this.sendNotifications(workflow.settings.notifications.onFailure, execution);
      }

      this.emit('workflow:completed', execution);
    } catch (error) {
      execution.status = 'failed';
      execution.metadata.error = error instanceof Error ? error.message : 'Unknown error';
      execution.updatedAt = new Date();
      
      this.emit('workflow:failed', execution);
    } finally {
      // Clean up after delay
      setTimeout(() => {
        this.activeExecutions.delete(execution.id);
      }, 60000); // Keep in memory for 1 minute
    }
  }

  /**
   * Execute individual step
   */
  private async executeStep(step: WorkflowStep, execution: WorkflowExecution): Promise<any> {
    const handler = this.stepHandlers.get(step.type);
    if (!handler) {
      throw new Error(`No handler for step type: ${step.type}`);
    }

    const context = {
      execution,
      triggerData: execution.triggerData,
      stepResults: execution.stepResults,
    };

    return await handler(step, context);
  }

  /**
   * Get next step index based on step result
   */
  private getNextStepIndex(step: WorkflowStep, result: any, steps: WorkflowStep[], currentIndex: number): number {
    // Handle conditional logic
    if (step.condition) {
      if (step.condition.type === 'if') {
        const rule = step.condition.rules[0];
        if (rule && this.evaluateCondition(rule.condition, result)) {
          const nextStep = steps.findIndex(s => s.id === rule.nextStep);
          return nextStep >= 0 ? nextStep : currentIndex + 1;
        }
      } else if (step.condition.type === 'switch') {
        for (const rule of step.condition.rules) {
          if (this.evaluateCondition(rule.condition, result)) {
            const nextStep = steps.findIndex(s => s.id === rule.nextStep);
            return nextStep >= 0 ? nextStep : currentIndex + 1;
          }
        }
      }
    }

    // Default to next step
    return currentIndex + 1;
  }

  /**
   * Evaluate condition expression safely
   */
  private evaluateCondition(condition: string, context: any): boolean {
    // Safe expression evaluation - no eval() usage
    try {
      // Parse basic comparison conditions
      // Supported formats: "value > 5", "status === 'active'", "user.age >= 18"
      
      const trimmedCondition = condition.trim();
      
      // Handle boolean literals
      if (trimmedCondition === 'true') return true;
      if (trimmedCondition === 'false') return false;
      
      // Extract value from context using dot notation (e.g., "user.age")
      const getValue = (path: string, obj: any): any => {
        const keys = path.trim().split('.');
        let value = obj;
        for (const key of keys) {
          if (value === null || value === undefined) return undefined;
          // Handle array index notation like items[0]
          const arrayMatch = key.match(/^(.+)\[(\d+)\]$/);
          if (arrayMatch) {
            const arrKey = arrayMatch[1];
            const index = parseInt(arrayMatch[2], 10);
            value = value[arrKey]?.[index];
          } else {
            value = value[key];
          }
        }
        return value;
      };
      
      // Parse comparison operators
      const operators = [
        { pattern: /^(.*?)\s*===?\s*(.*)$/, eval: (a: any, b: any) => a === b },
        { pattern: /^(.*?)\s*!==?\s*(.*)$/, eval: (a: any, b: any) => a !== b },
        { pattern: /^(.*?)\s*>\s*(.*)$/, eval: (a: any, b: any) => Number(a) > Number(b) },
        { pattern: /^(.*?)\s*<\s*(.*)$/, eval: (a: any, b: any) => Number(a) < Number(b) },
        { pattern: /^(.*?)\s*>=\s*(.*)$/, eval: (a: any, b: any) => Number(a) >= Number(b) },
        { pattern: /^(.*?)\s*<=\s*(.*)$/, eval: (a: any, b: any) => Number(a) <= Number(b) },
      ];
      
      for (const op of operators) {
        const match = trimmedCondition.match(op.pattern);
        if (match) {
          const leftValue = getValue(match[1], context);
          let rightValue: any = match[2].trim();
          
          // Remove quotes from string literals
          if ((rightValue.startsWith('"') && rightValue.endsWith('"')) ||
              (rightValue.startsWith("'") && rightValue.endsWith("'"))) {
            rightValue = rightValue.slice(1, -1);
          } else if (!isNaN(Number(rightValue))) {
            rightValue = Number(rightValue);
          } else if (rightValue === 'true') {
            rightValue = true;
          } else if (rightValue === 'false') {
            rightValue = false;
          } else if (rightValue === 'null') {
            rightValue = null;
          } else if (rightValue === 'undefined') {
            rightValue = undefined;
          } else {
            // Try to get from context
            rightValue = getValue(rightValue, context);
          }
          
          return op.eval(leftValue, rightValue);
        }
      }
      
      // Handle logical operators (&&, ||)
      if (trimmedCondition.includes(' && ')) {
        const parts = trimmedCondition.split(' && ');
        return parts.every(part => this.evaluateCondition(part.trim(), context));
      }
      
      if (trimmedCondition.includes(' || ')) {
        const parts = trimmedCondition.split(' || ');
        return parts.some(part => this.evaluateCondition(part.trim(), context));
      }
      
      // Handle negation
      if (trimmedCondition.startsWith('!')) {
        const innerCondition = trimmedCondition.substring(1).trim();
        const innerValue = getValue(innerCondition, context);
        return !innerValue;
      }
      
      // Single value truthiness check
      const singleValue = getValue(trimmedCondition, context);
      return !!singleValue;
      
    } catch (error: any) {
      logger.error('[WorkflowService] Condition evaluation error:', error);
      return false;
    }
  }

  /**
   * Send notifications
   */
  private async sendNotifications(recipients: string[], execution: WorkflowExecution): Promise<void> {
    try {
      logger.info(`Sending notifications to: ${recipients.join(', ')}`);
      // Implement notification logic (email, webhook, etc.)
    } catch (error: any) {
      logger.error('[WorkflowService] Failed to send notifications:', error);
    }
  }

  /**
   * Start queue processor
   */
  private startQueueProcessor(): void {
    this.queueProcessorInterval = setInterval(() => {
      this.processQueue();
    }, 1000); // Process queue every second
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    this.activeExecutions.clear();
    this.executionQueue = [];
    this.stepHandlers.clear();
    logger.info(`Cleaned up resources`);
  }

  /**
   * Destroy service and clear all intervals
   */
  destroy(): void {
    if (this.queueProcessorInterval) {
      clearInterval(this.queueProcessorInterval);
    }
    this.activeExecutions.clear();
    this.executionQueue = [];
    this.stepHandlers.clear();
    this.removeAllListeners();
    logger.info('UnifiedWorkflowService destroyed');
  }
}

export const unifiedWorkflowService = new UnifiedWorkflowService();
