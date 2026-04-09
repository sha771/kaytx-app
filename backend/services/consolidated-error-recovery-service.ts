import { EventEmitter } from 'events';
import crypto from 'crypto';
import { logAudit } from '../lib/audit';
import { db } from '../db/connection';
import { errorRecoveries } from '../db/drizzle-schema';
import { eq, and, gte, lte, desc, asc, count } from 'drizzle-orm';

import { createLogger } from '../lib/production-logger';

const logger = createLogger(__filename.split('/').pop()?.replace('.ts', '') || 'Service');

/**
 * Consolidated Error Recovery Service
 * Combines functionality from:
 * - error-recovery-manager.ts
 * - error-recovery-service.ts
 * - unified-error-recovery-service.ts
 */

// Legacy ErrorRecord interface for database persistence (from error-recovery-service.ts)
export interface PersistedErrorRecord {
  id: string;
  organizationId: string;
  userId?: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  status: 'pending' | 'resolved' | 'failed' | 'ignored';
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  nextRetryAt?: Date;
  resolvedAt?: Date;
  resolution?: string;
  context?: Record<string, any>;
}

export interface ErrorData {
  organizationId: string;
  userId?: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  error: Error;
  context?: Record<string, any>;
}

export interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  backoffMultiplier?: number;
}

export interface ErrorContext {
  error: Error;
  service: string;
  operation: string;
  userId?: string;
  organizationId?: string;
  requestId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface RecoveryStrategy {
  id: string;
  name: string;
  description: string;
  errorTypes: string[];
  maxRetries: number;
  retryDelay: number;
  backoffMultiplier: number;
  maxDelay: number;
  circuitBreakerThreshold: number;
  recoveryTimeout: number;
  fallbackAction?: string;
  conditions?: Record<string, any>;
}

export interface RecoveryAttempt {
  id: string;
  errorId: string;
  strategyId: string;
  attemptNumber: number;
  status: 'pending' | 'running' | 'success' | 'failed' | 'timeout';
  startTime: Date;
  endTime?: Date;
  result?: any;
  error?: string;
  duration?: number;
}

export interface ErrorRecord {
  id: string;
  context: ErrorContext;
  strategyId?: string;
  attempts: RecoveryAttempt[];
  status: 'pending' | 'recovering' | 'recovered' | 'failed' | 'escalated';
  resolvedAt?: Date;
  escalatedAt?: Date;
  resolvedBy?: string;
  resolution?: string;
}

export interface CircuitBreakerState {
  service: string;
  state: 'closed' | 'open' | 'half-open';
  failures: number;
  lastFailureTime: Date;
  nextRetryTime?: Date;
  threshold: number;
  timeout: number;
}

export class ConsolidatedErrorRecoveryService extends EventEmitter {
  private strategies: Map<string, RecoveryStrategy> = new Map();
  private errorRecords: Map<string, ErrorRecord> = new Map();
  private circuitBreakers: Map<string, CircuitBreakerState> = new Map();
  private activeAttempts: Map<string, RecoveryAttempt> = new Map();
  private cleanupInterval: NodeJS.Timeout | undefined;

  constructor() {
    super();
    this.initializeDefaultStrategies();
    this.startCleanupInterval();
  }

  /**
   * Handle an error and attempt recovery
   */
  async handleError(context: ErrorContext): Promise<ErrorRecord> {
    const errorId = crypto.randomUUID();
    const errorRecord: ErrorRecord = {
      id: errorId,
      context,
      attempts: [],
      status: 'pending',
    };

    this.errorRecords.set(errorId, errorRecord);

    // Log the error
    await this.logError(context);

    // Find appropriate recovery strategy
    const strategy = this.findRecoveryStrategy(context);
    
    if (!strategy) {
      errorRecord.status = 'failed';
      this.emit('error:unrecoverable', { errorId, context });
      return errorRecord;
    }

    errorRecord.strategyId = strategy.id;
    errorRecord.status = 'recovering';

    // Check circuit breaker
    if (this.isCircuitBreakerOpen(context.service, strategy)) {
      errorRecord.status = 'escalated';
      errorRecord.escalatedAt = new Date();
      this.emit('error:escalated', { errorId, context, reason: 'circuit_breaker_open' });
      return errorRecord;
    }

    // Start recovery attempts
    await this.startRecovery(errorId, strategy);

    return errorRecord;
  }

