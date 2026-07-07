import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Cpu, HardDrive, Database, Zap, Shield, AlertTriangle, CheckCircle, Activity, Clock, Globe, Network, BarChart3, TrendingUp } from 'lucide-react-native';

interface SystemComponent {
  id: string;
  name: string;
  type: 'llm_provider' | 'vector_db' | 'agent_framework' | 'api_gateway' | 'model_hosting';
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  latency: string;
  errorRate: string;
  lastIncident: string;
  dependencies: string[];
  metrics: {
    label: string;
    value: string;
    status: 'good' | 'warning' | 'critical';
  }[];
}

interface AISystemHealthProps {
  components: SystemComponent[];
}

export default function AISystemHealth({ components }: AISystemHealthProps) {
  const { theme } = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'llm_provider': return '#06B6D4';
      case 'vector_db': return '#8B5CF6';
      case 'agent_framework': return '#10B981';
      case 'api_gateway': return '#F59E0B';
      case 'model_hosting': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeBackground = (type: string) => {
    const color = getTypeColor(type);
    return color + '15';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#10B981';
      case 'degraded': return '#F59E0B';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: string) => {
    const color = getStatusColor(status);
    return color + '15';
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const typeIcon = {
    llm_provider: Zap,
    vector_db: Database,
    agent_framework: Network,
    api_gateway: Globe,
    model_hosting: Server,
  };

  const systemOverview = [
    { label: 'Overall Health', value: '98.2%', color: '#10B981' },
    { label: 'Active Systems', value: '12/12', color: '#06B6D4' },
    { label: 'Incidents', value: '0', color: '#10B981' },
    { label: 'Avg Latency', value: '142ms', color: '#8B5CF6' },
  ];

  const infrastructureHealth = [
    { component: 'LLM Providers', health: 99.8, color: '#10B981' },
    { component: 'Vector Databases', health: 98.5, color: '#10B981' },
    { component: 'Agent Frameworks', health: 97.2, color: '#10B981' },
    { component: 'API Gateways', health: 99.1, color: '#10B981' },
    { component: 'Model Hosting', health: 96.8, color: '#F59E0B' },
  ];

  const uptimeData = [
    { period: '24h', uptime: 99.9, color: '#10B981' },
    { period: '7d', uptime: 99.7, color: '#10B981' },
    { period: '30d', uptime: 99.4, color: '#10B981' },
    { period: '90d', uptime: 99.1, color: '#10B981' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Server size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI System Health
        </Text>
      </View>

      {/* System Overview */}
      <View style={[styles.overviewSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.overviewHeader}>
          <Activity size={18} color="#06B6D4" />
          <Text style={[styles.overviewTitle, { color: theme.colors.text }]}>
            Infrastructure Health Index
          </Text>
        </View>
        <View style={styles.overviewGrid}>
          {systemOverview.map((item, index) => (
            <View key={index} style={styles.overviewCard}>
              <Text style={[styles.overviewLabel, { color: theme.colors.textSecondary }]}>
                {item.label}
              </Text>
              <Text style={[styles.overviewValue, { color: item.color }]}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Infrastructure Health */}
      <View style={[styles.infrastructureSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.infrastructureHeader}>
          <BarChart3 size={18} color="#8B5CF6" />
          <Text style={[styles.infrastructureTitle, { color: theme.colors.text }]}>
            Component Health Overview
          </Text>
        </View>
        <View style={styles.infrastructureGrid}>
          {infrastructureHealth.map((item) => (
            <View key={item.component} style={styles.infrastructureItem}>
              <Text style={[styles.infrastructureLabel, { color: theme.colors.textSecondary }]}>
                {item.component}
              </Text>
              <View style={[styles.infrastructureBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.infrastructureFill, 
                    { backgroundColor: item.color, width: item.health + '%' }
                  ]} 
                />
              </View>
              <Text style={[styles.infrastructureValue, { color: item.color }]}>
                {item.health}%
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Uptime Dashboard */}
      <View style={[styles.uptimeSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.uptimeHeader}>
          <Clock size={18} color="#10B981" />
          <Text style={[styles.uptimeTitle, { color: theme.colors.text }]}>
            System Uptime Dashboard
          </Text>
        </View>
        <View style={styles.uptimeGrid}>
          {uptimeData.map((item) => (
            <View key={item.period} style={styles.uptimeCard}>
              <Text style={[styles.uptimePeriod, { color: theme.colors.textSecondary }]}>
                {item.period}
              </Text>
              <Text style={[styles.uptimeValue, { color: item.color }]}>
                {item.uptime}%
              </Text>
              <View style={[styles.uptimeIndicator, { backgroundColor: item.color }]} />
            </View>
          ))}
        </View>
      </View>

      {/* System Component Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.componentsScroll}
      >
        {components.map((component) => {
          const typeColor = getTypeColor(component.type);
          const typeBackground = getTypeBackground(component.type);
          const statusColor = getStatusColor(component.status);
          const statusBackground = getStatusBackground(component.status);
          const TypeIcon = typeIcon[component.type];

          return (
            <View 
              key={component.id} 
              style={[
                styles.componentCard, 
                { 
                  backgroundColor: typeBackground,
                  borderColor: typeColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.componentHeader}>
                <View style={[styles.componentIcon, { backgroundColor: typeColor + '20' }]}>
                  <TypeIcon size={24} color={typeColor} />
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: statusBackground }
                ]}>
                  <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                  <Text style={[styles.statusText, { color: statusColor }]}>
                    {component.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              <Text style={[styles.componentName, { color: theme.colors.text }]}>
                {component.name}
              </Text>
              <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                <Text style={[styles.typeText, { color: typeColor }]}>
                  {component.type.replace('_', ' ').toUpperCase()}
                </Text>
              </View>

              <View style={styles.componentMetrics}>
                <View style={styles.metricRow}>
                  <CheckCircle size={14} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Uptime
                  </Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>
                    {component.uptime}%
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <Clock size={14} color="#06B6D4" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Latency
                  </Text>
                  <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                    {component.latency}
                  </Text>
                </View>
                <View style={styles.metricRow}>
                  <AlertTriangle size={14} color={component.errorRate === '0%' ? '#10B981' : '#F59E0B'} />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Error Rate
                  </Text>
                  <Text style={[
                    styles.metricValue, 
                    { color: component.errorRate === '0%' ? '#10B981' : '#F59E0B' }
                  ]}>
                    {component.errorRate}
                  </Text>
                </View>
              </View>

              <View style={styles.metricsDetail}>
                <Text style={[styles.metricsTitle, { color: theme.colors.textSecondary }]}>
                  Performance Metrics
                </Text>
                {component.metrics.map((metric, index) => (
                  <View key={index} style={styles.metricDetailRow}>
                    <View style={[
                      styles.metricDetailDot, 
                      { backgroundColor: getMetricStatusColor(metric.status) }
                    ]} />
                    <Text style={[styles.metricDetailLabel, { color: theme.colors.textSecondary }]}>
                      {metric.label}
                    </Text>
                    <Text style={[styles.metricDetailValue, { color: theme.colors.text }]}>
                      {metric.value}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.dependenciesSection}>
                <Text style={[styles.dependenciesTitle, { color: theme.colors.textSecondary }]}>
                  Dependencies
                </Text>
                <View style={styles.dependenciesList}>
                  {component.dependencies.slice(0, 3).map((dep, index) => (
                    <View key={index} style={[styles.dependencyBadge, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                      <Text style={[styles.dependencyText, { color: theme.colors.text }]}>
                        {dep}
                      </Text>
                    </View>
                  ))}
                  {component.dependencies.length > 3 && (
                    <Text style={[styles.dependenciesMore, { color: theme.colors.textSecondary }]}>
                      +{component.dependencies.length - 3} more
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.incidentSection}>
                <AlertTriangle size={12} color={theme.colors.textSecondary} />
                <Text style={[styles.incidentText, { color: theme.colors.textSecondary }]}>
                  Last incident: {component.lastIncident}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Failure Detection Map */}
      <View style={[styles.failureSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.failureHeader}>
          <Shield size={18} color="#EF4444" />
          <Text style={[styles.failureTitle, { color: theme.colors.text }]}>
            Failure Detection Map
          </Text>
        </View>
        <View style={styles.failureGrid}>
          <View style={styles.failureCard}>
            <Text style={[styles.failureLabel, { color: theme.colors.textSecondary }]}>
              Critical Failures
            </Text>
            <Text style={[styles.failureValue, { color: '#EF4444' }]}>
              0
            </Text>
            <View style={[styles.failureTrend, { backgroundColor: '#10B981' + '20' }]}>
              <TrendingUp size={12} color="#10B981" style={{ transform: [{ rotate: '180deg' }] }} />
              <Text style={[styles.failureTrendText, { color: '#10B981' }]}>
                -100% this week
              </Text>
            </View>
          </View>
          <View style={styles.failureCard}>
            <Text style={[styles.failureLabel, { color: theme.colors.textSecondary }]}>
              Degraded Systems
            </Text>
            <Text style={[styles.failureValue, { color: '#F59E0B' }]}>
              1
            </Text>
            <View style={[styles.failureTrend, { backgroundColor: '#F59E0B' + '20' }]}>
              <Activity size={12} color="#F59E0B" />
              <Text style={[styles.failureTrendText, { color: '#F59E0B' }]}>
                Stable
              </Text>
            </View>
          </View>
          <View style={styles.failureCard}>
            <Text style={[styles.failureLabel, { color: theme.colors.textSecondary }]}>
              MTBF
            </Text>
            <Text style={[styles.failureValue, { color: '#10B981' }]}>
              482h
            </Text>
            <View style={[styles.failureTrend, { backgroundColor: '#10B981' + '20' }]}>
              <TrendingUp size={12} color="#10B981" />
              <Text style={[styles.failureTrendText, { color: '#10B981' }]}>
                +12% improvement
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  overviewSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  overviewGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewCard: {
    flex: 1,
    alignItems: 'center',
  },
  overviewLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  infrastructureSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infrastructureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infrastructureTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  infrastructureGrid: {
    gap: 8,
  },
  infrastructureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infrastructureLabel: {
    fontSize: 12,
    fontWeight: '500',
    width: 120,
  },
  infrastructureBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  infrastructureFill: {
    height: '100%',
    borderRadius: 4,
  },
  infrastructureValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  uptimeSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  uptimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  uptimeTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  uptimeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uptimeCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    padding: 12,
  },
  uptimePeriod: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  uptimeValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  uptimeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  componentsScroll: {
    gap: 16,
    paddingHorizontal: 4,
  },
  componentCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 280,
  },
  componentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  componentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  componentName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  componentMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsDetail: {
    marginBottom: 12,
  },
  metricsTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  metricDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  metricDetailDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  metricDetailLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  metricDetailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  dependenciesSection: {
    marginBottom: 12,
  },
  dependenciesTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  dependenciesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dependencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dependencyText: {
    fontSize: 10,
    fontWeight: '600',
  },
  dependenciesMore: {
    fontSize: 10,
    fontWeight: '500',
  },
  incidentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  incidentText: {
    fontSize: 11,
    fontWeight: '500',
  },
  failureSection: {
    borderRadius: 12,
    padding: 16,
  },
  failureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  failureTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  failureGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  failureCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    padding: 12,
  },
  failureLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  failureValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  failureTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  failureTrendText: {
    fontSize: 10,
    fontWeight: '600',
  },
});