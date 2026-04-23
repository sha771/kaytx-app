/**
 * Payment utilities for validation and processing
 */

export interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  status: string;
  metadata?: Record<string, any>;
}

export interface FeeConfig {
  fixedFee: number;
  percentageFee: number;
  currency: string;
}

export interface FeeResult {
  fixed: number;
  percentage: number;
  total: number;
  netAmount: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Process payment amount and convert to decimal string
 */
export function processPaymentAmount(amountCents: number): string {
  return (amountCents / 100).toFixed(2);
}

/**
 * Calculate fees for a payment
 */
export function calculateFees(amount: number, feeConfig: FeeConfig): FeeResult {
  const fixed = feeConfig.fixedFee;
  const percentage = Math.floor(amount * feeConfig.percentageFee);
  const total = fixed + percentage;
  const netAmount = Math.max(0, amount - total);
  
  return {
    fixed,
    percentage,
    total,
    netAmount
  };
}

/**
 * Validate payment data structure
 */
export function validatePaymentData(data: any, type: string): ValidationResult {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Invalid data structure'] };
  }
  
  if (type === 'payment_intent') {
    // Check required fields
    if (!data.id) {
      errors.push('Missing payment ID');
    }
    
    if (!data.amount || data.amount <= 0) {
      errors.push('Invalid amount');
    }
    
    if (!data.currency) {
      errors.push('Missing currency');
    }
    
    // Check for valid currency
    const validCurrencies = ['usd', 'eur', 'gbp', 'USD', 'EUR', 'GBP'];
    if (data.currency && !validCurrencies.includes(data.currency)) {
      errors.push('Invalid currency');
    }
    
    // Check status if provided
    const validStatuses = [
      'requires_payment_method', 'requires_confirmation', 'requires_action',
      'processing', 'succeeded', 'canceled', 'pending', 'failed'
    ];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push('Invalid status');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
