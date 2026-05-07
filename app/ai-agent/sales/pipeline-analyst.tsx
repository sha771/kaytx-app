import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { BarChart3, Activity, CircleCheckBig, Target, TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, CheckCircle, ArrowRight, Users, Zap, Brain, FileText, Filter, Download, RefreshCw, PieChart, Layers } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PIPELINE_STAGES = [
  { stage: 'Prospecting', count: 124, value: '$8.4M', conversion: '35%', trend: 'up' },
  { stage: 'Qualification', count: 89, value: '$12.1M', conversion: '48%', trend: 'up' },
  { stage: 'Proposal', count: 56, value: '$18.7M', conversion: '42%', trend: 'down' },
  { stage: 'Negotiation', count: 34, value: '$14.2M', conversion: '67%', trend: 'up' },
  { stage: 'Closing', count: 18, value: '$9.8M', conversion: '78%', trend: 'up' },
];

const DEAL_ALERTS = [
  { type: 'at-risk', deal: 'Acme Corp - $2.4M', reason: 'No activity 14 days', priority: 'high' },
  { type: 'stalled', deal: 'TechGiant Inc - $1.8M', reason: 'Stuck in negotiation', priority: 'medium' },
  { type: 'accelerating', deal: 'GlobalRetail - $890K', reason: 'Fast progression', priority: 'low' },
  { type: 'win-ready', deal: 'FinanceHub - $3.2M', reason: 'Verbal commitment received', priority: 'high' },
];

export default function PipelineAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Total Pipeline', value: '$124.2M', icon: DollarSign, color: '#007AFF', change: '+12%' },
    { label: 'Active Deals', value: '321', icon: Layers, color: '#34C759', change: '+8%' },
    { label: 'Avg Velocity', value: '28 days', icon: Clock, color: '#FF9500', change: '-3d' },
    { label: 'Health Score', value: '87/100', icon: Activity, color: '#AF52DE', change: '+5' },
  ];

  const capabilities = [
    'Pipeline Health Scoring', 'Deal Progression Tracking', 'Velocity Analysis',
    'Stage Conversion Analytics', 'At-Risk Deal Detection', 'Forecast Contribution',
    'Win Probability Scoring', 'Competitive Deal Intel', 'Pipeline Coverage Analysis',
    'Deal Stage Distribution', 'Weighted Pipeline Value', 'Push Rate Analysis'
  ];

  const insights = [
    { title: 'Pipeline Coverage', value: '3.2x', status: 'good', description: 'Strong coverage vs quarterly target' },
    { title: 'Avg Deal Size', value: '$387K', status: 'good', description: 'Up 15% from last quarter' },
    { title: 'Sales Cycle', value: '42 days', status: 'warning', description: '3 days longer than target' },
    { title: 'Win Rate', value: '34%', status: 'good', description: 'Above industry benchmark' },
  ];

  const activities = [
    { time: '2 min ago', text: 'Flagged 3 deals at risk of stalling', icon: AlertTriangle, type: 'alert' },
    { time: '5 min ago', text: 'Updated win probability for 47 deals', icon: Target, type: 'update' },
    { time: '12 min ago', text: 'Generated weekly pipeline report', icon: FileText, type: 'report' },
    { time: '25 min ago', text: 'Identified $8M in forecast upside', icon: TrendingUp, type: 'insight' },
    { time: '1 hour ago', text: 'Synced with CRM: 156 deals updated', icon: RefreshCw, type: 'sync' },
  ];

  const quickActions = [
    { label: 'Health Report', icon: Activity },
    { label: 'Stage Analysis', icon: BarChart3 },
    { label: 'Deal Alerts', icon: AlertTriangle },
    { label: 'Export Data', icon: Download },
    { label: 'Refresh Sync', icon: RefreshCw },
    { label: 'Filter View', icon: Filter },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#007AFF18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#007AFF25' }]}>
          <BarChart3 size={48} color="#007AFF" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Pipeline Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Reports to VP Sales • Pipeline Intelligence Unit</Text>
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
            <Zap size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>Real-Time</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') || stat.change.startsWith('-') && stat.label === 'Sales Cycle' ? '#34C759' : stat.change.startsWith('-') ? '#FF3B30' : '#34C759' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pipeline by Stage</Text>
        {PIPELINE_STAGES.map((stage, index) => (
          <View key={index} style={styles.stageRow}>
            <View style={styles.stageInfo}>
              <Text style={[styles.stageName, { color: theme.colors.text }]}>{stage.stage}</Text>
              <Text style={[styles.stageCount, { color: theme.colors.textSecondary }]}>{stage.count} deals</Text>
            </View>
            <View style={styles.stageMetrics}>
              <Text style={[styles.stageValue, { color: theme.colors.text }]}>{stage.value}</Text>
              <View style={styles.conversionRow}>
                <Text style={[styles.conversionText, { color: theme.colors.textSecondary }]}>{stage.conversion}</Text>
                {stage.trend === 'up' ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
              </View>
            </View>
            <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.progressFill, { backgroundColor: getStageColor(index), width: `${(stage.count / 124) * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Deal Alerts & Insights</Text>
        {DEAL_ALERTS.map((alert, index) => (
          <View key={index} style={[styles.alertCard, { backgroundColor: theme.colors.background, borderLeftColor: getAlertColor(alert.priority), borderLeftWidth: 3 }]}>
            <View style={styles.alertIcon}>
              {alert.type === 'at-risk' && <AlertTriangle size={18} color="#FF3B30" />}
              {alert.type === 'stalled' && <Clock size={18} color="#FF9500" />}
              {alert.type === 'accelerating' && <Zap size={18} color="#34C759" />}
              {alert.type === 'win-ready' && <CheckCircle size={18} color="#007AFF" />}
            </View>
            <View style={styles.alertContent}>
              <Text style={[styles.alertDeal, { color: theme.colors.text }]}>{alert.deal}</Text>
              <Text style={[styles.alertReason, { color: theme.colors.textSecondary }]}>{alert.reason}</Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: getAlertColor(alert.priority) + '22' }]}>
              <Text style={[styles.priorityText, { color: getAlertColor(alert.priority) }]}>{alert.priority}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#007AFF18' }]}>
              <Text style={[styles.tagText, { color: '#007AFF' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pipeline Intelligence</Text>
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#007AFF12' }]}>
              <action.icon size={22} color="#007AFF" />
              <Text style={[styles.actionText, { color: '#007AFF' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="pipeline-analyst" agentName="AI Pipeline Analyst" />
    </ScrollView>
  );
}

function getStageColor(index: number): string {
  const colors = ['#34C759', '#007AFF', '#5856D6', '#FF9500', '#AF52DE'];
  return colors[index] || '#8E8E93';
}

function getAlertColor(priority: string): string {
  const colors: Record<string, string> = {
    high: '#FF3B30',
    medium: '#FF9500',
    low: '#34C759',
  };
  return colors[priority] || '#8E8E93';
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
    alert: '#FF3B30',
    update: '#007AFF',
    report: '#5856D6',
    insight: '#34C759',
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
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  stageRow: { marginBottom: 16 },
  stageInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  stageName: { fontSize: 15, fontWeight: '600' },
  stageCount: { fontSize: 13 },
  stageMetrics: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  stageValue: { fontSize: 14, fontWeight: '600' },
  conversionRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  conversionText: { fontSize: 13 },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  alertCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  alertIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F7' },
  alertContent: { flex: 1, marginLeft: 12 },
  alertDeal: { fontSize: 14, fontWeight: '600' },
  alertReason: { fontSize: 12, marginTop: 2 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  priorityText: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
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
