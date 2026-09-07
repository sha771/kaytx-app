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

// Company Brain Chat Tables - Extended (for channels, threads, etc.)

export const companyBrainChatChannels = pgTable('company_brain_chat_channels', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'direct', 'group', 'channel'
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }),
  isPinned: boolean('is_pinned').default(false).notNull(),
  isArchived: boolean('is_archived').default(false).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_brain_chat_channels_org_idx').on(table.organizationId),
  typeIdx: index('company_brain_chat_channels_type_idx').on(table.type),
  createdByIdx: index('company_brain_chat_channels_created_by_idx').on(table.createdBy),
}));

export const companyBrainChatConversationsExtended = pgTable('company_brain_chat_conversations_extended', {
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
export const companyBrainChatMessagesExtended = pgTable('company_brain_chat_messages_extended', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainChatConversationsExtended.id, { onDelete: 'cascade' }).notNull(),
  senderId: uuid('sender_id').references(() => users.id, { onDelete: 'set null' }),
  senderName: varchar('sender_name', { length: 255 }),
  content: text('content').notNull(),
  messageType: varchar('message_type', { length: 50 }).notNull(), // 'text', 'image', 'file', 'code', 'system'
  replyToId: uuid('reply_to_id').references(() => companyBrainChatMessagesExtended.id, { onDelete: 'set null' }),
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
  parentMessageId: uuid('parent_message_id').references(() => companyBrainChatMessagesExtended.id, { onDelete: 'cascade' }).notNull(),
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

// Skill.md - AI Agent Knowledge Base Files
export const agentSkillFiles = pgTable('agent_skill_files', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').references(() => aiAgents.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  
  // Original file information
  originalFileName: varchar('original_file_name', { length: 500 }).notNull(),
  originalFilePath: text('original_file_path'),
  originalMimeType: varchar('original_mime_type', { length: 100 }).notNull(),
  originalFileSize: integer('original_file_size').notNull(),
  originalFileHash: varchar('original_file_hash', { length: 64 }),
  
  // Generated markdown content
  markdownContent: text('markdown_content').notNull(),
  markdownFilePath: text('markdown_file_path'),
  
  // Knowledge extraction
  extractedTopics: jsonb('extracted_topics').default([]).notNull(),
  extractedEntities: jsonb('extracted_entities').default([]).notNull(),
  extractedKeywords: jsonb('extracted_keywords').default([]).notNull(),
  summary: text('summary'),
  
  // Vector embedding for semantic search
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  
  // Classification and metadata
  category: varchar('category', { length: 100 }),
  tags: jsonb('tags').default([]).notNull(),
  language: varchar('language', { length: 10 }).default('en'),
  difficulty: varchar('difficulty', { length: 20 }), // 'beginner', 'intermediate', 'advanced'
  
  // Processing status
  processingStatus: varchar('processing_status', { length: 50 }).default('pending'), // 'pending', 'processing', 'completed', 'failed'
  processingError: text('processing_error'),
  processingStartedAt: timestamp('processing_started_at'),
  processingCompletedAt: timestamp('processing_completed_at'),
  
  // Usage tracking
  accessCount: integer('access_count').default(0).notNull(),
  lastAccessedAt: timestamp('last_accessed_at'),
  relevanceScore: decimal('relevance_score', { precision: 3, scale: 2 }).default('0.50'),
  
  // Relationships
  relatedFileIds: jsonb('related_file_ids').default([]).notNull(),
  parentFileId: uuid('parent_file_id').references(() => agentSkillFiles.id, { onDelete: 'set null' }),
  
  // Open Knowledge Graph format
  knowledgeGraph: jsonb('knowledge_graph').default({}).notNull(),
  triples: jsonb('triples').default([]).notNull(), // Subject-Predicate-Object triples
  
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('agent_skill_files_org_idx').on(table.organizationId),
  agentIdIdx: index('agent_skill_files_agent_idx').on(table.agentId),
  userIdIdx: index('agent_skill_files_user_idx').on(table.userId),
  categoryIdx: index('agent_skill_files_category_idx').on(table.category),
  processingStatusIdx: index('agent_skill_files_status_idx').on(table.processingStatus),
  createdAtIdx: index('agent_skill_files_created_idx').on(table.createdAt),
  relevanceScoreIdx: index('agent_skill_files_relevance_idx').on(table.relevanceScore),
  embeddingVectorIdx: index('agent_skill_files_embedding_idx').using('ivfflat', table.embeddingVector),
}));

