/**
 * Workflow Builder Service
 * Visual workflow builder for agent collaboration and orchestration
 */

import { eq, and, or, desc, sql, inArray } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  agentWorkflows,
  workflowNodes,
  workflowConnections,
  workflowExecutions,
  workflowVariables,
  type AgentWorkflow,
  type WorkflowNode,
  type WorkflowConnection,
  type WorkflowExecution,
  type WorkflowVariable,
} from '../db/drizzle-schema';
import { logAudit } from '../lib/audit';
import { agentSchedulingService } from './agent-scheduling-service';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('WorkflowBuilder');

// Workflow Types
export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'archived';
export type NodeType =
  | 'trigger'
  | 'agent-task'
  | 'condition'
  | 'delay'
  | 'parallel'
  | 'merge'
  | 'webhook'
  | 'api-call'
  | 'notification'
  | 'data-transform'
  | 'loop'
  | 'error-handler'
  | 'sub-workflow'
  | 'human-approval';

export type TriggerType =
  | 'schedule'
  | 'webhook'
  | 'api'
  | 'event'
  | 'manual'
  | 'form-submission'
  | 'email-received'
  | 'file-upload';

// Position for visual editor
export interface Position {
  x: number;
  y: number;
}

// Workflow Node Definition
export interface NodeDefinition {
  id: string;
  type: NodeType;
  label: string;
  position: Position;
  config: NodeConfig;
  metadata?: {
    description?: string;
    icon?: string;
    color?: string;
  };
}

// Node Configuration Types
export interface NodeConfig {
  // Trigger Node
  triggerType?: TriggerType;
  triggerConfig?: {
    schedule?: string; // cron expression
    webhookUrl?: string;
    eventType?: string;
    apiEndpoint?: string;
  };

  // Agent Task Node
  agentTask?: {
    agentId: string;
    taskType: string;
    prompt: string;
    context?: Record<string, any>;
    maxExecutionTime?: number;
    retryOnFailure?: boolean;
    retryAttempts?: number;
    outputMapping?: Record<string, string>;
  };

  // Condition Node
  condition?: {
    conditions: {
      type: 'variable' | 'agent-output' | 'time' | 'custom';
      operator: 'equals' | 'not-equals' | 'contains' | 'greater-than' | 'less-than' | 'exists' | 'regex';
      left: string;
      right: string;
      value?: any;
    }[];
    logic: 'and' | 'or';
  };

  // Delay Node
  delay?: {
    duration: number;
    unit: 'seconds' | 'minutes' | 'hours' | 'days';
    untilTime?: string;
    untilDate?: Date;
  };

  // Parallel Node
  parallel?: {
    branches: number;
    waitForAll: boolean;
    aggregationType: 'array' | 'object' | 'merge';
  };

  // Webhook Node
  webhook?: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: string;
    timeout?: number;
    retryAttempts?: number;
  };

  // API Call Node
  apiCall?: {
    endpoint: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: any;
    authentication?: {
      type: 'none' | 'bearer' | 'basic' | 'api-key';
      value?: string;
    };
    timeout?: number;
  };

  // Notification Node
  notification?: {
    channels: ('email' | 'sms' | 'push' | 'slack' | 'webhook')[];
    recipients: string[];
    template: string;
    variables?: Record<string, string>;
  };

  // Data Transform Node
  dataTransform?: {
    operations: {
      type: 'map' | 'Filter' | 'reduce' | 'sort' | 'group' | 'flatten' | 'validate';
      config: Record<string, any>;
    }[];
  };

  // Loop Node
  loop?: {
    type: 'for-each' | 'while' | 'repeat';
    iterable?: string; // Variable name
    condition?: string;
    maxIterations?: number;
  };

  // Error Handler Node
  errorHandler?: {
    strategy: 'retry' | 'fallback' | 'notify' | 'abort' | 'continue';
    retryConfig?: {
      maxAttempts: number;
      delay: number;
      backoffMultiplier: number;
    };
    fallbackNode?: string;
    notifyChannels?: ('email' | 'slack' | 'webhook')[];
  };

  // Sub-workflow Node
  subWorkflow?: {
    workflowId: string;
    inputMapping?: Record<string, string>;
    outputMapping?: Record<string, string>;
    waitForCompletion: boolean;
  };

  // Human Approval Node
  humanApproval?: {
    approvers: string[];
    approvalType: 'any' | 'all' | 'majority';
    timeout: number;
    reminderInterval?: number;
    escalation?: {
      afterMinutes: number;
      escalateTo: string[];
    };
  };
}

