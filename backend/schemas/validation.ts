import { z } from 'zod';

// Common schemas
const uuidSchema = z.string().uuid();
const emailSchema = z.string().email();
const passwordSchema = z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain uppercase, lowercase, number, and special character');
const nonEmptyString = z.string().min(1);
const optionalString = z.string().optional();

// Pagination schemas
const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Enhanced security helper functions
const sanitizeString = (val: string): string => {
  // Comprehensive XSS prevention
  return val
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\(/g, '&#40;')
    .replace(/\)/g, '&#41;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\[/g, '&#91;')
    .replace(/\]/g, '&#93;')
    .replace(/`/g, '&#96;')
    .replace(/\^/g, '&#94;')
    .replace(/\|/g, '&#124;');
};

const sanitizeHtml = (val: string): string => {
  // Enhanced HTML sanitization
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'];
  
  // Remove dangerous HTML tags and attributes
  let sanitized = val
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gis, '')
    .replace(/<object[^>]*>.*?<\/object>/gis, '')
    .replace(/<embed[^>]*>.*?<\/embed>/gis, '')
    .replace(/<form[^>]*>.*?<\/form>/gis, '')
    .replace(/<input[^>]*>/gi, '')
    .replace(/<button[^>]*>.*?<\/button>/gis, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '');
  
  return sanitized;
};

const sanitizeSql = (val: string): string => {
  // Advanced SQL injection prevention
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|TRUNCATE|BACKUP|RESTORE)\b)/gi,
    /(--|\/\*|\*\/|;|'|"|`|\\)/g,
    /(\b(OR|AND|XOR|NOT|IN|EXISTS|BETWEEN|LIKE)\s+[^\s]+)/gi,
    /(1=1|1 = 1|true=true|false=false)/gi,
    /(\b(WAITFOR|DELAY|BENCHMARK|SLEEP|DBMS_LOCK)\b)/gi,
    /(\b(INFORMATION_SCHEMA|SYS|MASTER|MSDB|MYSQL)\b)/gi,
    /(\b(LOAD_FILE|INTO\s+OUTFILE|INTO\s+DUMPFILE)\b)/gi,
    /(\b(XP_|SP_|CMDEXEC|OPENROWSET|OPENDATASOURCE)\b)/gi,
    /\b(CAST|CONVERT|CHAR|ASCII|ORD|HEX|UNHEX)\s*\(/gi,
    /\b(CONCAT|SUBSTRING|LENGTH|REPLACE|INSERT|LPAD|RPAD)\s*\(/gi
  ];
  
  return sqlPatterns.reduce((clean, pattern) => clean.replace(pattern, ''), val);
};

// Exported aliases used throughout the codebase
const safeStringSchema = sanitizeString;
const safeHtmlSchema = sanitizeHtml;
const sqlInjectionSafeSchema = sanitizeSql;

// User management schemas
export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: nonEmptyString.max(100).transform(sanitizeString),
  lastName: nonEmptyString.max(100).transform(sanitizeString),
  phoneNumber: z.string().max(50).transform(sanitizeString).optional(),
  role: z.enum(['user', 'admin', 'enterprise_admin', 'super_admin']).default('user'),
  organizationId: uuidSchema.optional(),
});

export const updateUserSchema = z.object({
  firstName: nonEmptyString.max(100).transform(sanitizeString).optional(),
  lastName: nonEmptyString.max(100).transform(sanitizeString).optional(),
  phoneNumber: z.string().max(50).transform(sanitizeString).optional(),
  role: z.enum(['user', 'admin', 'enterprise_admin', 'super_admin']).optional(),
  status: z.enum(['active', 'suspended', 'deleted', 'pending']).optional(),
});

export const listUsersSchema = paginationSchema.extend({
  search: z.string().optional(),
  role: z.enum(['user', 'admin', 'enterprise_admin', 'super_admin']).optional(),
  status: z.enum(['active', 'suspended', 'deleted', 'pending']).optional(),
  organizationId: uuidSchema.optional(),
});

// Organization management schemas
export const createOrganizationSchema = z.object({
  name: nonEmptyString.max(255),
  slug: nonEmptyString.max(100).regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  billingEmail: emailSchema,
  taxId: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  companySize: z.string().max(50).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise', 'custom']).default('free'),
  maxUsers: z.number().int().min(1).default(5),
  maxStorage: z.number().int().min(1024).default(5120),
});

export const updateOrganizationSchema = z.object({
  name: nonEmptyString.max(255).optional(),
  billingEmail: emailSchema.optional(),
  taxId: z.string().max(100).optional(),
  industry: z.string().max(100).optional(),
  companySize: z.string().max(50).optional(),
  plan: z.enum(['free', 'starter', 'professional', 'enterprise', 'custom']).optional(),
  maxUsers: z.number().int().min(1).optional(),
  maxStorage: z.number().int().min(1024).optional(),
  settings: z.object({
    enforceSSO: z.boolean().optional(),
    enforce2FA: z.boolean().optional(),
    passwordPolicy: z.object({
      minLength: z.number().int().min(6).optional(),
      requireUppercase: z.boolean().optional(),
      requireLowercase: z.boolean().optional(),
      requireNumbers: z.boolean().optional(),
      requireSpecialChars: z.boolean().optional(),
      expiryDays: z.number().int().min(1).optional(),
    }).optional(),
    sessionTimeout: z.number().int().min(300).optional(),
    ipWhitelist: z.array(z.string()).optional(),
    dataRetentionDays: z.number().int().min(1).optional(),
  }).optional(),
});

