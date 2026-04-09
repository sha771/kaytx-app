import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';

describe('Performance Tests', () => {
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
        name: 'Performance Test Organization',
        domain: 'perf-test.com',
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
        email: 'perf@example.com',
        name: 'Performance User',
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
        email: 'perf@example.com',
        password: 'testpassword',
      });

    authToken = loginResponse.body.token;

    // Create test data for performance testing
    await createTestData();
  });

  afterEach(async () => {
    // Clean up test data
    await db.delete().from('campaign_metrics').where('campaign_id', 'in', testCampaigns.map(c => c.id));
    await db.delete().from('campaigns').where('organization_id', '=', organizationId);
    await db.delete().from('leads').where('organization_id', '=', organizationId);
    await db.delete().from('audit_trail').where('organization_id', '=', organizationId);
    await db.delete().from('users').where('id', '=', userId);
    await db.delete().from('organizations').where('id', '=', organizationId);
  });

  async function createTestData() {
    // Create test campaigns
    for (let i = 0; i < 50; i++) {
      const campaign = await db.insert({
        into: 'campaigns',
        values: {
          organization_id: organizationId,
          name: `Performance Test Campaign ${i}`,
          subject: `Test Subject ${i}`,
          content: `Test content ${i}`,
          status: 'sent',
          total_sent: Math.floor(Math.random() * 1000),
          total_opened: Math.floor(Math.random() * 500),
          total_clicked: Math.floor(Math.random() * 200),
          created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
        returning: ['id'],
      });
      testCampaigns.push(campaign[0]);
    }

    // Create test leads
    for (let i = 0; i < 200; i++) {
      const lead = await db.insert({
        into: 'leads',
        values: {
          organization_id: organizationId,
          email: `lead${i}@example.com`,
          first_name: `Lead${i}`,
          last_name: `Test${i}`,
          company: `Company ${i}`,
          status: ['new', 'contacted', 'qualified', 'converted'][Math.floor(Math.random() * 4)],
          score: Math.floor(Math.random() * 100),
          source: ['website', 'referral', 'social', 'email'][Math.floor(Math.random() * 4)],
          created_at: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
          updated_at: new Date(),
        },
        returning: ['id'],
      });
      testLeads.push(lead[0]);
    }
  }

  describe('API Response Time Performance', () => {
    it('should respond to campaign list within acceptable time', async () => {
      const startTime = Date.now();
      
      const response = await request(app)
        .get('/api/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should respond to lead list within acceptable time', async () => {
      const startTime = Date.now();
      
      const response = await request(app)
        .get('/api/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(responseTime).toBeLessThan(1500); // Should respond within 1.5 seconds
      expect(response.body).toHaveProperty('data');
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should handle paginated requests efficiently', async () => {
      const pageSizes = [10, 25, 50, 100];

      for (const pageSize of pageSizes) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(`/api/leads?page=1&limit=${pageSize}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(responseTime).toBeLessThan(500); // Paginated requests should be faster
        expect(response.body.data.length).toBeLessThanOrEqual(pageSize);
        expect(response.body).toHaveProperty('pagination');
      }
    });

    it('should handle search queries efficiently', async () => {
      const searchQueries = [
        'Test',
        'Company',
        'lead',
        'Performance',
      ];

      for (const query of searchQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(`/api/leads?search=${query}`)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        expect(responseTime).toBeLessThan(800); // Search should be fast
        expect(response.body).toHaveProperty('data');
      }
    });
  });

  describe('Concurrent Request Handling', () => {
    it('should handle concurrent campaign requests', async () => {
      const concurrentRequests = 20;
      const promises = [];

      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          request(app)
            .get('/api/campaigns')
            .set('Authorization', `Bearer ${authToken}`)
        );
      }

      const startTime = Date.now();
      const results = await Promise.all(promises);
      const endTime = Date.now();

      const totalTime = endTime - startTime;
      const averageTime = totalTime / concurrentRequests;

      // All requests should succeed
      results.forEach(response => {
        expect(response.status).toBe(200);
      });

      // Average time per request should be reasonable
      expect(averageTime).toBeLessThan(200);
      
      // Total time should be much less than sequential execution
      expect(totalTime).toBeLessThan(concurrentRequests * 500);
    });

    it('should handle concurrent lead creation', async () => {
      const concurrentRequests = 10;
      const promises = [];

      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          request(app)
            .post('/api/leads')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              email: `concurrent${i}@example.com`,
              first_name: `Concurrent${i}`,
              last_name: 'User',
              company: 'Test Company',
            })
        );
      }

      const startTime = Date.now();
      const results = await Promise.all(promises);
      const endTime = Date.now();

      // All requests should succeed
      results.forEach(response => {
        expect(response.status).toBe(201);
      });

      const totalTime = endTime - startTime;
      expect(totalTime).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it('should handle mixed concurrent operations', async () => {
      const operations = [
        () => request(app).get('/api/campaigns').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/leads').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/analytics/dashboard').set('Authorization', `Bearer ${authToken}`),
        () => request(app).get('/api/users').set('Authorization', `Bearer ${authToken}`),
      ];

      const promises = [];
      for (let i = 0; i < 20; i++) {
        const operation = operations[i % operations.length];
        promises.push(operation());
      }

      const startTime = Date.now();
      const results = await Promise.all(promises);
      const endTime = Date.now();

      // All requests should succeed
      results.forEach(response => {
        expect([200, 201]).toContain(response.status);
      });

      const totalTime = endTime - startTime;
      expect(totalTime).toBeLessThan(3000); // Should complete within 3 seconds
    });
  });

  describe('Database Performance', () => {
    it('should use database indexes efficiently', async () => {
      // Test filtered queries that should use indexes
      const filteredQueries = [
        '/api/campaigns?status=sent',
        '/api/leads?status=qualified',
        '/api/leads?source=website',
        '/api/campaigns?created_after=2024-01-01',
      ];

      for (const query of filteredQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Filtered queries should be fast due to indexes
        expect(responseTime).toBeLessThan(300);
      }
    });

    it('should handle large dataset queries', async () => {
      // Test aggregation queries
      const aggregationQueries = [
        '/api/analytics/campaigns/performance',
        '/api/analytics/leads/conversion',
        '/api/analytics/dashboard',
      ];

      for (const query of aggregationQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Aggregation queries should complete within reasonable time
        expect(responseTime).toBeLessThan(2000);
        expect(response.body).toHaveProperty('data');
      }
    });

    it('should handle complex joins efficiently', async () => {
      // Test endpoints that require complex joins
      const complexQueries = [
        '/api/campaigns/with-metrics',
        '/api/leads/with-activities',
        '/api/analytics/reports/detailed',
      ];

      for (const query of complexQueries) {
        const startTime = Date.now();
        
        const response = await request(app)
          .get(query)
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        const endTime = Date.now();
        const responseTime = endTime - startTime;

        // Complex queries should still be reasonably fast
        expect(responseTime).toBeLessThan(3000);
      }
    });
  });

  describe('Memory Usage', () => {
    it('should not leak memory during repeated requests', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // Make many requests
      for (let i = 0; i < 100; i++) {
        await request(app)
          .get('/api/campaigns')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);

        await request(app)
          .get('/api/leads')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
      }

      // Force garbage collection if available
      if (global.gc) {
        global.gc();
      }

      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // Memory increase should be reasonable (less than 50MB)
      expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);
    });

    it('should handle large response payloads efficiently', async () => {
      // Request large dataset
      const response = await request(app)
        .get('/api/leads?limit=100')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Response should be properly structured
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.data)).toBe(true);
      
      // Response size should be reasonable
      const responseSize = JSON.stringify(response.body).length;
      expect(responseSize).toBeLessThan(1024 * 1024); // Less than 1MB
    });
  });

  describe('Cache Performance', () => {
    it('should cache frequently accessed data', async () => {
      // First request - should be slower
      const startTime1 = Date.now();
      await request(app)
        .get('/api/organizations/current')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      const firstRequestTime = Date.now() - startTime1;

      // Second request - should be faster due to caching
      const startTime2 = Date.now();
      await request(app)
        .get('/api/organizations/current')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
      const secondRequestTime = Date.now() - startTime2;

      // Second request should be significantly faster
      expect(secondRequestTime).toBeLessThan(firstRequestTime * 0.5);
    });

    it('should invalidate cache appropriately', async () => {
      // Get initial data
      const initialResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const initialName = initialResponse.body.name;

      // Update data
      await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Name',
        })
        .expect(200);

      // Get updated data
      const updatedResponse = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      // Should get updated data, not cached version
      expect(updatedResponse.body.name).toBe('Updated Name');
      expect(updatedResponse.body.name).not.toBe(initialName);
    });
  });

  describe('Load Testing', () => {
    it('should handle sustained load', async () => {
      const duration = 10000; // 10 seconds
      const requestInterval = 100; // 100ms between requests
      let requestCount = 0;
      let errorCount = 0;
      const responseTimes = [];

      const startTime = Date.now();
      
      const interval = setInterval(async () => {
        try {
          const requestStart = Date.now();
          await request(app)
            .get('/api/campaigns')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
          
          const requestTime = Date.now() - requestStart;
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

      const totalTime = Date.now() - startTime;
      const requestsPerSecond = (requestCount / totalTime) * 1000;
      const averageResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const errorRate = (errorCount / (requestCount + errorCount)) * 100;

      // Performance assertions
      expect(requestsPerSecond).toBeGreaterThan(5); // Should handle at least 5 req/sec
      expect(averageResponseTime).toBeLessThan(500); // Average response time under 500ms
      expect(errorRate).toBeLessThan(5); // Error rate under 5%
    });

    it('should handle peak load gracefully', async () => {
      const peakRequests = 50;
      const promises = [];

      for (let i = 0; i < peakRequests; i++) {
        promises.push(
          request(app)
            .get('/api/health')
            .expect(200)
        );
      }

      const startTime = Date.now();
      const results = await Promise.allSettled(promises);
      const endTime = Date.now();

      const successfulRequests = results.filter(r => r.status === 'fulfilled').length;
      const failedRequests = results.filter(r => r.status === 'rejected').length;
      const totalTime = endTime - startTime;

      // Should handle peak load with minimal failures
      expect(successfulRequests).toBeGreaterThan(peakRequests * 0.9); // At least 90% success
      expect(failedRequests).toBeLessThan(peakRequests * 0.1); // Less than 10% failure
      expect(totalTime).toBeLessThan(10000); // Should complete within 10 seconds
    });
  });

  describe('Resource Usage', () => {
    it('should limit CPU usage during intensive operations', async () => {
      // Perform CPU-intensive operation
      const startTime = Date.now();
      const startCPU = process.cpuUsage();

      // Make many requests to a complex endpoint
      const promises = [];
      for (let i = 0; i < 20; i++) {
        promises.push(
          request(app)
            .get('/api/analytics/dashboard')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
        );
      }

      await Promise.all(promises);
      
      const endTime = Date.now();
      const endCPU = process.cpuUsage(startCPU);
      const totalTime = endTime - startTime;

      // CPU usage should be reasonable
      const cpuPercent = ((endCPU.user + endCPU.system) / totalTime) * 100;
      expect(cpuPercent).toBeLessThan(80); // Should not exceed 80% CPU
    });

    it('should handle file uploads efficiently', async () => {
      // Test file upload performance
      const largeData = 'x'.repeat(1024 * 1024); // 1MB of data
      
      const startTime = Date.now();
      
      const response = await request(app)
        .post('/api/import/leads')
        .set('Authorization', `Bearer ${authToken}`)
        .attach('file', Buffer.from(largeData), 'leads.csv')
        .expect(200);

      const endTime = Date.now();
      const uploadTime = endTime - startTime;

      // File upload should be efficient
      expect(uploadTime).toBeLessThan(5000); // Should complete within 5 seconds
      expect(response.body).toHaveProperty('imported_count');
    });
  });
});
