import { platformSyncService, SyncResult } from './platform-sync-service';
import { platformAuthService, PlatformType } from './platform-auth-service';
import { webhookManager } from './webhook-manager';
import { conflictResolver, ConflictRecord } from './conflict-resolver';
import { semanticSearchService, SearchQuery, MemoryContext } from './semantic-search-service';
import { vectorEmbeddingService } from './vector-embedding-service';
import { memoryManagementService } from './memory-management-service';
import { db as pgDb } from '../db/connection';
import { platformConnections } from '../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

export interface PlatformIntegrationStatus {
  platform: PlatformType;
  isConnected: boolean;
  isActive: boolean;
  lastSyncAt?: Date;
  syncStatus: 'success' | 'failed' | 'pending' | 'never';
  credentialsStatus: 'valid' | 'expired' | 'missing' | 'reauth_required';
  webhookStatus: 'active' | 'inactive' | 'error';
  totalRecords: number;
  errorCount: number;
}

export interface AgentMemoryStatus {
  totalMemories: number;
  totalContexts: number;
  totalSummaries: number;
  avgImportanceScore: number;
  storageUsage: number;
  lastSummaryAt?: Date;
  lastPruningAt?: Date;
}

export interface IntegrationHealthCheck {
  overall: 'healthy' | 'degraded' | 'unhealthy';
  platforms: PlatformIntegrationStatus[];
  agentMemory: AgentMemoryStatus;
  issues: string[];
  recommendations: string[];
}

export interface SyncOperation {
  id: string;
  platform: PlatformType;
  organizationId: string;
  type: 'full' | 'incremental' | 'webhook';
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime: Date;
  endTime?: Date;
  recordsProcessed: number;
  errors: string[];
}

export class PlatformIntegrationService {
  private activeSyncs: Map<string, SyncOperation> = new Map();

  async getIntegrationStatus(organizationId: string): Promise<IntegrationHealthCheck> {
    const platforms = await this.getPlatformStatuses(organizationId);
    const agentMemory = await this.getAgentMemoryStatus(organizationId);
    const issues = this.identifyIssues(platforms, agentMemory);
    const recommendations = this.generateRecommendations(platforms, agentMemory, issues);

    const overall = this.calculateOverallHealth(platforms, agentMemory, issues);

    return {
      overall,
      platforms,
      agentMemory,
      issues,
      recommendations,
    };
  }