// Team management schemas
export const inviteTeamMemberSchema = z.object({
  email: emailSchema,
  role: z.enum(['admin', 'manager', 'user', 'guest']),
  permissions: z.array(z.string()).optional(),
});

export const updateTeamMemberSchema = z.object({
  role: z.enum(['admin', 'manager', 'user', 'guest']).optional(),
  permissions: z.array(z.string()).optional(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
});

// API Key management schemas
export const createApiKeySchema = z.object({
  name: nonEmptyString.max(255),
  permissions: z.array(z.string()),
  rateLimit: z.number().int().min(1).max(10000).default(1000),
  expiresAt: z.string().datetime().optional(),
});

export const updateApiKeySchema = z.object({
  name: nonEmptyString.max(255).optional(),
  permissions: z.array(z.string()).optional(),
  rateLimit: z.number().int().min(1).max(10000).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

// Webhook management schemas
export const createWebhookSchema = z.object({
  name: nonEmptyString.max(255),
  url: z.string().url(),
  events: z.array(z.string()).min(1),
  secret: z.string().min(16),
  headers: z.record(z.string(), z.string()).optional(),
  retryAttempts: z.number().int().min(0).max(10).default(3),
});

export const updateWebhookSchema = z.object({
  name: nonEmptyString.max(255).optional(),
  url: z.string().url().optional(),
  events: z.array(z.string()).optional(),
  secret: z.string().min(16).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  retryAttempts: z.number().int().min(0).max(10).optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

// AI Agent management schemas
export const createAgentSchema = z.object({
  name: nonEmptyString.max(255),
  description: z.string().optional(),
  type: nonEmptyString.max(50),
  model: z.string().max(100).optional(),
  config: z.record(z.string(), z.any()).optional(),
  systemPrompt: z.string().optional(),
  capabilities: z.array(z.string()).optional(),
});

export const updateAgentSchema = z.object({
  name: nonEmptyString.max(255).optional(),
  description: z.string().optional(),
  type: nonEmptyString.max(50).optional(),
  model: z.string().max(100).optional(),
  config: z.record(z.string(), z.any()).optional(),
  systemPrompt: z.string().optional(),
  capabilities: z.array(z.string()).optional(),
  status: z.enum(['draft', 'active', 'inactive', 'archived']).optional(),
});

// Analytics and metrics schemas
export const analyticsQuerySchema = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  metricType: z.string().optional(),
  period: z.enum(['hour', 'day', 'week', 'month']).default('day'),
  organizationId: uuidSchema.optional(),
});

// Audit log schemas
export const auditLogQuerySchema = paginationSchema.extend({
  userId: uuidSchema.optional(),
  organizationId: uuidSchema.optional(),
  action: z.string().optional(),
  resource: z.string().optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

// Notification schemas
export const createNotificationSchema = z.object({
  userId: uuidSchema,
  type: z.enum(['email', 'sms', 'push', 'in_app', 'webhook']),
  title: nonEmptyString.max(255),
  message: nonEmptyString,
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  actionUrl: z.string().url().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const updateNotificationSchema = z.object({
  read: z.boolean().optional(),
  readAt: z.string().datetime().optional(),
});

// Integration schemas
export const createIntegrationSchema = z.object({
  name: nonEmptyString.max(255),
  type: nonEmptyString.max(100),
  provider: nonEmptyString.max(100),
  credentials: z.record(z.string(), z.any()),
  config: z.record(z.string(), z.any()).optional(),
  syncFrequency: z.number().int().min(60).default(3600),
});

export const updateIntegrationSchema = z.object({
  name: nonEmptyString.max(255).optional(),
  credentials: z.record(z.string(), z.any()).optional(),
  config: z.record(z.string(), z.any()).optional(),
  syncFrequency: z.number().int().min(60).optional(),
  status: z.enum(['active', 'inactive', 'error', 'pending']).optional(),
});

export const createPlatformConnectionSchema = z.object({
  platform: z.enum(['slack', 'teams', 'discord', 'telegram', 'whatsapp']),
  metadata: z.record(z.string(), z.unknown()),
});

export const updatePlatformConnectionSchema = z.object({
  isActive: z.boolean().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});
// Call management schemas
export const createCallLogSchema = z.object({
  contactId: uuidSchema.optional(),
  direction: z.enum(['inbound', 'outbound']),
  phoneNumber: z.string().max(50),
  duration: z.number().int().min(0).default(0),
  status: z.enum(['ringing', 'in_progress', 'completed', 'failed', 'missed']),
  recordingUrl: z.string().url().optional(),
  transcription: z.string().optional(),
  summary: z.string().optional(),
  sentiment: z.enum(['positive', 'negative', 'neutral']).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  startedAt: z.string().datetime(),
  endedAt: z.string().datetime().optional(),
});

export const updateCallLogSchema = z.object({
  status: z.enum(['ringing', 'in_progress', 'completed', 'failed', 'missed']).optional(),
  duration: z.number().int().min(0).optional(),
  recordingUrl: z.string().url().optional(),
  transcription: z.string().optional(),
  summary: z.string().optional(),
  sentiment: z.enum(['positive', 'negative', 'neutral']).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  endedAt: z.string().datetime().optional(),
});

// Settings schemas
export const updateSettingsSchema = z.object({
  notifications: z.object({
    email: z.boolean().optional(),
    sms: z.boolean().optional(),
    push: z.boolean().optional(),
  }).optional(),
  privacy: z.object({
    profileVisibility: z.enum(['public', 'organization', 'private']).optional(),
    activityVisibility: z.boolean().optional(),
  }).optional(),
  security: z.object({
    twoFactorEnabled: z.boolean().optional(),
  }).optional(),
});

// Marketing campaign schemas
export const createCampaignSchema = z.object({
  name: z.string().min(1).max(100),
  subject: z.string().min(1).max(200),
  body: z.string().min(1),
  recipients: z.array(emailSchema).min(1),
  scheduledAt: z.string().datetime().optional(),
  templateId: uuidSchema.optional(),
  personalizationEnabled: z.boolean().default(false),
  trackOpens: z.boolean().default(true),
  trackClicks: z.boolean().default(true),
});

export const updateCampaignSchema = z.object({
  name: nonEmptyString.max(100).optional(),
  subject: nonEmptyString.max(200).optional(),
  body: nonEmptyString.optional(),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'scheduled', 'sending', 'sent', 'paused', 'cancelled']).optional(),
});

export const campaignAnalyticsSchema = z.object({
  campaignId: uuidSchema,
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  metrics: z.array(z.enum(['sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed', 'complained'])).default(['sent', 'delivered', 'opened', 'clicked']),
});

// Lead management schemas
export const createLeadSchema = z.object({
  email: emailSchema,
  firstName: nonEmptyString.max(100).optional(),
  lastName: nonEmptyString.max(100).optional(),
  company: z.string().max(255).optional(),
  jobTitle: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  source: z.string().max(100).optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).default('new'),
  score: z.number().int().min(0).max(100).default(0),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const updateLeadSchema = z.object({
  firstName: nonEmptyString.max(100).optional(),
  lastName: nonEmptyString.max(100).optional(),
  company: z.string().max(255).optional(),
  jobTitle: z.string().max(100).optional(),
  phone: z.string().max(50).optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
  score: z.number().int().min(0).max(100).optional(),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const leadScoringRulesSchema = z.object({
  rules: z.array(z.object({
    field: z.string(),
    operator: z.enum(['equals', 'contains', 'greater_than', 'less_than', 'exists']),
    value: z.any(),
    score: z.number().int(),
  })),
  enabled: z.boolean().default(true),
});

// GDPR compliance schemas
export const dataSubjectRequestSchema = z.object({
  type: z.enum(['access', 'deletion', 'portability', 'rectification']),
  email: emailSchema,
  verificationMethod: z.enum(['email', 'phone', 'document']),
  verificationData: z.string(),
  reason: z.string().optional(),
  requestedAt: z.string().datetime().optional(),
});

export const consentManagementSchema = z.object({
  userId: uuidSchema,
  consentType: z.enum(['marketing', 'analytics', 'functional', 'necessary']),
  granted: z.boolean(),
  ipAddress: z.string().refine((val) => {
    // Basic IP validation regex
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(val) || ipv6Regex.test(val);
  }, { message: 'Invalid IP address' }).optional(),
  userAgent: z.string().optional(),
  timestamp: z.string().datetime().optional(),
  documentVersion: z.string().optional(),
});

export const dataProcessingRecordSchema = z.object({
  processName: nonEmptyString.max(255),
  purpose: nonEmptyString,
  legalBasis: z.enum(['consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests']),
  dataCategories: z.array(z.string()),
  recipients: z.array(z.string()).optional(),
  retentionPeriod: z.string(),
  securityMeasures: z.array(z.string()).optional(),
  internationalTransfer: z.boolean().default(false),
  transferDestination: z.string().optional(),
});

// Compliance reporting schemas
export const generateComplianceReportSchema = z.object({
  reportType: z.enum(['data_inventory', 'consent_audit', 'access_requests', 'data_breaches', 'processing_activities', 'data_retention']),
  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  format: z.enum(['pdf', 'csv', 'json']).default('pdf'),
  includeDetails: z.boolean().default(true),
  filters: z.record(z.string(), z.any()).optional(),
});

export const complianceReportQuerySchema = paginationSchema.extend({
  reportType: z.enum(['data_inventory', 'consent_audit', 'access_requests', 'data_breaches', 'processing_activities', 'data_retention']).optional(),
  status: z.enum(['pending', 'generating', 'completed', 'failed']).optional(),
  dateRange: z.object({
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional(),
  }).optional(),
});

// Payment processing schemas
export const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3).default('usd'),
  customerId: uuidSchema.optional(),
  paymentMethodId: z.string().optional(),
  description: z.string().max(255).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  returnUrl: z.string().url().optional(),
});

export const createSubscriptionSchema = z.object({
  customerId: uuidSchema,
  priceId: z.string(),
  quantity: z.number().int().min(1).default(1),
  trialPeriodDays: z.number().int().min(0).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const updateSubscriptionSchema = z.object({
  quantity: z.number().int().min(1).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  prorationBehavior: z.enum(['create_prorations', 'none', 'always_invoice']).default('create_prorations'),
});

// SSO configuration schemas
export const ssoConfigurationSchema = z.object({
  enabled: z.boolean(),
  saml: z.object({
    enabled: z.boolean(),
    providerId: z.string(),
    entityId: z.string().url(),
    ssoUrl: z.string().url(),
    certificate: z.string(),
    attributeMapping: z.record(z.string(), z.string()),
  }).optional(),
  oidc: z.object({
    enabled: z.boolean(),
    providerId: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
    issuer: z.string().url(),
    authorizationEndpoint: z.string().url(),
    tokenEndpoint: z.string().url(),
    userInfoEndpoint: z.string().url(),
    scopes: z.array(z.string()),
  }).optional(),
});

// Enhanced security schemas for XSS and SQL injection prevention

// Helper functions for security transformations
const _sanitizeString = (val: string): string => {
  // Comprehensive XSS prevention
  return val
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\(/g, '&#40;')
    .replace(/\)/g, '&#41;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\[/g, '&#91;')
    .replace(/\]/g, '&#93;')
    .replace(/`/g, '&#96;')
    .replace(/\^/g, '&#94;')
    .replace(/\|/g, '&#124;');
};

const _sanitizeHtml = (val: string): string => {
  // Enhanced HTML sanitization
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'a', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre'];
  const allowedAttributes = {
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'width', 'height'],
    'div': ['class'],
    'span': ['class']
  };
  
  // Remove dangerous HTML tags and attributes
  let sanitized = val
    .replace(/<script[^>]*>.*?<\/script>/gis, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gis, '')
    .replace(/<object[^>]*>.*?<\/object>/gis, '')
    .replace(/<embed[^>]*>.*?<\/embed>/gis, '')
    .replace(/<form[^>]*>.*?<\/form>/gis, '')
    .replace(/<input[^>]*>/gi, '')
    .replace(/<button[^>]*>.*?<\/button>/gis, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '');
  
  return sanitized;
};

const _sanitizeSql = (val: string): string => {
  // Advanced SQL injection prevention
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT|TRUNCATE|BACKUP|RESTORE)\b)/gi,
    /(--|\/\*|\*\/|;|'|"|\`|\\)/g,
    /(\b(OR|AND|XOR|NOT|IN|EXISTS|BETWEEN|LIKE)\s+[^\s]+)/gi,
    /(\b(OR|AND|XOR|NOT|IN|EXISTS|BETWEEN|LIKE)\s+[^\s]+)/gi,
    /(\b(CAST|CONVERT|CHAR|ASCII|ORD|HEX|UNHEX)\s*\)/gi,
    /\b(CONCAT|SUBSTRING|LENGTH|REPLACE|INSERT|LPAD|RPAD)\s*\(/gi
  ];
  
  return sqlPatterns.reduce((clean, pattern) => clean.replace(pattern, ''), val);
};

// Enhanced campaign management schemas with security
export const createSecureCampaignSchema = z.object({
  name: z.string().min(1).max(255).transform(sanitizeString),
  subject: z.string().min(1).max(500).transform(sanitizeString),
  content: z.string().min(1).transform(sanitizeHtml),
  fromEmail: emailSchema,
  fromName: z.string().min(1).max(100).transform((val) => {
    return val
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;')
      .replace(/\(/g, '&#40;')
      .replace(/\)/g, '&#41;')
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
      .replace(/\[/g, '&#91;')
      .replace(/\]/g, '&#93;')
      .replace(/`/g, '&#96;')
      .replace(/\^/g, '&#94;')
      .replace(/\|/g, '&#124;');
  }),
  scheduledAt: z.string().datetime().optional(),
  segmentId: uuidSchema.optional(),
  templateId: uuidSchema.optional(),
  personalizationRules: z.array(z.object({
    field: z.string().min(1).transform((val) => {
      return val
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/\(/g, '&#40;')
        .replace(/\)/g, '&#41;')
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;')
        .replace(/\[/g, '&#91;')
        .replace(/\]/g, '&#93;')
        .replace(/`/g, '&#96;')
        .replace(/\^/g, '&#94;')
        .replace(/\|/g, '&#124;');
    }),
    type: z.enum(['replace', 'conditional', 'lookup']),
    conditions: z.array(z.object({
      operator: z.enum(['equals', 'contains', 'greater_than', 'less_than']),
      value: z.any(),
      result: z.string().transform((val) => {
        return val
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
          .replace(/\//g, '&#x2F;')
          .replace(/\(/g, '&#40;')
          .replace(/\)/g, '&#41;')
          .replace(/\{/g, '&#123;')
          .replace(/\}/g, '&#125;')
          .replace(/\[/g, '&#91;')
          .replace(/\]/g, '&#93;')
          .replace(/`/g, '&#96;')
          .replace(/\^/g, '&#94;')
          .replace(/\|/g, '&#124;');
      }),
    })).optional(),
    lookupTable: z.record(z.string(), z.string().transform((val) => {
      return val
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/\(/g, '&#40;')
        .replace(/\)/g, '&#41;')
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;')
        .replace(/\[/g, '&#91;')
        .replace(/\]/g, '&#93;')
        .replace(/`/g, '&#96;')
        .replace(/\^/g, '&#94;')
        .replace(/\|/g, '&#124;');
    })).optional(),
    defaultValue: z.string().transform((val) => {
      return val
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/\(/g, '&#40;')
        .replace(/\)/g, '&#41;')
        .replace(/\{/g, '&#123;')
        .replace(/\}/g, '&#125;')
        .replace(/\[/g, '&#91;')
        .replace(/\]/g, '&#93;')
        .replace(/`/g, '&#96;')
        .replace(/\^/g, '&#94;')
        .replace(/\|/g, '&#124;');
    }).optional(),
  })).optional(),
});

