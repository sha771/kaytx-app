import { describe, it, expect, jest } from '@jest/globals';
import type { Next } from 'hono';

import { 
  validateBody, 
  validateQuery, 
  validateParams,
  sanitizeInput,
  validateEmail,
  validateUUID,
  validatePhoneNumber,
  validatePasswordStrength,
  rateLimitByIp
} from '../../backend/middleware/validate';
import { z } from 'zod';

// Mock Hono Context and Zod
jest.mock('hono', () => ({
  Context: jest.fn(),
  Next: jest.fn(),
}));

jest.mock('zod', () => {
  const actual = jest.requireActual('zod');
  return actual;
});

// Mock the API error function
jest.mock('../../backend/lib/api-error', () => ({
  generateErrorId: jest.fn(() => 'error-123'),
  makeApiError: jest.fn((c, code, message, details, errorId, timestamp) => ({
    error: { code, message, details, errorId, timestamp }
  }))
}));

// Mock Hono Context
const createMockContext = (overrides: any = {}) => ({
  req: {
    json: jest.fn(),
    query: jest.fn(),
    param: jest.fn(),
  },
  json: jest.fn(),
  set: jest.fn(),
  ...overrides
});

describe('Validation Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('validateBody', () => {
    it('should validate valid body', async () => {
      const schema = z.object({
        name: z.string().min(1),
        email: z.string().email()
      });

      const mockBody = { name: 'John Doe', email: 'john@example.com' };
      const mockContext = createMockContext();
      mockContext.req.json.mockResolvedValue(mockBody);

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateBody(schema);

      await middleware(mockContext, mockNext);

      expect(mockContext.set).toHaveBeenCalledWith('validatedBody', mockBody);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should reject invalid body', async () => {
      const schema = z.object({
        name: z.string().min(1),
        email: z.string().email()
      });

      const mockBody = { name: '', email: 'invalid-email' };
      const mockContext = createMockContext();
      mockContext.req.json.mockResolvedValue(mockBody);

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateBody(schema);

      await middleware(mockContext, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'VALIDATION_ERROR'
          })
        }),
        400
      );
    });

    it('should handle JSON parsing errors', async () => {
      const schema = z.object({ name: z.string() });
      const mockContext = createMockContext();
      mockContext.req.json.mockRejectedValue(new Error('Invalid JSON'));

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateBody(schema);

      await middleware(mockContext, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'INVALID_JSON'
          })
        }),
        400
      );
    });
  });

  describe('validateQuery', () => {
    it('should validate valid query parameters', async () => {
      const schema = z.object({
        page: z.string().transform(Number).pipe(z.number().min(1)),
        limit: z.string().transform(Number).pipe(z.number().max(100))
      });

      const mockQuery = { page: '1', limit: '20' };
      const mockContext = createMockContext();
      mockContext.req.query.mockReturnValue(mockQuery);

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateQuery(schema);

      await middleware(mockContext, mockNext);

      expect(mockContext.set).toHaveBeenCalledWith('validatedQuery', { page: 1, limit: 20 });
      expect(mockNext).toHaveBeenCalled();
    });

    it('should reject invalid query parameters', async () => {
      const schema = z.object({
        page: z.string().transform(Number).pipe(z.number().min(1))
      });

      const mockQuery = { page: '0' }; // Invalid: less than 1
      const mockContext = createMockContext();
      mockContext.req.query.mockReturnValue(mockQuery);

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateQuery(schema);

      await middleware(mockContext, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'VALIDATION_ERROR'
          })
        }),
        400
      );
    });
  });

  describe('validateParams', () => {
    it('should validate valid URL parameters', async () => {
      const schema = z.object({
        id: z.string().uuid(),
        slug: z.string().min(1)
      });

      const mockParams = { id: '550e8400-e29b-41d4-a716-446655440000', slug: 'test-slug' };
      const mockContext = createMockContext();
      mockContext.req.param.mockReturnValue(mockParams);

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateParams(schema);

      await middleware(mockContext, mockNext);

      expect(mockContext.set).toHaveBeenCalledWith('validatedParams', mockParams);
      expect(mockNext).toHaveBeenCalled();
    });

    it('should reject invalid URL parameters', async () => {
      const schema = z.object({
        id: z.string().uuid()
      });

      const mockParams = { id: 'invalid-uuid' };
      const mockContext = createMockContext();
      mockContext.req.param.mockReturnValue(mockParams);

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;
      const middleware = validateParams(schema);

      await middleware(mockContext, mockNext);

      expect(mockNext).not.toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'VALIDATION_ERROR'
          })
        }),
        400
      );
    });
  });
});

