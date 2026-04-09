/**
 * OpenTelemetry Configuration
 * Distributed tracing with Jaeger backend
 */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc';
import { SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import * as opentelemetry from '@opentelemetry/api';
import { logger } from './production-logger';

const processEnv = typeof process !== 'undefined' ? process : { env: {}, pid: 0 } as any;
const os = typeof require !== 'undefined' ? require('os') : { hostname: () => 'unknown' };

// Configuration from environment
const config = {
  serviceName: processEnv.env?.OTEL_SERVICE_NAME || 'kaytx-backend',
  environment: processEnv.env?.NODE_ENV || 'development',
  jaegerEndpoint: processEnv.env?.JAEGER_ENDPOINT || 'http://localhost:14268/api/opentelemetry.traces',
  otlpEndpoint: processEnv.env?.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4317',
  enableTracing: processEnv.env?.OTEL_ENABLE_TRACING !== 'false',
  samplingProbability: parseFloat(processEnv.env?.OTEL_SAMPLING_PROBABILITY || '1.0'),
};

/**
 * Initialize OpenTelemetry SDK
 */
export function initializeOpenTelemetry(): NodeSDK {
  if (!config.enableTracing) {
    logger.info('[OpenTelemetry] Tracing disabled');
    return new NodeSDK();
  }

  // Create resource with service information
  const resource = resourceFromAttributes({
    'service.name': config.serviceName,
    'service.version': processEnv.env?.DEPLOYMENT_VERSION || '1.0.0',
    'deployment.environment': config.environment,
    'host.name': os.hostname(),
  });

  // Jaeger exporter (primary)
  const jaegerExporter = new JaegerExporter({
    endpoint: config.jaegerEndpoint,
  });

  // OTLP exporter (for collectors like Tempo, etc.)
  const otlpExporter = new OTLPTraceExporter({
    url: config.otlpEndpoint,
  });

  // Initialize SDK
  const sdk = new NodeSDK({
    resource,
    instrumentations: [getNodeAutoInstrumentations()],
    traceExporter: jaegerExporter,
    spanProcessors: [
      new BatchSpanProcessor(jaegerExporter, {
        maxExportBatchSize: 512,
        scheduledDelayMillis: 5000,
        exportTimeoutMillis: 30000,
      }),
      new SimpleSpanProcessor(otlpExporter as any),
    ],
  });

  // Initialize the SDK
  sdk.start();

  logger.info('[OpenTelemetry] Initialized with config', {
    serviceName: config.serviceName,
    environment: config.environment,
    jaegerEndpoint: config.jaegerEndpoint,
    samplingProbability: config.samplingProbability,
  });

  return sdk;
}

/**
 * Create a custom span with attributes
 */
export function createSpan(name: string, kind: typeof opentelemetry.SpanKind.INTERNAL = opentelemetry.SpanKind.INTERNAL) {
  const tracer = opentelemetry.trace.getTracer(config.serviceName);
  return tracer.startSpan(name, { kind });
}

/**
 * Wrap a function with tracing
 */
export function withTracing<T extends (...args: any[]) => Promise<any> | any>(
  name: string,
  fn: T,
  options?: {
    kind?: typeof opentelemetry.SpanKind.INTERNAL;
    attributes?: Record<string, string | number | boolean>;
    onError?: (error: Error, span: typeof opentelemetry.Span) => void;
  }
): T {
  return (async (...args: Parameters<T>) => {
    const span = createSpan(name, options?.kind);

    // Add attributes
    if (options?.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });
    }

    try {
      const result = await fn(...args);
      span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({
        code: opentelemetry.SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : String(error)
      });

      if (options?.onError) {
        options.onError(error as Error, span);
      }

      throw error;
    } finally {
      span.end();
    }
  }) as T;
}

/**
 * Add custom attributes to current span
 */
export function addSpanAttributes(attributes: Record<string, string | number | boolean>) {
  const span = opentelemetry.trace.getActiveSpan();
  if (span) {
    Object.entries(attributes).forEach(([key, value]) => {
      span.setAttribute(key, value);
    });
  }
}

/**
 * Add event to current span
 */
export function addSpanEvent(name: string, attributes?: Record<string, string | number | boolean>) {
  const span = opentelemetry.trace.getActiveSpan();
  if (span) {
    span.addEvent(name, attributes);
  }
}

/**
 * Set span status
 */
export function setSpanStatus(code: typeof opentelemetry.SpanStatusCode.OK, message?: string) {
  const span = opentelemetry.trace.getActiveSpan();
  if (span) {
    span.setStatus({ code, message });
  }
}

/**
 * Get current opentelemetry.trace context
 */
export function getTraceContext() {
  const span = opentelemetry.trace.getActiveSpan();
  if (!span) {
    return null;
  }

  const spanContext = span.spanContext();
  return {
    traceId: spanContext.traceId,
    spanId: spanContext.spanId,
    traceFlags: spanContext.traceFlags,
  };
}

/**
 * Middleware for Hono to add tracing
 */
export function createTracingMiddleware() {
  return async (c: any, next: any) => {
    const tracer = opentelemetry.trace.getTracer(config.serviceName);
    const span = tracer.startSpan(`${c.req.method} ${c.req.path}`, {
      kind: opentelemetry.SpanKind.SERVER,
      attributes: {
        'http.method': c.req.method,
        'http.target': c.req.path,
        'http.url': c.req.url,
        'http.host': c.req.header('host'),
        'user_agent.original': c.req.header('user-agent'),
        'http.scheme': c.req.url.startsWith('https') ? 'https' : 'http',
      },
    });

    try {
      await next();

      // Add response attributes
      span.setAttribute('http.status_code', c.res.status);

      if (c.res.status >= 400) {
        span.setStatus({
          code: opentelemetry.SpanStatusCode.ERROR,
          message: `HTTP ${c.res.status}`
        });
      } else {
        span.setStatus({ code: opentelemetry.SpanStatusCode.OK });
      }
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({
        code: opentelemetry.SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : String(error)
      });
      throw error;
    } finally {
      span.end();
    }
  };
}

/**
 * Database operation tracing helper
 */
export function traceDatabaseOperation<T>(
  operation: string,
  table: string,
  fn: () => Promise<T>
): Promise<T> {
  return withTracing(`db.${operation}`, fn, {
    kind: opentelemetry.SpanKind.CLIENT,
    attributes: {
      'db.operation': operation,
      'db.table': table,
      'db.system': 'postgresql',
    },
  })();
}

/**
 * External API call tracing helper
 */
export function traceExternalCall<T>(
  service: string,
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  return withTracing(`external.${service}.${operation}`, fn, {
    kind: opentelemetry.SpanKind.CLIENT,
    attributes: {
      'external.service': service,
      'external.operation': operation,
    },
  })();
}

/**
 * AI service call tracing helper
 */
export function traceAICall<T>(
  provider: string,
  model: string,
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  return withTracing(`ai.${provider}.${operation}`, fn, {
    kind: opentelemetry.SpanKind.CLIENT,
    attributes: {
      'ai.provider': provider,
      'ai.model': model,
      'ai.operation': operation,
    },
    onError: (error, span) => {
      span.setAttribute('ai.error.type', error.constructor.name);
      span.setAttribute('ai.error.message', error.message);
    },
  })();
}

export default {
  initializeOpenTelemetry,
  createSpan,
  withTracing,
  addSpanAttributes,
  addSpanEvent,
  setSpanStatus,
  getTraceContext,
  createTracingMiddleware,
  traceDatabaseOperation,
  traceExternalCall,
  traceAICall,
};
