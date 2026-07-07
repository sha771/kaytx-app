import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, FileText, CheckCircle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function PostMergerIntegrator() {
  const { theme } = useTheme();
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View style={[styles.iconContainer, { backgroundColor: '#6366F115' }]}>
          <Bot size={32} color="#6366F1" />
        </View>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>Post Merger Integrator</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Sub-Agent</Text>
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>Integrates post-merger operations.</Text>
      </View>
      <AgentFeatures agentId="post-merger-integrator" agentName="Post Merger Integrator" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1 },
  iconContainer: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  title: { fontSize: 20, fontWeight: 'bold' },
  subtitle: { fontSize: 14, marginTop: 2 },
  section: { margin: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 22 }
});
