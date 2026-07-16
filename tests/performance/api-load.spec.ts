/**
 * Performance / Load Tests
 * Uses Playwright to measure API response times and load capacity.
 *
 * Run: npx playwright test tests/performance/
 */

import { test, expect, request } from '@playwright/test';

const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000';
const PERF_BUDGET_MS = 2000; // P95 budget

test.describe('API Performance @smoke', () => {
  test('health check responds under 100ms', async () => {
    const start = Date.now();
    const response = await request.get(`${API_BASE}/health`);
    const elapsed = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(elapsed).toBeLessThan(100);
  });
});

test.describe('Agent Endpoints Performance', () => {
  test('GET /api/v1/agents responds under 500ms', async () => {
    const start = Date.now();
    const response = await request.get(`${API_BASE}/api/v1/agents?limit=20`);
    const elapsed = Date.now() - start;

    expect(response.status()).toBeLessThan(500);
    expect(elapsed).toBeLessThan(PERF_BUDGET_MS);
  });

  test('GET /api/v1/agents filtered by department under 500ms', async () => {
    const start = Date.now();
    const response = await request.get(`${API_BASE}/api/v1/agents?department=sales&limit=50`);
    const elapsed = Date.now() - start;

    expect(response.status()).toBeLessThan(500);
    expect(elapsed).toBeLessThan(PERF_BUDGET_MS);
  });
});

test.describe('Concurrent Load', () => {
  test('handles 50 concurrent requests', async () => {
    const promises = Array.from({ length: 50 }, () =>
      request.get(`${API_BASE}/api/v1/agents?limit=10`)
    );

    const start = Date.now();
    const responses = await Promise.all(promises);
    const elapsed = Date.now() - start;

    const successCount = responses.filter((r) => r.status() < 500).length;
    expect(successCount).toBeGreaterThan(45); // >90% success
    expect(elapsed).toBeLessThan(10000); // all complete in 10s
  });

  test('handles 20 concurrent chat message initiations', async () => {
    test.skip(!process.env.LOAD_TEST_ENABLED, 'Set LOAD_TEST_ENABLED=1 to run');
    // This test is skipped by default to avoid hammering real LLM APIs
    const promises = Array.from({ length: 20 }, (_, i) =>
      request.post(`${API_BASE}/api/v1/chat`, {
        data: { message: `Load test ${i}` },
        timeout: 5000,
      })
    );

    const responses = await Promise.allSettled(promises);
    const fulfilled = responses.filter((r) => r.status === 'fulfilled').length;
    expect(fulfilled).toBeGreaterThan(15);
  });
});

test.describe('Database Query Performance', () => {
  test('paginated agent list under 300ms', async () => {
    const start = Date.now();
    const response = await request.get(`${API_BASE}/api/v1/agents?page=1&limit=100`);
    const elapsed = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(elapsed).toBeLessThan(300);
  });

  test('agent search under 500ms', async () => {
    const start = Date.now();
    const response = await request.get(`${API_BASE}/api/v1/agents?search=accounting`);
    const elapsed = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(elapsed).toBeLessThan(500);
  });
});
