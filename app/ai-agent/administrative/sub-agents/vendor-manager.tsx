import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Store,
  Activity,
  DollarSign,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  ArrowRight,
  Briefcase,
  Star,
  CheckCircle2,
  AlertTriangle,
  Handshake,
  FileText,
  Crown,
  Sparkles,
  BarChart3,
  Users,
  Clock,
  Percent,
  Shield,
  Search,
  Award,
  RefreshCw
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function VendorManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Active Vendors', value: '47', change: '+3', icon: Store, color: '#0EA5E9', trend: 'up' },
    { label: 'Contract Savings', value: '$890K', change: '+12%', icon: DollarSign, color: '#10B981', trend: 'up' },
    { label: 'Vendor Score', value: '4.6/5', change: '+0.2', icon: Star, color: '#F59E0B', trend: 'up' },
    { label: 'On-Time Delivery', value: '94%', change: '+3%', icon: CheckCircle2, color: '#8B5CF6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Cost Savings Achieved', value: '$890K', target: '$750K', status: 'exceeding', icon: DollarSign },
    { label: 'Vendor Performance', value: '4.6/5', target: '4.5/5', status: 'exceeding', icon: Star },
    { label: 'Contract Compliance', value: '98%', target: '95%', status: 'exceeding', icon: CheckCircle2 },
    { label: 'Risk Incidents', value: '0', target: '<2', status: 'exceeding', icon: Shield },
  ];

  const capabilities = [
    'Vendor Selection & Vetting', 'Contract Negotiation', 'Performance Scorecard Management', 'Relationship Health Monitoring',
    'Spend Analysis & Optimization', 'Vendor Risk Assessment', 'Compliance Auditing', 'Market Rate Benchmarking',
    'Purchase Order Management', 'Invoice Reconciliation', 'Vendor Consolidation Analysis', 'Sustainability Scoring',
    'Service Level Agreement Tracking', 'Renewal Management', 'Dispute Resolution Support'
  ];

  const responsibilities = [
    'Manage full vendor lifecycle from selection to offboarding',
    'Negotiate contracts to achieve optimal pricing and terms',
    'Monitor vendor performance against SLAs and KPIs',
    'Conduct regular vendor risk assessments and audits',
    'Maintain vendor master data and documentation',
    'Analyze spend patterns to identify consolidation opportunities',
    'Benchmark vendor costs against market rates',
    'Coordinate vendor performance review meetings',
    'Track contract renewals and renegotiation opportunities',
    'Resolve vendor disputes and service issues',
    'Ensure vendor compliance with policies and regulations',
    'Develop vendor scorecards for performance tracking',
    'Recommend vendor additions or terminations based on data',
    'Support sustainability initiatives through vendor selection',
    'Create executive reports on vendor landscape and performance'
  ];

  const activities = [
    { action: 'Negotiated 15% discount', target: 'IT services contract', time: '2 hours ago', icon: Handshake },
    { action: 'Onboarded 2 vendors', target: 'Office supplies', time: '4 hours ago', icon: Users },
    { action: 'Completed vendor audit', target: 'Security vendor', time: '6 hours ago', icon: CheckCircle2 },
    { action: 'Flagged performance issue', target: 'Cleaning services', time: '1 day ago', icon: AlertTriangle },
    { action: 'Renewed 5 contracts', target: 'Annual agreements', time: '2 days ago', icon: FileText },
    { action: 'Benchmarked rates', target: 'Catering services', time: '3 days ago', icon: BarChart3 },
  ];

  const quickActions = [
    { label: 'Add Vendor', icon: Store, color: '#0EA5E9' },
    { label: 'Negotiate', icon: Handshake, color: '#10B981' },
    { label: 'Performance', icon: Star, color: '#F59E0B' },
    { label: 'Audit Vendor', icon: Search, color: '#8B5CF6' },
    { label: 'Contract Review', icon: FileText, color: '#3B82F6' },
    { label: 'Rate Benchmark', icon: BarChart3, color: '#EC4899' },
    { label: 'Risk Assessment', icon: Shield, color: '#EF4444' },
    { label: 'Renewal Check', icon: RefreshCw, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#6D4C4115' }]}>
          <Store size={48} color="#6D4C41" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Vendor Manager</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Vendor relationship and procurement specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4120' }]}>
            <Crown size={14} color="#6D4C41" />
            <Text style={[styles.badgeText, { color: '#6D4C41' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/administrative/vp-admin-operations')}>
        <View style={[styles.parentIcon, { backgroundColor: '#6D4C4115' }]}>
          <Briefcase size={24} color="#6D4C41" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI VP Admin Operations</Text>
        </View>
        <ArrowRight size={20} color={colors.textSecondary} />
      </TouchableOpacity>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { backgroundColor: colors.card }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '15' }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <View style={[styles.changeBadge, { backgroundColor: stat.trend === 'up' ? '#34C75915' : '#FF3B3015' }]}>
                {stat.trend === 'up' ? <TrendingUp size={12} color="#34C759" /> : <TrendingDown size={12} color="#FF3B30" />}
                <Text style={[styles.changeText, { color: stat.trend === 'up' ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
              </View>
            </View>
            <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* KPIs Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={styles.kpiCard}>
              <View style={styles.kpiHeader}>
                <View style={[styles.kpiIcon, { backgroundColor: '#6D4C4115' }]}>
                  <kpi.icon size={16} color="#6D4C41" />
                </View>
                <View style={[styles.statusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75915' : kpi.status === 'meeting' ? '#007AFF15' : '#FF950015' }]}>
                  <Text style={[styles.statusText, { color: kpi.status === 'exceeding' ? '#34C759' : kpi.status === 'meeting' ? '#007AFF' : '#FF9500' }]}>
                    {kpi.status === 'exceeding' ? 'Exceeding' : kpi.status === 'meeting' ? 'On Track' : 'At Risk'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.kpiValue, { color: colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: colors.textSecondary }]}>{kpi.label}</Text>
              <Text style={[styles.kpiTarget, { color: colors.textSecondary }]}>Target: {kpi.target}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Overview</Text>
        <Text style={[styles.overviewText, { color: colors.textSecondary }]}>
          The AI Vendor Manager oversees vendor relationships, manages procurement processes, and ensures optimal 
          vendor performance and cost-effectiveness. This agent handles the full vendor lifecycle from selection 
          through contract negotiation to ongoing performance monitoring.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#0EA5E915' }]}>
              <Text style={[styles.tagText, { color: '#0EA5E9' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#6D4C41' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#6D4C4115' }]}>
              <activity.icon size={16} color="#6D4C41" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityAction, { color: colors.text }]}>{activity.action}</Text>
              <Text style={[styles.activityTarget, { color: colors.textSecondary }]}>{activity.target}</Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>{activity.time}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: action.color + '10' }]}>
              <action.icon size={20} color={action.color} />
              <Text style={[styles.actionText, { color: action.color }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Agent Features */}
      <AgentFeatures agentId="vendor-manager" agentName="AI Vendor Manager" />

      <View style={{ height: 30 }} />
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
  endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  endpointText: { fontSize: 13, fontFamily: 'monospace' },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
