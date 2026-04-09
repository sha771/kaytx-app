const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add fallbacks for Node.js modules using stub files
  config.resolve = config.resolve || {};
  config.resolve.alias = {
    ...config.resolve.alias,
    // Path aliases from tsconfig.json
    '@': path.resolve(__dirname),
    '@/providers': path.resolve(__dirname, 'providers'),
    '@/components': path.resolve(__dirname, 'components'),
    '@/utils': path.resolve(__dirname, 'utils'),
    '@/types': path.resolve(__dirname, 'types'),
    '@/app': path.resolve(__dirname, 'app'),
    '@/hooks': path.resolve(__dirname, 'hooks'),
    '@/lib': path.resolve(__dirname, 'lib'),
    '@/constants': path.resolve(__dirname, 'constants'),
    '@/backend': path.resolve(__dirname, 'backend'),
    // Node.js module stubs
    os: path.resolve(__dirname, 'lib/os-stub.ts'),
    fs: path.resolve(__dirname, 'lib/fs-stub.ts'),
    path: path.resolve(__dirname, 'lib/path-stub.ts'),
    'prom-client': path.resolve(__dirname, 'lib/empty-stub.ts'),
    '@opentelemetry/sdk-node': path.resolve(__dirname, 'lib/empty-stub.ts'),
    '@opentelemetry/auto-instrumentations-node': path.resolve(__dirname, 'lib/empty-stub.ts'),
    '@opentelemetry/exporter-jaeger': path.resolve(__dirname, 'lib/empty-stub.ts'),
    '@opentelemetry/exporter-otlp-grpc': path.resolve(__dirname, 'lib/empty-stub.ts'),
    // React Native module stubs for web
    'react-native-reanimated': path.resolve(__dirname, 'lib/react-native-reanimated.web.ts'),
    'react-native-chart-kit': path.resolve(__dirname, 'lib/react-native-chart-kit.web.tsx'),
    'nanoid/non-secure': path.resolve(__dirname, 'lib/nanoid-stub.js'),
  };
  config.resolve.fallback = {
    ...config.resolve.fallback,
    child_process: false,
    cluster: false,
    dgram: false,
    dns: false,
    domain: false,
    http2: false,
    https: false,
    inspector: false,
    module: false,
    net: false,
    perf_hooks: false,
    readline: false,
    repl: false,
    tls: false,
    trace_events: false,
    tty: false,
    v8: false,
    vm: false,
    zlib: false,
    stream: false,
    crypto: false,
    buffer: false,
    util: false,
    assert: false,
    url: false,
    querystring: false,
    events: false,
    string_decoder: false,
    timers: false,
    constants: false,
    process: false,
  };

  // Exclude backend files from bundling
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  
  // Add rule to ignore backend files
  config.module.rules.push({
    test: /backend[\/].*\.ts$/,
    use: 'ignore-loader',
  });
  
  // Ignore API routes (backend-only)
  config.module.rules.push({
    test: /app[\/]api[\/].*\.ts$/,
    use: 'ignore-loader',
  });

  // Ignore specific Node.js-only packages
  config.plugins = config.plugins || [];
  const { IgnorePlugin, DefinePlugin, NormalModuleReplacementPlugin } = require('webpack');
  config.plugins.push(
    new IgnorePlugin({
      resourceRegExp: /^(prom-client|@opentelemetry\/sdk-node|@opentelemetry\/auto-instrumentations-node|@opentelemetry\/exporter-jaeger|@opentelemetry\/exporter-otlp-grpc)$/,
    })
  );

  // Fix expo-router Windows path issue by replacing the problematic require.context
  config.plugins.push(
    new NormalModuleReplacementPlugin(
      /(?:^|[\\/])expo-router(?:[\\/])_ctx\.web\.js$/,
      path.resolve(__dirname, 'lib/expo-router-ctx-stub.js')
    )
  );

  // Aggressive replacement for nanoid/non-secure which breaks under expo-router CommonJS
  config.plugins.push(
    new NormalModuleReplacementPlugin(
      /nanoid[\/\\]non-secure/,
      function(resource) {
        resource.request = path.resolve(__dirname, 'lib/nanoid-stub.js');
      }
    )
  );

  // Define EXPO_ROUTER_APP_ROOT for expo-router
  // Use absolute path to avoid Windows path resolution issues
  config.plugins.push(
    new DefinePlugin({
      __EXPO_ROUTER_APP_ROOT__: JSON.stringify(path.resolve(__dirname, 'app').replace(/\\/g, '/')),
      'process.env.EXPO_ROUTER_APP_ROOT': JSON.stringify(path.resolve(__dirname, 'app').replace(/\\/g, '/')),
    })
  );

  // Fix webpack dev server configuration - use a simple clean object
  if (config.devServer) {
    const validDevServerProperties = [
      'allowedHosts', 'bonjour', 'client', 'compress', 'devMiddleware', 
      'headers', 'historyApiFallback', 'host', 'hot', 'ipc', 'liveReload', 
      'onListening', 'open', 'port', 'proxy', 'server', 'app', 
      'setupExitSignals', 'setupMiddlewares', 'static', 'watchFiles', 'webSocketServer'
    ];

    const cleanDevServer = {};
    for (const key of validDevServerProperties) {
      if (key in config.devServer) {
        cleanDevServer[key] = config.devServer[key];
      }
    }
    config.devServer = cleanDevServer;
  }

  return config;
};
