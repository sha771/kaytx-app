import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Globe, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, DollarSign, Key } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  {
    "id": "currency-pair-analyzer",
    "name": "Currency Pair Analyzer",
    "icon": "Globe",
    "desc": "Technical and fundamental analysis across FX pairs"
  },
  {
    "id": "fx-hedging-coordinator",
    "name": "FX Hedging Coordinator",
    "icon": "Shield",
    "desc": "Automated hedge ratio management and overlay execution"
  },
  {
    "id": "cross-border-payment-optimizer",
    "name": "Cross-border Payment Optimizer",
    "icon": "DollarSign",
    "desc": "Settlement route optimization and FX conversion management"
  }
];

const QUICK_ACTIONS = [
  {
    "label": "FX Dashboard",
    "icon": "ChartBarBig"
  },
  {
    "label": "Hedge Manager",
    "icon": "Shield"
  },
  {
    "label": "CB Calendar",
    "icon": "Calendar"
  },
  {
    "label": "Payment Queue",
    "icon": "DollarSign"
  }
];

const METRICS = [
  {
    "label": "FX Volume",
    "value": "$4.2B",
    "change": "+$600M",
    "trend": "up"
  },
  {
    "label": "Hedge Ratio",
    "value": "94%",
    "change": "+2%",
    "trend": "up"
  },
  {
    "label": "Carry Yield",
    "value": "+8.4%",
    "change": "+0.6%",
    "trend": "up"
  },
  {
    "label": "FX Slippage",
    "value": "0.2bps",
    "change": "-0.1bps",
    "trend": "up"
  }
];

export default function ForexTraderPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    {
        label: 'Volume',
        value: '$4.2B',
        icon: 'DollarSign',
        color: '#34C759'
    },
    {
        label: 'Pairs',
        value: '42',
        icon: 'Target',
        color: '#007AFF'
    },
    {
        label: 'Carry PnL',
        value: '+8.4%',
        icon: 'TrendingUp',
        color: '#FF9500'
    },
    {
        label: 'Hedged',
        value: '94%',
        icon: 'Shield',
        color: '#AF52DE'
    }
];

  const capabilities = ["FX Spot Trading","Forward Contracts","Currency Hedging","Carry Trade","Cross-border Payments","Swap Execution","NDF Trading","Emerging Market FX","Options Hedging","Yield Curve Analysis","Central Bank Analysis","Geopolitical Assessment"];

  const responsibilities = ["Execute FX spot, forward, and swap transactions across 42 currency pairs","Implement currency hedging strategies for portfolio protection","Manage carry trade positions and roll yield optimization","Coordinate cross-border payment processing and settlement","Trade non-deliverable forwards for emerging market exposure","Execute options-based hedging for tail risk protection","Analyze central bank policy signals and yield curve dynamics","Monitor geopolitical risks affecting currency markets","Report FX exposure, P&L, and hedge effectiveness metrics"];

  const activities = [
    {
        time: '2 min ago',
        text: 'Hedged EUR/USD exposure for $200M portfolio',
        icon: 'Shield'
    },
    {
        time: '6 min ago',
        text: 'Rolled JPY carry trade position forward',
        icon: 'DollarSign'
    },
    {
        time: '12 min ago',
        text: 'Processed cross-border CNY payment',
        icon: 'Globe'
    },
    {
        time: '25 min ago',
        text: 'Adjusted NDF position on TRY',
        icon: 'TrendingUp'
    },
    {
        time: '1 hr ago',
        text: 'Published weekly FX exposure report',
        icon: 'FileText'
    }
];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#00897B20' }]}>
          <Globe size={48} color="#00897B" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{a.t}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{a.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#00897B22' }]}>
            <Star size={12} color="#00897B" />
            <Text style={[styles.badgeText, { color: '#00897B' }]}>Specialist</Text>
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
          The AI Forex Trader provides enterprise-level capabilities within the Trading & Investments department, driving operational excellence and strategic decision-making across all assigned domains. This agent orchestrates sub-agents for specialized execution and reporting.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#00897B18' }]}>
              <Text style={[styles.tagText, { color: '#00897B' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#00897B" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Hierarchy */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents that execute functions under Forex Trader direction.
        </Text>
        <TouchableOpacity
          key="currency-pair-analyzer"
          onPress={() => router.push('/ai-agent/trading/sub-agents/currency-pair-analyzer')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#00897B20' }]}>
            <Globe size={28} color="#00897B" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="fx-hedging-coordinator"
          onPress={() => router.push('/ai-agent/trading/sub-agents/fx-hedging-coordinator')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#00897B20' }]}>
            <Shield size={28} color="#00897B" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="cross-border-payment-optimizer"
          onPress={() => router.push('/ai-agent/trading/sub-agents/cross-border-payment-optimizer')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#00897B20' }]}>
            <DollarSign size={28} color="#00897B" />
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
          <View key="FX Volume" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+$600M</Text>
              </View>
            </View>
          <View key="Hedge Ratio" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+2%</Text>
              </View>
            </View>
          <View key="Carry Yield" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+0.6%</Text>
              </View>
            </View>
          <View key="FX Slippage" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>-0.1bps</Text>
              </View>
            </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#00897B15' }]}>
              <act.icon size={14} color="#00897B" />
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
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#00897B12' }]}>
              <action.icon size={24} color="#00897B" />
              <Text style={[styles.actionText, { color: '#00897B' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="forex-trader" agentName="AI Forex Trader" />
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
