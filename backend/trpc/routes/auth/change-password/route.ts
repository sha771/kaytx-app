import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { verifyPassword, hashPassword, validatePasswordStrength, revokeAllUserSessions } from '../../../../lib/auth';
import { db as pgDb } from '../../../../db/connection';
import { users } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { logAudit, AuditActions } from '../../../../lib/audit';

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8),
});

export const changePasswordProcedure = protectedProcedure
  .input(changePasswordSchema)
  .mutation(async ({ input, ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const isValidPassword = await verifyPassword(input.currentPassword, ctx.user.passwordHash);

    if (!isValidPassword) {
      logAudit({
        userId: ctx.user.id,
        action: AuditActions.USER_PASSWORD_CHANGE,
        resource: 'user',
        resourceId: ctx.user.id,
        ipAddress,
        metadata: { reason: 'invalid_current_password' },
        status: 'failure',
      });
      throw new Error('Current password is incorrect');
    }

    const passwordValidation = validatePasswordStrength(input.newPassword);
    if (!passwordValidation.valid) {
      throw new Error(passwordValidation.errors.join(', '));
    }

    const newPasswordHash = await hashPassword(input.newPassword);

    await pgDb.update(users).set({ passwordHash: newPasswordHash } as any).where(eq(users.id, ctx.user.id as any));

    await revokeAllUserSessions(ctx.user.id);

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.USER_PASSWORD_CHANGE,
      resource: 'user',
      resourceId: ctx.user.id,
      ipAddress,
      status: 'success',
    });

    console.log(`[AUTH] Password changed: ${ctx.user.email}`);

    return {
      success: true,
      message: 'Password changed successfully. Please log in again.',
    };
  });

export default changePasswordProcedure;
