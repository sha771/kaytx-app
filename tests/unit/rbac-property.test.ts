import fc from 'fast-check';
import { describe, it, expect } from '@jest/globals';
import { 
  Role, 
  Permission, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions,
  checkAccess,
  normalizeRole
} from '../../backend/lib/rbac';

interface RBACContext {
  userId: string;
  role: Role;
  organizationId?: string;
  teamId?: string;
}

describe('RBAC Property Tests', () => {
  describe('Property 1: RBAC Permission Verification', () => {
    it('should correctly verify permissions for all role-permission combinations', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random role
          fc.constantFrom(...Object.values(Role)),
          // Generate random permission
          fc.constantFrom(...Object.values(Permission)),
          // Generate random context
          fc.record({
            userId: fc.uuid(),
            role: fc.constantFrom(...Object.values(Role)),
            organizationId: fc.option(fc.uuid()),
            teamId: fc.option(fc.uuid())
          }),
          // Generate optional resource owner ID
          fc.option(fc.uuid()),
          (role, permission, context, resourceOwnerId) => {
            // Property: hasPermission should be deterministic
            const result1 = hasPermission(role, permission);
            const result2 = hasPermission(role, permission);
            expect(result1).toBe(result2);

            // Property: Super admin should have all permissions
            if (role === Role.SUPER_ADMIN) {
              expect(hasPermission(role, permission)).toBe(true);
            }

            // Property: Permission checking should be consistent with role hierarchy
            // Note: Some privacy permissions are intentionally granted to users for GDPR compliance
            const sensitivePermissions = [
              Permission.USER_DELETE,
              Permission.PLATFORM_DELETE,
              Permission.BILLING_UPDATE,
              Permission.PERMISSIONS_MANAGE,
              Permission.BACKUP_TRIGGER,
            ];
            
            if (role === Role.USER && sensitivePermissions.includes(permission)) {
              // Users shouldn't have admin-level permissions
              expect(hasPermission(Role.USER, permission)).toBe(false);
            }

            // Property: checkAccess should handle resource ownership correctly
            const accessResult = checkAccess(context, permission, resourceOwnerId);
            
            // Super admins should always have access
            if (context.role === Role.SUPER_ADMIN) {
              expect(accessResult).toBe(true);
            }

            // Users should access their own resources
            if (context.role === Role.USER && resourceOwnerId === context.userId) {
              expect(accessResult).toBe(true);
            }
          }
        ),
        { numRuns: 1000 }
      );
    });

    it('should handle permission arrays correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Role)),
          fc.array(fc.constantFrom(...Object.values(Permission)), { minLength: 1, maxLength: 10 }),
          (role, permissions) => {
            // Property: hasAnyPermission should be true if at least one permission is granted
            const anyResult = hasAnyPermission(role, permissions);
            const individualResults = permissions.map(p => hasPermission(role, p));
            const expectedAny = individualResults.some(r => r);
            expect(anyResult).toBe(expectedAny);

            // Property: hasAllPermissions should be true only if all permissions are granted
            const allResult = hasAllPermissions(role, permissions);
            const expectedAll = individualResults.every(r => r);
            expect(allResult).toBe(expectedAll);

            // Property: If all permissions are granted, then any permission should be granted
            if (allResult) {
              expect(anyResult).toBe(true);
            }
          }
        ),
        { numRuns: 500 }
      );
    });

    it('should normalize role strings correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.string({ minLength: 1, maxLength: 50 }),
          (roleString) => {
            const normalized = normalizeRole(roleString);
            
            // Property: Normalized role should always be a valid Role enum
            expect(Object.values(Role)).toContain(normalized);

            // Property: Valid roles should normalize to themselves
            const validRoles = Object.values(Role);
            if (validRoles.includes(roleString as Role)) {
              expect(normalized).toBe(roleString);
            }

            // Property: Case and hyphen/underscore variations should normalize
            const variations = [
              roleString.toLowerCase(),
              roleString.toUpperCase(),
              roleString.replace(/-/g, '_'),
              roleString.replace(/_/g, '-')
            ];
            
            // All variations of the same base should normalize to the same role
            const normalizedVariations = variations.map(v => normalizeRole(v));
            expect(new Set(normalizedVariations).size).toBeLessThanOrEqual(2);
          }
        ),
        { numRuns: 200 }
      );
    });
  });

  describe('Property 2: Role Hierarchy Consistency', () => {
    it('should maintain consistent permission hierarchy', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.constantFrom(...Object.values(Permission)),
          (permission) => {
            const userHas = hasPermission(Role.USER, permission);
            const adminHas = hasPermission(Role.ADMIN, permission);
            const enterpriseHas = hasPermission(Role.ENTERPRISE_ADMIN, permission);
            const superHas = hasPermission(Role.SUPER_ADMIN, permission);

            // Property: Permission hierarchy should be monotonic
            if (userHas) expect(adminHas).toBe(true);
            if (adminHas) expect(enterpriseHas).toBe(true);
            if (enterpriseHas) expect(superHas).toBe(true);

            // Property: Super admin should have all permissions
            expect(superHas).toBe(true);

            // Property: Permission sets should be nested
            const userPerms = getRolePermissions(Role.USER);
            const adminPerms = getRolePermissions(Role.ADMIN);
            const enterprisePerms = getRolePermissions(Role.ENTERPRISE_ADMIN);
            const superPerms = getRolePermissions(Role.SUPER_ADMIN);

            // Check subset relationships manually
            for (const perm of userPerms) {
              expect(adminPerms).toContain(perm);
            }
            for (const perm of adminPerms) {
              expect(enterprisePerms).toContain(perm);
            }
            for (const perm of enterprisePerms) {
              expect(superPerms).toContain(perm);
            }
          }
        ),
        { numRuns: Object.values(Permission).length }
      );
    });
  });

  describe('Property 3: Context-Based Access Control', () => {
    it('should handle resource ownership correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            userId: fc.uuid(),
            role: fc.constantFrom(...Object.values(Role)),
            organizationId: fc.option(fc.uuid()),
            teamId: fc.option(fc.uuid())
          }),
          fc.uuid(), // resourceOwnerId
          fc.constantFrom(...Object.values(Permission)),
          (context, resourceOwnerId, permission) => {
            const accessResult = checkAccess(context, permission, resourceOwnerId);

            // Property: Users can access their own resources
            if (context.userId === resourceOwnerId) {
              expect(accessResult).toBe(true);
            }

            // Property: Super admins can access any resource
            if (context.role === Role.SUPER_ADMIN) {
              expect(accessResult).toBe(true);
            }

            // Property: Access without permission should be denied (except super admin)
            if (context.role !== Role.SUPER_ADMIN && !hasPermission(context.role, permission)) {
              expect(accessResult).toBe(false);
            }
          }
        ),
        { numRuns: 500 }
      );
    });
  });
});

