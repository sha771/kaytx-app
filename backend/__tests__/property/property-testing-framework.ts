import { Arbitrary, fc } from 'fast-check';
import { jest } from '@jest/globals';

export interface PropertyTestConfig {
  numRuns?: number;
  timeout?: number;
  seed?: number;
  path?: string[];
  endOnFailure?: boolean;
  verbose?: boolean;
}

export interface PropertyTestResult {
  success: boolean;
  numRuns: number;
  numShrinks: number;
  failure?: {
    counterexample: any;
    error: Error;
    shrunk: any;
  };
  duration: number;
}

export class PropertyTestingFramework {
  private defaultConfig: PropertyTestConfig = {
    numRuns: 100,
    timeout: 30000,
    verbose: false,
    endOnFailure: true,
  };

  async property<T>(
    name: string,
    arbitrary: Arbitrary<T>,
    predicate: (value: T) => boolean | Promise<boolean>,
    config: PropertyTestConfig = {}
  ): Promise<PropertyTestResult> {
    const finalConfig = { ...this.defaultConfig, ...config };
    const startTime = Date.now();

    try {
      const result = await fc.assert(
        fc.asyncProperty(arbitrary, predicate),
        {
          numRuns: finalConfig.numRuns,
          timeout: finalConfig.timeout,
          seed: finalConfig.seed,
          path: finalConfig.path,
          endOnFailure: finalConfig.endOnFailure,
          verbose: finalConfig.verbose,
        }
      );

      return {
        success: true,
        numRuns: finalConfig.numRuns!,
        numShrinks: 0,
        duration: Date.now() - startTime,
      };
    } catch (error) {
      const fcError = error as any;
      return {
        success: false,
        numRuns: fcError.numRuns || 0,
        numShrinks: fcError.numShrinks || 0,
        failure: {
          counterexample: fcError.counterexample,
          error: fcError.error || error,
          shrunk: fcError.shrunk,
        },
        duration: Date.now() - startTime,
      };
    }
  }

  async propertyAsync<T>(
    name: string,
    arbitrary: Arbitrary<T>,
    predicate: (value: T) => Promise<boolean>,
    config: PropertyTestConfig = {}
  ): Promise<PropertyTestResult> {
    return this.property(name, arbitrary, predicate, config);
  }

  // Common arbitraries for our domain
  static arbitraries = {
    // User-related arbitraries
    email: fc.emailAddress(),
    firstName: fc.string({ minLength: 1, maxLength: 50 }),
    lastName: fc.string({ minLength: 1, maxLength: 50 }),
    userId: fc.uuid(),
    organizationId: fc.uuid(),
    role: fc.constantFrom('super_admin', 'admin', 'manager', 'user', 'viewer'),
    status: fc.constantFrom('active', 'inactive', 'suspended', 'pending'),

    // Organization arbitraries
    organizationName: fc.string({ minLength: 1, maxLength: 100 }),
    slug: fc.string({ minLength: 3, maxLength: 50 }).map(s => 
      s.toLowerCase().replace(/[^a-z0-9]/g, '-')
    ),
    plan: fc.constantFrom('free', 'starter', 'pro', 'enterprise'),

    // Lead management arbitraries
    leadScore: fc.integer({ min: 0, max: 100 }),
    temperature: fc.constantFrom('cold', 'warm', 'hot'),
    stage: fc.constantFrom(
      'subscriber', 'lead', 'marketing_qualified_lead', 
      'sales_qualified_lead', 'opportunity', 'customer'
    ),

    // Email campaign arbitraries
    subject: fc.string({ minLength: 1, maxLength: 200 }),
    content: fc.lorem({ maxCount: 10 }),
    campaignStatus: fc.constantFrom('draft', 'scheduled', 'running', 'paused', 'completed', 'cancelled'),

    // AI agent arbitraries
    agentName: fc.string({ minLength: 1, maxLength: 100 }),
    agentType: fc.constantFrom('chat', 'task', 'workflow', 'analytical'),
    messageContent: fc.lorem({ maxCount: 5 }),

    // File arbitraries
    filename: fc.string({ minLength: 1, maxLength: 255 }),
    mimeType: fc.constantFrom(
      'image/jpeg', 'image/png', 'application/pdf', 
      'text/plain', 'application/json'
    ),
    fileSize: fc.integer({ min: 1, max: 10 * 1024 * 1024 }), // 1B to 10MB

    // API arbitraries
    apiKey: fc.hexaString({ minLength: 32, maxLength: 64 }),
    httpMethod: fc.constantFrom('GET', 'POST', 'PUT', 'DELETE', 'PATCH'),
    statusCode: fc.integer({ min: 200, max: 599 }),

    // Date arbitraries
    date: fc.date(),
    timestamp: fc.integer({ min: 0, max: Date.now() }),

    // Generic arbitraries
    nonEmptyString: fc.string({ minLength: 1 }),
    url: fc.webUrl(),
    phoneNumber: fc.phoneNumber(),
    json: fc.jsonObject(),
    array: <T>(arb: Arbitrary<T>) => fc.array(arb),
    option: <T>(arb: Arbitrary<T>) => fc.option(arb),
    record: <T>(arb: Arbitrary<T>) => fc.record({ key: fc.string(), value: arb }),
  };

