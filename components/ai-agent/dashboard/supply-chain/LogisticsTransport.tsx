import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Truck, MapPin, Clock, AlertTriangle, CheckCircle, Route } from 'lucide-react-native';

export default function LogisticsTransport() {
  const { theme } = useTheme();

  const logisticsMetrics = [
    { label: 'Shipments In Transit', value: '1,842', change: '+124', trend: 'up' as const, color: '#3B82F6' },
    { label: 'On-Time Delivery', value: '94.8%', change: '+1.8%', trend: 'up' as const, color: '#10B981' },
    { label: 'Route Efficiency', value: '87.2%', change: '+3.4%', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Carrier Performance', value: '92.4%', change: '+2.1%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Avg Delivery Time', value: '3.2 days', change: '-0.4 days', trend: 'up' as const, color: '#F59E0B' },
  ];

  const activeShipments = [
    { id: 'SHP-12847', origin: 'Shanghai, CN', destination: 'Los Angeles, US', carrier: 'Maersk', status: 'in_transit' as const, progress: 68, eta: '2 days' },
    { id: 'SHP-23456', origin: 'Hamburg, DE', destination: 'New York, US', carrier: 'Hapag-Lloyd', status: 'in_transit' as const, progress: 45, eta: '5 days' },
    { id: 'SHP-34567', origin: 'Singapore, SG', destination: 'Rotterdam, NL', carrier: 'CMA CGM', status: 'delayed' as const, progress: 32, eta: '7 days' },
    { id: 'SHP-45678', origin: 'Tokyo, JP', destination: 'Sydney, AU', carrier: 'Evergreen', status: 'in_transit' as const, progress: 78, eta: '1 day' },
  ];

  const carrierPerformance = [
    { carrier: 'Maersk', performance: 96, onTimeRate: 94, shipments: 482, status: 'excellent' as const },
    { carrier: 'Hapag-Lloyd', performance: 94, onTimeRate: 92, shipments: 342, status: 'excellent' as const },
    { carrier: 'CMA CGM', performance: 91, onTimeRate: 89, shipments: 284, status: 'good' as const },
    { carrier: 'Evergreen', performance: 89, onTimeRate: 87, shipments: 198, status: 'good' as const },
  ];

  const logisticsAlerts = [
    { shipment: 'SHP-34567', alert: 'Port congestion at Rotterdam', severity: 'high' as const, delay: '+2 days', impact: '12 containers' },
    { shipment: 'SHP-12847', alert: 'Weather delay expected', severity: 'medium' as const, delay: '+1 day', impact: '8 containers' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return '#3B82F6';
      case 'delivered': return '#10B981';
      case 'delayed': return '#F59E0B';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
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
        <Truck size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Logistics & Transport Intelligence
        </Text>
      </View>

      {/* Logistics Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {logisticsMetrics.map((metric, index) => (
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

      {/* Active Shipments */}
      <View style={styles.shipmentsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Active Shipments
        </Text>
        <View style={styles.shipmentsList}>
          {activeShipments.map((shipment, index) => (
            <View 
              key={index}
              style={[styles.shipmentCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.shipmentHeader}>
                <View style={styles.shipmentInfo}>
                  <Text style={[styles.shipmentId, { color: theme.colors.text }]}>
                    {shipment.id}
                  </Text>
                  <View style={styles.routeContainer}>
                    <MapPin size={12} color="#3B82F6" />
                    <Text style={[styles.routeText, { color: theme.colors.textSecondary }]}>
                      {shipment.origin}
                    </Text>
                    <Route size={12} color="#6B7280" />
                    <Text style={[styles.routeText, { color: theme.colors.textSecondary }]}>
                      {shipment.destination}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(shipment.status) + '20' }]}>
                  <Text style={[styles.statusText, { color: getStatusColor(shipment.status) }]}>
                    {shipment.status.replace('_', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.shipmentDetails}>
                <View style={styles.shipmentDetail}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Carrier
                  </Text>
                  <Text style={[styles.detailValue, { color: '#8B5CF6' }]}>
                    {shipment.carrier}
                  </Text>
                </View>
                <View style={styles.shipmentDetail}>
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Progress
                  </Text>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          backgroundColor: getStatusColor(shipment.status),
                          width: `${shipment.progress}%`
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.progressText, { color: getStatusColor(shipment.status) }]}>
                    {shipment.progress}%
                  </Text>
                </View>
                <View style={styles.shipmentDetail}>
                  <Clock size={12} color="#F59E0B" />
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    ETA: {shipment.eta}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Carrier Performance */}
      <View style={styles.carriersSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Carrier Performance
        </Text>
        <View style={styles.carriersList}>
          {carrierPerformance.map((carrier, index) => (
            <View 
              key={index}
              style={[styles.carrierCard, { backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }]}
            >
              <View style={styles.carrierHeader}>
                <Text style={[styles.carrierName, { color: theme.colors.text }]}>
                  {carrier.carrier}
                </Text>
                <View style={[styles.performanceBadge, { backgroundColor: getPerformanceColor(carrier.status) + '20' }]}>
                  <Text style={[styles.performanceText, { color: getPerformanceColor(carrier.status) }]}>
                    {carrier.status.charAt(0).toUpperCase() + carrier.status.slice(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.carrierMetrics}>
                <View style={styles.carrierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Performance
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {carrier.performance}%
                  </Text>
                </View>
                <View style={styles.carrierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    On-Time Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
                    {carrier.onTimeRate}%
                  </Text>
                </View>
                <View style={styles.carrierMetric}>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Shipments
                  </Text>
                  <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                    {carrier.shipments}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Logistics Alerts */}
      <View style={styles.alertsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Logistics Alerts
        </Text>
        <View style={styles.alertsList}>
          {logisticsAlerts.map((alert, index) => (
            <View 
              key={index}
              style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: `${getSeverityColor(alert.severity)}30` }]}
            >
              <View style={styles.alertHeader}>
                <AlertTriangle size={16} color={getSeverityColor(alert.severity)} />
                <View style={styles.alertInfo}>
                  <Text style={[styles.alertShipment, { color: theme.colors.text }]}>
                    {alert.shipment}
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
                  <Clock size={12} color="#F59E0B" />
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
                    Delay: {alert.delay}
                  </Text>
                </View>
                <View style={styles.alertMetric}>
                  <CheckCircle size={12} color="#EF4444" />
                  <Text style={[styles.alertMetricLabel, { color: theme.colors.textSecondary }]}>
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
  shipmentsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  shipmentsList: {
    gap: 8,
  },
  shipmentCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  shipmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  shipmentInfo: {
    flex: 1,
  },
  shipmentId: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeText: {
    fontSize: 11,
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
  shipmentDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  shipmentDetail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  carriersSection: {
    marginBottom: 16,
  },
  carriersList: {
    gap: 8,
  },
  carrierCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  carrierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  carrierName: {
    fontSize: 13,
    fontWeight: '600',
  },
  performanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  performanceText: {
    fontSize: 11,
    fontWeight: '600',
  },
  carrierMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  carrierMetric: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
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
  alertShipment: {
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  alertMetricLabel: {
    fontSize: 10,
  },
});