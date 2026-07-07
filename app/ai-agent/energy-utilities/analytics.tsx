import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Brain, TrendingUp, Activity, AlertTriangle, CheckCircle, Clock,
  ArrowUpRight, BarChart3, PieChart, LineChart, Zap, Globe
} from 'lucide-react-native';
import { ENERGY_COLORS, AI_INSIGHTS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function Analytics() {
  const ANALYTICS_METRICS = [
    { label: 'AI Predictions', value: '18,400', icon: Brain, color: ENERGY_COLORS.neonCyan, trend: '+42.8%', trendUp: true },
    { label: 'Forecast Accuracy', value: '96.8%', icon: CheckCircle, color: ENERGY_COLORS.emeraldGreen, trend: '+4.2%', trendUp: true },
    { label: 'Optimizations', value: '12,600', icon: TrendingUp, color: ENERGY_COLORS.electricBlue, trend: '+28.4%', trendUp: true },
    { label: 'Anomalies Detected', value: '840', icon: AlertTriangle, color: ENERGY_COLORS.amber, trend: '+12.4%', trendUp: true },
    { label: 'Model Performance', value: '94.2%', icon: Activity, color: ENERGY_COLORS.purple, trend: '+6.8%', trendUp: true },
    { label: 'Data Processed', value: '8.4PB', icon: BarChart3, color: ENERGY_COLORS.magenta, trend: '+34.6%', trendUp: true },
  ];

  const ANALYTICS_ALERTS = [
    { type: 'opportunity', message: 'AI model optimization could improve forecast accuracy by 2.4%', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Predictive maintenance model achieved 97% accuracy in transformer failure detection', impact: 'Positive', time: '4h ago' },
    { type: 'trend', message: 'Energy demand forecasting error rate decreased by 18% with new algorithms', impact: 'Medium', time: '6h ago' },
    { type: 'alert', message: 'Model drift detected in renewable energy forecasting - retraining recommended', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Analytics Metrics</Text>
      <View style={styles.metricsGrid}>
        {ANALYTICS_METRICS.map((metric, index) => (
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

  const renderAIInsights = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Insights Center</Text>
      {AI_INSIGHTS.map((insight, index) => (
        <View key={index} style={[styles.insightCard, { 
          backgroundColor: insight.type === 'alert' ? '#EF444415' : 
                       insight.type === 'revenue' ? '#10B98115' : 
                       insight.type === 'opportunity' ? '#3B82F615' : '#8B5CF615',
          borderLeftColor: insight.type === 'alert' ? '#EF4444' : 
                          insight.type === 'revenue' ? '#10B981' : 
                          insight.type === 'opportunity' ? '#3B82F6' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.insightHeader}>
            {insight.type === 'alert' && <AlertTriangle size={20} color="#EF4444" />}
            {insight.type === 'revenue' && <Zap size={20} color="#10B981" />}
            {insight.type === 'opportunity' && <TrendingUp size={20} color="#3B82F6" />}
            {insight.type === 'trend' && <Activity size={20} color="#8B5CF6" />}
            <Text style={styles.insightMessage}>{insight.message}</Text>
          </View>
          <View style={styles.insightFooter}>
            <View style={[styles.impactBadge, { backgroundColor: insight.impact === 'Critical' ? '#EF444420' : insight.impact === 'High' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: insight.impact === 'Critical' ? '#EF4444' : insight.impact === 'High' ? '#F59E0B' : '#3B82F6' }]}>{insight.impact}</Text>
            </View>
            <Text style={styles.insightAction}>{insight.action}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Analytics Alerts</Text>
      {ANALYTICS_ALERTS.map((alert, index) => (
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
        <Brain size={32} color={ENERGY_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>AI Analytics Center</Text>
          <Text style={styles.headerSubtitle}>AI-powered insights, forecasting, and optimization analytics</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderAIInsights()}
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
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  insightMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  insightFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  insightAction: {
    flex: 1,
    fontSize: 12,
    color: '#9CA3AF',
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
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
