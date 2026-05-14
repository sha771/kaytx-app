import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Shield, Activity, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, 
  Calendar, ShieldCheck, ArrowRight, Users, Zap, Star, Lock, Eye, TriangleAlert,
  Workflow, Bell, FileText, Settings, Cpu, Globe, Server, Network, Terminal,
  Radio, AlertOctagon, AlertTriangle, Scan, Search, BarChart3, TrendingUp, CheckCircle,
  Play, Pause, RotateCw, ChevronRight, Plus, Minus, Filter, Download, Share2
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

// Sub-agent card component
const SubAgentCard = ({ title, description, icon: Icon, status, onPress, color }: any) => (
  <TouchableOpacity style={[styles.subAgentCard, { backgroundColor: '#fff', borderLeftColor: color, borderLeftWidth: 4 }]} onPress={onPress}>
    <View style={styles.subAgentHeader}>
      <View style={[styles.subAgentIconWrap, { backgroundColor: color + '15' }]}>
        <Icon size={24} color={color} />
      </View>
      <View style={styles.subAgentStatus}>
        <View style={[styles.statusDot, { backgroundColor: status === 'active' ? '#34C759' : '#FF9500' }]} />
        <Text style={styles.statusText}>{status === 'active' ? 'Active' : 'Standby'}</Text>
      </View>
    </View>
    <Text style={styles.subAgentTitle}>{title}</Text>
    <Text style={styles.subAgentDesc} numberOfLines={2}>{description}</Text>
    <View style={styles.subAgentFooter}>
      <Text style={[styles.subAgentLink, { color }]}>Configure</Text>
      <ChevronRight size={16} color={color} />
    </View>
  </TouchableOpacity>
);

