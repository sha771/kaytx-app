import { trpc } from '@/lib/trpc';

export function useCounselingTemplates(params?: { category?: string }) {
  return trpc.counseling.getCounselingTemplates.useQuery(params ?? {});
}

export function useSearchCounselingSessions(filters?: Record<string, unknown>) {
  return trpc.counseling.searchCounselingSessions.useQuery(filters ?? {});
}

export function useFullTextSearchSessions(params: { query: string; fuzzy?: boolean }) {
  return trpc.counseling.fullTextSearchSessions.useQuery(params);
}

export function useSaveSearchFilter() {
  return trpc.counseling.saveSearchFilter.useMutation();
}

export function useCounselingNotifications(params?: { unreadOnly?: boolean; type?: string; priority?: string; limit?: number }) {
  return trpc.counseling.getNotifications.useQuery(params ?? {});
}

export function useMarkNotificationAsRead() {
  return trpc.counseling.markNotificationAsRead.useMutation();
}

export function useExportCounselingSessions() {
  return trpc.counseling.exportCounselingSessions.useMutation();
}

export function useGenerateCounselingReport() {
  return trpc.counseling.generateCounselingReport.useMutation();
}

export function useExecuteBulkOperation() {
  return trpc.counseling.executeBulkCounselingOperation.useMutation();
}

export function useQuickBulkPerformanceReview() {
  return trpc.counseling.quickBulkPerformanceReview.useMutation();
}

export function useCounselingDashboard(agentId: string) {
  const notifications = trpc.counseling.getNotifications.useQuery({ unreadOnly: false });
  const templates = trpc.counseling.getCounselingTemplates.useQuery({});
  const calendar = trpc.counseling.getCounselingCalendar.useQuery({
    agentId,
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  return {
    notifications: notifications.data ?? [],
    templates: templates.data ?? [],
    calendar: calendar.data ?? [],
    isLoading: notifications.isLoading || templates.isLoading || calendar.isLoading,
    error: notifications.error ?? templates.error ?? calendar.error,
  };
}
