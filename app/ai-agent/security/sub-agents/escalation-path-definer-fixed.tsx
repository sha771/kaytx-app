import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  GitBranch, CheckCircle, AlertTriangle, FileText, BarChart3,
  Network, Layers, ArrowUp, Users, Phone
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function EscalationPathDefinerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoEscalation, setAutoEscalation] = useState(true);
  const [severityRouting, setSeverityRouting] = useState(true);
  const [notificationAlerts, setNotificationAlerts] = useState(true);

  const stats = [
    { label: 'Paths Defined', value: '67', change: '+12', icon: GitBranch, color: '#EF4444', trend: 'up' },
    { label: 'Escalations', value: '234', change: '+45', icon: ArrowUp, color: '#F59E0B', trend: 'up' },
    { label: 'Avg Response', value: '4 min', change: '-1 min', icon: Clock, color: '#10B981', trend: 'down' },
    { label: 'Accuracy', value: '98%', change: '+2%', icon: CheckCircle, color: '#3B82F6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Escalation Accuracy', value: '98%', target: '95%', status: 'exceeding', icon: CheckCircle },
    { label: 'Response Time', value: '4 min', target: '5 min', status: 'exceeding', icon: Clock },
    { label: 'Path Coverage', value: '94%', target: '90%', status: 'exceeding', icon: Layers },
    { label: 'SLA Compliance', value: '99.2%', target: '98%', status: 'exceeding', icon: Activity },
  ];

  const escalationPaths = [
    { severity: 'Critical', path: 'L1 → L2 → L3 → CISO', color: '#DC2626', avgTime: '2 min', steps: 4 },
    { severity: 'High', path: 'L1 → L2 → Manager', color: '#F59E0B', avgTime: '5 min', steps: 3 },
    { severity: 'Medium', path: 'L1 → L2', color: '#3B82F6', avgTime: '15 min', steps: 2 },
    { severity: 'Low', path: 'L1 Auto-resolve', color: '#10B981', avgTime: '30 min', steps: 1 },
  ];

  const capabilities = [
    'Path Definition', 'Severity Routing', 'Auto-Escalation', 'Notification Management',
    'SLA Tracking', 'Approval Workflows', 'Impact Analysis', 'Report Generation',
    'Dynamic Routing', 'On-Call Integration', 'Escalation Timers', 'Multi-Channel Alerts',
    'Role-Based Routing', 'Time-Based Rules', 'Escalation Analytics'
  ];

  const responsibilities = [
    'Define and maintain escalation paths for different incident severity levels',
    'Route incidents to appropriate responders based on severity and expertise',
    'Automate escalation triggers based on time thresholds and response requirements',
    'Manage notification workflows across multiple channels (email, SMS, phone, chat)',
    'Track SLA compliance and alert on potential breaches',
    'Implement approval workflows for high-severity incident escalations',
    'Analyze escalation patterns and optimize routing logic',
    'Define role-based escalation rules for different incident types',
    'Integrate with on-call schedules to route to correct responders',
    'Configure escalation timers and auto-escalation behavior',
    'Support multi-channel alert delivery for critical escalations',
    'Generate escalation analytics and performance reports',
    'Maintain escalation path documentation and version history',
    'Support business continuity with redundant escalation routes',
    'Integrate with external systems for enterprise-wide escalation management'
  ];

  const activities = [
    { action: 'Triggered escalation', target: 'Critical - Server outage', time: '15 mins ago', icon: ArrowUp },
    { action: 'Updated path', target: 'Ransomware response', time: '1 hour ago', icon: GitBranch },
    { action: 'Routed incident', target: 'Phishing - High severity', time: '2 hours ago', icon: Network },
    { action: 'Completed workflow', target: 'Data breach protocol', time: '3 hours ago', icon: CheckCircle },
    { action: 'Generated report', target: 'Q4 escalation metrics', time: '1 day ago', icon: BarChart3 },
    { action: 'Optimized routing', target: 'Night shift paths', time: '2 days ago', icon: Layers },
  ];

  const quickActions = [
    { label: 'Define Path', icon: GitBranch, color: '#EF4444' },
    { label: 'Trigger Escalation', icon: ArrowUp, color: '#F59E0B' },
    { label: 'View Paths', icon: Network, color: '#10B981' },
    { label: 'Check SLA', icon: Clock, color: '#3B82F6' },
    { label: 'Send Alert', icon: Phone, color: '#8B5CF6' },
    { label: 'View Reports', icon: BarChart3, color: '#EC4899' },
    { label: 'Manage Rules', icon: Settings, color: '#6366F1' },
    { label: 'On-Call Status', icon: Users, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <ArrowUp size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Escalation Path Definer</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Security incident escalation and routing specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EF444420' }]}>
            <Crown size={14} color="#EF4444" />
            <Text style={[styles.badgeText, { color: '#EF4444' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/soc-manager-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#EF444415' }]}>
          <Settings size={24} color="#EF4444" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI SOC Manager</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'paths', 'capabilities', 'settings'].map((tab) => (
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
                <View style={[styles.kpiIcon, { backgroundColor: '#EF444415' }]}>
                  <kpi.icon size={16} color="#EF4444" />
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
          The AI Escalation Path Definer creates and manages escalation paths for security incidents, 
          ensuring the right people are notified at the right time based on severity and impact. 
          It automates routing, tracks SLA compliance, and optimizes escalation workflows.
        </Text>
      </View>
      </>)}

      {activeTab === 'paths' && (<>
      {/* Escalation Paths */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Escalation Paths</Text>
        {escalationPaths.map((ep, index) => (
          <View key={index} style={styles.escalationCard}>
            <View style={styles.escalationHeader}>
              <View style={[styles.severityDot, { backgroundColor: ep.color }]} />
              <Text style={[styles.escalationSeverity, { color: ep.color }]}>{ep.severity}</Text>
              <Text style={[styles.escalationTime, { color: colors.textSecondary }]}>{ep.avgTime} avg</Text>
            </View>
            <View style={styles.escalationPath}>
              <Text style={[styles.escalationPathText, { color: colors.text }]}>{ep.path}</Text>
            </View>
            <View style={styles.escalationProgress}>
              {Array.from({ length: ep.steps }).map((_, i) => (
                <React.Fragment key={i}>
                  <View style={[styles.progressDot, { backgroundColor: ep.color }]} />
                  {i < ep.steps - 1 && (
                    <View style={[styles.progressLine, { backgroundColor: ep.color + '40' }]} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#EF444415' }]}>
              <activity.icon size={16} color="#EF4444" />
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
      </>)}

      {activeTab === 'capabilities' && (<>
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
            <View style={[styles.bullet, { backgroundColor: '#EF4444' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* A2A Endpoints */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>A2A Endpoints</Text>
        {[
          { endpoint: '/consult/escalation-path-definer', desc: 'Consult on escalation paths' },
          { endpoint: '/escalation-path-definer/define', desc: 'Define new escalation path' },
          { endpoint: '/escalation-path-definer/trigger', desc: 'Trigger escalation' },
          { endpoint: '/escalation-path-definer/report', desc: 'Generate escalation report' },
        ].map((item, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={16} color="#EF4444" />
            <View style={styles.endpointInfo}>
              <Text style={[styles.endpointText, { color: colors.text }]}>{item.endpoint}</Text>
              <Text style={[styles.endpointDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
            </View>
          </View>
        ))}
      </View>
      </>)}

      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Configuration</Text>
          
          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Escalation</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically escalate based on rules</Text>
            </View>
            <Switch value={autoEscalation} onValueChange={setAutoEscalation} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Severity Routing</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Route by severity level</Text>
            </View>
            <Switch value={severityRouting} onValueChange={setSeverityRouting} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Notification Alerts</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Send alerts on escalation events</Text>
            </View>
            <Switch value={notificationAlerts} onValueChange={setNotificationAlerts} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="escalation-path-definer" agentName="AI Escalation Path Definer" />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  iconContainer: { width: 96, height: 96, borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesContainer: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  parentCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 12, gap: 12 },
  parentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  parentInfo: { flex: 1 },
  parentLabel: { fontSize: 12, marginBottom: 2 },
  parentName: { fontSize: 16, fontWeight: '600' },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTabTab: { backgroundColor: '#EF4444' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabTabText: { color: '#fff' },
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
  escalationCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  escalationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  severityDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  escalationSeverity: { fontSize: 14, fontWeight: '600', flex: 1 },
  escalationTime: { fontSize: 12 },
  escalationPath: { padding: 12, borderRadius: 8, backgroundColor: '#F9FAFB', marginBottom: 8 },
  escalationPathText: { fontSize: 13, fontFamily: 'monospace' },
  escalationProgress: { flexDirection: 'row', alignItems: 'center' },
  progressDot: { width: 12, height: 12, borderRadius: 6 },
  progressLine: { flex: 1, height: 2, marginHorizontal: 4 },
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
});
