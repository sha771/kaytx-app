/**
 * React hooks for API integration
 * Provides easy-to-use hooks for common API operations
 */

import { useState, useEffect, useCallback } from 'react';
import apiClient, { ApiResponse } from '../lib/api-client';

// Generic hook for API calls
export function useApi<T = any>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.error || 'Request failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

// Hook for paginated data
export function usePaginatedApi<T = any>(
  apiCall: (params: { limit: number; offset: number }) => Promise<ApiResponse<T[]>>,
  initialLimit = 20
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      const response = await apiCall({ limit: initialLimit, offset });
      
      if (response.success && response.data) {
        const page = response.data as unknown as T[];
        setData(prev => [...prev, ...page]);
        setOffset(prev => prev + initialLimit);
        setHasMore(response.meta?.pagination?.hasMore ?? false);
      } else {
        setError(response.error || 'Request failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiCall, initialLimit, offset, loading, hasMore]);

  const refresh = useCallback(async () => {
    setData([]);
    setOffset(0);
    setHasMore(true);
    await loadMore();
  }, [loadMore]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, loadMore, refresh, hasMore };
}

// Hook for authentication
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      if (response.success) {
        setIsAuthenticated(true);
        if (response.data) {
          setUser(response.data);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationName?: string;
  }) => {
    try {
      const response = await apiClient.register(userData);
      if (response.success) {
        setIsAuthenticated(true);
        if (response.data) {
          setUser(response.data);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await apiClient.getCurrentUser();
      if (response.success && response.data) {
        setIsAuthenticated(true);
        setUser(response.data);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
  };
}

// Hook for email campaigns
export function useEmailCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async (params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getEmailCampaigns(params);
      if (response.success && response.data) {
        setCampaigns(response.data as any);
      } else {
        setError(response.error || 'Failed to fetch campaigns');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createCampaign = useCallback(async (campaignData: {
    name: string;
    subject: string;
    content: string;
    recipientList: string[];
    scheduledAt?: string;
  }) => {
    try {
      const response = await apiClient.createEmailCampaign(campaignData);
      if (response.success && response.data) {
        setCampaigns(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to create campaign');
    } catch (error) {
      throw error;
    }
  }, []);

  const sendCampaign = useCallback(async (campaignId: string) => {
    try {
      const response = await apiClient.sendEmailCampaign(campaignId);
      if (response.success) {
        // Update campaign status
        setCampaigns(prev => 
          prev.map(campaign => 
            campaign.id === campaignId 
              ? { ...campaign, status: 'sent' }
              : campaign
          )
        );
        return true;
      }
      throw new Error(response.error || 'Failed to send campaign');
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
    sendCampaign,
  };
}

// Hook for leads
export function useLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async (params?: {
    status?: string;
    source?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getLeads(params);
      if (response.success && response.data) {
        setLeads(response.data as any);
      } else {
        setError(response.error || 'Failed to fetch leads');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLead = useCallback(async (leadData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    status?: string;
    source?: string;
  }) => {
    try {
      const response = await apiClient.createLead(leadData);
      if (response.success && response.data) {
        setLeads(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to create lead');
    } catch (error) {
      throw error;
    }
  }, []);

  const updateLead = useCallback(async (leadId: string, leadData: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    status: string;
  }>) => {
    try {
      const response = await apiClient.updateLead(leadId, leadData);
      if (response.success && response.data) {
        setLeads(prev => 
          prev.map(lead => 
            lead.id === leadId 
              ? { ...lead, ...(response.data as any) }
              : lead
          )
        );
        return response.data;
      }
      throw new Error(response.error || 'Failed to update lead');
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return {
    leads,
    loading,
    error,
    fetchLeads,
    createLead,
    updateLead,
  };
}

// Hook for AI agents
export function useAIAgents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async (params?: {
    type?: string;
    status?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAIAgents(params);
      if (response.success && response.data) {
        setAgents(response.data as any);
      } else {
        setError(response.error || 'Failed to fetch agents');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createAgent = useCallback(async (agentData: {
    name: string;
    description?: string;
    type: string;
    model: string;
    configuration?: any;
    capabilities?: string[];
  }) => {
    try {
      const response = await apiClient.createAIAgent(agentData);
      if (response.success && response.data) {
        setAgents(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to create agent');
    } catch (error) {
      throw error;
    }
  }, []);

  const chatWithAgent = useCallback(async (agentId: string, message: string, context?: any) => {
    try {
      const response = await apiClient.chatWithAgent(agentId, message, context);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to chat with agent');
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return {
    agents,
    loading,
    error,
    fetchAgents,
    createAgent,
    chatWithAgent,
  };
}

// Hook for payments
export function usePayments() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentIntent = useCallback(async (paymentData: {
    amount: number;
    currency: string;
    customerId?: string;
    paymentMethodId?: string;
    description?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.createPaymentIntent(paymentData);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to create payment intent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmPayment = useCallback(async (paymentIntentId: string, paymentMethodId?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.confirmPayment(paymentIntentId, paymentMethodId);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.error || 'Failed to confirm payment');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createPaymentIntent,
    confirmPayment,
  };
}

// Hook for invoices
export function useInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async (params?: {
    customerId?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getInvoices(params);
      if (response.success && response.data) {
        setInvoices(response.data as any);
      } else {
        setError(response.error || 'Failed to fetch invoices');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createInvoice = useCallback(async (invoiceData: {
    customerId: string;
    amount: number;
    currency: string;
    dueDate: string;
    items: {
      description: string;
      quantity: number;
      unitPrice: number;
    }[];
  }) => {
    try {
      const response = await apiClient.createInvoice(invoiceData);
      if (response.success && response.data) {
        setInvoices(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to create invoice');
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    createInvoice,
  };
}

// Hook for monitoring
export function useMonitoring() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getMonitoringDashboard();
      if (response.success && response.data) {
        setDashboard(response.data);
      } else {
        setError(response.error || 'Failed to fetch dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMetrics = useCallback(async (timeRange?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getMonitoringMetrics(timeRange);
      if (response.success && response.data) {
        setMetrics(response.data);
      } else {
        setError(response.error || 'Failed to fetch metrics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
    fetchMetrics();
  }, [fetchDashboard, fetchMetrics]);

  return {
    dashboard,
    metrics,
    loading,
    error,
    fetchDashboard,
    fetchMetrics,
  };
}

// Hook for platform connections
export function usePlatformSync() {
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = useCallback(async (params?: {
    platform?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getPlatformConnections(params);
      if (response.success && response.data) {
        setConnections(response.data as any);
      } else {
        setError(response.error || 'Failed to fetch connections');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const createConnection = useCallback(async (connectionData: {
    platform: string;
    name: string;
    credentials: any;
    configuration?: any;
    syncSettings?: {
      enabled?: boolean;
      frequency?: string;
      dataTypes?: string[];
    };
  }) => {
    try {
      const response = await apiClient.createPlatformConnection(connectionData);
      if (response.success && response.data) {
        setConnections(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to create connection');
    } catch (error) {
      throw error;
    }
  }, []);

  const syncConnection = useCallback(async (connectionId: string) => {
    try {
      const response = await apiClient.syncPlatformConnection(connectionId);
      if (response.success) {
        // Update connection status
        setConnections(prev => 
          prev.map(conn => 
            conn.id === connectionId 
              ? { ...conn, lastSyncAt: new Date().toISOString() }
              : conn
          )
        );
        return true;
      }
      throw new Error(response.error || 'Failed to sync connection');
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  return {
    connections,
    loading,
    error,
    fetchConnections,
    createConnection,
    syncConnection,
  };
}

// Hook for analytics
export function useAnalytics() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async (params?: {
    startDate?: string;
    endDate?: string;
    metrics?: string[];
    dimensions?: string[];
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getAnalyticsDashboard(params);
      if (response.success && response.data) {
        setDashboard(response.data);
      } else {
        setError(response.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    fetchDashboard,
  };
}

// Hook for multi-agent coordination
export function useMultiAgentCoordination() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const coordinateAgents = useCallback(async (coordinationData: {
    task: {
      type: string;
      description: string;
      parameters?: any;
    };
    agents: string[];
    coordinationStrategy?: string;
    timeout?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.coordinateMultiAgents(coordinationData);
      if (response.success && response.data) {
        setTasks(prev => [response.data, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to coordinate agents');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTaskStatus = useCallback(async (taskId: string) => {
    try {
      const response = await apiClient.getMultiAgentTaskStatus(taskId);
      if (response.success && response.data) {
        setTasks(prev => 
          prev.map(task => 
            task.taskId === taskId 
              ? { ...task, ...(response.data as any) }
              : task
          )
        );
        return response.data;
      }
      throw new Error(response.error || 'Failed to get task status');
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    coordinateAgents,
    getTaskStatus,
  };
}

export function useAgentCounseling() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async (params?: {
    agentId?: string;
    scope?: 'active' | 'history';
    limit?: number;
    offset?: number;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.getCounselingSessions(params);
      if (response.success && response.data) {
        setSessions(response.data as any);
        return response.data;
      }
      throw new Error(response.error || 'Failed to fetch counseling sessions');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const mainToSub = useCallback(async (payload: Parameters<typeof apiClient.initiateMainToSubCounseling>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.initiateMainToSubCounseling(payload);
      if (response.success && response.data) {
        setSessions(prev => [response.data as any, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to initiate counseling');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const subToMain = useCallback(async (payload: Parameters<typeof apiClient.initiateSubToMainCounseling>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.initiateSubToMainCounseling(payload);
      if (response.success && response.data) {
        setSessions(prev => [response.data as any, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to initiate counseling');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const peer = useCallback(async (payload: Parameters<typeof apiClient.initiatePeerCounseling>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.initiatePeerCounseling(payload);
      if (response.success && response.data) {
        setSessions(prev => [response.data as any, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to initiate counseling');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const respond = useCallback(async (
    sessionId: string,
    payload: Parameters<typeof apiClient.respondToCounselingSession>[1]
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.respondToCounselingSession(sessionId, payload);
      if (response.success && response.data) {
        setSessions(prev => prev.map(s => (s?.id === sessionId ? response.data : s)));
        return response.data;
      }
      throw new Error(response.error || 'Failed to respond to counseling session');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const employeeToAgent = useCallback(async (payload: Parameters<typeof apiClient.initiateEmployeeToAgentCounseling>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.initiateEmployeeToAgentCounseling(payload);
      if (response.success && response.data) {
        setSessions(prev => [response.data as any, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to initiate employee-to-agent counseling');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const agentToEmployee = useCallback(async (payload: Parameters<typeof apiClient.initiateAgentToEmployeeCounseling>[0]) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.initiateAgentToEmployeeCounseling(payload);
      if (response.success && response.data) {
        setSessions(prev => [response.data as any, ...prev]);
        return response.data;
      }
      throw new Error(response.error || 'Failed to initiate agent-to-employee counseling');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const respondAsEmployee = useCallback(async (
    sessionId: string,
    payload: Parameters<typeof apiClient.respondToCounselingSessionAsEmployee>[1]
  ) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.respondToCounselingSessionAsEmployee(sessionId, payload);
      if (response.success && response.data) {
        setSessions(prev => prev.map(s => (s?.id === sessionId ? response.data : s)));
        return response.data;
      }
      throw new Error(response.error || 'Failed to respond to counseling session as employee');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    sessions,
    loading,
    error,
    fetchSessions,
    mainToSub,
    subToMain,
    peer,
    respond,
    employeeToAgent,
    agentToEmployee,
    respondAsEmployee,
  };
}
