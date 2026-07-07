import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Warehouse, 
  Truck, 
  AlertTriangle, 
  Package, 
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle
} from 'lucide-react-native';

export default function InventoryFulfillmentHub() {
  const { theme } = useTheme();

  const stockLevels = [
    { sku: 'WH-001', product: 'Wireless Headphones Pro', stock: '12.4K', status: 'healthy', reorderPoint: '5K' },
    { sku: 'SW-005', product: 'Smart Watch Series 5', stock: '8.2K', status: 'healthy', reorderPoint: '3K' },
    { sku: 'LT-012', product: 'Ultra-Thin Laptop', stock: '2.8K', status: 'low', reorderPoint: '2K' },
    { sku: 'FT-003', product: 'Fitness Tracker Elite', stock: '15.6K', status: 'healthy', reorderPoint: '6K' },
    { sku: 'WE-008', product: 'Wireless Earbuds Max', stock: '1.2K', status: 'critical', reorderPoint: '2K' },
  ];

  const warehouseDistribution = [
    { warehouse: 'US East', location: 'New Jersey', totalStock: '45.2K', utilization: '78%', status: 'optimal' },
    { warehouse: 'US West', location: 'California', totalStock: '38.4K', utilization: '82%', status: 'optimal' },
    { warehouse: 'EU Central', location: 'Germany', totalStock: '28.6K', utilization: '68%', status: 'optimal' },
    { warehouse: 'Asia Pacific', location: 'Singapore', totalStock: '22.4K', utilization: '92%', status: 'high' },
  ];

  const stockouts = [
    { sku: 'WE-008', product: 'Wireless Earbuds Max', region: 'North America', duration: '3 days', impact: 'high' },
    { sku: 'PB-020', product: 'Portable Power Bank 20K', region: 'Europe', duration: '1 day', impact: 'medium' },
    { sku: 'UH-011', product: 'USB-C Hub Pro', region: 'Asia Pacific', duration: '2 days', impact: 'medium' },
  ];

  const reorderPoints = [
    { sku: 'WH-001', currentStock: '12.4K', reorderPoint: '5K', daysOfStock: '45', status: 'safe' },
    { sku: 'SW-005', currentStock: '8.2K', reorderPoint: '3K', daysOfStock: '38', status: 'safe' },
    { sku: 'LT-012', currentStock: '2.8K', reorderPoint: '2K', daysOfStock: '14', status: 'warning' },
    { sku: 'FT-003', currentStock: '15.6K', reorderPoint: '6K', daysOfStock: '52', status: 'safe' },
  ];

  const fulfillmentSpeed = [
    { region: 'North America', avgTime: '2.1 days', target: '2 days', performance: '98%' },
    { region: 'Europe', avgTime: '3.2 days', target: '3 days', performance: '94%' },
    { region: 'Asia Pacific', avgTime: '4.5 days', target: '4 days', performance: '89%' },
    { region: 'Latin America', avgTime: '5.8 days', target: '5 days', performance: '86%' },
  ];

  const fulfillmentPipeline = [
    { stage: 'Order Received', count: '2.4K', avgTime: '0.1h', efficiency: '99%' },
    { stage: 'Processing', count: '1.8K', avgTime: '2.4h', efficiency: '96%' },
    { stage: 'Picking', count: '1.2K', avgTime: '4.2h', efficiency: '94%' },
    { stage: 'Packing', count: '0.8K', avgTime: '1.8h', efficiency: '97%' },
    { stage: 'Shipped', count: '0.6K', avgTime: '0.5h', efficiency: '98%' },
  ];

  const demandVsSupply = [
    { product: 'Wireless Headphones Pro', demand: '18.2K', supply: '12.4K', balance: '-5.8K', action: 'Reorder' },
    { product: 'Smart Watch Series 5', demand: '14.5K', supply: '8.2K', balance: '-6.3K', action: 'Reorder' },
    { product: 'Ultra-Thin Laptop', demand: '8.2K', supply: '2.8K', balance: '-5.4K', action: 'Urgent' },
    { product: 'Fitness Tracker Elite', demand: '5.8K', supply: '15.6K', balance: '+9.8K', action: 'Excess' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Inventory & Fulfillment Hub</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>Stock management, warehouse distribution, and fulfillment optimization</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stock Levels */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Stock Levels</Text>
          <View style={[styles.stockContainer, { backgroundColor: theme.colors.background }]}>
            {stockLevels.map((item, index) => (
              <View key={index} style={styles.stockItem}>
                <View style={styles.stockHeader}>
                  <Text style={[styles.stockSku, { color: theme.colors.textSecondary }]}>{item.sku}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === 'healthy' ? '#22C55E' + '20' : item.status === 'low' ? '#F59E0B' + '20' : '#EF4444' + '20' }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: item.status === 'healthy' ? '#22C55E' : item.status === 'low' ? '#F59E0B' : '#EF4444' }
                    ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.stockProduct, { color: theme.colors.text }]}>{item.product}</Text>
                <View style={styles.stockMetrics}>
                  <View style={styles.stockMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Stock</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.stock}</Text>
                  </View>
                  <View style={styles.stockMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Reorder Point</Text>
                    <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{item.reorderPoint}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Warehouse Distribution */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Warehouse Distribution</Text>
          <View style={[styles.warehouseContainer, { backgroundColor: theme.colors.background }]}>
            {warehouseDistribution.map((warehouse, index) => (
              <View key={index} style={styles.warehouseItem}>
                <View style={styles.warehouseHeader}>
                  <Warehouse size={20} color="#38BDF8" />
                  <View style={styles.warehouseInfo}>
                    <Text style={[styles.warehouseName, { color: theme.colors.text }]}>{warehouse.warehouse}</Text>
                    <Text style={[styles.warehouseLocation, { color: theme.colors.textSecondary }]}>{warehouse.location}</Text>
                  </View>
                </View>
                <View style={styles.warehouseMetrics}>
                  <View style={styles.warehouseMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Total Stock</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{warehouse.totalStock}</Text>
                  </View>
                  <View style={styles.warehouseMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Utilization</Text>
                    <Text style={[styles.metricValue, { color: '#38BDF8' }]}>{warehouse.utilization}</Text>
                  </View>
                  <View style={styles.warehouseMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Status</Text>
                    <Text style={[
                      styles.metricValue, 
                      { color: warehouse.status === 'optimal' ? '#22C55E' : '#F59E0B' }
                    ]}>
                      {warehouse.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Stockouts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Stockout Alerts</Text>
          <View style={[styles.stockoutContainer, { backgroundColor: theme.colors.background }]}>
            {stockouts.map((item, index) => (
              <View key={index} style={styles.stockoutItem}>
                <View style={styles.stockoutHeader}>
                  <AlertTriangle size={16} color="#EF4444" />
                  <Text style={[styles.stockoutSku, { color: theme.colors.text }]}>{item.sku}</Text>
                </View>
                <Text style={[styles.stockoutProduct, { color: theme.colors.text }]}>{item.product}</Text>
                <View style={styles.stockoutMetrics}>
                  <View style={styles.stockoutMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Region</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.region}</Text>
                  </View>
                  <View style={styles.stockoutMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Duration</Text>
                    <Text style={[styles.metricValue, { color: '#EF4444' }]}>{item.duration}</Text>
                  </View>
                  <View style={styles.stockoutMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
                    <Text style={[
                      styles.metricValue, 
                      { color: item.impact === 'high' ? '#EF4444' : '#F59E0B' }
                    ]}>
                      {item.impact}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Reorder Points */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Reorder Points</Text>
          <View style={[styles.reorderContainer, { backgroundColor: theme.colors.background }]}>
            {reorderPoints.map((item, index) => (
              <View key={index} style={styles.reorderItem}>
                <Text style={[styles.reorderSku, { color: theme.colors.text }]}>{item.sku}</Text>
                <View style={styles.reorderBars}>
                  <View style={styles.reorderBar}>
                    <Text style={[styles.reorderLabel, { color: theme.colors.textSecondary }]}>Current: {item.currentStock}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { backgroundColor: '#38BDF8', width: `${(parseFloat(item.currentStock) / parseFloat(item.currentStock) * 100)}%` }
                        ]} 
                      />
                    </View>
                  </View>
                  <View style={styles.reorderBar}>
                    <Text style={[styles.reorderLabel, { color: theme.colors.textSecondary }]}>Reorder: {item.reorderPoint}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { backgroundColor: '#F59E0B', width: `${(parseFloat(item.reorderPoint) / parseFloat(item.currentStock) * 100)}%` }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.reorderInfo}>
                  <Text style={[styles.reorderDays, { color: theme.colors.textSecondary }]}>{item.daysOfStock} days of stock</Text>
                  <View style={[
                    styles.reorderStatus,
                    { backgroundColor: item.status === 'safe' ? '#22C55E' + '20' : '#F59E0B' + '20' }
                  ]}>
                    <Text style={[
                      styles.reorderStatusText,
                      { color: item.status === 'safe' ? '#22C55E' : '#F59E0B' }
                    ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Fulfillment Speed */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fulfillment Speed</Text>
          <View style={[styles.speedContainer, { backgroundColor: theme.colors.background }]}>
            {fulfillmentSpeed.map((item, index) => (
              <View key={index} style={styles.speedItem}>
                <View style={styles.speedHeader}>
                  <Truck size={16} color="#38BDF8" />
                  <Text style={[styles.speedRegion, { color: theme.colors.text }]}>{item.region}</Text>
                </View>
                <View style={styles.speedMetrics}>
                  <View style={styles.speedMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Avg Time</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.avgTime}</Text>
                  </View>
                  <View style={styles.speedMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Target</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.textSecondary }]}>{item.target}</Text>
                  </View>
                  <View style={styles.speedMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Performance</Text>
                    <Text style={[styles.metricValue, { color: '#22C55E' }]}>{item.performance}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Fulfillment Pipeline */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Fulfillment Pipeline</Text>
          <View style={[styles.pipelineContainer, { backgroundColor: theme.colors.background }]}>
            {fulfillmentPipeline.map((stage, index) => (
              <View key={index} style={styles.pipelineStage}>
                <View style={styles.pipelineHeader}>
                  <Package size={16} color="#38BDF8" />
                  <Text style={[styles.pipelineStageName, { color: theme.colors.text }]}>{stage.stage}</Text>
                </View>
                <View style={styles.pipelineMetrics}>
                  <View style={styles.pipelineMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Count</Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>{stage.count}</Text>
                  </View>
                  <View style={styles.pipelineMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Avg Time</Text>
                    <Text style={[styles.metricValue, { color: '#38BDF8' }]}>{stage.avgTime}</Text>
                  </View>
                  <View style={styles.pipelineMetric}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Efficiency</Text>
                    <Text style={[styles.metricValue, { color: '#22C55E' }]}>{stage.efficiency}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Demand vs Supply */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Demand vs Supply</Text>
          <View style={[styles.balanceContainer, { backgroundColor: theme.colors.background }]}>
            {demandVsSupply.map((item, index) => (
              <View key={index} style={styles.balanceItem}>
                <Text style={[styles.balanceProduct, { color: theme.colors.text }]}>{item.product}</Text>
                <View style={styles.balanceBars}>
                  <View style={styles.balanceBar}>
                    <Text style={[styles.balanceLabel, { color: theme.colors.textSecondary }]}>Demand: {item.demand}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { backgroundColor: '#EF4444', width: '70%' }
                        ]} 
                      />
                    </View>
                  </View>
                  <View style={styles.balanceBar}>
                    <Text style={[styles.balanceLabel, { color: theme.colors.textSecondary }]}>Supply: {item.supply}</Text>
                    <View style={styles.barContainer}>
                      <View 
                        style={[
                          styles.barFill, 
                          { backgroundColor: '#22C55E', width: '50%' }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.balanceInfo}>
                  <Text style={[
                    styles.balanceValue, 
                    { color: item.balance.startsWith('+') ? '#22C55E' : '#EF4444' }
                  ]}>
                    {item.balance}
                  </Text>
                  <View style={[
                    styles.actionBadge,
                    { backgroundColor: item.action === 'Urgent' ? '#EF4444' + '20' : item.action === 'Reorder' ? '#F59E0B' + '20' : '#22C55E' + '20' }
                  ]}>
                    <Text style={[
                      styles.actionText,
                      { color: item.action === 'Urgent' ? '#EF4444' : item.action === 'Reorder' ? '#F59E0B' : '#22C55E' }
                    ]}>
                      {item.action}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  stockContainer: {
    padding: 16,
    borderRadius: 12,
  },
  stockItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockSku: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  stockProduct: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  stockMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockMetric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  warehouseContainer: {
    padding: 16,
    borderRadius: 12,
  },
  warehouseItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  warehouseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  warehouseInfo: {
    marginLeft: 12,
  },
  warehouseName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  warehouseLocation: {
    fontSize: 12,
  },
  warehouseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  warehouseMetric: {
    alignItems: 'center',
  },
  stockoutContainer: {
    padding: 16,
    borderRadius: 12,
  },
  stockoutItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  stockoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockoutSku: {
    fontSize: 12,
    marginLeft: 8,
  },
  stockoutProduct: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  stockoutMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockoutMetric: {
    alignItems: 'center',
  },
  reorderContainer: {
    padding: 16,
    borderRadius: 12,
  },
  reorderItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  reorderSku: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  reorderBars: {
    marginBottom: 12,
  },
  reorderBar: {
    marginBottom: 8,
  },
  reorderLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  barContainer: {
    height: 8,
    backgroundColor: '#1F2937',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  reorderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reorderDays: {
    fontSize: 12,
  },
  reorderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reorderStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  speedContainer: {
    padding: 16,
    borderRadius: 12,
  },
  speedItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  speedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  speedRegion: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  speedMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  speedMetric: {
    alignItems: 'center',
  },
  pipelineContainer: {
    padding: 16,
    borderRadius: 12,
  },
  pipelineStage: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pipelineStageName: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  pipelineMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pipelineMetric: {
    alignItems: 'center',
  },
  balanceContainer: {
    padding: 16,
    borderRadius: 12,
  },
  balanceItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  balanceProduct: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  balanceBars: {
    marginBottom: 12,
  },
  balanceBar: {
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
});