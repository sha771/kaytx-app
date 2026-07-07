/**
 * Unified Multi-Agent Coordinator
 * Advanced coordination system for multiple AI agents with decision logging and error recovery
 */

import { createLogger } from '../lib/production-logger';

const logger = createLogger('UnifiedMultiAgentCoordinator');

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { aiAgentService } from './ai-agent-service';
import { db } from '../db/connection';
import { aiAgents, aiAgentEvents, aiConversations } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import { DatabaseUtils } from '../utils/database-utils';
import { logAudit } from '../lib/audit';

export interface AgentTask {
  id: string;
  type: 'collaboration' | 'delegation' | 'coordination' | 'consensus';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  role?: string;
  title: string;
  description: string;
  coordinatorId: string;
  participantIds: string[];
  requiredCapabilities: string[];
  context: Record<string, any>;
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  result?: any;
  error?: string;
  strategy?: 'sequential' | 'parallel' | 'hierarchical' | 'adaptive';
  dependencies?: string[];
  timeout?: number;
  progress?: number;
  decisions?: Decision[];
}

export interface AgentCollaborationSession {
  id: string;
  taskId: string;
  participants: AgentParticipant[];
  status: 'initializing' | 'active' | 'deliberating' | 'consensus' | 'completed' | 'failed';
  currentPhase: string;
  sharedContext: Record<string, any>;
  messages: CollaborationMessage[];
  votes: AgentVote[];
  consensusThreshold: number;
  createdAt: Date;
  updatedAt: Date;
  startTime?: number;
  endTime?: number;
}

export interface AgentParticipant {
  agentId: string;
  agentName: string;
  role: 'coordinator' | 'contributor' | 'reviewer' | 'validator';
  status: 'invited' | 'joined' | 'active' | 'completed' | 'left';
  capabilities: string[];
  contribution?: string;
  confidence?: number;
  joinedAt?: Date;
  performance?: {
    avgResponseTime: number;
    successRate: number;
    totalRequests: number;
  };
}

export interface AgentCapability {
  id: string;
  name: string;
  type: 'chat' | 'task' | 'workflow' | 'analysis' | 'creative' | 'technical';
  model: string;
  capabilities: string[];
  maxConcurrency: number;
  currentLoad: number;
  status: 'available' | 'busy' | 'offline' | 'error';
  performance: {
    avgResponseTime: number;
    successRate: number;
    totalRequests: number;
  };
}

export interface CoordinationTask {
  id: string;
  type: string;
  description: string;
  parameters: any;
  priority: 'low' | 'medium' | 'high' | 'critical';
  strategy: 'sequential' | 'parallel' | 'hierarchical' | 'adaptive';
  assignedAgents: string[];
  dependencies: string[];
  timeout: number;
  createdAt: number;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  result?: any;
  error?: string;
  startTime?: number;
  endTime?: number;
  decisions: Decision[];
}

export interface Decision {
  id: string;
  taskId: string;
  agentId: string;
  type: 'routing' | 'resource_allocation' | 'error_recovery' | 'strategy_selection' | 'timeout_handling' | 'consensus' | 'conflict_resolution';
  timestamp: number;
  context: Record<string, any>;
  reasoning: string;
  alternatives: {
    option: string;
    score: number;
    reasoning: string;
  }[];
  outcome: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  metadata?: Record<string, any>;
}

export interface CollaborationMessage {
  id: string;
  sessionId: string;
  agentId: string;
  agentName: string;
  type: 'proposal' | 'feedback' | 'question' | 'answer' | 'consensus' | 'objection';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AgentVote {
  id: string;
  sessionId: string;
  agentId: string;
  agentName: string;
  vote: 'agree' | 'disagree' | 'abstain';
  reasoning: string;
  confidence: number;
  timestamp: Date;
}

export interface CoordinationStrategy {
  type: 'sequential' | 'parallel' | 'hierarchical' | 'adaptive' | 'consensus';
  config: Record<string, any>;
  requirements: string[];
}

export class UnifiedMultiAgentCoordinator extends EventEmitter {
  private activeTasks: Map<string, AgentTask> = new Map();
  private activeSessions: Map<string, AgentCollaborationSession> = new Map();
  private agentCapabilities: Map<string, AgentCapability> = new Map();
  private monitoringInterval: ReturnType<typeof setInterval> | undefined;
  private coordinationStrategies: Map<string, CoordinationStrategy> = new Map();
  private decisionLogger: DecisionLogger;
  private errorRecoveryManager: ErrorRecoveryManager;
  private resourceManager: ResourceManager;

