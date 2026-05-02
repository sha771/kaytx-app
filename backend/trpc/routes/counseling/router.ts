import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../../create-context';
import { agentConsultingService } from '../../../services/agent-consulting-service';
import { counselingTemplates } from '../../../services/counseling-templates';
import { counselingNotifications } from '../../../services/counseling-notifications';
import { bulkCounselingService } from '../../../services/bulk-counseling-service';
import { counselingProgressTracker } from '../../../services/counseling-progress-tracker';
import { sessionSearchService } from '../../../services/session-search-service';
import { sessionExportService } from '../../../services/session-export-service';
import { counselingScheduler } from '../../../services/counseling-scheduler';
import { logAudit } from '../../../lib/audit';

// ============================================
// COUNSELING TEMPLATES PROCEDURES
// ============================================

const createCounselingTemplateProcedure = protectedProcedure
  .input(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    category: z.enum(['performance', 'development', 'crisis', 'coordination', 'mentorship', 'escalation', 'peer_support']),
    counselingMode: z.enum(['main_to_sub', 'sub_to_main', 'peer_to_peer', 'cross_functional']),
    programType: z.enum(['performance_improvement', 'skill_development', 'crisis_intervention', 'career_guidance', 'coordination_alignment', 'conflict_resolution']),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    duration: z.enum(['single_session', 'short_term', 'ongoing', 'emergency']),
    agenda: z.object({
      primaryObjectives: z.array(z.string()),
      expectedOutcomes: z.array(z.string()),
      successMetrics: z.array(z.string()),
      discussionPoints: z.array(z.string()),
    }),
    context: z.object({
      requiredSkills: z.array(z.string()),
      recommendedResources: z.array(z.string()),
      suggestedTools: z.array(z.string()),
      bestPractices: z.array(z.string()),
    }),
    workflow: z.object({
      steps: z.array(z.object({
        order: z.number(),
        title: z.string(),
        description: z.string(),
        duration: z.number(),
        type: z.enum(['assessment', 'discussion', 'planning', 'action', 'review']),
        questions: z.array(z.string()).optional(),
        deliverables: z.array(z.string()).optional(),
      })),
    }),
    isPublic: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }))
  .mutation(async ({ input, ctx }) => {
    const template = counselingTemplates.createTemplate({
      ...input,
      createdBy: ctx.user.id,
      organizationId: ctx.user.organizationId,
    });

    await logAudit({
      userId: ctx.user.id,
      organizationId: ctx.user.organizationId,
      action: 'counseling_template_created',
      resource: 'counseling_template',
      resourceId: template.id,
      status: 'success',
      details: {
        templateName: template.name,
        category: template.category,
      },
    });

    return template;
  });

const getCounselingTemplatesProcedure = protectedProcedure
  .input(z.object({
    category: z.enum(['performance', 'development', 'crisis', 'coordination', 'mentorship', 'escalation', 'peer_support']).optional(),
    counselingMode: z.enum(['main_to_sub', 'sub_to_main', 'peer_to_peer', 'cross_functional']).optional(),
    tags: z.array(z.string()).optional(),
    isSystem: z.boolean().optional(),
  }))
  .query(async ({ input, ctx }) => {
    return counselingTemplates.getAllTemplates({
      organizationId: ctx.user.organizationId,
      ...input,
    });
  });

const getRecommendedCounselingTemplatesProcedure = protectedProcedure
  .input(z.object({
    agentType: z.enum(['main_agent', 'subagent']),
    context: z.object({
      recentIssues: z.array(z.string()).optional(),
      skillGaps: z.array(z.string()).optional(),
      performanceTrend: z.enum(['improving', 'declining', 'stable']).optional(),
    }).optional(),
  }))
  .query(async ({ input, ctx }) => {
    return counselingTemplates.getRecommendedTemplates(
      ctx.user.id,
      input.agentType,
      input.context
    );
  });

// ============================================
// COUNSELING NOTIFICATIONS PROCEDURES
// ============================================

const getNotificationsProcedure = protectedProcedure
  .input(z.object({
    unreadOnly: z.boolean().default(false),
    type: z.enum(['session_created', 'session_reminder', 'session_starting', 'response_received', 'session_completed', 'session_escalated', 'session_cancelled', 'session_rescheduled', 'milestone_reached', 'deadline_approaching', 'counseling_needed', 'achievement_unlocked']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    limit: z.number().default(50),
  }))
  .query(async ({ input, ctx }) => {
    return counselingNotifications.getNotifications(ctx.user.id, input);
  });

const markNotificationAsReadProcedure = protectedProcedure
  .input(z.object({
    notificationId: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const success = counselingNotifications.markAsRead(input.notificationId);
    
    if (success) {
      await logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: 'notification_marked_read',
        resource: 'notification',
        resourceId: input.notificationId,
        status: 'success',
      });
    } else {
      await logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: 'notification_marked_read',
        resource: 'notification',
        resourceId: input.notificationId,
        status: 'failure',
      });
    }

    return success;
  });

