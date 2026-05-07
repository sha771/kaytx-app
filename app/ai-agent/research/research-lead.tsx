import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Users, Clock, Target, Zap, ArrowRight, Briefcase, Star, CircleCheckBig, TrendingUp, BarChart3, MessageSquare, Calendar, Shield, FileText, FlaskConical, Lightbulb, BookOpen, Database, CheckCircle, Layers, Cpu, Award, Settings } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function ResearchLeadPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Projects', value: '24', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.8%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '1.2s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '97.5%', icon: Target, color: '#10B981' },
  ];
  const capabilities = ['Research Leadership', 'Team Coordination', 'Project Management', 'Methodology Design', 'Data Analysis', 'Publication Strategy', 'Grant Coordination', 'Mentoring', 'Quality Assurance', 'Resource Planning'];
  const responsibilities = [
    'Lead research projects and teams',
    'Design and implement research methodologies',
    'Coordinate cross-functional research initiatives',
    'Mentor junior researchers and scientists',
    'Ensure research quality and compliance',
    'Manage research timelines and deliverables',
    'Coordinate with VP Research on strategic priorities',
    'Publish research findings and presentations'
  ];
  const activities = [
    { time: '5 min ago', text: 'Led team meeting on ML research project', icon: Users },
    { time: '20 min ago', text: 'Reviewed 3 research proposals', icon: FileText },
    { time: '1 hour ago', text: 'Completed methodology review for clinical study', icon: Target },
    { time: '2 hours ago', text: 'Submitted grant progress report', icon: BookOpen },
    { time: '4 hours ago', text: 'Coordinated with VP Research on Q4 priorities', icon: Zap },
  ];
  const quickActions = [
    { label: 'Projects', icon: Layers, route: '/ai-agent/research' },
    { label: 'Team Chat', icon: MessageSquare, route: '/ai-agent/collaboration' },
    { label: 'Schedule', icon: Calendar, route: '/ai-agent/scheduling' },
    { label: 'Settings', icon: Shield, route: '/ai-agent/settings' },
    { label: 'Analytics', icon: BarChart3, route: '/ai-agent/analytics' },
    { label: 'Documents', icon: FileText, route: '/ai-agent/knowledge-base' },
  ];
  const subAgents = [
    { id: 'research-methodologist', name: 'AI Research Methodologist', description: 'Designs and validates research methodologies', icon: Target, color: '#8B5CF6' },
    { id: 'data-quality-specialist', name: 'AI Data Quality Specialist', description: 'Ensures data integrity and quality standards', icon: Database, color: '#F59E0B' },
    { id: 'research-coordinator', name: 'AI Research Coordinator', description: 'Coordinates project timelines and resources', icon: Calendar, color: '#10B981' },
  ];
  const a2aEndpoints = [
    { method: 'GET', endpoint: '/api/v1/research/lead/projects', description: 'List research projects' },
    { method: 'POST', endpoint: '/api/v1/research/lead/methodology', description: 'Create methodology' },
    { method: 'GET', endpoint: '/api/v1/research/lead/team', description: 'Get team assignments' },
    { method: 'POST', endpoint: '/api/v1/research/lead/review', description: 'Submit research review' },
    { method: 'GET', endpoint: '/api/v1/research/lead/metrics', description: 'Get performance metrics' },
  ];
  const performanceMetrics = [
    { label: 'Projects Completed', value: '18', trend: '+15%' },
    { label: 'Publications', value: '12', trend: '+20%' },
    { label: 'Team Satisfaction', value: '96%', trend: '+8%' },
    { label: 'On-Time Delivery', value: '94%', trend: '+12%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#10B98118' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#10B98125' }]}>
          <FlaskConical size={48} color="#10B981" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Research Lead</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Research Team Leadership</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#10B98122' }]}><Star size={12} color="#10B981" /><Text style={[styles.badgeText, { color: '#10B981' }]}>Team Lead</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text></View>
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
            <View key={index} style={[styles.metricCard, { backgroundColor: '#10B98110' }]}>
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
          The AI Research Lead manages research teams, coordinates projects, and ensures high-quality research output. This senior-level agent bridges the gap between VP Research strategy and day-to-day research execution, mentoring scientists and driving innovation.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#10B98118' }]}>
              <Text style={[styles.tagText, { color: '#10B981' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#10B981" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Specialized agents working under Research Lead</Text>
        {subAgents.map((agent, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/research/sub-agents/${agent.id}` as any)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: agent.color + '20' }]}>
              <agent.icon size={24} color={agent.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{agent.description}</Text>
            </View>
            <ArrowRight size={20} color={theme.colors.textSecondary} />
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
            <View style={[styles.activityIcon, { backgroundColor: '#10B98115' }]}>
              <act.icon size={14} color="#10B981" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#10B98112' }]} onPress={() => router.push(action.route as any)}>
              <action.icon size={24} color="#10B981" />
              <Text style={[styles.actionText, { color: '#10B981' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Related Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Related Agents</Text>
        <View style={styles.relatedAgentsRow}>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/vp-research' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#00968815' }]}>
            <FlaskConical size={20} color="#009688" />
            <Text style={[styles.relatedAgentText, { color: '#009688' }]}>VP Research</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/ai-research-scientist' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#8B5CF615' }]}>
            <BookOpen size={20} color="#8B5CF6" />
            <Text style={[styles.relatedAgentText, { color: '#8B5CF6' }]}>Research Scientist</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="research-lead" agentName="AI Research Lead" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
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
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', padding: 16, borderRadius: 12, alignItems: 'center' },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' },
  trendBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginTop: 8, gap: 4 },
  trendText: { fontSize: 11, fontWeight: '600' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  subAgentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  subAgentInfo: { flex: 1, marginLeft: 12 },
  subAgentName: { fontSize: 16, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  endpointRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, gap: 12 },
  methodBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  methodText: { fontSize: 11, fontWeight: '700', fontFamily: 'monospace' },
  endpointInfo: { flex: 1 },
  endpointPath: { fontSize: 13, fontFamily: 'monospace', fontWeight: '500' },
  endpointDesc: { fontSize: 12, marginTop: 2 },
  relatedAgentsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  relatedAgentCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, gap: 8 },
  relatedAgentText: { fontSize: 13, fontWeight: '600' },
});
