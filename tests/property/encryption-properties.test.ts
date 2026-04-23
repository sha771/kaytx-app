import { describe, it, expect } from '@jest/globals';
import * as fc from 'fast-check';
import { encrypt, decrypt, generateEncryptionKey, hashData } from '../../backend/lib/encryption';

describe('Encryption Property-Based Tests', () => {
  describe('Round-Trip Encryption Properties', () => {
    it('should maintain data integrity through encryption/decryption cycles', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constant(generateEncryptionKey()), // Valid 32-byte hex key
          (plaintext, masterKey) => {
            // Encrypt the data
            const encrypted = encrypt(plaintext, masterKey);
            
            // Decrypt the data
            const decrypted = decrypt(encrypted.encrypted, masterKey, encrypted.iv, encrypted.authTag);
            
            // Should get back the original plaintext
            expect(decrypted).toBe(plaintext);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle different data types correctly', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.string(),
            fc.integer(),
            fc.float(),
            fc.boolean(),
            fc.record({ key: fc.string(), value: fc.integer() })
          ),
          fc.constant(generateEncryptionKey()),
          (data, masterKey) => {
            const jsonString = JSON.stringify(data);
            
            // Encrypt
            const encrypted = encrypt(jsonString, masterKey);
            
            // Decrypt
            const decrypted = decrypt(encrypted.encrypted, masterKey, encrypted.iv, encrypted.authTag);
            
            // Should get back the original JSON
            expect(decrypted).toBe(jsonString);
            
            // Should parse back to original data (skip dates as they serialize differently)
            if (!(data instanceof Date)) {
              expect(JSON.parse(decrypted)).toEqual(data);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should produce different ciphertexts for same plaintext with different IVs', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }), // Non-empty string
          fc.constant(generateEncryptionKey()),
          (plaintext, masterKey) => {
            // Encrypt twice
            const encrypted1 = encrypt(plaintext, masterKey);
            const encrypted2 = encrypt(plaintext, masterKey);
            
            // Ciphertexts should be different (due to random IV)
            expect(encrypted1.encrypted).not.toBe(encrypted2.encrypted);
            expect(encrypted1.iv).not.toBe(encrypted2.iv);
            
            // But both should decrypt to the same plaintext
            const decrypted1 = decrypt(encrypted1.encrypted, masterKey, encrypted1.iv, encrypted1.authTag);
            const decrypted2 = decrypt(encrypted2.encrypted, masterKey, encrypted2.iv, encrypted2.authTag);
            
            expect(decrypted1).toBe(plaintext);
            expect(decrypted2).toBe(plaintext);
            expect(decrypted1).toBe(decrypted2);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should produce ciphertext with expected properties', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }), // Non-empty string
          fc.constant(generateEncryptionKey()),
          (plaintext, masterKey) => {
            const encrypted = encrypt(plaintext, masterKey);
            
            // Should have required properties
            expect(encrypted).toHaveProperty('encrypted');
            expect(encrypted).toHaveProperty('iv');
            expect(encrypted).toHaveProperty('authTag');
            
            // Properties should be strings
            expect(typeof encrypted.encrypted).toBe('string');
            expect(typeof encrypted.iv).toBe('string');
            expect(typeof encrypted.authTag).toBe('string');
            
            // Should not be empty
            expect(encrypted.encrypted.length).toBeGreaterThan(0);
            expect(encrypted.iv.length).toBe(32); // 128 bits in hex
            expect(encrypted.authTag.length).toBe(32); // 128 bits in hex
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Hash Properties', () => {
    it('should produce consistent hashes for same input', () => {
      fc.assert(
        fc.property(
          fc.string(),
          (data) => {
            const hash1 = hashData(data);
            const hash2 = hashData(data);
            
            expect(hash1).toBe(hash2);
            expect(hash1).toMatch(/^[a-f0-9]{64}$/); // SHA256 hex
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should produce different hashes for different inputs', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          (data1, data2) => {
            if (data1 !== data2) {
              const hash1 = hashData(data1);
              const hash2 = hashData(data2);
              expect(hash1).not.toBe(hash2);
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle edge cases correctly', () => {
      fc.assert(
        fc.property(
          fc.oneof(
            fc.constant(''),
            fc.constant('a'),
            fc.string({ maxLength: 1 }),
            fc.lorem({ maxCount: 1000 }) // Large input
          ),
          (data) => {
            const hash = hashData(data);
            expect(hash).toMatch(/^[a-f0-9]{64}$/); // Should always be valid SHA256
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Security Properties', () => {
    it('should fail decryption with wrong key', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constant(generateEncryptionKey()),
          fc.constant(generateEncryptionKey()),
          (plaintext, correctKey, wrongKey) => {
            // Ensure keys are different
            if (correctKey === wrongKey) {
              wrongKey = wrongKey + 'x';
            }
            
            // Encrypt with correct key
            const encrypted = encrypt(plaintext, correctKey);
            
            // Should fail to decrypt with wrong key
            expect(() => {
              decrypt(encrypted.encrypted, wrongKey, encrypted.iv, encrypted.authTag);
            }).toThrow();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should fail decryption with wrong IV', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constant(generateEncryptionKey()),
          (plaintext, masterKey) => {
            // Encrypt
            const encrypted = encrypt(plaintext, masterKey);
            
            // Try to decrypt with wrong IV
            const wrongIV = generateEncryptionKey().substring(0, 32); // Get 32 chars for IV
            
            expect(() => {
              decrypt(encrypted.encrypted, masterKey, wrongIV, encrypted.authTag);
            }).toThrow();
          }
        ),
        { numRuns: 30 }
      );
    });

    it('should fail decryption with wrong auth tag', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.constant(generateEncryptionKey()),
          (plaintext, masterKey) => {
            // Encrypt
            const encrypted = encrypt(plaintext, masterKey);
            
            // Try to decrypt with wrong auth tag
            const wrongAuthTag = generateEncryptionKey().substring(0, 32); // Get 32 chars for auth tag
            
            expect(() => {
              decrypt(encrypted.encrypted, masterKey, encrypted.iv, wrongAuthTag);
            }).toThrow();
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('Key Generation Properties', () => {
    it('should generate valid encryption keys', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 10 }), (count) => {
          const keys = Array.from({ length: count }, () => generateEncryptionKey());
          
          // All keys should be valid hex
          keys.forEach(key => {
            expect(key).toMatch(/^[a-f0-9]{64}$/); // 32 bytes = 64 hex chars
            expect(() => Buffer.from(key, 'hex')).not.toThrow();
          });
          
          // All keys should be different
          const uniqueKeys = new Set(keys);
          expect(uniqueKeys.size).toBe(count);
        }),
        { numRuns: 20 }
      );
    });
  });

  describe('Performance Properties', () => {
    it('should complete encryption/decryption within reasonable time', () => {
      fc.assert(
        fc.property(
          fc.lorem({ maxCount: 100 }), // Reasonable size
          fc.constant(generateEncryptionKey()),
          (plaintext, masterKey) => {
            const startTime = Date.now();
            
            // Encrypt
            const encrypted = encrypt(plaintext, masterKey);
            
            // Decrypt
            const decrypted = decrypt(encrypted.encrypted, masterKey, encrypted.iv, encrypted.authTag);
            
            const endTime = Date.now();
            const duration = endTime - startTime;
            
            // Should complete within reasonable time (less than 100ms)
            expect(duration).toBeLessThan(100);
            
            // Should still be correct
            expect(decrypted).toBe(plaintext);
          }
        ),
        { numRuns: 30 }
      );
    });
  });
});
