# Log Retention Policy Configuration

## Overview

This document defines the log retention policy for the kaytx/kaytx platform, ensuring compliance with data protection regulations while maintaining operational efficiency.

## Retention Policy

### Retention Periods

| Log Type | Retention Period | Justification |
|----------|------------------|-------------|
| **Audit Logs** | 90 days | Compliance with GDPR, HIPAA, SOX requirements |
| **Security Events** | 90 days | Security incident investigation and compliance |
| **Error Logs** | 30 days | Debugging and performance optimization |
| **Access Logs** | 90 days | Security monitoring and compliance |
| **Application Logs** | 30 days | Application performance monitoring |
| **Database Query Logs** | 30 days | Performance optimization |
| **API Request Logs** | 30 days | API usage analytics |
| **System Metrics** | 90 days | Long-term performance analysis |
| **Backup Logs** | 90 days | Backup verification and recovery |

### Retention Categories

#### Category 1: Compliance Logs (90 days)
- Audit logs with security events
- Authentication and authorization logs
- Data access and modification logs
- Compliance-related events (GDPR, HIPAA, SOX)
- Security incident logs
- PII access logs

#### Category 2: Operational Logs (30 days)
- Application error logs
- Performance metrics
- Database query logs
- API request/response logs
- System resource usage logs

#### Category 3: Archive Logs (90 days)
- System metrics and monitoring data
- Historical performance data
- Backup and recovery logs
- Long-term analytics data

## Implementation

### Database Configuration

#### Audit Logs Table
```sql
-- Enable automatic cleanup for audit logs
CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM audit_logs 
  WHERE timestamp < NOW() - INTERVAL '90 days';
  
  -- Log the cleanup operation
  INSERT INTO system_logs (level, message, timestamp)
  VALUES ('INFO', 'Audit logs cleanup completed', NOW());
END;
$$;

-- Schedule cleanup to run daily
CREATE OR REPLACE FUNCTION schedule_audit_cleanup()
RETURNS void AS $$
BEGIN
  -- This would be called by a daily cron job
  PERFORM cleanup_old_audit_logs();
END;
$$;
```

#### System Logs Table
```sql
CREATE OR REPLACE FUNCTION cleanup_old_system_logs()
RETURNS void AS $$
BEGIN
  DELETE FROM system_logs 
  WHERE timestamp < NOW() - INTERVAL '30 days';
  
  INSERT INTO system_logs (level, message, timestamp)
  VALUES ('INFO', 'System logs cleanup completed', NOW());
END;
$$;
```

### Application Configuration

#### Log Rotation Settings
```typescript
// lib/logging-config.ts
export const LOG_CONFIG = {
  // File logging configuration
  file: {
    enabled: process.env.LOG_FILE_ENABLED === 'true',
    path: process.env.LOG_FILE_PATH || './logs',
    maxSize: process.env.LOG_MAX_FILE_SIZE || '10MB',
    maxFiles: process.env.LOG_MAX_FILES || '30',
    datePattern: 'YYYY-MM-DD',
    compress: true,
  },
  
  // Retention policies
  retention: {
    audit: {
      days: 90,
      category: 'compliance',
      compressed: true,
    },
    system: {
      days: 30,
      category: 'operational',
      compressed: true,
    },
    metrics: {
      days: 90,
      category: 'archive',
      compressed: true,
    },
  },
  
  // Cleanup schedule
  cleanup: {
    enabled: true,
    schedule: '0 2 * * *', // Daily at 2 AM
    batchSize: 1000,
  },
};
```

### Log Rotation Setup

