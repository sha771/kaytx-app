import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Zap, Activity, AlertTriangle, Shield, TrendingUp, CheckCircle,
  Clock, Gauge, Map, ArrowUpRight, Bell, Settings
} from 'lucide-react-native';
import { ENERGY_COLORS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function AgentVolt() {
  const VOLT_METRICS = [
    { label: 'Grid Stability', value: '99.98%', icon: Shield, color: ENERGY_COLORS.emeraldGreen, trend: '+0.2%', trendUp: true },
    { label: 'Load Efficiency', value: '94.2%', icon: Gauge, color: ENERGY_COLORS.neonCyan, trend: '+4.8%', trendUp: true },
    { label: 'Outages Prevented', value: '1,240', icon: AlertTriangle, color: ENERGY_COLORS.amber, trend: '+28.6%', trendUp: true },
    { label: 'Voltage Optimization', value: '98.4%', icon: Activity, color: ENERGY_COLORS.purple, trend: '+2.4%', trendUp: true },
    { label: 'Response Time', value: '1.2s', icon: Clock, color: ENERGY_COLORS.electricBlue, trend: '-18.4%', trendUp: true },
    { label: 'Grid Optimizations', value: '18,400', icon: Settings, color: ENERGY_COLORS.magenta, trend: '+42.8%', trendUp: true },
  ];

  const GRID_REGIONS = [
    { region: 'Northeast', load: '180 GW', stability: '99.8%', voltage: '138 kV', color: ENERGY_COLORS.neonCyan },
    { region: 'Southeast', load: '160 GW', stability: '99.6%', voltage: '138 kV', color: ENERGY_COLORS.electricBlue },
    { region: 'Midwest', load: '140 GW', stability: '99.4%', voltage: '138 kV', color: ENERGY_COLORS.emeraldGreen },
    { region: 'West', load: '120 GW', stability: '99.2%', voltage: '138 kV', color: ENERGY_COLORS.purple },
    { region: 'Southwest', load: '80 GW', stability: '99.0%', voltage: '138 kV', color: ENERGY_COLORS.amber },
  ];

  const VOLT_ALERTS = [
    { type: 'alert', message: 'Grid congestion detected in northeast transmission corridor', impact: 'Critical', time: '2h ago' },
    { type: 'opportunity', message: 'Load balancing optimization could save $12M annually', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Voltage stability improved to 99.98% across all regions', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Peak demand patterns shifting to earlier hours', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Volt Metrics</Text>
      <View style={styles.metricsGrid}>
        {VOLT_METRICS.map((metric, index) => (
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

  const renderGridRegions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Grid Regions Status</Text>
      <View style={styles.regionsList}>
        {GRID_REGIONS.map((region) => (
          <View key={region.region} style={[styles.regionCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: region.color }]}>
            <View style={styles.regionHeader}>
              <Map size={20} color={region.color} />
              <Text style={styles.regionName}>{region.region}</Text>
              <Text style={styles.regionLoad}>{region.load}</Text>
            </View>
            <View style={styles.regionMetrics}>
              <View style={styles.regionMetric}>
                <Shield size={12} color="#6B7280" />
                <Text style={styles.regionMetricLabel}>Stability</Text>
                <Text style={styles.regionMetricValue}>{region.stability}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.regionMetricLabel}>Voltage</Text>
                <Text style={styles.regionMetricValue}>{region.voltage}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Volt Alerts</Text>
      {VOLT_ALERTS.map((alert, index) => (
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
        <Zap size={32} color={ENERGY_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>Agent Volt</Text>
          <Text style={styles.headerSubtitle}>Grid Intelligence Agent - Grid monitoring, load balancing, and outage prediction</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderGridRegions()}
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
  regionsList: {
    gap: 12,
  },
  regionCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  regionLoad: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  regionMetric: {
    alignItems: 'center',
  },
  regionMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  regionMetricValue: {
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
