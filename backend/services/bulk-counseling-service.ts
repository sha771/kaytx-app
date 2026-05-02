import { randomUUID } from 'crypto';
import { agentConsultingService, ConsultationSession } from './agent-consulting-service';
import { getAgentHierarchy, allAgents } from '../../constants/aiAgentHierarchy';
import { createLogger } from '../lib/production-logger';

const logger = createLogger('BulkCounseling');

// ============================================
// BULK COUNSELING OPERATIONS FOR MAIN AGENTS
// ============================================

export interface BulkCounselingOperation {
  id: string;
  mainAgentId: string;
  type: 'performance_review' | 'development_planning' | 'team_coordination' | 'crisis_management' | 'routine_checkin';
  status: 'pending' | 'in_progress' | 'completed' | 'partial' | 'failed';
  targets: {
    subagentIds: string[];
    filters?: {
      categories?: string[];
      performanceThreshold?: 'low' | 'medium' | 'high';
      lastCounselingDays?: number;
    };
  };
  template: {
    counselingType: string;
    topic: string;
    agenda: string[];
    priority: 'low' | 'medium' | 'high' | 'critical';
    duration: number; // minutes per session
  };
  scheduling: {
    spreadOverDays: number;
    preferredTimeSlots: string[]; // HH:mm
    avoidConflicts: boolean;
    batchSize: number;
  };
  results: {
    totalTargeted: number;
    sessionsCreated: number;
    sessionsScheduled: number;
    sessionsCompleted: number;
    failedTargets: { agentId: string; reason: string }[];
  };
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  metadata: Record<string, any>;
}

export interface BulkOperationSummary {
  operationId: string;
  mainAgentId: string;
  mainAgentName: string;
  type: BulkCounselingOperation['type'];
  status: BulkCounselingOperation['status'];
  progress: {
    total: number;
    completed: number;
    percentage: number;
  };
  estimatedCompletion: Date;
  createdAt: Date;
}

class BulkCounselingService {
  private operations: Map<string, BulkCounselingOperation> = new Map();
  private activeOperations: Set<string> = new Set();

  // ============================================
  // BULK OPERATION CREATION
  // ============================================

  async createBulkOperation(params: Omit<BulkCounselingOperation, 'id' | 'status' | 'results' | 'createdAt' | 'startedAt' | 'completedAt'>): Promise<BulkCounselingOperation> {
    // Validate main agent
    const hierarchy = getAgentHierarchy(params.mainAgentId);
    if (!hierarchy || hierarchy.mainAgent?.id !== params.mainAgentId) {
      throw new Error('Only main agents can create bulk counseling operations');
    }

    // Resolve target subagents
    let targetSubagentIds: string[] = [];
    
    if (params.targets.subagentIds.length > 0) {
      // Use specified subagents
      targetSubagentIds = params.targets.subagentIds.filter(id => 
        hierarchy.subAgents.some(sa => sa.id === id)
      );
    } else if (params.targets.filters) {
      // Apply filters to all subagents
      targetSubagentIds = this.filterSubagents(
        hierarchy.subAgents.map(sa => sa.id),
        params.targets.filters
      );
    } else {
      // Default to all subagents
      targetSubagentIds = hierarchy.subAgents.map(sa => sa.id);
    }

    if (targetSubagentIds.length === 0) {
      throw new Error('No target subagents found matching criteria');
    }

    const operation: BulkCounselingOperation = {
      ...params,
      id: randomUUID(),
      status: 'pending',
      targets: {
        ...params.targets,
        subagentIds: targetSubagentIds,
      },
      results: {
        totalTargeted: targetSubagentIds.length,
        sessionsCreated: 0,
        sessionsScheduled: 0,
        sessionsCompleted: 0,
        failedTargets: [],
      },
      createdAt: new Date(),
      metadata: {},
    };

    this.operations.set(operation.id, operation);
    return operation;
  }

