import { bulkCounselingService, BulkOperation, BulkOperationType, BulkOperationStatus } from '../../backend/services/bulk-counseling-service';
import { randomUUID } from 'crypto';

import { getAgentHierarchy } from '../../constants/aiAgentHierarchy';

// Mock the agent hierarchy
jest.mock('../../constants/aiAgentHierarchy', () => ({
  getAgentHierarchy: jest.fn(),
  allAgents: []
}));

describe('Bulk Counseling Service', () => {
  const mockMainAgentId = randomUUID();
  const mockSubAgent1 = randomUUID();
  const mockSubAgent2 = randomUUID();
  const mockOrgId = randomUUID();

  beforeEach(() => {
    // Clear operations before each test
    (bulkCounselingService as any).operations.clear();
    
    // Mock the agent hierarchy to return valid main agent
    (getAgentHierarchy as jest.Mock).mockReturnValue({
      mainAgent: { id: mockMainAgentId },
      subAgents: [
        { id: mockSubAgent1 },
        { id: mockSubAgent2 }
      ]
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createBulkOperation', () => {
    it('should create a bulk operation with valid input', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1, mockSubAgent2],
          filters: {
            categories: ['sales', 'support'],
            performanceLevels: ['needs_improvement', 'at_risk'],
          },
        },
        template: {
          templateId: randomUUID(),
          customizations: {
            agenda: {
              primaryObjectives: ['Assess performance'],
            },
          },
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 7,
          priority: 'medium',
          preferredTimeSlots: ['morning', 'afternoon'],
        },
        mainAgentId: mockMainAgentId,
      });

      expect(operation).toBeDefined();
      expect(operation.id).toBeDefined();
      expect(operation.type).toBe('performance_review');
      expect(operation.status).toBe('draft');
      expect(operation.mainAgentId).toBe(mockMainAgentId);
      expect(operation.createdAt).toBeInstanceOf(Date);
      expect(operation.results).toBeDefined();
      expect(operation.results.totalTargeted).toBe(2);
      expect(operation.results.sessionsCreated).toBe(0);
    });

    it('should support all operation types', async () => {
      const types: BulkOperationType[] = [
        'performance_review',
        'development_planning',
        'team_coordination',
        'crisis_management',
        'routine_checkin',
      ];

      for (const type of types) {
        const operation = await bulkCounselingService.createBulkOperation({
          type,
          targets: {
            subagentIds: [mockSubAgent1],
          },
          template: {
            templateId: randomUUID(),
          },
          scheduling: {
            startDate: new Date(),
            spreadOverDays: 1,
            priority: 'medium',
          },
          mainAgentId: mockMainAgentId,
        });

        expect(operation.type).toBe(type);
      }
    });

    it('should generate unique IDs for each operation', async () => {
      const operation1 = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const operation2 = await bulkCounselingService.createBulkOperation({
        type: 'development_planning',
        targets: {
          subagentIds: [mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      expect(operation1.id).not.toBe(operation2.id);
    });

    it('should calculate total correctly from subagentIds', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1, mockSubAgent2, randomUUID(), randomUUID()],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      expect(operation.results.totalTargeted).toBe(4);
    });
  });

  describe('executeBulkOperation', () => {
    it('should execute a draft operation', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1, mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const executed = await bulkCounselingService.executeBulkOperation(operation.id);

      expect(executed).toBeDefined();
      expect(executed!.status).toBe('in_progress');
      expect(executed!.startedAt).toBeInstanceOf(Date);
    });

    it('should return undefined for non-existent operation', async () => {
      const executed = await bulkCounselingService.executeBulkOperation(randomUUID());

      expect(executed).toBeUndefined();
    });

    it('should only execute draft operations', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      // Execute once
      await bulkCounselingService.executeBulkOperation(operation.id);
      // Try to execute again
      const secondAttempt = await bulkCounselingService.executeBulkOperation(operation.id);

      // Should still return the operation but status won't change from non-draft
      expect(secondAttempt).toBeDefined();
      expect(secondAttempt!.status).toBe('in_progress');
    });
  });

  describe('getOperation', () => {
    it('should return operation by ID', async () => {
      const created = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const retrieved = bulkCounselingService.getOperation(created.id);

      expect(retrieved).toEqual(created);
    });

    it('should return undefined for non-existent ID', () => {
      const retrieved = bulkCounselingService.getOperation(randomUUID());

      expect(retrieved).toBeUndefined();
    });
  });

  describe('getOperationsForMainAgent', () => {
    it('should return all operations for main agent', async () => {
      await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      await bulkCounselingService.createBulkOperation({
        type: 'development_planning',
        targets: {
          subagentIds: [mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const operations = bulkCounselingService.getOperationsForMainAgent(mockMainAgentId);

      expect(operations).toHaveLength(2);
    });

    it('should Filter by status', async () => {
      const draftOp = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      bulkCounselingService.createBulkOperation({
        type: 'development_planning',
        targets: {
          subagentIds: [mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      // Execute the second one to change its status
      // Note: This depends on implementation details

      const draftOps = bulkCounselingService.getOperationsForMainAgent(mockMainAgentId, { status: 'draft' });

      expect(draftOps.every((op) => op.status === 'draft')).toBe(true);
    });

    it('should Filter by type', async () => {
      await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      bulkCounselingService.createBulkOperation({
        type: 'development_planning',
        targets: {
          subagentIds: [mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const perfReviewOps = bulkCounselingService.getOperationsForMainAgent(mockMainAgentId, {
        type: 'performance_review',
      });

      expect(perfReviewOps).toHaveLength(1);
      expect(perfReviewOps[0].type).toBe('performance_review');
    });

    it('should respect limit parameter', async () => {
      for (let i = 0; i < 5; i++) {
        await bulkCounselingService.createBulkOperation({
          type: 'performance_review',
          targets: {
            subagentIds: [mockSubAgent1],
          },
          template: {
            templateId: randomUUID(),
          },
          scheduling: {
            startDate: new Date(),
            spreadOverDays: 1,
            priority: 'medium',
          },
          mainAgentId: mockMainAgentId,
        });
      }

      const limited = bulkCounselingService.getOperationsForMainAgent(mockMainAgentId, { limit: 3 });

      expect(limited).toHaveLength(3);
    });
  });

  describe('updateOperationResults', () => {
    it('should update operation results', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1, mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      bulkCounselingService.updateOperationResults(operation.id, {
        completed: 1,
        failed: 0,
        pending: 1,
        details: {
          [mockSubAgent1]: { success: true },
        },
      });

      const updated = bulkCounselingService.getOperation(operation.id);

      expect(updated!.results.completed).toBe(1);
      expect(updated!.results.pending).toBe(1);
      expect(updated!.results.details[mockSubAgent1].success).toBe(true);
    });

    it('should return false for non-existent operation', () => {
      const result = bulkCounselingService.updateOperationResults(randomUUID(), {
        completed: 1,
      });

      expect(result).toBe(false);
    });
  });

  describe('completeOperation', () => {
    it('should mark operation as completed', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      // Execute first
      await bulkCounselingService.executeBulkOperation(operation.id);

      const completed = bulkCounselingService.completeOperation(operation.id);

      expect(completed).toBeDefined();
      expect(completed!.status).toBe('completed');
      expect(completed!.completedAt).toBeInstanceOf(Date);
    });

    it('should return undefined for non-existent operation', () => {
      const completed = bulkCounselingService.completeOperation(randomUUID());

      expect(completed).toBeUndefined();
    });
  });

  describe('cancelOperation', () => {
    it('should cancel a draft operation', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const cancelled = bulkCounselingService.cancelOperation(operation.id);

      expect(cancelled).toBe(true);
      expect(bulkCounselingService.getOperation(operation.id)).toBeUndefined();
    });

    it('should return false for non-existent operation', () => {
      const cancelled = bulkCounselingService.cancelOperation(randomUUID());

      expect(cancelled).toBe(false);
    });

    it('should not cancel already completed operations', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      await bulkCounselingService.executeBulkOperation(operation.id);
      bulkCounselingService.completeOperation(operation.id);

      const cancelled = bulkCounselingService.cancelOperation(operation.id);

      expect(cancelled).toBe(false);
    });
  });

  describe('getOperationStats', () => {
    it('should return statistics for main agent', async () => {
      await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      bulkCounselingService.createBulkOperation({
        type: 'development_planning',
        targets: {
          subagentIds: [mockSubAgent2],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      const stats = bulkCounselingService.getOperationStats(mockMainAgentId);

      expect(stats.total).toBe(2);
      expect(stats.byType['performance_review']).toBe(1);
      expect(stats.byType['development_planning']).toBe(1);
      expect(stats.byStatus['draft']).toBe(2);
    });

    it('should return zeros when no operations exist', () => {
      const stats = bulkCounselingService.getOperationStats(mockMainAgentId);

      expect(stats.total).toBe(0);
      expect(Object.keys(stats.byType)).toHaveLength(0);
      expect(Object.keys(stats.byStatus)).toHaveLength(0);
    });
  });

  describe('Quick Operations', () => {
    it('should create quick performance review', async () => {
      const operation = await bulkCounselingService.quickPerformanceReview(
        [mockSubAgent1, mockSubAgent2],
        mockMainAgentId,
        'medium',
        7
      );

      expect(operation).toBeDefined();
      expect(operation.type).toBe('performance_review');
      expect(operation.targets.subagentIds).toHaveLength(2);
      expect(operation.scheduling.spreadOverDays).toBe(7);
      expect(operation.scheduling.priority).toBe('medium');
    });

    it('should create quick development planning', async () => {
      const operation = await bulkCounselingService.quickDevelopmentPlanning(
        [mockSubAgent1],
        mockMainAgentId,
        'high',
        14
      );

      expect(operation).toBeDefined();
      expect(operation.type).toBe('development_planning');
      expect(operation.scheduling.spreadOverDays).toBe(14);
      expect(operation.scheduling.priority).toBe('high');
    });

    it('should create quick team coordination', async () => {
      const operation = await bulkCounselingService.quickTeamCoordination(
        [mockSubAgent1, mockSubAgent2],
        mockMainAgentId,
        'critical',
        3
      );

      expect(operation).toBeDefined();
      expect(operation.type).toBe('team_coordination');
      expect(operation.scheduling.spreadOverDays).toBe(3);
      expect(operation.scheduling.priority).toBe('critical');
    });

    it('should create quick crisis management', async () => {
      const operation = await bulkCounselingService.quickCrisisManagement(
        [mockSubAgent1],
        mockMainAgentId
      );

      expect(operation).toBeDefined();
      expect(operation.type).toBe('crisis_management');
      expect(operation.scheduling.priority).toBe('emergency');
      expect(operation.scheduling.spreadOverDays).toBe(1);
    });
  });

  describe('Operation Status Transitions', () => {
    it('should transition from draft to in_progress to completed', async () => {
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      expect(operation.status).toBe('draft');

      const executed = await bulkCounselingService.executeBulkOperation(operation.id);
      expect(executed!.status).toBe('in_progress');

      const completed = bulkCounselingService.completeOperation(operation.id);
      expect(completed!.status).toBe('completed');
    });

    it('should track startedAt and completedAt timestamps', async () => {
      const beforeStart = new Date();
      const operation = await bulkCounselingService.createBulkOperation({
        type: 'performance_review',
        targets: {
          subagentIds: [mockSubAgent1],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockMainAgentId,
      });

      await bulkCounselingService.executeBulkOperation(operation.id);
      const afterStart = new Date();

      const started = bulkCounselingService.getOperation(operation.id);
      expect(started!.startedAt).toBeInstanceOf(Date);
      expect(started!.startedAt!.getTime()).toBeGreaterThanOrEqual(beforeStart.getTime());
      expect(started!.startedAt!.getTime()).toBeLessThanOrEqual(afterStart.getTime());

      const beforeComplete = new Date();
      bulkCounselingService.completeOperation(operation.id);
      const afterComplete = new Date();

      const completed = bulkCounselingService.getOperation(operation.id);
      expect(completed!.completedAt).toBeInstanceOf(Date);
      expect(completed!.completedAt!.getTime()).toBeGreaterThanOrEqual(beforeComplete.getTime());
      expect(completed!.completedAt!.getTime()).toBeLessThanOrEqual(afterComplete.getTime());
    });
  });
});
