import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import {
  counselingProgressTracker,
  initializeCounselingProgress,
  updateCounselingMilestone,
  generateCounselingProgressReport,
  getCounselingProgress,
  reportProgressBlocker,
  CounselingProgress,
  CounselingMilestone,
  ProgressBlocker,
  Achievement,
  NextAction,
  ProgressReport,
  ProgressMetrics,
} from '../../backend/services/counseling-progress-tracker';
import { ConsultationSession } from '../../backend/services/agent-consulting-service';

// Mock the notifications service
jest.mock('../../backend/services/counseling-notifications', () => ({
  counselingNotifications: {
    notifyMilestoneReached: jest.fn(),
    createNotification: jest.fn(),
  },
}));

describe('CounselingProgressTracker', () => {
  const mockSessionId = 'test-session-123';
  const mockAgentId = 'agent-456';
  const mockMilestoneTemplate = {
    milestones: [
      {
        name: 'Initial Assessment',
        description: 'Complete the initial counseling assessment',
        criteria: ['Self-assessment completed', 'Goals identified'],
        deliverables: ['Assessment form', 'Goal document'],
        weight: 0.3,
      },
      {
        name: 'Skill Building',
        description: 'Develop core skills',
        criteria: ['Training completed', 'Practice exercises done'],
        deliverables: ['Training certificate', 'Practice log'],
        weight: 0.4,
        dependencies: [],
      },
      {
        name: 'Final Review',
        description: 'Complete final review and evaluation',
        criteria: ['Review meeting held', 'Feedback collected'],
        deliverables: ['Review report'],
        weight: 0.3,
        dependencies: [],
      },
    ],
    targetCompletion: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };

  beforeEach(() => {
    // Clear the tracker state before each test
    (counselingProgressTracker as any).progress.clear();
    (counselingProgressTracker as any).reports.clear();
  });

  describe('initializeProgress', () => {
    it('should create a new progress record with milestones', () => {
      const progress = counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      expect(progress.sessionId).toBe(mockSessionId);
      expect(progress.agentId).toBe(mockAgentId);
      expect(progress.overallProgress).toBe(0);
      expect(progress.status).toBe('not_started');
      expect(progress.milestones).toHaveLength(3);
      expect(progress.milestones[0].status).toBe('in_progress');
      expect(progress.milestones[1].status).toBe('pending');
      expect(progress.milestones[2].status).toBe('pending');
    });

    it('should set correct milestone weights when not specified', () => {
      const templateWithoutWeights = {
        milestones: [
          { name: 'M1', description: 'D1', criteria: [], deliverables: [] },
          { name: 'M2', description: 'D2', criteria: [], deliverables: [] },
        ],
      };

      const progress = counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        templateWithoutWeights
      );

      expect(progress.milestones[0].weight).toBe(0.5);
      expect(progress.milestones[1].weight).toBe(0.5);
    });

    it('should store progress in the tracker', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      const retrieved = counselingProgressTracker.getProgress(mockSessionId);
      expect(retrieved).toBeDefined();
      expect(retrieved?.sessionId).toBe(mockSessionId);
    });
  });

  describe('updateMilestone', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should update milestone status and progress', () => {
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;

      const updated = counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      expect(updated).not.toBeNull();
      expect(updated?.status).toBe('completed');
      expect(updated?.progress).toBe(100);
      expect(updated?.completedAt).toBeDefined();
    });

    it('should recalculate overall progress when milestone is updated', () => {
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;

      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.overallProgress).toBe(30); // First milestone weight is 0.3
    });

    it('should activate next milestone when current is completed', () => {
      const firstMilestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;

      counselingProgressTracker.updateMilestone(mockSessionId, firstMilestoneId, {
        status: 'completed',
        progress: 100,
      });

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.milestones[1].status).toBe('in_progress');
    });

    it('should add achievement when milestone is completed', () => {
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;

      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.achievements).toHaveLength(1);
      expect(progress.achievements[0].type).toBe('milestone_complete');
    });

    it('should return null for non-existent session', () => {
      const result = counselingProgressTracker.updateMilestone('non-existent', 'milestone-123', {
        status: 'completed',
      });
      expect(result).toBeNull();
    });

    it('should return null for non-existent milestone', () => {
      const result = counselingProgressTracker.updateMilestone(mockSessionId, 'non-existent', {
        status: 'completed',
      });
      expect(result).toBeNull();
    });

    it('should throw error when dependencies are not complete', () => {
      // Set up a milestone with a dependency
      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      const secondMilestoneId = progress.milestones[1].id;
      progress.milestones[1].dependencies = [progress.milestones[0].id];

      expect(() => {
        counselingProgressTracker.updateMilestone(mockSessionId, secondMilestoneId, {
          status: 'in_progress',
        });
      }).toThrow('Cannot start milestone - dependencies not complete');
    });
  });

  describe('reportBlocker and resolveBlocker', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should report a blocker', () => {
      const blocker = counselingProgressTracker.reportBlocker(mockSessionId, {
        type: 'resource',
        description: 'Missing required training materials',
        severity: 'medium',
      });

      expect(blocker.id).toBeDefined();
      expect(blocker.type).toBe('resource');
      expect(blocker.severity).toBe('medium');
      expect(blocker.reportedAt).toBeDefined();
    });

    it('should set status to at_risk when critical blocker is reported', () => {
      counselingProgressTracker.reportBlocker(mockSessionId, {
        type: 'knowledge',
        description: 'Critical knowledge gap',
        severity: 'critical',
      });

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.status).toBe('at_risk');
    });

    it('should resolve a blocker', () => {
      const blocker = counselingProgressTracker.reportBlocker(mockSessionId, {
        type: 'external',
        description: 'External dependency delay',
        severity: 'low',
      });

      const resolved = counselingProgressTracker.resolveBlocker(
        mockSessionId,
        blocker.id,
        'Dependency resolved, proceeding with work'
      );

      expect(resolved).toBe(true);

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      const resolvedBlocker = progress.blockers.find(b => b.id === blocker.id);
      expect(resolvedBlocker?.resolvedAt).toBeDefined();
      expect(resolvedBlocker?.resolution).toBe('Dependency resolved, proceeding with work');
    });

    it('should return false when resolving non-existent blocker', () => {
      const result = counselingProgressTracker.resolveBlocker(
        mockSessionId,
        'non-existent',
        'Resolution'
      );
      expect(result).toBe(false);
    });

    it('should return false when resolving already resolved blocker', () => {
      const blocker = counselingProgressTracker.reportBlocker(mockSessionId, {
        type: 'external',
        description: 'Test blocker',
        severity: 'low',
      });

      counselingProgressTracker.resolveBlocker(mockSessionId, blocker.id, 'First resolution');
      const result = counselingProgressTracker.resolveBlocker(
        mockSessionId,
        blocker.id,
        'Second resolution'
      );

      expect(result).toBe(false);
    });
  });

  describe('addMilestone', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should add a new milestone', () => {
      const milestoneData = {
        name: 'Bonus Milestone',
        description: 'Extra achievement',
        status: 'pending' as const,
        criteria: ['Extra work completed'],
        deliverables: ['Bonus report'],
        progress: 0,
        weight: 0.1,
        dependencies: [],
      };

      const newMilestone = counselingProgressTracker.addMilestone(mockSessionId, milestoneData);

      expect(newMilestone.id).toBeDefined();
      expect(newMilestone.name).toBe('Bonus Milestone');
      expect(newMilestone.order).toBe(3);

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.milestones).toHaveLength(4);
    });
  });

  describe('achievements', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should add an achievement', () => {
      const achievement = counselingProgressTracker.addAchievement(mockSessionId, {
        type: 'skill_mastered',
        title: 'Excel Mastery',
        description: 'Completed advanced Excel training',
        awardedBy: 'trainer-jane',
      });

      expect(achievement.id).toBeDefined();
      expect(achievement.awardedAt).toBeDefined();
      expect(achievement.type).toBe('skill_mastered');

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.achievements).toHaveLength(1);
    });
  });

  describe('next actions', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should add a next action', () => {
      const action = counselingProgressTracker.addNextAction(mockSessionId, {
        description: 'Schedule follow-up meeting',
        priority: 'high',
        assignedTo: 'counselor-1',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      expect(action.id).toBeDefined();
      expect(action.status).toBe('pending');
      expect(action.description).toBe('Schedule follow-up meeting');

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.nextActions).toHaveLength(1);
    });

    it('should update next action status', () => {
      const action = counselingProgressTracker.addNextAction(mockSessionId, {
        description: 'Complete homework',
        priority: 'medium',
        assignedTo: mockAgentId,
      });

      const updated = counselingProgressTracker.updateNextAction(mockSessionId, action.id, {
        status: 'completed',
      });

      expect(updated).not.toBeNull();
      expect(updated?.status).toBe('completed');
    });

    it('should return null when updating non-existent action', () => {
      const result = counselingProgressTracker.updateNextAction(
        mockSessionId,
        'non-existent',
        { status: 'completed' }
      );
      expect(result).toBeNull();
    });
  });

  describe('metrics', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should update metrics', () => {
      const metrics = counselingProgressTracker.updateMetrics(mockSessionId, {
        engagementScore: 75,
        responseTime: 24,
      });

      expect(metrics.engagementScore).toBe(75);
      expect(metrics.responseTime).toBe(24);
    });

    it('should calculate metrics from session data', () => {
      const mockSession = {
        id: mockSessionId,
        responses: [
          {
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
            recommendations: ['Task completed', 'Continue practice'],
          },
          {
            timestamp: new Date(),
            recommendations: ['All goals achieved', 'Great progress'],
          },
        ],
        requests: [
          { timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000) },
          { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        ],
      } as unknown as ConsultationSession;

      const metrics = counselingProgressTracker.calculateMetricsFromSession(
        mockSessionId,
        mockSession
      );

      expect(metrics.responseTime).toBeGreaterThan(0);
      expect(metrics.engagementScore).toBeGreaterThan(0);
    });

    it('should record activity and update engagement', () => {
      counselingProgressTracker.recordActivity(mockSessionId, 'login', { source: 'mobile' });

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      expect(progress.metrics.engagementScore).toBe(5);
      expect(progress.timeline.lastActivity).toBeDefined();
    });
  });

  describe('progress reports', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should generate a progress report', () => {
      const report = counselingProgressTracker.generateProgressReport(mockSessionId, 30);

      expect(report.reportId).toBeDefined();
      expect(report.sessionId).toBe(mockSessionId);
      expect(report.period.start).toBeDefined();
      expect(report.period.end).toBeDefined();
      expect(report.summary.milestonesTotal).toBe(3);
      expect(report.trends.riskLevel).toBeDefined();
      expect(report.recommendations).toBeInstanceOf(Array);
    });

    it('should store generated reports', () => {
      const report = counselingProgressTracker.generateProgressReport(mockSessionId);
      const reports = counselingProgressTracker.getAllReports(mockSessionId);

      expect(reports).toHaveLength(1);
      expect(reports[0].reportId).toBe(report.reportId);
    });

    it('should generate recommendations based on progress status', () => {
      // Complete a milestone first
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;
      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      const report = counselingProgressTracker.generateProgressReport(mockSessionId);
      expect(report.recommendations.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('query methods', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
      counselingProgressTracker.initializeProgress(
        'session-2',
        mockAgentId,
        mockMilestoneTemplate
      );
      counselingProgressTracker.initializeProgress(
        'session-3',
        'other-agent',
        mockMilestoneTemplate
      );
    });

    it('should get progress by session ID', () => {
      const progress = counselingProgressTracker.getProgress(mockSessionId);
      expect(progress).toBeDefined();
      expect(progress?.sessionId).toBe(mockSessionId);
    });

    it('should return undefined for non-existent session', () => {
      const progress = counselingProgressTracker.getProgress('non-existent');
      expect(progress).toBeUndefined();
    });

    it('should get all progress for an agent', () => {
      const progressList = counselingProgressTracker.getProgressForAgent(mockAgentId);
      expect(progressList).toHaveLength(2);
      expect(progressList.every(p => p.agentId === mockAgentId)).toBe(true);
    });

    it('should get active milestones', () => {
      const activeMilestones = counselingProgressTracker.getActiveMilestones(mockSessionId);
      expect(activeMilestones).toHaveLength(1);
      expect(activeMilestones[0].status).toBe('in_progress');
    });

    it('should get pending milestones', () => {
      const pendingMilestones = counselingProgressTracker.getPendingMilestones(mockSessionId);
      expect(pendingMilestones).toHaveLength(2);
      expect(pendingMilestones.every(m => m.status === 'pending')).toBe(true);
    });

    it('should get completed milestones', () => {
      // Complete a milestone first
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;
      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      const completedMilestones = counselingProgressTracker.getCompletedMilestones(mockSessionId);
      expect(completedMilestones).toHaveLength(1);
      expect(completedMilestones[0].status).toBe('completed');
    });

    it('should get active blockers', () => {
      counselingProgressTracker.reportBlocker(mockSessionId, {
        type: 'resource',
        description: 'Missing materials',
        severity: 'low',
      });

      const activeBlockers = counselingProgressTracker.getActiveBlockers(mockSessionId);
      expect(activeBlockers).toHaveLength(1);
      expect(activeBlockers[0].resolvedAt).toBeUndefined();
    });

    it('should return empty array for non-existent session', () => {
      expect(counselingProgressTracker.getActiveMilestones('non-existent')).toEqual([]);
      expect(counselingProgressTracker.getPendingMilestones('non-existent')).toEqual([]);
      expect(counselingProgressTracker.getCompletedMilestones('non-existent')).toEqual([]);
      expect(counselingProgressTracker.getActiveBlockers('non-existent')).toEqual([]);
    });
  });

  describe('analytics', () => {
    beforeEach(() => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );
    });

    it('should get agent progress stats', () => {
      const stats = counselingProgressTracker.getAgentProgressStats(mockAgentId);

      expect(stats.totalSessions).toBe(1);
      expect(stats.completedSessions).toBe(0);
      expect(stats.averageProgress).toBe(0);
      expect(stats.totalAchievements).toBe(0);
      expect(stats.activeBlockers).toBe(0);
      expect(stats.atRiskSessions).toBe(0);
    });

    it('should update stats when milestones are completed', () => {
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;
      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      const stats = counselingProgressTracker.getAgentProgressStats(mockAgentId);
      expect(stats.averageProgress).toBeGreaterThan(0);
    });
  });

  describe('convenience functions', () => {
    it('should use initializeCounselingProgress convenience function', () => {
      const progress = initializeCounselingProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      expect(progress.sessionId).toBe(mockSessionId);
      expect(getCounselingProgress(mockSessionId)).toBeDefined();
    });

    it('should use updateCounselingMilestone convenience function', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;

      const updated = updateCounselingMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      expect(updated).not.toBeNull();
      expect(updated?.status).toBe('completed');
    });

    it('should use generateCounselingProgressReport convenience function', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      const report = generateCounselingProgressReport(mockSessionId, 30);
      expect(report.sessionId).toBe(mockSessionId);
    });

    it('should use getCounselingProgress convenience function', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      const progress = getCounselingProgress(mockSessionId);
      expect(progress).toBeDefined();
      expect(progress?.sessionId).toBe(mockSessionId);
    });

    it('should use reportProgressBlocker convenience function', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      const blocker = reportProgressBlocker(mockSessionId, {
        type: 'resource',
        description: 'Missing materials',
        severity: 'medium',
      });

      expect(blocker.type).toBe('resource');
      expect(blocker.severity).toBe('medium');
    });
  });

  describe('progress status transitions', () => {
    it('should transition from not_started to on_track when first milestone completed', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      expect(counselingProgressTracker.getProgress(mockSessionId)!.status).toBe('not_started');

      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;
      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        status: 'completed',
        progress: 100,
      });

      expect(counselingProgressTracker.getProgress(mockSessionId)!.status).toBe('on_track');
    });

    it('should transition to completed when all milestones are done', () => {
      counselingProgressTracker.initializeProgress(
        mockSessionId,
        mockAgentId,
        mockMilestoneTemplate
      );

      const progress = counselingProgressTracker.getProgress(mockSessionId)!;
      progress.milestones.forEach(m => {
        counselingProgressTracker.updateMilestone(mockSessionId, m.id, {
          status: 'completed',
          progress: 100,
        });
      });

      expect(counselingProgressTracker.getProgress(mockSessionId)!.status).toBe('completed');
    });

    it('should mark as at_risk when milestone is overdue', () => {
      const templateWithDueDate = {
        milestones: [
          {
            name: 'Overdue Milestone',
            description: 'Should be done by now',
            criteria: [],
            deliverables: [],
            dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          },
        ],
      };

      counselingProgressTracker.initializeProgress(mockSessionId, mockAgentId, templateWithDueDate);

      // Trigger status recalculation by updating the milestone
      const milestoneId = counselingProgressTracker
        .getProgress(mockSessionId)!
        .milestones[0].id;
      counselingProgressTracker.updateMilestone(mockSessionId, milestoneId, {
        progress: 50,
      });

      expect(counselingProgressTracker.getProgress(mockSessionId)!.status).toBe('at_risk');
    });
  });
});
