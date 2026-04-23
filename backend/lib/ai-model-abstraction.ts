/**
 * AI Model Abstraction Layer
 * Provides a unified interface for different AI models and providers
 */

import { logger } from './production-logger';

export interface AIModelConfig {
  provider: 'openai' | 'anthropic' | 'google' | 'local' | 'custom';
  model: string;
  apiKey?: string;
  endpoint?: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface AIModelResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  provider: string;
  latency?: number;
  metadata?: Record<string, any>;
}

export interface AIModelRequest {
  prompt: string;
  context?: string;
  systemPrompt?: string;
  conversationHistory?: { role: 'user' | 'assistant'; content: string }[];
  tools?: {
    name: string;
    description: string;
    parameters: Record<string, any>;
  }[];
  stream?: boolean;
}

export abstract class BaseAIModel {
  protected config: AIModelConfig;

  constructor(config: AIModelConfig) {
    this.config = config;
  }

  abstract generateResponse(request: AIModelRequest): Promise<AIModelResponse>;
  abstract generateStream(request: AIModelRequest): AsyncIterable<AIModelResponse>;
  abstract validateConfig(): boolean;
  abstract estimateTokens(text: string): number;

  protected measureLatency<T>(operation: () => Promise<T>): Promise<{ result: T; latency: number }> {
    const startTime = Date.now();
    return operation().then(result => ({
      result,
      latency: Date.now() - startTime
    }));
  }
}

export class OpenAIModel extends BaseAIModel {
  private client: any; // OpenAI client

  constructor(config: AIModelConfig) {
    super(config);
    this.initializeClient();
  }

  private initializeClient() {
    // Initialize OpenAI client
    // This would be replaced with actual OpenAI SDK initialization
    this.client = {
      chat: {
        completions: {
          create: async (params: any) => {
            // Mock implementation - replace with actual OpenAI API call
            return {
              choices: [{
                message: { content: `OpenAI response to: ${params.messages[params.messages.length - 1]?.content}` }
              }],
              usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 }
            };
          }
        }
      }
    };
  }

  async generateResponse(request: AIModelRequest): Promise<AIModelResponse> {
    const { result, latency } = await this.measureLatency(async () => {
      const messages = [];
      
      if (request.systemPrompt) {
        messages.push({ role: 'system' as const, content: request.systemPrompt });
      }
      
      if (request.conversationHistory) {
        messages.push(...request.conversationHistory);
      }
      
      messages.push({ role: 'user' as const, content: request.prompt });

      const response = await this.client.chat.completions.create({
        model: this.config.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        top_p: this.config.topP,
        frequency_penalty: this.config.frequencyPenalty,
        presence_penalty: this.config.presencePenalty,
      });

      return response;
    });

    return {
      content: result.choices[0].message.content,
      usage: {
        promptTokens: result.usage.prompt_tokens,
        completionTokens: result.usage.completion_tokens,
        totalTokens: result.usage.total_tokens,
      },
      model: this.config.model,
      provider: this.config.provider,
      latency,
    };
  }

  async* generateStream(request: AIModelRequest): AsyncIterable<AIModelResponse> {
    // Streaming implementation would go here
    yield {
      content: `Streaming response to: ${request.prompt}`,
      model: this.config.model,
      provider: this.config.provider,
    };
  }

  validateConfig(): boolean {
    return !!(this.config.apiKey && this.config.model);
  }

  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
}

export class AnthropicModel extends BaseAIModel {
  private client: any; // Anthropic client

  constructor(config: AIModelConfig) {
    super(config);
    this.initializeClient();
  }

  private initializeClient() {
    // Initialize Anthropic client
    this.client = {
      messages: {
        create: async (params: any) => {
          // Mock implementation - replace with actual Anthropic API call
          return {
            content: [{ text: `Anthropic response to: ${params.messages[params.messages.length - 1]?.content}` }],
            usage: { input_tokens: 10, output_tokens: 20 }
          };
        }
      }
    };
  }

