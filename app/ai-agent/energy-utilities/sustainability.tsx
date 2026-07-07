import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Leaf, Cloud, TrendingUp, CheckCircle, Activity, AlertTriangle, Clock,
  ArrowUpRight, Target, Globe, Award, Zap
} from 'lucide-react-native';
import { ENERGY_COLORS, SUSTAINABILITY_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function Sustainability() {
  const SUSTAINABILITY_METRICS = [
    { label: 'Carbon Emissions', value: '124 Mt', icon: Cloud, color: ENERGY_COLORS.electricBlue, trend: '-12.4%', trendUp: true },
    { label: 'Renewable Energy', value: '48%', icon: Leaf, color: ENERGY_COLORS.emeraldGreen, trend: '+18.4%', trendUp: true },
    { label: 'Energy Efficiency', value: '42%', icon: Zap, color: ENERGY_COLORS.neonCyan, trend: '+8.4%', trendUp: true },
    { label: 'ESG Score', value: '88/100', icon: Award, color: ENERGY_COLORS.purple, trend: '+6.4%', trendUp: true },
    { label: 'Green Investments', value: '$8.4B', icon: Target, color: ENERGY_COLORS.amber, trend: '+28.6%', trendUp: true },
    { label: 'Sustainability Goals', value: '76%', icon: Globe, color: ENERGY_COLORS.magenta, trend: '+12.4%', trendUp: true },
  ];

  const SUSTAINABILITY_ALERTS = [
    { type: 'opportunity', message: 'Carbon offset program could reduce emissions by additional 8% with new initiatives', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Renewable energy share exceeded 48% target ahead of schedule', impact: 'Positive', time: '4h ago' },
    { type: 'trend', message: 'ESG score improved to 88/100 with enhanced governance practices', impact: 'Medium', time: '6h ago' },
    { type: 'alert', message: 'Energy efficiency goal at 42% - need 8% more to reach 50% target', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sustainability Metrics</Text>
      <View style={styles.metricsGrid}>
        {SUSTAINABILITY_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <Activity size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSustainabilityGoals = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sustainability Goals</Text>
      <View style={styles.goalsList}>
        {SUSTAINABILITY_DATA.map((goal) => (
          <View key={goal.metric} style={[styles.goalCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: goal.progress === '92%' ? ENERGY_COLORS.emeraldGreen : goal.progress === '84%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
            <View style={styles.goalHeader}>
              <Leaf size={20} color={goal.progress === '92%' ? ENERGY_COLORS.emeraldGreen : goal.progress === '84%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
              <Text style={styles.goalName}>{goal.metric}</Text>
              <Text style={styles.goalCurrent}>{goal.current}</Text>
            </View>
            <View style={styles.goalMetrics}>
              <View style={styles.goalMetric}>
                <Target size={12} color="#6B7280" />
                <Text style={styles.goalMetricLabel}>Target</Text>
                <Text style={styles.goalMetricValue}>{goal.target}</Text>
              </View>
              <View style={styles.goalMetric}>
                <TrendingUp size={12} color="#6B7280" />
                <Text style={styles.goalMetricLabel}>Change</Text>
                <Text style={styles.goalMetricValue}>{goal.increase || goal.reduction}</Text>
              </View>
              <View style={styles.goalMetric}>
                <Award size={12} color="#6B7280" />
                <Text style={styles.goalMetricLabel}>Progress</Text>
                <Text style={styles.goalMetricValue}>{goal.progress}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Sustainability Alerts</Text>
      {SUSTAINABILITY_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'alert' ? '#EF444415' : 
                       alert.type === 'opportunity' ? '#10B98115' : 
                       alert.type === 'success' ? '#10B98115' : '#8B5CF615',
          borderLeftColor: alert.type === 'alert' ? '#EF4444' : 
                          alert.type === 'opportunity' ? '#10B981' : 
                          alert.type === 'success' ? '#10B981' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'alert' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'trend' && <Activity size={20} color="#8B5CF6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'Critical' ? '#EF444420' : alert.impact === 'High' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'Critical' ? '#EF4444' : alert.impact === 'High' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Leaf size={32} color={ENERGY_COLORS.emeraldGreen} />
        <View>
          <Text style={styles.headerTitle}>Sustainability Center</Text>
          <Text style={styles.headerSubtitle}>Carbon emissions, renewable energy, ESG performance, and green investments</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderSustainabilityGoals()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ENERGY_COLORS.deepSpaceBlack,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  goalsList: {
    gap: 12,
  },
  goalCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  goalCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  goalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  goalMetric: {
    alignItems: 'center',
  },
  goalMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  goalMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
