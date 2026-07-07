import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Sun, Wind, Battery, Leaf, TrendingUp, CheckCircle,
  Clock, Droplets, Activity, ArrowUpRight, Zap, Cloud
} from 'lucide-react-native';
import { ENERGY_COLORS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function AgentSolaris() {
  const SOLARIS_METRICS = [
    { label: 'Renewable Output', value: '406 GW', icon: Zap, color: ENERGY_COLORS.emeraldGreen, trend: '+18.4%', trendUp: true },
    { label: 'Storage Efficiency', value: '92.4%', icon: Battery, color: ENERGY_COLORS.neonCyan, trend: '+6.8%', trendUp: true },
    { label: 'Carbon Reduction', value: '18.4%', icon: Leaf, color: ENERGY_COLORS.electricBlue, trend: '+12.4%', trendUp: true },
    { label: 'Solar Generation', value: '98 GW', icon: Sun, color: ENERGY_COLORS.amber, trend: '+24.6%', trendUp: true },
    { label: 'Wind Generation', value: '142 GW', icon: Wind, color: ENERGY_COLORS.purple, trend: '+28.4%', trendUp: true },
    { label: 'Forecast Accuracy', value: '94.8%', icon: Cloud, color: ENERGY_COLORS.magenta, trend: '+4.2%', trendUp: true },
  ];

  const RENEWABLE_SOURCES = [
    { source: 'Solar Farms', capacity: '120 GW', output: '98 GW', efficiency: '81.6%', color: ENERGY_COLORS.amber },
    { source: 'Wind Farms', capacity: '180 GW', output: '142 GW', efficiency: '78.8%', color: ENERGY_COLORS.electricBlue },
    { source: 'Hydroelectric', capacity: '180 GW', output: '168 GW', efficiency: '93.4%', color: ENERGY_COLORS.neonCyan },
    { source: 'Battery Storage', capacity: '40 GW', output: '32 GW', efficiency: '92.4%', color: ENERGY_COLORS.purple },
  ];

  const SOLARIS_ALERTS = [
    { type: 'opportunity', message: 'Renewable generation will exceed forecast by 12% tomorrow due to favorable weather', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Battery storage optimization could reduce operating costs by $24M annually', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Solar farm efficiency improved to 81.6% with new AI optimization', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New wind turbine deployment completed in coastal region', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Solaris Metrics</Text>
      <View style={styles.metricsGrid}>
        {SOLARIS_METRICS.map((metric, index) => (
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

  const renderRenewableSources = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Renewable Energy Sources</Text>
      <View style={styles.sourcesList}>
        {RENEWABLE_SOURCES.map((source) => (
          <View key={source.source} style={[styles.sourceCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: source.color }]}>
            <View style={styles.sourceHeader}>
              <Zap size={20} color={source.color} />
              <Text style={styles.sourceName}>{source.source}</Text>
              <Text style={styles.sourceCapacity}>{source.capacity}</Text>
            </View>
            <View style={styles.sourceMetrics}>
              <View style={styles.sourceMetric}>
                <Text style={styles.sourceMetricLabel}>Output</Text>
                <Text style={styles.sourceMetricValue}>{source.output}</Text>
              </View>
              <View style={styles.sourceMetric}>
                <Text style={styles.sourceMetricLabel}>Efficiency</Text>
                <Text style={styles.sourceMetricValue}>{source.efficiency}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Solaris Alerts</Text>
      {SOLARIS_ALERTS.map((alert, index) => (
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
            {alert.type === 'alert' && <Activity size={20} color="#EF4444" />}
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Cloud size={20} color="#8B5CF6" />}
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
        <Sun size={32} color={ENERGY_COLORS.emeraldGreen} />
        <View>
          <Text style={styles.headerTitle}>Agent Solaris</Text>
          <Text style={styles.headerSubtitle}>Renewable Energy Agent - Solar optimization, wind forecasting, and battery storage</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderRenewableSources()}
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
  sourcesList: {
    gap: 12,
  },
  sourceCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  sourceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sourceName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sourceCapacity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  sourceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  sourceMetric: {
    alignItems: 'center',
  },
  sourceMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  sourceMetricValue: {
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
