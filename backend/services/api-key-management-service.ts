import { db as pgDb } from '../db/connection';
import { apiKeys, organizations, users } from '../db/drizzle-schema';
import { eq, and, desc, gt, lt, or, ilike, sql, count, gte, lte, between } from 'drizzle-orm';
import { EventEmitter } from 'events';
import crypto from 'crypto';
import { logAudit } from '../lib/audit';
import { config } from '../lib/config';

export interface ApiKey {
  id: string;
  organizationId: string;
  userId: string;
  name: string;
  key: string;
  hashedKey: string;
  permissions: string[];
  rateLimit: number;
  expiresAt?: Date;
  lastUsedAt?: Date;
  usageCount: number;
  status: 'active' | 'inactive' | 'expired';
  createdAt: Date;
}

export interface CreateApiKeyRequest {
  name: string;
  organizationId: string;
  userId: string;
  permissions: string[];
  rateLimit?: number;
  expiresAt?: Date;
}

export interface ApiKeyUsageRecord {
  id: string;
  keyId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  ipAddress: string;
  userAgent?: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

export interface ApiKeyAuditLog {
  id: string;
  keyId: string;
  organizationId: string;
  userId?: string;
  action: 'created' | 'updated' | 'revoked' | 'rotated' | 'used' | 'failed';
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export interface ApiKeyStats {
  total: number;
  active: number;
  inactive: number;
  expired: number;
  recentlyUsed: number;
  highUsage: number;
  expiringSoon: number;
  byPermission: Record<string, number>;
  usageTrend: {
    date: string;
    requests: number;
    errors: number;
  }[];
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export class ApiKeyManagementService extends EventEmitter {
  private readonly keyPrefixLength = 8;
  private readonly keyLength = 32;
  private readonly rateLimitStore = new Map<string, { count: number; resetTime: number }>();
  private readonly usageBuffer = new Map<string, any[]>();
  private readonly batchSize = 100;
  private readonly flushInterval = 60000; // 1 minute
  private flushIntervalId?: NodeJS.Timeout;
  private cleanupExpiredKeysIntervalId?: NodeJS.Timeout;
  private cleanupRateLimitStoreIntervalId?: NodeJS.Timeout;

  constructor() {
    super();
    
    // Start periodic tasks
    this.flushIntervalId = setInterval(() => this.flushUsageBuffer(), this.flushInterval);
    this.cleanupExpiredKeysIntervalId = setInterval(() => this.cleanupExpiredKeys(), 3600000); // 1 hour
    this.cleanupRateLimitStoreIntervalId = setInterval(() => this.cleanupRateLimitStore(), 300000); // 5 minutes
  }

  async createApiKey(keyData: CreateApiKeyRequest): Promise<{ apiKey: string; keyRecord: ApiKey }> {
    // Validate user exists
    const user = await pgDb.select().from(users).where(eq(users.id, keyData.userId)).limit(1);
    if (user.length === 0) {
      throw new Error('User not found');
    }

    // Validate organization exists
    const org = await pgDb.select().from(organizations).where(eq(organizations.id, keyData.organizationId)).limit(1);
    if (org.length === 0) {
      throw new Error('Organization not found');
    }

    // Check API key limit per organization
    const existingKeys = await pgDb.select({ count: count() }).from(apiKeys)
      .where(eq(apiKeys.organizationId, keyData.organizationId));
    
    const maxKeys = 100; // Default limit
    const keyCount = existingKeys[0]?.count ?? 0;
    if (keyCount >= maxKeys) {
      throw new Error('Maximum API keys limit reached');
    }

    // Generate API key
    const apiKey = this.generateApiKey();
    const hashedKey = this.hashApiKey(apiKey);

    // Validate permissions
    const validPermissions = await this.validatePermissions(keyData.permissions);

    const keyRecord: ApiKey = {
      id: crypto.randomUUID(),
      organizationId: keyData.organizationId,
      userId: keyData.userId,
      name: keyData.name,
      key: apiKey,
      hashedKey,
      permissions: validPermissions,
      rateLimit: keyData.rateLimit || 1000,
      expiresAt: keyData.expiresAt,
      lastUsedAt: undefined,
      usageCount: 0,
      status: 'active',
      createdAt: new Date(),
    };

    // Save to database
    await pgDb.insert(apiKeys).values({
      id: keyRecord.id,
      organizationId: keyRecord.organizationId,
      userId: keyRecord.userId,
      name: keyRecord.name,
      key: keyRecord.key,
      hashedKey: keyRecord.hashedKey,
      permissions: keyRecord.permissions,
      rateLimit: keyRecord.rateLimit,
      expiresAt: keyRecord.expiresAt,
      lastUsedAt: keyRecord.lastUsedAt,
      usageCount: keyRecord.usageCount,
      status: keyRecord.status,
    });

    // Log audit event
    await logAudit({
      userId: keyData.userId,
      organizationId: keyData.organizationId,
      action: 'api_key_created',
      resource: 'api_key',
      resourceId: keyRecord.id,
      details: {
        keyName: keyRecord.name,
        permissions: keyRecord.permissions,
        rateLimit: keyRecord.rateLimit,
      },
    });

    this.emit('api_key:created', { keyRecord });

    return { apiKey, keyRecord };
  }

  async validateApiKey(apiKey: string): Promise<{ valid: boolean; keyRecord?: ApiKey }> {
    const hashedKey = this.hashApiKey(apiKey);

    // Query database for key
    const keyRecords = await pgDb.select().from(apiKeys)
      .where(eq(apiKeys.hashedKey, hashedKey))
      .limit(1);

    if (keyRecords.length === 0) {
      return { valid: false };
    }

    const dbRecord = keyRecords[0];
    const keyRecord = this.mapDbRecordToApiKey(dbRecord);
    keyRecord.id = dbRecord.id; // Ensure ID is mapped correctly

    // Check if key is active
    if (keyRecord.status !== 'active') {
      return { valid: false };
    }

    // Check if key is expired
    if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
      return { valid: false };
    }

    // Update last used timestamp and usage count
    await this.updateLastUsed(keyRecord.id);

    return { valid: true, keyRecord };
  }

  async getApiKeys(organizationId: string, filters?: {
    userId?: string;
    status?: 'active' | 'inactive' | 'expired';
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'name' | 'createdAt' | 'lastUsedAt' | 'expiresAt';
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ keys: ApiKey[]; total: number }> {
    let query = pgDb.select().from(apiKeys).where(eq(apiKeys.organizationId, organizationId));

    // Apply filters
    if (filters?.userId) {
      query = query.where(eq(apiKeys.userId, filters.userId));
    }
    if (filters?.status) {
      query = query.where(eq(apiKeys.status, filters.status));
    }
    if (filters?.search) {
      query = query.where(or(
        ilike(apiKeys.name, `%${filters.search}%`),
        ilike(apiKeys.key, `%${filters.search}%`)
      ));
    }

    // Get total count
    const totalResult = await pgDb.select({ count: count() }).from(apiKeys)
      .where(eq(apiKeys.organizationId, organizationId));
    const total = totalResult[0].count;

    // Apply sorting
    const sortBy = filters?.sortBy || 'createdAt';
    const sortOrder = filters?.sortOrder || 'desc';
    const sortColumn = {
      name: apiKeys.name,
      createdAt: apiKeys.createdAt,
      lastUsedAt: apiKeys.lastUsedAt,
      expiresAt: apiKeys.expiresAt,
    }[sortBy];

    query = query.orderBy(sortOrder === 'asc' ? sortColumn : desc(sortColumn));

    // Apply pagination
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    const results = await query;
    const keys = results.map(record => this.mapDbRecordToApiKey(record));

    return { keys, total };
  }

  async getApiKeyById(organizationId: string, keyId: string): Promise<ApiKey | null> {
    const results = await pgDb.select().from(apiKeys)
      .where(and(
        eq(apiKeys.id, keyId),
        eq(apiKeys.organizationId, organizationId)
      ))
      .limit(1);

    return results.length > 0 ? this.mapDbRecordToApiKey(results[0]) : null;
  }

  async updateApiKey(organizationId: string, keyId: string, updates: Partial<ApiKey>): Promise<ApiKey | null> {
    const existingKey = await this.getApiKeyById(organizationId, keyId);
    if (!existingKey) return null;

    // Validate permissions if being updated
    let validPermissions = existingKey.permissions;
    if (updates.permissions) {
      validPermissions = await this.validatePermissions(updates.permissions);
    }

    const updatedKey: ApiKey = {
      ...existingKey,
      ...updates,
      permissions: validPermissions,
    };

    // Update database
    await pgDb.update(apiKeys)
      .set({
        name: updatedKey.name,
        permissions: updatedKey.permissions,
        rateLimit: updatedKey.rateLimit,
        expiresAt: updatedKey.expiresAt,
        status: updatedKey.status,
        key: updatedKey.key,
        hashedKey: updatedKey.hashedKey,
      })
      .where(and(
        eq(apiKeys.id, keyId),
        eq(apiKeys.organizationId, organizationId)
      ));

    // Log audit event
    await logAudit({
      organizationId,
      action: 'api_key_updated',
      resource: 'api_key',
      resourceId: keyId,
    });

    this.emit('api_key:updated', { keyRecord: updatedKey });

    return updatedKey;
  }

  async revokeApiKey(organizationId: string, keyId: string, reason?: string): Promise<boolean> {
    const keyRecord = await this.getApiKeyById(organizationId, keyId);
    if (!keyRecord) return false;

    await this.updateApiKey(organizationId, keyId, {
      status: 'inactive',
    });

    // Log audit event
    await logAudit({
      organizationId,
      action: 'api_key_revoked',
      resource: 'api_key',
      resourceId: keyId,
    });

    this.emit('api_key:revoked', { keyId, organizationId, reason });
    return true;
  }

  async rotateApiKey(organizationId: string, keyId: string): Promise<{ newApiKey: string; keyRecord: ApiKey } | null> {
    const existingKey = await this.getApiKeyById(organizationId, keyId);
    if (!existingKey) return null;

    // Generate new API key
    const newApiKey = this.generateApiKey();
    const newHashedKey = this.hashApiKey(newApiKey);

    // Update the existing key with new hash
    const updatedKey = await this.updateApiKey(organizationId, keyId, {
      key: newApiKey,
      hashedKey: newHashedKey,
    });

    if (!updatedKey) return null;

    // Log audit event
    await logAudit({
      organizationId,
      action: 'api_key_rotated',
      resource: 'api_key',
      resourceId: keyId,
    });

    this.emit('api_key:rotated', { keyId, organizationId });

    return { newApiKey, keyRecord: updatedKey };
  }

  async getApiKeyUsage(organizationId: string, keyId: string): Promise<{
    totalRequests: number;
    usageCount: number;
    lastUsedAt?: Date;
  }> {
    const keyRecord = await this.getApiKeyById(organizationId, keyId);
    if (!keyRecord) {
      return {
        totalRequests: 0,
        usageCount: 0,
      };
    }

    return {
      totalRequests: keyRecord.usageCount,
      usageCount: keyRecord.usageCount,
      lastUsedAt: keyRecord.lastUsedAt,
    };
  }

  async checkRateLimit(keyId: string, rateLimit: number): Promise<boolean> {
    const now = Date.now();
    const key = `${keyId}:${Math.floor(now / 3600000)}`; // 1-hour window
    const current = this.rateLimitStore.get(key);

    if (!current) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + 3600000 });
      return true;
    }

