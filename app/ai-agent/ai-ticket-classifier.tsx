import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch, TextInput } from 'react-native';
import { Tag, Layers, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Filter, Search, MoreHorizontal, Activity, Inbox, FolderOpen, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AITicketClassifierScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-ticket-classifier')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const categoryBreakdown = [
    { name: 'Technical Support', count: 142, percentage: 29, color: '#3B82F6', trend: 'up' },
    { name: 'Billing & Payments', count: 98, percentage: 20, color: '#10B981', trend: 'up' },
    { name: 'Account Issues', count: 76, percentage: 16, color: '#8B5CF6', trend: 'down' },
    { name: 'Feature Requests', count: 64, percentage: 13, color: '#F59E0B', trend: 'up' },
    { name: 'General Inquiry', count: 52, percentage: 11, color: '#6B7280', trend: 'down' },
    { name: 'Complaints', count: 55, percentage: 11, color: '#EF4444', trend: 'up' },
  ];
  const recentTickets = [
    { id: 'TK-4521', subject: 'Cannot access dashboard', category: 'Technical Support', confidence: 98, priority: 'High' },
    { id: 'TK-4520', subject: 'Double charge on invoice', category: 'Billing & Payments', confidence: 97, priority: 'Critical' },
    { id: 'TK-4519', subject: 'Password reset not working', category: 'Account Issues', confidence: 95, priority: 'Medium' },
    { id: 'TK-4518', subject: 'Request dark mode feature', category: 'Feature Requests', confidence: 92, priority: 'Low' },
  ];
  const classificationRules = [
    { id: 1, name: 'Keyword Match', type: 'Automatic', accuracy: '94.2%', active: true },
    { id: 2, name: 'Sentiment Analysis', type: 'AI-Powered', accuracy: '91.8%', active: true },
    { id: 3, name: 'Pattern Recognition', type: 'ML Model', accuracy: '96.4%', active: true },
    { id: 4, name: 'Customer History', type: 'Contextual', accuracy: '89.3%', active: true },
    { id: 5, name: 'Priority Scoring', type: 'Rule-Based', accuracy: '87.6%', active: false },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Inbox size={20} color="#fff" /><Text style={styles.metricValue}>487</Text><Text style={styles.metricLabel}>Classified Today</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>96.8%</Text><Text style={styles.metricLabel}>Accuracy Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>0.3s</Text><Text style={styles.metricLabel}>Classify Time</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><ArrowUpRight size={20} color="#fff" /><Text style={styles.metricValue}>412</Text><Text style={styles.metricLabel}>Auto-Routed</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Layers size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Category Distribution</Text></View></View>
        {categoryBreakdown.map((cat) => (
          <View key={cat.name} style={styles.categoryRow}>
            <View style={styles.categoryInfo}><View style={[styles.categoryDot, { backgroundColor: cat.color }]} /><Text style={[styles.categoryName, { color: theme.colors.text }]}>{cat.name}</Text></View>
            <View style={styles.categoryStats}>
              <Text style={[styles.categoryCount, { color: theme.colors.secondaryText }]}>{cat.count}</Text>
              <View style={styles.categoryBarContainer}><View style={[styles.categoryBar, { width: `${cat.percentage}%`, backgroundColor: cat.color }]} /></View>
              <Text style={[styles.categoryPercentage, { color: theme.colors.text }]}>{cat.percentage}%</Text>
              {cat.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Classifications</Text></View></View>
        {recentTickets.map((t) => (
          <TouchableOpacity key={t.id} style={styles.ticketRow}>
            <View style={styles.ticketInfo}><View style={[styles.ticketIcon, { backgroundColor: theme.colors.primary + '15' }]}><Tag size={16} color={theme.colors.primary} /></View><View><Text style={[styles.ticketSubject, { color: theme.colors.text }]}>{t.subject}</Text><Text style={[styles.ticketMeta, { color: theme.colors.secondaryText }]}>{t.id} · {t.category}</Text></View></View>
            <View style={styles.ticketRight}>
              <View style={[styles.confidenceBadge, { backgroundColor: t.confidence >= 95 ? '#10B98120' : '#F59E0B20' }]}><Text style={[styles.confidenceText, { color: t.confidence >= 95 ? '#10B981' : '#F59E0B' }]}>{t.confidence}%</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
    {isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Ticket Classifier is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}
    </View>
  );

  const renderRulesTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><FolderOpen size={20} color="#fff" /><Text style={styles.metricValue}>5</Text><Text style={styles.metricLabel}>Active Rules</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>91.9%</Text><Text style={styles.metricLabel}>Avg Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Sparkles size={20} color="#fff" /><Text style={styles.metricValue}>3</Text><Text style={styles.metricLabel}>AI Models</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>0.3s</Text><Text style={styles.metricLabel}>Avg Latency</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Classification Rules</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>New Rule</Text></TouchableOpacity>
        </View>
        {classificationRules.map((rule) => (
          <View key={rule.id} style={styles.ruleRow}>
            <View style={styles.ruleInfo}><View style={[styles.ruleIcon, { backgroundColor: theme.colors.primary + '15' }]}><Zap size={18} color={theme.colors.primary} /></View><View><Text style={[styles.ruleName, { color: theme.colors.text }]}>{rule.name}</Text><Text style={[styles.ruleMeta, { color: theme.colors.secondaryText }]}>{rule.type} · {rule.accuracy}</Text></View></View>
            <Switch value={rule.active} onValueChange={() => {}} />
          </View>
        ))}
      </View>
    </ScrollView></View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.analyticsHeader}><View style={styles.searchContainer}><Search size={18} color={theme.colors.secondaryText} /><TextInput style={[styles.searchInput, { color: theme.colors.text }]} placeholder="Search analytics..." placeholderTextColor={theme.colors.secondaryText} value={searchQuery} onChangeText={setSearchQuery} /></View></View>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>96.8%</Text><Text style={styles.metricLabel}>Overall Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>84.6%</Text><Text style={styles.metricLabel}>Auto-Route Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>+4.2%</Text><Text style={styles.metricLabel}>Weekly Gain</Text></LinearGradient>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertCircle size={20} color="#fff" /><Text style={styles.metricValue}>75</Text><Text style={styles.metricLabel}>Pending Review</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Accuracy Improving</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>ML model accuracy improved 4.2% this week. Technical Support now at 98.2% confidence.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><AlertCircle size={20} color="#F59E0B" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Ambiguous Tickets Detected</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>12 tickets flagged with &lt;85% confidence. Consider adding sub-categories.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Classifier Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Classification</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically classify incoming tickets</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Confidence Threshold</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Minimum confidence for auto-routing (85%)</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Priority Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-detect ticket priority level</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Duplicate Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Flag potential duplicate tickets</Text></View><Switch value={false} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Learning Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Continuously learn from corrections</Text></View><Switch value={true} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Tag, component: renderOverviewTab() },
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
  metricChange: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  metricChangeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  categoryInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, width: 120 },
  categoryDot: { width: 12, height: 12, borderRadius: 6 },
  categoryName: { fontSize: 13, fontWeight: '600' },
  categoryStats: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  categoryCount: { fontSize: 12, fontWeight: '600', width: 40 },
  categoryBarContainer: { flex: 1, height: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden' },
  categoryBar: { height: '100%', borderRadius: 3 },
  categoryPercentage: { fontSize: 12, fontWeight: '600', width: 35 },
  ticketRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  ticketInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  ticketIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  ticketSubject: { fontSize: 14, fontWeight: '600' },
  ticketMeta: { fontSize: 12, marginTop: 2 },
  ticketRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  confidenceBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  confidenceText: { fontSize: 11, fontWeight: '700' },
  ruleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  ruleInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  ruleIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  ruleName: { fontSize: 15, fontWeight: '600' },
  ruleMeta: { fontSize: 12, marginTop: 2 },
  createBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  createBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  analyticsHeader: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 12, paddingHorizontal: 12, height: 44 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  filterBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  insightCard: { flexDirection: 'row', padding: 16, backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 16, marginBottom: 12 },
  insightIcon: { marginRight: 12, marginTop: 2 },
  insightContent: { flex: 1 },
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
