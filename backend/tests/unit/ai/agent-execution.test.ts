import { AgentExecutionEngine, ExecutionContext, ExecutionResult } from '../../../lib/agent-execution';
import { AgentConfig, AgentTool } from '../../../services/ai-agent-service';
import { ConversationManager } from '../../../lib/conversation-manager';
import { ToolExecutor } from '../../../lib/tool-executor';
import { AIServiceManager } from '../../../services/ai/ai-model-abstraction';

// Mock dependencies
jest.mock('../../../lib/conversation-manager');
jest.mock('../../../lib/tool-executor');
jest.mock('../../../services/ai/ai-model-abstraction');
jest.mock('../../../db/connection', () => ({
  db: {
    insert: jest.fn().mockResolvedValue({}),
  },
}));

describe('AgentExecutionEngine', () => {
  let executionEngine: AgentExecutionEngine;
  let mockConversationManager: jest.Mocked<ConversationManager>;
  let mockToolExecutor: jest.Mocked<ToolExecutor>;
  let mockAIService: jest.Mocked<AIServiceManager>;

  const mockAgent: AgentConfig = {
    id: 'test-agent-1',
    name: 'Test Agent',
    type: 'voice-assistant',
    systemPrompt: 'You are a helpful test assistant.',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    tools: [],
    capabilities: ['chat'],
  };

  const mockContext: ExecutionContext = {
    agentId: 'test-agent-1',
    sessionId: 'test-session-1',
    organizationId: 'test-org-1',
    userId: 'test-user-1',
    metadata: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Create fresh mocks
    mockConversationManager = new ConversationManager() as jest.Mocked<ConversationManager>;
    mockToolExecutor = new ToolExecutor() as jest.Mocked<ToolExecutor>;
    mockAIService = new AIServiceManager({ provider: 'openai', model: 'gpt-4' }) as jest.Mocked<AIServiceManager>;

    // Mock the constructors
    (ConversationManager as jest.Mock).mockImplementation(() => mockConversationManager);
    (ToolExecutor as jest.Mock).mockImplementation(() => mockToolExecutor);
    (AIServiceManager as jest.Mock).mockImplementation(() => mockAIService);

    executionEngine = new AgentExecutionEngine();
  });

  describe('executeAgent', () => {
    it('should execute agent successfully with basic validation', async () => {
      // Arrange
      const input = 'Hello, test message!';
      const expectedConversationContext = {
        sessionId: 'test-session-1',
        agentId: 'test-agent-1',
        history: [
          { role: 'user', content: input, timestamp: new Date() },
        ],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 1,
        tokenCount: 25,
      };

      mockConversationManager.manageConversation.mockResolvedValue(expectedConversationContext);
      mockAIService.chat.mockResolvedValue({
        content: 'Hello! I can help you with that.',
        usage: { totalTokens: 50, promptTokens: 25, completionTokens: 25 },
        model: 'gpt-4',
        provider: 'openai',
        latency: 150,
      });

      // Act
      const result = await executionEngine.executeAgent(mockAgent, mockContext, input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(3); // validation, conversation_management, api_call
      expect(result.tokensUsed).toBe(50);
      expect(result.result?.message).toBe('Hello! I can help you with that.');
      
      expect(mockConversationManager.manageConversation).toHaveBeenCalledWith(
        'test-session-1',
        'test-agent-1',
        input,
        mockContext
      );
      
      expect(mockAIService.chat).toHaveBeenCalled();
    });

    it('should handle validation errors gracefully', async () => {
      // Arrange
      const invalidAgent = { ...mockAgent, systemPrompt: '' };
      const input = '';

      // Act
      const result = await executionEngine.executeAgent(invalidAgent, mockContext, input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('System prompt required');
      expect(result.steps).toHaveLength(1); // Only validation step
    });

    it('should execute tools in parallel when enabled', async () => {
      // Arrange
      const tools: AgentTool[] = [
        {
          name: 'test-tool-1',
          description: 'Test tool 1',
          parameters: {},
        },
        {
          name: 'test-tool-2',
          description: 'Test tool 2',
          parameters: {},
        },
      ];

      const contextWithParallel = { ...mockContext, enableParallelExecution: true };
      const input = 'Execute tools in parallel';

      mockConversationManager.manageConversation.mockResolvedValue({
        sessionId: 'test-session-1',
        agentId: 'test-agent-1',
        history: [{ role: 'user', content: input, timestamp: new Date() }],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 1,
        tokenCount: 25,
      });

      mockAIService.chat.mockResolvedValue({
        content: 'I will execute the tools for you.',
        usage: { totalTokens: 30, promptTokens: 15, completionTokens: 15 },
        model: 'gpt-4',
        provider: 'openai',
      });

      mockToolExecutor.executeTool.mockResolvedValue({
        success: true,
        result: { toolResult: 'success' },
        executionTime: 100,
        toolName: 'test-tool',
        toolId: 'tool-id-1',
      });

      // Act
      const result = await executionEngine.executeAgent(mockAgent, contextWithParallel, input, tools);

      // Assert
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(5); // validation, conversation_management, api_call, 2 tools
      expect(mockToolExecutor.executeTool).toHaveBeenCalledTimes(2);
      
      // Verify tools were called in parallel (no await between calls)
      const toolCalls = mockToolExecutor.executeTool.mock.calls;
      expect(toolCalls[0][0]).toBe(tools[0]);
      expect(toolCalls[1][0]).toBe(tools[1]);
    });

    it('should execute tools sequentially when parallel is disabled', async () => {
      // Arrange
      const tools: AgentTool[] = [
        {
          name: 'test-tool-1',
          description: 'Test tool 1',
          parameters: {},
        },
        {
          name: 'test-tool-2',
          description: 'Test tool 2',
          parameters: {},
        },
      ];

      const input = 'Execute tools sequentially';

      mockConversationManager.manageConversation.mockResolvedValue({
        sessionId: 'test-session-1',
        agentId: 'test-agent-1',
        history: [{ role: 'user', content: input, timestamp: new Date() }],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 1,
        tokenCount: 25,
      });

      mockAIService.chat.mockResolvedValue({
        content: 'I will execute the tools for you.',
        usage: { totalTokens: 30, promptTokens: 15, completionTokens: 15 },
        model: 'gpt-4',
        provider: 'openai',
      });

      mockToolExecutor.executeTool.mockResolvedValue({
        success: true,
        result: { toolResult: 'success' },
        executionTime: 100,
        toolName: 'test-tool',
        toolId: 'tool-id-1',
      });

      // Act
      const result = await executionEngine.executeAgent(mockAgent, mockContext, input, tools);

      // Assert
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(5); // validation, conversation_management, api_call, 2 tools
      expect(mockToolExecutor.executeTool).toHaveBeenCalledTimes(2);
    });

    it('should handle rate limiting', async () => {
      // Arrange
      const input = 'Test rate limiting';
      
      // Mock rate limiter to return false (rate limited)
      const privateEngine = executionEngine as any;
      privateEngine.rateLimiter.set('test-org-1', Array(100).fill(Date.now())); // Max requests

      // Act
      const result = await executionEngine.executeAgent(mockAgent, mockContext, input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Rate limit exceeded');
      expect(result.steps).toHaveLength(0); // Should fail before any steps
    });

    it('should handle circuit breaker when open', async () => {
      // Arrange
      const input = 'Test circuit breaker';
      
      // Mock circuit breaker to be open
      const privateEngine = executionEngine as any;
      privateEngine.circuitBreaker.set('test-agent-1', {
        failures: 5,
        lastFailure: Date.now(),
        state: 'open',
      });

      // Act
      const result = await executionEngine.executeAgent(mockAgent, mockContext, input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Circuit breaker is open for this agent');
      expect(result.steps).toHaveLength(0); // Should fail before any steps
    });

    it('should attempt error recovery when execution fails', async () => {
      // Arrange
      const input = 'Test error recovery';
      
      mockConversationManager.manageConversation.mockRejectedValue(new Error('Conversation failed'));

      // Act
      const result = await executionEngine.executeAgent(mockAgent, mockContext, input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Conversation failed');
      expect(result.steps).toHaveLength(2); // validation, error_recovery
      expect(result.steps[1].type).toBe('error_recovery');
    });

    it('should respect custom timeout and max steps', async () => {
      // Arrange
      const customContext: ExecutionContext = {
        ...mockContext,
        timeout: 5000,
        maxSteps: 3,
      };
      const input = 'Test custom settings';

      mockConversationManager.manageConversation.mockResolvedValue({
        sessionId: 'test-session-1',
        agentId: 'test-agent-1',
        history: [{ role: 'user', content: input, timestamp: new Date() }],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 1,
        tokenCount: 25,
      });

      mockAIService.chat.mockResolvedValue({
        content: 'Response',
        usage: { totalTokens: 20, promptTokens: 10, completionTokens: 10 },
        model: 'gpt-4',
        provider: 'openai',
      });

      // Act
      const result = await executionEngine.executeAgent(mockAgent, customContext, input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.steps).toHaveLength(3);
    });
  });

  describe('rate limiting', () => {
    it('should allow requests within rate limit', () => {
      const privateEngine = executionEngine as any;
      
      // Add some requests but not exceed limit
      privateEngine.rateLimiter.set('test-org', Array(50).fill(Date.now()));
      
      const result = privateEngine.checkRateLimit('test-org');
      expect(result).toBe(true);
    });

    it('should block requests exceeding rate limit', () => {
      const privateEngine = executionEngine as any;
      
      // Exceed rate limit
      privateEngine.rateLimiter.set('test-org', Array(100).fill(Date.now()));
      
      const result = privateEngine.checkRateLimit('test-org');
      expect(result).toBe(false);
    });

    it('should clean up old requests outside time window', () => {
      const privateEngine = executionEngine as any;
      const oldTimestamp = Date.now() - 120000; // 2 minutes ago
      
      privateEngine.rateLimiter.set('test-org', Array(100).fill(oldTimestamp));
      
      const result = privateEngine.checkRateLimit('test-org');
      expect(result).toBe(true); // Should allow since old requests are cleaned up
    });
  });

  describe('circuit breaker', () => {
    it('should allow requests when circuit breaker is closed', () => {
      const privateEngine = executionEngine as any;
      
      const result = privateEngine.checkCircuitBreaker('test-agent');
      expect(result).toBe(true);
    });

    it('should block requests when circuit breaker is open', () => {
      const privateEngine = executionEngine as any;
      
      privateEngine.circuitBreaker.set('test-agent', {
        failures: 5,
        lastFailure: Date.now(),
        state: 'open',
      });
      
      const result = privateEngine.checkCircuitBreaker('test-agent');
      expect(result).toBe(false);
    });

    it('should allow requests when circuit breaker is half-open', () => {
      const privateEngine = executionEngine as any;
      
      privateEngine.circuitBreaker.set('test-agent', {
        failures: 5,
        lastFailure: Date.now() - 70000, // Over 1 minute ago
        state: 'half-open',
      });
      
      const result = privateEngine.checkCircuitBreaker('test-agent');
      expect(result).toBe(true);
    });

    it('should open circuit breaker after failure threshold', () => {
      const privateEngine = executionEngine as any;
      
      // Record 5 failures
      for (let i = 0; i < 5; i++) {
        privateEngine.recordCircuitBreakerFailure('test-agent');
      }
      
      const breaker = privateEngine.circuitBreaker.get('test-agent');
      expect(breaker?.state).toBe('open');
      expect(breaker?.failures).toBe(5);
    });

    it('should close circuit breaker on success', () => {
      const privateEngine = executionEngine as any;
      
      // Set circuit breaker to open
      privateEngine.circuitBreaker.set('test-agent', {
        failures: 5,
        lastFailure: Date.now(),
        state: 'open',
      });
      
      // Record success
      privateEngine.recordCircuitBreakerSuccess('test-agent');
      
      const breaker = privateEngine.circuitBreaker.get('test-agent');
      expect(breaker?.state).toBe('closed');
      expect(breaker?.failures).toBe(0);
    });
  });

  describe('provider status and configuration', () => {
    it('should return provider status', () => {
      mockAIService.getProviderStatus.mockReturnValue({
        openai: true,
        anthropic: false,
        local: false,
      });

      const status = executionEngine.getProviderStatus();
      expect(status).toEqual({
        openai: true,
        anthropic: false,
        local: false,
      });
    });

    it('should update AI configuration', () => {
      const config = {
        provider: 'anthropic' as const,
        model: 'claude-3-sonnet',
        temperature: 0.5,
        maxTokens: 1500,
      };

      executionEngine.updateAIConfig(config);
      
      expect(mockAIService.updateDefaultConfig).toHaveBeenCalledWith(config);
    });
  });

  describe('execution history and active executions', () => {
    it('should return execution history for agent', () => {
      const privateEngine = executionEngine as any;
      const mockResults: ExecutionResult[] = [
        {
          success: true,
          result: { message: 'test' },
          executionTime: 100,
          steps: [],
        },
        {
          success: false,
          error: 'test error',
          executionTime: 50,
          steps: [],
        },
      ];
      
      privateEngine.executionHistory.set('test-agent', mockResults);
      
      const history = executionEngine.getExecutionHistory('test-agent');
      expect(history).toEqual(mockResults);
    });

    it('should return empty history for non-existent agent', () => {
      const history = executionEngine.getExecutionHistory('non-existent');
      expect(history).toEqual([]);
    });

    it('should return active execution IDs', () => {
      const privateEngine = executionEngine as any;
      privateEngine.activeExecutions.set('session-1', mockContext);
      privateEngine.activeExecutions.set('session-2', mockContext);
      
      const activeExecutions = executionEngine.getActiveExecutions();
      expect(activeExecutions).toEqual(['session-1', 'session-2']);
    });

    it('should return empty array when no active executions', () => {
      const activeExecutions = executionEngine.getActiveExecutions();
      expect(activeExecutions).toEqual([]);
    });
  });
});
