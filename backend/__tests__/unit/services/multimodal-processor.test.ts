/**
 * Multimodal Processor Service Tests
 * Tests for the multimodal-processor service
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MultimodalProcessor } from '../../../services/multimodal-processor';

describe('MultimodalProcessor', () => {
  let processor: MultimodalProcessor;

  beforeEach(() => {
    vi.clearAllMocks();
    processor = new MultimodalProcessor({
      openaiApiKey: 'test-openai-key',
      anthropicApiKey: 'test-anthropic-key',
      googleApiKey: 'test-google-key',
      defaultProvider: 'openai',
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with provided configuration', () => {
      expect(processor).toBeDefined();
      expect(processor).toBeInstanceOf(MultimodalProcessor);
    });

    it('should set default provider when not specified', () => {
      const defaultProcessor = new MultimodalProcessor({
        openaiApiKey: 'test-key',
      });
      expect(defaultProcessor).toBeDefined();
    });
  });

  describe('processText', () => {
    it('should process text input successfully', async () => {
      const result = await processor.processText('Hello, world!', {
        maxTokens: 100,
        temperature: 0.7,
      });
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });

    it('should handle empty text input', async () => {
      const result = await processor.processText('', {
        maxTokens: 50,
      });
      
      expect(result).toBeDefined();
    });
  });

  describe('processImage', () => {
    it('should process image input', async () => {
      const imageBuffer = Buffer.from('test-image-data');
      
      const result = await processor.processImage(imageBuffer, {
        detailLevel: 'high',
      });
      
      expect(result).toBeDefined();
      expect(result.content).toBeDefined();
    });
  });

  describe('processAudio', () => {
    it('should process audio input', async () => {
      const audioBuffer = Buffer.from('test-audio-data');
      
      const result = await processor.processAudio(audioBuffer, {
        language: 'en',
        format: 'text',
      });
      
      expect(result).toBeDefined();
    });
  });

  describe('processVideo', () => {
    it('should process video input', async () => {
      const videoBuffer = Buffer.from('test-video-data');
      
      const result = await processor.processVideo(videoBuffer, {
        fps: 1,
        maxDuration: 60,
      });
      
      expect(result).toBeDefined();
    });
  });

  describe('analyzeDocument', () => {
    it('should analyze document content', async () => {
      const documentContent = `
        # Title
        This is a test document.
        It has multiple lines.
        And some **bold** text.
      `;
      
      const result = await processor.analyzeDocument(documentContent, {
        extractImages: true,
        extractTables: true,
        summary: true,
      });
      
      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
    });
  });

  describe('transcribeAudio', () => {
    it('should transcribe audio to text', async () => {
      const audioBuffer = Buffer.from('audio-data');
      
      const result = await processor.transcribeAudio(audioBuffer, {
        language: 'en',
        includeTimestamps: true,
      });
      
      expect(result).toBeDefined();
      expect(result.text).toBeDefined();
    });
  });

  describe('translateText', () => {
    it('should translate text between languages', async () => {
      const result = await processor.translateText('Hello', {
        sourceLanguage: 'en',
        targetLanguage: 'es',
      });
      
      expect(result).toBeDefined();
      expect(result.translatedText).toBeDefined();
    });
  });

  describe('generateImage', () => {
    it('should generate image from prompt', async () => {
      const result = await processor.generateImage('A beautiful sunset', {
        size: '1024x1024',
        style: 'natural',
      });
      
      expect(result).toBeDefined();
      expect(result.imageUrl).toBeDefined();
    });
  });

  describe('summarizeContent', () => {
    it('should summarize long content', async () => {
      const longContent = 'word '.repeat(1000);
      
      const result = await processor.summarizeContent(longContent, {
        maxLength: 100,
        style: 'concise',
      });
      
      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
    });
  });

  describe('extractEntities', () => {
    it('should extract named entities from text', async () => {
      const text = 'Apple Inc. was founded by Steve Jobs in Cupertino, California.';
      
      const result = await processor.extractEntities(text, {
        types: ['organization', 'person', 'location'],
      });
      
      expect(result).toBeDefined();
      expect(result.entities).toBeDefined();
    });
  });

  describe('sentimentAnalysis', () => {
    it('should analyze sentiment of text', async () => {
      const text = 'I love this product! It is amazing and works perfectly.';
      
      const result = await processor.sentimentAnalysis(text);
      
      expect(result).toBeDefined();
      expect(result.score).toBeDefined();
      expect(result.label).toBeDefined();
    });
  });

  describe('estimateCost', () => {
    it('should return cost estimation', () => {
      const costs = processor.estimateCost({
        inputType: 'text',
        inputSize: 1000,
        outputType: 'text',
        outputSize: 500,
        provider: 'openai',
      });
      
      expect(costs).toBeDefined();
      expect(costs.totalCost).toBeGreaterThanOrEqual(0);
    });
  });

  describe('switchProvider', () => {
    it('should switch AI provider', async () => {
      await processor.switchProvider('anthropic');
      
      const result = await processor.processText('Test', {});
      expect(result).toBeDefined();
    });
  });

  describe('getProviders', () => {
    it('should return available providers', () => {
      const providers = processor.getProviders();
      
      expect(providers).toContain('openai');
      expect(providers).toContain('anthropic');
      expect(providers).toContain('google');
    });
  });

  describe('healthCheck', () => {
    it('should return health status', async () => {
      const health = await processor.healthCheck();
      
      expect(health).toBeDefined();
      expect(health.status).toBe('healthy' || 'degraded');
    });
  });
});
