import { Context, Next } from 'hono';
import { stripe } from '../services/stripe-service';
import { logger } from '../lib/production-logger';

/**
 * Production payment validation middleware
 */
export async function validateProductionPayments(c: Context, next: Next) {
  const path = c.req.path;
  
  // Only apply to payment-related routes
  if (!path.includes('/payment') && !path.includes('/billing') && !path.includes('/stripe')) {
    return next();
  }

  // Check if we're in production mode
  const isProduction = process.env.NODE_ENV === 'production';
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  
  if (isProduction) {
    // Production safeguards
    if (!stripeSecretKey) {
      return c.json({
        error: 'Payment service not configured',
        message: 'Stripe secret key is required in production'
      }, 500);
    }

    // Verify we're not using test keys in production
    if (stripeSecretKey.startsWith('sk_test_')) {
      logger.error('[PAYMENT-SECURITY] Test Stripe key detected in production!');
      return c.json({
        error: 'Configuration error',
        message: 'Test payment keys cannot be used in production'
      }, 500);
    }

    // Verify Stripe connectivity
    try {
      await stripe.accounts.retrieve();
    } catch (error) {
      logger.error('[PAYMENT-SECURITY] Stripe connectivity failed:', error);
      return c.json({
        error: 'Payment service unavailable',
        message: 'Unable to connect to payment provider'
      }, 503);
    }
  }

  // Add payment security headers
  c.header('X-Payment-Environment', isProduction ? 'production' : 'test');
  c.header('X-Payment-Provider', 'stripe');
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  await next();
}

/**
 * Payment amount validation
 */
export function validatePaymentAmount(c: Context, next: Next) {
  try {
    const body = c.req.json ? c.req.json() : {};
    
    if (body && typeof body === 'object' && 'amount' in body) {
      const amount = parseFloat(String(body.amount));
      
      // Validate amount limits
      if (amount < 0.50) {
        return c.json({
          error: 'Invalid amount',
          message: 'Minimum payment amount is $0.50'
        }, 400);
      }
      
      if (amount > 999999.99) {
        return c.json({
          error: 'Invalid amount',
          message: 'Maximum payment amount is $999,999.99'
        }, 400);
      }

      // Check for suspicious patterns
      if (amount % 1 === 0 && amount > 10000) {
        logger.warn('[PAYMENT-SECURITY] Large round amount payment:', amount);
      }
    }
  } catch (error) {
    logger.error('[PAYMENT-SECURITY] Error validating payment amount:', error);
    return c.json({
      error: 'Invalid request',
      message: 'Failed to process payment request'
    }, 400);
  }
  
  return next();
}

/**
 * Anti-fraud detection middleware
 */
export async function fraudDetection(c: Context, next: Next) {
  const auth = c.get('auth');
  const clientIP = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
  const userAgent = c.req.header('user-agent') || 'unknown';
  
  if (!auth?.userId) {
    return next();
  }

  try {
    // Check for suspicious patterns
    const suspicions = await detectSuspiciousPaymentActivity(auth.userId, clientIP, userAgent);
    
    if (suspicions.length > 0) {
      console.warn('[FRAUD-DETECTION] Suspicious activity detected:', {
        userId: auth.userId,
        suspicions,
        clientIP,
        userAgent
      });

      // If high risk, block the transaction
      if (suspicions.includes('HIGH_RISK')) {
        return c.json({
          error: 'Transaction blocked',
          message: 'Unable to process this transaction at this time'
        }, 403);
      }

      // If medium risk, require additional verification
      if (suspicions.includes('MEDIUM_RISK')) {
        c.header('X-Requires-Additional-Verification', 'true');
      }
    }
  } catch (error) {
    logger.error('[FRAUD-DETECTION] Error during fraud detection:', error);
    // Don't block the transaction on detection errors
  }

  await next();
}

/**
 * Detect suspicious payment activity
 */
async function detectSuspiciousPaymentActivity(
  userId: string, 
  clientIP: string, 
  userAgent: string
): Promise<string[]> {
  const suspicions: string[] = [];
  
  try {
    // Check for rapid successive payments
    const recentPayments = await getRecentPaymentCount(userId, 5); // Last 5 minutes
    if (recentPayments > 5) {
      suspicions.push('RAPID_PAYMENTS');
    }

    // Check for unusual payment amounts
    const unusualAmounts = await detectUnusualAmounts(userId);
    if (unusualAmounts) {
      suspicions.push('UNUSUAL_AMOUNT');
    }

    // Check for multiple IP addresses
    const multipleIPs = await detectMultipleIPs(userId, clientIP);
    if (multipleIPs) {
      suspicions.push('MULTIPLE_IPS');
    }

    // Check for high-risk countries
    const highRiskCountry = await detectHighRiskCountry(clientIP);
    if (highRiskCountry) {
      suspicions.push('HIGH_RISK');
    }

  } catch (error) {
    logger.error('[FRAUD-DETECTION] Error in suspicious activity detection:', error);
  }

  return suspicions;
}

/**
 * Helper functions for fraud detection
 */
