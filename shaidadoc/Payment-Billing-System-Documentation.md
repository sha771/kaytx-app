# Kaydex Platform - Payment & Billing System Documentation

**Report Generated:** March 23, 2026  
**Classification:** Technical Financial Documentation  
**Status:** Production Active

---

## 1. Payment Processing Architecture

### 1.1 System Overview

The Kaydex platform implements a comprehensive, enterprise-grade payment processing system built on Stripe's infrastructure with PCI DSS compliance.

```
┌─────────────────────────────────────────────────────────────┐
│                    PAYMENT ARCHITECTURE                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Customer   │◄───────►│   Payment    │                │
│  │   Interface  │         │   Gateway    │                │
│  └──────────────┘         └──────┬───────┘                │
│                                   │                         │
│                    ┌──────────────┼──────────────┐        │
│                    │              │              │        │
│             ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐│
│             │   Stripe    │ │   Internal  │ │   Audit     ││
│             │   API       │ │   Database  │ │   Trail     ││
│             └─────────────┘ └─────────────┘ └─────────────┘│
│                                                              │
│  ┌────────────────────────────────────────────────────────┐│
│  │                    WEBHOOK HANDLERS                    ││
│  │  • payment_intent.succeeded                           ││
│  │  • payment_intent.payment_failed                      ││
│  │  • invoice.payment_succeeded                          ││
│  │  • invoice.payment_failed                             ││
│  │  • customer.subscription.created                      ││
│  │  • customer.subscription.deleted                      ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Core Components

#### PaymentService (`backend/services/payment-service.ts`)

**Primary Functions:**

| Method | Purpose | Security |
|--------|---------|----------|
| `createPaymentIntent()` | Initialize Stripe payment | Encrypted, signed |
| `confirmPayment()` | Complete transaction | Token validation |
| `createPaymentMethod()` | Store payment credentials | Tokenized |
| `createRefund()` | Process refunds | Audit logged |
| `getPaymentHistory()` | Retrieve transaction records | RBAC protected |
| `getPaymentStats()` | Generate financial analytics | Org-scoped |

**Key Features:**
- Multi-currency support (USD, EUR, GBP, CAD, AUD, JPY)
- Multiple payment methods (credit cards, debit cards, bank transfers)
- Automatic retry logic for failed payments
- Comprehensive fraud detection integration
- Real-time webhook processing
- Encrypted payment data storage at rest

#### StripeService (`backend/services/stripe-service.ts`)

**Capabilities:**

```typescript
// Customer Management
- createCustomer(organizationId, userData): Stripe.Customer
- updateCustomer(customerId, updates): Stripe.Customer
- retrieveCustomer(customerId): Stripe.Customer

// Subscription Management
- createSubscription(params): Stripe.Subscription
- updateSubscription(subscriptionId, updates): Stripe.Subscription
- cancelSubscription(subscriptionId): Stripe.Subscription
- pauseSubscription(subscriptionId): Stripe.Subscription

// Payment Operations
- createPaymentIntent(params): Stripe.PaymentIntent
- confirmPaymentIntent(paymentIntentId): Stripe.PaymentIntent
- createRefund(paymentIntentId, amount): Stripe.Refund

// Security Validation
- validateStripeConfig(): void
- isTestMode(): boolean
- preventTestKeysInProduction(): void
```

### 1.3 Database Schema

#### Payments Table Structure

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  invoice_id UUID REFERENCES invoices(id) ON DELETE SET NULL,
  
  -- Financial Data
  amount DECIMAL(15, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Payment Details
  method payment_method_enum NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  transaction_id VARCHAR(255) UNIQUE,
  
  -- Stripe Integration
  gateway_response JSONB,
  payment_method_details_encrypted JSONB,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Timestamps
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for Performance
CREATE INDEX payment_org_idx ON payments(organization_id);
CREATE INDEX payment_invoice_idx ON payments(invoice_id);
CREATE INDEX payment_status_idx ON payments(status);
CREATE UNIQUE INDEX payment_transaction_id_idx ON payments(transaction_id);
```

#### Supported Payment Methods

| Method | Code | Processing Fee | Availability |
|--------|------|----------------|--------------|
| Credit Card | `credit_card` | 2.9% + $0.30 | Global |
| Debit Card | `debit_card` | 2.9% + $0.30 | Global |
| PayPal | `paypal` | 2.9% + $0.30 | Global |
| Bank Transfer | `bank_transfer` | 0.8% ($5 cap) | US only |
| Wire Transfer | `wire` | $15 + bank fees | Enterprise |
| Crypto | `crypto` | 1% | Beta |

