import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, Zap, ArrowRight, Briefcase,
  Brain, BarChart3, Filter, AlertTriangle, CheckCircle, Clock, Settings,
  FileText, Users, Eye
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-sales', name: 'AI VP Sales', route: '/ai-agent/sales/vp-sales', icon: TrendingUp, color: '#FF9500' };

export default function PipelineAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Pipeline Value', value: '$42M', icon: TrendingUp, color: '#007AFF', change: '+$3.2M' },
    { label: 'Deals Tracked', value: '284', icon: BarChart3, color: '#34C759', change: '+18' },
    { label: 'Stale Deals', value: '23', icon: AlertTriangle, color: '#FF9500', change: '-7' },
    { label: 'Avg Close Rate', value: '34%', icon: Target, color: '#AF52DE', change: '+2%' },
  ];

  const kpis = [
    { label: 'Pipeline Coverage', value: '3.2x', trend: 'up' },
    { label: 'Avg Deal Age', value: '28 days', trend: 'down' },
    { label: 'Win Rate', value: '34%', trend: 'up' },
    { label: 'Pipeline Velocity', value: '$1.5M/wk', trend: 'up' },
  ];

  const capabilities = [
    'Pipeline Analysis', 'Deal Scoring', 'Stage Tracking', 'Velocity Metrics',
    'Stagnation Detection', 'Pipeline Forecasting', 'Conversion Analysis', 'Gap Identification',
    'Trend Analysis', 'Pipeline Hygiene', 'Risk Assessment', 'Opportunity Ranking'
  ];

  const responsibilities = [
    'Real-time pipeline health monitoring and stage-by-stage analysis',
    'Deal velocity tracking and bottleneck identification across all stages',
    'Pipeline coverage ratio calculation and gap analysis against quota',
    'Stagnant deal detection and automated re-engagement recommendations',
    'Win/loss pattern analysis and conversion rate optimization insights',
    'Pipeline forecasting with weighted probability calculations',
    'Deal scoring and prioritization based on engagement signals',
    'Pipeline hygiene enforcement and data quality monitoring',
    'Competitive threat identification within active opportunities',
    'Historical trend analysis for seasonal and cyclical patterns',
    'Cross-pipeline dependency mapping and risk assessment',
    'Automated pipeline review preparation and executive reporting'
  ];

  const activities = [
    { time: '2 min ago', text: 'Flagged 5 stagnant deals in negotiation stage', icon: AlertTriangle, type: 'alert' },
    { time: '15 min ago', text: 'Pipeline coverage improved to 3.2x quota', icon: TrendingUp, type: 'metric' },
    { time: '32 min ago', text: 'Identified $2.1M in at-risk pipeline', icon: Eye, type: 'risk' },
    { time: '1 hour ago', text: 'Updated deal scores for 42 opportunities', icon: Target, type: 'scoring' },
    { time: '2 hours ago', text: 'Generated weekly pipeline review report', icon: FileText, type: 'report' },
    { time: '3 hours ago', text: 'Detected stage skip pattern in 3 deals', icon: Filter, type: 'analysis' },
  ];

  const quickActions = [
    { label: 'Pipeline View', icon: BarChart3 },
    { label: 'Deal Scores', icon: Target },
    { label: 'Risk Alerts', icon: AlertTriangle },
    { label: 'Coverage', icon: TrendingUp },
    { label: 'Velocity', icon: Clock },
    { label: 'Hygiene', icon: CheckCircle },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    alert: '#FF9500', metric: '#34C759', risk: '#FF3B30', scoring: '#007AFF', report: '#AF52DE', analysis: '#5856D6',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF950018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF950025' }]}>
          <TrendingUp size={48} color="#FF9500" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Pipeline Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Pipeline Intelligence • Sales Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><BarChart3 size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>284 Deals</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') || stat.change.startsWith('-') && stat.label === 'Stale Deals' ? '#34C759' : stat.change.startsWith('-') ? '#FF3B30' : '#34C759' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Pipeline Analyst provides deep intelligence on sales pipeline health, tracking deal velocity, stage progression, and conversion patterns. It identifies bottlenecks, flags stagnant deals, and delivers actionable insights that help sales teams accelerate pipeline movement and improve forecast accuracy.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#FF950018' }]}>
              <Text style={[styles.tagText, { color: '#FF9500' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#FF9500' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <act.icon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#FF950012' }]}>
              <action.icon size={22} color="#FF9500" />
              <Text style={[styles.actionText, { color: '#FF9500' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Sales Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="pipeline-analyst" agentName="AI Pipeline Analyst" />
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