  async generateResponse(request: AIModelRequest): Promise<AIModelResponse> {
    const { result, latency } = await this.measureLatency(async () => {
      const messages = [];
      
      if (request.conversationHistory) {
        messages.push(...request.conversationHistory);
      }
      
      messages.push({ role: 'user' as const, content: request.prompt });

      const response = await this.client.messages.create({
        model: this.config.model,
        messages,
        max_tokens: this.config.maxTokens,
        temperature: this.config.temperature,
        top_p: this.config.topP,
        system: request.systemPrompt,
      });

      return response;
    });

    return {
      content: result.content[0].text,
      usage: {
        promptTokens: result.usage.input_tokens,
        completionTokens: result.usage.output_tokens,
        totalTokens: result.usage.input_tokens + result.usage.output_tokens,
      },
      model: this.config.model,
      provider: this.config.provider,
      latency,
    };
  }

  async* generateStream(request: AIModelRequest): AsyncIterable<AIModelResponse> {
    yield {
      content: `Streaming Anthropic response to: ${request.prompt}`,
      model: this.config.model,
      provider: this.config.provider,
    };
  }

  validateConfig(): boolean {
    return !!(this.config.apiKey && this.config.model);
  }

  estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}

export class GoogleAIModel extends BaseAIModel {
  private client: any; // Google AI client

  constructor(config: AIModelConfig) {
    super(config);
    this.initializeClient();
  }

  private initializeClient() {
    try {
      // Initialize Google AI client
      const { GoogleGenerativeAI } = require('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(this.config.apiKey);
      this.client = genAI.getGenerativeModel({ 
        model: this.config.model || 'gemini-pro' 
      });
      logger.info('[GoogleGemini] Successfully initialized Google AI client');
    } catch (error) {
      logger.warn('[GoogleGemini] Failed to initialize Google AI client, falling back to mock', { error });
      logger.warn('[GoogleGemini] Please install @google/generative-ai package and provide valid API key');
      // Fallback to mock implementation for development/testing
      this.client = {
        generateContent: async (prompt: string) => {
          return {
            response: {
              text: `Google AI response to: ${prompt.slice(-50)}...`,
              usageMetadata: {
                promptTokenCount: 10,
                candidatesTokenCount: 20,
                totalTokenCount: 30
              }
            }
          };
        },
        generateContentStream: async function* (prompt: string) {
          const text = `Streaming Google AI response to: ${prompt.slice(-50)}...`;
          const words = text.split(' ');
          for (const word of words) {
            yield {
              response: {
                text: word + ' '
              }
            };
          }
        }
      };
    }
  }

  async generateResponse(request: AIModelRequest): Promise<AIModelResponse> {
    const { result, latency } = await this.measureLatency(async () => {
      let prompt = '';
      
      if (request.systemPrompt) {
        prompt += `System: ${request.systemPrompt}\n\n`;
      }
      
      if (request.conversationHistory) {
        for (const msg of request.conversationHistory) {
          prompt += `${msg.role}: ${msg.content}\n`;
        }
      }
      
      prompt += `user: ${request.prompt}`;

      const response = await this.client.generateContent(prompt);

      return response;
    });

    return {
      content: result.response.text(),
      usage: {
        promptTokens: result.response.usageMetadata?.promptTokenCount || 0,
        completionTokens: result.response.usageMetadata?.candidatesTokenCount || 0,
        totalTokens: result.response.usageMetadata?.totalTokenCount || 0,
      },
      model: this.config.model,
      provider: this.config.provider,
      latency,
    };
  }

  async* generateStream(request: AIModelRequest): AsyncIterable<AIModelResponse> {
    let prompt = '';
    
    if (request.systemPrompt) {
      prompt += `System: ${request.systemPrompt}\n\n`;
    }
    
    if (request.conversationHistory) {
      for (const msg of request.conversationHistory) {
        prompt += `${msg.role}: ${msg.content}\n`;
      }
    }
    
    prompt += `user: ${request.prompt}`;

    const result = await this.client.generateContentStream(prompt);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        yield {
          content: chunkText,
          usage: {
            promptTokens: 0,
            completionTokens: 0,
            totalTokens: 0,
          },
          model: this.config.model,
          provider: this.config.provider,
          latency: 0,
        };
      }
    }
  }

  validateConfig(): boolean {
    return !!this.config.apiKey;
  }

  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for Gemini
    return Math.ceil(text.length / 4);
  }
}

export class OllamaModel extends BaseAIModel {
  private client: any; // Ollama client
  private baseUrl: string;

  constructor(config: AIModelConfig) {
    super(config);
    this.baseUrl = config.endpoint || 'http://localhost:11434';
    this.initializeClient();
  }

