$base = 'c:\Users\shaida\Desktop\kaytx-full-app\app\ai-agent'
Set-Content -Path "$base\ai-negotiator.tsx" -Encoding UTF8 -Value @'
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { Handshake, Shield, Lock, ArrowRight, Activity, Search, GitBranch, Calculator, Users, Settings, Zap, TrendingUp } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { EnterpriseAgentShell } from '@/components/ai-agent/EnterpriseAgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AINegotiatorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-negotiator')!;
  const [termAnalysis, setTermAnalysis] = useState(true);
  const [concessionTracking, setConcessionTracking] = useState(true);
  const [batnaMode, setBatnaMode] = useState(false);
  const { data: negotiationStats } = trpc.aiAgents.getAgentAnalytics.useQuery({ agentId: agent.id, timeRange: '7d' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ category: 'sales-revenue', limit: 10 });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);
  const securedValue = useMemo(() => { const r = (negotiationStats as any)?.revenueImpact; return typeof r === 'string' && r.length > 0 ? r : '$485,000'; }, [negotiationStats]);
  const activeNegotiations = useMemo(() => {
    if (activityData?.activities?.length > 0) return activityData.activities.map((a: any) => ({ client: a.details?.customerName || 'Client', stage: a.status === 'processing' ? 'Negotiating' : 'Redlining', leverage: (a.details?.confidence || 80) > 90 ? 'High' : 'Medium', sentiment: a.status === 'success' ? 'Positive' : 'Neutral' }));
    return [{ client: 'MegaCorp', stage: 'Redlining', leverage: 'High', sentiment: 'Positive' }, { client: 'FastScale', stage: 'Pricing', leverage: 'Medium', sentiment: 'Neutral' }, { client: 'TechVenture', stage: 'Terms Review', leverage: 'High', sentiment: 'Positive' }, { client: 'GlobalNet', stage: 'Concession', leverage: 'Low', sentiment: 'Cautious' }];
  }, [activityData]);
  const subAgents = [
    { id: 'term-analyzer', name: 'AI Term Analyzer', desc: 'Analyze contract terms for risks & opportunities', icon: Search, route: '/ai-agent/sales/sub-agents/term-analyzer', color: '#6366F1' },
    { id: 'concession-tracker', name: 'AI Concession Tracker', desc: 'Track concessions made & received', icon: GitBranch, route: '/ai-agent/sales/sub-agents/concession-tracker', color: '#EC4899' },
    { id: 'batna-calculator', name: 'AI BATNA Calculator', desc: 'Calculate Best Alternative for leverage', icon: Calculator, route: '/ai-agent/sales/sub-agents/batna-calculator', color: '#14B8A6' },
  ];
  const renderDealsTab = (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.cardBackground }]}><View style={styles.heroHeader}><Text style={[styles.heroTitle, { color: theme.colors.text }]}>Value Secured</Text><Shield size={20} color="#34C759" /></View><Text style={[styles.heroVal, { color: '#34C759' }]}>{securedValue}</Text><Text style={[styles.heroSub, { color: theme.colors.secondaryText }]}>In optimized contract terms this quarter</Text></View>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#6366F1', '#4f46e5']} style={styles.metricCard}><Handshake size={20} color="#fff" /><Text style={styles.metricValue}>4</Text><Text style={styles.metricLabel}>Active Deals</Text></LinearGradient>
          <LinearGradient colors={['#14B8A6', '#0d9488']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>92%</Text><Text style={styles.metricLabel}>Success Rate</Text></LinearGradient>
        </View>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Negotiations</Text>
        {activeNegotiations.map((deal, i) => (<View key={i} style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}><View style={styles.cardTop}><Text style={[styles.client, { color: theme.colors.text }]}>{deal.client}</Text><View style={[styles.badge, { backgroundColor: deal.sentiment === 'Positive' ? '#34C75915' : '#FF950015' }]}><Text style={[styles.badgeText, { color: deal.sentiment === 'Positive' ? '#34C759' : '#FF9500' }]}>{deal.sentiment}</Text></View></View><View style={[styles.divider, { backgroundColor: 'rgba(150,150,150,0.1)' }]} /><View style={styles.cardBottom}><Text style={[styles.meta, { color: theme.colors.secondaryText }]}>Stage: {deal.stage}</Text><Text style={[styles.meta, { color: theme.colors.secondaryText }]}>Leverage: {deal.leverage}</Text></View></View>))}
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Negotiator is part of our Enterprise suite. Upgrade your plan to activate this agent.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );
  const renderSubAgentsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
      <Text style={[styles.sectionSub, { color: theme.colors.secondaryText }]}>3 specialized agents working under AI Negotiator</Text>
      {subAgents.map((sa) => (<TouchableOpacity key={sa.id} style={[styles.subAgentCard, { backgroundColor: theme.colors.cardBackground }]} onPress={() => router.push(sa.route as any)}><View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={24} color={sa.color} /></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentDesc, { color: theme.colors.secondaryText }]}>{sa.desc}</Text></View><ArrowRight size={18} color={theme.colors.secondaryText} /></TouchableOpacity>))}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground, marginTop: 20 }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy</Text>
        <View style={styles.hierarchyRow}><View style={[styles.hierarchyNode, { backgroundColor: '#6366F115' }]}><Handshake size={16} color="#6366F1" /><Text style={[styles.hierarchyText, { color: '#6366F1' }]}>AI Negotiator</Text></View></View>
        <View style={styles.hierarchyConnector} />
        <View style={styles.hierarchyChildren}>{subAgents.map((sa) => (<View key={sa.id} style={[styles.hierarchyNode, { backgroundColor: sa.color + '10' }]}><sa.icon size={14} color={sa.color} /><Text style={[styles.hierarchyChildText, { color: sa.color }]}>{sa.name.replace('AI ', '')}</Text></View>))}</View>
      </View>
    </ScrollView>
  );
  const renderSettingsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Configuration</Text>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Term Analysis</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-analyze contract terms & clauses</Text></View><Switch value={termAnalysis} onValueChange={setTermAnalysis} trackColor={{ false: '#ccc', true: '#34C759' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Concession Tracking</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Track all concessions in real-time</Text></View><Switch value={concessionTracking} onValueChange={setConcessionTracking} trackColor={{ false: '#ccc', true: '#007AFF' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>BATNA Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Calculate best alternative positions</Text></View><Switch value={batnaMode} onValueChange={setBatnaMode} trackColor={{ false: '#ccc', true: '#FF9500' }} /></View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingLabel, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/ai-negotiator', '/ai-negotiator/execute', '/ai-negotiator/analyze', '/ai-negotiator/negotiate'].map((ep, i) => (<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.secondaryText }]}>{ep}</Text></View>))}
      </View>
    </ScrollView>
  );
  const customTabs = [
    { id: 'deals', label: 'Negotiations', icon: Handshake, component: renderDealsTab },
    { id: 'sub-agents', label: 'Sub-Agents', icon: Users, component: renderSubAgentsTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab },
  ];
  return <EnterpriseAgentShell agent={agent} customTabs={customTabs} />;
}
const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20, paddingHorizontal: 20 }, hero: { padding: 24, borderRadius: 24, marginBottom: 25 }, heroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }, heroTitle: { fontSize: 16, fontWeight: '800' }, heroVal: { fontSize: 32, fontWeight: '900', marginBottom: 4 }, heroSub: { fontSize: 12 }, metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 }, metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }, sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 }, sectionSub: { fontSize: 13, marginBottom: 16, opacity: 0.7 }, card: { padding: 18, borderRadius: 18, marginBottom: 12 }, cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, client: { fontSize: 16, fontWeight: '700' }, badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }, badgeText: { fontSize: 10, fontWeight: '800' }, divider: { height: 1, marginVertical: 12 }, cardBottom: { flexDirection: 'row', justifyContent: 'space-between' }, meta: { fontSize: 12, fontWeight: '600' }, container: { flex: 1 }, subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 12 }, subAgentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' }, subAgentInfo: { flex: 1 }, subAgentName: { fontSize: 15, fontWeight: '700' }, subAgentDesc: { fontSize: 12, marginTop: 2, opacity: 0.7 }, hierarchyRow: { alignItems: 'center' }, hierarchyNode: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 }, hierarchyText: { fontSize: 14, fontWeight: '700' }, hierarchyConnector: { width: 2, height: 20, backgroundColor: 'rgba(150,150,150,0.3)', alignSelf: 'center', marginVertical: 4 }, hierarchyChildren: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }, hierarchyChildText: { fontSize: 11, fontWeight: '600' }, section: { padding: 20, borderRadius: 24, marginBottom: 20 }, settingsCard: { padding: 20, borderRadius: 20, marginBottom: 16 }, settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 }, settingInfo: { flex: 1, marginRight: 12 }, settingLabel: { fontSize: 15, fontWeight: '600' }, settingDesc: { fontSize: 12, marginTop: 2, opacity: 0.6 }, endpointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 }, endpointText: { fontSize: 13, fontFamily: 'monospace' }, lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' }, lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 }, upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
'@
Write-Host "Done: ai-negotiator.tsx"
