import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as schema from '../../backend/db/drizzle-schema';

describe('User Workflow Integration Tests', () => {
  let app: Hono;
  let db: ReturnType<typeof drizzle>;
  let sql: ReturnType<typeof postgres>;

  beforeAll(async () => {
    // Setup test database
    sql = postgres(process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db');
    db = drizzle(sql, { schema });

    // Run migrations
    await migrate(db, { migrationsFolder: './drizzle' });

    // Setup app
    app = new Hono();
    // Add routes here
  });

  afterAll(async () => {
    await sql.end();
  });

  beforeEach(async () => {
    // Clean up test data
    await db.delete(schema.users);
    await db.delete(schema.organizations);
    await db.delete(schema.sessions);
  });

  describe('User Registration and Login Flow', () => {
    it('should complete full user registration and login workflow', async () => {
      // Step 1: Register user
      const registerResponse = await app.request('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'SecurePassword123!',
          firstName: 'John',
          lastName: 'Doe',
        }),
      });

      expect(registerResponse.status).toBe(201);
      const registerData = await registerResponse.json();
      expect(registerData.user.email).toBe('test@example.com');
      expect(registerData.user.id).toBeDefined();

      // Step 2: Verify email (simulate)
      const user = await db.select().from(schema.users).where(eq(schema.users.email, 'test@example.com')).limit(1);
      await db.update(schema.users).set({ emailVerified: true }).where(eq(schema.users.id, user[0].id));

      // Step 3: Login
      const loginResponse = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        }),
      });

      expect(loginResponse.status).toBe(200);
      const loginData = await loginResponse.json();
      expect(loginData.token).toBeDefined();
      expect(loginData.refreshToken).toBeDefined();

      // Step 4: Access protected route
      const protectedResponse = await app.request('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Content-Type': 'application/json',
        },
      });

      expect(protectedResponse.status).toBe(200);
      const profileData = await protectedResponse.json();
      expect(profileData.email).toBe('test@example.com');
    });

    it('should handle invalid login attempts', async () => {
      // Register user first
      await app.request('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'SecurePassword123!',
          firstName: 'John',
          lastName: 'Doe',
        }),
      });

      // Try login with wrong password
      const loginResponse = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'WrongPassword123!',
        }),
      });

      expect(loginResponse.status).toBe(401);
      const errorData = await loginResponse.json();
      expect(errorData.error).toContain('Invalid credentials');
    });
  });

  describe('Organization Creation and Management', () => {
    let userToken: string;
    let userId: string;

    beforeEach(async () => {
      // Create and login user
      const registerResponse = await app.request('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'org-test@example.com',
          password: 'SecurePassword123!',
          firstName: 'Jane',
          lastName: 'Smith',
        }),
      });

      const registerData = await registerResponse.json();
      userId = registerData.user.id;

      // Verify and login
      const user = await db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);
      await db.update(schema.users).set({ emailVerified: true }).where(eq(schema.users.id, userId));

      const loginResponse = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'org-test@example.com',
          password: 'SecurePassword123!',
        }),
      });

      const loginData = await loginResponse.json();
      userToken = loginData.token;
    });

    it('should create organization and assign owner', async () => {
      const createOrgResponse = await app.request('/api/organizations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Organization',
          description: 'A test organization',
          industry: 'technology',
        }),
      });

      expect(createOrgResponse.status).toBe(201);
      const orgData = await createOrgResponse.json();
      expect(orgData.name).toBe('Test Organization');
      expect(orgData.ownerId).toBe(userId);

      // Verify user is member
      const membersResponse = await app.request(`/api/organizations/${orgData.id}/members`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(membersResponse.status).toBe(200);
      const membersData = await membersResponse.json();
      expect(membersData.members).toHaveLength(1);
      expect(membersData.members[0].userId).toBe(userId);
      expect(membersData.members[0].role).toBe('owner');
    });

    it('should handle organization permissions correctly', async () => {
      // Create organization
      const createOrgResponse = await app.request('/api/organizations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Organization',
          description: 'A test organization',
        }),
      });

      const orgData = await createOrgResponse.json();

      // Try to access without token
      const unauthorizedResponse = await app.request(`/api/organizations/${orgData.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      expect(unauthorizedResponse.status).toBe(401);

      // Access with valid token
      const authorizedResponse = await app.request(`/api/organizations/${orgData.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(authorizedResponse.status).toBe(200);
    });
  });

  describe('API Key Management', () => {
    let userToken: string;
    let organizationId: string;

    beforeEach(async () => {
      // Setup user and organization
      const registerResponse = await app.request('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'api-test@example.com',
          password: 'SecurePassword123!',
          firstName: 'API',
          lastName: 'User',
        }),
      });

      const registerData = await registerResponse.json();
      const userId = registerData.user.id;

      const user = await db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);
      await db.update(schema.users).set({ emailVerified: true }).where(eq(schema.users.id, userId));

      const loginResponse = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'api-test@example.com',
          password: 'SecurePassword123!',
        }),
      });

      const loginData = await loginResponse.json();
      userToken = loginData.token;

      // Create organization
      const orgResponse = await app.request('/api/organizations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'API Test Org',
          description: 'Organization for API testing',
        }),
      });

      const orgData = await orgResponse.json();
      organizationId = orgData.id;
    });

    it('should create and use API keys', async () => {
      // Create API key
      const createKeyResponse = await app.request('/api/keys', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test API Key',
          permissions: ['read', 'write'],
          organizationId,
        }),
      });

      expect(createKeyResponse.status).toBe(201);
      const keyData = await createKeyResponse.json();
      expect(keyData.key).toBeDefined();
      expect(keyData.keyId).toBeDefined();

      // Use API key to access protected endpoint
      const apiAccessResponse = await app.request('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${keyData.key}`,
          'Content-Type': 'application/json',
        },
      });

      expect(apiAccessResponse.status).toBe(200);
    });

    it('should revoke API keys', async () => {
      // Create API key
      const createKeyResponse = await app.request('/api/keys', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Revocable Key',
          permissions: ['read'],
          organizationId,
        }),
      });

      const keyData = await createKeyResponse.json();

      // Revoke key
      const revokeResponse = await app.request(`/api/keys/${keyData.keyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      expect(revokeResponse.status).toBe(200);

      // Try to use revoked key
      const revokedAccessResponse = await app.request('/api/user/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${keyData.key}`,
          'Content-Type': 'application/json',
        },
      });

      expect(revokedAccessResponse.status).toBe(401);
    });
  });
});
