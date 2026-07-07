import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Building2, Zap, Flame, Droplets, Wind, Sun, Gauge, Activity,
  AlertTriangle, TrendingUp, CheckCircle, Clock, ArrowUpRight, Power
} from 'lucide-react-native';
import { ENERGY_COLORS, POWER_PLANT_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function PowerGeneration() {
  const GENERATION_METRICS = [
    { label: 'Total Output', value: '845 GW', icon: Zap, color: ENERGY_COLORS.electricBlue, trend: '+8.4%', trendUp: true },
    { label: 'Plant Availability', value: '94.2%', icon: CheckCircle, color: ENERGY_COLORS.emeraldGreen, trend: '+2.4%', trendUp: true },
    { label: 'Capacity Utilization', value: '70.4%', icon: Gauge, color: ENERGY_COLORS.neonCyan, trend: '+4.8%', trendUp: true },
    { label: 'Generation Efficiency', value: '88.4%', icon: Activity, color: ENERGY_COLORS.purple, trend: '+1.8%', trendUp: true },
    { label: 'Active Plants', value: '6,800', icon: Building2, color: ENERGY_COLORS.amber, trend: '+4.2%', trendUp: true },
    { label: 'Output Forecast', value: '862 GW', icon: TrendingUp, color: ENERGY_COLORS.magenta, trend: '+2.0%', trendUp: true },
  ];

  const GENERATION_ALERTS = [
    { type: 'alert', message: 'Thermal plant T-240 operating at 92% capacity - maintenance recommended', impact: 'Medium', time: '2h ago' },
    { type: 'opportunity', message: 'Nuclear plant efficiency optimization could increase output by 4%', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Hydroelectric generation exceeded forecast by 6% due to favorable conditions', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Solar farm output increasing with seasonal peak approaching', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Power Generation Metrics</Text>
      <View style={styles.metricsGrid}>
        {GENERATION_METRICS.map((metric, index) => (
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

  const renderPowerPlants = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Power Plant Performance</Text>
      <View style={styles.plantsList}>
        {POWER_PLANT_DATA.map((plant) => {
          let icon = Building2;
          if (plant.type.includes('Thermal')) icon = Flame;
          if (plant.type.includes('Nuclear')) icon = Zap;
          if (plant.type.includes('Hydro')) icon = Droplets;
          if (plant.type.includes('Gas')) icon = Flame;
          if (plant.type.includes('Solar')) icon = Sun;
          if (plant.type.includes('Wind')) icon = Wind;
          
          return (
            <View key={plant.type} style={[styles.plantCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: plant.availability === '96.8%' ? ENERGY_COLORS.emeraldGreen : plant.availability === '94.2%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
              <View style={styles.plantHeader}>
                <icon size={20} color={plant.availability === '96.8%' ? ENERGY_COLORS.emeraldGreen : plant.availability === '94.2%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
                <Text style={styles.plantName}>{plant.type}</Text>
                <Text style={styles.plantCount}>{plant.count}</Text>
              </View>
              <View style={styles.plantMetrics}>
                <View style={styles.plantMetric}>
                  <Power size={12} color="#6B7280" />
                  <Text style={styles.plantMetricLabel}>Capacity</Text>
                  <Text style={styles.plantMetricValue}>{plant.capacity}</Text>
                </View>
                <View style={styles.plantMetric}>
                  <Zap size={12} color="#6B7280" />
                  <Text style={styles.plantMetricLabel}>Output</Text>
                  <Text style={styles.plantMetricValue}>{plant.output}</Text>
                </View>
                <View style={styles.plantMetric}>
                  <Gauge size={12} color="#6B7280" />
                  <Text style={styles.plantMetricLabel}>Efficiency</Text>
                  <Text style={styles.plantMetricValue}>{plant.efficiency}</Text>
                </View>
                <View style={styles.plantMetric}>
                  <CheckCircle size={12} color="#6B7280" />
                  <Text style={styles.plantMetricLabel}>Availability</Text>
                  <Text style={styles.plantMetricValue}>{plant.availability}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Power Generation Alerts</Text>
      {GENERATION_ALERTS.map((alert, index) => (
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
        <Power size={32} color={ENERGY_COLORS.electricBlue} />
        <View>
          <Text style={styles.headerTitle}>Power Generation Hub</Text>
          <Text style={styles.headerSubtitle}>Thermal, nuclear, hydroelectric, and renewable power generation monitoring</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderPowerPlants()}
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
  plantsList: {
    gap: 12,
  },
  plantCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  plantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  plantName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  plantCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  plantMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  plantMetric: {
    alignItems: 'center',
  },
  plantMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  plantMetricValue: {
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
