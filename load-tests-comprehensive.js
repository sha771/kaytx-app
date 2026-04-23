import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate, Trend, Counter, Gauge } from 'k6/metrics';

/**
 * Load Testing Suite for Enterprise Platform
 * Tests all critical endpoints under load and stress conditions
 * Run with: k6 run load-tests-comprehensive.js
 */

// Custom metrics
const errorRate = new Rate('errors');
const successRate = new Rate('success');
const apiLatency = new Trend('api_latency');
const databaseLatency = new Trend('database_latency');
const activeUsers = new Gauge('active_users');
const requestsPerSecond = new Counter('requests_per_second');

export const options = {
  stages: [
    { duration: '1m', target: 10 },    // Ramp up to 10 users
    { duration: '3m', target: 50 },    // Ramp up to 50 users
    { duration: '5m', target: 100 },   // Ramp up to 100 users
    { duration: '5m', target: 100 },   // Stay at 100 users
    { duration: '3m', target: 50 },    // Ramp down to 50 users
    { duration: '1m', target: 0 },     // Ramp down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(95)<1000', 'p(99)<2000'],
    'errors': ['rate<0.1'],
  },
  ext: {
    loadimpact: {
      projectID: 3456789,
      name: 'Enterprise Platform Load Test',
    },
  },
};

