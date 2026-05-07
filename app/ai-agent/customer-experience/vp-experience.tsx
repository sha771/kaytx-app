import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import {
  Sparkles, Users, Clock, Target, Zap, ChevronRight,
  TrendingUp, Eye, BarChart3, CheckCircle, Lock,
  MessageSquare, Palette, Award, Gauge,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function VpExperiencePage() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-vp-experience')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { ces: '4.1/5', uxScore: '82', personalization: '76%', nps: 72 };

  const subAgents = [
    { id: 'ai-ux-feedback-analyst', name: 'UX Feedback Analyst', icon: MessageSquare, handled: 1240, status: 'active', color: '#3B82F6' },
    { id: 'ai-experience-benchmark-analyst', name: 'Experience Benchmark Analyst', icon: Gauge, handled: 486, status: 'active', color: '#10B981' },
    { id: 'ai-personalization-engine', name: 'Personalization Engine', icon: Palette, handled: 8420, status: 'active', color: '#8B5CF6' },
  ];

  const experienceTouchpoints = [
    { touchpoint: 'Website', score: 88, interactions: '12.4K', sentiment: 'positive' },
    { touchpoint: 'Mobile App', score: 82, interactions: '8.2K', sentiment: 'positive' },
    { touchpoint: 'Support Chat', score: 91, interactions: '4.8K', sentiment: 'positive' },
    { touchpoint: 'Onboarding', score: 76, interactions: '2.1K', sentiment: 'neutral' },
    { touchpoint: 'Billing', score: 68, interactions: '3.4K', sentiment: 'negative' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Eye size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.ces}</Text><Text style={styles.metricLabel}>CES Score</Text></LinearGradient>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Sparkles size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.uxScore}</Text><Text style={styles.metricLabel}>UX Score</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Palette size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.personalization}</Text><Text style={styles.metricLabel}>Personalization</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.nps}</Text><Text style={styles.metricLabel}>NPS</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Sub-Agents</Text></View></View>
          <View style={styles.subAgentList}>
            {subAgents.map((sa) => (
              <TouchableOpacity key={sa.id} style={styles.subAgentCard} onPress={() => router.push(`/ai-agent/customer-experience/${sa.id}`)}>
                <View style={styles.subAgentLeft}>
                  <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={20} color={sa.color} /></View>
                  <View><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentStat, { color: theme.colors.secondaryText }]}>{sa.handled.toLocaleString()} processed</Text></View>
                </View>
                <View style={styles.subAgentRight}><View style={[styles.activeDot, { backgroundColor: '#10B981' }]} /><ChevronRight size={18} color={theme.colors.secondaryText} /></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Eye size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Experience Touchpoints</Text></View></View>
          <View style={styles.touchpointList}>
            {experienceTouchpoints.map((tp) => (
              <View key={tp.touchpoint} style={styles.touchpointCard}>
                <View style={styles.touchpointHeader}>
                  <Text style={[styles.touchpointName, { color: theme.colors.text }]}>{tp.touchpoint}</Text>
                  <View style={[styles.sentimentBadge, { backgroundColor: tp.sentiment === 'positive' ? '#10B98120' : tp.sentiment === 'negative' ? '#EF444420' : '#F59E0B20' }]}>
                    <Text style={[styles.sentimentText, { color: tp.sentiment === 'positive' ? '#10B981' : tp.sentiment === 'negative' ? '#EF4444' : '#F59E0B' }]}>{tp.sentiment}</Text>
                  </View>
                </View>
                <View style={styles.touchpointMetrics}>
                  <Text style={[styles.touchpointScore, { color: tp.score > 80 ? '#10B981' : tp.score > 70 ? '#F59E0B' : '#EF4444' }]}>{tp.score}/100</Text>
                  <Text style={[styles.touchpointInteractions, { color: theme.colors.secondaryText }]}>{tp.interactions} interactions</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[
              { msg: 'Billing touchpoint score dropped 6pts — payment flow redesign recommended', color: '#EF4444' },
              { msg: 'Personalization engine increased conversion 12% on product pages', color: '#10B981' },
              { msg: 'Mobile app UX score trending up — new navigation A/B test winning', color: '#3B82F6' },
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI VP Experience is part of our Enterprise suite. Upgrade to activate.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles, component: renderOverviewTab() },
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
  touchpointList: { gap: 12 },
  touchpointCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  touchpointHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  touchpointName: { fontSize: 15, fontWeight: '700' },
  sentimentBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  sentimentText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  touchpointMetrics: { flexDirection: 'row', justifyContent: 'space-between' },
  touchpointScore: { fontSize: 16, fontWeight: '700' },
  touchpointInteractions: { fontSize: 13 },
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
