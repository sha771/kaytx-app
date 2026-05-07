import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  AlertTriangle, Shield, ClipboardList, Clock, ChevronRight, Star, Activity,
  CheckCircle, BarChart3, Zap, Siren, Crosshair, Lock, Filter, Settings,
  Play, Pause, RotateCw, FileText, Users, Eye, TrendingUp, Target, Radio
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
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#EC407A' }} />
  </View>
);

export default function IncidentResponderEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [autoContainment, setAutoContainment] = useState(true);
  const [evidenceAuto, setEvidenceAuto] = useState(true);
  const [timelineAuto, setTimelineAuto] = useState(true);
  const [playbookAuto, setPlaybookAuto] = useState(true);

  const stats = [
    { label: 'Incidents', value: '156', icon: AlertTriangle, color: '#EC407A' },
    { label: 'Contained', value: '98%', icon: Shield, color: '#34C759' },
    { label: 'Response', value: '8.5m', icon: Clock, color: '#FF9500' },
    { label: 'Evidence', value: '1,234', icon: ClipboardList, color: '#007AFF' },
  ];

  const metrics = [
    { title: 'MTTD', value: '2.4m', change: '-15%', icon: Clock, color: '#34C759' },
    { title: 'MTTR', value: '18m', change: '-12%', icon: Zap, color: '#007AFF' },
    { title: 'Open Incidents', value: '3', change: '0', icon: Siren, color: '#FF3B30' },
    { title: 'Success Rate', value: '98%', change: '+2%', icon: CheckCircle, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Containment Coordinator', 
      description: 'Coordinates incident containment across all affected systems',
      icon: Shield, 
      status: 'active',
      color: '#EC407A',
      route: '/ai-agent/security/sub-agents/containment-coordinator'
    },
    { 
      title: 'AI Evidence Collector', 
      description: 'Collects and preserves forensic evidence automatically',
      icon: ClipboardList, 
      status: 'active',
      color: '#F06292',
      route: '/ai-agent/security/sub-agents/evidence-collector'
    },
    { 
      title: 'AI Timeline Reconstructor', 
      description: 'Reconstructs incident timelines from multiple data sources',
      icon: Clock, 
      status: 'active',
      color: '#F48FB1',
      route: '/ai-agent/security/sub-agents/timeline-reconstructor'
    },
  ];

  const capabilities = [
    { name: 'Incident Triage', icon: Siren, enabled: true },
    { name: 'Containment', icon: Shield, enabled: true },
    { name: 'Evidence Collection', icon: ClipboardList, enabled: true },
    { name: 'Timeline Analysis', icon: Clock, enabled: true },
    { name: 'Root Cause', icon: Crosshair, enabled: true },
    { name: 'Eradication', icon: Zap, enabled: true },
    { name: 'Recovery', icon: RotateCw, enabled: true },
    { name: 'Lessons Learned', icon: FileText, enabled: true },
  ];

  const activeIncidents = [
    { id: 'INC-2024-0156', severity: 'Critical', status: 'containment', title: 'Ransomware Detection', affected: 12, startTime: '15 min ago' },
    { id: 'INC-2024-0155', severity: 'High', status: 'investigation', title: 'Data Exfiltration', affected: 3, startTime: '45 min ago' },
    { id: 'INC-2024-0154', severity: 'Medium', status: 'recovery', title: 'DDoS Attack', affected: 1, startTime: '2 hours ago' },
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'Critical': return '#C62828';
      case 'High': return '#FF3B30';
      case 'Medium': return '#FF9500';
      case 'Low': return '#34C759';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#EC407A' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#EC407A' + '25' }]}>
          <AlertTriangle size={48} color="#EC407A" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Incident Responder</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Incident Response & Crisis Management
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#EC407A' + '22' }]}>
            <Star size={12} color="#EC407A" />
            <Text style={[styles.badgeText, { color: '#EC407A' }]}>Responder</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <Siren size={12} color="#FF9500" />
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
        {['overview', 'sub-agents', 'incidents', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#EC407A' }]]}
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Response Metrics</Text>
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#EC407A' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#EC407A' : '#999'} />
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
            AI agents reporting to Incident Responder
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

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Incidents</Text>
          {activeIncidents.map((incident) => (
            <View key={incident.id} style={[styles.incidentCard, { borderLeftColor: getSeverityColor(incident.severity) }]}>
              <View style={styles.incidentHeader}>
                <Text style={styles.incidentId}>{incident.id}</Text>
                <View style={[styles.incidentSeverityBadge, { backgroundColor: getSeverityColor(incident.severity) + '20' }]}>
                  <Text style={[styles.incidentSeverityText, { color: getSeverityColor(incident.severity) }]}>{incident.severity}</Text>
                </View>
              </View>
              <Text style={styles.incidentTitle}>{incident.title}</Text>
              <View style={styles.incidentMeta}>
                <Text style={styles.incidentMetaText}>Status: {incident.status}</Text>
                <Text style={styles.incidentMetaText}>Systems: {incident.affected}</Text>
                <Text style={styles.incidentMetaText}>Started: {incident.startTime}</Text>
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
            title="Auto-Containment"
            description="Automatically contain security incidents"
            enabled={autoContainment}
            onToggle={setAutoContainment}
          />
          <FeatureToggle
            title="Evidence Collection"
            description="Automate forensic evidence collection"
            enabled={evidenceAuto}
            onToggle={setEvidenceAuto}
          />
          <FeatureToggle
            title="Timeline Reconstruction"
            description="Auto-reconstruct incident timelines"
            enabled={timelineAuto}
            onToggle={setTimelineAuto}
          />
          <FeatureToggle
            title="Playbook Automation"
            description="Execute response playbooks automatically"
            enabled={playbookAuto}
            onToggle={setPlaybookAuto}
          />
        </View>
      )}

      <AgentFeatures agentId="incident-responder" agentName="Incident Responder" />
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
  activeTab: { backgroundColor: '#EC407A' },
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
  incidentCard: { padding: 16, borderRadius: 12, borderLeftWidth: 4, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  incidentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  incidentId: { fontSize: 13, fontWeight: '600', color: '#666' },
  incidentSeverityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  incidentSeverityText: { fontSize: 11, fontWeight: '700' },
  incidentTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  incidentMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  incidentMetaText: { fontSize: 12, color: '#666' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
