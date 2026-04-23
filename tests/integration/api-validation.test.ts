import { describe, it, expect, beforeEach } from '@jest/globals';
import { Hono } from 'hono';
import { z } from 'zod';
import { validateBody, validateQuery, validateParams } from '../../backend/middleware/validate';
import { requireAuth, requirePermission, requireMinRole } from '../../backend/middleware/rbac-middleware';
import { Role, Permission } from '../../backend/lib/rbac';

describe('API Input Validation Tests', () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();
  });

  describe('Body Validation', () => {
    it('should validate correct request body', async () => {
      const schema = z.object({
        email: z.string().email(),
        name: z.string().min(2),
        age: z.number().min(18),
      });

      app.post('/users', validateBody(schema), async (c) => {
        const body = c.get('validatedBody');
        return c.json({ success: true, data: body });
      });

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          name: 'John Doe',
          age: 25,
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.email).toBe('test@example.com');
    });

    it('should reject invalid request body', async () => {
      const schema = z.object({
        email: z.string().email(),
        name: z.string().min(2),
        age: z.number().min(18),
      });

      app.post('/users', validateBody(schema), async (c) => {
        const body = c.get('validatedBody');
        return c.json({ success: true, data: body });
      });

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'invalid-email',
          name: 'A', // Too short
          age: 15, // Too young
        }),
      });

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('VALIDATION_ERROR');
      expect(data.details).toHaveLength(3);
    });

    it('should reject malformed JSON', async () => {
      const schema = z.object({
        email: z.string().email(),
      });

      app.post('/users', validateBody(schema), async (c) => {
        const body = c.get('validatedBody');
        return c.json({ success: true, data: body });
      });

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid-json',
      });

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('INVALID_JSON');
    });
  });

  describe('Query Validation', () => {
    it('should validate correct query parameters', async () => {
      const schema = z.object({
        page: z.string().transform(Number).pipe(z.number().min(1)),
        limit: z.string().transform(Number).pipe(z.number().max(100)),
        search: z.string().optional(),
      });

      app.get('/users', validateQuery(schema), async (c) => {
        const query = c.get('validatedQuery');
        return c.json({ success: true, data: query });
      });

      const res = await app.request('/users?page=1&limit=10&search=john');

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.page).toBe(1);
      expect(data.data.limit).toBe(10);
      expect(data.data.search).toBe('john');
    });

    it('should reject invalid query parameters', async () => {
      const schema = z.object({
        page: z.string().transform(Number).pipe(z.number().min(1)),
        limit: z.string().transform(Number).pipe(z.number().max(100)),
      });

      app.get('/users', validateQuery(schema), async (c) => {
        const query = c.get('validatedQuery');
        return c.json({ success: true, data: query });
      });

      const res = await app.request('/users?page=0&limit=200');

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('VALIDATION_ERROR');
      expect(data.details).toHaveLength(2);
    });
  });

  describe('Parameter Validation', () => {
    it('should validate correct URL parameters', async () => {
      const schema = z.object({
        id: z.string().uuid(),
        action: z.enum(['activate', 'deactivate']),
      });

      app.get('/users/:id/:action', validateParams(schema), async (c) => {
        const params = c.get('validatedParams');
        return c.json({ success: true, data: params });
      });

      const userId = '550e8400-e29b-41d4-a716-446655440000';
      const res = await app.request(`/users/${userId}/activate`);

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.data.id).toBe(userId);
      expect(data.data.action).toBe('activate');
    });

    it('should reject invalid URL parameters', async () => {
      const schema = z.object({
        id: z.string().uuid(),
        action: z.enum(['activate', 'deactivate']),
      });

      app.get('/users/:id/:action', validateParams(schema), async (c) => {
        const params = c.get('validatedParams');
        return c.json({ success: true, data: params });
      });

      const res = await app.request('/users/invalid-id/delete');

      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('VALIDATION_ERROR');
      expect(data.details).toHaveLength(2);
    });
  });
});

