import { sql, eq, and, or, desc, asc, ne, gt, gte, lt, lte, like, ilike, inArray } from 'drizzle-orm';

// Re-export drizzle-orm operators for convenience
export { eq, and, or, desc, asc, ne, gt, gte, lt, lte, like, ilike, inArray };
import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, varchar, decimal, pgEnum, index, uniqueIndex, serial } from 'drizzle-orm/pg-core';

// Type alias for table parameter in index definitions
type TableRef = any;

// Vector column builder (for pgvector extension)
const vector = (name: string, config?: { dimensions?: number }): any => {
  // Return a builder that supports .notNull() and other chain methods
  const builder: any = {
    name,
    dimensions: config?.dimensions,
    dataType: 'vector',
    columnType: 'PgVector',
    // Add setName method required by drizzle-orm
    setName: function(columnName: string) {
      this.name = columnName;
      return this;
    },
    // Add build method for table creation
    build: function() {
      return {
        name: this.name,
        dataType: 'vector',
        dimensions: this.dimensions,
        notNull: this._notNull,
        default: this._default,
      };
    },
    // Add mock buildExtraConfigColumn to prevent TypeError in newer drizzle-orm versions
    buildExtraConfigColumn: function() {
      return {
        name: this.name,
        dataType: 'vector',
        dimensions: this.dimensions,
      };
    }
  };
  
  builder.notNull = function() {
    this._notNull = true;
    return this;
  };
  
  builder.default = function(val: any) {
    this._default = val;
    return this;
  };
  
  builder.primaryKey = function() {
    this._primaryKey = true;
    return this;
  };
  
  builder.buildForeignKeys = function() {
    return [];
  };
  
  return builder;
};

export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'enterprise_admin', 'super_admin']);
export const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'deleted', 'pending']);
export const planTypeEnum = pgEnum('plan_type', ['free', 'starter', 'professional', 'enterprise', 'custom']);
export const orgStatusEnum = pgEnum('org_status', ['active', 'suspended', 'trial', 'cancelled']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'past_due', 'cancelled', 'trial', 'paused']);
export const paymentMethodEnum = pgEnum('payment_method', ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wire', 'crypto']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'pending', 'paid', 'overdue', 'cancelled', 'refunded', 'failed']);
export const complianceTypeEnum = pgEnum('compliance_type', ['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa']);
export const dataRetentionStatusEnum = pgEnum('data_retention_status', ['active', 'archived', 'scheduled_deletion', 'deleted']);
export const integrationStatusEnum = pgEnum('integration_status', ['active', 'inactive', 'error', 'pending']);
export const notificationTypeEnum = pgEnum('notification_type', ['email', 'sms', 'push', 'in_app', 'webhook']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'critical']);
export const severityEnum = pgEnum('severity', ['info', 'warning', 'error', 'critical']);

// GDPR and Consent Management Enums
export const gdprRequestTypeEnum = pgEnum('gdpr_request_type', ['access', 'rectification', 'erasure', 'portability', 'restriction', 'objection']);
export const gdprRequestStatusEnum = pgEnum('gdpr_request_status', ['pending', 'processing', 'completed', 'rejected']);
export const consentStatusEnum = pgEnum('consent_status', ['granted', 'withdrawn', 'expired']);
export const consentPurposeEnum = pgEnum('consent_purpose', ['marketing', 'analytics', 'personalization', 'essential', 'third_party_sharing']);
export const dataBreachSeverityEnum = pgEnum('data_breach_severity', ['low', 'medium', 'high', 'critical']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }),
  phoneNumberEncrypted: jsonb('phone_number_encrypted'),
  avatar: text('avatar'),
  emailVerified: boolean('email_verified').default(false).notNull(),
  emailVerificationToken: text('email_verification_token'),
  emailVerificationExpires: timestamp('email_verification_expires'),
  passwordResetToken: text('password_reset_token'),
  passwordResetExpires: timestamp('password_reset_expires'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
  twoFactorSecret: text('two_factor_secret'),
  twoFactorRecoveryCodes: jsonb('two_factor_recovery_codes').default([]).notNull(),
  termsAccepted: boolean('terms_accepted').default(false).notNull(),
  termsAcceptedAt: timestamp('terms_accepted_at'),
  privacyPolicyAccepted: boolean('privacy_policy_accepted').default(false).notNull(),
  privacyPolicyAcceptedAt: timestamp('privacy_policy_accepted_at'),
  role: userRoleEnum('role').default('user').notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'set null' }),
  lastLoginAt: timestamp('last_login_at'),
  lastLoginIp: varchar('last_login_ip', { length: 50 }),
  failedLoginAttempts: integer('failed_login_attempts').default(0).notNull(),
  accountLockedUntil: timestamp('account_locked_until'),
  preferences: jsonb('preferences').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  addressEncrypted: jsonb('address_encrypted'),
  taxIdEncrypted: jsonb('tax_id_encrypted'),
  emergencyContactEncrypted: jsonb('emergency_contact_encrypted'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  orgIdx: index('org_idx').on(table.organizationId),
}));

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  logo: text('logo'),
  plan: planTypeEnum('plan').default('free').notNull(),
  status: orgStatusEnum('status').default('trial').notNull(),
  maxUsers: integer('max_users').default(5).notNull(),
  maxStorage: integer('max_storage').default(5120).notNull(),
  trialEndsAt: timestamp('trial_ends_at'),
  settings: jsonb('settings').default({
    enforceSSO: false,
    enforce2FA: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
      expiryDays: 90
    },
    sessionTimeout: 3600,
    ipWhitelist: [],
    dataRetentionDays: 90
  }).notNull(),
  billingEmail: varchar('billing_email', { length: 255 }).notNull(),
  billingEmailEncrypted: jsonb('billing_email_encrypted'),
  taxId: varchar('tax_id', { length: 100 }),
  taxIdEncrypted: jsonb('tax_id_encrypted'),
  address: jsonb('address'),
  addressEncrypted: jsonb('address_encrypted'),
  industry: varchar('industry', { length: 100 }),
  companySize: varchar('company_size', { length: 50 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  slugIdx: uniqueIndex('slug_idx').on(table.slug),
}));

export const invitations = pgTable('invitations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  invitedBy: uuid('invited_by').references(() => users.id, { onDelete: 'set null' }),
  expiresAt: timestamp('expires_at').notNull(),
  acceptedAt: timestamp('accepted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationMembers = pgTable('organization_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 50 }).default('member').notNull(),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgUserIdx: uniqueIndex('org_user_idx').on(table.organizationId, table.userId),
  orgIdx: index('org_members_org_idx').on(table.organizationId),
  userIdx: index('org_members_user_idx').on(table.userId),
}));

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(), // Store hashed token
  refreshToken: varchar('refresh_token', { length: 255 }).notNull().unique(), // Store hashed refresh token
  expiresAt: timestamp('expires_at').notNull(),
  refreshExpiresAt: timestamp('refresh_expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  deviceId: varchar('device_id', { length: 255 }),
  lastActivityAt: timestamp('last_activity_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  userIdx: index('user_idx').on(table.userId),
  tokenIdx: uniqueIndex('token_idx').on(table.token), // Index on hashed token
  expiresAtIdx: index('sessions_expires_at_idx').on(table.expiresAt),
  refreshExpiresAtIdx: index('sessions_refresh_expires_at_idx').on(table.refreshExpiresAt),
}));

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  plan: planTypeEnum('plan').notNull(),
  status: subscriptionStatusEnum('status').default('trial').notNull(),
  billingCycle: varchar('billing_cycle', { length: 20 }).notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  nextBillingDate: timestamp('next_billing_date'),
  cancelledAt: timestamp('cancelled_at'),
  cancellationReason: text('cancellation_reason'),
  cancellationFeedback: text('cancellation_feedback'),
  pausedAt: timestamp('paused_at'),
  pauseReason: text('pause_reason'),
  resumeDate: timestamp('resume_date'),
  resumedAt: timestamp('resumed_at'),
  trialEndsAt: timestamp('trial_ends_at'),
  features: jsonb('features').default({}).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  subscriptionId: uuid('subscription_id').references(() => subscriptions.id),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  status: invoiceStatusEnum('status').default('draft').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0').notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  dueDate: timestamp('due_date').notNull(),
  paidAt: timestamp('paid_at'),
  paymentMethod: paymentMethodEnum('payment_method'),
  paymentMethodId: varchar('payment_method_id', { length: 255 }),
  paymentMethodIdEncrypted: jsonb('payment_method_id_encrypted'),
  transactionId: varchar('transaction_id', { length: 255 }),
  transactionIdEncrypted: jsonb('transaction_id_encrypted'),
  items: jsonb('items').default([]).notNull(),
  notes: text('notes'),
  stripeInvoiceId: varchar('stripe_invoice_id', { length: 255 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  invoiceId: uuid('invoice_id').references(() => invoices.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  method: paymentMethodEnum('method').notNull(),
  transactionId: varchar('transaction_id', { length: 255 }),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  gatewayResponse: jsonb('gateway_response'),
  gatewayResponseEncrypted: jsonb('gateway_response_encrypted'),
  paymentMethodDetailsEncrypted: jsonb('payment_method_details_encrypted'),
  processedAt: timestamp('processed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  action: varchar('action', { length: 100 }).notNull(),
  resource: varchar('resource', { length: 100 }).notNull(),
  resourceId: uuid('resource_id'),
  changes: jsonb('changes'),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  status: varchar('status', { length: 20 }).default('success').notNull(),
  severity: severityEnum('severity').default('info').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  userIdx: index('audit_user_idx').on(table.userId),
  orgIdx: index('audit_org_idx').on(table.organizationId),
  timestampIdx: index('audit_timestamp_idx').on(table.timestamp),
}));

export const complianceReports = pgTable('compliance_reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: complianceTypeEnum('type').notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  reportData: jsonb('report_data').notNull(),
  generatedBy: uuid('generated_by').references(() => users.id),
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  findings: jsonb('findings').default([]).notNull(),
  recommendations: jsonb('recommendations').default([]).notNull(),
  fileUrl: text('file_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const dataRetentionPolicies = pgTable('data_retention_policies', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  dataType: varchar('data_type', { length: 100 }).notNull(),
  retentionDays: integer('retention_days').notNull(),
  status: dataRetentionStatusEnum('status').default('active').notNull(),
  autoDelete: boolean('auto_delete').default(false).notNull(),
  conditions: jsonb('conditions').default({}).notNull(),
  lastExecutedAt: timestamp('last_executed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const integrations = pgTable('integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  provider: varchar('provider', { length: 100 }).notNull(),
  status: integrationStatusEnum('status').default('inactive').notNull(),
  credentials: jsonb('credentials').notNull(),
  config: jsonb('config').default({}).notNull(),
  lastSyncAt: timestamp('last_sync_at'),
  syncFrequency: integer('sync_frequency').default(3600),
  errorCount: integer('error_count').default(0).notNull(),
  lastError: text('last_error'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const webhooks = pgTable('webhooks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  url: text('url').notNull(),
  events: jsonb('events').default([]).notNull(),
  secret: text('secret').notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  headers: jsonb('headers').default({}).notNull(),
  retryAttempts: integer('retry_attempts').default(3).notNull(),
  lastTriggeredAt: timestamp('last_triggered_at'),
  failureCount: integer('failure_count').default(0).notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  updatedBy: uuid('updated_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  key: text('key').notNull().unique(),
  hashedKey: text('hashed_key').notNull(),
  permissions: jsonb('permissions').default([]).notNull(),
  rateLimit: integer('rate_limit').default(1000).notNull(),
  expiresAt: timestamp('expires_at'),
  lastUsedAt: timestamp('last_used_at'),
  usageCount: integer('usage_count').default(0).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  type: notificationTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  message: text('message').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  read: boolean('read').default(false).notNull(),
  actionUrl: text('action_url'),
  metadata: jsonb('metadata').default({}).notNull(),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  userIdx: index('notification_user_idx').on(table.userId),
  readIdx: index('notification_read_idx').on(table.read),
}));

export const usageMetrics = pgTable('usage_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  metricType: varchar('metric_type', { length: 100 }).notNull(),
  value: decimal('value', { precision: 15, scale: 2 }).notNull(),
  unit: varchar('unit', { length: 50 }).notNull(),
  period: varchar('period', { length: 50 }).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgMetricIdx: index('usage_org_metric_idx').on(table.organizationId, table.metricType),
  recordedIdx: index('usage_recorded_idx').on(table.recordedAt),
}));

export const backups = pgTable('backups', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  size: integer('size'),
  location: text('location'),
  encryptionKey: text('encryption_key'),
  checksum: text('checksum'),
  retentionUntil: timestamp('retention_until'),
  error: text('error'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

export const teamMembers = pgTable('team_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 100 }).notNull(),
  permissions: jsonb('permissions').default([]).notNull(),
  invitedBy: uuid('invited_by').references(() => users.id),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  leftAt: timestamp('left_at'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
}, (table: TableRef) => ({
  userOrgIdx: uniqueIndex('user_org_idx').on(table.userId, table.organizationId),
}));

export const campaigns = pgTable('campaigns', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  spent: decimal('spent', { precision: 10, scale: 2 }).default('0').notNull(),
  config: jsonb('config').default({}).notNull(),
  metrics: jsonb('metrics').default({}).notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const contacts = pgTable('contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 50 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  company: varchar('company', { length: 255 }),
  position: varchar('position', { length: 100 }),
  tags: jsonb('tags').default([]).notNull(),
  customFields: jsonb('custom_fields').default({}).notNull(),
  source: varchar('source', { length: 100 }),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  lastContactedAt: timestamp('last_contacted_at'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  emailIdx: index('contact_email_idx').on(table.email),
  orgIdx: index('contact_org_idx').on(table.organizationId),
}));

export const deals = pgTable('deals', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  contactId: uuid('contact_id').references(() => contacts.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  stage: varchar('stage', { length: 100 }).notNull(),
  probability: integer('probability').default(0).notNull(),
  expectedCloseDate: timestamp('expected_close_date'),
  closedAt: timestamp('closed_at'),
  status: varchar('status', { length: 50 }).default('open').notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id),
  notes: text('notes'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  priority: priorityEnum('priority').default('medium').notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id),
  createdBy: uuid('created_by').references(() => users.id),
  dueDate: timestamp('due_date'),
  completedAt: timestamp('completed_at'),
  tags: jsonb('tags').default([]).notNull(),
  relatedTo: jsonb('related_to').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const aiMemories = pgTable('ai_memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  content: text('content').notNull(),
  importance: decimal('importance', { precision: 3, scale: 2 }).default('0').notNull(),
  tags: jsonb('tags').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgUserCreatedIdx: index('ai_memories_org_user_created_idx').on(table.organizationId, table.userId, table.createdAt),
  orgTypeIdx: index('ai_memories_org_type_idx').on(table.organizationId, table.type),
}));

export const agentConsultingSessions = pgTable('agent_consulting_sessions', {
  id: uuid('id').primaryKey(),
  correlationId: uuid('correlation_id').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  initiatorId: text('initiator_id').notNull(),
  participants: jsonb('participants').default([]).notNull(),
  session: jsonb('session').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  statusIdx: index('agent_consulting_sessions_status_idx').on(table.status),
  correlationIdx: index('agent_consulting_sessions_correlation_idx').on(table.correlationId),
}));

export const workflows = pgTable('workflows', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  trigger: jsonb('trigger').notNull(),
  actions: jsonb('actions').notNull(),
  conditions: jsonb('conditions').default([]).notNull(),
  status: varchar('status', { length: 50 }).default('inactive').notNull(),
  executionCount: integer('execution_count').default(0).notNull(),
  lastExecutedAt: timestamp('last_executed_at'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const workflowExecutions = pgTable('workflow_executions', {
  id: uuid('id').primaryKey().defaultRandom(),
  workflowId: uuid('workflow_id').references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 50 }).default('running').notNull(),
  startedAt: timestamp('started_at'),
  startTime: timestamp('start_time').defaultNow().notNull(),
  endTime: timestamp('end_time'),
  input: jsonb('input').notNull(),
  output: jsonb('output'),
  error: text('error'),
  steps: jsonb('steps').default([]).notNull(),
  currentStep: integer('current_step').default(0).notNull(),
  context: jsonb('context').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  workflowIdx: index('workflow_executions_workflow_idx').on(table.workflowId),
  orgIdx: index('workflow_executions_org_idx').on(table.organizationId),
  statusIdx: index('workflow_executions_status_idx').on(table.status),
}));

export const aiAgents = pgTable('ai_agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(),
  model: varchar('model', { length: 100 }),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  config: jsonb('config').default({}).notNull(),
  systemPrompt: text('system_prompt'),
  capabilities: jsonb('capabilities').default([]).notNull(),
  successRate: integer('success_rate').default(0).notNull(),
  totalCalls: integer('total_calls').default(0).notNull(),
  // Enhanced capabilities from video-prompts.md
  sensoryCapabilities: jsonb('sensory_capabilities').default({ vision: false, hearing: false, senses: [] }).notNull(),
  memoryConfig: jsonb('memory_config').default({ shortTerm: true, mediumTerm: true, longTerm: true, infinite: false, maxStorage: 'unlimited' }).notNull(),
  selfLearningEnabled: boolean('self_learning_enabled').default(false).notNull(),
  selfImprovementEnabled: boolean('self_improvement_enabled').default(false).notNull(),
  insightsConfig: jsonb('insights_config').default({ enabled: true, predictive: false, confidenceThreshold: 0.8 }).notNull(),
  summaryConfig: jsonb('summary_config').default({ autoGenerate: true, format: 'bullet', frequency: 'session' }).notNull(),
  a2aEndpoints: jsonb('a2a_endpoints').default([]).notNull(),
  d2dEndpoints: jsonb('d2d_endpoints').default([]).notNull(),
  learningMetrics: jsonb('learning_metrics').default({}).notNull(),
  improvementGoals: jsonb('improvement_goals').default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('ai_agents_org_idx').on(table.organizationId),
  typeIdx: index('ai_agents_type_idx').on(table.type),
  statusIdx: index('ai_agents_status_idx').on(table.status),
}));

