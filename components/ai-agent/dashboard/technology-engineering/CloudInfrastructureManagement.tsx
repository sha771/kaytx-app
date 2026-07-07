import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Cloud, Server, HardDrive, Database, Wifi, Cpu, Globe, Scale } from 'lucide-react-native';

interface CloudResource {
  id: string;
  name: string;
  type: string;
  provider: string;
  status: string;
  usage: number;
  cost: string;
}

interface CloudInfrastructureManagementProps {
  metrics: {
    cloudResources: number;
    computeUsage: string;
    storageUsage: string;
    networkTraffic: string;
    kubernetesClusters: number;
    containerHealth: string;
  };
  resources: CloudResource[];
}

export default function CloudInfrastructureManagement({ metrics, resources }: CloudInfrastructureManagementProps) {
  const { theme } = useTheme();

  const infraCards = [
    {
      label: 'Cloud Resources',
      value: metrics.cloudResources.toString(),
      icon: Cloud,
      color: '#3B82F6',
      subtitle: 'Total resources'
    },
    {
      label: 'Compute Usage',
      value: metrics.computeUsage,
      icon: Cpu,
      color: '#8B5CF6',
      subtitle: 'CPU utilization'
    },
    {
      label: 'Storage Usage',
      value: metrics.storageUsage,
      icon: HardDrive,
      color: '#F59E0B',
      subtitle: 'Disk space'
    },
    {
      label: 'Network Traffic',
      value: metrics.networkTraffic,
      icon: Wifi,
      color: '#06B6D4',
      subtitle: 'Bandwidth'
    },
    {
      label: 'K8s Clusters',
      value: metrics.kubernetesClusters.toString(),
      icon: Server,
      color: '#10B981',
      subtitle: 'Active clusters'
    },
    {
      label: 'Container Health',
      value: metrics.containerHealth,
      icon: Database,
      color: '#EF4444',
      subtitle: 'Running containers'
    }
  ];

  const getProviderColor = (provider: string) => {
    switch (provider.toLowerCase()) {
      case 'aws':
        return '#FF9900';
      case 'gcp':
        return '#4285F4';
      case 'azure':
        return '#0078D4';
      default:
        return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
        return '#10B981';
      case 'stopped':
        return '#EF4444';
      case 'pending':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Cloud & Infrastructure Management
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          Multi-Cloud Resource Overview
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRow}>
          {infraCards.map((card, index) => {
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

      <View style={styles.resourcesSection}>
        <View style={styles.resourcesHeader}>
          <Text style={[styles.resourcesTitle, { color: theme.colors.text }]}>
            Cloud Resources
          </Text>
          <Text style={[styles.resourcesCount, { color: theme.colors.textSecondary }]}>
            {resources.length} resources
          </Text>
        </View>

        {resources.map((resource) => (
          <View key={resource.id} style={[styles.resourceCard, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
            <View style={styles.resourceHeader}>
              <View style={styles.resourceInfo}>
                <View style={[styles.providerBadge, { backgroundColor: getProviderColor(resource.provider) + '20' }]}>
                  <Cloud size={16} color={getProviderColor(resource.provider)} />
                  <Text style={[styles.providerText, { color: getProviderColor(resource.provider) }]}>
                    {resource.provider}
                  </Text>
                </View>
                <View style={styles.resourceDetails}>
                  <Text style={[styles.resourceName, { color: theme.colors.text }]}>
                    {resource.name}
                  </Text>
                  <Text style={[styles.resourceType, { color: theme.colors.textSecondary }]}>
                    {resource.type}
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(resource.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(resource.status) }]}>
                  {resource.status}
                </Text>
              </View>
            </View>

            <View style={styles.resourceMetrics}>
              <View style={styles.metricRow}>
                <View style={styles.metricItem}>
                  <Scale size={14} color="#8B5CF6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Usage
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {resource.usage}%
                  </Text>
                </View>
                <View style={[styles.usageBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View 
                    style={[styles.usageFill, { 
                      backgroundColor: resource.usage > 80 ? '#EF4444' : resource.usage > 50 ? '#F59E0B' : '#10B981',
                      width: `${resource.usage}%` 
                    }]} 
                  />
                </View>
              </View>
              
              <View style={styles.costRow}>
                <Text style={[styles.costLabel, { color: theme.colors.textSecondary }]}>
                  Monthly Cost
                </Text>
                <Text style={[styles.costValue, { color: theme.colors.text }]}>
                  {resource.cost}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.topologySection}>
        <Text style={[styles.topologyTitle, { color: theme.colors.text }]}>
          Infrastructure Overview
        </Text>
        
        <View style={styles.topologyGrid}>
          <View style={[styles.topologyCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
            <Globe size={24} color="#3B82F6" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              Global Network
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              12 Regions
            </Text>
          </View>

          <View style={[styles.topologyCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <Server size={24} color="#10B981" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              Kubernetes
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              {metrics.kubernetesClusters} Clusters
            </Text>
          </View>

          <View style={[styles.topologyCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' }]}>
            <Database size={24} color="#8B5CF6" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              Databases
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              24 Instances
            </Text>
          </View>

          <View style={[styles.topologyCard, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' }]}>
            <Wifi size={24} color="#06B6D4" />
            <Text style={[styles.topologyLabel, { color: theme.colors.text }]}>
              CDN
            </Text>
            <Text style={[styles.topologyValue, { color: theme.colors.textSecondary }]}>
              8 Edge Locations
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
  resourcesSection: {
    marginBottom: 20,
  },
  resourcesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourcesTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  resourcesCount: {
    fontSize: 12,
    opacity: 0.7,
  },
  resourceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  providerText: {
    fontSize: 11,
    fontWeight: '600',
  },
  resourceDetails: {
    flex: 1,
  },
  resourceName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  resourceType: {
    fontSize: 11,
    opacity: 0.7,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  resourceMetrics: {
    marginTop: 8,
  },
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 80,
  },
  metricLabel: {
    fontSize: 10,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  usageBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  usageFill: {
    height: '100%',
    borderRadius: 3,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  costLabel: {
    fontSize: 11,
    opacity: 0.7,
  },
  costValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  topologySection: {
    marginTop: 8,
  },
  topologyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  topologyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  topologyCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  topologyLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  topologyValue: {
    fontSize: 11,
    opacity: 0.7,
  }
});