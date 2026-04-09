/**
 * Load Testing Suite
 * Simulates high-load scenarios to test system scalability
 */

import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import { Hono } from 'hono';
import app from '../../hono';

describe('Load Testing', () => {
  let app: Hono;
  
  const loadTestConfig = {
    // Light load: Normal traffic
    light: {
      users: 10,
      requestsPerUser: 20,
      rampUpTime: 5000, // 5 seconds
      duration: 30000, // 30 seconds
    },
    // Medium load: Peak traffic
    medium: {
      users: 50,
      requestsPerUser: 50,
      rampUpTime: 10000, // 10 seconds
      duration: 60000, // 1 minute
    },
    // Heavy load: Stress testing
    heavy: {
      users: 100,
      requestsPerUser: 100,
      rampUpTime: 20000, // 20 seconds
      duration: 120000, // 2 minutes
    },
  };

  beforeAll(async () => {
    app = app;
  });

  describe('Light Load Tests', () => {
    test('Handles normal traffic patterns', async () => {
      const config = loadTestConfig.light;
      const results = await runLoadTest(config);

      expect(results.successRate).toBeGreaterThan(0.95); // 95% success rate
      expect(results.averageResponseTime).toBeLessThan(1000); // 1 second
      expect(results.errorRate).toBeLessThan(0.05); // 5% error rate
    });
  });

  describe('Medium Load Tests', () => {
    test('Handles peak traffic patterns', async () => {
      const config = loadTestConfig.medium;
      const results = await runLoadTest(config);

      expect(results.successRate).toBeGreaterThan(0.90); // 90% success rate
      expect(results.averageResponseTime).toBeLessThan(2000); // 2 seconds
      expect(results.errorRate).toBeLessThan(0.10); // 10% error rate
    });
  });

  describe('Heavy Load Tests', () => {
    test('Handles stress testing scenarios', async () => {
      const config = loadTestConfig.heavy;
      const results = await runLoadTest(config);

      expect(results.successRate).toBeGreaterThan(0.80); // 80% success rate
      expect(results.averageResponseTime).toBeLessThan(5000); // 5 seconds
      expect(results.errorRate).toBeLessThan(0.20); // 20% error rate
    });
  });

  describe('Sustained Load Tests', () => {
    test('Maintains performance over extended periods', async () => {
      const duration = 60000; // 1 minute
      const requestsPerSecond = 10;
      const responseTimes: number[] = [];
      const errors: number[] = [];

      const startTime = Date.now();
      let endTime = startTime;

      while (endTime - startTime < duration) {
        const requestStart = performance.now();
        try {
          const response = await app.request('/health');
          const requestEnd = performance.now();
          
          responseTimes.push(requestEnd - requestStart);
          if (response.status >= 400) {
            errors.push(response.status);
          }
        } catch (error) {
          errors.push(500);
        }

        await new Promise(resolve => setTimeout(resolve, 1000 / requestsPerSecond));
        endTime = Date.now();
      }

      const avgResponseTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const errorRate = errors.length / responseTimes.length;

      expect(avgResponseTime).toBeLessThan(1000);
      expect(errorRate).toBeLessThan(0.05);
    });
  });

  describe('Burst Load Tests', () => {
    test('Handles sudden traffic spikes', async () => {
      const burstSize = 50;
      const normalRate = 5; // requests per second
      const burstRate = 50; // requests per second

      // Baseline performance
      const baselineResults = await simulateLoad(normalRate, 10000);
      
      // Burst performance
      const burstResults = await simulateLoad(burstRate, 5000);
      
      // Recovery performance
      const recoveryResults = await simulateLoad(normalRate, 10000);

      expect(burstResults.successRate).toBeGreaterThan(0.70);
      expect(recoveryResults.successRate).toBeGreaterThan(baselineResults.successRate * 0.9);
    });
  });

  describe('Resource Exhaustion Tests', () => {
    test('Gracefully handles resource exhaustion', async () => {
      const concurrentRequests = 200;
      const largePayloadSize = 1024 * 1024; // 1MB
      const largePayload = 'x'.repeat(largePayloadSize);

      const requests = Array.from({ length: concurrentRequests }, () =>
        app.request('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: largePayload })
        })
      );

      const responses = await Promise.allSettled(requests);
      const successfulResponses = responses.filter(r => 
        r.status === 'fulfilled' && r.value.status < 500
      );

      // Should handle some requests even under resource pressure
      expect(successfulResponses.length).toBeGreaterThan(concurrentRequests * 0.3);
    });
  });

  // Helper functions
  async function runLoadTest(config: typeof loadTestConfig.light): Promise<{
    successRate: number;
    averageResponseTime: number;
    errorRate: number;
    totalRequests: number;
  }> {
    const results: { status: number; responseTime: number }[] = [];
    const users = Array.from({ length: config.users }, (_, i) => simulateUser(i, config));

    await Promise.all(users);

    function simulateUser(userId: number, testConfig: typeof loadTestConfig.light): Promise<void> {
      return new Promise(async (resolve) => {
        // Ramp up delay
        const rampUpDelay = (testConfig.rampUpTime / testConfig.users) * userId;
        await new Promise(delay => setTimeout(delay, rampUpDelay));

        const startTime = Date.now();
        let endTime = startTime;

        while (endTime - startTime < testConfig.duration) {
          for (let i = 0; i < testConfig.requestsPerUser; i++) {
            const requestStart = performance.now();
            try {
              const response = await app.request('/health');
              const requestEnd = performance.now();
              
              results.push({
                status: response.status,
                responseTime: requestEnd - requestStart
              });
            } catch (error) {
              results.push({
                status: 500,
                responseTime: performance.now() - requestStart
              });
            }

            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          endTime = Date.now();
        }
        resolve();
      });
    }

    const successfulRequests = results.filter(r => r.status < 400);
    const totalRequests = results.length;

    return {
      successRate: totalRequests > 0 ? successfulRequests.length / totalRequests : 0,
      averageResponseTime: totalRequests > 0 
        ? results.reduce((sum, r) => sum + r.responseTime, 0) / totalRequests 
        : 0,
      errorRate: totalRequests > 0 ? results.filter(r => r.status >= 400).length / totalRequests : 0,
      totalRequests
    };
  }

  async function simulateLoad(requestsPerSecond: number, durationMs: number): Promise<{
    successRate: number;
    averageResponseTime: number;
    totalRequests: number;
  }> {
    const results: { status: number; responseTime: number }[] = [];
    const interval = 1000 / requestsPerSecond;
    const startTime = Date.now();
    let endTime = startTime;

    while (endTime - startTime < durationMs) {
      const requestStart = performance.now();
      try {
        const response = await app.request('/health');
        const requestEnd = performance.now();
        
        results.push({
          status: response.status,
          responseTime: requestEnd - requestStart
        });
      } catch (error) {
        results.push({
          status: 500,
          responseTime: performance.now() - requestStart
        });
      }

      await new Promise(resolve => setTimeout(resolve, interval));
      endTime = Date.now();
    }

    const successfulRequests = results.filter(r => r.status < 400);

    return {
      successRate: results.length > 0 ? successfulRequests.length / results.length : 0,
      averageResponseTime: results.length > 0 
        ? results.reduce((sum, r) => sum + r.responseTime, 0) / results.length 
        : 0,
      totalRequests: results.length
    };
  }

  afterAll(async () => {
    // Cleanup
    if (global.gc) {
      global.gc();
    }
  });
});

