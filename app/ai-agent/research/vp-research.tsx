import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Microscope, Activity, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare, Calendar, Shield, ArrowRight, Users, Zap, Star, FlaskConical, Lightbulb, FileText, Database, TrendingUp, Award, BookOpen, Settings, BarChart3, FileSearch, Layers, Cpu, Globe, Sparkles, CheckCircle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPResearchPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Experiments', value: '1,245', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.91%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '1.5s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '96.8%', icon: Target, color: '#AF52DE' },
  ];
  const capabilities = ['R&D Strategy', 'Experiment Design', 'Patent Research', 'Innovation Pipeline', 'Prototyping', 'Market Research', 'Tech Scouting', 'Feasibility Studies', 'Grant Writing', 'Publication Planning', 'IP Management', 'Research Analytics'];
  const responsibilities = [
    'Research & Development Strategy & Roadmap',
    'Experiment Design & Hypothesis Testing',
    'Patent Research & IP Landscape Analysis',
    'Innovation Pipeline & Idea Management',
    'Rapid Prototyping & Proof of Concept',
    'Market Research & Technology Scouting',
    'Feasibility Studies & Cost-Benefit Analysis',
    'Cross-functional Research Collaboration',
    'Research Team Leadership & Mentoring',
    'Budget Planning & Resource Allocation'
  ];
  const activities = [
    { time: '5 min ago', text: 'Initiated feasibility study for edge AI', icon: FlaskConical },
    { time: '25 min ago', text: 'Updated patent landscape for NLP', icon: FileSearch },
    { time: '1 hour ago', text: 'Completed 12 experiment result analyses', icon: ChartBarBig },
    { time: '3 hours ago', text: 'Published Q3 research findings brief', icon: BookOpen },
    { time: '6 hours ago', text: 'Submitted 3 new patent applications', icon: FileText },
  ];
  const quickActions = [
    { label: 'View Reports', icon: ChartBarBig, route: '/ai-agent/reports' },
    { label: 'Team Chat', icon: MessageSquare, route: '/ai-agent/collaboration' },
    { label: 'Schedule', icon: Calendar, route: '/ai-agent/scheduling' },
    { label: 'Settings', icon: Shield, route: '/ai-agent/settings' },
    { label: 'Analytics', icon: BarChart3, route: '/ai-agent/analytics' },
    { label: 'Documents', icon: FileText, route: '/ai-agent/knowledge-base' },
  ];
  const subAgents = [
    { id: 'research-agenda-setter', name: 'AI Research Agenda Setter', description: 'Sets strategic research priorities and timelines', icon: Target, color: '#10B981' },
    { id: 'grant-proposal-writer', name: 'AI Grant Proposal Writer', description: 'Drafts and manages research grant proposals', icon: FileText, color: '#8B5CF6' },
    { id: 'publication-planner', name: 'AI Publication Planner', description: 'Coordinates research publications and submissions', icon: BookOpen, color: '#F59E0B' },
  ];
  const a2aEndpoints = [
    { method: 'GET', endpoint: '/api/v1/research/vp/strategy', description: 'Get research strategy' },
    { method: 'POST', endpoint: '/api/v1/research/vp/experiment', description: 'Create new experiment' },
    { method: 'GET', endpoint: '/api/v1/research/vp/patents', description: 'List patent applications' },
    { method: 'POST', endpoint: '/api/v1/research/vp/grant', description: 'Submit grant proposal' },
    { method: 'GET', endpoint: '/api/v1/research/vp/analytics', description: 'Get research analytics' },
  ];
  const performanceMetrics = [
    { label: 'Research Papers Published', value: '47', trend: '+12%' },
    { label: 'Patents Filed', value: '23', trend: '+8%' },
    { label: 'Grants Secured', value: '$2.4M', trend: '+15%' },
    { label: 'Experiments Completed', value: '312', trend: '+22%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#00968818' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#00968825' }]}>
          <Microscope size={48} color="#009688" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Research</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Research & Development Department</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#00968822' }]}><Star size={12} color="#009688" /><Text style={[styles.badgeText, { color: '#009688' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
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
            <View key={index} style={[styles.metricCard, { backgroundColor: '#00968810' }]}>
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
          The AI VP Research leads R&D strategy, experimental design, and innovation discovery. This executive-level agent drives cutting-edge research initiatives, manages the innovation pipeline, coordinates patent activities, and translates emerging technologies into competitive advantages. Reports directly to the Chief Technology Officer.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#00968818' }]}>
              <Text style={[styles.tagText, { color: '#009688' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#009688" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Specialized agents working under VP Research</Text>
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
            <View style={[styles.activityIcon, { backgroundColor: '#00968815' }]}>
              <act.icon size={14} color="#009688" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#00968812' }]} onPress={() => router.push(action.route as any)}>
              <action.icon size={24} color="#009688" />
              <Text style={[styles.actionText, { color: '#009688' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Related Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Related Agents</Text>
        <View style={styles.relatedAgentsRow}>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/vp-innovation' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#E91E6315' }]}>
            <Lightbulb size={20} color="#E91E63" />
            <Text style={[styles.relatedAgentText, { color: '#E91E63' }]}>VP Innovation</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/vp-rd-operations' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#FF950015' }]}>
            <Settings size={20} color="#FF9500" />
            <Text style={[styles.relatedAgentText, { color: '#FF9500' }]}>VP R&D Ops</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/research-lead' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#10B98115' }]}>
            <FlaskConical size={20} color="#10B981" />
            <Text style={[styles.relatedAgentText, { color: '#10B981' }]}>Research Lead</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="vp-research" agentName="AI VP Research" />
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
