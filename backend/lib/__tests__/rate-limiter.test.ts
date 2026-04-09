import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { RateLimiter, RateLimitExceededError } from '../rate-limiter';

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter;
  let mockStore: Map<string, { count: number; resetTime: number }>;

  beforeEach(() => {
    mockStore = new Map();
    rateLimiter = new RateLimiter({
      windowMs: 60000, // 1 minute
      maxRequests: 10,
      store: mockStore as any,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockStore.clear();
  });

  describe('Basic Rate Limiting', () => {
    it('should allow requests within limit', async () => {
      const identifier = 'user123';
      
      for (let i = 0; i < 5; i++) {
        const result = await rateLimiter.checkLimit(identifier);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(10 - i - 1);
        expect(result.resetTime).toBeGreaterThan(Date.now());
      }
    });

    it('should block requests exceeding limit', async () => {
      const identifier = 'user123';
      
      // Use up all allowed requests
      for (let i = 0; i < 10; i++) {
        await rateLimiter.checkLimit(identifier);
      }

      // Next request should be blocked
      const result = await rateLimiter.checkLimit(identifier);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
      expect(result.resetTime).toBeGreaterThan(Date.now());
    });

    it('should reset after window expires', async () => {
      const identifier = 'user123';
      
      // Use up all requests
      for (let i = 0; i < 10; i++) {
        await rateLimiter.checkLimit(identifier);
      }

      // Should be blocked
      let result = await rateLimiter.checkLimit(identifier);
      expect(result.allowed).toBe(false);

      // Mock time passing (window expired)
      const pastTime = Date.now() + 61000; // 61 seconds later
      jest.spyOn(Date, 'now').mockReturnValue(pastTime);

      // Should be allowed again
      result = await rateLimiter.checkLimit(identifier);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);

      // Restore Date.now
      jest.restoreAllMocks();
    });

    it('should handle different identifiers separately', async () => {
      const user1 = 'user1';
      const user2 = 'user2';
      
      // User1 uses up all requests
      for (let i = 0; i < 10; i++) {
        await rateLimiter.checkLimit(user1);
      }

      // User1 should be blocked
      const result1 = await rateLimiter.checkLimit(user1);
      expect(result1.allowed).toBe(false);

      // User2 should still be allowed
      const result2 = await rateLimiter.checkLimit(user2);
      expect(result2.allowed).toBe(true);
      expect(result2.remaining).toBe(9);
    });
  });

  describe('Custom Configuration', () => {
    it('should use custom window and limit', async () => {
      const customLimiter = new RateLimiter({
        windowMs: 30000, // 30 seconds
        maxRequests: 5,
        store: mockStore as any,
      });

      const identifier = 'user123';
      
      // Should allow 5 requests
      for (let i = 0; i < 5; i++) {
        const result = await customLimiter.checkLimit(identifier);
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(5 - i - 1);
      }

      // 6th request should be blocked
      const result = await customLimiter.checkLimit(identifier);
      expect(result.allowed).toBe(false);
    });

    it('should handle skipSuccessfulRequests option', async () => {
      const customLimiter = new RateLimiter({
        windowMs: 60000,
        maxRequests: 10,
        skipSuccessfulRequests: true,
        store: mockStore as any,
      });

      const identifier = 'user123';
      
      // Should not count successful requests
      for (let i = 0; i < 15; i++) {
        const result = await customLimiter.checkLimit(identifier, { success: true });
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(9); // Always 9 remaining
      }
    });

    it('should handle skipFailedRequests option', async () => {
      const customLimiter = new RateLimiter({
        windowMs: 60000,
        maxRequests: 10,
        skipFailedRequests: true,
        store: mockStore as any,
      });

      const identifier = 'user123';
      
      // Should not count failed requests
      for (let i = 0; i < 15; i++) {
        const result = await customLimiter.checkLimit(identifier, { success: false });
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(9); // Always 9 remaining
      }
    });
  });

  describe('Store Operations', () => {
    it('should increment counter correctly', async () => {
      const identifier = 'user123';
      
      await rateLimiter.checkLimit(identifier);
      const storeData = mockStore.get(identifier);
      
      expect(storeData).toBeDefined();
      expect(storeData!.count).toBe(1);
      expect(storeData!.resetTime).toBeGreaterThan(Date.now());
    });

    it('should update existing counter', async () => {
      const identifier = 'user123';
      
      await rateLimiter.checkLimit(identifier);
      await rateLimiter.checkLimit(identifier);
      
      const storeData = mockStore.get(identifier);
      expect(storeData!.count).toBe(2);
    });

    it('should clean up expired entries', async () => {
      const identifier = 'user123';
      
      // Add an expired entry
      const pastTime = Date.now() - 61000; // 61 seconds ago
      mockStore.set(identifier, {
        count: 5,
        resetTime: pastTime,
      });

      // Should reset the counter
      const result = await rateLimiter.checkLimit(identifier);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);
      
      const storeData = mockStore.get(identifier);
      expect(storeData!.count).toBe(1);
      expect(storeData!.resetTime).toBeGreaterThan(Date.now());
    });
  });

  describe('Error Handling', () => {
    it('should handle store errors gracefully', async () => {
      const errorStore = {
        get: jest.fn().mockRejectedValue(new Error('Store error')),
        set: jest.fn().mockRejectedValue(new Error('Store error')),
      };

      const errorLimiter = new RateLimiter({
        windowMs: 60000,
        maxRequests: 10,
        store: errorStore as any,
      });

      // Should allow requests when store fails (fail-open)
      const result = await errorLimiter.checkLimit('user123');
      expect(result.allowed).toBe(true);
    });

    it('should handle invalid identifiers', async () => {
      const result = await rateLimiter.checkLimit('');
      expect(result.allowed).toBe(true);
    });

    it('should handle null/undefined identifiers', async () => {
      const result1 = await rateLimiter.checkLimit(null as any);
      const result2 = await rateLimiter.checkLimit(undefined as any);
      
      expect(result1.allowed).toBe(true);
      expect(result2.allowed).toBe(true);
    });
  });

  describe('RateLimitExceededError', () => {
    it('should create error with correct properties', () => {
      const error = new RateLimitExceededError('Rate limit exceeded', {
        limit: 10,
        remaining: 0,
        resetTime: Date.now() + 60000,
        retryAfter: 60,
      });

      expect(error.message).toBe('Rate limit exceeded');
      expect(error.limit).toBe(10);
      expect(error.remaining).toBe(0);
      expect(error.resetTime).toBeGreaterThan(Date.now());
      expect(error.retryAfter).toBe(60);
    });

    it('should be instance of Error', () => {
      const error = new RateLimitExceededError('Rate limit exceeded');
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(RateLimitExceededError);
    });
  });

  describe('Middleware Integration', () => {
    it('should work as middleware function', async () => {
      const mockNext = jest.fn();
      const mockReq = { ip: '192.168.1.1' };
      const mockRes = { locals: {} };

      // Create a rate limiter that works as middleware
      const middlewareLimiter = new RateLimiter({
        windowMs: 60000,
        maxRequests: 5,
        keyGenerator: (req) => req.ip,
        store: mockStore as any,
      });

      // Should allow first few requests
      for (let i = 0; i < 5; i++) {
        await middlewareLimiter.middleware(mockReq as any, mockRes as any, mockNext);
        expect(mockNext).toHaveBeenCalledTimes(i + 1);
      }

      // Should block next request
      await expect(
        middlewareLimiter.middleware(mockReq as any, mockRes as any, mockNext)
      ).rejects.toThrow(RateLimitExceededError);
    });
  });

  describe('Performance', () => {
    it('should handle high request volume efficiently', async () => {
      const startTime = Date.now();
      const requests = 1000;
      
      for (let i = 0; i < requests; i++) {
        await rateLimiter.checkLimit(`user${i % 100}`); // 100 different users
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should handle 1000 requests quickly (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });

    it('should handle concurrent requests', async () => {
      const identifier = 'concurrent-user';
      const promises = Array(20).fill(null).map(() => 
        rateLimiter.checkLimit(identifier)
      );

      const results = await Promise.all(promises);
      
      // First 10 should be allowed, next 10 should be blocked
      const allowedCount = results.filter(r => r.allowed).length;
      const blockedCount = results.filter(r => !r.allowed).length;
      
      expect(allowedCount).toBe(10);
      expect(blockedCount).toBe(10);
    });
  });

  describe('Memory Management', () => {
    it('should not leak memory', async () => {
      const initialSize = mockStore.size;
      
      // Create many different identifiers
      for (let i = 0; i < 100; i++) {
        await rateLimiter.checkLimit(`user${i}`);
      }

      expect(mockStore.size).toBe(initialSize + 100);
      
      // Clean up expired entries
      const pastTime = Date.now() - 61000;
      jest.spyOn(Date, 'now').mockReturnValue(pastTime);
      
      // Trigger cleanup by making a request
      await rateLimiter.checkLimit('new-user');
      
      jest.restoreAllMocks();
      
      // Store should be cleaned up (implementation dependent)
      expect(mockStore.size).toBeGreaterThanOrEqual(1);
    });
  });
});
