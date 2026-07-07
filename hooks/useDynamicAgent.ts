/**
 * Dynamic Agent Hook
 * Connects any frontend component to the real backend agent system.
 * Replaces static mock data with live agent configurations and chat.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { agentRegistry, AgentRegistryEntry } from '@/constants/aiAgentRegistry';
import { getDepartmentConfig, getAgentSystemPrompt, getAgentCapabilities, getAgentTools } from '@/constants/agent-configurations';

export interface DynamicAgentData {
  uid: string;
  name: string;
  title: string;
  department: string;
  departmentId: number;
  level: string;
  route: string;
  description: string;
  capabilities: string[];
  tools: any[];
  systemPrompt: string;
  config: any;
  isRegistered: boolean;
}

export interface DynamicAgentState {
  agent: DynamicAgentData | null;
  loading: boolean;
  error: string | null;
  chatSessionId: string | null;
  messages: Array<{ role: string; content: string; timestamp: Date }>;
  chatLoading: boolean;
  chatError: string | null;
}

/**
 * Hook to dynamically load an agent's configuration and provide chat functionality.
 * Usage: const { agent, messages, sendMessage, loading } = useDynamicAgent('uid-or-route');
 */
export function useDynamicAgent(agentIdentifier: string | null) {
  const [state, setState] = useState<DynamicAgentState>({
    agent: null,
    loading: false,
    error: null,
    chatSessionId: null,
    messages: [],
    chatLoading: false,
    chatError: null,
  });

  const chatSessionRef = useRef<string | null>(null);

  // Load agent configuration
  useEffect(() => {
    if (!agentIdentifier) {
      setState(prev => ({ ...prev, error: 'No agent identifier provided' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Find agent in registry
      const entry = agentRegistry.find(a =>
        a.uid === agentIdentifier ||
        a.sidebarId === agentIdentifier ||
        a.route.includes(agentIdentifier) ||
        a.route === `/ai-agent/${agentIdentifier}`
      );

      if (!entry) {
        // Try to build from identifier
        const parts = agentIdentifier.split('/');
        const deptSlug = parts[0] || '';
        const agentSlug = parts[1] || agentIdentifier;

        const deptEntry = agentRegistry.find(a => {
          const route = a.route.replace('/ai-agent/', '');
          return route.startsWith(deptSlug + '/');
        });

        if (deptEntry) {
          const deptConfig = getDepartmentConfig(deptEntry.departmentId);
          const systemPrompt = getAgentSystemPrompt(deptEntry.departmentId, deptEntry.level, deptEntry.title);
          const capabilities = getAgentCapabilities(deptEntry.departmentId, deptEntry.level);
          const tools = getAgentTools(deptEntry.departmentId, deptEntry.level);

          setState(prev => ({
            ...prev,
            loading: false,
            agent: {
              uid: deptEntry.uid,
              name: deptEntry.title,
              title: deptEntry.title,
              department: deptEntry.department,
              departmentId: deptEntry.departmentId,
              level: deptEntry.level,
              route: deptEntry.route,
              description: deptConfig?.baseSystemPrompt?.substring(0, 200) || deptEntry.title,
              capabilities,
              tools,
              systemPrompt,
              config: deptConfig,
              isRegistered: false,
            },
          }));
          return;
        }

        setState(prev => ({ ...prev, loading: false, error: 'Agent not found in registry' }));
        return;
      }

      const deptConfig = getDepartmentConfig(entry.departmentId);
      const systemPrompt = getAgentSystemPrompt(entry.departmentId, entry.level, entry.title);
      const capabilities = getAgentCapabilities(entry.departmentId, entry.level);
      const tools = getAgentTools(entry.departmentId, entry.level);

      setState(prev => ({
        ...prev,
        loading: false,
        agent: {
          uid: entry.uid,
          name: entry.title,
          title: entry.title,
          department: entry.department,
          departmentId: entry.departmentId,
          level: entry.level,
          route: entry.route,
          description: deptConfig?.baseSystemPrompt?.substring(0, 200) || entry.title,
          capabilities,
          tools,
          systemPrompt,
          config: deptConfig,
          isRegistered: true,
        },
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load agent',
      }));
    }
  }, [agentIdentifier]);

  // Send a message to the agent via the backend
  const sendMessage = useCallback(async (message: string): Promise<string | null> => {
    if (!state.agent) {
      setState(prev => ({ ...prev, chatError: 'No agent loaded' }));
      return null;
    }

    setState(prev => ({ ...prev, chatLoading: true, chatError: null }));

    try {
      // Add user message to local state
      const userMsg = { role: 'user' as const, content: message, timestamp: new Date() };
      setState(prev => ({ ...prev, messages: [...prev.messages, userMsg] }));

      // Call the backend TRPC endpoint
      const response = await fetch('/api/trpc/aiAgents.sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          json: {
            sessionId: chatSessionRef.current || '',
            message,
          },
        }),
      });

      if (!response.ok) {
        // If no session, try to start one
        if (!chatSessionRef.current) {
          const startResponse = await fetch('/api/trpc/aiAgents.startConversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              json: {
                agentId: state.agent.uid,
                initialMessage: message,
              },
            }),
          });

          if (startResponse.ok) {
            const startData = await startResponse.json();
            const sessionId = startData?.result?.data?.sessionId;
            if (sessionId) {
              chatSessionRef.current = sessionId;
              setState(prev => ({ ...prev, chatSessionId: sessionId }));

              // Now send the message
              const msgResponse = await fetch('/api/trpc/aiAgents.sendMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  json: {
                    sessionId,
                    message,
                  },
                }),
              });

              if (msgResponse.ok) {
                const msgData = await msgResponse.json();
                const assistantContent = msgData?.result?.data?.message || 'Response received.';
                const assistantMsg = { role: 'assistant' as const, content: assistantContent, timestamp: new Date() };
                setState(prev => ({
                  ...prev,
                  messages: [...prev.messages, assistantMsg],
                  chatLoading: false,
                }));
                return assistantContent;
              }
            }
          }
        }

        throw new Error('Failed to send message');
      }

      const data = await response.json();
      const assistantContent = data?.result?.data?.message || 'Response received.';
      const assistantMsg = { role: 'assistant' as const, content: assistantContent, timestamp: new Date() };
      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMsg],
        chatLoading: false,
      }));
      return assistantContent;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to send message';
      setState(prev => ({ ...prev, chatLoading: false, chatError: errorMsg }));
      return null;
    }
  }, [state.agent]);

  // Clear chat
  const clearChat = useCallback(() => {
    chatSessionRef.current = null;
    setState(prev => ({
      ...prev,
      chatSessionId: null,
      messages: [],
      chatError: null,
    }));
  }, []);

  // Get suggested prompts based on agent capabilities
  const getSuggestedPrompts = useCallback((): string[] => {
    if (!state.agent) return [];
    const caps = state.agent.capabilities;
    return [
      `Help me with ${caps[0]?.toLowerCase() || 'this task'}`,
      `What are your latest insights on ${caps[1]?.toLowerCase() || 'performance'}?`,
      'Summarize recent activity',
      'Show me optimization recommendations',
      'Draft a report based on my data',
      `Run a ${caps[2]?.toLowerCase() || 'quick'} analysis`,
    ].slice(0, 6);
  }, [state.agent]);

  return {
    ...state,
    sendMessage,
    clearChat,
    getSuggestedPrompts,
  };
}

