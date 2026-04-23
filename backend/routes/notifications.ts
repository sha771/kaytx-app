import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { notificationService } from '../services/notification-service';
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
const createNotificationSchema = z.object({
  userId: z.string().optional(),
  type: z.enum(['info', 'success', 'warning', 'error', 'system']),
  category: z.enum(['general', 'campaign', 'lead', 'ai_agent', 'platform', 'payment', 'security']),
  title: z.string().min(1),
  message: z.string().min(1),
  data: z.record(z.any()).optional(),
  channels: z.array(z.object({
    type: z.enum(['email', 'sms', 'push', 'in_app', 'webhook']),
    address: z.string().optional(),
    config: z.record(z.any()).optional()
  })),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  scheduledAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  metadata: z.record(z.any()).optional()
});

const createTemplateSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['info', 'success', 'warning', 'error', 'system']),
  category: z.enum(['general', 'campaign', 'lead', 'ai_agent', 'platform', 'payment', 'security']),
  subject: z.string().optional(),
  content: z.string().min(1),
  variables: z.array(z.string()).optional(),
  channels: z.array(z.enum(['email', 'sms', 'push', 'in_app', 'webhook'])),
  defaultPriority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  metadata: z.record(z.any()).optional()
});

const updatePreferencesSchema = z.object({
  category: z.enum(['general', 'campaign', 'lead', 'ai_agent', 'platform', 'payment', 'security']),
  enabled: z.boolean(),
  channels: z.array(z.enum(['email', 'sms', 'push', 'in_app', 'webhook'])),
  quietHours: z.object({
    start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // HH:MM format
    end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    timezone: z.string()
  }).optional(),
  frequency: z.enum(['immediate', 'hourly', 'daily', 'weekly']),
  metadata: z.record(z.any()).optional()
});

const sendFromTemplateSchema = z.object({
  templateId: z.string().min(1),
  variables: z.record(z.any()),
  recipients: z.array(z.object({
    userId: z.string().optional(),
    channels: z.array(z.object({
      type: z.enum(['email', 'sms', 'push', 'in_app', 'webhook']),
      address: z.string().optional(),
      config: z.record(z.any()).optional()
    })),
    scheduledAt: z.string().datetime().optional()
  }))
});

// Routes
app.post('/notifications', zValidator('json', createNotificationSchema), requirePermission(Permission.NOTIFICATION_CREATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const notificationData = c.req.valid('json');
    
    const notification = await notificationService.createNotification(organizationId, notificationData);
    
    return c.json({
      success: true,
      data: notification
    });
  } catch (error) {
    logger.error('Failed to create notification:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create notification'
    }, 500);
  }
});

app.get('/notifications', requirePermission(Permission.NOTIFICATION_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const userId = c.get('userId');
    const filters = {
      type: c.req.query('type') as any,
      category: c.req.query('category') as any,
      status: c.req.query('status') as any,
      limit: c.req.query('limit') ? Number(c.req.query('limit')) : undefined,
      offset: c.req.query('offset') ? Number(c.req.query('offset')) : undefined
    };
    
    const result = await notificationService.getNotifications(organizationId, userId, filters);
    
    return c.json({
      success: true,
      data: result
    });
  } catch (error) {
    logger.error('Failed to get notifications:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get notifications'
    }, 500);
  }
});

app.get('/notifications/:id', requirePermission(Permission.NOTIFICATION_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const notificationId = c.req.param('id');
    const userId = c.get('userId');
    
    // Note: notificationService doesn't have a getNotification method
    // This would need to be implemented
    return c.json({
      success: false,
      error: 'Get notification method not implemented'
    }, 501);
  } catch (error) {
    logger.error('Failed to get notification:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get notification'
    }, 500);
  }
});

app.post('/notifications/:id/read', requirePermission(Permission.NOTIFICATION_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const notificationId = c.req.param('id');
    const userId = c.get('userId');
    
    const success = await notificationService.markAsRead(organizationId, notificationId, userId);
    
    return c.json({
      success,
      message: success ? 'Notification marked as read' : 'Failed to mark notification as read'
    });
  } catch (error) {
    logger.error('Failed to mark notification as read:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark notification as read'
    }, 500);
  }
});

// Template routes
app.post('/templates', zValidator('json', createTemplateSchema), requirePermission(Permission.TEMPLATE_CREATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const templateData = c.req.valid('json');
    
    const template = await notificationService.createTemplate(organizationId, templateData);
    
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
    
    // Note: notificationService doesn't have a getTemplates method
    // This would need to be implemented
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
    
    // Note: notificationService doesn't have a getTemplate method
    // This would need to be implemented
    return c.json({
      success: false,
      error: 'Get template method not implemented'
    }, 501);
  } catch (error) {
    logger.error('Failed to get template:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get template'
    }, 500);
  }
});

app.post('/templates/send', zValidator('json', sendFromTemplateSchema), requirePermission(Permission.NOTIFICATION_CREATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const { templateId, variables, recipients } = c.req.valid('json');
    
    const notifications = await notificationService.sendFromTemplate(
      organizationId,
      templateId,
      variables,
      recipients
    );
    
    return c.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    logger.error('Failed to send from template:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send from template'
    }, 500);
  }
});

// Preferences routes
app.get('/preferences', requirePermission(Permission.SETTINGS_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const userId = c.get('userId');
    
    // Note: notificationService doesn't have a getPreferences method
    // This would need to be implemented
    return c.json({
      success: true,
      data: []
    });
  } catch (error) {
    logger.error('Failed to get preferences:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get preferences'
    }, 500);
  }
});

