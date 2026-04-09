/**
 * Secure Authentication Error Handler
 * Provides secure, standardized error handling for authentication paths
 * Prevents information leakage and implements proper security measures
 */

import axios from 'axios';
import { generateErrorId, makeApiError } from '../lib/api-error';
import { consolidatedAuditService } from '../services/consolidated-audit-service';
import { rateLimitMiddleware, RateLimitPresets } from '../services/consolidated-rate-limit-service';
import { logger } from '../lib/production-logger';

// Error categories for classification
export enum AuthErrorCategory {
  VALIDATION = 'validation',
  CREDENTIALS = 'credentials',
  RATE_LIMIT = 'rate_limit',
  SESSION = 'session',
  ACCOUNT = 'account',
  SYSTEM = 'system',
  SECURITY = 'security'
}

// Error severity levels
export enum AuthErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Authentication error interface
export interface AuthError {
  id: string;
  category: AuthErrorCategory;
  severity: AuthErrorSeverity;
  code: string;
  message: string;
  userMessage: string;
  timestamp: Date;
  context: {
    ip?: string;
    userAgent?: string;
    userId?: string;
    email?: string;
    endpoint?: string;
    requestId?: string;
  };
  shouldLog: boolean;
  shouldAlert: boolean;
  metadata?: Record<string, any>;
}

// Error classification rules
const ERROR_CLASSIFICATION = {
  // Validation errors
  'VALIDATION_ERROR': { category: AuthErrorCategory.VALIDATION, severity: AuthErrorSeverity.LOW },
  'INVALID_EMAIL': { category: AuthErrorCategory.VALIDATION, severity: AuthErrorSeverity.LOW },
  'INVALID_PASSWORD': { category: AuthErrorCategory.VALIDATION, severity: AuthErrorSeverity.LOW },
  'WEAK_PASSWORD': { category: AuthErrorCategory.VALIDATION, severity: AuthErrorSeverity.MEDIUM },
  
  // Credential errors
  'INVALID_CREDENTIALS': { category: AuthErrorCategory.CREDENTIALS, severity: AuthErrorSeverity.MEDIUM },
  'ACCOUNT_LOCKED': { category: AuthErrorCategory.CREDENTIALS, severity: AuthErrorSeverity.HIGH },
  'ACCOUNT_SUSPENDED': { category: AuthErrorCategory.CREDENTIALS, severity: AuthErrorSeverity.HIGH },
  
  // Rate limit errors
  'RATE_LIMIT_EXCEEDED': { category: AuthErrorCategory.RATE_LIMIT, severity: AuthErrorSeverity.HIGH },
  'TOO_MANY_ATTEMPTS': { category: AuthErrorCategory.RATE_LIMIT, severity: AuthErrorSeverity.HIGH },
  
  // Session errors
  'SESSION_EXPIRED': { category: AuthErrorCategory.SESSION, severity: AuthErrorSeverity.MEDIUM },
  'SESSION_INVALID': { category: AuthErrorCategory.SESSION, severity: AuthErrorSeverity.MEDIUM },
  'TOKEN_REVOKED': { category: AuthErrorCategory.SESSION, severity: AuthErrorSeverity.MEDIUM },
  
  // Account errors
  'ACCOUNT_NOT_FOUND': { category: AuthErrorCategory.ACCOUNT, severity: AuthErrorSeverity.MEDIUM },
  'ACCOUNT_NOT_VERIFIED': { category: AuthErrorCategory.ACCOUNT, severity: AuthErrorSeverity.MEDIUM },
  'DUPLICATE_EMAIL': { category: AuthErrorCategory.ACCOUNT, severity: AuthErrorSeverity.LOW },
  
  // Security errors
  'SUSPICIOUS_ACTIVITY': { category: AuthErrorCategory.SECURITY, severity: AuthErrorSeverity.HIGH },
  'BRUTE_FORCE_DETECTED': { category: AuthErrorCategory.SECURITY, severity: AuthErrorSeverity.CRITICAL },
  'UNAUTHORIZED_ACCESS': { category: AuthErrorCategory.SECURITY, severity: AuthErrorSeverity.HIGH },
  'CSRF_INVALID': { category: AuthErrorCategory.SECURITY, severity: AuthErrorSeverity.MEDIUM },
  
  // System errors
  'DATABASE_ERROR': { category: AuthErrorCategory.SYSTEM, severity: AuthErrorSeverity.HIGH },
  'EXTERNAL_SERVICE_ERROR': { category: AuthErrorCategory.SYSTEM, severity: AuthErrorSeverity.HIGH },
  'INTERNAL_ERROR': { category: AuthErrorCategory.SYSTEM, severity: AuthErrorSeverity.CRITICAL }
} as const;

