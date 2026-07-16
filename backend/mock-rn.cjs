// Mock react-native for backend environment
const Module = require('module');
const originalResolve = Module._resolveFilename;

Module._resolveFilename = function(request, parent, isMain, options) {
  if (request === 'react-native' || request === 'react-native-svg' || request === 'lucide-react-native') {
    const mockPath = require.resolve('./mock-rn-index.cjs');
    return mockPath;
  }
  return originalResolve.call(this, request, parent, isMain, options);
};
