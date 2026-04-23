/**
 * Secure Authentication Middleware
 * Provides comprehensive security measures for authentication endpoints
 * Includes rate limiting, brute force protection, and secure error handling
 */

import { Context, Next } from 'hono';
import { secureAuthErrorHandler, AuthErrorCategory } from './secure-auth-error-handler';
import { consolidatedAuditService } from '../services/consolidated-audit-service';
import { rateLimitMiddleware, RateLimitPresets } from '../services/consolidated-rate-limit-service';

// Security configuration
const SECURITY_CONFIG = {
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutes
  maxPasswordResetRequests: 3,
  passwordResetWindow: 60 * 60 * 1000, // 1 hour
  maxRegistrationAttempts: 10,
  registrationWindow: 60 * 60 * 1000, // 1 hour
  suspiciousActivityThreshold: 10,
  suspiciousActivityWindow: 5 * 60 * 1000, // 5 minutes
  bruteForceThreshold: 20,
  bruteForceWindow: 10 * 60 * 1000, // 10 minutes
} as const;

// Track security events
interface SecurityEvent {
  count: number;
  lastAttempt: number;
  lockedUntil?: number;
  suspiciousCount?: number;
}

const securityEvents = new Map<string, SecurityEvent>();

/**
 * Middleware for secure authentication with comprehensive protection
 */
export async function secureAuthMiddleware(c: Context, next: Next) {
  const ip = getClientIP(c);
  const userAgent = c.req.header('User-Agent') || '';
  const endpoint = c.req.path;
  
  try {
    // Check for IP-level blocks
    const ipStatus = checkIPStatus(ip);
    if (ipStatus.lockedUntil && ipStatus.lockedUntil > Date.now()) {
      return await secureAuthErrorHandler.handleAuthError(c, 'RATE_LIMIT_EXCEEDED', {
        ip,
        userAgent,
        endpoint
      });
    }

    // Check for suspicious activity patterns
    const suspiciousActivity = checkSuspiciousActivity(ip, userAgent, endpoint);
    if (suspiciousActivity.isSuspicious) {
      await handleSuspiciousActivity(ip, userAgent, endpoint, suspiciousActivity.reason);
    }

    // Apply endpoint-specific security measures
    await applyEndpointSecurity(c, ip, userAgent);

    // Continue to the next middleware
    await next();

    // Log successful authentication attempts
    if (isAuthEndpoint(endpoint) && c.res.status < 400) {
      await logAuthSuccess(c, ip, userAgent);
    }

  } catch (error) {
    // Handle any errors securely
    return await secureAuthErrorHandler.handleAuthError(c, error as Error, {
      ip,
      userAgent,
      endpoint
    });
  }
}

/**
 * Apply endpoint-specific security measures
 */
async function applyEndpointSecurity(c: Context, ip: string, userAgent: string): Promise<void> {
  const endpoint = c.req.path;
  const method = c.req.method;

  // Login endpoint security
  if (endpoint === '/auth/login' && method === 'POST') {
    await applyLoginSecurity(c, ip, userAgent);
  }

  // Password reset security
  if (endpoint === '/auth/reset-password' && method === 'POST') {
    await applyPasswordResetSecurity(c, ip, userAgent);
  }

  // Registration security
  if (endpoint === '/auth/register' && method === 'POST') {
    await applyRegistrationSecurity(c, ip, userAgent);
  }

  // Email verification security
  if (endpoint.includes('/verify-email') && method === 'POST') {
    await applyEmailVerificationSecurity(c, ip, userAgent);
  }
}

/**
 * Apply login-specific security measures
 */
async function applyLoginSecurity(c: Context, ip: string, userAgent: string): Promise<void> {
  const key = `login:${ip}`;
  const now = Date.now();
  const event = securityEvents.get(key) || { count: 0, lastAttempt: 0 };

  // Reset count if window has passed
  if (now - event.lastAttempt > SECURITY_CONFIG.lockoutDuration) {
    event.count = 0;
  }

  // Check if locked out
  if (event.lockedUntil && event.lockedUntil > now) {
    const remainingTime = Math.ceil((event.lockedUntil - now) / 1000 / 60);
    throw new Error(`Too many login attempts. Please try again in ${remainingTime} minutes.`);
  }

  // Increment attempt count
  event.count++;
  event.lastAttempt = now;

  // Check if should be locked out
  if (event.count >= SECURITY_CONFIG.maxLoginAttempts) {
    event.lockedUntil = now + SECURITY_CONFIG.lockoutDuration;
    
    // Log lockout event
    await consolidatedAuditService.createAuditLog({
      action: 'security.account_locked',
      resource: 'authentication',
      severity: 'high',
      status: 'failure',
      metadata: {
        ip,
        userAgent,
        attemptCount: event.count,
        lockoutDuration: SECURITY_CONFIG.lockoutDuration
      }
    });
  }

  securityEvents.set(key, event);
}

