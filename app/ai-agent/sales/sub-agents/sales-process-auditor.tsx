import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase,
  Brain, BarChart3, Shield, CheckCircle, AlertTriangle,
  FileText, Settings, ClipboardCheck, Clock
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'sales-ops-manager', name: 'AI Sales Operations Manager', route: '/ai-agent/sales/sales-ops-manager', icon: BarChart3, color: '#FF9500' };

export default function SalesProcessAuditorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Audits Run', value: '186', icon: ClipboardCheck, color: '#007AFF', change: '+24' },
    { label: 'Issues Found', value: '47', icon: AlertTriangle, color: '#FF9500', change: '-12' },
    { label: 'Compliance', value: '94%', icon: Shield, color: '#34C759', change: '+3%' },
    { label: 'Resolved', value: '41/47', icon: CheckCircle, color: '#AF52DE', change: '+6' },
  ];

  const kpis = [
    { label: 'Process Adherence', value: '94%', trend: 'up' },
    { label: 'Stage Violations', value: '3/wk', trend: 'down' },
    { label: 'Audit Coverage', value: '100%', trend: 'up' },
    { label: 'Resolution Time', value: '2 days', trend: 'down' },
  ];

  const capabilities = [
    'Process Auditing', 'Stage Validation', 'Compliance Check', 'Deviation Detection',
    'Bottleneck ID', 'SLA Monitoring', 'Workflow Analysis', 'Best Practice Enforcement',
    'Gap Analysis', 'Remediation Tracking', 'Trend Analysis', 'Policy Enforcement'
  ];

  const responsibilities = [
    'End-to-end sales process auditing for stage progression and compliance',
    'Stage validation ensuring deals follow defined sales methodology',
    'Compliance checking for required fields, activities, and approvals',
    'Deviation detection identifying deals that skip stages or violate rules',
    'Bottleneck identification in sales cycle stages causing stagnation',
    'SLA monitoring for response times, follow-ups, and escalation triggers',
    'Workflow analysis to identify inefficient or redundant process steps',
    'Best practice enforcement through automated process guidance',
    'Gap analysis between current execution and ideal methodology',
    'Remediation tracking for identified process issues and violations',
    'Trend analysis of process adherence across teams and regions',
    'Policy enforcement for discount approvals, deal reviews, and handoffs'
  ];

  const activities = [
    { time: '4 min ago', text: 'Process audit completed: 12 deals reviewed', icon: ClipboardCheck, type: 'audit' },
    { time: '18 min ago', text: 'Stage violation: 3 deals skipped discovery', icon: AlertTriangle, type: 'violation' },
    { time: '35 min ago', text: 'SLA breach flagged: 2 deals overdue follow-up', icon: Clock, type: 'sla' },
    { time: '1 hour ago', text: 'Bottleneck identified: proposal stage avg 12 days', icon: BarChart3, type: 'bottleneck' },
    { time: '2 hours ago', text: 'Compliance check passed: 94% adherence rate', icon: Shield, type: 'compliance' },
    { time: '3 hours ago', text: 'Remediation resolved: 6 process gaps closed', icon: CheckCircle, type: 'remediation' },
  ];

  const quickActions = [
    { label: 'Audit', icon: ClipboardCheck }, { label: 'Compliance', icon: Shield },
    { label: 'Violations', icon: AlertTriangle }, { label: 'SLA', icon: Clock },
    { label: 'Bottlenecks', icon: BarChart3 }, { label: 'Remediate', icon: CheckCircle },
    { label: 'Reports', icon: FileText }, { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    audit: '#007AFF', violation: '#FF3B30', sla: '#FF9500', bottleneck: '#AF52DE', compliance: '#34C759', remediation: '#5856D6',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF950018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF950025' }]}>
          <ClipboardCheck size={48} color="#FF9500" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Sales Process Auditor</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Process Intelligence • Sales Operations</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><ClipboardCheck size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>186 Audits</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : (stat.change.startsWith('-') && stat.label === 'Issues Found' ? '#34C759' : '#FF3B30') }]}>{stat.change}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{stat.label}</Text>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance KPIs</Text>
        <View style={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <View key={index} style={[styles.kpiCard, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>{kpi.value}</Text>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>{kpi.label}</Text>
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Sales Process Auditor continuously monitors and evaluates sales process adherence. It detects stage violations, identifies bottlenecks, ensures SLA compliance, and drives process improvement through data-driven recommendations and automated remediation tracking.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (<View key={index} style={[styles.tag, { backgroundColor: '#FF950018' }]}><Text style={[styles.tagText, { color: '#FF9500' }]}>{cap}</Text></View>))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#FF9500' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => { const ActIcon = act.icon; return (
          <View key={index} style={styles.activityRow}>
            <View style={[styles.activityIcon, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '20' }]}>
              <ActIcon size={14} color={typeColors[act.type] || '#8E8E93'} />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityText, { color: theme.colors.text }]}>{act.text}</Text>
              <Text style={[styles.activityTime, { color: theme.colors.textSecondary }]}>{act.time}</Text>
            </View>
            <View style={[styles.activityBadge, { backgroundColor: (typeColors[act.type] || '#8E8E93') + '15' }]}>
              <Text style={[styles.activityBadgeText, { color: typeColors[act.type] || '#8E8E93' }]}>{act.type}</Text>
            </View>
          </View>
        )})}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => { const ActionIcon = action.icon; return (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#FF950012' }]}>
              <ActionIcon size={22} color="#FF9500" />
              <Text style={[styles.actionText, { color: '#FF9500' }]}>{action.label}</Text>
            </TouchableOpacity>
          )})}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push(PARENT_AGENT.route)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <PARENT_AGENT.icon size={24} color={PARENT_AGENT.color} />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>{PARENT_AGENT.name}</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Operations Agent • Sales Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="sales-process-auditor" agentName="AI Sales Process Auditor" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '600' },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  statCard: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statChange: { fontSize: 11, fontWeight: '600', marginTop: 2 },
  statLabel: { fontSize: 11, marginTop: 4 },
  section: { marginHorizontal: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  description: { fontSize: 14, lineHeight: 22 },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  kpiCard: { flex: 1, minWidth: '45%', padding: 14, borderRadius: 12, position: 'relative' },
  kpiValue: { fontSize: 20, fontWeight: 'bold' },
  kpiLabel: { fontSize: 12, marginTop: 4 },
  trendBadge: { position: 'absolute', top: 10, right: 10, padding: 4, borderRadius: 8 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '600' },
  bulletPoint: { width: 6, height: 6, borderRadius: 3 },
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '22%', alignItems: 'center', padding: 14, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
