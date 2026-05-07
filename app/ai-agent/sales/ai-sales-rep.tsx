import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Phone, Users, Clock, Target, Zap, ChevronRight, TrendingUp, Sparkles, BarChart3, CheckCircle, Shield, Lock, DollarSign, Search, FileText, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AiSalesRepPage() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-sales-rep')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { dealsClosed: 142, pipelineValue: '$2.8M', conversionRate: '28.4%', avgCycleDays: '18d' };
  const subAgents = [
    { id: 'discovery-questioner', name: 'Discovery Questioner', icon: Search, handled: 384, color: '#06B6D4' },
    { id: 'demo-coordinator', name: 'Demo Coordinator', icon: Eye, handled: 218, color: '#10B981' },
    { id: 'objection-handler', name: 'Objection Handler', icon: Shield, handled: 562, color: '#8B5CF6' },
  ];
  const pipelineStages = [
    { stage: 'Prospecting', count: 84, value: '$420K', conversion: '62%' },
    { stage: 'Discovery', count: 52, value: '$780K', conversion: '54%' },
    { stage: 'Demo', count: 28, value: '$840K', conversion: '48%' },
    { stage: 'Proposal', count: 18, value: '$540K', conversion: '72%' },
  ];
  const recentDeals = [
    { company: 'TechCorp Industries', value: '$120K', stage: 'Closed Won', daysInStage: 0 },
    { company: 'CloudSync Ltd', value: '$84K', stage: 'Negotiation', daysInStage: 3 },
    { company: 'DataFlow Inc', value: '$56K', stage: 'Demo', daysInStage: 5 },
  ];

  const renderOverview = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#E65100', '#BF360C']} style={styles.metricCard}>
            <DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.dealsClosed}</Text><Text style={styles.metricLabel}>Deals Closed</Text>
          </LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.pipelineValue}</Text><Text style={styles.metricLabel}>Pipeline</Text>
          </LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Target size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.conversionRate}</Text><Text style={styles.metricLabel}>Conversion</Text>
          </LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgCycleDays}</Text><Text style={styles.metricLabel}>Avg Cycle</Text>
          </LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Zap size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text></View>
          </View>
          <View style={styles.subAgentList}>
            {subAgents.map((sa) => (
              <TouchableOpacity key={sa.id} style={styles.subAgentCard} onPress={() => router.push(`/ai-agent/sales/sub-agents/${sa.id}`)}>
                <View style={styles.subAgentLeft}>
                  <View style={[styles.subAgentIcon, { backgroundColor: sa.color + '15' }]}><sa.icon size={20} color={sa.color} /></View>
                  <View><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sa.name}</Text><Text style={[styles.subAgentStat, { color: theme.colors.secondaryText }]}>{sa.handled} tasks handled</Text></View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><View style={[styles.activeDot, { backgroundColor: '#10B981' }]} /><ChevronRight size={18} color={theme.colors.secondaryText} /></View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pipeline Stages</Text></View>
          </View>
          {pipelineStages.map((p, idx) => (
            <View key={p.stage} style={styles.pipelineItem}>
              <View style={styles.pipelineLeft}>
                <View style={[styles.pipelineNumber, { backgroundColor: '#E6510015' }]}><Text style={[styles.pipelineNumberText, { color: '#E65100' }]}>{idx + 1}</Text></View>
                <View><Text style={[styles.pipelineStage, { color: theme.colors.text }]}>{p.stage}</Text><Text style={[styles.pipelineValue, { color: theme.colors.secondaryText }]}>{p.count} deals · {p.value}</Text></View>
              </View>
              <View style={[styles.conversionBadge, { backgroundColor: parseFloat(p.conversion) > 60 ? '#10B98120' : '#F59E0B20' }]}>
                <Text style={[styles.conversionText, { color: parseFloat(p.conversion) > 60 ? '#10B981' : '#F59E0B' }]}>{p.conversion}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><FileText size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Deals</Text></View>
          </View>
          {recentDeals.map((d) => (
            <View key={d.company} style={styles.dealCard}>
              <View style={styles.dealHeader}>
                <View style={styles.dealLeft}>
                  <Text style={[styles.dealCompany, { color: theme.colors.text }]}>{d.company}</Text>
                  <Text style={[styles.dealValue, { color: '#10B981' }]}>{d.value}</Text>
                </View>
                <View style={[styles.stageBadge, { backgroundColor: d.stage === 'Closed Won' ? '#10B98120' : d.stage === 'Negotiation' ? '#06B6D420' : '#F59E0B20' }]}>
                  <Text style={[styles.stageText, { color: d.stage === 'Closed Won' ? '#10B981' : d.stage === 'Negotiation' ? '#06B6D4' : '#F59E0B' }]}>{d.stage}</Text>
                </View>
              </View>
              {d.daysInStage > 0 && <Text style={[styles.dealDays, { color: theme.colors.secondaryText }]}>{d.daysInStage}d in stage</Text>}
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View>
          </View>
          {[{ msg: 'Discovery conversion up 12% with AI questioner — expand to all territories', color: '#10B981' }, { msg: 'Price objections down 18% after objection handler deployment', color: '#06B6D4' }, { msg: '3 deals stalled in Demo stage >7 days — follow-up recommended', color: '#EF4444' }].map((ins, idx) => (
            <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
          ))}
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Sales Rep is part of our Enterprise suite. Upgrade your plan to activate this agent.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderAnalytics = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text></View>
          </View>
          <View style={styles.grid2}>
            <View style={styles.grid2Item}><Text style={[styles.grid2Label, { color: theme.colors.secondaryText }]}>Win Rate</Text><Text style={[styles.grid2Value, { color: '#10B981' }]}>92%</Text></View>
            <View style={styles.grid2Item}><Text style={[styles.grid2Label, { color: theme.colors.secondaryText }]}>Avg Deal Size</Text><Text style={[styles.grid2Value, { color: '#E65100' }]}>$68K</Text></View>
            <View style={styles.grid2Item}><Text style={[styles.grid2Label, { color: theme.colors.secondaryText }]}>Activities/Day</Text><Text style={[styles.grid2Value, { color: '#06B6D4' }]}>24</Text></View>
            <View style={styles.grid2Item}><Text style={[styles.grid2Label, { color: theme.colors.secondaryText }]}>ROI</Text><Text style={[styles.grid2Value, { color: '#8B5CF6' }]}>4.2x</Text></View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><TrendingUp size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quarterly Performance</Text></View>
          </View>
          <View style={styles.trendList}>
            {[{ period: 'Q1', deals: 32, value: '$960K', conv: '24.2%' }, { period: 'Q2', deals: 38, value: '$1.1M', conv: '26.8%' }, { period: 'Q3', deals: 42, value: '$1.3M', conv: '28.4%' }].map((q) => (
              <View key={q.period} style={styles.trendItem}>
                <Text style={[styles.trendPeriod, { color: theme.colors.text }]}>{q.period}</Text>
                <View style={styles.trendMetrics}>
                  <Text style={[styles.trendMetric, { color: '#E65100' }]}>{q.deals} deals</Text>
                  <Text style={[styles.trendMetric, { color: '#10B981' }]}>{q.value}</Text>
                  <Text style={[styles.trendMetric, { color: '#8B5CF6' }]}>{q.conv}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Phone, component: renderOverview() },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalytics() },
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
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  subAgentList: { gap: 12 },
  subAgentCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  subAgentLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  subAgentIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  subAgentName: { fontSize: 15, fontWeight: '700' },
  subAgentStat: { fontSize: 12 },
  activeDot: { width: 8, height: 8, borderRadius: 4 },
  pipelineItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  pipelineLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pipelineNumber: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  pipelineNumberText: { fontSize: 12, fontWeight: '800' },
  pipelineStage: { fontSize: 14, fontWeight: '600' },
  pipelineValue: { fontSize: 11, marginTop: 2 },
  conversionBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  conversionText: { fontSize: 12, fontWeight: '700' },
  dealCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16, marginBottom: 12 },
  dealHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  dealLeft: { flex: 1 },
  dealCompany: { fontSize: 15, fontWeight: '700' },
  dealValue: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  stageBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  stageText: { fontSize: 11, fontWeight: '600' },
  dealDays: { fontSize: 12, marginTop: 4 },
  insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)', marginBottom: 8 },
  insightMessage: { fontSize: 14, lineHeight: 20 },
  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  grid2Item: { width: '48%', backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  grid2Label: { fontSize: 12, marginBottom: 8 },
  grid2Value: { fontSize: 24, fontWeight: '800' },
  trendList: { gap: 12 },
  trendItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  trendPeriod: { fontSize: 16, fontWeight: '700', width: 50 },
  trendMetrics: { flexDirection: 'row', gap: 24 },
  trendMetric: { fontSize: 14, fontWeight: '600' },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
