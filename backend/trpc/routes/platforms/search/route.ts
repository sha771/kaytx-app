import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { platformRegistry } from '../../../../bridges/registry/platform-registry';

export const searchPlatformsProcedure = protectedProcedure
  .input(
    z.object({
      query: z.string(),
      category: z.enum(['messaging', 'social', 'business', 'ai', 'email', 'support', 'other']).optional(),
      region: z.string().optional(),
    })
  )
  .query(async ({ input }) => {
    let platforms = platformRegistry.searchPlatforms(input.query);
    
    if (input.category) {
      platforms = platforms.filter(p => p.category === input.category);
    }
    
    if (input.region) {
      platforms = platforms.filter(p => 
        p.regions.includes(input.region as any) || p.regions.includes('GLOBAL')
      );
    }
    
    return platforms;
  });