// Connection Definition
export interface ConnectionDefinition {
  id: string;
  source: string; // Source node ID
  target: string; // Target node ID
  sourceHandle?: string; // Output port
  targetHandle?: string; // Input port
  label?: string;
  condition?: string; // Condition label for conditional connections
  style?: {
    color?: string;
    type?: 'straight' | 'step' | 'smoothstep' | 'bezier';
    animated?: boolean;
  };
}

// Workflow Variable
export interface VariableDefinition {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'date';
  defaultValue?: any;
  required: boolean;
  description?: string;
  scope: 'workflow' | 'execution' | 'global';
}

// Workflow Definition
export interface WorkflowDefinition {
  name: string;
  description?: string;
  nodes: NodeDefinition[];
  connections: ConnectionDefinition[];
  variables: VariableDefinition[];
  settings?: {
    autoSave?: boolean;
    version?: string;
    category?: string;
    tags?: string[];
    isTemplate?: boolean;
    timeout?: number;
    maxExecutions?: number;
    concurrentExecutionLimit?: number;
  };
}

// Execution Context
export interface WorkflowContext {
  workflowId: string;
  executionId: string;
  triggerData: Record<string, any>;
  variables: Record<string, any>;
  nodeOutputs: Map<string, any>;
  executionPath: string[];
  startTime: Date;
  userId?: string;
  organizationId?: string;
}

// Execution Result
export interface ExecutionResult {
  success: boolean;
  executionId: string;
  output?: Record<string, any>;
  error?: string;
  completedAt?: Date;
  executionTime: number;
  nodeResults: Map<string, NodeResult>;
}

// Node Execution Result
export interface NodeResult {
  success: boolean;
  output?: any;
  error?: string;
  executionTime: number;
  startedAt: Date;
  completedAt?: Date;
}

// Workflow Statistics
export interface WorkflowStats {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  successRate: number;
  activeExecutions: number;
  lastExecutedAt?: Date;
}

// Workflow Template
export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  definition: WorkflowDefinition;
  tags: string[];
  popularity: number;
}

class WorkflowBuilderService {
  private activeExecutions: Map<string, WorkflowExecution> = new Map();
  private executionContexts: Map<string, WorkflowContext> = new Map();

