import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Advanced Performance Tests', () => {
  let organizationId: string;
  let userId: string;
  let authToken: string;
  let testCampaigns: any[] = [];
  let testLeads: any[] = [];

  beforeEach(async () => {
    // Create test organization and user
    const orgResult = await db.insert({
      into: 'organizations',
      values: {
        name: 'Advanced Performance Test Organization',
        domain: 'advanced-perf-test.com',
        plan: 'enterprise',
        settings: {},
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    organizationId = orgResult[0].id;

    const userResult = await db.insert({
      into: 'users',
      values: {
        organization_id: organizationId,
        email: 'advanced-perf@example.com',
        name: 'Advanced Performance User',
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      returning: ['id'],
    });

    userId = userResult[0].id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'advanced-perf@example.com',
        password: 'testpassword',
      });

    authToken = loginResponse.body.token;

    // Create extensive test data
    await createExtensiveTestData();
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('campaign_metrics').where('campaign_id', 'in', testCampaigns.map(c => c.id));
    await db.delete().from('campaigns').where('organization_id', '=', organizationId);
    await db.delete().from('lead_activities').where('lead_id', 'in', testLeads.map(l => l.id));
    await db.delete().from('leads').where('organization_id', '=', organizationId);
    await db.delete().from('audit_trail').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('id', '=', userId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  async function createExtensiveTestData() {
    // Create 100 test campaigns
    for (let i = 0; i < 100; i++) {
      const campaign = await db.insert({
        into: 'campaigns',
        values: {
          organization_id: organizationId,
          name: `Performance Test Campaign ${i}`,
          subject: `Test Subject ${i}`,
          content: `Test content ${i}`,
          status: ['draft', 'sent', 'paused', 'completed'][Math.floor(Math.random() * 4)],
          total_sent: Math.floor(Math.random() * 5000),
          total_opened: Math.floor(Math.random() * 2500),
          total_clicked: Math.floor(Math.random() * 1000),
          created_at: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
        returning: ['id'],
      });
      testCampaigns.push(campaign[0]);
    }

    // Create 500 test leads
    for (let i = 0; i < 500; i++) {
      const lead = await db.insert({
        into: 'leads',
        values: {
          organization_id: organizationId,
          email: `lead${i}@example.com`,
          first_name: `Lead${i}`,
          last_name: `Test${i}`,
          company: `Company ${i % 50}`,
          status: ['new', 'contacted', 'qualified', 'converted', 'lost'][Math.floor(Math.random() * 5)],
          score: Math.floor(Math.random() * 100),
          source: ['website', 'referral', 'social', 'email', 'paid'][Math.floor(Math.random() * 5)],
          created_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
        returning: ['id'],
      });
      testLeads.push(lead[0]);
    }
  }

  describe('High-Volume Data Processing', () => {
    it('should handle large dataset queries efficiently', async () => {
      const queryTypes = [
        { path: '/api/campaigns', description: 'Campaign list' },
        { path: '/api/leads', description: 'Lead list' },
        { path: '/api/analytics/dashboard', description: 'Dashboard analytics' },
        { path: '/api/reports/performance', description: 'Performance reports' },
      ];

      for (const query of queryTypes) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query.path)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(responseTime).toBeLessThan(2000); // Should complete within 2 seconds
        expect(response.body).toHaveProperty('data');
        
        if (Array.isArray(response.body.data)) {
          expect(response.body.data.length).toBeGreaterThan(0);
        }
      }
    });

    it('should handle complex aggregation queries', async () => {
      const aggregationQueries = [
        '/api/analytics/campaigns/performance?period=90d',
        '/api/analytics/leads/conversion?group_by=source',
        '/api/analytics/revenue/monthly?year=2024',
        '/api/analytics/engagement/detailed',
      ];

      for (const query of aggregationQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(responseTime).toBeLessThan(3000); // Aggregation queries within 3 seconds
        expect(response.body).toHaveProperty('data');
      }
    });

    it('should handle bulk operations efficiently', async () => {
      // Test bulk lead creation
      const bulkLeads = Array.from({ length: 50 }, (_, i) => ({
        email: `bulk${i}@example.com`,
        first_name: `Bulk${i}`,
        last_name: `Lead${i}`,
        company: `Bulk Company ${i}`,
      }));

      const startTime = Date.now();
      
      const response = await request(app)
        .post('/api/leads/bulk')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ leads: bulkLeads })
        .expect(201);

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      expect(processingTime).toBeLessThan(5000); // Bulk operation within 5 seconds
      expect(response.body).toMatchObject({
        total_processed: 50,
        successful: expect.any(Number),
        failed: expect.any(Number),
      });
    });
  });

  describe('Concurrent User Simulation', () => {
    it('should handle 100 concurrent users', async () => {
      const concurrentUsers = 100;
      const requestsPerUser = 10;
      const promises = [];

      for (let user = 0; user < concurrentUsers; user++) {
        for (let req = 0; req < requestsPerUser; req++) {
          promises.push(
            request(app)
              .get('/api/campaigns')
              .set('Authorization', `Bearer ${authToken}`)
          );
        }
      }

      const startTime = Date.now();
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();

      const successfulRequests = results.filter(r => r.status === 'fulfilled' && r.value.status === 200);
      const failedRequests = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && r.value.status !== 200));

      const totalTime = endTime - startTime;
      const successRate = (successfulRequests.length / results.length) * 100;
      const averageResponseTime = totalTime / results.length;

      expect(successRate).toBeGreaterThan(95); // At least 95% success rate
      expect(failedRequests.length).toBeLessThan(results.length * 0.05); // Less than 5% failure rate
      expect(averageResponseTime).toBeLessThan(100); // Average response time under 100ms
    });

    it('should handle mixed concurrent operations', async () => {
      const operations = [
        () => request(app).get('/api/campaigns').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/leads').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/analytics/dashboard').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/users/profile').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/organizations/current').set('Authorization', `Bearer ${authToken}`),
      ];

      const concurrentRequests = 200;
      const promises = [];

      for (let i = 0; i < concurrentRequests; i++) {
        const operation = operations[i % operations.length];
        promises.push(operation());
      }

      const startTime = Date.now();
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();

      const successfulRequests = results.filter(r => r.status === 'fulfilled' && r.value.status === 200);
      const totalTime = endTime - startTime;

      expect(successfulRequests.length).toBeGreaterThan(concurrentRequests * 0.9); // At least 90% success
      expect(totalTime).toBeLessThan(10000); // Complete within 10 seconds
    });

    it('should handle concurrent write operations', async () => {
      const writeOperations = 50;
      const promises = [];

      for (let i = 0; i < writeOperations; i++) {
        promises.push(
          request(app)
            .post('/api/leads')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              email: `concurrent${i}@example.com`,
              first_name: `Concurrent${i}`,
              last_name: `User${i}`,
              company: 'Test Company',
            })
        );
      }

      const startTime = Date.now();
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();

      const successfulWrites = results.filter(r => r.status === 'fulfilled' && r.value.status === 201);
      const totalTime = endTime - startTime;

      expect(successfulWrites.length).toBeGreaterThan(writeOperations * 0.9); // At least 90% success
      expect(totalTime).toBeLessThan(15000); // Complete within 15 seconds
    });
  });

  describe('Memory and Resource Management', () => {
    it('should not leak memory during sustained load', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      const iterations = 50;
      const requestsPerIteration = 20;

      for (let i = 0; i < iterations; i++) {
        const promises = [];
        for (let j = 0; j < requestsPerIteration; j++) {
          promises.push(
            request(app)
              .get('/api/campaigns')
              .set('Authorization', `Bearer ${authToken}`)
          );
          promises.push(
            request(app)
              .get('/api/leads')
              .set('Authorization', `Bearer ${authToken}`)
          );
        }

        await Promise.all(promises);

        // Force garbage collection if available
        if (global.gc) {
          global.gc();
        }
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 100MB)
      expect(memoryIncrease).toBeLessThan(100 * 1024 * 1024);
    });

    it('should handle large response payloads efficiently', async () => {
      // Request large dataset
      const response = await request(app)
        .get('/api/leads?limit=200')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Response should be properly structured
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
      
      // Response size should be reasonable
      const responseSize = JSON.stringify(response.body).length;
      expect(responseSize).toBeLessThan(5 * 1024 * 1024); // Less than 5MB

      // Response time should be reasonable for large payload
      expect(response.headers['x-response-time']).toBeDefined();
    });

    it('should manage database connections efficiently', async () => {
      const concurrentDbOperations = 100;
      const promises = [];

      for (let i = 0; i < concurrentDbOperations; i++) {
        promises.push(
          request(app)
            .get(`/api/leads/${testLeads[i % testLeads.length].id}`)
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const startTime = Date.now();
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();

      const successfulOperations = results.filter(r => r.status === 'fulfilled' && r.value.status === 200);
      const totalTime = endTime - startTime;

      expect(successfulOperations.length).toBeGreaterThan(concurrentDbOperations * 0.9);
      expect(totalTime).toBeLessThan(5000); // Should complete within 5 seconds
    });
  });

  describe('Cache Performance', () => {
    it('should demonstrate cache hit rate improvement', async () => {
      // First request - cache miss
      const startTime1 = Date.now();
      await request(app)
        .get('/api/organizations/current')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      const firstRequestTime = Date.now() - startTime1;

      // Subsequent requests - should hit cache
      const cacheTimes = [];
      for (let i = 0; i < 10; i++) {
        const startTime = Date.now();
        await request(app)
          .get('/api/organizations/current')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
        cacheTimes.push(Date.now() - startTime);
      }

      const averageCacheTime = cacheTimes.reduce((a, b) => a + b, 0) / cacheTimes.length;

      // Cached requests should be significantly faster
      expect(averageCacheTime).toBeLessThan(firstRequestTime * 0.3);
    });

    it('should handle cache invalidation correctly', async () => {
      // Populate cache
      await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Update data (should invalidate cache)
      await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Name' })
        .expect(200);

      // Get updated data (should not return stale cache)
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.name).toBe('Updated Name');
    });

    it('should handle cache warming efficiently', async () => {
      // Trigger cache warming
      const warmResponse = await request(app)
        .post('/api/cache/warm')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(warmResponse.body).toMatchObject({
        warmed_keys: expect.any(Number),
        warming_time: expect.any(Number),
      });

      // Subsequent requests should be fast
      const startTime = Date.now();
      await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      const responseTime = Date.now() - startTime;

      expect(responseTime).toBeLessThan(200); // Should be very fast after warming
    });
  });

  describe('Scalability Testing', () => {
    it('should handle linear scaling with data volume', async () => {
      const dataVolumes = [10, 50, 100, 200];
      const responseTimes = [];

      for (const volume of dataVolumes) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(`/api/leads?limit=${volume}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;
        responseTimes.push(responseTime);

        expect(response.body.data.length).toBeLessThanOrEqual(volume);
      }

      // Response time should scale reasonably (not exponentially)
      for (let i = 1; i < responseTimes.length; i++) {
        const scalingFactor = responseTimes[i] / responseTimes[i - 1];
        const dataFactor = dataVolumes[i] / dataVolumes[i - 1];
        expect(scalingFactor).toBeLessThan(dataFactor * 1.5); // Should not scale worse than 1.5x data increase
      }
    });

    it('should maintain performance under sustained load', async () => {
      const duration = 30000; // 30 seconds
      const requestInterval = 50; // 50ms between requests
      let requestCount = 0;
      let errorCount = 0;
      const responseTimes = [];

      const interval = setInterval(async () => {
        try {
          const startTime = Date.now();
          await request(app)
            .get('/api/campaigns')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
          
          const requestTime = Date.now() - startTime;
          responseTimes.push(requestTime);
          requestCount++;
        } catch (error) {
          errorCount++;
        }
      }, requestInterval);

      setTimeout(() => {
        clearInterval(interval);
      }, duration);

      // Wait for test to complete
      await new Promise(resolve => setTimeout(resolve, duration + 1000));

      const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const errorRate = (errorCount / (requestCount + errorCount)) * 100;

      expect(averageResponseTime).toBeLessThan(300); // Average under 300ms
      expect(errorRate).toBeLessThan(2); // Error rate under 2%
      expect(requestCount).toBeGreaterThan(500); // Should handle significant load
    });

    it('should handle resource contention gracefully', async () => {
      // Simulate resource contention with CPU-intensive operations
      const cpuIntensivePromises = [];
      const normalPromises = [];

      // CPU-intensive operations
      for (let i = 0; i < 20; i++) {
        cpuIntensivePromises.push(
          request(app)
            .get('/api/analytics/reports/detailed')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      // Normal operations
      for (let i = 0; i < 50; i++) {
        normalPromises.push(
          request(app)
            .get('/api/campaigns')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const startTime = Date.now();
      const [cpuResults, normalResults] = await Promise.allSettled([
        Promise.allSettled(cpuIntensivePromises),
        Promise.allSettled(normalPromises),
      ]);
      const endTime = Date.now();

      const successfulCpuOps = cpuResults.value.filter(r => r.status === 'fulfilled' && r.value.status === 200);
      const successfulNormalOps = normalResults.value.filter(r => r.status === 'fulfilled' && r.value.status === 200);

      expect(successfulCpuOps.length).toBeGreaterThan(15); // Most CPU-intensive should succeed
      expect(successfulNormalOps.length).toBeGreaterThan(45); // Most normal should succeed
      expect(endTime - startTime).toBeLessThan(20000); // Should complete within 20 seconds
    });
  });

  describe('Database Performance Optimization', () => {
    it('should use database indexes effectively', async () => {
      const indexedQueries = [
        '/api/campaigns?status=sent',
        '/api/leads?status=qualified&source=website',
        '/api/analytics/campaigns?date_range=30d',
        '/api/users?role=admin',
      ];

      for (const query of indexedQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Indexed queries should be very fast
        expect(responseTime).toBeLessThan(200);
        expect(response.body).toHaveProperty('data');
      }
    });

    it('should handle complex joins efficiently', async () => {
      const complexQueries = [
        '/api/campaigns/with-metrics-and-leads',
        '/api/leads/with-activities-and-campaigns',
        '/api/analytics/comprehensive-report',
      ];

      for (const query of complexQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Complex queries should still be reasonable
        expect(responseTime).toBeLessThan(2000);
        expect(response.body).toHaveProperty('data');
      }
    });

    it('should demonstrate query optimization', async () => {
      // Test optimized vs unoptimized queries
      const optimizedQuery = '/api/leads?status=qualified&limit=50';
      const unoptimizedQuery = '/api/leads/search?query=qualified&limit=50';

      const startTime1 = Date.now();
      await request(app)
        .get(optimizedQuery)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      const optimizedTime = Date.now() - startTime1;

      const startTime2 = Date.now();
      await request(app)
        .get(unoptimizedQuery)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      const unoptimizedTime = Date.now() - startTime2;

      // Optimized query should be significantly faster
      expect(optimizedTime).toBeLessThan(unoptimizedTime * 0.5);
    });
  });

  describe('API Performance Monitoring', () => {
    it('should provide performance metrics', async () => {
      const metricsResponse = await request(app)
        .get('/api/performance/metrics')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(metricsResponse.body).toMatchObject({
        response_time_p95: expect.any(Number),
        response_time_p99: expect.any(Number),
        requests_per_second: expect.any(Number),
        error_rate: expect.any(Number),
        active_connections: expect.any(Number),
        memory_usage: expect.any(Number),
        cpu_usage: expect.any(Number),
      });
    });

    it('should track endpoint performance', async () => {
      // Make some requests to generate data
      for (let i = 0; i < 10; i++) {
        await request(app)
          .get('/api/campaigns')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
      }

      const endpointMetricsResponse = await request(app)
        .get('/api/performance/endpoints')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(endpointMetricsResponse.body).toMatchObject({
        endpoints: expect.arrayContaining([
          expect.objectContaining({
            path: '/api/campaigns',
            avg_response_time: expect.any(Number),
            request_count: expect.any(Number),
            error_rate: expect.any(Number),
          }),
        ]),
      });
    });

    it('should provide performance alerts', async () => {
      const alertsResponse = await request(app)
        .get('/api/performance/alerts')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(alertsResponse.body).toMatchObject({
        alerts: expect.any(Array),
        performance_score: expect.any(Number),
        recommendations: expect.any(Array),
      });
    });
  });
});
