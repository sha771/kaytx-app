import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Users, ChevronRight, Shield, Gauge, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Calendar, RotateCcw, Bell } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AIOperationsManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Tasks Completed', value: '4,109', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response Time', value: '1.0s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '98.0%', icon: Target, color: '#4E342E' },
  ];

  const opsMetrics = [
    { label: 'Daily Ops Coordination', value: '96%', trend: '+3.5%', icon: Calendar, color: '#007AFF' },
    { label: 'Escalation Resolution', value: '94%', trend: '+2.1%', icon: Bell, color: '#FF9500' },
    { label: 'Performance Reporting', value: '99%', trend: '+1.2%', icon: BarChart3, color: '#34C759' },
    { label: 'Operational Savings', value: '$890K', trend: '+8%', icon: TrendingUp, color: '#4E342E' },
  ];

  const capabilities = [
    'Daily Operations Coordination', 'Escalation Management & Routing', 'Performance Reporting & Analytics',
    'Cross-Departmental Coordination', 'SLA Monitoring & Enforcement', 'Incident Management',
    'Change Management', 'Capacity Planning', 'Service Level Optimization',
    'Operational Risk Management', 'Business Continuity Planning', 'Continuous Improvement'
  ];

  const responsibilities = [
    'Coordinate daily operations across all departments and teams',
    'Handle escalations and ensure timely resolution of critical issues',
    'Generate comprehensive performance reports and operational dashboards',
    'Monitor and enforce SLA compliance across all services',
    'Manage incident response and business continuity protocols',
    'Drive continuous improvement initiatives across operations',
    'Coordinate cross-departmental initiatives and communication',
    'Optimize operational processes for maximum efficiency and quality'
  ];

  const activities = [
    { time: '2 min ago', text: 'Coordinated 42 daily operations tasks across 6 departments', icon: Calendar, type: 'success' },
    { time: '7 min ago', text: 'Escalation resolved: Server cluster failover — 99.97% uptime maintained', icon: Bell, type: 'success' },
    { time: '14 min ago', text: 'Generated weekly performance report — 12 KPIs trending positive', icon: BarChart3, type: 'info' },
    { time: '20 min ago', text: 'SLA breach alert: Payment processing latency — auto-remediation triggered', icon: AlertTriangle, type: 'warning' },
    { time: '35 min ago', text: 'Capacity forecast updated: Q3 demand projection +18%', icon: TrendingUp, type: 'info' },
  ];

  const subAgents = [
    { id: 'daily-operations-coordinator', name: 'AI Daily Operations Coordinator', icon: Calendar, desc: 'Coordinate & schedule daily operations', color: '#007AFF', route: '/ai-agent/operations/sub-agents/daily-operations-coordinator' },
    { id: 'escalation-handler', name: 'AI Escalation Handler', icon: Bell, desc: 'Route & resolve operational escalations', color: '#FF9500', route: '/ai-agent/operations/sub-agents/escalation-handler' },
    { id: 'performance-reporter', name: 'AI Performance Reporter', icon: BarChart3, desc: 'Generate operational performance reports', color: '#34C759', route: '/ai-agent/operations/sub-agents/performance-reporter' },
  ];

  const kpiData = [
    { metric: 'Operational Efficiency', value: '94%', target: '90%', status: 'exceeding' },
    { metric: 'Escalation Resolution Time', value: '18 min', target: '30 min', status: 'exceeding' },
    { metric: 'SLA Compliance', value: '99.2%', target: '99%', status: 'exceeding' },
    { metric: 'Incident Response Time', value: '3.2 min', target: '5 min', status: 'exceeding' },
    { metric: 'Cross-Dept Coordination Score', value: '4.5/5', target: '4.0/5', status: 'exceeding' },
    { metric: 'Process Compliance Rate', value: '97%', target: '95%', status: 'exceeding' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sub-agents', label: 'Sub-Agents' },
    { id: 'kpi', label: 'KPIs' },
    { id: 'activity', label: 'Activity' },
  ];

  const renderOverview = () => (
    <>
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations Metrics</Text>
        <View style={styles.metricsGrid}>
          {opsMetrics.map((m, i) => (
            <View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
              <View style={styles.metricHeader}>
                <m.icon size={18} color={m.color} />
                <Text style={[styles.metricTrend, { color: '#34C759' }]}>{m.trend}</Text>
              </View>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Operations Manager coordinates daily operations across the enterprise, handling escalations, monitoring SLAs, and generating performance reports. It ensures seamless cross-departmental coordination and drives continuous improvement in operational efficiency.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: '#4E342E18' }]}>
              <Text style={[styles.tagText, { color: '#4E342E' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, i) => (
          <View key={i} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#4E342E" />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>3 specialized agents under Operations Manager</Text>
        {subAgents.map((agent) => (
          <TouchableOpacity key={agent.id} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]} onPress={() => router.push(agent.route as any)}>
            <View style={[styles.subAgentIcon, { backgroundColor: agent.color + '15' }]}>
              <agent.icon size={24} color={agent.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderSubAgents = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations Manager — Sub-Agent Workforce</Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>3 specialized AI agents executing operations management</Text>
      {subAgents.map((agent) => (
        <TouchableOpacity key={agent.id} style={[styles.subAgentFullCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]} onPress={() => router.push(agent.route as any)}>
          <View style={styles.subAgentFullHeader}>
            <View style={[styles.subAgentFullIcon, { backgroundColor: agent.color + '15' }]}>
              <agent.icon size={32} color={agent.color} />
            </View>
            <View style={styles.subAgentFullInfo}>
              <Text style={[styles.subAgentFullName, { color: theme.colors.text }]}>{agent.name}</Text>
              <Text style={[styles.subAgentFullDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text>
            </View>
          </View>
          <View style={styles.subAgentFullStats}>
            <View style={[styles.subAgentStat, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Activity size={14} color="#34C759" /><Text style={[styles.subAgentStatText, { color: theme.colors.text }]}>Active</Text></View>
            <View style={[styles.subAgentStat, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Gauge size={14} color="#007AFF" /><Text style={[styles.subAgentStatText, { color: theme.colors.text }]}>20x Efficiency</Text></View>
            <View style={[styles.subAgentStat, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Shield size={14} color="#FF9500" /><Text style={[styles.subAgentStatText, { color: theme.colors.text }]}>Enterprise</Text></View>
          </View>
          <View style={styles.subAgentFullActions}>
            <TouchableOpacity style={[styles.subAgentAction, { backgroundColor: agent.color }]} onPress={() => router.push(agent.route as any)}>
              <Settings size={14} color="#fff" /><Text style={styles.subAgentActionText}>Configure</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.subAgentActionOutline, { borderColor: agent.color }]} onPress={() => router.push(`/ai-agent/agent-configuration?id=${agent.id}` as any)}>
              <BarChart3 size={14} color={agent.color} /><Text style={[styles.subAgentActionTextOutline, { color: agent.color }]}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderKPIs = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Operations KPI Dashboard</Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Real-time performance metrics & targets</Text>
      {kpiData.map((kpi, i) => (
        <View key={i} style={[styles.kpiCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
          <View style={styles.kpiHeader}>
            <Text style={[styles.kpiMetric, { color: theme.colors.text }]}>{kpi.metric}</Text>
            <View style={[styles.kpiStatusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75922' : '#FF950022' }]}>
              {kpi.status === 'exceeding' ? <CheckCircle2 size={12} color="#34C759" /> : <AlertTriangle size={12} color="#FF9500" />}
              <Text style={[styles.kpiStatusText, { color: kpi.status === 'exceeding' ? '#34C759' : '#FF9500' }]}>{kpi.status === 'exceeding' ? 'Exceeding' : 'On Track'}</Text>
            </View>
          </View>
          <View style={styles.kpiValues}>
            <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
            <Text style={[styles.kpiTarget, { color: theme.colors.textSecondary }]}>Target: {kpi.target}</Text>
          </View>
          <View style={[styles.kpiBar, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.kpiBarFill, { backgroundColor: kpi.status === 'exceeding' ? '#34C759' : '#FF9500', width: kpi.status === 'exceeding' ? '100%' : '85%' }]} />
          </View>
        </View>
      ))}
    </View>
  );

  const renderActivity = () => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>
      {activities.map((act, i) => (
        <View key={i} style={styles.activityRow}>
          <View style={[styles.activityIcon, { backgroundColor: act.type === 'success' ? '#34C75915' : act.type === 'warning' ? '#FF950015' : '#007AFF15' }]}>
            <act.icon size={14} color={act.type === 'success' ? '#34C759' : act.type === 'warning' ? '#FF9500' : '#007AFF'} />
          </View>
          <View style={styles.activityContent}>
            <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
            <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#4E342E20' }]}><Settings size={48} color="#4E342E" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Operations Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Operations — Manager Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#4E342E22' }]}><Star size={12} color="#4E342E" /><Text style={[styles.badgeText, { color: '#4E342E' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text></View>
        </View>
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TouchableOpacity key={tab.id} style={[styles.tab, activeTab === tab.id && styles.tabActive, { borderBottomColor: activeTab === tab.id ? '#4E342E' : 'transparent' }]} onPress={() => setActiveTab(tab.id)}>
            <Text style={[styles.tabText, { color: activeTab === tab.id ? '#4E342E' : theme.colors.textSecondary }]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'sub-agents' && renderSubAgents()}
      {activeTab === 'kpi' && renderKPIs()}
      {activeTab === 'activity' && renderActivity()}
      <AgentFeatures agentId="ai-operations-manager" agentName="AI Operations Manager" />
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
  tabBar: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  tab: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2 },
  tabActive: { borderBottomWidth: 2 },
  tabText: { fontSize: 14, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  sectionSubtitle: { fontSize: 13, marginBottom: 14, color: '#666' },
  description: { fontSize: 14, lineHeight: 22 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metricCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  metricTrend: { fontSize: 12, fontWeight: '600' },
  metricValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 2 },
  metricLabel: { fontSize: 12 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  responsibilityRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 12, marginTop: 10 },
  subAgentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  subAgentFullCard: { padding: 18, borderRadius: 16, marginBottom: 12 },
  subAgentFullHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  subAgentFullIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  subAgentFullInfo: { flex: 1 },
  subAgentFullName: { fontSize: 16, fontWeight: '700' },
  subAgentFullDesc: { fontSize: 13, marginTop: 3 },
  subAgentFullStats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  subAgentStat: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16 },
  subAgentStatText: { fontSize: 12, fontWeight: '500' },
  subAgentFullActions: { flexDirection: 'row', gap: 8 },
  subAgentAction: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  subAgentActionText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  subAgentActionOutline: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  subAgentActionTextOutline: { fontSize: 13, fontWeight: '600' },
  kpiCard: { padding: 16, borderRadius: 12, marginBottom: 10 },
  kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiMetric: { fontSize: 14, fontWeight: '600' },
  kpiStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, gap: 4 },
  kpiStatusText: { fontSize: 11, fontWeight: '600' },
  kpiValues: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  kpiValue: { fontSize: 22, fontWeight: 'bold' },
  kpiTarget: { fontSize: 13 },
  kpiBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  kpiBarFill: { height: '100%', borderRadius: 3 },
  activityRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  activityTime: { fontSize: 12, marginTop: 3 },
});
