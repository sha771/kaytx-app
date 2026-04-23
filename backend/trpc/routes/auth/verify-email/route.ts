import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { users } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { hashEmailVerificationToken } from '../../../../lib/auth';

const verifyEmailSchema = z.object({
  token: z.string(),
});

export const verifyEmailProcedure = publicProcedure
  .input(verifyEmailSchema)
  .mutation(async ({ input, ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const tokenHash = hashEmailVerificationToken(input.token);

    const [user] = await pgDb
      .select()
      .from(users)
      .where(eq(users.emailVerificationToken, tokenHash))
      .limit(1);

    if (!user) {
      logAudit({
        action: AuditActions.USER_EMAIL_VERIFY,
        resource: 'user',
        ipAddress,
        metadata: { reason: 'invalid_token' },
        status: 'failure',
      });
      throw new Error('Invalid or expired verification token');
    }

    if (user.emailVerificationExpires && user.emailVerificationExpires.getTime() < Date.now()) {
      logAudit({
        userId: user.id,
        action: AuditActions.USER_EMAIL_VERIFY,
        resource: 'user',
        resourceId: user.id,
        ipAddress,
        metadata: { reason: 'token_expired' },
        status: 'failure',
      });
      throw new Error('Verification token has expired. Please request a new one.');
    }

    await pgDb.update(users).set({
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
    } as any).where(eq(users.id, user.id));

    logAudit({
      userId: user.id,
      action: AuditActions.USER_EMAIL_VERIFY,
      resource: 'user',
      resourceId: user.id,
      ipAddress,
      status: 'success',
    });

    console.log(`[AUTH] Email verified: ${user.email}`);

    return {
      success: true,
      message: 'Email verified successfully. You can now log in.',
    };
  });

export default verifyEmailProcedure;
