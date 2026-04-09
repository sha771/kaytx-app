import { describe, it, expect, jest } from '@jest/globals';

import { 
  Role, 
  Permission, 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions,
  getRolePermissions,
  canAccessResource,
  checkAccess,
  normalizeRole,
  RBACError,
  requirePermission
} from '../../backend/lib/rbac';

// Mock the imports before importing the actual module
jest.mock('../../backend/lib/rbac', () => {
  const actualModule = jest.requireActual('../../backend/lib/rbac');
  return {
    ...actualModule,
    // We'll use the actual implementation, just mocking is not needed
  };
});

describe('RBAC System', () => {
  describe('Role Normalization', () => {
    it('should normalize valid roles correctly', () => {
      expect(normalizeRole('super_admin')).toBe(Role.SUPER_ADMIN);
      expect(normalizeRole('enterprise_admin')).toBe(Role.ENTERPRISE_ADMIN);
      expect(normalizeRole('admin')).toBe(Role.ADMIN);
      expect(normalizeRole('user')).toBe(Role.USER);
    });

    it('should normalize case-insensitive roles', () => {
      expect(normalizeRole('SUPER_ADMIN')).toBe(Role.SUPER_ADMIN);
      expect(normalizeRole('Enterprise-Admin')).toBe(Role.ENTERPRISE_ADMIN);
      expect(normalizeRole('ADMIN')).toBe(Role.ADMIN);
      expect(normalizeRole('USER')).toBe(Role.USER);
    });

    it('should normalize alias roles', () => {
      expect(normalizeRole('manager')).toBe(Role.ADMIN);
      expect(normalizeRole('viewer')).toBe(Role.USER);
      expect(normalizeRole('guest')).toBe(Role.USER);
    });

    it('should default to USER for invalid roles', () => {
      expect(normalizeRole('invalid')).toBe(Role.USER);
      expect(normalizeRole('')).toBe(Role.USER);
      expect(normalizeRole(null as any)).toBe(Role.USER);
      expect(normalizeRole(undefined as any)).toBe(Role.USER);
    });
  });

  describe('Permission Checking', () => {
    it('should grant super admin all permissions', () => {
      const allPermissions = Object.values(Permission);
      allPermissions.forEach(permission => {
        expect(hasPermission(Role.SUPER_ADMIN, permission)).toBe(true);
      });
    });

    it('should check enterprise admin permissions correctly', () => {
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.USER_CREATE)).toBe(true);
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.USER_DELETE)).toBe(true);
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.BILLING_UPDATE)).toBe(true);
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.PERMISSIONS_MANAGE)).toBe(true);
    });

    it('should check admin permissions correctly', () => {
      expect(hasPermission(Role.ADMIN, Permission.USER_READ)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.PLATFORM_CREATE)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.AI_AGENT_MANAGE)).toBe(true);
      
      // Admin should not have some enterprise-level permissions
      expect(hasPermission(Role.ADMIN, Permission.USER_DELETE)).toBe(false);
      expect(hasPermission(Role.ADMIN, Permission.BILLING_UPDATE)).toBe(false);
      expect(hasPermission(Role.ADMIN, Permission.PERMISSIONS_MANAGE)).toBe(false);
    });

    it('should check user permissions correctly', () => {
      expect(hasPermission(Role.USER, Permission.MESSAGE_CREATE)).toBe(true);
      expect(hasPermission(Role.USER, Permission.AI_ASSISTANT_USE)).toBe(true);
      expect(hasPermission(Role.USER, Permission.SETTINGS_READ)).toBe(true);
      
      // User should not have admin permissions
      expect(hasPermission(Role.USER, Permission.USER_CREATE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.PLATFORM_DELETE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.BILLING_READ)).toBe(false);
    });
  });

  describe('Multiple Permission Checking', () => {
    const userPermissions = [
      Permission.MESSAGE_CREATE,
      Permission.MESSAGE_READ,
      Permission.AI_ASSISTANT_USE
    ];

    const adminPermissions = [
      Permission.USER_CREATE,
      Permission.USER_DELETE,
      Permission.PLATFORM_MANAGE // This doesn't exist, should be false
    ] as Permission[];

    it('should check if role has any of the specified permissions', () => {
      expect(hasAnyPermission(Role.USER, userPermissions)).toBe(true);
      expect(hasAnyPermission(Role.USER, adminPermissions)).toBe(false);
      expect(hasAnyPermission(Role.ADMIN, adminPermissions)).toBe(true); // USER_CREATE and USER_DELETE
    });

    it('should check if role has all specified permissions', () => {
      expect(hasAllPermissions(Role.USER, userPermissions)).toBe(true);
      expect(hasAllPermissions(Role.USER, adminPermissions)).toBe(false);
      expect(hasAllPermissions(Role.ENTERPRISE_ADMIN, adminPermissions)).toBe(true);
    });
  });

  describe('Resource Access Control', () => {
    it('should allow super admin to access any resource', () => {
      const context = {
        userId: 'user-123',
        role: Role.SUPER_ADMIN,
        organizationId: 'org-123'
      };

      expect(canAccessResource(context.role, 'user', 'delete')).toBe(true);
      expect(canAccessResource(context.role, 'billing', 'update')).toBe(true);
      expect(canAccessResource(context.role, 'platform', 'create')).toBe(true);
    });

    it('should check resource access based on permissions', () => {
      const adminContext = { userId: 'user-123', role: Role.ADMIN };
      const userContext = { userId: 'user-456', role: Role.USER };

      expect(canAccessResource(adminContext.role, 'user', 'read')).toBe(true);
      expect(canAccessResource(adminContext.role, 'user', 'delete')).toBe(false);
      expect(canAccessResource(userContext.role, 'message', 'create')).toBe(true);
      expect(canAccessResource(userContext.role, 'user', 'create')).toBe(false);
    });
  });

  describe('Access Control with Ownership', () => {
    it('should allow super admin to access any resource regardless of ownership', () => {
      const context = {
        userId: 'admin-123',
        role: Role.SUPER_ADMIN,
        organizationId: 'org-123'
      };

      expect(checkAccess(context, Permission.USER_DELETE, 'other-user-456')).toBe(true);
      expect(checkAccess(context, Permission.PLATFORM_DELETE, 'platform-789')).toBe(true);
    });

    it('should allow enterprise admin to access resources in their org', () => {
      const context = {
        userId: 'enterprise-admin-123',
        role: Role.ENTERPRISE_ADMIN,
        organizationId: 'org-123'
      };

      expect(checkAccess(context, Permission.USER_DELETE, 'user-456')).toBe(true);
      expect(checkAccess(context, Permission.PLATFORM_DELETE, 'platform-789')).toBe(true);
    });

    it('should allow users to access their own resources', () => {
      const context = {
        userId: 'user-123',
        role: Role.USER,
        organizationId: 'org-123'
      };

      expect(checkAccess(context, Permission.MESSAGE_UPDATE, 'user-123')).toBe(true);
      expect(checkAccess(context, Permission.MESSAGE_READ, 'user-123')).toBe(true);
    });

    it('should prevent users from accessing others resources for admin actions', () => {
      const context = {
        userId: 'user-123',
        role: Role.USER,
        organizationId: 'org-123'
      };

      expect(checkAccess(context, Permission.USER_DELETE, 'other-user-456')).toBe(false);
      expect(checkAccess(context, Permission.PLATFORM_DELETE, 'platform-789')).toBe(false);
    });

    it('should allow admins to access others resources for admin actions', () => {
      const context = {
        userId: 'admin-123',
        role: Role.ADMIN,
        organizationId: 'org-123'
      };

      // Admin can access others' resources for certain operations (only if they have the permission)
      expect(checkAccess(context, Permission.MESSAGE_DELETE, 'user-456')).toBe(true);
      // Admin cannot delete users since they don't have USER_DELETE permission
      expect(checkAccess(context, Permission.USER_DELETE, 'user-456')).toBe(false);
    });
  });

  describe('Role Permissions Retrieval', () => {
    it('should return all permissions for super admin', () => {
      const permissions = getRolePermissions(Role.SUPER_ADMIN);
      expect(permissions).toEqual(Object.values(Permission));
    });

    it('should return correct permissions for each role', () => {
      const userPerms = getRolePermissions(Role.USER);
      const adminPerms = getRolePermissions(Role.ADMIN);
      const enterprisePerms = getRolePermissions(Role.ENTERPRISE_ADMIN);

      expect(userPerms.length).toBeLessThan(adminPerms.length);
      expect(adminPerms.length).toBeLessThan(enterprisePerms.length);
      expect(enterprisePerms.length).toBeLessThanOrEqual(getRolePermissions(Role.SUPER_ADMIN).length);

      expect(userPerms).toContain(Permission.MESSAGE_CREATE);
      expect(userPerms).not.toContain(Permission.USER_CREATE);

      expect(adminPerms).toContain(Permission.USER_CREATE);
      expect(adminPerms).not.toContain(Permission.BILLING_UPDATE);

      expect(enterprisePerms).toContain(Permission.BILLING_UPDATE);
      expect(enterprisePerms).toContain(Permission.PERMISSIONS_MANAGE);
    });
  });

  describe('RBAC Error Handling', () => {
    it('should create RBACError with correct properties', () => {
      const error = new RBACError('Test message', Permission.USER_CREATE, Role.USER);
      
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('RBACError');
      expect(error.message).toBe('Test message');
      expect(error.permission).toBe(Permission.USER_CREATE);
      expect(error.role).toBe(Role.USER);
    });
  });

  describe('Permission Requirements', () => {
    it('should not throw when role has required permission', () => {
      expect(() => {
        requirePermission(Role.ADMIN, Permission.USER_READ);
      }).not.toThrow();
    });

    it('should throw RBACError when role lacks required permission', () => {
      expect(() => {
        requirePermission(Role.USER, Permission.USER_CREATE);
      }).toThrow(RBACError);
    });

    it('should throw error with correct message', () => {
      try {
        requirePermission(Role.USER, Permission.USER_CREATE);
        fail('Expected RBACError to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(RBACError);
        expect((error as RBACError).message).toContain('Role user does not have permission user:create');
      }
    });
  });
});
