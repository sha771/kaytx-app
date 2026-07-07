import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Activity, Clock, AlertTriangle, Zap, Server, Globe, CheckCircle, TrendingUp } from 'lucide-react-native';

interface ServiceHealth {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
  errorRate: string;
  requests: string;
}

interface ObservabilityMonitoringProps {
  metrics: {
    serviceHealth: string;
    apiPerformance: string;
    responseTime: string;
    errorRates: string;
    trafficVolume: string;
    systemAvailability: string;
  };
  services: ServiceHealth[];
}

export default function ObservabilityMonitoring({ metrics, services }: ObservabilityMonitoringProps) {
  const { theme } = useTheme();

  const monitoringCards = [
    {
      label: 'Service Health',
      value: metrics.serviceHealth,
      icon: CheckCircle,
      color: '#10B981',
      subtitle: 'Overall status'
    },
    {
      label: 'API Performance',
      value: metrics.apiPerformance,
      icon: Zap,
      color: '#3B82F6',
      subtitle: 'Response quality'
    },
    {
      label: 'Response Time',
      value: metrics.responseTime,
      icon: Clock,
      color: '#8B5CF6',
      subtitle: 'Average latency'
    },
    {
      label: 'Error Rate',
      value: metrics.errorRates,
      icon: AlertTriangle,
      color: '#EF4444',
      subtitle: 'Failed requests'
    },
    {
      label: 'Traffic Volume',
      value: metrics.trafficVolume,
      icon: Activity,
      color: '#F59E0B',
      subtitle: 'Requests/sec'
    },
    {
      label: 'Availability',
      value: metrics.systemAvailability,
      icon: Server,
      color: '#06B6D4',
      subtitle: 'System uptime'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return '#10B981';
      case 'degraded':
        return '#F59E0B';
      case 'down':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return CheckCircle;
      case 'degraded':
        return AlertTriangle;
      case 'down':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Observability & Monitoring
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Real-Time System Performance
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {monitoringCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
                <View style={[styles.cardIcon, { backgroundColor: card.color + '20' }]}>
                  <Icon size={20} color={card.color} />
                </View>
                <Text style={[styles.cardLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.cardValue, { color: theme.colors.text }]}>
                  {card.value}
                </Text>
                <Text style={[styles.cardSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.servicesSection}>
        <View style={styles.servicesHeader}>
          <Text style={[styles.servicesTitle, { color: theme.colors.text }]}>
            Service Health
          </Text>
          <Text style={[styles.servicesCount, { color: theme.colors.textSecondary }]}>
            {services.length} services
          </Text>
        </View>

        {services.map((service) => {
          const StatusIcon = getStatusIcon(service.status);
          const statusColor = getStatusColor(service.status);
          
          return (
            <View key={service.id} style={[styles.serviceCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInfo}>
                  <View style={[styles.statusIndicator, { backgroundColor: statusColor + '20' }]}>
                    <StatusIcon size={18} color={statusColor} />
                  </View>
                  <View style={styles.serviceDetails}>
                    <Text style={[styles.serviceName, { color: theme.colors.text }]}>
                      {service.name}
                    </Text>
                    <View style={styles.serviceMeta}>
                      <Text style={[styles.serviceStatus, { color: statusColor }]}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Text>
                      <Text style={[styles.serviceUptime, { color: theme.colors.textSecondary }]}>
                        {service.uptime} uptime
                      </Text>
                    </View>
                  </View>
                </View>
                <TrendingUp size={20} color="#10B981" />
              </View>

              <View style={styles.serviceMetrics}>
                <View style={styles.metricGrid}>
                  <View style={styles.metricCard}>
                    <Clock size={14} color="#8B5CF6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Latency
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.latency}
                    </Text>
                  </View>

                  <View style={styles.metricCard}>
                    <AlertTriangle size={14} color="#EF4444" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Error Rate
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.errorRate}
                    </Text>
                  </View>

                  <View style={styles.metricCard}>
                    <Activity size={14} color="#3B82F6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Requests
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.requests}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.alertsSection}>
        <Text style={[styles.alertsTitle, { color: theme.colors.text }]}>
          Active Alerts
        </Text>

        <View style={[styles.alertCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color="#EF4444" />
            <View style={styles.alertInfo}>
              <Text style={[styles.alertTitle, { color: theme.colors.text }]}>
                High Latency Detected
              </Text>
              <Text style={[styles.alertService, { color: theme.colors.textSecondary }]}>
                payment-api-service
              </Text>
            </View>
            <Text style={[styles.alertTime, { color: theme.colors.textSecondary }]}>
              2m ago
            </Text>
          </View>
          <Text style={[styles.alertMessage, { color: theme.colors.textSecondary }]}>
            Response time increased by 45% in the last 5 minutes
          </Text>
        </View>

        <View style={[styles.alertCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
          <View style={styles.alertHeader}>
            <AlertTriangle size={20} color="#F59E0B" />
            <View style={styles.alertInfo}>
              <Text style={[styles.alertTitle, { color: theme.colors.text }]}>
                Memory Usage Warning
              </Text>
              <Text style={[styles.alertService, { color: theme.colors.textSecondary }]}>
                user-service-prod
              </Text>
            </View>
            <Text style={[styles.alertTime, { color: theme.colors.textSecondary }]}>
              15m ago
            </Text>
          </View>
          <Text style={[styles.alertMessage, { color: theme.colors.textSecondary }]}>
            Memory usage at 78% capacity
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  card: {
    width: 130,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 9,
    opacity: 0.6,
  },
  servicesSection: {
    marginBottom: 20,
  },
  servicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  servicesTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  servicesCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  serviceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  statusIndicator: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  serviceStatus: {
    fontSize: 11,
    fontWeight: '600',
  },
  serviceUptime: {
    fontSize: 11,
    opacity: 0.7,
  },
  serviceMetrics: {
    marginTop: 8,
  },
  metricGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertsSection: {
    marginTop: 8,
  },
  alertsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertService: {
    fontSize: 11,
    opacity: 0.7,
  },
  alertTime: {
    fontSize: 11,
    opacity: 0.7,
  },
  alertMessage: {
    fontSize: 12,
    opacity: 0.8,
    marginLeft: 32,
  }
});