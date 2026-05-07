import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { FolderInput, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Search, Activity, AlertOctagon, Shield, Flag, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIComplaintCategorizerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-complaint-categorizer')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const complaintCategories = [
    { name: 'Service Quality', count: 89, percentage: 28, color: '#EF4444', trend: 'up', severity: 'High' },
    { name: 'Billing Disputes', count: 67, percentage: 21, color: '#F59E0B', trend: 'down', severity: 'Medium' },
    { name: 'Product Defects', count: 54, percentage: 17, color: '#8B5CF6', trend: 'up', severity: 'High' },
    { name: 'Delivery Issues', count: 42, percentage: 13, color: '#3B82F6', trend: 'down', severity: 'Medium' },
    { name: 'Staff Behavior', count: 38, percentage: 12, color: '#10B981', trend: 'down', severity: 'Low' },
    { name: 'Policy Concerns', count: 29, percentage: 9, color: '#6B7280', trend: 'up', severity: 'Low' },
  ];
  const recentComplaints = [
    { id: 'CMP-001', subject: 'Rude customer service agent', category: 'Staff Behavior', urgency: 'High', sentiment: -0.72, time: '5m ago' },
    { id: 'CMP-002', subject: 'Overcharged on monthly bill', category: 'Billing Disputes', urgency: 'Critical', sentiment: -0.85, time: '12m ago' },
    { id: 'CMP-003', subject: 'Product arrived damaged', category: 'Product Defects', urgency: 'High', sentiment: -0.64, time: '25m ago' },
    { id: 'CMP-004', subject: 'Late delivery, no update', category: 'Delivery Issues', urgency: 'Medium', sentiment: -0.45, time: '38m ago' },
  ];
  const categorizationRules = [
    { id: 1, name: 'Keyword Detection', type: 'NLP', accuracy: '92.4%', active: true },
    { id: 2, name: 'Sentiment Scoring', type: 'AI Model', accuracy: '89.8%', active: true },
    { id: 3, name: 'Urgency Classification', type: 'Rule-Based', accuracy: '94.1%', active: true },
    { id: 4, name: 'Auto-Tagging', type: 'ML Pipeline', accuracy: '87.6%', active: true },
    { id: 5, name: 'Duplicate Merging', type: 'Similarity', accuracy: '91.2%', active: false },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertOctagon size={20} color="#fff" /><Text style={styles.metricValue}>319</Text><Text style={styles.metricLabel}>Complaints Today</Text></LinearGradient>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><FolderInput size={20} color="#fff" /><Text style={styles.metricValue}>94.6%</Text><Text style={styles.metricLabel}>Categorize Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>0.4s</Text><Text style={styles.metricLabel}>Categorize Time</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Flag size={20} color="#fff" /><Text style={styles.metricValue}>287</Text><Text style={styles.metricLabel}>Auto-Tagged</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><FolderInput size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Complaint Categories</Text></View></View>
        {complaintCategories.map((cat) => (
          <View key={cat.name} style={styles.categoryRow}>
            <View style={styles.categoryInfo}><View style={[styles.categoryDot, { backgroundColor: cat.color }]} /><Text style={[styles.categoryName, { color: theme.colors.text }]}>{cat.name}</Text></View>
            <View style={styles.categoryStats}>
              <Text style={[styles.categoryCount, { color: theme.colors.secondaryText }]}>{cat.count}</Text>
              <View style={styles.categoryBarContainer}><View style={[styles.categoryBar, { width: `${cat.percentage}%`, backgroundColor: cat.color }]} /></View>
              <Text style={[styles.categoryPercentage, { color: theme.colors.text }]}>{cat.percentage}%</Text>
              {cat.trend === 'up' ? <ArrowUpRight size={14} color="#EF4444" /> : <ArrowDownRight size={14} color="#10B981" />}
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Complaints</Text></View></View>
        {recentComplaints.map((c) => (
          <TouchableOpacity key={c.id} style={styles.complaintRow}>
            <View style={styles.complaintInfo}><View style={[styles.complaintIcon, { backgroundColor: c.urgency === 'Critical' ? '#EF444415' : '#F59E0B15' }]}><AlertOctagon size={16} color={c.urgency === 'Critical' ? '#EF4444' : '#F59E0B'} /></View><View><Text style={[styles.complaintSubject, { color: theme.colors.text }]}>{c.subject}</Text><Text style={[styles.complaintMeta, { color: theme.colors.secondaryText }]}>{c.category} · {c.time}</Text></View></View>
            <View style={[styles.urgencyBadge, { backgroundColor: c.urgency === 'Critical' ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.urgencyText, { color: c.urgency === 'Critical' ? '#EF4444' : '#F59E0B' }]}>{c.urgency}</Text></View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Complaint Categorizer requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderRulesTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>5</Text><Text style={styles.metricLabel}>Active Rules</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>91.0%</Text><Text style={styles.metricLabel}>Avg Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Sparkles size={20} color="#fff" /><Text style={styles.metricValue}>2</Text><Text style={styles.metricLabel}>AI Models</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>0.4s</Text><Text style={styles.metricLabel}>Avg Latency</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categorization Rules</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>New Rule</Text></TouchableOpacity>
        </View>
        {categorizationRules.map((rule) => (
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
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>94.6%</Text><Text style={styles.metricLabel}>Overall Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>89.9%</Text><Text style={styles.metricLabel}>Auto-Route Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>+2.4%</Text><Text style={styles.metricLabel}>Weekly Gain</Text></LinearGradient>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertCircle size={20} color="#fff" /><Text style={styles.metricValue}>32</Text><Text style={styles.metricLabel}>Pending Review</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Service Quality Spikes</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Service Quality complaints up 18% this week. Correlates with new agent onboarding.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><Shield size={20} color="#8B5CF6" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Duplicate Complaints Detected</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>14 complaints from same outage event. Auto-merge recommended for faster resolution.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categorizer Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Categorization</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Automatically categorize incoming complaints</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Urgency Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Auto-detect complaint urgency level</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Sentiment Scoring</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Score complaint sentiment automatically</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Duplicate Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Flag and merge duplicate complaints</Text></View><Switch value={false} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Learning Mode</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Learn from manual corrections</Text></View><Switch value={true} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: FolderInput, component: renderOverviewTab() },
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
  categoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10 },
  categoryInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, width: 120 },
  categoryDot: { width: 12, height: 12, borderRadius: 6 },
  categoryName: { fontSize: 13, fontWeight: '600' },
  categoryStats: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  categoryCount: { fontSize: 12, fontWeight: '600', width: 40 },
  categoryBarContainer: { flex: 1, height: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden' },
  categoryBar: { height: '100%', borderRadius: 3 },
  categoryPercentage: { fontSize: 12, fontWeight: '600', width: 35 },
  complaintRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  complaintInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  complaintIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  complaintSubject: { fontSize: 14, fontWeight: '600' },
  complaintMeta: { fontSize: 12, marginTop: 2 },
  urgencyBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  urgencyText: { fontSize: 11, fontWeight: '700' },
  ruleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  ruleInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  ruleIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  ruleName: { fontSize: 15, fontWeight: '600' },
  ruleMeta: { fontSize: 12, marginTop: 2 },
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
