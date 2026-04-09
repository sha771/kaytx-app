import { z } from 'zod';

// Common validation schemas
export const uuidSchema = z.string().uuid('Invalid ID format');
export const emailSchema = z.string().email('Invalid email format').max(254);
export const passwordSchema = z.string().min(12).max(128)
  .regex(/[A-Z]/, 'Need uppercase')
  .regex(/[a-z]/, 'Need lowercase')
  .regex(/[0-9]/, 'Need number')
  .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Need special char');
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

// User schemas
export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  role: z.enum(['user', 'admin', 'enterprise_admin', 'super_admin']),
  organizationId: uuidSchema.optional(),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  role: z.enum(['user', 'admin', 'enterprise_admin', 'super_admin']).optional(),
  status: z.enum(['active', 'suspended', 'pending']).optional(),
});

// Auth schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
  rememberMe: z.boolean().default(false),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

// Organization schemas
export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  website: z.string().url().optional().nullable(),
});

// AI Agent schemas
export const createAgentSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['customer_service', 'sales_assistant', 'data_analyst', 'content_creator']),
  configuration: z.object({
    temperature: z.number().min(0).max(2).default(0.7),
    maxTokens: z.number().int().min(1).max(4000).default(1000),
    model: z.string().default('gpt-3.5-turbo'),
  }).optional(),
});

// Platform schemas
export const createPlatformSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['crm', 'email', 'social_media', 'analytics']),
  provider: z.string().max(50),
  configuration: z.object({
    apiKey: z.string().min(1),
    environment: z.enum(['sandbox', 'production']).default('sandbox'),
  }),
});

// Message schemas
export const createMessageSchema = z.object({
  content: z.string().min(1).max(10000),
  type: z.enum(['text', 'image', 'file']).default('text'),
  agentId: uuidSchema.optional(),
});

// Analytics schemas
export const analyticsQuerySchema = z.object({
  metrics: z.array(z.string()).min(1),
  dateRange: z.object({
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  }).optional(),
  pagination: paginationSchema.optional(),
});

// File upload schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024,
    'File size must be less than 10MB'
  ).refine(
    (file) => ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type),
    'Invalid file type'
  ),
});
