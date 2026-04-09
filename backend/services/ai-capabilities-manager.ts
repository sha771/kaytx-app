import { multiAgentCoordinator } from './multi-agent-coordinator';
import { decisionLogger } from './consolidated-decision-logging-service';
import { errorRecoveryService } from './consolidated-error-recovery-service';
import { multiModelRouter } from './multi-model-router';
import { multimodalInputProcessor } from './multimodal-input-processor';


import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

/**
 * AI Capabilities Integration Manager
 * 
 * This module integrates all P2 AI capabilities into a unified system:
 * - Multi-agent coordination (20h)
 * - Decision logging (15h) 
 * - Error recovery (10h)
 * - Multi-model routing (15h)
 * - Multimodal input processing (15h)
 */

export interface AICapabilitiesConfig {
  organizationId: string;
  enableMultiAgentCoordination: boolean;
  enableDecisionLogging: boolean;
  enableErrorRecovery: boolean;
  enableMultiModelRouting: boolean;
  enableMultimodalProcessing: boolean;
  monitoring: {
    enabled: boolean;
    interval: number;
    alertThresholds: Record<string, number>;
  };
}

export interface AICapabilitiesMetrics {
  totalRequests: number;
  successfulRequests: number;
  errorRate: number;
  averageResponseTime: number;
  activeAgents: number;
  decisionsLogged: number;
  errorsRecovered: number;
  modelsRouted: number;
  multimodalProcessed: number;
  timestamp: Date;
}

export class AICapabilitiesManager {
  private config: AICapabilitiesConfig;
  private metrics: AICapabilitiesMetrics;
  private monitoringInterval: NodeJS.Timeout | null = null;

  constructor(config: AICapabilitiesConfig) {
    this.config = config;
    this.metrics = {
      totalRequests: 0,
      successfulRequests: 0,
      errorRate: 0,
      averageResponseTime: 0,
      activeAgents: 0,
      decisionsLogged: 0,
      errorsRecovered: 0,
      modelsRouted: 0,
      multimodalProcessed: 0,
      timestamp: new Date()
    };

    this.initialize();
  }

  private initialize(): void {
    // Start monitoring if enabled
    if (this.config.monitoring.enabled) {
      this.startMonitoring();
    }

    // Set up event listeners for cross-capability integration
    this.setupEventListeners();

    logger.info(`Initialized with all P2 AI capabilities`);
  }

  private setupEventListeners(): void {
    // Multi-agent coordination events
    multiAgentCoordinator.on('taskCreated', (task) => {
      this.metrics.activeAgents++;
      this.logCapabilityEvent('multi_agent_coordination', 'task_created', { taskId: task.id });
    });

    multiAgentCoordinator.on('consensusReached', (data) => {
      this.logCapabilityEvent('multi_agent_coordination', 'consensus_reached', data);
    });

    // Decision logging events
    decisionLogger.on('decisionLogged', (decision) => {
      this.metrics.decisionsLogged++;
      this.logCapabilityEvent('decision_logging', 'decision_logged', { decisionId: decision.id });
    });

    // Error recovery events
    errorRecoveryManager.on('errorOccurred', (errorEvent) => {
      this.logCapabilityEvent('error_recovery', 'error_occurred', { errorId: errorEvent.id });
    });

    errorRecoveryManager.on('recoveryCompleted', (data) => {
      this.metrics.errorsRecovered++;
      this.logCapabilityEvent('error_recovery', 'recovery_completed', data);
    });

    // Multi-model routing events
    multiModelRouter.on('requestRouted', (data) => {
      this.metrics.modelsRouted++;
      this.logCapabilityEvent('multi_model_routing', 'request_routed', { 
        model: data.decision.selectedModel,
        confidence: data.decision.confidence 
      });
    });

    // Multimodal processing events
    multimodalInputProcessor.on('processingCompleted', (data) => {
      this.metrics.multimodalProcessed++;
      this.logCapabilityEvent('multimodal_processing', 'processing_completed', { 
        inputId: data.input.id,
        duration: data.input.processing.duration 
      });
    });
  }