#### Payment Status Flow

```
┌─────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐
│ PENDING │────►│PROCESSING │────►│ SUCCEEDED │────►│ COMPLETED │
└─────────┘     └───────────┘     └─────┬─────┘     └───────────┘
     │                                │
     │                                │
     ▼                                ▼
┌─────────┐                   ┌───────────┐
│ CANCELED│                   │   FAILED  │
└─────────┘                   └─────┬─────┘
                                    │
                                    ▼
                              ┌───────────┐
                              │  REFUNDED │
                              └───────────┘
```

---

## 2. Invoice Generation System

### 2.1 InvoiceGenerationService

**Location:** `backend/services/invoice-generation-service.ts`

**Core Capabilities:**

| Function | Description | Output |
|----------|-------------|--------|
| `createInvoice()` | Generate standard invoice | Invoice object |
| `createSubscriptionInvoice()` | Recurring billing invoice | Invoice + Stripe sync |
| `createBulkInvoices()` | Batch invoice generation | Invoice array |
| `createRecurringInvoice()` | Scheduled invoice creation | Invoice + schedule |
| `createProformaInvoice()` | Pre-payment estimate | Proforma invoice |
| `createCreditNote()` | Refund documentation | Credit note |
| `generateInvoiceReport()` | Financial analytics | Report object |
| `getInvoiceAnalytics()` | Invoice statistics | Analytics data |
| `calculateInvoiceMetrics()` | KPI calculations | Metrics object |

### 2.2 Invoice Types

#### Standard Invoice

```typescript
interface Invoice {
  id: string;
  organizationId: string;
  subscriptionId?: string;
  invoiceNumber: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
  
  // Financials
  amount: number;      // Pre-tax subtotal
  tax: number;         // Tax amount
  total: number;       // Final amount
  currency: string;
  
  // Line Items
  items: InvoiceItem[];
  
  // Dates
  dueDate: Date;
  paidAt?: Date;
  voidedAt?: Date;
  
  // Metadata
  metadata: Record<string, any>;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
}
```

#### Tax Calculation

| Tax Type | Rate | Application | Calculation |
|----------|------|-------------|-------------|
| **Federal Tax** | 5% | All US customers | `subtotal * 0.05` |
| **State Tax** | 0-8.5% | Location-based | Varies by state |
| **VAT** | 20% | EU customers | `subtotal * 0.20` |
| **GST** | 5-15% | Canada/Australia | Location-based |

**Tax Calculation Example:**
```typescript
const subtotal = 1000.00;
const federalTax = subtotal * 0.05;      // $50.00
const stateTax = subtotal * 0.0825;      // $82.50 (CA)
const totalTax = federalTax + stateTax;  // $132.50
const total = subtotal + totalTax;       // $1,132.50
```

### 2.3 Invoice Lifecycle

```
┌─────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐
│  DRAFT  │───►│ PENDING  │───►│   PAID   │───►│ CLOSED  │
└─────────┘    └──────────┘    └────┬─────┘    └─────────┘
                                    │
                                    ▼
                              ┌──────────┐
                              │ OVERDUE  │
                              └────┬─────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
              ┌──────────┐   ┌──────────┐   ┌──────────┐
              │  PAID    │   │CANCELLED │   │ COLLECT  │
              └──────────┘   └──────────┘   └──────────┘
```

### 2.4 Automated Billing Workflows

#### Monthly Billing Cycle

| Day | Action | System | Manual |
|-----|--------|--------|--------|
| **1st** | Generate invoices | ✅ Automated | - |
| **1st** | Email invoices | ✅ Automated | - |
| **1st** | Attempt auto-payment | ✅ Automated | - |
| **3rd** | Failed payment retry #1 | ✅ Automated | - |
| **7th** | Dunning email #1 | ✅ Automated | - |
| **7th** | Failed payment retry #2 | ✅ Automated | - |
| **14th** | Dunning email #2 | ✅ Automated | - |
| **14th** | Failed payment retry #3 | ✅ Automated | - |
| **21st** | Dunning email #3 | ✅ Automated | ✅ Review |
| **30th** | Account suspension warning | ✅ Automated | ✅ Review |
| **30th** | Final retry attempt | ✅ Automated | - |
| **45th** | Account suspension | ✅ Automated | ✅ Approve |
| **60th** | Collections handoff | - | ✅ Manual |

#### Dunning Management