export const aiAgentEvents = pgTable('ai_agent_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').references(() => aiAgents.id, { onDelete: 'set null' }),
  agentType: varchar('agent_type', { length: 80 }),
  agentName: varchar('agent_name', { length: 255 }),
  eventType: varchar('event_type', { length: 80 }).notNull(),
  status: varchar('status', { length: 30 }).default('success').notNull(),
  action: text('action').notNull(),
  details: jsonb('details').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('ai_agent_events_org_idx').on(table.organizationId),
  agentIdx: index('ai_agent_events_agent_idx').on(table.agentId),
  eventTypeIdx: index('ai_agent_events_event_type_idx').on(table.eventType),
  createdAtIdx: index('ai_agent_events_created_at_idx').on(table.createdAt),
}));

export const aiConversations = pgTable('ai_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  callId: uuid('call_id'),
  agentId: uuid('agent_id').references(() => aiAgents.id, { onDelete: 'set null' }),
  type: varchar('type', { length: 50 }),
  participants: jsonb('participants').default([]).notNull(),
  messages: jsonb('messages').default([]).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('ai_conversations_org_idx').on(table.organizationId),
  callIdx: index('ai_conversations_call_idx').on(table.callId),
  agentIdx: index('ai_conversations_agent_idx').on(table.agentId),
}));

export const secureConversations = pgTable('secure_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 20 }).notNull(),
  name: varchar('name', { length: 255 }),
  description: text('description'),
  visibility: varchar('visibility', { length: 20 }).default('private').notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('secure_conversations_org_idx').on(table.organizationId),
  typeIdx: index('secure_conversations_type_idx').on(table.type),
}));

export const secureConversationMembers = pgTable('secure_conversation_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').references(() => secureConversations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 20 }).default('member').notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  lastReadAt: timestamp('last_read_at'),
}, (table: TableRef) => ({
  conversationUserIdx: uniqueIndex('secure_conversation_members_conversation_user_idx').on(table.conversationId, table.userId),
  userIdx: index('secure_conversation_members_user_idx').on(table.userId),
  conversationIdx: index('secure_conversation_members_conversation_idx').on(table.conversationId),
}));

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id'),
  secureConversationId: uuid('secure_conversation_id').references(() => secureConversations.id, { onDelete: 'cascade' }),
  senderId: uuid('sender_id').references(() => users.id),
  recipientId: uuid('recipient_id').references(() => users.id),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  direction: varchar('direction', { length: 20 }).notNull(),
  status: varchar('status', { length: 50 }).default('sent').notNull(),
  readAt: timestamp('read_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  conversationIdx: index('message_conversation_idx').on(table.conversationId),
  secureConversationIdx: index('messages_secure_conversation_idx').on(table.secureConversationId),
  senderIdx: index('message_sender_idx').on(table.senderId),
}));

export const realtimeEvents = pgTable('realtime_events', {
  seq: serial('seq').primaryKey(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  channel: varchar('channel', { length: 100 }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  payload: jsonb('payload').default({}).notNull(),
  timestamp: integer('timestamp').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgSeqIdx: index('realtime_events_org_seq_idx').on(table.organizationId, table.seq),
  channelSeqIdx: index('realtime_events_channel_seq_idx').on(table.channel, table.seq),
  createdAtIdx: index('realtime_events_created_at_idx').on(table.createdAt),
}));

export const realtimeClientState = pgTable('realtime_client_state', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  lastAckSeq: integer('last_ack_seq').default(0).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgUserIdx: uniqueIndex('realtime_client_state_org_user_idx').on(table.organizationId, table.userId),
  orgIdx: index('realtime_client_state_org_idx').on(table.organizationId),
  userIdx: index('realtime_client_state_user_idx').on(table.userId),
}));

export const realtimePresence = pgTable('realtime_presence', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  isOnline: boolean('is_online').default(false).notNull(),
  lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgUserIdx: uniqueIndex('realtime_presence_org_user_idx').on(table.organizationId, table.userId),
  orgIdx: index('realtime_presence_org_idx').on(table.organizationId),
  userIdx: index('realtime_presence_user_idx').on(table.userId),
}));

// Company Brain Chat Tables

export const companyBrainChatConversations = pgTable('company_brain_chat_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  messageCount: integer('message_count').default(0).notNull(),
  tags: jsonb('tags').default([]).notNull(),
  context: jsonb('context').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_conversations_org_idx').on(table.organizationId),
  userIdx: index('company_brain_chat_conversations_user_idx').on(table.userId),
  statusIdx: index('company_brain_chat_conversations_status_idx').on(table.status),
  updatedAtIdx: index('company_brain_chat_conversations_updated_idx').on(table.updatedAt),
}));

export const companyBrainChatMessages = pgTable('company_brain_chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainChatConversations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 20 }).notNull(),
  content: text('content').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_messages_org_idx').on(table.organizationId),
  conversationIdx: index('company_brain_chat_messages_conversation_idx').on(table.conversationId),
  userIdx: index('company_brain_chat_messages_user_idx').on(table.userId),
  roleIdx: index('company_brain_chat_messages_role_idx').on(table.role),
  createdAtIdx: index('company_brain_chat_messages_created_idx').on(table.createdAt),
}));

export const companyBrainChatContext = pgTable('company_brain_chat_context', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainChatConversations.id, { onDelete: 'cascade' }).notNull(),
  department: varchar('department', { length: 100 }),
  project: varchar('project', { length: 100 }),
  topic: varchar('topic', { length: 100 }),
  recentQueries: jsonb('recent_queries').default([]).notNull(),
  knowledgeAreas: jsonb('knowledge_areas').default([]).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgUserConvIdx: uniqueIndex('company_brain_chat_context_org_user_conv_idx').on(table.organizationId, table.userId, table.conversationId),
  userIdx: index('company_brain_chat_context_user_idx').on(table.userId),
  conversationIdx: index('company_brain_chat_context_conversation_idx').on(table.conversationId),
}));

// Company Brain Extended Features Tables

// Continuous Chat Archiving (Slack/Teams)
export const companyBrainChatLogs = pgTable('company_brain_chat_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  channelId: varchar('channel_id', { length: 255 }).notNull(),
  channelName: varchar('channel_name', { length: 255 }),
  userId: varchar('user_id', { length: 255 }).notNull(),
  userName: varchar('user_name', { length: 255 }),
  message: text('message').notNull(),
  timestamp: timestamp('timestamp').notNull(),
  threadId: varchar('thread_id', { length: 255 }),
  replyCount: integer('reply_count').default(0).notNull(),
  reactions: jsonb('reactions').default([]).notNull(),
  attachments: jsonb('attachments').default([]).notNull(),
  mentions: jsonb('mentions').default([]).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  extractedKnowledge: jsonb('extracted_knowledge').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_logs_org_idx').on(table.organizationId),
  platformIdx: index('company_brain_chat_logs_platform_idx').on(table.platform),
  channelIdx: index('company_brain_chat_logs_channel_idx').on(table.channelId),
  userIdx: index('company_brain_chat_logs_user_idx').on(table.userId),
  timestampIdx: index('company_brain_chat_logs_timestamp_idx').on(table.timestamp),
}));

// Automated Meeting Transcription
export const companyBrainMeetingTranscriptions = pgTable('company_brain_meeting_transcriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  meetingId: varchar('meeting_id', { length: 255 }).notNull(),
  meetingTitle: varchar('meeting_title', { length: 500 }),
  meetingUrl: text('meeting_url'),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time'),
  duration: integer('duration'),
  hostId: varchar('host_id', { length: 255 }),
  hostName: varchar('host_name', { length: 255 }),
  participants: jsonb('participants').default([]).notNull(),
  transcription: text('transcription'),
  summary: text('summary'),
  actionItems: jsonb('action_items').default([]).notNull(),
  decisions: jsonb('decisions').default([]).notNull(),
  keyTopics: jsonb('key_topics').default([]).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  recordingUrl: text('recording_url'),
  status: varchar('status', { length: 50 }).default('processing').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_meeting_transcriptions_org_idx').on(table.organizationId),
  platformIdx: index('company_brain_meeting_transcriptions_platform_idx').on(table.platform),
  meetingIdIdx: index('company_brain_meeting_transcriptions_meeting_id_idx').on(table.meetingId),
  startTimeIdx: index('company_brain_meeting_transcriptions_start_time_idx').on(table.startTime),
  statusIdx: index('company_brain_meeting_transcriptions_status_idx').on(table.status),
}));

// Email Thread Mapping
export const companyBrainEmailThreads = pgTable('company_brain_email_threads', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  threadId: varchar('thread_id', { length: 500 }).notNull(),
  subject: varchar('subject', { length: 1000 }).notNull(),
  sender: varchar('sender', { length: 255 }).notNull(),
  recipients: jsonb('recipients').default([]).notNull(),
  cc: jsonb('cc').default([]).notNull(),
  bcc: jsonb('bcc').default([]).notNull(),
  messageCount: integer('message_count').default(1).notNull(),
  firstMessageDate: timestamp('first_message_date').notNull(),
  lastMessageDate: timestamp('last_message_date').notNull(),
  projectId: uuid('project_id'),
  clientId: uuid('client_id'),
  category: varchar('category', { length: 100 }),
  priority: varchar('priority', { length: 20 }).default('normal').notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  summary: text('summary'),
  actionItems: jsonb('action_items').default([]).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  extractedKnowledge: jsonb('extracted_knowledge').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_email_threads_org_idx').on(table.organizationId),
  threadIdIdx: uniqueIndex('company_brain_email_threads_thread_id_idx').on(table.threadId),
  senderIdx: index('company_brain_email_threads_sender_idx').on(table.sender),
  projectIdx: index('company_brain_email_threads_project_idx').on(table.projectId),
  clientIdx: index('company_brain_email_threads_client_idx').on(table.clientId),
  statusIdx: index('company_brain_email_threads_status_idx').on(table.status),
}));

