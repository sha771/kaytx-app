import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Calculator, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, DollarSign, BarChart3, Key } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  {
    "id": "options-pricer",
    "name": "Options Pricer",
    "icon": "Calculator",
    "desc": "Real-time options pricing with multiple model support"
  },
  {
    "id": "greeks-calculator",
    "name": "Greeks Calculator",
    "icon": "BarChart3",
    "desc": "Portfolio-level Greeks aggregation and sensitivity analysis"
  },
  {
    "id": "volatility-surface-mapper",
    "name": "Volatility Surface Mapper",
    "icon": "TrendingUp",
    "desc": "Implied vol surface construction, fitting, and arbitrage detection"
  }
];

const QUICK_ACTIONS = [
  {
    "label": "Greeks Dashboard",
    "icon": "ChartBarBig"
  },
  {
    "label": "Vol Surface",
    "icon": "TrendingUp"
  },
  {
    "label": "Pricing Engine",
    "icon": "Calculator"
  },
  {
    "label": "Margin Report",
    "icon": "FileText"
  }
];

const METRICS = [
  {
    "label": "Options Delta",
    "value": "$12M",
    "change": "-$2M",
    "trend": "up"
  },
  {
    "label": "Vega Exposure",
    "value": "$8.4M",
    "change": "-$1.2M",
    "trend": "up"
  },
  {
    "label": "Margin Usage",
    "value": "68%",
    "change": "-4%",
    "trend": "up"
  },
  {
    "label": "Pricing Speed",
    "value": "0.1ms",
    "change": "-0.02ms",
    "trend": "up"
  }
];

export default function DerivativesSpecialistPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    {
        label: 'Notional',
        value: '$8.4B',
        icon: 'DollarSign',
        color: '#34C759'
    },
    {
        label: 'Contracts',
        value: '2,847',
        icon: 'CircleCheckBig',
        color: '#007AFF'
    },
    {
        label: 'Greeks',
        value: 'Real-time',
        icon: 'Activity',
        color: '#FF9500'
    },
    {
        label: 'Pricing',
        value: '0.1ms',
        icon: 'Clock',
        color: '#AF52DE'
    }
];

  const capabilities = ["Options Pricing","Greeks Management","Volatility Trading","Swap Execution","Structured Products","Exotic Derivatives","Curve Modeling","Hedging Strategies","Margin Management","Counterparty Risk","Pricing Models","OTC Negotiation"];

  const responsibilities = ["Price and manage options portfolios using Black-Scholes and local/stochastic vol models","Monitor and manage Greeks exposure across all derivatives positions","Execute volatility surface arbitrage and term structure strategies","Structure and price exotic derivatives and custom OTC products","Manage swap execution and interest rate curve modeling","Implement dynamic hedging strategies for portfolio protection","Monitor margin requirements and collateral management","Assess counterparty risk for OTC derivative positions","Report derivatives P&L, risk, and regulatory metrics"];

  const activities = [
    {
        time: '1 min ago',
        text: 'Re-priced SPX options surface after vol shift',
        icon: 'Calculator'
    },
    {
        time: '4 min ago',
        text: 'Rebalanced delta hedge for large options book',
        icon: 'Zap'
    },
    {
        time: '10 min ago',
        text: 'Updated volatility surface parameters',
        icon: 'TrendingUp'
    },
    {
        time: '22 min ago',
        text: 'Executed interest rate swap for duration mgmt',
        icon: 'Activity'
    },
    {
        time: '1 hr ago',
        text: 'Published daily Greeks and margin report',
        icon: 'FileText'
    }
];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510020' }]}>
          <Calculator size={48} color="#E65100" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{a.t}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{a.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}>
            <Star size={12} color="#E65100" />
            <Text style={[styles.badgeText, { color: '#E65100' }]}>Specialist</Text>
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
          The AI Derivatives Specialist provides enterprise-level capabilities within the Trading & Investments department, driving operational excellence and strategic decision-making across all assigned domains. This agent orchestrates sub-agents for specialized execution and reporting.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#E6510018' }]}>
              <Text style={[styles.tagText, { color: '#E65100' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#E65100" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Hierarchy */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents that execute functions under Derivatives Specialist direction.
        </Text>
        <TouchableOpacity
          key="options-pricer"
          onPress={() => router.push('/ai-agent/trading/sub-agents/options-pricer')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#E6510020' }]}>
            <Calculator size={28} color="#E65100" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="greeks-calculator"
          onPress={() => router.push('/ai-agent/trading/sub-agents/greeks-calculator')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#E6510020' }]}>
            <BarChart3 size={28} color="#E65100" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="volatility-surface-mapper"
          onPress={() => router.push('/ai-agent/trading/sub-agents/volatility-surface-mapper')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#E6510020' }]}>
            <TrendingUp size={28} color="#E65100" />
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
          <View key="Options Delta" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>-$2M</Text>
              </View>
            </View>
          <View key="Vega Exposure" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>-$1.2M</Text>
              </View>
            </View>
          <View key="Margin Usage" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>-4%</Text>
              </View>
            </View>
          <View key="Pricing Speed" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>-0.02ms</Text>
              </View>
            </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#E6510015' }]}>
              <act.icon size={14} color="#E65100" />
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
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#E6510012' }]}>
              <action.icon size={24} color="#E65100" />
              <Text style={[styles.actionText, { color: '#E65100' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="derivatives-specialist" agentName="AI Derivatives Specialist" />
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
