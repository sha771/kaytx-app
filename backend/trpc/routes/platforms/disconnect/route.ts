import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { db as pgDb } from '../../../../db/connection';
import { platformConnections } from '../../../../db/drizzle-schema';
import { and, eq } from 'drizzle-orm';

const inputSchema = z.object({
  platformId: z.string(),
});

export const disconnectPlatformProcedure = permissionProcedure(Permission.PLATFORM_DELETE)
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    console.log('Disconnecting platform:', input.platformId);

    const organizationId = ctx.user?.organizationId;
    if (!organizationId) {
      throw new Error('User organization not found');
    }

    const connections = await pgDb
      .select()
      .from(platformConnections)
      .where(eq(platformConnections.organizationId, organizationId as any));

    const existing = connections.find((c: any) => {
      const meta = c?.metadata || {};
      return String(meta.platformId || '') === String(input.platformId);
    });

    if (existing) {
      const meta = (existing as any).metadata || {};
      const mergedMetadata = {
        ...meta,
        status: 'disconnected',
        disconnectedAt: new Date().toISOString(),
        encryptedCredentials: null,
      };

      await pgDb
        .update(platformConnections)
        .set({ isActive: false, metadata: mergedMetadata as any, updatedAt: new Date() } as any)
        .where(eq(platformConnections.id, (existing as any).id));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Platform disconnected successfully',
    };
  });
