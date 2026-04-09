import client, { register, Counter, Gauge, Histogram, Summary, collectDefaultMetrics } from 'prom-client';


// Initialize default metrics collection (CPU, Memory, Event Loop, etc.)
collectDefaultMetrics({
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
});

// Custom registry for application metrics
const appRegister = new client.Registry();
appRegister.setDefaultLabels({
  app: 'kaytx',
  version: process.env.APP_VERSION || '1.0.0',
  environment: process.env.NODE_ENV || 'production',
});

// Register default metrics with custom registry
collectDefaultMetrics({ register: appRegister });

export { register, appRegister, Counter, Gauge, Histogram, Summary, collectDefaultMetrics };

// HTTP Request Metrics
export const httpRequestDuration = new Histogram({
  name: 'kaytx_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code', 'user_agent_type'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5, 10],
  registers: [appRegister],
});

export const httpRequestTotal = new Counter({
  name: 'kaytx_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code', 'user_agent_type'],
  registers: [appRegister],
});

export const httpRequestSize = new Histogram({
  name: 'kaytx_http_request_size_bytes',
  help: 'Size of HTTP requests in bytes',
  labelNames: ['method', 'route'],
  buckets: [100, 1000, 10000, 100000, 1000000, 10000000],
  registers: [appRegister],
});

export const httpResponseSize = new Histogram({
  name: 'kaytx_http_response_size_bytes',
  help: 'Size of HTTP responses in bytes',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [100, 1000, 10000, 100000, 1000000, 10000000],
  registers: [appRegister],
});

// Database Connection Metrics
export const dbConnectionPoolSize = new Gauge({
  name: 'kaytx_db_connection_pool_size',
  help: 'Number of connections in the database pool',
  labelNames: ['database', 'state'],
  registers: [appRegister],
});

export const dbQueryDuration = new Histogram({
  name: 'kaytx_db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['database', 'table', 'operation'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1, 2, 5],
  registers: [appRegister],
});

export const dbQueryTotal = new Counter({
  name: 'kaytx_db_queries_total',
  help: 'Total number of database queries',
  labelNames: ['database', 'table', 'operation', 'status'],
  registers: [appRegister],
});

// Authentication & Session Metrics
export const authAttemptsTotal = new Counter({
  name: 'kaytx_auth_attempts_total',
  help: 'Total number of authentication attempts',
  labelNames: ['method', 'status'],
  registers: [appRegister],
});

export const activeSessions = new Gauge({
  name: 'kaytx_active_sessions_total',
  help: 'Total number of active user sessions',
  labelNames: ['user_type'],
  registers: [appRegister],
});

export const sessionDuration = new Histogram({
  name: 'kaytx_session_duration_seconds',
  help: 'Duration of user sessions in seconds',
  labelNames: ['user_type'],
  buckets: [60, 300, 900, 1800, 3600, 7200, 14400, 28800, 86400],
  registers: [appRegister],
});

// AI Service Metrics
export const aiRequestsTotal = new Counter({
  name: 'kaytx_ai_requests_total',
  help: 'Total number of AI requests processed',
  labelNames: ['agent_type', 'provider', 'model', 'status'],
  registers: [appRegister],
});

export const aiTokensUsed = new Counter({
  name: 'kaytx_ai_tokens_used_total',
  help: 'Total number of AI tokens consumed',
  labelNames: ['agent_type', 'provider', 'model', 'token_type'],
  registers: [appRegister],
});

export const aiResponseDuration = new Histogram({
  name: 'kaytx_ai_response_duration_seconds',
  help: 'Duration of AI responses in seconds',
  labelNames: ['agent_type', 'provider', 'model'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30, 60, 120, 300],
  registers: [appRegister],
});

export const aiCost = new Histogram({
  name: 'kaytx_ai_cost_dollars',
  help: 'Cost of AI requests in dollars',
  labelNames: ['agent_type', 'provider', 'model'],
  buckets: [0.001, 0.01, 0.1, 1, 5, 10, 25, 50, 100],
  registers: [appRegister],
});

export const aiRequestCost = new Summary({
  name: 'kaytx_ai_request_cost_dollars',
  help: 'Cost of AI requests in dollars',
  labelNames: ['agent_type', 'provider', 'model'],
  percentiles: [0.5, 0.9, 0.95, 0.99],
  registers: [appRegister],
});

