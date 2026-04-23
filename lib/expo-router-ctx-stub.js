// Stub for expo-router _ctx.web.js to fix Windows path issues
// This file replaces the original expo-router _ctx.web.js via NormalModuleReplacementPlugin

// Use a relative path from this file (in /lib/) to the app folder (../app)
// This is required because webpack's require.context needs a path relative to the current file
export const ctx = require.context(
  '../app',
  true,
  /^(?:\.\/)(?!.*(?:\+api|\+middleware|\+html|\+native-intent)).*\.[tj]sx?$/,
);
