import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase, Brain, BarChart3, Link2, DollarSign, Users, Award, AlertTriangle, FileText, Settings, TrendingUp as TrendingUpIcon } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-channel-partners', name: 'AI VP Channel Partners', route: '/ai-agent/sales/vp-channel-partners', icon: Link2, color: '#AF52DE' };

export default function ChannelPerformanceTrackerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Active Partners', value: '847', icon: Users, color: '#007AFF', change: '+42' },
    { label: 'Channel Rev', value: '$34M', icon: DollarSign, color: '#34C759', change: '+28%' },
    { label: 'Top Performers', value: '156', icon: Award, color: '#FF9500', change: '+18' },
    { label: 'At Risk', value: '12', icon: AlertTriangle, color: '#AF52DE', change: '-5' },
  ];

  const kpis = [
    { label: 'Partner Productivity', value: '$40K', trend: 'up' },
    { label: 'Certified Rate', value: '84%', trend: 'up' },
    { label: 'Deal Reg Time', value: '2 days', trend: 'down' },
    { label: 'Partner NPS', value: '68', trend: 'up' },
  ];

  const capabilities = ['Performance Tracking','Tier Management','Revenue Attribution','Deal Registration','Partner Scoring','Health Monitoring','Benchmarking','Leaderboards','Risk Alerts','Productivity Analysis','Certification Tracking','Co-sell Tracking'];

  const responsibilities = ['Real-time partner performance dashboard and KPI tracking','Partner tier movement and certification status monitoring','Channel revenue attribution and pipeline contribution analysis','Deal registration volume and approval time tracking','Partner health score calculation and risk flagging','Performance benchmarking against peer groups','Partner productivity analysis and best practice identification','At-risk partner identification and retention program triggering','Leaderboard generation and partner recognition programs','Certification and training completion tracking','Co-sell deal participation and contribution tracking'];

  const activities = [
    { time: '6 min ago', text: 'Partner tier promotion: 8 Gold partners elevated', icon: Award, type: 'promotion' },
    { time: '19 min ago', text: 'Deal registered: $2.1M enterprise opportunity', icon: DollarSign, type: 'deal' },
    { time: '35 min ago', text: 'At-risk partner flagged: TechCorp declining 40%', icon: AlertTriangle, type: 'risk' },
    { time: '1 hour ago', text: 'Performance benchmark: Q2 rankings published', icon: BarChart3, type: 'benchmark' },
    { time: '2 hours ago', text: 'Certification batch: 24 partners completed', icon: Award, type: 'cert' },
    { time: '4 hours ago', text: 'Revenue attribution updated: $4.2M recognized', icon: DollarSign, type: 'revenue' },
  ];

  const quickActions = [
    { label: 'Dashboard', icon: BarChart3 },{ label: 'Partners', icon: Users },{ label: 'Deals', icon: DollarSign },{ label: 'Tiers', icon: Award },{ label: 'Alerts', icon: AlertTriangle },{ label: 'Reports', icon: FileText },{ label: 'Rankings', icon: TrendingUpIcon },{ label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = { promotion: '#34C759', deal: '#007AFF', risk: '#FF3B30', benchmark: '#FF9500', cert: '#AF52DE', revenue: '#5856D6' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#34C75918' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#34C75925' }]}>
          <BarChart3 size={48} color="#34C759" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Channel Performance Tracker</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Partner Analytics • Channel Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Briefcase size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Users size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>847 Partners</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Brain size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
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
          The AI Channel Performance Tracker monitors partner ecosystem health through real-time analytics, tier management, and risk detection. It provides visibility into partner productivity, revenue attribution, and certification status to optimize channel performance and retention.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#34C75918' }]}><Text style={[styles.tagText, { color: '#34C759' }]}>{cap}</Text></View>))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#34C759' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => { const ActionIcon = action.icon; return (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#34C75912' }]}>
              <ActionIcon size={22} color="#34C759" />
              <Text style={[styles.actionText, { color: '#34C759' }]}>{action.label}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Channel Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="channel-performance-tracker" agentName="AI Channel Performance Tracker" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
