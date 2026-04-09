import { Hono } from 'hono';
import { z } from 'zod';
import { db as pgDb } from '../../db/connection';
import { auditLogs, users, organizations } from '../../db/drizzle-schema';
import { requireAuth, requirePermission } from '../../middleware/rbac-middleware';
import { validateQuery, validateParams } from '../../middleware/validate';
import { Permission } from '../../lib/rbac';
import { eq, and, desc, sql, count } from 'drizzle-orm';
import { jsonApiError } from '../../lib/api-error';

const auditRouter = new Hono();

// Apply authentication to all audit routes
auditRouter.use('*', requireAuth());

// =============================================================================
// AUDIT LOGGING MIDDLEWARE
// =============================================================================

export interface AuditLogEntry {
  userId?: string;
  organizationId: string;
  action: string;
  resource: string;
  resourceId?: string;
  changes?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  status: 'success' | 'error';
  severity: 'info' | 'warning' | 'error' | 'critical';
  metadata?: Record<string, any>;
}

export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await pgDb.insert(auditLogs).values({
      userId: entry.userId || null,
      organizationId: entry.organizationId,
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId || null,
      changes: entry.changes || {},
      ipAddress: entry.ipAddress || null,
      userAgent: entry.userAgent || null,
      status: entry.status,
      severity: entry.severity,
      metadata: entry.metadata || {},
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
    // Don't throw - audit logging failure shouldn't break the main flow
  }
}

export function auditMiddleware(action: string, resource: string, severity: 'info' | 'warning' | 'error' | 'critical' = 'info') {
  return async (c: any, next: any) => {
    const startTime = Date.now();
    const auth = c.get('auth');
    const ipAddress = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const userAgent = c.req.header('user-agent') || 'unknown';

    await next();

    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const statusCode = c.res.status;

    // Determine log status and severity based on response
    let logStatus: 'success' | 'error' = 'success';
    let logSeverity = severity;

    if (statusCode >= 400) {
      logStatus = 'error';
      if (statusCode >= 500) {
        logSeverity = 'error';
      }
    }

    // Extract resource ID from params if available
    const resourceId = c.req.param.id || c.req.param.userId || c.req.param.organizationId;

    await createAuditLog({
      userId: auth?.userId,
      organizationId: auth?.organizationId || 'system',
      action,
      resource,
      resourceId,
      metadata: {
        method: c.req.method,
        path: c.req.path,
        statusCode,
        responseTime,
        query: c.req.query(),
      },
      ipAddress,
      userAgent,
      status: logStatus,
      severity: logSeverity,
    });
  };
}

// =============================================================================
// AUDIT LOG ENDPOINTS
// =============================================================================

