import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { db as pgDb } from '../../../../db/connection';
import { subscriptions, organizations } from '../../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';

export const getSubscriptionProcedure = permissionProcedure(Permission.BILLING_READ)
  .input(z.object({}).optional())
  .query(async ({ ctx, input }) => {
  console.log('[Enterprise] Getting subscription for user:', ctx.user.id);
  
  const [subscription] = await pgDb
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.organizationId, ctx.user.organizationId))
    .limit(1);

  return subscription || null;
});
