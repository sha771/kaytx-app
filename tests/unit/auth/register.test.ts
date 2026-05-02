import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { hashPassword, validatePasswordStrength, validateEmail } from '../../../backend/lib/auth';

describe('Authentication - Registration', () => {
  describe('Password Validation', () => {
    it('should validate strong passwords correctly', () => {
      const strongPassword = 'MyStr0ng!P@ssw0rd';
      const result = validatePasswordStrength(strongPassword);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject passwords that are too short', () => {
      const shortPassword = 'Abc1!';
      const result = validatePasswordStrength(shortPassword);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 12 characters long');
    });

    it('should reject passwords without uppercase letters', () => {
      const noUpperPassword = 'mystr0ng!password';
      const result = validatePasswordStrength(noUpperPassword);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject passwords without lowercase letters', () => {
      const noLowerPassword = 'MYSTR0NG!PASSWORD';
      const result = validatePasswordStrength(noLowerPassword);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject passwords without numbers', () => {
      const noNumberPassword = 'MyStrong!Password';
      const result = validatePasswordStrength(noNumberPassword);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject passwords without special characters', () => {
      const noSpecialPassword = 'MyStr0ngPassword';
      const result = validatePasswordStrength(noSpecialPassword);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });
  });

  describe('Email Validation', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user123@test-domain.org',
        'firstname.lastname@company.com'
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user..name@domain.com',
        'user@domain',
        'user name@domain.com',
        'user@domain..com'
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });
  });

  describe('Password Hashing', () => {
    it('should hash passwords with bcrypt', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(50); // bcrypt hashes are typically 60 chars
      expect(hashedPassword.startsWith('$2')).toBe(true); // bcrypt hashes start with $2
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'TestPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should handle password hashing errors gracefully', async () => {
      // Test with null/undefined input
      await expect(hashPassword(null as any)).rejects.toThrow();
      await expect(hashPassword(undefined as any)).rejects.toThrow();
    });
  });

  describe('Registration Security', () => {
    it('should prevent common weak passwords', () => {
      const weakPasswords = [
        'password',
        '12345678',
        'qwerty123',
        'admin123',
        'password123',
        'letmein123'
      ];

      weakPasswords.forEach(password => {
        const result = validatePasswordStrength(password);
        expect(result.valid).toBe(false);
      });
    });

    it('should require password complexity', () => {
      const complexPassword = 'Th1s!sA-V3ryC0mpl3xP@ssw0rd';
      const result = validatePasswordStrength(complexPassword);
      
      expect(result.valid).toBe(true);
    });

    it('should validate edge case email formats', () => {
      const edgeCases = [
        { email: 'a@b.co', valid: true },
        { email: 'very.long.email.address@domain.com', valid: true },
        { email: 'user+tag+Filter@domain.com', valid: true },
        { email: 'user@sub.domain.com', valid: true },
        { email: '', valid: false },
        { email: ' ', valid: false },
        { email: 'user@domain', valid: false }
      ];

      edgeCases.forEach(({ email, valid }) => {
        expect(validateEmail(email)).toBe(valid);
      });
    });
  });
});