// Alert Metrics
export const alertTotal = new Counter({
  name: 'kaytx_alerts_total',
  help: 'Total number of alerts triggered',
  labelNames: ['severity', 'rule', 'condition_type'],
  registers: [appRegister],
});

export const alertActive = new Gauge({
  name: 'kaytx_alerts_active',
  help: 'Number of currently active alerts',
  labelNames: ['severity', 'rule'],
  registers: [appRegister],
});

export const alertResolutionDuration = new Histogram({
  name: 'kaytx_alert_resolution_duration_seconds',
  help: 'Time taken to resolve alerts in seconds',
  labelNames: ['severity', 'rule'],
  buckets: [60, 300, 900, 1800, 3600, 7200, 14400],
  registers: [appRegister],
});

export const alertRuleEvaluations = new Counter({
  name: 'kaytx_alert_rule_evaluations_total',
  help: 'Total number of alert rule evaluations',
  labelNames: ['rule', 'result'],
  registers: [appRegister],
});

// Business Metrics
export const emailCampaignsTotal = new Counter({
  name: 'kaytx_email_campaigns_total',
  help: 'Total number of email campaigns sent',
  labelNames: ['status', 'provider', 'campaign_type'],
  registers: [appRegister],
});

export const emailDeliveryDuration = new Histogram({
  name: 'kaytx_email_delivery_duration_seconds',
  help: 'Duration of email delivery in seconds',
  labelNames: ['provider'],
  buckets: [0.5, 1, 2, 5, 10, 30, 60],
  registers: [appRegister],
});

export const paymentTransactionsTotal = new Counter({
  name: 'kaytx_payment_transactions_total',
  help: 'Total number of payment transactions',
  labelNames: ['status', 'provider', 'payment_method'],
  registers: [appRegister],
});

export const paymentAmount = new Histogram({
  name: 'kaytx_payment_amount_dollars',
  help: 'Payment amounts in dollars',
  labelNames: ['currency', 'payment_method'],
  buckets: [1, 5, 10, 25, 50, 100, 250, 500, 1000, 5000, 10000],
  registers: [appRegister],
});

export const gdprRequestsTotal = new Counter({
  name: 'kaytx_gdpr_requests_total',
  help: 'Total number of GDPR requests',
  labelNames: ['request_type', 'status'],
  registers: [appRegister],
});

export const leadConversionsTotal = new Counter({
  name: 'kaytx_lead_conversions_total',
  help: 'Total number of lead conversions',
  labelNames: ['source', 'campaign', 'conversion_type'],
  registers: [appRegister],
});

// Agent Execution Metrics
export const agentExecutionsTotal = new Counter({
  name: 'kaytx_agent_executions_total',
  help: 'Total number of agent executions',
  labelNames: ['agent_type', 'status', 'complexity'],
  registers: [appRegister],
});

export const agentExecutionDuration = new Histogram({
  name: 'kaytx_agent_execution_duration_seconds',
  help: 'Duration of agent executions in seconds',
  labelNames: ['agent_type', 'complexity'],
  buckets: [1, 5, 10, 30, 60, 300, 600, 1800, 3600],
  registers: [appRegister],
});

// Cache Metrics
export const cacheOperationsTotal = new Counter({
  name: 'kaytx_cache_operations_total',
  help: 'Total number of cache operations',
  labelNames: ['cache_type', 'operation', 'result'],
  registers: [appRegister],
});

export const cacheHitRatio = new Gauge({
  name: 'kaytx_cache_hit_ratio',
  help: 'Cache hit ratio',
  labelNames: ['cache_type'],
  registers: [appRegister],
});

// Queue Metrics
export const queueSize = new Gauge({
  name: 'kaytx_queue_size',
  help: 'Current queue size',
  labelNames: ['queue_name', 'priority'],
  registers: [appRegister],
});

export const queueProcessingDuration = new Histogram({
  name: 'kaytx_queue_processing_duration_seconds',
  help: 'Duration of queue processing in seconds',
  labelNames: ['queue_name', 'operation'],
  buckets: [0.1, 0.5, 1, 5, 10, 30, 60, 300],
  registers: [appRegister],
});

// Error Metrics
export const errorTotal = new Counter({
  name: 'kaytx_errors_total',
  help: 'Total number of errors',
  labelNames: ['error_type', 'severity', 'component'],
  registers: [appRegister],
});

export const panicTotal = new Counter({
  name: 'kaytx_panics_total',
  help: 'Total number of application panics',
  labelNames: ['component'],
  registers: [appRegister],
});

