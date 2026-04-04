import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { db } from '../../../../db/in-memory-store';
import { logAudit, AuditActions } from '../../../../lib/audit';

const verifyEmailSchema = z.object({
  token: z.string(),
});

export const verifyEmailProcedure = publicProcedure
  .input(verifyEmailSchema)
  .mutation(async ({ input, ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const users = db.getAllUsers();
    const user = users.find(u => u.emailVerificationToken === input.token);

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

    if (user.emailVerificationExpires && user.emailVerificationExpires < Date.now()) {
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

    db.updateUser(user.id, {
      emailVerified: true,
      emailVerificationToken: undefined,
      emailVerificationExpires: undefined,
    });

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
