import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield } from 'lucide-react-native';

export default function FraudPaymentSecurity() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
      <View style={styles.header}>
        <Shield size={24} color="#EF4444" />
        <Text style={[styles.title, { color: theme.colors.text }]}>Fraud & Payment Security</Text>
      </View>
      <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
        Real-time fraud detection and payment security monitoring across all transactions.
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
