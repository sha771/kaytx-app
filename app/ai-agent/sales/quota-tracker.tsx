import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Target, Activity, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, Users, Award, Zap, Brain, FileText, Download, Filter, RefreshCw, PieChart, BarChart3, AlertCircle, CheckCircle, Clock, Calendar } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const TEAM_PERFORMANCE = [
  { name: 'Enterprise Team', quota: '$12M', actual: '$14.2M', attainment: 118, deals: 24, trend: 'up' },
  { name: 'Mid-Market Team', quota: '$8M', actual: '$7.1M', attainment: 89, deals: 67, trend: 'down' },
  { name: 'SMB Team', quota: '$5M', actual: '$5.8M', attainment: 116, deals: 142, trend: 'up' },
  { name: 'Channel Sales', quota: '$4M', actual: '$3.2M', attainment: 80, deals: 38, trend: 'down' },
];

const TOP_PERFORMERS = [
  { name: 'Sarah Chen', role: 'Enterprise AE', quota: '$2M', actual: '$2.8M', attainment: 140 },
  { name: 'Marcus Johnson', role: 'Mid-Market AE', quota: '$1.2M', actual: '$1.5M', attainment: 125 },
  { name: 'Emily Rodriguez', role: 'SMB AE', quota: '$800K', actual: '$1.1M', attainment: 138 },
];

const AT_RISK_REPS = [
  { name: 'David Kim', role: 'Enterprise AE', quota: '$2M', actual: '$1.1M', attainment: 55, gap: '$900K', daysLeft: 67 },
  { name: 'Lisa Thompson', role: 'Mid-Market AE', quota: '$1.2M', actual: '$720K', attainment: 60, gap: '$480K', daysLeft: 67 },
];

