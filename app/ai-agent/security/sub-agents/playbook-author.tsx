import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
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
  FileText,
  BookOpen,
  RefreshCw,
  GitBranch,
  Layers,
  PenTool,
  FileCheck,
  Gauge,
  Briefcase
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function PlaybookAuthorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoGeneration, setAutoGeneration] = useState(true);
  const [versionControl, setVersionControl] = useState(true);
  const [testingFramework, setTestingFramework] = useState(true);

  const stats = [
    { label: 'Playbooks Created', value: '156', change: '+23', icon: BookOpen, color: '#EF4444', trend: 'up' },
    { label: 'Avg Quality Score', value: '94%', change: '+5%', icon: FileCheck, color: '#10B981', trend: 'up' },
    { label: 'Execution Success', value: '98.5%', change: '+1.2%', icon: CheckCircle2, color: '#F59E0B', trend: 'up' },
    { label: 'Time to Create', value: '15 min', change: '-8 min', icon: Clock, color: '#8B5CF6', trend: 'down' },
  ];

  const kpis = [
    { label: 'Playbook Accuracy', value: '97.8%', target: '95%', status: 'exceeding', icon: FileCheck },
    { label: 'Coverage Rate', value: '92%', target: '90%', status: 'exceeding', icon: Layers },
    { label: 'Update Frequency', value: 'Weekly', target: 'Weekly', status: 'meeting', icon: RefreshCw },
    { label: 'Analyst Adoption', value: '89%', target: '85%', status: 'exceeding', icon: Activity },
  ];

  const capabilities = [
    'Playbook Design', 'Response Automation', 'Workflow Documentation', 'Step-by-Step Procedures',
    'Integration Mapping', 'Decision Trees', 'Escalation Paths', 'Conditional Logic',
    'Template Creation', 'Version Control', 'Testing Framework', 'Compliance Alignment',
    'Knowledge Transfer', 'Cross-Platform Support', 'Real-Time Updates'
  ];

  const responsibilities = [
    'Design and create incident response playbooks for various threat types',
    'Automate response actions within playbooks for faster incident handling',
    'Document workflows and procedures for consistent analyst execution',
    'Define step-by-step procedures for different incident categories',
    'Map integrations between security tools in playbook workflows',
    'Create decision trees to guide analysts through complex scenarios',
    'Define escalation paths within playbooks for different severity levels',
    'Implement conditional logic for dynamic response actions',
    'Create reusable templates for common incident types',
    'Maintain version control for playbook updates and improvements',
    'Develop testing frameworks to validate playbook effectiveness',
    'Align playbooks with compliance requirements and best practices',
    'Facilitate knowledge transfer through clear playbook documentation',
    'Ensure playbooks work across different security platforms',
    'Update playbooks in real-time based on emerging threats'
  ];

  const activities = [
    { action: 'Created playbook', target: 'Ransomware response v2', time: '1 hour ago', icon: PenTool },
    { action: 'Updated workflow', target: 'Phishing investigation', time: '3 hours ago', icon: RefreshCw },
    { action: 'Added integration', target: 'SIEM-SOAR connector', time: '5 hours ago', icon: Layers },
    { action: 'Tested playbook', target: 'DDoS mitigation', time: '1 day ago', icon: FileCheck },
    { action: 'Published version', target: 'Malware analysis v3.1', time: '2 days ago', icon: GitBranch },
    { action: 'Reviewed feedback', target: 'Analyst suggestions', time: '3 days ago', icon: Activity },
  ];

  const quickActions = [
    { label: 'Create Playbook', icon: PenTool, color: '#EF4444' },
    { label: 'Edit Template', icon: FileText, color: '#F59E0B' },
    { label: 'Test Workflow', icon: FileCheck, color: '#10B981' },
    { label: 'View Library', icon: BookOpen, color: '#8B5CF6' },
    { label: 'Add Integration', icon: Layers, color: '#3B82F6' },
    { label: 'Version Control', icon: GitBranch, color: '#EC4899' },
    { label: 'Get Feedback', icon: Activity, color: '#10B981' },
    { label: 'View Metrics', icon: BarChart3, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#DC262615' }]}>
          <BookOpen size={48} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Playbook Author</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security playbook design and automation specialist
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
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/soc-manager-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#DC262615' }]}>
          <Settings size={24} color="#DC2626" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI SOC Manager</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'playbooks', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTabTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (<>
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

      </>)}

      {activeTab === 'playbooks' && (<>
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

      </>)}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/playbook-author', desc: 'Consult on playbook design' },
            { endpoint: '/playbook-author/create', desc: 'Create new playbook' },
            { endpoint: '/playbook-author/test', desc: 'Test playbook effectiveness' },
            { endpoint: '/playbook-author/publish', desc: 'Publish playbook version' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#DC2626" />
              <View style={styles.endpointInfo}>
                <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
                <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Generation</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Auto-generate playbooks from incidents</Text>
            </View>
            <Switch value={autoGeneration} onValueChange={setAutoGeneration} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Version Control</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Track playbook version history</Text>
            </View>
            <Switch value={versionControl} onValueChange={setVersionControl} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Testing Framework</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Validate playbook effectiveness</Text>
            </View>
            <Switch value={testingFramework} onValueChange={setTestingFramework} trackColor={{ false: '#767577', true: '#DC2626' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="playbook-author" agentName="AI Playbook Author" />

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
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  iconContainer: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTabTab: { backgroundColor: '#DC2626' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabTabText: { color: '#fff' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  changeText: { fontSize: 11, fontWeight: '600' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  overviewText: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 12, borderRadius: 10, backgroundColor: '#F9FAFB', marginBottom: 8 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  kpiValue: { fontSize: 18, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 2 },
  kpiTarget: { fontSize: 11, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 18 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 13, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  actionText: { fontSize: 13, fontWeight: '500' },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
  parentCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 12, marginBottom: 2 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
