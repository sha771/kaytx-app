import { describe, it, expect } from '@jest/globals';
import * as fc from 'fast-check';
import { z } from 'zod';
import { generators, propertyHelpers } from './generators';

describe('Validation Property-Based Tests', () => {
  describe('Email Validation Properties', () => {
    it('should validate email formats correctly', () => {
      const emailSchema = z.string().email();
      
      fc.assert(
        fc.property(
          propertyHelpers.generateEmailVariations(),
          (email) => {
            const isValid = emailSchema.safeParse(email).success;
            
            // Valid emails should pass
            if (email.includes('@') && email.includes('.') && email.length > 5) {
              expect(isValid).toBe(true);
            }
            
            // Invalid emails should fail
            if (email === 'invalid-email' || email === 'test@' || email === '@domain.com') {
              expect(isValid).toBe(false);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle edge cases in email validation', () => {
      const emailSchema = z.string().email().min(5).max(254);
      
      fc.assert(
        fc.property(
          fc.string({ maxLength: 300 }),
          (email) => {
            const result = emailSchema.safeParse(email);
            
            // Should fail for emails that are too long
            if (email.length > 254) {
              expect(result.success).toBe(false);
            }
            
            // Should fail for emails that are too short
            if (email.length < 5 && email.length > 0) {
              expect(result.success).toBe(false);
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Phone Number Validation Properties', () => {
    it('should validate phone number formats', () => {
      const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);
      
      fc.assert(
        fc.property(
          propertyHelpers.generatePhoneVariations(),
          (phone) => {
            const isValid = phoneSchema.safeParse(phone).success;
            
            // Valid international format should pass
            if (/^\+?[1-9]\d{1,14}$/.test(phone)) {
              expect(isValid).toBe(true);
            }
            
            // Invalid formats should fail
            if (phone === '123' || phone === 'invalid-phone' || phone.length < 7) {
              expect(isValid).toBe(false);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('UUID Validation Properties', () => {
    it('should validate UUID formats consistently', () => {
      const uuidSchema = z.string().uuid();
      
      fc.assert(
        fc.property(
          fc.oneof(
            fc.uuid(), // Valid UUIDs
            fc.string(), // Random strings
            fc.constantFrom('invalid-uuid', '123-456-789', '')
          ),
          (uuid) => {
            const isValid = uuidSchema.safeParse(uuid).success;
            
            // Valid UUIDs should pass
            if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) {
              expect(isValid).toBe(true);
            }
            
            // Invalid UUIDs should fail
            if (uuid === 'invalid-uuid' || uuid === '123-456-789' || uuid === '') {
              expect(isValid).toBe(false);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Numeric Validation Properties', () => {
    it('should validate numeric ranges correctly', () => {
      const scoreSchema = z.number().min(0).max(100);
      
      fc.assert(
        fc.property(
          fc.integer({ min: -50, max: 150 }),
          (score) => {
            const isValid = scoreSchema.safeParse(score).success;
            
            // Valid range should pass
            if (score >= 0 && score <= 100) {
              expect(isValid).toBe(true);
            }
            
            // Invalid range should fail
            if (score < 0 || score > 100) {
              expect(isValid).toBe(false);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle floating point precision', () => {
      const priceSchema = z.number().min(0).max(999999.99).multipleOf(0.01);
      
      fc.assert(
        fc.property(
          fc.float({ min: -100, max: 1000000 }),
          (price) => {
            const result = priceSchema.safeParse(price);
            
            // Valid prices should pass
            if (price >= 0 && price <= 999999.99 && Number.isFinite(price)) {
              expect(result.success).toBe(true);
            }
            
            // Invalid prices should fail
            if (price < 0 || price > 999999.99 || !Number.isFinite(price)) {
              expect(result.success).toBe(false);
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Array Validation Properties', () => {
    it('should validate array constraints', () => {
      const tagsSchema = z.array(z.string().min(1).max(50)).min(1).max(10);
      
      fc.assert(
        fc.property(
          fc.array(fc.string({ minLength: 1, maxLength: 100 }), { minLength: 0, maxLength: 15 }),
          (tags) => {
            const isValid = tagsSchema.safeParse(tags).success;
            
            // Valid arrays should pass
            if (tags.length >= 1 && tags.length <= 10 && tags.every(tag => tag.length <= 50)) {
              expect(isValid).toBe(true);
            }
            
            // Invalid arrays should fail
            if (tags.length === 0 || tags.length > 10 || tags.some(tag => tag.length > 50)) {
              expect(isValid).toBe(false);
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle unique array constraints', () => {
      const uniqueEmailsSchema = z.array(z.string().email()).unique();
      
      fc.assert(
        fc.property(
          fc.array(fc.emailAddress(), { minLength: 0, maxLength: 10 }),
          (emails) => {
            const result = uniqueEmailsSchema.safeParse(emails);
            
            // Arrays with unique emails should pass
            const uniqueEmails = new Set(emails);
            if (uniqueEmails.size === emails.length) {
              expect(result.success).toBe(true);
            }
            
            // Arrays with duplicate emails should fail
            if (uniqueEmails.size < emails.length && emails.length > 0) {
              expect(result.success).toBe(false);
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('Object Validation Properties', () => {
    it('should validate object schemas correctly', () => {
      const userSchema = z.object({
        id: z.string().uuid(),
        email: z.string().email(),
        name: z.string().min(1).max(100),
        age: z.number().min(13).max(120),
        isActive: z.boolean().optional()
      });
      
      fc.assert(
        fc.property(
          generators.user,
          (user) => {
            const result = userSchema.safeParse(user);
            
            // Valid user objects should pass
            expect(result.success).toBe(true);
            
            if (result.success) {
              // Should preserve all required fields
              expect(result.data).toHaveProperty('id');
              expect(result.data).toHaveProperty('email');
              expect(result.data).toHaveProperty('name');
              expect(result.data).toHaveProperty('age');
            }
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should handle partial objects with optional fields', () => {
      const partialUserSchema = z.object({
        id: z.string().uuid(),
        email: z.string().email(),
        name: z.string().min(1).max(100),
        age: z.number().min(13).max(120).optional(),
        isActive: z.boolean().optional()
      });
      
      fc.assert(
        fc.property(
          fc.record({
            id: fc.uuid(),
            email: fc.emailAddress(),
            name: fc.string({ minLength: 1, maxLength: 100 }),
            age: fc.option(fc.integer({ min: 13, max: 120 }), { nil: undefined }),
            isActive: fc.option(fc.boolean(), { nil: undefined })
          }),
          (user) => {
            const result = partialUserSchema.safeParse(user);
            
            // Should pass with optional fields
            expect(result.success).toBe(true);
            
            if (result.success) {
              // Required fields should always be present
              expect(result.data).toHaveProperty('id');
              expect(result.data).toHaveProperty('email');
              expect(result.data).toHaveProperty('name');
              
              // Optional fields may be undefined
              if (user.age !== undefined) {
                expect(result.data.age).toBe(user.age);
              }
              if (user.isActive !== undefined) {
                expect(result.data.isActive).toBe(user.isActive);
              }
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('Schema Composition Properties', () => {
    it('should handle schema unions correctly', () => {
      const paymentSchema = z.union([
        z.object({
          type: z.literal('card'),
          cardNumber: z.string().regex(/^\d{16}$/),
          expiry: z.string().regex(/^\d{2}\/\d{2}$/)
        }),
        z.object({
          type: z.literal('bank'),
          accountNumber: z.string().min(8),
          routingNumber: z.string().regex(/^\d{9}$/)
        })
      ]);
      
      fc.assert(
        fc.property(
          fc.oneof(
            fc.record({
              type: fc.constant('card'),
              cardNumber: fc.string({ minLength: 16, maxLength: 16 }),
              expiry: fc.string({ minLength: 5, maxLength: 5 })
            }),
            fc.record({
              type: fc.constant('bank'),
              accountNumber: fc.string({ minLength: 8 }),
              routingNumber: fc.string({ minLength: 9, maxLength: 9 })
            })
          ),
          (payment) => {
            const result = paymentSchema.safeParse(payment);
            
            // Valid payment objects should pass
            if (payment.type === 'card' && /^\d{16}$/.test(payment.cardNumber) && /^\d{2}\/\d{2}$/.test(payment.expiry)) {
              expect(result.success).toBe(true);
            }
            
            if (payment.type === 'bank' && payment.accountNumber.length >= 8 && /^\d{9}$/.test(payment.routingNumber)) {
              expect(result.success).toBe(true);
            }
          }
        ),
        { numRuns: 30 }
      );
    });
  });

  describe('Custom Validation Properties', () => {
    it('should handle custom validation rules', () => {
      const passwordSchema = z.string()
        .min(8)
        .max(128)
        .regex(/[A-Z]/, 'Must contain uppercase')
        .regex(/[a-z]/, 'Must contain lowercase')
        .regex(/[0-9]/, 'Must contain number')
        .regex(/[^A-Za-z0-9]/, 'Must contain special character');
      
      fc.assert(
        fc.property(
          fc.string({ minLength: 0, maxLength: 150 }),
          (password) => {
            const result = passwordSchema.safeParse(password);
            
            // Strong passwords should pass
            const hasUpper = /[A-Z]/.test(password);
            const hasLower = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecial = /[^A-Za-z0-9]/.test(password);
            const rightLength = password.length >= 8 && password.length <= 128;
            
            if (hasUpper && hasLower && hasNumber && hasSpecial && rightLength) {
              expect(result.success).toBe(true);
            }
            
            // Weak passwords should fail
            if (!rightLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
              expect(result.success).toBe(false);
            }
          }
        ),
        { numRuns: 50 }
      );
    });
  });
});
