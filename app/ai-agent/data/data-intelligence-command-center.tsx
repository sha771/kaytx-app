import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import DataIntelligenceCommandCenter from '@/components/ai-agent/dashboard/data-intelligence/DataIntelligenceCommandCenter';

export default function DataIntelligenceCommandCenterPage() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <DataIntelligenceCommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});