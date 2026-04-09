/**
 * Agent API Routes
 * Hono routes for agent management, scheduling, workflows, and monitoring
 */

import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { agentSchedulingService } from '../services/agent-scheduling-service';
import { workflowBuilderService } from '../services/workflow-builder-service';
import { agentTeamService } from '../services/agent-team-service';
import { agentPerformanceMonitoringService } from '../services/agent-performance-monitoring-service';
import { voiceConversationService } from '../services/voice-conversation-service';
import { apiKeysIntegrationsService } from '../services/api-keys-integrations-service';

const app = new Hono();

// Middleware to extract organization and user from context
app.use('*', async (c, next) => {
  c.set('organizationId', c.req.header('x-organization-id') || 'default');
  c.set('userId', c.req.header('x-user-id') || 'system');
  await next();
});

// ==================== AGENT SCHEDULING ROUTES ====================

const scheduleSchema = z.object({
  name: z.string().min(1),
  agentId: z.string().uuid(),
  scheduleType: z.enum(['one-time', 'recurring', 'conditional', 'event-driven']),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  timeZone: z.string().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  recurrence: z.object({
    pattern: z.enum(['daily', 'weekly', 'monthly', 'custom']),
    interval: z.number(),
    endCondition: z.enum(['never', 'after_count', 'on_date']),
    endValue: z.union([z.number(), z.string()]).optional(),
    daysOfWeek: z.array(z.number()).optional(),
  }).optional(),
  conditions: z.object({
    requireApproval: z.boolean(),
    approvalTimeout: z.number(),
    prerequisites: z.array(z.string()).optional(),
    dependencies: z.array(z.string()).optional(),
  }).optional(),
  notifications: z.object({
    beforeExecution: z.boolean(),
    onCompletion: z.boolean(),
    onFailure: z.boolean(),
    recipients: z.array(z.string()),
    channels: z.array(z.enum(['email', 'sms', 'push', 'slack'])),
  }).optional(),
  resources: z.object({
    maxConcurrentExecutions: z.number(),
    timeout: z.number(),
    retryAttempts: z.number(),
    retryDelay: z.number(),
  }).optional(),
  metadata: z.record(z.any()).optional(),
});

