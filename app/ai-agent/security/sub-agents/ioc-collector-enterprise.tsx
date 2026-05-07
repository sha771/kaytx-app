import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  Search, Database, Bug, AlertTriangle, FileText, BarChart3,
  Network, Eye, Filter, Hash, Globe, Link2
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function IocCollectorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoCollection, setAutoCollection] = useState(true);
  const [threatIntel, setThreatIntel] = useState(true);
  const [enrichment, setEnrichment] = useState(true);

  const stats = [
    { label: 'IoCs Collected', value: '45.2K', change: '+8.3K', icon: Database, color: '#EF4444', trend: 'up' },
    { label: 'Unique Indicators', value: '12.4K', change: '+2.1K', icon: Hash, color: '#F59E0B', trend: 'up' },
    { label: 'Threat Feeds', value: '34', change: '+4', icon: Globe, color: '#10B981', trend: 'up' },
    { label: 'Coverage', value: '98.5%', change: '+1.2%', icon: Shield, color: '#3B82F6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Collection Rate', value: '99.2%', target: '98%', status: 'exceeding', icon: Database },
    { label: 'IOC Accuracy', value: '97.8%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Enrichment Rate', value: '94.5%', target: '90%', status: 'exceeding', icon: FileText },
    { label: 'False Positive Rate', value: '2.1%', target: '5%', status: 'exceeding', icon: Filter },
  ];

  const iocTypes = [
    { type: 'IP Addresses', count: '12,456', icon: Globe, color: '#EF4444' },
    { type: 'Domains', count: '8,234', icon: Network, color: '#F59E0B' },
    { type: 'Hashes', count: '15,892', icon: Hash, color: '#10B981' },
    { type: 'URLs', count: '6,234', icon: Link2, color: '#3B82F6' },
    { type: 'Email Addresses', count: '2,345', icon: AlertTriangle, color: '#8B5CF6' },
  ];

  const recentIocs = [
    { indicator: '192.168.1.100', type: 'IP', source: 'Firewall', confidence: 'High', time: '5 min ago' },
    { indicator: 'malware-domain.com', type: 'Domain', source: 'Sandbox', confidence: 'Critical', time: '15 min ago' },
    { indicator: 'a1b2c3d4e5f6...', type: 'Hash', source: 'EDR', confidence: 'High', time: '30 min ago' },
    { indicator: 'phishing-site.net', type: 'URL', source: 'Email Gateway', confidence: 'Medium', time: '1 hour ago' },
  ];

  const capabilities = [
    'IOC Extraction', 'Threat Intelligence Integration', 'Automatic Enrichment', 'Historical Analysis',
    'Pattern Detection', 'Confidence Scoring', 'Deduplication', 'Context Correlation',
    'Feed Aggregation', 'Real-time Updates', 'Export Capabilities', 'API Integration',
    'YARA Matching', 'STIX Support', 'Taxii Integration'
  ];

  const responsibilities = [
    'Collect indicators of compromise from multiple security sources',
    'Integrate with threat intelligence feeds for up-to-date IOC data',
    'Extract and normalize IOCs from emails, files, and network traffic',
    'Enrich IOCs with additional context from external sources',
    'Maintain historical IOC database for trend analysis',
    'Identify patterns and relationships between different indicators',
    'Assign confidence scores based on source reliability',
    'Remove duplicate entries to maintain data quality',
    'Correlate IOCs with existing security events',
    'Export IOCs in standard formats (STIX, CSV, JSON)',
    'Support API integration with security tools',
    'Provide real-time IOC updates to detection systems',
    'Match IOCs against YARA rules and signatures',
    'Support TAXII protocol for threat intelligence sharing',
    'Track IOC lifecycle from collection to retirement'
  ];

  const activities = [
    { action: 'Collected IOCs', target: '234 indicators from firewall', time: '10 mins ago', icon: Database },
    { action: 'Enriched indicators', target: 'IP reputation data', time: '25 mins ago', icon: FileText },
    { action: 'Detected pattern', target: 'New attack campaign', time: '1 hour ago', icon: AlertTriangle },
    { action: 'Updated feeds', target: 'Threat intel sources', time: '2 hours ago', icon: Globe },
    { action: 'Exported IOCs', target: 'STIX format - 1,234 items', time: '3 hours ago', icon: BarChart3 },
    { action: 'Matched rules', target: 'YARA rules - 45 hits', time: '5 hours ago', icon: Search },
  ];

  const quickActions = [
    { label: 'View IOCs', icon: Database, color: '#EF4444' },
    { label: 'Add Source', icon: Globe, color: '#F59E0B' },
    { label: 'Enrich Data', icon: FileText, color: '#10B981' },
    { label: 'Export', icon: BarChart3, color: '#3B82F6' },
    { label: 'Search', icon: Search, color: '#8B5CF6' },
    { label: 'Patterns', icon: Network, color: '#EC4899' },
    { label: 'Feeds', icon: Globe, color: '#6366F1' },
    { label: 'Reports', icon: FileText, color: '#F59E0B' },
  ];

  const CheckCircle2 = ({ size, color }: { size: number; color: string }) => (
    <View style={{ width: size, height: size, borderRadius: size/2, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff', fontSize: size * 0.6, fontWeight: 'bold' }}>✓</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <Search size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI IoC Collector</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Indicator of compromise collection and enrichment specialist
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
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/security/security-analyst-enterprise')}>
        <View style={[styles.parentIcon, { backgroundColor: '#EF444415' }]}>
          <Settings size={24} color="#EF4444" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Security Analyst</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      <View style={styles.tabContainer}>
        {['overview', 'iocs', 'capabilities', 'settings'].map((tab) => (
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
          The AI IoC Collector automatically gathers indicators of compromise from multiple security sources, 
          enriches them with threat intelligence, and maintains a comprehensive IOC database for detection 
          and response operations.
        </Text>
      </View>
      </>)}

      {activeTab === 'iocs' && (<>
      {/* IOC Types */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>IOC Types</Text>
        <View style={styles.iocTypesGrid}>
          {iocTypes.map((ioc, index) => (
            <View key={index} style={[styles.iocTypeCard, { backgroundColor: ioc.color + '10' }]}>
              <ioc.icon size={24} color={ioc.color} />
              <Text style={[styles.iocTypeCount, { color: colors.text }]}>{ioc.count}</Text>
              <Text style={[styles.iocTypeLabel, { color: colors.textSecondary }]}>{ioc.type}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Recent IOCs */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent IOCs</Text>
        {recentIocs.map((ioc, index) => (
          <View key={index} style={styles.iocItem}>
            <View style={[styles.iocIcon, { backgroundColor: '#EF444415' }]}>
              <Hash size={16} color="#EF4444" />
            </View>
            <View style={styles.iocContent}>
              <Text style={[styles.iocIndicator, { color: colors.text }]}>{ioc.indicator}</Text>
              <Text style={[styles.iocMeta, { color: colors.textSecondary }]}>{ioc.type} • {ioc.source} • {ioc.confidence}</Text>
            </View>
            <Text style={[styles.iocTime, { color: colors.textSecondary }]}>{ioc.time}</Text>
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
          { endpoint: '/consult/ioc-collector', desc: 'Consult on IOC collection' },
          { endpoint: '/ioc-collector/collect', desc: 'Collect IOCs from source' },
          { endpoint: '/ioc-collector/enrich', desc: 'Enrich IOC with context' },
          { endpoint: '/ioc-collector/export', desc: 'Export IOCs in standard format' },
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
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically collect IOCs</Text>
            </View>
            <Switch value={autoCollection} onValueChange={setAutoCollection} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Threat Intelligence</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Integrate threat feeds</Text>
            </View>
            <Switch value={threatIntel} onValueChange={setThreatIntel} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Enrichment</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Enrich IOCs automatically</Text>
            </View>
            <Switch value={enrichment} onValueChange={setEnrichment} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="ioc-collector" agentName="AI IoC Collector" />

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
  iocTypesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  iocTypeCard: { flex: 1, minWidth: '30%', padding: 16, borderRadius: 12, alignItems: 'center' },
  iocTypeCount: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  iocTypeLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  iocItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E5EA', gap: 12 },
  iocIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  iocContent: { flex: 1 },
  iocIndicator: { fontSize: 14, fontWeight: '600', fontFamily: 'monospace' },
  iocMeta: { fontSize: 12, marginTop: 2 },
  iocTime: { fontSize: 11 },
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
