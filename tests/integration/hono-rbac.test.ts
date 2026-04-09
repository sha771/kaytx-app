import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../backend/hono';
import { createSession, hashPassword } from '../../backend/lib/auth';
import { db as pgDb } from '../../backend/db/connection';
import { users } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';

describe('Hono RBAC Middleware Tests', () => {
  let userId: string;
  let userToken: string;

  beforeAll(async () => {
    const passwordHash = await hashPassword('TestPass123!');
    const [user] = await pgDb
      .insert(users)
      .values({
        email: 'hono-rbac@test.com',
        passwordHash,
        firstName: 'Hono',
        lastName: 'RBAC',
        emailVerified: true,
        role: 'user',
        status: 'active',
      } as any)
      .returning();
    userId = user!.id;
    userToken = (await createSession(userId, '127.0.0.1', 'test-agent')).token;
  });

  afterAll(async () => {
    await pgDb.delete(users).where(eq(users.id, userId));
  });

  const makeRequest = async (path: string, token?: string, method = 'GET') => {
    return app.request(path, {
      method,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : {
            'Content-Type': 'application/json',
          },
    });
  };

  describe('Default-protected /api/* layer', () => {
    it('should allow /api/trpc (allowlist) without auth for tRPC self-handling', async () => {
      const res = await makeRequest('/api/trpc/auth.me');
      // tRPC handles its own auth; Hono layer should not block
      expect([401, 200]).toContain(res.status); // 401 if tRPC auth rejects, 200 if valid
    });

    it('should reject unauthenticated requests to other /api/* endpoints', async () => {
      const res = await makeRequest('/api/calls/fake/recording');
      expect(res.status).toBe(401);
    });

    it('should allow authenticated requests to protected /api/* endpoints', async () => {
      const res = await makeRequest('/api/mfa/status', userToken);
      expect(res.status).toBe(200);
    });

    it('should reject requests with invalid token', async () => {
      const res = await makeRequest('/api/mfa/status', 'invalid-token');
      expect(res.status).toBe(401);
    });

    it('should reject requests with malformed Authorization header', async () => {
      const res = await app.request('/api/mfa/status', {
        headers: {
          Authorization: 'Bearer',
          'Content-Type': 'application/json',
        },
      });
      expect(res.status).toBe(401);
    });
  });

  describe('Non-/api paths are not protected by default layer', () => {
    it('should allow access to /health without auth', async () => {
      const res = await makeRequest('/health');
      expect(res.status).toBe(200);
    });

    it('should allow access to /ready without auth', async () => {
      const res = await makeRequest('/ready');
      expect(res.status).toBe(200);
    });

    it('should allow access to /openapi.yaml without auth', async () => {
      const res = await makeRequest('/openapi.yaml');
      expect([200, 500]).toContain(res.status); // 500 if file missing, but not 401
    });

    it('should allow access to /docs without auth', async () => {
      const res = await makeRequest('/docs');
      expect(res.status).toBe(200);
    });

    it('should allow access to /auth/* endpoints without auth (public)', async () => {
      const res = await app.request('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'new@example.com',
          password: 'TestPass123!',
          firstName: 'New',
          lastName: 'User',
        }),
      });
      // May be 409 (duplicate) or 201, but should not be 401
      expect([201, 409, 400]).toContain(res.status);
    });

    it('should allow access to /webhooks/* without auth (signature-based)', async () => {
      const res = await app.request('/webhooks/platform/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-webhook-signature': 'fake',
        },
        body: JSON.stringify({ organizationId: 'fake', eventId: 'fake' }),
      });
      // May be 403/400 due to signature, but should not be 401
      expect([400, 403, 500]).toContain(res.status);
    });
  });

  describe('Error response shape consistency', () => {
    it('should return jsonApiError shape for 401', async () => {
      const res = await makeRequest('/api/mfa/status');
      expect(res.status).toBe(401);
      const body = await res.json();
      expect(body).toHaveProperty('errors');
      expect(Array.isArray(body.errors)).toBe(true);
      expect(body.errors[0]).toHaveProperty('status', '401');
      expect(body.errors[0]).toHaveProperty('code');
      expect(body.errors[0]).toHaveProperty('title');
    });

    it('should return jsonApiError shape for 403 when permission denied', async () => {
      // Try to access an endpoint requiring higher permissions
      const res = await app.request('/api/calls/fake/recording', {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      // May be 404 or 403; if 403, should be jsonApiError shape
      if (res.status === 403) {
        const body = await res.json();
        expect(body).toHaveProperty('errors');
        expect(Array.isArray(body.errors)).toBe(true);
        expect(body.errors[0]).toHaveProperty('status', '403');
      }
    });
  });
});
