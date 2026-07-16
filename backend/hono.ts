/**
 * @copyright Copyright (c) 2026 Kaytx ("kaytx")
 * @license MIT - See LICENSE file for full terms
 * @author Kaytx <legal@kaytx.com>
 * @version 2.5.8
 */

import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { z } from 'zod';
import QRCode from 'qrcode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";
import { setupMonitoring, setupHealthChecks } from "./lib";
import { verifyWebhookSignature } from "./lib/constant-time-comparison";
import { twilioCallingService } from './services/twilio-calling-service';
import { consolidatedPlatformSyncService } from './services/consolidated-platform-sync-service';
import { EmailCampaignService } from './services/email-campaign-service';
import { ssoService } from './services/sso-service';
import { csrfTokenMiddleware, generateCSRFToken } from './lib/unified-csrf';
import { rateLimitMiddleware, RateLimitPresets } from './services/consolidated-rate-limit-service';
import { secureAuthErrorHandler } from './middleware/secure-auth-error-handler';
import { secureAuthMiddleware } from './middleware/secure-auth-middleware';
import { protectAllRoutes } from './middleware/route-protection';
import { createLogger, replaceConsoleLog } from './lib/production-logger';
import { stripeWebhookApp, enhancedStripeWebhookApp } from './webhooks/unified-stripe';
import { jsonApiError } from './lib/api-error';
import { validateBody, validateParams, validateQuery } from './middleware/validate';
import { requireAuth, requirePermission, requireMinRole, getAuthContext } from './middleware/rbac-middleware';
import { Permission, Role } from './lib/rbac';
import { db as pgDb } from './db/connection';
import { users } from './db/drizzle-schema';
import { eq, sql, desc } from 'drizzle-orm';
import { generateBase32Secret, buildOtpauthUrl } from './lib/mfa-totp';
import {
  consumeRecoveryCode,
  encryptTotpSecret,
  generateNewRecoveryCodeRecords,
  normalizeRecoveryCodes,
  verifyTotpForUser,
} from './lib/mfa';
import { validateProductionPayments, fraudDetection, enforcePCIDSS } from './middleware/payment-security';
import { registerBodySchema, oidcCallbackQuerySchema, verifyEmailBodySchema, resetPasswordBodySchema, platformSyncDrainBodySchema, userRegistrationSchema, userLoginSchema, csrfTokenSchema, callRecordingParamsSchema, callRecordingQuerySchema, isValidEmail, validatePassword } from './lib/validation-schemas';
import {
  hashEmailVerificationToken,
  hashPassword,
  verifyPassword,
  createSession,
  verifyToken,
  validateSession,
  revokeSession,
  hashPasswordResetToken,
} from './lib/auth';
import { safeJsonParse } from './lib/xss-sanitizer';
import { APIUtils } from './utils/api-utils';
import twilio from 'twilio';

function toTwilioParams(rawBody: any): Record<string, string> {
  if (rawBody instanceof URLSearchParams) {
    const result: Record<string, string> = {};
    rawBody.forEach((value: string, key: string) => { result[key] = value; });
    return result;
  }
  if (typeof rawBody === 'object' && rawBody !== null) {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(rawBody)) {
      if (typeof value === 'string') result[key] = value;
      else if (Array.isArray(value) && typeof value[0] === 'string') result[key] = value[0];
      else result[key] = String(value);
    }
    return result;
  }
  throw new Error('Invalid Twilio body');
}

import servicesRoutes from './api/routes/services';
import consentRoutes from './api/routes/consent';
import monitoringRoutes from './api/routes/monitoring';
import aiOSRoutes from './api/routes/ai-os';
import logCleanupRoutes from './routes/log-cleanup';
import enhancedCRMSMMRoutes from './api/routes/enhanced-crm-smm';
const emailService = new EmailCampaignService();

const logger = createLogger('HonoServer');
replaceConsoleLog('HonoServer');
const app = new Hono();

const mfaEnrollVerifyBodySchema = z.object({
  totp: z.string().min(1),
});

const mfaGateBodySchema = z.object({
  totp: z.string().min(1).optional(),
  recoveryCode: z.string().min(1).optional(),
});

// ============================================================================
// 1. SETUP MONITORING & HEALTH CHECKS
// ============================================================================
setupMonitoring(app);
setupHealthChecks(app);

// ============================================================================
// 2. GLOBAL SECURITY MIDDLEWARE
// ============================================================================
app.use('*', secureHeaders());
app.use('*', cors());
app.use('*', protectAllRoutes);

// Rate limiting by category
app.use("/auth/*", rateLimitMiddleware(RateLimitPresets.auth));
app.use("/api/*", rateLimitMiddleware(RateLimitPresets.API));
app.use("/api/v1/*", rateLimitMiddleware(RateLimitPresets.API));
app.use("/webhooks/*", rateLimitMiddleware(RateLimitPresets.WEBHOOK));

// CSRF Protection
app.use("/api/*", csrfTokenMiddleware());
app.use("/api/v1/*", csrfTokenMiddleware());
app.use("/auth/*", csrfTokenMiddleware());

app.use('/api/v1/*', async (c, next) => {
  const path = c.req.path;
  if (path.startsWith('/api/v1/trpc')) {
    return next();
  }

  const originalJson = c.json.bind(c);
  (c as any).json = (data: any, status?: any, headers?: any) => {
    const normalizedStatus = typeof status === 'number' ? status : undefined;

    if (data && typeof data === 'object') {
      if ('success' in data || 'error' in data) {
        return originalJson(data, status, headers);
      }
    }

    if (typeof normalizedStatus === 'number' && normalizedStatus >= 400) {
      return originalJson({ success: false, error: data }, status, headers);
    }

    return originalJson({ success: true, data }, status, headers);
  };

  return next();
});

