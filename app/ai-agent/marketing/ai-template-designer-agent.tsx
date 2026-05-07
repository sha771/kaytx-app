import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { PenTool, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Palette, Layout, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-template-designer', name: 'AI Template Designer', title: 'Email Design & Personalization',
  description: 'Designs, tests, and optimizes email templates with dynamic personalization, responsive layouts, and brand-consistent styling for maximum engagement.',
  capabilities: ['Template Design', 'Responsive Layouts', 'Dynamic Personalization', 'A/B Testing', 'Brand Consistency', 'Dark Mode', 'Accessibility', 'Component Library'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-email-marketing-agent',
};

export default function AITemplateDesignerAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { templates: 86, avgCTR: '4.8%', tested: 312, responsive: '100%' };
  const templateCategories = [
    { type: 'Welcome Series', count: 12, avgOpen: '62%', color: '#06B6D4' },
    { type: 'Promotional', count: 24, avgOpen: '48%', color: '#10B981' },
    { type: 'Transactional', count: 18, avgOpen: '84%', color: '#8B5CF6' },
    { type: 'Newsletter', count: 32, avgOpen: '38%', color: '#F59E0B' },
  ];
  const recentTemplates = [
    { name: 'Enterprise Onboarding', type: 'Welcome', ctr: '6.2%', status: 'live' },
    { name: 'Q2 Product Launch', type: 'Promotional', ctr: '5.8%', status: 'testing' },
    { name: 'Invoice Notification', type: 'Transactional', ctr: 'N/A', status: 'live' },
    { name: 'Weekly Digest v3', type: 'Newsletter', ctr: '3.4%', status: 'draft' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-email-marketing-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Email Marketing Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Layout size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.templates}</Text><Text style={styles.metricLabel}>Templates</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Eye size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgCTR}</Text><Text style={styles.metricLabel}>Avg CTR</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.tested}</Text><Text style={styles.metricLabel}>A/B Tests</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Palette size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.responsive}</Text><Text style={styles.metricLabel}>Responsive</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Palette size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Template Categories</Text></View></View>
          <View style={styles.categoryList}>
            {templateCategories.map((c) => (
              <View key={c.type} style={styles.categoryCard}>
                <View style={styles.categoryHeader}><Text style={[styles.categoryType, { color: theme.colors.text }]}>{c.type}</Text><Text style={[styles.categoryCount, { color: c.color }]}>{c.count}</Text></View>
                <Text style={[styles.categoryOpen, { color: theme.colors.secondaryText }]}>Avg open: {c.avgOpen}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><PenTool size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Templates</Text></View></View>
          <View style={styles.templateList}>
            {recentTemplates.map((t) => (
              <View key={t.name} style={styles.templateCard}>
                <View style={styles.templateHeader}><Text style={[styles.templateName, { color: theme.colors.text }]}>{t.name}</Text><View style={[styles.templateStatus, { backgroundColor: t.status === 'live' ? '#10B98120' : t.status === 'testing' ? '#06B6D420' : '#F59E0B20' }]}><Text style={[styles.templateStatusText, { color: t.status === 'live' ? '#10B981' : t.status === 'testing' ? '#06B6D4' : '#F59E0B' }]}>{t.status}</Text></View></View>
                <View style={styles.templateMeta}><Text style={[styles.templateType, { color: theme.colors.secondaryText }]}>{t.type}</Text><Text style={[styles.templateCTR, { color: '#8B5CF6' }]}>CTR: {t.ctr}</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Welcome series templates with personalization get 34% higher CTR', color: '#10B981' },{ msg: 'Dark mode templates now render correctly across 98% of email clients', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Template Designer is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: PenTool, component: renderOverviewTab() }];
  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 }, tabContent: { padding: 20 },
  parentLink: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 20, paddingHorizontal: 4 }, parentLinkText: { fontSize: 14, fontWeight: '600' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 }, metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' }, metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 }, sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 }, sectionTitle: { fontSize: 18, fontWeight: '700' },
  categoryList: { gap: 12 }, categoryCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, categoryType: { fontSize: 14, fontWeight: '600', flex: 1 }, categoryCount: { fontSize: 14, fontWeight: '700' },
  categoryOpen: { fontSize: 12 },
  templateList: { gap: 12 }, templateCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  templateHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }, templateName: { fontSize: 14, fontWeight: '600', flex: 1 },
  templateStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }, templateStatusText: { fontSize: 11, fontWeight: '600' },
  templateMeta: { flexDirection: 'row', gap: 12 }, templateType: { fontSize: 11 }, templateCTR: { fontSize: 11, fontWeight: '600' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
