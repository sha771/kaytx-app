import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { createDataDeletionRequest } from '../../../../lib/privacy';
import { logAudit, AuditActions } from '../../../../lib/audit';

const schema = z.object({
  deleteType: z.enum(['full', 'partial']),
  dataTypes: z.array(z.string()),
  reason: z.string().optional(),
  confirmPassword: z.string(),
});

export default protectedProcedure
  .input(schema)
  .mutation(({ ctx, input }) => {
    console.log('[Privacy] Creating data deletion request for user:', ctx.user.id);
    
    const deletionRequest = createDataDeletionRequest(ctx.user.id, {
      deleteType: input.deleteType,
      dataTypes: input.dataTypes,
      reason: input.reason,
    });
    
    logAudit({
      userId: ctx.user.id,
      action: AuditActions.DATA_DELETE,
      resource: 'user_data',
      resourceId: deletionRequest.id,
      status: 'success',
      metadata: {
        deleteType: input.deleteType,
        dataTypes: input.dataTypes,
      },
    });
    
    return {
      success: true,
      message: input.deleteType === 'full' 
        ? 'Account deletion scheduled. You have 30 days to cancel.'
        : 'Data deletion request created.',
      deletionRequest,
      cancellationDeadline: new Date(deletionRequest.cancellationDeadline).toISOString(),
    };
  });