    if (current.count >= rateLimit) {
      return false;
    }

    current.count++;
    return true;
  }

  private generateApiKey(): string {
    const bytes = crypto.randomBytes(this.keyLength);
    return bytes.toString('hex');
  }

  private hashApiKey(apiKey: string): string {
    return crypto.createHash('sha256').update(apiKey).digest('hex');
  }

  private async updateLastUsed(keyId: string): Promise<void> {
    await pgDb.update(apiKeys)
      .set({ 
        lastUsedAt: new Date(),
        usageCount: sql`${apiKeys.usageCount} + 1`
      })
      .where(eq(apiKeys.id, keyId));
  }

  async getApiKeyStats(organizationId: string): Promise<{
    total: number;
    active: number;
    inactive: number;
    expired: number;
    recentlyUsed: number;
  }> {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const allKeys = await pgDb.select().from(apiKeys)
      .where(eq(apiKeys.organizationId, organizationId));

    return {
      total: allKeys.length,
      active: allKeys.filter(k => k.status === 'active').length,
      inactive: allKeys.filter(k => k.status === 'inactive').length,
      expired: allKeys.filter(k => k.expiresAt && k.expiresAt < now).length,
      recentlyUsed: allKeys.filter(k => k.lastUsedAt && k.lastUsedAt > thirtyDaysAgo).length,
    };
  }