  /**
   * Add custom recovery strategy
   */
  addStrategy(strategy: RecoveryStrategy): void {
    this.strategies.set(strategy.id, strategy);
    this.emit('strategy:added', { strategyId: strategy.id });
  }

  /**
   * Get error recovery status
   */
  getErrorStatus(errorId: string): ErrorRecord | null {
    return this.errorRecords.get(errorId) || null;
  }

  /**
   * Get circuit breaker status
   */
  getCircuitBreakerStatus(service: string): CircuitBreakerState | null {
    return this.circuitBreakers.get(service) || null;
  }

  /**
   * Reset circuit breaker
   */
  resetCircuitBreaker(service: string): boolean {
    const breaker = this.circuitBreakers.get(service);
    if (!breaker) return false;

    breaker.state = 'closed';
    breaker.failures = 0;
    breaker.lastFailureTime = new Date(0);
    breaker.nextRetryTime = undefined;

    this.emit('circuit_breaker:reset', { service });
    return true;
  }

  /**
   * Get recovery statistics
   */
  getStatistics(): {
    totalErrors: number;
    recoveredErrors: number;
    failedErrors: number;
    escalatedErrors: number;
    activeCircuitBreakers: number;
    strategiesCount: number;
    averageRecoveryTime: number;
  } {
    const totalErrors = this.errorRecords.size;
    const recoveredErrors = Array.from(this.errorRecords.values())
      .filter(record => record.status === 'recovered').length;
    const failedErrors = Array.from(this.errorRecords.values())
      .filter(record => record.status === 'failed').length;
    const escalatedErrors = Array.from(this.errorRecords.values())
      .filter(record => record.status === 'escalated').length;
    const activeCircuitBreakers = Array.from(this.circuitBreakers.values())
      .filter(breaker => breaker.state === 'open').length;
    const strategiesCount = this.strategies.size;

    // Calculate average recovery time
    const recoveredRecords = Array.from(this.errorRecords.values())
      .filter(record => record.status === 'recovered' && record.resolvedAt);
    
    const averageRecoveryTime = recoveredRecords.length > 0
      ? recoveredRecords.reduce((sum, record) => {
          const firstAttempt = record.attempts[0];
          const duration = record.resolvedAt!.getTime() - firstAttempt.startTime.getTime();
          return sum + duration;
        }, 0) / recoveredRecords.length
      : 0;

    return {
      totalErrors,
      recoveredErrors,
      failedErrors,
      escalatedErrors,
      activeCircuitBreakers,
      strategiesCount,
      averageRecoveryTime,
    };
  }

  /**
   * Initialize default recovery strategies
   */
  private initializeDefaultStrategies(): void {
    // Network errors strategy
    this.addStrategy({
      id: 'network-recovery',
      name: 'Network Error Recovery',
      description: 'Handles network-related errors with exponential backoff',
      errorTypes: ['ECONNREFUSED', 'ETIMEDOUT', 'ENOTFOUND', 'NetworkError'],
      maxRetries: 5,
      retryDelay: 1000,
      backoffMultiplier: 2,
      maxDelay: 30000,
      circuitBreakerThreshold: 10,
      recoveryTimeout: 60000,
    });

    // Database errors strategy
    this.addStrategy({
      id: 'database-recovery',
      name: 'Database Error Recovery',
      description: 'Handles database connection and query errors',
      errorTypes: ['ConnectionError', 'QueryError', 'TimeoutError'],
      maxRetries: 3,
      retryDelay: 2000,
      backoffMultiplier: 1.5,
      maxDelay: 10000,
      circuitBreakerThreshold: 5,
      recoveryTimeout: 30000,
    });

    // API errors strategy
    this.addStrategy({
      id: 'api-recovery',
      name: 'API Error Recovery',
      description: 'Handles external API call failures',
      errorTypes: ['AxiosError', 'HTTPError', 'RateLimitError'],
      maxRetries: 4,
      retryDelay: 1500,
      backoffMultiplier: 2,
      maxDelay: 15000,
      circuitBreakerThreshold: 8,
      recoveryTimeout: 45000,
    });

    // File system errors strategy
    this.addStrategy({
      id: 'filesystem-recovery',
      name: 'File System Error Recovery',
      description: 'Handles file system related errors',
      errorTypes: ['ENOENT', 'EACCES', 'ENOSPC', 'FileSystemError'],
      maxRetries: 2,
      retryDelay: 500,
      backoffMultiplier: 1,
      maxDelay: 2000,
      circuitBreakerThreshold: 3,
      recoveryTimeout: 10000,
    });

    // Validation errors strategy (no retry)
    this.addStrategy({
      id: 'validation-recovery',
      name: 'Validation Error Recovery',
      description: 'Handles validation errors with immediate failure',
      errorTypes: ['ValidationError', 'SchemaError', 'TypeError'],
      maxRetries: 0,
      retryDelay: 0,
      backoffMultiplier: 1,
      maxDelay: 0,
      circuitBreakerThreshold: 1,
      recoveryTimeout: 0,
      fallbackAction: 'log_and_fail',
    });
  }

