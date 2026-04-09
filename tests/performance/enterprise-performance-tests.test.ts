import { describe, it, expect, beforeEach, jest, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';
import { performance } from 'perf_hooks';

describe('Enterprise Performance Tests', () => {
  let authToken: string;
  let organizationId: string;
  let testUsers: any[] = [];
  let testProjects: any[] = [];

  beforeEach(async () => {
    // Create test organization
    const orgResult = await db.insert({
      name: 'Performance Test Org',
      domain: 'perf-test.com',
      settings: {
        performanceMonitoring: true,
        cacheEnabled: true,
        connectionPooling: true,
      },
    }).returning();
    organizationId = orgResult[0].id;

    // Create admin user
    const adminResult = await db.insert({
      email: 'admin@perf-test.com',
      name: 'Performance Admin',
      organizationId,
      role: 'admin',
      status: 'active',
    }).returning();

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@perf-test.com',
        password: 'AdminPassword123!',
      });

    authToken = loginResponse.body.token;

    // Create test data
    await createTestData();
  });

  afterEach(async () => {
    // Cleanup test data
    await cleanupTestData();
  });

  async function createTestData() {
    // Create test users
    for (let i = 0; i < 100; i++) {
      const userResult = await db.insert({
        email: `user${i}@perf-test.com`,
        name: `Performance User ${i}`,
        organizationId,
        role: 'employee',
        status: 'active',
      }).returning();
      testUsers.push(userResult[0]);
    }

    // Create test projects
    for (let i = 0; i < 50; i++) {
      const projectResult = await db.insert({
        name: `Performance Project ${i}`,
        description: `Test project ${i} for performance testing`,
        organizationId,
        status: 'active',
      }).returning();
      testProjects.push(projectResult[0]);
    }
  }

  async function cleanupTestData() {
    // Clean up test data
    await db.delete().where(eq('organizationId', organizationId));
    await db.delete().where(eq('id', organizationId));
    testUsers = [];
    testProjects = [];
  }

  describe('Database Performance', () => {
    it('should handle high-volume read operations efficiently', async () => {
      const startTime = performance.now();
      const concurrentReads = 1000;
      const promises = [];

      for (let i = 0; i < concurrentReads; i++) {
        promises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
            .query({ page: Math.floor(i / 20) + 1, limit: 20 })
        );
      }

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // All requests should succeed
      results.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Performance should be acceptable
      expect(duration).toBeLessThan(10000); // 10 seconds for 1000 reads
      expect(duration / concurrentReads).toBeLessThan(10); // Average < 10ms per request
    });

    it('should handle complex queries with joins efficiently', async () => {
      const startTime = performance.now();

      // Complex query with multiple joins
      const complexQueryResponse = await request(app)
        .get('/api/analytics/comprehensive')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          includeUsers: true,
          includeProjects: true,
          includeActivities: true,
          dateRange: '90d',
          groupBy: ['department', 'role'],
          metrics: ['active_users', 'project_completion', 'activity_frequency'],
        });

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(complexQueryResponse.status).toBe(200);
      expect(complexQueryResponse.body.data).toBeDefined();
      expect(duration).toBeLessThan(5000); // Complex query should complete in < 5 seconds
    });

    it('should handle bulk insert operations efficiently', async () => {
      const bulkData = [];
      const insertCount = 1000;

      for (let i = 0; i < insertCount; i++) {
        bulkData.push({
          name: `Bulk Item ${i}`,
          description: `Description for bulk item ${i}`,
          category: `Category ${i % 10}`,
          value: Math.random() * 1000,
        });
      }

      const startTime = performance.now();

      const bulkInsertResponse = await request(app)
        .post('/api/data/bulk-insert')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          data: bulkData,
          batchSize: 100,
        });

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(bulkInsertResponse.status).toBe(201);
      expect(bulkInsertResponse.body.data.inserted).toBe(insertCount);
      expect(duration).toBeLessThan(10000); // 1000 inserts in < 10 seconds
    });

    it('should maintain performance under database load', async () => {
      // Simulate database load with concurrent operations
      const loadTestDuration = 30000; // 30 seconds
      const startTime = performance.now();
      const operations = [];

      while (performance.now() - startTime < loadTestDuration) {
        // Mix of read and write operations
        operations.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );

        operations.push(
          request(app)
            .post('/api/projects')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              name: `Load Test Project ${Date.now()}`,
              description: 'Project created during load test',
            })
        );

        // Small delay to prevent overwhelming
        await new Promise(resolve => setTimeout(resolve, 10));
      }

      const results = await Promise.allSettled(operations);
      const successCount = results.filter(r => 
        r.status === 'fulfilled' && r.value.status < 400
      ).length;

      // At least 90% of operations should succeed
      expect(successCount / operations.length).toBeGreaterThan(0.9);
    });
  });

  describe('API Performance', () => {
    it('should handle high concurrent request load', async () => {
      const concurrentRequests = 500;
      const promises = [];

      const startTime = performance.now();

      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const results = await Promise.all(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Analyze response times
      const responseTimes = results.map(r => r.responseTime || 0);
      const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const maxResponseTime = Math.max(...responseTimes);
      const p95ResponseTime = responseTimes.sort((a, b) => a - b)[Math.floor(responseTimes.length * 0.95)];

      expect(results.every(r => r.status === 200)).toBe(true);
      expect(avgResponseTime).toBeLessThan(100); // Average < 100ms
      expect(maxResponseTime).toBeLessThan(1000); // Max < 1 second
      expect(p95ResponseTime).toBeLessThan(200); // 95th percentile < 200ms
      expect(duration).toBeLessThan(15000); // All requests in < 15 seconds
    });

    it('should maintain performance with large payloads', async () => {
      // Create large payload
      const largePayload = {
        name: 'Large Payload Test',
        items: [],
        metadata: {},
      };

      // Add 1000 items to payload
      for (let i = 0; i < 1000; i++) {
        largePayload.items.push({
          id: i,
          title: `Item ${i}`,
          description: `Description for item ${i}`.repeat(10),
          data: new Array(100).fill(`data-${i}`),
        });
      }

      // Add metadata
      for (let i = 0; i < 100; i++) {
        largePayload.metadata[`key${i}`] = `value${i}`.repeat(50);
      }

      const startTime = performance.now();

      const response = await request(app)
        .post('/api/data/large-payload')
        .set('Authorization', `Bearer ${authToken}`)
        .send(largePayload);

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(response.status).toBe(201);
      expect(duration).toBeLessThan(5000); // Large payload processed in < 5 seconds
    });

    it('should handle file upload performance', async () => {
      // Create large file buffer (10MB)
      const largeFile = Buffer.alloc(10 * 1024 * 1024, 'x');

      const startTime = performance.now();

      const response = await request(app)
        .post('/api/files/upload')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', largeFile, 'large-file.txt')
        .field('description', 'Large file upload test');

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(response.status).toBe(201);
      expect(response.body.data.size).toBe(10 * 1024 * 1024);
      expect(duration).toBeLessThan(10000); // 10MB upload in < 10 seconds
    });

    it('should optimize API response compression', async () => {
      // Request without compression
      const uncompressedResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Accept-Encoding', 'identity');

      // Request with compression
      const compressedResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('Accept-Encoding', 'gzip, deflate');

      expect(uncompressedResponse.status).toBe(200);
      expect(compressedResponse.status).toBe(200);

      // Compressed response should be smaller
      const uncompressedSize = JSON.stringify(uncompressedResponse.body).length;
      const compressedSize = compressedResponse.headers['content-length'] || 0;

      if (compressedSize > 0) {
        expect(compressedSize).toBeLessThan(uncompressedSize);
      }
    });
  });

  describe('Cache Performance', () => {
    it('should demonstrate effective caching strategies', async () => {
      // First request (cache miss)
      const firstRequestStart = performance.now();
      const firstResponse = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      const firstRequestDuration = performance.now() - firstRequestStart;

      expect(firstResponse.status).toBe(200);

      // Second request (cache hit)
      const secondRequestStart = performance.now();
      const secondResponse = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      const secondRequestDuration = performance.now() - secondRequestStart;

      expect(secondResponse.status).toBe(200);

      // Cache hit should be significantly faster
      expect(secondRequestDuration).toBeLessThan(firstRequestDuration * 0.5);

      // Verify cache headers
      expect(secondResponse.headers['cache-control']).toBeDefined();
      expect(secondResponse.headers['etag']).toBeDefined();
    });

    it('should handle cache invalidation properly', async () => {
      // Load data into cache
      await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      // Update data (should invalidate cache)
      await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          email: 'newuser@perf-test.com',
          name: 'New User',
          role: 'employee',
        });

      // Request updated data
      const updatedResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      expect(updatedResponse.status).toBe(200);
      expect(updatedResponse.body.data.length).toBeGreaterThan(testUsers.length);
    });

    it('should handle distributed cache scenarios', async () => {
      // Simulate multiple cache nodes
      const cacheNodes = ['node1', 'node2', 'node3'];
      const promises = [];

      for (const node of cacheNodes) {
        promises.push(
          request(app)
            .get('/api/analytics/dashboard')
            .set('Authorization', `Bearer ${authToken}`)
            .set('X-Cache-Node', node)
        );
      }

      const results = await Promise.all(promises);

      // All requests should succeed
      results.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Verify cache consistency across nodes
      const responses = results.map(r => JSON.stringify(r.body.data));
      expect(new Set(responses).size).toBe(1); // All responses should be identical
    });
  });

  describe('Memory and Resource Management', () => {
    it('should handle memory-intensive operations efficiently', async () => {
      const initialMemory = process.memoryUsage();

      // Perform memory-intensive operations
      const promises = [];
      for (let i = 0; i < 100; i++) {
        promises.push(
          request(app)
            .post('/api/data/memory-intensive')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              size: 1024 * 1024, // 1MB per request
              operations: 1000,
            })
        );
      }

      await Promise.all(promises);

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage();
      const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

      // Memory increase should be reasonable (< 100MB for 100MB of data processed)
      expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024);
    });

    it('should handle connection pooling efficiently', async () => {
      const concurrentConnections = 200;
      const promises = [];

      for (let i = 0; i < concurrentConnections; i++) {
        promises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const startTime = performance.now();
      const results = await Promise.all(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // All requests should succeed without connection errors
      results.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Performance should be good with connection pooling
      expect(duration).toBeLessThan(10000); // 200 requests in < 10 seconds
    });

    it('should handle resource cleanup properly', async () => {
      // Create temporary resources
      const createResponse = await request(app)
        .post('/api/resources/temporary')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'temporary_file',
          ttl: 60, // 60 seconds
        });

      expect(createResponse.status).toBe(201);
      const resourceId = createResponse.body.data.id;

      // Verify resource exists
      const getResponse = await request(app)
        .get(`/api/resources/${resourceId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(getResponse.status).toBe(200);

      // Force cleanup
      const cleanupResponse = await request(app)
        .post('/api/resources/cleanup')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ force: true });

      expect(cleanupResponse.status).toBe(200);
      expect(cleanupResponse.body.data.cleaned).toBeGreaterThan(0);

      // Verify resource is cleaned up
      const verifyResponse = await request(app)
        .get(`/api/resources/${resourceId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(verifyResponse.status).toBe(404);
    });
  });

  describe('Scalability Tests', () => {
    it('should handle horizontal scaling scenarios', async () => {
      // Simulate multiple application instances
      const instances = ['instance-1', 'instance-2', 'instance-3'];
      const requestsPerInstance = 100;
      const promises = [];

      for (const instance of instances) {
        for (let i = 0; i < requestsPerInstance; i++) {
          promises.push(
            request(app)
              .get('/api/users')
              .set('Authorization', `Bearer ${authToken}`)
              .set('X-Instance-ID', instance)
          );
        }
      }

      const startTime = performance.now();
      const results = await Promise.all(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;

      // All requests should succeed
      results.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Performance should scale with instances
      expect(duration).toBeLessThan(15000); // 300 requests across 3 instances in < 15 seconds
    });

    it('should handle database read replicas', async () => {
      // Direct read requests to replica
      const readReplicaResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-DB-Target', 'replica');

      expect(readReplicaResponse.status).toBe(200);

      // Direct write requests to master
      const writeMasterResponse = await request(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-DB-Target', 'master')
        .send({
          email: 'replica-test@perf-test.com',
          name: 'Replica Test User',
          role: 'employee',
        });

      expect(writeMasterResponse.status).toBe(201);

      // Read from replica should eventually show new data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for replication

      const replicatedResponse = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-DB-Target', 'replica');

      expect(replicatedResponse.status).toBe(200);
      expect(replicatedResponse.body.data.length).toBeGreaterThan(testUsers.length);
    });

    it('should handle auto-scaling scenarios', async () => {
      // Simulate load trigger for auto-scaling
      const loadTestPromises = [];
      const initialLoad = 50;
      const scaledLoad = 200;

      // Initial load
      for (let i = 0; i < initialLoad; i++) {
        loadTestPromises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const initialResults = await Promise.all(loadTestPromises);
      const initialAvgTime = initialResults.reduce((sum, r) => sum + (r.responseTime || 0), 0) / initialResults.length;

      // Scaled load (simulating auto-scaling)
      const scaledPromises = [];
      for (let i = 0; i < scaledLoad; i++) {
        scaledPromises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const scaledResults = await Promise.all(scaledPromises);
      const scaledAvgTime = scaledResults.reduce((sum, r) => sum + (r.responseTime || 0), 0) / scaledResults.length;

      // Response times should remain reasonable despite increased load
      expect(scaledAvgTime).toBeLessThan(initialAvgTime * 2); // Not more than 2x slower
    });
  });

  describe('Performance Monitoring', () => {
    it('should provide comprehensive performance metrics', async () => {
      // Generate some activity
      await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`);

      await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Performance Test Project' });

      // Get performance metrics
      const metricsResponse = await request(app)
        .get('/api/performance/metrics')
        .set('Authorization', `Bearer ${authToken}`)
        .query({
          timeRange: '1h',
          metrics: ['response_time', 'throughput', 'error_rate', 'memory_usage'],
        });

      expect(metricsResponse.status).toBe(200);
      expect(metricsResponse.body.data).toHaveProperty('response_time');
      expect(metricsResponse.body.data).toHaveProperty('throughput');
      expect(metricsResponse.body.data).toHaveProperty('error_rate');
      expect(metricsResponse.body.data).toHaveProperty('memory_usage');
    });

    it('should detect performance anomalies', async () => {
      // Simulate slow operation
      await request(app)
        .post('/api/performance/slow-operation')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ delay: 5000 }); // 5 second delay

      // Check for performance alerts
      const alertsResponse = await request(app)
        .get('/api/performance/alerts')
        .set('Authorization', `Bearer ${authToken}`);

      expect(alertsResponse.status).toBe(200);
      expect(alertsResponse.body.data.length).toBeGreaterThan(0);

      const slowOperationAlert = alertsResponse.body.data.find(
        alert => alert.type === 'slow_operation'
      );
      expect(slowOperationAlert).toBeDefined();
      expect(slowOperationAlert.severity).toBe('warning');
    });

    it('should provide performance recommendations', async () => {
      const recommendationsResponse = await request(app)
        .get('/api/performance/recommendations')
        .set('Authorization', `Bearer ${authToken}`);

      expect(recommendationsResponse.status).toBe(200);
      expect(recommendationsResponse.body.data).toBeInstanceOf(Array);

      const recommendations = recommendationsResponse.body.data;
      expect(recommendations.length).toBeGreaterThan(0);

      // Verify recommendation structure
      const recommendation = recommendations[0];
      expect(recommendation).toHaveProperty('type');
      expect(recommendation).toHaveProperty('priority');
      expect(recommendation).toHaveProperty('description');
      expect(recommendation).toHaveProperty('impact');
    });
  });

  describe('Stress Testing', () => {
    it('should handle extreme load conditions', async () => {
      const extremeLoad = 1000;
      const promises = [];

      for (let i = 0; i < extremeLoad; i++) {
        promises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const startTime = performance.now();
      const results = await Promise.allSettled(promises);
      const endTime = performance.now();
      const duration = endTime - startTime;

      const successfulRequests = results.filter(r => 
        r.status === 'fulfilled' && r.value.status === 200
      ).length;

      // System should handle extreme load gracefully
      expect(successfulRequests / extremeLoad).toBeGreaterThan(0.8); // At least 80% success
      expect(duration).toBeLessThan(60000); // Complete within 1 minute
    });

    it('should recover from performance degradation', async () => {
      // Cause performance degradation
      const degradationPromises = [];
      for (let i = 0; i < 500; i++) {
        degradationPromises.push(
          request(app)
            .post('/api/performance/cpu-intensive')
            .set('Authorization', `Bearer ${authToken}`)
            .send({ iterations: 10000 })
        );
      }

      await Promise.all(degradationPromises);

      // Test recovery with normal operations
      const recoveryPromises = [];
      for (let i = 0; i < 100; i++) {
        recoveryPromises.push(
          request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const recoveryResults = await Promise.all(recoveryPromises);
      const successfulRecovery = recoveryResults.filter(r => r.status === 200).length;

      // System should recover and handle normal operations
      expect(successfulRecovery / recoveryPromises.length).toBeGreaterThan(0.95);
    });
  });
});
