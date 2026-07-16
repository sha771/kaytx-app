/**
 * Zod Validation Schemas for API Routes
 * Reusable schema definitions for request body, query, and param validation
 */

import { z } from 'zod';

// ============================================================================
// Common / Shared Schemas
// ============================================================================

export const uuidSchema = z.string().uuid('Invalid UUID');
export const emailSchema = z.string().email('Invalid email address').toLowerCase();
export const slugSchema = z
  .string()
  .min(2)
  .max(100)
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens');

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const sortOrderSchema = z.enum(['asc', 'desc']).default('desc');

// ============================================================================
// Auth Schemas
// ============================================================================

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  mfaCode: z.string().length(6).optional(),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phoneNumber: z.string().optional(),
  organizationName: z.string().min(1).max(200).optional(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z
    .string()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/),
});

export const mfaSetupSchema = z.object({
  type: z.enum(['totp', 'sms', 'email']),
  phoneNumber: z.string().optional(),
});

export const mfaVerifySchema = z.object({
  code: z.string().length(6, 'MFA code must be 6 digits'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// ============================================================================
// Agent Schemas
// ============================================================================

export const createAgentSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().min(1).max(2000),
  department: z.string().min(1).max(100),
  category: z.string().max(100).optional(),
  capabilities: z.array(z.string()).default([]),
  status: z.enum(['active', 'inactive', 'draft', 'archived']).default('draft'),
  config: z.record(z.unknown()).optional(),
});

export const updateAgentSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  capabilities: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'draft', 'archived']).optional(),
  config: z.record(z.unknown()).optional(),
});

export const agentQuerySchema = z.object({
  search: z.string().optional(),
  department: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(['active', 'inactive', 'draft', 'archived']).optional(),
  capabilities: z.array(z.string()).optional(),
});

// ============================================================================
// Organization Schemas
// ============================================================================

export const createOrganizationSchema = z.object({
  name: z.string().min(1).max(200),
  slug: slugSchema,
  plan: z.enum(['free', 'starter', 'pro', 'enterprise']).default('free'),
});

export const updateOrganizationSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  plan: z.enum(['free', 'starter', 'pro', 'enterprise']).optional(),
  settings: z.record(z.unknown()).optional(),
  branding: z.record(z.unknown()).optional(),
});

// ============================================================================
// Conversation / Chat Schemas
// ============================================================================

export const createConversationSchema = z.object({
  agentId: uuidSchema.optional(),
  title: z.string().max(200).optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const sendMessageSchema = z.object({
  message: z.string().min(1).max(10000),
  agentId: uuidSchema.optional(),
  conversationId: uuidSchema.optional(),
  context: z.record(z.unknown()).optional(),
  stream: z.boolean().default(true),
});

// ============================================================================
// AI Configuration Schemas
// ============================================================================

export const aiProviderSchema = z.object({
  provider: z.enum(['openai', 'anthropic', 'google', 'azure', 'custom']),
  model: z.string().min(1),
  apiKey: z.string().min(1),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(1).max(1000000).default(4096),
  topP: z.number().min(0).max(1).default(1),
  frequencyPenalty: z.number().min(-2).max(2).default(0),
  presencePenalty: z.number().min(-2).max(2).default(0),
});

export const aiNegotiationConfigSchema = z.object({
  enabled: z.boolean().default(false),
  aggressiveness: z.enum(['low', 'medium', 'high']).default('medium'),
  fallbackBehavior: z.enum(['escalate', 'decline', 'accept']).default('escalate'),
  maxIterations: z.number().int().min(1).max(20).default(5),
});

export const aiReceptionistConfigSchema = z.object({
  enabled: z.boolean().default(false),
  greeting: z.string().max(500).default('Hello! How can I help you today?'),
  businessHours: z.object({
    enabled: z.boolean().default(false),
    timezone: z.string().default('UTC'),
    schedule: z.record(z.array(z.string())).default({}),
  }),
  fallbackToHuman: z.boolean().default(true),
  languages: z.array(z.string()).default(['en']),
});

// ============================================================================
// Platform / Integration Schemas
// ============================================================================

export const connectPlatformSchema = z.object({
  platform: z.enum([
    'whatsapp', 'twilio', 'slack', 'email', 'instagram', 'facebook',
    'linkedin', 'twitter', 'telegram', 'signal',
  ]),
  credentials: z.record(z.string()),
  options: z.record(z.unknown()).optional(),
});

export const oauthConnectSchema = z.object({
  platform: z.string().min(1),
  code: z.string().min(1),
  redirectUri: z.string().url(),
});

export const qrConnectSchema = z.object({
  platform: z.string().min(1),
  qrData: z.string().min(1),
});

// ============================================================================
// Payment / Billing Schemas
// ============================================================================

export const createSubscriptionSchema = z.object({
  planId: z.enum(['free', 'starter', 'pro', 'enterprise']),
  interval: z.enum(['monthly', 'yearly']).default('monthly'),
  couponCode: z.string().optional(),
});

export const updateSubscriptionSchema = z.object({
  planId: z.enum(['free', 'starter', 'pro', 'enterprise']).optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
});

export const webhookEventSchema = z.object({
  type: z.string(),
  data: z.record(z.unknown()),
});

// ============================================================================
// Privacy / GDPR Schemas
// ============================================================================

export const dataExportRequestSchema = z.object({
  format: z.enum(['json', 'csv']).default('json'),
  includeDeleted: z.boolean().default(false),
});

export const consentUpdateSchema = z.object({
  marketing: z.boolean().optional(),
  analytics: z.boolean().optional(),
  thirdParty: z.boolean().optional(),
  necessary: z.literal(true).default(true),
});

// ============================================================================
// Enterprise / Team Schemas
// ============================================================================

export const inviteMemberSchema = z.object({
  email: emailSchema,
  role: z.enum(['admin', 'manager', 'member', 'viewer']).default('member'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(['admin', 'manager', 'member', 'viewer']),
});

export const createApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  scopes: z.array(z.string()).default([]),
  expiresAt: z.string().datetime().optional(),
});

// ============================================================================
// Type Inference Exports
// ============================================================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateAgentInput = z.infer<typeof createAgentSchema>;
export type UpdateAgentInput = z.infer<typeof updateAgentSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type CreateConversationInput = z.infer<typeof createConversationSchema>;
export type ConnectPlatformInput = z.infer<typeof connectPlatformSchema>;
export type CreateSubscriptionInput = z.infer<typeof createSubscriptionSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
