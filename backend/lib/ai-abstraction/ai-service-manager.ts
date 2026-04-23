import { 
  AIProvider, 
  AIChatMessage, 
  AIChatOptions, 
  AIChatResponse, 
  AIEmbeddingOptions,
  AIEmbeddingResponse,
  AIModelInfo 
} from './ai-provider-interface';
import { aiProviderRegistry } from './ai-provider-registry';
import { logger } from '../production-logger';

export interface AIServiceConfig {
  defaultProvider?: string;
  fallbackProviders?: string[];
  enableCaching?: boolean;
  cacheTTL?: number;
  retryAttempts?: number;
  timeout?: number;
}

export class AIServiceManager {
  private config: AIServiceConfig;
  private cache = new Map<string, { data: any; timestamp: number }>();

  constructor(config: AIServiceConfig = {}) {
    this.config = {
      enableCaching: true,
      cacheTTL: 300000, // 5 minutes
      retryAttempts: 3,
      timeout: 30000, // 30 seconds
      ...config,
    };
  }

  async chat(
    messages: AIChatMessage[], 
    options: AIChatOptions & { providerId?: string } = {}
  ): Promise<AIChatResponse> {
    const cacheKey = this.getCacheKey('chat', messages, options);
    
    if (this.config.enableCaching) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const provider = await this.getProviderForRequest(options.providerId);
    if (!provider) {
      throw new Error('No AI provider available');
    }

    try {
      const response = await this.executeWithRetry(
        () => provider.chat(messages, options),
        provider
      );

      if (this.config.enableCaching) {
        this.setCache(cacheKey, response);
      }

      return response;
    } catch (error) {
      // Try fallback providers
      if (this.config.fallbackProviders && this.config.fallbackProviders.length > 0) {
        for (const fallbackId of this.config.fallbackProviders) {
          const fallbackProvider = aiProviderRegistry.getProvider(fallbackId);
          if (fallbackProvider && await fallbackProvider.isAvailable()) {
            try {
              const response = await this.executeWithRetry(
                () => fallbackProvider.chat(messages, options),
                fallbackProvider
              );

              if (this.config.enableCaching) {
                this.setCache(cacheKey, response);
              }

              return response;
            } catch (fallbackError) {
              logger.warn(`Fallback provider ${fallbackId} failed`, { error: fallbackError });
            }
          }
        }
      }
      
      throw error;
    }
  }

  async streamChat(
    messages: AIChatMessage[], 
    options: AIChatOptions & { providerId?: string } = {}
  ): Promise<AsyncIterable<AIChatResponse>> {
    const provider = await this.getProviderForRequest(options.providerId);
    if (!provider) {
      throw new Error('No AI provider available');
    }

    if (!provider.streamChat) {
      throw new Error('Provider does not support streaming');
    }

    return provider.streamChat(messages, options);
  }

  async embedding(
    text: string, 
    options: AIEmbeddingOptions & { providerId?: string } = {}
  ): Promise<AIEmbeddingResponse> {
    const cacheKey = this.getCacheKey('embedding', [text], options);
    
    if (this.config.enableCaching) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const provider = await this.getProviderForRequest(options.providerId);
    if (!provider || !provider.embedding) {
      throw new Error('No AI provider with embedding support available');
    }

    try {
      const response = await this.executeWithRetry(
        () => provider.embedding!(text, options),
        provider
      );

      if (this.config.enableCaching) {
        this.setCache(cacheKey, response);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getModels(providerId?: string): Promise<AIModelInfo[]> {
    if (providerId) {
      const provider = aiProviderRegistry.getProvider(providerId);
      if (!provider) {
        throw new Error(`Provider ${providerId} not found`);
      }
      return provider.getModels();
    }

    return aiProviderRegistry.getAllModels();
  }

  async getBestModelForTask(
    task: 'chat' | 'embedding' | 'vision' | 'long-context',
    budgetConstraint?: 'low' | 'medium' | 'high'
  ): Promise<AIModelInfo | null> {
    return aiProviderRegistry.getBestModelForTask(task, budgetConstraint);
  }

  async getAvailableProviders(): Promise<{
    id: string;
    name: string;
    type: string;
    isDefault: boolean;
    capabilities: string[];
  }[]> {
    const availableProviders = await aiProviderRegistry.getAvailableProviders();
    const providerInfo = aiProviderRegistry.getProviderInfo();
    
    return providerInfo
      .filter(info => availableProviders.has(info.id))
      .map(info => ({
        id: info.id,
        name: info.name,
        type: info.type,
        isDefault: info.isDefault,
        capabilities: info.capabilities,
      }));
  }

  private async getProviderForRequest(preferredId?: string): Promise<AIProvider | null> {
    if (preferredId) {
      const provider = aiProviderRegistry.getProvider(preferredId);
      if (provider && await provider.isAvailable()) {
        return provider;
      }
    }

    return aiProviderRegistry.getProviderWithFallback(this.config.fallbackProviders);
  }

  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    provider: AIProvider
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= (this.config.retryAttempts || 1); attempt++) {
      try {
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Operation timeout')), this.config.timeout);
        });

        return await Promise.race([operation(), timeoutPromise]);
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < (this.config.retryAttempts || 1)) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000); // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  private getCacheKey(operation: string, inputs: any[], options: any): string {
    const key = {
      operation,
      inputs,
      options,
    };
    return Buffer.from(JSON.stringify(key)).toString('base64');
  }

  private getFromCache(key: string): any | null {
    if (!this.config.enableCaching) return null;
    
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp > (this.config.cacheTTL || 300000)) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  private setCache(key: string, data: any): void {
    if (!this.config.enableCaching) return;
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Default instance
export const aiServiceManager = new AIServiceManager();