  // Property test helpers
  static helpers = {
    // Test invariants
    invariant: <T>(arbitrary: Arbitrary<T>, invariant: (value: T) => boolean) =>
      fc.asyncProperty(arbitrary, invariant),

    // Test round-trip properties
    roundTrip: <T, U>(
      arb1: Arbitrary<T>,
      arb2: Arbitrary<U>,
      encode: (t: T) => U,
      decode: (u: U) => T
    ) =>
      fc.asyncProperty(arb1, (t) => {
        const encoded = encode(t);
        const decoded = decode(encoded);
        return decoded === t;
      }),

    // Test idempotent operations
    idempotent: <T>(
      arbitrary: Arbitrary<T>,
      operation: (value: T) => T
    ) =>
      fc.asyncProperty(arbitrary, (value) => {
        const first = operation(value);
        const second = operation(first);
        return first === second;
      }),

    // Test commutative operations
    commutative: <T>(
      arbitrary: Arbitrary<T>,
      operation: (a: T, b: T) => T
    ) =>
      fc.asyncProperty(arbitrary, arbitrary, (a, b) => {
        const result1 = operation(a, b);
        const result2 = operation(b, a);
        return result1 === result2;
      }),

    // Test associative operations
    associative: <T>(
      arbitrary: Arbitrary<T>,
      operation: (a: T, b: T) => T
    ) =>
      fc.asyncProperty(arbitrary, arbitrary, arbitrary, (a, b, c) => {
        const result1 = operation(operation(a, b), c);
        const result2 = operation(a, operation(b, c));
        return result1 === result2;
      }),

    // Test distributive operations
    distributive: <T>(
      arbitrary: Arbitrary<T>,
      op1: (a: T, b: T) => T,
      op2: (a: T, b: T) => T
    ) =>
      fc.asyncProperty(arbitrary, arbitrary, arbitrary, (a, b, c) => {
        const result1 = op1(a, op2(b, c));
        const result2 = op2(op1(a, b), op1(a, c));
        return result1 === result2;
      }),
  };

  // Test runners
  async runPropertyTests(testSuite: PropertyTestSuite): Promise<{
    passed: number;
    failed: number;
    results: { name: string; result: PropertyTestResult }[];
  }> {
    const results: { name: string; result: PropertyTestResult }[] = [];
    let passed = 0;
    let failed = 0;

    for (const test of testSuite.tests) {
      try {
        console.log(`Running property test: ${test.name}`);
        const result = await this.property(test.name, test.arbitrary, test.predicate, test.config);
        results.push({ name: test.name, result });

        if (result.success) {
          passed++;
          console.log(`✓ ${test.name} (${result.numRuns} runs, ${result.duration}ms)`);
        } else {
          failed++;
          console.error(`✗ ${test.name}: ${result.failure?.error.message}`);
          if (result.failure?.counterexample) {
            console.error(`  Counterexample:`, result.failure.counterexample);
          }
        }
      } catch (error) {
        failed++;
        const errorResult: PropertyTestResult = {
          success: false,
          numRuns: 0,
          numShrinks: 0,
          failure: {
            counterexample: undefined,
            error: error as Error,
            shrunk: undefined,
          },
          duration: 0,
        };
        results.push({ name: test.name, result: errorResult });
        console.error(`✗ ${test.name}: ${(error as Error).message}`);
      }
    }

    return { passed, failed, results };
  }
}

export interface PropertyTest {
  name: string;
  arbitrary: Arbitrary<any>;
  predicate: (value: any) => boolean | Promise<boolean>;
  config?: PropertyTestConfig;
}

export interface PropertyTestSuite {
  name: string;
  tests: PropertyTest[];
}

export class PropertyTestBuilder {
  private tests: PropertyTest[] = [];

  test<T>(
    name: string,
    arbitrary: Arbitrary<T>,
    predicate: (value: T) => boolean | Promise<boolean>,
    config?: PropertyTestConfig
  ): PropertyTestBuilder {
    this.tests.push({ name, arbitrary, predicate, config });
    return this;
  }

  testInvariant<T>(
    name: string,
    arbitrary: Arbitrary<T>,
    invariant: (value: T) => boolean,
    config?: PropertyTestConfig
  ): PropertyTestBuilder {
    return this.test(name, arbitrary, invariant, config);
  }

  testRoundTrip<T, U>(
    name: string,
    arb1: Arbitrary<T>,
    arb2: Arbitrary<U>,
    encode: (t: T) => U,
    decode: (u: U) => T,
    config?: PropertyTestConfig
  ): PropertyTestBuilder {
    return this.test(name, arb1, (t) => {
      const encoded = encode(t);
      const decoded = decode(encoded);
      return decoded === t;
    }, config);
  }

  testIdempotent<T>(
    name: string,
    arbitrary: Arbitrary<T>,
    operation: (value: T) => T,
    config?: PropertyTestConfig
  ): PropertyTestBuilder {
    return this.test(name, arbitrary, (value) => {
      const first = operation(value);
      const second = operation(first);
      return first === second;
    }, config);
  }

  build(name: string): PropertyTestSuite {
    return { name, tests: this.tests };
  }
}

export const propertyTestingFramework = new PropertyTestingFramework();

// Jest custom matchers for property testing
expect.extend({
  async toSatisfyProperty<T>(
    received: Arbitrary<T>,
    predicate: (value: T) => boolean | Promise<boolean>,
    config: PropertyTestConfig = {}
  ) {
    const framework = new PropertyTestingFramework();
    const result = await framework.property('test', received, predicate, config);

    if (result.success) {
      return {
        message: () => `expected property not to be satisfied`,
        pass: true,
      };
    } else {
      return {
        message: () => 
          `expected property to be satisfied\n` +
          `Failed after ${result.numRuns} runs with ${result.numShrinks} shrinks\n` +
          `Counterexample: ${JSON.stringify(result.failure?.counterexample)}\n` +
          `Error: ${result.failure?.error.message}`,
        pass: false,
      };
    }
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toSatisfyProperty<T>(
        predicate: (value: T) => boolean | Promise<boolean>,
        config?: PropertyTestConfig
      ): R;
    }
  }
}
