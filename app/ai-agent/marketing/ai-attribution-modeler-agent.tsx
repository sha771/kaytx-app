import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { GitBranch, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, BarChart3, Target, Layers } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-attribution-modeler', name: 'AI Attribution Modeler', title: 'Multi-touch Attribution Engine',
  description: 'Models multi-touch attribution across all channels and touchpoints — revealing the true impact of each marketing interaction on revenue and conversions.',
  capabilities: ['Multi-touch Attribution', 'Last-click Analysis', 'First-click Analysis', 'Data-driven Models', 'Channel Weighting', 'Touchpoint Mapping', 'Incrementality Testing', 'Custom Models'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-marketing-analytics-agent',
};

export default function AIAttributionModelerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { models: 12, touchpoints: '4.8K', accuracy: '94%', channels: 8 };
  const attributionModels = [
    { model: 'Data-driven', weight: 'AI-optimized', accuracy: '94%', color: '#10B981' },
    { model: 'Time-decay', weight: 'Recency-biased', accuracy: '82%', color: '#06B6D4' },
    { model: 'Position-based', weight: '40/20/40', accuracy: '78%', color: '#8B5CF6' },
    { model: 'Last-click', weight: '100% last', accuracy: '62%', color: '#F59E0B' },
  ];
  const channelAttribution = [
    { channel: 'Paid Search', revenue: '$284K', pct: '32%', color: '#06B6D4' },
    { channel: 'Organic', revenue: '$196K', pct: '22%', color: '#10B981' },
    { channel: 'Email', revenue: '$142K', pct: '16%', color: '#8B5CF6' },
    { channel: 'Social', revenue: '$98K', pct: '11%', color: '#F59E0B' },
    { channel: 'Direct', revenue: '$168K', pct: '19%', color: '#EF4444' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-marketing-analytics-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Marketing Analytics Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Layers size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.models}</Text><Text style={styles.metricLabel}>Models</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><GitBranch size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.touchpoints}</Text><Text style={styles.metricLabel}>Touchpoints</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.accuracy}</Text><Text style={styles.metricLabel}>Accuracy</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.channels}</Text><Text style={styles.metricLabel}>Channels</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><GitBranch size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Attribution Models</Text></View></View>
          <View style={styles.modelList}>
            {attributionModels.map((m) => (
              <View key={m.model} style={styles.modelCard}>
                <View style={styles.modelHeader}><Text style={[styles.modelName, { color: theme.colors.text }]}>{m.model}</Text><Text style={[styles.modelAccuracy, { color: m.color }]}>{m.accuracy}</Text></View>
                <Text style={[styles.modelWeight, { color: theme.colors.secondaryText }]}>Weight: {m.weight}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Channel Attribution</Text></View></View>
          <View style={styles.channelList}>
            {channelAttribution.map((c) => (
              <View key={c.channel} style={styles.channelCard}>
                <View style={styles.channelHeader}><View style={[styles.channelDot, { backgroundColor: c.color }]} /><Text style={[styles.channelName, { color: theme.colors.text }]}>{c.channel}</Text><Text style={[styles.channelPct, { color: c.color }]}>{c.pct}</Text></View>
                <Text style={[styles.channelRevenue, { color: theme.colors.secondaryText }]}>{c.revenue} attributed revenue</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Data-driven model shows email contributes 16% but last-click only credits 4% — undervalued channel', color: '#10B981' },{ msg: 'Paid search incrementality 32% lower than attributed — optimize budget allocation', color: '#EF4444' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Attribution Modeler is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: GitBranch, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  modelList: { gap: 12 }, modelCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  modelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, modelName: { fontSize: 14, fontWeight: '600', flex: 1 }, modelAccuracy: { fontSize: 14, fontWeight: '700' },
  modelWeight: { fontSize: 12 },
  channelList: { gap: 12 }, channelCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  channelHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }, channelDot: { width: 10, height: 10, borderRadius: 5 }, channelName: { fontSize: 14, fontWeight: '600', flex: 1 }, channelPct: { fontSize: 14, fontWeight: '700' },
  channelRevenue: { fontSize: 12 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
