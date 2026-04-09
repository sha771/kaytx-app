import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { 
  verifyPassword, 
  createSession, 
  validateSession, 
  revokeSession,
  generateToken,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashAccessToken,
  hashRefreshToken,
  validatePasswordStrength,
  hashPassword
} from '../../../backend/lib/auth';

import { db } from '../../../backend/db/connection';

// Mock the database connection
jest.mock('../../../backend/db/connection', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

// Mock the database schema
jest.mock('../../../backend/db/drizzle-schema', () => ({
  users: {},
  sessions: {},
}));

describe('Authentication - Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Token Generation and Verification', () => {
    it('should generate valid JWT tokens', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user',
        organizationId: 'org-123'
      };

      const token = generateToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should verify valid JWT tokens', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user',
        organizationId: 'org-123'
      };

      const token = generateToken(payload);
      const verified = verifyToken(token);

      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.email).toBe(payload.email);
      expect(verified?.role).toBe(payload.role);
      expect(verified?.organizationId).toBe(payload.organizationId);
    });

    it('should reject invalid JWT tokens', () => {
      const invalidTokens = [
        'invalid.token.here',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature',
        '',
        'not.a.jwt',
        'expired.token.here'
      ];

      invalidTokens.forEach(token => {
        const verified = verifyToken(token);
        expect(verified).toBeNull();
      });
    });

    it('should generate and verify refresh tokens', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user',
        organizationId: 'org-123'
      };

      const refreshToken = generateRefreshToken(payload);
      expect(refreshToken).toBeDefined();
      expect(typeof refreshToken).toBe('string');

      const verified = verifyRefreshToken(refreshToken);
      expect(verified).not.toBeNull();
      expect(verified?.userId).toBe(payload.userId);
    });
  });

  describe('Token Hashing', () => {
    it('should hash access tokens consistently', () => {
      const token = 'test-access-token';
      const hash1 = hashAccessToken(token);
      const hash2 = hashAccessToken(token);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/i); // 64 character hex string
    });

    it('should hash refresh tokens consistently', () => {
      const token = 'test-refresh-token';
      const hash1 = hashRefreshToken(token);
      const hash2 = hashRefreshToken(token);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/i); // 64 character hex string
    });

    it('should generate different hashes for different tokens', () => {
      const token1 = 'token-one';
      const token2 = 'token-two';

      const hash1 = hashAccessToken(token1);
      const hash2 = hashAccessToken(token2);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('Password Verification', () => {
    it('should verify correct passwords', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await hashPassword(password);

      const isValid = await verifyPassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect passwords', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hashedPassword = await hashPassword(password);

      const isValid = await verifyPassword(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });

    it('should handle password verification errors', async () => {
      const invalidHashes = [
        '',
        'invalid-hash',
        null as any,
        undefined as any
      ];

      for (const hash of invalidHashes) {
        const isValid = await verifyPassword('password', hash);
        expect(isValid).toBe(false);
      }
    });
  });

  describe('Session Management', () => {
    it('should create sessions with proper structure', async () => {
      const userId = 'user-123';
      
      // Mock database operations
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{ id: userId, email: 'test@example.com', role: 'user' }]),
          }),
        }),
      });
      
      const mockInsert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{}]),
        }),
      });

      (db.select as jest.Mock) = mockSelect;
      (db.insert as jest.Mock) = mockInsert;

      const session = await createSession(userId);
      
      expect(session).toBeDefined();
      expect(session.userId).toBe(userId);
      expect(session.token).toBeDefined();
      expect(session.refreshToken).toBeDefined();
      expect(session.expiresAt).toBeInstanceOf(Date);
      expect(session.refreshExpiresAt).toBeInstanceOf(Date);
    });

    it('should handle session creation for non-existent users', async () => {
      const userId = 'non-existent-user';
      
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      (db.select as jest.Mock) = mockSelect;

      await expect(createSession(userId)).rejects.toThrow('User not found');
    });

    it('should validate active sessions', async () => {
      const userId = 'user-123';
      const token = 'valid-token';
      
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'session-123',
              userId,
              token: hashAccessToken(token),
              expiresAt: new Date(Date.now() + 15 * 60 * 1000),
              refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }]),
          }),
        }),
      });

      (db.select as jest.Mock) = mockSelect;

      const result = await validateSession(token);
      
      expect(result.valid).toBe(true);
      expect(result.userId).toBe(userId);
    });

    it('should reject expired sessions', async () => {
      const token = 'expired-token';
      
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([{
              id: 'session-123',
              userId: 'user-123',
              token: hashAccessToken(token),
              expiresAt: new Date(Date.now() - 15 * 60 * 1000), // Expired
              refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }]),
          }),
        }),
      });

      (db.select as jest.Mock) = mockSelect;

      const result = await validateSession(token);
      
      expect(result.valid).toBe(false);
    });

    it('should reject invalid session tokens', async () => {
      const token = 'invalid-token';
      
      const mockSelect = jest.fn().mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]), // No session found
          }),
        }),
      });

      (db.select as jest.Mock) = mockSelect;

      const result = await validateSession(token);
      
      expect(result.valid).toBe(false);
    });
  });

  describe('Session Revocation', () => {
    it('should revoke sessions successfully', async () => {
      const sessionId = 'session-123';
      
      const mockDelete = jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      });

      (db.delete as jest.Mock) = mockDelete;

      await expect(revokeSession(sessionId)).resolves.not.toThrow();
    });

    it('should handle revocation of non-existent sessions', async () => {
      const sessionId = 'non-existent-session';
      
      const mockDelete = jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue({}),
      });

      (db.delete as jest.Mock) = mockDelete;

      await expect(revokeSession(sessionId)).resolves.not.toThrow();
    });
  });

  describe('Security Edge Cases', () => {
    it('should handle malformed tokens gracefully', () => {
      const malformedTokens = [
        '...',
        'a.b',
        'a.b.c.d',
        'a..c',
        '.b.c',
        'a.b.'
      ];

      malformedTokens.forEach(token => {
        const verified = verifyToken(token);
        expect(verified).toBeNull();
      });
    });

    it('should handle empty payloads', () => {
      const emptyPayload = {} as any;
      const token = generateToken(emptyPayload);
      const verified = verifyToken(token);

      expect(verified).not.toBeNull();
      expect(verified?.userId).toBeUndefined();
    });

    it('should handle very long passwords', async () => {
      const longPassword = 'A'.repeat(1000) + '1a!';
      const result = validatePasswordStrength(longPassword);
      
      // Should still be valid if it meets other criteria
      expect(result.errors).not.toContain('Password must be at least 8 characters long');
    });
  });
});