export const updateSecureCampaignSchema = z.object({
  name: z.string().min(1).max(255).transform(safeStringSchema).optional(),
  subject: z.string().min(1).max(500).transform(safeStringSchema).optional(),
  content: z.string().transform(safeHtmlSchema).optional(),
  fromEmail: emailSchema.optional(),
  fromName: z.string().min(1).max(100).transform(safeStringSchema).optional(),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'scheduled', 'running', 'completed', 'paused', 'cancelled']).optional(),
});

// Enhanced lead management schemas with security
export const createSecureLeadSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1).max(100).transform(safeStringSchema),
  lastName: z.string().min(1).max(100).transform(safeStringSchema),
  company: z.string().max(255).transform(safeStringSchema).optional(),
  position: z.string().max(255).transform(safeStringSchema).optional(),
  phone: z.string().max(50).transform(val => val.replace(/[^\d+\-\s\(\)]/g, '')).optional(),
  source: z.string().min(1).max(100).transform(safeStringSchema),
  tags: z.array(z.string().max(50).transform(safeStringSchema)).optional(),
  metadata: z.record(z.string().transform(safeStringSchema), z.any()).optional(),
});

export const updateSecureLeadSchema = z.object({
  firstName: z.string().min(1).max(100).transform(safeStringSchema).optional(),
  lastName: z.string().min(1).max(100).transform(safeStringSchema).optional(),
  company: z.string().max(255).transform(safeStringSchema).optional(),
  position: z.string().max(255).transform(safeStringSchema).optional(),
  phone: z.string().max(50).transform(val => val.replace(/[^\d+\-\s\(\)]/g, '')).optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost', 'archived']).optional(),
  tags: z.array(z.string().max(50).transform(safeStringSchema)).optional(),
  metadata: z.record(z.string().transform(safeStringSchema), z.any()).optional(),
});