// Skill.md File Chunks - For chunked document processing
export const agentSkillFileChunks = pgTable('agent_skill_file_chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  skillFileId: uuid('skill_file_id').references(() => agentSkillFiles.id, { onDelete: 'cascade' }).notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').references(() => aiAgents.id, { onDelete: 'cascade' }),
  
  chunkIndex: integer('chunk_index').notNull(),
  chunkContent: text('chunk_content').notNull(),
  chunkSummary: text('chunk_summary'),
  
  // Vector embedding for chunk-level search
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  
  // Chunk metadata
  startPosition: integer('start_position'),
  endPosition: integer('end_position'),
  tokenCount: integer('token_count'),
  
  // Chunk classification
  chunkType: varchar('chunk_type', { length: 50 }), // 'introduction', 'body', 'conclusion', 'code', 'table'
  importanceScore: decimal('importance_score', { precision: 3, scale: 2 }).default('0.50'),
  
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  skillFileIdIdx: index('agent_skill_chunks_file_idx').on(table.skillFileId),
  orgIdx: index('agent_skill_chunks_org_idx').on(table.organizationId),
  agentIdIdx: index('agent_skill_chunks_agent_idx').on(table.agentId),
  chunkIndexIdx: index('agent_skill_chunks_index_idx').on(table.chunkIndex),
  embeddingVectorIdx: index('agent_skill_chunks_embedding_idx').using('ivfflat', table.embeddingVector),
}));

// Skill.md Knowledge Graph - Open Knowledge Graph format
export const agentSkillKnowledgeGraph = pgTable('agent_skill_knowledge_graph', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  agentId: uuid('agent_id').references(() => aiAgents.id, { onDelete: 'cascade' }),
  
  // Knowledge graph nodes (entities)
  nodeId: varchar('node_id', { length: 255 }).notNull(),
  nodeType: varchar('node_type', { length: 100 }).notNull(), // 'concept', 'entity', 'relation', 'attribute'
  nodeLabel: varchar('node_label', { length: 500 }).notNull(),
  nodeProperties: jsonb('node_properties').default({}).notNull(),
  
  // Vector embedding for node similarity
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  
  // Graph structure
  connections: jsonb('connections').default([]).notNull(), // Connected node IDs
  connectionTypes: jsonb('connection_types').default({}).notNull(), // Map of connectionId -> relationType
  
  // Source tracking
  sourceFileIds: jsonb('source_file_ids').default([]).notNull(),
  confidence: decimal('confidence', { precision: 3, scale: 2 }).default('0.50'),
  
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('agent_skill_graph_org_idx').on(table.organizationId),
  agentIdIdx: index('agent_skill_graph_agent_idx').on(table.agentId),
  nodeIdIdx: uniqueIndex('agent_skill_graph_node_idx').on(table.nodeId),
  nodeTypeIdx: index('agent_skill_graph_type_idx').on(table.nodeType),
  embeddingVectorIdx: index('agent_skill_graph_embedding_idx').using('ivfflat', table.embeddingVector),
}));

// Real-time Collaboration Features
export const companyBrainChatTypingIndicators = pgTable('company_brain_chat_typing', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id').references(() => companyBrainChatConversationsExtended.id, { onDelete: 'cascade' }).notNull(),
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
  messageId: uuid('message_id').references(() => companyBrainChatMessagesExtended.id, { onDelete: 'cascade' }).notNull(),
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
export type CompanyBrainChatConversation = typeof companyBrainChatConversationsExtended.$inferSelect;
export type CompanyBrainChatMessage = typeof companyBrainChatMessagesExtended.$inferSelect;
export type CompanyBrainChatThread = typeof companyBrainChatThreads.$inferSelect;
export type CompanyBrainAIConversation = typeof companyBrainAIConversations.$inferSelect;
export type CompanyBrainAIMessage = typeof companyBrainAIMessages.$inferSelect;
export type CompanyBrainChatTypingIndicator = typeof companyBrainChatTypingIndicators.$inferSelect;
export type CompanyBrainChatReadReceipt = typeof companyBrainChatReadReceipts.$inferSelect;

// ==================== KNOWLEDGE GRAPH TABLES ====================

// Knowledge Nodes - Main knowledge entity in the graph
export const knowledgeNodes = pgTable('knowledge_nodes', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 100 }).notNull(), // 'process', 'decision', 'client', 'project', 'technical', 'tribal', 'sop', 'workflow', 'playbook', 'person', 'document', 'meeting', 'email', 'product', 'policy'
  label: varchar('label', { length: 500 }).notNull(),
  content: text('content'),
  summary: text('summary'),
  sourceType: varchar('source_type', { length: 100 }),
  sourceId: text('source_id'),
  status: varchar('status', { length: 50 }).default('draft').notNull(), // 'draft', 'verified', 'outdated', 'archived'
  confidenceScore: decimal('confidence_score', { precision: 3, scale: 2 }).default('0.50'),
  importanceScore: decimal('importance_score', { precision: 3, scale: 2 }).default('0.50'),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  tags: jsonb('tags').default([]).notNull(),
  properties: jsonb('properties').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  departmentId: varchar('department_id', { length: 100 }),
  projectIds: jsonb('project_ids').default([]).notNull(),
  accessCount: integer('access_count').default(0).notNull(),
  lastAccessedAt: timestamp('last_accessed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_nodes_org_idx').on(table.organizationId),
  typeIdx: index('knowledge_nodes_type_idx').on(table.type),
  statusIdx: index('knowledge_nodes_status_idx').on(table.status),
  createdByIdx: index('knowledge_nodes_created_by_idx').on(table.createdBy),
  embeddingIdx: index('knowledge_nodes_embedding_idx').using('ivfflat', table.embeddingVector),
  createdAtIdx: index('knowledge_nodes_created_at_idx').on(table.createdAt),
}));

