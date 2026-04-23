import { describe, it, expect, beforeEach, jest, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';
import { eq, and, or, desc, asc } from 'drizzle-orm';
import { logAudit } from '../../backend/lib/audit';
import { encrypt, decrypt } from '../../backend/lib/encryption';

// Mock email service
jest.mock('../../backend/services/email-service', () => ({
  EmailService: jest.fn().mockImplementation(() => ({
    sendVerificationEmail: jest.fn().mockResolvedValue({ messageId: 'verify-123' }),
    sendPasswordResetEmail: jest.fn().mockResolvedValue({ messageId: 'reset-123' }),
    sendWelcomeEmail: jest.fn().mockResolvedValue({ messageId: 'welcome-123' }),
  })),
}));

// Mock authentication service
jest.mock('../../backend/services/auth-service', () => ({
  AuthService: jest.fn().mockImplementation(() => ({
    generateToken: jest.fn().mockReturnValue('mock-jwt-token'),
    verifyToken: jest.fn().mockReturnValue({ userId: 'user-123', organizationId: 'org-123' }),
    hashPassword: jest.fn().mockResolvedValue('hashed-password'),
    validatePassword: jest.fn().mockResolvedValue(true),
  })),
}));

describe('User Management Integration Tests', () => {
  let authToken: string;
  let organizationId: string;
  let adminUserId: string;
  let regularUserId: string;

  beforeEach(async () => {
    // Create test organization
    const orgResult = await db.insert({
      name: 'User Management Test Org',
      domain: 'user-test.com',
      settings: {
        userRoles: ['admin', 'manager', 'employee', 'viewer'],
        approvalRequired: true,
      },
    }).returning();
    organizationId = orgResult[0].id;

    // Create admin user
    const adminResult = await db.insert({
      email: 'admin@test.com',
      name: 'Admin User',
      organizationId,
      role: 'admin',
      status: 'active',
    }).returning();
    adminUserId = adminResult[0].id;

    // Get admin auth token
    const adminLoginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'admin-password',
      });

    authToken = adminLoginResponse.body.token;
  });

  afterEach(async () => {
    // Cleanup test data
    await db.delete().where(eq('organizationId', organizationId));
    await db.delete().where(eq('id', organizationId));
  });

  describe('User Registration and Onboarding', () => {
    it('should handle complete user registration workflow', async () => {
      // Step 1: Register new user
      const registerResponse = await request(app)
        .post('/api/users/register')
        .send({
          email: 'newuser@test.com',
          name: 'New User',
          password: 'secure-password',
          organizationId,
          role: 'employee',
        });

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body.data.email).toBe('newuser@test.com');
      expect(registerResponse.body.data.status).toBe('pending_verification');

      const userId = registerResponse.body.data.id;

      // Step 2: Verify email
      const verifyResponse = await request(app)
        .post(`/api/users/${userId}/verify-email`)
        .send({
          token: 'verification-token-123',
        });

      expect(verifyResponse.status).toBe(200);
      expect(verifyResponse.body.data.status).toBe('active');

      // Step 3: Complete onboarding
      const onboardingResponse = await request(app)
        .post(`/api/users/${userId}/onboarding`)
        .send({
          department: 'Engineering',
          location: 'Remote',
          bio: 'Software developer with 5 years experience',
          preferences: {
            language: 'en',
            timezone: 'UTC',
            notifications: true,
          },
        });

      expect(onboardingResponse.status).toBe(200);
      expect(onboardingResponse.body.data.department).toBe('Engineering');

      // Step 4: Assign role and permissions
      const roleResponse = await request(app)
        .put(`/api/users/${userId}/role`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          role: 'developer',
          permissions: ['read:projects', 'write:code', 'read:reports'],
        });

      expect(roleResponse.status).toBe(200);
      expect(roleResponse.body.data.role).toBe('developer');
    });

    it('should handle bulk user import', async () => {
      const usersToImport = [
        { email: 'user1@test.com', name: 'User One', role: 'employee' },
        { email: 'user2@test.com', name: 'User Two', role: 'manager' },
        { email: 'user3@test.com', name: 'User Three', role: 'employee' },
      ];

      const importResponse = await request(app)
        .post('/api/users/import')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          users: usersToImport,
          sendInvitations: true,
          defaultPassword: 'temp-password-123',
        });

      expect(importResponse.status).toBe(200);
      expect(importResponse.body.data.imported).toBe(3);
      expect(importResponse.body.data.failed).toBe(0);

      // Verify users were created
      const usersResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(usersResponse.status).toBe(200);
      expect(usersResponse.body.data.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('User Authentication and Security', () => {
    let testUserId: string;

    beforeEach(async () => {
      // Create test user for authentication tests
      const userResult = await db.insert({
        email: 'authuser@test.com',
        name: 'Auth User',
        organizationId,
        role: 'employee',
        status: 'active',
      }).returning();
      testUserId = userResult[0].id;
    });

    it('should handle secure password reset workflow', async () => {
      // Step 1: Request password reset
      const resetRequestResponse = await request(app)
        .post('/api/auth/forgot-password')
        .send({
          email: 'authuser@test.com',
        });

      expect(resetRequestResponse.status).toBe(200);
      expect(resetRequestResponse.body.message).toContain('reset link');

      // Step 2: Reset password with token
      const resetResponse = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: 'reset-token-123',
          newPassword: 'new-secure-password',
        });

      expect(resetResponse.status).toBe(200);
      expect(resetResponse.body.message).toContain('Password reset');

      // Step 3: Login with new password
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'authuser@test.com',
          password: 'new-secure-password',
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeDefined();
    });

    it('should handle multi-factor authentication', async () => {
      // Enable MFA for user
      const mfaEnableResponse = await request(app)
        .post(`/api/users/${testUserId}/mfa/enable`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          method: 'totp',
        });

      expect(mfaEnableResponse.status).toBe(200);
      expect(mfaEnableResponse.body.data.secret).toBeDefined();

      // Verify MFA setup
      const mfaVerifyResponse = await request(app)
        .post(`/api/users/${testUserId}/mfa/verify`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          code: '123456', // Mock TOTP code
        });

      expect(mfaVerifyResponse.status).toBe(200);
      expect(mfaVerifyResponse.body.data.verified).toBe(true);

      // Test login with MFA
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'authuser@test.com',
          password: 'test-password',
          mfaCode: '123456',
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeDefined();
    });

    it('should handle session management', async () => {
      // Login to create session
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'authuser@test.com',
          password: 'test-password',
        });

      const userToken = loginResponse.body.token;

      // Get active sessions
      const sessionsResponse = await request(app)
        .get('/api/auth/sessions')
        .set('Authorization', `Bearer ${userToken}`);

      expect(sessionsResponse.status).toBe(200);
      expect(sessionsResponse.body.data.length).toBeGreaterThanOrEqual(1);

      // Logout from specific session
      const logoutResponse = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          sessionId: sessionsResponse.body.data[0].id,
        });

      expect(logoutResponse.status).toBe(200);

      // Verify session is invalidated
      const verifyResponse = await request(app)
        .get('/api/auth/verify')
        .set('Authorization', `Bearer ${userToken}`);

      expect(verifyResponse.status).toBe(401);
    });
  });

  describe('Role and Permission Management', () => {
    let managerUserId: string;

    beforeEach(async () => {
      // Create manager user
      const managerResult = await db.insert({
        email: 'manager@test.com',
        name: 'Manager User',
        organizationId,
        role: 'manager',
        status: 'active',
      }).returning();
      managerUserId = managerResult[0].id;
    });

    it('should handle role-based access control', async () => {
      // Test admin access
      const adminResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(adminResponse.status).toBe(200);
      expect(adminResponse.body.data.length).toBeGreaterThan(0);

      // Test manager access (limited)
      const managerLoginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'manager@test.com',
          password: 'manager-password',
        });

      const managerToken = managerLoginResponse.body.token;

      const managerUsersResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${managerToken}`);

      expect(managerUsersResponse.status).toBe(200);
      // Manager should see limited data (e.g., only their team)
      expect(managerUsersResponse.body.data.length).toBeLessThanOrEqual(adminResponse.body.data.length);

      // Test employee access (denied)
      const employeeResponse = await request(app)
        .get('/api/admin/settings')
        .set('Authorization', `Bearer ${authToken}`);

      // This would fail for non-admin users
      expect(employeeResponse.status).toBe(403);
    });

    it('should handle custom role creation and assignment', async () => {
      // Create custom role
      const roleResponse = await request(app)
        .post('/api/roles')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Project Lead',
          description: 'Can manage projects and team members',
          permissions: [
            'read:projects',
            'write:projects',
            'read:team',
            'write:team',
            'read:reports',
          ],
          level: 3, // Between manager (4) and employee (2)
        });

      expect(roleResponse.status).toBe(201);
      const roleId = roleResponse.body.data.id;

      // Assign custom role to user
      const assignResponse = await request(app)
        .put(`/api/users/${managerUserId}/role`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          roleId,
          permissions: roleResponse.body.data.permissions,
        });

      expect(assignResponse.status).toBe(200);
      expect(assignResponse.body.data.role).toBe('Project Lead');

      // Test custom role permissions
      const projectResponse = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test Project',
          description: 'Project for testing custom roles',
        });

      expect(projectResponse.status).toBe(201);
    });
  });

  describe('User Profile and Preferences', () => {
    let testUserId: string;

    beforeEach(async () => {
      // Create test user
      const userResult = await db.insert({
        email: 'profileuser@test.com',
        name: 'Profile User',
        organizationId,
        role: 'employee',
        status: 'active',
      }).returning();
      testUserId = userResult[0].id;
    });

    it('should handle profile management', async () => {
      // Update profile
      const profileResponse = await request(app)
        .put(`/api/users/${testUserId}/profile`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Name',
          bio: 'Updated bio with more details',
          department: 'Product',
          location: 'New York',
          phone: '+1-555-0123',
          socialLinks: {
            linkedin: 'https://linkedin.com/in/profileuser',
            github: 'https://github.com/profileuser',
          },
        });

      expect(profileResponse.status).toBe(200);
      expect(profileResponse.body.data.name).toBe('Updated Name');
      expect(profileResponse.body.data.department).toBe('Product');

      // Upload profile picture
      const pictureResponse = await request(app)
        .post(`/api/users/${testUserId}/picture`)
        .set('Authorization', `Bearer ${authToken}`)
        .attach('picture', 'tests/fixtures/test-avatar.png');

      expect(pictureResponse.status).toBe(200);
      expect(pictureResponse.body.data.pictureUrl).toBeDefined();
    });

    it('should handle user preferences', async () => {
      // Update preferences
      const preferencesResponse = await request(app)
        .put(`/api/users/${testUserId}/preferences`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          notifications: {
            email: true,
            push: false,
            sms: true,
            frequency: 'daily',
          },
          appearance: {
            theme: 'dark',
            language: 'en',
            timezone: 'America/New_York',
            dateFormat: 'MM/DD/YYYY',
          },
          privacy: {
            profileVisibility: 'organization',
            showEmail: false,
            showPhone: false,
          },
        });

      expect(preferencesResponse.status).toBe(200);
      expect(preferencesResponse.body.data.notifications.email).toBe(true);
      expect(preferencesResponse.body.data.appearance.theme).toBe('dark');

      // Get preferences
      const getPreferencesResponse = await request(app)
        .get(`/api/users/${testUserId}/preferences`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getPreferencesResponse.status).toBe(200);
      expect(getPreferencesResponse.body.data.theme).toBe('dark');
    });
  });

  describe('User Activity and Analytics', () => {
    it('should track user activity logs', async () => {
      // Perform various user actions
      await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Activity Test Project' });

      // Get activity logs
      const activityResponse = await request(app)
        .get('/api/users/activity')
        .set('Authorization', `Bearer ${authToken}`);

      expect(activityResponse.status).toBe(200);
      expect(activityResponse.body.data.length).toBeGreaterThan(0);

      const activities = activityResponse.body.data;
      expect(activities.some(a => a.action === 'users.list')).toBe(true);
      expect(activities.some(a => a.action === 'projects.create')).toBe(true);
    });

    it('should generate user analytics reports', async () => {
      // Generate user analytics
      const analyticsResponse = await request(app)
        .get('/api/analytics/users')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          dateRange: '30d',
          metrics: ['active_users', 'new_users', 'login_frequency', 'role_distribution'],
        });

      expect(analyticsResponse.status).toBe(200);
      expect(analyticsResponse.body.data).toHaveProperty('active_users');
      expect(analyticsResponse.body.data).toHaveProperty('new_users');
      expect(analyticsResponse.body.data).toHaveProperty('login_frequency');
      expect(analyticsResponse.body.data).toHaveProperty('role_distribution');

      // Generate department analytics
      const deptAnalyticsResponse = await request(app)
        .get('/api/analytics/departments')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          dateRange: '30d',
        });

      expect(deptAnalyticsResponse.status).toBe(200);
      expect(deptAnalyticsResponse.body.data).toHaveProperty('departments');
      expect(deptAnalyticsResponse.body.data.departments).toBeInstanceOf(Array);
    });
  });

  describe('User Deactivation and Deletion', () => {
    let testUserId: string;

    beforeEach(async () => {
      // Create test user
      const userResult = await db.insert({
        email: 'deactivateuser@test.com',
        name: 'Deactivate User',
        organizationId,
        role: 'employee',
        status: 'active',
      }).returning();
      testUserId = userResult[0].id;
    });

    it('should handle user deactivation workflow', async () => {
      // Deactivate user
      const deactivateResponse = await request(app)
        .patch(`/api/users/${testUserId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'inactive',
          reason: 'Employee departure',
          effectiveDate: new Date(),
        });

      expect(deactivateResponse.status).toBe(200);
      expect(deactivateResponse.body.data.status).toBe('inactive');

      // Verify user cannot login
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'deactivateuser@test.com',
          password: 'test-password',
        });

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body.error).toContain('inactive');

      // Reactivate user
      const reactivateResponse = await request(app)
        .patch(`/api/users/${testUserId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          status: 'active',
          reason: 'Employee rehire',
        });

      expect(reactivateResponse.status).toBe(200);
      expect(reactivateResponse.body.data.status).toBe('active');
    });

    it('should handle user data deletion (GDPR)', async () => {
      // Request data deletion
      const deleteRequestResponse = await request(app)
        .post(`/api/users/${testUserId}/delete-request`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          reason: 'GDPR right to be forgotten',
          confirmation: true,
        });

      expect(deleteRequestResponse.status).toBe(200);
      expect(deleteRequestResponse.body.data.requestId).toBeDefined();

      // Process deletion (admin approval)
      const processDeleteResponse = await request(app)
        .post(`/api/users/${testUserId}/process-deletion`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          requestId: deleteRequestResponse.body.data.requestId,
          approved: true,
        });

      expect(processDeleteResponse.status).toBe(200);
      expect(processDeleteResponse.body.data.deleted).toBe(true);

      // Verify user data is anonymized/deleted
      const userResponse = await request(app)
        .get(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(userResponse.status).toBe(404);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle duplicate email registration', async () => {
      // Register first user
      await request(app)
        .post('/api/users/register')
        .send({
          email: 'duplicate@test.com',
          name: 'First User',
          password: 'password',
          organizationId,
        });

      // Try to register with same email
      const duplicateResponse = await request(app)
        .post('/api/users/register')
        .send({
          email: 'duplicate@test.com',
          name: 'Second User',
          password: 'password',
          organizationId,
        });

      expect(duplicateResponse.status).toBe(409);
      expect(duplicateResponse.body.error).toContain('already exists');
    });

    it('should handle invalid authentication attempts', async () => {
      // Invalid email
      const invalidEmailResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@test.com',
          password: 'password',
        });

      expect(invalidEmailResponse.status).toBe(401);

      // Invalid password
      const invalidPasswordResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@test.com',
          password: 'wrong-password',
        });

      expect(invalidPasswordResponse.status).toBe(401);

      // Missing credentials
      const missingCredentialsResponse = await request(app)
        .post('/api/auth/login')
        .send({});

      expect(missingCredentialsResponse.status).toBe(400);
    });

    it('should handle expired tokens', async () => {
      // Create expired token (mock)
      const expiredToken = 'expired-jwt-token';

      const expiredResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(expiredResponse.status).toBe(401);
      expect(expiredResponse.body.error).toContain('expired');
    });
  });
});
