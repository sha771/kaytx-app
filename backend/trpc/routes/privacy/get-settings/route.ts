import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { getDefaultPrivacySettings, type PrivacySettings } from '../../../../lib/privacy';
import { db as pgDb } from '../../../../db/connection';
import { privacySettings } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';
import { Permission } from '../../../../lib/rbac';

export default permissionProcedure(Permission.PRIVACY_SETTINGS_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
  console.log('[Privacy] Fetching privacy settings for user:', ctx.user.id);

  const [row] = await pgDb.select().from(privacySettings).where(eq(privacySettings.userId, ctx.user.id)).limit(1);
  if (row?.settings) {
    return {
      success: true,
      settings: row.settings as PrivacySettings,
    };
  }

  const settings = getDefaultPrivacySettings(ctx.user.id);
  try {
    await pgDb.insert(privacySettings).values({
      userId: ctx.user.id,
      settings,
    } as any);
  } catch {
    // best-effort
  }

  return {
    success: true,
    settings: settings as PrivacySettings,
  };
});