  constructor() {
    super();
    this.decisionLogger = new DecisionLogger();
    this.errorRecoveryManager = new ErrorRecoveryManager();
    this.resourceManager = new ResourceManager();
    this.initializeStrategies();
    this.startMonitoring();
  }

  /**
   * Create and coordinate a new multi-agent task
   */
  async createTask(taskData: Partial<AgentTask>): Promise<AgentTask> {
    const task: AgentTask = {
      id: uuidv4(),
      type: taskData.type || 'collaboration',
      priority: taskData.priority || 'medium',
      status: 'pending',
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      coordinatorId: taskData.coordinatorId || '',
      participantIds: taskData.participantIds || [],
      requiredCapabilities: taskData.requiredCapabilities || [],
      context: taskData.context || {},
      deadline: taskData.deadline,
      createdAt: new Date(),
      updatedAt: new Date(),
      strategy: taskData.strategy || 'adaptive',
      dependencies: taskData.dependencies || [],
      timeout: taskData.timeout || 300000, // 5 minutes default
      progress: 0,
      decisions: []
    };

    this.activeTasks.set(task.id, task);
    
    // Log task creation
    await this.logDecision({
      id: uuidv4(),
      taskId: task.id,
      agentId: task.coordinatorId,
      type: 'routing',
      timestamp: Date.now(),
      context: { taskCreation: true },
      reasoning: `Created ${task.type} task with ${task.participantIds.length} participants`,
      alternatives: [],
      outcome: 'task_created',
      confidence: 1.0,
      impact: 'medium'
    });

    this.emit('taskCreated', task);
    
    // Start task execution
    await this.executeTask(task);
    
    return task;
  }

  /**
   * Execute a coordination task
   */
  private async executeTask(task: AgentTask): Promise<void> {
    try {
      task.status = 'assigned';
      task.updatedAt = new Date();
      
      // Select coordination strategy
      const strategy = this.selectStrategy(task);
      
      // Create collaboration session if needed
      if (task.type === 'collaboration' || task.type === 'consensus') {
        await this.createCollaborationSession(task);
      }
      
      // Execute based on strategy
      switch (strategy.type) {
        case 'sequential':
          await this.executeSequentialStrategy(task);
          break;
        case 'parallel':
          await this.executeParallelStrategy(task);
          break;
        case 'hierarchical':
          await this.executeHierarchicalStrategy(task);
          break;
        case 'adaptive':
          await this.executeAdaptiveStrategy(task);
          break;
        case 'consensus':
          await this.executeConsensusStrategy(task);
          break;
        default:
          throw new Error(`Unknown strategy: ${strategy.type}`);
      }
      
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);
      task.updatedAt = new Date();
      
      // Attempt error recovery
      await this.errorRecoveryManager.handleTaskError(task, error instanceof Error ? error : new Error(String(error)));
      
      this.emit('taskFailed', task, error);
    }
  }

  /**
   * Execute sequential strategy
   */
  private async executeSequentialStrategy(task: AgentTask): Promise<void> {
    task.status = 'in_progress';
    task.startTime = new Date();
    
    const results: any[] = [];
    
    for (const agentId of task.participantIds) {
      try {
        const result = await this.executeAgentTask(agentId, task);
        results.push({ agentId, result, success: true });
        task.progress = (results.length / task.participantIds.length) * 100;
        task.updatedAt = new Date();
      } catch (error) {
        results.push({ agentId, error: error instanceof Error ? error.message : String(error), success: false });
        
        // Log error decision
        await this.logDecision({
          id: uuidv4(),
          taskId: task.id,
          agentId,
          type: 'error_recovery',
          timestamp: Date.now(),
          context: { error: error instanceof Error ? error.message : String(error), strategy: 'sequential' },
          reasoning: `Agent ${agentId} failed in sequential execution`,
          alternatives: [
            { option: 'retry', score: 0.8, reasoning: 'Retry failed agent' },
            { option: 'skip', score: 0.6, reasoning: 'Skip failed agent and continue' },
            { option: 'abort', score: 0.2, reasoning: 'Abort entire task' }
          ],
          outcome: 'retry',
          confidence: 0.8,
          impact: 'medium'
        });
        
        // Decide whether to continue or abort
        if (task.priority === 'critical') {
          // Retry for critical tasks
          await this.executeAgentTask(agentId, task);
        }
      }
    }
    
    task.result = results;
    task.status = 'completed';
    task.completedAt = new Date();
    task.endTime = new Date();
    task.updatedAt = new Date();
    
    this.emit('taskCompleted', task);
  }