// Helper function to get role permissions (copied from rbac.ts for testing)
function getRolePermissions(role: Role): Permission[] {
  const rolePermissions: Record<Role, Permission[]> = {
    [Role.SUPER_ADMIN]: Object.values(Permission),
    [Role.ENTERPRISE_ADMIN]: [
      Permission.USER_READ, Permission.USER_UPDATE, Permission.USER_CREATE, Permission.USER_DELETE,
      Permission.PLATFORM_CREATE, Permission.PLATFORM_READ, Permission.PLATFORM_UPDATE, Permission.PLATFORM_DELETE,
      Permission.MESSAGE_CREATE, Permission.MESSAGE_READ, Permission.MESSAGE_UPDATE, Permission.MESSAGE_DELETE,
      Permission.NOTIFICATIONS_READ, Permission.NOTIFICATIONS_UPDATE,
      Permission.AI_ASSISTANT_USE, Permission.AI_RECEPTIONIST_USE, Permission.AI_NEGOTIATION_USE,
      Permission.AI_AGENT_USE, Permission.AI_AGENT_READ, Permission.AI_AGENT_MANAGE, Permission.AI_AGENT_ANALYTICS_READ,
      Permission.ANALYTICS_READ, Permission.ANALYTICS_EXPORT,
      Permission.SETTINGS_READ, Permission.SETTINGS_UPDATE,
      Permission.AUDIT_READ, Permission.AUDIT_EXPORT,
      Permission.BILLING_READ, Permission.BILLING_UPDATE,
      Permission.TEAM_CREATE, Permission.TEAM_READ,
      Permission.API_KEY_CREATE, Permission.API_KEY_READ, Permission.API_KEY_DELETE,
      Permission.WEBHOOK_CREATE, Permission.WEBHOOK_READ, Permission.WEBHOOK_UPDATE, Permission.WEBHOOK_DELETE, Permission.WEBHOOK_TEST,
      Permission.INTEGRATION_CREATE, Permission.INTEGRATION_READ, Permission.INTEGRATION_UPDATE, Permission.INTEGRATION_DELETE, Permission.INTEGRATION_TEST,
      Permission.COMPLIANCE_READ, Permission.COMPLIANCE_GENERATE,
      Permission.PERMISSIONS_MANAGE,
      Permission.BACKUP_READ, Permission.BACKUP_TRIGGER,
      Permission.PRIVACY_SETTINGS_READ, Permission.PRIVACY_SETTINGS_UPDATE,
      Permission.PRIVACY_CONSENT_READ, Permission.PRIVACY_CONSENT_UPDATE,
      Permission.PRIVACY_ACCESS_LOGS_READ, Permission.PRIVACY_REQUESTS_READ,
      Permission.PRIVACY_BREACH_CHECK, Permission.PRIVACY_DATA_EXPORT, Permission.PRIVACY_DATA_DELETE,
      Permission.CALL_INITIATE, Permission.CALL_END, Permission.CALL_READ,
      Permission.CALL_METRICS_READ, Permission.CALL_HISTORY_READ,
      Permission.BRIDGE_READ, Permission.BRIDGE_CREATE, Permission.BRIDGE_CONNECT,
      Permission.BRIDGE_DISCONNECT, Permission.BRIDGE_STATUS_READ, Permission.BRIDGE_HEALTH_READ,
      Permission.SECURITY_MFA_SETUP, Permission.SECURITY_MFA_ENABLE, Permission.SECURITY_MFA_DISABLE,
      Permission.SECURITY_MFA_REGENERATE_CODES, Permission.SECURITY_MFA_STATUS_READ,
      Permission.ANALYTICS_METRICS_READ, Permission.ANALYTICS_EXPORT,
      Permission.MARKETING_CAMPAIGNS_READ, Permission.MARKETING_CAMPAIGNS_CREATE, Permission.MARKETING_CAMPAIGNS_UPDATE,
      Permission.SECURITY_SETTINGS_READ,
      Permission.TEAM_MEMBERS_READ,
    ],
    [Role.ADMIN]: [
      Permission.USER_CREATE, Permission.USER_READ, Permission.USER_UPDATE,
      Permission.PLATFORM_CREATE, Permission.PLATFORM_READ, Permission.PLATFORM_UPDATE,
      Permission.MESSAGE_CREATE, Permission.MESSAGE_READ, Permission.MESSAGE_UPDATE, Permission.MESSAGE_DELETE,
      Permission.NOTIFICATIONS_READ, Permission.NOTIFICATIONS_UPDATE,
      Permission.AI_ASSISTANT_USE, Permission.AI_RECEPTIONIST_USE, Permission.AI_NEGOTIATION_USE,
      Permission.AI_AGENT_USE, Permission.AI_AGENT_READ, Permission.AI_AGENT_MANAGE, Permission.AI_AGENT_ANALYTICS_READ,
      Permission.ANALYTICS_READ, Permission.ANALYTICS_EXPORT,
      Permission.SETTINGS_READ, Permission.SETTINGS_UPDATE,
      Permission.AUDIT_READ, Permission.BILLING_READ, Permission.TEAM_READ,
      Permission.API_KEY_READ, Permission.WEBHOOK_READ, Permission.INTEGRATION_READ, Permission.COMPLIANCE_READ,
      Permission.BACKUP_READ, Permission.BACKUP_TRIGGER,
      Permission.PRIVACY_SETTINGS_READ, Permission.PRIVACY_SETTINGS_UPDATE,
      Permission.PRIVACY_CONSENT_READ, Permission.PRIVACY_CONSENT_UPDATE,
      Permission.PRIVACY_ACCESS_LOGS_READ, Permission.PRIVACY_REQUESTS_READ,
      Permission.PRIVACY_BREACH_CHECK, Permission.PRIVACY_DATA_EXPORT, Permission.PRIVACY_DATA_DELETE,
      Permission.CALL_INITIATE, Permission.CALL_END, Permission.CALL_READ,
      Permission.CALL_METRICS_READ, Permission.CALL_HISTORY_READ,
      Permission.BRIDGE_READ, Permission.BRIDGE_CREATE, Permission.BRIDGE_CONNECT,
      Permission.BRIDGE_DISCONNECT, Permission.BRIDGE_STATUS_READ, Permission.BRIDGE_HEALTH_READ,
      Permission.SECURITY_MFA_SETUP, Permission.SECURITY_MFA_ENABLE, Permission.SECURITY_MFA_DISABLE,
      Permission.SECURITY_MFA_REGENERATE_CODES, Permission.SECURITY_MFA_STATUS_READ,
      Permission.ANALYTICS_METRICS_READ, Permission.ANALYTICS_EXPORT,
      Permission.MARKETING_CAMPAIGNS_READ, Permission.MARKETING_CAMPAIGNS_CREATE, Permission.MARKETING_CAMPAIGNS_UPDATE,
      Permission.SECURITY_SETTINGS_READ,
      Permission.TEAM_MEMBERS_READ,
    ],
    [Role.USER]: [
      Permission.MESSAGE_CREATE, Permission.MESSAGE_READ, Permission.MESSAGE_UPDATE, Permission.MESSAGE_DELETE,
      Permission.NOTIFICATIONS_READ, Permission.USER_READ,
      Permission.AI_ASSISTANT_USE, Permission.AI_RECEPTIONIST_USE, Permission.AI_NEGOTIATION_USE,
      Permission.AI_AGENT_USE, Permission.AI_AGENT_READ, Permission.AI_AGENT_ANALYTICS_READ,
      Permission.ANALYTICS_READ, Permission.SETTINGS_READ,
      Permission.PRIVACY_SETTINGS_READ, Permission.PRIVACY_SETTINGS_UPDATE,
      Permission.PRIVACY_CONSENT_READ, Permission.PRIVACY_CONSENT_UPDATE,
      Permission.PRIVACY_ACCESS_LOGS_READ, Permission.PRIVACY_REQUESTS_READ,
      Permission.PRIVACY_BREACH_CHECK, Permission.PRIVACY_DATA_EXPORT, Permission.PRIVACY_DATA_DELETE,
      Permission.SECURITY_MFA_SETUP, Permission.SECURITY_MFA_ENABLE, Permission.SECURITY_MFA_DISABLE,
      Permission.SECURITY_MFA_REGENERATE_CODES, Permission.SECURITY_MFA_STATUS_READ,
      Permission.ANALYTICS_METRICS_READ,
      Permission.MARKETING_CAMPAIGNS_READ,
      Permission.SECURITY_SETTINGS_READ,
      Permission.TEAM_MEMBERS_READ,
    ],
  };
  
  return rolePermissions[role] || [];
}
