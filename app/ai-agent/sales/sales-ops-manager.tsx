import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Settings, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap,
  TrendingUp, Users, Brain, FileText, BarChart3, Database, Shield,
  Briefcase, FileBarChart, TrendingDown, CheckCircle, AlertTriangle
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'crm-data-cleaner', name: 'AI CRM Data Cleaner', description: 'Automated data hygiene & deduplication workflows', icon: Database, color: '#007AFF' },
  { id: 'sales-process-auditor', name: 'AI Sales Process Auditor', description: 'Process compliance auditing & optimization insights', icon: Shield, color: '#34C759' },
  { id: 'reporting-automator', name: 'AI Reporting Automator', description: 'Automated sales reports & dashboard generation', icon: FileBarChart, color: '#FF9500' },
];

export default function SalesOpsManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'CRM Records', value: '2.4M', icon: Database, color: '#007AFF', change: '+12K' },
    { label: 'Data Quality', value: '98.2%', icon: CheckCircle, color: '#34C759', change: '+1.4%' },
    { label: 'Reports Auto', value: '486', icon: FileBarChart, color: '#FF9500', change: '+42' },
    { label: 'Process Audits', value: '156', icon: Shield, color: '#AF52DE', change: '+18' },
  ];

  const kpis = [
    { label: 'CRM Adoption', value: '94%', trend: 'up' },
    { label: 'Data Accuracy', value: '98.2%', trend: 'up' },
    { label: 'Report Time', value: '2 min', trend: 'down' },
    { label: 'Process Compliance', value: '96%', trend: 'up' },
  ];

  const capabilities = [
    'CRM Administration', 'Data Management', 'Process Optimization', 'Sales Analytics',
    'Forecast Support', 'Territory Mgmt', 'Quota Planning', 'Compensation Ops',
    'Pipeline Hygiene', 'Automation', 'Reporting', 'Sales Enablement'
  ];

  const responsibilities = [
    'CRM system administration, configuration, and user management',
    'Sales data governance, hygiene, and quality assurance programs',
    'Sales process design, documentation, and continuous optimization',
    'Sales analytics, reporting, and dashboard development',
    'Sales forecasting methodology and pipeline inspection support',
    'Territory design, quota planning, and capacity modeling',
    'Sales compensation plan administration and payout calculations',
    'Sales technology stack evaluation, implementation, and integration',
    'Pipeline hygiene monitoring and data enrichment programs',
    'Workflow automation and sales productivity tool deployment',
    'Cross-functional coordination between Sales, Finance, and Product',
    'Sales enablement content management and tool administration'
  ];

  const activities = [
    { time: '2 min ago', text: 'Cleaned 15K duplicate CRM records', icon: Database, type: 'data' },
    { time: '12 min ago', text: 'Completed Q2 sales process audit', icon: Shield, type: 'audit' },
    { time: '28 min ago', text: 'Auto-generated 42 executive reports', icon: FileBarChart, type: 'report' },
    { time: '45 min ago', text: 'Updated sales methodology workflows', icon: Settings, type: 'process' },
    { time: '1 hour ago', text: 'Territory realignment completed: 3 regions', icon: Users, type: 'territory' },
    { time: '2 hours ago', text: 'Q3 quota plans distributed to 120 reps', icon: Target, type: 'quota' },
  ];

  const quickActions = [
    { label: 'CRM Admin', icon: Database },
    { label: 'Data Quality', icon: CheckCircle },
    { label: 'Reports', icon: FileBarChart },
    { label: 'Territory', icon: Users },
    { label: 'Quota Plan', icon: Target },
    { label: 'Process Audit', icon: Shield },
    { label: 'Analytics', icon: BarChart3 },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    data: '#007AFF',
    audit: '#34C759',
    report: '#FF9500',
    process: '#AF52DE',
    territory: '#5856D6',
    quota: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#E6510018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510025' }]}>
          <Settings size={48} color="#E65100" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Sales Operations Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sales Operations • RevOps Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}>
            <Star size={12} color="#E65100" />
            <Text style={[styles.badgeText, { color: '#E65100' }]}>Manager</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}>
            <Database size={12} color="#007AFF" />
            <Text style={[styles.badgeText, { color: '#007AFF' }]}>2.4M Records</Text>
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
          The AI Sales Operations Manager ensures sales excellence through intelligent CRM management, automated data hygiene, and streamlined process optimization. This operational AI agent orchestrates specialized sub-agents to maintain pristine data quality, audit process compliance, and deliver real-time insights that accelerate sales velocity and decision-making.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#E6510018' }]}>
              <Text style={[styles.tagText, { color: '#E65100' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Strategic Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#E65100' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Specialized Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: '#E6510022' }]}>
            <Text style={[styles.countBadgeText, { color: '#E65100' }]}>{SUB_AGENTS.length}</Text>
          </View>
        </View>
        <Text style={[styles.sectionDescription, { color: theme.colors.textSecondary }]}>
          AI workers specializing in sales operations functions, reporting to the Sales Operations Manager
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#E6510012' }]}>
              <action.icon size={22} color="#E65100" />
              <Text style={[styles.actionText, { color: '#E65100' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="sales-ops-manager" agentName="AI Sales Operations Manager" />
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