| Stage | Email Template | Action | Discount Offer |
|-------|----------------|--------|----------------|
| **Stage 1** | Friendly reminder | Retry payment | - |
| **Stage 2** | Urgent notice | Retry + warning | 5% if paid now |
| **Stage 3** | Final notice | Suspend warning | 10% if paid now |
| **Stage 4** | Account suspended | Service pause | Reactivation fee |

---

## 3. Subscription Management

### 3.1 Subscription Lifecycle

#### Subscription States

| Status | Description | Actions Allowed |
|--------|-------------|-----------------|
| **trial** | 14-day free trial | Upgrade, cancel |
| **active** | Paid subscription active | Change plan, cancel, pause |
| **past_due** | Payment failed, grace period | Retry payment, update method |
| **paused** | Temporarily suspended | Resume, cancel |
| **cancelled** | Subscription ended | Reactivate (limited time) |

#### State Transitions

```
                    ┌─────────────┐
                    │   TRIAL     │
                    │  (14 days)  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
     ┌─────────┐     ┌──────────┐    ┌──────────┐
     │ UPGRADED│     │  ACTIVE  │    │ CANCELLED│
     │(to paid)│     │          │    │(no conv) │
     └─────────┘     └────┬─────┘    └──────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
      ┌──────────┐  ┌──────────┐  ┌──────────┐
      │PAST_DUE  │  │ PAUSED   │  │CANCELLED │
      │(grace pd)│  │(temporary│  │(at period│
      └────┬─────┘  │ end)     │  │ end)     │
           │        └────┬─────┘  └──────────┘
           │             │
           ▼             ▼
      ┌──────────┐  ┌──────────┐
      │ SUSPENDED│  │ RESUMED  │
      │(post-gr)│  │(back to  │
      └──────────┘  │ active)  │
                    └──────────┘
```

### 3.2 Billing Cycles

| Cycle | Description | Discount | Best For |
|-------|-------------|----------|----------|
| **Monthly** | Billed every month | 0% | Flexibility |
| **Quarterly** | Billed every 3 months | 5% | Some savings |
| **Annual** | Billed once per year | 17% | Maximum savings |
| **Biennial** | Billed every 2 years | 25% | Long-term commitment |

#### Proration Logic

```typescript
// Mid-cycle plan change
const proratedAmount = (
  (newPlanPrice - oldPlanPrice) / daysInCycle
) * daysRemaining;

// Example: Upgrade from Starter ($29) to Professional ($79) on day 15 of 30
const dailyDifference = (79 - 29) / 30;  // $1.67/day
const daysRemaining = 30 - 15;             // 15 days
const proratedCharge = dailyDifference * daysRemaining;  // $25.05
```

### 3.3 Plan Change Scenarios

| Scenario | Current | New | Billing Action |
|----------|---------|-----|----------------|
| **Upgrade** | Starter | Professional | Charge prorated difference |
| **Downgrade** | Professional | Starter | Credit prorated difference |
| **Add seats** | 5 users | 10 users | Charge for additional seats |
| **Remove seats** | 10 users | 5 users | Credit for removed seats |
| **Annual → Monthly** | Annual | Monthly | Resume monthly billing |
| **Monthly → Annual** | Monthly | Annual | Charge annual amount, prorate |

---

## 4. Financial Reporting & Analytics

### 4.1 Payment Analytics

#### Available Metrics

| Metric | API Endpoint | Update Frequency |
|--------|--------------|-------------------|
| **Total Revenue** | `GET /api/payments/stats` | Real-time |
| **Revenue by Period** | `GET /api/payments/analytics` | Hourly |
| **Payment Success Rate** | `GET /api/payments/metrics` | Real-time |
| **Refund Rate** | `GET /api/payments/refunds` | Daily |
| **Payment Method Mix** | `GET /api/payments/methods` | Daily |
| **MRR** | `GET /api/analytics/mrr` | Daily |
| **ARR** | `GET /api/analytics/arr` | Daily |

#### Sample Analytics Response

```json
{
  "organizationId": "org_123",
  "period": "2026-03",
  "metrics": {
    "totalRevenue": 125000.00,
    "totalPayments": 450,
    "successfulPayments": 432,
    "failedPayments": 18,
    "refundAmount": 3200.00,
    "successRate": 96.0,
    "averageTransactionValue": 289.47,
    "refundRate": 2.56
  },
  "byPaymentMethod": {
    "credit_card": { "count": 380, "amount": 106400.00 },
    "debit_card": { "count": 45, "amount": 13500.00 },
    "bank_transfer": { "count": 25, "amount": 5100.00 }
  },
  "trends": {
    "daily": [...],
    "weekly": [...],
    "monthly": [...]
  }
}
```

