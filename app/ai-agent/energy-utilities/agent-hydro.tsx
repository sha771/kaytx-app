import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Droplets, Shield, AlertTriangle, TrendingUp, CheckCircle,
  Clock, Activity, ArrowUpRight, Gauge, Water, Waves
} from 'lucide-react-native';
import { ENERGY_COLORS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function AgentHydro() {
  const HYDRO_METRICS = [
    { label: 'Leaks Prevented', value: '840', icon: Shield, color: ENERGY_COLORS.emeraldGreen, trend: '+28.6%', trendUp: true },
    { label: 'Water Efficiency', value: '94.8%', icon: Gauge, color: ENERGY_COLORS.neonCyan, trend: '+4.2%', trendUp: true },
    { label: 'Service Availability', value: '99.2%', icon: CheckCircle, color: ENERGY_COLORS.electricBlue, trend: '+1.8%', trendUp: true },
    { label: 'Water Production', value: '8.4B m³', icon: Water, color: ENERGY_COLORS.purple, trend: '+6.4%', trendUp: true },
    { label: 'Quality Score', value: '99.8%', icon: Droplets, color: ENERGY_COLORS.amber, trend: '+0.4%', trendUp: true },
    { label: 'Distribution Health', value: '96.4%', icon: Waves, color: ENERGY_COLORS.magenta, trend: '+3.8%', trendUp: true },
  ];

  const WATER_NETWORKS = [
    { network: 'Distribution Networks', length: '480,000 km', leaks: '0.8%', pressure: '98.2%', color: ENERGY_COLORS.electricBlue },
    { network: 'Treatment Plants', count: '640', capacity: '12.8B m³', efficiency: '94.2%', color: ENERGY_COLORS.neonCyan },
    { network: 'Reservoir Levels', capacity: '84%', volume: '12.4B m³', quality: '99.6%', color: ENERGY_COLORS.emeraldGreen },
    { network: 'Smart Meters', deployment: '68%', readings: '84M/day', accuracy: '99.4%', color: ENERGY_COLORS.purple },
  ];

  const HYDRO_ALERTS = [
    { type: 'alert', message: 'Minor leak detected in sector 7 distribution network - repair team dispatched', impact: 'Medium', time: '2h ago' },
    { type: 'opportunity', message: 'Water efficiency optimization could save $8M annually in operational costs', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Water quality score maintained at 99.8% across all treatment facilities', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Smart meter deployment increased to 68% with 99.4% accuracy', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Hydro Metrics</Text>
      <View style={styles.metricsGrid}>
        {HYDRO_METRICS.map((metric, index) => (
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
        {WATER_NETWORKS.map((network) => (
          <View key={network.network} style={[styles.networkCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: network.color }]}>
            <View style={styles.networkHeader}>
              <Droplets size={20} color={network.color} />
              <Text style={styles.networkName}>{network.network}</Text>
              <Text style={styles.networkValue}>{network.length || network.count || network.capacity}</Text>
            </View>
            <View style={styles.networkMetrics}>
              <View style={styles.networkMetric}>
                <Shield size={12} color="#6B7280" />
                <Text style={styles.networkMetricLabel}>Efficiency/Leaks</Text>
                <Text style={styles.networkMetricValue}>{network.efficiency || network.leaks}</Text>
              </View>
              <View style={styles.networkMetric}>
                <Gauge size={12} color="#6B7280" />
                <Text style={styles.networkMetricLabel}>Pressure/Quality</Text>
                <Text style={styles.networkMetricValue}>{network.pressure || network.quality}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Hydro Alerts</Text>
      {HYDRO_ALERTS.map((alert, index) => (
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
          <Text style={styles.headerTitle}>Agent Hydro</Text>
          <Text style={styles.headerSubtitle}>Water Utility Agent - Water distribution, leak detection, and consumption forecasting</Text>
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
