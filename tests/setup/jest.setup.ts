import { jest, beforeAll, afterAll, afterEach } from '@jest/globals';

/**
 * Jest setup file for general test configuration
 * This file is executed before each test file
 */

// Set required environment variables for tests
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret-key-for-testing-only';
process.env.ONE_TIME_TOKEN_SECRET = 'test-one-time-token-secret';
process.env.OPENAI_API_KEY = 'test-openai-key';
process.env.ANTHROPIC_API_KEY = 'test-anthropic-key';
process.env.GOOGLE_API_KEY = 'test-google-key';
process.env.FIELD_ENCRYPTION_KEY = 'test-encryption-key-32-chars-long-!!!';
process.env.STRIPE_SECRET_KEY = 'test-stripe-secret-key';
process.env.SMTP_HOST = 'localhost';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'test@example.com';
process.env.SMTP_PASS = 'test-password';

// Global mock for SAMLify to prevent ES module issues
jest.mock('samlify', () => ({
  default: {
    IdentityProvider: jest.fn(() => ({
      getMetadata: jest.fn(() => '<metadata></metadata>'),
      parseLoginResponse: jest.fn(() => ({ attributes: {} })),
      createLoginRequest: jest.fn(() => ({ context: 'test-context' })),
    })),
    ServiceProvider: jest.fn(() => ({
      getMetadata: jest.fn(() => '<metadata></metadata>'),
      parseLoginResponse: jest.fn(() => ({ attributes: {} })),
      createLoginRequest: jest.fn(() => ({ context: 'test-context' })),
    })),
  },
  SamlIdp: jest.fn(() => ({
    getMetadata: jest.fn(() => '<metadata></metadata>'),
    parseLoginResponse: jest.fn(() => ({ attributes: {} })),
    createLoginRequest: jest.fn(() => ({ context: 'test-context' })),
  })),
  SamlSp: jest.fn(() => ({
    getMetadata: jest.fn(() => '<metadata></metadata>'),
    parseLoginResponse: jest.fn(() => ({ attributes: {} })),
    createLoginRequest: jest.fn(() => ({ context: 'test-context' })),
  })),
}));

// Global mock for Stripe
jest.mock('stripe', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    paymentIntents: {
      create: jest.fn(() => Promise.resolve({ id: 'pi_test', client_secret: 'pi_test_secret' })),
      confirm: jest.fn(() => Promise.resolve({ status: 'succeeded' })),
      retrieve: jest.fn(() => Promise.resolve({ id: 'pi_test', status: 'succeeded' })),
      cancel: jest.fn(() => Promise.resolve({ id: 'pi_test', status: 'canceled' })),
    },
    customers: {
      create: jest.fn(() => Promise.resolve({ id: 'cus_test' })),
      retrieve: jest.fn(() => Promise.resolve({ id: 'cus_test', email: 'test@example.com' })),
      update: jest.fn(() => Promise.resolve({ id: 'cus_test' })),
    },
    subscriptions: {
      create: jest.fn(() => Promise.resolve({ id: 'sub_test' })),
      retrieve: jest.fn(() => Promise.resolve({ id: 'sub_test', status: 'active' })),
      cancel: jest.fn(() => Promise.resolve({ id: 'sub_test', status: 'canceled' })),
      update: jest.fn(() => Promise.resolve({ id: 'sub_test' })),
    },
    invoices: {
      create: jest.fn(() => Promise.resolve({ id: 'in_test' })),
      retrieve: jest.fn(() => Promise.resolve({ id: 'in_test', paid: true })),
    },
    webhooks: {
      constructEvent: jest.fn(() => ({ type: 'payment_intent.succeeded', data: { object: { id: 'pi_test' } } })),
      signature: {
        verifyHeader: jest.fn(() => true),
      },
    },
  })),
}));

// Global mock for OpenAI
jest.mock('openai', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    chat: {
      completions: {
        create: jest.fn(() => Promise.resolve({
          choices: [{ message: { content: 'Test response' } }],
          usage: { total_tokens: 100 },
        })),
      },
    },
  })),
}));

if (typeof (global as any).setImmediate === 'undefined') {
  (global as any).setImmediate = (cb: (...args: any[]) => void, ...args: any[]) => {
    return setTimeout(cb, 0, ...args);
  };
}

if (typeof (global as any).clearImmediate === 'undefined') {
  (global as any).clearImmediate = (id: ReturnType<typeof setTimeout>) => {
    clearTimeout(id);
  };
}

// Mock console methods to reduce noise in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
        args[0].includes('react-test-renderer is deprecated') ||
        args[0].includes('An update to AuthProvider inside a test was not wrapped in act'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillMount') ||
        args[0].includes('componentWillReceiveProps'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Global test timeout
jest.setTimeout(30000);

// Mock fetch for tests
(global as any).fetch = jest.fn();

// Mock WebSocket for real-time communication tests
const MockWebSocket = jest.fn().mockImplementation(() => ({
  close: jest.fn(),
  send: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: 1,
}));
(MockWebSocket as any).CONNECTING = 0;
(MockWebSocket as any).OPEN = 1;
(MockWebSocket as any).CLOSING = 2;
(MockWebSocket as any).CLOSED = 3;
(global as any).WebSocket = MockWebSocket as any;

// Mock crypto for security tests
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9),
    getRandomValues: (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  },
});

// Mock performance for timing tests
Object.defineProperty(global, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
  },
});

// Mock database connection for tests
jest.mock('../../backend/db/connection', () => {
  const mockDb = {
    select: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    desc: jest.fn(),
    asc: jest.fn(),
    groupBy: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    rightJoin: jest.fn().mockReturnThis(),
    innerJoin: jest.fn().mockReturnThis(),
    having: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
    execute: jest.fn().mockResolvedValue([]),
    transaction: jest.fn().mockImplementation(async (fn) => await fn(mockDb)),
    query: jest.fn().mockResolvedValue({ rows: [] }),
  };

  // Add chainable methods that return promises with mock data
  mockDb.select.mockReturnValue({
    from: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        orderBy: jest.fn().mockReturnValue({
          groupBy: jest.fn().mockReturnValue({
            limit: jest.fn().mockResolvedValue([]),
          }),
          limit: jest.fn().mockResolvedValue([]),
        }),
        groupBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockResolvedValue([]),
        }),
        limit: jest.fn().mockResolvedValue([]),
      }),
      orderBy: jest.fn().mockReturnValue({
        groupBy: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            offset: jest.fn().mockResolvedValue([]),
          }),
        }),
        limit: jest.fn().mockReturnValue({
          offset: jest.fn().mockResolvedValue([]),
        }),
      }),
      groupBy: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([]),
      }),
    }),
  });

  mockDb.insert.mockReturnValue({
    values: jest.fn().mockReturnValue({
      returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
    }),
  });

  mockDb.update.mockReturnValue({
    set: jest.fn().mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
      }),
    }),
  });

  mockDb.delete.mockReturnValue({
    where: jest.fn().mockReturnValue({
      returning: jest.fn().mockResolvedValue([{ id: 'mock-id' }]),
    }),
  });

  return {
    db: mockDb,
    pgDb: mockDb,
    getDb: jest.fn(() => mockDb),
    schema: {},
  };
});

// Mock uuid to prevent ES module issues
jest.mock('uuid', () => ({
  v1: jest.fn(() => 'test-uuid-v1'),
  v4: jest.fn(() => 'test-uuid-v4'),
}));

// Setup test database cleanup
afterEach(() => {
  jest.clearAllMocks();
});