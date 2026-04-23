/**
 * Unified Stripe Webhook Handler
 * Comprehensive Stripe webhook processing with enhanced security and event handling
 */

 
import { Hono } from 'hono';
import { z } from 'zod';
import { stripeService } from '../services/stripe-service';
import { paymentWebhookService } from '../services/payment-webhook-service';
import { invoiceGenerationService } from '../services/invoice-generation-service';
import { db } from '../db/connection';
import { invoices, subscriptions, organizations, users } from '../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import { logAudit, AuditActions } from '../lib/audit';
import { verifyWebhookSignature } from '../lib/constant-time-comparison';
import { ProductionLogger, LogLevel } from '../lib/production-logger';

const app = new Hono();
const logger = new ProductionLogger('UnifiedStripeWebhook');

// Webhook idempotency tracking to prevent race conditions
const processedEvents = new Map<string, { processedAt: number; status: string }>();

// Cleanup processed events every hour to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const hourAgo = now - (60 * 60 * 1000);
  for (const [eventId, data] of processedEvents.entries()) {
    if (data.processedAt < hourAgo) {
      processedEvents.delete(eventId);
    }
  }
}, 60 * 60 * 1000);

/**
 * Check if webhook event has already been processed
 */
function isEventProcessed(eventId: string): boolean {
  const existing = processedEvents.get(eventId);
  if (!existing) return false;
  
  // Consider events processed within last 5 minutes as duplicate
  const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
  if (existing.processedAt < fiveMinutesAgo) {
    processedEvents.delete(eventId);
    return false;
  }
  
  return true;
}

/**
 * Mark webhook event as processed
 */
function markEventProcessed(eventId: string, status: string): void {
  processedEvents.set(eventId, {
    processedAt: Date.now(),
    status
  });
}

// Enhanced webhook signature verification
function verifyStripeWebhook(payload: string, signature: string): boolean {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    logger.warn('STRIPE_WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    const crypto = require('crypto');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    const sigHeaderArray = signature.split(',');
    
    for (const sigHeader of sigHeaderArray) {
      const [key, value] = sigHeader.trim().split('=');
      if (key === 't') {
        const timestamp = value;
        // Validate timestamp to prevent replay attacks (5 minute tolerance)
        const eventTime = parseInt(timestamp, 10);
        const now = Math.floor(Date.now() / 1000);
        if (Math.abs(now - eventTime) > 300) {
          logger.warn('Webhook timestamp too old, possible replay attack');
          return false;
        }
        
        const signedPayload = `${timestamp}.${payload}`;
        const expectedSignature = crypto
          .createHmac('sha256', webhookSecret)
          .update(signedPayload, 'utf8')
          .digest('hex');
        
        for (const sig of sigHeaderArray) {
          const [k, v] = sig.trim().split('=');
          if (k === 'v1' && v === expectedSignature) {
            return true;
          }
        }
      }
    }
    return false;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Signature verification error:', error);
    return false;
  }
}

/**
 * Validate webhook payload for security and data integrity
 */
function validateWebhookPayload(payload: any): { valid: boolean; error?: string } {
  if (!payload || typeof payload !== 'object') {
    return { valid: false, error: 'Invalid payload structure' };
  }
  
  if (!payload.id || typeof payload.id !== 'string') {
    return { valid: false, error: 'Missing or invalid event ID' };
  }
  
  if (!payload.type || typeof payload.type !== 'string') {
    return { valid: false, error: 'Missing or invalid event type' };
  }
  
  if (!payload.data || typeof payload.data !== 'object') {
    return { valid: false, error: 'Missing or invalid event data' };
  }
  
  // Validate timestamp if present
  if (payload.created) {
    const created = parseInt(payload.created, 10);
    if (isNaN(created) || created > Math.floor(Date.now() / 1000)) {
      return { valid: false, error: 'Invalid event timestamp' };
    }
  }
  
  return { valid: true };
}

/**
 * Extract audit context from request
 */
function extractAuditContext(c: any): { userId?: string; organizationId?: string; ipAddress?: string; userAgent?: string } {
  return {
    userId: c.get?.('userId') || undefined,
    organizationId: c.get?.('organizationId') || undefined,
    ipAddress: c.req?.header?.('x-forwarded-for') || 
               c.req?.header?.('x-real-ip') || 
               'unknown',
    userAgent: c.req?.header?.('user-agent') || 'unknown'
  };
}

