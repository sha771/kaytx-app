import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Target, CheckCircle, Clock, BarChart3, Lock, Sparkles, ChevronRight, Users, FileText, Play, Calendar } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AISuccessPlanCoordinatorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-success-plan-coordinator')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { activePlans: 86, milestones: 342, completionRate: '78%', onTrack: '91%' };
  const plans = [
    { account: 'TechCorp Industries', type: 'Enterprise', milestones: 8, completed: 5, status: 'on-track', nextReview: '2 days' },
    { account: 'CloudSync Ltd', type: 'Growth', milestones: 5, completed: 3, status: 'at-risk', nextReview: '1 day' },
    { account: 'DataFlow Inc', type: 'Growth', milestones: 6, completed: 4, status: 'on-track', nextReview: '5 days' },
    { account: 'MediaGroup', type: 'Enterprise', milestones: 10, completed: 7, status: 'on-track', nextReview: '3 days' },
  ];

  const renderPlansTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.activePlans}</Text><Text style={styles.metricLabel}>Active Plans</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.milestones}</Text><Text style={styles.metricLabel}>Milestones</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.completionRate}</Text><Text style={styles.metricLabel}>Completion</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Calendar size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.onTrack}</Text><Text style={styles.metricLabel}>On Track</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Target size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Success Plans</Text></View></View>
          <View style={styles.planList}>
            {plans.map((p) => (
              <TouchableOpacity key={p.account} style={styles.planCard}>
                <View style={styles.planHeader}>
                  <View style={styles.planLeft}><Text style={[styles.planAccount, { color: theme.colors.text }]}>{p.account}</Text><Text style={[styles.planType, { color: theme.colors.secondaryText }]}>{p.type}</Text></View>
                  <View style={[styles.statusBadge, { backgroundColor: p.status === 'on-track' ? '#10B98120' : '#EF444420' }]}>
                    <Text style={[styles.statusText, { color: p.status === 'on-track' ? '#10B981' : '#EF4444' }]}>{p.status}</Text>
                  </View>
                </View>
                <View style={styles.planProgress}>
                  <View style={styles.progressBarContainer}><View style={[styles.progressBar, { width: ((p.completed / p.milestones) * 100) + '%', backgroundColor: p.status === 'on-track' ? '#10B981' : '#F59E0B' } as any]} /></View>
                  <Text style={[styles.progressLabel, { color: theme.colors.text }]}>{p.completed}/{p.milestones}</Text>
                </View>
                <Text style={[styles.planReview, { color: theme.colors.secondaryText }]}>Next review: {p.nextReview}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Recommendations</Text></View></View>
          <View style={styles.recList}>
            {[
              { msg: 'CloudSync plan at risk — schedule executive check-in', color: '#EF4444' },
              { msg: 'TechCorp approaching expansion milestone — prepare upsell proposal', color: '#10B981' },
              { msg: '3 plans need QBR scheduling this week', color: '#F59E0B' },
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Success Plan Coordinator.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'plans', label: 'Success Plans', icon: Target, component: renderPlansTab() }];
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
  planList: { gap: 12 }, planCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  planLeft: { flex: 1 }, planAccount: { fontSize: 15, fontWeight: '700' }, planType: { fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  planProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  progressBarContainer: { flex: 1, height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 4 }, progressLabel: { fontSize: 13, fontWeight: '700', width: 40, textAlign: 'right' },
  planReview: { fontSize: 12 },
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