async function getRecentPaymentCount(userId: string, minutes: number): Promise<number> {
  try {
    const { db } = await import('../db/connection');
    const { payments, eq, and, gte } = await import('../db/drizzle-schema');
    
    const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
    
    const result = await db
      .select()
      .from(payments)
      .where(
        and(
          eq(payments.userId, userId),
          gte(payments.createdAt, cutoffTime)
        )
      );
    
    return result.length;
  } catch (error) {
    logger.error('[PaymentSecurity] Error getting recent payment count:', error);
    return 0;
  }
}

async function detectUnusualAmounts(userId: string, amount?: number): Promise<boolean> {
  try {
    const { db } = await import('../db/connection');
    const { payments, eq, desc } = await import('../db/drizzle-schema');
    
    // Get user's recent payment history (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    const userPayments = await db
      .select()
      .from(payments)
      .where(
        eq(payments.userId, userId)
      )
      .orderBy(desc(payments.createdAt))
      .limit(50);
    
    if (userPayments.length < 3) {
      // Not enough history for pattern detection
      return false;
    }
    
    // Calculate average and standard deviation of payment amounts
    const amounts = userPayments.map(p => Number(p.amount || 0));
    const avgAmount = amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length;
    const variance = amounts.reduce((sum, amt) => sum + Math.pow(amt - avgAmount, 2), 0) / amounts.length;
    const stdDev = Math.sqrt(variance);
    
    // If current amount provided, check if it's unusual
    if (amount) {
      // Flag as unusual if more than 2 standard deviations from mean
      return Math.abs(amount - avgAmount) > (2 * stdDev);
    }
    
    // Check for any unusual patterns in recent payments
    const recentPayments = amounts.slice(0, 10); // Last 10 payments
    const unusualCount = recentPayments.filter(amt => 
      Math.abs(amt - avgAmount) > (2 * stdDev)
    ).length;
    
    // Flag if more than 30% of recent payments are unusual
    return unusualCount > (recentPayments.length * 0.3);
  } catch (error) {
    logger.error('[PaymentSecurity] Error detecting unusual amounts:', error);
    return false;
  }
}

async function detectMultipleIPs(userId: string, currentIP: string): Promise<boolean> {
  try {
    const { db } = await import('../db/connection');
    const { auditLogs, eq, and, gte, desc } = await import('../db/drizzle-schema');
    
    // Check user's recent IP addresses from audit logs (last 24 hours)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const recentLogs = await db
      .select()
      .from(auditLogs)
      .where(
        and(
          eq(auditLogs.userId, userId),
          gte(auditLogs.timestamp, twentyFourHoursAgo)
        )
      )
      .orderBy(desc(auditLogs.timestamp))
      .limit(50);
    
    // Extract unique IP addresses
    const uniqueIPs = new Set();
    recentLogs.forEach(log => {
      if (log.ipAddress && log.ipAddress !== currentIP) {
        uniqueIPs.add(log.ipAddress);
      }
    });
    
    // Flag if user has used more than 3 different IPs in 24 hours
    return uniqueIPs.size > 3;
  } catch (error) {
    logger.error('[PaymentSecurity] Error detecting multiple IPs:', error);
    return false;
  }
}

async function detectHighRiskCountry(clientIP: string): Promise<boolean> {
  try {
    // List of high-risk countries (simplified for demonstration)
    const HIGH_RISK_COUNTRIES = [
      'US', // United States (high fraud rate for online payments)
      'GB', // United Kingdom
      'CA', // Canada
      'AU', // Australia
      'DE', // Germany
      'FR', // France
      'IT', // Italy
      'ES', // Spain
      'NL', // Netherlands
      'BE', // Belgium
    ];
    
    // For production, use a proper IP geolocation service like MaxMind GeoIP2
    // This is a simplified implementation using IP ranges
    
    // Extract country code from IP (simplified - in production use GeoIP database)
    const countryCode = await getCountryFromIP(clientIP);
    
    return HIGH_RISK_COUNTRIES.includes(countryCode);
  } catch (error) {
    logger.error('[PaymentSecurity] Error detecting high-risk country:', error);
    return false;
  }
}

/**
 * Simplified IP to country mapping (for demonstration)
 * In production, use a proper GeoIP service or database
 */
async function getCountryFromIP(ip: string): Promise<string> {
  // This is a very simplified implementation
  // In production, use MaxMind GeoIP2 or similar service
  
  // For local development, return a safe default
  if (ip.startsWith('127.') || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return 'US'; // Default to US for local IPs
  }
  
  // For demonstration, return US for all IPs
  // In production, this would query a GeoIP database
  return 'US';
}

/**
 * PCI DSS compliance middleware
 */
export function enforcePCIDSS(c: Context, next: Next) {
  // Remove sensitive data from logs
  const originalJson = c.json;
  c.json = (data: any, statusOrInit?: number | ResponseInit) => {
    if (data && typeof data === 'object') {
      // Remove sensitive payment data from responses
      const sanitized = { ...data };
      delete sanitized.cardNumber;
      delete sanitized.cvv;
      delete sanitized.expiry;
      delete sanitized.stripeToken;
      delete sanitized.paymentMethodNonce;
      
      return originalJson.call(c, sanitized, statusOrInit);
    }
    return originalJson.call(c, data, statusOrInit);
  };

  // Add PCI DSS headers
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');

  return next();
}