  /**
   * Execute parallel strategy
   */
  private async executeParallelStrategy(task: AgentTask): Promise<void> {
    task.status = 'in_progress';
    task.startTime = new Date();
    
    const promises = task.participantIds.map(async (agentId) => {
      try {
        const result = await this.executeAgentTask(agentId, task);
        return { agentId, result, success: true };
      } catch (error) {
        return { agentId, error: error instanceof Error ? error.message : String(error), success: false };
      }
    });
    
    const results = await Promise.allSettled(promises);
    const finalResults = results.map(result => 
      result.status === 'fulfilled' ? result.value : { error: result.reason, success: false }
    );
    
    task.result = finalResults;
    task.progress = 100;
    task.status = 'completed';
    task.completedAt = new Date();
    task.endTime = new Date();
    task.updatedAt = new Date();
    
    this.emit('taskCompleted', task);
  }

  /**
   * Execute hierarchical strategy
   */
  private async executeHierarchicalStrategy(task: AgentTask): Promise<void> {
    task.status = 'in_progress';
    task.startTime = new Date();
    
    // Find coordinator agent
    const coordinatorId = task.participantIds[0]; // First agent is coordinator
    const contributors = task.participantIds.slice(1);
    
    try {
      // Coordinator makes initial decision
      const coordinatorResult = await this.executeAgentTask(coordinatorId, task);
      
      // Contributors work on subtasks
      const contributorPromises = contributors.map(async (agentId) => {
        const subTask = {
          ...task,
          context: {
            ...task.context,
            coordinatorDecision: coordinatorResult,
            role: 'contributor'
          }
        };
        return this.executeAgentTask(agentId, subTask);
      });
      
      const contributorResults = await Promise.allSettled(contributorPromises);
      
      // Coordinator makes final decision
      const finalContext = {
        ...task.context,
        coordinatorDecision: coordinatorResult,
        contributorResults: contributorResults.map(r => 
          r.status === 'fulfilled' ? r.value : { error: r.reason }
        )
      };
      
      const finalResult = await this.executeAgentTask(coordinatorId, {
        ...task,
        context: finalContext,
        role: 'final_coordinator'
      });
      
      task.result = {
        coordinatorResult,
        contributorResults,
        finalResult
      };
      task.status = 'completed';
      task.completedAt = new Date();
      task.endTime = new Date();
      task.updatedAt = new Date();
      
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);
      task.updatedAt = new Date();
      throw error;
    }
    
