import { z } from "zod";
import { publicProcedure } from "../../../create-context";
import type { AgentConnection } from "../types";

const mockConnections: AgentConnection[] = [
  {
    id: 'conn-1',
    agentId: 'ce-1',
    platformId: 'twilio',
    platformName: 'Twilio',
    connectionType: 'api',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60000).toISOString(),
    syncFrequency: '5 minutes',
    permissions: ['make_calls', 'receive_calls', 'send_sms', 'read_logs'],
    metadata: { accountSid: 'AC***', region: 'us-east-1' },
  },
  {
    id: 'conn-2',
    agentId: 'ce-2',
    platformId: 'zendesk',
    platformName: 'Zendesk',
    connectionType: 'oauth',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60000).toISOString(),
    syncFrequency: '1 minute',
    permissions: ['read_tickets', 'write_tickets', 'manage_users', 'view_reports'],
    metadata: { subdomain: 'company', plan: 'enterprise' },
  },
  {
    id: 'conn-3',
    agentId: 'sr-1',
    platformId: 'salesforce',
    platformName: 'Salesforce',
    connectionType: 'oauth',
    status: 'connected',
    lastSync: new Date(Date.now() - 1 * 60000).toISOString(),
    syncFrequency: '1 minute',
    permissions: ['read_leads', 'write_leads', 'read_opportunities', 'write_opportunities', 'read_accounts'],
    metadata: { orgId: '00D***', edition: 'enterprise' },
  },
  {
    id: 'conn-4',
    agentId: 'sr-4',
    platformId: 'hubspot',
    platformName: 'HubSpot',
    connectionType: 'oauth',
    status: 'connected',
    lastSync: new Date(Date.now() - 3 * 60000).toISOString(),
    syncFrequency: '5 minutes',
    permissions: ['crm.objects.contacts.read', 'crm.objects.deals.read', 'crm.objects.deals.write'],
    metadata: { portalId: '123456', tier: 'professional' },
  },
  {
    id: 'conn-5',
    agentId: 'mg-3',
    platformId: 'google-ads',
    platformName: 'Google Ads',
    connectionType: 'oauth',
    status: 'connected',
    lastSync: new Date(Date.now() - 10 * 60000).toISOString(),
    syncFrequency: '15 minutes',
    permissions: ['manage_campaigns', 'read_reports', 'manage_budgets'],
    metadata: { customerId: '123-456-7890', accountType: 'manager' },
  },
  {
    id: 'conn-6',
    agentId: 'mg-5',
    platformId: 'meta',
    platformName: 'Meta Business Suite',
    connectionType: 'oauth',
    status: 'connected',
    lastSync: new Date(Date.now() - 8 * 60000).toISOString(),
    syncFrequency: '10 minutes',
    permissions: ['pages_manage_posts', 'pages_read_engagement', 'ads_management'],
    metadata: { businessId: '1234567890', pages: ['Company Page'] },
  },
  {
    id: 'conn-7',
    agentId: 'mg-7',
    platformId: 'mailchimp',
    platformName: 'Mailchimp',
    connectionType: 'api',
    status: 'connected',
    lastSync: new Date(Date.now() - 15 * 60000).toISOString(),
    syncFrequency: '30 minutes',
    permissions: ['campaigns:read', 'campaigns:write', 'lists:read', 'reports:read'],
    metadata: { datacenter: 'us1', plan: 'standard' },
  },
  {
    id: 'conn-8',
    agentId: 'om-2',
    platformId: 'zapier',
    platformName: 'Zapier',
    connectionType: 'webhook',
    status: 'connected',
    lastSync: new Date(Date.now() - 1 * 60000).toISOString(),
    syncFrequency: 'real-time',
    permissions: ['trigger_zaps', 'read_zaps', 'manage_zaps'],
    metadata: { zapsActive: 45, plan: 'professional' },
  },
  {
    id: 'conn-9',
    agentId: 'di-1',
    platformId: 'bigquery',
    platformName: 'Google BigQuery',
    connectionType: 'api',
    status: 'connected',
    lastSync: new Date(Date.now() - 30 * 60000).toISOString(),
    syncFrequency: '1 hour',
    permissions: ['bigquery.datasets.get', 'bigquery.tables.getData', 'bigquery.jobs.create'],
    metadata: { projectId: 'analytics-prod', location: 'US' },
  },
  {
    id: 'conn-10',
    agentId: 'di-7',
    platformId: 'stripe',
    platformName: 'Stripe',
    connectionType: 'api',
    status: 'connected',
    lastSync: new Date(Date.now() - 1 * 60000).toISOString(),
    syncFrequency: 'real-time',
    permissions: ['read_charges', 'read_disputes', 'read_refunds', 'webhook_events'],
    metadata: { mode: 'live', webhooksConfigured: true },
  },
  {
    id: 'conn-11',
    agentId: 'ce-8',
    platformId: 'stripe',
    platformName: 'Stripe Billing',
    connectionType: 'api',
    status: 'connected',
    lastSync: new Date(Date.now() - 2 * 60000).toISOString(),
    syncFrequency: '5 minutes',
    permissions: ['read_subscriptions', 'read_invoices', 'manage_disputes'],
    metadata: { mode: 'live', billingEnabled: true },
  },
  {
    id: 'conn-12',
    agentId: 'sr-6',
    platformId: 'docusign',
    platformName: 'DocuSign',
    connectionType: 'oauth',
    status: 'pending',
    lastSync: '',
    syncFrequency: '15 minutes',
    permissions: ['signature:impersonation', 'extended'],
    metadata: { accountId: '', status: 'awaiting_authorization' },
  },
  {
    id: 'conn-13',
    agentId: 'om-6',
    platformId: 'jira',
    platformName: 'Jira',
    connectionType: 'oauth',
    status: 'connected',
    lastSync: new Date(Date.now() - 5 * 60000).toISOString(),
    syncFrequency: '5 minutes',
    permissions: ['read:jira-work', 'write:jira-work', 'manage:jira-project'],
    metadata: { cloudId: 'abc-123', siteUrl: 'company.atlassian.net' },
  },
  {
    id: 'conn-14',
    agentId: 'mg-6',
    platformId: 'semrush',
    platformName: 'SEMrush',
    connectionType: 'api',
    status: 'error',
    lastSync: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    syncFrequency: '1 hour',
    permissions: ['domain_analytics', 'keyword_research', 'backlink_analytics'],
    metadata: { error: 'API key expired', lastError: 'Authentication failed' },
  },
];

