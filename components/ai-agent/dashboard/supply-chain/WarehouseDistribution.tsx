import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Warehouse, Package, Truck, Clock, CheckCircle, AlertTriangle } from 'lucide-react-native';

export default function WarehouseDistribution() {
  const { theme } = useTheme();

  const warehouseMetrics = [
    { label: 'Total Capacity', value: '2.4M sq ft', change: '+120K sq ft', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Avg Utilization', value: '87.4%', change: '+4.2%', trend: 'up' as const, color: '#10B981' },
    { label: 'Picking Efficiency', value: '94.2%', change: '+2.8%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Packing Accuracy', value: '98.7%', change: '+0.5%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Dock Utilization', value: '76.8%', change: '+3.4%', trend: 'up' as const, color: '#F59E0B' },
  ];

  const warehouses = [
    { 
      name: 'Distribution Center #1', 
      location: 'North America', 
      capacity: '480K sq ft', 
      utilization: 92, 
      pickingEfficiency: 96, 
      packingAccuracy: 99,
      dockUtilization: 84,
      fulfillmentSpeed: '2.4 hours',
      status: 'optimal' as const
    },
    { 
      name: 'Distribution Center #2', 
      location: 'Europe', 
      capacity: '420K sq ft', 
      utilization: 88, 
      pickingEfficiency: 94, 
      packingAccuracy: 98,
      dockUtilization: 78,
      fulfillmentSpeed: '2.8 hours',
      status: 'optimal' as const
    },
    { 
      name: 'Distribution Center #3', 
      location: 'Asia Pacific', 
      capacity: '360K sq ft', 
      utilization: 82, 
      pickingEfficiency: 92, 
      packingAccuracy: 97,
      dockUtilization: 72,
      fulfillmentSpeed: '3.2 hours',
      status: 'good' as const
    },
    { 
      name: 'Distribution Center #4', 
      location: 'Latin America', 
      capacity: '280K sq ft', 
      utilization: 78, 
      pickingEfficiency: 90, 
      packingAccuracy: 96,
      dockUtilization: 68,
      fulfillmentSpeed: '3.6 hours',
      status: 'good' as const
    },
  ];

  const performanceAlerts = [
    { warehouse: 'DC #3', alert: 'Picking efficiency below target', severity: 'medium' as const, current: 92, target: 95 },
    { warehouse: 'DC #4', alert: 'Dock congestion detected', severity: 'low' as const, current: 68, target: 75 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return '#10B981';
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
        <Warehouse size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Warehouse & Distribution Network Hub
        </Text>
      </View>

      {/* Warehouse Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {warehouseMetrics.map((metric, index) => (
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

      {/* Warehouse List */}
      <View style={styles.warehousesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Distribution Network Performance
        </Text>
        <View style={styles.warehousesList}>
          {warehouses.map((warehouse, index) => (
            <View 
              key={index}
              style={[styles.warehouseCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.warehouseHeader}>
                <View style={styles.warehouseInfo}>
                  <View style={styles.warehouseIconContainer}>
                    <Warehouse size={16} color="#3B82F6" />
                  </View>
                  <View>
                    <Text style={[styles.warehouseName, { color: theme.colors.text }]}>
                      {warehouse.name}
                    </Text>
                    <Text style={[styles.warehouseLocation, { color: theme.colors.textSecondary }]}>
                      {warehouse.location}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(warehouse.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(warehouse.status) }]}>
                    {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.warehouseMetrics}>
                <View style={styles.metricRow}>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Capacity
                    </Text>
                    <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                      {warehouse.capacity}
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Utilization
                    </Text>
                    <View style={styles.utilizationBar}>
                      <View 
                        style={[
                          styles.utilizationFill, 
                          { 
                            backgroundColor: getStatusColor(warehouse.status),
                            width: `${warehouse.utilization}%`
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.utilizationText, { color: getStatusColor(warehouse.status) }]}>
                      {warehouse.utilization}%
                    </Text>
                  </View>
                </View>

                <View style={styles.metricRow}>
                  <View style={styles.metricItem}>
                    <Package size={12} color="#10B981" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Picking: {warehouse.pickingEfficiency}%
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <CheckCircle size={12} color="#06B6D4" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Packing: {warehouse.packingAccuracy}%
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Truck size={12} color="#8B5CF6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Dock: {warehouse.dockUtilization}%
                    </Text>
                  </View>
                </View>

                <View style={styles.fulfillmentRow}>
                  <Clock size={12} color="#F59E0B" />
                  <Text style={[styles.fulfillmentText, { color: theme.colors.textSecondary }]}>
                    Fulfillment Speed: {warehouse.fulfillmentSpeed}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Performance Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Performance Alerts
        </Text>
        <View style={styles.alertsList}>
          {performanceAlerts.map((alert, index) => (
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
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.alertMetrics}>
                <View style={styles.alertMetric}>
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                    Current: {alert.current}%
                  </Text>
                </View>
                <View style={styles.alertMetric}>
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                    Target: {alert.target}%
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
    marginBottom: 12,
  },
  warehouseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warehouseIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  warehouseName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  warehouseLocation: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  warehouseMetrics: {
    gap: 8,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flex: 1,
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
  fulfillmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  fulfillmentText: {
    fontSize: 11,
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
    marginBottom: 8,
  },
  alertInfo: {
    flex: 1,
  },
  alertWarehouse: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertDescription: {
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
  alertMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  alertMetric: {
    flex: 1,
  },
  alertMetricLabel: {
    fontSize: 10,
  },
});