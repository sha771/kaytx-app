const { getDefaultConfig } = require('expo/metro-config');

// Set Expo Router app root before creating config
process.env.EXPO_ROUTER_APP_ROOT = 'app';

const config = getDefaultConfig(__dirname);

// Enable experimental ESM support
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ['import', 'require', 'react-native'];

// Configure platform-specific resolution for web
config.resolver.platformSpecific = {
  web: true
};

// Set resolver main fields for proper module resolution
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

// Fix watch mode issues on Windows - disable watchman
config.resolver.useWatchman = false;
config.watchFolders = [__dirname];
config.watcher = {
  ...config.watcher,
  healthCheck: {
    enabled: false
  },
  useWatchman: false,
  usePolling: true,
  interval: 1000
};

// Remove all console polyfills
config.resolver = config.resolver || {};
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@': __dirname,
  'os': require.resolve('./lib/os-stub.ts'),
  'fs': require.resolve('./lib/fs-stub.ts'),
  'path': require.resolve('./lib/path-stub.ts'),
  'child_process': require.resolve('./lib/empty-stub.ts'),
  'cluster': require.resolve('./lib/empty-stub.ts'),
  'dgram': require.resolve('./lib/empty-stub.ts'),
  'dns': require.resolve('./lib/empty-stub.ts'),
  'domain': require.resolve('./lib/empty-stub.ts'),
  'http2': require.resolve('./lib/empty-stub.ts'),
  'inspector': require.resolve('./lib/empty-stub.ts'),
  'module': require.resolve('./lib/empty-stub.ts'),
  'net': require.resolve('./lib/empty-stub.ts'),
  'perf_hooks': require.resolve('./lib/empty-stub.ts'),
  'readline': require.resolve('./lib/empty-stub.ts'),
  'repl': require.resolve('./lib/empty-stub.ts'),
  'tls': require.resolve('./lib/empty-stub.ts'),
  'trace_events': require.resolve('./lib/empty-stub.ts'),
  'tty': require.resolve('./lib/empty-stub.ts'),
  'v8': require.resolve('./lib/empty-stub.ts'),
  'vm': require.resolve('./lib/empty-stub.ts'),
  'zlib': require.resolve('./lib/empty-stub.ts'),
  'stream': require.resolve('./lib/empty-stub.ts'),
  'crypto': require.resolve('./lib/empty-stub.ts'),
  'buffer': require.resolve('./lib/empty-stub.ts'),
  'util': require.resolve('./lib/empty-stub.ts'),
  'assert': require.resolve('./lib/empty-stub.ts'),
  'url': require.resolve('./lib/empty-stub.ts'),
  'querystring': require.resolve('./lib/empty-stub.ts'),
  'events': require.resolve('./lib/empty-stub.ts'),
  'string_decoder': require.resolve('./lib/empty-stub.ts'),
  'timers': require.resolve('./lib/empty-stub.ts'),
  'constants': require.resolve('./lib/empty-stub.ts'),
  'process': require.resolve('./lib/empty-stub.ts'),
};

// Block problematic packages and backend files entirely
config.resolver.blockList = [
  /node_modules[/\\](prom-client)[/\\]/,
  /node_modules[/\\](@opentelemetry[/\\]sdk-node)[/\\]/,
  /node_modules[/\\](@opentelemetry[/\\]auto-instrumentations-node)[/\\]/,
  /node_modules[/\\](@opentelemetry[/\\]exporter-jaeger)[/\\]/,
  /node_modules[/\\](@opentelemetry[/\\]exporter-otlp-grpc)[/\\]/,
  /backend[/\\]/,
  /backend\/lib\/opentelemetry\.ts$/,
  /backend\/lib\/prometheus-metrics\.ts$/,
  /backend\/lib\/ai-service-logger\.ts$/,
  /backend\/lib\/alerting-system\.ts$/,
  /backend\/lib\/monitoring\.ts$/,
  /backend\/lib\/config\.ts$/,
  /backend\/lib\/production-logger\.ts$/,
  /backend\/lib\/circuit-breaker\.ts$/,
  /backend\/lib\/ai-model-abstraction\.ts$/,
  /backend\/monitoring[/\\]/,
];

module.exports = config;
