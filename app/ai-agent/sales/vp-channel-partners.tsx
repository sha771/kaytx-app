import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Link2, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap,
  TrendingUp, Users, Brain, FileText, BarChart3, Award, UserPlus,
  Megaphone, Briefcase, Settings, TrendingDown, Share2, Rocket
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'partner-onboarding-agent', name: 'AI Partner Onboarding Agent', description: 'Streamlines partner onboarding & certification workflows', icon: UserPlus, color: '#007AFF' },
  { id: 'channel-performance-tracker', name: 'AI Channel Performance Tracker', description: 'Real-time channel metrics & partner performance analytics', icon: BarChart3, color: '#34C759' },
  { id: 'co-marketing-coordinator', name: 'AI Co-marketing Coordinator', description: 'Joint marketing campaign planning & MDF management', icon: Megaphone, color: '#FF9500' },
];

export default function VPChannelPartnersPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Active Partners', value: '847', icon: Users, color: '#007AFF', change: '+42' },
    { label: 'Channel Revenue', value: '$34M', icon: TrendingUp, color: '#34C759', change: '+28%' },
    { label: 'Partner NPS', value: '68', icon: Award, color: '#FF9500', change: '+8' },
    { label: 'Co-sell Deals', value: '156', icon: Share2, color: '#AF52DE', change: '+34' },
  ];

  const kpis = [
    { label: 'Partner Productivity', value: '$40K', trend: 'up' },
    { label: 'Time to Productive', value: '45 days', trend: 'down' },
    { label: 'Certified Partners', value: '412', trend: 'up' },
    { label: 'Channel Mix', value: '32%', trend: 'up' },
  ];

  const capabilities = [
    'Channel Strategy', 'Partner Recruitment', 'Onboarding Automation', 'Enablement Programs',
    'Performance Tracking', 'Co-selling', 'Co-marketing', 'Deal Registration',
    'Conflict Resolution', 'MDF Management', 'Partner Tiers', 'Revenue Attribution'
  ];

  const responsibilities = [
    'Channel partner strategy, recruitment, and ecosystem development',
    'Partner onboarding automation and certification program management',
    'Channel revenue forecasting and partner productivity optimization',
    'Partner enablement content and sales tool development',
    'Channel conflict resolution and deal registration management',
    'Co-marketing campaign coordination and MDF fund allocation',
    'Partner performance tracking and tier management',
    'Channel sales process optimization and best practice sharing',
    'Partner advisory council coordination and feedback collection',
    'Channel technology stack management and integration',
    'Partner compensation and incentive program design',
    'Cross-channel collaboration and ecosystem orchestration'
  ];

  const activities = [
    { time: '3 min ago', text: 'Onboarded platinum partner: TechSolutions Inc', icon: UserPlus, type: 'onboarding' },
    { time: '18 min ago', text: 'Q2 channel revenue beat target by 18%', icon: TrendingUp, type: 'revenue' },
    { time: '45 min ago', text: 'Launched joint campaign with 12 partners', icon: Megaphone, type: 'marketing' },
    { time: '1 hour ago', text: 'Certified 25 new partner sales engineers', icon: Award, type: 'certification' },
    { time: '2 hours ago', text: 'Resolved channel conflict: enterprise deal', icon: Link2, type: 'resolution' },
    { time: '4 hours ago', text: 'Partner advisory council meeting: 18 attendees', icon: Users, type: 'council' },
  ];

  const quickActions = [
    { label: 'Partner Portal', icon: Users },
    { label: 'Performance', icon: BarChart3 },
    { label: 'Onboarding', icon: Rocket },
    { label: 'Deal Reg', icon: Briefcase },
    { label: 'MDF Funds', icon: TrendingUp },
    { label: 'Enablement', icon: Award },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    onboarding: '#007AFF',
    revenue: '#34C759',
    marketing: '#FF9500',
    certification: '#AF52DE',
    resolution: '#5856D6',
    council: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#AF52DE18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#AF52DE25' }]}>
          <Link2 size={48} color="#AF52DE" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Channel Partners</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Channel Officer • Partner Ecosystem Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Star size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>Executive</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Users size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>847 Partners</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Brain size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>AI-Powered</Text>
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
          The AI VP Channel Partners orchestrates a thriving partner ecosystem through intelligent recruitment, automated onboarding, and data-driven performance optimization. This executive AI agent maximizes channel revenue by enabling partners with the right tools, content, and co-selling opportunities while maintaining harmonious partner relationships.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#AF52DE18' }]}>
              <Text style={[styles.tagText, { color: '#AF52DE' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#AF52DE' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#AF52DE22' }]}>
            <Text style={[styles.countBadgeText, { color: '#AF52DE' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in channel partner functions, reporting to the VP Channel Partners
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(`/ai-agent/sales/sub-agents/${agent.id}`)} style={[styles.agentCard, { backgroundColor: theme.colors.background }]}>
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#AF52DE12' }]}>
              <action.icon size={22} color="#AF52DE" />
              <Text style={[styles.actionText, { color: '#AF52DE' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="vp-channel-partners" agentName="AI VP Channel Partners" />
    </ScrollView>
  );
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