app.put('/preferences', zValidator('json', z.object({
  preferences: z.array(updatePreferencesSchema)
})), requirePermission(Permission.SETTINGS_UPDATE), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const userId = c.get('userId');
    const { preferences } = c.req.valid('json');
    
    const success = await notificationService.updatePreferences(organizationId, userId, preferences);
    
    return c.json({
      success,
      message: success ? 'Preferences updated successfully' : 'Failed to update preferences'
    });
  } catch (error) {
    logger.error('Failed to update preferences:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update preferences'
    }, 500);
  }
});

// Analytics routes
app.get('/stats', requirePermission(Permission.ANALYTICS_READ), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    
    const stats = await notificationService.getNotificationStats(organizationId);
    
    return c.json({
      success: true,
      data: stats
    });
  } catch (error) {
    logger.error('Failed to get notification stats:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get notification stats'
    }, 500);
  }
});

// Channel-specific routes
app.post('/send-email', zValidator('json', z.object({
  to: z.union([z.string(), z.array(z.string())]),
  subject: z.string().min(1),
  content: z.string().min(1),
  fromEmail: z.string().email().optional(),
  fromName: z.string().optional(),
  templateId: z.string().optional(),
  variables: z.record(z.any()).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  metadata: z.record(z.any()).optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const emailData = c.req.valid('json');
    
    const notification = await notificationService.createNotification(organizationId, {
      type: 'info',
      category: 'general',
      title: emailData.subject,
      message: emailData.content,
      channels: [{
        type: 'email',
        address: Array.isArray(emailData.to) ? emailData.to.join(',') : emailData.to,
        config: {
          subject: emailData.subject,
          fromEmail: emailData.fromEmail,
          fromName: emailData.fromName,
          templateId: emailData.templateId,
          variables: emailData.variables
        }
      }],
      priority: emailData.priority || 'medium',
      metadata: {
        ...emailData.metadata,
        templateId: emailData.templateId,
        variables: emailData.variables
      }
    });
    
    return c.json({
      success: true,
      data: notification
    });
  } catch (error) {
    logger.error('Failed to send email notification:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email notification'
    }, 500);
  }
});

app.post('/send-sms', zValidator('json', z.object({
  to: z.union([z.string(), z.array(z.string())]),
  message: z.string().min(1),
  templateId: z.string().optional(),
  variables: z.record(z.any()).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  metadata: z.record(z.any()).optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const smsData = c.req.valid('json');
    
    const notification = await notificationService.createNotification(organizationId, {
      type: 'info',
      category: 'general',
      title: 'SMS Notification',
      message: smsData.message,
      channels: [{
        type: 'sms',
        address: Array.isArray(smsData.to) ? smsData.to.join(',') : smsData.to,
        config: {
          templateId: smsData.templateId,
          variables: smsData.variables
        }
      }],
      priority: smsData.priority || 'medium',
      metadata: {
        ...smsData.metadata,
        templateId: smsData.templateId,
        variables: smsData.variables
      }
    });
    
    return c.json({
      success: true,
      data: notification
    });
  } catch (error) {
    logger.error('Failed to send SMS notification:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send SMS notification'
    }, 500);
  }
});

app.post('/send-push', zValidator('json', z.object({
  userId: z.string().optional(),
  title: z.string().min(1),
  message: z.string().min(1),
  data: z.record(z.any()).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  metadata: z.record(z.any()).optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const pushData = c.req.valid('json');
    
    const notification = await notificationService.createNotification(organizationId, {
      userId: pushData.userId,
      type: 'info',
      category: 'general',
      title: pushData.title,
      message: pushData.message,
      data: pushData.data,
      channels: [{
        type: 'push',
        config: {
          userId: pushData.userId,
          title: pushData.title,
          message: pushData.message,
          data: pushData.data
        }
      }],
      priority: pushData.priority || 'medium',
      metadata: {
        ...pushData.metadata,
        data: pushData.data
      }
    });
    
    return c.json({
      success: true,
      data: notification
    });
  } catch (error) {
    logger.error('Failed to send push notification:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send push notification'
    }, 500);
  }
});

app.post('/send-webhook', zValidator('json', z.object({
  url: z.string().url(),
  data: z.record(z.any()),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE']).default('POST'),
  headers: z.record(z.string()).optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  metadata: z.record(z.any()).optional()
})), async (c) => {
  try {
    const organizationId = c.get('organizationId');
    const webhookData = c.req.valid('json');
    
    const notification = await notificationService.createNotification(organizationId, {
      type: 'info',
      category: 'general',
      title: 'Webhook Notification',
      message: `Webhook call to ${webhookData.url}`,
      data: webhookData.data,
      channels: [{
        type: 'webhook',
        address: webhookData.url,
        config: {
          method: webhookData.method,
          headers: webhookData.headers,
          data: webhookData.data
        }
      }],
      priority: webhookData.priority || 'medium',
      metadata: {
        ...webhookData.metadata,
        url: webhookData.url,
        method: webhookData.method,
        headers: webhookData.headers
      }
    });
    
    return c.json({
      success: true,
      data: notification
    });
  } catch (error) {
    logger.error('Failed to send webhook notification:', error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send webhook notification'
    }, 500);
  }
});

export default app;
