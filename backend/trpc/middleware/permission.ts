import { TRPCError } from '@trpc/server';
import { middleware } from '../create-context';
import { Permission, Role, hasPermission } from '../../lib/rbac';
import { logAudit, AuditActions } from '../../lib/audit';

/**
 * Create a tRPC middleware that requires specific permissions
 */
export const createPermissionMiddleware = (permission: Permission) => 
  middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      logAudit({
        action: AuditActions.USER_LOGIN_FAILED,
        resource: 'auth',
        ipAddress: ctx.req.headers.get('x-forwarded-for') || undefined,
        userAgent: ctx.req.headers.get('user-agent') || undefined,
        metadata: { reason: 'no_user_context' },
        status: 'failure',
      });
      
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }

    const userRole = ctx.user.role as Role;
    
    if (!hasPermission(userRole, permission)) {
      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: AuditActions.PERMISSION_DENIED,
        resource: 'api',
        resourceId: permission,
        ipAddress: ctx.req.headers.get('x-forwarded-for') || undefined,
        userAgent: ctx.req.headers.get('user-agent') || undefined,
        metadata: { 
          required_permission: permission,
          user_role: userRole,
          endpoint: ctx.req.url
        },
        status: 'failure',
      });

      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Insufficient permissions. Required: ${permission}`,
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: {
          ...ctx.user,
          permissions: [permission], // Add permission to context for logging
        },
      },
    });
  });

/**
 * Create a middleware that requires any of the specified permissions
 */
export const createAnyPermissionMiddleware = (permissions: Permission[]) =>
  middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }

    const userRole = ctx.user.role as Role;
    const hasAnyPermission = permissions.some(permission => 
      hasPermission(userRole, permission)
    );

    if (!hasAnyPermission) {
      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: AuditActions.PERMISSION_DENIED,
        resource: 'api',
        ipAddress: ctx.req.headers.get('x-forwarded-for') || undefined,
        userAgent: ctx.req.headers.get('user-agent') || undefined,
        metadata: { 
          required_permissions: permissions,
          user_role: userRole,
          endpoint: ctx.req.url
        },
        status: 'failure',
      });

      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Insufficient permissions. Required one of: ${permissions.join(', ')}`,
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: {
          ...ctx.user,
          permissions, // Add permissions to context for logging
        },
      },
    });
  });

/**
 * Create a middleware that requires all specified permissions
 */
export const createAllPermissionsMiddleware = (permissions: Permission[]) =>
  middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }

    const userRole = ctx.user.role as Role;
    const hasAllPermissions = permissions.every(permission => 
      hasPermission(userRole, permission)
    );

    if (!hasAllPermissions) {
      const missingPermissions = permissions.filter(permission => 
        !hasPermission(userRole, permission)
      );

      logAudit({
        userId: ctx.user.id,
        organizationId: ctx.user.organizationId,
        action: AuditActions.PERMISSION_DENIED,
        resource: 'api',
        ipAddress: ctx.req.headers.get('x-forwarded-for') || undefined,
        userAgent: ctx.req.headers.get('user-agent') || undefined,
        metadata: { 
          required_permissions: permissions,
          missing_permissions: missingPermissions,
          user_role: userRole,
          endpoint: ctx.req.url
        },
        status: 'failure',
      });

      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Insufficient permissions. Missing: ${missingPermissions.join(', ')}`,
      });
    }

    return next({
      ctx: {
        ...ctx,
        user: {
          ...ctx.user,
          permissions, // Add permissions to context for logging
        },
      },
    });
  });

/**
 * Middleware for ownership-based access control
 */
export const createOwnershipMiddleware = (resourceType: string) =>
  middleware(async ({ ctx, next, input }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      });
    }

    const userRole = ctx.user.role as Role;
    
    // Super admins can access any resource
    if (userRole === Role.SUPER_ADMIN) {
      return next();
    }

    // For non-super admins, check ownership
    const resourceId = (input as any)?.id || (input as any)?.resourceId;
    
    if (resourceId && resourceId !== ctx.user.id) {
      // Check if user has admin-level permissions for cross-resource access
      const canAccessAny = [
        Permission.USER_DELETE,
        Permission.PLATFORM_DELETE,
        Permission.MESSAGE_DELETE,
      ].some(permission => hasPermission(userRole, permission));

      if (!canAccessAny) {
        logAudit({
          userId: ctx.user.id,
          organizationId: ctx.user.organizationId,
          action: AuditActions.PERMISSION_DENIED,
          resource: resourceType,
          resourceId,
          ipAddress: ctx.req.headers.get('x-forwarded-for') || undefined,
          userAgent: ctx.req.headers.get('user-agent') || undefined,
          metadata: { 
            reason: 'ownership_violation',
            user_role: userRole,
            requested_resource: resourceId
          },
          status: 'failure',
        });

        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Access denied: You can only access your own resources',
        });
      }
    }

    return next();
  });

// Pre-built permission middleware for common use cases
export const requireUserCreate = createPermissionMiddleware(Permission.USER_CREATE);
export const requireUserRead = createPermissionMiddleware(Permission.USER_READ);
export const requireUserUpdate = createPermissionMiddleware(Permission.USER_UPDATE);
export const requireUserDelete = createPermissionMiddleware(Permission.USER_DELETE);

export const requirePlatformCreate = createPermissionMiddleware(Permission.PLATFORM_CREATE);
export const requirePlatformRead = createPermissionMiddleware(Permission.PLATFORM_READ);
export const requirePlatformUpdate = createPermissionMiddleware(Permission.PLATFORM_UPDATE);
export const requirePlatformDelete = createPermissionMiddleware(Permission.PLATFORM_DELETE);

export const requireAIAssistantUse = createPermissionMiddleware(Permission.AI_ASSISTANT_USE);
export const requireAIAgentManage = createPermissionMiddleware(Permission.AI_AGENT_MANAGE);

export const requireAnalyticsRead = createPermissionMiddleware(Permission.ANALYTICS_READ);
export const requireAnalyticsExport = createPermissionMiddleware(Permission.ANALYTICS_EXPORT);

export const requireBillingRead = createPermissionMiddleware(Permission.BILLING_READ);
export const requireBillingUpdate = createPermissionMiddleware(Permission.BILLING_UPDATE);

export const requireAuditRead = createPermissionMiddleware(Permission.AUDIT_READ);
export const requireAuditExport = createPermissionMiddleware(Permission.AUDIT_EXPORT);

export const requireSettingsRead = createPermissionMiddleware(Permission.SETTINGS_READ);
export const requireSettingsUpdate = createPermissionMiddleware(Permission.SETTINGS_UPDATE);

export const requireTeamManage = createAnyPermissionMiddleware([
  Permission.TEAM_CREATE,
  Permission.TEAM_UPDATE,
  Permission.TEAM_DELETE,
]);

export const requireAdminAccess = createAnyPermissionMiddleware([
  Permission.USER_CREATE,
  Permission.PLATFORM_CREATE,
  Permission.AI_AGENT_MANAGE,
]);

export const requireEnterpriseAccess = createAnyPermissionMiddleware([
  Permission.BILLING_UPDATE,
  Permission.PERMISSIONS_MANAGE,
  Permission.USER_DELETE,
]);
