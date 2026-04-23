import { AIProvider, AIProviderConfig, AIModelInfo } from './ai-provider-interface';
import { OpenAIProvider } from './providers/openai-provider';
import { AnthropicProvider } from './providers/anthropic-provider';
import { GoogleProvider } from './providers/google-provider';
import { logger } from '../production-logger';

export interface ProviderRegistration {
  provider: AIProvider;
  config: AIProviderConfig;
  isDefault: boolean;
  priority: number;
}

export class AIProviderRegistry {
  private providers = new Map<string, ProviderRegistration>();
  private defaultProvider?: string;

  constructor() {
    this.initializeDefaultProviders();
  }

  private initializeDefaultProviders(): void {
    // Initialize providers from environment variables
    if (process.env.OPENAI_API_KEY) {
      this.register('openai', new OpenAIProvider({
        name: 'OpenAI',
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL,
      }), false, 1);
    }

    if (process.env.ANTHROPIC_API_KEY) {
      this.register('anthropic', new AnthropicProvider({
        name: 'Anthropic',
        apiKey: process.env.ANTHROPIC_API_KEY,
        baseURL: process.env.ANTHROPIC_BASE_URL,
      }), false, 2);
    }

    if (process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY) {
      this.register('gemini', new GoogleProvider({
        name: 'Google Gemini',
        apiKey: process.env.GOOGLE_GEMINI_API_KEY || process.env.GOOGLE_API_KEY!,
        baseURL: process.env.GEMINI_BASE_URL,
      }), false, 3);
    }

    // Register additional AI providers if API keys are available
    if (process.env.GROQ_API_KEY) {
      this.register('groq', new OpenAIProvider({
        name: 'Groq',
        apiKey: process.env.GROQ_API_KEY,
        baseURL: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
      }), false, 4);
    }

    if (process.env.COHERE_API_KEY) {
      this.register('cohere', new OpenAIProvider({
        name: 'Cohere',
        apiKey: process.env.COHERE_API_KEY,
        baseURL: process.env.COHERE_BASE_URL || 'https://api.cohere.ai/v1',
      }), false, 5);
    }

    if (process.env.MISTRAL_API_KEY) {
      this.register('mistral', new OpenAIProvider({
        name: 'Mistral AI',
        apiKey: process.env.MISTRAL_API_KEY,
        baseURL: process.env.MISTRAL_BASE_URL || 'https://api.mistral.ai/v1',
      }), false, 6);
    }

    if (process.env.PERPLEXITY_API_KEY) {
      this.register('perplexity', new OpenAIProvider({
        name: 'Perplexity',
        apiKey: process.env.PERPLEXITY_API_KEY,
        baseURL: process.env.PERPLEXITY_BASE_URL || 'https://api.perplexity.ai',
      }), false, 7);
    }

    if (process.env.AZURE_OPENAI_API_KEY) {
      this.register('azure-openai', new OpenAIProvider({
        name: 'Azure OpenAI',
        apiKey: process.env.AZURE_OPENAI_API_KEY,
        baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
        customHeaders: {
          'api-key': process.env.AZURE_OPENAI_API_KEY,
        },
      }), false, 8);
    }

    // Set default provider based on environment variable or priority
    const defaultFromEnv = process.env.AI_DEFAULT_PROVIDER;
    if (defaultFromEnv && this.providers.has(defaultFromEnv)) {
      this.setDefault(defaultFromEnv);
    } else if (this.providers.size > 0) {
      // Set the highest priority provider as default
      const sortedProviders = Array.from(this.providers.entries())
        .sort(([, a], [, b]) => a.priority - b.priority);
      this.setDefault(sortedProviders[0][0]);
    }
  }

  register(
    id: string, 
    provider: AIProvider, 
    isDefault = false, 
    priority = 999
  ): void {
    this.providers.set(id, {
      provider,
      config: {
        name: provider.name,
        apiKey: '', // Will be set when configuring
      },
      isDefault,
      priority,
    });

    if (isDefault || !this.defaultProvider) {
      this.defaultProvider = id;
    }
  }

  unregister(id: string): void {
    this.providers.delete(id);
    if (this.defaultProvider === id) {
      // Set new default to highest priority provider
      const sortedProviders = Array.from(this.providers.entries())
        .sort(([, a], [, b]) => a.priority - b.priority);
      this.defaultProvider = sortedProviders.length > 0 ? sortedProviders[0][0] : undefined;
    }
  }