// Knowledge Relationships - Graph edges
export const knowledgeRelationships = pgTable('knowledge_relationships', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  sourceNodeId: uuid('source_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  targetNodeId: uuid('target_node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 100 }).notNull(), // 'works_on', 'reports_to', 'collaborates_with', 'depends_on', 'related_to', 'part_of', 'owns', 'manages', 'knows', etc.
  weight: decimal('weight', { precision: 3, scale: 2 }).default('1.0').notNull(),
  properties: jsonb('properties').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_relationships_org_idx').on(table.organizationId),
  sourceIdx: index('knowledge_relationships_source_idx').on(table.sourceNodeId),
  targetIdx: index('knowledge_relationships_target_idx').on(table.targetNodeId),
  typeIdx: index('knowledge_relationships_type_idx').on(table.type),
  sourceTargetIdx: uniqueIndex('knowledge_relationships_st_idx').on(table.sourceNodeId, table.targetNodeId, table.type),
}));

// Knowledge Persons - Person entities in the knowledge graph
export const knowledgePersons = pgTable('knowledge_persons', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  nodeId: uuid('node_id').references(() => knowledgeNodes.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  department: varchar('department', { length: 255 }),
  role: varchar('role', { length: 255 }),
  skills: jsonb('skills').default([]).notNull(),
  expertise: jsonb('expertise').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_persons_org_idx').on(table.organizationId),
  userIdx: index('knowledge_persons_user_idx').on(table.userId),
  nodeIdx: index('knowledge_persons_node_idx').on(table.nodeId),
}));

// Knowledge Projects - Project entities in the knowledge graph
export const knowledgeProjects = pgTable('knowledge_projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  nodeId: uuid('node_id').references(() => knowledgeNodes.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_projects_org_idx').on(table.organizationId),
  nodeIdx: index('knowledge_projects_node_idx').on(table.nodeId),
}));

// Knowledge Clients - Client entities in the knowledge graph
export const knowledgeClients = pgTable('knowledge_clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  nodeId: uuid('node_id').references(() => knowledgeNodes.id, { onDelete: 'set null' }),
  name: varchar('name', { length: 255 }).notNull(),
  industry: varchar('industry', { length: 255 }),
  contactEmail: varchar('contact_email', { length: 255 }),
  contactPhone: varchar('contact_phone', { length: 50 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_clients_org_idx').on(table.organizationId),
  nodeIdx: index('knowledge_clients_node_idx').on(table.nodeId),
}));

// Knowledge Documents - Document metadata
export const knowledgeDocuments = pgTable('knowledge_documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  nodeId: uuid('node_id').references(() => knowledgeNodes.id, { onDelete: 'set null' }),
  fileName: varchar('file_name', { length: 500 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(),
  fileSize: integer('file_size'),
  filePath: text('file_path'),
  content: text('content'),
  mimeType: varchar('mime_type', { length: 100 }),
  processingStatus: varchar('processing_status', { length: 50 }).default('pending').notNull(),
  chunkCount: integer('chunk_count').default(0).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_documents_org_idx').on(table.organizationId),
  nodeIdx: index('knowledge_documents_node_idx').on(table.nodeId),
  statusIdx: index('knowledge_documents_status_idx').on(table.processingStatus),
}));

