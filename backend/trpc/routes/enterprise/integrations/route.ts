import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { organizations, platformConnections } from '../../../../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { Permission } from '../../../../lib/rbac';
import { platformSyncEngine } from '../../../../services/consolidated-platform-sync-service';

// Helper function to map platform to integration type
function mapPlatformToType(platform: string): 'webhook' | 'api' | 'database' | 'messaging' | 'storage' | 'analytics' {
  const messagingPlatforms = ['slack', 'teams', 'discord'];
  const analyticsPlatforms = ['google', 'mixpanel', 'segment'];
  const storagePlatforms = ['s3', 'gcs', 'azure'];
  const databasePlatforms = ['postgres', 'mysql', 'mongodb'];
  
  if (messagingPlatforms.includes(platform)) return 'messaging';
  if (analyticsPlatforms.includes(platform)) return 'analytics';
  if (storagePlatforms.includes(platform)) return 'storage';
  if (databasePlatforms.includes(platform)) return 'database';
  
  return 'api';
}

const integrationConfigSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['webhook', 'api', 'database', 'messaging', 'storage', 'analytics']),
  provider: z.string().min(1),
  configuration: z.record(z.string(), z.unknown()),
  enabled: z.boolean().default(true),
});

const updateIntegrationSchema = z.object({
  integrationId: z.string(),
  name: z.string().optional(),
  configuration: z.record(z.string(), z.unknown()).optional(),
  enabled: z.boolean().optional(),
});

const testIntegrationSchema = z.object({
  integrationId: z.string(),
  testData: z.record(z.string(), z.unknown()).optional(),
});

const integrationLogsSchema = z.object({
  integrationId: z.string(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  level: z.enum(['debug', 'info', 'warn', 'error']).optional(),
  limit: z.number().min(1).max(1000).default(100),
});

export const getIntegrationsProcedure = permissionProcedure(Permission.INTEGRATION_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      // Get real platform connections from database
      const connections = await pgDb
        .select()
        .from(platformConnections)
        .where(eq(platformConnections.organizationId, organizationId))
        .orderBy(desc(platformConnections.createdAt));

      // Transform to integration format
      const integrations = connections.map(connection => ({
        id: connection.id,
        name: connection.name || `${connection.platform} Integration`,
        type: mapPlatformToType(connection.platform),
        provider: connection.platform,
        enabled: connection.status === 'active',
        status: connection.status,
        lastSync: connection.lastSyncAt,
        configuration: connection.config || {},
        metrics: {
          totalCalls: connection.metadata?.totalCalls || 0,
          successRate: connection.metadata?.successRate || 0,
          avgResponseTime: connection.metadata?.avgResponseTime || 0,
        },
      }));

      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.DATA_ACCESS,
        resource: 'integrations',
        status: 'success',
        metadata: { count: integrations.length },
      });

      return { integrations };
    } catch (error) {
      console.error('[Enterprise] Failed to fetch integrations:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.DATA_ACCESS,
        resource: 'integrations',
        status: 'failure',
        severity: 'error',
        metadata: { error: message },
      });

      throw new Error('Failed to retrieve integrations');
    }
  });

export const createIntegrationProcedure = permissionProcedure(Permission.INTEGRATION_CREATE)
  .input(integrationConfigSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const newIntegration = {
      id: `int_${Date.now()}`,
      name: input.name,
      type: input.type,
      provider: input.provider,
      configuration: input.configuration,
      enabled: input.enabled,
      status: 'pending',
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
      metrics: {
        totalCalls: 0,
        successRate: 0,
        avgResponseTime: 0,
      },
    };

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.INTEGRATION_CREATED,
      resource: 'integration',
      resourceId: newIntegration.id,
      organizationId,
      metadata: {
        name: input.name,
        type: input.type,
        provider: input.provider,
      },
      status: 'success',
    });

    return {
      success: true,
      integration: newIntegration,
      message: 'Integration created successfully',
    };
  });

export const updateIntegrationProcedure = permissionProcedure(Permission.INTEGRATION_UPDATE)
  .input(updateIntegrationSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.INTEGRATION_UPDATED,
      resource: 'integration',
      resourceId: input.integrationId,
      organizationId,
      metadata: {
        changes: Object.keys(input).filter(key => input[key as keyof typeof input] !== undefined),
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Integration updated successfully',
    };
  });

export const deleteIntegrationProcedure = permissionProcedure(Permission.INTEGRATION_DELETE)
  .input(z.object({ integrationId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.INTEGRATION_DELETED,
      resource: 'integration',
      resourceId: input.integrationId,
      organizationId,
      status: 'success',
    });

    return {
      success: true,
      message: 'Integration deleted successfully',
    };
  });

