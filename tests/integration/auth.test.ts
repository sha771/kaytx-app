import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

// Now import the modules that depend on the mocked database
import app from '../../backend/hono';
import { createSession, revokeSession, hashPassword } from '../../backend/lib/auth';
import { users } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { getDb } from '../../backend/db/connection';
import { clearTestDatabase } from '../../backend/lib/test-database';

// Mock the database connection module FIRST before any other imports
jest.mock('../../backend/db/connection', () => {
  const { setupTestDatabase } = require('../../backend/lib/test-database');
  const testDb = setupTestDatabase();
  console.log('[AUTH-TEST-MOCK] Test database mock created');
  return {
    getDb: () => testDb,
    db: testDb,
    pgDb: testDb,
    schema: {}
  };
});

describe('Auth Integration Tests', () => {
  let testUserId: string;

  beforeAll(async () => {
    console.log('[AUTH-TEST] NODE_ENV:', process.env.NODE_ENV);
    console.log('[AUTH-TEST] Setting up test user...');
    
    // Create a test user using the test database
    const mockDb = getDb();
    const passwordHash = await hashPassword('TestPass123!');
    const [user] = await mockDb
      .insert(users)
      .values({
        email: 'integration-test@example.com',
        passwordHash,
        firstName: 'Integration',
        lastName: 'Test',
        emailVerified: true,
        role: 'user',
        status: 'active',
      } as any)
      .returning();
    testUserId = user!.id;
    console.log('[AUTH-TEST] Created test user:', testUserId);
  });

  afterAll(async () => {
    // Cleanup test user
    if (testUserId) {
      const mockDb = getDb();
      await mockDb.delete(users).where(eq(users.id, testUserId));
    }
  });

  it('should create and validate a session', async () => {
    const session = await createSession(testUserId, '127.0.0.1', 'test-agent');
    expect(session.token).toBeDefined();
    expect(session.refreshToken).toBeDefined();
    expect(session.expiresAt).toBeInstanceOf(Date);

    // Verify via Hono endpoint (requires auth middleware)
    const res = await app.request('/api/trpc/auth.me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'application/json',
      },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.data.id).toBe(testUserId);
  });

  it('should reject invalid token', async () => {
    const res = await app.request('/api/trpc/auth.me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer invalid-token',
        'Content-Type': 'application/json',
      },
    });
    expect(res.status).toBe(401);
  });

  it('should logout and revoke session', async () => {
    const session = await createSession(testUserId, '127.0.0.1', 'test-agent');
    const res = await app.request('/api/trpc/auth.logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'application/json',
      },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.data.success).toBe(true);

    // Token should no longer be valid
    const res2 = await app.request('/api/trpc/auth.me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${session.token}`,
        'Content-Type': 'application/json',
      },
    });
    expect(res2.status).toBe(401);
  });
});
