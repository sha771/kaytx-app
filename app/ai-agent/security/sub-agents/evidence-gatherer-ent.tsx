import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  FileSearch, FolderOpen, FileText, BarChart3, CheckCircle2,
  Search, Database, Cloud, Download, Eye
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function EvidenceGathererPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoGathering, setAutoGathering] = useState(true);
  const [cloudCollection, setCloudCollection] = useState(true);
  const [secureTransfer, setSecureTransfer] = useState(true);

  const stats = [
    { label: 'Evidence Items', value: '8,234', change: '+1,234', icon: FolderOpen, color: '#EF4444', trend: 'up' },
    { label: 'Requests Fulfilled', value: '456', change: '+89', icon: FileSearch, color: '#F59E0B', trend: 'up' },
    { label: 'Avg Collection Time', value: '4.2 min', change: '-1.5 min', icon: Clock, color: '#10B981', trend: 'down' },
    { label: 'Data Size', value: '1.2 TB', change: '+234 GB', icon: Database, color: '#3B82F6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Collection Rate', value: '99.5%', target: '98%', status: 'exceeding', icon: FolderOpen },
    { label: 'Accuracy', value: '98.9%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Fulfillment Rate', value: '99.2%', target: '95%', status: 'exceeding', icon: FileSearch },
    { label: 'Security Score', value: '100%', target: '95%', status: 'exceeding', icon: Shield },
  ];

  const evidenceRequests = [
    { id: 'REQ-2024-0892', type: 'Access Logs', requester: 'SOC 2 Audit', status: 'completed', date: '2024-03-15' },
    { id: 'REQ-2024-0891', type: 'Network Logs', requester: 'ISO Audit', status: 'in-progress', date: '2024-03-14' },
    { id: 'REQ-2024-0890', type: 'Firewall Logs', requester: 'PCI DSS Audit', status: 'pending', date: '2024-03-13' },
    { id: 'REQ-2024-0889', type: 'User Activity', requester: 'Internal Review', status: 'completed', date: '2024-03-12' },
  ];

  const capabilities = [
    'Evidence Collection', 'Log Aggregation', 'Cloud Data Collection', 'Secure Transfer',
    'Access Control', 'Data Preservation', 'Metadata Extraction', 'Chain of Custody',
    'Audit Support', 'Request Management', 'Automated Collection', 'Manual Collection',
    'Data Filtering', 'Format Conversion', 'Evidence Packaging'
  ];

  const responsibilities = [
    'Gather evidence required for compliance audits and assessments',
    'Collect logs and data from various security systems',
    'Retrieve cloud-based evidence from IaaS, SaaS platforms',
    'Ensure secure transfer and storage of evidence',
    'Maintain chain of custody documentation',
    'Extract metadata for evidence authentication',
    'Fulfill evidence requests from auditors and assessors',
    'Package evidence in forensically sound formats',
    'Filter and format evidence per audit requirements',
    'Preserve evidence integrity during collection',
    'Support manual evidence collection when needed',
    'Track evidence requests and fulfillment status',
    'Coordinate with security teams for evidence access',
    'Generate evidence collection reports',
    'Ensure evidence meets legal admissibility standards'
  ];

  const activities = [
    { action: 'Collected evidence', target: 'Access logs - 45 GB', time: '15 mins ago', icon: FolderOpen },
    { action: 'Fulfilled request', target: 'SOC 2 audit evidence', time: '1 hour ago', icon: FileSearch },
    { action: 'Transferred securely', target: 'Encrypted - 234 files', time: '2 hours ago', icon: Download },
    { action: 'Extracted metadata', target: 'Timestamp verification', time: '3 hours ago', icon: FileText },
    { action: 'Packaged evidence', target: 'Audit package ready', time: '5 hours ago', icon: FolderOpen },
    { action: 'Verified integrity', target: 'Hash validation passed', time: '1 day ago', icon: CheckCircle2 },
  ];

  const quickActions = [
    { label: 'New Request', icon: FileSearch, color: '#EF4444' },
    { label: 'Collect', icon: FolderOpen, color: '#F59E0B' },
    { label: 'View Evidence', icon: Eye, color: '#10B981' },
    { label: 'Transfer', icon: Download, color: '#3B82F6' },
    { label: 'Search', icon: Search, color: '#8B5CF6' },
    { label: 'Reports', icon: BarChart3, color: '#EC4899' },
    { label: 'Cloud', icon: Cloud, color: '#6366F1' },
    { label: 'Status', icon: Database, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <FileSearch size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Evidence Gatherer</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Compliance evidence collection and audit support specialist
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
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/security-compliance-specialist-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#EF444415' }]}>
          <Settings size={24} color="#EF4444" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Security Compliance Specialist</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'requests', 'capabilities', 'settings'].map((tab) => (
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
          The AI Evidence Gatherer automates collection of compliance evidence from multiple sources, 
          fulfills audit requests, and ensures evidence integrity through secure transfer and chain of custody.
        </Text>
      </View>
      </>)}

      {activeTab === 'requests' && (<>
      {/* Evidence Requests */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Evidence Requests</Text>
        {evidenceRequests.map((req, index) => (
          <View key={index} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={[styles.requestIcon, { backgroundColor: '#EF444415' }]}>
                <FileSearch size={20} color="#EF4444" />
              </View>
              <View style={styles.requestInfo}>
                <Text style={[styles.requestId, { color: colors.text }]}>{req.id}</Text>
                <Text style={[styles.requestType, { color: colors.textSecondary }]}>{req.type}</Text>
              </View>
              <View style={[styles.statusBadge2, { backgroundColor: req.status === 'completed' ? '#34C75915' : req.status === 'in-progress' ? '#F59E0B15' : '#3B82F615' }]}>
                <Text style={[styles.statusText2, { color: req.status === 'completed' ? '#34C759' : req.status === 'in-progress' ? '#F59E0B' : '#3B82F6' }]}>{req.status}</Text>
              </View>
            </View>
            <View style={styles.requestMeta}>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>Requester: {req.requester}</Text>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>{req.date}</Text>
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
          { endpoint: '/consult/evidence-gatherer', desc: 'Consult on evidence gathering' },
          { endpoint: '/evidence-gatherer/collect', desc: 'Collect evidence from source' },
          { endpoint: '/evidence-gatherer/fulfill', desc: 'Fulfill evidence request' },
          { endpoint: '/evidence-gatherer/transfer', desc: 'Secure evidence transfer' },
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
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Gathering</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically collect evidence</Text>
            </View>
            <Switch value={autoGathering} onValueChange={setAutoGathering} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Cloud Collection</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Collect from cloud platforms</Text>
            </View>
            <Switch value={cloudCollection} onValueChange={setCloudCollection} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Secure Transfer</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Encrypt evidence transfers</Text>
            </View>
            <Switch value={secureTransfer} onValueChange={setSecureTransfer} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="evidence-gatherer" agentName="AI Evidence Gatherer" />

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
  requestCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  requestHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  requestIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  requestInfo: { flex: 1 },
  requestId: { fontSize: 14, fontWeight: '600' },
  requestType: { fontSize: 12, marginTop: 2 },
  statusBadge2: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText2: { fontSize: 12, fontWeight: '600' },
  requestMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { fontSize: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityAction: { fontSize: 13, fontWeight: '500' },
  activityTarget: { fontSize: 12, marginTop: 2 },
  activityTime: { fontSize: 11 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, gap: 8, flex: 1, minWidth: '45%' },
  actionText: { fontSize: 13, fontWeight: '500' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 10 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
  responsibilityText: { flex: 1, fontSize: 13, lineHeight: 18 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  endpointInfo: { flex: 1 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  featureToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  featureToggleInfo: { flex: 1, paddingRight: 16 },
  featureToggleTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  featureToggleDesc: { fontSize: 12 },
});
