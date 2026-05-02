module.exports = {
  preset: 'ts-jest',
  
  // Use projects for different test environments
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
      testEnvironmentOptions: {},
      testMatch: [
        '<rootDir>/backend/**/__tests__/**/*.(test|spec).(ts|js)',
        '<rootDir>/tests/unit/**/*.test.(ts|js)',
        '<rootDir>/tests/property/**/*.test.(ts|js)',
        '<rootDir>/tests/integration/**/*.test.(ts|js)',
        '<rootDir>/utils/**/__tests__/**/*.(test|spec).(ts|js)',
      ],
      setupFiles: ['<rootDir>/tests/setup/jest.preload.ts'],
      setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@/backend/(.*)$': '<rootDir>/backend/$1',
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
        '^@/types/(.*)$': '<rootDir>/types/$1',
        '^@/tests/(.*)$': '<rootDir>/tests/$1',
        '^lucide-react-native$': '<rootDir>/__mocks__/lucide-react-native.tsx',
        '^@opentelemetry/exporter-otlp-grpc$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/sdk-node$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/auto-instrumentations-node$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/resources$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/semantic-conventions$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/exporter-jaeger$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/sdk-trace-base$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/configuration$': '<rootDir>/__mocks__/empty-stub.ts',
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-typescript'] }],
      },
      cache: false,
      globals: {
        'fast-check': {
          numRuns: 100,
          verbose: true,
        },
      },
    },
    {
      displayName: 'react-native',
      testEnvironment: 'jsdom',
      testEnvironmentOptions: {},
      testMatch: [
        '<rootDir>/providers/**/*.test.(tsx|ts)',
        '<rootDir>/app/**/*.(test|spec).(tsx|ts)',
        '<rootDir>/components/**/*.test.(tsx|ts)',
      ],
      setupFiles: [
        '<rootDir>/tests/setup/jest.preload.ts',
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@/backend/(.*)$': '<rootDir>/backend/$1',
        '^@/components/(.*)$': '<rootDir>/components/$1',
        '^@/utils/(.*)$': '<rootDir>/utils/$1',
        '^@/types/(.*)$': '<rootDir>/types/$1',
        '^@/tests/(.*)$': '<rootDir>/tests/$1',
        '^lucide-react-native$': '<rootDir>/__mocks__/lucide-react-native.tsx',
        '^@opentelemetry/exporter-otlp-grpc$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/sdk-node$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/auto-instrumentations-node$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/resources$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/semantic-conventions$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/exporter-jaeger$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/sdk-trace-base$': '<rootDir>/__mocks__/empty-stub.ts',
        '^@opentelemetry/configuration$': '<rootDir>/__mocks__/empty-stub.ts',
      },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-native-web|@ai-sdk/.*|react-native)',
      ],
      cache: false,
    },
  ],

  // Coverage configuration - disabled for now
  collectCoverage: false,
  
  // Verbose output
  verbose: true,
  
  // Experimental VM modules for dynamic imports
  sandboxInjectedGlobals: ['fetch', 'Request', 'Response', 'Headers'],
  
  // Error handling
  errorOnDeprecated: true,
  
  // Parallel execution
  maxWorkers: '50%',
};
