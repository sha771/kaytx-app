import { z } from 'zod';
import { nanoid } from 'nanoid';
import { publicProcedure } from '../../../create-context';
import { hashPassword, validatePasswordStrength, validateEmail, generateVerificationToken } from '../../../../lib/auth';
import { db } from '../../../../db/in-memory-store';
import { User, Consent } from '../../../../db/schema';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { checkRateLimit, RateLimitPresets } from '../../../../lib/rate-limiter';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().optional(),
  termsAccepted: z.boolean(),
  privacyPolicyAccepted: z.boolean(),
  organizationName: z.string().optional(),
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

    const existingUser = db.getUserByEmail(input.email);
    if (existingUser) {
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

    const userId = nanoid();
    const passwordHash = await hashPassword(input.password);
    const emailVerificationToken = generateVerificationToken();
    const now = Date.now();

    const user: User = {
      id: userId,
      email: input.email.toLowerCase(),
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires: now + 24 * 60 * 60 * 1000,
      twoFactorEnabled: false,
      termsAccepted: input.termsAccepted,
      termsAcceptedAt: now,
      privacyPolicyAccepted: input.privacyPolicyAccepted,
      privacyPolicyAcceptedAt: now,
      role: 'user',
      status: 'active',
      failedLoginAttempts: 0,
      createdAt: now,
      updatedAt: now,
    };

    db.createUser(user);

    const termsConsent: Consent = {
      id: nanoid(),
      userId,
      type: 'terms',
      version: '1.0',
      accepted: true,
      ipAddress,
      timestamp: now,
    };

    const privacyConsent: Consent = {
      id: nanoid(),
      userId,
      type: 'privacy',
      version: '1.0',
      accepted: true,
      ipAddress,
      timestamp: now,
    };

    db.createConsent(termsConsent);
    db.createConsent(privacyConsent);

    logAudit({
      userId,
      action: AuditActions.USER_REGISTER,
      resource: 'user',
      resourceId: userId,
      ipAddress,
      status: 'success',
    });

    console.log(`[AUTH] User registered: ${user.email}`);
    console.log(`[AUTH] Email verification token: ${emailVerificationToken}`);
    console.log(`[AUTH] Verification link: /verify-email?token=${emailVerificationToken}`);

    return {
      success: true,
      userId: user.id,
      email: user.email,
      message: 'Registration successful. Please check your email to verify your account.',
      verificationToken: emailVerificationToken,
    };
  });

export default registerProcedure;
