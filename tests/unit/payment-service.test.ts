import { PaymentService, PaymentIntent } from '../../backend/services/payment-service';
import { db } from '../../backend/db/connection';
import { payments } from '../../backend/db/drizzle-schema';

// Mock Stripe at the top level before importing the service
let mockStripe: any;
jest.mock('stripe', () => {
  mockStripe = {
    paymentIntents: {
      create: jest.fn().mockResolvedValue({
        id: 'pi_test_123',
        status: 'requires_payment_method',
        client_secret: 'pi_test_123_secret_test',
        amount: 10000,
        currency: 'usd'
      }),
      confirm: jest.fn().mockResolvedValue({
        id: 'pi_test_123',
        status: 'succeeded'
      })
    },
    paymentMethods: {
      retrieve: jest.fn().mockResolvedValue({
        id: 'pm_test_123',
        type: 'card',
        card: {
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2025
        }
      })
    },
    refunds: {
      create: jest.fn().mockResolvedValue({
        id: 're_test_123',
        status: 'succeeded',
        amount: 5000
      })
    }
  };
  return jest.fn().mockImplementation(() => mockStripe);
});

jest.mock('../../backend/db/connection');

const mockDb = db as jest.Mocked<typeof db>;

// Mock environment variables
process.env.STRIPE_SECRET_KEY = 'sk_test_123';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockOrganizationId: string;

  beforeEach(() => {
    service = new PaymentService();
    mockOrganizationId = 'test-org-1';

    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'payment-1' }])
      })
    }) as any;

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined)
      })
    }) as any;

    mockDb.select = jest.fn().mockImplementation(() => ({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([{
            id: 'payment-1',
            organizationId: mockOrganizationId,
            amount: '100.00',
            currency: 'USD',
            status: 'pending',
            transactionId: 'pi_test_123'
          }])
        })
      })
    })) as any;
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent successfully', async () => {
      const paymentData = {
        amount: 100,
        currency: 'usd',
        description: 'Test payment'
      };

      const result = await service.createPaymentIntent(mockOrganizationId, paymentData);

      expect(result.id).toBeDefined();
      expect(result.organizationId).toBe(mockOrganizationId);
      expect(result.amount).toBe(100);
      expect(result.currency).toBe('usd');
      expect(result.status).toBe('pending');
      expect(result.description).toBe(paymentData.description);
      expect(result.clientSecret).toBe('pi_test_123_secret_test');
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);

      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 10000, // Converted to cents
        currency: 'usd',
        payment_method: undefined,
        description: 'Test payment',
        metadata: {
          organizationId: mockOrganizationId,
          invoiceId: undefined
        },
        automatic_payment_methods: {
          enabled: true
        }
      });

      expect(mockDb.insert).toHaveBeenCalled();
      expect(mockDb.insert(payments).values).toHaveBeenCalled();
    });

    it('should handle payment method ID', async () => {
      const paymentData = {
        amount: 50,
        paymentMethodId: 'pm_test_123'
      };

      await service.createPaymentIntent(mockOrganizationId, paymentData);

      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith(
        expect.objectContaining({
          payment_method: 'pm_test_123'
        })
      );
    });

    it('should handle invoice association', async () => {
      const paymentData = {
        amount: 75,
        invoiceId: 'invoice-123'
      };

      await service.createPaymentIntent(mockOrganizationId, paymentData);

      expect(mockStripe.paymentIntents.create).toHaveBeenCalledWith(
        expect.objectContaining({
          metadata: expect.objectContaining({
            invoiceId: 'invoice-123'
          })
        })
      );
    });
  });

  describe('confirmPayment', () => {
    it('should confirm a payment successfully', async () => {
      const result = await service.confirmPayment('payment-1', mockOrganizationId);

      expect(result.id).toBe('payment-1');
      expect(result.status).toBe('succeeded');
      expect(result.amount).toBe(100);

      expect(mockStripe.paymentIntents.confirm).toHaveBeenCalledWith('pi_test_123');
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should throw error for non-existent payment', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      await expect(
        service.confirmPayment('non-existent', mockOrganizationId)
      ).rejects.toThrow('Payment not found');
    });

    it('should handle Stripe confirmation failure', async () => {
      mockStripe.paymentIntents.confirm = jest.fn().mockRejectedValue(new Error('Payment failed'));

      await expect(
        service.confirmPayment('payment-1', mockOrganizationId)
      ).rejects.toThrow('Failed to confirm payment');
    });
  });

  describe('createPaymentMethod', () => {
    it('should create a payment method successfully', async () => {
      const result = await service.createPaymentMethod(mockOrganizationId, {
        paymentMethodId: 'pm_test_123',
        isDefault: true
      });

      expect(result.id).toBeDefined();
      expect(result.organizationId).toBe(mockOrganizationId);
      expect(result.type).toBe('card');
      expect(result.brand).toBe('visa');
      expect(result.last4).toBe('4242');
      expect(result.expiryMonth).toBe(12);
      expect(result.expiryYear).toBe(2025);
      expect(result.isDefault).toBe(true);
      expect(result.stripePaymentMethodId).toBe('pm_test_123');
      expect(result.createdAt).toBeInstanceOf(Date);

      expect(mockStripe.paymentMethods.retrieve).toHaveBeenCalledWith('pm_test_123');
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should handle different card types', async () => {
      mockStripe.paymentMethods.retrieve = jest.fn().mockResolvedValue({
        id: 'pm_test_456',
        type: 'card',
        card: {
          brand: 'mastercard',
          last4: '5555',
          exp_month: 6,
          exp_year: 2024
        }
      });

      const result = await service.createPaymentMethod(mockOrganizationId, {
        paymentMethodId: 'pm_test_456'
      });

      expect(result.brand).toBe('mastercard');
      expect(result.last4).toBe('5555');
    });
  });

  describe('getPaymentMethods', () => {
    it('should retrieve payment methods for organization', async () => {
      // Mock multiple payment methods
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue([
              {
                id: 'pm-1',
                organizationId: mockOrganizationId,
                method: 'payment_method_setup',
                status: 'succeeded',
                transactionId: 'pm_test_123',
                paymentMethodDetailsEncrypted: {
                  type: 'card',
                  brand: 'visa',
                  last4: '4242',
                  expiryMonth: 12,
                  expiryYear: 2025
                },
                metadata: { isDefault: true },
                createdAt: new Date()
              },
              {
                id: 'pm-2',
                organizationId: mockOrganizationId,
                method: 'payment_method_setup',
                status: 'succeeded',
                transactionId: 'pm_test_456',
                paymentMethodDetailsEncrypted: {
                  type: 'card',
                  brand: 'mastercard',
                  last4: '5555',
                  expiryMonth: 6,
                  expiryYear: 2024
                },
                metadata: { isDefault: false },
                createdAt: new Date()
              }
            ])
          })
        })
      }) as any;

      const result = await service.getPaymentMethods(mockOrganizationId);

      expect(result).toHaveLength(2);
      expect(result[0].brand).toBe('visa');
      expect(result[0].last4).toBe('4242');
      expect(result[0].isDefault).toBe(true);
      expect(result[1].brand).toBe('mastercard');
      expect(result[1].last4).toBe('5555');
      expect(result[1].isDefault).toBe(false);
    });

    it('should return empty array for no payment methods', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            orderBy: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      const result = await service.getPaymentMethods(mockOrganizationId);

      expect(result).toEqual([]);
    });
  });

  describe('createRefund', () => {
    it('should create a refund successfully', async () => {
      const result = await service.createRefund(mockOrganizationId, {
        paymentId: 'payment-1',
        amount: 50,
        reason: 'requested_by_customer'
      });

      expect(result.id).toBeDefined();
      expect(result.organizationId).toBe(mockOrganizationId);
      expect(result.paymentId).toBe('payment-1');
      expect(result.amount).toBe(50);
      expect(result.reason).toBe('requested_by_customer');
      expect(result.status).toBe('succeeded');
      expect(result.createdAt).toBeInstanceOf(Date);

      expect(mockStripe.refunds.create).toHaveBeenCalledWith({
        payment_intent: 'pi_test_123',
        amount: 5000, // Converted to cents
        reason: 'requested_by_customer'
      });

      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should refund full amount when not specified', async () => {
      await service.createRefund(mockOrganizationId, {
        paymentId: 'payment-1',
        reason: 'duplicate'
      });

      expect(mockStripe.refunds.create).toHaveBeenCalledWith({
        payment_intent: 'pi_test_123',
        amount: 10000, // Full payment amount converted to cents
        reason: 'duplicate'
      });
    });

    it('should throw error for non-existent payment', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([])
          })
        })
      }) as any;

      await expect(
        service.createRefund(mockOrganizationId, {
          paymentId: 'non-existent',
          reason: 'requested_by_customer'
        })
      ).rejects.toThrow('Payment not found');
    });
  });

  describe('getPaymentHistory', () => {
    it('should retrieve payment history with pagination', async () => {
      const result = await service.getPaymentHistory(mockOrganizationId, {
        limit: 10,
        offset: 0
      });

      expect(result.payments).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.payments[0].id).toBe('payment-1');
      expect(result.payments[0].amount).toBe(100);
    });

    it('should Filter by status', async () => {
      await service.getPaymentHistory(mockOrganizationId, {
        status: 'succeeded'
      });

      expect(mockDb.select).toHaveBeenCalled();
    });
  });

  describe('getPaymentStats', () => {
    it('should calculate payment statistics', async () => {
      // Mock multiple payment records
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([
            {
              id: 'payment-1',
              method: 'card',
              status: 'succeeded',
              amount: '100.00'
            },
            {
              id: 'payment-2',
              method: 'card',
              status: 'failed',
              amount: '50.00'
            },
            {
              id: 'refund-1',
              method: 'refund',
              status: 'succeeded',
              amount: '25.00'
            }
          ])
        })
      }) as any;

      const stats = await service.getPaymentStats(mockOrganizationId);

      expect(stats.totalRevenue).toBe(100);
      expect(stats.totalPayments).toBe(2); // Excluding refunds
      expect(stats.successfulPayments).toBe(1);
      expect(stats.failedPayments).toBe(1);
      expect(stats.refundAmount).toBe(25);
    });

    it('should handle empty payment history', async () => {
      mockDb.select = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue([])
        })
      }) as any;

      const stats = await service.getPaymentStats(mockOrganizationId);

      expect(stats.totalRevenue).toBe(0);
      expect(stats.totalPayments).toBe(0);
      expect(stats.successfulPayments).toBe(0);
      expect(stats.failedPayments).toBe(0);
      expect(stats.refundAmount).toBe(0);
    });
  });

  describe('handleWebhook', () => {
    it('should handle payment succeeded webhook', async () => {
      const mockEvent = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
            metadata: {
              organizationId: mockOrganizationId
            }
          }
        }
      };

      await service.handleWebhook(mockEvent);

      expect(mockDb.update).toHaveBeenCalledWith(payments);
      expect(mockDb.update(payments).set).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'succeeded',
          processedAt: expect.any(Date)
        })
      );
    });

    it('should handle payment failed webhook', async () => {
      const mockEvent = {
        type: 'payment_intent.payment_failed',
        data: {
          object: {
            id: 'pi_test_123',
            metadata: {
              organizationId: mockOrganizationId
            }
          }
        }
      };

      await service.handleWebhook(mockEvent);

      expect(mockDb.update).toHaveBeenCalledWith(payments);
      expect(mockDb.update(payments).set).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'failed'
        })
      );
    });

    it('should handle payment canceled webhook', async () => {
      const mockEvent = {
        type: 'payment_intent.canceled',
        data: {
          object: {
            id: 'pi_test_123',
            metadata: {
              organizationId: mockOrganizationId
            }
          }
        }
      };

      await service.handleWebhook(mockEvent);

      expect(mockDb.update).toHaveBeenCalledWith(payments);
      expect(mockDb.update(payments).set).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'canceled'
        })
      );
    });

    it('should ignore unknown webhook events', async () => {
      const mockEvent = {
        type: 'unknown.event',
        data: { object: {} }
      };

      // Should not throw error
      await expect(service.handleWebhook(mockEvent)).resolves.toBeUndefined();
    });
  });
});
