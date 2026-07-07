import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Droplets, Shield, Gauge, Activity, AlertTriangle, TrendingUp, CheckCircle,
  Clock, ArrowUpRight, Water, Waves, Building2, Zap
} from 'lucide-react-native';
import { ENERGY_COLORS, WATER_UTILITIES_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function WaterUtilities() {
  const WATER_METRICS = [
    { label: 'Water Production', value: '8.4B m³', icon: Water, color: ENERGY_COLORS.electricBlue, trend: '+6.4%', trendUp: true },
    { label: 'Distribution Efficiency', value: '99.2%', icon: Shield, color: ENERGY_COLORS.emeraldGreen, trend: '+1.8%', trendUp: true },
    { label: 'Leak Rate', value: '0.8%', icon: AlertTriangle, color: ENERGY_COLORS.amber, trend: '-12.4%', trendUp: true },
    { label: 'Water Quality', value: '99.8%', icon: Droplets, color: ENERGY_COLORS.neonCyan, trend: '+0.4%', trendUp: true },
    { label: 'Smart Meter Coverage', value: '68%', icon: Zap, color: ENERGY_COLORS.purple, trend: '+14.2%', trendUp: true },
    { label: 'Service Availability', value: '99.4%', icon: CheckCircle, color: ENERGY_COLORS.magenta, trend: '+0.6%', trendUp: true },
  ];

  const WATER_ALERTS = [
    { type: 'alert', message: 'Minor leak detected in sector 7 distribution network - repair team dispatched', impact: 'Medium', time: '2h ago' },
    { type: 'opportunity', message: 'Smart meter expansion could save $8M annually in operational costs', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Water quality score maintained at 99.8% across all treatment facilities', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Water efficiency improving by 4.2% with new monitoring systems', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Water Utilities Metrics</Text>
      <View style={styles.metricsGrid}>
        {WATER_METRICS.map((metric, index) => (
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

  const renderWaterNetworks = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Water Networks</Text>
      <View style={styles.networksList}>
        {WATER_UTILITIES_DATA.map((network) => (
          <View key={network.metric} style={[styles.networkCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: network.quality === '99.8%' ? ENERGY_COLORS.emeraldGreen : network.efficiency === '94.2%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
            <View style={styles.networkHeader}>
              <Droplets size={20} color={network.quality === '99.8%' ? ENERGY_COLORS.emeraldGreen : network.efficiency === '94.2%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
              <Text style={styles.networkName}>{network.metric}</Text>
              <Text style={styles.networkValue}>{network.value}</Text>
            </View>
            <View style={styles.networkMetrics}>
              <View style={styles.networkMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.networkMetricLabel}>Trend</Text>
                <Text style={styles.networkMetricValue}>{network.trend}</Text>
              </View>
              <View style={styles.networkMetric}>
                <Gauge size={12} color="#6B7280" />
                <Text style={styles.networkMetricLabel}>Efficiency</Text>
                <Text style={styles.networkMetricValue}>{network.efficiency}</Text>
              </View>
              <View style={styles.networkMetric}>
                <Shield size={12} color="#6B7280" />
                <Text style={styles.networkMetricLabel}>Quality/Reliability</Text>
                <Text style={styles.networkMetricValue}>{network.quality || network.reliability}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Water Utilities Alerts</Text>
      {WATER_ALERTS.map((alert, index) => (
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
        <Droplets size={32} color={ENERGY_COLORS.electricBlue} />
        <View>
          <Text style={styles.headerTitle}>Water Utilities Hub</Text>
          <Text style={styles.headerSubtitle}>Water production, distribution, quality, and smart meter monitoring</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderWaterNetworks()}
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
  networksList: {
    gap: 12,
  },
  networkCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  networkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  networkName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  networkValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  networkMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  networkMetric: {
    alignItems: 'center',
  },
  networkMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  networkMetricValue: {
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
