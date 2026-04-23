import { Request, Response } from 'express';
import { platformAuthService, PlatformType } from './platform-auth-service';
import { platformDataSyncService } from './platform-data-sync-service';
import { webhookManagementService } from './webhook-management-service';
import { syncConflictResolutionService } from './sync-conflict-resolution-service';
import { agentMemoryService } from './agent-memory-system';
import { memoryProcessingService } from './memory-processing-service';

/**
 * Platform Integration Controller
 * Handles all platform connection, sync, and webhook operations
 */
export class PlatformIntegrationController {
  /**
   * Get OAuth URL for platform authentication
   */
  async getOAuthUrl(req: Request, res: Response): Promise<void> {
    try {
      // CRITICAL SECURITY FIX: Verify authentication and authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const token = authHeader.slice('bearer '.length).trim();
      const { verifyToken, validateSession } = await import('../lib/auth');
      const payload = verifyToken(token);
      const sessionValidation = await validateSession(token);
      
      if (!payload?.userId || !sessionValidation.valid || sessionValidation.userId !== payload.userId) {
        res.status(401).json({ error: 'Invalid authentication' });
        return;
      }

      const { platform, userId } = req.params;
      const { organizationId } = req.body;

      // SECURITY: Users can only access their own data
      if (userId !== payload.userId) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }

      // Verify organization access if provided
      if (organizationId && sessionValidation.organizationId !== organizationId) {
        res.status(403).json({ error: 'Organization access denied' });
        return;
      }

      if (!platformAuthService.isPlatformSupported(platform as PlatformType)) {
        res.status(400).json({ error: 'Unsupported platform' });
        return;
      }

      const oauthUrl = platformAuthService.generateOAuthUrl(platform as PlatformType, userId);
      
      res.json({
        success: true,
        data: {
          oauthUrl,
          platform,
          userId,
          organizationId,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] OAuth URL generation failed:', error);
      res.status(500).json({ error: 'Failed to generate OAuth URL' });
    }
  }

  /**
   * Handle OAuth callback
   */
  async handleOAuthCallback(req: Request, res: Response): Promise<void> {
    try {
      const { platform } = req.params;
      const { code, state, userId } = req.query;

      if (!code || !state) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
      }

      const tokenData = await platformAuthService.exchangeOAuthCode(
        platform as PlatformType,
        code as string,
        state as string
      );

      const { organizationId } = req.body || {};

      // Store credentials
      const success = await platformAuthService.storeCredentials(
        userId as string,
        platform as PlatformType,
        tokenData,
        { organizationId }
      );

      if (!success) {
        res.status(500).json({ error: 'Failed to store credentials' });
        return;
      }

      // Register webhook if supported
      let webhookUrl: string | undefined;
      try {
        webhookUrl = webhookManagementService.registerWebhookEndpoint(
          platform as PlatformType,
          organizationId
        );
      } catch (webhookError) {
        console.warn(`[PlatformIntegrationController] Webhook registration failed for ${platform}:`, webhookError);
      }

      res.json({
        success: true,
        data: {
          platform,
          accessToken: tokenData.accessToken,
          expiresIn: tokenData.expiresIn,
          scope: tokenData.scope,
          webhookUrl,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] OAuth callback failed:', error);
      res.status(500).json({ error: 'OAuth callback failed' });
    }
  }

  /**
   * Sync platform data
   */
  async syncPlatform(req: Request, res: Response): Promise<void> {
    try {
      const { platform, organizationId } = req.params;
      const { connectionId, jobType = 'manual_sync' } = req.body;

      const syncResult = await platformDataSyncService.syncPlatform(
        organizationId,
        platform as PlatformType,
        connectionId
      );

      res.json({
        success: syncResult.success,
        data: {
          platform,
          organizationId,
          messageCount: syncResult.messageCount,
          recordsProcessed: syncResult.recordsProcessed,
          errors: syncResult.errors,
          lastSyncAt: syncResult.lastSyncAt,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Platform sync failed:', error);
      res.status(500).json({ error: 'Platform sync failed' });
    }
  }

  /**
   * Get platform connections
   */
  async getConnections(req: Request, res: Response): Promise<void> {
    try {
      const { organizationId } = req.params;
      const { platform } = req.query;

      // Get connections from platform integration service
      const { platformIntegrationService } = await import('../services/platform-integration-service');
      
      let connections;
      if (platform) {
        // Get connections for specific platform
        connections = await platformIntegrationService.getConnectionsByPlatform(
          organizationId as string,
          platform as string
        );
      } else {
        // Get all connections for organization
        connections = await platformIntegrationService.getAllConnections(organizationId as string);
      }

      res.json({
        success: true,
        data: {
          connections: connections.map(conn => ({
            id: conn.id,
            platform: conn.platform,
            status: conn.status,
            createdAt: conn.createdAt,
            lastSyncAt: conn.lastSyncAt,
            metadata: {
              name: conn.name,
              description: conn.description,
              // Don't expose sensitive credentials
              hasCredentials: !!conn.credentials,
              scopes: conn.scopes || []
            }
          }))
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Get connections failed:', error);
      res.status(500).json({ error: 'Failed to get connections' });
    }
  }

  /**
   * Test webhook endpoint
   */
  async testWebhook(req: Request, res: Response): Promise<void> {
    try {
      const { platform, organizationId } = req.params;

      const testResult = await webhookManagementService.testWebhook(
        platform as PlatformType,
        organizationId
      );

      res.json({
        success: testResult.success,
        data: {
          platform,
          url: testResult.url,
          success: testResult.success,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Webhook test failed:', error);
      res.status(500).json({ error: 'Webhook test failed' });
    }
  }

  /**
   * Get webhook statistics
   */
  async getWebhookStats(req: Request, res: Response): Promise<void> {
    try {
      const { organizationId } = req.params;
      const { platform } = req.query;

      const stats = await webhookManagementService.getWebhookStats(
        organizationId,
        platform as PlatformType
      );

      res.json({
        success: true,
        data: stats,
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Get webhook stats failed:', error);
      res.status(500).json({ error: 'Failed to get webhook statistics' });
    }
  }

  /**
   * Get sync conflicts
   */
  async getConflicts(req: Request, res: Response): Promise<void> {
    try {
      const { organizationId } = req.params;
      const { platform } = req.query;

      const conflicts = await syncConflictResolutionService.getUnresolvedConflicts(
        organizationId,
        platform as PlatformType
      );

      res.json({
        success: true,
        data: {
          conflicts,
          count: conflicts.length,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Get conflicts failed:', error);
      res.status(500).json({ error: 'Failed to get conflicts' });
    }
  }

  /**
   * Resolve sync conflict
   */
  async resolveConflict(req: Request, res: Response): Promise<void> {
    try {
      const { conflictId } = req.params;
      const { strategy, resolvedData, resolvedBy, notes } = req.body;

      const success = await syncConflictResolutionService.manuallyResolveConflict({
        conflictId,
        strategy,
        resolvedData,
        resolvedBy,
        notes,
      });

      res.json({
        success,
        data: {
          conflictId,
          strategy,
          resolved: success,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Conflict resolution failed:', error);
      res.status(500).json({ error: 'Failed to resolve conflict' });
    }
  }

  /**
   * Get conflict statistics
   */
  async getConflictStats(req: Request, res: Response): Promise<void> {
    try {
      const { organizationId } = req.params;
      const { platform } = req.query;

      const stats = await syncConflictResolutionService.getConflictStats(
        organizationId,
        platform as PlatformType
      );

      res.json({
        success: true,
        data: stats,
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Get conflict stats failed:', error);
      res.status(500).json({ error: 'Failed to get conflict statistics' });
    }
  }
}

/**
 * Agent Memory Controller
 * Handles all agent memory operations
 */
export class AgentMemoryController {
  /**
   * Store a memory
   */
  async storeMemory(req: Request, res: Response): Promise<void> {
    try {
      const { agentId, organizationId } = req.params;
      const memoryData = req.body;

      const memoryId = await agentMemoryService.storeMemory({
        agentId,
        organizationId,
        ...memoryData,
      });

      res.json({
        success: true,
        data: {
          memoryId,
          agentId,
          organizationId,
        },
      });

    } catch (error) {
      console.error('[AgentMemoryController] Store memory failed:', error);
      res.status(500).json({ error: 'Failed to store memory' });
    }
  }

  /**
   * Search memories
   */
  async searchMemories(req: Request, res: Response): Promise<void> {
    try {
      const { agentId, organizationId } = req.params;
      const { query, ...options } = req.query;

      if (!query) {
        res.status(400).json({ error: 'Query parameter is required' });
        return;
      }

      const results = await agentMemoryService.searchMemories(
        agentId,
        organizationId,
        query as string,
        options as any
      );

      res.json({
        success: true,
        data: {
          results,
          count: results.length,
          query,
        },
      });

    } catch (error) {
      console.error('[AgentMemoryController] Search memories failed:', error);
      res.status(500).json({ error: 'Failed to search memories' });
    }
  }

  /**
   * Get memory by ID
   */
  async getMemory(req: Request, res: Response): Promise<void> {
    try {
      const { memoryId, organizationId } = req.params;

      const memory = await agentMemoryService.getMemory(memoryId, organizationId);

      if (!memory) {
        res.status(404).json({ error: 'Memory not found' });
        return;
      }

      res.json({
        success: true,
        data: memory,
      });

    } catch (error) {
      console.error('[AgentMemoryController] Get memory failed:', error);
      res.status(500).json({ error: 'Failed to get memory' });
    }
  }

  /**
   * Get memory statistics
   */
  async getMemoryStats(req: Request, res: Response): Promise<void> {
    try {
      const { agentId, organizationId } = req.params;

      const stats = await agentMemoryService.getMemoryStats(agentId, organizationId);

      res.json({
        success: true,
        data: stats,
      });

    } catch (error) {
      console.error('[AgentMemoryController] Get memory stats failed:', error);
      res.status(500).json({ error: 'Failed to get memory statistics' });
    }
  }

  /**
   * Queue memory summarization
   */
  async queueSummarization(req: Request, res: Response): Promise<void> {
    try {
      const { agentId, organizationId } = req.params;
      const { jobType, memoryId, inputData } = req.body;

      const jobId = await memoryProcessingService.queueSummarization(
        agentId,
        organizationId,
        jobType,
        memoryId,
        inputData
      );

      res.json({
        success: true,
        data: {
          jobId,
          agentId,
          organizationId,
          jobType,
        },
      });

    } catch (error) {
      console.error('[AgentMemoryController] Queue summarization failed:', error);
      res.status(500).json({ error: 'Failed to queue summarization' });
    }
  }

  /**
   * Get processing statistics
   */
  async getProcessingStats(req: Request, res: Response): Promise<void> {
    try {
      const { agentId, organizationId } = req.params;

      const stats = await memoryProcessingService.getProcessingStats(agentId, organizationId);

      res.json({
        success: true,
        data: stats,
      });

    } catch (error) {
      console.error('[AgentMemoryController] Get processing stats failed:', error);
      res.status(500).json({ error: 'Failed to get processing statistics' });
    }
  }
}

export const platformIntegrationController = new PlatformIntegrationController();
export const agentMemoryController = new AgentMemoryController();
