import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import { Hono } from 'hono';
import { hashPassword, verifyPassword, validateEmail, validatePasswordStrength, createSession, validateSession, revokeSession, generateToken, verifyToken, hashAccessToken, handleFailedLogin, resetFailedLoginAttempts, isAccountLocked } from '../../backend/lib/auth';
import { hasPermission, Role, Permission } from '../../backend/lib/rbac';
import { db as pgDb } from '../../backend/db/connection';
import { users, organizations } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';

describe('Authentication & Authorization', () => {
  let testOrg: any;
  let testUser: any;
  let authToken: string;

  beforeAll(async () => {
    // Create test organization
    const [org] = await pgDb.insert(organizations).values({
      name: 'Test Org',
      slug: 'test-org-auth',
      ownerId: 'temp-owner',
      billingEmail: 'test@example.com',
      plan: 'enterprise',
      status: 'active',
      maxUsers: 100,
      maxStorage: 10240,
      settings: {},
      metadata: {},
    }).returning();
    testOrg = org;

    // Create test user
    const passwordHash = await hashPassword('TestPassword123!');
    const [user] = await pgDb.insert(users).values({
      email: 'auth@example.com',
      passwordHash,
      firstName: 'Test',
      lastName: 'User',
      emailVerified: true,
      role: 'admin',
      status: 'active',
      organizationId: testOrg.id,
      failedLoginAttempts: 0,
      preferences: {},
      metadata: {},
    }).returning();
    testUser = user;

    // Create auth token
    const session = await createSession(testUser.id);
    authToken = session.token;
  });

  afterAll(async () => {
    await pgDb.delete(users).where(eq(users.email, 'auth@example.com'));
    await pgDb.delete(organizations).where(eq(organizations.slug, 'test-org-auth'));
  });

  describe('Password Security', () => {
    it('should hash passwords correctly', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(50);
    });

    it('should verify passwords correctly', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject invalid passwords', async () => {
      const password = 'TestPassword123!';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword('WrongPassword', hash);
      expect(isValid).toBe(false);
    });
  });

  describe('Token Security', () => {
    it('should generate valid JWT tokens', () => {
      const payload = {
        userId: testUser.id,
        email: testUser.email,
        role: testUser.role,
        organizationId: testUser.organizationId,
      };
      const token = auth.generateToken(payload);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });

    it('should verify JWT tokens correctly', () => {
      const payload = {
        userId: testUser.id,
        email: testUser.email,
        role: testUser.role,
        organizationId: testUser.organizationId,
      };
      const token = generateToken(payload);
      const verified = verifyToken(token);
      expect(verified).toEqual(payload);
    });

    it('should reject invalid tokens', () => {
      const verified = verifyToken('invalid.token.here');
      expect(verified).toBeNull();
    });

    it('should hash access tokens', () => {
      const token = 'test-access-token';
      const hashed = hashAccessToken(token);
      expect(hashed).not.toBe(token);
      expect(hashed.length).toBe(64); // SHA256 hex length
    });
  });

  describe('Session Management', () => {
    it('should create sessions with proper security', async () => {
      const session = await createSession(testUser.id, '127.0.0.1', 'test-agent');
      expect(session.token).toBeDefined();
      expect(session.refreshToken).toBeDefined();
      expect(session.expiresAt).toBeInstanceOf(Date);
      expect(session.refreshExpiresAt).toBeInstanceOf(Date);
    });

    it('should validate sessions correctly', async () => {
      const session = await createSession(testUser.id);
      const validation = await validateSession(session.token);
      expect(validation.valid).toBe(true);
      expect(validation.userId).toBe(testUser.id);
    });

    it('should reject invalid sessions', async () => {
      const validation = await validateSession('invalid-token');
      expect(validation.valid).toBe(false);
    });

    it('should revoke sessions correctly', async () => {
      const session = await createSession(testUser.id);
      await revokeSession(session.id);
      const validation = await validateSession(session.token);
      expect(validation.valid).toBe(false);
    });
  });

  describe('RBAC System', () => {
    it('should have correct role hierarchy', () => {
      expect(hasPermission(Role.SUPER_ADMIN, Permission.USER_DELETE)).toBe(true);
      expect(hasPermission(Role.ENTERPRISE_ADMIN, Permission.USER_DELETE)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.USER_DELETE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.USER_DELETE)).toBe(false);
    });

    it('should check user permissions correctly', () => {
      expect(hasPermission(Role.USER, Permission.AI_ASSISTANT_USE)).toBe(true);
      expect(hasPermission(Role.USER, Permission.SETTINGS_READ)).toBe(true);
      expect(hasPermission(Role.USER, Permission.SETTINGS_UPDATE)).toBe(false);
      expect(hasPermission(Role.USER, Permission.USER_CREATE)).toBe(false);
    });

    it('should validate admin permissions', () => {
      expect(hasPermission(Role.ADMIN, Permission.PLATFORM_CREATE)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.PLATFORM_DELETE)).toBe(true);
      expect(hasPermission(Role.ADMIN, Permission.BILLING_UPDATE)).toBe(false);
    });

    it('should grant all permissions to super admin', () => {
      Object.values(Permission).forEach(permission => {
        expect(hasPermission(Role.SUPER_ADMIN, permission)).toBe(true);
      });
    });
  });

  describe('Input Validation', () => {
    it('should validate email addresses correctly', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('should validate password strength', () => {
      const strongPassword = validatePasswordStrength('StrongPass123!');
      expect(strongPassword.valid).toBe(true);
      expect(strongPassword.errors).toHaveLength(0);

      const weakPassword = validatePasswordStrength('weak');
      expect(weakPassword.valid).toBe(false);
      expect(weakPassword.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Account Security', () => {
    it('should handle failed login attempts', async () => {
      await handleFailedLogin(testUser.id);
      
      const [updatedUser] = await pgDb
        .select()
        .from(users)
        .where(eq(users.id, testUser.id))
        .limit(1);
      
      expect((updatedUser as any).failedLoginAttempts).toBe(1);
    });

    it('should reset failed login attempts', async () => {
      await resetFailedLoginAttempts(testUser.id);
      
      const [updatedUser] = await pgDb
        .select()
        .from(users)
        .where(eq(users.id, testUser.id))
        .limit(1);
      
      expect((updatedUser as any).failedLoginAttempts).toBe(0);
      expect((updatedUser as any).accountLockedUntil).toBeNull();
    });

    it('should detect locked accounts', () => {
      const lockedUser = {
        ...testUser,
        accountLockedUntil: new Date(Date.now() + 60000), // 1 minute from now
      };
      expect(isAccountLocked(lockedUser)).toBe(true);

      const unlockedUser = {
        ...testUser,
        accountLockedUntil: new Date(Date.now() - 60000), // 1 minute ago
      };
      expect(isAccountLocked(unlockedUser)).toBe(false);
    });
  });
});

describe('API Security', () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();
  });

  describe('Rate Limiting', () => {
    it('should allow requests within limit', async () => {
      const { rateLimitByIp } = await import('../middleware/validate');
      const middleware = rateLimitByIp(10, 60000); // 10 requests per minute
      
      let responseCount = 0;
      app.use('*', middleware);
      app.get('/', (c) => {
        responseCount++;
        return c.json({ success: true });
      });

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        const res = await app.request('/');
        expect(res.status).toBe(200);
      }
      expect(responseCount).toBe(5);
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize malicious input', async () => {
      const { sanitizeInput } = await import('../middleware/validate');
      
      const maliciousInput = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(maliciousInput);
      
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('</script>');
    });

    it('should remove javascript protocol', async () => {
      const { sanitizeInput } = await import('../middleware/validate');
      
      const maliciousInput = 'javascript:alert("xss")';
      const sanitized = sanitizeInput(maliciousInput);
      
      expect(sanitized).not.toContain('javascript:');
    });

    it('should remove event handlers', async () => {
      const { sanitizeInput } = await import('../middleware/validate');
      
      const maliciousInput = 'onclick="alert("xss")"';
      const sanitized = sanitizeInput(maliciousInput);
      
      expect(sanitized).not.toContain('onclick');
    });
  });

  describe('UUID Validation', () => {
    it('should validate valid UUIDs', async () => {
      const { validateUUID } = await import('../middleware/validate');
      
      const validUUID = '550e8400-e29b-41d4-a716-446655440000';
      expect(validateUUID(validUUID)).toBe(true);
    });

    it('should reject invalid UUIDs', async () => {
      const { validateUUID } = await import('../middleware/validate');
      
      expect(validateUUID('invalid-uuid')).toBe(false);
      expect(validateUUID('123-456-789')).toBe(false);
      expect(validateUUID('')).toBe(false);
    });
  });

  describe('Phone Number Validation', () => {
    it('should validate valid phone numbers', async () => {
      const { validatePhoneNumber } = await import('../middleware/validate');
      
      expect(validatePhoneNumber('+1234567890')).toBe(true);
      expect(validatePhoneNumber('1234567890')).toBe(true);
    });

    it('should reject invalid phone numbers', async () => {
      const { validatePhoneNumber } = await import('../middleware/validate');
      
      expect(validatePhoneNumber('123')).toBe(false);
      expect(validatePhoneNumber('abc')).toBe(false);
      expect(validatePhoneNumber('')).toBe(false);
    });
  });
});