export const companyBrainEmailMessages = pgTable('company_brain_email_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  threadId: uuid('thread_id').references(() => companyBrainEmailThreads.id, { onDelete: 'cascade' }).notNull(),
  messageId: varchar('message_id', { length: 500 }).notNull(),
  sender: varchar('sender', { length: 255 }).notNull(),
  recipients: jsonb('recipients').default([]).notNull(),
  subject: varchar('subject', { length: 1000 }).notNull(),
  body: text('body').notNull(),
  htmlBody: text('html_body'),
  sentDate: timestamp('sent_date').notNull(),
  attachments: jsonb('attachments').default([]).notNull(),
  inReplyTo: varchar('in_reply_to', { length: 500 }),
  references: jsonb('references').default([]).notNull(),
  headers: jsonb('headers').default({}).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  extractedKnowledge: jsonb('extracted_knowledge').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_email_messages_org_idx').on(table.organizationId),
  threadIdx: index('company_brain_email_messages_thread_idx').on(table.threadId),
  messageIdIdx: uniqueIndex('company_brain_email_messages_message_id_idx').on(table.messageId),
  senderIdx: index('company_brain_email_messages_sender_idx').on(table.sender),
  sentDateIdx: index('company_brain_email_messages_sent_date_idx').on(table.sentDate),
}));

// AI-Generated SOPs
export const companyBrainSOPs = pgTable('company_brain_sops', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }),
  department: varchar('department', { length: 100 }),
  process: text('process').notNull(),
  steps: jsonb('steps').default([]).notNull(),
  prerequisites: jsonb('prerequisites').default([]).notNull(),
  tools: jsonb('tools').default([]).notNull(),
  estimatedTime: varchar('estimated_time', { length: 50 }),
  difficulty: varchar('difficulty', { length: 20 }).default('medium').notNull(),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  version: integer('version').default(1).notNull(),
  sourceType: varchar('source_type', { length: 50 }).notNull(),
  sourceId: varchar('source_id', { length: 255 }),
  extractedFrom: jsonb('extracted_from').default([]).notNull(),
  confidence: decimal('confidence', { precision: 3, scale: 2 }).default('0').notNull(),
  reviewedBy: uuid('reviewed_by').references(() => users.id),
  approvedBy: uuid('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_sops_org_idx').on(table.organizationId),
  categoryIdx: index('company_brain_sops_category_idx').on(table.category),
  departmentIdx: index('company_brain_sops_department_idx').on(table.department),
  statusIdx: index('company_brain_sops_status_idx').on(table.status),
  sourceTypeIdx: index('company_brain_sops_source_type_idx').on(table.sourceType),
}));

// Expertise Profiling
export const companyBrainExpertiseProfiles = pgTable('company_brain_expertise_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  userName: varchar('user_name', { length: 255 }).notNull(),
  skills: jsonb('skills').default([]).notNull(),
  domains: jsonb('domains').default([]).notNull(),
  projects: jsonb('projects').default([]).notNull(),
  contributions: jsonb('contributions').default([]).notNull(),
  activityScore: decimal('activity_score', { precision: 3, scale: 2 }).default('0').notNull(),
  expertiseScore: decimal('expertise_score', { precision: 3, scale: 2 }).default('0').notNull(),
  lastActiveAt: timestamp('last_active_at'),
  availability: varchar('availability', { length: 20 }).default('unknown').notNull(),
  mentorshipTopics: jsonb('mentorship_topics').default([]).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_expertise_profiles_org_idx').on(table.organizationId),
  userIdx: uniqueIndex('company_brain_expertise_profiles_user_idx').on(table.userId),
  domainIdx: index('company_brain_expertise_profiles_domain_idx').on(table.domains),
  expertiseScoreIdx: index('company_brain_expertise_profiles_expertise_score_idx').on(table.expertiseScore),
}));

// Historical Project Linking
export const companyBrainProjectTimelines = pgTable('company_brain_project_timelines', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  projectId: uuid('project_id').notNull(),
  projectName: varchar('project_name', { length: 500 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  teamMembers: jsonb('team_members').default([]).notNull(),
  milestones: jsonb('milestones').default([]).notNull(),
  decisions: jsonb('decisions').default([]).notNull(),
  files: jsonb('files').default([]).notNull(),
  edits: jsonb('edits').default([]).notNull(),
  communications: jsonb('communications').default([]).notNull(),
  dependencies: jsonb('dependencies').default([]).notNull(),
  risks: jsonb('risks').default([]).notNull(),
  lessonsLearned: jsonb('lessons_learned').default([]).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_project_timelines_org_idx').on(table.organizationId),
  projectIdIdx: uniqueIndex('company_brain_project_timelines_project_id_idx').on(table.projectId),
  statusIdx: index('company_brain_project_timelines_status_idx').on(table.status),
  startDateIdx: index('company_brain_project_timelines_start_date_idx').on(table.startDate),
}));

// Access Revocation & Ownership Transfer
export const companyBrainAccessRevocations = pgTable('company_brain_access_revocations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  userName: varchar('user_name', { length: 255 }).notNull(),
  userEmail: varchar('user_email', { length: 255 }).notNull(),
  revocationDate: timestamp('revocation_date').defaultNow().notNull(),
  revokedBy: uuid('revoked_by').references(() => users.id),
  reason: text('reason'),
  dataPreserved: jsonb('data_preserved').default({}).notNull(),
  accessTypes: jsonb('access_types').default([]).notNull(),
  systemsAffected: jsonb('systems_affected').default([]).notNull(),
  ownershipTransfers: jsonb('ownership_transfers').default([]).notNull(),
  status: varchar('status', { length: 50 }).default('completed').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_access_revocations_org_idx').on(table.organizationId),
  userIdx: index('company_brain_access_revocations_user_idx').on(table.userId),
  revocationDateIdx: index('company_brain_access_revocations_revocation_date_idx').on(table.revocationDate),
  statusIdx: index('company_brain_access_revocations_status_idx').on(table.status),
}));

export const companyBrainOwnershipTransfers = pgTable('company_brain_ownership_transfers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  fromUserId: uuid('from_user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  toUserId: uuid('to_user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  fromUserName: varchar('from_user_name', { length: 255 }).notNull(),
  toUserName: varchar('to_user_name', { length: 255 }).notNull(),
  transferDate: timestamp('transfer_date').defaultNow().notNull(),
  initiatedBy: uuid('initiated_by').references(() => users.id),
  resources: jsonb('resources').default([]).notNull(),
  permissions: jsonb('permissions').default([]).notNull(),
  projects: jsonb('projects').default([]).notNull(),
  documents: jsonb('documents').default([]).notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  completedAt: timestamp('completed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_ownership_transfers_org_idx').on(table.organizationId),
  fromUserIdx: index('company_brain_ownership_transfers_from_user_idx').on(table.fromUserId),
  toUserIdx: index('company_brain_ownership_transfers_to_user_idx').on(table.toUserId),
  transferDateIdx: index('company_brain_ownership_transfers_transfer_date_idx').on(table.transferDate),
  statusIdx: index('company_brain_ownership_transfers_status_idx').on(table.status),
}));

export const callLogs = pgTable('call_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  contactId: uuid('contact_id').references(() => contacts.id, { onDelete: 'set null' }),
  userId: uuid('user_id').references(() => users.id),
  direction: varchar('direction', { length: 20 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }).notNull(),
  duration: integer('duration').default(0).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  recordingUrl: text('recording_url'),
  transcription: text('transcription'),
  summary: text('summary'),
  sentiment: varchar('sentiment', { length: 50 }),
  tags: jsonb('tags').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const aiConfigs = pgTable('ai_configs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  config: jsonb('config').notNull(),
  model: varchar('model', { length: 100 }),
  temperature: decimal('temperature', { precision: 3, scale: 2 }),
  maxTokens: integer('max_tokens'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const platformConnections = pgTable('platform_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  lastSyncAt: timestamp('last_sync_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformIdx: uniqueIndex('org_platform_idx').on(table.organizationId, table.platform),
}));

export const platformSyncJobs = pgTable('platform_sync_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  connectionId: uuid('connection_id').references(() => platformConnections.id, { onDelete: 'cascade' }),
  jobType: varchar('job_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 30 }).default('queued').notNull(),
  payload: jsonb('payload').default({}).notNull(),
  attempts: integer('attempts').default(0).notNull(),
  maxAttempts: integer('max_attempts').default(5).notNull(),
  nextRunAt: timestamp('next_run_at').defaultNow().notNull(),
  lastError: text('last_error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformStatusNextRunIdx: index('platform_sync_jobs_org_platform_status_next_run_idx').on(
    table.organizationId,
    table.platform,
    table.status,
    table.nextRunAt
  ),
  orgCreatedIdx: index('platform_sync_jobs_org_created_idx').on(table.organizationId, table.createdAt),
}));

export const platformWebhookEvents = pgTable('platform_webhook_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  eventId: varchar('event_id', { length: 255 }).notNull(),
  payload: jsonb('payload').default({}).notNull(),
  status: varchar('status', { length: 30 }).default('received').notNull(),
  receivedAt: timestamp('received_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
}, (table: TableRef) => ({
  orgPlatformEventIdUq: uniqueIndex('platform_webhook_events_org_platform_event_id_uq').on(
    table.organizationId,
    table.platform,
    table.eventId
  ),
  orgReceivedIdx: index('platform_webhook_events_org_received_idx').on(table.organizationId, table.receivedAt),
}));

export const platformFailedOperations = pgTable('platform_failed_operations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  operationType: varchar('operation_type', { length: 80 }).notNull(),
  payload: jsonb('payload').default({}).notNull(),
  attempts: integer('attempts').default(0).notNull(),
  maxAttempts: integer('max_attempts').default(5).notNull(),
  nextRetryAt: timestamp('next_retry_at').defaultNow().notNull(),
  lastError: text('last_error'),
  status: varchar('status', { length: 30 }).default('failed').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformNextRetryIdx: index('platform_failed_ops_org_platform_next_retry_idx').on(
    table.organizationId,
    table.platform,
    table.nextRetryAt
  ),
}));

export const privacySettings = pgTable('privacy_settings', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  settings: jsonb('settings').default({}).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const dataExportRequests = pgTable('data_export_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 30 }).default('pending').notNull(),
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  format: varchar('format', { length: 10 }).notNull(),
  options: jsonb('options').default({}).notNull(),
  result: jsonb('result'),
  expiresAt: timestamp('expires_at'),
  error: text('error'),
});

export const dataDeletionRequests = pgTable('data_deletion_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 30 }).default('pending').notNull(),
  requestedAt: timestamp('requested_at').defaultNow().notNull(),
  scheduledFor: timestamp('scheduled_for').notNull(),
  completedAt: timestamp('completed_at'),
  reason: text('reason'),
  deleteType: varchar('delete_type', { length: 20 }).notNull(),
  dataTypes: jsonb('data_types').default([]).notNull(),
  cancellationDeadline: timestamp('cancellation_deadline').notNull(),
  error: text('error'),
});


export const dataAccessLogs = pgTable('data_access_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  accessedBy: text('accessed_by').notNull(),
  accessType: varchar('access_type', { length: 20 }).notNull(),
  dataType: varchar('data_type', { length: 100 }).notNull(),
  reason: text('reason').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  success: boolean('success').default(true).notNull(),
});

export const backupJobs = pgTable('backup_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  database: varchar('database', { length: 255 }).notNull(),
  type: varchar('type', { length: 20 }).notNull(), // full, incremental, differential
  status: varchar('status', { length: 20 }).default('pending').notNull(),
  size: varchar('size', { length: 50 }),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  duration: varchar('duration', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
}, (table: TableRef) => ({
  orgCreatedIdx: index('backup_jobs_org_created_idx').on(table.organizationId, table.createdAt),
}));

// TYPES
export type User = typeof users.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type SchemaUser = User;
export type SchemaSession = Session;
export type Organization = typeof organizations.$inferSelect;
export type AuditLog = typeof auditLogs.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type PlatformConnection = typeof platformConnections.$inferSelect;
export type RealtimeEventRow = typeof realtimeEvents.$inferSelect;

// Agent Memory System Tables
export const memoryTypeEnum = pgEnum('memory_type', ['episodic', 'semantic', 'procedural', 'working']);
export const contentTypeEnum = pgEnum('content_type', ['text', 'image', 'audio', 'video', 'document']);
export const associationTypeEnum = pgEnum('association_type', ['related', 'causal', 'temporal', 'semantic']);
export const memoryJobTypeEnum = pgEnum('memory_job_type', ['summarize', 'compress', 'extract_entities']);
export const memoryJobStatusEnum = pgEnum('memory_job_status', ['pending', 'running', 'completed', 'failed']);
export const contextTypeEnum = pgEnum('context_type', ['conversation', 'session', 'project']);
export const accessTypeEnum = pgEnum('access_type', ['search', 'retrieve', 'update', 'associate']);

export const agentMemories = pgTable('agent_memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  contentType: contentTypeEnum('content_type').default('text').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  tags: text('tags').array().default([]).notNull(),
  importanceScore: decimal('importance_score', { precision: 3, scale: 2 }).default('0.5').notNull(),
  accessCount: integer('access_count').default(0).notNull(),
  lastAccessedAt: timestamp('last_accessed_at'),
  memoryType: memoryTypeEnum('memory_type').default('episodic').notNull(),
  contextWindow: jsonb('context_window').default({}).notNull(),
  summary: text('summary'),
  isArchived: boolean('is_archived').default(false).notNull(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentIdx: index('agent_memories_agent_idx').on(table.agentId),
  orgIdx: index('agent_memories_org_idx').on(table.organizationId),
  typeIdx: index('agent_memories_type_idx').on(table.memoryType),
  importanceIdx: index('agent_memories_importance_idx').on(table.importanceScore),
  tagsIdx: index('agent_memories_tags_idx').using('gin', table.tags),
  createdIdx: index('agent_memories_created_idx').on(table.createdAt),
  accessedIdx: index('agent_memories_accessed_idx').on(table.lastAccessedAt),
  expiresIdx: index('agent_memories_expires_idx').on(table.expiresAt),
  embeddingIdx: index('agent_memories_embedding_idx').on(table.embedding),
}));

export const memoryAssociations = pgTable('memory_associations', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourceMemoryId: uuid('source_memory_id').references(() => agentMemories.id, { onDelete: 'cascade' }).notNull(),
  targetMemoryId: uuid('target_memory_id').references(() => agentMemories.id, { onDelete: 'cascade' }).notNull(),
  associationType: associationTypeEnum('association_type').notNull(),
  strength: decimal('strength', { precision: 3, scale: 2 }).default('0.5').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  sourceIdx: index('memory_associations_source_idx').on(table.sourceMemoryId),
  targetIdx: index('memory_associations_target_idx').on(table.targetMemoryId),
  typeIdx: index('memory_associations_type_idx').on(table.associationType),
  uniqueAssociation: uniqueIndex('memory_associations_unique').on(table.sourceMemoryId, table.targetMemoryId, table.associationType),
}));

