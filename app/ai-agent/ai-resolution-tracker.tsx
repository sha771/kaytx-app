import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { ClipboardCheck, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Activity, ClipboardList, Target, Calendar, Flag, RotateCcw, CheckSquare } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIResolutionTrackerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-resolution-tracker')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const activeResolutions = [
    { id: 'RES-001', ticket: 'TK-4521', title: 'Server connectivity issue', status: 'in-progress', assignee: 'Mike Chen', dueDate: '2 hours', progress: 65 },
    { id: 'RES-002', ticket: 'TK-4518', title: 'Refund processing delay', status: 'pending-verification', assignee: 'Sarah Jones', dueDate: '4 hours', progress: 85 },
    { id: 'RES-003', ticket: 'TK-4515', title: 'Feature configuration help', status: 'awaiting-customer', assignee: 'David Lee', dueDate: '6 hours', progress: 45 },
    { id: 'RES-004', ticket: 'TK-4512', title: 'Account access restoration', status: 'in-progress', assignee: 'Lisa Park', dueDate: '1 hour', progress: 90 },
  ];
  const completedToday = [
    { id: 'RES-890', ticket: 'TK-4501', title: 'Password reset', resolutionTime: '12m', satisfaction: 5 },
    { id: 'RES-889', ticket: 'TK-4498', title: 'Billing inquiry', resolutionTime: '24m', satisfaction: 5 },
    { id: 'RES-888', ticket: 'TK-4495', title: 'Feature demo request', resolutionTime: '45m', satisfaction: 4 },
    { id: 'RES-887', ticket: 'TK-4492', title: 'Integration setup', resolutionTime: '1h 12m', satisfaction: 5 },
  ];
  const resolutionMetrics = { today: 127, avgTime: '42m', satisfaction: '4.7/5', slaCompliance: '94.8%', firstContact: '68.4%', reopenRate: '2.1%' };

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{resolutionMetrics.today}</Text><Text style={styles.metricLabel}>Resolved Today</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{resolutionMetrics.avgTime}</Text><Text style={styles.metricLabel}>Avg Resolution</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{resolutionMetrics.firstContact}</Text><Text style={styles.metricLabel}>First Contact</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><RotateCcw size={20} color="#fff" /><Text style={styles.metricValue}>{resolutionMetrics.reopenRate}</Text><Text style={styles.metricLabel}>Reopen Rate</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Resolutions</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>New</Text></TouchableOpacity>
        </View>
        {activeResolutions.map((r) => (
          <TouchableOpacity key={r.id} style={styles.resolutionRow}>
            <View style={styles.resInfo}><View style={[styles.resIcon, { backgroundColor: r.status === 'in-progress' ? '#3B82F615' : '#F59E0B15' }]}><ClipboardCheck size={16} color={r.status === 'in-progress' ? '#3B82F6' : '#F59E0B'} /></View><View><Text style={[styles.resTitle, { color: theme.colors.text }]}>{r.title}</Text><Text style={[styles.resMeta, { color: theme.colors.secondaryText }]}>{r.ticket} · {r.assignee} · Due: {r.dueDate}</Text></View></View>
            <View style={styles.resProgress}><View style={[styles.progressBar, { width: `${r.progress}%` }]} /></View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><CheckSquare size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Completed Today</Text></View></View>
        {completedToday.map((c) => (
          <View key={c.id} style={styles.completedRow}>
            <View style={styles.compInfo}><View style={[styles.compIcon, { backgroundColor: '#10B98115' }]}><CheckCircle size={16} color="#10B981" /></View><View><Text style={[styles.compTitle, { color: theme.colors.text }]}>{c.title}</Text><Text style={[styles.compMeta, { color: theme.colors.secondaryText }]}>{c.ticket} · {c.resolutionTime}</Text></View></View>
            <View style={styles.compRating}>{[1,2,3,4,5].map((s) => (<Text key={s} style={{ color: s <= c.satisfaction ? '#F59E0B' : '#D1D5DB', fontSize: 14 }}>★</Text>))}</View>
          </View>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Resolution Tracker requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>94.8%</Text><Text style={styles.metricLabel}>SLA Compliance</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>4.7/5</Text><Text style={styles.metricLabel}>CSAT Score</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>-8%</Text><Text style={styles.metricLabel}>Avg Time Down</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>68.4%</Text><Text style={styles.metricLabel}>First Contact</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Resolution Times Improving</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Average resolution time decreased 8% this week. First-contact resolution up to 68.4%.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><AlertCircle size={20} color="#F59E0B" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Pending Verifications</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>14 resolutions awaiting customer verification. Consider automated follow-up reminders.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tracker Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Progress Tracking</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically update resolution progress</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>SLA Alerts</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Alert when SLA breach approaching</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Customer Verification</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Require customer confirmation to close</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Reopen Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-detect and flag reopened issues</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Satisfaction Surveys</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-send CSAT after resolution</Text></View><Switch value={true} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: ClipboardCheck, component: renderOverviewTab() },
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
  resolutionRow: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  resInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  resIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  resTitle: { fontSize: 14, fontWeight: '600' },
  resMeta: { fontSize: 12, marginTop: 2 },
  resProgress: { height: 4, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#3B82F6', borderRadius: 2 },
  completedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  compInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  compIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  compTitle: { fontSize: 14, fontWeight: '600' },
  compMeta: { fontSize: 12, marginTop: 2 },
  compRating: { flexDirection: 'row', gap: 2 },
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
