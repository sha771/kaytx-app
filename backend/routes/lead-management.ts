import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { leadManagementService } from '../services/lead-management-service';
import { requireAuth, requirePermission, requireMinRole } from '../middleware/rbac-middleware';
import { Permission, Role } from '../lib/rbac';
import { logger } from '../lib/production-logger';

const app = new Hono();

// Middleware to extract organization ID and require authentication
app.use('*', requireAuth());
app.use('*', async (c, next) => {
  const auth = c.get('auth');
  if (!auth.organizationId) {
    return c.json({ error: 'Organization ID is required' }, 400);
  }
  (c as any).set('organizationId', auth.organizationId);
  await next();
});

// Validation schemas
const createLeadSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional(),
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost', 'archived']).optional(),
  source: z.string().min(1),
  assignedTo: z.string().optional(),
  metadata: z.record(z.any()).optional()
});

const updateLeadSchema = createLeadSchema.partial();

const updateStatusSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'converted', 'lost', 'archived'])
});

const assignLeadSchema = z.object({
  assignedTo: z.string().min(1)
});

const createScoringRuleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than', 'in', 'not_in', 'exists', 'not_exists', 'regex']),
    value: z.any(),
    weight: z.number().optional()
  })),
  actions: z.array(z.object({
    type: z.enum(['add_score', 'multiply_score', 'set_score', 'set_temperature', 'change_stage', 'assign_tag', 'remove_tag', 'assign_to_user', 'create_task']),
    value: z.any()
  })),
  priority: z.number().default(0)
});

const createNurturingWorkflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  trigger: z.object({
    type: z.enum(['lead_created', 'score_threshold', 'stage_change', 'tag_added', 'time_based', 'manual', 'activity_occurred']),
    conditions: z.array(z.object({
      field: z.string(),
      operator: z.enum(['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than', 'in', 'not_in', 'exists', 'not_exists', 'regex']),
      value: z.any(),
      weight: z.number().optional()
    })).optional(),
    scoreThreshold: z.number().optional(),
    stage: z.string().optional(),
    tag: z.string().optional(),
    delayHours: z.number().optional(),
    activityType: z.string().optional()
  }),
  steps: z.array(z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['email', 'task', 'delay', 'score_update', 'stage_change', 'notification', 'webhook', 'condition_check']),
    config: z.record(z.any()),
    delayHours: z.number().optional(),
    order: z.number()
  })),
  isActive: z.boolean().default(true)
});

// Routes
app.post('/leads', zValidator('json', createLeadSchema), requirePermission(Permission.LEAD_CREATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadData = c.req.valid('json');
    
    const lead = await leadManagementService.createLead(organizationId, leadData);
    
    return c.json({
      success: true,
      data: lead
    });
  } catch (error) {
    logger.error('Failed to create lead:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create lead'
    }, 500);
  }
});

app.get('/leads', requirePermission(Permission.LEAD_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const filters = {
      status: c.req.query('status') as any,
      source: c.req.query('source') as string,
      assignedTo: c.req.query('assignedTo') as string,
      search: c.req.query('search') as string,
      stage: c.req.query('stage') as string,
      temperature: c.req.query('temperature') as any,
      tags: c.req.query('tags') ? (c.req.query('tags') as string).split(',') : undefined,
      minScore: c.req.query('minScore') ? Number(c.req.query('minScore')) : undefined,
      maxScore: c.req.query('maxScore') ? Number(c.req.query('maxScore')) : undefined,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined,
      offset: c.req.query('offset') ? Number(c.req.query('offset')) : undefined
    };
    
    const result = await leadManagementService.getLeads(organizationId, filters);
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to get leads:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get leads'
    }, 500);
  }
});

app.get('/leads/:id', requirePermission(Permission.LEAD_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    
    const lead = await leadManagementService.getLead(organizationId, leadId);
    
    if (!lead) {
      return c.json({
        success: false,
        error: 'Lead not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: lead
    });
  } catch (error) {
    logger.error('Failed to get lead:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get lead'
    }, 500);
  }
});

app.put('/leads/:id', zValidator('json', updateLeadSchema), requirePermission(Permission.LEAD_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    const updates = c.req.valid('json');
    
    const lead = await leadManagementService.updateLead(organizationId, leadId, updates);
    
    if (!lead) {
      return c.json({
        success: false,
        error: 'Lead not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: lead
    });
  } catch (error) {
    logger.error('Failed to update lead:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update lead'
    }, 500);
  }
});

app.delete('/leads/:id', requirePermission(Permission.LEAD_DELETE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    
    const success = await leadManagementService.deleteLead(organizationId, leadId);
    
    return c.json({
      success,
      message: success ? 'Lead deleted successfully' : 'Failed to delete lead'
    });
  } catch (error) {
    logger.error('Failed to delete lead:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete lead'
    }, 500);
  }
});

app.post('/leads/:id/status', zValidator('json', updateStatusSchema), requirePermission(Permission.LEAD_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    const { status } = c.req.valid('json');
    const userId = c.get('userId');
    
    const success = await leadManagementService.updateLeadStatus(organizationId, leadId, status, userId);
    
    return c.json({
      success,
      message: success ? 'Lead status updated successfully' : 'Failed to update lead status'
    });
  } catch (error) {
    logger.error('Failed to update lead status:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update lead status'
    }, 500);
  }
});

