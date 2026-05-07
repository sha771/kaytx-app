import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Target, CheckCircle, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, FileText, Hash, Code } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-on-page-optimizer', name: 'AI On-page Optimizer', title: 'Content & Technical SEO',
  description: 'Optimizes pages for search â€” meta tags, headings, schema markup, internal linking, and content structure for maximum SERP visibility.',
  capabilities: ['Meta Optimization', 'Schema Markup', 'Heading Structure', 'Internal Linking', 'Content Optimization', 'Image SEO', 'URL Structure', 'Mobile Optimization'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-seo-specialist-agent',
};

export default function AIOnPageOptimizerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { pages: 312, avgScore: '88/100', fixes: 284, improvements: '+24%' };
  const optimizationAreas = [
    { area: 'Title Tags', optimized: 298, total: 312, score: 96, color: '#10B981' },
    { area: 'Meta Descriptions', optimized: 286, total: 312, score: 92, color: '#06B6D4' },
    { area: 'Headings (H1-H6)', optimized: 304, total: 312, score: 98, color: '#8B5CF6' },
    { area: 'Schema Markup', optimized: 248, total: 312, score: 80, color: '#F59E0B' },
    { area: 'Internal Links', optimized: 276, total: 312, score: 88, color: '#06B6D4' },
  ];
  const recentOptimizations = [
    { page: '/ai-workforce-guide', scoreBefore: 72, scoreAfter: 94, date: '2 days ago' },
    { page: '/marketing-automation', scoreBefore: 68, scoreAfter: 88, date: '3 days ago' },
    { page: '/enterprise-ai', scoreBefore: 76, scoreAfter: 92, date: 'Today' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-seo-specialist-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI SEO Specialist</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><FileText size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.pages}</Text><Text style={styles.metricLabel}>Pages</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgScore}</Text><Text style={styles.metricLabel}>Avg Score</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.fixes}</Text><Text style={styles.metricLabel}>Fixes Applied</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.improvements}</Text><Text style={styles.metricLabel}>Improvement</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Target size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Optimization Areas</Text></View></View>
          <View style={styles.areaList}>
            {optimizationAreas.map((a) => (
              <View key={a.area} style={styles.areaCard}>
                <View style={styles.areaHeader}><Text style={[styles.areaName, { color: theme.colors.text }]}>{a.area}</Text><Text style={[styles.areaScore, { color: a.color }]}>{a.score}%</Text></View>
                <View style={styles.areaBarContainer}><View style={[styles.areaBar, { width: (a.score + '%'), backgroundColor: a.color } as any]} /></View>
                <Text style={[styles.areaStatus, { color: theme.colors.secondaryText }]}>{a.optimized}/{a.total} pages optimized</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Code size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Optimizations</Text></View></View>
          <View style={styles.optimizationList}>
            {recentOptimizations.map((o) => (
              <View key={o.page} style={styles.optimizationCard}>
                <Text style={[styles.optimizationPage, { color: theme.colors.text }]}>{o.page}</Text>
                <View style={styles.optimizationScores}><Text style={[styles.optimizationBefore, { color: theme.colors.secondaryText }]}>{o.scoreBefore}</Text><Text style={[styles.optimizationArrow, { color: theme.colors.secondaryText }]}>â†’</Text><Text style={[styles.optimizationAfter, { color: '#10B981' }]}>{o.scoreAfter}</Text><Text style={[styles.optimizationDate, { color: theme.colors.secondaryText }]}>{o.date}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Schema markup missing on 64 pages â€” implementing FAQ & Article schemas', color: '#10B981' },{ msg: 'Internal linking opportunities identified: 128 pages need more links', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI On-page Optimizer is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Target, component: renderOverviewTab() },
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
  areaList: { gap: 14 }, areaCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  areaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, areaName: { fontSize: 14, fontWeight: '600', flex: 1 }, areaScore: { fontSize: 16, fontWeight: '700' },
  areaBarContainer: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, overflow: 'hidden', marginBottom: 6 }, areaBar: { height: '100%', borderRadius: 4 },
  areaStatus: { fontSize: 11 },
  optimizationList: { gap: 12 }, optimizationCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  optimizationPage: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  optimizationScores: { flexDirection: 'row', gap: 8, alignItems: 'center' }, optimizationBefore: { fontSize: 13 }, optimizationArrow: { fontSize: 13 }, optimizationAfter: { fontSize: 13, fontWeight: '700' }, optimizationDate: { fontSize: 11, marginLeft: 'auto' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
