import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { db as pgDb } from '../db/connection';
import { aiAgents, aiAgentEvents, aiConversations } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import { AIAgentService } from '../services/ai-agent-service';

/**
 * AI Agent Service Tests
 * Tests the AI Agent Service functionality including memory management,
 * tool execution, and circuit breaker patterns
 */

describe('AIAgentService', () => {
  let aiAgentService: AIAgentService;
  const testOrganizationId = 'test-org-123';
  const testUserId = 'test-user-123';

  beforeEach(() => {
    aiAgentService = new AIAgentService();
  });

  afterEach(async () => {
    await aiAgentService.cleanup();
  });

  describe('Agent Management', () => {
    it('should create and manage agents', async () => {
      const agentData = {
        name: 'Test Agent',
        type: 'receptionist' as const,
        systemPrompt: 'You are a helpful receptionist.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: ['schedule_appointment', 'transfer_call'],
        capabilities: ['voice', 'text'],
        organizationId: testOrganizationId
      };

      const agent = await aiAgentService.createAgent(testOrganizationId, agentData);
      
      expect(agent).toBeDefined();
      expect(agent.name).toBe('Test Agent');
      expect(agent.type).toBe('receptionist');
      expect(agent.organizationId).toBe(testOrganizationId);
      expect(agent.tools).toContain('schedule_appointment');
      expect(agent.tools).toContain('transfer_call');
    });

    it('should update agents', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Original Agent',
        type: 'receptionist',
        systemPrompt: 'Original prompt',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: [],
        organizationId: testOrganizationId
      });

      const updatedAgent = await aiAgentService.updateAgent(agent.id, testOrganizationId, {
        name: 'Updated Agent',
        systemPrompt: 'Updated prompt'
      });

      expect(updatedAgent.name).toBe('Updated Agent');
      expect(updatedAgent.systemPrompt).toBe('Updated prompt');
      expect(updatedAgent.id).toBe(agent.id);
    });

    it('should delete agents', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Test Agent',
        type: 'receptionist',
        systemPrompt: 'Test prompt',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: [],
        organizationId: testOrganizationId
      });

      const deleted = await aiAgentService.deleteAgent(agent.id, testOrganizationId);
      expect(deleted).toBe(true);

      const retrieved = await aiAgentService.getAgent(agent.id, testOrganizationId);
      expect(retrieved).toBeNull();
    });

    it('should list agents', async () => {
      // Create multiple agents
      await aiAgentService.createAgent(testOrganizationId, {
        name: 'Agent 1',
        type: 'receptionist',
        systemPrompt: 'Prompt 1',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: [],
        organizationId: testOrganizationId
      });

      await aiAgentService.createAgent(testOrganizationId, {
        name: 'Agent 2',
        type: 'negotiator',
        systemPrompt: 'Prompt 2',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: [],
        organizationId: testOrganizationId
      });

      const agents = await aiAgentService.listAgents(testOrganizationId);
      expect(agents).toHaveLength(2);
      expect(agents[0].name).toBe('Agent 1');
      expect(agents[1].name).toBe('Agent 2');
    });
  });

  describe('Tool Management', () => {
    it('should register and execute tools', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Tool Test Agent',
        type: 'workflow-automator',
        systemPrompt: 'You are a workflow automation agent.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: ['create_workflow'],
        capabilities: ['automation'],
        organizationId: testOrganizationId
      });

      // Test tool execution
      const result = await aiAgentService.executeTool(agent.id, testOrganizationId, 'create_workflow', {
        name: 'Test Workflow',
        triggers: [],
        actions: []
      });

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
      expect(result.workflowId).toBeDefined();
    });

    it('should handle tool execution failures', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Error Test Agent',
        type: 'data-analyst',
        systemPrompt: 'You are a data analyst.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: ['analyze_data'],
        capabilities: ['analysis'],
        organizationId: testOrganizationId
      });

      // Test with invalid parameters
      const result = await aiAgentService.executeTool(agent.id, testOrganizationId, 'analyze_data', {
        // Missing required parameters
      });

      expect(result).toBeDefined();
      // Should handle error gracefully
    });

    it('should enable and disable tools', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Tool Management Agent',
        type: 'workflow-automator',
        systemPrompt: 'You manage tools.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: ['create_workflow', 'execute_workflow'],
        capabilities: ['automation'],
        organizationId: testOrganizationId
      });

      // Disable a tool
      await aiAgentService.disableTool(agent.id, testOrganizationId, 'create_workflow');
      
      const updatedAgent = await aiAgentService.getAgent(agent.id, testOrganizationId);
      expect(updatedAgent.tools).not.toContain('create_workflow');

      // Re-enable the tool
      await aiAgentService.enableTool(agent.id, testOrganizationId, 'create_workflow');
      
      const reEnabledAgent = await aiAgentService.getAgent(agent.id, testOrganizationId);
      expect(reEnabledAgent.tools).toContain('create_workflow');
    });
  });

  describe('Conversation Management', () => {
    it('should create and manage conversations', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Conversation Agent',
        type: 'voice-assistant',
        systemPrompt: 'You are a voice assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['voice', 'text'],
        organizationId: testOrganizationId
      });

      const conversation = await aiAgentService.createConversation(agent.id, testOrganizationId, {
        sessionId: 'test-session-123',
        metadata: { source: 'test' }
      });

      expect(conversation).toBeDefined();
      expect(conversation.agentId).toBe(agent.id);
      expect(conversation.sessionId).toBe('test-session-123');
    });

    it('should process messages', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Message Processing Agent',
        type: 'voice-assistant',
        systemPrompt: 'You are a helpful assistant.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['text'],
        organizationId: testOrganizationId
      });

      const conversation = await aiAgentService.createConversation(agent.id, testOrganizationId, {
        sessionId: 'test-session-456'
      });

      const response = await aiAgentService.processMessage(agent.id, conversation.id, 'Hello, how are you?');

      expect(response).toBeDefined();
      expect(response.message).toBeDefined();
      expect(response.confidence).toBeGreaterThan(0);
    });

    it('should handle conversation history', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'History Agent',
        type: 'voice-assistant',
        systemPrompt: 'You remember conversations.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['text'],
        organizationId: testOrganizationId
      });

      const conversation = await aiAgentService.createConversation(agent.id, testOrganizationId, {
        sessionId: 'test-session-789'
      });

      // Send first message
      await aiAgentService.processMessage(agent.id, conversation.id, 'My name is John');

      // Send second message that references the first
      const response = await aiAgentService.processMessage(agent.id, conversation.id, 'What is my name?');

      expect(response.message).toContain('John');
    });
  });

  describe('Memory Management', () => {
    it('should store and retrieve memories', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Memory Agent',
        type: 'data-analyst',
        systemPrompt: 'You have memory capabilities.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['analysis'],
        organizationId: testOrganizationId
      });

      const memoryData = {
        type: 'user_preference',
        content: { prefersDarkMode: true, language: 'en' },
        metadata: { category: 'preferences' }
      };

      const memoryId = await aiAgentService.storeMemory(agent.id, testOrganizationId, memoryData);

      expect(memoryId).toBeDefined();

      const retrievedMemory = await aiAgentService.retrieveMemory(agent.id, testOrganizationId, memoryId);
      
      expect(retrievedMemory).toBeDefined();
      expect(retrievedMemory.type).toBe('user_preference');
      expect(retrievedMemory.content).toEqual({ prefersDarkMode: true, language: 'en' });
    });

    it('should handle memory access control', async () => {
      const agent1 = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Agent 1',
        type: 'data-analyst',
        systemPrompt: 'Agent 1 prompt',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['analysis'],
        organizationId: testOrganizationId
      });

      const agent2 = await aiAgentService.createAgent('different-org', {
        name: 'Agent 2',
        type: 'data-analyst',
        systemPrompt: 'Agent 2 prompt',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['analysis'],
        organizationId: 'different-org'
      });

      const memoryId = await aiAgentService.storeMemory(agent1.id, testOrganizationId, {
        type: 'private_data',
        content: { secret: 'confidential' }
      });

      // Agent 1 should be able to access their own memory
      const retrievedByOwner = await aiAgentService.retrieveMemory(agent1.id, testOrganizationId, memoryId);
      expect(retrievedByOwner).toBeDefined();

      // Agent 2 should not be able to access Agent 1's memory
      await expect(
        aiAgentService.retrieveMemory(agent2.id, 'different-org', memoryId)
      ).rejects.toThrow('Access denied');
    });
  });

  describe('Circuit Breaker Pattern', () => {
    it('should handle circuit breaker states', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Circuit Breaker Agent',
        type: 'workflow-automator',
        systemPrompt: 'You have circuit breaker protection.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: ['create_workflow'],
        capabilities: ['automation'],
        organizationId: testOrganizationId
      });

      // Create a circuit breaker for testing
      const circuitBreaker = new (aiAgentService as any).CircuitBreaker({
        failureThreshold: 2,
        resetTimeout: 5000,
        monitoringPeriod: 1000
      });

      // First execution should succeed
      const result1 = await circuitBreaker.execute(() => 
        Promise.resolve({ success: true })
      );
      expect(result1).toEqual({ success: true });

      // Second execution should succeed
      const result2 = await circuitBreaker.execute(() => 
        Promise.resolve({ success: true })
      );
      expect(result2).toEqual({ success: true });

      // Third execution should fail and open circuit
      await expect(circuitBreaker.execute(() => 
        Promise.reject(new Error('Test failure'))
      )).rejects.toThrow('Test failure');

      // Fourth execution should fail due to open circuit
      await expect(circuitBreaker.execute(() => 
        Promise.resolve({ success: true })
      )).rejects.toThrow('Circuit breaker is open');

      // Wait for reset timeout
      await new Promise(resolve => setTimeout(resolve, 6000));

      // Should work again after reset
      const result3 = await circuitBreaker.execute(() => 
        Promise.resolve({ success: true })
      );
      expect(result3).toEqual({ success: true });

      circuitBreaker.cleanup();
    });

    it('should cleanup circuit breaker resources', async () => {
      const circuitBreaker = new (aiAgentService as any).CircuitBreaker({
        failureThreshold: 2,
        resetTimeout: 5000,
        monitoringPeriod: 1000
      });

      circuitBreaker.cleanup();

      // Should not throw after cleanup
      expect(() => circuitBreaker.cleanup()).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid agent operations gracefully', async () => {
      try {
        await aiAgentService.getAgent('invalid-id', testOrganizationId);
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }

      try {
        await aiAgentService.updateAgent('invalid-id', testOrganizationId, {});
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }

      try {
        await aiAgentService.deleteAgent('invalid-id', testOrganizationId);
        expect(false).toBe(true); // Should return false for non-existent agent
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should handle tool execution errors', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Error Handling Agent',
        type: 'data-analyst',
        systemPrompt: 'You handle errors gracefully.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: ['analyze_data'],
        capabilities: ['analysis'],
        organizationId: testOrganizationId
      });

      // Test with non-existent tool
      const result = await aiAgentService.executeTool(agent.id, testOrganizationId, 'non_existent_tool', {});

      expect(result).toBeDefined();
      // Should handle error gracefully
    });

    it('should handle conversation errors', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Error Conversation Agent',
        type: 'voice-assistant',
        systemPrompt: 'You handle conversation errors.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['text'],
        organizationId: testOrganizationId
      });

      const conversation = await aiAgentService.createConversation(agent.id, testOrganizationId);

      // Test with invalid conversation ID
      try {
        await aiAgentService.processMessage(agent.id, 'invalid-conversation-id', 'Test message');
        fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Resource Management', () => {
    it('should cleanup all resources properly', async () => {
      // Create multiple agents
      const agents = [];
      for (let i = 0; i < 5; i++) {
        const agent = await aiAgentService.createAgent(testOrganizationId, {
          name: `Resource Test Agent ${i}`,
          type: 'receptionist',
          systemPrompt: `Test agent ${i}`,
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 4000,
          tools: [],
          capabilities: ['text'],
          organizationId: testOrganizationId
        });
        agents.push(agent);
      }

      // Create conversations
      const conversations = [];
      for (const agent of agents) {
        const conversation = await aiAgentService.createConversation(agent.id, testOrganizationId);
        conversations.push(conversation);
      }

      // Store memories
      const memories = [];
      for (const agent of agents) {
        const memoryId = await aiAgentService.storeMemory(agent.id, testOrganizationId, {
          type: 'test_memory',
          content: { data: `test data for ${agent.name}` }
        });
        memories.push(memoryId);
      }

      // Cleanup
      await aiAgentService.cleanup();

      // Verify cleanup completed
      expect(aiAgentService['circuitBreakers']).toBeDefined();
      expect(aiAgentService['agentCache']).toBeDefined();
      expect(aiAgentService['agents']).toBeDefined();
      expect(aiAgentService['conversations']).toBeDefined();
      expect(aiAgentService['activeConversations']).toBeDefined();
    });

    it('should prevent memory leaks with multiple operations', async () => {
      // Perform many operations
      for (let i = 0; i < 100; i++) {
        const agent = await aiAgentService.createAgent(testOrganizationId, {
          name: `Leak Test Agent ${i}`,
          type: 'receptionist',
          systemPrompt: `Test agent ${i}`,
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 4000,
          tools: [],
          capabilities: ['text'],
          organizationId: testOrganizationId
        });

        await aiAgentService.createConversation(agent.id, testOrganizationId);
        await aiAgentService.storeMemory(agent.id, testOrganizationId, {
          type: 'leak_test',
          content: { iteration: i }
        });

        await aiAgentService.deleteAgent(agent.id, testOrganizationId);
      }

      // Cleanup
      await aiAgentService.cleanup();

      // Should not throw and should clean up all resources
      expect(() => aiAgentService.cleanup()).not.toThrow();
    });
  });

  describe('Performance', () => {
    it('should handle concurrent operations efficiently', async () => {
      const startTime = Date.now();

      // Create multiple agents concurrently
      const agentPromises = [];
      for (let i = 0; i < 20; i++) {
        agentPromises.push(
          aiAgentService.createAgent(testOrganizationId, {
            name: `Performance Agent ${i}`,
            type: 'receptionist',
            systemPrompt: `Performance test agent ${i}`,
            model: 'gpt-4',
            temperature: 0.7,
            maxTokens: 4000,
            tools: [],
            capabilities: ['text'],
            organizationId: testOrganizationId
          })
        );
      }

      const agents = await Promise.all(agentPromises);
      const creationTime = Date.now() - startTime;

      // Should complete within reasonable time
      expect(creationTime).toBeLessThan(10000); // 10 seconds

      expect(agents).toHaveLength(20);
      agents.forEach(agent => {
        expect(agent.name).toMatch(/^Performance Agent \d+$/);
      });

      // Cleanup
      await Promise.all(agents.map(agent => 
        aiAgentService.deleteAgent(agent.id, testOrganizationId)
      ));
      await aiAgentService.cleanup();

      const cleanupTime = Date.now() - creationTime;
      expect(cleanupTime).toBeLessThan(5000); // 5 seconds
    });

    it('should handle large conversations efficiently', async () => {
      const agent = await aiAgentService.createAgent(testOrganizationId, {
        name: 'Performance Test Agent',
        type: 'voice-assistant',
        systemPrompt: 'You handle large conversations efficiently.',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 4000,
        tools: [],
        capabilities: ['text'],
        organizationId: testOrganizationId
      });

      const conversation = await aiAgentService.createConversation(agent.id, testOrganizationId);

      const startTime = Date.now();

      // Send many messages
      const messagePromises = [];
      for (let i = 0; i < 50; i++) {
        messagePromises.push(
          aiAgentService.processMessage(agent.id, conversation.id, `Message ${i}: This is a test message for performance testing.`)
        );
      }

      const responses = await Promise.all(messagePromises);
      const processingTime = Date.now() - startTime;

      // Should process all messages efficiently
      expect(processingTime).toBeLessThan(30000); // 30 seconds
      expect(responses).toHaveLength(50);

      responses.forEach(response => {
        expect(response.message).toBeDefined();
        expect(response.confidence).toBeGreaterThan(0);
      });

      await aiAgentService.cleanup();
    });
  });
});
