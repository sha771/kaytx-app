import { describe, it, expect, beforeEach, jest, afterEach } from '@jest/globals';
import request from 'supertest';
import { app } from '../../backend/server';
import { db } from '../../backend/db/connection';
import { eq, and, or, desc, asc } from 'drizzle-orm';
import { logAudit } from '../../backend/lib/audit';

// Mock external services
jest.mock('../../backend/services/ai/openai-service', () => ({
  OpenAIService: jest.fn().mockImplementation(() => ({
    generateText: jest.fn().mockResolvedValue({
      text: 'AI generated response',
      usage: { promptTokens: 100, completionTokens: 50 },
    }),
    generateEmbedding: jest.fn().mockResolvedValue([0.1, 0.2, 0.3]),
    analyzeSentiment: jest.fn().mockResolvedValue({
      sentiment: 'positive',
      confidence: 0.85,
    }),
  })),
}));

jest.mock('../../backend/services/ai/anthropic-service', () => ({
  AnthropicService: jest.fn().mockImplementation(() => ({
    generateText: jest.fn().mockResolvedValue({
      text: 'Claude generated response',
      usage: { inputTokens: 80, outputTokens: 40 },
    }),
    analyzeDocument: jest.fn().mockResolvedValue({
      summary: 'Document summary',
      keyPoints: ['Point 1', 'Point 2'],
    }),
  })),
}));

