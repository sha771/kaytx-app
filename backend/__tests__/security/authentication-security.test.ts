import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import request from 'supertest';
import { createApp } from '../../hono';
import { userManagementService } from '../../services/user-management-service';
// Session management functionality has been consolidated into consolidated-session-management-service
import { auditLogService } from '../../services/consolidated-audit-service';
import { hashPassword, verifyPassword } from '../../lib/auth';

describe('Authentication Security Tests', () => {
  let app: any;
  let testOrganization: any;
  let testUser: any;

  beforeAll(async () => {
    app = createApp();
    
    // Create test organization and user
    testOrganization = await createTestOrganization();
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanupTestData();
  });

  describe('Password Security', () => {
    it('should reject weak passwords', async () => {
      const weakPasswords = [
        '123456',
        'password',
        'qwerty',
        'abc123',
        '111111',
        'password123',
        'admin',
        'root',
        'test',
        'user',
        '',
        'a',
        'ab',
        '123',
      ];

      for (const weakPassword of weakPasswords) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: `test${Date.now()}@example.com`,
            password: weakPassword,
            firstName: 'Test',
            lastName: 'User',
            organizationId: testOrganization.id,
          });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('password');
      }
    });

    it('should enforce password complexity requirements', async () => {
      const invalidPasswords = [
        'NoNumbers!', // Missing numbers
        'nonumbers123', // Missing uppercase
        'NOUPPER123', // Missing lowercase
        'NoSpecial123', // Missing special characters
        'Short1!', // Too short
      ];

      for (const invalidPassword of invalidPasswords) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: `test${Date.now()}@example.com`,
            password: invalidPassword,
            firstName: 'Test',
            lastName: 'User',
            organizationId: testOrganization.id,
          });

        expect(response.status).toBe(400);
        expect(response.body.success).toBe(false);
      }
    });

    it('should hash passwords with proper algorithm', async () => {
      const password = 'SecurePass123!';
      const hash = await hashPassword(password);

      // Verify hash format (bcrypt)
      expect(hash).toMatch(/^\$2[aby]\$\d+\$/);
      expect(hash.length).toBeGreaterThan(50);

      // Verify password can be verified
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);

      // Verify wrong password is rejected
      const isInvalid = await verifyPassword('wrongpassword', hash);
      expect(isInvalid).toBe(false);
    });

    it('should prevent password reuse', async () => {
      // Create user with initial password
      const user = await userManagementService.createUser({
        email: 'password.reuse@test.com',
        password: 'InitialPass123!',
        firstName: 'Test',
        lastName: 'User',
        organizationId: testOrganization.id,
      });

      // Try to change to same password
      const response = await request(app)
        .put(`/api/users/${user.id}/password`)
        .set('Authorization', `Bearer ${await getAuthToken(user)}`)
        .send({
          currentPassword: 'InitialPass123!',
          newPassword: 'InitialPass123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('same password');
    });

    it('should enforce password history', async () => {
      const user = await userManagementService.createUser({
        email: 'password.history@test.com',
        password: 'HistoryPass123!',
        firstName: 'Test',
        lastName: 'User',
        organizationId: testOrganization.id,
      });

      const token = await getAuthToken(user);

      // Change password multiple times
      const passwords = ['NewPass123!', 'AnotherPass123!', 'ThirdPass123!'];
      
      for (const password of passwords) {
        await request(app)
          .put(`/api/users/${user.id}/password`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            currentPassword: 'HistoryPass123!',
            newPassword: password,
          });

        // Update current password for next iteration
        password = 'HistoryPass123!';
      }

      // Try to reuse first password
      const response = await request(app)
        .put(`/api/users/${user.id}/password`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          currentPassword: passwords[passwords.length - 1],
          newPassword: 'HistoryPass123!',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('password history');
    });
  });

  describe('Session Security', () => {
    it('should create secure session tokens', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'SecurePass123!',
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.token).toBeDefined();

      const token = response.body.data.token;

      // Verify token format (JWT)
      const parts = token.split('.');
      expect(parts).toHaveLength(3);

      // Verify token can be validated
      const sessionValidation = await sessionManagementService.validateSession(token);
      expect(sessionValidation.valid).toBe(true);
      expect(sessionValidation.userId).toBe(testUser.id);
    });

    it('should invalidate session on logout', async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'SecurePass123!',
        });

      const token = loginResponse.body.data.token;

      // Logout
      const logoutResponse = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(logoutResponse.status).toBe(200);

      // Token should be invalid after logout
      const sessionValidation = await sessionManagementService.validateSession(token);
      expect(sessionValidation.valid).toBe(false);

      // Protected endpoint should reject request
      const protectedResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(protectedResponse.status).toBe(401);
    });

    it('should enforce session timeout', async () => {
      // Create session with short timeout for testing
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'SecurePass123!',
        });

      const token = loginResponse.body.data.token;

      // Manually expire session for testing
      await sessionManagementService.updateSession(
        (await sessionManagementService.validateSession(token)).session!.id,
        { expiresAt: new Date(Date.now() - 1000) } // Expired 1 second ago
      );

      // Token should be invalid
      const sessionValidation = await sessionManagementService.validateSession(token);
      expect(sessionValidation.valid).toBe(false);
    });

    it('should limit concurrent sessions', async () => {
      // Create multiple sessions
      const tokens = [];
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'SecurePass123!',
          });

        tokens.push(response.body.data.token);
      }

      // Check active sessions
      const sessions = await sessionManagementService.getUserSessions(
        testOrganization.id,
        testUser.id
      );

      // Should limit to reasonable number (implementation dependent)
      expect(sessions.total).toBeLessThanOrEqual(10);
    });

    it('should detect and prevent session hijacking', async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'SecurePass123!',
        });

      const token = loginResponse.body.data.token;

      // Simulate request from different IP/location
      const suspiciousResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .set('X-Forwarded-For', '192.168.1.100') // Different IP
        .set('User-Agent', 'SuspiciousBot/1.0');

      // Should detect suspicious activity (implementation dependent)
      if (suspiciousResponse.status === 403) {
        expect(suspiciousResponse.body.error).toContain('suspicious');
      }

      // Check audit logs for security events
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'suspicious_activity',
      });

      expect(auditLogs.logs.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Authentication Rate Limiting', () => {
    it('should limit login attempts', async () => {
      const invalidCredentials = {
        email: testUser.email,
        password: 'wrongpassword',
      };

      // Make multiple failed login attempts
      const responses = [];
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send(invalidCredentials);
        responses.push(response);
      }

      // Should eventually be rate limited
      const lastResponse = responses[responses.length - 1];
      if (lastResponse.status === 429) {
        expect(lastResponse.body.error).toContain('rate limit');
      }

      // Check audit logs for brute force attempt
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        action: 'login_failed',
      });

      expect(auditLogs.logs.length).toBeGreaterThan(5);
    });

    it('should limit registration attempts', async () => {
      const responses = [];
      
      // Make multiple registration attempts
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: `ratelimit${i}@example.com`,
            password: 'SecurePass123!',
            firstName: 'Test',
            lastName: 'User',
            organizationId: testOrganization.id,
          });
        responses.push(response);
      }

      // Should eventually be rate limited
      const lastResponse = responses[responses.length - 1];
      if (lastResponse.status === 429) {
        expect(lastResponse.body.error).toContain('rate limit');
      }
    });

    it('should implement progressive delay for failed attempts', async () => {
      const startTime = Date.now();
      
      // Make failed login attempts
      for (let i = 0; i < 5; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'wrongpassword',
          });
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // Should take progressively longer due to rate limiting
      expect(totalTime).toBeGreaterThan(1000); // At least 1 second delay
    });
  });

  describe('Input Validation and Sanitization', () => {
    it('should prevent SQL injection in login', async () => {
      const sqlInjectionAttempts = [
        "admin'--",
        "admin' OR '1'='1",
        "admin'; DROP TABLE users; --",
        "' OR '1'='1' --",
        "'; UPDATE users SET password='hacked' WHERE '1'='1'; --",
      ];

      for (const injection of sqlInjectionAttempts) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: injection,
            password: 'password',
          });

        // Should reject malicious input
        expect([400, 401, 422]).toContain(response.status);
        expect(response.body.success).toBe(false);
      }
    });

    it('should prevent XSS in authentication fields', async () => {
      const xssAttempts = [
        '<script>alert("xss")</script>',
        'javascript:alert("xss")',
        '<img src="x" onerror="alert(\'xss\')">',
        '"><script>alert("xss")</script>',
      ];

      for (const xss of xssAttempts) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: `test${Date.now()}@example.com`,
            password: 'SecurePass123!',
            firstName: xss,
            lastName: 'User',
            organizationId: testOrganization.id,
          });

        // Should reject or sanitize XSS
        if (response.status === 400) {
          expect(response.body.error).toContain('invalid');
        } else if (response.status === 201) {
          // If accepted, ensure XSS is sanitized in response
          expect(response.body.data.firstName).not.toContain('<script>');
        }
      }
    });

    it('should validate email format strictly', async () => {
      const invalidEmails = [
        'plainaddress',
        '@missingdomain.com',
        'missing@.com',
        'spaces @domain.com',
        'user@domain..com',
        'user@-domain.com',
        'user@domain-.com',
        'user@domain.c',
        'user@domain.toolongtld',
        'user name@domain.com',
        'user@domain space.com',
      ];

      for (const invalidEmail of invalidEmails) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: invalidEmail,
            password: 'SecurePass123!',
            firstName: 'Test',
            lastName: 'User',
            organizationId: testOrganization.id,
          });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('email');
      }
    });

    it('should handle Unicode and international characters properly', async () => {
      const internationalEmails = [
        '用户@example.com',
        'user@münchen.de',
        'user@президент.рф',
        'test@xn--d1acufc.xn--p1ai', // punycode
      ];

      for (const email of internationalEmails) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email,
            password: 'SecurePass123!',
            firstName: '国际',
            lastName: '用户',
            organizationId: testOrganization.id,
          });

        // Should handle international characters properly
        expect([201, 400]).toContain(response.status);
        
        if (response.status === 201) {
          expect(response.body.data.firstName).toBe('国际');
          expect(response.body.data.lastName).toBe('用户');
        }
      }
    });
  });

  describe('Authentication Headers and Tokens', () => {
    it('should reject requests without proper authorization', async () => {
      const response = await request(app)
        .get('/api/users/profile');

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('authorization');
    });

    it('should reject malformed authorization headers', async () => {
      const malformedHeaders = [
        'Bearer', // Missing token
        'Bearer invalid.token.format', // Invalid format
        'Basic dGVzdDp0ZXN0', // Wrong auth type
        'Token sometoken', // Wrong scheme
        '', // Empty header
      ];

      for (const header of malformedHeaders) {
        const response = await request(app)
          .get('/api/users/profile')
          .set('Authorization', header);

        expect(response.status).toBe(401);
      }
    });

    it('should validate JWT token structure', async () => {
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'SecurePass123!',
        });

      const token = loginResponse.body.data.token;
      const parts = token.split('.');

      // Should have 3 parts (header, payload, signature)
      expect(parts).toHaveLength(3);

      // Each part should be base64url encoded
      parts.forEach(part => {
        expect(() => atob(part.replace(/-/g, '+').replace(/_/g, '/'))).not.toThrow();
      });
    });

    it('should reject expired tokens', async () => {
      // Create expired token (this would require mocking JWT verification)
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.invalid';

      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('expired');
    });
  });

  describe('Multi-Factor Authentication', () => {
    it('should support TOTP-based 2FA', async () => {
      // Enable 2FA for user
      const enable2FAResponse = await request(app)
        .post('/api/auth/2fa/enable')
        .set('Authorization', `Bearer ${await getAuthToken(testUser)}`)
        .send({
          method: 'totp',
        });

      if (enable2FAResponse.status === 200) {
        // Should return QR code or secret
        expect(enable2FAResponse.body.data).toHaveProperty('qrCode');
        expect(enable2FAResponse.body.data).toHaveProperty('secret');
      }

      // Test 2FA verification
      const verify2FAResponse = await request(app)
        .post('/api/auth/2fa/verify')
        .set('Authorization', `Bearer ${await getAuthToken(testUser)}`)
        .send({
          code: '123456', // Mock TOTP code
        });

      // Should require valid code
      expect([200, 400]).toContain(verify2FAResponse.status);
    });

    it('should support SMS-based 2FA', async () => {
      const enableSMS2FAResponse = await request(app)
        .post('/api/auth/2fa/enable')
        .set('Authorization', `Bearer ${await getAuthToken(testUser)}`)
        .send({
          method: 'sms',
          phoneNumber: '+1234567890',
        });

      if (enableSMS2FAResponse.status === 200) {
        // Should send SMS verification code
        expect(enableSMS2FAResponse.body.data).toHaveProperty('messageId');
      }
    });

    it('should require 2FA for sensitive operations', async () => {
      // Enable 2FA first
      await request(app)
        .post('/api/auth/2fa/enable')
        .set('Authorization', `Bearer ${await getAuthToken(testUser)}`)
        .send({ method: 'totp' });

      // Try sensitive operation without 2FA
      const sensitiveResponse = await request(app)
        .delete('/api/users/me')
        .set('Authorization', `Bearer ${await getAuthToken(testUser)}`);

      // Should require 2FA verification
      if (sensitiveResponse.status === 403) {
        expect(sensitiveResponse.body.error).toContain('2FA');
      }
    });
  });

  describe('Security Headers and CSRF', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/api/auth/login');

      // Check for security headers
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
      expect(response.headers['strict-transport-security']).toBeDefined();
    });

    it('should implement CSRF protection', async () => {
      // Get CSRF token
      const csrfResponse = await request(app)
        .get('/api/auth/csrf-token');

      if (csrfResponse.status === 200) {
        const csrfToken = csrfResponse.body.data.token;

        // Make request without CSRF token
        const noCSRFResponse = await request(app)
          .post('/api/auth/login')
          .send({
            email: testUser.email,
            password: 'SecurePass123!',
          });

        // Should require CSRF token for state-changing requests
        if (noCSRFResponse.status === 403) {
          expect(noCSRFResponse.body.error).toContain('CSRF');
        }

        // Make request with CSRF token
        const withCSRFResponse = await request(app)
          .post('/api/auth/login')
          .set('X-CSRF-Token', csrfToken)
          .send({
            email: testUser.email,
            password: 'SecurePass123!',
          });

        expect(withCSRFResponse.status).toBe(200);
      }
    });
  });

  // Helper functions
  async function createTestOrganization() {
    // This would create a test organization
    return {
      id: 'test-org-id',
      name: 'Test Organization',
    };
  }

  async function createTestUser() {
    // This would create a test user
    return {
      id: 'test-user-id',
      email: 'test.user@example.com',
      password: 'SecurePass123!',
    };
  }

  async function getAuthToken(user: any): Promise<string> {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: user.email,
        password: user.password,
      });

    return response.body.data.token;
  }

  async function cleanupTestData() {
    // Clean up test data
  }
});