// Event type schemas for validation
const PaymentIntentSchema = z.object({
  id: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  customer: z.string().optional(),
  invoice: z.string().optional(),
});

const InvoiceSchema = z.object({
  id: z.string(),
  amount_paid: z.number(),
  currency: z.string(),
  status: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  customer: z.string(),
  subscription: z.string().optional(),
});

const SubscriptionSchema = z.object({
  id: z.string(),
  status: z.string(),
  customer: z.string(),
  items: z.array(z.any()),
  metadata: z.record(z.string(), z.any()).optional(),
});

const CustomerSchema = z.object({
  id: z.string(),
  email: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// Unified webhook handler
app.post('/stripe', async (c) => {
  const signature = c.req.header('stripe-signature');
  const payload = await c.req.text();
  
  if (!signature) {
    logger.warn('[UnifiedStripeWebhook] No signature provided');
    return c.json({ error: 'No signature provided' }, 400);
  }

  // Verify webhook signature
  if (!verifyStripeWebhook(payload, signature)) {
    logger.warn('[UnifiedStripeWebhook] Invalid signature');
    return c.json({ error: 'Invalid signature' }, 401);
  }

  let event;
  try {
    event = JSON.parse(payload);
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to parse payload:', error);
    return c.json({ error: 'Invalid payload' }, 400);
  }

  // Validate webhook payload structure
  const validation = validateWebhookPayload(event);
  if (!validation.valid) {
    logger.warn(`[UnifiedStripeWebhook] Payload validation failed: ${validation.error}`);
    return c.json({ error: validation.error }, 400);
  }

  // Check for duplicate event processing (idempotency)
  if (isEventProcessed(event.id)) {
    logger.info(`[UnifiedStripeWebhook] Duplicate event detected: ${event.id}`);
    return c.json({ received: true, processed: true, duplicate: true }, 200);
  }

  logger.info(`[UnifiedStripeWebhook] Processing event: ${event.type}`);

  try {
    const result = await processStripeEvent(event);
    markEventProcessed(event.id, result ? 'success' : 'failed');
    return c.json({ received: true, processed: result }, 200);
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Event processing failed:', error);
    markEventProcessed(event.id, 'error');
    await logWebhookError(event, error instanceof Error ? error : new Error(String(error)));
    return c.json({ error: 'Event processing failed' }, 500);
  }
});

/**
 * Process Stripe event based on type
 */
async function processStripeEvent(event: any): Promise<boolean> {
  const eventType = event.type;
  const data = event.data.object;

  switch (eventType) {
    // Payment Intent Events
    case 'payment_intent.succeeded':
      return await handlePaymentSucceeded(data);
    case 'payment_intent.payment_failed':
      return await handlePaymentFailed(data);
    case 'payment_intent.canceled':
      return await handlePaymentCanceled(data);
    case 'payment_intent.requires_action':
      return await handlePaymentRequiresAction(data);

    // Invoice Events
    case 'invoice.payment_succeeded':
      return await handleInvoicePaymentSucceeded(data);
    case 'invoice.payment_failed':
      return await handleInvoicePaymentFailed(data);
    case 'invoice.created':
      return await handleInvoiceCreated(data);
    case 'invoice.finalized':
      return await handleInvoiceFinalized(data);
    case 'invoice.voided':
      return await handleInvoiceVoided(data);
    case 'invoice.marked_uncollectible':
      return await handleInvoiceUncollectible(data);

    // Subscription Events
    case 'customer.subscription.created':
      return await handleSubscriptionCreated(data);
    case 'customer.subscription.updated':
      return await handleSubscriptionUpdated(data);
    case 'customer.subscription.deleted':
      return await handleSubscriptionDeleted(data);
    case 'customer.subscription.trial_will_end':
      return await handleSubscriptionTrialWillEnd(data);

    // Customer Events
    case 'customer.created':
      return await handleCustomerCreated(data);
    case 'customer.updated':
      return await handleCustomerUpdated(data);
    case 'customer.deleted':
      return await handleCustomerDeleted(data);

    // Charge Events
    case 'charge.succeeded':
      return await handleChargeSucceeded(data);
    case 'charge.failed':
      return await handleChargeFailed(data);
    case 'charge.dispute.created':
      return await handleDisputeCreated(data);

    // Setup Intent Events
    case 'setup_intent.succeeded':
      return await handleSetupIntentSucceeded(data);
    case 'setup_intent.setup_failed':
      return await handleSetupIntentFailed(data);

    // Payment Method Events
    case 'payment_method.attached':
      return await handlePaymentMethodAttached(data);
    case 'payment_method.detached':
      return await handlePaymentMethodDetached(data);

    default:
      logger.info(`[UnifiedStripeWebhook] Unhandled event type: ${eventType}`);
      return true;
  }
}

/**
 * Extract organization ID from payment intent metadata
 */
function extractOrganizationId(metadata?: Record<string, any>): string | undefined {
  if (!metadata || typeof metadata !== 'object') return undefined;
  return metadata.organizationId || metadata.organization_id || undefined;
}

/**
 * Handle payment_intent.succeeded
 */
async function handlePaymentSucceeded(paymentIntent: any): Promise<boolean> {
  try {
    const validated = PaymentIntentSchema.parse(paymentIntent);
    logger.info(`[UnifiedStripeWebhook] Payment succeeded: ${validated.id}`);
    
    const organizationId = extractOrganizationId(validated.metadata);

    // Update payment status in database
    await db
      .update(invoices)
      .set({ 
        status: 'paid',
        paidAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(invoices.paymentMethodId, validated.id));

    // Log successful payment with proper context
    await logAudit({
      action: AuditActions.PAYMENT_PROCESSED,
      resource: 'payment',
      resourceId: validated.id,
      status: 'success',
      organizationId,
      details: {
        paymentIntentId: validated.id,
        amount: validated.amount,
        currency: validated.currency,
        customerId: validated.customer
      }
    });

    // Trigger payment success webhook processing
    if (paymentWebhookService) {
      await paymentWebhookService.processWebhook({
        type: 'payment_intent.succeeded',
        data: { object: paymentIntent }
      });
    }

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle payment succeeded:', error);
    return false;
  }
}

/**
 * Handle payment_intent.payment_failed
 */
async function handlePaymentFailed(paymentIntent: any): Promise<boolean> {
  try {
    const validated = PaymentIntentSchema.parse(paymentIntent);
    logger.info(`[UnifiedStripeWebhook] Payment failed: ${validated.id}`);

    // Update payment status in database
    await db
      .update(invoices)
      .set({ 
        status: 'failed',
        updatedAt: new Date()
      })
      .where(eq(invoices.paymentMethodId, validated.id));

    // Log failed payment
    await logAudit({
      action: AuditActions.PAYMENT_FAILED,
      resource: 'payment',
      resourceId: validated.id,
      status: 'failed',
      details: {
        paymentIntentId: validated.id,
        amount: validated.amount,
        currency: validated.currency,
        customerId: validated.customer,
        lastPaymentError: (validated as any).last_payment_error
      }
    });

    // Trigger payment failure webhook processing
    if (paymentWebhookService) {
      await paymentWebhookService.processWebhook({
        type: 'payment_intent.payment_failed',
        data: { object: paymentIntent }
      });
    }

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle payment failed:', error);
    return false;
  }
}

/**
 * Handle payment_intent.canceled
 */
async function handlePaymentCanceled(paymentIntent: any): Promise<boolean> {
  try {
    const validated = PaymentIntentSchema.parse(paymentIntent);
    logger.info(`[UnifiedStripeWebhook] Payment canceled: ${validated.id}`);

    // Update payment status in database
    await db
      .update(invoices)
      .set({ 
        status: 'cancelled',
        updatedAt: new Date()
      })
      .where(eq(invoices.paymentMethodId, validated.id));

    await logAudit({
      action: AuditActions.PAYMENT_CANCELLED,
      resourceId: validated.id,
      details: {
        paymentIntentId: validated.id,
        amount: validated.amount,
        currency: validated.currency
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle payment canceled:', error);
    return false;
  }
}

/**
 * Handle payment_intent.requires_action
 */
async function handlePaymentRequiresAction(paymentIntent: any): Promise<boolean> {
  try {
    const validated = PaymentIntentSchema.parse(paymentIntent);
    logger.info(`[UnifiedStripeWebhook] Payment requires action: ${validated.id}`);

    // Update payment status
    await db
      .update(invoices)
      .set({ 
        status: 'pending',
        updatedAt: new Date()
      })
      .where(eq(invoices.paymentMethodId, validated.id));

    await logAudit({
      action: 'PAYMENT_REQUIRES_ACTION',
      resourceId: validated.id,
      details: {
        paymentIntentId: validated.id,
        nextAction: paymentIntent.next_action
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle payment requires action:', error);
    return false;
  }
}

/**
 * Handle invoice.payment_succeeded
 */
async function handleInvoicePaymentSucceeded(invoice: any): Promise<boolean> {
  try {
    const validated = InvoiceSchema.parse(invoice);
    logger.info(`[UnifiedStripeWebhook] Invoice payment succeeded: ${validated.id}`);

    // Use transaction for related updates
    await db.transaction(async (tx) => {
      // Update invoice in database
      await tx
        .update(invoices)
        .set({ 
          status: 'paid',
          paidAt: new Date(),
          updatedAt: new Date()
        })
        .where(eq(invoices.stripeInvoiceId, validated.id));

      // Update subscription if applicable
      if (validated.subscription) {
        await tx
          .update(subscriptions)
          .set({ 
            status: 'active',
            updatedAt: new Date()
          })
          .where(eq(subscriptions.stripeSubscriptionId, validated.subscription));
      }
    });

    await logAudit({
      action: 'INVOICE_PAYMENT_SUCCESS',
      resourceId: validated.id,
      details: {
        invoiceId: validated.id,
        amountPaid: validated.amount_paid,
        currency: validated.currency,
        customerId: validated.customer,
        subscriptionId: validated.subscription
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle invoice payment succeeded:', error);
    return false;
  }
}

/**
 * Handle invoice.payment_failed
 */
async function handleInvoicePaymentFailed(invoice: any): Promise<boolean> {
  try {
    const validated = InvoiceSchema.parse(invoice);
    logger.info(`[UnifiedStripeWebhook] Invoice payment failed: ${validated.id}`);

    // Use transaction for related updates
    await db.transaction(async (tx) => {
      // Update invoice in database
      await tx
        .update(invoices)
        .set({ 
          status: 'failed',
          updatedAt: new Date()
        })
        .where(eq(invoices.stripeInvoiceId, validated.id));

      // Update subscription if applicable
      if (validated.subscription) {
        await tx
          .update(subscriptions)
          .set({ 
            status: 'past_due',
            updatedAt: new Date()
          })
          .where(eq(subscriptions.stripeSubscriptionId, validated.subscription));
      }
    });

    await logAudit({
      action: 'INVOICE_PAYMENT_FAILED',
      resourceId: validated.id,
      details: {
        invoiceId: validated.id,
        currency: validated.currency,
        customerId: validated.customer,
        subscriptionId: validated.subscription,
        attemptCount: invoice.attempt_count
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle invoice payment failed:', error);
    return false;
  }
}

/**
 * Handle invoice.created
 */
async function handleInvoiceCreated(invoice: any): Promise<boolean> {
  try {
    const validated = InvoiceSchema.parse(invoice);
    logger.info(`[UnifiedStripeWebhook] Invoice created: ${validated.id}`);

    await logAudit({
      action: 'INVOICE_CREATED',
      resourceId: validated.id,
      details: {
        invoiceId: validated.id,
        currency: validated.currency,
        customerId: validated.customer,
        subscriptionId: validated.subscription
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle invoice created:', error);
    return false;
  }
}

/**
 * Handle invoice.finalized
 */
async function handleInvoiceFinalized(invoice: any): Promise<boolean> {
  try {
    const validated = InvoiceSchema.parse(invoice);
    logger.info(`[UnifiedStripeWebhook] Invoice finalized: ${validated.id}`);

    await logAudit({
      action: 'INVOICE_FINALIZED',
      resourceId: validated.id,
      details: {
        invoiceId: validated.id,
        currency: validated.currency,
        customerId: validated.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle invoice finalized:', error);
    return false;
  }
}

/**
 * Handle invoice.voided
 */
async function handleInvoiceVoided(invoice: any): Promise<boolean> {
  try {
    const validated = InvoiceSchema.parse(invoice);
    logger.info(`[UnifiedStripeWebhook] Invoice voided: ${validated.id}`);

    await db
      .update(invoices)
      .set({ 
        status: 'cancelled',
        updatedAt: new Date()
      })
      .where(eq(invoices.stripeInvoiceId, validated.id));

    await logAudit({
      action: 'INVOICE_VOIDED',
      resourceId: validated.id,
      details: {
        invoiceId: validated.id,
        customerId: validated.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle invoice voided:', error);
    return false;
  }
}

/**
 * Handle invoice.marked_uncollectible
 */
async function handleInvoiceUncollectible(invoice: any): Promise<boolean> {
  try {
    const validated = InvoiceSchema.parse(invoice);
    logger.info(`[UnifiedStripeWebhook] Invoice marked uncollectible: ${validated.id}`);

    await db
      .update(invoices)
      .set({ 
        status: 'failed',
        updatedAt: new Date()
      })
      .where(eq(invoices.stripeInvoiceId, validated.id));

    await logAudit({
      action: 'INVOICE_UNCOLLECTIBLE',
      resourceId: validated.id,
      details: {
        invoiceId: validated.id,
        customerId: validated.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle invoice uncollectible:', error);
    return false;
  }
}

/**
 * Handle customer.subscription.created
 */
async function handleSubscriptionCreated(subscription: any): Promise<boolean> {
  try {
    const validated = SubscriptionSchema.parse(subscription);
    logger.info(`[UnifiedStripeWebhook] Subscription created: ${validated.id}`);

    // Update subscription in database
    await db
      .update(subscriptions)
      .set({ 
        status: (validated.status as any) || 'active',
        stripeSubscriptionId: validated.id,
        updatedAt: new Date()
      })
      .where(eq(subscriptions.stripeSubscriptionId, validated.id));

    await logAudit({
      action: 'SUBSCRIPTION_CREATED',
      resourceId: validated.id,
      details: {
        subscriptionId: validated.id,
        status: (validated.status as any) || 'active',
        customerId: validated.customer,
        itemCount: validated.items?.length || 0
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle subscription created:', error);
    return false;
  }
}

/**
 * Handle customer.subscription.updated
 */
async function handleSubscriptionUpdated(subscription: any): Promise<boolean> {
  try {
    const validated = SubscriptionSchema.parse(subscription);
    logger.info(`[UnifiedStripeWebhook] Subscription updated: ${validated.id}`);

    await db
      .update(subscriptions)
      .set({ 
        status: (validated.status as any) || 'active',
        updatedAt: new Date()
      })
      .where(eq(subscriptions.stripeSubscriptionId, validated.id));

    await logAudit({
      action: 'SUBSCRIPTION_UPDATED',
      resourceId: validated.id,
      details: {
        subscriptionId: validated.id,
        status: (validated.status as any) || 'active',
        customerId: validated.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle subscription updated:', error);
    return false;
  }
}

/**
 * Handle customer.subscription.deleted
 */
async function handleSubscriptionDeleted(subscription: any): Promise<boolean> {
  try {
    const validated = SubscriptionSchema.parse(subscription);
    logger.info(`[UnifiedStripeWebhook] Subscription deleted: ${validated.id}`);

    await db
      .update(subscriptions)
      .set({ 
        status: 'cancelled',
        canceledAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(subscriptions.stripeSubscriptionId, validated.id));

    await logAudit({
      action: 'SUBSCRIPTION_DELETED',
      resourceId: validated.id,
      details: {
        subscriptionId: validated.id,
        customerId: validated.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle subscription deleted:', error);
    return false;
  }
}

/**
 * Handle customer.subscription.trial_will_end
 */
async function handleSubscriptionTrialWillEnd(subscription: any): Promise<boolean> {
  try {
    const validated = SubscriptionSchema.parse(subscription);
    logger.info(`[UnifiedStripeWebhook] Subscription trial will end: ${validated.id}`);

    await logAudit({
      action: 'SUBSCRIPTION_TRIAL_ENDING',
      resourceId: validated.id,
      details: {
        subscriptionId: validated.id,
        customerId: validated.customer,
        trialEnd: subscription.trial_end
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle subscription trial will end:', error);
    return false;
  }
}

/**
 * Handle customer.created
 */
async function handleCustomerCreated(customer: any): Promise<boolean> {
  try {
    const validated = CustomerSchema.parse(customer);
    logger.info(`[UnifiedStripeWebhook] Customer created: ${validated.id}`);

    await logAudit({
      action: 'CUSTOMER_CREATED',
      resourceId: validated.id,
      details: {
        customerId: validated.id,
        email: validated.email
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle customer created:', error);
    return false;
  }
}

/**
 * Handle customer.updated
 */
async function handleCustomerUpdated(customer: any): Promise<boolean> {
  try {
    const validated = CustomerSchema.parse(customer);
    logger.info(`[UnifiedStripeWebhook] Customer updated: ${validated.id}`);

    await logAudit({
      action: 'CUSTOMER_UPDATED',
      resourceId: validated.id,
      details: {
        customerId: validated.id,
        email: validated.email
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle customer updated:', error);
    return false;
  }
}

/**
 * Handle customer.deleted
 */
async function handleCustomerDeleted(customer: any): Promise<boolean> {
  try {
    const validated = CustomerSchema.parse(customer);
    logger.info(`[UnifiedStripeWebhook] Customer deleted: ${validated.id}`);

    await logAudit({
      action: 'CUSTOMER_DELETED',
      resourceId: validated.id,
      details: {
        customerId: validated.id
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle customer deleted:', error);
    return false;
  }
}

/**
 * Handle charge.succeeded
 */
async function handleChargeSucceeded(charge: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Charge succeeded: ${charge.id}`);

    await logAudit({
      action: 'CHARGE_SUCCEEDED',
      resourceId: charge.id,
      details: {
        chargeId: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        customerId: charge.customer,
        paymentIntentId: charge.payment_intent
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle charge succeeded:', error);
    return false;
  }
}

/**
 * Handle charge.failed
 */
async function handleChargeFailed(charge: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Charge failed: ${charge.id}`);

    await logAudit({
      action: 'CHARGE_FAILED',
      resourceId: charge.id,
      details: {
        chargeId: charge.id,
        amount: charge.amount,
        currency: charge.currency,
        customerId: charge.customer,
        failureCode: charge.failure_code,
        failureMessage: charge.failure_message
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle charge failed:', error);
    return false;
  }
}

/**
 * Handle dispute.created
 */
async function handleDisputeCreated(dispute: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Dispute created: ${dispute.id}`);

    await logAudit({
      action: 'DISPUTE_CREATED',
      resourceId: dispute.id,
      details: {
        disputeId: dispute.id,
        amount: dispute.amount,
        currency: dispute.currency,
        chargeId: dispute.charge,
        reason: dispute.reason
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle dispute created:', error);
    return false;
  }
}

/**
 * Handle setup_intent.succeeded
 */
async function handleSetupIntentSucceeded(setupIntent: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Setup intent succeeded: ${setupIntent.id}`);

    await logAudit({
      action: 'SETUP_INTENT_SUCCEEDED',
      resourceId: setupIntent.id,
      details: {
        setupIntentId: setupIntent.id,
        customerId: setupIntent.customer,
        paymentMethodId: setupIntent.payment_method
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle setup intent succeeded:', error);
    return false;
  }
}

/**
 * Handle setup_intent.setup_failed
 */
async function handleSetupIntentFailed(setupIntent: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Setup intent failed: ${setupIntent.id}`);

    await logAudit({
      action: 'SETUP_INTENT_FAILED',
      resourceId: setupIntent.id,
      details: {
        setupIntentId: setupIntent.id,
        customerId: setupIntent.customer,
        lastSetupError: setupIntent.last_setup_error
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle setup intent failed:', error);
    return false;
  }
}

/**
 * Handle payment_method.attached
 */
async function handlePaymentMethodAttached(paymentMethod: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Payment method attached: ${paymentMethod.id}`);

    await logAudit({
      action: 'PAYMENT_METHOD_ATTACHED',
      resourceId: paymentMethod.id,
      details: {
        paymentMethodId: paymentMethod.id,
        type: paymentMethod.type,
        customerId: paymentMethod.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle payment method attached:', error);
    return false;
  }
}

/**
 * Handle payment_method.detached
 */
async function handlePaymentMethodDetached(paymentMethod: any): Promise<boolean> {
  try {
    logger.info(`[UnifiedStripeWebhook] Payment method detached: ${paymentMethod.id}`);

    await logAudit({
      action: 'PAYMENT_METHOD_DETACHED',
      resourceId: paymentMethod.id,
      details: {
        paymentMethodId: paymentMethod.id,
        type: paymentMethod.type,
        customerId: paymentMethod.customer
      }
    });

    return true;
  } catch (error) {
    logger.error('[UnifiedStripeWebhook] Failed to handle payment method detached:', error);
    return false;
  }
}

/**
 * Log webhook processing error
 */
async function logWebhookError(event: any, error: Error): Promise<void> {
  await logAudit({
    action: 'WEBHOOK_ERROR',
    resourceId: event.id,
    details: {
      eventType: event.type,
      error: error.message,
      stack: error.stack
    }
  });
}

// Export the app with different names for compatibility
export const stripeWebhookApp = app;
export const enhancedStripeWebhookApp = app;

export default app;
