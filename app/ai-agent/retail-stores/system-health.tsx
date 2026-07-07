import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Activity, TrendingUp, ArrowUpRight, ArrowDownRight,
  BarChart3, Server, Database, Cpu, Wifi,
  AlertTriangle, CheckCircle, Clock, Zap, Shield,
  MoreHorizontal, Monitor, HardDrive, Brain, ShoppingBag, Truck, Target
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SystemHealthPage() {
  const SYSTEM_METRICS = [
    { label: 'POS Systems', value: '99.8%', icon: Monitor, color: '#10B981', trend: '+0.2%', trendUp: true },
    { label: 'Inventory Services', value: '99.4%', icon: Database, color: '#3B82F6', trend: '+0.4%', trendUp: true },
    { label: 'AI Forecasting', value: '98.6%', icon: Brain, color: '#8B5CF6', trend: '+1.2%', trendUp: true },
    { label: 'E-Commerce', value: '99.2%', icon: ShoppingBag, color: '#F59E0B', trend: '+0.6%', trendUp: true },
    { label: 'Supply Chain', value: '97.8%', icon: Truck, color: '#EC4899', trend: '+0.8%', trendUp: true },
    { label: 'Platform Uptime', value: '99.9%', icon: Server, color: '#06B6D4', trend: '+0.1%', trendUp: true },
  ];

  const AI_AGENT_HEALTH = [
    { agent: 'Agent Mercury', status: 'Active', health: 98, requests: '8.4K', accuracy: '96.2%', lastActive: 'Now', color: '#10B981' },
    { agent: 'Agent Atlas', status: 'Active', health: 97, requests: '6.2K', accuracy: '94.8%', lastActive: 'Now', color: '#3B82F6' },
    { agent: 'Agent Nova', status: 'Active', health: 99, requests: '12.8K', accuracy: '97.4%', lastActive: 'Now', color: '#8B5CF6' },
    { agent: 'Agent Pulse', status: 'Active', health: 96, requests: '4.6K', accuracy: '92.6%', lastActive: 'Now', color: '#F59E0B' },
    { agent: 'Agent Orbit', status: 'Active', health: 98, requests: '3.8K', accuracy: '95.2%', lastActive: 'Now', color: '#EC4899' },
    { agent: 'Agent Prism', status: 'Active', health: 97, requests: '5.4K', accuracy: '93.8%', lastActive: 'Now', color: '#06B6D4' },
  ];

  const INFRASTRUCTURE_STATUS = [
    { system: 'POS Network', status: 'Operational', uptime: '99.8%', load: '42%', capacity: '78%', color: '#10B981' },
    { system: 'Database Cluster', status: 'Operational', uptime: '99.9%', load: '56%', capacity: '62%', color: '#10B981' },
    { system: 'API Gateway', status: 'Operational', uptime: '99.7%', load: '68%', capacity: '72%', color: '#10B981' },
    { system: 'CDN Network', status: 'Operational', uptime: '99.9%', load: '34%', capacity: '45%', color: '#10B981' },
    { system: 'Message Queue', status: 'Degraded', uptime: '98.4%', load: '82%', capacity: '88%', color: '#F59E0B' },
    { system: 'Cache Layer', status: 'Operational', uptime: '99.8%', load: '48%', capacity: '54%', color: '#10B981' },
  ];

  const SERVICE_PERFORMANCE = [
    { service: 'Transaction Processing', latency: '45ms', success: '99.8%', volume: '2.4M', color: '#10B981' },
    { service: 'Inventory Sync', latency: '120ms', success: '99.4%', volume: '842K', color: '#3B82F6' },
    { service: 'Customer Lookup', latency: '28ms', success: '99.9%', volume: '1.8M', color: '#8B5CF6' },
    { service: 'Pricing Engine', latency: '85ms', success: '99.6%', volume: '428K', color: '#F59E0B' },
    { service: 'Recommendation API', latency: '180ms', success: '98.8%', volume: '284K', color: '#EC4899' },
  ];

  const SYSTEM_ALERTS = [
    { type: 'warning', message: 'Message Queue experiencing high load (82%)', impact: 'Medium', time: '2h ago' },
    { type: 'critical', message: 'Database replication lag detected in secondary region', impact: 'High', time: '1h ago' },
    { type: 'info', message: 'Scheduled maintenance for CDN network in 4 hours', impact: 'Low', time: '4h ago' },
    { type: 'success', message: 'AI forecasting model accuracy improved to 98.6%', impact: 'Positive', time: '6h ago' },
  ];

  const PLATFORM_CAPACITY = [
    { resource: 'CPU Usage', current: '42%', capacity: '100%', trend: 'Stable', color: '#10B981' },
    { resource: 'Memory Usage', current: '56%', capacity: '100%', trend: 'Stable', color: '#3B82F6' },
    { resource: 'Storage', current: '68%', capacity: '100%', trend: 'Increasing', color: '#F59E0B' },
    { resource: 'Network Bandwidth', current: '34%', capacity: '100%', trend: 'Stable', color: '#8B5CF6' },
  ];

  const renderSystemMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>System Health Metrics</Text>
      <View style={styles.metricsGrid}>
        {SYSTEM_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <ArrowDownRight size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAIAgentHealth = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Agent Health</Text>
      <View style={styles.agentGrid}>
        {AI_AGENT_HEALTH.map((agent) => (
          <View key={agent.agent} style={[styles.agentCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: agent.color }]}>
            <View style={styles.agentHeader}>
              <Brain size={20} color={agent.color} />
              <Text style={styles.agentName}>{agent.agent}</Text>
              <View style={[styles.agentStatus, { backgroundColor: agent.color + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: agent.color }]} />
                <Text style={[styles.agentStatusText, { color: agent.color }]}>{agent.status}</Text>
              </View>
            </View>
            <View style={styles.agentHealthBar}>
              <Text style={styles.agentHealthLabel}>Health Score</Text>
              <View style={styles.healthBar}>
                <View style={[styles.healthFill, { width: `${agent.health}%`, backgroundColor: agent.color }]} />
              </View>
              <Text style={styles.agentHealthValue}>{agent.health}%</Text>
            </View>
            <View style={styles.agentMetrics}>
              <View style={styles.agentMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.agentMetricText}>{agent.requests} requests</Text>
              </View>
              <View style={styles.agentMetric}>
                <Target size={12} color="#6B7280" />
                <Text style={styles.agentMetricText}>{agent.accuracy} accuracy</Text>
              </View>
              <View style={styles.agentMetric}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.agentMetricText}>{agent.lastActive}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderInfrastructureStatus = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Infrastructure Status</Text>
      <View style={styles.infrastructureList}>
        {INFRASTRUCTURE_STATUS.map((system) => (
          <View key={system.system} style={[styles.infraCard, { 
            backgroundColor: system.status === 'Operational' ? '#10B98110' : '#F59E0B10',
            borderLeftColor: system.status === 'Operational' ? '#10B981' : '#F59E0B',
            borderLeftWidth: 3
          }]}>
            <View style={styles.infraHeader}>
              <Server size={20} color={system.status === 'Operational' ? '#10B981' : '#F59E0B'} />
              <Text style={styles.infraName}>{system.system}</Text>
              <View style={[styles.infraStatus, { 
                backgroundColor: system.status === 'Operational' ? '#10B98120' : '#F59E0B20'
              }]}>
                <Text style={[styles.infraStatusText, { 
                  color: system.status === 'Operational' ? '#10B981' : '#F59E0B'
                }]}>{system.status}</Text>
              </View>
            </View>
            <View style={styles.infraMetrics}>
              <View style={styles.infraMetric}>
                <Text style={styles.infraMetricLabel}>Uptime</Text>
                <Text style={styles.infraMetricValue}>{system.uptime}</Text>
              </View>
              <View style={styles.infraMetric}>
                <Text style={styles.infraMetricLabel}>Load</Text>
                <Text style={[styles.infraMetricValue, { color: parseFloat(system.load) > 75 ? '#F59E0B' : '#10B981' }]}>{system.load}</Text>
              </View>
              <View style={styles.infraMetric}>
                <Text style={styles.infraMetricLabel}>Capacity</Text>
                <Text style={styles.infraMetricValue}>{system.capacity}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderServicePerformance = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Service Performance</Text>
      <View style={styles.serviceGrid}>
        {SERVICE_PERFORMANCE.map((service) => (
          <View key={service.service} style={[styles.serviceCard, { backgroundColor: service.color + '10', borderColor: service.color }]}>
            <Zap size={24} color={service.color} />
            <Text style={styles.serviceName}>{service.service}</Text>
            <View style={styles.serviceMetrics}>
              <View style={styles.serviceMetric}>
                <Clock size={12} color="#6B7280" />
                <Text style={styles.serviceMetricText}>{service.latency}</Text>
              </View>
              <View style={styles.serviceMetric}>
                <CheckCircle size={12} color="#6B7280" />
                <Text style={styles.serviceMetricText}>{service.success}</Text>
              </View>
              <View style={styles.serviceMetric}>
                <Activity size={12} color="#6B7280" />
                <Text style={styles.serviceMetricText}>{service.volume}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPlatformCapacity = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Platform Capacity</Text>
      <View style={styles.capacityList}>
        {PLATFORM_CAPACITY.map((resource) => (
          <View key={resource.resource} style={[styles.capacityCard, { backgroundColor: '#0A0F1A' }]}>
            <View style={styles.capacityHeader}>
              {resource.resource === 'CPU Usage' && <Cpu size={20} color="#8B5CF6" />}
              {resource.resource === 'Memory Usage' && <Database size={20} color="#8B5CF6" />}
              {resource.resource === 'Storage' && <HardDrive size={20} color="#8B5CF6" />}
              {resource.resource === 'Network Bandwidth' && <Wifi size={20} color="#8B5CF6" />}
              <Text style={styles.capacityName}>{resource.resource}</Text>
              <Text style={styles.capacityCurrent}>{resource.current}</Text>
            </View>
            <View style={styles.capacityBar}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { 
                  width: resource.current, 
                  backgroundColor: parseFloat(resource.current) > 75 ? '#F59E0B' : '#10B981' 
                }]} />
              </View>
              <Text style={styles.capacityCapacity}>/ {resource.capacity}</Text>
            </View>
            <View style={styles.capacityTrend}>
              <Activity size={12} color="#6B7280" />
              <Text style={[styles.capacityTrendText, { color: resource.trend === 'Stable' ? '#10B981' : '#F59E0B' }]}>{resource.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSystemAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>System Alerts</Text>
      {SYSTEM_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'critical' ? '#EF444410' : 
                       alert.type === 'warning' ? '#F59E0B10' : 
                       alert.type === 'success' ? '#10B98110' : '#3B82F610',
          borderLeftColor: alert.type === 'critical' ? '#EF4444' : 
                          alert.type === 'warning' ? '#F59E0B' : 
                          alert.type === 'success' ? '#10B981' : '#3B82F6',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'critical' && <AlertTriangle size={20} color="#EF4444" />}
            {alert.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Activity size={20} color="#3B82F6" />}
            <Text style={styles.alertMessage}>{alert.message}</Text>
          </View>
          <View style={styles.alertFooter}>
            <View style={[styles.impactBadge, { backgroundColor: alert.impact === 'High' ? '#EF444420' : alert.impact === 'Medium' ? '#F59E0B20' : '#3B82F620' }]}>
              <Text style={[styles.impactText, { color: alert.impact === 'High' ? '#EF4444' : alert.impact === 'Medium' ? '#F59E0B' : '#3B82F6' }]}>{alert.impact}</Text>
            </View>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.alertTime}>{alert.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Activity size={32} color="#8B5CF6" />
        <View>
          <Text style={styles.headerTitle}>System Health & AI Infrastructure</Text>
          <Text style={styles.headerSubtitle}>Real-time monitoring and platform performance</Text>
        </View>
      </View>

      {renderSystemMetrics()}
      {renderAIAgentHealth()}
      {renderInfrastructureStatus()}
      {renderServicePerformance()}
      {renderPlatformCapacity()}
      {renderSystemAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03050A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    gap: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: (width - 64) / 3 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  agentCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agentName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  agentHealthBar: {
    gap: 6,
  },
  agentHealthLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  healthBar: {
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  healthFill: {
    height: '100%',
  },
  agentHealthValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  agentMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  agentMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  infrastructureList: {
    gap: 12,
  },
  infraCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infraName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  infraStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  infraStatusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  infraMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  infraMetric: {
    alignItems: 'center',
  },
  infraMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  infraMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    width: (width - 64) / 2 - 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  serviceMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  serviceMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceMetricText: {
    fontSize: 11,
    color: '#6B7280',
  },
  capacityList: {
    gap: 12,
  },
  capacityCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  capacityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  capacityName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  capacityCurrent: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  capacityBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#1E293B',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  },
  capacityCapacity: {
    fontSize: 12,
    color: '#6B7280',
  },
  capacityTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  capacityTrendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertMessage: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  alertFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
  },
});
