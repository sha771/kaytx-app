import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Search, FileText, AlertTriangle, Database, ChevronRight, Star, Clock, Activity,
  CheckCircle, BarChart3, Eye, Zap, Layers, Shield, Filter, Settings, Target,
  TrendingUp, AlertOctagon, Scan, FileSearch, Server
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
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#E91E63' }} />
  </View>
);

export default function SecurityAnalystEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [logAnalysis, setLogAnalysis] = useState(true);
  const [alertTriage, setAlertTriage] = useState(true);
  const [iocCollection, setIocCollection] = useState(true);
  const [threatHunting, setThreatHunting] = useState(true);

  const stats = [
    { label: 'Logs Analyzed', value: '45M', icon: FileText, color: '#E91E63' },
    { label: 'Alerts Triage', value: '1,234', icon: AlertTriangle, color: '#FF9500' },
    { label: 'IoCs Collected', value: '8,923', icon: Database, color: '#007AFF' },
    { label: 'Threats Found', value: '45', icon: Target, color: '#34C759' },
  ];

  const metrics = [
    { title: 'False Positive', value: '2%', change: '-0.5%', icon: Filter, color: '#34C759' },
    { title: 'Detection Rate', value: '99.2%', change: '+0.3%', icon: Eye, color: '#007AFF' },
    { title: 'Mean Time', value: '4.2m', change: '-30s', icon: Clock, color: '#FF9500' },
    { title: 'IoC Matches', value: '456', change: '+23', icon: Database, color: '#E91E63' },
  ];

  const subAgents = [
    { 
      title: 'AI Log Reviewer', 
      description: 'Automated log analysis and anomaly detection across all systems',
      icon: FileText, 
      status: 'active',
      color: '#E91E63',
      route: '/ai-agent/security/sub-agents/log-reviewer'
    },
    { 
      title: 'AI Alert Triage Agent', 
      description: 'Intelligent alert triage and prioritization for SOC efficiency',
      icon: AlertTriangle, 
      status: 'active',
      color: '#EC407A',
      route: '/ai-agent/security/sub-agents/alert-triage-agent'
    },
    { 
      title: 'AI IoC Collector', 
      description: 'Collects and correlates Indicators of Compromise from multiple sources',
      icon: Database, 
      status: 'active',
      color: '#F06292',
      route: '/ai-agent/security/sub-agents/ioc-collector'
    },
  ];

  const capabilities = [
    { name: 'Log Analysis', icon: FileText, enabled: true },
    { name: 'Alert Triage', icon: AlertTriangle, enabled: true },
    { name: 'IoC Management', icon: Database, enabled: true },
    { name: 'Threat Hunting', icon: Target, enabled: true },
    { name: 'SIEM Queries', icon: Search, enabled: true },
    { name: 'Malware Analysis', icon: Scan, enabled: true },
    { name: 'Forensics', icon: FileSearch, enabled: true },
    { name: 'Intelligence', icon: Eye, enabled: true },
  ];

  const recentFindings = [
    { id: 1, type: 'Malware', severity: 'Critical', description: 'Suspicious PowerShell activity detected', source: 'Endpoint', time: '5 min ago' },
    { id: 2, type: 'Anomaly', severity: 'High', description: 'Unusual outbound data transfer', source: 'Network', time: '12 min ago' },
    { id: 3, type: 'IoC Match', severity: 'Medium', description: 'Known malicious IP connection attempt', source: 'Firewall', time: '25 min ago' },
    { id: 4, type: 'Policy Violation', severity: 'Low', description: 'USB device connected to server', source: 'DLP', time: '45 min ago' },
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
      <View style={[styles.hero, { backgroundColor: '#E91E63' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E63' + '25' }]}>
          <Search size={48} color="#E91E63" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Security Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Threat Detection & Security Analysis
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#E91E63' + '22' }]}>
            <Star size={12} color="#E91E63" />
            <Text style={[styles.badgeText, { color: '#E91E63' }]}>Analyst</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <Eye size={12} color="#FF9500" />
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
        {['overview', 'sub-agents', 'findings', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#E91E63' }]]}
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Analysis Metrics</Text>
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#E91E63' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#E91E63' : '#999'} />
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
            AI agents reporting to Security Analyst
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

      {/* Findings Tab */}
      {activeTab === 'findings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Findings</Text>
          {recentFindings.map((finding) => (
            <View key={finding.id} style={[styles.findingCard, { borderLeftColor: getSeverityColor(finding.severity) }]}>
              <View style={styles.findingHeader}>
                <View style={[styles.findingTypeBadge, { backgroundColor: getSeverityColor(finding.severity) + '20' }]}>
                  <Text style={[styles.findingTypeText, { color: getSeverityColor(finding.severity) }]}>{finding.type}</Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(finding.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(finding.severity) }]}>{finding.severity}</Text>
                </View>
              </View>
              <Text style={styles.findingDesc}>{finding.description}</Text>
              <View style={styles.findingFooter}>
                <Text style={styles.findingSource}>Source: {finding.source}</Text>
                <Text style={styles.findingTime}>{finding.time}</Text>
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
            title="Log Analysis"
            description="Automated security log analysis"
            enabled={logAnalysis}
            onToggle={setLogAnalysis}
          />
          <FeatureToggle
            title="Alert Triage"
            description="Intelligent alert prioritization"
            enabled={alertTriage}
            onToggle={setAlertTriage}
          />
          <FeatureToggle
            title="IoC Collection"
            description="Collect indicators of compromise automatically"
            enabled={iocCollection}
            onToggle={setIocCollection}
          />
          <FeatureToggle
            title="Threat Hunting"
            description="Proactive threat hunting capabilities"
            enabled={threatHunting}
            onToggle={setThreatHunting}
          />
        </View>
      )}

      <AgentFeatures agentId="security-analyst" agentName="Security Analyst" />
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
  activeTab: { backgroundColor: '#E91E63' },
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
  findingCard: { padding: 16, borderRadius: 12, borderLeftWidth: 4, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  findingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  findingTypeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  findingTypeText: { fontSize: 11, fontWeight: '700' },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  severityText: { fontSize: 11, fontWeight: '600' },
  findingDesc: { fontSize: 14, marginBottom: 12 },
  findingFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  findingSource: { fontSize: 12, color: '#666' },
  findingTime: { fontSize: 12, color: '#999' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
