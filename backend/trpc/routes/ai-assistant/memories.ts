import { z } from 'zod';
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import { db as pgDb } from '../../../db/connection';
import { aiMemories } from '../../../db/drizzle-schema';
import { Permission } from '../../../lib/rbac';
import { and, desc, eq, ilike } from 'drizzle-orm';

const memorySchema = z.object({
    type: z.enum(['conversation', 'preference', 'habit', 'contact', 'document']),
    content: z.string(),
    importance: z.number().min(0).max(1),
    tags: z.array(z.string()),
});

export const memoriesRouter = createTRPCRouter({
    list: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .query(async ({ ctx }) => {
            const organizationId = ctx.user.organizationId;

            const memories = await pgDb
                .select()
                .from(aiMemories)
                .where(and(
                    eq(aiMemories.organizationId, organizationId),
                    eq(aiMemories.userId, ctx.user.id)
                ))
                .orderBy(desc(aiMemories.createdAt))
                .limit(200);

            return { memories };
        }),

    create: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .input(memorySchema)
        .mutation(async ({ input, ctx }) => {
            const organizationId = ctx.user.organizationId;

            const [created] = await pgDb
                .insert(aiMemories)
                .values({
                    organizationId,
                    userId: ctx.user.id,
                    type: input.type,
                    content: input.content,
                    importance: String(input.importance),
                    tags: input.tags,
                    metadata: {},
                    createdAt: new Date(),
                    updatedAt: new Date(),
                } as any)
                .returning();

            return { success: true, id: created.id };
        }),

    search: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .input(z.object({ query: z.string() }))
        .query(async ({ input, ctx }) => {
            const organizationId = ctx.user.organizationId;
            const q = input.query.trim();

            if (!q) {
                return { memories: [] };
            }

            const memories = await pgDb
                .select()
                .from(aiMemories)
                .where(and(
                    eq(aiMemories.organizationId, organizationId),
                    eq(aiMemories.userId, ctx.user.id),
                    ilike(aiMemories.content, `%${q}%`)
                ))
                .orderBy(desc(aiMemories.createdAt))
                .limit(50);

            return { memories };
        }),
});
