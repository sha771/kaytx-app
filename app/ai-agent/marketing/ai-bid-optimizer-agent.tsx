import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { DollarSign, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Target, BarChart3, Percent } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-bid-optimizer', name: 'AI Bid Optimizer', title: 'Smart Bidding & Budget Allocation',
  description: 'Optimizes ad bids in real-time using ML-driven strategies — maximizing ROAS while minimizing wasted spend across all campaign types and platforms.',
  capabilities: ['Smart Bidding', 'Budget Allocation', 'ROAS Optimization', 'Bid Strategy Testing', 'Frequency Capping', 'Dayparting', 'Competitor Bid Tracking', 'Spend Pacing'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-ad-campaign-manager-agent',
};

export default function AIBidOptimizerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { roas: '4.2x', savings: '28%', avgCPC: '$1.24', optimizedBids: 8640 };
  const bidStrategies = [
    { strategy: 'Target ROAS', campaigns: 12, avgROAS: '5.1x', color: '#10B981' },
    { strategy: 'Maximize Conversions', campaigns: 8, avgROAS: '3.8x', color: '#06B6D4' },
    { strategy: 'Target CPA', campaigns: 6, avgROAS: '3.2x', color: '#8B5CF6' },
    { strategy: 'Manual Enhanced', campaigns: 4, avgROAS: '2.9x', color: '#F59E0B' },
  ];
  const recentOptimizations = [
    { campaign: 'Enterprise AI - Search', before: '$2.40', after: '$1.86', improvement: '+22% ROAS' },
    { campaign: 'Product Launch - Social', before: '$3.10', after: '$2.42', improvement: '+18% ROAS' },
    { campaign: 'Retargeting - Display', before: '$0.82', after: '$0.64', improvement: '+31% ROAS' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-ad-campaign-manager-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Ad Campaign Manager</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.roas}</Text><Text style={styles.metricLabel}>Avg ROAS</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><DollarSign size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.savings}</Text><Text style={styles.metricLabel}>Savings</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Percent size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgCPC}</Text><Text style={styles.metricLabel}>Avg CPC</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.optimizedBids}</Text><Text style={styles.metricLabel}>Bids/Day</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Target size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Bid Strategies</Text></View></View>
          <View style={styles.strategyList}>
            {bidStrategies.map((s) => (
              <View key={s.strategy} style={styles.strategyCard}>
                <View style={styles.strategyHeader}><Text style={[styles.strategyName, { color: theme.colors.text }]}>{s.strategy}</Text><Text style={[styles.strategyROAS, { color: s.color }]}>{s.avgROAS}</Text></View>
                <Text style={[styles.strategyCampaigns, { color: theme.colors.secondaryText }]}>{s.campaigns} campaigns</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Optimizations</Text></View></View>
          <View style={styles.optList}>
            {recentOptimizations.map((o) => (
              <View key={o.campaign} style={styles.optCard}>
                <Text style={[styles.optCampaign, { color: theme.colors.text }]}>{o.campaign}</Text>
                <View style={styles.optMetrics}>
                  <Text style={[styles.optBefore, { color: theme.colors.secondaryText }]}>CPC: {o.before}</Text>
                  <Text style={[styles.optArrow, { color: theme.colors.secondaryText }]}>→</Text>
                  <Text style={[styles.optAfter, { color: '#10B981' }]}>{o.after}</Text>
                  <Text style={[styles.optImprovement, { color: '#06B6D4' }]}>{o.improvement}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Target ROAS strategy outperforms manual by 76% — expand to 4 more campaigns', color: '#10B981' },{ msg: 'Dayparting optimization saving $2.4K/month on low-conversion hours', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Bid Optimizer is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: DollarSign, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  strategyList: { gap: 12 }, strategyCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  strategyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, strategyName: { fontSize: 14, fontWeight: '600', flex: 1 }, strategyROAS: { fontSize: 14, fontWeight: '700' },
  strategyCampaigns: { fontSize: 12 },
  optList: { gap: 12 }, optCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  optCampaign: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  optMetrics: { flexDirection: 'row', gap: 8, alignItems: 'center' }, optBefore: { fontSize: 12 }, optArrow: { fontSize: 12 }, optAfter: { fontSize: 12, fontWeight: '600' }, optImprovement: { fontSize: 12, fontWeight: '600', marginLeft: 'auto' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
