// Lazy load AI dependencies to avoid import errors when packages not installed

import { createLogger } from '../../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

function asError(err: unknown): Error {
  return err instanceof Error ? err : new Error(typeof err === 'string' ? err : JSON.stringify(err));
}

let OpenAI: any;
let Anthropic: any;
let GoogleGenerativeAI: any;
try {
  const openaiModule = require('openai');
  OpenAI = openaiModule.OpenAI || openaiModule.default || openaiModule;
} catch (e) {
  // OpenAI not available
}
try {
  const anthropicModule = require('@anthropic-ai/sdk');
  Anthropic = anthropicModule.Anthropic || anthropicModule.default || anthropicModule;
} catch (e) {
  // Anthropic not available
}
try {
  const googleModule = require('@google/generative-ai');
  GoogleGenerativeAI = googleModule.GoogleGenerativeAI || googleModule.default || googleModule;
} catch (e) {
  // Google Generative AI not available
}

// AI Provider Types
export type AIProvider = 'openai' | 'anthropic' | 'google' | 'local';

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  apiBaseUrl?: string;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: number;
  metadata?: Record<string, unknown>;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  provider: AIProvider;
  finishReason?: string;
  latency?: number;
}

export interface AIStreamResponse {
  content: string;
  done: boolean;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Abstract AI Model Interface
export abstract class AIModelInterface {
  protected config: AIModelConfig;

  constructor(config: AIModelConfig) {
    this.config = config;
  }

  abstract chat(messages: AIMessage[]): Promise<AIResponse>;
  abstract chatStream(messages: AIMessage[]): AsyncIterable<AIStreamResponse>;
  abstract validateConfig(): boolean;
  abstract getCapabilities(): string[];
}

// OpenAI Implementation
export class OpenAIModel extends AIModelInterface {
  private client: unknown;