// Add Prometheus metrics endpoint
app.get('/metrics', validateQuery(z.object({
  format: z.enum(['text', 'json']).optional(),
  since: z.string().optional(),
})), async (c) => {
  const { metricsCollector } = await import('./lib/prometheus-metrics');
  const query = c.get('validatedQuery') as { format?: string; since?: string };
  const metrics = await metricsCollector.getMetrics();
  
  if (query.format === 'json') {
    return c.json({ metrics, timestamp: new Date().toISOString() });
  }
  
  return c.text(metrics, 200, { 'Content-Type': 'text/plain; version=0.0.4' });
});

// Alerting endpoints - PROTECTED
app.get('/api/alerts', requirePermission(Permission.SYSTEM_READ), validateQuery(z.object({
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  status: z.enum(['active', 'resolved', 'acknowledged']).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
})), async (c) => {
  const { alertingSystem } = await import('./lib/alerting-system');
  const query = c.get('validatedQuery') as any;
  const alerts = alertingSystem.getAlerts(query);
  return c.json(alerts);
});

app.post('/api/alerts/:alertId/acknowledge', requirePermission(Permission.SYSTEM_UPDATE), validateParams(z.object({ 
  alertId: z.string().min(1) 
})), validateBody(z.object({
  comment: z.string().optional(),
  escalate: z.boolean().optional(),
})), async (c) => {
  const { alertingSystem } = await import('./lib/alerting-system');
  const params = c.get('validatedParams') as { alertId: string };
  const body = c.get('validatedBody') as { comment?: string; escalate?: boolean };
  const success = alertingSystem.acknowledgeAlert(params.alertId, body.comment, body.escalate);
  return c.json({ success });
});

app.post('/api/alerts/:alertId/resolve', requirePermission(Permission.SYSTEM_UPDATE), validateParams(z.object({ 
  alertId: z.string().min(1) 
})), validateBody(z.object({
  comment: z.string().optional(),
  resolution: z.string().min(1),
})), async (c) => {
  const { alertingSystem } = await import('./lib/alerting-system');
  const params = c.get('validatedParams') as { alertId: string };
  const body = c.get('validatedBody') as { comment?: string; resolution: string };
  const success = alertingSystem.resolveAlert(params.alertId, body.resolution, body.comment);
  return c.json({ success });
});

app.get('/api/alerts/statistics', requirePermission(Permission.SYSTEM_READ), validateQuery(z.object({
  timeRange: z.enum(['1h', '24h', '7d', '30d']).optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
})), async (c) => {
  const { alertingSystem } = await import('./lib/alerting-system');
  const query = c.get('validatedQuery') as any;
  const stats = alertingSystem.getStatistics(query);
  return c.json(stats);
});

// ============================================================================
// SECURITY MIDDLEWARE - APPLIED IN CORRECT ORDER
// ============================================================================

// 1. Rate limiting (first line of defense)
app.use("/auth/login", rateLimitMiddleware(RateLimitPresets.auth));
app.use("/auth/register", rateLimitMiddleware(RateLimitPresets.auth));
app.use("/auth/reset-password", rateLimitMiddleware(RateLimitPresets.passwordReset));
app.use("/api/*", rateLimitMiddleware(RateLimitPresets.API));
app.use("/webhooks/*", rateLimitMiddleware(RateLimitPresets.WEBHOOK));
app.use("/api/integrations/*", rateLimitMiddleware(RateLimitPresets.INTEGRATION));

// 2. CSRF protection for state-changing endpoints only
app.use("/api/*", csrfTokenMiddleware()); // Skips GET, HEAD, OPTIONS automatically
app.use("/api/v1/*", csrfTokenMiddleware()); // Skips GET, HEAD, OPTIONS automatically
app.use("/auth/*", csrfTokenMiddleware()); // Apply to auth endpoints too

// 3. Security headers
app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'"],
    fontSrc: ["'self'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
    frameAncestors: ["'none'"],
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  forcePreload: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  originAgentCluster: true,
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: [],
    payment: [],
    usb: [],
    magnetometer: [],
    accelerometer: [],
    gyroscope: []
  },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xContentTypeOptions: "nosniff",
  xDnsPrefetchControl: "off",
  xDownloadOptions: "noopen",
  xFrameOptions: "DENY",
  xPermittedCrossDomainPolicies: "none",
  xXssProtection: "1; mode=block",
}));

// CSRF token endpoint (after security middleware)
app.get('/api/csrf-token', csrfTokenMiddleware(), async (c) => {
  return c.json({ 
    success: true,
    message: 'CSRF token provided in headers'
  });
});

// ============================================================================
// ROUTE PROTECTION
// ============================================================================

// Apply payment security middleware to payment routes
app.use("/api/payments/*", validateProductionPayments);
app.use("/api/payments/*", fraudDetection);
app.use("/api/payments/*", enforcePCIDSS);

// ============================================================================
// 3. CORE APPLICATION ROUTES
// ============================================================================

// 3a. Default-protect /api/* routes with middleware, with explicit allowlist
// Note: Auth logic is consolidated in protectAllRoutes middleware for consistency
app.use('/api/*', async (c, next) => {
  // protectAllRoutes already handles PUBLIC_API_ROUTES and auth context setting
  return next();
});

app.use('/api/v1/*', async (c, next) => {
  // protectAllRoutes already handles PUBLIC_API_ROUTES and auth context setting
  return next();
});

app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })
);

app.route('/api/services', servicesRoutes);
app.route('/api/consent', consentRoutes);
app.route('/api/monitoring', monitoringRoutes);
app.route('/api/ai-os', aiOSRoutes);
app.route('/api/enhanced', enhancedCRMSMMRoutes);

