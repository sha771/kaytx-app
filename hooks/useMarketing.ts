 
import { useState, useEffect, useCallback } from 'react';
import { apiClient, apiCall, useApiCall, useRealtimeSubscription } from '../lib/trpc-client';

type QueryResponse<T> = { data: T };

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'social';
  status: 'draft' | 'scheduled' | 'running' | 'completed' | 'paused';
  provider: string;
  content: {
    subject?: string;
    body?: string;
    media?: string[];
    template?: string;
  };
  targetAudience: {
    segments: string[];
    filters: Record<string, any>;
    estimatedReach: number;
  };
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    bounced: number;
    unsubscribed: number;
  };
  scheduling: {
    scheduledAt?: string;
    timezone?: string;
    frequency?: 'once' | 'daily' | 'weekly' | 'monthly';
  };
  budget?: {
    amount: number;
    currency: string;
    spent: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  score: number;
  tags: string[];
  customFields: Record<string, any>;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

interface Analytics {
  overview: {
    totalCampaigns: number;
    activeCampaigns: number;
    totalLeads: number;
    conversionRate: number;
    roi: number;
  };
  campaigns: {
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    performance: {
      campaignId: string;
      name: string;
      metrics: Campaign['metrics'];
    }[];
  };
  leads: {
    bySource: Record<string, number>;
    byStatus: Record<string, number>;
    scoreDistribution: {
      range: string;
      count: number;
    }[];
  };
  trends: {
    date: string;
    metrics: {
      leads: number;
      conversions: number;
      revenue: number;
    };
  }[];
}

interface CreateCampaignData {
  name: string;
  type: 'email' | 'sms' | 'push' | 'social';
  content: Campaign['content'];
  targetAudience: Campaign['targetAudience'];
  scheduling?: Campaign['scheduling'];
  budget?: Campaign['budget'];
}

export function useCampaigns() {
  // List campaigns
  const {
    data: campaigns,
    loading: loadingCampaigns,
    error: campaignsError,
    execute: fetchCampaigns
  } = useApiCall(
    () => apiClient.marketing.getCampaigns.query(),
    [],
    { immediate: true }
  );

  // Create campaign
  const createCampaign = useCallback(async (data: CreateCampaignData) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.createCampaign.mutate(data)
      );

      if (result.data) {
        // Refresh campaigns list
        await fetchCampaigns();
        return { success: true, campaign: result.data };
      }

      throw new Error('Failed to create campaign');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create campaign' 
      };
    }
  }, [fetchCampaigns]);

  // Update campaign
  const updateCampaign = useCallback(async (id: string, data: Partial<CreateCampaignData>) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.updateCampaign.mutate({ id, ...data })
      );

      if (result.data) {
        // Refresh campaigns list
        await fetchCampaigns();
        return { success: true, campaign: result.data };
      }

      throw new Error('Failed to update campaign');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update campaign' 
      };
    }
  }, [fetchCampaigns]);

  // Launch campaign
  const launchCampaign = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.launchCampaign.mutate({ id })
      );

      if (result.data) {
        // Refresh campaigns list
        await fetchCampaigns();
        return { success: true };
      }

      throw new Error('Failed to launch campaign');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to launch campaign' 
      };
    }
  }, [fetchCampaigns]);

  // Pause campaign
  const pauseCampaign = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.pauseCampaign.mutate({ id })
      );

      if (result.data) {
        // Refresh campaigns list
        await fetchCampaigns();
        return { success: true };
      }

      throw new Error('Failed to pause campaign');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to pause campaign' 
      };
    }
  }, [fetchCampaigns]);

  // Delete campaign
  const deleteCampaign = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.deleteCampaign.mutate({ id })
      );

      if (result.data) {
        // Refresh campaigns list
        await fetchCampaigns();
        return { success: true };
      }

      throw new Error('Failed to delete campaign');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete campaign' 
      };
    }
  }, [fetchCampaigns]);

  // Duplicate campaign
  const duplicateCampaign = useCallback(async (id: string, newName?: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.duplicateCampaign.mutate({ id, name: newName })
      );

      if (result.data) {
        // Refresh campaigns list
        await fetchCampaigns();
        return { success: true, campaign: result.data };
      }

      throw new Error('Failed to duplicate campaign');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to duplicate campaign' 
      };
    }
  }, [fetchCampaigns]);

  return {
    campaigns: campaigns?.data || [],
    loadingCampaigns,
    campaignsError,
    createCampaign,
    updateCampaign,
    launchCampaign,
    pauseCampaign,
    deleteCampaign,
    duplicateCampaign,
    refreshCampaigns: fetchCampaigns,
  };
}

