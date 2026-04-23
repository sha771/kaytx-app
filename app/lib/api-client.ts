/**
 * API Client for Frontend-Backend Integration
 * Provides a centralized interface for all API communications
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: unknown;
  meta?: {
    pagination?: {
      limit: number;
      offset: number;
      total: number;
      hasMore: boolean;
    };
    timestamp: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
  errorId?: string;
  timestamp: string;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, unknown>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

class ApiClient {
  private serverBaseURL: string;
  private apiBaseURL: string;
  private defaultHeaders: Record<string, string>;
  private authToken: string | null = null;
  private refreshToken: string | null = null;
  private organizationId: string | null = null;

  constructor() {
    this.serverBaseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    this.apiBaseURL = `${this.serverBaseURL}/api/v1`;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'kaytx-Mobile/1.0.0',
    };
  }

  /**
   * Initialize authentication tokens
   */
  async setAuthTokens(authToken: string, refreshToken: string, organizationId: string) {
    this.authToken = authToken;
    this.refreshToken = refreshToken;
    this.organizationId = organizationId;
    
    // Store tokens securely
    await AsyncStorage.setItem('auth_token', authToken);
    await AsyncStorage.setItem('refresh_token', refreshToken);
    await AsyncStorage.setItem('organization_id', organizationId);
  }

  /**
   * Load stored authentication tokens
   */
  async loadAuthTokens() {
    try {
      this.authToken = await AsyncStorage.getItem('auth_token');
      this.refreshToken = await AsyncStorage.getItem('refresh_token');
      this.organizationId = await AsyncStorage.getItem('organization_id');
    } catch (error) {
      console.error('Failed to load auth tokens:', error);
    }
  }

  /**
   * Clear authentication tokens
   */
  async clearAuthTokens() {
    this.authToken = null;
    this.refreshToken = null;
    this.organizationId = null;
    
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('organization_id');
  }

  /**
   * Refresh authentication token
   */
  private async refreshAuthToken(): Promise<boolean> {
    if (!this.refreshToken) {
      return false;
    }

    try {
      const response = await fetch(`${this.serverBaseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await this.setAuthTokens(
          data.token,
          data.refreshToken || this.refreshToken,
          data.organizationId || this.organizationId || ''
        );
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return false;
  }

  /**
   * Make HTTP request with retry logic and authentication
   */
  private async makeRequest<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      params,
      timeout = 30000,
      retries = 3,
      retryDelay = 1000,
    } = config;

    let url = `${this.apiBaseURL}${endpoint}`;
    
    // Add query parameters
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
          searchParams.set(key, value.join(','));
          continue;
        }
        searchParams.set(key, String(value));
      }
      url += `?${searchParams.toString()}`;
    }

    // Prepare headers
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // Add authentication header
    if (this.authToken) {
      requestHeaders.Authorization = `Bearer ${this.authToken}`;
    }

    // Add organization header
    if (this.organizationId) {
      requestHeaders['X-Organization-ID'] = this.organizationId;
    }

    // Prepare body
    let requestBody: string | undefined;
    if (body && method !== 'GET') {
      requestBody = typeof body === 'string' ? body : JSON.stringify(body);
    }

    let lastError: Error | null = null;

    // Retry logic
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          method,
          headers: requestHeaders,
          body: requestBody,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Handle authentication errors
        if (response.status === 401 && this.refreshToken && attempt === 0) {
          const refreshed = await this.refreshAuthToken();
          if (refreshed) {
            // Retry with new token
            requestHeaders.Authorization = `Bearer ${this.authToken}`;
            continue;
          } else {
            // Token refresh failed, clear tokens and redirect to login
            await this.clearAuthTokens();
            throw new Error('Authentication expired');
          }
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `HTTP ${response.status}`);
        }

        return data;
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on authentication errors or 4xx status codes
        if (error instanceof Error && error.message === 'Authentication expired') {
          throw error;
        }

        // Wait before retry
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
        }
      }
    }

    throw lastError || new Error('Request failed');
  }

  /**
   * Handle API errors globally
   */
  private handleError(error: Error, endpoint: string): never {
    console.error(`API Error [${endpoint}]:`, error);

    // Show user-friendly error message
    if (error.message.includes('Network request failed')) {
      Alert.alert('Network Error', 'Please check your internet connection and try again.');
    } else if (error.message === 'Authentication expired') {
      Alert.alert('Session Expired', 'Please log in again to continue.');
    } else {
      Alert.alert('Error', error.message || 'An unexpected error occurred.');
    }

    throw error;
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    try {
      const response = await this.makeRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      
      if (response.success && response.data) {
        const data = response.data as { token: string; refreshToken: string; organizationId: string };
        await this.setAuthTokens(data.token, data.refreshToken, data.organizationId);
      }
      
      return response;
    } catch (error) {
      this.handleError(error as Error, '/auth/login');
    }
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    organizationName?: string;
  }) {
    try {
      const response = await this.makeRequest('/auth/register', {
        method: 'POST',
        body: userData,
      });
      
      if (response.success && response.data) {
        const data = response.data as { token: string; refreshToken: string; organizationId: string };
        await this.setAuthTokens(data.token, data.refreshToken, data.organizationId);
      }
      
      return response;
    } catch (error) {
      this.handleError(error as Error, '/auth/register');
    }
  }

  async logout() {
    try {
      await this.makeRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await this.clearAuthTokens();
    }
  }

  // User endpoints
  async getCurrentUser() {
    try {
      return await this.makeRequest('/users/me');
    } catch (error) {
      this.handleError(error as Error, '/users/me');
    }
  }

  async updateProfile(userData: Partial<{
    firstName: string;
    lastName: string;
    phone: string;
  }>) {
    try {
      return await this.makeRequest('/users/profile', {
        method: 'PUT',
        body: userData,
      });
    } catch (error) {
      this.handleError(error as Error, '/users/profile');
    }
  }

  // Email Campaign endpoints
  async getEmailCampaigns(params?: {
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      return await this.makeRequest('/services/email-campaigns', { params });
    } catch (error) {
      this.handleError(error as Error, '/services/email-campaigns');
    }
  }

  async createEmailCampaign(campaignData: {
    name: string;
    subject: string;
    content: string;
    recipientList: string[];
    scheduledAt?: string;
  }) {
    try {
      return await this.makeRequest('/services/email-campaigns', {
        method: 'POST',
        body: campaignData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/email-campaigns');
    }
  }

  async sendEmailCampaign(campaignId: string) {
    try {
      return await this.makeRequest(`/services/email-campaigns/${campaignId}/send`, {
        method: 'POST',
      });
    } catch (error) {
      this.handleError(error as Error, `/services/email-campaigns/${campaignId}/send`);
    }
  }

  // Lead endpoints
  async getLeads(params?: {
    status?: string;
    source?: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      return await this.makeRequest('/services/leads', { params });
    } catch (error) {
      this.handleError(error as Error, '/services/leads');
    }
  }

  async createLead(leadData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
    status?: string;
    source?: string;
  }) {
    try {
      return await this.makeRequest('/services/leads', {
        method: 'POST',
        body: leadData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/leads');
    }
  }

  async updateLead(leadId: string, leadData: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company: string;
    status: string;
  }>) {
    try {
      return await this.makeRequest(`/services/leads/${leadId}`, {
        method: 'PUT',
        body: leadData,
      });
    } catch (error) {
      this.handleError(error as Error, `/services/leads/${leadId}`);
    }
  }

  // AI Agent endpoints
  async getAIAgents(params?: {
    type?: string;
    status?: string;
  }) {
    try {
      return await this.makeRequest('/services/ai-agents', { params });
    } catch (error) {
      this.handleError(error as Error, '/services/ai-agents');
    }
  }

  async createAIAgent(agentData: {
    name: string;
    description?: string;
    type: string;
    model: string;
    configuration?: unknown;
    capabilities?: string[];
  }) {
    try {
      return await this.makeRequest<unknown>('/services/ai-agents', {
        method: 'POST',
        body: agentData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/ai-agents');
    }
  }

  async chatWithAgent(agentId: string, message: string, context?: any) {
    try {
      return await this.makeRequest(`/services/ai-agents/${agentId}/chat`, {
        method: 'POST',
        body: { message, context },
      });
    } catch (error) {
      this.handleError(error as Error, `/services/ai-agents/${agentId}/chat`);
    }
  }

  // Payment endpoints
  async createPaymentIntent(paymentData: {
    amount: number;
    currency: string;
    customerId?: string;
    paymentMethodId?: string;
    description?: string;
  }) {
    try {
      return await this.makeRequest('/services/payments/intents', {
        method: 'POST',
        body: paymentData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/payments/intents');
    }
  }

  async confirmPayment(paymentIntentId: string, paymentMethodId?: string) {
    try {
      return await this.makeRequest('/services/payments/confirm', {
        method: 'POST',
        body: { paymentIntentId, paymentMethodId },
      });
    } catch (error) {
      this.handleError(error as Error, '/services/payments/confirm');
    }
  }

  // Invoice endpoints
  async getInvoices(params?: {
    customerId?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      return await this.makeRequest('/services/invoices', { params });
    } catch (error) {
      this.handleError(error as Error, '/services/invoices');
    }
  }

  async createInvoice(invoiceData: {
    customerId: string;
    amount: number;
    currency: string;
    dueDate: string;
    items: {
      description: string;
      quantity: number;
      unitPrice: number;
    }[];
  }) {
    try {
      return await this.makeRequest('/services/invoices', {
        method: 'POST',
        body: invoiceData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/invoices');
    }
  }

  // Consent endpoints
  async getConsentPreferences() {
    try {
      return await this.makeRequest('/consent/preferences');
    } catch (error) {
      this.handleError(error as Error, '/consent/preferences');
    }
  }

  async updateConsentPreferences(preferences: {
    emailMarketing?: boolean;
    analytics?: boolean;
    personalization?: boolean;
    thirdPartySharing?: boolean;
    cookies?: {
      essential?: boolean;
      functional?: boolean;
      analytics?: boolean;
      marketing?: boolean;
    };
    dataProcessing?: {
      profiling?: boolean;
      automatedDecisionMaking?: boolean;
    };
  }) {
    try {
      return await this.makeRequest('/consent/preferences', {
        method: 'PUT',
        body: preferences,
      });
    } catch (error) {
      this.handleError(error as Error, '/consent/preferences');
    }
  }

  // Monitoring endpoints
  async getMonitoringDashboard() {
    try {
      return await this.makeRequest('/monitoring/dashboard');
    } catch (error) {
      this.handleError(error as Error, '/monitoring/dashboard');
    }
  }

  async getMonitoringMetrics(timeRange?: string) {
    try {
      return await this.makeRequest('/monitoring/metrics', {
        params: timeRange ? { timeRange } : undefined,
      });
    } catch (error) {
      this.handleError(error as Error, '/monitoring/metrics');
    }
  }

  // Platform sync endpoints
  async getPlatformConnections(params?: {
    platform?: string;
    status?: string;
    limit?: number;
    offset?: number;
  }) {
    try {
      return await this.makeRequest('/services/platform-sync/connections', { params });
    } catch (error) {
      this.handleError(error as Error, '/services/platform-sync/connections');
    }
  }

  async createPlatformConnection(connectionData: {
    platform: string;
    name: string;
    credentials: any;
    configuration?: any;
    syncSettings?: {
      enabled?: boolean;
      frequency?: string;
      dataTypes?: string[];
    };
  }) {
    try {
      return await this.makeRequest('/services/platform-sync/connections', {
        method: 'POST',
        body: connectionData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/platform-sync/connections');
    }
  }

  async syncPlatformConnection(connectionId: string) {
    try {
      return await this.makeRequest(`/services/platform-sync/connections/${connectionId}/sync`, {
        method: 'POST',
      });
    } catch (error) {
      this.handleError(error as Error, `/services/platform-sync/connections/${connectionId}/sync`);
    }
  }

  // Analytics endpoints
  async getAnalyticsDashboard(params?: {
    startDate?: string;
    endDate?: string;
    metrics?: string[];
    dimensions?: string[];
  }) {
    try {
      return await this.makeRequest('/services/analytics/dashboard', { params });
    } catch (error) {
      this.handleError(error as Error, '/services/analytics/dashboard');
    }
  }

  // Multi-agent coordination endpoints
  async coordinateMultiAgents(coordinationData: {
    task: {
      type: string;
      description: string;
      parameters?: any;
    };
    agents: string[];
    coordinationStrategy?: string;
    timeout?: number;
  }) {
    try {
      return await this.makeRequest('/services/multi-agent/coordinate', {
        method: 'POST',
        body: coordinationData,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/multi-agent/coordinate');
    }
  }

  async getMultiAgentTaskStatus(taskId: string) {
    try {
      return await this.makeRequest(`/services/multi-agent/status/${taskId}`);
    } catch (error) {
      this.handleError(error as Error, `/services/multi-agent/status/${taskId}`);
    }
  }

  async initiateMainToSubCounseling(payload: {
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
      deadline?: string;
    };
  }) {
    try {
      return await this.makeRequest('/services/agent-counseling/main-to-sub', {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/agent-counseling/main-to-sub');
    }
  }

  async initiateSubToMainCounseling(payload: {
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
      deadline?: string;
    };
  }) {
    try {
      return await this.makeRequest('/services/agent-counseling/sub-to-main', {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/agent-counseling/sub-to-main');
    }
  }

  async initiatePeerCounseling(payload: {
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
      deadline?: string;
    };
  }) {
    try {
      return await this.makeRequest('/services/agent-counseling/peer', {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/agent-counseling/peer');
    }
  }

  async respondToCounselingSession(sessionId: string, payload: {
    respondingAgentId: string;
    response: {
      status: 'pending' | 'in_progress' | 'completed' | 'escalated' | 'rejected' | 'timeout';
      answer: string;
      recommendations: string[];
      actionItems?: {
        id: string;
        description: string;
        assignedTo: string;
        dueDate?: string;
        priority: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
        status: 'pending' | 'in_progress' | 'completed';
      }[];
      deliverables?: {
        id: string;
        type: 'report' | 'analysis' | 'recommendation' | 'code' | 'content' | 'data' | 'strategy';
        title: string;
        content: string;
        format: 'json' | 'markdown' | 'text' | 'html' | 'structured';
      }[];
      confidence: number;
      reasoning: string;
      caveats: string[];
      requiresFollowUp: boolean;
      followUpQuestions?: string[];
      suggestedNextSteps: string[];
      escalateTo?: string[];
      delegateTo?: string[];
    };
  }) {
    try {
      return await this.makeRequest(`/services/agent-counseling/sessions/${sessionId}/respond`, {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, `/services/agent-counseling/sessions/${sessionId}/respond`);
    }
  }

  async getCounselingSessions(params?: {
    agentId?: string;
    scope?: 'active' | 'history';
    limit?: number;
    offset?: number;
  }) {
    try {
      return await this.makeRequest<unknown>('/services/agent-counseling/sessions', { params: params as Record<string, unknown> });
    } catch (error) {
      this.handleError(error as Error, '/services/agent-counseling/sessions');
    }
  }

  async initiateEmployeeToAgentCounseling(payload: {
    agentId: string;
    topic: string;
    question: string;
    options?: {
      type?: 'advisory' | 'collaborative' | 'directive' | 'analytical' | 'escalation' | 'delegation' | 'mentorship' | 'coordination' | 'peer_review' | 'performance_counseling';
      priority?: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
      expectedDeliverable?: string;
      deadline?: string;
      tags?: string[];
      confidentiality?: 'public' | 'team' | 'private' | 'confidential';
    };
  }) {
    try {
      return await this.makeRequest('/services/agent-counseling/employee-to-agent', {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/agent-counseling/employee-to-agent');
    }
  }

  async initiateAgentToEmployeeCounseling(payload: {
    agentId: string;
    topic: string;
    question: string;
    options?: {
      type?: 'advisory' | 'collaborative' | 'directive' | 'analytical' | 'escalation' | 'delegation' | 'mentorship' | 'coordination' | 'peer_review' | 'performance_counseling';
      priority?: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
      expectedDeliverable?: string;
      deadline?: string;
      tags?: string[];
      confidentiality?: 'public' | 'team' | 'private' | 'confidential';
    };
  }) {
    try {
      return await this.makeRequest('/services/agent-counseling/agent-to-employee', {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, '/services/agent-counseling/agent-to-employee');
    }
  }

  async respondToCounselingSessionAsEmployee(sessionId: string, payload: {
    response: {
      status: 'pending' | 'in_progress' | 'completed' | 'escalated' | 'rejected' | 'timeout';
      answer: string;
      recommendations: string[];
      actionItems?: {
        id: string;
        description: string;
        assignedTo: string;
        dueDate?: string;
        priority: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
        status: 'pending' | 'in_progress' | 'completed';
      }[];
      deliverables?: {
        id: string;
        type: 'report' | 'analysis' | 'recommendation' | 'code' | 'content' | 'data' | 'strategy';
        title: string;
        content: string;
        format: 'json' | 'markdown' | 'text' | 'html' | 'structured';
      }[];
      confidence: number;
      reasoning: string;
      caveats: string[];
      requiresFollowUp: boolean;
      followUpQuestions?: string[];
      suggestedNextSteps: string[];
      escalateTo?: string[];
      delegateTo?: string[];
    };
  }) {
    try {
      return await this.makeRequest(`/services/agent-counseling/sessions/${sessionId}/respond-as-employee`, {
        method: 'POST',
        body: payload,
      });
    } catch (error) {
      this.handleError(error as Error, `/services/agent-counseling/sessions/${sessionId}/respond-as-employee`);
    }
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Initialize on app start
apiClient.loadAuthTokens();

export default apiClient;