// Create schedule
app.post('/schedules', zValidator('json', scheduleSchema), async (c) => {
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await agentSchedulingService.createSchedule(
    {
      ...data,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    },
    { description: data.name },
    userId,
    organizationId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get schedules
app.get('/schedules', async (c) => {
  const agentId = c.req.query('agentId');
  const status = c.req.query('status');
  const organizationId = c.get('organizationId');

  const schedules = await agentSchedulingService.getSchedules(organizationId, {
    agentId,
    status: status as any,
  });

  return c.json({ success: true, schedules });
});

// Get schedule by ID
app.get('/schedules/:id', async (c) => {
  const scheduleId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const schedule = await agentSchedulingService.getScheduleById(scheduleId, organizationId);

  if (!schedule) {
    return c.json({ success: false, message: 'Schedule not found' }, 404);
  }

  return c.json({ success: true, schedule });
});

// Update schedule
app.patch('/schedules/:id', async (c) => {
  const scheduleId = c.req.param('id');
  const userId = c.get('userId');
  const data = await c.req.json();

  const result = await agentSchedulingService.updateSchedule(scheduleId, data, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Pause/Resume schedule
app.post('/schedules/:id/pause', async (c) => {
  const scheduleId = c.req.param('id');
  const userId = c.get('userId');

  const result = await agentSchedulingService.pauseSchedule(scheduleId, userId);
  return c.json(result, result.success ? 200 : 400);
});

app.post('/schedules/:id/resume', async (c) => {
  const scheduleId = c.req.param('id');
  const userId = c.get('userId');

  const result = await agentSchedulingService.resumeSchedule(scheduleId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Delete schedule
app.delete('/schedules/:id', async (c) => {
  const scheduleId = c.req.param('id');
  const userId = c.get('userId');

  const result = await agentSchedulingService.deleteSchedule(scheduleId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Get schedule stats
app.get('/schedules/:id/stats', async (c) => {
  const scheduleId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const stats = await agentSchedulingService.getScheduleStats(scheduleId, organizationId);
  return c.json({ success: true, stats });
});

// Get upcoming executions
app.get('/schedules/upcoming', async (c) => {
  const organizationId = c.get('organizationId');
  const window = parseInt(c.req.query('window') || '60');

  const executions = await agentSchedulingService.getUpcomingExecutions(organizationId, window);
  return c.json({ success: true, executions });
});

// ==================== WORKFLOW ROUTES ====================

const workflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(z.object({
    id: z.string(),
    type: z.string(),
    label: z.string(),
    position: z.object({ x: z.number(), y: z.number() }),
    config: z.record(z.any()),
  })),
  connections: z.array(z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    label: z.string().optional(),
    condition: z.string().optional(),
  })),
  variables: z.record(z.any()).optional(),
  triggers: z.array(z.object({
    type: z.string(),
    config: z.record(z.any()),
  })).optional(),
});

// Create workflow
app.post('/workflows', zValidator('json', workflowSchema), async (c) => {
  const data = c.req.valid('json');
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await workflowBuilderService.createWorkflow(
    {
      ...data,
      organizationId,
      status: 'draft',
      version: 1,
      isTemplate: false,
    },
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get workflows
app.get('/workflows', async (c) => {
  const organizationId = c.get('organizationId');
  const options = {
    status: c.req.query('status') as any,
    category: c.req.query('category'),
    isTemplate: c.req.query('template') === 'true',
  };

  const workflows = await workflowBuilderService.getWorkflows(organizationId, options);
  return c.json({ success: true, workflows });
});

// Get workflow by ID
app.get('/workflows/:id', async (c) => {
  const workflowId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const workflow = await workflowBuilderService.getWorkflowById(workflowId, organizationId);

  if (!workflow) {
    return c.json({ success: false, message: 'Workflow not found' }, 404);
  }

  return c.json({ success: true, workflow });
});

// Update workflow
app.patch('/workflows/:id', async (c) => {
  const workflowId = c.req.param('id');
  const userId = c.get('userId');
  const data = await c.req.json();

  const result = await workflowBuilderService.updateWorkflow(workflowId, data, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Execute workflow
app.post('/workflows/:id/execute', async (c) => {
  const workflowId = c.req.param('id');
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');
  const context = await c.req.json();

  const result = await workflowBuilderService.executeWorkflow(
    workflowId,
    organizationId,
    context,
    userId
  );

  return c.json(result, result.success ? 200 : 400);
});

// Get execution status
app.get('/workflows/executions/:executionId', async (c) => {
  const executionId = c.req.param('executionId');

  const status = await workflowBuilderService.getExecutionStatus(executionId);
  return c.json({ success: true, status });
});

// Cancel execution
app.post('/workflows/executions/:executionId/cancel', async (c) => {
  const executionId = c.req.param('executionId');
  const userId = c.get('userId');

  const result = await workflowBuilderService.cancelExecution(executionId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Clone workflow
app.post('/workflows/:id/clone', async (c) => {
  const workflowId = c.req.param('id');
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');
  const { name } = await c.req.json();

  const result = await workflowBuilderService.cloneWorkflow(
    workflowId,
    organizationId,
    name,
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get workflow templates
app.get('/workflows/templates', async (c) => {
  const organizationId = c.get('organizationId');
  const category = c.req.query('category');

  const templates = await workflowBuilderService.getWorkflowTemplates(organizationId, category);
  return c.json({ success: true, templates });
});

// ==================== AGENT TEAM ROUTES ====================

// Create agent
app.post('/agents', async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await agentTeamService.createAgent(
    {
      ...data,
      organizationId,
    },
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get agents
app.get('/agents', async (c) => {
  const organizationId = c.get('organizationId');
  const options = {
    teamId: c.req.query('teamId'),
    parentAgentId: c.req.query('parentAgentId'),
    type: c.req.query('type'),
    status: c.req.query('status') as any,
  };

  const agents = await agentTeamService.getAgents(organizationId, options);
  return c.json({ success: true, agents });
});

// Get agent by ID
app.get('/agents/:id', async (c) => {
  const agentId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const agent = await agentTeamService.getAgentById(agentId, organizationId);

  if (!agent) {
    return c.json({ success: false, message: 'Agent not found' }, 404);
  }

  return c.json({ success: true, agent });
});

// Update agent
app.patch('/agents/:id', async (c) => {
  const agentId = c.req.param('id');
  const userId = c.get('userId');
  const data = await c.req.json();

  const result = await agentTeamService.updateAgent(agentId, data, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Delete agent
app.delete('/agents/:id', async (c) => {
  const agentId = c.req.param('id');
  const userId = c.get('userId');

  const result = await agentTeamService.deleteAgent(agentId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Create team
app.post('/teams', async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await agentTeamService.createTeam(
    {
      ...data,
      organizationId,
    },
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get teams
app.get('/teams', async (c) => {
  const organizationId = c.get('organizationId');
  const teams = await agentTeamService.getTeams(organizationId);
  return c.json({ success: true, teams });
});

// Get team by ID
app.get('/teams/:id', async (c) => {
  const teamId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const team = await agentTeamService.getTeamById(teamId, organizationId);

  if (!team) {
    return c.json({ success: false, message: 'Team not found' }, 404);
  }

  return c.json({ success: true, team });
});

// Add agent to team
app.post('/teams/:id/members', async (c) => {
  const teamId = c.req.param('id');
  const userId = c.get('userId');
  const { agentId, role } = await c.req.json();

  const result = await agentTeamService.addAgentToTeam(teamId, agentId, role, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Remove agent from team
app.delete('/teams/:id/members/:agentId', async (c) => {
  const teamId = c.req.param('id');
  const agentId = c.req.param('agentId');
  const userId = c.get('userId');

  const result = await agentTeamService.removeAgentFromTeam(teamId, agentId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Request collaboration
app.post('/agents/:id/collaborate', async (c) => {
  const requestingAgentId = c.req.param('id');
  const userId = c.get('userId');
  const { targetAgentId, type, message, payload } = await c.req.json();

  const result = await agentTeamService.requestCollaboration(
    requestingAgentId,
    targetAgentId,
    type,
    message,
    payload
  );

  return c.json(result, result.success ? 200 : 400);
});

// Respond to collaboration
app.post('/collaborations/:id/respond', async (c) => {
  const collaborationId = c.req.param('id');
  const { accept, response, payload } = await c.req.json();

  const result = await agentTeamService.respondToCollaboration(
    collaborationId,
    accept,
    response,
    payload
  );

  return c.json(result, result.success ? 200 : 400);
});

// Assign work to agent
app.post('/agents/:id/assign', async (c) => {
  const agentId = c.req.param('id');
  const { task, priority, dueDate, dependencies } = await c.req.json();
  const userId = c.get('userId');

  const result = await agentTeamService.assignWorkToAgent(
    agentId,
    { task, priority, dueDate, dependencies },
    userId
  );

  return c.json(result, result.success ? 200 : 400);
});

// Get sub-agents
app.get('/agents/:id/sub-agents', async (c) => {
  const agentId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const subAgents = await agentTeamService.getSubAgents(agentId, organizationId);
  return c.json({ success: true, subAgents });
});

// Get parent agent chain
app.get('/agents/:id/parent-chain', async (c) => {
  const agentId = c.req.param('id');
  const organizationId = c.get('organizationId');

  const chain = await agentTeamService.getParentAgentChain(agentId, organizationId);
  return c.json({ success: true, chain });
});

// ==================== PERFORMANCE MONITORING ROUTES ====================

// Record metric
app.post('/metrics', async (c) => {
  const data = await c.req.json();
  const organizationId = c.get('organizationId');

  const result = await agentPerformanceMonitoringService.recordMetric({
    ...data,
    organizationId,
  });

  return c.json(result, result.success ? 201 : 400);
});

// Get metrics for agent
app.get('/agents/:id/metrics', async (c) => {
  const agentId = c.req.param('id');
  const organizationId = c.get('organizationId');
  const options = {
    types: c.req.query('types')?.split(','),
    startDate: c.req.query('startDate') ? new Date(c.req.query('startDate')!) : undefined,
    endDate: c.req.query('endDate') ? new Date(c.req.query('endDate')!) : undefined,
    aggregation: c.req.query('aggregation') as any,
    timeBucket: c.req.query('timeBucket') as any,
  };

  const metrics = await agentPerformanceMonitoringService.getAgentMetrics(
    agentId,
    organizationId,
    options
  );

  return c.json({ success: true, metrics });
});

// Create alert rule
app.post('/alert-rules', async (c) => {
  const data = await c.req.json();
  const organizationId = c.get('organizationId');
  const userId = c.get('userId');

  const result = await agentPerformanceMonitoringService.createAlertRule(
    {
      ...data,
      organizationId,
    },
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get alert rules
app.get('/alert-rules', async (c) => {
  const organizationId = c.get('organizationId');
  const agentId = c.req.query('agentId');

  const rules = await agentPerformanceMonitoringService.getAlertRules(organizationId, agentId);
  return c.json({ success: true, rules });
});

// Update alert rule
app.patch('/alert-rules/:id', async (c) => {
  const ruleId = c.req.param('id');
  const userId = c.get('userId');
  const data = await c.req.json();

  const result = await agentPerformanceMonitoringService.updateAlertRule(ruleId, data, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Delete alert rule
app.delete('/alert-rules/:id', async (c) => {
  const ruleId = c.req.param('id');
  const userId = c.get('userId');

  const result = await agentPerformanceMonitoringService.deleteAlertRule(ruleId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Get alerts
app.get('/alerts', async (c) => {
  const organizationId = c.get('organizationId');
  const filters = {
    agentId: c.req.query('agentId'),
    severity: c.req.query('severity') as any,
    status: c.req.query('status') as any,
    startDate: c.req.query('startDate') ? new Date(c.req.query('startDate')!) : undefined,
    endDate: c.req.query('endDate') ? new Date(c.req.query('endDate')!) : undefined,
  };

  const alerts = await agentPerformanceMonitoringService.getAlerts(organizationId, filters);
  return c.json({ success: true, alerts });
});

// Get active alerts
app.get('/alerts/active', async (c) => {
  const organizationId = c.get('organizationId');
  const alerts = await agentPerformanceMonitoringService.getActiveAlerts(organizationId);
  return c.json({ success: true, alerts });
});

// Acknowledge alert
app.post('/alerts/:id/acknowledge', async (c) => {
  const alertId = c.req.param('id');
  const userId = c.get('userId');

  const result = await agentPerformanceMonitoringService.acknowledgeAlert(alertId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Resolve alert
app.post('/alerts/:id/resolve', async (c) => {
  const alertId = c.req.param('id');
  const userId = c.get('userId');
  const { resolution } = await c.req.json();

  const result = await agentPerformanceMonitoringService.resolveAlert(alertId, resolution, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Get performance dashboard
app.get('/dashboard/performance', async (c) => {
  const organizationId = c.get('organizationId');
  const agentId = c.req.query('agentId');
  const startDate = c.req.query('startDate') ? new Date(c.req.query('startDate')!) : undefined;
  const endDate = c.req.query('endDate') ? new Date(c.req.query('endDate')!) : undefined;

  const dashboard = await agentPerformanceMonitoringService.getPerformanceDashboard(
    organizationId,
    agentId,
    startDate,
    endDate
  );

  return c.json({ success: true, dashboard });
});

// Create cost center
app.post('/cost-centers', async (c) => {
  const data = await c.req.json();
  const organizationId = c.get('organizationId');
  const userId = c.get('userId');

  const result = await agentPerformanceMonitoringService.createCostCenter(
    {
      ...data,
      organizationId,
    },
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get cost centers
app.get('/cost-centers', async (c) => {
  const organizationId = c.get('organizationId');
  const costCenters = await agentPerformanceMonitoringService.getCostCenters(organizationId);
  return c.json({ success: true, costCenters });
});

// Record cost
app.post('/costs', async (c) => {
  const data = await c.req.json();
  const organizationId = c.get('organizationId');

  const result = await agentPerformanceMonitoringService.recordCost({
    ...data,
    organizationId,
  });

  return c.json(result, result.success ? 201 : 400);
});

// Get cost report
app.get('/costs/report', async (c) => {
  const organizationId = c.get('organizationId');
  const costCenterId = c.req.query('costCenterId');
  const startDate = c.req.query('startDate') ? new Date(c.req.query('startDate')!) : undefined;
  const endDate = c.req.query('endDate') ? new Date(c.req.query('endDate')!) : undefined;
  const groupBy = c.req.query('groupBy') as any;

  const report = await agentPerformanceMonitoringService.getCostReport(
    organizationId,
    costCenterId,
    startDate,
    endDate,
    groupBy
  );

  return c.json({ success: true, report });
});

// Check budget alert
app.get('/costs/budget-alert', async (c) => {
  const organizationId = c.get('organizationId');
  const costCenterId = c.req.query('costCenterId');

  const result = await agentPerformanceMonitoringService.checkBudgetAlert(
    organizationId,
    costCenterId
  );

  return c.json(result, result.exceeded ? 200 : 200);
});

// ==================== VOICE CONVERSATION ROUTES ====================

// Start conversation
app.post('/voice/conversations', async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await voiceConversationService.startConversation(
    data.agentId,
    userId,
    organizationId,
    data.options
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get conversations
app.get('/voice/conversations', async (c) => {
  const organizationId = c.get('organizationId');
  const agentId = c.req.query('agentId');
  const userId = c.req.query('userId');
  const status = c.req.query('status') as any;

  const conversations = await voiceConversationService.getConversations(
    organizationId,
    { agentId, userId, status }
  );

  return c.json({ success: true, conversations });
});

// Get conversation by ID
app.get('/voice/conversations/:id', async (c) => {
  const conversationId = c.req.param('id');

  const conversation = await voiceConversationService.getConversationById(conversationId);

  if (!conversation) {
    return c.json({ success: false, message: 'Conversation not found' }, 404);
  }

  return c.json({ success: true, conversation });
});

// Send text message
app.post('/voice/conversations/:id/text', async (c) => {
  const conversationId = c.req.param('id');
  const { text } = await c.req.json();
  const userId = c.get('userId');

  const result = await voiceConversationService.sendTextMessage(conversationId, text, userId);
  return c.json(result, result.success ? 200 : 400);
});

// End conversation
app.post('/voice/conversations/:id/end', async (c) => {
  const conversationId = c.req.param('id');
  const userId = c.get('userId');

  const result = await voiceConversationService.endConversation(conversationId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Get transcript
app.get('/voice/conversations/:id/transcript', async (c) => {
  const conversationId = c.req.param('id');

  const transcript = await voiceConversationService.getTranscript(conversationId);
  return c.json({ success: true, transcript });
});

// Update voice settings
app.patch('/voice/conversations/:id/settings', async (c) => {
  const conversationId = c.req.param('id');
  const settings = await c.req.json();

  const result = await voiceConversationService.updateVoiceSettings(conversationId, settings);
  return c.json(result, result.success ? 200 : 400);
});

// Get conversation stats
app.get('/voice/conversations/:id/stats', async (c) => {
  const conversationId = c.req.param('id');

  const stats = await voiceConversationService.getConversationStats(conversationId);
  return c.json({ success: true, stats });
});

// ==================== API KEYS & INTEGRATIONS ROUTES ====================

// Generate API key
app.post('/api-keys', async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await apiKeysIntegrationsService.generateApiKey(
    userId,
    organizationId,
    data
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get API keys
app.get('/api-keys', async (c) => {
  const organizationId = c.get('organizationId');
  const options = {
    status: c.req.query('status') as any,
    userId: c.req.query('userId'),
  };

  const keys = await apiKeysIntegrationsService.getOrganizationApiKeys(organizationId, options);
  return c.json({ success: true, keys });
});

// Revoke API key
app.post('/api-keys/:id/revoke', async (c) => {
  const keyId = c.req.param('id');
  const userId = c.get('userId');
  const { reason } = await c.req.json();

  const result = await apiKeysIntegrationsService.revokeApiKey(keyId, userId, reason);
  return c.json(result, result.success ? 200 : 400);
});

// Create integration
app.post('/integrations', async (c) => {
  const data = await c.req.json();
  const userId = c.get('userId');
  const organizationId = c.get('organizationId');

  const result = await apiKeysIntegrationsService.createIntegration(
    organizationId,
    data,
    userId
  );

  return c.json(result, result.success ? 201 : 400);
});

// Get integrations
app.get('/integrations', async (c) => {
  const organizationId = c.get('organizationId');
  const options = {
    type: c.req.query('type') as any,
    status: c.req.query('status') as any,
    provider: c.req.query('provider'),
  };

  const integrations = await apiKeysIntegrationsService.getIntegrations(organizationId, options);
  return c.json({ success: true, integrations });
});

// Get integration by ID
app.get('/integrations/:id', async (c) => {
  const integrationId = c.req.param('id');

  const integration = await apiKeysIntegrationsService.getIntegrationById(integrationId);

  if (!integration) {
    return c.json({ success: false, message: 'Integration not found' }, 404);
  }

  return c.json({ success: true, integration });
});

// Test integration
app.post('/integrations/:id/test', async (c) => {
  const integrationId = c.req.param('id');

  const result = await apiKeysIntegrationsService.testIntegration(integrationId);
  return c.json(result, result.success ? 200 : 400);
});

// Update integration
app.patch('/integrations/:id', async (c) => {
  const integrationId = c.req.param('id');
  const userId = c.get('userId');
  const data = await c.req.json();

  const result = await apiKeysIntegrationsService.updateIntegration(integrationId, data, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Delete integration
app.delete('/integrations/:id', async (c) => {
  const integrationId = c.req.param('id');
  const userId = c.get('userId');

  const result = await apiKeysIntegrationsService.deleteIntegration(integrationId, userId);
  return c.json(result, result.success ? 200 : 400);
});

// Sync integration
app.post('/integrations/:id/sync', async (c) => {
  const integrationId = c.req.param('id');
  const options = await c.req.json();

  const result = await apiKeysIntegrationsService.syncIntegration(integrationId, options);
  return c.json(result, result.success ? 200 : 400);
});

// Get integration logs
app.get('/integrations/:id/logs', async (c) => {
  const integrationId = c.req.param('id');
  const options = {
    eventType: c.req.query('eventType'),
    status: c.req.query('status'),
    startDate: c.req.query('startDate') ? new Date(c.req.query('startDate')!) : undefined,
    endDate: c.req.query('endDate') ? new Date(c.req.query('endDate')!) : undefined,
    limit: c.req.query('limit') ? parseInt(c.req.query('limit')!) : undefined,
  };

  const logs = await apiKeysIntegrationsService.getIntegrationLogs(integrationId, options);
  return c.json({ success: true, logs });
});

// Get integration catalog
app.get('/integrations/catalog', async (c) => {
  const catalog = await apiKeysIntegrationsService.getIntegrationCatalog();
  return c.json({ success: true, catalog });
});

// Get API usage stats
app.get('/api-keys/:id/usage', async (c) => {
  const keyId = c.req.param('id');
  const startDate = c.req.query('startDate') ? new Date(c.req.query('startDate')!) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const endDate = c.req.query('endDate') ? new Date(c.req.query('endDate')!) : new Date();

  const stats = await apiKeysIntegrationsService.getApiUsageStats(keyId, { start: startDate, end: endDate });
  return c.json({ success: true, stats });
});

export default app;
