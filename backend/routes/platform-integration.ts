import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { platformIntegrationService } from '../services/platform-integration-service';
import { platformAuthService, PlatformType } from '../services/platform-auth-service';
import { semanticSearchService } from '../services/semantic-search-service';
import { memoryManagementService } from '../services/memory-management-service';
import { webhookManager } from '../services/webhook-manager';
import { requireAuth, requirePermission } from '../middleware/rbac-middleware';
import { Permission } from '../lib/rbac';
import { logger } from '../lib/production-logger';

const app = new Hono();

// Validation schemas
const connectPlatformSchema = z.object({
  platform: z.enum(['salesforce', 'hubspot', 'slack', 'microsoft_teams', 'google_workspace', 'zoom', 'calendly', 'stripe', 'whatsapp', 'instagram', 'facebook', 'linkedin', 'twitter', 'telegram', 'signal']),
  authCode: z.string(),
  state: z.string(),
});

const syncPlatformSchema = z.object({
  platform: z.enum(['salesforce', 'hubspot', 'slack', 'microsoft_teams', 'google_workspace', 'zoom', 'calendly', 'stripe', 'whatsapp', 'instagram', 'facebook', 'linkedin', 'twitter', 'telegram', 'signal']),
  type: z.enum(['full', 'incremental']).default('full'),
});

const searchMemorySchema = z.object({
  agentId: z.string().uuid(),
  query: z.string(),
  filters: z.object({
    memoryType: z.array(z.string()).optional(),
    dateRange: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }).optional(),
    importanceScore: z.object({
      min: z.number(),
      max: z.number(),
    }).optional(),
    sessionId: z.string().optional(),
  }).optional(),
  options: z.object({
    limit: z.number().min(1).max(100).default(10),
    threshold: z.number().min(0).max(1).default(0.7),
    includeMetadata: z.boolean().default(true),
    boostRecent: z.boolean().default(false),
    boostImportant: z.boolean().default(false),
  }).optional(),
});

const generateSummarySchema = z.object({
  agentId: z.string().uuid(),
  type: z.enum(['daily', 'weekly', 'monthly', 'topic']),
  topic: z.string().optional(),
});

const getContextSchema = z.object({
  agentId: z.string().uuid(),
  query: z.string(),
  options: z.object({
    maxContextItems: z.number().min(1).max(50).default(10),
    contextTypes: z.array(z.enum(['memory', 'context', 'summary'])).default(['memory', 'context']),
    timeWeight: z.number().min(0).max(1).default(0.2),
    importanceWeight: z.number().min(0).max(1).default(0.3),
    relevanceWeight: z.number().min(0).max(1).default(0.5),
  }).optional(),
});

// Middleware to extract organization ID and require authentication
app.use('*', requireAuth());
app.use('*', async (c, next) => {
  const auth = c.get('auth');
  if (!auth.organizationId) {
    return c.json({ error: 'Organization ID is required' }, 400);
  }
  c.set('organizationId', auth.organizationId);
  await next();
});

// Platform Integration Routes