export const getConnectionsProcedure = publicProcedure
  .input(z.object({
    agentId: z.string().optional(),
    platformId: z.string().optional(),
    status: z.enum(['connected', 'disconnected', 'pending', 'error', 'all']).optional(),
  }).optional())
  .query(({ input }) => {
    let connections = mockConnections;
    
    if (input?.agentId) {
      connections = connections.filter(c => c.agentId === input.agentId);
    }
    
    if (input?.platformId) {
      connections = connections.filter(c => c.platformId === input.platformId);
    }
    
    if (input?.status && input.status !== 'all') {
      connections = connections.filter(c => c.status === input.status);
    }
    
    return {
      connections,
      stats: {
        total: connections.length,
        connected: connections.filter(c => c.status === 'connected').length,
        pending: connections.filter(c => c.status === 'pending').length,
        error: connections.filter(c => c.status === 'error').length,
      },
    };
  });

export const connectAgentToPlatformProcedure = publicProcedure
  .input(z.object({
    agentId: z.string(),
    platformId: z.string(),
    connectionType: z.enum(['api', 'webhook', 'oauth', 'direct']),
    credentials: z.record(z.string(), z.string()).optional(),
  }))
  .mutation(({ input }) => {
    console.log(`Connecting agent ${input.agentId} to platform ${input.platformId}`);
    
    return {
      success: true,
      connectionId: `conn-${Date.now()}`,
      agentId: input.agentId,
      platformId: input.platformId,
      status: 'connected',
      message: `Successfully connected ${input.agentId} to ${input.platformId}`,
      timestamp: new Date().toISOString(),
    };
  });

export const disconnectAgentFromPlatformProcedure = publicProcedure
  .input(z.object({
    connectionId: z.string(),
  }))
  .mutation(({ input }) => {
    console.log(`Disconnecting connection ${input.connectionId}`);
    
    return {
      success: true,
      connectionId: input.connectionId,
      status: 'disconnected',
      message: `Connection ${input.connectionId} has been disconnected`,
      timestamp: new Date().toISOString(),
    };
  });

export const syncConnectionProcedure = publicProcedure
  .input(z.object({
    connectionId: z.string(),
  }))
  .mutation(({ input }) => {
    console.log(`Syncing connection ${input.connectionId}`);
    
    return {
      success: true,
      connectionId: input.connectionId,
      lastSync: new Date().toISOString(),
      message: `Connection ${input.connectionId} synced successfully`,
    };
  });

export const getAvailablePlatformsProcedure = publicProcedure
  .query(() => {
    return {
      platforms: [
        { id: 'twilio', name: 'Twilio', category: 'communication', icon: 'phone', description: 'Voice, SMS, and messaging APIs' },
        { id: 'zendesk', name: 'Zendesk', category: 'support', icon: 'headphones', description: 'Customer service platform' },
        { id: 'salesforce', name: 'Salesforce', category: 'crm', icon: 'cloud', description: 'CRM and sales automation' },
        { id: 'hubspot', name: 'HubSpot', category: 'crm', icon: 'target', description: 'Marketing, sales, and CRM platform' },
        { id: 'google-ads', name: 'Google Ads', category: 'advertising', icon: 'megaphone', description: 'Online advertising platform' },
        { id: 'meta', name: 'Meta Business Suite', category: 'social', icon: 'share', description: 'Facebook and Instagram management' },
        { id: 'mailchimp', name: 'Mailchimp', category: 'email', icon: 'mail', description: 'Email marketing platform' },
        { id: 'zapier', name: 'Zapier', category: 'automation', icon: 'zap', description: 'Workflow automation' },
        { id: 'bigquery', name: 'Google BigQuery', category: 'analytics', icon: 'database', description: 'Data warehouse and analytics' },
        { id: 'stripe', name: 'Stripe', category: 'payments', icon: 'credit-card', description: 'Payment processing' },
        { id: 'docusign', name: 'DocuSign', category: 'documents', icon: 'file-text', description: 'Electronic signature' },
        { id: 'jira', name: 'Jira', category: 'project', icon: 'clipboard', description: 'Project management' },
        { id: 'semrush', name: 'SEMrush', category: 'seo', icon: 'search', description: 'SEO and marketing toolkit' },
        { id: 'slack', name: 'Slack', category: 'communication', icon: 'message-circle', description: 'Team communication' },
        { id: 'intercom', name: 'Intercom', category: 'support', icon: 'message-square', description: 'Customer messaging platform' },
        { id: 'shopify', name: 'Shopify', category: 'ecommerce', icon: 'shopping-cart', description: 'E-commerce platform' },
        { id: 'quickbooks', name: 'QuickBooks', category: 'accounting', icon: 'dollar-sign', description: 'Accounting software' },
        { id: 'aws', name: 'AWS', category: 'cloud', icon: 'cloud', description: 'Cloud computing services' },
      ],
    };
  });
