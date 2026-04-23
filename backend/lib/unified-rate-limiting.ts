import { EventEmitter } from 'events';

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyGenerator?: (identifier: string) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  message?: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
  message?: string;
}

export interface RateLimitEntry {
  count: number;
  resetTime: number;
  firstRequest: number;
}

// Token Bucket Rate Limiting Interfaces
export interface TokenBucketConfig {
  capacity: number;        // Maximum tokens in the bucket
  refillRate: number;      // Tokens added per second
  keyGenerator?: (identifier: string) => string;
  message?: string;
}

export interface TokenBucketEntry {
  tokens: number;          // Current token count
  lastRefill: number;      // Last refill timestamp (ms)
}

export interface TokenBucketResult {
  success: boolean;
  limit: number;
  remaining: number;
  retryAfter?: number;
  message?: string;
}

export class UnifiedRateLimiter extends EventEmitter {
  private store: Map<string, RateLimitEntry> = new Map();
  private config: RateLimitConfig;
  private cleanupInterval: NodeJS.Timeout | number;

  constructor(config: RateLimitConfig) {
    super();
    this.config = {
      message: 'Too many requests, please try again later.',
      ...config,
    };

    // Set up cleanup interval to remove expired entries
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute

    // Prevent Jest from hanging on open interval handles
    if (typeof (this.cleanupInterval as any)?.unref === 'function') {
      (this.cleanupInterval as any).unref();
    }
  }

  /**
   * Check if a request is allowed
   */
  checkLimit(identifier: string): RateLimitResult {
    const key = this.config.keyGenerator 
      ? this.config.keyGenerator(identifier)
      : identifier;

    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    let entry = this.store.get(key);

    if (!entry || entry.resetTime <= now) {
      // Create new entry or reset expired entry
      entry = {
        count: 1,
        resetTime: now + this.config.windowMs,
        firstRequest: now,
      };
      this.store.set(key, entry);
      
      this.emit('request', { identifier, key, count: 1, remaining: this.config.maxRequests - 1 });
      
      return {
        success: true,
        limit: this.config.maxRequests,
        remaining: this.config.maxRequests - 1,
        resetTime: new Date(entry.resetTime),
      };
    }

    // Increment count
    entry.count++;
    this.store.set(key, entry);

    const remaining = Math.max(0, this.config.maxRequests - entry.count);
    const success = entry.count <= this.config.maxRequests;

    if (success) {
      this.emit('request', { identifier, key, count: entry.count, remaining });
    } else {
      this.emit('limit_exceeded', { identifier, key, count: entry.count, limit: this.config.maxRequests });
    }

    return {
      success,
      limit: this.config.maxRequests,
      remaining,
      resetTime: new Date(entry.resetTime),
      retryAfter: success ? undefined : Math.ceil((entry.resetTime - now) / 1000),
      message: success ? undefined : this.config.message,
    };
  }

  /**
   * Reset the rate limit for a specific identifier
   */
  resetLimit(identifier: string): boolean {
    const key = this.config.keyGenerator 
      ? this.config.keyGenerator(identifier)
      : identifier;

    const deleted = this.store.delete(key);
    if (deleted) {
      this.emit('reset', { identifier, key });
    }
    return deleted;
  }

  /**
   * Get current rate limit status without incrementing
   */
  getStatus(identifier: string): RateLimitResult | null {
    const key = this.config.keyGenerator 
      ? this.config.keyGenerator(identifier)
      : identifier;

    const entry = this.store.get(key);
    if (!entry || entry.resetTime <= Date.now()) {
      return null;
    }

    const remaining = Math.max(0, this.config.maxRequests - entry.count);
    const success = entry.count <= this.config.maxRequests;

    return {
      success,
      limit: this.config.maxRequests,
      remaining,
      resetTime: new Date(entry.resetTime),
      retryAfter: success ? undefined : Math.ceil((entry.resetTime - Date.now()) / 1000),
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.store.entries()) {
      if (entry.resetTime <= now) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => {
      this.store.delete(key);
    });

    if (keysToDelete.length > 0) {
      this.emit('cleanup', { deletedCount: keysToDelete.length });
    }
  }

