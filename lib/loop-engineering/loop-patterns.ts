/**
 * Advanced Loop Patterns and Templates
 * Pre-built loop patterns for common AI agent workflows
 */

import { LoopConfig, LoopNode, LoopCondition, LoopAction } from './types';

/**
 * Pattern: Recursive Self-Improvement
 * Agent continuously improves its own outputs
 */
export function createSelfImprovementPattern(
  agentId: string,
  improvementCriteria: LoopCondition[]
): LoopConfig {
  return {
    id: `self-improvement-${agentId}`,
    name: 'Self-Improvement Loop',
    description: 'Agent continuously improves its outputs through recursive evaluation',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Achieve optimal output quality',
      secondary: ['Minimize iterations', 'Maintain efficiency'],
      successCriteria: improvementCriteria,
      maxIterations: 20,
      timeout: 600,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin self-improvement process',
        nextNodes: ['generate'],
      },
      {
        id: 'generate',
        type: 'agent',
        name: 'Generate Output',
        description: 'Agent generates initial output',
        agentId,
        agentType: 'main',
        conditions: improvementCriteria,
        nextNodes: ['evaluate'],
      },
      {
        id: 'evaluate',
        type: 'condition',
        name: 'Evaluate Quality',
        description: 'Evaluate output against criteria',
        conditions: improvementCriteria,
        nextNodes: ['improve', 'complete'],
      },
      {
        id: 'improve',
        type: 'agent',
        name: 'Improve Output',
        description: 'Agent refines output based on evaluation',
        agentId,
        agentType: 'main',
        nextNodes: ['evaluate'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Self-improvement complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        initialDelay: 1000,
      },
      concurrency: 1,
      priority: 'high',
    },
    integration: {
      relatedAgents: [agentId],
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['self-improvement', 'recursive', 'quality'],
      category: 'optimization',
    },
  };
}

/**
 * Pattern: Multi-Agent Collaboration
 * Multiple agents work together on a task
 */
export function createCollaborationPattern(
  agents: { id: string; role: string }[],
  taskDescription: string
): LoopConfig {
  const agentNodes: LoopNode[] = agents.map((agent, index) => ({
    id: `agent-${index}`,
    type: 'agent',
    name: `${agent.role} Agent`,
    description: `${agent.role} agent processing`,
    agentId: agent.id,
    agentType: 'main',
    nextNodes: index < agents.length - 1 ? [`agent-${index + 1}`] : ['merge'],
  }));

  return {
    id: `collaboration-${Date.now()}`,
    name: 'Multi-Agent Collaboration',
    description: 'Multiple agents collaborate on a task',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Complete collaborative task',
      successCriteria: [
        {
          id: 'task-complete',
          name: 'Task Complete',
          description: 'All agents complete their parts',
          operator: 'equals',
          targetPath: 'completionRate',
          targetValue: 1.0,
        },
      ],
      maxIterations: 5,
      timeout: 300,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin collaboration',
        nextNodes: ['agent-0'],
      },
      ...agentNodes,
      {
        id: 'merge',
        type: 'merge',
        name: 'Merge Results',
        description: 'Combine agent outputs',
        nextNodes: ['complete'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Collaboration complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 2,
        backoffStrategy: 'linear',
        initialDelay: 500,
      },
      concurrency: agents.length,
      priority: 'high',
    },
    integration: {
      relatedAgents: agents.map(a => a.id),
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['collaboration', 'multi-agent', 'parallel'],
      category: 'coordination',
    },
  };
}

/**
 * Pattern: Adaptive Learning
 * Agent learns from feedback and adapts behavior
 */
export function createAdaptiveLearningPattern(
  agentId: string,
  learningGoals: LoopCondition[]
): LoopConfig {
  return {
    id: `adaptive-learning-${agentId}`,
    name: 'Adaptive Learning Loop',
    description: 'Agent learns from feedback and adapts behavior',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Achieve adaptive improvement',
      secondary: ['Learn from feedback', 'Adapt behavior'],
      successCriteria: learningGoals,
      maxIterations: 50,
      timeout: 1800,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin adaptive learning',
        nextNodes: ['act'],
      },
      {
        id: 'act',
        type: 'agent',
        name: 'Take Action',
        description: 'Agent takes action based on current knowledge',
        agentId,
        agentType: 'main',
        nextNodes: ['collect-feedback'],
      },
      {
        id: 'collect-feedback',
        type: 'action',
        name: 'Collect Feedback',
        description: 'Collect feedback on action',
        actions: [
          {
            id: 'collect',
            type: 'api_call',
            name: 'Collect Feedback',
            config: { endpoint: '/feedback' },
          },
        ],
        nextNodes: ['analyze'],
      },
      {
        id: 'analyze',
        type: 'condition',
        name: 'Analyze Feedback',
        description: 'Analyze feedback for learning',
        conditions: learningGoals,
        nextNodes: ['learn', 'act'],
      },
      {
        id: 'learn',
        type: 'agent',
        name: 'Learn and Adapt',
        description: 'Agent learns from feedback and adapts',
        agentId,
        agentType: 'main',
        nextNodes: ['act'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Learning session complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'event_based',
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: 'exponential',
        initialDelay: 2000,
      },
      concurrency: 1,
      priority: 'medium',
    },
    integration: {
      relatedAgents: [agentId],
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['adaptive', 'learning', 'feedback'],
      category: 'optimization',
    },
  };
}

