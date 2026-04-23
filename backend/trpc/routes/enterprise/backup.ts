import { z } from 'zod';
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import crypto from 'crypto';
import { Permission } from '../../../lib/rbac';
import { db as pgDb } from '../../../db/connection';
import { backups } from '../../../db/drizzle-schema';
import { eq, desc } from 'drizzle-orm';

const backupSchema = z.object({
    database: z.string(),
    type: z.enum(['full', 'incremental', 'differential']),
});

export const backupRouter = createTRPCRouter({
    list: permissionProcedure(Permission.BACKUP_READ)
        .input(z.void().optional())
        .query(async ({ ctx }) => {
            const rows = await pgDb
                .select()
                .from(backups)
                .where(eq(backups.organizationId, ctx.user.organizationId))
                .orderBy(desc(backups.createdAt))
                .limit(50);
            return { backups: rows };
        }),

    trigger: permissionProcedure(Permission.BACKUP_TRIGGER)
        .input(backupSchema)
        .mutation(async ({ input, ctx }) => {
            const job = await pgDb
                .insert(backups)
                .values({
                    id: crypto.randomUUID(),
                    organizationId: ctx.user.organizationId,
                    database: input.database,
                    type: input.type,
                    status: 'pending',
                    createdAt: new Date(),
                    createdBy: ctx.user.id,
                } as any)
                .returning();
            console.log('[ENTERPRISE] Triggering backup:', input.type, 'jobId:', job[0]?.id);
            // In real scenario: enqueue background job to run pg_dump or call cloud API
            return {
                success: true,
                id: job[0]?.id,
                message: 'Backup process initialized',
            };
        }),
});