  public async processRequest(request: {
    type: 'coordination' | 'decision' | 'routing' | 'multimodal' | 'recovery';
    data: any;
    context?: Record<string, any>;
  }): Promise<any> {
    const startTime = Date.now();
    this.metrics.totalRequests++;

    try {
      let result: any;

      switch (request.type) {
        case 'coordination':
          if (!this.config.enableMultiAgentCoordination) {
            throw new Error('Multi-agent coordination is disabled');
          }
          result = await this.handleCoordinationRequest(request.data);
          break;

        case 'decision':
          if (!this.config.enableDecisionLogging) {
            throw new Error('Decision logging is disabled');
          }
          result = await this.handleDecisionRequest(request.data);
          break;

        case 'routing':
          if (!this.config.enableMultiModelRouting) {
            throw new Error('Multi-model routing is disabled');
          }
          result = await this.handleRoutingRequest(request.data);
          break;

        case 'multimodal':
          if (!this.config.enableMultimodalProcessing) {
            throw new Error('Multimodal processing is disabled');
          }
          result = await this.handleMultimodalRequest(request.data);
          break;

        case 'recovery':
          if (!this.config.enableErrorRecovery) {
            throw new Error('Error recovery is disabled');
          }
          result = await this.handleRecoveryRequest(request.data);
          break;

        default:
          throw new Error(`Unknown request type: ${request.type}`);
      }

      this.metrics.successfulRequests++;
      const duration = Date.now() - startTime;
      this.updateAverageResponseTime(duration);

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Attempt error recovery if enabled
      if (this.config.enableErrorRecovery && request.type !== 'recovery') {
        try {
          await errorRecoveryManager.handleError({
            error: error instanceof Error ? error : new Error(errorMessage),
            organizationId: this.config.organizationId,
            context: { requestType: request.type, ...request.context }
          });
        } catch (recoveryError) {
          logger.error('[AICapabilitiesManager] Error recovery failed:', recoveryError);
        }
      }

      throw error;
    }
  }

  private async handleCoordinationRequest(data: any): Promise<any> {
    if (data.action === 'createTask') {
      return await multiAgentCoordinator.createCoordinationTask({
        title: data.title,
        description: data.description,
        coordinatorId: data.coordinatorId,
        requiredCapabilities: data.requiredCapabilities,
        priority: data.priority,
        organizationId: this.config.organizationId
      });
    }

    if (data.action === 'startSession') {
      return await multiAgentCoordinator.startCollaborationSession(
        data.taskId,
        data.strategy,
        this.config.organizationId
      );
    }

    throw new Error(`Unknown coordination action: ${data.action}`);
  }

  private async handleDecisionRequest(data: any): Promise<any> {
    return await decisionLogger.logDecision({
      organizationId: this.config.organizationId,
      agentId: data.agentId,
      agentName: data.agentName,
      decisionType: data.decisionType,
      category: data.category,
      priority: data.priority,
      context: data.context,
      reasoning: data.reasoning,
      outcome: data.outcome,
      impact: data.impact,
      alternatives: data.alternatives,
      metadata: data.metadata
    });
  }

  private async handleRoutingRequest(data: any): Promise<any> {
    return await multiModelRouter.routeRequest({
      id: data.id,
      organizationId: this.config.organizationId,
      userId: data.userId,
      sessionId: data.sessionId,
      taskType: data.taskType,
      requirements: data.requirements,
      input: data.input,
      context: data.context,
      preferences: data.preferences,
      constraints: data.constraints,
      timestamp: new Date()
    });
  }

  private async handleMultimodalRequest(data: any): Promise<any> {
    return await multimodalInputProcessor.processInput(data.input, data.pipelineId);
  }

  private async handleRecoveryRequest(data: any): Promise<any> {
    return await errorRecoveryManager.handleError({
      error: data.error,
      organizationId: this.config.organizationId,
      agentId: data.agentId,
      sessionId: data.sessionId,
      context: data.context,
      automatic: data.automatic
    });
  }

  public getMetrics(): AICapabilitiesMetrics {
    // Update error rate
    this.metrics.errorRate = this.metrics.totalRequests > 0 
      ? (this.metrics.totalRequests - this.metrics.successfulRequests) / this.metrics.totalRequests 
      : 0;

    return { ...this.metrics };
  }

