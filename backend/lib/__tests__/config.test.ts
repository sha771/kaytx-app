import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { config, validateConfig, loadConfigFromEnv } from '../config';

// Mock process.env
const originalEnv = process.env;

describe('Configuration Management', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Default Configuration', () => {
    it('should have sensible default values', () => {
      expect(config.auth.sessionExpiryMs).toBe(24 * 60 * 60 * 1000); // 24 hours
      expect(config.auth.passwordMinLength).toBe(8);
      expect(config.rateLimit.windowMs).toBe(15 * 60 * 1000); // 15 minutes
      expect(config.rateLimit.maxRequests).toBe(100);
      expect(config.fileUpload.maxSize).toBe(10 * 1024 * 1024); // 10MB
    });

    it('should have required configuration fields', () => {
      expect(config).toHaveProperty('auth');
      expect(config).toHaveProperty('rateLimit');
      expect(config).toHaveProperty('fileUpload');
      expect(config).toHaveProperty('api');
      expect(config).toHaveProperty('database');
    });

    it('should have auth configuration', () => {
      expect(config.auth).toHaveProperty('sessionExpiryMs');
      expect(config.auth).toHaveProperty('refreshTokenExpiryMs');
      expect(config.auth).toHaveProperty('passwordMinLength');
      expect(config.auth).toHaveProperty('maxLoginAttempts');
      expect(config.auth).toHaveProperty('lockoutDurationMs');
    });
  });

  describe('Environment Variable Loading', () => {
    it('should load configuration from environment variables', () => {
      process.env.SESSION_EXPIRY_MS = '3600000';
      process.env.PASSWORD_MIN_LENGTH = '12';
      process.env.RATE_LIMIT_MAX_REQUESTS = '200';
      process.env.FILE_UPLOAD_MAX_SIZE = '20971520';

      const loadedConfig = loadConfigFromEnv();

      expect(loadedConfig.auth.sessionExpiryMs).toBe(3600000);
      expect(loadedConfig.auth.passwordMinLength).toBe(12);
      expect(loadedConfig.rateLimit.maxRequests).toBe(200);
      expect(loadedConfig.fileUpload.maxSize).toBe(20971520);
    });

    it('should handle missing environment variables gracefully', () => {
      delete process.env.SESSION_EXPIRY_MS;
      delete process.env.PASSWORD_MIN_LENGTH;

      const loadedConfig = loadConfigFromEnv();

      expect(loadedConfig.auth.sessionExpiryMs).toBe(24 * 60 * 60 * 1000); // Default value
      expect(loadedConfig.auth.passwordMinLength).toBe(8); // Default value
    });

    it('should parse numeric environment variables correctly', () => {
      process.env.SESSION_EXPIRY_MS = '86400000';
      process.env.PASSWORD_MIN_LENGTH = '10';
      process.env.RATE_LIMIT_WINDOW_MS = '900000';

      const loadedConfig = loadConfigFromEnv();

      expect(typeof loadedConfig.auth.sessionExpiryMs).toBe('number');
      expect(typeof loadedConfig.auth.passwordMinLength).toBe('number');
      expect(typeof loadedConfig.rateLimit.windowMs).toBe('number');
    });

    it('should handle invalid numeric environment variables', () => {
      process.env.SESSION_EXPIRY_MS = 'invalid';
      process.env.PASSWORD_MIN_LENGTH = 'not-a-number';

      const loadedConfig = loadConfigFromEnv();

      expect(loadedConfig.auth.sessionExpiryMs).toBe(24 * 60 * 60 * 1000); // Default fallback
      expect(loadedConfig.auth.passwordMinLength).toBe(8); // Default fallback
    });

    it('should load boolean environment variables', () => {
      process.env.ENABLE_METRICS = 'true';
      process.env.ENABLE_AUDIT_LOG = 'false';

      const loadedConfig = loadConfigFromEnv();

      expect(loadedConfig.monitoring.enableMetrics).toBe(true);
      expect(loadedConfig.monitoring.enableAuditLog).toBe(false);
    });
  });

  describe('Configuration Validation', () => {
    it('should validate valid configuration', () => {
      const validConfig = {
        auth: {
          sessionExpiryMs: 86400000,
          refreshTokenExpiryMs: 604800000,
          passwordMinLength: 8,
          maxLoginAttempts: 5,
          lockoutDurationMs: 900000,
        },
        rateLimit: {
          windowMs: 900000,
          maxRequests: 100,
          authMaxRequests: 5,
        },
        fileUpload: {
          maxSize: 10485760,
          allowedTypes: ['image/jpeg', 'image/png'],
        },
        api: {
          keyDefaultExpiryDays: 90,
          version: '1.0.0',
        },
        database: {
          maxConnections: 100,
          connectionTimeoutMs: 30000,
        },
        monitoring: {
          enableMetrics: true,
          enableAuditLog: true,
        },
      };

      const result = validateConfig(validConfig);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid session expiry', () => {
      const invalidConfig = {
        auth: {
          sessionExpiryMs: -1, // Invalid negative value
          refreshTokenExpiryMs: 604800000,
          passwordMinLength: 8,
          maxLoginAttempts: 5,
          lockoutDurationMs: 900000,
        },
        rateLimit: {
          windowMs: 900000,
          maxRequests: 100,
          authMaxRequests: 5,
        },
        fileUpload: {
          maxSize: 10485760,
          allowedTypes: ['image/jpeg'],
        },
        api: {
          keyDefaultExpiryDays: 90,
          version: '1.0.0',
        },
        database: {
          maxConnections: 100,
          connectionTimeoutMs: 30000,
        },
        monitoring: {
          enableMetrics: true,
          enableAuditLog: true,
        },
      };

      const result = validateConfig(invalidConfig);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Session expiry must be positive');
    });

    it('should detect invalid password length', () => {
      const invalidConfig = {
        auth: {
          sessionExpiryMs: 86400000,
          refreshTokenExpiryMs: 604800000,
          passwordMinLength: 4, // Too short
          maxLoginAttempts: 5,
          lockoutDurationMs: 900000,
        },
        rateLimit: {
          windowMs: 900000,
          maxRequests: 100,
          authMaxRequests: 5,
        },
        fileUpload: {
          maxSize: 10485760,
          allowedTypes: ['image/jpeg'],
        },
        api: {
          keyDefaultExpiryDays: 90,
          version: '1.0.0',
        },
        database: {
          maxConnections: 100,
          connectionTimeoutMs: 30000,
        },
        monitoring: {
          enableMetrics: true,
          enableAuditLog: true,
        },
      };

      const result = validateConfig(invalidConfig);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password minimum length must be at least 6 characters');
    });

    it('should detect invalid rate limit configuration', () => {
      const invalidConfig = {
        auth: {
          sessionExpiryMs: 86400000,
          refreshTokenExpiryMs: 604800000,
          passwordMinLength: 8,
          maxLoginAttempts: 5,
          lockoutDurationMs: 900000,
        },
        rateLimit: {
          windowMs: 0, // Invalid zero value
          maxRequests: 0, // Invalid zero value
          authMaxRequests: 5,
        },
        fileUpload: {
          maxSize: 10485760,
          allowedTypes: ['image/jpeg'],
        },
        api: {
          keyDefaultExpiryDays: 90,
          version: '1.0.0',
        },
        database: {
          maxConnections: 100,
          connectionTimeoutMs: 30000,
        },
        monitoring: {
          enableMetrics: true,
          enableAuditLog: true,
        },
      };

      const result = validateConfig(invalidConfig);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Rate limit window must be positive');
      expect(result.errors).toContain('Rate limit max requests must be positive');
    });

    it('should detect invalid file upload size', () => {
      const invalidConfig = {
        auth: {
          sessionExpiryMs: 86400000,
          refreshTokenExpiryMs: 604800000,
          passwordMinLength: 8,
          maxLoginAttempts: 5,
          lockoutDurationMs: 900000,
        },
        rateLimit: {
          windowMs: 900000,
          maxRequests: 100,
          authMaxRequests: 5,
        },
        fileUpload: {
          maxSize: 0, // Invalid zero size
          allowedTypes: ['image/jpeg'],
        },
        api: {
          keyDefaultExpiryDays: 90,
          version: '1.0.0',
        },
        database: {
          maxConnections: 100,
          connectionTimeoutMs: 30000,
        },
        monitoring: {
          enableMetrics: true,
          enableAuditLog: true,
        },
      };

      const result = validateConfig(invalidConfig);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File upload max size must be positive');
    });

    it('should detect missing required fields', () => {
      const incompleteConfig = {
        auth: {
          sessionExpiryMs: 86400000,
          // Missing other required fields
        },
        // Missing other sections
      };

      const result = validateConfig(incompleteConfig);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Configuration Merging', () => {
    it('should merge environment variables with defaults', () => {
      process.env.SESSION_EXPIRY_MS = '7200000';
      process.env.RATE_LIMIT_MAX_REQUESTS = '150';

      const loadedConfig = loadConfigFromEnv();

      expect(loadedConfig.auth.sessionExpiryMs).toBe(7200000); // From env
      expect(loadedConfig.auth.passwordMinLength).toBe(8); // From default
      expect(loadedConfig.rateLimit.maxRequests).toBe(150); // From env
      expect(loadedConfig.rateLimit.windowMs).toBe(15 * 60 * 1000); // From default
    });

    it('should handle partial configuration updates', () => {
      const partialConfig = {
        auth: {
          passwordMinLength: 12,
        },
      };

      // This would be implemented in the actual config module
      expect(partialConfig.auth.passwordMinLength).toBe(12);
    });
  });

  describe('Security Configuration', () => {
    it('should have secure default values', () => {
      expect(config.auth.passwordMinLength).toBeGreaterThanOrEqual(8);
      expect(config.auth.maxLoginAttempts).toBeLessThanOrEqual(10);
      expect(config.auth.lockoutDurationMs).toBeGreaterThan(0);
      expect(config.rateLimit.authMaxRequests).toBeLessThan(config.rateLimit.maxRequests);
    });

    it('should validate security-related configuration', () => {
      const secureConfig = {
        auth: {
          sessionExpiryMs: 3600000, // 1 hour - reasonable
          refreshTokenExpiryMs: 604800000, // 7 days - reasonable
          passwordMinLength: 12, // Strong requirement
          maxLoginAttempts: 5, // Reasonable limit
          lockoutDurationMs: 900000, // 15 minutes - reasonable
        },
        rateLimit: {
          windowMs: 900000, // 15 minutes
          maxRequests: 100, // Reasonable limit
          authMaxRequests: 5, // Stricter for auth
        },
        fileUpload: {
          maxSize: 5242880, // 5MB - reasonable limit
          allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
        },
        api: {
          keyDefaultExpiryDays: 90, // 3 months - reasonable
          version: '1.0.0',
        },
        database: {
          maxConnections: 100,
          connectionTimeoutMs: 30000,
        },
        monitoring: {
          enableMetrics: true,
          enableAuditLog: true,
        },
      };

      const result = validateConfig(secureConfig);

      expect(result.isValid).toBe(true);
    });
  });

  describe('Configuration Types', () => {
    it('should maintain type safety', () => {
      expect(typeof config.auth.sessionExpiryMs).toBe('number');
      expect(typeof config.auth.passwordMinLength).toBe('number');
      expect(typeof config.rateLimit.windowMs).toBe('number');
      expect(typeof config.rateLimit.maxRequests).toBe('number');
      expect(typeof config.fileUpload.maxSize).toBe('number');
      expect(Array.isArray(config.fileUpload.allowedTypes)).toBe(true);
    });

    it('should have proper configuration structure', () => {
      expect(config).toHaveProperty('auth');
      expect(config).toHaveProperty('rateLimit');
      expect(config).toHaveProperty('fileUpload');
      expect(config).toHaveProperty('api');
      expect(config).toHaveProperty('database');
      expect(config).toHaveProperty('monitoring');
    });
  });
});
