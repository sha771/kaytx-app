import * as fc from 'fast-check';
import { z } from 'zod';

// Custom generators for domain objects
export const generators = {
  // User generators
  user: fc.record({
    id: fc.uuid(),
    email: fc.emailAddress(),
    firstName: fc.string({ minLength: 1, maxLength: 50 }),
    lastName: fc.string({ minLength: 1, maxLength: 50 }),
    organizationId: fc.uuid(),
    role: fc.constantFrom('admin', 'user', 'viewer'),
    isActive: fc.boolean(),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Organization generators
  organization: fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    domain: fc.domain(),
    plan: fc.constantFrom('free', 'pro', 'enterprise'),
    settings: fc.record({
      enableSSO: fc.boolean(),
      enforceMFA: fc.boolean(),
      sessionTimeout: fc.integer({ min: 300, max: 86400 })
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // AI Agent generators
  aiAgent: fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    description: fc.lorem({ maxCount: 3 }),
    organizationId: fc.uuid(),
    model: fc.constantFrom('gpt-4', 'claude-3', 'gemini-pro'),
    temperature: fc.float({ min: 0, max: 2 }),
    maxTokens: fc.integer({ min: 1, max: 4096 }),
    systemPrompt: fc.lorem({ maxCount: 5 }),
    tools: fc.array(fc.record({
      name: fc.string({ minLength: 1, maxLength: 50 }),
      description: fc.lorem({ maxCount: 2 }),
      enabled: fc.boolean(),
      config: fc.record({})
    })),
    isActive: fc.boolean(),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Email Campaign generators
  emailCampaign: fc.record({
    id: fc.uuid(),
    name: fc.string({ minLength: 1, maxLength: 100 }),
    subject: fc.string({ minLength: 1, maxLength: 200 }),
    content: fc.lorem({ maxCount: 10 }),
    organizationId: fc.uuid(),
    listId: fc.uuid(),
    status: fc.constantFrom('draft', 'scheduled', 'sending', 'sent', 'paused'),
    scheduledAt: fc.option(fc.date(), { nil: undefined }),
    sentAt: fc.option(fc.date(), { nil: undefined }),
    metrics: fc.record({
      totalSent: fc.integer({ min: 0 }),
      totalOpened: fc.integer({ min: 0 }),
      totalClicked: fc.integer({ min: 0 }),
      totalBounced: fc.integer({ min: 0 }),
      totalUnsubscribed: fc.integer({ min: 0 })
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Lead generators
  lead: fc.record({
    id: fc.uuid(),
    email: fc.emailAddress(),
    firstName: fc.string({ minLength: 1, maxLength: 50 }),
    lastName: fc.string({ minLength: 1, maxLength: 50 }),
    company: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: undefined }),
    position: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: undefined }),
    phone: fc.option(fc.string({ minLength: 10, maxLength: 20 }), { nil: undefined }),
    organizationId: fc.uuid(),
    status: fc.constantFrom('new', 'contacted', 'qualified', 'converted', 'lost'),
    source: fc.constantFrom('website', 'referral', 'social', 'email', 'paid'),
    score: fc.integer({ min: 0, max: 100 }),
    leadTemperature: fc.constantFrom('cold', 'warm', 'hot'),
    lifecycleStage: fc.constantFrom('lead', 'mql', 'sql', 'opportunity', 'customer'),
    ipWhitelist: fc.array(fc.string({ minLength: 7, maxLength: 15 }), { maxLength: 50 }),
    tags: fc.array(fc.string({ minLength: 1, maxLength: 30 })),
    metadata: fc.record({}),
    assignedTo: fc.option(fc.uuid(), { nil: undefined }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Payment generators
  payment: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    userId: fc.uuid(),
    amount: fc.integer({ min: 100, max: 100000 }), // in cents
    currency: fc.constantFrom('usd', 'eur', 'gbp'),
    status: fc.constantFrom('pending', 'processing', 'succeeded', 'failed', 'cancelled'),
    paymentMethod: fc.constantFrom('card', 'bank_transfer', 'crypto'),
    stripePaymentIntentId: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
    metadata: fc.record({}),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // GDPR Request generators
  gdprRequest: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    userId: fc.uuid(),
    email: fc.emailAddress(),
    type: fc.constantFrom('data_export', 'data_deletion', 'data_correction'),
    status: fc.constantFrom('pending', 'processing', 'completed', 'rejected'),
    requestedAt: fc.date(),
    processedAt: fc.option(fc.date(), { nil: undefined }),
    processedBy: fc.option(fc.uuid(), { nil: undefined }),
    notes: fc.option(fc.lorem({ maxCount: 3 }), { nil: undefined }),
    metadata: fc.record({})
  }),

  // Platform Sync generators
  platformSync: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    platform: fc.constantFrom('salesforce', 'hubspot', 'pipedrive', 'zoho'),
    syncType: fc.constantFrom('bidirectional', 'import_only', 'export_only'),
    config: fc.record({
      apiKey: fc.string({ minLength: 20 }),
      baseUrl: fc.webUrl(),
      mapping: fc.record({
        leadStatus: fc.record({}),
        contactFields: fc.record({})
      })
    }),
    lastSyncAt: fc.option(fc.date(), { nil: undefined }),
    isActive: fc.boolean(),
    syncStats: fc.record({
      totalRecords: fc.integer({ min: 0 }),
      syncedRecords: fc.integer({ min: 0 }),
      failedRecords: fc.integer({ min: 0 }),
      lastSyncDuration: fc.integer({ min: 0 }) // in seconds
    }),
    createdAt: fc.date(),
    updatedAt: fc.date()
  }),

  // Audit Trail generators
  auditTrail: fc.record({
    id: fc.uuid(),
    organizationId: fc.uuid(),
    userId: fc.uuid(),
    action: fc.constantFrom('create', 'read', 'update', 'delete', 'login', 'logout'),
    resource: fc.constantFrom('user', 'lead', 'campaign', 'agent', 'payment'),
    resourceId: fc.uuid(),
    details: fc.record({}),
    ipAddress: fc.string({ minLength: 7, maxLength: 15 }), // IP address placeholder
    userAgent: fc.string({ minLength: 10, maxLength: 500 }),
    timestamp: fc.date(),
    signature: fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^a-f0-9]/g, '0')) // HMAC-SHA256 hex
  }),

  // Validation schema generators
  validationSchema: fc.record({
    name: fc.string({ minLength: 1, maxLength: 50 }),
    schema: fc.lorem({ maxCount: 2 }),
    rules: fc.array(fc.record({
      field: fc.string({ minLength: 1, maxLength: 50 }),
      type: fc.constantFrom('string', 'email', 'number', 'boolean', 'date'),
      required: fc.boolean(),
      minLength: fc.option(fc.integer({ min: 0 }), { nil: undefined }),
      maxLength: fc.option(fc.integer({ min: 1 }), { nil: undefined }),
      pattern: fc.option(fc.string({ minLength: 1 }), { nil: undefined })
    }))
  })
};

