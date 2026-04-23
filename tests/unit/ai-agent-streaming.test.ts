import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AIAgentService , AgentType } from '../../backend/services/ai-agent-service';

describe('AI Agent Service Streaming', () => {
  let aiAgentService: AIAgentService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    mockOrganizationId = 'test-org-id';
    mockUserId = 'test-user-id';

    // Set required environment variables for testing
    process.env.OPENAI_API_KEY = 'test-openai-key';
    process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
    process.env.GOOGLE_API_KEY = 'test-google-key';
  });

  describe('sendMessageStream', () => {
    it('should start conversation and stream response', async () => {
      const agentConfig = {
        id: 'test-agent',
        name: 'Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['text-generation'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'test-agent',
        'Hello, I need help.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const sessionId = conversation.sessionId;

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        sessionId,
        'Can you help me with a task?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks[0].type).toBe('start');
      expect(chunks[chunks.length - 1].type).toBe('end');
      
      const chunkTypes = chunks.map(c => c.type);
      expect(chunkTypes).toContain('chunk');
    });

    it('should handle conversation not found error', async () => {
      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        'non-existent-session',
        'Test message',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBe(2);
      expect(chunks[0].type).toBe('start');
      expect(chunks[1].type).toBe('error');
      expect(chunks[1].error).toContain('Conversation not found');
    });

    it('should handle access denied error', async () => {
      const agentConfig = {
        id: 'test-agent',
        name: 'Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['text-generation'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'test-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const sessionId = conversation.sessionId;

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        sessionId,
        'Test message',
        { organizationId: 'different-org', userId: mockUserId }
      )) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBe(2);
      expect(chunks[0].type).toBe('start');
      expect(chunks[1].type).toBe('error');
      expect(chunks[1].error).toContain('access denied');
    });

    it('should handle missing AI provider error', async () => {
      // Clear API keys to simulate missing providers
      delete process.env.OPENAI_API_KEY;
      delete process.env.ANTHROPIC_API_KEY;
      delete process.env.GOOGLE_API_KEY;

      const agentConfig = {
        id: 'test-agent',
        name: 'Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['text-generation'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'test-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const sessionId = conversation.sessionId;

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        sessionId,
        'Test message',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBe(2);
      expect(chunks[0].type).toBe('start');
      expect(chunks[1].type).toBe('error');
      expect(chunks[1].error).toContain('No AI provider is available');
    });

    it('should accumulate streaming content correctly', async () => {
      const agentConfig = {
        id: 'test-agent',
        name: 'Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['text-generation'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'test-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const sessionId = conversation.sessionId;

      const chunks = [];
      let accumulatedContent = '';
      
      for await (const chunk of aiAgentService.sendMessageStream(
        sessionId,
        'Tell me a short story',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
        
        if (chunk.type === 'chunk' && chunk.content) {
          accumulatedContent += chunk.content;
        }
      }

      expect(accumulatedContent.length).toBeGreaterThan(0);
      
      const finalChunk = chunks[chunks.length - 1];
      expect(finalChunk.type).toBe('end');
      expect(finalChunk.content).toBe(accumulatedContent);
    });

    it('should include metadata in streaming chunks', async () => {
      const agentConfig = {
        id: 'test-agent',
        name: 'Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['text-generation'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'test-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const sessionId = conversation.sessionId;

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        sessionId,
        'Test message',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
      }

      // Check start chunk metadata
      const startChunk = chunks.find(c => c.type === 'start');
      expect(startChunk?.metadata?.sessionId).toBe(sessionId);

      // Check end chunk metadata
      const endChunk = chunks.find(c => c.type === 'end');
      expect(endChunk?.metadata?.finalResponse).toBeDefined();
      expect(endChunk?.metadata?.hasToolCall).toBeDefined();
    });

    it('should preserve conversation history after streaming', async () => {
      const agentConfig = {
        id: 'test-agent',
        name: 'Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['text-generation'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'test-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const sessionId = conversation.sessionId;
      const initialMessageCount = conversation.messages.length;

      // Send streaming message
      for await (const chunk of aiAgentService.sendMessageStream(
        sessionId,
        'How are you?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        // Just consume the stream
      }

      // Check that conversation history was updated
      const updatedConversation = await aiAgentService.getConversation(sessionId, mockOrganizationId);
      expect(updatedConversation.messages.length).toBe(initialMessageCount + 2); // User + assistant messages

      const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];
      expect(lastMessage.role).toBe('assistant');
      expect(lastMessage.content.length).toBeGreaterThan(0);
    });
  });
});
