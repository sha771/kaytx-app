import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { Permission } from '../../../../lib/rbac';
import { db as pgDb } from '../../../../db/connection';
import { platformConnections } from '../../../../db/drizzle-schema';
import { platformAuthService, PlatformType } from '../../../../services/platform-auth-service';
import { and, eq } from 'drizzle-orm';
import { platformSyncEngine } from '../../../../services/consolidated-platform-sync-service';

const inputSchema = z.object({
  platformId: z.string(),
});

export const syncPlatformProcedure = permissionProcedure(Permission.PLATFORM_UPDATE)
  .input(inputSchema)
  .mutation(async ({ input, ctx }: { input: z.infer<typeof inputSchema>; ctx: any }) => {
    console.log('Syncing platform:', input.platformId);

    const organizationId = ctx.user?.organizationId;
    if (!organizationId) {
      throw new Error('User organization not found');
    }

    const connections = await pgDb
      .select()
      .from(platformConnections)
      .where(eq(platformConnections.organizationId, organizationId as any));

    const conn = connections.find((c: any) => {
      const meta = c?.metadata || {};
      return String(meta.platformId || '') === String(input.platformId);
    });

    if (!conn) {
      throw new Error('Platform connection not found');
    }

    let status: string = (conn as any).metadata?.status || 'active';
    const platformType = String((conn as any).platform || '') as PlatformType;
    if ((conn as any).isActive) {
      await platformAuthService.ensureValidCredentialsForOrg(organizationId as string, platformType);
      const [refreshed] = await pgDb
        .select()
        .from(platformConnections)
        .where(eq(platformConnections.id, (conn as any).id))
        .limit(1);
      status = (refreshed as any)?.metadata?.status || status;
    }

    const result = await platformSyncEngine.enqueueAndRunConnectionSync({
      organizationId: organizationId as string,
      platform: platformType,
      connectionId: String((conn as any).id),
      jobType: 'manual_sync',
      payload: {
        platformId: input.platformId,
      },
    });

    return {
      success: true,
      lastSync: new Date().toISOString(),
      messageCount: result.messageCount,
      status: result.status,
    };
  });
