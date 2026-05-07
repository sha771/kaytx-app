import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Calendar, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Clock, Hash, CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-post-scheduler', name: 'AI Post Scheduler', title: 'Optimal Publishing Engine',
  description: 'Schedules social media posts at optimal times across all platforms with AI-driven timing, queue management, and automated publishing.',
  capabilities: ['Optimal Timing', 'Queue Management', 'Multi-platform', 'Content Calendar', 'Auto-publishing', 'Timezone Optimization', 'Batch Scheduling', 'Frequency Management'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-social-media-manager-agent',
};

export default function AIPostSchedulerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { scheduled: 864, published: 742, queued: 122, optimalRate: '94%' };
  const platformSchedule = [
    { platform: 'LinkedIn', queued: 12, published: 284, bestTime: 'Tue/Thu 9AM', color: '#0A66C2' },
    { platform: 'Twitter/X', queued: 8, published: 312, bestTime: 'Daily 12PM', color: '#1DA1F2' },
    { platform: 'Instagram', queued: 6, published: 186, bestTime: 'Mon/Wed 7PM', color: '#E4405F' },
    { platform: 'Facebook', queued: 4, published: 124, bestTime: 'Wed/Fri 1PM', color: '#1877F2' },
  ];
  const upcomingPosts = [
    { title: 'AI Workforce Trends Report', platform: 'LinkedIn', time: 'Tomorrow 9AM', status: 'ready' },
    { title: 'Marketing Tips Thread', platform: 'Twitter/X', time: 'Today 3PM', status: 'publishing' },
    { title: 'Product Demo Reel', platform: 'Instagram', time: 'Wed 7PM', status: 'draft' },
    { title: 'Weekly Roundup', platform: 'Facebook', time: 'Fri 1PM', status: 'ready' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-social-media-manager-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Social Media Manager</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Calendar size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.scheduled}</Text><Text style={styles.metricLabel}>Scheduled</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.published}</Text><Text style={styles.metricLabel}>Published</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.queued}</Text><Text style={styles.metricLabel}>In Queue</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.optimalRate}</Text><Text style={styles.metricLabel}>Optimal Rate</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Hash size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Platform Schedules</Text></View></View>
          <View style={styles.platformList}>
            {platformSchedule.map((p) => (
              <View key={p.platform} style={styles.platformCard}>
                <View style={styles.platformHeader}><View style={[styles.platformDot, { backgroundColor: p.color }]} /><Text style={[styles.platformName, { color: theme.colors.text }]}>{p.platform}</Text><Text style={[styles.platformBest, { color: p.color }]}>{p.bestTime}</Text></View>
                <View style={styles.platformMetrics}><Text style={[styles.platformMetric, { color: theme.colors.secondaryText }]}>{p.queued} queued</Text><Text style={[styles.platformMetric, { color: '#10B981' }]}>{p.published} published</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Clock size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Upcoming Posts</Text></View></View>
          <View style={styles.postList}>
            {upcomingPosts.map((p) => (
              <View key={p.title} style={styles.postCard}>
                <View style={styles.postHeader}><Text style={[styles.postTitle, { color: theme.colors.text }]}>{p.title}</Text><View style={[styles.postStatus, { backgroundColor: p.status === 'publishing' ? '#10B98120' : p.status === 'ready' ? '#06B6D420' : '#F59E0B20' }]}><Text style={[styles.postStatusText, { color: p.status === 'publishing' ? '#10B981' : p.status === 'ready' ? '#06B6D4' : '#F59E0B' }]}>{p.status}</Text></View></View>
                <View style={styles.postMeta}><Text style={[styles.postPlatform, { color: theme.colors.secondaryText }]}>{p.platform}</Text><Text style={[styles.postTime, { color: '#8B5CF6' }]}>{p.time}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'LinkedIn posts at 9AM get 24% more impressions â€” maintain schedule', color: '#10B981' },{ msg: 'Instagram Reels scheduled for 7PM outperform by 38%', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Post Scheduler is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Calendar, component: renderOverviewTab() },
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
  platformList: { gap: 12 }, platformCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  platformHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }, platformDot: { width: 10, height: 10, borderRadius: 5 }, platformName: { fontSize: 14, fontWeight: '600', flex: 1 }, platformBest: { fontSize: 12, fontWeight: '600' },
  platformMetrics: { flexDirection: 'row', gap: 12 }, platformMetric: { fontSize: 11 },
  postList: { gap: 12 }, postCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  postHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, postTitle: { fontSize: 14, fontWeight: '600', flex: 1 },
  postStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, postStatusText: { fontSize: 11, fontWeight: '600' },
  postMeta: { flexDirection: 'row', gap: 12 }, postPlatform: { fontSize: 11 }, postTime: { fontSize: 11, fontWeight: '600' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
