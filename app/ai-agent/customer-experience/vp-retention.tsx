import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import {
  RefreshCw, Users, Clock, Target, Zap, ChevronRight,
  TrendingUp, AlertTriangle, BarChart3, CheckCircle, Lock,
  Award, TrendingDown, Shield, Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function VpRetentionPage() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-vp-retention')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { retentionRate: '96.4%', churn: '3.6%', winback: '24%', nrr: '118%' };

  const subAgents = [
    { id: 'ai-churn-predictor', name: 'Churn Predictor', icon: AlertTriangle, handled: 640, status: 'active', color: '#EF4444' },
    { id: 'ai-winback-campaign-specialist', name: 'Win-back Campaign Specialist', icon: RefreshCw, handled: 124, status: 'active', color: '#10B981' },
    { id: 'ai-retention-metrics-analyst', name: 'Retention Metrics Analyst', icon: BarChart3, handled: 486, status: 'active', color: '#3B82F6' },
  ];

  const atRisk = [
    { account: 'TechCorp Industries', risk: 92, arr: '$240K', reason: 'Declining usage' },
    { account: 'CloudSync Ltd', risk: 78, arr: '$84K', reason: 'Payment issues' },
    { account: 'DataFlow Inc', risk: 71, arr: '$56K', reason: 'Support complaints' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.retentionRate}</Text><Text style={styles.metricLabel}>Retention</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><TrendingDown size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.churn}</Text><Text style={styles.metricLabel}>Churn Rate</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><RefreshCw size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.winback}</Text><Text style={styles.metricLabel}>Win-back</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.nrr}</Text><Text style={styles.metricLabel}>NRR</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Sub-Agents</Text></View></View>
          <View style={styles.subAgentList}>
            {subAgents.map((sa) => (
              <TouchableOpacity key={sa.id} style={styles.subAgentCard} onPress={() => router.push(`/ai-agent/customer-experience/${sa.id}`)}>
                <View style={styles.subAgentLeft}>
                  <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={20} color={sa.color} /></View>
                  <View><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentStat, { color: theme.colors.secondaryText }]}>{sa.handled} monitored</Text></View>
                </View>
                <View style={styles.subAgentRight}><View style={[styles.activeDot, { backgroundColor: '#10B981' }]} /><ChevronRight size={18} color={theme.colors.secondaryText} /></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>At-Risk Accounts</Text></View></View>
          <View style={styles.riskList}>
            {atRisk.map((r) => (
              <View key={r.account} style={styles.riskCard}>
                <View style={styles.riskHeader}>
                  <View style={styles.riskLeft}><Text style={[styles.riskAccount, { color: theme.colors.text }]}>{r.account}</Text><Text style={[styles.riskReason, { color: theme.colors.secondaryText }]}>{r.reason}</Text></View>
                  <View style={[styles.riskBadge, { backgroundColor: r.risk > 80 ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.riskBadgeText, { color: r.risk > 80 ? '#EF4444' : '#F59E0B' }]}>{r.risk}%</Text></View>
                </View>
                <View style={styles.riskFooter}><Text style={[styles.riskArr, { color: theme.colors.secondaryText }]}>{r.arr} ARR at risk</Text></View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[
              { msg: 'Churn rate down 0.8% — proactive outreach proving effective', color: '#10B981' },
              { msg: 'TechCorp showing recovery signals — success plan working', color: '#3B82F6' },
              { msg: '3 Enterprise accounts flagged early churn risk', color: '#EF4444' },
            ].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI VP Retention is part of our Enterprise suite. Upgrade to activate.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: RefreshCw, component: renderOverviewTab() },
  ];
  if (!agent) return <View style={styles.container}><Text style={{ color: theme.colors.text }}>Agent not found</Text></View>;
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
  subAgentList: { gap: 12 },
  subAgentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  subAgentLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  subAgentIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  subAgentName: { fontSize: 15, fontWeight: '700' },
  subAgentStat: { fontSize: 12, marginTop: 2 },
  subAgentRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  activeDot: { width: 8, height: 8, borderRadius: 4 },
  riskList: { gap: 12 },
  riskCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  riskLeft: { flex: 1 },
  riskAccount: { fontSize: 15, fontWeight: '700' },
  riskReason: { fontSize: 12, marginTop: 2 },
  riskBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  riskBadgeText: { fontSize: 14, fontWeight: '700' },
  riskFooter: { marginTop: 8 },
  riskArr: { fontSize: 12 },
  insightsList: { gap: 12 },
  insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
