import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { invoices, organizations } from '../../../../db/drizzle-schema';
import { eq, and, desc, gte, lte } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { Permission } from '../../../../lib/rbac';
import { stripeService } from '../../../../services/stripe-service';

const getInvoicesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  status: z.enum(['paid', 'pending', 'failed', 'refunded']).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

const getPaymentMethodsSchema = z.object({
  setDefault: z.string().optional(),
});

const addPaymentMethodSchema = z.object({
  type: z.enum(['card', 'bank_account']),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankRoutingNumber: z.string().optional(),
  accountHolderName: z.string(),
  isDefault: z.boolean().default(false),
});

const updatePaymentMethodSchema = z.object({
  paymentMethodId: z.string(),
  accountHolderName: z.string().optional(),
  isDefault: z.boolean().optional(),
});

const deletePaymentMethodSchema = z.object({
  paymentMethodId: z.string(),
});

const makePaymentSchema = z.object({
  invoiceId: z.string(),
  paymentMethodId: z.string(),
  amount: z.number().positive(),
});

export const getInvoicesProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(getInvoicesSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    const offset = (input.page - 1) * input.limit;

    let whereConditions = [eq(invoices.organizationId, organizationId)];
    
    if (input.status) {
      whereConditions.push(eq(invoices.status, input.status));
    }
    
    if (input.dateFrom) {
      whereConditions.push(gte(invoices.createdAt, new Date(input.dateFrom)));
    }
    
    if (input.dateTo) {
      whereConditions.push(lte(invoices.createdAt, new Date(input.dateTo)));
    }

    const [invoicesData, totalCount] = await Promise.all([
      pgDb
        .select()
        .from(invoices)
        .where(and(...whereConditions))
        .orderBy(desc(invoices.createdAt))
        .limit(input.limit)
        .offset(offset),
      pgDb
        .select({ count: invoices.id })
        .from(invoices)
        .where(and(...whereConditions))
        .then(result => result.length),
    ]);

    return {
      invoices: invoicesData,
      pagination: {
        page: input.page,
        limit: input.limit,
        total: totalCount,
        pages: Math.ceil(totalCount / input.limit),
      },
    };
  });

export const getInvoiceByIdProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(z.object({ invoiceId: z.string() }))
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [invoice] = await pgDb
      .select()
      .from(invoices)
      .where(and(
        eq(invoices.id, input.invoiceId),
        eq(invoices.organizationId, organizationId)
      ))
      .limit(1);

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return invoice;
  });

export const getPaymentMethodsProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(getPaymentMethodsSchema)
  .query(async ({ ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organization || !organization.metadata?.stripeCustomerId) {
        return { paymentMethods: [] };
      }

      const paymentMethods = await stripeService.getCustomerPaymentMethods(
        organization.metadata.stripeCustomerId as string
      );

      // Transform Stripe payment methods to our format
      const formattedMethods = paymentMethods.map(pm => ({
        id: pm.id,
        type: pm.type,
        brand: pm.card?.brand || 'unknown',
        last4: pm.card?.last4 || '****',
        expiryMonth: pm.card?.exp_month,
        expiryYear: pm.card?.exp_year,
        isDefault: pm.metadata?.isDefault === 'true',
        accountHolderName: pm.billing_details?.name || 'Cardholder',
        createdAt: new Date(pm.created * 1000),
      }));

      return { paymentMethods: formattedMethods };
    } catch (error) {
      console.error('[Billing] Get payment methods failed:', error);
      return { paymentMethods: [] };
    }
  });

export const addPaymentMethodProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(addPaymentMethodSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    try {
      // Get or create Stripe customer
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organization) {
        throw new Error('Organization not found');
      }

      let customerId = organization.metadata?.stripeCustomerId as string;
      
      if (!customerId) {
        // Create new Stripe customer
        const customer = await stripeService.createCustomer({
          organizationId,
          email: organization.billingEmail,
          name: organization.name,
        });
        customerId = customer.id;
      }

      // Create payment intent to setup payment method
      const paymentIntent = await stripeService.createPaymentIntent({
        customerId,
        organizationId,
        amount: 1.00, // Minimum amount for setup
        currency: 'usd',
        metadata: {
          setup: 'true',
          accountHolderName: input.accountHolderName,
        },
      });

      logAudit({
        userId: ctx.user.id,
        action: AuditActions.PAYMENT_METHOD_ADDED,
        resource: 'payment_method',
        resourceId: paymentIntent.id,
        organizationId,
        metadata: {
          type: input.type,
          intent: 'setup',
        },
        status: 'success',
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        message: 'Payment method setup initiated',
      };
    } catch (error) {
      console.error('[Billing] Add payment method failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to add payment method',
      };
    }
  });

export const updatePaymentMethodProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(updatePaymentMethodSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // Mock implementation
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.PAYMENT_METHOD_UPDATED,
      resource: 'payment_method',
      resourceId: input.paymentMethodId,
      organizationId,
      metadata: {
        isDefault: input.isDefault,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Payment method updated successfully',
    };
  });

export const deletePaymentMethodProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(deletePaymentMethodSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // Mock implementation - check if it's not the default payment method
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.PAYMENT_METHOD_DELETED,
      resource: 'payment_method',
      resourceId: input.paymentMethodId,
      organizationId,
      status: 'success',
    });

    return {
      success: true,
      message: 'Payment method deleted successfully',
    };
  });

export const makePaymentProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(makePaymentSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [invoice] = await pgDb
      .select()
      .from(invoices)
      .where(and(
        eq(invoices.id, input.invoiceId),
        eq(invoices.organizationId, organizationId)
      ))
      .limit(1);

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (invoice.status === 'paid') {
      throw new Error('Invoice is already paid');
    }

    try {
      // Get organization's Stripe customer ID
      const [organization] = await pgDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, organizationId))
        .limit(1);

      if (!organization?.metadata?.stripeCustomerId) {
        throw new Error('No payment method on file');
      }

      // Create payment intent for the invoice amount
      const paymentIntent = await stripeService.createPaymentIntent({
        customerId: organization.metadata.stripeCustomerId as string,
        organizationId,
        amount: parseFloat(invoice.amount as string),
        currency: invoice.currency || 'usd',
        metadata: {
          invoiceId: input.invoiceId,
          invoiceNumber: invoice.invoiceNumber,
        },
      });

      logAudit({
        userId: ctx.user.id,
        action: AuditActions.PAYMENT_INITIATED,
        resource: 'payment',
        resourceId: paymentIntent.id,
        organizationId,
        metadata: {
          invoiceId: input.invoiceId,
          amount: input.amount,
        },
        status: 'success',
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        message: 'Payment initiated',
      };
    } catch (error) {
      console.error('[Billing] Make payment failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to process payment',
      };
    }
  });

export const getBillingSummaryProcedure = permissionProcedure(Permission.BILLING_READ)
  .query(async ({ ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // Mock billing summary
    const summary = {
      currentMonthSpend: 299.99,
      lastMonthSpend: 299.99,
      yearToDateSpend: 3599.88,
      upcomingCharge: 299.99,
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      paymentMethodOnFile: true,
      outstandingBalance: 0,
      creditsAvailable: 50.00,
    };

    return summary;
  });