// User-friendly messages (don't expose internal details)
const USER_MESSAGES = {
  [AuthErrorCategory.VALIDATION]: 'Please check your input and try again.',
  [AuthErrorCategory.CREDENTIALS]: 'Invalid email or password. Please try again.',
  [AuthErrorCategory.RATE_LIMIT]: 'Too many attempts. Please try again later.',
  [AuthErrorCategory.SESSION]: 'Your session has expired. Please log in again.',
  [AuthErrorCategory.ACCOUNT]: 'There was an issue with your account. Please contact support.',
  [AuthErrorCategory.SECURITY]: 'Security check failed. Please try again or contact support.',
  [AuthErrorCategory.SYSTEM]: 'Something went wrong. Please try again later.'
};

export class SecureAuthErrorHandler {
  private static instance: SecureAuthErrorHandler;
  private errorCounts = new Map<string, { count: number; resetTime: number }>();
  private securityEvents = new Map<string, number>();

  static getInstance(): SecureAuthErrorHandler {
    if (!SecureAuthErrorHandler.instance) {
      SecureAuthErrorHandler.instance = new SecureAuthErrorHandler();
    }
    return SecureAuthErrorHandler.instance;
  }

  /**
   * Handle authentication errors securely
   */
  async handleAuthError(
    c: Context,
    error: Error | string,
    context: Partial<AuthError['context']> = {}
  ): Promise<Response> {
    const errorId = generateErrorId();
    const timestamp = new Date();
    
    // Extract request context
    const requestContext = this.extractRequestContext(c);
    
    // Classify the error
    const authError = this.classifyError(error, errorId, timestamp, {
      ...requestContext,
      ...context
    });

    // Log the error securely
    if (authError.shouldLog) {
      await this.logError(authError);
    }

    // Check for security patterns
    await this.checkSecurityPatterns(authError);

    // Send alerts if needed
    if (authError.shouldAlert) {
      await this.sendSecurityAlert(authError);
    }

    // Return secure error response
    return this.createErrorResponse(c, authError);
  }

  /**
   * Classify error based on type and content
   */
  private classifyError(
    error: Error | string,
    errorId: string,
    timestamp: Date,
    context: AuthError['context']
  ): AuthError {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const errorCode = this.extractErrorCode(error);
    
    const classification = ERROR_CLASSIFICATION[errorCode] || {
      category: AuthErrorCategory.SYSTEM,
      severity: AuthErrorSeverity.MEDIUM
    };

    // Determine if error should be logged and alerted
    const shouldLog = classification.severity !== AuthErrorSeverity.LOW;
    const shouldAlert = classification.severity === AuthErrorSeverity.HIGH || 
                       classification.severity === AuthErrorSeverity.CRITICAL;

    return {
      id: errorId,
      category: classification.category,
      severity: classification.severity,
      code: errorCode,
      message: errorMessage,
      userMessage: USER_MESSAGES[classification.category],
      timestamp,
      context,
      shouldLog,
      shouldAlert,
      metadata: this.extractErrorMetadata(error)
    };
  }

  /**
   * Extract error code from error
   */
  private extractErrorCode(error: Error | string): string {
    if (typeof error === 'string') {
      // Try to match common error patterns
      if (error.toLowerCase().includes('validation')) return 'VALIDATION_ERROR';
      if (error.toLowerCase().includes('credential')) return 'INVALID_CREDENTIALS';
      if (error.toLowerCase().includes('rate limit')) return 'RATE_LIMIT_EXCEEDED';
      if (error.toLowerCase().includes('session')) return 'SESSION_INVALID';
      if (error.toLowerCase().includes('duplicate')) return 'DUPLICATE_EMAIL';
      if (error.toLowerCase().includes('locked')) return 'ACCOUNT_LOCKED';
      if (error.toLowerCase().includes('suspended')) return 'ACCOUNT_SUSPENDED';
      if (error.toLowerCase().includes('csrf')) return 'CSRF_INVALID';
      return 'UNKNOWN_ERROR';
    }

    // For Error objects, check constructor name or message
    if (error.name === 'ValidationError') return 'VALIDATION_ERROR';
    if (error.name === 'AuthenticationError') return 'INVALID_CREDENTIALS';
    if (error.name === 'RateLimitError') return 'RATE_LIMIT_EXCEEDED';
    if (error.name === 'SessionError') return 'SESSION_INVALID';
    
    return 'UNKNOWN_ERROR';
  }

