import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Target, Zap, FileWarning, Wrench, Crosshair, Shield, Bug, AlertTriangle,
  ChevronRight, Star, Activity, CheckCircle, BarChart3, Eye, Lock,
  Settings, Filter, Server, Globe, Scan, Radio, Terminal, Play, Pause
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
    <Text style={[styles.metricChange, { color: change.startsWith('+') ? '#34C759' : change.startsWith('-') ? '#FF3B30' : '#666' }]}>{change}</Text>
  </View>
);

const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#F48FB1' }} />
  </View>
);

export default function PenetrationTesterEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [exploitResearch, setExploitResearch] = useState(true);
  const [vulnReporting, setVulnReporting] = useState(true);
  const [remediation, setRemediation] = useState(true);
  const [continuousTesting, setContinuousTesting] = useState(true);

  const stats = [
    { label: 'Tests Run', value: '156', icon: Target, color: '#F48FB1' },
    { label: 'Vulns Found', value: '423', icon: Bug, color: '#FF3B30' },
    { label: 'Exploits', value: '89', icon: Zap, color: '#FF9500' },
    { label: 'Remediated', value: '401', icon: CheckCircle, color: '#34C759' },
  ];

  const metrics = [
    { title: 'Critical', value: '3', change: '-2', icon: AlertTriangle, color: '#FF3B30' },
    { title: 'High', value: '12', change: '-5', icon: Bug, color: '#FF9500' },
    { title: 'Medium', value: '34', change: '+8', icon: Shield, color: '#007AFF' },
    { title: 'Test Coverage', value: '94%', change: '+3%', icon: Target, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Exploit Researcher', 
      description: 'Researches and develops proof-of-concept exploits for discovered vulnerabilities',
      icon: Zap, 
      status: 'active',
      color: '#F48FB1',
      route: '/ai-agent/security/sub-agents/exploit-researcher'
    },
    { 
      title: 'AI Vulnerability Reporter', 
      description: 'Generates detailed vulnerability reports with risk ratings and evidence',
      icon: FileWarning, 
      status: 'active',
      color: '#F8BBD9',
      route: '/ai-agent/security/sub-agents/vulnerability-reporter'
    },
    { 
      title: 'AI Remediation Advisor', 
      description: 'Provides actionable remediation guidance for discovered vulnerabilities',
      icon: Wrench, 
      status: 'active',
      color: '#FCE4EC',
      route: '/ai-agent/security/sub-agents/remediation-advisor'
    },
  ];

  const capabilities = [
    { name: 'Network Pentest', icon: Globe, enabled: true },
    { name: 'Web App Testing', icon: Server, enabled: true },
    { name: 'Mobile Testing', icon: Scan, enabled: true },
    { name: 'Cloud Pentest', icon: Server, enabled: true },
    { name: 'Social Eng', icon: Users, enabled: true },
    { name: 'Physical Sec', icon: Lock, enabled: true },
    { name: 'Wireless Testing', icon: Radio, enabled: true },
    { name: 'API Testing', icon: Terminal, enabled: true },
  ];

  const recentScans = [
    { name: 'Production Web App', type: 'Web', status: 'completed', critical: 0, high: 2, medium: 8, date: '2024-03-15' },
    { name: 'Internal Network', type: 'Network', status: 'running', critical: 1, high: 0, medium: 0, date: 'In Progress' },
    { name: 'API Gateway', type: 'API', status: 'completed', critical: 0, high: 1, medium: 5, date: '2024-03-10' },
    { name: 'Cloud Infrastructure', type: 'Cloud', status: 'scheduled', critical: 0, high: 0, medium: 0, date: '2024-03-20' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#F48FB1' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F48FB1' + '25' }]}>
          <Target size={48} color="#F48FB1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Penetration Tester</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Ethical Hacking & Vulnerability Assessment
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F48FB1' + '22' }]}>
            <Star size={12} color="#F48FB1" />
            <Text style={[styles.badgeText, { color: '#F48FB1' }]}>Tester</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <Bug size={12} color="#FF9500" />
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
        {['overview', 'sub-agents', 'scans', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F48FB1' }]]}
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Vulnerability Metrics</Text>
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F48FB1' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F48FB1' : '#999'} />
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
            AI agents reporting to Penetration Tester
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

      {/* Scans Tab */}
      {activeTab === 'scans' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Penetration Tests</Text>
          {recentScans.map((scan, index) => (
            <View key={index} style={styles.scanCard}>
              <View style={styles.scanHeader}>
                <Text style={styles.scanName}>{scan.name}</Text>
                <View style={[styles.scanStatusBadge, { backgroundColor: scan.status === 'completed' ? '#34C75920' : scan.status === 'running' ? '#007AFF20' : '#FF950020' }]}>
                  <Text style={[styles.scanStatusText, { color: scan.status === 'completed' ? '#34C759' : scan.status === 'running' ? '#007AFF' : '#FF9500' }]}>{scan.status}</Text>
                </View>
              </View>
              <Text style={styles.scanType}>{scan.type} • {scan.date}</Text>
              <View style={styles.scanVulns}>
                {scan.critical > 0 && <View style={[styles.vulnBadge, { backgroundColor: '#C62828' }]}><Text style={styles.vulnText}>Critical: {scan.critical}</Text></View>}
                {scan.high > 0 && <View style={[styles.vulnBadge, { backgroundColor: '#FF3B30' }]}><Text style={styles.vulnText}>High: {scan.high}</Text></View>}
                {scan.medium > 0 && <View style={[styles.vulnBadge, { backgroundColor: '#FF9500' }]}><Text style={styles.vulnText}>Medium: {scan.medium}</Text></View>}
                {scan.critical === 0 && scan.high === 0 && scan.medium === 0 && <Text style={styles.noVulns}>No vulnerabilities found</Text>}
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
            title="Exploit Research"
            description="Research new exploits and attack vectors"
            enabled={exploitResearch}
            onToggle={setExploitResearch}
          />
          <FeatureToggle
            title="Vulnerability Reporting"
            description="Auto-generate vulnerability reports"
            enabled={vulnReporting}
            onToggle={setVulnReporting}
          />
          <FeatureToggle
            title="Remediation Advisor"
            description="Provide remediation recommendations"
            enabled={remediation}
            onToggle={setRemediation}
          />
          <FeatureToggle
            title="Continuous Testing"
            description="Run continuous security testing"
            enabled={continuousTesting}
            onToggle={setContinuousTesting}
          />
        </View>
      )}

      <AgentFeatures agentId="penetration-tester" agentName="Penetration Tester" />
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
  activeTab: { backgroundColor: '#F48FB1' },
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
  scanCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  scanHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  scanName: { fontSize: 16, fontWeight: '600', flex: 1 },
  scanStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  scanStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  scanType: { fontSize: 12, color: '#666', marginBottom: 8 },
  scanVulns: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  vulnBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  vulnText: { fontSize: 11, fontWeight: '600', color: '#fff' },
  noVulns: { fontSize: 12, color: '#34C759', fontStyle: 'italic' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
