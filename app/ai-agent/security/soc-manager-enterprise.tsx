import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Activity, Users, Calendar, BookOpen, ArrowUpRight, ChevronRight, Star, Clock,
  CheckCircle, AlertTriangle, BarChart3, Shield, Zap, Eye, Search, Radio,
  FileText, Target, TrendingUp, Bell, Play, Pause, Settings, Filter
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

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

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
  <View style={[styles.metricCard, { backgroundColor: '#fff' }]}>
    <View style={[styles.metricIconWrap, { backgroundColor: color + '15' }]}>
      <Icon size={20} color={color} />
    </View>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={[styles.metricChange, { color: change.startsWith('+') ? '#34C759' : change.startsWith('-') ? '#34C759' : '#FF3B30' }]}>{change}</Text>
  </View>
);

const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#D81B60' }} />
  </View>
);

export default function SOCManagerEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [shiftAutomation, setShiftAutomation] = useState(true);
  const [playbookAuto, setPlaybookAuto] = useState(true);
  const [escalationAuto, setEscalationAuto] = useState(true);
  const [metricsEnabled, setMetricsEnabled] = useState(true);

  const stats = [
    { label: 'Active Analysts', value: '24', icon: Users, color: '#007AFF' },
    { label: 'Shift Coverage', value: '24/7', icon: Clock, color: '#34C759' },
    { label: 'Playbooks', value: '89', icon: BookOpen, color: '#FF9500' },
    { label: 'Escalations', value: '12', icon: ArrowUpRight, color: '#D81B60' },
  ];

  const metrics = [
    { title: 'MTTD', value: '4.2m', change: '-15%', icon: Clock, color: '#34C759' },
    { title: 'MTTR', value: '23m', change: '-8%', icon: Zap, color: '#007AFF' },
    { title: 'Alert Queue', value: '234', change: '+12%', icon: Bell, color: '#FF9500' },
    { title: 'SLA Met', value: '98%', change: '+2%', icon: CheckCircle, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Shift Coordinator', 
      description: 'Coordinates SOC shifts and resource allocation automatically',
      icon: Calendar, 
      status: 'active',
      color: '#D81B60',
      route: '/ai-agent/security/sub-agents/shift-coordinator'
    },
    { 
      title: 'AI Playbook Author', 
      description: 'Creates and maintains incident response playbooks',
      icon: BookOpen, 
      status: 'active',
      color: '#E91E63',
      route: '/ai-agent/security/sub-agents/playbook-author'
    },
    { 
      title: 'AI Escalation Path Definer', 
      description: 'Defines and optimizes escalation paths for incidents',
      icon: ArrowUpRight, 
      status: 'active',
      color: '#EC407A',
      route: '/ai-agent/security/sub-agents/escalation-path-definer'
    },
  ];

  const capabilities = [
    { name: 'Shift Management', icon: Calendar, enabled: true },
    { name: 'Playbook Automation', icon: BookOpen, enabled: true },
    { name: 'Escalation Paths', icon: ArrowUpRight, enabled: true },
    { name: 'Metrics Tracking', icon: BarChart3, enabled: true },
    { name: 'Team Coordination', icon: Users, enabled: true },
    { name: 'Quality Assurance', icon: CheckCircle, enabled: true },
    { name: 'Training', icon: Activity, enabled: true },
    { name: 'Reporting', icon: FileText, enabled: true },
  ];

  const shifts = [
    { shift: 'Night Shift (00:00-08:00)', analysts: 6, lead: 'Sarah Chen', status: 'active', alerts: 45 },
    { shift: 'Morning Shift (08:00-16:00)', analysts: 8, lead: 'Mike Ross', status: 'active', alerts: 127 },
    { shift: 'Evening Shift (16:00-00:00)', analysts: 7, lead: 'Alex Kim', status: 'active', alerts: 89 },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#D81B60' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#D81B60' + '25' }]}>
          <Activity size={48} color="#D81B60" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI SOC Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Security Operations Center Management
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#D81B60' + '22' }]}>
            <Star size={12} color="#D81B60" />
            <Text style={[styles.badgeText, { color: '#D81B60' }]}>Manager</Text>
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
        {['overview', 'sub-agents', 'shifts', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#D81B60' }]]}
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
          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SOC Metrics</Text>
            <View style={styles.metricsGrid}>
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
            <View style={styles.capabilitiesGrid}>
              {capabilities.map((cap, index) => (
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#D81B60' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#D81B60' : '#999'} />
                  <Text style={[styles.capabilityText, { color: cap.enabled ? theme.colors.text : '#999' }]}>{cap.name}</Text>
                  {cap.enabled && <CheckCircle size={14} color="#34C759" style={styles.capabilityCheck} />}
                </View>
              ))}
            </View>
          </View>
        </>
      )}

      {/* Sub-Agents Tab */}
      {activeTab === 'sub-agents' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Assigned Sub-Agents (3)</Text>
          <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>
            AI agents reporting to SOC Manager
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

      {/* Shifts Tab */}
      {activeTab === 'shifts' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>SOC Shifts</Text>
          {shifts.map((shift, index) => (
            <View key={index} style={styles.shiftCard}>
              <View style={styles.shiftHeader}>
                <Text style={styles.shiftName}>{shift.shift}</Text>
                <View style={[styles.shiftStatusBadge, { backgroundColor: '#34C75920' }]}>
                  <Text style={[styles.shiftStatusText, { color: '#34C759' }]}>{shift.status}</Text>
                </View>
              </View>
              <View style={styles.shiftStats}>
                <View style={styles.shiftStat}>
                  <Users size={16} color="#666" />
                  <Text style={styles.shiftStatText}>{shift.analysts} Analysts</Text>
                </View>
                <View style={styles.shiftStat}>
                  <Bell size={16} color="#666" />
                  <Text style={styles.shiftStatText}>{shift.alerts} Alerts</Text>
                </View>
              </View>
              <Text style={styles.shiftLead}>Shift Lead: {shift.lead}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          <FeatureToggle
            title="Shift Automation"
            description="Automate shift scheduling and coordination"
            enabled={shiftAutomation}
            onToggle={setShiftAutomation}
          />
          <FeatureToggle
            title="Playbook Automation"
            description="Automate playbook execution and updates"
            enabled={playbookAuto}
            onToggle={setPlaybookAuto}
          />
          <FeatureToggle
            title="Escalation Automation"
            description="Automate incident escalation procedures"
            enabled={escalationAuto}
            onToggle={setEscalationAuto}
          />
          <FeatureToggle
            title="Metrics Collection"
            description="Collect and analyze SOC metrics automatically"
            enabled={metricsEnabled}
            onToggle={setMetricsEnabled}
          />
        </View>
      )}

      <AgentFeatures agentId="soc-manager" agentName="SOC Manager" />
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
  activeTab: { backgroundColor: '#D81B60' },
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
  shiftCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  shiftHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  shiftName: { fontSize: 15, fontWeight: '600', flex: 1 },
  shiftStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  shiftStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  shiftStats: { flexDirection: 'row', gap: 24, marginBottom: 8 },
  shiftStat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  shiftStatText: { fontSize: 12, color: '#666' },
  shiftLead: { fontSize: 12, color: '#999' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
