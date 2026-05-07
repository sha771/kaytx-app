import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Heart, CheckCircle, Clock, BarChart3, Lock, Sparkles, AlertTriangle, TrendingUp, Shield, ChevronRight, Users } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIAccountHealthMonitorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-account-health-monitor')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { monitored: 640, healthy: 482, atRisk: 124, critical: 34 };
  const healthDist = [
    { label: 'Healthy (80-100)', count: 482, color: '#10B981' },
    { label: 'Watch (60-79)', count: 124, color: '#F59E0B' },
    { label: 'Critical (<60)', count: 34, color: '#EF4444' },
  ];
  const signals = [
    { account: 'TechCorp', signal: 'Usage down 30%', severity: 'critical', score: 42 },
    { account: 'CloudSync', signal: 'NPS drop -15pts', severity: 'warning', score: 64 },
    { account: 'DataFlow', signal: 'Support spike +40%', severity: 'warning', score: 58 },
    { account: 'MediaGroup', signal: 'Login frequency down', severity: 'watch', score: 72 },
  ];

  const renderHealthTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Heart size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.monitored}</Text><Text style={styles.metricLabel}>Monitored</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.healthy}</Text><Text style={styles.metricLabel}>Healthy</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><AlertTriangle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.atRisk}</Text><Text style={styles.metricLabel}>At Risk</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><Shield size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.critical}</Text><Text style={styles.metricLabel}>Critical</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Heart size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Health Distribution</Text></View></View>
          <View style={styles.distList}>
            {healthDist.map((d) => (
              <View key={d.label} style={styles.distItem}>
                <View style={styles.distLeft}><View style={[styles.distDot, { backgroundColor: d.color }]} /><Text style={[styles.distLabel, { color: theme.colors.text }]}>{d.label}</Text></View>
                <Text style={[styles.distCount, { color: theme.colors.text }]}>{d.count}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><AlertTriangle size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Signals</Text></View></View>
          <View style={styles.signalList}>
            {signals.map((s) => (
              <View key={s.account} style={styles.signalCard}>
                <View style={styles.signalHeader}>
                  <Text style={[styles.signalAccount, { color: theme.colors.text }]}>{s.account}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: s.severity === 'critical' ? '#EF444420' : s.severity === 'warning' ? '#F59E0B20' : '#3B82F620' }]}>
                    <Text style={[styles.severityText, { color: s.severity === 'critical' ? '#EF4444' : s.severity === 'warning' ? '#F59E0B' : '#3B82F6' }]}>{s.severity}</Text>
                  </View>
                </View>
                <Text style={[styles.signalMsg, { color: theme.colors.secondaryText }]}>{s.signal}</Text>
                <View style={styles.signalFooter}>
                  <Text style={[styles.signalScore, { color: s.score < 60 ? '#EF4444' : s.score < 80 ? '#F59E0B' : '#10B981' }]}>Score: {s.score}</Text>
                </View>
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Account Health Monitor.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'health', label: 'Health', icon: Heart, component: renderHealthTab() }];
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
  distList: { gap: 14 }, distItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  distLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 }, distDot: { width: 12, height: 12, borderRadius: 6 },
  distLabel: { fontSize: 14, fontWeight: '600' }, distCount: { fontSize: 16, fontWeight: '700' },
  signalList: { gap: 12 }, signalCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  signalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  signalAccount: { fontSize: 15, fontWeight: '700' },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  severityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  signalMsg: { fontSize: 13, marginBottom: 8 }, signalFooter: { flexDirection: 'row' },
  signalScore: { fontSize: 13, fontWeight: '700' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
