import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { db as pgDb } from '../../../../db/connection';
import { privacySettings } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { Permission } from '../../../../lib/rbac';

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

export default permissionProcedure(Permission.PRIVACY_SETTINGS_UPDATE)
  .input(schema)
  .mutation(async ({ ctx, input }) => {
    console.log('[Privacy] Updating privacy settings for user:', ctx.user.id);
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.SETTINGS_UPDATE,
      resource: 'privacy_settings',
      status: 'success',
      metadata: { changes: input },
    });
    const [existing] = await pgDb
      .select()
      .from(privacySettings)
      .where(eq(privacySettings.userId, ctx.user.id))
      .limit(1);

    const merged = {
      ...(existing?.settings || {}),
      ...input,
      userId: ctx.user.id,
      updatedAt: Date.now(),
    };

    await pgDb
      .insert(privacySettings)
      .values({ userId: ctx.user.id, settings: merged } as any)
      .onConflictDoUpdate({
        target: privacySettings.userId,
        set: { settings: merged, updatedAt: new Date() } as any,
      });

    return {
      success: true,
      message: 'Privacy settings updated successfully',
      settings: merged,
    };
  });
