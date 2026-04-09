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

export class GoogleProvider implements AIProvider {
  name = 'Google';
  type = 'google' as const;
  private config: AIProviderConfig;
  private baseURL: string;

  constructor(config: AIProviderConfig) {
    this.config = config;
    this.baseURL = config.baseURL || 'https://generativelanguage.googleapis.com/v1beta';
  }

  async chat(messages: AIChatMessage[], options: AIChatOptions = {}): Promise<AIChatResponse> {
    const model = options.model || 'gemini-pro';
    
    // Convert messages to Gemini format
    const systemInstruction = messages.find(m => m.role === 'system')?.content;
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const contents = conversationMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const requestBody: any = {
      contents,
      generationConfig: {
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        topP: options.topP,
        stopSequences: options.stopSequences,
      },
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }],
      };
    }

    const response = await fetch(`${this.baseURL}/models/${model}:generateContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.customHeaders,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google API Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];

    return {
      content: candidate?.content?.parts?.[0]?.text || '',
      model,
      usage: data.usageMetadata ? {
        promptTokens: data.usageMetadata.promptTokenCount,
        completionTokens: data.usageMetadata.candidatesTokenCount,
        totalTokens: data.usageMetadata.totalTokenCount,
      } : undefined,
      finishReason: candidate?.finishReason,
      metadata: {
        safetyRatings: candidate?.safetyRatings,
        citationMetadata: candidate?.citationMetadata,
      },
    };
  }

  async getModels(): Promise<AIModelInfo[]> {
    const models: AIModelInfo[] = [
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        provider: this.name,
        type: 'chat',
        contextWindow: 32768,
        maxOutputTokens: 8192,
        inputCostPer1K: 0.0005,
        outputCostPer1K: 0.0015,
        capabilities: ['chat', 'function-calling'],
      },
      {
        id: 'gemini-pro-vision',
        name: 'Gemini Pro Vision',
        provider: this.name,
        type: 'chat',
        contextWindow: 16384,
        maxOutputTokens: 4096,
        inputCostPer1K: 0.0025,
        outputCostPer1K: 0.0075,
        capabilities: ['chat', 'vision'],
      },
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: this.name,
        type: 'chat',
        contextWindow: 1048576, // 1M tokens
        maxOutputTokens: 8192,
        inputCostPer1K: 0.0035,
        outputCostPer1K: 0.0105,
        capabilities: ['chat', 'vision', 'function-calling', 'long-context'],
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        provider: this.name,
        type: 'chat',
        contextWindow: 1048576, // 1M tokens
        maxOutputTokens: 8192,
        inputCostPer1K: 0.00015,
        outputCostPer1K: 0.0006,
        capabilities: ['chat', 'vision', 'function-calling', 'long-context'],
      },
    ];

    return models;
  }

  async embedding(text: string, options: AIEmbeddingOptions = {}): Promise<AIEmbeddingResponse> {
    const model = options.model || 'text-embedding-004';

    const response = await fetch(`${this.baseURL}/models/${model}:embedContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.customHeaders,
      },
      body: JSON.stringify({
        content: {
          parts: [{ text }],
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google Embedding Error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();

    return {
      embedding: data.embedding?.values || [],
      model,
      usage: {
        promptTokens: Math.ceil(text.length / 4), // Rough estimate
        totalTokens: Math.ceil(text.length / 4),
      },
    };
  }

  async* streamChat(messages: AIChatMessage[], options: AIChatOptions = {}): AsyncIterable<AIChatResponse> {
    const model = options.model || 'gemini-pro';
    const systemInstruction = messages.find(m => m.role === 'system')?.content;
    const conversationMessages = messages.filter(m => m.role !== 'system');

    const contents = conversationMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const requestBody: any = {
      contents,
      generationConfig: {
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        topP: options.topP,
        stopSequences: options.stopSequences,
      },
    };

    if (systemInstruction) {
      requestBody.systemInstruction = {
        parts: [{ text: systemInstruction }],
      };
    }

    const response = await fetch(`${this.baseURL}/models/${model}:streamGenerateContent?key=${this.config.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.customHeaders,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Google Stream Error: ${JSON.stringify(error)}`);
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
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);
              const candidate = parsed.candidates?.[0];
              const text = candidate?.content?.parts?.[0]?.text;
              
              if (text) {
                yield {
                  content: text,
                  model,
                  metadata: {
                    finishReason: candidate?.finishReason,
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
      const response = await fetch(`${this.baseURL}/models?key=${this.config.apiKey}`);
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
      'vision',
      'function-calling',
      'long-context',
    ];
  }
}
