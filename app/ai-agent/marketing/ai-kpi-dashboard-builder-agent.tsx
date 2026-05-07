import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { LayoutDashboard, TrendingUp, Zap, ChevronLeft, Sparkles, Lock, Award, Activity, BarChart3, Monitor, Layers } from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const agent = {
  id: 'ai-kpi-dashboard-builder', name: 'AI KPI Dashboard Builder', title: 'Custom Analytics Dashboards',
  description: 'Builds and maintains custom KPI dashboards with real-time data visualization, automated alerts, and executive-ready reporting for marketing performance.',
  capabilities: ['Dashboard Design', 'KPI Tracking', 'Real-time Visualization', 'Automated Alerts', 'Executive Reports', 'Custom Widgets', 'Data Integration', 'Scheduled Delivery'],
  category: 'marketing' as const, type: 'employee' as const, isPremium: true, parentId: 'ai-marketing-analytics-agent',
};

export default function AIKPIDashboardBuilderAgentPage() {
  const { theme } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const isPremiumLocked = false;
  useEffect(() => { if (isPremiumLocked) Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start(); }, [isPremiumLocked, fadeAnim]);

  const keyMetrics = { dashboards: 24, widgets: 186, alerts: 42, reports: 128 };
  const dashboardTypes = [
    { type: 'Executive', count: 6, viewers: 12, color: '#06B6D4' },
    { type: 'Campaign', count: 8, viewers: 24, color: '#10B981' },
    { type: 'Channel', count: 6, viewers: 18, color: '#8B5CF6' },
    { type: 'Operational', count: 4, viewers: 32, color: '#F59E0B' },
  ];
  const topDashboards = [
    { name: 'CMO Performance Overview', type: 'Executive', kpis: 12, viewers: 4 },
    { name: 'Paid Media ROI', type: 'Campaign', kpis: 8, viewers: 8 },
    { name: 'Channel Comparison', type: 'Channel', kpis: 10, viewers: 6 },
    { name: 'Daily Marketing Ops', type: 'Operational', kpis: 14, viewers: 12 },
  ];

  const renderOverviewTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.parentLink} onPress={() => router.push('/ai-agent/marketing/ai-marketing-analytics-agent')}>
          <ChevronLeft size={16} color={theme.colors.primary} /><Text style={[styles.parentLinkText, { color: theme.colors.primary }]}>AI Marketing Analytics Agent</Text>
        </TouchableOpacity>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#06B6D4', '#0891B2']} style={styles.metricCard}><Monitor size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.dashboards}</Text><Text style={styles.metricLabel}>Dashboards</Text></LinearGradient>
          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}><LayoutDashboard size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.widgets}</Text><Text style={styles.metricLabel}>Widgets</Text></LinearGradient>
          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}><Activity size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.alerts}</Text><Text style={styles.metricLabel}>Alerts</Text></LinearGradient>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}><BarChart3 size={20} color="#fff" /><Text style={styles.metricValue}>{keyMetrics.reports}</Text><Text style={styles.metricLabel}>Reports/mo</Text></LinearGradient>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Layers size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Dashboard Types</Text></View></View>
          <View style={styles.typeList}>
            {dashboardTypes.map((d) => (
              <View key={d.type} style={styles.typeCard}>
                <View style={styles.typeHeader}><Text style={[styles.typeName, { color: theme.colors.text }]}>{d.type}</Text><Text style={[styles.typeCount, { color: d.color }]}>{d.count}</Text></View>
                <Text style={[styles.typeViewers, { color: theme.colors.secondaryText }]}>{d.viewers} viewers</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Monitor size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Dashboards</Text></View></View>
          <View style={styles.dashList}>
            {topDashboards.map((d) => (
              <View key={d.name} style={styles.dashCard}>
                <Text style={[styles.dashName, { color: theme.colors.text }]}>{d.name}</Text>
                <View style={styles.dashMeta}><Text style={[styles.dashType, { color: theme.colors.secondaryText }]}>{d.type}</Text><Text style={[styles.dashKPI, { color: '#06B6D4' }]}>{d.kpis} KPIs</Text><Text style={[styles.dashViewers, { color: '#8B5CF6' }]}>{d.viewers} viewers</Text></View>
              </View>
            ))}
          </View>
        </View>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}><View style={styles.sectionTitleRow}><Sparkles size={20} color={theme.colors.primary} /><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text></View></View>
          <View style={styles.insightsList}>
            {[{ msg: 'Executive dashboards accessed 4x more than last quarter — stakeholder engagement rising', color: '#10B981' },{ msg: 'Auto-generated weekly reports saving 6 hours of manual analyst work', color: '#3B82F6' }].map((ins, idx) => (
              <View key={idx} style={[styles.insightCard, { borderLeftColor: ins.color }]}><Text style={[styles.insightMessage, { color: theme.colors.text }]}>{ins.msg}</Text></View>
            ))}
          </View>
        </View>
      </ScrollView>
      {isPremiumLocked && (<Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}><View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}><View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}><Lock size={32} color={theme.colors.primary} /></View><Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Sub-Agent</Text><Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>The AI KPI Dashboard Builder is part of our Enterprise suite. Upgrade to activate.</Text><TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}><Text style={styles.upgradeBtnText}>Upgrade Plan</Text></TouchableOpacity></View></Animated.View>)}
    </View>
  );

  const customTabs = [{ id: 'overview', label: 'Overview', icon: LayoutDashboard, component: renderOverviewTab() }];
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
  typeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }, typeName: { fontSize: 14, fontWeight: '600', flex: 1 }, typeCount: { fontSize: 14, fontWeight: '700' },
  typeViewers: { fontSize: 12 },
  dashList: { gap: 12 }, dashCard: { backgroundColor: 'rgba(0,0,0,0.02)', padding: 14, borderRadius: 14 },
  dashName: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  dashMeta: { flexDirection: 'row', gap: 12 }, dashType: { fontSize: 11 }, dashKPI: { fontSize: 11, fontWeight: '600' }, dashViewers: { fontSize: 11, fontWeight: '600' },
  insightsList: { gap: 12 }, insightCard: { padding: 14, borderRadius: 12, borderLeftWidth: 4, backgroundColor: 'rgba(0,0,0,0.02)' }, insightMessage: { fontSize: 14, lineHeight: 20 },
  lockOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', padding: 20, zIndex: 100 }, lockCard: { width: '100%', padding: 30, borderRadius: 32, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5 },
  lockIconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }, lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 }, lockDesc: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 30, paddingHorizontal: 10 },
  upgradeBtn: { width: '100%', height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
