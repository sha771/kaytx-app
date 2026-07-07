import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Truck, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Package, Target, DollarSign, Activity,
  MapPin, Warehouse, Globe, Ship, Plane, Train, AlertTriangle,
  CheckCircle, Clock, MoreHorizontal, Route
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SupplyChainPage() {
  const SUPPLY_CHAIN_METRICS = [
    { label: 'Deliveries Optimized', value: '18.4K', icon: Truck, color: '#10B981', trend: '+21.3%', trendUp: true },
    { label: 'Supply Chain Efficiency', value: '+21.3%', icon: Activity, color: '#3B82F6', trend: '+4.8%', trendUp: true },
    { label: 'Cost Savings', value: '$42.8M', icon: DollarSign, color: '#8B5CF6', trend: '+15.2%', trendUp: true },
    { label: 'On-Time Delivery', value: '96.4%', icon: CheckCircle, color: '#F59E0B', trend: '+2.4%', trendUp: true },
    { label: 'Supplier Performance', value: '94.8%', icon: Target, color: '#EC4899', trend: '+1.8%', trendUp: true },
    { label: 'Logistics Cost', value: '-8.4%', icon: TrendingUp, color: '#06B6D4', trend: '-2.1%', trendUp: true },
  ];

  const SUPPLIER_PERFORMANCE = [
    { supplier: 'TechCorp Inc.', category: 'Electronics', score: '96.4%', deliveries: '2.4K', onTime: '98.2%', quality: '97.8%', color: '#10B981' },
    { supplier: 'FashionCo Ltd.', category: 'Apparel', score: '94.8%', deliveries: '1.8K', onTime: '95.6%', quality: '96.2%', color: '#3B82F6' },
    { supplier: 'HomeGoods Global', category: 'Home', score: '92.6%', deliveries: '1.4K', onTime: '93.8%', quality: '94.4%', color: '#8B5CF6' },
    { supplier: 'SportsPro Inc.', category: 'Sports', score: '91.2%', deliveries: '980', onTime: '92.4%', quality: '93.6%', color: '#F59E0B' },
    { supplier: 'BeautyBrand Co.', category: 'Beauty', score: '89.8%', deliveries: '720', onTime: '91.2%', quality: '92.8%', color: '#EC4899' },
  ];

  const LOGISTICS_OPERATIONS = [
    { route: 'West Coast Hub', origin: 'Los Angeles', destination: 'San Francisco', mode: 'Truck', efficiency: '94.2%', cost: '$1.2M', color: '#3B82F6' },
    { route: 'East Coast Hub', origin: 'New York', destination: 'Boston', mode: 'Truck', efficiency: '92.8%', cost: '$1.4M', color: '#10B981' },
    { route: 'Cross-Country', origin: 'Los Angeles', destination: 'New York', mode: 'Rail', efficiency: '88.4%', cost: '$2.8M', color: '#8B5CF6' },
    { route: 'International', origin: 'Shanghai', destination: 'Los Angeles', mode: 'Ocean', efficiency: '86.2%', cost: '$4.2M', color: '#F59E0B' },
    { route: 'Air Freight', origin: 'Seoul', destination: 'Chicago', mode: 'Air', efficiency: '91.6%', cost: '$3.6M', color: '#EC4899' },
  ];

  const DISTRIBUTION_CENTERS = [
    { name: 'DC East', location: 'New Jersey', capacity: '92.4%', throughput: '2.4M', efficiency: '94.2%', color: '#EF4444' },
    { name: 'DC West', location: 'California', capacity: '78.2%', throughput: '1.8M', efficiency: '92.8%', color: '#F59E0B' },
    { name: 'DC Central', location: 'Illinois', capacity: '65.8%', throughput: '1.2M', efficiency: '96.4%', color: '#10B981' },
    { name: 'DC South', location: 'Texas', capacity: '54.2%', throughput: '980K', efficiency: '93.6%', color: '#3B82F6' },
  ];

  const SHIPMENT_STATUS = [
    { shipment: 'SHP-2847', origin: 'Shanghai', destination: 'Los Angeles', status: 'In Transit', eta: '3 days', progress: 65 },
    { shipment: 'SHP-2848', origin: 'Seoul', destination: 'Chicago', status: 'Customs', eta: '5 days', progress: 45 },
    { shipment: 'SHP-2849', origin: 'New York', destination: 'Boston', status: 'Delivered', eta: 'Today', progress: 100 },
    { shipment: 'SHP-2850', origin: 'Los Angeles', destination: 'San Francisco', status: 'Processing', eta: '2 days', progress: 25 },
  ];

  const SUPPLY_CHAIN_ALERTS = [
    { type: 'warning', message: 'Supplier TechCorp Inc. reporting 2-day delay on electronics shipment', impact: 'Medium', time: '2h ago' },
    { type: 'critical', message: 'Port congestion at Los Angeles causing 4-day delay on international shipments', impact: 'High', time: '4h ago' },
    { type: 'info', message: 'New supplier onboarding opportunity for home goods category', impact: 'Low', time: '6h ago' },
    { type: 'success', message: 'DC Central achieved record throughput of 2.4M units this month', impact: 'Positive', time: '8h ago' },
  ];

  const renderSupplyChainMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Supply Chain Metrics</Text>
      <View style={styles.metricsGrid}>
        {SUPPLY_CHAIN_METRICS.map((metric, index) => (
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

  const renderSupplierPerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Supplier Performance</Text>
      <View style={styles.supplierList}>
        {SUPPLIER_PERFORMANCE.map((supplier) => (
          <View key={supplier.supplier} style={[styles.supplierCard, { backgroundColor: supplier.color + '10', borderColor: supplier.color }]}>
            <View style={styles.supplierHeader}>
              <Package size={20} color={supplier.color} />
              <Text style={styles.supplierName}>{supplier.supplier}</Text>
              <Text style={styles.supplierCategory}>{supplier.category}</Text>
            </View>
            <View style={styles.supplierScore}>
              <Text style={styles.supplierScoreLabel}>Performance Score</Text>
              <Text style={styles.supplierScoreValue}>{supplier.score}</Text>
            </View>
            <View style={styles.supplierMetrics}>
              <View style={styles.supplierMetric}>
                <Text style={styles.supplierMetricValue}>{supplier.deliveries}</Text>
                <Text style={styles.supplierMetricLabel}>Deliveries</Text>
              </View>
              <View style={styles.supplierMetric}>
                <Text style={styles.supplierMetricValue}>{supplier.onTime}</Text>
                <Text style={styles.supplierMetricLabel}>On-Time</Text>
              </View>
              <View style={styles.supplierMetric}>
                <Text style={styles.supplierMetricValue}>{supplier.quality}</Text>
                <Text style={styles.supplierMetricLabel}>Quality</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderLogisticsOperations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Logistics Operations</Text>
      {LOGISTICS_OPERATIONS.map((route) => (
        <View key={route.route} style={[styles.routeCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: route.color }]}>
          <View style={styles.routeHeader}>
            <Route size={20} color={route.color} />
            <Text style={styles.routeName}>{route.route}</Text>
            {route.mode === 'Truck' && <Truck size={16} color="#6B7280" />}
            {route.mode === 'Rail' && <Train size={16} color="#6B7280" />}
            {route.mode === 'Ocean' && <Ship size={16} color="#6B7280" />}
            {route.mode === 'Air' && <Plane size={16} color="#6B7280" />}
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
          <View style={styles.routeMetrics}>
            <View style={styles.routeMetric}>
              <Text style={styles.routeMetricLabel}>Efficiency</Text>
              <Text style={styles.routeMetricValue}>{route.efficiency}</Text>
            </View>
            <View style={styles.routeMetric}>
              <Text style={styles.routeMetricLabel}>Cost</Text>
              <Text style={styles.routeMetricValue}>{route.cost}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderDistributionCenters = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Distribution Centers</Text>
      <View style={styles.dcGrid}>
        {DISTRIBUTION_CENTERS.map((dc) => (
          <View key={dc.name} style={[styles.dcCard, { backgroundColor: dc.color + '10', borderColor: dc.color }]}>
            <Warehouse size={24} color={dc.color} />
            <Text style={styles.dcName}>{dc.name}</Text>
            <Text style={styles.dcLocation}>{dc.location}</Text>
            <View style={styles.dcMetrics}>
              <View style={styles.dcMetric}>
                <Text style={styles.dcMetricValue}>{dc.capacity}</Text>
                <Text style={styles.dcMetricLabel}>Capacity</Text>
              </View>
              <View style={styles.dcMetric}>
                <Text style={styles.dcMetricValue}>{dc.throughput}</Text>
                <Text style={styles.dcMetricLabel}>Throughput</Text>
              </View>
            </View>
            <View style={styles.dcEfficiency}>
              <Text style={styles.dcEfficiencyLabel}>Efficiency</Text>
              <Text style={[styles.dcEfficiencyValue, { color: dc.color }]}>{dc.efficiency}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderShipmentStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shipment Status</Text>
      {SHIPMENT_STATUS.map((shipment) => (
        <View key={shipment.shipment} style={[styles.shipmentCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.shipmentHeader}>
            <Package size={20} color="#8B5CF6" />
            <Text style={styles.shipmentId}>{shipment.shipment}</Text>
            <View style={[styles.shipmentStatus, { 
              backgroundColor: shipment.status === 'Delivered' ? '#10B98120' : 
                           shipment.status === 'In Transit' ? '#3B82F620' : 
                           shipment.status === 'Customs' ? '#F59E0B20' : '#6B728020'
            }]}>
              <Text style={[styles.shipmentStatusText, { 
                color: shipment.status === 'Delivered' ? '#10B981' : 
                     shipment.status === 'In Transit' ? '#3B82F6' : 
                     shipment.status === 'Customs' ? '#F59E0B' : '#6B7280'
              }]}>{shipment.status}</Text>
            </View>
          </View>
          <View style={styles.shipmentRoute}>
            <Text style={styles.shipmentOrigin}>{shipment.origin}</Text>
            <ArrowUpRight size={14} color="#6B7280" style={{ transform: [{ rotate: '90deg' }] }} />
            <Text style={styles.shipmentDestination}>{shipment.destination}</Text>
          </View>
          <View style={styles.shipmentProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${shipment.progress}%`, backgroundColor: shipment.progress === 100 ? '#10B981' : '#3B82F6' }]} />
            </View>
            <Text style={styles.progressText}>{shipment.progress}%</Text>
          </View>
          <View style={styles.shipmentEta}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.shipmentEtaText}>ETA: {shipment.eta}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderSupplyChainAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Supply Chain Alerts</Text>
      {SUPPLY_CHAIN_ALERTS.map((alert, index) => (
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
        <Truck size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Supply Chain Command Center</Text>
          <Text style={styles.headerSubtitle}>Real-time logistics optimization and supplier intelligence</Text>
        </View>
      </View>

      {renderSupplyChainMetrics()}
      {renderSupplierPerformance()}
      {renderLogisticsOperations()}
      {renderDistributionCenters()}
      {renderShipmentStatus()}
      {renderSupplyChainAlerts()}
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
  supplierList: {
    gap: 12,
  },
  supplierCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  supplierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  supplierName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  supplierCategory: {
    fontSize: 12,
    color: '#6B7280',
  },
  supplierScore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supplierScoreLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  supplierScoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  supplierMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  supplierMetric: {
    alignItems: 'center',
  },
  supplierMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  supplierMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
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
    flex: 1,
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
  routeMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeMetric: {
    alignItems: 'center',
  },
  routeMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  routeMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dcGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  dcCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  dcName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dcLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  dcMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  dcMetric: {
    alignItems: 'center',
  },
  dcMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  dcMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  dcEfficiency: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 8,
  },
  dcEfficiencyLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  dcEfficiencyValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  shipmentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  shipmentId: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shipmentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  shipmentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  shipmentRoute: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shipmentOrigin: {
    fontSize: 12,
    color: '#6B7280',
  },
  shipmentDestination: {
    fontSize: 12,
    color: '#6B7280',
  },
  shipmentProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shipmentEta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shipmentEtaText: {
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