  private initializeClient() {
    try {
      // Initialize Ollama client with actual HTTP connection
      const axios = require('axios');
      this.client = {
        post: async (endpoint: string, data: any) => {
          const url = `${this.baseUrl}${endpoint}`;
          const response = await axios.post(url, data, {
            timeout: 30000,
            headers: {
              'Content-Type': 'application/json'
            }
          });
          return response;
        },
        postStream: async function* (endpoint: string, data: any) {
          const url = `${this.baseUrl}${endpoint}`;
          const { default: fetch } = await import('node-fetch');
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (!response.body) {
            throw new Error('No response body for streaming');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n').filter(line => line.trim());

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const data = JSON.parse(line.slice(6));
                    yield { data };
                  } catch (e) {
                    // Skip invalid JSON lines
                  }
                }
              }
            }
          } finally {
            reader.releaseLock();
          }
        }
      };
    } catch (error) {
      logger.warn('[Ollama] Failed to initialize Ollama client, falling back to mock', { error });
      // Fallback to mock implementation for development/testing
      this.client = {
        post: async (endpoint: string, data: any) => {
          // Mock implementation - replace with actual Ollama API call
          return {
            data: {
              response: `Ollama ${this.config.model} response to: ${data.prompt?.slice(-50)}...`,
              done: true,
              total_duration: 1000000,
              load_duration: 500000,
              prompt_eval_count: 10,
              prompt_eval_duration: 200000,
              eval_count: 20,
              eval_duration: 300000
            }
          };
        },
        postStream: async function* (endpoint: string, data: any) {
          // Mock streaming implementation
          const text = `Streaming Ollama ${this.config.model} response to: ${data.prompt?.slice(-50)}...`;
          const words = text.split(' ');
          for (const word of words) {
            yield {
              data: {
                response: word + ' ',
                done: false
              }
            };
          }
          yield {
            data: {
              response: '',
              done: true,
              total_duration: 1000000,
              prompt_eval_count: 10,
              eval_count: 20
            }
          };
        }
      };
    }
  }

  async generateResponse(request: AIModelRequest): Promise<AIModelResponse> {
    const { result, latency } = await this.measureLatency(async () => {
      let prompt = '';
      
      if (request.systemPrompt) {
        prompt += `System: ${request.systemPrompt}\n\n`;
      }
      
      if (request.conversationHistory) {
        for (const msg of request.conversationHistory) {
          prompt += `${msg.role === 'assistant' ? 'Assistant' : 'User'}: ${msg.content}\n\n`;
        }
      }
      
      prompt += `User: ${request.prompt}`;
      prompt += `\n\nAssistant:`;

      const response = await this.client.post('/api/generate', {
        model: this.config.model,
        prompt,
        options: {
          temperature: this.config.temperature,
          top_p: this.config.topP,
          num_predict: this.config.maxTokens,
        }
      });

      return response;
    });

    return {
      content: result.data.response,
      usage: {
        promptTokens: result.data.prompt_eval_count || 0,
        completionTokens: result.data.eval_count || 0,
        totalTokens: (result.data.prompt_eval_count || 0) + (result.data.eval_count || 0),
      },
      model: this.config.model,
      provider: this.config.provider,
      latency,
    };
  }

  async* generateStream(request: AIModelRequest): AsyncIterable<AIModelResponse> {
    let prompt = '';
    
    if (request.systemPrompt) {
      prompt += `System: ${request.systemPrompt}\n\n`;
    }
    
    if (request.conversationHistory) {
      for (const msg of request.conversationHistory) {
        prompt += `${msg.role === 'assistant' ? 'Assistant' : 'User'}: ${msg.content}\n\n`;
      }
    }
    
    prompt += `User: ${request.prompt}`;
    prompt += `\n\nAssistant:`;

    const response = await this.client.post('/api/generate', {
      model: this.config.model,
      prompt,
      options: {
        temperature: this.config.temperature,
        top_p: this.config.topP,
        num_predict: this.config.maxTokens,
      },
      stream: true
    }, {
      responseType: 'stream'
    });

    let accumulatedText = '';
    const stream = response.data;
    
    for await (const chunk of stream) {
      const lines = chunk.toString().split('\n').filter(line => line.trim());
      for (const line of lines) {
        try {
          const data = JSON.parse(line);
          if (data.response) {
            accumulatedText += data.response;
          }
          
          yield {
            content: accumulatedText,
            usage: {
              promptTokens: 0,
              completionTokens: 0,
              totalTokens: 0,
            },
            model: this.config.model,
            provider: this.config.provider,
            latency: 0,
          };
          
          if (data.done) {
            break;
          }
        } catch (e) {
          // Skip invalid JSON lines
        }
      }
    }
  }

  validateConfig(): boolean {
    return !!(this.config.model && this.baseUrl);
  }

  estimateTokens(text: string): number {
    // Rough estimation: ~4 characters per token for most local models
    return Math.ceil(text.length / 4);
  }
}

