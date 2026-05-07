import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, Zap, ArrowRight, Briefcase,
  Brain, BarChart3, LineChart, PieChart, DollarSign, Calculator,
  FileText, Settings, TrendingUp as TrendingUpIcon
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-revenue', name: 'AI VP Revenue', route: '/ai-agent/sales/vp-revenue', icon: DollarSign, color: '#E65100' };

export default function RevenueModelerPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Models Run', value: '1,247', icon: BarChart3, color: '#007AFF', change: '+84' },
    { label: 'Scenarios', value: '3,618', icon: PieChart, color: '#34C759', change: '+156' },
    { label: 'Accuracy', value: '96.8%', icon: Target, color: '#FF9500', change: '+1.2%' },
    { label: 'Revenue Impact', value: '$8.4M', icon: DollarSign, color: '#AF52DE', change: '+12%' },
  ];

  const kpis = [
    { label: 'Model Confidence', value: '94%', trend: 'up' },
    { label: 'Forecast Variance', value: '2.1%', trend: 'down' },
    { label: 'Avg Scenario Time', value: '45s', trend: 'down' },
    { label: 'Data Sources', value: '24', trend: 'up' },
  ];

  const capabilities = [
    'Revenue Forecasting', 'Scenario Modeling', 'What-If Analysis', 'Sensitivity Analysis',
    'Growth Projections', 'Churn Modeling', 'Expansion Revenue', 'Market Sizing',
    'Pricing Impact', 'Competitive Modeling', 'Historical Trends', 'Risk Assessment'
  ];

  const responsibilities = [
    'Multi-scenario revenue modeling with configurable assumptions and variables',
    'Growth projection modeling based on historical trends and market indicators',
    'Churn and retention impact modeling on recurring revenue streams',
    'Expansion revenue and upsell opportunity quantification',
    'Pricing strategy impact modeling on overall revenue outcomes',
    'Market sizing and TAM/SAM/SOM analysis for new markets',
    'Competitive scenario modeling and market share impact analysis',
    'Sensitivity analysis for key revenue drivers and risk factors',
    'M&A revenue synergy modeling and integration impact assessment',
    'Board-ready revenue model visualization and presentation generation',
    'Cross-functional alignment with Finance on revenue recognition',
    'Real-time model updates based on actual performance data'
  ];

  const activities = [
    { time: '3 min ago', text: 'Q4 revenue model updated: +$2.1M upside identified', icon: LineChart, type: 'model' },
    { time: '18 min ago', text: 'Pricing scenario completed: 3% uplift = $4.8M ARR', icon: DollarSign, type: 'pricing' },
    { time: '42 min ago', text: 'Churn model refreshed: predictive accuracy 96.8%', icon: Target, type: 'churn' },
    { time: '1 hour ago', text: 'Expansion revenue scenarios: 5 outcomes generated', icon: TrendingUpIcon, type: 'expansion' },
    { time: '2 hours ago', text: 'Market entry TAM analysis: $2.4B opportunity', icon: PieChart, type: 'market' },
    { time: '3 hours ago', text: 'Board presentation deck: revenue models exported', icon: FileText, type: 'report' },
  ];

  const quickActions = [
    { label: 'New Model', icon: BarChart3 },
    { label: 'Scenarios', icon: PieChart },
    { label: 'Sensitivity', icon: Target },
    { label: 'Trends', icon: LineChart },
    { label: 'Churn Model', icon: TrendingDown },
    { label: 'Market Size', icon: PieChart },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    model: '#007AFF', pricing: '#34C759', churn: '#FF9500', expansion: '#AF52DE', market: '#5856D6', report: '#FF2D55',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#E6510018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#E6510025' }]}>
          <LineChart size={48} color="#E65100" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Revenue Modeler</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Revenue Intelligence • VP Revenue Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#E6510022' }]}><Briefcase size={12} color="#E65100" /><Text style={[styles.badgeText, { color: '#E65100' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#007AFF22' }]}><BarChart3 size={12} color="#007AFF" /><Text style={[styles.badgeText, { color: '#007AFF' }]}>1,247 Models</Text></View>
          <View style={[styles.badge, { backgroundColor: '#AF52DE22' }]}><Brain size={12} color="#AF52DE" /><Text style={[styles.badgeText, { color: '#AF52DE' }]}>AI-Powered</Text></View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
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
          The AI Revenue Modeler builds sophisticated financial scenarios and projections to guide strategic decision-making. It creates multi-dimensional revenue models incorporating growth assumptions, market variables, and risk factors to provide accurate forecasts for planning, board reporting, and investor communications.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#E6510018' }]}>
              <Text style={[styles.tagText, { color: '#E65100' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#E65100' }]} />
            <Text style={[styles.responsibilityText, { color: theme.colors.textSecondary }]}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Activity Feed</Text>
        {activities.map((act, index) => {
          const ActIcon = act.icon;
          return (
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
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
            <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#E6510012' }]}>
              <ActionIcon size={22} color="#E65100" />
              <Text style={[styles.actionText, { color: '#E65100' }]}>{action.label}</Text>
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
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>Executive Agent • Revenue Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="revenue-modeler" agentName="AI Revenue Modeler" />
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