  /**
   * Extract request context
   */
  private extractRequestContext(c: Context): AuthError['context'] {
    const ip = this.getClientIP(c);
    const userAgent = c.req.header('User-Agent');
    const requestId = c.get('requestId') || generateErrorId();
    
    return {
      ip,
      userAgent,
      requestId,
      endpoint: c.req.path
    };
  }

  /**
   * Extract additional error metadata
   */
  private extractErrorMetadata(error: Error | string): Record<string, any> {
    if (typeof error === 'string') {
      return { originalMessage: error };
    }

    return {
      name: error.name,
      stack: error.stack,
      ...(error as any).code && { code: (error as any).code }
    };
  }

  /**
   * Log error securely
   */
  private async logError(authError: AuthError): Promise<void> {
    try {
      // Log to audit service
      await consolidatedAuditService.createAuditLog({
        organizationId: authError.context.organizationId,
        userId: authError.context.userId,
        action: 'auth.error',
        resource: 'authentication',
        severity: authError.severity,
        status: 'failure',
        metadata: {
          errorId: authError.id,
          category: authError.category,
          code: authError.code,
          ip: authError.context.ip,
          userAgent: authError.context.userAgent,
          endpoint: authError.context.endpoint
        }
      });
    } catch (loggingError) {
      // Fail silently to avoid exposing logging issues
      logger.error('Failed to log auth error:', loggingError);
    }
  }

  /**
   * Check for security patterns
   */
  private async checkSecurityPatterns(authError: AuthError): Promise<void> {
    const key = `${authError.context.ip}:${authError.category}`;
    const now = Date.now();
    
    // Track error frequency
    const current = this.errorCounts.get(key) || { count: 0, resetTime: now + 300000 }; // 5 minutes
    current.count++;
    this.errorCounts.set(key, current);

    // Check for brute force patterns
    if (authError.category === AuthErrorCategory.CREDENTIALS && current.count >= 5) {
      await this.handleBruteForceDetection(authError);
    }

    // Check for suspicious activity
    if (current.count >= 10) {
      await this.handleSuspiciousActivity(authError);
    }

    // Cleanup old entries
    if (current.resetTime <= now) {
      this.errorCounts.delete(key);
    }
  }

  /**
   * Handle brute force detection
   */
  private async handleBruteForceDetection(authError: AuthError): Promise<void> {
    const key = `brute_force:${authError.context.ip}`;
    this.securityEvents.set(key, Date.now());

    // Log security event
    await consolidatedAuditService.createAuditLog({
      organizationId: authError.context.organizationId,
      action: 'security.brute_force_detected',
      resource: 'authentication',
      severity: 'critical',
      status: 'failure',
      metadata: {
        ip: authError.context.ip,
        userAgent: authError.context.userAgent,
        errorCount: this.errorCounts.get(`${authError.context.ip}:${authError.category}`)?.count,
        errorCategory: authError.category
      }
    });
  }

  /**
   * Handle suspicious activity
   */
  private async handleSuspiciousActivity(authError: AuthError): Promise<void> {
    // Log suspicious activity
    await consolidatedAuditService.createAuditLog({
      organizationId: authError.context.organizationId,
      action: 'security.suspicious_activity',
      resource: 'authentication',
      severity: 'high',
      status: 'failure',
      metadata: {
        ip: authError.context.ip,
        userAgent: authError.context.userAgent,
        errorPattern: authError.category,
        frequency: this.errorCounts.get(`${authError.context.ip}:${authError.category}`)?.count
      }
    });
  }

