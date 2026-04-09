import { db as pgDb } from '../db/connection';
import { payments, subscriptions, invoices } from '../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

// Lazy load Stripe to avoid import errors when not installed
let Stripe: any;
try {
  Stripe = require('stripe');
} catch (e) {
  // Stripe not available, will be mocked in tests
}

export interface PaymentIntent {
  id: string;
  organizationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  paymentMethodId?: string;
  invoiceId?: string;
  description?: string;
  metadata: Record<string, any>;
  clientSecret?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  organizationId: string;
  type: 'card' | 'bank_account';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  stripePaymentMethodId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface Refund {
  id: string;
  organizationId: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'succeeded' | 'failed';
  metadata: Record<string, any>;
  createdAt: Date;
}

export class PaymentService {
  private stripe: any;

  constructor() {
    // Allow constructor to work in tests without env var
    if (process.env.STRIPE_SECRET_KEY && Stripe) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20'
      });
    }
  }

  async createPaymentIntent(organizationId: string, params: {
    amount: number;
    currency?: string;
    paymentMethodId?: string;
    invoiceId?: string;
    description?: string;
    metadata?: Record<string, any>;
    confirmImmediately?: boolean;
  }): Promise<PaymentIntent> {
    const id = crypto.randomUUID();
    const now = new Date();

    try {
      const stripeParams: any = {
        amount: Math.round(params.amount * 100), // Convert to cents
        currency: params.currency || 'usd',
        description: params.description,
        metadata: {
          organizationId,
          invoiceId: params.invoiceId,
          ...params.metadata
        },
        automatic_payment_methods: {
          enabled: true
        }
      };

      if (params.paymentMethodId) {
        stripeParams.payment_method = params.paymentMethodId;
        stripeParams.confirm = params.confirmImmediately || false;
      }

      const stripeIntent = await this.stripe.paymentIntents.create(stripeParams);

      const paymentIntent: PaymentIntent = {
        id,
        organizationId,
        amount: params.amount,
        currency: params.currency || 'USD',
        status: this.mapStripeStatus(stripeIntent.status),
        paymentMethodId: params.paymentMethodId,
        invoiceId: params.invoiceId,
        description: params.description,
        metadata: stripeIntent.metadata || {},
        clientSecret: stripeIntent.client_secret,
        createdAt: now,
        updatedAt: now
      };

      // Store in database
      await pgDb.insert(payments).values({
        id: paymentIntent.id,
        organizationId: paymentIntent.organizationId,
        amount: paymentIntent.amount.toString(),
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentMethodId: paymentIntent.paymentMethodId,
        invoiceId: paymentIntent.invoiceId,
        description: paymentIntent.description,
        metadata: paymentIntent.metadata,
        clientSecret: paymentIntent.clientSecret,
        createdAt: paymentIntent.createdAt,
        updatedAt: paymentIntent.updatedAt
      } as any);

      return paymentIntent;
    } catch (error) {
      logger.error('[PaymentService] Failed to create payment intent:', error);
      throw new Error(`Payment intent creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async confirmPayment(paymentIntentId: string, organizationId: string): Promise<PaymentIntent> {
    try {
      // Get payment from database
      const [payment] = await pgDb
        .select()
        .from(payments)
        .where(and(
          eq(payments.id, paymentIntentId),
          eq(payments.organizationId, organizationId)
        ))
        .limit(1);

      if (!payment) {
        throw new Error('Payment not found');
      }

      const stripePaymentId = payment.transactionId;
      if (!stripePaymentId) {
        throw new Error('Stripe payment ID not found');
      }

      // Confirm with Stripe
      const confirmedIntent = await this.stripe.paymentIntents.confirm(stripePaymentId);

      // Update database
      await pgDb
        .update(payments)
        .set({
          status: this.mapStripeStatus(confirmedIntent.status),
          gatewayResponse: confirmedIntent,
          processedAt: new Date(),
          updatedAt: new Date()
        } as any)
        .where(eq(payments.id, paymentIntentId));

      return {
        id: payment.id,
        organizationId: payment.organizationId,
        amount: parseFloat(payment.amount.toString()),
        currency: payment.currency,
        status: this.mapStripeStatus(confirmedIntent.status),
        paymentMethodId: undefined,
        invoiceId: payment.invoiceId,
        description: undefined,
        metadata: (payment.metadata as any) || {},
        createdAt: payment.createdAt,
        updatedAt: new Date()
      };

    } catch (error) {
      if (error instanceof Error && error.message === 'Payment not found') {
        throw error;
      }
      logger.error('Failed to confirm payment:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  async createPaymentMethod(organizationId: string, params: {
    paymentMethodId: string;
    isDefault?: boolean;
  }): Promise<PaymentMethod> {
    const id = crypto.randomUUID();
    const now = new Date();

    try {
      const stripePaymentMethod = await this.stripe.paymentMethods.retrieve(params.paymentMethodId);

      const paymentMethod: PaymentMethod = {
        id,
        organizationId,
        type: stripePaymentMethod.type as PaymentMethod['type'],
        brand: (stripePaymentMethod.card as any)?.brand,
        last4: (stripePaymentMethod.card as any)?.last4,
        expiryMonth: (stripePaymentMethod.card as any)?.exp_month,
        expiryYear: (stripePaymentMethod.card as any)?.exp_year,
        isDefault: params.isDefault || false,
        stripePaymentMethodId: params.paymentMethodId,
        metadata: {},
        createdAt: now
      };

      // Store encrypted payment method details
      await pgDb.insert(payments).values({
        id: paymentMethod.id,
        organizationId: paymentMethod.organizationId,
        amount: '0',
        currency: 'USD',
        method: 'payment_method_setup',
        transactionId: params.paymentMethodId,
        status: 'succeeded',
        paymentMethodDetailsEncrypted: {
          type: paymentMethod.type,
          brand: paymentMethod.brand,
          last4: paymentMethod.last4,
          expiryMonth: paymentMethod.expiryMonth,
          expiryYear: paymentMethod.expiryYear
        },
        metadata: {
          isDefault: paymentMethod.isDefault
        },
        createdAt: paymentMethod.createdAt
      } as any);

      return paymentMethod;

    } catch (error) {
      logger.error('Failed to create payment method:', error);
      throw new Error('Failed to create payment method');
    }
  }

  async getPaymentMethods(organizationId: string): Promise<PaymentMethod[]> {
    const results = await pgDb
      .select()
      .from(payments)
      .where(and(
        eq(payments.organizationId, organizationId),
        eq(payments.method, 'payment_method_setup'),
        eq(payments.status, 'succeeded')
      ))
      .orderBy(payments.createdAt);

    return results.map(payment => {
      const details = payment.paymentMethodDetailsEncrypted as any;
      return {
        id: payment.id,
        organizationId: payment.organizationId,
        type: details?.type || 'card',
        brand: details?.brand,
        last4: details?.last4,
        expiryMonth: details?.expiryMonth,
        expiryYear: details?.expiryYear,
        isDefault: (payment.metadata as any)?.isDefault || false,
        stripePaymentMethodId: payment.transactionId || '',
        metadata: (payment.metadata as any) || {},
        createdAt: payment.createdAt
      };
    });
  }

  async createRefund(organizationId: string, params: {
    paymentId: string;
    amount?: number;
    reason: string;
  }): Promise<Refund> {
    const id = crypto.randomUUID();
    const now = new Date();

    try {
      // Get original payment
      const [payment] = await pgDb
        .select()
        .from(payments)
        .where(and(
          eq(payments.id, params.paymentId),
          eq(payments.organizationId, organizationId)
        ))
        .limit(1);

      if (!payment) {
        throw new Error('Payment not found');
      }

      const stripePaymentId = payment.transactionId;
      if (!stripePaymentId) {
        throw new Error('Stripe payment ID not found');
      }

      // Create refund in Stripe
      const refundAmount = params.amount ? Math.round(params.amount * 100) : Math.round(parseFloat(payment.amount.toString()) * 100);
      const stripeRefund = await this.stripe.refunds.create({
        payment_intent: stripePaymentId,
        amount: refundAmount,
        reason: params.reason as Stripe.RefundCreateParams.Reason
      });

      const refund: Refund = {
        id,
        organizationId,
        paymentId: params.paymentId,
        amount: refundAmount / 100, // Convert back from cents
        reason: params.reason,
        status: stripeRefund.status === 'succeeded' ? 'succeeded' : 'pending',
        metadata: {
          stripeRefundId: stripeRefund.id
        },
        createdAt: now
      };

      // Store refund record
      await pgDb.insert(payments).values({
        id: refund.id,
        organizationId: refund.organizationId,
        invoiceId: payment.invoiceId,
        amount: refund.amount.toString(),
        currency: payment.currency,
        method: 'refund',
        transactionId: stripeRefund.id,
        status: refund.status,
        gatewayResponse: stripeRefund,
        metadata: refund.metadata,
        createdAt: refund.createdAt
      } as any);

      return refund;

    } catch (error) {
      logger.error('Failed to create refund:', error);
      throw new Error('Failed to create refund');
    }
  }

  async getPaymentHistory(organizationId: string, options: {
    limit?: number;
    offset?: number;
    status?: string;
  } = {}): Promise<{ payments: PaymentIntent[]; total: number }> {
    const conditions = [eq(payments.organizationId, organizationId)];

    if (options.status) {
      conditions.push(eq(payments.status, options.status));
    }

    const baseQuery = pgDb
      .select()
      .from(payments)
      .where(and(...conditions));

    // Get total count
    const totalResults = await baseQuery;
    const total = totalResults.length;

    // Apply pagination and ordering
    let query = pgDb
      .select()
      .from(payments)
      .where(and(...conditions))
      .orderBy(payments.createdAt);
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.offset(options.offset);
    }

    const results = await query;

    const payments = results.map(payment => ({
      id: payment.id,
      organizationId: payment.organizationId,
      amount: parseFloat(payment.amount.toString()),
      currency: payment.currency,
      status: payment.status as PaymentIntent['status'],
      paymentMethodId: undefined,
      invoiceId: payment.invoiceId,
      description: undefined,
      metadata: (payment.metadata as any) || {},
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt
    }));

    return { payments, total };
  }

  async getPaymentStats(organizationId: string): Promise<{
    totalRevenue: number;
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    refundAmount: number;
  }> {
    const results = await pgDb
      .select()
      .from(payments)
      .where(eq(payments.organizationId, organizationId));

    let totalRevenue = 0;
    let totalPayments = 0;
    let successfulPayments = 0;
    let failedPayments = 0;
    let refundAmount = 0;

    results.forEach(payment => {
      const amount = parseFloat(payment.amount?.toString() || '0');
      
      if (payment.method === 'refund') {
        refundAmount += amount;
      } else {
        totalPayments++;
        if (payment.status === 'succeeded') {
          totalRevenue += amount;
          successfulPayments++;
        } else if (payment.status === 'failed') {
          failedPayments++;
        }
      }
    });

    return {
      totalRevenue: totalRevenue,
      totalPayments,
      successfulPayments,
      failedPayments,
      refundAmount
    };
  }

  private mapStripeStatus(stripeStatus: string): PaymentIntent['status'] {
    switch (stripeStatus) {
      case 'requires_payment_method':
      case 'requires_confirmation':
      case 'requires_action':
        return 'pending';
      case 'processing':
        return 'processing';
      case 'succeeded':
        return 'succeeded';
      case 'canceled':
        return 'canceled';
      default:
        return 'failed';
    }
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case 'payment_intent.canceled':
        await this.handlePaymentCanceled(event.data.object as Stripe.PaymentIntent);
        break;
      default:
        logger.info(`Unhandled webhook event type: ${event.type}`);
    }
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const organizationId = paymentIntent.metadata.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(payments)
      .set({
        status: 'succeeded',
        processedAt: new Date()
      })
      .where(and(
        eq(payments.transactionId, paymentIntent.id),
        eq(payments.organizationId, organizationId)
      ));
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const organizationId = paymentIntent.metadata.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(payments)
      .set({
        status: 'failed'
      })
      .where(and(
        eq(payments.transactionId, paymentIntent.id),
        eq(payments.organizationId, organizationId)
      ));
  }

  private async handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const organizationId = paymentIntent.metadata.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(payments)
      .set({
        status: 'canceled'
      })
      .where(and(
        eq(payments.transactionId, paymentIntent.id),
        eq(payments.organizationId, organizationId)
      ));
  }
}

export const paymentService = new PaymentService();
