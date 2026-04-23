/**
 * Database Schema Definitions
 * Centralized schema exports for all backend services
 */

import { pgTable, uuid, varchar, text, timestamp, json, boolean, integer, decimal, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const scheduleStatusEnum = pgEnum('schedule_status', ['active', 'paused', 'completed', 'failed', 'draft']);
export const scheduleTypeEnum = pgEnum('schedule_type', ['one-time', 'recurring', 'conditional', 'event-driven']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'critical']);
export const alertSeverityEnum = pgEnum('alert_severity', ['info', 'warning', 'critical']);
export const workflowStatusEnum = pgEnum('workflow_status', ['draft', 'active', 'paused', 'archived']);
export const executionStatusEnum = pgEnum('execution_status', ['pending', 'running', 'completed', 'failed', 'cancelled']);
export const apiKeyStatusEnum = pgEnum('api_key_status', ['active', 'revoked', 'expired']);
export const integrationStatusEnum = pgEnum('integration_status', ['active', 'inactive', 'error', 'pending']);
export const webhookStatusEnum = pgEnum('webhook_status', ['active', 'inactive', 'failed']);
export const agentStatusEnum = pgEnum('agent_status', ['active', 'inactive', 'training', 'error']);

// Agent Schedules Table
export const agentSchedules = pgTable('agent_schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').notNull(),
  organizationId: uuid('organization_id').notNull(),
  scheduleType: scheduleTypeEnum('schedule_type').notNull(),
  priority: priorityEnum('priority').notNull().default('medium'),
  status: scheduleStatusEnum('status').notNull().default('draft'),
  timeZone: varchar('time_zone', { length: 100 }).notNull().default('UTC'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  recurrence: json('recurrence'),
  conditions: json('conditions'),
  notifications: json('notifications'),
  resources: json('resources'),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by'),
  lastExecutedAt: timestamp('last_executed_at'),
  nextExecutionAt: timestamp('next_execution_at'),
  totalExecutions: integer('total_executions').default(0),
  successfulExecutions: integer('successful_executions').default(0),
  failedExecutions: integer('failed_executions').default(0),
});

// Workflow Definitions Table
export const workflowDefinitions = pgTable('workflow_definitions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').notNull(),
  status: workflowStatusEnum('status').notNull().default('draft'),
  nodes: json('nodes').notNull(),
  connections: json('connections').notNull(),
  variables: json('variables'),
  triggers: json('triggers'),
  version: integer('version').default(1),
  parentWorkflowId: uuid('parent_workflow_id'),
  isTemplate: boolean('is_template').default(false),
  category: varchar('category', { length: 100 }),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  createdBy: uuid('created_by'),
});

// Workflow Executions Table
export const workflowExecutions = pgTable('workflow_executions', {
  id: uuid('id').primaryKey().defaultRandom(),
  workflowId: uuid('workflow_id').notNull(),
  organizationId: uuid('organization_id').notNull(),
  status: executionStatusEnum('status').notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  context: json('context'),
  nodeResults: json('node_results'),
  errorMessage: text('error_message'),
  errorNodeId: varchar('error_node_id', { length: 255 }),
  triggeredBy: varchar('triggered_by', { length: 255 }),
  triggerPayload: json('trigger_payload'),
});

