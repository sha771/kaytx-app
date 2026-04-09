import { z } from "zod";
import { permissionProcedure } from "../../../create-context";
import { Permission } from "../../../../lib/rbac";
import { db as pgDb } from '../../../../db/connection';
import { notifications } from '../../../../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';

export default permissionProcedure(Permission.NOTIFICATIONS_READ)
  .input(z.object({
    unreadOnly: z.boolean().optional(),
    limit: z.number().default(50),
    offset: z.number().default(0),
  }))
  .query(async ({ ctx, input }) => {
    console.log('[Notifications] Fetching for user:', ctx.user.id);

    // 1. Build query
    let baseQuery = pgDb
      .select()
      .from(notifications)
      .where(eq(notifications.userId, ctx.user.id as string))
      .orderBy(desc(notifications.createdAt))
      .limit(input.limit)
      .offset(input.offset);

    if (input.unreadOnly) {
      baseQuery = pgDb
        .select()
        .from(notifications)
        .where(
          and(
            eq(notifications.userId, ctx.user.id as string),
            eq(notifications.read, false)
          )
        )
        .orderBy(desc(notifications.createdAt))
        .limit(input.limit)
        .offset(input.offset) as any;
    }

    // 2. Execute
    const results = await baseQuery;

    // 3. Get unread count
    const [unreadResult] = await pgDb
      .select({ count: notifications.id })
      .from(notifications)
      .where(
        and(
          eq(notifications.userId, ctx.user.id as string),
          eq(notifications.read, false)
        )
      );

    // 4. Map to frontend format
    const formatted = results.map((n: any) => ({
      id: n.id,
      type: n.type,
      title: n.title,
      body: n.message,
      isRead: n.read,
      timestamp: n.createdAt ? n.createdAt.toISOString() : new Date().toISOString(),
      priority: n.priority,
      metadata: n.metadata,
      actionUrl: n.actionUrl,
    }));

    return {
      notifications: formatted,
      total: formatted.length,
      unreadCount: results.filter((n: any) => !n.read).length // Simplified for now
    };
  });
