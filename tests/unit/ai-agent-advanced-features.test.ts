import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AIAgentService, AgentType } from '../../backend/services/ai-agent-service';
import { agentMemoryService } from '../../backend/services/agent-memory-service';

describe('AI Agent Service Advanced Features', () => {
  let aiAgentService: AIAgentService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    mockOrganizationId = 'test-org-id';
    mockUserId = 'test-user-id';

    process.env.OPENAI_API_KEY = 'test-openai-key';
    process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
    process.env.GOOGLE_API_KEY = 'test-google-key';

    // Mock memory service
    jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue([]);
    jest.spyOn(agentMemoryService, 'storeMemory').mockResolvedValue({} as any);
  });

  describe('Memory Integration', () => {
    it('should retrieve memories during conversation', async () => {
      const mockMemories = [
        {
          id: 'mem1',
          type: 'conversation',
          content: 'User prefers concise responses',
          importance: 0.8,
          tags: ['preference'],
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: mockOrganizationId,
          userId: mockUserId
        }
      ];

      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue(mockMemories);

      const agentConfig = {
        id: 'memory-agent',
        name: 'Memory Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant with memory.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['memory'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'memory-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(agentMemoryService.getMemories).toHaveBeenCalledWith(
        mockOrganizationId,
        mockUserId,
        10
      );
    });

    it('should store conversation memories', async () => {
      const agentConfig = {
        id: 'memory-agent',
        name: 'Memory Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['memory'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'memory-agent',
        'This is a detailed message about my preferences and needs that should be stored in memory for future reference.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Verify memory was called for storing
      expect(agentMemoryService.storeMemory).toHaveBeenCalled();
    });
  });

  describe('Error Recovery', () => {
    it('should retry AI service calls on retryable errors', async () => {
      const agentConfig = {
        id: 'retry-agent',
        name: 'Retry Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['retry'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'retry-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Mock AI service to fail once then succeed
      const mockChat = jest.fn()
        .mockRejectedValueOnce(new Error('Rate limit exceeded'))
        .mockResolvedValueOnce({
          content: 'Response after retry',
          usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
          model: 'gpt-4',
          provider: 'openai',
          latency: 1000
        });

      // Replace the AI service chat method temporarily
      const originalChat = (aiAgentService as any).aiService.chat;
      (aiAgentService as any).aiService.chat = mockChat;

      const response = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Test message',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(mockChat).toHaveBeenCalledTimes(2);
      expect(response.message).toBe('Response after retry');

      // Restore original method
      (aiAgentService as any).aiService.chat = originalChat;
    });

    it('should identify retryable AI errors correctly', () => {
      const service = aiAgentService as any;
      
      expect(service.isRetryableAIError({ response: { status: 429 } })).toBe(true);
      expect(service.isRetryableAIError({ response: { status: 500 } })).toBe(true);
      expect(service.isRetryableAIError({ code: 'ETIMEDOUT' })).toBe(true);
      expect(service.isRetryableAIError({ message: 'Rate limit exceeded' })).toBe(true);
      expect(service.isRetryableAIError({ message: 'Temporary failure' })).toBe(true);
      expect(service.isRetryableAIError({ response: { status: 400 } })).toBe(false);
      expect(service.isRetryableAIError({ message: 'Invalid request' })).toBe(false);
    });
  });

  describe('Context Window Management', () => {
    it('should compress conversations when message limit exceeded', async () => {
      const agentConfig = {
        id: 'context-agent',
        name: 'Context Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['compression'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'context-agent',
        'Initial message',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Add many messages to trigger compression
      for (let i = 0; i < 130; i++) {
        conversation.messages.push({
          id: `msg-${i}`,
          role: 'user',
          content: `Message ${i} with enough content to trigger compression when we have many messages in the conversation history.`,
          timestamp: new Date(),
        });
      }

      // Trigger compression
      (aiAgentService as any).compressConversationInPlace(conversation);

      // Should have summary and last messages
      expect(conversation.messages.length).toBeLessThan(130);
      expect(conversation.messages.some(m => m.content.includes('Conversation summary'))).toBe(true);
    });

    it('should clean up expired conversations', async () => {
      const agentConfig = {
        id: 'cleanup-agent',
        name: 'Cleanup Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['cleanup'],
      };

      aiAgentService.registerAgent(agentConfig);

      // Start a conversation
      const conversation = await aiAgentService.startConversation(
        'cleanup-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(aiAgentService.getConversation(conversation.sessionId, mockOrganizationId)).not.toBeNull();

      // Manually expire the conversation by setting old timestamp
      (aiAgentService as any).conversationTimestamps.set(conversation.sessionId, Date.now() - 31 * 60 * 1000);

      // Trigger cleanup
      (aiAgentService as any).cleanupExpiredConversations();

      // Conversation should be cleaned up
      expect(aiAgentService.getConversation(conversation.sessionId, mockOrganizationId)).toBeNull();
    });
  });

  describe('Streaming with Memory', () => {
    it('should include memory in streaming responses', async () => {
      const mockMemories = [
        {
          id: 'mem1',
          type: 'preference',
          content: 'User likes detailed explanations',
          importance: 0.9,
          tags: ['preference'],
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: mockOrganizationId,
          userId: mockUserId
        }
      ];

      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue(mockMemories);

      const agentConfig = {
        id: 'stream-memory-agent',
        name: 'Stream Memory Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['streaming', 'memory'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'stream-memory-agent',
        'Hello',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(
        conversation.sessionId,
        'Explain something in detail',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
        if (chunk.type === 'end') break;
      }

      expect(chunks.length).toBeGreaterThan(0);
      expect(agentMemoryService.getMemories).toHaveBeenCalledWith(
        mockOrganizationId,
        mockUserId,
        10
      );
    });
  });

  describe('Tool Registry', () => {
    it('should register and manage tools correctly', () => {
      const tool = {
        name: 'test_tool',
        description: 'A test tool',
        parameters: { input: 'string' },
        category: 'test',
        handler: async () => ({ success: true })
      };

      aiAgentService.registerTool(tool);

      const retrievedTool = aiAgentService.getTool('test_tool');
      expect(retrievedTool).toBeDefined();
      expect(retrievedTool?.enabled).toBe(true);
      expect(retrievedTool?.timeout).toBe(30000);
      expect(retrievedTool?.retryAttempts).toBe(3);
    });

    it('should get tools by category', () => {
      const tool1 = {
        name: 'tool1',
        description: 'Tool 1',
        parameters: {},
        category: 'category1',
        handler: async () => ({ success: true })
      };

      const tool2 = {
        name: 'tool2',
        description: 'Tool 2',
        parameters: {},
        category: 'category1',
        handler: async () => ({ success: true })
      };

      aiAgentService.registerTool(tool1);
      aiAgentService.registerTool(tool2);

      const category1Tools = aiAgentService.getToolsByCategory('category1');
      expect(category1Tools).toHaveLength(2);
    });

    it('should enable and disable tools', () => {
      const tool = {
        name: 'toggle_tool',
        description: 'A toggleable tool',
        parameters: {},
        handler: async () => ({ success: true })
      };

      aiAgentService.registerTool(tool);

      // Initially enabled
      expect(aiAgentService.getTool('toggle_tool')?.enabled).toBe(true);

      // Disable
      aiAgentService.toolRegistry.disableTool('toggle_tool');
      expect(aiAgentService.getTool('toggle_tool')?.enabled).toBe(false);

      // Re-enable
      aiAgentService.toolRegistry.enableTool('toggle_tool');
      expect(aiAgentService.getTool('toggle_tool')?.enabled).toBe(true);
    });
  });
});
