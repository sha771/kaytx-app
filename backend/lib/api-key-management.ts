import { db } from '../db/connection';
import { apiKeys, users } from '../db/drizzle-schema';
import { eq, and, lt } from 'drizzle-orm';
import { generateApiKey, hashApiKey, verifyApiKey } from '../lib/security-hardening';
import { logAudit, AuditActions } from '../lib/audit';
import { config } from '../lib/config';
import { logger } from '../lib/production-logger';

/**
 * API Key Management with Rotation Support
 */

export interface APIKeyInfo {
  id: string;
  name: string;
  hashedKey: string;
  organizationId: string;
  userId: string;
  status: 'active' | 'revoked' | 'expired';
  expiresAt?: Date;
  createdAt: Date;
  lastUsedAt?: Date;
  usageCount: number;
}

export interface APIKeyRotationResult {
  success: boolean;
  newKey?: string;
  oldKeyId?: string;
  error?: string;
}

/**
 * Create a new API key
 */
export async function createAPIKey(
  name: string,
  organizationId: string,
  userId: string,
  expiresInDays?: number
): Promise<{ success: boolean; apiKey?: string; keyId?: string; error?: string }> {
  try {
    const expiryDays = expiresInDays ?? 30;
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000);
    
    const key = generateApiKey();
    const hashedKey = hashApiKey(key);
    
    const [newKey] = await db
      .insert(apiKeys)
      .values({
        name,
        key,
        hashedKey,
        organizationId,
        userId,
        expiresAt,
        status: 'active',
      })
      .returning({ id: apiKeys.id });

    if (!newKey) {
      return {
        success: false,
        error: 'Failed to create API key'
      };
    }

    await logAudit({
      userId,
      action: AuditActions.API_KEY_CREATED,
      resource: 'api_keys',
      resourceId: newKey.id,
      details: { 
        keyName: name,
        expiresAt: expiresAt.toISOString()
      },
      status: 'success',
      ipAddress: 'system',
      userAgent: 'system',
    });

    return {
      success: true,
      apiKey: key,
      keyId: newKey.id
    };
  } catch (error) {
    logger.error('Failed to create API key', error instanceof Error ? error : undefined);
    return {
      success: false,
      error: 'Failed to create API key'
    };
  }
}

/**
 * Rotate an existing API key
 */
export async function rotateAPIKey(
  keyId: string,
  userId: string
): Promise<APIKeyRotationResult> {
  try {
    // Get the existing key
    const [existingKey] = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.id, keyId))
      .limit(1);

    if (!existingKey) {
      return {
        success: false,
        error: 'API key not found'
      };
    }

    if (existingKey.status !== 'active') {
      return {
        success: false,
        error: 'Cannot rotate inactive API key'
      };
    }

    // Generate new key
    const newKey = generateApiKey();
    const newHashedKey = hashApiKey(newKey);
    const newExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Start transaction
    await db.transaction(async (tx) => {
      // Invalidate old key
      await tx
        .update(apiKeys)
        .set({ status: 'revoked' })
        .where(eq(apiKeys.id, keyId));

      // Create new key
      await tx
        .insert(apiKeys)
        .values({
          name: `${existingKey.name} (rotated)`,
          key: newKey,
          hashedKey: newHashedKey,
          organizationId: existingKey.organizationId,
          userId: existingKey.userId,
          expiresAt: newExpiresAt,
          status: 'active',
        });
    });

    await logAudit({
      userId,
      action: AuditActions.API_KEY_CREATED,
      resource: 'api_keys',
      details: { 
        action: 'rotation',
        originalKeyId: keyId,
        keyName: existingKey.name
      },
      status: 'success',
      ipAddress: 'system',
      userAgent: 'system',
    });

    return {
      success: true,
      newKey,
      oldKeyId: keyId
    };
  } catch (error) {
    logger.error('Failed to rotate API key', error instanceof Error ? error : undefined);
    return {
      success: false,
      error: 'Failed to rotate API key'
    };
  }
}

/**
 * Revoke an API key
 */
export async function revokeAPIKey(
  keyId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const revoked = await db
      .update(apiKeys)
      .set({ status: 'revoked' })
      .where(and(
        eq(apiKeys.id, keyId),
        eq(apiKeys.userId, userId)
      ))
      .returning({ id: apiKeys.id });

    if (revoked.length === 0) {
      return {
        success: false,
        error: 'API key not found or access denied'
      };
    }

    await logAudit({
      userId,
      action: AuditActions.API_KEY_REVOKED,
      resource: 'api_keys',
      resourceId: keyId,
      details: { action: 'revocation' },
      status: 'success',
      ipAddress: 'system',
      userAgent: 'system',
    });

    return { success: true };
  } catch (error) {
    logger.error('Failed to revoke API key', error instanceof Error ? error : undefined);
    return {
      success: false,
      error: 'Failed to revoke API key'
    };
  }
}

