import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Package, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Activity, Target } from 'lucide-react-native';

export default function InventoryOptimizationCenter() {
  const { theme } = useTheme();

  const inventoryMetrics = [
    { label: 'Total Inventory Value', value: '$842M', change: '-$42M', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Stock Levels', value: '2.4M units', change: '-180K units', trend: 'up' as const, color: '#10B981' },
    { label: 'SKU Velocity', value: '8.2x', change: '+0.6x', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Safety Stock', value: '94.2%', change: '+2.4%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Carrying Cost', value: '$84M', change: '-$8M', trend: 'up' as const, color: '#F59E0B' },
  ];

  const warehouseInventory = [
    { 
      warehouse: 'DC #1 North America', 
      totalValue: '$324M', 
      utilization: 92, 
      turnover: 8.4, 
      stockoutRisk: 'low' as const,
      overstockRisk: 'low' as const,
      healthScore: 96
    },
    { 
      warehouse: 'DC #2 Europe', 
      totalValue: '$248M', 
      utilization: 88, 
      turnover: 7.8, 
      stockoutRisk: 'low' as const,
      overstockRisk: 'medium' as const,
      healthScore: 92
    },
    { 
      warehouse: 'DC #3 Asia Pacific', 
      totalValue: '$186M', 
      utilization: 84, 
      turnover: 7.2, 
      stockoutRisk: 'medium' as const,
      overstockRisk: 'low' as const,
      healthScore: 88
    },
    { 
      warehouse: 'DC #4 Latin America', 
      totalValue: '$84M', 
      utilization: 78, 
      turnover: 6.8, 
      stockoutRisk: 'medium' as const,
      overstockRisk: 'low' as const,
      healthScore: 84
    },
  ];

  const inventoryAlerts = [
    { warehouse: 'DC #3 Asia Pacific', alert: 'Stockout risk increasing', severity: 'medium' as const, skus: 124, impact: '2.4%' },
    { warehouse: 'DC #2 Europe', alert: 'Overstock detected in category B', severity: 'low' as const, skus: 86, impact: '1.2%' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
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

  const getHealthColor = (score: number) => {
    if (score >= 95) return '#10B981';
    if (score >= 90) return '#3B82F6';
    if (score >= 85) return '#06B6D4';
    return '#F59E0B';
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
              <TrendingUp size={12} color="#10B981" />
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
          Multi-Warehouse Inventory Status
        </Text>
        <View style={styles.warehousesList}>
          {warehouseInventory.map((warehouse, index) => (
            <View 
              key={index}
              style={[styles.warehouseCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.warehouseHeader}>
                <Text style={[styles.warehouseName, { color: theme.colors.text }]}>
                  {warehouse.warehouse}
                </Text>
                <View style={[styles.healthBadge, { backgroundColor: getHealthColor(warehouse.healthScore) + '20' }]}>
                  <Text style={[styles.healthText, { color: getHealthColor(warehouse.healthScore) }]}>
                    {warehouse.healthScore}% Health
                  </Text>
                </View>
              </View>

              <View style={styles.warehouseMetrics}>
                <View style={styles.warehouseMetric}>
                  <BarChart3 size={12} color="#3B82F6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Total Value
                  </Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                    {warehouse.totalValue}
                  </Text>
                </View>

                <View style={styles.warehouseMetric}>
                  <Activity size={12} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Utilization
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {warehouse.utilization}%
                  </Text>
                </View>

                <View style={styles.warehouseMetric}>
                  <Target size={12} color="#06B6D4" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Turnover
                  </Text>
                  <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                    {warehouse.turnover}x
                  </Text>
                </View>
              </View>

              <View style={styles.warehouseRisks}>
                <View style={styles.riskItem}>
                  {warehouse.stockoutRisk === 'low' ? (
                    <CheckCircle size={12} color="#10B981" />
                  ) : (
                    <AlertTriangle size={12} color="#F59E0B" />
                  )}
                  <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>
                    Stockout Risk
                  </Text>
                  <Text style={[
                    styles.riskValue, 
                    { color: getRiskColor(warehouse.stockoutRisk) }
                  ]}>
                    {warehouse.stockoutRisk.toUpperCase()}
                  </Text>
                </View>

                <View style={styles.riskItem}>
                  {warehouse.overstockRisk === 'low' ? (
                    <CheckCircle size={12} color="#10B981" />
                  ) : (
                    <AlertTriangle size={12} color="#F59E0B" />
                  )}
                  <Text style={[styles.riskLabel, { color: theme.colors.textSecondary }]}>
                    Overstock Risk
                  </Text>
                  <Text style={[
                    styles.riskValue, 
                    { color: getRiskColor(warehouse.overstockRisk) }
                  ]}>
                    {warehouse.overstockRisk.toUpperCase()}
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
          Inventory Optimization Alerts
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
                  <Text style={[styles.alertWarehouse, { color: theme.colors.text }]}>
                    {alert.warehouse}
                  </Text>
                  <Text style={[styles.alertDescription, { color: theme.colors.textSecondary }]}>
                    {alert.alert}
                  </Text>
                </View>
                <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(alert.severity) + '20' }]}>
                  <Text style={[styles.severityText, { color: getSeverityColor(alert.severity) }]}>
                    {alert.severity.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.alertDetails}>
                <View style={styles.alertDetail}>
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    SKUs Affected: {alert.skus}
                  </Text>
                </View>
                <View style={styles.alertDetail}>
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    Business Impact: {alert.impact}
                  </Text>
                </View>
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
    marginBottom: 16,
  },
  metricCard: {
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    minWidth: 140,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  warehousesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  warehousesList: {
    gap: 12,
  },
  warehouseCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  warehouseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  warehouseName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  healthBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  healthText: {
    fontSize: 10,
    fontWeight: '600',
  },
  warehouseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  warehouseMetric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  warehouseRisks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
    paddingTop: 12,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  riskLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  riskValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  alertsSection: {
    marginBottom: 8,
  },
  alertsList: {
    gap: 12,
  },
  alertCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  alertInfo: {
    flex: 1,
    marginLeft: 12,
  },
  alertWarehouse: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertDescription: {
    fontSize: 12,
    fontWeight: '500',
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
  alertDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alertDetail: {
    flex: 1,
  },
  alertDetailLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});