  constructor(config: AIModelConfig) {
    super(config);
    if (OpenAI) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        // Allow browser environment for testing
        dangerouslyAllowBrowser: process.env.NODE_ENV === 'test',
      });
    }
  }

  async chat(messages: AIMessage[]): Promise<AIResponse> {
    const startTime = Date.now();
    const openaiClient = this.client as any;
    
    try {
      const completion = await openaiClient.chat.completions.create({
        model: this.config.model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: this.config.temperature ?? 0.7,
        max_tokens: this.config.maxTokens ?? 1000,
        top_p: this.config.topP,
        frequency_penalty: this.config.frequencyPenalty,
        presence_penalty: this.config.presencePenalty,
      });

      const latency = Date.now() - startTime;

      return {
        content: completion.choices[0]?.message?.content || '',
        usage: completion.usage ? {
          promptTokens: completion.usage.prompt_tokens,
          completionTokens: completion.usage.completion_tokens,
          totalTokens: completion.usage.total_tokens,
        } : undefined,
        model: completion.model,
        provider: 'openai',
        finishReason: completion.choices[0]?.finish_reason,
        latency,
      };
    } catch (error) {
      throw new Error(`OpenAI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async *chatStream(messages: AIMessage[]): AsyncIterable<AIStreamResponse> {
    const openaiClient = this.client as any;
    try {
      const stream = await openaiClient.chat.completions.create({
        model: this.config.model,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content,
        })),
        temperature: this.config.temperature ?? 0.7,
        max_tokens: this.config.maxTokens ?? 1000,
        stream: true,
      });

      let fullContent = '';
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        fullContent += content;

        yield {
          content,
          done: false,
        };
      }

      yield {
        content: '',
        done: true,
      };
    } catch (error) {
      throw new Error(`OpenAI streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  validateConfig(): boolean {
    return !!(process.env.OPENAI_API_KEY && this.config.model);
  }

  getCapabilities(): string[] {
    return ['chat', 'streaming', 'function-calling', 'embeddings'];
  }
}

// Anthropic Implementation
export class AnthropicModel extends AIModelInterface {
  private client: unknown;

  constructor(config: AIModelConfig) {
    super(config);
    if (Anthropic) {
      this.client = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  async chat(messages: AIMessage[]): Promise<AIResponse> {
    const startTime = Date.now();
    const anthropicClient = this.client as any;
    
    try {
      const systemMessage = messages.find(msg => msg.role === 'system');
      const conversationMessages = messages.filter(msg => msg.role !== 'system');

      const response = await anthropicClient.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens ?? 1000,
        temperature: this.config.temperature ?? 0.7,
        system: systemMessage?.content,
        messages: conversationMessages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      });

      const latency = Date.now() - startTime;

      return {
        content: response.content[0]?.type === 'text' ? response.content[0].text : '',
        usage: response.usage ? {
          promptTokens: response.usage.input_tokens,
          completionTokens: response.usage.output_tokens,
          totalTokens: response.usage.input_tokens + response.usage.output_tokens,
        } : undefined,
        model: response.model,
        provider: 'anthropic',
        finishReason: response.stop_reason,
        latency,
      };
    } catch (error) {
      throw new Error(`Anthropic API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async *chatStream(messages: AIMessage[]): AsyncIterable<AIStreamResponse> {
    const anthropicClient = this.client as any;
    try {
      const systemMessage = messages.find(msg => msg.role === 'system');
      const conversationMessages = messages.filter(msg => msg.role !== 'system');

      const stream = await anthropicClient.messages.create({
        model: this.config.model,
        max_tokens: this.config.maxTokens ?? 1000,
        temperature: this.config.temperature ?? 0.7,
        system: systemMessage?.content,
        messages: conversationMessages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        stream: true,
      });

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          yield {
            content: chunk.delta.text,
            done: false,
          };
        }
      }

      yield {
        content: '',
        done: true,
      };
    } catch (error) {
      throw new Error(`Anthropic streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  validateConfig(): boolean {
    return !!(process.env.ANTHROPIC_API_KEY && this.config.model);
  }

  getCapabilities(): string[] {
    return ['chat', 'streaming', 'long-context'];
  }
}

// Google Gemini Model Implementation
export class GoogleModel extends AIModelInterface {
  private client: any;

  constructor(config: AIModelConfig) {
    super(config);
    if (!GoogleGenerativeAI) {
      throw new Error('Google Generative AI package not installed. Please install @google/generative-ai');
    }
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY environment variable is required for Google AI');
    }
    this.client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }

  async chat(messages: AIMessage[]): Promise<AIResponse> {
    try {
      const startTime = Date.now();
      
      const model = this.client.getGenerativeModel({ 
        model: this.config.model,
        generationConfig: {
          temperature: this.config.temperature ?? 0.7,
          maxOutputTokens: this.config.maxTokens ?? 1000,
          topP: this.config.topP,
        }
      });

      const systemMessage = messages.find(msg => msg.role === 'system');
      const conversationMessages = messages.filter(msg => msg.role !== 'system');

      // Format messages for Google AI
      const history = conversationMessages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const currentMessage = conversationMessages[conversationMessages.length - 1];
      if (!currentMessage) {
        throw new Error('No user message provided');
      }

      const chat = model.startChat({
        history,
        systemInstruction: systemMessage?.content,
      });

      const result = await chat.sendMessage(currentMessage.content);
      const response = await result.response;
      const text = response.text();

      const latency = Date.now() - startTime;

      return {
        content: text,
        usage: response.usageMetadata ? {
          promptTokens: response.usageMetadata.promptTokenCount,
          completionTokens: response.usageMetadata.candidatesTokenCount,
          totalTokens: response.usageMetadata.totalTokenCount,
        } : undefined,
        model: this.config.model,
        provider: 'google',
        finishReason: response.candidates?.[0]?.finishReason || 'stop',
        latency,
      };
    } catch (error) {
      throw new Error(`Google AI API error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async *chatStream(messages: AIMessage[]): AsyncIterable<AIStreamResponse> {
    try {
      const model = this.client.getGenerativeModel({ 
        model: this.config.model,
        generationConfig: {
          temperature: this.config.temperature ?? 0.7,
          maxOutputTokens: this.config.maxTokens ?? 1000,
          topP: this.config.topP,
        }
      });

      const systemMessage = messages.find(msg => msg.role === 'system');
      const conversationMessages = messages.filter(msg => msg.role !== 'system');

      const history = conversationMessages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));

      const currentMessage = conversationMessages[conversationMessages.length - 1];
      if (!currentMessage) {
        throw new Error('No user message provided');
      }

      const chat = model.startChat({
        history,
        systemInstruction: systemMessage?.content,
      });

      const result = await chat.sendMessageStream(currentMessage.content);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          yield {
            content: chunkText,
            done: false,
          };
        }
      }

      yield {
        content: '',
        done: true,
      };
    } catch (error) {
      throw new Error(`Google AI streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  validateConfig(): boolean {
    return !!(process.env.GOOGLE_API_KEY && this.config.model);
  }

  getCapabilities(): string[] {
    return ['chat', 'streaming', 'multimodal', 'long-context'];
  }
}

// Ollama Local Model Implementation
export class LocalModel extends AIModelInterface {
  private baseUrl: string;
  private client: any;

  constructor(config: AIModelConfig) {
    super(config);
    this.baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.client = require('axios').create({
      baseURL: this.baseUrl,
      timeout: 60000,
    });
  }

  async chat(messages: AIMessage[]): Promise<AIResponse> {
    const startMs = Date.now();
    
    try {
      const response = await this.client.post('/api/generate', {
        model: this.config.model,
        prompt: this.formatMessagesForOllama(messages),
        stream: false,
        options: {
          temperature: this.config.temperature || 0.7,
          num_predict: this.config.maxTokens || 1000,
        },
      });

      const latency = Date.now() - startMs;

      return {
        content: response.data.response,
        usage: {
          promptTokens: response.data.prompt_eval_count || 0,
          completionTokens: response.data.eval_count || 0,
          totalTokens: (response.data.prompt_eval_count || 0) + (response.data.eval_count || 0),
        },
        model: this.config.model,
        provider: 'local',
        finishReason: response.data.done ? 'stop' : 'length',
        latency,
      };
    } catch (error) {
      throw new Error(`Ollama chat error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async *chatStream(messages: AIMessage[]): AsyncIterable<AIStreamResponse> {
    try {
      const response = await this.client.post('/api/generate', {
        model: this.config.model,
        prompt: this.formatMessagesForOllama(messages),
        stream: true,
        options: {
          temperature: this.config.temperature || 0.7,
          num_predict: this.config.maxTokens || 1000,
        },
      }, {
        responseType: 'stream',
      });

      for await (const chunk of response.data) {
        const line = chunk.toString().trim();
        if (line) {
          try {
            const data = JSON.parse(line);
            if (data.response) {
              yield {
                content: data.response,
                done: data.done || false,
              };
            }
            if (data.done) {
              yield {
                content: '',
                done: true,
              };
              break;
            }
          } catch (e) {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    } catch (error) {
      throw new Error(`Ollama streaming error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private formatMessagesForOllama(messages: AIMessage[]): string {
    return messages
      .map(msg => {
        const role = msg.role === 'assistant' ? 'Assistant' : 'User';
        return `${role}: ${msg.content}`;
      })
      .join('\n\n') + '\n\nAssistant: ';
  }

  validateConfig(): boolean {
    return !!(this.config.model && this.baseUrl);
  }

  getCapabilities(): string[] {
    return ['chat', 'streaming', 'local', 'custom-models'];
  }

  async listModels(): Promise<string[]> {
    try {
      const response = await this.client.get('/api/tags');
      return response.data.models?.map((model: any) => model.name) || [];
    } catch (error) {
      logger.error('Failed to fetch Ollama models:', asError(error));
      return [];
    }
  }

  async pullModel(modelName: string): Promise<boolean> {
    try {
      await this.client.post('/api/pull', { name: modelName });
      return true;
    } catch (error) {
      logger.error(`Failed to pull model ${modelName}:`, asError(error));
      return false;
    }
  }
}

// Local Model Implementation with Ollama integration
export class LocalModelOld extends AIModelInterface {
  private ollamaBaseUrl: string;
  private modelName: string;

  constructor(config: AIModelConfig) {
    super(config);
    this.ollamaBaseUrl = config.apiBaseUrl || 'http://localhost:11434';
    this.modelName = config.model || 'llama2';
  }

  async chat(messages: AIMessage[]): Promise<AIResponse> {
    try {
      const startTime = Date.now();
      
      // Format messages for Ollama API
      const ollamaMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch(`${this.ollamaBaseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: ollamaMessages,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const latency = Date.now() - startTime;

      return {
        content: data.message?.content || 'No response generated',
        usage: {
          promptTokens: this.estimateTokens(messages.map(m => m.content).join(' ')),
          completionTokens: this.estimateTokens(data.message?.content || ''),
          totalTokens: 0, // Will be calculated below
        },
        model: this.modelName,
        provider: 'local',
        finishReason: 'stop',
        latency,
      };
    } catch (error: any) {
      logger.error('[LocalModel] Error generating response:', error);
      // Fallback to basic response if Ollama is not available
      return {
        content: `Local model error: ${error.message}. Please ensure Ollama is running and the model is available.`,
        usage: {
          promptTokens: this.estimateTokens(messages.map(m => m.content).join(' ')),
          completionTokens: 15,
          totalTokens: 0,
        },
        model: this.modelName,
        provider: 'local',
        finishReason: 'error',
        latency: 100,
      };
    }
  }

  async *chatStream(messages: AIMessage[]): AsyncIterable<AIStreamResponse> {
    try {
      // Format messages for Ollama API
      const ollamaMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      const response = await fetch(`${this.ollamaBaseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.modelName,
          messages: ollamaMessages,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body available');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line);
              if (data.message?.content) {
                yield {
                  content: data.message.content,
                  done: false,
                };
              }
              if (data.done) {
                yield {
                  content: '',
                  done: true,
                };
                return;
              }
            } catch (e) {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (error: any) {
      logger.error('[LocalModel] Error streaming response:', error);
      // Fallback error message
      yield {
        content: `Local model streaming error: ${error.message}. Please ensure Ollama is running.`,
        done: true,
      };
    }
  }

  validateConfig(): boolean {
    return !!this.config.model;
  }

  getCapabilities(): string[] {
    return ['chat', 'streaming', 'offline', 'private'];
  }

  private estimateTokens(text: string): number {
    // Simple token estimation (roughly 4 characters per token)
    return Math.ceil(text.length / 4);
  }
}

// AI Model Factory
export class AIModelFactory {
  static createModel(config: AIModelConfig): AIModelInterface {
    switch (config.provider) {
      case 'openai':
        return new OpenAIModel(config);
      case 'anthropic':
        return new AnthropicModel(config);
      case 'google':
        return new GoogleModel(config);
      case 'local':
        return new LocalModel(config);
      default:
        throw new Error(`Unsupported AI provider: ${config.provider}`);
    }
  }

  static getAvailableModels(): Record<AIProvider, string[]> {
    return {
      openai: [
        'gpt-3.5-turbo',
        'gpt-4',
        'gpt-4-turbo',
        'gpt-4o',
        'gpt-4o-mini',
      ],
      anthropic: [
        'claude-3-haiku-20240307',
        'claude-3-sonnet-20240229',
        'claude-3-opus-20240229',
      ],
      google: [
        'gemini-1.5-pro',
        'gemini-1.5-flash',
        'gemini-1.5-flash-8b',
        'gemini-1.0-pro',
        'gemini-pro-vision',
        'gemini-2.0-flash-exp',
        'gemini-exp-1206',
      ],
      local: [
        'llama-2-7b',
        'llama-2-13b',
        'llama-2-70b',
        'llama-3-8b',
        'llama-3-70b',
        'llama-3.1-8b',
        'llama-3.1-70b',
        'llama-3.2-1b',
        'llama-3.2-3b',
        'codellama-7b',
        'codellama-13b',
        'codellama-34b',
        'mistral-7b',
        'mixtral-8x7b',
        'mixtral-8x22b',
        'qwen-7b',
        'qwen-14b',
        'qwen-72b',
        'qwen2.5-7b',
        'qwen2.5-14b',
        'qwen2.5-32b',
        'qwen2.5-72b',
        'phi-2',
        'phi-3-mini',
        'phi-3.5-mini',
        'gemma-2b',
        'gemma-7b',
        'gemma2-9b',
        'gemma2-27b',
        'nous-hermes-2-mistral-7b-dpo',
        'starling-lm-7b-beta',
        'deepseek-coder-6.7b',
        'deepseek-coder-33b',
        'command-r',
        'command-r-plus',
      ],
    };
  }

  static validateProviderConfig(provider: AIProvider): boolean {
    switch (provider) {
      case 'openai':
        return !!process.env.OPENAI_API_KEY;
      case 'anthropic':
        return !!process.env.ANTHROPIC_API_KEY;
      case 'google':
        return !!process.env.GOOGLE_API_KEY;
      case 'local':
        return !!(process.env.OLLAMA_BASE_URL || process.env.LOCAL_MODEL_URL);
      default:
        return false;
    }
  }
}

// AI Service Manager
export class AIServiceManager {
  private models: Map<string, AIModelInterface> = new Map();
  private defaultConfig: AIModelConfig;

  constructor(defaultConfig: AIModelConfig) {
    this.defaultConfig = defaultConfig;
  }

  getModel(modelId?: string): AIModelInterface {
    const key = modelId || 'default';
    
    if (!this.models.has(key)) {
      const config = modelId ? { ...this.defaultConfig, model: modelId } : this.defaultConfig;
      const model = AIModelFactory.createModel(config);
      
      if (!model.validateConfig()) {
        throw new Error(`Invalid configuration for model: ${modelId || 'default'}`);
      }
      
      this.models.set(key, model);
    }
    
    return this.models.get(key)!;
  }

  async chat(messages: AIMessage[], modelId?: string): Promise<AIResponse> {
    const model = this.getModel(modelId);
    return model.chat(messages);
  }

  async *chatStream(messages: AIMessage[], modelId?: string): AsyncIterable<AIStreamResponse> {
    const model = this.getModel(modelId);
    yield* model.chatStream(messages);
  }

  updateDefaultConfig(config: Partial<AIModelConfig>): void {
    this.defaultConfig = { ...this.defaultConfig, ...config };
    // Clear cached models to force re-initialization with new config
    this.models.clear();
  }

  getProviderStatus(): Record<AIProvider, boolean> {
    return {
      openai: AIModelFactory.validateProviderConfig('openai'),
      anthropic: AIModelFactory.validateProviderConfig('anthropic'),
      google: AIModelFactory.validateProviderConfig('google'),
      local: AIModelFactory.validateProviderConfig('local'),
    };
  }

  clearCache(): void {
    this.models.clear();
  }
}

// Default AI Service Instance
export const aiService = new AIServiceManager({
  provider: 'openai',
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: 1000,
});

// Utility Functions
export function createAIMessage(role: AIMessage['role'], content: string, metadata?: Record<string, any>): AIMessage {
  return {
    role,
    content,
    timestamp: Date.now(),
    metadata,
  };
}

export function formatConversationHistory(messages: AIMessage[]): string {
  return messages
    .map(msg => `[${msg.role.toUpperCase()}]: ${msg.content}`)
    .join('\n');
}

export function estimateTokenCount(text: string): number {
  // Rough estimation: ~4 characters per token
  return Math.ceil(text.length / 4);
}

export function validateAIMessages(messages: AIMessage[]): boolean {
  if (!Array.isArray(messages) || messages.length === 0) {
    return false;
  }

  return messages.every(msg => 
    typeof msg.content === 'string' && 
    msg.content.length > 0 &&
    ['system', 'user', 'assistant'].includes(msg.role)
  );
}
