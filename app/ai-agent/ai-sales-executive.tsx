import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { TrendingUp, Handshake, Users, Lock, ArrowRight, Activity, Briefcase, Shield, DollarSign, Settings, Zap, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function AISalesExecutiveScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find(e => e.id === 'ai-sales-executive')!;
  const [dealAutoStruct, setDealAutoStruct] = useState(true);
  const [stakeholderAlerts, setStakeholderAlerts] = useState(true);
  const [closingAssist, setClosingAssist] = useState(false);

  const { data: analytics } = trpc.aiAgents.getAgentAnalytics.useQuery({ timeRange: '7d' });
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const strategicDeals = [
    { name: 'Enterprise SaaS Deal', stage: 'Negotiation', value: '$240K', probability: 85 },
    { name: 'Multi-year Contract', stage: 'Validating', value: '$180K', probability: 72 },
    { name: 'Platform License', stage: 'Contract', value: '$95K', probability: 90 },
    { name: 'Custom Integration', stage: 'Proposal', value: '$150K', probability: 65 },
  ];

  const subAgents = [
    { id: 'deal-structurer', name: 'AI Deal Structurer', desc: 'Structure complex deal terms & pricing', icon: Handshake, route: '/ai-agent/sales/sub-agents/deal-structurer', color: '#007AFF' },
    { id: 'stakeholder-mapper', name: 'AI Stakeholder Mapper', desc: 'Map decision-makers & influencers', icon: Users, route: '/ai-agent/sales/sub-agents/stakeholder-mapper', color: '#FF9500' },
    { id: 'closing-strategist', name: 'AI Closing Strategist', desc: 'Optimize closing strategies & timing', icon: Target, route: '/ai-agent/sales/sub-agents/closing-strategist', color: '#34C759' },
  ];

  const recentActivity = [
    { action: 'Deal structure proposed', deal: 'Enterprise SaaS', time: '5m ago', type: 'deal' },
    { action: 'Stakeholder identified', deal: 'Multi-year Contract', time: '30m ago', type: 'stakeholder' },
    { action: 'Closing strategy updated', deal: 'Platform License', time: '1h ago', type: 'closing' },
    { action: 'Contract review completed', deal: 'Custom Integration', time: '2h ago', type: 'deal' },
  ];

  const renderForecastTab = (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.kpiCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Quarterly Forecast</Text>
          <View style={styles.kpiGrid}>
            <View style={styles.kpiItem}><Text style={styles.kpiLabel}>COMMITTED</Text><Text style={[styles.kpiValue, { color: theme.colors.primary }]}>$396k</Text></View>
            <View style={styles.kpiDivider} />
            <View style={styles.kpiItem}><Text style={styles.kpiLabel}>UPSIDE</Text><Text style={[styles.kpiValue, { color: '#34C759' }]}>$264k</Text></View>
            <View style={styles.kpiDivider} />
            <View style={styles.kpiItem}><Text style={styles.kpiLabel}>GAP TO Q</Text><Text style={[styles.kpiValue, { color: '#FF3B30' }]}>$33k</Text></View>
          </View>
        </View>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#007AFF', '#0056b3']} style={styles.metricCard}><DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>$665K</Text><Text style={styles.metricLabel}>Pipeline Value</Text></LinearGradient>
          <LinearGradient colors={['#34C759', '#28a745']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>78%</Text><Text style={styles.metricLabel}>Win Rate</Text></LinearGradient>
        </View>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Deals</Text>
        {strategicDeals.map((deal, i) => (
          <View key={i} style={[styles.dealCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.dealHeader}>
              <View style={styles.dealInfo}><Text style={[styles.dealName, { color: theme.colors.text }]}>{deal.name}</Text><Text style={[styles.dealStage, { color: theme.colors.secondaryText }]}>{deal.stage}</Text></View>
              <View style={styles.dealValueBox}><Text style={[styles.dealValue, { color: theme.colors.text }]}>{deal.value}</Text><View style={[styles.probBadge, { backgroundColor: deal.probability > 80 ? '#34C75920' : '#FF950020' }]}><Text style={[styles.probText, { color: deal.probability > 80 ? '#34C759' : '#FF9500' }]}>{deal.probability}%</Text></View></View>
            </View>
          </View>
        ))}
      </ScrollView>
      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Sales Executive is part of our Enterprise suite. Upgrade to activate.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderSubAgentsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
      <Text style={[styles.sectionSub, { color: theme.colors.secondaryText }]}>3 specialized agents working under AI Sales Executive</Text>
      {subAgents.map((sa) => (
        <TouchableOpacity key={sa.id} style={[styles.subAgentCard, { backgroundColor: theme.colors.cardBackground }]} onPress={() => router.push(sa.route as any)}>
          <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={24} color={sa.color} /></View>
          <View style={styles.subAgentInfo}><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentDesc, { color: theme.colors.secondaryText }]}>{sa.desc}</Text></View>
          <ArrowRight size={18} color={theme.colors.secondaryText} />
        </TouchableOpacity>
      ))}
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground, marginTop: 20 }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Hierarchy</Text>
        <View style={styles.hierarchyRow}><View style={[styles.hierarchyNode, { backgroundColor: '#007AFF15' }]}><Briefcase size={16} color="#007AFF" /><Text style={[styles.hierarchyText, { color: '#007AFF' }]}>AI Sales Executive</Text></View></View>
        <View style={styles.hierarchyConnector} />
        <View style={styles.hierarchyChildren}>
          {subAgents.map((sa) => (<View key={sa.id} style={[styles.hierarchyNode, { backgroundColor: sa.color + '10' }]}><sa.icon size={14} color={sa.color} /><Text style={[styles.hierarchyChildText, { color: sa.color }]}>{sa.name.replace('AI ', '')}</Text></View>))}
        </View>
      </View>
    </ScrollView>
  );

  const renderActivityTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsRow}>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><DollarSign size={16} color="#34C759" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>4</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Active Deals</Text></View>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><Users size={16} color="#007AFF" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>12</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Stakeholders</Text></View>
        <View style={[styles.miniMetric, { backgroundColor: theme.colors.cardBackground }]}><Target size={16} color="#FF9500" /><Text style={[styles.miniMetricVal, { color: theme.colors.text }]}>78%</Text><Text style={[styles.miniMetricLabel, { color: theme.colors.secondaryText }]}>Win Rate</Text></View>
      </View>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
      {recentActivity.map((item, i) => {
        const iconMap: Record<string, any> = { deal: Handshake, stakeholder: Users, closing: Target };
        const colorMap: Record<string, string> = { deal: '#007AFF', stakeholder: '#FF9500', closing: '#34C759' };
        const Icon = iconMap[item.type] || Activity;
        const iconColor = colorMap[item.type] || '#007AFF';
        return (<View key={i} style={[styles.activityItem, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.activityIcon, { backgroundColor: iconColor + '15' }]}><Icon size={16} color={iconColor} /></View><View style={styles.activityInfo}><Text style={[styles.activityAction, { color: theme.colors.text }]}>{item.action}</Text><Text style={[styles.activityLead, { color: theme.colors.secondaryText }]}>{item.deal}</Text></View><Text style={[styles.activityTime, { color: theme.colors.secondaryText }]}>{item.time}</Text></View>);
      })}
    </ScrollView>
  );

  const renderSettingsTab = (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Configuration</Text>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto Deal Structuring</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically propose deal structures</Text></View><Switch value={dealAutoStruct} onValueChange={setDealAutoStruct} trackColor={{ false: '#ccc', true: '#34C759' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Stakeholder Alerts</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Real-time stakeholder activity alerts</Text></View><Switch value={stakeholderAlerts} onValueChange={setStakeholderAlerts} trackColor={{ false: '#ccc', true: '#007AFF' }} /></View>
        <View style={styles.settingRow}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Closing Assistance</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>AI-guided closing playbooks</Text></View><Switch value={closingAssist} onValueChange={setClosingAssist} trackColor={{ false: '#ccc', true: '#FF9500' }} /></View>
      </View>
      <View style={[styles.settingsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.settingLabel, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {['/consult/ai-sales-executive', '/ai-sales-executive/execute', '/ai-sales-executive/analyze', '/ai-sales-executive/forecast'].map((ep, i) => (<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.secondaryText }]}>{ep}</Text></View>))}
      </View>
    </ScrollView>
  );

  const customTabs = [
    { id: 'forecast', label: 'Forecast', icon: TrendingUp, component: renderForecastTab },
    { id: 'sub-agents', label: 'Sub-Agents', icon: Users, component: renderSubAgentsTab },
    { id: 'activity', label: 'Activity', icon: Activity, component: renderActivityTab },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab },
  ];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  tabContent: { paddingBottom: 20, paddingHorizontal: 20 },
  kpiCard: { padding: 24, borderRadius: 24, marginBottom: 25 },
  cardTitle: { fontSize: 16, fontWeight: '800', marginBottom: 20 },
  kpiGrid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kpiItem: { alignItems: 'center', flex: 1 },
  kpiLabel: { fontSize: 10, fontWeight: '700', opacity: 0.6, marginBottom: 4 },
  kpiValue: { fontSize: 22, fontWeight: '900' },
  kpiDivider: { width: 1, height: 30, backgroundColor: 'rgba(150,150,150,0.2)' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 15 },
  sectionSub: { fontSize: 13, marginBottom: 16, opacity: 0.7 },
  dealCard: { padding: 18, borderRadius: 20, marginBottom: 12 },
  dealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dealInfo: { flex: 1 },
  dealName: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  dealStage: { fontSize: 11, fontWeight: '600' },
  dealValueBox: { alignItems: 'flex-end' },
  dealValue: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
  probBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5 },
  probText: { fontSize: 10, fontWeight: '800' },
  container: { flex: 1 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '700' },
  subAgentDesc: { fontSize: 12, marginTop: 2, opacity: 0.7 },
  hierarchyRow: { alignItems: 'center' },
  hierarchyNode: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 },
  hierarchyText: { fontSize: 14, fontWeight: '700' },
  hierarchyConnector: { width: 2, height: 20, backgroundColor: 'rgba(150,150,150,0.3)', alignSelf: 'center', marginVertical: 4 },
  hierarchyChildren: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  hierarchyChildText: { fontSize: 11, fontWeight: '600' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  miniMetric: { flex: 1, alignItems: 'center', padding: 14, borderRadius: 16, gap: 4 },
  miniMetricVal: { fontSize: 18, fontWeight: '800' },
  miniMetricLabel: { fontSize: 10, opacity: 0.7 },
  activityItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginBottom: 8, gap: 10 },
  activityIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  activityInfo: { flex: 1 },
  activityAction: { fontSize: 14, fontWeight: '600' },
  activityLead: { fontSize: 12, marginTop: 2, opacity: 0.7 },
  activityTime: { fontSize: 11, fontWeight: '600' },
  settingsCard: { padding: 20, borderRadius: 20, marginBottom: 16 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  settingInfo: { flex: 1, marginRight: 12 },
  settingLabel: { fontSize: 15, fontWeight: '600' },
  settingDesc: { fontSize: 12, marginTop: 2, opacity: 0.6 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
