import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { auditService } from '../services/audit-service';
import { getAuditLogs, generateAuditTrailReport, generateComplianceReport } from '../lib/audit';
import { requireAuth, requirePermission } from '../middleware/rbac-middleware';
import { Permission } from '../lib/rbac';
import { logger } from '../lib/production-logger';

const app = new Hono();

// Validation schemas
const logActionSchema = z.object({
  userId: z.string().optional(),
  action: z.string().min(1),
  resource: z.string().min(1),
  resourceId: z.string().optional(),
  details: z.record(z.any()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  category: z.enum(['authentication', 'authorization', 'data_access', 'data_modification', 'system', 'security', 'compliance']).optional(),
  status: z.enum(['success', 'failure', 'warning']).optional()
});

const createAuditTrailSchema = z.object({
  sessionId: z.string().optional(),
  userId: z.string().optional(),
  events: z.array(z.object({
    action: z.string().min(1),
    resource: z.string().min(1),
    resourceId: z.string().optional(),
    details: z.record(z.any()).optional(),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    status: z.enum(['success', 'failure', 'warning'])
  }))
});

const generateComplianceReportSchema = z.object({
  type: z.enum(['gdpr', 'hipaa', 'sox', 'pci_dss', 'custom']),
  period: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }),
  rules: z.array(z.string()).optional(),
  generatedBy: z.string().optional()
});

// Routes
app.post('/log', zValidator('json', logActionSchema), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const actionData = c.req.valid('json');
    
    await auditService.logAction({
      organizationId,
      ...actionData
    });
    
    logger.info('Action logged successfully');
    return c.json({
      success: true,
      message: 'Action logged successfully'
    });
  } catch (error) {
    logger.error('Failed to log action:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to log action'
    }, 500);
  }
});

app.post('/trails', zValidator('json', createAuditTrailSchema), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const trailData = c.req.valid('json');
    
    const trail = await auditService.createAuditTrail(organizationId, trailData);
    
    logger.info('Audit trail created successfully');
    return c.json({
      success: true,
      data: trail
    });
  } catch (error) {
    logger.error('Failed to create audit trail:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create audit trail'
    }, 500);
  }
});

app.get('/logs', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      userId: c.req.query('userId') as string,
      action: c.req.query('action') as string,
      resource: c.req.query('resource') as string,
      category: c.req.query('category') as any,
      severity: c.req.query('severity') as any,
      status: c.req.query('status') as any,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined,
      offset: c.req.query('offset') ? Number(c.req.query('offset')) : undefined
    };
    
    const result = await auditService.searchAuditLogs(organizationId, filters);
    
    logger.info('Audit logs retrieved successfully');
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to search audit logs:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to search audit logs'
    }, 500);
  }
});

app.get('/trails', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      userId: c.req.query('userId') as string,
      sessionId: c.req.query('sessionId') as string,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined,
      offset: c.req.query('offset') ? Number(c.req.query('offset')) : undefined
    };
    
    const result = await auditService.getAuditTrails(organizationId, filters);
    
    logger.info('Audit trails retrieved successfully');
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to get audit trails:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get audit trails'
    }, 500);
  }
});

app.get('/trail/:id', async (c) => {
  try {
    const trailId = c.req.param('id');
    const { searchParams } = new URL(c.req.url);
    
    // Parse query parameters
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Get audit logs for the specific trail/organization
    const auditLogs = await getAuditLogs({
      organizationId: trailId,
      startDate,
      endDate,
      limit,
      offset
    });
    
    // Generate audit trail report if date range is provided
    let trailReport = null;
    if (startDate && endDate) {
      trailReport = await generateAuditTrailReport({
        organizationId: trailId,
        startDate,
        endDate
      });
    }
    
    logger.info('Audit trail retrieved successfully');
    return c.json({
      success: true,
      data: {
        trailId,
        logs: auditLogs.logs,
        total: auditLogs.total,
        pagination: {
          limit,
          offset,
          hasMore: offset + limit < auditLogs.total
        },
        report: trailReport
      }
    });
  } catch (error) {
    logger.error('Failed to get audit trail:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get audit trail'
    }, 500);
  }
});

// Compliance routes
app.post('/compliance/reports', zValidator('json', generateComplianceReportSchema), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const reportData = c.req.valid('json');
    
    const report = await auditService.generateComplianceReport({
      organizationId,
      ...reportData
    });
    
    logger.info('Compliance report generated successfully');
    return c.json({
      success: true,
      data: report
    });
  } catch (error) {
    logger.error('Failed to generate compliance report:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate compliance report'
    }, 500);
  }
});

app.get('/compliance/reports', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      type: c.req.query('type') as any,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined,
      offset: c.req.query('offset') ? Number(c.req.query('offset')) : undefined
    };
    
    const result = await auditService.getComplianceReports(organizationId, filters);
    
    logger.info('Compliance reports retrieved successfully');
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to get compliance reports:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get compliance reports'
    }, 500);
  }
});

