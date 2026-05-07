import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  FolderOpen, FileText, Database, Search, Lock, Eye,
  HardDrive, Cloud, Archive, CheckCircle2, BarChart3
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function EvidenceCollectorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoCollection, setAutoCollection] = useState(true);
  const [chainOfCustody, setChainOfCustody] = useState(true);
  const [encryption, setEncryption] = useState(true);

  const stats = [
    { label: 'Evidence Items', value: '3,456', change: '+234', icon: FolderOpen, color: '#EF4444', trend: 'up' },
    { label: 'Cases', value: '89', change: '+12', icon: Database, color: '#F59E0B', trend: 'up' },
    { label: 'Storage Used', value: '245 GB', change: '+32 GB', icon: HardDrive, color: '#10B981', trend: 'up' },
    { label: 'Integrity Checks', value: '100%', change: '+0%', icon: Lock, color: '#3B82F6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Collection Rate', value: '99.5%', target: '98%', status: 'exceeding', icon: FolderOpen },
    { label: 'Chain Integrity', value: '100%', target: '100%', status: 'exceeding', icon: Lock },
    { label: 'Evidence Preservation', value: '98.9%', target: '95%', status: 'exceeding', icon: Archive },
    { label: 'Retrieval Time', value: '2.3s', target: '5s', status: 'exceeding', icon: Search },
  ];

  const evidenceItems = [
    { id: 'EV-2024-0892', type: 'Memory Dump', size: '4.2 GB', source: 'Server-01', collected: '2 hours ago', status: 'preserved' },
    { id: 'EV-2024-0891', type: 'Network Logs', size: '12.5 GB', source: 'Firewall', collected: '4 hours ago', status: 'analyzing' },
    { id: 'EV-2024-0890', type: 'Disk Image', size: '500 GB', source: 'Workstation-12', collected: '1 day ago', status: 'preserved' },
    { id: 'EV-2024-0889', type: 'Email Archive', size: '2.1 GB', source: 'Exchange', collected: '2 days ago', status: 'reviewed' },
  ];

  const capabilities = [
    'Forensic Imaging', 'Memory Acquisition', 'Network Packet Capture', 'Log Collection',
    'Chain of Custody', 'Evidence Preservation', 'Hash Verification', 'Metadata Extraction',
    'File Carving', 'Timestamp Analysis', 'Encryption Handling', 'Cloud Collection',
    'Mobile Device Collection', 'Database Forensics', 'Browser Artifact Recovery'
  ];

  const responsibilities = [
    'Collect digital evidence from various sources in a forensically sound manner',
    'Create forensic images of disks and memory for analysis',
    'Capture network packets and traffic logs for network investigations',
    'Maintain chain of custody documentation for all evidence',
    'Verify evidence integrity through cryptographic hashing',
    'Preserve evidence in tamper-proof storage systems',
    'Extract metadata from files for timeline analysis',
    'Perform file carving to recover deleted artifacts',
    'Analyze timestamps to establish event chronology',
    'Handle encrypted evidence with proper decryption procedures',
    'Collect evidence from cloud-based services and platforms',
    'Acquire forensic images from mobile devices',
    'Extract browser history, cookies, and cache artifacts',
    'Collect database logs and transaction records',
    'Ensure evidence meets legal and regulatory requirements'
  ];

  const activities = [
    { action: 'Collected evidence', target: 'Memory dump - Server-01', time: '30 mins ago', icon: FolderOpen },
    { action: 'Verified integrity', target: 'Hash verification passed', time: '1 hour ago', icon: Lock },
    { action: 'Preserved evidence', target: 'Chain of custody updated', time: '2 hours ago', icon: Archive },
    { action: 'Extracted artifacts', target: 'Browser history - 234 items', time: '3 hours ago', icon: Search },
    { action: 'Created image', target: 'Disk image - 500 GB', time: '5 hours ago', icon: HardDrive },
    { action: 'Analyzed metadata', target: 'File timestamps validated', time: '1 day ago', icon: FileText },
  ];

  const quickActions = [
    { label: 'New Collection', icon: FolderOpen, color: '#EF4444' },
    { label: 'View Evidence', icon: Eye, color: '#F59E0B' },
    { label: 'Verify Hash', icon: Lock, color: '#10B981' },
    { label: 'Chain Status', icon: Archive, color: '#3B82F6' },
    { label: 'Search', icon: Search, color: '#8B5CF6' },
    { label: 'Reports', icon: BarChart3, color: '#EC4899' },
    { label: 'Storage', icon: HardDrive, color: '#6366F1' },
    { label: 'Cloud', icon: Cloud, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <FolderOpen size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Evidence Collector</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Digital forensic evidence collection and preservation specialist
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
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/incident-responder-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#EF444415' }]}>
          <Settings size={24} color="#EF4444" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Incident Responder</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'evidence', 'capabilities', 'settings'].map((tab) => (
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
          The AI Evidence Collector automates digital forensic evidence collection from multiple sources, 
          maintains chain of custody, and ensures evidence integrity through cryptographic verification.
        </Text>
      </View>
      </>)}

      {activeTab === 'evidence' && (<>
      {/* Evidence Items */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Evidence Items</Text>
        {evidenceItems.map((item, index) => (
          <View key={index} style={styles.evidenceCard}>
            <View style={styles.evidenceHeader}>
              <View style={[styles.evidenceIcon, { backgroundColor: '#EF444415' }]}>
                <FolderOpen size={20} color="#EF4444" />
              </View>
              <View style={styles.evidenceInfo}>
                <Text style={[styles.evidenceId, { color: colors.text }]}>{item.id}</Text>
                <Text style={[styles.evidenceType, { color: colors.textSecondary }]}>{item.type}</Text>
              </View>
              <View style={[styles.statusBadge2, { backgroundColor: item.status === 'preserved' ? '#34C75915' : item.status === 'analyzing' ? '#F59E0B15' : '#3B82F615' }]}>
                <Text style={[styles.statusText2, { color: item.status === 'preserved' ? '#34C759' : item.status === 'analyzing' ? '#F59E0B' : '#3B82F6' }]}>{item.status}</Text>
              </View>
            </View>
            <View style={styles.evidenceMeta}>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>Size: {item.size}</Text>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>Source: {item.source}</Text>
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>{item.collected}</Text>
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
          { endpoint: '/consult/evidence-collector', desc: 'Consult on evidence collection' },
          { endpoint: '/evidence-collector/collect', desc: 'Collect evidence from source' },
          { endpoint: '/evidence-collector/verify', desc: 'Verify evidence integrity' },
          { endpoint: '/evidence-collector/preserve', desc: 'Preserve evidence securely' },
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
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Collection</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically collect evidence</Text>
            </View>
            <Switch value={autoCollection} onValueChange={setAutoCollection} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Chain of Custody</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Track evidence custody</Text>
            </View>
            <Switch value={chainOfCustody} onValueChange={setChainOfCustody} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Encryption</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Encrypt stored evidence</Text>
            </View>
            <Switch value={encryption} onValueChange={setEncryption} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="evidence-collector" agentName="AI Evidence Collector" />

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
  evidenceCard: { padding: 16, borderRadius: 12, backgroundColor: '#fff', marginBottom: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  evidenceHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  evidenceIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  evidenceInfo: { flex: 1 },
  evidenceId: { fontSize: 14, fontWeight: '600' },
  evidenceType: { fontSize: 12, marginTop: 2 },
  statusBadge2: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText2: { fontSize: 12, fontWeight: '600' },
  evidenceMeta: { flexDirection: 'row', justifyContent: 'space-between' },
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