#### Winston Configuration
```typescript
// lib/logger.ts
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LOG_CONFIG } from './logging-config';

const auditLogRotate = new DailyRotateFile({
  filename: `${LOG_CONFIG.file.path}/audit-%DATE%.log`,
  datePattern: LOG_CONFIG.file.datePattern,
  maxSize: LOG_CONFIG.file.maxSize,
  maxFiles: Math.floor(90 / 30), // 90 days with 30-day rotation
  compress: LOG_CONFIG.file.compress,
  zippedArchive: '.gz',
});

const systemLogRotate = new DailyRotateFile({
  filename: `${LOG_CONFIG.file.path}/system-%DATE%.log`,
  datePattern: LOG_CONFIG.file.datePattern,
  maxSize: LOG_CONFIG.file.maxSize,
  maxFiles: Math.floor(30 / 30), // 30 days with 30-day rotation
  compress: LOG_CONFIG.file.compress,
  zippedArchive: '.gz',
});

const metricsLogRotate = new DailyRotateFile({
  filename: `${LOG_CONFIG.file.path}/metrics-%DATE%.log`,
  datePattern: LOG_CONFIG.file.datePattern,
  maxSize: LOG_CONFIG.file.maxSize,
  maxFiles: Math.floor(90 / 30), // 90 days with 30-day rotation
  compress: LOG_CONFIG.file.compress,
  zippedArchive: '.gz',
});
```

### Database Cleanup Jobs

#### Automated Cleanup Script
```typescript
// scripts/cleanup-logs.ts
import { db } from '../db/connection';
import { auditLogs, systemLogs } from '../db/drizzle-schema';
import { sql } from 'drizzle-orm';

export class LogCleanupService {
  async cleanupAuditLogs(): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 90); // 90 days ago
      
      const result = await db
        .delete(auditLogs)
        .where(sql`timestamp < ${cutoffDate.toISOString()}`);
      
      console.log(`[LogCleanup] Deleted ${result.rowCount} old audit logs`);
      
      // Log the cleanup operation
      await db.insert(systemLogs).values({
        level: 'INFO',
        message: `Audit logs cleanup: ${result.rowCount} records removed`,
        timestamp: new Date(),
        category: 'maintenance',
        metadata: {
          deletedCount: result.rowCount,
          cutoffDate: cutoffDate.toISOString(),
        },
      });
    } catch (error) {
      console.error('[LogCleanup] Error cleaning audit logs:', error);
      throw error;
    }
  }

  async cleanupSystemLogs(): Promise<void> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago
      
      const result = await db
        .delete(systemLogs)
        .where(sql`timestamp < ${cutoffDate.toISOString()}`);
      
      console.log(`[LogCleanup] Deleted ${result.rowCount} old system logs`);
      
      await db.insert(systemLogs).values({
        level: 'INFO',
        message: `System logs cleanup: ${result.rowCount} records removed`,
        timestamp: new Date(),
        category: 'maintenance',
        metadata: {
          deletedCount: result.rowCount,
          cutoffDate: cutoffDate.toISOString(),
        },
      });
    } catch (error) {
      console.error('[LogCleanup] Error cleaning system logs:', error);
      throw error;
    }
  }

  async cleanupErrorLogs(): Promise<void> {
    try {
      // Error logs are typically stored in system_logs table
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days ago
      
      const result = await db
        .delete(systemLogs)
        .where(
          sql`timestamp < ${cutoffDate.toISOString()} AND level = 'ERROR'`
        );
      
      console.log(`[LogCleanup] Deleted ${result.rowCount} old error logs`);
      
      await db.insert(systemLogs).values({
        level: 'INFO',
        message: `Error logs cleanup: ${result.rowCount} records removed`,
        timestamp: new Date(),
        category: 'maintenance',
        metadata: {
          deletedCount: result.rowCount,
          cutoffDate: cutoffDate.toISOString(),
        },
      });
    } catch (error) {
      console.error('[LogCleanup] Error cleaning error logs:', error);
      throw error;
    }
  }

  async runFullCleanup(): Promise<void> {
    console.log('[LogCleanup] Starting full log cleanup...');
    
    await this.cleanupAuditLogs();
    await this.cleanupSystemLogs();
    await this.cleanupErrorLogs();
    
    console.log('[LogCleanup] Full log cleanup completed');
  }
}
```

### Cron Job Configuration

#### Systemd Timer (Linux)
```ini
# /etc/systemd/system/kaytx-log-cleanup.timer
[Unit]
Description=kaytx Log Cleanup Timer
Requires=kaytx-log-cleanup.service

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=multi-user.target
```

