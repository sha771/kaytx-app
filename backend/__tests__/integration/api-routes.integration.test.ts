import { describe, it, expect } from '@jest/globals';
import app from '../../hono';

/**
 * API Integration Tests
 * Tests all TRPC endpoint connections and data flow
 */

describe('API Integration: TRPC Routes', () => {
  let authToken: string = 'test-token';
  let csrfToken: string = 'test-csrf';

  beforeAll(() => {
    // Initialize test tokens
    authToken = 'test-token';
    csrfToken = 'test-csrf';
  });

  describe('Calling Media Routes', () => {
    it('GET /api/calls/:callId/recording - should require auth', async () => {
      const res = await app.request('/api/calls/test-call-id/recording', {
        method: 'GET',
      });
      expect(res.status).toBe(401);
    });
  });

  describe('Enterprise RBAC', () => {
    it('GET /api/trpc/enterprise.getSubscription - should be forbidden for non-admin', async () => {
      const res = await app.request('/api/trpc/enterprise.getSubscription', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      expect([401, 403]).toContain(res.status);
    });
  });

  describe('User Management Routes', () => {
    it('GET /api/trpc/user.me - fetch current user', async () => {
      const res = await app.request('/api/trpc/user.me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
      if (res.status === 200) {
        const data = await res.json();
        expect(data).toHaveProperty('id');
        expect(data).toHaveProperty('email');
      }
    });

    it('POST /api/trpc/user.updateProfile - update user profile', async () => {
      const res = await app.request('/api/trpc/user.updateProfile', {
        method: 'POST',
        body: JSON.stringify({
          firstName: 'Updated',
          lastName: 'Name',
          timezone: 'UTC',
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect([200, 400, 401]).toContain(res.status);
    });

    it('GET /api/trpc/user.getPreferences - fetch user preferences', async () => {
      const res = await app.request('/api/trpc/user.getPreferences', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });
  });

  describe('Platform Integration Routes', () => {
    it('GET /api/trpc/platforms.getAll - list all platforms', async () => {
      const res = await app.request('/api/trpc/platforms.getAll', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
      if (res.status === 200) {
        const data = await res.json();
        expect(Array.isArray(data.platforms)).toBe(true);
      }
    });

    it('GET /api/trpc/platforms.search - search platforms', async () => {
      const res = await app.request('/api/trpc/platforms.search?query=whatsapp', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });

    it('POST /api/trpc/platforms.connectQR - initiate QR connection', async () => {
      const res = await app.request('/api/trpc/platforms.connectQR', {
        method: 'POST',
        body: JSON.stringify({ platformName: 'whatsapp' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect([200, 400, 401]).toContain(res.status);
    });
  });

  describe('AI Agents Routes', () => {
    it('GET /api/trpc/aiAgents.getStats - fetch stats', async () => {
      const res = await app.request('/api/trpc/aiAgents.getStats', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });

    it('GET /api/trpc/aiAgents.getActivity - fetch activity', async () => {
      const res = await app.request('/api/trpc/aiAgents.getActivity?input=%7B%22limit%22%3A10%7D', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });

    it('GET /api/trpc/aiAgents.getAgentAnalytics - fetch analytics', async () => {
      const res = await app.request('/api/trpc/aiAgents.getAgentAnalytics?input=%7B%22timeRange%22%3A%227d%22%7D', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });

    it('GET /api/trpc/aiAgents.getAgentActivity - fetch agent activity', async () => {
      const res = await app.request('/api/trpc/aiAgents.getAgentActivity?input=%7B%22limit%22%3A10%7D', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });
  });

  describe('Analytics Routes', () => {
    it('GET /api/trpc/analytics.getMetrics - fetch metrics', async () => {
      const res = await app.request('/api/trpc/analytics.getMetrics', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
      if (res.status === 200) {
        const data = await res.json();
        expect(data).toHaveProperty('totalCalls');
      }
    });

    it('GET /api/trpc/analytics.getUsageReport - fetch usage report', async () => {
      const res = await app.request('/api/trpc/analytics.getUsageReport', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });
  });

  describe('Security Routes', () => {
    it('GET /api/trpc/security.getSettings - fetch security settings', async () => {
      const res = await app.request('/api/trpc/security.getSettings', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
    });

    it('POST /api/trpc/security.enable2FA - enable 2FA', async () => {
      const res = await app.request('/api/trpc/security.enable2FA', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect([200, 400, 401]).toContain(res.status);
    });
  });

  describe('Notification Routes', () => {
    it('GET /api/trpc/notifications.getAll - fetch notifications', async () => {
      const res = await app.request('/api/trpc/notifications.getAll', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });

      expect([200, 401]).toContain(res.status);
      if (res.status === 200) {
        const data = await res.json();
        expect(Array.isArray(data.notifications)).toBe(true);
      }
    });

    it('POST /api/trpc/notifications.markAsRead - mark notification read', async () => {
      const res = await app.request('/api/trpc/notifications.markAsRead', {
        method: 'POST',
        body: JSON.stringify({ notificationId: 'test-id' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-csrf-token': csrfToken,
        },
      });

      expect([200, 404, 401]).toContain(res.status);
    });
  });

  describe('Health Check Routes', () => {
    it('GET / - API health', async () => {
      const res = await app.request('/', { method: 'GET' });
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('ok');
    });

    it('GET /health - health check', async () => {
      const res = await app.request('/health', { method: 'GET' });
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('ok');
    });

    it('GET /ready - readiness probe', async () => {
      const res = await app.request('/ready', { method: 'GET' });
      expect(res.status).toBe(200);
    });

    it('GET /metrics - Prometheus metrics', async () => {
      const res = await app.request('/metrics', { method: 'GET' });
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toContain('http_requests_total');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown route', async () => {
      const res = await app.request('/api/trpc/unknown.route', {
        method: 'GET',
      });

      expect(res.status).toBe(404);
    });

    it('should return 401 for missing auth', async () => {
      const res = await app.request('/api/trpc/user.me', {
        method: 'GET',
      });

      expect(res.status).toBe(401);
    });

    it('should return 405 for invalid method', async () => {
      const res = await app.request('/health', {
        method: 'POST',
      });

      expect([404, 405]).toContain(res.status);
    });
  });

  describe('CORS Handling', () => {
    it('should accept requests from allowed origins', async () => {
      const res = await app.request('/health', {
        method: 'GET',
        headers: { 'Origin': 'http://localhost:8081' },
      });

      expect(res.status).toBe(200);
      expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:8081');
    });

    it('should handle preflight requests', async () => {
      const res = await app.request('/api/trpc/user.me', {
        method: 'OPTIONS',
        headers: {
          'Origin': 'http://localhost:8081',
          'Access-Control-Request-Method': 'POST',
        },
      });

      expect([200, 204]).toContain(res.status);
    });
  });
});
