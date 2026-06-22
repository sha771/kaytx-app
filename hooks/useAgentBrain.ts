/**
 * React hook for AI agents to use the brain system
 * Allows agents to query structured knowledge instead of reading raw files
 * Saves tokens by reading structured wiki pages instead of raw documents
 */

import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/trpc';

export interface AgentBrainHookResult {
  // Brain status
  isInitialized: boolean;
  isInitializing: boolean;
  statistics: any;
  healthStatus: any;
  
  // Brain operations
  initialize: () => Promise<void>;
  query: (query: string, options?: { limit?: number; minRelevance?: number }) => Promise<any>;
  searchByTag: (tag: string) => Promise<any>;
  searchByCategory: (category: string) => Promise<any>;
  getPage: (pageId: string) => Promise<any>;
  getAllPages: () => Promise<any>;
  
  // Brain management
  ingest: (sourcePaths?: string[]) => Promise<void>;
  addRawSource: (filePath: string, content: string) => Promise<void>;
  getTokenSavings: () => Promise<number>;
  
  // Error handling
  error: string | null;
}

export function useAgentBrain(agentId?: string): AgentBrainHookResult {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch brain statistics
  const { data: stats, refetch: refetchStats } = api.agentsBrain.getStatistics.useQuery(
    { agentId },
    { enabled: !!agentId || agentId === undefined }
  );

  // Fetch health status
  const { data: health } = api.agentsBrain.getHealthStatus.useQuery(
    { agentId },
    { enabled: !!agentId || agentId === undefined }
  );

  // Initialize mutation
  const initializeMutation = api.agentsBrain.initialize.useMutation({
    onSuccess: () => {
      setIsInitialized(true);
      setIsInitializing(false);
      refetchStats();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Failed to initialize brain');
      setIsInitializing(false);
    },
  });

  // Ingest mutation
  const ingestMutation = api.agentsBrain.ingest.useMutation({
    onSuccess: () => {
      refetchStats();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Failed to ingest sources');
    },
  });

  // Query mutation
  const queryMutation = api.agentsBrain.query.useMutation({
    onError: (err) => {
      setError(err instanceof Error ? err.message : 'Failed to query brain');
    },
  });

  // Update state when data changes
  useEffect(() => {
    if (stats) {
      setStatistics(stats);
      setIsInitialized(stats.totalWikiPages > 0);
    }
  }, [stats]);

  useEffect(() => {
    if (health) {
      setHealthStatus(health);
    }
  }, [health]);

  // Initialize brain
  const initialize = useCallback(async () => {
    setIsInitializing(true);
    setError(null);
    await initializeMutation.mutateAsync({ agentId });
  }, [agentId, initializeMutation]);

  // Query brain
  const query = useCallback(async (query: string, options?: { limit?: number; minRelevance?: number }) => {
    setError(null);
    const result = await queryMutation.mutateAsync({
      query,
      limit: options?.limit || 10,
      minRelevance: options?.minRelevance || 0.3,
      agentId,
    });
    return result;
  }, [agentId, queryMutation]);

  // Search by tag
  const searchByTag = useCallback(async (tag: string) => {
    setError(null);
    const result = await api.agentsBrain.searchByTag.query({ tag, agentId });
    return result;
  }, [agentId]);

  // Search by category
  const searchByCategory = useCallback(async (category: string) => {
    setError(null);
    const result = await api.agentsBrain.searchByCategory.query({ category, agentId });
    return result;
  }, [agentId]);

  // Get page
  const getPage = useCallback(async (pageId: string) => {
    setError(null);
    const result = await api.agentsBrain.getPage.query({ pageId, agentId });
    return result;
  }, [agentId]);

  // Get all pages
  const getAllPages = useCallback(async () => {
    setError(null);
    const result = await api.agentsBrain.getAllPages.query({ agentId });
    return result;
  }, [agentId]);

  // Ingest sources
  const ingest = useCallback(async (sourcePaths?: string[]) => {
    setError(null);
    await ingestMutation.mutateAsync({ sourcePaths, agentId });
  }, [agentId, ingestMutation]);

  // Add raw source
  const addRawSource = useCallback(async (filePath: string, content: string) => {
    setError(null);
    await api.agentsBrain.addRawSource.mutate({ filePath, content, agentId });
  }, [agentId]);

  // Get token savings
  const getTokenSavings = useCallback(async () => {
    setError(null);
    const result = await api.agentsBrain.getTokenSavings.query({ agentId });
    return result.tokenSavings;
  }, [agentId]);

  return {
    isInitialized,
    isInitializing,
    statistics,
    healthStatus,
    initialize,
    query,
    searchByTag,
    searchByCategory,
    getPage,
    getAllPages,
    ingest,
    addRawSource,
    getTokenSavings,
    error,
  };
}

/**
 * Hook for shared brain (no agent-specific brain)
 */
export function useSharedBrain(): AgentBrainHookResult {
  return useAgentBrain(undefined);
}