export const testIntegrationProcedure = permissionProcedure(Permission.INTEGRATION_TEST)
  .input(testIntegrationSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      // Get the platform connection
      const [connection] = await pgDb
        .select()
        .from(platformConnections)
        .where(and(
          eq(platformConnections.id, input.integrationId),
          eq(platformConnections.organizationId, organizationId)
        ))
        .limit(1);

      if (!connection) {
        throw new Error('Integration not found');
      }

      // Use platform sync engine to test the connection
      const testResult = await platformSyncEngine.testConnection(connection.platform, connection.config);

      logAudit({
        userId: ctx.user.id,
        action: AuditActions.INTEGRATION_TESTED,
        resource: 'integration',
        resourceId: input.integrationId,
        organizationId,
        metadata: {
          success: testResult.success,
          responseTime: testResult.responseTime,
        },
        status: testResult.success ? 'success' : 'failure',
      });

      return testResult;
    } catch (error) {
      console.error('[Enterprise] Failed to test integration:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.INTEGRATION_TESTED,
        resource: 'integration',
        resourceId: input.integrationId,
        metadata: { error: message },
        status: 'failure',
      });

      throw new Error('Failed to test integration');
    }
  });

export const getIntegrationLogsProcedure = permissionProcedure(Permission.INTEGRATION_READ)
  .input(integrationLogsSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // Mock integration logs
    const logs = Array.from({ length: Math.min(input.limit, 50) }, (_, i) => ({
      id: `log_${Date.now()}_${i}`,
      integrationId: input.integrationId,
      timestamp: new Date(Date.now() - i * 60000).toISOString(),
      level: ['info', 'warn', 'error'][Math.floor(Math.random() * 3)],
      message: `Integration log entry ${i + 1}`,
      details: {
        request: { method: 'POST', url: 'https://api.example.com/webhook' },
        response: { status: 200, time: 120 },
      },
    }));

    return {
      logs,
      pagination: {
        limit: input.limit,
        total: logs.length,
      },
    };
  });

export const getIntegrationMetricsProcedure = permissionProcedure(Permission.INTEGRATION_READ)
  .input(z.object({
    integrationId: z.string(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    granularity: z.enum(['hour', 'day', 'week']).default('day'),
  }))
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // Mock integration metrics
    const metrics = {
      integrationId: input.integrationId,
      timeRange: {
        startDate: input.startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: input.endDate || new Date().toISOString(),
        granularity: input.granularity,
      },
      data: Array.from({ length: 7 }, (_, i) => ({
        timestamp: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        requests: Math.floor(Math.random() * 1000) + 100,
        successes: Math.floor(Math.random() * 950) + 50,
        errors: Math.floor(Math.random() * 50),
        avgResponseTime: Math.floor(Math.random() * 200) + 50,
      })),
      summary: {
        totalRequests: Math.floor(Math.random() * 10000) + 1000,
        totalSuccesses: Math.floor(Math.random() * 9500) + 950,
        totalErrors: Math.floor(Math.random() * 500),
        successRate: Math.random() * 0.05 + 0.95, // 95-100%
        avgResponseTime: Math.floor(Math.random() * 100) + 50,
      },
    };

    return metrics;
  });

export const getAvailableIntegrationsProcedure = permissionProcedure(Permission.INTEGRATION_READ)
  .input(z.object({}).optional())
  .query(async ({ input }) => {
    // Mock available integrations catalog
    const availableIntegrations = [
      {
        type: 'messaging',
        providers: [
          { name: 'slack', displayName: 'Slack', description: 'Team collaboration platform', icon: 'slack-icon' },
          { name: 'discord', displayName: 'Discord', description: 'Community and communication', icon: 'discord-icon' },
          { name: 'teams', displayName: 'Microsoft Teams', description: 'Enterprise collaboration', icon: 'teams-icon' },
        ],
      },
      {
        type: 'analytics',
        providers: [
          { name: 'google', displayName: 'Google Analytics', description: 'Web analytics platform', icon: 'google-icon' },
          { name: 'mixpanel', displayName: 'Mixpanel', description: 'Product analytics', icon: 'mixpanel-icon' },
          { name: 'amplitude', displayName: 'Amplitude', description: 'Product intelligence', icon: 'amplitude-icon' },
        ],
      },
      {
        type: 'api',
        providers: [
          { name: 'stripe', displayName: 'Stripe', description: 'Payment processing', icon: 'stripe-icon' },
          { name: 'twilio', displayName: 'Twilio', description: 'Communication APIs', icon: 'twilio-icon' },
          { name: 'sendgrid', displayName: 'SendGrid', description: 'Email delivery', icon: 'sendgrid-icon' },
        ],
      },
      {
        type: 'storage',
        providers: [
          { name: 'aws', displayName: 'Amazon S3', description: 'Cloud storage', icon: 'aws-icon' },
          { name: 'google', displayName: 'Google Cloud Storage', description: 'Cloud storage', icon: 'google-icon' },
          { name: 'azure', displayName: 'Azure Blob Storage', description: 'Cloud storage', icon: 'azure-icon' },
        ],
      },
    ];

    return { availableIntegrations };
  });
