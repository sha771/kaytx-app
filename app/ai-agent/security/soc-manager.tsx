import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Shield, Activity, Star, Users, CircleCheckBig, Clock, ArrowRight, Zap, ChevronRight, TrendingUp, BarChart3, MessageSquare, Calendar, Settings, FileText, Target, UserCheck, Workflow } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function SocManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Alerts Processed', value: '45,200', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.4%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.2s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.4%', icon: Zap, color: '#C62828' },
  ];

  const capabilities = ['SOC Management', 'Shift Coordination', 'Playbook Development', 'Alert Triage', 'Team Leadership', 'Escalation Management', 'SOC Analytics', 'Continuous Monitoring'];

  const responsibilities = [
    'Manage Security Operations Center (SOC) team and operations',
    'Coordinate shift schedules and team assignments',
    'Develop and maintain security playbooks and procedures',
    'Oversee alert triage and prioritization processes',
    'Lead SOC team performance and skill development',
    'Manage escalation paths and procedures',
    'Analyze SOC metrics and performance indicators',
    'Ensure continuous 24/7 security monitoring'
  ];

  const activities = [
    { time: '1 min ago', text: 'Processed 45 security alerts', icon: Shield },
    { time: '15 min ago', text: 'Updated SOC playbook for ransomware', icon: FileText },
    { time: '1 hour ago', text: 'Coordinated shift handoff', icon: UserCheck },
    { time: '3 hours ago', text: 'Reviewed SOC performance metrics', icon: BarChart3 },
  ];

  const subAgents = [
    { name: 'AI Shift Coordinator', route: '/ai-agent/security/sub-agents/shift-coordinator', desc: 'Shift coordination & scheduling', icon: UserCheck },
    { name: 'AI Playbook Author', route: '/ai-agent/security/sub-agents/playbook-author', desc: 'Security playbook development & maintenance', icon: FileText },
    { name: 'AI Escalation Path Definer', route: '/ai-agent/security/sub-agents/escalation-path-definer', desc: 'Escalation path definition & management', icon: Workflow },
  ];

  const a2aEndpoints = [
    { method: 'GET', endpoint: '/api/v1/security/soc/alerts', description: 'Get active alerts' },
    { method: 'POST', endpoint: '/api/v1/security/soc/shift', description: 'Assign shift' },
    { method: 'GET', endpoint: '/api/v1/security/soc/metrics', description: 'Get SOC metrics' },
    { method: 'POST', endpoint: '/api/v1/security/soc/playbook', description: 'Create playbook' },
  ];

  const performanceMetrics = [
    { label: 'Alerts Processed', value: '45,200', trend: '+35%' },
    { label: 'MTTR', value: '12min', trend: '-28%' },
    { label: 'Team Efficiency', value: '94%', trend: '+15%' },
    { label: 'Playbooks', value: '67', trend: '+22%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#C6282818', borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#C6282825' }]}>
          <Shield size={56} color="#C62828" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI SOC Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Security & Risk Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#C6282822' }]}><Star size={12} color="#C62828" /><Text style={[styles.badgeText, { color: '#C62828' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>{subAgents.length} Sub-Agents</Text></View>
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
            <View key={index} style={[styles.metricCard, { backgroundColor: '#C6282810' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{metric.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: metric.trend.startsWith('+') ? '#34C75920' : '#EF444420' }]}>
                <TrendingUp size={10} color={metric.trend.startsWith('+') ? '#34C759' : '#EF4444'} />
                <Text style={[styles.trendText, { color: metric.trend.startsWith('+') ? '#34C759' : '#EF4444' }]}>{metric.trend}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI SOC Manager leads Security Operations Center team, manages alert triage, and ensures 24/7 monitoring. It oversees 3 specialized sub-agents for comprehensive SOC management coverage.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#C6282818' }]}>
              <Text style={[styles.tagText, { color: '#C62828' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#C62828" />
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
            <View style={[styles.activityIcon, { backgroundColor: '#C6282815' }]}>
              <act.icon size={14} color="#C62828" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Sub-Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((s, i) => (
          <TouchableOpacity key={i} style={styles.subCard} onPress={() => router.push(s.route as any)}>
            <View style={[styles.subIcon, { backgroundColor: '#C6282815' }]}>
              <s.icon size={20} color="#C62828" />
            </View>
            <View style={styles.subInfo}>
              <Text style={[styles.subName, { color: theme.colors.text }]}>{s.name}</Text>
              <Text style={[styles.subDesc, { color: theme.colors.textSecondary }]}>{s.desc}</Text>
            </View>
            <ChevronRight size={20} color="#C62828" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#C6282812' }]} onPress={() => router.push('/ai-agent/security')}>
            <Shield size={20} color="#C62828" />
            <Text style={[styles.actionText, { color: '#C62828' }]}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#C6282812' }]} onPress={() => router.push('/ai-agent/collaboration')}>
            <MessageSquare size={20} color="#C62828" />
            <Text style={[styles.actionText, { color: '#C62828' }]}>Team Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#C6282812' }]} onPress={() => router.push('/ai-agent/scheduling')}>
            <Calendar size={20} color="#C62828" />
            <Text style={[styles.actionText, { color: '#C62828' }]}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#C6282812' }]} onPress={() => router.push('/ai-agent/settings')}>
            <Settings size={20} color="#C62828" />
            <Text style={[styles.actionText, { color: '#C62828' }]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="soc-manager" agentName="AI SOC Manager" />
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
  subCard: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#F2F2F7', borderRadius: 10, marginBottom: 8 },
  subIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  subInfo: { flex: 1 },
  subName: { fontSize: 14, fontWeight: '600', marginBottom: 2 },
  subDesc: { fontSize: 12 },
});