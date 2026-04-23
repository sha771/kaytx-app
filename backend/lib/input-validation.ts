import { z } from 'zod';

/**
 * Centralized Input Validation Library
 * Provides reusable validation schemas and sanitization functions
 */

// ============================================================================
// COMMON VALIDATION SCHEMAS
// ============================================================================

export const uuidSchema = z.string().uuid('Invalid UUID format');

export const emailSchema = z.string().email('Invalid email format');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

export const nameSchema = z.string()
  .min(1, 'Name cannot be empty')
  .max(100, 'Name cannot exceed 100 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export const phoneNumberSchema = z.string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')
  .min(10, 'Phone number must be at least 10 digits')
  .max(20, 'Phone number cannot exceed 20 characters');

export const urlSchema = z.string().url('Invalid URL format').refine(
  (url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:', 'ftp:', 'ws:', 'wss:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },
  { message: 'Invalid URL format' }
);

export const dateSchema = z.string().datetime('Invalid datetime format');

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const dateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return data.startDate <= data.endDate;
    }
    return true;
  },
  {
    message: 'End date must be after start date',
    path: ['endDate'],
  }
);

// ============================================================================
// BUSINESS ENTITY SCHEMAS
// ============================================================================

export const userSchema = z.object({
  id: uuidSchema.optional(),
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  phoneNumber: phoneNumberSchema.optional(),
  role: z.enum(['user', 'admin', 'enterprise_admin', 'super_admin']).default('user'),
  organizationId: uuidSchema.optional(),
});

export const organizationSchema = z.object({
  id: uuidSchema.optional(),
  name: z.string().min(1, 'Organization name cannot be empty').max(255),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  billingEmail: emailSchema,
  industry: z.string().max(100).optional(),
  companySize: z.string().max(50).optional(),
});

export const webhookSchema = z.object({
  id: uuidSchema.optional(),
  name: z.string().min(1, 'Webhook name cannot be empty').max(255),
  url: urlSchema,
  events: z.array(z.string()).min(1, 'At least one event must be selected'),
  headers: z.record(z.string(), z.string()).optional().default({}),
  retryAttempts: z.number().int().min(0).max(10).default(3),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const apiKeySchema = z.object({
  id: uuidSchema.optional(),
  name: z.string().min(1, 'API key name cannot be empty').max(255),
  permissions: z.array(z.string()).min(1, 'At least one permission must be selected'),
  rateLimit: z.number().int().min(1).max(10000).default(1000),
  expiresAt: z.coerce.date().optional(),
});

export const integrationSchema = z.object({
  id: uuidSchema.optional(),
  name: z.string().min(1, 'Integration name cannot be empty').max(255),
  type: z.string().min(1, 'Integration type cannot be empty'),
  provider: z.string().min(1, 'Provider cannot be empty'),
  credentials: z.record(z.any()),
  config: z.record(z.any()).optional().default({}),
  syncFrequency: z.number().int().min(60).default(3600), // minimum 1 minute
});

// ============================================================================
// SANITIZATION FUNCTIONS
// ============================================================================

/**
 * Sanitize string input by removing potentially dangerous characters
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>{}"'`;]/g, '')
    .substring(0, 1000);
}

/**
 * Sanitize HTML content (basic implementation)
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

/**
 * Sanitize and validate email
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Sanitize phone number to standard format
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

/**
 * Sanitize URL to prevent XSS
 */
export function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid URL protocol');
    }
    return parsed.toString();
  } catch {
    throw new Error('Invalid URL format');
  }
}

// ============================================================================
// VALIDATION MIDDLEWARE HELPERS
// ============================================================================

/**
 * Validate request body against a schema
 */
export function validateBody<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    throw error;
  }
}

/**
 * Validate query parameters against a schema
 */
export function validateQuery<T>(schema: z.ZodSchema<T>, query: unknown): T {
  try {
    return schema.parse(query);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`);
      throw new Error(`Query validation failed: ${errors.join(', ')}`);
    }
    throw error;
  }
}

/**
 * Check for SQL injection patterns
 */
export function detectSqlInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(--|\/\*|\*\/)/,
    /(\bOR\b.*=.*\bOR\b)/i,
    /(\bAND\b.*=.*\bAND\b)/i,
    /('.*'|".*")/,
  ];

  return sqlPatterns.some(pattern => pattern.test(input));
}

/**
 * Check for XSS patterns
 */
export function detectXss(input: string): boolean {
  const xssPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
  ];

  return xssPatterns.some(pattern => pattern.test(input));
}

/**
 * Comprehensive security validation
 */
export function securityValidation(input: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (detectSqlInjection(input)) {
    errors.push('Potential SQL injection detected');
  }

  if (detectXss(input)) {
    errors.push('Potential XSS attack detected');
  }

  if (input.length > 10000) {
    errors.push('Input too long');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// EXPORTS
// ============================================================================

export const ValidationSchemas = {
  uuid: uuidSchema,
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  phoneNumber: phoneNumberSchema,
  url: urlSchema,
  date: dateSchema,
  pagination: paginationSchema,
  dateRange: dateRangeSchema,
  user: userSchema,
  organization: organizationSchema,
  webhook: webhookSchema,
  apiKey: apiKeySchema,
  integration: integrationSchema,
};

export const Sanitization = {
  string: sanitizeString,
  html: sanitizeHtml,
  email: sanitizeEmail,
  phoneNumber: sanitizePhoneNumber,
  url: sanitizeUrl,
};

export const SecurityValidation = {
  sqlInjection: detectSqlInjection,
  xss: detectXss,
  comprehensive: securityValidation,
};
