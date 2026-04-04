import { protectedProcedure } from '../../../create-context';
import { revokeSession } from '../../../../lib/auth';
import { logAudit, AuditActions } from '../../../../lib/audit';

export const logoutProcedure = protectedProcedure
  .mutation(async ({ ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    if (ctx.sessionId) {
      await revokeSession(ctx.sessionId);
    }

    logAudit({
      userId: ctx.user.id,
      action: AuditActions.USER_LOGOUT,
      resource: 'user',
      resourceId: ctx.user.id,
      ipAddress,
      status: 'success',
    });

    console.log(`[AUTH] User logged out: ${ctx.user.email}`);

    return {
      success: true,
      message: 'Logged out successfully',
    };
  });

export default logoutProcedure;
