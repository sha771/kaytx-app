/**
 * Log Cleanup Monitor
 * Monitors log retention policy compliance and cleanup status
 */

import { db } from '../db/connection';
import { auditLogs, systemLogs } from '../db/drizzle-schema';
import { sql } from 'drizzle-orm';

export interface LogCleanupStatus {
  auditLogs: {
    total: number;
    oldest: Date | null;
    retentionDays: number;
    withinPolicy: boolean;
  };
  systemLogs: {
    total: number;
    oldest: Date | null;
    retentionDays: number;
    withinPolicy: boolean;
  };
  errorLogs: {
    total: number;
    oldest: Date | null;
    retentionDays: number;
    withinPolicy: boolean;
  };
}

export interface CleanupReport {
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
  details: {
    retention: LogCleanupStatus;
    issues: {
      category: string;
      issue: string;
      count: number;
      recommendation: string;
    }[];
    storage: {
      estimatedSize: string;
      compressionRatio: number;
    };
  };
}

export class LogCleanupMonitor {
  /**
   * Check current log cleanup status
   */
  async checkCleanupStatus(): Promise<LogCleanupStatus> {
    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get audit logs status (90-day retention)
    const [auditCount] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(auditLogs)
      .where(sql`timestamp >= ${ninetyDaysAgo.toISOString()}`);

    const [auditOldest] = await db
      .select({ timestamp: sql<Date>`MIN(timestamp)` })
      .from(auditLogs);

    // Get system logs status (30-day retention)
    const [systemCount] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(systemLogs)
      .where(sql`timestamp >= ${thirtyDaysAgo.toISOString()}`);

    const [systemOldest] = await db
      .select({ timestamp: sql<Date>`MIN(timestamp)` })
      .from(systemLogs)
      .where(sql`level != 'ERROR'`);

    // Get error logs status (30-day retention)
    const [errorCount] = await db
      .select({ count: sql<number>`count(*)`.mapWith(Number) })
      .from(systemLogs)
      .where(
        sql`timestamp >= ${thirtyDaysAgo.toISOString()} AND level = 'ERROR'`
      );

    const [errorOldest] = await db
      .select({ timestamp: sql<Date>`MIN(timestamp)` })
      .from(systemLogs)
      .where(sql`level = 'ERROR'`);

    return {
      auditLogs: {
        total: auditCount.count,
        oldest: auditOldest?.timestamp || null,
        retentionDays: 90,
        withinPolicy: auditOldest?.timestamp ? auditOldest.timestamp >= ninetyDaysAgo : true
      },
      systemLogs: {
        total: systemCount.count,
        oldest: systemOldest?.timestamp || null,
        retentionDays: 30,
        withinPolicy: systemOldest?.timestamp ? systemOldest.timestamp >= thirtyDaysAgo : true
      },
      errorLogs: {
        total: errorCount.count,
        oldest: errorOldest?.timestamp || null,
        retentionDays: 30,
        withinPolicy: errorOldest?.timestamp ? errorOldest.timestamp >= thirtyDaysAgo : true
      }
    };
  }

  /**
   * Generate comprehensive cleanup report
   */
  async generateCleanupReport(): Promise<CleanupReport> {
    try {
      const status = await this.checkCleanupStatus();
      
      // Check for policy violations and issues
      const issues = [];
      
      // Check audit log volume
      if (status.auditLogs.total > 100000) {
        issues.push({
          category: 'audit',
          issue: 'High volume of audit logs',
          count: status.auditLogs.total,
          recommendation: 'Consider more aggressive cleanup or increased storage'
        });
      }
      
      // Check system log volume
      if (status.systemLogs.total > 50000) {
        issues.push({
          category: 'system',
          issue: 'High volume of system logs',
          count: status.systemLogs.total,
          recommendation: 'Review logging levels and frequency'
        });
      }
      
      // Check error log volume
      if (status.errorLogs.total > 10000) {
        issues.push({
          category: 'error',
          issue: 'High volume of error logs',
          count: status.errorLogs.total,
          recommendation: 'Investigate root cause of errors'
        });
      }
      
      // Check retention policy compliance
      if (!status.auditLogs.withinPolicy) {
        issues.push({
          category: 'audit',
          issue: 'Audit logs exceed 90-day retention policy',
          count: status.auditLogs.total,
          recommendation: 'Run immediate cleanup of audit logs'
        });
      }
      
      if (!status.systemLogs.withinPolicy) {
        issues.push({
          category: 'system',
          issue: 'System logs exceed 30-day retention policy',
          count: status.systemLogs.total,
          recommendation: 'Run immediate cleanup of system logs'
        });
      }
      
      if (!status.errorLogs.withinPolicy) {
        issues.push({
          category: 'error',
          issue: 'Error logs exceed 30-day retention policy',
          count: status.errorLogs.total,
          recommendation: 'Run immediate cleanup of error logs'
        });
      }

      // Estimate storage usage (rough calculation)
      const estimatedSize = this.estimateStorageUsage(status);
      
      return {
        timestamp: new Date(),
        status: issues.length > 0 ? 'warning' : 'success',
        details: {
          retention: status,
          issues,
          storage: estimatedSize
        }
      };
    } catch (error) {
      return {
        timestamp: new Date(),
        status: 'error',
        details: {
          retention: null,
          issues: [{
            category: 'monitoring',
            issue: 'Failed to generate cleanup report',
            count: 0,
            recommendation: 'Check database connectivity and permissions'
          }],
          storage: {
            estimatedSize: 'Unknown',
            compressionRatio: 0
          }
        }
      };
    }
  }