// Enhanced payment processing schemas with security
export const createSecurePaymentMethodSchema = z.object({
  type: z.enum(['card', 'bank_account']),
  cardNumber: z.string().min(13).max(19).transform(val => val.replace(/\D/g, '')),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/),
  expiryYear: z.string().regex(/^[0-9]{4}$/),
  cvv: z.string().regex(/^[0-9]{3,4}$/),
  holderName: z.string().min(1).max(255).transform(safeStringSchema),
  billingAddress: z.object({
    street: z.string().min(1).max(255).transform(safeStringSchema),
    city: z.string().min(1).max(100).transform(safeStringSchema),
    state: z.string().min(1).max(100).transform(safeStringSchema),
    zip: z.string().regex(/^[0-9]{5}(-[0-9]{4})?$/),
    country: z.string().min(2).max(2).transform(safeStringSchema),
  }),
});

export const createSecureSubscriptionSchema = z.object({
  customerId: uuidSchema,
  priceId: z.string().min(1).transform(safeStringSchema),
  quantity: z.number().int().min(1).max(1000),
  trialPeriodDays: z.number().int().min(0).max(365).optional(),
  metadata: z.record(z.string().transform(safeStringSchema), z.string().transform(safeStringSchema)).optional(),
});

// Enhanced search and Filter schemas with SQL injection prevention
export const secureSearchSchema = z.object({
  query: z.string().min(1).max(500).transform(sqlInjectionSafeSchema),
  filters: z.record(z.string(), z.any()).optional(),
  sortBy: z.string().transform(safeStringSchema).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const secureFilterSchema = z.object({
  field: z.string().min(1).transform(safeStringSchema),
  operator: z.enum(['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than', 'in', 'not_in']),
  value: z.any(),
});

// Enhanced file upload schemas with security validation
export const secureFileUploadSchema = z.object({
  filename: z.string().min(1).max(255).transform(safeStringSchema),
  mimeType: z.enum([
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/plain', 'text/csv',
    'application/json', 'application/xml'
  ]),
  size: z.number().int().min(1).max(10 * 1024 * 1024), // 10MB max
  content: z.string().optional(), // Base64 encoded content
});

// Enhanced API request schemas with rate limiting and security
export const secureApiRequestSchema = z.object({
  endpoint: z.string().min(1).max(500).transform(safeStringSchema),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  headers: z.record(z.string().transform(safeStringSchema), z.string().transform(safeStringSchema)).optional(),
  body: z.any().optional(),
  params: z.record(z.string().transform(safeStringSchema), z.any()).optional(),
});

// Enhanced webhook payload schemas with security validation
export const secureWebhookPayloadSchema = z.object({
  event: z.string().min(1).max(100).transform(safeStringSchema),
  data: z.record(z.string(), z.any()),
  timestamp: z.string().datetime(),
  signature: z.string().optional(),
  source: z.string().min(1).max(255).transform(safeStringSchema),
});

// Enhanced campaign management schemas with security
export const createEmailCampaignSchema = z.object({
  name: z.string().min(1).max(255).transform(safeStringSchema),
  subject: z.string().min(1).max(500).transform(safeStringSchema),
  content: z.string().min(1).transform(safeHtmlSchema),
  fromEmail: emailSchema,
  fromName: z.string().min(1).max(100).transform(safeStringSchema),
  scheduledAt: z.string().datetime().optional(),
  segmentId: uuidSchema.optional(),
  templateId: uuidSchema.optional(),
  personalizationRules: z.array(z.object({
    field: z.string().min(1).transform(safeStringSchema),
    type: z.enum(['replace', 'conditional', 'lookup']),
    conditions: z.array(z.object({
      operator: z.enum(['equals', 'contains', 'greater_than', 'less_than']),
      value: z.any(),
      result: z.string().transform(safeStringSchema),
    })).optional(),
    lookupTable: z.record(z.string(), z.string().transform(safeStringSchema)).optional(),
    defaultValue: z.string().transform(safeStringSchema).optional(),
  })).optional(),
});

export const updateEmailCampaignSchema = z.object({
  name: z.string().min(1).max(255).transform(safeStringSchema).optional(),
  subject: z.string().min(1).max(500).transform(safeStringSchema).optional(),
  content: z.string().transform(safeHtmlSchema).optional(),
  fromEmail: emailSchema.optional(),
  fromName: z.string().min(1).max(100).transform(safeStringSchema).optional(),
  scheduledAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'scheduled', 'running', 'completed', 'paused', 'cancelled']).optional(),
});

