import { createTRPCRouter } from '../../create-context';
import { z } from 'zod';
import { notificationService } from '../../../services/notification-service';
import { requireAuth } from '../../../middleware/rbac-middleware';

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

export const notificationsRouter = createTRPCRouter({
  create: {
    input: createNotificationSchema,
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const notification = await notificationService.createNotification({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        ...input,
      });

      return notification;
    },
  },

  list: {
    input: getNotificationsSchema.optional(),
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const notifications = await notificationService.getUserNotifications(
        ctx.user.id,
        ctx.user.organizationId,
        input || {}
      );

      return notifications;
    },
  },

  markAsRead: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const result = await notificationService.markAsRead(
        input,
        ctx.user.id,
        ctx.user.organizationId
      );

      return result;
    },
  },

  markAllAsRead: {
    resolve: async ({ ctx }) => {
      requireAuth(ctx);
      
      const result = await notificationService.markAllAsRead(
        ctx.user.id,
        ctx.user.organizationId
      );

      return result;
    },
  },

  delete: {
    input: z.string().uuid(),
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const result = await notificationService.deleteNotification(
        input,
        ctx.user.id,
        ctx.user.organizationId
      );

      return result;
    },
  },

  sendEmail: {
    input: sendEmailSchema,
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const result = await notificationService.sendEmailNotification({
        ...input,
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
      });

      return result;
    },
  },

  sendPush: {
    input: sendPushSchema,
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const result = await notificationService.sendPushNotification({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        ...input,
      });

      return result;
    },
  },

  sendSMS: {
    input: sendSMSSchema,
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const result = await notificationService.sendSMSNotification({
        ...input,
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
      });

      return result;
    },
  },

  getStats: {
    resolve: async ({ ctx }) => {
      requireAuth(ctx);
      
      const stats = await notificationService.getNotificationStats(
        ctx.user.id,
        ctx.user.organizationId
      );

      return stats;
    },
  },

  batchCreate: {
    input: z.array(createNotificationSchema),
    resolve: async ({ ctx, input }) => {
      requireAuth(ctx);
      
      const notifications = input.map(notification => ({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        ...notification,
      }));

      const result = await notificationService.batchCreateNotifications(notifications);

      return result;
    },
  },
});