const setNotificationPreferencesProcedure = protectedProcedure
  .input(z.object({
    channels: z.object({
      push: z.boolean(),
      email: z.boolean(),
      inApp: z.boolean(),
      sms: z.boolean(),
    }),
    quietHours: z.object({
      enabled: z.boolean(),
      startTime: z.string(),
      endTime: z.string(),
      timezone: z.string(),
    }),
    filters: z.object({
      minPriority: z.enum(['low', 'medium', 'high', 'critical']),
      types: z.array(z.enum(['session_created', 'session_reminder', 'session_starting', 'response_received', 'session_completed', 'session_escalated', 'session_cancelled', 'session_rescheduled', 'milestone_reached', 'deadline_approaching', 'counseling_needed', 'achievement_unlocked'])),
      muteEscalations: z.boolean(),
      muteNonUrgent: z.boolean(),
    }),
    digest: z.object({
      enabled: z.boolean(),
      frequency: z.enum(['hourly', 'daily', 'weekly']),
      time: z.string(),
    }),
  }))
  .mutation(async ({ input, ctx }) => {
    return counselingNotifications.setPreferences(ctx.user.id, input);
  });

// ============================================
// BULK COUNSELING PROCEDURES
// ============================================

const createBulkCounselingOperationProcedure = protectedProcedure
  .input(z.object({
    type: z.enum(['performance_review', 'development_planning', 'team_coordination', 'crisis_management', 'routine_checkin']),
    targets: z.object({
      subagentIds: z.array(z.string()),
      filters: z.object({
        categories: z.array(z.string()).optional(),
        performanceThreshold: z.enum(['low', 'medium', 'high']).optional(),
        lastCounselingDays: z.number().optional(),
      }).optional(),
    }),
    template: z.object({
      counselingType: z.string(),
      topic: z.string(),
      agenda: z.array(z.string()),
      priority: z.enum(['low', 'medium', 'high', 'critical']),
      duration: z.number(),
    }),
    scheduling: z.object({
      spreadOverDays: z.number(),
      preferredTimeSlots: z.array(z.string()),
      avoidConflicts: z.boolean(),
      batchSize: z.number(),
    }),
  }))
  .mutation(async ({ input, ctx }) => {
    const operation = await bulkCounselingService.createBulkOperation({
      ...input,
      mainAgentId: ctx.user.id,
    });

    await logAudit({
      userId: ctx.user.id,
      organizationId: ctx.user.organizationId,
      action: 'bulk_counseling_operation_created',
      resource: 'bulk_counseling_operation',
      resourceId: operation.id,
      status: 'success',
      details: {
        operationType: operation.type,
        targetCount: operation.targets.subagentIds.length,
      },
    });

    return operation;
  });

