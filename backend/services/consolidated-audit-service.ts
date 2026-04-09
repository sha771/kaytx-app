import { db as pgDb } from '../db/connection';
import { auditLogs } from '../db/drizzle-schema';
import { eq, and, desc, lte, sql } from 'drizzle-orm';
import { EventEmitter } from 'events';
import crypto, { createHmac } from 'crypto';
import { Context } from 'hono';

import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// Security audit types
export type SecurityEventCategory = 'authentication' | 'authorization' | 'data_access' | 'data_modification' | 'system' | 'security' | 'compliance';
export type SecurityEventSeverity = 'info' | 'warning' | 'error' | 'critical';
export type SecurityEventType = 
  | 'login_success' | 'login_failure' | 'logout' | 'session_expired' | 'mfa_completed' | 'mfa_failed'
  | 'permission_granted' | 'permission_revoked' | 'role_changed' | 'access_denied'
  | 'pii_accessed' | 'data_exported' | 'data_anonymized'
  | 'record_created' | 'record_updated' | 'record_deleted' | 'bulk_operation'
  | 'config_changed' | 'service_started' | 'service_stopped' | 'backup_completed'
  | 'threat_detected' | 'vulnerability_found' | 'incident_reported' | 'breach_attempt'
  | 'audit_log_accessed' | 'policy_violation' | 'compliance_check';

export interface SecurityAuditEvent {
  category: SecurityEventCategory;
  eventType: SecurityEventType;
  severity: SecurityEventSeverity;
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  ipAddress?: string;
  userAgent?: string;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
  requestId?: string;
}

/**
 * Consolidated Audit Service
 * Combines functionality from:
 * - audit-service.ts
 * - audit-log-service.ts
 * - unified-audit-service.ts
 */

export interface AuditLog {
  id: string;
  organizationId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'error' | 'critical' | 'low' | 'medium' | 'high';
  category: 'authentication' | 'authorization' | 'data_access' | 'data_modification' | 'system' | 'security' | 'compliance';
  status: 'success' | 'failure' | 'warning';
  metadata: Record<string, any>;
  signature?: string;
  previousHash?: string;
  hash?: string;
}

export interface CreateAuditLogRequest {
  organizationId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  severity?: 'info' | 'warning' | 'error' | 'critical' | 'low' | 'medium' | 'high';
  category?: 'authentication' | 'authorization' | 'data_access' | 'data_modification' | 'system' | 'security' | 'compliance';
  status?: 'success' | 'failure' | 'warning';
  metadata?: Record<string, any>;
}

export interface AuditTrail {
  id: string;
  organizationId: string;
  sessionId?: string;
  userId?: string;
  events: AuditLog[];
  startTime: Date;
  endTime?: Date;
  totalEvents: number;
  hasFailures: boolean;
  hasSecurityEvents: boolean;
}

export interface AuditQuery {
  organizationId?: string;
  userId?: string;
  action?: string;
  resource?: string;
  resourceId?: string;
  severity?: string;
  category?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface AuditStatistics {
  totalEvents: number;
  eventsBySeverity: Record<string, number>;
  eventsByCategory: Record<string, number>;
  eventsByStatus: Record<string, number>;
  topActions: { action: string; count: number }[];
  topResources: { resource: string; count: number }[];
  failureRate: number;
  securityEvents: number;
  timeRange: { start: Date; end: Date };
}

export class ConsolidatedAuditService extends EventEmitter {
  private secretKey: string;
  private batchSize: number = 100;
  private flushInterval: number = 5000; // 5 seconds
  private pendingLogs: AuditLog[] = [];
  private flushTimer?: NodeJS.Timeout;

  constructor(config?: { secretKey?: string; batchSize?: number; flushInterval?: number }) {
    super();
    
    this.secretKey = config?.secretKey || process.env.AUDIT_SECRET_KEY || crypto.randomBytes(32).toString('hex');
    this.batchSize = config?.batchSize || 100;
    this.flushInterval = config?.flushInterval || 5000;

    // Start batch processing
    this.startBatchProcessing();
  }

