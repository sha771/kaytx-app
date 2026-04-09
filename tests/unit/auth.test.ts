import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';

// Now import the functions after setting up mocks
import { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  verifyToken,
  validateSession,
  createSession,
  refreshSession,
  hashAccessToken,
  hashRefreshToken,
  generateRefreshToken,
  revokeSession,
  revokeAllUserSessions,
  verifyRefreshToken,
  handleFailedLogin,
  resetFailedLoginAttempts,
  isAccountLocked,
  validatePasswordStrength,
  validateEmail,
  initiateSSO,
  verifySSOCallback,
  getSSOProviders,
  configureSSO
} from '../../backend/lib/auth';

// Set required environment variables before importing
process.env.JWT_SECRET = 'test-secret-key-for-jwt-signing';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret-key';

// Mock the database first - before any imports
const mockDb = {
  select: jest.fn().mockImplementation(() => ({
    from: jest.fn().mockImplementation(() => ({
      where: jest.fn().mockImplementation(() => ({
        limit: jest.fn().mockResolvedValue([]),
        orderBy: jest.fn().mockResolvedValue([]),
      })),
      limit: jest.fn().mockResolvedValue([]),
      orderBy: jest.fn().mockResolvedValue([]),
    })),
  })),
  insert: jest.fn().mockImplementation(() => ({
    values: jest.fn().mockImplementation(() => ({
      returning: jest.fn().mockResolvedValue([]),
    })),
  })),
  update: jest.fn().mockImplementation(() => ({
    set: jest.fn().mockImplementation(() => ({
      where: jest.fn().mockResolvedValue([]),
    })),
  })),
  delete: jest.fn().mockImplementation(() => ({
    where: jest.fn().mockResolvedValue([]),
  })),
  execute: jest.fn().mockResolvedValue([]),
} as any;

// Helper to cast mocks
const asMock = (fn: any) => fn as jest.Mock;

// Mock the connection module completely
jest.mock('../../backend/db/connection', () => ({
  db: mockDb,
  pgDb: mockDb,
}));

// Mock the drizzle schema
jest.mock('../../backend/db/drizzle-schema', () => ({
  users: { id: 'users' },
  sessions: { id: 'sessions' },
}));

// Mock drizzle-orm functions BEFORE importing auth
jest.mock('drizzle-orm', () => ({
  eq: jest.fn((column, value) => ({ column, value })),
  and: jest.fn((...conditions) => ({ conditions })),
}));

jest.mock('../../backend/db/drizzle-schema', () => ({
  users: {
    id: 'users',
  },
  sessions: {
    id: 'sessions',
    token: 'token',
    refreshToken: 'refreshToken',
  },
}));

// Mock the audit module
jest.mock('../../backend/lib/audit', () => ({
  logAudit: jest.fn(),
  AuditActions: {
    SESSION_CREATE: 'session.create',
  },
}));

// Mock samlify to prevent ES module issues
jest.mock('samlify', () => ({
  default: {
    IdentityProvider: jest.fn(),
    ServiceProvider: jest.fn(),
  },
  SamlIdp: jest.fn(),
  SamlSp: jest.fn(),
}));