  private filterSubagents(
    subagentIds: string[],
    filters: NonNullable<BulkCounselingOperation['targets']['filters']>
  ): string[] {
    let filtered = [...subagentIds];

    // Apply category Filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((id: string) => {
        const agent = allAgents.find((a: any) => a.id === id);
        return agent && filters.categories!.includes(agent.category);
      });
    }

    // Apply performance threshold Filter (would integrate with performance service)
    if (filters.performanceThreshold) {
      // Placeholder: would check actual performance metrics
      // For now, assume all pass
    }

    // Apply last counseling Filter
    if (filters.lastCounselingDays !== undefined) {
      // Placeholder: would check counseling history
      // For now, assume all pass
    }

    return filtered;
  }

  // ============================================
  // BULK OPERATION EXECUTION
  // ============================================

  async executeBulkOperation(operationId: string): Promise<BulkCounselingOperation> {
    const operation = this.operations.get(operationId);
    if (!operation) {
      throw new Error(`Bulk operation ${operationId} not found`);
    }

    if (operation.status !== 'pending') {
      throw new Error(`Operation is already ${operation.status}`);
    }

    // Mark as in progress
    operation.status = 'in_progress';
    operation.startedAt = new Date();
    this.operations.set(operationId, operation);
    this.activeOperations.add(operationId);

    try {
      // Process in batches
      const batches = this.createBatches(
        operation.targets.subagentIds,
        operation.scheduling.batchSize
      );

      let processedCount = 0;

      for (const batch of batches) {
        await this.processBatch(operation, batch);
        processedCount += batch.length;

        // Update progress
        operation.results.sessionsCreated = processedCount;
        this.operations.set(operationId, operation);

        // Delay between batches if spreading over time
        if (operation.scheduling.spreadOverDays > 0 && batches.length > 1) {
          await this.delay(operation.scheduling.spreadOverDays * 24 * 60 * 60 * 1000 / batches.length);
        }
      }

      // Mark as completed or partial
      operation.status = operation.results.failedTargets.length === 0 ? 'completed' : 'partial';
      operation.completedAt = new Date();
      
    } catch (err) {
      operation.status = 'failed';
      operation.metadata.error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      this.activeOperations.delete(operationId);
    }

    this.operations.set(operationId, operation);
    return operation;
  }

  private createBatches(items: string[], batchSize: number): string[][] {
    const batches: string[][] = [];
    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }
    return batches;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processBatch(
    operation: BulkCounselingOperation,
    batch: string[]
  ): Promise<void> {
    const promises = batch.map(async (subagentId, index) => {
      try {
        // Calculate scheduled time if spreading
        let scheduledTime: Date | undefined;
        if (operation.scheduling.spreadOverDays > 0) {
          scheduledTime = this.calculateScheduledTime(operation, index);
        }

        // Create counseling session
        const session = await this.createCounselingSession(operation, subagentId, scheduledTime);
        
        if (session) {
          operation.results.sessionsCreated++;
          if (scheduledTime) {
            operation.results.sessionsScheduled++;
          }
        }
      } catch (err) {
        operation.results.failedTargets.push({
          agentId: subagentId,
          reason: err instanceof Error ? err.message : 'Failed to create session',
        });
      }
    });

    await Promise.all(promises);
  }

  private calculateScheduledTime(operation: BulkCounselingOperation, index: number): Date {
    const now = new Date();
    const spreadMs = operation.scheduling.spreadOverDays * 24 * 60 * 60 * 1000;
    const intervalMs = spreadMs / operation.targets.subagentIds.length;
    
    const scheduledTime = new Date(now.getTime() + index * intervalMs);
    
    // Try to fit into preferred time slots
    if (operation.scheduling.preferredTimeSlots.length > 0) {
      const hour = scheduledTime.getHours();
      const preferredHours = operation.scheduling.preferredTimeSlots.map(t => parseInt(t.split(':')[0]));
      
      if (!preferredHours.includes(hour)) {
        // Find nearest preferred hour
        const nearestHour = preferredHours.reduce((prev, curr) => 
          Math.abs(curr - hour) < Math.abs(prev - hour) ? curr : prev
        );
        scheduledTime.setHours(nearestHour, 0, 0, 0);
      }
    }

    return scheduledTime;
  }

  private async createCounselingSession(
    operation: BulkCounselingOperation,
    subagentId: string,
    scheduledTime?: Date
  ): Promise<ConsultationSession | null> {
    try {
      const session = await agentConsultingService.initiateComprehensiveCounseling(
        operation.mainAgentId,
        subagentId,
        'main_to_sub',
        {
          programType: this.mapOperationTypeToProgramType(operation.type),
          severity: operation.template.priority === 'critical' ? 'critical' : 
                    operation.template.priority === 'high' ? 'high' : 'medium',
          duration: 'single_session',
          confidentiality: 'team',
        },
        {
          primaryObjectives: operation.template.agenda,
          specificIssues: [],
          expectedOutcomes: [],
          successMetrics: [],
        },
        {},
        {
          priority: operation.template.priority as any,
          deadline: scheduledTime,
        }
      );

      return session;
    } catch (err) {
      logger.error(`[BulkCounseling] Failed to create session for ${subagentId}`, err as Error);
      return null;
    }
  }

  private mapOperationTypeToProgramType(type: BulkCounselingOperation['type']): any {
    const typeMap: Record<string, any> = {
      'performance_review': 'performance_improvement',
      'development_planning': 'skill_development',
      'team_coordination': 'coordination_alignment',
      'crisis_management': 'crisis_intervention',
      'routine_checkin': 'career_guidance',
    };
    return typeMap[type] || 'skill_development';
  }

  // ============================================
  // QUICK BULK OPERATIONS
  // ============================================

  async quickPerformanceReview(
    mainAgentId: string,
    options?: {
      targetSubagents?: string[];
      priority?: 'low' | 'medium' | 'high';
      spreadOverDays?: number;
    }
  ): Promise<BulkCounselingOperation> {
    const hierarchy = getAgentHierarchy(mainAgentId);
    const targetIds = options?.targetSubagents || hierarchy.subAgents.map(sa => sa.id);

    const operation = await this.createBulkOperation({
      mainAgentId,
      type: 'performance_review',
      targets: {
        subagentIds: targetIds,
      },
      template: {
        counselingType: 'performance',
        topic: 'Quarterly Performance Review',
        agenda: [
          'Review recent performance metrics',
          'Identify strengths and areas for improvement',
          'Set goals for next quarter',
          'Discuss development opportunities',
        ],
        priority: options?.priority || 'medium',
        duration: 30,
      },
      scheduling: {
        spreadOverDays: options?.spreadOverDays || 7,
        preferredTimeSlots: ['09:00', '14:00'],
        avoidConflicts: true,
        batchSize: 5,
      },
      metadata: {},
    });

    // Auto-execute
    return this.executeBulkOperation(operation.id);
  }

  async quickTeamCoordination(
    mainAgentId: string,
    coordinationTopic: string,
    options?: {
      targetSubagents?: string[];
      priority?: 'low' | 'medium' | 'high';
    }
  ): Promise<BulkCounselingOperation> {
    const hierarchy = getAgentHierarchy(mainAgentId);
    const targetIds = options?.targetSubagents || hierarchy.subAgents.map(sa => sa.id);

    const operation = await this.createBulkOperation({
      mainAgentId,
      type: 'team_coordination',
      targets: {
        subagentIds: targetIds,
      },
      template: {
        counselingType: 'coordination',
        topic: coordinationTopic,
        agenda: [
          'Align on shared objectives',
          'Coordinate responsibilities',
          'Establish communication protocols',
          'Define success metrics',
        ],
        priority: options?.priority || 'medium',
        duration: 20,
      },
      scheduling: {
        spreadOverDays: 3,
        preferredTimeSlots: ['10:00', '15:00'],
        avoidConflicts: true,
        batchSize: 10,
      },
      metadata: {},
    });

    return this.executeBulkOperation(operation.id);
  }

  async quickCrisisResponse(
    mainAgentId: string,
    crisisDetails: {
      affectedSubagents: string[];
      crisisType: string;
      severity: 'high' | 'critical';
    }
  ): Promise<BulkCounselingOperation> {
    const operation = await this.createBulkOperation({
      mainAgentId,
      type: 'crisis_management',
      targets: {
        subagentIds: crisisDetails.affectedSubagents,
      },
      template: {
        counselingType: 'crisis',
        topic: `URGENT: ${crisisDetails.crisisType}`,
        agenda: [
          'Assess immediate impact',
          'Implement containment measures',
          'Coordinate response efforts',
          'Establish communication channels',
        ],
        priority: crisisDetails.severity === 'critical' ? 'critical' : 'high',
        duration: 15,
      },
      scheduling: {
        spreadOverDays: 1,
        preferredTimeSlots: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
        avoidConflicts: false,
        batchSize: 20,
      },
      metadata: {},
    });

    return this.executeBulkOperation(operation.id);
  }

  // ============================================
  // OPERATION MANAGEMENT
  // ============================================

  getOperation(operationId: string): BulkCounselingOperation | undefined {
    return this.operations.get(operationId);
  }

  getOperationsForAgent(
    mainAgentId: string,
    filters?: {
      status?: BulkCounselingOperation['status'];
      type?: BulkCounselingOperation['type'];
      fromDate?: Date;
      toDate?: Date;
    }
  ): BulkCounselingOperation[] {
    let ops = Array.from(this.operations.values())
      .filter(op => op.mainAgentId === mainAgentId);

    if (filters?.status) {
      ops = ops.filter(op => op.status === filters.status);
    }

    if (filters?.type) {
      ops = ops.filter(op => op.type === filters.type);
    }

    if (filters?.fromDate) {
      ops = ops.filter(op => op.createdAt >= filters.fromDate!);
    }

    if (filters?.toDate) {
      ops = ops.filter(op => op.createdAt <= filters.toDate!);
    }

    return ops.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getOperationSummary(operationId: string): BulkOperationSummary | null {
    const operation = this.operations.get(operationId);
    if (!operation) return null;

    const hierarchy = getAgentHierarchy(operation.mainAgentId);
    const mainAgentName = hierarchy.mainAgent?.name || 'Unknown';

    const total = operation.results.totalTargeted;
    const completed = operation.results.sessionsCreated;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Estimate completion time
    let estimatedCompletion = new Date();
    if (operation.status === 'in_progress') {
      const remainingBatches = Math.ceil((total - completed) / operation.scheduling.batchSize);
      const msPerBatch = operation.scheduling.spreadOverDays * 24 * 60 * 60 * 1000 / 
        Math.ceil(total / operation.scheduling.batchSize);
      estimatedCompletion = new Date(Date.now() + remainingBatches * msPerBatch);
    } else if (operation.completedAt) {
      estimatedCompletion = operation.completedAt;
    }

    return {
      operationId: operation.id,
      mainAgentId: operation.mainAgentId,
      mainAgentName,
      type: operation.type,
      status: operation.status,
      progress: {
        total,
        completed,
        percentage,
      },
      estimatedCompletion,
      createdAt: operation.createdAt,
    };
  }

  cancelOperation(operationId: string): boolean {
    const operation = this.operations.get(operationId);
    if (!operation) return false;

    if (operation.status !== 'pending' && operation.status !== 'in_progress') {
      return false;
    }

    operation.status = 'failed';
    operation.metadata.cancelledAt = new Date();
    operation.metadata.cancellationReason = 'User cancelled';
    this.operations.set(operationId, operation);
    this.activeOperations.delete(operationId);

    return true;
  }

  deleteOperation(operationId: string): boolean {
    const operation = this.operations.get(operationId);
    if (!operation) return false;

    // Can only delete completed/failed operations
    if (operation.status === 'pending' || operation.status === 'in_progress') {
      return false;
    }

    return this.operations.delete(operationId);
  }

  // ============================================
  // ANALYTICS
  // ============================================

  getBulkOperationStats(mainAgentId: string): {
    totalOperations: number;
    totalSessionsCreated: number;
    successRate: number;
    averageCompletionTime: number; // hours
    operationTypeBreakdown: Record<string, number>;
  } {
    const operations = this.getOperationsForAgent(mainAgentId);
    
    const completedOps = operations.filter(op => op.status === 'completed');
    const totalSessions = operations.reduce((sum, op) => sum + op.results.sessionsCreated, 0);
    
    const completionTimes = completedOps
      .filter(op => op.startedAt && op.completedAt)
      .map(op => (new Date(op.completedAt!).getTime() - new Date(op.startedAt!).getTime()) / (1000 * 60 * 60));
    
    const avgCompletionTime = completionTimes.length > 0 
      ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length 
      : 0;

    const typeBreakdown: Record<string, number> = {};
    for (const op of operations) {
      typeBreakdown[op.type] = (typeBreakdown[op.type] || 0) + 1;
    }

    return {
      totalOperations: operations.length,
      totalSessionsCreated: totalSessions,
      successRate: operations.length > 0 ? (completedOps.length / operations.length) * 100 : 0,
      averageCompletionTime: avgCompletionTime,
      operationTypeBreakdown: typeBreakdown,
    };
  }
}

