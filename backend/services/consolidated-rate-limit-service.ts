import { Context } from 'hono';
import { 
  UnifiedRateLimiter, 
  RateLimitConfig, 
  TokenBucketRateLimiter, 
  TokenBucketConfig,
  TokenBucketPresets,
  createTokenBucketLimiter,
  createTokenBucketHonoMiddleware,
  createSimpleTokenBucketHonoRateLimit,
  apiBurstLimiter,
  strictBurstLimiter,
  authBurstLimiter,
  highThroughputLimiter,
  webhookLimiter,
  aiApiLimiter
} from '../lib/unified-rate-limiting';

// Rate limit presets for different use cases
export const RateLimitPresets = {
  // Strict limits for sensitive endpoints
  strict: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5,
    message: 'Too many requests. Please try again later.'
  },
  
  // Standard limits for general API usage
  standard: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'Rate limit exceeded. Please try again later.'
  },
  
  // Lenient limits for high-volume endpoints
  lenient: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000,
    message: 'Rate limit exceeded. Please try again later.'
  },
  
  // Authentication endpoints
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 10,
    message: 'Too many authentication attempts. Please try again later.'
  },
  
  // Password reset endpoints
  passwordReset: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
    message: 'Too many password reset attempts. Please try again later.'
  }
};

// Rate limiter instances for different presets
const rateLimiters = new Map<string, UnifiedRateLimiter>();

function getRateLimiter(preset: keyof typeof RateLimitPresets | RateLimitConfig): UnifiedRateLimiter {
  const key = typeof preset === 'string' ? preset : JSON.stringify(preset);
  
  if (!rateLimiters.has(key)) {
    const config = typeof preset === 'string' ? RateLimitPresets[preset] : preset;
    const limiter = new UnifiedRateLimiter(config);
    rateLimiters.set(key, limiter);
  }
  
  return rateLimiters.get(key)!;
}

/**
 * Rate limiting middleware for Hono
 */