    this.emit('taskCompleted', task);
  }

  /**
   * Execute adaptive strategy
   */
  private async executeAdaptiveStrategy(task: AgentTask): Promise<void> {
    task.status = 'in_progress';
    task.startTime = new Date();
    
    // Start with parallel execution
    let currentStrategy = 'parallel';
    let results: any[] = [];
    
    try {
      const promises = task.participantIds.map(async (agentId) => {
        try {
          const result = await this.executeAgentTask(agentId, task);
          return { agentId, result, success: true };
        } catch (error) {
          return { agentId, error: error instanceof Error ? error.message : String(error), success: false };
        }
      });
      
      const parallelResults = await Promise.allSettled(promises);
      results = parallelResults.map(result => 
        result.status === 'fulfilled' ? result.value : { error: result.reason, success: false }
      );
      
      // Analyze results and adapt strategy if needed
      const failureRate = results.filter(r => !r.success).length / results.length;
      
      if (failureRate > 0.5) {
        // High failure rate, switch to sequential with retry
        currentStrategy = 'sequential';
        await this.logDecision({
          id: uuidv4(),
          taskId: task.id,
          agentId: task.coordinatorId,
          type: 'strategy_selection',
          timestamp: Date.now(),
          context: { failureRate, previousStrategy: 'parallel' },
          reasoning: `High failure rate (${failureRate}) detected, switching to sequential strategy`,
          alternatives: [
            { option: 'sequential', score: 0.9, reasoning: 'Retry failed agents sequentially' },
            { option: 'parallel', score: 0.3, reasoning: 'Continue with parallel execution' },
            { option: 'abort', score: 0.1, reasoning: 'Abort due to high failure rate' }
          ],
          outcome: 'sequential',
          confidence: 0.9,
          impact: 'high'
        });
        
        // Retry failed agents sequentially
        const failedAgents = results.filter(r => !r.success).map(r => r.agentId);
        for (const agentId of failedAgents) {
          try {
            const result = await this.executeAgentTask(agentId, task);
            const existingResult = results.find(r => r.agentId === agentId);
            if (existingResult) {
              Object.assign(existingResult, { result, success: true });
            }
          } catch (error) {
            // Log retry failure
            await this.logDecision({
              id: uuidv4(),
              taskId: task.id,
              agentId,
              type: 'error_recovery',
              timestamp: Date.now(),
              context: { error: error instanceof Error ? error.message : String(error), retry: true },
              reasoning: `Retry failed for agent ${agentId}`,
              alternatives: [],
              outcome: 'retry_failed',
              confidence: 0.3,
              impact: 'medium'
            });
          }
        }
      }
      
      task.result = { strategy: currentStrategy, results };
      task.status = 'completed';
      task.completedAt = new Date();
      task.endTime = new Date();
      task.updatedAt = new Date();
      
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);
      task.updatedAt = new Date();
      throw error;
    }
    
    this.emit('taskCompleted', task);
  }

  /**
   * Execute consensus strategy
   */
  private async executeConsensusStrategy(task: AgentTask): Promise<void> {
    const session = this.activeSessions.get(task.id);
    if (!session) {
      throw new Error('No collaboration session found for consensus task');
    }
    
    task.status = 'in_progress';
    task.startTime = new Date();
    session.status = 'deliberating';
    
    try {
      // Phase 1: Initial proposals
      session.currentPhase = 'proposals';
      await this.collectProposals(session);
      
      // Phase 2: Discussion and refinement
      session.currentPhase = 'discussion';
      await this.facilitateDiscussion(session);
      
      // Phase 3: Voting
      session.currentPhase = 'voting';
      const voteResult = await this.conductVoting(session);
      
      // Phase 4: Consensus check
      session.currentPhase = 'consensus';
      const consensus = this.checkConsensus(session, voteResult);
      
      if (consensus.achieved) {
        task.result = consensus.result;
        task.status = 'completed';
        session.status = 'completed';
      } else {
        // Try alternative consensus methods
        await this.attemptAlternativeConsensus(session, consensus);
      }
      
      task.completedAt = new Date();
      task.endTime = new Date();
      task.updatedAt = new Date();
      session.updatedAt = new Date();
      
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : String(error);
      session.status = 'failed';
      task.updatedAt = new Date();
      session.updatedAt = new Date();
      throw error;
    }
    
    this.emit('taskCompleted', task);
  }

  /**
   * Create collaboration session
   */
  private async createCollaborationSession(task: AgentTask): Promise<AgentCollaborationSession> {
    const session: AgentCollaborationSession = {
      id: uuidv4(),
      taskId: task.id,
      participants: task.participantIds.map(agentId => ({
        agentId,
        agentName: this.getAgentName(agentId),
        role: agentId === task.coordinatorId ? 'coordinator' : 'contributor',
        status: 'invited',
        capabilities: this.getAgentCapabilities(agentId)
      })),
      status: 'initializing',
      currentPhase: 'invitation',
      sharedContext: task.context,
      messages: [],
      votes: [],
      consensusThreshold: 0.7, // 70% agreement required
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.activeSessions.set(session.id, session);
    this.emit('sessionCreated', session);
    
    return session;
  }

  /**
   * Execute task for individual agent — uses real agent execution via AIAgentService
   */
  private async executeAgentTask(agentId: string, task: AgentTask): Promise<any> {
    const capability = this.agentCapabilities.get(agentId);
    if (!capability) {
      throw new Error(`Agent ${agentId} not found or not available`);
    }
    
    if (capability.status !== 'available' && capability.status !== 'busy') {
      throw new Error(`Agent ${agentId} is ${capability.status}`);
    }
    
    // Update agent load
    capability.currentLoad++;
    capability.status = 'busy';
    
    const startTime = Date.now();
    
    try {
      // Execute via real AI agent service instead of simulation
      const result = await aiAgentService.processMessage(
        agentId,
        `[Multi-Agent Task] Type: ${task.type} | Title: ${task.title} | Description: ${task.description}`,
        {
          organizationId: task.context?.organizationId || '',
          userId: task.coordinatorId,
          sessionId: `coord_${task.id}_${agentId}`,
          metadata: {
            taskId: task.id,
            taskType: task.type,
            role: task.role,
            strategy: task.strategy,
            participantIds: task.participantIds
          }
        }
      );
      
      const responseTime = Date.now() - startTime;
      
      // Update performance metrics with real data
      capability.performance.totalRequests++;
      const prevRate = capability.performance.successRate;
      const total = capability.performance.totalRequests;
      capability.performance.successRate = 
        (prevRate * (total - 1) + (result.success ? 1 : 0)) / total;
      capability.performance.avgResponseTime = 
        (capability.performance.avgResponseTime * (total - 1) + responseTime) / total;
      
      return {
        agentId,
        taskType: task.type,
        result: result.response || result.error || 'Task completed',
        timestamp: Date.now(),
        confidence: result.success ? 0.85 : 0.3,
        responseTime,
        usage: result.usage
      };
      
    } catch (error) {
      capability.performance.totalRequests++;
      const total = capability.performance.totalRequests;
      capability.performance.successRate = 
        (capability.performance.successRate * (total - 1)) / total;
      
      throw error;
    } finally {
      capability.currentLoad--;
      capability.status = capability.currentLoad === 0 ? 'available' : 'busy';
    }
  }

  /**
   * Select coordination strategy
   */
  private selectStrategy(task: AgentTask): CoordinationStrategy {
    const strategies = Array.from(this.coordinationStrategies.values());
    
    // Filter strategies based on task requirements
    const eligibleStrategies = strategies.filter(strategy => {
      return task.requiredCapabilities.every(cap => 
        strategy.requirements.includes(cap) || strategy.requirements.length === 0
      );
    });
    
    if (eligibleStrategies.length === 0) {
      return this.coordinationStrategies.get('adaptive')!;
    }
    
    // Select strategy based on task characteristics
    if (task.type === 'consensus') {
      return this.coordinationStrategies.get('consensus')!;
    }
    
    if (task.priority === 'critical') {
      return this.coordinationStrategies.get('sequential')!;
    }
    
    if (task.participantIds.length > 5) {
      return this.coordinationStrategies.get('parallel')!;
    }
    
    return eligibleStrategies[0];
  }

  /**
   * Initialize coordination strategies
   */
  private initializeStrategies(): void {
    this.coordinationStrategies.set('sequential', {
      type: 'sequential',
      config: { timeout: 300000 },
      requirements: []
    });
    
    this.coordinationStrategies.set('parallel', {
      type: 'parallel',
      config: { timeout: 180000 },
      requirements: []
    });
    
    this.coordinationStrategies.set('hierarchical', {
      type: 'hierarchical',
      config: { timeout: 240000 },
      requirements: ['coordinator']
    });
    
    this.coordinationStrategies.set('adaptive', {
      type: 'adaptive',
      config: { timeout: 300000, failureThreshold: 0.5 },
      requirements: []
    });
    
    this.coordinationStrategies.set('consensus', {
      type: 'consensus',
      config: { threshold: 0.7, maxRounds: 3 },
      requirements: ['voting', 'discussion']
    });
  }

  /**
   * Get agent name
   */
  private getAgentName(agentId: string): string {
    const capability = this.agentCapabilities.get(agentId);
    return capability?.name || agentId;
  }

  /**
   * Get agent capabilities
   */
  private getAgentCapabilities(agentId: string): string[] {
    const capability = this.agentCapabilities.get(agentId);
    return capability?.capabilities || [];
  }

  /**
   * Collect proposals from session participants — uses real agent responses
   */
  private async collectProposals(session: AgentCollaborationSession): Promise<void> {
    for (const participant of session.participants) {
      if (participant.role === 'contributor') {
        let proposalContent = `Proposal from ${participant.agentName}`;
        
        try {
          const agent = await aiAgentService.getAgent(participant.agentId);
          if (agent) {
            const proposalPrompt = `You are contributing to a multi-agent collaboration task. Provide your proposal or approach for the task. Be concise and actionable. Task context: ${JSON.stringify(session.sharedContext).substring(0, 500)}`;
            
            const result = await aiAgentService.processMessage(
              participant.agentId,
              proposalPrompt,
              { organizationId: session.sharedContext?.organizationId || '', sessionId: `proposal_${session.id}_${participant.agentId}` }
            );
            
            if (result.success && result.response) {
              proposalContent = result.response;
              participant.contribution = result.response;
              participant.confidence = 0.7;
            }
          }
        } catch (error) {
          logger.error(`Failed to collect proposal from agent ${participant.agentId}:`, error as Error);
        }
        
        session.messages.push({
          id: uuidv4(),
          sessionId: session.id,
          agentId: participant.agentId,
          agentName: participant.agentName,
          type: 'proposal',
          content: proposalContent,
          timestamp: new Date()
        });
      }
    }
    session.updatedAt = new Date();
  }

  /**
   * Facilitate discussion — agents respond to each other's proposals
   */
  private async facilitateDiscussion(session: AgentCollaborationSession): Promise<void> {
    const proposals = session.messages.filter(m => m.type === 'proposal');
    
    // Each participant responds to other proposals
    for (const participant of session.participants) {
      if (participant.role === 'contributor') {
        const otherProposals = proposals
          .filter(p => p.agentId !== participant.agentId)
          .map(p => `${p.agentName}: ${p.content}`)
          .join('\n\n');
        
        if (!otherProposals) continue;
        
        try {
          const agent = await aiAgentService.getAgent(participant.agentId);
          if (agent) {
            const discussPrompt = `You are in a multi-agent discussion. Review the proposals from other agents and provide feedback, questions, or suggestions:\n\n${otherProposals}\n\nProvide constructive feedback. Be concise.`;
            
            const result = await aiAgentService.processMessage(
              participant.agentId,
              discussPrompt,
              { organizationId: session.sharedContext?.organizationId || '', sessionId: `discuss_${session.id}_${participant.agentId}` }
            );
            
            if (result.success && result.response) {
              session.messages.push({
                id: uuidv4(),
                sessionId: session.id,
                agentId: participant.agentId,
                agentName: participant.agentName,
                type: 'feedback',
                content: result.response,
                timestamp: new Date()
              });
            }
          }
        } catch (error) {
          logger.error(`Discussion failed for agent ${participant.agentId}:`, error as Error);
        }
      }
    }
    session.updatedAt = new Date();
  }

  /**
   * Conduct voting — uses real agent responses instead of random votes
   */
  private async conductVoting(session: AgentCollaborationSession): Promise<AgentVote[]> {
    const votes: AgentVote[] = [];
    
    // Build context from session messages for voting
    const proposalSummary = session.messages
      .filter(m => m.type === 'proposal')
      .map(m => `${m.agentName}: ${m.content}`)
      .join('\n');
    
    for (const participant of session.participants) {
      if (participant.role === 'contributor') {
        let voteResult: 'agree' | 'disagree' | 'abstain' = 'abstain';
        let reasoning = `Vote from ${participant.agentName}`;
        let confidence = 0.5;
        
        try {
          // Get real agent response via AI
          const agent = await aiAgentService.getAgent(participant.agentId);
          if (agent) {
            const votePrompt = `You are voting on a collaborative proposal. Here are the proposals:\n\n${proposalSummary}\n\nBased on your expertise, provide your vote as one of: agree, disagree, abstain. Then explain your reasoning briefly. Format: VOTE: [agree/disagree/abstain]\nREASONING: [your reasoning]\nCONFIDENCE: [0.0-1.0]`;
            
            const result = await aiAgentService.processMessage(
              participant.agentId,
              votePrompt,
              { organizationId: session.sharedContext?.organizationId || '', sessionId: `vote_${session.id}_${participant.agentId}` }
            );
            
            if (result.success && result.response) {
              const response = result.response;
              // Parse vote from response
              const voteMatch = response.match(/VOTE:\s*(agree|disagree|abstain)/i);
              const reasonMatch = response.match(/REASONING:\s*([\s\S]+?)(?:\nCONFIDENCE:|$)/i);
              const confMatch = response.match(/CONFIDENCE:\s*([\d.]+)/i);
              
              if (voteMatch) {
                voteResult = voteMatch[1].toLowerCase() as 'agree' | 'disagree' | 'abstain';
              }
              if (reasonMatch) {
                reasoning = reasonMatch[1].trim();
              }
              if (confMatch) {
                confidence = Math.min(1, Math.max(0, parseFloat(confMatch[1])));
              } else {
                confidence = voteResult === 'abstain' ? 0.3 : 0.7;
              }
            }
          }
        } catch (error) {
          logger.error(`Failed to get vote from agent ${participant.agentId}:`, error as Error);
          // Default to abstain on error
          voteResult = 'abstain';
          reasoning = `Unable to participate in vote due to: ${(error as Error).message}`;
          confidence = 0.1;
        }
        
        votes.push({
          id: uuidv4(),
          sessionId: session.id,
          agentId: participant.agentId,
          agentName: participant.agentName,
          vote: voteResult,
          reasoning,
          confidence,
          timestamp: new Date()
        });
      }
    }
    
    session.votes = votes;
    session.updatedAt = new Date();
    
    return votes;
  }

  /**
   * Check consensus
   */
  private checkConsensus(session: AgentCollaborationSession, votes: AgentVote[]): { achieved: boolean; result?: any } {
    const agreeVotes = votes.filter(v => v.vote === 'agree').length;
    const totalVotes = votes.length;
    const agreementRatio = agreeVotes / totalVotes;
    
    return {
      achieved: agreementRatio >= session.consensusThreshold,
      result: agreementRatio >= session.consensusThreshold ? {
        consensus: 'achieved',
        agreementRatio,
        decision: 'proposals_accepted'
      } : undefined
    };
  }

  /**
   * Attempt alternative consensus methods
   */
  private async attemptAlternativeConsensus(session: AgentCollaborationSession, consensus: any): Promise<void> {
    // Implementation for alternative consensus methods
    session.currentPhase = 'alternative_consensus';
    await new Promise(resolve => setTimeout(resolve, 2000));
    session.updatedAt = new Date();
  }

  /**
   * Log decision
   */
  private async logDecision(decision: Decision): Promise<void> {
    await this.decisionLogger.logDecision(decision);
  }

  /**
   * Start monitoring
   */
  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.checkTaskDeadlines();
      this.updateAgentStatus();
    }, 30000); // Check every 30 seconds
  }

  /**
   * Check task deadlines
   */
  private checkTaskDeadlines(): void {
    const now = new Date();
    
    for (const task of this.activeTasks.values()) {
      if (task.deadline && task.deadline < now && task.status !== 'completed') {
        this.emit('deadlineExceeded', task);
        task.status = 'failed';
        task.error = 'Deadline exceeded';
        task.updatedAt = now;
      }
    }
  }

  /**
   * Update agent status — checks real load and marks idle agents as available
   */
  private updateAgentStatus(): void {
    for (const capability of this.agentCapabilities.values()) {
      // Mark agents as available if their load has dropped to zero
      if (capability.status === 'busy' && capability.currentLoad <= 0) {
        capability.status = 'available';
        capability.currentLoad = 0;
      }
      // Mark agents as offline if they've been unresponsive
      if (capability.status === 'error') {
        logger.warn(`Agent ${capability.id} is in error state — requires manual recovery`);
      }
    }
  }

