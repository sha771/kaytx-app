import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Settings, Activity, Star, CircleCheckBig, TrendingUp, TrendingDown, DollarSign, BarChart3, Shield, ArrowRight, Users, Zap, FileText, Target, Brain, Briefcase, Eye, Globe, Calendar, Megaphone, Clipboard, Lock, Settings2, Workflow } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VpAdminOperationsPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Processes Standardized', value: '124', icon: Settings2, color: '#5D4037', change: '+18' },
    { label: 'Vendor Savings', value: '$890K', icon: DollarSign, color: '#2E7D32', change: '+12%' },
    { label: 'Budget Accuracy', value: '97%', icon: Target, color: '#007AFF', change: '+4%' },
    { label: 'Team Efficiency', value: '87%', icon: Users, color: '#795548', change: '+9%' },
  ];

  const kpis = [
    { label: 'Process Compliance', value: '96%', trend: 'up' },
    { label: 'Vendor Performance', value: '4.5/5', trend: 'up' },
    { label: 'Budget Variance', value: '2.1%', trend: 'down' },
    { label: 'Ops Efficiency', value: '92%', trend: 'up' },
  ];

  const capabilities = ['Process Standardization','Vendor Management','Budget Control','Operational Efficiency','Contract Negotiation','Performance Monitoring','Resource Optimization','Compliance Management','Workflow Automation','Cost Analysis','Risk Assessment','Strategic Planning','Quality Assurance','Policy Implementation','Team Coordination'];

  const responsibilities = [
    'Design and implement standardized administrative processes across all departments',
    'Manage vendor relationships, contracts, and performance evaluation frameworks',
    'Oversee office budget allocation, monitoring, and variance analysis',
    'Drive operational efficiency improvements through automation and optimization',
    'Lead contract negotiations with vendors and service providers',
    'Monitor and report on operational KPIs and performance metrics',
    'Optimize resource allocation across administrative functions',
    'Ensure compliance with administrative policies and procedures',
    'Implement workflow automation to reduce manual processing time',
    'Conduct cost-benefit analysis for operational improvements',
    'Assess and mitigate operational risks within administrative functions',
    'Develop strategic plans for administrative operations growth',
    'Maintain quality assurance standards across all admin processes',
    'Implement and enforce administrative policies organization-wide',
    'Coordinate cross-functional administrative teams and initiatives'
  ];

  const activities = [
    { time: '5 min ago', text: 'Standardized 3 new procurement processes across departments', icon: Settings2, type: 'process' },
    { time: '18 min ago', text: 'Vendor contract renewed: 15% cost reduction achieved', icon: DollarSign, type: 'savings' },
    { time: '1 hour ago', text: 'Monthly budget review: 97% accuracy, under budget by $45K', icon: BarChart3, type: 'review' },
    { time: '3 hours ago', text: 'Workflow automation deployed: 40 hours saved weekly', icon: Zap, type: 'automation' },
    { time: '5 hours ago', text: 'Vendor performance audit completed: 4.5/5 avg rating', icon: Star, type: 'audit' },
    { time: '8 hours ago', text: 'Policy compliance check: 96% adherence across teams', icon: Shield, type: 'compliance' },
  ];

  const quickActions = [
    { label: 'Processes', icon: Settings2 }, { label: 'Vendors', icon: Users },
    { label: 'Budget', icon: DollarSign }, { label: 'Reports', icon: BarChart3 },
    { label: 'Contracts', icon: FileText }, { label: 'Workflows', icon: Workflow },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = { process: '#5D4037', savings: '#2E7D32', review: '#007AFF', automation: '#FF9500', audit: '#795548', compliance: '#1565C0' };

  const subAgents = [
    { name: 'AI Process Standardizer', id: 'process-standardizer', icon: Settings2, desc: 'Process standardization & workflow optimization', color: '#5D4037' },
    { name: 'AI Vendor Manager', id: 'vendor-manager', icon: Users, desc: 'Vendor relationship & contract management', color: '#795548' },
    { name: 'AI Office Budget Controller', id: 'office-budget-controller', icon: DollarSign, desc: 'Budget allocation, tracking & variance analysis', color: '#2E7D32' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#5D403718' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5D403725' }]}>
          <Settings size={48} color="#5D4037" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Admin Operations</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Administrative Division — VP Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5D403722' }]}><Briefcase size={12} color="#5D4037" /><Text style={[styles.badgeText, { color: '#5D4037' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#79554822' }]}><Settings size={12} color="#795548" /><Text style={[styles.badgeText, { color: '#795548' }]}>Operations</Text></View>
          <View style={[styles.badge, { backgroundColor: '#6D4C4122' }]}><Brain size={12} color="#6D4C41" /><Text style={[styles.badgeText, { color: '#6D4C41' }]}>AI-Powered</Text></View>
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
          The AI VP Admin Operations oversees all administrative operational functions with a focus on process standardization, vendor management, and budget control. This VP-level agent ensures operational excellence through automated workflows, vendor optimization, and strict budget management while maintaining compliance across all administrative processes.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#5D403718' }]}>
              <Text style={[styles.tagText, { color: '#5D4037' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#5D4037" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#5D403712' }]}>
              <action.icon size={24} color="#5D4037" />
              <Text style={[styles.actionText, { color: '#5D4037' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <AgentFeatures agentId="vp-admin-operations" agentName="AI VP Admin Operations" />
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
