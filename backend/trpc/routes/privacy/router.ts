import { createTRPCRouter, permissionProcedure } from '../../create-context';
import { z } from 'zod';
import { db as pgDb } from '../../../db/connection';
import { consentRecords } from '../../../db/drizzle-schema';
import { desc, eq } from 'drizzle-orm';
import crypto from 'crypto';
import { Permission } from '../../../lib/rbac';
import getPrivacySettingsRoute from './get-settings/route';
import updatePrivacySettingsRoute from './update-settings/route';
import exportDataRoute from './export-data/route';
import deleteDataRoute from './delete-data/route';
import accessLogsRoute from './access-logs/route';
import breachCheckRoute from './breach-check/route';

const updateConsent = permissionProcedure(Permission.PRIVACY_CONSENT_UPDATE)
  .input(z.object({ consentType: z.string().min(1), granted: z.boolean(), version: z.string().optional() }))
  .mutation(async ({ ctx, input }) => {
    const ipAddress = ctx.req.headers.get('x-forwarded-for') || ctx.req.headers.get('x-real-ip') || 'unknown';
    const userAgent = ctx.req.headers.get('user-agent') || undefined;

    const id = crypto.randomUUID();
    await pgDb.insert(consentRecords).values({
      id,
      userId: ctx.user.id,
      consentType: input.consentType,
      version: input.version || 'unknown',
      granted: input.granted,
      timestamp: new Date(),
      ipAddress,
      userAgent,
    } as any);

    return { success: true, id, consentType: input.consentType, granted: input.granted };
  });

const getConsents = permissionProcedure(Permission.PRIVACY_CONSENT_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
    const consents = await pgDb
      .select()
      .from(consentRecords)
      .where(eq(consentRecords.userId, ctx.user.id))
      .orderBy(desc(consentRecords.timestamp))
      .limit(200);
    return { consents };
  });

export const privacyRouter = createTRPCRouter({
  getSettings: getPrivacySettingsRoute,
  updateSettings: updatePrivacySettingsRoute,
  exportData: exportDataRoute,
  deleteData: deleteDataRoute,
  updateConsent,
  getConsents,
  accessLogs: accessLogsRoute,
  breachCheck: breachCheckRoute,
});

export {
  getPrivacySettingsRoute,
  updatePrivacySettingsRoute,
  exportDataRoute,
  deleteDataRoute,
  updateConsent,
  getConsents,
  accessLogsRoute,
  breachCheckRoute,
};