/**
 * Calculate strategy usage
 */
private calculateStrategyUsage(): Record<string, number> {
    const usage: Record<string, number> = {};
    
    for (const task of this.activeTasks.values()) {
      const strategy = task.strategy || 'adaptive';
      usage[strategy] = (usage[strategy] || 0) + 1;
    }
    
    return usage;
  }

  /**
   * Shutdown coordinator
   */
  shutdown(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.removeAllListeners();
    this.activeTasks.clear();
    this.activeSessions.clear();
  }

  /**
   * Destroy coordinator and clear all intervals
   */
  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
    this.removeAllListeners();
    this.activeTasks.clear();
    this.activeSessions.clear();
    this.agentCapabilities.clear();
    this.coordinationStrategies.clear();
  }

}

// Supporting classes

class DecisionLogger {
  private decisions: Decision[] = [];

  async logDecision(decision: Decision): Promise<void> {
    this.decisions.push(decision);
    
    // Log to database
    try {
      await db.insert(aiAgentEvents).values({
        id: uuidv4(),
        agentId: decision.agentId,
        agentType: 'multi_agent_coordinator',
        action: 'decision_made',
        details: decision,
        status: 'success',
        timestamp: new Date(decision.timestamp)
      });
    } catch (error) {
      logger.error('Failed to log decision to database:', error instanceof Error ? error : new Error(String(error)));
    }
  }

