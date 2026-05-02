import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Phone, ArrowLeft, Headphones, Bot } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function PhoneAgentPage() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Phone size={28} color={theme.colors.primary} />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Phone / Call Agent
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Headphones size={40} color={theme.colors.primary} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Phone Agent Dashboard
          </Text>
          <Text style={[styles.cardDesc, { color: theme.colors.secondaryText }]}>
            Manage voice calls, receptionist duties, negotiation calls, and telephone support across all departments.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}>
          <Bot size={40} color={theme.colors.accent || theme.colors.primary} />
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            AI-Powered Calling
          </Text>
          <Text style={[styles.cardDesc, { color: theme.colors.secondaryText }]}>
            Automated cold calling, appointment setting, collections, support hotlines, and dispatch coordination.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    gap: 12,
  },
  backButton: { padding: 4 },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: { flex: 1 },
  contentInner: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  cardDesc: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
