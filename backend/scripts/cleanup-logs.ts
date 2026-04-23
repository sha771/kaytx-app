#!/usr/bin/env node

/**
 * Log Cleanup Script
 * Automated cleanup of logs based on retention policies
 * Ensures compliance with 90-day retention policy
 */

import { db } from '../db/connection';
import { auditLogs, systemLogs } from '../db/drizzle-schema';
import { sql } from 'drizzle-orm';
import { securityAuditService } from '../services/security-audit-service';
import { logger } from '../lib/production-logger';

interface CleanupResult {
  deletedCount: number;
  errors: string[];
  duration: number;
}

class LogCleanupService {
  /**
   * Cleanup audit logs based on 90-day retention policy
   */
  async cleanupAuditLogs(): Promise<CleanupResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let deletedCount = 0;

    try {
      logger.info('[LogCleanup] Starting audit logs cleanup...');
      
      // Use the security audit service for proper cleanup
      const result = await securityAuditService.cleanupAuditLogs();
      deletedCount = result.deletedCount;
      
      if (result.errors.length > 0) {
        errors.push(...result.errors);
      }

      logger.info(`[LogCleanup] Audit logs cleanup completed: ${deletedCount} records removed`);
      
    } catch (error) {
      const errorMsg = `Error cleaning audit logs: ${error.message}`;
      logger.error(`[LogCleanup] ${errorMsg}`);
      errors.push(errorMsg);
    }

    return {
      deletedCount,
      errors,
      duration: Date.now() - startTime
    };
  }

  /**
   * Cleanup system logs based on 30-day retention policy
   */
  async cleanupSystemLogs(): Promise<CleanupResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let deletedCount = 0;

    try {
      logger.info('[LogCleanup] Starting system logs cleanup...');
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago
      
      const result = await db
        .delete(systemLogs)
        .where(sql`timestamp < ${cutoffDate.toISOString()}`);
      
      deletedCount = result.rowCount || 0;
      
      logger.info(`[LogCleanup] System logs cleanup completed: ${deletedCount} records removed`);
      
      // Log the cleanup operation
      await db.insert(systemLogs).values({
        level: 'INFO',
        message: `System logs cleanup: ${deletedCount} records removed`,
        timestamp: new Date(),
        category: 'maintenance',
        metadata: {
          deletedCount,
          cutoffDate: cutoffDate.toISOString(),
          script: 'cleanup-logs.ts'
        },
      } as any);
      
    } catch (error) {
      const errorMsg = `Error cleaning system logs: ${error.message}`;
      logger.error(`[LogCleanup] ${errorMsg}`);
      errors.push(errorMsg);
    }

    return {
      deletedCount,
      errors,
      duration: Date.now() - startTime
    };
  }

  /**
   * Cleanup error logs based on 30-day retention policy
   */
  async cleanupErrorLogs(): Promise<CleanupResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    let deletedCount = 0;

    try {
      logger.info('[LogCleanup] Starting error logs cleanup...');
      
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago
      
      const result = await db
        .delete(systemLogs)
        .where(
          sql`timestamp < ${cutoffDate.toISOString()} AND level = 'ERROR'`
        );
      
      deletedCount = result.rowCount || 0;
      
      logger.info(`[LogCleanup] Error logs cleanup completed: ${deletedCount} records removed`);
      
      // Log the cleanup operation
      await db.insert(systemLogs).values({
        level: 'INFO',
        message: `Error logs cleanup: ${deletedCount} records removed`,
        timestamp: new Date(),
        category: 'maintenance',
        metadata: {
          deletedCount,
          cutoffDate: cutoffDate.toISOString(),
          script: 'cleanup-logs.ts'
        },
      } as any);
      
    } catch (error) {
      const errorMsg = `Error cleaning error logs: ${error.message}`;
      logger.error(`[LogCleanup] ${errorMsg}`);
      errors.push(errorMsg);
    }

    return {
      deletedCount,
      errors,
      duration: Date.now() - startTime
    };
  }

  /**
   * Run full cleanup for all log types
   */
  async runFullCleanup(): Promise<{
    audit: CleanupResult;
    system: CleanupResult;
    error: CleanupResult;
    total: {
      deletedCount: number;
      errors: string[];
      duration: number;
    };
  }> {
    logger.info('[LogCleanup] Starting full log cleanup...');
    const startTime = Date.now();

    // Run all cleanup operations
    const [auditResult, systemResult, errorResult] = await Promise.allSettled([
      this.cleanupAuditLogs(),
      this.cleanupSystemLogs(),
      this.cleanupErrorLogs()
    ]);

    const audit = auditResult.status === 'fulfilled' ? auditResult.value : {
      deletedCount: 0,
      errors: [auditResult.reason?.message || 'Unknown error'],
      duration: 0
    };

    const system = systemResult.status === 'fulfilled' ? systemResult.value : {
      deletedCount: 0,
      errors: [systemResult.reason?.message || 'Unknown error'],
      duration: 0
    };

    const error = errorResult.status === 'fulfilled' ? errorResult.value : {
      deletedCount: 0,
      errors: [errorResult.reason?.message || 'Unknown error'],
      duration: 0
    };

    const total = {
      deletedCount: audit.deletedCount + system.deletedCount + error.deletedCount,
      errors: [...audit.errors, ...system.errors, ...error.errors],
      duration: Date.now() - startTime
    };

    logger.info('[LogCleanup] Full log cleanup completed');
    logger.info(`[LogCleanup] Total records removed: ${total.deletedCount}`);
    logger.info(`[LogCleanup] Total duration: ${total.duration}ms`);
    
    if (total.errors.length > 0) {
      logger.error(`[LogCleanup] Errors encountered: ${total.errors.join(', ')}`);
    }

    return { audit, system, error, total };
  }

  /**
   * Generate cleanup report
   */
  async generateCleanupReport(): Promise<{
    timestamp: Date;
    status: 'success' | 'warning' | 'error';
    summary: any;
    details: any;
  }> {
    try {
      const now = new Date();
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Count remaining logs
      const [auditCount] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(auditLogs)
        .where(sql`timestamp >= ${ninetyDaysAgo.toISOString()}`);

      const [systemCount] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(systemLogs)
        .where(sql`timestamp >= ${thirtyDaysAgo.toISOString()}`);

      const [errorCount] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(systemLogs)
        .where(
          sql`timestamp >= ${thirtyDaysAgo.toISOString()} AND level = 'ERROR'`
        );

      const summary = {
        auditLogs: {
          total: auditCount.count,
          retention: '90 days',
          oldest: ninetyDaysAgo
        },
        systemLogs: {
          total: systemCount.count,
          retention: '30 days',
          oldest: thirtyDaysAgo
        },
        errorLogs: {
          total: errorCount.count,
          retention: '30 days',
          oldest: thirtyDaysAgo
        }
      };

      // Check for issues
      const issues = [];
      
      if (auditCount.count > 100000) {
        issues.push({
          category: 'audit',
          issue: 'High volume of audit logs',
          count: auditCount.count,
          recommendation: 'Consider more aggressive cleanup or increased storage'
        });
      }
      
      if (systemCount.count > 50000) {
        issues.push({
          category: 'system',
          issue: 'High volume of system logs',
          count: systemCount.count,
          recommendation: 'Review logging levels and frequency'
        });
      }

      return {
        timestamp: now,
        status: issues.length > 0 ? 'warning' : 'success',
        summary,
        details: {
          retention: {
            audit: '90 days',
            system: '30 days',
            error: '30 days'
          },
          issues,
          lastCleanup: now
        }
      };
    } catch (error) {
      return {
        timestamp: new Date(),
        status: 'error',
        summary: null,
        details: {
          error: error.message
        }
      };
    }
  }
}

