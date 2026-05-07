import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { BookOpen, CheckCircle, Clock, BarChart3, Lock, Sparkles, ChevronRight, Search, FileText, Edit, Plus, Eye } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AIKnowledgeBaseCuratorScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-knowledge-base-curator')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent?.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent?.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const metrics = { articles: 486, updated: 24, gaps: 8, coverage: '92.4%' };
  const categories = [
    { name: 'Getting Started', articles: 62, views: 8420, health: '96%' },
    { name: 'Troubleshooting', articles: 124, views: 12400, health: '89%' },
    { name: 'API Reference', articles: 86, views: 5680, health: '94%' },
    { name: 'Best Practices', articles: 48, views: 3240, health: '91%' },
    { name: 'Billing & Account', articles: 38, views: 4120, health: '88%' },
  ];
  const gapAlerts = [
    { topic: 'Webhook retry logic', requests: 34, status: 'draft' },
    { topic: 'SSO configuration', requests: 28, status: 'needed' },
    { topic: 'Rate limiting details', requests: 22, status: 'draft' },
  ];

  const renderKnowledgeTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}><BookOpen size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.articles}</Text><Text style={styles.metricLabel}>Articles</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><Edit size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.updated}</Text><Text style={styles.metricLabel}>Updated Today</Text></LinearGradient>
          <LinearGradient colors={['#EF4444', '#DC2626']} style={styles.metricCard}><Search size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.gaps}</Text><Text style={styles.metricLabel}>Content Gaps</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><Eye size={20} color="#fff" /><Text style={styles.metricValue}>{metrics.coverage}</Text><Text style={styles.metricLabel}>Coverage</Text></LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><BookOpen size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Categories</Text></View></View>
          <View style={styles.catList}>
            {categories.map((c) => (
              <View key={c.name} style={styles.catCard}>
                <View style={styles.catHeader}><Text style={[styles.catName, { color: theme.colors.text }]}>{c.name}</Text><Text style={[styles.catHealth, { color: parseFloat(c.health) > 90 ? '#10B981' : '#F59E0B' }]}>{c.health}</Text></View>
                <View style={styles.catMetrics}>
                  <Text style={[styles.catMetric, { color: theme.colors.secondaryText }]}>{c.articles} articles</Text>
                  <Text style={[styles.catMetric, { color: theme.colors.secondaryText }]}>{c.views.toLocaleString()} views</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Content Gap Alerts</Text></View></View>
          <View style={styles.gapList}>
            {gapAlerts.map((g) => (
              <View key={g.topic} style={styles.gapCard}>
                <View style={styles.gapHeader}><Text style={[styles.gapTopic, { color: theme.colors.text }]}>{g.topic}</Text>
                  <View style={[styles.gapBadge, { backgroundColor: g.status === 'draft' ? '#F59E0B20' : '#EF444420' }]}><Text style={[styles.gapBadgeText, { color: g.status === 'draft' ? '#F59E0B' : '#EF4444' }]}>{g.status}</Text></View>
                </View>
                <Text style={[styles.gapRequests, { color: theme.colors.secondaryText }]}>{g.requests} unmatched queries</Text>
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
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>Upgrade to activate the AI Knowledge Base Curator.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const customTabs = [{ id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, component: renderKnowledgeTab() }];
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
  catList: { gap: 12 }, catCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  catHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  catName: { fontSize: 15, fontWeight: '700' },
  catHealth: { fontSize: 14, fontWeight: '700' },
  catMetrics: { flexDirection: 'row', gap: 16 },
  catMetric: { fontSize: 12 },
  gapList: { gap: 12 }, gapCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  gapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  gapTopic: { fontSize: 14, fontWeight: '600' },
  gapBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  gapBadgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  gapRequests: { fontSize: 12 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center' },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
