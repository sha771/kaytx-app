import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Brain, Database, Network } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';

export default function MemoryContextScreen() {
  const { theme } = useTheme();
  // Using explicit ID
  const agent = aiEmployees.find(e => e.id === 'ai-memory-context')!;

  const renderKnowledgeTab = (
    <View style={styles.tabContent}>
      <View style={[styles.statRow, { marginBottom: 20 }]}>
        <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.statVal, { color: '#5856D6' }]}>1.2M</Text>
          <Text style={[styles.statLab, { color: theme.colors.secondaryText }]}>Entities</Text>
        </View>
        <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.statVal, { color: '#34C759' }]}>99.9%</Text>
          <Text style={[styles.statLab, { color: theme.colors.secondaryText }]}>Recall</Text>
        </View>
        <View style={[styles.stat, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.statVal, { color: theme.colors.primary }]}>4ms</Text>
          <Text style={[styles.statLab, { color: theme.colors.secondaryText }]}>Latency</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Live Knowledge Graph Updates</Text>
      {[
        { action: 'Entity Extraction', subject: 'Acme Corp', context: 'Sales Call #442', confidence: 0.98 },
        { action: 'Relationship Map', subject: 'John Doe -> CTO', context: 'LinkedIn Scraping', confidence: 0.95 },
        { action: 'Sentiment Update', subject: 'Project Alpha', context: 'Email Thread', confidence: 0.88 },
      ].map((item, i) => (
        <View key={i} style={[styles.logRow, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.logIcon}>
            <Network size={16} color="#5856D6" />
          </View>
          <View style={styles.logInfo}>
            <Text style={[styles.logAction, { color: theme.colors.text }]}>{item.action}</Text>
            <Text style={[styles.logContext, { color: theme.colors.secondaryText }]}>{item.subject} • {item.context}</Text>
          </View>
          <View style={[styles.confBadge, { backgroundColor: '#5856D615' }]}>
            <Text style={[styles.confText, { color: '#5856D6' }]}>{(item.confidence * 100).toFixed(0)}%</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const customTabs = [
    { id: 'knowledge', label: 'Knowledge Graph', icon: Brain, component: renderKnowledgeTab }
  ];

  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20 },
  statRow: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center' },
  statVal: { fontSize: 20, fontWeight: '900', marginBottom: 4 },
  statLab: { fontSize: 11, fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  logRow: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 12 },
  logIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#5856D610', alignItems: 'center', justifyContent: 'center' },
  logInfo: { flex: 1 },
  logAction: { fontSize: 14, fontWeight: '700' },
  logContext: { fontSize: 11 },
  confBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  confText: { fontSize: 10, fontWeight: '800' }
});
