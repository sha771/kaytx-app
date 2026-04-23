import fc from 'fast-check';
import { describe, it, expect } from '@jest/globals';

import {
  encrypt,
  decrypt,
  encryptField,
  decryptField,
  encryptFields,
  decryptFields,
  encryptPaymentData,
  decryptPaymentData,
  generateEncryptionKey,
  rotateFieldEncryption,
  EncryptedField
} from '../../backend/lib/encryption';

// Mock the getFieldEncryptionKey function before importing
jest.mock('../../backend/lib/encryption', () => {
  const originalModule = jest.requireActual('../../backend/lib/encryption');
  return {
    ...originalModule,
    getFieldEncryptionKey: () => 'a'.repeat(64), // Return a consistent test key
  };
});

describe('Encryption Property Tests', () => {
  describe('Property 2: Field-Level Encryption Round-Trip', () => {
    it('should maintain data integrity through encrypt-decrypt cycles', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random plaintext data
          fc.string({ minLength: 1, maxLength: 1000 }),
          // Generate random encryption key
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '0').padEnd(64, '0')),
          // Generate optional additional data
          fc.option(fc.string({ minLength: 1, maxLength: 100 })),
          async (plaintext, key, additionalData) => {
            // Property: Basic encrypt-decrypt should be reversible
            const encrypted = encrypt(plaintext, key);
            const decrypted = decrypt(encrypted.encrypted, key, encrypted.iv, encrypted.authTag);
            expect(decrypted).toBe(plaintext);

            // Property: Field encryption should be reversible
            const encryptedField = encryptField(plaintext, key, additionalData);
            const decryptedField = decryptField(encryptedField, key);
            expect(decryptedField).toBe(plaintext);

            // Property: Different encryptions of same data should produce different ciphertexts
            const encryptedField2 = encryptField(plaintext, key, additionalData);
            expect(encryptedField.encrypted).not.toBe(encryptedField2.encrypted);
            expect(encryptedField.iv).not.toBe(encryptedField2.iv);
            expect(encryptedField.authTag).not.toBe(encryptedField2.authTag);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle object encryption correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random object with sensitive fields
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 1, maxLength: 50 }),
            email: fc.emailAddress(),
            ssn: fc.string({ minLength: 9, maxLength: 9, pattern: /[0-9]{9}/ }),
            creditCard: fc.string({ minLength: 16, maxLength: 16, pattern: /[0-9]{16}/ }),
            phone: fc.string({ minLength: 10, maxLength: 15, pattern: /[0-9-()+ ]{10,15}/ }),
            address: fc.string({ minLength: 5, maxLength: 200 }),
            notes: fc.option(fc.string({ maxLength: 500 })),
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
        { numRuns: 50 }
      );
    });

    it('should handle payment data encryption correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random payment data
          fc.record({
            cardNumber: fc.string({ minLength: 16, maxLength: 16, pattern: /[0-9]{16}/ }),
            bankAccount: fc.option(fc.string({ minLength: 8, maxLength: 17, pattern: /[0-9]{8,17}/ })),
            routingNumber: fc.option(fc.string({ minLength: 9, maxLength: 9, pattern: /[0-9]{9}/ })),
          }),
          // Generate random encryption key
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '0').padEnd(64, '0')),
          async (paymentData, key) => {
            // Property: Payment data encryption should encrypt all financial fields
            const encrypted = encryptPaymentData(paymentData);
            
            // Check that all provided fields are encrypted
            if (paymentData.cardNumber) {
              expect(encrypted.cardNumber).toBeDefined();
              expect(isEncryptedField(encrypted.cardNumber)).toBe(true);
            }
            
            if (paymentData.bankAccount) {
              expect(encrypted.bankAccount).toBeDefined();
              expect(isEncryptedField(encrypted.bankAccount)).toBe(true);
            }
            
            if (paymentData.routingNumber) {
              expect(encrypted.routingNumber).toBeDefined();
              expect(isEncryptedField(encrypted.routingNumber)).toBe(true);
            }

            // Property: Payment data decryption should restore original values
            const decrypted = decryptPaymentData(encrypted);
            expect(decrypted).toEqual(paymentData);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle key rotation correctly', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate random plaintext (non-empty)
          fc.string({ minLength: 1, maxLength: 100 }),
          // Generate two different encryption keys
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '0').padEnd(64, '0')),
          fc.string({ minLength: 64, maxLength: 64 }).map(s => s.replace(/[^0-9a-fA-F]/g, '1').padEnd(64, '1')),
          async (plaintext, oldKey, newKey) => {
            // Ensure keys are different
            if (oldKey === newKey) return;

            // Property: Key rotation should maintain data accessibility
            const encryptedWithOldKey = encryptField(plaintext, oldKey);
            const rotatedEncrypted = rotateFieldEncryption(encryptedWithOldKey, oldKey, newKey);
            const decryptedWithNewKey = decryptField(rotatedEncrypted, newKey);
            
            expect(decryptedWithNewKey).toBe(plaintext);
            
            // Property: Old key should not work after rotation
            expect(() => {
              decryptField(rotatedEncrypted, oldKey);
            }).toThrow();
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should maintain encryption properties across multiple operations', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate array of random strings (non-empty)
          fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 1, maxLength: 10 }),
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
            
            // Property: Encrypted fields should not contain plaintext
            for (let i = 0; i < encryptedFields.length; i++) {
              const encrypted = encryptedFields[i];
              const originalString = strings[i];
              expect(encrypted.encrypted).not.toContain(originalString);
              expect(encrypted.iv).not.toContain(originalString);
              expect(encrypted.authTag).not.toContain(originalString);
            }
          }
        ),
        { numRuns: 30 }
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
