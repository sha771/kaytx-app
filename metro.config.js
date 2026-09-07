const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Reduce parallelism to avoid EMFILE on Windows
config.maxWorkers = 2;

// Disable cache stores to prevent file handle exhaustion
config.cacheStores = [];

// Watcher config
config.watcher = {
  ...config.watcher,
  additionalExts: [],
};

// Resolver settings
config.resolver = {
  ...config.resolver,
  maxWorkers: 2,
  resolverMainFields: ['react-native', 'browser', 'main'],
  sourceExts: [...new Set(['jsx', 'js', 'ts', 'tsx', 'json', 'css', 'module.css', ...config.resolver.sourceExts])],
  blockList: [
    /node_modules\/.*\/node_modules\/.*/,
    /.*\.git\/.*/,
    /.*\.cache\/.*/,
    /metro-cache\/.*/,
    /\.expo\/.*/,
    /metro-file-map-expo/,
  ],
};

// Transformer: keep it lean
config.transformer = {
  ...config.transformer,
  maxWorkers: 2,
  unstable_allowRequireContext: true,
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
    mangle: false,
  },
};

// CSS handling for web builds - resolve CSS modules
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform, moduleExists) => {
  // Handle CSS imports
  if (moduleName.endsWith('.css') || moduleName.endsWith('.module.css')) {
    // Return empty module for CSS files
    return {
      filePath: path.resolve(__dirname, 'patches/empty-css.js'),
      type: 'sourceFile'
    };
  }
  return originalResolveRequest 
    ? originalResolveRequest(context, moduleName, platform, moduleExists)
    : context.resolveRequest(context, moduleName, platform, moduleExists);
};

module.exports = config;