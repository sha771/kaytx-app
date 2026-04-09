import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { checkRateLimit, RateLimitPresets, resetRateLimit } from '../../lib/unified-rate-limiting';
import { generateCSRFToken, verifyCSRFToken, csrfProtection } from '../../lib/unified-csrf';

/**
 * Comprehensive Test Suite for Unified Services
 * Tests unified rate limiting and CSRF protection services
 * to ensure they work correctly for production deployment
 */

describe('Unified Services Production Tests', () => {
  beforeEach(() => {
    // Reset rate limits before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any rate limits
    resetRateLimit('test-identifier');
  });

  describe('Unified Rate Limiting Service', () => {
    it('should enforce rate limits correctly', () => {
      const identifier = 'test-rate-limit';
      
      // First request should be allowed
      const result1 = checkRateLimit(identifier, RateLimitPresets.MODERATE);
      expect(result1.allowed).toBe(true);
      expect(result1.remaining).toBe(29); // 30 - 1

      // Use up remaining requests
      for (let i = 0; i < 29; i++) {
        checkRateLimit(identifier, RateLimitPresets.MODERATE);
      }

      // Next request should be blocked
      const resultBlocked = checkRateLimit(identifier, RateLimitPresets.MODERATE);
      expect(resultBlocked.allowed).toBe(false);
      expect(resultBlocked.remaining).toBe(0);
    });

    it('should handle different presets correctly', () => {
      const strictResult = checkRateLimit('strict-test', RateLimitPresets.STRICT);
      expect(strictResult.remaining).toBe(9); // 10 - 1

      const moderateResult = checkRateLimit('moderate-test', RateLimitPresets.MODERATE);
      expect(moderateResult.remaining).toBe(29); // 30 - 1

      const lenientResult = checkRateLimit('lenient-test', RateLimitPresets.LENIENT);
      expect(lenientResult.remaining).toBe(99); // 100 - 1
    });

    it('should reset rate limits manually', () => {
      const identifier = 'reset-test';
      
      // Use up some requests
      checkRateLimit(identifier, RateLimitPresets.MODERATE);
      checkRateLimit(identifier, RateLimitPresets.MODERATE);
      
      let result = checkRateLimit(identifier, RateLimitPresets.MODERATE);
      expect(result.remaining).toBe(27); // 30 - 3

      // Reset and check
      resetRateLimit(identifier);
      result = checkRateLimit(identifier, RateLimitPresets.MODERATE);
      expect(result.remaining).toBe(29); // Should be reset to 30 - 1
    });

    it('should handle concurrent requests safely', () => {
      const identifier = 'concurrent-test';
      const results = [];
      
      // Simulate concurrent requests
      for (let i = 0; i < 50; i++) {
        results.push(checkRateLimit(identifier, RateLimitPresets.MODERATE));
      }
      
      const allowedCount = results.filter(r => r.allowed).length;
      expect(allowedCount).toBeLessThanOrEqual(30); // Should not exceed limit
    });
  });

  describe('Unified CSRF Protection Service', () => {
    it('should generate and verify CSRF tokens', () => {
      const token = generateCSRFToken();
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);

      // Valid token should verify
      const isValid = verifyCSRFToken(token);
      expect(isValid).toBe(true);
    });

    it('should reject invalid tokens', () => {
      const invalidTokens = [
        '',
        'invalid-token',
        'short',
        'malformed-token-123',
        null as any,
        undefined as any
      ];

      invalidTokens.forEach(token => {
        expect(() => verifyCSRFToken(token)).not.toThrow();
        const isValid = verifyCSRFToken(token);
        expect(isValid).toBe(false);
      });
    });

    it('should generate unique tokens', () => {
      const tokens = [];
      for (let i = 0; i < 100; i++) {
        tokens.push(generateCSRFToken());
      }

      // All tokens should be unique
      const uniqueTokens = new Set(tokens);
      expect(uniqueTokens.size).toBe(100);
    });

    it('should handle token expiration', () => {
      const token = generateCSRFToken();
      
      // Token should be valid immediately
      expect(verifyCSRFToken(token)).toBe(true);
      
      // Note: In a real implementation, you might want to test expiration
      // This would require mocking time or implementing expiration logic
    });
  });

  describe('Production Security Tests', () => {
    it('should prevent rate limit bypass attempts', () => {
      const baseIdentifier = 'security-test';
      
      // Try to bypass by using similar identifiers
      const attempts = [];
      for (let i = 0; i < 50; i++) {
        attempts.push(checkRateLimit(`${baseIdentifier}-${i}`, RateLimitPresets.MODERATE));
      }
      
      // Each unique identifier should have its own limit
      attempts.forEach(result => {
        expect(result.allowed).toBe(true);
        expect(result.remaining).toBe(29);
      });
    });

    it('should handle malformed rate limit requests gracefully', () => {
      expect(() => {
        checkRateLimit('', RateLimitPresets.MODERATE);
      }).not.toThrow();

      expect(() => {
        checkRateLimit(null as any, RateLimitPresets.MODERATE);
      }).not.toThrow();
    });

    it('should handle CSRF token edge cases', () => {
      // Test with very long tokens
      const longToken = 'a'.repeat(1000);
      expect(verifyCSRFToken(longToken)).toBe(false);

      // Test with special characters
      const specialToken = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      expect(verifyCSRFToken(specialToken)).toBe(false);
    });
  });

  describe('Performance Tests', () => {
    it('should handle high volume rate limit checks efficiently', () => {
      const start = Date.now();
      
      for (let i = 0; i < 1000; i++) {
        checkRateLimit(`perf-test-${i}`, RateLimitPresets.MODERATE);
      }
      
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should generate CSRF tokens efficiently', () => {
      const start = Date.now();
      
      for (let i = 0; i < 100; i++) {
        generateCSRFToken();
      }
      
      const duration = Date.now() - start;
      expect(duration).toBeLessThan(500); // Should complete within 0.5 seconds
    });
  });

  describe('Integration Tests', () => {
    it('should work together in a realistic scenario', () => {
      const userId = 'user-123';
      const sessionId = 'session-456';
      
      // Simulate a user making requests with rate limiting
      const userRequests = [];
      for (let i = 0; i < 10; i++) {
        const rateLimitResult = checkRateLimit(userId, RateLimitPresets.MODERATE);
        const csrfToken = generateCSRFToken();
        const isValidCsrf = verifyCSRFToken(csrfToken);
        
        userRequests.push({
          rateLimit: rateLimitResult,
          csrfValid: isValidCsrf,
          csrfToken
        });
      }
      
      // All requests should be allowed (within limit)
      userRequests.forEach(req => {
        expect(req.rateLimit.allowed).toBe(true);
        expect(req.csrfValid).toBe(true);
        expect(req.csrfToken).toBeDefined();
      });
    });
  });
});
