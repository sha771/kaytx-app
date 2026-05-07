import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { Puzzle, CheckCircle, TrendingUp, Clock, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Search, Activity, BookOpen, Lightbulb, ThumbsUp, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AISolutionMatcherScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-solution-matcher')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const recentMatches = [
    { id: 'SM-001', issue: 'Login token expired', solution: 'Token Refresh Protocol', confidence: 97, status: 'resolved' },
    { id: 'SM-002', issue: 'Payment gateway timeout', solution: 'Retry with Circuit Breaker', confidence: 94, status: 'resolved' },
    { id: 'SM-003', issue: 'Data sync conflict', solution: 'Merge Resolution Workflow', confidence: 91, status: 'pending' },
    { id: 'SM-004', issue: 'API rate limit exceeded', solution: 'Throttle & Queue Strategy', confidence: 96, status: 'resolved' },
  ];
  const topSolutions = [
    { name: 'Token Refresh Protocol', usage: 1240, successRate: '97.2%', category: 'Authentication' },
    { name: 'Circuit Breaker Pattern', usage: 890, successRate: '94.8%', category: 'Infrastructure' },
    { name: 'Merge Resolution Workflow', usage: 670, successRate: '91.4%', category: 'Data Sync' },
  ];

  const S = StyleSheet.create({ row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' }, info: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }, icon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }, name: { fontSize: 14, fontWeight: '600' }, meta: { fontSize: 12, marginTop: 2 }, badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }, badgeText: { fontSize: 11, fontWeight: '700' } });

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Puzzle size={20} color="#fff" /><Text style={styles.metricValue}>342</Text><Text style={styles.metricLabel}>Matched Today</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>94.2%</Text><Text style={styles.metricLabel}>Match Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>0.8s</Text><Text style={styles.metricLabel}>Match Time</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>218</Text><Text style={styles.metricLabel}>Auto-Resolved</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Matches</Text></View></View>
        {recentMatches.map((m) => (
          <TouchableOpacity key={m.id} style={S.row}>
            <View style={S.info}><View style={[S.icon, { backgroundColor: theme.colors.primary + '15' }]}><Puzzle size={16} color={theme.colors.primary} /></View><View><Text style={[S.name, { color: theme.colors.text }]}>{m.issue}</Text><Text style={[S.meta, { color: theme.colors.secondaryText }]}>{m.solution}</Text></View></View>
            <View style={[S.badge, { backgroundColor: m.confidence >= 95 ? '#10B98120' : '#F59E0B20' }]}><Text style={[S.badgeText, { color: m.confidence >= 95 ? '#10B981' : '#F59E0B' }]}>{m.confidence}%</Text></View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Lightbulb size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Solutions</Text></View></View>
        {topSolutions.map((sol, i) => (
          <View key={i} style={S.row}>
            <View style={S.info}><View style={[S.icon, { backgroundColor: theme.colors.primary + '15' }]}><Text style={{ color: theme.colors.primary, fontWeight: '700' }}>{i+1}</Text></View><View><Text style={[S.name, { color: theme.colors.text }]}>{sol.name}</Text><Text style={[S.meta, { color: theme.colors.secondaryText }]}>{sol.category} · {sol.usage} uses</Text></View></View>
            <Text style={{ color: '#10B981', fontWeight: '700', fontSize: 14 }}>{sol.successRate}</Text>
          </View>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Solution Matcher requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>94.2%</Text><Text style={styles.metricLabel}>Overall Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>63.7%</Text><Text style={styles.metricLabel}>Auto-Resolve Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>+3.8%</Text><Text style={styles.metricLabel}>Weekly Gain</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><BookOpen size={20} color="#fff" /><Text style={styles.metricValue}>2,840</Text><Text style={styles.metricLabel}>KB Articles</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Solution Reuse Increasing</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>78.6% of resolved tickets reuse existing solutions, up 5.2% from last week.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><Lightbulb size={20} color="#8B5CF6" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>New Solution Opportunities</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>42 recurring issues without KB articles. AI can auto-generate solutions with 87% accuracy.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Matcher Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Matching</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically match solutions to tickets</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Confidence Threshold</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Minimum match confidence (90%)</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Apply Solutions</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-apply matched solutions for high confidence</Text></View><Switch value={false} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>AI Solution Generation</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Generate new solutions for unmatched issues</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Learning Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Learn from successful resolutions</Text></View><Switch value={true} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Puzzle, component: renderOverviewTab() },
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
