import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function AiBillingSupportPage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    // Redirect to full enterprise page
    router.replace('/ai-agent/customer-experience/billing-support');
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={[styles.text, { color: colors.text }]}>Loading AI Billing Support...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  text: { fontSize: 16, fontWeight: '500' },
});
