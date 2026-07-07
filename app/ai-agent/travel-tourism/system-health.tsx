import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { 
  Activity, Server, Database, Shield, Zap, CheckCircle, 
  AlertTriangle, Clock, TrendingUp, ArrowUpRight, Globe, Cpu
} from 'lucide-react-native';
import { TRAVEL_COLORS } from '@/constants/travelTourism';

const { width } = Dimensions.get('window');

export default function SystemHealth() {
  const INFRASTRUCTURE_METRICS = [
    { label: 'System Uptime', value: '99.9%', icon: Server, color: TRAVEL_COLORS.emeraldGreen, trend: '+0.1%', trendUp: true },
    { label: 'API Response', value: '124ms', icon: Zap, color: TRAVEL_COLORS.neonCyan, trend: '-12ms', trendUp: true },
    { label: 'Booking Engine', value: '98.6%', icon: Activity, color: TRAVEL_COLORS.oceanBlue, trend: '+1.4%', trendUp: true },
    { label: 'Airline APIs', value: '99.2%', icon: Globe, color: TRAVEL_COLORS.amber, trend: '+0.8%', trendUp: true },
    { label: 'Hotel Connectivity', value: '97.8%', icon: Database, color: TRAVEL_COLORS.purple, trend: '+2.2%', trendUp: true },
    { label: 'Payment Systems', value: '99.4%', icon: Shield, color: TRAVEL_COLORS.magenta, trend: '+0.6%', trendUp: true },
  ];

  const AI_AGENT_HEALTH = [
    { agent: 'Voyager (Trip Planning)', status: 'Optimal', accuracy: '94.8%', tasks: '2.4M', color: TRAVEL_COLORS.emeraldGreen },
    { agent: 'Horizon (Booking Operations)', status: 'Optimal', accuracy: '96.2%', tasks: '8.4M', color: TRAVEL_COLORS.emeraldGreen },
    { agent: 'Atlas (Destination Intelligence)', status: 'Optimal', accuracy: '94.2%', tasks: '1.8M', color: TRAVEL_COLORS.emeraldGreen },
    { agent: 'Orbit (Transportation)', status: 'Optimal', accuracy: '95.6%', tasks: '3.2M', color: TRAVEL_COLORS.emeraldGreen },
    { agent: 'Aurora (Hospitality)', status: 'Optimal', accuracy: '93.8%', tasks: '4.2M', color: TRAVEL_COLORS.emeraldGreen },
    { agent: 'Compass (Revenue Optimization)', status: 'Optimal', accuracy: '97.4%', tasks: '1.2M', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const PLATFORM_CAPACITY = [
    { resource: 'CPU Usage', value: '68%', capacity: '80%', trend: '+4%', color: TRAVEL_COLORS.amber },
    { resource: 'Memory Usage', value: '72%', capacity: '85%', trend: '+6%', color: TRAVEL_COLORS.amber },
    { resource: 'Storage Used', value: '2.4TB', capacity: '10TB', trend: '+12%', color: TRAVEL_COLORS.oceanBlue },
    { resource: 'Network Bandwidth', value: '840Mbps', capacity: '10Gbps', trend: '+8%', color: TRAVEL_COLORS.emeraldGreen },
  ];

  const SYSTEM_ALERTS = [
    { type: 'warning', message: 'Memory usage approaching 75% threshold - consider scaling', impact: 'Medium', time: '1h ago' },
    { type: 'success', message: 'All AI agents operating at optimal performance levels', impact: 'Positive', time: '2h ago' },
    { type: 'info', message: 'Scheduled maintenance completed for airline API gateways', impact: 'Low', time: '4h ago' },
    { type: 'success', message: 'System uptime exceeded 99.9% SLA target', impact: 'Positive', time: '6h ago' },
  ];

  const renderMetrics = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Infrastructure Metrics</Text>
      <View style={styles.metricsGrid}>
        {INFRASTRUCTURE_METRICS.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: metric.color + '10', borderColor: metric.color }]}>
            <metric.icon size={24} color={metric.color} />
            <Text style={styles.metricValue}>{metric.value}</Text>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <View style={styles.metricTrend}>
              {metric.trendUp ? <ArrowUpRight size={12} color="#10B981" /> : <Activity size={12} color="#EF4444" />}
              <Text style={[styles.metricTrendText, { color: metric.trendUp ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAIAgentHealth = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Agent Health Scores</Text>
      <View style={styles.agentsList}>
        {AI_AGENT_HEALTH.map((agent) => (
          <View key={agent.agent} style={[styles.agentCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: agent.color }]}>
            <View style={styles.agentHeader}>
              <Cpu size={20} color={agent.color} />
              <Text style={styles.agentName}>{agent.agent}</Text>
              <View style={[styles.statusBadge, { backgroundColor: agent.color + '20' }]}>
                <Text style={[styles.statusText, { color: agent.color }]}>{agent.status}</Text>
              </View>
            </View>
            <View style={styles.agentMetrics}>
              <View style={styles.agentMetric}>
                <Text style={styles.agentMetricLabel}>Accuracy</Text>
                <Text style={styles.agentMetricValue}>{agent.accuracy}</Text>
              </View>
              <View style={styles.agentMetric}>
                <Text style={styles.agentMetricLabel}>Tasks</Text>
                <Text style={styles.agentMetricValue}>{agent.tasks}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPlatformCapacity = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Platform Capacity Tracking</Text>
      <View style={styles.capacityList}>
        {PLATFORM_CAPACITY.map((capacity) => (
          <View key={capacity.resource} style={[styles.capacityCard, { backgroundColor: '#0A0F1A', borderLeftWidth: 3, borderLeftColor: capacity.color }]}>
            <View style={styles.capacityHeader}>
              <Server size={20} color={capacity.color} />
              <Text style={styles.capacityResource}>{capacity.resource}</Text>
              <Text style={styles.capacityValue}>{capacity.value}</Text>
            </View>
            <View style={styles.capacityDetails}>
              <View style={styles.capacityDetail}>
                <Text style={styles.capacityDetailLabel}>Capacity</Text>
                <Text style={styles.capacityDetailValue}>{capacity.capacity}</Text>
              </View>
              <View style={styles.capacityDetail}>
                <Text style={styles.capacityDetailLabel}>Trend</Text>
                <Text style={[styles.capacityDetailValue, { color: '#10B981' }]}>{capacity.trend}</Text>
              </View>
            </View>
            <View style={styles.capacityBar}>
              <View style={[styles.capacityBarFill, { width: capacity.value, backgroundColor: capacity.color }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAlerts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>System Alerts</Text>
      {SYSTEM_ALERTS.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { 
          backgroundColor: alert.type === 'warning' ? '#F59E0B10' : 
                       alert.type === 'success' ? '#10B98110' : 
                       alert.type === 'info' ? '#3B82F610' : '#EF444410',
          borderLeftColor: alert.type === 'warning' ? '#F59E0B' : 
                          alert.type === 'success' ? '#10B981' : 
                          alert.type === 'info' ? '#3B82F6' : '#EF4444',
          borderLeftWidth: 3
        }]}>
          <View style={styles.alertHeader}>
            {alert.type === 'warning' && <AlertTriangle size={20} color="#F59E0B" />}
            {alert.type === 'success' && <CheckCircle size={20} color="#10B981" />}
            {alert.type === 'info' && <Activity size={20} color="#3B82F6" />}
            {alert.type === 'critical' && <AlertTriangle size={20} color="#EF4444" />}
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
        <Server size={32} color={TRAVEL_COLORS.neonCyan} />
        <View>
          <Text style={styles.headerTitle}>System Health & AI Infrastructure</Text>
          <Text style={styles.headerSubtitle}>Platform monitoring and AI agent performance</Text>
        </View>
      </View>

      {renderMetrics()}
      {renderAIAgentHealth()}
      {renderPlatformCapacity()}
      {renderAlerts()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TRAVEL_COLORS.deepSpaceBlack,
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
  agentsList: {
    gap: 12,
  },
  agentCard: {
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
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
  capacityResource: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  capacityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  capacityDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  capacityDetail: {
    alignItems: 'center',
  },
  capacityDetailLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  capacityDetailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  capacityBar: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  capacityBarFill: {
    height: '100%',
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
