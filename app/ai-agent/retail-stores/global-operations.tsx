import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Globe, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, MapPin, DollarSign, Activity, Store,
  Users, Warehouse, Truck, AlertTriangle, CheckCircle,
  MoreHorizontal, Navigation, Building
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function GlobalOperationsPage() {
  const GLOBAL_METRICS = [
    { label: 'Total Stores', value: '3,850', icon: Store, color: '#3B82F6', trend: '+45', trendUp: true },
    { label: 'Global Revenue', value: '$8.4B', icon: DollarSign, color: '#10B981', trend: '+12.5%', trendUp: true },
    { label: 'Active Customers', value: '48M', icon: Users, color: '#8B5CF6', trend: '+18.2%', trendUp: true },
    { label: 'Warehouses', value: '24', icon: Warehouse, color: '#F59E0B', trend: '+2', trendUp: true },
    { label: 'Countries', value: '18', icon: Globe, color: '#EC4899', trend: '+1', trendUp: true },
    { label: 'Distribution Centers', value: '12', icon: Truck, color: '#06B6D4', trend: '+1', trendUp: true },
  ];

  const REGIONAL_PERFORMANCE = [
    { region: 'North America', stores: '2,847', revenue: '$5.2B', growth: '+12.4%', customers: '32M', color: '#3B82F6' },
    { region: 'Europe', stores: '624', revenue: '$1.8B', growth: '+14.2%', customers: '10M', color: '#10B981' },
    { region: 'Asia Pacific', stores: '284', revenue: '$1.2B', growth: '+22.8%', customers: '5M', color: '#8B5CF6' },
    { region: 'Latin America', stores: '95', revenue: '$0.2B', growth: '+18.4%', customers: '1M', color: '#F59E0B' },
  ];

  const STORE_LOCATIONS = [
    { location: 'New York, USA', type: 'Flagship', revenue: '$2.8M', traffic: '45.2K', performance: '94.2%', color: '#10B981' },
    { location: 'London, UK', type: 'Flagship', revenue: '$2.4M', traffic: '38.6K', performance: '92.8%', color: '#3B82F6' },
    { location: 'Tokyo, Japan', type: 'Flagship', revenue: '$2.2M', traffic: '42.4K', performance: '91.6%', color: '#8B5CF6' },
    { location: 'Paris, France', type: 'Flagship', revenue: '$1.8M', traffic: '28.4K', performance: '89.4%', color: '#F59E0B' },
    { location: 'Sydney, Australia', type: 'Flagship', revenue: '$1.6M', traffic: '24.8K', performance: '88.2%', color: '#EC4899' },
    { location: 'Shanghai, China', type: 'Flagship', revenue: '$2.0M', traffic: '36.2K', performance: '90.8%', color: '#06B6D4' },
  ];

  const WAREHOUSE_NETWORK = [
    { name: 'DC East', location: 'New Jersey, USA', capacity: '92.4%', throughput: '2.4M', region: 'North America', color: '#EF4444' },
    { name: 'DC West', location: 'California, USA', capacity: '78.2%', throughput: '1.8M', region: 'North America', color: '#F59E0B' },
    { name: 'DC Europe', location: 'Rotterdam, Netherlands', capacity: '84.6%', throughput: '1.2M', region: 'Europe', color: '#10B981' },
    { name: 'DC Asia', location: 'Singapore', capacity: '68.4%', throughput: '980K', region: 'Asia Pacific', color: '#3B82F6' },
  ];

  const SUPPLY_CHAIN_ROUTES = [
    { route: 'US East Coast', origin: 'New Jersey', destination: 'Boston', mode: 'Truck', efficiency: '94.2%', color: '#3B82F6' },
    { route: 'US Cross-Country', origin: 'California', destination: 'New Jersey', mode: 'Rail', efficiency: '88.4%', color: '#10B981' },
    { route: 'Europe Hub', origin: 'Rotterdam', destination: 'London', mode: 'Truck', efficiency: '92.6%', color: '#8B5CF6' },
    { route: 'Asia Pacific', origin: 'Singapore', destination: 'Tokyo', mode: 'Ocean', efficiency: '86.2%', color: '#F59E0B' },
    { route: 'Trans-Pacific', origin: 'Shanghai', destination: 'California', mode: 'Ocean', efficiency: '84.8%', color: '#EC4899' },
  ];

  const GLOBAL_ALERTS = [
    { type: 'warning', message: 'DC East operating at 92.4% capacity - consider expansion', impact: 'Medium', time: '2h ago' },
    { type: 'critical', message: 'Port congestion in Shanghai causing 4-day delays', impact: 'High', time: '4h ago' },
    { type: 'info', message: 'New market opportunity identified in Southeast Asia', impact: 'Low', time: '6h ago' },
    { type: 'success', message: 'Europe region exceeded Q2 revenue target by 18%', impact: 'Positive', time: '8h ago' },
  ];

  const renderGlobalMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Global Operations Metrics</Text>
      <View style={styles.metricsGrid}>
        {GLOBAL_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderRegionalPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Regional Performance</Text>
      <View style={styles.regionalGrid}>
        {REGIONAL_PERFORMANCE.map((region) => (
          <View key={region.region} style={[styles.regionalCard, { backgroundColor: region.color + '10', borderColor: region.color }]}>
            <Globe size={24} color={region.color} />
            <Text style={styles.regionName}>{region.region}</Text>
            <View style={styles.regionMetrics}>
              <View style={styles.regionMetric}>
                <Store size={12} color="#6B7280" />
                <Text style={styles.regionMetricText}>{region.stores} stores</Text>
              </View>
              <View style={styles.regionMetric}>
                <DollarSign size={12} color="#6B7280" />
                <Text style={styles.regionMetricText}>{region.revenue}</Text>
              </View>
              <View style={styles.regionMetric}>
                <Users size={12} color="#6B7280" />
                <Text style={styles.regionMetricText}>{region.customers}</Text>
              </View>
            </View>
            <View style={styles.regionGrowth}>
              <ArrowUpRight size={14} color="#10B981" />
              <Text style={styles.regionGrowthText}>{region.growth} growth</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStoreLocations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Flagship Store Locations</Text>
      <View style={styles.locationsList}>
        {STORE_LOCATIONS.map((location) => (
          <View key={location.location} style={[styles.locationCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: location.color }]}>
            <View style={styles.locationHeader}>
              <MapPin size={20} color={location.color} />
              <Text style={styles.locationName}>{location.location}</Text>
              <View style={[styles.locationType, { backgroundColor: location.color + '20' }]}>
                <Text style={[styles.locationTypeText, { color: location.color }]}>{location.type}</Text>
              </View>
            </View>
            <View style={styles.locationMetrics}>
              <View style={styles.locationMetric}>
                <Text style={styles.locationMetricLabel}>Revenue</Text>
                <Text style={styles.locationMetricValue}>{location.revenue}</Text>
              </View>
              <View style={styles.locationMetric}>
                <Text style={styles.locationMetricLabel}>Traffic</Text>
                <Text style={styles.locationMetricValue}>{location.traffic}</Text>
              </View>
              <View style={styles.locationMetric}>
                <Text style={styles.locationMetricLabel}>Performance</Text>
                <Text style={[styles.locationMetricValue, { color: '#10B981' }]}>{location.performance}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderWarehouseNetwork = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Warehouse Network</Text>
      <View style={styles.warehouseGrid}>
        {WAREHOUSE_NETWORK.map((warehouse) => (
          <View key={warehouse.name} style={[styles.warehouseCard, { backgroundColor: warehouse.color + '10', borderColor: warehouse.color }]}>
            <Warehouse size={24} color={warehouse.color} />
            <Text style={styles.warehouseName}>{warehouse.name}</Text>
            <Text style={styles.warehouseLocation}>{warehouse.location}</Text>
            <View style={styles.warehouseRegion}>
              <Globe size={12} color="#6B7280" />
              <Text style={styles.warehouseRegionText}>{warehouse.region}</Text>
            </View>
            <View style={styles.warehouseMetrics}>
              <View style={styles.warehouseMetric}>
                <Text style={styles.warehouseMetricLabel}>Capacity</Text>
                <Text style={styles.warehouseMetricValue}>{warehouse.capacity}</Text>
              </View>
              <View style={styles.warehouseMetric}>
                <Text style={styles.warehouseMetricLabel}>Throughput</Text>
                <Text style={styles.warehouseMetricValue}>{warehouse.throughput}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSupplyChainRoutes = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Supply Chain Routes</Text>
      {SUPPLY_CHAIN_ROUTES.map((route) => (
        <View key={route.route} style={[styles.routeCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: route.color }]}>
          <View style={styles.routeHeader}>
            <Navigation size={20} color={route.color} />
            <Text style={styles.routeName}>{route.route}</Text>
          </View>
          <View style={styles.routePath}>
            <View style={styles.routePoint}>
              <MapPin size={12} color="#6B7280" />
              <Text style={styles.routeLocation}>{route.origin}</Text>
            </View>
            <ArrowUpRight size={16} color="#6B7280" style={{ transform: [{ rotate: '90deg' }] }} />
            <View style={styles.routePoint}>
              <MapPin size={12} color="#6B7280" />
              <Text style={styles.routeLocation}>{route.destination}</Text>
            </View>
          </View>
          <View style={styles.routeDetails}>
            <View style={styles.routeDetail}>
              <Truck size={12} color="#6B7280" />
              <Text style={styles.routeDetailText}>{route.mode}</Text>
            </View>
            <View style={styles.routeDetail}>
              <Activity size={12} color="#6B7280" />
              <Text style={[styles.routeDetailText, { color: '#10B981' }]}>{route.efficiency} efficiency</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderGlobalAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Global Operations Alerts</Text>
      {GLOBAL_ALERTS.map((alert, index) => (
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
        <Globe size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Global Retail Operations</Text>
          <Text style={styles.headerSubtitle}>Worldwide store network and supply chain visualization</Text>
        </View>
      </View>

      {renderGlobalMetrics()}
      {renderRegionalPerformance()}
      {renderStoreLocations()}
      {renderWarehouseNetwork()}
      {renderSupplyChainRoutes()}
      {renderGlobalAlerts()}
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
    fontWeight: '600',
  },
  regionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  regionalCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  regionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  regionMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  regionMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  regionGrowth: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  regionGrowthText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  locationsList: {
    gap: 12,
  },
  locationCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  locationType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  locationTypeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  locationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  locationMetric: {
    alignItems: 'center',
  },
  locationMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  locationMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  warehouseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  warehouseCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  warehouseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  warehouseLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  warehouseRegion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  warehouseRegionText: {
    fontSize: 11,
    color: '#6B7280',
  },
  warehouseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  warehouseMetric: {
    alignItems: 'center',
  },
  warehouseMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  warehouseMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  routeCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  routePath: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeDetailText: {
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
