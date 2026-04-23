import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { SimpleSpanProcessor, BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { trace, SpanStatusCode, SpanKind } from '@opentelemetry/api';
import { Hono } from 'hono';

// Initialize OpenTelemetry SDK
const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.SERVICE_NAME || 'kaytx-api',
    [SemanticResourceAttributes.SERVICE_VERSION]: process.env.APP_VERSION || '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV || 'production',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.JAEGER_COLLECTOR_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  metricExporter: new PrometheusExporter({
    port: 9464,
    endpoint: '/metrics',
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  spanProcessor: new BatchSpanProcessor(new OTLPTraceExporter({
    url: process.env.JAEGER_COLLECTOR_ENDPOINT || 'http://localhost:4318/v1/traces',
  })),
});

// Start the SDK
sdk.start();

// Get the tracer
const tracer = trace.getTracer('kaytx-api-tracer');

export { tracer, trace, SpanStatusCode, SpanKind };

/**
 * OpenTelemetry Distributed Tracing
 * Production-grade distributed tracing with proper OTLP export
 */

export class DistributedTracer {
  /**
   * Create a span for manual instrumentation
   */
  static createSpan(name: string, options?: {
    kind?: SpanKind;
    attributes?: Record<string, any>;
    parentSpan?: any;
  }) {
    return tracer.startSpan(name, {
      kind: options?.kind || SpanKind.INTERNAL,
      attributes: options?.attributes,
    }, options?.parentSpan);
  }

  /**
   * Trace an async operation
   */
  static async traceAsync<T>(
    name: string,
    fn: (span: any) => Promise<T>,
    options?: {
      kind?: SpanKind;
      attributes?: Record<string, any>;
      parentSpan?: any;
    }
  ): Promise<T> {
    const span = this.createSpan(name, options);
    
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ 
        code: SpanStatusCode.ERROR, 
        message: error instanceof Error ? error.message : String(error) 
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Add custom attributes to current span
   */
  static setAttributes(attributes: Record<string, any>) {
    const span = trace.getActiveSpan();
    if (span) {
      Object.entries(attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });
    }
  }

  /**
   * Add event to current span
   */
  static addEvent(name: string, attributes?: Record<string, any>) {
    const span = trace.getActiveSpan();
    if (span) {
      span.addEvent(name, attributes);
    }
  }

  /**
   * Get current trace context
   */
  static getCurrentTraceId(): string | undefined {
    const span = trace.getActiveSpan();
    return span?.spanContext().traceId;
  }

  /**
   * Get current span ID
   */
  static getCurrentSpanId(): string | undefined {
    const span = trace.getActiveSpan();
    return span?.spanContext().spanId;
  }
}

/**
 * Hono middleware to enable OpenTelemetry distributed tracing
 */
export function tracingMiddleware(serviceName: string) {
  return async (c: any, next: any) => {
    const span = tracer.startSpan(`${c.req.method} ${c.req.path}`, {
      kind: SpanKind.SERVER,
      attributes: {
        'http.method': c.req.method,
        'http.url': c.req.url,
        'http.target': c.req.path,
        'http.host': c.req.header('host'),
        'http.user_agent': c.req.header('user-agent'),
        'http.remote_addr': c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown',
        'service.name': serviceName,
      },
    });

    try {
      // Store span in context for downstream use
      c.set('otelSpan', span);

      // Continue to next middleware/handler
      await next();

      // Set response attributes
      span.setAttribute('http.status_code', c.res.status);
      
      if (c.res.status >= 400) {
        span.setStatus({ 
          code: SpanStatusCode.ERROR,
          message: `HTTP ${c.res.status}`
        });
      } else {
        span.setStatus({ code: SpanStatusCode.OK });
      }
    } catch (error) {
      span.recordException(error as Error);
      span.setStatus({ 
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : String(error)
      });
      throw error;
    } finally {
      span.end();
    }
  };
}

/**
 * Helper to add trace context to outgoing service calls
 */
export function getOutgoingTraceHeaders(c: any): Record<string, string> {
  const span = c.get('otelSpan');
  if (!span) return {};

  const headers: Record<string, string> = {};
  
  // OpenTelemetry will automatically inject headers via propagator
  // This is a manual fallback for specific cases
  const spanContext = span.spanContext();
  if (spanContext) {
    headers['traceparent'] = `00-${spanContext.traceId}-${spanContext.spanId}-01`;
    headers['x-trace-id'] = spanContext.traceId;
    headers['x-span-id'] = spanContext.spanId;
  }

  return headers;
}

/**
 * Create a child span for outgoing HTTP requests
 */
export function createOutgoingSpan(url: string, method: string, parentSpan?: any) {
  return tracer.startSpan(`${method} ${url}`, {
    kind: SpanKind.CLIENT,
    attributes: {
      'http.method': method,
      'http.url': url,
    },
  }, parentSpan);
}

/**
 * Trace HTTP client with automatic span creation
 */
export async function tracedFetch(url: string, options: RequestInit = {}, c?: any): Promise<Response> {
  const parentSpan = c?.get('otelSpan');
  const span = createOutgoingSpan(url, options.method || 'GET', parentSpan);

  try {
    // Add trace headers to request
    const traceHeaders = getOutgoingTraceHeaders(c || {});
    const headers = new Headers(options.headers);
    Object.entries(traceHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    const response = await fetch(url, {
      ...options,
      headers,
    });

    span.setAttribute('http.status_code', response.status);
    span.setStatus({ 
      code: response.ok ? SpanStatusCode.OK : SpanStatusCode.ERROR 
    });

    return response;
  } catch (error) {
    span.recordException(error as Error);
    span.setStatus({ 
      code: SpanStatusCode.ERROR,
      message: error instanceof Error ? error.message : String(error)
    });
    throw error;
  } finally {
    span.end();
  }
}

export default DistributedTracer;
