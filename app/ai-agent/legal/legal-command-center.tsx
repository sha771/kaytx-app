import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import LegalComplianceCommandCenter from '@/components/ai-agent/dashboard/legal-compliance/LegalComplianceCommandCenter';

export default function LegalCommandCenter() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LegalComplianceCommandCenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});