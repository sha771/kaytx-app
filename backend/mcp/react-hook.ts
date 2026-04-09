/**
 * MCP Integration React Hook
 * 
 * Hook for integrating kaytx MCP Server with React applications
 * Enables direct agent interaction from frontend components
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { KaytxMCPClient, AgentTool, AgentExecutionResponse } from './client-sdk';

export interface UseMCPAgentsOptions {
  transport: 'stdio' | 'sse';
  url?: string;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  autoConnect?: boolean;
}

export interface UseMCPAgentsReturn {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  
  // Agent tools
  agentTools: AgentTool[];
  isLoadingTools: boolean;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  refreshTools: () => Promise<void>;
  executeAgent: (
    agentName: string,
    query: string,
    options?: {
      streamResponse?: boolean;
      maxTokens?: number;
      temperature?: number;
      context?: {
        userId?: string;
        organizationId?: string;
        sessionId?: string;
      };
    }
  ) => Promise<AgentExecutionResponse>;
  quickExecute: (
    query: string,
    options?: {
      agentName?: string;
      maxTokens?: number;
      temperature?: number;
      context?: {
        userId?: string;
        organizationId?: string;
        sessionId?: string;
      };
    }
  ) => Promise<AgentExecutionResponse>;
}

/**
 * React hook for kaytx MCP integration
 */
export function useMCPAgents(options: UseMCPAgentsOptions): UseMCPAgentsReturn {
  const clientRef = useRef<KaytxMCPClient | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agentTools, setAgentTools] = useState<AgentTool[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(false);

  // Initialize client
  useEffect(() => {
    clientRef.current = new KaytxMCPClient({
      transport: options.transport,
      url: options.url,
      command: options.command,
      args: options.args,
      env: options.env,
    });

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect().catch(console.error);
      }
    };
  }, [options.transport, options.url, options.command, options.args, options.env]);

  // Auto-connect if enabled
  useEffect(() => {
    if (options.autoConnect && !isConnected && !isConnecting) {
      connect();
    }
  }, [options.autoConnect, connect, isConnected, isConnecting]);

  const connect = useCallback(async () => {
    if (!clientRef.current) return;
    
    setIsConnecting(true);
    setError(null);
    
    try {
      await clientRef.current.connect();
      setIsConnected(true);
      
      // Load available tools
      await refreshTools();
    } catch (err) {
      setError((err as Error).message);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, [refreshTools]);

  const disconnect = useCallback(async () => {
    if (!clientRef.current) return;
    
    try {
      await clientRef.current.disconnect();
      setIsConnected(false);
      setAgentTools([]);
    } catch (err) {
      setError((err as Error).message);
    }
  }, []);

  const refreshTools = useCallback(async () => {
    if (!clientRef.current || !isConnected) return;
    
    setIsLoadingTools(true);
    
    try {
      const tools = await clientRef.current.listAgentTools();
      setAgentTools(tools);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoadingTools(false);
    }
  }, [isConnected]);

  const executeAgent = useCallback(async (
    agentName: string,
    query: string,
    options?: {
      streamResponse?: boolean;
      maxTokens?: number;
      temperature?: number;
      context?: {
        userId?: string;
        organizationId?: string;
        sessionId?: string;
      };
    }
  ): Promise<AgentExecutionResponse> => {
    if (!clientRef.current || !isConnected) {
      throw new Error('Not connected to MCP server');
    }

    return clientRef.current.executeAgent(agentName, {
      query,
      options: {
        streamResponse: options?.streamResponse,
        maxTokens: options?.maxTokens,
        temperature: options?.temperature,
      },
      context: options?.context,
    });
  }, [isConnected]);

  const quickExecute = useCallback(async (
    query: string,
    options?: {
      agentName?: string;
      maxTokens?: number;
      temperature?: number;
      context?: {
        userId?: string;
        organizationId?: string;
        sessionId?: string;
      };
    }
  ): Promise<AgentExecutionResponse> => {
    if (!clientRef.current || !isConnected) {
      throw new Error('Not connected to MCP server');
    }

    return clientRef.current.quickExecute(
      query,
      options?.agentName,
      {
        maxTokens: options?.maxTokens,
        temperature: options?.temperature,
      },
      options?.context
    );
  }, [isConnected]);

  return {
    isConnected,
    isConnecting,
    error,
    agentTools,
    isLoadingTools,
    connect,
    disconnect,
    refreshTools,
    executeAgent,
    quickExecute,
  };
}

export default useMCPAgents;