// Agent Teams Table
export const agentTeams = pgTable('agent_teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').notNull(),
  parentAgentId: uuid('parent_agent_id'),
  leadAgentId: uuid('lead_agent_id'),
  members: json('members'),
  configuration: json('configuration'),
  costCenterId: uuid('cost_center_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// AI Agents Table
export const aiAgents = pgTable('ai_agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  type: varchar('type', { length: 100 }).notNull(),
  organizationId: uuid('organization_id').notNull(),
  teamId: uuid('team_id'),
  parentAgentId: uuid('parent_agent_id'),
  status: agentStatusEnum('status').default('active'),
  configuration: json('configuration'),
  model: varchar('model', { length: 100 }),
  voice: varchar('voice', { length: 100 }),
  language: varchar('language', { length: 10 }),
  skills: json('skills'),
  trainingData: json('training_data'),
  isSubAgent: boolean('is_sub_agent').default(false),
  capabilities: json('capabilities'),
  // Enhanced capabilities from video-prompts.md
  sensoryCapabilities: json('sensory_capabilities').default({ vision: false, hearing: false, senses: [] }),
  memoryConfig: json('memory_config').default({ shortTerm: true, mediumTerm: true, longTerm: true, infinite: false }),
  selfLearningEnabled: boolean('self_learning_enabled').default(false),
  selfImprovementEnabled: boolean('self_improvement_enabled').default(false),
  insightsConfig: json('insights_config').default({ enabled: true, predictive: false, confidenceThreshold: 0.8 }),
  summaryConfig: json('summary_config').default({ autoGenerate: true, format: 'bullet', frequency: 'session' }),
  a2aEndpoints: json('a2a_endpoints').default([]),
  d2dEndpoints: json('d2d_endpoints').default([]),
  learningMetrics: json('learning_metrics').default({}),
  improvementGoals: json('improvement_goals').default([]),
  scheduleId: uuid('schedule_id'),
  costCenterId: uuid('cost_center_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Performance Metrics Table
export const performanceMetrics = pgTable('performance_metrics', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  organizationId: uuid('organization_id').notNull(),
  metricType: varchar('metric_type', { length: 100 }).notNull(),
  value: decimal('value', { precision: 10, scale: 4 }).notNull(),
  unit: varchar('unit', { length: 50 }),
  dimensions: json('dimensions'),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
  timeBucket: varchar('time_bucket', { length: 20 }),
  metadata: json('metadata'),
});

// Alert Rules Table
export const alertRules = pgTable('alert_rules', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').notNull(),
  agentId: uuid('agent_id'),
  metricType: varchar('metric_type', { length: 100 }).notNull(),
  condition: varchar('condition', { length: 50 }).notNull(),
  threshold: decimal('threshold', { precision: 10, scale: 4 }).notNull(),
  severity: alertSeverityEnum('severity').notNull(),
  isActive: boolean('is_active').default(true),
  notificationChannels: json('notification_channels'),
  cooldown: integer('cooldown').default(300),
  autoResolve: boolean('auto_resolve').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Alerts Table
export const alerts = pgTable('alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  ruleId: uuid('rule_id').notNull(),
  agentId: uuid('agent_id'),
  organizationId: uuid('organization_id').notNull(),
  severity: alertSeverityEnum('severity').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('firing'),
  message: text('message').notNull(),
  metricValue: decimal('metric_value', { precision: 10, scale: 4 }),
  threshold: decimal('threshold', { precision: 10, scale: 4 }),
  context: json('context'),
  triggeredAt: timestamp('triggered_at').defaultNow().notNull(),
  resolvedAt: timestamp('resolved_at'),
  acknowledgedAt: timestamp('acknowledged_at'),
  acknowledgedBy: uuid('acknowledged_by'),
  resolution: text('resolution'),
});

// Cost Centers Table
export const costCenters = pgTable('cost_centers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').notNull(),
  budget: decimal('budget', { precision: 15, scale: 2 }),
  currency: varchar('currency', { length: 3 }).default('USD'),
  alertThreshold: decimal('alert_threshold', { precision: 5, scale: 2 }).default('80'),
  timePeriod: varchar('time_period', { length: 20 }).default('monthly'),
  totalSpent: decimal('total_spent', { precision: 15, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Cost Records Table
export const costRecords = pgTable('cost_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  costCenterId: uuid('cost_center_id').notNull(),
  agentId: uuid('agent_id'),
  organizationId: uuid('organization_id').notNull(),
  costType: varchar('cost_type', { length: 100 }).notNull(),
  amount: decimal('amount', { precision: 15, scale: 4 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  description: text('description'),
  metadata: json('metadata'),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
});

// Voice Conversations Table
export const voiceConversations = pgTable('voice_conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').notNull(),
  organizationId: uuid('organization_id').notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  language: varchar('language', { length: 10 }).default('en'),
  voiceSettings: json('voice_settings'),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  endedAt: timestamp('ended_at'),
  duration: integer('duration'),
  transcript: text('transcript'),
  summary: text('summary'),
  sentiment: json('sentiment'),
  topics: json('topics'),
  recordingUrl: varchar('recording_url', { length: 500 }),
  metadata: json('metadata'),
});

// Voice Messages Table
export const voiceMessages = pgTable('voice_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull(),
  type: varchar('type', { length: 20 }).notNull(),
  content: text('content'),
  audioUrl: varchar('audio_url', { length: 500 }),
  duration: integer('duration'),
  sentiment: varchar('sentiment', { length: 20 }),
  metadata: json('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// API Keys Table
export const apiKeys = pgTable('api_keys', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  userId: uuid('user_id').notNull(),
  organizationId: uuid('organization_id').notNull(),
  scopes: json('scopes').notNull(),
  rateLimitRequests: integer('rate_limit_requests'),
  rateLimitWindow: integer('rate_limit_window'),
  expiresAt: timestamp('expires_at'),
  ipWhitelist: json('ip_whitelist'),
  status: apiKeyStatusEnum('status').default('active'),
  lastUsedAt: timestamp('last_used_at'),
  metadata: json('metadata'),
  revokedAt: timestamp('revoked_at'),
  revokedBy: uuid('revoked_by'),
  revokeReason: text('revoke_reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Integrations Table
export const integrations = pgTable('integrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  organizationId: uuid('organization_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  provider: varchar('provider', { length: 100 }).notNull(),
  credentials: json('credentials'),
  settings: json('settings'),
  status: integrationStatusEnum('status').default('pending'),
  lastSyncAt: timestamp('last_sync_at'),
  errorMessage: text('error_message'),
  metadata: json('metadata'),
  createdBy: uuid('created_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Integration Logs Table
export const integrationLogs = pgTable('integration_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  integrationId: uuid('integration_id').notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(),
  payload: json('payload'),
  errorMessage: text('error_message'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Webhooks Table
export const webhooks = pgTable('webhooks', {
  id: uuid('id').primaryKey().defaultRandom(),
  integrationId: uuid('integration_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  url: varchar('url', { length: 500 }).notNull(),
  events: json('events').notNull(),
  secret: varchar('secret', { length: 255 }),
  method: varchar('method', { length: 10 }).default('POST'),
  headers: json('headers'),
  retryPolicy: json('retry_policy'),
  filter: json('filter'),
  status: webhookStatusEnum('status').default('active'),
  lastTriggeredAt: timestamp('last_triggered_at'),
  failureCount: integer('failure_count').default(0),
  createdBy: uuid('created_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Schedule Executions Table
export const scheduleExecutions = pgTable('schedule_executions', {
  id: uuid('id').primaryKey().defaultRandom(),
  scheduleId: uuid('schedule_id').notNull(),
  status: executionStatusEnum('status').notNull(),
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  result: json('result'),
  error: text('error'),
  retryCount: integer('retry_count').default(0),
  executionContext: json('execution_context'),
});

// Time Blocks Table
export const timeBlocks = pgTable('time_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  scheduleId: uuid('schedule_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  startTime: varchar('start_time', { length: 10 }).notNull(),
  endTime: varchar('end_time', { length: 10 }).notNull(),
  daysOfWeek: json('days_of_week').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  color: varchar('color', { length: 20 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Agent Collaborations Table
export const agentCollaborations = pgTable('agent_collaborations', {
  id: uuid('id').primaryKey().defaultRandom(),
  requestingAgentId: uuid('requesting_agent_id').notNull(),
  targetAgentId: uuid('target_agent_id').notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  message: text('message'),
  response: text('response'),
  payload: json('payload'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  respondedAt: timestamp('responded_at'),
});

// Type Exports
export type AgentSchedule = typeof agentSchedules.$inferSelect;
export type WorkflowDefinition = typeof workflowDefinitions.$inferSelect;
export type WorkflowExecution = typeof workflowExecutions.$inferSelect;
export type AgentTeam = typeof agentTeams.$inferSelect;
export type AiAgent = typeof aiAgents.$inferSelect;
export type PerformanceMetric = typeof performanceMetrics.$inferSelect;
export type AlertRule = typeof alertRules.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type CostCenter = typeof costCenters.$inferSelect;
export type CostRecord = typeof costRecords.$inferSelect;
export type VoiceConversation = typeof voiceConversations.$inferSelect;
export type VoiceMessage = typeof voiceMessages.$inferSelect;
export type ApiKey = typeof apiKeys.$inferSelect;
export type Integration = typeof integrations.$inferSelect;
export type IntegrationLog = typeof integrationLogs.$inferSelect;
export type Webhook = typeof webhooks.$inferSelect;
export type ScheduleExecution = typeof scheduleExecutions.$inferSelect;
export type TimeBlock = typeof timeBlocks.$inferSelect;
export type AgentCollaboration = typeof agentCollaborations.$inferSelect;
