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
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BarChart3,
  Crown,
  Sparkles,
  Settings,
  Users,
  Layers,
  Bell,
  Phone,
  Mail,
  MessageSquare,
  GitBranch,
  Gauge
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function IncidentEscalationManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [slaMonitoring, setSlaMonitoring] = useState(true);
  const [executiveAlerts, setExecutiveAlerts] = useState(true);

  const stats = [
    { label: 'Escalations Managed', value: '234', change: '+18', icon: ArrowUpRight, color: '#EF4444', trend: 'up' },
    { label: 'Avg Response Time', value: '4.2 min', change: '-1.3 min', icon: Clock, color: '#10B981', trend: 'down' },
    { label: 'Proper Escalation %', value: '98.5%', change: '+2.1%', icon: CheckCircle2, color: '#F59E0B', trend: 'up' },
    { label: 'SLA Compliance', value: '99.2%', change: '+0.8%', icon: Gauge, color: '#8B5CF6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Escalation Accuracy', value: '98.5%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Mean Time to Escalate', value: '2.1 min', target: '3 min', status: 'exceeding', icon: Clock },
    { label: 'Notification Delivery', value: '99.9%', target: '99.5%', status: 'exceeding', icon: Bell },
    { label: 'Stakeholder Satisfaction', value: '4.8/5', target: '4.5/5', status: 'exceeding', icon: Users },
  ];

  const capabilities = [
    'Escalation Path Management', 'Severity-Based Routing', 'Stakeholder Notification', 'On-Call Rotation Integration',
    'SLA Threshold Monitoring', 'Cross-Team Coordination', 'Executive Alerting', 'Communication Templates',
    'Escalation Policy Enforcement', 'Response Time Tracking', 'Workflow Orchestration', 'Bridge Call Initiation',
    'War Room Coordination', 'Escalation Analytics', 'Post-Incident Review Support'
  ];

  const responsibilities = [
    'Define and maintain escalation paths for all incident types',
    'Route incidents to appropriate teams based on severity and expertise',
    'Notify relevant stakeholders based on incident classification',
    'Integrate with on-call rotation systems for after-hours escalation',
    'Monitor SLA thresholds and trigger escalations proactively',
    'Coordinate cross-team responses for complex incidents',
    'Alert executives for business-critical security events',
    'Manage communication templates for different escalation scenarios',
    'Enforce escalation policies and procedures consistently',
    'Track response times and escalate further if needed',
    'Orchestrate incident response workflows across teams',
    'Initiate bridge calls for high-severity incidents',
    'Coordinate war room setup for major incidents',
    'Analyze escalation patterns to improve processes',
    'Support post-incident reviews with escalation data'
  ];

  const activities = [
    { action: 'Escalated to L3', target: 'Ransomware detection', time: '10 mins ago', icon: ArrowUpRight },
    { action: 'Notified CISO', target: 'Critical breach attempt', time: '25 mins ago', icon: Phone },
    { action: 'Initiated bridge', target: 'Incident #4521', time: '45 mins ago', icon: MessageSquare },
    { action: 'Routed to team', target: 'Network security', time: '1 hour ago', icon: GitBranch },
    { action: 'Updated policy', target: 'Escalation thresholds', time: '2 hours ago', icon: Settings },
    { action: 'Sent notification', target: 'On-call rotation', time: '3 hours ago', icon: Bell },
  ];

  const quickActions = [
    { label: 'Escalate Incident', icon: ArrowUpRight, color: '#EF4444' },
    { label: 'Notify Team', icon: Bell, color: '#F59E0B' },
    { label: 'Start Bridge', icon: Phone, color: '#10B981' },
    { label: 'View Paths', icon: GitBranch, color: '#8B5CF6' },
    { label: 'Update Policy', icon: Settings, color: '#3B82F6' },
    { label: 'Contact On-Call', icon: Users, color: '#EC4899' },
    { label: 'War Room', icon: Layers, color: '#DC2626' },
    { label: 'View Analytics', icon: BarChart3, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#DC262615' }]}>
          <ArrowUpRight size={48} color="#DC2626" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Incident Escalation Manager</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security incident escalation and routing specialist
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
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/vp-security-ops-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#DC262615' }]}>
          <Settings size={24} color="#DC2626" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI VP Security Operations</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['overview', 'escalations', 'capabilities', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stats Grid */}
      {activeTab === 'overview' && (
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
      )}

      {/* KPIs Section */}
      {activeTab === 'overview' && (
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
      )}

      {/* Overview Section */}
      {activeTab === 'overview' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          The AI Incident Escalation Manager ensures security incidents are escalated to the right teams and stakeholders 
          at the right time. This agent manages escalation paths, coordinates cross-team responses, and ensures SLA 
          compliance through intelligent routing and notification systems.
        </Text>
      </View>
      )}

      {/* Capabilities Section */}
      {activeTab === 'capabilities' && (
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
      )}

      {/* Responsibilities Section */}
      {activeTab === 'overview' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#DC2626' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>
      )}

      {/* Activity Feed */}
      {activeTab === 'escalations' && (
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
      )}

      {/* Quick Actions */}
      {activeTab === 'overview' && (
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
      )}

      {/* Settings Section */}
      {activeTab === 'settings' && (
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
        
        <View style={styles.featureToggle}>
          <View style={styles.featureToggleInfo}>
            <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Escalation</Text>
            <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically escalate based on SLA thresholds</Text>
          </View>
          <Switch value={autoEscalation} onValueChange={setAutoEscalation} trackColor={{ false: '#767577', true: '#DC2626' }} />
        </View>

        <View style={styles.featureToggle}>
          <View style={styles.featureToggleInfo}>
            <Text style={[styles.featureToggleTitle, { color: colors.text }]}>SLA Monitoring</Text>
            <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Monitor and alert on SLA breaches</Text>
          </View>
          <Switch value={slaMonitoring} onValueChange={setSlaMonitoring} trackColor={{ false: '#767577', true: '#DC2626' }} />
        </View>

        <View style={styles.featureToggle}>
          <View style={styles.featureToggleInfo}>
            <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Executive Alerts</Text>
            <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Alert executives for critical incidents</Text>
          </View>
          <Switch value={executiveAlerts} onValueChange={setExecutiveAlerts} trackColor={{ false: '#767577', true: '#DC2626' }} />
        </View>
      </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="incident-escalation-manager" agentName="AI Incident Escalation Manager" />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  iconContainer: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, marginHorizontal: 16, marginTop: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 11, fontWeight: '500' },
  parentName: { fontSize: 16, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#DC2626' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  changeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  changeText: { fontSize: 11, fontWeight: '600' },
  statValue: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 12, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  overviewText: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, backgroundColor: '#F8F8F8', borderRadius: 12 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600' },
  kpiValue: { fontSize: 18, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  kpiTarget: { fontSize: 11, marginTop: 2 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 20 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 14, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, gap: 8 },
  actionText: { fontSize: 13, fontWeight: '500' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});
