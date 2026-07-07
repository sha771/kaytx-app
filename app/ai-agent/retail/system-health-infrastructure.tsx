/**
 * =============================================================================
 * SYSTEM HEALTH & AI INFRASTRUCTURE
 * =============================================================================
 *
 * A comprehensive infrastructure monitoring dashboard that tracks POS systems,
 * inventory services, AI forecasting models, e-commerce platforms, and supply
 * chain systems across the retail technology stack.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  Server,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Target,
  Activity,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Cpu,
  HardDrive,
  Database,
  Wifi,
  Shield,
  Brain,
  ShoppingCart,
  Truck,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// System Services
const SYSTEM_SERVICES = [
  { id: 1, name: 'POS Systems', status: 'operational', uptime: '99.98%', latency: '12ms', lastIncident: '45 days ago' },
  { id: 2, name: 'Inventory Services', status: 'operational', uptime: '99.95%', latency: '18ms', lastIncident: '12 days ago' },
  { id: 3, name: 'AI Forecasting Models', status: 'operational', uptime: '99.92%', latency: '245ms', lastIncident: '3 days ago' },
  { id: 4, name: 'E-Commerce Platform', status: 'operational', uptime: '99.97%', latency: '45ms', lastIncident: '28 days ago' },
  { id: 5, name: 'Supply Chain Systems', status: 'degraded', uptime: '98.45%', latency: '89ms', lastIncident: '2 hours ago' },
  { id: 6, name: 'Payment Gateway', status: 'operational', uptime: '99.99%', latency: '8ms', lastIncident: '67 days ago' },
];

// Infrastructure Metrics
const INFRASTRUCTURE_METRICS = {
  totalServers: '2,847',
  avgCpuUsage: 42,
  avgMemoryUsage: 68,
  totalStorage: '847TB',
  networkBandwidth: '124Gbps',
  activeConnections: '8.4M',
};

// AI Agent Health
const AI_AGENT_HEALTH = [
  { agent: 'Agent Mercury', status: 'healthy', accuracy: 94, uptime: '99.8%', tasksProcessed: '1.2M' },
  { agent: 'Agent Atlas', status: 'healthy', accuracy: 94, uptime: '99.7%', tasksProcessed: '847K' },
  { agent: 'Agent Nova', status: 'healthy', accuracy: 89, uptime: '99.5%', tasksProcessed: '2.4M' },
  { agent: 'Agent Pulse', status: 'healthy', accuracy: 92, uptime: '99.6%', tasksProcessed: '1.8M' },
  { agent: 'Agent Orbit', status: 'degraded', accuracy: 87, uptime: '98.2%', tasksProcessed: '567K' },
  { agent: 'Agent Prism', status: 'healthy', accuracy: 91, uptime: '99.4%', tasksProcessed: '1.5M' },
];

// Capacity Planning
const CAPACITY_PLANNING = [
  { resource: 'Compute', current: 68, capacity: 100, projected: 85, timeline: '6 months' },
  { resource: 'Storage', current: 72, capacity: 100, projected: 88, timeline: '4 months' },
  { resource: 'Network', current: 54, capacity: 100, projected: 72, timeline: '8 months' },
  { resource: 'Database', current: 62, capacity: 100, projected: 78, timeline: '5 months' },
];

export default function SystemHealthInfrastructure() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderServiceCard = (service: typeof SYSTEM_SERVICES[0]) => {
    const statusColors = {
      operational: THEME.emeraldGreen,
      degraded: THEME.amber,
      outage: THEME.red,
    };
    const color = statusColors[service.status as keyof typeof statusColors];

    return (
      <BlurView key={service.id} intensity={20} tint="dark" style={styles.serviceCard}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <View style={[styles.serviceStatus, { backgroundColor: color + '20' }]}>
            <CheckCircle size={12} color={color} />
            <Text style={[styles.serviceStatusText, { color }]}>{service.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.serviceMetrics}>
          <View style={styles.serviceMetric}>
            <Text style={styles.serviceMetricLabel}>Uptime</Text>
            <Text style={[styles.serviceMetricValue, { color: THEME.emeraldGreen }]}>{service.uptime}</Text>
          </View>
          <View style={styles.serviceMetric}>
            <Text style={styles.serviceMetricLabel}>Latency</Text>
            <Text style={[styles.serviceMetricValue, { color: THEME.neonCyan }]}>{service.latency}</Text>
          </View>
        </View>
        <View style={styles.serviceFooter}>
          <Clock size={12} color={THEME.textMuted} />
          <Text style={styles.serviceLastIncident}>Last incident: {service.lastIncident}</Text>
        </View>
      </BlurView>
    );
  };

  const renderAgentCard = (agent: typeof AI_AGENT_HEALTH[0]) => {
    const statusColors = {
      healthy: THEME.emeraldGreen,
      degraded: THEME.amber,
      critical: THEME.red,
    };
    const color = statusColors[agent.status as keyof typeof statusColors];

    return (
      <BlurView key={agent.agent} intensity={20} tint="dark" style={styles.agentCard}>
        <View style={styles.agentHeader}>
          <Brain size={16} color={THEME.purple} />
          <Text style={styles.agentName}>{agent.agent}</Text>
          <View style={[styles.agentStatus, { backgroundColor: color + '20' }]}>
            <Text style={[styles.agentStatusText, { color }]}>{agent.status.toUpperCase()}</Text>
          </View>
        </View>
        <View style={styles.agentMetrics}>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Accuracy</Text>
            <Text style={[styles.agentMetricValue, { color: THEME.neonCyan }]}>{agent.accuracy}%</Text>
          </View>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Uptime</Text>
            <Text style={[styles.agentMetricValue, { color: THEME.emeraldGreen }]}>{agent.uptime}</Text>
          </View>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Tasks</Text>
            <Text style={[styles.agentMetricValue, { color: THEME.electricBlue }]}>{agent.tasksProcessed}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderCapacityCard = (capacity: typeof CAPACITY_PLANNING[0]) => {
    const utilizationColor = capacity.current > 80 ? THEME.red : capacity.current > 60 ? THEME.amber : THEME.emeraldGreen;

    return (
      <BlurView key={capacity.resource} intensity={20} tint="dark" style={styles.capacityCard}>
        <Text style={styles.capacityResource}>{capacity.resource}</Text>
        <View style={styles.capacityBar}>
          <View style={[styles.capacityFill, { width: `${capacity.current}%`, backgroundColor: utilizationColor }]} />
        </View>
        <View style={styles.capacityMetrics}>
          <View style={styles.capacityMetric}>
            <Text style={styles.capacityMetricLabel}>Current</Text>
            <Text style={[styles.capacityMetricValue, { color: utilizationColor }]}>{capacity.current}%</Text>
          </View>
          <View style={styles.capacityMetric}>
            <Text style={styles.capacityMetricLabel}>Projected</Text>
            <Text style={[styles.capacityMetricValue, { color: THEME.textMuted }]}>{capacity.projected}%</Text>
          </View>
        </View>
        <Text style={styles.capacityTimeline}>Timeline: {capacity.timeline}</Text>
      </BlurView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Server size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>System Health & Infrastructure</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Infrastructure Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Infrastructure Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.metricsCard}>
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Server size={20} color={THEME.neonCyan} />
                <Text style={styles.metricLabel}>Total Servers</Text>
                <Text style={[styles.metricValue, { color: THEME.neonCyan }]}>{INFRASTRUCTURE_METRICS.totalServers}</Text>
              </View>
              <View style={styles.metricItem}>
                <Cpu size={20} color={THEME.electricBlue} />
                <Text style={styles.metricLabel}>Avg CPU Usage</Text>
                <Text style={[styles.metricValue, { color: THEME.electricBlue }]}>{INFRASTRUCTURE_METRICS.avgCpuUsage}%</Text>
              </View>
              <View style={styles.metricItem}>
                <HardDrive size={20} color={THEME.emeraldGreen} />
                <Text style={styles.metricLabel}>Avg Memory Usage</Text>
                <Text style={[styles.metricValue, { color: THEME.emeraldGreen }]}>{INFRASTRUCTURE_METRICS.avgMemoryUsage}%</Text>
              </View>
              <View style={styles.metricItem}>
                <Database size={20} color={THEME.purple} />
                <Text style={styles.metricLabel}>Total Storage</Text>
                <Text style={[styles.metricValue, { color: THEME.purple }]}>{INFRASTRUCTURE_METRICS.totalStorage}</Text>
              </View>
              <View style={styles.metricItem}>
                <Wifi size={20} color={THEME.amber} />
                <Text style={styles.metricLabel}>Network Bandwidth</Text>
                <Text style={[styles.metricValue, { color: THEME.amber }]}>{INFRASTRUCTURE_METRICS.networkBandwidth}</Text>
              </View>
              <View style={styles.metricItem}>
                <Activity size={20} color={THEME.magenta} />
                <Text style={styles.metricLabel}>Active Connections</Text>
                <Text style={[styles.metricValue, { color: THEME.magenta }]}>{INFRASTRUCTURE_METRICS.activeConnections}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* System Services */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Server size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>System Services</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.servicesScroll}>
            <View style={styles.servicesContainer}>
              {SYSTEM_SERVICES.map((service) => renderServiceCard(service))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Agent Health */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Agent Health</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            <View style={styles.agentsContainer}>
              {AI_AGENT_HEALTH.map((agent) => renderAgentCard(agent))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Capacity Planning */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Capacity Planning</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.capacityScroll}>
            <View style={styles.capacityContainer}>
              {CAPACITY_PLANNING.map((capacity) => renderCapacityCard(capacity))}
            </View>
          </ScrollView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  metricsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  servicesScroll: {
    marginBottom: 0,
  },
  servicesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  serviceCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  serviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  serviceMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  serviceMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  serviceMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  serviceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceLastIncident: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  agentsScroll: {
    marginBottom: 0,
  },
  agentsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  agentCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    flex: 1,
  },
  agentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  agentStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  agentMetrics: {
    gap: 8,
  },
  agentMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agentMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  capacityScroll: {
    marginBottom: 0,
  },
  capacityContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  capacityCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  capacityResource: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  capacityBar: {
    height: 8,
    backgroundColor: THEME.card,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  capacityFill: {
    height: '100%',
    borderRadius: 4,
  },
  capacityMetrics: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  capacityMetric: {
    flex: 1,
  },
  capacityMetricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  capacityMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  capacityTimeline: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
