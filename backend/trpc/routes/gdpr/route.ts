import crypto from 'crypto';
import { z } from 'zod';
import { permissionProcedure } from '../../create-context';
import { db as pgDb } from '../../../db/connection';
import { users, aiConversations, auditLogs, dataExportRequests, dataDeletionRequests } from '../../../db/drizzle-schema';
import { eq, desc } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../lib/audit';
import { verifyPassword } from '../../../lib/auth';
import { Permission } from '../../../lib/rbac';

const exportDataRequestSchema = z.object({
  format: z.enum(['json', 'csv']).default('json'),
});

const deleteDataRequestSchema = z.object({
  password: z.string().min(1),
});

const confirmDeletionRequestSchema = z.object({
  requestId: z.string().uuid(),
});

export const exportUserDataProcedure = permissionProcedure(Permission.PRIVACY_DATA_EXPORT)
  .input(exportDataRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    const userData = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      role: user.role,
      organizationId: user.organizationId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      emailVerified: user.emailVerified,
      twoFactorEnabled: user.twoFactorEnabled,
    };

    const conversations = user.organizationId
      ? await pgDb
        .select({
          id: aiConversations.id,
          agentId: aiConversations.agentId,
          type: aiConversations.type,
          status: aiConversations.status,
          createdAt: aiConversations.createdAt,
          updatedAt: aiConversations.updatedAt,
        })
        .from(aiConversations)
        .where(eq(aiConversations.organizationId, user.organizationId))
      : [];

    const auditData = await pgDb
      .select({
        id: auditLogs.id,
        action: auditLogs.action,
        resource: auditLogs.resource,
        resourceId: auditLogs.resourceId,
        status: auditLogs.status,
        timestamp: auditLogs.timestamp,
        metadata: auditLogs.metadata,
      })
      .from(auditLogs)
      .where(eq(auditLogs.userId, userId))
      .orderBy(desc(auditLogs.timestamp))
      .limit(1000);

    const exportData = {
      user: userData,
      conversations,
      auditLogs: auditData,
      exportedAt: new Date().toISOString(),
      requestId: crypto.randomUUID(),
    };

    await pgDb.insert(dataExportRequests).values({
      id: crypto.randomUUID(),
      userId,
      status: 'completed',
      requestedAt: new Date(),
      completedAt: new Date(),
      format: input.format,
      options: { format: input.format },
      result: exportData,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    } as any);

    logAudit({
      userId,
      action: AuditActions.DATA_EXPORT,
      resource: 'user',
      resourceId: userId,
      ipAddress,
      status: 'success',
    });

    if (input.format === 'csv') {
      const csvData = convertToCSV(exportData);
      return {
        data: csvData,
        filename: `user_export_${userId}_${Date.now()}.csv`,
        mimeType: 'text/csv',
      };
    }

    return {
      data: exportData,
      filename: `user_export_${userId}_${Date.now()}.json`,
      mimeType: 'application/json',
    };
  });

export const requestUserDataDeletionProcedure = permissionProcedure(Permission.PRIVACY_DATA_DELETE)
  .input(deleteDataRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const [user] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
      throw new Error('User not found');
    }

    const okPassword = await verifyPassword(input.password, (user as any).passwordHash);
    if (!okPassword) {
      logAudit({
        userId,
        action: AuditActions.DATA_DELETE,
        resource: 'user',
        resourceId: userId,
        ipAddress,
        status: 'failure',
        metadata: { reason: 'invalid_password' },
      });
      throw new Error('Invalid password');
    }

    const requestId = crypto.randomUUID();
    const now = Date.now();
    const scheduledFor = new Date(now + 30 * 24 * 60 * 60 * 1000);
    const cancellationDeadline = scheduledFor;

    await pgDb.insert(dataDeletionRequests).values({
      id: requestId,
      userId,
      status: 'pending',
      requestedAt: new Date(),
      scheduledFor,
      cancellationDeadline,
      deleteType: 'full',
      dataTypes: ['profile', 'sessions', 'audit_logs', 'messages', 'call_logs'],
      reason: 'User requested account deletion',
    } as any);

    logAudit({
      userId,
      action: AuditActions.DATA_DELETE,
      resource: 'user',
      resourceId: userId,
      ipAddress,
      status: 'success',
      metadata: { step: 'deletion_requested', requestId },
    });

    return {
      message: 'Deletion request received. Please confirm using the returned requestId.',
      requestId,
    };
  });

