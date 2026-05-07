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
  TrendingUp,
  TrendingDown,
  Crown,
  Sparkles,
  Settings,
  BarChart3,
  Layers,
  FileCheck,
  ShieldCheck,
  Gauge,
  GitBranch,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function ControlMapperPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Controls Mapped', value: '284', change: '+42', icon: Layers, color: '#F44336', trend: 'up' },
    { label: 'Frameworks', value: '12', change: '+2', icon: FileCheck, color: '#8B5CF6', trend: 'up' },
    { label: 'Coverage', value: '96%', change: '+4%', icon: Gauge, color: '#10B981', trend: 'up' },
    { label: 'Gaps Found', value: '7', change: '-3', icon: AlertTriangle, color: '#F59E0B', trend: 'down' },
  ];

  const kpis = [
    { label: 'Mapping Accuracy', value: '98.5%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Coverage Rate', value: '96%', target: '90%', status: 'exceeding', icon: Gauge },
    { label: 'Framework Compliance', value: '94%', target: '92%', status: 'exceeding', icon: FileCheck },
    { label: 'Gap Resolution', value: '3.2 days', target: '5 days', status: 'exceeding', icon: TrendingDown },
  ];

  const capabilities = [
    'Control Identification', 'Framework Mapping', 'Gap Analysis', 'Coverage Assessment',
    'Control Dependencies', 'Risk Mapping', 'Compliance Alignment', 'Control Inheritance',
    'Control Testing Mapping', 'Evidence Collection', 'Audit Support', 'Continuous Monitoring',
    'Control Optimization', 'Policy Mapping', 'Standard Alignment'
  ];

  const responsibilities = [
    'Map security controls to compliance frameworks (NIST, ISO 27001, SOC 2, PCI DSS)',
    'Identify control gaps and recommend remediation measures',
    'Maintain control ownership and responsibility matrices',
    'Map controls to specific regulatory requirements and citations',
    'Track control effectiveness and maturity levels',
    'Support audit evidence collection and control testing',
    'Map control dependencies and inheritance relationships',
    'Generate control coverage reports for stakeholders',
    'Align security architecture to control requirements',
    'Map technical controls to policy statements',
    'Support risk assessment with control visibility',
    'Track control changes and impact on compliance',
    'Map controls to business processes and data flows',
    'Support control optimization and rationalization',
    'Maintain control documentation and taxonomy'
  ];

  const activities = [
    { action: 'Mapped controls', target: 'NIST CSF to ISO 27001', time: '2 hours ago', icon: Layers },
    { action: 'Identified gaps', target: '7 control gaps in access management', time: '4 hours ago', icon: AlertTriangle },
    { action: 'Updated coverage', target: 'SOC 2 coverage to 96%', time: '6 hours ago', icon: Gauge },
    { action: 'Generated report', target: 'Control mapping matrix Q1', time: '1 day ago', icon: BarChart3 },
    { action: 'Resolved gap', target: 'Encryption control for data at rest', time: '2 days ago', icon: CheckCircle2 },
    { action: 'Mapped framework', target: 'Added HIPAA control mappings', time: '3 days ago', icon: FileCheck },
  ];

  const quickActions = [
    { label: 'Map Controls', icon: Layers, color: '#F44336' },
    { label: 'Find Gaps', icon: AlertTriangle, color: '#F59E0B' },
    { label: 'Check Coverage', icon: Gauge, color: '#10B981' },
    { label: 'Generate Report', icon: BarChart3, color: '#8B5CF6' },
    { label: 'View Frameworks', icon: FileCheck, color: '#3B82F6' },
    { label: 'Track Changes', icon: GitBranch, color: '#EC4899' },
    { label: 'View Metrics', icon: Activity, color: '#F44336' },
    { label: 'Get Audit Info', icon: ShieldCheck, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#F4433615' }]}>
          <Layers size={48} color="#F44336" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Control Mapper</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security control mapping and compliance framework alignment
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F4433620' }]}>
            <Crown size={14} color="#F44336" />
            <Text style={[styles.badgeText, { color: '#F44336' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/security-architect')}>
        <View style={[styles.parentIcon, { backgroundColor: '#F4433615' }]}>
          <Settings size={24} color="#F44336" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Security Architect</Text>
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
                <View style={[styles.kpiIcon, { backgroundColor: '#F4433615' }]}>
                  <kpi.icon size={16} color="#F44336" />
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

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          AI Control Mapper maps security controls to compliance frameworks, identifies control gaps, 
          and ensures comprehensive coverage across regulatory requirements. It maintains control ownership, 
          tracks effectiveness, and supports audit activities.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#F4433615' }]}>
              <Text style={[styles.tagText, { color: '#F44336' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#F44336' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#F4433615' }]}>
              <activity.icon size={16} color="#F44336" />
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
          { endpoint: '/consult/control-mapper', desc: 'Consult on control mapping' },
          { endpoint: '/control-mapper/map', desc: 'Map controls to framework' },
          { endpoint: '/control-mapper/gaps', desc: 'Identify control gaps' },
          { endpoint: '/control-mapper/report', desc: 'Generate mapping report' },
        ].map((item, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={16} color="#F44336" />
            <View style={styles.endpointInfo}>
              <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
              <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      <AgentFeatures agentId="control-mapper" agentName="AI Control Mapper" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  iconContainer: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
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
  controlIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  controlFramework: { flex: 1, fontSize: 14, fontWeight: '600' },
  controlCoverage: { fontSize: 14, fontWeight: '700' },
  controlFooter: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  controlMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  controlMetaText: { fontSize: 12, color: '#666' },
  progressBar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#E5E7EB' },
  progressFill: { height: 6, borderRadius: 3 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
