import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { TRPCError } from '@trpc/server';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { checkRateLimit, RateLimitPresets } from '../../../../lib/unified-rate-limiting';
import { db as pgDb } from '../../../../db/connection';
import { auditLogs, callLogs, consentRecords, dataAccessLogs, dataDeletionRequests, dataExportRequests, privacySettings, sessions, users } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { verifyPassword } from '../../../../lib/auth';
import { Permission } from '../../../../lib/rbac';

const schema = z.object({
  deleteType: z.enum(['full', 'partial']),
  dataTypes: z.array(z.string()),
  reason: z.string().optional(),
  confirmPassword: z.string(),
  allowAuditLogDeletion: z.boolean().optional(),
});

export default permissionProcedure(Permission.PRIVACY_DATA_DELETE)
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const rateLimit = checkRateLimit(
      `delete:${ctx.user.id}`,
      RateLimitPresets.STRICT
    );

    if (!rateLimit.allowed) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many deletion requests. Please try again later.',
      });
    }

    console.log('[Privacy] Creating data deletion request for user:', ctx.user.id);

    const okPassword = await verifyPassword(input.confirmPassword, (ctx.user as any).passwordHash);
    if (!okPassword) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Invalid password',
      });
    }

    const id = crypto.randomUUID();
    const now = Date.now();
    const scheduledFor = new Date(now + 30 * 24 * 60 * 60 * 1000);
    const cancellationDeadline = scheduledFor;

    await pgDb.insert(dataDeletionRequests).values({
      id,
      userId: ctx.user.id,
      status: 'processing',
      requestedAt: new Date(now),
      scheduledFor,
      deleteType: input.deleteType,
      dataTypes: input.dataTypes,
      reason: input.reason || null,
      cancellationDeadline,
    } as any);

    // Execute immediately (best-effort) for implemented data types.
    // This can be moved to a background job later; the request row provides auditability.
    const toDelete = new Set(input.dataTypes.map((x) => String(x).toLowerCase()));

    if (input.deleteType === 'full' || toDelete.has('sessions')) {
      await pgDb.delete(sessions).where(eq(sessions.userId, ctx.user.id));
    }
    if (input.deleteType === 'full' || toDelete.has('privacy_settings')) {
      await pgDb.delete(privacySettings).where(eq(privacySettings.userId, ctx.user.id));
    }
    if (input.deleteType === 'full' || toDelete.has('consents') || toDelete.has('consent_records')) {
      await pgDb.delete(consentRecords).where(eq(consentRecords.userId, ctx.user.id));
    }
    if (input.deleteType === 'full' || toDelete.has('data_access_logs')) {
      await pgDb.delete(dataAccessLogs).where(eq(dataAccessLogs.userId, ctx.user.id));
    }
    if (input.deleteType === 'full' || toDelete.has('export_requests') || toDelete.has('data_export_requests')) {
      await pgDb.delete(dataExportRequests).where(eq(dataExportRequests.userId, ctx.user.id));
    }

    const allowAuditLogDeletion = input.allowAuditLogDeletion === true;
    const shouldDeleteAuditLogs = allowAuditLogDeletion && (input.deleteType === 'full' || toDelete.has('audit_logs'));
    if (shouldDeleteAuditLogs) {
      await pgDb.delete(auditLogs).where(eq(auditLogs.userId, ctx.user.id));
    }

    if (input.deleteType === 'full' || toDelete.has('call_logs')) {
      await pgDb.delete(callLogs).where(eq(callLogs.userId, ctx.user.id));
    }

    if (input.deleteType === 'full') {
      // Soft-delete the user to preserve referential integrity.
      await pgDb.update(users).set({
        status: 'deleted',
        email: `deleted_${ctx.user.id}@deleted.local`,
        firstName: 'Deleted',
        lastName: 'User',
        phoneNumber: null,
        avatar: null,
        passwordHash: crypto.randomBytes(32).toString('hex'),
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorRecoveryCodes: [],
        updatedAt: new Date(),
      } as any).where(eq(users.id, ctx.user.id));
    }

    await pgDb.update(dataDeletionRequests).set({
      status: 'completed',
      completedAt: new Date(),
    } as any).where(eq(dataDeletionRequests.id, id));

    try {
      await pgDb.insert(dataAccessLogs).values({
        id: crypto.randomUUID(),
        userId: ctx.user.id,
        accessedBy: 'self',
        accessType: 'delete',
        dataType: input.deleteType === 'full' ? 'account' : 'user_data',
        reason: 'gdpr_delete',
        ipAddress: ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown',
        success: true,
      } as any);
    } catch {
      // best-effort
    }

    const deletionRequest = {
      id,
      userId: ctx.user.id,
      status: 'completed' as const,
      requestedAt: now,
      scheduledFor: scheduledFor.getTime(),
      deleteType: input.deleteType,
      dataTypes: input.dataTypes,
      reason: input.reason,
      cancellationDeadline: cancellationDeadline.getTime(),
      completedAt: Date.now(),
    };
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.DATA_DELETE,
      resource: 'user_data',
      resourceId: deletionRequest.id,
      status: 'success',
      metadata: {
        deleteType: input.deleteType,
        dataTypes: input.dataTypes,
      },
    });
    
    return {
      success: true,
      message: input.deleteType === 'full' 
        ? 'Account deletion completed.'
        : 'Data deletion completed.',
      deletionRequest,
      cancellationDeadline: new Date(deletionRequest.cancellationDeadline).toISOString(),
      auditLogsDeleted: shouldDeleteAuditLogs,
    };
  });
