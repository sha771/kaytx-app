import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import {
  Headphones, Users, Clock, Target, Zap, ChevronRight,
  TrendingUp, Sparkles, BarChart3, CheckCircle, Shield,
  AlertTriangle, BookOpen, Lock, Award,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function VpSupportPage() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-vp-support')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { csat: '94.2%', fcr: '87.6%', avgHandle: '4m 18s', tickets: 2847 };

  const subAgents = [
    { id: 'ai-escalation-manager', name: 'Escalation Manager', icon: AlertTriangle, handled: 142, status: 'active', color: '#EF4444' },
    { id: 'ai-knowledge-base-curator', name: 'Knowledge Base Curator', icon: BookOpen, handled: 248, status: 'active', color: '#3B82F6' },
    { id: 'ai-support-quality-auditor', name: 'Support Quality Auditor', icon: Shield, handled: 890, status: 'active', color: '#8B5CF6' },
  ];

  const channelMetrics = [
    { channel: 'Live Chat', volume: 1240, csat: '95.1%', avgTime: '2m 40s' },
    { channel: 'Email', volume: 890, csat: '93.4%', avgTime: '4h 12m' },
    { channel: 'Phone', volume: 412, csat: '92.8%', avgTime: '6m 30s' },
    { channel: 'Social', volume: 305, csat: '91.2%', avgTime: '8m 15s' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.csat}</Text><Text style={styles.metricLabel}>CSAT</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.fcr}</Text><Text style={styles.metricLabel}>First Contact Res</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgHandle}</Text><Text style={styles.metricLabel}>Avg Handle Time</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Headphones size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.tickets.toLocaleString()}</Text><Text style={styles.metricLabel}>Tickets Today</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Sub-Agents</Text></View></View>
          <View style={styles.subAgentList}>
            {subAgents.map((sa) => (
              <TouchableOpacity key={sa.id} style={styles.subAgentCard} onPress={() => router.push(`/ai-agent/customer-experience/${sa.id}`)}>
                <View style={styles.subAgentLeft}>
                  <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={20} color={sa.color} /></View>
                  <View><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentStat, { color: theme.colors.secondaryText }]}>{sa.handled} handled</Text></View>
                </View>
                <View style={styles.subAgentRight}><View style={[styles.activeDot, { backgroundColor: '#10B981' }]} /><ChevronRight size={18} color={theme.colors.secondaryText} /></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Headphones size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Channel Performance</Text></View></View>
          <View style={styles.channelList}>
            {channelMetrics.map((ch) => (
              <View key={ch.channel} style={styles.channelCard}>
                <View style={styles.channelHeader}><Text style={[styles.channelName, { color: theme.colors.text }]}>{ch.channel}</Text><Text style={[styles.channelVolume, { color: theme.colors.secondaryText }]}>{ch.volume} tickets</Text></View>
                <View style={styles.channelMetrics}>
                  <Text style={[styles.channelMetric, { color: '#10B981' }]}>CSAT {ch.csat}</Text>
                  <Text style={[styles.channelMetric, { color: '#3B82F6' }]}>Avg {ch.avgTime}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[
              { msg: 'Live Chat CSAT up 2.1% after AI auto-response deployment', color: '#10B981' },
              { msg: 'Escalation rate dropped 18% — Knowledge Base improvements effective', color: '#3B82F6' },
              { msg: 'Phone queue wait times increasing — recommend callback feature', color: '#F59E0B' },
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI VP Support is part of our Enterprise suite. Upgrade to activate.</Text>
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
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Support Analytics</Text></View></View>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Total Tickets</Text><Text style={[styles.analyticsValue, { color: '#3B82F6' }]}>8,421</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Resolution Rate</Text><Text style={[styles.analyticsValue, { color: '#10B981' }]}>92.4%</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Escalation Rate</Text><Text style={[styles.analyticsValue, { color: '#F59E0B' }]}>7.6%</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>SLA Compliance</Text><Text style={[styles.analyticsValue, { color: '#8B5CF6' }]}>98.2%</Text></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Headphones, component: renderOverviewTab() },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalyticsTab() },
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
  channelList: { gap: 12 },
  channelCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  channelHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  channelName: { fontSize: 15, fontWeight: '700' },
  channelVolume: { fontSize: 13 },
  channelMetrics: { flexDirection: 'row', gap: 20 },
  channelMetric: { fontSize: 13, fontWeight: '600' },
  insightsList: { gap: 12 },
  insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  insightMessage: { fontSize: 14, lineHeight: 20 },
  analyticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  analyticsItem: { width: '48%', backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  analyticsLabel: { fontSize: 12, marginBottom: 8 },
  analyticsValue: { fontSize: 24, fontWeight: '800' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
