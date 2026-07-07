import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Wifi, Activity, Cpu, CheckCircle, AlertTriangle, XCircle, Zap, Globe } from 'lucide-react-native';
import { SystemHealthConfig } from '../types';

interface SystemHealthFintechInfrastructureProps {
  config: SystemHealthConfig;
}

export default function SystemHealthFintechInfrastructure({ config }: SystemHealthFintechInfrastructureProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: 'healthy' | 'warning' | 'critical') => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return XCircle;
      default: return CheckCircle;
    }
  };

  const getIcon = (label: string) => {
    if (label.includes('API') || label.includes('Latency')) return Server;
    if (label.includes('Banking') || label.includes('Systems')) return Server;
    if (label.includes('Payment') || label.includes('Gateway')) return Wifi;
    if (label.includes('Data') || label.includes('Feed')) return Activity;
    if (label.includes('AI') || label.includes('Engine') || label.includes('Load')) return Cpu;
    if (label.includes('Exchange') || label.includes('Connectivity')) return Globe;
    return Activity;
  };

  const getApiHealthColor = (health: string) => {
    if (health === 'operational') return '#10B981';
    if (health === 'degraded') return '#F59E0B';
    return '#EF4444';
  };

  const getConnectionStatusColor = (status: string) => {
    return status === 'connected' ? '#10B981' : '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: '#05070A' }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.infraBadge, { backgroundColor: '#06B6D420' }]}>
            <Zap size={16} color="#06B6D4" />
            <Text style={styles.infraBadgeText}>INFRASTRUCTURE</Text>
          </View>
          <Text style={[styles.title, { color: '#FFFFFF' }]}>
            System Health
          </Text>
        </View>
        <View style={[styles.statusIndicator, { backgroundColor: '#10B98120', borderColor: '#10B981' }]}>
          <CheckCircle size={14} color="#10B981" />
          <Text style={styles.statusText}>OPERATIONAL</Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Infrastructure Metrics</Text>
        {config.metrics.map((metric) => {
          const Icon = getIcon(metric.label);
          const StatusIcon = getStatusIcon(metric.status);
          const percentage = (metric.value / metric.max) * 100;
          return (
            <View key={metric.id} style={[styles.metricItem, { backgroundColor: '#0A0F14' }]}>
              <View style={[styles.metricIcon, { backgroundColor: getStatusColor(metric.status) + '20', borderColor: getStatusColor(metric.status) }]}>
                <Icon size={16} color={getStatusColor(metric.status)} />
              </View>
              <View style={styles.metricContent}>
                <Text style={[styles.metricLabel, { color: '#FFFFFF' }]}>{metric.label}</Text>
                <View style={styles.metricBar}>
                  <View style={[styles.metricFill, { width: `${percentage}%`, backgroundColor: getStatusColor(metric.status) }]} />
                </View>
              </View>
              <View style={styles.metricValueContainer}>
                <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>{metric.value}{metric.unit}</Text>
                <StatusIcon size={12} color={getStatusColor(metric.status)} />
              </View>
            </View>
          );
        })}
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>AI Model Performance</Text>
        <View style={styles.modelContainer}>
          <View style={[styles.modelItem, { backgroundColor: '#0A0F14' }]}>
            <Text style={[styles.modelLabel, { color: '#9CA3AF' }]}>Model Latency</Text>
            <Text style={[styles.modelValue, { color: '#FFFFFF' }]}>{config.modelLatency}ms</Text>
          </View>
          <View style={[styles.modelItem, { backgroundColor: '#0A0F14' }]}>
            <Text style={[styles.modelLabel, { color: '#9CA3AF' }]}>API Health</Text>
            <View style={[styles.apiBadge, { backgroundColor: getApiHealthColor(config.apiHealth) + '20', borderColor: getApiHealthColor(config.apiHealth) }]}>
              <Text style={[styles.apiText, { color: getApiHealthColor(config.apiHealth) }]}>{config.apiHealth.toUpperCase()}</Text>
            </View>
          </View>
          <View style={[styles.modelItem, { backgroundColor: '#0A0F14' }]}>
            <Text style={[styles.modelLabel, { color: '#9CA3AF' }]}>Data Feed Quality</Text>
            <Text style={[styles.modelValue, { color: '#FFFFFF' }]}>{config.dataFeedQuality}%</Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: '#0A0F14', borderColor: '#1F2937' }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Exchange Connectivity</Text>
        {config.exchangeConnectivity.map((exchange, index) => (
          <View key={index} style={[styles.exchangeItem, { backgroundColor: '#0A0F14' }]}>
            <Globe size={14} color={getConnectionStatusColor(exchange.status)} />
            <Text style={[styles.exchangeName, { color: '#FFFFFF' }]}>{exchange.exchange}</Text>
            <View style={[styles.statusDot, { backgroundColor: getConnectionStatusColor(exchange.status) }]} />
            <Text style={[styles.exchangeStatus, { color: getConnectionStatusColor(exchange.status) }]}>
              {exchange.status}
            </Text>
            <Text style={[styles.exchangeLatency, { color: '#9CA3AF' }]}>
              {exchange.status === 'connected' ? `${exchange.latency}ms` : 'N/A'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infraBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 6,
  },
  infraBadgeText: {
    color: '#06B6D4',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    gap: 6,
  },
  statusText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#1F2937',
    borderRadius: 3,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: 3,
  },
  metricValueContainer: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  modelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modelItem: {
    alignItems: 'center',
  },
  modelLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  modelValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  apiBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  apiText: {
    fontSize: 12,
    fontWeight: '700',
  },
  exchangeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  exchangeName: {
    width: 80,
    fontSize: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  exchangeStatus: {
    width: 60,
    fontSize: 11,
    fontWeight: '600',
  },
  exchangeLatency: {
    flex: 1,
    fontSize: 11,
    textAlign: 'right',
  },
});
