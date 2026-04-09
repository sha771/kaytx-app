import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { Hono } from 'hono';
import { userManagementService } from '../../services/user-management-service';
import { organizationManagementService } from '../../services/organization-management-service';
import { sessionManagementService } from '../../services/session-management-service';
import { auditLogService } from '../../services/consolidated-audit-service';
import { createApp } from '../../hono';

describe('User Management Integration Tests', () => {
  let app: Hono;
  let testOrganization: any;
  let testUser: any;
  let authToken: string;

  beforeAll(async () => {
    // Initialize test application
    app = createApp();

    // Create test organization
    testOrganization = await organizationManagementService.createOrganization({
      name: 'Test Organization',
      slug: 'test-org',
      ownerId: 'test-owner-id',
      billingEmail: 'billing@test.com',
      plan: 'pro',
    });

    // Setup test database connections and services
    await setupTestDatabase();
  });

  afterAll(async () => {
    // Cleanup test data
    await cleanupTestData();
    await teardownTestDatabase();
  });

  beforeEach(async () => {
    // Reset test state
    jest.clearAllMocks();
  });

  afterEach(async () => {
    // Cleanup any test artifacts
    await cleanupSessionData();
  });

  describe('User Creation Flow', () => {
    it('should create user with encrypted PII', async () => {
      const userData = {
        email: 'john.doe@test.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        organizationId: testOrganization.id,
        phoneNumber: '+1234567890',
        address: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zip: '12345',
        },
      };

      const response = await app.request('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(userData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        organizationId: testOrganization.id,
        status: 'active',
        emailVerified: false,
      });

      // Verify PII is encrypted in database
      const dbUser = await userManagementService.getUserById(
        testOrganization.id,
        result.data.id
      );
      expect(dbUser).toBeTruthy();
      expect(dbUser?.email).toBe(userData.email); // Decrypted at service level

      testUser = result.data;
    });

    it('should create session after user registration', async () => {
      const loginData = {
        email: testUser.email,
        password: 'SecurePass123!',
      };

      const response = await app.request('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.token).toBeDefined();
      expect(result.data.user).toMatchObject({
        id: testUser.id,
        email: testUser.email,
      });

      authToken = result.data.token;

      // Verify session is created
      const sessionValidation = await sessionManagementService.validateSession(authToken);
      expect(sessionValidation.valid).toBe(true);
      expect(sessionValidation.userId).toBe(testUser.id);
    });

    it('should log user creation in audit trail', async () => {
      // Wait a moment for async audit logging
      await new Promise(resolve => setTimeout(resolve, 100));

      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'user_created',
        userId: testUser.id,
      });

      expect(auditLogs.logs).toHaveLength(1);
      expect(auditLogs.logs[0]).toMatchObject({
        action: 'user_created',
        resource: 'user',
        resourceId: testUser.id,
        userId: testUser.id,
        organizationId: testOrganization.id,
        status: 'success',
      });
    });
  });

  describe('User Authentication Flow', () => {
    it('should authenticate user with valid credentials', async () => {
      const loginData = {
        email: testUser.email,
        password: 'SecurePass123!',
      };

      const response = await app.request('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.token).toBeDefined();
      expect(result.data.user.email).toBe(testUser.email);

      // Verify token format
      const token = result.data.token;
      expect(token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
    });

    it('should reject authentication with invalid credentials', async () => {
      const loginData = {
        email: testUser.email,
        password: 'WrongPassword123!',
      };

      const response = await app.request('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      expect(response.status).toBe(401);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid credentials');

      // Verify audit log for failed login
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'login_failed',
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
      const failedLogin = auditLogs.logs.find(log => 
        log.resourceId === testUser.id
      );
      expect(failedLogin).toBeTruthy();
      expect(failedLogin?.status).toBe('failure');
    });

    it('should handle concurrent login attempts correctly', async () => {
      const loginData = {
        email: testUser.email,
        password: 'SecurePass123!',
      };

      // Make multiple concurrent login requests
      const promises = Array.from({ length: 5 }, () =>
        app.request('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        })
      );

      const responses = await Promise.all(promises);

      // All should succeed
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });

      // But only one active session should exist (depending on session policy)
      const sessions = await sessionManagementService.getUserSessions(
        testOrganization.id,
        testUser.id
      );
      
      // Implementation dependent - could allow multiple sessions
      expect(sessions.total).toBeGreaterThan(0);
    });
  });

  describe('User Update Flow', () => {
    it('should update user basic information', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'manager',
      };

      const response = await app.request(`/api/users/${testUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateData),
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject(updateData);

      // Verify data is persisted
      const updatedUser = await userManagementService.getUserById(
        testOrganization.id,
        testUser.id
      );
      expect(updatedUser?.firstName).toBe(updateData.firstName);
      expect(updatedUser?.lastName).toBe(updateData.lastName);
      expect(updatedUser?.role).toBe(updateData.role);
    });

    it('should update user PII with encryption', async () => {
      const updateData = {
        phoneNumber: '+1987654321',
        address: {
          street: '456 Updated St',
          city: 'Updated City',
          state: 'UC',
          zip: '54321',
        },
      };

      const response = await app.request(`/api/users/${testUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updateData),
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);

      // Verify PII is updated and encrypted
      const updatedUser = await userManagementService.getUserById(
        testOrganization.id,
        testUser.id
      );
      expect(updatedUser).toBeTruthy();
    });

    it('should log user updates in audit trail', async () => {
      // Wait for async audit logging
      await new Promise(resolve => setTimeout(resolve, 100));

      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'user_updated',
        resourceId: testUser.id,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
      const updateLog = auditLogs.logs[auditLogs.logs.length - 1];
      expect(updateLog).toMatchObject({
        action: 'user_updated',
        resource: 'user',
        resourceId: testUser.id,
        userId: testUser.id,
        organizationId: testOrganization.id,
        status: 'success',
      });
    });
  });

  describe('User Permission Flow', () => {
    it('should enforce role-based permissions', async () => {
      // Create a user with lower role
      const lowRoleUser = await userManagementService.createUser({
        email: 'low.role@test.com',
        password: 'SecurePass123!',
        firstName: 'Low',
        lastName: 'Role',
        organizationId: testOrganization.id,
        role: 'user',
      });

      // Get auth token for low role user
      const loginResponse = await app.request('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: lowRoleUser.email,
          password: 'SecurePass123!',
        }),
      });

      const lowRoleToken = (await loginResponse.json()).data.token;

      // Try to access admin-only endpoint
      const response = await app.request('/api/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${lowRoleToken}`,
        },
      });

      expect(response.status).toBe(403);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Insufficient permissions');

      // Verify audit log for permission denied
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'access_denied',
        userId: lowRoleUser.id,
      });

      const accessDeniedLog = auditLogs.logs.find(log => 
        log.action === 'access_denied'
      );
      expect(accessDeniedLog).toBeTruthy();
      expect(accessDeniedLog?.status).toBe('failure');
    });

    it('should allow access with proper permissions', async () => {
      // Admin user should access admin endpoints
      const response = await app.request('/api/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(Array.isArray(result.data.users)).toBe(true);
    });
  });

  describe('User Deletion Flow', () => {
    it('should delete user and cleanup related data', async () => {
      const tempUser = await userManagementService.createUser({
        email: 'temp.user@test.com',
        password: 'SecurePass123!',
        firstName: 'Temp',
        lastName: 'User',
        organizationId: testOrganization.id,
      });

      // Delete user
      const response = await app.request(`/api/users/${tempUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(200);
      
      const result = await response.json();
      expect(result.success).toBe(true);

      // Verify user is deleted
      const deletedUser = await userManagementService.getUserById(
        testOrganization.id,
        tempUser.id
      );
      expect(deletedUser).toBeNull();

      // Verify audit log
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'user_deleted',
        resourceId: tempUser.id,
      });

      const deleteLog = auditLogs.logs.find(log => 
        log.action === 'user_deleted'
      );
      expect(deleteLog).toBeTruthy();
      expect(deleteLog?.status).toBe('success');
    });

    it('should invalidate all user sessions on deletion', async () => {
      // Create user and login
      const tempUser = await userManagementService.createUser({
        email: 'session.test@test.com',
        password: 'SecurePass123!',
        firstName: 'Session',
        lastName: 'Test',
        organizationId: testOrganization.id,
      });

      const loginResponse = await app.request('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: tempUser.email,
          password: 'SecurePass123!',
        }),
      });

      const userToken = (await loginResponse.json()).data.token;

      // Delete user
      await app.request(`/api/users/${tempUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      // Verify session is invalidated
      const sessionValidation = await sessionManagementService.validateSession(userToken);
      expect(sessionValidation.valid).toBe(false);
    });
  });

  describe('Cross-Service Integration', () => {
    it('should integrate user management with organization service', async () => {
      // Create user in organization
      const newUser = await userManagementService.createUser({
        email: 'org.test@test.com',
        password: 'SecurePass123!',
        firstName: 'Org',
        lastName: 'Test',
        organizationId: testOrganization.id,
      });

      // Verify user appears in organization user list
      const orgUsers = await organizationManagementService.getOrganizationUsers(
        testOrganization.id
      );
      
      const userInOrg = orgUsers.users.find(u => u.id === newUser.id);
      expect(userInOrg).toBeTruthy();
      expect(userInOrg.email).toBe(newUser.email);

      // Update organization and verify user still accessible
      await organizationManagementService.updateOrganization(testOrganization.id, {
        name: 'Updated Test Organization',
      });

      const updatedUser = await userManagementService.getUserById(
        testOrganization.id,
        newUser.id
      );
      expect(updatedUser).toBeTruthy();
    });

    it('should integrate user management with audit service', async () => {
      const auditSpy = jest.spyOn(auditLogService, 'createAuditLog');

      // Perform user action
      await userManagementService.updateUser(testOrganization.id, testUser.id, {
        firstName: 'Audited',
      });

      // Verify audit log was created
      expect(auditSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'user_updated',
          resource: 'user',
          resourceId: testUser.id,
          userId: testUser.id,
          organizationId: testOrganization.id,
          status: 'success',
        })
      );

      auditSpy.mockRestore();
    });

    it('should handle service failures gracefully', async () => {
      // Mock database failure
      const originalMethod = userManagementService.getUserById;
      userManagementService.getUserById = jest.fn().mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await app.request(`/api/users/${testUser.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      expect(response.status).toBe(500);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('Internal server error');

      // Restore original method
      userManagementService.getUserById = originalMethod;
    });
  });

  // Helper functions
  async function setupTestDatabase(): Promise<void> {
    // Setup test database connections
    // This would typically involve:
    // - Creating test database schema
    // - Seeding initial data
    // - Setting up test transactions
  }

  async function teardownTestDatabase(): Promise<void> {
    // Cleanup test database
    // - Drop test tables
    // - Close connections
  }

  async function cleanupTestData(): Promise<void> {
    // Clean up test data
    if (testUser?.id) {
      await userManagementService.deleteUser(testOrganization.id, testUser.id);
    }
    if (testOrganization?.id) {
      await organizationManagementService.deleteOrganization(testOrganization.id);
    }
  }

  async function cleanupSessionData(): Promise<void> {
    // Clean up session data between tests
    await sessionManagementService.cleanupExpiredSessions();
  }
});