describe('Auth Library', () => {
  let mockSessions: any[] = [];
  let mockUsers: any[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
    mockSessions = [];
    mockUsers = [];
    
    // Reset all mock implementations
    mockDb.select.mockClear();
    mockDb.insert.mockClear();
    mockDb.update.mockClear();
    mockDb.delete.mockClear();
    
    // Setup database mocks with proper chaining
    mockDb.select.mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
          orderBy: jest.fn().mockResolvedValue([]),
        }),
      }),
    });
    
    mockDb.insert.mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([]),
      }),
    });
    
    mockDb.update.mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([]),
        }),
      }),
    });
    
    mockDb.delete.mockReturnValue({
      where: jest.fn().mockResolvedValue([]),
    });
  });

  describe('Password Functions', () => {
    it('should hash password correctly', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      
      expect(hashed).toBeDefined();
      expect(hashed).not.toBe(password);
      expect(hashed.length).toBeGreaterThan(50);
    });

    it('should verify correct password', async () => {
      const password = 'TestPassword123!';
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword(password, hashed);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hashed = await hashPassword(password);
      const isValid = await verifyPassword(wrongPassword, hashed);
      
      expect(isValid).toBe(false);
    });
  });

  describe('JWT Token Functions', () => {
    const payload = {
      userId: 'user-123',
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-123'
    };

    it('should generate and verify JWT token', () => {
      const token = generateToken(payload);
      const decoded = verifyToken(token);
      
      expect(token).toBeDefined();
      expect(decoded).toMatchObject(payload);
    });

    it('should return null for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      const decoded = verifyToken(invalidToken);
      
      expect(decoded).toBeNull();
    });

    it('should return null for expired token', () => {
      const expiredToken = jwt.sign(payload as any, process.env.JWT_SECRET as string, { expiresIn: -10 });
      const decoded = verifyToken(expiredToken);
      expect(decoded).toBeNull();
    });
  });

  describe('Token Hashing', () => {
    it('should hash access token with bcrypt format', async () => {
      const token = 'test-access-token';
      const hash = await hashAccessToken(token);
      
      expect(hash).toMatch(/^\$2[aby]\$\d+\$[A-Za-z0-9./]+$/); // bcrypt hash pattern
      expect(hash).not.toBe(token); // Should not be the original token
    });

    it('should hash refresh token with bcrypt format', async () => {
      const token = 'test-refresh-token';
      const hash = await hashRefreshToken(token);
      
      expect(hash).toMatch(/^\$2[aby]\$\d+\$[A-Za-z0-9./]+$/); // bcrypt hash pattern
      expect(hash).not.toBe(token); // Should not be the original token
    });

    it('should produce different hashes for different tokens', async () => {
      const token1 = 'token-one';
      const token2 = 'token-two';
      const hash1 = await hashAccessToken(token1);
      const hash2 = await hashAccessToken(token2);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('Session Validation', () => {
    const mockSessionBase = {
      id: 'session-123',
      userId: 'user-123',
      expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      refreshExpiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      ipAddress: '127.0.0.1',
      userAgent: 'test-agent',
      deviceId: 'device-123',
      createdAt: new Date(),
      lastActivityAt: new Date(),
    };

    it('should validate valid session', async () => {
      const mockSession = {
        ...mockSessionBase,
        token: await hashAccessToken('valid-token'),
        refreshToken: await hashRefreshToken('valid-refresh-token'),
      };
      mockSessions = [mockSession];
      
      // Setup database mock to return the mock sessions
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
            orderBy: jest.fn().mockResolvedValue([]),
          }),
        }),
      });
      
      // Override the mock to return all sessions for validateSession
      mockDb.select.mockReturnValue({
        from: jest.fn().mockResolvedValue(mockSessions),
      });
      
      const result = await validateSession('valid-token');
      
      expect(result.valid).toBe(true);
      expect(result.userId).toBe('user-123');
    });

    it('should reject expired session', async () => {
      const expiredSession = {
        ...mockSessionBase,
        token: await hashAccessToken('expired-token'),
        refreshToken: await hashRefreshToken('expired-refresh-token'),
        expiresAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      };
      mockSessions = [expiredSession];
      
      // Setup database mock to return the expired session
      mockDb.select.mockReturnValue({
        from: jest.fn().mockResolvedValue(mockSessions),
      });
      
      const result = await validateSession('expired-token');
      
      expect(result.valid).toBe(false);
    });

    it('should reject non-existent session', async () => {
      mockSessions = [];
      
      // Setup database mock to return empty sessions
      mockDb.select.mockReturnValue({
        from: jest.fn().mockResolvedValue(mockSessions),
      });
      
      const result = await validateSession('non-existent-token');
      
      expect(result.valid).toBe(false);
    });
  });

  describe('Session Creation', () => {
    const mockUser = {
      id: 'user-123',
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-123',
    };

    it('should create session successfully', async () => {
      // Configure the mock for this specific test
      const mockUser = { id: 'user-123', email: 'test@example.com' };
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([mockUser]),
          }),
        }),
      });
      
      mockDb.insert.mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: 'test-session-id' }])
        })
      });

      const session = await createSession('user-123', '127.0.0.1', 'test-agent', 'device-123');

      expect(session).toBeDefined();
      expect(session.userId).toBe('user-123');
      expect(session.token).toBeDefined();
      expect(session.refreshToken).toBeDefined();
    });

    it('should reject session creation for non-existent user', async () => {
      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
        }),
      });

      await expect(createSession('non-existent-user')).rejects.toThrow('User not found');
    });
  });

  describe('Session Refresh', () => {
    const payload = {
      userId: 'user-123',
      email: 'test@example.com',
      role: 'user',
      organizationId: 'org-123',
    };

    it('should rotate refresh token and persist hashed tokens', async () => {
      const oldRefreshToken = generateRefreshToken(payload);

      const existingSession = {
        id: 'session-123',
        userId: payload.userId,
        token: 'old-token-hash',
        refreshToken: hashRefreshToken(oldRefreshToken),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        refreshExpiresAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        ipAddress: null,
        userAgent: null,
        deviceId: null,
        createdAt: new Date(),
        lastActivityAt: new Date(),
      };

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([existingSession]),
          }),
        }),
      });

      mockDb.update.mockReturnValue({
        set: jest.fn().mockReturnValue({
          where: jest.fn().mockResolvedValue(undefined),
        }),
      });

      const refreshed = await refreshSession(oldRefreshToken);

      expect(refreshed).not.toBeNull();
      expect(refreshed?.userId).toBe(payload.userId);
      expect(refreshed?.token).toBeDefined();
      expect(refreshed?.refreshToken).toBeDefined();
      expect(refreshed?.refreshToken).not.toBe(oldRefreshToken);

      const setArg = asMock(mockDb.update().set).mock.calls[0][0] as any;
      expect(setArg).toBeDefined();
      expect(setArg.token).toBe(await hashAccessToken(refreshed!.token));
      expect(setArg.refreshToken).toBe(await hashRefreshToken(refreshed!.refreshToken));
      expect(setArg.expiresAt).toBeInstanceOf(Date);
      expect(setArg.refreshExpiresAt).toBeInstanceOf(Date);
    });

    it('should return null for expired refresh session', async () => {
      const oldRefreshToken = generateRefreshToken(payload);

      const expiredSession = {
        id: 'session-123',
        userId: payload.userId,
        token: 'old-token-hash',
        refreshToken: hashRefreshToken(oldRefreshToken),
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        refreshExpiresAt: new Date(Date.now() - 1000),
        ipAddress: null,
        userAgent: null,
        deviceId: null,
        createdAt: new Date(),
        lastActivityAt: new Date(),
      };

      mockDb.select.mockReturnValue({
        from: jest.fn().mockReturnValue({
          where: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([expiredSession]),
          }),
        }),
      });

      const refreshed = await refreshSession(oldRefreshToken);
      expect(refreshed).toBeNull();
    });
  });
});