export const confirmUserDataDeletionProcedure = permissionProcedure(Permission.PRIVACY_DATA_DELETE)
  .input(confirmDeletionRequestSchema)
  .mutation(async ({ input, ctx }) => {
    const userId = ctx.user.id;
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const [request] = await pgDb
      .select()
      .from(dataDeletionRequests)
      .where(eq(dataDeletionRequests.id, input.requestId as any))
      .limit(1);

    if (!request || request.userId !== userId) {
      throw new Error('Invalid deletion request');
    }

    if (request.status !== 'pending') {
      throw new Error('Deletion request is not pending');
    }

    await pgDb.transaction(async (tx) => {
      await tx
        .update(dataDeletionRequests)
        .set({ status: 'processing' } as any)
        .where(eq(dataDeletionRequests.id, request.id));

      await tx
        .update(users)
        .set({
          email: `deleted_${userId}@deleted.local`,
          firstName: 'Deleted',
          lastName: 'User',
          phoneNumber: null,
          status: 'deleted',
          twoFactorEnabled: false,
          twoFactorSecret: null,
          twoFactorRecoveryCodes: [],
          updatedAt: new Date(),
        } as any)
        .where(eq(users.id, userId));

      await tx
        .update(dataDeletionRequests)
        .set({ status: 'completed', completedAt: new Date() } as any)
        .where(eq(dataDeletionRequests.id, request.id));
    });

    logAudit({
      userId,
      action: AuditActions.DATA_DELETE,
      resource: 'user',
      resourceId: userId,
      ipAddress,
      status: 'success',
      metadata: { step: 'deletion_completed', requestId: request.id },
    });

    return {
      message: 'Your data deletion request has been completed.',
    };
  });

export const getPrivacyRequestsProcedure = permissionProcedure(Permission.PRIVACY_REQUESTS_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
    const userId = ctx.user.id;

    const exports = await pgDb
      .select({
        id: dataExportRequests.id,
        status: dataExportRequests.status,
        requestedAt: dataExportRequests.requestedAt,
        completedAt: dataExportRequests.completedAt,
        format: dataExportRequests.format,
      })
      .from(dataExportRequests)
      .where(eq(dataExportRequests.userId, userId))
      .orderBy(desc(dataExportRequests.requestedAt));

    const deletions = await pgDb
      .select({
        id: dataDeletionRequests.id,
        status: dataDeletionRequests.status,
        requestedAt: dataDeletionRequests.requestedAt,
        scheduledFor: dataDeletionRequests.scheduledFor,
        completedAt: dataDeletionRequests.completedAt,
      })
      .from(dataDeletionRequests)
      .where(eq(dataDeletionRequests.userId, userId))
      .orderBy(desc(dataDeletionRequests.requestedAt));

    return { exports, deletions };
  });

function convertToCSV(data: any): string {
  const flattenObject = (obj: any, prefix = ''): string[] => {
    const rows: string[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;
        
        if (value === null || value === undefined) {
          rows.push(`${newKey},`);
        } else if (typeof value === 'object' && !Array.isArray(value)) {
          rows.push(...flattenObject(value, newKey));
        } else {
          const cleanValue = String(value).replace(/"/g, '""');
          rows.push(`${newKey},"${cleanValue}"`);
        }
      }
    }
    
    return rows;
  };

  const headers = new Set<string>();
  const allRows: string[] = [];

  ['user', 'conversations', 'auditLogs'].forEach((section) => {
    if (Array.isArray(data[section])) {
      data[section].forEach((item: any) => {
        const rows = flattenObject(item);
        rows.forEach(row => {
          const key = row.split(',')[0] || '';
          headers.add(key);
        });
        allRows.push(...rows);
      });
    } else {
      const rows = flattenObject(data[section]);
      rows.forEach(row => {
        const key = row.split(',')[0] || '';
        headers.add(key);
      });
      allRows.push(...rows);
    }
  });

  const csv = [
    Array.from(headers).join(','),
    ...allRows
  ].join('\n');

  return csv;
}
