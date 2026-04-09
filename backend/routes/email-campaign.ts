import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { emailCampaignService } from '../services/email-campaign-service';
import { requireAuth, requirePermission, requireMinRole } from '../middleware/rbac-middleware';
import { Permission, Role } from '../lib/rbac';
import { logger } from '../lib/production-logger';

const app = new Hono();

// Middleware to extract organization ID and require authentication
app.use('*', requireAuth());
app.use('*', async (c, next) => {
  const auth = c.get('auth');
  if (!auth.organizationId) {
    logger.warn('Organization ID is required');
    return c.json({ error: 'Organization ID is required' }, 400);
  }
  c.set('organizationId', auth.organizationId);
  await next();
});

// Validation schemas
const createCampaignSchema = z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  content: z.string().min(1),
  fromEmail: z.string().email(),
  fromName: z.string().min(1),
  templateId: z.string().optional(),
  segmentId: z.string().optional(),
  abTestConfig: z.object({
    variants: z.array(z.object({
      id: z.string(),
      name: z.string(),
      subject: z.string().optional(),
      content: z.string().optional(),
      fromEmail: z.string().optional(),
      fromName: z.string().optional(),
      weight: z.number().min(0).max(100)
    })),
    testDuration: z.number().min(1),
    successMetric: z.enum(['open_rate', 'click_rate', 'conversion_rate']),
    confidenceLevel: z.number().min(0).max(1)
  }).optional(),
  personalizationRules: z.array(z.object({
    field: z.string(),
    type: z.enum(['replace', 'conditional', 'lookup']),
    conditions: z.array(z.object({
      operator: z.enum(['equals', 'contains', 'greater_than', 'less_than']),
      value: z.any(),
      result: z.string()
    })).optional(),
    lookupTable: z.record(z.string()).optional(),
    defaultValue: z.string().optional()
  })).optional(),
  deliverySchedule: z.object({
    type: z.enum(['immediate', 'scheduled', 'batched']),
    batchSize: z.number().optional(),
    batchInterval: z.number().optional(),
    timezone: z.string().optional(),
    optimalSendTime: z.boolean().optional()
  }).optional(),
  trackingSettings: z.object({
    openTracking: z.boolean(),
    clickTracking: z.boolean(),
    unsubscribeTracking: z.boolean(),
    spamComplaintTracking: z.boolean(),
    googleAnalytics: z.object({
      enabled: z.boolean(),
      campaignSource: z.string(),
      campaignMedium: z.string(),
      campaignName: z.string()
    }).optional()
  }).optional(),
  scheduledAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional()
});

const updateCampaignSchema = createCampaignSchema.partial();

const launchCampaignSchema = z.object({
  provider: z.string().optional(),
  batchSize: z.number().min(1).max(1000).optional(),
  schedule: z.string().datetime().optional()
});

// Routes
app.post('/campaigns', zValidator('json', createCampaignSchema), requirePermission(Permission.CAMPAIGN_CREATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignData = c.req.valid('json');
    
    const campaign = await emailCampaignService.createCampaign(organizationId, campaignData);
    
    return c.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    logger.error('Failed to create campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create campaign'
    }, 500);
  }
});

app.get('/campaigns', requirePermission(Permission.CAMPAIGN_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const status = c.req.query('status') as any;
    
    const campaigns = await emailCampaignService.getCampaigns(organizationId, status);
    
    return c.json({
      success: true,
      data: campaigns
    });
  } catch (error) {
    logger.error('Failed to get campaigns:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get campaigns'
    }, 500);
  }
});

app.get('/campaigns/:id', requirePermission(Permission.CAMPAIGN_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    
    const campaign = await emailCampaignService.getCampaign(organizationId, campaignId);
    
    if (!campaign) {
      return c.json({
        success: false,
        error: 'Campaign not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    logger.error('Failed to get campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get campaign'
    }, 500);
  }
});

app.put('/campaigns/:id', zValidator('json', updateCampaignSchema), requirePermission(Permission.CAMPAIGN_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    const updates = c.req.valid('json');
    
    // Note: emailCampaignService doesn't have an update method, this would need to be implemented
    // For now, return an error indicating the method is not implemented
    return c.json({
      success: false,
      error: 'Update method not implemented'
    }, 501);
  } catch (error) {
    logger.error('Failed to update campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update campaign'
    }, 500);
  }
});

app.post('/campaigns/:id/launch', zValidator('json', launchCampaignSchema), requirePermission(Permission.CAMPAIGN_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    const options = c.req.valid('json');
    
    const result = await emailCampaignService.launchCampaign(organizationId, campaignId, options);
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to launch campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to launch campaign'
    }, 500);
  }
});

app.post('/campaigns/:id/pause', requirePermission(Permission.CAMPAIGN_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    
    const success = await emailCampaignService.pauseCampaign(organizationId, campaignId);
    
    return c.json({
      success,
      message: success ? 'Campaign paused successfully' : 'Failed to pause campaign'
    });
  } catch (error) {
    logger.error('Failed to pause campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to pause campaign'
    }, 500);
  }
});

app.post('/campaigns/:id/cancel', requirePermission(Permission.CAMPAIGN_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    
    const success = await emailCampaignService.cancelCampaign(organizationId, campaignId);
    
    return c.json({
      success,
      message: success ? 'Campaign cancelled successfully' : 'Failed to cancel campaign'
    });
  } catch (error) {
    logger.error('Failed to cancel campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel campaign'
    }, 500);
  }
});

