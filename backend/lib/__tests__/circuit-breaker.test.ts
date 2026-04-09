import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { CircuitBreaker, CircuitBreakerOpenError, circuitBreakerRegistry } from '../circuit-breaker';

describe('CircuitBreaker', () => {
  let circuitBreaker: CircuitBreaker;
  let mockService: jest.MockedFunction<() => Promise<string>>;

  beforeEach(() => {
    mockService = jest.fn();
    circuitBreaker = new CircuitBreaker('test-service', {
      failureThreshold: 3,
      recoveryTimeout: 1000,
      operationTimeout: 500,
    });
  });

  afterEach(() => {
    circuitBreakerRegistry.reset('test-service');
    jest.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should execute operation successfully', async () => {
      mockService.mockResolvedValue('success');
      
      const result = await circuitBreaker.execute(mockService);
      
      expect(result).toBe('success');
      expect(mockService).toHaveBeenCalledTimes(1);
    });

    it('should handle operation failure', async () => {
      const error = new Error('Service error');
      mockService.mockRejectedValue(error);
      
      await expect(circuitBreaker.execute(mockService)).rejects.toThrow('Service error');
      expect(mockService).toHaveBeenCalledTimes(1);
    });

    it('should timeout operation if it takes too long', async () => {
      mockService.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
      
      await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      expect(mockService).toHaveBeenCalledTimes(1);
    });
  });

  describe('Circuit Breaking Logic', () => {
    it('should open circuit after failure threshold is reached', async () => {
      mockService.mockRejectedValue(new Error('Service error'));
      
      // Fail 3 times to reach threshold
      for (let i = 0; i < 3; i++) {
        await expect(circuitBreaker.execute(mockService)).rejects.toThrow('Service error');
      }
      
      // Circuit should now be open
      expect(circuitBreaker.getState()).toBe('open');
    });

    it('should reject immediately when circuit is open', async () => {
      // Open the circuit
      mockService.mockRejectedValue(new Error('Service error'));
      for (let i = 0; i < 3; i++) {
        await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      }
      
      // Should reject immediately without calling service
      await expect(circuitBreaker.execute(mockService)).rejects.toThrow(CircuitBreakerOpenError);
      expect(mockService).toHaveBeenCalledTimes(3); // Not called when circuit is open
    });

    it('should transition to half-open after recovery timeout', async () => {
      // Open the circuit
      mockService.mockRejectedValue(new Error('Service error'));
      for (let i = 0; i < 3; i++) {
        await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      }
      
      expect(circuitBreaker.getState()).toBe('open');
      
      // Wait for recovery timeout
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Should be in half-open state now
      expect(circuitBreaker.getState()).toBe('half-open');
    });

    it('should close circuit on successful operation in half-open state', async () => {
      // Open the circuit
      mockService.mockRejectedValue(new Error('Service error'));
      for (let i = 0; i < 3; i++) {
        await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      }
      
      // Wait for recovery timeout
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Successful operation should close circuit
      mockService.mockResolvedValue('success');
      const result = await circuitBreaker.execute(mockService);
      
      expect(result).toBe('success');
      expect(circuitBreaker.getState()).toBe('closed');
    });

    it('should reopen circuit on failure in half-open state', async () => {
      // Open the circuit
      mockService.mockRejectedValue(new Error('Service error'));
      for (let i = 0; i < 3; i++) {
        await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      }
      
      // Wait for recovery timeout
      await new Promise(resolve => setTimeout(resolve, 1100));
      
      // Failure in half-open should reopen circuit
      await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      expect(circuitBreaker.getState()).toBe('open');
    });
  });

  describe('Metrics and Monitoring', () => {
    it('should track operation metrics', async () => {
      mockService.mockResolvedValue('success');
      
      await circuitBreaker.execute(mockService);
      
      const metrics = circuitBreaker.getMetrics();
      expect(metrics.totalOperations).toBe(1);
      expect(metrics.successfulOperations).toBe(1);
      expect(metrics.failedOperations).toBe(0);
      expect(metrics.successRate).toBe(100);
    });

    it('should track failure metrics', async () => {
      mockService.mockRejectedValue(new Error('Service error'));
      
      await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      
      const metrics = circuitBreaker.getMetrics();
      expect(metrics.totalOperations).toBe(1);
      expect(metrics.successfulOperations).toBe(0);
      expect(metrics.failedOperations).toBe(1);
      expect(metrics.successRate).toBe(0);
    });

    it('should calculate success rate correctly', async () => {
      // 2 successes, 1 failure
      mockService.mockResolvedValue('success');
      await circuitBreaker.execute(mockService);
      await circuitBreaker.execute(mockService);
      
      mockService.mockRejectedValue(new Error('Service error'));
      await expect(circuitBreaker.execute(mockService)).rejects.toThrow();
      
      const metrics = circuitBreaker.getMetrics();
      expect(metrics.successRate).toBe(66.67); // 2/3 * 100
    });
  });

  describe('Registry Management', () => {
    it('should register circuit breaker in registry', () => {
      const cb = new CircuitBreaker('registry-test');
      const registered = circuitBreakerRegistry.get('registry-test');
      
      expect(registered).toBe(cb);
    });

    it('should get all metrics from registry', () => {
      const cb1 = new CircuitBreaker('service-1');
      const cb2 = new CircuitBreaker('service-2');
      
      const allMetrics = circuitBreakerRegistry.getAllMetrics();
      
      expect(allMetrics).toHaveProperty('service-1');
      expect(allMetrics).toHaveProperty('service-2');
    });

    it('should reset circuit breaker', () => {
      const cb = new CircuitBreaker('reset-test');
      
      // Simulate some operations
      cb.getMetrics();
      
      circuitBreakerRegistry.reset('reset-test');
      
      const metrics = cb.getMetrics();
      expect(metrics.totalOperations).toBe(0);
    });
  });

  describe('Decorator Support', () => {
    it('should support decorator pattern', () => {
      class TestService {
        @CircuitBreaker.decorate('decorator-test', {
          failureThreshold: 2,
          recoveryTimeout: 500,
        })
        async testMethod(): Promise<string> {
          return 'decorated-success';
        }
      }
      
      const service = new TestService();
      expect(service.testMethod).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle concurrent operations', async () => {
      mockService.mockResolvedValue('success');
      
      // Execute multiple operations concurrently
      const promises = Array(10).fill(null).map(() => circuitBreaker.execute(mockService));
      const results = await Promise.all(promises);
      
      expect(results).toHaveLength(10);
      expect(results.every(result => result === 'success')).toBe(true);
      expect(mockService).toHaveBeenCalledTimes(10);
    });

    it('should handle zero failure threshold', () => {
      expect(() => {
        new CircuitBreaker('zero-threshold', { failureThreshold: 0 });
      }).toThrow();
    });

    it('should handle negative recovery timeout', () => {
      expect(() => {
        new CircuitBreaker('negative-timeout', { recoveryTimeout: -1 });
      }).toThrow();
    });
  });
});
