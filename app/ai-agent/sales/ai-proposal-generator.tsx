import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { FileText, DollarSign, CheckCircle, Users, ArrowRight, Activity, Settings, Zap, Clock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AIProposalGeneratorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-proposal-generator')!;
  const [autoTemplate, setAutoTemplate] = useState(true);
  const [pricingEngine, setPricingEngine] = useState(true);
  const [reviewMode, setReviewMode] = useState(false);
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'sales-revenue' });
  const proposals = [
    { name: 'Enterprise SaaS Proposal', client: 'Acme Corp', value: '$240K', status: 'In Review', time: '2h ago' },
    { name: 'Platform License Proposal', client: 'TechGlobal', value: '$95K', status: 'Sent', time: '1d ago' },
    { name: 'Custom Integration Quote', client: 'DataFlow Inc', value: '$150K', status: 'Draft', time: '3h ago' },
    { name: 'Multi-year Agreement', client: 'NexGen AI', value: '$180K', status: 'Approved', time: '5h ago' },
  ];
  const subAgents = [
    { id: 'template-selector', name: 'AI Template Selector', desc: 'Select & customize best proposal templates', icon: FileText, route: '/ai-agent/sales/sub-agents/template-selector', color: '#8B5CF6' },
    { id: 'pricing-calculator', name: 'AI Pricing Calculator', desc: 'Calculate optimal pricing & margins', icon: DollarSign, route: '/ai-agent/sales/sub-agents/pricing-calculator', color: '#F59E0B' },
    { id: 'proposal-reviewer', name: 'AI Proposal Reviewer', desc: 'Review proposals for quality & accuracy', icon: CheckCircle, route: '/ai-agent/sales/sub-agents/proposal-reviewer', color: '#10B981' },
  ];
  const recentActivity = [
    { action: 'Proposal generated', client: 'Acme Corp', time: '5m ago', type: 'template' },
    { action: 'Pricing calculated', client: 'TechGlobal', time: '20m ago', type: 'pricing' },
    { action: 'Review completed', client: 'DataFlow Inc', time: '1h ago', type: 'review' },
    { action: 'Template customized', client: 'NexGen AI', time: '2h ago', type: 'template' },
  ];
  const renderProposalsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#8B5CF6', '#7c3aed']} style={styles.metricCard}><FileText size={20} color="#fff" /><Text style={styles.metricValue}>{statsData?.tasksToday || 47}</Text><Text style={styles.metricLabel}>Proposals Created</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#d97706']} style={styles.metricCard}><DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>$665K</Text><Text style={styles.metricLabel}>Total Value</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>82%</Text><Text style={styles.metricLabel}>Accept Rate</Text></LinearGradient>
        <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>2.4h</Text><Text style={styles.metricLabel}>Avg Turnaround</Text></LinearGradient>
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Proposals</Text>
      {proposals.map((p, i) => (<View key={i} style={[styles.proposalCard, { backgroundColor: theme.colors.cardBackground }]}><View style={styles.proposalHeader}><View style={styles.proposalInfo}><Text style={[styles.proposalName, { color: theme.colors.text }]}>{p.name}</Text><Text style={[styles.proposalClient, { color: theme.colors.secondaryText }]}>{p.client} - {p.time}</Text></View><View style={styles.proposalValueBox}><Text style={[styles.proposalValue, { color: theme.colors.text }]}>{p.value}</Text><View style={[styles.statusBadge, { backgroundColor: p.status === 'Approved' ? '#34C75915' : p.status === 'Sent' ? '#007AFF15' : '#FF950015' }]}><Text style={[styles.statusText, { color: p.status === 'Approved' ? '#34C759' : p.status === 'Sent' ? '#007AFF' : '#FF9500' }]}>{p.status}</Text></View></View></View></View>))}
    </ScrollView>
  );
  const renderSubAgentsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
      <Text style={[styles.sectionSub, { color: theme.colors.secondaryText }]}>3 specialized agents working under AI Proposal Generator</Text>
      {subAgents.map((sa) => (<TouchableOpacity key={sa.id} style={[styles.subAgentCard, { backgroundColor: theme.colors.cardBackground }]} onPress={() => router.push(sa.route as any)}><View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={24} color={sa.color} /></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentDesc, { color: theme.colors.secondaryText }]}>{sa.desc}</Text></View><ArrowRight size={18} color={theme.colors.secondaryText} /></TouchableOpacity>))}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground, marginTop: 20 }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy</Text>
        <View style={styles.hierarchyRow}><View style={[styles.hierarchyNode, { backgroundColor: '#8B5CF615' }]}><FileText size={16} color="#8B5CF6" /><Text style={[styles.hierarchyText, { color: '#8B5CF6' }]}>AI Proposal Generator</Text></View></View>
        <View style={styles.hierarchyConnector} />
        <View style={styles.hierarchyChildren}>{subAgents.map((sa) => (<View key={sa.id} style={[styles.hierarchyNode, { backgroundColor: sa.color + '10' }]}><sa.icon size={14} color={sa.color} /><Text style={[styles.hierarchyChildText, { color: sa.color }]}>{sa.name.replace('AI ', '')}</Text></View>))}</View>
      </View>
    </ScrollView>
  );
  const renderActivityTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsRow}>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><FileText size={16} color="#8B5CF6" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>47</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Generated</Text></View>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><DollarSign size={16} color="#F59E0B" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>38</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Priced</Text></View>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><CheckCircle size={16} color="#10B981" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>31</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Reviewed</Text></View>
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
      {recentActivity.map((item, i) => { const iconMap: Record<string, any> = { template: FileText, pricing: DollarSign, review: CheckCircle }; const colorMap: Record<string, string> = { template: '#8B5CF6', pricing: '#F59E0B', review: '#10B981' }; const Icon = iconMap[item.type] || Activity; const iconColor = colorMap[item.type] || '#007AFF'; return (<View key={i} style={[styles.activityItem, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.activityIcon, { backgroundColor: iconColor + '15' }]}><Icon size={16} color={iconColor} /></View><View style={styles.activityInfo}><Text style={[styles.activityAction, { color: theme.colors.text }]}>{item.action}</Text><Text style={[styles.activityLead, { color: theme.colors.secondaryText }]}>{item.client}</Text></View><Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>{item.time}</Text></View>); })}
    </ScrollView>
  );
  const renderSettingsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Configuration</Text>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Template Selection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>AI picks best template for each deal</Text></View><Switch value={autoTemplate} onValueChange={setAutoTemplate} trackColor={{ false: '#ccc', true: '#34C759' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Pricing Engine</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-calculate pricing & margins</Text></View><Switch value={pricingEngine} onValueChange={setPricingEngine} trackColor={{ false: '#ccc', true: '#007AFF' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Review Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-review before sending</Text></View><Switch value={reviewMode} onValueChange={setReviewMode} trackColor={{ false: '#ccc', true: '#FF9500' }} /></View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingLabel, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/ai-proposal-generator', '/ai-proposal-generator/execute', '/ai-proposal-generator/analyze', '/ai-proposal-generator/generate'].map((ep, i) => (<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.secondaryText }]}>{ep}</Text></View>))}
      </View>
    </ScrollView>
  );
  const customTabs = [
    { id: 'proposals', label: 'Proposals', icon: FileText, component: renderProposalsTab },
    { id: 'sub-agents', label: 'Sub-Agents', icon: Users, component: renderSubAgentsTab },
    { id: 'activity', label: 'Activity', icon: Activity, component: renderActivityTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab },
  ];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}
const styles = StyleSheet.create({
  tabContent: { padding: 20 }, metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 }, metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }, sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 }, sectionSub: { fontSize: 13, marginBottom: 16, opacity: 0.7 }, proposalCard: { padding: 18, borderRadius: 20, marginBottom: 12 }, proposalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, proposalInfo: { flex: 1 }, proposalName: { fontSize: 15, fontWeight: '700', marginBottom: 2 }, proposalClient: { fontSize: 12 }, proposalValueBox: { alignItems: 'flex-end' }, proposalValue: { fontSize: 16, fontWeight: '800', marginBottom: 4 }, statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }, statusText: { fontSize: 10, fontWeight: '700' }, subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 12 }, subAgentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }, subAgentInfo: { flex: 1 }, subAgentName: { fontSize: 15, fontWeight: '700' }, subAgentDesc: { fontSize: 12, marginTop: 2, opacity: 0.7 }, hierarchyRow: { alignItems: 'center' }, hierarchyNode: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 }, hierarchyText: { fontSize: 14, fontWeight: '700' }, hierarchyConnector: { width: 2, height: 20, backgroundColor: 'rgba(150,150,150,0.3)', alignSelf: 'center', marginVertical: 4 }, hierarchyChildren: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }, hierarchyChildText: { fontSize: 11, fontWeight: '600' }, section: { padding: 20, borderRadius: 24, marginBottom: 20 }, metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 }, miniMetric: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 16, gap: 4 }, miniMetricVal: { fontSize: 18, fontWeight: '800' }, miniMetricLabel: { fontSize: 10, opacity: 0.7 }, activityItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginBottom: 8, gap: 10 }, activityIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }, activityInfo: { flex: 1 }, activityAction: { fontSize: 14, fontWeight: '600' }, activityLead: { fontSize: 12, marginTop: 2, opacity: 0.7 }, activityTime: { fontSize: 11, fontWeight: '600' }, settingsCard: { padding: 20, borderRadius: 20, marginBottom: 16 }, settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }, settingInfo: { flex: 1, marginRight: 12 }, settingLabel: { fontSize: 15, fontWeight: '600' }, settingDesc: { fontSize: 12, marginTop: 2, opacity: 0.6 }, endpointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }, endpointText: { fontSize: 13, fontFamily: 'monospace' },
});
