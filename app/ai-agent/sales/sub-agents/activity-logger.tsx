import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Activity, TrendingUp, Target, Zap, ArrowRight, Briefcase, Settings, ClipboardList } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AIActivityLoggerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF950020' }]}>
          <ClipboardList size={56} color="#FF9500" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI ActivityLogger</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI CRM Assistant</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Activity size={22} color="#34C759" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>Active</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Status</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Briefcase size={22} color="#FF9500" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>Specialist</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Level</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Target size={22} color="#FF9500" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>20x</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <TrendingUp size={22} color="#007AFF" />
          <Text style={[styles.statValue, { color: theme.colors.text }]}>activity</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Parent</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Log all customer interactions and activities automatically. Sub-agent supporting AI CRM Assistant. Part of the Kaytx AI Workforce hierarchy providing automated enterprise capabilities.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>AI-Powered</Text></View>
          <View style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>Real-time</Text></View>
          <View style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>Analytics</Text></View>
          <View style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>Automation</Text></View>
          <View style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>Enterprise</Text></View>
          <View style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>Integration</Text></View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
        <View style={styles.configRow}>
          <Text style={[styles.configLabel, { color: theme.colors.text }]}>Active</Text>
          <Switch value={active} onValueChange={setActive} trackColor={{ false: '#ccc', true: '#34C759' }} />
        </View>
        <View style={styles.configRow}>
          <Text style={[styles.configLabel, { color: theme.colors.text }]}>Auto Mode</Text>
          <Switch value={autoMode} onValueChange={setAutoMode} trackColor={{ false: '#ccc', true: '#FF9500' }} />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        <View style={styles.endpointRow}>
          <Zap size={14} color="#8B5CF6" />
          <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>/consult/activity-logger</Text>
        </View>
        <View style={styles.endpointRow}>
          <Zap size={14} color="#8B5CF6" />
          <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>/activity-logger/execute</Text>
        </View>
        <View style={styles.endpointRow}>
          <Zap size={14} color="#8B5CF6" />
          <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>/activity-logger/analyze</Text>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/ai-crm-assistant')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <TrendingUp size={24} color="#FF9500" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI CRM Assistant</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="activity-logger" agentName="AI ActivityLogger" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  configRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  configLabel: { fontSize: 15, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