  /**
   * Find appropriate recovery strategy for error
   */
  private findRecoveryStrategy(context: ErrorContext): RecoveryStrategy | null {
    const errorType = context.error.constructor.name;
    const errorMessage = context.error.message.toLowerCase();

    // Try exact match on error type
    for (const strategy of this.strategies.values()) {
      if (strategy.errorTypes.includes(errorType)) {
        // Check additional conditions if any
        if (this.matchesConditions(context, strategy.conditions)) {
          return strategy;
        }
      }
    }

    // Try pattern match on error message
    for (const strategy of this.strategies.values()) {
      if (this.matchesErrorMessage(errorMessage, strategy.errorTypes)) {
        if (this.matchesConditions(context, strategy.conditions)) {
          return strategy;
        }
      }
    }

    return null;
  }

  /**
   * Check if error message matches any pattern
   */
  private matchesErrorMessage(message: string, patterns: string[]): boolean {
    return patterns.some(pattern => 
      message.includes(pattern.toLowerCase()) || 
      pattern.toLowerCase().includes(message)
    );
  }

  /**
   * Check if context matches strategy conditions
   */
  private matchesConditions(context: ErrorContext, conditions?: Record<string, any>): boolean {
    if (!conditions) return true;

    // Check service condition
    if (conditions.service && context.service !== conditions.service) {
      return false;
    }

    // Check operation condition
    if (conditions.operation && context.operation !== conditions.operation) {
      return false;
    }

    // Check custom conditions
    if (conditions.custom && context.metadata) {
      for (const [key, value] of Object.entries(conditions.custom)) {
        if (context.metadata[key] !== value) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Check if circuit breaker is open
   */
  private isCircuitBreakerOpen(service: string, strategy: RecoveryStrategy): boolean {
    let breaker = this.circuitBreakers.get(service);
    
    if (!breaker) {
      // Create new circuit breaker
      breaker = {
        service,
        state: 'closed',
        failures: 0,
        lastFailureTime: new Date(0),
        threshold: strategy.circuitBreakerThreshold,
        timeout: strategy.recoveryTimeout,
      };
      this.circuitBreakers.set(service, breaker);
      return false;
    }

    // Check if circuit breaker should be reset
    if (breaker.state === 'open' && breaker.nextRetryTime && breaker.nextRetryTime <= new Date()) {
      breaker.state = 'half-open';
      this.emit('circuit_breaker:half_open', { service });
      return false;
    }

    return breaker.state === 'open';
  }

  /**
   * Start recovery process
   */
  private async startRecovery(errorId: string, strategy: RecoveryStrategy): Promise<void> {
    const errorRecord = this.errorRecords.get(errorId);
    if (!errorRecord) return;

    for (let attempt = 1; attempt <= strategy.maxRetries; attempt++) {
      const attemptId = crypto.randomUUID();
      const recoveryAttempt: RecoveryAttempt = {
        id: attemptId,
        errorId,
        strategyId: strategy.id,
        attemptNumber: attempt,
        status: 'pending',
        startTime: new Date(),
      };

      errorRecord.attempts.push(recoveryAttempt);
      this.activeAttempts.set(attemptId, recoveryAttempt);

      // Calculate delay
      const delay = Math.min(
        strategy.retryDelay * Math.pow(strategy.backoffMultiplier, attempt - 1),
        strategy.maxDelay
      );

      // Wait before retry
      if (attempt > 1) {
        await this.sleep(delay);
      }

      // Execute recovery attempt
      const success = await this.executeRecoveryAttempt(recoveryAttempt, errorRecord, strategy);

      if (success) {
        errorRecord.status = 'recovered';
        errorRecord.resolvedAt = new Date();
        this.recordCircuitBreakerSuccess(errorRecord.context.service, strategy);
        this.emit('error:recovered', { errorId, attemptId });
        return;
      } else {
        // Record failure
        this.recordCircuitBreakerFailure(errorRecord.context.service, strategy);
        
        // Check if we should escalate
        if (attempt === strategy.maxRetries) {
          errorRecord.status = 'failed';
          this.emit('error:failed', { errorId, lastAttempt: attemptId });
          return;
        }
      }
    }
  }

  /**
   * Execute a single recovery attempt
   */
  private async executeRecoveryAttempt(
    attempt: RecoveryAttempt,
    errorRecord: ErrorRecord,
    strategy: RecoveryStrategy
  ): Promise<boolean> {
    attempt.status = 'running';
    this.emit('recovery:started', { attemptId: attempt.id, errorId: errorRecord.id });

    try {
      // Set timeout for recovery
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Recovery timeout')), strategy.recoveryTimeout);
      });

      // Execute recovery logic
      const recoveryPromise = this.performRecovery(errorRecord.context, strategy);

      const result = await Promise.race([recoveryPromise, timeoutPromise]) as any;

      attempt.status = 'success';
      attempt.endTime = new Date();
      attempt.duration = attempt.endTime.getTime() - attempt.startTime.getTime();
      attempt.result = result;

      this.emit('recovery:success', { attemptId: attempt.id, result });
      return true;

    } catch (error) {
      attempt.status = 'failed';
      attempt.endTime = new Date();
      attempt.duration = attempt.endTime.getTime() - attempt.startTime.getTime();
      attempt.error = error instanceof Error ? error.message : 'Unknown error';

      this.emit('recovery:failed', { attemptId: attempt.id, error: attempt.error });
      return false;
    } finally {
      this.activeAttempts.delete(attempt.id);
    }
  }

  /**
   * Perform actual recovery logic
   */
  private async performRecovery(context: ErrorContext, strategy: RecoveryStrategy): Promise<any> {
    // This would contain the actual recovery logic
    // For now, simulate recovery with some basic strategies

    switch (strategy.id) {
      case 'network-recovery':
        // Simulate network retry
        await this.sleep(Math.random() * 1000);
        if (Math.random() > 0.7) { // 70% success rate
          return { success: true, message: 'Network connection restored' };
        }
        throw new Error('Network still unavailable');

      case 'database-recovery':
        // Simulate database reconnection
        await this.sleep(Math.random() * 500);
        if (Math.random() > 0.8) { // 80% success rate
          return { success: true, message: 'Database connection restored' };
        }
        throw new Error('Database still unavailable');

      case 'api-recovery':
        // Simulate API retry with different endpoint
        await this.sleep(Math.random() * 800);
        if (Math.random() > 0.6) { // 60% success rate
          return { success: true, message: 'API call succeeded' };
        }
        throw new Error('API still failing');

      case 'filesystem-recovery':
        // Simulate file system retry
        await this.sleep(Math.random() * 200);
        if (Math.random() > 0.9) { // 90% success rate
          return { success: true, message: 'File operation succeeded' };
        }
        throw new Error('File system still unavailable');

      case 'validation-recovery':
        // Validation errors should not be retried
        throw new Error('Validation error cannot be recovered');

      default:
        throw new Error('Unknown recovery strategy');
    }
  }

  /**
   * Record circuit breaker success
   */
  private recordCircuitBreakerSuccess(service: string, strategy: RecoveryStrategy): void {
    const breaker = this.circuitBreakers.get(service);
    if (!breaker) return;

    if (breaker.state === 'half-open') {
      // Reset circuit breaker on success in half-open state
      breaker.state = 'closed';
      breaker.failures = 0;
      this.emit('circuit_breaker:closed', { service });
    }
  }

  /**
   * Record circuit breaker failure
   */
  private recordCircuitBreakerFailure(service: string, strategy: RecoveryStrategy): void {
    let breaker = this.circuitBreakers.get(service);
    
    if (!breaker) {
      breaker = {
        service,
        state: 'closed',
        failures: 0,
        lastFailureTime: new Date(),
        threshold: strategy.circuitBreakerThreshold,
        timeout: strategy.recoveryTimeout,
      };
      this.circuitBreakers.set(service, breaker);
    }

    breaker.failures++;
    breaker.lastFailureTime = new Date();

    // Check if circuit breaker should open
    if (breaker.failures >= breaker.threshold && breaker.state !== 'open') {
      breaker.state = 'open';
      breaker.nextRetryTime = new Date(Date.now() + breaker.timeout);
      this.emit('circuit_breaker:open', { service, failures: breaker.failures });
    }
  }

  /**
   * Log error to audit system
   */
  private async logError(context: ErrorContext): Promise<void> {
    await logAudit({
      userId: context.userId,
      organizationId: context.organizationId,
      action: 'error_occurred',
      resource: context.service,
      resourceId: context.requestId,
      status: 'failure',
      severity: 'error',
      metadata: {
        operation: context.operation,
        errorType: context.error.constructor.name,
        errorMessage: context.error.message,
        stack: context.error.stack,
      }
    });
  }

  /**
   * Start cleanup interval
   */
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanupOldRecords();
    }, 60 * 60 * 1000); // Cleanup every hour
  }

  /**
   * Clean up old error records
   */
  private cleanupOldRecords(): void {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    let cleaned = 0;

    for (const [errorId, record] of this.errorRecords) {
      if (record.context.timestamp < cutoff && 
          (record.status === 'recovered' || record.status === 'failed')) {
        this.errorRecords.delete(errorId);
        cleaned++;
      }
    }

    // Clean up old circuit breakers
    const breakerCutoff = new Date(Date.now() - 2 * 60 * 60 * 1000); // 2 hours ago
    for (const [service, breaker] of this.circuitBreakers) {
      if (breaker.state === 'closed' && breaker.lastFailureTime < breakerCutoff) {
        this.circuitBreakers.delete(service);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      this.emit('cleanup:completed', { cleanedRecords: cleaned });
    }
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Database persistence methods (from error-recovery-service.ts)
   */

  /**
   * Record error to database
   */
  async recordError(errorData: ErrorData): Promise<PersistedErrorRecord> {
    const severity = this.determineSeverity(errorData.error, errorData.type);
    const maxAttempts = errorData.severity === 'critical' ? 5 : 3;
    const nextRetryAt = new Date(Date.now() + 5000);

    const [inserted] = await db.insert(errorRecoveries).values({
      organizationId: errorData.organizationId,
      userId: errorData.userId,
      type: errorData.type,
      severity: errorData.severity || severity,
      message: errorData.error.message || 'Unknown error',
      status: 'pending',
      attempts: 1,
      maxAttempts,
      nextRetryAt,
      context: errorData.context || {},
      errorStack: errorData.error.stack,
    }).returning();

    const errorRecord: PersistedErrorRecord = {
      id: inserted.id,
      organizationId: inserted.organizationId,
      userId: inserted.userId || undefined,
      type: inserted.type,
      severity: inserted.severity as 'low' | 'medium' | 'high' | 'critical',
      message: inserted.message,
      status: inserted.status as 'pending' | 'resolved' | 'failed' | 'ignored',
      attempts: inserted.attempts ?? 1,
      maxAttempts: inserted.maxAttempts ?? 3,
      createdAt: inserted.createdAt,
      nextRetryAt: inserted.nextRetryAt || undefined,
      context: inserted.context as Record<string, any>,
    };

    await logAudit({
      userId: errorData.userId,
      organizationId: errorData.organizationId,
      action: 'error_recorded',
      resource: 'error_recovery',
      resourceId: errorRecord.id,
      status: 'success',
      details: {
        errorType: errorData.type,
        severity: errorData.severity
      }
    });

    this.emit('error:recorded', errorRecord);
    return errorRecord;
  }

  /**
   * Get error from database
   */
  async getPersistedError(errorId: string, organizationId: string): Promise<PersistedErrorRecord | null> {
    const result = await db.select()
      .from(errorRecoveries)
      .where(and(
        eq(errorRecoveries.id, errorId),
        eq(errorRecoveries.organizationId, organizationId)
      ))
      .limit(1);

    const error = Array.isArray(result) ? result[0] : result;
    if (!error) return null;

    return {
      id: error.id,
      organizationId: error.organizationId,
      userId: error.userId || undefined,
      type: error.type,
      severity: error.severity as 'low' | 'medium' | 'high' | 'critical',
      message: error.message,
      status: error.status as 'pending' | 'resolved' | 'failed' | 'ignored',
      attempts: error.attempts ?? 1,
      maxAttempts: error.maxAttempts ?? 3,
      createdAt: error.createdAt,
      nextRetryAt: error.nextRetryAt || undefined,
      resolvedAt: error.resolvedAt || undefined,
      resolution: error.resolution || undefined,
      context: error.context as Record<string, any>,
    };
  }

  /**
   * Get errors from database with filters
   */
  async getPersistedErrors(
    organizationId: string,
    filters: {
      status?: string;
      type?: string;
      severity?: string;
      startDate?: Date;
      endDate?: Date;
      limit?: number;
      offset?: number;
    } = {}
  ): Promise<PersistedErrorRecord[]> {
    const conditions = [eq(errorRecoveries.organizationId, organizationId)];

    if (filters.status) {
      conditions.push(eq(errorRecoveries.status, filters.status));
    }
    if (filters.type) {
      conditions.push(eq(errorRecoveries.type, filters.type));
    }
    if (filters.severity) {
      conditions.push(eq(errorRecoveries.severity, filters.severity));
    }
    if (filters.startDate) {
      conditions.push(gte(errorRecoveries.createdAt, filters.startDate));
    }
    if (filters.endDate) {
      conditions.push(lte(errorRecoveries.createdAt, filters.endDate));
    }

    const errors = await db.select()
      .from(errorRecoveries)
      .where(and(...conditions))
      .orderBy(desc(errorRecoveries.createdAt))
      .limit(filters.limit || 50)
      .offset(filters.offset || 0);

    const errorArray = Array.isArray(errors) ? errors : [errors];
    return errorArray.map(error => ({
      id: error.id,
      organizationId: error.organizationId,
      userId: error.userId || undefined,
      type: error.type,
      severity: error.severity as 'low' | 'medium' | 'high' | 'critical',
      message: error.message,
      status: error.status as 'pending' | 'resolved' | 'failed' | 'ignored',
      attempts: error.attempts ?? 1,
      maxAttempts: error.maxAttempts ?? 3,
      createdAt: error.createdAt,
      nextRetryAt: error.nextRetryAt || undefined,
      resolvedAt: error.resolvedAt || undefined,
      resolution: error.resolution || undefined,
      context: error.context as Record<string, any>,
    }));
  }

  /**
   * Resolve error in database
   */
  async resolvePersistedError(
    errorId: string,
    organizationId: string,
    resolution: { resolution: string; resolvedBy: string }
  ): Promise<{ id: string; status: 'resolved'; resolution: string; resolvedBy: string; resolvedAt: Date } | null> {
    const error = await this.getPersistedError(errorId, organizationId);
    if (!error) return null;

    const resolvedAt = new Date();

    await db.update(errorRecoveries)
      .set({
        status: 'resolved',
        resolvedAt,
        resolution: resolution.resolution,
        resolvedBy: resolution.resolvedBy,
        updatedAt: resolvedAt,
      })
      .where(eq(errorRecoveries.id, errorId));

    this.emit('error:resolved', { errorId, organizationId, resolution });

    await logAudit({
      userId: resolution.resolvedBy,
      organizationId,
      action: 'error_manually_resolved',
      resource: 'error_recovery',
      resourceId: errorId,
      status: 'success'
    });

    return {
      id: errorId,
      status: 'resolved',
      resolution: resolution.resolution,
      resolvedBy: resolution.resolvedBy,
      resolvedAt
    };
  }

  /**
   * Get error statistics from database
   */
  async getPersistedErrorStats(organizationId: string): Promise<{
    total: number;
    pending: number;
    resolved: number;
    ignored: number;
    failed: number;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
    resolutionRate: number;
  }> {
    const totalResult = await db.select({ count: count() })
      .from(errorRecoveries)
      .where(eq(errorRecoveries.organizationId, organizationId));
    const total = Number(totalResult[0]?.count || 0);

    const pendingResult = await db.select({ count: count() })
      .from(errorRecoveries)
      .where(and(eq(errorRecoveries.organizationId, organizationId), eq(errorRecoveries.status, 'pending')));
    const pending = Number(pendingResult[0]?.count || 0);

    const resolvedResult = await db.select({ count: count() })
      .from(errorRecoveries)
      .where(and(eq(errorRecoveries.organizationId, organizationId), eq(errorRecoveries.status, 'resolved')));
    const resolved = Number(resolvedResult[0]?.count || 0);

    const ignoredResult = await db.select({ count: count() })
      .from(errorRecoveries)
      .where(and(eq(errorRecoveries.organizationId, organizationId), eq(errorRecoveries.status, 'ignored')));
    const ignored = Number(ignoredResult[0]?.count || 0);

    const failedResult = await db.select({ count: count() })
      .from(errorRecoveries)
      .where(and(eq(errorRecoveries.organizationId, organizationId), eq(errorRecoveries.status, 'failed')));
    const failed = Number(failedResult[0]?.count || 0);

    const severityCounts = await db.select({ severity: errorRecoveries.severity, count: count() })
      .from(errorRecoveries)
      .where(eq(errorRecoveries.organizationId, organizationId))
      .groupBy(errorRecoveries.severity);

    const bySeverity: Record<string, number> = {};
    for (const row of severityCounts) {
      bySeverity[row.severity] = Number(row.count);
    }

    const typeCounts = await db.select({ type: errorRecoveries.type, count: count() })
      .from(errorRecoveries)
      .where(eq(errorRecoveries.organizationId, organizationId))
      .groupBy(errorRecoveries.type);

    const byType: Record<string, number> = {};
    for (const row of typeCounts) {
      byType[row.type] = Number(row.count);
    }

    return {
      total,
      pending,
      resolved,
      ignored,
      failed,
      bySeverity,
      byType,
      resolutionRate: total > 0 ? resolved / total : 0,
    };
  }

  /**
   * Determine severity based on error type and message
   */
  private determineSeverity(error: Error, type: string): 'low' | 'medium' | 'high' | 'critical' {
    const message = (error.message || '').toLowerCase();

    if (type.includes('payment') || message.includes('payment') || message.includes('billing') || 
        message.includes('security') || message.includes('authentication')) {
      return 'critical';
    }

    if (type.includes('database') || message.includes('database') || message.includes('connection') || 
        message.includes('timeout')) {
      return 'high';
    }

    if (type.includes('network') || message.includes('network') || message.includes('validation')) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined as any;
    }

    this.strategies.clear();
    this.errorRecords.clear();
    this.circuitBreakers.clear();
    this.activeAttempts.clear();
    
    logger.info(`Cleaned up resources`);
  }
}

export const consolidatedErrorRecoveryService = new ConsolidatedErrorRecoveryService();

// Backward compatibility aliases (from error-recovery-service.ts)
export const errorRecoveryService = {
  recordError: (errorData: ErrorData) => consolidatedErrorRecoveryService.recordError(errorData),
  getError: (errorId: string, organizationId: string) => consolidatedErrorRecoveryService.getPersistedError(errorId, organizationId),
  getErrors: (organizationId: string, filters?: any) => consolidatedErrorRecoveryService.getPersistedErrors(organizationId, filters),
  resolveError: (errorId: string, organizationId: string, resolution: any) => 
    consolidatedErrorRecoveryService.resolvePersistedError(errorId, organizationId, resolution),
  getErrorStats: (organizationId: string) => consolidatedErrorRecoveryService.getPersistedErrorStats(organizationId),
  handleError: (context: ErrorContext) => consolidatedErrorRecoveryService.handleError(context),
  getErrorStatus: (errorId: string) => consolidatedErrorRecoveryService.getErrorStatus(errorId),
  getStatistics: () => consolidatedErrorRecoveryService.getStatistics(),
  destroy: () => consolidatedErrorRecoveryService.cleanup(),
};