export function useLeads() {
  // List leads
  const {
    data: leads,
    loading: loadingLeads,
    error: leadsError,
    execute: fetchLeads
  } = useApiCall(
    () => apiClient.marketing.getLeads.query(),
    [],
    { immediate: true }
  );

  // Create lead
  const createLead = useCallback(async (data: Partial<Lead>) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.createLead.mutate(data)
      );

      if (result.data) {
        // Refresh leads list
        await fetchLeads();
        return { success: true, lead: result.data };
      }

      throw new Error('Failed to create lead');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create lead' 
      };
    }
  }, [fetchLeads]);

  // Update lead
  const updateLead = useCallback(async (id: string, data: Partial<Lead>) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.updateLead.mutate({ id, ...data })
      );

      if (result.data) {
        // Refresh leads list
        await fetchLeads();
        return { success: true, lead: result.data };
      }

      throw new Error('Failed to update lead');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to update lead' 
      };
    }
  }, [fetchLeads]);

  // Delete lead
  const deleteLead = useCallback(async (id: string) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.deleteLead.mutate({ id })
      );

      if (result.data) {
        // Refresh leads list
        await fetchLeads();
        return { success: true };
      }

      throw new Error('Failed to delete lead');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to delete lead' 
      };
    }
  }, [fetchLeads]);

  // Import leads
  const importLeads = useCallback(async (file: File, mapping: Record<string, string>) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mapping', JSON.stringify(mapping));

      const result = await apiCall(() => 
        apiClient.marketing.importLeads.mutate(formData)
      );

      if (result.data) {
        // Refresh leads list
        await fetchLeads();
        return { 
          success: true, 
          imported: result.data.imported,
          failed: result.data.failed,
          errors: result.data.errors 
        };
      }

      throw new Error('Failed to import leads');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to import leads' 
      };
    }
  }, [fetchLeads]);

  return {
    leads: leads?.data || [],
    loadingLeads,
    leadsError,
    createLead,
    updateLead,
    deleteLead,
    importLeads,
    refreshLeads: fetchLeads,
  };
}

export function useMarketingAnalytics(period?: 'hour' | 'day' | 'week' | 'month') {
  const {
    data: analytics,
    loading: loadingAnalytics,
    error: analyticsError,
    execute: fetchAnalytics
  } = useApiCall(
    () => apiClient.marketing.getAnalytics.query({ period }),
    [period],
    { immediate: true }
  );

  return {
    analytics: analytics?.data,
    loadingAnalytics,
    analyticsError,
    refreshAnalytics: fetchAnalytics,
  };
}

export function useCampaignAnalytics(campaignId: string) {
  const {
    data: campaignAnalytics,
    loading: loadingCampaignAnalytics,
    error: campaignAnalyticsError,
    execute: fetchCampaignAnalytics
  } = useApiCall(
    () => apiClient.marketing.getCampaignAnalytics.query({ campaignId }),
    [campaignId],
    { immediate: true }
  );

  // Real-time campaign updates
  useRealtimeSubscription(`campaign:${campaignId}`, (update: any) => {
    // Refresh analytics when campaign metrics update
    fetchCampaignAnalytics();
  });

  return {
    campaignAnalytics: campaignAnalytics?.data,
    loadingCampaignAnalytics,
    campaignAnalyticsError,
    refreshCampaignAnalytics: fetchCampaignAnalytics,
  };
}

