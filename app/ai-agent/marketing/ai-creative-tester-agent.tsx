import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { FlaskConical, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Image, TestTube, CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-creative-tester', name: 'AI Creative Tester', title: 'Ad Creative A/B Testing',
  description: 'Tests ad creatives across variations — headlines, images, CTAs, and copy — using statistical significance testing to identify winning combinations.',
  capabilities: ['A/B Testing', 'Multivariate Testing', 'Headline Testing', 'Image Testing', 'CTA Optimization', 'Statistical Significance', 'Creative Scoring', 'Winner Automation'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-ad-campaign-manager-agent',
};

export default function AICreativeTesterAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { tests: 124, winners: 86, uplift: '+34%', confidence: '95%' };
  const testTypes = [
    { type: 'Headline', active: 18, completed: 42, avgUplift: '+28%', color: '#06B6D4' },
    { type: 'Image/Video', active: 12, completed: 28, avgUplift: '+42%', color: '#10B981' },
    { type: 'CTA', active: 8, completed: 24, avgUplift: '+18%', color: '#8B5CF6' },
    { type: 'Copy', active: 6, completed: 18, avgUplift: '+22%', color: '#F59E0B' },
  ];
  const recentTests = [
    { name: 'Enterprise AI Headline v3', type: 'Headline', winner: 'Variant B', uplift: '+38%', status: 'complete' },
    { name: 'Product Demo Thumbnail', type: 'Image', winner: 'Testing...', uplift: '—', status: 'running' },
    { name: 'CTA Button Color', type: 'CTA', winner: 'Green CTA', uplift: '+24%', status: 'complete' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-ad-campaign-manager-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Ad Campaign Manager</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><TestTube size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.tests}</Text><Text style={styles.metricLabel}>Tests Run</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.winners}</Text><Text style={styles.metricLabel}>Winners</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><TrendingUp size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.uplift}</Text><Text style={styles.metricLabel}>Avg Uplift</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><FlaskConical size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.confidence}</Text><Text style={styles.metricLabel}>Confidence</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><TestTube size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Test Categories</Text></View></View>
          <View style={styles.typeList}>
            {testTypes.map((t) => (
              <View key={t.type} style={styles.typeCard}>
                <View style={styles.typeHeader}><Text style={[styles.typeName, { color: theme.colors.text }]}>{t.type}</Text><Text style={[styles.typeUplift, { color: t.color }]}>{t.avgUplift}</Text></View>
                <Text style={[styles.typeCount, { color: theme.colors.secondaryText }]}>{t.active} active · {t.completed} completed</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><FlaskConical size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Tests</Text></View></View>
          <View style={styles.testList}>
            {recentTests.map((t) => (
              <View key={t.name} style={styles.testCard}>
                <View style={styles.testHeader}><Text style={[styles.testName, { color: theme.colors.text }]}>{t.name}</Text><View style={[styles.testStatus, { backgroundColor: t.status === 'complete' ? '#10B98120' : '#06B6D420' }]}><Text style={[styles.testStatusText, { color: t.status === 'complete' ? '#10B981' : '#06B6D4' }]}>{t.status}</Text></View></View>
                <View style={styles.testMeta}><Text style={[styles.testType, { color: theme.colors.secondaryText }]}>{t.type}</Text><Text style={[styles.testWinner, { color: '#8B5CF6' }]}>{t.winner}</Text><Text style={[styles.testUplift, { color: '#10B981' }]}>{t.uplift}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Image/Video tests produce highest uplift (+42%) — prioritize visual creative testing', color: '#10B981' },{ msg: 'Headlines with numbers outperform by 28% — apply pattern to new campaigns', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Creative Tester is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: FlaskConical, component: renderOverviewTab() }];
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
  typeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, typeName: { fontSize: 14, fontWeight: '600', flex: 1 }, typeUplift: { fontSize: 14, fontWeight: '700' },
  typeCount: { fontSize: 12 },
  testList: { gap: 12 }, testCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  testHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, testName: { fontSize: 14, fontWeight: '600', flex: 1 },
  testStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, testStatusText: { fontSize: 11, fontWeight: '600' },
  testMeta: { flexDirection: 'row', gap: 12 }, testType: { fontSize: 11 }, testWinner: { fontSize: 11, fontWeight: '600' }, testUplift: { fontSize: 11, fontWeight: '600' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
