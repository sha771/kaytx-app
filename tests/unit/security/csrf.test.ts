import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { 
  generateCSRFToken, 
  verifyCSRFToken,
  csrfProtection,
  csrfTokenMiddleware
} from '../../../backend/lib/unified-csrf';
import { Request, Response, NextFunction } from 'express';

describe('CSRF Protection', () => {
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      method: 'POST',
      headers: {},
      cookies: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
      setHeader: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('generateCSRFToken', () => {
    it('should generate a token of correct length', () => {
      const token = generateCSRFToken();
      expect(token).toHaveLength(64); // 32 bytes * 2 (hex)
    });

    it('should generate unique tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyCSRFToken', () => {
    it('should verify matching tokens', () => {
      const token = generateCSRFToken();
      expect(verifyCSRFToken(token, token)).toBe(true);
    });

    it('should reject non-matching tokens', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(verifyCSRFToken(token1, token2)).toBe(false);
    });

    it('should reject empty tokens', () => {
      expect(verifyCSRFToken('', 'token')).toBe(false);
      expect(verifyCSRFToken('token', '')).toBe(false);
      expect(verifyCSRFToken('', '')).toBe(false);
    });
  });

  describe('csrfProtection middleware', () => {
    it('should allow GET requests', async () => {
      mockRequest.method = 'GET';
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should allow HEAD requests', async () => {
      mockRequest.method = 'HEAD';
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should allow OPTIONS requests', async () => {
      mockRequest.method = 'OPTIONS';
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should allow requests with Bearer tokens', async () => {
      mockRequest.headers.authorization = 'Bearer token123';
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should reject POST requests without CSRF tokens', async () => {
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Invalid CSRF token',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should reject POST requests with invalid CSRF tokens', async () => {
      mockRequest.headers['x-csrf-token'] = 'invalid';
      mockRequest.headers['x-csrf-session'] = 'token';
      
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Invalid CSRF token',
      });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should allow POST requests with valid CSRF tokens', async () => {
      const token = generateCSRFToken();
      mockRequest.headers['x-csrf-token'] = token;
      mockRequest.headers['x-csrf-session'] = token;
      
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should accept CSRF token from cookie', async () => {
      const token = generateCSRFToken();
      mockRequest.headers['x-csrf-token'] = token;
      mockRequest.cookies['csrf-token'] = token;
      
      const middleware = csrfProtection();
      await middleware(mockRequest, mockResponse, nextFunction);
      expect(nextFunction).toHaveBeenCalled();
    });
  });

  describe('csrfTokenMiddleware', () => {
    it('should generate and set CSRF token', async () => {
      const mockContext = {
        header: jest.fn(),
      };
      const middleware = csrfTokenMiddleware();
      await middleware(mockContext, nextFunction);
      
      expect(mockContext.header).toHaveBeenCalledWith('x-csrf-token', expect.any(String));
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should generate CSRF token with correct properties', async () => {
      const mockContext = {
        header: jest.fn(),
      };
      const middleware = csrfTokenMiddleware();
      await middleware(mockContext, nextFunction);
      
      expect(mockContext.header).toHaveBeenCalledWith('x-csrf-token', expect.any(String));
      expect(nextFunction).toHaveBeenCalled();
    });
  });
});
