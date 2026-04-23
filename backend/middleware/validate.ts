import type { Context, Next } from 'hono';
import { z } from 'zod';
import { generateErrorId, makeApiError } from '../lib/api-error';

type ZodSchemaLike = z.ZodTypeAny;

declare module 'hono' {
  interface ContextVariableMap {
    validatedBody: unknown;
    validatedQuery: unknown;
  }
}

export function validateBody<TSchema extends ZodSchemaLike>(schema: TSchema) {
  return async (c: Context, next: Next) => {
    const errorId = generateErrorId();
    const timestamp = new Date().toISOString();

    try {
      let body: unknown;
      try {
        body = await c.req.json();
      } catch {
        return c.json(
          makeApiError(c, 'INVALID_JSON', 'Invalid JSON body', undefined, errorId, timestamp),
          400
        );
      }
      const validated = schema.parse(body);
      c.set('validatedBody', validated);
      return await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return c.json(
          makeApiError(c, 'VALIDATION_ERROR', 'Invalid request data', details, errorId, timestamp),
          400
        );
      }

      throw error;
    }
  };
}

export function validateQuery<TSchema extends ZodSchemaLike>(schema: TSchema) {
  return async (c: Context, next: Next) => {
    const errorId = generateErrorId();
    const timestamp = new Date().toISOString();

    try {
      const query = c.req.query();
      const validated = schema.parse(query);
      c.set('validatedQuery', validated);
      return await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return c.json(
          makeApiError(c, 'VALIDATION_ERROR', 'Invalid query parameters', details, errorId, timestamp),
          400
        );
      }

      throw error;
    }
  };
}

export function validateParams<TSchema extends ZodSchemaLike>(schema: TSchema) {
  return async (c: Context, next: Next) => {
    const errorId = generateErrorId();
    const timestamp = new Date().toISOString();

    try {
      const params = c.req.param();
      const validated = schema.parse(params);
      c.set('validatedParams', validated);
      return await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return c.json(
          makeApiError(c, 'VALIDATION_ERROR', 'Invalid URL parameters', details, errorId, timestamp),
          400
        );
      }

      throw error;
    }
  };
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove other HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers with quotes
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '') // Remove event handlers without quotes (stop at space or >)
}

export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (!email) return false;
  if (email !== email.trim()) return false;

  // Prevent common header injection / address list injection patterns
  if (/[\r\n]/.test(email)) return false;
  if (/[<>"';]/.test(email)) return false;
  if (/%0d|%0a/i.test(email)) return false;

  // Must have exactly one @
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return false;
  if (email.indexOf('@', atIndex + 1) !== -1) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!local || !domain) return false;
  if (local.startsWith('.') || local.endsWith('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (email.includes('..')) return false;
  
  // Additional local part validations
  if (local.includes('..')) return false;
  if (local.startsWith('.')) return false;
  if (local.endsWith('.')) return false;

  // Domain must contain a dot (e.g. example.com) and be composed of safe labels
  const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
  if (!emailRegex.test(email)) return false;

  // Additional domain label sanity: no empty labels, no leading/trailing hyphen
  const labels = domain.split('.');
  if (labels.some((l) => !l || l.startsWith('-') || l.endsWith('-'))) return false;

  return true;
}

export function validateUUID(uuid: string): boolean {
  if (typeof uuid !== 'string') return false;
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function validatePhoneNumber(phone: string): boolean {
  if (typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(cleaned) && cleaned.length >= 7;
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function rateLimitByIp(maxRequests: number, windowMs: number) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return async (c: Context, next: Next) => {
    const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const now = Date.now();
    const requestData = requests.get(ip);

    if (!requestData || now > requestData.resetTime) {
      requests.set(ip, { count: 1, resetTime: now + windowMs });
      return await next();
    }

    if (requestData.count >= maxRequests) {
      return c.json(
        makeApiError(c, 'TOO_MANY_REQUESTS', 'Rate limit exceeded', undefined, generateErrorId(), new Date().toISOString()),
        429
      );
    }

    requestData.count++;
    return await next();
  };
}

declare module 'hono' {
  interface ContextVariableMap {
    validatedBody: unknown;
    validatedQuery: unknown;
    validatedParams: unknown;
  }
}

