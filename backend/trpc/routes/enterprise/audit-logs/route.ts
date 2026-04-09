import { permissionProcedure } from '../../../create-context';
import { z } from 'zod';
import { db as pgDb } from '../../../../db/connection';
import { auditLogs } from '../../../../db/drizzle-schema';
import { and, desc, eq, gte, lte } from 'drizzle-orm';
import { Permission } from '../../../../lib/rbac';

export const getAuditLogsProcedure = permissionProcedure(Permission.AUDIT_READ)
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

    const organizationId = ctx.user?.organizationId;
    if (!organizationId) {
      throw new Error('User organization not found');
    }

    const clauses: any[] = [eq(auditLogs.organizationId, organizationId as any)];
    if (input.action) clauses.push(eq(auditLogs.action, input.action));
    if (input.userId) clauses.push(eq(auditLogs.userId, input.userId as any));
    if (input.startDate) clauses.push(gte(auditLogs.timestamp, new Date(input.startDate) as any));
    if (input.endDate) clauses.push(lte(auditLogs.timestamp, new Date(input.endDate) as any));

    const where = clauses.length === 1 ? clauses[0] : and(...clauses);

    const rows = await pgDb
      .select()
      .from(auditLogs)
      .where(where)
      .orderBy(desc(auditLogs.timestamp))
      .limit(input.limit)
      .offset(input.offset);

    const totalRows = await pgDb
      .select()
      .from(auditLogs)
      .where(where);

    const total = totalRows.length;
    const items = (rows as any[]).map((r) => ({
      id: r.id,
      userId: r.userId,
      action: r.action,
      resource: r.resource,
      resourceId: r.resourceId,
      status: r.status,
      ipAddress: r.ipAddress,
      timestamp: r.timestamp instanceof Date ? r.timestamp.toISOString() : String(r.timestamp),
      metadata: r.metadata,
    }));

    return {
      items,
      total,
      hasMore: input.offset + input.limit < total,
    };
  });

export const exportAuditLogsProcedure = permissionProcedure(Permission.AUDIT_EXPORT)
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
