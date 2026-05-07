import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Globe, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, MessageSquare, Calendar, ChartBarBig, TrendingUp, AlertTriangle, FileText, ChevronRight, Shield, BarChart3, Landmark, Key } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const SUB_AGENTS = [
  {
    "id": "economic-indicator-tracker",
    "name": "Economic Indicator Tracker",
    "icon": "BarChart3",
    "desc": "Real-time economic data tracking, nowcasting, and surprise index"
  },
  {
    "id": "central-bank-watcher",
    "name": "Central Bank Watcher",
    "icon": "Landmark",
    "desc": "Policy communication parsing, forward guidance tracking, and rate path modeling"
  },
  {
    "id": "geopolitical-risk-assessor",
    "name": "Geopolitical Risk Assessor",
    "icon": "Globe",
    "desc": "Geopolitical event monitoring, risk scoring, and scenario impact analysis"
  }
];

const QUICK_ACTIONS = [
  {
    "label": "Macro Dashboard",
    "icon": "ChartBarBig"
  },
  {
    "label": "CB Watcher",
    "icon": "Landmark"
  },
  {
    "label": "Geo Risk Map",
    "icon": "Globe"
  },
  {
    "label": "Research Notes",
    "icon": "FileText"
  }
];

const METRICS = [
  {
    "label": "Forecast Acc",
    "value": "94.2%",
    "change": "+1.4%",
    "trend": "up"
  },
  {
    "label": "Signal Lead",
    "value": "3.2 days",
    "change": "+0.4d",
    "trend": "up"
  },
  {
    "label": "Geo Risk Index",
    "value": "62",
    "change": "+8",
    "trend": "up"
  },
  {
    "label": "Recession Prob",
    "value": "18%",
    "change": "+3%",
    "trend": "up"
  }
];

export default function MacroAnalystPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    {
        label: 'Indicators',
        value: '847',
        icon: 'BarChart3',
        color: '#34C759'
    },
    {
        label: 'Countries',
        value: '42',
        icon: 'Globe',
        color: '#007AFF'
    },
    {
        label: 'Forecasts',
        value: '94.2%',
        icon: 'Target',
        color: '#FF9500'
    },
    {
        label: 'Alerts',
        value: '12',
        icon: 'AlertTriangle',
        color: '#AF52DE'
    }
];

  const capabilities = ["Economic Indicators","Central Bank Analysis","Geopolitical Risk","Yield Curve Analysis","Inflation Forecasting","Currency Analysis","Trade Flow Analysis","Fiscal Policy","Commodity Markets","Sovereign Risk","Emerging Markets","Recession Indicators"];

  const responsibilities = ["Track and analyze 847+ economic indicators across 42 countries","Monitor central bank communications and policy shift signals","Assess geopolitical risks and their impact on financial markets","Analyze yield curve dynamics and recession probability models","Forecast inflation trends using Phillips curve and nowcasting models","Evaluate currency fair value and purchasing power parity deviations","Analyze trade flow data and supply chain disruption impacts","Assess sovereign risk and fiscal sustainability metrics","Produce macro research reports and investment committee briefings"];

  const activities = [
    {
        time: '2 min ago',
        text: 'Updated US CPI nowcast to 3.2%',
        icon: 'BarChart3'
    },
    {
        time: '6 min ago',
        text: 'Detected ECB policy shift signal in speech',
        icon: 'Landmark'
    },
    {
        time: '14 min ago',
        text: 'Raised geopolitical risk score for MENA region',
        icon: 'Globe'
    },
    {
        time: '28 min ago',
        text: 'Updated yield curve recession probability',
        icon: 'TrendingUp'
    },
    {
        time: '1 hr ago',
        text: 'Published weekly macro research briefing',
        icon: 'FileText'
    }
];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Hero */}
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#00838F20' }]}>
          <Globe size={48} color="#00838F" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{a.t}</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>{a.sub}</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}>
            <Activity size={12} color="#34C759" />
            <Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: '#00838F22' }]}>
            <Star size={12} color="#00838F" />
            <Text style={[styles.badgeText, { color: '#00838F' }]}>Analyst</Text>
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
          The AI Macro Analyst provides enterprise-level capabilities within the Trading & Investments department, driving operational excellence and strategic decision-making across all assigned domains. This agent orchestrates sub-agents for specialized execution and reporting.
        </Text>
      </View>

      {/* Capabilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Enterprise Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#00838F18' }]}>
              <Text style={[styles.tagText, { color: '#00838F' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Key Responsibilities */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#00838F" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Sub-Agents Hierarchy */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents Hierarchy</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
          Direct reports and specialized sub-agents that execute functions under Macro Analyst direction.
        </Text>
        <TouchableOpacity
          key="economic-indicator-tracker"
          onPress={() => router.push('/ai-agent/trading/sub-agents/economic-indicator-tracker')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#00838F20' }]}>
            <BarChart3 size={28} color="#00838F" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="central-bank-watcher"
          onPress={() => router.push('/ai-agent/trading/sub-agents/central-bank-watcher')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#00838F20' }]}>
            <Landmark size={28} color="#00838F" />
          </View>
          <View style={styles.agentInfo}>
            <Text style={[styles.agentName, { color: theme.colors.text }]}>{s.n}</Text>
            <Text style={[styles.agentDesc, { color: theme.colors.textSecondary }]}>{s.d}</Text>
          </View>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          key="geopolitical-risk-assessor"
          onPress={() => router.push('/ai-agent/trading/sub-agents/geopolitical-risk-assessor')}
          style={[styles.agentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}
        >
          <View style={[styles.agentIcon, { backgroundColor: '#00838F20' }]}>
            <Globe size={28} color="#00838F" />
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
          <View key="Forecast Acc" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+1.4%</Text>
              </View>
            </View>
          <View key="Signal Lead" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+0.4d</Text>
              </View>
            </View>
          <View key="Geo Risk Index" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+8</Text>
              </View>
            </View>
          <View key="Recession Prob" style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.v}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.l}</Text>
              <View style={styles.metricTrend}>
                <TrendingUp size={12} color="#34C759" />
                <Text style={{ fontSize: 11, color: '#34C759', fontWeight: '600' }}>+3%</Text>
              </View>
            </View>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
        {activities.map((act, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: '#00838F15' }]}>
              <act.icon size={14} color="#00838F" />
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
            <TouchableOpacity key={i} style={[styles.actionButton, { backgroundColor: '#00838F12' }]}>
              <action.icon size={24} color="#00838F" />
              <Text style={[styles.actionText, { color: '#00838F' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="macro-analyst" agentName="AI Macro Analyst" />
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
