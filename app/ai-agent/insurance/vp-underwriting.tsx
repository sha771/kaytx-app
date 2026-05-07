import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  FileCheck, Activity, CircleCheckBig, Clock, Target, ChartBarBig, MessageSquare,
  Calendar, Shield, ArrowRight, Users, Zap, Star, TrendingUp, AlertTriangle,
  BarChart3, ChevronRight, Scale, Gavel
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'underwriting-guidelines-enforcer', name: 'Underwriting Guidelines Enforcer', icon: Shield, desc: 'Ensures all underwriting decisions adhere to company guidelines and regulatory standards' },
  { id: 'portfolio-mix-manager', name: 'Portfolio Mix Manager', icon: BarChart3, desc: 'Optimizes insurance portfolio composition across lines of business and risk segments' },
  { id: 'pricing-strategy-advisor', name: 'Pricing Strategy Advisor', icon: Scale, desc: 'Develops and maintains risk-based pricing models and competitive rate strategies' },
];

const QUICK_ACTIONS = [
  { label: 'Underwriting Queue', icon: FileCheck },
  { label: 'Team Chat', icon: MessageSquare },
  { label: 'Pricing Review', icon: Scale },
  { label: 'Escalations', icon: AlertTriangle },
];

const METRICS = [
  { label: 'Policies Underwritten', value: '18,421', change: '+8.4%', trend: 'up' },
  { label: 'Avg Response Time', value: '0.9s', change: '-12%', trend: 'up' },
  { label: 'Portfolio Growth', value: '14.2%', change: '+2.1%', trend: 'up' },
  { label: 'Pricing Accuracy', value: '98.7%', change: '+0.5%', trend: 'up' },
];

export default function VPUnderwritingPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Policies', value: '18,421', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.96%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.9s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.7%', icon: Target, color: '#AF52DE' }
  ];

  const capabilities = [
    'Risk Assessment', 'Policy Pricing', 'Claims Analysis', 'Regulatory Compliance',
    'Fraud Detection', 'Portfolio Management', 'Actuarial Analysis', 'Reinsurance Strategy',
    'Underwriting Guidelines', 'Portfolio Mix Optimization', 'Pricing Strategy',
    'Rate Filing Support', 'Exception Approval', 'Quality Review'
  ];

  const responsibilities = [
    'Underwriting strategy and policy framework development and enforcement',
    'Risk assessment & pricing model oversight and calibration',
    'Claims analysis & fraud detection pattern review and escalation',
    'Regulatory compliance & audit readiness across underwriting operations',
    'Portfolio management & reinsurance placement strategy and monitoring',
    'Actuarial analysis & reserving support and validation',
    'Customer risk profiling & segmentation for underwriting decisions',
    'Underwriting team operations, quality assurance, and performance management',
    'Pricing strategy development and competitive rate monitoring',
    'Underwriting guidelines enforcement and exception approval oversight'
  ];

  const activities = [
    { time: '2 min ago', text: 'Processed 45 new policy applications for auto line', icon: FileCheck },
    { time: '12 min ago', text: 'Updated risk pricing model for commercial property line', icon: BarChart3 },
    { time: '40 min ago', text: 'Flagged 3 potential fraud patterns in marine underwriting', icon: AlertTriangle },
    { time: '2 hours ago', text: 'Completed quarterly actuarial review with reserving team', icon: Scale },
    { time: '4 hours ago', text: 'Published reinsurance placement summary to CRO', icon: Shield },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: theme.colors.primary + '18' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: theme.colors.primary + '25' }]}>
          <FileCheck size={48} color={theme.colors.primary} />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Underwriting</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Insurance Underwriting & Portfolio Strategy</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary + '22' }]}>
            <Star size={12} color={theme.colors.primary} />
            <Text style={[styles.badgeText, { color: theme.colors.primary }]}>VP Level</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Shield size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>Insurance Dept</Text>
          </View>
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

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI VP Underwriting leads insurance risk assessment, policy pricing, and portfolio management across all lines of business. This agent ensures accurate risk profiling, strict regulatory compliance, optimal balance between growth and profitability, and oversees underwriting guidelines enforcement, portfolio mix optimization, and pricing strategy development through its specialized sub-agents.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.colors.primary + '18' }]}>
              <Text style={[styles.tagText, { color: theme.colors.primary }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color={theme.colors.primary} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents executing underwriting strategy, guidelines enforcement, portfolio optimization, and pricing advisory.
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            onPress={() => router.push(`/ai-agent/insurance/sub-agents/${agent.id}`)}
            style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
          >
            <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}>
              <agent.icon size={28} color="#F59E0B" />
            </View>
            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          {METRICS.map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: theme.colors.primary + '15' }]}>
              <act.icon size={14} color={theme.colors.primary} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: theme.colors.primary + '12' }]}>
              <action.icon size={24} color={theme.colors.primary} />
              <Text style={[styles.actionText, { color: theme.colors.primary }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="vp-underwriting" agentName="AI VP Underwriting" />
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
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  agentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 12 },
  agentIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  agentInfo: { flex: 1, marginLeft: 12 },
  agentName: { fontSize: 16, fontWeight: '600' },
  agentDesc: { fontSize: 12, marginTop: 2 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  metricCard: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  metricValue: { fontSize: 20, fontWeight: 'bold' },
  metricLabel: { fontSize: 12, marginTop: 4 },
  metricTrend: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});

