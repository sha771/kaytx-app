import { z } from "zod";
import { protectedProcedure } from '../../../create-context';

const inputSchema = z.object({
  platformId: z.string(),
});

export const syncPlatformProcedure = protectedProcedure
  .input(inputSchema)
  .mutation(async ({ input }: { input: z.infer<typeof inputSchema> }) => {
    console.log('Syncing platform:', input.platformId);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      lastSync: new Date().toISOString(),
      messageCount: Math.floor(Math.random() * 100) + 50,
    };
  });
