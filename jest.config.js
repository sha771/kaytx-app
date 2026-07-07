/** @type {import('jest').Config} */
module.exports = {
  // Test environment
  testEnvironment: 'node',

  // Setup files
  setupFiles: [
    '<rootDir>/tests/setup/jest.setup.ts',
  ],

  // Module name mapper for path aliases
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@backend/(.*)$': '<rootDir>/backend/$1',
    '^@constants/(.*)$': '<rootDir>/constants/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    // Mock static assets
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '\\.(css|scss|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
  },

  // Transform configuration
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          target: 'ES2017',
          module: 'commonjs',
          moduleResolution: 'node',
          esModuleInterop: true,
          allowJs: true,
          strict: false,
          skipLibCheck: true,
          isolatedModules: true,
          resolveJsonModule: true,
          jsx: 'react-jsx',
          paths: { '@/*': ['./*'] },
        },
        babelConfig: false,
        diagnostics: false,
      },
    ],
  },

  // Transform ignore patterns - don't ignore these packages
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/.*|native-base|react-native-svg|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|@tanstack/react-query|zustand|amqplib|samlify|@anthropic-ai/sdk|openai|@modelcontextprotocol/sdk|@hono/trpc-server|@hono/zod-validator|puppeteer|whatsapp-web.js|ws|nanoid|isomorphic-dompurify|@stardazed/streams-text-encoding|@ungap/structured-clone|superjson|drizzle-orm|drizzle-kit|postgres)/)',
  ],

  // Test match patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/backend/__tests__/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/backend/**/__tests__/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/utils/__tests__/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/lib/**/__tests__/**/*.test.{ts,tsx,js,jsx}',
  ],

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Coverage configuration
  collectCoverageFrom: [
    'backend/**/*.{ts,js}',
    'lib/**/*.{ts,js}',
    'utils/**/*.{ts,js}',
    'hooks/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
    '!**/coverage/**',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },

  // Clear mocks between tests
  clearMocks: true,

  // Restore mocks after tests
  restoreMocks: true,

  // Verbose output
  verbose: true,

  // Single worker to prevent OOM
  maxWorkers: 1,

  // Error on deprecated features
  errorOnDeprecated: false,

  // Projects for different test environments
  projects: [
    {
      displayName: 'unit',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/tests/unit/**/*.test.{ts,tsx,js,jsx}',
        '<rootDir>/backend/__tests__/unit/**/*.test.{ts,tsx,js,jsx}',
        '<rootDir>/utils/__tests__/**/*.test.{ts,tsx,js,jsx}',
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: {
            target: 'ES2017',
            module: 'commonjs',
            moduleResolution: 'node',
            esModuleInterop: true,
            allowJs: true,
            strict: false,
            skipLibCheck: true,
            isolatedModules: true,
            resolveJsonModule: true,
            jsx: 'react-jsx',
            paths: { '@/*': ['./*'] },
          },
          babelConfig: false,
          diagnostics: false,
        }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@backend/(.*)$': '<rootDir>/backend/$1',
        '^@constants/(.*)$': '<rootDir>/constants/$1',
        '^@lib/(.*)$': '<rootDir>/lib/$1',
        '^@hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
        '\\.(css|scss|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
      },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/.*|native-base|react-native-svg|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|@tanstack/react-query|zustand|amqplib|samlify|@anthropic-ai/sdk|openai|@modelcontextprotocol/sdk|@hono/trpc-server|@hono/zod-validator|puppeteer|whatsapp-web.js|ws|nanoid|isomorphic-dompurify|@stardazed/streams-text-encoding|@ungap/structured-clone|superjson|drizzle-orm|drizzle-kit|postgres)/)',
      ],
    },
    {
      displayName: 'integration',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/tests/integration/**/*.test.{ts,tsx,js,jsx}',
        '<rootDir>/backend/__tests__/integration/**/*.test.{ts,tsx,js,jsx}',
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: {
            target: 'ES2017',
            module: 'commonjs',
            moduleResolution: 'node',
            esModuleInterop: true,
            allowJs: true,
            strict: false,
            skipLibCheck: true,
            isolatedModules: true,
            resolveJsonModule: true,
            jsx: 'react-jsx',
            paths: { '@/*': ['./*'] },
          },
          babelConfig: false,
          diagnostics: false,
        }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@backend/(.*)$': '<rootDir>/backend/$1',
        '^@constants/(.*)$': '<rootDir>/constants/$1',
        '^@lib/(.*)$': '<rootDir>/lib/$1',
        '^@hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
        '\\.(css|scss|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
      },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/.*|native-base|react-native-svg|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|@tanstack/react-query|zustand|amqplib|samlify|@anthropic-ai/sdk|openai|@modelcontextprotocol/sdk|@hono/trpc-server|@hono/zod-validator|puppeteer|whatsapp-web.js|ws|nanoid|isomorphic-dompurify|@stardazed/streams-text-encoding|@ungap/structured-clone|superjson|drizzle-orm|drizzle-kit|postgres)/)',
      ],
    },
    {
      displayName: 'security',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/tests/security/**/*.test.{ts,tsx,js,jsx}',
        '<rootDir>/backend/__tests__/security/**/*.test.{ts,tsx,js,jsx}',
      ],
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: {
            target: 'ES2017',
            module: 'commonjs',
            moduleResolution: 'node',
            esModuleInterop: true,
            allowJs: true,
            strict: false,
            skipLibCheck: true,
            isolatedModules: true,
            resolveJsonModule: true,
            jsx: 'react-jsx',
            paths: { '@/*': ['./*'] },
          },
          babelConfig: false,
          diagnostics: false,
        }],
      },
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^@backend/(.*)$': '<rootDir>/backend/$1',
        '^@constants/(.*)$': '<rootDir>/constants/$1',
        '^@lib/(.*)$': '<rootDir>/lib/$1',
        '^@hooks/(.*)$': '<rootDir>/hooks/$1',
        '^@components/(.*)$': '<rootDir>/components/$1',
        '^@utils/(.*)$': '<rootDir>/utils/$1',
        '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
        '\\.(css|scss|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
      },
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/.*|native-base|react-native-svg|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|@tanstack/react-query|zustand|amqplib|samlify|@anthropic-ai/sdk|openai|@modelcontextprotocol/sdk|@hono/trpc-server|@hono/zod-validator|puppeteer|whatsapp-web.js|ws|nanoid|isomorphic-dompurify|@stardazed/streams-text-encoding|@ungap/structured-clone|superjson|drizzle-orm|drizzle-kit|postgres)/)',
      ],
    },
  ],
};
