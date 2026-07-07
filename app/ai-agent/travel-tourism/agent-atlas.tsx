import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Globe, TrendingUp, MapPin, Users, Target, Activity, ArrowUpRight,
  CheckCircle, Clock, AlertTriangle, Brain
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function AgentAtlas() {
  const ATLAS_METRICS = [
    { label: 'Destinations Managed', value: '2,400', icon: Globe, color: TRAVEL_COLORS.purple, trend: '+12.4%', trendUp: true },
    { label: 'Forecast Accuracy', value: '94.2%', icon: Brain, color: TRAVEL_COLORS.neonCyan, trend: '+2.8%', trendUp: true },
    { label: 'Visitor Growth', value: '+28.6%', icon: Users, color: TRAVEL_COLORS.emeraldGreen, trend: '+8.2%', trendUp: true },
    { label: 'Attractions Tracked', value: '12,400', icon: MapPin, color: TRAVEL_COLORS.oceanBlue, trend: '+18.4%', trendUp: true },
    { label: 'Demand Predictions', value: '842K', icon: TrendingUp, color: TRAVEL_COLORS.amber, trend: '+34.2%', trendUp: true },
    { label: 'Seasonal Insights', value: '48', icon: Clock, color: TRAVEL_COLORS.magenta, trend: '+6.4%', trendUp: true },
  ];

  const DESTINATION_PERFORMANCE = [
    { destination: 'Paris', visitors: '4.2M', forecast: '4.5M', accuracy: '96.4%', growth: '+18.6%', color: TRAVEL_COLORS.purple },
    { destination: 'Tokyo', visitors: '3.8M', forecast: '4.0M', accuracy: '94.8%', growth: '+24.2%', color: TRAVEL_COLORS.neonCyan },
    { destination: 'New York', visitors: '3.6M', forecast: '3.8M', accuracy: '95.2%', growth: '+12.4%', color: TRAVEL_COLORS.oceanBlue },
    { destination: 'London', visitors: '3.4M', forecast: '3.5M', accuracy: '97.2%', growth: '+14.8%', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const ATLAS_ALERTS = [
    { type: 'opportunity', message: 'European destinations projected 34% demand increase next quarter', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Asian tourism growth outpacing forecasts by 12%', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Forecast accuracy improved to 94.2% with new ML model', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New destination data integration completed for 8 regions', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Agent Atlas Metrics</Text>
      <View style={styles.metricsGrid}>
        {ATLAS_METRICS.map((metric, index) => (
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

  const renderDestinationPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Destination Performance</Text>
      <View style={styles.destinationsList}>
        {DESTINATION_PERFORMANCE.map((dest) => (
          <View key={dest.destination} style={[styles.destCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: dest.color }]}>
            <View style={styles.destHeader}>
              <Globe size={20} color={dest.color} />
              <Text style={styles.destName}>{dest.destination}</Text>
              <Text style={styles.destVisitors}>{dest.visitors}</Text>
            </View>
            <View style={styles.destMetrics}>
              <View style={styles.destMetric}>
                <Text style={styles.destMetricLabel}>Forecast</Text>
                <Text style={styles.destMetricValue}>{dest.forecast}</Text>
              </View>
              <View style={styles.destMetric}>
                <Text style={styles.destMetricLabel}>Accuracy</Text>
                <Text style={styles.destMetricValue}>{dest.accuracy}</Text>
              </View>
              <View style={styles.destMetric}>
                <Text style={styles.destMetricLabel}>Growth</Text>
                <Text style={[styles.destMetricValue, { color: '#10B981' }]}>{dest.growth}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Atlas Alerts</Text>
      {ATLAS_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'opportunity' ? '#10B98110' : 
                       alert.type === 'trend' ? '#3B82F610' : 
                       alert.type === 'success' ? '#10B98110' : '#8B5CF610',
          borderLeftColor: alert.type === 'opportunity' ? '#10B981' : 
                          alert.type === 'trend' ? '#3B82F6' : 
                          alert.type === 'success' ? '#10B981' : '#8B5CF6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'opportunity' && <TrendingUp size={20} color="#10B981" />}
            {alert.type === 'trend' && <Activity size={20} color="#3B82F6" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Brain size={20} color="#8B5CF6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
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
        <Globe size={32} color={TRAVEL_COLORS.purple} />
        <View>
          <Text style={styles.headerTitle}>Agent Atlas</Text>
          <Text style={styles.headerSubtitle}>Destination Intelligence Agent - Tourism analytics and demand forecasting</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderDestinationPerformance()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TRAVEL_COLORS.deepSpaceBlack,
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
  destinationsList: {
    gap: 12,
  },
  destCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  destHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  destName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  destVisitors: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  destMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  destMetric: {
    alignItems: 'center',
  },
  destMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  destMetricValue: {
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
