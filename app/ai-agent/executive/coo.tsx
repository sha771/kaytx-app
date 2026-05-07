import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Settings2, Clock, Target, Zap, ArrowRight, Briefcase, TrendingUp, BarChart3, MessageSquare, Calendar, Shield, FileText, Users, CheckCircle, Layers, Settings, Building2, Workflow, PieChart, Gauge, Award, Network } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function COOPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Operations', value: '1,247', icon: Workflow, color: '#34C759' },
    { label: 'Uptime', value: '99.95%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.8s', icon: Clock, color: '#FF9500' },
    { label: 'Efficiency', value: '96%', icon: Briefcase, color: '#1E3A5F' },
  ];

  const capabilities = ['Operations Management', 'Process Optimization', 'Resource Allocation', 'Performance Monitoring', 'Department Coordination', 'Quality Assurance', 'Supply Chain', 'Strategic Planning'];

  const responsibilities = [
    'Oversee daily business operations across all departments',
    'Optimize and streamline business processes',
    'Allocate resources efficiently across the organization',
    'Monitor and improve operational performance metrics',
    'Coordinate between departments for seamless operations',
    'Ensure quality assurance standards are met',
    'Manage supply chain and logistics operations',
    'Develop and execute operational strategic plans'
  ];

  const activities = [
    { time: '5 min ago', text: 'Optimized supply chain workflow', icon: Workflow },
    { time: '30 min ago', text: 'Allocated resources for Q3 projects', icon: Target },
    { time: '2 hours ago', text: 'Reviewed department performance KPIs', icon: PieChart },
    { time: '5 hours ago', text: 'Led operations strategy meeting', icon: Users },
  ];

  const quickActions = [
    { label: 'Operations', icon: Settings2, route: '/ai-agent/executive' },
    { label: 'Team Chat', icon: MessageSquare, route: '/ai-agent/collaboration' },
    { label: 'Schedule', icon: Calendar, route: '/ai-agent/scheduling' },
    { label: 'Settings', icon: Shield, route: '/ai-agent/settings' },
  ];

  const a2aEndpoints = [
    { method: 'GET', endpoint: '/api/v1/executive/coo/operations', description: 'Get operations' },
    { method: 'POST', endpoint: '/api/v1/executive/coo/optimize', description: 'Optimize process' },
    { method: 'GET', endpoint: '/api/v1/executive/coo/performance', description: 'Get performance' },
    { method: 'POST', endpoint: '/api/v1/executive/coo/allocate', description: 'Allocate resources' },
  ];

  const performanceMetrics = [
    { label: 'Efficiency', value: '96%', trend: '+12%' },
    { label: 'Cost Reduction', value: '23%', trend: '+8%' },
    { label: 'Process Time', value: '-45%', trend: '+15%' },
    { label: 'Quality Score', value: '98%', trend: '+5%' },
  ];

  const subAgents = [
    { id: 'ai-operations-manager', name: 'AI Operations Manager', description: 'Daily operations oversight', icon: Building2, color: '#6366F1' },
    { id: 'ai-quality-manager', name: 'AI Quality Manager', description: 'Quality assurance control', icon: CheckCircle, color: '#10B981' },
    { id: 'ai-logistics-manager', name: 'AI Logistics Manager', description: 'Supply chain coordination', icon: Network, color: '#F59E0B' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#1E3A5F18', borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#1E3A5F25' }]}>
          <Settings2 size={56} color="#1E3A5F" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI COO</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Chief Operating Officer</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#1E3A5F22' }]}><Award size={12} color="#1E3A5F" /><Text style={[styles.badgeText, { color: '#1E3A5F' }]}>Executive</Text></View>
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
            <View key={index} style={[styles.metricCard, { backgroundColor: '#1E3A5F10' }]}>
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
          The AI COO oversees daily operations, optimizes business processes, ensures operational efficiency, and coordinates across all departments to drive organizational excellence.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#1E3A5F18' }]}>
              <Text style={[styles.tagText, { color: '#1E3A5F' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#1E3A5F" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Direct Reports</Text>
        {subAgents.map((agent, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/executive/${agent.id}` as any)} style={[styles.subAgentCard, { backgroundColor: '#1E3A5F15' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: `${agent.color}20` }]}>
              <agent.icon size={20} color={agent.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
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
            <View style={[styles.activityIcon, { backgroundColor: '#1E3A5F15' }]}>
              <act.icon size={14} color="#1E3A5F" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#1E3A5F12' }]} onPress={() => router.push(action.route as any)}>
              <action.icon size={20} color="#1E3A5F" />
              <Text style={[styles.actionText, { color: '#1E3A5F' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="coo" agentName="AI COO" />
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
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
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
});
