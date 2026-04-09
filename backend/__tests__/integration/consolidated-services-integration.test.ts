/**
 * Consolidated Services Integration Tests
 * Tests the integration between consolidated alerting, rate limiting, and CSRF systems
 */

import request from 'supertest';
import { Hono } from 'hono';
import { alertingSystem, AlertSeverity, AlertStatus } from '../../lib/alerting-system';
import { checkRateLimit, resetRateLimit, RateLimitPresets } from '../../lib/unified-rate-limiting';
import { generateCSRFToken, verifyCSRFToken } from '../../lib/unified-csrf';

describe('Consolidated Services Integration', () => {
  let app: Hono;
  let userId: string;
  let sessionId: string;

  beforeAll(async () => {
    // Initialize test application with consolidated middleware
    app = new Hono();

    // Setup CSRF protection
    app.get('/csrf-token', async (c) => {
      const token = generateCSRFToken(userId);
      return c.json({ csrfToken: token });
    });

    // Setup protected route with rate limiting
    app.post('/protected-action', async (c) => {
      const authHeader = c.req.header('authorization');
      const csrfToken = c.req.header('x-csrf-token');
      
      // Simulate authentication check
      if (!authHeader?.startsWith('Bearer test-token')) {
        return c.json({ error: 'Unauthorized' }, 401);
      }

      // CSRF validation
      if (!verifyCSRFToken(csrfToken || '', sessionId)) {
        return c.json({ error: 'Invalid CSRF token' }, 403);
      }

      // Rate limiting check
      const rateLimitResult = checkRateLimit(userId, RateLimitPresets.MODERATE);
      if (!rateLimitResult.allowed) {
        return c.json({ 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
        }, 429);
      }

      // Trigger an alert for testing
      const alert = alertingSystem.createAlert({
        name: 'Protected Action Alert',
        description: 'User performed protected action',
        severity: AlertSeverity.MEDIUM,
        status: AlertStatus.FIRING,
        source: 'integration-test',
        labels: { userId, action: 'protected-action' },
        annotations: { timestamp: new Date().toISOString() },
        channels: ['email'],
        message: `User ${userId} performed protected action`,
      });

      return c.json({ 
        success: true, 
        alertId: alert.id,
        rateLimitRemaining: rateLimitResult.remaining 
      });
    });

    // Setup alert management endpoints
    app.get('/alerts', async (c) => {
      const alerts = alertingSystem.getAlerts();
      return c.json({ alerts });
    });

    app.post('/alerts/:alertId/acknowledge', async (c) => {
      const alertId = c.req.param('alertId');
      const success = alertingSystem.acknowledgeAlert(alertId);
      return c.json({ success });
    });

    app.post('/alerts/:alertId/resolve', async (c) => {
      const alertId = c.req.param('alertId');
      const success = alertingSystem.resolveAlert(alertId);
      return c.json({ success });
    });

    // Setup test data
    userId = 'test-user-123';
    sessionId = 'test-session-456';
    resetRateLimit(userId);
  });

  beforeEach(() => {
    // Clear alerts before each test
    const alerts = alertingSystem.getAlerts();
    for (const alert of alerts) {
      alertingSystem.resolveAlert(alert.id);
    }
    resetRateLimit(userId);
  });

  describe('CSRF + Rate Limiting + Alerting Integration', () => {
    it('should successfully process protected action with valid CSRF and within rate limits', async () => {
      // Get CSRF token
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;
      expect(csrfToken).toBeDefined();

      // Perform protected action
      const response = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('x-csrf-token', csrfToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.alertId).toBeDefined();
      expect(response.body.rateLimitRemaining).toBe(29); // 30 - 1

      // Verify alert was created
      const alertsResponse = await request(app.toString())
        .get('/alerts')
        .expect(200);

      expect(alertsResponse.body.alerts).toHaveLength(1);
      expect(alertsResponse.body.alerts[0].name).toBe('Protected Action Alert');
      expect(alertsResponse.body.alerts[0].labels.userId).toBe(userId);
    });

    it('should reject requests with invalid CSRF token', async () => {
      const response = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('x-csrf-token', 'invalid-token')
        .expect(403);

      expect(response.body.error).toBe('Invalid CSRF token');

      // No alert should be created
      const alertsResponse = await request(app.toString())
        .get('/alerts')
        .expect(200);

      expect(alertsResponse.body.alerts).toHaveLength(0);
    });

    it('should reject requests without CSRF token', async () => {
      const response = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .expect(403);

      expect(response.body.error).toBe('Invalid CSRF token');
    });

    it('should rate limit requests after threshold is exceeded', async () => {
      // Get CSRF token
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;

      // Make requests up to the limit
      for (let i = 0; i < 30; i++) {
        await request(app.toString())
          .post('/protected-action')
          .set('Authorization', 'Bearer test-token')
          .set('x-csrf-token', csrfToken)
          .expect(200);
      }

      // Next request should be rate limited
      const rateLimitedResponse = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('x-csrf-token', csrfToken)
        .expect(429);

      expect(rateLimitedResponse.body.error).toBe('Rate limit exceeded');
      expect(rateLimitedResponse.body.retryAfter).toBeGreaterThan(0);
    });

    it('should handle alert acknowledgment workflow', async () => {
      // Create an alert
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;

      const actionResponse = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('x-csrf-token', csrfToken)
        .expect(200);

      const alertId = actionResponse.body.alertId;

      // Acknowledge the alert
      const acknowledgeResponse = await request(app.toString())
        .post(`/alerts/${alertId}/acknowledge`)
        .expect(200);

      expect(acknowledgeResponse.body.success).toBe(true);

      // Verify alert status
      const alertsResponse = await request(app.toString())
        .get('/alerts')
        .expect(200);

      const alert = alertsResponse.body.alerts.find((a: any) => a.id === alertId);
      expect(alert.status).toBe('acknowledged');
    });

    it('should handle alert resolution workflow', async () => {
      // Create an alert
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;

      const actionResponse = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('x-csrf-token', csrfToken)
        .expect(200);

      const alertId = actionResponse.body.alertId;

      // Resolve the alert
      const resolveResponse = await request(app.toString())
        .post(`/alerts/${alertId}/resolve`)
        .expect(200);

      expect(resolveResponse.body.success).toBe(true);

      // Verify alert status
      const alertsResponse = await request(app.toString())
        .get('/alerts')
        .expect(200);

      const alert = alertsResponse.body.alerts.find((a: any) => a.id === alertId);
      expect(alert.status).toBe('resolved');
      expect(alert.resolvedAt).toBeDefined();
    });
  });

  describe('Cross-Service Error Handling', () => {
    it('should handle authentication failures gracefully', async () => {
      const response = await request(app.toString())
        .post('/protected-action')
        .set('x-csrf-token', 'some-token')
        .expect(401);

      expect(response.body.error).toBe('Unauthorized');
    });

    it('should handle malformed requests without breaking services', async () => {
      // Test with invalid JSON
      const response = await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('Content-Type', 'application/json')
        .send('invalid-json')
        .expect(400); // Should handle gracefully

      // Services should still work
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      expect(csrfResponse.body.csrfToken).toBeDefined();
    });

    it('should handle concurrent requests safely', async () => {
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;

      // Make concurrent requests
      const promises = Array.from({ length: 10 }, () =>
        request(app.toString())
          .post('/protected-action')
          .set('Authorization', 'Bearer test-token')
          .set('x-csrf-token', csrfToken)
      );

      const responses = await Promise.all(promises);

      // All should succeed (within rate limit)
      const successCount = responses.filter(r => r.status === 200).length;
      expect(successCount).toBe(10);

      // Should have created 10 alerts
      const alertsResponse = await request(app.toString())
        .get('/alerts')
        .expect(200);

      expect(alertsResponse.body.alerts).toHaveLength(10);
    });
  });

  describe('Service State Management', () => {
    it('should maintain separate rate limits for different users', async () => {
      const userId2 = 'test-user-456';
      resetRateLimit(userId2);

      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;

      // Exhaust rate limit for user 1
      for (let i = 0; i < 30; i++) {
        await request(app.toString())
          .post('/protected-action')
          .set('Authorization', 'Bearer test-token')
          .set('x-csrf-token', csrfToken)
          .expect(200);
      }

      // User 1 should be rate limited
      await request(app.toString())
        .post('/protected-action')
        .set('Authorization', 'Bearer test-token')
        .set('x-csrf-token', csrfToken)
        .expect(429);

      // But user 2 should still be able to make requests
      // (This would require modifying the test to simulate different user contexts)
      // For now, we verify the rate limit state
      const user1RateLimit = checkRateLimit(userId, RateLimitPresets.MODERATE);
      const user2RateLimit = checkRateLimit(userId2, RateLimitPresets.MODERATE);

      expect(user1RateLimit.allowed).toBe(false);
      expect(user2RateLimit.allowed).toBe(true);
    });

    it('should maintain alert state across operations', async () => {
      const csrfResponse = await request(app.toString())
        .get('/csrf-token')
        .expect(200);

      const { csrfToken } = csrfResponse.body;

      // Create multiple alerts
      const alertIds = [];
      for (let i = 0; i < 3; i++) {
        const response = await request(app.toString())
          .post('/protected-action')
          .set('Authorization', 'Bearer test-token')
          .set('x-csrf-token', csrfToken)
          .expect(200);

        alertIds.push(response.body.alertId);
      }

      // Acknowledge one alert
      await request(app.toString())
        .post(`/alerts/${alertIds[0]}/acknowledge`)
        .expect(200);

      // Resolve another alert
      await request(app.toString())
        .post(`/alerts/${alertIds[1]}/resolve`)
        .expect(200);

      // Verify final state
      const alertsResponse = await request(app.toString())
        .get('/alerts')
        .expect(200);

      const alerts = alertsResponse.body.alerts;
      expect(alerts).toHaveLength(3);

      const acknowledgedAlert = alerts.find((a: any) => a.id === alertIds[0]);
      const resolvedAlert = alerts.find((a: any) => a.id === alertIds[1]);
      const firingAlert = alerts.find((a: any) => a.id === alertIds[2]);

      expect(acknowledgedAlert.status).toBe('acknowledged');
      expect(resolvedAlert.status).toBe('resolved');
      expect(firingAlert.status).toBe('firing');
    });
  });

  describe('Performance and Resource Management', () => {
    it('should handle high volume of alert operations efficiently', async () => {
      const startTime = Date.now();

      // Create many alerts
      const alertIds = [];
      for (let i = 0; i < 50; i++) {
        const alert = alertingSystem.createAlert({
          name: `Performance Test Alert ${i}`,
          description: `Test alert ${i}`,
          severity: AlertSeverity.LOW,
          status: AlertStatus.FIRING,
          source: 'performance-test',
          labels: { test: 'performance', index: i.toString() },
          annotations: {},
          channels: ['email'],
        });
        alertIds.push(alert.id);
      }

      const creationTime = Date.now() - startTime;

      // Verify all alerts were created
      expect(alertIds).toHaveLength(50);

      // Bulk acknowledge
      const acknowledgeStartTime = Date.now();
      for (const alertId of alertIds.slice(0, 25)) {
        alertingSystem.acknowledgeAlert(alertId);
      }
      const acknowledgeTime = Date.now() - acknowledgeStartTime;

      // Bulk resolve
      const resolveStartTime = Date.now();
      for (const alertId of alertIds.slice(25)) {
        alertingSystem.resolveAlert(alertId);
      }
      const resolveTime = Date.now() - resolveStartTime;

      // Performance assertions (these values may need adjustment based on environment)
      expect(creationTime).toBeLessThan(1000); // Should create 50 alerts in < 1 second
      expect(acknowledgeTime).toBeLessThan(500); // Should acknowledge 25 alerts in < 0.5 seconds
      expect(resolveTime).toBeLessThan(500); // Should resolve 25 alerts in < 0.5 seconds

      // Verify final state
      const stats = alertingSystem.getStatistics();
      expect(stats.total).toBe(50);
      expect(stats.byStatus.acknowledged).toBe(25);
      expect(stats.byStatus.resolved).toBe(25);
    });

    it('should handle memory cleanup properly', async () => {
      const initialStats = alertingSystem.getStatistics();

      // Create and immediately resolve many alerts
      for (let i = 0; i < 100; i++) {
        const alert = alertingSystem.createAlert({
          name: `Memory Test Alert ${i}`,
          description: 'Test',
          severity: AlertSeverity.LOW,
          status: AlertStatus.FIRING,
          source: 'memory-test',
          labels: {},
          annotations: {},
          channels: ['email'],
        });
        alertingSystem.resolveAlert(alert.id);
      }

      const finalStats = alertingSystem.getStatistics();

      // Should handle the volume without issues
      expect(finalStats.total).toBe(initialStats.total + 100);
      expect(finalStats.byStatus.resolved).toBe(initialStats.byStatus.resolved + 100);
    });
  });
});
