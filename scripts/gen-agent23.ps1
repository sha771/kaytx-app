$base = 'c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent'
Set-Content -Path "$base\ai-crm-assistant.tsx" -Encoding UTF8 -Value @'
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Database, Activity, Users, ArrowRight, Settings, Zap, RefreshCw, ClipboardList, UserCheck, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';

export default function AICRMAssistantScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-crm-assistant') ?? aiEmployees[0];
  const [autoSync, setAutoSync] = useState(true);
  const [dedupMode, setDedupMode] = useState(true);
  const [pipelineView, setPipelineView] = useState(false);
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'sales-revenue' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'operations-management', limit: 20 });
  const recordAccuracy = useMemo(() => statsData?.avgSuccessRate ? (statsData.avgSuccessRate + 5).toFixed(1) : '99.4', [statsData]);
  const recentUpdates = useMemo(() => {
    if (activityData?.activities?.length > 0) return activityData.activities.slice(0, 5).map((a: any) => ({ action: a.action || 'Record Update', record: a.details?.customerName || 'System Record', time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
    return [{ action: 'Contact Updated', record: 'Acme Corp - John Doe', time: '5m ago' }, { action: 'Activity Logged', record: 'Call with Sarah Connor', time: '12m ago' }, { action: 'Pipeline Moved', record: 'TechGlobal -> Negotiation', time: '30m ago' }, { action: 'Duplicate Merged', record: 'NexGen AI records', time: '1h ago' }, { action: 'Data Enrichment', record: 'DataFlow Inc profile', time: '2h ago' }];
  }, [activityData]);
  const subAgents = [
    { id: 'contact-updater', name: 'AI Contact Updater', desc: 'Auto-update contact records & details', icon: UserCheck, route: '/ai-agent/sales/sub-agents/contact-updater', color: '#007AFF' },
    { id: 'activity-logger', name: 'AI Activity Logger', desc: 'Log all interactions automatically', icon: ClipboardList, route: '/ai-agent/sales/sub-agents/activity-logger', color: '#FF9500' },
    { id: 'pipeline-organizer', name: 'AI Pipeline Organizer', desc: 'Organize & optimize pipeline stages', icon: TrendingUp, route: '/ai-agent/sales/sub-agents/pipeline-organizer', color: '#34C759' },
  ];
  const renderDataTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.mainCard, { backgroundColor: theme.colors.cardBackground }]}><Text style={[styles.cardTitle, { color: theme.colors.text }]}>Database Hygiene</Text><View style={styles.hygieneRow}><Text style={[styles.score, { color: '#34C759' }]}>{recordAccuracy}%</Text><Text style={[styles.desc, { color: theme.colors.secondaryText }]}>Record Accuracy</Text></View></View>
      <View style={styles.metricsRow}>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><Database size={16} color="#007AFF" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>24.5K</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Total Records</Text></View>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><RefreshCw size={16} color="#34C759" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>1.2K</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Synced Today</Text></View>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><UserCheck size={16} color="#FF9500" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>89</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Enriched</Text></View>
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Updates</Text>
      {recentUpdates.map((log, i) => (<View key={i} style={[styles.logItem, { backgroundColor: theme.colors.cardBackground }]}><Activity size={16} color={theme.colors.primary} /><View style={styles.logContent}><Text style={[styles.logAction, { color: theme.colors.text }]}>{log.action}</Text><Text style={[styles.logRecord, { color: theme.colors.secondaryText }]}>{log.record}</Text></View><Text style={[styles.logTime, { color: theme.colors.secondaryText }]}>{log.time}</Text></View>))}
    </ScrollView>
  );
  const renderSubAgentsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
      <Text style={[styles.sectionSub, { color: theme.colors.secondaryText }]}>3 specialized agents working under AI CRM Assistant</Text>
      {subAgents.map((sa) => (<TouchableOpacity key={sa.id} style={[styles.subAgentCard, { backgroundColor: theme.colors.cardBackground }]} onPress={() => router.push(sa.route as any)}><View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={24} color={sa.color} /></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentDesc, { color: theme.colors.secondaryText }]}>{sa.desc}</Text></View><ArrowRight size={18} color={theme.colors.secondaryText} /></TouchableOpacity>))}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground, marginTop: 20 }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy</Text>
        <View style={styles.hierarchyRow}><View style={[styles.hierarchyNode, { backgroundColor: '#007AFF15' }]}><Database size={16} color="#007AFF" /><Text style={[styles.hierarchyText, { color: '#007AFF' }]}>AI CRM Assistant</Text></View></View>
        <View style={styles.hierarchyConnector} />
        <View style={styles.hierarchyChildren}>{subAgents.map((sa) => (<View key={sa.id} style={[styles.hierarchyNode, { backgroundColor: sa.color + '10' }]}><sa.icon size={14} color={sa.color} /><Text style={[styles.hierarchyChildText, { color: sa.color }]}>{sa.name.replace('AI ', '')}</Text></View>))}</View>
      </View>
    </ScrollView>
  );
  const renderSettingsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Configuration</Text>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto CRM Sync</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically sync contact data</Text></View><Switch value={autoSync} onValueChange={setAutoSync} trackColor={{ false: '#ccc', true: '#34C759' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Dedup Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-merge duplicate records</Text></View><Switch value={dedupMode} onValueChange={setDedupMode} trackColor={{ false: '#ccc', true: '#007AFF' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Pipeline View</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Visual pipeline organization</Text></View><Switch value={pipelineView} onValueChange={setPipelineView} trackColor={{ false: '#ccc', true: '#FF9500' }} /></View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingLabel, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/ai-crm-assistant', '/ai-crm-assistant/execute', '/ai-crm-assistant/analyze', '/ai-crm-assistant/sync'].map((ep, i) => (<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.secondaryText }]}>{ep}</Text></View>))}
      </View>
    </ScrollView>
  );
  const customTabs = [
    { id: 'data', label: 'CRM Data', icon: Database, component: renderDataTab },
    { id: 'sub-agents', label: 'Sub-Agents', icon: Users, component: renderSubAgentsTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab },
  ];
  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}
const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20, paddingHorizontal: 20 }, mainCard: { padding: 24, borderRadius: 24, marginBottom: 25, alignItems: 'center' }, cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 10 }, hygieneRow: { alignItems: 'center' }, score: { fontSize: 42, fontWeight: '900', marginBottom: 4 }, desc: { fontSize: 14, fontWeight: '600' }, sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 }, sectionSub: { fontSize: 13, marginBottom: 16, opacity: 0.7 }, metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 }, miniMetric: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 16, gap: 4 }, miniMetricVal: { fontSize: 18, fontWeight: '800' }, miniMetricLabel: { fontSize: 10, opacity: 0.7 }, logItem: { flexDirection: 'row', gap: 12, padding: 16, borderRadius: 16, marginBottom: 10, alignItems: 'center' }, logContent: { flex: 1 }, logAction: { fontSize: 14, fontWeight: '700', marginBottom: 2 }, logRecord: { fontSize: 12 }, logTime: { fontSize: 11, fontWeight: '700' }, subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 12 }, subAgentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }, subAgentInfo: { flex: 1 }, subAgentName: { fontSize: 15, fontWeight: '700' }, subAgentDesc: { fontSize: 12, marginTop: 2, opacity: 0.7 }, hierarchyRow: { alignItems: 'center' }, hierarchyNode: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 }, hierarchyText: { fontSize: 14, fontWeight: '700' }, hierarchyConnector: { width: 2, height: 20, backgroundColor: 'rgba(150,150,150,0.3)', alignSelf: 'center', marginVertical: 4 }, hierarchyChildren: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }, hierarchyChildText: { fontSize: 11, fontWeight: '600' }, section: { padding: 20, borderRadius: 24, marginBottom: 20 }, settingsCard: { padding: 20, borderRadius: 20, marginBottom: 16 }, settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }, settingInfo: { flex: 1, marginRight: 12 }, settingLabel: { fontSize: 15, fontWeight: '600' }, settingDesc: { fontSize: 12, marginTop: 2, opacity: 0.6 }, endpointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }, endpointText: { fontSize: 13, fontFamily: 'monospace' },
});
'@
Write-Host "Done: ai-crm-assistant.tsx"
