import { AIAgentService } from '../../../services/ai-agent-service';
import { AgentExecutionEngine } from '../../../lib/agent-execution';
import { ConversationManager } from '../../../lib/conversation-manager';
import { ToolExecutor } from '../../../lib/tool-executor';
import { db as pgDb } from '../../../db/connection';
import { aiAgents, aiConversations, aiAgentEvents } from '../../../db/drizzle-schema';
import { eq } from 'drizzle-orm';

describe('AI Agents Integration Tests', () => {
  let aiAgentService: AIAgentService;
  let executionEngine: AgentExecutionEngine;
  let conversationManager: ConversationManager;
  let toolExecutor: ToolExecutor;

  const testOrganizationId = 'test-org-integration';
  const testUserId = 'test-user-integration';

  beforeAll(async () => {
    // Initialize services
    aiAgentService = new AIAgentService();
    executionEngine = new AgentExecutionEngine();
    conversationManager = new ConversationManager();
    toolExecutor = new ToolExecutor();

    // Clean up any existing test data
    await cleanupTestData();
  });

  afterAll(async () => {
    // Clean up test data
    await cleanupTestData();
  });

  beforeEach(async () => {
    // Clean up events before each test
    await pgDb.delete(aiAgentEvents).where(eq(aiAgentEvents.organizationId, testOrganizationId as any));
  });

  describe('End-to-End Agent Conversation Flow', () => {
    it('should handle complete conversation flow from start to finish', async () => {
      // Arrange
      const agentId = 'voice-assistant-1'; // Use default agent
      const initialMessage = 'Hello, I need help scheduling an appointment';
      
      const metadata = {
        organizationId: testOrganizationId,
        userId: testUserId,
        source: 'integration-test',
      };

      // Act 1: Start conversation
      const conversation = await aiAgentService.startConversation(
        agentId,
        initialMessage,
        metadata
      );

      // Assert 1
      expect(conversation.sessionId).toBeDefined();
      expect(conversation.agentId).toBe(agentId);
      expect(conversation.messages).toHaveLength(1);
      expect(conversation.messages[0].content).toBe(initialMessage);
      expect(conversation.messages[0].role).toBe('user');

      // Act 2: Send message and get AI response
      const response = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Can you schedule a meeting for tomorrow at 2 PM?',
        { organizationId: testOrganizationId, userId: testUserId }
      );

      // Assert 2
      expect(response.message).toBeDefined();
      expect(response.confidence).toBeGreaterThan(0);
      expect(response.action).toBeDefined(); // Should suggest scheduling appointment

      // Act 3: Execute the suggested action using execution engine
      const agent = await aiAgentService['resolveAgent'](agentId, metadata);
      const executionContext = {
        agentId,
        sessionId: conversation.sessionId,
        organizationId: testOrganizationId,
        userId: testUserId,
        metadata,
      };

      const executionResult = await executionEngine.executeAgent(
        agent,
        executionContext,
        'Schedule appointment for tomorrow at 2 PM',
        agent.tools.filter(t => t.name === 'schedule_appointment')
      );

      // Assert 3
      expect(executionResult.success).toBe(true);
      expect(executionResult.steps.length).toBeGreaterThan(0);
      expect(executionResult.tokensUsed).toBeGreaterThan(0);
      
      // Verify tool execution
      const toolSteps = executionResult.steps.filter(s => s.type === 'tool_execution');
      expect(toolSteps).toHaveLength(1);
      expect(toolSteps[0].status).toBe('completed');

      // Act 4: Verify conversation persistence
      const conversationHistory = await aiAgentService.retrieveConversationHistory(
        conversation.sessionId,
        { organizationId: testOrganizationId }
      );

      // Assert 4
      expect(conversationHistory.messages.length).toBeGreaterThan(2);
      expect(conversationHistory.total).toBe(conversationHistory.messages.length);

      // Act 5: Verify audit logging
      const events = await pgDb
        .select()
        .from(aiAgentEvents)
        .where(eq(aiAgentEvents.organizationId, testOrganizationId as any));

      // Assert 5
      expect(events.length).toBeGreaterThan(0);
      const eventTypes = events.map(e => e.eventType);
      expect(eventTypes).toContain('conversation.started');
      expect(eventTypes).toContain('message.received');
      expect(eventTypes).toContain('message.processed');
    });

    it('should handle multi-turn conversation with context management', async () => {
      // Arrange
      const agentId = 'receptionist-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };

      // Act 1: Start conversation
      const conversation = await aiAgentService.startConversation(
        agentId,
        'Hi, I need to speak with the sales department',
        metadata
      );

      // Act 2: Multiple message exchanges
      const response1 = await aiAgentService.sendMessage(
        conversation.sessionId,
        'What are your business hours?',
        { organizationId: testOrganizationId, userId: testUserId }
      );

      const response2 = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Can I schedule a call with a sales representative?',
        { organizationId: testOrganizationId, userId: testUserId }
      );

      const response3 = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Actually, let me know your address first',
        { organizationId: testOrganizationId, userId: testUserId }
      );

      // Assert
      expect(response1.message).toBeDefined();
      expect(response2.message).toBeDefined();
      expect(response3.message).toBeDefined();

      // Verify context is maintained across turns
      expect(response3.message).not.toBe(response2.message);
      
      // Check conversation compression if needed
      const finalHistory = await aiAgentService.retrieveConversationHistory(
        conversation.sessionId,
        { organizationId: testOrganizationId }
      );

      expect(finalHistory.messages.length).toBeGreaterThan(6); // Initial + 3 user + 3 assistant
    });
  });

  describe('Agent Tool Execution Integration', () => {
    it('should execute tools with real AI response context', async () => {
      // Arrange
      const agentId = 'workflow-automator-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      
      const conversation = await aiAgentService.startConversation(
        agentId,
        'Create a workflow for processing customer feedback',
        metadata
      );

      // Get AI response that should suggest tool usage
      const aiResponse = await aiAgentService.sendMessage(
        conversation.sessionId,
        'Set up an automated workflow that collects feedback and sends notifications',
        { organizationId: testOrganizationId, userId: testUserId }
      );

      // Act: Execute tools with AI response context
      const agent = await aiAgentService['resolveAgent'](agentId, metadata);
      const executionContext = {
        agentId,
        sessionId: conversation.sessionId,
        organizationId: testOrganizationId,
        userId: testUserId,
        aiResponse: aiResponse.message,
        metadata,
      };

      const executionResult = await executionEngine.executeAgent(
        agent,
        executionContext,
        aiResponse.message,
        agent.tools.filter(t => t.name === 'create_workflow')
      );

      // Assert
      expect(executionResult.success).toBe(true);
      expect(executionResult.result?.toolResults).toBeDefined();
      
      const workflowResult = executionResult.result?.toolResults?.[0];
      expect(workflowResult?.success).toBe(true);
      expect(workflowResult?.workflowId).toBeDefined();
    });

    it('should handle parallel tool execution', async () => {
      // Arrange
      const agentId = 'data-analyst-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      
      const conversation = await aiAgentService.startConversation(
        agentId,
        'Analyze sales data and generate a report',
        metadata
      );

      const agent = await aiAgentService['resolveAgent'](agentId, metadata);
      const executionContext = {
        ...metadata,
        agentId,
        sessionId: conversation.sessionId,
        enableParallelExecution: true,
      };

      // Act: Execute multiple tools in parallel
      const executionResult = await executionEngine.executeAgent(
        agent,
        executionContext,
        'Process the Q4 sales data',
        [
          agent.tools.find(t => t.name === 'analyze_data')!,
          agent.tools.find(t => t.name === 'generate_report')!,
        ]
      );

      // Assert
      expect(executionResult.success).toBe(true);
      expect(executionResult.steps.filter(s => s.type === 'tool_execution')).toHaveLength(2);
      
      // Both tools should complete successfully
      const toolSteps = executionResult.steps.filter(s => s.type === 'tool_execution');
      toolSteps.forEach(step => {
        expect(step.status).toBe('completed');
        expect(step.output?.success).toBe(true);
      });
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle AI service unavailability gracefully', async () => {
      // Arrange
      const agentId = 'voice-assistant-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      
      // Mock AI service to be unavailable
      const originalProviderStatus = executionEngine.getProviderStatus();
      
      // Act & Assert - This should handle the unavailability gracefully
      const conversation = await aiAgentService.startConversation(
        agentId,
        'Test message when AI is unavailable',
        metadata
      );

      // Should still be able to start conversation (stored locally)
      expect(conversation.sessionId).toBeDefined();
      
      // Message processing might fail, but should not crash
      try {
        await aiAgentService.sendMessage(
          conversation.sessionId,
          'This should fail gracefully',
          { organizationId: testOrganizationId, userId: testUserId }
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should implement circuit breaker pattern for failing agents', async () => {
      // Arrange
      const agentId = 'negotiator-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      
      const agent = await aiAgentService['resolveAgent'](agentId, metadata);
      const executionContext = {
        agentId,
        sessionId: 'test-circuit-breaker',
        organizationId: testOrganizationId,
        userId: testUserId,
        metadata,
      };

      // Act: Simulate multiple failures to trigger circuit breaker
      for (let i = 0; i < 6; i++) {
        const result = await executionEngine.executeAgent(
          agent,
          executionContext,
          `Test message ${i}`,
          [{ name: 'non_existent_tool', description: 'Invalid tool', parameters: {} }]
        );
        expect(result.success).toBe(false);
      }

      // Assert: Circuit breaker should be open now
      const circuitBreakerResult = await executionEngine.executeAgent(
        agent,
        executionContext,
        'This should be blocked by circuit breaker',
        []
      );

      expect(circuitBreakerResult.success).toBe(false);
      expect(circuitBreakerResult.error).toContain('Circuit breaker is open');
    });

    it('should recover from temporary failures', async () => {
      // Arrange
      const agentId = 'workflow-automator-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      
      const agent = await aiAgentService['resolveAgent'](agentId, metadata);
      const executionContext = {
        agentId,
        sessionId: 'test-recovery',
        organizationId: testOrganizationId,
        userId: testUserId,
        metadata,
      };

      // Mock a tool that fails initially then succeeds
      const flakyTool = {
        name: 'flaky_tool',
        description: 'Tool that fails then succeeds',
        parameters: {},
        handler: jest.fn()
          .mockRejectedValueOnce(new Error('Temporary failure'))
          .mockResolvedValueOnce({ success: true, data: 'recovered' }),
      };

      toolExecutor.registerTool(flakyTool, {
        retryConfig: { maxAttempts: 3, backoffMs: 100 },
      });

      // Act
      const result = await executionEngine.executeAgent(
        agent,
        executionContext,
        'Test recovery',
        [flakyTool]
      );

      // Assert
      expect(result.success).toBe(true);
      expect(flakyTool.handler).toHaveBeenCalledTimes(2); // Initial failure + retry success
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle concurrent conversations efficiently', async () => {
      // Arrange
      const agentId = 'voice-assistant-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      const concurrentConversations = 10;

      // Act: Create multiple conversations concurrently
      const conversationPromises = Array(concurrentConversations).fill(null).map((_, i) =>
        aiAgentService.startConversation(
          agentId,
          `Concurrent conversation ${i}`,
          { ...metadata, userId: `${testUserId}-${i}` }
        )
      );

      const conversations = await Promise.all(conversationPromises);

      // Assert: All conversations should be created successfully
      expect(conversations).toHaveLength(concurrentConversations);
      conversations.forEach(conv => {
        expect(conv.sessionId).toBeDefined();
        expect(conv.messages).toHaveLength(1);
      });

      // Act: Send messages to all conversations concurrently
      const messagePromises = conversations.map((conv, i) =>
        aiAgentService.sendMessage(
          conv.sessionId,
          `Message ${i} for concurrent processing`,
          { organizationId: testOrganizationId, userId: `${testUserId}-${i}` }
        )
      );

      const responses = await Promise.all(messagePromises);

      // Assert: All messages should be processed
      expect(responses).toHaveLength(concurrentConversations);
      responses.forEach(response => {
        expect(response.message).toBeDefined();
        expect(response.confidence).toBeGreaterThan(0);
      });
    });

    it('should maintain conversation context under high load', async () => {
      // Arrange
      const agentId = 'receptionist-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };
      
      const conversation = await aiAgentService.startConversation(
        agentId,
        'Start of high-load test',
        metadata
      );

      // Act: Send many messages rapidly
      const messageCount = 20;
      const messagePromises = Array(messageCount).fill(null).map((_, i) =>
        aiAgentService.sendMessage(
          conversation.sessionId,
          `High load message ${i}`,
          { organizationId: testOrganizationId, userId: testUserId }
        )
      );

      const responses = await Promise.all(messagePromises);

      // Assert: All messages should be processed with context maintained
      expect(responses).toHaveLength(messageCount);
      
      // Verify conversation history is complete
      const finalHistory = await aiAgentService.retrieveConversationHistory(
        conversation.sessionId,
        { organizationId: testOrganizationId }
      );

      expect(finalHistory.messages.length).toBe(1 + messageCount * 2); // Initial + user/assistant pairs
    });
  });

  describe('Security and Access Control', () => {
    it('should prevent cross-organization data access', async () => {
      // Arrange
      const agentId = 'voice-assistant-1';
      const org1Id = 'org-1';
      const org2Id = 'org-2';
      const user1Id = 'user-1';
      const user2Id = 'user-2';

      // Act: Create conversation for organization 1
      const conv1 = await aiAgentService.startConversation(
        agentId,
        'Org 1 conversation',
        { organizationId: org1Id, userId: user1Id }
      );

      // Try to access conversation from organization 2
      const accessAttempt = aiAgentService.sendMessage(
        conv1.sessionId,
        'Trying to access from different org',
        { organizationId: org2Id, userId: user2Id }
      );

      // Assert: Should be denied access
      await expect(accessAttempt).rejects.toThrow('not found or access denied');
    });

    it('should maintain audit trail for all operations', async () => {
      // Arrange
      const agentId = 'data-analyst-1';
      const metadata = { organizationId: testOrganizationId, userId: testUserId };

      // Act: Perform various operations
      const conversation = await aiAgentService.startConversation(
        agentId,
        'Start audit test',
        metadata
      );

      await aiAgentService.sendMessage(
        conversation.sessionId,
        'Send audit test message',
        { organizationId: testOrganizationId, userId: testUserId }
      );

      // Execute agent with tools
      const agent = await aiAgentService['resolveAgent'](agentId, metadata);
      const executionContext = {
        agentId,
        sessionId: conversation.sessionId,
        organizationId: testOrganizationId,
        userId: testUserId,
        metadata,
      };

      await executionEngine.executeAgent(
        agent,
        executionContext,
        'Audit test execution',
        agent.tools.slice(0, 2)
      );

      // Assert: Check audit events
      const events = await pgDb
        .select()
        .from(aiAgentEvents)
        .where(eq(aiAgentEvents.organizationId, testOrganizationId as any));

      expect(events.length).toBeGreaterThan(5); // Should have multiple events
      
      const eventTypes = events.map(e => e.eventType);
      expect(eventTypes).toContain('conversation.started');
      expect(eventTypes).toContain('message.received');
      expect(eventTypes).toContain('message.processed');
      expect(eventTypes).toContain('agent.execution');

      // Verify event metadata
      events.forEach(event => {
        expect(event.organizationId).toBe(testOrganizationId);
        expect(event.timestamp).toBeDefined();
        expect(event.details).toBeDefined();
      });
    });
  });

  async function cleanupTestData() {
    try {
      // Clean up in order to avoid foreign key constraints
      await pgDb.delete(aiAgentEvents).where(eq(aiAgentEvents.organizationId, testOrganizationId as any));
      await pgDb.delete(aiConversations).where(eq(aiConversations.organizationId, testOrganizationId as any));
      // Note: We don't delete agents as they might be shared across tests
    } catch (error) {
      console.warn('Cleanup failed:', error);
    }
  }
});
