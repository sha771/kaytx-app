import { protectedProcedure } from '../../../create-context';
import { z } from 'zod';

const mockWebhooks = [
  {
    id: '1',
    name: 'User Events Webhook',
    url: 'https://api.example.com/webhooks/users',
    events: ['user.created', 'user.updated', 'user.deleted'],
    secret: 'whsec_1234567890abcdef',
    status: 'active',
    headers: {
      'X-Custom-Header': 'value',
    },
    retryAttempts: 3,
    lastTriggeredAt: new Date(Date.now() - 1800000).toISOString(),
    failureCount: 0,
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: '2',
    name: 'Payment Events Webhook',
    url: 'https://api.example.com/webhooks/payments',
    events: ['payment.succeeded', 'payment.failed'],
    secret: 'whsec_fedcba0987654321',
    status: 'active',
    headers: {},
    retryAttempts: 3,
    lastTriggeredAt: new Date(Date.now() - 3600000).toISOString(),
    failureCount: 2,
    createdAt: new Date('2024-03-15').toISOString(),
  },
];

export const getWebhooksProcedure = protectedProcedure.query(async ({ ctx }) => {
  console.log('[Enterprise] Getting webhooks for user:', ctx.user.id);
  return mockWebhooks;
});

export const createWebhookProcedure = protectedProcedure
  .input(
    z.object({
      name: z.string(),
      url: z.string().url(),
      events: z.array(z.string()),
      headers: z.record(z.string(), z.string()).optional().default({}),
      retryAttempts: z.number().optional().default(3),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Creating webhook:', input.name);

    const newWebhook = {
      id: Math.random().toString(36).substring(2, 11),
      name: input.name,
      url: input.url,
      events: input.events,
      secret: `whsec_${Math.random().toString(36).substring(2, 22)}`,
      status: 'active',
      headers: input.headers,
      retryAttempts: input.retryAttempts,
      lastTriggeredAt: null,
      failureCount: 0,
      createdAt: new Date().toISOString(),
    };

    return newWebhook;
  });

export const updateWebhookProcedure = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      url: z.string().url().optional(),
      events: z.array(z.string()).optional(),
      headers: z.record(z.string(), z.string()).optional(),
      status: z.enum(['active', 'inactive']).optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Updating webhook:', input.id);

    const webhook = mockWebhooks.find((w) => w.id === input.id);

    return {
      ...webhook,
      ...input,
      updatedAt: new Date().toISOString(),
    };
  });

export const deleteWebhookProcedure = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Deleting webhook:', input.id);

    return {
      success: true,
      message: 'Webhook deleted successfully',
    };
  });

export const testWebhookProcedure = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Testing webhook:', input.id);

    return {
      success: true,
      statusCode: 200,
      responseTime: 145,
      message: 'Webhook test successful',
    };
  });
