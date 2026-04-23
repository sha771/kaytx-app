import { z } from "zod";
import { permissionProcedure } from '../../../create-context';
import { platformRegistry } from '../../../../bridges/registry/platform-registry';
import { Permission } from '../../../../lib/rbac';

export const listAllPlatformsProcedure = permissionProcedure(Permission.PLATFORM_READ)
  .input(z.object({}).optional())
  .query(async ({ input }) => {
  const platforms = platformRegistry.getAllPlatforms();
  const stats = platformRegistry.getCategoryStats();
  
  return {
    platforms,
    total: platformRegistry.getPlatformCount(),
    stats,
  };
});
