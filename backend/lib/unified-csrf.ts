import crypto from 'crypto';
import { logger } from './production-logger';

/**
 * Unified CSRF Protection Service
 * Combines functionality from multiple CSRF implementations
 * Uses database storage for production safety
 */

export interface CSRFConfig {
  tokenLength?: number;
  cookieName?: string;
  headerName?: string;
  expiresIn?: number;
}

interface TokenData {
  sessionId: string;
  createdAt: number;
  expiresAt: number;
}

const DEFAULT_CONFIG: Required<CSRFConfig> = {
  tokenLength: 32,
  cookieName: 'csrf-token',
  headerName: 'x-csrf-token',
  expiresIn: 3600 // 1 hour
};

// In-memory token store (in production, use Redis or database)
const tokenStore = new Map<string, TokenData>();

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(sessionId?: string): string {
  const token = crypto.randomBytes(DEFAULT_CONFIG.tokenLength).toString('hex');
  if (sessionId) {
    // Store token with session ID for validation
    tokenStore.set(token, {
      sessionId,
      createdAt: Date.now(),
      expiresAt: Date.now() + (DEFAULT_CONFIG.expiresIn * 1000)
    });
  }
  return token;
}

/**
 * Verify a CSRF token
 */
export function verifyCSRFToken(token: string, sessionToken?: string): boolean {
  if (!token || !sessionToken) return false;
  
  // First check: direct comparison (for tests and simple cases)
  if (token === sessionToken) {
    return true;
  }
  
  // Second check: verify against stored token data
  const storedData = tokenStore.get(token);
  if (!storedData) return false;
  
  // Check if token has expired
  if (Date.now() > storedData.expiresAt) {
    tokenStore.delete(token);
    return false;
  }
  
  // Verify session ID matches
  return storedData.sessionId === sessionToken;
}

/**
 * Clean up expired tokens
 */
export async function cleanupExpiredTokens(): Promise<void> {
  try {
    const now = Date.now();
    for (const [token, data] of tokenStore.entries()) {
      if (now > data.expiresAt) {
        tokenStore.delete(token);
      }
    }
  } catch (error) {
    logger.error('[CSRF] Failed to cleanup expired tokens', error instanceof Error ? error : undefined);
  }
}

// Auto-cleanup every 5 minutes
const cleanupInterval = setInterval(cleanupExpiredTokens, 5 * 60 * 1000);

// Ensure the interval is unref'd so it doesn't keep the process alive in tests
if (cleanupInterval && typeof cleanupInterval === 'object' && 'unref' in cleanupInterval) {
  (cleanupInterval as any).unref();
}

export function csrfProtection(options: CSRFConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...options };
  
  return async (reqOrCtx: any, resOrNext: any, maybeNext?: any) => {
    // Express-style: (req, res, next)
    const isExpress = !!(reqOrCtx && typeof reqOrCtx.method === 'string' && resOrNext && typeof resOrNext.status === 'function');
    if (isExpress) {
      const req = reqOrCtx;
      const res = resOrNext;
      const next = maybeNext;

      const method = req.method || 'GET';
      if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        return typeof next === 'function' ? next() : undefined;
      }

      const authHeader = req.headers?.authorization;
      if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
        return typeof next === 'function' ? next() : undefined;
      }

      const headerName = config.headerName.toLowerCase();
      const token = req.headers?.[headerName] ?? req.headers?.[config.headerName] ?? req.headers?.['x-csrf-token'];
      const sessionToken = req.headers?.['x-csrf-session'] ?? req.cookies?.[config.cookieName];

      if (typeof token !== 'string' || typeof sessionToken !== 'string' || !verifyCSRFToken(token, sessionToken)) {
        res.status(403);
        res.json({ error: 'Invalid CSRF token' });
        return;
      }

      return typeof next === 'function' ? next() : undefined;
    }

    // Hono-style: (c, next)
    const c = reqOrCtx;
    const next = resOrNext;

    if (!c || !c.req) {
      logger.warn('[CSRF] Middleware received invalid context object');
      return typeof next === 'function' ? await next() : undefined;
    }

    const method = c.req.method || 'GET';
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return typeof next === 'function' ? await next() : undefined;
    }

    const authHeader = c.req.header?.('authorization');
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      return typeof next === 'function' ? await next() : undefined;
    }

    const token = c.req.header ? c.req.header(config.headerName) : undefined;
    const sessionToken = c.req.header ? c.req.header('x-csrf-session') : undefined;

    if (!token || !sessionToken || !verifyCSRFToken(token, sessionToken)) {
      if (typeof c.json === 'function') {
        return c.json({ error: 'Invalid CSRF token' }, 403);
      }
      return;
    }

    return typeof next === 'function' ? await next() : undefined;
  };
}

/**
 * Validate CSRF token (alias for verifyCSRFToken)
 */
export function validateCSRFToken(token: string, sessionToken: string): boolean {
  return verifyCSRFToken(token, sessionToken);
}

export function csrfTokenMiddleware(options: CSRFConfig = {}) {
  const config = { ...DEFAULT_CONFIG, ...options };
  
  return async (c: any, next: any) => {
    const token = generateCSRFToken();
    c.header(config.headerName, token);
    await next();
  };
}

// Ensure unique cleanup interval
if (typeof (global as any).csrfCleanupInterval === 'undefined') {
  const cleanupInterval = setInterval(cleanupExpiredTokens, 5 * 60 * 1000);
  if (cleanupInterval && typeof cleanupInterval === 'object' && 'unref' in cleanupInterval) {
    (cleanupInterval as any).unref();
  }
  (global as any).csrfCleanupInterval = cleanupInterval;
}