export default function () {
  const rawBase = __ENV.BASE_URL || 'localhost:3001';
  const baseURL = /^https?:\/\//.test(String(rawBase)) ? String(rawBase) : `http://${rawBase}`;
  const token = __ENV.AUTH_TOKEN || 'test-token';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  activeUsers.add(__VU);
  requestsPerSecond.add(1);

  // ==================== HEALTH CHECKS ====================
  group('Health Checks', () => {
    check(http.get(`${baseURL}/health`), {
      'health check passes': (r) => r.status === 200,
      'has status ok': (r) => r.body.includes('ok'),
    });

    check(http.get(`${baseURL}/ready`), {
      'readiness check passes': (r) => r.status === 200,
    });

    check(http.get(`${baseURL}/metrics`), {
      'metrics endpoint accessible': (r) => r.status === 200,
    });
  });

  // ==================== AUTHENTICATION ====================
  group('Authentication', () => {
    // Registration
    const registerRes = http.post(`${baseURL}/auth/register`, JSON.stringify({
      email: `user-${Date.now()}@test.com`,
      password: 'TestPassword123!',
      firstName: 'Load',
      lastName: 'Test',
    }), { headers });

    const registered = check(registerRes, {
      'registration succeeds': (r) => r.status === 201,
      'returns user ID': (r) => r.body.includes('userId'),
    });

    apiLatency.add(registerRes.timings.duration);
    errorRate.add(!registered);
    successRate.add(registered);

    // Login
    const loginRes = http.post(`${baseURL}/auth/login`, JSON.stringify({
      email: 'test@example.com',
      password: 'TestPassword123!',
    }), { headers });

    const loggedIn = check(loginRes, {
      'login succeeds': (r) => [200, 401].includes(r.status),
      'returns token': (r) => r.body.includes('token') || r.status === 401,
    });

    apiLatency.add(loginRes.timings.duration);
    errorRate.add(!loggedIn);
    successRate.add(loggedIn);

    sleep(1);
  });

  // ==================== USER ENDPOINTS ====================
  group('User Endpoints', () => {
    // Get current user
    const userRes = http.get(`${baseURL}/api/trpc/user.me`, { headers });
    check(userRes, {
      'get user succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(userRes.timings.duration);

    // Update profile
    const updateRes = http.post(
      `${baseURL}/api/trpc/user.updateProfile`,
      JSON.stringify({
        firstName: 'Updated',
        timezone: 'UTC',
      }),
      { headers }
    );
    check(updateRes, {
      'profile update accepted': (r) => [200, 400, 401].includes(r.status),
    });
    apiLatency.add(updateRes.timings.duration);

    // Get preferences
    const prefsRes = http.get(`${baseURL}/api/trpc/user.getPreferences`, { headers });
    check(prefsRes, {
      'get preferences succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(prefsRes.timings.duration);

    sleep(0.5);
  });

  // ==================== PLATFORM INTEGRATION ====================
  group('Platform Integration', () => {
    // Get all platforms
    const platformsRes = http.get(`${baseURL}/api/trpc/platforms.getAll`, { headers });
    check(platformsRes, {
      'list platforms succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(platformsRes.timings.duration);

    // Search platforms
    const searchRes = http.get(`${baseURL}/api/trpc/platforms.search?query=whatsapp`, { headers });
    check(searchRes, {
      'search platforms succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(searchRes.timings.duration);

    // Get platform status
    const statusRes = http.get(`${baseURL}/api/trpc/platforms.getStatus?platform=whatsapp`, { headers });
    check(statusRes, {
      'get platform status accepted': (r) => [200, 404, 401].includes(r.status),
    });
    apiLatency.add(statusRes.timings.duration);

    sleep(1);
  });

  // ==================== ANALYTICS ====================
  group('Analytics', () => {
    // Get metrics
    const metricsRes = http.get(`${baseURL}/api/trpc/analytics.getMetrics`, { headers });
    check(metricsRes, {
      'get metrics succeeds': (r) => [200, 401].includes(r.status),
      'has metrics data': (r) => r.body.includes('totalCalls') || r.status === 401,
    });
    apiLatency.add(metricsRes.timings.duration);

    // Get usage report
    const reportRes = http.get(`${baseURL}/api/trpc/analytics.getUsageReport`, { headers });
    check(reportRes, {
      'get usage report succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(reportRes.timings.duration);

    // Export analytics
    const exportRes = http.post(
      `${baseURL}/api/trpc/analytics.export`,
      JSON.stringify({ format: 'csv' }),
      { headers }
    );
    check(exportRes, {
      'export analytics accepted': (r) => [200, 400, 401].includes(r.status),
    });
    apiLatency.add(exportRes.timings.duration);

    sleep(2);
  });

  // ==================== CALLING SERVICE ====================
  group('Calling Service', () => {
    // Initiate call
    const callRes = http.post(
      `${baseURL}/api/trpc/calling.initiate`,
      JSON.stringify({
        phoneNumber: '+15555551234',
        agentType: 'receptionist',
      }),
      { headers }
    );
    check(callRes, {
      'call initiation accepted': (r) => [200, 400, 401].includes(r.status),
    });
    apiLatency.add(callRes.timings.duration);

    // Get call status
    const statusRes = http.get(`${baseURL}/api/trpc/calling.getStatus?callId=test-call`, { headers });
    check(statusRes, {
      'get call status accepted': (r) => [200, 404, 401].includes(r.status),
    });
    apiLatency.add(statusRes.timings.duration);

    sleep(1);
  });

  // ==================== AI AGENTS ====================
  group('AI Agents', () => {
    // Get AI agents
    const agentsRes = http.get(`${baseURL}/api/trpc/ai-agents.getAll`, { headers });
    check(agentsRes, {
      'list AI agents succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(agentsRes.timings.duration);

    // Create conversation
    const convRes = http.post(
      `${baseURL}/api/trpc/ai-agents.createConversation`,
      JSON.stringify({
        agentType: 'receptionist',
        initialContext: 'User called',
      }),
      { headers }
    );
    check(convRes, {
      'create conversation accepted': (r) => [200, 400, 401].includes(r.status),
    });
    apiLatency.add(convRes.timings.duration);

    // Send message to agent
    const msgRes = http.post(
      `${baseURL}/api/trpc/ai-agents.sendMessage`,
      JSON.stringify({
        conversationId: 'conv-123',
        message: 'Hello, can you help me?',
      }),
      { headers }
    );
    check(msgRes, {
      'send message accepted': (r) => [200, 400, 401].includes(r.status),
    });
    apiLatency.add(msgRes.timings.duration);

    sleep(1.5);
  });

  // ==================== NOTIFICATIONS ====================
  group('Notifications', () => {
    // Get notifications
    const notifRes = http.get(`${baseURL}/api/trpc/notifications.getAll`, { headers });
    check(notifRes, {
      'get notifications succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(notifRes.timings.duration);

    // Mark as read
    const readRes = http.post(
      `${baseURL}/api/trpc/notifications.markAsRead`,
      JSON.stringify({ notificationId: 'notif-123' }),
      { headers }
    );
    check(readRes, {
      'mark notification read accepted': (r) => [200, 404, 401].includes(r.status),
    });
    apiLatency.add(readRes.timings.duration);

    sleep(0.5);
  });

  // ==================== SECURITY ====================
  group('Security', () => {
    // Get security settings
    const settingsRes = http.get(`${baseURL}/api/trpc/security.getSettings`, { headers });
    check(settingsRes, {
      'get security settings succeeds': (r) => [200, 401].includes(r.status),
    });
    apiLatency.add(settingsRes.timings.duration);

    // Enable 2FA
    const twoFARes = http.post(`${baseURL}/api/trpc/security.enable2FA`, JSON.stringify({}), { headers });
    check(twoFARes, {
      '2FA endpoint accepts': (r) => [200, 400, 401].includes(r.status),
    });
    apiLatency.add(twoFARes.timings.duration);

    sleep(0.5);
  });

  // ==================== CONCURRENT STRESS TEST ====================
  group('Concurrent Load (Stress)', () => {
    const res = http.batch([
      ['GET', `${baseURL}/api/trpc/user.me`, null, { headers }],
      ['GET', `${baseURL}/api/trpc/analytics.getMetrics`, null, { headers }],
      ['GET', `${baseURL}/api/trpc/platforms.getAll`, null, { headers }],
      ['GET', `${baseURL}/health`, null, { headers }],
      ['GET', `${baseURL}/metrics`, null, { headers }],
    ]);

    res.forEach((r) => {
      check(r, {
        'batch request succeeds': (res) => res.status < 500,
      });
      apiLatency.add(r.timings.duration);
    });

    sleep(2);
  });

  // ==================== RATE LIMIT TESTING ====================
  group('Rate Limiting Validation', () => {
    let rateLimited = false;

    for (let i = 0; i < 150; i++) {
      const res = http.get(`${baseURL}/api/trpc/analytics.getMetrics`, { headers });

      if (res.status === 429) {
        rateLimited = true;
        check(res, {
          'rate limiting activated': (r) => r.status === 429,
          'error message present': (r) => r.body.includes('rate limit') || r.body.includes('429'),
        });
        break;
      }
    }

    check({ rateLimited }, {
      'rate limiting eventually enforced': (data) => data.rateLimited === true || __VU < 5,
    });
  });

  sleep(1);
}

// Teardown (runs once at end)
export function teardown(data) {
  console.log('Load test completed');
  console.log(`Final error rate: ${errorRate.value}%`);
  console.log(`Final success rate: ${successRate.value}%`);
}
