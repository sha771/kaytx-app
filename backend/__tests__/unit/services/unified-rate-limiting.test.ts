/**
 * Unified Rate Limiting Unit Tests
 */

import { 
  UnifiedRateLimiter, 
  unifiedRateLimiters, 
  checkRateLimit, 
  resetRateLimit,
  cleanupExpiredEntries,
  RateLimitPresets,
  createHonoRateLimitMiddleware,
  createSimpleHonoRateLimit
} from '../../../lib/unified-rate-limiting';

describe('Unified Rate Limiting', () => {
  describe('UnifiedRateLimiter Class', () => {
    let limiter: UnifiedRateLimiter;

    beforeEach(() => {
      limiter = new UnifiedRateLimiter({
        windowMs: 60000, // 1 minute
        maxRequests: 10,
      });
    });

    afterEach(() => {
      limiter.destroy();
    });

    it('should allow requests within limit', async () => {
      const req = { ip: '192.168.1.1' };

      for (let i = 0; i < 10; i++) {
        const allowed = await limiter.isAllowed(req);
        expect(allowed).toBe(true);
      }
    });

    it('should block requests exceeding limit', async () => {
      const req = { ip: '192.168.1.2' };

      // Use up all allowed requests
      for (let i = 0; i < 10; i++) {
        await limiter.isAllowed(req);
      }

      // Next request should be blocked
      const allowed = await limiter.isAllowed(req);
      expect(allowed).toBe(false);
    });

    it('should reset after window expires', async () => {
      const req = { ip: '192.168.1.3' };
      
      // Use up all requests
      for (let i = 0; i < 10; i++) {
        await limiter.isAllowed(req);
      }

      // Should be blocked
      let allowed = await limiter.isAllowed(req);
      expect(allowed).toBe(false);

      // Wait for window to expire (mock time passing)
      jest.useFakeTimers();
      jest.advanceTimersByTime(61000); // 61 seconds

      // Should be allowed again
      allowed = await limiter.isAllowed(req);
      expect(allowed).toBe(true);

      jest.useRealTimers();
    });

    it('should handle different clients separately', async () => {
      const req1 = { ip: '192.168.1.4' };
      const req2 = { ip: '192.168.1.5' };

      // Use up all requests for client 1
      for (let i = 0; i < 10; i++) {
        await limiter.isAllowed(req1);
      }

      // Client 1 should be blocked
      const allowed1 = await limiter.isAllowed(req1);
      expect(allowed1).toBe(false);

      // Client 2 should still be allowed
      const allowed2 = await limiter.isAllowed(req2);
      expect(allowed2).toBe(true);
    });

    it('should use custom key generator', async () => {
      const customLimiter = new UnifiedRateLimiter({
        windowMs: 60000,
        maxRequests: 5,
        keyGenerator: (req) => req.userId || req.ip,
      });

      const req1 = { userId: 'user123' };
      const req2 = { userId: 'user123' };
      const req3 = { ip: '192.168.1.6' };

      // Use up requests for user123
      for (let i = 0; i < 5; i++) {
        await customLimiter.isAllowed(req1);
      }

      // Both requests with same userId should be blocked
      const allowed1 = await customLimiter.isAllowed(req1);
      const allowed2 = await customLimiter.isAllowed(req2);
      expect(allowed1).toBe(false);
      expect(allowed2).toBe(false);

      // Different IP should still be allowed
      const allowed3 = await customLimiter.isAllowed(req3);
      expect(allowed3).toBe(true);

      customLimiter.destroy();
    });

    it('should provide correct status information', async () => {
      const req = { ip: '192.168.1.7' };

      // Check initial status
      let status = limiter.getStatus(req);
      expect(status.remaining).toBe(10);
      expect(status.resetTime).toBeGreaterThan(Date.now());

      // Make some requests
      for (let i = 0; i < 3; i++) {
        await limiter.isAllowed(req);
      }

      // Check updated status
      status = limiter.getStatus(req);
      expect(status.remaining).toBe(7);

      // Use up all requests
      for (let i = 0; i < 7; i++) {
        await limiter.isAllowed(req);
      }

      // Check final status
      status = limiter.getStatus(req);
      expect(status.remaining).toBe(0);
    });
  });

  describe('Predefined Rate Limiters', () => {
    it('should have all required predefined limiters', () => {
      expect(unifiedRateLimiters.general).toBeDefined();
      expect(unifiedRateLimiters.auth).toBeDefined();
      expect(unifiedRateLimiters.passwordReset).toBeDefined();
      expect(unifiedRateLimiters.fileUpload).toBeDefined();
      expect(unifiedRateLimiters.apiIntegration).toBeDefined();
      expect(unifiedRateLimiters.export).toBeDefined();
    });

    it('should have appropriate limits for each limiter', () => {
      expect(unifiedRateLimiters.auth.config.maxRequests).toBe(5);
      expect(unifiedRateLimiters.auth.config.windowMs).toBe(15 * 60 * 1000); // 15 minutes

      expect(unifiedRateLimiters.general.config.maxRequests).toBe(100);
      expect(unifiedRateLimiters.general.config.windowMs).toBe(60000); // 1 minute

      expect(unifiedRateLimiters.passwordReset.config.maxRequests).toBe(3);
      expect(unifiedRateLimiters.passwordReset.config.windowMs).toBe(60 * 60 * 1000); // 1 hour
    });
  });

  describe('Simple Rate Limiting Function', () => {
    beforeEach(() => {
      // Clear any existing rate limits
      resetRateLimit('test-identifier');
    });

    it('should allow requests within preset limits', () => {
      const result = checkRateLimit('test-identifier', RateLimitPresets.MODERATE);
      
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(29); // 30 - 1
      expect(result.resetAt).toBeGreaterThan(Date.now());
    });

    it('should block requests exceeding preset limits', () => {
      // Use up all requests
      for (let i = 0; i < 30; i++) {
        checkRateLimit('test-identifier', RateLimitPresets.MODERATE);
      }

      const result = checkRateLimit('test-identifier', RateLimitPresets.MODERATE);
      
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should handle different identifiers separately', () => {
      // Use up requests for first identifier
      for (let i = 0; i < 30; i++) {
        checkRateLimit('identifier1', RateLimitPresets.MODERATE);
      }

      // First identifier should be blocked
      const result1 = checkRateLimit('identifier1', RateLimitPresets.MODERATE);
      expect(result1.allowed).toBe(false);

      // Second identifier should still be allowed
      const result2 = checkRateLimit('identifier2', RateLimitPresets.MODERATE);
      expect(result2.allowed).toBe(true);
    });

    it('should reset rate limits manually', () => {
      // Use up some requests
      for (let i = 0; i < 10; i++) {
        checkRateLimit('test-identifier', RateLimitPresets.MODERATE);
      }

      // Should have remaining requests
      let result = checkRateLimit('test-identifier', RateLimitPresets.MODERATE);
      expect(result.remaining).toBe(19);

      // Reset and check
      resetRateLimit('test-identifier');
      result = checkRateLimit('test-identifier', RateLimitPresets.MODERATE);
      expect(result.remaining).toBe(29);
    });

    it('should use different presets correctly', () => {
      const strictResult = checkRateLimit('strict-test', RateLimitPresets.STRICT);
      expect(strictResult.remaining).toBe(9); // 10 - 1

      const relaxedResult = checkRateLimit('relaxed-test', RateLimitPresets.RELAXED);
      expect(relaxedResult.remaining).toBe(99); // 100 - 1
    });
  });

  describe('Hono Middleware', () => {
    let mockContext: any;
    let mockNext: jest.Mock;

    beforeEach(() => {
      mockNext = jest.fn().mockResolvedValue(undefined);
      mockContext = {
        req: {
          header: jest.fn(),
        },
        header: jest.fn(),
        json: jest.fn(),
        get: jest.fn(),
      };
    });

    it('should create Hono middleware from limiter', async () => {
      const middleware = createHonoRateLimitMiddleware(unifiedRateLimiters.auth);
      
      mockContext.req.header.mockReturnValue('192.168.1.8');
      mockContext.get.mockReturnValue({ userId: 'user123' });

      await middleware(mockContext, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockContext.header).toHaveBeenCalledWith('X-RateLimit-Limit', '5');
      expect(mockContext.header).toHaveBeenCalledWith('X-RateLimit-Remaining', expect.any(String));
      expect(mockContext.header).toHaveBeenCalledWith('X-RateLimit-Reset', expect.any(String));
    });

    it('should block requests when limit exceeded', async () => {
      const middleware = createHonoRateLimitMiddleware(unifiedRateLimiters.auth);
      
      mockContext.req.header.mockReturnValue('192.168.1.9');
      mockContext.get.mockReturnValue({ userId: 'user456' });
      mockContext.json.mockReturnValue({ status: 429 });

      // Use up all requests
      for (let i = 0; i < 5; i++) {
        await middleware(mockContext, mockNext);
      }

      // Reset mock for the blocked request
      mockNext.mockClear();
      mockContext.json.mockClear();

      // Next request should be blocked
      await middleware(mockContext, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Too Many Requests',
          message: expect.any(String),
          retryAfter: expect.any(Number),
        }),
        429
      );
    });

    it('should create simple Hono rate limit', async () => {
      const middleware = createSimpleHonoRateLimit('STRICT');
      
      mockContext.req.header.mockReturnValue('192.168.1.10');
      mockContext.get.mockReturnValue(undefined); // No auth context

      await middleware(mockContext, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockContext.header).toHaveBeenCalledWith('X-RateLimit-Limit', '10');
      expect(mockContext.header).toHaveBeenCalledWith('X-RateLimit-Remaining', '9');
    });

    it('should use userId when available in simple rate limit', async () => {
      const middleware = createSimpleHonoRateLimit('MODERATE');
      
      mockContext.req.header.mockReturnValue('192.168.1.11');
      mockContext.get.mockReturnValue({ userId: 'user789' });

      await middleware(mockContext, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockContext.header).toHaveBeenCalledWith('X-RateLimit-Limit', '30');
    });
  });

  describe('Cleanup and Maintenance', () => {
    it('should cleanup expired entries', () => {
      // Create some rate limits
      checkRateLimit('cleanup-test-1', RateLimitPresets.MODERATE);
      checkRateLimit('cleanup-test-2', RateLimitPresets.MODERATE);

      // Mock time passage to expire entries
      jest.useFakeTimers();
      jest.advanceTimersByTime(61 * 1000); // 61 seconds

      cleanupExpiredEntries();

      // Entries should be cleaned up (new requests should start fresh)
      const result1 = checkRateLimit('cleanup-test-1', RateLimitPresets.MODERATE);
      const result2 = checkRateLimit('cleanup-test-2', RateLimitPresets.MODERATE);

      expect(result1.remaining).toBe(29);
      expect(result2.remaining).toBe(29);

      jest.useRealTimers();
    });

    it('should destroy limiter and cleanup intervals', () => {
      const limiter = new UnifiedRateLimiter({
        windowMs: 60000,
        maxRequests: 10,
      });

      expect(() => limiter.destroy()).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should handle requests without IP address', async () => {
      const limiter = new UnifiedRateLimiter({
        windowMs: 60000,
        maxRequests: 10,
      });

      const req = {}; // No IP address

      // Should not throw and should use 'unknown' as key
      const allowed = await limiter.isAllowed(req);
      expect(allowed).toBe(true);

      limiter.destroy();
    });

    it('should handle malformed headers in middleware', async () => {
      const middleware = createHonoRateLimitMiddleware(unifiedRateLimiters.general);
      
      mockContext.req.header.mockReturnValue(null);
      mockContext.get.mockReturnValue(undefined);

      await middleware(mockContext, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle JSON parsing errors in middleware', async () => {
      const middleware = createHonoRateLimitMiddleware(unifiedRateLimiters.general);
      
      mockContext.req.header.mockReturnValue('192.168.1.12');
      mockContext.get.mockReturnValue({ userId: 'user999' });
      mockContext.req.json = jest.fn().mockRejectedValue(new Error('Invalid JSON'));

      await middleware(mockContext, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle concurrent requests correctly', async () => {
      const limiter = new UnifiedRateLimiter({
        windowMs: 60000,
        maxRequests: 5,
      });

      const req = { ip: '192.168.1.13' };

      // Make concurrent requests
      const promises = Array.from({ length: 10 }, () => limiter.isAllowed(req));
      const results = await Promise.all(promises);

      // First 5 should be allowed, next 5 should be blocked
      const allowedCount = results.filter(r => r).length;
      expect(allowedCount).toBe(5);

      limiter.destroy();
    });
  });

  describe('Rate Limit Presets', () => {
    it('should have all required presets', () => {
      expect(RateLimitPresets.STRICT).toBeDefined();
      expect(RateLimitPresets.MODERATE).toBeDefined();
      expect(RateLimitPresets.RELAXED).toBeDefined();
      expect(RateLimitPresets.API).toBeDefined();
      expect(RateLimitPresets.AUTH).toBeDefined();
      expect(RateLimitPresets.EXPORT).toBeDefined();
      expect(RateLimitPresets.FILE_UPLOAD).toBeDefined();
      expect(RateLimitPresets.INTEGRATION).toBeDefined();
    });

    it('should have appropriate preset values', () => {
      expect(RateLimitPresets.STRICT.maxRequests).toBe(10);
      expect(RateLimitPresets.MODERATE.maxRequests).toBe(30);
      expect(RateLimitPresets.RELAXED.maxRequests).toBe(100);
      expect(RateLimitPresets.AUTH.maxRequests).toBe(5);
      expect(RateLimitPresets.EXPORT.maxRequests).toBe(3);
      expect(RateLimitPresets.INTEGRATION.maxRequests).toBe(1000);
    });

    it('should have consistent window durations', () => {
      const oneMinute = 60000;
      const fiveMinutes = 5 * oneMinute;
      const oneHour = 60 * oneMinute;

      expect(RateLimitPresets.STRICT.windowMs).toBe(oneMinute);
      expect(RateLimitPresets.MODERATE.windowMs).toBe(oneMinute);
      expect(RateLimitPresets.RELAXED.windowMs).toBe(oneMinute);
      expect(RateLimitPresets.AUTH.windowMs).toBe(fiveMinutes);
      expect(RateLimitPresets.EXPORT.windowMs).toBe(oneHour);
    });
  });
});
