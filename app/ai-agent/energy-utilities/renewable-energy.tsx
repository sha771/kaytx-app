import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Sun, Wind, Droplets, Zap, Battery, Leaf, TrendingUp, CheckCircle,
  Clock, Activity, ArrowUpRight, Gauge, Cloud, Flame
} from 'lucide-react-native';
import { ENERGY_COLORS, RENEWABLE_ENERGY_DATA } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function RenewableEnergy() {
  const RENEWABLE_METRICS = [
    { label: 'Total Renewable Output', value: '406 GW', icon: Zap, color: ENERGY_COLORS.emeraldGreen, trend: '+18.4%', trendUp: true },
    { label: 'Renewable Share', value: '48%', icon: Leaf, color: ENERGY_COLORS.neonCyan, trend: '+18.4%', trendUp: true },
    { label: 'Storage Capacity', value: '40 GW', icon: Battery, color: ENERGY_COLORS.electricBlue, trend: '+24.6%', trendUp: true },
    { label: 'Carbon Offset', value: '172 Mt', icon: Cloud, color: ENERGY_COLORS.purple, trend: '+22.4%', trendUp: true },
    { label: 'Forecast Accuracy', value: '94.8%', icon: Gauge, color: ENERGY_COLORS.amber, trend: '+4.2%', trendUp: true },
    { label: 'Grid Integration', value: '92.4%', icon: Activity, color: ENERGY_COLORS.magenta, trend: '+6.8%', trendUp: true },
  ];

  const RENEWABLE_ALERTS = [
    { type: 'opportunity', message: 'Renewable generation will exceed forecast by 12% tomorrow due to favorable weather', impact: 'High', time: '2h ago' },
    { type: 'success', message: 'Solar farm efficiency improved to 81.6% with new AI optimization algorithms', impact: 'Positive', time: '4h ago' },
    { type: 'trend', message: 'Wind generation increasing by 28.4% with seasonal peak approaching', impact: 'Medium', time: '6h ago' },
    { type: 'alert', message: 'Battery storage at 78% capacity - consider discharge optimization', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Renewable Energy Metrics</Text>
      <View style={styles.metricsGrid}>
        {RENEWABLE_METRICS.map((metric, index) => (
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
        {RENEWABLE_ENERGY_DATA.map((source) => {
          let icon = Sun;
          if (source.source.includes('Wind')) icon = Wind;
          if (source.source.includes('Hydro')) icon = Droplets;
          if (source.source.includes('Geothermal')) icon = Flame;
          if (source.source.includes('Biomass')) icon = Leaf;
          
          return (
            <View key={source.source} style={[styles.sourceCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: source.efficiency === '93.4%' ? ENERGY_COLORS.emeraldGreen : source.efficiency === '91.6%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber }]}>
              <View style={styles.sourceHeader}>
                <icon size={20} color={source.efficiency === '93.4%' ? ENERGY_COLORS.emeraldGreen : source.efficiency === '91.6%' ? ENERGY_COLORS.neonCyan : ENERGY_COLORS.amber} />
                <Text style={styles.sourceName}>{source.source}</Text>
                <Text style={styles.sourceCapacity}>{source.capacity}</Text>
              </View>
              <View style={styles.sourceMetrics}>
                <View style={styles.sourceMetric}>
                  <Zap size={12} color="#6B7280" />
                  <Text style={styles.sourceMetricLabel}>Output</Text>
                  <Text style={styles.sourceMetricValue}>{source.output}</Text>
                </View>
                <View style={styles.sourceMetric}>
                  <Gauge size={12} color="#6B7280" />
                  <Text style={styles.sourceMetricLabel}>Efficiency</Text>
                  <Text style={styles.sourceMetricValue}>{source.efficiency}</Text>
                </View>
                <View style={styles.sourceMetric}>
                  <TrendingUp size={12} color="#6B7280" />
                  <Text style={styles.sourceMetricLabel}>Growth</Text>
                  <Text style={styles.sourceMetricValue}>{source.growth}</Text>
                </View>
                <View style={styles.sourceMetric}>
                  <Leaf size={12} color="#6B7280" />
                  <Text style={styles.sourceMetricLabel}>Carbon</Text>
                  <Text style={styles.sourceMetricValue}>{source.carbonOffset}</Text>
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
      <Text style={styles.sectionTitle}>Renewable Energy Alerts</Text>
      {RENEWABLE_ALERTS.map((alert, index) => (
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
          <Text style={styles.headerTitle}>Renewable Energy Center</Text>
          <Text style={styles.headerSubtitle}>Solar, wind, hydro, geothermal, and biomass energy monitoring</Text>
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
