import { z } from "zod";
import { protectedProcedure } from '../../../../create-context';

const configSchema = z.object({
  enabled: z.boolean(),
  autoAnswer: z.boolean(),
  recordCalls: z.boolean(),
  transcribeCalls: z.boolean(),
  voiceType: z.string(),
  speakingSpeed: z.number(),
  emotionalTone: z.string(),
  holdMusic: z.boolean(),
  maxCallDuration: z.number(),
  transferToHuman: z.boolean(),
  transferThreshold: z.number(),
  businessHoursOnly: z.boolean(),
  sendSummaryEmail: z.boolean(),
});

export const saveReceptionistConfigProcedure = protectedProcedure
  .input(configSchema)
  .mutation(async ({ input }: { input: z.infer<typeof configSchema> }) => {
    console.log('[saveReceptionistConfig] Saving config:', input);
    
    return {
      success: true,
      message: 'Configuration saved successfully',
      config: input,
    };
  });
