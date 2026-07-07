import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Globe, TrendingUp, Users, DollarSign, CheckCircle, Clock, Target,
  AlertTriangle, Activity, ArrowUpRight, MapPin, Cloud, Calendar
} from 'lucide-react-native';
import { TRAVEL_COLORS, POPULAR_DESTINATIONS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function DestinationIntelligence() {
  const DESTINATION_METRICS = [
    { label: 'Destinations Tracked', value: '2,400', icon: Globe, color: TRAVEL_COLORS.purple, trend: '+12.4%', trendUp: true },
    { label: 'Visitor Growth', value: '+28.6%', icon: Users, color: TRAVEL_COLORS.emeraldGreen, trend: '+8.2%', trendUp: true },
    { label: 'Tourism Revenue', value: '$8.4B', icon: DollarSign, color: TRAVEL_COLORS.oceanBlue, trend: '+22.4%', trendUp: true },
    { label: 'Forecast Accuracy', value: '94.2%', icon: Target, color: TRAVEL_COLORS.neonCyan, trend: '+2.8%', trendUp: true },
    { label: 'Seasonal Demand', value: '+34%', icon: TrendingUp, color: TRAVEL_COLORS.amber, trend: '+12.4%', trendUp: true },
    { label: 'Weather Impact', value: '18%', icon: Cloud, color: TRAVEL_COLORS.magenta, trend: '-4.2%', trendUp: true },
  ];

  const REGIONAL_PERFORMANCE = [
    { region: 'Europe', visitors: '12.4M', revenue: '$4.8B', growth: '+18.6%', color: TRAVEL_COLORS.purple },
    { region: 'Asia Pacific', visitors: '10.8M', revenue: '$2.8B', growth: '+32.4%', color: TRAVEL_COLORS.neonCyan },
    { region: 'North America', visitors: '8.4M', revenue: '$3.2B', growth: '+14.2%', color: TRAVEL_COLORS.oceanBlue },
    { region: 'Latin America', visitors: '4.2M', revenue: '$1.2B', growth: '+24.8%', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const DESTINATION_ALERTS = [
    { type: 'opportunity', message: 'European destinations projected 34% demand increase next quarter', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'Asia Pacific tourism growth outpacing forecasts by 12%', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Destination intelligence accuracy improved to 94.2%', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New destination data integration completed for 8 regions', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Destination Intelligence Metrics</Text>
      <View style={styles.metricsGrid}>
        {DESTINATION_METRICS.map((metric, index) => (
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

  const renderPopularDestinations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Popular Destinations</Text>
      <View style={styles.destinationsList}>
        {POPULAR_DESTINATIONS.map((dest) => (
          <View key={dest.destination} style={[styles.destCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: TRAVEL_COLORS.purple }]}>
            <View style={styles.destHeader}>
              <Globe size={20} color={TRAVEL_COLORS.purple} />
              <Text style={styles.destName}>{dest.destination}</Text>
              <Text style={styles.destVisitors}>{dest.visitors}</Text>
            </View>
            <View style={styles.destMetrics}>
              <View style={styles.destMetric}>
                <Text style={styles.destMetricLabel}>Revenue</Text>
                <Text style={styles.destMetricValue}>{dest.revenue}</Text>
              </View>
              <View style={styles.destMetric}>
                <Text style={styles.destMetricLabel}>Satisfaction</Text>
                <Text style={styles.destMetricValue}>{dest.satisfaction}</Text>
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

  const renderRegionalPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Regional Performance</Text>
      <View style={styles.regionsList}>
        {REGIONAL_PERFORMANCE.map((region) => (
          <View key={region.region} style={[styles.regionCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: region.color }]}>
            <View style={styles.regionHeader}>
              <MapPin size={20} color={region.color} />
              <Text style={styles.regionName}>{region.region}</Text>
              <Text style={styles.regionVisitors}>{region.visitors}</Text>
            </View>
            <View style={styles.regionMetrics}>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricLabel}>Revenue</Text>
                <Text style={styles.regionMetricValue}>{region.revenue}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricLabel}>Growth</Text>
                <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{region.growth}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Destination Alerts</Text>
      {DESTINATION_ALERTS.map((alert, index) => (
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
            {alert.type === 'info' && <Globe size={20} color="#8B5CF6" />}
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
          <Text style={styles.headerTitle}>Destination Intelligence</Text>
          <Text style={styles.headerSubtitle}>Tourism analytics and destination performance</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderPopularDestinations()}
      {renderRegionalPerformance()}
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
  regionVisitors: {
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