/**
 * Pattern: Parallel Processing
 * Multiple agents process data in parallel
 */
export function createParallelProcessingPattern(
  agents: string[],
  processData: any
): LoopConfig {
  const splitNodeId = 'split';
  const mergeNodeId = 'merge';

  const agentNodes: LoopNode[] = agents.map((agentId, index) => ({
    id: `parallel-agent-${index}`,
    type: 'agent',
    name: `Processor ${index + 1}`,
    description: `Parallel processing by ${agentId}`,
    agentId,
    agentType: 'main',
    nextNodes: [mergeNodeId],
  }));

  return {
    id: `parallel-processing-${Date.now()}`,
    name: 'Parallel Processing',
    description: 'Multiple agents process data in parallel',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Process data efficiently',
      successCriteria: [
        {
          id: 'processing-complete',
          name: 'Processing Complete',
          description: 'All agents complete processing',
          operator: 'equals',
          targetPath: 'completionRate',
          targetValue: 1.0,
        },
      ],
      maxIterations: 3,
      timeout: 120,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin parallel processing',
        nextNodes: [splitNodeId],
      },
      {
        id: splitNodeId,
        type: 'split',
        name: 'Split Data',
        description: 'Split data for parallel processing',
        nextNodes: agentNodes.map(n => n.id),
      },
      ...agentNodes,
      {
        id: mergeNodeId,
        type: 'merge',
        name: 'Merge Results',
        description: 'Merge parallel processing results',
        nextNodes: ['complete'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Parallel processing complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 2,
        backoffStrategy: 'fixed',
        initialDelay: 1000,
      },
      concurrency: agents.length,
      priority: 'high',
    },
    integration: {
      relatedAgents: agents,
      inputSchema: processData,
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['parallel', 'processing', 'efficiency'],
      category: 'automation',
    },
  };
}

/**
 * Pattern: Sequential Pipeline
 * Agents process data in sequence
 */
export function createSequentialPipelinePattern(
  agents: { id: string; stage: string }[]
): LoopConfig {
  const agentNodes: LoopNode[] = agents.map((agent, index) => ({
    id: `stage-${index}`,
    type: 'agent',
    name: agent.stage,
    description: `Processing stage: ${agent.stage}`,
    agentId: agent.id,
    agentType: 'main',
    nextNodes: index < agents.length - 1 ? [`stage-${index + 1}`] : ['complete'],
  }));

  return {
    id: `sequential-pipeline-${Date.now()}`,
    name: 'Sequential Pipeline',
    description: 'Agents process data in sequence',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Complete pipeline processing',
      successCriteria: [
        {
          id: 'pipeline-complete',
          name: 'Pipeline Complete',
          description: 'All stages completed',
          operator: 'equals',
          targetPath: 'completionRate',
          targetValue: 1.0,
        },
      ],
      maxIterations: 10,
      timeout: 600,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin pipeline',
        nextNodes: ['stage-0'],
      },
      ...agentNodes,
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Pipeline complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'linear',
        initialDelay: 1000,
      },
      concurrency: 1,
      priority: 'high',
    },
    integration: {
      relatedAgents: agents.map(a => a.id),
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['sequential', 'pipeline', 'workflow'],
      category: 'automation',
    },
  };
}

/**
 * Pattern: Conditional Branching
 * Agent workflow with conditional paths
 */