  setDefault(id: string): void {
    if (!this.providers.has(id)) {
      throw new Error(`Provider ${id} is not registered`);
    }
    
    // Remove default flag from all providers
    for (const [key, registration] of this.providers.entries()) {
      registration.isDefault = key === id;
    }
    
    this.defaultProvider = id;
  }

  getProvider(id?: string): AIProvider | undefined {
    const providerId = id || this.defaultProvider;
    if (!providerId) {
      return undefined;
    }
    
    return this.providers.get(providerId)?.provider;
  }

  getDefaultProvider(): AIProvider | undefined {
    return this.getProvider();
  }

  getAllProviders(): Map<string, AIProvider> {
    const result = new Map<string, AIProvider>();
    for (const [id, registration] of this.providers.entries()) {
      result.set(id, registration.provider);
    }
    return result;
  }

  getAvailableProviders(): Promise<Map<string, AIProvider>> {
    return new Promise(async (resolve) => {
      const available = new Map<string, AIProvider>();
      
      for (const [id, registration] of this.providers.entries()) {
        try {
          const isAvailable = await registration.provider.isAvailable();
          if (isAvailable) {
            available.set(id, registration.provider);
          }
        } catch (error) {
          logger.warn(`Provider ${id} availability check failed`, { error });
        }
      }
      
      resolve(available);
    });
  }

  async getAllModels(): Promise<AIModelInfo[]> {
    const allModels: AIModelInfo[] = [];
    const availableProviders = await this.getAvailableProviders();
    
    for (const [id, provider] of availableProviders.entries()) {
      try {
        const models = await provider.getModels();
        allModels.push(...models);
      } catch (error) {
        logger.warn(`Failed to fetch models from provider ${id}`, { error });
      }
    }
    
    return allModels;
  }

  async getBestModelForTask(
    task: 'chat' | 'embedding' | 'vision' | 'long-context',
    budgetConstraint?: 'low' | 'medium' | 'high'
  ): Promise<AIModelInfo | null> {
    const allModels = await this.getAllModels();
    
    // Filter by task type
    const taskModels = allModels.filter(model => 
      model.type === task || model.capabilities.includes(task)
    );
    
    if (taskModels.length === 0) {
      return null;
    }
    
    // Sort by budget constraint
    const sortedModels = taskModels.sort((a, b) => {
      if (!budgetConstraint) {
        return b.contextWindow - a.contextWindow; // Prefer larger context
      }
      
      const costA = a.inputCostPer1K + a.outputCostPer1K;
      const costB = b.inputCostPer1K + b.outputCostPer1K;
      
      switch (budgetConstraint) {
        case 'low':
          return costA - costB; // Cheapest first
        case 'medium':
          return Math.abs(costA - 0.01) - Math.abs(costB - 0.01); // Closest to medium price
        case 'high':
          return b.contextWindow - a.contextWindow; // Best performance
        default:
          return 0;
      }
    });
    
    return sortedModels[0];
  }

  getProviderInfo(): {
    id: string;
    name: string;
    type: string;
    isDefault: boolean;
    priority: number;
    capabilities: string[];
    isAvailable: Promise<boolean>;
  }[] {
    return Array.from(this.providers.entries()).map(([id, registration]) => ({
      id,
      name: registration.provider.name,
      type: registration.provider.type,
      isDefault: registration.isDefault,
      priority: registration.priority,
      capabilities: registration.provider.getCapabilities(),
      isAvailable: registration.provider.isAvailable(),
    }));
  }

  // Fallback mechanism
  async getProviderWithFallback(preferredIds?: string[]): Promise<AIProvider | null> {
    const providerIds = preferredIds || [this.defaultProvider].filter(Boolean) as string[];
    
    // Try preferred providers in order
    for (const id of providerIds) {
      if (this.providers.has(id)) {
        const provider = this.providers.get(id)!.provider;
        if (await provider.isAvailable()) {
          return provider;
        }
      }
    }
    
    // Fall back to any available provider
    const availableProviders = await this.getAvailableProviders();
    if (availableProviders.size > 0) {
      return availableProviders.values().next().value || null;
    }
    
    return null;
  }
}

// Global registry instance
export const aiProviderRegistry = new AIProviderRegistry();
