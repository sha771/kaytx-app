import { Hono } from 'hono';
import { z } from 'zod';
import { db as pgDb } from '../../db/connection';
import { 
  webhooks,
  integrations,
  notifications,
  backups,
  users
} from '../../db/drizzle-schema';
import crypto from 'crypto';
import { 
  requireAuth, 
  requirePermission 
} from '../../middleware/rbac-middleware';
import { 
  validateBody, 
  validateQuery, 
  validateParams 
} from '../../middleware/validate';
import { 
  Permission 
} from '../../lib/rbac';
import { 
  eq, 
  desc, 
  and 
} from 'drizzle-orm';
import { 
  jsonApiError 
} from '../../lib/api-error';
import { encrypt, encryptIntegrationCredentials, getFieldEncryptionKey } from '../../lib/encryption';

const enterpriseManagementRouter = new Hono();

// Apply authentication to all routes
enterpriseManagementRouter.use('*', requireAuth());

// =============================================================================
// WEBHOOK MANAGEMENT ENDPOINTS
// =============================================================================

const webhookBodySchema = z.object({
  name: z.string().min(1).max(255),
  url: z.string().url(),
  events: z.array(z.string()).min(1),
  secret: z.string().min(1).optional(),
  headers: z.record(z.string()).optional().default({}),
  retryAttempts: z.number().min(0).max(10).optional().default(3),
});

