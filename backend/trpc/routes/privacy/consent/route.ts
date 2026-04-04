import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { recordConsent, ConsentTypes } from '../../../../lib/privacy';
import { logAudit } from '../../../../lib/audit';

const updateSchema = z.object({
  consentType: z.string(),
  granted: z.boolean(),
});

const getSchema = z.object({
  consentType: z.string().optional(),
});

export const updateConsent = protectedProcedure
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

export const getConsents = protectedProcedure
  .input(getSchema)
  .query(({ ctx, input }) => {
    console.log('[Privacy] Fetching consents for user:', ctx.user.id);
    
    const mockConsents = [
      {
        id: '1',
        userId: ctx.user.id,
        consentType: ConsentTypes.TERMS_OF_SERVICE,
        version: '2.0.0',
        granted: true,
        timestamp: Date.now() - 86400000,
      },
      {
        id: '2',
        userId: ctx.user.id,
        consentType: ConsentTypes.PRIVACY_POLICY,
        version: '2.0.0',
        granted: true,
        timestamp: Date.now() - 86400000,
      },
      {
        id: '3',
        userId: ctx.user.id,
        consentType: ConsentTypes.MARKETING_EMAILS,
        version: '2.0.0',
        granted: false,
        timestamp: Date.now() - 3600000,
      },
    ];
    
    return {
      success: true,
      consents: input.consentType
        ? mockConsents.filter(c => c.consentType === input.consentType)
        : mockConsents,
    };
  });
