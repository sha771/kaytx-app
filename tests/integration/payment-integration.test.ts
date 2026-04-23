import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { setupTestDatabase, cleanupTestDatabase } from '../setup/integration.setup';
import { paymentWebhookService } from '../../backend/services/payment-webhook-service';
import { db } from '../../backend/db/connection';
import { organizations, invoices, payments, subscriptions } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { TestContainer, StartedTestContainer } from 'testcontainers';

describe('Payment Integration Tests', () => {
  let postgresContainer: StartedTestContainer;
  let testDb: any;

  beforeAll(async () => {
    const setup = await setupTestDatabase();
    postgresContainer = setup.container;
    testDb = setup.db;
  });

  afterAll(async () => {
    await cleanupTestDatabase(postgresContainer);
  });

  beforeEach(async () => {
    // Clean up test data
    await testDb.delete(payments);
    await testDb.delete(subscriptions);
    await testDb.delete(invoices);
    await testDb.delete(organizations);
  });

  describe('Payment Webhook Processing', () => {
    it('should process complete payment workflow', async () => {
      // Create test organization
      const organization = await testDb.insert(organizations).values({
        id: 'test-org-123',
        name: 'Test Organization',
        email: 'test@example.com',
        status: 'active',
        stripeCustomerId: 'cus_test123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Create test invoice
      const invoice = await testDb.insert(invoices).values({
        id: 'inv_test123',
        organizationId: organization.id,
        number: 'INV-2024-001',
        amount: 2000,
        currency: 'usd',
        status: 'pending',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Process payment intent succeeded webhook
      const paymentIntentRequest = {
        text: async () => JSON.stringify({
          id: 'evt_payment_success',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_test123',
              amount: 2000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: organization.id,
                invoiceId: invoice.id
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const result = await paymentWebhookService.processWebhook(paymentIntentRequest);
      expect(result.success).toBe(true);

      // Verify payment record was created
      const payments = await testDb.select().from(payments)
        .where(eq(payments.organizationId, organization.id));
      expect(payments).toHaveLength(1);
      expect(payments[0].amount).toBe(2000);
      expect(payments[0].currency).toBe('usd');
      expect(payments[0].status).toBe('succeeded');

      // Verify invoice status was updated
      const updatedInvoice = await testDb.select().from(invoices)
        .where(eq(invoices.id, invoice.id))
        .then(rows => rows[0]);
      expect(updatedInvoice.status).toBe('paid');
    });

    it('should handle subscription lifecycle', async () => {
      // Create test organization
      const organization = await testDb.insert(organizations).values({
        id: 'test-org-subscription',
        name: 'Subscription Test Org',
        email: 'subscription@example.com',
        status: 'active',
        stripeCustomerId: 'cus_subscription123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Process subscription created webhook
      const subscriptionRequest = {
        text: async () => JSON.stringify({
          id: 'evt_subscription_created',
          type: 'subscription.created',
          data: {
            object: {
              id: 'sub_test123',
              status: 'active',
              current_period_end: Math.floor(Date.now() / 1000) + 2592000,
              items: [
                {
                  price: {
                    id: 'price_test123',
                    unit_amount: 9900,
                    currency: 'usd',
                  },
                  quantity: 1,
                },
              ],
              metadata: {
                organizationId: organization.id,
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const createResult = await paymentWebhookService.processWebhook(subscriptionRequest);
      expect(createResult.success).toBe(true);

      // Verify subscription was created
      const subscriptions = await testDb.select().from(subscriptions)
        .where(eq(subscriptions.organizationId, organization.id));
      expect(subscriptions).toHaveLength(1);
      expect(subscriptions[0].status).toBe('active');
      expect(subscriptions[0].amount).toBe(9900);

      // Process subscription updated webhook
      const updateRequest = {
        text: async () => JSON.stringify({
          id: 'evt_subscription_updated',
          type: 'subscription.updated',
          data: {
            object: {
              id: 'sub_test123',
              status: 'past_due',
              current_period_end: Math.floor(Date.now() / 1000) + 2592000,
              items: [
                {
                  price: {
                    id: 'price_test123',
                    unit_amount: 9900,
                    currency: 'usd',
                  },
                  quantity: 1,
                },
              ],
              metadata: {
                organizationId: organization.id,
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const updateResult = await paymentWebhookService.processWebhook(updateRequest);
      expect(updateResult.success).toBe(true);

      // Verify subscription was updated
      const updatedSubscriptions = await testDb.select().from(subscriptions)
        .where(eq(subscriptions.organizationId, organization.id));
      expect(updatedSubscriptions[0].status).toBe('past_due');
    });

    it('should handle payment failures and retries', async () => {
      // Create test organization
      const organization = await testDb.insert(organizations).values({
        id: 'test-org-failure',
        name: 'Failure Test Org',
        email: 'failure@example.com',
        status: 'active',
        stripeCustomerId: 'cus_failure123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Process payment failed webhook
      const failureRequest = {
        text: async () => JSON.stringify({
          id: 'evt_payment_failed',
          type: 'payment_intent.payment_failed',
          data: {
            object: {
              id: 'pi_failed123',
              amount: 2000,
              currency: 'usd',
              status: 'requires_payment_method',
              last_payment_error: {
                message: 'Your card was declined.',
                code: 'card_declined'
              },
              metadata: {
                organizationId: organization.id,
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const result = await paymentWebhookService.processWebhook(failureRequest);
      expect(result.success).toBe(true);

      // Verify failed payment record was created
      const payments = await testDb.select().from(payments)
        .where(eq(payments.organizationId, organization.id));
      expect(payments).toHaveLength(1);
      expect(payments[0].status).toBe('failed');
      expect(payments[0].failureReason).toBe('Your card was declined.');

      // Process retry payment
      const retryRequest = {
        text: async () => JSON.stringify({
          id: 'evt_payment_retry',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_retry123',
              amount: 2000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: organization.id,
                originalPaymentId: 'pi_failed123'
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const retryResult = await paymentWebhookService.processWebhook(retryRequest);
      expect(retryResult.success).toBe(true);

      // Verify retry payment was created
      const retryPayments = await testDb.select().from(payments)
        .where(eq(payments.organizationId, organization.id));
      expect(retryPayments).toHaveLength(2);
      expect(retryPayments[1].status).toBe('succeeded');
    });
  });

  describe('Cross-Service Integration', () => {
    it('should integrate with notification service for payment events', async () => {
      // Mock notification service
      const mockNotificationService = {
        sendPaymentConfirmation: jest.fn().mockResolvedValue(true),
        sendPaymentFailure: jest.fn().mockResolvedValue(true),
        sendSubscriptionUpdate: jest.fn().mockResolvedValue(true)
      };

      jest.doMock('../../backend/services/notification-service', () => mockNotificationService);

      const organization = await testDb.insert(organizations).values({
        id: 'test-org-notification',
        name: 'Notification Test Org',
        email: 'notify@example.com',
        status: 'active',
        stripeCustomerId: 'cus_notify123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Process successful payment
      const successRequest = {
        text: async () => JSON.stringify({
          id: 'evt_payment_notify',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_notify123',
              amount: 5000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: organization.id,
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const result = await paymentWebhookService.processWebhook(successRequest);
      expect(result.success).toBe(true);

      // Verify notification was sent
      expect(mockNotificationService.sendPaymentConfirmation).toHaveBeenCalledWith({
        organizationId: organization.id,
        amount: 5000,
        currency: 'usd',
        paymentId: 'pi_notify123'
      });
    });

    it('should maintain data consistency across services', async () => {
      // Create organization with subscription
      const organization = await testDb.insert(organizations).values({
        id: 'test-org-consistency',
        name: 'Consistency Test Org',
        email: 'consistency@example.com',
        status: 'active',
        stripeCustomerId: 'cus_consistency123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Create invoice
      const invoice = await testDb.insert(invoices).values({
        id: 'inv_consistency123',
        organizationId: organization.id,
        number: 'INV-CONSISTENCY-001',
        amount: 3000,
        currency: 'usd',
        status: 'pending',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Process payment
      const paymentRequest = {
        text: async () => JSON.stringify({
          id: 'evt_consistency_payment',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_consistency123',
              amount: 3000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: organization.id,
                invoiceId: invoice.id
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const result = await paymentWebhookService.processWebhook(paymentRequest);
      expect(result.success).toBe(true);

      // Verify data consistency across all tables
      const finalPayments = await testDb.select().from(payments)
        .where(eq(payments.organizationId, organization.id));
      const finalInvoice = await testDb.select().from(invoices)
        .where(eq(invoices.id, invoice.id))
        .then(rows => rows[0]);
      const finalOrganization = await testDb.select().from(organizations)
        .where(eq(organizations.id, organization.id))
        .then(rows => rows[0]);

      expect(finalPayments).toHaveLength(1);
      expect(finalPayments[0].amount).toBe(3000);
      expect(finalInvoice.status).toBe('paid');
      expect(finalOrganization.updatedAt.getTime()).toBeGreaterThan(organization.updatedAt.getTime());
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle database connection failures gracefully', async () => {
      // Mock database failure
      const originalDb = { ...testDb };
      testDb.insert = jest.fn().mockRejectedValue(new Error('Database connection failed'));

      const organization = await originalDb.insert(organizations).values({
        id: 'test-org-db-failure',
        name: 'DB Failure Test Org',
        email: 'dbfailure@example.com',
        status: 'active',
        stripeCustomerId: 'cus_dbfailure123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      const failureRequest = {
        text: async () => JSON.stringify({
          id: 'evt_db_failure',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_db_failure',
              amount: 1000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: organization.id,
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      const result = await paymentWebhookService.processWebhook(failureRequest);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Processing failed');

      // Restore original database
      Object.assign(testDb, originalDb);
    });

    it('should handle webhook replay scenarios', async () => {
      const organization = await testDb.insert(organizations).values({
        id: 'test-org-replay',
        name: 'Replay Test Org',
        email: 'replay@example.com',
        status: 'active',
        stripeCustomerId: 'cus_replay123',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      const replayRequest = {
        text: async () => JSON.stringify({
          id: 'evt_replay_test',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_replay123',
              amount: 1500,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: organization.id,
              },
            },
          },
        }),
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 't=1234567890,v1=test_signature';
            }
            return null;
          }),
        },
      };

      // Process webhook twice
      const result1 = await paymentWebhookService.processWebhook(replayRequest);
      const result2 = await paymentWebhookService.processWebhook(replayRequest);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);

      // Should only create one payment record (idempotency)
      const payments = await testDb.select().from(payments)
        .where(eq(payments.organizationId, organization.id));
      expect(payments).toHaveLength(1);
    });
  });
});