  /**
   * Get statistics about the rate limiter
   */
  getStats(): {
    totalEntries: number;
    activeEntries: number;
    memoryUsage: number;
  } {
    const now = Date.now();
    let activeEntries = 0;

    for (const entry of this.store.values()) {
      if (entry.resetTime > now) {
        activeEntries++;
      }
    }

    return {
      totalEntries: this.store.size,
      activeEntries,
      memoryUsage: JSON.stringify([...this.store.entries()]).length,
    };
  }

  /**
   * Clear all rate limit entries
   */
  clear(): void {
    const count = this.store.size;
    this.store.clear();
    this.emit('clear', { deletedCount: count });
  }

  /**
   * Destroy the rate limiter and clean up resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
    this.removeAllListeners();
  }
}

/**
 * Token Bucket Rate Limiter
 * Allows burst traffic while maintaining an average rate
 * Tokens are added at a constant rate up to the bucket capacity
 */
export class TokenBucketRateLimiter extends EventEmitter {
  private buckets: Map<string, TokenBucketEntry> = new Map();
  private config: TokenBucketConfig;
  private cleanupInterval: NodeJS.Timeout | number;

  constructor(config: TokenBucketConfig) {
    super();
    this.config = {
      message: 'Rate limit exceeded. Please try again later.',
      ...config,
    };

    // Set up cleanup interval to remove stale buckets (inactive for > 1 hour)
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute

    // Prevent Jest from hanging on open interval handles
    if (typeof (this.cleanupInterval as any)?.unref === 'function') {
      (this.cleanupInterval as any).unref();
    }
  }

  /**
   * Consume tokens from the bucket
   * @param identifier - Unique identifier for the bucket
   * @param tokens - Number of tokens to consume (default: 1)
   * @returns TokenBucketResult with success status
   */
  consume(identifier: string, tokens: number = 1): TokenBucketResult {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier)
      : identifier;

    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      // Create new bucket at full capacity
      bucket = {
        tokens: this.config.capacity,
        lastRefill: now,
      };
    }

    // Refill tokens based on time elapsed
    const elapsedMs = now - bucket.lastRefill;
    const tokensToAdd = (elapsedMs / 1000) * this.config.refillRate;
    bucket.tokens = Math.min(this.config.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    // Check if we have enough tokens
    const success = bucket.tokens >= tokens;

    if (success) {
      bucket.tokens -= tokens;
      this.buckets.set(key, bucket);

      this.emit('consume', {
        identifier,
        key,
        tokens,
        remaining: Math.floor(bucket.tokens),
      });

      return {
        success: true,
        limit: this.config.capacity,
        remaining: Math.floor(bucket.tokens),
      };
    }

    // Calculate retry after time
    const tokensNeeded = tokens - bucket.tokens;
    const retryAfterMs = (tokensNeeded / this.config.refillRate) * 1000;
    const retryAfter = Math.ceil(retryAfterMs / 1000);

    this.buckets.set(key, bucket);

    this.emit('limit_exceeded', {
      identifier,
      key,
      requested: tokens,
      available: Math.floor(bucket.tokens),
      retryAfter,
    });

    return {
      success: false,
      limit: this.config.capacity,
      remaining: Math.floor(bucket.tokens),
      retryAfter,
      message: this.config.message,
    };
  }

