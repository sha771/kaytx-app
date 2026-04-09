import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '../../lib/trpc';

// ============================================
// COUNSELING TEMPLATES HOOKS
// ============================================

export function useCounselingTemplates(filters?: {
  category?: string;
  counselingMode?: string;
  tags?: string[];
  isSystem?: boolean;
}) {
  return trpc.counseling.getCounselingTemplates.useQuery(
    filters || {},
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
}

export function useRecommendedCounselingTemplates(
  agentType: 'main_agent' | 'subagent',
  context?: {
    recentIssues?: string[];
    skillGaps?: string[];
    performanceTrend?: 'improving' | 'declining' | 'stable';
  }
) {
  return trpc.counseling.getRecommendedCounselingTemplates.useQuery(
    { agentType, context },
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
}

export function useCreateCounselingTemplate() {
  const queryClient = useQueryClient();
  
  return trpc.counseling.createCounselingTemplate.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counseling.getCounselingTemplates'] });
    },
  });
}

// ============================================
// COUNSELING NOTIFICATIONS HOOKS
// ============================================

export function useCounselingNotifications(filters?: {
  unreadOnly?: boolean;
  type?: string;
  priority?: string;
  limit?: number;
}) {
  return trpc.counseling.getNotifications.useQuery(
    filters || {},
    {
      staleTime: 30 * 1000, // 30 seconds
      refetchInterval: 60 * 1000, // 1 minute
    }
  );
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();
  
  return trpc.counseling.markNotificationAsRead.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counseling.getNotifications'] });
    },
  });
}

export function useNotificationPreferences() {
  return trpc.counseling.setNotificationPreferences.useMutation();
}

// ============================================
// BULK COUNSELING HOOKS
// ============================================

export function useBulkCounselingOperations() {
  return trpc.counseling.createBulkCounselingOperation.useMutation();
}

export function useExecuteBulkOperation() {
  return trpc.counseling.executeBulkCounselingOperation.useMutation();
}

export function useQuickBulkPerformanceReview() {
  return trpc.counseling.quickBulkPerformanceReview.useMutation();
}

// ============================================
// COUNSELING PROGRESS HOOKS
// ============================================

export function useCounselingProgress(sessionId: string) {
  return trpc.counseling.generateCounselingProgressReport.useQuery(
    { sessionId },
    {
      enabled: !!sessionId,
      staleTime: 60 * 1000, // 1 minute
    }
  );
}

export function useInitializeCounselingProgress() {
  return trpc.counseling.initializeCounselingProgress.useMutation();
}

export function useUpdateCounselingMilestone() {
  const queryClient = useQueryClient();
  
  return trpc.counseling.updateCounselingMilestone.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counseling.generateCounselingProgressReport'] });
    },
  });
}

// ============================================
// SESSION SEARCH HOOKS
// ============================================

export function useSearchCounselingSessions(searchFilters: any) {
  return trpc.counseling.searchCounselingSessions.useQuery(searchFilters, {
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useFullTextSearchSessions(searchParams: {
  query: string;
  fields?: string[];
  fuzzy?: boolean;
}) {
  return trpc.counseling.fullTextSearchSessions.useQuery(searchParams, {
    enabled: !!searchParams.query,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSaveSearchFilter() {
  return trpc.counseling.saveSearchFilter.useMutation();
}

// ============================================
// SESSION EXPORT HOOKS
// ============================================

export function useExportCounselingSessions() {
  return trpc.counseling.exportCounselingSessions.useMutation();
}

export function useGenerateCounselingReport() {
  return trpc.counseling.generateCounselingReport.useMutation();
}

// ============================================
// COUNSELING SCHEDULING HOOKS
// ============================================

export function useCounselingCalendar(
  startDate: Date,
  endDate: Date,
  agentId?: string
) {
  return trpc.counseling.getCounselingCalendar.useQuery(
    { startDate, endDate, agentId },
    {
      staleTime: 60 * 1000, // 1 minute
    }
  );
}

export function useScheduleCounselingSession() {
  const queryClient = useQueryClient();
  
  return trpc.counseling.scheduleCounselingSession.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counseling.getCounselingCalendar'] });
    },
  });
}

// ============================================
// COMBINED HOOKS
// ============================================

export function useCounselingDashboard(agentId: string) {
  const notifications = useCounselingNotifications({ unreadOnly: true, limit: 5 });
  const templates = useRecommendedCounselingTemplates('subagent');
  const calendar = useCounselingCalendar(
    new Date(),
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next 7 days
    agentId
  );

  return {
    notifications,
    templates,
    calendar,
    isLoading: notifications.isLoading || templates.isLoading || calendar.isLoading,
    error: notifications.error || templates.error || calendar.error,
  };
}

export function useCounselingAnalytics(agentId: string) {
  const searchFilters = {
    agentId,
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      to: new Date(),
    },
  };

  const sessions = useSearchCounselingSessions(searchFilters);
  const exportMutation = useExportCounselingSessions();
  const reportMutation = useGenerateCounselingReport();

  return {
    sessions,
    exportMutation,
    reportMutation,
    isLoading: sessions.isLoading,
    error: sessions.error,
  };
}

export default {
  // Templates
  useCounselingTemplates,
  useRecommendedCounselingTemplates,
  useCreateCounselingTemplate,
  
  // Notifications
  useCounselingNotifications,
  useMarkNotificationAsRead,
  useNotificationPreferences,
  
  // Bulk Operations
  useBulkCounselingOperations,
  useExecuteBulkOperation,
  useQuickBulkPerformanceReview,
  
  // Progress
  useCounselingProgress,
  useInitializeCounselingProgress,
  useUpdateCounselingMilestone,
  
  // Search
  useSearchCounselingSessions,
  useFullTextSearchSessions,
  useSaveSearchFilter,
  
  // Export
  useExportCounselingSessions,
  useGenerateCounselingReport,
  
  // Scheduling
  useCounselingCalendar,
  useScheduleCounselingSession,
  
  // Combined
  useCounselingDashboard,
  useCounselingAnalytics,
};
