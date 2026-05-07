import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Clipboard, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, CheckCircle, ListTodo, Clock, Package, ListChecks } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function AdminManagerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Tasks Delegated', value: '1,247', icon: ListTodo, color: '#795548', change: '+156' },
    { label: 'Schedules Managed', value: '89', icon: Clock, color: '#5D4037', change: '+12' },
    { label: 'Inventory Items', value: '4,521', icon: Package, color: '#8D6E63', change: '+234' },
    { label: 'Efficiency', value: '94%', icon: Target, color: '#4E342E', change: '+5%' },
  ];

  const kpis = [
    { label: 'Task Completion', value: '97%', trend: 'up' },
    { label: 'Schedule Accuracy', value: '99%', trend: 'up' },
    { label: 'Inventory Accuracy', value: '98.5%', trend: 'up' },
    { label: 'Response Time', value: '2.3m', trend: 'down' },
  ];

  const capabilities = ['Task Delegation','Schedule Coordination','Inventory Management','Resource Allocation','Workflow Optimization','Performance Tracking','Priority Management','Deadline Monitoring','Team Coordination','Process Automation','Supply Chain','Asset Tracking','Quality Control','Documentation','Reporting'];

  const responsibilities = [
    'Delegate and track administrative tasks across multiple departments and teams',
    'Coordinate complex schedules for executives, meetings, and facility resources',
    'Manage inventory levels, procurement needs, and supply chain logistics',
    'Optimize resource allocation to maximize operational efficiency',
    'Implement workflow automation to reduce manual administrative burden',
    'Track team performance metrics and productivity indicators',
    'Manage priority queues and ensure critical tasks receive immediate attention',
    'Monitor deadlines and ensure timely completion of all administrative deliverables',
    'Coordinate cross-functional teams for collaborative projects',
    'Automate routine processes to improve speed and accuracy',
    'Oversee supply chain operations and vendor relationships',
    'Track organizational assets and maintain accurate inventory records',
    'Implement quality control measures for all administrative outputs',
    'Maintain comprehensive documentation and records management',
    'Generate performance reports and operational analytics'
  ];

  const activities = [
    { time: '4 min ago', text: 'Task batch delegated to 12 team members: deadline 2 days', icon: ListTodo, type: 'task' },
    { time: '22 min ago', text: 'Executive schedule optimized: 3 conflicts resolved', icon: Clock, type: 'schedule' },
    { time: '1 hour ago', text: 'Inventory reorder triggered: Office supplies at 15% threshold', icon: Package, type: 'inventory' },
    { time: '2 hours ago', text: 'Workflow automation deployed: 25 hours saved weekly', icon: Zap, type: 'automation' },
    { time: '4 hours ago', text: 'Performance review completed: 94% efficiency achieved', icon: BarChart3, type: 'review' },
    { time: '6 hours ago', text: 'Cross-team coordination completed: Project Phoenix launched', icon: Users, type: 'coordination' },
  ];

  const quickActions = [
    { label: 'Tasks', icon: ListTodo }, { label: 'Schedule', icon: Clock },
    { label: 'Inventory', icon: Package }, { label: 'Reports', icon: BarChart3 },
    { label: 'Delegate', icon: Users }, { label: 'Workflows', icon: Zap },
    { label: 'Calendar', icon: Calendar }, { label: 'Settings', icon: CheckCircle },
  ];

  const typeColors: Record<string, string> = { task: '#795548', schedule: '#5D4037', inventory: '#8D6E63', automation: '#FF9500', review: '#4E342E', coordination: '#6D4C41' };

  const subAgents = [
    { name: 'AI Task Delegator', id: 'task-delegator', icon: ListTodo, desc: 'Task assignment, prioritization & progress tracking', color: '#795548' },
    { name: 'AI Schedule Coordinator', id: 'schedule-coordinator', icon: Clock, desc: 'Calendar management, conflict resolution & optimization', color: '#5D4037' },
    { name: 'AI Inventory Manager', id: 'inventory-manager', icon: Package, desc: 'Stock monitoring, reorder automation & asset tracking', color: '#8D6E63' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#79554818' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#79554825' }]}>
          <Clipboard size={48} color="#795548" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Admin Manager</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — Manager Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Briefcase size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>Manager</Text></View>
          <View style={[styles.badge, { backgroundColor: '#8D6E6322' }]}><Clipboard size={12} color="#8D6E63" /><Text style={[styles.badgeText, { color: '#8D6E63' }]}>Operations</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Brain size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => { const StatIcon = stat.icon; return (
          <View key={index} style={[styles.statCard, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
            <StatIcon size={22} color={stat.color} />
            <Text style={[styles.statValue, { color: theme.colors.text }]}>{stat.value}</Text>
            <Text style={[styles.statChange, { color: stat.change.startsWith('+') ? '#34C759' : '#FF3B30' }]}>{stat.change}</Text>
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
              <View style={[styles.trendBadge, { backgroundColor: (kpi.trend === 'up' || kpi.trend === 'down' ? '#34C759' : '#FF3B30') + '22' }]}>
                {kpi.trend === 'up' || kpi.trend === 'down' ? <TrendingUp size={10} color="#34C759" /> : <TrendingDown size={10} color="#FF3B30" />}
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          The AI Admin Manager handles day-to-day administrative operations with precision and efficiency. This manager-level agent excels at task delegation, schedule coordination, and inventory management, ensuring smooth administrative workflows across all departments while maintaining optimal resource utilization.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#79554818' }]}>
              <Text style={[styles.tagText, { color: '#795548' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#795548" />
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
        {subAgents.map((sub, index) => (
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/administrative/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: sub.color + '15' }]}>
              <sub.icon size={20} color={sub.color} />
            </View>
            <View style={styles.subAgentInfo}>
              <Text style={[styles.subAgentName, { color: theme.colors.text }]}>{sub.name}</Text>
              <Text style={[styles.subAgentDesc, { color: theme.colors.textSecondary }]}>{sub.desc}</Text>
            </View>
            <ArrowRight size={18} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#79554812' }]}>
              <action.icon size={24} color="#795548" />
              <Text style={[styles.actionText, { color: '#795548' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="admin-manager" agentName="AI Admin Manager" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' },
  heroIconWrap: { width: 88, height: 88, borderRadius: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  heroTitle: { fontSize: 26, fontWeight: 'bold' },
  heroSubtitle: { fontSize: 15, marginTop: 4, fontWeight: '500' },
  badgesRow: { flexDirection: 'row', marginTop: 16, gap: 8 },
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
  responsibilityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  responsibilityText: { fontSize: 14, flex: 1, lineHeight: 20 },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  activityIcon: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  activityContent: { flex: 1 },
  activityText: { fontSize: 14, fontWeight: '500' },
  activityTime: { fontSize: 12, marginTop: 2 },
  activityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  activityBadgeText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  subAgentCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10, gap: 12 },
  subAgentIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  subAgentInfo: { flex: 1 },
  subAgentName: { fontSize: 15, fontWeight: '600' },
  subAgentDesc: { fontSize: 12, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionButton: { flex: 1, minWidth: '45%', alignItems: 'center', padding: 16, borderRadius: 12 },
  actionText: { fontSize: 13, fontWeight: '600', marginTop: 8 },
});
