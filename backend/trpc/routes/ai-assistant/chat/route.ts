import { z } from 'zod';
import { permissionProcedure } from '../../../create-context';
import { aiService } from '../../../../lib/ai-service';
import { Permission } from '../../../../lib/rbac';

const chatSchema = z.object({
    messages: z.array(z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
    })),
    model: z.string().optional(),
    temperature: z.number().optional(),
});

export const chatProcedure = permissionProcedure(Permission.AI_ASSISTANT_USE)
    .input(chatSchema)
    .mutation(async ({ input }) => {
        try {
            const options: any = {};
            if (input.model) options.model = input.model;
            if (typeof input.temperature === 'number') options.temperature = input.temperature;

            const response = await aiService.chat(input.messages, options);

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
