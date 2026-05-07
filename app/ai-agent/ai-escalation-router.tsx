import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch, TextInput } from 'react-native';
import { ArrowUpCircle, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Search, Activity, Users, Phone, ArrowRight, Shield, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIEscalationRouterScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-escalation-router')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const escalationMetrics = { escalatedToday: 47, avgResponseTime: '4m 12s', resolutionRate: '91.4%', criticalEscalations: 8, pendingEscalations: 12, slaCompliance: '96.2%' };
  const recentEscalations = [
    { id: 'ESC-001', ticket: 'TK-4521', reason: 'Customer frustration detected', level: 'Critical', assignedTo: 'Senior Support', status: 'in-progress', time: '3m ago' },
    { id: 'ESC-002', ticket: 'TK-4518', reason: 'SLA breach risk', level: 'High', assignedTo: 'Team Lead', status: 'assigned', time: '8m ago' },
    { id: 'ESC-003', ticket: 'TK-4515', reason: 'Technical complexity', level: 'Medium', assignedTo: 'L2 Support', status: 'resolved', time: '22m ago' },
    { id: 'ESC-004', ticket: 'TK-4510', reason: 'VIP customer request', level: 'High', assignedTo: 'Account Manager', status: 'assigned', time: '35m ago' },
  ];
  const escalationRules = [
    { id: 1, name: 'Sentiment Threshold', condition: 'Sentiment < 30%', target: 'Senior Support', active: true, triggers: 156 },
    { id: 2, name: 'SLA Breach Warning', condition: 'Time > 80% of SLA', target: 'Team Lead', active: true, triggers: 89 },
    { id: 3, name: 'VIP Auto-Escalate', condition: 'Customer tier = Platinum', target: 'Account Manager', active: true, triggers: 42 },
    { id: 4, name: 'Repeat Issue', condition: '3+ tickets same issue', target: 'L2 Support', active: true, triggers: 67 },
    { id: 5, name: 'Revenue at Risk', condition: 'MRR > $5,000', target: 'VP Support', active: false, triggers: 12 },
  ];
  const escalationPaths = [
    { level: 'L1 → L2', count: 28, avgTime: '2m 14s', successRate: '84.2%' },
    { level: 'L2 → Senior', count: 12, avgTime: '4m 32s', successRate: '91.8%' },
    { level: 'Senior → Manager', count: 5, avgTime: '8m 15s', successRate: '96.4%' },
    { level: 'Manager → VP', count: 2, avgTime: '12m 40s', successRate: '98.2%' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><ArrowUpCircle size={20} color="#fff" /><Text style={styles.metricValue}>{escalationMetrics.escalatedToday}</Text><Text style={styles.metricLabel}>Escalated Today</Text></LinearGradient>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{escalationMetrics.avgResponseTime}</Text><Text style={styles.metricLabel}>Avg Response</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{escalationMetrics.resolutionRate}</Text><Text style={styles.metricLabel}>Resolution Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>{escalationMetrics.slaCompliance}</Text><Text style={styles.metricLabel}>SLA Compliance</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Escalations</Text></View></View>
        {recentEscalations.map((e) => (
          <TouchableOpacity key={e.id} style={styles.escalationRow}>
            <View style={styles.escInfo}><View style={[styles.escIcon, { backgroundColor: e.level === 'Critical' ? '#EF444415' : e.level === 'High' ? '#F59E0B15' : '#3B82F615' }]}><ArrowUpCircle size={16} color={e.level === 'Critical' ? '#EF4444' : e.level === 'High' ? '#F59E0B' : '#3B82F6'} /></View><View><Text style={[styles.escReason, { color: theme.colors.text }]}>{e.reason}</Text><Text style={[styles.escMeta, { color: theme.colors.secondaryText }]}>{e.ticket} → {e.assignedTo}</Text></View></View>
            <View style={styles.escRight}><View style={[styles.levelBadge, { backgroundColor: e.level === 'Critical' ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.levelText, { color: e.level === 'Critical' ? '#EF4444' : '#F59E0B' }]}>{e.level}</Text></View></View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Escalation Paths</Text></View></View>
        {escalationPaths.map((p) => (
          <View key={p.level} style={styles.pathRow}>
            <View style={styles.pathInfo}><Text style={[styles.pathLevel, { color: theme.colors.text }]}>{p.level}</Text><Text style={[styles.pathMeta, { color: theme.colors.secondaryText }]}>{p.count} escalations · {p.avgTime} avg</Text></View>
            <Text style={[styles.pathSuccess, { color: '#10B981' }]}>{p.successRate}</Text>
          </View>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Escalation Router requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderRulesTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>5</Text><Text style={styles.metricLabel}>Active Rules</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>366</Text><Text style={styles.metricLabel}>Total Triggers</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>96.2%</Text><Text style={styles.metricLabel}>SLA Compliance</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>4m 12s</Text><Text style={styles.metricLabel}>Avg Escalation</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Escalation Rules</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>New Rule</Text></TouchableOpacity>
        </View>
        {escalationRules.map((rule) => (
          <View key={rule.id} style={styles.ruleRow}>
            <View style={styles.ruleInfo}><View style={[styles.ruleIcon, { backgroundColor: theme.colors.primary + '15' }]}><Zap size={18} color={theme.colors.primary} /></View><View><Text style={[styles.ruleName, { color: theme.colors.text }]}>{rule.name}</Text><Text style={[styles.ruleMeta, { color: theme.colors.secondaryText }]}>{rule.condition} → {rule.target}</Text><Text style={[styles.ruleTriggers, { color: theme.colors.secondaryText }]}>{rule.triggers} triggers</Text></View></View>
            <Switch value={rule.active} onValueChange={() => {}} />
          </View>
        ))}
      </View>
    </ScrollView></View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>91.4%</Text><Text style={styles.metricLabel}>Resolution Rate</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>4m 12s</Text><Text style={styles.metricLabel}>Avg Resolution</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>-18%</Text><Text style={styles.metricLabel}>Escalation Rate</Text></LinearGradient>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>8</Text><Text style={styles.metricLabel}>Critical Today</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Escalation Rate Decreasing</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>18% fewer escalations this week. Improved L1 resolution is reducing upstream pressure.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><AlertCircle size={20} color="#F59E0B" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Bottleneck at L2</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>L2 → Senior path avg time increased 22%. Consider adding more L2 capacity during peak hours.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Router Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Escalation</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically escalate based on rules</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Sentiment-Based Escalation</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Escalate when negative sentiment detected</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>SLA Breach Prevention</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-escalate before SLA breach</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>VIP Priority Routing</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Route VIP customers to senior agents</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Round-Robin Assignment</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Distribute escalations evenly</Text></View><Switch value={false} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: ArrowUpCircle, component: renderOverviewTab() },
    { id: 'rules', label: 'Rules', icon: Zap, component: renderRulesTab() },
    { id: 'analytics', label: 'Analytics', icon: ChartBarBig, component: renderAnalyticsTab() },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab() },
  ];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  escalationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  escInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  escIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  escReason: { fontSize: 14, fontWeight: '600' },
  escMeta: { fontSize: 12, marginTop: 2 },
  escRight: { alignItems: 'flex-end' },
  levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  levelText: { fontSize: 11, fontWeight: '700' },
  pathRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  pathInfo: { flex: 1 },
  pathLevel: { fontSize: 15, fontWeight: '600' },
  pathMeta: { fontSize: 12, marginTop: 2 },
  pathSuccess: { fontSize: 14, fontWeight: '700' },
  ruleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  ruleInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  ruleIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  ruleName: { fontSize: 15, fontWeight: '600' },
  ruleMeta: { fontSize: 12, marginTop: 2 },
  ruleTriggers: { fontSize: 11, marginTop: 1 },
  createBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  createBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  insightCard: { flexDirection: 'row', padding: 16, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 16, marginBottom: 12 },
  insightIcon: { marginRight: 12, marginTop: 2 }, insightContent: { flex: 1 },
  insightTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  insightDesc: { fontSize: 13, lineHeight: 20 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  settingInfo: { flex: 1, marginRight: 16 },
  settingLabel: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  settingDesc: { fontSize: 13 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
