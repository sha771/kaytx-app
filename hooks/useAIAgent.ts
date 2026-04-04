import { useState, useCallback, useRef } from 'react';
import { trpc } from '@/lib/trpc';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface Agent {
  id: string;
  name: string;
  type: 'voice-assistant' | 'receptionist' | 'negotiator' | 'workflow-automator' | 'data-analyst';
  capabilities: string[];
  voiceProfile?: any;
}

export interface ConversationSession {
  sessionId: string;
  agentId: string;
  messages: Message[];
  createdAt: Date;
  isActive: boolean;
}

/**
 * Hook for interacting with AI agents
 */
export function useAIAgent() {
  const [conversations, setConversations] = useState<Map<string, ConversationSession>>(new Map());
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const activeConversationRef = useRef<string | null>(null);

  // TRPC mutations and queries
  const startConversationMutation = trpc['ai-agents'].startConversation.useMutation();
  const sendMessageMutation = trpc['ai-agents'].sendMessage.useMutation();
  const endConversationMutation = trpc['ai-agents'].endConversation.useMutation();
  const executeToolMutation = trpc['ai-agents'].executeTool.useMutation();
  const listAgentsQuery = trpc['ai-agents'].listAgents.useQuery({});
  const getAgentQuery = trpc['ai-agents'].getAgent.useQuery;
  const getConversationHistoryQuery = trpc['ai-agents'].getConversationHistory.useQuery;

  // Update agents when query completes
  useState(() => {
    if (listAgentsQuery.data?.agents) {
      setAgents(listAgentsQuery.data.agents as Agent[]);
    }
  }, [listAgentsQuery.data]);

  const startConversation = useCallback(
    async (agentId: string, initialMessage?: string) => {
      try {
        setLoading(true);
        setError(null);

        const result = await startConversationMutation.mutateAsync({
          agentId,
          initialMessage,
        });

        const session: ConversationSession = {
          sessionId: result.sessionId,
          agentId,
          messages: initialMessage
            ? [
                {
                  id: `msg-1`,
                  role: 'user',
                  content: initialMessage,
                  timestamp: new Date(),
                },
              ]
            : [],
          createdAt: new Date(),
          isActive: true,
        };

        setConversations(prev => new Map(prev).set(result.sessionId, session));
        activeConversationRef.current = result.sessionId;

        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to start conversation';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [startConversationMutation]
  );

  const sendMessage = useCallback(
    async (sessionId: string, message: string) => {
      try {
        setLoading(true);
        setError(null);

        // Add user message to conversation immediately
        setConversations(prev => {
          const updated = new Map(prev);
          const session = updated.get(sessionId);
          if (session) {
            session.messages.push({
              id: `msg-${Date.now()}`,
              role: 'user',
              content: message,
              timestamp: new Date(),
            });
          }
          return updated;
        });

        // Get response from agent
        const response = await sendMessageMutation.mutateAsync({
          sessionId,
          message,
        });

        // Add assistant message to conversation
        setConversations(prev => {
          const updated = new Map(prev);
          const session = updated.get(sessionId);
          if (session) {
            session.messages.push({
              id: `msg-${Date.now() + 1}`,
              role: 'assistant',
              content: response.message,
              timestamp: new Date(),
              metadata: {
                action: response.action,
                actionParams: response.actionParams,
                confidence: response.confidence,
              },
            });
          }
          return updated;
        });

        return response;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to send message';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [sendMessageMutation]
  );

  const executeTool = useCallback(
    async (agentId: string, toolName: string, parameters: any) => {
      try {
        setLoading(true);
        setError(null);

        const result = await executeToolMutation.mutateAsync({
          agentId,
          toolName,
          parameters,
        });

        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to execute tool';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [executeToolMutation]
  );

  const endConversation = useCallback(
    async (sessionId: string) => {
      try {
        setLoading(true);
        setError(null);

        const result = await endConversationMutation.mutateAsync({
          sessionId,
        });

        // Mark conversation as inactive
        setConversations(prev => {
          const updated = new Map(prev);
          const session = updated.get(sessionId);
          if (session) {
            session.isActive = false;
          }
          return updated;
        });

        if (activeConversationRef.current === sessionId) {
          activeConversationRef.current = null;
        }

        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to end conversation';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [endConversationMutation]
  );

  const getAgent = useCallback(
    (agentId: string) => {
      return agents.find(a => a.id === agentId) || null;
    },
    [agents]
  );

  const getAgentsByType = useCallback(
    (type: Agent['type']) => {
      return agents.filter(a => a.type === type);
    },
    [agents]
  );

  const getConversation = useCallback(
    (sessionId: string) => {
      return conversations.get(sessionId) || null;
    },
    [conversations]
  );

  const getActiveConversation = useCallback(() => {
    if (!activeConversationRef.current) return null;
    return conversations.get(activeConversationRef.current) || null;
  }, [conversations]);

  return {
    // State
    conversations: Array.from(conversations.values()),
    agents,
    loading,
    error,
    activeConversationId: activeConversationRef.current,

    // Methods
    startConversation,
    sendMessage,
    executeTool,
    endConversation,
    getAgent,
    getAgentsByType,
    getConversation,
    getActiveConversation,

    // Utilities
    clearError: () => setError(null),
  };
}

/**
 * Hook for single agent conversation
 */
export function useAgentConversation(agentId: string, autoStart = true) {
  const {
    startConversation,
    sendMessage,
    executeTool,
    endConversation,
    getConversation,
    agents,
    loading,
    error,
  } = useAIAgent();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Auto-start conversation if requested
  useState(() => {
    if (autoStart && agentId) {
      startConversation(agentId).then(result => {
        if (result?.sessionId) {
          setSessionId(result.sessionId);
        }
      });
    }
  }, [agentId, autoStart, startConversation]);

  // Update messages when conversation changes
  useState(() => {
    if (sessionId) {
      const conversation = getConversation(sessionId);
      if (conversation) {
        setMessages(conversation.messages);
      }
    }
  }, [sessionId, getConversation]);

  const agent = agents.find(a => a.id === agentId);

  const send = useCallback(
    async (message: string) => {
      if (!sessionId) return null;
      return sendMessage(sessionId, message);
    },
    [sessionId, sendMessage]
  );

  const end = useCallback(async () => {
    if (!sessionId) return null;
    return endConversation(sessionId);
  }, [sessionId, endConversation]);

  const executeSomething = useCallback(
    async (toolName: string, parameters: any) => {
      return executeTool(agentId, toolName, parameters);
    },
    [agentId, executeTool]
  );

  return {
    sessionId,
    agent,
    messages,
    loading,
    error,
    send,
    end,
    executeTool: executeSomething,
  };
}
