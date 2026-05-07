import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, FileSearch, Clock, Target, Zap, ArrowRight, Briefcase, TrendingUp, BarChart3, MessageSquare, Calendar, Shield, FileText, Users, CheckCircle, Layers, Settings, FileCheck, FolderOpen, Clock4, Bell } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function FilingTrackerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Filings', value: '892', icon: FolderOpen, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.4s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.7%', icon: Briefcase, color: '#8B5CF6' },
  ];

  const capabilities = ['Filing Tracking', 'Deadline Monitoring', 'Status Updates', 'Document Management', 'Compliance Alerts', 'Progress Reporting', 'Multi-Jurisdiction', 'Renewal Tracking'];

  const responsibilities = [
    'Track all patent and IP filings',
    'Monitor critical deadlines',
    'Update filing statuses in real-time',
    'Manage filing documentation',
    'Send compliance and deadline alerts',
    'Generate progress reports'
  ];

  const activities = [
    { time: '5 min ago', text: 'Updated 12 filing statuses', icon: FileCheck },
    { time: '20 min ago', text: 'Sent deadline alert for 3 patents', icon: Bell },
    { time: '1 hour ago', text: 'Processed renewal notification', icon: Clock4 },
    { time: '3 hours ago', text: 'Generated quarterly filing report', icon: FileText },
  ];

  const quickActions = [
    { label: 'Track', icon: FolderOpen, route: '/ai-agent/research' },
    { label: 'Team Chat', icon: MessageSquare, route: '/ai-agent/collaboration' },
    { label: 'Schedule', icon: Calendar, route: '/ai-agent/scheduling' },
    { label: 'Settings', icon: Shield, route: '/ai-agent/settings' },
  ];

  const a2aEndpoints = [
    { method: 'GET', endpoint: '/api/v1/filing/tracker/list', description: 'List filings' },
    { method: 'POST', endpoint: '/api/v1/filing/tracker/update', description: 'Update status' },
    { method: 'GET', endpoint: '/api/v1/filing/tracker/deadlines', description: 'Get deadlines' },
    { method: 'POST', endpoint: '/api/v1/filing/tracker/alert', description: 'Send alert' },
  ];

  const performanceMetrics = [
    { label: 'Filings Tracked', value: '892', trend: '+28%' },
    { label: 'On-Time Rate', value: '99%', trend: '+5%' },
    { label: 'Alerts Sent', value: '234', trend: '+42%' },
    { label: 'Compliance', value: '100%', trend: '+2%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#8B5CF618', borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#8B5CF625' }]}>
          <FolderOpen size={56} color="#8B5CF6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Filing Tracker</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Patent Researcher</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8B5CF622' }]}><Briefcase size={12} color="#8B5CF6" /><Text style={[styles.badgeText, { color: '#8B5CF6' }]}>Specialist</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Performance Metrics */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {performanceMetrics.map((metric, index) => (
            <View key={index} style={[styles.metricCard, { backgroundColor: '#8B5CF610' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: '#34C75920' }]}>
                <TrendingUp size={10} color="#34C759" />
                <Text style={[styles.trendText, { color: '#34C759' }]}>{metric.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Filing Tracker monitors all patent and IP filings, tracks deadlines, sends alerts, and ensures compliance across jurisdictions.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#8B5CF618' }]}>
              <Text style={[styles.tagText, { color: '#8B5CF6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#8B5CF6" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* A2A Endpoints */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A API Endpoints</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Agent-to-Agent communication interfaces</Text>
        {a2aEndpoints.map((api, index) => (
          <View key={index} style={styles.endpointRow}>
            <View style={[styles.methodBadge, { backgroundColor: api.method === 'GET' ? '#007AFF20' : '#34C75920' }]}>
              <Text style={[styles.methodText, { color: api.method === 'GET' ? '#007AFF' : '#34C759' }]}>{api.method}</Text>
            </View>
            <View style={styles.endpointInfo}>
              <Text style={[styles.endpointPath, { color: theme.colors.text }]}>{api.endpoint}</Text>
              <Text style={[styles.endpointDesc, { color: theme.colors.textSecondary }]}>{api.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#8B5CF615' }]}>
              <act.icon size={14} color="#8B5CF6" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#8B5CF612' }]} onPress={() => router.push(action.route as any)}>
              <action.icon size={20} color="#8B5CF6" />
              <Text style={[styles.actionText, { color: '#8B5CF6' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Parent Agent */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/research/ai-patent-researcher' as any)} style={[styles.parentCard, { backgroundColor: '#8B5CF615' }]}>
          <FileSearch size={24} color="#8B5CF6" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Patent Researcher</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Related Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Related Agents</Text>
        <View style={styles.relatedAgentsRow}>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/sub-agents/patent-drafter' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#3B82F615' }]}>
            <FileText size={18} color="#3B82F6" />
            <Text style={[styles.relatedAgentText, { color: '#3B82F6' }]}>Patent Drafter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/sub-agents/prior-art-searcher' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#10B98115' }]}>
            <FileSearch size={18} color="#10B981" />
            <Text style={[styles.relatedAgentText, { color: '#10B981' }]}>Prior Art Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="filing-tracker" agentName="AI Filing Tracker" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  sectionSubtitle: { fontSize: 13, color: '#666', marginBottom: 12 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 6 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, alignItems: 'center' },
  metricValue: { fontSize: 18, fontWeight: 'bold' },
  metricLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  trendBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginTop: 8, gap: 4 },
  trendText: { fontSize: 11, fontWeight: '600' },
  endpointRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  methodBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  methodText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace' },
  endpointInfo: { flex: 1 },
  endpointPath: { fontSize: 13, fontFamily: 'monospace', fontWeight: '500' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
  relatedAgentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  relatedAgentCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 6 },
  relatedAgentText: { fontSize: 12, fontWeight: '600' },
});
