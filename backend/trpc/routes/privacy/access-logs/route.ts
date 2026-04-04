import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';

const schema = z.object({
  startDate: z.number().optional(),
  endDate: z.number().optional(),
  limit: z.number().min(1).max(100).default(50),
});

export default protectedProcedure
  .input(schema)
  .query(({ ctx, input }) => {
    console.log('[Privacy] Fetching data access logs for user:', ctx.user.id);
    
    const mockLogs = [
      {
        id: '1',
        userId: ctx.user.id,
        accessedBy: ctx.user.id,
        accessType: 'read' as const,
        dataType: 'profile',
        reason: 'User viewed their profile',
        timestamp: Date.now() - 3600000,
        success: true,
      },
      {
        id: '2',
        userId: ctx.user.id,
        accessedBy: 'system',
        accessType: 'read' as const,
        dataType: 'analytics',
        reason: 'Automated analytics processing',
        timestamp: Date.now() - 7200000,
        success: true,
      },
      {
        id: '3',
        userId: ctx.user.id,
        accessedBy: ctx.user.id,
        accessType: 'write' as const,
        dataType: 'preferences',
        reason: 'User updated preferences',
        timestamp: Date.now() - 86400000,
        success: true,
      },
      {
        id: '4',
        userId: ctx.user.id,
        accessedBy: 'admin',
        accessType: 'read' as const,
        dataType: 'audit_logs',
        reason: 'Support ticket investigation',
        timestamp: Date.now() - 172800000,
        success: true,
      },
    ];
    
    return {
      success: true,
      logs: mockLogs.slice(0, input.limit),
      total: mockLogs.length,
    };
  });
