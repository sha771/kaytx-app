import React, { useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import {
  Wrench, BookOpen, CheckCircle, Clock, BarChart3, Lock,
  TrendingUp, Sparkles, Zap, Wifi, Shield, Cpu, Database,
  RefreshCw, Eye, Star, ArrowRight, ChevronRight, Plus,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AITroubleshootingGuideScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-troubleshooting-guide')!;
  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();
  const isPremiumLocked = useMemo(() => agent.isPremium && (subscription?.plan === 'free' || subscription?.plan === 'starter'), [agent.isPremium, subscription]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { guides: 86, resolutionRate: '89.6%', avgTime: '3m 42s', autoResolved: 1423 };

  const issueCategories = [
    { name: 'Connectivity', icon: Wifi, count: 24, color: '#3B82F6', trend: '+8%' },
    { name: 'Authentication', icon: Shield, count: 18, color: '#10B981', trend: '-3%' },
    { name: 'Performance', icon: Cpu, count: 22, color: '#EF4444', trend: '+12%' },
    { name: 'Data & Sync', icon: Database, count: 14, color: '#8B5CF6', trend: '+5%' },
    { name: 'Integration', icon: RefreshCw, count: 8, color: '#F59E0B', trend: '-1%' },
  ];

  const guides = [
    { id: 'TG-001', title: 'Cannot Connect to Server', category: 'Connectivity', steps: 5, successRate: '94.2%', usage: 1240, updated: '1 day ago' },
    { id: 'TG-002', title: 'Login Token Expired', category: 'Authentication', steps: 3, successRate: '91.8%', usage: 890, updated: '3 days ago' },
    { id: 'TG-003', title: 'Slow Page Loading', category: 'Performance', steps: 6, successRate: '87.4%', usage: 670, updated: '2 days ago' },
    { id: 'TG-004', title: 'Data Sync Failing', category: 'Data & Sync', steps: 4, successRate: '89.1%', usage: 520, updated: '5 days ago' },
  ];

  const renderGuidesTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <BookOpen size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.guides}</Text><Text style={styles.metricLabel}>Guides</Text>
          </LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.resolutionRate}</Text><Text style={styles.metricLabel}>Resolution Rate</Text>
          </LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.avgTime}</Text><Text style={styles.metricLabel}>Avg Time</Text>
          </LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Zap size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.autoResolved.toLocaleString()}</Text><Text style={styles.metricLabel}>Auto-Resolved</Text>
          </LinearGradient>
        </View>

        {/* Issue Categories */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Wrench size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Issue Categories</Text></View>
            <TouchableOpacity style={[styles.addBtn, { backgroundColor: theme.colors.primary }]}><Plus size={16} color="#fff" /></TouchableOpacity>
          </View>
          <View style={styles.categoryList}>
            {issueCategories.map((cat) => (
              <View key={cat.name} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}><cat.icon size={18} color={cat.color} /></View>
                  <Text style={[styles.categoryName, { color: theme.colors.text }]}>{cat.name}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={[styles.categoryCount, { color: theme.colors.text }]}>{cat.count} guides</Text>
                  <Text style={[styles.categoryTrend, { color: cat.trend.startsWith('+') ? '#10B981' : '#EF4444' }]}>{cat.trend}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Troubleshooting Guides */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><BookOpen size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Guides</Text></View>
          </View>
          <View style={styles.guideList}>
            {guides.map((g) => (
              <TouchableOpacity key={g.id} style={styles.guideCard}>
                <View style={styles.guideHeader}>
                  <View style={styles.guideInfo}>
                    <Text style={[styles.guideTitle, { color: theme.colors.text }]}>{g.title}</Text>
                    <Text style={[styles.guideCategory, { color: theme.colors.secondaryText }]}>{g.category} · {g.steps} steps</Text>
                  </View>
                  <ChevronRight size={18} color={theme.colors.secondaryText} />
                </View>
                <View style={styles.guideMetrics}>
                  <View style={styles.guideMetric}>
                    <CheckCircle size={14} color="#10B981" /><Text style={[styles.guideMetricText, { color: '#10B981' }]}>{g.successRate}</Text>
                  </View>
                  <View style={styles.guideMetric}>
                    <Eye size={14} color={theme.colors.secondaryText} /><Text style={[styles.guideMetricText, { color: theme.colors.secondaryText }]}>{g.usage.toLocaleString()} uses</Text>
                  </View>
                  <Text style={[styles.guideUpdated, { color: theme.colors.secondaryText }]}>{g.updated}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI Troubleshooting Guide is part of our Enterprise suite. Upgrade your plan to activate this agent.</Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderAnalyticsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><BarChart3 size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Resolution Analytics</Text></View>
          </View>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Total Resolutions</Text><Text style={[styles.analyticsValue, { color: '#10B981' }]}>1,423</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Avg Steps to Resolve</Text><Text style={[styles.analyticsValue, { color: '#3B82F6' }]}>4.2</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Self-Service Rate</Text><Text style={[styles.analyticsValue, { color: '#8B5CF6' }]}>72.8%</Text></View>
            <View style={styles.analyticsItem}><Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>Escalation Rate</Text><Text style={[styles.analyticsValue, { color: '#F59E0B' }]}>10.4%</Text></View>
          </View>
        </View>

        {/* AI Recommendations */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Recommendations</Text></View>
          </View>
          <View style={styles.recList}>
            {[
              { msg: 'Add guide for "WebSocket connection drops" — 34 unresolved queries', color: '#EF4444' },
              { msg: 'Update "Slow Page Loading" guide — success rate dropped 3%', color: '#F59E0B' },
              { msg: 'Merge "DNS Cache" and "Server Connection" guides for efficiency', color: '#3B82F6' },
            ].map((rec, idx) => (
              <View key={idx} style={[styles.recCard, { borderLeftColor: rec.color }]}>
                <Text style={[styles.recText, { color: theme.colors.text }]}>{rec.msg}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'guides', label: 'Guides', icon: Wrench, component: renderGuidesTab() },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, component: renderAnalyticsTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 25 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 20, gap: 8 },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  section: { padding: 20, borderRadius: 24, marginBottom: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  addBtn: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  categoryList: { gap: 12 },
  categoryItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  categoryLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  categoryName: { fontSize: 15, fontWeight: '600' },
  categoryRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  categoryCount: { fontSize: 14, fontWeight: '600' },
  categoryTrend: { fontSize: 12, fontWeight: '600' },
  guideList: { gap: 12 },
  guideCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  guideHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  guideInfo: { flex: 1 },
  guideTitle: { fontSize: 15, fontWeight: '700' },
  guideCategory: { fontSize: 12, marginTop: 4 },
  guideMetrics: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  guideMetric: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  guideMetricText: { fontSize: 12, fontWeight: '600' },
  guideUpdated: { fontSize: 12 },
  analyticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  analyticsItem: { width: '48%', backgroundColor: 'rgba(0,0,0,0.02)', padding: 16, borderRadius: 16 },
  analyticsLabel: { fontSize: 12, marginBottom: 8 },
  analyticsValue: { fontSize: 24, fontWeight: '800' },
  recList: { gap: 12 },
  recCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' },
  recText: { fontSize: 13, lineHeight: 18 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 },
  lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
