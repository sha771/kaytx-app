import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { db as pgDb } from '../../../../db/connection';
import { dataAccessLogs } from '../../../../db/drizzle-schema';
import { and, desc, eq, gte, lte } from 'drizzle-orm';
import { Permission } from '../../../../lib/rbac';

const schema = z.object({
  startDate: z.number().optional(),
  endDate: z.number().optional(),
  limit: z.number().min(1).max(100).default(50),
});

 export default permissionProcedure(Permission.PRIVACY_ACCESS_LOGS_READ)
  .input(schema)
  .query(async ({ ctx, input }) => {
    console.log('[Privacy] Fetching data access logs for user:', ctx.user.id);

    const start = typeof input.startDate === 'number' ? new Date(input.startDate) : undefined;
    const end = typeof input.endDate === 'number' ? new Date(input.endDate) : undefined;

    const where = and(
      eq(dataAccessLogs.userId, ctx.user.id),
      ...(start ? [gte(dataAccessLogs.timestamp, start)] : []),
      ...(end ? [lte(dataAccessLogs.timestamp, end)] : [])
    );

    const logs = await pgDb
      .select()
      .from(dataAccessLogs)
      .where(where)
      .orderBy(desc(dataAccessLogs.timestamp))
      .limit(input.limit);

    return {
      success: true,
      logs,
      total: logs.length,
    };
  });
