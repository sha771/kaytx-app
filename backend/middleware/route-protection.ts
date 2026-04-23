 
import { Context, Next } from 'hono';
import { verifyToken } from '../lib/auth';
import { apiLimiter, authLimiter } from '../services/consolidated-rate-limit-service';

/**
 * Comprehensive route protection middleware
 */
export async function protectAllRoutes(c: Context, next: Next) {
  const path = c.req.path;
  const method = c.req.method;
  
  // Public routes that don't need protection - MINIMAL LIST FOR SECURITY
  const PUBLIC_ROUTES = [
    '/', // Root status
    '/health', // Health check
    '/ready', // Readiness check
    '/health/live', // Liveness check
    '/health/ready', // Readiness check
    '/auth/register', // User registration
    '/auth/login', // User login
    '/auth/verify-email', // Email verification
    '/auth/reset-password', // Password reset
    '/csrf-token', // CSRF token generation
    '/webhooks/stripe', // Stripe webhooks
    '/webhooks/enhanced-stripe', // Enhanced Stripe webhooks
    '/webhooks/platform/:platform', // Platform webhooks
    '/webhooks/twilio/status', // Twilio status webhooks
    '/webhooks/twilio/voice', // Twilio voice webhooks
    '/metrics', // Prometheus metrics
    '/openapi.yaml', // OpenAPI specification
    '/docs', // API documentation
    '/auth/sso/oidc/start/:orgSlug', // OIDC SSO start
  ];

  // Check if route is public - STRICT MATCHING FOR SECURITY
  const isPublic = PUBLIC_ROUTES.some(route => {
    if (route.includes(':')) {
      // Parameterized route - check pattern
      const routePattern = route.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(path);
    }
    // Exact match or prefix match for specific routes
    return path === route || (route.endsWith('/') && path.startsWith(route)) || path.startsWith(route + '/');
  });

  if (isPublic) {
    // Apply rate limiting to public endpoints
    await applyRateLimiting(c, path);
    return next();
  }

  // Protected routes require authentication
  const authHeader = c.req.header('authorization');
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    // Allow tRPC to handle its own auth if configured
    if (path.startsWith('/api/trpc') || path.startsWith('/api/v1/trpc')) {
      return next();
    }
    return c.json({ error: 'Authentication required' }, 401);
  }

  const token = authHeader.slice('bearer '.length).trim();
  const payload = verifyToken(token);
  
  if (!payload?.userId) {
    return c.json({ error: 'Invalid authentication token' }, 401);
  }

  // Validate session
  const { validateSession } = await import('../lib/auth');
  const sessionValidation = await validateSession(token) as any;
  
  if (!sessionValidation.valid || !sessionValidation.userId) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }

  if (String(sessionValidation.userId) !== String(payload.userId)) {
    return c.json({ error: 'Session mismatch' }, 401);
  }

  // Set auth context
  c.set('auth', {
    userId: sessionValidation.userId,
    sessionId: sessionValidation.session?.id,
    organizationId: sessionValidation.organizationId,
  });

  await next();
}

/**
 * Apply rate limiting based on route sensitivity - ENHANCED SECURITY
 */
async function applyRateLimiting(c: Context, path: string) {
  
  // Stricter rate limiting for auth endpoints
  if (path.startsWith('/auth/')) {
    return authLimiter(c, () => Promise.resolve());
  }
  
  // Standard rate limiting for other public endpoints
  return apiLimiter(c, () => Promise.resolve());
}

/**
 * Enhanced route protection with RBAC for sensitive operations
 */
export async function protectWithRBAC(c: Context, next: Next, requiredPermissions?: string[]) {
  // First apply basic authentication
  await protectAllRoutes(c, async () => {
    // If additional permissions are required, check them
    if (requiredPermissions && requiredPermissions.length > 0) {
      const { requirePermission } = await import('./rbac-middleware');
      // Using existing RBAC logic
      const rbacCheck = requirePermission(requiredPermissions[0] as any);
      await rbacCheck(c, next);
      return;
    }
    
    await next();
  });
}
