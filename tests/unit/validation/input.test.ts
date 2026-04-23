import { describe, it, expect } from '@jest/globals';
import { z } from 'zod';

describe('Input Validation', () => {
  describe('Email Validation', () => {
    const emailSchema = z.string().email('Invalid email format');

    it('should validate correct email formats', () => {
      const validEmails = [
        'user@example.com',
        'test.email+tag@domain.co.uk',
        'user123@test-domain.org',
        'firstname.lastname@company.com',
        'a@b.co',
        'very.long.email.address@domain.com'
      ];

      validEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).not.toThrow();
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user..name@domain.com',
        'user name@domain.com',
        'user@domain..com',
        '',
        ' ',
        'user@domain',
        'user@.com',
        '.user@domain.com'
      ];

      invalidEmails.forEach(email => {
        expect(() => emailSchema.parse(email)).toThrow();
      });
    });
  });

  describe('Password Validation', () => {
    const passwordSchema = z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character');

    it('should validate strong passwords', () => {
      const strongPasswords = [
        'MyStr0ng!P@ssw0rd',
        'Th1s!sA-V3ryC0mpl3xP@ssw0rd',
        'SecureP@ssw0rd123',
        'C0mpl3x!P@ss'
      ];

      strongPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).not.toThrow();
      });
    });

    it('should reject weak passwords', () => {
      const weakPasswords = [
        'password', // no uppercase, number, special
        'PASSWORD', // no lowercase, number, special
        '12345678', // no letters, special
        'Password', // no number, special
        'Password1', // no special
        'Pass1!', // too short
        '', // empty
        '   ' // spaces only
      ];

      weakPasswords.forEach(password => {
        expect(() => passwordSchema.parse(password)).toThrow();
      });
    });

    it('should provide specific error messages', () => {
      try {
        passwordSchema.parse('abc'); // Fails all 5 rules: too short, no uppercase, no lowercase, no number, no special
        fail('Expected validation to fail');
      } catch (error) {
        const zodError = error as z.ZodError;
        console.log('Actual errors:', zodError.issues.map(e => e.message));
        console.log('Number of errors:', zodError.issues.length);
        expect(zodError.issues).toHaveLength(5); // length, uppercase, lowercase, number, special
      }
    });
  });

  describe('UUID Validation', () => {
    const uuidSchema = z.string().uuid('Invalid UUID format');

    it('should validate valid UUIDs', () => {
      const validUuids = [
        '123e4567-e89b-12d3-a456-426614174000',
        '550e8400-e29b-41d4-a716-446655440000',
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        '6ba7b811-9dad-11d1-80b4-00c04fd430c8'
      ];

      validUuids.forEach(uuid => {
        expect(() => uuidSchema.parse(uuid)).not.toThrow();
      });
    });

    it('should reject invalid UUIDs', () => {
      const invalidUuids = [
        'invalid-uuid',
        '123e4567-e89b-12d3-a456', // too short
        '123e4567-e89b-12d3-a456-42661417400', // missing character
        '123e4567-e89b-12d3-a456-4266141740000', // too long
        'ggge4567-e89b-12d3-a456-426614174000', // invalid hex
        '',
        'not-a-uuid'
      ];

      invalidUuids.forEach(uuid => {
        expect(() => uuidSchema.parse(uuid)).toThrow();
      });
    });
  });

  describe('Phone Number Validation', () => {
    const phoneSchema = z.string()
      .regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format')
      .min(10, 'Phone number must be at least 10 digits')
      .max(20, 'Phone number too long');

    it('should validate valid phone numbers', () => {
      const validPhones = [
        '+1234567890',
        '+1 (555) 123-4567',
        '555-123-4567',
        '5551234567',
        '+44 20 7123 4567',
        '+91-9876543210'
      ];

      validPhones.forEach(phone => {
        expect(() => phoneSchema.parse(phone)).not.toThrow();
      });
    });

    it('should reject invalid phone numbers', () => {
      const invalidPhones = [
        'abc-123-4567',
        '123-456',
        '+1 (555) abc-defg',
        '',
        '   ',
        '123456789012345678901', // too long
        '+1234567890a' // contains letter
      ];

      invalidPhones.forEach(phone => {
        expect(() => phoneSchema.parse(phone)).toThrow();
      });
    });
  });

  describe('URL Validation', () => {
    const urlSchema = z.string().url('Invalid URL format');

    it('should validate valid URLs', () => {
      const validUrls = [
        'https://example.com',
        'http://localhost:3000',
        'https://api.example.com/v1/users',
        'https://subdomain.example.co.uk/path?query=value',
        'ftp://files.example.com',
        'ws://websocket.example.com'
      ];

      validUrls.forEach(url => {
        expect(() => urlSchema.parse(url)).not.toThrow();
      });
    });

    it('should reject invalid URLs', () => {
      const invalidUrls = [
        'not-a-url',
        'http://', // empty host
        'https://', // empty host
        '',
        'javascript:alert(1)',
      ];

      invalidUrls.forEach(url => {
        expect(() => urlSchema.parse(url)).toThrow();
      });
    });
  });

  describe('Date Validation', () => {
    const dateSchema = z.string().datetime('Invalid datetime format');

    it('should validate valid ISO dates', () => {
      const validDates = [
        '2024-01-15T10:30:00Z',
        '2024-01-15T10:30:00+05:30',
        '2024-01-15T10:30:00.123Z',
        '2024-01-15T10:30:00.123456+05:30'
      ];

      validDates.forEach(date => {
        expect(() => dateSchema.parse(date)).not.toThrow();
      });
    });

    it('should reject invalid dates', () => {
      const invalidDates = [
        '2024-13-01T10:30:00Z', // invalid month
        '2024-02-30T10:30:00Z', // invalid day
        '2024-01-15T25:30:00Z', // invalid hour
        '2024-01-15 10:30:00', // missing T
        '15-01-2024T10:30:00Z', // wrong format
        'not-a-date',
        ''
      ];

      invalidDates.forEach(date => {
        expect(() => dateSchema.parse(date)).toThrow();
      });
    });
  });

  describe('Array Validation', () => {
    const stringArraySchema = z.array(z.string().min(1)).min(1).max(10);

    it('should validate valid arrays', () => {
      const validArrays = [
        ['item1'],
        ['item1', 'item2', 'item3'],
        Array(5).fill('test')
      ];

      validArrays.forEach(array => {
        expect(() => stringArraySchema.parse(array)).not.toThrow();
      });
    });

    it('should reject invalid arrays', () => {
      const invalidArrays = [
        [], // empty array
        [''], // empty string
        Array(11).fill('test'), // too many items
        [1, 2, 3], // wrong type
        null,
        undefined
      ];

      invalidArrays.forEach(array => {
        expect(() => stringArraySchema.parse(array)).toThrow();
      });
    });
  });

  describe('Object Validation', () => {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      age: z.number().min(18).max(120).optional(),
      preferences: z.object({
        theme: z.enum(['light', 'dark']).default('light'),
        notifications: z.boolean().default(true)
      }).optional()
    });

    it('should validate valid objects', () => {
      const validObjects = [
        {
          email: 'user@example.com',
          password: 'password123'
        },
        {
          email: 'user@example.com',
          password: 'password123',
          age: 25,
          preferences: {
            theme: 'dark',
            notifications: false
          }
        }
      ];

      validObjects.forEach(obj => {
        expect(() => userSchema.parse(obj)).not.toThrow();
      });
    });

    it('should reject invalid objects', () => {
      const invalidObjects = [
        {}, // missing required fields
        { email: 'invalid-email', password: 'password123' }, // invalid email
        { email: 'user@example.com', password: '123' }, // password too short
        { email: 'user@example.com', password: 'password123', age: 15 }, // age too young
        { email: 'user@example.com', password: 'password123', preferences: { theme: 'invalid' } }
      ];

      invalidObjects.forEach(obj => {
        expect(() => userSchema.parse(obj)).toThrow();
      });
    });

    it('should handle partial objects with optional fields', () => {
      const partialObject = {
        email: 'user@example.com',
        password: 'password123',
        preferences: {
          theme: 'light'
          // notifications should default to true
        }
      };

      const result = userSchema.parse(partialObject);
      expect(result.preferences?.notifications).toBe(true);
    });
  });

  describe('Enum Validation', () => {
    const statusSchema = z.enum(['active', 'inactive', 'pending', 'suspended']);

    it('should validate valid enum values', () => {
      const validValues = ['active', 'inactive', 'pending', 'suspended'];
      
      validValues.forEach(value => {
        expect(() => statusSchema.parse(value)).not.toThrow();
      });
    });

    it('should reject invalid enum values', () => {
      const invalidValues = ['invalid', 'ACTIVE', 'Active', '', null, undefined];
      
      invalidValues.forEach(value => {
        expect(() => statusSchema.parse(value)).toThrow();
      });
    });
  });

  describe('Numeric Validation', () => {
    const numericSchema = z.number()
      .min(0, 'Value must be non-negative')
      .max(1000000, 'Value must be less than 1,000,000')
      .multipleOf(0.01, 'Value must have at most 2 decimal places');

    it('should validate valid numbers', () => {
      const validNumbers = [0, 1, 99.99, 100, 999999.99];
      
      validNumbers.forEach(num => {
        expect(() => numericSchema.parse(num)).not.toThrow();
      });
    });

    it('should reject invalid numbers', () => {
      const invalidNumbers = [-1, -0.01, 1000000.01, 999999.999, Infinity, NaN];
      
      invalidNumbers.forEach(num => {
        expect(() => numericSchema.parse(num)).toThrow();
      });
    });
  });

  describe('Sanitization and Transformation', () => {
    const trimmedSchema = z.string().trim();
    const lowercaseSchema = z.string().toLowerCase();
    const emailNormalizer = z.string().email().transform(email => email.toLowerCase());

    it('should trim whitespace', () => {
      expect(trimmedSchema.parse('  hello  ')).toBe('hello');
      expect(trimmedSchema.parse('\t\nhello\n\t')).toBe('hello');
    });

    it('should convert to lowercase', () => {
      expect(lowercaseSchema.parse('HeLLo WoRLd')).toBe('hello world');
    });

    it('should normalize email addresses', () => {
      expect(emailNormalizer.parse('User@Example.COM')).toBe('user@example.com');
    });
  });

  describe('Complex Validation Scenarios', () => {
    const registrationSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/),
      confirmPassword: z.string(),
      age: z.number().min(18),
      terms: z.boolean().refine(val => val === true, 'Must accept terms')
    }).refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword']
    });

    it('should validate complex registration data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        age: 25,
        terms: true
      };

      expect(() => registrationSchema.parse(validData)).not.toThrow();
    });

    it('should reject registration with mismatched passwords', () => {
      const invalidData = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Different123',
        age: 25,
        terms: true
      };

      expect(() => registrationSchema.parse(invalidData)).toThrow("Passwords don't match");
    });

    it('should reject registration without terms acceptance', () => {
      const invalidData = {
        email: 'user@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        age: 25,
        terms: false
      };

      expect(() => registrationSchema.parse(invalidData)).toThrow('Must accept terms');
    });
  });
});
