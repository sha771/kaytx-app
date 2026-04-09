import fc from 'fast-check';
import { describe, it, expect } from '@jest/globals';
import {
  encrypt,
  decrypt,
  encryptField,
  decryptField,
  encryptFields,
  decryptFields,
  generateEncryptionKey,
  EncryptedField
} from '../../backend/lib/encryption';

describe('Encryption Property Tests', () => {
  describe('Property 2: Field-Level Encryption Round-Trip', () => {
    it('should maintain data integrity through encrypt-decrypt cycles', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random plaintext data
          fc.string({ minLength: 1, maxLength: 1000 }).filter(s => s.trim().length > 0),
          // Generate random encryption key
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '0').padEnd(64, '0')),
          async (plaintext, key) => {
            // Property: Basic encrypt-decrypt should be reversible
            const encrypted = encrypt(plaintext, key);
            const decrypted = decrypt(encrypted.encrypted, key, encrypted.iv, encrypted.authTag);
            expect(decrypted).toBe(plaintext);

            // Property: Field encryption should be reversible
            const encryptedField = encryptField(plaintext, key);
            const decryptedField = decryptField(encryptedField, key);
            expect(decryptedField).toBe(plaintext);

            // Property: Different encryptions of same data should produce different ciphertexts
            const encryptedField2 = encryptField(plaintext, key);
            expect(encryptedField.encrypted).not.toBe(encryptedField2.encrypted);
            expect(encryptedField.iv).not.toBe(encryptedField2.iv);
            expect(encryptedField.authTag).not.toBe(encryptedField2.authTag);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle object encryption correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random object with sensitive fields
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
            email: fc.emailAddress(),
            ssn: fc.string({ minLength: 9, maxLength: 9, pattern: /[0-9]{9}/ }),
            creditCard: fc.string({ minLength: 16, maxLength: 16, pattern: /[0-9]{16}/ }),
            phone: fc.string({ minLength: 10, maxLength: 15, pattern: /[0-9-()+ ]{10,15}/ }),
            address: fc.string({ minLength: 5, maxLength: 200 }).filter(s => s.trim().length > 0),
            notes: fc.option(fc.string({ maxLength: 500 }).filter(s => !s.includes(':'))),
          }),
          // Generate random encryption key
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '0').padEnd(64, '0')),
          // Generate list of fields to encrypt
          fc.array(
            fc.constantFrom<'ssn' | 'creditCard' | 'phone' | 'email'>('ssn', 'creditCard', 'phone', 'email'),
            { minLength: 1, maxLength: 4 }
          ),
          async (data, key, fieldsToEncrypt) => {
            // Property: Object encryption should encrypt specified fields
            const originalData = { ...data };
            const encryptedData = encryptFields(data, fieldsToEncrypt, key);
            
            // Check that specified fields are encrypted
            for (const field of fieldsToEncrypt) {
              expect(encryptedData[field]).not.toBe(originalData[field]);
              expect(isEncryptedField(encryptedData[field])).toBe(true);
            }
            
            // Check that unspecified fields remain unchanged
            const allFields = Object.keys(data);
            const unencryptedFields = allFields.filter(f => !fieldsToEncrypt.includes(f));
            for (const field of unencryptedFields) {
              expect(encryptedData[field]).toBe(originalData[field]);
            }

            // Property: Object decryption should restore original data
            const decryptedData = decryptFields(encryptedData, fieldsToEncrypt, key);
            expect(decryptedData).toEqual(originalData);
          }
        ),
        { numRuns: 25 }
      );
    });

    it('should maintain encryption properties across multiple operations', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate array of random strings (non-empty, no colons)
          fc.array(fc.string({ minLength: 1, maxLength: 100 }).filter(s => s.trim().length > 0 && !s.includes(':')), { minLength: 1, maxLength: 5 }),
          // Generate random encryption key
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '0').padEnd(64, '0')),
          async (strings, key) => {
            const encryptedFields: EncryptedField[] = [];
            
            // Property: Multiple encryptions should produce unique ciphertexts
            for (const str of strings) {
              const encrypted = encryptField(str, key);
              encryptedFields.push(encrypted);
              
              // Each encryption should be unique
              const encryptedAgain = encryptField(str, key);
              expect(encrypted.encrypted).not.toBe(encryptedAgain.encrypted);
            }
            
            // Property: All encrypted fields should decrypt correctly
            for (let i = 0; i < strings.length; i++) {
              const decrypted = decryptField(encryptedFields[i], key);
              expect(decrypted).toBe(strings[i]);
            }
            
            // Property: Encrypted fields should not contain plaintext (but allow for base64 encoding artifacts)
            for (let i = 0; i < encryptedFields.length; i++) {
              const encrypted = encryptedFields[i];
              const originalString = strings[i];
              
              // Check that the original plaintext is not directly in the encrypted data
              // But we need to be more lenient because the plaintext is base64 encoded first
              const base64Encoded = Buffer.from(originalString, 'utf8').toString('base64');
              
              // The encrypted data should not contain the original plaintext directly
              expect(encrypted.encrypted).not.toContain(originalString);
              
              // For very short strings, the base64 version might appear by chance in encrypted output
              // So we only check this for strings longer than 3 characters
              if (originalString.length > 3) {
                expect(encrypted.encrypted).not.toContain(base64Encoded);
              }
              
              // IV and authTag should never contain the original string
              expect(encrypted.iv).not.toContain(originalString);
              expect(encrypted.authTag).not.toContain(originalString);
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });
});

// Helper function to check if a field is encrypted
function isEncryptedField(field: any): field is EncryptedField {
  return field && 
         typeof field === 'object' && 
         typeof field.encrypted === 'string' && 
         typeof field.iv === 'string' && 
         typeof field.authTag === 'string';
}

// Mock the getFieldEncryptionKey for testing
jest.mock('../../backend/lib/encryption', () => {
  const originalModule = jest.requireActual('../../backend/lib/encryption');
  return {
    ...originalModule,
    getFieldEncryptionKey: () => 'a'.repeat(64), // Return a consistent test key
  };
});
