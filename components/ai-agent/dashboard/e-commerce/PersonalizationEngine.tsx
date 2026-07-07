import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Sparkles } from 'lucide-react-native';

export default function PersonalizationEngine() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <Sparkles size={24} color="#8B5CF6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>Personalization Engine</Text>
      </View>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        AI-powered personalization engine delivering tailored customer experiences.
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
