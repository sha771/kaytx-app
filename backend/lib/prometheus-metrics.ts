/**
 * Prometheus Metrics Collection
 * Custom application metrics for monitoring
 * 
 * NOTE: This file is server-side only. It uses Node.js APIs.
 * DO NOT import this file in browser/client code.
 */

import { register, Counter, Histogram, Gauge, Summary, collectDefaultMetrics } from 'prom-client';

// Configuration
const config = {
  prefix: process.env.PROMETHEUS_METRICS_PREFIX || 'kaytx_',
  collectDefault: process.env.PROMETHEUS_COLLECT_DEFAULT !== 'false',
  collectInterval: parseInt(process.env.PROMETHEUS_COLLECT_INTERVAL || '10000'),
};

// Initialize default metrics collection
if (config.collectDefault) {
  collectDefaultMetrics({
    prefix: config.prefix,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
  });
}

// HTTP Request Metrics
export const httpRequestDuration = new Histogram({
  name: `${config.prefix}http_request_duration_seconds`,
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code', 'user_agent_type'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
});

export const httpRequestTotal = new Counter({
  name: `${config.prefix}http_requests_total`,
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'user_agent_type'],
});

export const httpRequestActive = new Gauge({
  name: `${config.prefix}http_requests_active`,
  help: 'Number of active HTTP requests',
  labelNames: ['method', 'route'],
});

export const httpRequestSize = new Histogram({
  name: `${config.prefix}http_request_size_bytes`,
  help: 'Size of HTTP requests in bytes',
  labelNames: ['method', 'route'],
  buckets: [100, 1000, 10000, 100000, 1000000, 10000000],
});

export const httpResponseSize = new Histogram({
  name: `${config.prefix}http_response_size_bytes`,
  help: 'Size of HTTP responses in bytes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [100, 1000, 10000, 100000, 1000000, 10000000],
});

// Database Metrics
export const dbQueryDuration = new Histogram({
  name: `${config.prefix}db_query_duration_seconds`,
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'table', 'status'],
  buckets: [0.001, 0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
});

export const dbQueryTotal = new Counter({
  name: `${config.prefix}db_queries_total`,
  help: 'Total number of database queries',
  labelNames: ['operation', 'table', 'status'],
});

export const dbConnectionsActive = new Gauge({
  name: `${config.prefix}db_connections_active`,
  help: 'Number of active database connections',
});

export const dbConnectionsIdle = new Gauge({
  name: `${config.prefix}db_connections_idle`,
  help: 'Number of idle database connections',
});

// AI Service Metrics
export const aiRequestDuration = new Histogram({
  name: `${config.prefix}ai_request_duration_seconds`,
  help: 'Duration of AI service requests in seconds',
  labelNames: ['provider', 'model', 'operation', 'status'],
  buckets: [0.1, 0.5, 1, 2.5, 5, 10, 30, 60, 120, 300],
});

export const aiRequestTotal = new Counter({
  name: `${config.prefix}ai_requests_total`,
  help: 'Total number of AI service requests',
  labelNames: ['provider', 'model', 'operation', 'status'],
});

export const aiTokensUsed = new Counter({
  name: `${config.prefix}ai_tokens_used_total`,
  help: 'Total number of AI tokens used',
  labelNames: ['provider', 'model', 'type'], // type: prompt, completion
});

export const aiCost = new Counter({
  name: `${config.prefix}ai_cost_usd_total`,
  help: 'Total cost of AI requests in USD',
  labelNames: ['provider', 'model'],
});

// Message Queue Metrics
export const mqMessagesPublished = new Counter({
  name: `${config.prefix}mq_messages_published_total`,
  help: 'Total number of messages published to queue',
  labelNames: ['queue', 'exchange'],
});

export const mqMessagesConsumed = new Counter({
  name: `${config.prefix}mq_messages_consumed_total`,
  help: 'Total number of messages consumed from queue',
  labelNames: ['queue', 'status'],
});

