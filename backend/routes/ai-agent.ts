import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { aiAgentService } from '../services/ai-agent-service';
import { requireAuth, requirePermission, requireMinRole } from '../middleware/rbac-middleware';
import { Permission, Role } from '../lib/rbac';
import type { AppContext } from '../types/hono';
import { logger } from '../lib/production-logger';

const app = new Hono<{ Variables: { auth: { userId: string; organizationId: string; sessionId?: string } } }>();

// Validation schemas
const startConversationSchema = z.object({
  agentId: z.string().min(1),
  initialMessage: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

const sendMessageSchema = z.object({
  message: z.string().min(1),
  metadata: z.record(z.any()).optional()
});

const createAgentSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['voice-assistant', 'receptionist', 'negotiator', 'workflow-automator', 'data-analyst']),
  systemPrompt: z.string().min(1),
  model: z.string().min(1),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(8000),
  tools: z.array(z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    parameters: z.record(z.any()),
    category: z.string().optional(),
    enabled: z.boolean().default(true),
    timeout: z.number().optional(),
    retryAttempts: z.number().optional()
  })).optional(),
  knowledgeBase: z.array(z.string()).optional(),
  voiceProfile: z.object({
    provider: z.string(),
    voiceId: z.string(),
    language: z.string(),
    speed: z.number()
  }).optional(),
  capabilities: z.array(z.string()).optional()
});

const updateAgentSchema = createAgentSchema.partial();

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

// Routes
app.post('/conversations', zValidator('json', startConversationSchema), requirePermission(Permission.AI_AGENT_CREATE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const userId = auth?.userId as string;
    const { agentId, initialMessage, metadata } = c.req.valid('json');
    
    const conversation = await aiAgentService.startConversation(agentId, initialMessage, {
      ...metadata,
      organizationId
    });
    
    return c.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    logger.error('Failed to start conversation:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start conversation'
    }, 500);
  }
});

app.post('/conversations/:sessionId/messages', zValidator('json', sendMessageSchema), requirePermission(Permission.AI_AGENT_UPDATE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const sessionId = c.req.param('sessionId');
    const { message, metadata } = c.req.valid('json');
    const userId = auth?.userId as string;
    
    const response = await aiAgentService.sendMessage(sessionId, message, {
      organizationId,
      userId,
      ...metadata
    });
    
    return c.json({
      success: true,
      data: response
    });
  } catch (error) {
    logger.error('Failed to send message:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    }, 500);
  }
});

app.get('/conversations/:sessionId', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const userId = auth?.userId as string;
    const sessionId = c.req.param('sessionId');
    const limit = c.req.query('limit') ? Number(c.req.query('limit')) : undefined;
    const offset = c.req.query('offset') ? Number(c.req.query('offset')) : undefined;
    
    const conversation = await aiAgentService.retrieveConversationHistory(sessionId, {
      organizationId,
      limit,
      offset
    });
    
    return c.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    logger.error('Failed to get conversation:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get conversation'
    }, 500);
  }
});

app.get('/conversations/:sessionId/history', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const userId = auth?.userId as string;
    const sessionId = c.req.param('sessionId');
    const limit = c.req.query('limit') ? Number(c.req.query('limit')) : undefined;
    const offset = c.req.query('offset') ? Number(c.req.query('offset')) : undefined;
    
    const history = await aiAgentService.retrieveConversationHistory(sessionId, {
      organizationId,
      limit,
      offset
    });
    
    return c.json({
      success: true,
      data: history
    });
  } catch (error) {
    logger.error('Failed to get conversation history:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get conversation history'
    }, 500);
  }
});

// Agent management routes
app.post('/agents', zValidator('json', createAgentSchema), requirePermission(Permission.AI_AGENT_CREATE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const agentData = c.req.valid('json');
    
    const agent = await aiAgentService.createAgent({
      organizationId,
      name: agentData.name,
      type: agentData.type,
      description: agentData.description,
      config: agentData.config,
      tools: agentData.tools,
      isActive: agentData.isActive
    });
    
    return c.json({
      success: true,
      data: agent
    });
  } catch (error) {
    logger.error('Failed to create agent:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create agent'
    }, 500);
  }
});

