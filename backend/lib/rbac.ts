export enum Role {
  SUPER_ADMIN = 'super_admin',
  ENTERPRISE_ADMIN = 'enterprise_admin',
  ADMIN = 'admin',
  USER = 'user',
}

 export function normalizeRole(role: unknown): Role {
  const rawValue = typeof role === 'string' ? role.toLowerCase().trim() : '';
  const value = rawValue.replace(/-/g, '_');
 
  if (value === Role.SUPER_ADMIN) return Role.SUPER_ADMIN;
  if (value === Role.ENTERPRISE_ADMIN) return Role.ENTERPRISE_ADMIN;
  if (value === Role.ADMIN) return Role.ADMIN;
  if (value === Role.USER) return Role.USER;

  if (value === 'manager') return Role.ADMIN;
  if (value === 'viewer') return Role.USER;
  if (value === 'guest') return Role.USER;

  return Role.USER;
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
  
  NOTIFICATIONS_READ = 'notifications:read',
  NOTIFICATIONS_UPDATE = 'notifications:update',
  
  AI_ASSISTANT_USE = 'ai:assistant:use',
  AI_RECEPTIONIST_USE = 'ai:receptionist:use',
  AI_NEGOTIATION_USE = 'ai:negotiation:use',

  AI_AGENT_USE = 'ai:agent:use',
  AI_AGENT_READ = 'ai:agent:read',
  AI_AGENT_CREATE = 'ai:agent:create',
  AI_AGENT_UPDATE = 'ai:agent:update',
  AI_AGENT_DELETE = 'ai:agent:delete',
  AI_AGENT_MANAGE = 'ai:agent:manage',
  AI_AGENT_ANALYTICS_READ = 'ai:agent:analytics:read',
  
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

  API_KEY_CREATE = 'api_key:create',
  API_KEY_READ = 'api_key:read',
  API_KEY_DELETE = 'api_key:delete',

  WEBHOOK_CREATE = 'webhook:create',
  WEBHOOK_READ = 'webhook:read',
  WEBHOOK_UPDATE = 'webhook:update',
  WEBHOOK_DELETE = 'webhook:delete',
  WEBHOOK_TEST = 'webhook:test',

  INTEGRATION_CREATE = 'integration:create',
  INTEGRATION_READ = 'integration:read',
  INTEGRATION_UPDATE = 'integration:update',
  INTEGRATION_DELETE = 'integration:delete',
  INTEGRATION_TEST = 'integration:test',

  COMPLIANCE_READ = 'compliance:read',
  COMPLIANCE_GENERATE = 'compliance:generate',

  PERMISSIONS_MANAGE = 'permissions:manage',

  BACKUP_READ = 'backup:read',
  BACKUP_TRIGGER = 'backup:trigger',

  PRIVACY_SETTINGS_READ = 'privacy:settings:read',
  PRIVACY_SETTINGS_UPDATE = 'privacy:settings:update',
  PRIVACY_CONSENT_READ = 'privacy:consent:read',
  PRIVACY_CONSENT_UPDATE = 'privacy:consent:update',
  PRIVACY_ACCESS_LOGS_READ = 'privacy:access_logs:read',
  PRIVACY_REQUESTS_READ = 'privacy:requests:read',
  PRIVACY_BREACH_CHECK = 'privacy:breach_check',
  PRIVACY_DATA_EXPORT = 'privacy:data:export',
  PRIVACY_DATA_DELETE = 'privacy:data:delete',

  CALL_INITIATE = 'call:initiate',
  CALL_END = 'call:end',
  CALL_READ = 'call:read',
  CALL_METRICS_READ = 'call:metrics:read',
  CALL_HISTORY_READ = 'call:history:read',

  BRIDGE_READ = 'bridge:read',
  BRIDGE_CREATE = 'bridge:create',
  BRIDGE_CONNECT = 'bridge:connect',
  BRIDGE_DISCONNECT = 'bridge:disconnect',
  BRIDGE_STATUS_READ = 'bridge:status:read',
  BRIDGE_HEALTH_READ = 'bridge:health:read',

  SECURITY_MFA_SETUP = 'security:mfa:setup',
  SECURITY_MFA_ENABLE = 'security:mfa:enable',
  SECURITY_MFA_DISABLE = 'security:mfa:disable',
  SECURITY_MFA_REGENERATE_CODES = 'security:mfa:regenerate_codes',
  SECURITY_MFA_STATUS_READ = 'security:mfa:status:read',

  ANALYTICS_METRICS_READ = 'analytics:metrics:read',

  MARKETING_CAMPAIGNS_READ = 'marketing:campaigns:read',
  MARKETING_CAMPAIGNS_CREATE = 'marketing:campaigns:create',
  MARKETING_CAMPAIGNS_UPDATE = 'marketing:campaigns:update',


  SECURITY_SETTINGS_READ = 'security:settings:read',

  TEAM_MEMBERS_READ = 'team:members:read',

  SYSTEM_READ = 'system:read',
  SYSTEM_UPDATE = 'system:update',
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: Object.values(Permission),

  [Role.ENTERPRISE_ADMIN]: [
    Permission.USER_READ,
    Permission.USER_UPDATE,
    Permission.USER_CREATE,
    Permission.USER_DELETE,
    Permission.PLATFORM_CREATE,
    Permission.PLATFORM_READ,
    Permission.PLATFORM_UPDATE,
    Permission.PLATFORM_DELETE,
    Permission.MESSAGE_CREATE,
    Permission.MESSAGE_READ,
    Permission.MESSAGE_UPDATE,
    Permission.MESSAGE_DELETE,
    Permission.NOTIFICATIONS_READ,
    Permission.NOTIFICATIONS_UPDATE,
    Permission.AI_ASSISTANT_USE,
    Permission.AI_RECEPTIONIST_USE,
    Permission.AI_NEGOTIATION_USE,

    Permission.AI_AGENT_USE,
    Permission.AI_AGENT_READ,
    Permission.AI_AGENT_MANAGE,
    Permission.AI_AGENT_ANALYTICS_READ,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.SETTINGS_READ,
    Permission.SETTINGS_UPDATE,
    Permission.AUDIT_READ,
    Permission.AUDIT_EXPORT,
    Permission.BILLING_READ,
    Permission.BILLING_UPDATE,
    Permission.TEAM_CREATE,
    Permission.TEAM_READ,

    Permission.API_KEY_CREATE,
    Permission.API_KEY_READ,
    Permission.API_KEY_DELETE,

    Permission.WEBHOOK_CREATE,
    Permission.WEBHOOK_READ,
    Permission.WEBHOOK_UPDATE,
    Permission.WEBHOOK_DELETE,
    Permission.WEBHOOK_TEST,

    Permission.INTEGRATION_CREATE,
    Permission.INTEGRATION_READ,
    Permission.INTEGRATION_UPDATE,
    Permission.INTEGRATION_DELETE,
    Permission.INTEGRATION_TEST,

    Permission.COMPLIANCE_READ,
    Permission.COMPLIANCE_GENERATE,

    Permission.PERMISSIONS_MANAGE,

    Permission.BACKUP_READ,
    Permission.BACKUP_TRIGGER,

    Permission.PRIVACY_SETTINGS_READ,
    Permission.PRIVACY_SETTINGS_UPDATE,
    Permission.PRIVACY_CONSENT_READ,
    Permission.PRIVACY_CONSENT_UPDATE,
    Permission.PRIVACY_ACCESS_LOGS_READ,
    Permission.PRIVACY_REQUESTS_READ,
    Permission.PRIVACY_BREACH_CHECK,
    Permission.PRIVACY_DATA_EXPORT,
    Permission.PRIVACY_DATA_DELETE,

    Permission.CALL_INITIATE,
    Permission.CALL_END,
    Permission.CALL_READ,
    Permission.CALL_METRICS_READ,
    Permission.CALL_HISTORY_READ,

    Permission.BRIDGE_READ,
    Permission.BRIDGE_CREATE,
    Permission.BRIDGE_CONNECT,
    Permission.BRIDGE_DISCONNECT,
    Permission.BRIDGE_STATUS_READ,
    Permission.BRIDGE_HEALTH_READ,

    Permission.SECURITY_MFA_SETUP,
    Permission.SECURITY_MFA_ENABLE,
    Permission.SECURITY_MFA_DISABLE,
    Permission.SECURITY_MFA_REGENERATE_CODES,
    Permission.SECURITY_MFA_STATUS_READ,

    Permission.ANALYTICS_METRICS_READ,
    Permission.ANALYTICS_EXPORT,

    Permission.MARKETING_CAMPAIGNS_READ,
    Permission.MARKETING_CAMPAIGNS_CREATE,
    Permission.MARKETING_CAMPAIGNS_UPDATE,


    Permission.SECURITY_SETTINGS_READ,

    Permission.TEAM_MEMBERS_READ,
  ],
  
  [Role.ADMIN]: [
    Permission.USER_CREATE,
    Permission.USER_READ,
    Permission.USER_UPDATE,
    // Permission.USER_DELETE removed - only enterprise admin and above can delete users

    Permission.PLATFORM_READ,
    Permission.PLATFORM_CREATE,
    Permission.PLATFORM_UPDATE,
    // Permission.PLATFORM_DELETE removed - only enterprise admin and above can delete platforms
    Permission.MESSAGE_CREATE,
    Permission.MESSAGE_READ,
    Permission.MESSAGE_UPDATE,
    Permission.MESSAGE_DELETE,
    Permission.NOTIFICATIONS_READ, // Added NOTIFICATIONS_READ
    Permission.NOTIFICATIONS_UPDATE, // Added NOTIFICATIONS_UPDATE
    Permission.AI_ASSISTANT_USE,
    Permission.AI_RECEPTIONIST_USE,
    Permission.AI_NEGOTIATION_USE,
    Permission.AI_AGENT_USE,
    Permission.AI_AGENT_READ,
    Permission.AI_AGENT_MANAGE,
    Permission.AI_AGENT_ANALYTICS_READ,
    Permission.ANALYTICS_READ,
    Permission.ANALYTICS_EXPORT,
    Permission.SETTINGS_READ,
    Permission.SETTINGS_UPDATE,
    Permission.AUDIT_READ,
    Permission.BILLING_READ,
    Permission.TEAM_READ,

    Permission.API_KEY_READ,
    Permission.WEBHOOK_READ,
    Permission.INTEGRATION_READ,
    Permission.COMPLIANCE_READ,

    Permission.BACKUP_READ,
    Permission.BACKUP_TRIGGER,

    Permission.PRIVACY_SETTINGS_READ,
    Permission.PRIVACY_SETTINGS_UPDATE,
    Permission.PRIVACY_CONSENT_READ,
    Permission.PRIVACY_CONSENT_UPDATE,
    Permission.PRIVACY_ACCESS_LOGS_READ,
    Permission.PRIVACY_REQUESTS_READ,
    Permission.PRIVACY_BREACH_CHECK,
    Permission.PRIVACY_DATA_EXPORT,
    Permission.PRIVACY_DATA_DELETE,

    Permission.CALL_INITIATE,
    Permission.CALL_END,
    Permission.CALL_READ,
    Permission.CALL_METRICS_READ,
    Permission.CALL_HISTORY_READ,

    Permission.BRIDGE_READ,
    Permission.BRIDGE_CREATE,
    Permission.BRIDGE_CONNECT,
    Permission.BRIDGE_DISCONNECT,
    Permission.BRIDGE_STATUS_READ,
    Permission.BRIDGE_HEALTH_READ,

    Permission.SECURITY_MFA_SETUP,
    Permission.SECURITY_MFA_ENABLE,
    Permission.SECURITY_MFA_DISABLE,
    Permission.SECURITY_MFA_REGENERATE_CODES,
    Permission.SECURITY_MFA_STATUS_READ,

    Permission.ANALYTICS_METRICS_READ,
    Permission.ANALYTICS_EXPORT,

    Permission.MARKETING_CAMPAIGNS_READ,
    Permission.MARKETING_CAMPAIGNS_CREATE,
    Permission.MARKETING_CAMPAIGNS_UPDATE,


    Permission.SECURITY_SETTINGS_READ,

    Permission.TEAM_MEMBERS_READ,
  ],

  [Role.USER]: [
    Permission.MESSAGE_CREATE,
    Permission.MESSAGE_READ,
    Permission.MESSAGE_UPDATE,
    Permission.MESSAGE_DELETE,
    Permission.NOTIFICATIONS_READ,
    Permission.USER_READ,
    Permission.AI_ASSISTANT_USE,
    Permission.AI_RECEPTIONIST_USE,
    Permission.AI_NEGOTIATION_USE,
    Permission.AI_AGENT_USE,
    Permission.AI_AGENT_READ,
    Permission.AI_AGENT_ANALYTICS_READ,
    Permission.ANALYTICS_READ,
    Permission.SETTINGS_READ,

    Permission.PRIVACY_SETTINGS_READ,
    Permission.PRIVACY_SETTINGS_UPDATE,
    Permission.PRIVACY_CONSENT_READ,
    Permission.PRIVACY_CONSENT_UPDATE,
    Permission.PRIVACY_ACCESS_LOGS_READ,
    Permission.PRIVACY_REQUESTS_READ,
    Permission.PRIVACY_BREACH_CHECK,
    Permission.PRIVACY_DATA_EXPORT,
    Permission.PRIVACY_DATA_DELETE,

    Permission.SECURITY_MFA_SETUP,
    Permission.SECURITY_MFA_ENABLE,
    Permission.SECURITY_MFA_DISABLE,
    Permission.SECURITY_MFA_REGENERATE_CODES,
    Permission.SECURITY_MFA_STATUS_READ,

    Permission.ANALYTICS_METRICS_READ,

    Permission.MARKETING_CAMPAIGNS_READ,


    Permission.SECURITY_SETTINGS_READ,

    Permission.TEAM_MEMBERS_READ,
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) || false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some((permission) => {
    if (!permission) return false;
    if (!Object.values(Permission).includes(permission)) return false;
    return hasPermission(role, permission);
  });
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions
    .filter((permission) => permission && Object.values(Permission).includes(permission))
    .every((permission) => hasPermission(role, permission));
}

