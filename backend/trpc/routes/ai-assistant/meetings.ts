import { z } from 'zod';
import { createTRPCRouter, permissionProcedure } from '../../create-context';
import crypto from 'crypto';
import { Permission } from '../../../lib/rbac';

const meetingSchema = z.object({
    title: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    attendees: z.array(z.string()),
    type: z.enum(['video', 'phone', 'in-person']),
    status: z.enum(['scheduled', 'in-progress', 'completed', 'cancelled']),
});

export const meetingsRouter = createTRPCRouter({
    list: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .query(async () => {
            return { meetings: [] };
        }),

    create: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .input(meetingSchema)
        .mutation(async ({ input }) => {
            return { success: true, id: crypto.randomUUID() };
        }),

    update: permissionProcedure(Permission.AI_ASSISTANT_USE)
        .input(z.object({ id: z.string(), updates: meetingSchema.partial() }))
        .mutation(async () => {
            return { success: true };
        }),
});
