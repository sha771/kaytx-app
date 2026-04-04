import { protectedProcedure } from '../../../create-context';

const mockSubscriptions = [
  {
    id: '1',
    organizationId: '1',
    plan: 'enterprise',
    status: 'active',
    billingCycle: 'monthly',
    amount: 2499,
    currency: 'USD',
    nextBillingDate: new Date('2025-01-15').toISOString(),
    features: {
      maxUsers: -1,
      maxStorage: -1,
      advancedAnalytics: true,
      prioritySupport: true,
      customIntegrations: true,
    },
  },
];

export const getSubscriptionProcedure = protectedProcedure.query(async ({ ctx }) => {
  console.log('[Enterprise] Getting subscription for user:', ctx.user.id);
  
  const subscription = mockSubscriptions.find(
    (s) => s.organizationId === ctx.user.organizationId || s.organizationId === '1'
  );

  return subscription || null;
});