// Alert thresholds and SLA definitions
export const alertThresholds = {
  // Performance thresholds
  httpResponseTime: 5.0, // seconds (95th percentile)
  aiResponseTime: 30.0, // seconds (95th percentile)
  dbQueryTime: 1.0, // seconds (95th percentile)
  emailDeliveryTime: 10.0, // seconds (95th percentile)
  
  // Error rate thresholds
  httpErrorRate: 0.01, // 1%
  aiErrorRate: 0.05, // 5%
  dbErrorRate: 0.005, // 0.5%
  paymentFailureRate: 0.02, // 2%
  
  // Resource thresholds
  memoryUsage: 0.85, // 85%
  cpuUsage: 0.80, // 80%
  diskUsage: 0.90, // 90%
  dbConnectionPoolUsage: 0.80, // 80%
  
  // Business thresholds
  aiCostPerHour: 100.0, // dollars
  paymentAmountPerMinute: 10000.0, // dollars
  queueSize: 1000, // items
  cacheHitRatio: 0.80, // 80%
};

// SLA targets
export const slaTargets = {
  availability: 0.999, // 99.9%
  httpResponseTimeP95: 2.0, // seconds
  aiResponseTimeP95: 15.0, // seconds
  dbResponseTimeP95: 0.5, // seconds
  errorRate: 0.005, // 0.5%
};

// Metric collection utilities
export class MetricsCollector {
  /**
   * Record HTTP request metrics
   */
  static recordHttpRequest(
    method: string,
    route: string,
    statusCode: number,
    duration: number,
    requestSize?: number,
    responseSize?: number,
    userAgent?: string
  ) {
    const userAgentType = this.getUserAgentType(userAgent);
    const labels = { method, route, status_code: statusCode.toString(), user_agent_type: userAgentType };
    
    httpRequestDuration.observe(labels, duration / 1000);
    httpRequestTotal.inc(labels);
    
    if (requestSize) {
      httpRequestSize.observe({ method, route }, requestSize);
    }
    
    if (responseSize) {
      httpResponseSize.observe({ method, route, status_code: statusCode.toString() }, responseSize);
    }
  }

  /**
   * Record database query metrics
   */
  static recordDbQuery(
    database: string,
    table: string,
    operation: string,
    duration: number,
    success: boolean
  ) {
    const labels = { database, table, operation };
    const status = success ? 'success' : 'error';
    
    dbQueryDuration.observe(labels, duration / 1000);
    dbQueryTotal.inc({ ...labels, status });
  }

  /**
   * Record AI request metrics
   */
  static recordAiRequest(
    agentType: string,
    provider: string,
    model: string,
    duration: number,
    tokensUsed: { input: number; output: number },
    cost: number,
    success: boolean
  ) {
    const status = success ? 'success' : 'error';
    const labels = { agent_type: agentType, provider, model };
    
    aiRequestsTotal.inc({ ...labels, status });
    aiResponseDuration.observe(labels, duration / 1000);
    aiCost.observe(labels, cost);
    
    aiTokensUsed.inc({ ...labels, model, token_type: 'input' }, tokensUsed.input);
    aiTokensUsed.inc({ ...labels, model, token_type: 'output' }, tokensUsed.output);
  }

  /**
   * Record authentication attempt
   */
  static recordAuthAttempt(method: string, success: boolean) {
    authAttemptsTotal.inc({ method, status: success ? 'success' : 'failure' });
  }

  /**
   * Record error
   */
  static recordError(errorType: string, severity: string, component: string) {
    errorTotal.inc({ error_type: errorType, severity, component });
  }

  /**
   * Update cache metrics
   */
  static updateCacheMetrics(cacheType: string, hits: number, misses: number) {
    const total = hits + misses;
    if (total > 0) {
      cacheHitRatio.set({ cache_type: cacheType }, hits / total);
    }
  }

  /**
   * Update queue size
   */
  static updateQueueSize(queueName: string, priority: string, size: number) {
    queueSize.set({ queue_name: queueName, priority }, size);
  }

  /**
   * Record alert metrics
   */
  static recordAlert(
    severity: string,
    rule: string,
    conditionType: string
  ) {
    const labels = { severity, rule, condition_type: conditionType };
    alertTotal.inc(labels);
    alertActive.inc({ severity, rule });
  }

