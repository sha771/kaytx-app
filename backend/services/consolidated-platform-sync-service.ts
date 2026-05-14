import axios, { AxiosInstance } from 'axios';
import { EventEmitter } from 'events';
import { db as pgDb } from '../db/connection';
import { createLogger } from '../lib/production-logger';
import {
  platformConnections,
  platformContacts,
  platformOpportunities,
  platformDeals,
  platformChannels,
  platformMessages,
  platformSyncJobs,
  platformWebhookEvents,
  platformFailedOperations
} from '../db/drizzle-schema';
import { and, eq, desc, asc, gte, lte, sql, count, sum, inArray } from 'drizzle-orm';
import { platformAuthService, PlatformType } from './platform-auth-service';
import { syncConflictResolutionService } from './sync-conflict-resolution-service';
import { logAudit } from '../lib/audit';
import crypto from 'crypto';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

/**
 * Consolidated Platform Sync Service
 * Combines functionality from:
 * - platform-sync-engine.ts
 * - platform-sync-service.ts
 * - platform-data-sync-service.ts
 */

export interface SyncResult {
  success: boolean;
  messageCount: number;
  recordsProcessed: number;
  errors: string[];
  lastSyncAt: Date;
  duration: number;
  platform: PlatformType;
  connectionId: string;
}

export interface RateLimitInfo {
  remaining: number;
  resetTime: Date;
  platform: PlatformType;
  windowMs: number;
}

export interface SyncJobInput {
  organizationId: string;
  platform: PlatformType;
  connectionId: string;
  jobType: 'full_sync' | 'incremental_sync' | 'webhook_event' | 'manual_sync';
  priority: 'low' | 'medium' | 'high' | 'critical';
  scheduledFor?: Date;
  metadata?: Record<string, unknown>;
}

export interface SyncJob {
  id: string;
  organizationId: string;
  platform: PlatformType;
  connectionId: string;
  jobType: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  priority: string;
  scheduledFor: Date;
  startedAt?: Date;
  completedAt?: Date;
  result?: SyncResult;
  error?: string;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SyncAnalytics {
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  averageSyncTime: number;
  totalRecordsProcessed: number;
  recordsByPlatform: Record<PlatformType, number>;
  syncsByTimeRange: {
    date: Date;
    syncCount: number;
    successRate: number;
    avgTime: number;
  }[];
  errorDistribution: Record<string, number>;
  performanceMetrics: {
    fastestSync: number;
    slowestSync: number;
    averageThroughput: number; // records per second
  };
  platformHealth: Record<PlatformType, {
    connectionStatus: 'connected' | 'disconnected' | 'error';
    lastSync: Date;
    errorRate: number;
    avgResponseTime: number;
  }>;
  recommendations: {
    type: 'performance' | 'reliability' | 'configuration';
    priority: 'low' | 'medium' | 'high';
    message: string;
    action?: string;
  }[];
}

export interface WebhookEvent {
  id: string;
  organizationId: string;
  platform: PlatformType;
  eventId: string;
  eventType: string;
  payload: unknown;
  receivedAt: Date;
  processed: boolean;
  processedAt?: Date;
  error?: string;
}

export interface PlatformMetrics {
  platform: PlatformType;
  totalConnections: number;
  activeConnections: number;
  totalContacts: number;
  totalDeals: number;
  totalChannels: number;
  totalMessages: number;
  lastSyncTime: Date;
  syncSuccessRate: number;
  averageResponseTime: number;
  errorRate: number;
  dataVolume: number; // bytes
  rateLimitInfo?: RateLimitInfo;
}

export class ConsolidatedPlatformSyncService extends EventEmitter {
  private activeJobs: Map<string, SyncJob> = new Map();
  private jobQueue: SyncJob[] = [];
  private processingJobs: Set<string> = new Set();
  private maxConcurrentJobs: number = 5;
  private jobProcessorInterval: NodeJS.Timeout;
  private analyticsCleanupInterval: NodeJS.Timeout;
  private analyticsCache: Map<string, { data: SyncAnalytics; timestamp: Date }> = new Map();
  private cacheTTL: number = 5 * 60 * 1000; // 5 minutes

  constructor() {
    super();
    this.startJobProcessor();
    this.startAnalyticsCleanup();
  }

