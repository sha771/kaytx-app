import { 
  AIProvider, 
  AIProviderConfig, 
  AIChatMessage, 
  AIChatOptions, 
  AIChatResponse, 
  AIEmbeddingOptions,
  AIEmbeddingResponse,
  AIModelInfo 
} from '../ai-provider-interface';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  type = 'openai' as const;
  private config: AIProviderConfig;
  private baseURL: string;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.baseURL = config.baseURL || 'https://api.openai.com/v1';
  }

  async chat(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<AIChatResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...this.config.customHeaders,
      },
      body: JSON.stringify({
        model: options.model || 'gpt-3.5-turbo',
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1000,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stop: options.stopSequences,
        stream: options.stream ?? false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const choice = data.choices[0];

    return {
      content: choice.message.content,
      model: data.model,
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        completionTokens: data.usage.completion_tokens,
        totalTokens: data.usage.total_tokens,
      } : undefined,
      finishReason: choice.finish_reason,
      metadata: {
        id: data.id,
        created: data.created,
        systemFingerprint: data.system_fingerprint,
      },
    };
  }

  async getModels(): Promise<AIModelInfo[]> {
    const response = await fetch(`${this.baseURL}/models`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch OpenAI models: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Filter and map to our interface
    return data.data
      .filter((model: any) => model.id.includes('gpt'))
      .map((model: any): AIModelInfo => ({
        id: model.id,
        name: model.id,
        provider: this.name,
        type: 'chat',
        contextWindow: this.getContextWindow(model.id),
        maxOutputTokens: this.getMaxOutputTokens(model.id),
        inputCostPer1K: this.getInputCost(model.id),
        outputCostPer1K: this.getOutputCost(model.id),
        capabilities: this.getModelCapabilities(model.id),
      }));
  }

  async embedding(text: string, options: AIEmbeddingOptions = {}): Promise<AIEmbeddingResponse> {
    const response = await fetch(`${this.baseURL}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model || 'text-embedding-ada-002',
        input: text,
        dimensions: options.dimensions,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI Embedding Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    
    return {
      embedding: data.data[0].embedding,
      model: data.model,
      usage: data.usage ? {
        promptTokens: data.usage.prompt_tokens,
        totalTokens: data.usage.total_tokens,
      } : undefined,
    };
  }

  async* streamChat(messages: AIChatMessage[], options: AIChatOptions = {}): AsyncIterable<AIChatResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...this.config.customHeaders,
      },
      body: JSON.stringify({
        model: options.model || 'gpt-3.5-turbo',
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 1000,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI Stream Error: ${JSON.stringify(error)}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Response body is not readable');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices[0]?.delta;
              
              if (delta?.content) {
                yield {
                  content: delta.content,
                  model: parsed.model,
                  metadata: {
                    id: parsed.id,
                    created: parsed.created,
                    isStreaming: true,
                  },
                };
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  getCapabilities(): string[] {
    return [
      'chat',
      'streaming',
      'embeddings',
      'function-calling',
      'vision',
      'fine-tuning',
    ];
  }

  // Helper methods for model information
  private getContextWindow(modelId: string): number {
    const contexts: Record<string, number> = {
      'gpt-4': 8192,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 128000,
      'gpt-4-turbo-preview': 128000,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return contexts[modelId] || 4096;
  }

  private getMaxOutputTokens(modelId: string): number {
    const outputs: Record<string, number> = {
      'gpt-4': 4096,
      'gpt-4-32k': 32768,
      'gpt-4-turbo': 4096,
      'gpt-4-turbo-preview': 4096,
      'gpt-3.5-turbo': 4096,
      'gpt-3.5-turbo-16k': 16385,
    };
    return outputs[modelId] || 4096;
  }

  private getInputCost(modelId: string): number {
    const costs: Record<string, number> = {
      'gpt-4': 0.03,
      'gpt-4-32k': 0.06,
      'gpt-4-turbo': 0.01,
      'gpt-4-turbo-preview': 0.01,
      'gpt-3.5-turbo': 0.001,
      'gpt-3.5-turbo-16k': 0.003,
    };
    return costs[modelId] || 0.001;
  }

  private getOutputCost(modelId: string): number {
    const costs: Record<string, number> = {
      'gpt-4': 0.06,
      'gpt-4-32k': 0.12,
      'gpt-4-turbo': 0.03,
      'gpt-4-turbo-preview': 0.03,
      'gpt-3.5-turbo': 0.002,
      'gpt-3.5-turbo-16k': 0.004,
    };
    return costs[modelId] || 0.002;
  }

  private getModelCapabilities(modelId: string): string[] {
    const capabilities: Record<string, string[]> = {
      'gpt-4-vision-preview': ['chat', 'vision', 'function-calling'],
      'gpt-4-turbo': ['chat', 'function-calling', 'vision'],
      'gpt-4': ['chat', 'function-calling'],
      'gpt-3.5-turbo': ['chat', 'function-calling'],
    };
    return capabilities[modelId] || ['chat'];
  }
}