  // Create a new workflow
  async createWorkflow(
    definition: WorkflowDefinition,
    userId?: string,
    organizationId?: string
  ): Promise<{ success: boolean; workflowId?: string; error?: string }> {
    try {
      // Validate workflow
      const validation = this.validateWorkflow(definition);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      const workflowId = crypto.randomUUID();

      // Create workflow record
      await db.insert(agentWorkflows).values({
        id: workflowId,
        name: definition.name,
        description: definition.description,
        status: 'draft',
        definition: JSON.stringify(definition),
        createdBy: userId,
        organizationId,
        version: definition.settings?.version || '1.0.0',
        category: definition.settings?.category,
        tags: definition.settings?.tags || [],
        isTemplate: definition.settings?.isTemplate || false,
        settings: JSON.stringify(definition.settings || {}),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Create nodes
      for (const node of definition.nodes) {
        await db.insert(workflowNodes).values({
          id: node.id,
          workflowId,
          type: node.type,
          label: node.label,
          positionX: node.position.x,
          positionY: node.position.y,
          config: JSON.stringify(node.config),
          metadata: JSON.stringify(node.metadata || {}),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Create connections
      for (const conn of definition.connections) {
        await db.insert(workflowConnections).values({
          id: conn.id,
          workflowId,
          sourceNodeId: conn.source,
          targetNodeId: conn.target,
          sourceHandle: conn.sourceHandle,
          targetHandle: conn.targetHandle,
          label: conn.label,
          condition: conn.condition,
          style: JSON.stringify(conn.style || {}),
          createdAt: new Date(),
        });
      }

      // Create variables
      for (const variable of definition.variables) {
        await db.insert(workflowVariables).values({
          id: variable.id,
          workflowId,
          name: variable.name,
          type: variable.type,
          defaultValue: variable.defaultValue !== undefined ? JSON.stringify(variable.defaultValue) : null,
          required: variable.required,
          description: variable.description,
          scope: variable.scope,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      await logAudit({
        userId: userId || 'system',
        organizationId: organizationId || 'system',
        action: 'workflow_created',
        resource: 'agent_workflow',
        resourceId: workflowId,
        details: { name: definition.name, nodes: definition.nodes.length },
      });

      return { success: true, workflowId };
    } catch (error) {
      logger.error('Error creating workflow', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create workflow',
      };
    }
  }

  // Update workflow
  async updateWorkflow(
    workflowId: string,
    updates: Partial<WorkflowDefinition>,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const existing = await this.getWorkflowById(workflowId);
      if (!existing) {
        return { success: false, error: 'Workflow not found' };
      }

      // Parse existing definition
      const existingDef = JSON.parse(existing.definition as string) as WorkflowDefinition;
      const mergedDef = { ...existingDef, ...updates };

      // Validate updated workflow
      const validation = this.validateWorkflow(mergedDef);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      // Update workflow record
      await db.update(agentWorkflows)
        .set({
          name: updates.name || existing.name,
          description: updates.description || existing.description,
          definition: JSON.stringify(mergedDef),
          version: this.incrementVersion(existing.version || '1.0.0'),
          updatedAt: new Date(),
        })
        .where(eq(agentWorkflows.id, workflowId));

      // If nodes updated, delete and recreate
      if (updates.nodes) {
        await db.delete(workflowNodes).where(eq(workflowNodes.workflowId, workflowId));
        for (const node of updates.nodes) {
          await db.insert(workflowNodes).values({
            id: node.id,
            workflowId,
            type: node.type,
            label: node.label,
            positionX: node.position.x,
            positionY: node.position.y,
            config: JSON.stringify(node.config),
            metadata: JSON.stringify(node.metadata || {}),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      // If connections updated, delete and recreate
      if (updates.connections) {
        await db.delete(workflowConnections).where(eq(workflowConnections.workflowId, workflowId));
        for (const conn of updates.connections) {
          await db.insert(workflowConnections).values({
            id: conn.id,
            workflowId,
            sourceNodeId: conn.source,
            targetNodeId: conn.target,
            sourceHandle: conn.sourceHandle,
            targetHandle: conn.targetHandle,
            label: conn.label,
            condition: conn.condition,
            style: JSON.stringify(conn.style || {}),
            createdAt: new Date(),
          });
        }
      }

      await logAudit({
        userId: userId || 'system',
        action: 'workflow_updated',
        resource: 'agent_workflow',
        resourceId: workflowId,
        details: { updates: Object.keys(updates) },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error updating workflow', error as Error);
      return { success: false, error: 'Failed to update workflow' };
    }
  }

  // Delete workflow
  async deleteWorkflow(workflowId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      await db.delete(workflowVariables).where(eq(workflowVariables.workflowId, workflowId));
      await db.delete(workflowConnections).where(eq(workflowConnections.workflowId, workflowId));
      await db.delete(workflowNodes).where(eq(workflowNodes.workflowId, workflowId));
      await db.delete(workflowExecutions).where(eq(workflowExecutions.workflowId, workflowId));
      await db.delete(agentWorkflows).where(eq(agentWorkflows.id, workflowId));

      await logAudit({
        userId: userId || 'system',
        action: 'workflow_deleted',
        resource: 'agent_workflow',
        resourceId: workflowId,
      });

      return { success: true };
    } catch (error) {
      logger.error('Error deleting workflow', error as Error);
      return { success: false, error: 'Failed to delete workflow' };
    }
  }

  // Execute workflow
  async executeWorkflow(
    workflowId: string,
    triggerData: Record<string, any> = {},
    userId?: string,
    organizationId?: string
  ): Promise<ExecutionResult> {
    const executionId = crypto.randomUUID();
    const startTime = new Date();

    try {
      const workflow = await this.getWorkflowById(workflowId);
      if (!workflow) {
        return {
          success: false,
          executionId,
          executionTime: 0,
          error: 'Workflow not found',
          nodeResults: new Map(),
        };
      }

      if (workflow.status !== 'active') {
        return {
          success: false,
          executionId,
          executionTime: 0,
          error: 'Workflow is not active',
          nodeResults: new Map(),
        };
      }

      // Create execution record
      await db.insert(workflowExecutions).values({
        id: executionId,
        workflowId,
        status: 'running',
        triggerData: JSON.stringify(triggerData),
        startedAt: startTime,
        triggeredBy: userId || 'system',
      });

      // Parse workflow definition
      const definition = JSON.parse(workflow.definition as string) as WorkflowDefinition;

      // Initialize context
      const context: WorkflowContext = {
        workflowId,
        executionId,
        triggerData,
        variables: this.initializeVariables(definition.variables, triggerData),
        nodeOutputs: new Map(),
        executionPath: [],
        startTime,
        userId,
        organizationId,
      };

      this.executionContexts.set(executionId, context);

      // Find trigger node
      const triggerNode = definition.nodes.find(n => n.type === 'trigger');
      if (!triggerNode) {
        throw new Error('No trigger node found in workflow');
      }

      // Execute workflow starting from trigger
      const nodeResults = new Map<string, NodeResult>();
      await this.executeNode(triggerNode, definition, context, nodeResults);

      // Calculate execution time
      const completedAt = new Date();
      const executionTime = completedAt.getTime() - startTime.getTime();

      // Update execution record
      const allSuccessful = Array.from(nodeResults.values()).every(r => r.success);
      await db.update(workflowExecutions)
        .set({
          status: allSuccessful ? 'completed' : 'failed',
          completedAt,
          result: JSON.stringify({
            nodeResults: Object.fromEntries(nodeResults),
            variables: context.variables,
          }),
          executionTime,
        })
        .where(eq(workflowExecutions.id, executionId));

      // Cleanup
      this.executionContexts.delete(executionId);

      return {
        success: allSuccessful,
        executionId,
        output: context.variables,
        completedAt,
        executionTime,
        nodeResults,
      };
    } catch (error) {
      logger.error('Error executing workflow', error as Error);

      const completedAt = new Date();
      const executionTime = completedAt.getTime() - startTime.getTime();

      await db.update(workflowExecutions)
        .set({
          status: 'failed',
          completedAt,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          executionTime,
        })
        .where(eq(workflowExecutions.id, executionId));

      this.executionContexts.delete(executionId);

      return {
        success: false,
        executionId,
        error: error instanceof Error ? error.message : 'Workflow execution failed',
        executionTime,
        nodeResults: new Map(),
      };
    }
  }

  // Get workflow by ID
  async getWorkflowById(workflowId: string): Promise<AgentWorkflow | null> {
    const [workflow] = await db.select().from(agentWorkflows)
      .where(eq(agentWorkflows.id, workflowId));
    return workflow || null;
  }

  // Get workflows
  async getWorkflows(options?: {
    organizationId?: string;
    status?: WorkflowStatus;
    category?: string;
    isTemplate?: boolean;
  }): Promise<AgentWorkflow[]> {
    let query = db.select().from(agentWorkflows)
      .orderBy(desc(agentWorkflows.updatedAt));

    if (options?.organizationId) {
      query = query.where(eq(agentWorkflows.organizationId, options.organizationId));
    }
    if (options?.status) {
      query = query.where(eq(agentWorkflows.status, options.status));
    }
    if (options?.category) {
      query = query.where(eq(agentWorkflows.category, options.category));
    }
    if (options?.isTemplate !== undefined) {
      query = query.where(eq(agentWorkflows.isTemplate, options.isTemplate));
    }

    return await query;
  }

  // Get workflow execution history
  async getExecutionHistory(
    workflowId?: string,
    limit: number = 50
  ): Promise<WorkflowExecution[]> {
    let query = db.select().from(workflowExecutions)
      .orderBy(desc(workflowExecutions.startedAt))
      .limit(limit);

    if (workflowId) {
      query = query.where(eq(workflowExecutions.workflowId, workflowId));
    }

    return await query;
  }

  // Get workflow statistics
  async getWorkflowStats(workflowId?: string, organizationId?: string): Promise<WorkflowStats> {
    try {
      let query = db.select().from(workflowExecutions);
      if (workflowId) {
        query = query.where(eq(workflowExecutions.workflowId, workflowId));
      }

      const executions = await query;

      const successful = executions.filter(e => e.status === 'completed');
      const failed = executions.filter(e => e.status === 'failed');
      const active = executions.filter(e => e.status === 'running');

      const executionTimes = executions
        .filter(e => e.executionTime)
        .map(e => e.executionTime || 0);

      const avgExecutionTime = executionTimes.length > 0
        ? executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length
        : 0;

      const successRate = executions.length > 0
        ? (successful.length / executions.length) * 100
        : 0;

      return {
        totalExecutions: executions.length,
        successfulExecutions: successful.length,
        failedExecutions: failed.length,
        averageExecutionTime: Math.round(avgExecutionTime),
        successRate: Math.round(successRate * 100) / 100,
        activeExecutions: active.length,
        lastExecutedAt: executions.length > 0 ? executions[0].startedAt : undefined,
      };
    } catch (error) {
      logger.error('Error getting workflow stats', error as Error);
      return {
        totalExecutions: 0,
        successfulExecutions: 0,
        failedExecutions: 0,
        averageExecutionTime: 0,
        successRate: 0,
        activeExecutions: 0,
      };
    }
  }

  // Activate workflow
  async activateWorkflow(workflowId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentWorkflows)
        .set({ status: 'active', updatedAt: new Date() })
        .where(eq(agentWorkflows.id, workflowId));

      await logAudit({
        userId: userId || 'system',
        action: 'workflow_activated',
        resource: 'agent_workflow',
        resourceId: workflowId,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to activate workflow' };
    }
  }

  // Pause workflow
  async pauseWorkflow(workflowId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentWorkflows)
        .set({ status: 'paused', updatedAt: new Date() })
        .where(eq(agentWorkflows.id, workflowId));

      await logAudit({
        userId: userId || 'system',
        action: 'workflow_paused',
        resource: 'agent_workflow',
        resourceId: workflowId,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to pause workflow' };
    }
  }

  // Archive workflow
  async archiveWorkflow(workflowId: string, userId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(agentWorkflows)
        .set({ status: 'archived', updatedAt: new Date() })
        .where(eq(agentWorkflows.id, workflowId));

      await logAudit({
        userId: userId || 'system',
        action: 'workflow_archived',
        resource: 'agent_workflow',
        resourceId: workflowId,
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to archive workflow' };
    }
  }

  // Clone workflow
  async cloneWorkflow(
    workflowId: string,
    newName: string,
    userId?: string
  ): Promise<{ success: boolean; newWorkflowId?: string; error?: string }> {
    try {
      const original = await this.getWorkflowById(workflowId);
      if (!original) {
        return { success: false, error: 'Original workflow not found' };
      }

      const definition = JSON.parse(original.definition as string) as WorkflowDefinition;
      definition.name = newName;

      // Generate new IDs for nodes and connections
      const idMap = new Map<string, string>();
      for (const node of definition.nodes) {
        const newId = crypto.randomUUID();
        idMap.set(node.id, newId);
        node.id = newId;
      }

      for (const conn of definition.connections) {
        conn.id = crypto.randomUUID();
        conn.source = idMap.get(conn.source) || conn.source;
        conn.target = idMap.get(conn.target) || conn.target;
      }

      const result = await this.createWorkflow(definition, userId, original.organizationId);
      return result;
    } catch (error) {
      return { success: false, error: 'Failed to clone workflow' };
    }
  }

  // Get workflow templates
  async getWorkflowTemplates(category?: string): Promise<WorkflowTemplate[]> {
    const templates = await this.getWorkflows({ isTemplate: true, status: 'active' });

    return templates.map(t => {
      const def = JSON.parse(t.definition as string) as WorkflowDefinition;
      return {
        id: t.id,
        name: t.name,
        description: t.description || '',
        category: t.category || 'general',
        icon: 'workflow',
        definition: def,
        tags: t.tags || [],
        popularity: Math.floor(Math.random() * 1000), // Would be calculated from usage
      };
    }).filter(t => !category || t.category === category);
  }

  // Private helper methods

  private validateWorkflow(definition: WorkflowDefinition): { valid: boolean; error?: string } {
    if (!definition.name) {
      return { valid: false, error: 'Workflow name is required' };
    }
    if (!definition.nodes || definition.nodes.length === 0) {
      return { valid: false, error: 'Workflow must have at least one node' };
    }

    const triggerNodes = definition.nodes.filter(n => n.type === 'trigger');
    if (triggerNodes.length !== 1) {
      return { valid: false, error: 'Workflow must have exactly one trigger node' };
    }

    // Check for orphan nodes
    const connectedNodeIds = new Set<string>();
    for (const conn of definition.connections) {
      connectedNodeIds.add(conn.source);
      connectedNodeIds.add(conn.target);
    }

    const orphanNodes = definition.nodes.filter(
      n => n.type !== 'trigger' && !connectedNodeIds.has(n.id)
    );
    if (orphanNodes.length > 0) {
      return {
        valid: false,
        error: `Orphan nodes found: ${orphanNodes.map(n => n.label).join(', ')}`,
      };
    }

    return { valid: true };
  }

  private initializeVariables(
    variables: VariableDefinition[],
    triggerData: Record<string, any>
  ): Record<string, any> {
    const result: Record<string, any> = {};

    for (const variable of variables) {
      if (triggerData[variable.name] !== undefined) {
        result[variable.name] = triggerData[variable.name];
      } else if (variable.defaultValue !== undefined) {
        result[variable.name] = variable.defaultValue;
      }
    }

    return result;
  }

  private async executeNode(
    node: NodeDefinition,
    definition: WorkflowDefinition,
    context: WorkflowContext,
    nodeResults: Map<string, NodeResult>
  ): Promise<void> {
    const startedAt = new Date();

    try {
      context.executionPath.push(node.id);

      let result: NodeResult;

      switch (node.type) {
        case 'trigger':
          result = await this.executeTriggerNode(node, context);
          break;
        case 'agent-task':
          result = await this.executeAgentTaskNode(node, context);
          break;
        case 'condition':
          result = await this.executeConditionNode(node, context);
          break;
        case 'delay':
          result = await this.executeDelayNode(node, context);
          break;
        case 'parallel':
          result = await this.executeParallelNode(node, definition, context, nodeResults);
          break;
        case 'webhook':
          result = await this.executeWebhookNode(node, context);
          break;
        case 'api-call':
          result = await this.executeApiCallNode(node, context);
          break;
        case 'notification':
          result = await this.executeNotificationNode(node, context);
          break;
        case 'data-transform':
          result = await this.executeDataTransformNode(node, context);
          break;
        case 'loop':
          result = await this.executeLoopNode(node, definition, context, nodeResults);
          break;
        case 'sub-workflow':
          result = await this.executeSubWorkflowNode(node, context);
          break;
        case 'human-approval':
          result = await this.executeHumanApprovalNode(node, context);
          break;
        default:
          result = {
            success: true,
            output: null,
            executionTime: 0,
            startedAt,
            completedAt: new Date(),
          };
      }

      nodeResults.set(node.id, result);

      if (result.success) {
        context.nodeOutputs.set(node.id, result.output);

        // Find and execute next nodes
        const outgoingConnections = definition.connections.filter(c => c.source === node.id);

        for (const conn of outgoingConnections) {
          // Check condition if present
          if (conn.condition && node.type === 'condition') {
            const conditionResult = context.nodeOutputs.get(node.id);
            if (conditionResult !== conn.condition) {
              continue;
            }
          }

          const nextNode = definition.nodes.find(n => n.id === conn.target);
          if (nextNode) {
            await this.executeNode(nextNode, definition, context, nodeResults);
          }
        }
      } else if (node.config.errorHandler) {
        // Handle error according to error handler config
        await this.handleNodeError(node, result, definition, context, nodeResults);
      }
    } catch (error) {
      nodeResults.set(node.id, {
        success: false,
        error: error instanceof Error ? error.message : 'Node execution failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      });
    }
  }

  private async executeTriggerNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();

    return {
      success: true,
      output: context.triggerData,
      executionTime: 0,
      startedAt,
      completedAt: new Date(),
    };
  }

  private async executeAgentTaskNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.agentTask;

    if (!config) {
      return {
        success: false,
        error: 'Agent task configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      // Replace variables in prompt
      let prompt = config.prompt;
      for (const [key, value] of Object.entries(context.variables)) {
        prompt = prompt.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      }

      // This would integrate with the AI agent service
      // const result = await aiAgentService.executeTask({
      //   agentId: config.agentId,
      //   task: prompt,
      //   context: config.context,
      // });

      // Simulate execution
      await new Promise(resolve => setTimeout(resolve, 100));

      const output = { result: 'Agent task completed', prompt, agentId: config.agentId };

      // Apply output mapping
      if (config.outputMapping) {
        for (const [outputKey, variableName] of Object.entries(config.outputMapping)) {
          context.variables[variableName] = output[outputKey];
        }
      }

      const completedAt = new Date();
      return {
        success: true,
        output,
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Agent task failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeConditionNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.condition;

    if (!config) {
      return {
        success: false,
        error: 'Condition configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      let result = config.logic === 'and';

      for (const condition of config.conditions) {
        let conditionValue: boolean;
        const leftValue = this.resolveValue(condition.left, context);
        const rightValue = condition.value || this.resolveValue(condition.right, context);

        switch (condition.operator) {
          case 'equals':
            conditionValue = leftValue === rightValue;
            break;
          case 'not-equals':
            conditionValue = leftValue !== rightValue;
            break;
          case 'contains':
            conditionValue = String(leftValue).includes(String(rightValue));
            break;
          case 'greater-than':
            conditionValue = Number(leftValue) > Number(rightValue);
            break;
          case 'less-than':
            conditionValue = Number(leftValue) < Number(rightValue);
            break;
          case 'exists':
            conditionValue = leftValue !== undefined && leftValue !== null;
            break;
          case 'regex':
            conditionValue = new RegExp(String(rightValue)).test(String(leftValue));
            break;
          default:
            conditionValue = false;
        }

        if (config.logic === 'and') {
          result = result && conditionValue;
        } else {
          result = result || conditionValue;
        }
      }

      const completedAt = new Date();
      return {
        success: true,
        output: result ? 'true' : 'false',
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Condition evaluation failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeDelayNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.delay;

    if (!config) {
      return {
        success: false,
        error: 'Delay configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      let delayMs: number;

      if (config.untilTime && config.untilDate) {
        const targetDate = new Date(config.untilDate);
        const [hours, minutes] = config.untilTime.split(':').map(Number);
        targetDate.setHours(hours, minutes, 0, 0);
        delayMs = targetDate.getTime() - Date.now();
      } else {
        const multipliers = { seconds: 1000, minutes: 60000, hours: 3600000, days: 86400000 };
        delayMs = config.duration * multipliers[config.unit];
      }

      if (delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      const completedAt = new Date();
      return {
        success: true,
        output: { delayed: true, duration: delayMs },
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Delay execution failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeParallelNode(
    node: NodeDefinition,
    definition: WorkflowDefinition,
    context: WorkflowContext,
    nodeResults: Map<string, NodeResult>
  ): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.parallel;

    if (!config) {
      return {
        success: false,
        error: 'Parallel configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      // Get connected nodes
      const connections = definition.connections.filter(c => c.source === node.id);
      const branchPromises = connections.map(async conn => {
        const branchNode = definition.nodes.find(n => n.id === conn.target);
        if (branchNode) {
          await this.executeNode(branchNode, definition, context, nodeResults);
        }
      });

      if (config.waitForAll) {
        await Promise.all(branchPromises);
      } else {
        await Promise.race(branchPromises);
      }

      const completedAt = new Date();
      return {
        success: true,
        output: { branchesExecuted: connections.length },
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Parallel execution failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeWebhookNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.webhook;

    if (!config) {
      return {
        success: false,
        error: 'Webhook configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      // Replace variables in URL and body
      let url = config.url;
      let body = config.body;
      for (const [key, value] of Object.entries(context.variables)) {
        const replacement = String(value);
        url = url.replace(new RegExp(`{{${key}}}`, 'g'), replacement);
        if (body) {
          body = body.replace(new RegExp(`{{${key}}}`, 'g'), replacement);
        }
      }

      const response = await fetch(url, {
        method: config.method,
        headers: config.headers || {},
        body: body || undefined,
      });

      const responseData = await response.json().catch(() => null);

      const completedAt = new Date();
      return {
        success: response.ok,
        output: { status: response.status, data: responseData },
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook call failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeApiCallNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    // Similar to webhook but with more auth options
    return this.executeWebhookNode(node, context);
  }

  private async executeNotificationNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.notification;

    if (!config) {
      return {
        success: false,
        error: 'Notification configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      // Process template with variables
      let message = config.template;
      for (const [key, value] of Object.entries(context.variables)) {
        message = message.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
      }

      // Send notifications
      for (const channel of config.channels) {
        for (const recipient of config.recipients) {
          // Would integrate with notification service
          logger.info(`Sending ${channel} notification to ${recipient}: ${message}`);
        }
      }

      const completedAt = new Date();
      return {
        success: true,
        output: { channels: config.channels, recipients: config.recipients.length },
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Notification failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeDataTransformNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.dataTransform;

    if (!config) {
      return {
        success: false,
        error: 'Data transform configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      let data = context.variables;

      for (const operation of config.operations) {
        switch (operation.type) {
          case 'map':
            // Apply mapping transformation
            break;
          case 'Filter':
            // Apply Filter
            break;
          case 'sort':
            // Apply sorting
            break;
          case 'group':
            // Apply grouping
            break;
          default:
            break;
        }
      }

      const completedAt = new Date();
      return {
        success: true,
        output: data,
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Data transform failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeLoopNode(
    node: NodeDefinition,
    definition: WorkflowDefinition,
    context: WorkflowContext,
    nodeResults: Map<string, NodeResult>
  ): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.loop;

    if (!config) {
      return {
        success: false,
        error: 'Loop configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      let iterations = 0;
      const results = [];

      if (config.type === 'for-each' && config.iterable) {
        const iterable = context.variables[config.iterable] || [];
        for (const item of iterable) {
          if (config.maxIterations && iterations >= config.maxIterations) break;

          context.variables['loopItem'] = item;
          context.variables['loopIndex'] = iterations;

          // Execute loop body
          const connections = definition.connections.filter(c => c.source === node.id);
          for (const conn of connections) {
            const loopNode = definition.nodes.find(n => n.id === conn.target);
            if (loopNode) {
              await this.executeNode(loopNode, definition, context, nodeResults);
            }
          }

          iterations++;
        }
      }

      const completedAt = new Date();
      return {
        success: true,
        output: { iterations, results },
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Loop execution failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeSubWorkflowNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.subWorkflow;

    if (!config) {
      return {
        success: false,
        error: 'Sub-workflow configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      // Prepare input from mapping
      const input: Record<string, any> = {};
      if (config.inputMapping) {
        for (const [inputKey, variableName] of Object.entries(config.inputMapping)) {
          input[inputKey] = context.variables[variableName];
        }
      }

      // Execute sub-workflow
      const result = await this.executeWorkflow(config.workflowId, input, context.userId, context.organizationId);

      // Map output back to variables
      if (config.outputMapping && result.output) {
        for (const [outputKey, variableName] of Object.entries(config.outputMapping)) {
          context.variables[variableName] = result.output[outputKey];
        }
      }

      const completedAt = new Date();
      return {
        success: result.success,
        output: result.output,
        error: result.error,
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sub-workflow execution failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async executeHumanApprovalNode(node: NodeDefinition, context: WorkflowContext): Promise<NodeResult> {
    const startedAt = new Date();
    const config = node.config.humanApproval;

    if (!config) {
      return {
        success: false,
        error: 'Human approval configuration missing',
        executionTime: 0,
        startedAt,
        completedAt: new Date(),
      };
    }

    try {
      // This would create an approval request in the system
      // and wait for human interaction

      // For now, simulate auto-approval
      logger.info(`Approval requested from ${config.approvers.join(', ')}`);

      const completedAt = new Date();
      return {
        success: true,
        output: { approved: true, approvers: config.approvers },
        executionTime: completedAt.getTime() - startedAt.getTime(),
        startedAt,
        completedAt,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Human approval failed',
        executionTime: new Date().getTime() - startedAt.getTime(),
        startedAt,
        completedAt: new Date(),
      };
    }
  }

  private async handleNodeError(
    node: NodeDefinition,
    errorResult: NodeResult,
    definition: WorkflowDefinition,
    context: WorkflowContext,
    nodeResults: Map<string, NodeResult>
  ): Promise<void> {
    const errorHandler = node.config.errorHandler;
    if (!errorHandler) return;

    switch (errorHandler.strategy) {
      case 'retry':
        // Retry logic would go here
        break;
      case 'fallback':
        if (errorHandler.fallbackNode) {
          const fallbackNode = definition.nodes.find(n => n.id === errorHandler.fallbackNode);
          if (fallbackNode) {
            await this.executeNode(fallbackNode, definition, context, nodeResults);
          }
        }
        break;
      case 'notify':
        // Send error notifications
        break;
      case 'continue':
        // Continue to next nodes despite error
        break;
      case 'abort':
      default:
        // Stop workflow execution
        throw new Error(errorResult.error || 'Node execution failed');
    }
  }

  private resolveValue(expression: string, context: WorkflowContext): any {
    // Handle variable references
    if (expression.startsWith('{{') && expression.endsWith('}}')) {
      const varName = expression.slice(2, -2);
      return context.variables[varName];
    }

    // Handle node output references
    if (expression.startsWith('node.')) {
      const nodeId = expression.split('.')[1];
      return context.nodeOutputs.get(nodeId);
    }

    // Return as literal
    return expression;
  }

  private incrementVersion(version: string): string {
    const parts = version.split('.');
    const patch = parseInt(parts[2] || '0') + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  }
}

// Export singleton instance
export const workflowBuilderService = new WorkflowBuilderService();
