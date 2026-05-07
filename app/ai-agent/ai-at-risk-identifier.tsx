import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { HeartCrack, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Activity, Users, AlertTriangle, Shield, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIAtRiskIdentifierScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-at-risk-identifier')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const atRiskCustomers = [
    { id: 'ARC-001', name: 'Acme Corp', riskScore: 87, riskLevel: 'Critical', mrr: '$8,400', reason: 'No login, support tickets open' },
    { id: 'ARC-002', name: 'TechStart Inc', riskScore: 72, riskLevel: 'High', mrr: '$4,200', reason: 'Decreased usage, churn survey' },
    { id: 'ARC-003', name: 'GlobalRetail Ltd', riskScore: 64, riskLevel: 'Medium', mrr: '$12,800', reason: 'Competitor mentioned, pricing concern' },
    { id: 'ARC-004', name: 'DataFlow Systems', riskScore: 58, riskLevel: 'Medium', mrr: '$6,500', reason: 'Feature request not addressed' },
  ];
  const riskSignals = [
    { signal: 'Login Inactivity', count: 124, trend: '+12%', weight: 'High' },
    { signal: 'Support Ticket Spike', count: 89, trend: '+8%', weight: 'High' },
    { signal: 'Negative Sentiment', count: 67, trend: '+15%', weight: 'Medium' },
    { signal: 'Competitor Mention', count: 45, trend: '+22%', weight: 'High' },
    { signal: 'Pricing Questions', count: 34, trend: '+5%', weight: 'Medium' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>47</Text><Text style={styles.metricLabel}>Identified Today</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>67.4</Text><Text style={styles.metricLabel}>Avg Risk Score</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>12</Text><Text style={styles.metricLabel}>Saved This Month</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><HeartCrack size={20} color="#fff" /><Text style={styles.metricValue}>$154K</Text><Text style={styles.metricLabel}>Churn Prevented</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>At-Risk Customers</Text></View>
          <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /><Text style={styles.createBtnText}>Intervene</Text></TouchableOpacity>
        </View>
        {atRiskCustomers.map((c) => (
          <TouchableOpacity key={c.id} style={styles.riskRow}>
            <View style={styles.riskInfo}><View style={[styles.riskIcon, { backgroundColor: c.riskLevel === 'Critical' ? '#EF444415' : '#F59E0B15' }]}><HeartCrack size={16} color={c.riskLevel === 'Critical' ? '#EF4444' : '#F59E0B'} /></View><View><Text style={[styles.riskName, { color: theme.colors.text }]}>{c.name}</Text><Text style={[styles.riskMeta, { color: theme.colors.secondaryText }]}>{c.reason}</Text></View></View>
            <View style={styles.riskRight}>
              <Text style={[styles.riskMrr, { color: theme.colors.text }]}>{c.mrr}</Text>
              <View style={[styles.scoreBadge, { backgroundColor: c.riskScore >= 80 ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.scoreText, { color: c.riskScore >= 80 ? '#EF4444' : '#F59E0B' }]}>{c.riskScore}</Text></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Signals</Text></View></View>
        {riskSignals.map((s) => (
          <View key={s.signal} style={styles.signalRow}>
            <View style={styles.sigInfo}><Text style={[styles.sigName, { color: theme.colors.text }]}>{s.signal}</Text><Text style={[styles.sigMeta, { color: theme.colors.secondaryText }]}>{s.count} detected · {s.weight} weight</Text></View>
            <Text style={[styles.sigTrend, { color: '#EF4444' }]}>{s.trend}</Text>
          </View>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI At-Risk Identifier requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>89.2%</Text><Text style={styles.metricLabel}>Detection Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>74.5%</Text><Text style={styles.metricLabel}>Intervention Rate</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>-12%</Text><Text style={styles.metricLabel}>Churn Rate Down</Text></LinearGradient>
        <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Users size={20} color="#fff" /><Text style={styles.metricValue}>47</Text><Text style={styles.metricLabel}>At-Risk Today</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><TrendingUp size={20} color="#10B981" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>Churn Rate Decreasing</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Churn rate down 12% this month. Early intervention on at-risk accounts is paying off.</Text></View></View>
        <View style={styles.insightCard}><View style={styles.insightIcon}><AlertCircle size={20} color="#F59E0B" /></View><View style={styles.insightContent}><Text style={[styles.insightTitle, { color: theme.colors.text }]}>New Risk Pattern Detected</Text><Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>Customers with {'>'}3 support tickets in 7 days show 68% higher churn probability.</Text></View></View>
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Identifier Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Real-Time Monitoring</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Monitor customer health in real-time</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Risk Score Threshold</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Alert when risk score exceeds 60</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Intervention</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Trigger retention actions automatically</Text></View><Switch value={false} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Competitor Tracking</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Monitor competitor mentions in tickets</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Usage Analytics</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Track usage decline patterns</Text></View><Switch value={true} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: HeartCrack, component: renderOverviewTab() },
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
  riskRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  riskInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  riskIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  riskName: { fontSize: 14, fontWeight: '600' },
  riskMeta: { fontSize: 12, marginTop: 2 },
  riskRight: { alignItems: 'flex-end', gap: 4 },
  riskMrr: { fontSize: 13, fontWeight: '600' },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  scoreText: { fontSize: 12, fontWeight: '700' },
  signalRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  sigInfo: { flex: 1 },
  sigName: { fontSize: 14, fontWeight: '600' },
  sigMeta: { fontSize: 12, marginTop: 2 },
  sigTrend: { fontSize: 13, fontWeight: '700' },
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