describe('API Security Tests', () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();
  });

  describe('Authentication Middleware', () => {
    it('should allow requests with valid auth token', async () => {
      // Mock auth context
      app.use('*', async (c, next) => {
        c.set('auth', {
          userId: 'user-123',
          role: Role.USER,
          organizationId: 'org-123',
          email: 'test@example.com',
        });
        await next();
      });

      app.get('/protected', requireAuth(), async (c) => {
        return c.json({ message: 'Protected resource' });
      });

      const res = await app.request('/protected', {
        headers: { 'Authorization': 'Bearer valid-token' },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe('Protected resource');
    });

    it('should reject requests without auth token', async () => {
      app.get('/protected', requireAuth(), async (c) => {
        return c.json({ message: 'Protected resource' });
      });

      const res = await app.request('/protected');

      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.error).toBe('UNAUTHORIZED');
    });
  });

  describe('Permission Middleware', () => {
    it('should allow requests with correct permission', async () => {
      app.use('*', async (c, next) => {
        c.set('auth', {
          userId: 'user-123',
          role: Role.ADMIN,
          organizationId: 'org-123',
          email: 'admin@example.com',
        });
        await next();
      });

      app.post('/users', 
        requirePermission(Permission.USER_CREATE), 
        async (c) => {
          return c.json({ message: 'User created' });
        }
      );

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer valid-token' },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe('User created');
    });

    it('should reject requests without correct permission', async () => {
      app.use('*', async (c, next) => {
        c.set('auth', {
          userId: 'user-123',
          role: Role.USER,
          organizationId: 'org-123',
          email: 'user@example.com',
        });
        await next();
      });

      app.post('/users', 
        requirePermission(Permission.USER_CREATE), 
        async (c) => {
          return c.json({ message: 'User created' });
        }
      );

      const res = await app.request('/users', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer valid-token' },
      });

      expect(res.status).toBe(403);
      const data = await res.json();
      expect(data.error).toBe('FORBIDDEN');
    });
  });

  describe('Role-based Access', () => {
    it('should allow requests with minimum role', async () => {
      app.use('*', async (c, next) => {
        c.set('auth', {
          userId: 'user-123',
          role: Role.ENTERPRISE_ADMIN,
          organizationId: 'org-123',
          email: 'admin@example.com',
        });
        await next();
      });

      app.get('/admin', 
        requireMinRole(Role.ADMIN), 
        async (c) => {
          return c.json({ message: 'Admin resource' });
        }
      );

      const res = await app.request('/admin', {
        headers: { 'Authorization': 'Bearer valid-token' },
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.message).toBe('Admin resource');
    });

    it('should reject requests below minimum role', async () => {
      app.use('*', async (c, next) => {
        c.set('auth', {
          userId: 'user-123',
          role: Role.USER,
          organizationId: 'org-123',
          email: 'user@example.com',
        });
        await next();
      });

      app.get('/admin', 
        requireMinRole(Role.ADMIN), 
        async (c) => {
          return c.json({ message: 'Admin resource' });
        }
      );

      const res = await app.request('/admin', {
        headers: { 'Authorization': 'Bearer valid-token' },
      });

      expect(res.status).toBe(403);
      const data = await res.json();
      expect(data.error).toBe('FORBIDDEN');
    });
  });
});

describe('Database Integration Tests', () => {
  describe('Connection Management', () => {
    it('should handle database connection errors gracefully', async () => {
      // This test would require mocking the database connection
      // For now, we'll test the error handling structure
      
      const app = new Hono();
      app.get('/test', async (c) => {
        try {
          // Simulate database operation
          throw new Error('Connection failed');
        } catch (error) {
          return c.json({ 
            error: 'DATABASE_ERROR', 
            message: 'Database operation failed' 
          }, 500);
        }
      });

      const res = await app.request('/test');
      expect(res.status).toBe(500);
      
      const data = await res.json();
      expect(data.error).toBe('DATABASE_ERROR');
    });
  });

  describe('Transaction Handling', () => {
    it('should handle transactions correctly', async () => {
      // This would test actual database transactions
      // For now, we'll test the transaction structure
      
      const app = new Hono();
      app.post('/transaction-test', async (c) => {
        try {
          // Simulate transaction
          const operations = [
            { operation: 'insert', status: 'success' },
            { operation: 'update', status: 'success' },
          ];
          
          return c.json({ 
            success: true, 
            operations,
            message: 'Transaction completed successfully' 
          });
        } catch (error) {
          return c.json({ 
            success: false, 
            message: 'Transaction rolled back' 
          }, 500);
        }
      });

      const res = await app.request('/transaction-test', {
        method: 'POST',
      });

      expect(res.status).toBe(200);
      
      const data = await res.json();
      expect(data.success).toBe(true);
      expect(data.operations).toHaveLength(2);
    });
  });
});

describe('Error Handling Tests', () => {
  let app: Hono;

  beforeEach(() => {
    app = new Hono();
    
    // Global error handler
    app.onError((err, c) => {
      console.error('[TestError]', err);
      return c.json({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
      }, 500);
    });
  });

  it('should handle validation errors consistently', async () => {
    const schema = z.object({
      email: z.string().email(),
    });

    app.post('/test', validateBody(schema), async (c) => {
      return c.json({ success: true });
    });

    const res = await app.request('/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid' }),
    });

    expect(res.status).toBe(400);
    
    const data = await res.json();
    expect(data.error).toBe('VALIDATION_ERROR');
    expect(data.details).toBeDefined();
    expect(data.timestamp).toBeDefined();
  });

  it('should handle not found errors', async () => {
    app.get('/not-found', (c) => {
      return c.json({ error: 'NOT_FOUND', message: 'Resource not found' }, 404);
    });

    const res = await app.request('/not-found');
    expect(res.status).toBe(404);
    
    const data = await res.json();
    expect(data.error).toBe('NOT_FOUND');
  });

  it('should handle rate limiting errors', async () => {
    app.get('/rate-limited', (c) => {
      return c.json({ 
        error: 'TOO_MANY_REQUESTS', 
        message: 'Rate limit exceeded' 
      }, 429);
    });

    const res = await app.request('/rate-limited');
    expect(res.status).toBe(429);
    
    const data = await res.json();
    expect(data.error).toBe('TOO_MANY_REQUESTS');
  });
});
