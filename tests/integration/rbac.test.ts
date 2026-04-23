import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { app } from '../../backend/hono';
import { createSession, revokeSession, hashPassword } from '../../backend/lib/auth';
import { db as pgDb } from '../../backend/db/connection';
import { users, organizations } from '../../backend/db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { Role, Permission } from '../../backend/lib/rbac';

describe('RBAC Integration Tests', () => {
  let orgId: string;
  let superAdminId: string;
  let enterpriseAdminId: string;
  let adminId: string;
  let userId: string;
  let superAdminToken: string;
  let enterpriseAdminToken: string;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    // Create test organization
    const [org] = await pgDb
      .insert(organizations)
      .values({
        name: 'RBAC Test Org',
        slug: 'rbac-test-org',
        status: 'active',
      } as any)
      .returning();
    orgId = org!.id;

    // Create users with different roles
    const createUser = async (role: Role, email: string) => {
      const passwordHash = await hashPassword('TestPass123!');
      const [user] = await pgDb
        .insert(users)
        .values({
          email,
          passwordHash,
          firstName: role.charAt(0).toUpperCase() + role.slice(1),
          lastName: 'User',
          emailVerified: true,
          role,
          status: 'active',
          organizationId: role !== 'super_admin' ? orgId : null,
        } as any)
        .returning();
      return user!.id;
    };

    superAdminId = await createUser('super_admin', 'super@test.com');
    enterpriseAdminId = await createUser('enterprise_admin', 'enterprise@test.com');
    adminId = await createUser('admin', 'admin@test.com');
    userId = await createUser('user', 'user@test.com');

    // Create sessions
    superAdminToken = (await createSession(superAdminId, '127.0.0.1', 'test-agent')).token;
    enterpriseAdminToken = (await createSession(enterpriseAdminId, '127.0.0.1', 'test-agent')).token;
    adminToken = (await createSession(adminId, '127.0.0.1', 'test-agent')).token;
    userToken = (await createSession(userId, '127.0.0.1', 'test-agent')).token;
  });

  afterAll(async () => {
    // Cleanup
    await pgDb.delete(users).where(eq(users.organizationId, orgId));
    await pgDb.delete(users).where(eq(users.id, superAdminId));
    await pgDb.delete(organizations).where(eq(organizations.id, orgId));
  });

  const makeRequest = async (token: string, path: string, method = 'GET') => {
    return app.request(path, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  };

  describe('Super Admin Access', () => {
    it('should access any resource regardless of tenant', async () => {
      const res = await makeRequest(superAdminToken, '/api/trpc/enterprise.backup.list');
      expect(res.status).toBe(200);
    });

    it('should trigger backups without org context', async () => {
      const res = await app.request('/api/trpc/enterprise.backup.trigger', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${superAdminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ database: 'test', type: 'full' }),
      });
      expect(res.status).toBe(200);
    });
  });

  describe('Enterprise Admin Access', () => {
    it('should access enterprise resources within their org', async () => {
      const res = await makeRequest(enterpriseAdminToken, '/api/trpc/enterprise.backup.list');
      expect(res.status).toBe(200);
    });

    it('should trigger backups for their org', async () => {
      const res = await app.request('/api/trpc/enterprise.backup.trigger', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${enterpriseAdminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ database: 'test', type: 'full' }),
      });
      expect(res.status).toBe(200);
    });
  });

  describe('Admin Access', () => {
    it('should access limited enterprise resources', async () => {
      const res = await makeRequest(adminToken, '/api/trpc/enterprise.backup.list');
      expect(res.status).toBe(200);
    });

    it('should be denied from triggering backups (requires BACKUP_TRIGGER)', async () => {
      const res = await app.request('/api/trpc/enterprise.backup.trigger', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ database: 'test', type: 'full' }),
      });
      expect(res.status).toBe(403);
    });
  });

  describe('User Access', () => {
    it('should be denied from backup list', async () => {
      const res = await makeRequest(userToken, '/api/trpc/enterprise.backup.list');
      expect(res.status).toBe(403);
    });

    it('should be denied from triggering backups', async () => {
      const res = await app.request('/api/trpc/enterprise.backup.trigger', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ database: 'test', type: 'full' }),
      });
      expect(res.status).toBe(403);
    });
  });

  describe('Default-protected /api/* layer', () => {
    it('should allow /api/trpc (allowlist)', async () => {
      const res = await makeRequest(userToken, '/api/trpc/auth.me');
      expect(res.status).toBe(200);
    });

    it('should reject unauthenticated requests to protected /api/*', async () => {
      const res = await app.request('/api/trpc/enterprise.backup.list');
      expect(res.status).toBe(401);
    });
  });
});
