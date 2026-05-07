import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity,
  Shield,
  Clock,
  Target,
  Zap,
  ArrowRight,
  Briefcase,
  FileText,
  PenTool,
  CheckCircle,
  BookOpen,
  Scale,
  Globe,
  Users,
  Calendar,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Crown,
  Sparkles,
  Settings,
  BarChart3,
  ScrollText,
  Layers,
  FileCheck,
  ShieldCheck,
  Gauge,
  GitBranch
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function PolicyDrafterPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Policies Drafted', value: '89', icon: FileText, color: '#0EA5E9' },
    { label: 'Under Review', value: '12', icon: PenTool, color: '#F59E0B' },
    { label: 'Approved', value: '67', icon: CheckCircle, color: '#10B981' },
    { label: 'Compliance %', value: '98%', icon: Scale, color: '#8B5CF6' },
  ];

  const capabilities = [
    'Policy Template Generation', 'Regulatory Compliance Mapping', 'Risk-Based Policy Drafting', 'Multi-Jurisdiction Support',
    'Version Control', 'Approval Workflow Integration', 'Stakeholder Review Coordination', 'Legal Language Optimization',
    'Policy Gap Analysis', 'Cross-Reference Management', 'Audit Trail Generation', 'Distribution Automation',
    'Training Material Creation', 'Policy Expiration Tracking', 'Amendment Management'
  ];

  const responsibilities = [
    'Draft security policies based on organizational requirements and risk assessments',
    'Map policy content to regulatory compliance frameworks (ISO 27001, NIST, SOC 2, etc.)',
    'Create risk-based policy language that addresses identified threats',
    'Support multi-jurisdiction requirements for global organizations',
    'Maintain version control for all policy documents and amendments',
    'Integrate with approval workflows to route policies to appropriate reviewers',
    'Coordinate stakeholder reviews and consolidate feedback into policy revisions',
    'Optimize legal and technical language for clarity and enforceability',
    'Analyze existing policies to identify gaps and coverage deficiencies',
    'Manage cross-references between related policies and procedures',
    'Generate audit trails for all policy changes and approvals',
    'Automate policy distribution to affected employees and teams',
    'Create training materials that explain policy requirements and implications',
    'Track policy expiration dates and trigger review cycles proactively',
    'Manage policy amendment processes while maintaining document integrity'
  ];

  const activities = [
    { action: 'Drafted policy', target: 'Remote access security v2.1', time: '2 hours ago', icon: PenTool },
    { action: 'Updated framework', target: 'ISO 27001:2022 mapping', time: '4 hours ago', icon: Layers },
    { action: 'Reviewed policy', target: 'Data classification standard', time: '6 hours ago', icon: FileCheck },
    { action: 'Published version', target: 'Incident response policy', time: '1 day ago', icon: ScrollText },
    { action: 'Distributed policy', target: 'To engineering teams', time: '2 days ago', icon: FileText },
    { action: 'Tracked expiry', target: 'Quarterly policy review', time: '3 days ago', icon: Clock },
  ];

  const quickActions = [
    { label: 'Draft Policy', icon: PenTool, color: '#8B5CF6' },
    { label: 'Review Draft', icon: FileCheck, color: '#F59E0B' },
    { label: 'Map Compliance', icon: Layers, color: '#10B981' },
    { label: 'Check Version', icon: ScrollText, color: '#3B82F6' },
    { label: 'Distribute', icon: FileText, color: '#EC4899' },
    { label: 'Track Expiry', icon: Clock, color: '#DC2626' },
    { label: 'View Metrics', icon: BarChart3, color: '#8B5CF6' },
    { label: 'Get Feedback', icon: Activity, color: '#10B981' },
  ];

  const kpis = [
    { label: 'Policy Quality', value: '96.5%', target: '95%', status: 'exceeding', icon: FileCheck },
    { label: 'Draft Accuracy', value: '94%', target: '90%', status: 'exceeding', icon: PenTool },
    { label: 'Review Cycle Time', value: '3.2 days', target: '5 days', status: 'exceeding', icon: Clock },
    { label: 'Compliance Alignment', value: '98%', target: '97%', status: 'exceeding', icon: ShieldCheck },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#8B5CF615' }]}>
          <PenTool size={48} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Policy Drafter</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security policy drafting and compliance specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF620' }]}>
            <Crown size={14} color="#8B5CF6" />
            <Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/vp-governance-risk')}>
        <View style={[styles.parentIcon, { backgroundColor: '#8B5CF615' }]}>
          <Settings size={24} color="#8B5CF6" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI VP Governance & Risk</Text>
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
                <View style={[styles.kpiIcon, { backgroundColor: '#8B5CF615' }]}>
                  <kpi.icon size={16} color="#8B5CF6" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: '#34C75915' }]}>
                  <Text style={[styles.statusText, { color: '#34C759' }]}>Exceeding</Text>
                </View>
              </View>
              <Text style={[styles.kpiValue, { color: colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          AI Policy Drafter creates and maintains security and governance policies aligned to regulatory frameworks and organizational risk.
          It accelerates drafting with templates, maps controls to compliance standards, and supports end-to-end review, approval, and publishing workflows.
        </Text>
      </View>

      {/* Core Capabilities */}
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

      {/* Responsibilities */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#8B5CF615' }]}>
              <activity.icon size={16} color="#8B5CF6" />
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

      {/* A2A Endpoints */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
        {[
          { endpoint: '/consult/policy-drafter', desc: 'Consult on policy drafting' },
          { endpoint: '/policy-drafter/draft', desc: 'Draft new policy' },
          { endpoint: '/policy-drafter/update', desc: 'Update existing policy' },
          { endpoint: '/policy-drafter/compliance', desc: 'Check compliance alignment' },
        ].map((item, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={16} color="#8B5CF6" />
            <View style={styles.endpointInfo}>
              <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
              <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <AgentFeatures agentId="policy-drafter" agentName="AI Policy Drafter" />
      <View style={{ height: 40 }} />
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
  iconContainer: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  parentCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 12, marginBottom: 2 },
  parentName: { fontSize: 16, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  statIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  changeText: { fontSize: 12, fontWeight: '600' },
  statValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  statLabel: { fontSize: 13 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  overviewText: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  kpiIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  kpiValue: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  kpiLabel: { fontSize: 13, marginBottom: 2 },
  kpiTarget: { fontSize: 12 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 14, lineHeight: 20 },
  activityItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  activityIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  activityTarget: { fontSize: 12 },
  activityTime: { fontSize: 12 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  actionText: { fontSize: 13, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
