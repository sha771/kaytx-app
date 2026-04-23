/**

import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

 * Unified Multi-Model Router Service
 * Intelligent routing and load balancing across multiple AI models
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { db as pgDb } from '../db/connection';
import { aiAgentEvents } from '../db/drizzle-schema';
import { eq, and, desc } from 'drizzle-orm';
import { DatabaseUtils } from '../utils/database-utils';
import { logAudit } from '../lib/audit';

export interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'cohere' | 'huggingface' | 'local' | 'custom';
  modelType: 'language' | 'vision' | 'multimodal' | 'embedding' | 'speech' | 'translation' | 'text' | 'code' | 'image' | 'audio';
  capabilities: ModelCapability[];
  performance: ModelPerformance;
  pricing: ModelPricing;
  limits: ModelLimits;
  status: 'active' | 'degraded' | 'unavailable' | 'maintenance' | 'inactive';
  endpoints: ModelEndpoint[];
  configuration: ModelConfiguration;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  endpoint: string;
  apiKey?: string;
  maxTokens?: number;
  costPerToken?: number;
  latency?: number;
  reliability?: number;
  accuracy?: number;
  contextWindow?: number;
  supportedLanguages?: string[];
  specializations?: string[];
  rateLimit?: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
  healthScore: number;
  lastHealthCheck: number;
}

export interface ModelCapability {
  name: string;
  type: 'text_generation' | 'text_analysis' | 'code_generation' | 'reasoning' | 'math' | 'creative_writing' | 'translation' | 'summarization' | 'classification' | 'extraction' | 'vision' | 'audio' | 'multimodal';
  proficiency: number; // 0-1
  supportedLanguages: string[];
  maxTokens?: number;
  contextWindow?: number;
}

export interface ModelPerformance {
  averageResponseTime: number;
  successRate: number;
  accuracy: number;
  reliability: number;
  throughput: number;
  latency: { p50: number; p95: number; p99: number; };
  quality: { coherence: number; relevance: number; helpfulness: number; safety: number; };
  avgResponseTime: number;
  totalRequests: number;
}

export interface ModelPricing {
  inputTokenPrice: number;
  outputTokenPrice: number;
  currency: string;
  billingUnit: 'tokens' | 'requests' | 'minutes';
  freeTierLimit?: number;
  enterpriseDiscount?: number;
}

export interface ModelLimits {
  maxTokensPerRequest: number;
  maxRequestsPerMinute: number;
  maxConcurrency: number;
  contextWindow: number;
}

export interface ModelEndpoint {
  url: string;
  region: string;
  priority: number;
  weight: number;
  healthStatus: 'healthy' | 'degraded' | 'unhealthy';
}

export interface ModelConfiguration {
  temperature: number;
  topP: number;
  maxTokens: number;
  presencePenalty: number;
  frequencyPenalty: number;
  stopSequences: string[];
}

export interface RoutingRequest {
  id: string;
  timestamp: number;
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  task: {
    type: 'text_generation' | 'code_generation' | 'embedding' | 'classification' | 'summarization' | 'translation' | 'analysis' | 'creative' | 'custom';
    priority: 'low' | 'medium' | 'high' | 'critical';
    complexity: 'simple' | 'moderate' | 'complex';
    domain?: string;
    language?: string;
    requirements?: string[];
  };
  input: {
    text?: string;
    tokens?: number;
    images?: string[];
    audio?: string;
    context?: Record<string, any>;
  };
  constraints: {
    maxLatency?: number;
    maxCost?: number;
    minAccuracy?: number;
    preferredProviders?: string[];
    excludedProviders?: string[];
  };
  routingStrategy: 'performance' | 'cost' | 'availability' | 'quality' | 'adaptive';
}

export interface RoutingDecision {
  requestId: string;
  selectedModel: AIModel;
  selectedEndpoint: ModelEndpoint;
  confidence: number;
  reasoning: string[];
  alternatives: {
    model: AIModel;
    score: number;
    reason: string;
  }[];
  estimatedLatency: number;
  estimatedCost: number;
  fallbackOptions: AIModel[];
}

export interface LoadBalancingStrategy {
  type: 'round_robin' | 'weighted' | 'least_connections' | 'response_time' | 'adaptive';
  config: Record<string, any>;
}

export class UnifiedMultiModelRouter extends EventEmitter {
  private models: Map<string, AIModel> = new Map();
  private loadBalancer: LoadBalancingStrategy;
  private healthCheckInterval: NodeJS.Timeout;
  private metricsCollector: MetricsCollector;
  private circuitBreakers: Map<string, CircuitBreaker> = new Map();

  constructor() {
    super();
    this.loadBalancer = { type: 'adaptive', config: {} };
    this.metricsCollector = new MetricsCollector();
    this.initializeModels();
    this.startHealthChecks();
  }

  /**
   * Route request to optimal model
   */
  async routeRequest(request: RoutingRequest): Promise<RoutingDecision> {
    const startTime = Date.now();
    
    try {
      // Filter models based on requirements
      const eligibleModels = this.filterEligibleModels(request);
      
      if (eligibleModels.length === 0) {
        throw new Error('No eligible models found for request');
      }

      // Score models based on routing strategy
      const scoredModels = await this.scoreModels(eligibleModels, request);
      
      // Select best model
      const selectedModel = this.selectBestModel(scoredModels, request);
      const selectedEndpoint = this.selectOptimalEndpoint(selectedModel);
      
      const decision: RoutingDecision = {
        requestId: request.id,
        selectedModel,
        selectedEndpoint,
        confidence: scoredModels.get(selectedModel.id)?.confidence || 0,
        reasoning: scoredModels.get(selectedModel.id)?.reasons || [],
        alternatives: this.getAlternatives(scoredModels, selectedModel),
        estimatedLatency: selectedModel.latency || 0,
        estimatedCost: this.calculateCost(request, selectedModel),
        fallbackOptions: this.getFallbackOptions(scoredModels, selectedModel)
      };

      // Log routing decision
      await this.logRoutingDecision(request, decision);
      
      // Update metrics
      this.metricsCollector.recordRouting(decision, Date.now() - startTime);
      
      this.emit('routed', decision);
      return decision;
      
    } catch (error) {
      this.metricsCollector.recordError(request, error);
      this.emit('error', error, request);
      throw error;
    }
  }

  /**
   * Filter models based on request requirements
   */
  private filterEligibleModels(request: RoutingRequest): AIModel[] {
    return Array.from(this.models.values()).filter(model => {
      // Check status
      if (model.status !== 'active' && model.status !== 'degraded') return false;
      
      // Check capabilities
      const hasRequiredCapability = model.capabilities.some(cap => 
        request.task.requirements.includes(cap.name) || 
        cap.type === request.task.type
      );
      if (!hasRequiredCapability) return false;
      
      // Check constraints
      if (request.constraints.maxLatency && model.latency && model.latency > request.constraints.maxLatency) return false;
      if (request.constraints.maxCost && model.costPerToken && this.estimateCost(request, model) > request.constraints.maxCost) return false;
      if (request.constraints.minAccuracy && model.accuracy && model.accuracy < request.constraints.minAccuracy) return false;
      
      // Check provider preferences
      if (request.constraints.preferredProviders && !request.constraints.preferredProviders.includes(model.provider)) return false;
      if (request.constraints.excludedProviders && request.constraints.excludedProviders.includes(model.provider)) return false;
      
      // Check language support
      if (request.task.language && model.supportedLanguages && !model.supportedLanguages.includes(request.task.language)) return false;
      
      // Check token limits
      if (request.input.tokens && model.maxTokens && request.input.tokens > model.maxTokens) return false;
      
      return true;
    });
  }

  /**
   * Score models based on routing strategy
   */
  private async scoreModels(models: AIModel[], request: RoutingRequest): Promise<Map<string, { score: number; confidence: number; reasons: string[] }>> {
    const scores = new Map();
    
    for (const model of models) {
      let score = 0;
      const reasons: string[] = [];
      
      switch (request.routingStrategy) {
        case 'performance':
          score = this.calculatePerformanceScore(model, request);
          reasons.push(`Performance score: ${score}`);
          break;
          
        case 'cost':
          score = this.calculateCostScore(model, request);
          reasons.push(`Cost efficiency score: ${score}`);
          break;
          
        case 'availability':
          score = this.calculateAvailabilityScore(model);
          reasons.push(`Availability score: ${score}`);
          break;
          
        case 'quality':
          score = this.calculateQualityScore(model, request);
          reasons.push(`Quality score: ${score}`);
          break;
          
        case 'adaptive':
          score = this.calculateAdaptiveScore(model, request);
          reasons.push(`Adaptive score: ${score}`);
          break;
      }
      
      // Apply load balancing
      const loadBalancedScore = this.applyLoadBalancing(model, score);
      if (loadBalancedScore !== score) {
        reasons.push(`Load balanced score: ${loadBalancedScore}`);
      }
      
      scores.set(model.id, {
        score: loadBalancedScore,
        confidence: this.calculateConfidence(model, request),
        reasons
      });
    }
    
    return scores;
  }

  /**
   * Select best model based on scores
   */
  private selectBestModel(scoredModels: Map<string, { score: number; confidence: number; reasons: string[] }>, request: RoutingRequest): AIModel {
    let bestModelId = '';
    let bestScore = -1;
    
    for (const [modelId, scoring] of scoredModels) {
      if (scoring.score > bestScore) {
        bestScore = scoring.score;
        bestModelId = modelId;
      }
    }
    
    const model = this.models.get(bestModelId);
    if (!model) {
      throw new Error('Best model not found in model registry');
    }
    
    return model;
  }

  /**
   * Select optimal endpoint for model
   */
  private selectOptimalEndpoint(model: AIModel): ModelEndpoint {
    const healthyEndpoints = model.endpoints.filter(ep => ep.healthStatus === 'healthy');
    
    if (healthyEndpoints.length === 0) {
      // Fallback to degraded endpoints
      const degradedEndpoints = model.endpoints.filter(ep => ep.healthStatus === 'degraded');
      if (degradedEndpoints.length === 0) {
        throw new Error(`No healthy endpoints available for model ${model.id}`);
      }
      return degradedEndpoints[0];
    }
    
    // Select based on weight and priority
    return healthyEndpoints.reduce((best, current) => {
      const bestScore = best.weight * best.priority;
      const currentScore = current.weight * current.priority;
      return currentScore > bestScore ? current : best;
    });
  }

  /**
   * Calculate performance score
   */
  private calculatePerformanceScore(model: AIModel, request: RoutingRequest): number {
    const latencyScore = model.latency ? Math.max(0, 1 - (model.latency / 10000)) : 0.5; // 10s max latency
    const reliabilityScore = model.reliability || 0.5;
    const throughputScore = model.performance.throughput ? Math.min(1, model.performance.throughput / 1000) : 0.5;
    
    return (latencyScore * 0.4) + (reliabilityScore * 0.3) + (throughputScore * 0.3);
  }

  /**
   * Calculate cost score
   */
  private calculateCostScore(model: AIModel, request: RoutingRequest): number {
    const estimatedCost = this.estimateCost(request, model);
    const maxReasonableCost = 0.01; // $0.01 per request as baseline
    return Math.max(0, 1 - (estimatedCost / maxReasonableCost));
  }

  /**
   * Calculate availability score
   */
  private calculateAvailabilityScore(model: AIModel): number {
    return model.healthScore / 100;
  }

  /**
   * Calculate quality score
   */
  private calculateQualityScore(model: AIModel, request: RoutingRequest): number {
    const accuracyScore = model.accuracy || 0.5;
    const qualityScore = (model.performance.quality.coherence + model.performance.quality.relevance + model.performance.quality.helpfulness) / 3;
    
    return (accuracyScore * 0.6) + (qualityScore * 0.4);
  }

  /**
   * Calculate adaptive score
   */
  private calculateAdaptiveScore(model: AIModel, request: RoutingRequest): number {
    const performance = this.calculatePerformanceScore(model, request);
    const cost = this.calculateCostScore(model, request);
    const availability = this.calculateAvailabilityScore(model);
    const quality = this.calculateQualityScore(model, request);
    
    // Weight based on task priority
    const weights = request.task.priority === 'critical' ? 
      { performance: 0.4, cost: 0.1, availability: 0.3, quality: 0.2 } :
      { performance: 0.3, cost: 0.2, availability: 0.2, quality: 0.3 };
    
    return (performance * weights.performance) + 
           (cost * weights.cost) + 
           (availability * weights.availability) + 
           (quality * weights.quality);
  }

  /**
   * Apply load balancing to score
   */
  private applyLoadBalancing(model: AIModel, score: number): number {
    switch (this.loadBalancer.type) {
      case 'round_robin':
        return score; // No modification for round robin
      case 'weighted':
        return score * (model.endpoints.reduce((sum, ep) => sum + ep.weight, 0) / model.endpoints.length);
      case 'least_connections':
        // Prefer models with less current load
        const loadFactor = model.performance.throughput ? Math.max(0.1, 1 - (model.performance.throughput / 1000)) : 0.5;
        return score * loadFactor;
      case 'response_time':
        // Prefer faster models
        const latencyFactor = model.latency ? Math.max(0.1, 1 - (model.latency / 5000)) : 0.5;
        return score * latencyFactor;
      case 'adaptive':
        // Combine multiple factors
        return score;
      default:
        return score;
    }
  }

  /**
   * Calculate confidence in routing decision
   */
  private calculateConfidence(model: AIModel, request: RoutingRequest): number {
    const statusConfidence = model.status === 'active' ? 1.0 : model.status === 'degraded' ? 0.7 : 0.3;
    const healthConfidence = model.healthScore / 100;
    const capabilityMatch = model.capabilities.some(cap => cap.type === request.task.type) ? 1.0 : 0.5;
    
    return (statusConfidence * 0.4) + (healthConfidence * 0.3) + (capabilityMatch * 0.3);
  }

  /**
   * Estimate cost for request
   */
  private estimateCost(request: RoutingRequest, model: AIModel): number {
    const inputTokens = request.input.tokens || this.estimateTokens(request.input.text || '');
    const outputTokens = this.estimateOutputTokens(request.task.type, inputTokens);
    
    const inputCost = (inputTokens * (model.pricing.inputTokenPrice || 0.00001));
    const outputCost = (outputTokens * (model.pricing.outputTokenPrice || 0.00002));
    
    return inputCost + outputCost;
  }

  /**
   * Calculate actual cost
   */
  private calculateCost(request: RoutingRequest, model: AIModel): number {
    return this.estimateCost(request, model);
  }

  /**
   * Estimate token count
   */
  private estimateTokens(text: string): number {
    return Math.ceil(text.length / 4); // Rough estimate: 1 token ≈ 4 characters
  }

  /**
   * Estimate output tokens
   */
  private estimateOutputTokens(taskType: string, inputTokens: number): number {
    const ratios = {
      'text_generation': 2.0,
      'code_generation': 3.0,
      'summarization': 0.3,
      'translation': 1.2,
      'classification': 0.1,
      'extraction': 0.5
    };
    
    return inputTokens * (ratios[taskType] || 1.0);
  }

  /**
   * Get alternative models
   */
  private getAlternatives(scoredModels: Map<string, { score: number; confidence: number; reasons: string[] }>, selectedModel: AIModel): { model: AIModel; score: number; reason: string }[] {
    const alternatives: { model: AIModel; score: number; reason: string }[] = [];
    
    for (const [modelId, scoring] of scoredModels) {
      if (modelId !== selectedModel.id) {
        const model = this.models.get(modelId);
        if (model) {
          alternatives.push({
            model,
            score: scoring.score,
            reason: scoring.reasons.join(', ')
          });
        }
      }
    }
    
    return alternatives.sort((a, b) => b.score - a.score).slice(0, 3);
  }

  /**
   * Get fallback options
   */
  private getFallbackOptions(scoredModels: Map<string, { score: number; confidence: number; reasons: string[] }>, selectedModel: AIModel): AIModel[] {
    return this.getAlternatives(scoredModels, selectedModel)
      .filter(alt => alt.confidence > 0.5)
      .map(alt => alt.model)
      .slice(0, 2);
  }

  /**
   * Initialize models from configuration
   */
  private async initializeModels(): Promise<void> {
    // This would load models from database or configuration
    // For now, initialize with some default models
    const defaultModels: AIModel[] = [
      {
        id: 'gpt-4-turbo',
        name: 'GPT-4 Turbo',
        provider: 'openai',
        modelType: 'language',
        capabilities: [
          { name: 'text_generation', type: 'text_generation', proficiency: 0.95, supportedLanguages: ['en'] },
          { name: 'code_generation', type: 'code_generation', proficiency: 0.90, supportedLanguages: ['en'] },
          { name: 'reasoning', type: 'reasoning', proficiency: 0.92, supportedLanguages: ['en'] }
        ],
        performance: {
          averageResponseTime: 2000,
          successRate: 0.98,
          accuracy: 0.94,
          reliability: 0.97,
          throughput: 100,
          latency: { p50: 1500, p95: 3000, p99: 5000 },
          quality: { coherence: 0.92, relevance: 0.94, helpfulness: 0.91, safety: 0.96 },
          avgResponseTime: 2000,
          totalRequests: 0
        },
        pricing: {
          inputTokenPrice: 0.00001,
          outputTokenPrice: 0.00003,
          currency: 'USD',
          billingUnit: 'tokens'
        },
        limits: {
          maxTokensPerRequest: 4096,
          maxRequestsPerMinute: 500,
          maxConcurrency: 100,
          contextWindow: 128000
        },
        status: 'active',
        endpoints: [
          { url: 'https://api.openai.com/v1/chat/completions', region: 'us-east-1', priority: 1, weight: 1.0, healthStatus: 'healthy' }
        ],
        configuration: {
          temperature: 0.7,
          topP: 1.0,
          maxTokens: 4096,
          presencePenalty: 0.0,
          frequencyPenalty: 0.0,
          stopSequences: []
        },
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        version: '1.0',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        maxTokens: 4096,
        costPerToken: 0.00002,
        latency: 2000,
        reliability: 0.97,
        accuracy: 0.94,
        contextWindow: 128000,
        supportedLanguages: ['en'],
        healthScore: 95,
        lastHealthCheck: Date.now()
      }
    ];
    
    for (const model of defaultModels) {
      this.models.set(model.id, model);
      this.circuitBreakers.set(model.id, new CircuitBreaker(model.id));
    }
  }

  /**
   * Start health checks
   */
  private startHealthChecks(): void {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthChecks();
    }, 60000); // Check every minute
  }

  /**
   * Perform health checks on all models
   */
  private async performHealthChecks(): Promise<void> {
    for (const model of this.models.values()) {
      try {
        const isHealthy = await this.checkModelHealth(model);
        const healthScore = this.calculateHealthScore(model, isHealthy);
        
        model.healthScore = healthScore;
        model.lastHealthCheck = Date.now();
        model.status = isHealthy ? 'active' : 'degraded';
        
        // Update endpoint health
        for (const endpoint of model.endpoints) {
          endpoint.healthStatus = isHealthy ? 'healthy' : 'degraded';
        }
        
        // Update circuit breaker
        const circuitBreaker = this.circuitBreakers.get(model.id);
        if (circuitBreaker) {
          if (isHealthy) {
            circuitBreaker.recordSuccess();
          } else {
            circuitBreaker.recordFailure();
          }
        }
        
      } catch (error) {
        logger.error(`Health check failed for model ${model.id}:`, error);
        model.status = 'unavailable';
        model.healthScore = 0;
      }
    }
  }

  /**
   * Check individual model health
   */
  private async checkModelHealth(model: AIModel): Promise<boolean> {
    // Implement actual health check logic
    // For now, simulate health check
    return Math.random() > 0.05; // 95% uptime simulation
  }

  /**
   * Calculate health score
   */
  private calculateHealthScore(model: AIModel, isHealthy: boolean): number {
    if (!isHealthy) return Math.max(0, model.healthScore - 20);
    
    const circuitBreaker = this.circuitBreakers.get(model.id);
    const failureRate = circuitBreaker ? circuitBreaker.getFailureRate() : 0;
    
    return Math.max(0, Math.min(100, 100 - (failureRate * 100)));
  }

  /**
   * Log routing decision
   */
  private async logRoutingDecision(request: RoutingRequest, decision: RoutingDecision): Promise<void> {
    await logAudit({
      action: 'MODEL_ROUTING_DECISION',
      userId: request.userId,
      organizationId: request.organizationId,
      resourceId: request.id,
      details: {
        selectedModel: decision.selectedModel.id,
        confidence: decision.confidence,
        estimatedCost: decision.estimatedCost,
        routingStrategy: request.routingStrategy,
        taskType: request.task.type
      }
    });
  }

  /**
   * Get model by ID
   */
  getModel(modelId: string): AIModel | undefined {
    return this.models.get(modelId);
  }

  /**
   * Get all models
   */
  getAllModels(): AIModel[] {
    return Array.from(this.models.values());
  }

  /**
   * Add model
   */
  addModel(model: AIModel): void {
    this.models.set(model.id, model);
    this.circuitBreakers.set(model.id, new CircuitBreaker(model.id));
    this.emit('modelAdded', model);
  }

  /**
   * Remove model
   */
  removeModel(modelId: string): void {
    this.models.delete(modelId);
    this.circuitBreakers.delete(modelId);
    this.emit('modelRemoved', modelId);
  }

  /**
   * Update model
   */
  updateModel(modelId: string, updates: Partial<AIModel>): void {
    const model = this.models.get(modelId);
    if (model) {
      Object.assign(model, updates);
      model.updatedAt = new Date();
      this.emit('modelUpdated', model);
    }
  }

  /**
   * Get routing metrics
   */
  getMetrics(): RoutingMetrics {
    return this.metricsCollector.getMetrics();
  }

  /**
   * Shutdown router
   */
  shutdown(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
    this.removeAllListeners();
  }
}

