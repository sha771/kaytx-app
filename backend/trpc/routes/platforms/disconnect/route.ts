import { z } from "zod";
import { protectedProcedure } from '../../../create-context';

const inputSchema = z.object({
  platformId: z.string(),
});

export const disconnectPlatformProcedure = protectedProcedure
  .input(inputSchema)
  .mutation(async ({ input }: { input: z.infer<typeof inputSchema> }) => {
    console.log('Disconnecting platform:', input.platformId);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Platform disconnected successfully',
    };
  });