### 4.2 Invoice Analytics

#### Invoice Report Structure

```typescript
interface InvoiceReport {
  organizationId: string;
  period: {
    start: string;
    end: string;
  };
  
  summary: {
    totalInvoices: number;
    totalAmount: number;
    paidAmount: number;
    unpaidAmount: number;
    overdueAmount: number;
    averageInvoiceAmount: number;
    paymentRate: number;  // Percentage
  };
  
  invoices: Array<{
    id: string;
    invoiceNumber: string;
    customerName: string;
    amount: number;
    status: string;
    dueDate: Date;
    paidDate?: Date;
    daysOverdue?: number;
  }>;
  
  trends: Array<{
    period: string;
    invoiceCount: number;
    totalAmount: number;
    averageAmount: number;
  }>;
  
  topCustomers: Array<{
    customerId: string;
    customerName: string;
    invoiceCount: number;
    totalAmount: number;
    averageAmount: number;
  }>;
}
```

#### Key Invoice KPIs

| KPI | Formula | Target | Industry Avg |
|-----|---------|--------|--------------|
| **Days Sales Outstanding (DSO)** | (AR / Total Sales) × Days | <30 days | 45 days |
| **Collection Effectiveness Index** | (Beginning AR + Sales - Ending AR) / (Beginning AR + Sales - Ending AR + Current AR) × 100 | >80% | 70% |
| **Bad Debt Ratio** | Bad Debt / Total Sales × 100 | <2% | 3-5% |
| **Invoice Dispute Rate** | Disputed Invoices / Total Invoices × 100 | <5% | 8% |
| **Electronic Payment Adoption** | Electronic / Total Payments × 100 | >70% | 60% |

---

## 5. Security & Compliance

### 5.1 PCI DSS Compliance

#### Scope Reduction

| Component | Responsibility | Compliance Status |
|-----------|----------------|-------------------|
| **Card Data Entry** | Stripe Elements | ✅ Stripe handles |
| **Card Data Storage** | Stripe Vault | ✅ Stripe handles |
| **Card Data Transmission** | Stripe.js | ✅ Stripe handles |
| **Server Environment** | Kaydex | ✅ SAQ-A eligible |

**Kaydex is PCI SAQ-A compliant** - Stripe handles all cardholder data.

### 5.2 Data Encryption

#### At Rest

| Data Type | Encryption | Key Management |
|-----------|------------|--------------|
| **Payment Methods** | AES-256 | Stripe Vault |
| **Transaction IDs** | AES-256 | AWS KMS |
| **Billing Addresses** | AES-256 | Application-level |
| **Tax IDs** | AES-256 | Application-level |

#### In Transit

| Channel | Protocol | Cipher |
|---------|----------|--------|
| **API** | TLS 1.3 | AES-256-GCM |
| **Webhook** | TLS 1.3 | AES-256-GCM |
| **Dashboard** | TLS 1.3 | AES-256-GCM |

### 5.3 Audit Trail

#### Financial Audit Logging

Every financial action is logged with:

| Field | Description | Example |
|-------|-------------|---------|
| **timestamp** | ISO 8601 timestamp | 2026-03-23T10:30:00Z |
| **userId** | Actor identifier | user_abc123 |
| **organizationId** | Scope identifier | org_xyz789 |
| **action** | Action type | payment.created |
| **resource** | Resource type | payment |
| **resourceId** | Resource identifier | pay_def456 |
| **changes** | Before/after values | { amount: [100, 150] } |
| **ipAddress** | Source IP | 192.168.1.1 |
| **userAgent** | Client info | Mozilla/5.0... |
| **status** | Outcome | success/failure |

#### Audit Log Retention

| Log Type | Retention Period | Storage |
|----------|------------------|---------|
| **Payment Transactions** | 7 years | Encrypted DB + S3 |
| **Invoice Changes** | 7 years | Encrypted DB |
| **Subscription Changes** | 7 years | Encrypted DB |
| **User Access** | 2 years | Encrypted DB |
| **System Events** | 1 year | CloudWatch |

---

## 6. API Reference

### 6.1 Payment Endpoints

#### Create Payment Intent

