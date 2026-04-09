// Web-safe stub for advanced-audit
// Prevents Node.js module bundling issues

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
}

interface AuditLogEntry {
  type: AuditEventType;
  severity: AuditSeverity;
  userId?: string;
  userEmail?: string;
  action: string;
  result: 'success' | 'failure';
  errorMessage?: string;
  timestamp: Date;
}

class WebAuditService {
  private logs: AuditLogEntry[] = [];
  private maxLogs = 100;

  log(entry: Omit<AuditLogEntry, 'timestamp'>): void {
    const fullEntry: AuditLogEntry = {
      ...entry,
      timestamp: new Date(),
    };
    this.logs.push(fullEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
    console.log('[Audit]', entry.action, entry.result);
  }

  getLogs(): AuditLogEntry[] {
    return [...this.logs];
  }

  clear(): void {
    this.logs = [];
  }
}

export const advancedAudit = new WebAuditService();
