import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Briefcase, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, DollarSign, PieChart, BarChart3, Key } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  {
    "id": "investment-strategy-advisor",
    "name": "Investment Strategy Advisor",
    "icon": "TrendingUp",
    "desc": "Strategic investment framework development and alpha signal research"
  },
  {
    "id": "portfolio-allocation-director",
    "name": "Portfolio Allocation Director",
    "icon": "PieChart",
    "desc": "Multi-asset allocation optimization and rebalancing execution"
  },
  {
    "id": "market-outlook-analyst",
    "name": "Market Outlook Analyst",
    "icon": "BarChart3",
    "desc": "Macro market forecasting and economic indicator analysis"
  }
];

const QUICK_ACTIONS = [
  {
    "label": "Investment Dashboard",
    "icon": "ChartBarBig"
  },
  {
    "label": "Committee Chat",
    "icon": "MessageSquare"
  },
  {
    "label": "Strategy Review",
    "icon": "Calendar"
  },
  {
    "label": "Risk Settings",
    "icon": "Shield"
  }
];

const METRICS = [
  {
    "label": "Portfolio Returns",
    "value": "+18.4%",
    "change": "+2.3%",
    "trend": "up"
  },
  {
    "label": "Risk-Adj Alpha",
    "value": "2.14",
    "change": "+0.12",
    "trend": "up"
  },
  {
    "label": "AUM Growth",
    "value": "+24%",
    "change": "+6%",
    "trend": "up"
  },
  {
    "label": "Sharpe Ratio",
    "value": "1.87",
    "change": "+0.08",
    "trend": "up"
  }
];

export default function ChiefInvestmentOfficerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    {
        label: 'AUM',
        value: '$2.4B',
        icon: 'DollarSign',
        color: '#34C759'
    },
    {
        label: 'Uptime',
        value: '99.99%',
        icon: 'Activity',
        color: '#007AFF'
    },
    {
        label: 'Strategies',
        value: '48',
        icon: 'Target',
        color: '#FF9500'
    },
    {
        label: 'Accuracy',
        value: '97.8%',
        icon: 'TrendingUp',
        color: '#AF52DE'
    }
];

  const capabilities = ["Investment Strategy","Portfolio Oversight","Risk Management","Asset Allocation","Performance Analysis","Regulatory Compliance","Capital Allocation","Due Diligence","M&A Oversight","Alpha Generation","Factor Modeling","Board Reporting"];

  const responsibilities = ["Define and oversee firm-wide investment strategy and policy","Lead portfolio construction, asset allocation, and rebalancing frameworks","Manage investment risk, drawdown limits, and stress-testing protocols","Direct quantitative research, alpha generation, and factor modeling","Ensure regulatory compliance across all investment activities","Oversee M&A, private equity, and alternative investment due diligence","Chair the Investment Committee and coordinate deal flow","Report investment performance to the board and stakeholders","Drive ESG integration across investment portfolios and mandates"];

  const activities = [
    {
        time: '2 min ago',
        text: 'Approved Q3 strategic asset allocation shift',
        icon: 'CircleCheckBig'
    },
    {
        time: '5 min ago',
        text: 'Reviewed private equity due diligence pipeline',
        icon: 'Clock'
    },
    {
        time: '12 min ago',
        text: 'Updated risk budget and VaR thresholds',
        icon: 'Zap'
    },
    {
        time: '28 min ago',
        text: 'Published monthly CIO investment letter',
        icon: 'FileText'
    },
    {
        time: '1 hr ago',
        text: 'Chaired Investment Committee quarterly review',
        icon: 'Users'
    }
];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#0277BD20' }]}>
          <Briefcase size={48} color="#0277BD" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{a.t}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{a.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#0277BD22' }]}>
            <Star size={12} color="#0277BD" />
            <Text style={[styles.badgeText, { color: '#0277BD' }]}>C-Suite</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}>
            <Users size={12} color="#FF9500" />
            <Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Sub-Agents</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}>
            <Shield size={12} color="#AF52DE" />
            <Text style={[styles.badgeText, { color: '#AF52DE' }]}>Trading Dept</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat, i) => (
          <View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
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
          The AI Chief Investment Officer provides enterprise-level capabilities within the Trading & Investments department, driving operational excellence and strategic decision-making across all assigned domains. This agent orchestrates sub-agents for specialized execution and reporting.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#0277BD18' }]}>
              <Text style={[styles.tagText, { color: '#0277BD' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#0277BD" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Hierarchy */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents that execute functions under Investment Officer direction.
        </Text>
        <TouchableOpacity
          key="investment-strategy-advisor"
          onPress={() => router.push('/ai-agent/trading/sub-agents/investment-strategy-advisor')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#0277BD20' }]}>
            <TrendingUp size={28} color="#0277BD" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="portfolio-allocation-director"
          onPress={() => router.push('/ai-agent/trading/sub-agents/portfolio-allocation-director')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#0277BD20' }]}>
            <PieChart size={28} color="#0277BD" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="market-outlook-analyst"
          onPress={() => router.push('/ai-agent/trading/sub-agents/market-outlook-analyst')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#0277BD20' }]}>
            <BarChart3 size={28} color="#0277BD" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Performance Metrics */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          <View key="Portfolio Returns" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+2.3%</Text>
              </View>
            </View>
          <View key="Risk-Adj Alpha" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+0.12</Text>
              </View>
            </View>
          <View key="AUM Growth" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+6%</Text>
              </View>
            </View>
          <View key="Sharpe Ratio" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+0.08</Text>
              </View>
            </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#0277BD15' }]}>
              <act.icon size={14} color="#0277BD" />
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
          {QUICK_ACTIONS.map((action, i) => (
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#0277BD12' }]}>
              <action.icon size={24} color="#0277BD" />
              <Text style={[styles.actionText, { color: '#0277BD' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="chief-investment-officer" agentName="AI Chief Investment Officer" />
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
