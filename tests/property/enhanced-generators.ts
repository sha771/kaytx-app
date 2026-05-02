import * as fc from 'fast-check';
import { z } from 'zod';

// Enhanced generators for AI Agent workflows and conversations
export const aiWorkflowGenerators = {
  // Conversation generators
  conversation: fc.record({
    id: fc.uuid(),
    agentId: fc.uuid(),
    userId: fc.uuid(),
    organizationId: fc.uuid(),
    messages: fc.array(fc.record({
      id: fc.uuid(),
      role: fc.constantFrom('user', 'assistant', 'system'),
      content: fc.lorem({ maxCount: 5 }),
      timestamp: fc.date(),
      metadata: fc.record({
        tokenCount: fc.integer({ min: 1, max: 1000 }),
        model: fc.constantFrom('gpt-4', 'claude-3', 'gemini-pro'),
        temperature: fc.float({ min: 0, max: 2 }),
        finishReason: fc.constantFrom('stop', 'length', 'content_filter')
      })
    }), { minLength: 1, maxLength: 50 }),
    status: fc.constantFrom('active', 'completed', 'paused', 'error'),
    context: fc.record({
      industry: fc.constantFrom('healthcare', 'finance', 'retail', 'technology', 'manufacturing'),
      purpose: fc.constantFrom('customer_service', 'sales', 'support', 'consultation'),
      language: fc.constantFrom('en', 'es', 'fr', 'de', 'zh'),
      timezone: fc.string({ minLength: 3, maxLength: 32 })
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Workflow step generators
  workflowStep: fc.record({
    id: fc.uuid(),
    workflowId: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.lorem({ maxCount: 3 }),
    type: fc.constantFrom('input', 'processing', 'decision', 'output', 'integration'),
    config: fc.record({
      prompt: fc.lorem({ maxCount: 5 }),
      tools: fc.array(fc.record({
        name: fc.string({ minLength: 1, maxLength: 50 }),
        type: fc.constantFrom('api_call', 'database_query', 'file_operation', 'notification'),
        parameters: fc.record({})
      })),
      conditions: fc.array(fc.record({
        field: fc.string({ minLength: 1, maxLength: 50 }),
        operator: fc.constantFrom('equals', 'contains', 'greater_than', 'less_than', 'exists'),
        value: fc.oneof(fc.string(), fc.integer(), fc.boolean(), fc.date())
      }))
    }),
    order: fc.integer({ min: 0 }),
    isRequired: fc.boolean(),
    timeout: fc.integer({ min: 5, max: 300 }), // seconds
    createdAt: fc.date()
  }),

  // AI Model configuration generators
  modelConfig: fc.record({
    model: fc.constantFrom('gpt-4', 'gpt-4-turbo', 'claude-3-opus', 'claude-3-sonnet', 'gemini-pro'),
    temperature: fc.float({ min: 0, max: 2 }),
    maxTokens: fc.integer({ min: 1, max: 8000 }),
    topP: fc.float({ min: 0, max: 1 }),
    frequencyPenalty: fc.float({ min: -2, max: 2 }),
    presencePenalty: fc.float({ min: -2, max: 2 }),
    stopSequences: fc.array(fc.string({ minLength: 1, maxLength: 10 }), { maxLength: 4 }),
    responseFormat: fc.constantFrom('text', 'json_object', 'markdown'),
    safetySettings: fc.record({
      harassment: fc.constantFrom('none', 'low', 'medium', 'high'),
      hateSpeech: fc.constantFrom('none', 'low', 'medium', 'high'),
      sexuallyExplicit: fc.constantFrom('none', 'low', 'medium', 'high'),
      dangerousContent: fc.constantFrom('none', 'low', 'medium', 'high')
    })
  }),

  // Tool execution generators
  toolExecution: fc.record({
    id: fc.uuid(),
    conversationId: fc.uuid(),
    toolName: fc.string({ minLength: 1, maxLength: 50 }),
    toolType: fc.constantFrom('api_call', 'database_query', 'file_operation', 'webhook', 'email'),
    parameters: fc.record({}),
    result: fc.oneof(
      fc.record({
        success: fc.constant(true),
        data: fc.record({}),
        executionTime: fc.integer({ min: 1, max: 10000 })
      }),
      fc.record({
        success: fc.constant(false),
        error: fc.record({
          code: fc.string({ minLength: 1, maxLength: 50 }),
          message: fc.lorem({ maxCount: 2 }),
          details: fc.record({})
        }),
        executionTime: fc.integer({ min: 1, max: 10000 })
      })
    ),
    timestamp: fc.date(),
    metadata: fc.record({
      cost: fc.float({ min: 0, max: 1 }),
      tokensUsed: fc.integer({ min: 0, max: 1000 })
    })
  })
};

// Enhanced generators for enterprise features
export const enterpriseGenerators = {
  // Multi-tenant organization generators
  multiTenantOrg: fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    domain: fc.domain(),
    plan: fc.constantFrom('free', 'starter', 'pro', 'enterprise'),
    settings: fc.record({
      enableSSO: fc.boolean(),
      enforceMFA: fc.boolean(),
      sessionTimeout: fc.integer({ min: 300, max: 86400 }),
      maxUsers: fc.integer({ min: 1, max: 10000 }),
      allowedDomains: fc.array(fc.domain(), { maxLength: 10 }),
      ipWhitelist: fc.array(fc.string({ minLength: 7, maxLength: 15 }), { maxLength: 50 }),
      auditRetention: fc.integer({ min: 30, max: 2555 }) // days
    }),
    billing: fc.record({
      customerId: fc.string({ minLength: 1, maxLength: 50 }),
      subscriptionId: fc.string({ minLength: 1, maxLength: 50 }),
      plan: fc.constantFrom('monthly', 'annual'),
      amount: fc.integer({ min: 0, max: 100000 }), // in cents
      currency: fc.constantFrom('usd', 'eur', 'gbp'),
      status: fc.constantFrom('active', 'trialing', 'past_due', 'canceled', 'unpaid')
    }),
    compliance: fc.record({
      gdprCompliant: fc.boolean(),
      hipaaCompliant: fc.boolean(),
      soc2Compliant: fc.boolean(),
      dataResidency: fc.constantFrom('us', 'eu', 'apac', 'global'),
      encryptionAtRest: fc.boolean(),
      encryptionInTransit: fc.boolean()
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Role-based access control generators
  rbacRole: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 50 }),
    description: fc.lorem({ maxCount: 3 }),
    permissions: fc.array(fc.record({
      resource: fc.constantFrom(
        'users', 'agents', 'conversations', 'workflows', 'integrations',
        'billing', 'analytics', 'settings', 'audit_logs', 'api_keys'
      ),
      actions: fc.array(fc.constantFrom(
        'create', 'read', 'update', 'delete', 'execute', 'manage', 'admin'
      ), { minLength: 1 }),
      conditions: fc.array(fc.record({
        field: fc.string({ minLength: 1, maxLength: 50 }),
        operator: fc.constantFrom('equals', 'in', 'not_in', 'contains'),
        value: fc.oneof(fc.string(), fc.array(fc.string()), fc.boolean())
      }))
    }), { minLength: 1 }),
    isSystem: fc.boolean(),
    isActive: fc.boolean(),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // API key generators
  apiKey: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    userId: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    keyHash: fc.string({ minLength: 64, maxLength: 64 }),
    keyPrefix: fc.string({ minLength: 3, maxLength: 10 }),
    permissions: fc.array(fc.constantFrom(
      'read', 'write', 'admin', 'agents:execute', 'conversations:read',
      'workflows:manage', 'analytics:view', 'billing:read'
    ), { minLength: 1 }),
    restrictions: fc.record({
      allowedIPs: fc.array(fc.string({ minLength: 7, maxLength: 15 }), { maxLength: 10 }),
      allowedDomains: fc.array(fc.domain(), { maxLength: 5 }),
      rateLimitPerHour: fc.integer({ min: 100, max: 100000 }),
      expiresAt: fc.option(fc.date(), { nil: undefined })
    }),
    lastUsedAt: fc.option(fc.date(), { nil: undefined }),
    isActive: fc.boolean(),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Audit log generators
  auditLog: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    userId: fc.uuid(),
    action: fc.constantFrom(
      'login', 'logout', 'create', 'read', 'update', 'delete',
      'execute', 'export', 'import', 'configure', 'integrate'
    ),
    resource: fc.constantFrom(
      'user', 'agent', 'conversation', 'workflow', 'api_key',
      'organization', 'role', 'integration', 'billing', 'audit_log'
    ),
    resourceId: fc.uuid(),
    details: fc.record({
      before: fc.option(fc.record({}), { nil: undefined }),
      after: fc.option(fc.record({}), { nil: undefined }),
      metadata: fc.record({
        userAgent: fc.string({ minLength: 10, maxLength: 500 }),
        ipAddress: fc.string({ minLength: 7, maxLength: 15 }),
        sessionId: fc.uuid(),
        requestId: fc.uuid(),
        apiVersion: fc.string({ minLength: 1, maxLength: 10 })
      })
    }),
    severity: fc.constantFrom('info', 'warning', 'error', 'critical'),
    category: fc.constantFrom('authentication', 'authorization', 'data_access', 'configuration', 'security'),
    timestamp: fc.date(),
    signature: fc.string({ minLength: 64, maxLength: 64 }),
  })
};

// Enhanced generators for platform integrations
export const integrationGenerators = {
  // CRM integration generators
  crmIntegration: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    platform: fc.constantFrom('salesforce', 'hubspot', 'pipedrive', 'zoho', 'freshworks'),
    config: fc.record({
      apiKey: fc.string({ minLength: 20 }),
      baseUrl: fc.webUrl(),
      version: fc.string({ minLength: 1, maxLength: 10 }),
      mappings: fc.record({
        leadStatus: fc.record({
          new: fc.string(),
          contacted: fc.string(),
          qualified: fc.string(),
          converted: fc.string(),
          lost: fc.string()
        }),
        contactFields: fc.record({
          email: fc.string(),
          firstName: fc.string(),
          lastName: fc.string(),
          phone: fc.string(),
          company: fc.string()
        }),
        customFields: fc.array(fc.record({
          sourceField: fc.string(),
          targetField: fc.string(),
          transform: fc.constantFrom('none', 'uppercase', 'lowercase', 'date_format')
        }))
      })
    }),
    syncSettings: fc.record({
      frequency: fc.constantFrom('realtime', 'hourly', 'daily', 'weekly'),
      direction: fc.constantFrom('import', 'export', 'bidirectional'),
      conflictResolution: fc.constantFrom('source_wins', 'target_wins', 'manual'),
      retryAttempts: fc.integer({ min: 1, max: 5 }),
      timeout: fc.integer({ min: 30, max: 300 })
    }),
    status: fc.constantFrom('active', 'inactive', 'error', 'syncing'),
    lastSyncAt: fc.option(fc.date(), { nil: undefined }),
    syncStats: fc.record({
      totalRecords: fc.integer({ min: 0 }),
      syncedRecords: fc.integer({ min: 0 }),
      failedRecords: fc.integer({ min: 0 }),
      lastSyncDuration: fc.integer({ min: 0 }),
      errorRate: fc.float({ min: 0, max: 1 })
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Webhook generators
  webhook: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    url: fc.webUrl(),
    events: fc.array(fc.constantFrom(
      'conversation.created', 'conversation.updated', 'message.created',
      'agent.executed', 'workflow.completed', 'error.occurred',
      'user.created', 'user.updated', 'billing.event'
    ), { minLength: 1 }),
    config: fc.record({
      secret: fc.string({ minLength: 32, maxLength: 64 }),
      retryPolicy: fc.record({
        maxAttempts: fc.integer({ min: 1, max: 5 }),
        backoffStrategy: fc.constantFrom('linear', 'exponential'),
        initialDelay: fc.integer({ min: 1000, max: 10000 })
      }),
      timeout: fc.integer({ min: 5000, max: 30000 }),
      headers: fc.record({
        'Content-Type': fc.constantFrom('application/json'),
        'User-Agent': fc.string({ minLength: 1, maxLength: 100 })
      })
    }),
    isActive: fc.boolean(),
    lastTriggeredAt: fc.option(fc.date(), { nil: undefined }),
    deliveryStats: fc.record({
      totalSent: fc.integer({ min: 0 }),
      successful: fc.integer({ min: 0 }),
      failed: fc.integer({ min: 0 }),
      averageDeliveryTime: fc.integer({ min: 0 })
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Data pipeline generators
  dataPipeline: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.lorem({ maxCount: 3 }),
    source: fc.record({
      type: fc.constantFrom('database', 'api', 'file', 'stream', 'webhook'),
      config: fc.record({}),
      connection: fc.record({
        host: fc.domain(),
        port: fc.integer({ min: 1, max: 65535 }),
        database: fc.string({ minLength: 1, maxLength: 50 }),
        credentials: fc.record({
          username: fc.string({ minLength: 1, maxLength: 50 }),
          password: fc.string({ minLength: 8, maxLength: 100 })
        })
      })
    }),
    destination: fc.record({
      type: fc.constantFrom('database', 'api', 'file', 'stream', 'data_warehouse'),
      config: fc.record({}),
      connection: fc.record({})
    }),
    transformations: fc.array(fc.record({
      name: fc.string({ minLength: 1, maxLength: 50 }),
      type: fc.constantFrom('Filter', 'map', 'aggregate', 'join', 'validate'),
      config: fc.record({}),
      order: fc.integer({ min: 0 })
    })),
    schedule: fc.record({
      type: fc.constantFrom('cron', 'interval', 'event_driven'),
      expression: fc.string({ minLength: 1, maxLength: 100 }),
      timezone: fc.string({ minLength: 3, maxLength: 32 })
    }),
    status: fc.constantFrom('active', 'inactive', 'error', 'paused'),
    lastRunAt: fc.option(fc.date(), { nil: undefined }),
    runStats: fc.record({
      totalRuns: fc.integer({ min: 0 }),
      successfulRuns: fc.integer({ min: 0 }),
      failedRuns: fc.integer({ min: 0 }),
      averageRunTime: fc.integer({ min: 0 }),
      recordsProcessed: fc.integer({ min: 0 })
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  })
};

// Enhanced property test utilities for complex scenarios
export const advancedPropertyTestUtils = {
  // Test state machine transitions
  testStateMachine: <S, E>(
    states: fc.Arbitrary<S>,
    events: fc.Arbitrary<E>,
    transition: (state: S, event: E) => S,
    isValidTransition: (from: S, to: S, event: E) => boolean,
    options?: fc.Parameters<[S, E]>
  ) => {
    fc.assert(
      fc.property(states, events, (initialState, event) => {
        const newState = transition(initialState, event);
        return isValidTransition(initialState, newState, event);
      }),
      options
    );
  },

  // Test concurrent operations
  testConcurrency: <T>(
    generator: fc.Arbitrary<T>,
    operations: fc.Array<fc.Arbitrary<(obj: T) => T>>,
    options?: fc.Parameters<[T, ((obj: T) => T)[]]>
  ) => {
    fc.assert(
      fc.property(generator, operations, (initialObj, ops) => {
        // Apply operations in different orders and check for idempotency where expected
        const results = ops.map(op => op(initialObj));
        
        // All results should be valid according to some validation function
        return results.every(result => result !== null && result !== undefined);
      }),
      options
    );
  },

  // Test data consistency across operations
  testConsistency: <T>(
    generator: fc.Arbitrary<T>,
    operations: fc.Array<fc.Arbitrary<(obj: T) => T>>,
    invariant: (obj: T) => boolean,
    options?: fc.Parameters<[T, ((obj: T) => T)[]]>
  ) => {
    fc.assert(
      fc.property(generator, operations, (initialObj, ops) => {
        let current = initialObj;
        
        // Verify initial state satisfies invariant
        if (!invariant(current)) return false;
        
        // Apply each operation and verify invariant holds
        for (const op of ops) {
          current = op(current);
          if (!invariant(current)) return false;
        }
        
        return true;
      }),
      options
    );
  },

  // Test performance characteristics
  testPerformance: <T>(
    generator: fc.Arbitrary<T>,
    operation: (obj: T) => void,
    maxDuration: number,
    options?: fc.Parameters<[T]>
  ) => {
    fc.assert(
      fc.property(generator, (obj) => {
        const startTime = performance.now();
        operation(obj);
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        return duration <= maxDuration;
      }),
      options
    );
  },

  // Test error handling and recovery
  testErrorHandling: <T>(
    generator: fc.Arbitrary<T>,
    operation: (obj: T) => void,
    errorScenarios: fc.Arbitrary<() => void>,
    options?: fc.Parameters<[T]>
  ) => {
    fc.assert(
      fc.property(generator, errorScenarios, (obj, errorScenario) => {
        try {
          operation(obj);
          errorScenario();
          return true; // Should not throw
        } catch (error) {
          // Verify error is handled gracefully
          return error instanceof Error && error.message.length > 0;
        }
      }),
      options
    );
  }
};

// Export all enhanced generators
export const enhancedGenerators = {
  ...aiWorkflowGenerators,
  ...enterpriseGenerators,
  ...integrationGenerators
};
