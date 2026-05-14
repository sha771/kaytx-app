import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Brain, Network, Layers, ChevronRight } from 'lucide-react-native';

export default function MindMapScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <View style={[styles.iconWrap, { backgroundColor: 'rgba(99,102,241,0.12)' }]}>
            <Brain size={22} color="#6366F1" />
          </View>

          <Text style={[styles.title, { color: theme.colors.text }]}>Mind Map</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Visualize the AI workforce graph and explore connections across hierarchy and roles.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Links</Text>

          <TouchableOpacity
            style={[styles.rowBtn, { borderColor: theme.colors.border }]}
            onPress={() => router.push('/ai-agent/ai-workforce-architecture' as any)}
          >
            <View style={[styles.rowIcon, { backgroundColor: 'rgba(244,63,94,0.10)' }]}>
              <Layers size={18} color="#F43F5E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: theme.colors.text }]}>11-Layer AI Agent Architecture</Text>
              <Text style={[styles.rowSubtitle, { color: theme.colors.secondaryText }]}>Full workforce hierarchy visualization</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.rowBtn, { borderColor: theme.colors.border }]}
            onPress={() => router.push('/command-center' as any)}
          >
            <View style={[styles.rowIcon, { backgroundColor: 'rgba(0,199,190,0.10)' }]}>
              <Network size={18} color="#00C7BE" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowTitle, { color: theme.colors.text }]}>Command Center</Text>
              <Text style={[styles.rowSubtitle, { color: theme.colors.secondaryText }]}>AI command & orchestration</Text>
            </View>
            <ChevronRight size={18} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>

        <View style={[styles.note, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
          <Text style={[styles.noteTitle, { color: theme.colors.text }]}>Status</Text>
          <Text style={[styles.noteText, { color: theme.colors.secondaryText }]}>
            This page was added because the app had navigation to <Text style={{ fontWeight: '700' }}>/ai-agent/mind-map</Text>{' '}
            but the route file was missing.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 14, paddingBottom: 40 },
  hero: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: { fontSize: 22, fontWeight: '800' },
  subtitle: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
  section: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  sectionTitle: { fontSize: 14, fontWeight: '800', marginBottom: 12 },
  rowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTitle: { fontSize: 14, fontWeight: '800' },
  rowSubtitle: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  note: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  noteTitle: { fontSize: 14, fontWeight: '800', marginBottom: 6 },
  noteText: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
});
