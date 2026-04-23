import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { analyticsService } from '../../../../services/consolidated-analytics-service';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { Permission } from '../../../../lib/rbac';

const analyticsQuerySchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day'),
  metrics: z.array(z.string()).optional(),
});

const usageAnalyticsSchema = z.object({
  metric: z.enum(['active_users', 'api_calls', 'storage_usage', 'bandwidth']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day'),
});

const performanceAnalyticsSchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  includeErrors: z.boolean().default(true),
});

const userAnalyticsSchema = z.object({
  userId: z.string().optional(),
  department: z.string().optional(),
  role: z.string().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export const getDashboardAnalyticsProcedure = permissionProcedure(Permission.ANALYTICS_READ)
  .input(analyticsQuerySchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      const dashboardData = await analyticsService.getDashboardAnalytics(input, organizationId);
      
      // Log the analytics access
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'dashboard',
        status: 'success',
        metadata: { query: input },
      });

      return dashboardData;
    } catch (error) {
      console.error('[Analytics] Dashboard analytics error:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'dashboard',
        status: 'failure',
        severity: 'error',
        metadata: { error: message, query: input },
      });

      throw new Error('Failed to retrieve dashboard analytics');
    }
  });
export const getUsageAnalyticsProcedure = permissionProcedure(Permission.ANALYTICS_READ)
  .input(usageAnalyticsSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      const usageData = await analyticsService.getUsageAnalytics(input, organizationId);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'usage',
        status: 'success',
        metadata: { query: input },
      });

      return usageData;
    } catch (error) {
      console.error('[Analytics] Usage analytics error:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'usage',
        status: 'failure',
        severity: 'error',
        metadata: { error: message, query: input },
      });

      throw new Error('Failed to retrieve usage analytics');
    }
  });

export const getPerformanceAnalyticsProcedure = permissionProcedure(Permission.ANALYTICS_READ)
  .input(performanceAnalyticsSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      const performanceData = await analyticsService.getPerformanceAnalytics(input, organizationId);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'performance',
        status: 'success',
        metadata: { query: input },
      });

      return performanceData;
    } catch (error) {
      console.error('[Analytics] Performance analytics error:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'performance',
        status: 'failure',
        severity: 'error',
        metadata: { error: message, query: input },
      });

      throw new Error('Failed to retrieve performance analytics');
    }
  });

export const getUserAnalyticsProcedure = permissionProcedure(Permission.ANALYTICS_READ)
  .input(userAnalyticsSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      const userAnalytics = await analyticsService.getUserAnalytics(input, organizationId);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'users',
        status: 'success',
        metadata: { query: input },
      });

      return userAnalytics;
    } catch (error) {
      console.error('[Analytics] User analytics error:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'users',
        status: 'failure',
        severity: 'error',
        metadata: { error: message, query: input },
      });

      throw new Error('Failed to retrieve user analytics');
    }
  });

export const getCustomReportProcedure = permissionProcedure(Permission.ANALYTICS_EXPORT)
  .input(z.object({
    reportType: z.string(),
    parameters: z.record(z.string(), z.unknown()),
    format: z.enum(['json', 'csv', 'pdf']).default('json'),
  }))
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      const reportData = await analyticsService.generateCustomReport(input, organizationId);

      logAudit({
        userId: ctx.user.id,
        action: AuditActions.REPORT_GENERATED,
        resource: 'report',
        resourceId: reportData.reportId,
        organizationId,
        metadata: {
          reportType: input.reportType,
          format: input.format,
        },
        status: 'success',
      });

      return reportData;
    } catch (error) {
      console.error('[Analytics] Custom report generation error:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        action: AuditActions.REPORT_GENERATED,
        resource: 'report',
        organizationId,
        metadata: {
          reportType: input.reportType,
          format: input.format,
          error: message,
        },
        status: 'failure',
      });

      throw new Error('Failed to generate custom report');
    }
  });

export const getRealTimeMetricsProcedure = permissionProcedure(Permission.ANALYTICS_READ)
  .query(async ({ ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      const realTimeData = await analyticsService.getRealTimeMetrics(organizationId);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'realtime_metrics',
        status: 'success',
      });

      return realTimeData;
    } catch (error) {
      console.error('[Analytics] Real-time metrics error:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.ANALYTICS_VIEW,
        resource: 'realtime_metrics',
        status: 'failure',
        severity: 'error',
        metadata: { error: message },
      });

      throw new Error('Failed to retrieve real-time metrics');
    }
  });
