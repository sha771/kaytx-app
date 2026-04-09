// Stub for expo-router _ctx.web.js to fix Windows path issues
// This file replaces the original expo-router _ctx.web.js via NormalModuleReplacementPlugin

/* global __EXPO_ROUTER_APP_ROOT__ */

// Use a relative path from the app root. 
// Webpack's require.context is relative to the file it's in.
// If this file is in /lib/expo-router-ctx-stub.js, then '../app' is correct.
export const ctx = require.context(
  __EXPO_ROUTER_APP_ROOT__,
  true,
  /^(?:\.\/)(?!(?:(?:(?:.*\+api)|(?:\+middleware)|(?:\+(html|native-intent))))\.[tj]sx?$).*.(?:\.android|\.ios|\.native)?\.[tj]sx?$/,
);