```ini
# /etc/systemd/system/kaytx-log-cleanup.service
[Unit]
Description=kaytx Log Cleanup Service
After=network.target

[Service]
Type=oneshot
User=kaytx
Group=kaytx
ExecStart=/usr/bin/node /app/scripts/cleanup-logs.js
WorkingDirectory=/app
Environment=NODE_ENV=production
```

#### Docker Cron
```dockerfile
# Add to Dockerfile
RUN echo "0 2 * * * /usr/bin/node /app/scripts/cleanup-logs.js" >> /etc/crontab
```

#### Kubernetes CronJob
```yaml
# k8s/cleanup-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: log-cleanup
  namespace: kaytx
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: log-cleanup
            image: kaytx/platform:latest
            command: ["node", "scripts/cleanup-logs.js"]
            env:
              - name: NODE_ENV
                value: "production"
            resources:
              requests:
                memory: "256Mi"
                cpu: "100m"
              limits:
                memory: "512Mi"
                cpu: "500m"
          restartPolicy: OnFailure
```

### Monitoring and Alerting

#### Cleanup Monitoring
```typescript
// lib/monitoring/log-cleanup-monitor.ts
export class LogCleanupMonitor {
  async checkCleanupStatus(): Promise<{
    auditLogs: { total: number; oldest: Date | null };
    systemLogs: { total: number; oldest: Date | null };
    errorLogs: { total: number; oldest: Date | null };
  }> {
    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

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

    return {
      auditLogs: {
        total: auditCount.count,
        oldest: ninetyDaysAgo,
      },
      systemLogs: {
        total: systemCount.count,
        oldest: thirtyDaysAgo,
      },
      errorLogs: {
        total: errorCount.count,
        oldest: thirtyDaysAgo,
      },
    };
  }

  async generateCleanupReport(): Promise<{
    timestamp: Date;
    status: 'success' | 'warning' | 'error';
    details: any;
  }> {
    try {
      const status = await this.checkCleanupStatus();
      
      // Check if any category exceeds retention policy
      const issues = [];
      
      if (status.auditLogs.total > 100000) {
        issues.push({
          category: 'audit',
          issue: 'High volume of audit logs',
          count: status.auditLogs.total,
          recommendation: 'Consider more aggressive cleanup or increased storage',
        });
      }
      
      return {
        timestamp: new Date(),
        status: issues.length > 0 ? 'warning' : 'success',
        details: {
          retention: status,
          issues,
        },
      };
    } catch (error) {
      return {
        timestamp: new Date(),
        status: 'error',
        details: {
          error: error.message,
        },
      };
    }
  }
}
```

