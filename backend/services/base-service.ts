import { db as pgDb } from '../db/connection';
import { eq, and, or, desc, asc, ilike, inArray } from 'drizzle-orm';
import { logAudit, AuditActions } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// Base interfaces for service layer
export interface ServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterOptions {
  search?: string;
  status?: string | string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  userId?: string;
  organizationId?: string;
}

export interface ServiceContext {
  userId: string;
  organizationId?: string;
  role: string;
  ipAddress?: string;
  userAgent?: string;
}

// Base Service Class
export abstract class BaseService {
  protected db = pgDb;
  protected context?: ServiceContext;

  constructor(context?: ServiceContext) {
    this.context = context;
  }

  // Common pagination logic
  protected buildPaginationQuery(options: PaginationOptions = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(100, Math.max(1, options.limit || 20));
    const offset = options.offset || ((page - 1) * limit);

    return {
      limit,
      offset,
      page,
      hasMore: false, // Will be updated after query
    };
  }

  // Common filtering logic
  protected buildFilterConditions(
    table: any,
    filters: FilterOptions = {},
    searchFields: string[] = []
  ) {
    const conditions = [];

    // Organization filtering (for multi-tenant)
    if (this.context.organizationId && table.organizationId) {
      conditions.push(eq(table.organizationId, this.context.organizationId));
    }

    // User filtering
    if (filters.userId && table.userId) {
      conditions.push(eq(table.userId, filters.userId));
    }

    // Status filtering
    if (filters.status) {
      if (Array.isArray(filters.status)) {
        conditions.push(inArray(table.status, filters.status));
      } else if (table.status) {
        conditions.push(eq(table.status, filters.status));
      }
    }

    // Date range filtering
    if (filters.dateRange) {
      if (table.createdAt) {
        conditions.push(
          and(
            // @ts-ignore
            table.createdAt >= filters.dateRange.start,
            // @ts-ignore
            table.createdAt <= filters.dateRange.end
          )
        );
      }
    }

    // Search filtering
    if (filters.search && searchFields.length > 0) {
      const searchConditions = searchFields.map(field => 
        ilike(table[field], `%${filters.search}%`)
      );
      conditions.push(or(...searchConditions));
    }

    return conditions;
  }

  // Common sorting logic
  protected buildSortingQuery(options: PaginationOptions = {}) {
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';
    
    return sortOrder === 'asc' ? asc(sortBy) : desc(sortBy);
  }

