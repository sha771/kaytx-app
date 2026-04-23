// Web-safe version of useAIAgents.ts
// Uses stubs for backend services to prevent prom-client bundling
 

import { useState, useEffect, useCallback } from 'react';
import { apiClient, apiCall, useApiCall, useRealtimeSubscription } from '../lib/trpc-client';
import {
  a2aCommunicationService,
  useA2ACommunication,
  type A2AMessage,
  type ConsultationSession,
  type AgentCommunicationProfile,
  type A2ACommunicationStats,
  type MessageType,
  type MessageStatus,
  type ConsultationStatus,
  inboxAgentService,
  useInboxAgents,
  type InboxMessage,
  type InboxAgentTask,
  type DraftResponse,
  type InboxAgentStats,
  socialMediaAgentService,
  useSocialMediaAgents,
  type SocialMediaPost,
  type ContentCalendar,
  type SocialMediaTask,
  type GeneratedContent,
  teamCollaborationAgentService,
  useTeamCollaborationAgents,
  type TeamTask,
  type TeamProject,
  type CollaborationTask,
  type ResourceAllocation,
  socialCRMAgentService,
  useSocialCRMAgents,
  type CRMContact,
  type CRMDeal,
  type CRMActivity,
  type CRMTask,
  type LeadScoreResult,
  analyticsInsightsAgentService,
  useAnalyticsInsightsAgents,
  type AnalyticsReport,
  type Dashboard,
  type DashboardWidget,
  type AnalyticsTask,
  type ForecastResult,
  type AlertConfig,
  enhancedA2ACounselingService,
  useEnhancedA2ACounseling,
  type MentoringRelationship,
  type CounselingSession,
  type AgentCounselingProfile,
  type CrossFunctionalCoordination,
  type CounselingType,
  type CounselingRelationship,
  type MentoringStatus,
} from './useAIAgents-backend-stub.web';

interface AIAgent {
  id: string;
  name: string;
  type: 'voice' | 'receptionist' | 'negotiator' | 'workflow' | 'analyst';
  description: string;
  config: Record<string, any>;
  status: 'active' | 'inactive' | 'training';
  provider: 'openai' | 'anthropic' | 'google' | 'local';
  model: string;
  capabilities: string[];
  createdAt: string;
  updatedAt: string;
}

interface Conversation {
  id: string;
  agentId: string;
  userId: string;
  status: 'active' | 'completed' | 'archived';
  messages: Message[];
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

interface CreateAgentData {
  name: string;
  type: 'voice' | 'receptionist' | 'negotiator' | 'workflow' | 'analyst';
  description?: string;
  config?: Record<string, any>;
  provider?: 'openai' | 'anthropic' | 'google' | 'local';
  model?: string;
  capabilities?: string[];
}

export function useAIAgents() {
  const {
    data: agents,
    loading: loadingAgents,
    error: agentsError,
    execute: fetchAgents
  } = useApiCall(
    () => apiClient.aiAgents.list.query(),
    [],
    { immediate: true }
  );

  const createAgent = useCallback(async (data: CreateAgentData) => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAgents.create.mutate(data)
      );
      if (result.data) {
        await fetchAgents();
        return { success: true, agent: result.data };
      }
      throw new Error('Failed to create agent');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create agent' 
      };
    }
  }, [fetchAgents]);

  const updateAgent = useCallback(async (id: string, data: Partial<CreateAgentData>) => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAgents.update.mutate({ id, ...data })
      );
      if (result.data) {
        await fetchAgents();
        return { success: true, agent: result.data };
      }
      throw new Error('Failed to update agent');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update agent' 
      };
    }
  }, [fetchAgents]);

  const deleteAgent = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAgents.delete.mutate({ id })
      );
      if (result.data) {
        await fetchAgents();
        return { success: true };
      }
      throw new Error('Failed to delete agent');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete agent' 
      };
    }
  }, [fetchAgents]);

  const getAgent = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAgents.get.query({ id })
      );
      return { success: true, agent: result.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get agent' 
      };
    }
  }, []);

  return {
    agents: agents?.data || [],
    loadingAgents,
    agentsError,
    createAgent,
    updateAgent,
    deleteAgent,
    getAgent,
    refreshAgents: fetchAgents,
  };
}

