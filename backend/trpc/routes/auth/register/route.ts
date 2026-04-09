import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { hashPassword, validatePasswordStrength, validateEmail, generateVerificationToken, hashEmailVerificationToken , generateSessionId } from '../../../../lib/auth';
import { db as pgDb } from '../../../../db/connection';
import { users, organizations } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';

import { checkRateLimit, RateLimitPresets } from '../../../../lib/unified-rate-limiting';
import crypto from 'crypto';

const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]+$/).optional(),
  termsAccepted: z.boolean(),
  privacyPolicyAccepted: z.boolean(),
  organizationName: z.string().min(1).max(255).optional(),
});

export const registerProcedure = publicProcedure
  .input(registerSchema)
  .mutation(async ({ input, ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const rateLimitResult = checkRateLimit(`register:${ipAddress}`, RateLimitPresets.AUTH);
    if (!rateLimitResult.allowed) {
      const resetInMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
      logAudit({
        action: AuditActions.USER_REGISTER,
        resource: 'user',
        ipAddress,
        metadata: { email: input.email, reason: 'rate_limit_exceeded' },
        status: 'failure',
      });
      throw new Error(`Too many registration attempts. Please try again in ${resetInMinutes} minutes.`);
    }

    if (!validateEmail(input.email)) {
      throw new Error('Invalid email format');
    }

    const [existingUser] = await pgDb
      .select()
      .from(users)
      .where(eq(users.email, input.email.toLowerCase()))
      .limit(1);
    const userExists = Boolean(existingUser);

    if (userExists) {
      logAudit({
        action: AuditActions.USER_REGISTER,
        resource: 'user',
        ipAddress,
        metadata: { email: input.email, reason: 'email_already_exists' },
        status: 'failure',
      });
      throw new Error('Email already registered');
    }

    const passwordValidation = validatePasswordStrength(input.password);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    if (!input.termsAccepted || !input.privacyPolicyAccepted) {
      throw new Error('You must accept the terms of service and privacy policy');
    }

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(input.password);
    const emailVerificationToken = generateVerificationToken();
    const emailVerificationTokenHash = hashEmailVerificationToken(emailVerificationToken);
    const now = Date.now();

    const userRecord: any = {
      id: userId,
      email: input.email.toLowerCase(),
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber || null,
      emailVerified: false,
      emailVerificationToken: emailVerificationTokenHash,
      emailVerificationExpires: new Date(now + 24 * 60 * 60 * 1000),
      twoFactorEnabled: false,
      termsAccepted: input.termsAccepted,
      termsAcceptedAt: new Date(now),
      privacyPolicyAccepted: input.privacyPolicyAccepted,
      privacyPolicyAcceptedAt: new Date(now),
      role: 'user',
      status: 'active',
      failedLoginAttempts: 0,
      createdAt: new Date(now),
      updatedAt: new Date(now),
    };

    await pgDb.insert(users).values(userRecord);

    // Consent records (would go to a separate PG table if defined, but using memory for now as primary if mismatch occurs)
    // Actually, drizzle-schema should have them if gap #1 ran fully.

    // Finalize audit and logs

    logAudit({
      userId,
      action: AuditActions.USER_REGISTER,
      resource: 'user',
      resourceId: userId,
      ipAddress,
      status: 'success',
    });

    console.log(`[AUTH] User registered: ${input.email}`);

    return {
      success: true,
      userId: userId,
      email: input.email,
      message: 'Registration successful. Please check your email to verify your account.',
      verificationToken: emailVerificationToken,
    };
  });

export default registerProcedure;
