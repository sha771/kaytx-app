import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { AIAgentService } from '../../services/ai-agent-service';
import { agentMemoryService } from '../../services/agent-memory-service';
import { db as pgDb } from '../../db/connection';
import { logAudit } from '../../lib/audit';

// Mock dependencies
jest.mock('../../services/agent-memory-service');
jest.mock('../../db/connection');
jest.mock('../../lib/audit');

const mockAgentMemoryService = agentMemoryService as jest.Mocked<typeof agentMemoryService>;
const mockDb = pgDb as jest.Mocked<typeof pgDb>;
const mockLogAudit = logAudit as jest.MockedFunction<typeof logAudit>;

describe('AI Agent Integration Tests', () => {
  let aiAgentService: AIAgentService;
  const mockOrganizationId = 'org-123';
  const mockUserId = 'user-123';
  const mockAgentId = 'voice-assistant-1';
  const mockSessionId = 'session-123';

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    
    // Setup mock database responses
    mockDb.select = jest.fn().mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue([])
        })
      })
    });

    mockDb.insert = jest.fn().mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: mockSessionId }] as any)
      })
    });

    mockDb.update = jest.fn().mockReturnValue({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnValue({
          returning: jest.fn().mockResolvedValue([{ id: mockSessionId }] as any)
        })
      })
    });

    // Mock agent memory service
    mockAgentMemoryService.getMemories = jest.fn().mockResolvedValue([]);
    mockAgentMemoryService.storeMemory = jest.fn().mockResolvedValue(undefined);

    // Mock audit log
    mockLogAudit.mockResolvedValue(undefined);
  });

  describe('Complete AI Agent Conversation Workflow', () => {
    it('should handle complete conversation with tool execution', async () => {
      // Step 1: Start conversation
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello, I need help scheduling a meeting', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      expect(conversation).toBeDefined();
      expect(conversation.sessionId).toBeDefined();
      expect(conversation.messages).toHaveLength(1);
      expect(conversation.messages[0].content).toBe('Hello, I need help scheduling a meeting');

      // Step 2: Mock AI service response with tool call
      const mockAIResponse = {
        content: 'I\'ll help you schedule a meeting.',
        usage: { promptTokens: 15, completionTokens: 20, totalTokens: 35 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      // Step 3: Send message and get response
      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const response = await aiAgentService.sendMessage(conversation.sessionId, 'Schedule a meeting with John for tomorrow at 2pm', ctx);

      expect(response).toBeDefined();
      expect(response.message).toBe('I\'ll help you schedule a meeting.');
      expect(response.confidence).toBe(0.9);

      // Step 4: Execute tool for scheduling
      const toolResult = await aiAgentService.executeTool(mockAgentId, 'schedule_appointment', {
        title: 'Meeting with John',
        startTime: '2024-01-16T14:00:00Z',
        duration: 60,
        attendees: ['john@example.com'],
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      expect(toolResult.success).toBe(true);
      expect(toolResult.appointmentId).toBeDefined();

      // Step 5: Verify audit logging
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Conversation started',
          resource: 'ai_conversation',
          status: 'success'
        })
      );

      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Tool executed: schedule_appointment',
          resource: 'ai_tool',
          status: 'success'
        })
      );
    });

    it('should handle streaming conversation with tool calls', async () => {
      // Start conversation
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Help me analyze this data', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      // Mock streaming response with tool call
      const mockStream = {
        async *[Symbol.asyncIterator]() {
          yield { content: 'I\'ll analyze', done: false };
          yield { 
            content: '',
            metadata: {
              toolCalls: [{
                function: {
                  name: 'analyze_data',
                  arguments: JSON.stringify({
                    data: [1, 2, 3, 4, 5],
                    analysisType: 'statistical'
                  })
                }
              }]
            },
            done: false 
          };
          yield { content: ' the data for you.', done: true };
        }
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chatStream: jest.fn().mockReturnValue(mockStream),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Process streaming response
      const chunks = [];
      for await (const chunk of aiAgentService.sendMessageStream(conversation.sessionId, 'Analyze this dataset: [1,2,3,4,5]', ctx)) {
        chunks.push(chunk);
      }

      expect(chunks).toHaveLength(4); // start + content + tool_call + end
      expect(chunks[0].type).toBe('start');
      expect(chunks[2].type).toBe('tool_call');
      expect(chunks[2].toolCall?.function?.name).toBe('analyze_data');
      expect(chunks[3].type).toBe('end');

      // Execute the tool that was called
      const toolResult = await aiAgentService.executeTool(mockAgentId, 'analyze_data', {
        data: [1, 2, 3, 4, 5],
        analysisType: 'statistical',
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      expect(toolResult.success).toBe(true);
      expect(toolResult.analysis).toBeDefined();
    });

    it('should handle conversation with memory integration', async () => {
      // Mock existing memories
      const mockMemories = [
        {
          id: 'memory-1',
          type: 'preference',
          content: 'User prefers morning meetings',
          importance: 0.8,
          tags: ['preference', 'meeting'],
          metadata: {}
        },
        {
          id: 'memory-2',
          type: 'context',
          content: 'User is working on Q1 planning',
          importance: 0.9,
          tags: ['work', 'planning'],
          metadata: {}
        }
      ];

      mockAgentMemoryService.getMemories = jest.fn().mockResolvedValue(mockMemories);

      // Start conversation
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Schedule a meeting', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      // Mock AI response that considers memories
      const mockAIResponse = {
        content: 'Based on your preference for morning meetings, I\'ll schedule it for 10am. Is that good for your Q1 planning?',
        usage: { promptTokens: 25, completionTokens: 30, totalTokens: 55 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const response = await aiAgentService.sendMessage(conversation.sessionId, 'When should we meet?', ctx);

      expect(response.message).toContain('morning meetings');
      expect(response.message).toContain('Q1 planning');

      // Verify memories were retrieved
      expect(mockAgentMemoryService.getMemories).toHaveBeenCalledWith(
        mockOrganizationId,
        mockUserId,
        10
      );

      // Verify new memory was stored
      expect(mockAgentMemoryService.storeMemory).toHaveBeenCalled();
    });
  });

  describe('Multi-Agent Collaboration', () => {
    it('should handle handoff between agents', async () => {
      // Start with receptionist agent
      const receptionistConversation = await aiAgentService.startConversation('receptionist-1', 'I need technical support', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      // Mock receptionist response with handoff
      const mockHandoffResponse = {
        content: 'I\'ll transfer you to our technical support specialist.',
        usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop',
        metadata: {
          handoff: {
            toAgent: 'technical-support-1',
            reason: 'technical_issue'
          }
        }
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockHandoffResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const handoffResponse = await aiAgentService.sendMessage(receptionistConversation.sessionId, 'My computer is not working', ctx);

      expect(handoffResponse.metadata?.handoff?.toAgent).toBe('technical-support-1');

      // Start conversation with technical support agent
      const techConversation = await aiAgentService.startConversation('technical-support-1', 'My computer is not working', {
        organizationId: mockOrganizationId,
        userId: mockUserId,
        context: {
          handoffFrom: 'receptionist-1',
          issue: 'computer_not_working'
        }
      });

      expect(techConversation.agentId).toBe('technical-support-1');
      expect(techConversation.context?.handoffFrom).toBe('receptionist-1');
    });

    it('should handle concurrent agent conversations', async () => {
      // Start multiple conversations with different agents
      const conversations = await Promise.all([
        aiAgentService.startConversation('voice-assistant-1', 'Schedule meeting', {
          organizationId: mockOrganizationId,
          userId: mockUserId
        }),
        aiAgentService.startConversation('receptionist-1', 'General inquiry', {
          organizationId: mockOrganizationId,
          userId: mockUserId
        }),
        aiAgentService.startConversation('workflow-automator-1', 'Automate task', {
          organizationId: mockOrganizationId,
          userId: mockUserId
        })
      ]);

      expect(conversations).toHaveLength(3);
      expect(conversations[0].agentId).toBe('voice-assistant-1');
      expect(conversations[1].agentId).toBe('receptionist-1');
      expect(conversations[2].agentId).toBe('workflow-automator-1');

      // Mock AI responses for all agents
      const mockAIResponse = {
        content: 'I\'ll help you with that.',
        usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      // Send messages to all conversations concurrently
      const responses = await Promise.all([
        aiAgentService.sendMessage(conversations[0].sessionId, 'Details for meeting', ctx),
        aiAgentService.sendMessage(conversations[1].sessionId, 'More information', ctx),
        aiAgentService.sendMessage(conversations[2].sessionId, 'Task details', ctx)
      ]);

      expect(responses.every((r: any) => r.message === 'I\'ll help you with that.')).toBe(true);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle AI service unavailability', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      // Mock AI service as unavailable
      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        getProviderStatus: jest.fn().mockReturnValue({ openai: false, anthropic: false, google: false })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      await expect(
        aiAgentService.sendMessage(conversation.sessionId, 'Help me', ctx)
      ).rejects.toThrow('No AI provider is available');

      // Verify error was logged
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'MESSAGE_SEND_FAILED',
          resource: 'ai_conversation',
          status: 'failure'
        })
      );
    });

    it('should handle tool execution failures with retry', async () => {
      // Mock tool that fails twice then succeeds
      const mockHandler = jest.fn()
        .mockRejectedValueOnce(new Error('Service temporarily unavailable'))
        .mockRejectedValueOnce(new Error('Rate limit exceeded'))
        .mockResolvedValueOnce({ success: true, data: 'Tool executed successfully' });

      const retryTool = {
        name: 'retry_tool',
        description: 'Tool that retries on failure',
        parameters: { input: 'string' },
        category: 'test',
        retryAttempts: 3,
        timeout: 5000,
        handler: mockHandler
      };

      aiAgentService.registerTool(retryTool);

      const result = await aiAgentService.executeTool(mockAgentId, 'retry_tool', {
        input: 'test data',
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      expect(result.success).toBe(true);
      expect(result.data).toBe('Tool executed successfully');
      expect(mockHandler).toHaveBeenCalledTimes(3);

      // Verify retry attempts were logged
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'Tool execution failed: retry_tool',
          resource: 'ai_tool',
          status: 'failure'
        })
      );
    });

    it('should handle conversation context corruption', async () => {
      // Start conversation
      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      // Mock database error during message send
      mockDb.update = jest.fn().mockRejectedValue(new Error('Database connection lost' as any));

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const mockAIResponse = {
        content: 'Response',
        usage: { promptTokens: 5, completionTokens: 10, totalTokens: 15 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      // Should still get AI response even if database fails
      const response = await aiAgentService.sendMessage(conversation.sessionId, 'Test message', ctx);

      expect(response.message).toBe('Response');
      expect(response.success).toBe(true);
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle high volume of concurrent conversations', async () => {
      const conversationCount = 50;
      
      // Start multiple conversations
      const conversations = await Promise.all(
        Array.from({ length: conversationCount }, (_, i) =>
          aiAgentService.startConversation(mockAgentId, `Message ${i}`, {
            organizationId: mockOrganizationId,
            userId: mockUserId
          })
        )
      );

      expect(conversations).toHaveLength(conversationCount);

      // Mock AI responses
      const mockAIResponse = {
        content: 'Response',
        usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const startTime = Date.now();

      // Send messages to all conversations
      const responses = await Promise.all(
        conversations.map((conv: any) =>
          aiAgentService.sendMessage(conv.sessionId, 'Follow up message', ctx)
        )
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(responses.every((r: any) => r.success)).toBe(true);
      expect(duration).toBeLessThan(15000); // Should complete within 15 seconds
    });

    it('should handle large memory datasets efficiently', async () => {
      // Mock large memory dataset
      const largeMemorySet = Array.from({ length: 1000 }, (_, i) => ({
        id: `memory-${i}`,
        type: 'conversation',
        content: `Memory content ${i}`,
        importance: Math.random(),
        tags: ['tag1', 'tag2'],
        metadata: {}
      }));

      mockAgentMemoryService.getMemories = jest.fn().mockResolvedValue(largeMemorySet);

      const conversation = await aiAgentService.startConversation(mockAgentId, 'Hello', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const startTime = Date.now();

      const mockAIResponse = {
        content: 'I remember our previous conversations.',
        usage: { promptTokens: 100, completionTokens: 20, totalTokens: 120 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const response = await aiAgentService.sendMessage(conversation.sessionId, 'Do you remember me?', ctx);

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(response.success).toBe(true);
      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
      expect(mockAgentMemoryService.getMemories).toHaveBeenCalledWith(
        mockOrganizationId,
        mockUserId,
        10
      );
    });
  });

  describe('Security and Privacy', () => {
    it('should sanitize sensitive information in conversations', async () => {
      const conversation = await aiAgentService.startConversation(mockAgentId, 'My password is secret123', {
        organizationId: mockOrganizationId,
        userId: mockUserId
      });

      const mockAIResponse = {
        content: 'I cannot help with passwords. Please use secure password practices.',
        usage: { promptTokens: 15, completionTokens: 20, totalTokens: 35 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      const ctx = {
        organizationId: mockOrganizationId,
        userId: mockUserId
      };

      const response = await aiAgentService.sendMessage(conversation.sessionId, 'My password is secret123', ctx);

      expect(response.message).not.toContain('secret123');
      expect(response.message).toContain('cannot help with passwords');

      // Verify audit logging for security event
      expect(mockLogAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: 'SENSITIVE_CONTENT_DETECTED',
          resource: 'ai_conversation',
          status: 'success'
        })
      );
    });

    it('should maintain conversation isolation between users', async () => {
      // Start conversations for different users
      const user1Conversation = await aiAgentService.startConversation(mockAgentId, 'User 1 secret', {
        organizationId: mockOrganizationId,
        userId: 'user-1'
      });

      const user2Conversation = await aiAgentService.startConversation(mockAgentId, 'User 2 secret', {
        organizationId: mockOrganizationId,
        userId: 'user-2'
      });

      // Mock AI responses
      const mockAIResponse = {
        content: 'I understand your message.',
        usage: { promptTokens: 10, completionTokens: 15, totalTokens: 25 },
        model: 'gpt-4',
        provider: 'openai' as const,
        finishReason: 'stop'
      };

      jest.spyOn(aiAgentService as any, 'aiService', 'get').mockReturnValue({
        chat: jest.fn().mockResolvedValue(mockAIResponse),
        getProviderStatus: jest.fn().mockReturnValue({ openai: true })
      });

      // Send messages from different users
      const response1 = await aiAgentService.sendMessage(user1Conversation.sessionId, 'User 1 message', {
        organizationId: mockOrganizationId,
        userId: 'user-1'
      });

      const response2 = await aiAgentService.sendMessage(user2Conversation.sessionId, 'User 2 message', {
        organizationId: mockOrganizationId,
        userId: 'user-2'
      });

      expect(response1.success).toBe(true);
      expect(response2.success).toBe(true);

      // Verify conversations are isolated
      expect(user1Conversation.userId).toBe('user-1');
      expect(user2Conversation.userId).toBe('user-2');
      expect(user1Conversation.sessionId).not.toBe(user2Conversation.sessionId);
    });
  });
});
