import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import { TestContainer } from 'testcontainers';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { RedisContainer } from '@testcontainers/redis';
import { setupTestDatabase, cleanupTestDatabase } from '../setup/integration.setup';

describe('AI Workflow Integration Tests', () => {
  let postgresContainer: PostgreSqlContainer;
  let redisContainer: RedisContainer;
  let dbConnection: any;
  let redisClient: any;

  beforeAll(async () => {
    // Start test containers
    postgresContainer = await new PostgreSqlContainer()
      .withDatabase('test_ai_workflow')
      .withUsername('test')
      .withPassword('test')
      .start();

    redisContainer = await new RedisContainer()
      .start();

    // Setup database connections
    dbConnection = await setupTestDatabase(postgresContainer.getConnectionUri());
    redisClient = await redisContainer.getConnection();
  }, 60000);

  afterAll(async () => {
    await cleanupTestDatabase(dbConnection);
    await postgresContainer.stop();
    await redisContainer.stop();
  });

  beforeEach(async () => {
    // Clean up test data
    await dbConnection.query('TRUNCATE TABLE ai_agents, ai_workflows, workflow_executions CASCADE');
    await redisClient.flushdb();
  });

  describe('Agent Creation and Configuration', () => {
    it('should create AI agent with valid configuration', async () => {
      const agentConfig = {
        name: 'Test Customer Service Agent',
        description: 'Handles customer inquiries',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: 'You are a helpful customer service agent.',
        organizationId: 'test-org-id',
        tools: [
          {
            name: 'customer_lookup',
            description: 'Look up customer information',
            enabled: true,
            config: { endpoint: '/api/customers' }
          }
        ]
      };

      const response = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agentConfig)
      });

      expect(response.status).toBe(201);
      const agent = await response.json();
      
      expect(agent.id).toBeDefined();
      expect(agent.name).toBe(agentConfig.name);
      expect(agent.model).toBe(agentConfig.model);
      expect(agent.tools).toHaveLength(1);
    });

    it('should update agent configuration', async () => {
      // Create agent first
      const createResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id'
        })
      });

      const agent = await createResponse.json();

      // Update agent
      const updateResponse = await fetch(`http://localhost:3001/api/ai-agents/${agent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          temperature: 0.9,
          maxTokens: 4096
        })
      });

      expect(updateResponse.status).toBe(200);
      const updatedAgent = await updateResponse.json();
      expect(updatedAgent.temperature).toBe(0.9);
      expect(updatedAgent.maxTokens).toBe(4096);
    });
  });

  describe('Workflow Execution', () => {
    it('should execute simple AI workflow', async () => {
      // Create agent
      const agentResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Workflow Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id',
          systemPrompt: 'You are a workflow test agent.'
        })
      });

      const agent = await agentResponse.json();

      // Create workflow
      const workflowConfig = {
        name: 'Test Workflow',
        description: 'Simple test workflow',
        agentId: agent.id,
        organizationId: 'test-org-id',
        steps: [
          {
            id: 'step1',
            type: 'ai_processing',
            config: {
              prompt: 'Process this input: {{input}}',
              outputVariable: 'processed_result'
            }
          }
        ]
      };

      const workflowResponse = await fetch('http://localhost:3001/api/ai-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflowConfig)
      });

      const workflow = await workflowResponse.json();

      // Execute workflow
      const executionResponse = await fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: 'Test input data',
          context: { userId: 'test-user' }
        })
      });

      expect(executionResponse.status).toBe(200);
      const execution = await executionResponse.json();
      
      expect(execution.id).toBeDefined();
      expect(execution.status).toBe('completed');
      expect(execution.result).toBeDefined();
    });

    it('should handle multi-step workflow with conditional logic', async () => {
      // Create agent
      const agentResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Multi-step Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id'
        })
      });

      const agent = await agentResponse.json();

      // Create complex workflow
      const workflowConfig = {
        name: 'Complex Workflow',
        agentId: agent.id,
        organizationId: 'test-org-id',
        steps: [
          {
            id: 'analyze',
            type: 'ai_processing',
            config: {
              prompt: 'Analyze sentiment: {{input}}',
              outputVariable: 'sentiment'
            }
          },
          {
            id: 'branch',
            type: 'conditional',
            config: {
              condition: '{{sentiment}} === "positive"',
              truePath: 'positive_response',
              falsePath: 'negative_response'
            }
          },
          {
            id: 'positive_response',
            type: 'ai_processing',
            config: {
              prompt: 'Generate positive response',
              outputVariable: 'response'
            }
          },
          {
            id: 'negative_response',
            type: 'ai_processing',
            config: {
              prompt: 'Generate negative response',
              outputVariable: 'response'
            }
          }
        ]
      };

      const workflowResponse = await fetch('http://localhost:3001/api/ai-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workflowConfig)
      });

      const workflow = await workflowResponse.json();

      // Execute with positive input
      const positiveExecution = await fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: 'I love this product!'
        })
      });

      const positiveResult = await positiveExecution.json();
      expect(positiveResult.status).toBe('completed');
      expect(positiveResult.executionPath).toContain('positive_response');
    });
  });

  describe('Workflow Monitoring and Analytics', () => {
    it('should track workflow execution metrics', async () => {
      // Create and execute workflow
      const agentResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Metrics Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id'
        })
      });

      const agent = await agentResponse.json();

      const workflowResponse = await fetch('http://localhost:3001/api/ai-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Metrics Workflow',
          agentId: agent.id,
          organizationId: 'test-org-id',
          steps: [
            {
              id: 'step1',
              type: 'ai_processing',
              config: { prompt: 'Test prompt' }
            }
          ]
        })
      });

      const workflow = await workflowResponse.json();

      // Execute multiple times
      for (let i = 0; i < 5; i++) {
        await fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: `Test ${i}` })
        });
      }

      // Check metrics
      const metricsResponse = await fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/metrics`);
      const metrics = await metricsResponse.json();

      expect(metrics.totalExecutions).toBe(5);
      expect(metrics.successRate).toBe(100);
      expect(metrics.averageExecutionTime).toBeGreaterThan(0);
    });

    it('should handle workflow failures gracefully', async () => {
      // Create workflow with invalid step
      const agentResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Failure Test Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id'
        })
      });

      const agent = await agentResponse.json();

      const workflowResponse = await fetch('http://localhost:3001/api/ai-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Failure Workflow',
          agentId: agent.id,
          organizationId: 'test-org-id',
          steps: [
            {
              id: 'invalid_step',
              type: 'invalid_type',
              config: {}
            }
          ]
        })
      });

      const workflow = await workflowResponse.json();

      // Execute and expect failure
      const executionResponse = await fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: 'Test' })
      });

      expect(executionResponse.status).toBe(500);
      
      const execution = await executionResponse.json();
      expect(execution.status).toBe('failed');
      expect(execution.error).toBeDefined();
    });
  });

  describe('Concurrent Workflow Execution', () => {
    it('should handle multiple concurrent executions', async () => {
      // Create agent and workflow
      const agentResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Concurrent Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id'
        })
      });

      const agent = await agentResponse.json();

      const workflowResponse = await fetch('http://localhost:3001/api/ai-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Concurrent Workflow',
          agentId: agent.id,
          organizationId: 'test-org-id',
          steps: [
            {
              id: 'step1',
              type: 'ai_processing',
              config: { prompt: 'Process {{input}}' }
            }
          ]
        })
      });

      const workflow = await workflowResponse.json();

      // Execute multiple workflows concurrently
      const executions = Array.from({ length: 10 }, (_, i) =>
        fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/execute`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: `Concurrent test ${i}` })
        })
      );

      const results = await Promise.all(executions);
      
      // All should succeed
      results.forEach(response => {
        expect(response.status).toBe(200);
      });

      const executionResults = await Promise.all(results.map(r => r.json()));
      
      // All should be completed
      executionResults.forEach(result => {
        expect(result.status).toBe('completed');
      });
    });
  });

  describe('Workflow Integration with External Services', () => {
    it('should integrate with external APIs', async () => {
      // Mock external API
      const mockApiResponse = {
        status: 200,
        data: { result: 'External API response' }
      };

      // Create agent with external API tool
      const agentResponse = await fetch('http://localhost:3001/api/ai-agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'External API Agent',
          model: 'gpt-4',
          organizationId: 'test-org-id',
          tools: [
            {
              name: 'external_api',
              description: 'Call external API',
              enabled: true,
              config: {
                endpoint: 'https://api.example.com/data',
                method: 'GET'
              }
            }
          ]
        })
      });

      const agent = await agentResponse.json();

      // Create workflow that uses external API
      const workflowResponse = await fetch('http://localhost:3001/api/ai-workflows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'External API Workflow',
          agentId: agent.id,
          organizationId: 'test-org-id',
          steps: [
            {
              id: 'api_call',
              type: 'api_call',
              config: {
                tool: 'external_api',
                outputVariable: 'api_result'
              }
            },
            {
              id: 'process_result',
              type: 'ai_processing',
              config: {
                prompt: 'Process this API result: {{api_result}}',
                outputVariable: 'processed_result'
              }
            }
          ]
        })
      });

      const workflow = await workflowResponse.json();

      // Execute workflow
      const executionResponse = await fetch(`http://localhost:3001/api/ai-workflows/${workflow.id}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: 'Test data' })
      });

      expect(executionResponse.status).toBe(200);
      const execution = await executionResponse.json();
      expect(execution.status).toBe('completed');
    });
  });
});