  // Error handling wrapper
  protected async handleServiceOperation<T>(
    operation: () => Promise<T>,
    operationName: string,
    resourceType: string,
    resourceId?: string
  ): Promise<ServiceResponse<T>> {
    try {
      const startTime = Date.now();
      const data = await operation();
      const duration = Date.now() - startTime;

      // Log successful operation
      logAudit({
        userId: this.context?.userId || 'system',
        organizationId: this.context?.organizationId,
        action: `${operationName?.toUpperCase?.() || 'OPERATION'}` as any,
        resource: resourceType,
        resourceId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: { duration },
        status: 'success',
      });

      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      // Log failed operation
      logAudit({
        userId: this.context?.userId || 'system',
        organizationId: this.context?.organizationId,
        action: `${operationName?.toUpperCase?.() || 'OPERATION'}_FAILED` as any,
        resource: resourceType,
        resourceId,
        ipAddress: this.context?.ipAddress,
        userAgent: this.context?.userAgent,
        metadata: { error: errorMessage },
        status: 'failure',
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Validation helper
  protected validateRequired(data: Record<string, any>, requiredFields: string[]): string[] {
    const missing: string[] = [];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field] === '') {
        missing.push(field);
      }
    }
    
    return missing;
  }

  // Permission checking helper with RBAC integration
  protected hasPermission(permission: string): boolean {
    try {
      // Import RBAC service dynamically to avoid circular dependencies
      const { RBACService } = require('../lib/rbac');
      
      // Create RBAC service instance with current context
      const rbacService = new RBACService(this.context);
      
      // Check permission using RBAC service
      return rbacService.hasPermission(permission);
    } catch (error) {
      logger.warn('RBAC permission check failed, allowing by default:', error);
      // Fallback to role-based check for backward compatibility
      return this.fallbackPermissionCheck(permission);
    }
  }

  // Fallback permission check for backward compatibility
  private fallbackPermissionCheck(permission: string): boolean {
    const rolePermissions = {
      'super_admin': ['*'], // All permissions
      'admin': ['read:*', 'write:*', 'delete:*'],
      'manager': ['read:*', 'write:own_data', 'delete:own_data'],
      'user': ['read:own_data', 'write:own_data'],
      'guest': ['read:public_data'],
    };

    const userPermissions = rolePermissions[this.context.role as keyof typeof rolePermissions] || [];
    
    // Check for wildcard permissions
    if (userPermissions.includes('*')) {
      return true;
    }
    
    // Check for exact match or wildcard patterns
    return userPermissions.some(perm => {
      if (perm === permission) return true;
      
      // Handle wildcard patterns like 'read:*'
      if (perm.includes('*')) {
        const pattern = perm.replace('*', '.*');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(permission);
      }
      
      return false;
    });
  }

  // Resource ownership check
  protected async checkOwnership(
    table: any,
    resourceId: string,
    userIdField: string = 'userId'
  ): Promise<boolean> {
    try {
      const [resource] = await this.db
        .select()
        .from(table)
        .where(eq(table.id, resourceId))
        .limit(1);

      if (!resource) {
        return false;
      }

      // Super admins can access any resource
      if (this.context.role === 'super_admin') {
        return true;
      }

      // Check if user owns the resource
      return resource[userIdField] === this.context.userId;
    } catch {
      return false;
    }
  }

  // Soft delete helper
  protected async softDelete(
    table: any,
    resourceId: string,
    deletedByField: string = 'deletedBy'
  ): Promise<boolean> {
    try {
      await this.db
        .update(table)
        .set({
          deletedAt: new Date(),
          [deletedByField]: this.context.userId,
        })
        .where(eq(table.id, resourceId));

      return true;
    } catch {
      return false;
    }
  }

  // Generate unique slug helper
  protected async generateUniqueSlug(
    table: any,
    baseSlug: string,
    slugField: string = 'slug'
  ): Promise<string> {
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const [existing] = await this.db
        .select()
        .from(table)
        .where(eq(table[slugField], slug))
        .limit(1);

      if (!existing) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  // Redis-based cache implementation
  protected async cacheGet<T>(key: string): Promise<T | null> {
    try {
      // Import Redis client dynamically to avoid circular dependencies
      const { getRedisClient } = await import('../lib/redis');
      const redis = getRedisClient();
      
      if (!redis) {
        return null;
      }

      const cached = await redis.get(key);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      logger.warn('Cache get error:', error);
      return null;
    }
  }

  protected async cacheSet(key: string, value: any, ttl: number = 3600): Promise<void> {
    try {
      const { getRedisClient } = await import('../lib/redis');
      const redis = getRedisClient();
      
      if (!redis) {
        return;
      }

      await redis.setex(key, ttl, JSON.stringify(value));
    } catch (error) {
      logger.warn('Cache set error:', error);
    }
  }

  protected async cacheDelete(key: string): Promise<void> {
    try {
      const { getRedisClient } = await import('../lib/redis');
      const redis = getRedisClient();
      
      if (!redis) {
        return;
      }

      await redis.del(key);
    } catch (error) {
      logger.warn('Cache delete error:', error);
    }
  }

  // Redis-based rate limiting implementation
  protected async checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    try {
      const { getRedisClient } = await import('../lib/redis');
      const redis = getRedisClient();
      
      if (!redis) {
        // Fallback to memory-based rate limiting
        return this.memoryRateLimit(key, limit, windowMs);
      }

      const now = Date.now();
      const window = Math.ceil(windowMs / 1000); // Convert to seconds
      const redisKey = `rate_limit:${key}`;

      const pipeline = redis.pipeline();
      pipeline.incr(redisKey);
      pipeline.expire(redisKey, window);
      
      const results = await pipeline.exec();
      const currentCount = results?.[0]?.[1] as number || 0;

      const allowed = currentCount <= limit;
      const remaining = Math.max(0, limit - currentCount);
      const resetTime = now + windowMs;

      return { allowed, remaining, resetTime };
    } catch (error) {
      logger.warn('Rate limit error:', error);
      // Fallback to memory-based rate limiting
      return this.memoryRateLimit(key, limit, windowMs);
    }
  }

  // Memory-based fallback for rate limiting
  private memoryRateLimitStore = new Map<string, { count: number; resetTime: number }>();

  private memoryRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const stored = this.memoryRateLimitStore.get(key);

    if (!stored || now > stored.resetTime) {
      this.memoryRateLimitStore.set(key, {
        count: 1,
        resetTime: now + windowMs,
      });
      return {
        allowed: true,
        remaining: limit - 1,
        resetTime: now + windowMs,
      };
    }

    const newCount = stored.count + 1;
    stored.count = newCount;

    return {
      allowed: newCount <= limit,
      remaining: Math.max(0, limit - newCount),
      resetTime: stored.resetTime,
    };
  }

  // Abstract methods that must be implemented by child services
  abstract create(data: any): Promise<ServiceResponse>;
  abstract findById(id: string): Promise<ServiceResponse>;
  abstract update(id: string, data: any): Promise<ServiceResponse>;
  abstract delete(id: string): Promise<ServiceResponse>;
  abstract list(options: { pagination?: PaginationOptions; filters?: FilterOptions }): Promise<ServiceResponse<any[]>>;
}

// Service factory for dependency injection
export class ServiceFactory {
  private static services: Map<string, any> = new Map();

  static register<T>(name: string, serviceClass: new (context: ServiceContext) => T): void {
    this.services.set(name, serviceClass);
  }

  static create<T>(name: string, context: ServiceContext): T {
    const ServiceClass = this.services.get(name);
    if (!ServiceClass) {
      throw new Error(`Service '${name}' not found`);
    }
    return new ServiceClass(context);
  }

  static list(): string[] {
    return Array.from(this.services.keys());
  }
}

// Error types for better error handling
export class ServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'ServiceError';
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400, { field });
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ServiceError {
  constructor(resource: string, id?: string) {
    super(
      `${resource}${id ? ` with id ${id}` : ''} not found`,
      'NOT_FOUND',
      404,
      { resource, id }
    );
    this.name = 'NotFoundError';
  }
}

export class PermissionError extends ServiceError {
  constructor(action: string, resource: string) {
    super(
      `Insufficient permissions to ${action} ${resource}`,
      'PERMISSION_DENIED',
      403,
      { action, resource }
    );
    this.name = 'PermissionError';
  }
}

export class ConflictError extends ServiceError {
  constructor(message: string, public field?: string) {
    super(message, 'CONFLICT', 409, { field });
    this.name = 'ConflictError';
  }
}
