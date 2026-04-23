/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { recordConsent, ConsentTypes } from '../../../../lib/privacy';
import { logAudit } from '../../../../lib/audit';
import { Permission } from '../../../../lib/rbac';

const updateSchema = z.object({
  consentType: z.string(),
  granted: z.boolean(),
});

const getSchema = z.object({
  consentType: z.string().optional(),
});

export const updateConsent = permissionProcedure(Permission.PRIVACY_CONSENT_UPDATE)
  .input(updateSchema)
  .mutation(({ ctx, input }) => {
    console.log('[Privacy] Recording consent for user:', ctx.user.id);
    
    const consent = recordConsent(
      ctx.user.id,
      input.consentType,
      input.granted
    );
    
    logAudit({
      userId: ctx.user.id,
      action: 'consent.update',
      resource: 'user_consent',
      resourceId: consent.id,
      status: 'success',
      metadata: {
        consentType: input.consentType,
        granted: input.granted,
      },
    });
    
    return {
      success: true,
      consent,
    };
  });

export const getConsents = permissionProcedure(Permission.PRIVACY_CONSENT_READ)
  .input(getSchema)
  .query(async ({ ctx, input }) => {
    console.log('[Privacy] Fetching consents for user:', ctx.user.id);
    
    const baseQuery = pgDb
      .select()
      .from(consentRecords)
      .where(eq(consentRecords.userId, ctx.user.id));
    
    const rows = input.consentType
      ? await baseQuery.where(eq(consentRecords.consentType, input.consentType))
      : await baseQuery;
    
    return {
      success: true,
      consents: rows,
    };
  });
