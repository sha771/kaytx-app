import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cpu, HardDrive, Activity, Server, Wifi, CheckCircle, AlertTriangle, XCircle } from 'lucide-react-native';

interface HealthMetric {
  id: string;
  label: string;
  value: number;
  max: number;
  unit: string;
  icon: React.ElementType;
  status: 'healthy' | 'warning' | 'critical';
}

interface SystemHealthProps {
  metrics: HealthMetric[];
  modelLatency: number;
  apiHealth: 'operational' | 'degraded' | 'down';
  exchangeConnectivity: Array<{
    exchange: string;
    status: 'connected' | 'disconnected';
    latency: number;
  }>;
  dataFeedQuality: number;
}

export default function SystemHealth({ 
  metrics, 
  modelLatency, 
  apiHealth, 
  exchangeConnectivity, 
  dataFeedQuality 
}: SystemHealthProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return XCircle;
      default: return CheckCircle;
    }
  };

  const getAPIHealthColor = (status: string) => {
    switch (status) {
      case 'operational': return '#10B981';
      case 'degraded': return '#F59E0B';
      case 'down': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Activity size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            System Health
          </Text>
        </View>
      </View>

      {/* API Health Status */}
      <View style={[styles.apiHealthCard, { backgroundColor: theme.colors.background }]}>
        <View style={styles.apiHealthHeader}>
          <Server size={16} color={getAPIHealthColor(apiHealth)} />
          <Text style={[styles.apiHealthLabel, { color: theme.colors.text }]}>
            API Status
          </Text>
        </View>
        <Text style={[styles.apiHealthStatus, { color: getAPIHealthColor(apiHealth) }]}>
          {apiHealth.toUpperCase()}
        </Text>
      </View>

      {/* Infrastructure Metrics */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const StatusIcon = getHealthIcon(metric.status);
          const percentage = (metric.value / metric.max) * 100;
          
          return (
            <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.background }]}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: getStatusColor(metric.status) + '20' }]}>
                  <Icon size={16} color={getStatusColor(metric.status)} />
                </View>
                <StatusIcon size={14} color={getStatusColor(metric.status)} />
              </View>
              <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                {metric.value}{metric.unit}
              </Text>
              <View style={styles.metricBar}>
                <View 
                  style={[
                    styles.metricBarFill, 
                    { 
                      backgroundColor: getStatusColor(metric.status),
                      width: `${percentage}%`
                    }
                  ]} 
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Model Latency */}
      <View style={[styles.latencyCard, { backgroundColor: theme.colors.background }]}>
        <View style={styles.latencyHeader}>
          <Cpu size={16} color={theme.colors.primary} />
          <Text style={[styles.latencyLabel, { color: theme.colors.text }]}>
            Model Latency
          </Text>
        </View>
        <Text style={[styles.latencyValue, { color: modelLatency < 100 ? '#10B981' : modelLatency < 200 ? '#F59E0B' : '#EF4444' }]}>
          {modelLatency}ms
        </Text>
        <Text style={[styles.latencyStatus, { color: theme.colors.textSecondary }]}>
          {modelLatency < 100 ? 'Excellent' : modelLatency < 200 ? 'Good' : 'Degraded'}
        </Text>
      </View>

      {/* Exchange Connectivity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Wifi size={16} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Exchange Connectivity
          </Text>
        </View>
        <View style={styles.exchangeList}>
          {exchangeConnectivity.map((exchange, index) => (
            <View key={index} style={[styles.exchangeItem, { backgroundColor: theme.colors.background }]}>
              <View style={[
                styles.exchangeDot, 
                { backgroundColor: exchange.status === 'connected' ? '#10B981' : '#EF4444' }
              ]} />
              <Text style={[styles.exchangeName, { color: theme.colors.text }]}>
                {exchange.exchange}
              </Text>
              <Text style={[styles.exchangeLatency, { color: theme.colors.textSecondary }]}>
                {exchange.latency}ms
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Data Feed Quality */}
      <View style={[styles.dataFeedCard, { backgroundColor: theme.colors.background }]}>
        <View style={styles.dataFeedHeader}>
          <HardDrive size={16} color={theme.colors.primary} />
          <Text style={[styles.dataFeedLabel, { color: theme.colors.text }]}>
            Data Feed Quality
          </Text>
        </View>
        <View style={styles.dataFeedContent}>
          <Text style={[styles.dataFeedValue, { color: dataFeedQuality > 95 ? '#10B981' : dataFeedQuality > 80 ? '#F59E0B' : '#EF4444' }]}>
            {dataFeedQuality.toFixed(1)}%
          </Text>
          <View style={styles.dataFeedBar}>
            <View 
              style={[
                styles.dataFeedBarFill, 
                { 
                  backgroundColor: dataFeedQuality > 95 ? '#10B981' : dataFeedQuality > 80 ? '#F59E0B' : '#EF4444',
                  width: `${dataFeedQuality}%`
                }
              ]} 
            />
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
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  apiHealthCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  apiHealthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  apiHealthLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  apiHealthStatus: {
    fontSize: 18,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  metricCard: {
    width: '50%',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 6,
    marginBottom: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  metricBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  latencyCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  latencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  latencyLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  latencyValue: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  latencyStatus: {
    fontSize: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  exchangeList: {
    gap: 8,
  },
  exchangeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  exchangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  exchangeName: {
    fontSize: 13,
    fontWeight: '500',
    flex: 1,
  },
  exchangeLatency: {
    fontSize: 11,
  },
  dataFeedCard: {
    padding: 16,
    borderRadius: 12,
  },
  dataFeedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  dataFeedLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  dataFeedContent: {
    alignItems: 'center',
  },
  dataFeedValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  dataFeedBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dataFeedBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});
