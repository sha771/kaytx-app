/**
 * Loop Engineering Type Definitions
 * 
 * Core types for automated closed-cycle AI agent systems
 * that prompt, evaluate, and re-run agents until goals are met.
 */

export type LoopStatus = 'idle' | 'running' | 'paused' | 'completed' | 'failed' | 'waiting';
export type LoopConditionOperator = 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'matches' | 'custom';
export type LoopTriggerType = 'manual' | 'scheduled' | 'event_based' | 'agent_completion' | 'condition_met';
export type LoopNodeType = 'agent' | 'condition' | 'action' | 'merge' | 'split' | 'end' | 'start';

/**
 * Loop condition for evaluating goals and deciding next steps
 */
export interface LoopCondition {
  id: string;
  name: string;
  description: string;
  operator: LoopConditionOperator;
  targetPath: string; // JSON path to the value to evaluate
  targetValue: any;
  customEvaluation?: string; // Custom JavaScript evaluation code
  threshold?: number;
  tolerance?: number;
}

/**
 * Loop node representing a step in the workflow
 */
export interface LoopNode {
  id: string;
  type: LoopNodeType;
  name: string;
  description: string;
  agentId?: string; // For agent nodes
  agentType?: 'main' | 'sub' | 'system';
  conditions?: LoopCondition[]; // Conditions to check before proceeding
  actions?: LoopAction[]; // Actions to execute
  nextNodes?: string[]; // IDs of next nodes
  metadata?: Record<string, any>;
  position?: { x: number; y: number }; // For visualization
}

/**
 * Action that can be executed within a loop
 */
export interface LoopAction {
  id: string;
  type: 'api_call' | 'data_transform' | 'notification' | 'agent_prompt' | 'custom';
  name: string;
  config: Record<string, any>;
  executeImmediately?: boolean;
}

/**
 * Loop configuration defining the entire workflow
 */
export interface LoopConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  status: LoopStatus;
  
  // Goal definition
  goal: {
    primary: string;
    secondary?: string[];
    successCriteria: LoopCondition[];
    maxIterations?: number;
    timeout?: number; // in seconds
  };
  
  // Workflow definition
  nodes: LoopNode[];
  startNodeId: string;
  endNodeId?: string;
  
  // Execution settings
  settings: {
    triggerType: LoopTriggerType;
    schedule?: string; // Cron expression for scheduled triggers
    retryPolicy: {
      maxRetries: number;
      backoffStrategy: 'linear' | 'exponential' | 'fixed';
      initialDelay: number;
    };
    concurrency: number;
    priority: 'low' | 'medium' | 'high' | 'critical';
  };
  
  // Integration
  integration: {
    departmentId?: string;
    relatedAgents: string[];
    inputSchema?: Record<string, any>;
    outputSchema?: Record<string, any>;
  };
  
  // Metadata
  metadata: {
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
    tags: string[];
    category: string;
  };
}

/**
 * Loop execution state and runtime data
 */
export interface LoopExecution {
  id: string;
  loopId: string;
  status: LoopStatus;
  startTime: Date;
  endTime?: Date;
  currentIteration: number;
  currentNodeId?: string;
  
  // Execution data
  inputData: Record<string, any>;
  outputData?: Record<string, any>;
  intermediateResults: Map<string, any>;
  
  // Performance metrics
  metrics: {
    totalExecutionTime: number;
    agentExecutionTimes: Map<string, number>;
    successfulSteps: number;
    failedSteps: number;
    resourceUsage: {
      cpu: number;
      memory: number;
      apiCalls: number;
    };
  };
  
  // Error handling
  errors: Array<{
    nodeId: string;
    error: string;
    timestamp: Date;
    retryCount: number;
  }>;
  
  // Decision history
  decisions: Array<{
    nodeId: string;
    conditionId: string;
    result: boolean;
    timestamp: Date;
  }>;
}

/**
 * Loop template for common patterns
 */
export interface LoopTemplate {
  id: string;
  name: string;
  description: string;
  category: 'optimization' | 'analysis' | 'automation' | 'monitoring' | 'coordination';
  config: Partial<LoopConfig>;
  defaultSettings: Partial<LoopConfig['settings']>;
  requiredAgents: string[];
  exampleUseCases: string[];
}

/**
 * Loop analytics and monitoring data
 */
export interface LoopAnalytics {
  loopId: string;
  timeRange: {
    start: Date;
    end: Date;
  };
  
  executions: {
    total: number;
    successful: number;
    failed: number;
    averageDuration: number;
    successRate: number;
  };
  
  performance: {
    averageIterations: number;
    averageAgentExecutionTime: number;
    resourceEfficiency: number;
    costOptimization: number;
  };
  
  trends: Array<{
    timestamp: Date;
    metric: string;
    value: number;
  }>;
  
  agentUtilization: Map<string, {
    executionCount: number;
    averageTime: number;
    successRate: number;
  }>;
}

/**
 * Loop graph representation for visualization
 */
export interface LoopGraph {
  nodes: Array<{
    id: string;
    type: LoopNodeType;
    position: { x: number; y: number };
    data: LoopNode;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    condition?: string;
    label?: string;
  }>;
  layout: 'hierarchical' | 'force' | 'circular' | 'grid';
}