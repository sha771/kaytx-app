export interface AIChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export interface AIChatOptions {
    model?: string;
    temperature?: number;
    maxTokens?: number;
}

export class AIService {
    private openRouterKey = process.env.OPENROUTER_API_KEY || '';
    private googleKey = process.env.GOOGLE_API_KEY || '';

    constructor() {
        if (!this.openRouterKey && !this.googleKey) {
            console.warn('[AIService] No AI API keys found in environment variables.');
        }
    }

    async chat(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<string> {
        // Default to OpenRouter as it's more flexible
        if (this.openRouterKey) {
            return this.chatOpenRouter(messages, options);
        } else if (this.googleKey) {
            return this.chatGemini(messages, options);
        } else {
            return "I'm sorry, I'm currently in simulation mode. Please provide an API key to enable my full capabilities.";
        }
    }

    private async chatOpenRouter(messages: AIChatMessage[], options: AIChatOptions): Promise<string> {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.openRouterKey}`,
                    'HTTP-Referer': 'https://unifiedze.unifex.final', // Optional
                    'X-Title': 'Unifiedze Unifex', // Optional
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: options.model || 'openai/gpt-3.5-turbo',
                    messages,
                    temperature: options.temperature ?? 0.7,
                    max_tokens: options.maxTokens ?? 1000,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`OpenRouter Error: ${JSON.stringify(error)}`);
            }

            const data = await response.json();
            const result = data.choices[0].message.content;
            console.log(`[AIService] ✓ OpenRouter response received (${result.length} chars)`);
            return result;
        } catch (error) {
            console.error('[AIService] OpenRouter chat failed:', error);
            throw error;
        }
    }

    private async chatGemini(messages: AIChatMessage[], options: AIChatOptions): Promise<string> {
        try {
            // Map messages to Gemini format
            const contents = messages.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }],
            }));

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.googleKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents,
                    generationConfig: {
                        temperature: options.temperature ?? 0.7,
                        maxOutputTokens: options.maxTokens ?? 1000,
                    },
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Gemini Error: ${JSON.stringify(error)}`);
            }

            const data = await response.json();
            const result = data.candidates[0].content.parts[0].text;
            console.log(`[AIService] ✓ Gemini response received (${result.length} chars)`);
            return result;
        } catch (error) {
            console.error('[AIService] Gemini chat failed:', error);
            throw error;
        }
    }
}

export const aiService = new AIService();
