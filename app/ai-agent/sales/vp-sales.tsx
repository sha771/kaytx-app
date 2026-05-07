import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { TrendingUp, Activity, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star, DollarSign, Award, BarChart3, PieChart, MapPin, Brain, FileText, Settings, Bell, TrendingDown, Globe, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'pipeline-analyst', name: 'AI Pipeline Analyst', description: 'Real-time pipeline health monitoring & deal progression analytics', icon: BarChart3, color: '#007AFF' },
  { id: 'quota-tracker', name: 'AI Quota Tracker', description: 'Quota attainment monitoring & performance gap analysis', icon: Target, color: '#34C759' },
  { id: 'territory-planner', name: 'AI Territory Planner', description: 'Territory optimization & account allocation intelligence', icon: MapPin, color: '#FF9500' },
];

export default function VPSalesPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Deals Closed', value: '3,847', icon: CircleCheckBig, color: '#34C759', change: '+12%' },
    { label: 'Pipeline Value', value: '$124M', icon: DollarSign, color: '#007AFF', change: '+8%' },
    { label: 'Win Rate', value: '42.3%', icon: Target, color: '#FF9500', change: '+3.2%' },
    { label: 'Forecast Acc.', value: '96.8%', icon: ChartBarBig, color: '#AF52DE', change: '+1.5%' },
  ];

  const kpis = [
    { label: 'Avg Deal Size', value: '$87.5K', trend: 'up' },
    { label: 'Sales Cycle', value: '42 days', trend: 'down' },
    { label: 'Quota Attainment', value: '118%', trend: 'up' },
    { label: 'Pipeline Coverage', value: '3.2x', trend: 'up' },
  ];

  const capabilities = [
    'Pipeline Management', 'Forecasting', 'Deal Coaching', 'Competitive Intel',
    'Pricing Strategy', 'Territory Design', 'Quota Planning', 'Win-Loss Analysis',
    'Revenue Modeling', 'Team Performance', 'Strategic Planning', 'Board Reporting'
  ];

  const responsibilities = [
    'Strategic Sales Planning & Go-to-Market Execution',
    'Pipeline Health Management & Deal Velocity Optimization',
    'Accurate Revenue Forecasting & Board Reporting',
    'Sales Team Performance Coaching & Development',
    'Territory Design & Account Allocation Strategy',
    'Quota Setting & Compensation Plan Alignment',
    'Competitive Intelligence & Market Positioning',
    'Win-Loss Analysis & Deal Review Facilitation',
    'Pricing Strategy & Discount Authority Management',
    'Cross-Functional Alignment with Marketing & Product'
  ];

  const activities = [
    { time: '2 min ago', text: 'Closed enterprise deal: $2.4M ARR', icon: DollarSign, type: 'win' },
    { time: '15 min ago', text: 'Updated Q3 forecast: +$18M upside identified', icon: ChartBarBig, type: 'forecast' },
    { time: '45 min ago', text: 'Coached 8 reps on enterprise negotiation tactics', icon: Award, type: 'coaching' },
    { time: '1 hour ago', text: 'Approved strategic discount: 22% for $5M deal', icon: Shield, type: 'approval' },
    { time: '2 hours ago', text: 'Redesigned West Coast territory: +15% efficiency', icon: Zap, type: 'strategy' },
    { time: '3 hours ago', text: 'Completed competitive analysis: 3 key threats', icon: Brain, type: 'intel' },
  ];

  const quickActions = [
    { label: 'Pipeline Review', icon: BarChart3 },
    { label: 'Forecast Update', icon: TrendingUp },
    { label: 'Team Coaching', icon: Users },
    { label: 'Deal Desk', icon: Briefcase },
    { label: 'Territory Map', icon: MapPin },
    { label: 'Competitive Intel', icon: Brain },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#F59E0B18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F59E0B25' }]}>
          <TrendingUp size={48} color="#F59E0B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Sales</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Revenue Officer • Sales & Revenue Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F59E0B22' }]}>
            <Star size={12} color="#F59E0B" />
            <Text style={[styles.badgeText, { color: '#F59E0B' }]}>Executive</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Users size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>47 Reports</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Brain size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Dashboard</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: kpi.trend === 'up' ? '#34C75922' : '#FF3B3022' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI VP Sales serves as the chief revenue strategist, orchestrating all sales operations to drive sustainable growth. This executive AI agent combines predictive analytics, deal intelligence, and coaching automation to maximize team performance, optimize pipeline velocity, and ensure accurate forecasting for board-level reporting.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#F59E0B18' }]}>
              <Text style={[styles.tagText, { color: '#F59E0B' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#F59E0B22' }]}>
            <Text style={[styles.countBadgeText, { color: '#F59E0B' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in specific sales functions, reporting to the VP Sales
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(`/ai-agent/sales/${agent.id}`)} style={[styles.agentCard, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
              <agent.icon size={24} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Executive Activity Feed</Text>
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#F59E0B12' }]}>
              <action.icon size={22} color="#F59E0B" />
              <Text style={[styles.actionText, { color: '#F59E0B' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="vp-sales" agentName="AI VP Sales" />
    </ScrollView>
  );
}

function getActivityColor(type: string): string {
  const colors: Record<string, string> = {
    win: '#34C759',
    forecast: '#007AFF',
    coaching: '#AF52DE',
    approval: '#FF9500',
    strategy: '#5856D6',
    intel: '#FF2D55',
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
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionDescription: { fontSize: 13, marginBottom: 16, lineHeight: 18 },
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
  countBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12 },
  countBadgeText: { fontSize: 12, fontWeight: '700' },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  agentIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 15, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
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
});
