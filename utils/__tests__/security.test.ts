import {
  validation,
  rateLimiter,
  encryption,
  sanitization,
} from '../security';

describe('Security Utils', () => {
  describe('validation.email', () => {
    it('should validate correct email addresses', () => {
      expect(validation.email('test@example.com').valid).toBe(true);
      expect(validation.email('user.name+tag@example.co.uk').valid).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validation.email('invalid').valid).toBe(false);
      expect(validation.email('test@').valid).toBe(false);
      expect(validation.email('@example.com').valid).toBe(false);
      expect(validation.email('').valid).toBe(false);
    });

    it('should provide error messages', () => {
      const result = validation.email('invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('validation.password', () => {
    it('should validate strong passwords', () => {
      expect(validation.password('Password123!').valid).toBe(true);
      expect(validation.password('MyP@ssw0rd').valid).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(validation.password('short').valid).toBe(false);
      expect(validation.password('nouppercaseornumber!').valid).toBe(false);
      expect(validation.password('NoSpecialChar123').valid).toBe(false);
      expect(validation.password('NoNumber!').valid).toBe(false);
      expect(validation.password('').valid).toBe(false);
    });

    it('should provide specific error messages', () => {
      expect(validation.password('short').error).toContain('at least 8 characters');
      expect(validation.password('nouppercaseornumber!').error).toContain('uppercase');
      expect(validation.password('NoNumber!').error).toContain('number');
    });
  });

  describe('validation.phoneNumber', () => {
    it('should validate correct phone numbers', () => {
      expect(validation.phoneNumber('+12345678901').valid).toBe(true);
      expect(validation.phoneNumber('+447911123456').valid).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(validation.phoneNumber('1234567890').valid).toBe(false);
      expect(validation.phoneNumber('invalid').valid).toBe(false);
      expect(validation.phoneNumber('').valid).toBe(false);
    });
  });

  describe('validation.apiKey', () => {
    it('should validate API keys of correct length', () => {
      expect(validation.apiKey('a'.repeat(20)).valid).toBe(true);
      expect(validation.apiKey('validApiKey12345').valid).toBe(true);
    });

    it('should reject invalid API keys', () => {
      expect(validation.apiKey('short').valid).toBe(false);
      expect(validation.apiKey('').valid).toBe(false);
      expect(validation.apiKey('invalid key!@#').valid).toBe(false);
    });
  });

  describe('validation.verificationCode', () => {
    it('should validate correct verification codes', () => {
      expect(validation.verificationCode('1234').valid).toBe(true);
      expect(validation.verificationCode('123456').valid).toBe(true);
    });

    it('should reject invalid verification codes', () => {
      expect(validation.verificationCode('123').valid).toBe(false);
      expect(validation.verificationCode('1234567').valid).toBe(false);
      expect(validation.verificationCode('abcd').valid).toBe(false);
      expect(validation.verificationCode('').valid).toBe(false);
    });
  });

  describe('validation.url', () => {
    it('should validate correct URLs', () => {
      expect(validation.url('https://example.com').valid).toBe(true);
      expect(validation.url('http://example.com/path').valid).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(validation.url('not-a-url').valid).toBe(false);
      expect(validation.url('example.com').valid).toBe(false);
      expect(validation.url('').valid).toBe(false);
    });
  });

  describe('sanitization', () => {
    describe('text', () => {
      it('should escape HTML entities', () => {
        expect(sanitization.text('<script>alert("xss")</script>')).toBe(
          '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
        );
        expect(sanitization.text("It's a test")).toContain('&#x27;');
      });

      it('should handle empty strings', () => {
        expect(sanitization.text('')).toBe('');
      });
    });

    describe('html', () => {
      it('should remove script tags', () => {
        const result = sanitization.html('<p>Safe</p><script>alert("xss")</script>');
        expect(result).not.toContain('<script>');
        expect(result).toContain('<p>Safe</p>');
      });

      it('should remove iframe tags', () => {
        const result = sanitization.html('<p>Safe</p><iframe src="evil.com"></iframe>');
        expect(result).not.toContain('<iframe>');
      });

      it('should remove javascript: protocol', () => {
        const result = sanitization.html('<a href="javascript:alert()">Link</a>');
        expect(result).not.toContain('javascript:');
      });

      it('should remove event handlers', () => {
        const result = sanitization.html('<div onclick="alert()">Click</div>');
        expect(result).not.toContain('onclick=');
      });
    });
  });

  describe('encryption', () => {
    it('should hash passwords consistently', async () => {
      const hash1 = await encryption.hashPassword('testPassword123');
      const hash2 = await encryption.hashPassword('testPassword123');
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different passwords', async () => {
      const hash1 = await encryption.hashPassword('password1');
      const hash2 = await encryption.hashPassword('password2');
      expect(hash1).not.toBe(hash2);
    });

    it('should encrypt data', async () => {
      const encrypted = await encryption.encryptData('sensitive data');
      expect(encrypted).toBeDefined();
      expect(encrypted.length).toBeGreaterThan(0);
    });
  });

  describe('rateLimiter', () => {
    it('should create backoff with exponential delay', () => {
      const limiter = rateLimiter.createBackoff();
      
      expect(limiter.getDelay()).toBe(2500);
      
      limiter.increment();
      expect(limiter.getDelay()).toBeGreaterThan(2500);
      expect(limiter.getDelay()).toBeLessThanOrEqual(30000);
      
      limiter.reset();
      expect(limiter.getDelay()).toBe(2500);
    });

    it('should respect max retry count', () => {
      const limiter = rateLimiter.createBackoff(2500, 5);
      
      for (let i = 0; i < 10; i++) {
        limiter.increment();
      }
      
      expect(limiter.canRetry()).toBe(false);
    });

    it('should cap delay at maximum', () => {
      const limiter = rateLimiter.createBackoff();
      
      for (let i = 0; i < 20; i++) {
        limiter.increment();
      }
      
      expect(limiter.getDelay()).toBeLessThanOrEqual(30000);
    });

    it('should track retry count', () => {
      const limiter = rateLimiter.createBackoff();
      
      expect(limiter.getRetryCount()).toBe(0);
      limiter.increment();
      expect(limiter.getRetryCount()).toBe(1);
      limiter.increment();
      expect(limiter.getRetryCount()).toBe(2);
      limiter.reset();
      expect(limiter.getRetryCount()).toBe(0);
    });
  });
});
