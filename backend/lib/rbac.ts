export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  GUEST = 'guest',
}

export enum Permission {
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  
  PLATFORM_CREATE = 'platform:create',
  PLATFORM_READ = 'platform:read',
  PLATFORM_UPDATE = 'platform:update',
  PLATFORM_DELETE = 'platform:delete',
  
  MESSAGE_CREATE = 'message:create',
  MESSAGE_READ = 'message:read',
  MESSAGE_UPDATE = 'message:update',
  MESSAGE_DELETE = 'message:delete',
  
  AI_ASSISTANT_USE = 'ai:assistant:use',
  AI_RECEPTIONIST_USE = 'ai:receptionist:use',
  AI_NEGOTIATION_USE = 'ai:negotiation:use',
  
  ANALYTICS_READ = 'analytics:read',
  ANALYTICS_EXPORT = 'analytics:export',
  
  SETTINGS_READ = 'settings:read',
  SETTINGS_UPDATE = 'settings:update',
  
  AUDIT_READ = 'audit:read',
  AUDIT_EXPORT = 'audit:export',
  
  BILLING_READ = 'billing:read',
  BILLING_UPDATE = 'billing:update',
  
  TEAM_CREATE = 'team:create',
  TEAM_READ = 'team:read',
  TEAM_UPDATE = 'team:update',
  TEAM_DELETE = 'team:delete',
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),
  
  [Role.ADMIN]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.PLATFORM_CREATE,
    Permission.PLATFORM_READ,
    Permission.PLATFORM_UPDATE,
    Permission.PLATFORM_DELETE,
    Permission.MESSAGE_CREATE,
    Permission.MESSAGE_READ,
    Permission.MESSAGE_UPDATE,
    Permission.MESSAGE_DELETE,
    Permission.AI_ASSISTANT_USE,
    Permission.AI_RECEPTIONIST_USE,
    Permission.AI_NEGOTIATION_USE,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.SETTINGS_READ,
    Permission.SETTINGS_UPDATE,
    Permission.AUDIT_READ,
    Permission.BILLING_READ,
    Permission.TEAM_READ,
    Permission.TEAM_UPDATE,
  ],
  
  [Role.MANAGER]: [
    Permission.USER_READ,
    Permission.PLATFORM_READ,
    Permission.MESSAGE_CREATE,
    Permission.MESSAGE_READ,
    Permission.MESSAGE_UPDATE,
    Permission.AI_ASSISTANT_USE,
    Permission.AI_RECEPTIONIST_USE,
    Permission.AI_NEGOTIATION_USE,
    Permission.ANALYTICS_READ,
    Permission.SETTINGS_READ,
    Permission.TEAM_READ,
  ],
  
  [Role.USER]: [
    Permission.PLATFORM_READ,
    Permission.MESSAGE_CREATE,
    Permission.MESSAGE_READ,
    Permission.MESSAGE_UPDATE,
    Permission.AI_ASSISTANT_USE,
    Permission.SETTINGS_READ,
  ],
  
  [Role.GUEST]: [
    Permission.MESSAGE_READ,
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] || [];
}

export function canAccessResource(role: Role, resource: string, action: string): boolean {
  const permission = `${resource}:${action}` as Permission;
  return hasPermission(role, permission);
}

interface RBACContext {
  userId: string;
  role: Role;
  organizationId?: string;
  teamId?: string;
}

export function checkAccess(
  context: RBACContext,
  permission: Permission,
  resourceOwnerId?: string
): boolean {
  if (context.role === Role.SUPER_ADMIN) {
    return true;
  }

  if (!hasPermission(context.role, permission)) {
    return false;
  }

  if (resourceOwnerId && context.userId !== resourceOwnerId) {
    const isAdminAction = [
      Permission.USER_DELETE,
      Permission.PLATFORM_DELETE,
      Permission.MESSAGE_DELETE,
    ].includes(permission);
    
    if (isAdminAction && context.role !== Role.ADMIN) {
      return false;
    }
  }

  return true;
}

export class RBACError extends Error {
  constructor(
    message: string,
    public permission: Permission,
    public role: Role
  ) {
    super(message);
    this.name = 'RBACError';
  }
}

export function requirePermission(role: Role, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new RBACError(
      `Role ${role} does not have permission ${permission}`,
      permission,
      role
    );
  }
}
