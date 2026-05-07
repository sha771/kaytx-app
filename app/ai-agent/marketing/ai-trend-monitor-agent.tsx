import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Hash, Eye, Radio } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-trend-monitor', name: 'AI Trend Monitor', title: 'Social Intelligence & Signals',
  description: 'Monitors social platforms for emerging trends, viral content, and industry shifts â€” providing early signals for content and campaign strategy.',
  capabilities: ['Trend Detection', 'Viral Content Alerts', 'Industry Monitoring', 'Hashtag Tracking', 'Competitor Moves', 'Cultural Signals', 'Sentiment Shifts', 'Opportunity Alerts'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-social-media-manager-agent',
};

export default function AITrendMonitorAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { trends: 156, alerts: 24, signals: 892, accuracy: '91%' };
  const trendingTopics = [
    { topic: 'AI Agent Workforce', velocity: '+340%', platform: 'LinkedIn', urgency: 'high' },
    { topic: 'Enterprise Automation', velocity: '+180%', platform: 'Twitter', urgency: 'medium' },
    { topic: 'Marketing AI Tools', velocity: '+120%', platform: 'Multiple', urgency: 'medium' },
  ];
  const alerts = [
    { type: 'Viral Content', msg: 'Competitor post on AI agents gaining 50K+ engagements', color: '#EF4444' },
    { type: 'Industry Shift', msg: 'Gartner report predicts 80% marketing AI adoption by 2027', color: '#F59E0B' },
    { type: 'Hashtag Surge', msg: '#AIWorkforce trending in 3 regions â€” content opportunity', color: '#10B981' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-social-media-manager-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Social Media Manager</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.trends}</Text><Text style={styles.metricLabel}>Trends</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Radio size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.alerts}</Text><Text style={styles.metricLabel}>Alerts</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Hash size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.signals}</Text><Text style={styles.metricLabel}>Signals</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Eye size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.accuracy}</Text><Text style={styles.metricLabel}>Accuracy</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><TrendingUp size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trending Topics</Text></View></View>
          <View style={styles.trendList}>
            {trendingTopics.map((t) => (
              <View key={t.topic} style={styles.trendCard}>
                <View style={styles.trendHeader}><Text style={[styles.trendTopic, { color: theme.colors.text }]}>{t.topic}</Text><View style={[styles.urgencyBadge, { backgroundColor: t.urgency === 'high' ? '#EF444420' : '#F59E0B20' }]}><Text style={[styles.urgencyText, { color: t.urgency === 'high' ? '#EF4444' : '#F59E0B' }]}>{t.urgency}</Text></View></View>
                <View style={styles.trendMeta}><Text style={[styles.trendVelocity, { color: '#10B981' }]}>{t.velocity}</Text><Text style={[styles.trendPlatform, { color: theme.colors.secondaryText }]}>{t.platform}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Radio size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Alerts</Text></View></View>
          <View style={styles.alertList}>
            {alerts.map((a, idx) => (
              <View key={idx} style={[styles.alertCard, { borderLeftColor: a.color }]}><Text style={[styles.alertType, { color: a.color }]}>{a.type}</Text><Text style={[styles.alertMsg, { color: theme.colors.text }]}>{a.msg}</Text></View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'AI workforce topic trending +340% â€” create content within 48h for max reach', color: '#10B981' },{ msg: 'Competitor gap detected: no one covering AI agent ROI â€” first-mover advantage', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Trend Monitor is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: TrendingUp, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  trendList: { gap: 12 }, trendCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  trendHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, trendTopic: { fontSize: 14, fontWeight: '600', flex: 1 },
  urgencyBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, urgencyText: { fontSize: 11, fontWeight: '600' },
  trendMeta: { flexDirection: 'row', gap: 12 }, trendVelocity: { fontSize: 12, fontWeight: '700' }, trendPlatform: { fontSize: 12 },
  alertList: { gap: 12 }, alertCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, alertType: { fontSize: 12, fontWeight: '700', marginBottom: 4 }, alertMsg: { fontSize: 14, lineHeight: 20 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
