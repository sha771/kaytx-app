/**
 * @copyright Copyright (c) 2026 Kaytx & Antigravity Ecosystem ("kaytx")
 * @license MIT - See LICENSE file for full terms
 */

import { companyBrainWebSocketService } from './company-brain-websocket';
import { knowledgeExtractionService } from './company-brain-extraction';
import { integrationService } from './company-brain-integrations';
import { documentProcessorService } from './company-brain-document-processor';

/**
 * Company Brain Automated Workflows Service
 * Manages automated knowledge capture workflows and scheduled tasks
 * Ensures continuous knowledge capture without manual intervention
 */

export interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  triggers: WorkflowTrigger[];
  actions: WorkflowAction[];
  schedule?: WorkflowSchedule;
  status: 'idle' | 'running' | 'paused' | 'error';
  lastRun?: Date;
  nextRun?: Date;
  runCount: number;
  successCount: number;
  errorCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowTrigger {
  type: 'schedule' | 'event' | 'manual';
  config: Record<string, any>;
}

export interface WorkflowSchedule {
  frequency: 'once' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'cron';
  cronExpression?: string;
  timezone?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface WorkflowAction {
  type: 'sync_integration' | 'process_documents' | 'extract_knowledge' | 'generate_report' | 'notify';
  config: Record<string, any>;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  results: Record<string, any>;
  errors: string[];
  logs: string[];
}

export class AutomatedWorkflowsService {
  private workflows: Map<string, Workflow> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
  private scheduledTasks: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Create a new workflow
   */
  createWorkflow(
    name: string,
    description: string,
    triggers: WorkflowTrigger[],
    actions: WorkflowAction[],
    schedule?: WorkflowSchedule
  ): Workflow {
    const workflow: Workflow = {
      id: `workflow-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      enabled: true,
      triggers,
      actions,
      schedule,
      status: 'idle',
      runCount: 0,
      successCount: 0,
      errorCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.workflows.set(workflow.id, workflow);

    // Schedule the workflow if it has a schedule trigger
    if (schedule && workflow.enabled) {
      this.scheduleWorkflow(workflow);
    }

    console.log(`Workflow created: ${name} (${workflow.id})`);
    
    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'workflow_created',
      workflowId: workflow.id,
      workflowName: name,
    });

    return workflow;
  }

  /**
   * Schedule a workflow
   */
  private scheduleWorkflow(workflow: Workflow): void {
    if (!workflow.schedule) return;

    const { frequency, cronExpression, timezone } = workflow.schedule;
    let intervalMs: number;

    switch (frequency) {
      case 'hourly':
        intervalMs = 60 * 60 * 1000;
        break;
      case 'daily':
        intervalMs = 24 * 60 * 60 * 1000;
        break;
      case 'weekly':
        intervalMs = 7 * 24 * 60 * 60 * 1000;
        break;
      case 'monthly':
        intervalMs = 30 * 24 * 60 * 60 * 1000;
        break;
      case 'once':
        if (workflow.schedule.startTime) {
          const delay = workflow.schedule.startTime.getTime() - Date.now();
          if (delay > 0) {
            intervalMs = delay;
          } else {
            return; // Already passed
          }
        } else {
          return;
        }
        break;
      case 'cron':
        // In production, would use a cron parser
        console.log(`Cron scheduling not implemented for ${workflow.id}`);
        return;
      default:
        return;
    }

    // Set next run time
    workflow.nextRun = new Date(Date.now() + intervalMs);

    // Schedule the task
    const taskId = setTimeout(() => {
      this.executeWorkflow(workflow.id);
      
      // Reschedule if not a one-time workflow
      if (workflow.schedule?.frequency !== 'once') {
        this.scheduleWorkflow(workflow);
      }
    }, intervalMs);

    this.scheduledTasks.set(workflow.id, taskId);
  }

  /**
   * Execute a workflow
   */
  async executeWorkflow(workflowId: string): Promise<WorkflowExecution> {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    if (!workflow.enabled) {
      throw new Error(`Workflow ${workflowId} is disabled`);
    }

    const execution: WorkflowExecution = {
      id: `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      workflowId,
      status: 'running',
      startTime: new Date(),
      results: {},
      errors: [],
      logs: [],
    };

    this.executions.set(execution.id, execution);
    workflow.status = 'running';
    workflow.lastRun = new Date();

    try {
      execution.logs.push(`Starting workflow: ${workflow.name}`);

      // Execute each action
      for (const action of workflow.actions) {
        execution.logs.push(`Executing action: ${action.type}`);
        
        try {
          const result = await this.executeAction(action, execution);
          execution.results[action.type] = result;
          execution.logs.push(`Action ${action.type} completed successfully`);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          execution.errors.push(`Action ${action.type} failed: ${errorMessage}`);
          execution.logs.push(`Action ${action.type} failed: ${errorMessage}`);
        }
      }

      execution.status = execution.errors.length > 0 ? 'completed' : 'completed';
      workflow.successCount++;
    } catch (error) {
      execution.status = 'failed';
      execution.errors.push(error instanceof Error ? error.message : 'Unknown error');
      workflow.errorCount++;
    } finally {
      execution.endTime = new Date();
      execution.duration = execution.endTime.getTime() - execution.startTime.getTime();
      workflow.status = 'idle';
      workflow.runCount++;
      workflow.updatedAt = new Date();

      // Notify completion
      companyBrainWebSocketService.broadcastAnalyticsUpdate({
        type: 'workflow_execution_complete',
        workflowId,
        executionId: execution.id,
        status: execution.status,
        duration: execution.duration,
      });
    }

    return execution;
  }

