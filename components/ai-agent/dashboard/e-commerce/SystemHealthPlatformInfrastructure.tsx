import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server } from 'lucide-react-native';

export default function SystemHealthPlatformInfrastructure() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <Server size={24} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>System Health & Infrastructure</Text>
      </View>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        Platform health monitoring and infrastructure status overview.
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
