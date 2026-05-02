// Global polyfills for web compatibility
// This file must be imported FIRST before any other modules
// @ts-nocheck - Prevent TypeScript errors from blocking execution

// Set up StyleSheet polyfill for web to prevent "StyleSheet.create is not a function"
(function setupStyleSheetPolyfill() {
  if (typeof window !== 'undefined') {
    (window as any).__STYLE_SHEET_POLYFILL = {
      create: function<T extends Record<string, any>>(styles: T): T { return styles; },
      flatten: function(style: any) { return style; },
      compose: function(style1: any, style2: any) { return [style1, style2]; },
      absoluteFill: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
      absoluteFillObject: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
      hairlineWidth: 1,
    };
  }
})();

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
