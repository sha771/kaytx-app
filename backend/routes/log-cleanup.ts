/**
 * Log Cleanup API Routes
 * Provides endpoints for monitoring and managing log cleanup
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { requireAuth, requirePermission } from '../middleware/rbac-middleware';
import { Permission } from '../lib/rbac';
import { LogCleanupMonitor } from '../lib/log-cleanup-monitor';
import { LogCleanupService } from '../scripts/cleanup-logs';

const app = new Hono();
const monitor = new LogCleanupMonitor();
const cleanupService = new LogCleanupService();

// Get cleanup status
app.get('/status', requireAuth(), requirePermission(Permission.SYSTEM_READ), async (c) => {
  try {
    const status = await monitor.checkCleanupStatus();
    return c.json({
      success: true,
      data: status
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'MONITORING_ERROR',
        message: 'Failed to get cleanup status',
        details: error.message
      }
    }, 500);
  }
});

// Get cleanup report
app.get('/report', requireAuth(), requirePermission(Permission.SYSTEM_READ), async (c) => {
  try {
    const report = await monitor.generateCleanupReport();
    return c.json({
      success: true,
      data: report
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'REPORT_ERROR',
        message: 'Failed to generate cleanup report',
        details: error.message
      }
    }, 500);
  }
});

// Check if cleanup is needed
app.get('/needed', requireAuth(), requirePermission(Permission.SYSTEM_READ), async (c) => {
  try {
    const needed = await monitor.isCleanupNeeded();
    return c.json({
      success: true,
      data: needed
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'CHECK_ERROR',
        message: 'Failed to check cleanup status',
        details: error.message
      }
    }, 500);
  }
});

// Get cleanup metrics
app.get('/metrics', requireAuth(), requirePermission(Permission.SYSTEM_READ), async (c) => {
  try {
    const metrics = await monitor.getCleanupMetrics();
    return c.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'METRICS_ERROR',
        message: 'Failed to get cleanup metrics',
        details: error.message
      }
    }, 500);
  }
});

// Trigger manual cleanup (Admin only)
app.post('/cleanup', requireAuth(), requirePermission(Permission.SYSTEM_UPDATE), async (c) => {
  try {
    const body = await c.req.json();
    const { type = 'full' } = body;
    
    let result;
    
    switch (type) {
      case 'audit':
        result = await cleanupService.cleanupAuditLogs();
        break;
      case 'system':
        result = await cleanupService.cleanupSystemLogs();
        break;
      case 'error':
        result = await cleanupService.cleanupErrorLogs();
        break;
      case 'full':
      default:
        result = await cleanupService.runFullCleanup();
        break;
    }
    
    return c.json({
      success: true,
      data: {
        type,
        result,
        timestamp: new Date()
      }
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'CLEANUP_ERROR',
        message: 'Failed to run cleanup',
        details: error.message
      }
    }, 500);
  }
});

// Get retention policy configuration
app.get('/policy', requireAuth(), requirePermission(Permission.SYSTEM_READ), async (c) => {
  try {
    const policy = {
      auditLogs: {
        retentionDays: 90,
        description: 'Security and compliance logs',
        regulations: ['GDPR', 'HIPAA', 'SOX', 'PCI-DSS'],
        categories: [
          'authentication',
          'authorization',
          'data_access',
          'security_events',
          'compliance'
        ]
      },
      systemLogs: {
        retentionDays: 30,
        description: 'Application and system logs',
        categories: [
          'application',
          'performance',
          'debug',
          'info'
        ]
      },
      errorLogs: {
        retentionDays: 30,
        description: 'Error and exception logs',
        categories: [
          'error',
          'exception',
          'critical'
        ]
      },
      automatedCleanup: {
        enabled: true,
        schedule: 'daily at 2:00 AM UTC',
        retentionCheck: true,
        alerting: true
      }
    };
    
    return c.json({
      success: true,
      data: policy
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'POLICY_ERROR',
        message: 'Failed to get retention policy',
        details: error.message
      }
    }, 500);
  }
});

// Validate retention policy compliance
app.get('/compliance', requireAuth(), requirePermission(Permission.SYSTEM_READ), async (c) => {
  try {
    const status = await monitor.checkCleanupStatus();
    const report = await monitor.generateCleanupReport();
    
    const compliance = {
      overall: report.status === 'success' ? 'compliant' : 'non-compliant',
      audit: {
        compliant: status.auditLogs.withinPolicy,
        retentionDays: 90,
        currentDays: status.auditLogs.oldest ? 
          Math.floor((new Date().getTime() - status.auditLogs.oldest.getTime()) / (24 * 60 * 60 * 1000)) : 0,
        count: status.auditLogs.total
      },
      system: {
        compliant: status.systemLogs.withinPolicy,
        retentionDays: 30,
        currentDays: status.systemLogs.oldest ? 
          Math.floor((new Date().getTime() - status.systemLogs.oldest.getTime()) / (24 * 60 * 60 * 1000)) : 0,
        count: status.systemLogs.total
      },
      error: {
        compliant: status.errorLogs.withinPolicy,
        retentionDays: 30,
        currentDays: status.errorLogs.oldest ? 
          Math.floor((new Date().getTime() - status.errorLogs.oldest.getTime()) / (24 * 60 * 60 * 1000)) : 0,
        count: status.errorLogs.total
      },
      issues: report.details.issues,
      recommendations: report.details.issues.map(issue => issue.recommendation)
    };
    
    return c.json({
      success: true,
      data: compliance
    });
  } catch (error) {
    return c.json({
      success: false,
      error: {
        code: 'COMPLIANCE_ERROR',
        message: 'Failed to check compliance',
        details: error.message
      }
    }, 500);
  }
});

export default app;
