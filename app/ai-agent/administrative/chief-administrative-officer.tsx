import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Settings, PieChart, Eye, Globe, Calendar, Megaphone, Clipboard, Lock } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ChiefAdministrativeOfficerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Policies Managed', value: '487', icon: FileText, color: '#4E342E', change: '+24' },
    { label: 'Cost Savings', value: '$2.4M', icon: DollarSign, color: '#2E7D32', change: '+18%' },
    { label: 'Admin Efficiency', value: '94%', icon: TrendingUp, color: '#007AFF', change: '+6%' },
    { label: 'Team Size', value: '36', icon: Users, color: '#795548', change: '+4' },
  ];

  const kpis = [
    { label: 'Policy Compliance', value: '98.2%', trend: 'up' },
    { label: 'Cost Reduction', value: '22%', trend: 'up' },
    { label: 'Process Automation', value: '87%', trend: 'up' },
    { label: 'Admin Satisfaction', value: '4.6/5', trend: 'up' },
  ];

  const capabilities = ['Administrative Strategy','Policy Governance','Cost Optimization','Operational Efficiency','Vendor Management','Budget Control','Process Standardization','Compliance Oversight','Risk Management','Executive Reporting','Cross-functional Coordination','Administrative Innovation','Resource Allocation','Strategic Planning','Performance Benchmarking'];

  const responsibilities = [
    'Enterprise administrative strategy development and governance framework establishment',
    'Policy development, implementation, and compliance oversight across all departments',
    'Cost reduction initiatives with ROI tracking and budget optimization strategies',
    'Administrative process standardization and automation implementation',
    'Vendor relationship management and contract negotiation oversight',
    'Cross-functional coordination between facilities, travel, and document management',
    'Executive-level reporting on administrative KPIs and operational metrics',
    'Risk assessment and mitigation planning for administrative operations',
    'Resource allocation optimization across all administrative functions',
    'Strategic planning for administrative technology and infrastructure upgrades',
    'Performance benchmarking against industry standards and best practices',
    'Administrative innovation and digital transformation leadership'
  ];

  const activities = [
    { time: '3 min ago', text: 'Approved new vendor contract: $450K annual savings', icon: DollarSign, type: 'savings' },
    { time: '12 min ago', text: 'Policy update published: Remote work guidelines v3.2', icon: FileText, type: 'policy' },
    { time: '45 min ago', text: 'Quarterly admin efficiency review: 94% target achieved', icon: BarChart3, type: 'review' },
    { time: '2 hours ago', text: 'Cost reduction initiative launched: $500K target', icon: TrendingUp, type: 'initiative' },
    { time: '4 hours ago', text: 'Executive briefing: Administrative transformation roadmap', icon: Megaphone, type: 'briefing' },
    { time: '6 hours ago', text: 'Compliance audit completed: 98.2% policy adherence', icon: Shield, type: 'audit' },
  ];

  const quickActions = [
    { label: 'Policies', icon: FileText }, { label: 'Budget', icon: DollarSign },
    { label: 'Vendors', icon: Users }, { label: 'Reports', icon: BarChart3 },
    { label: 'Compliance', icon: Shield }, { label: 'Strategy', icon: Target },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = { savings: '#2E7D32', policy: '#1565C0', review: '#007AFF', initiative: '#4E342E', briefing: '#795548', audit: '#5D4037' };

  const subAgents = [
    { name: 'AI Admin Strategy Planner', id: 'admin-strategy-planner', icon: Target, desc: 'Strategic planning & administrative roadmap development', color: '#4E342E' },
    { name: 'AI Cost Reduction Analyst', id: 'cost-reduction-analyst', icon: DollarSign, desc: 'Cost optimization & expense reduction analysis', color: '#2E7D32' },
    { name: 'AI Policy Overseer', id: 'policy-overseer', icon: Shield, desc: 'Policy governance, compliance & enforcement oversight', color: '#1565C0' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#4E342E18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#4E342E25' }]}>
          <Briefcase size={48} color="#4E342E" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Administrative Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — C-Suite</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#4E342E22' }]}><Star size={12} color="#4E342E" /><Text style={[styles.badgeText, { color: '#4E342E' }]}>C-Suite</Text></View>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Briefcase size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>Executive</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Brain size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>AI-Powered</Text></View>
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
          The AI Chief Administrative Officer provides executive-level strategic oversight for all administrative operations. This C-Suite agent drives policy governance, cost reduction initiatives, operational efficiency, and ensures administrative excellence across the organization. It oversees 36 administrative agents managing facilities, travel, documents, and office operations with a focus on automation and optimization.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#4E342E18' }]}>
              <Text style={[styles.tagText, { color: '#4E342E' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#4E342E" />
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/administrative/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '15' }]}>
              <sub.icon size={20} color={sub.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#4E342E12' }]}>
              <action.icon size={24} color="#4E342E" />
              <Text style={[styles.actionText, { color: '#4E342E' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="chief-administrative-officer" agentName="AI Chief Administrative Officer" />
      <View style={{ height: 40 }} />
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
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
