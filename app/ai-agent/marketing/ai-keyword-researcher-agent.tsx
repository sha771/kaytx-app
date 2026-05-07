import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Search, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Target, Activity, Hash, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-keyword-researcher', name: 'AI Keyword Researcher', title: 'Keyword Discovery & Analysis',
  description: 'Discovers high-value keywords through competitive analysis, search volume assessment, and intent classification â€” powering SEO strategy with data.',
  capabilities: ['Keyword Discovery', 'Search Volume Analysis', 'Competitor Research', 'Intent Classification', 'Long-tail Keywords', 'Gap Analysis', 'Trend Tracking', 'Priority Scoring'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-seo-specialist-agent',
};

export default function AIKeywordResearcherAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { keywords: 420, opportunities: 86, avgVolume: '2.4K', avgDifficulty: '42%' };
  const topKeywords = [
    { term: 'ai workforce platform', volume: '8.4K', difficulty: 'Medium', intent: 'Commercial', priority: 'High' },
    { term: 'enterprise ai agents', volume: '6.2K', difficulty: 'High', intent: 'Informational', priority: 'High' },
    { term: 'ai employee management', volume: '4.8K', difficulty: 'Low', intent: 'Commercial', priority: 'Medium' },
    { term: 'ai marketing automation', volume: '12.1K', difficulty: 'Medium', intent: 'Commercial', priority: 'High' },
  ];
  const opportunities = [
    { type: 'Competitor Gap', count: 24, potential: 'High', color: '#10B981' },
    { type: 'Long-tail', count: 42, potential: 'Medium', color: '#06B6D4' },
    { type: 'Trending', count: 18, potential: 'High', color: '#F59E0B' },
    { type: 'Question-based', count: 12, potential: 'Medium', color: '#8B5CF6' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-seo-specialist-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI SEO Specialist</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Hash size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.keywords}</Text><Text style={styles.metricLabel}>Keywords</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.opportunities}</Text><Text style={styles.metricLabel}>Opportunities</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Eye size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgVolume}</Text><Text style={styles.metricLabel}>Avg Volume</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgDifficulty}</Text><Text style={styles.metricLabel}>Avg Difficulty</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Search size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Keywords</Text></View></View>
          <View style={styles.keywordList}>
            {topKeywords.map((k) => (
              <View key={k.term} style={styles.keywordCard}>
                <View style={styles.keywordHeader}><Text style={[styles.keywordTerm, { color: theme.colors.text }]}>{k.term}</Text><View style={[styles.priorityBadge, { backgroundColor: k.priority === 'High' ? '#10B98120' : '#06B6D420' }]}><Text style={[styles.priorityText, { color: k.priority === 'High' ? '#10B981' : '#06B6D4' }]}>{k.priority}</Text></View></View>
                <View style={styles.keywordMetrics}><Text style={[styles.keywordMetric, { color: theme.colors.secondaryText }]}>Vol: {k.volume}</Text><Text style={[styles.keywordMetric, { color: '#06B6D4' }]}>{k.difficulty}</Text><Text style={[styles.keywordMetric, { color: '#8B5CF6' }]}>{k.intent}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><TrendingUp size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Opportunities</Text></View></View>
          <View style={styles.opportunityList}>
            {opportunities.map((o) => (
              <View key={o.type} style={styles.opportunityCard}>
                <View style={styles.opportunityHeader}><Text style={[styles.opportunityType, { color: theme.colors.text }]}>{o.type}</Text><Text style={[styles.opportunityCount, { color: o.color }]}>{o.count}</Text></View>
                <Text style={[styles.opportunityPotential, { color: theme.colors.secondaryText }]}>Potential: {o.potential}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Competitor gap identified: 24 keywords with high volume, low difficulty', color: '#10B981' },{ msg: 'Question-based keywords trending +34% â€” optimize FAQ content', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Keyword Researcher is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Search, component: renderOverviewTab() },
  ];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  keywordList: { gap: 12 }, keywordCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  keywordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, keywordTerm: { fontSize: 14, fontWeight: '600', flex: 1 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, priorityText: { fontSize: 11, fontWeight: '600' },
  keywordMetrics: { flexDirection: 'row', gap: 12 }, keywordMetric: { fontSize: 11 },
  opportunityList: { gap: 12 }, opportunityCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  opportunityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, opportunityType: { fontSize: 14, fontWeight: '600', flex: 1 }, opportunityCount: { fontSize: 16, fontWeight: '700' },
  opportunityPotential: { fontSize: 12 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
