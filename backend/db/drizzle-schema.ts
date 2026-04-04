import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, varchar, decimal, pgEnum, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'enterprise_admin', 'super_admin']);
export const userStatusEnum = pgEnum('user_status', ['active', 'suspended', 'deleted', 'pending']);
export const planTypeEnum = pgEnum('plan_type', ['free', 'starter', 'professional', 'enterprise', 'custom']);
export const orgStatusEnum = pgEnum('org_status', ['active', 'suspended', 'trial', 'cancelled']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'past_due', 'cancelled', 'trial', 'paused']);
export const paymentMethodEnum = pgEnum('payment_method', ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wire', 'crypto']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'pending', 'paid', 'overdue', 'cancelled', 'refunded']);
export const complianceTypeEnum = pgEnum('compliance_type', ['gdpr', 'hipaa', 'soc2', 'iso27001', 'pci_dss', 'ccpa']);
export const dataRetentionStatusEnum = pgEnum('data_retention_status', ['active', 'archived', 'scheduled_deletion', 'deleted']);
export const integrationStatusEnum = pgEnum('integration_status', ['active', 'inactive', 'error', 'pending']);
export const notificationTypeEnum = pgEnum('notification_type', ['email', 'sms', 'push', 'in_app', 'webhook']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'critical']);
export const severityEnum = pgEnum('severity', ['info', 'warning', 'error', 'critical']);

export const users: any = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phoneNumber: varchar('phone_number', { length: 50 }),
  avatar: text('avatar'),
  emailVerified: boolean('email_verified').default(false).notNull(),
  emailVerificationToken: text('email_verification_token'),
  emailVerificationExpires: timestamp('email_verification_expires'),
  passwordResetToken: text('password_reset_token'),
  passwordResetExpires: timestamp('password_reset_expires'),
  twoFactorEnabled: boolean('two_factor_enabled').default(false).notNull(),
  twoFactorSecret: text('two_factor_secret'),
  role: userRoleEnum('role').default('user').notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'set null' }),
  lastLoginAt: timestamp('last_login_at'),
  lastLoginIp: varchar('last_login_ip', { length: 50 }),
  failedLoginAttempts: integer('failed_login_attempts').default(0).notNull(),
  accountLockedUntil: timestamp('account_locked_until'),
  preferences: jsonb('preferences').default({}).notNull(),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('email_idx').on(table.email),
  orgIdx: index('org_idx').on(table.organizationId),
}));

export const organizations: any = pgTable('organizations', {
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
  taxId: varchar('tax_id', { length: 100 }),
  address: jsonb('address'),
  industry: varchar('industry', { length: 100 }),
  companySize: varchar('company_size', { length: 50 }),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('slug_idx').on(table.slug),
}));

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  token: text('token').notNull().unique(),
  refreshToken: text('refresh_token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  refreshExpiresAt: timestamp('refresh_expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 50 }),
  userAgent: text('user_agent'),
  deviceId: varchar('device_id', { length: 255 }),
  lastActivityAt: timestamp('last_activity_at').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('user_idx').on(table.userId),
  tokenIdx: uniqueIndex('token_idx').on(table.token),
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
  pausedAt: timestamp('paused_at'),
  trialEndsAt: timestamp('trial_ends_at'),
  features: jsonb('features').default({}).notNull(),
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
  items: jsonb('items').default([]).notNull(),
  notes: text('notes'),
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
}, (table) => ({
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
}, (table) => ({
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
}, (table) => ({
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
}, (table) => ({
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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
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

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').references(() => organizations.id, { onDelete: 'cascade' }).notNull(),
  conversationId: uuid('conversation_id'),
  senderId: uuid('sender_id').references(() => users.id),
  recipientId: uuid('recipient_id').references(() => users.id),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  direction: varchar('direction', { length: 20 }).notNull(),
  status: varchar('status', { length: 50 }).default('sent').notNull(),
  readAt: timestamp('read_at'),
  metadata: jsonb('metadata').default({}).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  conversationIdx: index('message_conversation_idx').on(table.conversationId),
  senderIdx: index('message_sender_idx').on(table.senderId),
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
