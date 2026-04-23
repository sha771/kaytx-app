import { 
    aiServiceManager, 
    AIChatMessage, 
    AIChatOptions, 
    AIChatResponse 
} from './ai-abstraction';
import { logger } from './production-logger';

export { AIChatMessage, AIChatOptions, AIChatResponse };

export class AIService {
    async chat(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<string> {
        try {
            const response = await aiServiceManager.chat(messages, options);
            return response.content;
        } catch (error) {
            logger.error('[AIService] Chat failed', error instanceof Error ? error : undefined);
            return "I'm sorry, I'm currently experiencing difficulties. Please try again later.";
        }
    }

    async chatWithMetadata(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<AIChatResponse> {
        return aiServiceManager.chat(messages, options);
    }

    async streamChat(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<AsyncIterable<string>> {
        const stream = await aiServiceManager.streamChat(messages, options);
        
        return (async function*() {
            for await (const chunk of stream) {
                yield chunk.content;
            }
        })();
    }

    async getAvailableProviders(): Promise<{
        id: string;
        name: string;
        type: string;
        isDefault: boolean;
        capabilities: string[];
    }[]> {
        return aiServiceManager.getAvailableProviders();
    }

    async getModels(providerId?: string): Promise<any[]> {
        return aiServiceManager.getModels(providerId);
    }

    async getBestModelForTask(
        task: 'chat' | 'embedding' | 'vision' | 'long-context',
        budgetConstraint?: 'low' | 'medium' | 'high'
    ): Promise<any> {
        return aiServiceManager.getBestModelForTask(task, budgetConstraint);
    }
}

export const aiService = new AIService();