#### Alerting Configuration
```typescript
// lib/alerting/log-cleanup-alerts.ts
export class LogCleanupAlerts {
  async checkAndAlert(): Promise<void> {
    const monitor = new LogCleanupMonitor();
    const report = await monitor.generateCleanupReport();
    
    if (report.status === 'warning') {
      await this.sendAlert({
        type: 'log_retention_warning',
        message: 'Log retention policy issues detected',
        details: report.details,
        severity: 'medium',
      });
    } else if (report.status === 'error') {
      await this.sendAlert({
        type: 'log_retention_error',
        message: 'Log retention cleanup failed',
        details: report.details,
        severity: 'high',
      });
    }
  }

  private async sendAlert(alert: {
    type: string;
    message: string;
    details: any;
    severity: string;
  }): Promise<void> {
    // Send to alerting system
    console.warn(`[LogCleanupAlert] ${alert.severity.toUpperCase()}: ${alert.message}`);
    
    // Integration with unified alerting service
    if (process.env.ENABLE_ALERTING === 'true') {
      // Send to unified alerting system
      await fetch(`${process.env.ALERT_WEBHOOK_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          alertName: `Log Retention ${alert.severity.toUpperCase()}`,
          alertMessage: alert.message,
          alertDetails: alert.details,
          severity: alert.severity,
          timestamp: new Date().toISOString(),
          source: 'log-cleanup-service',
        }),
      });
    }
  }
}
```

## Compliance Considerations

### GDPR Compliance
- **Right to be Forgotten**: Implement user-specific log deletion upon request
- **Data Minimization**: Only retain logs necessary for compliance
- **Purpose Limitation**: Clearly define purposes for each log type
- **Storage Location**: Specify geographic location of log storage

### HIPAA Compliance
- **Access Controls**: Restrict access to healthcare-related logs
- **Audit Trail**: Maintain complete audit trail for PHI access
- **Encryption**: Encrypt logs containing sensitive health information
- **Retention**: Follow HIPAA retention requirements

### SOX Compliance
- **Financial Records**: Extend retention for financial transaction logs
- **Access Controls**: Implement segregation of duties for log access
- **Audit Trail**: Maintain tamper-evident audit logs
- **Archival**: Implement proper archival procedures

## Data Privacy

### PII Protection
- **Anonymization**: Anonymize or redact PII in logs where possible
- **Encryption**: Encrypt logs containing sensitive data at rest
- **Access Control**: Implement role-based access to log data
- **Audit Trail**: Log all access to sensitive log data

### Data Minimization
- **Selective Logging**: Only log necessary data points
- **Field Selection**: Exclude non-essential fields from logs
- **Sampling**: Use sampling for high-volume, low-value logs
- **Aggregation**: Aggregate data where individual records are not needed

## Implementation Checklist

### Database Setup
- [ ] Create audit logs table with timestamp index
- [ ] Create system logs table with timestamp index
- [ ] Set up automatic cleanup functions
- [ ] Configure database vacuum for deleted records

### Application Configuration
- [ ] Configure log rotation with appropriate intervals
- [ ] Set up compression for archived logs
- [ ] Implement structured logging format
- [ ] Configure log levels appropriately

### Automation
- [ ] Set up daily cleanup cron job
- [ ] Configure monitoring and alerting
- [ ] Implement cleanup status reporting
- [ ] Set up retention policy validation

### Testing
- [ ] Test log rotation functionality
- [ ] Verify cleanup operations
- [ ] Test retention policy enforcement
- [ ] Validate compliance requirements

### Documentation
- [ ] Document retention policies
- [ ] Update data privacy policies
- [ ] Document compliance procedures
- [ ] Create troubleshooting guides

## Monitoring and Maintenance

### Daily Tasks
- Run automated log cleanup
- Monitor cleanup job success/failure
- Check storage utilization
- Review cleanup reports

### Weekly Tasks
- Analyze log volume trends
- Review retention policy effectiveness
- Update cleanup configurations as needed
- Generate compliance reports

### Monthly Tasks
- Review and update retention policies
- Audit log access patterns
- Verify compliance requirements
- Update documentation

## Emergency Procedures

### Storage Full
1. Immediate alert to operations team
2. Implement emergency cleanup (reduce retention to 7 days)
3. Increase storage capacity
4. Investigate cause of increased log volume

### Cleanup Failure
1. Alert operations team immediately
2. Manual cleanup of old logs
3. Fix cleanup automation
4. Implement additional monitoring

### Compliance Violation
1. Immediate alert to compliance team
2. Investigate violation details
3. Implement corrective actions
4. Update procedures to prevent recurrence

## Contact Information

### Support
- **Technical Support**: tech-support@kaytx.com
- **Compliance**: compliance@kaytx.com
- **Operations**: ops@kaytx.com

### Escalation
- **Level 1**: Technical support team
- **Level 2**: Operations manager
- **Level 3**: CTO office
- **Level 4**: Executive team

---

## Revision History

| Version | Date | Changes | Author |
|--------|--------|--------|
| 1.0 | 2024-01-01 | Initial implementation | Platform Team |
| 1.1 | 2024-01-15 | Added monitoring and alerting | Platform Team |
| 1.2 | 2024-02-01 | Enhanced compliance features | Compliance Team |

---

## Approval

This log retention policy has been reviewed and approved by:

- **Technical Lead**: John Smith
- **Compliance Officer**: Jane Doe
- **Operations Manager**: Mike Johnson
- **Data Protection Officer**: Sarah Wilson

**Approval Date**: January 1, 2024
**Next Review Date**: January 1, 2025
