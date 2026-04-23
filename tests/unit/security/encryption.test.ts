import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import crypto from 'crypto';
import { 
  generateApiKey, 
  hashApiKey, 
  verifyApiKey,
  validateApiKey
} from '../../../backend/lib/security-hardening';

// Mock database for testing
const mockDb = {
  select: jest.fn() as jest.Mock,
  update: jest.fn() as jest.Mock
};

jest.mock('../../../backend/db/connection', () => ({
  db: mockDb,
  pgDb: mockDb
}));

describe('Security - Encryption', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API Key Generation', () => {
    it('should generate API keys with correct format', () => {
      const apiKey = generateApiKey();
      
      expect(apiKey).toBeDefined();
      expect(typeof apiKey).toBe('string');
      expect(apiKey).toMatch(/^api_[a-f0-9]{64}$/); // api_ prefix + 64 hex chars
      expect(apiKey.length).toBe(68); // "api_" + 64 chars
    });

    it('should generate unique API keys', () => {
      const key1 = generateApiKey();
      const key2 = generateApiKey();
      
      expect(key1).not.toBe(key2);
    });

    it('should generate cryptographically secure keys', () => {
      const keys = new Set();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        keys.add(generateApiKey());
      }
      
      // With high probability, all keys should be unique
      expect(keys.size).toBe(iterations);
    });
  });

  describe('API Key Hashing', () => {
    it('should hash API keys consistently', () => {
      const apiKey = 'api_test1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
      const hash1 = hashApiKey(apiKey);
      const hash2 = hashApiKey(apiKey);
      
      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/i); // SHA-256 produces 64 char hex
    });

    it('should handle null and undefined inputs safely', () => {
      expect(hashApiKey(null as any)).toBe('');
      expect(hashApiKey(undefined as any)).toBe('');
    });
  });

  describe('API Key Verification', () => {
    it('should verify correct API keys', () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      
      expect(verifyApiKey(apiKey, hashedKey)).toBe(true);
    });

    it('should reject incorrect API keys', () => {
      const correctKey = generateApiKey();
      const wrongKey = generateApiKey();
      const hashedKey = hashApiKey(correctKey);
      
      expect(verifyApiKey(wrongKey, hashedKey)).toBe(false);
    });

    it('should use timing-safe comparison', () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const wrongKey = generateApiKey();
      
      // These should take similar time regardless of how many characters match
      const start1 = process.hrtime.bigint();
      verifyApiKey(apiKey, hashedKey);
      const time1 = process.hrtime.bigint() - start1;
      
      const start2 = process.hrtime.bigint();
      verifyApiKey(wrongKey, hashedKey);
      const time2 = process.hrtime.bigint() - start2;
      
      // Times should be within an order of magnitude (this is a rough test)
      const ratio = Number(time1) / Number(time2);
      expect(ratio).toBeGreaterThan(0.1);
      expect(ratio).toBeLessThan(10);
    });

    it('should handle edge cases', () => {
      const hashedKey = hashApiKey('test-key');
      
      expect(verifyApiKey('', hashedKey)).toBe(false);
      expect(verifyApiKey(null as any, hashedKey)).toBe(false);
      expect(verifyApiKey(undefined as any, hashedKey)).toBe(false);
      expect(verifyApiKey('test-key', '')).toBe(false);
      expect(verifyApiKey('test-key', null as any)).toBe(false);
    });
  });

  describe('Database API Key Validation', () => {
    it('should validate active API keys from database', async () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const mockRecord = {
        id: 'key-123',
        organizationId: 'org-123',
        userId: 'user-123',
        name: 'Test Key',
        hashedKey,
        permissions: ['read', 'write'],
        rateLimit: 1000,
        status: 'active',
        usageCount: 5,
        lastUsedAt: new Date(),
        createdAt: new Date()
      };

      mockDb.select.mockResolvedValue([mockRecord]);
      mockDb.update.mockResolvedValue({});

      const result = await validateApiKey(apiKey);
      
      expect(result.valid).toBe(true);
      expect(result.record).toEqual(mockRecord);
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          lastUsedAt: expect.any(Date),
          usageCount: 6
        })
      );
    });

    it('should reject inactive API keys', async () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const mockRecord = {
        id: 'key-123',
        status: 'inactive',
        hashedKey
      };

      mockDb.select.mockResolvedValue([mockRecord]);

      const result = await validateApiKey(apiKey);
      
      expect(result.valid).toBe(false);
      expect(result.record).toBeUndefined();
    });

    it('should reject expired API keys', async () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const mockRecord = {
        id: 'key-123',
        status: 'active',
        hashedKey,
        expiresAt: new Date(Date.now() - 1000) // Expired 1 second ago
      };

      mockDb.select.mockResolvedValue([mockRecord]);

      const result = await validateApiKey(apiKey);
      
      expect(result.valid).toBe(false);
      expect(result.record).toBeUndefined();
    });

    it('should handle non-existent API keys', async () => {
      const apiKey = generateApiKey();
      
      mockDb.select.mockResolvedValue([]);

      const result = await validateApiKey(apiKey);
      
      expect(result.valid).toBe(false);
      expect(result.record).toBeUndefined();
    });

    it('should handle empty API key input', async () => {
      const result = await validateApiKey('');
      
      expect(result.valid).toBe(false);
      expect(result.record).toBeUndefined();
      expect(mockDb.select).not.toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      const apiKey = generateApiKey();
      
      mockDb.select.mockRejectedValue(new Error('Database error'));

      const result = await validateApiKey(apiKey);
      
      expect(result.valid).toBe(false);
      expect(result.record).toBeUndefined();
    });

    it('should handle update errors gracefully', async () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const mockRecord = {
        id: 'key-123',
        status: 'active',
        hashedKey
      };

      mockDb.select.mockResolvedValue([mockRecord]);
      mockDb.update.mockRejectedValue(new Error('Update error'));

      const result = await validateApiKey(apiKey);
      
      expect(result.valid).toBe(true); // Should still be valid even if update fails
      expect(result.record).toEqual(mockRecord);
    });
  });

  describe('Organization-scoped Validation', () => {
    it('should validate API keys for specific organization', async () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const organizationId = 'org-123';
      const mockRecord = {
        id: 'key-123',
        organizationId,
        status: 'active',
        hashedKey
      };

      mockDb.select.mockResolvedValue([mockRecord]);
      mockDb.update.mockResolvedValue({});

      const result = await validateApiKey(apiKey, organizationId);
      
      expect(result.valid).toBe(true);
      expect(result.record?.organizationId).toBe(organizationId);
    });

    it('should reject API keys from different organizations', async () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const mockRecord = {
        id: 'key-123',
        organizationId: 'org-456', // Different org
        status: 'active',
        hashedKey
      };

      mockDb.select.mockResolvedValue([]);

      const result = await validateApiKey(apiKey, 'org-123');
      
      expect(result.valid).toBe(false);
      expect(result.record).toBeUndefined();
    });
  });

  describe('Security Edge Cases', () => {
    it('should handle very long API keys', () => {
      const longKey = 'api_' + 'a'.repeat(1000);
      
      expect(() => generateApiKey()).not.toThrow();
      expect(() => hashApiKey(longKey)).not.toThrow();
    });

    it('should handle API keys with special characters', () => {
      const specialKey = 'api_!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      expect(() => hashApiKey(specialKey)).not.toThrow();
    });

    it('should maintain consistency across multiple hashing operations', () => {
      const apiKey = generateApiKey();
      const hashes: string[] = [];
      
      // Hash the same key multiple times
      for (let i = 0; i < 100; i++) {
        hashes.push(hashApiKey(apiKey));
      }
      
      // All hashes should be identical
      expect(hashes.every(hash => hash === hashes[0])).toBe(true);
    });

    it('should generate keys with sufficient entropy', () => {
      const keys = Array.from({ length: 100 }, () => generateApiKey());
      const uniquePrefixes = new Set(keys.map(key => key.substring(0, 16)));
      
      // With high probability, the first 16 characters should be unique
      expect(uniquePrefixes.size).toBeGreaterThan(90);
    });
  });

  describe('Performance Considerations', () => {
    it('should hash keys efficiently', () => {
      const apiKey = generateApiKey();
      const iterations = 1000;
      
      const start = process.hrtime.bigint();
      
      for (let i = 0; i < iterations; i++) {
        hashApiKey(apiKey);
      }
      
      const duration = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
      
      // Should complete 1000 hash operations in reasonable time (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });

    it('should verify keys efficiently', () => {
      const apiKey = generateApiKey();
      const hashedKey = hashApiKey(apiKey);
      const iterations = 1000;
      
      const start = process.hrtime.bigint();
      
      for (let i = 0; i < iterations; i++) {
        verifyApiKey(apiKey, hashedKey);
      }
      
      const duration = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
      
      // Should complete 1000 verifications in reasonable time
      expect(duration).toBeLessThan(1000);
    });
  });
});