// Supporting classes

class MetricsCollector {
  private metrics: RoutingMetrics = {
    totalRequests: 0,
    successfulRoutings: 0,
    failedRoutings: 0,
    averageRoutingTime: 0,
    modelUsageStats: new Map(),
    errorCounts: new Map()
  };

  recordRouting(decision: RoutingDecision, routingTime: number): void {
    this.metrics.totalRequests++;
    this.metrics.successfulRoutings++;
    
    // Update average routing time
    this.metrics.averageRoutingTime = 
      (this.metrics.averageRoutingTime * (this.metrics.successfulRoutings - 1) + routingTime) / 
      this.metrics.successfulRoutings;
    
    // Update model usage stats
    const currentUsage = this.metrics.modelUsageStats.get(decision.selectedModel.id) || 0;
    this.metrics.modelUsageStats.set(decision.selectedModel.id, currentUsage + 1);
  }

  recordError(request: RoutingRequest, error: Error): void {
    this.metrics.failedRoutings++;
    const errorType = error.constructor.name;
    const currentCount = this.metrics.errorCounts.get(errorType) || 0;
    this.metrics.errorCounts.set(errorType, currentCount + 1);
  }

  getMetrics(): RoutingMetrics {
    return { ...this.metrics };
  }
}

class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'closed' | 'open' | 'half_open' = 'closed';
  private readonly failureThreshold: number = 5;
  private readonly recoveryTimeout: number = 60000; // 1 minute

  constructor(private modelId: string) {}

  recordSuccess(): void {
    this.failures = 0;
    this.state = 'closed';
  }

  recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      this.state = 'open';
    }
  }

  allowRequest(): boolean {
    if (this.state === 'closed') return true;
    
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeout) {
        this.state = 'half_open';
        return true;
      }
      return false;
    }
    
    // half_open state - allow some requests through
    return Math.random() > 0.5;
  }

  getFailureRate(): number {
    return this.failures / this.failureThreshold;
  }
}

interface RoutingMetrics {
  totalRequests: number;
  successfulRoutings: number;
  failedRoutings: number;
  averageRoutingTime: number;
  modelUsageStats: Map<string, number>;
  errorCounts: Map<string, number>;
}

export const unifiedMultiModelRouter = new UnifiedMultiModelRouter();
export default unifiedMultiModelRouter;