export function createConditionalBranchingPattern(
  agentId: string,
  branches: {
    condition: LoopCondition;
    agentId?: string;
    actions?: LoopAction[];
  }[]
): LoopConfig {
  const branchNodes: LoopNode[] = branches.map((branch, index) => ({
    id: `branch-${index}`,
    type: branch.agentId ? 'agent' : 'action',
    name: `Branch ${index + 1}`,
    description: `Conditional branch ${index + 1}`,
    agentId: branch.agentId,
    agentType: 'main',
    conditions: [branch.condition],
    actions: branch.actions,
    nextNodes: ['merge'],
  }));

  return {
    id: `conditional-branching-${Date.now()}`,
    name: 'Conditional Branching',
    description: 'Workflow with conditional paths',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Execute appropriate branch',
      successCriteria: branches.map(b => b.condition),
      maxIterations: 5,
      timeout: 300,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin conditional workflow',
        nextNodes: ['evaluate'],
      },
      {
        id: 'evaluate',
        type: 'condition',
        name: 'Evaluate Conditions',
        description: 'Evaluate which branch to take',
        conditions: branches.map(b => b.condition),
        nextNodes: branches.map((_, i) => `branch-${i}`),
      },
      ...branchNodes,
      {
        id: 'merge',
        type: 'merge',
        name: 'Merge Results',
        description: 'Merge branch results',
        nextNodes: ['complete'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Conditional workflow complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'condition_met',
      retryPolicy: {
        maxRetries: 2,
        backoffStrategy: 'fixed',
        initialDelay: 500,
      },
      concurrency: 1,
      priority: 'medium',
    },
    integration: {
      relatedAgents: branches.filter(b => b.agentId).map(b => b.agentId!),
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['conditional', 'branching', 'workflow'],
      category: 'automation',
    },
  };
}

/**
 * Pattern: Error Recovery
 * Agent automatically recovers from errors
 */
export function createErrorRecoveryPattern(
  agentId: string,
  errorConditions: LoopCondition[],
  recoveryStrategies: { errorType: string; strategy: LoopAction[] }[]
): LoopConfig {
  return {
    id: `error-recovery-${agentId}`,
    name: 'Error Recovery Loop',
    description: 'Agent automatically recovers from errors',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Recover from errors automatically',
      successCriteria: [
        {
          id: 'recovery-success',
          name: 'Recovery Successful',
          description: 'Error recovered successfully',
          operator: 'equals',
          targetPath: 'recoveryStatus',
          targetValue: 'success',
        },
      ],
      maxIterations: 10,
      timeout: 600,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin error recovery',
        nextNodes: ['execute'],
      },
      {
        id: 'execute',
        type: 'agent',
        name: 'Execute Task',
        description: 'Agent executes main task',
        agentId,
        agentType: 'main',
        conditions: errorConditions,
        nextNodes: ['check-error', 'complete'],
      },
      {
        id: 'check-error',
        type: 'condition',
        name: 'Check for Errors',
        description: 'Check if error occurred',
        conditions: errorConditions,
        nextNodes: ['identify-error', 'complete'],
      },
      {
        id: 'identify-error',
        type: 'condition',
        name: 'Identify Error Type',
        description: 'Identify type of error',
        conditions: errorConditions,
        nextNodes: recoveryStrategies.map((_, i) => `recover-${i}`),
      },
      ...recoveryStrategies.map((strategy, index) => ({
        id: `recover-${index}`,
        type: 'action',
        name: `Recover: ${strategy.errorType}`,
        description: `Recovery strategy for ${strategy.errorType}`,
        actions: strategy.strategy,
        nextNodes: ['execute'],
      })),
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Error recovery complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'event_based',
      retryPolicy: {
        maxRetries: 5,
        backoffStrategy: 'exponential',
        initialDelay: 1000,
      },
      concurrency: 1,
      priority: 'critical',
    },
    integration: {
      relatedAgents: [agentId],
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['error-recovery', 'resilience', 'automation'],
      category: 'monitoring',
    },
  };
}

/**
 * Pattern: Continuous Monitoring
 * Agent continuously monitors and reports
 */
export function createContinuousMonitoringPattern(
  agentId: string,
  metrics: string[],
  alertConditions: LoopCondition[]
): LoopConfig {
  return {
    id: `continuous-monitoring-${agentId}`,
    name: 'Continuous Monitoring',
    description: 'Agent continuously monitors metrics and alerts',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Monitor metrics continuously',
      secondary: ['Alert on anomalies', 'Report status'],
      successCriteria: alertConditions,
      maxIterations: 1000,
      timeout: 86400, // 24 hours
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin monitoring',
        nextNodes: ['collect'],
      },
      {
        id: 'collect',
        type: 'action',
        name: 'Collect Metrics',
        description: 'Collect monitoring metrics',
        actions: [
          {
            id: 'collect-metrics',
            type: 'api_call',
            name: 'Collect Metrics',
            config: { metrics },
          },
        ],
        nextNodes: ['analyze'],
      },
      {
        id: 'analyze',
        type: 'condition',
        name: 'Analyze Metrics',
        description: 'Analyze metrics for anomalies',
        conditions: alertConditions,
        nextNodes: ['alert', 'wait'],
      },
      {
        id: 'alert',
        type: 'action',
        name: 'Send Alert',
        description: 'Send alert on anomaly',
        actions: [
          {
            id: 'send-alert',
            type: 'notification',
            name: 'Send Alert',
            config: { severity: 'warning' },
          },
        ],
        nextNodes: ['wait'],
      },
      {
        id: 'wait',
        type: 'action',
        name: 'Wait',
        description: 'Wait before next check',
        actions: [
          {
            id: 'wait',
            type: 'custom',
            name: 'Wait',
            config: { duration: 60000 }, // 1 minute
          },
        ],
        nextNodes: ['collect'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'Monitoring stopped',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'scheduled',
      schedule: '*/1 * * * *', // Every minute
      retryPolicy: {
        maxRetries: 3,
        backoffStrategy: 'fixed',
        initialDelay: 5000,
      },
      concurrency: 1,
      priority: 'high',
    },
    integration: {
      relatedAgents: [agentId],
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['monitoring', 'continuous', 'alerting'],
      category: 'monitoring',
    },
  };
}