  /**
   * Check current bucket status without consuming tokens
   * @param identifier - Unique identifier for the bucket
   * @returns Current token count and limit
   */
  getStatus(identifier: string): { tokens: number; capacity: number; full: boolean } | null {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier)
      : identifier;

    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      return {
        tokens: this.config.capacity,
        capacity: this.config.capacity,
        full: true,
      };
    }

    // Refill tokens based on time elapsed
    const elapsedMs = now - bucket.lastRefill;
    const tokensToAdd = (elapsedMs / 1000) * this.config.refillRate;
    const currentTokens = Math.min(this.config.capacity, bucket.tokens + tokensToAdd);

    return {
      tokens: Math.floor(currentTokens),
      capacity: this.config.capacity,
      full: currentTokens >= this.config.capacity,
    };
  }

  /**
   * Reset a specific bucket to full capacity
   * @param identifier - Unique identifier for the bucket
   * @returns true if bucket was reset, false if not found
   */
  resetBucket(identifier: string): boolean {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier)
      : identifier;

    const bucket = this.buckets.get(key);
    if (bucket) {
      bucket.tokens = this.config.capacity;
      bucket.lastRefill = Date.now();
      this.buckets.set(key, bucket);
      this.emit('reset', { identifier, key });
      return true;
    }
    return false;
  }

  /**
   * Manually add tokens to a bucket (for administrative purposes)
   * @param identifier - Unique identifier for the bucket
   * @param tokens - Number of tokens to add
   * @returns New token count
   */
  addTokens(identifier: string, tokens: number): number {
    const key = this.config.keyGenerator
      ? this.config.keyGenerator(identifier)
      : identifier;

    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = {
        tokens: Math.min(this.config.capacity, tokens),
        lastRefill: now,
      };
    } else {
      // Refill first based on time elapsed
      const elapsedMs = now - bucket.lastRefill;
      const tokensToAdd = (elapsedMs / 1000) * this.config.refillRate;
      bucket.tokens = Math.min(this.config.capacity, bucket.tokens + tokensToAdd + tokens);
      bucket.lastRefill = now;
    }

    this.buckets.set(key, bucket);
    this.emit('tokens_added', { identifier, key, tokens, newTotal: Math.floor(bucket.tokens) });

    return Math.floor(bucket.tokens);
  }

  /**
   * Clean up stale buckets (inactive for > 1 hour)
   */
  private cleanup(): void {
    const now = Date.now();
    const staleThreshold = 60 * 60 * 1000; // 1 hour
    const keysToDelete: string[] = [];

    for (const [key, bucket] of this.buckets.entries()) {
      if (now - bucket.lastRefill > staleThreshold) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => {
      this.buckets.delete(key);
    });

    if (keysToDelete.length > 0) {
      this.emit('cleanup', { deletedCount: keysToDelete.length });
    }
  }

  /**
   * Get statistics about the token bucket limiter
   */
  getStats(): {
    totalBuckets: number;
    averageTokens: number;
    memoryUsage: number;
  } {
    const now = Date.now();
    let totalTokens = 0;
    let activeBuckets = 0;

    for (const bucket of this.buckets.values()) {
      const elapsedMs = now - bucket.lastRefill;
      const tokensToAdd = (elapsedMs / 1000) * this.config.refillRate;
      const currentTokens = Math.min(this.config.capacity, bucket.tokens + tokensToAdd);
      totalTokens += currentTokens;
      activeBuckets++;
    }

    return {
      totalBuckets: this.buckets.size,
      averageTokens: activeBuckets > 0 ? Math.floor(totalTokens / activeBuckets) : this.config.capacity,
      memoryUsage: JSON.stringify([...this.buckets.entries()]).length,
    };
  }

  /**
   * Clear all buckets
   */
  clear(): void {
    const count = this.buckets.size;
    this.buckets.clear();
    this.emit('clear', { deletedCount: count });
  }

  /**
   * Destroy the rate limiter and clean up resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.clear();
    this.removeAllListeners();
  }
}

// Token Bucket Rate Limit presets for common use cases
export const TokenBucketPresets = {
  // Burst-friendly API limits (100 burst, 10/sec sustained)
  API_BURST: {
    capacity: 100,
    refillRate: 10,
    message: 'Rate limit exceeded. Tokens refill at 10 per second.',
  },

  // Strict burst control (10 burst, 1/sec sustained)
  STRICT_BURST: {
    capacity: 10,
    refillRate: 1,
    message: 'Too many requests. Tokens refill at 1 per second.',
  },

  // Authentication with burst (5 burst, 0.2/sec = 1 per 5 sec)
  AUTH_BURST: {
    capacity: 5,
    refillRate: 0.2,
    message: 'Too many authentication attempts. Please slow down.',
  },

  // High throughput (1000 burst, 100/sec sustained)
  HIGH_THROUGHPUT: {
    capacity: 1000,
    refillRate: 100,
    message: 'Rate limit exceeded. High throughput limit reached.',
  },

  // Webhook processing (50 burst, 5/sec sustained)
  WEBHOOK: {
    capacity: 50,
    refillRate: 5,
    message: 'Webhook rate limit exceeded. Tokens refill at 5 per second.',
  },

  // AI/LLM API calls (20 burst, 2/sec sustained)
  AI_API: {
    capacity: 20,
    refillRate: 2,
    message: 'AI API rate limit exceeded. Tokens refill at 2 per second.',
  },
};

// Create token bucket limiter instances
export const createTokenBucketLimiter = (config: TokenBucketConfig): TokenBucketRateLimiter => {
  return new TokenBucketRateLimiter(config);
};

// Pre-configured token bucket limiters
export const apiBurstLimiter = createTokenBucketLimiter(TokenBucketPresets.API_BURST);
export const strictBurstLimiter = createTokenBucketLimiter(TokenBucketPresets.STRICT_BURST);
export const authBurstLimiter = createTokenBucketLimiter(TokenBucketPresets.AUTH_BURST);
export const highThroughputLimiter = createTokenBucketLimiter(TokenBucketPresets.HIGH_THROUGHPUT);
export const webhookLimiter = createTokenBucketLimiter(TokenBucketPresets.WEBHOOK);
export const aiApiLimiter = createTokenBucketLimiter(TokenBucketPresets.AI_API);

// Hono middleware factory for token bucket
export const createTokenBucketHonoMiddleware = (
  limiter: TokenBucketRateLimiter,
  options: {
    keyGenerator?: (c: any) => string;
    onLimitExceeded?: (c: any, result: TokenBucketResult) => void;
    tokens?: number;
  } = {}
) => {
  return async (c: any, next: any) => {
    const key = options.keyGenerator
      ? options.keyGenerator(c)
      : c.env?.CFConnectingIP || c.ip || 'unknown';

    const result = limiter.consume(key, options.tokens || 1);

    // Set rate limit headers
    c.header('X-RateLimit-Limit', result.limit.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    if (result.retryAfter) {
      c.header('Retry-After', result.retryAfter.toString());
    }

    if (!result.success) {
      c.status(429);

      if (options.onLimitExceeded) {
        options.onLimitExceeded(c, result);
      }

      return c.json({
        error: 'Rate limit exceeded',
        message: result.message,
        retryAfter: result.retryAfter,
      });
    }

    await next();
  };
};

// Simple Hono middleware for token bucket
export const createSimpleTokenBucketHonoRateLimit = (
  config: TokenBucketConfig,
  keyGenerator?: (c: any) => string
) => {
  const limiter = createTokenBucketLimiter(config);
  return createTokenBucketHonoMiddleware(limiter, { keyGenerator });
};

// Rate limit presets for common use cases
export const RateLimitPresets = {
  // Strict limits for sensitive endpoints
  STRICT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Rate limit exceeded. Please try again in 15 minutes.',
  },

  // Authentication endpoints
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
    message: 'Too many authentication attempts. Please try again later.',
  },

  // API endpoints
  API: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'API rate limit exceeded. Please try again later.',
  },

  // File upload endpoints
  UPLOAD: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
    message: 'Upload limit exceeded. Please try again later.',
  },

  // Password reset
  PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    message: 'Password reset limit exceeded. Please try again later.',
  },

  // General purpose
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000,
    message: 'Rate limit exceeded. Please try again later.',
  },
};

// Create rate limiter instances
export const createRateLimiter = (config: RateLimitConfig): UnifiedRateLimiter => {
  return new UnifiedRateLimiter(config);
};

// Pre-configured limiters
export const strictLimiter = createRateLimiter(RateLimitPresets.STRICT);
export const authLimiter = createRateLimiter(RateLimitPresets.AUTH);
export const apiLimiter = createRateLimiter(RateLimitPresets.API);
export const uploadLimiter = createRateLimiter(RateLimitPresets.UPLOAD);
export const passwordResetLimiter = createRateLimiter(RateLimitPresets.PASSWORD_RESET);
export const generalLimiter = createRateLimiter(RateLimitPresets.GENERAL);

// Helper functions for common operations
const getLimiterForPreset = (preset: RateLimitConfig): UnifiedRateLimiter => {
  if (preset === RateLimitPresets.STRICT) return strictLimiter;
  if (preset === RateLimitPresets.AUTH) return authLimiter;
  if (preset === RateLimitPresets.API) return apiLimiter;
  if (preset === RateLimitPresets.UPLOAD) return uploadLimiter;
  if (preset === RateLimitPresets.PASSWORD_RESET) return passwordResetLimiter;
  if (preset === RateLimitPresets.GENERAL) return generalLimiter;

  return createRateLimiter(preset);
};

export const checkRateLimit = (
  limiterOrIdentifier: UnifiedRateLimiter | string,
  identifierOrPreset: string | RateLimitConfig
): RateLimitResult | { allowed: boolean; remaining: number; resetAt: number } => {
  // Legacy signature used by some tests: (identifier, preset)
  if (typeof limiterOrIdentifier === 'string') {
    const limiter = getLimiterForPreset(identifierOrPreset as RateLimitConfig);
    const result = limiter.checkLimit(limiterOrIdentifier);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: result.resetTime.getTime(),
    };
  }

  // Primary signature: (limiter, identifier)
  return limiterOrIdentifier.checkLimit(identifierOrPreset as string);
};

export const resetRateLimit = (
  limiterOrIdentifier: UnifiedRateLimiter | string,
  identifier?: string
): boolean => {
  if (typeof limiterOrIdentifier === 'string') {
    // Called with just an identifier, use default limiter
    return generalLimiter.resetLimit(limiterOrIdentifier);
  }
  // Called with limiter and identifier
  return limiterOrIdentifier.resetLimit(identifier!);
};

export const clearRateLimitStore = (limiter: UnifiedRateLimiter): void => {
  limiter.clear();
};

// Default key generators
export const keyGenerators = {
  // IP-based key generator
  byIP: (ip: string) => `ip:${ip}`,
  
  // User-based key generator
  byUser: (userId: string) => `user:${userId}`,
  
  // Combined IP and user key generator
  byIPAndUser: (ip: string, userId: string) => `ip:${ip}:user:${userId}`,
  
  // Endpoint-based key generator
  byEndpoint: (endpoint: string, identifier: string) => `endpoint:${endpoint}:${identifier}`,
  
  // Organization-based key generator
  byOrganization: (orgId: string) => `org:${orgId}`,
};

// Hono middleware factory
export const createHonoRateLimitMiddleware = (
  limiter: UnifiedRateLimiter,
  options: {
    keyGenerator?: (c: any) => string;
    onLimitExceeded?: (c: any, result: RateLimitResult) => void;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
  } = {}
) => {
  return async (c: any, next: any) => {
    const key = options.keyGenerator 
      ? options.keyGenerator(c)
      : c.env?.CFConnectingIP || c.ip || 'unknown';

    const result = limiter.checkLimit(key);

    // Set rate limit headers
    c.header('X-RateLimit-Limit', result.limit.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    c.header('X-RateLimit-Reset', Math.ceil(result.resetTime.getTime() / 1000).toString());

    if (!result.success) {
      c.header('Retry-After', result.retryAfter?.toString() || '60');
      c.status(429);

      if (options.onLimitExceeded) {
        options.onLimitExceeded(c, result);
      }

      return c.json({
        error: 'Rate limit exceeded',
        message: result.message,
        retryAfter: result.retryAfter,
      });
    }

    await next();
  };
};

// Simple Hono middleware for common cases
export const createSimpleHonoRateLimit = (
  config: RateLimitConfig,
  keyGenerator?: (c: any) => string
) => {
  const limiter = createRateLimiter(config);
  return createHonoRateLimitMiddleware(limiter, { keyGenerator });
};
