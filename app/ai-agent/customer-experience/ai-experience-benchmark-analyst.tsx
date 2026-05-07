import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Gauge, CheckCircle, Clock, BarChart3, Lock, Sparkles, TrendingUp, Target, Award, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIExperienceBenchmarkAnalystScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-experience-benchmark-analyst')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { overallRank: 'Top 15%', industryNPS: 62, ourNPS: 72, benchmarks: 24 };
  const benchmarks = [
    { metric: 'NPS', ourScore: 72, industry: 62, topPerformer: 84, trend: 'up' },
    { metric: 'CSAT', ourScore: 94, industry: 88, topPerformer: 97, trend: 'up' },
    { metric: 'CES', ourScore: 4.1, industry: 3.6, topPerformer: 4.5, trend: 'up' },
    { metric: 'FCR', ourScore: 87, industry: 78, topPerformer: 92, trend: 'down' },
    { metric: 'Avg Handle Time', ourScore: '4m 18s', industry: '6m 42s', topPerformer: '2m 30s', trend: 'up' },
  ];

  const renderBenchmarkTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.overallRank}</Text><Text style={styles.metricLabel}>Overall Rank</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.ourNPS}</Text><Text style={styles.metricLabel}>Our NPS</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.industryNPS}</Text><Text style={styles.metricLabel}>Industry Avg</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Gauge size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.benchmarks}</Text><Text style={styles.metricLabel}>Benchmarks</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Gauge size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Benchmark Comparison</Text></View></View>
          <View style={styles.benchList}>
            {benchmarks.map((b) => (
              <View key={b.metric} style={styles.benchCard}>
                <View style={styles.benchHeader}>
                  <Text style={[styles.benchMetric, { color: theme.colors.text }]}>{b.metric}</Text>
                  <View style={styles.benchTrend}>
                    {b.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
                  </View>
                </View>
                <View style={styles.benchValues}>
                  <View style={styles.benchValue}><Text style={[styles.benchLabel, { color: theme.colors.secondaryText }]}>Us</Text><Text style={[styles.benchOurScore, { color: '#3B82F6' }]}>{b.ourScore}</Text></View>
                  <View style={styles.benchValue}><Text style={[styles.benchLabel, { color: theme.colors.secondaryText }]}>Industry</Text><Text style={[styles.benchIndScore, { color: theme.colors.text }]}>{b.industry}</Text></View>
                  <View style={styles.benchValue}><Text style={[styles.benchLabel, { color: theme.colors.secondaryText }]}>Top</Text><Text style={[styles.benchTopScore, { color: '#10B981' }]}>{b.topPerformer}</Text></View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Recommendations</Text></View></View>
          <View style={styles.recList}>
            {[
              { msg: 'FCR below top performer by 5pts — invest in AI-assisted resolution', color: '#EF4444' },
              { msg: 'NPS +10pts above industry — strong competitive advantage', color: '#10B981' },
              { msg: 'CES approaching top performer — continue self-service investment', color: '#3B82F6' },
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Experience Benchmark Analyst.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'benchmarks', label: 'Benchmarks', icon: Gauge, component: renderBenchmarkTab() }];
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
  benchList: { gap: 12 }, benchCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  benchHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  benchMetric: { fontSize: 15, fontWeight: '700' },
  benchTrend: { flexDirection: 'row', alignItems: 'center' },
  benchValues: { flexDirection: 'row', justifyContent: 'space-around' },
  benchValue: { alignItems: 'center' },
  benchLabel: { fontSize: 11, marginBottom: 4 },
  benchOurScore: { fontSize: 16, fontWeight: '700' },
  benchIndScore: { fontSize: 16, fontWeight: '600' },
  benchTopScore: { fontSize: 16, fontWeight: '700' },
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
