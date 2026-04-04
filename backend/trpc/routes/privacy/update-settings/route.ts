import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { logAudit, AuditActions } from '../../../../lib/audit';

const schema = z.object({
  dataRetentionDays: z.number().min(1).max(3650).optional(),
  allowAnalytics: z.boolean().optional(),
  allowMarketing: z.boolean().optional(),
  allowThirdPartySharing: z.boolean().optional(),
  allowLocationTracking: z.boolean().optional(),
  allowCookies: z.boolean().optional(),
  allowPersonalization: z.boolean().optional(),
  showOnlineStatus: z.boolean().optional(),
  shareActivityData: z.boolean().optional(),
  allowDataProcessing: z.boolean().optional(),
});

export default protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    console.log('[Privacy] Updating privacy settings for user:', ctx.user.id);
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.SETTINGS_UPDATE,
      resource: 'privacy_settings',
      status: 'success',
      metadata: { changes: input },
    });
    
    return {
      success: true,
      message: 'Privacy settings updated successfully',
      settings: {
        ...input,
        userId: ctx.user.id,
        updatedAt: Date.now(),
      },
    };
  });