const auditLogsQuerySchema = z.object({
  action: z.string().optional(),
  resource: z.string().optional(),
  userId: z.string().uuid().optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  status: z.enum(['success', 'error']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  limit: z.string().transform(Number).pipe(z.number().max(1000)).optional().default(100),
  offset: z.string().transform(Number).pipe(z.number().max(10000)).optional().default(0),
});

auditRouter.get(
  '/',
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
      
      if (query.status) {
        whereClause = and(whereClause, eq(auditLogs.status, query.status));
      }
      
      if (query.startDate) {
        whereClause = and(whereClause, sql`${auditLogs.timestamp} >= ${new Date(query.startDate)}`);
      }
      
      if (query.endDate) {
        whereClause = and(whereClause, sql`${auditLogs.timestamp} <= ${new Date(query.endDate)}`);
      }
      
      const logs = await pgDb
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
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(auditLogs)
        .leftJoin(users, eq(auditLogs.userId, users.id))
        .where(whereClause)
        .orderBy(desc(auditLogs.timestamp))
        .limit(query.limit)
        .offset(query.offset);
      
      // Get total count for pagination
      const [totalCount] = await pgDb
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
            byStatus: logs.reduce((acc, log) => {
              acc[log.status] = (acc[log.status] || 0) + 1;
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

auditRouter.get(
  '/export',
  requirePermission(Permission.AUDIT_EXPORT),
  validateQuery(auditLogsQuerySchema),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      // Similar to the list endpoint but with higher limit for export
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
      
      const logs = await pgDb
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
          changes: auditLogs.changes,
          metadata: auditLogs.metadata,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(auditLogs)
        .leftJoin(users, eq(auditLogs.userId, users.id))
        .where(whereClause)
        .orderBy(desc(auditLogs.timestamp))
        .limit(10000); // Higher limit for exports
      
      // Convert to CSV format
      const csvHeaders = [
        'ID', 'Timestamp', 'User ID', 'User Email', 'Action', 'Resource', 
        'Resource ID', 'Status', 'Severity', 'IP Address', 'User Agent'
      ];
      
      const csvRows = logs.map(log => [
        log.id,
        log.timestamp.toISOString(),
        log.userId || '',
        log.user?.email || '',
        log.action,
        log.resource,
        log.resourceId || '',
        log.status,
        log.severity,
        log.ipAddress || '',
        log.userAgent || '',
      ]);
      
      const csvContent = [
        csvHeaders.join(','),
        ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
      
      return c.text(csvContent, 200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="audit-logs-${new Date().toISOString().split('T')[0]}.csv"`,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to export audit logs');
    }
  }
);

auditRouter.get(
  '/stats',
  requirePermission(Permission.AUDIT_READ),
  async (c) => {
    const auth = c.get('auth');
    
    try {
      const orgId = auth.organizationId;
      const now = new Date();
      const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      // Get stats for different time periods
      const [last24HoursStats] = await pgDb
        .select({
          total: count(),
          errors: count(sql`CASE WHEN status = 'error' THEN 1 END`),
          critical: count(sql`CASE WHEN severity = 'critical' THEN 1 END`),
        })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            sql`${auditLogs.timestamp} >= ${last24Hours}`
          )
        );
      
      const [last7DaysStats] = await pgDb
        .select({
          total: count(),
          errors: count(sql`CASE WHEN status = 'error' THEN 1 END`),
          critical: count(sql`CASE WHEN severity = 'critical' THEN 1 END`),
        })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            sql`${auditLogs.timestamp} >= ${last7Days}`
          )
        );
      
      const [last30DaysStats] = await pgDb
        .select({
          total: count(),
          errors: count(sql`CASE WHEN status = 'error' THEN 1 END`),
          critical: count(sql`CASE WHEN severity = 'critical' THEN 1 END`),
        })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            sql`${auditLogs.timestamp} >= ${last30Days}`
          )
        );
      
      // Get top actions by frequency
      const topActions = await pgDb
        .select({
          action: auditLogs.action,
          count: count(),
        })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            sql`${auditLogs.timestamp} >= ${last7Days}`
          )
        )
        .groupBy(auditLogs.action)
        .orderBy(desc(count()))
        .limit(10);
      
      // Get top users by activity
      const topUsers = await pgDb
        .select({
          userId: auditLogs.userId,
          email: users.email,
          firstName: users.firstName,
          lastName: users.lastName,
          count: count(),
        })
        .from(auditLogs)
        .leftJoin(users, eq(auditLogs.userId, users.id))
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            sql`${auditLogs.timestamp} >= ${last7Days}`,
            sql`${auditLogs.userId} IS NOT NULL`
          )
        )
        .groupBy(auditLogs.userId, users.email, users.firstName, users.lastName)
        .orderBy(desc(count()))
        .limit(10);
      
      return c.json({
        success: true,
        data: {
          timePeriods: {
            last24Hours: last24HoursStats,
            last7Days: last7DaysStats,
            last30Days: last30DaysStats,
          },
          topActions,
          topUsers,
          errorRate: {
            last24Hours: last24HoursStats.total > 0 ? (last24HoursStats.errors / last24HoursStats.total) * 100 : 0,
            last7Days: last7DaysStats.total > 0 ? (last7DaysStats.errors / last7DaysStats.total) * 100 : 0,
            last30Days: last30DaysStats.total > 0 ? (last30DaysStats.errors / last30DaysStats.total) * 100 : 0,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch audit stats');
    }
  }
);

auditRouter.get(
  '/:id',
  requirePermission(Permission.AUDIT_READ),
  validateParams(z.object({ id: z.string().uuid() })),
  async (c) => {
    const auth = c.get('auth');
    const params = c.get('validatedParams') as any;
    
    try {
      const [log] = await pgDb
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
          changes: auditLogs.changes,
          metadata: auditLogs.metadata,
          user: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(auditLogs)
        .leftJoin(users, eq(auditLogs.userId, users.id))
        .where(
          and(
            eq(auditLogs.id, params.id),
            eq(auditLogs.organizationId, auth.organizationId)
          )
        )
        .limit(1);
      
      if (!log) {
        return jsonApiError(c, 404, 'NOT_FOUND', 'Audit log not found');
      }
      
      return c.json({
        success: true,
        data: log,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch audit log');
    }
  }
);

export default auditRouter;