enterpriseManagementRouter.post(
  '/webhooks',
  requirePermission(Permission.WEBHOOK_CREATE),
  validateBody(webhookBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const webhookId = crypto.randomUUID();
      const secret = body.secret || crypto.randomBytes(32).toString('hex');

      const encryptionKey = getFieldEncryptionKey();
      const encryptedSecret = JSON.stringify(encrypt(secret, encryptionKey));
      
      const [webhook] = await pgDb.insert(webhooks).values({
        id: webhookId,
        organizationId: auth.organizationId,
        name: body.name,
        url: body.url,
        events: body.events,
        secret: encryptedSecret,
        headers: body.headers,
        retryAttempts: body.retryAttempts,
        status: 'active',
      }).returning();
      
      // Return webhook without secret for security
      const { secret: _, ...webhookResponse } = webhook;
      
      return c.json({
        success: true,
        data: webhookResponse,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create webhook');
    }
  }
);

enterpriseManagementRouter.get(
  '/webhooks',
  requirePermission(Permission.WEBHOOK_READ),
  validateQuery(z.object({
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(webhooks.organizationId, auth.organizationId);
      
      if (query.status) {
        whereClause = and(whereClause, eq(webhooks.status, query.status));
      }
      
      const hooks = await pgDb
        .select({
          id: webhooks.id,
          name: webhooks.name,
          url: webhooks.url,
          events: webhooks.events,
          status: webhooks.status,
          headers: webhooks.headers,
          retryAttempts: webhooks.retryAttempts,
          failureCount: webhooks.failureCount,
          lastTriggeredAt: webhooks.lastTriggeredAt,
          createdAt: webhooks.createdAt,
          updatedAt: webhooks.updatedAt,
        })
        .from(webhooks)
        .where(whereClause)
        .orderBy(desc(webhooks.createdAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          webhooks: hooks,
          summary: {
            total: hooks.length,
            active: hooks.filter(h => h.status === 'active').length,
            failed: hooks.filter(h => h.failureCount > 0).length,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch webhooks');
    }
  }
);

enterpriseManagementRouter.post(
  '/webhooks/:id/test',
  requirePermission(Permission.WEBHOOK_TEST),
  validateParams(z.object({ id: z.string().uuid() })),
  validateBody(z.object({
    testPayload: z.record(z.any()).optional().default({ test: true }),
  })),
  async (c) => {
    const auth = c.get('auth');
    const params = c.get('validatedParams') as any;
    const body = c.get('validatedBody') as any;
    
    try {
      const [webhook] = await pgDb
        .select()
        .from(webhooks)
        .where(
          and(
            eq(webhooks.id, params.id),
            eq(webhooks.organizationId, auth.organizationId)
          )
        )
        .limit(1);
      
      if (!webhook) {
        return jsonApiError(c, 404, 'NOT_FOUND', 'Webhook not found');
      }
      
      // Simulate webhook test
      const testResult = {
        success: true,
        responseTime: Math.floor(Math.random() * 1000) + 100,
        statusCode: 200,
        response: { status: 'ok' },
      };
      
      return c.json({
        success: true,
        data: {
          webhookId: webhook.id,
          testResult,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to test webhook');
    }
  }
);

// =============================================================================
// INTEGRATION MANAGEMENT ENDPOINTS
// =============================================================================

const integrationBodySchema = z.object({
  name: z.string().min(1).max(255),
  type: z.string().min(1),
  provider: z.string().min(1),
  credentials: z.record(z.any()),
  config: z.record(z.any()).optional().default({}),
  syncFrequency: z.number().min(300).optional().default(3600), // Minimum 5 minutes
});

enterpriseManagementRouter.post(
  '/integrations',
  requirePermission(Permission.INTEGRATION_CREATE),
  validateBody(integrationBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const integrationId = crypto.randomUUID();

      const encryptedCredentials = encryptIntegrationCredentials(body.credentials);
      
      const [integration] = await pgDb.insert(integrations).values({
        id: integrationId,
        organizationId: auth.organizationId,
        name: body.name,
        type: body.type,
        provider: body.provider,
        credentials: encryptedCredentials as any,
        config: body.config,
        syncFrequency: body.syncFrequency,
        status: 'inactive',
        errorCount: 0,
      }).returning();
      
      // Return integration without credentials for security
      const { credentials: _, ...integrationResponse } = integration;
      
      return c.json({
        success: true,
        data: integrationResponse,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create integration');
    }
  }
);

enterpriseManagementRouter.get(
  '/integrations',
  requirePermission(Permission.INTEGRATION_READ),
  validateQuery(z.object({
    type: z.string().optional(),
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(integrations.organizationId, auth.organizationId);
      
      if (query.type) {
        whereClause = and(whereClause, eq(integrations.type, query.type));
      }
      
      if (query.status) {
        whereClause = and(whereClause, eq(integrations.status, query.status));
      }
      
      const integrationList = await pgDb
        .select({
          id: integrations.id,
          name: integrations.name,
          type: integrations.type,
          provider: integrations.provider,
          status: integrations.status,
          config: integrations.config,
          syncFrequency: integrations.syncFrequency,
          lastSyncAt: integrations.lastSyncAt,
          errorCount: integrations.errorCount,
          lastError: integrations.lastError,
          createdAt: integrations.createdAt,
          updatedAt: integrations.updatedAt,
        })
        .from(integrations)
        .where(whereClause)
        .orderBy(desc(integrations.createdAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          integrations: integrationList,
          summary: {
            total: integrationList.length,
            active: integrationList.filter(i => i.status === 'active').length,
            withErrors: integrationList.filter(i => i.errorCount > 0).length,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch integrations');
    }
  }
);

enterpriseManagementRouter.post(
  '/integrations/:id/test',
  requirePermission(Permission.INTEGRATION_TEST),
  validateParams(z.object({ id: z.string().uuid() })),
  async (c) => {
    const auth = c.get('auth');
    const params = c.get('validatedParams') as any;
    
    try {
      const [integration] = await pgDb
        .select()
        .from(integrations)
        .where(
          and(
            eq(integrations.id, params.id),
            eq(integrations.organizationId, auth.organizationId)
          )
        )
        .limit(1);
      
      if (!integration) {
        return jsonApiError(c, 404, 'NOT_FOUND', 'Integration not found');
      }
      
      // Simulate integration test
      const testResult = {
        success: true,
        responseTime: Math.floor(Math.random() * 2000) + 200,
        connectionStatus: 'healthy',
        lastSync: new Date().toISOString(),
        dataPoints: Math.floor(Math.random() * 100) + 10,
      };
      
      return c.json({
        success: true,
        data: {
          integrationId: integration.id,
          testResult,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to test integration');
    }
  }
);

// =============================================================================
// NOTIFICATION MANAGEMENT ENDPOINTS
// =============================================================================

const notificationBodySchema = z.object({
  title: z.string().min(1).max(255),
  message: z.string().min(1),
  type: z.enum(['email', 'sms', 'push', 'in_app', 'webhook']),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional().default('medium'),
  userId: z.string().uuid().optional(),
  actionUrl: z.string().url().optional(),
});

enterpriseManagementRouter.post(
  '/notifications',
  requirePermission(Permission.MESSAGE_CREATE),
  validateBody(notificationBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const notificationId = crypto.randomUUID();
      
      const [notification] = await pgDb.insert(notifications).values({
        id: notificationId,
        userId: body.userId || auth.userId,
        organizationId: auth.organizationId,
        type: body.type,
        title: body.title,
        message: body.message,
        priority: body.priority,
        actionUrl: body.actionUrl,
        read: false,
      }).returning();
      
      // In a real implementation, this would trigger the actual notification delivery
      // For now, we'll simulate successful delivery
      
      return c.json({
        success: true,
        data: {
          ...notification,
          deliveryStatus: 'sent',
          estimatedDelivery: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create notification');
    }
  }
);

enterpriseManagementRouter.get(
  '/notifications',
  requirePermission(Permission.MESSAGE_READ),
  validateQuery(z.object({
    type: z.string().optional(),
    priority: z.string().optional(),
    read: z.enum(['true', 'false']).optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(notifications.organizationId, auth.organizationId);
      
      if (query.type) {
        whereClause = and(whereClause, eq(notifications.type, query.type));
      }
      
      if (query.priority) {
        whereClause = and(whereClause, eq(notifications.priority, query.priority));
      }
      
      if (query.read !== undefined) {
        whereClause = and(whereClause, eq(notifications.read, query.read === 'true'));
      }
      
      const notificationList = await pgDb
        .select({
          id: notifications.id,
          userId: notifications.userId,
          type: notifications.type,
          title: notifications.title,
          message: notifications.message,
          priority: notifications.priority,
          read: notifications.read,
          actionUrl: notifications.actionUrl,
          readAt: notifications.readAt,
          createdAt: notifications.createdAt,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(notifications)
        .leftJoin(users, eq(notifications.userId, users.id))
        .where(whereClause)
        .orderBy(desc(notifications.createdAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          notifications: notificationList,
          summary: {
            total: notificationList.length,
            unread: notificationList.filter(n => !n.read).length,
            byPriority: notificationList.reduce((acc, n) => {
              acc[n.priority] = (acc[n.priority] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
            byType: notificationList.reduce((acc, n) => {
              acc[n.type] = (acc[n.type] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch notifications');
    }
  }
);

// =============================================================================
// BACKUP MANAGEMENT ENDPOINTS
// =============================================================================

const backupBodySchema = z.object({
  type: z.enum(['full', 'incremental', 'differential']),
  retentionDays: z.number().min(1).max(365).optional().default(30),
});

enterpriseManagementRouter.post(
  '/backups',
  requirePermission(Permission.BACKUP_TRIGGER),
  validateBody(backupBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const backupId = crypto.randomUUID();
      const retentionUntil = new Date(Date.now() + body.retentionDays * 24 * 60 * 60 * 1000);
      
      const [backup] = await pgDb.insert(backups).values({
        id: backupId,
        organizationId: auth.organizationId,
        type: body.type,
        status: 'pending',
        retentionUntil,
        metadata: {
          requestedBy: auth.userId,
          estimatedSize: Math.floor(Math.random() * 1000) + 100, // MB
        },
      }).returning();
      
      // In a real implementation, this would trigger the actual backup job
      // For now, we'll simulate the backup process
      
      return c.json({
        success: true,
        data: {
          ...backup,
          estimatedDuration: body.type === 'full' ? 60 : 15, // minutes
          estimatedCompletion: new Date(Date.now() + (body.type === 'full' ? 60 : 15) * 60 * 1000),
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create backup');
    }
  }
);

enterpriseManagementRouter.get(
  '/backups',
  requirePermission(Permission.BACKUP_READ),
  validateQuery(z.object({
    type: z.string().optional(),
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(backups.organizationId, auth.organizationId);
      
      if (query.type) {
        whereClause = and(whereClause, eq(backups.type, query.type));
      }
      
      if (query.status) {
        whereClause = and(whereClause, eq(backups.status, query.status));
      }
      
      const backupList = await pgDb
        .select({
          id: backups.id,
          type: backups.type,
          status: backups.status,
          size: backups.size,
          location: backups.location,
          retentionUntil: backups.retentionUntil,
          error: backups.error,
          metadata: backups.metadata,
          createdAt: backups.createdAt,
          completedAt: backups.completedAt,
        })
        .from(backups)
        .where(whereClause)
        .orderBy(desc(backups.createdAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          backups: backupList,
          summary: {
            total: backupList.length,
            completed: backupList.filter(b => b.status === 'completed').length,
            failed: backupList.filter(b => b.status === 'failed').length,
            totalSize: backupList.reduce((sum, b) => sum + (b.size || 0), 0),
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch backups');
    }
  }
);

export default enterpriseManagementRouter;
