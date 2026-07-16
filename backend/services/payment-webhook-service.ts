import { db as pgDb } from '../db/connection';
import { organizations, subscriptions, invoices, payments, users } from '../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import { logAudit, AuditActions } from '../lib/audit';
import { stripeService } from './stripe-service';
import Stripe from 'stripe';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
}) : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

if (!stripe) {
  logger.warn('Stripe credentials not configured. Payment webhook service running in mock mode.');
}

export class PaymentWebhookService {
  async processWebhook(request: any): Promise<{ success: boolean; message: string }> {
    if (!stripe) {
      logger.warn('[Webhook] Stripe not configured, returning mock success');
      return { success: true, message: 'Mock mode - webhook processed' };
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      logger.error('[Webhook] No stripe-signature header found');
      return { success: false, message: 'No signature' };
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
    } catch (err) {
      logger.error('[Webhook] Signature verification failed:', err);
      return { success: false, message: 'Invalid signature' };
    }

    logger.info(`Processing event: ${event.type}`);

    try {
      switch (event.type) {
        case 'customer.created':
          await this.handleCustomerCreated(event.data.object as Stripe.Customer);
          break;

        case 'customer.updated':
          await this.handleCustomerUpdated(event.data.object as Stripe.Customer);
          break;

        case 'customer.deleted':
          await this.handleCustomerDeleted(event.data.object as Stripe.Customer);
          break;

        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
          break;

        case 'payment_intent.canceled':
          await this.handlePaymentIntentCanceled(event.data.object as Stripe.PaymentIntent);
          break;

        case 'invoice.created':
          await this.handleInvoiceCreated(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.finalized':
          await this.handleInvoiceFinalized(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.payment_succeeded':
          await this.handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.payment_failed':
          await this.handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.upcoming':
          await this.handleInvoiceUpcoming(event.data.object as Stripe.Invoice);
          break;

        case 'subscription.created':
          await this.handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;

        case 'subscription.updated':
          await this.handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case 'subscription.deleted':
          await this.handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        case 'subscription.trial_will_end':
          await this.handleSubscriptionTrialWillEnd(event.data.object as Stripe.Subscription);
          break;

        case 'checkout.session.completed':
          await this.handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case 'payment_method.attached':
          await this.handlePaymentMethodAttached(event.data.object as Stripe.PaymentMethod);
          break;

        case 'charge.succeeded':
          await this.handleChargeSucceeded(event.data.object as Stripe.Charge);
          break;

        case 'charge.failed':
          await this.handleChargeFailed(event.data.object as Stripe.Charge);
          break;

        case 'account.updated':
          await this.handleAccountUpdated(event.data.object as Stripe.Account);
          break;

        case 'payout.created':
          await this.handlePayoutCreated(event.data.object as Stripe.Payout);
          break;

        case 'payout.paid':
          await this.handlePayoutPaid(event.data.object as Stripe.Payout);
          break;

        case 'payout.failed':
          await this.handlePayoutFailed(event.data.object as Stripe.Payout);
          break;

        default:
          logger.info(`Unhandled event type: ${event.type}`);
      }

      return { success: true, message: 'Event processed successfully' };
    } catch (error) {
      logger.error(`Error processing event ${event.type}:`, error);
      return { success: false, message: 'Processing failed' };
    }
  }

  private async handleCustomerCreated(customer: Stripe.Customer): Promise<void> {
    const organizationId = customer.metadata?.organizationId;
    if (!organizationId) {
      logger.warn('[Webhook] Customer created without organizationId');
      return;
    }

    await pgDb
      .update(organizations)
      .set({
        metadata: {
          stripeCustomerId: customer.id,
          stripeCustomerCreated: new Date().toISOString(),
        }
      })
      .where(eq(organizations.id, organizationId));

    logAudit({
      organizationId,
      action: AuditActions.CUSTOMER_CREATED,
      resource: 'customer',
      resourceId: customer.id,
      metadata: { source: 'webhook' },
      status: 'success',
    });
  }

  private async handleCustomerUpdated(customer: Stripe.Customer): Promise<void> {
    const organizationId = customer.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(organizations)
      .set({
        metadata: {
          stripeCustomerId: customer.id,
          stripeCustomerUpdated: new Date().toISOString(),
        }
      })
      .where(eq(organizations.id, organizationId));
  }

  private async handleCustomerDeleted(customer: Stripe.Customer): Promise<void> {
    const organizationId = customer.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(organizations)
      .set({
        metadata: {
          stripeCustomerId: null,
          stripeCustomerDeleted: new Date().toISOString(),
        }
      })
      .where(eq(organizations.id, organizationId));

    logAudit({
      organizationId,
      action: AuditActions.CUSTOMER_DELETED,
      resource: 'customer',
      resourceId: customer.id,
      metadata: { source: 'webhook' },
      status: 'success',
    });
  }

  private async handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const organizationId = paymentIntent.metadata?.organizationId;
    if (!organizationId) return;

    // Create payment record
    await pgDb.insert(payments).values({
      organizationId,
      amount: (paymentIntent.amount / 100).toString(),
      currency: paymentIntent.currency,
      method: paymentIntent.payment_method_types[0] || 'card',
      status: 'completed',
      transactionId: paymentIntent.id,
      gatewayResponse: paymentIntent,
      metadata: {
        stripePaymentIntentId: paymentIntent.id,
        customerId: paymentIntent.customer as string,
      },
      createdAt: new Date(paymentIntent.created * 1000),
      updatedAt: new Date(),
    });

    // Update invoice if exists
    if (paymentIntent.invoice) {
      await pgDb
        .update(invoices)
        .set({
          status: 'paid',
          paidAt: new Date(),
          transactionId: paymentIntent.id,
          paymentMethodId: paymentIntent.payment_method as string,
        })
        .where(and(
          eq(invoices.organizationId, organizationId),
          eq(invoices.invoiceNumber, paymentIntent.invoice as string)
        ));
    }

    logAudit({
      organizationId,
      action: AuditActions.PAYMENT_PROCESSED,
      resource: 'payment',
      resourceId: paymentIntent.id,
      metadata: { 
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const organizationId = paymentIntent.metadata?.organizationId;
    if (!organizationId) return;

    // Create failed payment record
    await pgDb.insert(payments).values({
      organizationId,
      amount: (paymentIntent.amount / 100).toString(),
      currency: paymentIntent.currency,
      method: paymentIntent.payment_method_types[0] || 'card',
      status: 'failed',
      transactionId: paymentIntent.id,
      gatewayResponse: paymentIntent,
      metadata: {
        stripePaymentIntentId: paymentIntent.id,
        customerId: paymentIntent.customer as string,
        failureReason: paymentIntent.last_payment_error?.message,
      },
      createdAt: new Date(paymentIntent.created * 1000),
      updatedAt: new Date(),
    });

    logAudit({
      organizationId,
      action: AuditActions.PAYMENT_FAILED,
      resource: 'payment',
      resourceId: paymentIntent.id,
      metadata: { 
        amount: paymentIntent.amount / 100,
        failureReason: paymentIntent.last_payment_error?.message,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handlePaymentIntentCanceled(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    const organizationId = paymentIntent.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb.insert(payments).values({
      organizationId,
      amount: (paymentIntent.amount / 100).toString(),
      currency: paymentIntent.currency,
      method: paymentIntent.payment_method_types[0] || 'card',
      status: 'canceled',
      transactionId: paymentIntent.id,
      gatewayResponse: paymentIntent,
      metadata: {
        stripePaymentIntentId: paymentIntent.id,
        customerId: paymentIntent.customer as string,
      },
      createdAt: new Date(paymentIntent.created * 1000),
      updatedAt: new Date(),
    });
  }

  private async handleInvoiceCreated(invoice: Stripe.Invoice): Promise<void> {
    const organizationId = invoice.metadata?.organizationId;
    if (!organizationId) return;

    // Check if invoice already exists
    const [existingInvoice] = await pgDb
      .select()
      .from(invoices)
      .where(and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.invoiceNumber, invoice.number || invoice.id)
      ))
      .limit(1);

    if (!existingInvoice) {
      await pgDb.insert(invoices).values({
        organizationId,
        invoiceNumber: invoice.number || invoice.id,
        status: invoice.status as any,
        amount: (invoice.amount_due / 100).toString(),
        total: (invoice.total / 100).toString(),
        currency: invoice.currency,
        dueDate: invoice.due_date ? new Date(invoice.due_date * 1000) : null,
        metadata: {
          stripeInvoiceId: invoice.id,
          customerId: invoice.customer as string,
          subscriptionId: invoice.subscription as string,
        },
        createdAt: new Date(invoice.created * 1000),
        updatedAt: new Date(),
      });
    }
  }

  private async handleInvoiceFinalized(invoice: Stripe.Invoice): Promise<void> {
    const organizationId = invoice.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(invoices)
      .set({
        status: invoice.status as any,
        amount: (invoice.amount_due / 100).toString(),
        total: (invoice.total / 100).toString(),
        updatedAt: new Date(),
      })
      .where(and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.invoiceNumber, invoice.number || invoice.id)
      ));
  }

  private async handleInvoicePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
    const organizationId = invoice.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(invoices)
      .set({
        status: 'paid',
        paidAt: new Date(),
        transactionId: invoice.payment_intent as string,
        updatedAt: new Date(),
      })
      .where(and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.invoiceNumber, invoice.number || invoice.id)
      ));

    // Update subscription if this is a subscription payment
    if (invoice.subscription) {
      await pgDb
        .update(subscriptions)
        .set({
          status: 'active',
          updatedAt: new Date(),
        })
        .where(and(
          eq(subscriptions.organizationId, organizationId),
          eq(subscriptions.metadata?.stripeSubscriptionId || '', invoice.subscription as string)
        ));
    }

    logAudit({
      organizationId,
      action: AuditActions.INVOICE_PAID,
      resource: 'invoice',
      resourceId: invoice.id,
      metadata: { 
        amount: invoice.amount_paid / 100,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handleInvoicePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
    const organizationId = invoice.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(invoices)
      .set({
        status: 'failed',
        updatedAt: new Date(),
      })
      .where(and(
        eq(invoices.organizationId, organizationId),
        eq(invoices.invoiceNumber, invoice.number || invoice.id)
      ));

    // Update subscription status if applicable
    if (invoice.subscription) {
      await pgDb
        .update(subscriptions)
        .set({
          status: 'past_due',
          updatedAt: new Date(),
        })
        .where(and(
          eq(subscriptions.organizationId, organizationId),
          eq(subscriptions.metadata?.stripeSubscriptionId || '', invoice.subscription as string)
        ));
    }

    logAudit({
      organizationId,
      action: AuditActions.INVOICE_PAYMENT_FAILED,
      resource: 'invoice',
      resourceId: invoice.id,
      metadata: { 
        amount: invoice.amount_due / 100,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handleInvoiceUpcoming(invoice: Stripe.Invoice): Promise<void> {
    const organizationId = invoice.metadata?.organizationId;
    if (!organizationId) return;

    // Send notification about upcoming invoice
    logger.info(`Upcoming invoice for organization ${organizationId}: ${invoice.amount_due / 100} ${invoice.currency.toUpperCase()}`);
  }

  private async handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
    const organizationId = subscription.metadata?.organizationId;
    if (!organizationId) return;

    const plan = this.getPlanFromPriceId(subscription.items.data[0]?.price?.id || '');
    const amount = subscription.items.data[0]?.price?.unit_amount || 0;

    await pgDb.insert(subscriptions).values({
      organizationId,
      plan,
      status: subscription.status as any,
      billingCycle: 'monthly',
      amount: amount / 100,
      currency: subscription.items.data[0]?.price?.currency || 'usd',
      nextBillingDate: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
      trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      features: this.getPlanFeatures(plan),
      metadata: {
        stripeSubscriptionId: subscription.id,
        customerId: subscription.customer as string,
      },
      createdAt: new Date(subscription.created * 1000),
      updatedAt: new Date(),
    });

    logAudit({
      organizationId,
      action: AuditActions.SUBSCRIPTION_CREATED,
      resource: 'subscription',
      resourceId: subscription.id,
      metadata: { 
        plan,
        amount: amount / 100,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
    const organizationId = subscription.metadata?.organizationId;
    if (!organizationId) return;

    const plan = this.getPlanFromPriceId(subscription.items.data[0]?.price?.id || '');
    const amount = subscription.items.data[0]?.price?.unit_amount || 0;

    await pgDb
      .update(subscriptions)
      .set({
        plan,
        status: subscription.status as any,
        amount: amount / 100,
        currency: subscription.items.data[0]?.price?.currency || 'usd',
        nextBillingDate: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
        features: this.getPlanFeatures(plan),
        updatedAt: new Date(),
      })
      .where(and(
        eq(subscriptions.organizationId, organizationId),
        eq(subscriptions.metadata?.stripeSubscriptionId || '', subscription.id)
      ));
  }

  private async handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
    const organizationId = subscription.metadata?.organizationId;
    if (!organizationId) return;

    await pgDb
      .update(subscriptions)
      .set({
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: 'webhook_cancelled',
        updatedAt: new Date(),
      })
      .where(and(
        eq(subscriptions.organizationId, organizationId),
        eq(subscriptions.metadata?.stripeSubscriptionId || '', subscription.id)
      ));

    logAudit({
      organizationId,
      action: AuditActions.SUBSCRIPTION_CANCELLED,
      resource: 'subscription',
      resourceId: subscription.id,
      metadata: { source: 'webhook' },
      status: 'success',
    });
  }

  private async handleSubscriptionTrialWillEnd(subscription: Stripe.Subscription): Promise<void> {
    const organizationId = subscription.metadata?.organizationId;
    if (!organizationId) return;

    // Send notification about trial ending
    const trialEndsAt = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;
    logger.info(`Trial ending for organization ${organizationId} on ${trialEndsAt}`);
  }

  private async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session): Promise<void> {
    const organizationId = session.metadata?.organizationId;
    if (!organizationId) return;

    logger.info(`Checkout session completed for organization ${organizationId}: ${session.id}`);

    // Handle one-time purchases or subscription activations
    if (session.mode === 'payment' && session.payment_status === 'paid') {
      // One-time payment completed
      logAudit({
        organizationId,
        action: AuditActions.PAYMENT_PROCESSED,
        resource: 'checkout_session',
        resourceId: session.id,
        metadata: { 
          amount: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency,
          source: 'webhook'
        },
        status: 'success',
      });
    } else if (session.mode === 'subscription') {
      // Subscription activated
      logAudit({
        organizationId,
        action: AuditActions.SUBSCRIPTION_CREATED,
        resource: 'checkout_session',
        resourceId: session.id,
        metadata: { 
          subscriptionId: session.subscription,
          source: 'webhook'
        },
        status: 'success',
      });
    }
  }

  private async handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod): Promise<void> {
    const customerId = paymentMethod.customer as string;
    if (!customerId) return;

    // Find organization by Stripe customer ID
    const [organization] = await pgDb
      .select()
      .from(organizations)
      .where(eq(organizations.metadata?.stripeCustomerId || '', customerId))
      .limit(1);

    if (organization) {
      logAudit({
        organizationId: organization.id,
        action: AuditActions.PAYMENT_METHOD_ADDED,
        resource: 'payment_method',
        resourceId: paymentMethod.id,
        metadata: { 
          type: paymentMethod.type,
          source: 'webhook'
        },
        status: 'success',
      });
    }
  }

  private async handleChargeSucceeded(charge: Stripe.Charge): Promise<void> {
    const organizationId = charge.metadata?.organizationId;
    if (!organizationId) return;

    logAudit({
      organizationId,
      action: AuditActions.PAYMENT_PROCESSED,
      resource: 'charge',
      resourceId: charge.id,
      metadata: { 
        amount: charge.amount / 100,
        currency: charge.currency,
        paymentMethodId: charge.payment_method,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handleChargeFailed(charge: Stripe.Charge): Promise<void> {
    const organizationId = charge.metadata?.organizationId;
    if (!organizationId) return;

    logAudit({
      organizationId,
      action: AuditActions.PAYMENT_FAILED,
      resource: 'charge',
      resourceId: charge.id,
      metadata: { 
        amount: charge.amount / 100,
        failureReason: charge.failure_message,
        source: 'webhook'
      },
      status: 'success',
    });
  }

  private async handleAccountUpdated(account: Stripe.Account): Promise<void> {
    logger.info(`Account updated: ${account.id} - ${account.business_profile?.name}`);
  }

  private async handlePayoutCreated(payout: Stripe.Payout): Promise<void> {
    logger.info(`Payout created: ${payout.id} - ${payout.amount / 100} ${payout.currency.toUpperCase()}`);
  }

  private async handlePayoutPaid(payout: Stripe.Payout): Promise<void> {
    logger.info(`Payout paid: ${payout.id} - ${payout.amount / 100} ${payout.currency.toUpperCase()}`);
  }

  private async handlePayoutFailed(payout: Stripe.Payout): Promise<void> {
    logger.info(`Payout failed: ${payout.id} - ${payout.failure_message}`);
  }

  // Helper methods
  private getPlanFromPriceId(priceId: string): string {
    const pricePlanMap: Record<string, string> = {
      'price_1O9ABC': 'starter',
      'price_1O9DEF': 'professional', 
      'price_1O9GHI': 'enterprise',
    };
    return pricePlanMap[priceId] || 'custom';
  }

  private getPlanFeatures(plan: string): Record<string, any> {
    const featuresMap: Record<string, Record<string, any>> = {
      free: { users: 5, storage: 5120, features: ['basic'] },
      starter: { users: 10, storage: 10240, features: ['basic', 'analytics'] },
      professional: { users: 25, storage: 51200, features: ['basic', 'analytics', 'ai'] },
      enterprise: { users: -1, storage: -1, features: ['all'] },
    };
    return featuresMap[plan] || featuresMap.free;
  }
}

export const paymentWebhookService = new PaymentWebhookService();
