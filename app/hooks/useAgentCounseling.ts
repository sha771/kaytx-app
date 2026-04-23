import { useState, useCallback } from 'react';
import { trpc } from '@/lib/trpc';

export interface CounselingSession {
  id: string;
  correlationId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'escalated' | 'rejected' | 'timeout';
  createdAt: string;
  updatedAt: string;
  initiator: {
    agentId: string;
    agentName: string;
    category: string;
  };
  participants: {
    agentId: string;
    agentName: string;
    category: string;
    role: 'consultant' | 'advisor' | 'observer' | 'escalation_target';
    joinedAt: string;
  }[];
  requests: {
    id: string;
    type: string;
    priority: string;
    sourceAgentId: string;
    sourceAgentName: string;
    targetAgentId: string;
    targetAgentName: string;
    topic: string;
    question: string;
    counselingContext?: {
      relationship: 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' | 'cross_functional';
      programType?: string;
      severity?: string;
    };
  }[];
  responses: {
    id: string;
    respondingAgentId: string;
    respondingAgentName: string;
    status: string;
    answer: string;
    recommendations: string[];
    confidence: number;
    counselingGuidance?: {
      mentoringAdvice?: string;
      performanceImprovement?: {
        specificActions: string[];
        timeline: string;
        metrics: string[];
      };
      skillDevelopment?: {
        skills: string[];
        trainingResources: string[];
      };
    };
  }[];
}

export interface MainToSubParams {
  mainAgentId: string;
  subagentId: string;
  counselingType: 'performance' | 'development' | 'coordination' | 'crisis';
  topic: string;
  details: {
    issue?: string;
    goals?: string[];
    expectations?: string[];
    timeline?: string;
    resources?: string[];
  };
  options?: {
    priority?: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
    confidentiality?: 'public' | 'team' | 'private' | 'confidential';
    sessionType?: 'one_time' | 'ongoing' | 'crisis' | 'development';
    deadline?: Date;
  };
}

export interface SubToMainParams {
  subagentId: string;
  mainAgentId: string;
  requestType: 'guidance' | 'support' | 'escalation' | 'resource_request';
  topic: string;
  details: {
    challenge?: string;
    whatAttempted?: string[];
    specificNeeds?: string[];
    urgency?: 'low' | 'medium' | 'high' | 'critical';
  };
  options?: {
    priority?: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
    confidentiality?: 'public' | 'team' | 'private' | 'confidential';
    deadline?: Date;
  };
}

export interface PeerToPeerParams {
  agentId1: string;
  agentId2: string;
  counselingType: 'collaboration' | 'peer_review' | 'knowledge_sharing' | 'problem_solving';
  topic: string;
  details: {
    sharedChallenge?: string;
    collaborationGoal?: string;
    knowledgeArea?: string;
    specificProblem?: string;
  };
  options?: {
    priority?: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
    confidentiality?: 'public' | 'team' | 'private' | 'confidential';
    deadline?: Date;
  };
}

export interface EmployeeToAgentParams {
  agentId: string;
  topic: string;
  question: string;
  options?: {
    priority?: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
    type?: string;
    confidentiality?: 'public' | 'team' | 'private' | 'confidential';
  };
}

export function useAgentCounseling() {
  const [sessions, setSessions] = useState<CounselingSession[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const utils = trpc.useContext();

  // Fetch sessions mutation
  const fetchSessionsMutation = trpc.aiAgents.getCounselingSessions.useMutation({
    onSuccess: (data) => {
      setSessions(data.sessions || []);
      setLoading(false);
    },
    onError: (err) => {
      setError(err.message);
      setLoading(false);
    },
  });

  // Main to Sub counseling mutation
  const mainToSubMutation = trpc.aiAgents.mainToSubCounseling.useMutation({
    onSuccess: () => {
      utils.aiAgents.getCounselingSessions.invalidate();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Sub to Main counseling mutation
  const subToMainMutation = trpc.aiAgents.subToMainCounseling.useMutation({
    onSuccess: () => {
      utils.aiAgents.getCounselingSessions.invalidate();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Peer to Peer counseling mutation
  const peerMutation = trpc.aiAgents.peerCounseling.useMutation({
    onSuccess: () => {
      utils.aiAgents.getCounselingSessions.invalidate();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Employee to Agent counseling mutation
  const employeeToAgentMutation = trpc.aiAgents.employeeToAgentCounseling.useMutation({
    onSuccess: () => {
      utils.aiAgents.getCounselingSessions.invalidate();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  // Respond to counseling mutation
  const respondMutation = trpc.aiAgents.respondToCounseling.useMutation({
    onSuccess: () => {
      utils.aiAgents.getCounselingSessions.invalidate();
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const fetchSessions = useCallback(async (params: {
    agentId: string;
    scope?: 'active' | 'completed' | 'all';
    limit?: number;
    offset?: number;
  }) => {
    setLoading(true);
    setError(null);
    await fetchSessionsMutation.mutateAsync(params);
  }, [fetchSessionsMutation]);

  const mainToSub = useCallback(async (params: MainToSubParams) => {
    setError(null);
    return await mainToSubMutation.mutateAsync(params);
  }, [mainToSubMutation]);

  const subToMain = useCallback(async (params: SubToMainParams) => {
    setError(null);
    return await subToMainMutation.mutateAsync(params);
  }, [subToMainMutation]);

  const peer = useCallback(async (params: PeerToPeerParams) => {
    setError(null);
    return await peerMutation.mutateAsync(params);
  }, [peerMutation]);

  const employeeToAgent = useCallback(async (params: EmployeeToAgentParams) => {
    setError(null);
    return await employeeToAgentMutation.mutateAsync(params);
  }, [employeeToAgentMutation]);

  const respondToCounseling = useCallback(async (params: {
    sessionId: string;
    respondingAgentId: string;
    response: {
      status: 'completed' | 'in_progress' | 'escalated';
      answer: string;
      recommendations: string[];
      confidence: number;
      counselingGuidance?: any;
    };
  }) => {
    setError(null);
    return await respondMutation.mutateAsync(params);
  }, [respondMutation]);

  // Helper to get related agents for counseling
  const getRelatedAgents = useCallback((agentId: string) => {
    const agent = getAgentById(agentId);
    if (!agent) return { mainAgent: null, subAgents: [], peers: [] };

    const hierarchy = getAgentHierarchy(agentId);
    return {
      mainAgent: hierarchy.mainAgent,
      subAgents: hierarchy.subAgents,
      peers: hierarchy.peers || [],
    };
  }, []);

  // Helper to determine counseling mode
  const getCounselingMode = useCallback((sourceId: string, targetId: string): 'main_to_sub' | 'sub_to_main' | 'peer_to_peer' => {
    const source = getAgentById(sourceId);
    const target = getAgentById(targetId);

    if (!source || !target) return 'peer_to_peer';

    if (source.type === 'main_agent' && target.type === 'subagent') {
      return 'main_to_sub';
    }
    if (source.type === 'subagent' && target.type === 'main_agent') {
      return 'sub_to_main';
    }
    return 'peer_to_peer';
  }, []);

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    mainToSub,
    subToMain,
    peer,
    employeeToAgent,
    respondToCounseling,
    getRelatedAgents,
    getCounselingMode,
  };
}

export default useAgentCounseling;
