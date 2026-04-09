import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { TRPCError } from '@trpc/server';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { checkRateLimit, RateLimitPresets } from '../../../../lib/unified-rate-limiting';
import { db as pgDb } from '../../../../db/connection';
import { auditLogs, callLogs, contacts, dataAccessLogs, dataExportRequests, messages, privacySettings, sessions, users } from '../../../../db/drizzle-schema';
import { and, desc, eq, inArray, or } from 'drizzle-orm';
import crypto from 'crypto';
import { Permission } from '../../../../lib/rbac';

const schema = z.object({
  format: z.enum(['json', 'csv', 'xml']),
  includeMessages: z.boolean(),
  includeContacts: z.boolean(),
  includeCallLogs: z.boolean(),
  includeAnalytics: z.boolean(),
});

export default permissionProcedure(Permission.PRIVACY_DATA_EXPORT)
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    const rateLimit = checkRateLimit(
      `export:${ctx.user.id}`,
      RateLimitPresets.EXPORT
    );
    
    if (!rateLimit.allowed) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'Too many export requests. Please try again later.',
      });
    }
    
    console.log('[Privacy] Creating data export request for user:', ctx.user.id);

    const id = crypto.randomUUID();

    const [me] = await pgDb.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
    if (!me) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });
    }
    if ((me as any).status === 'deleted') {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Deleted users cannot export data',
      });
    }

    const [ps] = await pgDb.select().from(privacySettings).where(eq(privacySettings.userId, ctx.user.id)).limit(1);
    const userSessionsRaw = await pgDb.select().from(sessions).where(eq(sessions.userId, ctx.user.id));
    const userSessions = userSessionsRaw.map((s) => ({
      id: s.id,
      userId: s.userId,
      expiresAt: s.expiresAt,
      refreshExpiresAt: s.refreshExpiresAt,
      ipAddress: s.ipAddress,
      userAgent: s.userAgent,
      deviceId: s.deviceId,
      lastActivityAt: s.lastActivityAt,
      createdAt: s.createdAt,
    }));

    const userAudit = await pgDb.select().from(auditLogs).where(eq(auditLogs.userId, ctx.user.id)).orderBy(desc(auditLogs.timestamp)).limit(500);

    const userMessages = input.includeMessages && me.organizationId
      ? await pgDb
          .select()
          .from(messages)
          .where(and(
            eq(messages.organizationId, me.organizationId),
            or(eq(messages.senderId, ctx.user.id), eq(messages.recipientId, ctx.user.id))
          ))
          .limit(1000)
      : [];

    const userCallLogs = input.includeCallLogs && me.organizationId
      ? await pgDb
          .select()
          .from(callLogs)
          .where(and(eq(callLogs.userId, ctx.user.id), eq(callLogs.organizationId, me.organizationId)))
          .limit(1000)
      : [];

    const userContacts = input.includeContacts && me.organizationId
      ? (() => {
          const contactIds = Array.from(
            new Set(
              userCallLogs
                .map((c: any) => c?.contactId)
                .filter((x: any) => typeof x === 'string' && x.length > 0)
            )
          ).slice(0, 2000);

          if (contactIds.length === 0) return Promise.resolve([] as any[]);

          return pgDb
            .select()
            .from(contacts)
            .where(and(eq(contacts.organizationId, me.organizationId), inArray(contacts.id, contactIds as any)))
            .limit(2000);
        })()
      : [];

    const payload = {
      generatedAt: new Date().toISOString(),
      user: me ? {
        id: me.id,
        email: me.email,
        firstName: me.firstName,
        lastName: me.lastName,
        phoneNumber: me.phoneNumber,
        role: me.role,
        status: me.status,
        organizationId: me.organizationId,
        createdAt: me.createdAt,
        updatedAt: me.updatedAt,
        lastLoginAt: me.lastLoginAt,
        lastLoginIp: me.lastLoginIp,
      } : null,
      privacySettings: ps?.settings || null,
      sessions: userSessions,
      auditLogs: userAudit,
      ...(input.includeMessages ? { messages: userMessages } : {}),
      ...(input.includeCallLogs ? { callLogs: userCallLogs } : {}),
      ...(input.includeContacts ? { contacts: userContacts } : {}),
    };

    try {
      await pgDb.insert(dataAccessLogs).values({
        id: crypto.randomUUID(),
        userId: ctx.user.id,
        accessedBy: 'self',
        accessType: 'export',
        dataType: 'user_data',
        reason: 'gdpr_export',
        ipAddress: ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown',
        success: true,
      } as any);
    } catch {
      // best-effort
    }

    await pgDb.insert(dataExportRequests).values({
      id,
      userId: ctx.user.id,
      status: 'completed',
      format: input.format,
      options: input as any,
      result: payload as any,
      completedAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    } as any);

    const exportRequest = {
      id,
      userId: ctx.user.id,
      status: 'completed' as const,
      requestedAt: Date.now(),
      completedAt: Date.now(),
      format: input.format,
      includeMessages: input.includeMessages,
      includeContacts: input.includeContacts,
      includeCallLogs: input.includeCallLogs,
      includeAnalytics: input.includeAnalytics,
    };
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.DATA_EXPORT,
      resource: 'user_data',
      resourceId: exportRequest.id,
      status: 'success',
      metadata: { format: input.format },
    });
    
    return {
      success: true,
      message: 'Data export completed.',
      exportRequest,
      estimatedTime: '0 minutes',
      data: payload,
      filename: `data_export_${ctx.user.id}_${Date.now()}.${input.format === 'json' ? 'json' : input.format}`,
      mimeType: input.format === 'json'
        ? 'application/json'
        : (input.format === 'csv' ? 'text/csv' : 'application/xml'),
    };
  });