/**
 * Get API keys for a user
 */
export async function getUserAPIKeys(
  userId: string,
  includeInactive: boolean = false
): Promise<APIKeyInfo[]> {
  const selection = {
    id: apiKeys.id,
    name: apiKeys.name,
    hashedKey: apiKeys.hashedKey,
    organizationId: apiKeys.organizationId,
    userId: apiKeys.userId,
    status: apiKeys.status,
    expiresAt: apiKeys.expiresAt,
    createdAt: apiKeys.createdAt,
    lastUsedAt: apiKeys.lastUsedAt,
    usageCount: apiKeys.usageCount,
  };

  if (!includeInactive) {
    return await db
      .select(selection)
      .from(apiKeys)
      .where(and(eq(apiKeys.userId, userId), eq(apiKeys.status, 'active')))
      .orderBy(apiKeys.createdAt);
  }

  return await db
    .select(selection)
    .from(apiKeys)
    .where(eq(apiKeys.userId, userId))
    .orderBy(apiKeys.createdAt);
}

/**
 * Validate and update API key usage
 */
export async function validateAndUpdateAPIKeyUsage(
  apiKey: string,
  ipAddress: string,
  userAgent: string
): Promise<{ valid: boolean; keyInfo?: APIKeyInfo }> {
  try {
    // Find the key by checking all active keys
    const keys = await db
      .select()
      .from(apiKeys)
      .where(eq(apiKeys.status, 'active'));

    let keyInfo: any = null;
    for (const key of keys) {
      if (verifyApiKey(apiKey, key.hashedKey)) {
        keyInfo = key;
        break;
      }
    }

    if (!keyInfo) {
      return { valid: false };
    }

    // Check if expired
    if (keyInfo.expiresAt && keyInfo.expiresAt < new Date()) {
      await db
        .update(apiKeys)
        .set({ status: 'expired' })
        .where(eq(apiKeys.id, keyInfo.id));
      
      return { valid: false };
    }

    // Update usage
    await db
      .update(apiKeys)
      .set({ 
        lastUsedAt: new Date(),
        usageCount: keyInfo.usageCount + 1
      })
      .where(eq(apiKeys.id, keyInfo.id));

    // Log usage
    await logAudit({
      userId: keyInfo.userId,
      action: 'api_key.used',
      resource: 'api_keys',
      resourceId: keyInfo.id,
      details: { 
        keyName: keyInfo.name,
        ipAddress,
        userAgent
      },
      status: 'success',
      ipAddress,
      userAgent,
    });

    return { valid: true, keyInfo };
  } catch (error) {
    logger.error('Failed to validate API key', error instanceof Error ? error : undefined);
    return { valid: false };
  }
}

/**
 * Clean up expired API keys
 */
export async function cleanupExpiredAPIKeys(): Promise<number> {
  const expiredDate = new Date();

  const expired = await db
    .update(apiKeys)
    .set({ status: 'expired' })
    .where(and(
      eq(apiKeys.status, 'active'),
      lt(apiKeys.expiresAt, expiredDate)
    ))
    .returning({ id: apiKeys.id });

  return expired.length;
}

/**
 * Get API key usage statistics
 */
export async function getAPIKeyStats(
  userId: string,
  keyId?: string
): Promise<{
  totalKeys: number;
  activeKeys: number;
  totalUsage: number;
  lastUsed?: Date;
}> {
  const whereClause = keyId 
    ? and(eq(apiKeys.userId, userId), eq(apiKeys.id, keyId))
    : eq(apiKeys.userId, userId);

  const keys = await db
    .select({
      status: apiKeys.status,
      usageCount: apiKeys.usageCount,
      lastUsedAt: apiKeys.lastUsedAt,
    })
    .from(apiKeys)
    .where(whereClause);

  const totalKeys = keys.length;
  const activeKeys = keys.filter(k => k.status === 'active').length;
  const totalUsage = keys.reduce((sum, k) => sum + k.usageCount, 0);
  const lastUsed = keys
    .filter(k => k.lastUsedAt)
    .sort((a, b) => b.lastUsedAt!.getTime() - a.lastUsedAt!.getTime())[0]?.lastUsedAt;

  return {
    totalKeys,
    activeKeys,
    totalUsage,
    lastUsed
  };
}
