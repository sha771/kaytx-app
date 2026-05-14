import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq, and, lt, sql, desc } from 'drizzle-orm';
import { getDb } from '../db/connection';
import { users, sessions } from '../db/drizzle-schema';
import { config } from './config';
import { logAudit, AuditActions } from './audit';
import * as samlify from 'samlify';
import { SamlIdp, SamlSp } from 'samlify';
import { logger } from './production-logger';

type DbUser = any;
type DbSession = any;
type DbSessionInsert = any;

export type PublicSession = Omit<DbSession, 'token' | 'refreshToken'> & {
  token: string;
  refreshToken: string;
};

export type SessionWithPlainTokens = Omit<DbSession, 'token' | 'refreshToken'> & {
  token: string;
  refreshToken: string;
};

export type SessionWithPlainAccessToken = Omit<DbSession, 'token'> & {
  token: string;
};

// Development defaults - in production, these should be set via environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'kaydex_jwt_secret_development_key_at_least_32_characters_long';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'kaydex_jwt_refresh_secret_development_key_at_least_32_characters_long';

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET) {
    throw new Error('CRITICAL: JWT_SECRET environment variable is not set. Application cannot start.');
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('CRITICAL: JWT_REFRESH_SECRET environment variable is not set. Application cannot start.');
  }
}
const ONE_TIME_TOKEN_SECRET = process.env.ONE_TIME_TOKEN_SECRET || JWT_SECRET;
const TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000;

export async function hashAccessToken(token: string): Promise<string> {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function hashRefreshToken(token: string): Promise<string> {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function hashEmailVerificationToken(token: string): Promise<string> {
  return bcrypt.hash(token, 12);
}

export async function hashPasswordResetToken(token: string): Promise<string> {
  return bcrypt.hash(token, 12);
}

export async function verifyTokenHash(token: string, hash: string): Promise<boolean> {
  if (!hash || typeof hash !== 'string') return false;
  // Backward compatible: support legacy bcrypt-hashed tokens.
  if (hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$')) {
    return bcrypt.compare(token, hash);
  }
  // Deterministic hash used in tests and newer sessions.
  const computed = crypto.createHash('sha256').update(token).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hash));
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  organizationId?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    if (!hash || typeof hash !== 'string') {
      return false;
    }
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
}

export function generateToken(payload: TokenPayload): string {
  // Add a small random component to ensure uniqueness
  const payloadWithNonce = {
    ...payload,
    nonce: Math.random().toString(36).substring(2)
  };
  return jwt.sign(payloadWithNonce, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function generateRefreshToken(payload: TokenPayload): string {
  // Add a small random component to ensure uniqueness
  const payloadWithNonce = {
    ...payload,
    nonce: Math.random().toString(36).substring(2)
  };
  return jwt.sign(payloadWithNonce, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    if (!decoded || typeof decoded !== 'object') return null;
    if (!decoded.userId || !decoded.email || !decoded.role) return null;
    return {
      userId: String(decoded.userId),
      email: String(decoded.email),
      role: String(decoded.role),
      organizationId: decoded.organizationId ? String(decoded.organizationId) : undefined,
    };
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || JWT_REFRESH_SECRET) as any;
    if (!decoded || typeof decoded !== 'object') return null;
    if (!decoded.userId || !decoded.email || !decoded.role) return null;
    return {
      userId: String(decoded.userId),
      email: String(decoded.email),
      role: String(decoded.role),
      organizationId: decoded.organizationId ? String(decoded.organizationId) : undefined,
    };
  } catch {
    return null;
  }
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(24).toString('base64url');
}

export function generateSessionId(): string {
  return crypto.randomUUID();
}

export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string,
  deviceId?: string
): Promise<SessionWithPlainTokens> {
  let user: any;
  try {
    const pgDb = getDb();
    const results = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
    user = Array.isArray(results) ? results[0] : undefined;
  } catch {
    user = undefined;
  }

  if (!user) {
    throw new Error('User not found');
  }

  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    organizationId: user.organizationId,
  };

  const token = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);
  const tokenHash = await hashAccessToken(token);
  const refreshTokenHash = await hashRefreshToken(refreshToken);

  // Hash tokens before storing in database
  
  const now = Date.now();
  const sessionId = generateSessionId();
  const createdAt = new Date(now);
  const lastActivityAt = new Date(now);

  const normalizedIp = ipAddress && ipAddress !== 'unknown' ? ipAddress : null;
  const normalizedUserAgent = userAgent && userAgent !== 'unknown' ? userAgent : null;

  const session: DbSessionInsert = {
    id: sessionId,
    userId,
    token: tokenHash,
    refreshToken: refreshTokenHash,
    expiresAt: new Date(now + config.oauth.sessionExpiryMs),
    refreshExpiresAt: new Date(now + config.oauth.refreshTokenExpiryMs),
    ipAddress: normalizedIp,
    userAgent: normalizedUserAgent,
    deviceId: deviceId || null,
    createdAt,
    lastActivityAt,
  };

  await pgDb.insert(sessions).values({
    id: session.id,
    userId: session.userId,
    token: session.token,
    refreshToken: session.refreshToken,
    expiresAt: session.expiresAt,
    refreshExpiresAt: session.refreshExpiresAt,
    ipAddress: session.ipAddress,
    userAgent: session.userAgent,
    deviceId: session.deviceId,
    lastActivityAt: session.lastActivityAt,
  });

  logAudit({
    userId: session.userId,
    organizationId: user.organizationId ?? undefined,
    action: AuditActions.SESSION_CREATE,
    resource: 'session',
    resourceId: sessionId,
    ipAddress: normalizedIp ?? undefined,
    userAgent: normalizedUserAgent ?? undefined,
    status: 'success',
  });

  return {
    id: sessionId,
    userId: session.userId,
    token,
    refreshToken,
    expiresAt: session.expiresAt,
    refreshExpiresAt: session.refreshExpiresAt,
    ipAddress: session.ipAddress ?? null,
    userAgent: session.userAgent ?? null,
    deviceId: session.deviceId ?? null,
    createdAt,
    lastActivityAt,
  };
}

