import { protectedProcedure } from '../../../create-context';
import { platformRegistry } from '../../../../bridges/registry/platform-registry';

export const listAllPlatformsProcedure = protectedProcedure.query(async () => {
  const platforms = platformRegistry.getAllPlatforms();
  const stats = platformRegistry.getCategoryStats();
  
  return {
    platforms,
    total: platformRegistry.getPlatformCount(),
    stats,
  };
});
