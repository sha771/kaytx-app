import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase, Brain, BarChart3, FileText, CheckCircle, Clock, Settings, PieChart, RefreshCw, Download, Zap } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'sales-ops-manager', name: 'AI Sales Operations Manager', route: '/ai-agent/sales/sales-ops-manager', icon: BarChart3, color: '#FF9500' };

export default function ReportingAutomatorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Reports Gen', value: '1.2K', icon: FileText, color: '#007AFF', change: '+84' },
    { label: 'Auto-Scheduled', value: '328', icon: Clock, color: '#34C759', change: '+42' },
    { label: 'Dashboards', value: '56', icon: PieChart, color: '#FF9500', change: '+8' },
    { label: 'Time Saved', value: '240h', icon: RefreshCw, color: '#AF52DE', change: '+32h' },
  ];
  const kpis = [
    { label: 'On-Time Delivery', value: '99.2%', trend: 'up' },
    { label: 'Data Freshness', value: '<15min', trend: 'up' },
    { label: 'Error Rate', value: '0.3%', trend: 'down' },
    { label: 'Adoption', value: '94%', trend: 'up' },
  ];
  const capabilities = ['Report Generation','Dashboard Builder','Schedule Automation','Data Aggregation','KPI Tracking','Trend Analysis','Alert Triggers','Template Library','Cross-Source Fusion','PDF/Excel Export','Real-time Refresh','Custom Metrics'];
  const responsibilities = [
    'Automated report generation from multiple CRM and sales data sources',
    'Dashboard builder with drag-and-drop widget configuration',
    'Schedule automation for daily, weekly, and monthly report delivery',
    'Data aggregation across pipelines, forecasts, and activity metrics',
    'KPI tracking with threshold-based alerting and escalation',
    'Trend analysis with anomaly detection and variance reporting',
    'Alert triggers for metric deviations and milestone achievements',
    'Template library management for standardized reporting formats',
    'Cross-source data fusion combining CRM, finance, and marketing data',
    'PDF and Excel export with branded formatting and distribution lists',
    'Real-time data refresh with configurable cache and sync intervals',
    'Custom metric builder for business-specific calculations and formulas'
  ];
  const activities = [
    { time: '2 min ago', text: 'Weekly pipeline report generated and distributed', icon: FileText, type: 'report' },
    { time: '15 min ago', text: 'Dashboard refreshed: Q2 forecast updated live', icon: PieChart, type: 'dashboard' },
    { time: '32 min ago', text: 'Alert triggered: Win rate dropped below 28%', icon: Zap, type: 'alert' },
    { time: '1 hour ago', text: 'Monthly executive summary exported to PDF', icon: Download, type: 'export' },
    { time: '2 hours ago', text: 'Data aggregation: 4 sources synced in 12s', icon: RefreshCw, type: 'sync' },
    { time: '3 hours ago', text: 'Custom metric created: Weighted Pipeline Velocity', icon: BarChart3, type: 'metric' },
  ];
  const quickActions = [
    { label: 'Generate', icon: FileText },{ label: 'Dashboards', icon: PieChart },{ label: 'Schedule', icon: Clock },{ label: 'Export', icon: Download },{ label: 'Alerts', icon: Zap },{ label: 'Refresh', icon: RefreshCw },{ label: 'Metrics', icon: BarChart3 },{ label: 'Settings', icon: Settings },
  ];
  const typeColors: Record<string, string> = { report: '#007AFF', dashboard: '#34C759', alert: '#FF3B30', export: '#FF9500', sync: '#AF52DE', metric: '#5856D6' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#5856D618' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5856D625' }]}><FileText size={48} color="#5856D6" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Reporting Automator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Reporting Intelligence • Sales Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5856D622' }]}><FileText size={12} color="#5856D6" /><Text style={[styles.badgeText, { color: '#5856D6' }]}>1.2K Reports</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>); })}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (<View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
            <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
            <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>{kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}</View>
          </View>))}
        </View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Reporting Automator eliminates manual reporting through automated generation, scheduling, and distribution of sales reports and dashboards. It aggregates data from multiple sources, tracks KPIs with threshold alerting, and delivers real-time insights to stakeholders on schedule.</Text>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>{capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#5856D618' }]}><Text style={[styles.tagText, { color: '#5856D6' }]}>{cap}</Text></View>))}</View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (<View key={index} style={styles.responsibilityRow}><View style={[styles.bulletPoint, { backgroundColor: '#5856D6' }]} /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}><ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} /></View>
            <View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}><Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text></View>
          </View>); })}
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>{quickActions.map((action, index) => { const ActionIcon = action.icon; return (
          <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#5856D612' }]}><ActionIcon size={22} color="#5856D6" /><Text style={[styles.actionText, { color: '#5856D6' }]}>{action.label}</Text></TouchableOpacity>); })}</View>
      </View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Manager Agent • Sales Operations</Text></View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <AgentFeatures agentId="reporting-automator" agentName="AI Reporting Automator" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bulletPoint: { width: 6, height: 6, borderRadius: 3 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
