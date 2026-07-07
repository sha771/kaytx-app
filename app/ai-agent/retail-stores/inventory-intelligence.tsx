import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Package, TrendingUp, AlertTriangle, CheckCircle, 
  ArrowUpRight, ArrowDownRight, BarChart3, Warehouse,
  Truck, Box, Activity, Target, DollarSign, Clock,
  MoreHorizontal, RefreshCw
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function InventoryIntelligencePage() {
  const INVENTORY_METRICS = [
    { label: 'Total Inventory Value', value: '$1.9B', icon: DollarSign, color: '#10B981', trend: '-2.1%', trendUp: false },
    { label: 'Stock Availability', value: '96.8%', icon: CheckCircle, color: '#3B82F6', trend: '+1.5%', trendUp: true },
    { label: 'Inventory Turnover', value: '8.2x', icon: Activity, color: '#8B5CF6', trend: '+0.8%', trendUp: true },
    { label: 'Stockout Rate', value: '1.2%', icon: AlertTriangle, color: '#EF4444', trend: '-0.4%', trendUp: true },
    { label: 'Replenishment Accuracy', value: '97.4%', icon: Target, color: '#F59E0B', trend: '+1.2%', trendUp: true },
    { label: 'Warehouse Capacity', value: '78.4%', icon: Warehouse, color: '#EC4899', trend: '+3.2%', trendUp: true },
  ];

  const CATEGORY_INVENTORY = [
    { category: 'Electronics', value: '$420M', units: '847K', availability: '98.2%', turnover: '9.4x', color: '#3B82F6' },
    { category: 'Apparel', value: '$380M', units: '2.4M', availability: '95.8%', turnover: '7.8x', color: '#10B981' },
    { category: 'Home & Garden', value: '$290M', units: '1.2M', availability: '96.4%', turnover: '8.1x', color: '#8B5CF6' },
    { category: 'Sports & Outdoors', value: '$240M', units: '680K', availability: '97.1%', turnover: '8.8x', color: '#F59E0B' },
    { category: 'Beauty & Personal', value: '$180M', units: '920K', availability: '94.6%', turnover: '7.2x', color: '#EC4899' },
    { category: 'Food & Beverage', value: '$150M', units: '3.8M', availability: '98.8%', turnover: '12.4x', color: '#06B6D4' },
    { category: 'Toys & Games', value: '$120M', units: '340K', availability: '95.2%', turnover: '6.8x', color: '#84CC16' },
    { category: 'Automotive', value: '$120M', units: '180K', availability: '93.8%', turnover: '5.4x', color: '#F97316' },
  ];

  const STOCKOUT_ALERTS = [
    { product: 'Wireless Earbuds Pro', sku: 'WEP-001', category: 'Electronics', stock: 0, demand: 'High', impact: 'Critical', time: '2h ago' },
    { product: 'Smart Watch Series 5', sku: 'SWS-005', category: 'Electronics', stock: 12, demand: 'High', impact: 'High', time: '4h ago' },
    { product: 'Running Shoes Elite', sku: 'RSE-042', category: 'Sports', stock: 8, demand: 'Medium', impact: 'Medium', time: '6h ago' },
    { product: 'Skincare Set Premium', sku: 'SSP-018', category: 'Beauty', stock: 5, demand: 'Medium', impact: 'Medium', time: '8h ago' },
  ];

  const REPLENISHMENT_STATUS = [
    { order: 'RO-2847', products: 247, value: '$1.8M', supplier: 'TechCorp Inc.', status: 'In Transit', eta: '2 days', progress: 75 },
    { order: 'RO-2848', products: 182, value: '$920K', supplier: 'FashionCo Ltd.', status: 'Processing', eta: '5 days', progress: 45 },
    { order: 'RO-2849', products: 312, value: '$2.4M', supplier: 'HomeGoods Global', status: 'Shipped', eta: '3 days', progress: 60 },
    { order: 'RO-2850', products: 156, value: '$680K', supplier: 'SportsPro Inc.', status: 'Delivered', eta: 'Today', progress: 100 },
  ];

  const WAREHOUSE_STATUS = [
    { name: 'Warehouse East', location: 'New Jersey', capacity: '92.4%', utilization: 'High', items: '2.4M', color: '#EF4444' },
    { name: 'Warehouse West', location: 'California', capacity: '78.2%', utilization: 'Medium', items: '1.8M', color: '#F59E0B' },
    { name: 'Warehouse Central', location: 'Illinois', capacity: '65.8%', utilization: 'Medium', items: '1.2M', color: '#10B981' },
    { name: 'Warehouse South', location: 'Texas', capacity: '54.2%', utilization: 'Low', items: '980K', color: '#3B82F6' },
  ];

  const DEMAND_FORECASTS = [
    { product: 'Wireless Earbuds Pro', current: '8.2K', forecast: '12.4K', change: '+51%', confidence: '94%', trend: 'up' },
    { product: 'Smart Watch Series 5', current: '5.6K', forecast: '7.8K', change: '+39%', confidence: '91%', trend: 'up' },
    { product: 'Running Shoes Elite', current: '3.4K', forecast: '4.2K', change: '+24%', confidence: '88%', trend: 'up' },
    { product: 'Yoga Mat Premium', current: '2.8K', forecast: '2.1K', change: '-25%', confidence: '86%', trend: 'down' },
    { product: 'Skincare Set Premium', current: '1.9K', forecast: '2.4K', change: '+26%', confidence: '92%', trend: 'up' },
  ];

  const renderInventoryMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Inventory Metrics</Text>
      <View style={styles.metricsGrid}>
        {INVENTORY_METRICS.map((metric, index) => (
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

  const renderCategoryInventory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Category Inventory</Text>
      <View style={styles.categoryGrid}>
        {CATEGORY_INVENTORY.map((category) => (
          <View key={category.category} style={[styles.categoryCard, { backgroundColor: category.color + '10', borderColor: category.color }]}>
            <View style={styles.categoryHeader}>
              <Box size={20} color={category.color} />
              <Text style={styles.categoryName}>{category.category}</Text>
            </View>
            <Text style={styles.categoryValue}>{category.value}</Text>
            <Text style={styles.categoryUnits}>{category.units} units</Text>
            <View style={styles.categoryMetrics}>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{category.availability}</Text>
                <Text style={styles.categoryMetricLabel}>Availability</Text>
              </View>
              <View style={styles.categoryMetric}>
                <Text style={styles.categoryMetricValue}>{category.turnover}</Text>
                <Text style={styles.categoryMetricLabel}>Turnover</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStockoutAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Stockout Alerts</Text>
      {STOCKOUT_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.impact === 'Critical' ? '#EF444410' : '#F59E0B10',
          borderLeftColor: alert.impact === 'Critical' ? '#EF4444' : '#F59E0B',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color={alert.impact === 'Critical' ? '#EF4444' : '#F59E0B'} />
            <View style={styles.alertInfo}>
              <Text style={styles.alertProduct}>{alert.product}</Text>
              <Text style={styles.alertSku}>SKU: {alert.sku}</Text>
            </View>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'Critical' ? '#EF444420' : '#F59E0B20' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'Critical' ? '#EF4444' : '#F59E0B' }]}>{alert.impact}</Text>
            </View>
          </View>
          <View style={styles.alertDetails}>
            <View style={styles.alertDetail}>
              <Text style={styles.alertDetailLabel}>Category</Text>
              <Text style={styles.alertDetailValue}>{alert.category}</Text>
            </View>
            <View style={styles.alertDetail}>
              <Text style={styles.alertDetailLabel}>Stock</Text>
              <Text style={[styles.alertDetailValue, { color: alert.stock === 0 ? '#EF4444' : '#F59E0B' }]}>{alert.stock} units</Text>
            </View>
            <View style={styles.alertDetail}>
              <Text style={styles.alertDetailLabel}>Demand</Text>
              <Text style={styles.alertDetailValue}>{alert.demand}</Text>
            </View>
            <View style={styles.alertDetail}>
              <Clock size={12} color="#6B7280" />
              <Text style={styles.alertTime}>{alert.time}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderReplenishmentStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Replenishment Status</Text>
      {REPLENISHMENT_STATUS.map((order, index) => (
        <View key={index} style={[styles.orderCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.orderHeader}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>{order.order}</Text>
              <Text style={styles.orderSupplier}>{order.supplier}</Text>
            </View>
            <View style={[styles.orderStatus, { 
              backgroundColor: order.status === 'Delivered' ? '#10B98120' : 
                           order.status === 'Shipped' ? '#3B82F620' : 
                           order.status === 'In Transit' ? '#F59E0B20' : '#6B728020'
            }]}>
              <Text style={[styles.orderStatusText, { 
                color: order.status === 'Delivered' ? '#10B981' : 
                     order.status === 'Shipped' ? '#3B82F6' : 
                     order.status === 'In Transit' ? '#F59E0B' : '#6B7280'
              }]}>{order.status}</Text>
            </View>
          </View>
          <View style={styles.orderMetrics}>
            <View style={styles.orderMetric}>
              <Box size={16} color="#8B5CF6" />
              <Text style={styles.orderMetricValue}>{order.products} products</Text>
            </View>
            <View style={styles.orderMetric}>
              <DollarSign size={16} color="#10B981" />
              <Text style={styles.orderMetricValue}>{order.value}</Text>
            </View>
            <View style={styles.orderMetric}>
              <Truck size={16} color="#F59E0B" />
              <Text style={styles.orderMetricValue}>ETA: {order.eta}</Text>
            </View>
          </View>
          <View style={styles.orderProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${order.progress}%`, backgroundColor: order.progress === 100 ? '#10B981' : '#3B82F6' }]} />
            </View>
            <Text style={styles.progressText}>{order.progress}%</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderWarehouseStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Warehouse Status</Text>
      <View style={styles.warehouseGrid}>
        {WAREHOUSE_STATUS.map((warehouse) => (
          <View key={warehouse.name} style={[styles.warehouseCard, { backgroundColor: warehouse.color + '10', borderColor: warehouse.color }]}>
            <Warehouse size={24} color={warehouse.color} />
            <Text style={styles.warehouseName}>{warehouse.name}</Text>
            <Text style={styles.warehouseLocation}>{warehouse.location}</Text>
            <View style={styles.warehouseMetrics}>
              <View style={styles.warehouseMetric}>
                <Text style={styles.warehouseMetricValue}>{warehouse.capacity}</Text>
                <Text style={styles.warehouseMetricLabel}>Capacity</Text>
              </View>
              <View style={styles.warehouseMetric}>
                <Text style={styles.warehouseMetricValue}>{warehouse.items}</Text>
                <Text style={styles.warehouseMetricLabel}>Items</Text>
              </View>
            </View>
            <View style={[styles.utilizationBadge, { backgroundColor: warehouse.color + '20' }]}>
              <Text style={[styles.utilizationText, { color: warehouse.color }]}>{warehouse.utilization} Utilization</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderDemandForecasts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Demand Forecasts</Text>
      {DEMAND_FORECASTS.map((forecast, index) => (
        <View key={index} style={[styles.forecastCard, { backgroundColor: '#0A0F1A' }]}>
          <View style={styles.forecastHeader}>
            <Text style={styles.forecastProduct}>{forecast.product}</Text>
            <View style={[styles.forecastTrend, { backgroundColor: forecast.trend === 'up' ? '#10B98120' : '#EF444420' }]}>
              {forecast.trend === 'up' ? <ArrowUpRight size={14} color="#10B981" /> : <ArrowDownRight size={14} color="#EF4444" />}
              <Text style={[styles.forecastChange, { color: forecast.trend === 'up' ? '#10B981' : '#EF4444' }]}>{forecast.change}</Text>
            </View>
          </View>
          <View style={styles.forecastMetrics}>
            <View style={styles.forecastMetric}>
              <Text style={styles.forecastMetricLabel}>Current</Text>
              <Text style={styles.forecastMetricValue}>{forecast.current}</Text>
            </View>
            <View style={styles.forecastMetric}>
              <Text style={styles.forecastMetricLabel}>Forecast</Text>
              <Text style={styles.forecastMetricValue}>{forecast.forecast}</Text>
            </View>
            <View style={styles.forecastMetric}>
              <Text style={styles.forecastMetricLabel}>Confidence</Text>
              <Text style={[styles.forecastMetricValue, { color: '#8B5CF6' }]}>{forecast.confidence}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Package size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>Inventory Intelligence Hub</Text>
          <Text style={styles.headerSubtitle}>Real-time inventory optimization and demand forecasting</Text>
        </View>
      </View>

      {renderInventoryMetrics()}
      {renderCategoryInventory()}
      {renderStockoutAlerts()}
      {renderReplenishmentStatus()}
      {renderWarehouseStatus()}
      {renderDemandForecasts()}
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  categoryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryUnits: {
    fontSize: 12,
    color: '#6B7280',
  },
  categoryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  categoryMetric: {
    alignItems: 'center',
  },
  categoryMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  categoryMetricLabel: {
    fontSize: 11,
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
  alertInfo: {
    flex: 1,
  },
  alertProduct: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertSku: {
    fontSize: 12,
    color: '#6B7280',
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
  alertDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertDetail: {
    alignItems: 'center',
  },
  alertDetailLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  alertDetailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderSupplier: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  orderStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  orderMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderMetricValue: {
    fontSize: 13,
    color: '#FFFFFF',
  },
  orderProgress: {
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
  warehouseMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  warehouseMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  utilizationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  utilizationText: {
    fontSize: 11,
    fontWeight: '600',
  },
  forecastCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forecastProduct: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  forecastTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  forecastChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  forecastMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forecastMetric: {
    alignItems: 'center',
  },
  forecastMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  forecastMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