export function getRolePermissions(role: Role): Permission[] {
  return rolePermissions[role] || [];
}

export function canAccessResource(
  contextOrRole: RBACContext | Role,
  permissionOrResource: Permission | string,
  resourceOwnerIdOrAction?: string | Permission,
  action?: string
): boolean {
  // Handle legacy signature: canAccessResource(role, resource, action)
  if (typeof contextOrRole === 'string') {
    const role = contextOrRole as Role;
    const resource = permissionOrResource as string;
    const act = resourceOwnerIdOrAction as string;
    const permission = `${resource}:${act}` as Permission;
    return hasPermission(role, permission);
  }

  // Handle new signature: canAccessResource(context, permission, resourceOwnerId)
  const context = contextOrRole as RBACContext;
  const permission = permissionOrResource as Permission;
  const resourceOwnerId = resourceOwnerIdOrAction as string | undefined;

  return checkAccess(context, permission, resourceOwnerId);
}

export interface RBACContext {
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
  if (!context || !context.role) {
    return false;
  }

  if (context.role === Role.SUPER_ADMIN) {
    return true;
  }

  // Always require explicit permission first
  if (!hasPermission(context.role, permission)) {
    return false;
  }

  // Check if accessing own resources
  const isOwnResource = !resourceOwnerId || context.userId === resourceOwnerId;
  
  if (isOwnResource) {
    // For own resources, explicit permission is sufficient
    return true;
  }

  // For others' resources, explicit permission is sufficient
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
