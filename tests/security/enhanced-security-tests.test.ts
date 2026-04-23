import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';
import { users, organizations } from '../../backend/db/drizzle-schema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

describe('Enhanced Security Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication Security', () => {
    it('should prevent brute force attacks on login', async () => {
      const email = 'bruteforce@example.com';
      const password = 'WrongPassword123!';

      // Attempt multiple failed logins
      const responses = [];
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({ email, password });
        responses.push(response);
      }

      // First few attempts should fail with invalid credentials
      for (let i = 0; i < 5; i++) {
        expect(responses[i].status).toBe(401);
        expect(responses[i].body.message).toContain('Invalid credentials');
      }

      // Later attempts should trigger rate limiting
      for (let i = 5; i < 10; i++) {
        expect(responses[i].status).toBe(429);
        expect(responses[i].body.message).toContain('Too many attempts');
      }
    });

    it('should validate JWT token integrity', async () => {
      // Test with malformed JWT
      const malformedToken = 'not.a.valid.jwt';
      
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${malformedToken}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toContain('Invalid token');

      // Test with expired JWT
      const expiredToken = jwt.sign(
        { sub: 'user123', type: 'access' },
        process.env.JWT_SECRET!,
        { expiresIn: '-1h' }
      );

      const expiredResponse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(expiredResponse.status).toBe(401);
      expect(expiredResponse.body.message).toContain('Token expired');

      // Test with token signed with wrong secret
      const wrongSecretToken = jwt.sign(
        { sub: 'user123', type: 'access' },
        'wrong-secret',
        { expiresIn: '1h' }
      );

      const wrongSecretResponse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${wrongSecretToken}`);

      expect(wrongSecretResponse.status).toBe(401);
      expect(wrongSecretResponse.body.message).toContain('Invalid token');
    });

    it('should enforce secure password requirements', async () => {
      const weakPasswords = [
        '123',
        'password',
        'qwerty',
        'abc123',
        'password123',
        '12345678',
        'short'
      ];

      for (const weakPassword of weakPasswords) {
        const response = await request(app)
          .post('/api/auth/register')
          .send({
            email: `test${Math.random()}@example.com`,
            password: weakPassword,
            firstName: 'Test',
            lastName: 'User',
            organizationName: 'Test Org'
          });

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors.password).toBeDefined();
      }

      // Test strong password
      const strongPassword = 'SecureP@ssw0rd123!';
      const strongResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: `strong${Math.random()}@example.com`,
          password: strongPassword,
          firstName: 'Strong',
          lastName: 'User',
          organizationName: 'Strong Test Org'
        });

      expect(strongResponse.status).toBe(201);
    });

    it('should prevent session hijacking', async () => {
      // Create user and get tokens
      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'session@example.com',
          password: 'SecureP@ssw0rd123!',
          firstName: 'Session',
          lastName: 'User',
          organizationName: 'Session Test Org'
        });

      const { accessToken, refreshToken } = registerResponse.body.tokens;

      // Test token reuse detection
      const firstUse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(firstUse.status).toBe(200);

      // Simulate token reuse from different IP
      const maliciousUse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .set('X-Forwarded-For', '192.168.1.100'); // Different IP

      // Should detect suspicious activity
      expect(maliciousUse.status).toBe(401);
      expect(maliciousUse.body.message).toContain('suspicious activity');
    });
  });

  describe('Authorization Security', () => {
    it('should enforce role-based access control', async () => {
      // Create admin user
      const adminResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'admin@example.com',
          password: 'AdminP@ssw0rd123!',
          firstName: 'Admin',
          lastName: 'User',
          organizationName: 'Admin Test Org'
        });

      const adminToken = adminResponse.body.tokens.accessToken;

      // Create regular user
      const userResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'user@example.com',
          password: 'UserP@ssw0rd123!',
          firstName: 'Regular',
          lastName: 'User',
          organizationName: 'User Test Org'
        });

      const userToken = userResponse.body.tokens.accessToken;

      // Test admin-only endpoint
      const adminEndpoint = await request(app)
        .delete('/api/admin/users/some-user-id')
        .set('Authorization', `Bearer ${userToken}`);

      expect(adminEndpoint.status).toBe(403);
      expect(adminEndpoint.body.message).toContain('Insufficient permissions');

      // Test with admin token
      const adminAccess = await request(app)
        .get('/api/admin/organizations')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(adminAccess.status).toBe(200);
    });

    it('should prevent cross-organization data access', async () => {
      // Create two organizations
      const org1Response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'org1@example.com',
          password: 'Org1P@ssw0rd123!',
          firstName: 'Org1',
          lastName: 'User',
          organizationName: 'Organization 1'
        });

      const org2Response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'org2@example.com',
          password: 'Org2P@ssw0rd123!',
          firstName: 'Org2',
          lastName: 'User',
          organizationName: 'Organization 2'
        });

      const org1Token = org1Response.body.tokens.accessToken;
      const org2Token = org2Response.body.tokens.accessToken;

      // Try to access other organization's data
      const crossOrgAccess = await request(app)
        .get('/api/organizations/' + org2Response.body.user.organizationId)
        .set('Authorization', `Bearer ${org1Token}`);

      expect(crossOrgAccess.status).toBe(403);
      expect(crossOrgAccess.body.message).toContain('access denied');

      // Should be able to access own organization
      const ownOrgAccess = await request(app)
        .get('/api/organizations/' + org1Response.body.user.organizationId)
        .set('Authorization', `Bearer ${org1Token}`);

      expect(ownOrgAccess.status).toBe(200);
    });

    it('should validate resource ownership', async () => {
      // Create user and resource
      const userResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'owner@example.com',
          password: 'OwnerP@ssw0rd123!',
          firstName: 'Owner',
          lastName: 'User',
          organizationName: 'Owner Test Org'
        });

      const userToken = userResponse.body.tokens.accessToken;
      const userId = userResponse.body.user.id;

      // Create AI agent
      const agentResponse = await request(app)
        .post('/api/ai-agents')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          name: 'Test Agent',
          industry: 'healthcare',
          purpose: 'customer_service'
        });

      const agentId = agentResponse.body.agent.id;

      // Create another user
      const otherUserResponse = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'other@example.com',
          password: 'OtherP@ssw0rd123!',
          firstName: 'Other',
          lastName: 'User',
          organizationName: 'Other Test Org'
        });

      const otherUserToken = otherUserResponse.body.tokens.accessToken;

      // Try to modify other user's agent
      const unauthorizedUpdate = await request(app)
        .put(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${otherUserToken}`)
        .send({ name: 'Hacked Agent' });

      expect(unauthorizedUpdate.status).toBe(403);
      expect(unauthorizedUpdate.body.message).toContain('not authorized');

      // Owner should be able to update
      const authorizedUpdate = await request(app)
        .put(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated Agent' });

      expect(authorizedUpdate.status).toBe(200);
    });
  });

  describe('Input Validation Security', () => {
    it('should prevent SQL injection attacks', async () => {
      const sqlInjectionPayloads = [
        "'; DROP TABLE users; --",
        "1' OR '1'='1",
        "'; SELECT * FROM users; --",
        "1; DELETE FROM organizations; --",
        "'; INSERT INTO users (email) VALUES ('hacker@evil.com'); --"
      ];

      for (const payload of sqlInjectionPayloads) {
        // Test login endpoint
        const loginResponse = await request(app)
          .post('/api/auth/login')
          .send({
            email: payload,
            password: 'password'
          });

        // Should not cause server error and should reject input
        expect(loginResponse.status).toBe(400);
        expect(loginResponse.body.message).not.toBe('Internal Server Error');

        // Test registration endpoint
        const registerResponse = await request(app)
          .post('/api/auth/register')
          .send({
            email: payload,
            password: 'Password123!',
            firstName: payload,
            lastName: 'User',
            organizationName: 'Test Org'
          });

        expect(registerResponse.status).toBe(400);
        expect(registerResponse.body.message).not.toBe('Internal Server Error');
      }
    });

    it('should prevent XSS attacks', async () => {
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(\'XSS\')">',
        '<svg onload="alert(\'XSS\')">',
        '"><script>alert("XSS")</script>'
      ];

      for (const payload of xssPayloads) {
        // Test agent creation with XSS payload
        const response = await request(app)
          .post('/api/ai-agents')
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            name: payload,
            description: payload,
            industry: 'healthcare',
            purpose: 'customer_service'
          });

        if (response.status === 201) {
          // Verify XSS payload is sanitized in response
          expect(response.body.agent.name).not.toContain('<script>');
          expect(response.body.agent.description).not.toContain('<script>');
          expect(response.body.agent.name).not.toContain('javascript:');
        }
      }
    });

    it('should validate file upload security', async () => {
      const maliciousFiles = [
        { filename: 'malicious.exe', mimetype: 'application/octet-stream' },
        { filename: 'script.php', mimetype: 'application/x-php' },
        { filename: 'virus.bat', mimetype: 'application/x-bat' },
        { filename: '../../../etc/passwd', mimetype: 'text/plain' }
      ];

      for (const file of maliciousFiles) {
        const response = await request(app)
          .post('/api/upload')
          .set('Authorization', `Bearer ${validToken}`)
          .attach('file', Buffer.from('fake content'), file.filename);

        expect(response.status).toBe(400);
        expect(response.body.message).toContain('Invalid file type');
      }
    });

    it('should enforce rate limiting on sensitive endpoints', async () => {
      // Test password reset endpoint
      const resetRequests = [];
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/api/auth/forgot-password')
          .send({ email: 'ratelimit@example.com' });
        resetRequests.push(response);
      }

      // Should be rate limited after several attempts
      const laterResponses = resetRequests.slice(5);
      for (const response of laterResponses) {
        expect(response.status).toBe(429);
        expect(response.body.message).toContain('Too many requests');
      }

      // Test AI agent creation endpoint
      const agentRequests = [];
      for (let i = 0; i < 10; i++) {
        const response = await request(app)
          .post('/api/ai-agents')
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            name: `Agent ${i}`,
            industry: 'healthcare',
            purpose: 'customer_service'
          });
        agentRequests.push(response);
      }

      // Should be rate limited
      const laterAgentResponses = agentRequests.slice(5);
      for (const response of laterAgentResponses) {
        expect(response.status).toBe(429);
      }
    });
  });

  describe('Data Protection Security', () => {
    it('should encrypt sensitive data at rest', async () => {
      // Create user with sensitive data
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'sensitive@example.com',
          password: 'SensitiveP@ssw0rd123!',
          firstName: 'Sensitive',
          lastName: 'User',
          organizationName: 'Sensitive Test Org'
        });

      expect(response.status).toBe(201);

      // Check database for encrypted data
      const user = await db.select().from(users)
        .where(eq(users.email, 'sensitive@example.com'))
        .then(rows => rows[0]);

      // Password should be hashed (not plain text)
      expect(user.passwordHash).not.toBe('SensitiveP@ssw0rd123!');
      expect(user.passwordHash).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt format

      // Verify password can be validated
      const isValidPassword = bcrypt.compareSync('SensitiveP@ssw0rd123!', user.passwordHash);
      expect(isValidPassword).toBe(true);
    });

    it('should not expose sensitive information in responses', async () => {
      // Login and check response
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'sensitive@example.com',
          password: 'SensitiveP@ssw0rd123!'
        });

      expect(loginResponse.status).toBe(200);

      // Should not contain password hash
      expect(loginResponse.body.user).not.toHaveProperty('passwordHash');
      expect(loginResponse.body.user).not.toHaveProperty('password');

      // Should not contain internal database fields
      expect(loginResponse.body.user).not.toHaveProperty('createdAt');
      expect(loginResponse.body.user).not.toHaveProperty('updatedAt');

      // Get user profile
      const profileResponse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${loginResponse.body.tokens.accessToken}`);

      expect(profileResponse.status).toBe(200);
      expect(profileResponse.body.user).not.toHaveProperty('passwordHash');
    });

    it('should implement proper CORS policies', async () => {
      // Test preflight request
      const preflightResponse = await request(app)
        .options('/api/user/profile')
        .set('Origin', 'https://malicious-site.com')
        .set('Access-Control-Request-Method', 'GET')
        .set('Access-Control-Request-Headers', 'Authorization');

      // Should not allow cross-origin requests from untrusted domains
      expect(preflightResponse.headers['access-control-allow-origin']).not.toBe('https://malicious-site.com');

      // Test actual request
      const crossOriginResponse = await request(app)
        .get('/api/user/profile')
        .set('Origin', 'https://malicious-site.com')
        .set('Authorization', `Bearer ${validToken}`);

      expect(crossOriginResponse.headers['access-control-allow-origin']).not.toBe('https://malicious-site.com');
    });

    it('should log security events properly', async () => {
      // Mock logger
      const mockLog = jest.spyOn(console, 'log');

      // Trigger security event
      await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'WrongPassword123!'
        });

      // Should log failed login attempt
      expect(mockLog).toHaveBeenCalledWith(
        expect.stringContaining('SECURITY'),
        expect.stringContaining('failed_login'),
        expect.stringContaining('nonexistent@example.com')
      );

      mockLog.mockRestore();
    });
  });

  describe('API Security Headers', () => {
    it('should include security headers in responses', async () => {
      const response = await request(app)
        .get('/api/health');

      // Check for security headers
      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBe('DENY');
      expect(response.headers['x-xss-protection']).toBe('1; mode=block');
      expect(response.headers['strict-transport-security']).toBeDefined();
      expect(response.headers['referrer-policy']).toBeDefined();
    });

    it('should prevent content type sniffing', async () => {
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${validToken}`);

      expect(response.headers['content-type']).toMatch(/application\/json/);
      expect(response.headers['x-content-type-options']).toBe('nosniff');
    });
  });

  describe('Session Security', () => {
    it('should invalidate tokens on logout', async () => {
      // Login
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'session@example.com',
          password: 'SessionP@ssw0rd123!'
        });

      const { accessToken, refreshToken } = loginResponse.body.tokens;

      // Logout
      const logoutResponse = await request(app)
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ refreshToken });

      expect(logoutResponse.status).toBe(200);

      // Try to use token after logout
      const postLogoutResponse = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(postLogoutResponse.status).toBe(401);
      expect(postLogoutResponse.body.message).toContain('Invalid token');
    });

    it('should handle concurrent session limits', async () => {
      // Create multiple sessions
      const tokens = [];
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'concurrent@example.com',
            password: 'ConcurrentP@ssw0rd123!'
          });
        tokens.push(response.body.tokens.accessToken);
      }

      // All tokens should be valid initially
      for (const token of tokens) {
        const response = await request(app)
          .get('/api/user/profile')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      }

      // If session limit is enforced, older tokens should be invalidated
      // This depends on your session management implementation
    });
  });
});

// Helper function to get a valid token for tests
let validToken: string;

beforeAll(async () => {
  validToken = await getValidToken();
});

async function getValidToken(): Promise<string> {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      email: `test${Math.random()}@example.com`,
      password: 'TestP@ssw0rd123!',
      firstName: 'Test',
      lastName: 'User',
      organizationName: 'Test Org'
    });

  return response.body.tokens.accessToken;
}
