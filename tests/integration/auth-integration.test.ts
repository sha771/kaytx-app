import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { setupTestDatabase, cleanupTestDatabase } from '../setup/integration.setup';
import { authService } from '../../backend/services/auth-service';
import { db } from '../../backend/db/connection';
import { organizations, users } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Authentication Integration Tests', () => {
  let postgresContainer: StartedTestContainer;
  let testDb: any;

  beforeAll(async () => {
    const setup = await setupTestDatabase();
    postgresContainer = setup.container;
    testDb = setup.db;
  });

  afterAll(async () => {
    await cleanupTestDatabase(postgresContainer);
  });

  beforeEach(async () => {
    await testDb.delete(users);
    await testDb.delete(organizations);
  });

  describe('User Registration and Login', () => {
    it('should complete full user registration flow', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'SecurePassword123!',
        firstName: 'John',
        lastName: 'Doe',
        organizationName: 'Test Organization'
      };

      // Register user
      const registrationResult = await authService.register(userData);
      expect(registrationResult.success).toBe(true);
      expect(registrationResult.user.email).toBe(userData.email);
      expect(registrationResult.user.organization.name).toBe(userData.organizationName);

      // Verify organization was created
      const organization = await testDb.select().from(organizations)
        .where(eq(organizations.id, registrationResult.user.organizationId))
        .then(rows => rows[0]);
      expect(organization.name).toBe(userData.organizationName);
      expect(organization.status).toBe('active');

      // Verify user was created with hashed password
      const user = await testDb.select().from(users)
        .where(eq(users.email, userData.email))
        .then(rows => rows[0]);
      expect(user.email).toBe(userData.email);
      expect(user.passwordHash).not.toBe(userData.password);
      expect(bcrypt.compareSync(userData.password, user.passwordHash)).toBe(true);

      // Login with registered user
      const loginResult = await authService.login({
        email: userData.email,
        password: userData.password
      });
      expect(loginResult.success).toBe(true);
      expect(loginResult.tokens.accessToken).toBeTruthy();
      expect(loginResult.tokens.refreshToken).toBeTruthy();
      expect(loginResult.user.email).toBe(userData.email);

      // Verify JWT tokens
      const decodedAccess = jwt.verify(loginResult.tokens.accessToken, process.env.JWT_SECRET!);
      const decodedRefresh = jwt.verify(loginResult.tokens.refreshToken, process.env.JWT_REFRESH_SECRET!);
      expect(decodedAccess.sub).toBe(user.id);
      expect(decodedRefresh.sub).toBe(user.id);
    });

    it('should handle login with invalid credentials', async () => {
      const userData = {
        email: 'invalid@example.com',
        password: 'WrongPassword123!'
      };

      const loginResult = await authService.login(userData);
      expect(loginResult.success).toBe(false);
      expect(loginResult.message).toContain('Invalid credentials');
    });

    it('should handle duplicate email registration', async () => {
      const userData = {
        email: 'duplicate@example.com',
        password: 'SecurePassword123!',
        firstName: 'Jane',
        lastName: 'Smith',
        organizationName: 'Duplicate Test Org'
      };

      // First registration
      const firstResult = await authService.register(userData);
      expect(firstResult.success).toBe(true);

      // Second registration with same email
      const secondResult = await authService.register(userData);
      expect(secondResult.success).toBe(false);
      expect(secondResult.message).toContain('already exists');
    });
  });

  describe('Token Management', () => {
    it('should refresh access tokens successfully', async () => {
      const userData = {
        email: 'refresh@example.com',
        password: 'SecurePassword123!',
        firstName: 'Refresh',
        lastName: 'User',
        organizationName: 'Refresh Test Org'
      };

      // Register and login
      await authService.register(userData);
      const loginResult = await authService.login({
        email: userData.email,
        password: userData.password
      });

      // Refresh token
      const refreshResult = await authService.refreshToken(loginResult.tokens.refreshToken);
      expect(refreshResult.success).toBe(true);
      expect(refreshResult.tokens.accessToken).toBeTruthy();
      expect(refreshResult.tokens.accessToken).not.toBe(loginResult.tokens.accessToken);

      // Verify new access token is valid
      const decodedNew = jwt.verify(refreshResult.tokens.accessToken, process.env.JWT_SECRET!);
      expect(decodedNew.sub).toBe(loginResult.user.id);
    });

    it('should reject invalid refresh tokens', async () => {
      const invalidRefreshToken = 'invalid.refresh.token';

      const refreshResult = await authService.refreshToken(invalidRefreshToken);
      expect(refreshResult.success).toBe(false);
      expect(refreshResult.message).toContain('Invalid token');
    });

    it('should handle token expiration', async () => {
      const userData = {
        email: 'expire@example.com',
        password: 'SecurePassword123!',
        firstName: 'Expire',
        lastName: 'User',
        organizationName: 'Expire Test Org'
      };

      await authService.register(userData);
      const loginResult = await authService.login({
        email: userData.email,
        password: userData.password
      });

      // Mock expired token
      const expiredToken = jwt.sign(
        { sub: loginResult.user.id, type: 'access' },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' }
      );

      const verifyResult = await authService.verifyToken(expiredToken);
      expect(verifyResult.success).toBe(false);
      expect(verifyResult.message).toContain('expired');
    });
  });

  describe('Multi-Organization Access', () => {
    it('should handle user belonging to multiple organizations', async () => {
      // Create first organization and user
      const firstOrg = await testDb.insert(organizations).values({
        id: 'org-first-123',
        name: 'First Organization',
        email: 'first@example.com',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      const user = await testDb.insert(users).values({
        id: 'user-multi-123',
        email: 'multi@example.com',
        passwordHash: bcrypt.hashSync('SecurePassword123!', 10),
        firstName: 'Multi',
        lastName: 'User',
        organizationId: firstOrg.id,
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Create second organization
      const secondOrg = await testDb.insert(organizations).values({
        id: 'org-second-123',
        name: 'Second Organization',
        email: 'second@example.com',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Add user to second organization
      await testDb.insert(users).values({
        id: 'user-multi-456',
        email: 'multi@example.com',
        passwordHash: user.passwordHash,
        firstName: 'Multi',
        lastName: 'User',
        organizationId: secondOrg.id,
        role: 'member',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Get user organizations
      const organizationsResult = await authService.getUserOrganizations(user.id);
      expect(organizationsResult.success).toBe(true);
      expect(organizationsResult.organizations).toHaveLength(2);
      expect(organizationsResult.organizations.map((org: any) => org.name)).toContain('First Organization');
      expect(organizationsResult.organizations.map((org: any) => org.name)).toContain('Second Organization');
    });

    it('should enforce role-based access control', async () => {
      const organization = await testDb.insert(organizations).values({
        id: 'org-rbac-123',
        name: 'RBAC Test Organization',
        email: 'rbac@example.com',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Create admin user
      const adminUser = await testDb.insert(users).values({
        id: 'user-admin-123',
        email: 'admin@example.com',
        passwordHash: bcrypt.hashSync('SecurePassword123!', 10),
        firstName: 'Admin',
        lastName: 'User',
        organizationId: organization.id,
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Create member user
      const memberUser = await testDb.insert(users).values({
        id: 'user-member-123',
        email: 'member@example.com',
        passwordHash: bcrypt.hashSync('SecurePassword123!', 10),
        firstName: 'Member',
        lastName: 'User',
        organizationId: organization.id,
        role: 'member',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning().then(rows => rows[0]);

      // Test admin permissions
      const adminPermissions = await authService.checkPermissions(adminUser.id, organization.id, ['read', 'write', 'delete']);
      expect(adminPermissions.success).toBe(true);
      expect(adminPermissions.permissions.read).toBe(true);
      expect(adminPermissions.permissions.write).toBe(true);
      expect(adminPermissions.permissions.delete).toBe(true);

      // Test member permissions
      const memberPermissions = await authService.checkPermissions(memberUser.id, organization.id, ['read', 'write', 'delete']);
      expect(memberPermissions.success).toBe(true);
      expect(memberPermissions.permissions.read).toBe(true);
      expect(memberPermissions.permissions.write).toBe(false);
      expect(memberPermissions.permissions.delete).toBe(false);
    });
  });

  describe('Security Features', () => {
    it('should handle password reset flow', async () => {
      const userData = {
        email: 'reset@example.com',
        password: 'SecurePassword123!',
        firstName: 'Reset',
        lastName: 'User',
        organizationName: 'Reset Test Org'
      };

      // Register user
      await authService.register(userData);

      // Request password reset
      const resetRequestResult = await authService.requestPasswordReset(userData.email);
      expect(resetRequestResult.success).toBe(true);
      expect(resetRequestResult.resetToken).toBeTruthy();

      // Reset password
      const newPassword = 'NewSecurePassword123!';
      const resetResult = await authService.resetPassword(resetRequestResult.resetToken, newPassword);
      expect(resetResult.success).toBe(true);

      // Login with new password
      const loginResult = await authService.login({
        email: userData.email,
        password: newPassword
      });
      expect(loginResult.success).toBe(true);

      // Login with old password should fail
      const oldLoginResult = await authService.login({
        email: userData.email,
        password: userData.password
      });
      expect(oldLoginResult.success).toBe(false);
    });

    it('should handle account lockout after failed attempts', async () => {
      const userData = {
        email: 'lockout@example.com',
        password: 'SecurePassword123!',
        firstName: 'Lockout',
        lastName: 'User',
        organizationName: 'Lockout Test Org'
      };

      await authService.register(userData);

      // Attempt login with wrong password multiple times
      for (let i = 0; i < 5; i++) {
        const result = await authService.login({
          email: userData.email,
          password: 'WrongPassword'
        });
        expect(result.success).toBe(false);
      }

      // 6th attempt should trigger lockout
      const lockoutResult = await authService.login({
        email: userData.email,
        password: 'WrongPassword'
      });
      expect(lockoutResult.success).toBe(false);
      expect(lockoutResult.message).toContain('locked');

      // Even correct password should fail during lockout
      const correctPasswordResult = await authService.login({
        email: userData.email,
        password: userData.password
      });
      expect(correctPasswordResult.success).toBe(false);
      expect(correctPasswordResult.message).toContain('locked');
    });

    it('should validate password strength', async () => {
      const weakPasswords = [
        '123',
        'password',
        'qwerty',
        'abc123',
        'password123'
      ];

      for (const weakPassword of weakPasswords) {
        const validation = await authService.validatePasswordStrength(weakPassword);
        expect(validation.isValid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
      }

      const strongPasswords = [
        'SecurePassword123!',
        'MyStr0ng!P@ssw0rd',
        'Complex#Password789',
        'Very$ecureP@ssw0rd123'
      ];

      for (const strongPassword of strongPasswords) {
        const validation = await authService.validatePasswordStrength(strongPassword);
        expect(validation.isValid).toBe(true);
        expect(validation.errors).toHaveLength(0);
      }
    });
  });

  describe('Session Management', () => {
    it('should handle concurrent sessions', async () => {
      const userData = {
        email: 'concurrent@example.com',
        password: 'SecurePassword123!',
        firstName: 'Concurrent',
        lastName: 'User',
        organizationName: 'Concurrent Test Org'
      };

      await authService.register(userData);

      // Create multiple sessions
      const sessions = [];
      for (let i = 0; i < 3; i++) {
        const loginResult = await authService.login({
          email: userData.email,
          password: userData.password
        });
        sessions.push(loginResult.tokens);
      }

      // All sessions should be valid
      for (const session of sessions) {
        const verifyResult = await authService.verifyToken(session.accessToken);
        expect(verifyResult.success).toBe(true);
      }

      // Logout from one session
      const logoutResult = await authService.logout(sessions[0].refreshToken);
      expect(logoutResult.success).toBe(true);

      // Other sessions should remain valid
      for (let i = 1; i < sessions.length; i++) {
        const verifyResult = await authService.verifyToken(sessions[i].accessToken);
        expect(verifyResult.success).toBe(true);
      }
    });

    it('should handle logout from all devices', async () => {
      const userData = {
        email: 'logoutall@example.com',
        password: 'SecurePassword123!',
        firstName: 'LogoutAll',
        lastName: 'User',
        organizationName: 'LogoutAll Test Org'
      };

      await authService.register(userData);

      // Create multiple sessions
      const sessions = [];
      for (let i = 0; i < 3; i++) {
        const loginResult = await authService.login({
          email: userData.email,
          password: userData.password
        });
        sessions.push(loginResult.tokens);
      }

      // Logout from all devices
      const logoutAllResult = await authService.logoutAll(userData.email);
      expect(logoutAllResult.success).toBe(true);

      // All sessions should be invalid
      for (const session of sessions) {
        const verifyResult = await authService.verifyToken(session.accessToken);
        expect(verifyResult.success).toBe(false);
      }
    });
  });
});
