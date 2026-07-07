import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Globe, Plane, Hotel, DollarSign, Users, TrendingUp, 
  MapPin, Activity, ArrowUpRight, Route, Compass
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function GlobalTravelOperations() {
  const GLOBAL_METRICS = [
    { label: 'Global Traveler Activity', value: '38M', icon: Users, color: TRAVEL_COLORS.purple, trend: '+15.6%', trendUp: true },
    { label: 'Hotel Network', value: '45,000', icon: Hotel, color: TRAVEL_COLORS.magenta, trend: '+12.4%', trendUp: true },
    { label: 'Flight Routes', value: '4,200', icon: Route, color: TRAVEL_COLORS.amber, trend: '+8.6%', trendUp: true },
    { label: 'Tourism Revenue', value: '$8.4B', icon: DollarSign, color: TRAVEL_COLORS.emeraldGreen, trend: '+22.4%', trendUp: true },
    { label: 'Regional Demand', value: '+28.6%', icon: TrendingUp, color: TRAVEL_COLORS.oceanBlue, trend: '+12.4%', trendUp: true },
    { label: 'Destinations', value: '2,400', icon: MapPin, color: TRAVEL_COLORS.neonCyan, trend: '+6.8%', trendUp: true },
  ];

  const REGIONAL_DATA = [
    { region: 'North America', travelers: '12.4M', hotels: '18,400', routes: '1,200', revenue: '$3.2B', growth: '+14.2%', color: TRAVEL_COLORS.oceanBlue },
    { region: 'Europe', travelers: '10.8M', hotels: '15,200', routes: '980', revenue: '$2.8B', growth: '+18.6%', color: TRAVEL_COLORS.purple },
    { region: 'Asia Pacific', travelers: '8.4M', hotels: '6,800', routes: '1,400', revenue: '$1.8B', growth: '+32.4%', color: TRAVEL_COLORS.neonCyan },
    { region: 'Latin America', travelers: '4.2M', hotels: '3,200', routes: '420', revenue: '$420M', growth: '+24.8%', color: TRAVEL_COLORS.emeraldGreen },
    { region: 'Middle East', travelers: '2.2M', hotels: '1,400', routes: '200', revenue: '$180M', growth: '+28.6%', color: TRAVEL_COLORS.amber },
  ];

  const GLOBAL_ALERTS = [
    { type: 'opportunity', message: 'Asia Pacific showing 32% growth - expand inventory allocation', impact: 'High', time: '2h ago' },
    { type: 'trend', message: 'European demand exceeding forecasts by 12% across major destinations', impact: 'Medium', time: '4h ago' },
    { type: 'success', message: 'Global tourism revenue reached $8.4B this quarter', impact: 'Positive', time: '6h ago' },
    { type: 'info', message: 'New route partnerships added in Middle East region', impact: 'Low', time: '8h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Global Travel Operations Metrics</Text>
      <View style={styles.metricsGrid}>
        {GLOBAL_METRICS.map((metric, index) => (
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

  const renderRegionalData = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Regional Performance</Text>
      <View style={styles.regionsList}>
        {REGIONAL_DATA.map((region) => (
          <View key={region.region} style={[styles.regionCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: region.color }]}>
            <View style={styles.regionHeader}>
              <Globe size={20} color={region.color} />
              <Text style={styles.regionName}>{region.region}</Text>
              <Text style={[styles.regionGrowth, { color: '#10B981' }]}>{region.growth}</Text>
            </View>
            <View style={styles.regionMetrics}>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricLabel}>Travelers</Text>
                <Text style={styles.regionMetricValue}>{region.travelers}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricLabel}>Hotels</Text>
                <Text style={styles.regionMetricValue}>{region.hotels}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricLabel}>Routes</Text>
                <Text style={styles.regionMetricValue}>{region.routes}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricLabel}>Revenue</Text>
                <Text style={styles.regionMetricValue}>{region.revenue}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderGlobalHeatmap = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Global Travel Heatmap</Text>
      <View style={styles.heatmapContainer}>
        <View style={styles.heatmapPlaceholder}>
          <Globe size={64} color={TRAVEL_COLORS.neonCyan} />
          <Text style={styles.heatmapText}>Interactive Global Travel Map</Text>
          <Text style={styles.heatmapSubtext}>Real-time traveler activity visualization</Text>
        </View>
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Global Operations Alerts</Text>
      {GLOBAL_ALERTS.map((alert, index) => (
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
            {alert.type === 'success' && <Compass size={20} color="#10B981" />}
            {alert.type === 'info' && <Globe size={20} color="#8B5CF6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Globe size={32} color={TRAVEL_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>Global Travel Operations</Text>
          <Text style={styles.headerSubtitle}>Worldwide travel ecosystem monitoring and intelligence</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderRegionalData()}
      {renderGlobalHeatmap()}
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
  regionGrowth: {
    fontSize: 16,
    fontWeight: 'bold',
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
  heatmapContainer: {
    height: 300,
    backgroundColor: '#0A0F1A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heatmapPlaceholder: {
    alignItems: 'center',
    gap: 12,
  },
  heatmapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heatmapSubtext: {
    fontSize: 14,
    color: '#6B7280',
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
