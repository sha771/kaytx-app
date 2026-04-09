import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { paymentWebhookService } from '../../services/payment-webhook-service';
import { db as pgDb } from '../../db/connection';
import { invoices, subscriptions, organizations, payments } from '../../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../lib/audit';

// Mock dependencies
jest.mock('../../db/connection');
jest.mock('../../lib/audit');

describe('PaymentWebhookService', () => {
  const mockOrganizationId = 'test-org-id';
  const mockCustomerId = 'cus_test123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processWebhook', () => {
    it('should process payment_intent.succeeded event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_test123',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_test123',
              amount: 2000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: mockOrganizationId,
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

      // Mock database operations
      (pgDb.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockResolvedValue(undefined),
      });

      (pgDb.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(pgDb.insert).toHaveBeenCalledWith(payments);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.PAYMENT_PROCESSED,
        resource: 'payment',
        resourceId: 'pi_test123',
        metadata: expect.any(Object),
        status: 'success',
      });
    });

    it('should process invoice.payment_succeeded event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_test456',
          type: 'invoice.payment_succeeded',
          data: {
            object: {
              id: 'in_test456',
              number: 'INV-2024-001',
              amount_paid: 2000,
              currency: 'usd',
              payment_intent: 'pi_test123',
              metadata: {
                organizationId: mockOrganizationId,
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

      (pgDb.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(pgDb.update).toHaveBeenCalledWith(invoices);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.INVOICE_PAID,
        resource: 'invoice',
        resourceId: 'in_test456',
        metadata: expect.any(Object),
        status: 'success',
      });
    });

    it('should process subscription.created event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_test789',
          type: 'subscription.created',
          data: {
            object: {
              id: 'sub_test789',
              status: 'active',
              current_period_end: Math.floor(Date.now() / 1000) + 2592000, // 30 days from now
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
                organizationId: mockOrganizationId,
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

      (pgDb.insert as jest.Mock).mockReturnValue({
        values: jest.fn().mockResolvedValue(undefined),
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(pgDb.insert).toHaveBeenCalledWith(subscriptions);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.SUBSCRIPTION_CREATED,
        resource: 'subscription',
        resourceId: 'sub_test789',
        metadata: expect.any(Object),
        status: 'success',
      });
    });

    it('should handle invalid signature', async () => {
      const mockRequest = {
        text: async () => '{}',
        headers: {
          get: jest.fn((name) => {
            if (name === 'stripe-signature') {
              return 'invalid_signature';
            }
            return null;
          }),
        },
      };

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid signature');
    });

    it('should handle missing signature', async () => {
      const mockRequest = {
        text: async () => '{}',
        headers: {
          get: jest.fn().mockReturnValue(null),
        },
      };

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(false);
      expect(result.message).toBe('No signature');
    });

    it('should handle processing errors gracefully', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_test_error',
          type: 'payment_intent.succeeded',
          data: {
            object: {
              id: 'pi_test_error',
              amount: 2000,
              currency: 'usd',
              status: 'succeeded',
              metadata: {
                organizationId: mockOrganizationId,
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

      // Mock database error
      (pgDb.insert as jest.Mock).mockImplementation(() => {
        throw new Error('Database error');
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Processing failed');
    });
  });

  describe('Customer events', () => {
    it('should handle customer.created event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_customer_created',
          type: 'customer.created',
          data: {
            object: {
              id: mockCustomerId,
              email: 'test@example.com',
              name: 'Test Customer',
              metadata: {
                organizationId: mockOrganizationId,
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

      (pgDb.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(pgDb.update).toHaveBeenCalledWith(organizations);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.CUSTOMER_CREATED,
        resource: 'customer',
        resourceId: mockCustomerId,
        metadata: { source: 'webhook' },
        status: 'success',
      });
    });

    it('should handle customer.deleted event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_customer_deleted',
          type: 'customer.deleted',
          data: {
            object: {
              id: mockCustomerId,
              metadata: {
                organizationId: mockOrganizationId,
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

      (pgDb.update as jest.Mock).mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.CUSTOMER_DELETED,
        resource: 'customer',
        resourceId: mockCustomerId,
        metadata: { source: 'webhook' },
        status: 'success',
      });
    });
  });

  describe('Payment method events', () => {
    it('should handle payment_method.attached event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_payment_method_attached',
          type: 'payment_method.attached',
          data: {
            object: {
              id: 'pm_test123',
              type: 'card',
              customer: mockCustomerId,
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

      // Mock organization lookup
      const mockOrganization = {
        id: mockOrganizationId,
        name: 'Test Organization',
      };
      (pgDb.select as jest.Mock).mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([mockOrganization]),
        }),
      });

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.PAYMENT_METHOD_ADDED,
        resource: 'payment_method',
        resourceId: 'pm_test123',
        metadata: { 
          type: 'card',
          source: 'webhook'
        },
        status: 'success',
      });
    });
  });

  describe('Charge events', () => {
    it('should handle charge.succeeded event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_charge_succeeded',
          type: 'charge.succeeded',
          data: {
            object: {
              id: 'ch_test123',
              amount: 2000,
              currency: 'usd',
              payment_method: 'pm_test123',
              metadata: {
                organizationId: mockOrganizationId,
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

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.PAYMENT_PROCESSED,
        resource: 'charge',
        resourceId: 'ch_test123',
        metadata: { 
          amount: 20,
          currency: 'usd',
          paymentMethodId: 'pm_test123',
          source: 'webhook'
        },
        status: 'success',
      });
    });

    it('should handle charge.failed event', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_charge_failed',
          type: 'charge.failed',
          data: {
            object: {
              id: 'ch_test456',
              amount: 2000,
              currency: 'usd',
              failure_message: 'Insufficient funds',
              metadata: {
                organizationId: mockOrganizationId,
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

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.PAYMENT_FAILED,
        resource: 'charge',
        resourceId: 'ch_test456',
        metadata: { 
          amount: 20,
          failureReason: 'Insufficient funds',
          source: 'webhook'
        },
        status: 'success',
      });
    });
  });

  describe('Checkout session events', () => {
    it('should handle checkout.session.completed event for payment', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_checkout_completed',
          type: 'checkout.session.completed',
          data: {
            object: {
              id: 'cs_test123',
              mode: 'payment',
              payment_status: 'paid',
              amount_total: 2000,
              currency: 'usd',
              metadata: {
                organizationId: mockOrganizationId,
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

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.PAYMENT_PROCESSED,
        resource: 'checkout_session',
        resourceId: 'cs_test123',
        metadata: { 
          amount: 20,
          currency: 'usd',
          source: 'webhook'
        },
        status: 'success',
      });
    });

    it('should handle checkout.session.completed event for subscription', async () => {
      const mockRequest = {
        text: async () => JSON.stringify({
          id: 'evt_checkout_subscription',
          type: 'checkout.session.completed',
          data: {
            object: {
              id: 'cs_test456',
              mode: 'subscription',
              subscription: 'sub_test123',
              metadata: {
                organizationId: mockOrganizationId,
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

      const result = await paymentWebhookService.processWebhook(mockRequest);

      expect(result.success).toBe(true);
      expect(logAudit).toHaveBeenCalledWith({
        organizationId: mockOrganizationId,
        action: AuditActions.SUBSCRIPTION_CREATED,
        resource: 'checkout_session',
        resourceId: 'cs_test456',
        metadata: { 
          subscriptionId: 'sub_test123',
          source: 'webhook'
        },
        status: 'success',
      });
    });
  });
});
