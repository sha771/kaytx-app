import { permissionProcedure } from '../../../create-context';
import { z } from 'zod';
import { db } from '../../../../db/connection';
import { apiKeys } from '../../../../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';
import { Permission } from '../../../../lib/rbac';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { generateApiKey, hashApiKey } from '../../../../lib/security-hardening';
import { config } from '../../../../lib/config';
import crypto from 'crypto';

function toPublicApiKey(row: any) {
  if (!row) return row;
  const { hashedKey, ...rest } = row;
  return rest;
}

export const getApiKeysProcedure = permissionProcedure(Permission.API_KEY_READ).query(async ({ ctx }) => {
  // 1. Fetch real keys from PostgreSQL
  try {
    const organizationId = ctx.user.organizationId;
    if (!organizationId) {
      return [];
    }
    const keys = await db.select().from(apiKeys).where(eq(apiKeys.organizationId, organizationId));
    return keys.map(toPublicApiKey);
  } catch (e: any) {
    console.warn('[API-KEYS] PostgreSQL Fetch failed:', e.message);
    return [];
  }
});

export const createApiKeyProcedure = permissionProcedure(Permission.API_KEY_CREATE)
  .input(
    z.object({
      name: z.string(),
      permissions: z.array(z.string()),
      rateLimit: z.number().optional().default(1000),
      expiresAt: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const organizationId = ctx.user.organizationId;
      if (!organizationId) {
        return { success: false, error: 'Missing organizationId' };
      }

      const rawKey = generateApiKey();
      const hashedKey = hashApiKey(rawKey);

      // Do not store the raw key at rest. Store a non-secret identifier in `key`.
      const keyId = `key_${crypto.randomBytes(12).toString('hex')}`;

      const expiresAt = input.expiresAt ? new Date(input.expiresAt) : new Date(Date.now() + config.security.apiKeyDefaultExpiryDays * 24 * 60 * 60 * 1000);

      const [created] = await db
        .insert(apiKeys)
        .values({
          organizationId,
          userId: ctx.user.id,
          name: input.name,
          key: keyId,
          hashedKey,
          permissions: input.permissions,
          rateLimit: input.rateLimit,
          expiresAt,
          status: 'active',
          createdAt: new Date(),
        } as any)
        .returning();

      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.API_KEY_CREATED,
        resource: 'api_key',
        resourceId: created?.id,
        ipAddress: ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown',
        status: 'success',
      });

      return {
        success: true,
        apiKey: rawKey,
        record: toPublicApiKey(created),
      };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

export const rotateApiKeyProcedure = permissionProcedure(Permission.API_KEY_CREATE)
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const organizationId = ctx.user.organizationId;
      if (!organizationId) {
        return { success: false, error: 'Missing organizationId' };
      }

      // Fetch existing key
      const [existing] = await db
        .select()
        .from(apiKeys)
        .where(and(eq(apiKeys.id, input.id as any), eq(apiKeys.organizationId, organizationId)))
        .limit(1);

      if (!existing) {
        return { success: false, error: 'API key not found' };
      }

      // Create new key
      const rawKey = generateApiKey();
      const hashedKey = hashApiKey(rawKey);
      const keyId = `key_${crypto.randomBytes(12).toString('hex')}`;

      const now = new Date();
      const expiresAt = (existing as any).expiresAt ? new Date((existing as any).expiresAt) : new Date(now.getTime() + config.security.apiKeyDefaultExpiryDays * 24 * 60 * 60 * 1000);

      const [newKeyRecord] = await db
        .insert(apiKeys)
        .values({
          organizationId,
          userId: ctx.user.id,
          name: `${(existing as any).name} (rotated)`,
          key: keyId,
          hashedKey,
          permissions: (existing as any).permissions,
          rateLimit: (existing as any).rateLimit,
          expiresAt,
          status: 'active',
          createdAt: now,
        } as any)
        .returning();

      // Revoke old key
      await db
        .update(apiKeys)
        .set({ status: 'revoked' } as any)
        .where(and(eq(apiKeys.id, input.id as any), eq(apiKeys.organizationId, organizationId)));

      logAudit({
        userId: ctx.user.id,
        organizationId,
        action: AuditActions.API_KEY_ROTATED,
        resource: 'api_key',
        resourceId: input.id,
        ipAddress: ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown',
        status: 'success',
      });

      return {
        success: true,
        apiKey: rawKey,
        record: toPublicApiKey(newKeyRecord),
      };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  });

export const revokeApiKeyProcedure = permissionProcedure(Permission.API_KEY_DELETE)
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Revoking API key:', input.id);

    const organizationId = ctx.user.organizationId;
    if (!organizationId) {
      throw new Error('Organization context required');
    }

    const [existing] = await db
      .select({ id: apiKeys.id })
      .from(apiKeys)
      .where(and(eq(apiKeys.id, input.id as any), eq(apiKeys.organizationId, organizationId)))
      .limit(1);

    if (!existing) {
      return { success: false, message: 'API key not found' };
    }

    await db
      .update(apiKeys)
      .set({ status: 'revoked' } as any)
      .where(and(eq(apiKeys.id, input.id as any), eq(apiKeys.organizationId, organizationId)));

    logAudit({
      userId: ctx.user.id,
      organizationId,
      action: AuditActions.API_KEY_REVOKED,
      resource: 'api_key',
      resourceId: input.id,
      status: 'success',
    });

    return {
      success: true,
      message: 'API key revoked successfully',
    };
  });
