/**
 * ✅ ENTERPRISE AUDIT LOGGING MIDDLEWARE
 * Comprehensive action tracking for compliance and security
 */

import crypto from 'crypto';

import { db } from '../db/connection';
import { auditLogs } from '../db/drizzle-schema';
import { logger } from '../lib/production-logger';

export interface AuditContext {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, any>;
  status: 'success' | 'failure';
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export async function logAuditEvent(context: AuditContext): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      id: crypto.randomUUID(),
      userId: context.userId,
      organizationId: (context.metadata as any)?.organizationId,
      action: context.action,
      resource: context.resource,
      resourceId: context.resourceId,
      changes: context.changes || null,
      status: context.status,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
      metadata: context.metadata || {},
    });
  } catch (error) {
    logger.error('Failed to log audit event:', error as Error);
    // Don't throw - audit logging failure shouldn't break main operation
  }
}

/**
 * Audit logging decorator for tRPC procedures
 */
export function auditLog(action: string, resource: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const context = args[0];
      const result = await originalMethod.apply(this, args);

      await logAuditEvent({
        userId: context.userId,
        action,
        resource,
        resourceId: result?.id || 'N/A',
        status: 'success',
        metadata: result,
      });

      return result;
    };

    return descriptor;
  };
}
