import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Network, GitBranch, ArrowRight, AlertTriangle, CheckCircle, Activity, Layers, Package, Database } from 'lucide-react-native';

interface ServiceNode {
  id: string;
  name: string;
  type: 'api' | 'database' | 'queue' | 'cache' | 'frontend' | 'microservice';
  status: 'healthy' | 'degraded' | 'down';
  dependencies: string[];
  dependents: string[];
  metrics: {
    latency: string;
    errorRate: number;
    throughput: string;
  };
}

interface ServiceDependencyNetworkProps {
  services: ServiceNode[];
}

export default function ServiceDependencyNetwork({ services }: ServiceDependencyNetworkProps) {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return Package;
      case 'database': return Database;
      case 'queue': return Layers;
      case 'cache': return Activity;
      case 'frontend': return Network;
      case 'microservice': return GitBranch;
      default: return Package;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'degraded': return '#F59E0B';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'api': return '#3B82F6';
      case 'database': return '#8B5CF6';
      case 'queue': return '#F59E0B';
      case 'cache': return '#EC4899';
      case 'frontend': return '#06B6D4';
      case 'microservice': return '#10B981';
      default: return '#6B7280';
    }
  };

  const networkStats = [
    { label: 'Total Services', value: services.length, icon: Network, color: '#3B82F6' },
    { label: 'Dependencies', value: services.reduce((acc, s) => acc + s.dependencies.length, 0), icon: GitBranch, color: '#8B5CF6' },
    { label: 'Critical Path', value: '12', icon: AlertTriangle, color: '#EF4444' },
    { label: 'Healthy', value: services.filter(s => s.status === 'healthy').length, icon: CheckCircle, color: '#10B981' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Service Dependency Network
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          System Architecture & Relationships
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.statsRow}>
          {networkStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Icon size={20} color={stat.color} />
                </View>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  {stat.label}
                </Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {stat.value}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.networkSection}>
        <View style={styles.networkHeader}>
          <Text style={[styles.networkTitle, { color: theme.colors.text }]}>
            Service Nodes
          </Text>
          <View style={styles.typeLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>API</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Database</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Microservice</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.servicesScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.servicesGrid}>
            {services.map((service) => {
              const Icon = getTypeIcon(service.type);
              const statusColor = getStatusColor(service.status);
              const typeColor = getTypeColor(service.type);
              
              return (
                <View key={service.id} style={[styles.serviceCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: statusColor }]}>
                  <View style={styles.serviceHeader}>
                    <View style={[styles.serviceIcon, { backgroundColor: typeColor + '20' }]}>
                      <Icon size={20} color={typeColor} />
                    </View>
                    <View style={styles.serviceStatus}>
                      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                    </View>
                  </View>

                  <Text style={[styles.serviceName, { color: theme.colors.text }]}>
                    {service.name}
                  </Text>
                  <Text style={[styles.serviceType, { color: theme.colors.textSecondary }]}>
                    {service.type.charAt(0).toUpperCase() + service.type.slice(1)}
                  </Text>

                  <View style={styles.dependenciesInfo}>
                    <View style={styles.depItem}>
                      <GitBranch size={12} color="#8B5CF6" />
                      <Text style={[styles.depText, { color: theme.colors.textSecondary }]}>
                        {service.dependencies.length} deps
                      </Text>
                    </View>
                    <View style={styles.depItem}>
                      <ArrowRight size={12} color="#3B82F6" />
                      <Text style={[styles.depText, { color: theme.colors.textSecondary }]}>
                        {service.dependents.length} used by
                      </Text>
                    </View>
                  </View>

                  <View style={styles.metricsSection}>
                    <View style={styles.metricRow}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Latency</Text>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{service.metrics.latency}</Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Error Rate</Text>
                      <Text style={[styles.metricValue, { color: service.metrics.errorRate > 5 ? '#EF4444' : '#10B981' }]}>{service.metrics.errorRate}%</Text>
                    </View>
                    <View style={styles.metricRow}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Throughput</Text>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{service.metrics.throughput}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.criticalPathSection}>
        <Text style={[styles.criticalPathTitle, { color: theme.colors.text }]}>
          Critical Dependency Paths
        </Text>
        <View style={styles.criticalPaths}>
          <View style={styles.pathItem}>
            <View style={styles.pathFlow}>
              <Text style={[styles.pathService, { color: theme.colors.text }]}>API Gateway</Text>
              <ArrowRight size={12} color="#6B7280" />
              <Text style={[styles.pathService, { color: theme.colors.text }]}>Auth Service</Text>
              <ArrowRight size={12} color="#6B7280" />
              <Text style={[styles.pathService, { color: theme.colors.text }]}>User DB</Text>
            </View>
            <View style={[styles.pathStatus, { backgroundColor: '#10B981' + '20' }]}>
              <CheckCircle size={12} color="#10B981" />
              <Text style={[styles.pathStatusText, { color: '#10B981' }]}>Healthy</Text>
            </View>
          </View>

          <View style={styles.pathItem}>
            <View style={styles.pathFlow}>
              <Text style={[styles.pathService, { color: theme.colors.text }]}>API Gateway</Text>
              <ArrowRight size={12} color="#6B7280" />
              <Text style={[styles.pathService, { color: theme.colors.text }]}>Payment Service</Text>
              <ArrowRight size={12} color="#6B7280" />
              <Text style={[styles.pathService, { color: theme.colors.text }]}>Payment Gateway</Text>
            </View>
            <View style={[styles.pathStatus, { backgroundColor: '#F59E0B' + '20' }]}>
              <AlertTriangle size={12} color="#F59E0B" />
              <Text style={[styles.pathStatusText, { color: '#F59E0B' }]}>Degraded</Text>
            </View>
          </View>

          <View style={styles.pathItem}>
            <View style={styles.pathFlow}>
              <Text style={[styles.pathService, { color: theme.colors.text }]}>Web App</Text>
              <ArrowRight size={12} color="#6B7280" />
              <Text style={[styles.pathService, { color: theme.colors.text }]}>GraphQL API</Text>
              <ArrowRight size={12} color="#6B7280" />
              <Text style={[styles.pathService, { color: theme.colors.text }]}>Cache Layer</Text>
            </View>
            <View style={[styles.pathStatus, { backgroundColor: '#10B981' + '20' }]}>
              <CheckCircle size={12} color="#10B981" />
              <Text style={[styles.pathStatusText, { color: '#10B981' }]}>Healthy</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.impactAnalysis}>
        <Text style={[styles.impactTitle, { color: theme.colors.text }]}>
          Impact Analysis
        </Text>
        <View style={styles.impactList}>
          <View style={styles.impactItem}>
            <View style={[styles.impactBadge, { backgroundColor: '#EF4444' + '20' }]}>
              <AlertTriangle size={14} color="#EF4444" />
            </View>
            <View style={styles.impactInfo}>
              <Text style={[styles.impactText, { color: theme.colors.text }]}>
                Payment Service degradation affects 4 downstream services
              </Text>
              <Text style={[styles.impactSubtext, { color: theme.colors.textSecondary }]}>
                Estimated impact: 12% of transactions
              </Text>
            </View>
          </View>
          <View style={styles.impactItem}>
            <View style={[styles.impactBadge, { backgroundColor: '#10B981' + '20' }]}>
              <CheckCircle size={14} color="#10B981" />
            </View>
            <View style={styles.impactInfo}>
              <Text style={[styles.impactText, { color: theme.colors.text }]}>
                All critical paths operational
              </Text>
              <Text style={[styles.impactSubtext, { color: theme.colors.textSecondary }]}>
                System health: 98.7%
              </Text>
            </View>
          </View>
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: 120,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  networkSection: {
    marginBottom: 16,
  },
  networkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  networkTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeLegend: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
  },
  servicesScroll: {
    maxHeight: 400,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: 200,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    position: 'relative',
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceStatus: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  serviceName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  serviceType: {
    fontSize: 11,
    marginBottom: 8,
    opacity: 0.7,
  },
  dependenciesInfo: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  depItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  depText: {
    fontSize: 10,
  },
  metricsSection: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 10,
  },
  metricValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  criticalPathSection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginBottom: 16,
  },
  criticalPathTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  criticalPaths: {
    gap: 8,
  },
  pathItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pathFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  pathService: {
    fontSize: 11,
    fontWeight: '500',
  },
  pathStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pathStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  impactAnalysis: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  impactList: {
    gap: 8,
  },
  impactItem: {
    flexDirection: 'row',
    gap: 12,
  },
  impactBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactInfo: {
    flex: 1,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  impactSubtext: {
    fontSize: 11,
    opacity: 0.7,
  },
});