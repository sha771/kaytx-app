import { Hono } from 'hono';
import { z } from 'zod';
import crypto from 'crypto';
import { db } from '../../db/connection';
import { 
  users, 
  organizations, 
  usageMetrics, 
  auditLogs, 
  complianceReports, 
  apiKeys,
  webhooks,
  integrations,
  notifications,
  backups,
  teamMembers
} from '../../db/drizzle-schema';
import { 
  requireAuth, 
  requirePermission, 
  requireMinRole 
} from '../../middleware/rbac-middleware';
import { 
  validateBody, 
  validateQuery, 
  validateParams 
} from '../../middleware/validate';
import { 
  Permission, 
  Role 
} from '../../lib/rbac';
import { 
  eq, 
  desc, 
  and, 
  or,
  sql, 
  count, 
  sum 
} from 'drizzle-orm';
import { 
  jsonApiError 
} from '../../lib/api-error';

const enterpriseRouter = new Hono();

// Apply authentication to all enterprise routes
enterpriseRouter.use('*', requireAuth());

// =============================================================================
// ENTERPRISE ANALYTICS ENDPOINTS
// =============================================================================

const analyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).optional().default('day'),
  metrics: z.array(z.string()).optional(),
});

enterpriseRouter.get(
  '/analytics',
  requirePermission(Permission.ANALYTICS_READ),
  validateQuery(analyticsQuerySchema),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      const orgId = auth.organizationId;
      const startDate = query.startDate ? new Date(query.startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const endDate = query.endDate ? new Date(query.endDate) : new Date();
      
      // Get user metrics
      const [userMetrics] = await db
        .select({
          totalUsers: count(),
          activeUsers: count(sql`CASE WHEN last_login_at > ${startDate} THEN 1 END`),
          newUsers: count(sql`CASE WHEN created_at > ${startDate} THEN 1 END`),
        })
        .from(users)
        .where(eq(users.organizationId, orgId));
      
      // Get usage metrics
      const usageData = await db
        .select({
          metricType: usageMetrics.metricType,
          totalValue: sum(usageMetrics.value).mapWith(Number),
          recordedAt: usageMetrics.recordedAt,
        })
        .from(usageMetrics)
        .where(
          and(
            eq(usageMetrics.organizationId, orgId),
            sql`${usageMetrics.recordedAt} >= ${startDate}`,
            sql`${usageMetrics.recordedAt} <= ${endDate}`
          )
        )
        .groupBy(usageMetrics.metricType, usageMetrics.recordedAt)
        .orderBy(desc(usageMetrics.recordedAt));
      
      // Get API call metrics
      const [apiMetrics] = await db
        .select({
          totalCalls: count(),
          successfulCalls: count(sql`CASE WHEN status = 'success' THEN 1 END`),
          failedCalls: count(sql`CASE WHERE status = 'error' THEN 1 END`),
        })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            eq(auditLogs.action, 'api_call'),
            sql`${auditLogs.timestamp} >= ${startDate}`,
            sql`${auditLogs.timestamp} <= ${endDate}`
          )
        );
      
      return c.json({
        success: true,
        data: {
          users: userMetrics,
          usage: usageData,
          api: apiMetrics,
          period: {
            startDate,
            endDate,
            granularity: query.granularity,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch analytics data');
    }
  }
);

// =============================================================================
// USAGE METRICS ENDPOINTS
// =============================================================================

const usageMetricsQuerySchema = z.object({
  period: z.enum(['hour', 'day', 'week', 'month']).optional().default('day'),
  limit: z.string().transform(Number).pipe(z.number().max(1000)).optional().default(100),
});

enterpriseRouter.get(
  '/usage-metrics',
  requirePermission(Permission.ANALYTICS_METRICS_READ),
  validateQuery(usageMetricsQuerySchema),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      const orgId = auth.organizationId;
      const limit = query.limit;
      
      // Calculate date range based on period
      const now = new Date();
      let startDate: Date;
      
      switch (query.period) {
        case 'hour':
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Last 24 hours
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // Last 7 days
          break;
        case 'month':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Last 30 days
          break;
        default:
          startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // Default to last 24 hours
      }
      
      const metrics = await db
        .select({
          metricType: usageMetrics.metricType,
          value: usageMetrics.value,
          unit: usageMetrics.unit,
          period: usageMetrics.period,
          recordedAt: usageMetrics.recordedAt,
          metadata: usageMetrics.metadata,
        })
        .from(usageMetrics)
        .where(
          and(
            eq(usageMetrics.organizationId, orgId),
            sql`${usageMetrics.recordedAt} >= ${startDate}`
          )
        )
        .orderBy(desc(usageMetrics.recordedAt))
        .limit(limit);
      
      // Aggregate metrics by type
      const aggregatedMetrics = metrics.reduce((acc, metric) => {
        const key = metric.metricType;
        if (!acc[key]) {
          acc[key] = {
            metricType: key,
            totalValue: 0,
            unit: metric.unit,
            count: 0,
            latest: metric,
          };
        }
        acc[key].totalValue += Number(metric.value);
        acc[key].count += 1;
        if (!acc[key].latest || metric.recordedAt > acc[key].latest.recordedAt) {
          acc[key].latest = metric;
        }
        return acc;
      }, {} as Record<string, any>);
      
      return c.json({
        success: true,
        data: {
          metrics: Object.values(aggregatedMetrics),
          period: {
            startDate,
            endDate: now,
            type: query.period,
          },
          summary: {
            totalMetricTypes: Object.keys(aggregatedMetrics).length,
            totalDataPoints: metrics.length,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch usage metrics');
    }
  }
);

// =============================================================================
// COMPLIANCE REPORTS ENDPOINTS
// =============================================================================

const complianceReportBodySchema = z.object({
  type: z.enum(['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa']),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  includeRecommendations: z.boolean().optional().default(true),
});

enterpriseRouter.post(
  '/compliance-reports',
  requirePermission(Permission.COMPLIANCE_GENERATE),
  validateBody(complianceReportBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const reportId = crypto.randomUUID();
      
      // Create compliance report record
      const [report] = await db.insert(complianceReports).values({
        id: reportId,
        organizationId: auth.organizationId,
        type: body.type,
        status: 'generating',
        reportData: {
          requestedBy: auth.userId,
          periodStart: body.periodStart,
          periodEnd: body.periodEnd,
          includeRecommendations: body.includeRecommendations,
        },
        generatedBy: auth.userId,
        periodStart: new Date(body.periodStart),
        periodEnd: new Date(body.periodEnd),
        findings: [],
        recommendations: [],
      }).returning();
      
      // In a real implementation, this would trigger a background job
      // For now, we'll simulate the report generation
      
      return c.json({
        success: true,
        data: {
          id: report.id,
          type: report.type,
          status: report.status,
          createdAt: report.createdAt,
          estimatedCompletion: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create compliance report');
    }
  }
);

enterpriseRouter.get(
  '/compliance-reports',
  requirePermission(Permission.COMPLIANCE_READ),
  validateQuery(z.object({
    type: z.string().optional(),
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(20),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(complianceReports.organizationId, auth.organizationId);
      
      if (query.type) {
        whereClause = and(whereClause, eq(complianceReports.type, query.type));
      }
      
      if (query.status) {
        whereClause = and(whereClause, eq(complianceReports.status, query.status));
      }
      
      const reports = await db
        .select({
          id: complianceReports.id,
          type: complianceReports.type,
          status: complianceReports.status,
          generatedBy: complianceReports.generatedBy,
          periodStart: complianceReports.periodStart,
          periodEnd: complianceReports.periodEnd,
          fileUrl: complianceReports.fileUrl,
          createdAt: complianceReports.createdAt,
        })
        .from(complianceReports)
        .where(whereClause)
        .orderBy(desc(complianceReports.createdAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          reports,
          summary: {
            total: reports.length,
            byStatus: reports.reduce((acc, report) => {
              acc[report.status] = (acc[report.status] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
            byType: reports.reduce((acc, report) => {
              acc[report.type] = (acc[report.type] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch compliance reports');
    }
  }
);

// =============================================================================
// AUDIT LOGS ENDPOINTS
// =============================================================================

const auditLogsQuerySchema = z.object({
  action: z.string().optional(),
  resource: z.string().optional(),
  userId: z.string().uuid().optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.string().transform(Number).pipe(z.number().max(1000)).optional().default(100),
  offset: z.string().transform(Number).pipe(z.number().max(10000)).optional().default(0),
});

enterpriseRouter.get(
  '/audit-logs',
  requirePermission(Permission.AUDIT_READ),
  validateQuery(auditLogsQuerySchema),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(auditLogs.organizationId, auth.organizationId);
      
      if (query.action) {
        whereClause = and(whereClause, eq(auditLogs.action, query.action));
      }
      
      if (query.resource) {
        whereClause = and(whereClause, eq(auditLogs.resource, query.resource));
      }
      
      if (query.userId) {
        whereClause = and(whereClause, eq(auditLogs.userId, query.userId));
      }
      
      if (query.severity) {
        whereClause = and(whereClause, eq(auditLogs.severity, query.severity));
      }
      
      if (query.startDate) {
        whereClause = and(whereClause, sql`${auditLogs.timestamp} >= ${new Date(query.startDate)}`);
      }
      
      if (query.endDate) {
        whereClause = and(whereClause, sql`${auditLogs.timestamp} <= ${new Date(query.endDate)}`);
      }
      
      const logs = await db
        .select({
          id: auditLogs.id,
          userId: auditLogs.userId,
          action: auditLogs.action,
          resource: auditLogs.resource,
          resourceId: auditLogs.resourceId,
          status: auditLogs.status,
          severity: auditLogs.severity,
          ipAddress: auditLogs.ipAddress,
          userAgent: auditLogs.userAgent,
          timestamp: auditLogs.timestamp,
        })
        .from(auditLogs)
        .where(whereClause)
        .orderBy(desc(auditLogs.timestamp))
        .limit(query.limit)
        .offset(query.offset);
      
      // Get total count for pagination
      const [totalCount] = await db
        .select({ count: count() })
        .from(auditLogs)
        .where(whereClause);
      
      return c.json({
        success: true,
        data: {
          logs,
          pagination: {
            total: totalCount.count,
            limit: query.limit,
            offset: query.offset,
            hasMore: totalCount.count > query.offset + query.limit,
          },
          summary: {
            totalEntries: totalCount.count,
            bySeverity: logs.reduce((acc, log) => {
              acc[log.severity] = (acc[log.severity] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
            byAction: logs.reduce((acc, log) => {
              acc[log.action] = (acc[log.action] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch audit logs');
    }
  }
);

// =============================================================================
// TEAM MANAGEMENT ENDPOINTS
// =============================================================================

const teamMemberBodySchema = z.object({
  userId: z.string().uuid(),
  role: z.string(),
  permissions: z.array(z.string()).optional().default([]),
});

enterpriseRouter.post(
  '/team-members',
  requirePermission(Permission.TEAM_MEMBERS_CREATE),
  validateBody(teamMemberBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      // Check if user exists
      const [user] = await db
        .select()
        .from(users)
        .where(
          and(
            eq(users.id, body.userId),
            or(eq(users.organizationId, auth.organizationId), sql`${users.organizationId} is null`)
          )
        )
        .limit(1);
      
      if (!user) {
        return jsonApiError(c, 404, 'NOT_FOUND', 'User not found');
      }
      
      // Check if already a team member
      const [existingMember] = await db
        .select()
        .from(teamMembers)
        .where(
          and(
            eq(teamMembers.userId, body.userId),
            eq(teamMembers.organizationId, auth.organizationId)
          )
        )
        .limit(1);
      
      if (existingMember) {
        return jsonApiError(c, 409, 'CONFLICT', 'User is already a team member');
      }
      
      const [teamMember] = await db.insert(teamMembers).values({
        userId: body.userId,
        organizationId: auth.organizationId,
        role: body.role,
        permissions: body.permissions,
        invitedBy: auth.userId,
        status: 'active',
        joinedAt: new Date(),
      }).returning();
      
      return c.json({
        success: true,
        data: teamMember,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to add team member');
    }
  }
);

enterpriseRouter.get(
  '/team-members',
  requirePermission(Permission.TEAM_MEMBERS_READ),
  validateQuery(z.object({
    role: z.string().optional(),
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(teamMembers.organizationId, auth.organizationId);
      
      if (query.role) {
        whereClause = and(whereClause, eq(teamMembers.role, query.role));
      }
      
      if (query.status) {
        whereClause = and(whereClause, eq(teamMembers.status, query.status));
      }
      
      const members = await db
        .select({
          id: teamMembers.id,
          userId: teamMembers.userId,
          role: teamMembers.role,
          permissions: teamMembers.permissions,
          status: teamMembers.status,
          invitedBy: teamMembers.invitedBy,
          joinedAt: teamMembers.joinedAt,
          leftAt: teamMembers.leftAt,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            avatar: users.avatar,
          },
        })
        .from(teamMembers)
        .leftJoin(users, eq(teamMembers.userId, users.id))
        .where(whereClause)
        .orderBy(desc(teamMembers.joinedAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          members,
          summary: {
            total: members.length,
            byRole: members.reduce((acc, member) => {
              acc[member.role] = (acc[member.role] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
            byStatus: members.reduce((acc, member) => {
              acc[member.status] = (acc[member.status] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch team members');
    }
  }
);

// =============================================================================
// API KEY MANAGEMENT ENDPOINTS
// =============================================================================

const apiKeyBodySchema = z.object({
  name: z.string().min(1).max(255),
  permissions: z.array(z.string()).optional().default([]),
  rateLimit: z.number().min(1).max(10000).optional().default(1000),
  expiresAt: z.string().datetime().optional(),
});

enterpriseRouter.post(
  '/api-keys',
  requirePermission(Permission.API_KEY_CREATE),
  validateBody(apiKeyBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const apiKeyId = crypto.randomUUID();
      const rawKey = `ak_${crypto.randomBytes(32).toString('hex')}`;
      const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');

      const keyId = `key_${crypto.randomBytes(12).toString('hex')}`;
      
      const [apiKey] = await db.insert(apiKeys).values({
        id: apiKeyId,
        organizationId: auth.organizationId,
        userId: auth.userId,
        name: body.name,
        key: keyId,
        hashedKey,
        permissions: body.permissions,
        rateLimit: body.rateLimit,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        status: 'active',
      }).returning();

      const { hashedKey: _hashedKey, ...publicApiKey } = (apiKey as any) || {};
      
      // Return the raw key only once during creation
      return c.json({
        success: true,
        data: {
          ...publicApiKey,
          key: rawKey, // Only include raw key in response
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create API key');
    }
  }
);

enterpriseRouter.get(
  '/api-keys',
  requirePermission(Permission.API_KEY_READ),
  validateQuery(z.object({
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(apiKeys.organizationId, auth.organizationId);
      
      if (query.status) {
        whereClause = and(whereClause, eq(apiKeys.status, query.status));
      }
      
      const keys = await db
        .select({
          id: apiKeys.id,
          name: apiKeys.name,
          permissions: apiKeys.permissions,
          rateLimit: apiKeys.rateLimit,
          usageCount: apiKeys.usageCount,
          status: apiKeys.status,
          expiresAt: apiKeys.expiresAt,
          lastUsedAt: apiKeys.lastUsedAt,
          createdAt: apiKeys.createdAt,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(apiKeys)
        .leftJoin(users, eq(apiKeys.userId, users.id))
        .where(whereClause)
        .orderBy(desc(apiKeys.createdAt))
        .limit(query.limit);
      
      // Remove sensitive data
      const sanitizedKeys = keys.map(key => ({
        ...key,
        key: undefined, // Never return the key in list view
        hashedKey: undefined,
      }));
      
      return c.json({
        success: true,
        data: {
          keys: sanitizedKeys,
          summary: {
            total: keys.length,
            active: keys.filter(k => k.status === 'active').length,
            expired: keys.filter(k => k.expiresAt && k.expiresAt < new Date()).length,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch API keys');
    }
  }
);

export default enterpriseRouter;
