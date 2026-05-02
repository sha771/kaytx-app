/**
 * Comprehensive Unit Tests for Consolidated Decision Logging Service
 * Tests all functionality including decision tracking, analytics, and reasoning
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedDecisionLoggingService } from '../../../services/consolidated-decision-logging-service';
import { db } from '../../../db/connection';
import { eq, and, gte, lte, desc, sql } from 'drizzle-orm';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../services/consolidated-audit-service');

describe('ConsolidatedDecisionLoggingService', () => {
  let decisionService: ConsolidatedDecisionLoggingService;
  let mockDb: any;
  let mockAuditService: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock database
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      having: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      onConflictDoUpdate: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    };

    // Mock audit service
    mockAuditService = {
      createAuditLog: jest.fn().mockResolvedValue({}),
    };

    // Use jest.requireMock to get the mocked db
    const mockedDb = jest.requireMock('../../../db/connection').db;
    Object.assign(mockedDb, mockDb);
    decisionService = new ConsolidatedDecisionLoggingService();
  });

  afterEach(async () => {
    await decisionService.cleanup();
  });

  describe('Decision Logging', () => {
    it('should log a decision with complete context', async () => {
      const decisionData = {
        agentId: 'agent-123',
        organizationId: 'org-123',
        userId: 'user-123',
        sessionId: 'session-123',
        decisionType: 'routing',
        context: {
          input: 'User query about pricing',
          availableOptions: ['pricing-plan', 'support', 'sales'],
          constraints: { budget: 1000, timeframe: '1-month' }
        },
        reasoning: {
          primaryFactor: 'budget_constraint',
          secondaryFactors: ['time_urgency', 'user_history'],
          confidence: 0.85,
          logic: 'User mentioned budget limit, so routing to pricing plans'
        },
        outcome: {
          selectedOption: 'pricing-plan',
          alternative: 'support',
          expectedImpact: { conversion: 0.7, satisfaction: 0.8 }
        },
        impact: {
          businessValue: 0.6,
          userSatisfaction: 0.8,
          efficiency: 0.9,
          risk: 0.2
        },
        alternatives: [
          {
            option: 'support',
            reasoning: 'Could handle pricing questions but less efficient',
            expectedImpact: { conversion: 0.4, satisfaction: 0.9 }
          },
          {
            option: 'sales',
            reasoning: 'High conversion potential but high cost',
            expectedImpact: { conversion: 0.9, satisfaction: 0.6 }
          }
        ]
      };

      const mockDecision = {
        id: 'decision-123',
        ...decisionData,
        timestamp: new Date(),
        version: 1
      };

      mockDb.execute.mockResolvedValue({ insertId: 'decision-123' });
      mockDb.select.mockReturnValue([mockDecision]);

      const result = await decisionService.logDecision(decisionData);

      expect(result).toBeDefined();
      expect(result.decisionType).toBe('routing');
      expect(result.reasoning.confidence).toBe(0.85);
      expect(result.outcome.selectedOption).toBe('pricing-plan');
      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockAuditService.createAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'decision.logged',
          resource: 'ai-decision',
          severity: 'info'
        })
      );
    });

    it('should log decision with minimal required fields', async () => {
      const minimalDecision = {
        agentId: 'agent-123',
        organizationId: 'org-123',
        decisionType: 'response',
        reasoning: {
          primaryFactor: 'user_intent',
          confidence: 0.9
        },
        outcome: {
          selectedOption: 'generate_response'
        }
      };

      const mockDecision = {
        id: 'decision-456',
        ...minimalDecision,
        timestamp: new Date(),
        version: 1
      };

      mockDb.execute.mockResolvedValue({ insertId: 'decision-456' });
      mockDb.select.mockReturnValue([mockDecision]);

      const result = await decisionService.logDecision(minimalDecision);

      expect(result).toBeDefined();
      expect(result.decisionType).toBe('response');
      expect(result.reasoning.confidence).toBe(0.9);
    });

    it('should handle decision updates and versioning', async () => {
      const originalDecision = {
        id: 'decision-789',
        agentId: 'agent-123',
        organizationId: 'org-123',
        decisionType: 'routing',
        reasoning: { primaryFactor: 'initial_analysis', confidence: 0.7 },
        outcome: { selectedOption: 'option_a' },
        version: 1
      };

      const updateData = {
        reasoning: { primaryFactor: 'updated_analysis', confidence: 0.9 },
        outcome: { selectedOption: 'option_b' },
        updateReason: 'New information became available'
      };

      mockDb.select.mockReturnValue([originalDecision]);
      mockDb.execute.mockResolvedValue({});

      const result = await decisionService.updateDecision('decision-789', updateData);

      expect(result).toBeDefined();
      expect(result.version).toBe(2);
      expect(result.reasoning.primaryFactor).toBe('updated_analysis');
      expect(result.outcome.selectedOption).toBe('option_b');
    });
  });

  describe('Decision Retrieval', () => {
    it('should retrieve decisions by agent', async () => {
      const mockDecisions = [
        {
          id: '1',
          agentId: 'agent-123',
          decisionType: 'routing',
          reasoning: { primaryFactor: 'user_intent' },
          timestamp: new Date('2024-01-01')
        },
        {
          id: '2',
          agentId: 'agent-123',
          decisionType: 'response',
          reasoning: { primaryFactor: 'context_analysis' },
          timestamp: new Date('2024-01-02')
        }
      ];

      mockDb.select.mockReturnValue(mockDecisions);

      const result = await decisionService.getDecisionsByAgent('agent-123', {
        limit: 10,
        offset: 0
      });

      expect(result).toHaveLength(2);
      expect(result[0].agentId).toBe('agent-123');
      expect(mockDb.where).toHaveBeenCalledWith(
        expect.objectContaining({
          agentId: 'agent-123'
        })
      );
    });

    it('should Filter decisions by multiple criteria', async () => {
      const filters = {
        organizationId: 'org-123',
        decisionType: 'routing',
        confidenceMin: 0.8,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31')
      };

      const mockDecisions = [
        {
          id: '1',
          ...filters,
          reasoning: { confidence: 0.85 },
          timestamp: new Date('2024-01-15')
        }
      ];

      mockDb.select.mockReturnValue(mockDecisions);

      const result = await decisionService.searchDecisions(filters);

      expect(result).toHaveLength(1);
      expect(result[0].reasoning.confidence).toBeGreaterThanOrEqual(0.8);
    });

    it('should paginate decision results', async () => {
      const mockDecisions = Array(50).fill(null).map((_, index) => ({
        id: `decision-${index}`,
        decisionType: 'routing',
        timestamp: new Date()
      }));

      mockDb.select.mockReturnValue(mockDecisions);

      const result = await decisionService.searchDecisions({
        organizationId: 'org-123',
        limit: 20,
        offset: 10
      });

      expect(result).toHaveLength(50);
      expect(mockDb.limit).toHaveBeenCalledWith(20);
      expect(mockDb.offset).toHaveBeenCalledWith(10);
    });
  });

  describe('Decision Analytics', () => {
    it('should calculate decision patterns', async () => {
      const mockPatterns = [
        {
          decisionType: 'routing',
          count: 100,
          avgConfidence: 0.82,
          successRate: 0.75
        },
        {
          decisionType: 'response',
          count: 200,
          avgConfidence: 0.88,
          successRate: 0.85
        }
      ];

      mockDb.select.mockReturnValue(mockPatterns);

      const result = await decisionService.getDecisionPatterns('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31')
      });

      expect(result).toHaveLength(2);
      expect(result[0].decisionType).toBe('routing');
      expect(result[0].avgConfidence).toBe(0.82);
      expect(result[0].successRate).toBe(0.75);
    });

    it('should analyze decision factors', async () => {
      const mockFactors = [
        {
          factor: 'user_intent',
          frequency: 150,
          avgConfidence: 0.85,
          successRate: 0.80
        },
        {
          factor: 'budget_constraint',
          frequency: 80,
          avgConfidence: 0.78,
          successRate: 0.70
        }
      ];

      mockDb.select.mockReturnValue(mockFactors);

      const result = await decisionService.getDecisionFactors('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].factor).toBe('user_intent');
      expect(result[0].frequency).toBe(150);
      expect(result[0].avgConfidence).toBe(0.85);
    });

    it('should track decision outcomes', async () => {
      const mockOutcomes = [
        {
          selectedOption: 'pricing-plan',
          count: 60,
          successRate: 0.75,
          avgImpact: { businessValue: 0.6, userSatisfaction: 0.8 }
        },
        {
          selectedOption: 'support',
          count: 40,
          successRate: 0.85,
          avgImpact: { businessValue: 0.4, userSatisfaction: 0.9 }
        }
      ];

      mockDb.select.mockReturnValue(mockOutcomes);

      const result = await decisionService.getDecisionOutcomes('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].selectedOption).toBe('pricing-plan');
      expect(result[0].successRate).toBe(0.75);
    });

    it('should calculate decision quality metrics', async () => {
      const mockQualityData = [
        {
          date: '2024-01-01',
          totalDecisions: 100,
          avgConfidence: 0.82,
          successRate: 0.78,
          avgImpact: 0.75
        },
        {
          date: '2024-01-02',
          totalDecisions: 120,
          avgConfidence: 0.85,
          successRate: 0.82,
          avgImpact: 0.78
        }
      ];

      mockDb.select.mockReturnValue(mockQualityData);

      const result = await decisionService.getDecisionQualityMetrics('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-02'),
        granularity: 'daily'
      });

      expect(result).toHaveLength(2);
      expect(result[0].totalDecisions).toBe(100);
      expect(result[0].avgConfidence).toBe(0.82);
      expect(result[0].successRate).toBe(0.78);
    });
  });

  describe('Decision Insights', () => {
    it('should identify high-performing decision patterns', async () => {
      const mockHighPerformers = [
        {
          pattern: 'budget_constraint + user_intent',
          successRate: 0.92,
          frequency: 50,
          avgImpact: 0.88
        },
        {
          pattern: 'time_urgency + user_history',
          successRate: 0.88,
          frequency: 35,
          avgImpact: 0.82
        }
      ];

      mockDb.select.mockReturnValue(mockHighPerformers);

      const result = await decisionService.getHighPerformingPatterns('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].successRate).toBeGreaterThan(0.85);
      expect(result[0].pattern).toBe('budget_constraint + user_intent');
    });

    it('should detect decision anomalies', async () => {
      const mockAnomalies = [
        {
          decisionId: 'decision-anomaly-1',
          anomalyType: 'low_confidence_high_success',
          confidence: 0.3,
          actualSuccess: 0.95,
          expectedSuccess: 0.4,
          severity: 'medium'
        },
        {
          decisionId: 'decision-anomaly-2',
          anomalyType: 'high_confidence_low_success',
          confidence: 0.95,
          actualSuccess: 0.2,
          expectedSuccess: 0.85,
          severity: 'high'
        }
      ];

      mockDb.select.mockReturnValue(mockAnomalies);

      const result = await decisionService.detectDecisionAnomalies('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].anomalyType).toBe('low_confidence_high_success');
      expect(result[1].severity).toBe('high');
    });

    it('should provide decision recommendations', async () => {
      const mockRecommendations = [
        {
          type: 'pattern_optimization',
          description: 'Consider using budget_constraint factor more frequently',
          expectedImprovement: 0.15,
          confidence: 0.85
        },
        {
          type: 'confidence_calibration',
          description: 'Adjust confidence scoring for time_urgency decisions',
          expectedImprovement: 0.10,
          confidence: 0.78
        }
      ];

      mockDb.select.mockReturnValue(mockRecommendations);

      const result = await decisionService.getDecisionRecommendations('org-123');

      expect(result).toHaveLength(2);
      expect(result[0].type).toBe('pattern_optimization');
      expect(result[0].expectedImprovement).toBe(0.15);
    });
  });

  describe('Decision Comparison', () => {
    it('should compare similar decisions', async () => {
      const mockComparisons = [
        {
          decisionId1: 'decision-1',
          decisionId2: 'decision-2',
          similarity: 0.85,
          outcomeDifference: 0.2,
          reasoningDifference: 0.15
        }
      ];

      mockDb.select.mockReturnValue(mockComparisons);

      const result = await decisionService.compareDecisions('decision-1', {
        minSimilarity: 0.8,
        limit: 5
      });

      expect(result).toHaveLength(1);
      expect(result[0].similarity).toBeGreaterThanOrEqual(0.8);
    });

    it('should find decision precedents', async () => {
      const mockPrecedents = [
        {
          decisionId: 'precedent-1',
          similarity: 0.92,
          successRate: 0.88,
          reasoning: 'Similar context and successful outcome',
          applicableFactors: ['user_intent', 'budget_constraint']
        }
      ];

      mockDb.select.mockReturnValue(mockPrecedents);

      const result = await decisionService.findDecisionPrecedents({
        context: { userIntent: 'pricing', budget: 1000 },
        minSimilarity: 0.85
      });

      expect(result).toHaveLength(1);
      expect(result[0].similarity).toBeGreaterThanOrEqual(0.85);
      expect(result[0].successRate).toBe(0.88);
    });
  });

  describe('Decision Impact Analysis', () => {
    it('should calculate business impact of decisions', async () => {
      const mockImpactData = [
        {
          decisionType: 'routing',
          totalBusinessValue: 50000,
          avgBusinessValuePerDecision: 250,
          userSatisfactionScore: 0.82,
          efficiencyGain: 0.75
        },
        {
          decisionType: 'response',
          totalBusinessValue: 30000,
          avgBusinessValuePerDecision: 150,
          userSatisfactionScore: 0.88,
          efficiencyGain: 0.85
        }
      ];

      mockDb.select.mockReturnValue(mockImpactData);

      const result = await decisionService.getBusinessImpactAnalysis('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31')
      });

      expect(result).toHaveLength(2);
      expect(result[0].totalBusinessValue).toBe(50000);
      expect(result[0].avgBusinessValuePerDecision).toBe(250);
    });

    it('should track decision ROI', async () => {
      const mockROIData = [
        {
          decisionId: 'decision-roi-1',
          cost: 100,
          benefit: 500,
          roi: 4.0,
          paybackPeriod: 30
        }
      ];

      mockDb.select.mockReturnValue(mockROIData);

      const result = await decisionService.getDecisionROI('org-123');

      expect(result).toHaveLength(1);
      expect(result[0].roi).toBe(4.0);
      expect(result[0].paybackPeriod).toBe(30);
    });
  });

  describe('Batch Operations', () => {
    it('should log multiple decisions in batch', async () => {
      const batchDecisions = [
        {
          agentId: 'agent-1',
          organizationId: 'org-123',
          decisionType: 'routing',
          reasoning: { primaryFactor: 'intent' },
          outcome: { selectedOption: 'option_a' }
        },
        {
          agentId: 'agent-2',
          organizationId: 'org-123',
          decisionType: 'response',
          reasoning: { primaryFactor: 'context' },
          outcome: { selectedOption: 'option_b' }
        }
      ];

      mockDb.execute.mockResolvedValue({});

      const result = await decisionService.logBatchDecisions(batchDecisions);

      expect(result.successCount).toBe(2);
      expect(result.failureCount).toBe(0);
      expect(mockDb.insert).toHaveBeenCalledTimes(2);
    });

    it('should handle partial batch failures', async () => {
      const batchDecisions = [
        {
          agentId: 'agent-1',
          organizationId: 'org-123',
          decisionType: 'routing',
          reasoning: { primaryFactor: 'intent' },
          outcome: { selectedOption: 'option_a' }
        },
        {
          agentId: 'agent-2',
          organizationId: 'org-123',
          decisionType: 'response',
          reasoning: { primaryFactor: 'context' },
          outcome: { selectedOption: 'option_b' }
        }
      ];

      // First insert succeeds, second fails
      mockDb.execute
        .mockResolvedValueOnce({ insertId: 'decision-1' })
        .mockRejectedValueOnce(new Error('Database error'));

      const result = await decisionService.logBatchDecisions(batchDecisions);

      expect(result.successCount).toBe(1);
      expect(result.failureCount).toBe(1);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('Database connection failed');
      });

      await expect(decisionService.getDecisionsByAgent('agent-123'))
        .rejects.toThrow('Database connection failed');
    });

    it('should handle invalid decision data', async () => {
      const invalidDecision = {
        agentId: '', // invalid
        decisionType: '', // invalid
        reasoning: null // invalid
      };

      await expect(decisionService.logDecision(invalidDecision))
        .rejects.toThrow();
    });

    it('should handle missing decisions gracefully', async () => {
      mockDb.select.mockReturnValue([]);

      const result = await decisionService.getDecision('nonexistent-id');

      expect(result).toBeNull();
    });
  });

  describe('Performance', () => {
    it('should handle high-volume decision logging', async () => {
      const highVolumeDecisions = Array(1000).fill(null).map((_, index) => ({
        agentId: `agent-${index}`,
        organizationId: 'org-123',
        decisionType: 'routing',
        reasoning: { primaryFactor: 'intent' },
        outcome: { selectedOption: 'option_a' }
      }));

      mockDb.execute.mockResolvedValue({});

      const startTime = Date.now();
      const result = await decisionService.logBatchDecisions(highVolumeDecisions);
      const endTime = Date.now();

      expect(result.successCount).toBe(1000);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it('should efficiently query large decision datasets', async () => {
      const largeDecisionSet = Array(10000).fill(null).map((_, index) => ({
        id: `decision-${index}`,
        decisionType: 'routing',
        timestamp: new Date()
      }));

      mockDb.select.mockReturnValue(largeDecisionSet);

      const startTime = Date.now();
      const result = await decisionService.searchDecisions({
        organizationId: 'org-123',
        limit: 100,
        offset: 0
      });
      const endTime = Date.now();

      expect(result).toHaveLength(10000);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      const decisionService = new ConsolidatedDecisionLoggingService();
      
      // Log some decisions
      await decisionService.logDecision({
        agentId: 'agent-123',
        organizationId: 'org-123',
        decisionType: 'test',
        reasoning: { primaryFactor: 'test' },
        outcome: { selectedOption: 'test' }
      });

      // Cleanup should not throw errors
      await expect(decisionService.cleanup()).resolves.not.toThrow();
    });

    it('should handle concurrent decision operations', async () => {
      const decisionData = {
        agentId: 'agent-123',
        organizationId: 'org-123',
        decisionType: 'test',
        reasoning: { primaryFactor: 'test' },
        outcome: { selectedOption: 'test' }
      };

      mockDb.execute.mockResolvedValue({ insertId: 'decision-123' });

      // Create multiple decisions concurrently
      const promises = Array(10).fill(null).map(() => 
        decisionService.logDecision(decisionData)
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });
});