// Load testing utilities
export class LoadTestRunner {
  private results: any[] = [];

  async runScenario(name: string, scenario: () => Promise<any>): Promise<any> {
    console.log(`Starting load test scenario: ${name}`);
    const startTime = Date.now();
    
    try {
      const result = await scenario();
      const endTime = Date.now();
      
      const testResult = {
        name,
        duration: endTime - startTime,
        success: true,
        result
      };
      
      this.results.push(testResult);
      console.log(`✅ Load test scenario completed: ${name} (${testResult.duration}ms)`);
      
      return testResult;
    } catch (error) {
      const endTime = Date.now();
      
      const testResult = {
        name,
        duration: endTime - startTime,
        success: false,
        error: error instanceof Error ? error.message : String(error)
      };
      
      this.results.push(testResult);
      console.log(`❌ Load test scenario failed: ${name} (${testResult.duration}ms)`);
      
      throw error;
    }
  }

  getResults(): any[] {
    return this.results;
  }

  generateReport(): string {
    const successfulTests = this.results.filter(r => r.success);
    const failedTests = this.results.filter(r => !r.success);
    
    return `
Load Test Report
================
Total Tests: ${this.results.length}
Successful: ${successfulTests.length}
Failed: ${failedTests.length}

Test Results:
${this.results.map(r => 
  `${r.success ? '✅' : '❌'} ${r.name}: ${r.duration}ms${r.error ? ` (${r.error})` : ''}`
).join('\n')}
    `.trim();
  }
}

export const loadTestRunner = new LoadTestRunner();
