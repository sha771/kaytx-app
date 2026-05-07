import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Shield,
  Activity,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  Crown,
  Sparkles,
  Settings,
  Layers,
  GitBranch,
  Eye,
  FileCheck,
  ScanLine,
  ShieldCheck,
  Gauge,
  Scan
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function SecurityArchitectureReviewerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Reviews Completed', value: '67', change: '+12', icon: FileCheck, color: '#EF4444', trend: 'up' },
    { label: 'Issues Found', value: '234', change: '+45', icon: AlertTriangle, color: '#DC2626', trend: 'up' },
    { label: 'Avg Review Time', value: '3.2 hrs', change: '-45 min', icon: Clock, color: '#F59E0B', trend: 'down' },
    { label: 'Remediation Rate', value: '89%', change: '+12%', icon: ShieldCheck, color: '#10B981', trend: 'up' },
  ];

  const kpis = [
    { label: 'Review Accuracy', value: '96.5%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Issue Detection Rate', value: '94%', target: '90%', status: 'exceeding', icon: ScanLine },
    { label: 'Remediation Tracking', value: '89%', target: '85%', status: 'exceeding', icon: Shield },
    { label: 'Stakeholder Satisfaction', value: '4.7/5', target: '4.5/5', status: 'exceeding', icon: Activity },
  ];

  const capabilities = [
    'Architecture Pattern Analysis', 'Security Control Assessment', 'Design Review', 'Code Security Review',
    'Infrastructure Analysis', 'Cloud Security Review', 'API Security Assessment', 'Data Flow Analysis',
    'Compliance Mapping', 'Best Practice Validation', 'Vulnerability Identification', 'Risk Scoring',
    'Remediation Guidance', 'Documentation Review', 'Peer Review Coordination'
  ];

  const responsibilities = [
    'Review system architecture designs for security flaws and weaknesses',
    'Assess security controls implementation in architecture components',
    'Conduct design reviews to identify security anti-patterns',
    'Review code for security vulnerabilities and coding standard violations',
    'Analyze infrastructure configurations for security misconfigurations',
    'Review cloud architecture for proper security controls and configurations',
    'Assess API designs for authentication, authorization, and input validation',
    'Analyze data flows to identify potential data leakage points',
    'Map architecture components to compliance requirements',
    'Validate designs against security best practices and standards',
    'Identify vulnerabilities introduced by architectural decisions',
    'Score security risks associated with architectural findings',
    'Provide guidance for security remediation and mitigation',
    'Review security documentation for accuracy and completeness',
    'Coordinate peer reviews among security architecture team members'
  ];

  const activities = [
    { action: 'Completed review', target: 'Microservices architecture', time: '2 hours ago', icon: FileCheck },
    { action: 'Found issue', target: 'Insecure API design pattern', time: '4 hours ago', icon: AlertTriangle },
    { action: 'Assessed controls', target: 'Authentication service', time: '6 hours ago', icon: ShieldCheck },
    { action: 'Reviewed cloud', target: 'AWS infrastructure setup', time: '1 day ago', icon: Layers },
    { action: 'Validated design', target: 'Payment processing flow', time: '2 days ago', icon: GitBranch },
    { action: 'Tracked remediation', target: 'Critical vulnerability fix', time: '3 days ago', icon: Gauge },
  ];

  const quickActions = [
    { label: 'Start Review', icon: ScanLine, color: '#EF4444' },
    { label: 'View Patterns', icon: Layers, color: '#F59E0B' },
    { label: 'Assess Controls', icon: ShieldCheck, color: '#10B981' },
    { label: 'Analyze Flow', icon: GitBranch, color: '#8B5CF6' },
    { label: 'Check Compliance', icon: FileCheck, color: '#3B82F6' },
    { label: 'View Issues', icon: AlertTriangle, color: '#DC2626' },
    { label: 'Track Fixes', icon: Gauge, color: '#EC4899' },
    { label: 'View Metrics', icon: BarChart3, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#DC262615' }]}>
          <ScanLine size={48} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Security Architecture Reviewer</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security architecture design and review specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#DC262620' }]}>
            <Crown size={14} color="#DC2626" />
            <Text style={[styles.badgeText, { color: '#DC2626' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/vp-cybersecurity')}>
        <View style={[styles.parentIcon, { backgroundColor: '#DC262615' }]}>
          <Settings size={24} color="#DC2626" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI VP Cybersecurity</Text>
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
                <View style={[styles.kpiIcon, { backgroundColor: '#DC262615' }]}>
                  <kpi.icon size={16} color="#DC2626" />
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
          The AI Security Architecture Reviewer analyzes system designs, code, and infrastructure configurations 
          to identify security weaknesses and architectural flaws. This agent ensures security is built into systems 
          from the design phase through comprehensive reviews and assessments.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#EF444415' }]}>
              <Text style={[styles.tagText, { color: '#EF4444' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#DC262615' }]}>
              <activity.icon size={16} color="#DC2626" />
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
      <AgentFeatures agentId="security-architecture-reviewer" agentName="AI Security Architecture Reviewer" />

      <View style={{ height: 30 }} />
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
});