app.post('/campaigns/:id/duplicate', zValidator('json', z.object({
  newName: z.string().min(1)
})), requirePermission(Permission.CAMPAIGN_CREATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    const { newName } = c.req.valid('json');
    
    const duplicated = await emailCampaignService.duplicateCampaign(organizationId, campaignId, newName);
    
    if (!duplicated) {
      return c.json({
        success: false,
        error: 'Campaign not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: duplicated
    });
  } catch (error) {
    logger.error('Failed to duplicate campaign:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to duplicate campaign'
    }, 500);
  }
});

app.get('/campaigns/:id/analytics', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    
    const analytics = await emailCampaignService.getCampaignAnalytics(organizationId, campaignId);
    
    if (!analytics) {
      return c.json({
        success: false,
        error: 'Campaign not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    logger.error('Failed to get campaign analytics:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get campaign analytics'
    }, 500);
  }
});

app.get('/campaigns/:id/metrics', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const campaignId = c.req.param('id');
    
    const metrics = await emailCampaignService.getCampaignMetrics(organizationId, campaignId);
    
    if (!metrics) {
      return c.json({
        success: false,
        error: 'Campaign not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: metrics
    });
  } catch (error) {
    logger.error('Failed to get campaign metrics:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get campaign metrics'
    }, 500);
  }
});

// Template routes
app.post('/templates', zValidator('json', z.object({
  name: z.string().min(1),
  subject: z.string().min(1),
  htmlContent: z.string().min(1),
  textContent: z.string().optional(),
  variables: z.array(z.string()).optional(),
  category: z.string().optional(),
  metadata: z.record(z.any()).optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const templateData = c.req.valid('json');
    
    const template = await emailCampaignService.createTemplate(organizationId, templateData);
    
    return c.json({
      success: true,
      data: template
    });
  } catch (error) {
    logger.error('Failed to create template:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create template'
    }, 500);
  }
});

app.get('/templates', requirePermission(Permission.TEMPLATE_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    
    // Note: emailCampaignService doesn't have a getTemplates method, this would need to be implemented
    // For now, return an empty array
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get templates:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get templates'
    }, 500);
  }
});

app.get('/templates/:id', requirePermission(Permission.TEMPLATE_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const templateId = c.req.param('id');
    
    const template = await emailCampaignService.getTemplate(organizationId, templateId);
    
    if (!template) {
      return c.json({
        success: false,
        error: 'Template not found'
      }, 404);
    }
    
    return c.json({
      success: true,
      data: template
    });
  } catch (error) {
    logger.error('Failed to get template:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get template'
    }, 500);
  }
});

// Webhook tracking routes
app.post('/track-open', async (c) => {
  try {
    const { campaignId, contactId } = c.req.query();
    
    if (!campaignId || !contactId) {
      return c.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }
    
    await emailCampaignService.handleOpenTracking(campaignId as string, contactId as string);
    
    // Return 1x1 transparent pixel
    c.header('Content-Type', 'image/gif');
    c.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    return c.body(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
  } catch (error) {
    logger.error('Failed to track open:', error);
    return c.json({
      success: false,
      error: 'Failed to track open'
    }, 500);
  }
});

app.post('/track-click', async (c) => {
  try {
    const { campaignId, contactId, url } = c.req.query();
    
    if (!campaignId || !contactId || !url) {
      return c.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }
    
    await emailCampaignService.handleClickTracking(
      campaignId as string, 
      contactId as string, 
      url as string
    );
    
    return c.json({
      success: true,
      message: 'Click tracked successfully'
    });
  } catch (error) {
    logger.error('Failed to track click:', error);
    return c.json({
      success: false,
      error: 'Failed to track click'
    }, 500);
  }
});

app.post('/track-bounce', async (c) => {
  try {
    const { campaignId, contactId, reason } = c.req.query();
    
    if (!campaignId || !contactId) {
      return c.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }
    
    await emailCampaignService.handleBounce(
      campaignId as string, 
      contactId as string, 
      reason as string
    );
    
    return c.json({
      success: true,
      message: 'Bounce tracked successfully'
    });
  } catch (error) {
    logger.error('Failed to track bounce:', error);
    return c.json({
      success: false,
      error: 'Failed to track bounce'
    }, 500);
  }
});

app.post('/track-unsubscribe', async (c) => {
  try {
    const { campaignId, contactId } = c.req.query();
    
    if (!campaignId || !contactId) {
      return c.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }
    
    await emailCampaignService.handleUnsubscribe(campaignId as string, contactId as string);
    
    return c.json({
      success: true,
      message: 'Unsubscribe tracked successfully'
    });
  } catch (error) {
    logger.error('Failed to track unsubscribe:', error);
    return c.json({
      success: false,
      error: 'Failed to track unsubscribe'
    }, 500);
  }
});

app.post('/track-spam', async (c) => {
  try {
    const { campaignId, contactId } = c.req.query();
    
    if (!campaignId || !contactId) {
      return c.json({
        success: false,
        error: 'Missing required parameters'
      }, 400);
    }
    
    await emailCampaignService.handleSpamComplaint(campaignId as string, contactId as string);
    
    return c.json({
      success: true,
      message: 'Spam complaint tracked successfully'
    });
  } catch (error) {
    logger.error('Failed to track spam complaint:', error);
    return c.json({
      success: false,
      error: 'Failed to track spam complaint'
    }, 500);
  }
});

export default app;