export function useConversations(agentId?: string) {
  const {
    data: conversations,
    loading: loadingConversations,
    error: conversationsError,
    execute: fetchConversations
  } = useApiCall(
    () => apiClient.aiAssistant.conversations.list.query({ agentId }),
    [agentId],
    { immediate: !!agentId }
  );

  const startConversation = useCallback(async (agentId: string, context?: Record<string, any>) => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAssistant.conversations.start.mutate({ 
          agentId, 
          context 
        })
      );
      if (result.data) {
        await fetchConversations();
        return { success: true, conversation: result.data };
      }
      throw new Error('Failed to start conversation');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to start conversation' 
      };
    }
  }, [fetchConversations]);

  const getConversation = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAssistant.conversations.get.query({ id })
      );
      return { success: true, conversation: result.data };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to get conversation' 
      };
    }
  }, []);

  return {
    conversations: conversations?.data || [],
    loadingConversations,
    conversationsError,
    startConversation,
    getConversation,
    refreshConversations: fetchConversations,
  };
}

export function useConversation(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const {
    data: conversation,
    loading: loadingConversation,
    error: conversationError,
    execute: fetchConversation
  } = useApiCall(
    () => apiClient.aiAssistant.conversations.get.query({ id: conversationId }),
    [conversationId],
    { immediate: true }
  );

  const sendMessage = useCallback(async (content: string, attachments?: File[]) => {
    try {
      setLoading(true);
      setError(null);

      let messageData: any = { conversationId, content };
      
      if (attachments && attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach(file => {
          formData.append('files', file);
        });
        
        const uploadResult = await apiCall(() => 
          apiClient.aiAssistant.conversations.uploadFiles.mutate(formData)
        );
        
        if (uploadResult.data) {
          messageData.attachments = uploadResult.data.files;
        }
      }

      const result = await apiCall(() => 
        apiClient.aiAssistant.conversations.sendMessage.mutate(messageData)
      );

      if (result.data) {
        setMessages(prev => [...prev, result.data]);
        return { success: true, message: result.data };
      }

      throw new Error('Failed to send message');
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setError(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  useRealtimeSubscription(`conversation:${conversationId}`, (newMessage: Message) => {
    setMessages(prev => {
      if (prev.some(m => m.id === newMessage.id)) {
        return prev;
      }
      return [...prev, newMessage];
    });
  });

  useEffect(() => {
    if (conversation?.data?.messages) {
      setMessages(conversation.data.messages);
    }
  }, [conversation]);

  return {
    conversation: conversation?.data,
    messages,
    loading: loading || loadingConversation,
    error: error || conversationError,
    sendMessage,
    refreshConversation: fetchConversation,
  };
}

export function useAgentExecution(agentId: string) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);

  const executeAgent = useCallback(async (input: string, options?: {
    tools?: string[];
    context?: Record<string, any>;
  }) => {
    try {
      setIsExecuting(true);
      setExecutionLogs([]);

      const result = await apiCall(() => 
        apiClient.aiAgents.execute.mutate({
          agentId,
          input,
          ...options
        })
      );

      if (result.data) {
        return { success: true, result: result.data };
      }

      throw new Error('Agent execution failed');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Agent execution failed' 
      };
    } finally {
      setIsExecuting(false);
    }
  }, [agentId]);

  const stopExecution = useCallback(async () => {
    try {
      const result = await apiCall(() => 
        apiClient.aiAgents.stopExecution.mutate({ agentId })
      );

      if (result.data) {
        setIsExecuting(false);
        return { success: true };
      }

      throw new Error('Failed to stop execution');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to stop execution' 
      };
    }
  }, [agentId]);

  useRealtimeSubscription(`agent:${agentId}:execution`, (log: string) => {
    setExecutionLogs(prev => [...prev, log]);
  });

  return {
    isExecuting,
    executionLogs,
    executeAgent,
    stopExecution,
    clearLogs: () => setExecutionLogs([]),
  };
}

export function useAgentAnalytics(agentId: string, period?: 'hour' | 'day' | 'week' | 'month') {
  const {
    data: analytics,
    loading: loadingAnalytics,
    error: analyticsError,
    execute: fetchAnalytics
  } = useApiCall(
    () => apiClient.aiAgents.analytics.query({ agentId, period }),
    [agentId, period],
    { immediate: true }
  );

  return {
    analytics: analytics?.data,
    loadingAnalytics,
    analyticsError,
    refreshAnalytics: fetchAnalytics,
  };
}