export class CustomModel extends BaseAIModel {
  private client: any; // Custom model client
  private customHandler?: (request: AIModelRequest) => Promise<AIModelResponse>;

  constructor(config: AIModelConfig) {
    super(config);
    this.initializeClient();
  }

  private initializeClient() {
    // Initialize custom model client
    // This allows for custom model implementations
    this.client = {
      predict: async (params: any) => {
        // Mock implementation - replace with actual custom model API call
        return {
          prediction: `Custom model ${this.config.model} response to: ${params.input}`,
          confidence: 0.95,
          latency: 150,
          metadata: {
            model_version: '1.0.0',
            framework: 'custom'
          }
        };
      }
    };

    // Allow custom handler injection
    if (this.config.endpoint && this.config.endpoint.startsWith('function:')) {
      const functionName = this.config.endpoint.replace('function:', '');
      // In a real implementation, this would dynamically load the function
      // For now, we'll just log it
      logger.info(`[CustomModel] Would load custom function`, { functionName });
    }
  }

  setCustomHandler(handler: (request: AIModelRequest) => Promise<AIModelResponse>): void {
    this.customHandler = handler;
  }

  async generateResponse(request: AIModelRequest): Promise<AIModelResponse> {
    // Use custom handler if available
    if (this.customHandler) {
      const { result, latency } = await this.measureLatency(async () => {
        return await this.customHandler!(request);
      });
      
      return {
        ...result,
        latency,
        model: this.config.model,
        provider: this.config.provider,
      };
    }

    // Default implementation using the client
    const { result, latency } = await this.measureLatency(async () => {
      let input = '';
      
      if (request.systemPrompt) {
        input += `System: ${request.systemPrompt}\n\n`;
      }
      
      if (request.conversationHistory) {
        for (const msg of request.conversationHistory) {
          input += `${msg.role}: ${msg.content}\n\n`;
        }
      }
      
      input += `User: ${request.prompt}`;

      const response = await this.client.predict({
        input,
        model: this.config.model,
        parameters: {
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens,
          top_p: this.config.topP,
        }
      });

      return { response, input };
    });

    return {
      content: result.response.prediction,
      usage: {
        promptTokens: this.estimateTokens(result.input),
        completionTokens: this.estimateTokens(result.response.prediction),
        totalTokens: this.estimateTokens(result.input) + this.estimateTokens(result.response.prediction),
      },
      model: this.config.model,
      provider: this.config.provider,
      latency,
      metadata: {
        confidence: result.response.confidence,
        ...result.response.metadata
      }
    };
  }

  async* generateStream(request: AIModelRequest): AsyncIterable<AIModelResponse> {
    // Use custom handler if available for streaming
    if (this.customHandler) {
      const result = await this.customHandler(request);
      yield result;
      return;
    }

    // Default streaming implementation
    let input = '';
    
    if (request.systemPrompt) {
      input += `System: ${request.systemPrompt}\n\n`;
    }
    
    if (request.conversationHistory) {
      for (const msg of request.conversationHistory) {
        input += `${msg.role}: ${msg.content}\n\n`;
      }
    }
    
    input += `User: ${request.prompt}`;

    const stream = this.client.postStream('/api/generate', {
      model: this.config.model,
      prompt: input,
      options: {
        temperature: this.config.temperature,
        top_p: this.config.topP,
        num_predict: this.config.maxTokens,
      },
      stream: true
    });

    let accumulatedText = '';
    for await (const chunk of stream) {
      if (chunk.data.response) {
        accumulatedText += chunk.data.response;
      }
      
      yield {
        content: accumulatedText,
        model: this.config.model,
        provider: this.config.provider,
        metadata: { 
          chunk: chunk.data.response,
          done: chunk.data.done 
        }
      };
      
      if (chunk.data.done) {
        break;
      }
    }
  }