// Singleton instance
export const bulkCounselingService = new BulkCounselingService();

// Convenience functions
export function createBulkCounselingOperation(
  params: Parameters<BulkCounselingService['createBulkOperation']>[0]
): Promise<BulkCounselingOperation> {
  return bulkCounselingService.createBulkOperation(params);
}

export function executeBulkCounselingOperation(operationId: string): Promise<BulkCounselingOperation> {
  return bulkCounselingService.executeBulkOperation(operationId);
}

export function quickBulkPerformanceReview(
  mainAgentId: string,
  options?: Parameters<BulkCounselingService['quickPerformanceReview']>[1]
): Promise<BulkCounselingOperation> {
  return bulkCounselingService.quickPerformanceReview(mainAgentId, options);
}

export function quickBulkTeamCoordination(
  mainAgentId: string,
  coordinationTopic: string,
  options?: Parameters<BulkCounselingService['quickTeamCoordination']>[2]
): Promise<BulkCounselingOperation> {
  return bulkCounselingService.quickTeamCoordination(mainAgentId, coordinationTopic, options);
}

export function getBulkOperationSummary(operationId: string): BulkOperationSummary | null {
  return bulkCounselingService.getOperationSummary(operationId);
}

export function getMainAgentBulkStats(mainAgentId: string): ReturnType<BulkCounselingService['getBulkOperationStats']> {
  return bulkCounselingService.getBulkOperationStats(mainAgentId);
}

export default bulkCounselingService;
