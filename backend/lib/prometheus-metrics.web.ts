/**
 * Prometheus Metrics - Browser Stub
 * No-op implementation for browser environment
 */

// HTTP Request Metrics stubs
export const httpRequestDuration = { observe: () => {}, labels: () => ({ observe: () => {} }) } as any;
export const httpRequestTotal = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const httpRequestActive = { inc: () => {}, dec: () => {}, labels: () => ({ inc: () => {}, dec: () => {} }) } as any;
export const httpRequestSize = { observe: () => {}, labels: () => ({ observe: () => {} }) } as any;
export const httpResponseSize = { observe: () => {}, labels: () => ({ observe: () => {} }) } as any;

// Database Metrics stubs
export const dbQueryDuration = { observe: () => {}, labels: () => ({ observe: () => {} }) } as any;
export const dbQueryTotal = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const dbConnectionsActive = { set: () => {}, inc: () => {}, dec: () => {} } as any;
export const dbConnectionsIdle = { set: () => {}, inc: () => {}, dec: () => {} } as any;

// AI Service Metrics stubs
export const aiRequestDuration = { observe: () => {}, labels: () => ({ observe: () => {} }) } as any;
export const aiRequestTotal = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const aiTokensUsed = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const aiCost = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;

// Message Queue Metrics stubs
export const mqMessagesPublished = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const mqMessagesConsumed = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const mqMessagesFailed = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const mqQueueSize = { set: () => {}, labels: () => ({ set: () => {} }) } as any;

// Business Metrics stubs
export const userRegistrations = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const userLogins = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const activeUsers = { set: () => {}, labels: () => ({ set: () => {} }) } as any;
export const aiAgentInteractions = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const phoneCalls = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const phoneCallDuration = { observe: () => {}, labels: () => ({ observe: () => {} }) } as any;

// Error Metrics stubs
export const errorsTotal = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const panicsTotal = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;

// Cache Metrics stubs
export const cacheHits = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const cacheMisses = { inc: () => {}, labels: () => ({ inc: () => {} }) } as any;
export const cacheSize = { set: () => {}, labels: () => ({ set: () => {} }) } as any;

// Metrics Collector stub
export const metricsCollector = {
  registerCounter: () => null,
  registerHistogram: () => null,
  registerGauge: () => null,
  getMetric: () => undefined,
  getMetrics: async () => '',
  resetMetrics: () => {},
};

// Helper functions (no-op)
export function recordHttpRequest() {}
export function recordDatabaseQuery() {}
export function recordAIRequest() {}
export function recordPhoneCall() {}
export function createMetricsMiddleware() {
  return async (_c: any, next: any) => { await next(); };
}

// Register stub
export const register = { metrics: async () => '' };

export default {
  httpRequestDuration,
  httpRequestTotal,
  httpRequestActive,
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
