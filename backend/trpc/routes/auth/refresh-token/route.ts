import { z } from 'zod';
import { publicProcedure } from '../../../create-context';
import { refreshSession } from '../../../../lib/auth';
import { logAudit, AuditActions } from '../../../../lib/audit';

const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const refreshTokenProcedure = publicProcedure
  .input(refreshTokenSchema)
  .mutation(async ({ input, ctx }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';

    const session = await refreshSession(input.refreshToken);

    if (!session) {
      logAudit({
        action: AuditActions.SESSION_REFRESH,
        resource: 'session',
        ipAddress,
        metadata: { reason: 'invalid_refresh_token' },
        status: 'failure',
      });
      throw new Error('Invalid or expired refresh token');
    }

    logAudit({
      userId: session.userId,
      action: AuditActions.SESSION_REFRESH,
      resource: 'session',
      resourceId: session.id,
      ipAddress,
      status: 'success',
    });

    return {
      success: true,
      token: session.token,
      expiresAt: session.expiresAt,
    };
  });

export default refreshTokenProcedure;