// Helper functions for property-based testing
export const propertyHelpers = {
  // Generate test data with constraints
  generateWithConstraints: <T>(generator: fc.Arbitrary<T>, constraints: Partial<T>) => {
    return fc.map(generator, (data) => ({ ...data, ...constraints }));
  },

  // Generate arrays with unique items based on a key
  generateUniqueArray: <T, K extends keyof T>(
    generator: fc.Arbitrary<T>,
    key: K,
    minLength = 1,
    maxLength = 10
  ) => {
    return fc.uniqueArray(generator, {
      minLength,
      maxLength,
      comparator: (a, b) => a[key] === b[key]
    });
  },

  // Generate dates within a range
  generateDateRange: (start: Date, end: Date) => {
    return fc.date({ min: start.getTime(), max: end.getTime() });
  },

  // Generate email variations for testing
  generateEmailVariations: () => {
    return fc.oneof(
      fc.emailAddress(),
      fc.constantFrom('invalid-email'),
      fc.constantFrom('test@'),
      fc.constantFrom('@domain.com'),
      fc.constantFrom('test@domain'),
      fc.constantFrom('')
    );
  },

  // Generate phone number variations
  generatePhoneVariations: () => {
    return fc.oneof(
      fc.string({ minLength: 10, maxLength: 20, pattern: /^\+?[1-9]\d{1,14}$/ }),
      fc.constantFrom('123'),
      fc.constantFrom('invalid-phone'),
      fc.constantFrom(''),
      fc.string({ minLength: 30, maxLength: 50 }) // Too long
    );
  }
};

// Property test utilities
export const propertyTestUtils = {
  // Test round-trip serialization
  testRoundTrip: <T>(
    generator: fc.Arbitrary<T>,
    serialize: (obj: T) => string,
    deserialize: (str: string) => T,
    options?: fc.Parameters<[T]>
  ) => {
    fc.assert(
      fc.property(generator, (obj) => {
        const serialized = serialize(obj);
        const deserialized = deserialize(serialized);
        return JSON.stringify(obj) === JSON.stringify(deserialized);
      }),
      options
    );
  },

  // Test idempotent operations
  testIdempotency: <T>(
    generator: fc.Arbitrary<T>,
    operation: (obj: T) => T,
    options?: fc.Parameters<[T]>
  ) => {
    fc.assert(
      fc.property(generator, (obj) => {
        const result1 = operation(obj);
        const result2 = operation(result1);
        return JSON.stringify(result1) === JSON.stringify(result2);
      }),
      options
    );
  },

  // Test commutative operations
  testCommutativity: <T>(
    generator: fc.Arbitrary<[T, T]>,
    operation: (a: T, b: T) => T,
    options?: fc.Parameters<[T, T]>
  ): void => {
    fc.assert(
      fc.property(generator, ([a, b]) => {
        const result1 = operation(a, b);
        const result2 = operation(b, a);
        return JSON.stringify(result1) === JSON.stringify(result2);
      }),
      options
    );
  }
};
