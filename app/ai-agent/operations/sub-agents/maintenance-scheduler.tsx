import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Clock, Target, Zap, ArrowRight, Briefcase, ChevronRight, BarChart3, TrendingUp, Wrench, CheckCircle2, AlertTriangle } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function MaintenanceSchedulerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Status', value: 'Active', icon: Activity, color: '#34C759' },
    { label: 'Level', value: 'Specialist', icon: Briefcase, color: '#607D8B' },
    { label: 'Efficiency', value: '20x', icon: Target, color: '#FF9500' },
    { label: 'Parent', value: 'AI VP Facilities', icon: Wrench, color: '#007AFF' },
  ];

  const capabilities = ["Preventive Maintenance Scheduling","Predictive Failure Analysis","Work Order Management","Asset Lifecycle Tracking","Maintenance Cost Optimization","Vendor Coordination","Compliance Scheduling","Emergency Response Planning"];
  const kpiData = [{"metric":"Schedule Adherence","value":"98%","target":"95%","status":"exceeding"},{"metric":"Predictive Accuracy","value":"94%","target":"88%","status":"exceeding"},{"metric":"Downtime Reduction","value":"32%","target":"25%","status":"exceeding"},{"metric":"Cost Savings","value":"$180K","target":"$120K","status":"exceeding"}];
  const activities = [{"time":"3 min ago","text":"Preventive maintenance scheduled: HVAC Unit 7","icon":"Wrench","type":"success"},{"time":"10 min ago","text":"Predictive alert: Elevator 3 bearing wear detected","icon":"AlertTriangle","type":"warning"},{"time":"18 min ago","text":"Work order completed: Plumbing repair Floor 5","icon":"CheckCircle2","type":"success"}];

  const tabs = [{ id: 'overview', label: 'Overview' }, { id: 'kpi', label: 'KPIs' }, { id: 'activity', label: 'Activity' }];

  const renderOverview = () => (
    <>
      <View style={styles.statsContainer}>{stats.map((stat, i) => (<View key={i} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><stat.icon size={22} color={stat.color} /><Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text><Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text><Text style={[styles.description, { color: theme.colors.textSecondary }]}>AI Maintenance Scheduler is a specialized sub-agent supporting AI VP Facilities. It provides enterprise-level automation and intelligence for its domain, delivering consistent high-quality performance as part of the Kaytx AI Workforce.</Text></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text><View style={styles.tagsContainer}>{capabilities.map((cap, i) => (<View key={i} style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>{cap}</Text></View>))}</View></View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>A2A Endpoints</Text>{['/consult/maintenance-scheduler', '/maintenance-scheduler/execute', '/maintenance-scheduler/analyze'].map((ep, i) => (<View key={i} style={styles.endpointRow}><Zap size={14} color="#8B5CF6" /><Text style={[styles.endpointText, { color: theme.colors.textSecondary }]}>{ep}</Text></View>))}</View>
      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text><TouchableOpacity onPress={() => router.push('/ai-agent/operations/vp-facilities' as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><Wrench size={24} color="#FF9500" /><View style={styles.parentInfo}><Text style={[styles.parentName, { color: theme.colors.text }]}>AI VP Facilities</Text><Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Parent Agent</Text></View><ChevronRight size={20} color={theme.colors.textSecondary} /></TouchableOpacity></View>
    </>
  );

  const renderKPIs = () => (
    <View style={styles.section}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scheduler KPIs</Text>{kpiData.map((kpi, i) => (<View key={i} style={[styles.kpiCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}><View style={styles.kpiHeader}><Text style={[styles.kpiMetric, { color: theme.colors.text }]}>{kpi.metric}</Text><View style={[styles.kpiStatusBadge, { backgroundColor: kpi.status === 'exceeding' ? '#34C75922' : '#FF950022' }]}>{kpi.status === 'exceeding' ? <CheckCircle2 size={12} color="#34C759" /> : <AlertTriangle size={12} color="#FF9500" />}<Text style={[styles.kpiStatusText, { color: kpi.status === 'exceeding' ? '#34C759' : '#FF9500' }]}>{kpi.status === 'exceeding' ? 'Exceeding' : 'On Track'}</Text></View></View><View style={styles.kpiValues}><Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text><Text style={[styles.kpiTarget, { color: theme.colors.textSecondary }]}>Target: {kpi.target}</Text></View><View style={[styles.kpiBar, { backgroundColor: theme.colors.background || '#F2F2F7' }]}><View style={[styles.kpiBarFill, { backgroundColor: kpi.status === 'exceeding' ? '#34C759' : '#FF9500', width: kpi.status === 'exceeding' ? '100%' : '85%' }]} /></View></View>))}</View>
  );

  const renderActivity = () => (
    <View style={styles.section}><Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recent Activity</Text>{activities.map((act, i) => (<View key={i} style={styles.activityRow}><View style={[styles.activityIcon, { backgroundColor: act.type === 'success' ? '#34C75915' : act.type === 'warning' ? '#FF950015' : '#007AFF15' }]}><act.icon size={14} color={act.type === 'success' ? '#34C759' : act.type === 'warning' ? '#FF9500' : '#007AFF'} /></View><View style={styles.activityContent}><Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text><Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text></View></View>))}</View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { borderBottomColor: theme.colors.border || '#E5E5EA' }]}><View style={[styles.heroIconWrap, { backgroundColor: '#FF950020' }]}><Wrench size={56} color="#FF9500" /></View><Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Maintenance Scheduler</Text><Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Sub-Agent of AI VP Facilities</Text><View style={styles.badgesRow}><View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View><View style={[styles.badge, { backgroundColor: '#607D8B22' }]}><Briefcase size={12} color="#607D8B" /><Text style={[styles.badgeText, { color: '#607D8B' }]}>Specialist</Text></View></View></View>
      <View style={styles.tabBar}>{tabs.map((tab) => (<TouchableOpacity key={tab.id} style={[styles.tab, activeTab === tab.id && styles.tabActive, { borderBottomColor: activeTab === tab.id ? '#FF9500' : 'transparent' }]} onPress={() => setActiveTab(tab.id)}><Text style={[styles.tabText, { color: activeTab === tab.id ? '#FF9500' : theme.colors.textSecondary }]}>{tab.label}</Text></TouchableOpacity>))}</View>
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'kpi' && renderKPIs()}
      {activeTab === 'activity' && renderActivity()}
      <AgentFeatures agentId="maintenance-scheduler" agentName="AI Maintenance Scheduler" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, hero: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, borderBottomWidth: 1 }, heroIconWrap: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 16 }, heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center' }, heroSubtitle: { fontSize: 15, marginTop: 6, fontWeight: '500' }, badgesRow: { flexDirection: 'row', gap: 10, marginTop: 16, flexWrap: 'wrap', justifyContent: 'center' }, badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 5 }, badgeText: { fontSize: 12, fontWeight: '600' }, tabBar: { flexDirection: 'row', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }, tab: { paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 2 }, tabActive: { borderBottomWidth: 2 }, tabText: { fontSize: 14, fontWeight: '600' }, statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 }, statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 }, statValue: { fontSize: 14, fontWeight: 'bold', marginTop: 8 }, statLabel: { fontSize: 11, marginTop: 4, textAlign: 'center' }, section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 }, sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 }, description: { fontSize: 14, lineHeight: 22 }, tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }, tagText: { fontSize: 12, fontWeight: '600' }, endpointRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 }, endpointText: { fontSize: 13, fontFamily: 'monospace' }, parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 }, parentInfo: { flex: 1 }, parentName: { fontSize: 16, fontWeight: '600' }, parentDesc: { fontSize: 12, marginTop: 2 }, kpiCard: { padding: 16, borderRadius: 12, marginBottom: 10 }, kpiHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, kpiMetric: { fontSize: 14, fontWeight: '600' }, kpiStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, gap: 4 }, kpiStatusText: { fontSize: 11, fontWeight: '600' }, kpiValues: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, kpiValue: { fontSize: 22, fontWeight: 'bold' }, kpiTarget: { fontSize: 13 }, kpiBar: { height: 6, borderRadius: 3, overflow: 'hidden' }, kpiBarFill: { height: '100%', borderRadius: 3 }, activityRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, gap: 12 }, activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' }, activityContent: { flex: 1 }, activityText: { fontSize: 14, fontWeight: '500', lineHeight: 20 }, activityTime: { fontSize: 12, marginTop: 3 },
});
