import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { createDataExportRequest } from '../../../../lib/privacy';
import { logAudit, AuditActions } from '../../../../lib/audit';
import { checkRateLimit, RateLimitPresets } from '../../../../lib/rate-limiter';

const schema = z.object({
  format: z.enum(['json', 'csv', 'xml']),
  includeMessages: z.boolean(),
  includeContacts: z.boolean(),
  includeCallLogs: z.boolean(),
  includeAnalytics: z.boolean(),
});

export default protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    const rateLimit = checkRateLimit(
      `export:${ctx.user.id}`,
      RateLimitPresets.EXPORT
    );
    
    if (!rateLimit.allowed) {
      throw new Error('Too many export requests. Please try again later.');
    }
    
    console.log('[Privacy] Creating data export request for user:', ctx.user.id);
    
    const exportRequest = createDataExportRequest(ctx.user.id, input);
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.DATA_EXPORT,
      resource: 'user_data',
      resourceId: exportRequest.id,
      status: 'success',
      metadata: { format: input.format },
    });
    
    return {
      success: true,
      message: 'Data export request created. You will be notified when ready.',
      exportRequest,
      estimatedTime: '15-30 minutes',
    };
  });
