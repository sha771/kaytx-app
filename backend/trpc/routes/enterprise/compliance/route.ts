import { permissionProcedure } from '../../../create-context';
import { z } from 'zod';
import { Permission } from '../../../../lib/rbac';
import { complianceReportingService } from '../../../../services/compliance-reporting-service';
import { logAudit, AuditActions } from '../../../../lib/audit';

export const getComplianceReportsProcedure = permissionProcedure(Permission.COMPLIANCE_READ)
  .input(
    z.object({
      type: z.enum(['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa']).optional(),
      status: z.enum(['pending', 'in_progress', 'completed', 'failed']).optional(),
      limit: z.number().min(1).max(100).default(20),
    })
  )
  .query(async ({ ctx, input }) => {
    console.log('[Enterprise] Getting compliance reports for user:', ctx.user.id);

    try {
      const reports = await complianceReportingService.listReports({
        organizationId: ctx.user.organizationId,
        limit: input.limit,
        offset: 0,
        reportType: input.type,
      });

      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: 'compliance.reports_accessed',
        resource: 'compliance_reports',
        status: 'success',
        metadata: { 
          type: input.type,
          status: input.status,
          count: reports.data?.length || 0,
        },
      });

      return reports.data || [];
    } catch (error) {
      console.error('[Enterprise] Failed to fetch compliance reports:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: 'compliance.reports_access_failed',
        resource: 'compliance_reports',
        status: 'failure',
        severity: 'error',
        metadata: { error: message },
      });

      throw new Error('Failed to retrieve compliance reports');
    }
  });

export const generateComplianceReportProcedure = permissionProcedure(Permission.COMPLIANCE_GENERATE)
  .input(
    z.object({
      type: z.enum(['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa']),
      dateRange: z.object({
        start: z.string().datetime(),
        end: z.string().datetime(),
      }),
      includeViolations: z.boolean().default(true),
      includeRecommendations: z.boolean().default(true),
      format: z.enum(['pdf', 'csv', 'json']).default('json'),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Generating compliance report:', input.type);

    try {
      const report = await complianceReportingService.generateReport({
        type: input.type,
        dateRange: input.dateRange,
        includeViolations: input.includeViolations,
        includeRecommendations: input.includeRecommendations,
        format: input.format,
      });

      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: AuditActions.REPORT_GENERATED,
        resource: 'compliance_report',
        resourceId: report.data?.id,
        status: 'success',
        metadata: {
          reportType: input.type,
          format: input.format,
          complianceScore: report.data?.metadata?.complianceScore,
        },
      });

      return report.data;
    } catch (error) {
      console.error('[Enterprise] Failed to generate compliance report:', error);

      const message = error instanceof Error ? error.message : String(error);
      
      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: AuditActions.REPORT_GENERATED,
        resource: 'compliance_report',
        status: 'failure',
        severity: 'error',
        metadata: { 
          reportType: input.type,
          error: message,
        },
      });

      throw new Error('Failed to generate compliance report');
    }
  });