```http
POST /api/payments/intents
Content-Type: application/json
Authorization: Bearer {token}

{
  "organizationId": "org_123",
  "amount": 1000,
  "currency": "USD",
  "paymentMethodId": "pm_abc123",
  "invoiceId": "inv_def456",
  "description": "Professional Plan - March 2026",
  "metadata": {
    "plan": "professional",
    "period": "2026-03"
  },
  "confirmImmediately": false
}

Response:
{
  "success": true,
  "data": {
    "paymentIntentId": "pi_ghi789",
    "clientSecret": "pi_ghi789_secret_...",
    "status": "requires_confirmation",
    "amount": 1000,
    "currency": "USD"
  }
}
```

#### Process Refund

```http
POST /api/payments/{paymentId}/refund
Content-Type: application/json
Authorization: Bearer {token}

{
  "amount": 500,  // Partial refund, omit for full
  "reason": "requested_by_customer",
  "metadata": {
    "requestReason": "Service not as expected",
    "approvedBy": "admin_123"
  }
}

Response:
{
  "success": true,
  "data": {
    "refundId": "re_ref456",
    "amount": 500,
    "status": "succeeded",
    "paymentId": "pay_abc123"
  }
}
```

### 6.2 Invoice Endpoints

#### Create Invoice

```http
POST /api/invoices
Content-Type: application/json
Authorization: Bearer {token}

{
  "organizationId": "org_123",
  "subscriptionId": "sub_def456",
  "items": [
    {
      "description": "Professional Plan - March 2026",
      "quantity": 1,
      "unitPrice": 7900,  // $79.00 in cents
      "taxRate": 0.0825   // 8.25% CA tax
    }
  ],
  "dueDate": "2026-03-31",
  "taxRate": 0.0825,
  "currency": "USD",
  "metadata": {
    "period": "2026-03",
    "plan": "professional"
  }
}

Response:
{
  "success": true,
  "data": {
    "invoiceId": "inv_ghi789",
    "invoiceNumber": "INV-2026-001234",
    "amount": 7900,
    "tax": 651.75,
    "total": 8551.75,
    "status": "draft",
    "stripeInvoiceId": "in_stripe_123"
  }
}
```

#### Get Invoice Report

```http
GET /api/invoices/report?organizationId=org_123&startDate=2026-01-01&endDate=2026-03-31
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "summary": {
      "totalInvoices": 150,
      "totalAmount": 125000.00,
      "paidAmount": 110000.00,
      "unpaidAmount": 10000.00,
      "overdueAmount": 5000.00,
      "averageInvoiceAmount": 833.33,
      "paymentRate": 88.0
    },
    "invoices": [...],
    "trends": [...],
    "topCustomers": [...]
  }
}
```

### 6.3 Billing Endpoints

#### Create Subscription

```http
POST /api/billing/subscriptions
Content-Type: application/json
Authorization: Bearer {token}

{
  "organizationId": "org_123",
  "plan": "professional",
  "billingCycle": "monthly",
  "seats": 10,
  "paymentMethodId": "pm_abc123",
  "trialPeriodDays": 14,
  "metadata": {
    "source": "website",
    "campaign": "spring_2026"
  }
}

Response:
{
  "success": true,
  "data": {
    "subscriptionId": "sub_def456",
    "stripeSubscriptionId": "sub_stripe_789",
    "status": "trialing",
    "plan": "professional",
    "amount": 7900,
    "currentPeriodStart": "2026-03-23",
    "currentPeriodEnd": "2026-04-23",
    "trialEndsAt": "2026-04-06"
  }
}
```

---

## 7. Webhook Integration

### 7.1 Webhook Events

#### Payment Events

| Event | Description | Action |
|-------|-------------|--------|
| `payment_intent.succeeded` | Payment completed | Update invoice, send receipt |
| `payment_intent.payment_failed` | Payment failed | Retry, notify customer |
| `payment_intent.canceled` | Payment canceled | Log, notify admin |
| `charge.refunded` | Refund processed | Update invoice, notify customer |
| `charge.dispute.created` | Chargeback filed | Alert finance, gather evidence |

#### Invoice Events

| Event | Description | Action |
|-------|-------------|--------|
| `invoice.payment_succeeded` | Invoice paid | Send receipt, update metrics |
| `invoice.payment_failed` | Invoice unpaid | Dunning sequence |
| `invoice.finalized` | Invoice locked | Prevent edits, send to customer |
| `invoice.voided` | Invoice canceled | Reverse accounting entries |

#### Subscription Events