export const mqMessagesFailed = new Counter({
  name: `${config.prefix}mq_messages_failed_total`,
  help: 'Total number of failed message processing',
  labelNames: ['queue', 'error_type'],
});

export const mqQueueSize = new Gauge({
  name: `${config.prefix}mq_queue_size`,
  help: 'Current size of message queues',
  labelNames: ['queue'],
});

// Business Metrics
export const userRegistrations = new Counter({
  name: `${config.prefix}user_registrations_total`,
  help: 'Total number of user registrations',
  labelNames: ['source', 'status'],
});

export const userLogins = new Counter({
  name: `${config.prefix}user_logins_total`,
  help: 'Total number of user logins',
  labelNames: ['method', 'status'],
});

export const activeUsers = new Gauge({
  name: `${config.prefix}active_users`,
  help: 'Number of active users',
  labelNames: ['type'], // type: daily, weekly, monthly
});

export const aiAgentInteractions = new Counter({
  name: `${config.prefix}ai_agent_interactions_total`,
  help: 'Total number of AI agent interactions',
  labelNames: ['agent_type', 'interaction_type', 'status'],
});

export const phoneCalls = new Counter({
  name: `${config.prefix}phone_calls_total`,
  help: 'Total number of phone calls',
  labelNames: ['direction', 'status'],
});

export const phoneCallDuration = new Histogram({
  name: `${config.prefix}phone_call_duration_seconds`,
  help: 'Duration of phone calls in seconds',
  labelNames: ['direction', 'status'],
  buckets: [10, 30, 60, 120, 300, 600, 1800, 3600],
});

// Error Metrics
export const errorsTotal = new Counter({
  name: `${config.prefix}errors_total`,
  help: 'Total number of errors',
  labelNames: ['type', 'severity', 'component'],
});

export const panicsTotal = new Counter({
  name: `${config.prefix}panics_total`,
  help: 'Total number of application panics',
  labelNames: ['component'],
});

// Cache Metrics
export const cacheHits = new Counter({
  name: `${config.prefix}cache_hits_total`,
  help: 'Total number of cache hits',
  labelNames: ['cache_type'],
});

export const cacheMisses = new Counter({
  name: `${config.prefix}cache_misses_total`,
  help: 'Total number of cache misses',
  labelNames: ['cache_type'],
});

export const cacheSize = new Gauge({
  name: `${config.prefix}cache_size_bytes`,
  help: 'Current cache size in bytes',
  labelNames: ['cache_type'],
});

// Custom Metrics Registry
class MetricsCollector {
  private customMetrics: Map<string, Counter | Histogram | Gauge | Summary> = new Map();

  registerCounter(name: string, help: string, labelNames?: string[]): Counter {
    const counter = new Counter({
      name: `${config.prefix}${name}`,
      help,
      labelNames,
    });
    this.customMetrics.set(name, counter);
    register.registerMetric(counter);
    return counter;
  }

  registerHistogram(name: string, help: string, options?: {
    labelNames?: string[];
    buckets?: number[];
  }): Histogram {
    const histogram = new Histogram({
      name: `${config.prefix}${name}`,
      help,
      labelNames: options?.labelNames,
      buckets: options?.buckets,
    });
    this.customMetrics.set(name, histogram);
    register.registerMetric(histogram);
    return histogram;
  }

  registerGauge(name: string, help: string, labelNames?: string[]): Gauge {
    const gauge = new Gauge({
      name: `${config.prefix}${name}`,
      help,
      labelNames,
    });
    this.customMetrics.set(name, gauge);
    register.registerMetric(gauge);
    return gauge;
  }

  getMetric(name: string): Counter | Histogram | Gauge | Summary | undefined {
    return this.customMetrics.get(name);
  }

  async getMetrics(): Promise<string> {
    return register.metrics();
  }

  resetMetrics(): void {
    register.clear();
    if (config.collectDefault) {
      collectDefaultMetrics({
        prefix: config.prefix,
        gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
      });
    }
  }
}

export const metricsCollector = new MetricsCollector();

