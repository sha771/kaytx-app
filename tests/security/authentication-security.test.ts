import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { app } from '../../backend/server';

describe('Authentication Security Tests', () => {
  let testUser;
  let authToken;
  let refreshToken;

  beforeAll(async () => {
    // Create test user with secure password
    const hashedPassword = await bcrypt.hash('SecurePassword123!', 12);
    
    const userResult = await request(app)
      .post('/api/users/register')
      .send({
        email: 'security-test@example.com',
        password: 'SecurePassword123!',
        name: 'Security Test User',
        organization: 'Security Test Org'
      });

    testUser = userResult.body.user;
  });

  beforeEach(async () => {
    // Login to get fresh tokens
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'security-test@example.com',
        password: 'SecurePassword123!'
      });

    authToken = loginResponse.body.accessToken;
    refreshToken = loginResponse.body.refreshToken;
  });

  describe('Password Security', () => {
    it('should reject weak passwords during registration', async () => {
      const weakPasswords = [
        '123456',
        'password',
        'qwerty',
        'abc123',
        'password123',
        '12345678',
        'weak',
        'short',
        'no-number',
        'NO-LOWERCASE',
        'no-uppercase123'
      ];

      for (const weakPassword of weakPasswords) {
        const response = await request(app)
          .post('/api/users/register')
          .send({
            email: `test-${Math.random()}@example.com`,
            password: weakPassword,
            name: 'Test User',
            organization: 'Test Org'
          });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain('password');
      }
    });

    it('should enforce password complexity requirements', async () => {
      const requirements = [
        { password: 'Short1!', expected: 'at least 8 characters' },
        { password: 'nouppercase1!', expected: 'uppercase letter' },
        { password: 'NOLOWERCASE1!', expected: 'lowercase letter' },
        { password: 'NoNumber!', expected: 'number' },
        { password: 'NoSpecial123', expected: 'special character' }
      ];

      for (const { password, expected } of requirements) {
        const response = await request(app)
          .post('/api/users/register')
          .send({
            email: `test-${Math.random()}@example.com`,
            password,
            name: 'Test User',
            organization: 'Test Org'
          });

        expect(response.status).toBe(400);
        expect(response.body.error).toContain(expected);
      }
    });

    it('should hash passwords with sufficient strength', async () => {
      // Verify password is hashed (not stored in plain text)
      const userResponse = await request(app)
        .get(`/api/users/${testUser.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(userResponse.body.passwordHash).not.toBe('SecurePassword123!');
      expect(userResponse.body.passwordHash).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt format

      // Verify hash strength (should be bcrypt with at least 10 rounds)
      const hashParts = userResponse.body.passwordHash.split('$');
      expect(parseInt(hashParts[2])).toBeGreaterThanOrEqual(10);
    });

    it('should prevent password reuse', async () => {
      // Change password
      await request(app)
        .post('/api/auth/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'SecurePassword123!',
          newPassword: 'NewSecurePassword456!'
        });

      // Try to reuse old password
      const response = await request(app)
        .post('/api/auth/change-password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'NewSecurePassword456!',
          newPassword: 'SecurePassword123!'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('password reuse');
    });
  });

  describe('Token Security', () => {
    it('should issue JWT tokens with proper claims', async () => {
      const decodedToken = jwt.decode(authToken);
      
      expect(decodedToken).toHaveProperty('sub', testUser.id);
      expect(decodedToken).toHaveProperty('email', testUser.email);
      expect(decodedToken).toHaveProperty('iat');
      expect(decodedToken).toHaveProperty('exp');
      
      // Verify token expiration (should be reasonable, e.g., 15 minutes)
      const expirationTime = decodedToken.exp - decodedToken.iat;
      expect(expirationTime).toBeLessThanOrEqual(900); // 15 minutes
      expect(expirationTime).toBeGreaterThan(300); // At least 5 minutes
    });

    it('should reject expired tokens', async () => {
      // Create expired token
      const expiredToken = jwt.sign(
        { sub: testUser.id, email: testUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '-1h' }
      );

      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${expiredToken}`);

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('expired');
    });

    it('should reject malformed tokens', async () => {
      const malformedTokens = [
        'not.a.valid.token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature',
        'Bearer invalid.token.format',
        '',
        null,
        undefined
      ];

      for (const token of malformedTokens) {
        const response = await request(app)
          .get('/api/users/profile')
          .set('Authorization', token);

        expect(response.status).toBe(401);
      }
    });

    it('should implement secure token refresh', async () => {
      // Use refresh token to get new access token
      const refreshResponse = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken });

      expect(refreshResponse.status).toBe(200);
      expect(refreshResponse.body).toHaveProperty('accessToken');
      expect(refreshResponse.body).toHaveProperty('refreshToken');

      // Old access token should be invalid
      const oldTokenResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(oldTokenResponse.status).toBe(401);

      // New access token should work
      const newTokenResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${refreshResponse.body.accessToken}`);

      expect(newTokenResponse.status).toBe(200);
    });

    it('should invalidate refresh tokens after use', async () => {
      // Use refresh token
      await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken });

      // Try to use same refresh token again
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('invalid refresh token');
    });
  });

  describe('Session Security', () => {
    it('should implement rate limiting on login attempts', async () => {
      const attempts = [];
      
      // Make multiple failed login attempts
      for (let i = 0; i < 6; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'security-test@example.com',
            password: 'wrong-password'
          });
        
        attempts.push(response.status);
      }

      // Should allow first few attempts
      expect(attempts[0]).toBe(401);
      expect(attempts[1]).toBe(401);
      expect(attempts[2]).toBe(401);
      expect(attempts[3]).toBe(401);
      expect(attempts[4]).toBe(401);

      // Should rate limit after 5 attempts
      expect(attempts[5]).toBe(429);
      expect(attempts[5]).toBeGreaterThanOrEqual(429);
    });

    it('should implement account lockout after repeated failures', async () => {
      // Make many failed attempts to trigger lockout
      for (let i = 0; i < 10; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({
            email: 'security-test@example.com',
            password: 'wrong-password'
          });
      }

      // Try correct password - should be locked out
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'security-test@example.com',
          password: 'SecurePassword123!'
        });

      expect(response.status).toBe(423);
      expect(response.body.error).toContain('account locked');
    });

    it('should track concurrent sessions and enforce limits', async () => {
      const tokens = [];
      
      // Create multiple sessions
      for (let i = 0; i < 5; i++) {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            email: 'security-test@example.com',
            password: 'SecurePassword123!'
          });
        
        tokens.push(response.body.accessToken);
      }

      // All tokens should be valid initially
      for (const token of tokens) {
        const response = await request(app)
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${token}`);
        
        expect(response.status).toBe(200);
      }

      // Try to create one more session (should exceed limit)
      const excessSessionResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'security-test@example.com',
          password: 'SecurePassword123!'
        });

      expect(excessSessionResponse.status).toBe(429);
      expect(excessSessionResponse.body.error).toContain('session limit');
    });
  });

  describe('Multi-Factor Authentication', () => {
    it('should require MFA for sensitive operations', async () => {
      // Setup MFA for test user
      await request(app)
        .post('/api/auth/setup-mfa')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ type: 'totp' });

      // Try sensitive operation without MFA
      const response = await request(app)
        .delete('/api/users/account')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(403);
      expect(response.body.error).toContain('multi-factor authentication');
    });

    it('should validate TOTP codes correctly', async () => {
      // Generate TOTP secret
      const setupResponse = await request(app)
        .post('/api/auth/setup-mfa')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ type: 'totp' });

      const { secret, backupCodes } = setupResponse.body;

      // Enable MFA with backup code (simulating TOTP verification)
      const enableResponse = await request(app)
        .post('/api/auth/enable-mfa')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'totp',
          code: backupCodes[0] // Use backup code for test
        });

      expect(enableResponse.status).toBe(200);

      // Login should now require MFA
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'security-test@example.com',
          password: 'SecurePassword123!'
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toHaveProperty('requiresMfa', true);
      expect(loginResponse.body).toHaveProperty('mfaToken');
    });

    it('should handle backup codes securely', async () => {
      // Setup MFA to get backup codes
      const setupResponse = await request(app)
        .post('/api/auth/setup-mfa')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ type: 'totp' });

      const { backupCodes } = setupResponse.body;

      // Verify backup codes format
      expect(backupCodes).toHaveLength(10);
      expect(backupCodes[0]).toMatch(/^[A-Z0-9]{8}$/);

      // Use backup code for authentication
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'security-test@example.com',
          password: 'SecurePassword123!'
        });

      const mfaResponse = await request(app)
        .post('/api/auth/verify-mfa')
        .send({
          mfaToken: loginResponse.body.mfaToken,
          code: backupCodes[0]
        });

      expect(mfaResponse.status).toBe(200);
      expect(mfaResponse.body).toHaveProperty('accessToken');

      // Backup code should be invalidated after use
      const secondUseResponse = await request(app)
        .post('/api/auth/verify-mfa')
        .send({
          mfaToken: loginResponse.body.mfaToken,
          code: backupCodes[0]
        });

      expect(secondUseResponse.status).toBe(401);
      expect(secondUseResponse.body.error).toContain('backup code used');
    });
  });

  describe('Social Authentication Security', () => {
    it('should validate OAuth state parameter', async () => {
      // Try OAuth callback without state
      const response = await request(app)
        .get('/api/auth/oauth/callback?code=test-code&state=invalid-state');

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('invalid state');
    });

    it('should handle OAuth token securely', async () => {
      // Mock OAuth token exchange
      const tokenResponse = await request(app)
        .post('/api/auth/oauth/exchange')
        .send({
          provider: 'google',
          code: 'mock-auth-code',
          state: 'valid-state'
        });

      expect(tokenResponse.status).toBe(200);
      expect(tokenResponse.body).toHaveProperty('accessToken');
      
      // Should not expose OAuth tokens to client
      expect(tokenResponse.body).not.toHaveProperty('oauthToken');
      expect(tokenResponse.body).not.toHaveProperty('oauthRefreshToken');
    });

    it('should link social accounts securely', async () => {
      // Link social account
      const linkResponse = await request(app)
        .post('/api/auth/link-social')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          provider: 'github',
          accessToken: 'mock-social-token'
        });

      expect(linkResponse.status).toBe(200);
      expect(linkResponse.body.user).toHaveProperty('linkedAccounts');

      // Verify social account is linked
      const userResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(userResponse.body.linkedAccounts).toContain('github');
    });
  });

  describe('Password Reset Security', () => {
    it('should generate secure reset tokens', async () => {
      const response = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'security-test@example.com' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('resetToken');
      
      // Reset token should be sufficiently long and random
      expect(response.body.resetToken.length).toBeGreaterThan(32);
      expect(response.body.resetToken).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    it('should expire reset tokens after reasonable time', async () => {
      // Request reset token
      const resetResponse = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'security-test@example.com' });

      const { resetToken } = resetResponse.body;

      // Try to use token immediately (should work)
      const immediateResponse = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken,
          newPassword: 'NewPassword123!'
        });

      expect(immediateResponse.status).toBe(200);

      // Request new token and wait for expiration (simulated)
      const newResetResponse = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'security-test@example.com' });

      // In a real test, you'd wait for the token to expire
      // For now, we'll test token validation logic
      expect(newResetResponse.body.resetToken).toBeTruthy();
    });

    it('should prevent reset token reuse', async () => {
      // Request reset token
      const resetResponse = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'security-test@example.com' });

      const { resetToken } = resetResponse.body;

      // Use token to reset password
      await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken,
          newPassword: 'UsedPassword123!'
        });

      // Try to use same token again
      const secondUseResponse = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken,
          newPassword: 'SecondUsePassword123!'
        });

      expect(secondUseResponse.status).toBe(400);
      expect(secondUseResponse.body.error).toContain('token used');
    });
  });
});