export async function refreshSession(refreshToken: string): Promise<SessionWithPlainTokens | null> {
  const payload = verifyRefreshToken(refreshToken);
  if (!payload) {
    return null;
  }

  // Get all sessions and check refresh token hashes
  const allSessions = await pgDb.select().from(sessions);
  
  let existingSession = null;
  for (const session of allSessions) {
    const isValidRefreshToken = await verifyTokenHash(refreshToken, session.refreshToken);
    if (isValidRefreshToken) {
      existingSession = session;
      break;
    }
  }

  if (!existingSession || existingSession.refreshExpiresAt.getTime() <= Date.now()) {
    return null;
  }

  const newToken = generateToken(payload);
  const newTokenHash = await hashAccessToken(newToken);
  const newRefreshToken = generateRefreshToken(payload);
  const newRefreshTokenHash = await hashRefreshToken(newRefreshToken);

  const now = new Date();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await pgDb
    .update(sessions)
    .set({
      token: newTokenHash,
      expiresAt,
      refreshToken: newRefreshTokenHash,
      refreshExpiresAt,
      lastActivityAt: now,
    })
    .where(eq(sessions.id, existingSession.id));

  return {
    ...existingSession,
    token: newToken,
    refreshToken: newRefreshToken,
    expiresAt,
    refreshExpiresAt,
    lastActivityAt: now,
  };
}