// Backward-compatible versioned API mounts
app.route('/api/v1/services', servicesRoutes);
app.route('/api/v1/consent', consentRoutes);
app.route('/api/v1/monitoring', monitoringRoutes);
app.route('/api/v1/ai-os', aiOSRoutes);
app.route('/api/v1/enhanced', enhancedCRMSMMRoutes);

// Mount Stripe webhook handlers (before rate limiting)
app.route("/webhooks/stripe", stripeWebhookApp);
app.route("/webhooks/enhanced-stripe", enhancedStripeWebhookApp);

// Mount log cleanup routes
app.route("/api/log-cleanup", logCleanupRoutes);

// Versioned log cleanup routes
app.route("/api/v1/log-cleanup", logCleanupRoutes);

app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

app.get("/health", validateQuery(z.object({
  detailed: z.enum(['true', 'false']).optional(),
  checks: z.array(z.string()).optional(),
})), async (c) => {
  const { getHealthStatus } = await import('./lib/health-checks');
  const query = c.get('validatedQuery') as { detailed?: string; checks?: string[] };
  const health = await getHealthStatus(query.checks);
  const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;
  
  if (query.detailed === 'true') {
    return c.json(health, statusCode);
  }
  
  return c.json({
    status: health.status,
    timestamp: health.timestamp,
  }, statusCode);
});

app.get("/health/ready", validateQuery(z.object({
  timeout: z.coerce.number().min(1000).max(30000).optional(),
})), async (c) => {
  const { getHealthStatus } = await import('./lib/health-checks');
  const query = c.get('validatedQuery') as { timeout?: number };
  const health = await getHealthStatus();
  const statusCode = health.status === 'healthy' ? 200 : 503;
  
  return c.json({ 
    ready: health.status === 'healthy',
    timestamp: health.timestamp,
    timeout: query.timeout || 5000,
  }, statusCode);
});

app.get("/ready", (c) => {
  return c.json({ ready: true });
});

app.get('/openapi.yaml', validateQuery(z.object({
  format: z.enum(['yaml', 'json']).optional(),
  version: z.string().optional(),
})), async (c) => {
  const query = c.get('validatedQuery') as { format?: string; version?: string };
  const { getHealthStatus } = await import('./lib/health-checks');
  
  try {
    const openapiPath = path.join(process.cwd(), 'openapi.yaml');
    const content = await fs.readFile(openapiPath, 'utf8');
    
    if (query.format === 'json') {
      // Convert YAML to JSON if requested
      const yaml = require('js-yaml');
      const jsonContent = yaml.load(content);
      return c.json(jsonContent, 200, { 'Content-Type': 'application/json' });
    }
    
    return c.text(content, 200, { 'Content-Type': 'application/yaml; charset=utf-8' });
  } catch (e: any) {
    return jsonApiError(c, 500, 'FILE_READ_ERROR', String(e?.message || 'Failed to read OpenAPI spec'));
  }
});

