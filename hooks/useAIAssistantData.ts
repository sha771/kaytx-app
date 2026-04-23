import { useMemo } from 'react';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

export function useAIAssistantData() {
  const {
    tasks,
    meetings,
    insights,
    workflows,
    aiMessages,
    sendMessage,
    isLoading,
  } = useAIAssistant();

  const taskStats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  }), [tasks]);

  const meetingStats = useMemo(() => ({
    total: meetings.length,
    today: meetings.filter(m => {
      const today = new Date().toDateString();
      return new Date(m.startTime).toDateString() === today;
    }).length,
    upcoming: meetings.filter(m => new Date(m.startTime) > new Date()).length,
  }), [meetings]);

  return {
    tasks,
    meetings,
    insights,
    workflows,
    aiMessages,
    sendMessage,
    isLoading,
    taskStats,
    meetingStats,
  };
}