  /**
   * Estimate storage usage based on log counts
   */
  private estimateStorageUsage(status: LogCleanupStatus): {
    estimatedSize: string;
    compressionRatio: number;
  } {
    // Rough estimates: average record sizes
    const auditLogSize = 500; // bytes per audit log entry
    const systemLogSize = 300; // bytes per system log entry
    const errorLogSize = 400; // bytes per error log entry
    
    const totalBytes = 
      (status.auditLogs.total * auditLogSize) +
      (status.systemLogs.total * systemLogSize) +
      (status.errorLogs.total * errorLogSize);
    
    // Apply compression ratio (assuming 70% compression)
    const compressionRatio = 0.7;
    const compressedBytes = totalBytes * compressionRatio;
    
    // Convert to human readable format
    const formatBytes = (bytes: number): string => {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes === 0) return '0 Bytes';
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };
    
    return {
      estimatedSize: formatBytes(compressedBytes),
      compressionRatio
    };
  }

  /**
   * Check if cleanup is needed
   */
  async isCleanupNeeded(): Promise<{
    needed: boolean;
    reasons: string[];
    priority: 'low' | 'medium' | 'high';
  }> {
    const status = await this.checkCleanupStatus();
    const reasons = [];
    let priority: 'low' | 'medium' | 'high' = 'low';
    
    // Check if any logs exceed retention policy
    if (!status.auditLogs.withinPolicy) {
      reasons.push('Audit logs exceed 90-day retention policy');
      priority = 'high';
    }
    
    if (!status.systemLogs.withinPolicy) {
      reasons.push('System logs exceed 30-day retention policy');
      priority = priority === 'high' ? 'high' : 'medium';
    }
    
    if (!status.errorLogs.withinPolicy) {
      reasons.push('Error logs exceed 30-day retention policy');
      priority = priority === 'high' ? 'high' : 'medium';
    }
    
    // Check if volumes are getting high
    if (status.auditLogs.total > 80000) {
      reasons.push('Audit log volume approaching limit');
      priority = priority === 'high' ? 'high' : 'medium';
    }
    
    if (status.systemLogs.total > 40000) {
      reasons.push('System log volume approaching limit');
      priority = priority === 'high' ? 'high' : 'medium';
    }
    
    return {
      needed: reasons.length > 0,
      reasons,
      priority
    };
  }

  /**
   * Get cleanup metrics for monitoring
   */
  async getCleanupMetrics(): Promise<{
    totalLogs: number;
    retentionCompliance: {
      audit: boolean;
      system: boolean;
      error: boolean;
    };
    storageEfficiency: {
      estimatedSize: string;
      compressionRatio: number;
    };
    lastCleanup: Date | null;
  }> {
    const status = await this.checkCleanupStatus();
    const storage = this.estimateStorageUsage(status);
    
    // Get last cleanup time from system logs
    const [lastCleanupRecord] = await db
      .select({ timestamp: sql<Date>`MAX(timestamp)` })
      .from(systemLogs)
      .where(
        sql`category = 'maintenance' AND message ILIKE '%cleanup%'`
      );
    
    return {
      totalLogs: status.auditLogs.total + status.systemLogs.total + status.errorLogs.total,
      retentionCompliance: {
        audit: status.auditLogs.withinPolicy,
        system: status.systemLogs.withinPolicy,
        error: status.errorLogs.withinPolicy
      },
      storageEfficiency: storage,
      lastCleanup: lastCleanupRecord?.timestamp || null
    };
  }
}
