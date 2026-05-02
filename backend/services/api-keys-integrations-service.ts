/**
 * API Keys and Integrations Management Service
 * Manages external API keys and platform integrations
 */

import { eq, and, or, desc, asc } from 'drizzle-orm';
import { db } from '../db/connection';
import {
  apiKeys,
  integrations,
  integrationLogs,
  webhooks,
  type ApiKey,
  type Integration,
  type IntegrationLog,
  type Webhook,
} from '../db/drizzle-schema';
import { logAudit } from '../lib/audit';
import { createLogger } from '../lib/production-logger';
import crypto from 'crypto';

const logger = createLogger('ApiKeysIntegrations');

// Integration Types
export type IntegrationType =
  | 'crm'
  | 'email'
  | 'payment'
  | 'messaging'
  | 'calendar'
  | 'storage'
  | 'analytics'
  | 'social'
  | 'support'
  | 'custom';

export type IntegrationStatus = 'active' | 'inactive' | 'error' | 'pending';
export type ApiKeyStatus = 'active' | 'revoked' | 'expired';
export type WebhookStatus = 'active' | 'inactive' | 'failed';

// API Key Configuration
export interface ApiKeyConfig {
  name: string;
  description?: string;
  scopes: string[];
  rateLimit?: {
    requests: number;
    window: number; // seconds
  };
  expiresAt?: Date;
  ipWhitelist?: string[];
  metadata?: Record<string, unknown>;
}

// Integration Configuration
export interface IntegrationConfig {
  name: string;
  description?: string;
  type: IntegrationType;
  provider: string;
  credentials: {
    apiKey?: string;
    apiSecret?: string;
    oauthToken?: string;
    refreshToken?: string;
    username?: string;
    password?: string;
    baseUrl?: string;
    webhookSecret?: string;
    [key: string]: unknown;
  };
  settings: {
    autoSync: boolean;
    syncInterval: number; // minutes
    retryAttempts: number;
    timeout: number; // seconds
    batchSize?: number;
    filters?: Record<string, unknown>;
    mappings?: Record<string, string>;
  };
  webhooks?: {
    incoming?: string[];
    outgoing?: string[];
  };
}

// Webhook Configuration
export interface WebhookConfig {
  name: string;
  url: string;
  events: string[];
  secret?: string;
  method: 'POST' | 'PUT' | 'PATCH';
  headers?: Record<string, string>;
  retryPolicy?: {
    maxRetries: number;
    backoffMultiplier: number;
    initialDelay: number;
  };
  Filter?: {
    field: string;
    operator: 'equals' | 'contains' | 'starts-with' | 'ends-with';
    value: string;
  };
}

// Integration Event
export interface IntegrationEvent {
  eventId: string;
  integrationId: string;
  type: string;
  payload: unknown;
  direction: 'incoming' | 'outgoing';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: Date;
  error?: string;
}

// API Usage Stats
export interface ApiUsageStats {
  apiKeyId: string;
  period: { start: Date; end: Date };
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  requestsByEndpoint: Map<string, number>;
  topIps: { ip: string; count: number }[];
}

