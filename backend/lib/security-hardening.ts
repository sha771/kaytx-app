import { Request, Response, NextFunction } from 'express';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import crypto from 'crypto';
import { db as pgDb } from '../db/connection';
import { apiKeys } from '../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';
import { ProductionLogger } from './production-logger';

const logger = new ProductionLogger('SecurityHardening');

/**
 * Security Hardening Module
 * Implements enterprise-grade security controls
 */

// ============================================================================
// 1. RATE LIMITING
// ============================================================================

/**
 * API Rate Limiting - Adaptive rate limiting based on user tier
 */
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: (req: Request) => {
    const user = (req as any).user;
    if (!user) return 50; // Unauthenticated users get lower limit
    
    // Adaptive limits based on user role/subscription
    switch (user.role) {
      case 'SUPER_ADMIN':
      case 'ENTERPRISE_ADMIN':
        return 200;
      case 'ADMIN':
        return 150;
      case 'PRO_USER':
        return 100;
      default:
        return 50;
    }
  },
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request) => {
    // Skip rate limiting for health checks and metrics
    return req.path === '/health' || req.path === '/metrics';
  },
  keyGenerator: (req: Request) => {
    // Use user ID if authenticated, otherwise IP
    return (req as any).user?.id?.toString() || ipKeyGenerator(req);
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests. Please try again later.',
      retryAfter: (req as any).rateLimit?.resetTime,
    });
  },
});

/**
 * Authentication Rate Limiting - Very strict for sensitive operations
 * 5 failed attempts per 15 minutes per email/IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later.',
  keyGenerator: (req: Request) => {
    const email = (req as any).body?.email;
    const ip = ipKeyGenerator(req);
    return email ? `auth:${email}:${ip}` : `auth:${ip}`;
  },
});

/**
 * Password Reset Rate Limiting - Very strict
 * 3 attempts per hour per email
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many password reset requests, please try again later.',
  skipSuccessfulRequests: true,
  keyGenerator: (req: Request) => {
    const email = (req as any).body?.email;
    return email ? `reset:${email}` : `reset:${ipKeyGenerator(req)}`;
  },
});

/**
 * API Key Rate Limiting - For API endpoints
 * 1000 requests per hour per API key
 */
export const apiKeyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000,
  keyGenerator: (req: Request) => {
    const apiKey = (req as any).apiKey;
    return apiKey ? `apikey:${apiKey}` : ipKeyGenerator(req);
  },
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      code: 'API_RATE_LIMIT_EXCEEDED',
      message: 'API rate limit exceeded. Please upgrade your plan or wait.',
      retryAfter: (req as any).rateLimit?.resetTime,
    });
  },
});

/**
 * Sensitive Operations Rate Limiting - For critical operations
 * 10 operations per hour per user
 */
export const sensitiveOperationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  keyGenerator: (req: Request) => {
    const user = (req as any).user;
    return user ? `sensitive:${user.id}` : `sensitive:${ipKeyGenerator(req)}`;
  },
  message: 'Too many sensitive operations. Please wait before trying again.',
});

// ============================================================================
// 2. SECURITY HEADERS
// ============================================================================

/**
 * Helmet Security Headers
 */
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      fontSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'api.openai.com', 'api.anthropic.com'],
      mediaSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xContentTypeOptions: true,
  xFrameOptions: { action: 'deny' },
  xXssProtection: true,
  dnsPrefetchControl: { allow: false },
});

/**
 * CORS Configuration
 */
export const corsConfig = cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      'https://api.example.com',
      'https://example.com',
      'https://staging-api.example.com',
      'http://localhost:3000',
      'http://localhost:3001',
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Number'],
  maxAge: 86400, // 24 hours
});

// ============================================================================
// 3. INPUT VALIDATION & SANITIZATION
// ============================================================================

/**
 * Validate and sanitize JSON request body
 */
export const validateJsonBody = (req: Request, res: Response, next: NextFunction): void => {
  if (req.is('application/json')) {
    const bodySize = JSON.stringify(req.body).length;
    const maxBodySize = 10 * 1024 * 1024; // 10 MB

    if (bodySize > maxBodySize) {
      res.status(413).json({
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Request body too large',
      });
      return;
    }
  }
  next();
};

/**
 * Sanitize request parameters
 */
export function sanitizeInput(input: any): any {
  if (typeof input === 'string') {
    // Remove special characters and potential injection attempts
    return input
      .trim()
      .replace(/[<>{}\"'`;]/g, '')
      .substring(0, 1000); // Limit length
  }
  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
}

// ============================================================================
// 4. CSRF PROTECTION
// ============================================================================

interface CsrfToken {
  token: string;
  expires: number;
}

const csrfTokens = new Map<string, CsrfToken>();

/**
 * Generate CSRF Token
 */
export function generateCsrfToken(userId: string): string {
  const token = crypto.randomBytes(32).toString('hex');
  csrfTokens.set(userId, {
    token,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  });
  return token;
}

/**
 * Verify CSRF Token
 */
export function verifyCsrfToken(userId: string, token: string): boolean {
  const stored = csrfTokens.get(userId);
  if (!stored || stored.expires < Date.now()) {
    return false;
  }
  return stored.token === token;
}

/**
 * CSRF Protection Middleware
 */
export const csrfProtection = (req: Request, res: Response, next: NextFunction): void => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    next();
    return;
  }

  const token = req.headers['x-csrf-token'] as string;
  const userId = (req as any).user?.id?.toString();

  if (!userId || !token || !verifyCsrfToken(userId, token)) {
    res.status(403).json({
      code: 'CSRF_TOKEN_INVALID',
      message: 'CSRF token validation failed',
    });
    return;
  }

  next();
};

