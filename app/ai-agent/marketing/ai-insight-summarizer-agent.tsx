import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { FileText, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Brain, BookOpen, Lightbulb } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-insight-summarizer', name: 'AI Insight Summarizer', title: 'Marketing Intelligence Digest',
  description: 'Synthesizes complex marketing data into actionable insights, executive summaries, and strategic recommendations — turning raw analytics into clear decisions.',
  capabilities: ['Insight Generation', 'Executive Summaries', 'Trend Narratives', 'Anomaly Detection', 'Recommendation Engine', 'Weekly Digests', 'Competitive Intelligence', 'Strategic Briefs'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-marketing-analytics-agent',
};

export default function AIInsightSummarizerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { insights: 842, summaries: 186, actions: 324, accuracy: '96%' };
  const insightTypes = [
    { type: 'Executive Summary', count: 24, consumers: 8, color: '#06B6D4' },
    { type: 'Weekly Digest', count: 52, consumers: 18, color: '#10B981' },
    { type: 'Anomaly Alert', count: 86, consumers: 12, color: '#EF4444' },
    { type: 'Strategic Brief', count: 24, consumers: 4, color: '#8B5CF6' },
  ];
  const recentInsights = [
    { title: 'Q2 Marketing ROI up 24% YoY', category: 'Performance', action: 'Increase Q3 budget 15%', priority: 'high' },
    { title: 'Email churn risk detected in enterprise segment', category: 'Risk', action: 'Launch re-engagement campaign', priority: 'high' },
    { title: 'Social engagement shifted to video content', category: 'Trend', action: 'Reallocate 20% budget to video', priority: 'medium' },
    { title: 'Paid search CPA dropped 12% after bid optimization', category: 'Win', action: 'Expand to 3 new ad groups', priority: 'medium' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-marketing-analytics-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Marketing Analytics Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Lightbulb size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.insights}</Text><Text style={styles.metricLabel}>Insights</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><BookOpen size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.summaries}</Text><Text style={styles.metricLabel}>Summaries</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Zap size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.actions}</Text><Text style={styles.metricLabel}>Actions</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Brain size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.accuracy}</Text><Text style={styles.metricLabel}>Accuracy</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><FileText size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Insight Types</Text></View></View>
          <View style={styles.typeList}>
            {insightTypes.map((i) => (
              <View key={i.type} style={styles.typeCard}>
                <View style={styles.typeHeader}><Text style={[styles.typeName, { color: theme.colors.text }]}>{i.type}</Text><Text style={[styles.typeCount, { color: i.color }]}>{i.count}</Text></View>
                <Text style={[styles.typeConsumers, { color: theme.colors.secondaryText }]}>{i.consumers} consumers</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Insights</Text></View></View>
          <View style={styles.insightList}>
            {recentInsights.map((i) => (
              <View key={i.title} style={styles.insightItemCard}>
                <View style={styles.insightItemHeader}><Text style={[styles.insightItemTitle, { color: theme.colors.text }]}>{i.title}</Text><View style={[styles.priorityBadge, { backgroundColor: i.priority === 'high' ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.priorityText, { color: i.priority === 'high' ? '#EF4444' : '#F59E0B' }]}>{i.priority}</Text></View></View>
                <View style={styles.insightItemMeta}><Text style={[styles.insightItemCat, { color: '#8B5CF6' }]}>{i.category}</Text><Text style={[styles.insightItemAction, { color: '#10B981' }]}>→ {i.action}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Brain size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.aiInsightsList}>
            {[{ msg: 'Insight-to-action rate improved from 38% to 62% — recommendations more actionable', color: '#10B981' },{ msg: 'Anomaly detection caught 3 revenue-impacting issues before they escalated', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.aiInsightCard, { borderLeftColor: ins.color }]}><Text style={[styles.aiInsightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Insight Summarizer is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: FileText, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  typeList: { gap: 12 }, typeCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  typeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, typeName: { fontSize: 14, fontWeight: '600', flex: 1 }, typeCount: { fontSize: 14, fontWeight: '700' },
  typeConsumers: { fontSize: 12 },
  insightList: { gap: 12 }, insightItemCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  insightItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, insightItemTitle: { fontSize: 14, fontWeight: '600', flex: 1, marginRight: 8 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, priorityText: { fontSize: 11, fontWeight: '600' },
  insightItemMeta: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' }, insightItemCat: { fontSize: 12, fontWeight: '600' }, insightItemAction: { fontSize: 12, fontWeight: '600' },
  aiInsightsList: { gap: 12 }, aiInsightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, aiInsightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
