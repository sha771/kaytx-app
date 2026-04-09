export enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half-open'
}

export interface CircuitBreakerOptions {
  // Number of failures before opening the circuit
  failureThreshold?: number;
  // Time in milliseconds to wait before transitioning from OPEN to HALF_OPEN
  recoveryTimeout?: number;
  // Number of successful attempts required to close the circuit from HALF_OPEN
  successThreshold?: number;
  // Timeout for individual operations in milliseconds
  operationTimeout?: number;
  // Whether to track failures by specific error types
  trackErrorsByType?: boolean;
  // Custom error types to consider as failures
  failureErrorTypes?: string[];
  // Custom function to determine if an error should be counted as a failure
  isFailure?: (error: any) => boolean;
}

export interface CircuitBreakerMetrics {
  state: CircuitState;
  failureCount: number;
  successCount: number;
  lastFailureTime: number | null;
  lastSuccessTime: number | null;
  nextAttemptTime: number | null;
  operationCounts: Record<string, number>;
  errorCounts: Record<string, number>;
  // Additional metrics for test compatibility
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  successRate: number;
}

export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private lastFailureTime: number | null = null;
  private lastSuccessTime: number | null = null;
  private nextAttemptTime: number | null = null;
  private operationCounts: Record<string, number> = {};
  private errorCounts: Record<string, number> = {};
  private totalOperations: number = 0;
  private successfulOperations: number = 0;
  private failedOperations: number = 0;
  private options: Required<CircuitBreakerOptions>;

  constructor(private name: string, options: CircuitBreakerOptions = {}) {
    // Validate options
    if (options.failureThreshold !== undefined && options.failureThreshold <= 0) {
      throw new Error('failureThreshold must be greater than 0');
    }
    if (options.recoveryTimeout !== undefined && options.recoveryTimeout < 0) {
      throw new Error('recoveryTimeout must be non-negative');
    }

    this.options = {
      failureThreshold: options.failureThreshold ?? 5,
      recoveryTimeout: options.recoveryTimeout ?? 60000, // 1 minute
      successThreshold: options.successThreshold ?? 3,
      operationTimeout: options.operationTimeout ?? 30000, // 30 seconds
      trackErrorsByType: options.trackErrorsByType ?? true,
      failureErrorTypes: options.failureErrorTypes ?? [],
      isFailure: options.isFailure ?? this.defaultIsFailure
    };

    // Auto-register in global registry (only if not already present)
    const registry = CircuitBreakerRegistry.getInstance();
    if (!registry.get(name)) {
      registry.registerExisting(name, this);
    }
  }

  async execute<T>(operation: () => Promise<T>, operationName: string = 'unknown'): Promise<T> {
    this.recordOperation(operationName);

    // Check if circuit is open
    if (this.state === CircuitState.OPEN) {
      if (Date.now() < (this.nextAttemptTime ?? 0)) {
        throw new CircuitBreakerOpenError(
          `Circuit breaker '${this.name}' is OPEN. Next attempt at ${new Date(this.nextAttemptTime!).toISOString()}`
        );
      }
      // Transition to HALF_OPEN automatically when recovery timeout is reached
      this.transitionToHalfOpen();
    }

    // If in HALF_OPEN, check if we should allow a test request
    if (this.state === CircuitState.HALF_OPEN && this.successCount > 0) {
      // Already have a test in progress, reject additional requests
      throw new CircuitBreakerOpenError(
        `Circuit breaker '${this.name}' is HALF_OPEN. Test request already in progress.`
      );
    }

    // Execute operation with timeout
    try {
      const result = await this.withTimeout(operation, this.options.operationTimeout);
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure(error);
      throw error;
    }
  }

  // Get current state and metrics
  getState(): CircuitState {
    // Auto-transition from OPEN to HALF_OPEN if recovery timeout has passed
    if (this.state === CircuitState.OPEN && this.nextAttemptTime && Date.now() >= this.nextAttemptTime) {
      this.transitionToHalfOpen();
    }
    return this.state;
  }

  getMetrics(): CircuitBreakerMetrics {
    const totalOps = this.totalOperations;
    const successRate = totalOps > 0 ? Math.round((this.successfulOperations / totalOps) * 100 * 100) / 100 : 100;
    
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      lastFailureTime: this.lastFailureTime,
      lastSuccessTime: this.lastSuccessTime,
      nextAttemptTime: this.nextAttemptTime,
      operationCounts: { ...this.operationCounts },
      errorCounts: { ...this.errorCounts },
      totalOperations: this.totalOperations,
      successfulOperations: this.successfulOperations,
      failedOperations: this.failedOperations,
      successRate: successRate
    };
  }

  // Reset circuit breaker to CLOSED state
  reset(): void {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.lastFailureTime = null;
    this.lastSuccessTime = null;
    this.nextAttemptTime = null;
    this.operationCounts = {};
    this.errorCounts = {};
    this.totalOperations = 0;
    this.successfulOperations = 0;
    this.failedOperations = 0;
  }

  // Force circuit to OPEN state
  trip(): void {
    this.state = CircuitState.OPEN;
    this.nextAttemptTime = Date.now() + this.options.recoveryTimeout;
  }

  private recordOperation(operationName: string): void {
    this.operationCounts[operationName] = (this.operationCounts[operationName] || 0) + 1;
    this.totalOperations++;
  }

  private recordError(error: any): void {
    if (!this.options.trackErrorsByType) return;

    const errorType = error.constructor.name;
    this.errorCounts[errorType] = (this.errorCounts[errorType] || 0) + 1;
  }

  private onSuccess(): void {
    this.successCount++;
    this.successfulOperations++;
    this.lastSuccessTime = Date.now();

    if (this.state === CircuitState.HALF_OPEN) {
      // In half-open, we only need 1 success to close (test was successful)
      this.transitionToClosed();
    }
  }

  private onFailure(error: any): void {
    this.failureCount++;
    this.failedOperations++;
    this.lastFailureTime = Date.now();
    this.recordError(error);

    if (this.state === CircuitState.CLOSED) {
      if (this.failureCount >= this.options.failureThreshold) {
        this.transitionToOpen();
      }
    } else if (this.state === CircuitState.HALF_OPEN) {
      this.transitionToOpen();
    }
  }

  private transitionToClosed(): void {
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttemptTime = null;
  }

  private transitionToOpen(): void {
    this.state = CircuitState.OPEN;
    this.nextAttemptTime = Date.now() + this.options.recoveryTimeout;
  }

  private transitionToHalfOpen(): void {
    this.state = CircuitState.HALF_OPEN;
    this.successCount = 0;
  }

  private async withTimeout<T>(operation: () => Promise<T>, timeoutMs: number): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new CircuitBreakerTimeoutError(`Operation timed out after ${timeoutMs}ms`));
      }, timeoutMs);

      operation()
        .then((result) => {
          clearTimeout(timeout);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeout);
          reject(error);
        });
    });
  }

  private defaultIsFailure(error: any): boolean {
    // Check if error type is in the failure list
    if (this.options.failureErrorTypes.length > 0) {
      return this.options.failureErrorTypes.includes(error.constructor.name);
    }

    // Default failure conditions
    return (
      error instanceof Error ||
      error?.name === 'TypeError' ||
      error?.name === 'ReferenceError' ||
      error?.name === 'NetworkError' ||
      error?.code === 'ECONNREFUSED' ||
      error?.code === 'ETIMEDOUT' ||
      error?.code === 'ENOTFOUND' ||
      error?.status >= 500 ||
      (error?.response?.status >= 500)
    );
  }
}

