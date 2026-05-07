import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, AlertTriangle, ArrowRight, Briefcase, Calendar, ChartBarBig, ChevronRight, Clock, DollarSign, Factory, FileText, ListFilter, MessageSquare, Search, Settings, Shield, Star, Target, TrendingUp, Truck, Users, Zap
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const CAPABILITIES = [
  'Production Scheduling',
  'Order Sequencing',
  'Priority Management',
  'Resource Allocation',
  'Timeline Optimization',
  'Schedule Adherence',
  'Changeover Planning',
  'Delivery Commitment',
];

const RESPONSIBILITIES = [
  'Create and maintain production schedules for all lines',
  'Sequence production orders for optimal throughput',
  'Manage priority orders and expedite requests',
  'Allocate resources including labor, materials, and equipment',
  'Optimize timelines and delivery commitments',
  'Monitor schedule adherence and flag deviations',
  'Plan changeovers to minimize downtime',
  'Coordinate with planning and logistics for delivery dates',
];

const ACTIVITIES = [
  { time: '5 min ago', text: 'Created weekly schedule for 4 production lines', icon: Calendar },
  { time: '15 min ago', text: 'Sequenced 24 orders optimizing changeover time', icon: ListFilter },
  { time: '30 min ago', text: 'Managed 3 priority expedite requests', icon: AlertTriangle },
  { time: '1 hour ago', text: 'Monitored schedule adherence at 96.4%', icon: ChartBarBig },
  { time: '3 hours ago', text: 'Coordinated delivery dates with logistics', icon: Truck },
];

const ENDPOINTS = [
  '/consult/production-scheduler',
  '/production-scheduler/execute',
  '/production-scheduler/analyze',
];

export default function ProductionSchedulerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#6366F120' }]}>
          <Calendar size={56} color="#6366F1" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Production Scheduler</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI Production Manager</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F122' }]}>
            <Briefcase size={12} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>Specialist</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Star size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>20x Efficiency</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {[
          { label: 'Status', value: 'Active', icon: Activity, color: '#34C759' },
          { label: 'Level', value: 'Specialist', icon: Briefcase, color: '#6366F1' },
          { label: 'Efficiency', value: '20x', icon: Target, color: '#FF9500' },
          { label: 'Parent', value: 'Production Manager', icon: Factory, color: '#007AFF' }
        ].map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <stat.icon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Overview */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          AI Production Scheduler - Sub-agent supporting AI Production Manager. Part of the Kaytx AI Workforce hierarchy providing specialized capabilities including production scheduling, order sequencing, priority management, and more.
        </Text>
      </View>

      {/* Core Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {CAPABILITIES.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#6366F118' }]}>
              <Text style={[styles.tagText, { color: '#6366F1' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {RESPONSIBILITIES.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#6366F1" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* A2A Endpoints */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>
        {ENDPOINTS.map((endpoint, index) => (
          <View key={index} style={styles.endpointRow}>
            <Zap size={14} color="#8B5CF6" />
            <Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{endpoint}</Text>
          </View>
        ))}
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {ACTIVITIES.map((act, index) => (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#6366F115' }]}>
              <act.icon size={14} color="#6366F1" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Parent Agent */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/manufacturing/production-manager')} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
          <Factory size={24} color="#6366F1" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Production Manager</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Main Agent</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="production-scheduler" agentName="AI Production Scheduler" />
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
  description: { fontSize: 14, lineHeight: 22 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
