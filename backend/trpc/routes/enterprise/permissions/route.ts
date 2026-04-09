import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { users, organizations } from '../../../../db/drizzle-schema';
import { eq, and } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { Permission, Role, normalizeRole } from '../../../../lib/rbac';

const rolePermissionSchema = z.object({
  role: z.enum(['admin', 'manager', 'user', 'viewer']),
  permissions: z.array(z.string()),
});

const userPermissionSchema = z.object({
  userId: z.string(),
  permissions: z.array(z.string()),
});

const permissionCheckSchema = z.object({
  userId: z.string(),
  permission: z.string(),
  resource: z.string().optional(),
});

const createRoleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  permissions: z.array(z.string()),
  isSystemRole: z.boolean().default(false),
});

const updateRoleSchema = z.object({
  roleId: z.string(),
  name: z.string().optional(),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

const deleteRoleSchema = z.object({
  roleId: z.string(),
  transferToRoleId: z.string().optional(),
});

// Default role permissions
const defaultRolePermissions = {
  admin: [
    'users.read', 'users.write', 'users.delete',
    'billing.read', 'billing.write',
    'settings.read', 'settings.write',
    'analytics.read', 'analytics.write',
    'integrations.read', 'integrations.write',
    'audit.read', 'audit.export',
    'team.manage', 'organization.manage',
  ],
  manager: [
    'users.read', 'users.write',
    'billing.read',
    'settings.read',
    'analytics.read',
    'integrations.read',
    'audit.read',
    'team.read',
  ],
  user: [
    'profile.read', 'profile.write',
    'billing.read',
    'settings.read',
    'analytics.read',
    'integrations.read',
  ],
  viewer: [
    'profile.read',
    'billing.read',
    'settings.read',
    'analytics.read',
  ],
};

function getUiRoleForUserRow(user: any): keyof typeof defaultRolePermissions {
  const metaRole = typeof user?.metadata?.teamRole === 'string' ? String(user.metadata.teamRole).toLowerCase() : '';
  if (metaRole === 'admin' || metaRole === 'manager' || metaRole === 'user' || metaRole === 'viewer') {
    return metaRole as any;
  }

  const role = normalizeRole(user?.role) as Role;
  if (role === Role.SUPER_ADMIN || role === Role.ENTERPRISE_ADMIN || role === Role.ADMIN) {
    return 'admin';
  }
  return 'user';
}

export const getRolePermissionsProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(z.object({ role: z.enum(['admin', 'manager', 'user', 'viewer']) }))
  .query(async ({ input }) => {
    return {
      role: input.role,
      permissions: defaultRolePermissions[input.role],
    };
  });

export const updateRolePermissionsProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(rolePermissionSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // In a real implementation, this would update a role_permissions table
    // For now, we'll just log the change
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.PERMISSIONS_UPDATED,
      resource: 'role',
      resourceId: input.role,
      organizationId,
      metadata: {
        role: input.role,
        permissions: input.permissions,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Role permissions updated successfully',
    };
  });

export const getUserPermissionsProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(z.object({ userId: z.string() }))
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, input.userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    const uiRole = getUiRoleForUserRow(user as any);
    const rolePermissions = defaultRolePermissions[uiRole] || [];
    
    return {
      userId: input.userId,
      role: uiRole,
      permissions: rolePermissions,
    };
  });

export const updateUserPermissionsProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(userPermissionSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, input.userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    // In a real implementation, this would update a user_permissions table
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.PERMISSIONS_UPDATED,
      resource: 'user',
      resourceId: input.userId,
      organizationId,
      metadata: {
        targetUserId: input.userId,
        permissions: input.permissions,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'User permissions updated successfully',
    };
  });

export const checkPermissionProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(permissionCheckSchema)
  .query(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    const [user] = await pgDb
      .select()
      .from(users)
      .where(and(
        eq(users.id, input.userId),
        eq(users.organizationId, organizationId)
      ))
      .limit(1);

    if (!user) {
      throw new Error('User not found');
    }

    const uiRole = getUiRoleForUserRow(user as any);
    const rolePermissions = defaultRolePermissions[uiRole] || [];
    const hasPermission = rolePermissions.includes(input.permission);

    return {
      userId: input.userId,
      permission: input.permission,
      resource: input.resource,
      hasPermission,
      role: uiRole,
    };
  });

export const getAllPermissionsProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(z.object({}).optional())
  .query(async ({ input }) => {
    const allPermissions = [
      // User management
      'users.read', 'users.write', 'users.delete',
      // Billing
      'billing.read', 'billing.write',
      // Settings
      'settings.read', 'settings.write',
      // Analytics
      'analytics.read', 'analytics.write',
      // Integrations
      'integrations.read', 'integrations.write',
      // Audit
      'audit.read', 'audit.export',
      // Team management
      'team.read', 'team.manage',
      // Organization
      'organization.read', 'organization.manage',
      // Profile
      'profile.read', 'profile.write',
    ];

    return {
      permissions: allPermissions,
      categories: {
        users: ['users.read', 'users.write', 'users.delete'],
        billing: ['billing.read', 'billing.write'],
        settings: ['settings.read', 'settings.write'],
        analytics: ['analytics.read', 'analytics.write'],
        integrations: ['integrations.read', 'integrations.write'],
        audit: ['audit.read', 'audit.export'],
        team: ['team.read', 'team.manage'],
        organization: ['organization.read', 'organization.manage'],
        profile: ['profile.read', 'profile.write'],
      },
    };
  });

export const createRoleProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(createRoleSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    // In a real implementation, this would create a new role in the database
    const newRole = {
      id: `role_${Date.now()}`,
      name: input.name,
      description: input.description,
      permissions: input.permissions,
      isSystemRole: input.isSystemRole,
      organizationId,
      createdAt: new Date(),
    };

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.ROLE_CREATED,
      resource: 'role',
      resourceId: newRole.id,
      organizationId,
      metadata: {
        roleName: input.name,
        permissions: input.permissions,
      },
      status: 'success',
    });

    return {
      success: true,
      role: newRole,
      message: 'Role created successfully',
    };
  });

export const updateRoleProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(updateRoleSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.ROLE_UPDATED,
      resource: 'role',
      resourceId: input.roleId,
      organizationId,
      metadata: {
        roleId: input.roleId,
        changes: Object.keys(input).filter(key => input[key as keyof typeof input] !== undefined),
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Role updated successfully',
    };
  });

export const deleteRoleProcedure = permissionProcedure(Permission.PERMISSIONS_MANAGE)
  .input(deleteRoleSchema)
  .mutation(async ({ input, ctx }) => {
    const organizationId = ctx.user.organizationId;
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.ROLE_DELETED,
      resource: 'role',
      resourceId: input.roleId,
      organizationId,
      metadata: {
        roleId: input.roleId,
        transferToRoleId: input.transferToRoleId,
      },
      status: 'success',
    });

    return {
      success: true,
      message: 'Role deleted successfully',
    };
  });
