import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain } from 'lucide-react-native';

export default function AIEcommerceInsights() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <Brain size={24} color="#06B6D4" />
        <Text style={[styles.title, { color: theme.colors.text }]}>AI Commerce Insights</Text>
      </View>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        AI-driven insights and analytics for e-commerce performance optimization.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
  },
});
