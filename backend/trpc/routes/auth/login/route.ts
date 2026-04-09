import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { verifyPassword, createSession, handleFailedLogin, resetFailedLoginAttempts, isAccountLocked } from '../../../../lib/auth';
import { db as pgDb } from '../../../../db/connection';
import { organizations, users } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { checkRateLimit, RateLimitPresets } from '../../../../lib/unified-rate-limiting';
import { consumeRecoveryCode, normalizeRecoveryCodes, verifyTotpForUser } from '../../../../lib/mfa';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  deviceId: z.string().optional(),
  totp: z.string().optional(),
  recoveryCode: z.string().optional(),
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

    const [user] = await pgDb.select().from(users).where(eq(users.email, input.email)).limit(1);

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

    if (user.status !== 'active') {
      logAudit({
        userId: user.id,
        action: AuditActions.USER_LOGIN,
        resource: 'user',
        resourceId: user.id,
        ipAddress,
        metadata: { reason: 'user_not_active', status: user.status },
        status: 'failure',
      });
      throw new Error('Account is not active');
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

    if (user.organizationId) {
      try {
        const [org] = await pgDb
          .select({ settings: organizations.settings })
          .from(organizations)
          .where(eq(organizations.id, user.organizationId))
          .limit(1);

        if ((org as any)?.settings?.enforceSSO) {
          logAudit({
            userId: user.id,
            action: AuditActions.USER_LOGIN,
            resource: 'user',
            resourceId: user.id,
            ipAddress,
            metadata: { reason: 'sso_enforced' },
            status: 'failure',
          });
          throw new Error('SSO required');
        }
      } catch (e) {
        if (e instanceof Error && e.message === 'SSO required') {
          throw e;
        }
        logAudit({
          userId: user.id,
          action: AuditActions.USER_LOGIN,
          resource: 'user',
          resourceId: user.id,
          ipAddress,
          metadata: { reason: 'sso_policy_check_failed' },
          status: 'failure',
        });
        throw new Error('Unable to verify organization SSO policy');
      }
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

    if (user.twoFactorEnabled) {
      const totpOk = input.totp ? verifyTotpForUser((user as any).twoFactorSecret, input.totp) : false;
      let recoveryOk = false;
      let updatedRecoveryCodes: any = null;

      if (!totpOk && input.recoveryCode) {
        const current = normalizeRecoveryCodes((user as any).twoFactorRecoveryCodes);
        const consumed = consumeRecoveryCode(current, input.recoveryCode);
        recoveryOk = consumed.ok;
        updatedRecoveryCodes = consumed.updated;
      }

      if (!totpOk && !recoveryOk) {
        logAudit({
          userId: user.id,
          action: AuditActions.USER_LOGIN,
          resource: 'user',
          resourceId: user.id,
          ipAddress,
          metadata: { reason: 'mfa_required_or_invalid' },
          status: 'failure',
        });
        throw new Error('MFA required');
      }

      if (recoveryOk && updatedRecoveryCodes) {
        try {
          await pgDb.update(users).set({
            twoFactorRecoveryCodes: updatedRecoveryCodes,
          } as any).where(eq(users.id, user.id));
        } catch {
          // best-effort
        }
      }
    }

    await resetFailedLoginAttempts(user.id);

    const session = await createSession(user.id, ipAddress, userAgent, input.deviceId);

    await pgDb.update(users).set({
      lastLoginAt: new Date(),
      lastLoginIp: ipAddress,
    }).where(eq(users.id, user.id));

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
