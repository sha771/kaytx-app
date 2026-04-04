import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { verifyPassword, createSession, handleFailedLogin, resetFailedLoginAttempts, isAccountLocked } from '../../../../lib/auth';
import { db } from '../../../../db/in-memory-store';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { checkRateLimit, RateLimitPresets } from '../../../../lib/rate-limiter';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  deviceId: z.string().optional(),
});

export const loginProcedure = publicProcedure
  .input(loginSchema)
  .mutation(async ({ input, ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';
    const userAgent = ctx.req.headers.get('user-agent') || 'unknown';

    const rateLimitResult = checkRateLimit(`login:${ipAddress}`, RateLimitPresets.AUTH);
    if (!rateLimitResult.allowed) {
      const resetInMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
      logAudit({
        action: AuditActions.USER_LOGIN,
        resource: 'user',
        ipAddress,
        metadata: { email: input.email, reason: 'rate_limit_exceeded' },
        status: 'failure',
      });
      throw new Error(`Too many login attempts. Please try again in ${resetInMinutes} minutes.`);
    }

    const user = db.getUserByEmail(input.email);

    if (!user) {
      logAudit({
        action: AuditActions.USER_LOGIN,
        resource: 'user',
        ipAddress,
        metadata: { email: input.email, reason: 'user_not_found' },
        status: 'failure',
      });
      throw new Error('Invalid email or password');
    }

    if (isAccountLocked(user)) {
      const lockTimeRemaining = Math.ceil((user.accountLockedUntil! - Date.now()) / 60000);
      logAudit({
        userId: user.id,
        action: AuditActions.USER_LOGIN,
        resource: 'user',
        resourceId: user.id,
        ipAddress,
        metadata: { reason: 'account_locked' },
        status: 'failure',
      });
      throw new Error(`Account is locked. Please try again in ${lockTimeRemaining} minutes.`);
    }

    const isValidPassword = await verifyPassword(input.password, user.passwordHash);

    if (!isValidPassword) {
      await handleFailedLogin(user.id);
      logAudit({
        userId: user.id,
        action: AuditActions.USER_LOGIN,
        resource: 'user',
        resourceId: user.id,
        ipAddress,
        metadata: { reason: 'invalid_password' },
        status: 'failure',
      });
      throw new Error('Invalid email or password');
    }

    if (!user.emailVerified) {
      logAudit({
        userId: user.id,
        action: AuditActions.USER_LOGIN,
        resource: 'user',
        resourceId: user.id,
        ipAddress,
        metadata: { reason: 'email_not_verified' },
        status: 'failure',
      });
      throw new Error('Please verify your email before logging in');
    }

    await resetFailedLoginAttempts(user.id);

    const session = await createSession(user.id, ipAddress, userAgent, input.deviceId);

    db.updateUser(user.id, {
      lastLoginAt: Date.now(),
      lastLoginIp: ipAddress,
    });

    logAudit({
      userId: user.id,
      action: AuditActions.USER_LOGIN,
      resource: 'user',
      resourceId: user.id,
      ipAddress,
      status: 'success',
    });

    console.log(`[AUTH] User logged in: ${user.email}`);

    return {
      success: true,
      token: session.token,
      refreshToken: session.refreshToken,
      expiresAt: session.expiresAt,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        organizationId: user.organizationId,
      },
    };
  });

export default loginProcedure;