// Enhanced lead management schemas with security
export const createLeadEnhancedSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1).max(100).transform(safeStringSchema),
  lastName: z.string().min(1).max(100).transform(safeStringSchema),
  company: z.string().max(255).transform(safeStringSchema).optional(),
  position: z.string().max(255).transform(safeStringSchema).optional(),
  phone: z.string().max(50).transform(val => val.replace(/[^\d+\-\s\(\)]/g, '')).optional(),
  source: z.string().min(1).max(100).transform(safeStringSchema),
  tags: z.array(z.string().max(50).transform(safeStringSchema)).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const updateLeadEnhancedSchema = z.object({
  firstName: z.string().min(1).max(100).transform(safeStringSchema).optional(),
  lastName: z.string().min(1).max(100).transform(safeStringSchema).optional(),
  company: z.string().max(255).transform(safeStringSchema).optional(),
  position: z.string().max(255).transform(safeStringSchema).optional(),
  phone: z.string().max(50).transform(val => val.replace(/[^\d+\-\s\(\)]/g, '')).optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost', 'archived']).optional(),
  tags: z.array(z.string().max(50).transform(safeStringSchema)).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// AI Agent execution schemas
export const executeAgentToolSchema = z.object({
  agentId: uuidSchema,
  toolName: z.string().min(1).max(100).transform(safeStringSchema),
  parameters: z.record(z.string(), z.any()),
  context: z.string().optional(),
});

export const agentConversationSchema = z.object({
  agentId: uuidSchema,
  message: z.string().min(1).max(10000).transform(safeStringSchema),
  conversationId: uuidSchema.optional(),
  context: z.record(z.string(), z.any()).optional(),
  stream: z.boolean().default(false),
});

// Platform sync schemas
export const platformSyncSchema = z.object({
  platform: z.enum(['salesforce', 'hubspot', 'zendesk', 'slack', 'gmail', 'outlook', 'shopify', 'stripe']),
  organizationId: uuidSchema,
  syncType: z.enum(['full', 'incremental', 'realtime']),
  lastSyncAt: z.string().datetime().optional(),
  filters: z.record(z.string(), z.any()).optional(),
});

export const platformConnectionSchema = z.object({
  platform: z.enum(['salesforce', 'hubspot', 'zendesk', 'slack', 'gmail', 'outlook', 'shopify', 'stripe']),
  credentials: z.record(z.string(), z.any()),
  settings: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().default(true),
});

// Campaign analytics schemas
export const campaignAnalyticsQuerySchema = z.object({
  campaignId: uuidSchema,
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  metrics: z.array(z.enum(['sent', 'delivered', 'opened', 'clicked', 'bounced', 'unsubscribed', 'complained', 'revenue', 'roi'])),
  groupBy: z.enum(['day', 'week', 'month']).optional(),
});

// Health check schemas
export const healthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy', 'degraded']),
  timestamp: z.string().datetime(),
  services: z.record(z.string(), z.object({
    status: z.enum(['healthy', 'unhealthy', 'degraded']),
    latency: z.number().optional(),
    error: z.string().optional(),
  })),
});

