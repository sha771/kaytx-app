import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function IndexScreen() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        console.log('[IndexScreen] Redirecting to /(tabs)/home');
        router.replace('/(tabs)/home');
      } catch (e) {
        console.error('[IndexScreen] Redirect failed', e);
        // Fallback redirect
        router.push('/(tabs)/home');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
      testID="index-loading"
    >
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});