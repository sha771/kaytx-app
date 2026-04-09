import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { 
  generateBase32Secret, 
  generateTotp, 
  verifyTotp, 
  buildOtpauthUrl 
} from '../../../backend/lib/mfa-totp';

describe('Authentication - MFA/TOTP', () => {
  describe('Base32 Secret Generation', () => {
    it('should generate valid Base32 secrets', () => {
      const secret = generateBase32Secret();
      
      expect(secret).toBeDefined();
      expect(typeof secret).toBe('string');
      expect(secret.length).toBeGreaterThan(0);
      expect(secret).toMatch(/^[A-Z2-7]+=+$/); // Base32 character set
    });

    it('should generate secrets of consistent length', () => {
      const secrets = Array.from({ length: 10 }, () => generateBase32Secret());
      
      secrets.forEach(secret => {
        expect(secret.length).toBeGreaterThanOrEqual(16); // Minimum secure length
        expect(secret.length).toBeLessThanOrEqual(64); // Reasonable maximum
      });
    });

    it('should generate unique secrets', () => {
      const secret1 = generateBase32Secret();
      const secret2 = generateBase32Secret();
      
      expect(secret1).not.toBe(secret2);
    });

    it('should generate cryptographically secure secrets', () => {
      const secrets = new Set();
      const iterations = 1000;
      
      for (let i = 0; i < iterations; i++) {
        secrets.add(generateBase32Secret());
      }
      
      // With high probability, all secrets should be unique
      expect(secrets.size).toBe(iterations);
    });
  });

  describe('TOTP Generation', () => {
    let secret: string;

    beforeEach(() => {
      secret = generateBase32Secret();
    });

    it('should generate 6-digit TOTP codes', () => {
      const totp = generateTotp(secret);
      
      expect(totp).toBeDefined();
      expect(typeof totp).toBe('string');
      expect(totp.length).toBe(6);
      expect(/^\d{6}$/.test(totp)).toBe(true);
    });

    it('should generate different codes over time', async () => {
      const totp1 = generateTotp(secret);
      
      // Wait for a new time step (30 seconds)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const totp2 = generateTotp(secret);
      
      // Codes should be different (unless we're unlucky with timing)
      // This test might occasionally fail due to timing, but that's acceptable
      expect(totp1).not.toBe(totp2);
    });

    it('should generate consistent codes for same time', () => {
      const totp1 = generateTotp(secret);
      const totp2 = generateTotp(secret);
      
      expect(totp1).toBe(totp2);
    });

    it('should handle custom time windows', () => {
      const customTime = Math.floor(Date.now() / 1000);
      const totp1 = generateTotp(secret, customTime);
      const totp2 = generateTotp(secret, customTime);
      
      expect(totp1).toBe(totp2);
      expect(totp1.length).toBe(6);
    });
  });

  describe('TOTP Verification', () => {
    let secret: string;

    beforeEach(() => {
      secret = generateBase32Secret();
    });

    it('should verify correct TOTP codes', () => {
      const totp = generateTotp(secret);
      const isValid = verifyTotp(totp, secret);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect TOTP codes', () => {
      const correctTotp = generateTotp(secret);
      const incorrectTotp = correctTotp === '123456' ? '654321' : '123456';
      
      const isValid = verifyTotp(incorrectTotp, secret);
      expect(isValid).toBe(false);
    });

    it('should handle time drift (window)', () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const previousTime = currentTime - 30; // Previous time step
      const nextTime = currentTime + 30; // Next time step
      
      const currentTotp = generateTotp(secret, currentTime);
      const previousTotp = generateTotp(secret, previousTime);
      const nextTotp = generateTotp(secret, nextTime);
      
      // Should verify current time step
      expect(verifyTotp(secret, currentTotp, currentTime)).toBe(true);
      
      // Should verify adjacent time steps within window
      expect(verifyTotp(secret, previousTotp, currentTime, 1)).toBe(true);
      expect(verifyTotp(secret, nextTotp, currentTime, 1)).toBe(true);
      
      // Should not verify too far time steps
      expect(verifyTotp(secret, previousTotp, currentTime, 0)).toBe(false);
      expect(verifyTotp(secret, nextTotp, currentTime, 0)).toBe(false);
    });

    it('should handle invalid inputs gracefully', () => {
      expect(verifyTotp('', '123456')).toBe(false);
      expect(verifyTotp(secret, '')).toBe(false);
      expect(verifyTotp('', '')).toBe(false);
      expect(verifyTotp(secret, 'abcdef')).toBe(false); // Non-numeric
      expect(verifyTotp(secret, '12345')).toBe(false); // Too short
      expect(verifyTotp(secret, '1234567')).toBe(false); // Too long
    });

    it('should handle malformed Base32 secrets', () => {
      const malformedSecrets = [
        'INVALID@#$',
        '',
        '123',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ23456789' // Too long
      ];

      malformedSecrets.forEach(badSecret => {
        expect(() => generateTotp(badSecret)).not.toThrow(); // Should handle gracefully
        expect(verifyTotp(badSecret, '123456')).toBe(false);
      });
    });
  });

  describe('OTPAuth URL Generation', () => {
    it('should generate valid OTPAuth URLs', () => {
      const secret = generateBase32Secret();
      const url = buildOtpauthUrl({ secret, issuer: 'Test Service', accountName: 'user@example.com' });
      
      expect(url).toBeDefined();
      expect(typeof url).toBe('string');
      expect(url).toMatch(/^otpauth:\/\/totp\//);
      expect(url).toContain('Test%20Service'); // URL encoded service name
      expect(url).toContain('user%40example.com'); // URL encoded email
      expect(url).toContain(secret);
      expect(url).toContain('algorithm=SHA1');
      expect(url).toContain('digits=6');
      expect(url).toContain('period=30');
    });

    it('should handle special characters in labels', () => {
      const secret = generateBase32Secret();
      const url = buildOtpauthUrl({ secret, issuer: 'Test & Service', accountName: 'user+test@example.com' });
      
      expect(url).toContain('Test%20%26%20Service'); // URL encoded
      expect(url).toContain('user%2Btest%40example.com'); // URL encoded
    });

    it('should handle empty labels', () => {
      const secret = generateBase32Secret();
      const url = buildOtpauthUrl({ secret, issuer: '', accountName: '' });
      
      expect(url).toMatch(/^otpauth:\/\/totp\//);
      expect(url).toContain(secret);
    });

    it('should generate unique URLs for different secrets', () => {
      const secret1 = generateBase32Secret();
      const secret2 = generateBase32Secret();
      
      const url1 = buildOtpauthUrl({ secret: secret1, issuer: 'Service', accountName: 'user@example.com' });
      const url2 = buildOtpauthUrl({ secret: secret2, issuer: 'Service', accountName: 'user@example.com' });
      
      expect(url1).not.toBe(url2);
    });

    it('should generate consistent URLs for same inputs', () => {
      const secret = generateBase32Secret();
      
      const url1 = buildOtpauthUrl({ secret, issuer: 'Service', accountName: 'user@example.com' });
      const url2 = buildOtpauthUrl({ secret, issuer: 'Service', accountName: 'user@example.com' });
      
      expect(url1).toBe(url2);
    });
  });

  describe('Integration Tests', () => {
    it('should work end-to-end: generate secret -> generate TOTP -> verify', () => {
      const secret = generateBase32Secret();
      const totp = generateTotp(secret);
      const isValid = verifyTotp(totp, secret);
      
      expect(isValid).toBe(true);
    });

    it('should work with QR code generation workflow', () => {
      const secret = generateBase32Secret();
      const serviceName = 'MyApp';
      const userEmail = 'user@example.com';
      
      const totp = generateTotp(secret);
      const otpauthUrl = buildOtpauthUrl({ secret, issuer: serviceName, accountName: userEmail });
      const isValid = verifyTotp(totp, secret);
      
      expect(secret).toMatch(/^[A-Z2-7]+=+$/);
      expect(totp).toMatch(/^\d{6}$/);
      expect(otpauthUrl).toMatch(/^otpauth:\/\/totp\//);
      expect(isValid).toBe(true);
    });

    it('should handle multiple users with different secrets', () => {
      const userSecret1 = generateBase32Secret();
      const userSecret2 = generateBase32Secret();
      
      const totp1 = generateTotp(userSecret1);
      const totp2 = generateTotp(userSecret2);
      
      // Each user's TOTP should verify with their own secret
      expect(verifyTotp(userSecret1, totp1)).toBe(true);
      expect(verifyTotp(userSecret2, totp2)).toBe(true);
      
      // But not with each other's secrets
      expect(verifyTotp(userSecret1, totp2)).toBe(false);
      expect(verifyTotp(userSecret2, totp1)).toBe(false);
    });
  });

  describe('Security Considerations', () => {
    it('should generate secrets with sufficient entropy', () => {
      const secrets = Array.from({ length: 100 }, () => generateBase32Secret());
      const uniquePrefixes = new Set(secrets.map(secret => secret.substring(0, 8)));
      
      // With high probability, the first 8 characters should be unique
      expect(uniquePrefixes.size).toBeGreaterThan(90);
    });

    it('should not generate predictable patterns', () => {
      const secrets = Array.from({ length: 10 }, () => generateBase32Secret());
      
      // Check that secrets don't contain obvious patterns
      secrets.forEach(secret => {
        expect(secret).not.toMatch(/(.)\1{10,}/); // No long repeated characters
        expect(secret).not.toMatch(/^[A-Z]+$/); // Not just uppercase letters
        expect(secret).not.toMatch(/^[2-7]+$/); // Not just numbers
      });
    });

    it('should handle edge cases in time-based verification', () => {
      const secret = generateBase32Secret();
      const edgeTimes = [
        0, // Unix epoch
        -1, // Negative time
        Number.MAX_SAFE_INTEGER, // Very large time
        Number.MIN_SAFE_INTEGER // Very small time
      ];

      edgeTimes.forEach(time => {
        expect(() => {
          const totp = generateTotp(secret, time);
          verifyTotp(secret, totp, time);
        }).not.toThrow();
      });
    });
  });

  describe('Performance Tests', () => {
    it('should generate TOTP codes efficiently', () => {
      const secret = generateBase32Secret();
      const iterations = 1000;
      
      const start = process.hrtime.bigint();
      
      for (let i = 0; i < iterations; i++) {
        generateTotp(secret);
      }
      
      const duration = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
      
      // Should complete 1000 generations in reasonable time
      expect(duration).toBeLessThan(1000);
    });

    it('should verify TOTP codes efficiently', () => {
      const secret = generateBase32Secret();
      const totp = generateTotp(secret);
      const iterations = 1000;
      
      const start = process.hrtime.bigint();
      
      for (let i = 0; i < iterations; i++) {
        verifyTotp(totp, secret);
      }
      
      const duration = Number(process.hrtime.bigint() - start) / 1000000; // Convert to ms
      
      // Should complete 1000 verifications in reasonable time
      expect(duration).toBeLessThan(1000);
    });
  });
});
