 
import crypto, { createHash, createHmac } from 'crypto';

/**
 * Security utility functions for production hardening
 */

export class SecurityUtils {
  /**
   * Generate cryptographically secure random string
   */
  static generateSecureRandom(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Create SHA-256 hash
   */
  static sha256(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  /**
   * Create HMAC-SHA256 signature
   */
  static hmacSha256(data: string, secret: string): string {
    return createHmac('sha256', secret).update(data).digest('hex');
  }

  /**
   * Verify HMAC signature
   */
  static verifyHmac(data: string, signature: string, secret: string): boolean {
    const expectedSignature = this.hmacSha256(data, secret);
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }

  /**
   * Generate secure token with expiration
   */
  static generateSecureToken(payload: any, expiresIn: number = 3600): {
    token: string;
    expiresAt: Date;
  } {
    const timestamp = Date.now();
    const expiresAt = new Date(timestamp + expiresIn * 1000);
    
    const tokenData = {
      ...payload,
      iat: timestamp,
      exp: timestamp + expiresIn * 1000,
      jti: crypto.randomUUID()
    };
    
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64url');
    
    return { token, expiresAt };
  }

  /**
   * Validate and decode secure token
   */
  static validateSecureToken(token: string): {
    valid: boolean;
    payload?: any;
    expired?: boolean;
  } {
    try {
      const decoded = JSON.parse(Buffer.from(token, 'base64url').toString());
      const now = Date.now();
      
      if (decoded.exp && decoded.exp < now) {
        return { valid: false, expired: true };
      }
      
      return { valid: true, payload: decoded };
    } catch (error) {
      return { valid: false };
    }
  }

  /**
   * Sanitize input to prevent XSS
   */
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): {
    valid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) score += 1;
    else feedback.push('Password should be at least 8 characters long');

    if (password.length >= 12) score += 1;
    else feedback.push('Consider using 12+ characters for better security');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('Include lowercase letters');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('Include uppercase letters');

    if (/[0-9]/.test(password)) score += 1;
    else feedback.push('Include numbers');

    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    else feedback.push('Include special characters');

    if (!/(.)\1{2,}/.test(password)) score += 1;
    else feedback.push('Avoid repeating characters');

    if (!/^[a-zA-Z]/.test(password) || !/\d/.test(password)) score += 1;
    else feedback.push('Avoid dictionary words');

    return {
      valid: score >= 4,
      score: Math.min(score, 8),
      feedback
    };
  }

  /**
   * Generate API key with proper format
   */
  static generateApiKey(prefix: string = 'ak'): string {
    const timestamp = Date.now().toString(36);
    const random = crypto.randomBytes(16).toString('hex');
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Rate limit checker
   */
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, { count: number; resetTime: number }>();

    return {
      isAllowed: (identifier: string): boolean => {
        const now = Date.now();
        const key = requests.get(identifier);

        if (!key || now > key.resetTime) {
          requests.set(identifier, {
            count: 1,
            resetTime: now + windowMs
          });
          return true;
        }

        if (key.count >= maxRequests) {
          return false;
        }

        key.count++;
        return true;
      },

      getRemainingRequests: (identifier: string): number => {
        const key = requests.get(identifier);
        if (!key || Date.now() > key.resetTime) {
          return maxRequests;
        }
        return Math.max(0, maxRequests - key.count);
      },

      getResetTime: (identifier: string): number => {
        const key = requests.get(identifier);
        return key?.resetTime || 0;
      }
    };
  }

  /**
   * IP address validation and sanitization
   */
  static sanitizeIPAddress(ip: string): string | null {
    // Basic IPv4 validation
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    // Basic IPv6 validation (simplified)
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    
    if (ipv4Regex.test(ip)) {
      return ip;
    }
    
    if (ipv6Regex.test(ip)) {
      return ip;
    }
    
    return null;
  }

  /**
   * Content Security Policy header generator
   */
  static generateCSPHeader(options: {
    scriptSrc?: string[];
    styleSrc?: string[];
    imgSrc?: string[];
    connectSrc?: string[];
    fontSrc?: string[];
    defaultSrc?: string[];
  } = {}): string {
    const {
      scriptSrc = ["'self'"],
      styleSrc = ["'self'", "'unsafe-inline'"],
      imgSrc = ["'self'", "data:", "https:"],
      connectSrc = ["'self'"],
      fontSrc = ["'self'"],
      defaultSrc = ["'self'"]
    } = options;

    const directives = [
      `default-src ${defaultSrc.join(' ')}`,
      `script-src ${scriptSrc.join(' ')}`,
      `style-src ${styleSrc.join(' ')}`,
      `img-src ${imgSrc.join(' ')}`,
      `connect-src ${connectSrc.join(' ')}`,
      `font-src ${fontSrc.join(' ')}`,
      "object-src 'none'",
      "media-src 'self'",
      "frame-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ];

    return directives.join('; ');
  }
}

export default SecurityUtils;
