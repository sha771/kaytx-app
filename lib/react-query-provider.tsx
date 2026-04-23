/* eslint-disable no-unreachable */
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apiClient } from './trpc-client';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [client] = useState(() => queryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}

// Custom hooks for common API operations
export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).auth.login.mutate({ email, password });
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).auth.register.mutate({ 
        email, 
        password, 
        firstName, 
        lastName,
        termsAccepted: true,
        privacyPolicyAccepted: true
      });
      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await (apiClient as any).auth.logout.mutate();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const me = async () => {
    try {
      const result = await (apiClient as any).auth.me.query();
      return result;
    } catch (error) {
      console.error('Failed to get user info:', error);
      throw error;
    }
  };

  return {
    login,
    register,
    logout,
    me,
    isLoading,
  };
}

export function useAIAssistant() {
  const [isLoading, setIsLoading] = useState(false);

  const chat = async (message: string, conversationId?: string) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).aiAssistant.chat.mutate({ 
        messages: [{ role: 'user', content: message }],
        model: 'default',
        temperature: 0.7
      });
      return result;
    } catch (error) {
      console.error('Chat failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getTasks = async () => {
    try {
      const result = await (apiClient as any).aiAssistant.tasks.query();
      return result;
    } catch (error) {
       
      console.error('Failed to get tasks:', error);
      throw error;
    }
  };

  const createTask = async (task: { title: string; description: string; priority: string }) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).aiAssistant.tasks.create.mutate({
        title: task.title,
        description: task.description,
        priority: task.priority as 'low' | 'medium' | 'high',
        status: 'pending'
      });
      return result;
    } catch (error) {
       
      console.error('Failed to create task:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getMemories = async () => {
    try {
      const result = await (apiClient as any).aiAssistant.memories.query();
      return result;
    } catch (error) {
       
      console.error('Failed to get memories:', error);
      throw error;
    }
  };

  return {
    chat,
    getTasks,
    createTask,
    getMemories,
    isLoading,
  };
}

