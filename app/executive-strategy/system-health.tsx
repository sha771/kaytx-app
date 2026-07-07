import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { 
  Activity, 
  Cpu, 
  ArrowLeft,
  Database,
  Server,
  Cloud,
  CheckCircle,
  AlertTriangle,
  Zap,
  TrendingUp,
  Brain,
  Shield,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SystemMetric {
  id: string;
  label: string;
  value: string;
  status: 'healthy' | 'warning' | 'critical';
  icon: any;
}

const systemMetrics: SystemMetric[] = [
  { id: '1', label: 'AI Agents', value: '7/7 Active', status: 'healthy', icon: Brain },
  { id: '2', label: 'Data Pipeline', value: '98.7% Uptime', status: 'healthy', icon: Database },
  { id: '3', label: 'Cloud Infrastructure', value: '99.9% Uptime', status: 'healthy', icon: Cloud },
  { id: '4', label: 'ERP Systems', value: 'Operational', status: 'healthy', icon: Server },
  { id: '5', label: 'CRM Platform', value: 'Operational', status: 'warning', icon: Activity },
  { id: '6', label: 'Financial Systems', value: 'Operational', status: 'healthy', icon: Shield }
];

const aiAgentHealth = [
  { agent: 'Agent Vision', status: 'active', efficiency: 96, tasks: 1247 },
  { agent: 'Agent Capital', status: 'active', efficiency: 94, tasks: 892 },
  { agent: 'Agent Horizon', status: 'active', efficiency: 92, tasks: 756 },
  { agent: 'Agent Sentinel', status: 'active', efficiency: 98, tasks: 634 },
  { agent: 'Agent Fusion', status: 'active', efficiency: 91, tasks: 423 },
  { agent: 'Agent Catalyst', status: 'active', efficiency: 89, tasks: 312 },
  { agent: 'Agent Decision', status: 'active', efficiency: 93, tasks: 518 }
];

const infrastructureCapacity = [
  { system: 'Compute', usage: 78, capacity: '80%', trend: 'up' },
  { system: 'Storage', usage: 62, capacity: '85%', trend: 'up' },
  { system: 'Network', usage: 45, capacity: '90%', trend: 'stable' },
  { system: 'Memory', usage: 71, capacity: '75%', trend: 'up' }
];

const dataPipelineStatus = [
  { pipeline: 'Financial Data', status: 'healthy', latency: '12ms', throughput: '1.2TB/day' },
  { pipeline: 'Market Intelligence', status: 'healthy', latency: '18ms', throughput: '840GB/day' },
  { pipeline: 'Risk Analytics', status: 'healthy', latency: '8ms', throughput: '420GB/day' },
  { pipeline: 'AI Training', status: 'warning', latency: '45ms', throughput: '2.8TB/day' }
];

export default function SystemHealth() {
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'agents' | 'infrastructure' | 'pipeline'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'agents', label: 'AI Agents', icon: Brain },
    { id: 'infrastructure', label: 'Infrastructure', icon: Server },
    { id: 'pipeline', label: 'Data Pipeline', icon: Database }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'critical': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const SystemCard = ({ metric }: { metric: SystemMetric }) => (
    <View style={[styles.systemCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={[styles.systemIcon, { backgroundColor: `${getStatusColor(metric.status)}20` }]}>
        <metric.icon size={24} color={getStatusColor(metric.status)} />
      </View>
      <Text style={styles.systemLabel}>{metric.label}</Text>
      <Text style={[styles.systemValue, { color: getStatusColor(metric.status) }]}>{metric.value}</Text>
      <View style={[styles.systemStatus, { backgroundColor: `${getStatusColor(metric.status)}20` }]}>
        <Text style={[styles.systemStatusText, { color: getStatusColor(metric.status) }]}>
          {metric.status.toUpperCase()}
        </Text>
      </View>
    </View>
  );

  const AgentCard = ({ agent }: { agent: any }) => (
    <View style={[styles.agentCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.agentHeader}>
        <Brain size={20} color="#06B6D4" />
        <Text style={styles.agentName}>{agent.agent}</Text>
        <View style={[styles.agentStatus, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <CheckCircle size={14} color="#10B981" />
          <Text style={[styles.agentStatusText, { color: '#10B981' }]}>ACTIVE</Text>
        </View>
      </View>
      <View style={styles.agentMetrics}>
        <View style={styles.agentMetric}>
          <Zap size={16} color="#9CA3AF" />
          <Text style={styles.agentMetricLabel}>Efficiency</Text>
          <Text style={[styles.agentMetricValue, { color: '#10B981' }]}>{agent.efficiency}%</Text>
        </View>
        <View style={styles.agentMetric}>
          <Activity size={16} color="#9CA3AF" />
          <Text style={styles.agentMetricLabel}>Tasks</Text>
          <Text style={[styles.agentMetricValue, { color: '#3B82F6' }]}>{agent.tasks}</Text>
        </View>
      </View>
    </View>
  );

  const CapacityCard = ({ system }: { system: any }) => (
    <View style={[styles.capacityCard, { backgroundColor: '#0A0F1A' }]}>
      <Text style={styles.capacitySystem}>{system.system}</Text>
      <View style={styles.capacityProgress}>
        <View style={styles.capacityProgressBar}>
          <View style={[styles.capacityProgressFill, { width: `${system.usage}%`, backgroundColor: system.usage > 75 ? '#EF4444' : system.usage > 60 ? '#F59E0B' : '#10B981' }]} />
        </View>
        <Text style={styles.capacityUsage}>{system.usage}%</Text>
      </View>
      <Text style={styles.capacityCapacity}>Capacity: {system.capacity}</Text>
    </View>
  );

  const PipelineCard = ({ pipeline }: { pipeline: any }) => (
    <View style={[styles.pipelineCard, { backgroundColor: '#0A0F1A' }]}>
      <View style={styles.pipelineHeader}>
        <Database size={20} color="#3B82F6" />
        <Text style={styles.pipelineName}>{pipeline.pipeline}</Text>
        <View style={[styles.pipelineStatus, { backgroundColor: `${getStatusColor(pipeline.status)}20` }]}>
          <Text style={[styles.pipelineStatusText, { color: getStatusColor(pipeline.status) }]}>
            {pipeline.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.pipelineMetrics}>
        <View style={styles.pipelineMetric}>
          <Zap size={14} color="#9CA3AF" />
          <Text style={styles.pipelineMetricLabel}>Latency</Text>
          <Text style={[styles.pipelineMetricValue, { color: '#10B981' }]}>{pipeline.latency}</Text>
        </View>
        <View style={styles.pipelineMetric}>
          <TrendingUp size={14} color="#9CA3AF" />
          <Text style={styles.pipelineMetricLabel}>Throughput</Text>
          <Text style={[styles.pipelineMetricValue, { color: '#8B5CF6' }]}>{pipeline.throughput}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#03050A' }]}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={[styles.header, { backgroundColor: '#0A0F1A' }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>System Health</Text>
          <Text style={styles.headerSubtitle}>AI Infrastructure Monitoring</Text>
        </View>
        <Cpu size={20} color="#06B6D4" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, selectedTab === tab.id && styles.tabActive]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <tab.icon size={18} color={selectedTab === tab.id ? '#FFFFFF' : '#9CA3AF'} />
            <Text style={[styles.tabText, selectedTab === tab.id && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        {selectedTab === 'overview' && (
          <View style={styles.metricsSection}>
            <Text style={styles.sectionTitle}>System Health Overview</Text>
            <View style={styles.metricsGrid}>
              {systemMetrics.map(metric => (
                <SystemCard key={metric.id} metric={metric} />
              ))}
            </View>
          </View>
        )}

        {selectedTab === 'agents' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Agent Health</Text>
            {aiAgentHealth.map((agent, index) => (
              <AgentCard key={index} agent={agent} />
            ))}
          </View>
        )}

        {selectedTab === 'infrastructure' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Infrastructure Capacity</Text>
            {infrastructureCapacity.map((system, index) => (
              <CapacityCard key={index} system={system} />
            ))}
          </View>
        )}

        {selectedTab === 'pipeline' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Data Pipeline Status</Text>
            {dataPipelineStatus.map((pipeline, index) => (
              <PipelineCard key={index} pipeline={pipeline} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', marginTop: 2 },
  tabsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  tabActive: { backgroundColor: '#3B82F6' },
  tabText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
  tabTextActive: { color: '#FFFFFF' },
  content: { flex: 1 },
  section: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  metricsSection: { padding: 20 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  systemCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  systemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  systemValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  systemStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  systemStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  agentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  agentName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  agentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  agentStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  agentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  agentMetric: {
    alignItems: 'center',
    gap: 8,
  },
  agentMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  agentMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  capacityCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  capacitySystem: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  capacityProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  capacityProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  capacityProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  capacityUsage: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  capacityCapacity: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  pipelineCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pipelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  pipelineName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  pipelineStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pipelineStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pipelineMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pipelineMetric: {
    alignItems: 'center',
    gap: 8,
  },
  pipelineMetricLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pipelineMetricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
});