export const memorySummarizationJobs = pgTable('memory_summarization_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  memoryId: uuid('memory_id').references(() => agentMemories.id, { onDelete: 'cascade' }),
  jobType: memoryJobTypeEnum('job_type').notNull(),
  status: memoryJobStatusEnum('status').default('pending').notNull(),
  inputData: jsonb('input_data'),
  resultData: jsonb('result_data'),
  errorMessage: text('error_message'),
  attempts: integer('attempts').default(0).notNull(),
  maxAttempts: integer('max_attempts').default(3).notNull(),
  scheduledAt: timestamp('scheduled_at').defaultNow().notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentIdx: index('memory_summarization_jobs_agent_idx').on(table.agentId),
  statusIdx: index('memory_summarization_jobs_status_idx').on(table.status, table.scheduledAt),
  memoryIdx: index('memory_summarization_jobs_memory_idx').on(table.memoryId),
}));

export const memoryArchivalJobs = pgTable('memory_archival_jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  jobType: varchar('job_type', { length: 50 }).notNull(),
  criteria: jsonb('criteria').notNull(),
  status: memoryJobStatusEnum('status').default('pending').notNull(),
  affectedMemoryCount: integer('affected_memory_count').default(0).notNull(),
  processedMemoryCount: integer('processed_memory_count').default(0).notNull(),
  errorMessage: text('error_message'),
  scheduledAt: timestamp('scheduled_at').defaultNow().notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentIdx: index('memory_archival_jobs_agent_idx').on(table.agentId),
  statusIdx: index('memory_archival_jobs_status_idx').on(table.status, table.scheduledAt),
}));

export const memoryContextWindows = pgTable('memory_context_windows', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  windowName: varchar('window_name', { length: 100 }).notNull(),
  memoryIds: uuid('memory_ids').array().notNull(),
  contextType: contextTypeEnum('context_type').default('conversation').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at'),
}, (table: TableRef) => ({
  agentIdx: index('memory_context_windows_agent_idx').on(table.agentId),
  typeIdx: index('memory_context_windows_type_idx').on(table.contextType),
  activeIdx: index('memory_context_windows_active_idx').on(table.isActive, table.expiresAt),
}));

export const memoryAccessPatterns = pgTable('memory_access_patterns', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  memoryId: uuid('memory_id').references(() => agentMemories.id, { onDelete: 'cascade' }).notNull(),
  accessType: accessTypeEnum('access_type').notNull(),
  queryEmbedding: vector('query_embedding', { dimensions: 1536 }),
  queryContext: jsonb('query_context'),
  resultScore: decimal('result_score', { precision: 5, scale: 4 }),
  accessTime: timestamp('access_time').defaultNow().notNull(),
  sessionId: uuid('session_id'),
}, (table: TableRef) => ({
  agentIdx: index('memory_access_patterns_agent_idx').on(table.agentId),
  memoryIdx: index('memory_access_patterns_memory_idx').on(table.memoryId),
  timeIdx: index('memory_access_patterns_time_idx').on(table.accessTime),
  sessionIdx: index('memory_access_patterns_session_idx').on(table.sessionId),
}));

// Agent Memory Types
export type AgentMemory = typeof agentMemories.$inferSelect;
export type MemoryAssociation = typeof memoryAssociations.$inferSelect;
export type MemorySummarizationJob = typeof memorySummarizationJobs.$inferSelect;
export type MemoryArchivalJob = typeof memoryArchivalJobs.$inferSelect;
export type MemoryContextWindow = typeof memoryContextWindows.$inferSelect;
export type MemoryAccessPattern = typeof memoryAccessPatterns.$inferSelect;

// User Context Tables
export const userContexts = pgTable('user_contexts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  sessionId: varchar('session_id', { length: 255 }),
  contextType: varchar('context_type', { length: 50 }).default('session').notNull(),
  version: integer('version').default(1).notNull(),
  content: jsonb('content').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  tags: varchar('tags', { length: 255 }).array().default([]),
  isEncrypted: boolean('is_encrypted').default(false).notNull(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  userOrgIdx: index('user_contexts_user_org_idx').on(table.userId, table.organizationId),
  sessionIdx: index('user_contexts_session_idx').on(table.sessionId),
  typeIdx: index('user_contexts_type_idx').on(table.contextType),
  expiresIdx: index('user_contexts_expires_idx').on(table.expiresAt),
  searchIdx: index('user_contexts_search_idx').using('gin', sql`${table.content}, ${table.tags}`),
}));

export const userContextVersions = pgTable('user_context_versions', {
  id: uuid('id').primaryKey().defaultRandom(),
  contextId: uuid('context_id').references(() => userContexts.id, { onDelete: 'cascade' }).notNull(),
  version: integer('version').notNull(),
  content: jsonb('content').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  changeReason: varchar('change_reason', { length: 255 }),
  changedBy: uuid('changed_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  contextVersionIdx: uniqueIndex('user_context_versions_context_version_idx').on(table.contextId, table.version),
  contextIdx: index('user_context_versions_context_idx').on(table.contextId),
}));

export const userActivities = pgTable('user_activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  sessionId: varchar('session_id', { length: 255 }),
  activityType: varchar('activity_type', { length: 50 }).notNull(),
  resource: varchar('resource', { length: 255 }).notNull(),
  resourceId: varchar('resource_id', { length: 255 }),
  details: jsonb('details').default({}).notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table: TableRef) => ({
  userOrgIdx: index('user_activities_user_org_idx').on(table.userId, table.organizationId),
  sessionIdx: index('user_activities_session_idx').on(table.sessionId),
  typeIdx: index('user_activities_type_idx').on(table.activityType),
  timestampIdx: index('user_activities_timestamp_idx').on(table.timestamp),
}));

export type UserContext = typeof userContexts.$inferSelect;
export type UserContextInsert = typeof userContexts.$inferInsert;
export type UserContextVersion = typeof userContextVersions.$inferSelect;
export type UserContextVersionInsert = typeof userContextVersions.$inferInsert;
export type UserActivity = typeof userActivities.$inferSelect;
export type UserActivityInsert = typeof userActivities.$inferInsert;

// Platform Data Tables
export const platformContacts = pgTable('platform_contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  platformId: varchar('platform_id', { length: 255 }).notNull(),
  data: jsonb('data').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformIdx: index('platform_contacts_org_platform_idx').on(table.organizationId, table.platform),
  emailIdx: index('platform_contacts_email_idx').using('gin', table.data),
  uniqueOrgPlatform: uniqueIndex('platform_contacts_unique_org_platform').on(table.organizationId, table.platform, table.platformId),
}));

export const platformOpportunities = pgTable('platform_opportunities', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  platformId: varchar('platform_id', { length: 255 }).notNull(),
  data: jsonb('data').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformIdx: index('platform_opportunities_org_platform_idx').on(table.organizationId, table.platform),
  uniqueOrgPlatform: uniqueIndex('platform_opportunities_unique_org_platform').on(table.organizationId, table.platform, table.platformId),
}));

export const platformDeals = pgTable('platform_deals', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  platformId: varchar('platform_id', { length: 255 }).notNull(),
  data: jsonb('data').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformIdx: index('platform_deals_org_platform_idx').on(table.organizationId, table.platform),
  uniqueOrgPlatform: uniqueIndex('platform_deals_unique_org_platform').on(table.organizationId, table.platform, table.platformId),
}));

export const platformChannels = pgTable('platform_channels', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  platformId: varchar('platform_id', { length: 255 }).notNull(),
  data: jsonb('data').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformIdx: index('platform_channels_org_platform_idx').on(table.organizationId, table.platform),
  uniqueOrgPlatform: uniqueIndex('platform_channels_unique_org_platform').on(table.organizationId, table.platform, table.platformId),
}));

export const platformMessages = pgTable('platform_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 50 }).notNull(),
  platformId: varchar('platform_id', { length: 255 }).notNull(),
  channelId: varchar('channel_id', { length: 255 }),
  data: jsonb('data').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgPlatformIdx: index('platform_messages_org_platform_idx').on(table.organizationId, table.platform),
  channelIdx: index('platform_messages_channel_idx').on(table.organizationId, table.platform, table.channelId),
  uniqueOrgPlatform: uniqueIndex('platform_messages_unique_org_platform').on(table.organizationId, table.platform, table.platformId),
}));

// Platform Data Types
export type PlatformContact = typeof platformContacts.$inferSelect;
export type PlatformOpportunity = typeof platformOpportunities.$inferSelect;
export type PlatformDeal = typeof platformDeals.$inferSelect;
export type PlatformChannel = typeof platformChannels.$inferSelect;
export type PlatformMessage = typeof platformMessages.$inferSelect;

// GDPR and Consent Management Tables
export const gdprRequests = pgTable('gdpr_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  email: varchar('email', { length: 255 }),
  requestType: gdprRequestTypeEnum('request_type').notNull(),
  status: gdprRequestStatusEnum('status').default('pending').notNull(),
  requestData: jsonb('request_data').default({}).notNull(),
  responseData: jsonb('response_data'),
  processedAt: timestamp('processed_at'),
  processedBy: uuid('processed_by').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  priority: priorityEnum('priority').default('medium').notNull(),
  dueDate: timestamp('due_date'),
  completedAt: timestamp('completed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('gdpr_requests_org_idx').on(table.organizationId),
  userIdx: index('gdpr_requests_user_idx').on(table.userId),
  emailIdx: index('gdpr_requests_email_idx').on(table.email),
  statusIdx: index('gdpr_requests_status_idx').on(table.status),
  typeIdx: index('gdpr_requests_type_idx').on(table.requestType),
  dueDateIdx: index('gdpr_requests_due_date_idx').on(table.dueDate),
}));

export const consentRecords = pgTable('consent_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  purpose: consentPurposeEnum('purpose').notNull(),
  status: consentStatusEnum('status').default('granted').notNull(),
  consentDate: timestamp('consent_date').defaultNow().notNull(),
  withdrawalDate: timestamp('withdrawal_date'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  consentText: text('consent_text'),
  version: varchar('version', { length: 20 }).default('1.0').notNull(),
  legalBasis: varchar('legal_basis', { length: 100 }).default('consent').notNull(),
  processingActivities: jsonb('processing_activities').default([]).notNull(),
  dataCategories: jsonb('data_categories').default([]).notNull(),
  retentionPeriod: integer('retention_period'), // in days
  thirdParties: jsonb('third_parties').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgUserIdx: index('consent_records_org_user_idx').on(table.organizationId, table.userId),
  purposeIdx: index('consent_records_purpose_idx').on(table.purpose),
  statusIdx: index('consent_records_status_idx').on(table.status),
  consentDateIdx: index('consent_records_consent_date_idx').on(table.consentDate),
  uniqueOrgUserPurpose: uniqueIndex('consent_records_unique_org_user_purpose').on(table.organizationId, table.userId, table.purpose),
}));

export const dataBreachNotifications = pgTable('data_breach_notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  breachId: varchar('breach_id', { length: 100 }).unique().notNull(),
  severity: dataBreachSeverityEnum('severity').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  affectedUsers: integer('affected_users').default(0).notNull(),
  dataTypes: jsonb('data_types').default([]).notNull(),
  discoveredAt: timestamp('discovered_at').notNull(),
  containedAt: timestamp('contained_at'),
  notifiedAt: timestamp('notified_at'),
  notificationMethod: notificationTypeEnum('notification_method'),
  mitigationMeasures: jsonb('mitigation_measures').default([]).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  reportedToAuthorities: boolean('reported_to_authorities').default(false).notNull(),
  authorityReportDate: timestamp('authority_report_date'),
  internalNotes: text('internal_notes'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('data_breach_notifications_org_idx').on(table.organizationId),
  breachIdIdx: index('data_breach_notifications_breach_id_idx').on(table.breachId),
  severityIdx: index('data_breach_notifications_severity_idx').on(table.severity),
  discoveredAtIdx: index('data_breach_notifications_discovered_at_idx').on(table.discoveredAt),
  statusIdx: index('data_breach_notifications_status_idx').on(table.status),
}));

export const dataProcessingActivities = pgTable('data_processing_activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  purpose: varchar('purpose', { length: 500 }).notNull(),
  legalBasis: varchar('legal_basis', { length: 100 }).notNull(),
  dataCategories: jsonb('data_categories').default([]).notNull(),
  dataSubjects: jsonb('data_subjects').default([]).notNull(),
  recipients: jsonb('recipients').default([]).notNull(),
  retentionPeriod: varchar('retention_period', { length: 100 }).notNull(),
  securityMeasures: jsonb('security_measures').default([]).notNull(),
  internationalTransfer: boolean('international_transfer').default(false).notNull(),
  transferCountries: jsonb('transfer_countries').default([]).notNull(),
  dpoContact: varchar('dpo_contact', { length: 255 }),
  automatedDecisionMaking: boolean('automated_decision_making').default(false).notNull(),
  profiling: boolean('profiling').default(false).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  lastReviewed: timestamp('last_reviewed'),
  nextReviewDate: timestamp('next_review_date'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('data_processing_activities_org_idx').on(table.organizationId),
  statusIdx: index('data_processing_activities_status_idx').on(table.status),
  nextReviewIdx: index('data_processing_activities_next_review_idx').on(table.nextReviewDate),
}));

