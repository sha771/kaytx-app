import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { 
  Eye, Shield, Database, FileCheck, Users, Globe, Lock, CheckCircle,
  AlertTriangle, BarChart3, Activity, ChevronRight, Star, Calendar,
  FileText, Search, ShieldCheck, Clock, Filter, Download, Settings,
  MapPin, Globe2, Layers, Fingerprint, Key, ShieldAlert
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
    <Switch value={enabled} onValueChange={onToggle} trackColor={{ false: '#767577', true: '#AD1457' }} />
  </View>
);

export default function VPPrivacyEnterprisePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [piaAutomation, setPiaAutomation] = useState(true);
  const [consentManagement, setConsentManagement] = useState(true);
  const [dataDiscovery, setDataDiscovery] = useState(true);
  const [privacyReporting, setPrivacyReporting] = useState(true);

  const stats = [
    { label: 'PIAs Completed', value: '156', icon: FileCheck, color: '#34C759' },
    { label: 'Data Subjects', value: '2.4M', icon: Users, color: '#007AFF' },
    { label: 'Compliance', value: '97%', icon: ShieldCheck, color: '#AD1457' },
    { label: 'Consent Rate', value: '94%', icon: CheckCircle, color: '#34C759' },
  ];

  const metrics = [
    { title: 'Data Assets', value: '12,847', change: '+234', icon: Database, color: '#007AFF' },
    { title: 'PIA Queue', value: '12', change: '-3', icon: FileCheck, color: '#FF9500' },
    { title: 'DSR Pending', value: '8', change: '+2', icon: Clock, color: '#FF3B30' },
    { title: 'Privacy Score', value: '96/100', change: '+4', icon: Shield, color: '#34C759' },
  ];

  const subAgents = [
    { 
      title: 'AI Privacy Impact Assessor', 
      description: 'Automates Privacy Impact Assessments for all data processing activities',
      icon: FileCheck, 
      status: 'active',
      color: '#AD1457',
      route: '/ai-agent/security/sub-agents/privacy-impact-assessor'
    },
    { 
      title: 'AI Data Classification Enforcer', 
      description: 'Enforces data classification policies across enterprise systems',
      icon: Database, 
      status: 'active',
      color: '#C2185B',
      route: '/ai-agent/security/sub-agents/data-classification-enforcer'
    },
    { 
      title: 'AI Consent Manager', 
      description: 'Manages consent lifecycle and preferences across all channels',
      icon: CheckCircle, 
      status: 'active',
      color: '#D81B60',
      route: '/ai-agent/security/sub-agents/consent-manager'
    },
  ];

  const capabilities = [
    { name: 'PIA Automation', icon: FileCheck, enabled: true },
    { name: 'Data Mapping', icon: MapPin, enabled: true },
    { name: 'Consent Management', icon: CheckCircle, enabled: true },
    { name: 'DSR Handling', icon: Users, enabled: true },
    { name: 'Data Discovery', icon: Search, enabled: true },
    { name: 'Privacy by Design', icon: Shield, enabled: true },
    { name: 'Cross-Border', icon: Globe2, enabled: true },
    { name: 'Breach Response', icon: ShieldAlert, enabled: true },
  ];

  const piaQueue = [
    { id: 1, project: 'CRM Migration', type: 'System', priority: 'High', status: 'in-progress', owner: 'Data Team' },
    { id: 2, project: 'Analytics Platform', type: 'Processing', priority: 'Medium', status: 'review', owner: 'Privacy Team' },
    { id: 3, project: 'Mobile App Update', type: 'Collection', priority: 'Low', status: 'draft', owner: 'Product Team' },
    { id: 4, project: 'AI Training Data', type: 'AI/ML', priority: 'Critical', status: 'approved', owner: 'AI Team' },
  ];

  const dataSubjects = [
    { region: 'EU (GDPR)', count: '1,234,567', compliance: '98%' },
    { region: 'US (CCPA)', count: '987,234', compliance: '96%' },
    { region: 'UK', count: '234,567', compliance: '99%' },
    { region: 'APAC', count: '456,789', compliance: '94%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero Section */}
      <View style={[styles.hero, { backgroundColor: '#AD1457' + '12' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#AD1457' + '25' }]}>
          <Eye size={48} color="#AD1457" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Privacy</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Enterprise Privacy Management & Data Protection
        </Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C759' + '22' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AD1457' + '22' }]}>
            <Star size={12} color="#AD1457" />
            <Text style={[styles.badgeText, { color: '#AD1457' }]}>VP Level</Text>
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
        {['overview', 'sub-agents', 'pia', 'regions', 'settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.activeTab, { backgroundColor: '#AD1457' }]]}
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
                <View key={index} style={[styles.capabilityCard, { backgroundColor: cap.enabled ? '#AD1457' + '10' : '#F2F2F7' }]}>
                  <cap.icon size={20} color={cap.enabled ? '#AD1457' : '#999'} />
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
            AI agents reporting to VP Privacy
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

      {/* PIA Tab */}
      {activeTab === 'pia' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>PIA Queue</Text>
          {piaQueue.map((pia) => (
            <View key={pia.id} style={styles.piaCard}>
              <View style={styles.piaHeader}>
                <Text style={styles.piaTitle}>{pia.project}</Text>
                <View style={[styles.piaPriorityBadge, { backgroundColor: pia.priority === 'Critical' ? '#C62828' : pia.priority === 'High' ? '#FF3B30' : '#FF9500' + '20' }]}>
                  <Text style={[styles.piaPriorityText, { color: pia.priority === 'Critical' || pia.priority === 'High' ? '#fff' : pia.priority === 'High' ? '#FF3B30' : '#FF9500' }]}>{pia.priority}</Text>
                </View>
              </View>
              <View style={styles.piaMeta}>
                <Text style={styles.piaType}>Type: {pia.type}</Text>
                <Text style={styles.piaOwner}>Owner: {pia.owner}</Text>
              </View>
              <View style={styles.piaFooter}>
                <View style={[styles.piaStatusBadge, { backgroundColor: pia.status === 'approved' ? '#34C75920' : pia.status === 'in-progress' ? '#007AFF20' : '#FF950020' }]}>
                  <Text style={[styles.piaStatusText, { color: pia.status === 'approved' ? '#34C759' : pia.status === 'in-progress' ? '#007AFF' : '#FF9500' }]}>{pia.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Regions Tab */}
      {activeTab === 'regions' && (
        <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Data Subjects by Region</Text>
          {dataSubjects.map((region, index) => (
            <View key={index} style={styles.regionCard}>
              <View style={styles.regionHeader}>
                <View style={styles.regionIcon}>
                  <Globe size={18} color="#AD1457" />
                </View>
                <Text style={styles.regionName}>{region.region}</Text>
              </View>
              <View style={styles.regionStats}>
                <View style={styles.regionStat}>
                  <Text style={styles.regionStatValue}>{region.count}</Text>
                  <Text style={styles.regionStatLabel}>Data Subjects</Text>
                </View>
                <View style={styles.regionStat}>
                  <Text style={[styles.regionStatValue, { color: parseInt(region.compliance) >= 95 ? '#34C759' : '#FF9500' }]}>{region.compliance}</Text>
                  <Text style={styles.regionStatLabel}>Compliance</Text>
                </View>
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
            title="PIA Automation"
            description="Automatically assess privacy impact for new projects"
            enabled={piaAutomation}
            onToggle={setPiaAutomation}
          />
          <FeatureToggle
            title="Consent Management"
            description="Manage consent preferences across all channels"
            enabled={consentManagement}
            onToggle={setConsentManagement}
          />
          <FeatureToggle
            title="Data Discovery"
            description="Continuously discover and classify sensitive data"
            enabled={dataDiscovery}
            onToggle={setDataDiscovery}
          />
          <FeatureToggle
            title="Privacy Reporting"
            description="Generate automated privacy compliance reports"
            enabled={privacyReporting}
            onToggle={setPrivacyReporting}
          />
        </View>
      )}

      <AgentFeatures agentId="vp-privacy" agentName="VP Privacy" />
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
  activeTab: { backgroundColor: '#AD1457' },
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
  piaCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  piaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  piaTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  piaPriorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  piaPriorityText: { fontSize: 11, fontWeight: '700' },
  piaMeta: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  piaType: { fontSize: 12, color: '#666' },
  piaOwner: { fontSize: 12, color: '#666' },
  piaFooter: { flexDirection: 'row', justifyContent: 'flex-end' },
  piaStatusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  piaStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  regionCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  regionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  regionIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#AD145715', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  regionName: { fontSize: 16, fontWeight: '600' },
  regionStats: { flexDirection: 'row', gap: 24 },
  regionStat: { flex: 1 },
  regionStatValue: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  regionStatLabel: { fontSize: 12, color: '#666' },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12, color: '#666' },
});
