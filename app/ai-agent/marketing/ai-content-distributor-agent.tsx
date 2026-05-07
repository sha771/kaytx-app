import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Share2, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Globe, Clock, Send } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-content-distributor', name: 'AI Content Distributor', title: 'Multi-channel Publishing Engine',
  description: 'Distributes content across all channels with optimal timing, platform-specific formatting, and performance tracking for maximum reach and engagement.',
  capabilities: ['Multi-channel Publishing', 'Scheduling', 'Format Optimization', 'Cross-posting', 'Syndication', 'Analytics', 'A/B Testing', 'Audience Targeting'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-content-marketing-agent',
};

export default function AIContentDistributorAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { distributed: 312, reach: '2.4M', engagement: '86.2K', channels: 12 };
  const channelPerformance = [
    { channel: 'LinkedIn', posts: 84, reach: '840K', engagement: '42K', color: '#0A66C2' },
    { channel: 'Twitter/X', posts: 124, reach: '620K', engagement: '18K', color: '#1DA1F2' },
    { channel: 'Newsletter', posts: 42, reach: '420K', engagement: '12K', color: '#10B981' },
    { channel: 'Medium', posts: 62, reach: '580K', engagement: '14K', color: '#000000' },
  ];
  const scheduled = [
    { content: 'AI Workforce Trends Report', channel: 'LinkedIn', time: 'Tomorrow 9AM', status: 'scheduled' },
    { content: 'Marketing Tips Thread', channel: 'Twitter/X', time: 'Today 3PM', status: 'publishing' },
    { content: 'Weekly Newsletter', channel: 'Email', time: 'Friday 8AM', status: 'scheduled' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-content-marketing-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Content Marketing Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Send size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.distributed}</Text><Text style={styles.metricLabel}>Distributed</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Globe size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.reach}</Text><Text style={styles.metricLabel}>Total Reach</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.engagement}</Text><Text style={styles.metricLabel}>Engagement</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.channels}</Text><Text style={styles.metricLabel}>Channels</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Globe size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Channel Performance</Text></View></View>
          <View style={styles.channelList}>
            {channelPerformance.map((c) => (
              <View key={c.channel} style={styles.channelCard}>
                <View style={styles.channelHeader}><View style={[styles.channelDot, { backgroundColor: c.color }]} /><Text style={[styles.channelName, { color: theme.colors.text }]}>{c.channel}</Text><Text style={[styles.channelReach, { color: c.color }]}>{c.reach}</Text></View>
                <View style={styles.channelMetrics}><Text style={[styles.channelMetric, { color: theme.colors.secondaryText }]}>{c.posts} posts</Text><Text style={[styles.channelMetric, { color: '#06B6D4' }]}>{c.engagement} engagement</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Clock size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scheduled Content</Text></View></View>
          <View style={styles.scheduledList}>
            {scheduled.map((s) => (
              <View key={s.content} style={styles.scheduledCard}>
                <View style={styles.scheduledHeader}><Text style={[styles.scheduledContent, { color: theme.colors.text }]}>{s.content}</Text><View style={[styles.scheduledStatus, { backgroundColor: s.status === 'publishing' ? '#10B98120' : '#06B6D420' }]}><Text style={[styles.scheduledStatusText, { color: s.status === 'publishing' ? '#10B981' : '#06B6D4' }]}>{s.status}</Text></View></View>
                <View style={styles.scheduledMeta}><Text style={[styles.scheduledChannel, { color: theme.colors.secondaryText }]}>{s.channel}</Text><Text style={[styles.scheduledTime, { color: '#8B5CF6' }]}>{s.time}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'LinkedIn publishing at 9AM yields 24% higher engagement vs afternoon', color: '#10B981' },{ msg: 'Twitter threads with 5-7 tweets get 42% more impressions', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Content Distributor is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Share2, component: renderOverviewTab() },
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
  channelList: { gap: 12 }, channelCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  channelHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }, channelDot: { width: 10, height: 10, borderRadius: 5 },
  channelName: { fontSize: 14, fontWeight: '600', flex: 1 }, channelReach: { fontSize: 14, fontWeight: '700' },
  channelMetrics: { flexDirection: 'row', gap: 12 }, channelMetric: { fontSize: 11 },
  scheduledList: { gap: 12 }, scheduledCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  scheduledHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, scheduledContent: { fontSize: 14, fontWeight: '600', flex: 1, marginRight: 8 },
  scheduledStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, scheduledStatusText: { fontSize: 11, fontWeight: '600' },
  scheduledMeta: { flexDirection: 'row', gap: 12 }, scheduledChannel: { fontSize: 11 }, scheduledTime: { fontSize: 11, fontWeight: '600' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