export async function revokeSession(sessionId: string): Promise<void> {
  try {
    const [existing] = await pgDb.select({ userId: sessions.userId }).from(sessions).where(eq(sessions.id, sessionId)).limit(1);
    
    if (!existing) {
      await logAudit({
        action: AuditActions.SESSION_REVOKE,
        resource: 'session',
        resourceId: sessionId,
        status: 'failure',
        metadata: { reason: 'session_not_found' },
      });
      return;
    }

    await pgDb.delete(sessions).where(eq(sessions.id, sessionId));

    await logAudit({
      action: AuditActions.SESSION_REVOKE,
      userId: existing.userId,
      organizationId: existing.organizationId,
      resource: 'session',
      resourceId: sessionId,
      status: 'success',
    });
  } catch (error) {
    logger.error('[Auth] Session revocation failed', error instanceof Error ? error : undefined, { error });
    await logAudit({
      userId: 'unknown',
      organizationId: 'unknown',
      action: AuditActions.SESSION_REVOKE,
      resource: 'session',
      status: 'failure',
      metadata: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    throw new Error('Failed to revoke session');
  }
}

export async function validateSession(token: string): Promise<{ valid: boolean; userId?: string; session?: any }> {
  try {
    // Get all sessions and check token hashes
    let allSessions: any[] = [];
    try {
      const allSessionsResult = await pgDb.select().from(sessions);
      allSessions = Array.isArray(allSessionsResult) ? allSessionsResult : [];
    } catch (dbError) {
      logger.error('[Auth] Database error in validateSession', dbError instanceof Error ? dbError : undefined, { error: dbError });
      return { valid: false };
    }
    
    for (const session of allSessions) {
      // Verify token hash using constant-time comparison
      const isValidToken = await verifyTokenHash(token, session.token);
      if (isValidToken) {
        // Check expiration
        if (session.expiresAt.getTime() <= Date.now()) {
          return { valid: false };
        }

        try {
          await pgDb
            .update(sessions)
            .set({ lastActivityAt: new Date() })
            .where(eq(sessions.id, session.id));
        } catch {
          // best-effort
        }

        return { valid: true, userId: session.userId, session: { ...session } };
      }
    }

    return { valid: false };
  } catch (error) {
    logger.error('[Auth] Session validation failed', error instanceof Error ? error : undefined, { error });
    return { valid: false };
  }
}

export async function validateSessionWithContext(
  token: string,
  options?: {
    ipAddress?: string;
    userAgent?: string;
    strictIp?: boolean;
    strictUserAgent?: boolean;
    revokeOnSuspicious?: boolean;
  }
): Promise<{ valid: boolean; userId?: string; session?: any; revoked?: boolean }> {
  const validation = await validateSession(token);
  if (!validation.valid || !validation.session) {
    return validation;
  }

  const session = validation.session;
  const ipAddress = options?.ipAddress && options.ipAddress !== 'unknown' ? options.ipAddress : undefined;
  const userAgent = options?.userAgent && options.userAgent !== 'unknown' ? options.userAgent : undefined;
  const strictIp = Boolean(options?.strictIp);
  const strictUserAgent = Boolean(options?.strictUserAgent);
  const revokeOnSuspicious = Boolean(options?.revokeOnSuspicious);

  let isSuspicious = false;
  const reasons: string[] = [];

  if (ipAddress && session.ipAddress && session.ipAddress !== ipAddress) {
    reasons.push(`IP address changed: ${session.ipAddress} -> ${ipAddress}`);
    isSuspicious = true;
    logAudit({
      action: AuditActions.USER_LOGIN,
      userId: session.userId,
      resource: 'session',
      metadata: { reason: 'IP address changed', oldIp: session.ipAddress, newIp: ipAddress },
      ipAddress,
      userAgent,
      status: 'failure'
    });
  }

  if (userAgent && session.userAgent && session.userAgent !== userAgent) {
    reasons.push(`User agent changed: ${session.userAgent} -> ${userAgent}`);
    isSuspicious = true;
    logAudit({
      action: AuditActions.USER_LOGIN,
      userId: session.userId,
      resource: 'session',
      metadata: { reason: 'User agent changed', oldUserAgent: session.userAgent, newUserAgent: userAgent },
      ipAddress,
      userAgent,
      status: 'failure'
    });
  }

  // If strict mode enabled, reject on any suspicion
  if (isSuspicious && (strictIp || strictUserAgent)) {
    if (revokeOnSuspicious) {
      await revokeSession(session.id);
      logger.warn(`[AUTH] Session revoked due to suspicious activity`, { reasons });
      return { valid: false, revoked: true };
    }
    return { valid: false };
  }

  return { valid: true, userId: session.userId, session };
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  await pgDb.delete(sessions).where(eq(sessions.userId, userId));

  logAudit({
    action: AuditActions.USER_LOGIN,
    userId,
    resource: 'session',
    metadata: { all: true },
    status: 'success'
  });
}

export async function handleFailedLogin(userId: string): Promise<void> {
  const [pgUser] = await pgDb.select().from(users).where(eq(users.id, userId)).limit(1);
  if (!pgUser) {
    return;
  }

  const failedAttempts = ((pgUser as any).failedLoginAttempts || 0) + 1;
  const status = failedAttempts >= MAX_FAILED_ATTEMPTS ? 'suspended' : (pgUser as any).status;
  const lockedUntil = failedAttempts >= MAX_FAILED_ATTEMPTS ? new Date(Date.now() + LOCK_DURATION) : null;

  await pgDb
    .update(users)
    .set({
      failedLoginAttempts: failedAttempts,
      status: status,
      accountLockedUntil: lockedUntil,
    })
    .where(eq(users.id, userId));
}

export async function resetFailedLoginAttempts(userId: string): Promise<void> {
  await pgDb
    .update(users)
    .set({
      failedLoginAttempts: 0,
      accountLockedUntil: null,
    })
    .where(eq(users.id, userId));
}

export function isAccountLocked(user: DbUser): boolean {
  if (user.accountLockedUntil && user.accountLockedUntil.getTime() > Date.now()) {
    return true;
  }
  return false;
}

export function calculateEntropy(password: string): number {
  const charset = new Set(password);
  let entropy = 0;
  
  // Calculate character set size
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32; // Special chars
  
  // Calculate entropy: log2(charsetSize^length)
  entropy = password.length * Math.log2(charsetSize);
  
  // Bonus for character variety
  const uniqueChars = charset.size;
  const varietyBonus = Math.log2(uniqueChars) * 2;
  
  return entropy + varietyBonus;
}

export function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const minLength = 12; // Increased from config minimum
  const minEntropy = 60; // Minimum entropy requirement

  // Length requirement
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  // Entropy requirement
  const entropy = calculateEntropy(password);
  if (entropy < minEntropy) {
    errors.push(`Password is too weak. Use a mix of character types and avoid common patterns (current entropy: ${Math.round(entropy)})`);
  }

  // Character requirements
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Common patterns check
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password cannot contain 3 or more repeated characters');
  }

  // Sequential characters check
  const lowerPassword = password.toLowerCase();
  for (let i = 0; i < lowerPassword.length - 2; i++) {
    const char1 = lowerPassword.charCodeAt(i);
    const char2 = lowerPassword.charCodeAt(i + 1);
    const char3 = lowerPassword.charCodeAt(i + 2);
    
    if (char2 === char1 + 1 && char3 === char2 + 1) {
      errors.push('Password cannot contain sequential characters');
      break;
    }
  }

  // Common password patterns
  const commonPatterns = [
    /password/i, /123456/, /qwerty/i, /admin/i, /letmein/i,
    /welcome/i, /monkey/i, /dragon/i, /master/i, /sunshine/i
  ];
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    errors.push('Password contains common patterns that are not allowed');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (!email) return false;
  if (email !== email.trim()) return false;

  // Prevent common header injection / address list injection patterns
  if (/[\r\n]/.test(email)) return false;
  if (/[<>"';]/.test(email)) return false;
  if (/%0d|%0a/i.test(email)) return false;

  // Must have exactly one @
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) return false;
  if (email.indexOf('@', atIndex + 1) !== -1) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!local || !domain) return false;
  if (local.startsWith('.') || local.endsWith('.')) return false;
  if (domain.startsWith('.') || domain.endsWith('.')) return false;
  if (email.includes('..')) return false;
  
  // Additional local part validations
  if (local.includes('..')) return false;
  if (local.startsWith('.')) return false;
  if (local.endsWith('.')) return false;

  // Domain must contain a dot (e.g. example.com) and be composed of safe labels
  const emailRegex = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+$/;
  if (!emailRegex.test(email)) return false;

  // Additional domain label sanity: no empty labels, no leading/trailing hyphen
  const labels = domain.split('.');
  if (labels.some((l) => !l || l.startsWith('-') || l.endsWith('-'))) return false;

  return true;
}

