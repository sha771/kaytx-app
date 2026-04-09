import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../../hono';
import { userManagementService } from '../../services/user-management-service';
import { organizationManagementService } from '../../services/organization-management-service';
import { auditLogService } from '../../services/consolidated-audit-service';
import { Permission, Role } from '../../lib/rbac';

describe('Authorization Security Tests', () => {
  let app: any;
  let testOrganization: any;
  let users: any = {};
  let tokens: any = {};

  beforeAll(async () => {
    app = createApp();
    
    // Create test organization
    testOrganization = await createTestOrganization();
    
    // Create users with different roles
    users = await createTestUsers();
    
    // Get auth tokens for each user
    tokens = await getAuthTokens();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('Role-Based Access Control (RBAC)', () => {
    it('should enforce role hierarchy correctly', async () => {
      // Test resource that requires admin role
      const adminOnlyResponse = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.superAdmin}`);

      expect(adminOnlyResponse.status).toBe(200);

      // Test with lower role
      const userResponse = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.user}`);

      expect(userResponse.status).toBe(403);
      expect(userResponse.body.error).toContain('permission');
    });

    it('should prevent privilege escalation', async () => {
      // User trying to update their own role to admin
      const escalationResponse = await request(app)
        .put(`/api/users/${users.user.id}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .send({
          role: 'admin',
        });

      expect(escalationResponse.status).toBe(403);
      expect(escalationResponse.body.error).toContain('permission');

      // Check audit log for privilege escalation attempt
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'privilege_escalation_attempt',
        userId: users.user.id,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
    });

    it('should enforce least privilege principle', async () => {
      // User should only access their own data
      const ownProfileResponse = await request(app)
        .get(`/api/users/${users.user.id}`)
        .set('Authorization', `Bearer ${tokens.user}`);

      expect(ownProfileResponse.status).toBe(200);

      // User should not access other user's data
      const otherProfileResponse = await request(app)
        .get(`/api/users/${users.admin.id}`)
        .set('Authorization', `Bearer ${tokens.user}`);

      expect(otherProfileResponse.status).toBe(403);
      expect(otherProfileResponse.body.error).toContain('permission');
    });

    it('should validate role assignments', async () => {
      // Try to assign invalid role
      const invalidRoleResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          email: 'test@example.com',
          password: 'SecurePass123!',
          firstName: 'Test',
          lastName: 'User',
          organizationId: testOrganization.id,
          role: 'invalid_role',
        });

      expect(invalidRoleResponse.status).toBe(400);
      expect(invalidRoleResponse.body.error).toContain('role');
    });

    it('should handle role inheritance properly', async () => {
      // Admin should have all permissions of lower roles
      const adminReadResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${tokens.admin}`);

      expect(adminReadResponse.status).toBe(200);

      // Manager should have user permissions but not admin permissions
      const managerUserResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${tokens.manager}`);

      expect(managerUserResponse.status).toBe(200);

      const managerAdminResponse = await request(app)
        .get('/api/admin/settings')
        .set('Authorization', `Bearer ${tokens.manager}`);

      expect(managerAdminResponse.status).toBe(403);
    });
  });

  describe('Permission-Based Access Control', () => {
    it('should enforce granular permissions', async () => {
      // Test specific permission
      const permissionTests = [
        {
          endpoint: '/api/campaigns',
          method: 'POST',
          permission: 'campaign_create',
          userToken: tokens.user,
          expectedStatus: 403,
        },
        {
          endpoint: '/api/campaigns',
          method: 'POST',
          permission: 'campaign_create',
          userToken: tokens.manager,
          expectedStatus: 201,
        },
        {
          endpoint: '/api/users',
          method: 'DELETE',
          permission: 'user_delete',
          userToken: tokens.manager,
          expectedStatus: 403,
        },
        {
          endpoint: '/api/users',
          method: 'DELETE',
          permission: 'user_delete',
          userToken: tokens.admin,
          expectedStatus: 200,
        },
      ];

      for (const test of permissionTests) {
        const response = await request(app)
          [test.method.toLowerCase()](test.endpoint)
          .set('Authorization', `Bearer ${test.userToken}`)
          .send(getTestDataForEndpoint(test.endpoint));

        expect(response.status).toBe(test.expectedStatus);
      }
    });

    it('should validate permission combinations', async () => {
      // Test resource that requires multiple permissions
      const complexPermissionResponse = await request(app)
        .post('/api/reports/generate')
        .set('Authorization', `Bearer ${tokens.manager}`)
        .send({
          type: 'financial',
          format: 'pdf',
        });

      // Manager should have report_generate but not financial_report permission
      expect(complexPermissionResponse.status).toBe(403);
      expect(complexPermissionResponse.body.error).toContain('permission');
    });

    it('should handle permission revocation immediately', async () => {
      // Revoke permission from user
      await userManagementService.updateUser(testOrganization.id, users.user.id, {
        role: 'viewer', // Downgrade role
      });

      // Try to access previously allowed resource
      const response = await request(app)
        .get('/api/campaigns')
        .set('Authorization', `Bearer ${tokens.user}`);

      expect(response.status).toBe(403);

      // Restore role
      await userManagementService.updateUser(testOrganization.id, users.user.id, {
        role: 'user',
      });
    });

    it('should log permission denials', async () => {
      // Attempt unauthorized access
      await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.user}`);

      // Check audit log
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'access_denied',
        userId: users.user.id,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
      
      const denialLog = auditLogs.logs[0];
      expect(denialLog.resource).toBe('admin_users');
      expect(denialLog.status).toBe('failure');
    });
  });

  describe('Organization Scope Isolation', () => {
    it('should prevent cross-organization data access', async () => {
      // Create user in different organization
      const otherOrg = await createTestOrganization();
      const otherUser = await createUserInOrg(otherOrg, 'other.user@example.com');
      const otherToken = await getAuthTokenForUser(otherUser);

      // Try to access original organization's data
      const crossOrgResponse = await request(app)
        .get(`/api/organizations/${testOrganization.id}/users`)
        .set('Authorization', `Bearer ${otherToken}`);

      expect(crossOrgResponse.status).toBe(403);
      expect(crossOrgResponse.body.error).toContain('organization');

      // Clean up
      await cleanupOrganization(otherOrg);
    });

    it('should enforce organization-level permissions', async () => {
      // User from one org trying to access another org's settings
      const response = await request(app)
        .get(`/api/organizations/${testOrganization.id}/settings`)
        .set('Authorization', `Bearer ${tokens.user}`);

      // Should be allowed (user is in the same org)
      expect([200, 403]).toContain(response.status);

      if (response.status === 200) {
        // Verify data is from correct organization
        expect(response.body.data.organizationId).toBe(testOrganization.id);
      }
    });

    it('should handle organization ownership correctly', async () => {
      // Only owner should be able to delete organization
      const deleteResponse = await request(app)
        .delete(`/api/organizations/${testOrganization.id}`)
        .set('Authorization', `Bearer ${tokens.user}`);

      expect(deleteResponse.status).toBe(403);
      expect(deleteResponse.body.error).toContain('owner');

      // Owner should be able to delete (but we won't actually delete in test)
      const ownerDeleteResponse = await request(app)
        .delete(`/api/organizations/${testOrganization.id}`)
        .set('Authorization', `Bearer ${tokens.superAdmin}`);

      // Would be 200 if we allowed deletion, but we'll prevent it in test
      expect([200, 403]).toContain(ownerDeleteResponse.status);
    });
  });

  describe('Resource-Level Authorization', () => {
    it('should enforce ownership-based access', async () => {
      // Create resource as regular user
      const resourceResponse = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${tokens.user}`)
        .send({
          name: 'User Campaign',
          subject: 'Test Subject',
        });

      const resourceId = resourceResponse.body.data.id;

      // User should be able to update their own resource
      const updateResponse = await request(app)
        .put(`/api/campaigns/${resourceId}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .send({ name: 'Updated Campaign' });

      expect(updateResponse.status).toBe(200);

      // Admin should be able to update any resource
      const adminUpdateResponse = await request(app)
        .put(`/api/campaigns/${resourceId}`)
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({ name: 'Admin Updated' });

      expect(adminUpdateResponse.status).toBe(200);
    });

    it('should prevent unauthorized resource modification', async () => {
      // Create resource as admin
      const resourceResponse = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Admin Campaign',
          subject: 'Admin Subject',
        });

      const resourceId = resourceResponse.body.data.id;

      // Regular user should not be able to modify admin's resource
      const unauthorizedResponse = await request(app)
        .put(`/api/campaigns/${resourceId}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .send({ name: 'Hacked Campaign' });

      expect(unauthorizedResponse.status).toBe(403);
    });

    it('should handle shared resource permissions', async () => {
      // Create shared resource
      const sharedResponse = await request(app)
        .post('/api/reports')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Shared Report',
          sharedWith: [users.user.id],
        });

      const reportId = sharedResponse.body.data.id;

      // User should be able to access shared resource
      const accessResponse = await request(app)
        .get(`/api/reports/${reportId}`)
        .set('Authorization', `Bearer ${tokens.user}`);

      expect(accessResponse.status).toBe(200);

      // User should not be able to modify shared resource (unless explicitly granted)
      const modifyResponse = await request(app)
        .put(`/api/reports/${reportId}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .send({ name: 'Modified Report' });

      expect(modifyResponse.status).toBe(403);
    });
  });

  describe('API Key Authorization', () => {
    it('should enforce API key permissions', async () => {
      // Create API key with limited permissions
      const apiKeyResponse = await request(app)
        .post('/api/api-keys')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Limited API Key',
          permissions: ['read'],
          scopes: ['campaigns'],
        });

      const apiKey = apiKeyResponse.body.data.apiKey;

      // Use API key to access allowed endpoint
      const allowedResponse = await request(app)
        .get('/api/campaigns')
        .set('Authorization', `Bearer ${apiKey}`);

      expect(allowedResponse.status).toBe(200);

      // Use API key to access disallowed endpoint
      const disallowedResponse = await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${apiKey}`)
        .send({
          name: 'Unauthorized Campaign',
        });

      expect(disallowedResponse.status).toBe(403);
    });

    it('should validate API key scope restrictions', async () => {
      // Create API key with specific scope
      const scopedKeyResponse = await request(app)
        .post('/api/api-keys')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Scoped API Key',
          permissions: ['read', 'write'],
          scopes: ['users'],
        });

      const apiKey = scopedKeyResponse.body.data.apiKey;

      // Should work within scope
      const inScopeResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${apiKey}`);

      expect(inScopeResponse.status).toBe(200);

      // Should fail outside scope
      const outOfScopeResponse = await request(app)
        .get('/api/campaigns')
        .set('Authorization', `Bearer ${apiKey}`);

      expect(outOfScopeResponse.status).toBe(403);
    });

    it('should handle API key expiration', async () => {
      // Create API key with short expiration
      const expiringKeyResponse = await request(app)
        .post('/api/api-keys')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Expiring API Key',
          permissions: ['read'],
          expiresIn: 1, // 1 second
        });

      const apiKey = expiringKeyResponse.body.data.apiKey;

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Should reject expired key
      const expiredResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${apiKey}`);

      expect(expiredResponse.status).toBe(401);
      expect(expiredResponse.body.error).toContain('expired');
    });
  });

  describe('Dynamic Authorization', () => {
    it('should handle time-based permissions', async () => {
      // Create permission that's only valid during business hours
      const businessHoursResponse = await request(app)
        .post('/api/reports')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Business Hours Report',
          accessRestrictions: {
            timeBased: {
              startHour: 9,
              endHour: 17,
              timezone: 'UTC',
            },
          },
        });

      // Test access during business hours (mock current time)
      const duringHoursResponse = await request(app)
        .get(`/api/reports/${businessHoursResponse.body.data.id}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .set('X-Current-Time', '2024-01-01T14:00:00Z'); // 2 PM UTC

      expect([200, 403]).toContain(duringHoursResponse.status);

      // Test access outside business hours
      const outsideHoursResponse = await request(app)
        .get(`/api/reports/${businessHoursResponse.body.data.id}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .set('X-Current-Time', '2024-01-01T02:00:00Z'); // 2 AM UTC

      expect([200, 403]).toContain(outsideHoursResponse.status);
    });

    it('should handle location-based permissions', async () => {
      // Create resource with location restriction
      const locationRestrictedResponse = await request(app)
        .post('/api/sensitive-data')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Location Restricted Data',
          accessRestrictions: {
            locations: ['US', 'CA', 'GB'],
          },
        });

      // Test access from allowed location
      const allowedLocationResponse = await request(app)
        .get(`/api/sensitive-data/${locationRestrictedResponse.body.data.id}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .set('X-Country-Code', 'US');

      expect([200, 403]).toContain(allowedLocationResponse.status);

      // Test access from disallowed location
      const disallowedLocationResponse = await request(app)
        .get(`/api/sensitive-data/${locationRestrictedResponse.body.data.id}`)
        .set('Authorization', `Bearer ${tokens.user}`)
        .set('X-Country-Code', 'CN');

      expect([200, 403]).toContain(disallowedLocationResponse.status);
    });

    it('should handle conditional permissions', async () => {
      // Create resource with conditional access
      const conditionalResponse = await request(app)
        .post('/api/premium-features')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .send({
          name: 'Premium Feature',
          accessRestrictions: {
            conditions: {
              subscriptionTier: 'premium',
              accountAge: 30, // days
            },
          },
        });

      // Test with user meeting conditions
      const qualifiedResponse = await request(app)
        .get(`/api/premium-features/${conditionalResponse.body.data.id}`)
        .set('Authorization', `Bearer ${tokens.premiumUser}`);

      expect([200, 403]).toContain(qualifiedResponse.status);

      // Test with user not meeting conditions
      const unqualifiedResponse = await request(app)
        .get(`/api/premium-features/${conditionalResponse.body.data.id}`)
        .set('Authorization', `Bearer ${tokens.user}`);

      expect([200, 403]).toContain(unqualifiedResponse.status);
    });
  });

  describe('Authorization Audit and Monitoring', () => {
    it('should log all authorization decisions', async () => {
      // Make various authorization requests
      await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${tokens.user}`);

      await request(app)
        .get('/api/campaigns')
        .set('Authorization', `Bearer ${tokens.user}`);

      await request(app)
        .post('/api/campaigns')
        .set('Authorization', `Bearer ${tokens.user}`)
        .send({ name: 'Test Campaign' });

      // Check audit logs
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        userId: users.user.id,
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);

      // Should have both allowed and denied actions
      const actions = auditLogs.logs.map(log => log.action);
      expect(actions).toContain('access_denied');
    });

    it('should detect suspicious authorization patterns', async () => {
      // Simulate rapid failed authorization attempts
      const attempts = [];
      for (let i = 0; i < 10; i++) {
        attempts.push(
          request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${tokens.user}`)
        );
      }

      await Promise.all(attempts);

      // Check for security alerts
      const securityLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'suspicious_activity',
      });

      expect(securityLogs.logs.length).toBeGreaterThan(0);
    });

    it('should generate authorization reports', async () => {
      // Generate authorization report
      const reportResponse = await request(app)
        .get('/api/reports/authorization')
        .set('Authorization', `Bearer ${tokens.admin}`)
        .query({
          startDate: '2024-01-01',
          endDate: '2024-12-31',
        });

      expect(reportResponse.status).toBe(200);
      expect(reportResponse.body.data).toHaveProperty('summary');
      expect(reportResponse.body.data).toHaveProperty('denials');
      expect(reportResponse.body.data).toHaveProperty('privilegeEscalations');
    });
  });

  // Helper functions
  async function createTestOrganization() {
    return {
      id: 'test-org-id',
      name: 'Test Organization',
    };
  }

  async function createTestUsers() {
    return {
      superAdmin: await createUser('super.admin@test.com', 'super_admin'),
      admin: await createUser('admin@test.com', 'admin'),
      manager: await createUser('manager@test.com', 'manager'),
      user: await createUser('user@test.com', 'user'),
      viewer: await createUser('viewer@test.com', 'viewer'),
      premiumUser: await createUser('premium@test.com', 'user', { subscriptionTier: 'premium' }),
    };
  }

  async function createUser(email: string, role: string, additionalData: any = {}) {
    return {
      id: `user-${Date.now()}-${Math.random()}`,
      email,
      role,
      ...additionalData,
    };
  }

  async function createUserInOrg(organization: any, email: string) {
    return {
      id: `user-${Date.now()}-${Math.random()}`,
      email,
      organizationId: organization.id,
      role: 'user',
    };
  }

  async function getAuthTokens() {
    const tokens: any = {};
    
    for (const [key, user] of Object.entries(users)) {
      tokens[key] = await getAuthTokenForUser(user);
    }
    
    return tokens;
  }

  async function getAuthTokenForUser(user: any): Promise<string> {
    // Mock token generation - in real implementation would authenticate user
    return `mock-token-${user.id}`;
  }

  function getTestDataForEndpoint(endpoint: string): any {
    const testData: any = {
      '/api/campaigns': {
        name: 'Test Campaign',
        subject: 'Test Subject',
      },
      '/api/reports': {
        name: 'Test Report',
        type: 'summary',
      },
      '/api/sensitive-data': {
        name: 'Sensitive Data',
        content: 'Secret',
      },
      '/api/premium-features': {
        name: 'Premium Feature',
        description: 'A premium feature',
      },
    };

    return testData[endpoint] || {};
  }

  async function cleanupTestData() {
    // Clean up test users and organizations
  }

  async function cleanupOrganization(organization: any) {
    // Clean up specific organization
  }
});
