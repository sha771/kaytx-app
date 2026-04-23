import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { Hono } from 'hono';
import { SecurityUtils } from '../../utils/security-utils';
import { DatabaseUtils } from '../../utils/database-utils';
import { APIUtils } from '../../utils/api-utils';

describe('Security Utils', () => {
  describe('Password Strength Validation', () => {
    it('should validate strong passwords', () => {
      const result = SecurityUtils.validatePasswordStrength('StrongP@ssw0rd123!');
      expect(result.valid).toBe(true);
      expect(result.score).toBeGreaterThan(6);
    });

    it('should reject weak passwords', () => {
      const result = SecurityUtils.validatePasswordStrength('weak');
      expect(result.valid).toBe(false);
      expect(result.feedback).toContain('Password should be at least 8 characters long');
    });

    it('should provide specific feedback for missing requirements', () => {
      const result = SecurityUtils.validatePasswordStrength('password');
      expect(result.feedback).toContain('Include uppercase letters');
      expect(result.feedback).toContain('Include numbers');
      expect(result.feedback).toContain('Include special characters');
    });
  });

  describe('Input Sanitization', () => {
    it('should sanitize XSS attempts', () => {
      const malicious = '<script>alert("xss")</script>';
      const sanitized = SecurityUtils.sanitizeInput(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('javascript:');
    });

    it('should remove event handlers', () => {
      const malicious = '<div onclick="alert(1)">Click me</div>';
      const sanitized = SecurityUtils.sanitizeInput(malicious);
      expect(sanitized).not.toContain('onclick');
    });
  });

  describe('Token Generation and Validation', () => {
    it('should generate secure tokens', () => {
      const payload = { userId: '123', role: 'admin' };
      const { token, expiresAt } = SecurityUtils.generateSecureToken(payload);
      
      expect(token).toBeDefined();
      expect(expiresAt).toBeInstanceOf(Date);
      expect(expiresAt.getTime()).toBeGreaterThan(Date.now());
    });

    it('should validate valid tokens', () => {
      const payload = { userId: '123', role: 'admin' };
      const { token } = SecurityUtils.generateSecureToken(payload);
      
      const result = SecurityUtils.validateSecureToken(token);
      expect(result.valid).toBe(true);
      expect(result.payload).toMatchObject(payload);
    });

    it('should reject expired tokens', () => {
      const payload = { userId: '123', role: 'admin' };
      const { token } = SecurityUtils.generateSecureToken(payload, -1); // Already expired
      
      const result = SecurityUtils.validateSecureToken(token);
      expect(result.valid).toBe(false);
      expect(result.expired).toBe(true);
    });

    it('should reject invalid tokens', () => {
      const result = SecurityUtils.validateSecureToken('invalid-token');
      expect(result.valid).toBe(false);
    });
  });

  describe('Rate Limiting', () => {
    it('should allow requests within limits', () => {
      const limiter = SecurityUtils.createRateLimiter(5, 60000); // 5 requests per minute
      
      for (let i = 0; i < 5; i++) {
        expect(limiter.isAllowed('user1')).toBe(true);
      }
    });

    it('should block requests exceeding limits', () => {
      const limiter = SecurityUtils.createRateLimiter(2, 60000); // 2 requests per minute
      
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
    });

    it('should reset limits after window', () => {
      const limiter = SecurityUtils.createRateLimiter(1, 100); // 1 request per 100ms
      
      expect(limiter.isAllowed('user1')).toBe(true);
      expect(limiter.isAllowed('user1')).toBe(false);
      
      // Wait for window to reset
      setTimeout(() => {
        expect(limiter.isAllowed('user1')).toBe(true);
      }, 150);
    });
  });

  describe('IP Address Validation', () => {
    it('should validate valid IPv4 addresses', () => {
      expect(SecurityUtils.sanitizeIPAddress('192.168.1.1')).toBe('192.168.1.1');
      expect(SecurityUtils.sanitizeIPAddress('10.0.0.1')).toBe('10.0.0.1');
    });

    it('should validate valid IPv6 addresses', () => {
      expect(SecurityUtils.sanitizeIPAddress('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    });

    it('should reject invalid IP addresses', () => {
      expect(SecurityUtils.sanitizeIPAddress('invalid-ip')).toBeNull();
      expect(SecurityUtils.sanitizeIPAddress('999.999.999.999')).toBeNull();
    });
  });

  describe('CSP Header Generation', () => {
    it('should generate default CSP headers', () => {
      const csp = SecurityUtils.generateCSPHeader();
      expect(csp).toContain("default-src 'self'");
      expect(csp).toContain("script-src 'self'");
      expect(csp).toContain("object-src 'none'");
    });

    it('should generate custom CSP headers', () => {
      const options = {
        scriptSrc: ["'self'", "https://cdn.example.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      };
      
      const csp = SecurityUtils.generateCSPHeader(options);
      expect(csp).toContain("script-src 'self' https://cdn.example.com");
      expect(csp).toContain("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com");
    });
  });
});

describe('API Utils', () => {
  describe('Success Response Format', () => {
    it('should format success responses correctly', () => {
      const data = { id: 1, name: 'test' };
      const response = APIUtils.success(data, { message: 'Success' });
      
      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.meta.message).toBe('Success');
      expect(response.meta.timestamp).toBeDefined();
    });
  });

  describe('Error Response Format', () => {
    it('should format error responses correctly', () => {
      const response = APIUtils.error('VALIDATION_ERROR', 'Invalid input', { field: 'email' });
      
      expect(response.success).toBe(false);
      expect(response.error.code).toBe('VALIDATION_ERROR');
      expect(response.error.message).toBe('Invalid input');
      expect(response.error.details.field).toBe('email');
    });
  });

  describe('Pagination Helpers', () => {
    it('should extract pagination parameters', () => {
      const mockContext = {
        req: {
          query: () => ({ page: '2', limit: '25', offset: '25' })
        }
      } as any;
      
      const pagination = APIUtils.getPaginationParams(mockContext);
      expect(pagination.page).toBe(2);
      expect(pagination.limit).toBe(25);
      expect(pagination.offset).toBe(25);
    });

    it('should use default pagination values', () => {
      const mockContext = {
        req: {
          query: () => ({})
        }
      } as any;
      
      const pagination = APIUtils.getPaginationParams(mockContext);
      expect(pagination.page).toBe(1);
      expect(pagination.limit).toBe(50);
      expect(pagination.offset).toBe(0);
    });

    it('should build pagination metadata', () => {
      const meta = APIUtils.buildPaginationMeta(100, 20, 40, 3);
      
      expect(meta.pagination.total).toBe(100);
      expect(meta.pagination.limit).toBe(20);
      expect(meta.pagination.page).toBe(3);
      expect(meta.pagination.totalPages).toBe(5);
      expect(meta.pagination.hasNext).toBe(true);
      expect(meta.pagination.hasPrev).toBe(true);
    });
  });

  describe('Security Headers', () => {
    it('should set security headers', () => {
      const mockContext = {
        header: jest.fn()
      } as any;
      
      APIUtils.setSecurityHeaders(mockContext);
      
      expect(mockContext.header).toHaveBeenCalledWith('X-Content-Type-Options', 'nosniff');
      expect(mockContext.header).toHaveBeenCalledWith('X-Frame-Options', 'DENY');
      expect(mockContext.header).toHaveBeenCalledWith('X-XSS-Protection', '1; mode=block');
    });
  });
});

describe('Database Utils', () => {
  describe('Transaction Handling', () => {
    it('should handle successful transactions', async () => {
      const mockCallback = jest.fn().mockResolvedValue('success');
      
      // Mock database
      const mockDb = {
        transaction: jest.fn().mockImplementation((callback) => callback(mockDb))
      };
      
      DatabaseUtils.initialize();
      jest.spyOn(DatabaseUtils, 'getDatabase').mockReturnValue(mockDb as any);
      
      const result = await DatabaseUtils.withTransaction(mockCallback);
      
      expect(result).toBe('success');
      expect(mockCallback).toHaveBeenCalledWith(mockDb);
    });

    it('should retry failed transactions', async () => {
      const mockCallback = jest.fn()
        .mockRejectedValueOnce(new Error('Temporary failure'))
        .mockResolvedValue('success');
      
      const mockDb = {
        transaction: jest.fn().mockImplementation((callback) => callback(mockDb))
      };
      
      DatabaseUtils.initialize();
      jest.spyOn(DatabaseUtils, 'getDatabase').mockReturnValue(mockDb as any);
      
      const result = await DatabaseUtils.withTransaction(mockCallback, 2);
      
      expect(result).toBe('success');
      expect(mockCallback).toHaveBeenCalledTimes(2);
    });

    it('should not retry on constraint violations', async () => {
      const constraintError = new Error('unique constraint violation');
      const mockCallback = jest.fn().mockRejectedValue(constraintError);
      
      const mockDb = {
        transaction: jest.fn().mockImplementation((callback) => callback(mockDb))
      };
      
      DatabaseUtils.initialize();
      jest.spyOn(DatabaseUtils, 'getDatabase').mockReturnValue(mockDb as any);
      
      await expect(DatabaseUtils.withTransaction(mockCallback, 3)).rejects.toThrow(constraintError);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  describe('Health Check', () => {
    it('should return healthy status for successful connection', async () => {
      const mockDb = {
        execute: jest.fn().mockResolvedValue([{ count: 1 }])
      };
      
      DatabaseUtils.initialize();
      jest.spyOn(DatabaseUtils, 'getDatabase').mockReturnValue(mockDb as any);
      
      const health = await DatabaseUtils.healthCheck();
      
      expect(health.status).toBe('healthy');
      expect(health.latency).toBeGreaterThan(0);
    });

    it('should return unhealthy status for failed connection', async () => {
      const mockDb = {
        execute: jest.fn().mockRejectedValue(new Error('Connection failed'))
      };
      
      DatabaseUtils.initialize();
      jest.spyOn(DatabaseUtils, 'getDatabase').mockReturnValue(mockDb as any);
      
      const health = await DatabaseUtils.healthCheck();
      
      expect(health.status).toBe('unhealthy');
      expect(health.error).toBe('Connection failed');
    });
  });
});

describe('Integration Security Tests', () => {
  let app: Hono;

  beforeAll(() => {
    app = new Hono();
    
    // Add test routes with security middleware
    app.get('/test/public', (c) => c.json({ message: 'public' }));
    app.get('/test/protected', async (c) => {
      const authHeader = c.req.header('authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return c.json({ error: 'Unauthorized' }, 401);
      }
      return c.json({ message: 'protected' });
    });
    
    app.post('/test/validation', async (c) => {
      try {
        const body = await c.req.json();
        if (!body.email || !body.password) {
          return c.json({ error: 'Validation failed' }, 400);
        }
        return c.json({ success: true });
      } catch {
        return c.json({ error: 'Invalid JSON' }, 400);
      }
    });
  });

  describe('Authentication Tests', () => {
    it('should allow access to public routes', async () => {
      const res = await app.request('/test/public');
      expect(res.status).toBe(200);
    });

    it('should block access to protected routes without auth', async () => {
      const res = await app.request('/test/protected');
      expect(res.status).toBe(401);
    });

    it('should allow access to protected routes with valid auth', async () => {
      const res = await app.request('/test/protected', {
        headers: { 'authorization': 'Bearer valid-token' }
      });
      expect(res.status).toBe(200);
    });
  });

  describe('Input Validation Tests', () => {
    it('should reject invalid JSON', async () => {
      const res = await app.request('/test/validation', {
        method: 'POST',
        body: 'invalid-json',
        headers: { 'content-type': 'application/json' }
      });
      expect(res.status).toBe(400);
    });

    it('should reject missing required fields', async () => {
      const res = await app.request('/test/validation', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
        headers: { 'content-type': 'application/json' }
      });
      expect(res.status).toBe(400);
    });

    it('should accept valid input', async () => {
      const res = await app.request('/test/validation', {
        method: 'POST',
        body: JSON.stringify({ 
          email: 'test@example.com', 
          password: 'ValidPassword123!' 
        }),
        headers: { 'content-type': 'application/json' }
      });
      expect(res.status).toBe(200);
    });
  });

  describe('Rate Limiting Tests', () => {
    it('should allow requests within rate limit', async () => {
      const limiter = SecurityUtils.createRateLimiter(5, 60000);
      
      for (let i = 0; i < 5; i++) {
        expect(limiter.isAllowed('test-client')).toBe(true);
      }
    });

    it('should block requests exceeding rate limit', async () => {
      const limiter = SecurityUtils.createRateLimiter(2, 60000);
      
      expect(limiter.isAllowed('test-client')).toBe(true);
      expect(limiter.isAllowed('test-client')).toBe(true);
      expect(limiter.isAllowed('test-client')).toBe(false);
    });
  });
});

describe('Security Headers Tests', () => {
  it('should include all required security headers', () => {
    const headers = SecurityUtils.generateCSPHeader();
    
    expect(headers).toContain("default-src 'self'");
    expect(headers).toContain("object-src 'none'");
    expect(headers).toContain("frame-src 'none'");
    expect(headers).toContain("base-uri 'self'");
    expect(headers).toContain("form-action 'self'");
  });

  it('should prevent XSS through CSP', () => {
    const headers = SecurityUtils.generateCSPHeader();
    
    // Should not allow inline scripts by default
    expect(headers).not.toContain("'unsafe-inline'");
    expect(headers).not.toContain("'unsafe-eval'");
  });

  it('should prevent clickjacking', () => {
    const headers = SecurityUtils.generateCSPHeader();
    
    // Should deny framing by default
    expect(headers).toContain("frame-src 'none'");
  });
});

describe('Password Security Tests', () => {
  it('should enforce minimum password requirements', () => {
    const weakPasswords = [
      '123',
      'password',
      'Password',
      'Password123',
      'Pass!',
      'P@ss'
    ];

    weakPasswords.forEach(password => {
      const result = SecurityUtils.validatePasswordStrength(password);
      expect(result.valid).toBe(false);
    });
  });

  it('should accept strong passwords', () => {
    const strongPasswords = [
      'StrongP@ssw0rd123!',
      'MySecureP@ssword2024!',
      'C0mpl3xP@ssw0rd!'
    ];

    strongPasswords.forEach(password => {
      const result = SecurityUtils.validatePasswordStrength(password);
      expect(result.valid).toBe(true);
      expect(result.score).toBeGreaterThan(6);
    });
  });

  it('should provide helpful feedback', () => {
    const result = SecurityUtils.validatePasswordStrength('weak');
    
    expect(result.feedback).toContain('Password should be at least 8 characters long');
    expect(result.feedback).toContain('Include uppercase letters');
    expect(result.feedback).toContain('Include numbers');
    expect(result.feedback).toContain('Include special characters');
  });
});