class ApiKeysIntegrationsService {
  // Generate new API key
  async generateApiKey(
    userId: string,
    organizationId: string,
    config: ApiKeyConfig
  ): Promise<{ success: boolean; apiKey?: string; keyId?: string; error?: string }> {
    try {
      const keyId = crypto.randomUUID();
      const apiKey = `kd_${crypto.randomBytes(32).toString('hex')}`;

      // Hash the key for storage
      const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

      await db.insert(apiKeys).values({
        id: keyId,
        key: hashedKey, // Store hash, not the actual key
        name: config.name,
        description: config.description,
        userId,
        organizationId,
        scopes: config.scopes,
        rateLimitRequests: config.rateLimit?.requests,
        rateLimitWindow: config.rateLimit?.window,
        expiresAt: config.expiresAt,
        ipWhitelist: config.ipWhitelist,
        status: 'active',
        lastUsedAt: null,
        metadata: config.metadata ? JSON.stringify(config.metadata) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await logAudit({
        userId,
        organizationId,
        action: 'api_key_generated',
        resource: 'api_key',
        resourceId: keyId,
        details: { name: config.name, scopes: config.scopes },
      });

      // Return the unhashed key (only shown once)
      return {
        success: true,
        apiKey,
        keyId,
      };
    } catch (error) {
      logger.error('Error generating API key', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate API key',
      };
    }
  }

  // Validate API key
  async validateApiKey(
    apiKey: string,
    requiredScopes?: string[]
  ): Promise<{ valid: boolean; keyId?: string; scopes?: string[]; error?: string }> {
    try {
      // Hash the provided key
      const hashedKey = crypto.createHash('sha256').update(apiKey).digest('hex');

      // Find key in database
      const [keyRecord] = await db.select().from(apiKeys)
        .where(
          and(
            eq(apiKeys.key, hashedKey),
            eq(apiKeys.status, 'active')
          )
        );

      if (!keyRecord) {
        return { valid: false, error: 'Invalid API key' };
      }

      // Check expiration
      if (keyRecord.expiresAt && new Date(keyRecord.expiresAt) < new Date()) {
        await db.update(apiKeys)
          .set({ status: 'expired', updatedAt: new Date() })
          .where(eq(apiKeys.id, keyRecord.id));
        return { valid: false, error: 'API key has expired' };
      }

      // Check scopes
      const keyScopes = keyRecord.scopes as string[];
      if (requiredScopes && requiredScopes.length > 0) {
        const hasRequiredScopes = requiredScopes.every(scope => keyScopes.includes(scope));
        if (!hasRequiredScopes) {
          return { valid: false, error: 'Insufficient permissions' };
        }
      }

      // Update last used
      await db.update(apiKeys)
        .set({ lastUsedAt: new Date(), updatedAt: new Date() })
        .where(eq(apiKeys.id, keyRecord.id));

      return {
        valid: true,
        keyId: keyRecord.id,
        scopes: keyScopes,
      };
    } catch (error) {
      logger.error('Error validating API key', error as Error);
      return { valid: false, error: 'Validation error' };
    }
  }

  // Revoke API key
  async revokeApiKey(
    keyId: string,
    userId: string,
    reason?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await db.update(apiKeys)
        .set({
          status: 'revoked',
          revokedAt: new Date(),
          revokedBy: userId,
          revokeReason: reason,
          updatedAt: new Date(),
        })
        .where(eq(apiKeys.id, keyId));

      await logAudit({
        userId,
        action: 'api_key_revoked',
        resource: 'api_key',
        resourceId: keyId,
        details: { reason },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error revoking API key', error as Error);
      return { success: false, error: 'Failed to revoke API key' };
    }
  }

  // Get API keys for organization
  async getOrganizationApiKeys(
    organizationId: string,
    options?: {
      status?: ApiKeyStatus;
      userId?: string;
    }
  ): Promise<ApiKey[]> {
    let query = db.select().from(apiKeys)
      .where(eq(apiKeys.organizationId, organizationId))
      .orderBy(desc(apiKeys.createdAt));

    if (options?.status) {
      query = query.where(eq(apiKeys.status, options.status));
    }
    if (options?.userId) {
      query = query.where(eq(apiKeys.userId, options.userId));
    }

    return await query;
  }

  // Create integration
  async createIntegration(
    organizationId: string,
    config: IntegrationConfig,
    userId?: string
  ): Promise<{ success: boolean; integrationId?: string; error?: string }> {
    try {
      const integrationId = crypto.randomUUID();

      // Encrypt sensitive credentials
      const encryptedCredentials = this.encryptCredentials(config.credentials);

      await db.insert(integrations).values({
        id: integrationId,
        organizationId,
        name: config.name,
        description: config.description,
        type: config.type,
        provider: config.provider,
        credentials: JSON.stringify(encryptedCredentials),
        settings: JSON.stringify(config.settings),
        status: 'pending',
        lastSyncAt: null,
        errorMessage: null,
        metadata: null,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Create webhooks if specified
      if (config.webhooks) {
        for (const url of config.webhooks.outgoing || []) {
          await this.createWebhook(integrationId, {
            name: `${config.name} Outgoing Webhook`,
            url,
            events: ['*'],
            method: 'POST',
          }, userId);
        }
      }

      await logAudit({
        userId: userId || 'system',
        organizationId,
        action: 'integration_created',
        resource: 'integration',
        resourceId: integrationId,
        details: { name: config.name, type: config.type, provider: config.provider },
      });

      return { success: true, integrationId };
    } catch (error) {
      logger.error('Error creating integration', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create integration',
      };
    }
  }

  // Test integration connection
  async testIntegration(integrationId: string): Promise<{
    success: boolean;
    connected?: boolean;
    error?: string;
    details?: any;
  }> {
    try {
      const [integration] = await db.select().from(integrations)
        .where(eq(integrations.id, integrationId));

      if (!integration) {
        return { success: false, error: 'Integration not found' };
      }

      const credentials = this.decryptCredentials(
        JSON.parse(integration.credentials as string)
      );
      const settings = JSON.parse(integration.settings as string);

      // Test connection based on provider
      const testResult = await this.testProviderConnection(
        integration.provider,
        credentials,
        settings
      );

      // Update integration status
      await db.update(integrations)
        .set({
          status: testResult.success ? 'active' : 'error',
          errorMessage: testResult.success ? null : testResult.error,
          updatedAt: new Date(),
        })
        .where(eq(integrations.id, integrationId));

      // Log the test
      await this.logIntegrationEvent(
        integrationId,
        'connection_test',
        testResult.success ? 'completed' : 'failed',
        testResult,
        testResult.success ? undefined : testResult.error
      );

      return testResult;
    } catch (error) {
      logger.error('Error testing integration', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Test failed',
      };
    }
  }

  // Update integration
  async updateIntegration(
    integrationId: string,
    updates: Partial<IntegrationConfig>,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const updateData: any = { updatedAt: new Date() };

      if (updates.name) updateData.name = updates.name;
      if (updates.description) updateData.description = updates.description;
      if (updates.credentials) {
        updateData.credentials = JSON.stringify(
          this.encryptCredentials(updates.credentials)
        );
      }
      if (updates.settings) updateData.settings = JSON.stringify(updates.settings);

      await db.update(integrations)
        .set(updateData)
        .where(eq(integrations.id, integrationId));

      await logAudit({
        userId: userId || 'system',
        action: 'integration_updated',
        resource: 'integration',
        resourceId: integrationId,
        details: { updates: Object.keys(updates) },
      });

      return { success: true };
    } catch (error) {
      logger.error('Error updating integration', error as Error);
      return { success: false, error: 'Failed to update integration' };
    }
  }

  // Delete integration
  async deleteIntegration(
    integrationId: string,
    userId?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Delete associated webhooks
      await db.delete(webhooks).where(eq(webhooks.integrationId, integrationId));

      // Delete logs
      await db.delete(integrationLogs).where(eq(integrationLogs.integrationId, integrationId));

      // Delete integration
      await db.delete(integrations).where(eq(integrations.id, integrationId));

      await logAudit({
        userId: userId || 'system',
        action: 'integration_deleted',
        resource: 'integration',
        resourceId: integrationId,
      });

      return { success: true };
    } catch (error) {
      logger.error('Error deleting integration', error as Error);
      return { success: false, error: 'Failed to delete integration' };
    }
  }

  // Get integrations
  async getIntegrations(
    organizationId: string,
    options?: {
      type?: IntegrationType;
      status?: IntegrationStatus;
      provider?: string;
    }
  ): Promise<Integration[]> {
    let query = db.select().from(integrations)
      .where(eq(integrations.organizationId, organizationId))
      .orderBy(desc(integrations.updatedAt));

    if (options?.type) {
      query = query.where(eq(integrations.type, options.type));
    }
    if (options?.status) {
      query = query.where(eq(integrations.status, options.status));
    }
    if (options?.provider) {
      query = query.where(eq(integrations.provider, options.provider));
    }

    return await query;
  }

  // Get integration by ID
  async getIntegrationById(integrationId: string): Promise<Integration | null> {
    const [integration] = await db.select().from(integrations)
      .where(eq(integrations.id, integrationId));
    return integration || null;
  }

  // Sync integration data
  async syncIntegration(
    integrationId: string,
    options?: {
      fullSync?: boolean;
      entityTypes?: string[];
      since?: Date;
    }
  ): Promise<{ success: boolean; synced?: number; error?: string }> {
    try {
      const integration = await this.getIntegrationById(integrationId);
      if (!integration) {
        return { success: false, error: 'Integration not found' };
      }

      if (integration.status !== 'active') {
        return { success: false, error: 'Integration is not active' };
      }

      const credentials = this.decryptCredentials(
        JSON.parse(integration.credentials as string)
      );
      const settings = JSON.parse(integration.settings as string);

      // Perform sync based on provider
      const syncResult = await this.performSync(
        integration.provider,
        credentials,
        settings,
        options
      );

      // Update last sync time
      await db.update(integrations)
        .set({
          lastSyncAt: new Date(),
          status: syncResult.success ? 'active' : 'error',
          errorMessage: syncResult.success ? null : syncResult.error,
          updatedAt: new Date(),
        })
        .where(eq(integrations.id, integrationId));

      // Log sync
      await this.logIntegrationEvent(
        integrationId,
        'sync',
        syncResult.success ? 'completed' : 'failed',
        { synced: syncResult.synced },
        syncResult.success ? undefined : syncResult.error
      );

      return syncResult;
    } catch (error) {
      logger.error('Error syncing integration', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      };
    }
  }

  // Create webhook
  async createWebhook(
    integrationId: string,
    config: WebhookConfig,
    userId?: string
  ): Promise<{ success: boolean; webhookId?: string; error?: string }> {
    try {
      const webhookId = crypto.randomUUID();

      await db.insert(webhooks).values({
        id: webhookId,
        integrationId,
        name: config.name,
        url: config.url,
        events: config.events,
        secret: config.secret ? this.encrypt(config.secret) : null,
        method: config.method,
        headers: config.headers ? JSON.stringify(config.headers) : null,
        retryPolicy: config.retryPolicy ? JSON.stringify(config.retryPolicy) : null,
        filter: config.Filter ? JSON.stringify(config.Filter) : null,
        status: 'active',
        lastTriggeredAt: null,
        failureCount: 0,
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await logAudit({
        userId: userId || 'system',
        action: 'webhook_created',
        resource: 'webhook',
        resourceId: webhookId,
        details: { integrationId, events: config.events },
      });

      return { success: true, webhookId };
    } catch (error) {
      logger.error('Error creating webhook', error as Error);
      return { success: false, error: 'Failed to create webhook' };
    }
  }

  // Trigger webhook
  async triggerWebhook(
    webhookId: string,
    event: string,
    payload: any
  ): Promise<{ success: boolean; deliveryId?: string; error?: string }> {
    try {
      const [webhook] = await db.select().from(webhooks)
        .where(
          and(
            eq(webhooks.id, webhookId),
            eq(webhooks.status, 'active')
          )
        );

      if (!webhook) {
        return { success: false, error: 'Webhook not found or inactive' };
      }

      // Check if event matches
      if (!webhook.events.includes('*') && !webhook.events.includes(event)) {
        return { success: false, error: 'Event not subscribed' };
      }

      // Check Filter
      if (webhook.Filter) {
        const filter = JSON.parse(webhook.Filter as string);
        const shouldTrigger = this.evaluateFilter(payload, Filter);
        if (!shouldTrigger) {
          return { success: true, deliveryId: 'filtered' }; // Filtered out, not an error
        }
      }

      // Prepare headers
      const headers: Record<string, string> = webhook.headers
        ? JSON.parse(webhook.headers as string)
        : {};

      if (webhook.secret) {
        const signature = this.generateWebhookSignature(payload, this.decrypt(webhook.secret));
        headers['X-Webhook-Signature'] = signature;
      }

      headers['Content-Type'] = 'application/json';
      headers['X-Webhook-Event'] = event;
      headers['X-Webhook-ID'] = webhookId;

      // Send webhook
      const response = await fetch(webhook.url, {
        method: webhook.method,
        headers,
        body: JSON.stringify({
          event,
          timestamp: new Date().toISOString(),
          payload,
        }),
      });

      // Update webhook stats
      const deliveryId = crypto.randomUUID();

      await db.update(webhooks)
        .set({
          lastTriggeredAt: new Date(),
          failureCount: response.ok ? 0 : (webhook.failureCount || 0) + 1,
          status: response.ok ? 'active' : (webhook.failureCount || 0) >= 4 ? 'failed' : 'active',
          updatedAt: new Date(),
        })
        .where(eq(webhooks.id, webhookId));

      // Log delivery
      await this.logIntegrationEvent(
        webhook.integrationId,
        'webhook_delivery',
        response.ok ? 'completed' : 'failed',
        {
          webhookId,
          event,
          deliveryId,
          statusCode: response.status,
        },
        response.ok ? undefined : `HTTP ${response.status}`
      );

      return {
        success: response.ok,
        deliveryId,
        error: response.ok ? undefined : `HTTP ${response.status}`,
      };
    } catch (error) {
      logger.error('Error triggering webhook', error as Error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook delivery failed',
      };
    }
  }

  // Get integration logs
  async getIntegrationLogs(
    integrationId: string,
    options?: {
      eventType?: string;
      status?: string;
      startDate?: Date;
      endDate?: Date;
      limit?: number;
    }
  ): Promise<IntegrationLog[]> {
    let query = db.select().from(integrationLogs)
      .where(eq(integrationLogs.integrationId, integrationId))
      .orderBy(desc(integrationLogs.timestamp))
      .limit(options?.limit || 100);

    if (options?.eventType) {
      query = query.where(eq(integrationLogs.eventType, options.eventType));
    }
    if (options?.status) {
      query = query.where(eq(integrationLogs.status, options.status));
    }
    if (options?.startDate && options?.endDate) {
      query = query.where(
        and(
          sql`${integrationLogs.timestamp} >= ${options.startDate}`,
          sql`${integrationLogs.timestamp} <= ${options.endDate}`
        )
      );
    }

    return await query;
  }

  // Get API usage stats
  async getApiUsageStats(
    apiKeyId: string,
    period: { start: Date; end: Date }
  ): Promise<ApiUsageStats | null> {
    try {
      // This would query from API access logs
      // For now, return mock data
      return {
        apiKeyId,
        period,
        totalRequests: 1500,
        successfulRequests: 1450,
        failedRequests: 50,
        averageResponseTime: 120,
        requestsByEndpoint: new Map([
          ['/api/v1/agents', 500],
          ['/api/v1/tasks', 600],
          ['/api/v1/messages', 400],
        ]),
        topIps: [
          { ip: '192.168.1.1', count: 800 },
          { ip: '10.0.0.1', count: 400 },
        ],
      };
    } catch (error) {
      logger.error('Error getting API usage stats', error as Error);
      return null;
    }
  }

  // Get available integrations catalog
  async getIntegrationCatalog(): Promise<{
    id: string;
    name: string;
    type: IntegrationType;
    description: string;
    icon: string;
    features: string[];
    authType: 'api-key' | 'oauth' | 'basic' | 'token';
    documentationUrl: string;
    popular: boolean;
  }[]> {
    return [
      {
        id: 'salesforce',
        name: 'Salesforce',
        type: 'crm',
        description: 'Sync leads, contacts, and opportunities with Salesforce CRM',
        icon: 'salesforce',
        features: ['Lead sync', 'Contact management', 'Opportunity tracking', 'Campaign integration'],
        authType: 'oauth',
        documentationUrl: 'https://docs.kaytx.ai/integrations/salesforce',
        popular: true,
      },
      {
        id: 'hubspot',
        name: 'HubSpot',
        type: 'crm',
        description: 'Integrate with HubSpot for marketing automation and CRM',
        icon: 'hubspot',
        features: ['Contact sync', 'Email tracking', 'Form submissions', 'Deal pipeline'],
        authType: 'api-key',
        documentationUrl: 'https://docs.kaytx.ai/integrations/hubspot',
        popular: true,
      },
      {
        id: 'stripe',
        name: 'Stripe',
        type: 'payment',
        description: 'Process payments and manage subscriptions with Stripe',
        icon: 'stripe',
        features: ['Payment processing', 'Subscription management', 'Invoice generation', 'Refund handling'],
        authType: 'api-key',
        documentationUrl: 'https://docs.kaytx.ai/integrations/stripe',
        popular: true,
      },
      {
        id: 'twilio',
        name: 'Twilio',
        type: 'messaging',
        description: 'Send SMS, make calls, and use WhatsApp with Twilio',
        icon: 'twilio',
        features: ['SMS messaging', 'Voice calls', 'WhatsApp integration', 'Phone number management'],
        authType: 'api-key',
        documentationUrl: 'https://docs.kaytx.ai/integrations/twilio',
        popular: true,
      },
      {
        id: 'sendgrid',
        name: 'SendGrid',
        type: 'email',
        description: 'Send transactional and marketing emails via SendGrid',
        icon: 'sendgrid',
        features: ['Email campaigns', 'Template management', 'Analytics', 'Contact lists'],
        authType: 'api-key',
        documentationUrl: 'https://docs.kaytx.ai/integrations/sendgrid',
        popular: true,
      },
      {
        id: 'slack',
        name: 'Slack',
        type: 'messaging',
        description: 'Send notifications and interact with Slack workspaces',
        icon: 'slack',
        features: ['Channel messages', 'Direct messages', 'Slash commands', 'Bot interactions'],
        authType: 'oauth',
        documentationUrl: 'https://docs.kaytx.ai/integrations/slack',
        popular: true,
      },
      {
        id: 'google-calendar',
        name: 'Google Calendar',
        type: 'calendar',
        description: 'Sync events and manage calendars with Google Calendar',
        icon: 'google-calendar',
        features: ['Event sync', 'Availability checking', 'Meeting scheduling', 'Reminder management'],
        authType: 'oauth',
        documentationUrl: 'https://docs.kaytx.ai/integrations/google-calendar',
        popular: true,
      },
      {
        id: 's3',
        name: 'Amazon S3',
        type: 'storage',
        description: 'Store and retrieve files from Amazon S3',
        icon: 'aws',
        features: ['File upload', 'File download', 'Presigned URLs', 'Bucket management'],
        authType: 'api-key',
        documentationUrl: 'https://docs.kaytx.ai/integrations/s3',
        popular: false,
      },
      {
        id: 'zendesk',
        name: 'Zendesk',
        type: 'support',
        description: 'Create and manage support tickets with Zendesk',
        icon: 'zendesk',
        features: ['Ticket creation', 'Ticket updates', 'Customer lookup', 'Knowledge base'],
        authType: 'api-key',
        documentationUrl: 'https://docs.kaytx.ai/integrations/zendesk',
        popular: true,
      },
      {
        id: 'google-analytics',
        name: 'Google Analytics',
        type: 'analytics',
        description: 'Track and analyze website traffic with Google Analytics',
        icon: 'google-analytics',
        features: ['Page views', 'Event tracking', 'Conversion tracking', 'Audience insights'],
        authType: 'oauth',
        documentationUrl: 'https://docs.kaytx.ai/integrations/google-analytics',
        popular: false,
      },
    ];
  }

  // Private helper methods

  private encryptCredentials(credentials: any): any {
    const encrypted: any = {};
    for (const [key, value] of Object.entries(credentials)) {
      if (value && typeof value === 'string' && this.shouldEncrypt(key)) {
        encrypted[key] = this.encrypt(value);
      } else {
        encrypted[key] = value;
      }
    }
    return encrypted;
  }

  private decryptCredentials(encrypted: any): any {
    const decrypted: any = {};
    for (const [key, value] of Object.entries(encrypted)) {
      if (value && typeof value === 'string' && this.shouldEncrypt(key)) {
        decrypted[key] = this.decrypt(value);
      } else {
        decrypted[key] = value;
      }
    }
    return decrypted;
  }

  private shouldEncrypt(key: string): boolean {
    const sensitiveKeys = ['apiKey', 'apiSecret', 'oauthToken', 'refreshToken', 'password', 'secret', 'webhookSecret'];
    return sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()));
  }

  private encrypt(text: string): string {
    // In production, use proper encryption (e.g., AES-256-GCM with KMS)
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY || 'default-key');
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `enc:${encrypted}`;
  }

  private decrypt(encrypted: string): string {
    if (!encrypted.startsWith('enc:')) return encrypted;
    const text = encrypted.slice(4);
    const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY || 'default-key');
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private async testProviderConnection(
    provider: string,
    credentials: any,
    settings: any
  ): Promise<{ success: boolean; connected?: boolean; error?: string; details?: any }> {
    try {
      // This would test the actual connection to each provider
      // For now, simulate successful connection
      logger.info(`Testing connection to ${provider}`);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        connected: true,
        details: { provider, testedAt: new Date().toISOString() },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection test failed',
      };
    }
  }

  private async performSync(
    provider: string,
    credentials: any,
    settings: any,
    options?: any
  ): Promise<{ success: boolean; synced?: number; error?: string }> {
    try {
      // This would perform the actual sync operation
      // For now, simulate sync
      logger.info(`Syncing ${provider} integration`);

      const synced = Math.floor(Math.random() * 100);

      return {
        success: true,
        synced,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      };
    }
  }

  private evaluateFilter(payload: any, filter: any): boolean {
    const value = this.getNestedValue(payload, Filter.field);
    const filterValue = Filter.value;

    switch (Filter.operator) {
      case 'equals':
        return value === filterValue;
      case 'contains':
        return String(value).includes(String(filterValue));
      case 'starts-with':
        return String(value).startsWith(String(filterValue));
      case 'ends-with':
        return String(value).endsWith(String(filterValue));
      default:
        return true;
    }
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private generateWebhookSignature(payload: any, secret: string): string {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    return `sha256=${hmac.digest('hex')}`;
  }

  private async logIntegrationEvent(
    integrationId: string,
    eventType: string,
    status: string,
    payload: any,
    error?: string
  ): Promise<void> {
    try {
      await db.insert(integrationLogs).values({
        id: crypto.randomUUID(),
        integrationId,
        eventType,
        status,
        payload: JSON.stringify(payload),
        errorMessage: error,
        timestamp: new Date(),
        createdAt: new Date(),
      });
    } catch (err) {
      logger.error('Error logging integration event', err as Error);
    }
  }
}

// Export singleton instance
export const apiKeysIntegrationsService = new ApiKeysIntegrationsService();