app.get('/compliance/reports/:id', requirePermission(Permission.AUDIT_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const reportId = c.req.param('id');
    const { searchParams } = new URL(c.req.url);
    
    // Parse query parameters
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default: 30 days ago
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : new Date();
    
    // Generate compliance report
    const complianceReport = await generateComplianceReport({
      organizationId,
      startDate,
      endDate,
      reportType: searchParams.get('type') || 'full'
    });
    
    logger.info('Compliance report retrieved successfully');
    return c.json({
      success: true,
      data: {
        reportId,
        organizationId,
        report: complianceReport,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Failed to get compliance report:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get compliance report'
    }, 500);
  }
});

// Export routes
app.post('/export', zValidator('json', z.object({
  format: z.enum(['json', 'csv', 'xml']),
  filters: z.object({
    userId: z.string().optional(),
    action: z.string().optional(),
    category: z.enum(['authentication', 'authorization', 'data_access', 'data_modification', 'system', 'security', 'compliance']).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional()
  }).optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { format, filters } = c.req.valid('json');
    
    const result = await auditService.exportAuditLogs({
      organizationId,
      format,
      filters
    });
    
    // Set appropriate headers for file download
    c.header('Content-Type', this.getContentType(format));
    c.header('Content-Disposition', `attachment; filename="${result.filename}"`);
    
    logger.info('Audit logs exported successfully');
    return c.body(result.data);
  } catch (error) {
    logger.error('Failed to export audit logs:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to export audit logs'
    }, 500);
  }
});

function getContentType(format: string): string {
  switch (format) {
    case 'json':
      return 'application/json';
    case 'csv':
      return 'text/csv';
    case 'xml':
      return 'application/xml';
    default:
      return 'application/octet-stream';
  }
}

// Analytics routes
app.get('/stats', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const period = c.req.query('period') ? {
      start: new Date(c.req.query('periodStart') as string),
      end: new Date(c.req.query('periodEnd') as string)
    } : undefined;
    
    const stats = await auditService.getAuditStats(organizationId, period);
    
    logger.info('Audit stats retrieved successfully');
    return c.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Failed to get audit stats:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get audit stats'
    }, 500);
  }
});

// Security monitoring routes
app.get('/security/alerts', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      severity: c.req.query('severity') as any,
      status: c.req.query('status') as any,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined
    };
    
    // Get security-related audit logs
    const result = await auditService.searchAuditLogs(organizationId, {
      ...filters,
      category: 'security'
    });
    
    logger.info('Security alerts retrieved successfully');
    return c.json({
      success: true,
      data: result.logs
    });
  } catch (error) {
    logger.error('Failed to get security alerts:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get security alerts'
    }, 500);
  }
});

app.get('/security/threats', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    
    // Get critical security events
    const result = await auditService.searchAuditLogs(organizationId, {
      severity: 'critical',
      category: 'security',
      limit: 50
    });
    
    logger.info('Security threats retrieved successfully');
    return c.json({
      success: true,
      data: result.logs
    });
  } catch (error) {
    logger.error('Failed to get security threats:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get security threats'
    }, 500);
  }
});

// Data access monitoring
app.get('/data-access', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      userId: c.req.query('userId') as string,
      resource: c.req.query('resource') as string,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined
    };
    
    // Get data access audit logs
    const result = await auditService.searchAuditLogs(organizationId, {
      ...filters,
      category: 'data_access'
    });
    
    logger.info('Data access logs retrieved successfully');
    return c.json({
      success: true,
      data: result.logs
    });
  } catch (error) {
    logger.error('Failed to get data access logs:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get data access logs'
    }, 500);
  }
});

app.get('/data-modification', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      userId: c.req.query('userId') as string,
      resource: c.req.query('resource') as string,
      resourceId: c.req.query('resourceId') as string,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined
    };
    
    // Get data modification audit logs
    const result = await auditService.searchAuditLogs(organizationId, {
      ...filters,
      category: 'data_modification'
    });
    
    logger.info('Data modification logs retrieved successfully');
    return c.json({
      success: true,
      data: result.logs
    });
  } catch (error) {
    logger.error('Failed to get data modification logs:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get data modification logs'
    }, 500);
  }
});

// Authentication monitoring
app.get('/authentication', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      userId: c.req.query('userId') as string,
      action: c.req.query('action') as string,
      status: c.req.query('status') as any,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined
    };
    
    // Get authentication audit logs
    const result = await auditService.searchAuditLogs(organizationId, {
      ...filters,
      category: 'authentication'
    });
    
    logger.info('Authentication logs retrieved successfully');
    return c.json({
      success: true,
      data: result.logs
    });
  } catch (error) {
    logger.error('Failed to get authentication logs:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get authentication logs'
    }, 500);
  }
});

// Authorization monitoring
app.get('/authorization', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      userId: c.req.query('userId') as string,
      action: c.req.query('action') as string,
      status: c.req.query('status') as any,
      startDate: c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined,
      endDate: c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined
    };
    
    // Get authorization audit logs
    const result = await auditService.searchAuditLogs(organizationId, {
      ...filters,
      category: 'authorization'
    });
    
    return c.json({
      success: true,
      data: result.logs
    });
  } catch (error) {
    logger.error('Failed to get authorization logs:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get authorization logs'
    }, 500);
  }
});

export default app;