// Metric card component
const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <View style={[styles.metricCard, { backgroundColor: '#fff' }]}>
    <View style={[styles.metricIconWrap, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={[styles.metricChange, { color: change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{change}</Text>
  </View>
);

// Feature toggle component
const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#C62828' }} />
  </View>
);

export default function VPSecurityOpsEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [threatMonitoring, setThreatMonitoring] = useState(true);
  const [autoResponse, setAutoResponse] = useState(true);
  const [alertCorrelation, setAlertCorrelation] = useState(true);
  const [threatIntel, setThreatIntel] = useState(true);

  const stats = [
    { label: 'Threats Blocked', value: '45,231', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.99%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.3s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.8%', icon: Target, color: '#AF52DE' },
  ];

  const metrics = [
    { title: 'Active Alerts', value: '127', change: '+12%', icon: Bell, color: '#FF9500' },
    { title: 'Threats Today', value: '2,847', change: '+5%', icon: TriangleAlert, color: '#FF3B30' },
    { title: 'Incidents', value: '3', change: '-50%', icon: AlertTriangle, color: '#C62828' },
    { title: 'SLA Compliance', value: '98.5%', change: '+2%', icon: CheckCircle, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI SOC Workflow Optimizer', 
      description: 'Optimizes SOC workflows for maximum efficiency and reduced response times',
      icon: Workflow, 
      status: 'active',
      color: '#C62828',
      route: '/ai-agent/security/sub-agents/soc-workflow-optimizer'
    },
    { 
      title: 'AI Alert Prioritizer', 
      description: 'Intelligently prioritizes security alerts based on risk and impact',
      icon: AlertOctagon, 
      status: 'active',
      color: '#D32F2F',
      route: '/ai-agent/security/sub-agents/alert-prioritizer'
    },
    { 
      title: 'AI Incident Escalation Manager', 
      description: 'Manages incident escalation paths and ensures timely response',
      icon: ArrowRight, 
      status: 'active',
      color: '#E53935',
      route: '/ai-agent/security/sub-agents/incident-escalation-manager'
    },
  ];

  const capabilities = [
    { name: 'Threat Detection', icon: Scan, enabled: true },
    { name: 'Incident Response', icon: AlertTriangle, enabled: true },
    { name: 'SIEM Integration', icon: Server, enabled: true },
    { name: 'Vulnerability Mgmt', icon: ShieldCheck, enabled: true },
    { name: 'Penetration Testing', icon: Target, enabled: true },
    { name: 'Compliance', icon: CheckCircle, enabled: true },
    { name: 'SOC Operations', icon: Users, enabled: true },
    { name: 'Forensics', icon: Search, enabled: true },
  ];

  const recentAlerts = [
    { id: 1, severity: 'critical', title: 'Suspicious login from unknown IP', source: 'Identity Protection', time: '2 min ago', status: 'open' },
    { id: 2, severity: 'high', title: 'Malware detected in email attachment', source: 'Email Security', time: '5 min ago', status: 'investigating' },
    { id: 3, severity: 'medium', title: 'Unusual data access pattern', source: 'DLP', time: '12 min ago', status: 'resolved' },
    { id: 4, severity: 'low', title: 'Failed password attempt', source: 'AD', time: '25 min ago', status: 'resolved' },
  ];

  const workflows = [
    { name: 'Threat Detection Pipeline', status: 'running', lastRun: '2 min ago', success: '99.8%' },
    { name: 'Incident Response Automation', status: 'running', lastRun: '5 min ago', success: '100%' },
    { name: 'Vulnerability Scan', status: 'scheduled', lastRun: '1 hour ago', success: '98.5%' },
    { name: 'Compliance Check', status: 'idle', lastRun: '4 hours ago', success: '99.9%' },
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'critical': return '#C62828';
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#007AFF';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#C62828' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#C62828' + '25' }]}>
          <Shield size={48} color="#C62828" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Security Operations</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Enterprise Security Operations Center Management
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#C62828' + '22' }]}>
            <Star size={12} color="#C62828" />
            <Text style={[styles.badgeText, { color: '#C62828' }]}>VP Level</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['overview', 'sub-agents', 'alerts', 'workflows', 'settings'].map((tab) => (
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          {/* Enterprise Metrics */}
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Metrics</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </View>
          </View>

          {/* Capabilities */}
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#C62828' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#C62828' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity style={styles.quickActionBtn}>
                <Scan size={20} color="#C62828" />
                <Text style={styles.quickActionText}>Run Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionBtn}>
                <FileText size={20} color="#C62828" />
                <Text style={styles.quickActionText}>Generate Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionBtn}>
                <Download size={20} color="#C62828" />
                <Text style={styles.quickActionText}>Export Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickActionBtn}>
                <Share2 size={20} color="#C62828" />
                <Text style={styles.quickActionText}>Share Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {/* Sub-Agents Tab */}
      {activeTab === 'sub-agents' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Assigned Sub-Agents (3)
          </Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            AI agents reporting to VP Security Operations
          </Text>
          <View style={styles.subAgentsGrid}>
            {subAgents.map((agent, index) => (
              <SubAgentCard
                key={index}
                {...agent}
                onPress={() => router.push(agent.route as any)}
              />
            ))}
          </View>
        </View>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <View style={styles.alertsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Alerts</Text>
            <TouchableOpacity style={styles.filterBtn}>
              <Filter size={16} color="#C62828" />
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>
          {recentAlerts.map((alert) => (
            <View key={alert.id} style={[styles.alertCard, { borderLeftColor: getSeverityColor(alert.severity) }]}>
              <View style={styles.alertHeader}>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(alert.severity) }]}>
                    {alert.severity.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.alertTime}>{alert.time}</Text>
              </View>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertSource}>{alert.source}</Text>
              <View style={styles.alertFooter}>
                <View style={[styles.statusBadge, { backgroundColor: alert.status === 'resolved' ? '#34C75920' : '#FF950020' }]}>
                  <Text style={[styles.statusBadgeText, { color: alert.status === 'resolved' ? '#34C759' : '#FF9500' }]}>
                    {alert.status}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.alertAction}>Investigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Workflows Tab */}
      {activeTab === 'workflows' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Workflows</Text>
          {workflows.map((workflow, index) => (
            <View key={index} style={styles.workflowCard}>
              <View style={styles.workflowHeader}>
                <View style={[styles.workflowIcon, { backgroundColor: workflow.status === 'running' ? '#34C75915' : '#FF950015' }]}>
                  {workflow.status === 'running' ? <Play size={16} color="#34C759" /> : <Pause size={16} color="#FF9500" />}
                </View>
                <View style={styles.workflowInfo}>
                  <Text style={styles.workflowName}>{workflow.name}</Text>
                  <Text style={styles.workflowMeta}>Last run: {workflow.lastRun} • Success: {workflow.success}</Text>
                </View>
                <TouchableOpacity style={styles.workflowAction}>
                  <Settings size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          <FeatureToggle
            title="Real-time Threat Monitoring"
            description="Continuously monitor for security threats across all systems"
            enabled={threatMonitoring}
            onToggle={setThreatMonitoring}
          />
          <FeatureToggle
            title="Auto-Incident Response"
            description="Automatically initiate response procedures for detected threats"
            enabled={autoResponse}
            onToggle={setAutoResponse}
          />
          <FeatureToggle
            title="Alert Correlation"
            description="Intelligently correlate related alerts to reduce noise"
            enabled={alertCorrelation}
            onToggle={setAlertCorrelation}
          />
          <FeatureToggle
            title="Threat Intelligence Feed"
            description="Integrate external threat intelligence sources"
            enabled={threatIntel}
            onToggle={setThreatIntel}
          />
        </View>
      )}

      <AgentFeatures agentId="vp-security-ops" agentName="VP Security Operations" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500', textAlign: 'center' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F2F7' },
  activeTab: { backgroundColor: '#C62828' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  activeTabText: { color: '#fff' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionSubtitle: { fontSize: 13, marginBottom: 16, marginTop: -10 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  metricIconWrap: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  metricValue: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  metricTitle: { fontSize: 12, color: '#666', marginBottom: 4 },
  metricChange: { fontSize: 12, fontWeight: '600' },
  capabilitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  capabilityText: { fontSize: 13, fontWeight: '500', flex: 1 },
  capabilityCheck: { marginLeft: 'auto' },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickActionBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#C62828' + '10', borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  quickActionText: { fontSize: 13, fontWeight: '600', color: '#C62828' },
  subAgentsGrid: { gap: 12 },
  subAgentCard: { padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  subAgentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  subAgentIconWrap: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  subAgentStatus: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusText: { fontSize: 12, color: '#666' },
  subAgentTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  subAgentDesc: { fontSize: 12, color: '#666', marginBottom: 12 },
  subAgentFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  subAgentLink: { fontSize: 13, fontWeight: '600' },
  alertsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#C62828' + '10', borderRadius: 20, gap: 4 },
  filterText: { fontSize: 12, fontWeight: '600', color: '#C62828' },
  alertCard: { padding: 16, borderRadius: 12, borderLeftWidth: 4, backgroundColor: '#fff', marginBottom: 12 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  severityText: { fontSize: 10, fontWeight: '700' },
  alertTime: { fontSize: 12, color: '#999' },
  alertTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  alertSource: { fontSize: 12, color: '#666', marginBottom: 12 },
  alertFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  statusBadgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  alertAction: { fontSize: 13, fontWeight: '600', color: '#C62828' },
  workflowCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  workflowHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  workflowIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  workflowInfo: { flex: 1 },
  workflowName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  workflowMeta: { fontSize: 12, color: '#666' },
  workflowAction: { padding: 8 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
