import React, { useMemo, useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Switch } from 'react-native';
import { Smile, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Lock, ChartBarBig, BarChart3, Zap, ChevronRight, Plus, Sparkles, Activity, Frown, Meh, SmilePlus, MessageSquare, TrendingDown, Brain } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AISentimentAnalyzerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-sentiment-analyzer')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const [activeTab, setActiveTab] = useState('overview');
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const sentimentDistribution = [
    { label: 'Positive', count: 1840, percentage: 46, color: '#10B981', icon: SmilePlus },
    { label: 'Neutral', count: 1520, percentage: 38, color: '#6B7280', icon: Meh },
    { label: 'Negative', count: 640, percentage: 16, color: '#EF4444', icon: Frown },
  ];
  const recentAnalysis = [
    { id: 'SA-001', source: 'Support Chat', preview: 'Thank you so much for...', sentiment: 'Positive', score: 0.92, time: '2m ago' },
    { id: 'SA-002', source: 'Email Reply', preview: 'I am extremely frustrated...', sentiment: 'Negative', score: -0.78, time: '5m ago' },
    { id: 'SA-003', source: 'Survey Response', preview: 'The service was adequate...', sentiment: 'Neutral', score: 0.12, time: '8m ago' },
    { id: 'SA-004', source: 'Social Media', preview: 'Amazing experience today!', sentiment: 'Positive', score: 0.95, time: '12m ago' },
  ];
  const sentimentTrend = [
    { period: 'Last Hour', positive: 42, neutral: 28, negative: 14 },
    { period: 'Today', positive: 1840, neutral: 1520, negative: 640 },
    { period: 'This Week', positive: 12400, neutral: 8900, negative: 3400 },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><SmilePlus size={20} color="#fff" /><Text style={styles.metricValue}>46%</Text><Text style={styles.metricLabel}>Positive</Text></LinearGradient>
        <LinearGradient colors={['#6B7280', '#4B5563']} style={styles.metricCard}><Meh size={20} color="#fff" /><Text style={styles.metricValue}>38%</Text><Text style={styles.metricLabel}>Neutral</Text></LinearGradient>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><Frown size={20} color="#fff" /><Text style={styles.metricValue}>16%</Text><Text style={styles.metricLabel}>Negative</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Brain size={20} color="#fff" /><Text style={styles.metricValue}>4,000</Text><Text style={styles.metricLabel}>Analyzed Today</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sentiment Distribution</Text></View></View>
        {sentimentDistribution.map((s) => (
          <View key={s.label} style={styles.sentimentRow}>
            <View style={styles.sentInfo}><View style={[styles.sentIcon, { backgroundColor: s.color + '15' }]}><s.icon size={18} color={s.color} /></View><Text style={[styles.sentLabel, { color: theme.colors.text }]}>{s.label}</Text></View>
            <View style={styles.sentStats}><Text style={[styles.sentCount, { color: theme.colors.secondaryText }]}>{s.count}</Text><View style={styles.sentBarContainer}><View style={[styles.sentBar, { width: `${s.percentage}%`, backgroundColor: s.color }]} /></View><Text style={[styles.sentPct, { color: theme.colors.text }]}>{s.percentage}%</Text></View>
          </View>
        ))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><MessageSquare size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Analysis</Text></View></View>
        {recentAnalysis.map((a) => (
          <TouchableOpacity key={a.id} style={styles.analysisRow}>
            <View style={styles.anaInfo}><View style={[styles.anaIcon, { backgroundColor: a.sentiment === 'Positive' ? '#10B98115' : a.sentiment === 'Negative' ? '#EF444415' : '#6B728015' }]}><Smile size={16} color={a.sentiment === 'Positive' ? '#10B981' : a.sentiment === 'Negative' ? '#EF4444' : '#6B7280'} /></View><View><Text style={[styles.anaPreview, { color: theme.colors.text }]} numberOfLines={1}>{a.preview}</Text><Text style={[styles.anaMeta, { color: theme.colors.secondaryText }]}>{a.source} · {a.time}</Text></View></View>
            <View style={[styles.scoreBadge, { backgroundColor: a.score > 0 ? '#10B98120' : a.score < 0 ? '#EF444420' : '#6B728020' }]}><Text style={[styles.scoreText, { color: a.score > 0 ? '#10B981' : a.score < 0 ? '#EF4444' : '#6B7280' }]}>{a.score > 0 ? '+' : ''}{a.score.toFixed(2)}</Text></View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>{isPremiumLocked && <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>AI Sentiment Analyzer requires Enterprise plan. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>}</View>
  );

  const renderTrendsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.metricsGrid}>
        <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><ChartBarBig size={20} color="#fff" /><Text style={styles.metricValue}>92.4%</Text><Text style={styles.metricLabel}>Accuracy</Text></LinearGradient>
        <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>+5.2%</Text><Text style={styles.metricLabel}>Positive Trend</Text></LinearGradient>
        <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><TrendingDown size={20} color="#fff" /><Text style={styles.metricValue}>-3.1%</Text><Text style={styles.metricLabel}>Negative Trend</Text></LinearGradient>
        <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>0.2s</Text><Text style={styles.metricLabel}>Analysis Time</Text></LinearGradient>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trend Analysis</Text></View></View>
        {sentimentTrend.map((t) => (
          <View key={t.period} style={styles.trendRow}>
            <Text style={[styles.trendPeriod, { color: theme.colors.text }]}>{t.period}</Text>
            <View style={styles.trendBars}>
              <View style={[styles.trendPos, { width: `${(t.positive / (t.positive + t.neutral + t.negative)) * 100}%` }]} /><View style={[styles.trendNeu, { width: `${(t.neutral / (t.positive + t.neutral + t.negative)) * 100}%` }]} /><View style={[styles.trendNeg, { width: `${(t.negative / (t.positive + t.neutral + t.negative)) * 100}%` }]} />
            </View>
            <Text style={[styles.trendTotal, { color: theme.colors.secondaryText }]}>{t.positive + t.neutral + t.negative}</Text>
          </View>
        ))}
      </View>
    </ScrollView></View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}><ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Settings size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Analyzer Configuration</Text></View></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Real-Time Analysis</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Analyze sentiment in real-time</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Alert on Negative Sentiment</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Notify when negative sentiment detected</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Multi-Language Support</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Analyze text in multiple languages</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Context Awareness</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Consider conversation context</Text></View><Switch value={true} onValueChange={() => {}} /></View>
        <View style={styles.settingItem}><View style={styles.settingInfo}><Text style={[styles.settingLabel, { color: theme.colors.text }]}>Emotion Detection</Text><Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>Detect specific emotions (anger, joy, etc.)</Text></View><Switch value={false} onValueChange={() => {}} /></View>
      </View>
    </ScrollView></View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Smile, component: renderOverviewTab() },
    { id: 'trends', label: 'Trends', icon: TrendingUp, component: renderTrendsTab() },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab() },
  ];
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
  sentimentRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  sentInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, width: 100 },
  sentIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sentLabel: { fontSize: 14, fontWeight: '600' },
  sentStats: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  sentCount: { fontSize: 13, fontWeight: '600', width: 50 },
  sentBarContainer: { flex: 1, height: 6, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 3, overflow: 'hidden' },
  sentBar: { height: '100%', borderRadius: 3 },
  sentPct: { fontSize: 13, fontWeight: '600', width: 40 },
  analysisRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  anaInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  anaIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  anaPreview: { fontSize: 14, fontWeight: '600', maxWidth: 200 },
  anaMeta: { fontSize: 12, marginTop: 2 },
  scoreBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  scoreText: { fontSize: 12, fontWeight: '700' },
  trendRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  trendPeriod: { width: 90, fontSize: 14, fontWeight: '600' },
  trendBars: { flex: 1, flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden' },
  trendPos: { backgroundColor: '#10B981' },
  trendNeu: { backgroundColor: '#6B7280' },
  trendNeg: { backgroundColor: '#EF4444' },
  trendTotal: { width: 50, fontSize: 12, textAlign: 'right' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  settingInfo: { flex: 1, marginRight: 16 },
  settingLabel: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  settingDesc: { fontSize: 13 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
