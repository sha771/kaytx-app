import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { MessageSquare, CheckCircle, Clock, BarChart3, Lock, Sparkles, ThumbsUp, ThumbsDown, Filter, Star } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIUXFeedbackAnalystScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-ux-feedback-analyst')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { feedbackToday: 142, sentiment: '78%', nps: 72, actionItems: 8 };
  const feedbackCategories = [
    { category: 'Navigation', positive: 68, negative: 12, neutral: 20 },
    { category: 'Performance', positive: 54, negative: 28, neutral: 18 },
    { category: 'Design', positive: 82, negative: 8, neutral: 10 },
    { category: 'Features', positive: 61, negative: 22, neutral: 17 },
    { category: 'Onboarding', positive: 45, negative: 32, neutral: 23 },
  ];
  const recentFeedback = [
    { source: 'In-app', message: 'Search is too slow on mobile', sentiment: 'negative', priority: 'high' },
    { source: 'Survey', message: 'Love the new dashboard layout', sentiment: 'positive', priority: 'low' },
    { source: 'Support', message: 'Confusing checkout flow', sentiment: 'negative', priority: 'medium' },
    { source: 'Review', message: 'Great onboarding experience', sentiment: 'positive', priority: 'low' },
  ];

  const renderFeedbackTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><MessageSquare size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.feedbackToday}</Text><Text style={styles.metricLabel}>Feedback Today</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Star size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.sentiment}</Text><Text style={styles.metricLabel}>Positive</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.nps}</Text><Text style={styles.metricLabel}>NPS</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><Sparkles size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.actionItems}</Text><Text style={styles.metricLabel}>Action Items</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Filter size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Feedback by Category</Text></View></View>
          <View style={styles.catList}>
            {feedbackCategories.map((c) => (
              <View key={c.category} style={styles.catCard}>
                <Text style={[styles.catName, { color: theme.colors.text }]}>{c.category}</Text>
                <View style={styles.catBarRow}>
                  <View style={styles.catBarContainer}>
                    <View style={[styles.catBarPositive, { width: `${c.positive}%`, backgroundColor: '#10B981' }]} />
                    <View style={[styles.catBarNegative, { width: `${c.negative}%`, backgroundColor: '#EF4444' }]} />
                  </View>
                </View>
                <View style={styles.catMetrics}>
                  <View style={styles.catMetric}><ThumbsUp size={12} color="#10B981" /><Text style={[styles.catMetricText, { color: '#10B981' }]}>{c.positive}%</Text></View>
                  <View style={styles.catMetric}><ThumbsDown size={12} color="#EF4444" /><Text style={[styles.catMetricText, { color: '#EF4444' }]}>{c.negative}%</Text></View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><MessageSquare size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Feedback</Text></View></View>
          <View style={styles.fbList}>
            {recentFeedback.map((f, idx) => (
              <View key={idx} style={styles.fbCard}>
                <View style={styles.fbHeader}>
                  <View style={[styles.fbBadge, { backgroundColor: f.sentiment === 'positive' ? '#10B98120' : '#EF444420' }]}>
                    <Text style={[styles.fbBadgeText, { color: f.sentiment === 'positive' ? '#10B981' : '#EF4444' }]}>{f.sentiment}</Text>
                  </View>
                  <Text style={[styles.fbSource, { color: theme.colors.secondaryText }]}>{f.source}</Text>
                  {f.priority !== 'low' && <View style={[styles.fbPriority, { backgroundColor: f.priority === 'high' ? '#EF444420' : '#F59E0B20' }]}>
                    <Text style={[styles.fbPriorityText, { color: f.priority === 'high' ? '#EF4444' : '#F59E0B' }]}>{f.priority}</Text>
                  </View>}
                </View>
                <Text style={[styles.fbMessage, { color: theme.colors.text }]}>{f.message}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI UX Feedback Analyst.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'feedback', label: 'Feedback', icon: MessageSquare, component: renderFeedbackTab() }];
  if (!agent) return <View style={styles.container}><Text style={{ color: theme.colors.text }}>Agent not found</Text></View>;
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  catList: { gap: 14 }, catCard: { marginBottom: 4 },
  catName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  catBarRow: { marginBottom: 6 },
  catBarContainer: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden', flexDirection: 'row' },
  catBarPositive: { height: '100%' }, catBarNegative: { height: '100%' },
  catMetrics: { flexDirection: 'row', gap: 16 },
  catMetric: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  catMetricText: { fontSize: 12, fontWeight: '600' },
  fbList: { gap: 12 }, fbCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  fbHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  fbBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  fbBadgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  fbSource: { fontSize: 12 },
  fbPriority: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  fbPriorityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  fbMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