  async connectPlatform(
    organizationId: string,
    platform: PlatformType,
    authCode: string,
    state: string
  ): Promise<{ success: boolean; connectionId?: string; error?: string }> {
    try {
      // Exchange OAuth code for tokens
      const tokens = await platformAuthService.exchangeOAuthCode(platform, authCode, state);
      
      // Store credentials
      const platformId = `${platform}_${organizationId}`;
      const stored = await platformAuthService.storeCredentials(
        platformId,
        platform,
        organizationId,
        tokens,
        { organizationId }
      );

      if (!stored) {
        return { success: false, error: 'Failed to store credentials' };
      }

      // Create platform connection record
      const [connection] = await pgDb
        .insert(platformConnections)
        .values({
          organizationId: organizationId as any,
          platform,
          isActive: true,
          metadata: {
            status: 'connected',
            connectedAt: new Date().toISOString(),
            credentialsStored: true,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        } as any)
        .returning({ id: platformConnections.id });

      // Register webhooks if supported
      try {
        await webhookManager.registerWebhook({
          platform,
          organizationId,
          endpointUrl: `${process.env.API_BASE_URL}/webhooks/${platform}`,
          events: this.getWebhookEvents(platform),
          isActive: true,
        });
      } catch (webhookError) {
        logger.warn(`[PlatformIntegrationService] Failed to register webhooks for ${platform}:`, webhookError);
      }

      return { 
        success: true, 
        connectionId: String((connection as any).id),
      };
    } catch (error) {
      logger.error(`Failed to connect platform ${platform}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async disconnectPlatform(
    organizationId: string,
    platform: PlatformType
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get connection
      const [connection] = await pgDb
        .select()
        .from(platformConnections)
        .where(and(
          eq(platformConnections.organizationId, organizationId as any),
          eq(platformConnections.platform, platform)
        ))
        .limit(1);

      if (!connection) {
        return { success: false, error: 'Platform connection not found' };
      }

      // Unregister webhooks
      try {
        const webhooks = await webhookManager.getWebhooks(organizationId, platform);
        for (const webhook of webhooks) {
          await webhookManager.unregisterWebhook(webhook.id);
        }
      } catch (webhookError) {
        logger.warn(`[PlatformIntegrationService] Failed to unregister webhooks for ${platform}:`, webhookError);
      }

      // Remove credentials
      const platformId = `${platform}_${organizationId}`;
      await platformAuthService.disconnect(organizationId, platformId);

      // Deactivate connection
      await pgDb
        .update(platformConnections)
        .set({ 
          isActive: false, 
          metadata: {
            ...((connection as any).metadata || {}),
            status: 'disconnected',
            disconnectedAt: new Date().toISOString(),
          },
          updatedAt: new Date(),
        } as any)
        .where(eq(platformConnections.id, (connection as any).id));

      return { success: true };
    } catch (error) {
      logger.error(`Failed to disconnect platform ${platform}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async syncPlatform(
    organizationId: string,
    platform: PlatformType,
    type: 'full' | 'incremental' = 'full'
  ): Promise<SyncOperation> {
    const syncId = this.generateSyncId();
    const syncOperation: SyncOperation = {
      id: syncId,
      platform,
      organizationId,
      type,
      status: 'pending',
      startTime: new Date(),
      recordsProcessed: 0,
      errors: [],
    };

    this.activeSyncs.set(syncId, syncOperation);

    try {
      syncOperation.status = 'running';
      
      // Get connection
      const [connection] = await pgDb
        .select()
        .from(platformConnections)
        .where(and(
          eq(platformConnections.organizationId, organizationId as any),
          eq(platformConnections.platform, platform)
        ))
        .limit(1);

      if (!connection) {
        throw new Error('Platform connection not found');
      }

      if (!(connection as any).isActive) {
        // Automatically reactivate if we're explicitly trying to sync
        await pgDb
          .update(platformConnections)
          .set({ 
            isActive: true,
            updatedAt: new Date()
          })
          .where(eq(platformConnections.id, (connection as any).id));
      }

      // Perform sync
      const syncResult: SyncResult = await platformSyncService.syncPlatform(
        organizationId,
        platform,
        (connection as any).id
      );

      syncOperation.recordsProcessed = syncResult.recordsProcessed;
      
      if (!syncResult.success) {
        syncOperation.errors = syncResult.errors;
        throw new Error(`Sync failed: ${syncResult.errors.join(', ')}`);
      }

      // Detect and resolve conflicts
      if (syncResult.recordsProcessed > 0) {
        await this.handleSyncConflicts(organizationId, platform, syncResult);
      }

      syncOperation.status = 'completed';
      syncOperation.endTime = new Date();
    } catch (error) {
      syncOperation.status = 'failed';
      syncOperation.endTime = new Date();
      syncOperation.errors.push(error instanceof Error ? error.message : 'Unknown error');
    }

    this.activeSyncs.delete(syncId);
    return syncOperation;
  }

  async searchAgentMemory(
    agentId: string,
    organizationId: string,
    query: SearchQuery
  ): Promise<any[]> {
    return semanticSearchService.searchMemories(agentId, organizationId, query);
  }

  async getAgentContext(
    agentId: string,
    organizationId: string,
    query: string,
    options?: any
  ): Promise<MemoryContext> {
    return semanticSearchService.retrieveContext(agentId, organizationId, query, options);
  }

  async generateMemorySummary(
    agentId: string,
    organizationId: string,
    type: 'daily' | 'weekly' | 'monthly' | 'topic',
    topic?: string
  ): Promise<any> {
    return memoryManagementService.generateSummary(agentId, organizationId, type, topic);
  }

  async pruneAgentMemory(
    agentId: string,
    organizationId: string
  ): Promise<any> {
    return memoryManagementService.pruneMemories(agentId, organizationId);
  }

  async handleWebhook(
    platform: PlatformType,
    organizationId: string,
    eventId: string,
    eventType: string,
    payload: any,
    headers: Record<string, string>,
    signature?: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Process webhook
      const result = await webhookManager.processIncomingWebhook(
        platform,
        organizationId,
        eventId,
        eventType,
        payload,
        headers,
        signature
      );

      if (!result.success) {
        return result;
      }

      // Trigger incremental sync if needed
      if (this.shouldTriggerSync(eventType)) {
        await this.syncPlatform(organizationId, platform, 'incremental');
      }

      return result;
    } catch (error) {
      logger.error(`Webhook handling failed for ${platform}:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getSyncOperation(syncId: string): Promise<SyncOperation | undefined> {
    return this.activeSyncs.get(syncId);
  }

  async getActiveSyncs(organizationId: string): Promise<SyncOperation[]> {
    return Array.from(this.activeSyncs.values())
      .filter(sync => sync.organizationId === organizationId && sync.status === 'running');
  }

  // Private helper methods
  private async getPlatformStatuses(organizationId: string): Promise<PlatformIntegrationStatus[]> {
    const platforms: PlatformType[] = [
      'salesforce', 'hubspot', 'slack', 'microsoft_teams', 'google_workspace', 
      'zoom', 'calendly', 'stripe', 'whatsapp', 'instagram', 'facebook', 
      'linkedin', 'twitter', 'telegram', 'signal'
    ];

    const statuses: PlatformIntegrationStatus[] = [];

    for (const platform of platforms) {
      const status = await this.getPlatformStatus(organizationId, platform);
      statuses.push(status);
    }

    return statuses;
  }

  private async getPlatformStatus(organizationId: string, platform: PlatformType): Promise<PlatformIntegrationStatus> {
    try {
      const [connection] = await pgDb
        .select()
        .from(platformConnections)
        .where(and(
          eq(platformConnections.organizationId, organizationId as any),
          eq(platformConnections.platform, platform)
        ))
        .limit(1);

      const isConnected = !!connection;
      const isActive = isConnected && (connection as any).isActive;
      const lastSyncAt = (connection as any)?.lastSyncAt ? new Date((connection as any).lastSyncAt) : undefined;
      
      const metadata = (connection as any)?.metadata || {};
      const lastSyncResult = metadata.lastSyncResult || {};
      const syncStatus = lastSyncResult.success ? 'success' : 
                        lastSyncResult.errors?.length > 0 ? 'failed' : 
                        lastSyncAt ? 'pending' : 'never';

      // Check credentials status
      const credentials = await platformAuthService.ensureValidCredentialsForOrg(organizationId, platform);
      const credentialsStatus = credentials ? 'valid' : 'missing';

      // Check webhook status
      const webhookStatus = metadata.webhookRegistered ? 'active' : 'inactive';

      // Get record counts
      const totalRecords = lastSyncResult.recordsProcessed || 0;
      const errorCount = lastSyncResult.errors?.length || 0;

      return {
        platform,
        isConnected,
        isActive,
        lastSyncAt,
        syncStatus,
        credentialsStatus,
        webhookStatus,
        totalRecords,
        errorCount,
      };
    } catch (error) {
      return {
        platform,
        isConnected: false,
        isActive: false,
        syncStatus: 'never',
        credentialsStatus: 'missing',
        webhookStatus: 'inactive',
        totalRecords: 0,
        errorCount: 1,
      };
    }
  }

  private async getAgentMemoryStatus(organizationId: string): Promise<AgentMemoryStatus> {
    try {
      // Get stats for all agents in the organization
      const result = await pgDb.execute(`
        SELECT 
          COUNT(*) as total_memories,
          AVG(importance_score) as avg_importance_score,
          MAX(created_at) as newest_memory
        FROM agent_memories
        WHERE organization_id = $1
      `, [organizationId]);

      const contextsResult = await pgDb.execute(`
        SELECT COUNT(*) as total_contexts
        FROM agent_memory_contexts
        WHERE organization_id = $1
      `, [organizationId]);

      const summariesResult = await pgDb.execute(`
        SELECT COUNT(*) as total_summaries, MAX(created_at) as last_summary
        FROM agent_memory_summaries
        WHERE organization_id = $1
      `, [organizationId]);

      const pruningResult = await pgDb.execute(`
        SELECT MAX(completed_at) as last_pruning
        FROM agent_memory_cleanup_jobs
        WHERE organization_id = $1 AND job_type = 'prune' AND status = 'completed'
      `, [organizationId]);

      const row = result.rows[0];
      const contextsRow = contextsResult.rows[0];
      const summariesRow = summariesResult.rows[0];
      const pruningRow = pruningResult.rows[0];

      const totalMemories = parseInt(row.total_memories) || 0;
      const totalContexts = parseInt(contextsRow.total_contexts) || 0;
      const totalSummaries = parseInt(summariesRow.total_summaries) || 0;

      return {
        totalMemories,
        totalContexts,
        totalSummaries,
        avgImportanceScore: parseFloat(row.avg_importance_score) || 0,
        storageUsage: this.estimateStorageUsage(totalMemories, totalContexts, totalSummaries),
        lastSummaryAt: summariesRow.last_summary ? new Date(summariesRow.last_summary) : undefined,
        lastPruningAt: pruningRow.last_pruning ? new Date(pruningRow.last_pruning) : undefined,
      };
    } catch (error) {
      logger.error('[PlatformIntegrationService] Failed to get agent memory status:', error);
      return {
        totalMemories: 0,
        totalContexts: 0,
        totalSummaries: 0,
        avgImportanceScore: 0,
        storageUsage: 0,
      };
    }
  }

  private identifyIssues(platforms: PlatformIntegrationStatus[], agentMemory: AgentMemoryStatus): string[] {
    const issues: string[] = [];

    // Platform issues
    for (const platform of platforms) {
      if (platform.isConnected && !platform.isActive) {
        issues.push(`${platform.platform} connection is inactive`);
      }
      
      if (platform.credentialsStatus === 'expired' || platform.credentialsStatus === 'reauth_required') {
        issues.push(`${platform.platform} credentials need refresh`);
      }
      
      if (platform.syncStatus === 'failed') {
        issues.push(`${platform.platform} sync is failing`);
      }
      
      if (platform.errorCount > 5) {
        issues.push(`${platform.platform} has high error rate`);
      }
    }

    // Memory issues
    if (agentMemory.totalMemories > 50000) {
      issues.push('Agent memory storage is getting large');
    }
    
    if (agentMemory.lastPruningAt && (Date.now() - agentMemory.lastPruningAt.getTime()) > 7 * 24 * 60 * 60 * 1000) {
      issues.push('Agent memory pruning is overdue');
    }
    
    if (agentMemory.avgImportanceScore < 1.0) {
      issues.push('Agent memory quality is low');
    }

    return issues;
  }

  private generateRecommendations(
    platforms: PlatformIntegrationStatus[],
    agentMemory: AgentMemoryStatus,
    issues: string[]
  ): string[] {
    const recommendations: string[] = [];

    // Platform recommendations
    const inactivePlatforms = platforms.filter(p => p.isConnected && !p.isActive);
    if (inactivePlatforms.length > 0) {
      recommendations.push('Consider reactivating inactive platform connections');
    }

    const failedPlatforms = platforms.filter(p => p.syncStatus === 'failed');
    if (failedPlatforms.length > 0) {
      recommendations.push('Review and fix platform sync failures');
    }

    const platformsWithoutWebhooks = platforms.filter(p => p.isConnected && p.webhookStatus === 'inactive');
    if (platformsWithoutWebhooks.length > 0) {
      recommendations.push('Enable webhooks for real-time data synchronization');
    }

    // Memory recommendations
    if (agentMemory.totalMemories > 50000) {
      recommendations.push('Run memory pruning to optimize storage');
    }
    
    if (agentMemory.totalSummaries === 0) {
      recommendations.push('Enable memory summarization for better context retention');
    }
    
    if (agentMemory.avgImportanceScore < 1.0) {
      recommendations.push('Review memory importance scoring criteria');
    }

    return recommendations;
  }

  private calculateOverallHealth(
    platforms: PlatformIntegrationStatus[],
    agentMemory: AgentMemoryStatus,
    issues: string[]
  ): 'healthy' | 'degraded' | 'unhealthy' {
    const criticalIssues = issues.filter(issue => 
      issue.includes('failed') || issue.includes('expired') || issue.includes('overdue')
    );

    if (criticalIssues.length > 0) {
      return 'unhealthy';
    }

    const activePlatforms = platforms.filter(p => p.isActive).length;
    const totalPlatforms = platforms.filter(p => p.isConnected).length;
    
    if (totalPlatforms === 0 || activePlatforms / totalPlatforms < 0.5) {
      return 'degraded';
    }

    if (issues.length > 3) {
      return 'degraded';
    }

    return 'healthy';
  }

  private async handleSyncConflicts(
    organizationId: string,
    platform: PlatformType,
    syncResult: SyncResult
  ): Promise<void> {
    // In a real implementation, this would detect and resolve conflicts
    // For now, just log the sync result
    logger.info(`[PlatformIntegrationService] Sync completed for ${platform}:`, syncResult);
  }

  private getWebhookEvents(platform: PlatformType): string[] {
    const eventMap: Record<PlatformType, string[]> = {
      salesforce: ['object.created', 'object.updated', 'object.deleted'],
      hubspot: ['contact.creation', 'contact.deletion', 'company.creation', 'deal.creation'],
      slack: ['message', 'member_joined_channel', 'member_left_channel'],
      microsoft_teams: ['message', 'member_added', 'member_removed'],
      google_workspace: ['calendar.created', 'calendar.updated', 'message.received'],
      zoom: ['meeting.created', 'meeting.updated', 'meeting.ended'],
      calendly: ['invitee.created', 'invitee.canceled'],
      stripe: ['customer.created', 'charge.succeeded', 'invoice.payment_succeeded'],
      whatsapp: ['message', 'message.delivery', 'message.read'],
      instagram: ['comments', 'mentions', 'direct_message'],
      facebook: ['message', 'post', 'comment'],
      linkedin: ['message', 'post', 'comment'],
      twitter: ['tweet', 'mention', 'direct_message'],
      telegram: ['message', 'callback_query'],
      signal: ['message'],
    };

    return eventMap[platform] || [];
  }

  private shouldTriggerSync(eventType: string): boolean {
    const syncTriggeringEvents = [
      'object.created', 'object.updated', 'object.deleted',
      'contact.creation', 'company.creation', 'deal.creation',
      'calendar.created', 'calendar.updated',
      'meeting.created', 'meeting.updated',
      'customer.created', 'charge.succeeded',
    ];

    return syncTriggeringEvents.some(event => eventType.includes(event));
  }

  private estimateStorageUsage(memories: number, contexts: number, summaries: number): number {
    const avgMemorySize = 1000; // 1KB
    const avgContextSize = 500; // 500B
    const avgSummarySize = 2000; // 2KB
    
    return memories * avgMemorySize + contexts * avgContextSize + summaries * avgSummarySize;
  }

  private generateSyncId(): string {
    return `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const platformIntegrationService = new PlatformIntegrationService();
