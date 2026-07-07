import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Database, Cloud, Globe, Lock, Activity, Wifi, HardDrive, Router, Shield } from 'lucide-react-native';

interface InfrastructureNode {
  id: string;
  name: string;
  type: 'kubernetes' | 'database' | 'loadBalancer' | 'cdn' | 'function' | 'storage' | 'network' | 'security';
  status: 'healthy' | 'warning' | 'critical';
  provider: 'AWS' | 'GCP' | 'Azure';
  region: string;
  connections: string[];
  metrics: {
    cpu: number;
    memory: number;
    requests: number;
  };
}

interface InfrastructureTopologyMapProps {
  nodes: InfrastructureNode[];
}

export default function InfrastructureTopologyMap({ nodes }: InfrastructureTopologyMapProps) {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'kubernetes': return Server;
      case 'database': return Database;
      case 'loadBalancer': return Router;
      case 'cdn': return Globe;
      case 'function': return Activity;
      case 'storage': return HardDrive;
      case 'network': return Wifi;
      case 'security': return Shield;
      default: return Server;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'AWS': return '#FF9900';
      case 'GCP': return '#4285F4';
      case 'Azure': return '#0078D4';
      default: return '#6B7280';
    }
  };

  const infrastructureStats = [
    { label: 'Total Nodes', value: nodes.length, icon: Server, color: '#3B82F6' },
    { label: 'Healthy', value: nodes.filter(n => n.status === 'healthy').length, icon: Activity, color: '#10B981' },
    { label: 'Warnings', value: nodes.filter(n => n.status === 'warning').length, icon: Shield, color: '#F59E0B' },
    { label: 'Critical', value: nodes.filter(n => n.status === 'critical').length, icon: Lock, color: '#EF4444' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Infrastructure Topology Map
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Global Infrastructure Overview
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.statsRow}>
          {infrastructureStats.map((stat, index) => {
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

      <View style={styles.topologySection}>
        <View style={styles.topologyHeader}>
          <Text style={[styles.topologyTitle, { color: theme.colors.text }]}>
            Infrastructure Nodes
          </Text>
          <View style={styles.providerLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF9900' }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>AWS</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#4285F4' }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>GCP</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#0078D4' }]} />
              <Text style={[styles.legendText, { color: theme.colors.textSecondary }]}>Azure</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.nodesScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.nodesGrid}>
            {nodes.map((node) => {
              const Icon = getTypeIcon(node.type);
              const statusColor = getStatusColor(node.status);
              const providerColor = getProviderColor(node.provider);
              
              return (
                <View key={node.id} style={[styles.nodeCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: statusColor }]}>
                  <View style={styles.nodeHeader}>
                    <View style={[styles.nodeIcon, { backgroundColor: providerColor + '20' }]}>
                      <Icon size={24} color={providerColor} />
                    </View>
                    <View style={styles.nodeStatus}>
                      <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                    </View>
                  </View>

                  <Text style={[styles.nodeName, { color: theme.colors.text }]}>
                    {node.name}
                  </Text>
                  <Text style={[styles.nodeType, { color: theme.colors.textSecondary }]}>
                    {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                  </Text>

                  <View style={styles.nodeMeta}>
                    <View style={[styles.providerBadge, { backgroundColor: providerColor + '20' }]}>
                      <Cloud size={12} color={providerColor} />
                      <Text style={[styles.providerText, { color: providerColor }]}>
                        {node.provider}
                      </Text>
                    </View>
                    <Text style={[styles.regionText, { color: theme.colors.textSecondary }]}>
                      {node.region}
                    </Text>
                  </View>

                  <View style={styles.nodeMetrics}>
                    <View style={styles.metricItem}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>CPU</Text>
                      <View style={styles.metricBar}>
                        <View style={[styles.metricFill, { backgroundColor: node.metrics.cpu > 80 ? '#EF4444' : node.metrics.cpu > 60 ? '#F59E0B' : '#10B981', width: `${node.metrics.cpu}%` }]} />
                      </View>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{node.metrics.cpu}%</Text>
                    </View>
                    <View style={styles.metricItem}>
                      <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Memory</Text>
                      <View style={styles.metricBar}>
                        <View style={[styles.metricFill, { backgroundColor: node.metrics.memory > 80 ? '#EF4444' : node.metrics.memory > 60 ? '#F59E0B' : '#10B981', width: `${node.metrics.memory}%` }]} />
                      </View>
                      <Text style={[styles.metricValue, { color: theme.colors.text }]}>{node.metrics.memory}%</Text>
                    </View>
                  </View>

                  <View style={styles.connectionsInfo}>
                    <Text style={[styles.connectionsLabel, { color: theme.colors.textSecondary }]}>
                      {node.connections.length} connections
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.connectionsSection}>
        <Text style={[styles.connectionsTitle, { color: theme.colors.text }]}>
          Active Connections
        </Text>
        <View style={styles.connectionsFlow}>
          <View style={styles.flowItem}>
            <View style={[styles.flowDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.flowText, { color: theme.colors.textSecondary }]}>
              API Gateway → Kubernetes Clusters
            </Text>
            <Text style={[styles.flowCount, { color: theme.colors.text }]}>
              842 connections
            </Text>
          </View>
          <View style={styles.flowItem}>
            <View style={[styles.flowDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.flowText, { color: theme.colors.textSecondary }]}>
              Load Balancers → Application Servers
            </Text>
            <Text style={[styles.flowCount, { color: theme.colors.text }]}>
              1,248 connections
            </Text>
          </View>
          <View style={styles.flowItem}>
            <View style={[styles.flowDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.flowText, { color: theme.colors.textSecondary }]}>
              Applications → Databases
            </Text>
            <Text style={[styles.flowCount, { color: theme.colors.text }]}>
              428 connections
            </Text>
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
  topologySection: {
    marginBottom: 16,
  },
  topologyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  topologyTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  providerLegend: {
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
  nodesScroll: {
    maxHeight: 400,
  },
  nodesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  nodeCard: {
    width: 180,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  nodeHeader: {
    flexDirection: 'row',
    marginBottom: 8,
    position: 'relative',
  },
  nodeIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodeStatus: {
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
  nodeName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  nodeType: {
    fontSize: 11,
    marginBottom: 8,
    opacity: 0.7,
  },
  nodeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  providerText: {
    fontSize: 10,
    fontWeight: '600',
  },
  regionText: {
    fontSize: 10,
  },
  nodeMetrics: {
    marginBottom: 8,
  },
  metricItem: {
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  metricBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    marginBottom: 2,
  },
  metricFill: {
    height: '100%',
    borderRadius: 2,
  },
  metricValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  connectionsInfo: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  connectionsLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  connectionsSection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  connectionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  connectionsFlow: {
    gap: 8,
  },
  flowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  flowText: {
    flex: 1,
    fontSize: 11,
  },
  flowCount: {
    fontSize: 11,
    fontWeight: '600',
  },
});