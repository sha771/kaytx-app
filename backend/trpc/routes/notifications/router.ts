import { createLegacyRouter, type Context } from '../../create-context';
import { z } from 'zod';
import { notificationService } from '../../../services/notification-service';
import { requireAuth } from '../../../middleware/rbac-middleware';

function assertAuth(ctx: any): { user: NonNullable<Context['user']> } & Context {
  if (!ctx.user) throw new Error('Unauthorized');
  return ctx as { user: NonNullable<Context['user']> } & Context;
}

const createNotificationSchema = z.object({
  type: z.enum(['info', 'success', 'warning', 'error', 'alert']),
  title: z.string().min(1),
  message: z.string().min(1),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  channels: z.array(z.enum(['in_app', 'email', 'push', 'sms'])).optional(),
  data: z.record(z.any()).optional(),
});

const getNotificationsSchema = z.object({
  isRead: z.boolean().optional(),
  type: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
});

const sendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  html: z.string().min(1),
  text: z.string().optional(),
});

const sendPushSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  data: z.record(z.any()).optional(),
});

const sendSMSSchema = z.object({
  to: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  message: z.string().min(1),
});

export const notificationsRouter = createLegacyRouter({
  create: {
    input: createNotificationSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const notification = await notificationService.createNotification({
        userId: auth.user.id,
        organizationId: auth.user.organizationId,
        ...input,
      });

      return notification;
    },
  },

  list: {
    input: getNotificationsSchema.optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const notifications = await notificationService.getUserNotifications(
        auth.user.id,
        auth.user.organizationId,
        input || {}
      );

      return notifications;
    },
  },

  markAsRead: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await notificationService.markAsRead(
        input,
        auth.user.id,
        auth.user.organizationId
      );

      return result;
    },
  },

  markAllAsRead: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const result = await notificationService.markAllAsRead(
        auth.user.id,
        auth.user.organizationId
      );

      return result;
    },
  },

  delete: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await notificationService.deleteNotification(
        input,
        auth.user.id,
        auth.user.organizationId
      );

      return result;
    },
  },

  sendEmail: {
    input: sendEmailSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await notificationService.sendEmailNotification({
        ...input,
        userId: auth.user.id,
        organizationId: auth.user.organizationId,
      });

      return result;
    },
  },

  sendPush: {
    input: sendPushSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await notificationService.sendPushNotification({
        userId: auth.user.id,
        organizationId: auth.user.organizationId,
        ...input,
      });

      return result;
    },
  },

  sendSMS: {
    input: sendSMSSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await notificationService.sendSMSNotification({
        ...input,
        userId: auth.user.id,
        organizationId: auth.user.organizationId,
      });

      return result;
    },
  },

  getStats: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const stats = await notificationService.getNotificationStats(
        auth.user.id,
        auth.user.organizationId
      );

      return stats;
    },
  },

  batchCreate: {
    input: z.array(createNotificationSchema),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const notifications = input.map(notification => ({
        userId: auth.user.id,
        organizationId: auth.user.organizationId,
        ...notification,
      }));

      const result = await notificationService.batchCreateNotifications(notifications);

      return result;
    },
  },
});
