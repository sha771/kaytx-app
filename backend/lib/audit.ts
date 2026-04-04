import { nanoid } from 'nanoid';
import { AuditLog } from '../db/schema';
import { db } from '../db/in-memory-store';

export function logAudit(params: {
  userId?: string;
  organizationId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  status: 'success' | 'failure';
}): void {
  const log: AuditLog = {
    id: nanoid(),
    userId: params.userId,
    organizationId: params.organizationId,
    action: params.action,
    resource: params.resource,
    resourceId: params.resourceId,
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    metadata: params.metadata,
    status: params.status,
    timestamp: Date.now(),
  };

  db.addAuditLog(log);

  console.log('[AUDIT]', {
    action: log.action,
    resource: log.resource,
    userId: log.userId,
    status: log.status,
    timestamp: new Date(log.timestamp).toISOString(),
  });
}

export function getAuditLogs(filters: {
  userId?: string;
  organizationId?: string;
  action?: string;
  startDate?: number;
  endDate?: number;
  limit?: number;
}): AuditLog[] {
  return db.getAuditLogs(filters);
}

export const AuditActions = {
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_REGISTER: 'user.register',
  USER_UPDATE: 'user.update',
  USER_DELETE: 'user.delete',
  USER_PASSWORD_CHANGE: 'user.password_change',
  USER_PASSWORD_RESET: 'user.password_reset',
  USER_EMAIL_VERIFY: 'user.email_verify',
  USER_2FA_ENABLE: 'user.2fa_enable',
  USER_2FA_DISABLE: 'user.2fa_disable',
  SESSION_CREATE: 'session.create',
  SESSION_REFRESH: 'session.refresh',
  SESSION_REVOKE: 'session.revoke',
  ORG_CREATE: 'organization.create',
  ORG_UPDATE: 'organization.update',
  ORG_DELETE: 'organization.delete',
  DATA_EXPORT: 'data.export',
  DATA_DELETE: 'data.delete',
  BACKUP_CREATE: 'backup.create',
  BACKUP_RESTORE: 'backup.restore',
  SETTINGS_UPDATE: 'settings.update',
  PERMISSION_GRANT: 'permission.grant',
  PERMISSION_REVOKE: 'permission.revoke',
} as const;
