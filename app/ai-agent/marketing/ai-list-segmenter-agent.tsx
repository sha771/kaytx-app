import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Users, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, Filter, Mail, Target } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-list-segmenter', name: 'AI List Segmenter', title: 'Audience Segmentation Engine',
  description: 'Segments email lists using behavioral, demographic, and engagement data — creating hyper-targeted audiences for maximum campaign relevance and conversion.',
  capabilities: ['Behavioral Segmentation', 'Demographic Filters', 'Engagement Scoring', 'Dynamic Lists', 'Predictive Segments', 'Churn Risk Groups', 'Lifecycle Stages', 'Custom Criteria'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-email-marketing-agent',
};

export default function AIListSegmenterAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { segments: 48, contacts: '124K', avgMatch: '92%', dynamicLists: 18 };
  const segmentTypes = [
    { type: 'Behavioral', count: 16, contacts: '42K', color: '#06B6D4' },
    { type: 'Demographic', count: 12, contacts: '38K', color: '#10B981' },
    { type: 'Engagement', count: 10, contacts: '28K', color: '#8B5CF6' },
    { type: 'Predictive', count: 10, contacts: '16K', color: '#F59E0B' },
  ];
  const topSegments = [
    { name: 'High-Intent Buyers', size: '8.2K', openRate: '68%', revenue: '$142K' },
    { name: 'Churn Risk', size: '4.6K', openRate: '34%', revenue: '$28K' },
    { name: 'New Subscribers (30d)', size: '12.4K', openRate: '52%', revenue: '$36K' },
    { name: 'VIP Customers', size: '2.1K', openRate: '74%', revenue: '$380K' },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-email-marketing-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Email Marketing Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Filter size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.segments}</Text><Text style={styles.metricLabel}>Segments</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Users size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.contacts}</Text><Text style={styles.metricLabel}>Contacts</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Target size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgMatch}</Text><Text style={styles.metricLabel}>Avg Match</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.dynamicLists}</Text><Text style={styles.metricLabel}>Dynamic Lists</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Filter size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Segment Types</Text></View></View>
          <View style={styles.typeList}>
            {segmentTypes.map((s) => (
              <View key={s.type} style={styles.typeCard}>
                <View style={styles.typeHeader}><Text style={[styles.typeName, { color: theme.colors.text }]}>{s.type}</Text><Text style={[styles.typeCount, { color: s.color }]}>{s.count} segments</Text></View>
                <Text style={[styles.typeContacts, { color: theme.colors.secondaryText }]}>{s.contacts} contacts</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Target size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performing Segments</Text></View></View>
          <View style={styles.segmentList}>
            {topSegments.map((s) => (
              <View key={s.name} style={styles.segmentCard}>
                <Text style={[styles.segmentName, { color: theme.colors.text }]}>{s.name}</Text>
                <View style={styles.segmentMetrics}>
                  <Text style={[styles.segmentMetric, { color: theme.colors.secondaryText }]}>{s.size} contacts</Text>
                  <Text style={[styles.segmentMetric, { color: '#06B6D4' }]}>{s.openRate} open</Text>
                  <Text style={[styles.segmentMetric, { color: '#10B981' }]}>{s.revenue}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'VIP segment drives 62% of email revenue with only 1.7% of contacts', color: '#10B981' },{ msg: 'Churn risk segment grew 18% — trigger re-engagement campaign', color: '#EF4444' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI List Segmenter is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: Filter, component: renderOverviewTab() }];
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
  typeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, typeName: { fontSize: 14, fontWeight: '600', flex: 1 }, typeCount: { fontSize: 13, fontWeight: '600' },
  typeContacts: { fontSize: 12 },
  segmentList: { gap: 12 }, segmentCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  segmentName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  segmentMetrics: { flexDirection: 'row', gap: 12 }, segmentMetric: { fontSize: 11 },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