export function rateLimitMiddleware(preset: keyof typeof RateLimitPresets | RateLimitConfig = 'standard'): (c: Context, next: () => Promise<void>) => Promise<void | Response> {
  const limiter = getRateLimiter(preset);
  
  return async (c: Context, next: () => Promise<void>) => {
    // Get identifier from request
    const identifier = getIdentifier(c);
    
    // Check rate limit
    const result = await limiter.checkLimit(identifier);
    
    // Set rate limit headers
    c.header('X-RateLimit-Limit', result.limit.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    c.header('X-RateLimit-Reset', Math.ceil(result.resetTime.getTime() / 1000).toString());
    
    if (!result.success) {
      c.header('Retry-After', (result.retryAfter || 60).toString());
      return c.json(
        { 
          error: result.message || 'Rate limit exceeded',
          retryAfter: result.retryAfter
        },
        429
      );
    }
    
    await next();
    return;
  };
}

/**
 * Get identifier for rate limiting from request context
 */
function getIdentifier(c: Context): string {
  // Try to get user ID from auth context
  const userId = c.get('userId');
  if (typeof userId === 'string' && userId.length > 0 && /^[a-zA-Z0-9_-]+$/.test(userId)) {
    return `user:${userId}`;
  }
  
  // Fall back to IP address with proper validation
  let ip = c.req.header('x-forwarded-for') || 
           c.req.header('x-real-ip') || 
           '127.0.0.1';
  
  // Sanitize IP address to prevent injection
  ip = sanitizeIpAddress(ip);
  
  return `ip:${ip}`;
}

/**
 * Sanitize IP address to prevent injection attacks
 */
function sanitizeIpAddress(ip: string): string {
  if (typeof ip !== 'string') {
    return '127.0.0.1';
  }
  
  // Handle X-Forwarded-For which may contain multiple IPs
  const firstIp = ip.split(',')[0].trim();
  
  // Validate IPv4 format
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (ipv4Regex.test(firstIp)) {
    return firstIp;
  }
  
  // Validate IPv6 format (simplified check)
  const ipv6Regex = /^[0-9a-fA-F:]+$/;
  if (ipv6Regex.test(firstIp) && firstIp.includes(':')) {
    return firstIp.substring(0, 39); // Limit IPv6 length
  }
  
  // Default to localhost if invalid
  return '127.0.0.1';
}

/**
 * Check rate limit without middleware
 */
export async function checkRateLimit(
  identifier: string,
  preset: keyof typeof RateLimitPresets | RateLimitConfig = 'standard'
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}> {
  const limiter = getRateLimiter(preset);
  return await limiter.checkLimit(identifier);
}

/**
 * Reset rate limit for a specific identifier
 */
export async function resetRateLimit(
  identifier: string,
  preset: keyof typeof RateLimitPresets | RateLimitConfig = 'standard'
): Promise<void> {
  const limiter = getRateLimiter(preset);
  limiter.resetLimit(identifier);
}

/**
 * Get rate limit statistics
 */
export function getRateLimitStats(
  preset: keyof typeof RateLimitPresets | RateLimitConfig = 'standard'
): {
  totalEntries: number;
  activeEntries: number;
} {
  const limiter = getRateLimiter(preset);
  return limiter.getStats();
}

/**
 * API rate limiter middleware
 */
export async function apiLimiter(c: any, next: any) {
  return rateLimitMiddleware('standard')(c, next);
}

/**
 * Auth rate limiter middleware
 */
export async function authLimiter(c: any, next: any) {
  return rateLimitMiddleware('strict')(c, next);
}

export default {
  RateLimitPresets,
  rateLimitMiddleware,
  checkRateLimit,
  resetRateLimit,
  getRateLimitStats
};

// Token Bucket Rate Limiter instances cache
const tokenBucketLimiters = new Map<string, TokenBucketRateLimiter>();

function getTokenBucketLimiter(preset: keyof typeof TokenBucketPresets | TokenBucketConfig): TokenBucketRateLimiter {
  const key = typeof preset === 'string' ? preset : JSON.stringify(preset);
  
  if (!tokenBucketLimiters.has(key)) {
    const config = typeof preset === 'string' ? TokenBucketPresets[preset] : preset;
    const limiter = new TokenBucketRateLimiter(config);
    tokenBucketLimiters.set(key, limiter);
  }
  
  return tokenBucketLimiters.get(key)!;
}

/**
 * Token bucket rate limiting middleware for Hono
 * Allows burst traffic while maintaining average rate
 */
export function tokenBucketRateLimitMiddleware(
  preset: keyof typeof TokenBucketPresets | TokenBucketConfig = 'API_BURST',
  tokens: number = 1
): (c: Context, next: () => Promise<void>) => Promise<void | Response> {
  const limiter = getTokenBucketLimiter(preset);
  
  return async (c: Context, next: () => Promise<void>) => {
    // Get identifier from request
    const identifier = getIdentifier(c);
    
    // Consume tokens
    const result = limiter.consume(identifier, tokens);
    
    // Set rate limit headers
    c.header('X-RateLimit-Limit', result.limit.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    if (result.retryAfter) {
      c.header('Retry-After', result.retryAfter.toString());
    }
    
    if (!result.success) {
      return c.json(
        { 
          error: result.message || 'Rate limit exceeded',
          retryAfter: result.retryAfter
        },
        429
      );
    }
    
    await next();
    return;
  };
}

/**
 * Check token bucket rate limit without middleware
 */
export async function checkTokenBucketRateLimit(
  identifier: string,
  preset: keyof typeof TokenBucketPresets | TokenBucketConfig = 'API_BURST',
  tokens: number = 1
): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  retryAfter?: number;
}> {
  const limiter = getTokenBucketLimiter(preset);
  return limiter.consume(identifier, tokens);
}

/**
 * Get token bucket status without consuming tokens
 */
export function getTokenBucketStatus(
  identifier: string,
  preset: keyof typeof TokenBucketPresets | TokenBucketConfig = 'API_BURST'
): { tokens: number; capacity: number; full: boolean } | null {
  const limiter = getTokenBucketLimiter(preset);
  return limiter.getStatus(identifier);
}

/**
 * Reset token bucket for a specific identifier
 */
export function resetTokenBucket(
  identifier: string,
  preset: keyof typeof TokenBucketPresets | TokenBucketConfig = 'API_BURST'
): boolean {
  const limiter = getTokenBucketLimiter(preset);
  return limiter.resetBucket(identifier);
}

/**
 * Add tokens to a bucket (administrative function)
 */
export function addTokensToBucket(
  identifier: string,
  tokens: number,
  preset: keyof typeof TokenBucketPresets | TokenBucketConfig = 'API_BURST'
): number {
  const limiter = getTokenBucketLimiter(preset);
  return limiter.addTokens(identifier, tokens);
}

/**
 * Get token bucket rate limit statistics
 */
export function getTokenBucketStats(
  preset: keyof typeof TokenBucketPresets | TokenBucketConfig = 'API_BURST'
): {
  totalBuckets: number;
  averageTokens: number;
} {
  const limiter = getTokenBucketLimiter(preset);
  const stats = limiter.getStats();
  return {
    totalBuckets: stats.totalBuckets,
    averageTokens: stats.averageTokens,
  };
}

/**
 * API burst limiter middleware (100 burst, 10/sec sustained)
 */
export async function apiBurstRateLimiter(c: any, next: any) {
  return tokenBucketRateLimitMiddleware('API_BURST')(c, next);
}

/**
 * Auth burst limiter middleware (5 burst, 0.2/sec sustained)
 */
export async function authBurstRateLimiter(c: any, next: any) {
  return tokenBucketRateLimitMiddleware('AUTH_BURST')(c, next);
}

/**
 * AI API burst limiter middleware (20 burst, 2/sec sustained)
 */
export async function aiApiRateLimiter(c: any, next: any) {
  return tokenBucketRateLimitMiddleware('AI_API')(c, next);
}

/**
 * Webhook burst limiter middleware (50 burst, 5/sec sustained)
 */
export async function webhookRateLimiter(c: any, next: any) {
  return tokenBucketRateLimitMiddleware('WEBHOOK')(c, next);
}

// Re-export token bucket types and presets
export { TokenBucketConfig, TokenBucketPresets, TokenBucketRateLimiter };
