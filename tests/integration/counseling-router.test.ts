import { jest, describe, beforeEach, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTRPCMsw } from 'trpc-msw';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import type { AppRouter } from '../../../backend/hono';
import { randomUUID } from 'crypto';

// Mock services
jest.mock('../../../backend/services/counseling-templates', () => ({
  counselingTemplates: {
    createTemplate: jest.fn(),
    getTemplate: jest.fn(),
    getAllTemplates: jest.fn(),
    getRecommendedTemplates: jest.fn(),
    updateTemplate: jest.fn(),
    deleteTemplate: jest.fn(),
    recordTemplateUsage: jest.fn(),
    rateTemplate: jest.fn(),
    duplicateTemplate: jest.fn(),
    getTemplatesByMode: jest.fn(),
  },
}));

jest.mock('../../../backend/services/counseling-notifications', () => ({
  counselingNotifications: {
    createNotification: jest.fn(),
    getNotifications: jest.fn(),
    markAsRead: jest.fn(),
    deleteNotification: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    getPreferences: jest.fn(),
    updatePreferences: jest.fn(),
    createAlert: jest.fn(),
    getAlerts: jest.fn(),
    acknowledgeAlert: jest.fn(),
    resolveAlert: jest.fn(),
    notifySessionCreated: jest.fn(),
    notifyResponseReceived: jest.fn(),
    notifySessionCompleted: jest.fn(),
    notifySessionEscalated: jest.fn(),
  },
}));

jest.mock('../../../backend/services/bulk-counseling-service', () => ({
  bulkCounselingService: {
    createBulkOperation: jest.fn(),
    executeBulkOperation: jest.fn(),
    getOperation: jest.fn(),
    getOperationsForMainAgent: jest.fn(),
    updateOperationResults: jest.fn(),
    quickPerformanceReview: jest.fn(),
    quickDevelopmentPlanning: jest.fn(),
    quickTeamCoordination: jest.fn(),
    quickCrisisManagement: jest.fn(),
  },
}));

jest.mock('../../../backend/services/counseling-progress-tracker', () => ({
  counselingProgressTracker: {
    createProgressTracker: jest.fn(),
    getProgressTracker: jest.fn(),
    updateProgress: jest.fn(),
    addMilestone: jest.fn(),
    addBlocker: jest.fn(),
    addAchievement: jest.fn(),
    generateProgressReport: jest.fn(),
    getProgressHistory: jest.fn(),
  },
}));

jest.mock('../../../backend/services/session-search-service', () => ({
  sessionSearchService: {
    searchSessions: jest.fn(),
    indexSession: jest.fn(),
    removeSession: jest.fn(),
    getSearchFacets: jest.fn(),
    saveSearch: jest.fn(),
    getSavedSearches: jest.fn(),
    deleteSavedSearch: jest.fn(),
    getQuickFilters: jest.fn(),
    fullTextSearch: jest.fn(),
  },
}));

jest.mock('../../../backend/services/session-export-service', () => ({
  sessionExportService: {
    exportSessions: jest.fn(),
    generateReport: jest.fn(),
    getExportHistory: jest.fn(),
    getExportPreferences: jest.fn(),
    updateExportPreferences: jest.fn(),
    getSupportedFormats: jest.fn(),
    validateExportRequest: jest.fn(),
  },
}));

jest.mock('../../../backend/services/counseling-scheduler', () => ({
  counselingScheduler: {
    scheduleSession: jest.fn(),
    cancelSession: jest.fn(),
    rescheduleSession: jest.fn(),
    getUpcomingSessions: jest.fn(),
    getAvailability: jest.fn(),
    setAvailability: jest.fn(),
    getScheduleConflicts: jest.fn(),
    optimizeSchedule: jest.fn(),
  },
}));

jest.mock('../../../backend/services/unified-audit-service', () => ({
  logAudit: jest.fn(),
}));

// Mock context
const mockUser = {
  id: randomUUID(),
  organizationId: randomUUID(),
  email: 'test@example.com',
  role: 'main_agent',
};

