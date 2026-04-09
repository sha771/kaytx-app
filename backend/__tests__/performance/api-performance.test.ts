/**
 * Performance Tests for API Endpoints
 * Tests response times, throughput, and resource usage
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { Hono } from 'hono';
import app from '../../hono';

describe('Performance Tests', () => {
  let app: Hono;
  const performanceThresholds = {
    responseTime: {
      healthCheck: 100, // ms
      authentication: 500, // ms
      userOperations: 1000, // ms
      aiAgentOperations: 5000, // ms
      fileUpload: 10000, // ms
    },
    throughput: {
      requestsPerSecond: 100,
      concurrentUsers: 50,
    },
    memory: {
      maxUsageMB: 512,
      leakThreshold: 50, // MB growth over time
    },
  };

  beforeAll(async () => {
    app = app;
    // Warm up the application
    await app.request('/health');
  });

  describe('Response Time Tests', () => {
    test('Health check responds within threshold', async () => {
      const startTime = performance.now();
      const response = await app.request('/health');
      const endTime = performance.now();
      
      const responseTime = endTime - startTime;
      expect(response.status).toBe(200);
      expect(responseTime).toBeLessThan(performanceThresholds.responseTime.healthCheck);
    });

    test('Authentication operations respond within threshold', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'testpassword123'
      };

      const startTime = performance.now();
      const response = await app.request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const endTime = performance.now();
      
      const responseTime = endTime - startTime;
      expect(responseTime).toBeLessThan(performanceThresholds.responseTime.authentication);
    });

    test('User operations respond within threshold', async () => {
      const userData = {
        email: 'perf-test@example.com',
        password: 'TestPassword123!',
        firstName: 'Performance',
        lastName: 'Test'
      };

      const startTime = performance.now();
      const response = await app.request('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const endTime = performance.now();
      
      const responseTime = endTime - startTime;
      expect(responseTime).toBeLessThan(performanceThresholds.responseTime.userOperations);
    });
  });

  describe('Throughput Tests', () => {
    test('Can handle concurrent requests', async () => {
      const concurrentRequests = 20;
      const requests = Array.from({ length: concurrentRequests }, () =>
        app.request('/health')
      );

      const startTime = performance.now();
      const responses = await Promise.all(requests);
      const endTime = performance.now();

      const totalTime = endTime - startTime;
      const requestsPerSecond = (concurrentRequests / totalTime) * 1000;

      expect(responses.every(r => r.status === 200)).toBe(true);
      expect(requestsPerSecond).toBeGreaterThan(performanceThresholds.throughput.requestsPerSecond);
    });

    test('Maintains performance under load', async () => {
      const loadTestDuration = 5000; // 5 seconds
      const requestInterval = 100; // ms between requests
      const responseTimes: number[] = [];

      const startTime = performance.now();
      let endTime = startTime;

      while (endTime - startTime < loadTestDuration) {
        const requestStart = performance.now();
        await app.request('/health');
        const requestEnd = performance.now();
        
        responseTimes.push(requestEnd - requestStart);
        await new Promise(resolve => setTimeout(resolve, requestInterval));
        endTime = performance.now();
      }

      const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const maxResponseTime = Math.max(...responseTimes);

      expect(avgResponseTime).toBeLessThan(performanceThresholds.responseTime.healthCheck * 2);
      expect(maxResponseTime).toBeLessThan(performanceThresholds.responseTime.healthCheck * 5);
    });
  });

  describe('Memory Usage Tests', () => {
    test('Memory usage stays within threshold', async () => {
      const initialMemory = process.memoryUsage();
      
      // Perform memory-intensive operations
      for (let i = 0; i < 100; i++) {
        await app.request('/api/users');
        await app.request('/health');
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage();
      const memoryUsedMB = (finalMemory.heapUsed - initialMemory.heapUsed) / 1024 / 1024;

      expect(memoryUsedMB).toBeLessThan(performanceThresholds.memory.leakThreshold);
    });

    test('No memory leaks during extended operation', async () => {
      const memorySnapshots: number[] = [];
      const testDuration = 10000; // 10 seconds
      const snapshotInterval = 1000; // 1 second

      for (let i = 0; i < testDuration / snapshotInterval; i++) {
        // Perform operations
        await Promise.all([
          app.request('/health'),
          app.request('/api/users'),
        ]);

        // Take memory snapshot
        if (global.gc) {
          global.gc();
        }
        const memory = process.memoryUsage();
        memorySnapshots.push(memory.heapUsed);

        await new Promise(resolve => setTimeout(resolve, snapshotInterval));
      }

      // Check for steady memory growth (potential leak)
      const initialMemory = memorySnapshots[0];
      const finalMemory = memorySnapshots[memorySnapshots.length - 1];
      const memoryGrowth = (finalMemory - initialMemory) / 1024 / 1024;

      expect(memoryGrowth).toBeLessThan(performanceThresholds.memory.leakThreshold);
    });
  });

  describe('Resource Usage Tests', () => {
    test('CPU usage remains reasonable during load', async () => {
      const startTime = process.cpuUsage();
      
      // Perform CPU-intensive operations
      const promises = Array.from({ length: 50 }, () =>
        app.request('/api/ai-agent/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agentId: 'test-agent',
            input: 'Simple test input'
          })
        })
      );

      await Promise.all(promises);
      const endTime = process.cpuUsage(startTime);

      // CPU usage should be reasonable (this is a rough check)
      const totalCpuTime = endTime.user + endTime.system;
      expect(totalCpuTime).toBeLessThan(1000000); // 1 second in microseconds
    });

    test('Database connection pool handles load', async () => {
      const concurrentDbOperations = 30;
      const dbOperations = Array.from({ length: concurrentDbOperations }, () =>
        app.request('/api/users')
      );

      const startTime = performance.now();
      const responses = await Promise.all(dbOperations);
      const endTime = performance.now();

      expect(responses.every(r => r.status < 500)).toBe(true);
      expect(endTime - startTime).toBeLessThan(5000); // 5 seconds max
    });
  });

  describe('Stress Tests', () => {
    test('System recovers from overload', async () => {
      // Overload the system
      const overloadRequests = 200;
      const requests = Array.from({ length: overloadRequests }, (_, i) =>
        app.request(`/api/users/${i}`, {
          method: 'GET'
        })
      );

      const responses = await Promise.allSettled(requests);
      const successfulResponses = responses.filter(r => 
        r.status === 'fulfilled' && r.value.status < 500
      );

      // System should handle at least 80% of requests successfully
      expect(successfulResponses.length).toBeGreaterThan(overloadRequests * 0.8);

      // Wait for recovery
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Test that system has recovered
      const recoveryResponse = await app.request('/health');
      expect(recoveryResponse.status).toBe(200);
    });

    test('Graceful degradation under extreme load', async () => {
      const extremeLoad = 500;
      const startTime = Date.now();
      
      const requests = Array.from({ length: extremeLoad }, () =>
        app.request('/health')
      );

      const responses = await Promise.allSettled(requests);
      const endTime = Date.now();

      const totalTime = endTime - startTime;
      const successfulResponses = responses.filter(r => 
        r.status === 'fulfilled' && r.value.status === 200
      ).length;

      // Even under extreme load, some requests should succeed
      expect(successfulResponses).toBeGreaterThan(extremeLoad * 0.5);
      expect(totalTime).toBeLessThan(30000); // Should complete within 30 seconds
    });
  });

  afterAll(async () => {
    // Cleanup
    if (global.gc) {
      global.gc();
    }
  });
});

// Performance monitoring utilities
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();

  startTimer(name: string): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      const metrics = this.metrics.get(name) || [];
      metrics.push(duration);
      this.metrics.set(name, metrics);
    };
  }

  getMetrics(name: string): { avg: number; min: number; max: number; count: number } | null {
    const metrics = this.metrics.get(name);
    if (!metrics || metrics.length === 0) return null;

    return {
      avg: metrics.reduce((a, b) => a + b, 0) / metrics.length,
      min: Math.min(...metrics),
      max: Math.max(...metrics),
      count: metrics.length
    };
  }

  getAllMetrics(): Record<string, ReturnType<typeof PerformanceMonitor.prototype.getMetrics>> {
    const result: Record<string, ReturnType<typeof PerformanceMonitor.prototype.getMetrics>> = {};
    for (const [name] of this.metrics) {
      result[name] = this.getMetrics(name);
    }
    return result;
  }

  reset(): void {
    this.metrics.clear();
  }
}

export const performanceMonitor = new PerformanceMonitor();
