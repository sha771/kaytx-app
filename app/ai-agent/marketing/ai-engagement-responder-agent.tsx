import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { MessageCircle, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Heart, Users, Clock } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-engagement-responder', name: 'AI Engagement Responder', title: 'Real-time Community Management',
  description: 'Manages real-time engagement across all social platforms â€” responding to comments, DMs, and mentions with brand-appropriate, personalized replies.',
  capabilities: ['Comment Management', 'DM Responses', 'Mention Tracking', 'Sentiment Analysis', 'Escalation Rules', 'Brand Voice', 'Response Templates', 'Priority Routing'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-social-media-manager-agent',
};

export default function AIEngagementResponderAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { responses: 2480, avgTime: '2m 14s', satisfaction: '96%', escalated: 18 };
  const responseTypes = [
    { type: 'Comments', count: 1420, avgTime: '1m 48s', color: '#06B6D4' },
    { type: 'DMs', count: 680, avgTime: '3m 12s', color: '#10B981' },
    { type: 'Mentions', count: 380, avgTime: '2m 06s', color: '#8B5CF6' },
  ];
  const sentimentBreakdown = [
    { sentiment: 'Positive', count: 1860, pct: '75%', color: '#10B981' },
    { sentiment: 'Neutral', count: 496, pct: '20%', color: '#06B6D4' },
    { sentiment: 'Negative', count: 124, pct: '5%', color: '#EF4444' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-social-media-manager-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Social Media Manager</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><MessageCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.responses}</Text><Text style={styles.metricLabel}>Responses</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgTime}</Text><Text style={styles.metricLabel}>Avg Response</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Heart size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.satisfaction}</Text><Text style={styles.metricLabel}>Satisfaction</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Users size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.escalated}</Text><Text style={styles.metricLabel}>Escalated</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Response Types</Text></View></View>
          <View style={styles.typeList}>
            {responseTypes.map((r) => (
              <View key={r.type} style={styles.typeCard}>
                <View style={styles.typeHeader}><Text style={[styles.typeName, { color: theme.colors.text }]}>{r.type}</Text><Text style={[styles.typeCount, { color: r.color }]}>{r.count}</Text></View>
                <Text style={[styles.typeTime, { color: theme.colors.secondaryText }]}>Avg response: {r.avgTime}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Heart size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sentiment Breakdown</Text></View></View>
          <View style={styles.sentimentList}>
            {sentimentBreakdown.map((s) => (
              <View key={s.sentiment} style={styles.sentimentCard}>
                <View style={styles.sentimentHeader}><Text style={[styles.sentimentName, { color: theme.colors.text }]}>{s.sentiment}</Text><Text style={[styles.sentimentPct, { color: s.color }]}>{s.pct}</Text></View>
                <Text style={[styles.sentimentCount, { color: theme.colors.secondaryText }]}>{s.count} interactions</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Response time improved 32% after implementing priority routing', color: '#10B981' },{ msg: 'Negative sentiment reduced from 8% to 5% â€” proactive outreach working', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Engagement Responder is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: MessageCircle, component: renderOverviewTab() },
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
  typeList: { gap: 12 }, typeCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  typeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, typeName: { fontSize: 14, fontWeight: '600', flex: 1 }, typeCount: { fontSize: 16, fontWeight: '700' },
  typeTime: { fontSize: 12 },
  sentimentList: { gap: 12 }, sentimentCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  sentimentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, sentimentName: { fontSize: 14, fontWeight: '600', flex: 1 }, sentimentPct: { fontSize: 14, fontWeight: '700' },
  sentimentCount: { fontSize: 12 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
