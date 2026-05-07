import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import {
  UserPlus, CheckCircle, Clock, BarChart3, Lock,
  Sparkles, Zap, ChevronRight, Play, FileText, Users,
  Star, Target, ArrowRight, Circle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIOnboardingSpecialistScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-onboarding-specialist')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { activeOnboardings: 28, completed: 184, avgTime: '3.2 days', completionRate: '94.6%' };

  const onboardingStages = [
    { stage: 'Welcome & Setup', completion: 96, avgTime: '4h', customers: 28 },
    { stage: 'Product Tour', completion: 88, avgTime: '1d', customers: 25 },
    { stage: 'First Value', completion: 82, avgTime: '1.5d', customers: 23 },
    { stage: 'Integration Setup', completion: 74, avgTime: '8h', customers: 21 },
    { stage: 'Team Training', completion: 68, avgTime: '1d', customers: 19 },
    { stage: 'Go-Live', completion: 62, avgTime: '4h', customers: 17 },
  ];

  const activeOnboardings = [
    { company: 'TechCorp Industries', csm: 'Sarah J.', stage: 'First Value', progress: 45, daysLeft: 2 },
    { company: 'CloudSync Ltd', csm: 'Mike D.', stage: 'Product Tour', progress: 28, daysLeft: 4 },
    { company: 'DataFlow Inc', csm: 'Emily C.', stage: 'Integration Setup', progress: 62, daysLeft: 1 },
  ];

  const templates = [
    { name: 'SaaS Standard', duration: '5 days', stages: 6, usage: 142 },
    { name: 'Enterprise', duration: '10 days', stages: 8, usage: 32 },
    { name: 'Self-Serve', duration: '2 days', stages: 3, usage: 10 },
  ];

  const renderOnboardingTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}>
            <UserPlus size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.activeOnboardings}</Text><Text style={styles.metricLabel}>Active</Text>
          </LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.completed}</Text><Text style={styles.metricLabel}>Completed</Text>
          </LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgTime}</Text><Text style={styles.metricLabel}>Avg Time</Text>
          </LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Star size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.completionRate}</Text><Text style={styles.metricLabel}>Completion</Text>
          </LinearGradient>
        </View>

        {/* Onboarding Funnel */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Target size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Onboarding Funnel</Text></View>
          </View>
          <View style={styles.funnelList}>
            {onboardingStages.map((s) => (
              <View key={s.stage} style={styles.funnelItem}>
                <View style={styles.funnelLeft}>
                  <Text style={[styles.funnelStage, { color: theme.colors.text }]}>{s.stage}</Text>
                  <Text style={[styles.funnelTime, { color: theme.colors.secondaryText }]}>Avg: {s.avgTime}</Text>
                </View>
                <View style={styles.funnelRight}>
                  <View style={styles.funnelBarContainer}>
                    <View style={[styles.funnelBar, { width: (s.completion + '%'), backgroundColor: s.completion > 85 ? '#10B981' : s.completion > 70 ? '#F59E0B' : '#EF4444' } as any]} />
                  </View>
                  <Text style={[styles.funnelPct, { color: theme.colors.text }]}>{s.completion}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active Onboardings */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Users size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Onboardings</Text></View>
          </View>
          <View style={styles.onboardingList}>
            {activeOnboardings.map((o) => (
              <View key={o.company} style={styles.onboardingCard}>
                <View style={styles.onboardingHeader}>
                  <View style={styles.onboardingLeft}>
                    <Text style={[styles.onboardingCompany, { color: theme.colors.text }]}>{o.company}</Text>
                    <Text style={[styles.onboardingCSM, { color: theme.colors.secondaryText }]}>CSM: {o.csm}</Text>
                  </View>
                  <Text style={[styles.onboardingDays, { color: o.daysLeft <= 1 ? '#EF4444' : '#F59E0B' }]}>{o.daysLeft}d left</Text>
                </View>
                <View style={styles.onboardingProgress}>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: (o.progress + '%'), backgroundColor: o.progress > 50 ? '#10B981' : '#F59E0B' } as any]} />
                  </View>
                  <Text style={[styles.progressText, { color: theme.colors.text }]}>{o.progress}%</Text>
                </View>
                <Text style={[styles.onboardingStage, { color: theme.colors.secondaryText }]}>Current: {o.stage}</Text>
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Onboarding Specialist is part of our Enterprise suite. Upgrade to activate.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderTemplatesTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><FileText size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Onboarding Templates</Text></View>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.colors.primary }]}><Play size={16} color="#fff" /></TouchableOpacity>
          </View>
          <View style={styles.templateList}>
            {templates.map((t) => (
              <TouchableOpacity key={t.name} style={styles.templateCard}>
                <View style={styles.templateHeader}>
                  <Text style={[styles.templateName, { color: theme.colors.text }]}>{t.name}</Text>
                  <ChevronRight size={18} color={theme.colors.secondaryText} />
                </View>
                <View style={styles.templateMetrics}>
                  <Text style={[styles.templateMetric, { color: theme.colors.secondaryText }]}>{t.duration}</Text>
                  <Text style={[styles.templateMetric, { color: theme.colors.secondaryText }]}>{t.stages} stages</Text>
                  <Text style={[styles.templateMetric, { color: theme.colors.secondaryText }]}>{t.usage} uses</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* AI Recommendations */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Recommendations</Text></View>
          </View>
          <View style={styles.recList}>
            {[
              { msg: 'Add automated check-in at "First Value" stage — 18% drop-off detected', color: '#EF4444' },
              { msg: 'Self-serve template shows 96% completion — recommend for Starter tier', color: '#10B981' },
              { msg: 'Integration setup bottleneck — add video walkthrough', color: '#F59E0B' },
            ].map((r, idx) => (
              <View key={idx} style={[styles.recCard, { borderLeftColor: r.color }]}>
                <Text style={[styles.recText, { color: theme.colors.text }]}>{r.msg}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'onboarding', label: 'Onboarding', icon: UserPlus, component: renderOnboardingTab() },
    { id: 'templates', label: 'Templates', icon: FileText, component: renderTemplatesTab() },
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
  addBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  funnelList: { gap: 14 },
  funnelItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  funnelLeft: { flex: 1 },
  funnelStage: { fontSize: 14, fontWeight: '600' },
  funnelTime: { fontSize: 11, marginTop: 2 },
  funnelRight: { flexDirection: 'row', alignItems: 'center', gap: 10, width: 160 },
  funnelBarContainer: { flex: 1, height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
  funnelBar: { height: '100%', borderRadius: 4 },
  funnelPct: { fontSize: 13, fontWeight: '700', width: 40, textAlign: 'right' },
  onboardingList: { gap: 12 },
  onboardingCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  onboardingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  onboardingLeft: { flex: 1 },
  onboardingCompany: { fontSize: 15, fontWeight: '700' },
  onboardingCSM: { fontSize: 12, marginTop: 2 },
  onboardingDays: { fontSize: 13, fontWeight: '700' },
  onboardingProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  progressBarContainer: { flex: 1, height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden' },
  progressBar: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 13, fontWeight: '700', width: 40, textAlign: 'right' },
  onboardingStage: { fontSize: 12 },
  templateList: { gap: 12 },
  templateCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  templateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  templateName: { fontSize: 15, fontWeight: '700' },
  templateMetrics: { flexDirection: 'row', gap: 16 },
  templateMetric: { fontSize: 12 },
  recList: { gap: 12 },
  recCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  recText: { fontSize: 13, lineHeight: 18 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
