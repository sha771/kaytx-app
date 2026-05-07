import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  TrendingDown,
  Activity,
  DollarSign,
  Target,
  TrendingUp,
  Zap,
  ArrowRight,
  BarChart3,
  PieChart,
  Calculator,
  Receipt,
  ShoppingCart,
  Package,
  Scale,
  Crown,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Search,
  ClipboardList,
  Wallet,
  Percent
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function CostReductionAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Cost Savings', value: '$2.4M', change: '+15%', icon: DollarSign, color: '#10B981', trend: 'up' },
    { label: 'Expenses Audited', value: '1,234', change: '+89', icon: Receipt, color: '#6366F1', trend: 'up' },
    { label: 'Contracts Reviewed', value: '156', change: '+12', icon: FileText, color: '#FF9500', trend: 'up' },
    { label: 'ROI Achieved', value: '340%', change: '+45%', icon: TrendingUp, color: '#8B5CF6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Cost Reduction Rate', value: '24%', target: '20%', status: 'exceeding', icon: TrendingDown },
    { label: 'Budget Variance', value: '2.1%', target: '5%', status: 'exceeding', icon: Scale },
    { label: 'Vendor Savings', value: '$890K', target: '$750K', status: 'exceeding', icon: DollarSign },
    { label: 'Audit Accuracy', value: '99.2%', target: '98%', status: 'exceeding', icon: CheckCircle2 },
  ];

  const capabilities = [
    'Spend Analysis', 'Vendor Cost Benchmarking', 'Contract Optimization', 'Budget Variance Analysis',
    'Expense Pattern Recognition', 'Procurement Optimization', 'Waste Identification', 'ROI Modeling',
    'Cost Driver Analysis', 'Pricing Strategy Advisory', 'Operational Efficiency Assessment',
    'Resource Utilization Tracking', 'Cost Allocation Modeling', 'Savings Opportunity Scoring',
    'Financial Impact Forecasting'
  ];

  const responsibilities = [
    'Analyze organizational spending patterns across all administrative functions',
    'Identify cost reduction opportunities without compromising service quality',
    'Benchmark vendor costs against market rates and negotiate better terms',
    'Develop cost optimization strategies for office operations and facilities',
    'Monitor budget variances and provide real-time alerts for overspending',
    'Create detailed cost-benefit analyses for proposed initiatives',
    'Track and report on cost savings achievements against targets',
    'Audit expense reports for compliance and policy adherence',
    'Recommend process improvements to reduce operational costs',
    'Analyze procurement patterns to identify consolidation opportunities',
    'Develop pricing models for internal service chargebacks',
    'Monitor contract renewal dates and renegotiation opportunities',
    'Create executive dashboards for cost performance monitoring',
    'Support zero-based budgeting initiatives with data-driven insights',
    'Provide cost impact assessments for organizational change proposals'
  ];

  const activities = [
    { action: 'Identified $340K savings', target: 'Vendor contracts', time: '1 hour ago', icon: DollarSign },
    { action: 'Completed spend analysis', target: 'Q3 expenses', time: '3 hours ago', icon: BarChart3 },
    { action: 'Flagged 12 budget variances', target: 'Department budgets', time: '5 hours ago', icon: AlertTriangle },
    { action: 'Optimized procurement', target: 'Office supplies', time: '1 day ago', icon: ShoppingCart },
    { action: 'Audited 45 expense reports', target: 'Compliance check', time: '2 days ago', icon: ClipboardList },
    { action: 'Negotiated rate reduction', target: 'IT services', time: '3 days ago', icon: Percent },
  ];

  const quickActions = [
    { label: 'Spend Analysis', icon: BarChart3, color: '#6366F1' },
    { label: 'Vendor Review', icon: ShoppingCart, color: '#10B981' },
    { label: 'Budget Check', icon: Wallet, color: '#FF9500' },
    { label: 'Cost Audit', icon: Search, color: '#8B5CF6' },
    { label: 'Savings Report', icon: DollarSign, color: '#F59E0B' },
    { label: 'Contract Review', icon: FileText, color: '#3B82F6' },
    { label: 'ROI Calculator', icon: Calculator, color: '#EC4899' },
    { label: 'Expense Track', icon: Receipt, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#5D403715' }]}>
          <TrendingDown size={48} color="#5D4037" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Cost Reduction Analyst</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Cost optimization and spend analysis specialist
        </Text>
        <View style={styles.badgesContainer}>
          <View style={[styles.badge, { backgroundColor: '#34C75920' }]}>
            <Activity size={14} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#5D403720' }]}>
            <Crown size={14} color="#5D4037" />
            <Text style={[styles.badgeText, { color: '#5D4037' }]}>Sub-Agent</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#6366F120' }]}>
            <Sparkles size={14} color="#6366F1" />
            <Text style={[styles.badgeText, { color: '#6366F1' }]}>AI-Powered</Text>
          </View>
        </View>
      </View>

      {/* Parent Agent Navigation */}
      <TouchableOpacity style={[styles.parentCard, { backgroundColor: colors.card }]} onPress={() => router.push('/ai-agent/administrative/chief-administrative-officer')}>
        <View style={[styles.parentIcon, { backgroundColor: '#5D403715' }]}>
          <Crown size={24} color="#5D4037" />
        </View>
        <View style={styles.parentInfo}>
          <Text style={[styles.parentLabel, { color: colors.textSecondary }]}>Reports to</Text>
          <Text style={[styles.parentName, { color: colors.text }]}>AI Chief Administrative Officer</Text>
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
                <View style={[styles.kpiIcon, { backgroundColor: '#5D403715' }]}>
                  <kpi.icon size={16} color="#5D4037" />
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
          The AI Cost Reduction Analyst identifies and realizes cost-saving opportunities across all administrative functions. 
          This agent uses advanced analytics to analyze spending patterns, benchmark vendor costs, and recommend optimizations 
          that maintain service quality while reducing operational expenses.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#10B98115' }]}>
              <Text style={[styles.tagText, { color: '#10B981' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Responsibilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((resp, index) => (
          <View key={index} style={styles.responsibilityItem}>
            <View style={[styles.bullet, { backgroundColor: '#5D4037' }]} />
            <Text style={[styles.responsibilityText, { color: colors.textSecondary }]}>{resp}</Text>
          </View>
        ))}
      </View>

      {/* Activity Feed */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Activity</Text>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: '#5D403715' }]}>
              <activity.icon size={16} color="#5D4037" />
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
      <AgentFeatures agentId="cost-reduction-analyst" agentName="AI Cost Reduction Analyst" />

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
