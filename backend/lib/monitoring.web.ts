/**
 * Monitoring - Browser Stub
 * No-op implementation for browser environment
 */

// Export stubs for all monitoring functions
export const register = { metrics: async () => '' };
export const appRegister = { metrics: async () => '' };

// Stub metrics
export const httpRequestDuration = { observe: () => {} } as any;
export const httpRequestErrors = { inc: () => {} } as any;
export const httpRequestActive = { inc: () => {}, dec: () => {} } as any;
export const databaseQueryDuration = { observe: () => {} } as any;
export const cacheHitRate = { set: () => {} } as any;
export const aiRequestDuration = { observe: () => {} } as any;

// Stub functions
export function recordHttpRequest() {}
export function recordDatabaseQuery() {}
export function recordCacheOperation() {}
export function recordAIRequest() {}

// Counter, Gauge, Histogram, Summary stubs
export class Counter {
  inc() {}
  labels() { return { inc: () => {} }; }
}

export class Gauge {
  set() {}
  inc() {}
  dec() {}
  labels() { return { set: () => {}, inc: () => {}, dec: () => {} }; }
}

export class Histogram {
  observe() {}
  labels() { return { observe: () => {} }; }
}

export class Summary {
  observe() {}
  labels() { return { observe: () => {} }; }
}

export function collectDefaultMetrics() {}

// Default export
export default {
  register,
  appRegister,
  httpRequestDuration,
  httpRequestErrors,
  httpRequestActive,
  databaseQueryDuration,
  cacheHitRate,
  aiRequestDuration,
  Counter,
  Gauge,
  Histogram,
  Summary,
  collectDefaultMetrics,
  recordHttpRequest,
  recordDatabaseQuery,
  recordCacheOperation,
  recordAIRequest,
};
