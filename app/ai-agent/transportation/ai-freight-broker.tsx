import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, DollarSign, Shield, Route
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  { id: 'rate-negotiator', name: 'AI Rate Negotiator', icon: DollarSign, desc: 'Freight rate negotiation and benchmarking' },
  { id: 'carrier-qualifier', name: 'AI Carrier Qualifier', icon: Shield, desc: 'Carrier qualification and compliance verification' },
  { id: 'lane-optimizer', name: 'AI Lane Optimizer', icon: Route, desc: 'Lane optimization and freight network balancing' },
];

const QUICK_ACTIONS = [
  { label: 'Dashboard', icon: ChartBarBig },
  { label: 'Team Chat', icon: MessageSquare },
  { label: 'Schedule', icon: Calendar },
  { label: 'Alerts', icon: AlertTriangle },
];

const METRICS = [
  { label: 'Rate Savings', value: '14.2%', change: '+3.8%', trend: 'up' },
  { label: 'Carrier Pool', value: '847', change: '+62', trend: 'up' },
  { label: 'On-time Pickup', value: '96.1%', change: '+1.7%', trend: 'up' },
  { label: 'Active Lanes', value: '2,400', change: '+180', trend: 'up' },
];

export default function aiFreightBrokerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks', value: '3,846', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.8%', icon: Activity, color: '#007AFF' },
    { label: 'Response', value: '0.1s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '99.1%', icon: Target, color: '#26A69A' }
  ];

  const capabilities = [
    'Freight Brokerage', 'Rate Negotiation', 'Carrier Qualification', 'Lane Optimization', 'Freight Procurement', 'Contract Management', 'Spot Market', 'RFP Management', 'Carrier Scoring', 'Insurance Verification', 'Safety Rating', 'Capacity Sourcing', 'Freight Audit', 'Payment Processing', 'Market Intelligence', 'Benchmarking'
  ];

  const responsibilities = [
    'Freight rate negotiation and benchmarking analysis',
    'Carrier qualification and compliance verification',
    'Lane optimization and freight network balancing',
    'Freight procurement and contract management',
    'Spot market management and capacity sourcing',
    'Carrier scoring and performance evaluation',
    'Insurance verification and safety rating management',
    'Freight audit and payment processing',
    'Market intelligence and rate benchmarking'
  ];

  const activities = [
    { time: '4 min ago', text: 'Negotiated 12% rate reduction on Midwest lanes', icon: DollarSign },
    { time: '15 min ago', text: 'Qualified 8 new carriers for compliance standards', icon: Shield },
    { time: '30 min ago', text: 'Optimized lane balance reducing empty miles by 22%', icon: Route },
    { time: '1 hr ago', text: 'Processed spot market bids for 34 loads', icon: ChartBarBig },
    { time: '3 hr ago', text: 'Completed quarterly carrier performance review', icon: FileText },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#26A69A20' }]}>
          <DollarSign size={48} color="#26A69A" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Freight Broker</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Freight Procurement & Rate Negotiation</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#26A69A22' }]}><Star size={12} color="#26A69A" /><Text style={[styles.badgeText, { color: '#26A69A' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Users size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Truck size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>Transport Dept</Text></View>
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
          The AI Freight Broker manages freight procurement & rate negotiation across the transportation and logistics network. This agent ensures optimal performance through its specialized sub-agents: Rate Negotiator, Carrier Qualifier, Lane Optimizer.
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
          Direct reports executing specialized functions under AI Freight Broker direction.
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

      <AgentFeatures agentId="ai-freight-broker" agentName="AI Freight Broker" />
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
