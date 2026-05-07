import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Rocket, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, Lightbulb, TrendingUp, BarChart3, MessageSquare, Calendar, Shield, FileText, Sparkles, Layers, Cpu, Globe, Award, Settings, CheckCircle, Briefcase } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPInnovationPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Innovations', value: '5,351', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '1.3s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.9%', icon: Target, color: '#E91E63' },
  ];
  const capabilities = ['Innovation Strategy', 'Portfolio Management', 'External Partnerships', 'Budget Oversight', 'Talent Strategy', 'Board Reporting', 'Idea Scoring', 'Prototype Funding', 'Pipeline Management', 'Hackathon Organization'];
  const responsibilities = [
    'Innovation strategy & vision development',
    'Innovation portfolio management & prioritization',
    'External partnership & collaboration development',
    'Innovation budget oversight & allocation',
    'Innovation talent strategy & team building',
    'Board & executive reporting on innovation metrics',
    'Idea evaluation & scoring framework management',
    'Prototype funding decisions & resource allocation'
  ];
  const activities = [
    { time: '3 min ago', text: 'Presented innovation strategy to board', icon: CircleCheckBig },
    { time: '6 min ago', text: 'Approved $5M innovation budget', icon: Target },
    { time: '9 min ago', text: 'Established 3 research partnerships', icon: Zap },
    { time: '15 min ago', text: 'Reviewed 12 new innovation proposals', icon: Lightbulb },
    { time: '1 hour ago', text: 'Launched Q4 innovation challenge', icon: Rocket },
  ];
  const quickActions = [
    { label: 'View Pipeline', icon: Layers, route: '/ai-agent/research' },
    { label: 'Team Chat', icon: MessageSquare, route: '/ai-agent/collaboration' },
    { label: 'Schedule', icon: Calendar, route: '/ai-agent/scheduling' },
    { label: 'Settings', icon: Shield, route: '/ai-agent/settings' },
    { label: 'Analytics', icon: BarChart3, route: '/ai-agent/analytics' },
    { label: 'Documents', icon: FileText, route: '/ai-agent/knowledge-base' },
  ];
  const subAgents = [
    { id: 'innovation-pipeline-manager', name: 'AI Innovation Pipeline Manager', description: 'Manages the flow of ideas through innovation stages', icon: Layers, color: '#8B5CF6' },
    { id: 'idea-scorer', name: 'AI Idea Scorer', description: 'Evaluates and scores innovation proposals', icon: Target, color: '#F59E0B' },
    { id: 'prototype-funder', name: 'AI Prototype Funder', description: 'Allocates resources for prototype development', icon: Briefcase, color: '#10B981' },
  ];
  const a2aEndpoints = [
    { method: 'GET', endpoint: '/api/v1/innovation/vp/strategy', description: 'Get innovation strategy' },
    { method: 'POST', endpoint: '/api/v1/innovation/vp/proposal', description: 'Submit innovation proposal' },
    { method: 'GET', endpoint: '/api/v1/innovation/vp/pipeline', description: 'View innovation pipeline' },
    { method: 'POST', endpoint: '/api/v1/innovation/vp/fund', description: 'Approve prototype funding' },
    { method: 'GET', endpoint: '/api/v1/innovation/vp/metrics', description: 'Get innovation metrics' },
  ];
  const performanceMetrics = [
    { label: 'Ideas Submitted', value: '892', trend: '+18%' },
    { label: 'Prototypes Funded', value: '67', trend: '+24%' },
    { label: 'Partnerships', value: '23', trend: '+12%' },
    { label: 'ROI on Innovation', value: '340%', trend: '+45%' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#E91E6318' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E91E6325' }]}>
          <Rocket size={48} color="#E91E63" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Innovation</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Innovation Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E91E6322' }]}><Star size={12} color="#E91E63" /><Text style={[styles.badgeText, { color: '#E91E63' }]}>VP Level</Text></View>
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
            <View key={index} style={[styles.metricCard, { backgroundColor: '#E91E6310' }]}>
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
          The AI VP Innovation leads the organization's innovation strategy, manages the innovation pipeline, evaluates and funds promising prototypes, and builds strategic partnerships. This executive-level agent drives breakthrough innovations and ensures competitive advantage through systematic idea management and resource allocation.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#E91E6318' }]}>
              <Text style={[styles.tagText, { color: '#E91E63' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#E91E63" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Section */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Specialized agents working under VP Innovation</Text>
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
            <View style={[styles.activityIcon, { backgroundColor: '#E91E6315' }]}>
              <act.icon size={14} color="#E91E63" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#E91E6312' }]} onPress={() => router.push(action.route as any)}>
              <action.icon size={24} color="#E91E63" />
              <Text style={[styles.actionText, { color: '#E91E63' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Related Agents */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Related Agents</Text>
        <View style={styles.relatedAgentsRow}>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/vp-research' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#00968815' }]}>
            <Lightbulb size={20} color="#009688" />
            <Text style={[styles.relatedAgentText, { color: '#009688' }]}>VP Research</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/vp-rd-operations' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#FF950015' }]}>
            <Settings size={20} color="#FF9500" />
            <Text style={[styles.relatedAgentText, { color: '#FF9500' }]}>VP R&D Ops</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/ai-agent/research/innovation-manager' as any)} style={[styles.relatedAgentCard, { backgroundColor: '#8B5CF615' }]}>
            <Sparkles size={20} color="#8B5CF6" />
            <Text style={[styles.relatedAgentText, { color: '#8B5CF6' }]}>Innovation Mgr</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AgentFeatures agentId="vp-innovation" agentName="AI VP Innovation" />
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
