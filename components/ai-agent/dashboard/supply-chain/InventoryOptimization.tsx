import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Package, TrendingUp, AlertTriangle, CheckCircle, ArrowUp, ArrowDown } from 'lucide-react-native';

export default function InventoryOptimization() {
  const { theme } = useTheme();

  const inventoryMetrics = [
    { label: 'Total Stock Value', value: '$842M', change: '+$48M', trend: 'up' as const, color: '#3B82F6' },
    { label: 'SKU Velocity', value: '12.4x', change: '+1.2x', trend: 'up' as const, color: '#10B981' },
    { label: 'Stockout Rate', value: '2.3%', change: '-0.8%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Overstock Risk', value: '8.4%', change: '-1.2%', trend: 'up' as const, color: '#F59E0B' },
    { label: 'Reorder Efficiency', value: '94.2%', change: '+2.4%', trend: 'up' as const, color: '#8B5CF6' },
  ];

  const warehouseInventory = [
    { warehouse: 'Distribution Center #1', location: 'North America', totalValue: '$284M', utilization: 87, health: 'excellent' as const },
    { warehouse: 'Distribution Center #2', location: 'Europe', totalValue: '$242M', utilization: 92, health: 'excellent' as const },
    { warehouse: 'Distribution Center #3', location: 'Asia Pacific', totalValue: '$198M', utilization: 78, health: 'good' as const },
    { warehouse: 'Distribution Center #4', location: 'Latin America', totalValue: '$118M', utilization: 84, health: 'good' as const },
  ];

  const inventoryAlerts = [
    { sku: 'SKU-12847', product: 'Component A-12', warehouse: 'DC #1', alert: 'Low stock threshold', severity: 'high' as const, current: 124, min: 150 },
    { sku: 'SKU-23456', product: 'Material B-45', warehouse: 'DC #3', alert: 'Overstock risk', severity: 'medium' as const, current: 2840, max: 2000 },
    { sku: 'SKU-34567', product: 'Assembly C-78', warehouse: 'DC #2', alert: 'Slow moving', severity: 'low' as const, current: 456, velocity: 0.3 },
  ];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return '#10B981';
      case 'good': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Package size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Inventory Optimization Center
        </Text>
      </View>

      {/* Inventory Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {inventoryMetrics.map((metric, index) => (
          <View 
            key={index}
            style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: `${metric.color}30` }]}
          >
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <View style={styles.metricChange}>
              <Text style={[styles.changeText, { color: '#10B981' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Warehouse Inventory */}
      <View style={styles.warehousesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Warehouse Inventory Health
        </Text>
        <View style={styles.warehousesList}>
          {warehouseInventory.map((warehouse, index) => (
            <View 
              key={index}
              style={[styles.warehouseCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.warehouseHeader}>
                <View style={styles.warehouseInfo}>
                  <Text style={[styles.warehouseName, { color: theme.colors.text }]}>
                    {warehouse.warehouse}
                  </Text>
                  <Text style={[styles.warehouseLocation, { color: theme.colors.textSecondary }]}>
                    {warehouse.location}
                  </Text>
                </View>
                <View style={[styles.healthBadge, { backgroundColor: getHealthColor(warehouse.health) + '20' }]}>
                  <Text style={[styles.healthText, { color: getHealthColor(warehouse.health) }]}>
                    {warehouse.health.charAt(0).toUpperCase() + warehouse.health.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.warehouseMetrics}>
                <View style={styles.warehouseMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Total Value
                  </Text>
                  <Text style={[styles.valueText, { color: '#8B5CF6' }]}>
                    {warehouse.totalValue}
                  </Text>
                </View>
                <View style={styles.warehouseMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Utilization
                  </Text>
                  <View style={styles.utilizationBar}>
                    <View 
                      style={[
                        styles.utilizationFill, 
                        { 
                          backgroundColor: getHealthColor(warehouse.health),
                          width: `${warehouse.utilization}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.utilizationText, { color: getHealthColor(warehouse.health) }]}>
                    {warehouse.utilization}%
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Inventory Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Inventory Alerts & Recommendations
        </Text>
        <View style={styles.alertsList}>
          {inventoryAlerts.map((alert, index) => (
            <View 
              key={index}
              style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(alert.severity)}30` }]}
            >
              <View style={styles.alertHeader}>
                <AlertTriangle size={16} color={getSeverityColor(alert.severity)} />
                <View style={styles.alertInfo}>
                  <Text style={[styles.alertSku, { color: theme.colors.text }]}>
                    {alert.sku}
                  </Text>
                  <Text style={[styles.alertProduct, { color: theme.colors.textSecondary }]}>
                    {alert.product}
                  </Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(alert.severity) }]}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={[styles.alertDescription, { color: theme.colors.textSecondary }]}>
                {alert.alert} at {alert.warehouse}
              </Text>
              <View style={styles.alertMetrics}>
                <View style={styles.alertMetric}>
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                    Current: {alert.current}
                  </Text>
                </View>
                {alert.min && (
                  <View style={styles.alertMetric}>
                    <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                      Min: {alert.min}
                    </Text>
                    <ArrowDown size={12} color="#EF4444" />
                  </View>
                )}
                {alert.max && (
                  <View style={styles.alertMetric}>
                    <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                      Max: {alert.max}
                    </Text>
                    <ArrowUp size={12} color="#F59E0B" />
                  </View>
                )}
                {alert.velocity && (
                  <View style={styles.alertMetric}>
                    <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                      Velocity: {alert.velocity}x
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  metricsScroll: {
    marginHorizontal: -8,
    marginBottom: 16,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 120,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    marginTop: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  warehousesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  warehousesList: {
    gap: 8,
  },
  warehouseCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  warehouseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  warehouseInfo: {
    flex: 1,
  },
  warehouseName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  warehouseLocation: {
    fontSize: 11,
  },
  healthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  healthText: {
    fontSize: 11,
    fontWeight: '600',
  },
  warehouseMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  warehouseMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    fontWeight: '700',
  },
  utilizationBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 4,
  },
  utilizationFill: {
    height: '100%',
    borderRadius: 3,
  },
  utilizationText: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertsSection: {
    marginBottom: 8,
  },
  alertsList: {
    gap: 8,
  },
  alertCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  alertInfo: {
    flex: 1,
  },
  alertSku: {
    fontSize: 13,
    fontWeight: '600',
  },
  alertProduct: {
    fontSize: 11,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  alertDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  alertMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  alertMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertMetricLabel: {
    fontSize: 10,
  },
});