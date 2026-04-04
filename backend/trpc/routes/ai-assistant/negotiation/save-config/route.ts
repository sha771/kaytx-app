import { z } from "zod";
import { protectedProcedure } from '../../../../create-context';

const configSchema = z.object({
  enabled: z.boolean(),
  autoLearn: z.boolean(),
  aggressiveness: z.number(),
  customerSatisfactionPriority: z.number(),
  profitMarginPriority: z.number(),
  responseDelay: z.number(),
  useEmotionalIntelligence: z.boolean(),
  escalateToHuman: z.boolean(),
  escalationThreshold: z.number(),
});

export const saveNegotiationConfigProcedure = protectedProcedure
  .input(configSchema)
  .mutation(async ({ input }: { input: z.infer<typeof configSchema> }) => {
    console.log('[saveNegotiationConfig] Saving config:', input);
    
    return {
      success: true,
      message: 'Configuration saved successfully',
      config: input,
    };
  });