export default function QuotaTrackerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Total Quota', value: '$29M', icon: Target, color: '#007AFF', change: 'Q3 FY26' },
    { label: ' attainment', value: '108%', icon: TrendingUp, color: '#34C759', change: '+3%' },
    { label: 'Gap to Goal', value: '$2.3M', icon: DollarSign, color: '#FF9500', change: 'ahead' },
    { label: 'Days Left', value: '67', icon: Clock, color: '#AF52DE', change: 'Q3' },
  ];

  const capabilities = [
    'Quota Attainment Tracking', 'Performance Gap Analysis', 'Predictive Quota Modeling',
    'Team Performance Comparison', 'Individual Rep Scorecards', 'Ramp Time Analytics',
    'Territory Quota Balancing', 'SPIFF Tracking', 'Accelerator Calculations',
    'Quota Historical Analysis', 'Seasonal Adjustment', 'Headcount Planning'
  ];

  const insights = [
    { title: 'YTD Attainment', value: '104%', status: 'good', description: 'Above target for fiscal year' },
    { title: 'Rep Performance', value: '78%', status: 'warning', description: '78% of reps at or above 80%' },
    { title: 'Quota Distribution', value: 'Balanced', status: 'good', description: 'Fair allocation across teams' },
    { title: 'Risk Assessment', value: 'Low', status: 'good', description: 'On track to hit annual targets' },
  ];

  const activities = [
    { time: '3 min ago', text: 'Updated Q3 quota attainment dashboard', icon: RefreshCw, type: 'update' },
    { time: '10 min ago', text: 'Flagged 2 reps at risk of missing quota', icon: AlertCircle, type: 'alert' },
    { time: '25 min ago', text: 'Generated monthly performance report', icon: FileText, type: 'report' },
    { time: '1 hour ago', text: 'Calculated Q4 quota adjustments', icon: Target, type: 'analysis' },
    { time: '2 hours ago', text: 'Synced with compensation system', icon: DollarSign, type: 'sync' },
  ];

  const quickActions = [
    { label: 'Attainment Report', icon: BarChart3 },
    { label: 'Rep Scorecards', icon: Users },
    { label: 'Quota Adjust', icon: Target },
    { label: 'Export Data', icon: Download },
    { label: 'Team View', icon: PieChart },
    { label: 'Filter View', icon: Filter },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#34C75918' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#34C75925' }]}>
          <Target size={48} color="#34C759" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Quota Tracker</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Reports to VP Sales • Performance Analytics Unit</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Brain size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>Analyst</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Award size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>Performance</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.includes('%') || stat.change === 'ahead' || stat.change === 'Q3' ? '#34C759' : '#8E8E93' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Team Performance</Text>
        {TEAM_PERFORMANCE.map((team, index) => (
          <View key={index} style={styles.teamRow}>
            <View style={styles.teamInfo}>
              <Text style={[styles.teamName, { color: theme.colors.text }]}>{team.name}</Text>
              <Text style={[styles.teamDeals, { color: theme.colors.textSecondary }]}>{team.deals} closed deals</Text>
            </View>
            <View style={styles.teamMetrics}>
              <View style={styles.quotaRow}>
                <Text style={[styles.actualValue, { color: theme.colors.text }]}>{team.actual}</Text>
                <Text style={[styles.quotaValue, { color: theme.colors.textSecondary }]}> / {team.quota}</Text>
              </View>
              <View style={styles.attainmentRow}>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                  <View style={[styles.progressFill, { backgroundColor: getAttainmentColor(team.attainment), width: `${Math.min(team.attainment, 100)}%` }]} />
                </View>
                <Text style={[styles.attainmentText, { color: getAttainmentColor(team.attainment) }]}>{team.attainment}%</Text>
              </View>
            </View>
            {team.trend === 'up' ? <TrendingUp size={18} color="#34C759" /> : <TrendingDown size={18} color="#FF3B30" />}
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performers</Text>
        {TOP_PERFORMERS.map((rep, index) => (
          <View key={index} style={styles.performerCard}>
            <View style={[styles.rankBadge, { backgroundColor: getRankColor(index) }]}>
              <Text style={styles.rankText}>#{index + 1}</Text>
            </View>
            <View style={styles.performerInfo}>
              <Text style={[styles.performerName, { color: theme.colors.text }]}>{rep.name}</Text>
              <Text style={[styles.performerRole, { color: theme.colors.textSecondary }]}>{rep.role}</Text>
            </View>
            <View style={styles.performerMetrics}>
              <Text style={[styles.performerActual, { color: theme.colors.text }]}>{rep.actual}</Text>
              <Text style={[styles.performerAttainment, { color: getAttainmentColor(rep.attainment) }]}>{rep.attainment}%</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>At-Risk Reps</Text>
          <View style={[styles.countBadge, { backgroundColor: '#FF3B3022' }]}>
            <Text style={[styles.countBadgeText, { color: '#FF3B30' }]}>{AT_RISK_REPS.length}</Text>
          </View>
        </View>
        {AT_RISK_REPS.map((rep, index) => (
          <View key={index} style={[styles.riskCard, { backgroundColor: theme.colors.background, borderLeftColor: '#FF3B30', borderLeftWidth: 3 }]}>
            <View style={styles.riskHeader}>
              <AlertCircle size={18} color="#FF3B30" />
              <Text style={[styles.riskName, { color: theme.colors.text }]}>{rep.name}</Text>
              <Text style={[styles.riskRole, { color: theme.colors.textSecondary }]}>{rep.role}</Text>
            </View>
            <View style={styles.riskMetrics}>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Current</Text>
                <Text style={[styles.riskValue, { color: theme.colors.text }]}>{rep.actual}</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Quota</Text>
                <Text style={[styles.riskValue, { color: theme.colors.text }]}>{rep.quota}</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Gap</Text>
                <Text style={[styles.riskValue, { color: '#FF3B30' }]}>{rep.gap}</Text>
              </View>
              <View style={styles.riskMetric}>
                <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>Days Left</Text>
                <Text style={[styles.riskValue, { color: theme.colors.text }]}>{rep.daysLeft}</Text>
              </View>
            </View>
            <View style={styles.riskProgress}>
              <View style={[styles.riskProgressBar, { backgroundColor: theme.colors.background }]}>
                <View style={[styles.riskProgressFill, { backgroundColor: '#FF3B30', width: `${rep.attainment}%` }]} />
              </View>
              <Text style={[styles.riskAttainment, { color: '#FF3B30' }]}>{rep.attainment}% attainment</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#34C75918' }]}>
              <Text style={[styles.tagText, { color: '#34C759' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Intelligence</Text>
        <View style={styles.insightsGrid}>
          {insights.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.insightValue, { color: theme.colors.text }]}>{insight.value}</Text>
              <Text style={[styles.insightTitle, { color: theme.colors.textSecondary }]}>{insight.title}</Text>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(insight.status) }]} />
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: getActivityColor(act.type) + '20' }]}>
              <act.icon size={14} color={getActivityColor(act.type)} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: getActivityColor(act.type) + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: getActivityColor(act.type) }]}>{act.type}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#34C75912' }]}>
              <action.icon size={22} color="#34C759" />
              <Text style={[styles.actionText, { color: '#34C759' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="quota-tracker" agentName="AI Quota Tracker" />
    </ScrollView>
  );
}

function getAttainmentColor(attainment: number): string {
  if (attainment >= 100) return '#34C759';
  if (attainment >= 80) return '#FF9500';
  return '#FF3B30';
}

function getRankColor(index: number): string {
  const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
  return colors[index] || '#007AFF';
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    good: '#34C759',
    warning: '#FF9500',
    critical: '#FF3B30',
  };
  return colors[status] || '#8E8E93';
}

function getActivityColor(type: string): string {
  const colors: Record<string, string> = {
    update: '#007AFF',
    alert: '#FF3B30',
    report: '#5856D6',
    analysis: '#34C759',
    sync: '#FF9500',
  };
  return colors[type] || '#8E8E93';
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  teamRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA30' },
  teamInfo: { flex: 1 },
  teamName: { fontSize: 15, fontWeight: '600' },
  teamDeals: { fontSize: 12, marginTop: 2 },
  teamMetrics: { flex: 1.5, marginRight: 12 },
  quotaRow: { flexDirection: 'row', alignItems: 'baseline' },
  actualValue: { fontSize: 15, fontWeight: '600' },
  quotaValue: { fontSize: 13 },
  attainmentRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 },
  progressBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  attainmentText: { fontSize: 12, fontWeight: '600', minWidth: 40 },
  performerCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, padding: 12, borderRadius: 12, backgroundColor: '#F2F2F710' },
  rankBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  rankText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },
  performerInfo: { flex: 1, marginLeft: 12 },
  performerName: { fontSize: 15, fontWeight: '600' },
  performerRole: { fontSize: 12, marginTop: 2 },
  performerMetrics: { alignItems: 'flex-end' },
  performerActual: { fontSize: 14, fontWeight: '600' },
  performerAttainment: { fontSize: 13, fontWeight: '600', marginTop: 2 },
  countBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  countBadgeText: { fontSize: 12, fontWeight: '700' },
  riskCard: { padding: 14, borderRadius: 12, marginBottom: 12 },
  riskHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  riskName: { fontSize: 15, fontWeight: '600' },
  riskRole: { fontSize: 13 },
  riskMetrics: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  riskMetric: { alignItems: 'center' },
  riskLabel: { fontSize: 11 },
  riskValue: { fontSize: 14, fontWeight: '600', marginTop: 2 },
  riskProgress: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  riskProgressBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  riskProgressFill: { height: '100%', borderRadius: 3 },
  riskAttainment: { fontSize: 12, fontWeight: '600' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  insightsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  insightCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  insightValue: { fontSize: 20, fontWeight: 'bold' },
  insightTitle: { fontSize: 12, marginTop: 4 },
  statusDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '30%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
});
