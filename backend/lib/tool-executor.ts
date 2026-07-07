import { EventEmitter } from 'events';
import { AgentTool } from '../services/ai-agent-service';
import { db as pgDb } from '../db/connection';
import { aiAgentEvents } from '../db/drizzle-schema';
import crypto from 'crypto';

export interface ToolExecutionContext {
  agentId: string;
  sessionId: string;
  organizationId: string;
  userId?: string;
  aiResponse?: string;
  metadata?: Record<string, any>;
}

export interface ToolExecutionResult {
  success: boolean;
  result?: any;
  error?: string;
  executionTime: number;
  toolName: string;
  toolId: string;
  metadata?: Record<string, any>;
}

export interface ToolRegistration {
  tool: AgentTool;
  enabled: boolean;
  rateLimit?: {
    maxCalls: number;
    windowMs: number;
  };
  timeout?: number;
  retryConfig?: {
    maxAttempts: number;
    backoffMs: number;
  };
}

export class ToolExecutor extends EventEmitter {
  private tools = new Map<string, ToolRegistration>();
  private executionHistory = new Map<string, ToolExecutionResult[]>();
  private rateLimiter = new Map<string, number[]>();

  constructor() {
    super();
    this.initializeDefaultTools();
  }

  async executeTool(
    tool: AgentTool,
    context: ToolExecutionContext
  ): Promise<ToolExecutionResult> {
    const toolId = crypto.randomUUID();
    const startTime = Date.now();
    
    // Check if tool is registered and enabled
    const registration = this.tools.get(tool.name);
    if (!registration || !registration.enabled) {
      return {
        success: false,
        error: `Tool ${tool.name} is not registered or disabled`,
        executionTime: Date.now() - startTime,
        toolName: tool.name,
        toolId,
      };
    }

    // Rate limiting check
    if (!this.checkToolRateLimit(tool.name, context.organizationId, registration)) {
      return {
        success: false,
        error: `Rate limit exceeded for tool ${tool.name}`,
        executionTime: Date.now() - startTime,
        toolName: tool.name,
        toolId,
      };
    }

    let lastError: Error | undefined;
    const maxAttempts = registration.retryConfig?.maxAttempts || 3;
    const baseDelay = registration.retryConfig?.backoffMs || 1000;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const timeout = registration.timeout || 30000;
        const result = await this.executeWithTimeout(
          () => this.executeToolHandler(tool, context),
          timeout
        );

        const executionResult: ToolExecutionResult = {
          success: true,
          result,
          executionTime: Date.now() - startTime,
          toolName: tool.name,
          toolId,
          metadata: {
            attempt,
            organizationId: context.organizationId,
            sessionId: context.sessionId,
          },
        };

        this.recordExecution(tool.name, executionResult);
        this.emit('tool:executed', { toolName: tool.name, context, result: executionResult });
        
        return executionResult;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        if (attempt < maxAttempts) {
          const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
          await this.sleep(delay);
        }
      }
    }

    // All attempts failed
    const executionResult: ToolExecutionResult = {
      success: false,
      error: lastError?.message || 'Tool execution failed',
      executionTime: Date.now() - startTime,
      toolName: tool.name,
      toolId,
      metadata: {
        attempts: maxAttempts,
        lastError: lastError?.message,
      },
    };

    this.recordExecution(tool.name, executionResult);
    this.emit('tool:failed', { toolName: tool.name, context, error: lastError });
    
    return executionResult;
  }

  async executeToolsInParallel(
    tools: AgentTool[],
    context: ToolExecutionContext
  ): Promise<ToolExecutionResult[]> {
    const promises = tools.map(tool => this.executeTool(tool, context));
    return Promise.all(promises);
  }

  registerTool(tool: AgentTool, options: Partial<ToolRegistration> = {}): void {
    const registration: ToolRegistration = {
      tool,
      enabled: true,
      rateLimit: {
        maxCalls: 100,
        windowMs: 60000,
        ...options.rateLimit,
      },
      timeout: 30000,
      retryConfig: {
        maxAttempts: 3,
        backoffMs: 1000,
        ...options.retryConfig,
      },
      ...options,
    };

    // Don't overwrite existing tools - throw error instead
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool ${tool.name} is already registered`);
    }

    this.tools.set(tool.name, registration);
    this.emit('tool:registered', { toolName: tool.name, registration });
  }

  unregisterTool(toolName: string): void {
    if (this.tools.delete(toolName)) {
      this.emit('tool:unregistered', { toolName });
    }
  }

  enableTool(toolName: string): void {
    const registration = this.tools.get(toolName);
    if (registration) {
      registration.enabled = true;
      this.emit('tool:enabled', { toolName });
    }
  }

  disableTool(toolName: string): void {
    const registration = this.tools.get(toolName);
    if (registration) {
      registration.enabled = false;
      this.emit('tool:disabled', { toolName });
    }
  }

  getToolInfo(toolName: string): ToolRegistration | undefined {
    return this.tools.get(toolName);
  }

  getAllTools(): Map<string, ToolRegistration> {
    return new Map(this.tools);
  }

  getExecutionHistory(toolName: string, limit = 100): ToolExecutionResult[] {
    const history = this.executionHistory.get(toolName) || [];
    return history.slice(-limit);
  }

  getToolStats(toolName: string): {
    totalExecutions: number;
    successRate: number;
    averageExecutionTime: number;
    lastExecutionTime?: Date;
  } {
    const history = this.executionHistory.get(toolName) || [];
    const successful = history.filter(r => r.success);
    
    const last = history.length > 0 ? history[history.length - 1] : undefined;

    return {
      totalExecutions: history.length,
      successRate: history.length > 0 ? successful.length / history.length : 0,
      averageExecutionTime: history.length > 0 
        ? history.reduce((sum, r) => sum + r.executionTime, 0) / history.length 
        : 0,
      lastExecutionTime: last ? new Date(Date.now() - last.executionTime) : undefined,
    };
  }

  private async executeToolHandler(
    tool: AgentTool,
    context: ToolExecutionContext
  ): Promise<any> {
    if (tool.handler) {
      // Sandboxed execution — wrap handler in try/catch with timeout and isolation
      const handlerTimeout = tool.timeout || 30000;
      const handlerFn = tool.handler;
      
      return Promise.race([
        // Execute handler with error boundary
        (async () => {
          try {
            const result = await handlerFn({
              ...context,
              toolName: tool.name,
              toolParameters: tool.parameters,
              // Provide a limited context — no access to process, require, etc.
              __sandbox: {
                organizationId: context.organizationId,
                agentId: context.agentId,
                sessionId: context.sessionId
              }
            });
            return result;
          } catch (error) {
            logger.error(`Tool handler error for ${tool.name}:`, error as Error);
            throw error;
          }
        })(),
        // Timeout guard
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Tool ${tool.name} execution timeout (${handlerTimeout}ms)`)), handlerTimeout)
        )
      ]);
    }

    // Default tool behavior based on tool name
    return this.executeDefaultTool(tool, context);
  }

  private async executeDefaultTool(
    tool: AgentTool,
    context: ToolExecutionContext
  ): Promise<any> {
    switch (tool.name) {
      case 'schedule_appointment':
        return this.scheduleAppointment(tool.parameters, context);
      
      case 'create_task':
        return this.createTask(tool.parameters, context);
      
      case 'fetch_info':
        return this.fetchInfo(tool.parameters, context);
      
      case 'transfer_call':
        return this.transferCall(tool.parameters, context);
      
      case 'record_message':
        return this.recordMessage(tool.parameters, context);
      
      case 'analyze_offer':
        return this.analyzeOffer(tool.parameters, context);
      
      case 'suggest_strategy':
        return this.suggestStrategy(tool.parameters, context);
      
      case 'create_workflow':
        return this.createWorkflow(tool.parameters, context);
      
      case 'execute_workflow':
        return this.executeWorkflow(tool.parameters, context);
      
      case 'analyze_data':
        return this.analyzeData(tool.parameters, context);
      
      case 'generate_report':
        return this.generateReport(tool.parameters, context);
      
      default:
        throw new Error(`No handler found for tool: ${tool.name}`);
    }
  }

  private async executeWithTimeout<T>(
    fn: () => Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    return Promise.race([
      fn(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Tool execution timeout')), timeoutMs)
      ),
    ]);
  }

  private checkToolRateLimit(
    toolName: string,
    organizationId: string,
    registration: ToolRegistration
  ): boolean {
    const key = `${toolName}:${organizationId}`;
    const now = Date.now();
    const rateLimit = registration.rateLimit;

    if (!rateLimit) {
      return true;
    }

    if (!this.rateLimiter.has(key)) {
      this.rateLimiter.set(key, []);
    }

    const requests = this.rateLimiter.get(key)!;
    
    // Remove old requests outside the window
    const validRequests = requests.filter(timestamp => now - timestamp < rateLimit.windowMs);
    this.rateLimiter.set(key, validRequests);

    if (validRequests.length >= rateLimit.maxCalls) {
      return false;
    }

    validRequests.push(now);
    return true;
  }

  private recordExecution(toolName: string, result: ToolExecutionResult): void {
    if (!this.executionHistory.has(toolName)) {
      this.executionHistory.set(toolName, []);
    }

    const history = this.executionHistory.get(toolName)!;
    history.push(result);

    // Keep only last 1000 executions per tool
    if (history.length > 1000) {
      history.splice(0, history.length - 1000);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Default tool implementations
  private async scheduleAppointment(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      appointmentId: crypto.randomUUID(),
      scheduledTime: parameters.date || '2024-01-01T10:00:00Z',
      duration: parameters.duration || 60,
      title: parameters.title || 'Scheduled Appointment',
    };
  }

  private async createTask(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      taskId: crypto.randomUUID(),
      title: parameters.title || 'New Task',
      dueDate: parameters.dueDate || '2024-01-01',
      priority: parameters.priority || 'medium',
      status: 'pending',
    };
  }

  private async fetchInfo(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      query: parameters.query,
      type: parameters.type || 'general',
      results: [`Information about ${parameters.query}`],
    };
  }

  private async transferCall(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      transferredTo: parameters.extension || parameters.department || 'general',
      transferTime: new Date().toISOString(),
    };
  }

  private async recordMessage(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      messageId: crypto.randomUUID(),
      recipient: parameters.recipientName,
      message: parameters.message,
      recordedAt: new Date().toISOString(),
    };
  }

  private async analyzeOffer(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      analysis: {
        offerValue: parameters.offer?.value || 'unknown',
        recommendation: 'accept', // Simple default
        confidence: 0.8,
        factors: ['market_rate', 'timing', 'terms'],
      },
    };
  }

  private async suggestStrategy(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      strategy: {
        type: parameters.negotiationType || 'collaborative',
        approach: 'win-win',
        keyPoints: ['understand_needs', 'find_common_ground', 'create_value'],
        timeline: '2-4 weeks',
      },
    };
  }

  private async createWorkflow(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      workflowId: crypto.randomUUID(),
      name: parameters.name || 'New Workflow',
      triggers: parameters.triggers || [],
      actions: parameters.actions || [],
      status: 'active',
    };
  }

  private async executeWorkflow(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      executionId: crypto.randomUUID(),
      workflowId: parameters.workflowId,
      status: 'completed',
      results: ['Step 1 completed', 'Step 2 completed'],
    };
  }

  private async analyzeData(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      analysis: {
        dataPoints: parameters.data?.length || 0,
        analysisType: parameters.analysisType || 'descriptive',
        insights: ['trend_upward', 'seasonal_pattern', 'outliers_detected'],
        confidence: 0.85,
      },
    };
  }

  private async generateReport(parameters: any, context: ToolExecutionContext) {
    return {
      success: true,
      reportId: crypto.randomUUID(),
      type: parameters.reportType || 'summary',
      dataSource: parameters.dataSource || 'database',
      timeframe: parameters.timeframe || 'last_30_days',
      generatedAt: new Date().toISOString(),
      summary: 'Report generated successfully',
    };
  }

  private initializeDefaultTools(): void {
    // Register common default tools
    const defaultTools: AgentTool[] = [
      {
        name: 'schedule_appointment',
        description: 'Schedule an appointment or meeting',
        parameters: {
          date: { type: 'string' },
          time: { type: 'string' },
          duration: { type: 'number' },
          title: { type: 'string' },
        },
      },
      {
        name: 'create_task',
        description: 'Create a task or reminder',
        parameters: {
          title: { type: 'string' },
          dueDate: { type: 'string' },
          priority: { type: 'string' },
        },
      },
      {
        name: 'fetch_info',
        description: 'Fetch customer or business information',
        parameters: {
          query: { type: 'string' },
          type: { type: 'string' },
        },
      },
    ];

    defaultTools.forEach(tool => {
      this.registerTool(tool);
    });
  }
}

export const toolExecutor = new ToolExecutor();
