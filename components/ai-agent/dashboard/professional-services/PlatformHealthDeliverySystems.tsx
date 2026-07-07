import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Server, Activity, Database, Clock, CheckCircle, AlertTriangle, XCircle, Zap, Shield, BarChart3, Cpu, Network } from 'lucide-react-native';

interface SystemComponent {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: number;
  latency: number;
  lastIncident: string;
}

interface IntegrationHealth {
  source: string;
  target: string;
  status: 'healthy' | 'warning' | 'error';
  dataFlow: number;
  latency: number;
}

interface PlatformHealthDeliverySystemsProps {
  systems: {
    projectManagementTools?: any;
    timeTrackingSystems?: any;
    billingSystems?: any;
    crmSystems?: any;
    knowledgeSystems?: any;
    aiAgents?: any;
  };
}

export default function PlatformHealthDeliverySystems({ systems }: PlatformHealthDeliverySystemsProps) {
  const systemsList = Object.values(systems || {}).filter(Boolean);
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return '#10B981';
      case 'degraded':
      case 'warning':
        return '#F59E0B';
      case 'down':
      case 'error':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'healthy':
        return CheckCircle;
      case 'degraded':
      case 'warning':
        return AlertTriangle;
      case 'down':
      case 'error':
        return XCircle;
      default:
        return CheckCircle;
    }
  };

  const getSystemIcon = (name: string) => {
    if (name.includes('Project')) return BarChart3;
    if (name.includes('Time')) return Clock;
    if (name.includes('Billing')) return Database;
    if (name.includes('CRM')) return Shield;
    if (name.includes('Knowledge')) return Database;
    if (name.includes('AI')) return Zap;
    return Server;
  };

  const getReliabilityColor = (score: number) => {
    if (score >= 99) return '#10B981';
    if (score >= 95) return '#06B6D4';
    if (score >= 90) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Platform Health & Delivery Systems
      </Text>

      {/* Overall Reliability Score */}
      <View style={[styles.reliabilitySection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Delivery System Reliability Index
        </Text>
        <View style={styles.reliabilityContent}>
          <View style={styles.reliabilityVisual}>
            <View style={[styles.reliabilityRing, { borderColor: getReliabilityColor(overallReliability) }]}>
              <Text style={[styles.reliabilityScore, { color: getReliabilityColor(overallReliability) }]}>
                {overallReliability.toFixed(1)}%
              </Text>
            </View>
          </View>
          <View style={styles.reliabilityDetails}>
            <View style={styles.reliabilityDetail}>
              <Text style={[styles.reliabilityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Systems Operational</Text>
              <Text style={[styles.reliabilityValue, { color: '#10B981' }]}>
                {systems.filter(s => s.status === 'operational').length}/{systems.length}
              </Text>
            </View>
            <View style={styles.reliabilityDetail}>
              <Text style={[styles.reliabilityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Data Latency</Text>
              <Text style={[styles.reliabilityValue, { color: avgDataLatency < 100 ? '#10B981' : '#F59E0B' }]}>
                {avgDataLatency}ms
              </Text>
            </View>
            <View style={styles.reliabilityDetail}>
              <Text style={[styles.reliabilityLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Integration Health</Text>
              <Text style={[styles.reliabilityValue, { color: '#06B6D4' }]}>
                {((integrations.filter(i => i.status === 'healthy').length / integrations.length) * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* System Uptime Dashboard */}
      <View style={[styles.systemsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          System Uptime Dashboard
        </Text>
        <ScrollView style={styles.systemsScroll} showsVerticalScrollIndicator={false}>
          {systems.map((system) => {
            const Icon = getSystemIcon(system.name);
            const StatusIcon = getStatusIcon(system.status);
            
            return (
              <View key={system.id} style={styles.systemCard}>
                <View style={styles.systemHeader}>
                  <View style={[styles.systemIcon, { backgroundColor: `${getStatusColor(system.status)}20` }]}>
                    <Icon size={20} color={getStatusColor(system.status)} />
                  </View>
                  <View style={styles.systemInfo}>
                    <Text style={[styles.systemName, { color: '#FFFFFF' }]}>{system.name}</Text>
                    <View style={styles.systemMeta}>
                      <StatusIcon size={12} color={getStatusColor(system.status)} />
                      <Text style={[styles.systemStatus, { color: getStatusColor(system.status) }]}>
                        {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.systemMetrics}>
                    <Text style={[styles.uptimeText, { color: '#10B981' }]}>
                      {system.uptime.toFixed(2)}%
                    </Text>
                    <Text style={[styles.latencyText, { color: 'rgba(255, 255, 255, 0.4)' }]}>
                      {system.latency}ms
                    </Text>
                  </View>
                </View>
                <View style={styles.uptimeBar}>
                  <View style={[styles.uptimeFill, { backgroundColor: getStatusColor(system.status), width: `${system.uptime}%` }]} />
                </View>
                <Text style={[styles.lastIncident, { color: 'rgba(255, 255, 255, 0.4)' }]}>
                  Last incident: {system.lastIncident}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* Integration Health Monitor */}
      <View style={[styles.integrationsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Integration Health Monitor
        </Text>
        <ScrollView style={styles.integrationsScroll} showsVerticalScrollIndicator={false}>
          {integrations.map((integration, index) => (
            <View key={index} style={styles.integrationCard}>
              <View style={styles.integrationLeft}>
                <View style={[styles.integrationDot, { backgroundColor: getStatusColor(integration.status) }]} />
                <View style={styles.integrationFlow}>
                  <Text style={[styles.integrationSource, { color: '#FFFFFF' }]}>{integration.source}</Text>
                  <Network size={12} color="rgba(255, 255, 255, 0.4)" />
                  <Text style={[styles.integrationTarget, { color: '#FFFFFF' }]}>{integration.target}</Text>
                </View>
              </View>
              <View style={styles.integrationRight}>
                <View style={[styles.integrationStatus, { backgroundColor: `${getStatusColor(integration.status)}20` }]}>
                  <Text style={[styles.integrationStatusText, { color: getStatusColor(integration.status) }]}>
                    {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                  </Text>
                </View>
                <View style={styles.integrationMetrics}>
                  <Text style={[styles.dataFlowText, { color: '#06B6D4' }]}>
                    {integration.dataFlow}/s
                  </Text>
                  <Text style={[styles.integrationLatency, { color: 'rgba(255, 255, 255, 0.4)' }]}>
                    {integration.latency}ms
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Data Latency Tracking */}
      <View style={[styles.latencySection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Data Latency Tracking
        </Text>
        <View style={styles.latencyGrid}>
          <View style={styles.latencyItem}>
            <View style={styles.latencyIcon}>
              <Cpu size={16} color="#10B981" />
            </View>
            <View style={styles.latencyInfo}>
              <Text style={[styles.latencyLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Processing</Text>
              <Text style={[styles.latencyValue, { color: '#10B981' }]}>45ms</Text>
            </View>
          </View>
          <View style={styles.latencyItem}>
            <View style={styles.latencyIcon}>
              <Database size={16} color="#06B6D4" />
            </View>
            <View style={styles.latencyInfo}>
              <Text style={[styles.latencyLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Database</Text>
              <Text style={[styles.latencyValue, { color: '#06B6D4' }]}>32ms</Text>
            </View>
          </View>
          <View style={styles.latencyItem}>
            <View style={styles.latencyIcon}>
              <Network size={16} color="#8B5CF6" />
            </View>
            <View style={styles.latencyInfo}>
              <Text style={[styles.latencyLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Network</Text>
              <Text style={[styles.latencyValue, { color: '#8B5CF6' }]}>28ms</Text>
            </View>
          </View>
          <View style={styles.latencyItem}>
            <View style={styles.latencyIcon}>
              <Activity size={16} color="#F59E0B" />
            </View>
            <View style={styles.latencyInfo}>
              <Text style={[styles.latencyLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>API Gateway</Text>
              <Text style={[styles.latencyValue, { color: '#F59E0B' }]}>18ms</Text>
            </View>
          </View>
        </View>
      </View>

      {/* AI Agent Health */}
      <View style={[styles.aiHealthSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          AI Agent Health
        </Text>
        <View style={styles.aiHealthGrid}>
          <View style={styles.aiHealthItem}>
            <View style={[styles.aiHealthDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.aiHealthLabel, { color: '#FFFFFF' }]}>Active Agents</Text>
            <Text style={[styles.aiHealthValue, { color: '#10B981' }]}>12/12</Text>
          </View>
          <View style={styles.aiHealthItem}>
            <View style={[styles.aiHealthDot, { backgroundColor: '#06B6D4' }]} />
            <Text style={[styles.aiHealthLabel, { color: '#FFFFFF' }]}>Avg Response Time</Text>
            <Text style={[styles.aiHealthValue, { color: '#06B6D4' }]}>0.8s</Text>
          </View>
          <View style={styles.aiHealthItem}>
            <View style={[styles.aiHealthDot, { backgroundColor: '#8B5CF6' }]} />
            <Text style={[styles.aiHealthLabel, { color: '#FFFFFF' }]}>Success Rate</Text>
            <Text style={[styles.aiHealthValue, { color: '#8B5CF6' }]}>98.2%</Text>
          </View>
          <View style={styles.aiHealthItem}>
            <View style={[styles.aiHealthDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={[styles.aiHealthLabel, { color: '#FFFFFF' }]}]}>Tasks Processed</Text>
            <Text style={[styles.aiHealthValue, { color: '#F59E0B' }]}>8.4K/hr</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  reliabilitySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  reliabilityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reliabilityVisual: {
    marginRight: 24,
  },
  reliabilityRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reliabilityScore: {
    fontSize: 18,
    fontWeight: '700',
  },
  reliabilityDetails: {
    flex: 1,
  },
  reliabilityDetail: {
    marginBottom: 8,
  },
  reliabilityLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  reliabilityValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  systemsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  systemsScroll: {
    maxHeight: 300,
  },
  systemCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 8,
  },
  systemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  systemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  systemInfo: {
    flex: 1,
  },
  systemName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  systemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  systemStatus: {
    fontSize: 11,
    fontWeight: '500',
  },
  systemMetrics: {
    alignItems: 'flex-end',
  },
  uptimeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  latencyText: {
    fontSize: 11,
  },
  uptimeBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    marginBottom: 4,
  },
  uptimeFill: {
    height: '100%',
    borderRadius: 2,
  },
  lastIncident: {
    fontSize: 10,
  },
  integrationsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  integrationsScroll: {
    maxHeight: 250,
  },
  integrationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 8,
  },
  integrationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  integrationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  integrationFlow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  integrationSource: {
    fontSize: 12,
    fontWeight: '500',
  },
  integrationTarget: {
    fontSize: 12,
    fontWeight: '500',
  },
  integrationRight: {
    alignItems: 'flex-end',
  },
  integrationStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  integrationStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  integrationMetrics: {
    alignItems: 'flex-end',
  },
  dataFlowText: {
    fontSize: 11,
    fontWeight: '500',
  },
  integrationLatency: {
    fontSize: 10,
  },
  latencySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  latencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  latencyItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  latencyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  latencyInfo: {
    flex: 1,
  },
  latencyLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  latencyValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  aiHealthSection: {
    padding: 16,
    borderRadius: 12,
  },
  aiHealthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  aiHealthItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  aiHealthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  aiHealthLabel: {
    fontSize: 11,
    flex: 1,
  },
  aiHealthValue: {
    fontSize: 13,
    fontWeight: '600',
  },
});