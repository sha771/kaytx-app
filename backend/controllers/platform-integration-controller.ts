import { Request, Response } from 'express';
import { platformAuthService, PlatformType } from './platform-auth-service';
import { platformDataSyncService } from './platform-data-sync-service';
import { unifiedWebhookService } from './unified-webhook-service';
import { syncConflictResolutionService } from './sync-conflict-resolution-service';

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

      if (userId !== payload.userId) {
        res.status(403).json({ error: 'Access denied' });
        return;
      }

      if (organizationId && sessionValidation.organizationId !== organizationId) {
        res.status(403).json({ error: 'Organization access denied' });
        return;
      }

      if (!platformAuthService.isPlatformSupported(platform)) {
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

      let webhookUrl: string | undefined;
      try {
        const result = await unifiedWebhookService.testWebhook('', organizationId, {});
        webhookUrl = result.url;
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
      const { connectionId } = req.body;

      const syncResult = await platformDataSyncService.syncData(
        connectionId || organizationId,
        platform as PlatformType
      );

      res.json({
        success: syncResult.success,
        data: {
          platform,
          organizationId,
          messageCount: syncResult.records || 0,
          recordsProcessed: syncResult.records || 0,
          errors: syncResult.error ? [syncResult.error] : [],
          lastSyncAt: new Date().toISOString(),
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

      const connections = [
        {
          id: 'conn_1',
          platform: platform || 'all',
          status: 'connected',
          createdAt: new Date().toISOString(),
          lastSyncAt: new Date().toISOString(),
          metadata: {
            name: 'Primary Connection',
            description: 'Main platform connection',
            hasCredentials: true,
            scopes: ['read', 'write']
          }
        }
      ];

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
              name: conn.metadata.name,
              description: conn.metadata.description,
              hasCredentials: conn.metadata.hasCredentials,
              scopes: conn.metadata.scopes || []
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
      const { organizationId } = req.params;

      const testResult = await unifiedWebhookService.testWebhook(
        '',
        organizationId,
        {}
      );

      res.json({
        success: testResult.success,
        data: {
          platform: 'webhook',
          url: testResult.url,
          success: testResult.success,
        },
      });

    } catch (error) {
      console.error('[PlatformIntegrationController] Test webhook failed:', error);
      res.status(500).json({ error: 'Test webhook failed' });
    }
  }

  /**
   * Get webhook statistics
   */
  async getWebhookStats(req: Request, res: Response): Promise<void> {
    try {
      const { organizationId } = req.params;
      const { platform } = req.query;

      const stats = await unifiedWebhookService.getWebhookStats(organizationId);

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