  /**
   * Enqueue a sync job
   */
  async enqueueJob(input: SyncJobInput): Promise<SyncJob> {
    const job: SyncJob = {
      id: crypto.randomUUID(),
      organizationId: input.organizationId,
      platform: input.platform,
      connectionId: input.connectionId,
      jobType: input.jobType,
      status: 'pending',
      priority: input.priority,
      scheduledFor: input.scheduledFor || new Date(),
      metadata: input.metadata || {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store in database
    await pgDb.insert(platformSyncJobs).values({
      id: job.id,
      organizationId: job.organizationId,
      platform: job.platform,
      connectionId: job.connectionId,
      jobType: job.jobType,
      status: job.status,
      priority: job.priority,
      scheduledFor: job.scheduledFor,
      metadata: job.metadata,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    });

    // Add to queue
    this.jobQueue.push(job);
    this.sortJobQueue();

    // Emit event
    this.emit('job:enqueued', job);

    // Log audit event
    await logAudit({
      userId: job.metadata?.userId,
      organizationId: job.organizationId,
      action: 'sync_job_enqueued',
      resource: 'platform_sync',
      resourceId: job.id,
      metadata: {
        platform: job.platform,
        jobType: job.jobType,
        priority: job.priority,
      }
    });

    return job;
  }

  /**
   * Process webhook event
   */
  async processWebhookEvent(event: {
    organizationId: string;
    platform: PlatformType;
    eventId: string;
    eventType: string;
    payload: unknown;
  }): Promise<{ isDuplicate: boolean; processed: boolean }> {
    // Check for duplicate
    const { isDuplicate } = await this.recordWebhookEvent({
      organizationId: event.organizationId,
      platform: event.platform,
      eventId: event.eventId,
      eventType: event.eventType,
      payload: event.payload,
    });

    if (isDuplicate) {
      return { isDuplicate: true, processed: false };
    }

    // Create sync job for webhook
    const job = await this.enqueueJob({
      organizationId: event.organizationId,
      platform: event.platform,
      connectionId: event.payload?.connectionId || 'webhook',
      jobType: 'webhook_event',
      priority: 'high',
      metadata: {
        eventId: event.eventId,
        eventType: event.eventType,
        payload: event.payload,
      },
    });

    return { isDuplicate: false, processed: true };
  }

  /**
   * Drain due jobs
   */
  async drainDueJobs(params: {
    organizationId: string;
    platform: PlatformType;
    connectionId?: string;
    maxJobs?: number;
    retryLimit?: number;
  }): Promise<{ drained: number; failed: number }> {
    const conditions = [
      eq(platformSyncJobs.organizationId, params.organizationId),
      eq(platformSyncJobs.platform, params.platform),
      lte(platformSyncJobs.scheduledFor, new Date()),
      eq(platformSyncJobs.status, 'pending'),
    ];

    if (params.connectionId) {
      conditions.push(eq(platformSyncJobs.connectionId, params.connectionId));
    }

    const jobs = await pgDb
      .select()
      .from(platformSyncJobs)
      .where(and(...conditions))
      .orderBy(desc(platformSyncJobs.priority), asc(platformSyncJobs.scheduledFor))
      .limit(params.maxJobs || 10);

    let drained = 0;
    let failed = 0;

    for (const jobData of jobs) {
      try {
        const job: SyncJob = {
          id: jobData.id,
          organizationId: jobData.organizationId,
          platform: jobData.platform as PlatformType,
          connectionId: jobData.connectionId,
          jobType: jobData.jobType,
          status: jobData.status as SyncJob['status'],
          priority: jobData.priority,
          scheduledFor: jobData.scheduledFor,
          startedAt: jobData.startedAt,
          completedAt: jobData.completedAt,
          result: jobData.result as unknown as SyncResult,
          error: jobData.error,
          metadata: jobData.metadata as Record<string, unknown>,
          createdAt: jobData.createdAt,
          updatedAt: jobData.updatedAt,
        };

        await this.processJob(job);
        drained++;
      } catch (error) {
        logger.error(`Failed to process job ${jobData.id}:`, error);
        failed++;
      }
    }

    return { drained, failed };
  }

  /**
   * Retry due failed operations
   */
  async retryDueFailedOperations(params: {
    organizationId: string;
    platform: PlatformType;
    connectionId?: string;
    maxRetries?: number;
  }): Promise<{ retried: number; failed: number }> {
    const conditions = [
      eq(platformFailedOperations.organizationId, params.organizationId),
      eq(platformFailedOperations.platform, params.platform),
      lte(platformFailedOperations.nextRetryAt, new Date()),
      sql`${platformFailedOperations.retryCount} < ${params.maxRetries || 3}`,
    ];

    if (params.connectionId) {
      conditions.push(eq(platformFailedOperations.connectionId, params.connectionId));
    }

    const operations = await pgDb
      .select()
      .from(platformFailedOperations)
      .where(and(...conditions))
      .orderBy(asc(platformFailedOperations.nextRetryAt))
      .limit(50);

    let retried = 0;
    let failed = 0;

    for (const operation of operations) {
      try {
        // Retry the operation
        await this.retryOperation(operation);
        retried++;
      } catch (error) {
        logger.error(`Failed to retry operation ${operation.id}:`, error);
        failed++;
      }
    }

    return { retried, failed };
  }

  /**
   * Get platform metrics
   */
  async getPlatformMetrics(organizationId: string, platform?: PlatformType): Promise<PlatformMetrics[]> {
    const conditions = [eq(platformConnections.organizationId, organizationId)];
    
    if (platform) {
      conditions.push(eq(platformConnections.platform, platform));
    }

    const connections = await pgDb
      .select()
      .from(platformConnections)
      .where(and(...conditions));

    const metrics: PlatformMetrics[] = [];

    for (const connection of connections) {
      const platformMetrics: PlatformMetrics = {
        platform: connection.platform as PlatformType,
        totalConnections: 1,
        activeConnections: connection.status === 'active' ? 1 : 0,
        totalContacts: 0,
        totalDeals: 0,
        totalChannels: 0,
        totalMessages: 0,
        lastSyncTime: connection.lastSyncAt || new Date(0),
        syncSuccessRate: 0,
        averageResponseTime: 0,
        errorRate: 0,
        dataVolume: 0,
      };

      // Get counts for each entity type
      const [contacts] = await pgDb
        .select({ count: count() })
        .from(platformContacts)
        .where(and(
          eq(platformContacts.organizationId, organizationId),
          eq(platformContacts.platformId, connection.id)
        ));

      const [deals] = await pgDb
        .select({ count: count() })
        .from(platformDeals)
        .where(and(
          eq(platformDeals.organizationId, organizationId),
          eq(platformDeals.platformId, connection.id)
        ));

      const [channels] = await pgDb
        .select({ count: count() })
        .from(platformChannels)
        .where(and(
          eq(platformChannels.organizationId, organizationId),
          eq(platformChannels.platformId, connection.id)
        ));

      const [messages] = await pgDb
        .select({ count: count() })
        .from(platformMessages)
        .where(and(
          eq(platformMessages.organizationId, organizationId),
          eq(platformMessages.platformId, connection.id)
        ));

      // Get sync statistics
      const [syncStats] = await pgDb
        .select({
          total: count(),
          successful: count(sql`CASE WHEN status = 'completed' THEN 1 END`),
          avgTime: sql`AVG(EXTRACT(EPOCH FROM (completed_at - started_at))`
        })
        .from(platformSyncJobs)
        .where(and(
          eq(platformSyncJobs.organizationId, organizationId),
          eq(platformSyncJobs.connectionId, connection.id),
          gte(platformSyncJobs.createdAt, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
        ));

      platformMetrics.totalContacts = Number(contacts.count);
      platformMetrics.totalDeals = Number(deals.count);
      platformMetrics.totalChannels = Number(channels.count);
      platformMetrics.totalMessages = Number(messages.count);
      platformMetrics.syncSuccessRate = syncStats.total > 0 ? Number(syncStats.successful) / Number(syncStats.total) : 0;
      platformMetrics.averageResponseTime = Number(syncStats.avgTime) || 0;

      metrics.push(platformMetrics);
    }

    return metrics;
  }

  /**
   * Get comprehensive analytics
   */
  async getAnalytics(organizationId: string, dateRange?: { start: Date; end: Date }): Promise<SyncAnalytics> {
    const cacheKey = `${organizationId}-${dateRange?.start?.getTime()}-${dateRange?.end?.getTime()}`;
    const cached = this.analyticsCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp.getTime() < this.cacheTTL) {
      return cached.data;
    }

    const conditions = [eq(platformSyncJobs.organizationId, organizationId)];
    
    if (dateRange) {
      conditions.push(gte(platformSyncJobs.createdAt, dateRange.start));
      conditions.push(lte(platformSyncJobs.createdAt, dateRange.end));
    }

    const jobs = await pgDb
      .select()
      .from(platformSyncJobs)
      .where(and(...conditions));

    // Calculate analytics
    const totalSyncs = jobs.length;
    const successfulSyncs = jobs.filter(job => job.status === 'completed').length;
    const failedSyncs = jobs.filter(job => job.status === 'failed').length;
    
    const completedJobs = jobs.filter(job => job.status === 'completed' && job.startedAt && job.completedAt);
    const averageSyncTime = completedJobs.length > 0 
      ? completedJobs.reduce((sum, job) => sum + (job.completedAt!.getTime() - job.startedAt!.getTime()), 0) / completedJobs.length
      : 0;

    const totalRecordsProcessed = completedJobs.reduce((sum, job) => sum + (job.result?.recordsProcessed || 0), 0);

    // Group by platform
    const recordsByPlatform: Record<PlatformType, number> = {};
    const platformHealth: Record<PlatformType, any> = {};

    for (const job of jobs) {
      if (!recordsByPlatform[job.platform as PlatformType]) {
        recordsByPlatform[job.platform as PlatformType] = 0;
      }
      recordsByPlatform[job.platform as PlatformType] += job.result?.recordsProcessed || 0;

      // Platform health metrics
      if (!platformHealth[job.platform as PlatformType]) {
        platformHealth[job.platform as PlatformType] = {
          connectionStatus: 'connected',
          lastSync: new Date(0),
          errorRate: 0,
          avgResponseTime: 0,
        };
      }

      const platformJobs = jobs.filter(j => j.platform === job.platform);
      const errorCount = platformJobs.filter(j => j.status === 'failed').length;
      platformHealth[job.platform as PlatformType].errorRate = platformJobs.length > 0 ? errorCount / platformJobs.length : 0;
      platformHealth[job.platform as PlatformType].lastSync = new Date(Math.max(
        ...platformJobs.map(j => j.updatedAt.getTime())
      ));
    }

    // Time series data
    const syncsByTimeRange = this.calculateTimeSeriesData(jobs);

    // Error distribution
    const errorDistribution: Record<string, number> = {};
    for (const job of jobs.filter(j => j.status === 'failed')) {
      const errorType = job.error?.split(':')[0] || 'unknown';
      errorDistribution[errorType] = (errorDistribution[errorType] || 0) + 1;
    }

    // Performance metrics
    const durations = completedJobs.map(job => job.completedAt!.getTime() - job.startedAt!.getTime());
    const performanceMetrics = {
      fastestSync: durations.length > 0 ? Math.min(...durations) : 0,
      slowestSync: durations.length > 0 ? Math.max(...durations) : 0,
      averageThroughput: averageSyncTime > 0 ? totalRecordsProcessed / (averageSyncTime / 1000) : 0,
    };

    // Generate recommendations
    const recommendations = this.generateRecommendations({
      totalSyncs,
      successRate: totalSyncs > 0 ? successfulSyncs / totalSyncs : 0,
      averageSyncTime,
      platformHealth,
      errorDistribution,
    });

    const analytics: SyncAnalytics = {
      totalSyncs,
      successfulSyncs,
      failedSyncs,
      averageSyncTime,
      totalRecordsProcessed,
      recordsByPlatform,
      syncsByTimeRange,
      errorDistribution,
      performanceMetrics,
      platformHealth,
      recommendations,
    };

    // Cache the result
    this.analyticsCache.set(cacheKey, { data: analytics, timestamp: new Date() });

    return analytics;
  }

  /**
   * Get job status
   */
  async getJobStatus(jobId: string, organizationId: string): Promise<SyncJob | null> {
    const [job] = await pgDb
      .select()
      .from(platformSyncJobs)
      .where(and(
        eq(platformSyncJobs.id, jobId),
        eq(platformSyncJobs.organizationId, organizationId)
      ))
      .limit(1);

    if (!job) return null;

    return {
      id: job.id,
      organizationId: job.organizationId,
      platform: job.platform as PlatformType,
      connectionId: job.connectionId,
      jobType: job.jobType,
      status: job.status as any,
      priority: job.priority,
      scheduledFor: job.scheduledFor,
      startedAt: job.startedAt,
      completedAt: job.completedAt,
      result: job.result as any,
      error: job.error,
      metadata: job.metadata as any,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
    };
  }

  /**
   * Cancel job
   */
  async cancelJob(jobId: string, organizationId: string): Promise<boolean> {
    const job = await this.getJobStatus(jobId, organizationId);
    if (!job || job.status === 'completed') {
      return false;
    }

    await pgDb
      .update(platformSyncJobs)
      .set({
        status: 'cancelled',
        updatedAt: new Date(),
      })
      .where(and(
        eq(platformSyncJobs.id, jobId),
        eq(platformSyncJobs.organizationId, organizationId)
      ));

    // Remove from active jobs if processing
    this.processingJobs.delete(jobId);
    this.activeJobs.delete(jobId);

    this.emit('job:cancelled', job);

    return true;
  }

  /**
   * Record webhook event
   */
  async recordWebhookEvent(event: {
    organizationId: string;
    platform: PlatformType;
    eventId: string;
    eventType: string;
    payload: any;
  }): Promise<{ isDuplicate: boolean }> {
    // Check for existing event
    const [existing] = await pgDb
      .select()
      .from(platformWebhookEvents)
      .where(and(
        eq(platformWebhookEvents.organizationId, event.organizationId),
        eq(platformWebhookEvents.platform, event.platform),
        eq(platformWebhookEvents.eventId, event.eventId)
      ))
      .limit(1);

    if (existing) {
      return { isDuplicate: true };
    }

    // Record new event
    await pgDb.insert(platformWebhookEvents).values({
      id: crypto.randomUUID(),
      organizationId: event.organizationId,
      platform: event.platform,
      eventId: event.eventId,
      eventType: event.eventType,
      payload: event.payload,
      receivedAt: new Date(),
      processed: false,
    });

    return { isDuplicate: false };
  }

  /**
   * Process a sync job
   */
  private async processJob(job: SyncJob): Promise<void> {
    if (this.processingJobs.has(job.id)) {
      return; // Already processing
    }

    this.processingJobs.add(job.id);
    this.activeJobs.set(job.id, job);

    try {
      // Update job status to running
      await pgDb
        .update(platformSyncJobs)
        .set({
          status: 'running',
          startedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(platformSyncJobs.id, job.id));

      // Get connection details
      const [connection] = await pgDb
        .select()
        .from(platformConnections)
        .where(and(
          eq(platformConnections.id, job.connectionId),
          eq(platformConnections.organizationId, job.organizationId)
        ))
        .limit(1);

      if (!connection) {
        throw new Error('Connection not found');
      }

      // Perform sync based on job type
      const result = await this.performSync(job, connection);

      // Update job with result
      await pgDb
        .update(platformSyncJobs)
        .set({
          status: result.success ? 'completed' : 'failed',
          completedAt: new Date(),
          result: result,
          error: result.success ? null : result.errors.join(', '),
          updatedAt: new Date(),
        })
        .where(eq(platformSyncJobs.id, job.id));

      // Update connection last sync time
      if (result.success) {
        await pgDb
          .update(platformConnections)
          .set({
            lastSyncAt: new Date(),
            status: 'active',
            lastError: null,
          })
          .where(eq(platformConnections.id, job.connectionId));
      }

      this.emit('job:completed', { job, result });

    } catch (error) {
      logger.error(`Job ${job.id} failed:`, error);

      await pgDb
        .update(platformSyncJobs)
        .set({
          status: 'failed',
          completedAt: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
          updatedAt: new Date(),
        })
        .where(eq(platformSyncJobs.id, job.id));

      this.emit('job:failed', { job, error });

      // Record failed operation for retry
      await this.recordFailedOperation(job, error);
    } finally {
      this.processingJobs.delete(job.id);
      this.activeJobs.delete(job.id);
    }
  }

  /**
   * Perform the actual sync operation
   */
  private async performSync(job: SyncJob, connection: any): Promise<SyncResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let recordsProcessed = 0;

    try {
      // Get auth token
      const authData = await platformAuthService.getAuthToken(connection.platform as PlatformType, connection.config);

      // Create API client
      const apiClient = axios.create({
        baseURL: connection.config.apiEndpoint,
        headers: {
          'Authorization': `Bearer ${authData.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Standardized Retry Logic
      axiosRetry(apiClient, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: (error) => {
          return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
        },
      });

      // Sync based on job type
      switch (job.jobType) {
        case 'full_sync':
          recordsProcessed = await this.performFullSync(apiClient, connection, errors);
          break;
        case 'incremental_sync':
          recordsProcessed = await this.performIncrementalSync(apiClient, connection, errors);
          break;
        case 'webhook_event':
          recordsProcessed = await this.processWebhookSync(apiClient, connection, job.metadata, errors);
          break;
        case 'manual_sync':
          recordsProcessed = await this.performManualSync(apiClient, connection, job.metadata, errors);
          break;
        default:
          throw new Error(`Unknown job type: ${job.jobType}`);
      }

    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Unknown error');
    }

    const duration = Date.now() - startTime;

    return {
      success: errors.length === 0,
      messageCount: recordsProcessed,
      recordsProcessed,
      errors,
      lastSyncAt: new Date(),
      duration,
      platform: connection.platform as PlatformType,
      connectionId: connection.id,
    };
  }

  /**
   * Perform full sync
   */
  private async performFullSync(apiClient: AxiosInstance, connection: any, errors: string[]): Promise<number> {
    let totalRecords = 0;

    // Sync contacts
    try {
      const contacts = await this.syncContacts(apiClient, connection);
      totalRecords += contacts;
    } catch (error) {
      errors.push(`Contacts sync failed: ${error}`);
    }

    // Sync deals
    try {
      const deals = await this.syncDeals(apiClient, connection);
      totalRecords += deals;
    } catch (error) {
      errors.push(`Deals sync failed: ${error}`);
    }

    // Sync channels
    try {
      const channels = await this.syncChannels(apiClient, connection);
      totalRecords += channels;
    } catch (error) {
      errors.push(`Channels sync failed: ${error}`);
    }

    // Sync messages
    try {
      const messages = await this.syncMessages(apiClient, connection);
      totalRecords += messages;
    } catch (error) {
      errors.push(`Messages sync failed: ${error}`);
    }

    return totalRecords;
  }

  /**
   * Perform incremental sync
   */
  private async performIncrementalSync(apiClient: AxiosInstance, connection: any, errors: string[]): Promise<number> {
    // Get last sync time
    const lastSyncTime = connection.lastSyncAt || new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    let totalRecords = 0;

    // Sync contacts modified since last sync
    try {
      const contacts = await this.syncContactsModifiedSince(apiClient, connection, lastSyncTime);
      totalRecords += contacts;
    } catch (error) {
      errors.push(`Incremental contacts sync failed: ${error}`);
    }

    // Sync other entities similarly...
    // (Implementation for deals, channels, messages would go here)

    return totalRecords;
  }

  /**
   * Sync contacts
   */
  private async syncContacts(apiClient: AxiosInstance, connection: any): Promise<number> {
    // This would contain the actual API calls to sync contacts
    // For now, return mock data
    logger.info(`Syncing contacts for ${connection.platform}`);
    return 100; // Mock number
  }

  /**
   * Sync deals
   */
  private async syncDeals(apiClient: AxiosInstance, connection: any): Promise<number> {
    logger.info(`Syncing deals for ${connection.platform}`);
    return 50; // Mock number
  }

  /**
   * Sync channels
   */
  private async syncChannels(apiClient: AxiosInstance, connection: any): Promise<number> {
    logger.info(`Syncing channels for ${connection.platform}`);
    return 25; // Mock number
  }

  /**
   * Sync messages
   */
  private async syncMessages(apiClient: AxiosInstance, connection: any): Promise<number> {
    logger.info(`Syncing messages for ${connection.platform}`);
    return 200; // Mock number
  }

  /**
   * Sync contacts modified since last sync
   */
  private async syncContactsModifiedSince(apiClient: AxiosInstance, connection: any, since: Date): Promise<number> {
    logger.info(`Incremental contacts sync for ${connection.platform} since ${since}`);
    return 25; // Mock number
  }

  /**
   * Process webhook sync
   */
  private async processWebhookSync(apiClient: AxiosInstance, connection: any, metadata: any, errors: string[]): Promise<number> {
    logger.info(`Processing webhook sync for ${connection.platform}`);
    return 10; // Mock number
  }

  /**
   * Perform manual sync
   */
  private async performManualSync(apiClient: AxiosInstance, connection: any, metadata: any, errors: string[]): Promise<number> {
    logger.info(`Manual sync for ${connection.platform}`);
    return 75; // Mock number
  }

  /**
   * Record failed operation
   */
  private async recordFailedOperation(job: SyncJob, error: any): Promise<void> {
    await pgDb.insert(platformFailedOperations).values({
      id: crypto.randomUUID(),
      organizationId: job.organizationId,
      platform: job.platform,
      connectionId: job.connectionId,
      operationType: job.jobType,
      jobId: job.id,
      error: error instanceof Error ? error.message : 'Unknown error',
      retryCount: 1,
      nextRetryAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Retry operation
   */
  private async retryOperation(operation: any): Promise<void> {
    // This would contain the logic to retry a failed operation
    logger.info(`Retrying operation ${operation.id}`);
    
    // Update retry count and next retry time
    await pgDb
      .update(platformFailedOperations)
      .set({
        retryCount: sql`${platformFailedOperations.retryCount} + 1`,
        nextRetryAt: new Date(Date.now() + Math.pow(2, operation.retryCount + 1) * 60 * 1000), // Exponential backoff
        updatedAt: new Date(),
      })
      .where(eq(platformFailedOperations.id, operation.id));
  }

  /**
   * Calculate time series data
   */
  private calculateTimeSeriesData(jobs: any[]): {
    date: Date;
    syncCount: number;
    successRate: number;
    avgTime: number;
  }[] {
    const dailyData: Record<string, { count: number; successful: number; totalTime: number }> = {};

    for (const job of jobs) {
      const dateKey = job.createdAt.toISOString().split('T')[0];
      
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = { count: 0, successful: 0, totalTime: 0 };
      }
      
      dailyData[dateKey].count++;
      if (job.status === 'completed') {
        dailyData[dateKey].successful++;
        if (job.startedAt && job.completedAt) {
          dailyData[dateKey].totalTime += job.completedAt.getTime() - job.startedAt.getTime();
        }
      }
    }

    return Object.entries(dailyData)
      .map(([date, data]) => ({
        date: new Date(date),
        syncCount: data.count,
        successRate: data.count > 0 ? data.successful / data.count : 0,
        avgTime: data.successful > 0 ? data.totalTime / data.successful : 0,
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(metrics: {
    totalSyncs: number;
    successRate: number;
    averageSyncTime: number;
    platformHealth: Record<string, any>;
    errorDistribution: Record<string, number>;
  }): {
    type: 'performance' | 'reliability' | 'configuration';
    priority: 'low' | 'medium' | 'high';
    message: string;
    action?: string;
  }[] {
    const recommendations: {
      type: 'performance' | 'reliability' | 'configuration';
      priority: 'low' | 'medium' | 'high';
      message: string;
      action?: string;
    }[] = [];

    // Reliability recommendations
    if (metrics.successRate < 0.95) {
      recommendations.push({
        type: 'reliability',
        priority: 'high',
        message: `Sync success rate is ${Math.round(metrics.successRate * 100)}%. Check error logs for details.`,
        action: 'Implement automatic retries for transient errors',
      });
    }

    for (const [platform, health] of Object.entries(metrics.platformHealth)) {
      if ((health as any).errorRate > 0.1) {
        recommendations.push({
          type: 'reliability',
          priority: 'medium',
          message: `High error rate detected for platform: ${platform}`,
          action: 'Check platform API credentials and status',
        });
      }
    }

    // Configuration recommendations
    if (metrics.totalSyncs > 1000) {
      recommendations.push({
        type: 'configuration',
        priority: 'low',
        message: 'High sync volume detected. Consider increasing concurrent job limit.',
        action: 'Adjust maxConcurrentJobs setting',
      });
    }

    return recommendations;
  }

  /**
   * Sort job queue by priority and scheduled time
   */
  private sortJobQueue(): void {
    const priorityMap: Record<string, number> = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
    this.jobQueue.sort((a, b) => {
      const priorityDiff = (priorityMap[b.priority] || 0) - (priorityMap[a.priority] || 0);
      if (priorityDiff !== 0) return priorityDiff;
      return a.scheduledFor.getTime() - b.scheduledFor.getTime();
    });
  }

  /**
   * Start periodic job processor
   */
  private startJobProcessor(): void {
    this.jobProcessorInterval = setInterval(async () => {
      await this.processJobQueue();
    }, 5000); // Check every 5 seconds
  }

  /**
   * Process job queue
   */
  private async processJobQueue(): Promise<void> {
    if (this.processingJobs.size >= this.maxConcurrentJobs) return;

    const now = new Date();
    // Get eligible jobs (not in future)
    const eligibleJobs = this.jobQueue.filter(job => job.scheduledFor <= now);
    
    const availableSlots = this.maxConcurrentJobs - this.processingJobs.size;
    const nextJobs = eligibleJobs.splice(0, availableSlots);

    // Remove from main queue
    this.jobQueue = this.jobQueue.filter(job => !nextJobs.find(nj => nj.id === job.id));

    for (const job of nextJobs) {
      this.processJob(job).catch(err => logger.error(`Error in periodic job processor for job ${job.id}:`, err));
    }
  }

  /**
   * Start periodic analytics cleanup
   */
  private startAnalyticsCleanup(): void {
    this.analyticsCleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, cached] of this.analyticsCache.entries()) {
        if (now - cached.timestamp.getTime() > this.cacheTTL) {
          this.analyticsCache.delete(key);
        }
      }
    }, 60000); // Clean every minute
  }

  /**
   * Sync platform data (from platform-data-sync-service)
   * Performs direct data synchronization for specific platforms
   */
  async syncPlatformData(
    organizationId: string,
    platform: PlatformType,
    connectionId: string
  ): Promise<SyncResult> {
    const start = Date.now();
    const errors: string[] = [];
    let recordsProcessed = 0;
    let messageCount = 0;

    try {
      // Validate inputs
      if (!organizationId || !/^org-[A-Za-z0-9_-]+$/.test(organizationId)) {
        throw new Error('Invalid organization ID');
      }
      if (!connectionId || !/^conn-[A-Za-z0-9_-]+$/.test(connectionId)) {
        throw new Error('Invalid connection ID');
      }

      const credentials = await platformAuthService.ensureValidCredentialsForOrg(organizationId, platform);
      const client = this.createApiClient(platform, credentials);

      // Perform platform-specific sync
      switch (platform) {
        case 'salesforce':
          recordsProcessed = await this.syncSalesforceData(client, organizationId, connectionId);
          messageCount = recordsProcessed;
          break;
        case 'hubspot':
          recordsProcessed = await this.syncHubSpotData(client, organizationId, connectionId);
          messageCount = recordsProcessed;
          break;
        case 'zendesk':
          recordsProcessed = await this.syncZendeskData(client, organizationId, connectionId);
          messageCount = recordsProcessed;
          break;
        case 'shopify':
          recordsProcessed = await this.syncShopifyData(client, organizationId, connectionId);
          messageCount = recordsProcessed;
          break;
        case 'slack':
          recordsProcessed = await this.syncSlackData(client, organizationId, connectionId);
          messageCount = recordsProcessed;
          break;
        case 'google_workspace':
          recordsProcessed = await this.syncGoogleWorkspaceData(client, organizationId, connectionId);
          messageCount = recordsProcessed;
          break;
        default:
          throw new Error(`Direct sync not implemented for platform: ${platform}`);
      }

      await logAudit({
        userId: undefined,
        organizationId,
        action: 'PLATFORM_DATA_SYNC',
        resource: 'platform_sync',
        resourceId: connectionId,
        status: 'success',
        metadata: { platform, connectionId, recordsProcessed, messageCount },
      });

      return {
        success: true,
        messageCount,
        recordsProcessed,
        errors: [],
        lastSyncAt: new Date(),
        duration: Date.now() - start,
        platform,
        connectionId,
      };
    } catch (error: any) {
      const message = error?.response?.status 
        ? `Request failed with status code ${error.response.status}`
        : (error instanceof Error ? error.message : String(error));

      errors.push(`${platform} sync error: ${message}`);

      await logAudit({
        userId: undefined,
        organizationId,
        action: 'PLATFORM_DATA_SYNC',
        resource: 'platform_sync',
        resourceId: connectionId,
        status: 'failure',
        metadata: { platform, connectionId, error: message },
      });

      return {
        success: false,
        messageCount,
        recordsProcessed,
        errors,
        lastSyncAt: new Date(),
        duration: Date.now() - start,
        platform,
        connectionId,
      };
    }
  }

  /**
   * Create API client for platform
   */
  private createApiClient(platform: PlatformType, credentials: any): any {
    const axios = require('axios');
    
    switch (platform) {
      case 'salesforce': {
        const instanceUrl = credentials?.instanceUrl || 'https://login.salesforce.com';
        return axios.create({
          baseURL: `${instanceUrl}/services/data/v56.0`,
          headers: { Authorization: `Bearer ${credentials?.accessToken}` },
        });
      }
      case 'hubspot':
        return axios.create({
          baseURL: 'https://api.hubapi.com',
          headers: { Authorization: `Bearer ${credentials?.accessToken}` },
        });
      case 'zendesk': {
        const subdomain = credentials?.subdomain;
        return axios.create({
          baseURL: `https://${subdomain}.zendesk.com/api/v2`,
          headers: { Authorization: `Bearer ${credentials?.accessToken}` },
        });
      }
      case 'shopify': {
        const shopDomain = credentials?.shopDomain;
        return axios.create({
          baseURL: `https://${shopDomain}/admin/api/2023-10`,
          headers: { 'X-Shopify-Access-Token': credentials?.accessToken },
        });
      }
      case 'slack':
        return axios.create({
          baseURL: 'https://slack.com/api',
          headers: { Authorization: `Bearer ${credentials?.accessToken}` },
        });
      case 'google_workspace':
        return axios.create({
          baseURL: 'https://www.googleapis.com',
          headers: { Authorization: `Bearer ${credentials?.accessToken}` },
        });
      default:
        return axios.create({ headers: { Authorization: `Bearer ${credentials?.accessToken}` } });
    }
  }

  /**
   * Sync Salesforce data
   */
  private async syncSalesforceData(client: any, organizationId: string, connectionId: string): Promise<number> {
    const response = await client.get('/sobjects/Account?limit=100');
    const records = response?.data?.records || [];
    
    // Store records in database
    for (const record of records) {
      await pgDb.insert(platformContacts).values({
        id: crypto.randomUUID(),
        organizationId,
        platformId: connectionId,
        platform: 'salesforce',
        externalId: record.Id,
        data: record,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).onConflictDoNothing();
    }
    
    return records.length;
  }

  /**
   * Sync HubSpot data
   */
  private async syncHubSpotData(client: any, organizationId: string, connectionId: string): Promise<number> {
    const response = await client.get('/crm/v3/objects/contacts?limit=100');
    const contacts = response?.data?.results || [];
    return contacts.length;
  }

  /**
   * Sync Zendesk data
   */
  private async syncZendeskData(client: any, organizationId: string, connectionId: string): Promise<number> {
    const ticketsResponse = await client.get('/tickets?per_page=100');
    const tickets = ticketsResponse?.data?.tickets || [];
    
    const usersResponse = await client.get('/users?per_page=100');
    const users = usersResponse?.data?.users || [];
    
    return tickets.length + users.length;
  }

  /**
   * Sync Shopify data
   */
  private async syncShopifyData(client: any, organizationId: string, connectionId: string): Promise<number> {
    const ordersResponse = await client.get('/orders.json?limit=50');
    const orders = ordersResponse?.data?.orders || [];
    
    if (orders.length > 0) return orders.length;
    
    const productsResponse = await client.get('/products.json?limit=50');
    const products = productsResponse?.data?.products || [];
    
    if (products.length > 0) return products.length;
    
    const customersResponse = await client.get('/customers.json?limit=50');
    const customers = customersResponse?.data?.customers || [];
    
    return customers.length;
  }

  /**
   * Sync Slack data
   */
  private async syncSlackData(client: any, organizationId: string, connectionId: string): Promise<number> {
    const messagesResponse = await client.get('/conversations.history?limit=100');
    const messages = messagesResponse?.data?.messages || [];
    return messages.length;
  }

  /**
   * Sync Google Workspace data
   */
  private async syncGoogleWorkspaceData(client: any, organizationId: string, connectionId: string): Promise<number> {
    const gmailResponse = await client.get('/gmail/v1/users/me/messages?maxResults=25');
    const messages = gmailResponse?.data?.messages || [];
    
    // Also sync calendar events
    const calendarResponse = await client.get('/calendar/v3/calendars/primary/events?maxResults=25');
    const events = calendarResponse?.data?.items || [];
    
    return messages.length + events.length;
  }

  /**
   * Graceful shutdown
   */
  async cleanup(): Promise<void> {
    if (this.jobProcessorInterval) {
      clearInterval(this.jobProcessorInterval);
    }
    if (this.analyticsCleanupInterval) {
      clearInterval(this.analyticsCleanupInterval);
    }
    this.activeJobs.clear();
    this.jobQueue = [];
    this.processingJobs.clear();
    this.analyticsCache.clear();
    this.removeAllListeners();
    logger.info('ConsolidatedPlatformSyncService cleanup completed');
  }

  // Enqueue and run a connection sync immediately
  async enqueueAndRunConnectionSync(input: Omit<SyncJobInput, 'jobType' | 'priority'> & { jobType?: SyncJobInput['jobType']; priority?: SyncJobInput['priority'] }): Promise<SyncJob> {
    const jobInput: SyncJobInput = {
      organizationId: input.organizationId,
      platform: input.platform,
      connectionId: input.connectionId,
      jobType: input.jobType || 'manual_sync',
      priority: input.priority || 'medium',
      scheduledFor: input.scheduledFor,
      metadata: input.metadata,
    };
    const job = await this.enqueueJob(jobInput);
    // Process immediately
    await this.processJob(job.id);
    return job;
  }
}

export const consolidatedPlatformSyncService = new ConsolidatedPlatformSyncService();
export const platformSyncEngine = consolidatedPlatformSyncService;