export const privacyPolicies = pgTable('privacy_policies', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  version: varchar('version', { length: 20 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  summary: text('summary'),
  effectiveDate: timestamp('effective_date').notNull(),
  expiryDate: timestamp('expiry_date'),
  status: varchar('status', { length: 50 }).default('draft').notNull(),
  language: varchar('language', { length: 10 }).default('en').notNull(),
  jurisdictions: jsonb('jurisdictions').default([]).notNull(),
  consentRequirements: jsonb('consent_requirements').default({}).notNull(),
  dataRetentionPolicy: jsonb('data_retention_policy').default({}).notNull(),
  userRights: jsonb('user_rights').default([]).notNull(),
  contactInfo: jsonb('contact_info').default({}).notNull(),
  cookiePolicy: jsonb('cookie_policy').default({}).notNull(),
  thirdPartyServices: jsonb('third_party_services').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('privacy_policies_org_idx').on(table.organizationId),
  versionIdx: index('privacy_policies_version_idx').on(table.version),
  statusIdx: index('privacy_policies_status_idx').on(table.status),
  effectiveDateIdx: index('privacy_policies_effective_date_idx').on(table.effectiveDate),
  uniqueOrgVersion: uniqueIndex('privacy_policies_unique_org_version').on(table.organizationId, table.version),
}));

// GDPR and Consent Management Types
export type GDPRRequest = typeof gdprRequests.$inferSelect;
export type GDPRRequestInsert = typeof gdprRequests.$inferInsert;
export type ConsentRecord = typeof consentRecords.$inferSelect;
export type ConsentRecordInsert = typeof consentRecords.$inferInsert;
export type DataBreachNotification = typeof dataBreachNotifications.$inferSelect;
export type DataBreachNotificationInsert = typeof dataBreachNotifications.$inferInsert;
export type DataProcessingActivity = typeof dataProcessingActivities.$inferSelect;
export type DataProcessingActivityInsert = typeof dataProcessingActivities.$inferInsert;
export type PrivacyPolicy = typeof privacyPolicies.$inferSelect;
export type PrivacyPolicyInsert = typeof privacyPolicies.$inferInsert;

// Login Attempts Table for Account Lockout
export const loginAttempts = pgTable('login_attempts', {
  id: uuid('id').primaryKey().defaultRandom(),
  identifier: varchar('identifier', { length: 255 }).notNull(), // IP address or user ID
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  success: boolean('success').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  ipAddress: varchar('ip_address', { length: 50 }).notNull(),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata').default({}).notNull(),
}, (table: TableRef) => ({
  identifierIdx: index('login_attempts_identifier_idx').on(table.identifier),
  timestampIdx: index('login_attempts_timestamp_idx').on(table.timestamp),
  userIdIdx: index('login_attempts_user_id_idx').on(table.userId),
}));

export type LoginAttempt = typeof loginAttempts.$inferSelect;
export type LoginAttemptInsert = typeof loginAttempts.$inferInsert;

// Error Recovery Table
export const errorRecoveries = pgTable('error_recoveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  type: varchar('type', { length: 100 }).notNull(),
  severity: varchar('severity', { length: 20 }).notNull(), // 'low', 'medium', 'high', 'critical'
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('pending').notNull(), // 'pending', 'resolved', 'failed', 'ignored'
  attempts: integer('attempts').default(1).notNull(),
  maxAttempts: integer('max_attempts').default(3).notNull(),
  nextRetryAt: timestamp('next_retry_at'),
  resolvedAt: timestamp('resolved_at'),
  resolution: text('resolution'),
  resolvedBy: uuid('resolved_by').references(() => users.id, { onDelete: 'set null' }),
  context: jsonb('context').default({}).notNull(),
  errorStack: text('error_stack'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('error_recoveries_org_idx').on(table.organizationId),
  statusIdx: index('error_recoveries_status_idx').on(table.status),
  severityIdx: index('error_recoveries_severity_idx').on(table.severity),
  typeIdx: index('error_recoveries_type_idx').on(table.type),
  nextRetryIdx: index('error_recoveries_next_retry_idx').on(table.nextRetryAt),
  createdAtIdx: index('error_recoveries_created_at_idx').on(table.createdAt),
}));

export type ErrorRecovery = typeof errorRecoveries.$inferSelect;
export type ErrorRecoveryInsert = typeof errorRecoveries.$inferInsert;

// ============================================================================
// NEW FEATURE TABLES - Added March 2026
// ============================================================================

// Personal Memory Types
export const personalMemoryTypeEnum = pgEnum('personal_memory_type', [
  'preference', 'fact', 'goal', 'history', 'context', 'relationship', 
  'habit', 'skill', 'value', 'emotion', 'schedule', 'communication', 
  'workstyle', 'decision'
]);

export const memorySourceEnum = pgEnum('memory_source', [
  'explicit', 'inferred', 'observed', 'third_party'
]);

export const relationshipStageEnum = pgEnum('relationship_stage', [
  'new', 'acquaintance', 'familiar', 'close', 'trusted'
]);

// Agent Personal Memories Table
export const agentPersonalMemories = pgTable('agent_personal_memories', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: personalMemoryTypeEnum('type').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  content: text('content').notNull(),
  context: text('context'),
  importance: integer('importance').default(50).notNull(), // 0-100
  confidence: integer('confidence').default(70).notNull(), // 0-100
  source: memorySourceEnum('source').default('observed').notNull(),
  verified: boolean('verified').default(false).notNull(),
  verificationCount: integer('verification_count').default(0).notNull(),
  lastVerifiedAt: timestamp('last_verified_at'),
  expiresAt: timestamp('expires_at'),
  relatedMemoryIds: uuid('related_memory_ids').array().default([]).notNull(),
  tags: varchar('tags', { length: 100 }).array().default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  accessCount: integer('access_count').default(0).notNull(),
  lastAccessed: timestamp('last_accessed').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  version: integer('version').default(1).notNull(),
}, (table: TableRef) => ({
  agentUserIdx: index('agent_personal_memories_agent_user_idx').on(table.agentId, table.userId),
  agentTypeIdx: index('agent_personal_memories_agent_type_idx').on(table.agentId, table.type),
  importanceIdx: index('agent_personal_memories_importance_idx').on(table.importance),
  categoryIdx: index('agent_personal_memories_category_idx').on(table.category),
  verifiedIdx: index('agent_personal_memories_verified_idx').on(table.verified),
  expiresIdx: index('agent_personal_memories_expires_idx').on(table.expiresAt),
  tagsIdx: index('agent_personal_memories_tags_idx').using('gin', table.tags),
}));

// Agent User Relationships Table
export const agentUserRelationships = pgTable('agent_user_relationships', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  relationshipStage: relationshipStageEnum('relationship_stage').default('new').notNull(),
  trustLevel: integer('trust_level').default(30).notNull(), // 0-100
  rapportScore: integer('rapport_score').default(25).notNull(), // 0-100
  interactionCount: integer('interaction_count').default(0).notNull(),
  totalConversations: integer('total_conversations').default(0).notNull(),
  averageSessionDuration: integer('average_session_duration').default(0).notNull(), // minutes
  preferredCommunicationStyle: varchar('preferred_communication_style', { length: 50 }).default('professional').notNull(),
  knownPainPoints: text('known_pain_points').array().default([]).notNull(),
  knownInterests: text('known_interests').array().default([]).notNull(),
  collaborationHistory: jsonb('collaboration_history').default({}).notNull(),
  memoryHighlights: uuid('memory_highlights').array().default([]).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentUserUnique: uniqueIndex('agent_user_relationships_unique').on(table.agentId, table.userId),
  agentIdx: index('agent_user_relationships_agent_idx').on(table.agentId),
  userIdx: index('agent_user_relationships_user_idx').on(table.userId),
  stageIdx: index('agent_user_relationships_stage_idx').on(table.relationshipStage),
}));

// Agent Memory Preferences Table
export const agentMemoryPreferences = pgTable('agent_memory_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  memoryTypes: jsonb('memory_types').default({}).notNull(),
  retentionDays: integer('retention_days').default(365).notNull(),
  autoVerifyThreshold: integer('auto_verify_threshold').default(80).notNull(), // confidence level
  privacyLevel: varchar('privacy_level', { length: 20 }).default('private').notNull(),
  allowInferences: boolean('allow_inferences').default(true).notNull(),
  allowThirdPartyData: boolean('allow_third_party_data').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentUserUnique: uniqueIndex('agent_memory_prefs_unique').on(table.agentId, table.userId),
}));

// Agent Memory Insights Table
export const agentMemoryInsights = pgTable('agent_memory_insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'pattern', 'recommendation', 'prediction', 'anomaly'
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  relatedMemoryIds: uuid('related_memory_ids').array().default([]).notNull(),
  confidence: integer('confidence').default(50).notNull(),
  actionable: boolean('actionable').default(false).notNull(),
  actionSuggestion: text('action_suggestion'),
  acknowledgedAt: timestamp('acknowledged_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentUserIdx: index('agent_memory_insights_agent_user_idx').on(table.agentId, table.userId),
  typeIdx: index('agent_memory_insights_type_idx').on(table.type),
}));

// Computer Use Session Types
export const computerSessionTypeEnum = pgEnum('computer_session_type', ['browser', 'system', 'both']);
export const computerSessionStatusEnum = pgEnum('computer_session_status', ['active', 'paused', 'completed', 'error']);
export const browserActionEnum = pgEnum('browser_action', [
  'navigate', 'click', 'type', 'scroll', 'screenshot', 'extract', 'wait',
  'select', 'hover', 'focus', 'submit', 'download', 'upload', 'evaluate',
  'authenticate', 'fill_form', 'check_element', 'get_text', 'get_links',
  'search', 'Filter', 'sort'
]);
export const systemCommandEnum = pgEnum('system_command', [
  'file_read', 'file_write', 'file_delete', 'file_move', 'directory_list',
  'directory_create', 'shell_execute', 'process_list', 'process_kill',
  'env_get', 'env_set', 'clipboard_read', 'clipboard_write', 'screenshot_desktop',
  'open_application', 'close_application', 'system_info', 'network_request',
  'api_call', 'database_query', 'schedule_task', 'send_notification',
  'calendar_event', 'email_send', 'email_read', 'slack_message', 'teams_message', 'whatsapp_message'
]);

// Agent Computer Sessions Table
export const agentComputerSessions = pgTable('agent_computer_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: computerSessionTypeEnum('type').notNull(),
  status: computerSessionStatusEnum('status').default('active').notNull(),
  startTime: timestamp('start_time').defaultNow().notNull(),
  lastActivity: timestamp('last_activity').defaultNow().notNull(),
  endTime: timestamp('end_time'),
  actionsCompleted: integer('actions_completed').default(0).notNull(),
  errors: text('errors').array().default([]).notNull(),
  context: jsonb('context').default({}).notNull(),
  permissions: varchar('permissions', { length: 50 }).array().default(['read']).notNull(),
  restrictedDomains: varchar('restricted_domains', { length: 255 }).array().default([]).notNull(),
  allowedCommands: varchar('allowed_commands', { length: 100 }).array().default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
}, (table: TableRef) => ({
  agentIdx: index('agent_computer_sessions_agent_idx').on(table.agentId),
  userIdx: index('agent_computer_sessions_user_idx').on(table.userId),
  statusIdx: index('agent_computer_sessions_status_idx').on(table.status),
  activityIdx: index('agent_computer_sessions_activity_idx').on(table.lastActivity),
}));

// Agent Browser Actions Table
export const agentBrowserActions = pgTable('agent_browser_actions', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => agentComputerSessions.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  action: browserActionEnum('action').notNull(),
  selector: text('selector'),
  url: text('url'),
  text: text('text'),
  value: text('value'),
  success: boolean('success').notNull(),
  result: jsonb('result'),
  error: text('error'),
  screenshot: text('screenshot'), // base64 encoded
  executionTime: integer('execution_time').notNull(), // milliseconds
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table: TableRef) => ({
  sessionIdx: index('agent_browser_actions_session_idx').on(table.sessionId),
  agentIdx: index('agent_browser_actions_agent_idx').on(table.agentId),
  actionIdx: index('agent_browser_actions_action_idx').on(table.action),
  timestampIdx: index('agent_browser_actions_timestamp_idx').on(table.timestamp),
}));

// Agent System Commands Table
export const agentSystemCommands = pgTable('agent_system_commands', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => agentComputerSessions.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  command: systemCommandEnum('command').notNull(),
  config: jsonb('config').notNull(),
  success: boolean('success').notNull(),
  result: jsonb('result'),
  error: text('error'),
  executionTime: integer('execution_time').notNull(), // milliseconds
  timestamp: timestamp('timestamp').defaultNow().notNull(),
}, (table: TableRef) => ({
  sessionIdx: index('agent_system_commands_session_idx').on(table.sessionId),
  agentIdx: index('agent_system_commands_agent_idx').on(table.agentId),
  commandIdx: index('agent_system_commands_command_idx').on(table.command),
  timestampIdx: index('agent_system_commands_timestamp_idx').on(table.timestamp),
}));

// Chat Platform Types
export const chatPlatformEnum = pgEnum('chat_platform', ['slack', 'teams', 'whatsapp', 'discord', 'telegram']);
export const chatConnectionStatusEnum = pgEnum('chat_connection_status', ['connected', 'disconnected', 'error', 'pending']);
export const messageTypeEnum = pgEnum('message_type', ['text', 'image', 'file', 'audio', 'video', 'reaction', 'thread', 'command']);

// Chat Platform Connections Table
export const chatPlatformConnections = pgTable('chat_platform_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  platform: chatPlatformEnum('platform').notNull(),
  status: chatConnectionStatusEnum('status').default('pending').notNull(),
  credentials: jsonb('credentials').notNull(),
  settings: jsonb('settings').default({}).notNull(),
  webhooks: jsonb('webhooks').default({}).notNull(),
  stats: jsonb('stats').default({ messagesReceived: 0, messagesSent: 0, errors: 0 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentPlatformIdx: uniqueIndex('chat_platform_connections_agent_platform_idx').on(table.agentId, table.platform),
  orgIdx: index('chat_platform_connections_org_idx').on(table.organizationId),
  statusIdx: index('chat_platform_connections_status_idx').on(table.status),
}));

