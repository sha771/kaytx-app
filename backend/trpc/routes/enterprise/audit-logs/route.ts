import { protectedProcedure } from '../../../create-context';
import { z } from 'zod';

const mockAuditLogs = Array.from({ length: 50 }, (_, i) => ({
  id: `audit-${i + 1}`,
  userId: i % 3 === 0 ? '1' : i % 3 === 1 ? '2' : '3',
  userName: i % 3 === 0 ? 'John Admin' : i % 3 === 1 ? 'Sarah Manager' : 'Mike Developer',
  action: ['login', 'data_access', 'config_change', 'export', 'integration'][i % 5],
  resource: ['users', 'settings', 'data', 'reports', 'integrations'][i % 5],
  resourceId: `res-${i + 1}`,
  status: i % 10 === 0 ? 'failure' : 'success',
  ipAddress: `192.168.1.${100 + i}`,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  metadata: {
    userAgent: 'Mozilla/5.0',
    details: `Action performed on ${['users', 'settings', 'data', 'reports', 'integrations'][i % 5]}`,
  },
}));

export const getAuditLogsProcedure = protectedProcedure
  .input(
    z.object({
      limit: z.number().optional().default(20),
      offset: z.number().optional().default(0),
      action: z.string().optional(),
      userId: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    })
  )
  .query(async ({ ctx, input }) => {
    console.log('[Enterprise] Getting audit logs for user:', ctx.user.id);

    let logs = [...mockAuditLogs];

    if (input.action) {
      logs = logs.filter((log) => log.action === input.action);
    }

    if (input.userId) {
      logs = logs.filter((log) => log.userId === input.userId);
    }

    if (input.startDate) {
      logs = logs.filter((log) => new Date(log.timestamp) >= new Date(input.startDate!));
    }

    if (input.endDate) {
      logs = logs.filter((log) => new Date(log.timestamp) <= new Date(input.endDate!));
    }

    const total = logs.length;
    const items = logs.slice(input.offset, input.offset + input.limit);

    return {
      items,
      total,
      hasMore: input.offset + input.limit < total,
    };
  });

export const exportAuditLogsProcedure = protectedProcedure
  .input(
    z.object({
      format: z.enum(['csv', 'json', 'pdf']),
      startDate: z.string(),
      endDate: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    console.log('[Enterprise] Exporting audit logs:', input.format);

    return {
      success: true,
      downloadUrl: `https://example.com/exports/audit-logs-${Date.now()}.${input.format}`,
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };
  });
