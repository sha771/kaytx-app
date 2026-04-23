import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { generators } from '../property/generators';

// Mock Stripe
const mockStripe = {
  paymentIntents: {
    create: jest.fn(),
    confirm: jest.fn(),
    retrieve: jest.fn(),
    cancel: jest.fn(),
    list: jest.fn(),
  },
  customers: {
    create: jest.fn(),
    retrieve: jest.fn(),
    update: jest.fn(),
    del: jest.fn(),
    list: jest.fn(),
  },
  invoices: {
    create: jest.fn(),
    retrieve: jest.fn(),
    list: jest.fn(),
    pay: jest.fn(),
  },
  subscriptions: {
    create: jest.fn(),
    retrieve: jest.fn(),
    update: jest.fn(),
    cancel: jest.fn(),
    list: jest.fn(),
  },
  webhooks: {
    constructEvent: jest.fn(),
  },
  paymentMethods: {
    list: jest.fn(),
  },
  refunds: {
    create: jest.fn(),
  },
} as any;

jest.mock('stripe', () => {
  return jest.fn(() => mockStripe);
});

jest.mock('../../backend/db/connection', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

jest.mock('../../backend/db/drizzle-schema', () => ({
  payments: { id: 'payments' },
  subscriptions: { id: 'subscriptions' },
  customers: { id: 'customers' },
}));

jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
  AuditActions: {
    PAYMENT_CREATED: 'payment.created',
    PAYMENT_SUCCEEDED: 'payment.succeeded',
    PAYMENT_FAILED: 'payment.failed',
    SUBSCRIPTION_CREATED: 'subscription.created',
    SUBSCRIPTION_CANCELLED: 'subscription.cancelled',
  },
}));

// Import service after mocking
const { StripeService } = require('../../backend/services/stripe-service');
const stripeService = new StripeService();

