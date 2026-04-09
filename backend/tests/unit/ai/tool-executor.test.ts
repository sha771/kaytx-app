import { ToolExecutor, ToolExecutionContext, ToolExecutionResult } from '../../../lib/tool-executor';
import { AgentTool } from '../../../services/ai-agent-service';

describe('ToolExecutor', () => {
  let toolExecutor: ToolExecutor;

  const mockContext: ToolExecutionContext = {
    agentId: 'test-agent-1',
    sessionId: 'test-session-1',
    organizationId: 'test-org-1',
    userId: 'test-user-1',
    aiResponse: 'AI response for tool execution',
    metadata: {},
  };

  const mockTool: AgentTool = {
    name: 'test-tool',
    description: 'A test tool',
    parameters: {
      input: { type: 'string' },
      option: { type: 'boolean' },
    },
    handler: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    toolExecutor = new ToolExecutor();
  });

  describe('executeTool', () => {
    it('should execute tool successfully with custom handler', async () => {
      // Arrange
      const expectedResult = { success: true, data: 'tool result' };
      (mockTool.handler as jest.Mock).mockResolvedValue(expectedResult);

      // Act
      const result = await toolExecutor.executeTool(mockTool, mockContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.result).toBe(expectedResult);
      expect(result.toolName).toBe('test-tool');
      expect(result.executionTime).toBeGreaterThan(0);
      expect(mockTool.handler).toHaveBeenCalledWith({
        ...mockContext,
        toolName: 'test-tool',
        toolParameters: mockTool.parameters,
      });
    });

    it('should execute default tool implementation when no handler provided', async () => {
      // Arrange
      const toolWithoutHandler: AgentTool = {
        name: 'schedule_appointment',
        description: 'Schedule an appointment',
        parameters: {
          date: { type: 'string' },
          title: { type: 'string' },
        },
      };

      // Act
      const result = await toolExecutor.executeTool(toolWithoutHandler, mockContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.result).toMatchObject({
        success: true,
        appointmentId: expect.any(String),
        title: toolWithoutHandler.parameters.title || 'Scheduled Appointment',
      });
    });

    it('should fail when tool is not registered', async () => {
      // Arrange
      const unregisteredTool: AgentTool = {
        name: 'unregistered-tool',
        description: 'Not registered',
        parameters: {},
      };

      // Act
      const result = await toolExecutor.executeTool(unregisteredTool, mockContext);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('not registered or disabled');
    });

    it('should fail when tool is disabled', async () => {
      // Arrange
      toolExecutor.registerTool(mockTool);
      toolExecutor.disableTool(mockTool.name);

      // Act
      const result = await toolExecutor.executeTool(mockTool, mockContext);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('not registered or disabled');
    });

    it('should handle rate limiting', async () => {
      // Arrange
      toolExecutor.registerTool(mockTool, {
        rateLimit: { maxCalls: 2, windowMs: 60000 },
      });

      // Execute tool twice to reach rate limit
      await toolExecutor.executeTool(mockTool, mockContext);
      await toolExecutor.executeTool(mockTool, mockContext);

      // Act - Third execution should be rate limited
      const result = await toolExecutor.executeTool(mockTool, mockContext);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('Rate limit exceeded');
    });

    it('should retry on failure with exponential backoff', async () => {
      // Arrange
      const toolWithRetry: AgentTool = {
        name: 'flaky-tool',
        description: 'Tool that fails initially',
        parameters: {},
        handler: jest.fn()
          .mockRejectedValueOnce(new Error('First failure'))
          .mockRejectedValueOnce(new Error('Second failure'))
          .mockResolvedValueOnce({ success: true, data: 'finally works' }),
      };

      toolExecutor.registerTool(toolWithRetry, {
        retryConfig: { maxAttempts: 3, backoffMs: 100 },
      });

      const startTime = Date.now();

      // Act
      const result = await toolExecutor.executeTool(toolWithRetry, mockContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.metadata?.attempt).toBe(3);
      expect(toolWithRetry.handler).toHaveBeenCalledTimes(3);
      
      // Verify exponential backoff (should take at least 100ms + 200ms for retries)
      expect(Date.now() - startTime).toBeGreaterThan(300);
    });

    it('should fail after max retry attempts', async () => {
      // Arrange
      const failingTool: AgentTool = {
        name: 'always-failing-tool',
        description: 'Tool that always fails',
        parameters: {},
        handler: jest.fn().mockRejectedValue(new Error('Persistent failure')),
      };

      toolExecutor.registerTool(failingTool, {
        retryConfig: { maxAttempts: 2, backoffMs: 50 },
      });

      // Act
      const result = await toolExecutor.executeTool(failingTool, mockContext);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Persistent failure');
      expect(result.metadata?.attempts).toBe(2);
      expect(failingTool.handler).toHaveBeenCalledTimes(2);
    });

    it('should handle tool timeout', async () => {
      // Arrange
      const slowTool: AgentTool = {
        name: 'slow-tool',
        description: 'Tool that takes too long',
        parameters: {},
        handler: jest.fn().mockImplementation(
          () => new Promise(resolve => setTimeout(resolve, 2000))
        ),
      };

      toolExecutor.registerTool(slowTool, { timeout: 100 });

      // Act
      const result = await toolExecutor.executeTool(slowTool, mockContext);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toContain('timeout');
    });

    it('should emit events on successful execution', async () => {
      // Arrange
      const toolExecutedSpy = jest.fn();
      toolExecutor.on('tool:executed', toolExecutedSpy);

      (mockTool.handler as jest.Mock).mockResolvedValue({ success: true });
      toolExecutor.registerTool(mockTool);

      // Act
      await toolExecutor.executeTool(mockTool, mockContext);

      // Assert
      expect(toolExecutedSpy).toHaveBeenCalledWith({
        toolName: 'test-tool',
        context: mockContext,
        result: expect.objectContaining({
          success: true,
          toolName: 'test-tool',
        }),
      });
    });

    it('should emit events on failed execution', async () => {
      // Arrange
      const toolFailedSpy = jest.fn();
      toolExecutor.on('tool:failed', toolFailedSpy);

      (mockTool.handler as jest.Mock).mockRejectedValue(new Error('Tool failed'));
      toolExecutor.registerTool(mockTool, { retryConfig: { maxAttempts: 1 } });

      // Act
      await toolExecutor.executeTool(mockTool, mockContext);

      // Assert
      expect(toolFailedSpy).toHaveBeenCalledWith({
        toolName: 'test-tool',
        context: mockContext,
        error: expect.any(Error),
      });
    });
  });

  describe('executeToolsInParallel', () => {
    it('should execute multiple tools in parallel', async () => {
      // Arrange
      const tools: AgentTool[] = [
        {
          name: 'tool-1',
          description: 'First tool',
          parameters: {},
          handler: jest.fn().mockResolvedValue({ result: 'tool-1-result' }),
        },
        {
          name: 'tool-2',
          description: 'Second tool',
          parameters: {},
          handler: jest.fn().mockResolvedValue({ result: 'tool-2-result' }),
        },
        {
          name: 'tool-3',
          description: 'Third tool',
          parameters: {},
          handler: jest.fn().mockResolvedValue({ result: 'tool-3-result' }),
        },
      ];

      tools.forEach(tool => toolExecutor.registerTool(tool));

      // Act
      const results = await toolExecutor.executeToolsInParallel(tools, mockContext);

      // Assert
      expect(results).toHaveLength(3);
      expect(results[0].result?.result).toBe('tool-1-result');
      expect(results[1].result?.result).toBe('tool-2-result');
      expect(results[2].result?.result).toBe('tool-3-result');
      
      // Verify all tools were called
      tools.forEach(tool => {
        expect(tool.handler).toHaveBeenCalledWith({
          ...mockContext,
          toolName: tool.name,
          toolParameters: tool.parameters,
        });
      });
    });

    it('should handle mixed success and failure in parallel execution', async () => {
      // Arrange
      const tools: AgentTool[] = [
        {
          name: 'success-tool',
          description: 'Successful tool',
          parameters: {},
          handler: jest.fn().mockResolvedValue({ result: 'success' }),
        },
        {
          name: 'failure-tool',
          description: 'Failing tool',
          parameters: {},
          handler: jest.fn().mockRejectedValue(new Error('Tool failed')),
        },
      ];

      tools.forEach(tool => toolExecutor.registerTool(tool));

      // Act
      const results = await toolExecutor.executeToolsInParallel(tools, mockContext);

      // Assert
      expect(results).toHaveLength(2);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
      expect(results[1].error).toBe('Tool failed');
    });
  });

  describe('tool registration and management', () => {
    it('should register tool with default options', () => {
      // Act
      toolExecutor.registerTool(mockTool);

      // Assert
      const toolInfo = toolExecutor.getToolInfo(mockTool.name);
      expect(toolInfo).toBeDefined();
      expect(toolInfo?.tool).toBe(mockTool);
      expect(toolInfo?.enabled).toBe(true);
      expect(toolInfo?.rateLimit?.maxCalls).toBe(100);
      expect(toolInfo?.timeout).toBe(30000);
      expect(toolInfo?.retryConfig?.maxAttempts).toBe(3);
    });

    it('should register tool with custom options', () => {
      // Arrange
      const customOptions = {
        enabled: false,
        rateLimit: { maxCalls: 50, windowMs: 30000 },
        timeout: 15000,
        retryConfig: { maxAttempts: 5, backoffMs: 2000 },
      };

      // Act
      toolExecutor.registerTool(mockTool, customOptions);

      // Assert
      const toolInfo = toolExecutor.getToolInfo(mockTool.name);
      expect(toolInfo?.enabled).toBe(false);
      expect(toolInfo?.rateLimit?.maxCalls).toBe(50);
      expect(toolInfo?.timeout).toBe(15000);
      expect(toolInfo?.retryConfig?.maxAttempts).toBe(5);
    });

    it('should unregister tool', () => {
      // Arrange
      toolExecutor.registerTool(mockTool);
      expect(toolExecutor.getToolInfo(mockTool.name)).toBeDefined();

      // Act
      toolExecutor.unregisterTool(mockTool.name);

      // Assert
      expect(toolExecutor.getToolInfo(mockTool.name)).toBeUndefined();
    });

    it('should enable and disable tools', () => {
      // Arrange
      toolExecutor.registerTool(mockTool);
      toolExecutor.disableTool(mockTool.name);
      expect(toolExecutor.getToolInfo(mockTool.name)?.enabled).toBe(false);

      // Act
      toolExecutor.enableTool(mockTool.name);

      // Assert
      expect(toolExecutor.getToolInfo(mockTool.name)?.enabled).toBe(true);
    });

    it('should return all registered tools', () => {
      // Arrange
      const tools: AgentTool[] = [
        { name: 'tool-1', description: 'Tool 1', parameters: {} },
        { name: 'tool-2', description: 'Tool 2', parameters: {} },
      ];

      tools.forEach(tool => toolExecutor.registerTool(tool));

      // Act
      const allTools = toolExecutor.getAllTools();

      // Assert
      expect(allTools.size).toBe(3); // Including default tools
      expect(allTools.has('tool-1')).toBe(true);
      expect(allTools.has('tool-2')).toBe(true);
    });
  });

  describe('execution history and statistics', () => {
    it('should record execution history', async () => {
      // Arrange
      (mockTool.handler as jest.Mock).mockResolvedValue({ success: true });
      toolExecutor.registerTool(mockTool);

      // Act
      await toolExecutor.executeTool(mockTool, mockContext);
      await toolExecutor.executeTool(mockTool, mockContext);

      // Assert
      const history = toolExecutor.getExecutionHistory(mockTool.name);
      expect(history).toHaveLength(2);
      expect(history[0].success).toBe(true);
      expect(history[1].success).toBe(true);
    });

    it('should limit execution history', async () => {
      // Arrange
      (mockTool.handler as jest.Mock).mockResolvedValue({ success: true });
      toolExecutor.registerTool(mockTool);

      // Execute tool many times
      for (let i = 0; i < 105; i++) {
        await toolExecutor.executeTool(mockTool, mockContext);
      }

      // Act
      const history = toolExecutor.getExecutionHistory(mockTool.name);

      // Assert
      expect(history).toHaveLength(100); // Should be limited to 1000, but we're checking it's not unlimited
    });

    it('should calculate tool statistics correctly', async () => {
      // Arrange
      (mockTool.handler as jest.Mock)
        .mockResolvedValueOnce({ success: true })
        .mockRejectedValueOnce(new Error('Failed'))
        .mockResolvedValueOnce({ success: true });

      toolExecutor.registerTool(mockTool);

      // Execute tool multiple times
      await toolExecutor.executeTool(mockTool, mockContext);
      await toolExecutor.executeTool(mockTool, mockContext);
      await toolExecutor.executeTool(mockTool, mockContext);

      // Act
      const stats = toolExecutor.getToolStats(mockTool.name);

      // Assert
      expect(stats.totalExecutions).toBe(3);
      expect(stats.successRate).toBe(2/3);
      expect(stats.averageExecutionTime).toBeGreaterThan(0);
      expect(stats.lastExecutionTime).toBeInstanceOf(Date);
    });

    it('should return empty stats for tool with no history', () => {
      // Act
      const stats = toolExecutor.getToolStats('non-existent-tool');

      // Assert
      expect(stats.totalExecutions).toBe(0);
      expect(stats.successRate).toBe(0);
      expect(stats.averageExecutionTime).toBe(0);
      expect(stats.lastExecutionTime).toBeUndefined();
    });
  });

  describe('default tool implementations', () => {
    it('should implement schedule_appointment tool', async () => {
      // Arrange
      const tool: AgentTool = {
        name: 'schedule_appointment',
        description: 'Schedule appointment',
        parameters: {
          date: '2024-01-01T10:00:00Z',
          duration: 60,
          title: 'Team Meeting',
        },
      };

      // Act
      const result = await toolExecutor.executeTool(tool, mockContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.result).toMatchObject({
        success: true,
        appointmentId: expect.any(String),
        scheduledTime: '2024-01-01T10:00:00Z',
        duration: 60,
        title: 'Team Meeting',
      });
    });

    it('should implement create_task tool', async () => {
      // Arrange
      const tool: AgentTool = {
        name: 'create_task',
        description: 'Create task',
        parameters: {
          title: 'Complete project',
          dueDate: '2024-01-15',
          priority: 'high',
        },
      };

      // Act
      const result = await toolExecutor.executeTool(tool, mockContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.result).toMatchObject({
        success: true,
        taskId: expect.any(String),
        title: 'Complete project',
        dueDate: '2024-01-15',
        priority: 'high',
        status: 'pending',
      });
    });

    it('should implement fetch_info tool', async () => {
      // Arrange
      const tool: AgentTool = {
        name: 'fetch_info',
        description: 'Fetch information',
        parameters: {
          query: 'customer data',
          type: 'customer',
        },
      };

      // Act
      const result = await toolExecutor.executeTool(tool, mockContext);

      // Assert
      expect(result.success).toBe(true);
      expect(result.result).toMatchObject({
        success: true,
        query: 'customer data',
        type: 'customer',
        results: expect.arrayContaining([expect.stringContaining('customer data')]),
      });
    });

    it('should throw error for unknown default tool', async () => {
      // Arrange
      const tool: AgentTool = {
        name: 'unknown_tool',
        description: 'Unknown tool',
        parameters: {},
      };

      toolExecutor.registerTool(tool);

      // Act & Assert
      await expect(toolExecutor.executeTool(tool, mockContext)).rejects.toThrow('No handler found for tool: unknown_tool');
    });
  });

  describe('event emission', () => {
    it('should emit tool registration event', () => {
      // Arrange
      const toolRegisteredSpy = jest.fn();
      toolExecutor.on('tool:registered', toolRegisteredSpy);

      // Act
      toolExecutor.registerTool(mockTool);

      // Assert
      expect(toolRegisteredSpy).toHaveBeenCalledWith({
        toolName: 'test-tool',
        registration: expect.objectContaining({
          tool: mockTool,
          enabled: true,
        }),
      });
    });

    it('should emit tool unregistration event', () => {
      // Arrange
      const toolUnregisteredSpy = jest.fn();
      toolExecutor.on('tool:unregistered', toolUnregisteredSpy);

      toolExecutor.registerTool(mockTool);

      // Act
      toolExecutor.unregisterTool(mockTool.name);

      // Assert
      expect(toolUnregisteredSpy).toHaveBeenCalledWith({
        toolName: 'test-tool',
      });
    });

    it('should emit tool enable/disable events', () => {
      // Arrange
      const toolEnabledSpy = jest.fn();
      const toolDisabledSpy = jest.fn();
      toolExecutor.on('tool:enabled', toolEnabledSpy);
      toolExecutor.on('tool:disabled', toolDisabledSpy);

      toolExecutor.registerTool(mockTool);

      // Act
      toolExecutor.disableTool(mockTool.name);
      toolExecutor.enableTool(mockTool.name);

      // Assert
      expect(toolDisabledSpy).toHaveBeenCalledWith({ toolName: 'test-tool' });
      expect(toolEnabledSpy).toHaveBeenCalledWith({ toolName: 'test-tool' });
    });
  });
});
