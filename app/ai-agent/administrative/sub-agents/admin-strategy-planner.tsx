import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Building2,
  Activity,
  Briefcase,
  Target,
  TrendingUp,
  TrendingDown,
  Zap,
  ArrowRight,
  BarChart3,
  Lightbulb,
  ClipboardCheck,
  Users,
  Clock,
  FileText,
  LayoutDashboard,
  Settings,
  Crown,
  Sparkles,
  PieChart,
  Calendar,
  CheckCircle2,
  MessageSquare
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

export default function AdminStrategyPlannerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const colors = theme.colors;

  const stats = [
    { label: 'Strategies Created', value: '234', change: '+18%', icon: Lightbulb, color: '#6366F1', trend: 'up' },
    { label: 'Process Plans', value: '89', change: '+12%', icon: ClipboardCheck, color: '#34C759', trend: 'up' },
    { label: 'Departments Aligned', value: '15', change: '+3', icon: Building2, color: '#FF9500', trend: 'up' },
    { label: 'Efficiency Gain', value: '34%', change: '+8%', icon: TrendingUp, color: '#8B5CF6', trend: 'up' },
  ];

  const kpis = [
    { label: 'Strategic Alignment Score', value: '94%', target: '90%', status: 'exceeding', icon: Target },
    { label: 'Planning Cycle Time', value: '3 days', target: '5 days', status: 'exceeding', icon: Clock },
    { label: 'Stakeholder Satisfaction', value: '4.8/5', target: '4.5/5', status: 'exceeding', icon: Users },
    { label: 'Cost Per Strategy', value: '$2.4K', target: '$3K', status: 'exceeding', icon: PieChart },
  ];

  const capabilities = [
    'Strategic Roadmapping', 'Organizational Design', 'Resource Allocation Planning',
    'Change Management Strategy', 'Process Architecture', 'Policy Framework Development',
    'Operational Modeling', 'Stakeholder Analysis', 'Risk Assessment', 'Scenario Planning',
    'Performance Benchmarking', 'KPI Framework Design', 'Cross-Functional Coordination',
    'Digital Transformation Planning', 'Governance Structure Design'
  ];

  const responsibilities = [
    'Develop comprehensive administrative strategies aligned with business objectives',
    'Create multi-year operational roadmaps with clear milestones and deliverables',
    'Design organizational structures optimized for efficiency and collaboration',
    'Conduct capacity planning and resource allocation across departments',
    'Build strategic frameworks for cross-functional initiatives',
    'Facilitate strategic planning sessions with leadership teams',
    'Monitor strategic initiative progress and provide realignment recommendations',
    'Analyze industry trends and best practices for strategic incorporation',
    'Coordinate interdepartmental strategy alignment and integration',
    'Develop contingency plans and alternative strategic scenarios',
    'Create executive dashboards for strategic KPI monitoring',
    'Design governance frameworks for strategic decision-making',
    'Support M&A integration planning and cultural alignment',
    'Build change management strategies for major transformations',
    'Provide strategic advisory to C-suite on administrative matters'
  ];

  const activities = [
    { action: 'Created Q3 Strategic Roadmap', target: 'Operations Dept', time: '2 hours ago', icon: Calendar },
    { action: 'Aligned 5 department strategies', target: 'Cross-Functional', time: '4 hours ago', icon: Users },
    { action: 'Optimized resource allocation', target: '$2.3M budget', time: '6 hours ago', icon: PieChart },
    { action: 'Completed stakeholder interviews', target: '12 executives', time: '1 day ago', icon: MessageSquare },
    { action: 'Published policy framework', target: 'Company-wide', time: '2 days ago', icon: FileText },
    { action: 'Validated scenario models', target: '3 projections', time: '3 days ago', icon: CheckCircle2 },
  ];

  const quickActions = [
    { label: 'Create Strategy', icon: Lightbulb, color: '#6366F1' },
    { label: 'Align Departments', icon: Building2, color: '#34C759' },
    { label: 'Resource Plan', icon: PieChart, color: '#FF9500' },
    { label: 'Stakeholder Map', icon: Users, color: '#8B5CF6' },
    { label: 'Risk Assessment', icon: Target, color: '#F59E0B' },
    { label: 'KPI Dashboard', icon: BarChart3, color: '#10B981' },
    { label: 'Scenario Model', icon: LayoutDashboard, color: '#3B82F6' },
    { label: 'Policy Draft', icon: FileText, color: '#EC4899' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={[styles.iconContainer, { backgroundColor: '#5D403715' }]}>
          <Building2 size={48} color="#5D4037" />
        </View>
        <Text style={[styles.heroTitle, { color: colors.text }]}>AI Admin Strategy Planner</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
          Strategic planning and organizational design specialist
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
          The AI Admin Strategy Planner develops comprehensive administrative strategies aligned with organizational objectives. 
          This agent specializes in organizational design, resource allocation planning, and cross-functional coordination to ensure 
          all administrative functions operate with maximum efficiency and strategic alignment.
        </Text>
      </View>

      {/* Capabilities Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#6366F115' }]}>
              <Text style={[styles.tagText, { color: '#6366F1' }]}>{cap}</Text>
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
      <AgentFeatures agentId="admin-strategy-planner" agentName="AI Admin Strategy Planner" />

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
