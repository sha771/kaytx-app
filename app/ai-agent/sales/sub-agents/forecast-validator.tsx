import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useRouter } from 'expo-router';
import {
  Activity, TrendingUp, TrendingDown, Target, ArrowRight, Briefcase,
  Brain, BarChart3, DollarSign, Shield, CheckCircle, Eye, AlertTriangle,
  FileText, Settings, Target as TargetIcon, Users
} from 'lucide-react-native';
import AgentFeatures from '@/components/ai-agent/AgentFeatures';

const PARENT_AGENT = { id: 'vp-revenue', name: 'AI VP Revenue', route: '/ai-agent/sales/vp-revenue', icon: DollarSign, color: '#E65100' };

export default function ForecastValidatorPage() {
  const { theme } = useTheme();
  const router = useRouter();

  const stats = [
    { label: 'Forecast Acc.', value: '94.2%', icon: Target, color: '#007AFF', change: '+2.1%' },
    { label: 'Deals Validated', value: '892', icon: Shield, color: '#34C759', change: '+67' },
    { label: 'Bias Detected', value: '14', icon: AlertTriangle, color: '#FF9500', change: '-3' },
    { label: 'Adjustments', value: '$1.8M', icon: DollarSign, color: '#AF52DE', change: '+$200K' },
  ];

  const kpis = [
    { label: 'Forecast Accuracy', value: '94.2%', trend: 'up' },
    { label: 'Commit Accuracy', value: '91%', trend: 'up' },
    { label: 'Sandbagging Rate', value: '8%', trend: 'down' },
    { label: 'Over-forecast Rate', value: '5%', trend: 'down' },
  ];

  const capabilities = [
    'Forecast Validation', 'Bias Detection', 'Accuracy Tracking', 'Commit Analysis',
    'Sandbagging Detection', 'Risk Adjustment', 'Multi-method Forecast', 'Confidence Scoring',
    'Historical Calibration', 'Anomaly Detection', 'Rep-level Validation', 'Roll-up Verification'
  ];

  const responsibilities = [
    'Forecast accuracy validation with historical comparison and calibration',
    'Cognitive bias detection in sales forecasts (optimism, sandbagging, herding)',
    'Commit and upside forecast verification with confidence scoring',
    'Multi-method forecast aggregation and cross-validation',
    'Deal-level forecast risk adjustment and probability recalibration',
    'Anomaly detection in forecast submissions and trend deviations',
    'Rep-level forecast accuracy tracking and coaching recommendations',
    'Roll-up verification ensuring forecast arithmetic consistency',
    'Quarterly forecast accuracy review and methodology improvement',
    'Forecast vs actuals variance analysis with root cause identification',
    'AI-driven forecast generation with ensemble model approach',
    'Executive forecast presentation preparation with risk quantification'
  ];

  const activities = [
    { time: '1 min ago', text: 'Validated Q3 commit: $42M (94% confidence)', icon: Shield, type: 'validation' },
    { time: '12 min ago', text: 'Detected sandbagging in 3 rep forecasts', icon: AlertTriangle, type: 'bias' },
    { time: '30 min ago', text: 'Forecast accuracy improved to 94.2%', icon: CheckCircle, type: 'metric' },
    { time: '1 hour ago', text: 'Recalibrated 14 deal probabilities', icon: TargetIcon, type: 'adjustment' },
    { time: '2 hours ago', text: 'Anomaly detected: Region West +40% spike', icon: Eye, type: 'anomaly' },
    { time: '3 hours ago', text: 'Generated forecast vs actuals variance report', icon: FileText, type: 'report' },
  ];

  const quickActions = [
    { label: 'Validate', icon: Shield },
    { label: 'Bias Check', icon: AlertTriangle },
    { label: 'Accuracy', icon: CheckCircle },
    { label: 'Confidence', icon: TargetIcon },
    { label: 'Anomalies', icon: Eye },
    { label: 'Calibrate', icon: Settings },
    { label: 'Reports', icon: FileText },
    { label: 'Settings', icon: Settings },
  ];

  const typeColors: Record<string, string> = {
    validation: '#34C759', bias: '#FF9500', metric: '#007AFF', adjustment: '#5856D6', anomaly: '#FF3B30', report: '#AF52DE',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.hero, { backgroundColor: '#5856D618' }]}>
        <View style={[styles.heroIconWrap, { backgroundColor: '#5856D625' }]}>
          <Shield size={48} color="#5856D6" />
        </View>
        <Text style={[styles.heroTitle, { color: theme.colors.text }]}>AI Forecast Validator</Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>Forecast Intelligence • Revenue Division</Text>
        <View style={styles.badgesRow}>
          <View style={[styles.badge, { backgroundColor: '#34C75922' }]}><Activity size={12} color="#34C759" /><Text style={[styles.badgeText, { color: '#34C759' }]}>Live</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FF950022' }]}><Briefcase size={12} color="#FF9500" /><Text style={[styles.badgeText, { color: '#FF9500' }]}>Specialist</Text></View>
          <View style={[styles.badge, { backgroundColor: '#5856D622' }]}><Shield size={12} color="#5856D6" /><Text style={[styles.badgeText, { color: '#5856D6' }]}>892 Validated</Text></View>
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
          );
        })}
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
          The AI Forecast Validator ensures sales forecast accuracy through bias detection, statistical validation, and anomaly identification. It catches sandbagging and over-optimism, calibrates deal probabilities, and provides confidence scoring to produce reliable forecasts for revenue planning.
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Core Capabilities</Text>
        <View style={styles.tagsContainer}>
          {capabilities.map((cap, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: '#5856D618' }]}>
              <Text style={[styles.tagText, { color: '#5856D6' }]}>{cap}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Responsibilities</Text>
        {responsibilities.map((item, index) => (
          <View key={index} style={styles.responsibilityRow}>
            <View style={[styles.bulletPoint, { backgroundColor: '#5856D6' }]} />
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
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: theme.colors.card || '#F2F2F7' }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <TouchableOpacity key={index} style={[styles.actionButton, { backgroundColor: '#5856D612' }]}>
                <ActionIcon size={22} color="#5856D6" />
                <Text style={[styles.actionText, { color: '#5856D6' }]}>{action.label}</Text>
              </TouchableOpacity>
            );
          })}
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

      <AgentFeatures agentId="forecast-validator" agentName="AI Forecast Validator" />
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
