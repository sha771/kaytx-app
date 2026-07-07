import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Database, Activity, CheckCircle, AlertTriangle, Clock, Cpu, HardDrive, Globe, Zap } from 'lucide-react-native';

interface SystemComponent {
  id: string;
  name: string;
  type: 'erp' | 'scm' | 'wms' | 'tms' | 'supplier_api' | 'iot' | 'ai_agent';
  status: 'operational' | 'degraded' | 'down' | 'maintenance';
  uptime: string;
  latency: string;
  dataLatency: string;
  integrationHealth: number;
  signalReliability: number;
}

export default function SystemHealthDataNetwork() {
  const { theme } = useTheme();

  const systemComponents: SystemComponent[] = [
    {
      id: '1',
      name: 'ERP System',
      type: 'erp',
      status: 'operational',
      uptime: '99.98%',
      latency: '45ms',
      dataLatency: '12ms',
      integrationHealth: 98,
      signalReliability: 99
    },
    {
      id: '2',
      name: 'SCM Platform',
      type: 'scm',
      status: 'operational',
      uptime: '99.95%',
      latency: '52ms',
      dataLatency: '18ms',
      integrationHealth: 96,
      signalReliability: 98
    },
    {
      id: '3',
      name: 'WMS System',
      type: 'wms',
      status: 'operational',
      uptime: '99.92%',
      latency: '38ms',
      dataLatency: '15ms',
      integrationHealth: 97,
      signalReliability: 97
    },
    {
      id: '4',
      name: 'TMS System',
      type: 'tms',
      status: 'degraded',
      uptime: '99.85%',
      latency: '124ms',
      dataLatency: '42ms',
      integrationHealth: 89,
      signalReliability: 92
    },
    {
      id: '5',
      name: 'Supplier APIs',
      type: 'supplier_api',
      status: 'operational',
      uptime: '99.88%',
      latency: '68ms',
      dataLatency: '24ms',
      integrationHealth: 94,
      signalReliability: 95
    },
    {
      id: '6',
      name: 'IoT Sensors',
      type: 'iot',
      status: 'operational',
      uptime: '99.94%',
      latency: '28ms',
      dataLatency: '8ms',
      integrationHealth: 96,
      signalReliability: 98
    },
    {
      id: '7',
      name: 'AI Agents',
      type: 'ai_agent',
      status: 'operational',
      uptime: '99.99%',
      latency: '15ms',
      dataLatency: '5ms',
      integrationHealth: 99,
      signalReliability: 99
    },
  ];

  const networkMetrics = [
    { label: 'Total Systems', value: '7', color: '#3B82F6' },
    { label: 'Operational', value: '6', color: '#10B981' },
    { label: 'Degraded', value: '1', color: '#F59E0B' },
    { label: 'Avg Uptime', value: '99.93%', color: '#06B6D4' },
    { label: 'Avg Latency', value: '52ms', color: '#8B5CF6' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'erp': return <Database size={16} color="#3B82F6" />;
      case 'scm': return <Server size={16} color="#10B981" />;
      case 'wms': return <HardDrive size={16} color="#06B6D4" />;
      case 'tms': return <Truck size={16} color="#8B5CF6" />;
      case 'supplier_api': return <Globe size={16} color="#F59E0B" />;
      case 'iot': return <Zap size={16} color="#EC4899" />;
      case 'ai_agent': return <Cpu size={16} color="#EF4444" />;
      default: return <Server size={16} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#10B981';
      case 'degraded': return '#F59E0B';
      case 'down': return '#EF4444';
      case 'maintenance': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusBackground = (status: string) => {
    const color = getStatusColor(status);
    return color + '15';
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return '#10B981';
    if (health >= 90) return '#3B82F6';
    if (health >= 85) return '#06B6D4';
    return '#F59E0B';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle size={12} color="#10B981" />;
      case 'degraded': return <AlertTriangle size={12} color="#F59E0B" />;
      case 'down': return <AlertTriangle size={12} color="#EF4444" />;
      case 'maintenance': return <Clock size={12} color="#6B7280" />;
      default: return <Activity size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Server size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          System Health & Data Network
        </Text>
      </View>

      {/* Network Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {networkMetrics.map((metric, index) => (
          <View 
            key={index}
            style={[styles.metricCard, { backgroundColor: `${metric.color}15`, borderColor: `${metric.color}30` }]}
          >
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* System Components */}
      <View style={styles.componentsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          System Components Status
        </Text>
        <View style={styles.componentsList}>
          {systemComponents.map((component) => (
            <View 
              key={component.id}
              style={[
                styles.componentCard, 
                { 
                  backgroundColor: getStatusBackground(component.status),
                  borderColor: `${getStatusColor(component.status)}30`,
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.componentHeader}>
                <View style={styles.componentIconContainer}>
                  {getTypeIcon(component.type)}
                </View>
                <View style={styles.componentInfo}>
                  <Text style={[styles.componentName, { color: theme.colors.text }]}>
                    {component.name}
                  </Text>
                  <View style={styles.componentMeta}>
                    <View style={[
                      styles.statusBadge, 
                      { backgroundColor: getStatusColor(component.status) + '20' }
                    ]}>
                      {getStatusIcon(component.status)}
                      <Text style={[
                        styles.statusText, 
                        { color: getStatusColor(component.status) }
                      ]}>
                        {component.status.toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.uptimeContainer}>
                      <Activity size={10} color="#6B7280" />
                      <Text style={[styles.uptimeText, { color: theme.colors.textSecondary }]}>
                        {component.uptime}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.componentMetrics}>
                <View style={styles.metricRow}>
                  <View style={styles.metricItem}>
                    <Clock size={12} color="#8B5CF6" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Latency
                    </Text>
                    <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                      {component.latency}
                    </Text>
                  </View>

                  <View style={styles.metricItem}>
                    <Database size={12} color="#06B6D4" />
                    <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                      Data Latency
                    </Text>
                    <Text style={[styles.metricValue, { color: '#06B6D4' }]}>
                      {component.dataLatency}
                    </Text>
                  </View>
                </View>

                <View style={styles.healthBars}>
                  <View style={styles.healthBarContainer}>
                    <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
                      Integration Health
                    </Text>
                    <View style={styles.healthBar}>
                      <View 
                        style={[
                          styles.healthFill, 
                          { 
                            backgroundColor: getHealthColor(component.integrationHealth),
                            width: `${component.integrationHealth}%`
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[
                      styles.healthValue, 
                      { color: getHealthColor(component.integrationHealth) }
                    ]}>
                      {component.integrationHealth}%
                    </Text>
                  </View>

                  <View style={styles.healthBarContainer}>
                    <Text style={[styles.healthLabel, { color: theme.colors.textSecondary }]}>
                      Signal Reliability
                    </Text>
                    <View style={styles.healthBar}>
                      <View 
                        style={[
                          styles.healthFill, 
                          { 
                            backgroundColor: getHealthColor(component.signalReliability),
                            width: `${component.signalReliability}%`
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[
                      styles.healthValue, 
                      { color: getHealthColor(component.signalReliability) }
                    ]}>
                      {component.signalReliability}%
                    </Text>
                  </View>
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
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  componentsSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  componentsList: {
    gap: 8,
  },
  componentCard: {
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  componentIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  componentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  uptimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  uptimeText: {
    fontSize: 10,
  },
  componentMetrics: {
    gap: 12,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  healthBars: {
    gap: 8,
  },
  healthBarContainer: {
    gap: 4,
  },
  healthLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  healthBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
    borderRadius: 2,
  },
  healthValue: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'right',
  },
});