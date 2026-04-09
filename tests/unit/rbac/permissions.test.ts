import { describe, it, expect } from '@jest/globals';
import { 
  Role, 
  Permission, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions,
  getRolePermissions,
  canAccessResource,
  requirePermission,
  RBACError,
  normalizeRole
} from '../../../backend/lib/rbac';

describe('RBAC - Permissions', () => {
  describe('Role Normalization', () => {
    it('should normalize valid roles correctly', () => {
      expect(normalizeRole('super_admin')).toBe(Role.SUPER_ADMIN);
      expect(normalizeRole('enterprise_admin')).toBe(Role.ENTERPRISE_ADMIN);
      expect(normalizeRole('admin')).toBe(Role.ADMIN);
      expect(normalizeRole('user')).toBe(Role.USER);
    });

    it('should normalize case-insensitive roles', () => {
      expect(normalizeRole('SUPER_ADMIN')).toBe(Role.SUPER_ADMIN);
      expect(normalizeRole('Enterprise_Admin')).toBe(Role.ENTERPRISE_ADMIN);
      expect(normalizeRole('ADMIN')).toBe(Role.ADMIN);
      expect(normalizeRole('USER')).toBe(Role.USER);
    });

    it('should normalize legacy roles', () => {
      expect(normalizeRole('manager')).toBe(Role.ADMIN);
      expect(normalizeRole('viewer')).toBe(Role.USER);
      expect(normalizeRole('guest')).toBe(Role.USER);
    });

    it('should default to user role for invalid roles', () => {
      expect(normalizeRole('invalid')).toBe(Role.USER);
      expect(normalizeRole('')).toBe(Role.USER);
      expect(normalizeRole(null as any)).toBe(Role.USER);
      expect(normalizeRole(undefined as any)).toBe(Role.USER);
    });
  });

  describe('Permission Checking', () => {
    it('should grant super admin all permissions', () => {
      Object.values(Permission).forEach(permission => {
        expect(hasPermission(Role.SUPER_ADMIN, permission)).toBe(true);
      });
    });

    it('should check enterprise admin permissions correctly', () => {
      const enterpriseAdminPerms = [
        Permission.USER_CREATE,
        Permission.USER_DELETE,
        Permission.PLATFORM_CREATE,
        Permission.PLATFORM_DELETE,
        Permission.ANALYTICS_EXPORT,
        Permission.BILLING_UPDATE,
        Permission.TEAM_CREATE
      ];

      enterpriseAdminPerms.forEach(permission => {
        expect(hasPermission(Role.ENTERPRISE_ADMIN, permission)).toBe(true);
      });

      // Enterprise admin should have almost all permissions except some super admin only ones
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.PERMISSIONS_MANAGE)).toBe(true);
    });

    it('should check admin permissions correctly', () => {
      const adminPerms = [
        Permission.USER_READ,
        Permission.USER_UPDATE,
        Permission.PLATFORM_CREATE,
        Permission.PLATFORM_UPDATE,
        Permission.AI_ASSISTANT_USE,
        Permission.ANALYTICS_READ,
        Permission.SETTINGS_UPDATE
      ];

      adminPerms.forEach(permission => {
        expect(hasPermission(Role.ADMIN, permission)).toBe(true);
      });

      // Admin should not have destructive permissions
      expect(hasPermission(Role.ADMIN, Permission.USER_DELETE)).toBe(false);
      expect(hasPermission(Role.ADMIN, Permission.PLATFORM_DELETE)).toBe(false);
      expect(hasPermission(Role.ADMIN, Permission.BILLING_UPDATE)).toBe(false);
    });

    it('should check user permissions correctly', () => {
      const userPerms = [
        Permission.MESSAGE_CREATE,
        Permission.MESSAGE_READ,
        Permission.AI_ASSISTANT_USE,
        Permission.AI_RECEPTIONIST_USE,
        Permission.SETTINGS_READ,
        Permission.PRIVACY_SETTINGS_READ
      ];

      userPerms.forEach(permission => {
        expect(hasPermission(Role.USER, permission)).toBe(true);
      });

      // User should not have admin permissions
      expect(hasPermission(Role.USER, Permission.USER_CREATE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.PLATFORM_CREATE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.ANALYTICS_EXPORT)).toBe(false);
    });
  });

  describe('Multiple Permission Checks', () => {
    it('should check if user has any of the specified permissions', () => {
      const permissions = [Permission.USER_READ, Permission.USER_CREATE, Permission.USER_DELETE];
      
      expect(hasAnyPermission(Role.ADMIN, permissions)).toBe(true); // Has USER_READ
      expect(hasAnyPermission(Role.USER, permissions)).toBe(true); // Has USER_READ
      expect(hasAnyPermission(Role.USER, [Permission.USER_CREATE, Permission.USER_DELETE])).toBe(false);
    });

    it('should check if user has all specified permissions', () => {
      const userPermissions = [Permission.MESSAGE_CREATE, Permission.MESSAGE_READ, Permission.AI_ASSISTANT_USE];
      
      expect(hasAllPermissions(Role.USER, userPermissions)).toBe(true);
      expect(hasAllPermissions(Role.USER, [...userPermissions, Permission.USER_CREATE])).toBe(false);
    });

    it('should handle empty permission arrays', () => {
      expect(hasAnyPermission(Role.USER, [])).toBe(false);
      expect(hasAllPermissions(Role.USER, [])).toBe(true); // Vacuously true
    });
  });

  describe('Resource Access Control', () => {
    it('should allow super admin to access any resource', () => {
      const context = {
        userId: 'user-123',
        role: Role.SUPER_ADMIN,
        organizationId: 'org-123'
      };

      expect(canAccessResource(context, Permission.USER_DELETE)).toBe(true);
      expect(canAccessResource(context, Permission.BILLING_UPDATE)).toBe(true);
      expect(canAccessResource(context, Permission.PERMISSIONS_MANAGE)).toBe(true);
    });

    it('should allow access based on role permissions', () => {
      const adminContext = {
        userId: 'admin-123',
        role: Role.ADMIN,
        organizationId: 'org-123'
      };

      const userContext = {
        userId: 'user-123',
        role: Role.USER,
        organizationId: 'org-123'
      };

      expect(canAccessResource(adminContext, Permission.USER_READ)).toBe(true);
      // Admin cannot delete users since they don't have USER_DELETE permission
      expect(canAccessResource(adminContext, Permission.USER_DELETE)).toBe(false);
      
      expect(canAccessResource(userContext, Permission.MESSAGE_CREATE)).toBe(true);
      expect(canAccessResource(userContext, Permission.USER_CREATE)).toBe(false);
    });

    it('should handle resource ownership checks', () => {
      const adminContext = {
        userId: 'admin-123',
        role: Role.ADMIN,
        organizationId: 'org-123'
      };

      const userContext = {
        userId: 'user-123',
        role: Role.USER,
        organizationId: 'org-123'
      };

      // Admin can access others' resources for certain operations (only if they have the permission)
      expect(canAccessResource(adminContext, Permission.MESSAGE_DELETE, 'different-user')).toBe(true);
      // Admin cannot delete users since they don't have USER_DELETE permission
      expect(canAccessResource(adminContext, Permission.USER_DELETE, 'different-user')).toBe(false);
      
      // User can access their own resources
      expect(canAccessResource(userContext, Permission.MESSAGE_DELETE, 'user-123')).toBe(true);
    });
  });

  describe('Permission Requirements', () => {
    it('should not throw when user has required permission', () => {
      expect(() => {
        requirePermission(Role.ADMIN, Permission.USER_READ);
      }).not.toThrow();
    });

    it('should throw RBACError when user lacks required permission', () => {
      expect(() => {
        requirePermission(Role.USER, Permission.USER_CREATE);
      }).toThrow(RBACError);
    });

    it('should include permission and role in RBACError', () => {
      try {
        requirePermission(Role.USER, Permission.USER_CREATE);
        fail('Expected RBACError to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(RBACError);
        expect((error as RBACError).permission).toBe(Permission.USER_CREATE);
        expect((error as RBACError).role).toBe(Role.USER);
        expect((error as RBACError).message).toContain('Role user does not have permission user:create');
      }
    });
  });

  describe('Role Permission Retrieval', () => {
    it('should return all permissions for super admin', () => {
      const permissions = getRolePermissions(Role.SUPER_ADMIN);
      expect(permissions).toEqual(Object.values(Permission));
    });

    it('should return correct permissions for each role', () => {
      const userPerms = getRolePermissions(Role.USER);
      const adminPerms = getRolePermissions(Role.ADMIN);
      const enterprisePerms = getRolePermissions(Role.ENTERPRISE_ADMIN);

      // User permissions should be subset of admin permissions
      userPerms.forEach(perm => {
        expect(adminPerms).toContain(perm);
      });

      // Admin permissions should be subset of enterprise admin permissions
      adminPerms.forEach(perm => {
        expect(enterprisePerms).toContain(perm);
      });

      // Enterprise admin should have more permissions than admin
      expect(enterprisePerms.length).toBeGreaterThan(adminPerms.length);
      expect(adminPerms.length).toBeGreaterThan(userPerms.length);
    });

    it('should handle invalid roles gracefully', () => {
      const permissions = getRolePermissions('invalid' as any);
      expect(Array.isArray(permissions)).toBe(true);
    });
  });

  describe('Permission Categories', () => {
    it('should have user management permissions', () => {
      const userPerms = [
        Permission.USER_CREATE,
        Permission.USER_READ,
        Permission.USER_UPDATE,
        Permission.USER_DELETE
      ];

      userPerms.forEach(perm => {
        expect(hasPermission(Role.ENTERPRISE_ADMIN, perm)).toBe(true);
        expect(hasPermission(Role.ADMIN, Permission.USER_READ)).toBe(true);
        expect(hasPermission(Role.ADMIN, Permission.USER_UPDATE)).toBe(true);
      });
    });

    it('should have platform management permissions', () => {
      const platformPerms = [
        Permission.PLATFORM_CREATE,
        Permission.PLATFORM_READ,
        Permission.PLATFORM_UPDATE,
        Permission.PLATFORM_DELETE
      ];

      platformPerms.forEach(perm => {
        expect(hasPermission(Role.ENTERPRISE_ADMIN, perm)).toBe(true);
        // Admin should not have destructive permissions
        if (perm === Permission.PLATFORM_DELETE) {
          expect(hasPermission(Role.ADMIN, perm)).toBe(false);
        } else {
          expect(hasPermission(Role.ADMIN, perm)).toBe(true);
        }
        expect(hasPermission(Role.USER, Permission.PLATFORM_READ)).toBe(false);
      });
    });

    it('should have AI assistant permissions', () => {
      const aiPerms = [
        Permission.AI_ASSISTANT_USE,
        Permission.AI_RECEPTIONIST_USE,
        Permission.AI_NEGOTIATION_USE,
        Permission.AI_AGENT_USE
      ];

      aiPerms.forEach(perm => {
        expect(hasPermission(Role.SUPER_ADMIN, perm)).toBe(true);
        expect(hasPermission(Role.ENTERPRISE_ADMIN, perm)).toBe(true);
        expect(hasPermission(Role.ADMIN, perm)).toBe(true);
        expect(hasPermission(Role.USER, perm)).toBe(true);
      });
    });

    it('should have billing and analytics permissions', () => {
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.BILLING_READ)).toBe(true);
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.BILLING_UPDATE)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.BILLING_READ)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.BILLING_UPDATE)).toBe(false);

      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.ANALYTICS_EXPORT)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.ANALYTICS_EXPORT)).toBe(true);
      expect(hasPermission(Role.USER, Permission.ANALYTICS_EXPORT)).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle permission checking with invalid inputs', () => {
      expect(hasPermission('invalid' as any, Permission.USER_READ)).toBe(false);
      expect(hasPermission(Role.USER, 'invalid' as any)).toBe(false);
      expect(hasPermission(null as any, Permission.USER_READ)).toBe(false);
      expect(hasPermission(Role.USER, null as any)).toBe(false);
    });

    it('should handle resource access with invalid contexts', () => {
      const invalidContexts = [
        null,
        undefined,
        {},
        { userId: null },
        { role: null },
        { userId: 'user', role: 'invalid' }
      ];

      invalidContexts.forEach(context => {
        expect(canAccessResource(context as any, Permission.USER_READ)).toBe(false);
      });
    });
  });
});