// Main execution
async function main() {
  const cleanupService = new LogCleanupService();
  
  try {
    // Check if this is a dry run
    const isDryRun = process.argv.includes('--dry-run');
    
    if (isDryRun) {
      logger.info('[LogCleanup] Dry run mode - no records will be deleted');
      const report = await cleanupService.generateCleanupReport();
      logger.info('[LogCleanup] Current log status:', JSON.stringify(report, null, 2));
      return;
    }

    // Check if only specific cleanup should run
    const cleanupType = process.argv.find(arg => 
      ['audit', 'system', 'error'].includes(arg.replace('--', ''))
    );

    let result;
    
    switch (cleanupType) {
      case '--audit':
        result = await cleanupService.cleanupAuditLogs();
        break;
      case '--system':
        result = await cleanupService.cleanupSystemLogs();
        break;
      case '--error':
        result = await cleanupService.cleanupErrorLogs();
        break;
      default:
        result = await cleanupService.runFullCleanup();
        break;
    }

    // Generate final report
    const report = await cleanupService.generateCleanupReport();
    
    // Log completion
    logger.info('[LogCleanup] Cleanup operation completed');
    logger.info('[LogCleanup] Report:', JSON.stringify(report, null, 2));

    // Exit with error code if there were errors
    if (report.status === 'error' || 
        (result && 'total' in result && result.total.errors.length > 0)) {
      process.exit(1);
    }

  } catch (error) {
    logger.error('[LogCleanup] Fatal error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { LogCleanupService };
