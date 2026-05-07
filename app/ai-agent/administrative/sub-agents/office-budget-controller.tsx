import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  DollarSign,
  Activity,
  PiggyBank,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  ArrowRight,
  Briefcase,
  Receipt,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  FileText,
  Crown,
  Sparkles,
  BarChart3,
  CreditCard,
  Clock,
  Percent,
  Wallet,
  PieChart,
  RefreshCw
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function OfficeBudgetControllerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Budget Utilized', value: '$2.4M', change: '+8%', icon: DollarSign, color: '#10B981', trend: 'up' },
    { label: 'Under Budget', value: '$340K', change: '+5%', icon: PiggyBank, color: '#22C55E', trend: 'up' },
    { label: 'Expenses Tracked', value: '1,247', change: '+123', icon: Receipt, color: '#F59E0B', trend: 'up' },
    { label: 'Variance %', value: '2.1%', change: '-0.3%', icon: Percent, color: '#8B5CF6', trend: 'down' },
  ];

  const kpis = [
    { label: 'Budget Variance', value: '2.1%', target: '<5%', status: 'exceeding', icon: Percent },
    { label: 'Forecast Accuracy', value: '96%', target: '95%', status: 'exceeding', icon: Target },
    { label: 'Cost Savings', value: '$340K', target: '$300K', status: 'exceeding', icon: PiggyBank },
    { label: 'Approval Cycle Time', value: '18 hours', target: '24 hours', status: 'exceeding', icon: Clock },
  ];

  const capabilities = [
    'Budget Planning & Allocation', 'Real-Time Expense Tracking', 'Cost Forecasting & Modeling', 'Variance Analysis & Reporting',
    'Spend Optimization', 'Automated Approval Workflows', 'Multi-Currency Management', 'Purchase Requisition Management',
    'Invoice Processing & Matching', 'Budget Reallocation', 'Capital vs OpEx Tracking', 'Departmental Budget Controls',
    'Financial Compliance Monitoring', 'Audit Trail Generation', 'Executive Budget Dashboards'
  ];

  const responsibilities = [
    'Develop annual and quarterly office budgets with detailed line-item allocations',
    'Track all office expenses in real-time against budget categories',
    'Generate cost forecasts based on historical data and business projections',
    'Analyze budget variances and provide explanations for deviations',
    'Optimize spending through vendor consolidation and contract renegotiation',
    'Route purchase requests through appropriate approval workflows',
    'Generate monthly, quarterly, and annual financial reports for management',
    'Manage multi-currency transactions for international operations',
    'Process and reconcile vendor invoices against purchase orders',
    'Handle budget reallocations between departments and categories',
    'Track capital expenditures separately from operational expenses',
    'Implement departmental spending controls and approval hierarchies',
    'Ensure financial compliance with organizational policies',
    'Maintain complete audit trails for all budget transactions',
    'Create executive dashboards for real-time budget visibility'
  ];

  const activities = [
    { action: 'Approved expense request', target: 'IT equipment - $12,500', time: '30 mins ago', icon: CheckCircle2 },
    { action: 'Flagged overspending', target: 'Marketing dept - 12% over', time: '2 hours ago', icon: AlertTriangle },
    { action: 'Generated Q3 report', target: 'Variance analysis', time: '4 hours ago', icon: FileText },
    { action: 'Optimized allocation', target: 'Moved $50K to HR', time: '6 hours ago', icon: PieChart },
    { action: 'Processed 45 invoices', target: 'Total $78,300', time: '1 day ago', icon: Receipt },
    { action: 'Updated forecast', target: 'Q4 projections', time: '2 days ago', icon: BarChart3 },
  ];

  const quickActions = [
    { label: 'View Budget', icon: Wallet, color: '#10B981' },
    { label: 'Add Expense', icon: DollarSign, color: '#22C55E' },
    { label: 'Request Approval', icon: CheckCircle2, color: '#F59E0B' },
    { label: 'Variance Report', icon: BarChart3, color: '#8B5CF6' },
    { label: 'Forecast Update', icon: Target, color: '#3B82F6' },
    { label: 'Invoice Match', icon: Receipt, color: '#EC4899' },
    { label: 'Reallocate', icon: PieChart, color: '#F59E0B' },
    { label: 'Audit Trail', icon: FileText, color: '#10B981' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#6D4C4115' }]}>
          <DollarSign size={48} color="#6D4C41" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Office Budget Controller</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Budget management and financial compliance specialist
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
          The AI Office Budget Controller manages office budgets, tracks expenses, and ensures cost-effective operations 
          while maintaining financial compliance. This agent handles all aspects of budget management from planning and 
          allocation to real-time tracking and variance analysis.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#22C55E15' }]}>
              <Text style={[styles.tagText, { color: '#22C55E' }]}>{cap}</Text>
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
      <AgentFeatures agentId="office-budget-controller" agentName="AI Office Budget Controller" />

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
