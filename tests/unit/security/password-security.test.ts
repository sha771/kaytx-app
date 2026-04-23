import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { 
  calculateEntropy, 
  validatePasswordStrength 
} from '../../../backend/lib/auth';

describe('Password Security Enhancements', () => {
  describe('calculateEntropy', () => {
    it('should calculate low entropy for simple passwords', () => {
      const entropy = calculateEntropy('password');
      expect(entropy).toBeLessThan(50);
    });

    it('should calculate higher entropy for complex passwords', () => {
      const entropy = calculateEntropy('MyP@ssw0rd!123');
      expect(entropy).toBeGreaterThan(60);
    });

    it('should give bonus for character variety', () => {
      const simpleEntropy = calculateEntropy('aaaaaaaa');
      const variedEntropy = calculateEntropy('aA1!aA1!');
      expect(variedEntropy).toBeGreaterThan(simpleEntropy);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should reject passwords shorter than 12 characters', () => {
      const result = validatePasswordStrength('Short1!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must be at least 12 characters long');
    });

    it('should reject passwords with low entropy', () => {
      const result = validatePasswordStrength('aaaaaaaaaaaa');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('Password is too weak'))).toBe(true);
    });

    it('should reject passwords without uppercase letters', () => {
      const result = validatePasswordStrength('mypassword123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject passwords without lowercase letters', () => {
      const result = validatePasswordStrength('MYPASSWORD123!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject passwords without numbers', () => {
      const result = validatePasswordStrength('MyPassword!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject passwords without special characters', () => {
      const result = validatePasswordStrength('MyPassword123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character');
    });

    it('should reject passwords with repeated characters', () => {
      const result = validatePasswordStrength('MyPassword!!!123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password cannot contain 3 or more repeated characters');
    });

    it('should reject passwords with sequential characters', () => {
      const result = validatePasswordStrength('MyPassword123abc');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Password cannot contain sequential characters');
    });

    it('should reject common password patterns', () => {
      const result = validatePasswordStrength('MyPassword123!');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('common patterns'))).toBe(true);
    });

    it('should accept strong passwords', () => {
      const result = validatePasswordStrength('Tr0ub4dor&3!');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });
});