  validateConfig(): boolean {
    // Custom models are more flexible - they just need a model name
    return !!this.config.model;
  }

  estimateTokens(text: string): number {
    // Custom token estimation - can be overridden per model
    return Math.ceil(text.length / 4);
  }

  // Additional methods for custom model management
  async loadModel(): Promise<void> {
    logger.info(`[CustomModel] Loading model`, { model: this.config.model });
    // In a real implementation, this would load the model into memory
  }

  async unloadModel(): Promise<void> {
    logger.info(`[CustomModel] Unloading model`, { model: this.config.model });
    // In a real implementation, this would unload the model from memory
  }

  getModelInfo(): { name: string; version: string; capabilities: string[] } {
    return {
      name: this.config.model,
      version: '1.0.0',
      capabilities: ['text-generation', 'streaming', 'custom-logic']
    };
  }
}

export class AIModelFactory {
  static createModel(config: AIModelConfig): BaseAIModel {
    switch (config.provider) {
      case 'openai':
        return new OpenAIModel(config);
      case 'anthropic':
        return new AnthropicModel(config);
      case 'google':
        return new GoogleAIModel(config);
      case 'local':
        return new OllamaModel(config);
      case 'custom':
        return new CustomModel(config);
      default:
        throw new Error(`Unsupported provider: ${config.provider}`);
    }
  }

  static getAvailableProviders(): string[] {
    return ['openai', 'anthropic', 'google', 'local', 'custom'];
  }

  static getModelsForProvider(provider: string): string[] {
    switch (provider) {
      case 'openai':
        return ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo', 'gpt-3.5-turbo-16k'];
      case 'anthropic':
        return ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
      case 'google':
        return ['gemini-pro', 'gemini-pro-vision'];
      case 'local':
        return ['llama2', 'codellama', 'mistral'];
      case 'custom':
        return ['custom-model'];
      default:
        return [];
    }
  }
}

export class AIModelManager {
  private models: Map<string, BaseAIModel> = new Map();
  private defaultModel: string | null = null;

  registerModel(name: string, config: AIModelConfig): void {
    const model = AIModelFactory.createModel(config);
    if (!model.validateConfig()) {
      throw new Error(`Invalid configuration for model: ${name}`);
    }
    this.models.set(name, model);
    
    if (!this.defaultModel) {
      this.defaultModel = name;
    }
  }

  getModel(name?: string): BaseAIModel {
    const modelName = name || this.defaultModel;
    if (!modelName) {
      throw new Error('No model specified and no default model available');
    }
    
    const model = this.models.get(modelName);
    if (!model) {
      throw new Error(`Model not found: ${modelName}`);
    }
    
    return model;
  }

  setDefaultModel(name: string): void {
    if (!this.models.has(name)) {
      throw new Error(`Model not found: ${name}`);
    }
    this.defaultModel = name;
  }

  listModels(): string[] {
    return Array.from(this.models.keys());
  }

  async generateResponse(request: AIModelRequest, modelName?: string): Promise<AIModelResponse> {
    const model = this.getModel(modelName);
    return model.generateResponse(request);
  }

  async* generateStream(request: AIModelRequest, modelName?: string): AsyncIterable<AIModelResponse> {
    const model = this.getModel(modelName);
    yield* model.generateStream(request);
  }

  estimateTokens(text: string, modelName?: string): number {
    const model = this.getModel(modelName);
    return model.estimateTokens(text);
  }
}

// Global AI model manager instance
export const aiModelManager = new AIModelManager();

// Default configurations for common use cases
export const DEFAULT_CONFIGS = {
  chat: {
    provider: 'openai' as const,
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1000,
  },
  code: {
    provider: 'openai' as const,
    model: 'gpt-4',
    temperature: 0.1,
    maxTokens: 2000,
  },
  creative: {
    provider: 'anthropic' as const,
    model: 'claude-3-opus-20240229',
    temperature: 0.9,
    maxTokens: 1500,
  },
  analysis: {
    provider: 'anthropic' as const,
    model: 'claude-3-sonnet-20240229',
    temperature: 0.3,
    maxTokens: 1000,
  },
};
