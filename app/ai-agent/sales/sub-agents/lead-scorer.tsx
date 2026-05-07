import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import { Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase, Brain, BarChart3, Star, CheckCircle, Zap, Users, Shield, Settings, Award, Flame } from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'ai-sdr', name: 'AI Lead Development Rep (SDR)', route: '/ai-agent/sales/ai-sdr', icon: Users, color: '#007AFF' };

export default function LeadScorerPage() {
  const { theme } = useTheme();
  const router = useRouter();
  const stats = [
    { label: 'Leads Scored', value: '42K', icon: Star, color: '#007AFF', change: '+6.2K' },
    { label: 'Hot Leads', value: '1,842', icon: Flame, color: '#FF3B30', change: '+284' },
    { label: 'Conversion', value: '24.6%', icon: Target, color: '#34C759', change: '+3.2%' },
    { label: 'Model Accuracy', value: '91.4%', icon: Shield, color: '#AF52DE', change: '+1.8%' },
  ];
  const kpis = [
    { label: 'MQL to SQL', value: '38%', trend: 'up' },
    { label: 'False Positive', value: '4.2%', trend: 'down' },
    { label: 'Score Freshness', value: '<1hr', trend: 'up' },
    { label: 'Coverage', value: '98%', trend: 'up' },
  ];
  const capabilities = ['Predictive Scoring','Behavioral Signals','Firmographic Fit','Intent Data Analysis','Score Decay','Lead Grading','Engagement Weighting','Model Training','Threshold Alerts','Segment Routing','Attribution Tracking','Model Explainability'];
  const responsibilities = [
    'Predictive lead scoring using ML models trained on historical conversion data',
    'Behavioral signal processing from email, web, and product engagement patterns',
    'Firmographic fit scoring based on ICP criteria and company attributes',
    'Intent data analysis from third-party buying signals and research activity',
    'Score decay modeling to reduce scores for inactive or stale leads',
    'Lead grading with letter grades (A-D) combining fit and engagement dimensions',
    'Engagement weighting prioritizing high-intent actions over passive interactions',
    'Model training and retraining with automated feature engineering and validation',
    'Threshold alerting when leads cross hot/warm/cold score boundaries',
    'Segment routing automatically assigning scored leads to appropriate reps',
    'Attribution tracking linking lead scores to downstream revenue outcomes',
    'Model explainability providing transparent reasons for each lead score'
  ];
  const activities = [
    { time: '2 min ago', text: '42 leads crossed hot threshold: avg score 87', icon: Flame, type: 'hot' },
    { time: '14 min ago', text: 'Model retrained: accuracy improved to 91.4%', icon: Brain, type: 'model' },
    { time: '28 min ago', text: 'Score decay applied: 820 leads downgraded', icon: TrendingDown, type: 'decay' },
    { time: '1 hour ago', text: 'Intent signal detected: 12 accounts researching', icon: Zap, type: 'intent' },
    { time: '2 hours ago', text: 'Lead routing: 38 hot leads assigned to top reps', icon: Users, type: 'routing' },
    { time: '3 hours ago', text: 'Explainability report: top factor is demo requests', icon: BarChart3, type: 'insight' },
  ];
  const quickActions = [
    { label: 'Score Leads', icon: Star },{ label: 'Hot List', icon: Flame },{ label: 'Model', icon: Brain },{ label: 'Intent', icon: Zap },{ label: 'Routing', icon: Users },{ label: 'Grades', icon: Award },{ label: 'Reports', icon: BarChart3 },{ label: 'Settings', icon: Settings },
  ];
  const typeColors: Record<string, string> = { hot: '#FF3B30', model: '#AF52DE', decay: '#FF9500', intent: '#5856D6', routing: '#007AFF', insight: '#34C759' };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#FF3B3018' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#FF3B3025' }]}><Star size={48} color="#FF3B30" /></View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Lead Scorer</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Lead Intelligence • SDR Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF3B3022' }]}><Star size={12} color="#FF3B30" /><Text style={[styles.badgeText, { color: '#FF3B30' }]}>42K Scored</Text></View>
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
          </View>); })}
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
          The AI Lead Scorer uses machine learning to rank and prioritize leads based on fit, behavior, intent, and engagement. It continuously retrains on win/loss data, applies score decay for aging leads, and auto-routes hot leads to the right reps for maximum conversion.
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
            <Text style={[styles.parentDesc, { color: theme.colors.textSecondary }]}>SDR Agent • Sales Division</Text>
          </View>
          <ArrowRight size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <AgentFeatures agentId="lead-scorer" agentName="AI Lead Scorer" />
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
