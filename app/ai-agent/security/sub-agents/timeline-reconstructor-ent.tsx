import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Shield, Clock, Target, Zap, ArrowRight, Briefcase,
  TrendingUp, TrendingDown, Crown, Sparkles, Settings,
  Clock3, Calendar, FileText, BarChart3, Search, Filter,
  History, Timer, ArrowUpRight, CheckCircle2
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function TimelineReconstructorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;
  const [activeTab, setActiveTab] = useState('overview');
  const [autoReconstruction, setAutoReconstruction] = useState(true);
  const [correlationEngine, setCorrelationEngine] = useState(true);
  const [visualization, setVisualization] = useState(true);

  const stats = [
    { label: 'Timelines Built', value: '567', change: '+89', icon: Clock3, color: '#EF4444', trend: 'up' },
    { label: 'Events Correlated', value: '45.2K', change: '+8.3K', icon: Link2, color: '#F59E0B', trend: 'up' },
    { label: 'Avg Accuracy', value: '98.7%', change: '+2.1%', icon: CheckCircle2, color: '#10B981', trend: 'up' },
    { label: 'Build Time', value: '4.2s', change: '-1.5s', icon: Timer, color: '#3B82F6', trend: 'down' },
  ];

  const kpis = [
    { label: 'Timeline Accuracy', value: '98.7%', target: '95%', status: 'exceeding', icon: Clock3 },
    { label: 'Event Correlation', value: '94.5%', target: '90%', status: 'exceeding', icon: Link2 },
    { label: 'Coverage Rate', value: '99.2%', target: '95%', status: 'exceeding', icon: Search },
    { label: 'Visualization', value: '100%', target: '90%', status: 'exceeding', icon: BarChart3 },
  ];

  const timelineEvents = [
    { time: '14:32:15', event: 'Initial compromise', source: 'Phishing email', severity: 'critical' },
    { time: '14:35:22', event: 'Malware execution', source: 'Endpoint detection', severity: 'critical' },
    { time: '14:42:08', event: 'Lateral movement', source: 'Network logs', severity: 'high' },
    { time: '14:55:33', event: 'Data exfiltration', source: 'DLP alert', severity: 'critical' },
    { time: '15:12:45', event: 'Privilege escalation', source: 'AD logs', severity: 'high' },
    { time: '15:30:00', event: 'Containment initiated', source: 'SOAR', severity: 'medium' },
  ];

  const capabilities = [
    'Event Correlation', 'Timestamp Analysis', 'Log Aggregation', 'Visual Timeline Generation',
    'Attack Chain Mapping', 'Cross-Source Correlation', 'Temporal Sequencing', 'IOC Timeline',
    'User Activity Reconstruction', 'Network Flow Analysis', 'File System Timeline', 'Memory Timeline',
    'Registry Analysis', 'Browser History Correlation', 'Email Thread Reconstruction'
  ];

  const responsibilities = [
    'Reconstruct incident timelines from multiple data sources',
    'Correlate events across logs, network traffic, and endpoints',
    'Sequence events in chronological order for accurate timeline',
    'Map attack chains to understand attacker movements',
    'Aggregate logs from various security tools and systems',
    'Analyze timestamps to establish exact event chronology',
    'Visualize timelines for stakeholder communication',
    'Correlate user activities across different systems',
    'Track lateral movement patterns through network logs',
    'Reconstruct file system activities and changes',
    'Analyze memory artifacts for runtime activities',
    'Correlate browser history with incident timeline',
    'Map data exfiltration events and volumes',
    'Support forensic analysis with timeline evidence',
    'Generate timeline reports for incident documentation'
  ];

  const activities = [
    { action: 'Built timeline', target: 'Ransomware incident #4521', time: '15 mins ago', icon: Clock3 },
    { action: 'Correlated events', target: '234 events linked', time: '30 mins ago', icon: Link2 },
    { action: 'Mapped attack chain', target: 'Initial access → exfil', time: '1 hour ago', icon: ArrowUpRight },
    { action: 'Generated report', target: 'Timeline visualization', time: '2 hours ago', icon: BarChart3 },
    { action: 'Analyzed timestamps', target: 'UTC normalization', time: '3 hours ago', icon: Calendar },
    { action: 'Reconstructed', target: 'User session timeline', time: '5 hours ago', icon: History },
  ];

  const quickActions = [
    { label: 'New Timeline', icon: Clock3, color: '#EF4444' },
    { label: 'Correlate', icon: Link2, color: '#F59E0B' },
    { label: 'Visualize', icon: BarChart3, color: '#10B981' },
    { label: 'Search Events', icon: Search, color: '#3B82F6' },
    { label: 'Filter', icon: Filter, color: '#8B5CF6' },
    { label: 'Export', icon: FileText, color: '#EC4899' },
    { label: 'Reports', icon: BarChart3, color: '#6366F1' },
    { label: 'Analysis', icon: History, color: '#F59E0B' },
  ];

  const Link2 = ({ size, color }: { size: number; color: string }) => (
    <View style={{ width: size, height: size, borderRadius: 4, borderWidth: 2, borderColor: color }} />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#EF444415' }]}>
          <Clock3 size={48} color="#EF4444" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Timeline Reconstructor</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Incident timeline reconstruction and event correlation specialist
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
        {['overview', 'timeline', 'capabilities', 'settings'].map((tab) => (
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
          The AI Timeline Reconstructor automatically builds incident timelines by correlating events from 
          multiple sources, mapping attack chains, and visualizing the chronological sequence of security events.
        </Text>
      </View>
      </>)}

      {activeTab === 'timeline' && (<>
      {/* Timeline Events */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Incident Timeline</Text>
        {timelineEvents.map((event, index) => (
          <View key={index} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <Text style={[styles.timelineTime, { color: colors.text }]}>{event.time}</Text>
              <View style={[styles.timelineLine, { backgroundColor: index === timelineEvents.length - 1 ? 'transparent' : '#E5E5EA' }]} />
            </View>
            <View style={[styles.timelineDot, { backgroundColor: event.severity === 'critical' ? '#EF4444' : event.severity === 'high' ? '#F59E0B' : '#3B82F6' }]} />
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineEvent, { color: colors.text }]}>{event.event}</Text>
              <Text style={[styles.timelineSource, { color: colors.textSecondary }]}>{event.source}</Text>
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
          { endpoint: '/consult/timeline-reconstructor', desc: 'Consult on timeline reconstruction' },
          { endpoint: '/timeline-reconstructor/build', desc: 'Build incident timeline' },
          { endpoint: '/timeline-reconstructor/correlate', desc: 'Correlate events' },
          { endpoint: '/timeline-reconstructor/export', desc: 'Export timeline report' },
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
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Auto-Reconstruction</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Automatically build timelines</Text>
            </View>
            <Switch value={autoReconstruction} onValueChange={setAutoReconstruction} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Correlation Engine</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Enable event correlation</Text>
            </View>
            <Switch value={correlationEngine} onValueChange={setCorrelationEngine} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>

          <View style={styles.featureToggle}>
            <View style={styles.featureToggleInfo}>
              <Text style={[styles.featureToggleTitle, { color: colors.text }]}>Visualization</Text>
              <Text style={[styles.featureToggleDesc, { color: colors.textSecondary }]}>Enable timeline visualization</Text>
            </View>
            <Switch value={visualization} onValueChange={setVisualization} trackColor={{ false: '#767577', true: '#EF4444' }} />
          </View>
        </View>
      )}

      {/* Agent Features */}
      <AgentFeatures agentId="timeline-reconstructor" agentName="AI Timeline Reconstructor" />

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
  timelineItem: { flexDirection: 'row', marginBottom: 16 },
  timelineLeft: { alignItems: 'center', width: 80 },
  timelineTime: { fontSize: 12, fontFamily: 'monospace', fontWeight: '600' },
  timelineLine: { width: 2, flex: 1, marginTop: 4 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12, marginTop: 4 },
  timelineContent: { flex: 1 },
  timelineEvent: { fontSize: 14, fontWeight: '600' },
  timelineSource: { fontSize: 12, marginTop: 2 },
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
