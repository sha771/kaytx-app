import crypto from "crypto";
import { monitoring } from '../../utils/monitoring';
import { recordAIRequest, aiRequestDuration, aiRequestTotal, aiTokensUsed, aiCost } from './prometheus-metrics';
import { traceAICall, addSpanAttributes, addSpanEvent } from './opentelemetry';
import { ProductionLogger } from './production-logger';

const loggerInstance = ProductionLogger.getInstance();

/**
 * AI Service Structured Logging
 * Comprehensive logging for AI agents with correlation IDs and request/response tracking
 */

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  CRITICAL = "CRITICAL",
}

export interface StructuredLogEntry {
  timestamp: string;
  level: LogLevel;
  correlationId: string;
  service: string;
  agent?: string;
  message: string;
  metadata?: Record<string, any>;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
  requestId?: string;
  userId?: string;
  duration?: number;
  status?: "success" | "error" | "partial";
}

export class AIServiceLogger {
  private static logBuffer: StructuredLogEntry[] = [];
  private static readonly MAX_BUFFER_SIZE = 10000;
  private static readonly FLUSH_INTERVAL = 30000; // 30 seconds

  private static pushToBuffer(entry: StructuredLogEntry) {
    this.logBuffer.push(entry);
    if (this.logBuffer.length > this.MAX_BUFFER_SIZE) {
      this.logBuffer.splice(0, this.logBuffer.length - this.MAX_BUFFER_SIZE);
    }
  }

  /**
   * Initialize logger and start flush timer
   */
  static initialize() {
    const timer = setInterval(() => this.flush(), this.FLUSH_INTERVAL);
    // Avoid keeping the process alive in unit tests / short-lived CLI runs
    timer.unref?.();
    loggerInstance.info("[AIServiceLogger] Initialized with structured logging");
  }

  static logAgentEvent(
    event: string,
    agentId: string,
    metadata?: Record<string, any>,
    correlationId?: string
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      correlationId: correlationId || crypto.randomUUID(),
      service: 'ai-agent',
      agent: agentId,
      message: event,
      metadata,
      status: 'success',
    };

    this.pushToBuffer(entry);