/**
 * Apply password reset security measures
 */
async function applyPasswordResetSecurity(c: Context, ip: string, userAgent: string): Promise<void> {
  const key = `password_reset:${ip}`;
  const now = Date.now();
  const event = securityEvents.get(key) || { count: 0, lastAttempt: 0 };

  // Reset count if window has passed
  if (now - event.lastAttempt > SECURITY_CONFIG.passwordResetWindow) {
    event.count = 0;
  }

  // Check rate limit
  if (event.count >= SECURITY_CONFIG.maxPasswordResetRequests) {
    throw new Error('Too many password reset requests. Please try again later.');
  }

  event.count++;
  event.lastAttempt = now;
  securityEvents.set(key, event);
}

/**
 * Apply registration security measures
 */
async function applyRegistrationSecurity(c: Context, ip: string, userAgent: string): Promise<void> {
  const key = `registration:${ip}`;
  const now = Date.now();
  const event = securityEvents.get(key) || { count: 0, lastAttempt: 0 };

  // Reset count if window has passed
  if (now - event.lastAttempt > SECURITY_CONFIG.registrationWindow) {
    event.count = 0;
  }

  // Check rate limit
  if (event.count >= SECURITY_CONFIG.maxRegistrationAttempts) {
    throw new Error('Too many registration attempts. Please try again later.');
  }

  event.count++;
  event.lastAttempt = now;
  securityEvents.set(key, event);

  // Check for bot patterns in user agent
  if (isSuspiciousUserAgent(userAgent)) {
    await handleSuspiciousActivity(ip, userAgent, '/auth/register', 'Suspicious user agent detected');
  }
}

/**
 * Apply email verification security measures
 */
async function applyEmailVerificationSecurity(c: Context, ip: string, userAgent: string): Promise<void> {
  const key = `email_verify:${ip}`;
  const now = Date.now();
  const event = securityEvents.get(key) || { count: 0, lastAttempt: 0 };

  // Reset count if window has passed
  if (now - event.lastAttempt > SECURITY_CONFIG.passwordResetWindow) {
    event.count = 0;
  }

  // Check rate limit
  if (event.count >= 5) { // 5 attempts per hour
    throw new Error('Too many verification attempts. Please try again later.');
  }

  event.count++;
  event.lastAttempt = now;
  securityEvents.set(key, event);
}

/**
 * Check IP status for blocks and restrictions
 */
function checkIPStatus(ip: string): SecurityEvent {
  const key = `ip:${ip}`;
  return securityEvents.get(key) || { count: 0, lastAttempt: 0 };
}

/**
 * Check for suspicious activity patterns
 */
function checkSuspiciousActivity(ip: string, userAgent: string, endpoint: string): {
  isSuspicious: boolean;
  reason?: string;
} {
  const key = `suspicious:${ip}`;
  const now = Date.now();
  const event = securityEvents.get(key) || { count: 0, lastAttempt: 0, suspiciousCount: 0 };

  // Check for high frequency requests
  if (now - event.lastAttempt < 1000) { // Less than 1 second between requests
    return { isSuspicious: true, reason: 'High frequency requests' };
  }

  // Check for multiple endpoints being accessed rapidly
  const recentEndpoints = Array.from(securityEvents.keys())
    .filter(k => k.includes(ip) && !k.includes('suspicious'))
    .map(k => securityEvents.get(k))
    .filter(e => e && now - e.lastAttempt < 60000); // Last minute

  if (recentEndpoints.length > 5) {
    return { isSuspicious: true, reason: 'Multiple endpoint access' };
  }

  // Check for suspicious user agent
  if (isSuspiciousUserAgent(userAgent)) {
    return { isSuspicious: true, reason: 'Suspicious user agent' };
  }

  return { isSuspicious: false };
}

