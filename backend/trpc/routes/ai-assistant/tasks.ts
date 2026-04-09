import { z } from 'zod';
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import { TRPCError } from '@trpc/server';
import { db as pgDb } from '../../../db/connection';
import { tasks } from '../../../db/drizzle-schema';
import { Permission } from '../../../lib/rbac';
import { and, desc, eq, or } from 'drizzle-orm';

// Enterprise Task Schema
const taskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.enum(['high', 'medium', 'low']).default('medium'),
    status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']).default('pending'),
    dueDate: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const tasksRouter = createTRPCRouter({
    list: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .query(async ({ ctx }) => {
            const organizationId = ctx.user.organizationId;

            const rows = await pgDb
                .select()
                .from(tasks)
                .where(and(
                    eq(tasks.organizationId, organizationId),
                    or(
                        eq(tasks.createdBy, ctx.user.id),
                        eq(tasks.assignedTo, ctx.user.id)
                    )
                ))
                .orderBy(desc(tasks.createdAt))
                .limit(200);

            return { tasks: rows };
        }),

    create: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .input(taskSchema)
        .mutation(async ({ input, ctx }) => {
            const organizationId = ctx.user.organizationId;
            const now = new Date();

            const dueDate = input.dueDate ? new Date(input.dueDate) : null;
            if (input.dueDate && Number.isNaN(dueDate.getTime())) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid dueDate' });
            }

            const [created] = await pgDb
                .insert(tasks)
                .values({
                    organizationId,
                    title: input.title,
                    description: input.description ?? null,
                    priority: input.priority,
                    status: input.status,
                    assignedTo: ctx.user.id,
                    createdBy: ctx.user.id,
                    dueDate: dueDate || null,
                    completedAt: null,
                    tags: input.tags ?? [],
                    relatedTo: {},
                    metadata: {},
                    createdAt: now,
                    updatedAt: now,
                } as any)
                .returning();

            return { success: true, id: created.id };
        }),

    update: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .input(z.object({ id: z.string(), updates: taskSchema.partial() }))
        .mutation(async ({ input, ctx }) => {
            const organizationId = ctx.user.organizationId;
            const updates = input.updates;

            const dueDate = typeof updates.dueDate === 'string' ? new Date(updates.dueDate) : undefined;
            if (typeof updates.dueDate === 'string' && Number.isNaN(dueDate?.getTime())) {
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Invalid dueDate' });
            }

            const [updated] = await pgDb
                .update(tasks)
                .set({
                    ...(typeof updates.title === 'string' ? { title: updates.title } : {}),
                    ...(typeof updates.description === 'string' ? { description: updates.description } : {}),
                    ...(updates.description === undefined ? {} : updates.description === null ? { description: null } : {}),
                    ...(typeof updates.priority === 'string' ? { priority: updates.priority } : {}),
                    ...(typeof updates.status === 'string' ? { status: updates.status } : {}),
                    ...(typeof updates.dueDate === 'string' ? { dueDate: dueDate || null } : {}),
                    ...(Array.isArray(updates.tags) ? { tags: updates.tags } : {}),
                    updatedAt: new Date(),
                } as any)
                .where(and(
                    eq(tasks.id, input.id as any),
                    eq(tasks.organizationId, organizationId),
                    or(
                        eq(tasks.createdBy, ctx.user.id),
                        eq(tasks.assignedTo, ctx.user.id)
                    )
                ))
                .returning();

            if (!updated) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Task not found' });
            }

            return { success: true };
        }),
});