    monitoring.info('ai_agent', event, {
      agentId,
      correlationId: entry.correlationId,
      ...(metadata ?? {}),
    });
  }

  /**
   * Create structured log entry
   */
  private static createEntry(
    level: LogLevel,
    service: string,
    message: string,
    metadata?: any,
    correlationId?: string
  ): StructuredLogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      correlationId: correlationId || crypto.randomUUID(),
      service,
      message,
      metadata,
    };
  }

  /**
   * Log AI agent request
   */
  static logAgentRequest(
    agentType: string,
    userId: string,
    input: any,
    correlationId?: string
  ): string {
    const cid = correlationId || crypto.randomUUID();
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      correlationId: cid,
      service: "ai-agent",
      agent: agentType,
      message: `AI agent request initiated`,
      requestId: crypto.randomUUID(),
      userId,
      metadata: {
        agentType,
        inputLength: JSON.stringify(input).length,
        inputHash: this.hashInput(input),
      },
      status: "success",
    };

    this.pushToBuffer(entry);
    loggerInstance.info(`[${agentType}] Request`, { correlationId: cid });

    // Track in monitoring service
    monitoring.info('ai_agent', 'Request initiated', {
      agentType,
      userId,
      correlationId: cid,
      inputLength: JSON.stringify(input).length,
    });

    // Add span attributes for distributed tracing
    addSpanAttributes({
      'ai.agent.type': agentType,
      'ai.agent.user_id': userId,
      'ai.agent.correlation_id': cid,
      'ai.agent.input_length': JSON.stringify(input).length,
    });

    return cid;
  }

  /**
   * Log AI agent response
   */
  static logAgentResponse(
    agentType: string,
    correlationId: string,
    output: any,
    duration: number,
    tokensUsed?: { input: number; output: number },
    provider?: string,
    model?: string,
    cost?: number
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `AI agent response completed`,
      duration,
      metadata: {
        agentType,
        outputLength: JSON.stringify(output).length,
        tokensUsed: tokensUsed || { input: 0, output: 0 },
        provider,
        model,
        cost,
      },
      status: "success",
    };

    this.pushToBuffer(entry);
    loggerInstance.info(`[${agentType}] Response completed`, { duration, correlationId });

    // Track in monitoring service
    monitoring.trackPerformance('ai_agent_response', duration, 'ms', {
      agentType,
      correlationId,
      outputLength: JSON.stringify(output).length,
      tokensUsed,
      provider,
      model,
      cost,
    });

    // Record Prometheus metrics
    if (provider && model) {
      recordAIRequest(provider, model, 'completion', duration, 'success', tokensUsed ? { prompt: tokensUsed.input, completion: tokensUsed.output } : undefined, cost);
    }

    // Add span event
    addSpanEvent('ai_response_completed', {
      'ai.agent.type': agentType,
      'ai.agent.duration_ms': duration,
      'ai.agent.output_length': JSON.stringify(output).length,
      'ai.agent.tokens_input': tokensUsed?.input || 0,
      'ai.agent.tokens_output': tokensUsed?.output || 0,
    });
  }

  /**
   * Log AI agent error
   */
  static logAgentError(
    agentType: string,
    correlationId: string,
    error: Error,
    context?: any
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `AI agent error occurred`,
      error: {
        message: error.message,
        ...(error.stack ? { stack: error.stack } : {}),
        ...((error as any).code ? { code: String((error as any).code) } : {}),
      },
      metadata: context,
      status: "error",
    };

    this.pushToBuffer(entry);
    loggerInstance.error(`[${agentType}] Error`, error, { correlationId });
  }

  /**
   * Log tool execution
   */
  static logToolExecution(
    agentType: string,
    correlationId: string,
    toolName: string,
    input: any,
    result: any,
    duration: number
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `Tool executed: ${toolName}`,
      duration,
      metadata: {
        toolName,
        inputHash: this.hashInput(input),
        resultLength: JSON.stringify(result).length,
      },
      status: "success",
    };

    this.pushToBuffer(entry);
  }

  /**
   * Log API call made by agent
   */
  static logAPICall(
    agentType: string,
    correlationId: string,
    endpoint: string,
    method: string,
    statusCode: number,
    duration: number
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: statusCode >= 400 ? LogLevel.WARN : LogLevel.DEBUG,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `API call: ${method} ${endpoint}`,
      duration,
      metadata: {
        endpoint,
        method,
        statusCode,
      },
      status: statusCode >= 400 ? "error" : "success",
    };

    this.logBuffer.push(entry);
  }

  /**
   * Log conversation turn in conversational agent
   */
  static logConversationTurn(
    agentType: string,
    correlationId: string,
    userId: string,
    userMessage: string,
    agentResponse: string,
    duration: number
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `Conversation turn completed`,
      requestId: crypto.randomUUID(),
      userId,
      duration,
      metadata: {
        agentType,
        userMessageLength: userMessage.length,
        responseLength: agentResponse.length,
        messageHash: this.hashMessage(userMessage),
        responseHash: this.hashMessage(agentResponse),
      },
      status: "success",
    };

    this.logBuffer.push(entry);
  }

  /**
   * Log decision made by agent
   */
  static logDecision(
    agentType: string,
    correlationId: string,
    decision: string,
    reasoning: string,
    confidence: number
  ) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `Decision made: ${decision}`,
      metadata: {
        agentType,
        decision,
        reasoning: reasoning.substring(0, 500), // Truncate for storage
        confidence,
      },
      status: "success",
    };

    this.logBuffer.push(entry);
  }

  /**
   * Log context window usage
   */
  static logContextUsage(
    agentType: string,
    correlationId: string,
    contextSize: number,
    maxSize: number,
    percentUsed: number
  ) {
    const level =
      percentUsed > 0.9
        ? LogLevel.WARN
        : percentUsed > 0.75
          ? LogLevel.INFO
          : LogLevel.DEBUG;

    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level,
      correlationId,
      service: "ai-agent",
      agent: agentType,
      message: `Context usage: ${percentUsed.toFixed(1)}%`,
      metadata: {
        agentType,
        contextSize,
        maxSize,
        percentUsed: percentUsed.toFixed(2),
      },
      status: "success",
    };

    this.logBuffer.push(entry);
  }

  /**
   * Generic structured log
   */
  static log(
    level: LogLevel,
    service: string,
    message: string,
    metadata?: any,
    correlationId?: string
  ) {
    const entry = this.createEntry(level, service, message, metadata, correlationId);
    this.pushToBuffer(entry);

    if (level === LogLevel.ERROR || level === LogLevel.CRITICAL) {
      loggerInstance.error(`[${service}] ${message}`, undefined, metadata);
    } else {
      loggerInstance.info(`[${service}] ${message}`, metadata);
    }
  }

  /**
   * Flush logs to persistent storage or logging service
   */
  static flush() {
    if (this.logBuffer.length === 0) return;

    const logsToFlush = [...this.logBuffer];
    this.logBuffer = [];

    // In production, would send to:
    // - Elasticsearch for indexing
    // - CloudWatch/StackDriver
    // - DataDog
    // - Splunk
    this.exportLogs(logsToFlush);
  }

  /**
   * Export logs to external system
   */
  private static async exportLogs(logs: StructuredLogEntry[]) {
    loggerInstance.info(`[Logger] Flushing log entries`, { count: logs.length });

    // Batch logs for efficient processing
    const batchSize = 100;
    const batches = [];
    for (let i = 0; i < logs.length; i += batchSize) {
      batches.push(logs.slice(i, i + batchSize));
    }

    // Export to configured logging service
    const logEndpoint = process.env.LOG_EXPORT_ENDPOINT;
    const logApiKey = process.env.LOG_EXPORT_API_KEY;

    if (logEndpoint && logApiKey) {
      try {
        await Promise.all(
          batches.map(async (batch) => {
            const response = await fetch(logEndpoint, {
              method: 'POST',
              body: JSON.stringify({
                logs: batch,
                timestamp: new Date().toISOString(),
                source: 'ai-service-logger'
              }),
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logApiKey}`,
                'X-Batch-Size': batch.length.toString()
              }
            });

            if (!response.ok) {
              throw new Error(`Export failed: ${response.status} ${response.statusText}`);
            }

            return response.json();
          })
        );

        loggerInstance.info(`[Logger] Successfully exported log entries`, { count: logs.length });
      } catch (error) {
        loggerInstance.error('Failed to export logs', error as Error);
        // Fallback to local file storage
        await this.exportToFile(logs);
      }
    } else {
      // Fallback to local file storage
      await this.exportToFile(logs);
    }
  }

  /**
   * Fallback file export for logs
   */
  private static async exportToFile(logs: StructuredLogEntry[]) {
    try {
      // Use require instead of dynamic import to avoid callback issues
      const fs = require('fs/promises');
      const path = require('path');
      
      const logDir = path.join((process as any).cwd(), 'logs');
      const logFile = path.join(logDir, `ai-service-${new Date().toISOString().split('T')[0]}.json`);
      
      // Ensure log directory exists
      await fs.mkdir(logDir, { recursive: true });
      
      // Append logs to file
      const logEntry = {
        timestamp: new Date().toISOString(),
        count: logs.length,
        logs: logs
      };
      
      await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
      loggerInstance.info(`[Logger] Exported logs to file`, { count: logs.length, file: logFile });
    } catch (error) {
      loggerInstance.error('Failed to export logs to file', error as Error);
    }
  }

  /**
   * Query logs by correlation ID
   */
  static getLogs(correlationId: string): StructuredLogEntry[] {
    return this.logBuffer.filter((log) => log.correlationId === correlationId);
  }

  /**
   * Query logs by agent type
   */
  static getAgentLogs(agentType: string): StructuredLogEntry[] {
    return this.logBuffer.filter((log) => log.agent === agentType);
  }

  /**
   * Get error logs
   */
  static getErrors(): StructuredLogEntry[] {
    return this.logBuffer.filter((log) => log.level === LogLevel.ERROR);
  }

  static info(message: string, metadata?: any, correlationId?: string) {
    this.log(LogLevel.INFO, 'ai-service', message, metadata, correlationId);
  }

  static warn(message: string, metadata?: any, correlationId?: string) {
    this.log(LogLevel.WARN, 'ai-service', message, metadata, correlationId);
  }

  static error(message: string, error?: Error, metadata?: any, correlationId?: string) {
    this.log(LogLevel.ERROR, 'ai-service', message, { ...metadata, error: error?.message, stack: error?.stack }, correlationId);
  }

  static logRequest(params: { id: any; action: string; data?: any; correlationId?: string }) {
    this.log(
      LogLevel.INFO,
      'queue',
      `Request: ${params.action}`,
      { id: params.id, action: params.action, data: params.data },
      params.correlationId
    );
  }

  static logResponse(params: { id: any; success: boolean; correlationId?: string; [key: string]: any }) {
    const { id, success, correlationId, ...rest } = params;
    this.log(
      success ? LogLevel.INFO : LogLevel.WARN,
      'queue',
      `Response: ${success ? 'success' : 'failure'}`,
      { id, success, ...rest },
      correlationId
    );
  }

  static logError(params: { id: any; error: Error; context?: any; correlationId?: string }) {
    const entry: StructuredLogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      correlationId: params.correlationId || crypto.randomUUID(),
      service: 'queue',
      message: 'Error',
      metadata: { id: params.id, context: params.context },
      error: {
        message: params.error.message,
        ...(params.error.stack ? { stack: params.error.stack } : {}),
        ...((params.error as any).code ? { code: String((params.error as any).code) } : {}),
      },
      status: 'error',
    };

    this.pushToBuffer(entry);
    loggerInstance.error(`[queue] Error`, params.error, { id: params.id });
  }

  /**
   * Hash input for security (don't log sensitive data)
   */
  private static hashInput(input: any): string {
    const str = JSON.stringify(input).substring(0, 100);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  /**
   * Hash message for correlation (without exposing content)
   */
  private static hashMessage(message: string): string {
    const str = message.substring(0, 100);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }
}

/**
 * Initialize logger on startup
 */
AIServiceLogger.initialize();

export default AIServiceLogger;
