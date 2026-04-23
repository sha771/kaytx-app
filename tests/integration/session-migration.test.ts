import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../backend/hono';
import { hashAccessToken, createSession, revokeSession, hashPassword, validateSession } from '../../backend/lib/auth';
import { db as pgDb } from '../../backend/db/connection';
import { users, sessions } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';

describe('Session Token Migration Tests', () => {
  let userId: string;
  let plainSessionId: string;
  let hashedSessionId: string;
  let plainToken: string;
  let hashedToken: string;

  beforeAll(async () => {
    // Create test user
    const passwordHash = await hashPassword('TestPass123!');
    const [user] = await pgDb
      .insert(users)
      .values({
        email: 'migration-test@example.com',
        passwordHash,
        firstName: 'Migration',
        lastName: 'Test',
        emailVerified: true,
        role: 'user',
        status: 'active',
      } as any)
      .returning();
    userId = user!.id;

    // Manually insert a legacy plaintext session
    plainToken = `legacy-plain-${crypto.randomUUID()}`;
    const [plainSession] = await pgDb
      .insert(sessions)
      .values({
        id: crypto.randomUUID(),
        userId,
        token: plainToken, // plaintext
        refreshToken: `refresh-${crypto.randomUUID()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        lastActivityAt: new Date(),
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      } as any)
      .returning();
    plainSessionId = plainSession!.id;

    // Insert a hashed session for comparison
    hashedToken = hashAccessToken(`hashed-${crypto.randomUUID()}`);
    const [hashedSession] = await pgDb
      .insert(sessions)
      .values({
        id: crypto.randomUUID(),
        userId,
        token: hashedToken, // already hashed
        refreshToken: `refresh-${crypto.randomUUID()}`,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        lastActivityAt: new Date(),
        ipAddress: '127.0.0.1',
        userAgent: 'test-agent',
      } as any)
      .returning();
    hashedSessionId = hashedSession!.id;
  });

  afterAll(async () => {
    // Cleanup
    await pgDb.delete(sessions).where(eq(sessions.userId, userId));
    await pgDb.delete(users).where(eq(users.id, userId));
  });

  it('should migrate plaintext token to hashed on validation', async () => {
    // Before migration: plaintext token exists
    const before = await pgDb
      .select()
      .from(sessions)
      .where(eq(sessions.id, plainSessionId))
      .limit(1);
    expect(before[0]?.token).toBe(plainToken); // still plaintext

    // Validate session (should trigger migration)
    const { valid, session } = await validateSession(plainToken);
    expect(valid).toBe(true);
    expect(session?.id).toBe(plainSessionId);

    // After migration: token should be hashed
    const after = await pgDb
      .select()
      .from(sessions)
      .where(eq(sessions.id, plainSessionId))
      .limit(1);
    expect(after[0]?.token).not.toBe(plainToken); // no longer plaintext
    expect(after[0]?.token).toMatch(/^[a-f0-9]{64}$/); // looks like SHA-256 hex
  });

  it('should validate already-hashed token without migration', async () => {
    const { valid, session } = await validateSession(hashedToken);
    expect(valid).toBe(true);
    expect(session?.id).toBe(hashedSessionId);
  });

  it('should reject invalid tokens', async () => {
    const { valid } = await validateSession('invalid-token');
    expect(valid).toBe(false);
  });

  it('should allow Hono access with migrated token', async () => {
    // Use the original plaintext token (it should be migrated internally)
    const res = await app.request('/api/trpc/auth.me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${plainToken}`,
        'Content-Type': 'application/json',
      },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.result.data.id).toBe(userId);
  });
});
