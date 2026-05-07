import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Megaphone, Activity, CircleCheckBig, Target, ChartBarBig, Calendar, ArrowRight, Users, Zap, Star, Globe, Paintbrush, Layers, GitMerge, TrendingUp, TrendingDown, DollarSign, BarChart3, Brain, Briefcase, FileText, Settings, Mail, Search } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPMarketingPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Active Campaigns', value: '128', icon: CircleCheckBig, color: '#34C759', change: '+18' },
    { label: 'Marketing ROI', value: '3.8x', icon: TrendingUp, color: '#007AFF', change: '+0.4x' },
    { label: 'MQLs Generated', value: '2.4K', icon: Target, color: '#FF9500', change: '+340' },
    { label: 'Budget Managed', value: '$4.2M', icon: DollarSign, color: '#D81B60', change: '+$600K' },
  ];

  const kpis = [
    { label: 'Pipeline Contribution', value: '$18M', trend: 'up' },
    { label: 'Cost per MQL', value: '$42', trend: 'down' },
    { label: 'Channel Coverage', value: '12', trend: 'up' },
    { label: 'Content Output', value: '86/mo', trend: 'up' },
  ];

  const capabilities = ['Campaign Orchestration','Channel Planning','Calendar Management','Cross-team Coordination','Marketing Strategy','Demand Generation','Brand Positioning','Marketing Analytics','SEO/SEM Optimization','Email Automation','Growth Hacking','Attribution Modeling','ABM Programs','Event Marketing','Partner Co-marketing','Creative Direction'];

  const responsibilities = [
    'Orchestrate multi-channel marketing campaigns end-to-end',
    'Plan and optimize channel strategies and media mix',
    'Manage marketing calendar and campaign scheduling',
    'Coordinate cross-functional marketing initiatives',
    'Drive demand generation and lead nurturing programs',
    'Align marketing activities with revenue targets',
    'Manage VP-level marketing leadership team',
    'Report marketing performance to CMO and C-suite',
    'Oversee SEO/SEM and paid media optimization',
    'Develop account-based marketing programs',
    'Manage marketing technology stack and integrations',
    'Optimize content strategy and editorial calendar',
  ];

  const activities = [
    { time: '4 min ago', text: 'Launched Q3 integrated campaign across 6 channels', icon: Megaphone, type: 'campaign' },
    { time: '20 min ago', text: 'Updated brand guidelines v3.2 for Q3 refresh', icon: Star, type: 'brand' },
    { time: '1 hour ago', text: 'Campaign performance: 3.8x ROI across 12 active', icon: BarChart3, type: 'analytics' },
    { time: '3 hours ago', text: 'Published content calendar: 86 pieces for August', icon: Calendar, type: 'content' },
    { time: '5 hours ago', text: 'Optimized ad spend: $120K reallocated to top performers', icon: DollarSign, type: 'budget' },
    { time: '8 hours ago', text: 'Growth experiment: new landing page +22% conversion', icon: Zap, type: 'growth' },
  ];

  const typeColors: Record<string, string> = { campaign: '#D81B60', brand: '#9C27B0', analytics: '#007AFF', content: '#34C759', budget: '#FF9500', growth: '#AF52DE' };

  const quickActions = [
    { label: 'Campaigns', icon: Megaphone }, { label: 'Analytics', icon: ChartBarBig },
    { label: 'Content', icon: FileText }, { label: 'Budget', icon: DollarSign },
    { label: 'SEO', icon: Search }, { label: 'Email', icon: Mail },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const subAgents = [
    { name: 'AI Channel Planner', id: 'channel-planner', icon: Layers, desc: 'Channel strategy & media mix optimization' },
    { name: 'AI Marketing Calendar Manager', id: 'marketing-calendar-manager', icon: Calendar, desc: 'Campaign scheduling & timeline coordination' },
    { name: 'AI Campaign Coordinator', id: 'campaign-coordinator', icon: GitMerge, desc: 'End-to-end campaign execution management' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#D81B6018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#D81B6025' }]}>
          <Megaphone size={48} color="#D81B60" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Marketing</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing & Growth Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#D81B6022' }]}><Star size={12} color="#D81B60" /><Text style={[styles.badgeText, { color: '#D81B60' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>6 Reports</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => { const StatIcon = stat.icon; return (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
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
          {kpis.map((kpi, i) => (
            <View key={i} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
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
          The AI VP Marketing leads marketing strategy, campaign orchestration, and channel optimization across all marketing channels. It coordinates cross-functional initiatives, manages the marketing calendar, and ensures every campaign is executed on time and on budget.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#D81B6018' }]}>
              <Text style={[styles.tagText, { color: '#D81B60' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#D81B60" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((agent, i) => (
          <TouchableOpacity key={i} onPress={() => router.push(`/ai-agent/marketing/sub-agents/${agent.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: '#D81B6015' }]}>
              <agent.icon size={20} color="#D81B60" />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, i) => { const ActIcon = act.icon; return (
          <View key={i} style={styles.activityRow}>
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
          {quickActions.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#D81B6012' }]}>
              <action.icon size={24} color="#D81B60" />
              <Text style={[styles.actionText, { color: '#D81B60' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/marketing/cmo' as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <Megaphone size={24} color="#C62828" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Marketing Officer</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>C-Suite • Marketing Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="vp-marketing" agentName="AI VP Marketing" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
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
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 8, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