const mockCtx = {
  user: mockUser,
  req: {
    headers: {},
  },
};

// MSW server setup
const server = setupServer(
  rest.get('/api/health', (req, res, ctx) => {
    return res(ctx.json({ status: 'ok' }));
  }),
);

// tRPC MSW setup
const trpcMsw = createTRPCMsw<AppRouter>({
  baseUrl: 'http://localhost:3000/trpc',
});

describe('Counseling tRPC Router Integration Tests', () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Counseling Templates', () => {
    it('should create a counseling template', async () => {
      const { counselingTemplates } = require('../../../backend/services/counseling-templates');
      const mockTemplate = {
        id: randomUUID(),
        name: 'Test Template',
        category: 'performance',
        counselingMode: 'main_to_sub',
        programType: 'performance_improvement',
        severity: 'medium',
        duration: 'single_session',
        agenda: {
          primaryObjectives: ['Test objective'],
          expectedOutcomes: ['Test outcome'],
          successMetrics: ['Test metric'],
          discussionPoints: ['Test point'],
        },
        context: {
          requiredSkills: ['Test skill'],
          recommendedResources: ['Test resource'],
          suggestedTools: ['Test tool'],
          bestPractices: ['Test practice'],
        },
        workflow: {
          steps: [{
            order: 1,
            title: 'Test Step',
            description: 'Test description',
            duration: 30,
            type: 'assessment',
          }],
        },
        metadata: {
          createdBy: mockUser.id,
          organizationId: mockUser.organizationId,
          isSystemTemplate: false,
          isPublic: false,
          usageCount: 0,
          averageRating: 0,
          tags: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      counselingTemplates.createTemplate.mockResolvedValue(mockTemplate);

      const result = await trpcMsw.counseling.createCounselingTemplate.mutate({
        name: 'Test Template',
        description: 'Test Description',
        category: 'performance',
        counselingMode: 'main_to_sub',
        programType: 'performance_improvement',
        severity: 'medium',
        duration: 'single_session',
        agenda: {
          primaryObjectives: ['Test objective'],
          expectedOutcomes: ['Test outcome'],
          successMetrics: ['Test metric'],
          discussionPoints: ['Test point'],
        },
        context: {
          requiredSkills: ['Test skill'],
          recommendedResources: ['Test resource'],
          suggestedTools: ['Test tool'],
          bestPractices: ['Test practice'],
        },
        workflow: {
          steps: [{
            order: 1,
            title: 'Test Step',
            description: 'Test description',
            duration: 30,
            type: 'assessment',
          }],
        },
        isPublic: false,
        tags: [],
      });

      expect(result).toEqual(mockTemplate);
      expect(counselingTemplates.createTemplate).toHaveBeenCalledWith({
        name: 'Test Template',
        description: 'Test Description',
        category: 'performance',
        counselingMode: 'main_to_sub',
        programType: 'performance_improvement',
        severity: 'medium',
        duration: 'single_session',
        agenda: {
          primaryObjectives: ['Test objective'],
          expectedOutcomes: ['Test outcome'],
          successMetrics: ['Test metric'],
          discussionPoints: ['Test point'],
        },
        context: {
          requiredSkills: ['Test skill'],
          recommendedResources: ['Test resource'],
          suggestedTools: ['Test tool'],
          bestPractices: ['Test practice'],
        },
        workflow: {
          steps: [{
            order: 1,
            title: 'Test Step',
            description: 'Test description',
            duration: 30,
            type: 'assessment',
          }],
        },
        isPublic: false,
        tags: [],
        createdBy: mockUser.id,
        organizationId: mockUser.organizationId,
      });
    });

    it('should get counseling templates', async () => {
      const { counselingTemplates } = require('../../../backend/services/counseling-templates');
      const mockTemplates = [
        {
          id: randomUUID(),
          name: 'Template 1',
          category: 'performance',
          metadata: { isSystemTemplate: true },
        },
        {
          id: randomUUID(),
          name: 'Template 2',
          category: 'development',
          metadata: { isSystemTemplate: false },
        },
      ];

      counselingTemplates.getAllTemplates.mockResolvedValue(mockTemplates);

      const result = await trpcMsw.counseling.getCounselingTemplates.query({
        category: 'performance',
        isSystem: true,
      });

      expect(result).toEqual(mockTemplates);
      expect(counselingTemplates.getAllTemplates).toHaveBeenCalledWith({
        organizationId: mockUser.organizationId,
        category: 'performance',
        isSystem: true,
      });
    });

    it('should get recommended counseling templates', async () => {
      const { counselingTemplates } = require('../../../backend/services/counseling-templates');
      const mockRecommendations = [
        {
          id: randomUUID(),
          name: 'Recommended Template',
          category: 'performance',
          counselingMode: 'main_to_sub',
        },
      ];

      counselingTemplates.getRecommendedTemplates.mockResolvedValue(mockRecommendations);

      const result = await trpcMsw.counseling.getRecommendedCounselingTemplates.query({
        agentType: 'main_agent',
        context: {
          recentIssues: ['performance'],
          skillGaps: ['communication'],
          performanceTrend: 'declining',
        },
      });

      expect(result).toEqual(mockRecommendations);
      expect(counselingTemplates.getRecommendedTemplates).toHaveBeenCalledWith(
        mockUser.id,
        'main_agent',
        {
          recentIssues: ['performance'],
          skillGaps: ['communication'],
          performanceTrend: 'declining',
        }
      );
    });
  });

  describe('Counseling Notifications', () => {
    it('should create a notification', async () => {
      const { counselingNotifications } = require('../../../backend/services/counseling-notifications');
      const mockNotification = {
        id: randomUUID(),
        agentId: mockUser.id,
        type: 'session_reminder',
        title: 'Test Notification',
        message: 'Test message',
        priority: 'medium',
        isRead: false,
        createdAt: new Date(),
      };

      counselingNotifications.createNotification.mockResolvedValue(mockNotification);

      const result = await trpcMsw.counseling.createNotification.mutate({
        type: 'session_reminder',
        title: 'Test Notification',
        message: 'Test message',
        priority: 'medium',
      });

      expect(result).toEqual(mockNotification);
      expect(counselingNotifications.createNotification).toHaveBeenCalledWith({
        agentId: mockUser.id,
        type: 'session_reminder',
        title: 'Test Notification',
        message: 'Test message',
        priority: 'medium',
      });
    });

    it('should get notifications', async () => {
      const { counselingNotifications } = require('../../../backend/services/counseling-notifications');
      const mockNotifications = [
        {
          id: randomUUID(),
          agentId: mockUser.id,
          type: 'session_reminder',
          isRead: false,
        },
        {
          id: randomUUID(),
          agentId: mockUser.id,
          type: 'session_completed',
          isRead: true,
        },
      ];

      counselingNotifications.getNotifications.mockResolvedValue(mockNotifications);

      const result = await trpcMsw.counseling.getNotifications.query({
        unreadOnly: true,
        limit: 10,
      });

      expect(result).toEqual(mockNotifications);
      expect(counselingNotifications.getNotifications).toHaveBeenCalledWith(
        mockUser.id,
        {
          unreadOnly: true,
          limit: 10,
        }
      );
    });
  });

  describe('Bulk Counseling Operations', () => {
    it('should create a bulk operation', async () => {
      const { bulkCounselingService } = require('../../../backend/services/bulk-counseling-service');
      const mockOperation = {
        id: randomUUID(),
        type: 'performance_review',
        mainAgentId: mockUser.id,
        status: 'draft',
        targets: {
          subagentIds: [randomUUID(), randomUUID()],
        },
        results: {
          totalTargeted: 2,
          sessionsCreated: 0,
          completed: 0,
          failed: 0,
        },
        createdAt: new Date(),
      };

      bulkCounselingService.createBulkOperation.mockResolvedValue(mockOperation);

      const result = await trpcMsw.counseling.createBulkOperation.mutate({
        type: 'performance_review',
        targets: {
          subagentIds: [randomUUID(), randomUUID()],
        },
        template: {
          templateId: randomUUID(),
        },
        scheduling: {
          startDate: new Date(),
          spreadOverDays: 1,
          priority: 'medium',
        },
      });

      expect(result).toEqual(mockOperation);
      expect(bulkCounselingService.createBulkOperation).toHaveBeenCalledWith({
        type: 'performance_review',
        targets: {
          subagentIds: expect.any(Array),
        },
        template: {
          templateId: expect.any(String),
        },
        scheduling: {
          startDate: expect.any(Date),
          spreadOverDays: 1,
          priority: 'medium',
        },
        mainAgentId: mockUser.id,
      });
    });

    it('should execute a bulk operation', async () => {
      const { bulkCounselingService } = require('../../../backend/services/bulk-counseling-service');
      const mockExecutionResult = {
        operationId: randomUUID(),
        success: true,
        results: {
          sessionsCreated: 2,
          completed: 2,
          failed: 0,
        },
        executionTime: 15000,
      };

      bulkCounselingService.executeBulkOperation.mockResolvedValue(mockExecutionResult);

      const result = await trpcMsw.counseling.executeBulkOperation.mutate({
        operationId: randomUUID(),
      });

      expect(result).toEqual(mockExecutionResult);
      expect(bulkCounselingService.executeBulkOperation).toHaveBeenCalledWith(
        expect.any(String)
      );
    });
  });

  describe('Progress Tracking', () => {
    it('should create a progress tracker', async () => {
      const { counselingProgressTracker } = require('../../../backend/services/counseling-progress-tracker');
      const mockTracker = {
        id: randomUUID(),
        sessionId: randomUUID(),
        agentId: mockUser.id,
        milestones: [],
        blockers: [],
        achievements: [],
        nextActions: [],
        progressPercentage: 0,
        createdAt: new Date(),
      };

      counselingProgressTracker.createProgressTracker.mockResolvedValue(mockTracker);

      const result = await trpcMsw.counseling.createProgressTracker.mutate({
        sessionId: randomUUID(),
        initialMilestones: [
          {
            title: 'Initial Assessment',
            description: 'Complete initial assessment',
            dueDate: new Date(),
          },
        ],
      });

      expect(result).toEqual(mockTracker);
      expect(counselingProgressTracker.createProgressTracker).toHaveBeenCalledWith({
        sessionId: expect.any(String),
        agentId: mockUser.id,
        initialMilestones: expect.any(Array),
      });
    });

    it('should update progress', async () => {
      const { counselingProgressTracker } = require('../../../backend/services/counseling-progress-tracker');
      const mockUpdate = {
        progressPercentage: 50,
        milestoneUpdates: [
          {
            milestoneId: randomUUID(),
            status: 'completed',
            completedAt: new Date(),
          },
        ],
      };

      counselingProgressTracker.updateProgress.mockResolvedValue(mockUpdate);

      const result = await trpcMsw.counseling.updateProgress.mutate({
        trackerId: randomUUID(),
        progressPercentage: 50,
        milestoneUpdates: [
          {
            milestoneId: randomUUID(),
            status: 'completed',
            completedAt: new Date(),
          },
        ],
      });

      expect(result).toEqual(mockUpdate);
      expect(counselingProgressTracker.updateProgress).toHaveBeenCalledWith(
        expect.any(String),
        {
          progressPercentage: 50,
          milestoneUpdates: expect.any(Array),
        }
      );
    });
  });

  describe('Session Search', () => {
    it('should search sessions', async () => {
      const { sessionSearchService } = require('../../../backend/services/session-search-service');
      const mockSearchResults = {
        sessions: [
          {
            id: randomUUID(),
            status: 'completed',
            initiator: { agentId: mockUser.id },
            participants: [],
            createdAt: new Date(),
          },
        ],
        total: 1,
        facets: {
          status: { completed: 1 },
          counselingMode: { main_to_sub: 1 },
        },
        pagination: {
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      };

      sessionSearchService.searchSessions.mockResolvedValue(mockSearchResults);

      const result = await trpcMsw.counseling.searchSessions.query({
        query: 'test',
        filters: {
          status: ['completed'],
          dateRange: {
            start: new Date('2024-01-01'),
            end: new Date('2024-12-31'),
          },
        },
        pagination: {
          page: 1,
          limit: 10,
        },
      });

      expect(result).toEqual(mockSearchResults);
      expect(sessionSearchService.searchSessions).toHaveBeenCalledWith({
        query: 'test',
        filters: {
          status: ['completed'],
          dateRange: {
            start: expect.any(Date),
            end: expect.any(Date),
          },
        },
        pagination: {
          page: 1,
          limit: 10,
        },
      });
    });

    it('should get search facets', async () => {
      const { sessionSearchService } = require('../../../backend/services/session-search-service');
      const mockFacets = {
        status: { completed: 5, in_progress: 3, pending: 2 },
        counselingMode: { main_to_sub: 6, peer_to_peer: 4 },
        category: { performance: 4, development: 3, crisis: 3 },
      };

      sessionSearchService.getSearchFacets.mockResolvedValue(mockFacets);

      const result = await trpcMsw.counseling.getSearchFacets.query();

      expect(result).toEqual(mockFacets);
      expect(sessionSearchService.getSearchFacets).toHaveBeenCalled();
    });
  });

  describe('Session Export', () => {
    it('should export sessions', async () => {
      const { sessionExportService } = require('../../../backend/services/session-export-service');
      const mockExport = {
        id: randomUUID(),
        format: 'json',
        status: 'completed',
        downloadUrl: 'https://example.com/export/session-export.json',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };

      sessionExportService.exportSessions.mockResolvedValue(mockExport);

      const result = await trpcMsw.counseling.exportSessions.mutate({
        format: 'json',
        filters: {
          dateRange: {
            start: new Date('2024-01-01'),
            end: new Date('2024-12-31'),
          },
          status: ['completed'],
        },
        options: {
          includeParticipants: true,
          includeResponses: true,
          anonymizeData: false,
        },
      });

      expect(result).toEqual(mockExport);
      expect(sessionExportService.exportSessions).toHaveBeenCalledWith({
        format: 'json',
        filters: {
          dateRange: {
            start: expect.any(Date),
            end: expect.any(Date),
          },
          status: ['completed'],
        },
        options: {
          includeParticipants: true,
          includeResponses: true,
          anonymizeData: false,
        },
      });
    });

    it('should generate a report', async () => {
      const { sessionExportService } = require('../../../backend/services/session-export-service');
      const mockReport = {
        id: randomUUID(),
        type: 'comprehensive',
        format: 'pdf',
        status: 'completed',
        downloadUrl: 'https://example.com/reports/comprehensive-report.pdf',
        metadata: {
          totalSessions: 50,
          dateRange: {
            start: new Date('2024-01-01'),
            end: new Date('2024-12-31'),
          },
          generatedAt: new Date(),
        },
        createdAt: new Date(),
      };

      sessionExportService.generateReport.mockResolvedValue(mockReport);

      const result = await trpcMsw.counseling.generateReport.mutate({
        type: 'comprehensive',
        format: 'pdf',
        filters: {
          dateRange: {
            start: new Date('2024-01-01'),
            end: new Date('2024-12-31'),
          },
        },
        options: {
          includeCharts: true,
          includeAnalytics: true,
        },
      });

      expect(result).toEqual(mockReport);
      expect(sessionExportService.generateReport).toHaveBeenCalledWith({
        type: 'comprehensive',
        format: 'pdf',
        filters: {
          dateRange: {
            start: expect.any(Date),
            end: expect.any(Date),
          },
        },
        options: {
          includeCharts: true,
          includeAnalytics: true,
        },
      });
    });
  });

  describe('Scheduling', () => {
    it('should schedule a session', async () => {
      const { counselingScheduler } = require('../../../backend/services/counseling-scheduler');
      const mockSession = {
        id: randomUUID(),
        initiator: { agentId: mockUser.id },
        participants: [{ agentId: randomUUID() }],
        scheduledTime: new Date(),
        status: 'scheduled',
        createdAt: new Date(),
      };

      counselingScheduler.scheduleSession.mockResolvedValue(mockSession);

      const result = await trpcMsw.counseling.scheduleSession.mutate({
        participantId: randomUUID(),
        templateId: randomUUID(),
        scheduledTime: new Date(),
        duration: 60,
        notes: 'Test session',
      });

      expect(result).toEqual(mockSession);
      expect(counselingScheduler.scheduleSession).toHaveBeenCalledWith({
        initiatorId: mockUser.id,
        participantId: expect.any(String),
        templateId: expect.any(String),
        scheduledTime: expect.any(Date),
        duration: 60,
        notes: 'Test session',
      });
    });

    it('should get upcoming sessions', async () => {
      const { counselingScheduler } = require('../../../backend/services/counseling-scheduler');
      const mockSessions = [
        {
          id: randomUUID(),
          initiator: { agentId: mockUser.id },
          scheduledTime: new Date(Date.now() + 60 * 60 * 1000),
          status: 'scheduled',
        },
        {
          id: randomUUID(),
          initiator: { agentId: mockUser.id },
          scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
          status: 'scheduled',
        },
      ];

      counselingScheduler.getUpcomingSessions.mockResolvedValue(mockSessions);

      const result = await trpcMsw.counseling.getUpcomingSessions.query({
        days: 7,
        limit: 10,
      });

      expect(result).toEqual(mockSessions);
      expect(counselingScheduler.getUpcomingSessions).toHaveBeenCalledWith(
        mockUser.id,
        {
          days: 7,
          limit: 10,
        }
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle template creation errors', async () => {
      const { counselingTemplates } = require('../../../backend/services/counseling-templates');
      counselingTemplates.createTemplate.mockRejectedValue(new Error('Invalid template data'));

      await expect(
        trpcMsw.counseling.createCounselingTemplate.mutate({
          name: '',
          description: 'Test',
          category: 'performance',
          counselingMode: 'main_to_sub',
          programType: 'performance_improvement',
          severity: 'medium',
          duration: 'single_session',
          agenda: {
            primaryObjectives: [],
            expectedOutcomes: [],
            successMetrics: [],
            discussionPoints: [],
          },
          context: {
            requiredSkills: [],
            recommendedResources: [],
            suggestedTools: [],
            bestPractices: [],
          },
          workflow: {
            steps: [],
          },
        })
      ).rejects.toThrow('Invalid template data');
    });

    it('should handle search errors gracefully', async () => {
      const { sessionSearchService } = require('../../../backend/services/session-search-service');
      sessionSearchService.searchSessions.mockRejectedValue(new Error('Search service unavailable'));

      await expect(
        trpcMsw.counseling.searchSessions.query({
          query: 'test',
          filters: {},
          pagination: { page: 1, limit: 10 },
        })
      ).rejects.toThrow('Search service unavailable');
    });
  });

  describe('Authentication & Authorization', () => {
    it('should require authentication for protected procedures', async () => {
      // Test that unauthenticated requests are rejected
      await expect(
        trpcMsw.counseling.getCounselingTemplates.query({})
      ).rejects.toThrow();
    });

    it('should include user context in service calls', async () => {
      const { counselingTemplates } = require('../../../backend/services/counseling-templates');
      const mockTemplate = {
        id: randomUUID(),
        name: 'Test Template',
        metadata: {
          createdBy: mockUser.id,
          organizationId: mockUser.organizationId,
        },
      };

      counselingTemplates.getAllTemplates.mockResolvedValue([mockTemplate]);

      await trpcMsw.counseling.getCounselingTemplates.query({});

      expect(counselingTemplates.getAllTemplates).toHaveBeenCalledWith({
        organizationId: mockUser.organizationId,
      });
    });
  });
});