// Custom error types
export class CircuitBreakerOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CircuitBreakerOpenError';
  }
}

export class CircuitBreakerTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CircuitBreakerTimeoutError';
  }
}

// Circuit breaker registry for managing multiple circuit breakers
export class CircuitBreakerRegistry {
  private static instance: CircuitBreakerRegistry;
  private circuitBreakers: Map<string, CircuitBreaker> = new Map();

  static getInstance(): CircuitBreakerRegistry {
    if (!CircuitBreakerRegistry.instance) {
      CircuitBreakerRegistry.instance = new CircuitBreakerRegistry();
    }
    return CircuitBreakerRegistry.instance;
  }

  register(name: string, options?: CircuitBreakerOptions): CircuitBreaker {
    if (this.circuitBreakers.has(name)) {
      throw new Error(`Circuit breaker '${name}' is already registered`);
    }

    const circuitBreaker = new CircuitBreaker(name, options);
    this.circuitBreakers.set(name, circuitBreaker);
    return circuitBreaker;
  }

  registerExisting(name: string, circuitBreaker: CircuitBreaker): CircuitBreaker {
    if (this.circuitBreakers.has(name)) {
      throw new Error(`Circuit breaker '${name}' is already registered`);
    }

    this.circuitBreakers.set(name, circuitBreaker);
    return circuitBreaker;
  }

  get(name: string): CircuitBreaker | undefined {
    return this.circuitBreakers.get(name);
  }

  getAll(): Map<string, CircuitBreaker> {
    return new Map(this.circuitBreakers);
  }

  getAllMetrics(): Record<string, CircuitBreakerMetrics> {
    const metrics: Record<string, CircuitBreakerMetrics> = {};
    for (const [name, circuitBreaker] of this.circuitBreakers) {
      metrics[name] = circuitBreaker.getMetrics();
    }
    return metrics;
  }

  reset(name: string): boolean {
    const circuitBreaker = this.circuitBreakers.get(name);
    if (circuitBreaker) {
      circuitBreaker.reset();
      return true;
    }
    return false;
  }

  resetAll(): void {
    for (const circuitBreaker of this.circuitBreakers.values()) {
      circuitBreaker.reset();
    }
  }
}

// Decorator for automatic circuit breaker usage
export function withCircuitBreaker(
  circuitBreakerName: string,
  options?: CircuitBreakerOptions
) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const registry = CircuitBreakerRegistry.getInstance();
      let circuitBreaker = registry.get(circuitBreakerName);

      if (!circuitBreaker) {
        circuitBreaker = registry.register(circuitBreakerName, options);
      }

      return circuitBreaker.execute(() => method.apply(this, args), propertyName);
    };

    return descriptor;
  };
}

// Export singleton registry instance
export const circuitBreakerRegistry = CircuitBreakerRegistry.getInstance();

// Add static decorate method to CircuitBreaker class for test compatibility
(CircuitBreaker as any).decorate = function(name: string, options?: CircuitBreakerOptions) {
  return withCircuitBreaker(name, options);
};
