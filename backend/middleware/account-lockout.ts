import { Context, Next } from 'hono';
import { db as pgDb } from '../db/connection';
import { users } from '../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { generateErrorId, makeApiError } from '../lib/api-error';
import { config } from '../lib/config';
import { logger } from '../lib/production-logger';

interface LockoutRecord {
  userId: string;
  attempts: number;
  firstAttempt: number;
  lastAttempt: number;
  lockedUntil?: number;
  isPermanent: boolean;
}

const lockoutStore = new Map<string, LockoutRecord>();

export class AccountLockoutService {
  private static readonly LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
  private static readonly MAX_ATTEMPTS = 5;
  private static readonly PERMANENT_LOCKOUT_ATTEMPTS = 20;
  private static readonly LOCKOUT_WINDOW = 60 * 60 * 1000; // 1 hour

  static async recordFailedAttempt(identifier: string, userId?: string): Promise<{
    locked: boolean;
    lockedUntil?: number;
    attemptsRemaining: number;
    isPermanent: boolean;
  }> {
    const now = Date.now();
    const existing = lockoutStore.get(identifier);

    if (!existing) {
      const record: LockoutRecord = {
        userId: userId || '',
        attempts: 1,
        firstAttempt: now,
        lastAttempt: now,
        isPermanent: false,
      };
      lockoutStore.set(identifier, record);
      
      return {
        locked: false,
        attemptsRemaining: this.MAX_ATTEMPTS - 1,
        isPermanent: false,
      };
    }

    // Reset if window expired
    if (now - existing.firstAttempt > this.LOCKOUT_WINDOW) {
      existing.attempts = 1;
      existing.firstAttempt = now;
      existing.lastAttempt = now;
      existing.lockedUntil = undefined;
      existing.isPermanent = false;
    } else {
      existing.attempts++;
      existing.lastAttempt = now;
    }

    // Check for permanent lockout
    if (existing.attempts >= this.PERMANENT_LOCKOUT_ATTEMPTS) {
      existing.isPermanent = true;
      existing.lockedUntil = now + (365 * 24 * 60 * 60 * 1000); // 1 year
      lockoutStore.set(identifier, existing);
      
      // Log security event
      await this.logSecurityEvent('PERMANENT_LOCKOUT', {
        identifier,
        userId: existing.userId,
        attempts: existing.attempts,
        ip: identifier,
      });
      
      return {
        locked: true,
        lockedUntil: existing.lockedUntil,
        attemptsRemaining: 0,
        isPermanent: true,
      };
    }

    // Check for temporary lockout
    if (existing.attempts >= this.MAX_ATTEMPTS) {
      const lockoutDuration = this.calculateProgressiveLockout(existing.attempts);
      existing.lockedUntil = now + lockoutDuration;
      lockoutStore.set(identifier, existing);
      
      // Log security event
      await this.logSecurityEvent('TEMPORARY_LOCKOUT', {
        identifier,
        userId: existing.userId,
        attempts: existing.attempts,
        lockoutDuration,
        ip: identifier,
      });
      
      return {
        locked: true,
        lockedUntil: existing.lockedUntil,
        attemptsRemaining: 0,
        isPermanent: false,
      };
    }

    lockoutStore.set(identifier, existing);
    
    return {
      locked: false,
      attemptsRemaining: this.MAX_ATTEMPTS - existing.attempts,
      isPermanent: false,
    };
  }

  static async recordSuccessfulAttempt(identifier: string): Promise<void> {
    const record = lockoutStore.get(identifier);
    if (record) {
      lockoutStore.delete(identifier);
      
      // Log security event
      await this.logSecurityEvent('SUCCESSFUL_LOGIN', {
        identifier,
        userId: record.userId,
        previousAttempts: record.attempts,
        ip: identifier,
      });
    }
  }

  static isLocked(identifier: string): {
    locked: boolean;
    lockedUntil?: number;
    isPermanent: boolean;
    timeRemaining?: number;
  } {
    const record = lockoutStore.get(identifier);
    if (!record) {
      return { locked: false, isPermanent: false };
    }

    const now = Date.now();
    
    // Check if lockout has expired
    if (record.lockedUntil && now > record.lockedUntil && !record.isPermanent) {
      lockoutStore.delete(identifier);
      return { locked: false, isPermanent: false };
    }

    const timeRemaining = record.lockedUntil ? Math.max(0, record.lockedUntil - now) : 0;
    
    return {
      locked: record.lockedUntil ? now <= record.lockedUntil : false,
      lockedUntil: record.lockedUntil,
      isPermanent: record.isPermanent,
      timeRemaining,
    };
  }

