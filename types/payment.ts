// Payment-related types and interfaces for the enterprise platform

export interface PaymentMethod {
  id: string;
  organizationId: string;
  type: 'card' | 'bank_account' | 'paypal' | 'crypto';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  stripePaymentMethodId: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentIntent {
  id: string;
  organizationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  paymentMethodId?: string;
  invoiceId?: string;
  description?: string;
  metadata: Record<string, any>;
  clientSecret?: string;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
}

export interface Invoice {
  id: string;
  organizationId: string;
  subscriptionId?: string;
  invoiceNumber: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled' | 'refunded' | 'failed';
  amount: string;
  tax: string;
  total: string;
  currency: string;
  dueDate?: Date;
  paidAt?: Date;
  transactionId?: string;
  paymentMethodId?: string;
  items: InvoiceItem[];
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  metadata?: Record<string, any>;
}

export interface Subscription {
  id: string;
  organizationId: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';
  status: 'active' | 'past_due' | 'cancelled' | 'trial' | 'paused';
  billingCycle: 'monthly' | 'annual';
  amount: string;
  currency: string;
  nextBillingDate?: Date;
  trialEndsAt?: Date;
  cancelledAt?: Date;
  cancellationReason?: string;
  features: SubscriptionFeatures;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionFeatures {
  users: number;
  storage: number;
  features: string[];
  additionalUsers?: number;
  apiCalls?: number;
  customIntegrations?: number;
}

export interface Refund {
  id: string;
  organizationId: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: 'pending' | 'succeeded' | 'failed';
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CustomerInfo {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  billingAddress?: BillingAddress;
  taxId?: string;
  metadata: Record<string, any>;
}

export interface PaymentStats {
  totalRevenue: number;
  totalPayments: number;
  successfulPayments: number;
  failedPayments: number;
  refundAmount: number;
  averageTransactionValue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  items: InvoiceItem[];
  taxRate: number;
  currency: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethodCreateParams {
  type: 'card' | 'bank_account';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  bankAccountNumber?: string;
  bankRoutingNumber?: string;
  accountHolderName: string;
  isDefault?: boolean;
  billingAddress?: BillingAddress;
}

export interface PaymentIntentCreateParams {
  amount: number;
  currency?: string;
  paymentMethodId?: string;
  invoiceId?: string;
  description?: string;
  metadata?: Record<string, any>;
  confirmImmediately?: boolean;
}

export interface InvoiceCreateParams {
  organizationId: string;
  subscriptionId?: string;
  items: InvoiceItem[];
  dueDate?: Date;
  taxRate?: number;
  currency?: string;
  metadata?: Record<string, any>;
}

export interface SubscriptionCreateParams {
  organizationId: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';
  billingCycle: 'monthly' | 'annual';
  trialPeriodDays?: number;
  paymentMethodId?: string;
  metadata?: Record<string, any>;
}

export interface RefundCreateParams {
  paymentId: string;
  amount?: number;
  reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' | 'expired_uncaptured_charge';
  metadata?: Record<string, any>;
}

// Stripe-specific types
export interface StripeCustomer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  metadata: Record<string, any>;
  created: number;
}

export interface StripePaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
    fingerprint: string;
    funding: string;
  };
  billing_details?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: BillingAddress;
  };
  created: number;
}

export interface StripeInvoice {
  id: string;
  number?: string;
  status: string;
  amount_due: number;
  amount_paid: number;
  amount_remaining: number;
  currency: string;
  due_date?: number;
  period_end: number;
  period_start: number;
  subtotal: number;
  tax: number;
  total: number;
  metadata: Record<string, any>;
  created: number;
}

export interface StripeSubscription {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  trial_start?: number;
  trial_end?: number;
  canceled_at?: number;
  items: StripeSubscriptionItem[];
  metadata: Record<string, any>;
  created: number;
}

export interface StripeSubscriptionItem {
  id: string;
  price: StripePrice;
  quantity: number;
}

export interface StripePrice {
  id: string;
  unit_amount: number;
  currency: string;
  recurring?: {
    interval: string;
    interval_count: number;
  };
  metadata: Record<string, any>;
}

// API Response types
export interface PaymentResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaymentListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Webhook event types
export interface WebhookEvent {
  id: string;
  type: string;
  data: {
    object: any;
  };
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request?: string;
}

// Error types
export interface PaymentError {
  code: string;
  message: string;
  type: string;
  param?: string;
  decline_code?: string;
}

// Configuration types
export interface PaymentConfig {
  stripe: {
    secretKey: string;
    publishableKey: string;
    webhookSecret: string;
    apiVersion: string;
  };
  features: {
    enableSubscriptions: boolean;
    enableInvoicing: boolean;
    enableRefunds: boolean;
    enableMultiplePaymentMethods: boolean;
  };
  limits: {
    maxPaymentAmount: number;
    minPaymentAmount: number;
    maxRefundAmount: number;
  };
}

// Plan configurations
export interface PlanConfig {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  currency: string;
  features: SubscriptionFeatures;
  limits: {
    users: number;
    storage: number;
    apiCalls: number;
    customIntegrations: number;
  };
  stripePriceIds: {
    monthly?: string;
    annual?: string;
  };
}

// Audit log types for payments
export interface PaymentAuditLog {
  id: string;
  organizationId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata: Record<string, any>;
  status: 'success' | 'failure';
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// Export all types for easy importing
export type {
  PaymentMethod as IPaymentMethod,
  PaymentIntent as IPaymentIntent,
  Invoice as IInvoice,
  InvoiceItem as IInvoiceItem,
  Subscription as ISubscription,
  SubscriptionFeatures as ISubscriptionFeatures,
  Refund as IRefund,
  BillingAddress as IBillingAddress,
  CustomerInfo as ICustomerInfo,
  PaymentStats as IPaymentStats,
  InvoiceTemplate as IInvoiceTemplate,
  PaymentMethodCreateParams as IPaymentMethodCreateParams,
  PaymentIntentCreateParams as IPaymentIntentCreateParams,
  InvoiceCreateParams as IInvoiceCreateParams,
  SubscriptionCreateParams as ISubscriptionCreateParams,
  RefundCreateParams as IRefundCreateParams,
  PaymentResponse as IPaymentResponse,
  PaymentListResponse as IPaymentListResponse,
  WebhookEvent as IWebhookEvent,
  PaymentError as IPaymentError,
  PaymentConfig as IPaymentConfig,
  PlanConfig as IPlanConfig,
  PaymentAuditLog as IPaymentAuditLog,
};