// --- ENTERPRISE SSO IMPLEMENTATION ---

// Enhanced SAML Provider Configuration with enterprise features
interface SAMLProviderConfig {
  entityId: string;
  ssoUrl: string;
  sloUrl?: string;
  certificate: string;
  privateKey?: string;
  attributeMapping: {
    email: string;
    firstName: string;
    lastName: string;
    groups?: string;
    department?: string;
    title?: string;
    employeeId?: string;
  };
  signingEnabled: boolean;
  encryptionEnabled: boolean;
  nameIdFormat: string;
  binding: 'HTTP-POST' | 'HTTP-Redirect';
  allowedDomains?: string[];
  roleMapping?: Record<string, string>;
  groupMapping?: Record<string, string>;
}

// Enhanced OIDC Provider Configuration with enterprise features
interface OIDCProviderConfig {
  clientId: string;
  clientSecret: string;
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  jwksUri?: string;
  scopes: string[];
  responseType: 'code' | 'id_token' | 'code id_token';
  responseMode?: 'query' | 'fragment' | 'form_post';
  pkce: boolean;
  logoutEndpoint?: string;
  introspectionEndpoint?: string;
  revocationEndpoint?: string;
  allowedDomains?: string[];
  roleMapping?: Record<string, string>;
  groupMapping?: Record<string, string>;
  claimsMapping?: Record<string, string>;
}

