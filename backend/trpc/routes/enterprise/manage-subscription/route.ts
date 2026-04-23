import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { subscriptions } from '../../../../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { Permission } from '../../../../lib/rbac';

const updateSubscriptionSchema = z.object({
  plan: z.enum(['starter', 'professional', 'enterprise']),
  billingCycle: z.enum(['monthly', 'yearly']),
  paymentMethodId: z.string().optional(),
  promotionCode: z.string().optional(),
});

const cancelSubscriptionSchema = z.object({
  reason: z.string().optional(),
  feedback: z.string().optional(),
  immediateCancellation: z.boolean().default(false),
});

const pauseSubscriptionSchema = z.object({
  pauseDuration: z.number().min(1).max(90), // days
  reason: z.string().optional(),
});

const resumeSubscriptionSchema = z.object({
  planId: z.string().optional(),
});

export const updateSubscriptionProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(updateSubscriptionSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // Check current subscription
    const [currentSubscription] = await pgDb
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.organizationId, organizationId))
      .limit(1);

    if (!currentSubscription) {
      throw new Error('No active subscription found');
    }

    // Calculate new pricing
    const planPricing = {
      starter: { monthly: 99, yearly: 990 },
      professional: { monthly: 299, yearly: 2990 },
      enterprise: { monthly: 999, yearly: 9990 },
    };

    const basePrice = planPricing[input.plan][input.billingCycle];
    const discount = input.billingCycle === 'yearly' ? 0.1 : 0; // 10% yearly discount
    const finalPrice = basePrice * (1 - discount);

    // Update subscription
    const [updatedSubscription] = await pgDb
      .update(subscriptions)
      .set({
        plan: input.plan,
        billingCycle: input.billingCycle,
        amount: finalPrice,
        status: 'active',
        updatedAt: new Date(),
        nextBillingDate: new Date(Date.now() + (input.billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000),
      } as any)
      .where(and(eq(subscriptions.id, currentSubscription.id), eq(subscriptions.organizationId, organizationId)))
      .returning();

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.SUBSCRIPTION_UPDATED,
      resource: 'subscription',
      resourceId: updatedSubscription.id,
      organizationId,
      metadata: {
        oldPlan: currentSubscription.plan,
        newPlan: input.plan,
        billingCycle: input.billingCycle,
      },
      status: 'success',
    });

    return {
      success: true,
      subscription: updatedSubscription,
      message: `Subscription updated to ${input.plan} plan`,
    };
  });

export const cancelSubscriptionProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(cancelSubscriptionSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [subscription] = await pgDb
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.organizationId, organizationId))
      .limit(1);

    if (!subscription) {
      throw new Error('No active subscription found');
    }

    const cancellationDate = input.immediateCancellation 
      ? new Date()
      : subscription.nextBillingDate;

    await pgDb
      .update(subscriptions)
      .set({
        status: 'cancelled',
        cancelledAt: new Date(),
        cancellationReason: input.reason,
        cancellationFeedback: input.feedback,
        nextBillingDate: cancellationDate,
        updatedAt: new Date(),
      } as any)
      .where(and(eq(subscriptions.id, subscription.id), eq(subscriptions.organizationId, organizationId)));

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.SUBSCRIPTION_CANCELLED,
      resource: 'subscription',
      resourceId: subscription.id,
      organizationId,
      metadata: {
        reason: input.reason,
        immediate: input.immediateCancellation,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Subscription cancelled successfully',
      effectiveDate: cancellationDate,
    };
  });

export const pauseSubscriptionProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(pauseSubscriptionSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [subscription] = await pgDb
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.organizationId, organizationId))
      .limit(1);

    if (!subscription) {
      throw new Error('No active subscription found');
    }

    const resumeDate = new Date(Date.now() + input.pauseDuration * 24 * 60 * 60 * 1000);

    await pgDb
      .update(subscriptions)
      .set({
        status: 'paused',
        pausedAt: new Date(),
        resumeDate,
        pauseReason: input.reason,
        updatedAt: new Date(),
      } as any)
      .where(and(eq(subscriptions.id, subscription.id), eq(subscriptions.organizationId, organizationId)));

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.SUBSCRIPTION_PAUSED,
      resource: 'subscription',
      resourceId: subscription.id,
      organizationId,
      metadata: {
        pauseDuration: input.pauseDuration,
        reason: input.reason,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Subscription paused successfully',
      resumeDate,
    };
  });

export const resumeSubscriptionProcedure = permissionProcedure(Permission.BILLING_UPDATE)
  .input(resumeSubscriptionSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [subscription] = await pgDb
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.organizationId, organizationId))
      .limit(1);

    if (!subscription) {
      throw new Error('No subscription found');
    }

    if (subscription.status !== 'paused') {
      throw new Error('Subscription is not paused');
    }

    await pgDb
      .update(subscriptions)
      .set({
        status: 'active',
        resumedAt: new Date(),
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        updatedAt: new Date(),
      } as any)
      .where(and(eq(subscriptions.id, subscription.id), eq(subscriptions.organizationId, organizationId)));

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.SUBSCRIPTION_RESUMED,
      resource: 'subscription',
      resourceId: subscription.id,
      organizationId,
      status: 'success',
    });

    return {
      success: true,
      message: 'Subscription resumed successfully',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
  });
