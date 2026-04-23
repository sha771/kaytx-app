import { Context, Next } from 'hono';
import { createHonoRateLimitMiddleware, createSimpleHonoRateLimit, UnifiedRateLimiter, RateLimitConfig } from './unified-rate-limiting';

// Re-export the main rate limiting functionality
export {
  UnifiedRateLimiter,
  RateLimitConfig,
  RateLimitPresets,
  createRateLimiter,
  checkRateLimit,
  resetRateLimit,
  clearRateLimitStore,
  keyGenerators,
  createHonoRateLimitMiddleware,
  createSimpleHonoRateLimit,
} from './unified-rate-limiting';

// Pre-configured Hono middleware for common use cases
export const apiLimiter = createSimpleHonoRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'API rate limit exceeded. Please try again later.',
}, (c) => c.env?.CFConnectingIP || c.ip || 'unknown');

export const authLimiter = createSimpleHonoRateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  message: 'Too many authentication attempts. Please try again later.',
}, (c) => c.env?.CFConnectingIP || c.ip || 'unknown');

export const passwordResetLimiter = createSimpleHonoRateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
  message: 'Password reset limit exceeded. Please try again later.',
}, (c) => c.env?.CFConnectingIP || c.ip || 'unknown');
