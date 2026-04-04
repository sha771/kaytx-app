import { hasPermission, hasAnyPermission, hasAllPermissions, checkAccess, Role, Permission } from '../rbac';

describe('RBAC System', () => {
  describe('hasPermission', () => {
    it('should grant super admin all permissions', () => {
      expect(hasPermission(Role.SUPER_ADMIN, Permission.USER_DELETE)).toBe(true);
      expect(hasPermission(Role.SUPER_ADMIN, Permission.BILLING_UPDATE)).toBe(true);
    });

    it('should grant admin appropriate permissions', () => {
      expect(hasPermission(Role.ADMIN, Permission.USER_READ)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.USER_UPDATE)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.USER_CREATE)).toBe(false);
    });

    it('should restrict user permissions', () => {
      expect(hasPermission(Role.USER, Permission.MESSAGE_READ)).toBe(true);
      expect(hasPermission(Role.USER, Permission.USER_DELETE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.BILLING_UPDATE)).toBe(false);
    });

    it('should restrict guest permissions', () => {
      expect(hasPermission(Role.GUEST, Permission.MESSAGE_READ)).toBe(true);
      expect(hasPermission(Role.GUEST, Permission.MESSAGE_CREATE)).toBe(false);
    });
  });

  describe('hasAnyPermission', () => {
    it('should return true if user has any of the permissions', () => {
      expect(hasAnyPermission(Role.USER, [
        Permission.USER_DELETE,
        Permission.MESSAGE_READ,
      ])).toBe(true);
    });

    it('should return false if user has none of the permissions', () => {
      expect(hasAnyPermission(Role.USER, [
        Permission.USER_DELETE,
        Permission.BILLING_UPDATE,
      ])).toBe(false);
    });
  });

  describe('hasAllPermissions', () => {
    it('should return true if user has all permissions', () => {
      expect(hasAllPermissions(Role.ADMIN, [
        Permission.USER_READ,
        Permission.MESSAGE_READ,
      ])).toBe(true);
    });

    it('should return false if user lacks any permission', () => {
      expect(hasAllPermissions(Role.USER, [
        Permission.MESSAGE_READ,
        Permission.USER_DELETE,
      ])).toBe(false);
    });
  });

  describe('checkAccess', () => {
    it('should allow super admin access to everything', () => {
      const context = {
        userId: 'admin1',
        role: Role.SUPER_ADMIN,
      };

      expect(checkAccess(context, Permission.USER_DELETE, 'user2')).toBe(true);
    });

    it('should restrict admin from deleting if not resource owner', () => {
      const context = {
        userId: 'manager1',
        role: Role.MANAGER,
      };

      expect(checkAccess(context, Permission.USER_DELETE, 'user2')).toBe(false);
    });

    it('should allow resource owner to access their own resources', () => {
      const context = {
        userId: 'user1',
        role: Role.USER,
      };

      expect(checkAccess(context, Permission.MESSAGE_UPDATE, 'user1')).toBe(true);
    });
  });
});
