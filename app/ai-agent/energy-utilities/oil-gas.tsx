import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Flame, Droplets, Truck, Building2, Gauge, Activity, AlertTriangle,
  TrendingUp, CheckCircle, Clock, ArrowUpRight, Wrench, Shield
} from 'lucide-react-native';
import { ENERGY_COLORS, OIL_GAS_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function OilGas() {
  const OIL_GAS_METRICS = [
    { label: 'Production Volume', value: '2.4M bpd', icon: Droplets, color: ENERGY_COLORS.amber, trend: '+4.2%', trendUp: true },
    { label: 'Refinery Utilization', value: '88.4%', icon: Building2, color: ENERGY_COLORS.electricBlue, trend: '+2.8%', trendUp: true },
    { label: 'Pipeline Integrity', value: '99.2%', icon: Truck, color: ENERGY_COLORS.emeraldGreen, trend: '+0.4%', trendUp: true },
    { label: 'Storage Utilization', value: '78.4%', icon: Shield, color: ENERGY_COLORS.neonCyan, trend: '+6.4%', trendUp: true },
    { label: 'Distribution Reliability', value: '98.6%', icon: Gauge, color: ENERGY_COLORS.purple, trend: '+1.2%', trendUp: true },
    { label: 'Safety Score', value: '99.8%', icon: Wrench, color: ENERGY_COLORS.magenta, trend: '+0.2%', trendUp: true },
  ];

  const OIL_GAS_ALERTS = [
    { type: 'alert', message: 'Pipeline pressure anomaly detected in sector 4 - inspection team dispatched', impact: 'Medium', time: '2h ago' },
    { type: 'opportunity', message: 'Refinery optimization could increase throughput by 6% with AI scheduling', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Safety record maintained at 99.8% with zero incidents this quarter', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Production efficiency increasing by 4.2% with new drilling technology', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Oil & Gas Operations Metrics</Text>
      <View style={styles.metricsGrid}>
        {OIL_GAS_METRICS.map((metric, index) => (
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

  const renderOilGasFacilities = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Oil & Gas Facilities</Text>
      <View style={styles.facilitiesList}>
        {OIL_GAS_DATA.map((facility) => (
          <View key={facility.facility} style={[styles.facilityCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: facility.safety === '99.8%' ? ENERGY_COLORS.emeraldGreen : facility.integrity === '99.2%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
            <View style={styles.facilityHeader}>
              <Building2 size={20} color={facility.safety === '99.8%' ? ENERGY_COLORS.emeraldGreen : facility.integrity === '99.2%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
              <Text style={styles.facilityName}>{facility.facility}</Text>
              <Text style={styles.facilityCount}>{facility.count || facility.length}</Text>
            </View>
            <View style={styles.facilityMetrics}>
              <View style={styles.facilityMetric}>
                <Droplets size={12} color="#6B7280" />
                <Text style={styles.facilityMetricLabel}>Output/Flow</Text>
                <Text style={styles.facilityMetricValue}>{facility.output || facility.flow || facility.throughput}</Text>
              </View>
              <View style={styles.facilityMetric}>
                <Gauge size={12} color="#6B7280" />
                <Text style={styles.facilityMetricLabel}>Efficiency/Util</Text>
                <Text style={styles.facilityMetricValue}>{facility.efficiency || facility.utilization}</Text>
              </View>
              <View style={styles.facilityMetric}>
                <Shield size={12} color="#6B7280" />
                <Text style={styles.facilityMetricLabel}>Integrity/Safety</Text>
                <Text style={styles.facilityMetricValue}>{facility.integrity || facility.safety}</Text>
              </View>
              <View style={styles.facilityMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.facilityMetricLabel}>Uptime/Reliability</Text>
                <Text style={styles.facilityMetricValue}>{facility.uptime || facility.reliability}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Oil & Gas Alerts</Text>
      {OIL_GAS_ALERTS.map((alert, index) => (
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
        <Flame size={32} color={ENERGY_COLORS.amber} />
        <View>
          <Text style={styles.headerTitle}>Oil & Gas Operations</Text>
          <Text style={styles.headerSubtitle}>Production, refining, pipelines, and distribution monitoring</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderOilGasFacilities()}
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
  facilitiesList: {
    gap: 12,
  },
  facilityCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  facilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  facilityName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  facilityCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  facilityMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  facilityMetric: {
    alignItems: 'center',
  },
  facilityMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  facilityMetricValue: {
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
