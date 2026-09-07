import Stripe from 'stripe';
import { db as pgDb } from '../db/connection';
import { organizations, users } from '../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import { logAudit, AuditActions } from '../lib/audit';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

const isProduction = (process.env.NODE_ENV || 'development') === 'production';
if (!process.env.STRIPE_SECRET_KEY) {
  if (isProduction) {
    throw new Error('[PaymentMethodService] STRIPE_SECRET_KEY is required in production');
  }
  logger.warn('[PaymentMethodService] STRIPE_SECRET_KEY not set. Payment features disabled in development.');
}

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })
  : null;

export interface PaymentMethodInfo {
  id: string;
  type: 'card' | 'bank_account' | 'sepa_debit' | 'us_bank_account';
  last4?: string;
  brand?: string;
  exp_month?: number;
  exp_year?: number;
  fingerprint?: string;
  is_default?: boolean;
  created: number;
  metadata?: Record<string, any>;
}

export interface CreatePaymentMethodParams {
  organizationId: string;
  userId: string;
  type: 'card' | 'bank_account';
  card?: {
    number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
  };
  bank_account?: {
    country: string;
    currency: string;
    account_number: string;
    routing_number: string;
    account_holder_name: string;
  };
  is_default?: boolean;
  metadata?: Record<string, any>;
}

export interface SetupIntentParams {
  organizationId: string;
  userId: string;
  payment_method_types?: string[];
  usage?: 'off_session' | 'on_session';
  customer?: string;
  metadata?: Record<string, any>;
}