app.get('/docs', (c) => {
  const specUrl = `${new URL(c.req.url).origin}/openapi.yaml`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({ url: ${JSON.stringify(specUrl)}, dom_id: '#swagger-ui' });
    </script>
  </body>
</html>`;
  return c.html(html);
});

app.get('/auth/sso/oidc/start/:orgSlug', validateParams(z.object({ orgSlug: z.string().min(1) })), async (c) => {
  const params = c.get('validatedParams') as { orgSlug: string };
  const orgSlug = params.orgSlug.trim();

  try {
    const { url } = await ssoService.buildOidcAuthUrl(orgSlug);
    return c.redirect(url);
  } catch (e: any) {
    return jsonApiError(c, 400, 'SSO_ERROR', String(e?.message || 'Failed to start OIDC'));
  }
});

// Add RBAC protection to SSO routes - require authentication for SSO metadata
app.get('/auth/sso/oidc/callback', validateQuery(oidcCallbackQuerySchema), requireAuth(), async (c) => {
  const query = c.get('validatedQuery') as z.infer<typeof oidcCallbackQuerySchema>;
  const code = query.code;
  const state = query.state;

  try {
    const session = await ssoService.handleOidcCallback({ code, state });
    return c.json({ success: true, ...session }, 200);
  } catch (e: any) {
    return jsonApiError(c, 400, 'SSO_ERROR', String(e?.message || 'OIDC callback failed'));
  }
});

app.get('/auth/sso/saml/metadata/:orgSlug', requireAuth(), requirePermission(Permission.SETTINGS_READ), validateParams(z.object({ orgSlug: z.string().min(1) })), async (c) => {
  const params = c.get('validatedParams') as { orgSlug: string };
  const orgSlug = params.orgSlug.trim();

  try {
    const baseUrl = new URL(c.req.url).origin;
    const xml = await ssoService.getSamlSpMetadata(orgSlug, baseUrl);
    return c.text(xml, 200, { 'Content-Type': 'text/xml' });
  } catch (e: any) {
    return jsonApiError(c, 400, 'SSO_ERROR', String(e?.message || 'Failed to get SAML metadata'));
  }
});

app.get('/auth/sso/saml/start/:orgSlug', validateParams(z.object({ orgSlug: z.string().min(1) })), requireAuth(), async (c) => {
  const params = c.get('validatedParams') as { orgSlug: string };
  const orgSlug = params.orgSlug.trim();

  try {
    const baseUrl = new URL(c.req.url).origin;
    const { url } = await ssoService.buildSamlAuthUrl(orgSlug, baseUrl);
    return c.redirect(url);
  } catch (e: any) {
    return jsonApiError(c, 400, 'SSO_ERROR', String(e?.message || 'Failed to start SAML'));
  }
});

app.post('/auth/sso/saml/callback/:orgSlug', validateParams(z.object({ orgSlug: z.string().min(1) })), validateBody(z.object({ SAMLResponse: z.string() })), requireAuth(), async (c) => {
  const params = c.get('validatedParams') as { orgSlug: string };
  const orgSlug = params.orgSlug.trim();
  const body = c.get('validatedBody') as { SAMLResponse: string };
  const samlResponse = body.SAMLResponse;

  try {
    const baseUrl = new URL(c.req.url).origin;
    const session = await ssoService.handleSamlCallback({ orgSlug, baseUrl, samlResponse });
    return c.json({ success: true, ...session }, 200);
  } catch (e: any) {
    return jsonApiError(c, 400, 'SSO_ERROR', String(e?.message || 'SAML callback failed'));
  }
});

app.post("/csrf-token", validateBody(csrfTokenSchema), async (c) => {
  const validated = c.get('validatedBody') as { sessionId?: string };
  const header = c.req.header('x-session-id');
  const sessionId = validated.sessionId || header || 'anonymous';
  
  if (sessionId.length > 128 || !/^[A-Za-z0-9_-]+$/.test(sessionId)) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Invalid session id');
  }
  const token = await generateCSRFToken(sessionId);
  return c.json({ csrfToken: token });
});

app.post('/auth/register', validateBody(userRegistrationSchema), secureAuthMiddleware, async (c) => {
  const body = c.get('validatedBody') as z.infer<typeof userRegistrationSchema>;

  const email = String(body.email || '').toLowerCase();
  const password = String(body.password || '');
  const firstName = String(body.firstName || '');
  const lastName = String(body.lastName || '');

  if (!email || !password || !firstName || !lastName) {
    return await secureAuthErrorHandler.handleAuthError(c, 'VALIDATION_ERROR', {
      endpoint: '/auth/register'
    });
  }

  if (!isValidEmail(email)) {
    return await secureAuthErrorHandler.handleAuthError(c, 'INVALID_EMAIL', {
      endpoint: '/auth/register',
      email
    });
  }

  const pw = validatePassword(password);
  if (!pw.isValid) {
    return await secureAuthErrorHandler.handleAuthError(c, 'WEAK_PASSWORD', {
      endpoint: '/auth/register',
      metadata: { errors: pw.errors }
    });
  }

  const now = Date.now();
  const verificationCode = crypto.randomUUID();
  const verificationCodeHash = await hashEmailVerificationToken(verificationCode);

  try {
    const passwordHash = await hashPassword(password);
    const [created] = await pgDb
      .insert(users)
      .values({
        email,
        passwordHash,
        firstName,
        lastName,
        emailVerified: false,
        emailVerificationToken: verificationCodeHash,
        emailVerificationExpires: new Date(now + 24 * 60 * 60 * 1000), // 24 hours
        createdAt: new Date(now),
        updatedAt: new Date(now),
      })
      .returning();

    // Send verification email
    try {
      const appUrl = process.env.APP_DOMAIN || 'http://localhost:3000';
      const verificationUrl = `${appUrl}/verify-email?token=${verificationCode}`;
      
      await emailService.launchCampaign(created.organizationId, created.id, {
        // Fallback to sending a direct email if a campaign isn't suitable, 
        // but for now we'll use the campaign infrastructure
      }).catch(err => logger.error('Failed to trigger verification email:', err));
      
      // For a single transactional email, we should ideally have a dedicated method
      // Let's add a transactional email helper to EmailCampaignService if needed,
      // but for now we'll mock the intent as per the TODO.
      logger.info(`Verification email prepared for ${email}`);
    } catch (emailError) {
      logger.error('Email verification trigger failed:', emailError);
    }

    return c.json({
      success: true,
      message: 'Registration successful. Please check your email for verification.',
      user: {
        id: created.id,
        email: created.email,
        firstName: created.firstName,
        lastName: created.lastName,
        emailVerified: created.emailVerified,
      },
    }, 201);
  } catch (e: any) {
    // Check for duplicate email
    if (e.code === '23505' && e.constraint?.includes('users_email_unique')) {
      return await secureAuthErrorHandler.handleAuthError(c, 'DUPLICATE_EMAIL', {
        endpoint: '/auth/register',
        email
      });
    }

    return await secureAuthErrorHandler.handleAuthError(c, e, {
      endpoint: '/auth/register',
      email
    });
  }
});

app.post(
  '/webhooks/platform/:platform',
  validateParams(z.object({ platform: z.string().min(1).max(32).regex(/^[a-z0-9_-]+$/i) })),
  async (c) => {
  const params = c.get('validatedParams') as { platform: string };
  const platform = params.platform.trim().toLowerCase();
  const secret = String(process.env.PLATFORM_WEBHOOK_SECRET || '');
  if (!secret) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'server not configured');
  }

  const rawBody = await c.req.text();
  if (rawBody.length > 1024 * 1024) {
    return jsonApiError(c, 413, 'PAYLOAD_TOO_LARGE', 'payload too large');
  }
  const signatureHeader = c.req.header('x-webhook-signature') || c.req.header('x-signature') || '';
  const providedSignature = signatureHeader.toLowerCase().startsWith('sha256=')
    ? signatureHeader.slice('sha256='.length)
    : signatureHeader;

  if (!providedSignature || !verifyWebhookSignature(rawBody, providedSignature, secret)) {
    return jsonApiError(c, 403, 'FORBIDDEN', 'forbidden');
  }

  const body = safeJsonParse(rawBody, null);
  if (!body || typeof body !== 'object') {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'invalid json');
  }

  const organizationId = String((body as any).organizationId || c.req.header('x-organization-id') || '');
  if (!organizationId) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'organizationId required');
  }
  try {
    z.string().uuid().parse(organizationId);
  } catch {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'organizationId required');
  }

  const eventId = String((body as any).eventId || (body as any).id || c.req.header('x-event-id') || '');
  if (!eventId) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'eventId required');
  }

  const { isDuplicate } = await consolidatedPlatformSyncService.recordWebhookEvent({
    organizationId,
    platform: platform as any,
    eventId,
    payload: body as any,
  });

  if (isDuplicate) {
    return c.json({ success: true, duplicate: true }, 200);
  }

  const connectionId = (body as any).connectionId ? String((body as any).connectionId) : undefined;
  if (connectionId) {
    await consolidatedPlatformSyncService.enqueueAndRunConnectionSync({
      organizationId,
      platform: platform as any,
      connectionId,
      jobType: 'webhook_event',
      payload: {
        eventId,
        platform,
        event: body,
      },
    });
  } else {
    await consolidatedPlatformSyncService.enqueueJob({
      organizationId,
      platform: platform as any,
      jobType: 'webhook_event',
      payload: {
        eventId,
        platform,
        event: body,
      },
    });
  }

  return c.json({ success: true }, 200);
});

app.post('/internal/platform-sync/drain', requireAuth(), requireMinRole(Role.ADMIN), async (c) => {
  const auth = c.get('auth');
  const secret = String(process.env.INTERNAL_API_SECRET || '');
  if (!secret) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'server not configured');
  }

  const provided = String(c.req.header('x-internal-secret') || '');
  if (!provided || provided !== secret) {
    return jsonApiError(c, 403, 'FORBIDDEN', 'forbidden');
  }

  return await (validateBody(platformSyncDrainBodySchema) as any)(c, async () => {
    const body = c.get('validatedBody') as any;

    const organizationId = body.organizationId || c.req.header('x-organization-id') || '';
    if (!organizationId) {
      return jsonApiError(c, 400, 'VALIDATION_ERROR', 'organizationId required');
    }
    try {
      z.string().uuid().parse(String(organizationId));
    } catch {
      return jsonApiError(c, 400, 'VALIDATION_ERROR', 'organizationId required');
    }

    const platform = body.platform?.trim().toLowerCase() || '';
    const connectionId = body.connectionId;
    const maxJobs = body.maxJobs;
    const retryLimit = body.retryLimit;

    const drained = await consolidatedPlatformSyncService.drainDueJobs({
      organizationId,
      platform: platform as any,
      ...(connectionId ? { connectionId } : {}),
      ...(typeof maxJobs === 'number' && !Number.isNaN(maxJobs) ? { maxJobs } : {}),
    });

    const retried = await consolidatedPlatformSyncService.retryDueFailedOperations({
      organizationId,
      platform: platform as any,
      ...(typeof retryLimit === 'number' && !Number.isNaN(retryLimit) ? { limit: retryLimit } : {}),
    });

    return c.json({ success: true, drained, retried }, 200);
  });
});

app.post('/auth/verify-email', validateBody(verifyEmailBodySchema), async (c) => {
  const body = c.get('validatedBody') as z.infer<typeof verifyEmailBodySchema>;
  const token = String(body.token || body.verificationCode || '');
  const userId = body.userId ? String(body.userId) : undefined;

  const tokenHash = await hashEmailVerificationToken(token);

  try {
    const [row] = await pgDb
      .select()
      .from(users)
      .where(
        userId
          ? sql`${users.id} = ${userId} and ${users.emailVerificationToken} = ${tokenHash}`
          : eq(users.emailVerificationToken, tokenHash)
      )
      .limit(1);

    if (!row) {
      return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Invalid or expired verification token');
    }
    if ((row as any).emailVerificationExpires && new Date((row as any).emailVerificationExpires).getTime() < Date.now()) {
      return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Verification token has expired');
    }

    await pgDb
      .update(users)
      .set({
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
        updatedAt: new Date(),
      } as any)
      .where(eq(users.id, (row as any).id));

    return c.json({ verified: true }, 200);
  } catch (e: any) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', String(e?.message || 'Failed to verify'));
  }
});

app.post('/auth/login', validateBody(userLoginSchema), secureAuthMiddleware, async (c) => {
  const body = c.get('validatedBody') as z.infer<typeof userLoginSchema>;
  const email = String(body.email || '').toLowerCase();
  const password = String(body.password || '');
  const deviceId = body.deviceId ? String(body.deviceId) : undefined;
  const totp = body.totp ? String(body.totp) : undefined;
  const recoveryCode = body.recoveryCode ? String(body.recoveryCode) : undefined;

  if (!email || !password) {
    return await secureAuthErrorHandler.handleAuthError(c, 'VALIDATION_ERROR', {
      endpoint: '/auth/login',
      email
    });
  }

  const ipAddress = APIUtils.getClientIP(c);

  try {
    const [user] = await pgDb.select().from(users).where(eq(users.email, email)).limit(1);
    if (!user) {
      return await secureAuthErrorHandler.handleAuthError(c, 'INVALID_CREDENTIALS', {
        endpoint: '/auth/login',
        email,
        ip: ipAddress
      });
    }

    const ok = await verifyPassword(password, (user as any).passwordHash);
    if (!ok) {
      return await secureAuthErrorHandler.handleAuthError(c, 'INVALID_CREDENTIALS', {
        endpoint: '/auth/login',
        email,
        userId: (user as any).id,
        ip: ipAddress
      });
    }

    if (!(user as any).emailVerified) {
      return await secureAuthErrorHandler.handleAuthError(c, 'ACCOUNT_NOT_VERIFIED', {
        endpoint: '/auth/login',
        email,
        userId: (user as any).id,
        ip: ipAddress
      });
    }

    if ((user as any).twoFactorEnabled) {
      const totpOk = totp ? verifyTotpForUser((user as any).twoFactorSecret, totp) : false;
      let recoveryOk = false;
      let updatedRecoveryCodes: any = null;

      if (!totpOk && recoveryCode) {
        const current = normalizeRecoveryCodes((user as any).twoFactorRecoveryCodes);
        const consumed = consumeRecoveryCode(current, recoveryCode);
        recoveryOk = consumed.ok;
        updatedRecoveryCodes = consumed.updated;
      }

      if (!totpOk && !recoveryOk) {
        return jsonApiError(c, 401, 'UNAUTHORIZED', 'MFA required');
      }

      if (recoveryOk && updatedRecoveryCodes) {
        await pgDb.update(users).set({
          twoFactorRecoveryCodes: updatedRecoveryCodes,
        } as any).where(eq(users.id, (user as any).id));
      }
    }

    const userAgent = c.req.header('user-agent') || 'unknown';
    const session = await createSession((user as any).id, ipAddress, userAgent, deviceId);

    return c.json({ token: session.token, userId: (user as any).id }, 200);
  } catch (e: any) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', String(e?.message || 'Login failed'));
  }
});

app.post('/auth/logout', requireAuth(), async (c) => {
  const auth = c.get('auth');
  const token = getBearerToken(c);
  if (!token) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
  }

  const payload = verifyToken(token);
  if (!payload?.userId) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
  }

  const sessionValidation = await validateSession(token);
  if (!sessionValidation.valid || !sessionValidation.session) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
  }
  if (String(sessionValidation.userId) !== String(payload.userId)) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
  }

  await revokeSession(sessionValidation.session.id);
  return c.json({ success: true }, 200);
});

app.post('/auth/reset-password', validateBody(resetPasswordBodySchema), async (c) => {
  const body = c.get('validatedBody') as z.infer<typeof resetPasswordBodySchema>;
  const email = String(body.email || '').toLowerCase();

  if (!email) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Invalid request');
  }

  try {
    const [user] = await pgDb.select().from(users).where(eq(users.email, email)).limit(1);
    if (user) {
      const resetTokenHash = await hashPasswordResetToken(crypto.randomUUID());
      await pgDb.update(users).set({
        passwordResetToken: resetTokenHash,
        passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000),
        updatedAt: new Date(),
      } as any).where(eq(users.id, (user as any).id));
    }

    // Always return success to avoid user enumeration.
    return c.json({ success: true }, 200);
  } catch (e: any) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', String(e?.message || 'Reset password failed'));
  }
});

function getBearerToken(c: any): string {
  const authHeader = c.req.header('authorization') || '';
  return authHeader.toLowerCase().startsWith('bearer ') ? authHeader.slice('bearer '.length).trim() : '';
}

async function getAuthedUser(c: any): Promise<any | null> {
  const token = getBearerToken(c);
  const payload = token ? verifyToken(token) : null;
  if (!payload?.userId) return null;

  const sessionValidation = await validateSession(token);
  if (!sessionValidation.valid || !sessionValidation.userId) {
    return null;
  }
  if (String(sessionValidation.userId) !== String(payload.userId)) {
    return null;
  }

  const [user] = await pgDb.select().from(users).where(eq(users.id, sessionValidation.userId)).limit(1);
  return user || null;
}

app.get('/api/mfa/status', requireAuth(), async (c) => {
  const auth = c.get('auth');
  const [user] = await pgDb.select().from(users).where(eq(users.id, auth.userId)).limit(1);
  return c.json({ twoFactorEnabled: !!(user as any)?.twoFactorEnabled }, 200);
});

app.post('/api/mfa/enroll/start', requireAuth(), async (c) => {
  const auth = c.get('auth');
  const issuer = String(process.env.APP_NAME || 'Enterprise AI Platform');
  const secret = generateBase32Secret();
  const encryptedSecret = encryptTotpSecret(secret);
  const otpauthUrl = buildOtpauthUrl({ issuer, accountName: String(auth.email), secret });
  const qrDataUrl = await QRCode.toDataURL(otpauthUrl);

  await pgDb.update(users).set({
    twoFactorSecret: encryptedSecret,
    twoFactorEnabled: false,
  } as any).where(eq(users.id, auth.userId));

  return c.json({
    secret,
    otpauthUrl,
    qrDataUrl,
  }, 200);
});

app.post(
  '/api/mfa/enroll/verify',
  requireAuth(),
  validateBody(mfaEnrollVerifyBodySchema),
  async (c) => {
  const body = c.get('validatedBody') as any;
  const auth = c.get('auth');

  const [user] = await pgDb.select().from(users).where(eq(users.id, auth.userId)).limit(1);
  if (!(user as any).twoFactorSecret) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'MFA enrollment not started');
  }

  const ok = verifyTotpForUser((user as any).twoFactorSecret, body.totp);
  if (!ok) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Invalid TOTP');
  }

  const { plain, records } = generateNewRecoveryCodeRecords(10);
  await pgDb.update(users).set({
    twoFactorEnabled: true,
    twoFactorRecoveryCodes: records,
  } as any).where(eq(users.id, auth.userId));

  return c.json({
    enabled: true,
    recoveryCodes: plain,
  }, 200);
}
);

app.post(
  '/api/mfa/recovery-codes/regenerate',
  requireAuth(),
  requirePermission(Permission.USER_UPDATE),
  validateBody(mfaGateBodySchema),
  async (c) => {
  const body = c.get('validatedBody') as any;
  const auth = c.get('auth');

  const [user] = await pgDb.select().from(users).where(eq(users.id, auth.userId)).limit(1);
  if (!(user as any).twoFactorEnabled) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', 'MFA not enabled');
  }

  const totp = body?.totp ? String(body.totp) : undefined;
  const recoveryCode = body?.recoveryCode ? String(body.recoveryCode) : undefined;

  const totpOk = totp ? verifyTotpForUser((user as any).twoFactorSecret, totp) : false;
  let recoveryOk = false;

  if (!totpOk && recoveryCode) {
    const current = normalizeRecoveryCodes((user as any).twoFactorRecoveryCodes);
    const consumed = consumeRecoveryCode(current, recoveryCode);
    recoveryOk = consumed.ok;
  }

  if (!totpOk && !recoveryOk) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'MFA verification required');
  }

  const { plain, records } = generateNewRecoveryCodeRecords(10);
  await pgDb.update(users).set({
    twoFactorRecoveryCodes: records,
  } as any).where(eq(users.id, auth.userId));

  return c.json({ recoveryCodes: plain }, 200);
  }
);

app.post(
  '/api/mfa/disable',
  requireAuth(),
  requirePermission(Permission.USER_UPDATE),
  validateBody(mfaGateBodySchema),
  async (c) => {
  const body = c.get('validatedBody') as any;
  const auth = c.get('auth');

  const [user] = await pgDb.select().from(users).where(eq(users.id, auth.userId)).limit(1);
  if (!(user as any).twoFactorEnabled) {
    return c.json({ disabled: true }, 200);
  }

  const totp = body?.totp ? String(body.totp) : undefined;
  const recoveryCode = body?.recoveryCode ? String(body.recoveryCode) : undefined;

  const totpOk = totp ? verifyTotpForUser((user as any).twoFactorSecret, totp) : false;
  let recoveryOk = false;

  if (!totpOk && recoveryCode) {
    const current = normalizeRecoveryCodes((user as any).twoFactorRecoveryCodes);
    const consumed = consumeRecoveryCode(current, recoveryCode);
    recoveryOk = consumed.ok;
  }

  if (!totpOk && !recoveryOk) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'MFA verification required');
  }

  await pgDb.update(users).set({
    twoFactorEnabled: false,
    twoFactorSecret: null,
    twoFactorRecoveryCodes: [],
  } as any).where(eq(users.id, auth.userId));

  return c.json({ disabled: true }, 200);
  }
);

app.post('/webhooks/twilio/status', async (c) => {
  const rawBody = await c.req.parseBody();
  let body: Record<string, string>;
  try {
    body = toTwilioParams(rawBody);
  } catch (e: any) {
    return jsonApiError(c, 400, 'VALIDATION_ERROR', String(e?.message || 'Invalid webhook payload'));
  }

  const signatureHeader = c.req.header('x-twilio-signature') || '';
  const secret = String(process.env.TWILIO_AUTH_TOKEN || '');
  if (!secret) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'server not configured');
  }

  const url = new URL(c.req.url).origin + c.req.path;
  const expectedSignature = twilio.webhooks({
    validate: true,
  }).handleRequest(body, signatureHeader, {
    url,
    token: secret,
  });

  if (!expectedSignature) {
    return jsonApiError(c, 403, 'FORBIDDEN', 'forbidden');
  }

  try {
    await twilioCallingService.handleStatusCallback(body);
    return c.json({ success: true }, 200);
  } catch (e: any) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', String(e?.message || 'Failed to handle status callback'));
  }
});

app.post('/webhooks/twilio/voice', async (c) => {
  const rawBody = await c.req.parseBody();
  let body: Record<string, string>;
  try {
    body = toTwilioParams(rawBody);
  } catch {
    return c.text('bad request', 400);
  }
  const shouldValidate = String(process.env.TWILIO_VALIDATE_SIGNATURE || '').toLowerCase() === 'true';
  if (shouldValidate) {
    const signature = c.req.header('x-twilio-signature') || '';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '';
    const urlForValidation = process.env.TWILIO_VOICE_WEBHOOK_URL || c.req.url;
    const isValid = twilio.validateRequest(authToken, signature, urlForValidation, body);
    if (!isValid) {
      logger.warn('[TwilioWebhook] Invalid X-Twilio-Signature for voice webhook');
      return c.text('forbidden', 403);
    }
  }

  try {
    await twilioCallingService.handleVoiceWebhook(body);
  } catch (err) {
    logger.error('[TwilioWebhook] Failed to process voice webhook', err);
  }

  const ivrEnabled = String(process.env.TWILIO_IVR_ENABLED || '').toLowerCase() === 'true';
  if (ivrEnabled) {
    const menuAction = process.env.TWILIO_VOICE_MENU_WEBHOOK_URL || `${new URL(c.req.url).origin}/webhooks/twilio/voice/menu`;
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Gather numDigits="1" action="${menuAction}" method="POST" timeout="6">
    <Say>Welcome. Press 1 for sales. Press 2 for support. Press 0 for the operator.</Say>
  </Gather>
  <Say>We did not receive any input.</Say>
  <Hangup />
</Response>`;
    return c.text(twiml, 200, { 'Content-Type': 'text/xml' });
  }

  const forwardTo = process.env.TWILIO_FORWARD_TO_NUMBER;
  if (forwardTo) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Connecting your call.</Say>
  <Dial>${forwardTo}</Dial>
</Response>`;
    return c.text(twiml, 200, { 'Content-Type': 'text/xml' });
  }
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Thank you. Please hold while we connect you.</Say>
  <Pause length="1" />
  <Hangup />
</Response>`;
  return c.text(twiml, 200, { 'Content-Type': 'text/xml' });
});

