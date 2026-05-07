import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Shield,
  Activity,
  Clock,
  Target,
  Zap,
  ArrowRight,
  Briefcase,
  Workflow,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Settings,
  Zap as Lightning,
  Timer,
  Layers,
  ArrowUpRight,
  Gauge,
  PlayCircle,
  Users,
  RefreshCw,
  GitBranch,
  AlertTriangle,
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function SocWorkflowOptimizerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoOptimization, setAutoOptimization] = useState(true);
  const [playbookSync, setPlaybookSync] = useState(true);
  const [performanceTracking, setPerformanceTracking] = useState(true);

  const stats = [
    { label: 'Workflows Optimized', value: '47', change: '+8', icon: Workflow, color: '#EF4444', trend: 'up' },
    { label: 'Time Saved', value: '340 hrs', change: '+45%', icon: Timer, color: '#10B981', trend: 'up' },
    { label: 'Process Efficiency', value: '94%', change: '+12%', icon: Gauge, color: '#F59E0B', trend: 'up' },
    { label: 'Bottlenecks Fixed', value: '23', change: '-5', icon: AlertTriangle, color: '#8B5CF6', trend: 'down' },
  ];

  const workflows = [
    { name: 'Alert Triage Process', efficiency: 92, status: 'optimized', savings: '2.5h/day' },
    { name: 'Incident Escalation', efficiency: 87, status: 'optimized', savings: '1.8h/day' },
    { name: 'Threat Intelligence', efficiency: 78, status: 'improving', savings: '1.2h/day' },
    { name: 'Report Generation', efficiency: 95, status: 'optimized', savings: '3.1h/day' },
  ];

  const capabilities = [
    { name: 'Workflow Analysis', icon: BarChart3, enabled: true },
    { name: 'Process Mining', icon: Layers, enabled: true },
    { name: 'Bottleneck Detection', icon: Target, enabled: true },
    { name: 'Auto-optimization', icon: Lightning, enabled: true },
    { name: 'Performance Metrics', icon: TrendingUp, enabled: true },
    { name: 'Integration Hub', icon: Zap, enabled: true },
    { name: 'Playbook Sync', icon: Workflow, enabled: true },
    { name: 'Real-time Monitoring', icon: Activity, enabled: true },
  ];

  const kpis = [
    { label: 'MTTR Improvement', value: '35%', target: '30%', status: 'exceeding', icon: Timer },
    { label: 'Automation Rate', value: '78%', target: '75%', status: 'exceeding', icon: Zap },
    { label: 'Workflow Accuracy', value: '99.2%', target: '99%', status: 'exceeding', icon: CheckCircle },
    { label: 'Analyst Satisfaction', value: '4.7/5', target: '4.5/5', status: 'exceeding', icon: Users },
  ];

  const responsibilities = [
    'Analyze and map current SOC workflows to identify inefficiencies',
    'Design automated workflows to reduce manual analyst tasks',
    'Identify and eliminate process bottlenecks in security operations',
    'Integrate playbooks into automated response workflows',
    'Optimize alert routing to ensure proper prioritization and assignment',
    'Streamline case management processes for faster resolution',
    'Automate shift handoff procedures to maintain operational continuity',
    'Design real-time metrics dashboards for SOC performance monitoring',
    'Plan and implement tool integrations for seamless data flow',
    'Standardize processes across all SOC shifts and locations',
    'Model optimal resource allocation based on alert volume patterns',
    'Optimize response times through workflow improvements',
    'Design clear escalation paths for different incident types',
    'Integrate knowledge base articles into analyst workflows',
    'Track and report on continuous improvement initiatives',
  ];

  const activities = [
    { action: 'Optimized workflow', target: 'Alert triage process', time: '1 hour ago', icon: Workflow },
    { action: 'Fixed bottleneck', target: 'Escalation queue', time: '3 hours ago', icon: AlertTriangle },
    { action: 'Deployed automation', target: 'Shift handoff report', time: '5 hours ago', icon: Zap },
    { action: 'Updated playbook', target: 'Malware response', time: '1 day ago', icon: RefreshCw },
    { action: 'Integrated tool', target: 'SIEM-SOAR connector', time: '2 days ago', icon: Layers },
    { action: 'Trained analysts', target: 'New workflow SOPs', time: '3 days ago', icon: Users },
  ];

  const quickActions = [
    { label: 'Map Workflow', icon: GitBranch, color: '#EF4444' },
    { label: 'Find Bottleneck', icon: AlertTriangle, color: '#F59E0B' },
    { label: 'Automate Task', icon: Zap, color: '#10B981' },
    { label: 'View Metrics', icon: BarChart3, color: '#8B5CF6' },
    { label: 'Update Playbook', icon: RefreshCw, color: '#3B82F6' },
    { label: 'Design Dashboard', icon: Gauge, color: '#EC4899' },
    { label: 'Test Workflow', icon: PlayCircle, color: '#F59E0B' },
    { label: 'Train Team', icon: Users, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} showsVerticalScrollIndicator={false}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F8BBD920' }]}>
          <Workflow size={56} color="#F8BBD9" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI SOC Workflow Optimizer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Security Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F8BBD922' }]}>
            <Briefcase size={12} color="#F8BBD9" />
            <Text style={[styles.badgeText, { color: '#F8BBD9' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <TrendingUp size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>+45% Efficiency</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tabContainer}>
        {['overview', 'workflows', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F8BBD9' }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'overview' && (
        <>
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
            <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
              AI SOC Workflow Optimizer continuously analyzes and improves Security Operations Center workflows, 
              identifying bottlenecks, automating repetitive tasks, and optimizing process efficiency.
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F8BBD9' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F8BBD9' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {activeTab === 'workflows' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Optimized Workflows</Text>
          {workflows.map((workflow, index) => (
            <View key={index} style={styles.workflowCard}>
              <View style={styles.workflowHeader}>
                <Text style={styles.workflowName}>{workflow.name}</Text>
                <View style={[styles.workflowStatusBadge, { backgroundColor: workflow.status === 'optimized' ? '#34C75920' : '#FF950020' }]}>
                  <Text style={[styles.workflowStatusText, { color: workflow.status === 'optimized' ? '#34C759' : '#FF9500' }]}>{workflow.status}</Text>
                </View>
              </View>
              <View style={styles.workflowProgressContainer}>
                <View style={styles.workflowProgressBar}>
                  <View style={[styles.workflowProgressFill, { width: workflow.efficiency + '%', backgroundColor: workflow.status === 'optimized' ? '#34C759' : '#F8BBD9' }]} />
                </View>
                <Text style={styles.workflowProgressText}>{workflow.efficiency}%</Text>
              </View>
              <View style={styles.workflowFooter}>
                <Text style={styles.workflowMeta}>Savings: {workflow.savings}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'capabilities' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
          {[
            { endpoint: '/consult/soc-workflow-optimizer', desc: 'Consult on workflow optimization strategies' },
            { endpoint: '/soc-workflow-optimizer/analyze', desc: 'Analyze current workflow performance' },
            { endpoint: '/soc-workflow-optimizer/optimize', desc: 'Execute workflow optimization' },
            { endpoint: '/soc-workflow-optimizer/monitor', desc: 'Monitor workflow metrics in real-time' },
          ].map((item, index) => (
            <View key={index} style={styles.endpointRow}>
              <Zap size={16} color="#F8BBD9" />
              <View style={styles.endpointInfo}>
                <Text style={[styles.endpointText, { color: theme.colors.text }]}>{item.endpoint}</Text>
                <Text style={[styles.endpointDesc, { color: theme.colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Auto-optimization</Text>
              <Text style={styles.featureToggleDesc}>Automatically optimize detected inefficiencies</Text>
            </View>
            <Switch value={autoOptimization} onValueChange={setAutoOptimization} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Playbook Sync</Text>
              <Text style={styles.featureToggleDesc}>Sync optimizations with SOC playbooks</Text>
            </View>
            <Switch value={playbookSync} onValueChange={setPlaybookSync} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={styles.featureToggleTitle}>Performance Tracking</Text>
              <Text style={styles.featureToggleDesc}>Track and report performance metrics</Text>
            </View>
            <Switch value={performanceTracking} onValueChange={setPerformanceTracking} trackColor={{ false: '#767577', true: '#F8BBD9' }} />
          </View>
        </View>
      )}

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/security/vp-security-ops-enterprise')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Shield size={24} color="#F8BBD9" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Security Operations</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent (131)</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>KPIs</Text>
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
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: theme.colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#DC262615' }]}>
              <activity.icon size={16} color="#DC2626" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: theme.colors.text }]}>{activity.action}</Text>
              <Text style={[styles.activityTarget, { color: theme.colors.textSecondary }]}>{activity.target}</Text>
            </View>
            <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{activity.time}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
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
      <AgentFeatures agentId="soc-workflow-optimizer" agentName="AI SOC Workflow Optimizer" />

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
