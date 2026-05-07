import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Scale, Shield, ClipboardList, FileText, Gauge, TrendingUp, Activity, AlertTriangle,
  CheckCircle, Clock, BarChart3, ChevronRight, Users, Star, Lock, Eye,
  BookOpen, Gavel, Target, TrendingDown, PieChart, AlertOctagon, Calendar,
  Settings, Filter, Download, Share2, ShieldCheck
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
    <Text style={[styles.metricChange, { color: change.startsWith('+') || change.startsWith('-') ? '#34C759' : '#FF3B30' }]}>{change}</Text>
  </View>
);

const FeatureToggle = ({ title, description, enabled, onToggle }: any) => (
  <View style={styles.featureToggle}>
    <View style={styles.featureToggleInfo}>
      <Text style={styles.featureToggleTitle}>{title}</Text>
      <Text style={styles.featureToggleDesc}>{description}</Text>
    </View>
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#B71C1C' }} />
  </View>
);

export default function VPGovernanceRiskEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [riskMonitoring, setRiskMonitoring] = useState(true);
  const [policyEnforcement, setPolicyEnforcement] = useState(true);
  const [complianceTracking, setComplianceTracking] = useState(true);
  const [riskReporting, setRiskReporting] = useState(true);

  const stats = [
    { label: 'Risk Items', value: '1,247', icon: ClipboardList, color: '#B71C1C' },
    { label: 'Policies', value: '89', icon: FileText, color: '#34C759' },
    { label: 'Compliance', value: '94%', icon: CheckCircle, color: '#007AFF' },
    { label: 'Open Risks', value: '23', icon: AlertTriangle, color: '#FF9500' },
  ];

  const metrics = [
    { title: 'Risk Score', value: '72/100', change: '-5%', icon: Gauge, color: '#FF9500' },
    { title: 'Policy Coverage', value: '98.2%', change: '+1%', icon: ShieldCheck, color: '#34C759' },
    { title: 'Risk Velocity', value: 'Low', change: 'Stable', icon: TrendingUp, color: '#007AFF' },
    { title: 'Control Gaps', value: '12', change: '-3', icon: AlertOctagon, color: '#FF3B30' },
  ];

  const subAgents = [
    { 
      title: 'AI Risk Register Manager', 
      description: 'Maintains enterprise risk register with automated risk tracking',
      icon: ClipboardList, 
      status: 'active',
      color: '#B71C1C',
      route: '/ai-agent/security/sub-agents/risk-register-manager'
    },
    { 
      title: 'AI Policy Drafter', 
      description: 'Drafts and maintains security policies and procedures',
      icon: FileText, 
      status: 'active',
      color: '#C62828',
      route: '/ai-agent/security/sub-agents/policy-drafter'
    },
    { 
      title: 'AI Risk Appetite Monitor', 
      description: 'Monitors organizational risk appetite and tolerance thresholds',
      icon: Gauge, 
      status: 'active',
      color: '#D32F2F',
      route: '/ai-agent/security/sub-agents/risk-appetite-monitor'
    },
  ];

  const capabilities = [
    { name: 'Risk Assessment', icon: ClipboardList, enabled: true },
    { name: 'Policy Management', icon: FileText, enabled: true },
    { name: 'Compliance Tracking', icon: CheckCircle, enabled: true },
    { name: 'Control Framework', icon: Shield, enabled: true },
    { name: 'Risk Reporting', icon: BarChart3, enabled: true },
    { name: 'Audit Management', icon: Eye, enabled: true },
    { name: 'Regulatory Mapping', icon: BookOpen, enabled: true },
    { name: 'Risk Analytics', icon: PieChart, enabled: true },
  ];

  const riskRegister = [
    { id: 1, risk: 'Data Breach', category: 'Cyber', probability: 'Medium', impact: 'Critical', status: 'mitigated', owner: 'CISO' },
    { id: 2, risk: 'Vendor Failure', category: 'Operational', probability: 'Low', impact: 'High', status: 'accepted', owner: 'COO' },
    { id: 3, risk: 'Compliance Violation', category: 'Legal', probability: 'Low', impact: 'High', status: 'mitigating', owner: 'CLO' },
    { id: 4, risk: 'Cloud Outage', category: 'Technical', probability: 'Medium', impact: 'Medium', status: 'transferred', owner: 'CTO' },
  ];

  const policies = [
    { name: 'Information Security Policy', version: '3.2', status: 'active', lastReview: '2024-01-15', compliance: '98%' },
    { name: 'Data Classification Policy', version: '2.1', status: 'active', lastReview: '2024-02-01', compliance: '95%' },
    { name: 'Access Control Policy', version: '4.0', status: 'review', lastReview: '2023-11-20', compliance: '92%' },
    { name: 'Incident Response Policy', version: '2.5', status: 'active', lastReview: '2024-03-01', compliance: '100%' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'mitigated':
      case 'active':
      case '100%': return '#34C759';
      case 'accepted':
      case 'transferred': return '#FF9500';
      case 'mitigating':
      case 'review': return '#007AFF';
      default: return '#666';
    }
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
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
      <View style={[styles.hero, { backgroundColor: '#B71C1C' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#B71C1C' + '25' }]}>
          <Scale size={48} color="#B71C1C" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Governance & Risk</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Enterprise Risk Management & Policy Governance
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#B71C1C' + '22' }]}>
            <Star size={12} color="#B71C1C" />
            <Text style={[styles.badgeText, { color: '#B71C1C' }]}>VP Level</Text>
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
        {['overview', 'sub-agents', 'risks', 'policies', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#B71C1C' }]]}
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#B71C1C' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#B71C1C' : '#999'} />
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
            AI agents reporting to VP Governance & Risk
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

      {/* Risks Tab */}
      {activeTab === 'risks' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Risk Register</Text>
          {riskRegister.map((risk) => (
            <View key={risk.id} style={styles.riskCard}>
              <View style={styles.riskHeader}>
                <Text style={styles.riskTitle}>{risk.risk}</Text>
                <View style={[styles.riskStatusBadge, { backgroundColor: getStatusColor(risk.status) + '20' }]}>
                  <Text style={[styles.riskStatusText, { color: getStatusColor(risk.status) }]}>{risk.status}</Text>
                </View>
              </View>
              <View style={styles.riskMeta}>
                <Text style={styles.riskCategory}>Category: {risk.category}</Text>
                <Text style={styles.riskOwner}>Owner: {risk.owner}</Text>
              </View>
              <View style={styles.riskRatings}>
                <View style={styles.riskRating}>
                  <Text style={styles.ratingLabel}>Probability</Text>
                  <Text style={[styles.ratingValue, { color: getImpactColor(risk.probability) }]}>{risk.probability}</Text>
                </View>
                <View style={styles.riskRating}>
                  <Text style={styles.ratingLabel}>Impact</Text>
                  <Text style={[styles.ratingValue, { color: getImpactColor(risk.impact) }]}>{risk.impact}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Policies Tab */}
      {activeTab === 'policies' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Security Policies</Text>
          {policies.map((policy, index) => (
            <View key={index} style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <View style={styles.policyIcon}>
                  <FileText size={20} color="#B71C1C" />
                </View>
                <View style={styles.policyInfo}>
                  <Text style={styles.policyName}>{policy.name}</Text>
                  <Text style={styles.policyVersion}>Version {policy.version}</Text>
                </View>
                <View style={[styles.policyStatusBadge, { backgroundColor: getStatusColor(policy.status) + '20' }]}>
                  <Text style={[styles.policyStatusText, { color: getStatusColor(policy.status) }]}>{policy.status}</Text>
                </View>
              </View>
              <View style={styles.policyFooter}>
                <Text style={styles.policyMeta}>Last Review: {policy.lastReview}</Text>
                <Text style={[styles.policyCompliance, { color: getStatusColor(policy.compliance) }]}>
                  Compliance: {policy.compliance}
                </Text>
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
            title="Continuous Risk Monitoring"
            description="Monitor risks in real-time with automated alerts"
            enabled={riskMonitoring}
            onToggle={setRiskMonitoring}
          />
          <FeatureToggle
            title="Policy Enforcement"
            description="Automatically enforce security policies"
            enabled={policyEnforcement}
            onToggle={setPolicyEnforcement}
          />
          <FeatureToggle
            title="Compliance Tracking"
            description="Track compliance status across all frameworks"
            enabled={complianceTracking}
            onToggle={setComplianceTracking}
          />
          <FeatureToggle
            title="Risk Reporting"
            description="Generate automated risk reports for stakeholders"
            enabled={riskReporting}
            onToggle={setRiskReporting}
          />
        </View>
      )}

      <AgentFeatures agentId="vp-governance-risk" agentName="VP Governance & Risk" />
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
  activeTab: { backgroundColor: '#B71C1C' },
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
  riskCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  riskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  riskTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  riskStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  riskStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  riskMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  riskCategory: { fontSize: 12, color: '#666' },
  riskOwner: { fontSize: 12, color: '#666' },
  riskRatings: { flexDirection: 'row', gap: 24 },
  riskRating: { alignItems: 'center' },
  ratingLabel: { fontSize: 11, color: '#999', marginBottom: 4 },
  ratingValue: { fontSize: 13, fontWeight: '600' },
  policyCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  policyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  policyIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#B71C1C15', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  policyInfo: { flex: 1 },
  policyName: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  policyVersion: { fontSize: 12, color: '#666' },
  policyStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  policyStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  policyFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  policyMeta: { fontSize: 12, color: '#999' },
  policyCompliance: { fontSize: 12, fontWeight: '600' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
