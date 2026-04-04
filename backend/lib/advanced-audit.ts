import { v4 as uuidv4 } from 'uuid';

export enum AuditEventType {
  USER_LOGIN = 'user.login',
  USER_LOGOUT = 'user.logout',
  USER_REGISTER = 'user.register',
  USER_UPDATE = 'user.update',
  USER_DELETE = 'user.delete',
  
  PASSWORD_CHANGE = 'password.change',
  PASSWORD_RESET = 'password.reset',
  
  PLATFORM_CONNECT = 'platform.connect',
  PLATFORM_DISCONNECT = 'platform.disconnect',
  PLATFORM_SYNC = 'platform.sync',
  
  MESSAGE_SEND = 'message.send',
  MESSAGE_READ = 'message.read',
  MESSAGE_DELETE = 'message.delete',
  
  DATA_EXPORT = 'data.export',
  DATA_DELETE = 'data.delete',
  DATA_ACCESS = 'data.access',
  
  SETTINGS_UPDATE = 'settings.update',
  BILLING_UPDATE = 'billing.update',
  
  SECURITY_2FA_ENABLE = 'security.2fa.enable',
  SECURITY_2FA_DISABLE = 'security.2fa.disable',
  SECURITY_BREACH_DETECTED = 'security.breach.detected',
  
  AI_ASSISTANT_USE = 'ai.assistant.use',
  AI_RECEPTIONIST_CALL = 'ai.receptionist.call',
  AI_NEGOTIATION_CALL = 'ai.negotiation.call',
  
  API_KEY_CREATE = 'api.key.create',
  API_KEY_DELETE = 'api.key.delete',
  API_KEY_USE = 'api.key.use',
  
  PERMISSION_GRANT = 'permission.grant',
  PERMISSION_REVOKE = 'permission.revoke',
  
  SYSTEM_ERROR = 'system.error',
  SYSTEM_WARNING = 'system.warning',
}

export enum AuditSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export interface AuditEvent {
  id: string;
  timestamp: Date;
  type: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userRole?: string;
  ipAddress?: string;
  userAgent?: string;
  organizationId?: string;
  resource?: string;
  resourceId?: string;
  action: string;
  result: 'success' | 'failure';
  errorMessage?: string;
  metadata?: Record<string, any>;
  location?: {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  };
  sessionId?: string;
  requestId?: string;
}

class AdvancedAuditLogger {
  private events: AuditEvent[] = [];
  private readonly maxEvents = 10000;
  private readonly retentionDays = 90;

  log(event: Omit<AuditEvent, 'id' | 'timestamp'>): void {
    const auditEvent: AuditEvent = {
      ...event,
      id: uuidv4(),
      timestamp: new Date(),
    };

    this.events.push(auditEvent);

    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    this.notifyIfCritical(auditEvent);

    console.log('[AUDIT]', JSON.stringify(auditEvent));
  }

  private notifyIfCritical(event: AuditEvent): void {
    if (event.severity === AuditSeverity.CRITICAL) {
      console.error('[CRITICAL AUDIT EVENT]', event);
    }
  }

  logUserAction(
    type: AuditEventType,
    userId: string,
    action: string,
    result: 'success' | 'failure',
    metadata?: Record<string, any>
  ): void {
    this.log({
      type,
      severity: result === 'failure' ? AuditSeverity.WARNING : AuditSeverity.INFO,
      userId,
      action,
      result,
      metadata,
    });
  }

  logSecurityEvent(
    type: AuditEventType,
    userId: string | undefined,
    action: string,
    severity: AuditSeverity,
    metadata?: Record<string, any>
  ): void {
    this.log({
      type,
      severity,
      userId,
      action,
      result: 'failure',
      metadata,
    });
  }

  logDataAccess(
    userId: string,
    resource: string,
    resourceId: string,
    action: string,
    result: 'success' | 'failure'
  ): void {
    this.log({
      type: AuditEventType.DATA_ACCESS,
      severity: AuditSeverity.INFO,
      userId,
      resource,
      resourceId,
      action,
      result,
    });
  }

  logAPICall(
    userId: string | undefined,
    action: string,
    result: 'success' | 'failure',
    metadata?: Record<string, any>
  ): void {
    this.log({
      type: AuditEventType.API_KEY_USE,
      severity: result === 'failure' ? AuditSeverity.WARNING : AuditSeverity.INFO,
      userId,
      action,
      result,
      metadata,
    });
  }

  getEvents(filter?: {
    userId?: string;
    type?: AuditEventType;
    severity?: AuditSeverity;
    startDate?: Date;
    endDate?: Date;
    result?: 'success' | 'failure';
  }): AuditEvent[] {
    let filtered = this.events;

    if (filter) {
      if (filter.userId) {
        filtered = filtered.filter(e => e.userId === filter.userId);
      }
      if (filter.type) {
        filtered = filtered.filter(e => e.type === filter.type);
      }
      if (filter.severity) {
        filtered = filtered.filter(e => e.severity === filter.severity);
      }
      if (filter.startDate) {
        filtered = filtered.filter(e => e.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filtered = filtered.filter(e => e.timestamp <= filter.endDate!);
      }
      if (filter.result) {
        filtered = filtered.filter(e => e.result === filter.result);
      }
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getEventById(id: string): AuditEvent | undefined {
    return this.events.find(e => e.id === id);
  }

  getUserActivity(userId: string, days: number = 30): AuditEvent[] {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.getEvents({
      userId,
      startDate,
    });
  }

  getSecurityEvents(days: number = 7): AuditEvent[] {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return this.getEvents({
      startDate,
    }).filter(e => 
      e.type.startsWith('security.') || 
      e.severity === AuditSeverity.CRITICAL ||
      e.result === 'failure'
    );
  }

  generateComplianceReport(startDate: Date, endDate: Date): {
    totalEvents: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
    byResult: Record<string, number>;
    securityEvents: number;
    dataAccessEvents: number;
    failedAttempts: number;
  } {
    const events = this.getEvents({ startDate, endDate });

    const byType: Record<string, number> = {};
    const bySeverity: Record<string, number> = {};
    const byResult: Record<string, number> = {};

    events.forEach(event => {
      byType[event.type] = (byType[event.type] || 0) + 1;
      bySeverity[event.severity] = (bySeverity[event.severity] || 0) + 1;
      byResult[event.result] = (byResult[event.result] || 0) + 1;
    });

    return {
      totalEvents: events.length,
      byType,
      bySeverity,
      byResult,
      securityEvents: events.filter(e => e.type.startsWith('security.')).length,
      dataAccessEvents: events.filter(e => e.type === AuditEventType.DATA_ACCESS).length,
      failedAttempts: events.filter(e => e.result === 'failure').length,
    };
  }

  cleanup(): void {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.retentionDays);

    this.events = this.events.filter(e => e.timestamp >= cutoffDate);
    console.log(`[AUDIT] Cleaned up events older than ${this.retentionDays} days`);
  }

  exportEvents(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['id', 'timestamp', 'type', 'severity', 'userId', 'action', 'result'];
      const rows = this.events.map(e => [
        e.id,
        e.timestamp.toISOString(),
        e.type,
        e.severity,
        e.userId || '',
        e.action,
        e.result,
      ]);
      
      return [headers, ...rows].map(row => row.join(',')).join('\n');
    }

    return JSON.stringify(this.events, null, 2);
  }
}

export const advancedAudit = new AdvancedAuditLogger();

setInterval(() => {
  advancedAudit.cleanup();
}, 24 * 60 * 60 * 1000);
