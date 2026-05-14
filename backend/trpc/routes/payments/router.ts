import { createLegacyRouter, type Context } from '../../create-context';
import { z } from 'zod';
import { paymentService } from '../../../services/payment-service';
import { requireAuth, requirePermission } from '../../../middleware/rbac-middleware';
import { Permission } from '../../../lib/rbac';

function assertAuth(ctx: any): { user: NonNullable<Context['user']> } & Context {
  if (!ctx.user) throw new Error('Unauthorized');
  return ctx as { user: NonNullable<Context['user']> } & Context;
}

const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3).optional(),
  paymentMethodId: z.string().optional(),
  invoiceId: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  confirmImmediately: z.boolean().optional(),
});

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string(),
});

const createPaymentMethodSchema = z.object({
  paymentMethodId: z.string(),
  isDefault: z.boolean().optional(),
});

const createRefundSchema = z.object({
  paymentId: z.string(),
  amount: z.number().positive(),
  reason: z.string().min(1),
  metadata: z.record(z.any()).optional(),
});

const getPaymentsSchema = z.object({
  status: z.enum(['pending', 'processing', 'succeeded', 'failed', 'canceled']).optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export const paymentsRouter = createLegacyRouter({
  createIntent: {
    input: createPaymentIntentSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const paymentIntent = await paymentService.createPaymentIntent(
        auth.user.organizationId,
        input
      );

      return paymentIntent;
    },
  },

  confirmPayment: {
    input: confirmPaymentSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const payment = await paymentService.confirmPayment(
        input.paymentIntentId,
        auth.user.organizationId
      );

      return payment;
    },
  },

  createPaymentMethod: {
    input: createPaymentMethodSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const paymentMethod = await paymentService.createPaymentMethod(
        auth.user.organizationId,
        input
      );

      return paymentMethod;
    },
  },

  getPaymentMethods: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      
      const paymentMethods = await paymentService.getPaymentMethods(
        auth.user.organizationId
      );

      return paymentMethods;
    },
  },

  deletePaymentMethod: {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await paymentService.deletePaymentMethod(
        input,
        auth.user.organizationId
      );

      return result;
    },
  },

  setDefaultPaymentMethod: {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const result = await paymentService.setDefaultPaymentMethod(
        input,
        auth.user.organizationId
      );

      return result;
    },
  },

  getPayments: {
    input: getPaymentsSchema.optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const payments = await paymentService.getPayments(
        auth.user.organizationId,
        input || {}
      );

      return payments;
    },
  },

  getPayment: {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const payment = await paymentService.getPayment(
        input,
        auth.user.organizationId
      );

      return payment;
    },
  },

  createRefund: {
    input: createRefundSchema,
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_PAYMENTS);
      
      const refund = await paymentService.createRefund(
        auth.user.organizationId,
        input
      );

      return refund;
    },
  },

  getRefunds: {
    input: z.object({
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
    }).optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_PAYMENTS);
      
      const refunds = await paymentService.getRefunds(
        auth.user.organizationId,
        input || {}
      );

      return refunds;
    },
  },

  getPaymentStats: {
    resolve: async ({ ctx }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.VIEW_ANALYTICS);
      
      const stats = await paymentService.getPaymentStats(
        auth.user.organizationId
      );

      return stats;
    },
  },

  getInvoices: {
    input: z.object({
      status: z.enum(['draft', 'open', 'paid', 'void', 'uncollectible']).optional(),
      limit: z.number().min(1).max(100).optional(),
      offset: z.number().min(0).optional(),
    }).optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const invoices = await paymentService.getInvoices(
        auth.user.organizationId,
        input || {}
      );

      return invoices;
    },
  },

  getInvoice: {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const invoice = await paymentService.getInvoice(
        input,
        auth.user.organizationId
      );

      return invoice;
    },
  },

  createInvoice: {
    input: z.object({
      customerId: z.string(),
      amount: z.number().positive(),
      currency: z.string().length(3).optional(),
      description: z.string().optional(),
      dueDate: z.date().optional(),
      metadata: z.record(z.any()).optional(),
    }),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_PAYMENTS);
      
      const invoice = await paymentService.createInvoice(
        auth.user.organizationId,
        input
      );

      return invoice;
    },
  },

  updateInvoice: {
    input: z.object({
      invoiceId: z.string(),
      updates: z.object({
        description: z.string().optional(),
        dueDate: z.date().optional(),
        metadata: z.record(z.any()).optional(),
      }),
    }),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      requirePermission(ctx, Permission.MANAGE_PAYMENTS);
      
      const invoice = await paymentService.updateInvoice(
        auth.user.organizationId,
        input.invoiceId,
        input.updates
      );

      return invoice;
    },
  },

  getCustomerBalance: {
    input: z.string().optional(),
    resolve: async ({ ctx, input }) => {
      const auth = assertAuth(ctx);
      
      const balance = await paymentService.getCustomerBalance(
        auth.user.organizationId,
        input
      );

      return balance;
    },
  },

  handleWebhook: {
    input: z.any(), // Stripe webhook event
    resolve: async ({ ctx, input }) => {
      // This endpoint is typically called by Stripe, not by authenticated users
      // So we might need special handling here
      
      await paymentService.handleWebhook(input);

      return { received: true };
    },
  },
});
