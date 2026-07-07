import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Store, MapPin, TrendingUp, Users, Activity, 
  BarChart3, ArrowUpRight, ArrowDownRight, 
  AlertTriangle, CheckCircle, Clock, Zap,
  Shield, Target, DollarSign, MoreHorizontal
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function StoreOperationsPage() {
  const STORE_PERFORMANCE_DATA = [
    { id: '1', name: 'Flagship Manhattan', location: 'New York, NY', revenue: '$2.8M', growth: '+18.4%', traffic: '45.2K', conversion: '8.2%', status: 'excellent' },
    { id: '2', name: 'Downtown Chicago', location: 'Chicago, IL', revenue: '$1.9M', growth: '+12.7%', traffic: '32.8K', conversion: '7.8%', status: 'excellent' },
    { id: '3', name: 'Silicon Valley', location: 'San Jose, CA', revenue: '$2.4M', growth: '+15.2%', traffic: '38.4K', conversion: '8.5%', status: 'excellent' },
    { id: '4', name: 'Union Square', location: 'San Francisco, CA', revenue: '$2.1M', growth: '+10.8%', traffic: '35.6K', conversion: '7.4%', status: 'good' },
    { id: '5', name: 'Downtown LA', location: 'Los Angeles, CA', revenue: '$1.7M', growth: '+8.3%', traffic: '28.9K', conversion: '6.9%', status: 'good' },
    { id: '6', name: 'South Beach', location: 'Miami, FL', revenue: '$1.5M', growth: '+14.2%', traffic: '26.4K', conversion: '8.1%', status: 'excellent' },
    { id: '7', name: 'Magnificent Mile', location: 'Chicago, IL', revenue: '$1.8M', growth: '+11.5%', traffic: '30.2K', conversion: '7.6%', status: 'good' },
    { id: '8', name: 'Times Square', location: 'New York, NY', revenue: '$2.6M', growth: '+16.8%', traffic: '52.8K', conversion: '7.9%', status: 'excellent' },
  ];

  const OPERATIONAL_METRICS = [
    { label: 'Total Stores', value: '3,850', icon: Store, color: '#3B82F6', trend: '+45' },
    { label: 'Avg Revenue/Store', value: '$2.18M', icon: DollarSign, color: '#10B981', trend: '+12.4%' },
    { label: 'Total Foot Traffic', value: '108.4M', icon: MapPin, color: '#8B5CF6', trend: '+18.2%' },
    { label: 'Avg Conversion', value: '7.8%', icon: Target, color: '#F59E0B', trend: '+1.1%' },
    { label: 'Employee Productivity', value: '87.3%', icon: Users, color: '#EC4899', trend: '+4.5%' },
    { label: 'Operational Health', value: '94.2%', icon: Activity, color: '#06B6D4', trend: '+2.8%' },
  ];

  const REGIONAL_PERFORMANCE = [
    { region: 'Northeast', stores: 847, revenue: '$1.84B', growth: '+14.2%', traffic: '28.4M', color: '#3B82F6' },
    { region: 'West Coast', stores: 923, revenue: '$2.12B', growth: '+16.8%', traffic: '32.6M', color: '#10B981' },
    { region: 'Midwest', stores: 684, revenue: '$1.48B', growth: '+11.5%', traffic: '24.2M', color: '#8B5CF6' },
    { region: 'Southeast', stores: 756, revenue: '$1.62B', growth: '+13.4%', traffic: '26.8M', color: '#F59E0B' },
    { region: 'Southwest', stores: 428, revenue: '$0.92B', growth: '+15.2%', traffic: '15.4M', color: '#EC4899' },
    { region: 'International', stores: 212, revenue: '$0.42B', growth: '+18.7%', traffic: '8.2M', color: '#06B6D4' },
  ];

  const OPERATIONAL_ALERTS = [
    { type: 'warning', message: 'Store #1842 showing 15% below average foot traffic', location: 'Phoenix, AZ', time: '2h ago' },
    { type: 'critical', message: 'POS system downtime at Store #2934', location: 'Denver, CO', time: '45m ago' },
    { type: 'info', message: 'Staffing optimization opportunity at Store #1847', location: 'Seattle, WA', time: '3h ago' },
    { type: 'success', message: 'Store #2847 exceeded daily target by 22%', location: 'Austin, TX', time: '1h ago' },
  ];

  const FOOT_TRAFFIC_HEATMAP = [
    { time: '6AM', traffic: 'Low', value: 12, color: '#1E293B' },
    { time: '8AM', traffic: 'Medium', value: 34, color: '#3B82F6' },
    { time: '10AM', traffic: 'High', value: 67, color: '#10B981' },
    { time: '12PM', traffic: 'Peak', value: 89, color: '#F59E0B' },
    { time: '2PM', traffic: 'High', value: 78, color: '#10B981' },
    { time: '4PM', traffic: 'High', value: 72, color: '#10B981' },
    { time: '6PM', traffic: 'Peak', value: 94, color: '#F59E0B' },
    { time: '8PM', traffic: 'Medium', value: 45, color: '#3B82F6' },
    { time: '10PM', traffic: 'Low', value: 18, color: '#1E293B' },
  ];

  const renderOperationalMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Operational Metrics</Text>
      <View style={styles.metricsGrid}>
        {OPERATIONAL_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              <ArrowUpRight size={12} color="#10B981" />
              <Text style={styles.metricTrendText}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStorePerformanceGrid = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Store Performance Grid</Text>
      <View style={styles.performanceGrid}>
        {STORE_PERFORMANCE_DATA.map((store) => (
          <View key={store.id} style={[styles.storeCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: store.status === 'excellent' ? '#10B981' : '#F59E0B' }]}>
            <View style={styles.storeHeader}>
              <Store size={20} color="#8B5CF6" />
              <Text style={styles.storeName}>{store.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: store.status === 'excellent' ? '#10B98120' : '#F59E0B20' }]}>
                <Text style={[styles.statusText, { color: store.status === 'excellent' ? '#10B981' : '#F59E0B' }]}>{store.status}</Text>
              </View>
            </View>
            <Text style={styles.storeLocation}>{store.location}</Text>
            <View style={styles.storeMetrics}>
              <View style={styles.storeMetric}>
                <Text style={styles.storeMetricValue}>{store.revenue}</Text>
                <Text style={styles.storeMetricLabel}>Revenue</Text>
              </View>
              <View style={styles.storeMetric}>
                <Text style={styles.storeMetricValue}>{store.traffic}</Text>
                <Text style={styles.storeMetricLabel}>Traffic</Text>
              </View>
              <View style={styles.storeMetric}>
                <Text style={styles.storeMetricValue}>{store.conversion}</Text>
                <Text style={styles.storeMetricLabel}>Conversion</Text>
              </View>
            </View>
            <View style={styles.storeGrowth}>
              <ArrowUpRight size={14} color="#10B981" />
              <Text style={styles.storeGrowthText}>{store.growth} growth</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRegionalPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Regional Performance</Text>
      <View style={styles.regionalList}>
        {REGIONAL_PERFORMANCE.map((region) => (
          <View key={region.region} style={[styles.regionalCard, { backgroundColor: region.color + '10', borderColor: region.color }]}>
            <View style={styles.regionHeader}>
              <View style={[styles.regionDot, { backgroundColor: region.color }]} />
              <Text style={styles.regionName}>{region.region}</Text>
              <Text style={styles.regionStores}>{region.stores} stores</Text>
            </View>
            <View style={styles.regionMetrics}>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricValue}>{region.revenue}</Text>
                <Text style={styles.regionMetricLabel}>Revenue</Text>
              </View>
              <View style={styles.regionMetric}>
                <Text style={styles.regionMetricValue}>{region.traffic}</Text>
                <Text style={styles.regionMetricLabel}>Traffic</Text>
              </View>
              <View style={styles.regionMetric}>
                <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{region.growth}</Text>
                <Text style={styles.regionMetricLabel}>Growth</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderOperationalAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Operational Alerts</Text>
      {OPERATIONAL_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'critical' ? '#EF444410' : 
                       alert.type === 'warning' ? '#F59E0B10' : 
                       alert.type === 'success' ? '#10B98110' : '#3B82F610',
          borderLeftColor: alert.type === 'critical' ? '#EF4444' : 
                          alert.type === 'warning' ? '#F59E0B' : 
                          alert.type === 'success' ? '#10B981' : '#3B82F6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'critical' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Activity size={20} color="#3B82F6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.alertLocation}>{alert.location}</Text>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderFootTrafficHeatmap = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Foot Traffic Heatmap</Text>
      <View style={styles.heatmapContainer}>
        {FOOT_TRAFFIC_HEATMAP.map((slot, index) => (
          <View key={index} style={[styles.heatmapSlot, { backgroundColor: slot.color }]}>
            <Text style={styles.heatmapTime}>{slot.time}</Text>
            <Text style={styles.heatmapTraffic}>{slot.traffic}</Text>
            <Text style={styles.heatmapValue}>{slot.value}%</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Store size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Store Operations Command Center</Text>
          <Text style={styles.headerSubtitle}>Real-time store performance and operational intelligence</Text>
        </View>
      </View>

      {renderOperationalMetrics()}
      {renderStorePerformanceGrid()}
      {renderRegionalPerformance()}
      {renderFootTrafficHeatmap()}
      {renderOperationalAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
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
    color: '#10B981',
    fontWeight: '600',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  storeCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  storeName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  storeLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  storeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  storeMetric: {
    alignItems: 'center',
  },
  storeMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  storeMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  storeGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  storeGrowthText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  regionalList: {
    gap: 12,
  },
  regionalCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  regionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  regionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  regionName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  regionStores: {
    fontSize: 12,
    color: '#6B7280',
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
  regionMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  regionMetricLabel: {
    fontSize: 12,
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
  alertLocation: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  heatmapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  heatmapSlot: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    gap: 4,
  },
  heatmapTime: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  heatmapTraffic: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  heatmapValue: {
    fontSize: 12,
    color: '#6B7280',
  },
});