  public getCapabilityStatus(): Record<string, any> {
    return {
      multiAgentCoordination: {
        enabled: this.config.enableMultiAgentCoordination,
        activeSessions: multiAgentCoordinator.getActiveSessions().length,
        taskQueue: multiAgentCoordinator.getTaskQueue().length
      },
      decisionLogging: {
        enabled: this.config.enableDecisionLogging,
        totalDecisions: this.metrics.decisionsLogged
      },
      errorRecovery: {
        enabled: this.config.enableErrorRecovery,
        activeRecoveries: errorRecoveryManager.getActiveRecoveries().length,
        circuitBreakers: errorRecoveryManager.getCircuitBreakers().length
      },
      multiModelRouting: {
        enabled: this.config.enableMultiModelRouting,
        availableModels: multiModelRouter.getAvailableModels().length,
        totalRouted: this.metrics.modelsRouted
      },
      multimodalProcessing: {
        enabled: this.config.enableMultimodalProcessing,
        totalProcessed: this.metrics.multimodalProcessed
      }
    };
  }

  public async getAnalytics(): Promise<any> {
    const analytics: any = {
      overview: this.getMetrics(),
      capabilities: this.getCapabilityStatus()
    };

    if (this.config.enableDecisionLogging) {
      analytics.decisionAnalytics = await decisionLogger.getDecisionAnalytics(this.config.organizationId);
    }

    if (this.config.enableMultiModelRouting) {
      analytics.routingHistory = multiModelRouter.getRoutingHistory(this.config.organizationId);
    }

    if (this.config.enableMultimodalProcessing) {
      analytics.processingHistory = multimodalInputProcessor.getProcessingHistory(this.config.organizationId);
    }

    return analytics;
  }

  private updateAverageResponseTime(duration: number): void {
    const total = this.metrics.averageResponseTime * (this.metrics.successfulRequests - 1) + duration;
    this.metrics.averageResponseTime = total / this.metrics.successfulRequests;
  }

  private startMonitoring(): void {
    this.monitoringInterval = setInterval(() => {
      this.performHealthCheck();
      this.updateMetrics();
    }, this.config.monitoring.interval);
  }

  private async performHealthCheck(): Promise<void> {
    const healthStatus: Record<string, boolean> = {};

    try {
      // Check each capability health
      if (this.config.enableMultiAgentCoordination) {
        healthStatus.multiAgentCoordination = multiAgentCoordinator.getActiveSessions().length >= 0;
      }

      if (this.config.enableMultiModelRouting) {
        healthStatus.multiModelRouting = multiModelRouter.getAvailableModels().length > 0;
      }

      if (this.config.enableErrorRecovery) {
        healthStatus.errorRecovery = errorRecoveryManager.getCircuitBreakers().length >= 0;
      }

      // Check for alert conditions
      for (const [capability, healthy] of Object.entries(healthStatus)) {
        const threshold = this.config.monitoring.alertThresholds[capability] || 0.5;
        if (!healthy && this.metrics.errorRate > threshold) {
          this.emit('healthAlert', {
            capability,
            status: 'unhealthy',
            metrics: this.metrics,
            timestamp: new Date()
          });
        }
      }

    } catch (error) {
      logger.error('[AICapabilitiesManager] Health check failed:', error);
    }
  }

  private updateMetrics(): void {
    this.metrics.timestamp = new Date();
    
    // Update active agents count
    if (this.config.enableMultiAgentCoordination) {
      this.metrics.activeAgents = multiAgentCoordinator.getActiveSessions().length;
    }

    this.emit('metricsUpdated', this.metrics);
  }

  private logCapabilityEvent(capability: string, event: string, data: any): void {
    logger.info(`[AICapabilitiesManager] ${capability}: ${event}`, data);
    this.emit('capabilityEvent', { capability, event, data, timestamp: new Date() });
  }

  public async shutdown(): Promise<void> {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    // Shutdown all capabilities
    await Promise.all([
      multiAgentCoordinator.shutdown(),
      decisionLogger.shutdown(),
      errorRecoveryManager.shutdown(),
      multiModelRouter.shutdown(),
      multimodalInputProcessor.shutdown()
    ]);

    logger.info(`All AI capabilities shut down successfully`);
  }

  public updateConfig(newConfig: Partial<AICapabilitiesConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Restart monitoring if interval changed
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      if (this.config.monitoring.enabled) {
        this.startMonitoring();
      }
    }

    logger.info(`Configuration updated`);
  }
}

// Export singleton instances for direct access
export {
  multiAgentCoordinator,
  decisionLogger,
  errorRecoveryManager,
  multiModelRouter,
  multimodalInputProcessor
};