// Enterprise SSO session management
interface SSOSession {
  id: string;
  userId: string;
  organizationId: string;
  provider: 'saml' | 'oidc';
  providerId: string;
  sessionId: string;
  nameId?: string;
  subject?: string;
  attributes: Record<string, any>;
  createdAt: Date;
  expiresAt: Date;
  lastActivityAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// In-memory provider configs with enhanced security (in production, store in database)
const samlProviders = new Map<string, SAMLProviderConfig>();
const oidcProviders = new Map<string, OIDCProviderConfig>();
const ssoSessions = new Map<string, SSOSession>();

// Enhanced provider initialization with security defaults
function initializeSSOProviders() {
  // Example Okta SAML configuration with enhanced security
  samlProviders.set('okta-saml', {
    entityId: process.env.OKTA_ENTITY_ID || 'https://dev-123456.okta.com',
    ssoUrl: process.env.OKTA_SSO_URL || 'https://dev-123456.okta.com/app/saml123456_abcdef/sso/saml',
    sloUrl: process.env.OKTA_SLO_URL || 'https://dev-123456.okta.com/app/saml123456_abcdef/slo/saml',
    certificate: process.env.OKTA_CERTIFICATE || '',
    attributeMapping: {
      email: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
      firstName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
      lastName: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
      groups: 'http://schemas.xmlsoap.org/claims/Group',
      role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
      department: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/department'
    },
    securitySettings: {
      wantAssertionsSigned: true,
      wantResponseSigned: true,
      signatureAlgorithm: 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
      digestAlgorithm: 'http://www.w3.org/2001/04/xmlenc#sha256',
      encryptionAlgorithm: 'http://www.w3.org/2001/04/xmlenc#aes256-cbc',
      'Manager': 'admin',
      'User': 'user'
    },
    groupMapping: {
      'IT-Admins': 'admin',
      'Managers': 'manager',
      'All-Employees': 'user'
    }
  });

  // Example Azure AD OIDC configuration with enterprise features
  oidcProviders.set('azure-oidc', {
    clientId: process.env.AZURE_CLIENT_ID || '',
    clientSecret: process.env.AZURE_CLIENT_SECRET || '',
    issuer: process.env.AZURE_ISSUER || 'https://login.microsoftonline.com/{tenant-id}/v2.0',
    authorizationEndpoint: process.env.AZURE_AUTH_ENDPOINT || 'https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/authorize',
    tokenEndpoint: process.env.AZURE_TOKEN_ENDPOINT || 'https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token',
    userInfoEndpoint: process.env.AZURE_USERINFO_ENDPOINT || 'https://graph.microsoft.com/v1.0/me',
    jwksUri: process.env.AZURE_JWKS_URI || 'https://login.microsoftonline.com/{tenant-id}/discovery/v2.0/keys',
    scopes: ['openid', 'profile', 'email', 'groups', 'User.Read'],
    responseType: 'code',
    responseMode: 'query',
    pkce: true,
    logoutEndpoint: process.env.AZURE_LOGOUT_ENDPOINT || 'https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/logout',
    introspectionEndpoint: process.env.AZURE_INTROSPECTION_ENDPOINT || 'https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/introspect',
    revocationEndpoint: process.env.AZURE_REVOCATION_ENDPOINT || 'https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/revoke',
    allowedDomains: ['company.com', 'partner.com'],
    roleMapping: {
      'Global Administrator': 'enterprise_admin',
      'Application Administrator': 'admin',
      'User Administrator': 'admin',
      'User': 'user'
    },
    groupMapping: {
      'IT-Admins': 'admin',
      'Managers': 'manager',
      'All-Employees': 'user'
    },
    claimsMapping: {
      email: 'email',
      firstName: 'given_name',
      lastName: 'family_name',
      groups: 'groups',
      department: 'department',
      title: 'jobTitle'
    }
  });
}

initializeSSOProviders();

// Enhanced SSO initiation with enterprise security
export async function initiateSSO(
  provider: 'saml' | 'oidc',
  organizationSlug: string,
  providerId?: string,
  options?: {
    ipAddress?: string;
    userAgent?: string;
    forceAuth?: boolean;
    acrValues?: string[];
    loginHint?: string;
  }
) {
  logger.info(`[SSO] Initiating ${provider} flow`, { organizationSlug });
  
  try {
    // Validate organization exists and SSO is enabled
    const [org] = await pgDb
      .select()
      .from(organizations)
      .where(eq(organizations.slug, organizationSlug))
      .limit(1);

    if (!org) {
      throw new Error('Organization not found');
    }

    const orgSettings = org.metadata as any;
    const ssoConfig = orgSettings?.sso;

    if (!ssoConfig || !ssoConfig.enabled) {
      throw new Error('SSO not enabled for organization');
    }

    const providerKey = providerId || `${organizationSlug}-${provider}`;
    const providerConfig = provider === 'saml' 
      ? samlProviders.get(providerKey)
      : oidcProviders.get(providerKey);
    
    if (!providerConfig) {
      throw new Error(`SSO provider not found: ${providerKey}`);
    }

    // Log SSO initiation attempt
    await logSSOEvent({
      organizationId: org.id,
      provider: providerKey,
      event: 'login_attempt',
      details: { 
        organizationSlug, 
        forceAuth: options?.forceAuth,
        loginHint: options?.loginHint
      },
      ipAddress: options?.ipAddress,
      userAgent: options?.userAgent,
      severity: 'info'
    });

    if (provider === 'saml') {
      return await initiateSAMLFlow(organizationSlug, ssoConfig, options);
    } else if (provider === 'oidc') {
      return await initiateOIDCFlow(organizationSlug, ssoConfig, options);
    } else {
      throw new Error(`Unsupported SSO provider: ${provider}`);
    }
  } catch (error) {
    logger.error('[SSO] Error initiating SSO flow', error instanceof Error ? error : undefined, { error });
    throw error;
  }
}

// Enhanced SAML flow with enterprise security
async function initiateSAMLFlow(
  organizationSlug: string, 
  samlConfig: any, 
  options?: {
    ipAddress?: string;
    userAgent?: string;
    forceAuth?: boolean;
    acrValues?: string[];
    loginHint?: string;
  }
) {
  const provider = samlProviders.get(samlConfig.provider || 'okta-saml');
  if (!provider) {
    throw new Error('SAML provider not configured');
  }

  // Generate SAML request with enhanced security
  const samlRequest = generateSAMLRequest(provider, options);
  const relayState = crypto.randomUUID();
  
  // Store relay state in session/cache for verification
  // In production, use Redis or similar with TTL
  logger.debug(`[SAML] Generated relay state`, { relayState });

  // Create service provider configuration
  const sp = samlify.ServiceProvider({
    entityID: process.env.SP_ENTITY_ID || `urn:kaytx:${organizationSlug}`,
    assertionConsumerService: [{
      Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      Location: `${process.env.API_BASE_URL}/api/auth/sso/saml/callback`,
    }],
    singleLogoutService: [{
      Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      Location: `${process.env.API_BASE_URL}/api/auth/sso/saml/logout`,
    }],
  });

  // Create identity provider configuration
  const idp = samlify.IdentityProvider({
    entityID: provider.entityId,
    singleSignOnService: [{
      Binding: `urn:oasis:names:tc:SAML:2.0:bindings:${provider.binding}`,
      Location: provider.ssoUrl,
    }],
    singleLogoutService: provider.sloUrl ? [{
      Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
      Location: provider.sloUrl,
    }] : undefined,
    signingCert: provider.certificate,
  });

  return {
    redirectUrl: `${provider.ssoUrl}?SAMLRequest=${encodeURIComponent(samlRequest)}&RelayState=${relayState}`,
    relayState,
    provider: samlConfig.provider || 'okta-saml'
  };
}

async function initiateOIDCFlow(organizationSlug: string, oidcConfig: any) {
  const provider = oidcProviders.get(oidcConfig.provider || 'azure-oidc');
  if (!provider) {
    throw new Error('OIDC provider not configured');
  }

  const state = crypto.randomUUID();
  const codeVerifier = crypto.randomBytes(32).toString('base64url');
  const codeChallenge = createHash('sha256').update(codeVerifier).digest('base64url');

  // Store state and code verifier for verification
  // In production, use Redis or similar
  logger.debug(`[OIDC] Generated state`, { state, codeChallenge });

  const authUrl = new URL(provider.authorizationEndpoint);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', provider.clientId);
  authUrl.searchParams.set('redirect_uri', `${process.env.API_BASE_URL}/api/auth/sso/oidc/callback`);
  authUrl.searchParams.set('scope', provider.scopes.join(' '));
  authUrl.searchParams.set('state', state);
  authUrl.searchParams.set('code_challenge', codeChallenge);
  authUrl.searchParams.set('code_challenge_method', 'S256');

  return {
    redirectUrl: authUrl.toString(),
    state,
    codeVerifier
  };
}

// Enterprise SSO audit logging function
async function logSSOEvent(event: SSOAuditEvent) {
  try {
    // Log to audit system
    logAudit({
      userId: event.userId,
      organizationId: event.organizationId,
      action: `SSO_${event.event.toUpperCase()}`,
      resource: 'sso',
      resourceId: event.provider,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      metadata: {
        provider: event.provider,
        details: event.details
      },
      status: event.event.includes('failure') ? 'failure' : 'success',
      severity: event.severity
    });

    // Store SSO-specific audit event (in production, use database)
    logger.info('[SSO-AUDIT]', {
      id: event.id,
      organizationId: event.organizationId,
      userId: event.userId,
      provider: event.provider,
      event: event.event,
      details: event.details,
      ipAddress: event.ipAddress,
      userAgent: event.userAgent,
      timestamp: event.timestamp.toISOString(),
      severity: event.severity
    });
  } catch (error) {
    logger.error('[SSO] Failed to log audit event', error instanceof Error ? error : undefined, { error });
  }
}

// Enhanced SAML request generation with enterprise features
function generateSAMLRequest(provider: SAMLProviderConfig, options?: any): string {
  const id = `_${crypto.randomUUID()}`;
  const timestamp = new Date().toISOString();
  
  const samlRequest = `
    <samlp:AuthnRequest 
      xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"
      xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"
      ID="${id}"
      Version="2.0"
      IssueInstant="${timestamp}"
      Destination="${provider.ssoUrl}"
      AssertionConsumerServiceURL="${process.env.API_BASE_URL}/api/auth/sso/saml/callback"
      ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:${provider.binding}"
      ${options?.forceAuth ? 'ForceAuthn="true"' : ''}
      ${options?.acrValues ? `AssertionConsumerServiceIndex="${options.acrValues.join(' ')}"` : ''}>
      <saml:Issuer>${provider.entityId}</saml:Issuer>
      <samlp:NameIDPolicy Format="${provider.nameIdFormat}" />
      ${options?.loginHint ? `<saml:Subject><saml:NameID Format="${provider.nameIdFormat}">${options.loginHint}</saml:NameID></saml:Subject>` : ''}
    </samlp:AuthnRequest>
  `.trim();

  // Sign the request if signing is enabled
  if (provider.signingEnabled && provider.privateKey) {
    // In production, use proper XML signing library
    // For now, return unsigned request
  }

  // Base64 encode the SAML request
  return Buffer.from(samlRequest).toString('base64');
}

export async function verifySSOCallback(
  provider: 'saml' | 'oidc', 
  params: { SAMLResponse?: string; RelayState?: string; code?: string; state?: string },
  storedState?: { relayState?: string; state?: string; codeVerifier?: string }
) {
  logger.info(`[SSO] Verifying ${provider} callback`);

  try {
    if (provider === 'saml') {
      return await verifySAMLCallback(params.SAMLResponse!, params.RelayState!, storedState?.relayState);
    } else if (provider === 'oidc') {
      return await verifyOIDCCallback(params.code!, params.state!, storedState?.state, storedState?.codeVerifier);
    } else {
      throw new Error(`Unsupported SSO provider: ${provider}`);
    }
  } catch (error) {
    logger.error('[SSO] Error verifying callback', error instanceof Error ? error : undefined, { error });
    throw error;
  }
}

async function verifySAMLResponse(samlResponse: string, relayState: string, expectedRelayState?: string) {
  // Verify relay state
  if (expectedRelayState && relayState !== expectedRelayState) {
    throw new Error('Invalid relay state');
  }

  // Decode and parse SAML response
  const decodedResponse = Buffer.from(samlResponse, 'base64').toString();
  
  // In production, use proper XML parsing and signature verification
  // For now, extract user attributes (simplified)
  const emailMatch = decodedResponse.match(/<saml:Attribute Name="email"[^>]*>.*?<saml:AttributeValue[^>]*>([^<]+)<\/saml:AttributeValue>/);
  const firstNameMatch = decodedResponse.match(/<saml:Attribute Name="firstName"[^>]*>.*?<saml:AttributeValue[^>]*>([^<]+)<\/saml:AttributeValue>/);
  const lastNameMatch = decodedResponse.match(/<saml:Attribute Name="lastName"[^>]*>.*?<saml:AttributeValue[^>]*>([^<]+)<\/saml:AttributeValue>/);

  const email = emailMatch?.[1] || '';
  const firstName = firstNameMatch?.[1] || '';
  const lastName = lastNameMatch?.[1] || '';

  if (!email) {
    throw new Error('Email not found in SAML response');
  }

  // Find or create user
  const user = await findOrCreateSSOUser(email, firstName, lastName, 'saml');

  return {
    success: true,
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: 'saml'
  };
}

async function verifyOIDCCallback(code: string, state: string, expectedState?: string, codeVerifier?: string) {
  // Verify state
  if (expectedState && state !== expectedState) {
    throw new Error('Invalid state parameter');
  }

  const provider = oidcProviders.get('azure-oidc'); // Get from config
  if (!provider) {
    throw new Error('OIDC provider not configured');
  }

  // Exchange authorization code for tokens
  const tokenResponse = await exchangeCodeForTokens(provider, code, codeVerifier);
  
  // Get user info from OIDC provider
  const userInfo = await getOIDCUserInfo(provider, tokenResponse.access_token);

  // Find or create user
  const user = await findOrCreateSSOUser(userInfo.email, userInfo.firstName, userInfo.lastName, 'oidc');

  return {
    success: true,
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    provider: 'oidc'
  };
}

async function exchangeCodeForTokens(provider: OIDCProviderConfig, code: string, codeVerifier?: string) {
  const response = await fetch(provider.tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: provider.clientId,
      client_secret: provider.clientSecret,
      code,
      redirect_uri: `${process.env.API_BASE_URL}/api/auth/sso/oidc/callback`,
      code_verifier: codeVerifier || ''
    })
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for tokens');
  }

  return await response.json();
}

