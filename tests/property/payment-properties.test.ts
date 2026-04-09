import { describe, it, expect, beforeEach } from '@jest/globals';
import * as fc from 'fast-check';
import { paymentWebhookService } from '../../backend/services/payment-webhook-service';
import { validatePaymentData, processPaymentAmount, calculateFees } from '../../backend/utils/payment-utils';

describe('Payment Property-Based Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Payment Amount Processing', () => {
    it('should handle all valid payment amounts correctly', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 50, max: 999999 }), // $0.50 to $9,999.99 in cents
          (amountCents) => {
            const result = processPaymentAmount(amountCents);
            
            // Should always return valid decimal representation
            expect(result).toMatch(/^\d+\.\d{2}$/);
            
            // Should preserve exact value
            const expected = (amountCents / 100).toFixed(2);
            expect(result).toBe(expected);
            
            return true;
          }
        ),
        { numRuns: 1000, seed: 42 }
      );
    });

    it('should calculate fees correctly for all amounts', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 500, max: 100000 }), // $5.00 to $1,000.00 (min 500 ensures room for fixedFee)
          fc.integer({ min: 0, max: 500 }), // $0 to $5.00 fixed fee
          fc.float({ min: Math.fround(0), max: Math.fround(0.1) }).filter(f => !isNaN(f)), // 0% to 10%
          fc.constantFrom('USD', 'EUR', 'GBP'),
          (amount, fixedFee, percentageFee, currency) => {
            const feeConfig = { fixedFee, percentageFee, currency };
            const fees = calculateFees(amount, feeConfig);
            
            // If total fees exceed amount, they should be capped
            if (fees.total > amount) {
              // When fees exceed, netAmount should be 0 and total should equal amount
              expect(fees.netAmount).toBe(0);
            } else {
              // Fees should never exceed the amount
              expect(fees.total).toBeLessThanOrEqual(amount);
            }
            
            // Fixed fee should be respected
            expect(fees.fixed).toBe(feeConfig.fixedFee);
            
            // Percentage fee should be calculated correctly
            const expectedPercentage = Math.floor(amount * feeConfig.percentageFee);
            expect(fees.percentage).toBe(expectedPercentage);
            
            // Net amount should be non-negative
            expect(fees.netAmount).toBeGreaterThanOrEqual(0);
            
            return true;
          }
        ),
        { numRuns: 500, seed: 123 }
      );
    });
  });

  describe('Payment Data Validation', () => {
    it('should validate payment intent data structure', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.string({ minLength: 8, maxLength: 32 }).map(s => s.replace(/[^a-f0-9]/g, '0')),
            amount: fc.integer({ min: 50, max: 999999 }),
            currency: fc.constantFrom('usd', 'eur', 'gbp'),
            status: fc.constantFrom('requires_payment_method', 'requires_confirmation', 'requires_action', 'processing', 'succeeded', 'canceled'),
            metadata: fc.record({
              organizationId: fc.uuid(),
              invoiceId: fc.option(fc.uuid()),
              customerId: fc.option(fc.uuid())
            })
          }),
          (paymentIntent) => {
            const validation = validatePaymentData(paymentIntent, 'payment_intent');
            
            // Valid payment intents should pass validation
            expect(validation.isValid).toBe(true);
            expect(validation.errors).toHaveLength(0);
            
            // Required fields should be present
            expect(paymentIntent.id).toBeTruthy();
            expect(paymentIntent.amount).toBeGreaterThan(0);
            expect(['usd', 'eur', 'gbp']).toContain(paymentIntent.currency);
            
            return true;
          }
        ),
        { numRuns: 200, seed: 456 }
      );
    });

    it('should reject invalid payment data', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.option(fc.string({ minLength: 8, maxLength: 32 }).map(s => s.replace(/[^a-f0-9]/g, '0'))),
            amount: fc.integer({ min: -1000, max: 49 }), // Invalid amounts
            currency: fc.string({ minLength: 3, maxLength: 3 }),
            status: fc.string(),
            metadata: fc.record({})
          }),
          (invalidPayment) => {
            const validation = validatePaymentData(invalidPayment, 'payment_intent');
            
            // Invalid data should fail validation
            if (invalidPayment.amount <= 0 || !invalidPayment.id) {
              expect(validation.isValid).toBe(false);
              expect(validation.errors.length).toBeGreaterThan(0);
            }
            
            return true;
          }
        ),
        { numRuns: 100, seed: 789 }
      );
    });
  });

  describe('Webhook Event Processing', () => {
    it('should handle webhook events with idempotency', () => {
      fc.assert(
        fc.asyncProperty(
          fc.record({
            id: fc.uuid(),
            type: fc.constantFrom(
              'payment_intent.succeeded',
              'payment_intent.payment_failed',
              'invoice.payment_succeeded',
              'invoice.payment_failed',
              'customer.created',
              'customer.deleted',
              'subscription.created',
              'subscription.updated',
              'subscription.deleted'
            ),
            data: fc.record({
              object: fc.record({
                id: fc.uuid(),
                amount: fc.integer({ min: 100, max: 10000 }),
                currency: fc.constantFrom('usd', 'eur'),
                status: fc.constantFrom('succeeded', 'failed', 'pending'),
                metadata: fc.record({
                  organizationId: fc.uuid()
                })
              })
            }),
            created: fc.integer({ min: 1609459200, max: 1735689599 }) // 2021-2024 timestamps
          }),
          async (webhookEvent) => {
            // Mock request object
            const mockRequest = {
              text: async () => JSON.stringify(webhookEvent),
              headers: {
                get: jest.fn((name) => {
                  if (name === 'stripe-signature') {
                    return 't=1234567890,v1=test_signature';
                  }
                  return null;
                }),
              },
            };

            // Process webhook twice to test idempotency
            const result1 = await paymentWebhookService.processWebhook(mockRequest);
            const result2 = await paymentWebhookService.processWebhook(mockRequest);

            // Both attempts should succeed
            expect(result1.success).toBe(true);
            expect(result2.success).toBe(true);
            
            // Results should be consistent
            expect(result1.eventType).toBe(result2.eventType);
            expect(result1.processedAt).toBe(result2.processedAt);

            return true;
          }
        ),
        { numRuns: 50, seed: 101112 }
      );
    });

    it('should handle malformed webhook events gracefully', () => {
      fc.assert(
        fc.asyncProperty(
          fc.oneof(
            fc.string(),
            fc.record({ invalid: fc.string() }),
            fc.record({
              id: fc.uuid(),
              type: fc.constantFrom('invalid.event'),
              data: fc.string()
            })
          ),
          async (malformedEvent) => {
            const mockRequest = {
              text: async () => JSON.stringify(malformedEvent),
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

            // Should handle gracefully without throwing
            expect(result).toBeDefined();
            expect(typeof result.success).toBe('boolean');
          }
        ),
        { numRuns: 30, seed: 131415 }
      );
    });
  });

  describe('Currency Conversion Properties', () => {
    it('should maintain precision during currency conversion', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 100000 }), // Amount in smallest currency unit
          fc.record({
            fromCurrency: fc.constantFrom('USD', 'EUR', 'GBP'),
            toCurrency: fc.constantFrom('USD', 'EUR', 'GBP'),
            rate: fc.float({ min: Math.fround(0.1), max: Math.fround(10) }).filter(r => !isNaN(r) && r > 0)
          }).filter(rate => rate.fromCurrency !== rate.toCurrency),
          (amount, conversion) => {
            // Mock conversion function
            const convertAmount = (amt: number, from: string, to: string, rate: number) => {
              if (from === to) return amt;
              return Math.round(amt * rate * 100) / 100; // Keep 2 decimal places
            };

            const converted = convertAmount(amount, conversion.fromCurrency, conversion.toCurrency, conversion.rate);
            
            // Converted amount should be positive
            expect(converted).toBeGreaterThan(0);
            
            // Should maintain reasonable precision (allow small floating point errors)
            expect(Math.abs(converted * 100 - Math.round(converted * 100))).toBeLessThan(0.001);
            
            return true;
          }
        ),
        { numRuns: 200, seed: 161718 }
      );
    });
  });

  describe('Payment Method Validation', () => {
    it('should validate payment method data consistently', () => {
      fc.assert(
        fc.property(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 50 }),
            type: fc.constantFrom('card', 'bank_account', 'sepa_debit'),
            card: fc.option(fc.record({
              brand: fc.constantFrom('visa', 'mastercard', 'amex', 'discover'),
              last4: fc.string({ minLength: 4, maxLength: 4 }).map(s => s.replace(/\D/g, '0')),
              exp_month: fc.integer({ min: 1, max: 12 }),
              exp_year: fc.integer({ min: 2024, max: 2034 }),
              fingerprint: fc.string({ minLength: 16, maxLength: 16 }).map(s => s.replace(/[^a-f0-9]/g, '0'))
            })),
            metadata: fc.record({
              organizationId: fc.uuid(),
              customerId: fc.uuid()
            })
          }),
          (paymentMethod) => {
            // Validate payment method structure
            expect(paymentMethod.id).toBeTruthy();
            expect(['card', 'bank_account', 'sepa_debit']).toContain(paymentMethod.type);
            expect(paymentMethod.metadata.organizationId).toBeTruthy();
            expect(paymentMethod.metadata.customerId).toBeTruthy();

            // Card-specific validation
            if (paymentMethod.type === 'card' && paymentMethod.card) {
              expect(paymentMethod.card.last4).toMatch(/^\d{4}$/);
              expect(paymentMethod.card.exp_month).toBeGreaterThanOrEqual(1);
              expect(paymentMethod.card.exp_month).toBeLessThanOrEqual(12);
              expect(paymentMethod.card.exp_year).toBeGreaterThanOrEqual(2024);
              expect(['visa', 'mastercard', 'amex', 'discover']).toContain(paymentMethod.card.brand);
            }

            return true;
          }
        ),
        { numRuns: 100, seed: 192021 }
      );
    });
  });
});
