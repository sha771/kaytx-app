import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ShoppingCart, TrendingUp, AlertTriangle, CheckCircle, Star, MapPin, Clock } from 'lucide-react-native';

export default function ProcurementSupplierHub() {
  const { theme } = useTheme();

  const procurementMetrics = [
    { label: 'Total Procurement Spend', value: '$2.4B', change: '-$180M', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Active Suppliers', value: '48,200', change: '+1,240', trend: 'up' as const, color: '#10B981' },
    { label: 'Contract Compliance', value: '94.2%', change: '+2.4%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Avg Lead Time', value: '18 days', change: '-2 days', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Cost Savings', value: '$184M', change: '+$42M', trend: 'up' as const, color: '#F59E0B' },
  ];

  const topSuppliers = [
    { 
      name: 'Global Components Inc', 
      region: 'Asia Pacific', 
      performance: 96, 
      onTimeDelivery: 98, 
      qualityScore: 97,
      contractValue: '$142M',
      riskLevel: 'low' as const,
      status: 'preferred' as const
    },
    { 
      name: 'European Materials Ltd', 
      region: 'Europe', 
      performance: 94, 
      onTimeDelivery: 95, 
      qualityScore: 96,
      contractValue: '$98M',
      riskLevel: 'low' as const,
      status: 'preferred' as const
    },
    { 
      name: 'Americas Supply Co', 
      region: 'North America', 
      performance: 92, 
      onTimeDelivery: 93, 
      qualityScore: 94,
      contractValue: '$76M',
      riskLevel: 'medium' as const,
      status: 'active' as const
    },
    { 
      name: 'Pacific Trade Partners', 
      region: 'Asia Pacific', 
      performance: 89, 
      onTimeDelivery: 91, 
      qualityScore: 92,
      contractValue: '$64M',
      riskLevel: 'medium' as const,
      status: 'active' as const
    },
  ];

  const procurementAlerts = [
    { supplier: 'Global Components Inc', alert: 'Price increase notification', severity: 'medium' as const, impact: '+4.2%', timeline: '30 days' },
    { supplier: 'Pacific Trade Partners', alert: 'Lead time extension', severity: 'high' as const, impact: '+5 days', timeline: 'Immediate' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preferred': return '#10B981';
      case 'active': return '#3B82F6';
      case 'under-review': return '#F59E0B';
      case 'inactive': return '#EF4444';
      default: return '#6B7280';
    }
  };

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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <ShoppingCart size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Procurement & Supplier Intelligence Hub
        </Text>
      </View>

      {/* Procurement Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {procurementMetrics.map((metric, index) => (
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

      {/* Top Suppliers */}
      <View style={styles.suppliersSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Top Performing Suppliers
        </Text>
        <View style={styles.suppliersList}>
          {topSuppliers.map((supplier, index) => (
            <View 
              key={index}
              style={[styles.supplierCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.supplierHeader}>
                <View style={styles.supplierInfo}>
                  <View style={styles.supplierIconContainer}>
                    <Star size={16} color="#F59E0B" />
                  </View>
                  <View>
                    <Text style={[styles.supplierName, { color: theme.colors.text }]}>
                      {supplier.name}
                    </Text>
                    <View style={styles.supplierLocation}>
                      <MapPin size={12} color="#6B7280" />
                      <Text style={[styles.supplierRegion, { color: theme.colors.textSecondary }]}>
                        {supplier.region}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(supplier.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(supplier.status) }]}>
                    {supplier.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.supplierMetrics}>
                <View style={styles.supplierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Performance
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {supplier.performance}%
                  </Text>
                </View>
                <View style={styles.supplierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    On-Time Delivery
                  </Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                    {supplier.onTimeDelivery}%
                  </Text>
                </View>
                <View style={styles.supplierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Quality Score
                  </Text>
                  <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                    {supplier.qualityScore}%
                  </Text>
                </View>
              </View>

              <View style={styles.supplierDetails}>
                <View style={styles.supplierDetail}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Contract Value
                  </Text>
                  <Text style={[styles.detailValue, { color: '#8B5CF6' }]}>
                    {supplier.contractValue}
                  </Text>
                </View>
                <View style={styles.supplierDetail}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Risk Level
                  </Text>
                  <View style={styles.riskBadge}>
                    <View style={[styles.riskDot, { backgroundColor: getRiskColor(supplier.riskLevel) }]} />
                    <Text style={[styles.riskText, { color: getRiskColor(supplier.riskLevel) }]}>
                      {supplier.riskLevel.toUpperCase()}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Procurement Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Procurement Alerts
        </Text>
        <View style={styles.alertsList}>
          {procurementAlerts.map((alert, index) => (
            <View 
              key={index}
              style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(alert.severity)}30` }]}
            >
              <View style={styles.alertHeader}>
                <AlertTriangle size={16} color={getSeverityColor(alert.severity)} />
                <View style={styles.alertInfo}>
                  <Text style={[styles.alertSupplier, { color: theme.colors.text }]}>
                    {alert.supplier}
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
                  <Clock size={12} color="#F59E0B" />
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    Timeline: {alert.timeline}
                  </Text>
                </View>
                <View style={styles.alertDetail}>
                  <Text style={[styles.alertDetailLabel, { color: theme.colors.textSecondary }]}>
                    Impact: {alert.impact}
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
  suppliersSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  suppliersList: {
    gap: 12,
  },
  supplierCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  supplierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  supplierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  supplierIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  supplierName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  supplierLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  supplierRegion: {
    fontSize: 11,
    fontWeight: '500',
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
  supplierMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  supplierMetric: {
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
  supplierDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.1)',
    paddingTop: 12,
  },
  supplierDetail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  riskText: {
    fontSize: 10,
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
  alertSupplier: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertDetailLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});