describe('AI Agent Integration Tests', () => {
  let authToken: string;
  let organizationId: string;
  let userId: string;
  let agentId: string;
  let conversationId: string;

  beforeEach(async () => {
    // Create test user and organization
    const orgResult = await db.insert({
      name: 'AI Test Organization',
      domain: 'ai-test.com',
      settings: {},
    }).returning();
    organizationId = orgResult[0].id;

    const userResult = await db.insert({
      email: 'ai-test@example.com',
      name: 'AI Test User',
      organizationId,
      role: 'admin',
    }).returning();
    userId = userResult[0].id;

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'ai-test@example.com',
        password: 'test-password',
      });

    authToken = loginResponse.body.token;

    // Create AI agent
    const agentResponse = await request(app)
      .post('/api/ai-agents')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Test AI Agent',
        type: 'customer-service',
        model: 'gpt-4',
        systemPrompt: 'You are a helpful customer service agent.',
        capabilities: ['text-generation', 'sentiment-analysis'],
        settings: {
          temperature: 0.7,
          maxTokens: 1000,
        },
      });

    agentId = agentResponse.body.data.id;
  });

  afterEach(async () => {
    // Cleanup test data
    await db.delete().where(eq('organizationId', organizationId));
    await db.delete().where(eq('id', organizationId));
  });

  describe('Agent Lifecycle Management', () => {
    it('should create, configure, and activate an AI agent', async () => {
      // Verify agent creation
      const agentResponse = await request(app)
        .get(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(agentResponse.status).toBe(200);
      expect(agentResponse.body.data.name).toBe('Test AI Agent');
      expect(agentResponse.body.data.status).toBe('active');

      // Update agent configuration
      const updateResponse = await request(app)
        .put(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          systemPrompt: 'You are an advanced customer service agent.',
          settings: {
            temperature: 0.5,
            maxTokens: 1500,
          },
        });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.data.systemPrompt).toContain('advanced');

      // Deactivate agent
      const deactivateResponse = await request(app)
        .patch(`/api/ai-agents/${agentId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'inactive' });

      expect(deactivateResponse.status).toBe(200);
      expect(deactivateResponse.body.data.status).toBe('inactive');
    });

    it('should handle agent versioning and rollback', async () => {
      // Create initial version
      const initialConfig = {
        systemPrompt: 'Initial version',
        settings: { temperature: 0.7 },
      };

      await request(app)
        .put(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(initialConfig);

      // Create new version
      const newConfig = {
        systemPrompt: 'Updated version',
        settings: { temperature: 0.5 },
      };

      const updateResponse = await request(app)
        .put(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(newConfig);

      expect(updateResponse.status).toBe(200);

      // Rollback to previous version
      const rollbackResponse = await request(app)
        .post(`/api/ai-agents/${agentId}/rollback`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ version: 1 });

      expect(rollbackResponse.status).toBe(200);
      expect(rollbackResponse.body.data.systemPrompt).toBe('Initial version');
    });
  });

  describe('Conversation Management', () => {
    it('should handle complete conversation lifecycle', async () => {
      // Start conversation
      const startResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'Hello, I need help with my order',
          context: {
            userId: 'customer-123',
            sessionId: 'session-456',
          },
        });

      expect(startResponse.status).toBe(201);
      conversationId = startResponse.body.data.id;
      expect(startResponse.body.data.messages).toHaveLength(2); // User + AI response

      // Continue conversation
      const continueResponse = await request(app)
        .post(`/api/ai-agents/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'What is the status of order #12345?',
          context: {
            orderId: '12345',
          },
        });

      expect(continueResponse.status).toBe(200);
      expect(continueResponse.body.data.response).toBeDefined();

      // Get conversation history
      const historyResponse = await request(app)
        .get(`/api/ai-agents/conversations/${conversationId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(historyResponse.status).toBe(200);
      expect(historyResponse.body.data.messages.length).toBeGreaterThan(2);

      // End conversation
      const endResponse = await request(app)
        .patch(`/api/ai-agents/conversations/${conversationId}/status`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'ended' });

      expect(endResponse.status).toBe(200);
      expect(endResponse.body.data.status).toBe('ended');
    });

    it('should handle conversation context and memory', async () => {
      // Start conversation with initial context
      const startResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'My name is John and I have a premium account',
          context: {
            userId: 'customer-john',
            accountType: 'premium',
          },
        });

      conversationId = startResponse.body.data.id;

      // Send follow-up message referencing previous context
      const followUpResponse = await request(app)
        .post(`/api/ai-agents/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'What benefits do I get with my account?',
        });

      expect(followUpResponse.status).toBe(200);
      
      // Verify AI response uses context
      const aiResponse = followUpResponse.body.data.response;
      expect(aiResponse.toLowerCase()).toContain('premium');

      // Test conversation memory retrieval
      const memoryResponse = await request(app)
        .get(`/api/ai-agents/conversations/${conversationId}/memory`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(memoryResponse.status).toBe(200);
      expect(memoryResponse.body.data.context).toHaveProperty('accountType', 'premium');
    });
  });

  describe('Multi-Agent Orchestration', () => {
    let agent2Id: string;

    beforeEach(async () => {
      // Create second agent
      const agent2Response = await request(app)
        .post('/api/ai-agents')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Sales Agent',
          type: 'sales',
          model: 'claude-3',
          systemPrompt: 'You are a helpful sales agent.',
          capabilities: ['text-generation', 'product-recommendation'],
        });

      agent2Id = agent2Response.body.data.id;
    });

    it('should handle agent handoff and collaboration', async () => {
      // Start with customer service agent
      const conversationResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'I want to upgrade my plan',
        });

      conversationId = conversationResponse.body.data.id;

      // Trigger handoff to sales agent
      const handoffResponse = await request(app)
        .post(`/api/ai-agents/conversations/${conversationId}/handoff`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          targetAgentId: agent2Id,
          reason: 'sales_inquiry',
          context: {
            customerInterest: 'plan_upgrade',
          },
        });

      expect(handoffResponse.status).toBe(200);
      expect(handoffResponse.body.data.currentAgentId).toBe(agent2Id);

      // Continue conversation with sales agent
      const salesResponse = await request(app)
        .post(`/api/ai-agents/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'What are my upgrade options?',
        });

      expect(salesResponse.status).toBe(200);
      expect(salesResponse.body.data.response).toBeDefined();
    });

    it('should handle agent collaboration workflows', async () => {
      // Create collaborative workflow
      const workflowResponse = await request(app)
        .post('/api/ai-agents/workflows')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Customer Support Workflow',
          description: 'Handle customer inquiries with agent collaboration',
          steps: [
            {
              agentId,
              name: 'Initial Triage',
              conditions: ['customer_inquiry'],
              actions: ['classify_request', 'provide_basic_response'],
            },
            {
              agentId: agent2Id,
              name: 'Sales Follow-up',
              conditions: ['sales_interest'],
              actions: ['provide_product_info', 'create_lead'],
            },
          ],
        });

      const workflowId = workflowResponse.body.data.id;

      // Execute workflow
      const executionResponse = await request(app)
        .post(`/api/ai-agents/workflows/${workflowId}/execute`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          input: {
            message: 'I want to know about your enterprise plans',
            customerType: 'enterprise',
          },
        });

      expect(executionResponse.status).toBe(200);
      expect(executionResponse.body.data.executionId).toBeDefined();
      expect(executionResponse.body.data.currentStep).toBe('Sales Follow-up');
    });
  });

  describe('AI Model Integration', () => {
    it('should handle multiple AI providers', async () => {
      // Test OpenAI integration
      const openaiResponse = await request(app)
        .post('/api/ai/models/openai/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          prompt: 'Generate a customer service response',
          model: 'gpt-4',
          maxTokens: 100,
        });

      expect(openaiResponse.status).toBe(200);
      expect(openaiResponse.body.data.text).toBeDefined();
      expect(openaiResponse.body.data.usage).toBeDefined();

      // Test Anthropic integration
      const anthropicResponse = await request(app)
        .post('/api/ai/models/anthropic/generate')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          prompt: 'Analyze this customer feedback',
          model: 'claude-3',
          maxTokens: 150,
        });

      expect(anthropicResponse.status).toBe(200);
      expect(anthropicResponse.body.data.text).toBeDefined();
    });

    it('should handle model fallback and load balancing', async () => {
      // Configure agent with multiple models
      await request(app)
        .put(`/api/ai-agents/${agentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          modelConfig: {
            primary: 'gpt-4',
            fallback: ['claude-3', 'gpt-3.5-turbo'],
            loadBalancing: 'round-robin',
          },
        });

      // Simulate primary model failure
      jest.mocked(require('../../backend/services/ai/openai-service').OpenAIService)
        .mockImplementationOnce(() => ({
          generateText: jest.fn().mockRejectedValue(new Error('Model unavailable')),
        }));

      // Test fallback to secondary model
      const fallbackResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'Test message during model failure',
        });

      expect(fallbackResponse.status).toBe(200);
      expect(fallbackResponse.body.data.messages).toHaveLength(2);
    });
  });

  describe('Performance and Scaling', () => {
    it('should handle concurrent conversations', async () => {
      const concurrentRequests = 10;
      const promises = [];

      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          request(app)
            .post('/api/ai-agents/conversations')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              agentId,
              message: `Concurrent test message ${i}`,
            })
        );
      }

      const results = await Promise.all(promises);

      // All requests should succeed
      results.forEach((response, index) => {
        expect(response.status).toBe(201);
        expect(response.body.data.id).toBeDefined();
      });

      // Verify all conversations are stored
      const listResponse = await request(app)
        .get('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`);

      expect(listResponse.status).toBe(200);
      expect(listResponse.body.data.length).toBeGreaterThanOrEqual(concurrentRequests);
    });

    it('should handle large context conversations', async () => {
      // Start conversation
      const startResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'Start large context test',
        });

      conversationId = startResponse.body.data.id;

      // Add many messages to build large context
      const messageCount = 50;
      for (let i = 0; i < messageCount; i++) {
        await request(app)
          .post(`/api/ai-agents/conversations/${conversationId}/messages`)
          .set('Authorization', `Bearer ${authToken}`)
          .send({
            message: `Message ${i}: ${'x'.repeat(100)}`, // Long messages
          });
      }

      // Test response with large context
      const largeContextResponse = await request(app)
        .post(`/api/ai-agents/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'Summarize our conversation',
        });

      expect(largeContextResponse.status).toBe(200);
      expect(largeContextResponse.body.data.response).toBeDefined();
    });
  });

  describe('Security and Compliance', () => {
    it('should enforce rate limiting on AI endpoints', async () => {
      const requests = [];
      const requestCount = 20;

      // Send many rapid requests
      for (let i = 0; i < requestCount; i++) {
        requests.push(
          request(app)
            .post('/api/ai-agents/conversations')
            .set('Authorization', `Bearer ${authToken}`)
            .send({
              agentId,
              message: `Rate limit test ${i}`,
            })
        );
      }

      const results = await Promise.allSettled(requests);
      const rejectedCount = results.filter(r => r.status === 'rejected').length;

      // Some requests should be rate limited
      expect(rejectedCount).toBeGreaterThan(0);
    });

    it('should sanitize and validate AI inputs', async () => {
      // Test with potentially malicious input
      const maliciousResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: '<script>alert("xss")</script> DROP TABLE users;',
        });

      expect(maliciousResponse.status).toBe(201);
      
      // Verify malicious content is sanitized
      const conversation = await request(app)
        .get(`/api/ai-agents/conversations/${maliciousResponse.body.data.id}`)
        .set('Authorization', `Bearer ${authToken}`);

      const userMessage = conversation.body.data.messages[0];
      expect(userMessage.content).not.toContain('<script>');
      expect(userMessage.content).not.toContain('DROP TABLE');
    });

    it('should log AI interactions for compliance', async () => {
      const conversationResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'Compliance test message',
        });

      expect(conversationResponse.status).toBe(201);

      // Verify audit logging
      expect(logAudit).toHaveBeenCalledWith(
        expect.objectContaining({
          action: expect.stringContaining('AI_AGENT'),
          resource: 'ai_conversation',
          status: 'success',
        })
      );
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle AI service failures gracefully', async () => {
      // Mock AI service failure
      jest.mocked(require('../../backend/services/ai/openai-service').OpenAIService)
        .mockImplementationOnce(() => ({
          generateText: jest.fn().mockRejectedValue(new Error('AI service unavailable')),
        }));

      const response = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'Test during AI service failure',
        });

      expect(response.status).toBe(503);
      expect(response.body.error).toContain('AI service');
    });

    it('should handle conversation timeouts', async () => {
      // Start conversation
      const startResponse = await request(app)
        .post('/api/ai-agents/conversations')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          agentId,
          message: 'Timeout test',
        });

      conversationId = startResponse.body.data.id;

      // Simulate timeout by waiting (in real scenario, this would be handled by background job)
      jest.advanceTimersByTime(31 * 60 * 1000); // 31 minutes

      // Try to send message after timeout
      const timeoutResponse = await request(app)
        .post(`/api/ai-agents/conversations/${conversationId}/messages`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          message: 'Message after timeout',
        });

      expect(timeoutResponse.status).toBe(410); // Gone
      expect(timeoutResponse.body.error).toContain('timeout');
    });
  });
});