app.post('/leads/:id/assign', zValidator('json', assignLeadSchema), requirePermission(Permission.LEAD_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    const { assignedTo } = c.req.valid('json');
    const userId = c.get('userId');
    
    const success = await leadManagementService.assignLead(organizationId, leadId, assignedTo, userId);
    
    return c.json({
      success,
      message: success ? 'Lead assigned successfully' : 'Failed to assign lead'
    });
  } catch (error) {
    logger.error('Failed to assign lead:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to assign lead'
    }, 500);
  }
});

app.post('/leads/:id/score', zValidator('json', z.object({
  emailOpened: z.boolean().optional(),
  linkClicked: z.boolean().optional(),
  formSubmitted: z.boolean().optional(),
  websiteVisited: z.boolean().optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    const engagementData = c.req.valid('json');
    
    const newScore = await leadManagementService.updateLeadScore(organizationId, leadId, engagementData);
    
    return c.json({
      success: true,
      data: { newScore }
    });
  } catch (error) {
    logger.error('Failed to update lead score:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update lead score'
    }, 500);
  }
});

app.post('/leads/:id/convert', requirePermission(Permission.LEAD_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    const userId = c.get('userId');
    
    const success = await leadManagementService.convertToCustomer(organizationId, leadId, userId);
    
    return c.json({
      success,
      message: success ? 'Lead converted to customer successfully' : 'Failed to convert lead'
    });
  } catch (error) {
    logger.error('Failed to convert lead:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to convert lead'
    }, 500);
  }
});

app.get('/leads/:id/activities', requirePermission(Permission.LEAD_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const leadId = c.req.param('id');
    
    const activities = await leadManagementService.getLeadActivities(organizationId, leadId);
    
    return c.json({
      success: true,
      data: activities
    });
  } catch (error) {
    logger.error('Failed to get lead activities:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get lead activities'
    }, 500);
  }
});

app.get('/stats', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    
    const stats = await leadManagementService.getLeadStats(organizationId);
    
    return c.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Failed to get lead stats:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get lead stats'
    }, 500);
  }
});

// Scoring rules routes
app.post('/scoring-rules', zValidator('json', createScoringRuleSchema), requirePermission(Permission.LEAD_MANAGE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const ruleData = c.req.valid('json');
    
    const rule = await leadManagementService.createScoringRule(organizationId, ruleData);
    
    return c.json({
      success: true,
      data: rule
    });
  } catch (error) {
    logger.error('Failed to create scoring rule:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create scoring rule'
    }, 500);
  }
});

app.post('/scoring-rules/:id/apply', requirePermission(Permission.LEAD_MANAGE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const ruleId = c.req.param('id');
    
    // Note: leadManagementService doesn't have a method to apply a specific rule
    // This would need to be implemented
    return c.json({
      success: false,
      error: 'Apply scoring rule method not implemented'
    }, 501);
  } catch (error) {
    logger.error('Failed to apply scoring rule:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to apply scoring rule'
    }, 500);
  }
});

// Nurturing workflows routes
app.post('/nurturing-workflows', zValidator('json', createNurturingWorkflowSchema), requirePermission(Permission.LEAD_MANAGE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const workflowData = c.req.valid('json');
    
    const workflow = await leadManagementService.createNurturingWorkflow(organizationId, workflowData);
    
    return c.json({
      success: true,
      data: workflow
    });
  } catch (error) {
    logger.error('Failed to create nurturing workflow:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create nurturing workflow'
    }, 500);
  }
});

app.post('/nurturing-workflows/:id/start', zValidator('json', z.object({
  leadId: z.string().min(1)
})), requirePermission(Permission.LEAD_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const workflowId = c.req.param('id');
    const { leadId } = c.req.valid('json');
    
    // Note: leadManagementService doesn't have a method to manually start a workflow
    // This would need to be implemented
    return c.json({
      success: false,
      error: 'Start nurturing workflow method not implemented'
    }, 501);
  } catch (error) {
    logger.error('Failed to start nurturing workflow:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start nurturing workflow'
    }, 500);
  }
});

// Segments routes
app.post('/segments', zValidator('json', z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  conditions: z.array(z.object({
    field: z.string(),
    operator: z.enum(['equals', 'not_equals', 'contains', 'not_contains', 'greater_than', 'less_than', 'in', 'not_in', 'exists', 'not_exists', 'regex']),
    value: z.any(),
    weight: z.number().optional()
  })),
  isActive: z.boolean().default(true)
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const segmentData = c.req.valid('json');
    
    // Note: leadManagementService doesn't have a createLeadSegment method
    // This would need to be implemented
    return c.json({
      success: false,
      error: 'Create segment method not implemented'
    }, 501);
  } catch (error) {
    logger.error('Failed to create segment:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create segment'
    }, 500);
  }
});

app.get('/segments', requirePermission(Permission.LEAD_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    
    // Note: leadManagementService doesn't have a getSegments method
    // This would need to be implemented
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get segments:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get segments'
    }, 500);
  }
});

export default app;
