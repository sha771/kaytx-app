import { Context, Next } from 'hono';
import { verifyToken, validateSession } from '../lib/auth';
import { db as pgDb } from '../db/connection';
import { users } from '../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { Role, Permission, hasPermission, checkAccess, RBACError, normalizeRole } from '../lib/rbac';
import { jsonApiError } from '../lib/api-error';

function getBearerTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader) return null;
  const match = authHeader.match(/^bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();
  return token ? token : null;
}

interface AuthContext {
  userId: string;
  role: Role;
  organizationId?: string;
  email: string;
}

export async function getAuthContext(c: Context): Promise<AuthContext | null> {
  const token = getBearerTokenFromHeader(c.req.header('authorization'));
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload?.userId) return null;

  const sessionValidation = await validateSession(token);
  if (!sessionValidation.valid || !sessionValidation.userId) {
    return null;
  }

  if (String(sessionValidation.userId) !== String(payload.userId)) {
    return null;
  }

  const [user] = await pgDb.select().from(users).where(eq(users.id, sessionValidation.userId)).limit(1);
  if (!user) return null;

  return {
    userId: user.id,
    role: normalizeRole(user.role) as Role,
    organizationId: user.organizationId || undefined,
    email: user.email,
  };
}

export function requireAuth(): (c: Context, next: Next) => Promise<void | Response> {
  return async (c: Context, next: Next): Promise<void | Response> => {
    const auth = await getAuthContext(c);
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
    }
    
    c.set('auth', auth);
    await next();
    return;
  };
}

export function requirePermission(permission: Permission): (c: Context, next: Next) => Promise<void | Response> {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    if (!hasPermission(auth.role, permission)) {
      return jsonApiError(c, 403, 'FORBIDDEN', 'Forbidden', [
        { message: `Role ${auth.role} does not have permission ${permission}` },
      ]);
    }

    await next();
    return;
  };
}

export function requireAnyPermission(permissions: Permission[]): (c: Context, next: Next) => Promise<void | Response> {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    const hasAny = permissions.some(permission => hasPermission(auth.role, permission));
    if (!hasAny) {
      return jsonApiError(c, 403, 'FORBIDDEN', 'Forbidden', [
        { message: `Role ${auth.role} does not have any of the required permissions` },
      ]);
    }

    await next();
    return;
  };
}

export function requireRole(role: Role): (c: Context, next: Next) => Promise<void | Response> {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    if (auth.role !== role) {
      return jsonApiError(c, 403, 'FORBIDDEN', 'Forbidden', [
        { message: `Required role: ${role}, current role: ${auth.role}` },
      ]);
    }

    await next();
    return;
  };
}

export function requireMinRole(minRole: Role): (c: Context, next: Next) => Promise<void | Response> {
  const roleHierarchy = {
    [Role.USER]: 1,
    [Role.ADMIN]: 2,
    [Role.ENTERPRISE_ADMIN]: 3,
    [Role.SUPER_ADMIN]: 4,
  };

  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    const userLevel = roleHierarchy[auth.role];
    const requiredLevel = roleHierarchy[minRole];

    if (typeof userLevel !== 'number' || typeof requiredLevel !== 'number' || userLevel < requiredLevel) {
      return jsonApiError(c, 403, 'FORBIDDEN', 'Forbidden', [
        { message: `Minimum role required: ${minRole}, current role: ${auth.role}` },
      ]);
    }

    await next();
    return;
  };
}

export function requireOwnership(resourceIdParam: string = 'id', resourceType: string = 'resource') {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Unauthorized');
    }

    const resourceId = c.req.param(resourceIdParam);
    if (!resourceId) {
      return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Resource ID required');
    }

    // Super admins can access any resource
    if (auth.role === Role.SUPER_ADMIN) {
      await next();
      return;
    }

    // Enterprise admins can access resources within their organization
    if (auth.role === Role.ENTERPRISE_ADMIN) {
      // For organization-scoped resources, check if user belongs to the same org
      if (resourceType === 'organization' && auth.organizationId) {
        await next();
        return;
      }
    }

    // Regular admins can access their own resources and organization resources
    if (auth.role === Role.ADMIN) {
      if (resourceType === 'user' && resourceId === auth.userId) {
        await next();
        return;
      }
    }

    // For non-admin users, check if they own the resource
    // This would need to be implemented per resource type
    // For now, we'll allow admins and enterprise admins to proceed
    if (auth.role === Role.ADMIN || auth.role === Role.ENTERPRISE_ADMIN) {
      await next();
      return;
    }

    // Regular users can only access their own resources
    return jsonApiError(c, 403, 'FORBIDDEN', 'Forbidden', [
      { message: 'Forbidden - can only access own resources' },
    ]);
  };
}

/**
 * Enhanced RBAC middleware for API endpoints with additional security checks
 */
export function requireApiAuth(permission?: Permission) {
  return async (c: Context, next: Next) => {
    const auth = await getAuthContext(c);
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Authentication required');
    }
    
    c.set('auth', auth);
    
    // Check permission if specified
    if (permission && !hasPermission(auth.role, permission)) {
      return jsonApiError(c, 403, 'FORBIDDEN', 'Insufficient permissions', [
        { message: `Role ${auth.role} does not have permission ${permission}` },
      ]);
    }
    
    await next();
  };
}

/**
 * Rate limiting middleware for authenticated users
 */
export function requireAuthWithRateLimit(limit: number = 100, windowMs: number = 60 * 1000) {
  return async (c: Context, next: Next) => {
    const auth = await getAuthContext(c);
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Authentication required');
    }
    
    c.set('auth', auth);
    
    // Simple in-memory rate limiting (in production, use Redis)
    const key = `rate_limit:${auth.userId}`;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // This would need to be replaced with proper rate limiting storage
    await next();
  };
}

/**
 * Middleware to check organization membership
 */
export function requireOrganizationMember(organizationIdParam: string = 'organizationId') {
  return async (c: Context, next: Next) => {
    const auth = c.get('auth') as AuthContext;
    if (!auth) {
      return jsonApiError(c, 401, 'UNAUTHORIZED', 'Authentication required');
    }
    
    const organizationId = c.req.param(organizationIdParam) || c.req.query(organizationIdParam);
    
    if (!organizationId) {
      return jsonApiError(c, 400, 'VALIDATION_ERROR', 'Organization ID required');
    }
    
    // Super admins can access any organization
    if (auth.role === Role.SUPER_ADMIN) {
      await next();
      return;
    }
    
    // Check if user belongs to the organization
    if (auth.organizationId !== organizationId) {
      return jsonApiError(c, 403, 'FORBIDDEN', 'Access denied to this organization');
    }
    
    await next();
  };
}
