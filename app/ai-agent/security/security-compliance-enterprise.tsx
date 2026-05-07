import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  ShieldCheck, LayoutGrid, Search, Users, FileText, ChevronRight, Star, Activity,
  CheckCircle, BarChart3, Eye, Lock, Settings, Filter, Target, BookOpen,
  TrendingUp, AlertTriangle, Clipboard, Calendar, Shield, Award, Zap
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
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#F06292' }} />
  </View>
);

export default function SecurityComplianceEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [frameworkMapping, setFrameworkMapping] = useState(true);
  const [evidenceGathering, setEvidenceGathering] = useState(true);
  const [auditLiaison, setAuditLiaison] = useState(true);
  const [gapAnalysis, setGapAnalysis] = useState(true);

  const stats = [
    { label: 'Frameworks', value: '12', icon: LayoutGrid, color: '#F06292' },
    { label: 'Compliance', value: '94%', icon: CheckCircle, color: '#34C759' },
    { label: 'Controls', value: '456', icon: Shield, color: '#007AFF' },
    { label: 'Audits', value: '3', icon: Eye, color: '#FF9500' },
  ];

  const metrics = [
    { title: 'Control Score', value: '94%', change: '+2%', icon: Target, color: '#34C759' },
    { title: 'Gap Items', value: '23', change: '-5', icon: AlertTriangle, color: '#FF9500' },
    { title: 'Evidence', value: '1,234', change: '+89', icon: Clipboard, color: '#007AFF' },
    { title: 'Audit Ready', value: 'Yes', change: 'Current', icon: Award, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Framework Mapper', 
      description: 'Maps security controls across multiple compliance frameworks',
      icon: LayoutGrid, 
      status: 'active',
      color: '#F06292',
      route: '/ai-agent/security/sub-agents/framework-mapper'
    },
    { 
      title: 'AI Evidence Gatherer', 
      description: 'Automates collection of compliance evidence and artifacts',
      icon: Search, 
      status: 'active',
      color: '#F48FB1',
      route: '/ai-agent/security/sub-agents/evidence-gatherer'
    },
    { 
      title: 'AI Audit Liaison', 
      description: 'Coordinates audit activities and manages auditor communications',
      icon: Users, 
      status: 'active',
      color: '#F8BBD9',
      route: '/ai-agent/security/sub-agents/audit-liaison'
    },
  ];

  const capabilities = [
    { name: 'Framework Mapping', icon: LayoutGrid, enabled: true },
    { name: 'Evidence Collection', icon: Clipboard, enabled: true },
    { name: 'Gap Analysis', icon: Search, enabled: true },
    { name: 'Audit Support', icon: Users, enabled: true },
    { name: 'Policy Review', icon: FileText, enabled: true },
    { name: 'Control Testing', icon: CheckCircle, enabled: true },
    { name: 'Reporting', icon: BarChart3, enabled: true },
    { name: 'Remediation', icon: Zap, enabled: true },
  ];

  const frameworks = [
    { name: 'ISO 27001:2022', status: 'certified', progress: '100%', nextAudit: '2024-09-15' },
    { name: 'SOC 2 Type II', status: 'certified', progress: '100%', nextAudit: '2024-06-01' },
    { name: 'NIST CSF', status: 'implementing', progress: '87%', nextAudit: '2024-12-01' },
    { name: 'GDPR', status: 'compliant', progress: '98%', nextAudit: '2024-05-20' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#F06292' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#F06292' + '25' }]}>
          <ShieldCheck size={48} color="#F06292" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Security Compliance Specialist</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Compliance Management & Audit Readiness
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#F06292' + '22' }]}>
            <Star size={12} color="#F06292" />
            <Text style={[styles.badgeText, { color: '#F06292' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF9500' + '22' }]}>
            <ShieldCheck size={12} color="#FF9500" />
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
        {['overview', 'sub-agents', 'frameworks', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#F06292' }]]}
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
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance Metrics</Text>
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#F06292' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#F06292' : '#999'} />
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
            AI agents reporting to Security Compliance Specialist
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

      {/* Frameworks Tab */}
      {activeTab === 'frameworks' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Compliance Frameworks</Text>
          {frameworks.map((framework, index) => (
            <View key={index} style={styles.frameworkCard}>
              <View style={styles.frameworkHeader}>
                <View style={styles.frameworkIcon}>
                  <LayoutGrid size={20} color="#F06292" />
                </View>
                <View style={styles.frameworkInfo}>
                  <Text style={styles.frameworkName}>{framework.name}</Text>
                  <View style={styles.frameworkProgress}>
                    <View style={[styles.frameworkProgressBar, { width: framework.progress, backgroundColor: framework.status === 'certified' ? '#34C759' : '#F06292' }]} />
                  </View>
                </View>
                <View style={[styles.frameworkStatusBadge, { backgroundColor: framework.status === 'certified' ? '#34C75920' : '#F0629220' }]}>
                  <Text style={[styles.frameworkStatusText, { color: framework.status === 'certified' ? '#34C759' : '#F06292' }]}>{framework.status}</Text>
                </View>
              </View>
              <View style={styles.frameworkFooter}>
                <Text style={styles.frameworkMeta}>Progress: {framework.progress}</Text>
                <Text style={styles.frameworkMeta}>Next Audit: {framework.nextAudit}</Text>
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
            title="Framework Mapping"
            description="Auto-map controls to frameworks"
            enabled={frameworkMapping}
            onToggle={setFrameworkMapping}
          />
          <FeatureToggle
            title="Evidence Gathering"
            description="Auto-collect compliance evidence"
            enabled={evidenceGathering}
            onToggle={setEvidenceGathering}
          />
          <FeatureToggle
            title="Audit Liaison"
            description="Coordinate with auditors automatically"
            enabled={auditLiaison}
            onToggle={setAuditLiaison}
          />
          <FeatureToggle
            title="Gap Analysis"
            description="Continuous compliance gap analysis"
            enabled={gapAnalysis}
            onToggle={setGapAnalysis}
          />
        </View>
      )}

      <AgentFeatures agentId="security-compliance" agentName="Security Compliance Specialist" />
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
  activeTab: { backgroundColor: '#F06292' },
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
  frameworkCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  frameworkHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  frameworkIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#F0629215', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  frameworkInfo: { flex: 1 },
  frameworkName: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  frameworkProgress: { height: 6, backgroundColor: '#E5E5EA', borderRadius: 3 },
  frameworkProgressBar: { height: 6, borderRadius: 3 },
  frameworkStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  frameworkStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  frameworkFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  frameworkMeta: { fontSize: 12, color: '#666' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