  async cleanupExpiredKeys(organizationId?: string): Promise<number> {
    const now = new Date();
    let query = pgDb.update(apiKeys)
      .set({ status: 'expired' })
      .where(and(
        lt(apiKeys.expiresAt, now),
        eq(apiKeys.status, 'active')
      ));

    if (organizationId) {
      query = query.where(eq(apiKeys.organizationId, organizationId));
    }

    const result = await query;
    const cleanedCount = result.rowCount || 0;

    if (cleanedCount > 0) {
      this.emit('api_keys:cleaned_up', { organizationId, count: cleanedCount });
    }

    return cleanedCount;
  }

  async validatePermissions(permissions: string[]): Promise<string[]> {
    const validPermissions = [
      'read', 'write', 'delete', 'admin',
      'users:read', 'users:write', 'users:delete',
      'organizations:read', 'organizations:write',
      'api_keys:read', 'api_keys:write', 'api_keys:delete',
      'billing:read', 'billing:write',
      'analytics:read',
      'ai_agents:read', 'ai_agents:write',
      'campaigns:read', 'campaigns:write',
    ];

    return permissions.filter(p => validPermissions.includes(p));
  }

  private mapDbRecordToApiKey(record: any): ApiKey {
    return {
      id: record.id,
      organizationId: record.organizationId,
      userId: record.userId,
      name: record.name,
      key: record.key,
      hashedKey: record.hashedKey,
      permissions: record.permissions || [],
      rateLimit: record.rateLimit || 1000,
      expiresAt: record.expiresAt,
      lastUsedAt: record.lastUsedAt,
      usageCount: record.usageCount || 0,
      status: record.status || 'active',
      createdAt: record.createdAt,
    };
  }

  private flushUsageBuffer(): void {
    // Simplified - in a real implementation, this would flush to a usage table
    this.usageBuffer.clear();
  }

  private cleanupRateLimitStore(): void {
    const now = Date.now();
    for (const [key, data] of this.rateLimitStore.entries()) {
      if (data.resetTime < now) {
        this.rateLimitStore.delete(key);
      }
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.flushIntervalId) {
      clearInterval(this.flushIntervalId);
    }
    if (this.cleanupExpiredKeysIntervalId) {
      clearInterval(this.cleanupExpiredKeysIntervalId);
    }
    if (this.cleanupRateLimitStoreIntervalId) {
      clearInterval(this.cleanupRateLimitStoreIntervalId);
    }
    this.usageBuffer.clear();
    this.rateLimitStore.clear();
    this.removeAllListeners();
  }
}

export const apiKeyManagementService = new ApiKeyManagementService();