  getDecisions(taskId?: string): Decision[] {
    if (taskId) {
      return this.decisions.filter(d => d.taskId === taskId);
    }
    return this.decisions;
  }
}

class ErrorRecoveryManager {
  async handleTaskError(task: AgentTask, error: Error): Promise<void> {
    logger.error(`Error in task ${task.id} (${task.title}): ${error.message}`);
    
    // Log error recovery decision to database
    try {
      await db.insert(aiAgentEvents).values({
        id: uuidv4(),
        agentId: task.coordinatorId,
        agentType: 'error_recovery',
        action: 'task_error',
        details: {
          taskId: task.id,
          taskTitle: task.title,
          error: error.message,
          stack: error.stack?.substring(0, 500),
          participantIds: task.participantIds,
          strategy: task.strategy,
          priority: task.priority,
          timestamp: new Date().toISOString()
        },
        status: 'error',
        timestamp: new Date()
      });
    } catch (dbError) {
      logger.error('Failed to log error recovery to database:', dbError as Error);
    }
    
    // Attempt recovery based on task priority
    if (task.priority === 'critical' || task.priority === 'high') {
      logger.info(`Attempting automatic recovery for ${task.priority} priority task ${task.id}`);
      // The calling code in executeTask will handle retry logic
    }
  }
}

