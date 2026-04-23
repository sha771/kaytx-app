import { z } from 'zod';

// Common AI provider interfaces for abstraction

export interface AIChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: Record<string, any>;
}

export interface AIChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stopSequences?: string[];
  stream?: boolean;
}

export interface AIChatResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason?: string;
  metadata?: Record<string, any>;
}

export interface AIEmbeddingOptions {
  model?: string;
  dimensions?: number;
}

export interface AIEmbeddingResponse {
  embedding: number[];
  model: string;
  usage?: {
    promptTokens: number;
    totalTokens: number;
  };
}

export interface AIModelInfo {
  id: string;
  name: string;
  provider: string;
  type: 'chat' | 'completion' | 'embedding' | 'image';
  contextWindow: number;
  maxOutputTokens: number;
  inputCostPer1K: number;
  outputCostPer1K: number;
  capabilities: string[];
}

export interface AIProviderConfig {
  name: string;
  apiKey: string;
  baseURL?: string;
  timeout?: number;
  retryAttempts?: number;
  customHeaders?: Record<string, string>;
}

export interface AIProvider {
  name: string;
  type: 'openai' | 'anthropic' | 'google' | 'cohere' | 'local' | 'custom';
  
  // Core methods
  chat(messages: AIChatMessage[], options?: AIChatOptions): Promise<AIChatResponse>;
  getModels(): Promise<AIModelInfo[]>;
  
  // Optional methods
  embedding?(text: string, options?: AIEmbeddingOptions): Promise<AIEmbeddingResponse>;
  streamChat?(messages: AIChatMessage[], options?: AIChatOptions): AsyncIterable<AIChatResponse>;
  
  // Provider info
  isAvailable(): Promise<boolean>;
  getCapabilities(): string[];
}

// Validation schemas
export const aiChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
  metadata: z.record(z.any()).optional(),
});

export const aiChatOptionsSchema = z.object({
  model: z.string().optional(),
  temperature: z.number().min(0).max(2).optional(),
  maxTokens: z.number().positive().optional(),
  topP: z.number().min(0).max(1).optional(),
  frequencyPenalty: z.number().min(-2).max(2).optional(),
  presencePenalty: z.number().min(-2).max(2).optional(),
  stopSequences: z.array(z.string()).optional(),
  stream: z.boolean().optional(),
});

export const aiModelInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  provider: z.string(),
  type: z.enum(['chat', 'completion', 'embedding', 'image']),
  contextWindow: z.number().positive(),
  maxOutputTokens: z.number().positive(),
  inputCostPer1K: z.number().nonnegative(),
  outputCostPer1K: z.number().nonnegative(),
  capabilities: z.array(z.string()),
});

export type ValidatedAIChatMessage = z.infer<typeof aiChatMessageSchema>;
export type ValidatedAIChatOptions = z.infer<typeof aiChatOptionsSchema>;
export type ValidatedAIModelInfo = z.infer<typeof aiModelInfoSchema>;
