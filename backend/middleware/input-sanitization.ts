import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

export interface SanitizationOptions {
  allowedTags?: string[];
  allowedAttributes?: Record<string, string[]>;
  allowScripts?: boolean;
  allowStyles?: boolean;
  maxLength?: number;
  trimWhitespace?: boolean;
  escapeHtml?: boolean;
}

const defaultSanitizationOptions: SanitizationOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'span'],
  allowedAttributes: {
    'a': ['href', 'title'],
    'span': ['class'],
  },
  allowScripts: false,
  allowStyles: false,
  maxLength: 10000,
  trimWhitespace: true,
  escapeHtml: true,
};

export function sanitizeInput(input: unknown, options: SanitizationOptions = {}): string {
  const opts = { ...defaultSanitizationOptions, ...options };
  
  // Convert to string if needed
  let str = typeof input === 'string' ? input : String(input || '');
  
  // Length validation
  if (opts.maxLength && str.length > opts.maxLength) {
    str = str.substring(0, opts.maxLength);
  }
  
  // Trim whitespace
  if (opts.trimWhitespace) {
    str = str.trim();
  }
  
  // Remove null bytes and control characters
  str = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Remove potentially dangerous patterns
  str = str.replace(/javascript:/gi, '');
  str = str.replace(/vbscript:/gi, '');
  str = str.replace(/on\w+\s*=/gi, '');
  str = str.replace(/data:(?!image\/(png|jpeg|jpg|gif|webp))/gi, '');
  
  // HTML sanitization
  if (opts.escapeHtml) {
    str = escapeHtmlEntities(str);
  } else if (DOMPurify && typeof DOMPurify.sanitize === 'function') {
    str = DOMPurify.sanitize(str, {
      ALLOWED_TAGS: opts.allowedTags || [],
      ALLOWED_ATTR: Object.keys(opts.allowedAttributes || {}),
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM_IMPORT: false,
    });
  }
  
  return str;
}

function escapeHtmlEntities(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return str.replace(/[&<>"'/]/g, (match) => htmlEscapes[match]);
}

// Zod refinement for input sanitization
export function sanitizeRefinement(options: SanitizationOptions = {}) {
  return (value: unknown, ctx: z.RefinementCtx) => {
    try {
      const sanitized = sanitizeInput(value, options);
      // If sanitization changed the value, add an issue
      if (typeof value === 'string' && sanitized !== value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Input contains potentially unsafe content and has been sanitized',
        });
      }
      return sanitized;
    } catch (error) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Input sanitization failed',
      });
      return z.NEVER;
    }
  };
}

// Pre-configured sanitization schemas
export const sanitizedStringSchema = z.string().transform(sanitizeInput);

export const sanitizedEmailSchema = z.string()
  .email()
  .transform(sanitizeInput)
  .refine((email) => {
    // Additional email validation after sanitization
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, 'Invalid email format');

export const sanitizedUrlSchema = z.string()
  .url()
  .transform((url) => sanitizeInput(url, { escapeHtml: false }))
  .refine((url) => {
    try {
      const parsed = new URL(url);
      // Only allow http and https protocols
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, 'Invalid URL format');

export const sanitizedHtmlSchema = z.string()
  .transform((html) => sanitizeInput(html, { 
    escapeHtml: false,
    allowedTags: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'a'],
    allowedAttributes: { 'a': ['href', 'title'] }
  }));

export const sanitizedNameSchema = z.string()
  .min(1)
  .max(100)
  .transform((name) => sanitizeInput(name, { 
    maxLength: 100,
    allowedTags: [],
    escapeHtml: true
  }))
  .refine((name) => /^[a-zA-Z\s\-']+$/.test(name), 'Name contains invalid characters');

export const sanitizedPhoneSchema = z.string()
  .transform((phone) => sanitizeInput(phone, { escapeHtml: false }))
  .refine((phone) => {
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(cleaned) && cleaned.length >= 7;
  }, 'Invalid phone number format');

// Middleware for automatic input sanitization
export function createSanitizationMiddleware(schemas: Record<string, z.ZodSchema>) {
  return async (c: Context, next: Next) => {
    const sanitizedData: Record<string, any> = {};
    
    for (const [key, schema] of Object.entries(schemas)) {
      const value = c.req.query()[key] || c.req.param()[key] || 
                   (c.req.body && typeof c.req.body === 'object' ? c.req.body[key] : undefined);
      
      if (value !== undefined) {
        try {
          const result = schema.safeParse(value);
          if (result.success) {
            sanitizedData[key] = result.data;
          } else {
            return c.json({
              error: 'Invalid input',
              field: key,
              issues: result.error.issues
            }, 400);
          }
        } catch (error) {
          return c.json({
            error: 'Sanitization failed',
            field: key
          }, 400);
        }
      }
    }
    
    // Store sanitized data in context
    c.set('sanitized', sanitizedData);
    
    await next();
  };
}

// SQL injection prevention
export function sanitizeSqlInput(input: string): string {
  return input
    .replace(/['"\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove start of block comments
    .replace(/\*\//g, '') // Remove end of block comments
    .replace(/;/g, '') // Remove statement separators
    .replace(/\b(OR|AND|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|WHERE)\b/gi, ''); // Remove SQL keywords
}

// NoSQL injection prevention
export function sanitizeNoSqlInput(input: string): string {
  return input
    .replace(/\$where/gi, '')
    .replace(/\$ne/gi, '')
    .replace(/\$gt/gi, '')
    .replace(/\$lt/gi, '')
    .replace(/\$in/gi, '')
    .replace(/\$nin/gi, '')
    .replace(/\{|\}/g, '')
    .replace(/\[/g, '')
    .replace(/\]/g, '');
}