  /**
   * Create an audit log entry
   */
  async log(request: CreateAuditLogRequest): Promise<AuditLog> {
    const auditLog: AuditLog = {
      id: crypto.randomUUID(),
      organizationId: request.organizationId,
      userId: request.userId,
      action: request.action,
      resource: request.resource,
      resourceId: request.resourceId,
      details: request.details,
      ipAddress: request.ipAddress,
      userAgent: request.userAgent,
      timestamp: new Date(),
      severity: request.severity || 'info',
      category: request.category || this.inferCategory(request.action),
      status: request.status || 'success',
      metadata: request.metadata || {},
    };

    // Get previous hash for chain integrity
    const [lastLog] = await pgDb
      .select({ hash: auditLogs.hash })
      .from(auditLogs)
      .where(eq(auditLogs.organizationId, request.organizationId))
      .orderBy(desc(auditLogs.timestamp))
      .limit(1);

    // Generate hash and signature
    const { hash, signature } = this.generateHashAndSignature(auditLog, lastLog?.hash);

    auditLog.previousHash = lastLog?.hash;
    auditLog.hash = hash;
    auditLog.signature = signature;

    // Add to batch for processing
    this.pendingLogs.push(auditLog);

    // Emit event for real-time monitoring
    this.emit('audit:logged', auditLog);

    return auditLog;
  }

  /**
   * Query audit logs
   */
  async query(query: AuditQuery): Promise<{ logs: AuditLog[]; total: number }> {
    let dbQuery = pgDb.select().from(auditLogs);

    // Apply filters
    const conditions = [];
    
    if (query.organizationId) {
      conditions.push(eq(auditLogs.organizationId, query.organizationId));
    }
    
    if (query.userId) {
      conditions.push(eq(auditLogs.userId, query.userId));
    }
    
    if (query.action) {
      conditions.push(eq(auditLogs.action, query.action));
    }
    
    if (query.resource) {
      conditions.push(eq(auditLogs.resource, query.resource));
    }
    
    if (query.resourceId) {
      conditions.push(eq(auditLogs.resourceId, query.resourceId));
    }
    
    if (query.severity) {
      conditions.push(eq(auditLogs.severity, query.severity as any));
    }
    
    if (query.category) {
      conditions.push(eq(auditLogs.category, query.category as any));
    }
    
    if (query.status) {
      conditions.push(eq(auditLogs.status, query.status as any));
    }
    
    if (query.startDate) {
      conditions.push(sql`${auditLogs.timestamp} >= ${query.startDate}`);
    }
    
    if (query.endDate) {
      conditions.push(sql`${auditLogs.timestamp} <= ${query.endDate}`);
    }

    if (conditions.length > 0) {
      dbQuery = dbQuery.where(and(...conditions));
    }

    // Get total count
    const [{ count }] = await pgDb
      .select({ count: sql`count(*)` })
      .from(dbQuery.as('subquery'));

    // Get paginated results
    const logs = await dbQuery
      .orderBy(desc(auditLogs.timestamp))
      .limit(query.limit || 100)
      .offset(query.offset || 0);

    return {
      logs: logs.map(log => this.mapDbLogToAuditLog(log)),
      total: Number(count)
    };
  }

