const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Set Expo Router app root before creating config - use absolute path
process.env.EXPO_ROUTER_APP_ROOT = 'app';

const config = getDefaultConfig(__dirname);

// Enable experimental ESM support
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_conditionNames = ['import', 'require', 'react-native'];

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

// Configure path aliases to match tsconfig.json using extraNodeModules
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  '@': __dirname,
  '@/providers': __dirname + '/providers',
  '@/components': __dirname + '/components',
  '@/constants': __dirname + '/constants',
  '@/hooks': __dirname + '/hooks',
  '@/utils': __dirname + '/utils',
  '@/lib': __dirname + '/lib',
  '@/types': __dirname + '/types',
  '@/app': __dirname + '/app',
  '@/backend': __dirname + '/backend',
  'react-native': path.join(__dirname, './lib/react-native-web-patched.ts'),
  'lucide-react-native': path.join(__dirname, './__mocks__/lucide-react-native.tsx'),
  'os': path.join(__dirname, './lib/os-stub.ts'),
  'fs': path.join(__dirname, './lib/fs-stub.ts'),
  'path': path.join(__dirname, './lib/path-stub.ts'),
  'child_process': path.join(__dirname, './lib/empty-stub.ts'),
  'cluster': path.join(__dirname, './lib/empty-stub.ts'),
  'dgram': path.join(__dirname, './lib/empty-stub.ts'),
  'dns': path.join(__dirname, './lib/empty-stub.ts'),
  'domain': path.join(__dirname, './lib/empty-stub.ts'),
  'http2': path.join(__dirname, './lib/empty-stub.ts'),
  'inspector': path.join(__dirname, './lib/empty-stub.ts'),
  'module': path.join(__dirname, './lib/empty-stub.ts'),
  'net': path.join(__dirname, './lib/empty-stub.ts'),
  'perf_hooks': path.join(__dirname, './lib/empty-stub.ts'),
  'readline': path.join(__dirname, './lib/empty-stub.ts'),
  'repl': path.join(__dirname, './lib/empty-stub.ts'),
  'tls': path.join(__dirname, './lib/empty-stub.ts'),
  'trace_events': path.join(__dirname, './lib/empty-stub.ts'),
  'tty': path.join(__dirname, './lib/empty-stub.ts'),
  'v8': path.join(__dirname, './lib/empty-stub.ts'),
  'vm': path.join(__dirname, './lib/empty-stub.ts'),
  'zlib': path.join(__dirname, './lib/empty-stub.ts'),
  'stream': path.join(__dirname, './lib/empty-stub.ts'),
  'crypto': path.join(__dirname, './lib/empty-stub.ts'),
  'buffer': path.join(__dirname, './lib/empty-stub.ts'),
  'util': path.join(__dirname, './lib/empty-stub.ts'),
  'assert': path.join(__dirname, './lib/empty-stub.ts'),
  'url': path.join(__dirname, './lib/empty-stub.ts'),
  'querystring': path.join(__dirname, './lib/empty-stub.ts'),
  'events': path.join(__dirname, './lib/empty-stub.ts'),
  'string_decoder': path.join(__dirname, './lib/empty-stub.ts'),
  'timers': path.join(__dirname, './lib/empty-stub.ts'),
  'constants': path.join(__dirname, './lib/empty-stub.ts'),
  'process': path.join(__dirname, './lib/empty-stub.ts'),
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
