import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { Hono } from 'hono';
import { aiAgentService } from '../../services/ai-agent-service';
import { userManagementService } from '../../services/user-management-service';
import { organizationManagementService } from '../../services/organization-management-service';
import { agentMemoryService } from '../../services/agent-memory-service';
import { auditLogService } from '../../services/consolidated-audit-service';
import { createApp } from '../../hono';

describe('AI Agent Integration Tests', () => {
  let app: Hono;
  let testOrganization: any;
  let testUser: any;
  let authToken: string;
  let testAgent: any;
  let testConversation: any;

  beforeAll(async () => {
    app = createApp();

    // Create test organization
    testOrganization = await organizationManagementService.createOrganization({
      name: 'AI Test Organization',
      slug: 'ai-test-org',
      ownerId: 'test-owner-id',
      billingEmail: 'billing@test.com',
      plan: 'enterprise',
    });

    // Create test user
    testUser = await userManagementService.createUser({
      email: 'ai.user@test.com',
      password: 'SecurePass123!',
      firstName: 'AI',
      lastName: 'User',
      organizationId: testOrganization.id,
      role: 'user',
    });

    // Get auth token
    const loginResponse = await app.request('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: 'SecurePass123!',
      }),
    });

    authToken = (await loginResponse.json()).data.token;

    await setupTestEnvironment();
  });

  afterAll(async () => {
    await cleanupTestData();
    await teardownTestEnvironment();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await cleanupConversationData();
  });

  describe('Agent Creation Flow', () => {
    it('should create AI agent with configuration', async () => {
      const agentData = {
        name: 'Test Assistant',
        type: 'chat',
        description: 'A helpful AI assistant',
        model: 'gpt-4',
        configuration: {
          temperature: 0.7,
          maxTokens: 1000,
          systemPrompt: 'You are a helpful assistant.',
          tools: ['web_search', 'calculator'],
        },
        capabilities: ['text_generation', 'tool_use'],
      };

      const response = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(agentData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        name: agentData.name,
        type: agentData.type,
        organizationId: testOrganization.id,
        status: 'active',
      });

      testAgent = result.data;
    });

    it('should validate agent configuration', async () => {
      const invalidAgentData = {
        name: '', // Empty name should fail
        type: 'invalid_type', // Invalid type
        configuration: {
          temperature: 2.0, // Invalid temperature (should be 0-2)
          maxTokens: -1, // Invalid max tokens
        },
      };

      const response = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(invalidAgentData),
      });

      expect(response.status).toBe(400);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('validation');
    });

    it('should create specialized agent types', async () => {
      const specializedAgents = [
        {
          name: 'Task Agent',
          type: 'task',
          capabilities: ['task_execution', 'workflow_automation'],
        },
        {
          name: 'Workflow Agent',
          type: 'workflow',
          capabilities: ['workflow_management', 'decision_making'],
        },
        {
          name: 'Analytical Agent',
          type: 'analytical',
          capabilities: ['data_analysis', 'reporting'],
        },
      ];

      for (const agentData of specializedAgents) {
        const response = await app.request('/api/ai-agents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(agentData),
        });

        expect(response.status).toBe(201);
        
        const result = await response.json();
        expect(result.success).toBe(true);
        expect(result.data.type).toBe(agentData.type);
        expect(result.data.capabilities).toEqual(expect.arrayContaining(agentData.capabilities));
      }
    });
  });

  describe('Conversation Management Flow', () => {
    beforeEach(async () => {
      // Create test agent for conversation tests
      const agentData = {
        name: 'Conversation Agent',
        type: 'chat',
        configuration: {
          temperature: 0.7,
          maxTokens: 500,
          systemPrompt: 'You are a helpful assistant.',
        },
      };

      const response = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(agentData),
      });

      testAgent = (await response.json()).data;
    });

    it('should start conversation with agent', async () => {
      const conversationData = {
        agentId: testAgent.id,
        title: 'Test Conversation',
        initialMessage: 'Hello, how can you help me?',
      };

      const response = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversationData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        agentId: testAgent.id,
        userId: testUser.id,
        title: conversationData.title,
        status: 'active',
      });

      testConversation = result.data;

      // Should have initial messages
      expect(result.data.messages).toHaveLength(2); // User + Assistant
      expect(result.data.messages[0]).toMatchObject({
        role: 'user',
        content: conversationData.initialMessage,
      });
      expect(result.data.messages[1]).toMatchObject({
        role: 'assistant',
        content: expect.any(String),
      });
    });

    it('should maintain conversation context', async () => {
      // Start conversation
      const startResponse = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          agentId: testAgent.id,
          title: 'Context Test',
          initialMessage: 'My name is John.',
        }),
      });

      const conversation = (await startResponse.json()).data;

      // Send follow-up message
      const followUpResponse = await app.request(
        `/api/ai-conversations/${conversation.id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            content: 'What is my name?',
          }),
        }
      );

      expect(followUpResponse.status).toBe(200);
      
      const result = await followUpResponse.json();
      expect(result.success).toBe(true);
      expect(result.data.content).toContain('John'); // Should remember the name
    });

    it('should handle conversation branching', async () => {
      // Start conversation
      const startResponse = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          agentId: testAgent.id,
          title: 'Branching Test',
          initialMessage: 'Tell me about AI.',
        }),
      });

      const conversation = (await startResponse.json()).data;

      // Create branch
      const branchResponse = await app.request(
        `/api/ai-conversations/${conversation.id}/branch`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            fromMessageId: conversation.messages[1].id,
            newMessage: 'Actually, tell me about machine learning.',
          }),
        }
      );

      expect(branchResponse.status).toBe(200);
      
      const result = await branchResponse.json();
      expect(result.success).toBe(true);
      expect(result.data.parentConversationId).toBe(conversation.id);
      expect(result.data.messages).toHaveLength(3); // User + Assistant + New user
    });

    it('should enforce conversation limits', async () => {
      // Create agent with low token limit
      const limitedAgent = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          name: 'Limited Agent',
          type: 'chat',
          configuration: {
            maxTokens: 10, // Very low limit
          },
        }),
      });

      const agent = (await limitedAgent.json()).data;

      // Start conversation
      const conversationResponse = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          agentId: agent.id,
          title: 'Limit Test',
          initialMessage: 'Write a very long response.',
        }),
      });

      const conversation = (await conversationResponse.json()).data;

      // Response should be truncated due to token limit
      const assistantMessage = conversation.messages.find(m => m.role === 'assistant');
      expect(assistantMessage.content.length).toBeLessThan(200); // Should be short
    });
  });

  describe('Tool Execution Flow', () => {
    beforeEach(async () => {
      // Create agent with tools
      const agentData = {
        name: 'Tool Agent',
        type: 'task',
        configuration: {
          tools: [
            {
              name: 'calculator',
              description: 'Perform mathematical calculations',
              parameters: {
                expression: { type: 'string', required: true },
              },
            },
            {
              name: 'web_search',
              description: 'Search the web',
              parameters: {
                query: { type: 'string', required: true },
                limit: { type: 'number', default: 5 },
              },
            },
          ],
        },
      };

      const response = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(agentData),
      });

      testAgent = (await response.json()).data;
    });

    it('should execute tools during conversation', async () => {
      const conversationData = {
        agentId: testAgent.id,
        title: 'Tool Test',
        initialMessage: 'What is 25 * 4?',
      };

      const response = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversationData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);

      // Check if tool was executed
      const messages = result.data.messages;
      const toolCall = messages.find(m => m.toolCalls && m.toolCalls.length > 0);
      expect(toolCall).toBeTruthy();

      if (toolCall.toolCalls) {
        const calculatorCall = toolCall.toolCalls.find((tc: any) => tc.name === 'calculator');
        expect(calculatorCall).toBeTruthy();
        expect(calculatorCall.parameters.expression).toBe('25 * 4');
      }

      // Final response should contain the result
      const finalMessage = messages[messages.length - 1];
      expect(finalMessage.content).toContain('100');
    });

    it('should handle tool execution failures', async () => {
      // Mock tool failure
      const originalExecuteTool = aiAgentService.executeTool;
      aiAgentService.executeTool = jest.fn().mockRejectedValue(
        new Error('Tool execution failed')
      );

      const conversationData = {
        agentId: testAgent.id,
        title: 'Tool Failure Test',
        initialMessage: 'Calculate something for me.',
      };

      const response = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversationData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);

      // Should handle tool failure gracefully
      const messages = result.data.messages;
      const errorMessage = messages.find(m => m.content.includes('error') || m.content.includes('failed'));
      expect(errorMessage).toBeTruthy();

      // Restore original method
      aiAgentService.executeTool = originalExecuteTool;
    });

    it('should enforce tool permissions', async () => {
      // Create agent without web search tool
      const restrictedAgentData = {
        name: 'Restricted Agent',
        type: 'task',
        configuration: {
          tools: [
            {
              name: 'calculator',
              description: 'Perform calculations',
            },
          ],
        },
      };

      const agentResponse = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(restrictedAgentData),
      });

      const restrictedAgent = (await agentResponse.json()).data;

      const conversationData = {
        agentId: restrictedAgent.id,
        title: 'Permission Test',
        initialMessage: 'Search the web for latest news.',
      };

      const response = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversationData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);

      // Should not attempt to use web search tool
      const messages = result.data.messages;
      const webSearchCall = messages.find(m => 
        m.toolCalls && m.toolCalls.some((tc: any) => tc.name === 'web_search')
      );
      expect(webSearchCall).toBeFalsy();

      // Should respond with inability to perform the task
      const finalMessage = messages[messages.length - 1];
      expect(finalMessage.content).toMatch(/cannot|unable|don't have access/i);
    });
  });

  describe('Memory Management Flow', () => {
    beforeEach(async () => {
      // Create agent with memory
      const agentData = {
        name: 'Memory Agent',
        type: 'chat',
        configuration: {
          memoryEnabled: true,
          memoryType: 'long_term',
        },
      };

      const response = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(agentData),
      });

      testAgent = (await response.json()).data;
    });

    it('should store and retrieve conversation memory', async () => {
      // First conversation
      const conversation1Data = {
        agentId: testAgent.id,
        title: 'Memory Test 1',
        initialMessage: 'My favorite color is blue.',
      };

      await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversation1Data),
      });

      // Second conversation
      const conversation2Data = {
        agentId: testAgent.id,
        title: 'Memory Test 2',
        initialMessage: 'What is my favorite color?',
      };

      const response = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversation2Data),
      });

      const result = await response.json();
      expect(result.success).toBe(true);

      // Should remember from previous conversation
      const finalMessage = result.data.messages[result.data.messages.length - 1];
      expect(finalMessage.content).toContain('blue');
    });

    it('should manage memory limits', async () => {
      // Create many conversations to test memory limits
      const conversations = [];
      for (let i = 0; i < 10; i++) {
        const conversationData = {
          agentId: testAgent.id,
          title: `Memory Limit Test ${i}`,
          initialMessage: `Memory test message ${i}`,
        };

        const response = await app.request('/api/ai-conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(conversationData),
        });

        conversations.push((await response.json()).data);
      }

      // Check memory usage
      const memoryResponse = await app.request(`/api/ai-agents/${testAgent.id}/memory`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const memoryResult = await memoryResponse.json();
      expect(memoryResult.success).toBe(true);
      expect(memoryResult.data).toMatchObject({
        totalMemories: expect.any(Number),
        memoryUsage: expect.any(Object),
        limits: expect.any(Object),
      });

      // Memory usage should be within limits
      expect(memoryResult.data.memoryUsage.percentage).toBeLessThanOrEqual(100);
    });

    it('should allow memory cleanup', async () => {
      // Create some memories
      for (let i = 0; i < 5; i++) {
        await app.request('/api/ai-conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            agentId: testAgent.id,
            title: `Cleanup Test ${i}`,
            initialMessage: `Test message ${i}`,
          }),
        });
      }

      // Check initial memory count
      const initialMemoryResponse = await app.request(`/api/ai-agents/${testAgent.id}/memory`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const initialMemory = (await initialMemoryResponse.json()).data.totalMemories;

      // Cleanup old memories
      const cleanupResponse = await app.request(`/api/ai-agents/${testAgent.id}/memory/cleanup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          olderThan: '1h',
          keepCount: 3,
        }),
      });

      expect(cleanupResponse.status).toBe(200);
      
      const cleanupResult = await cleanupResponse.json();
      expect(cleanupResult.success).toBe(true);
      expect(cleanupResult.data.cleanedUp).toBeGreaterThan(0);

      // Verify memory was cleaned up
      const finalMemoryResponse = await app.request(`/api/ai-agents/${testAgent.id}/memory`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const finalMemory = (await finalMemoryResponse.json()).data.totalMemories;
      expect(finalMemory).toBeLessThan(initialMemory);
    });
  });

  describe('Multi-Agent Coordination Flow', () => {
    let coordinatorAgent: any;
    let workerAgents: any[] = [];

    beforeEach(async () => {
      // Create coordinator agent
      const coordinatorData = {
        name: 'Coordinator Agent',
        type: 'workflow',
        configuration: {
          role: 'coordinator',
          coordinationEnabled: true,
        },
      };

      const coordinatorResponse = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(coordinatorData),
      });

      coordinatorAgent = (await coordinatorResponse.json()).data;

      // Create worker agents
      const workerTypes = ['research', 'analysis', 'writing'];
      for (const type of workerTypes) {
        const workerData = {
          name: `${type.charAt(0).toUpperCase() + type.slice(1)} Agent`,
          type: 'task',
          configuration: {
            role: 'worker',
            specialization: type,
          },
        };

        const workerResponse = await app.request('/api/ai-agents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(workerData),
        });

        workerAgents.push((await workerResponse.json()).data);
      }
    });

    it('should coordinate multiple agents for complex tasks', async () => {
      const taskData = {
        description: 'Research and write a summary of artificial intelligence',
        coordinatorId: coordinatorAgent.id,
        workerIds: workerAgents.map(a => a.id),
        workflow: [
          { step: 'research', agentId: workerAgents[0].id },
          { step: 'analysis', agentId: workerAgents[1].id },
          { step: 'writing', agentId: workerAgents[2].id },
        ],
      };

      const response = await app.request('/api/ai-coordination/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(taskData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data).toMatchObject({
        description: taskData.description,
        coordinatorId: coordinatorAgent.id,
        status: 'running',
      });

      // Wait for coordination to complete
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check task status
      const statusResponse = await app.request(`/api/ai-coordination/tasks/${result.data.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const status = await statusResponse.json();
      expect(status.success).toBe(true);
      expect(['running', 'completed']).toContain(status.data.status);

      if (status.data.status === 'completed') {
        expect(status.data.result).toBeDefined();
        expect(status.data.executionLog).toHaveLength(3); // 3 steps
      }
    });

    it('should handle agent communication', async () => {
      // Start coordinated conversation
      const conversationData = {
        coordinatorId: coordinatorAgent.id,
        participants: workerAgents.map(a => a.id),
        initialMessage: 'Let\'s work together to analyze market trends.',
      };

      const response = await app.request('/api/ai-coordination/conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(conversationData),
      });

      expect(response.status).toBe(201);
      
      const result = await response.json();
      expect(result.success).toBe(true);
      expect(result.data.participants).toHaveLength(3);

      // Send message to specific agent
      const messageResponse = await app.request(
        `/api/ai-coordination/conversations/${result.data.id}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            content: 'Research agent, please find recent market data.',
            targetAgentId: workerAgents[0].id,
          }),
        }
      );

      expect(messageResponse.status).toBe(200);
      
      const messageResult = await messageResponse.json();
      expect(messageResult.success).toBe(true);
      expect(messageResult.data.targetAgentId).toBe(workerAgents[0].id);
    });

    it('should handle agent failures and fallbacks', async () => {
      // Mock worker agent failure
      const originalExecuteTool = aiAgentService.executeTool;
      aiAgentService.executeTool = jest.fn().mockImplementation((toolName, params) => {
        if (toolName === 'web_search') {
          throw new Error('Search service unavailable');
        }
        return originalExecuteTool(toolName, params);
      });

      const taskData = {
        description: 'Search for and analyze recent news',
        coordinatorId: coordinatorAgent.id,
        workerIds: workerAgents.map(a => a.id),
        fallbackEnabled: true,
      };

      const response = await app.request('/api/ai-coordination/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(taskData),
      });

      expect(response.status).toBe(201);

      // Wait for task completion
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check that fallback was used
      const statusResponse = await app.request(`/api/ai-coordination/tasks/${(await response.json()).data.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      const status = await statusResponse.json();
      expect(status.data.executionLog).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            status: 'failed',
            fallbackUsed: true,
          }),
        ])
      );

      // Restore original method
      aiAgentService.executeTool = originalExecuteTool;
    });
  });

  describe('Cross-Service Integration', () => {
    it('should integrate with audit service for compliance', async () => {
      // Create agent and start conversation
      const agentData = {
        name: 'Audit Test Agent',
        type: 'chat',
      };

      const agentResponse = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(agentData),
      });

      const agent = (await agentResponse.json()).data;

      const conversationResponse = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          agentId: agent.id,
          title: 'Audit Test',
          initialMessage: 'Hello',
        }),
      });

      // Verify audit logs
      const auditLogs = await auditLogService.getAuditLogs(testOrganization.id, {
        resource: 'ai_agent',
      });

      expect(auditLogs.logs.length).toBeGreaterThan(0);
      
      const logActions = auditLogs.logs.map(log => log.action);
      expect(logActions).toContain('agent_created');
      expect(logActions).toContain('conversation_started');
      expect(logActions).toContain('message_sent');
    });

    it('should integrate with memory service', async () => {
      const memorySpy = jest.spyOn(agentMemoryService, 'storeMemory');

      // Create agent with memory
      const agentData = {
        name: 'Memory Integration Agent',
        type: 'chat',
        configuration: {
          memoryEnabled: true,
        },
      };

      const agentResponse = await app.request('/api/ai-agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(agentData),
      });

      const agent = (await agentResponse.json()).data;

      await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          agentId: agent.id,
          title: 'Memory Integration Test',
          initialMessage: 'Remember this important information.',
        }),
      });

      // Verify memory was stored
      expect(memorySpy).toHaveBeenCalledWith(
        expect.objectContaining({
          agentId: agent.id,
          userId: testUser.id,
          type: 'conversation',
        })
      );

      memorySpy.mockRestore();
    });

    it('should handle service failures gracefully', async () => {
      // Mock AI service failure
      const originalGenerateResponse = aiAgentService.generateResponse;
      aiAgentService.generateResponse = jest.fn().mockRejectedValue(
        new Error('AI service unavailable')
      );

      const response = await app.request('/api/ai-conversations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          agentId: testAgent.id,
          title: 'Failure Test',
          initialMessage: 'Hello',
        }),
      });

      expect(response.status).toBe(500);
      
      const result = await response.json();
      expect(result.success).toBe(false);
      expect(result.error).toContain('AI service');

      // Restore original method
      aiAgentService.generateResponse = originalGenerateResponse;
    });
  });

  // Helper functions
  async function setupTestEnvironment(): Promise<void> {
    // Setup test AI models, tools, and configurations
  }

  async function cleanupConversationData(): Promise<void> {
    if (testConversation?.id) {
      try {
        await app.request(`/api/ai-conversations/${testConversation.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        // Ignore cleanup errors
      }
    }
    testConversation = null;
  }

  async function cleanupTestData(): Promise<void> {
    await cleanupConversationData();
    
    if (testAgent?.id) {
      try {
        await app.request(`/api/ai-agents/${testAgent.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        // Ignore cleanup errors
      }
    }

    if (testUser?.id) {
      await userManagementService.deleteUser(testOrganization.id, testUser.id);
    }
    if (testOrganization?.id) {
      await organizationManagementService.deleteOrganization(testOrganization.id);
    }
  }

  async function teardownTestEnvironment(): Promise<void> {
    // Final cleanup
  }
});
