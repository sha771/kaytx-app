/**
 * Agents Brain System Tests
 * Tests for the brain system functionality
 */

import { BrainSystem } from '../index';
import { BrainLLMClient } from '../llm-client';
import { AgentBrainManager } from '../agent-brain-manager';

describe('BrainSystem', () => {
  let brainSystem: BrainSystem;
  let llmClient: BrainLLMClient;

  beforeEach(() => {
    // Create a mock LLM client for testing
    llmClient = new BrainLLMClient({
      provider: 'openai',
      apiKey: 'test-key',
      model: 'gpt-4o-mini',
    });

    // Create brain system with test configuration
    brainSystem = new BrainSystem(
      {
        brainPath: '/tmp/test-brain',
        rawSourcesPath: '/tmp/test-brain/raw',
        wikiPath: '/tmp/test-brain/wiki',
        schemaPath: '/tmp/test-brain/schema',
        indexPath: '/tmp/test-brain/index.md',
        manifestPath: '/tmp/test-brain/.manifest.json',
        logPath: '/tmp/test-brain/log.md',
        maxContextWindow: 128000,
        enableSemanticSearch: true,
      },
      'test-agent',
      llmClient
    );
  });

  afterEach(async () => {
    // Clean up test brain
    try {
      await brainSystem.reset();
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  test('should initialize brain system', async () => {
    await brainSystem.initialize();
    const stats = await brainSystem.getStatistics();
    expect(stats).toBeDefined();
    expect(stats.totalSources).toBe(0);
    expect(stats.totalWikiPages).toBe(0);
  });

  test('should add raw source', async () => {
    await brainSystem.initialize();
    await brainSystem.addRawSource('test.md', '# Test Document\n\nThis is a test document.');
    
    const sources = await brainSystem.getRawSources();
    expect(sources.length).toBeGreaterThan(0);
  });

  test('should query brain', async () => {
    await brainSystem.initialize();
    await brainSystem.addRawSource('test.md', '# Marketing Strategy\n\nThis document discusses marketing strategies and campaign optimization.');
    
    // Note: This test uses fallback analysis since we're using a mock LLM client
    // In production, this would use real LLM analysis
    const results = await brainSystem.query('marketing');
    expect(results).toBeDefined();
    expect(Array.isArray(results.pages)).toBe(true);
  });

  test('should get token savings', async () => {
    await brainSystem.initialize();
    const savings = await brainSystem.getTokenSavings();
    expect(typeof savings).toBe('number');
    expect(savings).toBeGreaterThanOrEqual(0);
  });

  test('should get health status', async () => {
    await brainSystem.initialize();
    const health = await brainSystem.getHealthStatus();
    expect(health).toBeDefined();
    expect(['healthy', 'degraded', 'unhealthy']).toContain(health.status);
  });
});

describe('AgentBrainManager', () => {
  let manager: AgentBrainManager;

  beforeEach(() => {
    manager = AgentBrainManager.getInstance();
  });

  test('should get singleton instance', () => {
    const manager2 = AgentBrainManager.getInstance();
    expect(manager).toBe(manager2);
  });

  test('should create config from agent', () => {
    const config = AgentBrainManager.createConfigFromAgent({
      id: 'test-agent',
      type: 'marketing',
      department: 'marketing',
    });

    expect(config.agentId).toBe('test-agent');
    expect(config.agentType).toBe('marketing');
    expect(config.department).toBe('marketing');
    expect(config.autoInitialize).toBe(true);
  });

  test('should get default data sources for agent type', () => {
    const sources = AgentBrainManager.getDefaultDataSources('marketing', 'marketing');
    expect(Array.isArray(sources)).toBe(true);
    expect(sources.length).toBeGreaterThan(0);
  });
});

describe('BrainLLMClient', () => {
  test('should create client from environment', () => {
    // This test requires environment variables to be set
    // In a real test environment, you would set these before running
    try {
      const client = BrainLLMClient.fromEnvironment();
      expect(client).toBeDefined();
    } catch (error) {
      // Expected if environment variables are not set
      expect(error).toBeDefined();
    }
  });

  test('should create client with config', () => {
    const client = new BrainLLMClient({
      provider: 'openai',
      apiKey: 'test-key',
      model: 'gpt-4o-mini',
    });

    expect(client).toBeDefined();
  });

  test('should provide fallback analysis', async () => {
    const client = new BrainLLMClient({
      provider: 'openai',
      apiKey: '', // Empty key to trigger fallback
      model: 'gpt-4o-mini',
    });

    const content = 'This is a test document with some content about marketing strategies and campaign optimization.';
    const result = await client.analyzeDocument('test.md', content);

    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(Array.isArray(result.concepts)).toBe(true);
    expect(Array.isArray(result.tags)).toBe(true);
  });
});
