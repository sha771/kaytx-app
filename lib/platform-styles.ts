import { StyleSheet as RNStyleSheet, Platform } from 'react-native';

/**
 * Platform-aware StyleSheet creator
 * Web: Returns plain object for CSS-in-JS compatibility
 * Native: Returns optimized StyleSheet.create result
 */
export const getStyleSheet = (styles: Parameters<typeof RNStyleSheet.create>[0]) => {
  if (Platform.OS === 'web') {
    // Web: Return plain styles object (react-native-web compatible)
    return styles;
  }
  // Native: Use optimized StyleSheet.create
  return RNStyleSheet.create(styles);
};