  /**
   * Get audit trail for a session or user
   */
  async getTrail(params: {
    organizationId: string;
    sessionId?: string;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<AuditTrail | null> {
    const conditions = [eq(auditLogs.organizationId, params.organizationId)];
    
    if (params.sessionId) {
      conditions.push(eq(sql`audit_logs.metadata->>'sessionId'`, params.sessionId));
    }
    
    if (params.userId) {
      conditions.push(eq(auditLogs.userId, params.userId));
    }
    
    if (params.startDate) {
      conditions.push(sql`${auditLogs.timestamp} >= ${params.startDate}`);
    }
    
    if (params.endDate) {
      conditions.push(sql`${auditLogs.timestamp} <= ${params.endDate}`);
    }

    const logs = await pgDb
      .select()
      .from(auditLogs)
      .where(and(...conditions))
      .orderBy(desc(auditLogs.timestamp));

    if (logs.length === 0) return null;

    const auditLogs = logs.map(log => this.mapDbLogToAuditLog(log));
    const startTime = auditLogs[auditLogs.length - 1].timestamp;
    const endTime = auditLogs[0].timestamp;

    return {
      id: crypto.randomUUID(),
      organizationId: params.organizationId,
      sessionId: params.sessionId,
      userId: params.userId,
      events: auditLogs,
      startTime,
      endTime,
      totalEvents: auditLogs.length,
      hasFailures: auditLogs.some(log => log.status === 'failure'),
      hasSecurityEvents: auditLogs.some(log => log.category === 'security'),
    };
  }

  /**
   * Get audit statistics
   */
  async getStatistics(query: {
    organizationId: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<AuditStatistics> {
    const conditions = [eq(auditLogs.organizationId, query.organizationId)];
    
    if (query.startDate) {
      conditions.push(sql`${auditLogs.timestamp} >= ${query.startDate}`);
    }
    
    if (query.endDate) {
      conditions.push(sql`${auditLogs.timestamp} <= ${query.endDate}`);
    }

    const logs = await pgDb
      .select()
      .from(auditLogs)
      .where(and(...conditions));

    const timeRange = {
      start: query.startDate || new Date(0),
      end: query.endDate || new Date(),
    };

    // Calculate statistics
    const eventsBySeverity: Record<string, number> = {};
    const eventsByCategory: Record<string, number> = {};
    const eventsByStatus: Record<string, number> = {};
    const actionCounts: Record<string, number> = {};
    const resourceCounts: Record<string, number> = {};

    let failureCount = 0;
    let securityEventCount = 0;

    for (const log of logs) {
      const auditLog = this.mapDbLogToAuditLog(log);
      
      // Count by severity
      eventsBySeverity[auditLog.severity] = (eventsBySeverity[auditLog.severity] || 0) + 1;
      
      // Count by category
      eventsByCategory[auditLog.category] = (eventsByCategory[auditLog.category] || 0) + 1;
      
      // Count by status
      eventsByStatus[auditLog.status] = (eventsByStatus[auditLog.status] || 0) + 1;
      
      // Count actions
      actionCounts[auditLog.action] = (actionCounts[auditLog.action] || 0) + 1;
      
      // Count resources
      resourceCounts[auditLog.resource] = (resourceCounts[auditLog.resource] || 0) + 1;
      
      // Count failures
      if (auditLog.status === 'failure') failureCount++;
      
      // Count security events
      if (auditLog.category === 'security') securityEventCount++;
    }

    // Get top actions and resources
    const topActions = Object.entries(actionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([action, count]) => ({ action, count }));

    const topResources = Object.entries(resourceCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([resource, count]) => ({ resource, count }));

    return {
      totalEvents: logs.length,
      eventsBySeverity,
      eventsByCategory,
      eventsByStatus,
      topActions,
      topResources,
      failureRate: logs.length > 0 ? failureCount / logs.length : 0,
      securityEvents: securityEventCount,
      timeRange,
    };
  }

  /**
   * Verify audit trail integrity
   */
  async verifyIntegrity(organizationId: string, startDate?: Date, endDate?: Date): Promise<{
    isValid: boolean;
    totalLogs: number;
    verifiedLogs: number;
    brokenChains: { logId: string; expectedHash: string; actualHash: string }[];
  }> {
    const conditions = [eq(auditLogs.organizationId, organizationId)];
    
    if (startDate) conditions.push(sql`${auditLogs.timestamp} >= ${startDate}`);
    if (endDate) conditions.push(sql`${auditLogs.timestamp} <= ${endDate}`);

    const logs = await pgDb
      .select()
      .from(auditLogs)
      .where(and(...conditions))
      .orderBy(auditLogs.timestamp);

    let verifiedCount = 0;
    const brokenChains: { logId: string; expectedHash: string; actualHash: string }[] = [];
    let previousHash: string | undefined;

    for (const log of logs) {
      const auditLog = this.mapDbLogToAuditLog(log);
      
      // Verify hash
      const { hash: expectedHash } = this.generateHashAndSignature(auditLog, previousHash);
      
      if (auditLog.hash !== expectedHash) {
        brokenChains.push({
          logId: auditLog.id,
          expectedHash,
          actualHash: auditLog.hash || 'missing',
        });
      } else {
        verifiedCount++;
      }
      
      previousHash = auditLog.hash;
    }

    return {
      isValid: brokenChains.length === 0,
      totalLogs: logs.length,
      verifiedLogs: verifiedCount,
      brokenChains,
    };
  }

  /**
   * Start batch processing
   */
  private startBatchProcessing(): void {
    this.flushTimer = setInterval(() => {
      this.flushPendingLogs();
    }, this.flushInterval);
  }

  /**
   * Flush pending logs to database
   */
  private async flushPendingLogs(): Promise<void> {
    if (this.pendingLogs.length === 0) return;

    const logsToFlush = this.pendingLogs.splice(0, this.batchSize);
    
    try {
      await pgDb.insert(auditLogs).values(
        logsToFlush.map(log => ({
          id: log.id,
          organizationId: log.organizationId,
          userId: log.userId,
          action: log.action,
          resource: log.resource,
          resourceId: log.resourceId,
          details: log.details,
          ipAddress: log.ipAddress,
          userAgent: log.userAgent,
          timestamp: log.timestamp,
          severity: log.severity,
          category: log.category,
          status: log.status,
          metadata: log.metadata,
          signature: log.signature,
          previousHash: log.previousHash,
          hash: log.hash,
        }))
      );

      this.emit('audit:flushed', { count: logsToFlush.length });
    } catch (error) {
      logger.error('[ConsolidatedAuditService] Failed to flush audit logs:', error);
      
      // Re-add failed logs to pending for retry
      this.pendingLogs.unshift(...logsToFlush);
      
      this.emit('audit:error', { error, count: logsToFlush.length });
    }
  }

  /**
   * Generate hash and signature for audit log
   */
  private generateHashAndSignature(log: AuditLog, previousHash?: string): { hash: string; signature: string } {
    const data = {
      id: log.id,
      organizationId: log.organizationId,
      userId: log.userId,
      action: log.action,
      resource: log.resource,
      resourceId: log.resourceId,
      timestamp: log.timestamp.toISOString(),
      severity: log.severity,
      category: log.category,
      status: log.status,
      previousHash,
    };

    const dataString = JSON.stringify(data);
    const hash = crypto.createHash('sha256').update(dataString).digest('hex');
    const signature = createHmac('sha256', this.secretKey).update(dataString).digest('hex');

    return { hash, signature };
  }

  /**
   * Infer category from action
   */
  private inferCategory(action: string): AuditLog['category'] {
    const actionLower = action.toLowerCase();
    
    if (actionLower.includes('login') || actionLower.includes('logout') || actionLower.includes('auth')) {
      return 'authentication';
    }
    
    if (actionLower.includes('permission') || actionLower.includes('role') || actionLower.includes('access')) {
      return 'authorization';
    }
    
    if (actionLower.includes('read') || actionLower.includes('view') || actionLower.includes('get')) {
      return 'data_access';
    }
    
    if (actionLower.includes('create') || actionLower.includes('update') || actionLower.includes('delete')) {
      return 'data_modification';
    }
    
    if (actionLower.includes('security') || actionLower.includes('breach') || actionLower.includes('threat')) {
      return 'security';
    }
    
    if (actionLower.includes('compliance') || actionLower.includes('audit') || actionLower.includes('policy')) {
      return 'compliance';
    }
    
    return 'system';
  }

  /**
   * Map database log to AuditLog interface
   */
  private mapDbLogToAuditLog(dbLog: any): AuditLog {
    return {
      id: dbLog.id,
      organizationId: dbLog.organizationId,
      userId: dbLog.userId,
      action: dbLog.action,
      resource: dbLog.resource,
      resourceId: dbLog.resourceId,
      details: dbLog.details,
      ipAddress: dbLog.ipAddress,
      userAgent: dbLog.userAgent,
      timestamp: dbLog.timestamp,
      severity: dbLog.severity,
      category: dbLog.category,
      status: dbLog.status,
      metadata: dbLog.metadata,
      signature: dbLog.signature,
      previousHash: dbLog.previousHash,
      hash: dbLog.hash,
    };
  }

  /**
   * Log security event
   */
  async logSecurityEvent(event: SecurityAuditEvent): Promise<void> {
    try {
      await this.log({
        organizationId: event.organizationId || 'system',
        userId: event.userId,
        action: `security.${event.eventType}`,
        resource: event.resource || 'security',
        resourceId: event.resourceId,
        severity: event.severity,
        category: 'security',
        status: event.severity === 'critical' || event.severity === 'error' ? 'failure' : 'success',
        metadata: {
          securityCategory: event.category,
          eventType: event.eventType,
          ipAddress: event.ipAddress,
          userAgent: event.userAgent,
          sessionId: event.sessionId,
          requestId: event.requestId,
          ...event.metadata
        },
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
      });
    } catch (error) {
      logger.error('[ConsolidatedAuditService] Failed to log security event:', error);
    }
  }

  /**
   * Log security event from HTTP context
   */
  async logSecurityFromContext(
    c: Context,
    category: SecurityEventCategory,
    eventType: SecurityEventType,
    additionalData?: Partial<SecurityAuditEvent>
  ): Promise<void> {
    const event: SecurityAuditEvent = {
      category,
      eventType,
      severity: this.getEventSeverity(category, eventType),
      timestamp: new Date(),
      ipAddress: this.getClientIP(c),
      userAgent: c.req.header('User-Agent'),
      requestId: c.get('requestId'),
      ...additionalData
    };

    await this.logSecurityEvent(event);
  }

  /**
   * Get client IP from context
   */
  private getClientIP(c: Context): string {
    const forwardedFor = c.req.header('X-Forwarded-For');
    const realIP = c.req.header('X-Real-IP');
    const clientIP = c.req.header('CF-Connecting-IP');
    
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (clientIP) {
      return clientIP;
    }
    
    return 'unknown';
  }

  /**
   * Get event severity
   */
  private getEventSeverity(category: SecurityEventCategory, eventType: SecurityEventType): SecurityEventSeverity {
    const criticalEvents: SecurityEventType[] = ['breach_attempt', 'vulnerability_found', 'incident_reported', 'mfa_failed'];
    const errorEvents: SecurityEventType[] = ['login_failure', 'access_denied', 'threat_detected', 'policy_violation'];
    
    if (criticalEvents.includes(eventType)) return 'critical';
    if (errorEvents.includes(eventType)) return 'error';
    return 'info';
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined;
    }

    // Flush any remaining logs
    await this.flushPendingLogs();
    
    logger.info(`Cleaned up resources`);
  }
}

export const consolidatedAuditService = new ConsolidatedAuditService();

// Backward compatibility alias for tests
export const auditLogService = consolidatedAuditService;

// Backward compatibility for security audit service
export const securityAuditService = {
  logSecurityEvent: (event: SecurityAuditEvent) => consolidatedAuditService.logSecurityEvent(event),
  logFromContext: (c: Context, category: SecurityEventCategory, eventType: SecurityEventType, additionalData?: Partial<SecurityAuditEvent>) => 
    consolidatedAuditService.logSecurityFromContext(c, category, eventType, additionalData),
  getInstance: () => securityAuditService
};

// Convenience export for security logging
export const logSecurityEvent = (event: SecurityAuditEvent) => consolidatedAuditService.logSecurityEvent(event);
export const logSecurityFromContext = (c: Context, category: SecurityEventCategory, eventType: SecurityEventType, additionalData?: Partial<SecurityAuditEvent>) => 
  consolidatedAuditService.logSecurityFromContext(c, category, eventType, additionalData);
