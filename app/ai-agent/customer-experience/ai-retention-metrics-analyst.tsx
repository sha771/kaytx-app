import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { BarChart3, CheckCircle, Clock, TrendingUp, Lock, Sparkles, TrendingDown, Activity, PieChart } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIRetentionMetricsAnalystScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-retention-metrics-analyst')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { grossRetention: '96.4%', netRetention: '118%', logoChurn: '3.6%', revenueChurn: '2.1%' };
  const cohortData = [
    { cohort: 'Jan 2024', retained: 94, expanded: 12, churned: 6 },
    { cohort: 'Feb 2024', retained: 92, expanded: 14, churned: 8 },
    { cohort: 'Mar 2024', retained: 96, expanded: 18, churned: 4 },
    { cohort: 'Apr 2024', retained: 95, expanded: 16, churned: 5 },
  ];
  const churnBreakdown = [
    { reason: 'Product-market fit', pct: 32, color: '#EF4444' },
    { reason: 'Price sensitivity', pct: 24, color: '#F59E0B' },
    { reason: 'Competitor switch', pct: 18, color: '#3B82F6' },
    { reason: 'Support experience', pct: 14, color: '#8B5CF6' },
    { reason: 'Other', pct: 12, color: '#6B7280' },
  ];

  const renderMetricsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.grossRetention}</Text><Text style={styles.metricLabel}>Gross Retention</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.netRetention}</Text><Text style={styles.metricLabel}>Net Retention</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><TrendingDown size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.logoChurn}</Text><Text style={styles.metricLabel}>Logo Churn</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.revenueChurn}</Text><Text style={styles.metricLabel}>Revenue Churn</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><PieChart size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Churn Breakdown</Text></View></View>
          <View style={styles.breakdownList}>
            {churnBreakdown.map((c) => (
              <View key={c.reason} style={styles.breakdownCard}>
                <View style={styles.breakdownHeader}>
                  <View style={[styles.breakdownDot, { backgroundColor: c.color }]} />
                  <Text style={[styles.breakdownReason, { color: theme.colors.text }]}>{c.reason}</Text>
                  <Text style={[styles.breakdownPct, { color: c.color }]}>{c.pct}%</Text>
                </View>
                <View style={styles.breakdownBarContainer}>
                  <View style={[styles.breakdownBar, { width: c.pct * 3, backgroundColor: c.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Cohort Analysis</Text></View></View>
          <View style={styles.cohortList}>
            {cohortData.map((c) => (
              <View key={c.cohort} style={styles.cohortCard}>
                <Text style={[styles.cohortName, { color: theme.colors.text }]}>{c.cohort}</Text>
                <View style={styles.cohortMetrics}>
                  <View style={styles.cohortMetric}><Text style={[styles.cohortLabel, { color: theme.colors.secondaryText }]}>Retained</Text><Text style={[styles.cohortValue, { color: '#10B981' }]}>{c.retained}%</Text></View>
                  <View style={styles.cohortMetric}><Text style={[styles.cohortLabel, { color: theme.colors.secondaryText }]}>Expanded</Text><Text style={[styles.cohortValue, { color: '#3B82F6' }]}>{c.expanded}%</Text></View>
                  <View style={styles.cohortMetric}><Text style={[styles.cohortLabel, { color: theme.colors.secondaryText }]}>Churned</Text><Text style={[styles.cohortValue, { color: '#EF4444' }]}>{c.churned}%</Text></View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.recList}>
            {[
              { msg: 'Mar cohort best retention (96%) — onboarding automation credited', color: '#10B981' },
              { msg: 'Product-market fit churn dominant — improve ICP targeting', color: '#EF4444' },
              { msg: 'Expansion rate trending up 4pts — upsell campaigns effective', color: '#3B82F6' },
            ].map((r, idx) => (
              <View key={idx} style={[styles.recCard, { borderLeftColor: r.color }]}><Text style={[styles.recText, { color: theme.colors.text }]}>{r.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Retention Metrics Analyst.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'metrics', label: 'Metrics', icon: BarChart3, component: renderMetricsTab() }];
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
  breakdownList: { gap: 14 }, breakdownCard: { marginBottom: 4 },
  breakdownHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  breakdownDot: { width: 10, height: 10, borderRadius: 5 },
  breakdownReason: { fontSize: 14, fontWeight: '600', flex: 1 },
  breakdownPct: { fontSize: 14, fontWeight: '700' },
  breakdownBarContainer: { height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden' },
  breakdownBar: { height: '100%', borderRadius: 3 },
  cohortList: { gap: 12 }, cohortCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  cohortName: { fontSize: 15, fontWeight: '700', marginBottom: 10 },
  cohortMetrics: { flexDirection: 'row', justifyContent: 'space-around' },
  cohortMetric: { alignItems: 'center' },
  cohortLabel: { fontSize: 11, marginBottom: 4 },
  cohortValue: { fontSize: 16, fontWeight: '700' },
  recList: { gap: 12 }, recCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  recText: { fontSize: 13, lineHeight: 18 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
