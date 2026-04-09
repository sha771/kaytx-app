import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { db as pgDb } from '../../../../db/connection';
import { breachChecks } from '../../../../db/drizzle-schema';
import { eq, desc } from 'drizzle-orm';

const schema = z.object({
  email: z.string().email().optional(),
});

export default permissionProcedure(Permission.PRIVACY_BREACH_CHECK)
  .input(schema)
  .query(async ({ ctx, input }) => {
    console.log('[Privacy] Checking for data breaches for user:', ctx.user.id);
    
    const email = input.email || ctx.user.email;
    
    const rows = await pgDb
      .select()
      .from(breachChecks)
      .where(eq(breachChecks.email, email))
      .orderBy(desc(breachChecks.breachDate))
      .limit(20);
    
    return {
      success: true,
      breachesFound: rows.length,
      breaches: rows,
      lastChecked: Date.now(),
      recommendation: rows.length > 0 
        ? 'Your information has been found in data breaches. Please take action.'
        : 'No breaches found. Your data appears secure.',
    };
  });
