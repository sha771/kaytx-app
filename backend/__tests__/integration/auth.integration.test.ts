import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import app from '../../hono';
import { getDb } from '../../db/connection';

/**
 * Integration Tests for Authentication Routes
 * Tests the full flow from API request to database interaction
 */

describe('Auth Integration Tests', () => {
  let db: any;

  beforeAll(() => {
    db = getDb();
    console.log('🧪 Starting auth integration tests');
  });

  afterAll(() => {
    console.log('✅ Auth integration tests completed');
  });

  describe('POST /auth/register', () => {
    it('should register a new user with valid credentials', async () => {
      const response = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password: 'SecurePassword123!',
          firstName: 'Test',
          lastName: 'User',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('userId');
      expect(data).toHaveProperty('email');
    });

    it('should reject duplicate email addresses', async () => {
      const email = `duplicate-${Date.now()}@example.com`;
      
      // First registration
      await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password: 'Password123!', firstName: 'Test', lastName: 'User' }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Attempt duplicate
      const response = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password: 'Password123!', firstName: 'Test', lastName: 'User' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(409);
      const data = await response.json();
      expect(data.error).toContain('already exists');
    });

    it('should validate email format', async () => {
      const response = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: 'invalid-email',
          password: 'Password123!',
          firstName: 'Test',
          lastName: 'User',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      if (typeof data.error === 'string') {
        expect(data.error).toContain('email');
      } else {
        expect(data.error).toHaveProperty('code');
        expect(data.error).toHaveProperty('details');
        expect(String(data.error.code)).toContain('VALIDATION');
        expect(JSON.stringify(data.error.details)).toContain('email');
      }
    });

    it('should enforce password requirements', async () => {
      const response = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: `test-${Date.now()}@example.com`,
          password: 'weak', // Too short, no special chars
          firstName: 'Test',
          lastName: 'User',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      if (typeof data.error === 'string') {
        expect(data.error).toContain('password');
      } else {
        expect(data.error).toHaveProperty('details');
        expect(JSON.stringify(data.error.details)).toContain('password');
      }
    });
  });

  describe('POST /auth/login', () => {
    let testEmail: string;
    let testPassword: string = 'TestPassword123!';

    beforeAll(async () => {
      // Create test user
      testEmail = `login-test-${Date.now()}@example.com`;
      await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: testEmail,
          password: testPassword,
          firstName: 'Test',
          lastName: 'User',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    });

    it('should login with correct credentials', async () => {
      const response = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: testEmail, password: testPassword }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('token');
      expect(data).toHaveProperty('userId');
    });

    it('should reject incorrect password', async () => {
      const response = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: testEmail, password: 'WrongPassword123!' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toContain('Invalid credentials');
    });

    it('should reject non-existent user', async () => {
      const response = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: `nonexistent-${Date.now()}@example.com`,
          password: testPassword,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(401);
    });

    it('should enforce rate limiting after 5 failed attempts', async () => {
      const email = `ratelimit-${Date.now()}@example.com`;
      
      // Make 5 failed login attempts
      for (let i = 0; i < 5; i++) {
        await app.request('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password: 'WrongPassword' }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 6th attempt should be rate limited
      const response = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password: 'WrongPassword' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(429);
      const data = await response.json();
      expect(data.error).toContain('too many');
    });
  });

  describe('POST /auth/logout', () => {
    it('should invalidate session token', async () => {
      // Setup: Create user and get token
      const email = `logout-test-${Date.now()}@example.com`;
      const password = 'TestPassword123!';
      
      await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, firstName: 'Test', lastName: 'User' }),
        headers: { 'Content-Type': 'application/json' },
      });

      const loginRes = await app.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { token } = await loginRes.json();

      // Logout
      const logoutRes = await app.request('/auth/logout', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      expect(logoutRes.status).toBe(200);

      // Verify token is now invalid (should fail on protected route)
      const protectedRes = await app.request('/api/mfa/status', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      expect(protectedRes.status).toBe(401);
    });
  });

  describe('POST /auth/verify-email', () => {
    it('should verify email with correct verification code', async () => {
      const email = `verify-${Date.now()}@example.com`;
      
      // Register user (email not verified yet)
      const registerRes = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password: 'TestPassword123!',
          firstName: 'Test',
          lastName: 'User',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { userId, verificationCode } = await registerRes.json();

      // Verify email
      const verifyRes = await app.request('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ userId, verificationCode }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(verifyRes.status).toBe(200);
      const data = await verifyRes.json();
      expect(data.verified).toBe(true);
    });

    it('should reject incorrect verification code', async () => {
      const email = `verify-fail-${Date.now()}@example.com`;
      
      const registerRes = await app.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password: 'TestPassword123!',
          firstName: 'Test',
          lastName: 'User',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const { userId } = await registerRes.json();

      const verifyRes = await app.request('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ userId, verificationCode: 'WRONG-CODE' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(verifyRes.status).toBe(400);
      const data = await verifyRes.json();
      expect(data.error).toContain('Invalid');
    });
  });

  describe('POST /auth/reset-password', () => {
    it('should enforce stricter rate limiting on password reset', async () => {
      const email = `reset-${Date.now()}@example.com`;

      // Make 3 password reset requests
      for (let i = 0; i < 3; i++) {
        await app.request('/auth/reset-password', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 4th attempt should be rate limited (stricter than login)
      const response = await app.request('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(429);
    });
  });

  describe('CSRF Protection', () => {
    it('should require CSRF token for POST requests', async () => {
      const response = await app.request('/api/trpc/auth.logout', {
        method: 'POST',
        body: JSON.stringify({ name: 'New Name' }),
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.status).toBe(403);
      const data = await response.json();
      expect(data.error).toContain('CSRF');
    });

    it('should accept valid CSRF token', async () => {
      // Get CSRF token
      const tokenRes = await app.request('/csrf-token', {
        method: 'POST',
        headers: { 'x-session-id': 'test-session' },
      });

      const { csrfToken } = await tokenRes.json();

      // Use CSRF token in protected request
      const response = await app.request('/api/trpc/auth.logout', {
        method: 'POST',
        body: JSON.stringify({ name: 'New Name' }),
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
          'x-session-id': 'test-session',
        },
      });

      expect(response.status).not.toBe(403);
    });
  });
});