  /**
   * Record alert resolution metrics
   */
  static recordAlertResolution(
    severity: string,
    rule: string,
    duration: number
  ) {
    const labels = { severity, rule };
    alertResolutionDuration.observe(labels, duration / 1000);
    alertActive.dec({ severity, rule });
  }

  /**
   * Record alert rule evaluation metrics
   */
  static recordAlertRuleEvaluation(
    rule: string,
    result: 'triggered' | 'normal' | 'error'
  ) {
    alertRuleEvaluations.inc({ rule, result });
  }

  private static getUserAgentType(userAgent?: string): string {
    if (!userAgent) return 'unknown';
    
    if (userAgent.includes('Mozilla')) return 'browser';
    if (userAgent.includes('curl') || userAgent.includes('wget')) return 'cli';
    if (userAgent.includes('bot') || userAgent.includes('crawler')) return 'bot';
    if (userAgent.includes('axios') || userAgent.includes('fetch')) return 'api_client';
    
    return 'other';
  }
}

export default client;

/**
 * Setup comprehensive monitoring endpoints
 */
export function setupMonitoring(app: any) {
  // Main metrics endpoint
  app.get('/metrics', async (c: any) => {
    try {
      const metrics = await appRegister.metrics();
      return c.text(metrics, 200, {
        'Content-Type': appRegister.contentType,
      });
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });

  // Health metrics endpoint (subset for health checks)
  app.get('/health/metrics', async (c: any) => {
    try {
      const healthMetrics = await appRegister.getMetricsAsJSON();
      const filtered = {
        timestamp: Date.now(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        metrics: healthMetrics.filter((m: any) => 
          m.name.includes('kaytx_http_') ||
          m.name.includes('kaytx_db_') ||
          m.name.includes('kaytx_errors_') ||
          m.name.includes('nodejs_')
        ),
      };
      return c.json(filtered);
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });

  // Metrics metadata endpoint
  app.get('/metrics/metadata', async (c: any) => {
    try {
      const metadata = await appRegister.getMetricsAsJSON();
      return c.json({
        timestamp: Date.now(),
        metrics: metadata.map((m: any) => ({
          name: m.name,
          help: m.help,
          type: m.type,
          labels: m.labelNames,
        })),
      });
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });

  // SLA status endpoint
  app.get('/metrics/sla', async (c: any) => {
    try {
      const metrics = await appRegister.getMetricsAsJSON();
      const slaStatus = calculateSLAStatus(metrics);
      return c.json(slaStatus);
    } catch (e: any) {
      return c.json({ error: e.message }, 500);
    }
  });
}

/**
 * Calculate SLA status from metrics
 */
function calculateSLAStatus(metrics: any[]) {
  const status: any = {
    timestamp: Date.now(),
    overall: 'healthy',
    targets: slaTargets,
    current: {},
    violations: [],
  };

  // Calculate current metrics and check for violations
  metrics.forEach(metric => {
    if (metric.name === 'kaytx_http_request_duration_seconds' && metric.values) {
      const p95 = calculatePercentile(metric.values, 0.95);
      status.current.httpResponseTimeP95 = p95;
      if (p95 > slaTargets.httpResponseTimeP95) {
        status.violations.push({
          metric: 'httpResponseTimeP95',
          target: slaTargets.httpResponseTimeP95,
          current: p95,
        });
      }
    }
    
    if (metric.name === 'kaytx_http_requests_total' && metric.values) {
      const errorRate = calculateErrorRate(metric.values);
      status.current.errorRate = errorRate;
      if (errorRate > slaTargets.errorRate) {
        status.violations.push({
          metric: 'errorRate',
          target: slaTargets.errorRate,
          current: errorRate,
        });
      }
    }
  });

  status.overall = status.violations.length > 0 ? 'degraded' : 'healthy';
  return status;
}

/**
 * Calculate percentile from histogram values
 */
function calculatePercentile(values: any[], percentile: number): number {
  // Simplified percentile calculation
  // In production, use proper histogram percentile calculation
  return values.length > 0 ? values[0].value || 0 : 0;
}

/**
 * Calculate error rate from request totals
 */
function calculateErrorRate(values: any[]): number {
  const total = values.reduce((sum, v) => sum + (v.value || 0), 0);
  const errors = values
    .filter(v => v.labels?.status_code && v.labels.status_code.startsWith('4') || v.labels.status_code.startsWith('5'))
    .reduce((sum, v) => sum + (v.value || 0), 0);
  
  return total > 0 ? errors / total : 0;
}