describe('Validation Utilities', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello');
    });

    it('should remove javascript protocol', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeInput(input);
      expect(result).toBe('alert("xss")');
    });

    it('should remove event handlers', () => {
      const input = 'onclick=alert("xss")Hello';
      const result = sanitizeInput(input);
      expect(result).toBe('');
    });

    it('should trim whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });

    it('should handle empty input', () => {
      const result = sanitizeInput('');
      expect(result).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('user123@test-domain.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test.example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateUUID', () => {
    it('should validate correct UUIDs', () => {
      expect(validateUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
      expect(validateUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
    });

    it('should reject invalid UUIDs', () => {
      expect(validateUUID('invalid-uuid')).toBe(false);
      expect(validateUUID('550e8400-e29b-41d4-a716')).toBe(false); // Too short
      expect(validateUUID('550e8400e29b41d4a716446655440000')).toBe(false); // Missing dashes
      expect(validateUUID('')).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    it('should validate correct phone numbers', () => {
      expect(validatePhoneNumber('+1234567890')).toBe(true);
      expect(validatePhoneNumber('+44 20 7946 0958')).toBe(true);
      expect(validatePhoneNumber('+1 (555) 123-4567')).toBe(true);
      expect(validatePhoneNumber('1234567890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validatePhoneNumber('abc')).toBe(false);
      expect(validatePhoneNumber('123')).toBe(false); // Too short
      expect(validatePhoneNumber('')).toBe(false);
      expect(validatePhoneNumber('+0 1234567890')).toBe(false); // Country code 0
    });
  });

  describe('validatePasswordStrength', () => {
    it('should validate strong passwords', () => {
      const result = validatePasswordStrength('StrongP@ssw0rd!');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject passwords that are too short', () => {
      const result = validatePasswordStrength('Short1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    it('should reject passwords without uppercase', () => {
      const result = validatePasswordStrength('lowercase1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject passwords without lowercase', () => {
      const result = validatePasswordStrength('UPPERCASE1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject passwords without numbers', () => {
      const result = validatePasswordStrength('NoNumbers!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject passwords without special characters', () => {
      const result = validatePasswordStrength('NoSpecialChars1');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });

    it('should return multiple errors for weak passwords', () => {
      const result = validatePasswordStrength('weak');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });
});

describe('Rate Limiting', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  describe('rateLimitByIp', () => {
    it('should allow requests within limit', async () => {
      const middleware = rateLimitByIp(5, 60000); // 5 requests per minute
      const mockContext = createMockContext({
        req: {
          header: jest.fn().mockReturnValue('127.0.0.1')
        }
      });

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        await middleware(mockContext, mockNext);
        expect(mockNext).toHaveBeenCalledTimes(i + 1);
      }
    });

    it('should block requests exceeding limit', async () => {
      const middleware = rateLimitByIp(2, 60000); // 2 requests per minute
      const mockContext = createMockContext({
        req: {
          header: jest.fn().mockReturnValue('127.0.0.1')
        }
      });

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;

      // Make 2 requests (within limit)
      await middleware(mockContext, mockNext);
      await middleware(mockContext, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(2);

      // 3rd request should be blocked
      await middleware(mockContext, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(2); // Still 2, not called for 3rd
      expect(mockContext.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.objectContaining({
            code: 'TOO_MANY_REQUESTS'
          })
        }),
        429
      );
    });

    it('should reset limit after window expires', async () => {
      // Mock Date.now to work with Jest's fake timers
      const mockDateNow = jest.spyOn(Date, 'now').mockReturnValue(1000);
      
      // Create middleware with initial timestamp
      let middleware = rateLimitByIp(1, 1000); // 1 request per second
      const mockContext = createMockContext({
        req: {
          header: jest.fn().mockReturnValue('127.0.0.1')
        }
      });

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;

      // First request
      await middleware(mockContext, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Second request should be blocked (same timestamp)
      await middleware(mockContext, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Advance time and create new middleware instance
      mockDateNow.mockReturnValue(2000); // 1 second later
      middleware = rateLimitByIp(1, 1000); // Fresh middleware with new state
      
      // Request should now be allowed again
      await middleware(mockContext, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(2); // Should be called again
      
      // Restore Date.now
      mockDateNow.mockRestore();
    });

    it('should handle different IPs separately', async () => {
      const middleware = rateLimitByIp(1, 60000);
      const mockContext1 = createMockContext({
        req: {
          header: jest.fn().mockReturnValue('127.0.0.1')
        }
      });
      const mockContext2 = createMockContext({
        req: {
          header: jest.fn().mockReturnValue('192.168.1.1')
        }
      });

      const mockNext = jest.fn().mockImplementation(() => Promise.resolve()) as jest.MockedFunction<Next>;

      // Both IPs should be allowed their first request
      await middleware(mockContext1, mockNext);
      await middleware(mockContext2, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(2);
    });
  });
});
