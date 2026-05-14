import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Shield, ShieldAlert, Globe, Target, TrendingUp, Activity, Zap,
  Eye, Lock, Server, Network, FileWarning, BarChart3, ChevronRight, Users, Star,
  CheckCircle, Clock, Search, Radar, Crosshair, Radio, Play, Pause,
  Settings, Filter, Download, Share2, Cpu
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
    <Text style={[styles.metricChange, { color: change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{change}</Text>
  </View>
);

const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#D32F2F' }} />
  </View>
);

export default function VPCybersecurityEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [threatIntel, setThreatIntel] = useState(true);
  const [behavioralAnalytics, setBehavioralAnalytics] = useState(true);
  const [zeroTrust, setZeroTrust] = useState(true);
  const [autoContainment, setAutoContainment] = useState(true);

  const stats = [
    { label: 'Threats Detected', value: '12,847', icon: Radar, color: '#D32F2F' },
    { label: 'Blocked Attacks', value: '9,231', icon: Shield, color: '#34C759' },
    { label: 'Intel Sources', value: '48', icon: Globe, color: '#007AFF' },
    { label: 'Coverage', value: '99.9%', icon: Target, color: '#AF52DE' },
  ];

  const metrics = [
    { title: 'Active Threats', value: '23', change: '-15%', icon: AlertTriangle, color: '#FF3B30' },
    { title: 'Risk Score', value: '23/100', change: '-8%', icon: ShieldAlert, color: '#FF9500' },
    { title: 'Intel Updates', value: '156', change: '+12%', icon: Globe, color: '#007AFF' },
    { title: 'Architecture Reviews', value: '8', change: '+2', icon: Server, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Threat Landscape Monitor', 
      description: 'Continuously monitors global threat landscape and emerging attack vectors',
      icon: Globe, 
      status: 'active',
      color: '#D32F2F',
      route: '/ai-agent/security/sub-agents/threat-landscape-monitor'
    },
    { 
      title: 'AI Cyber Risk Quantifier', 
      description: 'Quantifies cyber risks in financial terms for executive reporting',
      icon: BarChart3, 
      status: 'active',
      color: '#C62828',
      route: '/ai-agent/security/sub-agents/cyber-risk-quantifier'
    },
    { 
      title: 'AI Security Architecture Reviewer', 
      description: 'Reviews and validates security architecture designs and implementations',
      icon: Server, 
      status: 'active',
      color: '#B71C1C',
      route: '/ai-agent/security/sub-agents/security-architecture-reviewer'
    },
  ];

  const capabilities = [
    { name: 'Threat Intelligence', icon: Globe, enabled: true },
    { name: 'Risk Quantification', icon: BarChart3, enabled: true },
    { name: 'Architecture Review', icon: Server, enabled: true },
    { name: 'Attack Surface Mgmt', icon: Radar, enabled: true },
    { name: 'Zero Trust', icon: Lock, enabled: true },
    { name: 'Breach Simulation', icon: Crosshair, enabled: true },
    { name: 'Dark Web Monitoring', icon: Eye, enabled: true },
    { name: 'Threat Hunting', icon: Search, enabled: true },
  ];

  const threatIntelFeeds = [
    { name: 'Commercial Intel Providers', count: 12, status: 'active', lastUpdate: '2 min ago' },
    { name: 'Government CERTs', count: 8, status: 'active', lastUpdate: '5 min ago' },
    { name: 'Industry Sharing Groups', count: 6, status: 'active', lastUpdate: '12 min ago' },
    { name: 'Open Source Intel', count: 22, status: 'active', lastUpdate: '1 min ago' },
  ];

  const recentThreats = [
    { id: 1, type: 'APT', name: 'APT29 - Cozy Bear', severity: 'critical', status: 'monitoring', discovered: '2 days ago' },
    { id: 2, type: 'Ransomware', name: 'LockBit 3.0 Variant', severity: 'high', status: 'blocked', discovered: '5 hours ago' },
    { id: 3, type: 'Zero-Day', name: 'CVE-2024-XXXX', severity: 'critical', status: 'patched', discovered: '12 hours ago' },
    { id: 4, type: 'Phishing', name: 'QR Code Campaign', severity: 'medium', status: 'mitigated', discovered: '1 day ago' },
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
      <View style={[styles.hero, { backgroundColor: '#D32F2F' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#D32F2F' + '25' }]}>
          <ShieldAlert size={48} color="#D32F2F" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Cybersecurity</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Enterprise Cybersecurity Strategy & Threat Intelligence
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#D32F2F' + '22' }]}>
            <Star size={12} color="#D32F2F" />
            <Text style={[styles.badgeText, { color: '#D32F2F' }]}>VP Level</Text>
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
        {['overview', 'sub-agents', 'threats', 'intel', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#D32F2F' }]]}
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Metrics</Text>
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#D32F2F' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#D32F2F' : '#999'} />
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
            AI agents reporting to VP Cybersecurity
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

      {/* Threats Tab */}
      {activeTab === 'threats' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Threats</Text>
          {recentThreats.map((threat) => (
            <View key={threat.id} style={[styles.threatCard, { borderLeftColor: getSeverityColor(threat.severity) }]}>
              <View style={styles.threatHeader}>
                <View style={[styles.threatTypeBadge, { backgroundColor: getSeverityColor(threat.severity) + '20' }]}>
                  <Text style={[styles.threatTypeText, { color: getSeverityColor(threat.severity) }]}>{threat.type}</Text>
                </View>
                <View style={[styles.threatStatusBadge, { backgroundColor: threat.status === 'blocked' ? '#34C75920' : '#FF950020' }]}>
                  <Text style={[styles.threatStatusText, { color: threat.status === 'blocked' ? '#34C759' : '#FF9500' }]}>{threat.status}</Text>
                </View>
              </View>
              <Text style={styles.threatName}>{threat.name}</Text>
              <View style={styles.threatFooter}>
                <Text style={styles.threatMeta}>Severity: <Text style={{ color: getSeverityColor(threat.severity), fontWeight: '600' }}>{threat.severity}</Text></Text>
                <Text style={styles.threatMeta}>Discovered: {threat.discovered}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Intel Tab */}
      {activeTab === 'intel' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Threat Intelligence Feeds</Text>
          {threatIntelFeeds.map((feed, index) => (
            <View key={index} style={styles.feedCard}>
              <View style={styles.feedHeader}>
                <View style={[styles.feedIcon, { backgroundColor: '#007AFF15' }]}>
                  <Globe size={18} color="#007AFF" />
                </View>
                <View style={styles.feedInfo}>
                  <Text style={styles.feedName}>{feed.name}</Text>
                  <Text style={styles.feedMeta}>{feed.count} sources connected</Text>
                </View>
                <View style={[styles.feedStatusBadge, { backgroundColor: '#34C75920' }]}>
                  <Text style={[styles.feedStatusText, { color: '#34C759' }]}>{feed.status}</Text>
                </View>
              </View>
              <Text style={styles.feedUpdate}>Last update: {feed.lastUpdate}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Configuration</Text>
          <FeatureToggle
            title="Threat Intelligence Integration"
            description="Integrate multiple threat intelligence feeds"
            enabled={threatIntel}
            onToggle={setThreatIntel}
          />
          <FeatureToggle
            title="Behavioral Analytics"
            description="Enable AI-powered behavioral analysis"
            enabled={behavioralAnalytics}
            onToggle={setBehavioralAnalytics}
          />
          <FeatureToggle
            title="Zero Trust Enforcement"
            description="Enforce zero trust principles across infrastructure"
            enabled={zeroTrust}
            onToggle={setZeroTrust}
          />
          <FeatureToggle
            title="Auto-Containment"
            description="Automatically contain detected threats"
            enabled={autoContainment}
            onToggle={setAutoContainment}
          />
        </View>
      )}

      <AgentFeatures agentId="vp-cybersecurity" agentName="VP Cybersecurity" />
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
  activeTab: { backgroundColor: '#D32F2F' },
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
  threatCard: { padding: 16, borderRadius: 12, borderLeftWidth: 4, backgroundColor: '#fff', marginBottom: 12 },
  threatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  threatTypeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  threatTypeText: { fontSize: 11, fontWeight: '700' },
  threatStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  threatStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  threatName: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  threatFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  threatMeta: { fontSize: 12, color: '#666' },
  feedCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  feedHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  feedIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  feedInfo: { flex: 1 },
  feedName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  feedMeta: { fontSize: 12, color: '#666' },
  feedStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  feedStatusText: { fontSize: 11, fontWeight: '600' },
  feedUpdate: { fontSize: 12, color: '#999' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