// Helper functions for common operations
export function recordHttpRequest(
  method: string,
  route: string,
  statusCode: number,
  duration: number,
  userAgentType: string = 'unknown',
  requestSize?: number,
  responseSize?: number
) {
  const labels = { method, route, status_code: statusCode.toString(), user_agent_type: userAgentType };
  
  httpRequestDuration.observe(labels, duration / 1000);
  httpRequestTotal.inc(labels);
  
  if (requestSize !== undefined) {
    httpRequestSize.observe({ method, route }, requestSize);
  }
  
  if (responseSize !== undefined) {
    httpResponseSize.observe({ method, route, status_code: statusCode.toString() }, responseSize);
  }
}

export function recordDatabaseQuery(
  operation: string,
  table: string,
  duration: number,
  status: 'success' | 'error'
) {
  const labels = { operation, table, status };
  
  dbQueryDuration.observe(labels, duration / 1000);
  dbQueryTotal.inc(labels);
}

export function recordAIRequest(
  provider: string,
  model: string,
  operation: string,
  duration: number,
  status: 'success' | 'error',
  tokensUsed?: { prompt?: number; completion?: number },
  cost?: number
) {
  const labels = { provider, model, operation, status };
  
  aiRequestDuration.observe(labels, duration / 1000);
  aiRequestTotal.inc(labels);

  if (tokensUsed) {
    if (tokensUsed.prompt) {
      aiTokensUsed.inc({ provider, model, type: 'prompt' }, tokensUsed.prompt);
    }
    if (tokensUsed.completion) {
      aiTokensUsed.inc({ provider, model, type: 'completion' }, tokensUsed.completion);
    }
  }

  if (cost !== undefined) {
    aiCost.inc({ provider, model }, cost);
  }
}

export function recordPhoneCall(
  direction: 'inbound' | 'outbound',
  status: string,
  duration?: number
) {
  const labels = { direction, status };
  
  phoneCalls.inc(labels);
  
  if (duration !== undefined) {
    phoneCallDuration.observe(labels, duration);
  }
}

// Middleware for Hono
export function createMetricsMiddleware() {
  return async (c: any, next: any) => {
    const start = Date.now();
    const method = c.req.method;
    const route = c.req.path;
    
    const userAgent = c.req.header('user-agent') || '';
    let userAgentType = 'unknown';
    if (userAgent.includes('Mozilla')) userAgentType = 'browser';
    else if (userAgent.includes('curl') || userAgent.includes('wget')) userAgentType = 'cli';
    else if (userAgent.includes('axios') || userAgent.includes('fetch')) userAgentType = 'api';

    httpRequestActive.inc({ method, route });

    try {
      await next();
      
      const duration = Date.now() - start;
      const statusCode = c.res.status;
      const requestSize = parseInt(c.req.header('content-length') || '0');
      const responseSize = parseInt(c.res.header('content-length') || '0');

      recordHttpRequest(method, route, statusCode, duration, userAgentType, requestSize, responseSize);
    } catch (error) {
      const duration = Date.now() - start;
      recordHttpRequest(method, route, 500, duration, userAgentType);
      throw error;
    } finally {
      httpRequestActive.dec({ method, route });
    }
  };
}

export default {
  httpRequestDuration,
  httpRequestTotal,
  httpRequestActive,
  httpRequestSize,
  httpResponseSize,
  dbQueryDuration,
  dbQueryTotal,
  dbConnectionsActive,
  dbConnectionsIdle,
  aiRequestDuration,
  aiRequestTotal,
  aiTokensUsed,
  aiCost,
  mqMessagesPublished,
  mqMessagesConsumed,
  mqMessagesFailed,
  mqQueueSize,
  userRegistrations,
  userLogins,
  activeUsers,
  aiAgentInteractions,
  phoneCalls,
  phoneCallDuration,
  errorsTotal,
  panicsTotal,
  cacheHits,
  cacheMisses,
  cacheSize,
  metricsCollector,
  recordHttpRequest,
  recordDatabaseQuery,
  recordAIRequest,
  recordPhoneCall,
  createMetricsMiddleware,
  register,
};