  /**
   * Send security alerts to external systems
   */
  private async sendSecurityAlert(authError: AuthError): Promise<void> {
    const slackWebhookUrl = process.env.SLACK_SECURITY_WEBHOOK_URL;
    const pagerDutyRoutingKey = process.env.PAGERDUTY_ROUTING_KEY;

    if (process.env.NODE_ENV === 'development') {
      logger.warn(`🚨 Security Alert [${authError.severity.toUpperCase()}]: ${authError.code}`, {
        errorId: authError.id,
        ip: authError.context.ip,
        category: authError.category
      });
    }

    const alertPayload = {
      text: `🚨 *Security Alert [${authError.severity.toUpperCase()}]*`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Security Alert Detected*\n*Code:* ${authError.code}\n*Severity:* ${authError.severity}\n*IP:* ${authError.context.ip}\n*Endpoint:* ${authError.context.endpoint}`
          }
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `*Error ID:* ${authError.id} | *Time:* ${authError.timestamp.toISOString()}`
            }
          ]
        }
      ]
    };

    // Dispatch to Slack
    if (slackWebhookUrl) {
      axios.post(slackWebhookUrl, alertPayload).catch(err => 
        logger.error('Failed to dispatch Slack security alert:', err.message)
      );
    }

    // Dispatch to PagerDuty for critical alerts
    if (pagerDutyRoutingKey && authError.severity === AuthErrorSeverity.CRITICAL) {
      axios.post('https://events.pagerduty.com/v2/enqueue', {
        payload: {
          summary: `Critical Security Event: ${authError.code}`,
          severity: 'critical',
          source: 'kaytx-auth-handler',
          component: 'authentication',
          custom_details: {
            errorId: authError.id,
            ip: authError.context.ip,
            userAgent: authError.context.userAgent,
            endpoint: authError.context.endpoint
          }
        },
        routing_key: pagerDutyRoutingKey,
        event_action: 'trigger'
      }).catch(err => 
        logger.error('Failed to dispatch PagerDuty security alert:', err.message)
      );
    }
  }

  /**
   * Create secure error response
   */
  private createErrorResponse(c: Context, authError: AuthError): Response {
    const statusCode = this.getStatusCode(authError);
    
    // Return user-friendly message without internal details
    return makeApiError(c, statusCode, authError.code, authError.userMessage, {
      errorId: authError.id,
      timestamp: authError.timestamp.toISOString()
    });
  }

  /**
   * Get appropriate HTTP status code
   */
  private getStatusCode(authError: AuthError): number {
    switch (authError.category) {
      case AuthErrorCategory.VALIDATION:
        return 400;
      case AuthErrorCategory.CREDENTIALS:
        return 401;
      case AuthErrorCategory.RATE_LIMIT:
        return 429;
      case AuthErrorCategory.SESSION:
        return 401;
      case AuthErrorCategory.ACCOUNT:
        return 403;
      case AuthErrorCategory.SECURITY:
        return 403;
      case AuthErrorCategory.SYSTEM:
        return 500;
      default:
        return 500;
    }
  }

  /**
   * Get client IP safely
   */
  private getClientIP(c: Context): string | undefined {
    // Try various headers for the real IP
    const forwardedFor = c.req.header('X-Forwarded-For');
    const realIP = c.req.header('X-Real-IP');
    const clientIP = c.req.header('CF-Connecting-IP'); // Cloudflare
    
    if (forwardedFor) {
      return forwardedFor.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (clientIP) {
      return clientIP;
    }
    
    // Fallback to connection IP (might not be available in all environments)
    return c.req.header('x-forwarded-for') || 
           c.req.header('x-real-ip') || 
           c.env?.REMOTE_ADDR;
  }

  /**
   * Cleanup old security events
   */
  cleanup(): void {
    const now = Date.now();
    const oneHour = 3600000; // 1 hour in milliseconds

    // Clean up old error counts
    for (const [key, value] of this.errorCounts.entries()) {
      if (value.resetTime <= now) {
        this.errorCounts.delete(key);
      }
    }

    // Clean up old security events
    for (const [key, timestamp] of this.securityEvents.entries()) {
      if (timestamp + oneHour <= now) {
        this.securityEvents.delete(key);
      }
    }
  }
}

// Export singleton instance
export const secureAuthErrorHandler = SecureAuthErrorHandler.getInstance();

// Middleware function for easy integration
export function handleAuthError(error: Error | string, context?: Partial<AuthError['context']>) {
  return async (c: Context) => {
    return secureAuthErrorHandler.handleAuthError(c, error, context);
  };
}
