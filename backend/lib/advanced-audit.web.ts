// Web-safe version of advanced-audit for frontend use
// This stub prevents backend/Node-only code from being bundled

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
  location?: { country?: string; city?: string; latitude?: number; longitude?: number };
  sessionId?: string;
  requestId?: string;
}

class WebAuditLogger {
  private events: AuditEvent[] = [];
  private readonly maxEvents = 1000;

  log(event: Omit<AuditEvent, 'id' | 'timestamp'>): void {
    const auditEvent: AuditEvent = {
      ...event,
      id: crypto.randomUUID?.() || Math.random().toString(36).substring(2),
      timestamp: new Date(),
    };
    this.events.push(auditEvent);
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }
    // Audit event logged to in-memory store only (web stub)
  }

  logUserAction(type: AuditEventType, userId: string, action: string, result: 'success' | 'failure', metadata?: Record<string, any>): void {
    this.log({ type, severity: result === 'failure' ? AuditSeverity.WARNING : AuditSeverity.INFO, userId, action, result, metadata });
  }

  logSecurityEvent(type: AuditEventType, userId: string | undefined, action: string, severity: AuditSeverity, metadata?: Record<string, any>): void {
    this.log({ type, severity, userId, action, result: 'failure', metadata });
  }

  getEvents(Filter?: any): AuditEvent[] {
    return this.events.slice().reverse();
  }

  getEventById(id: string): AuditEvent | undefined {
    return this.events.find(e => e.id === id);
  }

  getUserActivity(userId: string, days: number = 30): AuditEvent[] {
    return this.events.filter(e => e.userId === userId);
  }

  getSecurityEvents(days: number = 7): AuditEvent[] {
    return this.events.filter(e => e.severity === AuditSeverity.CRITICAL || e.result === 'failure');
  }

  generateComplianceReport(startDate: Date, endDate: Date): any {
    return { totalEvents: this.events.length, byType: {}, bySeverity: {}, byResult: {}, securityEvents: 0, dataAccessEvents: 0, failedAttempts: 0 };
  }

  cleanup(): void {
    this.events = [];
  }

  exportEvents(format: 'json' | 'csv' = 'json'): string {
    return JSON.stringify(this.events, null, 2);
  }
}

export const advancedAudit = new WebAuditLogger();
