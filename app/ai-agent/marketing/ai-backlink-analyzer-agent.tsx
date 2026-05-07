import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Link, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Globe, Shield, AlertTriangle } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-backlink-analyzer', name: 'AI Backlink Analyzer', title: 'Link Profile Management',
  description: 'Monitors, analyzes, and improves backlink profiles â€” identifying opportunities, detecting toxic links, and managing outreach campaigns for authority building.',
  capabilities: ['Backlink Monitoring', 'Toxic Link Detection', 'Competitor Analysis', 'Outreach Management', 'Link Quality Scoring', 'Anchor Text Analysis', 'Lost Link Recovery', 'Authority Tracking'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-seo-specialist-agent',
};

export default function AIBacklinkAnalyzerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { backlinks: '4.2K', referringDomains: 680, authority: '72/100', newLinks: '+86' };
  const linkQuality = [
    { tier: 'High Authority (90+)', count: 42, pct: '6%', color: '#10B981' },
    { tier: 'Good (70-89)', count: 186, pct: '27%', color: '#06B6D4' },
    { tier: 'Average (40-69)', count: 324, pct: '48%', color: '#8B5CF6' },
    { tier: 'Low (<40)', count: 128, pct: '19%', color: '#F59E0B' },
  ];
  const recentLinks = [
    { source: 'techcrunch.com', domainAuth: 94, anchor: 'AI workforce', type: 'Dofollow', date: '2 days ago' },
    { source: 'forbes.com', domainAuth: 96, anchor: 'enterprise AI', type: 'Dofollow', date: '4 days ago' },
    { source: 'venturebeat.com', domainAuth: 88, anchor: 'marketing automation', type: 'Nofollow', date: '5 days ago' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-seo-specialist-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI SEO Specialist</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Link size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.backlinks}</Text><Text style={styles.metricLabel}>Backlinks</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Globe size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.referringDomains}</Text><Text style={styles.metricLabel}>Ref Domains</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Award size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.authority}</Text><Text style={styles.metricLabel}>Domain Auth</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.newLinks}</Text><Text style={styles.metricLabel}>New (30d)</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Shield size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Link Quality Distribution</Text></View></View>
          <View style={styles.qualityList}>
            {linkQuality.map((q) => (
              <View key={q.tier} style={styles.qualityCard}>
                <View style={styles.qualityHeader}><Text style={[styles.qualityTier, { color: theme.colors.text }]}>{q.tier}</Text><Text style={[styles.qualityPct, { color: q.color }]}>{q.pct}</Text></View>
                <Text style={[styles.qualityCount, { color: theme.colors.secondaryText }]}>{q.count} domains</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Activity size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Backlinks</Text></View></View>
          <View style={styles.linkList}>
            {recentLinks.map((l) => (
              <View key={l.source} style={styles.linkCard}>
                <View style={styles.linkHeader}><Text style={[styles.linkSource, { color: theme.colors.text }]}>{l.source}</Text><View style={[styles.linkType, { backgroundColor: l.type === 'Dofollow' ? '#10B98120' : '#8B5CF620' }]}><Text style={[styles.linkTypeText, { color: l.type === 'Dofollow' ? '#10B981' : '#8B5CF6' }]}>{l.type}</Text></View></View>
                <View style={styles.linkMeta}><Text style={[styles.linkAuth, { color: '#06B6D4' }]}>DA: {l.domainAuth}</Text><Text style={[styles.linkAnchor, { color: theme.colors.secondaryText }]}>"{l.anchor}"</Text><Text style={[styles.linkDate, { color: theme.colors.secondaryText }]}>{l.date}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: '12 new backlink opportunities from competitor gap analysis', color: '#10B981' },{ msg: '3 toxic links detected and disavowed automatically', color: '#EF4444' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Backlink Analyzer is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [
    { id: 'overview', label: 'Overview', icon: Link, component: renderOverviewTab() },
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
  qualityList: { gap: 12 }, qualityCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  qualityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, qualityTier: { fontSize: 14, fontWeight: '600', flex: 1 }, qualityPct: { fontSize: 14, fontWeight: '700' },
  qualityCount: { fontSize: 12 },
  linkList: { gap: 12 }, linkCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  linkHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, linkSource: { fontSize: 14, fontWeight: '600', flex: 1 },
  linkType: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, linkTypeText: { fontSize: 11, fontWeight: '600' },
  linkMeta: { flexDirection: 'row', gap: 12 }, linkAuth: { fontSize: 11, fontWeight: '600' }, linkAnchor: { fontSize: 11, flex: 1 }, linkDate: { fontSize: 11 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
