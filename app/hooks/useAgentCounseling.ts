import { trpc } from '@/lib/trpc';

export interface CounselingSession {
  id: string;
  topic: string;
  status: string;
  priority: string;
  counselingMode: string;
  createdAt: string;
  updatedAt: string;
  participantIds: string[];
  mainAgentId?: string;
  subAgentId?: string;
  questions?: { content: string }[];
  answers?: { content: string }[];
}

export function useAgentCounseling() {
  const utils = trpc.useUtils();

  const sessionsQuery = trpc.counseling.searchCounselingSessions.useQuery({});
  const sessions = (sessionsQuery.data ?? []) as CounselingSession[];

  const mainToSub = sessions.filter(s => s.counselingMode === 'main_to_sub');
  const subToMain = sessions.filter(s => s.counselingMode === 'sub_to_main');
  const peer = sessions.filter(s => s.counselingMode === 'peer_to_peer');
  const employeeToAgent = sessions.filter(s => s.counselingMode === 'cross_functional');

  const fetchSessions = () => {
    utils.counseling.searchCounselingSessions.invalidate();
  };

  return {
    sessions,
    loading: sessionsQuery.isLoading,
    error: sessionsQuery.error,
    fetchSessions,
    mainToSub,
    subToMain,
    peer,
    employeeToAgent,
  };
}