/**
 * Get all agents in a specific department.
 */
export function useDepartmentAgents(departmentId: number): DynamicAgentData[] {
  return agentRegistry
    .filter(a => a.departmentId === departmentId)
    .map(entry => {
      const deptConfig = getDepartmentConfig(entry.departmentId);
      const systemPrompt = getAgentSystemPrompt(entry.departmentId, entry.level, entry.title);
      const capabilities = getAgentCapabilities(entry.departmentId, entry.level);
      const tools = getAgentTools(entry.departmentId, entry.level);

      return {
        uid: entry.uid,
        name: entry.title,
        title: entry.title,
        department: entry.department,
        departmentId: entry.departmentId,
        level: entry.level,
        route: entry.route,
        description: deptConfig?.baseSystemPrompt?.substring(0, 200) || entry.title,
        capabilities,
        tools,
        systemPrompt,
        config: deptConfig,
        isRegistered: true,
      };
    });
}

/**
 * Search agents across all departments.
 */
export function searchAgents(query: string): DynamicAgentData[] {
  const lower = query.toLowerCase();
  return agentRegistry
    .filter(a =>
      a.title.toLowerCase().includes(lower) ||
      a.department.toLowerCase().includes(lower) ||
      a.uid.toLowerCase().includes(lower)
    )
    .slice(0, 20)
    .map(entry => {
      const deptConfig = getDepartmentConfig(entry.departmentId);
      const capabilities = getAgentCapabilities(entry.departmentId, entry.level);
      const tools = getAgentTools(entry.departmentId, entry.level);

      return {
        uid: entry.uid,
        name: entry.title,
        title: entry.title,
        department: entry.department,
        departmentId: entry.departmentId,
        level: entry.level,
        route: entry.route,
        description: deptConfig?.baseSystemPrompt?.substring(0, 200) || entry.title,
        capabilities,
        tools,
        systemPrompt: getAgentSystemPrompt(entry.departmentId, entry.level, entry.title),
        config: deptConfig,
        isRegistered: true,
      };
    });
}