export function useEmailTemplates() {
  const {
    data: templates,
    loading: loadingTemplates,
    error: templatesError,
    execute: fetchTemplates
  } = useApiCall(
    () => apiClient.marketing.getEmailTemplates.query(),
    [],
    { immediate: true }
  );

  // Create template
  const createTemplate = useCallback(async (data: {
    name: string;
    subject: string;
    html: string;
    text?: string;
    category?: string;
  }) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.createEmailTemplate.mutate(data)
      );

      if (result.data) {
        // Refresh templates list
        await fetchTemplates();
        return { success: true, template: result.data };
      }

      throw new Error('Failed to create template');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create template' 
      };
    }
  }, [fetchTemplates]);

  return {
    templates: templates?.data || [],
    loadingTemplates,
    templatesError,
    createTemplate,
    refreshTemplates: fetchTemplates,
  };
}

export function useAudienceSegments() {
  const {
    data: segments,
    loading: loadingSegments,
    error: segmentsError,
    execute: fetchSegments
  } = useApiCall(
    () => apiClient.marketing.getAudienceSegments.query(),
    [],
    { immediate: true }
  );

  // Create segment
  const createSegment = useCallback(async (data: {
    name: string;
    description?: string;
    filters: Record<string, any>;
    estimatedSize?: number;
  }) => {
    try {
      const result = await apiCall(() => 
        apiClient.marketing.createAudienceSegment.mutate(data)
      );

      if (result.data) {
        // Refresh segments list
        await fetchSegments();
        return { success: true, segment: result.data };
      }

      throw new Error('Failed to create segment');
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create segment' 
      };
    }
  }, [fetchSegments]);

  return {
    segments: segments?.data || [],
    loadingSegments,
    segmentsError,
    createSegment,
    refreshSegments: fetchSegments,
  };
}

// Campaign templates
export const campaignTemplates = {
  email: {
    welcome: {
      name: 'Welcome Email',
      subject: 'Welcome to {{company}}!',
      content: {
        body: 'Thank you for joining us! We\'re excited to have you on board.',
        template: 'welcome',
      },
    },
    newsletter: {
      name: 'Monthly Newsletter',
      subject: '{{company}} Newsletter - {{month}}',
      content: {
        body: 'Check out what\'s new this month!',
        template: 'newsletter',
      },
    },
    promotion: {
      name: 'Special Promotion',
      subject: 'Limited Time Offer: {{discount}}% Off!',
      content: {
        body: 'Don\'t miss out on our special promotion.',
        template: 'promotion',
      },
    },
  },
  sms: {
    appointment: {
      name: 'Appointment Reminder',
      content: {
        body: 'Reminder: Your appointment is scheduled for {{date}} at {{time}}.',
      },
    },
    promotion: {
      name: 'SMS Promotion',
      content: {
        body: 'Get {{discount}}% off! Use code {{code}}. Valid until {{expiry}}.',
      },
    },
  },
};

// Common audience filters
export const audienceFilters = {
  demographics: {
    age: { type: 'range', min: 18, max: 100 },
    location: { type: 'location', options: ['country', 'state', 'city'] },
    language: { type: 'select', options: ['en', 'es', 'fr', 'de'] },
  },
  behavior: {
    lastPurchase: { type: 'date_range' },
    totalSpent: { type: 'range', min: 0, max: 100000 },
    visitFrequency: { type: 'select', options: ['daily', 'weekly', 'monthly'] },
  },
  engagement: {
    emailOpens: { type: 'range', min: 0, max: 100 },
    clickRate: { type: 'range', min: 0, max: 100 },
    lastActive: { type: 'date_range' },
  },
};
