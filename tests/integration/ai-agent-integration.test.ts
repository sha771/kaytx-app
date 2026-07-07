import { describe, it, expect, beforeEach, jest, beforeAll, afterAll } from '@jest/globals';
import { AIAgentService, AgentType } from '../../../backend/services/ai-agent-service';
import { agentMemoryService } from '../../../backend/services/consolidated-memory-service';
import { db as pgDb } from '../../../backend/db/connection';

describe('AI Agent Service Integration Tests', () => {
  let aiAgentService: AIAgentService;
  let mockOrganizationId: string;
  let mockUserId: string;

  beforeAll(async () => {
    // Setup test database connection if needed
    // This would typically involve creating a test database
    console.log('Setting up integration test environment');
  });

  afterAll(async () => {
    // Cleanup test database
    console.log('Cleaning up integration test environment');
  });

  beforeEach(() => {
    jest.clearAllMocks();
    aiAgentService = new AIAgentService();
    mockOrganizationId = 'integration-test-org';
    mockUserId = 'integration-test-user';

    // Set up environment variables
    process.env.OPENAI_API_KEY = 'test-integration-key';
    process.env.ANTHROPIC_API_KEY = 'test-integration-key';
    process.env.GOOGLE_API_KEY = 'test-integration-key';
  });

  describe('Full Conversation Flow Integration', () => {
    it('should handle complete conversation lifecycle with memory', async () => {
      // Setup agent with comprehensive capabilities
      const agentConfig = {
        id: 'integration-agent',
        name: 'Integration Test Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a comprehensive AI assistant for testing integration scenarios.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        tools: [
          {
            name: 'analyze_data',
            description: 'Analyze provided data',
            parameters: { data: 'object', analysisType: 'string' },
            category: 'analysis',
            handler: async (params: any) => ({
              success: true,
              insights: ['Data shows positive trend', 'Key metrics improved'],
              confidence: 0.95
            })
          }
        ],
        capabilities: ['conversation', 'memory', 'analysis', 'streaming'],
      };

      aiAgentService.registerAgent(agentConfig);

      // Mock memory service for integration testing
      const mockMemories = [
        {
          id: 'mem-integration-1',
          type: 'conversation' as const,
          content: 'User prefers detailed, actionable responses',
          importance: 0.8,
          tags: ['preference', 'communication-style'],
          metadata: { source: 'previous-conversation' },
          createdAt: new Date(),
          updatedAt: new Date(),
          organizationId: mockOrganizationId,
          userId: mockUserId
        }
      ];

      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue(mockMemories);
      jest.spyOn(agentMemoryService, 'storeMemory').mockResolvedValue({} as any);

      // Start conversation
      const conversation = await aiAgentService.startConversation(
        'integration-agent',
        'Hello, I need help analyzing some business data.',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(conversation.sessionId).toBeDefined();
      expect(conversation.messages).toHaveLength(1);

      // Send multiple messages to test conversation flow
      const response1 = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Here is my sales data: { "q1": 1000, "q2": 1500, "q3": 2000, "q4": 2500 }',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(response1.message).toBeDefined();
      expect(response1.confidence).toBeGreaterThan(0);

      // Test tool execution within conversation
      const response2 = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Can you analyze this data for trends?',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(response2.message).toBeDefined();

      // Verify memory integration
      expect(agentMemoryService.getMemories).toHaveBeenCalled();
      expect(agentMemoryService.storeMemory).toHaveBeenCalledTimes(2); // Once for each user message

      // Test conversation retrieval
      const retrievedConversation = aiAgentService.getConversation(
        conversation.sessionId,
        mockOrganizationId
      );

      expect(retrievedConversation).not.toBeNull();
      expect(retrievedConversation?.messages.length).toBeGreaterThan(2);

      // End conversation
      const ended = await aiAgentService.endConversation(
        conversation.sessionId,
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(ended).toBe(true);
    });

    it('should handle streaming conversation with error recovery', async () => {
      const agentConfig = {
        id: 'streaming-integration-agent',
        name: 'Streaming Integration Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a helpful assistant that provides streaming responses.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1500,
        tools: [],
        capabilities: ['streaming', 'error-recovery'],
      };

      aiAgentService.registerAgent(agentConfig);

      // Mock memory service
      jest.spyOn(agentMemoryService, 'getMemories').mockResolvedValue([]);
      jest.spyOn(agentMemoryService, 'storeMemory').mockResolvedValue({} as any);

      const conversation = await aiAgentService.startConversation(
        'streaming-integration-agent',
        'Start a streaming conversation',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const chunks = [];
      const chunkTypes = new Set();

      // Test streaming response
      for await (const chunk of aiAgentService.sendMessageStream(
        conversation.sessionId,
        'Provide a detailed explanation of quantum computing',
        { organizationId: mockOrganizationId, userId: mockUserId }
      )) {
        chunks.push(chunk);
        chunkTypes.add(chunk.type);

        if (chunk.type === 'end') {
          break;
        }
      }

      expect(chunks.length).toBeGreaterThan(0);
      expect(chunkTypes.has('start')).toBe(true);
      expect(chunkTypes.has('chunk')).toBe(true);
      expect(chunkTypes.has('end')).toBe(true);

      // Verify final accumulated content
      const endChunk = chunks.find(c => c.type === 'end');
      expect(endChunk?.content).toBeDefined();
      expect(endChunk?.content!.length).toBeGreaterThan(0);

      // Verify memory was stored for streaming
      expect(agentMemoryService.storeMemory).toHaveBeenCalled();
    });
  });

  describe('Multi-Agent Integration', () => {
    it('should handle multiple agents with different specializations', async () => {
      // Create specialized agents
      const salesAgent = {
        id: 'sales-integration-agent',
        name: 'Sales Integration Agent',
        type: AgentType.NEGOTIATOR,
        systemPrompt: 'You are a sales expert focused on closing deals and customer relationships.',
        model: 'gpt-4',
        temperature: 0.8,
        maxTokens: 1500,
        tools: [
          {
            name: 'analyze_offer',
            description: 'Analyze business offers',
            parameters: { offerDetails: 'object', criteria: 'array' },
            category: 'analysis',
            handler: async () => ({
              success: true,
              analysis: { score: 85, recommendation: 'Proceed' }
            })
          }
        ],
        capabilities: ['negotiation', 'sales', 'analysis'],
      };

      const workflowAgent = {
        id: 'workflow-integration-agent',
        name: 'Workflow Integration Agent',
        type: AgentType.WORKFLOW_AUTOMATOR,
        systemPrompt: 'You are a workflow automation expert.',
        model: 'gpt-4',
        temperature: 0.5,
        maxTokens: 2000,
        tools: [
          {
            name: 'create_workflow',
            description: 'Create automation workflows',
            parameters: { name: 'string', triggers: 'array', actions: 'array' },
            category: 'automation',
            handler: async () => ({
              success: true,
              workflowId: `wf_${Date.now()}`,
              message: 'Workflow created successfully'
            })
          }
        ],
        capabilities: ['automation', 'workflow', 'integration'],
      };

      aiAgentService.registerAgent(salesAgent);
      aiAgentService.registerAgent(workflowAgent);

      // Test both agents independently
      const salesConversation = await aiAgentService.startConversation(
        'sales-integration-agent',
        'I need help with a sales negotiation',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const workflowConversation = await aiAgentService.startConversation(
        'workflow-integration-agent',
        'I need to automate my sales process',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Verify both conversations are independent
      expect(salesConversation.sessionId).not.toBe(workflowConversation.sessionId);
      expect(salesConversation.agentId).toBe('sales-integration-agent');
      expect(workflowConversation.agentId).toBe('workflow-integration-agent');

      // Test agent-specific functionality
      const salesResponse = await aiAgentService.sendMessage(
        salesConversation.sessionId,
        'Analyze this offer: { price: 10000, terms: "net30", duration: "1year" }',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const workflowResponse = await aiAgentService.sendMessage(
        workflowConversation.sessionId,
        'Create a workflow for lead follow-up',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(salesResponse.message).toBeDefined();
      expect(workflowResponse.message).toBeDefined();

      // Verify agents can be retrieved by type
      const negotiators = aiAgentService.getAgentsByType(AgentType.NEGOTIATOR);
      const automators = aiAgentService.getAgentsByType(AgentType.WORKFLOW_AUTOMATOR);

      expect(negotiators.length).toBeGreaterThan(0);
      expect(automators.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling and Recovery Integration', () => {
    it('should handle cascading failures gracefully', async () => {
      const agentConfig = {
        id: 'resilience-integration-agent',
        name: 'Resilience Integration Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You are a resilient assistant that handles errors gracefully.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [
          {
            name: 'failing_tool',
            description: 'A tool that fails initially',
            parameters: { input: 'string' },
            category: 'test',
            retryAttempts: 3,
            handler: jest.fn()
              .mockRejectedValueOnce(new Error('Temporary failure'))
              .mockRejectedValueOnce(new Error('Another temporary failure'))
              .mockResolvedValueOnce({ success: true, result: 'Success after retries' })
          }
        ],
        capabilities: ['error-recovery', 'resilience'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'resilience-integration-agent',
        'Test error recovery',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Test tool execution with retry
      const toolResult = await aiAgentService.executeTool(
        'resilience-integration-agent',
        'failing_tool',
        { input: 'test input' },
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      expect(toolResult.success).toBe(true);
      expect(agentConfig.tools[0].handler).toHaveBeenCalledTimes(3);
    });

    it('should maintain conversation state during errors', async () => {
      const agentConfig = {
        id: 'state-integration-agent',
        name: 'State Integration Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You maintain state during errors.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['state-management'],
      };

      aiAgentService.registerAgent(agentConfig);

      const conversation = await aiAgentService.startConversation(
        'state-integration-agent',
        'Initial message',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      const initialMessageCount = conversation.messages.length;

      // Simulate an error during message processing
      const mockChat = jest.fn()
        .mockRejectedValueOnce(new Error('Rate limit exceeded'))
        .mockResolvedValueOnce({
          content: 'Response after error recovery',
          usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
          model: 'gpt-4',
          provider: 'openai',
          latency: 2000
        });

      const originalChat = (aiAgentService as any).aiService.chat;
      (aiAgentService as any).aiService.chat = mockChat;

      const response = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Message that triggers error recovery',
        { organizationId: mockOrganizationId, userId: mockUserId }
      );

      // Verify conversation state is maintained
      const updatedConversation = aiAgentService.getConversation(
        conversation.sessionId,
        mockOrganizationId
      );

      expect(updatedConversation?.messages.length).toBe(initialMessageCount + 2); // User + assistant messages
      expect(response.message).toBe('Response after error recovery');

      // Restore original method
      (aiAgentService as any).aiService.chat = originalChat;
    });
  });

  describe('Performance and Scalability Integration', () => {
    it('should handle concurrent conversations efficiently', async () => {
      const agentConfig = {
        id: 'concurrent-integration-agent',
        name: 'Concurrent Integration Agent',
        type: AgentType.VOICE_ASSISTANT,
        systemPrompt: 'You handle multiple conversations efficiently.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 1000,
        tools: [],
        capabilities: ['concurrency', 'performance'],
      };

      aiAgentService.registerAgent(agentConfig);

      // Start multiple concurrent conversations
      const conversationPromises = [];
      for (let i = 0; i < 5; i++) {
        conversationPromises.push(
          aiAgentService.startConversation(
            'concurrent-integration-agent',
            `Concurrent conversation ${i}`,
            { organizationId: mockOrganizationId, userId: `user-${i}` }
          )
        );
      }

      const conversations = await Promise.all(conversationPromises);
      expect(conversations).toHaveLength(5);

      // Verify all conversations have unique session IDs
      const sessionIds = conversations.map(c => c.sessionId);
      const uniqueSessionIds = new Set(sessionIds);
      expect(uniqueSessionIds.size).toBe(5);

      // Send messages to all conversations concurrently
      const messagePromises = conversations.map((conv, index) =>
        aiAgentService.sendMessage(
          conv.sessionId,
          `Message ${index} to concurrent conversation`,
          { organizationId: mockOrganizationId, userId: `user-${index}` }
        )
      );

      const responses = await Promise.all(messagePromises);
      expect(responses).toHaveLength(5);
      responses.forEach(response => {
        expect(response.message).toBeDefined();
        expect(response.confidence).toBeGreaterThan(0);
      });
    });
  });
});
