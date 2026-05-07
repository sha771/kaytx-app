import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Scale,
  Activity,
  Shield,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  ArrowRight,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Gavel,
  BookOpen,
  ClipboardCheck,
  Crown,
  Sparkles,
  Search,
  Eye,
  RefreshCw,
  MessageSquare,
  Lock,
  Clock
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function PolicyOverseerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Policies Active', value: '142', change: '+8', icon: FileText, color: '#8B5CF6', trend: 'up' },
    { label: 'Compliance Rate', value: '98.5%', change: '+1.2%', icon: CheckCircle2, color: '#10B981', trend: 'up' },
    { label: 'Violations Fixed', value: '23', change: '-5', icon: AlertTriangle, color: '#FF9500', trend: 'down' },
    { label: 'Audits Passed', value: '12', change: '+3', icon: Shield, color: '#6366F1', trend: 'up' },
  ];

  const kpis = [
    { label: 'Policy Coverage', value: '100%', target: '100%', status: 'meeting', icon: Shield },
    { label: 'Review Cycle Time', value: '5 days', target: '7 days', status: 'exceeding', icon: Clock },
    { label: 'Employee Compliance', value: '96.8%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Policy Violations', value: '2', target: '<5', status: 'exceeding', icon: AlertTriangle },
  ];

  const capabilities = [
    'Policy Framework Design', 'Regulatory Compliance Monitoring', 'Policy Gap Analysis', 'Risk-Based Policy Prioritization',
    'Employee Policy Training', 'Violation Detection & Reporting', 'Policy Version Control', 'Cross-Border Compliance',
    'Industry Standard Benchmarking', 'Policy Impact Assessment', 'Enforcement Workflow Automation',
    'Regulatory Change Tracking', 'Policy Attestation Management', 'Exception Handling', 'Audit Trail Management'
  ];

  const responsibilities = [
    'Develop and maintain comprehensive organizational policy frameworks',
    'Monitor regulatory changes and update policies accordingly',
    'Conduct regular policy compliance audits across all departments',
    'Identify policy gaps and recommend new policy developments',
    'Track policy violations and coordinate remediation efforts',
    'Design and deliver employee policy training programs',
    'Maintain policy document repository with version control',
    'Coordinate with legal and compliance teams on regulatory matters',
    'Analyze policy effectiveness and recommend improvements',
    'Manage policy exception requests and approval workflows',
    'Create executive dashboards for compliance monitoring',
    'Support internal and external audits with policy documentation',
    'Develop policy attestation tracking and reporting systems',
    'Provide policy interpretation guidance to employees and managers',
    'Ensure policies align with organizational values and culture'
  ];

  const activities = [
    { action: 'Updated HR policies', target: 'Remote work guidelines', time: '1 hour ago', icon: FileText },
    { action: 'Detected 3 violations', target: 'Security policy', time: '3 hours ago', icon: AlertTriangle },
    { action: 'Completed compliance audit', target: 'Finance dept', time: '5 hours ago', icon: CheckCircle2 },
    { action: 'Published new policy', target: 'Data privacy', time: '1 day ago', icon: BookOpen },
    { action: 'Trained 45 employees', target: 'Code of conduct', time: '2 days ago', icon: MessageSquare },
    { action: 'Reviewed regulatory changes', target: 'Labor laws', time: '3 days ago', icon: Gavel },
  ];

  const quickActions = [
    { label: 'Policy Review', icon: FileText, color: '#8B5CF6' },
    { label: 'Compliance Check', icon: Shield, color: '#10B981' },
    { label: 'Violation Report', icon: AlertTriangle, color: '#FF9500' },
    { label: 'Audit Trail', icon: Eye, color: '#6366F1' },
    { label: 'Policy Search', icon: Search, color: '#3B82F6' },
    { label: 'Update Policy', icon: RefreshCw, color: '#EC4899' },
    { label: 'Training Schedule', icon: Clock, color: '#F59E0B' },
    { label: 'Lock Policy', icon: Lock, color: '#EF4444' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#5D403715' }]}>
          <Scale size={48} color="#5D4037" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Policy Overseer</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Policy compliance and governance specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#5D403720' }]}>
            <Crown size={14} color="#5D4037" />
            <Text style={[styles.badgeText, { color: '#5D4037' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/administrative/chief-administrative-officer')}>
        <View style={[styles.parentIcon, { backgroundColor: '#5D403715' }]}>
          <Crown size={24} color="#5D4037" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Chief Administrative Officer</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: stat.trend === 'up' ? '#34C75915' : '#FF3B3015' }]}>
                {stat.trend === 'up' ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
                <Text style={[styles.changeText, { color: stat.trend === 'up' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              </View>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* KPIs Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <View style={[styles.kpiIcon, { backgroundColor: '#5D403715' }]}>
                  <kpi.icon size={16} color="#5D4037" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75915' : kpi.status === 'meeting' ? '#007AFF15' : '#FF950015' }]}>
                  <Text style={[styles.statusText, { color: kpi.status === 'exceeding' ? '#34C759' : kpi.status === 'meeting' ? '#007AFF' : '#FF9500' }]}>
                    {kpi.status === 'exceeding' ? 'Exceeding' : kpi.status === 'meeting' ? 'On Track' : 'At Risk'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.kpiValue, { color: colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          The AI Policy Overseer ensures organizational policies are developed, implemented, and maintained in compliance with 
          regulatory requirements and best practices. This agent monitors policy adherence, detects violations, and coordinates 
          remediation efforts to maintain a compliant and ethical workplace.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#8B5CF615' }]}>
              <Text style={[styles.tagText, { color: '#8B5CF6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#5D4037' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#5D403715' }]}>
              <activity.icon size={16} color="#5D4037" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: colors.text }]}>{activity.action}</Text>
              <Text style={[styles.activityTarget, { color: colors.textSecondary }]}>{activity.target}</Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{activity.time}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: action.color + '10' }]}>
              <action.icon size={20} color={action.color} />
              <Text style={[styles.actionText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Agent Features */}
      <AgentFeatures agentId="policy-overseer" agentName="AI Policy Overseer" />

      <View style={{ height: 30 }} />
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
