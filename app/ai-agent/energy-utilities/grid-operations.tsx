import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Activity, Gauge, Map, AlertTriangle, Zap, Shield, TrendingUp,
  CheckCircle, Clock, ArrowUpRight, Power, Network, Radio
} from 'lucide-react-native';
import { ENERGY_COLORS, GRID_OPERATIONS_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function GridOperations() {
  const GRID_METRICS = [
    { label: 'Grid Load', value: '680 GW', icon: Activity, color: ENERGY_COLORS.neonCyan, trend: '+6.2%', trendUp: true },
    { label: 'Voltage Stability', value: '99.8%', icon: Gauge, color: ENERGY_COLORS.emeraldGreen, trend: '+0.4%', trendUp: true },
    { label: 'Power Distribution', value: '94.2%', icon: Power, color: ENERGY_COLORS.electricBlue, trend: '+4.8%', trendUp: true },
    { label: 'Active Outages', value: '142', icon: AlertTriangle, color: ENERGY_COLORS.amber, trend: '-28.6%', trendUp: true },
    { label: 'Transmission Performance', value: '96.4%', icon: Network, color: ENERGY_COLORS.purple, trend: '+2.4%', trendUp: true },
    { label: 'Grid Frequency', value: '60.00 Hz', icon: Radio, color: ENERGY_COLORS.magenta, trend: 'stable', trendUp: true },
  ];

  const GRID_ALERTS = [
    { type: 'alert', message: 'Grid congestion detected in northeast transmission corridor - load at 82% capacity', impact: 'Critical', time: '2h ago' },
    { type: 'opportunity', message: 'Load balancing optimization could reduce transmission losses by 8%', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Voltage stability maintained at 99.8% across all regions', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Peak demand shifting to earlier hours - adjust dispatch schedules', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Grid Operations Metrics</Text>
      <View style={styles.metricsGrid}>
        {GRID_METRICS.map((metric, index) => (
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
      <Text style={styles.sectionTitle}>Regional Grid Status</Text>
      <View style={styles.regionsList}>
        {GRID_OPERATIONS_DATA.map((region) => (
          <View key={region.region} style={[styles.regionCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: region.stability === '99.8%' ? ENERGY_COLORS.emeraldGreen : region.stability === '99.6%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
            <View style={styles.regionHeader}>
              <Map size={20} color={region.stability === '99.8%' ? ENERGY_COLORS.emeraldGreen : region.stability === '99.6%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
              <Text style={styles.regionName}>{region.region}</Text>
              <Text style={styles.regionLoad}>{region.load}</Text>
            </View>
            <View style={styles.regionMetrics}>
              <View style={styles.regionMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.regionMetricLabel}>Load</Text>
                <Text style={styles.regionMetricValue}>{region.load} / {region.capacity}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Radio size={12} color="#6B7280" />
                <Text style={styles.regionMetricLabel}>Frequency</Text>
                <Text style={styles.regionMetricValue}>{region.frequency}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Gauge size={12} color="#6B7280" />
                <Text style={styles.regionMetricLabel}>Voltage</Text>
                <Text style={styles.regionMetricValue}>{region.voltage}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Shield size={12} color="#6B7280" />
                <Text style={styles.regionMetricLabel}>Stability</Text>
                <Text style={styles.regionMetricValue}>{region.stability}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Grid Operations Alerts</Text>
      {GRID_ALERTS.map((alert, index) => (
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
        <Network size={32} color={ENERGY_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>Grid Operations Command Center</Text>
          <Text style={styles.headerSubtitle}>Real-time grid monitoring, load balancing, and transmission management</Text>
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