// Knowledge Document Chunks
export const knowledgeDocumentChunks = pgTable('knowledge_document_chunks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  documentId: uuid('document_id').references(() => knowledgeDocuments.id, { onDelete: 'cascade' }).notNull(),
  chunkIndex: integer('chunk_index').notNull(),
  chunkContent: text('chunk_content').notNull(),
  chunkSummary: text('chunk_summary'),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  tokenCount: integer('token_count'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_doc_chunks_org_idx').on(table.organizationId),
  docIdx: index('knowledge_doc_chunks_doc_idx').on(table.documentId),
  embeddingIdx: index('knowledge_doc_chunks_embedding_idx').using('ivfflat', table.embeddingVector),
}));

// ==================== MEMORY SYSTEM TABLES ====================

// Memory Records - All memory types unified
export const memoryRecords = pgTable('memory_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'working', 'short_term', 'long_term', 'semantic', 'episodic', 'procedural', 'organizational'
  subtype: varchar('subtype', { length: 100 }),
  content: text('content').notNull(),
  summary: text('summary'),
  importance: decimal('importance', { precision: 3, scale: 2 }).default('0').notNull(),
  relevanceScore: decimal('relevance_score', { precision: 3, scale: 2 }).default('0.50'),
  embeddingVector: vector('embedding_vector', { dimensions: 1536 }),
  context: jsonb('context').default({}).notNull(),
  tags: jsonb('tags').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  expiresAt: timestamp('expires_at'),
  accessedAt: timestamp('accessed_at'),
  accessCount: integer('access_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('memory_records_org_idx').on(table.organizationId),
  userIdx: index('memory_records_user_idx').on(table.userId),
  typeIdx: index('memory_records_type_idx').on(table.type),
  orgUserTypeIdx: index('memory_records_org_user_type_idx').on(table.organizationId, table.userId, table.type),
  embeddingIdx: index('memory_records_embedding_idx').using('ivfflat', table.embeddingVector),
  createdAtIdx: index('memory_records_created_at_idx').on(table.createdAt),
}));

// ==================== SEARCH & ANALYTICS TABLES ====================

// Knowledge Search Queries - Search analytics
export const knowledgeSearchQueries = pgTable('knowledge_search_queries', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  query: text('query').notNull(),
  queryType: varchar('query_type', { length: 50 }), // 'semantic', 'keyword', 'hybrid', 'graph'
  resultCount: integer('result_count').default(0).notNull(),
  clickCount: integer('click_count').default(0).notNull(),
  successful: boolean('successful').default(true).notNull(),
  searchTime: integer('search_time'), // ms
  filters: jsonb('filters').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_search_queries_org_idx').on(table.organizationId),
  userIdx: index('knowledge_search_queries_user_idx').on(table.userId),
  queryIdx: index('knowledge_search_queries_query_idx').on(table.query),
  createdAtIdx: index('knowledge_search_queries_created_idx').on(table.createdAt),
}));

// Knowledge Contributions - Track who contributes what
export const knowledgeContributions = pgTable('knowledge_contributions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }).notNull(),
  nodeId: uuid('node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  contributionType: varchar('contribution_type', { length: 50 }).notNull(), // 'created', 'edited', 'verified', 'commented', 'shared'
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_contributions_org_idx').on(table.organizationId),
  userIdx: index('knowledge_contributions_user_idx').on(table.userId),
  nodeIdx: index('knowledge_contributions_node_idx').on(table.nodeId),
}));

// Knowledge Verifications
export const knowledgeVerifications = pgTable('knowledge_verifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  nodeId: uuid('node_id').references(() => knowledgeNodes.id, { onDelete: 'cascade' }).notNull(),
  verifiedBy: uuid('verified_by').references(() => users.id, { onDelete: 'set null' }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'verified', 'rejected', 'needs_review'
  notes: text('notes'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_verifications_org_idx').on(table.organizationId),
  nodeIdx: index('knowledge_verifications_node_idx').on(table.nodeId),
  verifierIdx: index('knowledge_verifications_verifier_idx').on(table.verifiedBy),
}));

