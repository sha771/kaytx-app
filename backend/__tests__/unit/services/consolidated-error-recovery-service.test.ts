/**
 * Comprehensive Unit Tests for Consolidated Error Recovery Service
 * Tests all functionality including circuit breakers, retry logic, and recovery strategies
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ConsolidatedErrorRecoveryService } from '../../../services/consolidated-error-recovery-service';
import { db } from '../../../db/connection';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { EventEmitter } from 'events';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../services/consolidated-audit-service');

describe('ConsolidatedErrorRecoveryService', () => {
  let errorRecoveryService: ConsolidatedErrorRecoveryService;
  let mockDb: any;
  let mockAuditService: any;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock database
    mockDb = {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      values: jest.fn().mockReturnThis(),
      onConflictDoUpdate: jest.fn().mockReturnThis(),
      update: jest.fn().mockReturnThis(),
      set: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnThis(),
      execute: jest.fn().mockResolvedValue({}),
    };

    // Mock audit service
    mockAuditService = {
      createAuditLog: jest.fn().mockResolvedValue({}),
    };

    // Use jest.requireMock to get the mocked db
    const mockedDb = jest.requireMock('../../../db/connection').db;
    Object.assign(mockedDb, mockDb);
    errorRecoveryService = new ConsolidatedErrorRecoveryService();
  });

  afterEach(async () => {
    await errorRecoveryService.cleanup();
  });

  describe('Circuit Breaker', () => {
    it('should create circuit breaker with default configuration', () => {
      const circuitBreaker = errorRecoveryService.createCircuitBreaker('test-service');

      expect(circuitBreaker).toBeDefined();
      expect(circuitBreaker.state).toBe('closed');
      expect(circuitBreaker.failureCount).toBe(0);
      expect(circuitBreaker.threshold).toBe(5);
    });

    it('should create circuit breaker with custom configuration', () => {
      const config = {
        threshold: 10,
        timeout: 60000,
        resetTimeout: 30000
      };

      const circuitBreaker = errorRecoveryService.createCircuitBreaker('test-service', config);

      expect(circuitBreaker.threshold).toBe(10);
      expect(circuitBreaker.timeout).toBe(60000);
      expect(circuitBreaker.resetTimeout).toBe(30000);
    });

    it('should open circuit breaker after threshold failures', async () => {
      const circuitBreaker = errorRecoveryService.createCircuitBreaker('test-service', {
        threshold: 3,
        resetTimeout: 1000
      });

      // Simulate failures
      for (let i = 0; i < 3; i++) {
        await circuitBreaker.execute(() => Promise.reject(new Error('Test error')));
      }

      expect(circuitBreaker.state).toBe('open');
    });

    it('should reject calls when circuit breaker is open', async () => {
      const circuitBreaker = errorRecoveryService.createCircuitBreaker('test-service', {
        threshold: 2,
        resetTimeout: 1000
      });

      // Open the circuit breaker
      for (let i = 0; i < 2; i++) {
        try {
          await circuitBreaker.execute(() => Promise.reject(new Error('Test error')));
        } catch (error) {
          // Expected failures
        }
      }

      // Should reject immediately when open
      await expect(circuitBreaker.execute(() => Promise.resolve('success')))
        .rejects.toThrow('Circuit breaker is open');
    });

    it('should reset circuit breaker after timeout', async () => {
      const circuitBreaker = errorRecoveryService.createCircuitBreaker('test-service', {
        threshold: 2,
        resetTimeout: 100 // Short timeout for testing
      });

      // Open the circuit breaker
      for (let i = 0; i < 2; i++) {
        try {
          await circuitBreaker.execute(() => Promise.reject(new Error('Test error')));
        } catch (error) {
          // Expected failures
        }
      }

      expect(circuitBreaker.state).toBe('open');

      // Wait for reset timeout
      await new Promise(resolve => setTimeout(resolve, 150));

      // Should now be in half-open state and allow one test
      const result = await circuitBreaker.execute(() => Promise.resolve('success'));

      expect(result).toBe('success');
      expect(circuitBreaker.state).toBe('closed');
    });

    it('should track circuit breaker metrics', async () => {
      const circuitBreaker = errorRecoveryService.createCircuitBreaker('test-service');

      // Execute some operations
      await circuitBreaker.execute(() => Promise.resolve('success'));
      try {
        await circuitBreaker.execute(() => Promise.reject(new Error('Test error')));
      } catch (error) {
        // Expected failure
      }

      const metrics = circuitBreaker.getMetrics();

      expect(metrics.totalCalls).toBe(2);
      expect(metrics.successfulCalls).toBe(1);
      expect(metrics.failedCalls).toBe(1);
      expect(metrics.failureRate).toBe(0.5);
    });
  });

  describe('Retry Logic', () => {
    it('should retry failed operations with exponential backoff', async () => {
      let attemptCount = 0;
      const failingOperation = jest.fn().mockImplementation(() => {
        attemptCount++;
        if (attemptCount < 3) {
          return Promise.reject(new Error('Temporary failure'));
        }
        return Promise.resolve('success');
      });

      const result = await errorRecoveryService.executeWithRetry(failingOperation, {
        maxAttempts: 3,
        baseDelay: 100,
        maxDelay: 1000
      });

      expect(result).toBe('success');
      expect(failingOperation).toHaveBeenCalledTimes(3);
    });

    it('should fail after max retry attempts', async () => {
      const alwaysFailingOperation = jest.fn().mockRejectedValue(new Error('Permanent failure'));

      await expect(errorRecoveryService.executeWithRetry(alwaysFailingOperation, {
        maxAttempts: 3,
        baseDelay: 10
      })).rejects.toThrow('Permanent failure');

      expect(alwaysFailingOperation).toHaveBeenCalledTimes(3);
    });

    it('should respect retry condition function', async () => {
      const retryCondition = jest.fn().mockImplementation((error) => {
        return error.message.includes('Retryable');
      });

      const retryableError = new Error('Retryable error');
      const nonRetryableError = new Error('Non-retryable error');

      const operation = jest.fn()
        .mockRejectedValueOnce(retryableError)
        .mockRejectedValueOnce(nonRetryableError);

      await expect(errorRecoveryService.executeWithRetry(operation, {
        maxAttempts: 3,
        retryCondition
      })).rejects.toThrow('Non-retryable error');

      expect(retryCondition).toHaveBeenCalledTimes(2);
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it('should implement jitter to prevent thundering herd', async () => {
      const delays: number[] = [];
      const originalSetTimeout = global.setTimeout;

      global.setTimeout = jest.fn().mockImplementation((callback, delay) => {
        delays.push(delay);
        return originalSetTimeout(callback, 0); // Execute immediately for testing
      });

      const failingOperation = jest.fn().mockRejectedValue(new Error('Test error'));

      await expect(errorRecoveryService.executeWithRetry(failingOperation, {
        maxAttempts: 3,
        baseDelay: 100,
        jitter: true
      })).rejects.toThrow();

      // Check that delays have jitter (not exactly the same)
      expect(delays.length).toBeGreaterThan(0);
      expect(delays.some(delay => delay !== 100)).toBe(true);

      global.setTimeout = originalSetTimeout;
    });
  });

  describe('Error Recovery Strategies', () => {
    it('should execute fallback strategy on failure', async () => {
      const primaryOperation = jest.fn().mockRejectedValue(new Error('Primary failed'));
      const fallbackOperation = jest.fn().mockResolvedValue('fallback result');

      const result = await errorRecoveryService.executeWithFallback(
        primaryOperation,
        fallbackOperation,
        { logFailures: true }
      );

      expect(result).toBe('fallback result');
      expect(primaryOperation).toHaveBeenCalledTimes(1);
      expect(fallbackOperation).toHaveBeenCalledTimes(1);
    });

    it('should try multiple fallback strategies in order', async () => {
      const primary = jest.fn().mockRejectedValue(new Error('Primary failed'));
      const fallback1 = jest.fn().mockRejectedValue(new Error('Fallback 1 failed'));
      const fallback2 = jest.fn().mockResolvedValue('fallback 2 result');

      const result = await errorRecoveryService.executeWithMultipleFallbacks(
        primary,
        [fallback1, fallback2]
      );

      expect(result).toBe('fallback 2 result');
      expect(primary).toHaveBeenCalledTimes(1);
      expect(fallback1).toHaveBeenCalledTimes(1);
      expect(fallback2).toHaveBeenCalledTimes(1);
    });

    it('should implement graceful degradation', async () => {
      const fullFeatureOperation = jest.fn().mockRejectedValue(new Error('Service unavailable'));
      const degradedFeatureOperation = jest.fn().mockResolvedValue('degraded result');
      const minimalFeatureOperation = jest.fn().mockResolvedValue('minimal result');

      const result = await errorRecoveryService.executeWithGracefulDegradation(
        fullFeatureOperation,
        degradedFeatureOperation,
        minimalFeatureOperation
      );

      expect(result).toBe('degraded result');
      expect(fullFeatureOperation).toHaveBeenCalledTimes(1);
      expect(degradedFeatureOperation).toHaveBeenCalledTimes(1);
      expect(minimalFeatureOperation).not.toHaveBeenCalled();
    });

    it('should implement timeout recovery', async () => {
      const slowOperation = jest.fn().mockImplementation(() => {
        return new Promise(resolve => setTimeout(resolve, 2000));
      });

      const fastOperation = jest.fn().mockResolvedValue('fast result');

      const result = await errorRecoveryService.executeWithTimeout(
        slowOperation,
        100, // 100ms timeout
        fastOperation
      );

      expect(result).toBe('fast result');
      expect(slowOperation).toHaveBeenCalledTimes(1);
      expect(fastOperation).toHaveBeenCalledTimes(1);
    });
  });

  describe('Error Logging and Tracking', () => {
    it('should log errors with context', async () => {
      const error = new Error('Test error');
      const context = {
        service: 'test-service',
        operation: 'test-operation',
        userId: 'user-123',
        requestId: 'req-123'
      };

      mockDb.execute.mockResolvedValue({ insertId: 'error-log-123' });

      const result = await errorRecoveryService.logError(error, context);

      expect(result).toBeDefined();
      expect(result.error).toBe(error.message);
      expect(result.stack).toBe(error.stack);
      expect(result.context).toEqual(context);
      expect(mockAuditService.createAuditLog).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'error.occurred',
          severity: 'error',
          status: 'failure'
        })
      );
    });

    it('should track error patterns', async () => {
      const mockErrorLogs = [
        {
          id: '1',
          error: 'Database connection failed',
          service: 'database-service',
          timestamp: new Date('2024-01-01T10:00:00Z'),
          count: 5
        },
        {
          id: '2',
          error: 'API timeout',
          service: 'external-api',
          timestamp: new Date('2024-01-01T10:05:00Z'),
          count: 3
        }
      ];

      mockDb.select.mockReturnValue(mockErrorLogs);

      const result = await errorRecoveryService.getErrorPatterns('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-02')
      });

      expect(result).toHaveLength(2);
      expect(result[0].error).toBe('Database connection failed');
      expect(result[0].count).toBe(5);
    });

    it('should identify error trends', async () => {
      const mockTrendData = [
        { date: '2024-01-01', errorCount: 10, errorRate: 0.05 },
        { date: '2024-01-02', errorCount: 15, errorRate: 0.07 },
        { date: '2024-01-03', errorCount: 8, errorRate: 0.04 }
      ];

      mockDb.select.mockReturnValue(mockTrendData);

      const result = await errorRecoveryService.getErrorTrends('org-123', {
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-03'),
        granularity: 'daily'
      });

      expect(result).toHaveLength(3);
      expect(result[0].errorCount).toBe(10);
      expect(result[0].errorRate).toBe(0.05);
    });
  });

  describe('Health Check Integration', () => {
    it('should perform health check with recovery', async () => {
      const healthCheckOperation = jest.fn()
        .mockRejectedValueOnce(new Error('Health check failed'))
        .mockResolvedValueOnce({ status: 'healthy' });

      const result = await errorRecoveryService.executeHealthCheck(healthCheckOperation, {
        maxAttempts: 2,
        retryDelay: 100
      });

      expect(result.status).toBe('healthy');
      expect(healthCheckOperation).toHaveBeenCalledTimes(2);
    });

    it('should mark service as unhealthy after repeated failures', async () => {
      const failingHealthCheck = jest.fn().mockRejectedValue(new Error('Always fails'));

      await expect(errorRecoveryService.executeHealthCheck(failingHealthCheck, {
        maxAttempts: 3
      })).rejects.toThrow();

      const healthStatus = errorRecoveryService.getServiceHealth('test-service');
      expect(healthStatus.status).toBe('unhealthy');
    });

    it('should automatically recover unhealthy services', async () => {
      const serviceId = 'test-service';
      const recoveringOperation = jest.fn()
        .mockRejectedValueOnce(new Error('Still failing'))
        .mockResolvedValueOnce({ status: 'healthy' });

      // Mark service as unhealthy
      errorRecoveryService.markServiceUnhealthy(serviceId);

      // Attempt recovery
      const result = await errorRecoveryService.attemptServiceRecovery(serviceId, recoveringOperation);

      expect(result.status).toBe('healthy');
      const healthStatus = errorRecoveryService.getServiceHealth(serviceId);
      expect(healthStatus.status).toBe('healthy');
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk operations with partial failures', async () => {
      const operations = [
        jest.fn().mockResolvedValue('success 1'),
        jest.fn().mockRejectedValue(new Error('Failed 2')),
        jest.fn().mockResolvedValue('success 3'),
        jest.fn().mockRejectedValue(new Error('Failed 4'))
      ];

      const result = await errorRecoveryService.executeBulkOperations(operations, {
        continueOnError: true,
        maxConcurrency: 2
      });

      expect(result.successful).toHaveLength(2);
      expect(result.failed).toHaveLength(2);
      expect(result.successRate).toBe(0.5);
    });

    it('should implement bulk retry for failed operations', async () => {
      const operations = [
        jest.fn().mockRejectedValueOnce(new Error('Temporary fail')).mockResolvedValue('success 1'),
        jest.fn().mockRejectedValueOnce(new Error('Temporary fail')).mockResolvedValue('success 2'),
        jest.fn().mockResolvedValue('success 3')
      ];

      const result = await errorRecoveryService.executeBulkWithRetry(operations, {
        maxAttempts: 2,
        baseDelay: 10
      });

      expect(result.successful).toHaveLength(3);
      expect(result.failed).toHaveLength(0);
    });
  });

  describe('Configuration Management', () => {
    it('should update service configuration', async () => {
      const config = {
        circuitBreaker: { threshold: 10, timeout: 60000 },
        retry: { maxAttempts: 5, baseDelay: 200 },
        fallback: { enabled: true, timeout: 5000 }
      };

      await errorRecoveryService.updateServiceConfig('test-service', config);

      const serviceConfig = errorRecoveryService.getServiceConfig('test-service');
      expect(serviceConfig.circuitBreaker.threshold).toBe(10);
      expect(serviceConfig.retry.maxAttempts).toBe(5);
    });

    it('should load default configuration', async () => {
      const defaultConfig = errorRecoveryService.getDefaultConfig();

      expect(defaultConfig.circuitBreaker.threshold).toBe(5);
      expect(defaultConfig.retry.maxAttempts).toBe(3);
      expect(defaultConfig.fallback.enabled).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid configuration', async () => {
      const invalidConfig = {
        circuitBreaker: { threshold: -1 }, // Invalid
        retry: { maxAttempts: 0 } // Invalid
      };

      await expect(errorRecoveryService.updateServiceConfig('test-service', invalidConfig))
        .rejects.toThrow();
    });

    it('should handle circular fallback dependencies', async () => {
      const operation1 = jest.fn().mockRejectedValue(new Error('Op1 failed'));
      const operation2 = jest.fn().mockRejectedValue(new Error('Op2 failed'));

      await expect(errorRecoveryService.executeWithMultipleFallbacks(operation1, [operation2]))
        .rejects.toThrow();
    });

    it('should prevent infinite retry loops', async () => {
      const alwaysFailingOperation = jest.fn().mockRejectedValue(new Error('Always fails'));

      await expect(errorRecoveryService.executeWithRetry(alwaysFailingOperation, {
        maxAttempts: 3,
        baseDelay: 10
      })).rejects.toThrow();

      expect(alwaysFailingOperation).toHaveBeenCalledTimes(3); // Should not exceed max attempts
    });
  });

  describe('Performance', () => {
    it('should handle high error volumes efficiently', async () => {
      const errorOperations = Array(1000).fill(null).map((_, index) => 
        jest.fn().mockRejectedValue(new Error(`Error ${index}`))
      );

      const startTime = Date.now();
      const result = await errorRecoveryService.executeBulkOperations(errorOperations, {
        continueOnError: true,
        maxConcurrency: 10
      });
      const endTime = Date.now();

      expect(result.failed).toHaveLength(1000);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });

    it('should minimize overhead for successful operations', async () => {
      const successfulOperations = Array(100).fill(null).map(() => 
        jest.fn().mockResolvedValue('success')
      );

      const startTime = Date.now();
      const result = await errorRecoveryService.executeBulkOperations(successfulOperations);
      const endTime = Date.now();

      expect(result.successful).toHaveLength(100);
      expect(endTime - startTime).toBeLessThan(1000); // Should complete quickly
    });
  });

  describe('Resource Management', () => {
    it('should cleanup resources properly', async () => {
      const errorRecoveryService = new ConsolidatedErrorRecoveryService();
      
      // Create some circuit breakers and log errors
      errorRecoveryService.createCircuitBreaker('test-service');
      await errorRecoveryService.logError(new Error('Test error'), { service: 'test' });

      // Cleanup should not throw errors
      await expect(errorRecoveryService.cleanup()).resolves.not.toThrow();
    });

    it('should handle concurrent error recovery operations', async () => {
      const operations = Array(10).fill(null).map((_, index) => 
        errorRecoveryService.executeWithRetry(
          () => Promise.resolve(`success ${index}`),
          { maxAttempts: 1 }
        )
      );

      const results = await Promise.all(operations);

      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result).toMatch(/success \d+/);
      });
    });
  });
});
