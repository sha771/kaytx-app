import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ClipboardList, Activity, Star, CircleCheckBig, Clock, Target, ArrowRight, Zap, Settings, Users, ChevronRight, Shield, Gauge, BarChart3, TrendingUp, AlertTriangle, CheckCircle2, ListOrdered, Timer, GitMerge } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AITaskCoordinatorPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Tasks Coordinated', value: '3,750', icon: CircleCheckBig, color: '#34C759' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: '#007AFF' },
    { label: 'Response Time', value: '0.4s', icon: Clock, color: '#FF9500' },
    { label: 'Accuracy', value: '97.4%', icon: Target, color: '#4E342E' },
  ];

  const taskMetrics = [
    { label: 'Task Prioritization', value: '99%', trend: '+3.1%', icon: ListOrdered, color: '#007AFF' },
    { label: 'Deadline Adherence', value: '96%', trend: '+4.5%', icon: Timer, color: '#34C759' },
    { label: 'Dependency Tracking', value: '1,240', trend: '+18%', icon: GitMerge, color: '#FF9500' },
    { label: 'Throughput', value: '420/day', trend: '+12%', icon: TrendingUp, color: '#4E342E' },
  ];

  const capabilities = [
    'Task Prioritization Engine', 'Deadline Enforcement & Alerts', 'Dependency Mapping & Tracking',
    'Multi-Team Coordination', 'Task Queue Management', 'Smart Assignment Algorithms',
    'Progress Monitoring & Reporting', 'Bottleneck Detection', 'Resource-Aware Scheduling',
    'Cross-Project Task Linking', 'Automated Status Updates', 'Escalation Triggers'
  ];

  const responsibilities = [
    'Prioritize tasks using AI-driven urgency and impact analysis',
    'Enforce deadlines with automated alerts and escalation triggers',
    'Track and manage task dependencies across teams and projects',
    'Coordinate multi-team task assignments and handoffs',
    'Monitor task progress and generate real-time status updates',
    'Detect bottlenecks and proactively reallocate resources',
    'Implement smart assignment algorithms for optimal distribution',
    'Link cross-project tasks to prevent scheduling conflicts'
  ];

  const activities = [
    { time: '2 min ago', text: 'Prioritized 28 incoming tasks — 5 critical, 12 high, 11 medium', icon: ListOrdered, type: 'success' },
    { time: '7 min ago', text: 'Deadline alert: Sprint 14 deliverables due in 4 hours — teams notified', icon: Timer, type: 'warning' },
    { time: '14 min ago', text: 'Resolved dependency conflict: Backend API blocking Frontend Sprint', icon: GitMerge, type: 'success' },
    { time: '22 min ago', text: 'Bottleneck detected: QA review queue at 89% capacity — auto-rebalanced', icon: BarChart3, type: 'info' },
    { time: '35 min ago', text: 'Smart-assigned 42 tasks across 8 teams — 94% optimal match rate', icon: ClipboardList, type: 'info' },
  ];

  const subAgents = [
    { id: 'task-prioritizer', name: 'AI Task Prioritizer', icon: ListOrdered, desc: 'AI-driven task urgency & impact analysis', color: '#007AFF', route: '/ai-agent/operations/sub-agents/task-prioritizer' },
    { id: 'deadline-enforcer', name: 'AI Deadline Enforcer', icon: Timer, desc: 'Automated deadline tracking & alerts', color: '#34C759', route: '/ai-agent/operations/sub-agents/deadline-enforcer' },
    { id: 'dependency-tracker', name: 'AI Dependency Tracker', icon: GitMerge, desc: 'Track & resolve task dependencies', color: '#FF9500', route: '/ai-agent/operations/sub-agents/dependency-tracker' },
  ];

  const kpiData = [
    { metric: 'Task Completion Rate', value: '97.4%', target: '95%', status: 'exceeding' },
    { metric: 'On-Time Delivery', value: '96%', target: '90%', status: 'exceeding' },
    { metric: 'Dependency Resolution Time', value: '1.2h', target: '4h', status: 'exceeding' },
    { metric: 'Assignment Accuracy', value: '94%', target: '85%', status: 'exceeding' },
    { metric: 'Bottleneck Detection Rate', value: '92%', target: '80%', status: 'exceeding' },
    { metric: 'Cross-Team Coordination Score', value: '4.6/5', target: '4.0/5', status: 'exceeding' },
  ];

  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'sub-agents', label: 'Sub-Agents' }, { id: 'kpi', label: 'KPIs' }, { id: 'activity', label: 'Activity' }];

  const renderOverview = () => (
    <>
      <View style={styles.statsContainer}>{stats.map((stat, i) => (<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Task Metrics</Text><View style={styles.metricsGrid}>{taskMetrics.map((m, i) => (<View key={i} style={[styles.metricCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><View style={styles.metricHeader}><m.icon size={18} color={m.color} /><Text style={[styles.metricTrend, { color: '#34C759' }]}>{m.trend}</Text></View><Text style={[styles.metricValue, { color: theme.colors.text }]}>{m.value}</Text><Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>{m.label}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>The AI Task Coordinator orchestrates task management across the enterprise, using AI-driven prioritization, deadline enforcement, and dependency tracking to ensure every task is assigned, tracked, and completed on time with optimal resource utilization.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap, i) => (<View key={i} style={[styles.tag, { backgroundColor: '#4E342E18' }]}><Text style={[styles.tagText, { color: '#4E342E' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>{responsibilities.map((item, i) => (<View key={i} style={styles.responsibilityRow}><ArrowRight size={14} color="#4E342E" /><Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text><Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>3 specialized agents under Task Coordinator</Text>{subAgents.map((agent) => (<TouchableOpacity key={agent.id} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]} onPress={() => router.push(agent.route as any)}><View style={[styles.subAgentIcon, { backgroundColor: agent.color + '15' }]}><agent.icon size={24} color={agent.color} /></View><View style={styles.subAgentInfo}><Text style={[styles.subAgentName, { color: theme.colors.text }]}>{agent.name}</Text><Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text></View><ChevronRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity>))}</View>
    </>
  );

  const renderSubAgents = () => (
    <View style={styles.section}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Task Coordinator — Sub-Agent Workforce</Text><Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>3 specialized AI agents executing task coordination</Text>{subAgents.map((agent) => (<TouchableOpacity key={agent.id} style={[styles.subAgentFullCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]} onPress={() => router.push(agent.route as any)}><View style={styles.subAgentFullHeader}><View style={[styles.subAgentFullIcon, { backgroundColor: agent.color + '15' }]}><agent.icon size={32} color={agent.color} /></View><View style={styles.subAgentFullInfo}><Text style={[styles.subAgentFullName, { color: theme.colors.text }]}>{agent.name}</Text><Text style={[styles.subAgentFullDesc, { color: theme.colors.textSecondary }]}>{agent.desc}</Text></View></View><View style={styles.subAgentFullStats}><View style={[styles.subAgentStat, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Activity size={14} color="#34C759" /><Text style={[styles.subAgentStatText, { color: theme.colors.text }]}>Active</Text></View><View style={[styles.subAgentStat, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Gauge size={14} color="#007AFF" /><Text style={[styles.subAgentStatText, { color: theme.colors.text }]}>20x Efficiency</Text></View><View style={[styles.subAgentStat, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Shield size={14} color="#FF9500" /><Text style={[styles.subAgentStatText, { color: theme.colors.text }]}>Enterprise</Text></View></View><View style={styles.subAgentFullActions}><TouchableOpacity style={[styles.subAgentAction, { backgroundColor: agent.color }]} onPress={() => router.push(agent.route as any)}><Settings size={14} color="#fff" /><Text style={styles.subAgentActionText}>Configure</Text></TouchableOpacity><TouchableOpacity style={[styles.subAgentActionOutline, { borderColor: agent.color }]} onPress={() => router.push(`/ai-agent/agent-configuration?id=${agent.id}` as any)}><BarChart3 size={14} color={agent.color} /><Text style={[styles.subAgentActionTextOutline, { color: agent.color }]}>Analytics</Text></TouchableOpacity></View></TouchableOpacity>))}</View>
  );

  const renderKPIs = () => (
    <View style={styles.section}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Task Coordination KPI Dashboard</Text><Text style={[styles.sectionSubtitle, { color: theme.colors.textSecondary }]}>Real-time performance metrics & targets</Text>{kpiData.map((kpi, i) => (<View key={i} style={[styles.kpiCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><View style={styles.kpiHeader}><Text style={[styles.kpiMetric, { color: theme.colors.text }]}>{kpi.metric}</Text><View style={[styles.kpiStatusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75922' : '#FF950022' }]}>{kpi.status === 'exceeding' ? <CheckCircle2 size={12} color="#34C759" /> : <AlertTriangle size={12} color="#FF9500" />}<Text style={[styles.kpiStatusText, { color: kpi.status === 'exceeding' ? '#34C759' : '#FF9500' }]}>{kpi.status === 'exceeding' ? 'Exceeding' : 'On Track'}</Text></View></View><View style={styles.kpiValues}><Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text><Text style={[styles.kpiTarget, { color: theme.colors.textSecondary }]}>Target: {kpi.target}</Text></View><View style={[styles.kpiBar, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><View style={[styles.kpiBarFill, { backgroundColor: kpi.status === 'exceeding' ? '#34C759' : '#FF9500', width: kpi.status === 'exceeding' ? '100%' : '85%' }]} /></View></View>))}</View>
  );

  const renderActivity = () => (
    <View style={styles.section}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act, i) => (<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.type === 'success' ? '#34C75915' : act.type === 'warning' ? '#FF950015' : '#007AFF15' }]}><act.icon size={14} color={act.type === 'success' ? '#34C759' : act.type === 'warning' ? '#FF9500' : '#007AFF'} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}><View style={[styles.heroIconWrap, { backgroundColor: '#4E342E20' }]}><ClipboardList size={48} color="#4E342E" /></View><Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Task Coordinator</Text><Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Operations — Agent Level</Text><View style={styles.badgesRow}><View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View><View style={[styles.badge, { backgroundColor: '#4E342E22' }]}><Star size={12} color="#4E342E" /><Text style={[styles.badgeText, { color: '#4E342E' }]}>Agent</Text></View><View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><Users size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>3 Sub-Agents</Text></View></View></View>
      <View style={styles.tabBar}>{tabs.map((tab) => (<TouchableOpacity key={tab.id} style={[styles.tab, activeTab === tab.id && styles.tabActive, { borderBottomColor: activeTab === tab.id ? '#4E342E' : 'transparent' }]} onPress={() => setActiveTab(tab.id)}><Text style={[styles.tabText, { color: activeTab === tab.id ? '#4E342E' : theme.colors.textSecondary }]}>{tab.label}</Text></TouchableOpacity>))}</View>
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'sub-agents' && renderSubAgents()}
      {activeTab === 'kpi' && renderKPIs()}
      {activeTab === 'activity' && renderActivity()}
      <AgentFeatures agentId="ai-task-coordinator" agentName="AI Task Coordinator" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1 }, heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }, heroTitle: { fontSize: 26, fontWeight: 'bold' }, heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' }, badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }, badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 }, badgeText: { fontSize: 12, fontWeight: '600' }, tabBar: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }, tab: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2 }, tabActive: { borderBottomWidth: 2 }, tabText: { fontSize: 14, fontWeight: '600' }, statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 }, statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 }, statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 }, statLabel: { fontSize: 11, marginTop: 4 }, section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 }, sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 }, sectionSubtitle: { fontSize: 13, marginBottom: 14, color: '#666' }, description: { fontSize: 14, lineHeight: 22 }, metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, metricCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12 }, metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, metricTrend: { fontSize: 12, fontWeight: '600' }, metricValue: { fontSize: 20, fontWeight: 'bold', marginBottom: 2 }, metricLabel: { fontSize: 12 }, tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }, tagText: { fontSize: 12, fontWeight: '600' }, responsibilityRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10, gap: 8 }, responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 }, subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, gap: 12, marginTop: 10 }, subAgentIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' }, subAgentInfo: { flex: 1 }, subAgentName: { fontSize: 15, fontWeight: '600' }, subAgentDesc: { fontSize: 12, marginTop: 2 }, subAgentFullCard: { padding: 18, borderRadius: 16, marginBottom: 12 }, subAgentFullHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 }, subAgentFullIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center' }, subAgentFullInfo: { flex: 1 }, subAgentFullName: { fontSize: 16, fontWeight: '700' }, subAgentFullDesc: { fontSize: 13, marginTop: 3 }, subAgentFullStats: { flexDirection: 'row', gap: 8, marginBottom: 12 }, subAgentStat: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16 }, subAgentStatText: { fontSize: 12, fontWeight: '500' }, subAgentFullActions: { flexDirection: 'row', gap: 8 }, subAgentAction: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 }, subAgentActionText: { color: '#fff', fontSize: 13, fontWeight: '600' }, subAgentActionOutline: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, borderWidth: 1 }, subAgentActionTextOutline: { fontSize: 13, fontWeight: '600' }, kpiCard: { padding: 16, borderRadius: 12, marginBottom: 10 }, kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, kpiMetric: { fontSize: 14, fontWeight: '600' }, kpiStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, gap: 4 }, kpiStatusText: { fontSize: 11, fontWeight: '600' }, kpiValues: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, kpiValue: { fontSize: 22, fontWeight: 'bold' }, kpiTarget: { fontSize: 13 }, kpiBar: { height: 6, borderRadius: 3, overflow: 'hidden' }, kpiBarFill: { height: '100%', borderRadius: 3 }, activityRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, gap: 12 }, activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, activityContent: { flex: 1 }, activityText: { fontSize: 14, fontWeight: '500', lineHeight: 20 }, activityTime: { fontSize: 12, marginTop: 3 },
});
