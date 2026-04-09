import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { 
  AIModelManager, 
  OpenAIModel, 
  AnthropicModel, 
  GoogleModel, 
  LocalModel,
  AIProvider,
  AIModelConfig,
  AIMessage,
  AIResponse
} from '../../../lib/ai-model-abstraction';

// Mock the dynamic imports
jest.mock('openai', () => ({
  default: jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn()
      }
    }
  }))
}));

jest.mock('@anthropic-ai/sdk', () => ({
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn()
    }
  }))
}));

jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn()
    })
  }))
}));

jest.mock('axios', () => ({
  create: jest.fn().mockReturnValue({
    get: jest.fn(),
    post: jest.fn()
  })
}));

describe('AI Model Abstraction', () => {
  let aiManager: AIModelManager;

  beforeEach(() => {
    jest.clearAllMocks();
    aiManager = new AIModelManager();
  });

  describe('AIModelManager', () => {
    describe('createModel', () => {
      it('should create OpenAI model successfully', () => {
        const config: AIModelConfig = {
          provider: 'openai',
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 2000
        };

        const model = aiManager.createModel(config);
        expect(model).toBeInstanceOf(OpenAIModel);
        expect(model.validateConfig()).toBe(true);
      });

      it('should create Anthropic model successfully', () => {
        const config: AIModelConfig = {
          provider: 'anthropic',
          model: 'claude-3-sonnet-20240229',
          temperature: 0.5,
          maxTokens: 4000
        };

        const model = aiManager.createModel(config);
        expect(model).toBeInstanceOf(AnthropicModel);
        expect(model.validateConfig()).toBe(true);
      });

      it('should create Google model successfully', () => {
        const config: AIModelConfig = {
          provider: 'google',
          model: 'gemini-1.5-pro',
          temperature: 0.8,
          maxTokens: 3000
        };

        const model = aiManager.createModel(config);
        expect(model).toBeInstanceOf(GoogleModel);
        expect(model.validateConfig()).toBe(true);
      });

      it('should create Local model successfully', () => {
        const config: AIModelConfig = {
          provider: 'local',
          model: 'llama-3-8b',
          temperature: 0.6,
          maxTokens: 1500
        };

        const model = aiManager.createModel(config);
        expect(model).toBeInstanceOf(LocalModel);
        expect(model.validateConfig()).toBe(true);
      });

      it('should throw error for unsupported provider', () => {
        const config: AIModelConfig = {
          provider: 'unsupported' as AIProvider,
          model: 'test-model',
          temperature: 0.7,
          maxTokens: 2000
        };

        expect(() => aiManager.createModel(config)).toThrow('Unsupported AI provider: unsupported');
      });
    });

    describe('getProviderStatus', () => {
      it('should return provider status correctly', () => {
        // Set environment variables for testing
        process.env.OPENAI_API_KEY = 'test-openai-key';
        process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
        process.env.GOOGLE_API_KEY = 'test-google-key';
        process.env.OLLAMA_BASE_URL = 'http://localhost:11434';

        const status = aiManager.getProviderStatus();

        expect(status.openai).toBe(true);
        expect(status.anthropic).toBe(true);
        expect(status.google).toBe(true);
        expect(status.local).toBe(true);

        // Clean up
        delete process.env.OPENAI_API_KEY;
        delete process.env.ANTHROPIC_API_KEY;
        delete process.env.GOOGLE_API_KEY;
        delete process.env.OLLAMA_BASE_URL;
      });

      it('should return false for missing API keys', () => {
        // Ensure no API keys are set
        delete process.env.OPENAI_API_KEY;
        delete process.env.ANTHROPIC_API_KEY;
        delete process.env.GOOGLE_API_KEY;
        delete process.env.OLLAMA_BASE_URL;

        const status = aiManager.getProviderStatus();

        expect(status.openai).toBe(false);
        expect(status.anthropic).toBe(false);
        expect(status.google).toBe(false);
        expect(status.local).toBe(false);
      });
    });

    describe('getAvailableModels', () => {
      it('should return all available models', () => {
        const models = aiManager.getAvailableModels();

        expect(models.openai).toContain('gpt-4');
        expect(models.openai).toContain('gpt-4-turbo');
        expect(models.openai).toContain('gpt-3.5-turbo');

        expect(models.anthropic).toContain('claude-3-opus-20240229');
        expect(models.anthropic).toContain('claude-3-sonnet-20240229');
        expect(models.anthropic).toContain('claude-3-haiku-20240307');

        expect(models.google).toContain('gemini-1.5-pro');
        expect(models.google).toContain('gemini-1.5-flash');
        expect(models.google).toContain('gemini-2.0-flash-exp');

        expect(models.local).toContain('llama-3-8b');
        expect(models.local).toContain('mixtral-8x7b');
        expect(models.local).toContain('qwen2.5-7b');
      });
    });

    describe('validateProviderConfig', () => {
      it('should validate OpenAI config', () => {
        process.env.OPENAI_API_KEY = 'test-key';
        expect(aiManager.validateProviderConfig('openai')).toBe(true);
        delete process.env.OPENAI_API_KEY;
        expect(aiManager.validateProviderConfig('openai')).toBe(false);
      });

      it('should validate Anthropic config', () => {
        process.env.ANTHROPIC_API_KEY = 'test-key';
        expect(aiManager.validateProviderConfig('anthropic')).toBe(true);
        delete process.env.ANTHROPIC_API_KEY;
        expect(aiManager.validateProviderConfig('anthropic')).toBe(false);
      });

      it('should validate Google config', () => {
        process.env.GOOGLE_API_KEY = 'test-key';
        expect(aiManager.validateProviderConfig('google')).toBe(true);
        delete process.env.GOOGLE_API_KEY;
        expect(aiManager.validateProviderConfig('google')).toBe(false);
      });

      it('should validate Local config', () => {
        process.env.OLLAMA_BASE_URL = 'http://localhost:11434';
        expect(aiManager.validateProviderConfig('local')).toBe(true);
        delete process.env.OLLAMA_BASE_URL;
        expect(aiManager.validateProviderConfig('local')).toBe(false);
      });
    });
  });

  describe('OpenAIModel', () => {
    let openaiModel: OpenAIModel;
    const config: AIModelConfig = {
      provider: 'openai',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000
    };

    beforeEach(() => {
      openaiModel = new OpenAIModel(config);
      process.env.OPENAI_API_KEY = 'test-key';
    });

    afterEach(() => {
      delete process.env.OPENAI_API_KEY;
    });

    describe('validateConfig', () => {
      it('should validate correct config', () => {
        expect(openaiModel.validateConfig()).toBe(true);
      });

      it('should invalidate config without API key', () => {
        delete process.env.OPENAI_API_KEY;
        expect(openaiModel.validateConfig()).toBe(false);
      });
    });

    describe('chat', () => {
      it('should send chat request successfully', async () => {
        const mockCompletion = {
          choices: [{
            message: {
              content: 'Hello! How can I help you?',
              role: 'assistant'
            }
          }],
          usage: {
            prompt_tokens: 10,
            completion_tokens: 15,
            total_tokens: 25
          },
          model: 'gpt-4'
        };

        const mockCreate = jest.fn().mockResolvedValue(mockCompletion);
        (openaiModel as any).client.chat.completions.create = mockCreate;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        const result = await openaiModel.chat(messages);

        expect(result.content).toBe('Hello! How can I help you?');
        expect(result.usage).toEqual({
          promptTokens: 10,
          completionTokens: 15,
          totalTokens: 25
        });
        expect(result.model).toBe('gpt-4');
        expect(result.provider).toBe('openai');
        expect(mockCreate).toHaveBeenCalledWith({
          model: 'gpt-4',
          messages: [{ role: 'user', content: 'Hello' }],
          temperature: 0.7,
          max_tokens: 2000
        });
      });

      it('should handle API errors', async () => {
        const mockCreate = jest.fn().mockRejectedValue(new Error('API Error'));
        (openaiModel as any).client.chat.completions.create = mockCreate;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        await expect(openaiModel.chat(messages)).rejects.toThrow('OpenAI chat error: API Error');
      });
    });

    describe('chatStream', () => {
      it('should stream chat response', async () => {
        const mockStream = {
          async *[Symbol.asyncIterator]() {
            yield { choices: [{ delta: { content: 'Hello' } }] };
            yield { choices: [{ delta: { content: '!' } }] };
            yield { choices: [{ delta: { content: ' How' } }] };
            yield { choices: [{ delta: { content: ' can' } }] };
            yield { choices: [{ delta: { content: ' I' } }] };
            yield { choices: [{ delta: { content: ' help?' } }] };
          }
        };

        const mockCreate = jest.fn().mockResolvedValue(mockStream);
        (openaiModel as any).client.chat.completions.create = mockCreate;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        const chunks = [];
        for await (const chunk of openaiModel.chatStream(messages)) {
          chunks.push(chunk);
        }

        expect(chunks).toHaveLength(6);
        expect(chunks[0].content).toBe('Hello');
        expect(chunks[chunks.length - 1].content).toBe(' help?');
        expect(chunks[chunks.length - 1].done).toBe(true);
      });
    });

    describe('getCapabilities', () => {
      it('should return OpenAI capabilities', () => {
        const capabilities = openaiModel.getCapabilities();
        expect(capabilities).toContain('chat');
        expect(capabilities).toContain('streaming');
        expect(capabilities).toContain('function-calling');
        expect(capabilities).toContain('vision');
      });
    });
  });

  describe('AnthropicModel', () => {
    let anthropicModel: AnthropicModel;
    const config: AIModelConfig = {
      provider: 'anthropic',
      model: 'claude-3-sonnet-20240229',
      temperature: 0.5,
      maxTokens: 4000
    };

    beforeEach(() => {
      anthropicModel = new AnthropicModel(config);
      process.env.ANTHROPIC_API_KEY = 'test-key';
    });

    afterEach(() => {
      delete process.env.ANTHROPIC_API_KEY;
    });

    describe('validateConfig', () => {
      it('should validate correct config', () => {
        expect(anthropicModel.validateConfig()).toBe(true);
      });

      it('should invalidate config without API key', () => {
        delete process.env.ANTHROPIC_API_KEY;
        expect(anthropicModel.validateConfig()).toBe(false);
      });
    });

    describe('chat', () => {
      it('should send chat request successfully', async () => {
        const mockMessage = {
          content: [
            { type: 'text', text: 'Hello! How can I help you?' }
          ],
          usage: {
            input_tokens: 10,
            output_tokens: 15
          }
        };

        const mockCreate = jest.fn().mockResolvedValue(mockMessage);
        (anthropicModel as any).client.messages.create = mockCreate;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        const result = await anthropicModel.chat(messages);

        expect(result.content).toBe('Hello! How can I help you?');
        expect(result.usage).toEqual({
          promptTokens: 10,
          completionTokens: 15,
          totalTokens: 25
        });
        expect(result.model).toBe('claude-3-sonnet-20240229');
        expect(result.provider).toBe('anthropic');
      });
    });

    describe('getCapabilities', () => {
      it('should return Anthropic capabilities', () => {
        const capabilities = anthropicModel.getCapabilities();
        expect(capabilities).toContain('chat');
        expect(capabilities).toContain('streaming');
        expect(capabilities).toContain('vision');
        expect(capabilities).toContain('long-context');
      });
    });
  });

  describe('GoogleModel', () => {
    let googleModel: GoogleModel;
    const config: AIModelConfig = {
      provider: 'google',
      model: 'gemini-1.5-pro',
      temperature: 0.8,
      maxTokens: 3000
    };

    beforeEach(() => {
      googleModel = new GoogleModel(config);
      process.env.GOOGLE_API_KEY = 'test-key';
    });

    afterEach(() => {
      delete process.env.GOOGLE_API_KEY;
    });

    describe('validateConfig', () => {
      it('should validate correct config', () => {
        expect(googleModel.validateConfig()).toBe(true);
      });

      it('should invalidate config without API key', () => {
        delete process.env.GOOGLE_API_KEY;
        expect(googleModel.validateConfig()).toBe(false);
      });
    });

    describe('chat', () => {
      it('should send chat request successfully', async () => {
        const mockResponse = {
          response: {
            text: 'Hello! How can I help you today?'
          },
          usageMetadata: {
            promptTokenCount: 10,
            candidatesTokenCount: 15,
            totalTokenCount: 25
          }
        };

        const mockGenerate = jest.fn().mockResolvedValue(mockResponse);
        (googleModel as any).client.getGenerativeModel().generateContent = mockGenerate;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        const result = await googleModel.chat(messages);

        expect(result.content).toBe('Hello! How can I help you today?');
        expect(result.usage).toEqual({
          promptTokens: 10,
          completionTokens: 15,
          totalTokens: 25
        });
        expect(result.model).toBe('gemini-1.5-pro');
        expect(result.provider).toBe('google');
      });
    });

    describe('getCapabilities', () => {
      it('should return Google capabilities', () => {
        const capabilities = googleModel.getCapabilities();
        expect(capabilities).toContain('chat');
        expect(capabilities).toContain('streaming');
        expect(capabilities).toContain('vision');
        expect(capabilities).toContain('multimodal');
      });
    });
  });

  describe('LocalModel', () => {
    let localModel: LocalModel;
    const config: AIModelConfig = {
      provider: 'local',
      model: 'llama-3-8b',
      temperature: 0.6,
      maxTokens: 1500
    };

    beforeEach(() => {
      localModel = new LocalModel(config);
      process.env.OLLAMA_BASE_URL = 'http://localhost:11434';
    });

    afterEach(() => {
      delete process.env.OLLAMA_BASE_URL;
    });

    describe('validateConfig', () => {
      it('should validate correct config', () => {
        expect(localModel.validateConfig()).toBe(true);
      });

      it('should invalidate config without Ollama URL', () => {
        delete process.env.OLLAMA_BASE_URL;
        expect(localModel.validateConfig()).toBe(false);
      });
    });

    describe('chat', () => {
      it('should send chat request to Ollama successfully', async () => {
        const mockResponse = {
          data: {
            model: 'llama-3-8b',
            created_at: '2024-01-15T10:00:00Z',
            response: 'Hello! How can I help you?',
            done: true,
            total_duration: 1234567890,
            load: [1.2, 1.1, 0.9],
            prompt_eval_count: 10,
            eval_count: 15
          }
        };

        const mockPost = jest.fn().mockResolvedValue(mockResponse);
        (localModel as any).client.post = mockPost;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        const result = await localModel.chat(messages);

        expect(result.content).toBe('Hello! How can I help you?');
        expect(result.model).toBe('llama-3-8b');
        expect(result.provider).toBe('local');
        expect(mockPost).toHaveBeenCalledWith('/api/generate', {
          model: 'llama-3-8b',
          prompt: 'user: Hello\nassistant:',
          stream: false,
          options: {
            temperature: 0.6,
            top_p: 1,
            num_predict: 1500
          }
        });
      });

      it('should handle Ollama errors', async () => {
        const mockPost = jest.fn().mockRejectedValue(new Error('Ollama not available'));
        (localModel as any).client.post = mockPost;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        await expect(localModel.chat(messages)).rejects.toThrow('Ollama chat error: Ollama not available');
      });
    });

    describe('chatStream', () => {
      it('should stream chat response from Ollama', async () => {
        const mockStream = {
          data: 'Hello',
          done: false
        };

        const mockPost = jest.fn()
          .mockResolvedValueOnce({ data: { model: 'llama-3-8b' } }) // First call for model info
          .mockResolvedValueOnce(mockStream); // Second call for stream

        (localModel as any).client.get = jest.fn().mockResolvedValue({ data: { models: [] } });
        (localModel as any).client.post = mockPost;

        const messages: AIMessage[] = [
          { role: 'user', content: 'Hello' }
        ];

        const chunks = [];
        for await (const chunk of localModel.chatStream(messages)) {
          chunks.push(chunk);
        }

        expect(chunks[0].content).toBe('Hello');
        expect(chunks[0].done).toBe(false);
      });
    });

    describe('getCapabilities', () => {
      it('should return Local model capabilities', () => {
        const capabilities = localModel.getCapabilities();
        expect(capabilities).toContain('chat');
        expect(capabilities).toContain('streaming');
        expect(capabilities).toContain('offline');
        expect(capabilities).toContain('customizable');
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing dependencies gracefully', () => {
      // Mock missing OpenAI
      jest.doMock('openai', () => {
        throw new Error('Module not found');
      }, { virtual: true });

      const config: AIModelConfig = {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000
      };

      expect(() => aiManager.createModel(config)).toThrow();
    });

    it('should handle invalid model configurations', () => {
      const invalidConfig = {
        provider: 'openai' as AIProvider,
        model: '', // Empty model name
        temperature: -1, // Invalid temperature
        maxTokens: -1000 // Invalid max tokens
      };

      const model = aiManager.createModel(invalidConfig);
      expect(model.validateConfig()).toBe(false);
    });

    it('should handle network timeouts', async () => {
      const config: AIModelConfig = {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000
      };

      const model = aiManager.createModel(config);
      process.env.OPENAI_API_KEY = 'test-key';

      const mockCreate = jest.fn().mockRejectedValue(new Error('ETIMEDOUT'));
      (model as any).client.chat.completions.create = mockCreate;

      const messages: AIMessage[] = [
        { role: 'user', content: 'Hello' }
      ];

      await expect(model.chat(messages)).rejects.toThrow('OpenAI chat error: ETIMEDOUT');

      delete process.env.OPENAI_API_KEY;
    });
  });

  describe('Utility Functions', () => {
    it('should create AIMessage correctly', () => {
      const { createAIMessage } = require('../../../services/ai/ai-model-abstraction');

      const message = createAIMessage('user', 'Hello, world!', { timestamp: Date.now() });

      expect(message.role).toBe('user');
      expect(message.content).toBe('Hello, world!');
      expect(message.metadata).toEqual({ timestamp: expect.any(Number) });
    });

    it('should handle message validation', () => {
      const { createAIMessage } = require('../../../services/ai/ai-model-abstraction');

      expect(() => {
        createAIMessage('invalid' as any, 'test');
      }).toThrow('Invalid message role: invalid');
    });
  });

  describe('Model Configuration', () => {
    it('should handle all configuration options', () => {
      const config: AIModelConfig = {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        topP: 0.9,
        frequencyPenalty: 0.5,
        presencePenalty: 0.3
      };

      const model = aiManager.createModel(config);
      expect(model).toBeDefined();
      expect(model.validateConfig()).toBe(true);
    });

    it('should handle optional parameters', () => {
      const config: AIModelConfig = {
        provider: 'openai',
        model: 'gpt-4'
        // temperature, maxTokens, etc. should have defaults
      };

      const model = aiManager.createModel(config);
      expect(model).toBeDefined();
    });
  });

  describe('Streaming', () => {
    it('should handle streaming errors gracefully', async () => {
      const config: AIModelConfig = {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000
      };

      const model = aiManager.createModel(config);
      process.env.OPENAI_API_KEY = 'test-key';

      const mockStream = {
        async *[Symbol.asyncIterator]() {
          yield { choices: [{ delta: { content: 'Hello' } }] };
          throw new Error('Stream interrupted');
        }
      };

      const mockCreate = jest.fn().mockResolvedValue(mockStream);
      (model as any).client.chat.completions.create = mockCreate;

      const messages: AIMessage[] = [
        { role: 'user', content: 'Hello' }
      ];

      const chunks = [];
      let errorThrown = false;

      try {
        for await (const chunk of model.chatStream(messages)) {
          chunks.push(chunk);
        }
      } catch (error) {
        errorThrown = true;
      }

      expect(chunks).toHaveLength(1);
      expect(errorThrown).toBe(true);

      delete process.env.OPENAI_API_KEY;
    });
  });
});
