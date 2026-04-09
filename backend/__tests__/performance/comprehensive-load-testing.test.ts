/**
 * Comprehensive Load Testing Suite
 * Tests system performance under various load conditions
 */

import request from 'supertest';
import { Hono } from 'hono';
import { alertingSystem, AlertSeverity } from '../../lib/alerting-system';
import { checkRateLimit, resetRateLimit, RateLimitPresets } from '../../lib/unified-rate-limiting';
import { generateCSRFToken } from '../../lib/unified-csrf';

describe('Comprehensive Load Testing', () => {
  let app: Hono;
  const testUsers = Array.from({ length: 100 }, (_, i) => `load-test-user-${i}`);
  const testSessions = Array.from({ length: 100 }, (_, i) => `load-test-session-${i}`);

  beforeAll(async () => {
    // Initialize performance test application
    app = new Hono();

    // Lightweight endpoint for basic load testing
    app.get('/health', async (c) => {
      return c.json({ 
        status: 'healthy', 
        timestamp: Date.now(),
        uptime: process.uptime()
      });
    });

    // CSRF token endpoint
    app.get('/csrf-token/:userId', async (c) => {
      const userId = c.req.param('userId');
      const token = generateCSRFToken(userId);
      return c.json({ csrfToken: token });
    });

    // CPU-intensive endpoint
    app.post('/cpu-intensive', async (c) => {
      const iterations = 1000;
      let result = 0;
      
      // Simulate CPU work
      for (let i = 0; i < iterations; i++) {
        result += Math.sqrt(i) * Math.sin(i);
      }
      
      return c.json({ result, iterations });
    });

    // Memory-intensive endpoint
    app.post('/memory-intensive', async (c) => {
      const size = 1000;
      const data = Array.from({ length: size }, (_, i) => ({
        id: i,
        data: new Array(100).fill(0).map(() => Math.random()),
        timestamp: Date.now(),
        metadata: {
          hash: Math.random().toString(36),
          uuid: crypto.randomUUID(),
        }
      }));
      
      // Process the data
      const processed = data.map(item => ({
        ...item,
        processed: true,
        sum: item.data.reduce((a, b) => a + b, 0)
      }));
      
      return c.json({ 
        processed: processed.length,
        memoryUsage: process.memoryUsage()
      });
    });

    // Database simulation endpoint
    app.post('/simulate-db-operation', async (c) => {
      const { recordCount = 100 } = await c.req.json();
      
      // Simulate database query and processing
      const records = Array.from({ length: recordCount }, (_, i) => ({
        id: crypto.randomUUID(),
        name: `Record ${i}`,
        value: Math.random() * 1000,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 10));
      
      // Simulate complex query
      const filtered = records.filter(r => r.value > 500);
      const aggregated = filtered.reduce((acc, r) => acc + r.value, 0);
      
      return c.json({
        total: records.length,
        filtered: filtered.length,
        aggregated,
        processingTime: Date.now()
      });
    });

    // Alert creation endpoint
    app.post('/create-alert/:userId', async (c) => {
      const userId = c.req.param('userId');
      const { severity = 'medium' } = await c.req.json();
      
      const alert = alertingSystem.createAlert({
        name: `Load Test Alert for ${userId}`,
        description: 'Alert created during load testing',
        severity: severity as AlertSeverity,
        status: 'firing',
        source: 'load-test',
        labels: { userId, test: 'load' },
        annotations: { timestamp: new Date().toISOString() },
        channels: ['email'],
        message: `Load test alert for user ${userId}`,
      });
      
      return c.json({ alertId: alert.id, userId });
    });

    // Rate limiting test endpoint
    app.post('/rate-limit-test/:userId', async (c) => {
      const userId = c.req.param('userId');
      
      const rateLimitResult = checkRateLimit(userId, RateLimitPresets.MODERATE);
      if (!rateLimitResult.allowed) {
        return c.json({ 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
        }, 429);
      }
      
      return c.json({ 
        success: true,
        remaining: rateLimitResult.remaining,
        resetAt: rateLimitResult.resetAt
      });
    });

    // Concurrent operations endpoint
    app.post('/concurrent-operations', async (c) => {
      const { operationCount = 10 } = await c.req.json();
      
      const operations = Array.from({ length: operationCount }, async (_, i) => {
        // Simulate different types of operations
        const operationType = i % 3;
        
        switch (operationType) {
          case 0: // CPU operation
            let result = 0;
            for (let j = 0; j < 100; j++) {
              result += Math.sqrt(j);
            }
            return { type: 'cpu', result, index: i };
            
          case 1: // Memory operation
            const data = new Array(50).fill(0).map(() => Math.random());
            const sum = data.reduce((a, b) => a + b, 0);
            return { type: 'memory', sum, index: i };
            
          case 2: // Async operation
            await new Promise(resolve => setTimeout(resolve, Math.random() * 5));
            return { type: 'async', delay: Math.random() * 5, index: i };
            
          default:
            return { type: 'unknown', index: i };
        }
      });
      
      const results = await Promise.all(operations);
      
      return c.json({
        completed: results.length,
        results,
        executionTime: Date.now()
      });
    });

    // Reset test data
    app.post('/reset-test-data', async (c) => {
      // Clear all alerts
      const alerts = alertingSystem.getAlerts();
      for (const alert of alerts) {
        alertingSystem.resolveAlert(alert.id);
      }
      
      // Reset rate limits for all test users
      for (const userId of testUsers) {
        resetRateLimit(userId);
      }
      
      return c.json({ success: true, message: 'Test data reset' });
    });
  });

  beforeEach(async () => {
    // Reset test data before each test
    await request(app.toString())
      .post('/reset-test-data')
      .expect(200);
  });

  describe('Basic Load Tests', () => {
    it('should handle 1000 concurrent health check requests', async () => {
      const startTime = Date.now();
      const requestCount = 1000;
      
      const promises = Array.from({ length: requestCount }, () =>
        request(app.toString()).get('/health').expect(200)
      );
      
      const responses = await Promise.all(promises);
      const endTime = Date.now();
      
      const totalTime = endTime - startTime;
      const requestsPerSecond = (requestCount / totalTime) * 1000;
      
      // Verify all requests succeeded
      expect(responses).toHaveLength(requestCount);
      responses.forEach(response => {
        expect(response.body.status).toBe('healthy');
      });
      
      // Performance assertions
      expect(requestsPerSecond).toBeGreaterThan(100); // Should handle at least 100 RPS
      expect(totalTime).toBeLessThan(10000); // Should complete within 10 seconds
      
      console.log(`Health check load test: ${requestCount} requests in ${totalTime}ms (${requestsPerSecond.toFixed(2)} RPS)`);
    });

    it('should handle sustained load over time', async () => {
      const duration = 5000; // 5 seconds
      const targetRPS = 50;
      const interval = 1000 / targetRPS;
      
      const startTime = Date.now();
      const results = [];
      
      const loadGenerator = setInterval(async () => {
        if (Date.now() - startTime >= duration) {
          clearInterval(loadGenerator);
          return;
        }
        
        const requestStart = Date.now();
        try {
          await request(app.toString()).get('/health').expect(200);
          const requestTime = Date.now() - requestStart;
          results.push({ success: true, time: requestTime });
        } catch (error) {
          results.push({ success: false, error: error.message });
        }
      }, interval);
      
      await new Promise(resolve => setTimeout(resolve, duration + 1000));
      
      const successfulRequests = results.filter(r => r.success);
      const averageResponseTime = successfulRequests.reduce((sum, r) => sum + r.time, 0) / successfulRequests.length;
      
      expect(successfulRequests.length).toBeGreaterThan(duration * targetRPS / 1000 * 0.9); // At least 90% success rate
      expect(averageResponseTime).toBeLessThan(100); // Average response time under 100ms
      
      console.log(`Sustained load test: ${successfulRequests.length} successful requests, avg response time: ${averageResponseTime.toFixed(2)}ms`);
    });
  });

  describe('CPU and Memory Load Tests', () => {
    it('should handle CPU-intensive operations under load', async () => {
      const concurrentRequests = 50;
      const startTime = Date.now();
      
      const promises = Array.from({ length: concurrentRequests }, () =>
        request(app.toString())
          .post('/cpu-intensive')
          .expect(200)
      );
      
      const responses = await Promise.all(promises);
      const endTime = Date.now();
      
      const totalTime = endTime - startTime;
      const averageTime = totalTime / concurrentRequests;
      
      expect(responses).toHaveLength(concurrentRequests);
      responses.forEach(response => {
        expect(response.body.iterations).toBe(1000);
        expect(response.body.result).toBeDefined();
      });
      
      expect(averageTime).toBeLessThan(200); // Average time per request under 200ms
      
      console.log(`CPU load test: ${concurrentRequests} requests in ${totalTime}ms, avg: ${averageTime.toFixed(2)}ms per request`);
    });

    it('should handle memory-intensive operations without leaks', async () => {
      const initialMemory = process.memoryUsage();
      const requestCount = 20;
      
      const promises = Array.from({ length: requestCount }, () =>
        request(app.toString())
          .post('/memory-intensive')
          .expect(200)
      );
      
      const responses = await Promise.all(promises);
      
      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;
      
      expect(responses).toHaveLength(requestCount);
      responses.forEach(response => {
        expect(response.body.processed).toBe(1000);
      });
      
      // Memory increase should be reasonable (less than 50MB for this test)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
      
      console.log(`Memory load test: ${requestCount} requests, memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`);
    });
  });

  describe('Database Simulation Load Tests', () => {
    it('should handle database-like operations under load', async () => {
      const concurrentRequests = 30;
      const recordsPerRequest = 100;
      
      const promises = Array.from({ length: concurrentRequests }, () =>
        request(app.toString())
          .post('/simulate-db-operation')
          .send({ recordCount: recordsPerRequest })
          .expect(200)
      );
      
      const responses = await Promise.all(promises);
      
      expect(responses).toHaveLength(concurrentRequests);
      responses.forEach(response => {
        expect(response.body.total).toBe(recordsPerRequest);
        expect(response.body.processingTime).toBeDefined();
      });
      
      // Calculate statistics
      const processingTimes = responses.map(r => r.body.processingTime);
      const averageProcessingTime = processingTimes.reduce((sum, time) => sum + time, 0) / processingTimes.length;
      const maxProcessingTime = Math.max(...processingTimes);
      
      expect(averageProcessingTime).toBeLessThan(50); // Average processing time under 50ms
      expect(maxProcessingTime).toBeLessThan(100); // Max processing time under 100ms
      
      console.log(`DB simulation load test: ${concurrentRequests} requests, avg processing: ${averageProcessingTime.toFixed(2)}ms`);
    });
  });

  describe('Alerting System Load Tests', () => {
    it('should handle high volume alert creation and management', async () => {
      const alertCount = 100;
      const startTime = Date.now();
      
      // Create alerts concurrently
      const createPromises = Array.from({ length: alertCount }, (_, i) =>
        request(app.toString())
          .post(`/create-alert/load-test-user-${i % 10}`)
          .send({ severity: 'medium' })
          .expect(200)
      );
      
      const createResponses = await Promise.all(createPromises);
      const createTime = Date.now() - startTime;
      
      expect(createResponses).toHaveLength(alertCount);
      createResponses.forEach(response => {
        expect(response.body.alertId).toBeDefined();
      });
      
      // Test alert statistics performance
      const statsStartTime = Date.now();
      const stats = alertingSystem.getStatistics();
      const statsTime = Date.now() - statsStartTime;
      
      expect(stats.total).toBe(alertCount);
      expect(statsTime).toBeLessThan(10); // Stats should be very fast
      
      console.log(`Alert load test: ${alertCount} alerts created in ${createTime}ms, stats retrieved in ${statsTime}ms`);
    });

    it('should handle concurrent alert operations', async () => {
      const alertCount = 50;
      const userId = 'concurrent-test-user';
      
      // Create alerts
      const alertIds = [];
      for (let i = 0; i < alertCount; i++) {
        const alert = alertingSystem.createAlert({
          name: `Concurrent Test Alert ${i}`,
          description: 'Test alert for concurrent operations',
          severity: AlertSeverity.MEDIUM,
          status: 'firing',
          source: 'concurrent-test',
          labels: { userId, index: i.toString() },
          annotations: {},
          channels: ['email'],
        });
        alertIds.push(alert.id);
      }
      
      // Perform concurrent operations
      const startTime = Date.now();
      
      const operations = [];
      
      // Acknowledge half the alerts
      for (let i = 0; i < alertCount / 2; i++) {
        operations.push(
          Promise.resolve(alertingSystem.acknowledgeAlert(alertIds[i]))
        );
      }
      
      // Resolve the other half
      for (let i = alertCount / 2; i < alertCount; i++) {
        operations.push(
          Promise.resolve(alertingSystem.resolveAlert(alertIds[i]))
        );
      }
      
      await Promise.all(operations);
      const operationTime = Date.now() - startTime;
      
      // Verify final state
      const finalStats = alertingSystem.getStatistics();
      expect(finalStats.byStatus.acknowledged).toBe(alertCount / 2);
      expect(finalStats.byStatus.resolved).toBe(alertCount / 2);
      
      expect(operationTime).toBeLessThan(100); // Operations should be fast
      
      console.log(`Concurrent alert operations: ${alertCount} operations in ${operationTime}ms`);
    });
  });

  describe('Rate Limiting Load Tests', () => {
    it('should handle rate limiting efficiently under high load', async () => {
      const requestCount = 1000;
      const userId = 'rate-limit-load-test';
      
      resetRateLimit(userId);
      
      const startTime = Date.now();
      const promises = Array.from({ length: requestCount }, () =>
        request(app.toString())
          .post(`/rate-limit-test/${userId}`)
          .expect(r => r.status === 200 || r.status === 429)
      );
      
      const responses = await Promise.all(promises);
      const endTime = Date.now();
      
      const successfulRequests = responses.filter(r => r.status === 200);
      const rateLimitedRequests = responses.filter(r => r.status === 429);
      
      expect(successfulRequests.length).toBe(30); // Should hit the rate limit
      expect(rateLimitedRequests.length).toBe(970); // Rest should be rate limited
      
      const totalTime = endTime - startTime;
      const requestsPerSecond = (requestCount / totalTime) * 1000;
      
      expect(requestsPerSecond).toBeGreaterThan(500); // Should handle high throughput
      
      console.log(`Rate limiting load test: ${successfulRequests.length} successful, ${rateLimitedRequests.length} rate limited, ${requestsPerSecond.toFixed(2)} RPS`);
    });
  });

  describe('Mixed Workload Load Tests', () => {
    it('should handle mixed concurrent operations efficiently', async () => {
      const operationCount = 100;
      const startTime = Date.now();
      
      const operations = [];
      
      // Mix different types of operations
      for (let i = 0; i < operationCount; i++) {
        const operationType = i % 4;
        
        switch (operationType) {
          case 0: // Health check
            operations.push(request(app.toString()).get('/health').expect(200));
            break;
            
          case 1: // CPU intensive
            operations.push(request(app.toString()).post('/cpu-intensive').expect(200));
            break;
            
          case 2: // Create alert
            const userId = testUsers[i % testUsers.length];
            operations.push(
              request(app.toString())
                .post(`/create-alert/${userId}`)
                .send({ severity: 'low' })
                .expect(200)
            );
            break;
            
          case 3: // Concurrent operations
            operations.push(
              request(app.toString())
                .post('/concurrent-operations')
                .send({ operationCount: 5 })
                .expect(200)
            );
            break;
        }
      }
      
      const responses = await Promise.all(operations);
      const endTime = Date.now();
      
      const totalTime = endTime - startTime;
      const averageTime = totalTime / operationCount;
      
      expect(responses).toHaveLength(operationCount);
      
      // All operations should complete successfully
      responses.forEach(response => {
        expect([200, 429]).toContain(response.status); // Allow rate limiting
      });
      
      expect(averageTime).toBeLessThan(500); // Average time per operation under 500ms
      
      console.log(`Mixed workload test: ${operationCount} operations in ${totalTime}ms, avg: ${averageTime.toFixed(2)}ms per operation`);
    });
  });

  describe('Stress Tests', () => {
    it('should handle extreme load without system failure', async () => {
      const extremeRequestCount = 5000;
      const concurrentBatches = 50;
      const requestsPerBatch = extremeRequestCount / concurrentBatches;
      
      console.log(`Starting extreme load test: ${extremeRequestCount} requests in ${concurrentBatches} batches`);
      
      const startTime = Date.now();
      const results = [];
      
      for (let batch = 0; batch < concurrentBatches; batch++) {
        const batchPromises = Array.from({ length: requestsPerBatch }, () =>
          request(app.toString())
            .get('/health')
            .then(response => ({ status: response.status, success: response.status === 200 }))
            .catch(error => ({ status: 'error', success: false, error: error.message }))
        );
        
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Small delay between batches to prevent overwhelming
        await new Promise(resolve => setTimeout(resolve, 10));
      }
      
      const endTime = Date.now();
      
      const successfulRequests = results.filter(r => r.success);
      const failedRequests = results.filter(r => !r.success);
      
      expect(successfulRequests.length).toBeGreaterThan(extremeRequestCount * 0.95); // At least 95% success rate
      expect(failedRequests.length).toBeLessThan(extremeRequestCount * 0.05); // Less than 5% failure rate
      
      const totalTime = endTime - startTime;
      const requestsPerSecond = (successfulRequests.length / totalTime) * 1000;
      
      console.log(`Extreme load test: ${successfulRequests.length}/${extremeRequestCount} successful in ${totalTime}ms (${requestsPerSecond.toFixed(2)} RPS)`);
    });
  });

  afterAll(async () => {
    // Cleanup
    await request(app.toString())
      .post('/reset-test-data')
      .expect(200);
  });
});
