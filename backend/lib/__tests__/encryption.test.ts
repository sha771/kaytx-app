import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { encryptData, decryptData, hashData, verifyHash, generateSecureToken } from '../encryption';

describe('Encryption Utilities', () => {
  const testEncryptionKey = 'test-encryption-key-32-bytes-long!!';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Data Encryption/Decryption', () => {
    it('should encrypt and decrypt data successfully', () => {
      const plainText = 'Hello, World!';
      const encrypted = encryptData(plainText, testEncryptionKey);
      const decrypted = decryptData(encrypted, testEncryptionKey);

      expect(decrypted).toBe(plainText);
      expect(encrypted).not.toBe(plainText);
      expect(encrypted).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64 format
    });

    it('should handle empty strings', () => {
      const plainText = '';
      const encrypted = encryptData(plainText, testEncryptionKey);
      const decrypted = decryptData(encrypted, testEncryptionKey);

      expect(decrypted).toBe(plainText);
    });

    it('should handle special characters', () => {
      const plainText = 'Special chars: 🚀 ñáéíóú 中文';
      const encrypted = encryptData(plainText, testEncryptionKey);
      const decrypted = decryptData(encrypted, testEncryptionKey);

      expect(decrypted).toBe(plainText);
    });

    it('should handle large data', () => {
      const plainText = 'A'.repeat(10000); // 10KB of data
      const encrypted = encryptData(plainText, testEncryptionKey);
      const decrypted = decryptData(encrypted, testEncryptionKey);

      expect(decrypted).toBe(plainText);
    });

    it('should produce different encrypted values for same input', () => {
      const plainText = 'Hello, World!';
      const encrypted1 = encryptData(plainText, testEncryptionKey);
      const encrypted2 = encryptData(plainText, testEncryptionKey);

      expect(encrypted1).not.toBe(encrypted2);
    });

    it('should fail to decrypt with wrong key', () => {
      const plainText = 'Hello, World!';
      const wrongKey = 'wrong-encryption-key-32-bytes-long!!';
      const encrypted = encryptData(plainText, testEncryptionKey);

      expect(() => {
        decryptData(encrypted, wrongKey);
      }).toThrow();
    });

    it('should fail to decrypt invalid data', () => {
      expect(() => {
        decryptData('invalid-encrypted-data', testEncryptionKey);
      }).toThrow();
    });

    it('should handle null/undefined inputs', () => {
      expect(() => {
        encryptData(null as any, testEncryptionKey);
      }).toThrow();

      expect(() => {
        encryptData(undefined as any, testEncryptionKey);
      }).toThrow();
    });
  });

  describe('Data Hashing', () => {
    it('should hash data consistently', () => {
      const data = 'Hello, World!';
      const hash1 = hashData(data);
      const hash2 = hashData(data);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/); // SHA-256 hex format
    });

    it('should verify hash correctly', () => {
      const data = 'Hello, World!';
      const hash = hashData(data);

      expect(verifyHash(data, hash)).toBe(true);
    });

    it('should fail verification for wrong data', () => {
      const data = 'Hello, World!';
      const wrongData = 'Hello, Wrong!';
      const hash = hashData(data);

      expect(verifyHash(wrongData, hash)).toBe(false);
    });

    it('should handle empty strings', () => {
      const data = '';
      const hash = hashData(data);

      expect(hash).toMatch(/^[a-f0-9]{64}$/);
      expect(verifyHash(data, hash)).toBe(true);
    });

    it('should produce different hashes for different inputs', () => {
      const data1 = 'Hello, World!';
      const data2 = 'Hello, Wrong!';
      const hash1 = hashData(data1);
      const hash2 = hashData(data2);

      expect(hash1).not.toBe(hash2);
    });

    it('should handle null/undefined inputs', () => {
      expect(() => {
        hashData(null as any);
      }).toThrow();

      expect(() => {
        hashData(undefined as any);
      }).toThrow();
    });
  });

  describe('Secure Token Generation', () => {
    it('should generate tokens of default length', () => {
      const token = generateSecureToken();
      
      expect(token).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64 format
      expect(token.length).toBeGreaterThan(0);
    });

    it('should generate tokens of specified length', () => {
      const token = generateSecureToken(32);
      
      expect(token).toMatch(/^[A-Za-z0-9+/=]+$/);
      expect(token.length).toBeGreaterThan(30); // Approximate due to base64 encoding
    });

    it('should generate unique tokens', () => {
      const token1 = generateSecureToken();
      const token2 = generateSecureToken();

      expect(token1).not.toBe(token2);
    });

    it('should handle large token requests', () => {
      const token = generateSecureToken(256);
      
      expect(token).toMatch(/^[A-Za-z0-9+/=]+$/);
      expect(token.length).toBeGreaterThan(200);
    });

    it('should handle zero length request', () => {
      const token = generateSecureToken(0);
      
      expect(token).toMatch(/^[A-Za-z0-9+/=]*$/);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle very short encryption keys', () => {
      const shortKey = 'short';
      const plainText = 'Hello, World!';

      expect(() => {
        encryptData(plainText, shortKey);
      }).toThrow();
    });

    it('should handle very long encryption keys', () => {
      const longKey = 'x'.repeat(1000);
      const plainText = 'Hello, World!';

      // Should still work with long keys
      const encrypted = encryptData(plainText, longKey);
      const decrypted = decryptData(encrypted, longKey);

      expect(decrypted).toBe(plainText);
    });

    it('should handle Unicode data correctly', () => {
      const unicodeData = '🌟 Unicode test: ñáéíóú 中文 العربية русский';
      const encrypted = encryptData(unicodeData, testEncryptionKey);
      const decrypted = decryptData(encrypted, testEncryptionKey);

      expect(decrypted).toBe(unicodeData);
    });

    it('should handle JSON data', () => {
      const jsonData = { user: 'test', id: 123, active: true };
      const jsonString = JSON.stringify(jsonData);
      const encrypted = encryptData(jsonString, testEncryptionKey);
      const decrypted = decryptData(encrypted, testEncryptionKey);
      const parsedData = JSON.parse(decrypted);

      expect(parsedData).toEqual(jsonData);
    });
  });

  describe('Performance', () => {
    it('should encrypt/decrypt quickly', () => {
      const plainText = 'Performance test data';
      const iterations = 1000;

      const startTime = Date.now();
      
      for (let i = 0; i < iterations; i++) {
        const encrypted = encryptData(plainText, testEncryptionKey);
        const decrypted = decryptData(encrypted, testEncryptionKey);
        expect(decrypted).toBe(plainText);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete 1000 operations in reasonable time (less than 5 seconds)
      expect(duration).toBeLessThan(5000);
    });

    it('should hash quickly', () => {
      const data = 'Performance test data';
      const iterations = 1000;

      const startTime = Date.now();
      
      for (let i = 0; i < iterations; i++) {
        const hash = hashData(data);
        expect(hash).toMatch(/^[a-f0-9]{64}$/);
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete 1000 hash operations quickly (less than 1 second)
      expect(duration).toBeLessThan(1000);
    });
  });

  describe('Security Considerations', () => {
    it('should not expose sensitive data in error messages', () => {
      const plainText = 'Sensitive data';
      const wrongKey = 'wrong-key';

      expect(() => {
        decryptData('invalid-data', wrongKey);
      }).toThrow();

      // Error should not contain the sensitive data
      try {
        decryptData('invalid-data', wrongKey);
      } catch (error) {
        expect(error.message).not.toContain(plainText);
      }
    });

    it('should use cryptographically secure random generation', () => {
      const tokens = Array(100).fill(null).map(() => generateSecureToken());
      const uniqueTokens = new Set(tokens);

      // All tokens should be unique (very high probability)
      expect(uniqueTokens.size).toBe(tokens.length);
    });
  });
});
