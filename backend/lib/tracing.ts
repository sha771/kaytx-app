// ✅ GAP #6: DISTRIBUTED TRACING
import { trace } from '@opentelemetry/api';

export const tracer = trace.getTracer('app-tracer');