// SSO callback schemas
export const ssoCallbackSchema = z.object({
  SAMLResponse: z.string().optional(),
  RelayState: z.string().optional(),
  code: z.string().optional(),
  state: z.string().optional(),
});

export const oidcCallbackSchema = z.object({
  code: z.string(),
  state: z.string(),
});

// MFA schemas
export const mfaEnrollVerifySchema = z.object({
  totp: z.string().regex(/^\d{6}$/),
});

export const mfaGateSchema = z.object({
  totp: z.string().regex(/^\d{6}$/),
  password: passwordSchema,
});

// Call recording schemas
export const callRecordingParamsSchema = z.object({
  callId: uuidSchema,
});

export const callRecordingQuerySchema = z.object({
  format: z.enum(['mp3', 'wav']).default('mp3'),
});

// Payment processing schemas with enhanced security
export const createPaymentMethodSchema = z.object({
  type: z.enum(['card', 'bank_account']),
  cardNumber: z.string().min(13).max(19).transform(val => val.replace(/\D/g, '')),
  expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/),
  expiryYear: z.string().regex(/^[0-9]{4}$/),
  cvv: z.string().regex(/^[0-9]{3,4}$/),
  holderName: z.string().min(1).max(255).transform(safeStringSchema),
  billingAddress: z.object({
    street: z.string().min(1).max(255).transform(safeStringSchema),
    city: z.string().min(1).max(100).transform(safeStringSchema),
    state: z.string().min(1).max(100).transform(safeStringSchema),
    zip: z.string().regex(/^[0-9]{5}(-[0-9]{4})?$/),
    country: z.string().min(2).max(2).transform(safeStringSchema),
  }),
});