/**
 * Handle suspicious activity
 */
async function handleSuspiciousActivity(
  ip: string,
  userAgent: string,
  endpoint: string,
  reason: string
): Promise<void> {
  const key = `suspicious:${ip}`;
  const now = Date.now();
  const event = securityEvents.get(key) || { count: 0, lastAttempt: 0, suspiciousCount: 0 };

  event.suspiciousCount = (event.suspiciousCount || 0) + 1;
  event.lastAttempt = now;
  securityEvents.set(key, event);

  // Log suspicious activity
  await consolidatedAuditService.createAuditLog({
    action: 'security.suspicious_activity',
    resource: 'authentication',
    severity: 'high',
    status: 'failure',
    metadata: {
      ip,
      userAgent,
      endpoint,
      reason,
      suspiciousCount: event.suspiciousCount
    }
  });

  // Block IP if too much suspicious activity
  if (event.suspiciousCount >= SECURITY_CONFIG.suspiciousActivityThreshold) {
    const ipKey = `ip:${ip}`;
    const ipEvent = securityEvents.get(ipKey) || { count: 0, lastAttempt: 0 };
    ipEvent.lockedUntil = now + (30 * 60 * 1000); // 30 minutes
    securityEvents.set(ipKey, ipEvent);

    await consolidatedAuditService.createAuditLog({
      action: 'security.ip_blocked',
      resource: 'authentication',
      severity: 'critical',
      status: 'failure',
      metadata: {
        ip,
        userAgent,
        reason: 'Excessive suspicious activity',
        blockDuration: 30 * 60 * 1000
      }
    });
  }
}

/**
 * Log successful authentication
 */
async function logAuthSuccess(c: Context, ip: string, userAgent: string): Promise<void> {
  const endpoint = c.req.path;
  const userId = c.get('auth')?.userId;

  await consolidatedAuditService.createAuditLog({
    userId,
    action: 'auth.success',
    resource: 'authentication',
    severity: 'info',
    status: 'success',
    metadata: {
      ip,
      userAgent,
      endpoint
    }
  });
}

/**
 * Check if user agent is suspicious
 */
function isSuspiciousUserAgent(userAgent: string): boolean {
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /go-http/i,
    /node/i,
    /ruby/i,
    /php/i,
    /perl/i,
    /wget/i,
    /requests/i
  ];

  // Empty user agent is suspicious
  if (!userAgent || userAgent.trim() === '') {
    return true;
  }

  // Check for suspicious patterns
  return suspiciousPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Get client IP safely
 */
function getClientIP(c: Context): string {
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
  
  return 'unknown';
}

/**
 * Check if endpoint is an authentication endpoint
 */
function isAuthEndpoint(endpoint: string): boolean {
  return endpoint.startsWith('/auth/') || 
         endpoint.includes('/login') || 
         endpoint.includes('/register') || 
         endpoint.includes('/logout');
}

/**
 * Cleanup old security events
 */
export function cleanupSecurityEvents(): void {
  const now = Date.now();
  const oneHour = 3600000; // 1 hour

  for (const [key, event] of securityEvents.entries()) {
    // Clean up events older than 1 hour
    if (now - event.lastAttempt > oneHour) {
      securityEvents.delete(key);
    }
  }
}

/**
 * Get security statistics
 */
export function getSecurityStats(): {
  totalEvents: number;
  lockedIPs: number;
  suspiciousIPs: number;
  recentActivity: number;
} {
  const now = Date.now();
  const oneHour = 3600000;
  
  let lockedIPs = 0;
  let suspiciousIPs = 0;
  let recentActivity = 0;

  for (const [key, event] of securityEvents.entries()) {
    if (key.startsWith('ip:') && event.lockedUntil && event.lockedUntil > now) {
      lockedIPs++;
    }
    
    if (key.startsWith('suspicious:') && event.suspiciousCount && event.suspiciousCount > 0) {
      suspiciousIPs++;
    }
    
    if (now - event.lastAttempt < oneHour) {
      recentActivity++;
    }
  }

  return {
    totalEvents: securityEvents.size,
    lockedIPs,
    suspiciousIPs,
    recentActivity
  };
}