// Knowledge Analytics - Aggregated metrics
export const knowledgeAnalytics = pgTable('knowledge_analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  metricType: varchar('metric_type', { length: 100 }).notNull(),
  metricValue: decimal('metric_value', { precision: 15, scale: 4 }).notNull(),
  period: varchar('period', { length: 50 }).notNull(), // 'daily', 'weekly', 'monthly'
  periodStart: timestamp('period_start').notNull(),
  periodEnd: timestamp('period_end').notNull(),
  dimensions: jsonb('dimensions').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_analytics_org_idx').on(table.organizationId),
  metricTypeIdx: index('knowledge_analytics_metric_idx').on(table.metricType),
  periodIdx: index('knowledge_analytics_period_idx').on(table.period, table.periodStart),
}));

// ==================== INGESTION & INTEGRATION TABLES ====================

// Knowledge Integration Syncs
export const knowledgeIntegrationSyncs = pgTable('knowledge_integration_syncs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  integrationType: varchar('integration_type', { length: 100 }).notNull(), // 'slack', 'gmail', 'outlook', 'teams', 'notion', 'confluence', 'github', 'drive', 'dropbox', 'sharepoint'
  status: varchar('status', { length: 50 }).notNull(), // 'running', 'completed', 'failed', 'pending'
  itemsProcessed: integer('items_processed').default(0).notNull(),
  itemsCreated: integer('items_created').default(0).notNull(),
  itemsUpdated: integer('items_updated').default(0).notNull(),
  errors: integer('errors').default(0).notNull(),
  errorLog: jsonb('error_log').default([]).notNull(),
  startedAt: timestamp('started_at').notNull(),
  completedAt: timestamp('completed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_integration_syncs_org_idx').on(table.organizationId),
  integrationTypeIdx: index('knowledge_integration_syncs_type_idx').on(table.integrationType),
}));

// Knowledge Onboarding Progress
export const knowledgeOnboardingProgress = pgTable('knowledge_onboarding_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  department: varchar('department', { length: 255 }),
  progress: decimal('progress', { precision: 5, scale: 2 }).default('0').notNull(),
  modulesCompleted: integer('modules_completed').default(0).notNull(),
  totalModules: integer('total_modules').default(0).notNull(),
  currentModule: varchar('current_module', { length: 255 }),
  completedModules: jsonb('completed_modules').default([]).notNull(),
  learningPath: jsonb('learning_path').default([]).notNull(),
  daysOnboarded: integer('days_onboarded').default(0).notNull(),
  estimatedCompletion: integer('estimated_completion').default(21).notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_onboarding_org_idx').on(table.organizationId),
  userIdx: uniqueIndex('knowledge_onboarding_user_idx').on(table.organizationId, table.userId),
}));

// ==================== INTELLIGENCE & INSIGHTS TABLES ====================

// Knowledge Intelligence Insights - Auto-discovered insights
export const knowledgeInsights = pgTable('knowledge_insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'faq', 'expert', 'risk', 'gap', 'trend', 'duplicate', 'opportunity', 'missing'
  subtype: varchar('subtype', { length: 100 }),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  confidence: decimal('confidence', { precision: 3, scale: 2 }).default('0.50'),
  severity: varchar('severity', { length: 20 }).default('info').notNull(), // 'info', 'low', 'medium', 'high', 'critical'
  actionable: boolean('actionable').default(false).notNull(),
  suggestedActions: jsonb('suggested_actions').default([]).notNull(),
  relatedNodeIds: jsonb('related_node_ids').default([]).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('knowledge_insights_org_idx').on(table.organizationId),
  typeIdx: index('knowledge_insights_type_idx').on(table.type),
  severityIdx: index('knowledge_insights_severity_idx').on(table.severity),
  createdAtIdx: index('knowledge_insights_created_idx').on(table.createdAt),
}));

// ==================== COMPANY UNDERSTANDING TABLES ====================

// Company Structure - Departments, teams, roles
export const companyStructure = pgTable('company_structure', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'department', 'team', 'role', 'division'
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  parentId: uuid('parent_id'),
  headUserId: uuid('head_user_id').references(() => users.id, { onDelete: 'set null' }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_structure_org_idx').on(table.organizationId),
  typeIdx: index('company_structure_type_idx').on(table.type),
  parentIdx: index('company_structure_parent_idx').on(table.parentId),
}));

// Company Products/Services
export const companyProducts = pgTable('company_products', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'product', 'service'
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 255 }),
  pricing: jsonb('pricing').default({}).notNull(),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_products_org_idx').on(table.organizationId),
  typeIdx: index('company_products_type_idx').on(table.type),
}));

