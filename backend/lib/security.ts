// ✅ GAP #7: SECURITY HARDENING
import crypto, { createCipheriv, createDecipheriv } from 'crypto';
import { logger } from './production-logger';

export class SecurityService {
  private encryptionKey: string;

  constructor() {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProduction = nodeEnv === 'production';
    const envKey = process.env.ENCRYPTION_KEY;

    if (isProduction && !envKey) {
      throw new Error('ENCRYPTION_KEY is required in production');
    }

    if (!envKey) {
      this.encryptionKey = crypto.randomBytes(32).toString('hex');
      logger.warn('[SecurityService] ENCRYPTION_KEY not set; using generated key for non-production environment');
    } else {
      this.encryptionKey = envKey;
    }
  }

  encryptData(data: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  decryptData(encrypted: string): string {
    const [ivHex, dataHex] = encrypted.split(':');
    if (!ivHex || !dataHex) {
      throw new Error('Invalid encrypted payload');
    }
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(this.encryptionKey, 'hex'), Buffer.from(ivHex, 'hex'));
    let decrypted = decipher.update(dataHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  hashPassword(password: string): string {
    const salt = crypto.randomBytes(16);
    const derived = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
    return `${salt.toString('hex')}:${derived.toString('hex')}`;
  }

  validatePassword(password: string, hash: string): boolean {
    try {
      const [saltHex, hashHex] = hash.split(':');
      if (!saltHex || !hashHex) return false;

      const salt = Buffer.from(saltHex, 'hex');
      const derivedHex = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');

      const storedBuf = Buffer.from(hashHex, 'hex');
      const derivedBuf = Buffer.from(derivedHex, 'hex');
      if (storedBuf.length !== derivedBuf.length) return false;

      return crypto.timingSafeEqual(storedBuf, derivedBuf);
    } catch {
      return false;
    }
  }

  generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}

export const securityService = new SecurityService();