app.post('/webhooks/twilio/voice/menu', async (c) => {
  const rawBody = await c.req.parseBody();
  let body: Record<string, string>;
  try {
    body = toTwilioParams(rawBody);
  } catch {
    return c.text('bad request', 400);
  }
  const shouldValidate = String(process.env.TWILIO_VALIDATE_SIGNATURE || '').toLowerCase() === 'true';
  if (shouldValidate) {
    const signature = c.req.header('x-twilio-signature') || '';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '';
    const urlForValidation = process.env.TWILIO_VOICE_MENU_WEBHOOK_URL || c.req.url;
    const isValid = twilio.validateRequest(authToken, signature, urlForValidation, body);
    if (!isValid) {
      logger.warn('[TwilioWebhook] Invalid X-Twilio-Signature for voice menu webhook');
      return c.text('forbidden', 403);
    }
  }

  const callSid = (body as any)?.CallSid;
  const digits = (body as any)?.Digits;
  const selection = typeof digits === 'string' ? digits.trim() : '';

  const salesNumber = process.env.TWILIO_IVR_SALES_NUMBER;
  const supportNumber = process.env.TWILIO_IVR_SUPPORT_NUMBER;
  const operatorNumber = process.env.TWILIO_IVR_OPERATOR_NUMBER || process.env.TWILIO_FORWARD_TO_NUMBER;

  let routeType: 'sales' | 'support' | 'operator' | 'unknown' = 'unknown';
  let dialTo: string | undefined;
  if (selection === '1') {
    routeType = 'sales';
    dialTo = salesNumber || operatorNumber;
  } else if (selection === '2') {
    routeType = 'support';
    dialTo = supportNumber || operatorNumber;
  } else if (selection === '0') {
    routeType = 'operator';
    dialTo = operatorNumber;
  }

  try {
    if (callSid && typeof callSid === 'string') {
      await twilioCallingService.recordIvrSelection({
        callSid,
        selection,
        routeType,
        ...(dialTo ? { dialTo } : {}),
      });
    }
  } catch (err) {
    logger.error('[TwilioWebhook] Failed to persist IVR selection', err);
  }

  if (!dialTo) {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Invalid selection.</Say>
  <Hangup />
</Response>`;
    return c.text(twiml, 200, { 'Content-Type': 'text/xml' });
  }

  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Connecting your call.</Say>
  <Dial>${dialTo}</Dial>
</Response>`;
  return c.text(twiml, 200, { 'Content-Type': 'text/xml' });
});

app.post('/webhooks/twilio/transcription', async (c) => {
  const rawBody = await c.req.parseBody();
  let body: Record<string, string>;
  try {
    body = toTwilioParams(rawBody);
  } catch {
    return c.text('bad request', 400);
  }
  const shouldValidate = String(process.env.TWILIO_VALIDATE_SIGNATURE || '').toLowerCase() === 'true';
  if (shouldValidate) {
    const signature = c.req.header('x-twilio-signature') || '';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '';
    const urlForValidation = process.env.TWILIO_TRANSCRIPTION_WEBHOOK_URL || c.req.url;
    const isValid = twilio.validateRequest(authToken, signature, urlForValidation, body);
    if (!isValid) {
      logger.warn('[TwilioWebhook] Invalid X-Twilio-Signature for transcription webhook');
      return c.text('forbidden', 403);
    }
  }

  try {
    await twilioCallingService.handleTranscriptionWebhook(body);
    return c.text('ok');
  } catch (err) {
    logger.error('[TwilioWebhook] Failed to process transcription webhook', err);
    return c.text('error', 500);
  }
});

app.get(
  '/api/calls/:callId/recording',
  requireAuth(),
  requirePermission(Permission.MESSAGE_READ),
  validateParams(callRecordingParamsSchema),
  validateQuery(callRecordingQuerySchema),
  async (c) => {
  const auth = c.get('auth');
  const orgId = auth.organizationId;
  if (!orgId) {
    return jsonApiError(c, 401, 'UNAUTHORIZED', 'unauthorized');
  }

  const params = c.get('validatedParams') as z.infer<typeof callRecordingParamsSchema>;
  const callId = params.callId;

  const [row] = await pgDb
    .select()
    .from(callLogs)
    .where(sql`${callLogs.organizationId} = ${orgId} and ${callLogs.metadata}->>'callId' = ${callId}`)
    .orderBy(desc(callLogs.createdAt))
    .limit(1);

  if (!row) {
    return jsonApiError(c, 404, 'NOT_FOUND', 'not found');
  }

  const recordingUrl = (row as any).recordingUrl || (row as any)?.metadata?.recordingUrl;
  if (!recordingUrl || typeof recordingUrl !== 'string') {
    return jsonApiError(c, 404, 'NOT_FOUND', 'not found');
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
  const authToken = process.env.TWILIO_AUTH_TOKEN || '';
  if (!accountSid || !authToken) {
    return jsonApiError(c, 500, 'INTERNAL_SERVER_ERROR', 'server not configured');
  }

  const query = c.get('validatedQuery') as z.infer<typeof callRecordingQuerySchema>;
  const format = query.format || 'mp3';
  const ext = format === 'wav' ? 'wav' : 'mp3';
  const mediaUrl = recordingUrl.endsWith(`.${ext}`) ? recordingUrl : `${recordingUrl}.${ext}`;

  const upstream = await fetch(mediaUrl, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
    },
  });

  if (!upstream.ok || !upstream.body) {
    return jsonApiError(c, 404, 'NOT_FOUND', 'not found');
  }

  const contentType = upstream.headers.get('content-type') || (ext === 'wav' ? 'audio/wav' : 'audio/mpeg');
  return c.body(upstream.body as any, 200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store',
  });
});

export default app;
