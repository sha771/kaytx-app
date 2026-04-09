import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { AIAgentService, AgentType } from '../../../services/ai-agent-service';
import { db as pgDb } from '../../../db/connection';
import { logAudit } from '../../../lib/audit';
import { agentMemoryService } from '../../../services/agent-memory-service';

// Mock dependencies
jest.mock('../../../db/connection');
jest.mock('../../../lib/audit');
jest.mock('../../../services/agent-memory-service');

const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;
const mockAgentMemoryService = agentMemoryService as jest.Mocked<typeof agentMemoryService>;

describe('AIAgentService', () => {
  let aiAgentService: AIAgentService;
  const mockOrganizationId = 'org-123';
  const mockUserId = 'user-123';
  const mockAgentId = 'voice-assistant-1';
  const mockSessionId = 'session-123';

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    
    // Setup default mock responses
    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockSessionId }])
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: mockSessionId }])
        })
      })
    });

    // Mock agent memory service
    mockAgentMemoryService.getMemories = jest.fn().mockResolvedValue([]);
    mockAgentMemoryService.storeMemory = jest.fn().mockResolvedValue(undefined);

    // Mock audit log
    mockLogAudit.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Tool Registry', () => {
    it('should initialize with default tools', () => {
      const toolRegistry = aiAgentService.getToolRegistry();
      const allTools = toolRegistry.getAllTools();

      expect(allTools).toBeDefined();
      expect(allTools.length).toBeGreaterThan(0);
      
      // Check for default tools
      const scheduleTool = toolRegistry.getTool('schedule_appointment');
      const transferTool = toolRegistry.getTool('transfer_call');
      const analyzeTool = toolRegistry.getTool('analyze_offer');

      expect(scheduleTool).toBeDefined();
      expect(transferTool).toBeDefined();
      expect(analyzeTool).toBeDefined();
    });

    it('should register a new tool', () => {
      const newTool = {
        name: 'test_tool',
        description: 'Test tool for unit testing',
        parameters: { test: 'string' },
        category: 'test',
        handler: jest.fn().mockResolvedValue({ success: true })
      };

      const result = aiAgentService.registerTool(newTool);

      expect(result).toBe(true);
      
      const toolRegistry = aiAgentService.getToolRegistry();
      const registeredTool = toolRegistry.getTool('test_tool');
      expect(registeredTool).toBeDefined();
      expect(registeredTool?.name).toBe('test_tool');
    });

    it('should unregister a tool', () => {
      const result = aiAgentService.unregisterTool('schedule_appointment');
      expect(result).toBe(true);

      const toolRegistry = aiAgentService.getToolRegistry();
      const tool = toolRegistry.getTool('schedule_appointment');
      expect(tool).toBeUndefined();
    });

    it('should get tools by category', () => {
      const toolRegistry = aiAgentService.getToolRegistry();
      const schedulingTools = toolRegistry.getToolsByCategory('scheduling');
      
      expect(schedulingTools).toBeDefined();
      expect(schedulingTools.length).toBeGreaterThan(0);
      expect(schedulingTools[0].category).toBe('scheduling');
    });

    it('should enable and disable tools', () => {
      const result = aiAgentService.setToolEnabled('schedule_appointment', false);
      expect(result).toBe(true);

      const toolRegistry = aiAgentService.getToolRegistry();
      const tool = toolRegistry.getTool('schedule_appointment');
      expect(tool?.enabled).toBe(false);

      const enableResult = aiAgentService.setToolEnabled('schedule_appointment', true);
      expect(enableResult).toBe(true);
      expect(tool?.enabled).toBe(true);
    });
  });

  describe('Tool Execution', () => {
    it('should execute a tool successfully', async () => {
      const mockParameters = {
        title: 'Test Meeting',
        startTime: '2024-01-15T10:00:00Z',
        duration: 60,
        attendees: ['test@example.com'],
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const result = await aiAgentService.executeTool(mockAgentId, 'schedule_appointment', mockParameters);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.appointmentId).toBeDefined();
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Tool executed: schedule_appointment',
          status: 'success'
        })
      );
    });

    it('should handle tool not found error', async () => {
      const mockParameters = { organizationId: mockOrganizationId };

      await expect(
        aiAgentService.executeTool(mockAgentId, 'non_existent_tool', mockParameters)
      ).rejects.toThrow('Tool not found: non_existent_tool');
    });

    it('should handle disabled tool error', async () => {
      // Disable the tool first
      aiAgentService.setToolEnabled('schedule_appointment', false);

      const mockParameters = { organizationId: mockOrganizationId };

      await expect(
        aiAgentService.executeTool(mockAgentId, 'schedule_appointment', mockParameters)
      ).rejects.toThrow('Tool is disabled: schedule_appointment');
    });

    it('should retry tool execution on retryable errors', async () => {
      const mockHandler = jest.fn()
        .mockRejectedValueOnce(new Error('Rate limit exceeded'))
        .mockResolvedValueOnce({ success: true, test: 'retry-success' });

      const retryTool = {
        name: 'retry_tool',
        description: 'Tool that fails once then succeeds',
        parameters: { test: 'string' },
        category: 'test',
        retryAttempts: 3,
        timeout: 5000,
        handler: mockHandler
      };

      aiAgentService.registerTool(retryTool);

      const result = await aiAgentService.executeTool(mockAgentId, 'retry_tool', {
        organizationId: mockOrganizationId
      });

      expect(result.success).toBe(true);
      expect(result.test).toBe('retry-success');
      expect(mockHandler).toHaveBeenCalledTimes(2);
    });

    it('should timeout tool execution', async () => {
      const slowHandler = jest.fn().mockImplementation(() => 
        new Promise(resolve => setTimeout(resolve, 10000)) // 10 second delay
      );

      const slowTool = {
        name: 'slow_tool',
        description: 'Tool that takes too long',
        parameters: {},
        category: 'test',
        timeout: 1000, // 1 second timeout
        handler: slowHandler
      };

      aiAgentService.registerTool(slowTool);

      await expect(
        aiAgentService.executeTool(mockAgentId, 'slow_tool', { organizationId: mockOrganizationId })
      ).rejects.toThrow('Tool execution timeout: slow_tool');
    });
  });

  describe('Conversation Management', () => {
    it('should start a conversation', async () => {
      const metadata = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', metadata);

      expect(conversation).toBeDefined();
      expect(conversation.sessionId).toBeDefined();
      expect(conversation.agentId).toBe(mockAgentId);
      expect(conversation.messages).toHaveLength(1);
      expect(conversation.messages[0].content).toBe('Hello');
      expect(conversation.messages[0].role).toBe('user');
    });

    it('should require organizationId to start conversation', async () => {
      await expect(
        aiAgentService.startConversation(mockAgentId, 'Hello', {})
      ).rejects.toThrow('organizationId is required to start a conversation');
    });

    it('should send a message and get response', async () => {
      // Start conversation first
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock AI service response
      const mockAIResponse = {
        content: 'Hello! How can I help you today?',
        usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      // Mock the AI service
      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const response = await aiAgentService.sendMessage(conversation.sessionId, 'How are you?', ctx);

      expect(response).toBeDefined();
      expect(response.message).toBe(mockAIResponse.content);
      expect(response.confidence).toBe(0.9);
    });

    it('should handle conversation not found', async () => {
      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      await expect(
        aiAgentService.sendMessage('non-existent-session', 'Hello', ctx)
      ).rejects.toThrow('Conversation not found: non-existent-session');
    });

    it('should end a conversation', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const result = await aiAgentService.endConversation(conversation.sessionId, ctx);

      expect(result).toBe(true);
      expect(mockDb.update).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'completed'
        })
      );
    });
  });

  describe('Streaming Messages', () => {
    it('should stream message response', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock streaming response
      const mockStream = {
        async *[Symbol.asyncIterator]() {
          yield { content: 'Hello', done: false };
          yield { content: '!', done: false };
          yield { content: ' How', done: false };
          yield { content: ' can', done: false };
          yield { content: ' I', done: false };
          yield { content: ' help', done: false };
          yield { content: ' you?', done: true };
        }
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chatStream: jest.fn().mockReturnValue(mockStream),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(conversation.sessionId, 'Help me', ctx)) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(8); // 1 start + 6 content + 1 end
      expect(chunks[0].type).toBe('start');
      expect(chunks[chunks.length - 1].type).toBe('end');
      expect(chunks[chunks.length - 1].content).toContain('Hello! How can I help you?');
    });

    it('should handle tool calls in streaming', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock streaming with tool call
      const mockStream = {
        async *[Symbol.asyncIterator]() {
          yield { content: 'I will', done: false };
          yield { 
            content: '',
            metadata: {
              toolCalls: [{
                function: {
                  name: 'schedule_appointment',
                  arguments: JSON.stringify({
                    title: 'Test Meeting',
                    startTime: '2024-01-15T10:00:00Z',
                    duration: 60
                  })
                }
              }]
            },
            done: false 
          };
          yield { content: 'schedule your meeting.', done: true };
        }
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chatStream: jest.fn().mockReturnValue(mockStream),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(conversation.sessionId, 'Schedule a meeting', ctx)) {
        chunks.push(chunk);
      }

      const toolCallChunk = chunks.find(chunk => chunk.type === 'tool_call');
      expect(toolCallChunk).toBeDefined();
      expect(toolCallChunk?.toolCall?.function?.name).toBe('schedule_appointment');
    });
  });

  describe('Agent Management', () => {
    it('should get agent configuration', () => {
      const agent = aiAgentService.getAgent(mockAgentId);
      expect(agent).toBeDefined();
      expect(agent?.id).toBe(mockAgentId);
      expect(agent?.type).toBe('voice-assistant');
    });

    it('should return null for non-existent agent', () => {
      const agent = aiAgentService.getAgent('non-existent');
      expect(agent).toBeNull();
    });

    it('should get all agents', () => {
      const agents = aiAgentService.getAllAgents();
      expect(agents).toBeDefined();
      expect(agents.length).toBeGreaterThan(0);
    });

    it('should get agents by type', () => {
      const receptionists = aiAgentService.getAgentsByType('receptionist');
      expect(receptionists).toBeDefined();
      expect(receptionists.length).toBeGreaterThan(0);
      expect(receptionists[0].type).toBe('receptionist');
    });

    it('should register custom agent', () => {
      const customAgent = {
        id: 'custom-agent-1',
        name: 'Custom Agent',
        type: 'workflow-automator' as AgentType,
        systemPrompt: 'You are a custom agent',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        tools: [],
        capabilities: ['custom-task']
      };

      const result = aiAgentService.registerAgent(customAgent);
      expect(result).toBe(true);

      const retrievedAgent = aiAgentService.getAgent('custom-agent-1');
      expect(retrievedAgent).toBeDefined();
      expect(retrievedAgent?.name).toBe('Custom Agent');
    });
  });

  describe('Memory Integration', () => {
    it('should retrieve memories for conversation context', async () => {
      const mockMemories = [
        {
          id: 'memory-1',
          type: 'conversation',
          content: 'User prefers morning meetings',
          importance: 0.8,
          tags: ['preference'],
          metadata: {}
        }
      ];

      mockAgentMemoryService.getMemories = jest.fn().mockResolvedValue(mockMemories);

      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock AI service
      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue({
          content: 'I remember you prefer morning meetings',
          usage: { promptTokens: 20, completionTokens: 15, totalTokens: 35 },
          model: 'gpt-4',
          provider: 'openai' as const,
          finishReason: 'stop'
        }),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      await aiAgentService.sendMessage(conversation.sessionId, 'Schedule a meeting', ctx);

      expect(mockAgentMemoryService.getMemories).toHaveBeenCalledWith(
        mockOrganizationId,
        mockUserId,
        10
      );
    });

    it('should store conversation memories', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock AI service
      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue({
          content: 'This is a detailed response that should be stored in memory',
          usage: { promptTokens: 15, completionTokens: 25, totalTokens: 40 },
          model: 'gpt-4',
          provider: 'openai' as const,
          finishReason: 'stop'
        }),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      await aiAgentService.sendMessage(conversation.sessionId, 'Tell me something important', ctx);

      expect(mockAgentMemoryService.storeMemory).toHaveBeenCalledTimes(2); // Once for user message, once for assistant response
    });
  });

  describe('Error Handling', () => {
    it('should handle AI service unavailability', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock AI service as unavailable
      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        getProviderStatus: jest.fn().mockReturnValue({ openai: false, anthropic: false, google: false })
      });

      await expect(
        aiAgentService.sendMessage(conversation.sessionId, 'Hello', ctx)
      ).rejects.toThrow('No AI provider is available');
    });

    it('should handle database errors gracefully', async () => {
      mockDb.insert = jest.fn().mockReturnValue({
        values: jest.fn().mockReturnValue({
          returning: jest.fn().mockRejectedValue(new Error('Database connection failed'))
        })
      });

      await expect(
        aiAgentService.startConversation(mockAgentId, 'Hello', {
          organizationId: mockOrganizationId,
          userId: mockUserId
        })
      ).rejects.toThrow('Database connection failed');
    });

    it('should handle memory service errors', async () => {
      mockAgentMemoryService.getMemories = jest.fn().mockRejectedValue(new Error('Memory service unavailable'));

      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Mock AI service
      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue({
          content: 'Response without memory',
          usage: { promptTokens: 10, completionTokens: 10, totalTokens: 20 },
          model: 'gpt-4',
          provider: 'openai' as const,
          finishReason: 'stop'
        }),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      // Should still work even if memory service fails
      const response = await aiAgentService.sendMessage(conversation.sessionId, 'Hello', ctx);
      expect(response.message).toBe('Response without memory');
    });
  });

  describe('Validation', () => {
    it('should validate UUID format', () => {
      const validUuid = '123e4567-e89b-12d3-a456-426614174000';
      const invalidUuid = 'invalid-uuid';

      expect((aiAgentService as any).isUuid(validUuid)).toBe(true);
      expect((aiAgentService as any).isUuid(invalidUuid)).toBe(false);
    });

    it('should validate agent configuration', () => {
      const invalidAgent = {
        id: '', // Empty ID
        name: 'Invalid Agent',
        type: 'invalid-type' as any,
        systemPrompt: '',
        model: '',
        temperature: 0.7,
        maxTokens: 2000,
        tools: [],
        capabilities: []
      };

      // Should still register but might log warnings
      const result = aiAgentService.registerAgent(invalidAgent);
      expect(result).toBe(true);
    });
  });

  describe('Audit Logging', () => {
    it('should log conversation events', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Conversation started',
          eventType: 'conversation.started',
          status: 'success'
        })
      );
    });

    it('should log tool execution events', async () => {
      await aiAgentService.executeTool(mockAgentId, 'schedule_appointment', {
        title: 'Test Meeting',
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Tool executed: schedule_appointment',
          eventType: 'tool.executed',
          status: 'success'
        })
      );
    });

    it('should log tool execution errors', async () => {
      await expect(
        aiAgentService.executeTool(mockAgentId, 'non_existent_tool', {
          organizationId: mockOrganizationId,
          userId: mockUserId
        })
      ).rejects.toThrow();

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Tool execution failed: non_existent_tool',
          eventType: 'tool.error',
          status: 'failure'
        })
      );
    });
  });
});
