import { z } from 'zod';
import { protectedProcedure } from '../../../create-context';
import { aiService } from '../../../../lib/ai-service';

const chatSchema = z.object({
    messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })),
    model: z.string().optional(),
    temperature: z.number().optional(),
}));

export const chatProcedure = protectedProcedure
    .input(chatSchema)
    .mutation(async ({ input }) => {
        try {
            const response = await aiService.chat(input.messages, {
                model: input.model,
                temperature: input.temperature,
            });

            return {
                success: true,
                message: response,
            };
        } catch (error: any) {
            console.error('[AI-Assistant] Chat failed:', error);
            return {
                success: false,
                error: error.message || 'Failed to get response from AI',
            };
        }
    });

export default chatProcedure;
