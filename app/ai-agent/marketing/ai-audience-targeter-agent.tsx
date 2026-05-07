import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Target, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Users, Filter, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-audience-targeter', name: 'AI Audience Targeter', title: 'Precision Audience Engineering',
  description: 'Builds and refines target audiences using lookalike modeling, behavioral signals, and intent data — ensuring ads reach the highest-converting prospects.',
  capabilities: ['Lookalike Audiences', 'Behavioral Targeting', 'Intent Data', 'Custom Audiences', 'Exclusion Lists', 'Audience Overlap', 'Segment Expansion', 'Predictive Scoring'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-ad-campaign-manager-agent',
};

export default function AIAudienceTargeterAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { audiences: 64, reach: '2.4M', avgCVR: '3.8%', lookalikes: 18 };
  const audienceTypes = [
    { type: 'Lookalike', count: 18, reach: '840K', color: '#06B6D4' },
    { type: 'Behavioral', count: 22, reach: '620K', color: '#10B981' },
    { type: 'Intent-based', count: 14, reach: '480K', color: '#8B5CF6' },
    { type: 'Custom', count: 10, reach: '460K', color: '#F59E0B' },
  ];
  const topAudiences = [
    { name: 'Enterprise Decision Makers', size: '120K', cvr: '5.2%', cpa: '$42' },
    { name: 'SaaS Buyers Lookalike', size: '340K', cvr: '3.8%', cpa: '$56' },
    { name: 'Marketing AI Intent', size: '86K', cvr: '6.1%', cpa: '$38' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-ad-campaign-manager-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Ad Campaign Manager</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Users size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.audiences}</Text><Text style={styles.metricLabel}>Audiences</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Eye size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.reach}</Text><Text style={styles.metricLabel}>Total Reach</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgCVR}</Text><Text style={styles.metricLabel}>Avg CVR</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Filter size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.lookalikes}</Text><Text style={styles.metricLabel}>Lookalikes</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Filter size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audience Types</Text></View></View>
          <View style={styles.audienceTypeList}>
            {audienceTypes.map((a) => (
              <View key={a.type} style={styles.audienceTypeCard}>
                <View style={styles.audienceTypeHeader}><Text style={[styles.audienceTypeName, { color: theme.colors.text }]}>{a.type}</Text><Text style={[styles.audienceTypeCount, { color: a.color }]}>{a.count}</Text></View>
                <Text style={[styles.audienceTypeReach, { color: theme.colors.secondaryText }]}>Reach: {a.reach}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Target size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performing Audiences</Text></View></View>
          <View style={styles.topList}>
            {topAudiences.map((a) => (
              <View key={a.name} style={styles.topCard}>
                <Text style={[styles.topName, { color: theme.colors.text }]}>{a.name}</Text>
                <View style={styles.topMetrics}><Text style={[styles.topMetric, { color: theme.colors.secondaryText }]}>{a.size}</Text><Text style={[styles.topMetric, { color: '#06B6D4' }]}>CVR: {a.cvr}</Text><Text style={[styles.topMetric, { color: '#10B981' }]}>CPA: {a.cpa}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Intent-based audiences convert 62% better than broad targeting', color: '#10B981' },{ msg: 'Lookalike expansion opportunity: 3 audiences can grow 40% without CPA increase', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Audience Targeter is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: Target, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  audienceTypeList: { gap: 12 }, audienceTypeCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  audienceTypeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, audienceTypeName: { fontSize: 14, fontWeight: '600', flex: 1 }, audienceTypeCount: { fontSize: 14, fontWeight: '700' },
  audienceTypeReach: { fontSize: 12 },
  topList: { gap: 12 }, topCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  topName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  topMetrics: { flexDirection: 'row', gap: 12 }, topMetric: { fontSize: 11 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
