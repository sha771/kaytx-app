export enum MonitoringLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

export interface MonitoringEvent {
  id: string;
  timestamp: Date;
  level: MonitoringLevel;
  category: string;
  message: string;
  error?: Error;
  metadata?: Record<string, any>;
  stackTrace?: string;
  userId?: string;
  sessionId?: string;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

class MonitoringService {
  private static instance: MonitoringService;
  private events: MonitoringEvent[] = [];
  private metrics: PerformanceMetric[] = [];
  private readonly maxEvents = 1000;
  private readonly maxMetrics = 5000;

  private constructor() {
    this.setupGlobalErrorHandler();
  }

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  private setupGlobalErrorHandler(): void {
    const errorUtils = (globalThis as any).ErrorUtils;
    if (typeof errorUtils !== 'undefined') {
      const originalHandler = errorUtils.getGlobalHandler();
      
      errorUtils.setGlobalHandler((error: any, isFatal: any) => {
        this.captureError(error, {
          isFatal,
          category: 'global_error',
        });
        
        if (originalHandler) {
          originalHandler(error, isFatal);
        }
      });
    }
  }

  log(
    level: MonitoringLevel,
    category: string,
    message: string,
    metadata?: Record<string, any>
  ): void {
    const event: MonitoringEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level,
      category,
      message,
      ...(metadata ? { metadata } : {}),
    };

    this.events.push(event);

    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    this.logToConsole(event);
  }

  private logToConsole(event: MonitoringEvent): void {
    const prefix = `[${event.level.toUpperCase()}] [${event.category}]`;
    const message = `${prefix} ${event.message}`;

    switch (event.level) {
      case MonitoringLevel.DEBUG:
        console.debug(message, event.metadata);
        break;
      case MonitoringLevel.INFO:
        console.log(message, event.metadata);
        break;
      case MonitoringLevel.WARNING:
        console.warn(message, event.metadata);
        break;
      case MonitoringLevel.ERROR:
      case MonitoringLevel.CRITICAL:
        console.error(message, event.metadata, event.error);
        break;
    }
  }

  debug(category: string, message: string, metadata?: Record<string, any>): void {
    this.log(MonitoringLevel.DEBUG, category, message, metadata);
  }

  info(category: string, message: string, metadata?: Record<string, any>): void {
    this.log(MonitoringLevel.INFO, category, message, metadata);
  }

  warning(category: string, message: string, metadata?: Record<string, any>): void {
    this.log(MonitoringLevel.WARNING, category, message, metadata);
  }

  error(category: string, message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log(MonitoringLevel.ERROR, category, message, {
      ...metadata,
      error: error?.message,
      stack: error?.stack,
    });
  }

  critical(category: string, message: string, error?: Error, metadata?: Record<string, any>): void {
    this.log(MonitoringLevel.CRITICAL, category, message, {
      ...metadata,
      error: error?.message,
      stack: error?.stack,
    });
  }

  captureError(error: Error, metadata?: Record<string, any>): void {
    const event: MonitoringEvent = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      level: MonitoringLevel.ERROR,
      category: metadata?.category || 'uncaught_error',
      message: error.message,
      error,
      ...(error.stack ? { stackTrace: error.stack } : {}),
      ...(metadata ? { metadata } : {}),
    };

    this.events.push(event);
    this.logToConsole(event);
  }

  trackPerformance(
    name: string,
    value: number,
    unit: string = 'ms',
    metadata?: Record<string, any>
  ): void {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date(),
      ...(metadata ? { metadata } : {}),
    };

    this.metrics.push(metric);

    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    console.log(`[PERFORMANCE] ${name}: ${value}${unit}`, metadata);
  }

  startTimer(name: string): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.trackPerformance(name, duration, 'ms');
    };
  }

  getEvents(Filter?: {
    level?: MonitoringLevel;
    category?: string;
    startDate?: Date;
    endDate?: Date;
  }): MonitoringEvent[] {
    let filtered = this.events;

    if (Filter) {
      if (Filter.level) {
        filtered = filtered.filter(e => e.level === Filter.level);
      }
      if (Filter.category) {
        filtered = filtered.filter(e => e.category === Filter.category);
      }
      if (Filter.startDate) {
        filtered = filtered.filter(e => e.timestamp >= Filter.startDate!);
      }
      if (Filter.endDate) {
        filtered = filtered.filter(e => e.timestamp <= Filter.endDate!);
      }
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name === name);
    }
    return this.metrics;
  }

  getAverageMetric(name: string): number | null {
    const metrics = this.getMetrics(name);
    if (metrics.length === 0) return null;
    
    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  getHealthStatus(): {
    status: 'healthy' | 'degraded' | 'critical';
    errors: number;
    warnings: number;
    criticalErrors: number;
    averageResponseTime: number | null;
  } {
    const last30Min = new Date(Date.now() - 30 * 60 * 1000);
    const recentEvents = this.getEvents({ startDate: last30Min });

    const errors = recentEvents.filter(e => e.level === MonitoringLevel.ERROR).length;
    const warnings = recentEvents.filter(e => e.level === MonitoringLevel.WARNING).length;
    const criticalErrors = recentEvents.filter(e => e.level === MonitoringLevel.CRITICAL).length;

    const avgResponseTime = this.getAverageMetric('api_response_time');

    let status: 'healthy' | 'degraded' | 'critical' = 'healthy';
    
    if (criticalErrors > 0 || errors > 10) {
      status = 'critical';
    } else if (errors > 5 || warnings > 20) {
      status = 'degraded';
    }

    return {
      status,
      errors,
      warnings,
      criticalErrors,
      averageResponseTime: avgResponseTime,
    };
  }

  clear(): void {
    this.events = [];
    this.metrics = [];
  }
}

export const monitoring = MonitoringService.getInstance();

export function measurePerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const endTimer = monitoring.startTimer(name);
  
  try {
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(endTimer) as T;
    }
    
    endTimer();
    return result;
  } catch (error) {
    endTimer();
    monitoring.captureError(error as Error, { operation: name });
    throw error;
  }
}
