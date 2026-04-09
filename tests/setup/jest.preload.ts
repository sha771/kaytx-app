/**
 * Jest Global Setup
 * This file is loaded before all tests to set up global mocks and configurations
 */

import { jest } from '@jest/globals';

// CRITICAL: Define Web Stream API globals BEFORE any imports that might use them
 
if (!(globalThis as any).ReadableStream) {
  (globalThis as any).ReadableStream = class ReadableStream {
    constructor() {}
  };
  (globalThis as any).ReadableStreamDefaultReader = class ReadableStreamDefaultReader {
    constructor() {}
    read() { return Promise.resolve({ done: true, value: undefined }); }
    releaseLock() {}
  };
  (globalThis as any).WritableStream = class WritableStream {
    constructor() {}
    getWriter() { 
      return { write: () => Promise.resolve(), close: () => Promise.resolve(), releaseLock: () => {} }; 
    }
  };
}

 
if (!(globalThis as any).TransformStream) {
  (globalThis as any).TransformStream = class TransformStream {
    constructor() {}
    readable = new (globalThis as any).ReadableStream();
    writable = new (globalThis as any).WritableStream();
  };
}

 
if (!(globalThis as any).TextEncoder) {
  const { TextEncoder } = require('util');
  globalThis.TextEncoder = TextEncoder;
}

 
if (!(globalThis as any).TextDecoder) {
  const { TextDecoder } = require('util');
  globalThis.TextDecoder = TextDecoder;
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'test-jwt-secret';
}

if (!process.env.JWT_REFRESH_SECRET) {
  process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret';
}

if (!process.env.EXPO_PUBLIC_RORK_API_BASE_URL) {
  process.env.EXPO_PUBLIC_RORK_API_BASE_URL = 'http://localhost:3000';
}

if (!process.env.USE_MOCK_REDIS) {
  process.env.USE_MOCK_REDIS = 'true';
}

if (!process.env.REDIS_URL) {
  process.env.REDIS_URL = 'redis://localhost:6379';
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  process.env.STRIPE_WEBHOOK_SECRET = 'test-stripe-webhook-secret';
}

if (!process.env.STRIPE_SECRET_KEY) {
  process.env.STRIPE_SECRET_KEY = 'sk_test_test';
}

// Set test environment flag
process.env.NODE_ENV = 'test';
process.env.JEST_WORKER_ID = '1';

// Enable integration containers for proper test setup
process.env.ENABLE_INTEGRATION_CONTAINERS = 'true';

// Add TextEncoder/TextDecoder globals if not available (needed for undici)
 
if (!(globalThis as any).TextEncoder || !(globalThis as any).TextDecoder) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TextEncoder, TextDecoder } = require('util');
  globalThis.TextEncoder = TextEncoder;
  globalThis.TextDecoder = TextDecoder;
}

// Ensure Fetch API globals exist for server-side route tests (Hono uses Request/Response)
 
if (!(globalThis as any).Request || !(globalThis as any).Response || !(globalThis as any).Headers || !(globalThis as any).fetch) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const undici = require('undici');
  (globalThis as any).fetch = undici.fetch;
  (globalThis as any).Request = undici.Request;
  (globalThis as any).Response = undici.Response;
  (globalThis as any).Headers = undici.Headers;
}

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: () => '00000000-0000-4000-8000-000000000000',
  };
});

jest.mock('superjson', () => {
  const transformer = {
    serialize: (data: unknown) => data,
    deserialize: (data: unknown) => data,
  };

  return {
    __esModule: true,
    default: transformer,
    serialize: transformer.serialize,
    deserialize: transformer.deserialize,
  };
});

jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __esModule: true,
    getItemAsync: async (key: string) => store.get(key) ?? null,
    setItemAsync: async (key: string, value: string) => {
      store.set(key, value);
    },
    deleteItemAsync: async (key: string) => {
      store.delete(key);
    },
  };
});