// ============================================================================
// 5. API KEY MANAGEMENT
// ============================================================================

/**
 * Generate API Key
 */
export function generateApiKey(): string {
  return `api_${crypto.randomBytes(32).toString('hex')}`;
}

/**
 * Hash API Key (for storage)
 */
export function hashApiKey(apiKey: string): string {
  if (!apiKey) return '';
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

/**
 * Verify API Key
 */
export function verifyApiKey(providedKey: string, hashedKey: string): boolean {
  if (!providedKey || !hashedKey) return false;
  
  const providedHash = hashApiKey(providedKey);
  const providedBuffer = Buffer.from(providedHash);
  const hashedBuffer = Buffer.from(hashedKey);

  if (providedBuffer.length !== hashedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, hashedBuffer);
}

export async function validateApiKey(providedKey: string, organizationId?: string): Promise<{ valid: boolean; record?: any }> {
  const key = String(providedKey || '').trim();
  if (!key) return { valid: false };

  const providedHash = hashApiKey(key);
  const where = organizationId
    ? and(eq(apiKeys.organizationId, organizationId), eq(apiKeys.hashedKey, providedHash))
    : eq(apiKeys.hashedKey, providedHash);

  const [row] = await pgDb.select().from(apiKeys).where(where as any).limit(1);
  if (!row) return { valid: false };

  if ((row as any).status && (row as any).status !== 'active') return { valid: false };
  if ((row as any).expiresAt && new Date((row as any).expiresAt).getTime() <= Date.now()) return { valid: false };

  try {
    await pgDb
      .update(apiKeys)
      .set({
        lastUsedAt: new Date(),
        usageCount: (row as any).usageCount ? Number((row as any).usageCount) + 1 : 1,
      } as any)
      .where(eq(apiKeys.id, (row as any).id));
  } catch {
    // best-effort
  }

  return { valid: true, record: row };
}

// ============================================================================
// 6. SECRETS ROTATION
// ============================================================================

export interface SecretConfig {
  name: string;
  value: string;
  rotationInterval: number; // days
  lastRotated: Date;
}

export class SecretsManager {
  private secrets = new Map<string, SecretConfig>();

  /**
   * Register secret for rotation
   */
  registerSecret(name: string, value: string, rotationInterval = 90): void {
    this.secrets.set(name, {
      name,
      value,
      rotationInterval,
      lastRotated: new Date(),
    });
  }

  /**
   * Check if secret needs rotation
   */
  needsRotation(secretName: string): boolean {
    const secret = this.secrets.get(secretName);
    if (!secret) return false;

    const daysSinceRotation = (Date.now() - secret.lastRotated.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceRotation >= secret.rotationInterval;
  }

  /**
   * Get all secrets needing rotation
   */
  getSecretsNeedingRotation(): string[] {
    return Array.from(this.secrets.values())
      .filter((secret) => this.needsRotation(secret.name))
      .map((secret) => secret.name);
  }

  /**
   * Rotate secret
   */
  rotateSecret(secretName: string, newValue: string): void {
    const secret = this.secrets.get(secretName);
    if (secret) {
      secret.value = newValue;
      secret.lastRotated = new Date();
      logger.info(`Secret rotated: ${secretName}`);
    }
  }
}

export const secretsManager = new SecretsManager();

// ============================================================================
// 7. SECURITY LOGGING
// ============================================================================

export interface SecurityEvent {
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  event: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: any;
  timestamp: Date;
}

export class SecurityLogger {
  private events: SecurityEvent[] = [];

  log(event: SecurityEvent): void {
    this.events.push(event);

    const message = `[SECURITY ${event.severity}] ${event.event} | User: ${event.userId} | IP: ${event.ipAddress}`;
    switch (event.severity) {
      case 'INFO':
        logger.info(message);
        break;
      case 'WARNING':
        logger.warn(message);
        break;
      case 'ERROR':
      case 'CRITICAL':
        logger.error(message);
        break;
      default:
        logger.info(message);
        break;
    }

    // Alert on critical events
    if (event.severity === 'CRITICAL') {
      this.alertCritical(event);
    }
  }

  private alertCritical(event: SecurityEvent): void {
    // Integration point for Sentry/PagerDuty
    logger.error('CRITICAL SECURITY EVENT:', JSON.stringify(event, null, 2));
    // In production: PagerDuty.trigger(event);
  }

  getEvents(Filter?: { severity?: string; userId?: string; limit?: number }): SecurityEvent[] {
    let result = this.events;

    if (Filter?.severity) {
      result = result.filter((e) => e.severity === Filter.severity);
    }
    if (Filter?.userId) {
      result = result.filter((e) => e.userId === Filter.userId);
    }

    return result.slice(-(Filter?.limit || 100));
  }
}

export const securityLogger = new SecurityLogger();

// ============================================================================
// 8. MIDDLEWARE EXPORT
// ============================================================================

/**
 * Combined security middleware
 */
export function createSecurityMiddleware() {
  return [helmetConfig, corsConfig, apiLimiter, validateJsonBody];
}