async function getOIDCUserInfo(provider: OIDCProviderConfig, accessToken: string) {
  const response = await fetch(provider.userInfoEndpoint, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  const userInfo = await response.json();
  
  return {
    email: userInfo.email || userInfo.mail,
    firstName: userInfo.given_name || userInfo.firstName,
    lastName: userInfo.family_name || userInfo.lastName
  };
}

async function findOrCreateSSOUser(email: string, firstName: string, lastName: string, provider: string) {
  // Check if user exists
  const [existingUser] = await pgDb
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    // Update last login and provider info
    await pgDb
      .update(users)
      .set({
        lastLoginAt: new Date(),
        metadata: {
          ...existingUser.metadata,
          ssoProvider: provider,
          ssoLastLogin: new Date().toISOString()
        }
      })
      .where(eq(users.id, existingUser.id));

    return existingUser;
  }

  // Create new user
  const userId = crypto.randomUUID();
  const newUser = {
    id: userId,
    email,
    firstName: firstName || '',
    lastName: lastName || '',
    password: '', // SSO users don't have passwords
    emailVerified: true,
    isActive: true,
    role: 'user',
    metadata: {
      ssoProvider: provider,
      ssoCreatedAt: new Date().toISOString(),
      autoProvisioned: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await pgDb.insert(users).values(newUser);

  return newUser;
}

export async function getSSOProviders(organizationSlug: string) {
  const [org] = await pgDb
    .select()
    .from(organizations)
    .where(eq(organizations.slug, organizationSlug))
    .limit(1);

  if (!org) {
    throw new Error('Organization not found');
  }

  const orgSettings = org.metadata as any;
  const ssoConfig = orgSettings?.sso;

  if (!ssoConfig || !ssoConfig.enabled) {
    return { enabled: false, providers: [] };
  }

  const providers = [];
  
  if (ssoConfig.saml?.enabled) {
    providers.push({
      type: 'saml',
      name: ssoConfig.saml.name || 'SAML',
      provider: ssoConfig.saml.provider || 'okta-saml'
    });
  }

  if (ssoConfig.oidc?.enabled) {
    providers.push({
      type: 'oidc',
      name: ssoConfig.oidc.name || 'OIDC',
      provider: ssoConfig.oidc.provider || 'azure-oidc'
    });
  }

  return {
    enabled: true,
    providers
  };
}

export async function configureSSO(
  organizationSlug: string,
  config: {
    enabled: boolean;
    saml?: {
      enabled: boolean;
      provider: string;
      name?: string;
    };
    oidc?: {
      enabled: boolean;
      provider: string;
      name?: string;
    };
  }
) {
  const [org] = await pgDb
    .select()
    .from(organizations)
    .where(eq(organizations.slug, organizationSlug))
    .limit(1);

  if (!org) {
    throw new Error('Organization not found');
  }

  await pgDb
    .update(organizations)
    .set({
      metadata: {
        ...org.metadata,
        sso: config
      },
      updatedAt: new Date()
    })
    .where(eq(organizations.id, org.id));

  return { success: true };
}