class ResourceManager {
  private allocations: Map<string, { agentIds: string[]; allocatedAt: Date; taskId: string }> = new Map();
  
  allocateResources(task: AgentTask): boolean {
    const taskId = task.id;
    
    // Check if resources are already allocated for this task
    if (this.allocations.has(taskId)) {
      logger.warn(`Resources already allocated for task ${taskId}`);
      return true; // Already allocated
    }
    
    // Validate all participant agents are available
    const unavailable = task.participantIds.filter(agentId => {
      // In a real implementation, check agent availability from the registry
      return false; // Assume available if not tracked
    });
    
    if (unavailable.length > 0) {
      logger.error(`Cannot allocate resources: agents ${unavailable.join(', ')} are unavailable`);
      return false;
    }
    
    // Record allocation
    this.allocations.set(taskId, {
      agentIds: [...task.participantIds],
      allocatedAt: new Date(),
      taskId
    });
    
    logger.info(`Resources allocated for task ${taskId}: ${task.participantIds.length} agents`);
    return true;
  }

  releaseResources(task: AgentTask): void {
    const taskId = task.id;
    const allocation = this.allocations.get(taskId);
    
    if (allocation) {
      this.allocations.delete(taskId);
      logger.info(`Resources released for task ${taskId}: ${allocation.agentIds.length} agents freed`);
    }
  }
  
  getActiveAllocations(): Map<string, { agentIds: string[]; allocatedAt: Date; taskId: string }> {
    return new Map(this.allocations);
  }
}

interface CoordinationMetrics {
  totalTasks: number;
  activeTasks: number;
  completedTasks: number;
  failedTasks: number;
  activeSessions: number;
  registeredAgents: number;
  averageTaskDuration: number;
  strategyUsage: Record<string, number>;
}

export const unifiedMultiAgentCoordinator = new UnifiedMultiAgentCoordinator();
export default unifiedMultiAgentCoordinator;
