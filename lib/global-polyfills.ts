// Global polyfills for web compatibility
// This file must be imported FIRST before any other modules
// @ts-nocheck - Prevent TypeScript errors from blocking execution

// Immediately set up __reanimatedLoggerConfig before anything else
(function setupReanimatedPolyfill() {
  const config = {
    logger: {
      warning: function() {},
      error: function() {},
      info: function() {},
    },
    strict: false,
  };

  // Set on all possible global objects
  try {
    if (typeof global !== 'undefined') {
      (global as any).__reanimatedLoggerConfig = config;
    }
  } catch (e) {}

  try {
    if (typeof globalThis !== 'undefined') {
      (globalThis as any).__reanimatedLoggerConfig = config;
    }
  } catch (e) {}

  try {
    if (typeof window !== 'undefined') {
      (window as any).__reanimatedLoggerConfig = config;
    }
  } catch (e) {}

  try {
    if (typeof self !== 'undefined') {
      (self as any).__reanimatedLoggerConfig = config;
    }
  } catch (e) {}
})();

export {};