| Event | Description | Action |
|-------|-------------|--------|
| `customer.subscription.created` | New subscription | Welcome email, onboarding |
| `customer.subscription.updated` | Plan changed | Update features, prorate |
| `customer.subscription.deleted` | Subscription ended | Cancel access, retention |
| `customer.subscription.trial_will_end` | Trial expiring soon | Upgrade prompt |

### 7.2 Webhook Security

#### Signature Verification

```typescript
import crypto from 'crypto';

function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

#### Webhook Best Practices

1. **Idempotency** - Handle duplicate events gracefully
2. **Retries** - Return 200 only after successful processing
3. **Logging** - Log all webhooks for debugging
4. **Ordering** - Process events in order using timestamp
5. **Replay** - Support manual replay for missed events

---

## 8. Error Handling & Recovery

### 8.1 Payment Failures

#### Common Failure Reasons

| Code | Reason | Action | Retry |
|------|--------|--------|-------|
| `card_declined` | Bank declined | Request new method | Manual |
| `insufficient_funds` | No money | Retry in 3 days | ✅ Yes |
| `expired_card` | Card expired | Request update | Manual |
| `incorrect_cvc` | Wrong CVC | Request correction | Manual |
| `processing_error` | Bank error | Retry in 1 hour | ✅ Yes |
| `issuer_not_available` | Bank down | Retry in 1 hour | ✅ Yes |

#### Smart Retry Logic

```typescript
const retrySchedule = {
  1: { delay: 24 * 60 * 60 * 1000, email: 'friendly_reminder' },     // 1 day
  2: { delay: 3 * 24 * 60 * 60 * 1000, email: 'urgent_notice' },    // 3 days
  3: { delay: 7 * 24 * 60 * 60 * 1000, email: 'final_notice' },     // 7 days
};
```

### 8.2 Disaster Recovery

#### Payment System Failover

| Scenario | Primary | Backup | Recovery Time |
|----------|---------|--------|---------------|
| **Stripe API down** | Stripe | Square | 5 minutes |
| **Database failure** | Primary RDS | Read replica | 15 minutes |
| **Webhook failure** | Live webhooks | Replay queue | 1 hour |
| **Complete region failure** | us-east-1 | us-west-2 | 30 minutes |

#### Data Backup Strategy

| Data | Frequency | Retention | Storage |
|------|-----------|-----------|---------|
| **Payment records** | Real-time | 7 years | Cross-region RDS + S3 |
| **Invoice PDFs** | Daily | 7 years | S3 with versioning |
| **Transaction logs** | Real-time | 7 years | CloudWatch + S3 |
| **Audit logs** | Real-time | 7 years | Encrypted S3 |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| **ACH** | Automated Clearing House - US bank transfer network |
| **AR** | Accounts Receivable - money owed by customers |
| **ARR** | Annual Recurring Revenue - yearly subscription revenue |
| **DSO** | Days Sales Outstanding - average collection period |
| **MRR** | Monthly Recurring Revenue - monthly subscription revenue |
| **PCI DSS** | Payment Card Industry Data Security Standard |
| **Proration** | Adjusting charges based on partial period |
| **SAQ** | Self-Assessment Questionnaire - PCI compliance form |
| **Stripe** | Payment processing platform |
| **Webhook** | HTTP callback for event notifications |

---

## Appendix B: Support & Escalation

### Billing Support Tiers

| Tier | Response Time | Channels | Cost |
|------|---------------|----------|------|
| **Self-Service** | N/A | Documentation, FAQs | Free |
| **Standard** | 24 business hours | Email | Included |
| **Business** | 4 business hours | Email, Chat | $1,000/mo |
| **Premium** | 1 business hour | Email, Chat, Phone | $5,000/mo |
| **Enterprise** | 1 hour (24/7) | All + dedicated CSM | $15,000/mo |

### Escalation Matrix

| Issue Type | First Response | Escalation | Resolution Target |
|------------|----------------|------------|-------------------|
| **Payment failure** | Auto-retry | Support after 2nd failure | 24 hours |
| **Refund request** | Auto-acknowledge | Finance approval >$1K | 48 hours |
| **Disputed charge** | Auto-alert | Legal + Finance | 7 days |
| **Billing error** | Support ticket | Engineering if bug | 72 hours |
| **Feature request** | CSM capture | Product review | 30 days |

---

**Document Control:**
- Version: 1.0
- Last Updated: March 23, 2026
- Owner: Finance & Engineering
- Distribution: All Teams, Customers (public portions)
- Review Cycle: Quarterly

**Next Review:** June 23, 2026