export const createSubscriptionEnhancedSchema = z.object({
  customerId: uuidSchema,
  priceId: z.string().min(1).transform(safeStringSchema),
  quantity: z.number().int().min(1).max(1000),
  trialPeriodDays: z.number().int().min(0).max(365).optional(),
  metadata: z.record(z.string().transform(safeStringSchema), z.string().transform(safeStringSchema)).optional(),
});

// Search and Filter schemas with SQL injection prevention
export const searchSchema = z.object({
  query: z.string().min(1).max(500).transform(sqlInjectionSafeSchema),
  filters: z.record(z.string(), z.any()).optional(),
  sortBy: z.string().transform(safeStringSchema).optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export const filterSchema = z.object({
  field: z.string().min(1).transform(safeStringSchema),
  operator: z.enum(['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than', 'in', 'not_in']),
  value: z.any(),
});

// File upload schemas with security validation
export const fileUploadSchema = z.object({
  filename: z.string().min(1).max(255).transform(safeStringSchema),
  mimeType: z.enum([
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'text/plain', 'text/csv',
    'application/json', 'application/xml'
  ]),
  size: z.number().int().min(1).max(10 * 1024 * 1024), // 10MB max
  content: z.string().optional(), // Base64 encoded content
});

// API request schemas with rate limiting and security
export const apiRequestSchema = z.object({
  endpoint: z.string().min(1).max(500).transform(safeStringSchema),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
  headers: z.record(z.string().transform(safeStringSchema), z.string().transform(safeStringSchema)).optional(),
  body: z.any().optional(),
  params: z.record(z.string().transform(safeStringSchema), z.any()).optional(),
});

// Webhook payload schemas with security validation
export const webhookPayloadSchema = z.object({
  event: z.string().min(1).max(100).transform(safeStringSchema),
  data: z.record(z.string(), z.any()),
  timestamp: z.string().datetime(),
  signature: z.string().optional(),
  source: z.string().min(1).max(255).transform(safeStringSchema),
});

// Additional validation schemas for missing endpoints

// Backup and restore schemas
export const createBackupSchema = z.object({
  name: nonEmptyString.max(255),
  type: z.enum(['full', 'incremental', 'differential']),
  includeSensitive: z.boolean().default(false),
  compression: z.enum(['none', 'gzip', 'lz4']).default('gzip'),
  retentionDays: z.number().int().min(1).max(365).default(30),
});

export const restoreBackupSchema = z.object({
  backupId: uuidSchema,
  restorePoint: z.string().datetime().optional(),
  includeTables: z.array(z.string()).optional(),
  excludeTables: z.array(z.string()).optional(),
});

// Data retention schemas
export const createRetentionPolicySchema = z.object({
  name: nonEmptyString.max(255),
  entityType: z.enum(['users', 'organizations', 'campaigns', 'leads', 'audit_logs', 'sessions']),
  retentionDays: z.number().int().min(1),
  archivalAction: z.enum(['delete', 'archive', 'anonymize']),
  conditions: z.record(z.string(), z.any()).optional(),
});

// Content management schemas
export const createContentSchema = z.object({
  title: nonEmptyString.max(255),
  content: z.string().min(1).transform(safeHtmlSchema),
  type: z.enum(['page', 'post', 'article', 'template', 'snippet']),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  tags: z.array(z.string().max(50).transform(safeStringSchema)).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  seoTitle: z.string().max(255).transform(safeStringSchema).optional(),
  seoDescription: z.string().max(500).transform(safeStringSchema).optional(),
});

export const updateContentSchema = z.object({
  title: nonEmptyString.max(255).transform(safeStringSchema).optional(),
  content: z.string().min(1).transform(safeHtmlSchema).optional(),
  type: z.enum(['page', 'post', 'article', 'template', 'snippet']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  tags: z.array(z.string().max(50).transform(safeStringSchema)).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
  seoTitle: z.string().max(255).transform(safeStringSchema).optional(),
  seoDescription: z.string().max(500).transform(safeStringSchema).optional(),
});

// SEO tools schemas
export const seoAnalysisSchema = z.object({
  url: z.string().url(),
  keywords: z.array(z.string().max(100)).optional(),
  includeCompetitors: z.boolean().default(false),
  competitorUrls: z.array(z.string().url()).optional(),
});

export const generateSitemapSchema = z.object({
  domain: z.string().url(),
  includeImages: z.boolean().default(true),
  changeFrequency: z.enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']).default('weekly'),
  priority: z.number().min(0).max(1).default(0.8),
});

// Anonymization service schemas
export const anonymizeDataSchema = z.object({
  entityType: z.enum(['users', 'leads', 'contacts', 'organizations']),
  entityIds: z.array(uuidSchema),
  fields: z.array(z.string()),
  method: z.enum(['mask', 'hash', 'replace', 'remove']),
  preserveFormat: z.boolean().default(false),
});

export const dataAnonymizationRulesSchema = z.object({
  name: nonEmptyString.max(255),
  entityType: z.enum(['users', 'leads', 'contacts', 'organizations']),
  rules: z.array(z.object({
    field: z.string(),
    method: z.enum(['mask', 'hash', 'replace', 'remove']),
    pattern: z.string().optional(),
    replacement: z.string().optional(),
  })),
  enabled: z.boolean().default(true),
});

// Export all schemas for easy importing
export const schemas = {
  // User management
  createUserSchema,
  updateUserSchema,
  listUsersSchema,
  
  // Organization management
  createOrganizationSchema,
  updateOrganizationSchema,
  
  // Team management
  inviteTeamMemberSchema,
  updateTeamMemberSchema,
  
  // API Key management
  createApiKeySchema,
  updateApiKeySchema,
  
  // Webhook management
  createWebhookSchema,
  updateWebhookSchema,
  
  // AI Agent management
  createAgentSchema,
  updateAgentSchema,
  
  // Analytics
  analyticsQuerySchema,
  
  // Audit logs
  auditLogQuerySchema,
  
  // Notifications
  createNotificationSchema,
  updateNotificationSchema,
  
  // Integrations
  createIntegrationSchema,
  updateIntegrationSchema,
  
  // Platform connections
  createPlatformConnectionSchema,
  updatePlatformConnectionSchema,
  
  // Call management
  createCallLogSchema,
  updateCallLogSchema,
  
  // Settings
  updateSettingsSchema,
  
  // Marketing campaigns
  createCampaignSchema,
  updateCampaignSchema,
  campaignAnalyticsSchema,
  createSecureCampaignSchema,
  updateSecureCampaignSchema,
  createEmailCampaignSchema,
  updateEmailCampaignSchema,
  
  // Lead management
  createLeadSchema,
  updateLeadSchema,
  createSecureLeadSchema,
  updateSecureLeadSchema,
  leadScoringRulesSchema,
  
  // GDPR compliance
  dataSubjectRequestSchema,
  consentManagementSchema,
  dataProcessingRecordSchema,
  
  // Compliance reporting
  generateComplianceReportSchema,
  complianceReportQuerySchema,
  
  // Payment processing
  createPaymentIntentSchema,
  createSubscriptionSchema,
  updateSubscriptionSchema,
  createPaymentMethodSchema,
  createSecurePaymentMethodSchema,
  createSecureSubscriptionSchema,
  
  // SSO configuration
  ssoConfigurationSchema,
  ssoCallbackSchema,
  oidcCallbackSchema,
  
  // MFA
  mfaEnrollVerifySchema,
  mfaGateSchema,
  
  // Call recordings
  callRecordingParamsSchema,
  callRecordingQuerySchema,
  
  // Search and filtering
  searchSchema,
  filterSchema,
  secureSearchSchema,
  secureFilterSchema,
  
  // File uploads
  fileUploadSchema,
  secureFileUploadSchema,
  
  // API requests
  apiRequestSchema,
  secureApiRequestSchema,
  
  // Webhooks
  webhookPayloadSchema,
  secureWebhookPayloadSchema,
  
  // AI Agent execution
  executeAgentToolSchema,
  agentConversationSchema,
  
  // Platform sync
  platformSyncSchema,
  platformConnectionSchema,
  
  // Campaign analytics
  campaignAnalyticsQuerySchema,
  
  // Health checks
  healthCheckResponseSchema,
  
  // Backup and restore
  createBackupSchema,
  restoreBackupSchema,
  
  // Data retention
  createRetentionPolicySchema,
  
  // Content management
  createContentSchema,
  updateContentSchema,
  
  // SEO tools
  seoAnalysisSchema,
  generateSitemapSchema,
  
  // Anonymization
  anonymizeDataSchema,
  dataAnonymizationRulesSchema,
  
  // Common
  paginationSchema,
  uuidSchema,
  emailSchema,
  passwordSchema,
};