app.get('/agents', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const type = c.req.query('type') as any;
    
    const agents = await aiAgentService.getAgents(organizationId, type);
    
    return c.json({
      success: true,
      data: agents
    });
  } catch (error) {
    logger.error('Failed to get agents:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get agents'
    }, 500);
  }
});

app.get('/agents/:id', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const agentId = c.req.param('id');
    
    const agent = await aiAgentService.getAgent(agentId, organizationId);
    
    if (!agent) {
      return c.json({
        success: false,
        error: 'Agent not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: agent
    });
  } catch (error) {
    logger.error('Failed to get agent:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get agent'
    }, 500);
  }
});

app.put('/agents/:id', zValidator('json', updateAgentSchema), requirePermission(Permission.AI_AGENT_UPDATE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const agentId = c.req.param('id');
    const updateData = c.req.valid('json');
    
    const agent = await aiAgentService.updateAgent(agentId, organizationId, updateData);
    
    return c.json({
      success: true,
      data: agent
    });
  } catch (error) {
    logger.error('Failed to update agent:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update agent'
    }, 500);
  }
});

app.delete('/agents/:id', requirePermission(Permission.AI_AGENT_DELETE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const agentId = c.req.param('id');
    
    await aiAgentService.deleteAgent(agentId, organizationId);
    
    return c.json({
      success: true,
      message: 'Agent deleted successfully'
    });
  } catch (error) {
    logger.error('Failed to delete agent:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete agent'
    }, 500);
  }
});

// Tool management routes
app.get('/tools', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    // Note: aiAgentService doesn't expose tool registry
    // This would need to be implemented
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get tools:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get tools'
    }, 500);
  }
});

app.get('/tools/:category', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    const category = c.req.param('category');
    
    // Note: aiAgentService doesn't expose tool registry
    // This would need to be implemented
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get tools by category:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get tools by category'
    }, 500);
  }
});

app.post('/agents/:id/tools/:toolName/enable', requirePermission(Permission.AI_AGENT_UPDATE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const agentId = c.req.param('id');
    const toolName = c.req.param('toolName');
    
    await aiAgentService.enableTool(agentId, organizationId, toolName);
    
    return c.json({
      success: true,
      message: `Tool ${toolName} enabled successfully`
    });
  } catch (error) {
    logger.error('Failed to enable tool:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to enable tool'
    }, 500);
  }
});

app.post('/agents/:id/tools/:toolName/disable', requirePermission(Permission.AI_AGENT_UPDATE), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const agentId = c.req.param('id');
    const toolName = c.req.param('toolName');
    
    await aiAgentService.disableTool(agentId, organizationId, toolName);
    
    return c.json({
      success: true,
      message: `Tool ${toolName} disabled successfully`
    });
  } catch (error) {
    logger.error('Failed to disable tool:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to disable tool'
    }, 500);
  }
});

app.post('/tools/:name/enable', requirePermission(Permission.AI_AGENT_MANAGE), async (c) => {
  try {
    const toolName = c.req.param('name');
    
    // Get tool registry from AI agent service
    const toolRegistry = (aiAgentService as any).toolRegistry;
    if (!toolRegistry) {
      return c.json({
        success: false,
        error: 'Tool registry not available'
      }, 500);
    }

    const tool = toolRegistry.getTool(toolName);
    if (!tool) {
      return c.json({
        success: false,
        error: `Tool '${toolName}' not found`
      }, 404);
    }

    toolRegistry.enableTool(toolName);
    
    return c.json({
      success: true,
      message: `Tool '${toolName}' enabled successfully`,
      tool: {
        name: tool.name,
        description: tool.description,
        enabled: true,
        category: tool.category
      }
    });
  } catch (error) {
    logger.error('Failed to enable tool:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to enable tool'
    }, 500);
  }
});