  static async unlockAccount(identifier: string, adminUserId: string): Promise<boolean> {
    const record = lockoutStore.get(identifier);
    if (!record) {
      return false;
    }

    lockoutStore.delete(identifier);
    
    // Log security event
    await this.logSecurityEvent('ACCOUNT_UNLOCKED', {
      identifier,
      userId: record.userId,
      adminUserId,
      previousAttempts: record.attempts,
      wasPermanent: record.isPermanent,
    });
    
    return true;
  }

  private static calculateProgressiveLockout(attempts: number): number {
    // Progressive lockout: 15min, 30min, 1hr, 2hr, 4hr, 8hr, 16hr, 24hr
    const baseDuration = this.LOCKOUT_DURATION;
    const multiplier = Math.min(Math.pow(2, Math.floor((attempts - this.MAX_ATTEMPTS) / 2)), 32);
    return baseDuration * multiplier;
  }

  private static async logSecurityEvent(event: string, data: any): Promise<void> {
    try {
      // Log to audit system
      const { logAudit } = await import('../lib/audit');
      await logAudit('SECURITY', event, data);
      
      // Also log to console for immediate visibility
      logger.warn(`[SECURITY] ${event}:`, {
        ...data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Failed to log security event:', error as Error);
    }
  }

  // Get lockout statistics for monitoring
  static getStatistics(): {
    totalLocked: number;
    permanentlyLocked: number;
    temporarilyLocked: number;
    averageAttempts: number;
  } {
    const now = Date.now();
    const records = Array.from(lockoutStore.values());
    
    const permanentlyLocked = records.filter(r => r.isPermanent).length;
    const temporarilyLocked = records.filter(r => 
      r.lockedUntil && now <= r.lockedUntil && !r.isPermanent
    ).length;
    
    const averageAttempts = records.length > 0 
      ? records.reduce((sum, r) => sum + r.attempts, 0) / records.length 
      : 0;

    return {
      totalLocked: permanentlyLocked + temporarilyLocked,
      permanentlyLocked,
      temporarilyLocked,
      averageAttempts,
    };
  }

  // Cleanup expired entries
  static cleanup(): void {
    const now = Date.now();
    for (const [key, record] of lockoutStore.entries()) {
      if (record.lockedUntil && now > record.lockedUntil && !record.isPermanent) {
        lockoutStore.delete(key);
      }
    }
  }
}

// Middleware for automatic account lockout protection
export function accountLockoutProtection() {
  return async (c: Context, next: Next) => {
    const identifier = c.req.header('x-forwarded-for') || 
                      c.req.header('x-real-ip') || 
                      'unknown';
    
    const lockoutStatus = AccountLockoutService.isLocked(identifier);
    
    if (lockoutStatus.locked) {
      const errorId = generateErrorId();
      const timestamp = new Date().toISOString();
      
      const response = makeApiError(
        c,
        lockoutStatus.isPermanent ? 'ACCOUNT_PERMANENTLY_LOCKED' : 'ACCOUNT_TEMPORARILY_LOCKED',
        lockoutStatus.isPermanent 
          ? 'Account has been permanently locked due to repeated failed attempts. Please contact support.'
          : `Account temporarily locked due to repeated failed attempts. Try again in ${Math.ceil((lockoutStatus.timeRemaining || 0) / 60000)} minutes.`,
        {
          lockedUntil: lockoutStatus.lockedUntil ? new Date(lockoutStatus.lockedUntil).toISOString() : undefined,
          isPermanent: lockoutStatus.isPermanent,
          timeRemaining: lockoutStatus.timeRemaining,
        },
        errorId,
        timestamp
      );
      
      return c.json(response, lockoutStatus.isPermanent ? 423 : 429);
    }
    
    await next();
  };
}

// Cleanup expired lockouts periodically
setInterval(() => {
  AccountLockoutService.cleanup();
}, 5 * 60 * 1000); // Cleanup every 5 minutes
