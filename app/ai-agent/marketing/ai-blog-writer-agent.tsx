import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { BookOpen, TrendingUp, Zap, ChevronLeft, BarChart3, Sparkles, Lock, Award, Activity, FileText, Clock, Hash } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-blog-writer', name: 'AI Blog Writer', title: 'Long-form Content Creator',
  description: 'Creates SEO-optimized blog posts, articles, and long-form content with research, outlines, drafts, and editorial refinement â€” at scale.',
  capabilities: ['Article Writing', 'SEO Optimization', 'Research', 'Outline Creation', 'Content Briefs', 'Editorial Refinement', 'Multi-format Output', 'Tone Adaptation'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-content-marketing-agent',
};

export default function AIBlogWriterAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { articles: 84, words: '142K', avgLength: '1,680', seoScore: '92/100' };
  const recentArticles = [
    { title: 'The Complete AI Workforce Guide', words: '3,200', seo: 94, status: 'Published', date: '2 days ago' },
    { title: 'Marketing Automation in 2026', words: '2,800', seo: 88, status: 'Published', date: '5 days ago' },
    { title: 'Enterprise AI ROI Analysis', words: '4,100', seo: 96, status: 'Editing', date: 'Today' },
    { title: 'AI Agent Implementation Guide', words: '3,600', seo: 90, status: 'Draft', date: 'Yesterday' },
  ];
  const topics = [
    { topic: 'AI Workforce', articles: 18, avgViews: '8.4K', trending: true },
    { topic: 'Marketing Automation', articles: 14, avgViews: '6.2K', trending: true },
    { topic: 'Enterprise AI', articles: 12, avgViews: '7.8K', trending: false },
    { topic: 'Productivity Tools', articles: 10, avgViews: '4.2K', trending: false },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-content-marketing-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Content Marketing Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><FileText size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.articles}</Text><Text style={styles.metricLabel}>Articles</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Hash size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.words}</Text><Text style={styles.metricLabel}>Words Written</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgLength}</Text><Text style={styles.metricLabel}>Avg Length</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.seoScore}</Text><Text style={styles.metricLabel}>SEO Score</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><FileText size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Articles</Text></View></View>
          <View style={styles.articleList}>
            {recentArticles.map((a) => (
              <View key={a.title} style={styles.articleCard}>
                <View style={styles.articleHeader}><Text style={[styles.articleTitle, { color: theme.colors.text }]}>{a.title}</Text><View style={[styles.articleStatus, { backgroundColor: a.status === 'Published' ? '#10B98120' : a.status === 'Editing' ? '#F59E0B20' : '#06B6D420' }]}><Text style={[styles.articleStatusText, { color: a.status === 'Published' ? '#10B981' : a.status === 'Editing' ? '#F59E0B' : '#06B6D4' }]}>{a.status}</Text></View></View>
                <View style={styles.articleMetrics}><Text style={[styles.articleMetric, { color: theme.colors.secondaryText }]}>{a.words} words</Text><Text style={[styles.articleMetric, { color: '#06B6D4' }]}>SEO: {a.seo}</Text><Text style={[styles.articleMetric, { color: theme.colors.secondaryText }]}>{a.date}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><TrendingUp size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Topics</Text></View></View>
          <View style={styles.topicList}>
            {topics.map((t) => (
              <View key={t.topic} style={styles.topicCard}>
                <View style={styles.topicHeader}><Text style={[styles.topicName, { color: theme.colors.text }]}>{t.topic}</Text>{t.trending && <View style={styles.trendingBadge}><Text style={styles.trendingText}>Trending</Text></View>}</View>
                <View style={styles.topicMetrics}><Text style={[styles.topicMetric, { color: theme.colors.secondaryText }]}>{t.articles} articles</Text><Text style={[styles.topicMetric, { color: '#10B981' }]}>{t.avgViews} avg views</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Long-form content (3K+ words) drives 2.4x more organic traffic', color: '#10B981' },{ msg: 'List-based headlines increasing CTR by 34% â€” apply to next 5 articles', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Blog Writer is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: FileText, component: renderOverviewTab() },
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
  articleList: { gap: 12 }, articleCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  articleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, articleTitle: { fontSize: 14, fontWeight: '600', flex: 1, marginRight: 8 },
  articleStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, articleStatusText: { fontSize: 11, fontWeight: '600' },
  articleMetrics: { flexDirection: 'row', gap: 12 }, articleMetric: { fontSize: 11 },
  topicList: { gap: 12 }, topicCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  topicHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, topicName: { fontSize: 14, fontWeight: '600' },
  trendingBadge: { backgroundColor: '#F59E0B20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, trendingText: { fontSize: 11, fontWeight: '600', color: '#F59E0B' },
  topicMetrics: { flexDirection: 'row', gap: 12 }, topicMetric: { fontSize: 12 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
