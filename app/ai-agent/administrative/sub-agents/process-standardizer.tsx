import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  GitBranch,
  Activity,
  Settings,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  ArrowRight,
  FileText,
  CheckCircle2,
  ClipboardList,
  Workflow,
  Repeat,
  Layers,
  Crown,
  Sparkles,
  BookOpen,
  Users,
  BarChart3,
  Wrench,
  Save,
  RefreshCw,
  Clock
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function ProcessStandardizerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'SOPs Created', value: '156', change: '+23', icon: FileText, color: '#F59E0B', trend: 'up' },
    { label: 'Processes Mapped', value: '89', change: '+12', icon: Workflow, color: '#6366F1', trend: 'up' },
    { label: 'Standardization %', value: '94%', change: '+4%', icon: CheckCircle2, color: '#10B981', trend: 'up' },
    { label: 'Efficiency Gain', value: '32%', change: '+8%', icon: TrendingUp, color: '#8B5CF6', trend: 'up' },
  ];

  const kpis = [
    { label: 'SOP Compliance Rate', value: '97%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Process Cycle Time', value: '4.2 days', target: '5 days', status: 'exceeding', icon: Clock },
    { label: 'Standard Deviation', value: '2.1%', target: '<5%', status: 'exceeding', icon: BarChart3 },
    { label: 'Employee Adoption', value: '92%', target: '90%', status: 'exceeding', icon: Users },
  ];

  const capabilities = [
    'Process Flow Mapping', 'SOP Documentation', 'Workflow Optimization', 'Standard Compliance Auditing',
    'Bottleneck Identification', 'Best Practice Integration', 'Cross-Functional Alignment', 'Quality Standard Enforcement',
    'Process Variation Analysis', 'Automation Opportunity Scoring', 'Training Material Generation',
    'Change Impact Assessment', 'KPI Framework Design', 'Continuous Improvement Tracking', 'Documentation Version Control'
  ];

  const responsibilities = [
    'Create and maintain comprehensive Standard Operating Procedures (SOPs)',
    'Map current-state processes and identify standardization opportunities',
    'Design optimized workflows that reduce variation and improve efficiency',
    'Ensure all processes comply with industry standards and regulations',
    'Identify process bottlenecks and recommend elimination strategies',
    'Integrate best practices from industry leaders into organizational processes',
    'Align cross-functional processes for seamless handoffs and collaboration',
    'Enforce quality standards through process checkpoints and controls',
    'Analyze process variation and implement reduction initiatives',
    'Score and prioritize automation opportunities within processes',
    'Generate training materials for new and updated processes',
    'Assess change impact on existing processes and stakeholders',
    'Design KPI frameworks for ongoing process performance monitoring',
    'Track continuous improvement initiatives and their effectiveness',
    'Maintain version control for all process documentation'
  ];

  const activities = [
    { action: 'Created 5 new SOPs', target: 'Onboarding process', time: '2 hours ago', icon: FileText },
    { action: 'Optimized workflow', target: 'Approval process', time: '4 hours ago', icon: Workflow },
    { action: 'Trained 23 employees', target: 'New SOP rollout', time: '6 hours ago', icon: Users },
    { action: 'Audited 12 processes', target: 'Compliance check', time: '1 day ago', icon: ClipboardList },
    { action: 'Standardized reports', target: 'Monthly reviews', time: '2 days ago', icon: BarChart3 },
    { action: 'Updated documentation', target: 'Q3 revisions', time: '3 days ago', icon: BookOpen },
  ];

  const quickActions = [
    { label: 'Create SOP', icon: FileText, color: '#F59E0B' },
    { label: 'Map Process', icon: Workflow, color: '#6366F1' },
    { label: 'Audit Standard', icon: ClipboardList, color: '#10B981' },
    { label: 'Optimize Flow', icon: Layers, color: '#8B5CF6' },
    { label: 'Best Practice', icon: BookOpen, color: '#3B82F6' },
    { label: 'Train Team', icon: Users, color: '#EC4899' },
    { label: 'Analyze Bottleneck', icon: BarChart3, color: '#F59E0B' },
    { label: 'Version Update', icon: RefreshCw, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#6D4C4115' }]}>
          <GitBranch size={48} color="#6D4C41" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Process Standardizer</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Process documentation and standardization specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4120' }]}>
            <Crown size={14} color="#6D4C41" />
            <Text style={[styles.badgeText, { color: '#6D4C41' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/administrative/vp-admin-operations')}>
        <View style={[styles.parentIcon, { backgroundColor: '#6D4C4115' }]}>
          <Settings size={24} color="#6D4C41" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI VP Admin Operations</Text>
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
                <View style={[styles.kpiIcon, { backgroundColor: '#6D4C4115' }]}>
                  <kpi.icon size={16} color="#6D4C41" />
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
          The AI Process Standardizer creates and maintains standardized operating procedures, ensuring consistency 
          and efficiency across all administrative processes. This agent maps workflows, identifies bottlenecks, 
          and implements best practices to reduce variation and improve operational excellence.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#F59E0B15' }]}>
              <Text style={[styles.tagText, { color: '#F59E0B' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#6D4C41' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#6D4C4115' }]}>
              <activity.icon size={16} color="#6D4C41" />
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
      <AgentFeatures agentId="process-standardizer" agentName="AI Process Standardizer" />

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