export class PaymentMethodService {
  async createPaymentMethod(params: CreatePaymentMethodParams): Promise<Stripe.PaymentMethod> {
    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, params.organizationId))
        .limit(1);

      if (!organization?.metadata?.stripeCustomerId) {
        throw new Error('Organization does not have a Stripe customer ID');
      }

      let paymentMethod: Stripe.PaymentMethod;

      if (params.type === 'card' && params.card) {
        // Create card payment method
        paymentMethod = await stripe.paymentMethods.create({
          type: 'card',
          card: {
            number: params.card.number,
            exp_month: params.card.exp_month,
            exp_year: params.card.exp_year,
            cvc: params.card.cvc,
          },
          metadata: {
            organizationId: params.organizationId,
            userId: params.userId,
            ...params.metadata,
          },
        });
      } else if (params.type === 'bank_account' && params.bank_account) {
        // Create bank account payment method
        paymentMethod = await stripe.paymentMethods.create({
          type: 'bank_account',
          bank_account: {
            country: params.bank_account.country,
            currency: params.bank_account.currency,
            account_number: params.bank_account.account_number,
            routing_number: params.bank_account.routing_number,
            account_holder_name: params.bank_account.account_holder_name,
          },
          metadata: {
            organizationId: params.organizationId,
            userId: params.userId,
            ...params.metadata,
          },
        });
      } else {
        throw new Error('Invalid payment method parameters');
      }

      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: organization.metadata.stripeCustomerId,
      });

      // Set as default if requested
      if (params.is_default) {
        await stripe.customers.update(organization.metadata.stripeCustomerId, {
          invoice_settings: {
            default_payment_method: paymentMethod.id,
          },
        });
      }

      logAudit({
        organizationId: params.organizationId,
        action: AuditActions.PAYMENT_METHOD_ADDED,
        resource: 'payment_method',
        resourceId: paymentMethod.id,
        metadata: { 
          type: params.type,
          userId: params.userId,
          isDefault: params.is_default,
        },
        status: 'success',
      });

      return paymentMethod;
    } catch (error) {
      logger.error('[PaymentMethodService] Create payment method failed:', error);
      throw new Error(`Failed to create payment method: ${error.message}`);
    }
  }

  async createSetupIntent(params: SetupIntentParams): Promise<Stripe.SetupIntent> {
    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, params.organizationId))
        .limit(1);

      if (!organization?.metadata?.stripeCustomerId) {
        throw new Error('Organization does not have a Stripe customer ID');
      }

      const setupIntent = await stripe.setupIntents.create({
        customer: organization.metadata.stripeCustomerId,
        payment_method_types: params.payment_method_types || ['card'],
        usage: params.usage || 'off_session',
        metadata: {
          organizationId: params.organizationId,
          userId: params.userId,
          ...params.metadata,
        },
      });

      logAudit({
        organizationId: params.organizationId,
        action: AuditActions.SETUP_INTENT_CREATED,
        resource: 'setup_intent',
        resourceId: setupIntent.id,
        metadata: { 
          userId: params.userId,
          paymentMethodTypes: params.payment_method_types,
        },
        status: 'success',
      });

      return setupIntent;
    } catch (error) {
      logger.error('[PaymentMethodService] Create setup intent failed:', error);
      throw new Error(`Failed to create setup intent: ${error.message}`);
    }
  }

  async getPaymentMethods(organizationId: string): Promise<PaymentMethodInfo[]> {
    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organization?.metadata?.stripeCustomerId) {
        throw new Error('Organization does not have a Stripe customer ID');
      }

      const paymentMethods = await stripe.paymentMethods.list({
        customer: organization.metadata.stripeCustomerId,
        type: 'card',
      });

      // Get customer's default payment method
      const customer = await stripe.customers.retrieve(organization.metadata.stripeCustomerId);
      const defaultPaymentMethodId = (customer as Stripe.Customer).invoice_settings?.default_payment_method as string;

      return paymentMethods.data.map(method => ({
        id: method.id,
        type: method.type as any,
        last4: method.card?.last4,
        brand: method.card?.brand,
        exp_month: method.card?.exp_month,
        exp_year: method.card?.exp_year,
        fingerprint: method.card?.fingerprint,
        is_default: method.id === defaultPaymentMethodId,
        created: method.created,
        metadata: method.metadata,
      }));
    } catch (error) {
      logger.error('[PaymentMethodService] Get payment methods failed:', error);
      throw new Error(`Failed to get payment methods: ${error.message}`);
    }
  }

  async setDefaultPaymentMethod(organizationId: string, paymentMethodId: string): Promise<void> {
    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organization?.metadata?.stripeCustomerId) {
        throw new Error('Organization does not have a Stripe customer ID');
      }

      // Verify payment method belongs to this customer
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
      if (paymentMethod.customer !== organization.metadata.stripeCustomerId) {
        throw new Error('Payment method does not belong to this organization');
      }

      // Update customer's default payment method
      await stripe.customers.update(organization.metadata.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      logAudit({
        organizationId,
        action: AuditActions.PAYMENT_METHOD_UPDATED,
        resource: 'payment_method',
        resourceId: paymentMethodId,
        metadata: { action: 'set_default' },
        status: 'success',
      });
    } catch (error) {
      logger.error('[PaymentMethodService] Set default payment method failed:', error);
      throw new Error(`Failed to set default payment method: ${error.message}`);
    }
  }

  async deletePaymentMethod(organizationId: string, paymentMethodId: string): Promise<void> {
    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organization?.metadata?.stripeCustomerId) {
        throw new Error('Organization does not have a Stripe customer ID');
      }

      // Verify payment method belongs to this customer
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
      if (paymentMethod.customer !== organization.metadata.stripeCustomerId) {
        throw new Error('Payment method does not belong to this organization');
      }

      // Detach payment method
      await stripe.paymentMethods.detach(paymentMethodId);

      logAudit({
        organizationId,
        action: AuditActions.PAYMENT_METHOD_DELETED,
        resource: 'payment_method',
        resourceId: paymentMethodId,
        metadata: { action: 'detached' },
        status: 'success',
      });
    } catch (error) {
      logger.error('[PaymentMethodService] Delete payment method failed:', error);
      throw new Error(`Failed to delete payment method: ${error.message}`);
    }
  }

  async validatePaymentMethod(paymentMethodId: string): Promise<{
    isValid: boolean;
    isExpired: boolean;
    brand?: string;
    last4?: string;
    funding?: string;
  }> {
    try {
      const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
      
      if (paymentMethod.type !== 'card') {
        return { isValid: true };
      }

      const card = paymentMethod.card;
      if (!card) {
        return { isValid: false };
      }

      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      
      const isExpired = card.exp_year < currentYear || 
        (card.exp_year === currentYear && card.exp_month < currentMonth);

      return {
        isValid: !isExpired,
        isExpired,
        brand: card.brand,
        last4: card.last4,
        funding: card.funding,
      };
    } catch (error) {
      logger.error('[PaymentMethodService] Validate payment method failed:', error);
      return { isValid: false };
    }
  }
}

export const paymentMethodService = new PaymentMethodService();
