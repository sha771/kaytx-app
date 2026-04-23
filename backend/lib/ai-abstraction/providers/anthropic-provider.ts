import { 
  AIProvider, 
  AIProviderConfig, 
  AIChatMessage, 
  AIChatOptions, 
  AIChatResponse, 
  AIModelInfo 
} from '../ai-provider-interface';

export class AnthropicProvider implements AIProvider {
  name = 'Anthropic';
  type = 'anthropic' as const;
  private config: AIProviderConfig;
  private baseURL: string;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.baseURL = config.baseURL || 'https://api.anthropic.com/v1';
  }

  async chat(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<AIChatResponse> {
    // Convert messages to Anthropic format
    const systemMessage = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const response = await fetch(`${this.baseURL}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': this.config.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        ...this.config.customHeaders,
      },
      body: JSON.stringify({
        model: options.model || 'claude-3-sonnet-20240229',
        max_tokens: options.maxTokens ?? 1000,
        temperature: options.temperature,
        top_p: options.topP,
        stop_sequences: options.stopSequences,
        system: systemMessage?.content,
        messages: conversationMessages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Anthropic API Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    return {
      content: data.content[0]?.text || '',
      model: data.model,
      usage: data.usage ? {
        promptTokens: data.usage.input_tokens,
        completionTokens: data.usage.output_tokens,
        totalTokens: data.usage.input_tokens + data.usage.output_tokens,
      } : undefined,
      finishReason: data.stop_reason,
      metadata: {
        id: data.id,
        type: data.type,
      },
    };
  }

  async getModels(): Promise<AIModelInfo[]> {
    // Anthropic has a fixed set of models
    const models: AIModelInfo[] = [
      {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        provider: this.name,
        type: 'chat',
        contextWindow: 200000,
        maxOutputTokens: 4096,
        inputCostPer1K: 0.015,
        outputCostPer1K: 0.075,
        capabilities: ['chat', 'vision', 'function-calling'],
      },
      {
        id: 'claude-3-sonnet-20240229',
        name: 'Claude 3 Sonnet',
        provider: this.name,
        type: 'chat',
        contextWindow: 200000,
        maxOutputTokens: 4096,
        inputCostPer1K: 0.003,
        outputCostPer1K: 0.015,
        capabilities: ['chat', 'vision', 'function-calling'],
      },
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: this.name,
        type: 'chat',
        contextWindow: 200000,
        maxOutputTokens: 4096,
        inputCostPer1K: 0.00025,
        outputCostPer1K: 0.00125,
        capabilities: ['chat', 'vision'],
      },
      {
        id: 'claude-2.1',
        name: 'Claude 2.1',
        provider: this.name,
        type: 'chat',
        contextWindow: 200000,
        maxOutputTokens: 4096,
        inputCostPer1K: 0.008,
        outputCostPer1K: 0.024,
        capabilities: ['chat'],
      },
      {
        id: 'claude-2.0',
        name: 'Claude 2.0',
        provider: this.name,
        type: 'chat',
        contextWindow: 100000,
        maxOutputTokens: 4096,
        inputCostPer1K: 0.008,
        outputCostPer1K: 0.024,
        capabilities: ['chat'],
      },
    ];

    return models;
  }

  async* streamChat(messages: AIChatMessage[], options: AIChatOptions = {}): AsyncIterable<AIChatResponse> {
    const systemMessage = messages.find(m => m.role === 'system');
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const response = await fetch(`${this.baseURL}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': this.config.apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        ...this.config.customHeaders,
      },
      body: JSON.stringify({
        model: options.model || 'claude-3-sonnet-20240229',
        max_tokens: options.maxTokens ?? 1000,
        temperature: options.temperature,
        top_p: options.topP,
        stop_sequences: options.stopSequences,
        system: systemMessage?.content,
        messages: conversationMessages.map(msg => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        })),
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Anthropic Stream Error: ${JSON.stringify(error)}`);
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
              
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                yield {
                  content: parsed.delta.text,
                  model: options.model || 'claude-3-sonnet-20240229',
                  metadata: {
                    id: parsed.message_id,
                    type: parsed.type,
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
      const response = await fetch(`${this.baseURL}/messages`, {
        method: 'POST',
        headers: {
          'x-api-key': this.config.apiKey,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'test' }],
        }),
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
      'vision',
      'function-calling',
      'long-context',
    ];
  }
}