// Company Goals & KPIs
export const companyGoals = pgTable('company_goals', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'goal', 'kpi', 'okr', 'milestone'
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  targetValue: varchar('target_value', { length: 255 }),
  currentValue: varchar('current_value', { length: 255 }),
  unit: varchar('unit', { length: 50 }),
  deadline: timestamp('deadline'),
  status: varchar('status', { length: 50 }).default('active').notNull(),
  progress: decimal('progress', { precision: 5, scale: 2 }).default('0').notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('company_goals_org_idx').on(table.organizationId),
  typeIdx: index('company_goals_type_idx').on(table.type),
}));

// ==================== AI REASONING LOGS ====================

export const aiReasoningLogs = pgTable('ai_reasoning_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  reasoningType: varchar('reasoning_type', { length: 50 }).notNull(), // 'compare', 'summarize', 'contradiction', 'recommend', 'report', 'question'
  inputData: jsonb('input_data').notNull(),
  outputData: jsonb('output_data').notNull(),
  modelUsed: varchar('model_used', { length: 100 }),
  tokensUsed: integer('tokens_used'),
  processingTime: integer('processing_time'),
  confidence: decimal('confidence', { precision: 3, scale: 2 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('ai_reasoning_logs_org_idx').on(table.organizationId),
  userIdx: index('ai_reasoning_logs_user_idx').on(table.userId),
  typeIdx: index('ai_reasoning_logs_type_idx').on(table.reasoningType),
  createdAtIdx: index('ai_reasoning_logs_created_idx').on(table.createdAt),
}));

// ==================== DESIGN CUSTOMIZATIONS TABLE ====================

export const designCustomizations = pgTable('design_customizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  pagePath: varchar('page_path', { length: 500 }).notNull(),
  pageName: varchar('page_name', { length: 255 }).notNull(),
  prompt: text('prompt').notNull(),
  changes: jsonb('changes').default({}).notNull(),
  appliedAt: timestamp('applied_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  userIdx: index('design_customizations_user_idx').on(table.userId),
  pagePathIdx: index('design_customizations_page_path_idx').on(table.pagePath),
  userPageIdx: index('design_customizations_user_page_idx').on(table.userId, table.pagePath),
  createdAtIdx: index('design_customizations_created_at_idx').on(table.createdAt),
}));

export type DesignCustomization = typeof designCustomizations.$inferSelect;

// ==================== CONTEXT ENGINE TABLES ====================

export const contextSessions = pgTable('context_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  sessionType: varchar('session_type', { length: 50 }).notNull(), // 'chat', 'search', 'onboarding', 'assistant'
  context: jsonb('context').default({}).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  expiresAt: timestamp('expires_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table: TableRef) => ({
  orgIdx: index('context_sessions_org_idx').on(table.organizationId),
  userIdx: index('context_sessions_user_idx').on(table.userId),
  typeIdx: index('context_sessions_type_idx').on(table.sessionType),
  activeIdx: index('context_sessions_active_idx').on(table.isActive),
}));

// Type aliases
export type KnowledgeNode = typeof knowledgeNodes.$inferSelect;
export type KnowledgeRelationship = typeof knowledgeRelationships.$inferSelect;
export type KnowledgePerson = typeof knowledgePersons.$inferSelect;
export type KnowledgeProject = typeof knowledgeProjects.$inferSelect;
export type KnowledgeClient = typeof knowledgeClients.$inferSelect;
export type KnowledgeDocument = typeof knowledgeDocuments.$inferSelect;
export type KnowledgeDocumentChunk = typeof knowledgeDocumentChunks.$inferSelect;
export type KnowledgeSearchQuery = typeof knowledgeSearchQueries.$inferSelect;
export type KnowledgeContribution = typeof knowledgeContributions.$inferSelect;
export type KnowledgeVerification = typeof knowledgeVerifications.$inferSelect;
export type KnowledgeAnalytics = typeof knowledgeAnalytics.$inferSelect;
export type KnowledgeIntegrationSync = typeof knowledgeIntegrationSyncs.$inferSelect;
export type KnowledgeOnboardingProgress = typeof knowledgeOnboardingProgress.$inferSelect;
export type KnowledgeInsight = typeof knowledgeInsights.$inferSelect;
export type MemoryRecord = typeof memoryRecords.$inferSelect;
export type CompanyStructure = typeof companyStructure.$inferSelect;
export type CompanyProduct = typeof companyProducts.$inferSelect;
export type CompanyGoal = typeof companyGoals.$inferSelect;
export type AiReasoningLog = typeof aiReasoningLogs.$inferSelect;
export type ContextSession = typeof contextSessions.$inferSelect;
