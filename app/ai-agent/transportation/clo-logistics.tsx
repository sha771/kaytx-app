import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Briefcase, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap,
  Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle,
  FileText, Globe, ChevronRight, BarChart3, Truck, MapPin
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'logistics-strategy-advisor', name: 'AI Logistics Strategy Advisor', icon: Globe, desc: 'Strategic logistics planning and supply chain network design' },
  { id: 'network-optimizer', name: 'AI Network Optimizer', icon: MapPin, desc: 'Transportation network optimization and hub placement analysis' },
  { id: 'cost-to-serve-analyst', name: 'AI Cost-to-Serve Analyst', icon: BarChart3, desc: 'End-to-end cost-to-serve analysis and margin optimization' },
];

const QUICK_ACTIONS = [
  { label: 'Logistics Dashboard', icon: ChartBarBig },
  { label: 'Team Chat', icon: MessageSquare },
  { label: 'Network Review', icon: Calendar },
  { label: 'Cost Alerts', icon: AlertTriangle },
];

const METRICS = [
  { label: 'On-Time Delivery', value: '97.4%', change: '+1.8%', trend: 'up' },
  { label: 'Cost Reduction', value: '18.2%', change: '+3.1%', trend: 'up' },
  { label: 'Network Utilization', value: '89.6%', change: '+4.2%', trend: 'up' },
  { label: 'Strategic Initiatives', value: '34', change: '+6', trend: 'up' },
];

export default function CloLogisticsPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks', value: '12,847', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.6s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.4%', icon: Target, color: '#26A69A' }
  ];

  const capabilities = [
    'Logistics Strategy', 'Network Design', 'Cost-to-Serve Analysis', 'Supply Chain Optimization',
    'Transportation Planning', 'Hub & Spoke Design', 'Carrier Strategy', 'Freight Procurement',
    'Sustainability Planning', 'Digital Twin Logistics', 'Capacity Planning', 'Service Level Management',
    'Risk Mitigation', 'Global Trade Compliance', 'Omnichannel Fulfillment', 'Last Mile Strategy'
  ];

  const responsibilities = [
    'Enterprise logistics strategy development and execution oversight',
    'Transportation network design and continuous optimization',
    'Cost-to-serve analysis and margin improvement across all channels',
    'Supply chain network planning and hub/spoke architecture decisions',
    'Carrier relationship strategy and freight procurement governance',
    'Sustainability and carbon reduction initiative leadership',
    'Digital transformation of logistics operations and technology adoption',
    'Global trade compliance and customs strategy oversight',
    'Omnichannel fulfillment strategy and service level management'
  ];

  const activities = [
    { time: '2 min ago', text: 'Reviewed Q3 logistics network performance dashboard', icon: ChartBarBig },
    { time: '8 min ago', text: 'Approved new carrier partnership for APAC region', icon: Globe },
    { time: '15 min ago', text: 'Analyzed cost-to-serve for premium product lines', icon: BarChart3 },
    { time: '32 min ago', text: 'Presented sustainability roadmap to executive team', icon: TrendingUp },
    { time: '1 hr ago', text: 'Signed off on new distribution center placement plan', icon: MapPin },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#26A69A20' }]}>
          <Briefcase size={48} color="#26A69A" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Chief Logistics Officer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Enterprise Logistics Strategy & Network Oversight</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#26A69A22' }]}><Star size={12} color="#26A69A" /><Text style={[styles.badgeText, { color: '#26A69A' }]}>C-Suite</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Truck size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>Logistics Dept</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Chief Logistics Officer provides executive-level strategic oversight for enterprise logistics operations. It drives network optimization, cost-to-serve reduction, carrier strategy, and sustainability initiatives across the entire supply chain. This C-suite agent orchestrates sub-agents for logistics strategy, network optimization, and cost analysis to deliver world-class logistics performance.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#26A69A18' }]}><Text style={[styles.tagText, { color: '#26A69A' }]}>{cap}</Text></View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#26A69A" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports executing logistics strategy, network optimization, and cost analysis under CLO direction.
        </Text>
        {SUB_AGENTS.map((agent) => (
          <TouchableOpacity key={agent.id} onPress={() => router.push(`/ai-agent/transportation/sub-agents/${agent.id}`)} style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.agentIcon, { backgroundColor: '#F59E0B20' }]}><agent.icon size={28} color="#F59E0B" /></View>
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
              <View style={styles.metricTrend}><TrendingUp size={12} color="#34C759" /><Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>{m.change}</Text></View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#26A69A15' }]}><act.icon size={14} color="#26A69A" /></View>
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
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#26A69A12' }]}>
              <action.icon size={24} color="#26A69A" />
              <Text style={[styles.actionText, { color: '#26A69A' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="clo-logistics" agentName="AI Chief Logistics Officer" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' },
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