describe('StripeService Enhanced Tests', () => {
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOrganizationId = 'org-123';
    mockUserId = 'user-123';
    
    // Reset all Stripe mocks
    Object.values(mockStripe).forEach(service => {
      if (typeof service === 'object' && service !== null) {
        Object.values(service).forEach(method => {
          if (typeof method === 'function') {
            method.mockReset();
          }
        });
      }
    });
  });

  describe('Payment Intent Creation', () => {
    it('should create payment intent successfully', async () => {
      const paymentData = {
        amount: 20.00, // $20.00 (not cents)
        currency: 'usd',
        metadata: { orderId: 'order-123' },
      };

      const expectedPaymentIntent = {
        id: 'pi_123',
        organizationId: mockOrganizationId,
        amount: 20.00,
        currency: 'usd',
        status: 'pending',
        clientSecret: 'pi_123_secret_abc',
        metadata: { orderId: 'order-123', organizationId: mockOrganizationId },
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      };

      mockStripe.paymentIntents.create.mockResolvedValue(expectedPaymentIntent);

      const result = await stripeService.createPaymentIntent(mockOrganizationId, paymentData);

      expect(result).toMatchObject({
        id: 'pi_123',
        amount: 20.00,
        currency: 'usd',
        status: 'pending',
        clientSecret: 'pi_123_secret_abc',
      });
      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 2000, // Converted to cents
        currency: 'usd',
        metadata: { 
          organizationId: mockOrganizationId,
          orderId: 'order-123',
        },
        automatic_payment_methods: { enabled: true },
      });
    });

    it('should validate payment amount', async () => {
      const invalidPaymentData = {
        amount: 0, // Invalid amount
        currency: 'usd',
      };

      await expect(
        stripeService.createPaymentIntent(mockOrganizationId, invalidPaymentData)
      ).rejects.toThrow('Amount must be greater than 0');
    });

    it('should validate currency', async () => {
      const invalidPaymentData = {
        amount: 2000,
        currency: 'invalid',
      };

      await expect(
        stripeService.createPaymentIntent(mockOrganizationId, invalidPaymentData)
      ).rejects.toThrow('Invalid currency');
    });

    it('should handle Stripe API errors', async () => {
      const paymentData = {
        amount: 2000,
        currency: 'usd',
      };

      mockStripe.paymentIntents.create.mockRejectedValue(new Error('Stripe API error'));

      await expect(
        stripeService.createPaymentIntent(mockOrganizationId, paymentData)
      ).rejects.toThrow('Stripe API error');
    });
  });

  describe('Payment Intent Confirmation', () => {
    it('should confirm payment intent successfully', async () => {
      const paymentIntentId = 'pi_123';
      const paymentMethodId = 'pm_123';

      const expectedPaymentIntent = {
        id: paymentIntentId,
        status: 'succeeded',
        amount: 2000,
        currency: 'usd',
        charges: {
          data: [{
            id: 'ch_123',
            amount: 2000,
            status: 'succeeded',
            payment_method: paymentMethodId,
          }]
        },
      };

      mockStripe.paymentIntents.confirm.mockResolvedValue(expectedPaymentIntent);

      const result = await stripeService.confirmPaymentIntent(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      expect(result).toMatchObject({
        id: paymentIntentId,
        status: 'succeeded',
        amount: 2000,
      });
      expect(mockStripe.paymentIntents.confirm).toHaveBeenCalledWith(paymentIntentId, {
        payment_method: paymentMethodId,
      });
    });

    it('should handle payment confirmation failure', async () => {
      const paymentIntentId = 'pi_123';
      const paymentMethodId = 'pm_123';

      const failedPaymentIntent = {
        id: paymentIntentId,
        status: 'requires_payment_method',
        last_payment_error: {
          message: 'Your card was declined.',
          code: 'card_declined',
        },
      };

      mockStripe.paymentIntents.confirm.mockResolvedValue(failedPaymentIntent);

      const result = await stripeService.confirmPaymentIntent(paymentIntentId, {
        payment_method: paymentMethodId,
      });

      expect(result.status).toBe('requires_payment_method');
      expect(result.last_payment_error).toBeDefined();
    });
  });

  describe('Customer Management', () => {
    it('should create customer successfully', async () => {
      const customerData = {
        email: 'customer@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        metadata: { userId: mockUserId },
      };

      const expectedCustomer = {
        id: 'cus_123',
        email: 'customer@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        metadata: { userId: mockUserId, organizationId: mockOrganizationId },
        created: Math.floor(Date.now() / 1000),
      };

      mockStripe.customers.create.mockResolvedValue(expectedCustomer);

      const result = await stripeService.createCustomer(mockOrganizationId, customerData);

      expect(result).toMatchObject({
        id: 'cus_123',
        email: 'customer@example.com',
        name: 'John Doe',
        phone: '+1234567890',
      });
      expect(mockStripe.customers.create).toHaveBeenCalledWith({
        email: 'customer@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        metadata: { userId: mockUserId, organizationId: mockOrganizationId },
      });
    });

    it('should retrieve customer successfully', async () => {
      const customerId = 'cus_123';
      const expectedCustomer = {
        id: customerId,
        email: 'customer@example.com',
        name: 'John Doe',
      };

      mockStripe.customers.retrieve.mockResolvedValue(expectedCustomer);

      const result = await stripeService.getCustomer(customerId);

      expect(result).toMatchObject(expectedCustomer);
      expect(mockStripe.customers.retrieve).toHaveBeenCalledWith(customerId);
    });

    it('should update customer successfully', async () => {
      const customerId = 'cus_123';
      const updateData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      const expectedCustomer = {
        id: customerId,
        name: 'Jane Doe',
        email: 'jane@example.com',
      };

      mockStripe.customers.update.mockResolvedValue(expectedCustomer);

      const result = await stripeService.updateCustomer(customerId, updateData);

      expect(result).toMatchObject(expectedCustomer);
      expect(mockStripe.customers.update).toHaveBeenCalledWith(customerId, updateData);
    });

    it('should delete customer successfully', async () => {
      const customerId = 'cus_123';
      const deletedCustomer = {
        id: customerId,
        deleted: true,
      };

      mockStripe.customers.del.mockResolvedValue(deletedCustomer);

      const result = await stripeService.deleteCustomer(customerId);

      expect(result).toMatchObject({
        id: customerId,
        deleted: true,
      });
      expect(mockStripe.customers.del).toHaveBeenCalledWith(customerId);
    });
  });

  describe('Subscription Management', () => {
    it('should create subscription successfully', async () => {
      const subscriptionData = {
        customerId: 'cus_123',
        priceId: 'price_123',
        paymentMethodId: 'pm_123',
        metadata: { planType: 'pro' },
      };

      const expectedSubscription = {
        id: 'sub_123',
        customer: 'cus_123',
        status: 'active',
        items: {
          data: [{
            id: 'si_123',
            price: { id: 'price_123', unit_amount: 2000 },
            quantity: 1,
          }],
        },
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        metadata: { planType: 'pro', organizationId: mockOrganizationId },
      };

      mockStripe.subscriptions.create.mockResolvedValue(expectedSubscription);

      const result = await stripeService.createSubscription(mockOrganizationId, subscriptionData);

      expect(result).toMatchObject({
        id: 'sub_123',
        customer: 'cus_123',
        status: 'active',
      });
      expect(mockStripe.subscriptions.create).toHaveBeenCalledWith({
        customer: 'cus_123',
        items: [{ price: 'price_123' }],
        default_payment_method: 'pm_123',
        metadata: { planType: 'pro', organizationId: mockOrganizationId },
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
    });

    it('should cancel subscription successfully', async () => {
      const subscriptionId = 'sub_123';
      const expectedSubscription = {
        id: subscriptionId,
        status: 'canceled',
        canceled_at: Math.floor(Date.now() / 1000),
      };

      mockStripe.subscriptions.cancel.mockResolvedValue(expectedSubscription);

      const result = await stripeService.cancelSubscription(subscriptionId);

      expect(result).toMatchObject({
        id: subscriptionId,
        status: 'canceled',
      });
      expect(mockStripe.subscriptions.cancel).toHaveBeenCalledWith(subscriptionId);
    });

    it('should retrieve subscription successfully', async () => {
      const subscriptionId = 'sub_123';
      const expectedSubscription = {
        id: subscriptionId,
        customer: 'cus_123',
        status: 'active',
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      };

      mockStripe.subscriptions.retrieve.mockResolvedValue(expectedSubscription);

      const result = await stripeService.getSubscription(subscriptionId);

      expect(result).toMatchObject(expectedSubscription);
      expect(mockStripe.subscriptions.retrieve).toHaveBeenCalledWith(subscriptionId);
    });
  });

  describe('Invoice Management', () => {
    it('should create invoice successfully', async () => {
      const invoiceData = {
        customerId: 'cus_123',
        metadata: { orderId: 'order-123' },
      };

      const expectedInvoice = {
        id: 'in_123',
        customer: 'cus_123',
        status: 'draft',
        amount_due: 2000,
        currency: 'usd',
        metadata: { orderId: 'order-123', organizationId: mockOrganizationId },
      };

      mockStripe.invoices.create.mockResolvedValue(expectedInvoice);

      const result = await stripeService.createInvoice(mockOrganizationId, invoiceData);

      expect(result).toMatchObject({
        id: 'in_123',
        customer: 'cus_123',
        status: 'draft',
        amount_due: 2000,
      });
      expect(mockStripe.invoices.create).toHaveBeenCalledWith({
        customer: 'cus_123',
        metadata: { orderId: 'order-123', organizationId: mockOrganizationId },
      });
    });

    it('should pay invoice successfully', async () => {
      const invoiceId = 'in_123';
      const expectedInvoice = {
        id: invoiceId,
        status: 'paid',
        amount_paid: 2000,
        currency: 'usd',
      };

      mockStripe.invoices.pay.mockResolvedValue(expectedInvoice);

      const result = await stripeService.payInvoice(invoiceId);

      expect(result).toMatchObject({
        id: invoiceId,
        status: 'paid',
        amount_paid: 2000,
      });
      expect(mockStripe.invoices.pay).toHaveBeenCalledWith(invoiceId);
    });
  });

  describe('Webhook Handling', () => {
    it('should construct webhook event successfully', async () => {
      const payload = JSON.stringify({
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            amount: 2000,
            currency: 'usd',
            status: 'succeeded',
          },
        },
      });

      const signature = 'stripe-signature';
      const secret = 'whsec_test';

      const expectedEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_123',
            amount: 2000,
            currency: 'usd',
            status: 'succeeded',
          },
        },
      };

      mockStripe.webhooks.constructEvent.mockReturnValue(expectedEvent);

      const result = stripeService.constructWebhookEvent(payload, signature, secret);

      expect(result).toMatchObject(expectedEvent);
      expect(mockStripe.webhooks.constructEvent).toHaveBeenCalledWith(payload, signature, secret);
    });

    it('should handle webhook signature verification failure', () => {
      const payload = 'invalid payload';
      const signature = 'invalid signature';
      const secret = 'whsec_test';

      mockStripe.webhooks.constructEvent.mockImplementation(() => {
        throw new Error('No signature found');
      });

      expect(() => {
        stripeService.constructWebhookEvent(payload, signature, secret);
      }).toThrow('No signature found');
    });
  });

  describe('Payment Methods', () => {
    it('should retrieve payment methods for customer', async () => {
      const customerId = 'cus_123';
      const expectedPaymentMethods = {
        data: [
          {
            id: 'pm_123',
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025,
            },
          },
          {
            id: 'pm_456',
            type: 'card',
            card: {
              brand: 'mastercard',
              last4: '5555',
              exp_month: 6,
              exp_year: 2024,
            },
          },
        ],
      };

      mockStripe.paymentMethods = {
        list: jest.fn().mockResolvedValue(expectedPaymentMethods),
      };

      const result = await stripeService.getCustomerPaymentMethods(customerId);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'pm_123',
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
        },
      });
    });
  });

  describe('Error Handling and Validation', () => {
    it('should handle invalid customer ID', async () => {
      await expect(
        stripeService.getCustomer('')
      ).rejects.toThrow('Customer ID is required');
    });

    it('should handle invalid payment intent ID', async () => {
      await expect(
        stripeService.confirmPaymentIntent('', { payment_method: 'pm_123' })
      ).rejects.toThrow('Payment intent ID is required');
    });

    it('should handle invalid subscription ID', async () => {
      await expect(
        stripeService.cancelSubscription('')
      ).rejects.toThrow('Subscription ID is required');
    });

    it('should handle network timeouts', async () => {
      const paymentData = {
        amount: 2000,
        currency: 'usd',
      };

      mockStripe.paymentIntents.create.mockRejectedValue(new Error('ETIMEDOUT'));

      await expect(
        stripeService.createPaymentIntent(mockOrganizationId, paymentData)
      ).rejects.toThrow('ETIMEDOUT');
    });

    it('should handle rate limiting', async () => {
      const paymentData = {
        amount: 2000,
        currency: 'usd',
      };

      const rateLimitError = new Error('Rate limit exceeded');
      (rateLimitError as any).code = 'rate_limit_exceeded';

      mockStripe.paymentIntents.create.mockRejectedValue(rateLimitError);

      await expect(
        stripeService.createPaymentIntent(mockOrganizationId, paymentData)
      ).rejects.toThrow('Rate limit exceeded');
    });
  });

  describe('Refund Management', () => {
    it('should create refund successfully', async () => {
      const refundData = {
        paymentIntentId: 'pi_123',
        amount: 1000, // $10.00
        reason: 'requested_by_customer',
      };

      const expectedRefund = {
        id: 're_123',
        payment_intent: 'pi_123',
        amount: 1000,
        currency: 'usd',
        status: 'succeeded',
        reason: 'requested_by_customer',
      };

      mockStripe.refunds = {
        create: jest.fn().mockResolvedValue(expectedRefund),
      };

      const result = await stripeService.createRefund(refundData);

      expect(result).toMatchObject({
        id: 're_123',
        payment_intent: 'pi_123',
        amount: 1000,
        status: 'succeeded',
      });
      expect(mockStripe.refunds.create).toHaveBeenCalledWith({
        payment_intent: 'pi_123',
        amount: 1000,
        reason: 'requested_by_customer',
      });
    });

    it('should handle partial refund', async () => {
      const refundData = {
        paymentIntentId: 'pi_123',
        amount: 500, // Partial refund
        reason: 'duplicate',
      };

      const expectedRefund = {
        id: 're_456',
        payment_intent: 'pi_123',
        amount: 500,
        currency: 'usd',
        status: 'succeeded',
        reason: 'duplicate',
      };

      mockStripe.refunds.create.mockResolvedValue(expectedRefund);

      const result = await stripeService.createRefund(refundData);

      expect(result.amount).toBe(500);
      expect(result.status).toBe('succeeded');
    });
  });
});