export function useAIAgents() {
  const [isLoading, setIsLoading] = useState(false);

  const getAgents = async () => {
    try {
      const result = await (apiClient as any).aiAgents.query();
      return result;
    } catch (error) {
      console.error('Failed to get agents:', error);
      throw error;
    }
  };

  const getAgent = async (id: string) => {
    try {
      const result = await (apiClient as any).aiAgents.get.query({ id });
      return result;
    } catch (error) {
      console.error('Failed to get agent:', error);
      throw error;
    }
  };

  const createAgent = async (agent: {
    name: string;
    type: string;
    description: string;
    configuration: any;
  }) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).aiAgents.create.mutate(agent);
      return result;
    } catch (error) {
      console.error('Failed to create agent:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAgent = async (id: string, updates: any) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).aiAgents.update.mutate({ id, updates });
      return result;
    } catch (error) {
      console.error('Failed to update agent:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAgent = async (id: string) => {
    setIsLoading(true);
    try {
      await (apiClient as any).aiAgents.delete.mutate({ id });
    } catch (error) {
      console.error('Failed to delete agent:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getAgents,
    getAgent,
    createAgent,
    updateAgent,
    deleteAgent,
    isLoading,
  };
}

export function usePlatforms() {
  const [isLoading, setIsLoading] = useState(false);

  const getPlatforms = async () => {
    try {
      const result = await (apiClient as any).platforms.getAll.query();
      return result.platforms;
    } catch (error) {
      console.error('Failed to get platforms:', error);
      throw error;
    }
  };

  const searchPlatforms = async (query: string) => {
    try {
      const result = await (apiClient as any).platforms.search.query({ query });
      return result.platforms;
    } catch (error) {
      console.error('Failed to search platforms:', error);
      throw error;
    }
  };

  const connectPlatform = async (platform: {
    type: string;
    credentials: any;
    configuration: any;
  }) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).platforms.connectQR.mutate({
        platformId: platform.type,
        qrData: platform.credentials
      });
      return result;
    } catch (error) {
      console.error('Failed to connect platform:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectPlatform = async (platformId: string) => {
    setIsLoading(true);
    try {
      await (apiClient as any).platforms.disconnect.mutate({ platformId });
    } catch (error) {
      console.error('Failed to disconnect platform:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const syncPlatform = async (platformId: string) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).platforms.sync.mutate({ platformId });
      return result;
    } catch (error) {
      console.error('Failed to sync platform:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPlatforms,
    searchPlatforms,
    connectPlatform,
    disconnectPlatform,
    syncPlatform,
    isLoading,
  };
}

export function useAnalytics() {
   
  const [isLoading, setIsLoading] = useState(false);

  const getMetrics = async (period?: string) => {
    try {
      const result = await (apiClient as any).analytics.getMetrics.query({ period });
      return result;
    } catch (error) {
       
      console.error('Failed to get metrics:', error);
      throw error;
    }
  };

  const getCampaigns = async () => {
    try {
      const result = await (apiClient as any).marketing.getCampaigns.query();
      return result;
    } catch (error) {
      console.error('Failed to get campaigns:', error);
      throw error;
    }
  };

  const getCRMData = async (type?: string) => {
    try {
      const result = await (apiClient as any).business.getCrmData.query({ type });
      return result;
    } catch (error) {
      console.error('Failed to get CRM data:', error);
      throw error;
    }
  };

  return {
    getMetrics,
    getCampaigns,
    getCRMData,
    isLoading,
  };
}

export function useNotifications() {
   
  const [isLoading, setIsLoading] = useState(false);

  const getNotifications = async () => {
    try {
      const result = await (apiClient as any).notifications.getAll.query();
      return result;
    } catch (error) {
      console.error('Failed to get notifications:', error);
      throw error;
    }
  };

  return {
    getNotifications,
    isLoading,
  };
}

export function useEnterprise() {
   
  const [isLoading, setIsLoading] = useState(false);

  const getDashboard = async () => {
    try {
      const result = await (apiClient as any).enterprise.getSubscription.query();
      return result;
    } catch (error) {
      console.error('Failed to get dashboard:', error);
      throw error;
    }
  };

  const getReports = async () => {
    try {
      // Mock implementation - would need actual reports endpoint
      return [];
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      // Mock implementation - would need actual users endpoint
      return [];
    } catch (error) {
      throw error;
    }
  };

  const getSettings = async () => {
    try {
      // Mock implementation - would need actual settings endpoint
      return {};
    } catch (error) {
      throw error;
    }
  };

  return {
    getDashboard,
    getReports,
    getUsers,
    getSettings,
    isLoading,
  };
}

export function useBridges() {
  const [isLoading, setIsLoading] = useState(false);

  const getBridges = async () => {
    try {
      const result = await (apiClient as any).bridges.list.query();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const createBridge = async (bridge: {
    name: string;
    type: string;
    configuration: any;
  }) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).bridges.create.mutate({
        protocol: bridge.type as 'rest' | 'graphql' | 'websocket',
        config: {
          id: bridge.name.toLowerCase().replace(/\s+/g, '-'),
          name: bridge.name,
          endpoint: bridge.configuration.endpoint,
          credentials: bridge.configuration.credentials,
          options: bridge.configuration.options
        }
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const connectBridge = async (bridgeId: string, credentials: any) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).bridges.connect.mutate({ bridgeId });
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectBridge = async (bridgeId: string) => {
    setIsLoading(true);
    try {
      await (apiClient as any).bridges.disconnect.mutate({ bridgeId });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getBridgeHealth = async (bridgeId: string) => {
    try {
      const result = await (apiClient as any).bridges.health.query({ bridgeId });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    getBridges,
    createBridge,
    connectBridge,
    disconnectBridge,
    getBridgeHealth,
    isLoading,
  };
}

export function useCalling() {
  const [isLoading, setIsLoading] = useState(false);

  const getCallHistory = async () => {
    try {
      // Mock implementation - would need actual call history endpoint
      return [];
    } catch (error) {
      throw error;
    }
  };

  const initiateCall = async (phoneNumber: string, options?: any) => {
    setIsLoading(true);
    try {
      const result = await (apiClient as any).calling.initiateCall.mutate({ 
        phoneNumber,
        customerName: options?.customerName || 'Unknown',
        recordingEnabled: options?.recordingEnabled || false,
        transcriptionEnabled: options?.transcriptionEnabled || false
      });
      return result;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const endCall = async (callId: string) => {
    setIsLoading(true);
    try {
      await (apiClient as any).calling.end.mutate({ callId });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCallRecording = async (callId: string, format?: string) => {
    try {
      const result = await (apiClient as any).calling.recording.query({ callId, format });
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    getCallHistory,
    initiateCall,
    endCall,
    getCallRecording,
    isLoading,
  };
}

export function usePrivacy() {
  const [isLoading, setIsLoading] = useState(false);

  const getConsentRecords = async () => {
    try {
      const result = await (apiClient as any).privacy.getSettings.query();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateConsent = async (consentId: string, updates: any) => {
    setIsLoading(true);
    try {
      // Mock implementation - would need actual consent update endpoint
      return {};
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getPrivacySettings = async () => {
    try {
      const result = await (apiClient as any).privacy.getSettings.query();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updatePrivacySettings = async (settings: any) => {
    setIsLoading(true);
    try {
      // Mock implementation - would need actual settings update endpoint
      return {};
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getConsentRecords,
    updateConsent,
    getPrivacySettings,
    updatePrivacySettings,
    isLoading,
  };
}
