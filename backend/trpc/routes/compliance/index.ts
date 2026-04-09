import { Hono } from 'hono';
import { z } from 'zod';
import { db as pgDb } from '../../db/connection';
import { 
  complianceReports, 
  organizations, 
  users,
  auditLogs,
  usageMetrics,
  dataRetentionPolicies
} from '../../db/drizzle-schema';
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
  and, 
  sql, 
  count 
} from 'drizzle-orm';
import { 
  jsonApiError 
} from '../../lib/api-error';
import { createAuditLog } from '../audit/index';

const complianceRouter = new Hono();

// Apply authentication to all compliance routes
complianceRouter.use('*', requireAuth());

// =============================================================================
// COMPLIANCE REPORT GENERATION
// =============================================================================

const complianceReportBodySchema = z.object({
  type: z.enum(['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa']),
  periodStart: z.string().datetime(),
  periodEnd: z.string().datetime(),
  includeRecommendations: z.boolean().optional().default(true),
  format: z.enum(['json', 'pdf', 'csv']).optional().default('json'),
});

complianceRouter.post(
  '/reports',
  requirePermission(Permission.COMPLIANCE_GENERATE),
  validateBody(complianceReportBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const reportId = crypto.randomUUID();
      
      // Create compliance report record
      const [report] = await pgDb.insert(complianceReports).values({
        id: reportId,
        organizationId: auth.organizationId,
        type: body.type,
        status: 'generating',
        reportData: {
          requestedBy: auth.userId,
          periodStart: body.periodStart,
          periodEnd: body.periodEnd,
          includeRecommendations: body.includeRecommendations,
          format: body.format,
        },
        generatedBy: auth.userId,
        periodStart: new Date(body.periodStart),
        periodEnd: new Date(body.periodEnd),
        findings: [],
        recommendations: [],
      }).returning();
      
      // Log the compliance report generation
      await createAuditLog({
        userId: auth.userId,
        organizationId: auth.organizationId,
        action: 'compliance_report_generated',
        resource: 'compliance_report',
        resourceId: reportId,
        metadata: {
          reportType: body.type,
          periodStart: body.periodStart,
          periodEnd: body.periodEnd,
        },
        ipAddress: c.req.header('x-forwarded-for') || 'unknown',
        userAgent: c.req.header('user-agent') || 'unknown',
        status: 'success',
        severity: 'info',
      });
      
      // Trigger background job to generate the report
      // In a real implementation, this would use a job queue
      generateComplianceReportAsync(reportId, auth.organizationId, body);
      
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

// =============================================================================
// COMPLIANCE REPORT LISTING
// =============================================================================

complianceRouter.get(
  '/reports',
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
      
      const reports = await pgDb
        .select({
          id: complianceReports.id,
          type: complianceReports.type,
          status: complianceReports.status,
          generatedBy: complianceReports.generatedBy,
          periodStart: complianceReports.periodStart,
          periodEnd: complianceReports.periodEnd,
          fileUrl: complianceReports.fileUrl,
          createdAt: complianceReports.createdAt,
          generatedByUser: {
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
          },
        })
        .from(complianceReports)
        .leftJoin(users, eq(complianceReports.generatedBy, users.id))
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
// COMPLIANCE DASHBOARD
// =============================================================================

complianceRouter.get(
  '/dashboard',
  requirePermission(Permission.COMPLIANCE_READ),
  async (c) => {
    const auth = c.get('auth');
    
    try {
      const orgId = auth.organizationId;
      const now = new Date();
      const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      // Get compliance metrics
      const [userMetrics] = await pgDb
        .select({
          totalUsers: count(),
          verifiedUsers: count(sql`CASE WHEN email_verified = true THEN 1 END`),
          usersWith2FA: count(sql`CASE WHEN two_factor_enabled = true THEN 1 END`),
        })
        .from(users)
        .where(eq(users.organizationId, orgId));
      
      const [auditMetrics] = await pgDb
        .select({
          totalAuditLogs: count(),
          criticalEvents: count(sql`CASE WHEN severity = 'critical' THEN 1 END`),
          failedLogins: count(sql`CASE WHEN action = 'login_failed' THEN 1 END`),
        })
        .from(auditLogs)
        .where(
          and(
            eq(auditLogs.organizationId, orgId),
            sql`${auditLogs.timestamp} >= ${last30Days}`
          )
        );
      
      const [dataRetentionMetrics] = await pgDb
        .select({
          totalPolicies: count(),
          activePolicies: count(sql`CASE WHEN status = 'active' THEN 1 END`),
          policiesWithAutoDelete: count(sql`CASE WHEN auto_delete = true THEN 1 END`),
        })
        .from(dataRetentionPolicies)
        .where(eq(dataRetentionPolicies.organizationId, orgId));
      
      // Get recent compliance reports
      const recentReports = await pgDb
        .select({
          id: complianceReports.id,
          type: complianceReports.type,
          status: complianceReports.status,
          createdAt: complianceReports.createdAt,
        })
        .from(complianceReports)
        .where(eq(complianceReports.organizationId, orgId))
        .orderBy(desc(complianceReports.createdAt))
        .limit(5);
      
      // Calculate compliance scores
      const emailVerificationScore = userMetrics.totalUsers > 0 ? (userMetrics.verifiedUsers / userMetrics.totalUsers) * 100 : 0;
      const twoFactorAdoptionScore = userMetrics.totalUsers > 0 ? (userMetrics.usersWith2FA / userMetrics.totalUsers) * 100 : 0;
      const auditLogCompletenessScore = auditMetrics.totalAuditLogs > 0 ? Math.min((auditMetrics.totalAuditLogs / 1000) * 100, 100) : 0;
      
      const overallComplianceScore = (emailVerificationScore + twoFactorAdoptionScore + auditLogCompletenessScore) / 3;
      
      return c.json({
        success: true,
        data: {
          scores: {
            overall: Math.round(overallComplianceScore),
            emailVerification: Math.round(emailVerificationScore),
            twoFactorAdoption: Math.round(twoFactorAdoptionScore),
            auditLogCompleteness: Math.round(auditLogCompletenessScore),
          },
          metrics: {
            users: userMetrics,
            auditLogs: auditMetrics,
            dataRetention: dataRetentionMetrics,
          },
          recentReports,
          recommendations: generateComplianceRecommendations({
            emailVerificationScore,
            twoFactorAdoptionScore,
            auditLogCompletenessScore,
            userMetrics,
            auditMetrics,
          }),
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch compliance dashboard');
    }
  }
);

// =============================================================================
// DATA RETENTION POLICIES
// =============================================================================

const retentionPolicyBodySchema = z.object({
  name: z.string().min(1).max(255),
  dataType: z.string().min(1),
  retentionDays: z.number().min(1).max(3650),
  autoDelete: z.boolean().optional().default(false),
  conditions: z.record(z.any()).optional().default({}),
});

complianceRouter.post(
  '/retention-policies',
  requirePermission(Permission.COMPLIANCE_GENERATE),
  validateBody(retentionPolicyBodySchema),
  async (c) => {
    const auth = c.get('auth');
    const body = c.get('validatedBody') as any;
    
    try {
      const policyId = crypto.randomUUID();
      
      const [policy] = await pgDb.insert(dataRetentionPolicies).values({
        id: policyId,
        organizationId: auth.organizationId,
        name: body.name,
        dataType: body.dataType,
        retentionDays: body.retentionDays,
        autoDelete: body.autoDelete,
        conditions: body.conditions,
        status: 'active',
      }).returning();
      
      await createAuditLog({
        userId: auth.userId,
        organizationId: auth.organizationId,
        action: 'retention_policy_created',
        resource: 'retention_policy',
        resourceId: policyId,
        metadata: {
          policyName: body.name,
          dataType: body.dataType,
          retentionDays: body.retentionDays,
        },
        ipAddress: c.req.header('x-forwarded-for') || 'unknown',
        userAgent: c.req.header('user-agent') || 'unknown',
        status: 'success',
        severity: 'info',
      });
      
      return c.json({
        success: true,
        data: policy,
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to create retention policy');
    }
  }
);

complianceRouter.get(
  '/retention-policies',
  requirePermission(Permission.COMPLIANCE_READ),
  validateQuery(z.object({
    dataType: z.string().optional(),
    status: z.string().optional(),
    limit: z.string().transform(Number).pipe(z.number().max(100)).optional().default(50),
  })),
  async (c) => {
    const auth = c.get('auth');
    const query = c.get('validatedQuery') as any;
    
    try {
      let whereClause = eq(dataRetentionPolicies.organizationId, auth.organizationId);
      
      if (query.dataType) {
        whereClause = and(whereClause, eq(dataRetentionPolicies.dataType, query.dataType));
      }
      
      if (query.status) {
        whereClause = and(whereClause, eq(dataRetentionPolicies.status, query.status));
      }
      
      const policies = await pgDb
        .select()
        .from(dataRetentionPolicies)
        .where(whereClause)
        .orderBy(desc(dataRetentionPolicies.createdAt))
        .limit(query.limit);
      
      return c.json({
        success: true,
        data: {
          policies,
          summary: {
            total: policies.length,
            active: policies.filter(p => p.status === 'active').length,
            withAutoDelete: policies.filter(p => p.autoDelete).length,
          },
        },
      });
    } catch (error) {
      return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'Failed to fetch retention policies');
    }
  }
);

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

async function generateComplianceReportAsync(
  reportId: string, 
  organizationId: string, 
  options: any
): Promise<void> {
  try {
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const findings = await generateComplianceFindings(organizationId, options);
    const recommendations = options.includeRecommendations 
      ? generateComplianceRecommendationsFromFindings(findings)
      : [];
    
    // Update report with generated data
    await pgDb
      .update(complianceReports)
      .set({
        status: 'completed',
        findings,
        recommendations,
        reportData: {
          ...findings,
          recommendations,
          generatedAt: new Date().toISOString(),
        },
      })
      .where(eq(complianceReports.id, reportId));
    
    // Log completion
    await createAuditLog({
      organizationId,
      action: 'compliance_report_completed',
      resource: 'compliance_report',
      resourceId: reportId,
      metadata: {
        findingsCount: findings.length,
        recommendationsCount: recommendations.length,
      },
      status: 'success',
      severity: 'info',
    });
  } catch (error) {
    // Update report with error status
    await pgDb
      .update(complianceReports)
      .set({
        status: 'failed',
        reportData: {
          error: error instanceof Error ? error.message : 'Unknown error',
          failedAt: new Date().toISOString(),
        },
      })
      .where(eq(complianceReports.id, reportId));
    
    await createAuditLog({
      organizationId,
      action: 'compliance_report_failed',
      resource: 'compliance_report',
      resourceId: reportId,
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      status: 'error',
      severity: 'error',
    });
  }
}

async function generateComplianceFindings(organizationId: string, options: any): Promise<any[]> {
  const findings = [];
  
  // Get user compliance data
  const [userMetrics] = await pgDb
    .select({
      totalUsers: count(),
      verifiedUsers: count(sql`CASE WHEN email_verified = true THEN 1 END`),
      usersWith2FA: count(sql`CASE WHEN two_factor_enabled = true THEN 1 END`),
    })
    .from(users)
    .where(eq(users.organizationId, organizationId));
  
  // Generate findings based on compliance type
  switch (options.type) {
    case 'gdpr':
      if (userMetrics.verifiedUsers < userMetrics.totalUsers) {
        findings.push({
          type: 'warning',
          category: 'data_protection',
          description: 'Not all users have verified email addresses',
          recommendation: 'Implement email verification for all users',
          risk: 'medium',
        });
      }
      break;
      
    case 'hipaa':
      if (userMetrics.usersWith2FA < userMetrics.totalUsers) {
        findings.push({
          type: 'warning',
          category: 'access_control',
          description: 'Not all users have two-factor authentication enabled',
          recommendation: 'Enforce 2FA for all users handling PHI data',
          risk: 'high',
        });
      }
      break;
      
    case 'soc2':
      findings.push({
        type: 'info',
        category: 'audit_trail',
        description: 'Audit logging is properly configured',
        recommendation: 'Continue monitoring audit log completeness',
        risk: 'low',
      });
      break;
  }
  
  return findings;
}

function generateComplianceRecommendationsFromFindings(findings: any[]): any[] {
  return findings
    .filter(finding => finding.recommendation)
    .map(finding => ({
      category: finding.category,
      priority: finding.risk === 'high' ? 'critical' : finding.risk === 'medium' ? 'high' : 'medium',
      title: `Address ${finding.category} issue`,
      description: finding.recommendation,
      estimatedEffort: finding.risk === 'high' ? 'high' : 'medium',
      dueDate: new Date(Date.now() + (finding.risk === 'high' ? 7 : 30) * 24 * 60 * 60 * 1000).toISOString(),
    }));
}

function generateComplianceRecommendations(metrics: any): any[] {
  const recommendations = [];
  
  if (metrics.emailVerificationScore < 90) {
    recommendations.push({
      category: 'identity_verification',
      priority: 'high',
      title: 'Improve Email Verification Rate',
      description: 'Implement mandatory email verification for all users to comply with data protection regulations',
      estimatedEffort: 'medium',
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  if (metrics.twoFactorAdoptionScore < 80) {
    recommendations.push({
      category: 'access_control',
      priority: 'critical',
      title: 'Increase 2FA Adoption',
      description: 'Enforce two-factor authentication for all users to enhance security and compliance',
      estimatedEffort: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  if (metrics.auditLogCompletenessScore < 95) {
    recommendations.push({
      category: 'audit_logging',
      priority: 'medium',
      title: 'Enhance Audit Logging',
      description: 'Ensure all critical actions are properly logged for compliance and security monitoring',
      estimatedEffort: 'medium',
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }
  
  return recommendations;
}

export default complianceRouter;