// Get integration health status
app.get('/health', async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const health = await platformIntegrationService.getIntegrationStatus(organizationId);
    return c.json({ success: true, data: health });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Connect a platform
app.post('/connect', 
  requirePermission(Permission.INTEGRATION_CREATE),
  zValidator('json', connectPlatformSchema), 
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { platform, authCode, state } = c.req.valid('json');
    
    const result = await platformIntegrationService.connectPlatform(
      organizationId,
      platform,
      authCode,
      state
    );
    
    return c.json({ success: result.success, data: result });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Disconnect a platform
app.post('/disconnect/:platform', 
  requirePermission(Permission.INTEGRATION_DELETE),
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const platform = c.req.param('platform') as PlatformType;
    
    const result = await platformIntegrationService.disconnectPlatform(organizationId, platform);
    
    return c.json({ success: result.success, data: result });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Sync a platform
app.post('/sync', 
  requirePermission(Permission.INTEGRATION_UPDATE),
  zValidator('json', syncPlatformSchema), 
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { platform, type } = c.req.valid('json');
    
    const syncOperation = await platformIntegrationService.syncPlatform(organizationId, platform, type);
    
    return c.json({ success: true, data: syncOperation });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Get sync operation status
app.get('/sync/:syncId', 
  requirePermission(Permission.INTEGRATION_READ),
  async (c) => {
  try {
    const syncId = c.req.param('syncId');
    const syncOperation = await platformIntegrationService.getSyncOperation(syncId);
    
    if (!syncOperation) {
      return c.json({ success: false, error: 'Sync operation not found' }, 404);
    }
    
    return c.json({ success: true, data: syncOperation });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Get active syncs
app.get('/syncs/active', 
  requirePermission(Permission.INTEGRATION_READ),
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const activeSyncs = await platformIntegrationService.getActiveSyncs(organizationId);
    
    return c.json({ success: true, data: activeSyncs });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// OAuth Routes

// Get OAuth URL for platform
app.get('/oauth/:platform/url', 
  requirePermission(Permission.INTEGRATION_READ),
  async (c) => {
  try {
    const platform = c.req.param('platform') as PlatformType;
    const userId = c.req.query('userId') || 'default-user';
    
    const oauthUrl = platformAuthService.generateOAuthUrl(platform, userId);
    
    return c.json({ success: true, data: { oauthUrl } });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// OAuth callback handler
app.post('/oauth/:platform/callback', 
  requirePermission(Permission.INTEGRATION_UPDATE),
  zValidator('json', z.object({
  code: z.string(),
  state: z.string(),
})), async (c) => {
  try {
    const platform = c.req.param('platform') as PlatformType;
    const { code, state } = c.req.valid('json');
    
    const tokens = await platformAuthService.exchangeOAuthCode(platform, code, state);
    
    return c.json({ success: true, data: tokens });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Webhook Routes

// Handle incoming webhooks
app.post('/webhooks/:platform', 
  requirePermission(Permission.WEBHOOK_CREATE),
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const platform = c.req.param('platform') as PlatformType;
    const eventId = c.req.header('X-Event-ID') || `evt_${Date.now()}`;
    const eventType = c.req.header('X-Event-Type') || 'unknown';
    const signature = c.req.header('X-Signature');
    
    const payload = await c.req.json();
    const headers = Object.fromEntries(c.req.raw().headers);
    
    const result = await platformIntegrationService.handleWebhook(
      platform,
      organizationId,
      eventId,
      eventType,
      payload,
      headers,
      signature
    );
    
    return c.json({ success: result.success, data: result });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Agent Memory Routes

// Search agent memory
app.post('/memory/search', 
  requirePermission(Permission.AI_AGENT_READ),
  zValidator('json', searchMemorySchema), 
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { agentId, query, filters, options } = c.req.valid('json');
    
    const searchQuery = {
      text: query,
      filters,
      options,
    };
    
    const results = await platformIntegrationService.searchAgentMemory(
      agentId,
      organizationId,
      searchQuery
    );
    
    return c.json({ success: true, data: results });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Get agent context
app.post('/memory/context', 
  requirePermission(Permission.AI_AGENT_READ),
  zValidator('json', getContextSchema), 
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { agentId, query, options } = c.req.valid('json');
    
    const context = await platformIntegrationService.getAgentContext(
      agentId,
      organizationId,
      query,
      options
    );
    
    return c.json({ success: true, data: context });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Generate memory summary
app.post('/memory/summary', 
  requirePermission(Permission.AI_AGENT_MANAGE),
  zValidator('json', generateSummarySchema), 
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { agentId, type, topic } = c.req.valid('json');
    
    const summary = await platformIntegrationService.generateMemorySummary(
      agentId,
      organizationId,
      type,
      topic
    );
    
    return c.json({ success: true, data: summary });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Prune agent memory
app.post('/memory/prune/:agentId', 
  requirePermission(Permission.AI_AGENT_MANAGE),
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const agentId = c.req.param('agentId');
    
    const pruning = await platformIntegrationService.pruneAgentMemory(agentId, organizationId);
    
    return c.json({ success: true, data: pruning });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Memory Management Routes

// Schedule automatic summaries
app.post('/memory/schedule-summaries', 
  requirePermission(Permission.AI_AGENT_MANAGE),
  async (c) => {
  try {
    await memoryManagementService.scheduleAutomaticSummaries();
    
    return c.json({ success: true, message: 'Automatic summaries scheduled' });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Schedule automatic pruning
app.post('/memory/schedule-pruning', 
  requirePermission(Permission.AI_AGENT_MANAGE),
  async (c) => {
  try {
    await memoryManagementService.scheduleAutomaticPruning();
    
    return c.json({ success: true, message: 'Automatic pruning scheduled' });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Get memory statistics
app.get('/memory/stats/:agentId', 
  requirePermission(Permission.AI_AGENT_READ),
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const agentId = c.req.param('agentId');
    
    const stats = await memoryManagementService.getMemoryStats(agentId, organizationId);
    
    return c.json({ success: true, data: stats });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Utility Routes

// Get supported platforms
app.get('/platforms', async (c) => {
  const platforms = [
    { id: 'salesforce', name: 'Salesforce', category: 'crm' },
    { id: 'hubspot', name: 'HubSpot', category: 'crm' },
    { id: 'slack', name: 'Slack', category: 'communication' },
    { id: 'microsoft_teams', name: 'Microsoft Teams', category: 'communication' },
    { id: 'google_workspace', name: 'Google Workspace', category: 'productivity' },
    { id: 'zoom', name: 'Zoom', category: 'communication' },
    { id: 'calendly', name: 'Calendly', category: 'scheduling' },
    { id: 'stripe', name: 'Stripe', category: 'payment' },
    { id: 'whatsapp', name: 'WhatsApp', category: 'social' },
    { id: 'instagram', name: 'Instagram', category: 'social' },
    { id: 'facebook', name: 'Facebook', category: 'social' },
    { id: 'linkedin', name: 'LinkedIn', category: 'social' },
    { id: 'twitter', name: 'Twitter', category: 'social' },
    { id: 'telegram', name: 'Telegram', category: 'social' },
    { id: 'signal', name: 'Signal', category: 'social' },
  ];
  
  return c.json({ success: true, data: platforms });
});

// Test connection to platform
app.post('/test/:platform', 
  requirePermission(Permission.INTEGRATION_TEST),
  async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const platform = c.req.param('platform') as PlatformType;
    
    const credentials = await platformAuthService.ensureValidCredentialsForOrg(organizationId, platform);
    const isValid = await platformAuthService.validateCredentials(platform, credentials?.accessToken || '');
    
    return c.json({ success: true, data: { valid: isValid } });
  } catch (error) {
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, 500);
  }
});

// Error handler
app.onError((err, c) => {
  logger.error('[PlatformIntegrationAPI] Error:', err);
  return c.json({
    success: false,
    error: err.message || 'Internal server error',
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Endpoint not found',
  }, 404);
});

export default app;