app.post('/tools/:name/disable', requirePermission(Permission.AI_AGENT_MANAGE), async (c) => {
  try {
    const toolName = c.req.param('name');
    
    // Get tool registry from AI agent service
    const toolRegistry = (aiAgentService as any).toolRegistry;
    if (!toolRegistry) {
      return c.json({
        success: false,
        error: 'Tool registry not available'
      }, 500);
    }

    const tool = toolRegistry.getTool(toolName);
    if (!tool) {
      return c.json({
        success: false,
        error: `Tool '${toolName}' not found`
      }, 404);
    }

    toolRegistry.disableTool(toolName);
    
    return c.json({
      success: true,
      message: `Tool '${toolName}' disabled successfully`,
      tool: {
        name: tool.name,
        description: tool.description,
        enabled: false,
        category: tool.category
      }
    });
  } catch (error) {
    logger.error('Failed to disable tool:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to disable tool'
    }, 500);
  }
});

// Analytics and monitoring routes
app.get('/analytics/conversations', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const startDate = c.req.query('startDate') ? new Date(c.req.query('startDate') as string) : undefined;
    const endDate = c.req.query('endDate') ? new Date(c.req.query('endDate') as string) : undefined;
    
    // Note: aiAgentService doesn't have analytics methods
    // This would need to be implemented
    return c.json({
      success: true,
      data: {
        totalConversations: 0,
        averageResponseTime: 0,
        totalMessages: 0,
        completionRate: 0
      }
    });
  } catch (error) {
    logger.error('Failed to get conversation analytics:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get conversation analytics'
    }, 500);
  }
});

app.get('/analytics/agents', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    
    // Note: aiAgentService doesn't have analytics methods
    // This would need to be implemented
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get agent analytics:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get agent analytics'
    }, 500);
  }
});

app.get('/analytics/tools', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    
    // Note: aiAgentService doesn't have analytics methods
    // This would need to be implemented
    return c.json({
      success: true,
      data: {
        totalToolExecutions: 0,
        successRate: 0,
        averageExecutionTime: 0,
        topTools: []
      }
    });
  } catch (error) {
    logger.error('Failed to get tool analytics:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get tool analytics'
    }, 500);
  }
});

// Memory management routes
app.get('/conversations/:sessionId/memories', requirePermission(Permission.AI_AGENT_READ), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const userId = auth?.userId as string;
    const sessionId = c.req.param('sessionId');
    
    // Note: aiAgentService doesn't expose memory management
    // This would need to be implemented
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get conversation memories:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get conversation memories'
    }, 500);
  }
});

app.post('/conversations/:sessionId/memories', zValidator('json', z.object({
  type: z.string(),
  content: z.string(),
  importance: z.number().min(0).max(1),
  tags: z.array(z.string()).optional(),
  metadata: z.record(z.any()).optional()
})), async (c) => {
  try {
    const auth = c.get('auth');
    const organizationId = auth?.organizationId as string;
    const sessionId = c.req.param('sessionId');
    const userId = auth?.userId as string;
    const memoryData = c.req.valid('json');
    
    // Get the agent ID from the conversation
    const conversation = await aiAgentService.retrieveConversationHistory(sessionId, {
      organizationId,
      limit: 1
    });
    
    if (!conversation || conversation.messages.length === 0) {
      return c.json({
        success: false,
        error: 'Conversation not found'
      }, 404);
    }
    
    // Extract agent ID from the first message or use a default
    const agentId = (conversation.messages[0] as any)?.agentId || 'default-agent';
    
    const memoryId = await aiAgentService.storeMemory(agentId, organizationId, {
      type: memoryData.type,
      content: memoryData.content,
      metadata: {
        importance: memoryData.importance,
        tags: memoryData.tags,
        sessionId,
        userId
      }
    });
    
    return c.json({
      success: true,
      data: { memoryId }
    });
  } catch (error) {
    logger.error('Failed to store memory:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to store memory'
    }, 500);
  }
});

export default app;