/**
 * Pattern: A/B Testing
 * Agent runs A/B tests and selects winner
 */
export function createABTestingPattern(
  variants: { id: string; agentId: string; config: any }[],
  successMetric: LoopCondition
): LoopConfig {
  const variantNodes: LoopNode[] = variants.map((variant, index) => ({
    id: `variant-${index}`,
    type: 'agent',
    name: `Variant ${variant.id}`,
    description: `Test variant ${variant.id}`,
    agentId: variant.agentId,
    agentType: 'main',
    metadata: { variantConfig: variant.config },
    nextNodes: ['compare'],
  }));

  return {
    id: `ab-testing-${Date.now()}`,
    name: 'A/B Testing Loop',
    description: 'Run A/B tests and select winner',
    version: '1.0.0',
    status: 'idle',
    goal: {
      primary: 'Determine best performing variant',
      successCriteria: [successMetric],
      maxIterations: variants.length,
      timeout: 3600,
    },
    nodes: [
      {
        id: 'start',
        type: 'start',
        name: 'Start',
        description: 'Begin A/B test',
        nextNodes: ['split'],
      },
      {
        id: 'split',
        type: 'split',
        name: 'Split Traffic',
        description: 'Split traffic between variants',
        nextNodes: variantNodes.map(n => n.id),
      },
      ...variantNodes,
      {
        id: 'compare',
        type: 'condition',
        name: 'Compare Results',
        description: 'Compare variant performance',
        conditions: [successMetric],
        nextNodes: ['select-winner'],
      },
      {
        id: 'select-winner',
        type: 'action',
        name: 'Select Winner',
        description: 'Select and deploy winning variant',
        actions: [
          {
            id: 'deploy',
            type: 'api_call',
            name: 'Deploy Winner',
            config: { action: 'deploy' },
          },
        ],
        nextNodes: ['complete'],
      },
      {
        id: 'complete',
        type: 'end',
        name: 'Complete',
        description: 'A/B test complete',
      },
    ],
    startNodeId: 'start',
    endNodeId: 'complete',
    settings: {
      triggerType: 'manual',
      retryPolicy: {
        maxRetries: 2,
        backoffStrategy: 'fixed',
        initialDelay: 1000,
      },
      concurrency: variants.length,
      priority: 'high',
    },
    integration: {
      relatedAgents: variants.map(v => v.agentId),
    },
    metadata: {
      createdBy: 'system',
      createdAt: new Date(),
      tags: ['ab-testing', 'experimentation', 'optimization'],
      category: 'optimization',
    },
  };
}

/**
 * Get all available patterns
 */
export function getAllLoopPatterns() {
  return {
    selfImprovement: createSelfImprovementPattern,
    collaboration: createCollaborationPattern,
    adaptiveLearning: createAdaptiveLearningPattern,
    parallelProcessing: createParallelProcessingPattern,
    sequentialPipeline: createSequentialPipelinePattern,
    conditionalBranching: createConditionalBranchingPattern,
    errorRecovery: createErrorRecoveryPattern,
    continuousMonitoring: createContinuousMonitoringPattern,
    abTesting: createABTestingPattern,
  };
}

/**
 * Get pattern by category
 */
export function getPatternsByCategory(category: string) {
  const patterns = getAllLoopPatterns();
  const categoryMap: Record<string, string[]> = {
    optimization: ['selfImprovement', 'adaptiveLearning', 'abTesting'],
    coordination: ['collaboration'],
    automation: ['parallelProcessing', 'sequentialPipeline', 'conditionalBranching'],
    monitoring: ['errorRecovery', 'continuousMonitoring'],
  };

  return categoryMap[category]?.map(key => patterns[key as keyof typeof patterns]) || [];
}
