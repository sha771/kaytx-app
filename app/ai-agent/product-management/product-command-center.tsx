import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import ProductCommandCenter from '@/components/ai-agent/dashboard/product-management/ProductCommandCenter';

export default function ProductCommandCenterPage() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ProductCommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
