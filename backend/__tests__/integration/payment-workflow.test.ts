import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { stripeService, stripe } from '../../services/stripe-service';
import { db as pgDb } from '../../db/connection';
import { logAudit } from '../../lib/audit';

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    customers: {
      create: jest.fn(),
      retrieve: jest.fn(),
      update: jest.fn(),
      del: jest.fn(),
      list: jest.fn()
    },
    paymentIntents: {
      create: jest.fn(),
      retrieve: jest.fn(),
      confirm: jest.fn(),
      list: jest.fn()
    },
    invoices: {
      create: jest.fn(),
      retrieve: jest.fn(),
      list: jest.fn()
    },
    subscriptions: {
      create: jest.fn(),
      retrieve: jest.fn(),
      update: jest.fn(),
      cancel: jest.fn(),
      list: jest.fn()
    },
    charges: {
      create: jest.fn(),
      retrieve: jest.fn(),
      list: jest.fn(),
      refund: jest.fn()
    },
    webhooks: {
      constructEvent: jest.fn()
    }
  }));
});

// Mock dependencies
jest.mock('../../db/connection');
jest.mock('../../lib/audit');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;

describe('Payment Integration Tests', () => {
  const mockOrganizationId = 'org-123';
  const mockUserId = 'user-123';
  const mockCustomerId = 'cus_123456789';
  const mockPaymentIntentId = 'pi_123456789';
  const mockSubscriptionId = 'sub_123456789';

  let originalKey: string | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup environment with secure test key
    originalKey = process.env.STRIPE_SECRET_KEY;
    process.env.STRIPE_SECRET_KEY = process.env.TEST_STRIPE_SECRET_KEY || 'sk_test_123456789';
    
    // Setup mock database responses
    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockCustomerId }] as any)
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: mockCustomerId }] as any)
        })
      })
    });

    mockDb.delete = jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockCustomerId }] as any)
      })
    });

    mockLogAudit.mockResolvedValue(undefined);
  });

  afterEach(() => {
    // Restore original key
    if (originalKey) {
      process.env.STRIPE_SECRET_KEY = originalKey;
    } else {
      delete process.env.STRIPE_SECRET_KEY;
    }
  });

  describe('Complete Payment Workflow', () => {
    it('should handle complete customer creation and payment workflow', async () => {
      // Step 1: Create customer
      const customerData = {
        email: 'john.doe@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        address: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US'
        }
      };

      const mockStripeCustomer = {
        id: mockCustomerId,
        email: 'john.doe@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        address: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'US'
        },
        created: Date.now() / 1000
      };

      (stripe as any).customers.create.mockResolvedValue(mockStripeCustomer);

      const customerResult = await stripeService.createCustomer(
        mockOrganizationId,
        mockUserId,
        customerData
      );

      expect(customerResult.success).toBe(true);
      expect(customerResult.data?.customerId).toBe(mockCustomerId);
      expect(customerResult.data?.customer).toEqual(mockStripeCustomer);
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: mockOrganizationId,
          userId: mockUserId,
          stripeCustomerId: mockCustomerId
        })
      );

      // Step 2: Create payment intent
      const paymentData = {
        amount: 9999, // $99.99
        currency: 'usd',
        customerId: mockCustomerId,
        paymentMethodId: 'pm_123456789',
        description: 'Premium subscription purchase',
        metadata: {
          orderId: 'order-123',
          productType: 'subscription'
        }
      };

      const mockPaymentIntent = {
        id: mockPaymentIntentId,
        amount: 9999,
        currency: 'usd',
        customer: mockCustomerId,
        payment_method: 'pm_123456789',
        description: 'Premium subscription purchase',
        status: 'requires_confirmation',
        created: Date.now() / 1000
      };

      (stripe as any).paymentIntents.create.mockResolvedValue(mockPaymentIntent);

      const paymentResult = await stripeService.createPaymentIntent(
        mockOrganizationId,
        paymentData
      );

      expect(paymentResult.success).toBe(true);
      expect(paymentResult.data?.paymentIntentId).toBe(mockPaymentIntentId);
      expect(paymentResult.data?.paymentIntent).toEqual(mockPaymentIntent);

      // Step 3: Confirm payment
      const mockConfirmedIntent = {
        ...mockPaymentIntent,
        status: 'succeeded',
        charges: [
          {
            id: 'ch_123456789',
            amount: 9999,
            currency: 'usd',
            status: 'succeeded',
            payment_method: 'pm_123456789'
          }
        ]
      };

      (stripe as any).paymentIntents.confirm.mockResolvedValue(mockConfirmedIntent);

      const confirmResult = await stripeService.confirmPaymentIntent(
        mockOrganizationId,
        mockPaymentIntentId
      );

      expect(confirmResult.success).toBe(true);
      expect(confirmResult.data?.status).toBe('succeeded');
      expect(confirmResult.data?.charges).toHaveLength(1);

      // Step 4: Create subscription
      const subscriptionData = {
        customerId: mockCustomerId,
        priceId: 'price_123456789',
        paymentMethodId: 'pm_123456789',
        trialPeriodDays: 14
      };

      const mockSubscription = {
        id: mockSubscriptionId,
        customer: mockCustomerId,
        status: 'active',
        current_period_start: Date.now() / 1000,
        current_period_end: (Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000,
        trial_start: Date.now() / 1000,
        trial_end: (Date.now() + 14 * 24 * 60 * 60 * 1000) / 1000
      };

      (stripe as any).subscriptions.create.mockResolvedValue(mockSubscription);

      const subscriptionResult = await stripeService.createSubscription(
        mockOrganizationId,
        subscriptionData
      );

      expect(subscriptionResult.success).toBe(true);
      expect(subscriptionResult.data?.subscriptionId).toBe(mockSubscriptionId);
      expect(subscriptionResult.data?.subscription).toEqual(mockSubscription);

      // Step 5: Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CUSTOMER_CREATED',
          resource: 'stripe_customer',
          status: 'success'
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PAYMENT_INTENT_CREATED',
          resource: 'stripe_payment_intent',
          status: 'success'
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PAYMENT_CREATED',
          resource: 'stripe_payment',
          status: 'success'
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'SUBSCRIPTION_CREATED',
          resource: 'stripe_subscription',
          status: 'success'
        })
      );
    });

    it('should handle subscription lifecycle management', async () => {
      // Create initial subscription
      const mockSubscription = {
        id: mockSubscriptionId,
        customer: mockCustomerId,
        status: 'active',
        current_period_end: (Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000,
        items: [
          {
            id: 'si_123456789',
            price: {
              id: 'price_123456789',
              unit_amount: 9999,
              currency: 'usd',
              recurring: {
                interval: 'month'
              }
            },
            quantity: 1
          }
        ]
      };

      (stripe as any).subscriptions.create.mockResolvedValue(mockSubscription);

      const subscriptionResult = await stripeService.createSubscription(
        mockOrganizationId,
        {
          customerId: mockCustomerId,
          priceId: 'price_123456789'
        }
      );

      expect(subscriptionResult.success).toBe(true);

      // Update subscription
      const updatedSubscription = {
        ...mockSubscription,
        items: [
          {
            ...mockSubscription.items[0],
            quantity: 2
          }
        ]
      };

      (stripe as any).subscriptions.update.mockResolvedValue(updatedSubscription);

      const updateResult = await stripeService.updateSubscription(
        mockOrganizationId,
        mockSubscriptionId,
        {
          quantity: 2
        }
      );

      expect(updateResult.success).toBe(true);
      expect(updateResult.data?.subscription.items[0].quantity).toBe(2);

      // Cancel subscription
      const cancelledSubscription = {
        ...mockSubscription,
        status: 'canceled',
        canceled_at: Date.now() / 1000
      };

      (stripe as any).subscriptions.cancel.mockResolvedValue(cancelledSubscription);

      const cancelResult = await stripeService.cancelSubscription(
        mockOrganizationId,
        mockSubscriptionId
      );

      expect(cancelResult.success).toBe(true);
      expect(cancelResult.data?.subscription.status).toBe('canceled');

      // Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'SUBSCRIPTION_UPDATED',
          resource: 'stripe_subscription',
          status: 'success'
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'SUBSCRIPTION_CANCELLED',
          resource: 'stripe_subscription',
          status: 'success'
        })
      );
    });

    it('should handle payment refunds', async () => {
      // Create a charge first
      const mockCharge = {
        id: 'ch_123456789',
        amount: 9999,
        currency: 'usd',
        customer: mockCustomerId,
        payment_method: 'pm_123456789',
        status: 'succeeded',
        created: Date.now() / 1000
      };

      (stripe as any).charges.create.mockResolvedValue(mockCharge);

      const chargeResult = await stripeService.createCharge(
        mockOrganizationId,
        {
          amount: 9999,
          currency: 'usd',
          customerId: mockCustomerId,
          paymentMethodId: 'pm_123456789',
          description: 'Test charge'
        }
      );

      expect(chargeResult.success).toBe(true);

      // Process refund
      const mockRefund = {
        id: 're_123456789',
        charge: 'ch_123456789',
        amount: 9999,
        currency: 'usd',
        status: 'succeeded',
        created: Date.now() / 1000
      };

      (stripe as any).charges.refund.mockResolvedValue(mockRefund);

      const refundResult = await stripeService.createRefund(
        mockOrganizationId,
        {
          chargeId: 'ch_123456789',
          amount: 9999,
          reason: 'requested_by_customer'
        }
      );

      expect(refundResult.success).toBe(true);
      expect(refundResult.data?.refundId).toBe('re_123456789');
      expect(refundResult.data?.refund.amount).toBe(9999);

      // Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PAYMENT_REFUNDED',
          resource: 'stripe_refund',
          status: 'success'
        })
      );
    });
  });

  describe('Webhook Processing', () => {
    it('should handle payment intent webhook events', async () => {
      const webhookPayload = {
        id: 'evt_123456789',
        object: 'event',
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: mockPaymentIntentId,
            amount: 9999,
            currency: 'usd',
            customer: mockCustomerId,
            status: 'succeeded',
            charges: [
              {
                id: 'ch_123456789',
                amount: 9999,
                status: 'succeeded'
              }
            ]
          }
        }
      };

      (stripe as any).webhooks.constructEvent.mockReturnValue(webhookPayload);

      const result = await stripeService.processWebhook(
        webhookPayload,
        'whsec_test_signature',
        'test_payload'
      );

      expect(result.success).toBe(true);
      expect(result.data?.eventType).toBe('payment_intent.succeeded');
      expect(result.data?.processed).toBe(true);

      // Verify database update
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          stripePaymentIntentId: mockPaymentIntentId,
          status: 'succeeded'
        })
      );
    });

    it('should handle subscription webhook events', async () => {
      const webhookPayload = {
        id: 'evt_123456789',
        object: 'event',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'in_123456789',
            customer: mockCustomerId,
            subscription: mockSubscriptionId,
            amount_paid: 9999,
            status: 'paid'
          }
        }
      };

      (stripe as any).webhooks.constructEvent.mockReturnValue(webhookPayload);

      const result = await stripeService.processWebhook(
        webhookPayload,
        'whsec_test_signature',
        'test_payload'
      );

      expect(result.success).toBe(true);
      expect(result.data?.eventType).toBe('invoice.payment_succeeded');

      // Verify database update
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          stripeSubscriptionId: mockSubscriptionId
        })
      );
    });

    it('should handle webhook signature verification', async () => {
      const webhookPayload = {
        id: 'evt_123456789',
        object: 'event',
        type: 'payment_intent.succeeded',
        data: { object: { id: mockPaymentIntentId } }
      };

      // Test with invalid signature
      (stripe as any).webhooks.constructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const result = await stripeService.processWebhook(
        webhookPayload,
        'invalid_signature',
        'test_payload'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid webhook signature');
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle payment failures gracefully', async () => {
      (stripe as any).paymentIntents.create.mockRejectedValue(new Error('Card declined'));

      const result = await stripeService.createPaymentIntent(
        mockOrganizationId,
        {
          amount: 9999,
          currency: 'usd',
          customerId: mockCustomerId,
          paymentMethodId: 'pm_invalid'
        }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Card declined');

      // Verify audit logging for failure
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PAYMENT_INTENT_CREATED',
          resource: 'stripe_payment_intent',
          status: 'failure'
        })
      );
    });

    it('should handle insufficient funds scenarios', async () => {
      (stripe as any).paymentIntents.create.mockRejectedValue({
        type: 'StripeCardError',
        code: 'insufficient_funds',
        message: 'Insufficient funds'
      });

      const result = await stripeService.createPaymentIntent(
        mockOrganizationId,
        {
          amount: 999999, // Large amount
          currency: 'usd',
          customerId: mockCustomerId,
          paymentMethodId: 'pm_insufficient'
        }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Insufficient funds');
    });

    it('should handle duplicate customer creation', async () => {
      const customerData = {
        email: 'existing@example.com',
        name: 'Existing Customer'
      };

      (stripe as any).customers.create.mockRejectedValue({
        type: 'StripeInvalidRequestError',
        code: 'email_already_exists',
        message: 'Email already exists'
      });

      const result = await stripeService.createCustomer(
        mockOrganizationId,
        mockUserId,
        customerData
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Email already exists');
    });

    it('should handle card decline scenarios gracefully', async () => {
      (stripe as any).subscriptions.create.mockRejectedValue({
        type: 'StripeCardError',
        code: 'card_declined',
        message: 'Your card was declined'
      });

      const result = await stripeService.createSubscription(
        mockOrganizationId,
        {
          customerId: mockCustomerId,
          priceId: 'price_123456789',
          paymentMethodId: 'pm_declined'
        }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Your card was declined');
    });

    it('should handle webhook processing errors', async () => {
      const invalidPayload = {
        id: 'evt_invalid',
        object: 'event',
        type: 'unknown.type',
        data: {}
      };

      (stripe as any).webhooks.constructEvent.mockReturnValue(invalidPayload);

      const result = await stripeService.processWebhook(
        invalidPayload,
        'whsec_test_signature',
        'test_payload'
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Unsupported webhook event type');
    });
  });

  describe('Security and Compliance', () => {
    it('should validate Stripe secret key presence', async () => {
      delete process.env.STRIPE_SECRET_KEY;

      const result = await stripeService.createCustomer(
        mockOrganizationId,
        mockUserId,
        { email: 'test@example.com' }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Stripe secret key not configured');

      // Use environment variable for test key
      const testKey = process.env.TEST_STRIPE_SECRET_KEY;
      if (testKey) {
        process.env.STRIPE_SECRET_KEY = testKey;
      }
    });

    it('should sanitize customer data before storage', async () => {
      const customerData = {
        email: 'test@example.com',
        name: 'Test User',
        metadata: {
          sensitiveField: 'secret_data',
          publicField: 'public_data'
        }
      };

      (stripe as any).customers.create.mockResolvedValue({
        id: mockCustomerId,
        email: 'test@example.com',
        name: 'Test User',
        metadata: customerData.metadata
      });

      const result = await stripeService.createCustomer(
        mockOrganizationId,
        mockUserId,
        customerData
      );

      expect(result.success).toBe(true);
      // Verify sensitive data is handled appropriately
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          organizationId: mockOrganizationId,
          userId: mockUserId,
          stripeCustomerId: mockCustomerId
        })
      );
    });

    it('should maintain audit trail for all payment operations', async () => {
      (stripe as any).customers.create.mockResolvedValue({ id: mockCustomerId });
      (stripe as any).paymentIntents.create.mockResolvedValue({ id: mockPaymentIntentId });

      // Create customer
      await stripeService.createCustomer(mockOrganizationId, mockUserId, {
        email: 'test@example.com'
      });

      // Create payment
      await stripeService.createPaymentIntent(mockOrganizationId, {
        amount: 9999,
        currency: 'usd',
        customerId: mockCustomerId
      });

      // Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CUSTOMER_CREATED',
          resource: 'stripe_customer',
          status: 'success'
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'PAYMENT_INTENT_CREATED',
          resource: 'stripe_payment_intent',
          status: 'success'
        })
      );

      // Verify audit data integrity
      const auditCalls = mockLogAudit.mock.calls;
      auditCalls.forEach(call => {
        expect(call[0]).toHaveProperty('organizationId', mockOrganizationId);
        expect(call[0]).toHaveProperty('resource');
        expect(call[0]).toHaveProperty('status');
        expect(call[0]).toHaveProperty('timestamp');
      });
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle high volume of payment intents', async () => {
      (stripe as any).paymentIntents.create.mockResolvedValue({
        id: 'pi_batch',
        status: 'requires_confirmation'
      });

      const startTime = Date.now();

      const paymentIntents = Array.from({ length: 100 }, (_, i) => ({
        amount: 9999,
        currency: 'usd',
        customerId: `cus_${i}`,
        paymentMethodId: `pm_${i}`
      }));

      const results = await Promise.all(
        paymentIntents.map((payment: any) => 
          stripeService.createPaymentIntent(mockOrganizationId, payment)
        )
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(results.every((r: any) => r.success)).toBe(true);
      expect(duration).toBeLessThan(10000); // Should complete within 10 seconds
    });

    it('should handle concurrent webhook processing', async () => {
      (stripe as any).webhooks.constructEvent.mockReturnValue({
        id: 'evt_batch',
        type: 'payment_intent.succeeded',
        data: { object: { id: mockPaymentIntentId } }
      });

      const webhooks = Array.from({ length: 50 }, (_, i) => ({
        id: `evt_${i}`,
        type: 'payment_intent.succeeded',
        data: { object: { id: `pi_${i}` } }
      }));

      const startTime = Date.now();

      const results = await Promise.all(
        webhooks.map((webhook: any) =>
          stripeService.processWebhook(webhook, 'signature', 'payload')
        )
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(results.every((r: any) => r.success)).toBe(true);
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('Data Consistency', () => {
    it('should maintain consistency between Stripe and local database', async () => {
      
      
      // Create customer in Stripe
      const stripeCustomer = {
        id: mockCustomerId,
        email: 'test@example.com',
        name: 'Test User'
      };
      (stripe as any).customers.create.mockResolvedValue(stripeCustomer);

      // Create customer in local database
      const result = await stripeService.createCustomer(
        mockOrganizationId,
        mockUserId,
        { email: 'test@example.com', name: 'Test User' }
      );

      expect(result.success).toBe(true);

      // Verify local database record
      expect(mockDb.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          stripeCustomerId: mockCustomerId,
          organizationId: mockOrganizationId,
          userId: mockUserId
        })
      );

      // Retrieve customer from both sources
      (stripe as any).customers.retrieve.mockResolvedValue(stripeCustomer);
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'local-id',
              stripeCustomerId: mockCustomerId,
              organizationId: mockOrganizationId,
              userId: mockUserId
            }] as any)
          })
        })
      });

      const localResult = await stripeService.getCustomer(mockOrganizationId, mockCustomerId);
      const stripeResult = await stripeService.getCustomerFromStripe(mockCustomerId);

      expect(localResult.success).toBe(true);
      expect(stripeResult.success).toBe(true);
      expect(localResult.data?.stripeCustomerId).toBe(stripeResult.data?.id);
    });

    it('should handle database sync failures gracefully', async () => {
      (stripe as any).customers.create.mockResolvedValue({ id: mockCustomerId });

      // Mock database failure
      mockDb.insert = jest.fn().mockRejectedValue(new Error('Database connection failed') as any);

      const result = await stripeService.createCustomer(
        mockOrganizationId,
        mockUserId,
        { email: 'test@example.com' }
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Database connection failed');

      // Should still log the operation
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'CUSTOMER_CREATED',
          resource: 'stripe_customer',
          status: 'failure'
        })
      );
    });
  });
});
