import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import {
  Briefcase, Users, Clock, Target, Zap, ChevronRight,
  TrendingUp, Sparkles, BarChart3, CheckCircle, UserPlus,
  Activity, Heart, Shield, Lock, Award, DollarSign,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function VpCustomerSuccessPage() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-vp-customer-success')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { nrr: '118%', nps: 72, onboardingTime: '3.2 days', healthScore: '86/100' };

  const subAgents = [
    { id: 'ai-onboarding-specialist', name: 'Onboarding Specialist', icon: UserPlus, handled: 284, status: 'active', color: '#06B6D4' },
    { id: 'ai-account-health-monitor', name: 'Account Health Monitor', icon: Heart, handled: 1240, status: 'active', color: '#10B981' },
    { id: 'ai-success-plan-coordinator', name: 'Success Plan Coordinator', icon: Target, handled: 568, status: 'active', color: '#8B5CF6' },
  ];

  const accountTiers = [
    { tier: 'Enterprise', accounts: 42, arr: '$4.2M', health: '92', csm: '8' },
    { tier: 'Growth', accounts: 186, arr: '$2.8M', health: '84', csm: '6' },
    { tier: 'Starter', accounts: 412, arr: '$1.2M', health: '78', csm: '2' },
  ];

  const atRiskAccounts = [
    { name: 'TechCorp Industries', tier: 'Enterprise', risk: 'high', reason: 'Declining usage 30%', arr: '$240K' },
    { name: 'Global Solutions', tier: 'Growth', risk: 'medium', reason: 'Support ticket spike', arr: '$84K' },
    { name: 'DataFlow Inc', tier: 'Growth', risk: 'medium', reason: 'NPS drop -15pts', arr: '$56K' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}>
            <TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.nrr}</Text><Text style={styles.metricLabel}>Net Retention</Text>
          </LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.nps}</Text><Text style={styles.metricLabel}>NPS Score</Text>
          </LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.onboardingTime}</Text><Text style={styles.metricLabel}>Avg Onboarding</Text>
          </LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Heart size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.healthScore}</Text><Text style={styles.metricLabel}>Health Score</Text>
          </LinearGradient>
        </View>

        {/* Sub-Agents */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Sub-Agents</Text></View>
          </View>
          <View style={styles.subAgentList}>
            {subAgents.map((sa) => (
              <TouchableOpacity key={sa.id} style={styles.subAgentCard} onPress={() => router.push(`/ai-agent/customer-experience/${sa.id}`)}>
                <View style={styles.subAgentLeft}>
                  <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={20} color={sa.color} /></View>
                  <View>
                    <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text>
                    <Text style={[styles.subAgentStat, { color: theme.colors.secondaryText }]}>{sa.handled} accounts managed</Text>
                  </View>
                </View>
                <View style={styles.subAgentRight}><View style={[styles.activeDot, { backgroundColor: '#10B981' }]} /><ChevronRight size={18} color={theme.colors.secondaryText} /></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Account Tiers */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Users size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Account Tiers</Text></View>
          </View>
          <View style={styles.tierList}>
            {accountTiers.map((t) => (
              <View key={t.tier} style={styles.tierCard}>
                <View style={styles.tierHeader}>
                  <Text style={[styles.tierName, { color: theme.colors.text }]}>{t.tier}</Text>
                  <Text style={[styles.tierArr, { color: '#10B981' }]}>{t.arr} ARR</Text>
                </View>
                <View style={styles.tierMetrics}>
                  <View style={styles.tierMetric}><Text style={[styles.tierMetricValue, { color: theme.colors.text }]}>{t.accounts}</Text><Text style={[styles.tierMetricLabel, { color: theme.colors.secondaryText }]}>accounts</Text></View>
                  <View style={styles.tierMetric}><Text style={[styles.tierMetricValue, { color: theme.colors.text }]}>{t.health}</Text><Text style={[styles.tierMetricLabel, { color: theme.colors.secondaryText }]}>health</Text></View>
                  <View style={styles.tierMetric}><Text style={[styles.tierMetricValue, { color: theme.colors.text }]}>{t.csm}</Text><Text style={[styles.tierMetricLabel, { color: theme.colors.secondaryText }]}>CSMs</Text></View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* At-Risk Accounts */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Shield size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>At-Risk Accounts</Text></View>
          </View>
          <View style={styles.riskList}>
            {atRiskAccounts.map((a) => (
              <View key={a.name} style={styles.riskCard}>
                <View style={styles.riskHeader}>
                  <View style={styles.riskLeft}>
                    <Text style={[styles.riskName, { color: theme.colors.text }]}>{a.name}</Text>
                    <Text style={[styles.riskReason, { color: theme.colors.secondaryText }]}>{a.reason}</Text>
                  </View>
                  <View style={[styles.riskBadge, { backgroundColor: a.risk === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                    <Text style={[styles.riskBadgeText, { color: a.risk === 'high' ? '#EF4444' : '#F59E0B' }]}>{a.risk}</Text>
                  </View>
                </View>
                <View style={styles.riskFooter}>
                  <Text style={[styles.riskTier, { color: theme.colors.secondaryText }]}>{a.tier} · {a.arr}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* AI Insights */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View>
          </View>
          <View style={styles.insightsList}>
            {[
              { msg: 'Enterprise tier health improved 4pts this month — onboarding automation driving gains', color: '#10B981' },
              { msg: '3 Growth accounts showing early churn signals — proactive outreach recommended', color: '#EF4444' },
              { msg: 'NPS up 5pts after Success Plan Coordinator deployment', color: '#3B82F6' },
            ].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}>
                <Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI VP Customer Success is part of our Enterprise suite. Upgrade your plan to activate this agent.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Success Metrics</Text></View>
          </View>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Gross Retention</Text><Text style={[styles.analyticsValue, { color: '#10B981' }]}>96.4%</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Net Retention</Text><Text style={[styles.analyticsValue, { color: '#06B6D4' }]}>{keyMetrics.nrr}</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Expansion Revenue</Text><Text style={[styles.analyticsValue, { color: '#8B5CF6' }]}>$1.8M</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Churn Rate</Text><Text style={[styles.analyticsValue, { color: '#F59E0B' }]}>3.6%</Text></View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><TrendingUp size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quarterly Trend</Text></View>
          </View>
          <View style={styles.trendList}>
            {[
              { period: 'Q1', nrr: '112%', nps: 68, health: '82' },
              { period: 'Q2', nrr: '115%', nps: 70, health: '84' },
              { period: 'Q3', nrr: '118%', nps: 72, health: '86' },
            ].map((q) => (
              <View key={q.period} style={styles.trendItem}>
                <Text style={[styles.trendPeriod, { color: theme.colors.text }]}>{q.period}</Text>
                <View style={styles.trendMetrics}>
                  <Text style={[styles.trendMetric, { color: '#06B6D4' }]}>{q.nrr}</Text>
                  <Text style={[styles.trendMetric, { color: '#10B981' }]}>NPS {q.nps}</Text>
                  <Text style={[styles.trendMetric, { color: '#8B5CF6' }]}>H {q.health}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Briefcase, component: renderOverviewTab() },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalyticsTab() },
  ];

  if (!agent) return <View style={styles.container}><Text style={{ color: theme.colors.text }}>Agent not found</Text></View>;
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
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
  tierList: { gap: 12 },
  tierCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  tierHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  tierName: { fontSize: 16, fontWeight: '700' },
  tierArr: { fontSize: 15, fontWeight: '700' },
  tierMetrics: { flexDirection: 'row', gap: 24 },
  tierMetric: { alignItems: 'center' },
  tierMetricValue: { fontSize: 16, fontWeight: '700' },
  tierMetricLabel: { fontSize: 11, marginTop: 2 },
  riskList: { gap: 12 },
  riskCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  riskLeft: { flex: 1 },
  riskName: { fontSize: 15, fontWeight: '700' },
  riskReason: { fontSize: 12, marginTop: 4 },
  riskBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  riskBadgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  riskFooter: { marginTop: 8 },
  riskTier: { fontSize: 12 },
  insightsList: { gap: 12 },
  insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  insightMessage: { fontSize: 14, lineHeight: 20 },
  analyticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  analyticsItem: { width: '48%', backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  analyticsLabel: { fontSize: 12, marginBottom: 8 },
  analyticsValue: { fontSize: 24, fontWeight: '800' },
  trendList: { gap: 12 },
  trendItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  trendPeriod: { fontSize: 16, fontWeight: '700', width: 50 },
  trendMetrics: { flexDirection: 'row', gap: 24 },
  trendMetric: { fontSize: 14, fontWeight: '600' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
