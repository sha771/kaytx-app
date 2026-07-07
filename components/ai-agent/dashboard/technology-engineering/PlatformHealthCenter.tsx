import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Database, Cloud, Activity, Clock, CheckCircle, AlertTriangle, Cpu, Shield, Globe, Zap } from 'lucide-react-native';

interface PlatformService {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: string;
  latency: string;
  reliability: number;
  lastCheck: string;
}

interface PlatformHealthCenterProps {
  services: PlatformService[];
  overallHealth: {
    score: number;
    status: string;
    uptime: string;
  };
}

export default function PlatformHealthCenter({ services, overallHealth }: PlatformHealthCenterProps) {
  const { theme } = useTheme();

  const getServiceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'api gateway':
        return Globe;
      case 'database':
        return Database;
      case 'kubernetes':
        return Server;
      case 'cloud provider':
        return Cloud;
      case 'cicd':
        return Activity;
      case 'monitoring':
        return Activity;
      case 'ai agent':
        return Cpu;
      default:
        return Server;
    }
  };

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

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 99) return '#10B981';
    if (reliability >= 95) return '#3B82F6';
    if (reliability >= 90) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Platform Health Center
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          System-wide Service Monitoring
        </Text>
      </View>

      <View style={styles.overviewSection}>
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View style={[styles.overviewIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Shield size={32} color="#10B981" />
            </View>
            <View style={styles.overviewInfo}>
              <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
                Platform Health Score
              </Text>
              <Text style={[styles.overviewScore, { color: theme.colors.text }]}>
                {overallHealth.score}/100
              </Text>
            </View>
          </View>
          <View style={[styles.overviewBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[styles.overviewFill, { 
                backgroundColor: overallHealth.score >= 90 ? '#10B981' : overallHealth.score >= 70 ? '#F59E0B' : '#EF4444',
                width: `${overallHealth.score}%` 
              }]} 
            />
          </View>
          <View style={styles.overviewMeta}>
            <View style={styles.metaItem}>
              <CheckCircle size={14} color="#10B981" />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {overallHealth.status}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Clock size={14} color="#8B5CF6" />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {overallHealth.uptime} uptime
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.servicesSection}>
        <View style={styles.servicesHeader}>
          <Text style={[styles.servicesTitle, { color: theme.colors.text }]}>
            Service Status
          </Text>
          <Text style={[styles.servicesCount, { color: theme.colors.textSecondary }]}>
            {services.length} services
          </Text>
        </View>

        {services.map((service) => {
          const ServiceIcon = getServiceIcon(service.type);
          const StatusIcon = getStatusIcon(service.status);
          const statusColor = getStatusColor(service.status);
          const reliabilityColor = getReliabilityColor(service.reliability);
          
          return (
            <View key={service.id} style={[styles.serviceCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderLeftColor: statusColor }]}>
              <View style={styles.serviceHeader}>
                <View style={styles.serviceInfo}>
                  <View style={[styles.serviceIcon, { backgroundColor: statusColor + '20' }]}>
                    <ServiceIcon size={20} color={statusColor} />
                  </View>
                  <View style={styles.serviceDetails}>
                    <Text style={[styles.serviceName, { color: theme.colors.text }]}>
                      {service.name}
                    </Text>
                    <Text style={[styles.serviceType, { color: theme.colors.textSecondary }]}>
                      {service.type}
                    </Text>
                  </View>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                  <StatusIcon size={14} color={statusColor} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {service.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.serviceMetrics}>
                <View style={styles.metricRow}>
                  <View style={styles.metricItem}>
                    <Clock size={14} color="#8B5CF6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Uptime
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.uptime}
                    </Text>
                  </View>

                  <View style={styles.metricItem}>
                    <Zap size={14} color="#F59E0B" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Latency
                    </Text>
                    <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                      {service.latency}
                    </Text>
                  </View>

                  <View style={styles.metricItem}>
                    <Shield size={14} color="#10B981" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Reliability
                    </Text>
                    <Text style={[styles.metricValue, { color: reliabilityColor }]}>
                      {service.reliability}%
                    </Text>
                  </View>
                </View>

                <View style={styles.reliabilityBar}>
                  <Text style={[styles.reliabilityLabel, { color: theme.colors.textSecondary }]}>
                    Reliability Score
                  </Text>
                  <View style={[styles.reliabilityTrack, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[styles.reliabilityFill, { 
                        backgroundColor: reliabilityColor,
                        width: `${service.reliability}%` 
                      }]} 
                    />
                  </View>
                </View>
              </View>

              <View style={styles.serviceFooter}>
                <Text style={[styles.lastCheck, { color: theme.colors.textSecondary }]}>
                  Last check: {service.lastCheck}
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.healthDistributionSection}>
        <Text style={[styles.distributionTitle, { color: theme.colors.text }]}>
          Health Distribution
        </Text>

        <View style={styles.distributionGrid}>
          <View style={[styles.distributionCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={[styles.distributionLabel, { color: theme.colors.text }]}>
              Healthy
            </Text>
            <Text style={[styles.distributionValue, { color: '#10B981' }]}>
              {services.filter(s => s.status === 'healthy').length}
            </Text>
          </View>

          <View style={[styles.distributionCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={[styles.distributionLabel, { color: theme.colors.text }]}>
              Degraded
            </Text>
            <Text style={[styles.distributionValue, { color: '#F59E0B' }]}>
              {services.filter(s => s.status === 'degraded').length}
            </Text>
          </View>

          <View style={[styles.distributionCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
            <AlertTriangle size={24} color="#EF4444" />
            <Text style={[styles.distributionLabel, { color: theme.colors.text }]}>
              Down
            </Text>
            <Text style={[styles.distributionValue, { color: '#EF4444' }]}>
              {services.filter(s => s.status === 'down').length}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.alertsSection}>
        <Text style={[styles.alertsTitle, { color: theme.colors.text }]}>
          Active Alerts
        </Text>

        {services.filter(s => s.status !== 'healthy').length > 0 ? (
          services.filter(s => s.status !== 'healthy').map((service) => (
            <View key={service.id} style={[styles.alertCard, { backgroundColor: service.status === 'down' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', borderColor: getStatusColor(service.status) }]}>
              <AlertTriangle size={20} color={getStatusColor(service.status)} />
              <View style={styles.alertInfo}>
                <Text style={[styles.alertService, { color: theme.colors.text }]}>
                  {service.name}
                </Text>
                <Text style={[styles.alertMessage, { color: theme.colors.textSecondary }]}>
                  Service is {service.status}
                </Text>
              </View>
              <Clock size={16} color="#8B5CF6" />
            </View>
          ))
        ) : (
          <View style={[styles.noAlertsCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={[styles.noAlertsText, { color: '#10B981' }]}>
              All systems operational
            </Text>
          </View>
        )}
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
    marginBottom: 20,
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
  overviewSection: {
    marginBottom: 20,
  },
  overviewCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  overviewInfo: {
    flex: 1,
  },
  overviewLabel: {
    fontSize: 13,
    marginBottom: 4,
    opacity: 0.7,
  },
  overviewScore: {
    fontSize: 32,
    fontWeight: '700',
  },
  overviewBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  overviewFill: {
    height: '100%',
    borderRadius: 6,
  },
  overviewMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    opacity: 0.8,
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
    borderLeftWidth: 4,
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
  serviceIcon: {
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
  serviceType: {
    fontSize: 11,
    opacity: 0.7,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  serviceMetrics: {
    marginTop: 8,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  reliabilityBar: {
    marginTop: 8,
  },
  reliabilityLabel: {
    fontSize: 11,
    marginBottom: 6,
    opacity: 0.7,
  },
  reliabilityTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  reliabilityFill: {
    height: '100%',
    borderRadius: 3,
  },
  serviceFooter: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  lastCheck: {
    fontSize: 10,
    opacity: 0.7,
  },
  healthDistributionSection: {
    marginBottom: 20,
  },
  distributionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  distributionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  distributionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  distributionLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  distributionValue: {
    fontSize: 24,
    fontWeight: '700',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  alertInfo: {
    flex: 1,
  },
  alertService: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 12,
    opacity: 0.8,
  },
  noAlertsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  noAlertsText: {
    fontSize: 14,
    fontWeight: '600',
  }
});