// Chat Messages Table
export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  platform: chatPlatformEnum('platform').notNull(),
  connectionId: uuid('connection_id').references(() => chatPlatformConnections.id, { onDelete: 'cascade' }).notNull(),
  externalId: varchar('external_id', { length: 255 }).notNull(),
  externalThreadId: varchar('external_thread_id', { length: 255 }),
  channelId: varchar('channel_id', { length: 255 }).notNull(),
  channelName: varchar('channel_name', { length: 255 }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  externalUserId: varchar('external_user_id', { length: 255 }).notNull(),
  userName: varchar('user_name', { length: 255 }).notNull(),
  userAvatar: text('user_avatar'),
  type: messageTypeEnum('type').default('text').notNull(),
  content: text('content').notNull(),
  attachments: jsonb('attachments').default([]).notNull(),
  reactions: jsonb('reactions').default([]).notNull(),
  replyTo: varchar('reply_to', { length: 255 }),
  mentions: varchar('mentions', { length: 255 }).array().default([]).notNull(),
  isDirectMessage: boolean('is_direct_message').default(false).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  processed: boolean('processed').default(false).notNull(),
  agentResponse: text('agent_response'),
  responseTime: integer('response_time'), // milliseconds
}, (table: TableRef) => ({
  connectionIdx: index('chat_messages_connection_idx').on(table.connectionId),
  externalIdx: uniqueIndex('chat_messages_external_idx').on(table.platform, table.externalId),
  channelIdx: index('chat_messages_channel_idx').on(table.channelId),
  userIdx: index('chat_messages_user_idx').on(table.userId),
  processedIdx: index('chat_messages_processed_idx').on(table.processed),
  timestampIdx: index('chat_messages_timestamp_idx').on(table.timestamp),
}));

// Chat User Mappings Table
export const chatUserMappings = pgTable('chat_user_mappings', {
  id: uuid('id').primaryKey().defaultRandom(),
  platform: chatPlatformEnum('platform').notNull(),
  externalUserId: varchar('external_user_id', { length: 255 }).notNull(),
  internalUserId: uuid('internal_user_id').references(() => users.id, { onDelete: 'set null' }),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userName: varchar('user_name', { length: 255 }).notNull(),
  userEmail: varchar('user_email', { length: 255 }),
  profile: jsonb('profile').default({}).notNull(),
  preferences: jsonb('preferences').default({}).notNull(),
  firstSeen: timestamp('first_seen').defaultNow().notNull(),
  lastSeen: timestamp('last_seen').defaultNow().notNull(),
  messageCount: integer('message_count').default(0).notNull(),
}, (table: TableRef) => ({
  platformExternalIdx: uniqueIndex('chat_user_mappings_platform_external_idx').on(table.platform, table.externalUserId),
  orgIdx: index('chat_user_mappings_org_idx').on(table.organizationId),
  internalUserIdx: index('chat_user_mappings_internal_user_idx').on(table.internalUserId),
}));

// Chat Channel Mappings Table
export const chatChannelMappings = pgTable('chat_channel_mappings', {
  id: uuid('id').primaryKey().defaultRandom(),
  platform: chatPlatformEnum('platform').notNull(),
  externalChannelId: varchar('external_channel_id', { length: 255 }).notNull(),
  internalChannelId: uuid('internal_channel_id'),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  channelName: varchar('channel_name', { length: 255 }).notNull(),
  channelType: varchar('channel_type', { length: 20 }).default('public').notNull(), // 'public', 'private', 'dm'
  settings: jsonb('settings').default({}).notNull(),
  memberCount: integer('member_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  platformExternalIdx: uniqueIndex('chat_channel_mappings_platform_external_idx').on(table.platform, table.externalChannelId),
  orgIdx: index('chat_channel_mappings_org_idx').on(table.organizationId),
}));

// Chat Platform Webhooks Table
export const chatPlatformWebhooks = pgTable('chat_platform_webhooks', {
  id: uuid('id').primaryKey().defaultRandom(),
  connectionId: uuid('connection_id').references(() => chatPlatformConnections.id, { onDelete: 'cascade' }).notNull(),
  platform: chatPlatformEnum('platform').notNull(),
  webhookUrl: text('webhook_url').notNull(),
  webhookSecret: text('webhook_secret'),
  events: varchar('events', { length: 100 }).array().default([]).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastCalledAt: timestamp('last_called_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  connectionIdx: index('chat_platform_webhooks_connection_idx').on(table.connectionId),
}));

// ROI Dashboard Types
export const timePeriodEnum = pgEnum('time_period', ['day', 'week', 'month', 'quarter', 'year', 'custom']);
export const costCategoryEnum = pgEnum('cost_category', [
  'labor', 'time', 'efficiency', 'error_reduction', 'automation', 
  'scaling', 'training', 'overtime', 'benefits'
]);

// Agent ROI Analytics Table
export const agentROIAnalytics = pgTable('agent_roi_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  period: timePeriodEnum('period').notNull(),
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  tasksCompleted: integer('tasks_completed').default(0).notNull(),
  tasksFailed: integer('tasks_failed').default(0).notNull(),
  humanHoursSaved: decimal('human_hours_saved', { precision: 10, scale: 2 }).default('0').notNull(),
  humanHoursCost: decimal('human_hours_cost', { precision: 10, scale: 2 }).default('0').notNull(),
  aiOperatingCost: decimal('ai_operating_cost', { precision: 10, scale: 2 }).default('0').notNull(),
  netSavings: decimal('net_savings', { precision: 10, scale: 2 }).default('0').notNull(),
  roiPercentage: decimal('roi_percentage', { precision: 10, scale: 2 }).default('0').notNull(),
  efficiencyGain: decimal('efficiency_gain', { precision: 5, scale: 2 }).default('0').notNull(),
  errorReductionRate: decimal('error_reduction_rate', { precision: 5, scale: 4 }).default('0').notNull(),
  costPerTask: decimal('cost_per_task', { precision: 10, scale: 4 }).default('0').notNull(),
  averageTaskDuration: integer('average_task_duration').default(0).notNull(), // seconds
  satisfactionScore: decimal('satisfaction_score', { precision: 5, scale: 2 }).default('0').notNull(),
  breakdownByCategory: jsonb('breakdown_by_category').default({}).notNull(),
  comparisonToPrevious: jsonb('comparison_to_previous').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentPeriodIdx: uniqueIndex('agent_roi_analytics_agent_period_idx').on(table.agentId, table.periodStart, table.periodEnd),
  orgIdx: index('agent_roi_analytics_org_idx').on(table.organizationId),
  periodIdx: index('agent_roi_analytics_period_idx').on(table.period),
  roiIdx: index('agent_roi_analytics_roi_idx').on(table.roiPercentage),
}));

// Agent Cost Savings Table
export const agentCostSavings = pgTable('agent_cost_savings', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  category: costCategoryEnum('category').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).default('0').notNull(),
  description: text('description'),
  taskType: varchar('task_type', { length: 100 }),
  taskCount: integer('task_count').default(0).notNull(),
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  agentCategoryIdx: index('agent_cost_savings_agent_category_idx').on(table.agentId, table.category),
  orgIdx: index('agent_cost_savings_org_idx').on(table.organizationId),
  periodIdx: index('agent_cost_savings_period_idx').on(table.periodStart, table.periodEnd),
}));

// Agent Performance Metrics Table
export const agentPerformanceMetrics = pgTable('agent_performance_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metricType: varchar('metric_type', { length: 50 }).notNull(),
  metricValue: decimal('metric_value', { precision: 10, scale: 4 }).notNull(),
  context: jsonb('context').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
}, (table: TableRef) => ({
  agentTypeIdx: index('agent_performance_metrics_agent_type_idx').on(table.agentId, table.metricType),
  orgIdx: index('agent_performance_metrics_org_idx').on(table.organizationId),
  timestampIdx: index('agent_performance_metrics_timestamp_idx').on(table.timestamp),
}));

// Agent Task Completions Table
export const agentTaskCompletions = pgTable('agent_task_completions', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  taskType: varchar('task_type', { length: 100 }).notNull(),
  taskDescription: text('task_description'),
  status: varchar('status', { length: 20 }).default('completed').notNull(), // 'completed', 'failed', 'cancelled'
  estimatedHumanHours: decimal('estimated_human_hours', { precision: 5, scale: 2 }).default('1').notNull(),
  duration: integer('duration'), // seconds
  userRating: integer('user_rating'), // 1-5
  userFeedback: text('user_feedback'),
  errorMessage: text('error_message'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
}, (table: TableRef) => ({
  agentIdx: index('agent_task_completions_agent_idx').on(table.agentId),
  orgIdx: index('agent_task_completions_org_idx').on(table.organizationId),
  statusIdx: index('agent_task_completions_status_idx').on(table.status),
  completedIdx: index('agent_task_completions_completed_idx').on(table.completedAt),
  typeIdx: index('agent_task_completions_type_idx').on(table.taskType),
}));

// Export types for new tables
export type AgentPersonalMemory = typeof agentPersonalMemories.$inferSelect;
export type AgentUserRelationship = typeof agentUserRelationships.$inferSelect;
export type AgentMemoryPreference = typeof agentMemoryPreferences.$inferSelect;
export type AgentMemoryInsight = typeof agentMemoryInsights.$inferSelect;
export type AgentComputerSession = typeof agentComputerSessions.$inferSelect;
export type AgentBrowserAction = typeof agentBrowserActions.$inferSelect;
export type AgentSystemCommand = typeof agentSystemCommands.$inferSelect;
export type ChatPlatformConnection = typeof chatPlatformConnections.$inferSelect;
export type ChatMessageRow = typeof chatMessages.$inferSelect;
export type ChatUserMapping = typeof chatUserMappings.$inferSelect;
export type ChatChannelMapping = typeof chatChannelMappings.$inferSelect;
export type ChatPlatformWebhook = typeof chatPlatformWebhooks.$inferSelect;
export type AgentROIAnalytic = typeof agentROIAnalytics.$inferSelect;
export type AgentCostSaving = typeof agentCostSavings.$inferSelect;
export type AgentPerformanceMetric = typeof agentPerformanceMetrics.$inferSelect;
export type AgentTaskCompletion = typeof agentTaskCompletions.$inferSelect;

