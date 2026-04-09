import { db } from '../db/connection';
import { eq, and, gte, lte, desc, sql, inArray } from 'drizzle-orm';
import crypto from 'crypto';
import { EventEmitter } from 'events';
import { verifyWebhookSignature } from '../lib/constant-time-comparison';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface WebhookDefinition {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  url: string;
  events: string[];
  secret?: string;
  headers?: Record<string, string>;
  retryPolicy: {
    maxAttempts: number;
    backoffMs: number;
    timeoutMs: number;
  };
  status: 'active' | 'inactive' | 'paused';
  settings: {
    batchEvents?: boolean;
    batchSize?: number;
    batchWindowMs?: number;
    filterEvents?: (event: any) => boolean;
    transformPayload?: (event: any) => any;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  timestamp: Date;
  source: string;
  version: string;
  metadata?: Record<string, any>;
}

export interface WebhookDelivery {
  id: string;
  webhookId: string;
  eventId: string;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempts: number;
  lastAttempt?: Date;
  nextRetry?: Date;
  response?: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
    duration: number;
  };
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WebhookStats {
  totalWebhooks: number;
  activeWebhooks: number;
  totalDeliveries: number;
  successfulDeliveries: number;
  failedDeliveries: number;
  averageDeliveryTime: number;
  deliveriesByStatus: Record<string, number>;
  deliveriesByWebhook: {
    webhookId: string;
    webhookName: string;
    deliveries: number;
    successRate: number;
  }[];
  recentDeliveries: WebhookDelivery[];
}

export class UnifiedWebhookService extends EventEmitter {
  private deliveryQueue: WebhookDelivery[] = [];
  private activeDeliveries: Map<string, WebhookDelivery> = new Map();
  private maxConcurrentDeliveries: number = 20;
  private isProcessingQueue: boolean = false;
  private deliveryTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private queueProcessorInterval?: NodeJS.Timeout;
  private cleanupInterval?: NodeJS.Timeout;

  constructor() {
    super();
    this.startQueueProcessor();
    this.startCleanup();
  }

  /**
   * Create a new webhook
   */
  async createWebhook(organizationId: string, webhookData: Omit<WebhookDefinition, 'id' | 'createdAt' | 'updatedAt'>): Promise<WebhookDefinition> {
    try {
      const webhook: WebhookDefinition = {
        ...webhookData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Generate secret if not provided
      if (!webhook.secret) {
        webhook.secret = crypto.randomBytes(32).toString('hex');
      }

      // Store webhook in database (simplified - would use actual webhook table)
      logger.info(`Created webhook: ${webhook.id} for org: ${organizationId}`);

      this.emit('webhook:created', webhook);
      return webhook;
    } catch (error) {
      logger.error('[WebhookService] Failed to create webhook:', error);
      throw new Error('Failed to create webhook');
    }
  }

  /**
   * Trigger webhook events
   */
  async triggerEvent(event: WebhookEvent): Promise<void> {
    try {
      logger.info(`Triggering event: ${event.type}`);

      // Get webhooks that subscribe to this event
      const webhooks = await this.getWebhooksForEvent(event.type);

      for (const webhook of webhooks) {
        // Apply event filter if configured
        if (webhook.settings.filterEvents && !webhook.settings.filterEvents(event)) {
          continue;
        }

        // Transform payload if configured
        let payload = event;
        if (webhook.settings.transformPayload) {
          payload = webhook.settings.transformPayload(event);
        }

        // Create delivery record
        const delivery: WebhookDelivery = {
          id: crypto.randomUUID(),
          webhookId: webhook.id,
          eventId: event.id,
          status: 'pending',
          attempts: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Add to queue
        this.deliveryQueue.push(delivery);
        this.processQueue();

        this.emit('webhook:queued', delivery);
      }
    } catch (error) {
      logger.error('[WebhookService] Failed to trigger event:', error);
      throw new Error('Failed to trigger event');
    }
  }

  /**
   * Get webhooks for event type
   */
  private async getWebhooksForEvent(eventType: string): Promise<WebhookDefinition[]> {
    try {
      // Simplified - would query actual database
      logger.info(`Getting webhooks for event: ${eventType}`);
      return []; // Placeholder
    } catch (error) {
      logger.error('[WebhookService] Failed to get webhooks for event:', error);
      return [];
    }
  }

  /**
   * Get webhook by ID
   */
  async getWebhook(webhookId: string, organizationId: string): Promise<WebhookDefinition | null> {
    try {
      // Simplified - would query actual database
      logger.info(`Getting webhook: ${webhookId} for org: ${organizationId}`);
      return null; // Placeholder
    } catch (error) {
      logger.error('[WebhookService] Failed to get webhook:', error);
      throw new Error('Failed to get webhook');
    }
  }

  /**
   * List webhooks for organization
   */
  async listWebhooks(organizationId: string, filters?: {
    status?: string;
    event?: string;
    limit?: number;
    offset?: number;
  }): Promise<WebhookDefinition[]> {
    try {
      // Simplified - would query actual database with filters
      logger.info(`[WebhookService] Listing webhooks for org: ${organizationId}`, filters);
      return []; // Placeholder
    } catch (error) {
      logger.error('[WebhookService] Failed to list webhooks:', error);
      throw new Error('Failed to list webhooks');
    }
  }

  /**
   * Update webhook
   */
  async updateWebhook(webhookId: string, organizationId: string, updates: Partial<WebhookDefinition>): Promise<WebhookDefinition> {
    try {
      const webhook = await this.getWebhook(webhookId, organizationId);
      if (!webhook) {
        throw new Error('Webhook not found');
      }

      const updatedWebhook: WebhookDefinition = {
        ...webhook,
        ...updates,
        updatedAt: new Date(),
      };

      // Update in database
      logger.info(`Updated webhook: ${webhookId}`);

      this.emit('webhook:updated', updatedWebhook);
      return updatedWebhook;
    } catch (error) {
      logger.error('[WebhookService] Failed to update webhook:', error);
      throw new Error('Failed to update webhook');
    }
  }

  /**
   * Delete webhook
   */
  async deleteWebhook(webhookId: string, organizationId: string): Promise<boolean> {
    try {
      const webhook = await this.getWebhook(webhookId, organizationId);
      if (!webhook) {
        return false;
      }

      // Check for active deliveries
      const activeDeliveries = Array.from(this.activeDeliveries.values())
        .filter(delivery => delivery.webhookId === webhookId && delivery.status === 'pending');

      if (activeDeliveries.length > 0) {
        throw new Error('Cannot delete webhook with active deliveries');
      }

      // Delete from database
      logger.info(`Deleted webhook: ${webhookId}`);

      this.emit('webhook:deleted', webhook);
      return true;
    } catch (error) {
      logger.error('[WebhookService] Failed to delete webhook:', error);
      throw new Error('Failed to delete webhook');
    }
  }

  /**
   * Test webhook
   */
  async testWebhook(webhookId: string, organizationId: string, testData?: any): Promise<{
    success: boolean;
    response?: any;
    error?: string;
    duration: number;
  }> {
    try {
      const webhook = await this.getWebhook(webhookId, organizationId);
      if (!webhook) {
        throw new Error('Webhook not found');
      }

      const startTime = Date.now();
      
      const testEvent: WebhookEvent = {
        id: crypto.randomUUID(),
        type: 'webhook.test',
        data: testData || { message: 'Webhook test event' },
        timestamp: new Date(),
        source: 'webhook-service',
        version: '1.0',
      };

      const response = await this.deliverWebhook(webhook, testEvent);
      const duration = Date.now() - startTime;

      return {
        success: response.success,
        response: response.data,
        error: response.error,
        duration,
      };
    } catch (error) {
      logger.error('[WebhookService] Failed to test webhook:', error);
      throw new Error('Failed to test webhook');
    }
  }

  /**
   * Get webhook delivery
   */
  async getDelivery(deliveryId: string, organizationId: string): Promise<WebhookDelivery | null> {
    try {
      const delivery = this.activeDeliveries.get(deliveryId);
      if (delivery) {
        // Verify organization access
        const webhook = await this.getWebhook(delivery.webhookId, organizationId);
        if (webhook) {
          return delivery;
        }
      }
      return null;
    } catch (error) {
      logger.error('[WebhookService] Failed to get delivery:', error);
      throw new Error('Failed to get delivery');
    }
  }

  /**
   * List webhook deliveries
   */
  async listDeliveries(organizationId: string, filters?: {
    webhookId?: string;
    status?: string;
    dateRange?: { start: Date; end: Date };
    limit?: number;
    offset?: number;
  }): Promise<WebhookDelivery[]> {
    try {
      const deliveries = Array.from(this.activeDeliveries.values())
        .filter(async (delivery) => {
          const webhook = await this.getWebhook(delivery.webhookId, organizationId);
          return webhook !== null;
        })
        .filter(delivery => !filters.webhookId || delivery.webhookId === filters.webhookId)
        .filter(delivery => !filters.status || delivery.status === filters.status)
        .filter(delivery => {
          if (!filters.dateRange) return true;
          return delivery.createdAt >= filters.dateRange.start && delivery.createdAt <= filters.dateRange.end;
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(filters.offset || 0, (filters.offset || 0) + (filters.limit || 50));

      return deliveries;
    } catch (error) {
      logger.error('[WebhookService] Failed to list deliveries:', error);
      throw new Error('Failed to list deliveries');
    }
  }

  /**
   * Retry webhook delivery
   */
  async retryDelivery(deliveryId: string, organizationId: string): Promise<boolean> {
    try {
      const delivery = await this.getDelivery(deliveryId, organizationId);
      if (!delivery) {
        return false;
      }

      if (delivery.status === 'delivered') {
        return false;
      }

      // Reset delivery status
      delivery.status = 'pending';
      delivery.attempts = 0;
      delivery.error = undefined;
      delivery.updatedAt = new Date();

      // Add to queue
      this.deliveryQueue.push(delivery);
      this.processQueue();

      this.emit('webhook:retry', delivery);
      return true;
    } catch (error) {
      logger.error('[WebhookService] Failed to retry delivery:', error);
      throw new Error('Failed to retry delivery');
    }
  }

  /**
   * Get webhook statistics
   */
  async getWebhookStats(organizationId: string): Promise<WebhookStats> {
    try {
      const deliveries = Array.from(this.activeDeliveries.values())
        .filter(async (delivery) => {
          const webhook = await this.getWebhook(delivery.webhookId, organizationId);
          return webhook !== null;
        });

      const successfulDeliveries = deliveries.filter(d => d.status === 'delivered');
      const failedDeliveries = deliveries.filter(d => d.status === 'failed');

      const successRate = deliveries.length > 0
        ? successfulDeliveries.length / deliveries.length
        : 0;

      const averageDeliveryTime = successfulDeliveries.length > 0
        ? successfulDeliveries.reduce((sum, d) => sum + (d.response?.duration || 0), 0) / successfulDeliveries.length
        : 0;

      const deliveriesByStatus = deliveries.reduce((acc, delivery) => {
        acc[delivery.status] = (acc[delivery.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Group by webhook
      const deliveriesByWebhook = deliveries.reduce((acc, delivery) => {
        const existing = acc.find(item => item.webhookId === delivery.webhookId);
        if (existing) {
          existing.deliveries++;
          if (delivery.status === 'delivered') existing.successRate++;
        } else {
          acc.push({
            webhookId: delivery.webhookId,
            webhookName: `Webhook ${delivery.webhookId}`, // Would get actual name
            deliveries: 1,
            successRate: delivery.status === 'delivered' ? 1 : 0,
          });
        }
        return acc;
      }, [] as { webhookId: string; webhookName: string; deliveries: number; successRate: number }[]);

      // Calculate success rates
      deliveriesByWebhook.forEach(item => {
        item.successRate = item.deliveries > 0 ? item.successRate / item.deliveries : 0;
      });

      const recentDeliveries = deliveries
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 10);

      return {
        totalWebhooks: 0, // Would query actual count
        activeWebhooks: 0, // Would query actual count
        totalDeliveries: deliveries.length,
        successfulDeliveries: successfulDeliveries.length,
        failedDeliveries: failedDeliveries.length,
        successRate,
        averageDeliveryTime,
        deliveriesByStatus,
        deliveriesByWebhook,
        recentDeliveries,
      };
    } catch (error) {
      logger.error('[WebhookService] Failed to get webhook stats:', error);
      throw new Error('Failed to get webhook stats');
    }
  }

  /**
   * Process delivery queue
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || this.deliveryQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    try {
      while (this.deliveryQueue.length > 0 && this.activeDeliveries.size < this.maxConcurrentDeliveries) {
        const delivery = this.deliveryQueue.shift()!;
        await this.processDelivery(delivery);
      }
    } catch (error) {
      logger.error('[WebhookService] Error processing queue:', error);
    } finally {
      this.isProcessingQueue = false;
    }
  }

  /**
   * Process individual delivery
   */
  private async processDelivery(delivery: WebhookDelivery): Promise<void> {
    try {
      delivery.status = 'retrying';
      delivery.attempts++;
      delivery.lastAttempt = new Date();
      delivery.updatedAt = new Date();

      this.activeDeliveries.set(delivery.id, delivery);

      // Get webhook
      const webhook = await this.getWebhook(delivery.webhookId, '');
      if (!webhook) {
        throw new Error('Webhook not found');
      }

      // Get event
      const event = await this.getEvent(delivery.eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      // Set timeout
      const timeout = setTimeout(() => {
        this.handleDeliveryTimeout(delivery.id);
      }, webhook.retryPolicy.timeoutMs);

      this.deliveryTimeouts.set(delivery.id, timeout);

      // Deliver webhook
      const result = await this.deliverWebhook(webhook, event);

      // Clear timeout
      clearTimeout(timeout);
      this.deliveryTimeouts.delete(delivery.id);

      if (result.success) {
        delivery.status = 'delivered';
        delivery.response = {
          statusCode: result.statusCode || 200,
          headers: result.headers || {},
          body: JSON.stringify(result.data || {}),
          duration: result.duration || 0,
        };
      } else {
        delivery.status = 'failed';
        delivery.error = result.error;

        // Check if should retry
        if (delivery.attempts < webhook.retryPolicy.maxAttempts) {
          delivery.status = 'pending';
          delivery.nextRetry = new Date(Date.now() + webhook.retryPolicy.backoffMs * delivery.attempts);
          
          // Schedule retry
          setTimeout(() => {
            this.deliveryQueue.push(delivery);
            this.processQueue();
          }, webhook.retryPolicy.backoffMs * delivery.attempts);
        }
      }

      delivery.updatedAt = new Date();

      this.emit('webhook:delivered', delivery);
    } catch (error) {
      delivery.status = 'failed';
      delivery.error = error instanceof Error ? error.message : 'Unknown error';
      delivery.updatedAt = new Date();

      this.emit('webhook:failed', delivery);
    } finally {
      // Clean up after delay
      setTimeout(() => {
        this.activeDeliveries.delete(delivery.id);
      }, 60000); // Keep in memory for 1 minute
    }
  }

  /**
   * Deliver webhook to endpoint
   */
  private async deliverWebhook(webhook: WebhookDefinition, event: WebhookEvent): Promise<{
    success: boolean;
    statusCode?: number;
    headers?: Record<string, string>;
    data?: any;
    error?: string;
    duration?: number;
  }> {
    try {
      const startTime = Date.now();

      // Prepare payload
      const payload = {
        id: event.id,
        type: event.type,
        data: event.data,
        timestamp: event.timestamp.toISOString(),
        source: event.source,
        version: event.version,
        metadata: event.metadata,
      };

      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'WebhookService/1.0',
        'X-Webhook-ID': webhook.id,
        'X-Event-ID': event.id,
        'X-Event-Type': event.type,
        ...webhook.headers,
      };

      // Add signature if secret is configured
      if (webhook.secret) {
        const signature = this.generateSignature(JSON.stringify(payload), webhook.secret);
        headers['X-Webhook-Signature'] = signature;
      }

      // Make request
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const duration = Date.now() - startTime;

      if (response.ok) {
        return {
          success: true,
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          data: await response.json(),
          duration,
        };
      } else {
        return {
          success: false,
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          error: `HTTP ${response.status}: ${response.statusText}`,
          duration,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Generate webhook signature
   */
  private generateSignature(payload: string, secret: string): string {
    return crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  }

  /**
   * Get event by ID
   */
  private async getEvent(eventId: string): Promise<WebhookEvent | null> {
    // Simplified - would query actual database
    return null;
  }

  /**
   * Handle delivery timeout
   */
  private handleDeliveryTimeout(deliveryId: string): void {
    const delivery = this.activeDeliveries.get(deliveryId);
    if (delivery) {
      delivery.status = 'failed';
      delivery.error = 'Delivery timeout';
      delivery.updatedAt = new Date();

      this.deliveryTimeouts.delete(deliveryId);
      this.emit('webhook:timeout', delivery);
    }
  }

  /**
   * Verify webhook signature
   */
  verifySignature(payload: string, signature: string, secret: string): boolean {
    try {
      const expectedSignature = this.generateSignature(payload, secret);
      return verifyWebhookSignature(signature, expectedSignature);
    } catch (error) {
      logger.error('[WebhookService] Failed to verify signature:', error);
      return false;
    }
  }

  /**
   * Start queue processor
   */
  private startQueueProcessor(): void {
    this.queueProcessorInterval = setInterval(() => {
      this.processQueue();
    }, 1000); // Process queue every second
  }

  /**
   * Start cleanup process
   */
  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute
  }

  /**
   * Cleanup old deliveries
   */
  private cleanup(): void {
    const now = Date.now();
    const cutoff = now - 24 * 60 * 60 * 1000; // 24 hours ago

    for (const [id, delivery] of this.activeDeliveries.entries()) {
      if (delivery.updatedAt.getTime() < cutoff) {
        this.activeDeliveries.delete(id);
      }
    }
  }

  /**
   * Destroy the service
   */
  destroy(): void {
    if (this.queueProcessorInterval) {
      clearInterval(this.queueProcessorInterval);
    }
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    // Clear all delivery timeouts
    for (const timeout of this.deliveryTimeouts.values()) {
      clearTimeout(timeout);
    }
    this.deliveryQueue = [];
    this.activeDeliveries.clear();
    this.deliveryTimeouts.clear();
    this.removeAllListeners();
  }
}

export const unifiedWebhookService = new UnifiedWebhookService();
