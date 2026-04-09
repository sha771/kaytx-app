/**
 * React Native Web Polyfill
 * Ensures react-native APIs are available on web platform
 */

if (typeof window !== 'undefined') {
  // Import react-native-web for web platform
  try {
    const RNWeb = require('react-native-web');
    
    // Ensure react-native exports are available globally if needed
    if (typeof (global as any).ReactNative === 'undefined') {
      (global as any).ReactNative = RNWeb;
    }
  } catch (e) {
    console.warn('Failed to load react-native-web polyfill:', e);
  }
}

export {};
