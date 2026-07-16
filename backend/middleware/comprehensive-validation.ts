import { z } from 'zod';

/**
 * Comprehensive input validation schemas
 */
export const validationSchemas = {
  // User-related validation
  userRegistration: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain uppercase letter')
      .regex(/[a-z]/, 'Password must contain lowercase letter')
      .regex(/[0-9]/, 'Password must contain number')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain special character'),
    firstName: z.string().min(1, 'First name required').max(50, 'First name too long'),
    lastName: z.string().min(1, 'Last name required').max(50, 'Last name too long'),
  }),

  userLogin: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password required'),
    deviceId: z.string().optional(),
    totp: z.string().regex(/^\d{6}$/, 'Invalid TOTP format').optional(),
    recoveryCode: z.string().regex(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/i, 'Invalid recovery code format').optional(),
  }),

  // Payment validation
  paymentIntent: z.object({
    amount: z.number().min(0.50, 'Minimum amount is $0.50').max(999999.99, 'Maximum amount exceeded'),
    currency: z.string().length(3, 'Invalid currency format').regex(/^[A-Z]{3}$/, 'Currency must be 3 uppercase letters'),
    paymentMethodId: z.string().uuid('Invalid payment method ID').optional(),
    invoiceId: z.string().uuid('Invalid invoice ID').optional(),
    description: z.string().max(255, 'Description too long').optional(),
    confirmImmediately: z.boolean().default(false),
  }),

  // Platform integration validation
  platformConnection: z.object({
    platform: z.string().min(1).max(32).regex(/^[a-z0-9_-]+$/i, 'Invalid platform name'),
    credentials: z.record(z.string(), z.any()).refine(
      (creds) => Object.keys(creds).length > 0,
      'Credentials required'
    ),
    settings: z.record(z.string(), z.any()).optional(),
  }),

  // API key validation
  apiKeyCreate: z.object({
    name: z.string().min(1).max(100, 'Name must be 1-100 characters'),
    permissions: z.array(z.string()).min(1, 'At least one permission required'),
    expiresAt: z.string().datetime().optional().refine(
      (date) => !date || new Date(date) > new Date(),
      'Expiration date must be in the future'
    ),
  }),

  // CSRF token validation
  csrfToken: z.object({
    sessionId: z.string().min(1).max(128).regex(/^[A-Za-z0-9_-]+$/, 'Invalid session ID format').optional(),
  }),

  // Organization validation
  organizationCreate: z.object({
    name: z.string().min(1).max(100, 'Name must be 1-100 characters'),
    slug: z.string().min(1).max(50).regex(/^[a-z0-9_-]+$/, 'Slug must contain only lowercase letters, numbers, hyphens, and underscores'),
    domain: z.string().optional().refine(
      (domain) => !domain || /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(domain),
      'Invalid domain format'
    ),
  }),

  // Audit log validation
  auditQuery: z.object({
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    userId: z.string().uuid().optional(),
    action: z.string().optional(),
    resource: z.string().optional(),
    limit: z.number().int().min(1).max(1000).default(100),
    offset: z.number().int().min(0).default(0),
  }).refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    'Start date must be before end date'
  ),

  // Webhook validation
  webhookCreate: z.object({
    url: z.string().url('Invalid webhook URL'),
    events: z.array(z.string()).min(1, 'At least one event required'),
    secret: z.string().min(8, 'Webhook secret must be at least 8 characters').optional(),
    active: z.boolean().default(true),
  }),

  // MFA validation
  mfaSetup: z.object({
    totp: z.string().regex(/^\d{6}$/, 'TOTP must be 6 digits'),
  }),

    // Email campaign validation
  emailCampaignCreate: z.object({
    name: z.string().min(1, 'Campaign name required').max(100, 'Name too long'),
    subject: z.string().min(1, 'Subject required').max(200, 'Subject too long'),
    content: z.string().min(1, 'Content required'),
    recipientList: z.array(z.string().email()).min(1, 'At least one recipient required'),
    scheduledAt: z.string().datetime().optional(),
    metadata: z.record(z.any()).optional(),
  }),

  campaignQuery: z.object({
    status: z.enum(['draft', 'scheduled', 'sent', 'completed', 'failed']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  // Lead validation
  leadCreate: z.object({
    firstName: z.string().min(1, 'First name required').max(50, 'First name too long'),
    lastName: z.string().min(1, 'Last name required').max(50, 'Last name too long'),
    email: z.string().email('Invalid email format'),
    phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone format').optional(),
    company: z.string().max(100, 'Company name too long').optional(),
    status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional().default('new'),
    source: z.string().max(50, 'Source too long').optional(),
    metadata: z.record(z.any()).optional(),
  }),

  leadQuery: z.object({
    status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
    source: z.string().optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  leadUpdate: z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/).optional(),
    company: z.string().max(100).optional(),
    status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost']).optional(),
    metadata: z.record(z.any()).optional(),
  }),

  // AI Agent validation
  aiAgentCreate: z.object({
    name: z.string().min(1, 'Agent name required').max(100, 'Name too long'),
    description: z.string().max(500, 'Description too long').optional(),
    type: z.enum(['chat', 'task', 'workflow', 'analysis']),
    model: z.string().min(1, 'Model required'),
    configuration: z.record(z.any()).optional(),
    capabilities: z.array(z.string()).optional(),
  }),

  agentQuery: z.object({
    type: z.enum(['chat', 'task', 'workflow', 'analysis']).optional(),
    status: z.enum(['active', 'inactive', 'training']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  agentChat: z.object({
    message: z.string().min(1, 'Message required').max(2000, 'Message too long'),
    context: z.record(z.any()).optional(),
    sessionId: z.string().uuid().optional(),
  }),

  // Platform connection validation
  platformConnectionEnhanced: z.object({
    platform: z.string().min(1, 'Platform required').max(50, 'Platform too long'),
    name: z.string().min(1, 'Connection name required').max(100, 'Name too long'),
    credentials: z.record(z.any()),
    configuration: z.record(z.any()).optional(),
    syncSettings: z.object({
      enabled: z.boolean().default(true),
      frequency: z.enum(['realtime', 'hourly', 'daily', 'weekly']).default('daily'),
      dataTypes: z.array(z.string()).default([]),
    }).optional(),
  }),

  agentCounselingAutoRespond: z.object({
    respondingAgentId: z.string().min(1).optional(),
    provider: z.enum(['openai', 'google']).optional(),
    model: z.string().min(1).optional(),
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().min(1).max(8000).optional(),
    status: z.enum(['in_progress', 'completed']).optional(),
  }),

  connectionQuery: z.object({
    platform: z.string().optional(),
    status: z.enum(['active', 'inactive', 'error']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  // Payment validation
  paymentConfirm: z.object({
    paymentIntentId: z.string().uuid('Invalid payment intent ID'),
    paymentMethodId: z.string().uuid('Invalid payment method ID').optional(),
  }),

  paymentMethodQuery: z.object({
    customerId: z.string().uuid('Invalid customer ID').optional(),
    type: z.enum(['card', 'bank_account']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
  }),

  // Invoice validation
  invoiceCreate: z.object({
    customerId: z.string().uuid('Invalid customer ID'),
    amount: z.number().min(0.01, 'Amount must be greater than 0'),
    currency: z.string().length(3, 'Invalid currency format'),
    dueDate: z.string().datetime('Invalid due date'),
    items: z.array(z.object({
      description: z.string().min(1, 'Item description required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      unitPrice: z.number().min(0, 'Unit price must be non-negative'),
    })).min(1, 'At least one item required'),
    metadata: z.record(z.any()).optional(),
  }),

  invoiceQuery: z.object({
    customerId: z.string().uuid().optional(),
    status: z.enum(['draft', 'sent', 'paid', 'overdue', 'void']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  // GDPR validation
  gdprRequest: z.object({
    type: z.enum(['access', 'deletion', 'correction', 'portability']),
    userId: z.string().uuid('Invalid user ID').optional(),
    email: z.string().email('Invalid email format').optional(),
    reason: z.string().min(1, 'Reason required').max(500, 'Reason too long'),
  }),

  gdprQuery: z.object({
    type: z.enum(['access', 'deletion', 'correction', 'portability']).optional(),
    status: z.enum(['pending', 'processing', 'completed', 'rejected']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  // Analytics validation
  analyticsQuery: z.object({
    startDate: z.string().datetime('Invalid start date').optional(),
    endDate: z.string().datetime('Invalid end date').optional(),
    metrics: z.array(z.string()).optional(),
    dimensions: z.array(z.string()).optional(),
  }),

  // Multi-agent coordination validation
  multiAgentCoordinate: z.object({
    task: z.object({
      type: z.string().min(1, 'Task type required'),
      description: z.string().min(1, 'Task description required'),
      parameters: z.record(z.any()).optional(),
    }),
    agents: z.array(z.string().uuid()).min(1, 'At least one agent required'),
    coordinationStrategy: z.enum(['sequential', 'parallel', 'hierarchical']).default('parallel'),
    timeout: z.number().int().min(60).max(3600).optional().default(300),
  }),

  // UUID parameter validation
  uuidParam: z.object({
    id: z.string().uuid('Invalid ID format'),
  }),

    // Consent management validation
  consentPreferences: z.object({
    emailMarketing: z.boolean().default(false),
    analytics: z.boolean().default(false),
    personalization: z.boolean().default(false),
    thirdPartySharing: z.boolean().default(false),
    cookies: z.object({
      essential: z.boolean().default(true),
      functional: z.boolean().default(false),
      analytics: z.boolean().default(false),
      marketing: z.boolean().default(false),
    }).optional(),
    dataProcessing: z.object({
      profiling: z.boolean().default(false),
      automatedDecisionMaking: z.boolean().default(false),
    }).optional(),
  }),

  consentHistoryQuery: z.object({
    limit: z.number().int().min(1).max(100).optional().default(50),
    offset: z.number().int().min(0).optional().default(0),
    consentType: z.string().optional(),
  }),

  dataSubjectRequest: z.object({
    type: z.enum(['access', 'deletion', 'correction', 'portability', 'restriction']),
    reason: z.string().min(1, 'Reason required').max(500, 'Reason too long'),
    details: z.string().max(1000, 'Details too long').optional(),
  }),

  dataSubjectRequestQuery: z.object({
    type: z.enum(['access', 'deletion', 'correction', 'portability', 'restriction']).optional(),
    status: z.enum(['pending', 'processing', 'completed', 'rejected']).optional(),
    limit: z.number().int().min(1).max(100).optional().default(20),
    offset: z.number().int().min(0).optional().default(0),
  }),

  cookieConsent: z.object({
    essential: z.boolean().default(true),
    functional: z.boolean().default(false),
    analytics: z.boolean().default(false),
    marketing: z.boolean().default(false),
  }),

  consentWithdrawal: z.object({
    consents: z.array(z.string()).min(1, 'At least one consent type required'),
    reason: z.string().min(1, 'Reason required').max(500, 'Reason too long'),
  }),

  dataDeletion: z.object({
    reason: z.string().min(1, 'Reason required').max(500, 'Reason too long'),
    retentionPeriod: z.number().int().min(0).optional(),
    confirmIdentity: z.boolean().default(false),
  }),

  // Metrics query validation
  metricsQuery: z.object({
    timeRange: z.enum(['1m', '5m', '15m', '1h']).optional().default('5m'),
  }),

  // Alert query validation
  alertQuery: z.object({
    severity: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    resolved: z.boolean().optional(),
    limit: z.number().int().min(1).max(100).optional().default(50),
    offset: z.number().int().min(0).optional().default(0),
  }),

  // Endpoint query validation
  endpointQuery: z.object({
    limit: z.number().int().min(1).max(50).optional().default(10),
  }),

  // File upload validation
  fileUpload: z.object({
    filename: z.string().min(1).max(255, 'Filename too long').refine(
      (name) => !/^[.]/.test(name) && !/[<>:"|?*]/.test(name),
      'Invalid filename'
    ),
    size: z.number().max(10 * 1024 * 1024, 'File size must be less than 10MB'),
    mimeType: z.string().regex(/^[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-\^_.]*$/, 'Invalid MIME type'),
  }),

  agentCounselingMainToSub: z.object({
    mainAgentId: z.string().min(1),
    subagentId: z.string().min(1),
    counselingType: z.enum(['performance', 'development', 'coordination', 'crisis']),
    topic: z.string().min(1).max(200),
    details: z.object({
      issue: z.string().optional(),
      goals: z.array(z.string()).optional(),
      expectations: z.array(z.string()).optional(),
      timeline: z.string().optional(),
      resources: z.array(z.string()).optional(),
    }),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
      sessionType: z.enum(['one_time', 'ongoing', 'crisis', 'development']).optional(),
      deadline: z.string().datetime().optional(),
    }).optional(),
  }),

  agentCounselingSubToMain: z.object({
    subagentId: z.string().min(1),
    mainAgentId: z.string().min(1),
    requestType: z.enum(['guidance', 'support', 'escalation', 'resource_request']),
    topic: z.string().min(1).max(200),
    details: z.object({
      challenge: z.string().optional(),
      whatAttempted: z.array(z.string()).optional(),
      specificNeeds: z.array(z.string()).optional(),
      urgency: z.enum(['low', 'medium', 'high', 'critical']).optional(),
    }),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
      deadline: z.string().datetime().optional(),
    }).optional(),
  }),

  agentCounselingPeer: z.object({
    agentId1: z.string().min(1),
    agentId2: z.string().min(1),
    counselingType: z.enum(['collaboration', 'peer_review', 'knowledge_sharing', 'problem_solving']),
    topic: z.string().min(1).max(200),
    details: z.object({
      sharedChallenge: z.string().optional(),
      collaborationGoal: z.string().optional(),
      knowledgeArea: z.string().optional(),
      specificProblem: z.string().optional(),
    }),
    options: z.object({
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
      deadline: z.string().datetime().optional(),
    }).optional(),
  }),

  employeeCounselingToAgent: z.object({
    agentId: z.string().min(1),
    topic: z.string().min(1).max(200),
    question: z.string().min(1),
    options: z.object({
      type: z.enum(['advisory', 'collaborative', 'directive', 'analytical', 'escalation', 'delegation', 'mentorship', 'coordination', 'peer_review', 'performance_counseling']).optional(),
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      expectedDeliverable: z.string().optional(),
      deadline: z.string().datetime().optional(),
      tags: z.array(z.string()).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
    }).optional(),
  }),

  agentCounselingToEmployee: z.object({
    agentId: z.string().min(1),
    topic: z.string().min(1).max(200),
    question: z.string().min(1),
    options: z.object({
      type: z.enum(['advisory', 'collaborative', 'directive', 'analytical', 'escalation', 'delegation', 'mentorship', 'coordination', 'peer_review', 'performance_counseling']).optional(),
      priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']).optional(),
      expectedDeliverable: z.string().optional(),
      deadline: z.string().datetime().optional(),
      tags: z.array(z.string()).optional(),
      confidentiality: z.enum(['public', 'team', 'private', 'confidential']).optional(),
    }).optional(),
  }),

  agentCounselingRespond: z.object({
    respondingAgentId: z.string().min(1),
    response: z.object({
      status: z.enum(['pending', 'in_progress', 'completed', 'escalated', 'rejected', 'timeout']),
      answer: z.string().min(1),
      recommendations: z.array(z.string()).default([]),
      actionItems: z.array(z.object({
        id: z.string().min(1),
        description: z.string().min(1),
        assignedTo: z.string().min(1),
        dueDate: z.string().datetime().optional(),
        priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']),
        status: z.enum(['pending', 'in_progress', 'completed']),
      })).optional(),
      deliverables: z.array(z.object({
        id: z.string().min(1),
        type: z.enum(['report', 'analysis', 'recommendation', 'code', 'content', 'data', 'strategy']),
        title: z.string().min(1),
        content: z.string().min(1),
        format: z.enum(['json', 'markdown', 'text', 'html', 'structured']),
      })).optional(),
      confidence: z.number().min(0).max(1),
      reasoning: z.string().min(1),
      caveats: z.array(z.string()).default([]),
      requiresFollowUp: z.boolean(),
      followUpQuestions: z.array(z.string()).optional(),
      suggestedNextSteps: z.array(z.string()).default([]),
      counselingGuidance: z.record(z.any()).optional(),
      escalateTo: z.array(z.string()).optional(),
      delegateTo: z.array(z.string()).optional(),
    }),
  }),

  employeeCounselingRespond: z.object({
    response: z.object({
      status: z.enum(['pending', 'in_progress', 'completed', 'escalated', 'rejected', 'timeout']),
      answer: z.string().min(1),
      recommendations: z.array(z.string()).default([]),
      actionItems: z.array(z.object({
        id: z.string().min(1),
        description: z.string().min(1),
        assignedTo: z.string().min(1),
        dueDate: z.string().datetime().optional(),
        priority: z.enum(['low', 'medium', 'high', 'critical', 'emergency']),
        status: z.enum(['pending', 'in_progress', 'completed']),
      })).optional(),
      deliverables: z.array(z.object({
        id: z.string().min(1),
        type: z.enum(['report', 'analysis', 'recommendation', 'code', 'content', 'data', 'strategy']),
        title: z.string().min(1),
        content: z.string().min(1),
        format: z.enum(['json', 'markdown', 'text', 'html', 'structured']),
      })).optional(),
      confidence: z.number().min(0).max(1),
      reasoning: z.string().min(1),
      caveats: z.array(z.string()).default([]),
      requiresFollowUp: z.boolean(),
      followUpQuestions: z.array(z.string()).optional(),
      suggestedNextSteps: z.array(z.string()).default([]),
      counselingGuidance: z.record(z.any()).optional(),
      escalateTo: z.array(z.string()).optional(),
      delegateTo: z.array(z.string()).optional(),
    }),
  }),

  agentCounselingSessionsQuery: z.object({
    agentId: z.string().optional(),
    scope: z.enum(['active', 'history']).optional(),
  }),

  multiAgentTaskCreate: z.object({
    type: z.enum(['collaboration', 'delegation', 'coordination', 'consensus']),
    priority: z.enum(['low', 'medium', 'high', 'critical']).optional().default('medium'),
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(5000),
    participantIds: z.array(z.string()).min(1).max(20),
    requiredCapabilities: z.array(z.string()).optional().default([]),
    context: z.record(z.any()).optional().default({}),
    deadline: z.string().datetime().optional(),
    strategy: z.enum(['sequential', 'parallel', 'hierarchical', 'adaptive']).optional(),
    dependencies: z.array(z.string()).optional().default([]),
    timeout: z.number().positive().optional(),
  }),
};

/**
 * Input sanitization functions
 */
export const sanitization = {
  text: (input: string): string => {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  html: (input: string): string => {
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  },

  sql: (input: string): string => {
    return input.replace(/['"\\;]/g, '');
  },

  filename: (input: string): string => {
    return input.replace(/[^a-zA-Z0-9._-]/g, '_');
  },
};

/**
 * Validation middleware factory
 */
export function validateInput(schema: z.ZodSchema, source: 'body' | 'query' | 'params' = 'body') {
  return async (c: any, next: any) => {
    try {
      let data;
      
      switch (source) {
        case 'query':
          data = c.req.query();
          break;
        case 'params':
          data = c.req.param();
          break;
        case 'body':
        default:
          data = await c.req.json().catch(() => ({}));
          break;
      }

      const validated = schema.parse(data);
      c.set(`validated${source.charAt(0).toUpperCase() + source.slice(1)}`, validated);
      
      await next();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const details = error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        
        return c.json({
          error: 'Validation failed',
          details,
        }, 400);
      }
      
      return c.json({
        error: 'Invalid input',
        message: error.message,
      }, 400);
    }
  };
}

export const validateBody = (schema: z.ZodSchema) => validateInput(schema, 'body');
export const validateQuery = (schema: z.ZodSchema) => validateInput(schema, 'query');
export const validateParams = (schema: z.ZodSchema) => validateInput(schema, 'params');