// Missing tables referenced by backend code
export const agentAvailability = pgTable('agent_availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 30 }).default('available').notNull(),
  availableFrom: timestamp('available_from'),
  availableUntil: timestamp('available_until'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const agentHierarchy = pgTable('agent_hierarchy', {
  id: uuid('id').primaryKey().defaultRandom(),
  parentAgentId: uuid('parent_agent_id').notNull(),
  childAgentId: uuid('child_agent_id').notNull(),
  teamId: uuid('team_id'),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  relationType: varchar('relation_type', { length: 50 }).default('supervision').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const costTracking = pgTable('cost_tracking', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id'),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  resourceType: varchar('resource_type', { length: 50 }).notNull(),
  cost: decimal('cost', { precision: 10, scale: 4 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  period: varchar('period', { length: 20 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const systemLogs = pgTable('system_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  level: varchar('level', { length: 20 }).notNull(),
  service: varchar('service', { length: 100 }).notNull(),
  message: text('message').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const voiceSettings = pgTable('voice_settings', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id'),
  provider: varchar('provider', { length: 50 }).notNull(),
  language: varchar('language', { length: 10 }).default('en-US').notNull(),
  voiceId: varchar('voice_id', { length: 100 }),
  settings: jsonb('settings').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const voiceSessions = pgTable('voice_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  agentId: uuid('agent_id'),
  status: varchar('status', { length: 30 }).default('active').notNull(),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
  duration: integer('duration'),
  recordingUrl: text('recording_url'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const voiceTranscripts = pgTable('voice_transcripts', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id').references(() => voiceSessions.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  speaker: varchar('speaker', { length: 50 }).notNull(),
  text: text('text').notNull(),
  startTime: decimal('start_time', { precision: 10, scale: 3 }),
  endTime: decimal('end_time', { precision: 10, scale: 3 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const agentCollaborations = pgTable('agent_collaborations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  initiatingAgentId: uuid('initiating_agent_id').notNull(),
  collaboratingAgentId: uuid('collaborating_agent_id').notNull(),
  taskType: varchar('task_type', { length: 100 }),
  status: varchar('status', { length: 30 }).default('active').notNull(),
  result: jsonb('result'),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Missing type exports
export type AgentRole = string;
export type VoiceSession = typeof voiceSessions.$inferSelect;
export type VoiceTranscript = typeof voiceTranscripts.$inferSelect;
export type AgentCollaboration = typeof agentCollaborations.$inferSelect;

// Agent workflows table (referenced by workflow-builder-service)
export const agentWorkflows = pgTable('agent_workflows', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id'),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  version: varchar('version', { length: 20 }).default('1.0.0').notNull(),
  status: varchar('status', { length: 30 }).default('draft').notNull(),
  definition: jsonb('definition').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Workflow nodes table
export const workflowNodes = pgTable('workflow_nodes', {
  id: uuid('id').primaryKey().defaultRandom(),
  workflowId: uuid('workflow_id').references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  config: jsonb('config').default({}).notNull(),
  position: jsonb('position').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Workflow connections table
export const workflowConnections = pgTable('workflow_connections', {
  id: uuid('id').primaryKey().defaultRandom(),
  workflowId: uuid('workflow_id').references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  sourceNodeId: uuid('source_node_id').notNull(),
  targetNodeId: uuid('target_node_id').notNull(),
  sourcePort: varchar('source_port', { length: 50 }).default('output'),
  targetPort: varchar('target_port', { length: 50 }).default('input'),
  condition: jsonb('condition'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Workflow variables table
export const workflowVariables = pgTable('workflow_variables', {
  id: uuid('id').primaryKey().defaultRandom(),
  workflowId: uuid('workflow_id').references(() => workflows.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  defaultValue: jsonb('default_value'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type aliases for workflow builder service
export type AgentWorkflow = typeof agentWorkflows.$inferSelect;
export type WorkflowNode = typeof workflowNodes.$inferSelect;
export type WorkflowConnection = typeof workflowConnections.$inferSelect;
export type WorkflowExecution = typeof workflowExecutions.$inferSelect;
export type WorkflowVariable = typeof workflowVariables.$inferSelect;

// Agent communications table
export const agent_communications = pgTable('agent_communications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  fromAgentId: uuid('from_agent_id').notNull(),
  toAgentId: uuid('to_agent_id').notNull(),
  messageType: varchar('message_type', { length: 50 }).notNull(),
  content: jsonb('content').notNull(),
  status: varchar('status', { length: 30 }).default('sent').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Account lockouts table
export const accountLockouts = pgTable('account_lockouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  lockoutReason: varchar('lockout_reason', { length: 100 }).notNull(),
  lockedAt: timestamp('locked_at').defaultNow().notNull(),
  unlockAt: timestamp('unlock_at'),
  attemptCount: integer('attempt_count').default(0).notNull(),
  status: varchar('status', { length: 30 }).default('locked').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Agent alerts table
export const agentAlerts = pgTable('agent_alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  alertType: varchar('alert_type', { length: 50 }).notNull(),
  severity: varchar('severity', { length: 20 }).notNull(),
  status: varchar('status', { length: 30 }).default('active').notNull(),
  message: text('message').notNull(),
  acknowledged: boolean('acknowledged').default(false).notNull(),
  startedAt: timestamp('started_at'),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: uuid('resolved_by'),
  correlationId: uuid('correlation_id'),
  ruleId: uuid('rule_id'),
  ruleName: varchar('rule_name', { length: 255 }),
  threshold: decimal('threshold', { precision: 10, scale: 4 }),
  thresholdMax: decimal('threshold_max', { precision: 10, scale: 4 }),
  metricValue: decimal('metric_value', { precision: 10, scale: 4 }),
  timeWindowStart: timestamp('time_window_start'),
  timeWindowEnd: timestamp('time_window_end'),
  timeWindowDays: integer('time_window_days'),
  autoActions: jsonb('auto_actions').default([]).notNull(),
  relatedAlerts: jsonb('related_alerts').default([]).notNull(),
  notificationTemplate: varchar('notification_template', { length: 255 }),
  resolution: text('resolution'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Performance thresholds table
export const performanceThresholds = pgTable('performance_thresholds', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  metricName: varchar('metric_name', { length: 100 }).notNull(),
  warningThreshold: decimal('warning_threshold', { precision: 10, scale: 2 }),
  criticalThreshold: decimal('critical_threshold', { precision: 10, scale: 2 }),
  enabled: boolean('enabled').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Agent sessions table
export const agentSessions = pgTable('agent_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').references(() => users.id),
  status: varchar('status', { length: 30 }).default('active').notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Agent schedules table
export const agentSchedules = pgTable('agent_schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  cronExpression: varchar('cron_expression', { length: 100 }),
  status: varchar('status', { length: 30 }).default('active').notNull(),
  nextExecutionAt: timestamp('next_execution_at'),
  lastExecutionAt: timestamp('last_execution_at'),
  config: jsonb('config').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Agent time blocks table
export const agentTimeBlocks = pgTable('agent_time_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  scheduleId: uuid('schedule_id').references(() => agentSchedules.id, { onDelete: 'cascade' }).notNull(),
  dayOfWeek: integer('day_of_week').notNull(),
  startTime: varchar('start_time', { length: 10 }).notNull(),
  endTime: varchar('end_time', { length: 10 }).notNull(),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Agent permissions table
export const agentPermissions = pgTable('agent_permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  permission: varchar('permission', { length: 100 }).notNull(),
  granted: boolean('granted').default(true).notNull(),
  grantedBy: uuid('granted_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Agent teams table
export const agentTeams = pgTable('agent_teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  leadAgentId: uuid('lead_agent_id'),
  status: varchar('status', { length: 30 }).default('active').notNull(),
  config: jsonb('config').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Agent insights table
export const agent_insights = pgTable('agent_insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  insightType: varchar('insight_type', { length: 50 }).notNull(),
  data: jsonb('data').notNull(),
  confidence: decimal('confidence', { precision: 3, scale: 2 }).default('0').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Breach checks table
export const breachChecks = pgTable('breach_checks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  isBreached: boolean('is_breached').notNull(),
  breachCount: integer('breach_count').default(0).notNull(),
  sources: jsonb('sources').default([]).notNull(),
  checkedAt: timestamp('checked_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Task history table
export const task_history = pgTable('task_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  taskId: uuid('task_id').notNull(),
  action: varchar('action', { length: 50 }).notNull(),
  previousValue: jsonb('previous_value'),
  newValue: jsonb('new_value'),
  changedBy: uuid('changed_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Agent learning log table
export const agent_learning_log = pgTable('agent_learning_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  lesson: text('lesson').notNull(),
  context: jsonb('context').default({}).notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  importance: decimal('importance', { precision: 3, scale: 2 }).default('0').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Type aliases for all new tables
export type AgentMetric = { id: string; agentId: string; metricType: string; value: number; timestamp: Date };
export type AgentAlert = typeof agentAlerts.$inferSelect;
export type PerformanceThreshold = typeof performanceThresholds.$inferSelect;
export type AgentSession = typeof agentSessions.$inferSelect;
export type ScheduleExecution = { id: string; scheduleId: string; status: string; startedAt: Date; completedAt?: Date; result?: any };
export type AgentRecurringSchedule = typeof agentSchedules.$inferSelect;
export type AgentTimeBlock = typeof agentTimeBlocks.$inferSelect;
export type AgentPermission = typeof agentPermissions.$inferSelect;
export type AgentTeam = typeof agentTeams.$inferSelect;
export type SubAgent = { id: string; parentId: string; agentId: string; role: string; createdAt: Date };
export type MainAgent = { id: string; agentId: string; teamId: string; isLead: boolean; createdAt: Date };
export type AgentCategory = string;
export type CoreCapability = string;

// Agent metrics table
export const agentMetrics = pgTable('agent_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  metricType: varchar('metric_type', { length: 50 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  value: decimal('value', { precision: 10, scale: 4 }).notNull(),
  unit: varchar('unit', { length: 30 }).notNull(),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Agent recurring schedules table
export const agentRecurringSchedules = pgTable('agent_recurring_schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  cronExpression: varchar('cron_expression', { length: 100 }).notNull(),
  timezone: varchar('timezone', { length: 50 }).default('UTC').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastRunAt: timestamp('last_run_at'),
  nextRunAt: timestamp('next_run_at'),
  config: jsonb('config').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Schedule executions table
export const scheduleExecutions = pgTable('schedule_executions', {
  id: uuid('id').primaryKey().defaultRandom(),
  scheduleId: uuid('schedule_id').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 30 }).default('pending').notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  result: jsonb('result'),
  error: text('error'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Company Brain - Knowledge Management System

// Enums for Company Brain
export const knowledgeNodeTypeEnum = pgEnum('knowledge_node_type', ['process', 'decision', 'client', 'project', 'technical', 'tribal', 'sop', 'workflow', 'playbook', 'meeting', 'email', 'document', 'ai_conversation', 'custom']);
export const knowledgeSourceTypeEnum = pgEnum('knowledge_source_type', ['document', 'slack', 'email', 'jira', 'asana', 'trello', 'github', 'gitlab', 'google_drive', 'sharepoint', 'onedrive', 'notion', 'confluence', 'zoom', 'google_meet', 'ai_agent', 'manual', 'api']);
export const knowledgeRelationshipTypeEnum = pgEnum('knowledge_relationship_type', ['related_to', 'depends_on', 'references', 'part_of', 'follows', 'precedes', 'contradicts', 'supports', 'implements', 'documents', 'mentions', 'authored_by', 'approved_by', 'reviewed_by']);
export const knowledgeStatusEnum = pgEnum('knowledge_status', ['draft', 'active', 'archived', 'deprecated', 'verified', 'pending_review']);
export const personTypeEnum = pgEnum('person_type', ['employee', 'client', 'partner', 'contractor', 'vendor', 'consultant']);
export const projectStatusEnum = pgEnum('project_status', ['planning', 'active', 'on_hold', 'completed', 'cancelled', 'archived']);
export const searchIntentEnum = pgEnum('search_intent', ['informational', 'navigational', 'transactional', 'troubleshooting', 'comparison', 'how_to', 'what_is', 'why', 'who']);

// KnowledgeNode - Main knowledge storage
export const knowledgeNodes = pgTable('knowledge_nodes', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 500 }).notNull(),
  content: text('content').notNull(),
  summary: text('summary'),
  type: knowledgeNodeTypeEnum('type').notNull(),
  sourceType: knowledgeSourceTypeEnum('source_type').notNull(),
  sourceId: varchar('source_id', { length: 255 }),
  sourceUrl: text('source_url'),
  status: knowledgeStatusEnum('status').default('draft').notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  tags: jsonb('tags').default([]).notNull(),
  confidenceScore: decimal('confidence_score', { precision: 3, scale: 2 }).default('0.00').notNull(),
  priorityScore: decimal('priority_score', { precision: 3, scale: 2 }).default('0.00').notNull(),
  viewCount: integer('view_count').default(0).notNull(),
  searchCount: integer('search_count').default(0).notNull(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  departmentId: uuid('department_id'),
  projectId: uuid('project_id'),
  clientId: uuid('client_id'),
  verifiedBy: uuid('verified_by').references(() => users.id, { onDelete: 'set null' }),
  verifiedAt: timestamp('verified_at'),
  lastAccessedAt: timestamp('last_accessed_at'),
  expiresAt: timestamp('expires_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_nodes_org_idx').on(table.organizationId),
  typeIdx: index('knowledge_nodes_type_idx').on(table.type),
  sourceTypeIdx: index('knowledge_nodes_source_type_idx').on(table.sourceType),
  authorIdx: index('knowledge_nodes_author_idx').on(table.authorId),
  projectIdx: index('knowledge_nodes_project_idx').on(table.projectId),
  clientIdx: index('knowledge_nodes_client_idx').on(table.clientId),
  statusIdx: index('knowledge_nodes_status_idx').on(table.status),
  createdAtIdx: index('knowledge_nodes_created_at_idx').on(table.createdAt),
  priorityScoreIdx: index('knowledge_nodes_priority_score_idx').on(table.priorityScore),
}));

// KnowledgeRelationship - Relationships between knowledge nodes
export const knowledgeRelationships = pgTable('knowledge_relationships', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  sourceNodeId: uuid('source_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  targetNodeId: uuid('target_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  relationshipType: knowledgeRelationshipTypeEnum('relationship_type').notNull(),
  strength: decimal('strength', { precision: 3, scale: 2 }).default('0.50').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_relationships_org_idx').on(table.organizationId),
  sourceNodeIdx: index('knowledge_relationships_source_node_idx').on(table.sourceNodeId),
  targetNodeIdx: index('knowledge_relationships_target_node_idx').on(table.targetNodeId),
  relationshipTypeIdx: index('knowledge_relationships_type_idx').on(table.relationshipType),
  sourceTargetIdx: uniqueIndex('knowledge_relationships_source_target_idx').on(table.sourceNodeId, table.targetNodeId, table.relationshipType),
}));

// Person - Extended person tracking for knowledge management
export const knowledgePersons = pgTable('knowledge_persons', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  type: personTypeEnum('type').notNull(),
  role: varchar('role', { length: 100 }),
  department: varchar('department', { length: 100 }),
  expertiseAreas: jsonb('expertise_areas').default([]).notNull(),
  knowledgeContributionScore: decimal('knowledge_contribution_score', { precision: 5, scale: 2 }).default('0.00').notNull(),
  departureDate: timestamp('departure_date'),
  replacementId: uuid('replacement_id').references(() => knowledgePersons.id, { onDelete: 'set null' }),
  isCriticalKnowledgeHolder: boolean('is_critical_knowledge_holder').default(false).notNull(),
  riskScore: decimal('risk_score', { precision: 3, scale: 2 }).default('0.00').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_persons_org_idx').on(table.organizationId),
  userIdIdx: index('knowledge_persons_user_idx').on(table.userId),
  emailIdx: index('knowledge_persons_email_idx').on(table.email),
  typeIdx: index('knowledge_persons_type_idx').on(table.type),
  departmentIdx: index('knowledge_persons_department_idx').on(table.department),
}));

// Project - Project tracking for knowledge management
export const knowledgeProjects = pgTable('knowledge_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: projectStatusEnum('status').default('planning').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  timeline: jsonb('timeline').default({}).notNull(),
  stakeholderIds: jsonb('stakeholder_ids').default([]).notNull(),
  teamMemberIds: jsonb('team_member_ids').default([]).notNull(),
  knowledgeNodeIds: jsonb('knowledge_node_ids').default([]).notNull(),
  goals: jsonb('goals').default([]).notNull(),
  blockers: jsonb('blockers').default([]).notNull(),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  actualCost: decimal('actual_cost', { precision: 10, scale: 2 }),
  progress: integer('progress').default(0).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_projects_org_idx').on(table.organizationId),
  statusIdx: index('knowledge_projects_status_idx').on(table.status),
}));

// Client - Client tracking for knowledge management
export const knowledgeClients = pgTable('knowledge_clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 100 }),
  contactInfo: jsonb('contact_info').default({}).notNull(),
  interactionHistory: jsonb('interaction_history').default([]).notNull(),
  preferences: jsonb('preferences').default({}).notNull(),
  communicationPatterns: jsonb('communication_patterns').default({}).notNull(),
  knowledgeNodeIds: jsonb('knowledge_node_ids').default([]).notNull(),
  relationshipScore: decimal('relationship_score', { precision: 3, scale: 2 }).default('0.00').notNull(),
  riskLevel: varchar('risk_level', { length: 20 }).default('low'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_clients_org_idx').on(table.organizationId),
  industryIdx: index('knowledge_clients_industry_idx').on(table.industry),
}));

// SearchQuery - Search analytics
export const knowledgeSearchQueries = pgTable('knowledge_search_queries', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  queryText: text('query_text').notNull(),
  resultsCount: integer('results_count').default(0).notNull(),
  resultsClicked: jsonb('results_clicked').default([]).notNull(),
  intentCategory: searchIntentEnum('intent_category'),
  filters: jsonb('filters').default({}).notNull(),
  sessionId: varchar('session_id', { length: 255 }),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_search_queries_org_idx').on(table.organizationId),
  userIdIdx: index('knowledge_search_queries_user_idx').on(table.userId),
  timestampIdx: index('knowledge_search_queries_timestamp_idx').on(table.timestamp),
  intentIdx: index('knowledge_search_queries_intent_idx').on(table.intentCategory),
}));

// Knowledge Contributions - Manual knowledge additions
export const knowledgeContributions = pgTable('knowledge_contributions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  knowledgeNodeId: uuid('knowledge_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  contributorId: uuid('contributor_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  contributionType: varchar('contribution_type', { length: 50 }).notNull(),
  content: text('content').notNull(),
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  reviewedBy: uuid('reviewed_by').references(() => users.id, { onDelete: 'set null' }),
  reviewedAt: timestamp('reviewed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_contributions_org_idx').on(table.organizationId),
  knowledgeNodeIdx: index('knowledge_contributions_knowledge_node_idx').on(table.knowledgeNodeId),
  contributorIdx: index('knowledge_contributions_contributor_idx').on(table.contributorId),
  statusIdx: index('knowledge_contributions_status_idx').on(table.status),
}));

// Knowledge Verification - Verification records
export const knowledgeVerifications = pgTable('knowledge_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  knowledgeNodeId: uuid('knowledge_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  verifierId: uuid('verifier_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  status: varchar('status', { length: 50 }).default('approved').notNull(),
  confidenceLevel: varchar('confidence_level', { length: 20 }).default('high'),
  notes: text('notes'),
  previousStatus: varchar('previous_status', { length: 50 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_verifications_org_idx').on(table.organizationId),
  knowledgeNodeIdx: index('knowledge_verifications_knowledge_node_idx').on(table.knowledgeNodeId),
  verifierIdx: index('knowledge_verifications_verifier_idx').on(table.verifierId),
}));

// Knowledge Analytics - Analytics data
export const knowledgeAnalytics = pgTable('knowledge_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  metricType: varchar('metric_type', { length: 100 }).notNull(),
  metricName: varchar('metric_name', { length: 255 }).notNull(),
  value: decimal('value', { precision: 15, scale: 2 }).notNull(),
  dimensions: jsonb('dimensions').default({}).notNull(),
  period: varchar('period', { length: 50 }).notNull(),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_analytics_org_idx').on(table.organizationId),
  metricTypeIdx: index('knowledge_analytics_metric_type_idx').on(table.metricType),
  periodIdx: index('knowledge_analytics_period_idx').on(table.period),
  recordedAtIdx: index('knowledge_analytics_recorded_at_idx').on(table.recordedAt),
}));

// Document Uploads - Document tracking
export const knowledgeDocuments = pgTable('knowledge_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  knowledgeNodeId: uuid('knowledge_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 500 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  fileSize: integer('file_size').notNull(),
  fileUrl: text('file_url').notNull(),
  storagePath: text('storage_path'),
  ocrProcessed: boolean('ocr_processed').default(false).notNull(),
  ocrText: text('ocr_text'),
  version: integer('version').default(1).notNull(),
  parentDocumentId: uuid('parent_document_id').references(() => knowledgeDocuments.id, { onDelete: 'set null' }),
  uploadedBy: uuid('uploaded_by').references(() => users.id, { onDelete: 'set null' }),
  processingStatus: varchar('processing_status', { length: 50 }).default('pending').notNull(),
  processingError: text('processing_error'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_documents_org_idx').on(table.organizationId),
  knowledgeNodeIdx: index('knowledge_documents_knowledge_node_idx').on(table.knowledgeNodeId),
  uploadedByIdx: index('knowledge_documents_uploaded_by_idx').on(table.uploadedBy),
  processingStatusIdx: index('knowledge_documents_processing_status_idx').on(table.processingStatus),
}));

// Integration Sync Logs - Track integration syncs
export const knowledgeIntegrationSyncs = pgTable('knowledge_integration_syncs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  integrationId: uuid('integration_id').references(() => integrations.id, { onDelete: 'cascade' }).notNull(),
  sourceType: knowledgeSourceTypeEnum('source_type').notNull(),
  syncType: varchar('sync_type', { length: 50 }).notNull(),
  status: varchar('status', { length: 50 }).default('running').notNull(),
  itemsProcessed: integer('items_processed').default(0).notNull(),
  itemsCreated: integer('items_created').default(0).notNull(),
  itemsUpdated: integer('items_updated').default(0).notNull(),
  itemsFailed: integer('items_failed').default(0).notNull(),
  errorDetails: jsonb('error_details').default([]).notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  nextSyncAt: timestamp('next_sync_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_integration_syncs_org_idx').on(table.organizationId),
  integrationIdx: index('knowledge_integration_syncs_integration_idx').on(table.integrationId),
  sourceTypeIdx: index('knowledge_integration_syncs_source_type_idx').on(table.sourceType),
  statusIdx: index('knowledge_integration_syncs_status_idx').on(table.status),
}));

// Onboarding Progress - Track onboarding journeys
export const knowledgeOnboardingProgress = pgTable('knowledge_onboarding_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 100 }).notNull(),
  department: varchar('department', { length: 100 }),
  progress: integer('progress').default(0).notNull(),
  modulesCompleted: jsonb('modules_completed').default([]).notNull(),
  questionsAsked: jsonb('questions_asked').default([]).notNull(),
  knowledgeGapsIdentified: jsonb('knowledge_gaps_identified').default([]).notNull(),
  mentorId: uuid('mentor_id').references(() => users.id, { onDelete: 'set null' }),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_onboarding_progress_org_idx').on(table.organizationId),
  userIdIdx: index('knowledge_onboarding_progress_user_idx').on(table.userId),
  roleIdx: index('knowledge_onboarding_progress_role_idx').on(table.role),
}));

// Company Brain Internal Chat System Tables

// Chat Channels - Organizational chat channels
export const companyBrainChatChannels = pgTable('company_brain_chat_channels', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(), // 'public', 'private', 'direct', 'group'
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  members: jsonb('members').default([]).notNull(), // Array of user IDs
  admins: jsonb('admins').default([]).notNull(), // Array of user IDs
  linkedProjectId: uuid('linked_project_id'), // Link to project timeline
  linkedSOPId: uuid('linked_sop_id'), // Link to SOP
  isArchived: boolean('is_archived').default(false).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_channels_org_idx').on(table.organizationId),
  typeIdx: index('company_brain_chat_channels_type_idx').on(table.type),
  createdByIdx: index('company_brain_chat_channels_created_by_idx').on(table.createdBy),
}));

// Chat Conversations - Individual or group conversations
export const companyBrainChatConversations = pgTable('company_brain_chat_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  channelId: uuid('channel_id').references(() => companyBrainChatChannels.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull(), // 'direct', 'group', 'channel'
  participants: jsonb('participants').default([]).notNull(), // Array of user IDs
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }),
  lastMessageAt: timestamp('last_message_at'),
  lastMessagePreview: text('last_message_preview'),
  isPinned: boolean('is_pinned').default(false).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_conversations_org_idx').on(table.organizationId),
  channelIdIdx: index('company_brain_chat_conversations_channel_idx').on(table.channelId),
  typeIdx: index('company_brain_chat_conversations_type_idx').on(table.type),
  createdByIdx: index('company_brain_chat_conversations_created_by_idx').on(table.createdBy),
  lastMessageAtIdx: index('company_brain_chat_conversations_last_message_idx').on(table.lastMessageAt),
}));

// Chat Messages - Individual messages in conversations
export const companyBrainChatMessages = pgTable('company_brain_chat_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainChatConversations.id, { onDelete: 'cascade' }).notNull(),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'set null' }),
  senderName: varchar('sender_name', { length: 255 }),
  content: text('content').notNull(),
  messageType: varchar('message_type', { length: 50 }).notNull(), // 'text', 'image', 'file', 'code', 'system'
  replyToId: uuid('reply_to_id').references(() => companyBrainChatMessages.id, { onDelete: 'set null' }),
  threadId: uuid('thread_id'), // For threaded conversations
  mentions: jsonb('mentions').default([]).notNull(), // Array of user IDs mentioned
  reactions: jsonb('reactions').default([]).notNull(), // Array of {emoji, userIds}
  attachments: jsonb('attachments').default([]).notNull(), // Array of file metadata
  isEdited: boolean('is_edited').default(false).notNull(),
  editedAt: timestamp('edited_at'),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  deletedAt: timestamp('deleted_at'),
  isPinned: boolean('is_pinned').default(false).notNull(),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  extractedKnowledge: jsonb('extracted_knowledge').default({}).notNull(), // Auto-extracted knowledge
  linkedSOPId: uuid('linked_sop_id'), // Auto-linked SOP
  linkedProjectId: uuid('linked_project_id'), // Auto-linked project
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_messages_org_idx').on(table.organizationId),
  conversationIdIdx: index('company_brain_chat_messages_conversation_idx').on(table.conversationId),
  senderIdIdx: index('company_brain_chat_messages_sender_idx').on(table.senderId),
  threadIdIdx: index('company_brain_chat_messages_thread_idx').on(table.threadId),
  replyToIdIdx: index('company_brain_chat_messages_reply_to_idx').on(table.replyToId),
  createdAtIdx: index('company_brain_chat_messages_created_idx').on(table.createdAt),
}));

// Chat Threads - Threaded conversations within channels
export const companyBrainChatThreads = pgTable('company_brain_chat_threads', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  channelId: uuid('channel_id').references(() => companyBrainChatChannels.id, { onDelete: 'cascade' }).notNull(),
  parentMessageId: uuid('parent_message_id').references(() => companyBrainChatMessages.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }),
  participants: jsonb('participants').default([]).notNull(),
  messageCount: integer('message_count').default(0).notNull(),
  isResolved: boolean('is_resolved').default(false).notNull(),
  resolvedBy: uuid('resolved_by').references(() => users.id, { onDelete: 'set null' }),
  resolvedAt: timestamp('resolved_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_threads_org_idx').on(table.organizationId),
  channelIdIdx: index('company_brain_chat_threads_channel_idx').on(table.channelId),
  parentMessageIdIdx: index('company_brain_chat_threads_parent_idx').on(table.parentMessageId),
}));

// AI Assistant Conversations - Chat with Company Brain AI
export const companyBrainAIConversations = pgTable('company_brain_ai_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  assistantType: varchar('assistant_type', { length: 50 }).notNull(), // 'knowledge', 'onboarding', 'expertise', 'project'
  title: varchar('title', { length: 255 }),
  context: jsonb('context').default({}).notNull(), // Conversation context
  messageCount: integer('message_count').default(0).notNull(),
  lastMessageAt: timestamp('last_message_at'),
  isArchived: boolean('is_archived').default(false).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_ai_conversations_org_idx').on(table.organizationId),
  userIdIdx: index('company_brain_ai_conversations_user_idx').on(table.userId),
  assistantTypeIdx: index('company_brain_ai_conversations_type_idx').on(table.assistantType),
  lastMessageAtIdx: index('company_brain_ai_conversations_last_idx').on(table.lastMessageAt),
}));

// AI Assistant Messages - Messages in AI conversations
export const companyBrainAIMessages = pgTable('company_brain_ai_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainAIConversations.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 50 }).notNull(), // 'user', 'assistant', 'system'
  content: text('content').notNull(),
  sources: jsonb('sources').default([]).notNull(), // Knowledge sources used
  confidence: decimal('confidence', { precision: 3, scale: 2 }), // AI confidence score
  tokensUsed: integer('tokens_used'),
  modelUsed: varchar('model_used', { length: 100 }),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_ai_messages_org_idx').on(table.organizationId),
  conversationIdIdx: index('company_brain_ai_messages_conversation_idx').on(table.conversationId),
  roleIdx: index('company_brain_ai_messages_role_idx').on(table.role),
  createdAtIdx: index('company_brain_ai_messages_created_idx').on(table.createdAt),
}));

// Real-time Collaboration Features
export const companyBrainChatTypingIndicators = pgTable('company_brain_chat_typing', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainChatConversations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  isTyping: boolean('is_typing').default(false).notNull(),
  lastSeenAt: timestamp('last_seen_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_typing_org_idx').on(table.organizationId),
  conversationIdIdx: index('company_brain_chat_typing_conversation_idx').on(table.conversationId),
  userIdIdx: index('company_brain_chat_typing_user_idx').on(table.userId),
}));

export const companyBrainChatReadReceipts = pgTable('company_brain_chat_read_receipts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  messageId: uuid('message_id').references(() => companyBrainChatMessages.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  readAt: timestamp('read_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_read_receipts_org_idx').on(table.organizationId),
  messageIdIdx: index('company_brain_chat_read_receipts_message_idx').on(table.messageId),
  userIdIdx: index('company_brain_chat_read_receipts_user_idx').on(table.userId),
}));

// Type aliases for Company Brain Chat System
export type CompanyBrainChatChannel = typeof companyBrainChatChannels.$inferSelect;
export type CompanyBrainChatConversation = typeof companyBrainChatConversations.$inferSelect;
export type CompanyBrainChatMessage = typeof companyBrainChatMessages.$inferSelect;
export type CompanyBrainChatThread = typeof companyBrainChatThreads.$inferSelect;
export type CompanyBrainAIConversation = typeof companyBrainAIConversations.$inferSelect;
export type CompanyBrainAIMessage = typeof companyBrainAIMessages.$inferSelect;
export type CompanyBrainChatTypingIndicator = typeof companyBrainChatTypingIndicators.$inferSelect;
export type CompanyBrainChatReadReceipt = typeof companyBrainChatReadReceipts.$inferSelect;

// Type aliases for Company Brain
export type KnowledgeNode = typeof knowledgeNodes.$inferSelect;
export type KnowledgeRelationship = typeof knowledgeRelationships.$inferSelect;
export type KnowledgePerson = typeof knowledgePersons.$inferSelect;
export type KnowledgeProject = typeof knowledgeProjects.$inferSelect;
export type KnowledgeClient = typeof knowledgeClients.$inferSelect;
export type KnowledgeSearchQuery = typeof knowledgeSearchQueries.$inferSelect;
export type KnowledgeContribution = typeof knowledgeContributions.$inferSelect;
export type KnowledgeVerification = typeof knowledgeVerifications.$inferSelect;
export type KnowledgeAnalytics = typeof knowledgeAnalytics.$inferSelect;
export type KnowledgeDocument = typeof knowledgeDocuments.$inferSelect;
export type KnowledgeIntegrationSync = typeof knowledgeIntegrationSyncs.$inferSelect;
export type KnowledgeOnboardingProgress = typeof knowledgeOnboardingProgress.$inferSelect;

// Remaining type aliases
export type AgentSchedule = typeof agentSchedules.$inferSelect;
export type AgentAvailability = typeof agentAvailability.$inferSelect;
export type CostTracking = typeof costTracking.$inferSelect;
