import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, TrendingDown, Activity, Star, CircleCheckBig, Target, ChartBarBig, Calendar, ArrowRight, Users, Zap, FlaskConical, Filter, Split, DollarSign, BarChart3, Brain, Briefcase, Settings, FileText } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';
import { useRouter } from 'expo-router';

export default function VPGrowthPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Experiments Run', value: '1,417', icon: CircleCheckBig, color: '#34C759', change: '+218' },
    { label: 'Conv. Rate Lift', value: '+34%', icon: TrendingUp, color: '#007AFF', change: '+8%' },
    { label: 'Revenue Impact', value: '$8.2M', icon: DollarSign, color: '#FF9500', change: '+$1.4M' },
    { label: 'Active Tests', value: '42', icon: FlaskConical, color: '#FF6B35', change: '+12' },
  ];

  const kpis = [
    { label: 'Growth Rate', value: '28% MoM', trend: 'up' },
    { label: 'CAC Reduction', value: '18%', trend: 'up' },
    { label: 'Viral Coeff.', value: '1.4', trend: 'up' },
    { label: 'Win Rate', value: '67%', trend: 'up' },
  ];

  const capabilities = ['Growth Experiments','Funnel Optimization','A/B Testing','Conversion Rate','Viral Loops','Referral Programs','Acquisition Channels','Data-Driven Growth','Product-Led Growth','Retention Optimization','Churn Reduction','Activation Strategy','North Star Metrics','Cohort Analysis','Growth Modeling','Rapid Iteration'];

  const responsibilities = [
    'Growth experiment design and execution framework management',
    'Funnel analysis and drop-off optimization across user journeys',
    'A/B test coordination and statistical significance analysis',
    'Conversion rate optimization across all digital touchpoints',
    'Viral loop design and implementation for organic growth',
    'Referral program strategy and incentive management',
    'Acquisition channel testing and scaling of winning strategies',
    'Growth analytics and multi-touch attribution modeling',
    'Product-led growth strategy and activation optimization',
    'Retention optimization and churn reduction programs',
    'North Star metric definition and tracking across teams',
    'Cohort analysis and growth modeling for forecasting'
  ];

  const activities = [
    { time: '3 min ago', text: 'Launched A/B test on checkout flow v2: 50K users', icon: Split, type: 'experiment' },
    { time: '20 min ago', text: 'Analyzed funnel drop-off: payment step -12% improvement', icon: Filter, type: 'funnel' },
    { time: '1 hour ago', text: 'Designed viral loop for referral program: v1.4 coeff', icon: FlaskConical, type: 'viral' },
    { time: '3 hours ago', text: 'Scaled acquisition channel by 34%: $2.1M pipeline', icon: TrendingUp, type: 'acquisition' },
    { time: '5 hours ago', text: 'Completed CRO audit for 8 landing pages', icon: Zap, type: 'cro' },
    { time: '8 hours ago', text: 'Retention cohort: D7 improved from 42% to 58%', icon: BarChart3, type: 'retention' },
  ];

  const typeColors: Record<string, string> = { experiment: '#FF6B35', funnel: '#007AFF', viral: '#34C759', acquisition: '#AF52DE', cro: '#FF9500', retention: '#5856D6' };

  const quickActions = [
    { label: 'Experiments', icon: FlaskConical }, { label: 'Funnels', icon: Filter },
    { label: 'A/B Tests', icon: Split }, { label: 'Revenue', icon: DollarSign },
    { label: 'Analytics', icon: ChartBarBig }, { label: 'Retention', icon: BarChart3 },
    { label: 'Schedule', icon: Calendar }, { label: 'Settings', icon: Settings },
  ];

  const subAgents = [
    { name: 'AI Experiment Designer', id: 'experiment-designer', icon: FlaskConical, desc: 'Growth experiment design & hypothesis testing' },
    { name: 'AI Funnel Analyzer', id: 'funnel-analyzer', icon: Filter, desc: 'Conversion funnel analysis & optimization' },
    { name: 'AI A/B Test Coordinator', id: 'ab-test-coordinator', icon: Split, desc: 'A/B test management & statistical analysis' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#C6282818' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#C6282825' }]}>
          <TrendingUp size={48} color="#C62828" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI VP Growth</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Marketing Division — VP Level</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Active</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF6B3522' }]}><Star size={12} color="#FF6B35" /><Text style={[styles.badgeText, { color: '#FF6B35' }]}>VP Level</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>3 Reports</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
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
          The AI VP Growth leads growth experimentation, funnel optimization, and conversion rate improvement across all digital touchpoints. This VP-level agent designs experiments, analyzes funnels, coordinates A/B tests, and drives data-informed growth strategies.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#C6282818' }]}>
              <Text style={[styles.tagText, { color: '#C62828' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <ArrowRight size={14} color="#C62828" />
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
          <TouchableOpacity key={index} onPress={() => router.push(`/ai-agent/marketing/sub-agents/${sub.id}`)} style={[styles.subAgentCard, { backgroundColor: theme.colors.background || '#F2F2F7' }]}>
            <View style={[styles.subAgentIcon, { backgroundColor: '#C6282815' }]}>
              <sub.icon size={20} color="#C62828" />
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
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#C6282812' }]}>
              <action.icon size={24} color="#C62828" />
              <Text style={[styles.actionText, { color: '#C62828' }]}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Parent Agent</Text>
        <TouchableOpacity onPress={() => router.push('/ai-agent/marketing/cmo' as any)} style={[styles.parentCard, { backgroundColor: theme.colors.background }]}>
          <TrendingUp size={24} color="#C62828" />
          <View style={styles.parentInfo}>
            <Text style={[styles.parentName, { color: theme.colors.text }]}>AI Chief Marketing Officer</Text>
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>C-Suite • Marketing Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="vp-growth" agentName="AI VP Growth" />
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
  actionText: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  parentCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, gap: 12 },
  parentInfo: { flex: 1 },
  parentName: { fontSize: 16, fontWeight: '600' },
  parentDesc: { fontSize: 12, marginTop: 2 },
});