const executeBulkCounselingOperationProcedure = protectedProcedure
  .input(z.object({
    operationId: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    const operation = await bulkCounselingService.executeBulkOperation(input.operationId);
    
    await logAudit({
      userId: ctx.user.id,
      organizationId: ctx.user.organizationId,
      action: 'bulk_counseling_operation_executed',
      resource: 'bulk_counseling_operation',
      resourceId: input.operationId,
      status: 'success',
    });

    return operation;
  });

const quickBulkPerformanceReviewProcedure = protectedProcedure
  .input(z.object({
    targetSubagents: z.array(z.string()).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    spreadOverDays: z.number().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    return bulkCounselingService.quickPerformanceReview(ctx.user.id, input);
  });

// ============================================
// COUNSELING PROGRESS PROCEDURES
// ============================================

const initializeCounselingProgressProcedure = protectedProcedure
  .input(z.object({
    sessionId: z.string(),
    milestones: z.array(z.object({
      name: z.string(),
      description: z.string(),
      criteria: z.array(z.string()),
      deliverables: z.array(z.string()),
      dueDate: z.date().optional(),
      weight: z.number().optional(),
      dependencies: z.array(z.string()).optional(),
    })),
    targetCompletion: z.date().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    return counselingProgressTracker.initializeProgress(
      input.sessionId,
      ctx.user.id,
      {
        milestones: input.milestones,
        targetCompletion: input.targetCompletion,
      }
    );
  });

const updateCounselingMilestoneProcedure = protectedProcedure
  .input(z.object({
    sessionId: z.string(),
    milestoneId: z.string(),
    status: z.enum(['pending', 'in_progress', 'completed', 'skipped']),
    progress: z.number().min(0).max(100),
    deliverables: z.array(z.string()).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    return counselingProgressTracker.updateMilestone(
      input.sessionId,
      input.milestoneId,
      {
        status: input.status,
        progress: input.progress,
        deliverables: input.deliverables,
      }
    );
  });

const generateCounselingProgressReportProcedure = protectedProcedure
  .input(z.object({
    sessionId: z.string(),
    periodDays: z.number().default(30),
  }))
  .query(async ({ input, ctx }) => {
    return counselingProgressTracker.generateProgressReport(
      input.sessionId,
      input.periodDays
    );
  });

// ============================================
// SESSION SEARCH PROCEDURES
// ============================================

const searchCounselingSessionsProcedure = protectedProcedure
  .input(z.object({
    agentId: z.string().optional(),
    participantIds: z.array(z.string()).optional(),
    status: z.array(z.enum(['pending', 'in_progress', 'completed', 'escalated', 'rejected', 'timeout'])).optional(),
    counselingMode: z.array(z.enum(['main_to_sub', 'sub_to_main', 'peer_to_peer', 'cross_functional'])).optional(),
    programType: z.array(z.enum(['performance_improvement', 'skill_development', 'crisis_intervention', 'career_guidance', 'coordination_alignment', 'conflict_resolution'])).optional(),
    priority: z.array(z.enum(['low', 'medium', 'high', 'critical', 'emergency'])).optional(),
    createdAfter: z.date().optional(),
    createdBefore: z.date().optional(),
    topicContains: z.string().optional(),
    questionContains: z.string().optional(),
    answerContains: z.string().optional(),
    tags: z.array(z.string()).optional(),
    limit: z.number().default(50),
    offset: z.number().default(0),
    sortBy: z.enum(['createdAt', 'updatedAt', 'priority', 'status', 'topic']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  }))
  .query(async ({ input, ctx }) => {
    // Get user's sessions first
    const userSessions = await agentConsultingService.getSessionsForAgent(ctx.user.id);
    
    return sessionSearchService.searchSessions(userSessions, input);
  });

const fullTextSearchSessionsProcedure = protectedProcedure
  .input(z.object({
    query: z.string().min(1),
    fields: z.array(z.enum(['topic', 'question', 'answer', 'recommendations', 'context'])).optional(),
    fuzzy: z.boolean().default(false),
    caseSensitive: z.boolean().default(false),
  }))
  .query(async ({ input, ctx }) => {
    const userSessions = await agentConsultingService.getSessionsForAgent(ctx.user.id);
    
    return sessionSearchService.fullTextSearch(userSessions, input);
  });

const saveSearchFilterProcedure = protectedProcedure
  .input(z.object({
    name: z.string().min(1),
    filters: z.object({
      status: z.array(z.enum(['pending', 'in_progress', 'completed', 'escalated', 'rejected', 'timeout'])).optional(),
      priority: z.array(z.enum(['low', 'medium', 'high', 'critical', 'emergency'])).optional(),
      counselingMode: z.array(z.enum(['main_to_sub', 'sub_to_main', 'peer_to_peer', 'cross_functional'])).optional(),
      tags: z.array(z.string()).optional(),
    }),
  }))
  .mutation(async ({ input, ctx }) => {
    return sessionSearchService.saveSearch(ctx.user.id, input.name, input.filters);
  });

// ============================================
// SESSION EXPORT PROCEDURES
// ============================================

const exportCounselingSessionsProcedure = protectedProcedure
  .input(z.object({
    format: z.enum(['json', 'csv', 'pdf', 'markdown', 'xlsx']),
    includeRequests: z.boolean().default(true),
    includeResponses: z.boolean().default(true),
    includeMetadata: z.boolean().default(true),
    includeMetrics: z.boolean().default(false),
    dateRange: z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    }).optional(),
    fields: z.array(z.string()).optional(),
    anonymize: z.boolean().default(false),
  }))
  .mutation(async ({ input, ctx }) => {
    const userSessions = await agentConsultingService.getSessionsForAgent(ctx.user.id);
    
    // Apply date range Filter if provided
    let filteredSessions = userSessions;
    if (input.dateRange?.from) {
      filteredSessions = filteredSessions.filter(s => 
        new Date(s.createdAt) >= input.dateRange!.from
      );
    }
    if (input.dateRange?.to) {
      filteredSessions = filteredSessions.filter(s => 
        new Date(s.createdAt) <= input.dateRange!.to
      );
    }

    const exportResult = await sessionExportService.exportSessions(filteredSessions, input);
    
    await logAudit({
      userId: ctx.user.id,
      organizationId: ctx.user.organizationId,
      action: 'counseling_sessions_exported',
      resource: 'counseling_sessions',
      details: {
        format: input.format,
        sessionCount: filteredSessions.length,
        exportId: exportResult.id,
      },
      status: 'success',
    });

    return exportResult;
  });

const generateCounselingReportProcedure = protectedProcedure
  .input(z.object({
    title: z.string().min(1),
    type: z.enum(['summary', 'detailed', 'analytics', 'compliance', 'custom']),
    period: z.object({
      start: z.date(),
      end: z.date(),
    }),
    sections: z.array(z.string()).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    const userSessions = await agentConsultingService.getSessionsForAgent(ctx.user.id);
    
    // Filter by period
    const sessionsInPeriod = userSessions.filter(s => {
      const created = new Date(s.createdAt);
      return created >= input.period.start && created <= input.period.end;
    });

    const report = sessionExportService.generateReport(sessionsInPeriod, {
      ...input,
      generatedBy: ctx.user.id,
    });
    
    await logAudit({
      userId: ctx.user.id,
      organizationId: ctx.user.organizationId,
      action: 'counseling_report_generated',
      resource: 'counseling_report',
      resourceId: report.reportId,
      details: {
        reportType: input.type,
        period: input.period,
        sessionCount: sessionsInPeriod.length,
      },
      status: 'success',
    });

    return report;
  });

// ============================================
// COUNSELING SCHEDULING PROCEDURES
// ============================================

const scheduleCounselingSessionProcedure = protectedProcedure
  .input(z.object({
    sessionId: z.string(),
    scheduledTime: z.date(),
    duration: z.number(),
    reminderMinutes: z.array(z.number()).default([60, 15]),
    timezone: z.string(),
    calendarPreferences: z.object({
      preferredDays: z.array(z.enum(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])),
      preferredTimeSlots: z.array(z.string()),
      avoidConflicts: z.boolean(),
    }).optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    return counselingScheduler.scheduleSession(
      input.sessionId,
      input.scheduledTime,
      input.duration,
      input.reminderMinutes,
      input.timezone,
      input.calendarPreferences
    );
  });

const getCounselingCalendarProcedure = protectedProcedure
  .input(z.object({
    agentId: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
  }))
  .query(async ({ input, ctx }) => {
    return counselingScheduler.getCalendar(
      input.agentId || ctx.user.id,
      input.startDate,
      input.endDate
    );
  });

// ============================================
// ENHANCED ROUTER EXPORT
// ============================================

export const enhancedCounselingRouter = createTRPCRouter({
  // Templates
  createCounselingTemplate: createCounselingTemplateProcedure,
  getCounselingTemplates: getCounselingTemplatesProcedure,
  getRecommendedCounselingTemplates: getRecommendedCounselingTemplatesProcedure,
  
  // Notifications
  getNotifications: getNotificationsProcedure,
  markNotificationAsRead: markNotificationAsReadProcedure,
  setNotificationPreferences: setNotificationPreferencesProcedure,
  
  // Bulk Operations
  createBulkCounselingOperation: createBulkCounselingOperationProcedure,
  executeBulkCounselingOperation: executeBulkCounselingOperationProcedure,
  quickBulkPerformanceReview: quickBulkPerformanceReviewProcedure,
  
  // Progress Tracking
  initializeCounselingProgress: initializeCounselingProgressProcedure,
  updateCounselingMilestone: updateCounselingMilestoneProcedure,
  generateCounselingProgressReport: generateCounselingProgressReportProcedure,
  
  // Search & Filter
  searchCounselingSessions: searchCounselingSessionsProcedure,
  fullTextSearchSessions: fullTextSearchSessionsProcedure,
  saveSearchFilter: saveSearchFilterProcedure,
  
  // Export & Reporting
  exportCounselingSessions: exportCounselingSessionsProcedure,
  generateCounselingReport: generateCounselingReportProcedure,
  
  // Scheduling
  scheduleCounselingSession: scheduleCounselingSessionProcedure,
  getCounselingCalendar: getCounselingCalendarProcedure,
});
