import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Payment End-to-End Workflow', () => {
  let organizationId: string;
  let userId: string;
  let authToken: string;
  let customerId: string;
  let subscriptionId: string;

  beforeEach(async () => {
    // Create test organization and user
    const orgResult = await db.insert({
      into: 'organizations',
      values: {
        name: 'Payment Test Organization',
        domain: 'payment-test.com',
        plan: 'pro',
        settings: {},
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    organizationId = orgResult[0].id;

    const userResult = await db.insert({
      into: 'users',
      values: {
        organization_id: organizationId,
        email: 'payment@example.com',
        name: 'Payment Test User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    userId = userResult[0].id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'payment@example.com',
        password: 'testpassword',
      });

    authToken = loginResponse.body.token;
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('invoices').where('customer_id', '=', customerId);
    await db.delete().from('subscriptions').where('customer_id', '=', customerId);
    await db.delete().from('payments').where('organization_id', '=', organizationId);
    await db.delete().from('customers').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('id', '=', userId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  describe('Complete Payment Workflow', () => {
    it('should handle one-time payment from creation to completion', async () => {
      // Step 1: Create customer
      const customerData = {
        email: 'customer@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        address: {
          line1: '123 Main St',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'US',
        },
        metadata: { source: 'website' },
      };

      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send(customerData)
        .expect(201);

      customerId = customerResponse.body.id;
      expect(customerResponse.body).toMatchObject({
        email: 'customer@example.com',
        name: 'John Doe',
        phone: '+1234567890',
        address: expect.objectContaining({
          city: 'New York',
          country: 'US',
        }),
      });

      // Step 2: Create payment intent
      const paymentData = {
        customer_id: customerId,
        amount: 5000, // $50.00
        currency: 'usd',
        description: 'Test Product Purchase',
        metadata: { order_id: 'order-123', product_id: 'prod-456' },
      };

      const paymentResponse = await request(app)
        .post('/api/payments/intent')
        .set('Authorization', `Bearer ${authToken}`)
        .send(paymentData)
        .expect(201);

      const paymentIntentId = paymentResponse.body.id;
      expect(paymentResponse.body).toMatchObject({
        amount: 5000,
        currency: 'usd',
        status: 'requires_payment_method',
        description: 'Test Product Purchase',
        client_secret: expect.any(String),
      });

      // Step 3: Confirm payment with payment method
      const confirmData = {
        payment_method_id: 'pm_card_visa',
        save_payment_method: true,
      };

      const confirmResponse = await request(app)
        .post(`/api/payments/intent/${paymentIntentId}/confirm`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(confirmData)
        .expect(200);

      expect(confirmResponse.body).toMatchObject({
        id: paymentIntentId,
        status: 'succeeded',
        amount: 5000,
        charges: expect.any(Array),
      });

      // Step 4: Create invoice for the payment
      const invoiceData = {
        customer_id: customerId,
        description: 'Invoice for Test Product',
        line_items: [
          {
            description: 'Test Product',
            quantity: 1,
            unit_amount: 5000,
            currency: 'usd',
          },
        ],
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        metadata: { invoice_number: 'INV-001' },
      };

      const invoiceResponse = await request(app)
        .post('/api/invoices')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invoiceData)
        .expect(201);

      const invoiceId = invoiceResponse.body.id;
      expect(invoiceResponse.body).toMatchObject({
        customer_id: customerId,
        status: 'draft',
        total: 5000,
        currency: 'usd',
        due_date: expect.any(String),
      });

      // Step 5: Finalize and pay invoice
      await request(app)
        .post(`/api/invoices/${invoiceId}/finalize`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const payResponse = await request(app)
        .post(`/api/invoices/${invoiceId}/pay`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ payment_method_id: 'pm_card_visa' })
        .expect(200);

      expect(payResponse.body).toMatchObject({
        id: invoiceId,
        status: 'paid',
        amount_paid: 5000,
        paid_at: expect.any(String),
      });

      // Step 6: Verify payment records
      const paymentRecordsResponse = await request(app)
        .get('/api/payments')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ customer_id: customerId })
        .expect(200);

      expect(paymentRecordsResponse.body.data).toHaveLength(1);
      expect(paymentRecordsResponse.body.data[0]).toMatchObject({
        customer_id: customerId,
        amount: 5000,
        status: 'succeeded',
      });

      // Step 7: Get payment analytics
      const analyticsResponse = await request(app)
        .get('/api/payments/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body).toMatchObject({
        total_revenue: expect.any(Number),
        total_payments: expect.any(Number),
        average_payment_amount: expect.any(Number),
        payment_status_breakdown: expect.any(Object),
        revenue_by_period: expect.any(Object),
      });
    });

    it('should handle subscription workflow from creation to cancellation', async () => {
      // Step 1: Create customer for subscription
      const customerData = {
        email: 'subscriber@example.com',
        name: 'Jane Smith',
        metadata: { subscription_type: 'premium' },
      };

      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send(customerData)
        .expect(201);

      customerId = customerResponse.body.id;

      // Step 2: Create subscription
      const subscriptionData = {
        customer_id: customerId,
        price_id: 'price_premium_monthly',
        payment_method_id: 'pm_card_visa',
        billing_cycle_anchor: 'month_start',
        metadata: { plan: 'premium', tier: 'monthly' },
      };

      const subscriptionResponse = await request(app)
        .post('/api/subscriptions')
        .set('Authorization', `Bearer ${authToken}`)
        .send(subscriptionData)
        .expect(201);

      subscriptionId = subscriptionResponse.body.id;
      expect(subscriptionResponse.body).toMatchObject({
        customer_id: customerId,
        status: 'active',
        current_period_start: expect.any(String),
        current_period_end: expect.any(String),
        items: expect.any(Array),
      });

      // Step 3: Update subscription
      const updateData = {
        metadata: { upgraded: true, reason: 'feature_request' },
        proration_behavior: 'create_prorations',
      };

      const updateResponse = await request(app)
        .put(`/api/subscriptions/${subscriptionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(updateResponse.body).toMatchObject({
        id: subscriptionId,
        metadata: expect.objectContaining({ upgraded: true }),
      });

      // Step 4: Create subscription invoice
      const invoiceResponse = await request(app)
        .post('/api/subscriptions/invoice')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          subscription_id: subscriptionId,
          description: 'Monthly subscription invoice',
        })
        .expect(201);

      expect(invoiceResponse.body).toMatchObject({
        subscription_id: subscriptionId,
        status: 'draft',
        amount_due: expect.any(Number),
      });

      // Step 5: Pause subscription
      const pauseResponse = await request(app)
        .post(`/api/subscriptions/${subscriptionId}/pause`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          pause_behavior: 'keep_invoice',
          resumes_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .expect(200);

      expect(pauseResponse.body).toMatchObject({
        id: subscriptionId,
        status: 'paused',
        pause_behavior: 'keep_invoice',
      });

      // Step 6: Resume subscription
      const resumeResponse = await request(app)
        .post(`/api/subscriptions/${subscriptionId}/resume`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(resumeResponse.body).toMatchObject({
        id: subscriptionId,
        status: 'active',
      });

      // Step 7: Cancel subscription
      const cancelResponse = await request(app)
        .delete(`/api/subscriptions/${subscriptionId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          cancellation_reason: 'customer_request',
          invoice_now: true,
          prorate: true,
        })
        .expect(200);

      expect(cancelResponse.body).toMatchObject({
        id: subscriptionId,
        status: 'canceled',
        canceled_at: expect.any(String),
      });
    });
  });

  describe('Payment Method Management', () => {
    it('should manage customer payment methods', async () => {
      // Step 1: Create customer
      const customerData = {
        email: 'payment-methods@example.com',
        name: 'Payment Methods User',
      };

      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send(customerData)
        .expect(201);

      customerId = customerResponse.body.id;

      // Step 2: Add payment method
      const paymentMethodData = {
        type: 'card',
        card: {
          number: '4242424242424242',
          exp_month: 12,
          exp_year: 2025,
          cvc: '123',
        },
        billing_details: {
          name: 'John Doe',
          email: 'john@example.com',
          address: {
            line1: '123 Main St',
            city: 'New York',
            state: 'NY',
            postal_code: '10001',
            country: 'US',
          },
        },
        metadata: { nickname: 'Personal Card' },
      };

      const addMethodResponse = await request(app)
        .post(`/api/customers/${customerId}/payment-methods`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(paymentMethodData)
        .expect(201);

      const paymentMethodId = addMethodResponse.body.id;
      expect(addMethodResponse.body).toMatchObject({
        type: 'card',
        card: expect.objectContaining({
          brand: 'visa',
          last4: '4242',
          exp_month: 12,
          exp_year: 2025,
        }),
        billing_details: expect.objectContaining({
          name: 'John Doe',
        }),
      });

      // Step 3: List payment methods
      const listResponse = await request(app)
        .get(`/api/customers/${customerId}/payment-methods`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(listResponse.body.data).toHaveLength(1);
      expect(listResponse.body.data[0]).toMatchObject({
        id: paymentMethodId,
        type: 'card',
      });

      // Step 4: Set default payment method
      await request(app)
        .put(`/api/customers/${customerId}/default-payment-method`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ payment_method_id: paymentMethodId })
        .expect(200);

      // Step 5: Update payment method
      const updateMethodData = {
        metadata: { nickname: 'Updated Personal Card', preferred: true },
      };

      const updateMethodResponse = await request(app)
        .put(`/api/payment-methods/${paymentMethodId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateMethodData)
        .expect(200);

      expect(updateMethodResponse.body).toMatchObject({
        id: paymentMethodId,
        metadata: expect.objectContaining({
          nickname: 'Updated Personal Card',
          preferred: true,
        }),
      });

      // Step 6: Remove payment method
      await request(app)
        .delete(`/api/payment-methods/${paymentMethodId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Step 7: Verify removal
      const verifyResponse = await request(app)
        .get(`/api/customers/${customerId}/payment-methods`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(verifyResponse.body.data).toHaveLength(0);
    });
  });

  describe('Refund and Dispute Management', () => {
    it('should handle payment refunds', async () => {
      // Step 1: Create customer and successful payment
      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'refund@example.com',
          name: 'Refund User',
        })
        .expect(201);

      customerId = customerResponse.body.id;

      const paymentResponse = await request(app)
        .post('/api/payments/intent')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: customerId,
          amount: 10000, // $100.00
          currency: 'usd',
          description: 'Refund Test Payment',
        })
        .expect(201);

      // Simulate successful payment
      const paymentId = paymentResponse.body.id;

      // Step 2: Create full refund
      const fullRefundResponse = await request(app)
        .post('/api/refunds')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          payment_intent_id: paymentId,
          amount: 10000,
          reason: 'requested_by_customer',
          metadata: { notes: 'Customer requested full refund' },
        })
        .expect(201);

      expect(fullRefundResponse.body).toMatchObject({
        payment_intent_id: paymentId,
        amount: 10000,
        status: 'succeeded',
        reason: 'requested_by_customer',
      });

      // Step 3: Create partial refund
      const partialRefundResponse = await request(app)
        .post('/api/refunds')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          payment_intent_id: paymentId,
          amount: 2500, // $25.00
          reason: 'duplicate',
          metadata: { notes: 'Partial refund for duplicate charge' },
        })
        .expect(201);

      expect(partialRefundResponse.body).toMatchObject({
        payment_intent_id: paymentId,
        amount: 2500,
        status: 'succeeded',
        reason: 'duplicate',
      });

      // Step 4: List refunds for payment
      const refundsResponse = await request(app)
        .get(`/api/payments/${paymentId}/refunds`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(refundsResponse.body.data).toHaveLength(2);
      expect(refundsResponse.body.data[0].amount + refundsResponse.body.data[1].amount).toBe(12500);

      // Step 5: Get refund analytics
      const analyticsResponse = await request(app)
        .get('/api/refunds/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body).toMatchObject({
        total_refunded: expect.any(Number),
        refund_count: expect.any(Number),
        refund_rate: expect.any(Number),
        refunds_by_reason: expect.any(Object),
        average_refund_amount: expect.any(Number),
      });
    });

    it('should handle payment disputes', async () => {
      // Step 1: Create customer and payment
      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'dispute@example.com',
          name: 'Dispute User',
        })
        .expect(201);

      customerId = customerResponse.body.id;

      const paymentResponse = await request(app)
        .post('/api/payments/intent')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: customerId,
          amount: 15000, // $150.00
          currency: 'usd',
          description: 'Dispute Test Payment',
        })
        .expect(201);

      const paymentId = paymentResponse.body.id;

      // Step 2: Create dispute
      const disputeData = {
        payment_intent_id: paymentId,
        amount: 15000,
        reason: 'product_not_received',
        evidence: {
          product_description: 'Test product that was never delivered',
          customer_email: 'dispute@example.com',
          shipping_documentation: 'tracking_number_123',
        },
        metadata: { case_number: 'DISPUTE-001' },
      };

      const disputeResponse = await request(app)
        .post('/api/disputes')
        .set('Authorization', `Bearer ${authToken}`)
        .send(disputeData)
        .expect(201);

      const disputeId = disputeResponse.body.id;
      expect(disputeResponse.body).toMatchObject({
        payment_intent_id: paymentId,
        amount: 15000,
        reason: 'product_not_received',
        status: 'needs_response',
      });

      // Step 3: Submit evidence for dispute
      const evidenceData = {
        evidence: {
          product_description: 'Premium software license',
          customer_communication: 'Email thread with customer',
          service_documentation: 'Service agreement and terms',
          receipt: 'Invoice and payment confirmation',
        },
        submit: true,
      };

      const evidenceResponse = await request(app)
        .post(`/api/disputes/${disputeId}/evidence`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(evidenceData)
        .expect(200);

      expect(evidenceResponse.body).toMatchObject({
        dispute_id: disputeId,
        evidence_submitted: true,
        status: 'under_review',
      });

      // Step 4: Update dispute status
      const updateResponse = await request(app)
        .put(`/api/disputes/${disputeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'won',
          resolution_reason: 'Evidence proved product delivery',
        })
        .expect(200);

      expect(updateResponse.body).toMatchObject({
        id: disputeId,
        status: 'won',
        resolution_reason: 'Evidence proved product delivery',
      });

      // Step 5: Get dispute analytics
      const analyticsResponse = await request(app)
        .get('/api/disputes/analytics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(analyticsResponse.body).toMatchObject({
        total_disputes: expect.any(Number),
        dispute_rate: expect.any(Number),
        disputes_by_reason: expect.any(Object),
        disputes_by_status: expect.any(Object),
        win_rate: expect.any(Number),
      });
    });
  });

  describe('Webhook Handling', () => {
    it('should handle payment webhooks correctly', async () => {
      // Step 1: Create webhook endpoint
      const webhookData = {
        url: 'https://webhook.example.com/payment',
        enabled_events: [
          'payment_intent.succeeded',
          'payment_intent.payment_failed',
          'invoice.payment_succeeded',
          'customer.subscription.created',
        ],
        description: 'Payment processing webhooks',
      };

      const webhookResponse = await request(app)
        .post('/api/webhooks')
        .set('Authorization', `Bearer ${authToken}`)
        .send(webhookData)
        .expect(201);

      const webhookId = webhookResponse.body.id;
      expect(webhookResponse.body).toMatchObject({
        url: 'https://webhook.example.com/payment',
        enabled_events: expect.arrayContaining([
          'payment_intent.succeeded',
          'payment_intent.payment_failed',
        ]),
        status: 'enabled',
      });

      // Step 2: Simulate incoming webhook
      const webhookPayload = {
        type: 'payment_intent.succeeded',
        data: {
          object: {
            id: 'pi_test_123',
            amount: 5000,
            currency: 'usd',
            status: 'succeeded',
            customer: 'cus_test_456',
            metadata: { order_id: 'order-789' },
          },
        },
      };

      const signature = 'test-signature';
      const secret = 'whsec_test_secret';

      const incomingResponse = await request(app)
        .post('/api/webhooks/incoming')
        .set('stripe-signature', signature)
        .send(webhookPayload)
        .expect(200);

      expect(incomingResponse.body).toMatchObject({
        received: true,
        event_type: 'payment_intent.succeeded',
        processed: true,
      });

      // Step 3: Get webhook delivery logs
      const logsResponse = await request(app)
        .get(`/api/webhooks/${webhookId}/deliveries`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(logsResponse.body.data).toHaveLength(1);
      expect(logsResponse.body.data[0]).toMatchObject({
        webhook_id: webhookId,
        event_type: 'payment_intent.succeeded',
        status: 'delivered',
        delivered_at: expect.any(String),
      });

      // Step 4: Test webhook retry mechanism
      const retryResponse = await request(app)
        .post(`/api/webhooks/${webhookId}/retry`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ delivery_id: logsResponse.body.data[0].id })
        .expect(200);

      expect(retryResponse.body).toMatchObject({
        delivery_id: expect.any(String),
        status: 'retry_scheduled',
        attempt_count: expect.any(Number),
      });

      // Step 5: Disable webhook
      await request(app)
        .put(`/api/webhooks/${webhookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'disabled' })
        .expect(200);

      // Step 6: Delete webhook
      await request(app)
        .delete(`/api/webhooks/${webhookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle insufficient funds scenario', async () => {
      // Step 1: Create customer
      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'insufficient@example.com',
          name: 'Insufficient Funds User',
        })
        .expect(201);

      customerId = customerResponse.body.id;

      // Step 2: Create payment intent that will fail
      const paymentResponse = await request(app)
        .post('/api/payments/intent')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: customerId,
          amount: 999999, // Very high amount to trigger decline
          currency: 'usd',
          description: 'High Amount Test',
        })
        .expect(201);

      const paymentIntentId = paymentResponse.body.id;

      // Step 3: Attempt to confirm with insufficient funds
      const confirmResponse = await request(app)
        .post(`/api/payments/intent/${paymentIntentId}/confirm`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          payment_method_id: 'pm_card_declined',
        })
        .expect(402); // Payment Required

      expect(confirmResponse.body).toMatchObject({
        error: expect.stringContaining('insufficient'),
        payment_intent_id: paymentIntentId,
        decline_code: expect.any(String),
      });

      // Step 4: Setup payment retry schedule
      const retryResponse = await request(app)
        .post(`/api/payments/${paymentIntentId}/retry`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          retry_schedule: [1, 3, 7], // Days
          max_attempts: 3,
        })
        .expect(200);

      expect(retryResponse.body).toMatchObject({
        payment_intent_id: paymentIntentId,
        retry_enabled: true,
        next_retry_at: expect.any(String),
        attempts_remaining: 3,
      });
    });

    it('should handle expired payment methods', async () => {
      // Step 1: Create customer
      const customerResponse = await request(app)
        .post('/api/customers')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'expired@example.com',
          name: 'Expired Card User',
        })
        .expect(201);

      customerId = customerResponse.body.id;

      // Step 2: Add expired payment method
      const expiredMethodResponse = await request(app)
        .post(`/api/customers/${customerId}/payment-methods`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'card',
          card: {
            number: '4000000000000069', // Test expired card
            exp_month: 1,
            exp_year: 2020, // Expired
            cvc: '123',
          },
        })
        .expect(201);

      // Step 3: Attempt payment with expired card
      const paymentResponse = await request(app)
        .post('/api/payments/intent')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          customer_id: customerId,
          amount: 5000,
          currency: 'usd',
          description: 'Expired Card Test',
        })
        .expect(201);

      const confirmResponse = await request(app)
        .post(`/api/payments/intent/${paymentResponse.body.id}/confirm`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          payment_method_id: expiredMethodResponse.body.id,
        })
        .expect(402);

      expect(confirmResponse.body).toMatchObject({
        error: expect.stringContaining('expired'),
        payment_intent_id: paymentResponse.body.id,
      });
    });
  });
});
