import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Building2, Wrench, AlertTriangle, Shield, TrendingUp, CheckCircle,
  Clock, Activity, ArrowUpRight, Settings, Zap, Gauge
} from 'lucide-react-native';
import { ENERGY_COLORS } from '@/constants/energyUtilities';

const { width } = Dimensions.get('window');

export default function AgentTitan() {
  const TITAN_METRICS = [
    { label: 'Assets Monitored', value: '124,000', icon: Building2, color: ENERGY_COLORS.purple, trend: '+12.4%', trendUp: true },
    { label: 'Maintenance Accuracy', value: '96.8%', icon: Wrench, color: ENERGY_COLORS.emeraldGreen, trend: '+4.2%', trendUp: true },
    { label: 'Downtime Reduction', value: '42%', icon: Activity, color: ENERGY_COLORS.neonCyan, trend: '+18.6%', trendUp: true },
    { label: 'Equipment Health', value: '95.2%', icon: Gauge, color: ENERGY_COLORS.electricBlue, trend: '+6.4%', trendUp: true },
    { label: 'Predictive Alerts', value: '2,840', icon: AlertTriangle, color: ENERGY_COLORS.amber, trend: '+34.6%', trendUp: true },
    { label: 'Failure Prevention', value: '98.4%', icon: Shield, color: ENERGY_COLORS.magenta, trend: '+8.2%', trendUp: true },
  ];

  const INFRASTRUCTURE_ASSETS = [
    { asset: 'Substations', count: '12,400', health: '96.8%', critical: '240', color: ENERGY_COLORS.purple },
    { asset: 'Transmission Lines', length: '480,000 km', condition: '94.4%', load: '78.6%', color: ENERGY_COLORS.electricBlue },
    { asset: 'Transformers', count: '48,000', health: '95.2%', failures: '12', color: ENERGY_COLORS.neonCyan },
    { asset: 'Distribution Assets', count: '2.4M', health: '93.8%', critical: '8,400', color: ENERGY_COLORS.amber },
  ];

  const TITAN_ALERTS = [
    { type: 'alert', message: 'Predictive maintenance identified transformer failures with 97% confidence in northeast corridor', impact: 'Critical', time: '2h ago' },
    { type: 'opportunity', message: 'Equipment optimization could reduce maintenance costs by $18M annually', impact: 'High', time: '4h ago' },
    { type: 'success', message: 'Asset health score improved to 95.2% with new monitoring system', impact: 'Positive', time: '6h ago' },
    { type: 'trend', message: 'Equipment failure rate decreased by 42% over past quarter', impact: 'Medium', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Titan Metrics</Text>
      <View style={styles.metricsGrid}>
        {TITAN_METRICS.map((metric, index) => (
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

  const renderInfrastructureAssets = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Infrastructure Assets</Text>
      <View style={styles.assetsList}>
        {INFRASTRUCTURE_ASSETS.map((asset) => (
          <View key={asset.asset} style={[styles.assetCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: asset.color }]}>
            <View style={styles.assetHeader}>
              <Building2 size={20} color={asset.color} />
              <Text style={styles.assetName}>{asset.asset}</Text>
              <Text style={styles.assetCount}>{asset.count || asset.length}</Text>
            </View>
            <View style={styles.assetMetrics}>
              <View style={styles.assetMetric}>
                <Shield size={12} color="#6B7280" />
                <Text style={styles.assetMetricLabel}>Health</Text>
                <Text style={styles.assetMetricValue}>{asset.health || asset.condition}</Text>
              </View>
              <View style={styles.assetMetric}>
                <AlertTriangle size={12} color="#6B7280" />
                <Text style={styles.assetMetricLabel}>Critical</Text>
                <Text style={styles.assetMetricValue}>{asset.critical || asset.failures}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Titan Alerts</Text>
      {TITAN_ALERTS.map((alert, index) => (
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
        <Building2 size={32} color={ENERGY_COLORS.purple} />
        <View>
          <Text style={styles.headerTitle}>Agent Titan</Text>
          <Text style={styles.headerSubtitle}>Infrastructure Agent - Asset monitoring, predictive maintenance, and equipment diagnostics</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderInfrastructureAssets()}
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
  assetsList: {
    gap: 12,
  },
  assetCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  assetCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  assetMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  assetMetric: {
    alignItems: 'center',
  },
  assetMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  assetMetricValue: {
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