jest.mock('expo-crypto', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nodeCrypto = require('crypto') as typeof import('crypto');

  return {
    __esModule: true,
    CryptoDigestAlgorithm: {
      SHA256: 'SHA256',
    },
    digestStringAsync: async (_algorithm: string, data: string) => {
      return nodeCrypto.createHash('sha256').update(data, 'utf8').digest('hex');
    },
    getRandomBytesAsync: async (byteCount: number) => {
      const buf = nodeCrypto.randomBytes(byteCount);
      return Uint8Array.from(buf);
    },
  };
});

// Mock OpenTelemetry modules to avoid ES module issues
jest.mock('@opentelemetry/sdk-node', () => ({
  NodeSDK: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));

jest.mock('@opentelemetry/auto-instrumentations-node', () => ({
  getNodeAutoInstrumentations: jest.fn(() => []),
}));

jest.mock('@opentelemetry/resources', () => ({
  Resource: jest.fn(),
}));

jest.mock('@opentelemetry/semantic-conventions', () => ({
  SemanticResourceAttributes: {
    SERVICE_NAME: 'service.name',
    SERVICE_VERSION: 'service.version',
    DEPLOYMENT_ENVIRONMENT: 'deployment.environment',
    PROCESS_PID: 'process.pid',
    HOST_NAME: 'host.name',
  },
}));

jest.mock('@opentelemetry/exporter-jaeger', () => ({
  JaegerExporter: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@opentelemetry/exporter-otlp-grpc', () => ({
  OTLPTraceExporter: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@opentelemetry/sdk-trace-base', () => ({
  SimpleSpanProcessor: jest.fn().mockImplementation(() => ({})),
  BatchSpanProcessor: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@opentelemetry/api', () => {
  const noopSpan = {
    end: jest.fn(),
    setAttribute: jest.fn(),
    addEvent: jest.fn(),
    setStatus: jest.fn(),
    recordException: jest.fn(),
  };

  return {
    trace: {
      getTracer: jest.fn(() => ({
        startSpan: jest.fn(() => noopSpan),
      })),
    },
    context: {
      active: jest.fn(() => ({})),
      with: jest.fn((_ctx: unknown, fn: (...args: any[]) => any) => fn()),
    },
    propagation: {
      inject: jest.fn(),
      extract: jest.fn((_ctx: unknown) => ({})),
    },
    diag: {
      setLogger: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    },
    createContextKey: jest.fn((name: string) => name),
    SpanStatusCode: {
      OK: 1,
      ERROR: 2,
    },
    SpanKind: {
      INTERNAL: 0,
      SERVER: 1,
      CLIENT: 2,
      PRODUCER: 3,
      CONSUMER: 4,
    },
  };
});

jest.mock('@opentelemetry/configuration', () => ({}));

// Mock expo modules to avoid ES module issues
jest.mock('expo', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('expo/virtual/env', () => ({
  __esModule: true,
  env: process.env,
}));

// Mock OpenTelemetry for tests
jest.mock('@opentelemetry/api', () => ({
  trace: {
    getTracer: jest.fn(() => ({
      startSpan: jest.fn(() => ({
        end: jest.fn(),
        setAttribute: jest.fn(),
        addEvent: jest.fn(),
        setStatus: jest.fn(),
        recordException: jest.fn(),
      })),
      withSpan: jest.fn((span, fn) => fn()),
    })),
  },
  metrics: {
    getMeter: jest.fn(() => ({
      createCounter: jest.fn(() => ({ add: jest.fn() })),
      createHistogram: jest.fn(() => ({ record: jest.fn() })),
      createGauge: jest.fn(() => ({ set: jest.fn() })),
    })),
  },
}));

// Mock React Native to avoid ES module issues
jest.mock('react-native', () => ({
  __esModule: true,
  Platform: {
    OS: 'node',
    select: (obj: any) => obj.node || obj.default,
  },
  NativeModules: {},
  NativeEventEmitter: jest.fn(),
}));