  /**
   * Execute a single workflow action
   */
  private async executeAction(
    action: WorkflowAction,
    execution: WorkflowExecution
  ): Promise<any> {
    switch (action.type) {
      case 'sync_integration':
        return await this.syncIntegrationAction(action.config);
      case 'process_documents':
        return await this.processDocumentsAction(action.config);
      case 'extract_knowledge':
        return await this.extractKnowledgeAction(action.config);
      case 'generate_report':
        return await this.generateReportAction(action.config);
      case 'notify':
        return await this.notifyAction(action.config);
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  /**
   * Sync integration action
   */
  private async syncIntegrationAction(config: Record<string, any>): Promise<any> {
    const integrationId = config.integrationId;
    if (!integrationId) {
      throw new Error('Integration ID required for sync action');
    }

    const result = await integrationService.syncIntegration(integrationId);
    return result;
  }

  /**
   * Process documents action
   */
  private async processDocumentsAction(config: Record<string, any>): Promise<any> {
    const source = config.source;
    const limit = config.limit || 100;

    // In production, would fetch documents from source
    execution.logs.push(`Processing documents from ${source}`);

    return {
      source,
      documentsProcessed: 0,
      knowledgeNodesCreated: 0,
    };
  }

  /**
   * Extract knowledge action
   */
  private async extractKnowledgeAction(config: Record<string, any>): Promise<any> {
    const source = config.source;
    const content = config.content;

    if (!content) {
      throw new Error('Content required for knowledge extraction');
    }

    const knowledge = await knowledgeExtractionService.extractFromText(
      content,
      source,
      config.context
    );

    return knowledge;
  }

  /**
   * Generate report action
   */
  private async generateReportAction(config: Record<string, any>): Promise<any> {
    const reportType = config.type || 'summary';
    const format = config.format || 'json';

    // In production, would generate actual reports
    return {
      type: reportType,
      format,
      generatedAt: new Date(),
      data: {},
    };
  }

  /**
   * Notify action
   */
  private async notifyAction(config: Record<string, any>): Promise<any> {
    const recipients = config.recipients || [];
    const message = config.message;
    const type = config.type || 'info';

    // Send notification via WebSocket
    companyBrainWebSocketService.broadcastAnalyticsUpdate({
      type: 'workflow_notification',
      message,
      notificationType: type,
      recipients,
    });

    return {
      sent: true,
      recipients,
      message,
    };
  }

  /**
   * Get workflow by ID
   */
  getWorkflow(workflowId: string): Workflow | undefined {
    return this.workflows.get(workflowId);
  }

  /**
   * Get all workflows
   */
  getWorkflows(filters?: {
    enabled?: boolean;
    status?: Workflow['status'];
  }): Workflow[] {
    let workflows = Array.from(this.workflows.values());

    if (filters?.enabled !== undefined) {
      workflows = workflows.filter(w => w.enabled === filters.enabled);
    }

    if (filters?.status) {
      workflows = workflows.filter(w => w.status === filters.status);
    }

    return workflows;
  }

  /**
   * Update workflow
   */
  updateWorkflow(workflowId: string, updates: Partial<Workflow>): Workflow | null {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return null;

    const updated = {
      ...workflow,
      ...updates,
      updatedAt: new Date(),
    };

    this.workflows.set(workflowId, updated);

    // Reschedule if schedule changed
    if (updates.schedule && updated.enabled) {
      this.unscheduleWorkflow(workflowId);
      this.scheduleWorkflow(updated);
    }

    return updated;
  }

  /**
   * Enable/disable workflow
   */
  toggleWorkflow(workflowId: string, enabled: boolean): Workflow | null {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return null;

    workflow.enabled = enabled;
    workflow.updatedAt = new Date();

    if (enabled && workflow.schedule) {
      this.scheduleWorkflow(workflow);
    } else {
      this.unscheduleWorkflow(workflowId);
    }

    return workflow;
  }

  /**
   * Unschedule a workflow
   */
  private unscheduleWorkflow(workflowId: string): void {
    const taskId = this.scheduledTasks.get(workflowId);
    if (taskId) {
      clearTimeout(taskId);
      this.scheduledTasks.delete(workflowId);
    }
  }

  /**
   * Delete workflow
   */
  deleteWorkflow(workflowId: string): boolean {
    this.unscheduleWorkflow(workflowId);
    return this.workflows.delete(workflowId);
  }

  /**
   * Get workflow execution by ID
   */
  getExecution(executionId: string): WorkflowExecution | undefined {
    return this.executions.get(executionId);
  }

  /**
   * Get executions for a workflow
   */
  getWorkflowExecutions(workflowId: string, limit: number = 20): WorkflowExecution[] {
    const executions = Array.from(this.executions.values())
      .filter(e => e.workflowId === workflowId)
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime())
      .slice(0, limit);

    return executions;
  }

  /**
   * Get workflow statistics
   */
  getWorkflowStats(workflowId: string): {
    totalRuns: number;
    successRate: number;
    avgDuration: number;
    lastRun?: Date;
    nextRun?: Date;
  } | null {
    const workflow = this.workflows.get(workflowId);
    if (!workflow) return null;

    const executions = this.getWorkflowExecutions(workflowId, 100);
    const completedExecutions = executions.filter(e => e.status === 'completed');
    const avgDuration = completedExecutions.length > 0
      ? completedExecutions.reduce((sum, e) => sum + (e.duration || 0), 0) / completedExecutions.length
      : 0;

    return {
      totalRuns: workflow.runCount,
      successRate: workflow.runCount > 0 ? (workflow.successCount / workflow.runCount) * 100 : 0,
      avgDuration,
      lastRun: workflow.lastRun,
      nextRun: workflow.nextRun,
    };
  }

  /**
   * Create predefined workflows
   */
  createPredefinedWorkflows(): void {
    // Daily sync all integrations
    this.createWorkflow(
      'Daily Integration Sync',
      'Sync all enabled integrations daily to capture latest knowledge',
      [{ type: 'schedule', config: { frequency: 'daily' } }],
      [
        {
          type: 'sync_integration',
          config: { integrationId: 'all' },
        },
      ],
      { frequency: 'daily' }
    );

    // Weekly knowledge quality check
    this.createWorkflow(
      'Weekly Knowledge Quality Check',
      'Analyze knowledge quality and generate insights',
      [{ type: 'schedule', config: { frequency: 'weekly' } }],
      [
        {
          type: 'generate_report',
          config: { type: 'quality', format: 'json' },
        },
        {
          type: 'notify',
          config: { recipients: ['admin'], type: 'info', message: 'Weekly quality report generated' },
        },
      ],
      { frequency: 'weekly' }
    );

    // Monthly knowledge preservation check
    this.createWorkflow(
      'Monthly Knowledge Preservation Check',
      'Check for employees at risk and trigger preservation workflows',
      [{ type: 'schedule', config: { frequency: 'monthly' } }],
      [
        {
          type: 'generate_report',
          config: { type: 'risk_assessment', format: 'json' },
        },
        {
          type: 'notify',
          config: { recipients: ['hr', 'admin'], type: 'warning', message: 'Monthly risk assessment completed' },
        },
      ],
      { frequency: 'monthly' }
    );
  }

  /**
   * Get all scheduled tasks status
   */
  getScheduledTasksStatus(): Array<{
    workflowId: string;
    workflowName: string;
    nextRun?: Date;
    status: 'scheduled' | 'not_scheduled';
  }> {
    const status: Array<{
      workflowId: string;
      workflowName: string;
      nextRun?: Date;
      status: 'scheduled' | 'not_scheduled';
    }> = [];

    for (const workflow of this.workflows.values()) {
      status.push({
        workflowId: workflow.id,
        workflowName: workflow.name,
        nextRun: workflow.nextRun,
        status: this.scheduledTasks.has(workflow.id) ? 'scheduled' : 'not_scheduled',
      });
    }

    return status;
  }

  /**
   * Clear all workflows
   */
  clearWorkflows(): void {
    for (const workflowId of this.workflows.keys()) {
      this.unscheduleWorkflow(workflowId);
    }
    this.workflows.clear();
    this.executions.clear();
  }
}

// Export singleton instance
export const automatedWorkflowsService = new AutomatedWorkflowsService();