// Agent configuration templates
export const agentTemplates = {
  voice: {
    name: 'Voice Assistant',
    description: 'AI-powered voice assistant for customer support',
    config: {
      voice: 'natural',
      language: 'en-US',
      maxDuration: 300,
      recordingEnabled: true,
    },
    capabilities: ['speech_to_text', 'text_to_speech', 'conversation'],
  },
  receptionist: {
    name: 'Digital Receptionist',
    description: 'Automated receptionist for handling inquiries',
    config: {
      greeting: 'Hello! How can I help you today?',
      transferEnabled: true,
      appointmentBooking: true,
    },
    capabilities: ['conversation', 'appointment_booking', 'call_transfer'],
  },
  negotiator: {
    name: 'AI Negotiator',
    description: 'Intelligent negotiation agent for business deals',
    config: {
      strategy: 'collaborative',
      maxRounds: 10,
      timeout: 1800,
    },
    capabilities: ['negotiation', 'analysis', 'document_generation'],
  },
  workflow: {
    name: 'Workflow Automator',
    description: 'Automates complex business workflows',
    config: {
      steps: [],
      parallelExecution: false,
      errorHandling: 'retry',
    },
    capabilities: ['workflow_execution', 'api_integration', 'data_processing'],
  },
  analyst: {
    name: 'Data Analyst',
    description: 'AI-powered data analysis and insights',
    config: {
      analysisType: 'comprehensive',
      visualizationEnabled: true,
      reportFormat: 'pdf',
    },
    capabilities: ['data_analysis', 'visualization', 'report_generation'],
  },
};

// Model configurations
export const modelConfigs = {
  openai: {
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    defaultModel: 'gpt-4-turbo',
    maxTokens: 4096,
    temperature: 0.7,
  },
  anthropic: {
    models: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
    defaultModel: 'claude-3-sonnet',
    maxTokens: 4096,
    temperature: 0.7,
  },
  google: {
    models: ['gemini-pro', 'gemini-pro-vision'],
    defaultModel: 'gemini-pro',
    maxTokens: 4096,
    temperature: 0.7,
  },
  local: {
    models: ['llama-2-7b', 'llama-2-13b', 'custom-model'],
    defaultModel: 'llama-2-7b',
    maxTokens: 2048,
    temperature: 0.7,
  },
};

// Re-export all backend service types and stubs
export {
  a2aCommunicationService,
  useA2ACommunication,
  type A2AMessage,
  type ConsultationSession,
  type AgentCommunicationProfile,
  type A2ACommunicationStats,
  type MessageType,
  type MessageStatus,
  type ConsultationStatus,
  inboxAgentService,
  useInboxAgents,
  type InboxMessage,
  type InboxAgentTask,
  type DraftResponse,
  type InboxAgentStats,
  socialMediaAgentService,
  useSocialMediaAgents,
  type SocialMediaPost,
  type ContentCalendar,
  type SocialMediaTask,
  type GeneratedContent,
  teamCollaborationAgentService,
  useTeamCollaborationAgents,
  type TeamTask,
  type TeamProject,
  type CollaborationTask,
  type ResourceAllocation,
  socialCRMAgentService,
  useSocialCRMAgents,
  type CRMContact,
  type CRMDeal,
  type CRMActivity,
  type CRMTask,
  type LeadScoreResult,
  analyticsInsightsAgentService,
  useAnalyticsInsightsAgents,
  type AnalyticsReport,
  type Dashboard,
  type DashboardWidget,
  type AnalyticsTask,
  type ForecastResult,
  type AlertConfig,
  enhancedA2ACounselingService,
  useEnhancedA2ACounseling,
  type MentoringRelationship,
  type CounselingSession,
  type AgentCounselingProfile,
  type CrossFunctionalCoordination,
  type CounselingType,
  type CounselingRelationship,
  type MentoringStatus,
};

// Re-export from constants
export {
  type AIAgent,
  type AgentType,
  type AgentStatus,
  type AgentCapability,
  type AgentCommunicationChannel,
  type AgentConsultingCapability,
  type AgentHierarchy,
  type AgentA2ACapability,
  customerExperienceSubAgents,
  salesRevenueSubAgents,
  marketingGrowthSubAgents,
  operationsManagementSubAgents,
  dataIntelligenceSubAgents,
  analysisInsightsPerformanceSubAgents,
  mainAgents,
  allSubAgents,
  allMainAgents,
  allAgents,
  getAgentById,
  getSubAgentsByCategory,
  getMainAgentByCategory,
  getAgentsByConsultingCapability,
  getAgentHierarchy,
  getA2AReadyAgents,
  getAgentsWithConsultingCapability,
  agentCategories,
} from '../constants/aiAgentHierarchy';
