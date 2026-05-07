import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Users,
  Wifi,
  WifiOff,
  Play,
  Pause,
  Power,
  RefreshCw,
  CircleCheck,
  CircleX,
  TriangleAlert,
  Clock,
  Zap,
  Activity,
  Cpu,
  Database,
  HardDrive,
  Network,
  Thermometer,
  BatteryCharging,
  Signal,
  Shield,
  Brain,
  Headphones,
  TrendingUp,
  Megaphone,
  Settings,
  ChartBarBig,
  Globe,
  Server,
  Cloud,
  CircleDot,
  Eye,
  EyeOff,
  Bell,
  BellOff,
  ChevronRight,
  ChevronDown,
  EllipsisVertical,
  ListFilter,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Gauge,
  Layers,
  User,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

interface SystemHealth {
  id: string;
  name: string;
  value: number;
  max: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface AgentStatusData {
  id: string;
  name: string;
  type: 'main' | 'sub';
  parentAgent?: string;
  category: string;
  icon: React.ComponentType<any>;
  color: string;
  status: 'online' | 'busy' | 'idle' | 'offline' | 'error' | 'maintenance' | 'training';
  health: number;
  uptime: string;
  uptimePercent: number;
  lastActive: string;
  currentTask?: string;
  tasksInQueue: number;
  cpu: number;
  memory: number;
  responseTime: string;
  requestsPerMin: number;
  errorRate: number;
  version: string;
  model: string;
  alerts: number;
}

interface AlertItem {
  id: string;
  agentName: string;
  message: string;
  type: 'critical' | 'warning' | 'info';
  timestamp: string;
  acknowledged: boolean;
}

const systemHealthMetrics: SystemHealth[] = [
  { id: '1', name: 'Total CPU Usage', value: 42, max: 100, unit: '%', icon: Cpu, color: '#007AFF', status: 'healthy', trend: 'stable' },
  { id: '2', name: 'Memory Usage', value: 58, max: 100, unit: '%', icon: HardDrive, color: '#34C759', status: 'healthy', trend: 'up' },
  { id: '3', name: 'Network I/O', value: 245, max: 500, unit: 'MB/s', icon: Network, color: '#FF9500', status: 'healthy', trend: 'up' },
  { id: '4', name: 'API Latency', value: 124, max: 500, unit: 'ms', icon: Timer, color: '#5856D6', status: 'healthy', trend: 'down' },
  { id: '5', name: 'Token Throughput', value: 12400, max: 20000, unit: '/min', icon: Database, color: '#FF2D55', status: 'healthy', trend: 'stable' },
  { id: '6', name: 'Queue Depth', value: 127, max: 500, unit: 'tasks', icon: Layers, color: '#AF52DE', status: 'healthy', trend: 'up' },
];

const mockAgentStatuses: AgentStatusData[] = [
  { id: '1', name: 'Customer Experience AI', type: 'main', category: 'customer', icon: Headphones, color: '#007AFF', status: 'online', health: 98, uptime: '30d 12h', uptimePercent: 99.9, lastActive: 'Now', currentTask: 'Processing 24 conversations', tasksInQueue: 45, cpu: 45, memory: 62, responseTime: '1.2s', requestsPerMin: 156, errorRate: 0.3, version: '3.2.1', model: 'GPT-4 Turbo', alerts: 0 },
  { id: '2', name: 'AI Receptionist', type: 'sub', parentAgent: 'Customer Experience AI', category: 'customer', icon: Headphones, color: '#007AFF', status: 'busy', health: 96, uptime: '30d 12h', uptimePercent: 99.8, lastActive: '10s ago', currentTask: 'Handling call from +1-555-0123', tasksInQueue: 8, cpu: 78, memory: 54, responseTime: '0.8s', requestsPerMin: 45, errorRate: 0.2, version: '3.2.1', model: 'GPT-4 Turbo', alerts: 0 },
  { id: '3', name: 'AI Customer Support', type: 'sub', parentAgent: 'Customer Experience AI', category: 'customer', icon: Headphones, color: '#007AFF', status: 'online', health: 94, uptime: '28d 6h', uptimePercent: 99.7, lastActive: '1m ago', currentTask: 'Resolving ticket #4521', tasksInQueue: 23, cpu: 52, memory: 48, responseTime: '1.5s', requestsPerMin: 89, errorRate: 0.8, version: '3.2.1', model: 'GPT-4 Turbo', alerts: 1 },
  { id: '4', name: 'Sales & Revenue AI', type: 'main', category: 'sales', icon: TrendingUp, color: '#34C759', status: 'online', health: 92, uptime: '25d 8h', uptimePercent: 99.5, lastActive: '2m ago', currentTask: 'Managing 12 deals in pipeline', tasksInQueue: 34, cpu: 38, memory: 56, responseTime: '2.1s', requestsPerMin: 67, errorRate: 1.2, version: '3.1.0', model: 'GPT-4 Turbo', alerts: 1 },
  { id: '5', name: 'AI Lead Development Rep', type: 'sub', parentAgent: 'Sales & Revenue AI', category: 'sales', icon: TrendingUp, color: '#34C759', status: 'busy', health: 90, uptime: '25d 8h', uptimePercent: 99.4, lastActive: '30s ago', currentTask: 'Qualifying lead - TechCorp Inc.', tasksInQueue: 15, cpu: 65, memory: 51, responseTime: '1.8s', requestsPerMin: 34, errorRate: 1.5, version: '3.1.0', model: 'GPT-4 Turbo', alerts: 0 },
  { id: '6', name: 'AI Negotiator', type: 'sub', parentAgent: 'Sales & Revenue AI', category: 'sales', icon: TrendingUp, color: '#34C759', status: 'idle', health: 85, uptime: '20d 4h', uptimePercent: 98.9, lastActive: '15m ago', tasksInQueue: 3, cpu: 12, memory: 35, responseTime: '2.5s', requestsPerMin: 5, errorRate: 2.1, version: '3.1.0', model: 'GPT-4 Turbo', alerts: 2 },
  { id: '7', name: 'Marketing & Growth AI', type: 'main', category: 'marketing', icon: Megaphone, color: '#FF9500', status: 'online', health: 95, uptime: '28d 16h', uptimePercent: 99.6, lastActive: '3m ago', currentTask: 'Optimizing 8 campaigns', tasksInQueue: 28, cpu: 42, memory: 58, responseTime: '1.8s', requestsPerMin: 78, errorRate: 0.6, version: '2.8.5', model: 'GPT-4 Vision', alerts: 0 },
  { id: '8', name: 'AI Email Marketing', type: 'sub', parentAgent: 'Marketing & Growth AI', category: 'marketing', icon: Megaphone, color: '#FF9500', status: 'busy', health: 97, uptime: '28d 16h', uptimePercent: 99.5, lastActive: '1m ago', currentTask: 'Sending batch - 3,450/5,000', tasksInQueue: 2, cpu: 72, memory: 64, responseTime: '1.2s', requestsPerMin: 145, errorRate: 0.3, version: '2.8.5', model: 'GPT-4 Turbo', alerts: 0 },
  { id: '9', name: 'Operations & Management AI', type: 'main', category: 'operations', icon: Settings, color: '#5856D6', status: 'online', health: 99, uptime: '45d 2h', uptimePercent: 99.99, lastActive: '1m ago', currentTask: 'Monitoring 32 workflows', tasksInQueue: 12, cpu: 28, memory: 42, responseTime: '0.9s', requestsPerMin: 89, errorRate: 0.1, version: '3.0.2', model: 'GPT-4 Turbo', alerts: 0 },
  { id: '10', name: 'Data & Intelligence AI', type: 'main', category: 'data', icon: ChartBarBig, color: '#FF2D55', status: 'online', health: 94, uptime: '32d 8h', uptimePercent: 99.7, lastActive: '5m ago', currentTask: 'Analyzing Q4 data patterns', tasksInQueue: 18, cpu: 55, memory: 68, responseTime: '2.5s', requestsPerMin: 42, errorRate: 0.5, version: '2.9.1', model: 'GPT-4 Analysis', alerts: 0 },
  { id: '11', name: 'AI Fraud Detection', type: 'sub', parentAgent: 'Data & Intelligence AI', category: 'data', icon: Shield, color: '#FF2D55', status: 'online', health: 99, uptime: '45d 0h', uptimePercent: 99.99, lastActive: '5s ago', currentTask: 'Real-time monitoring active', tasksInQueue: 0, cpu: 35, memory: 45, responseTime: '0.3s', requestsPerMin: 312, errorRate: 0.05, version: '2.9.1', model: 'GPT-4 Analysis', alerts: 0 },
  { id: '12', name: 'Analysis & Performance AI', type: 'main', category: 'analysis', icon: Brain, color: '#AF52DE', status: 'maintenance', health: 88, uptime: '15d 6h', uptimePercent: 99.8, lastActive: '20m ago', tasksInQueue: 5, cpu: 8, memory: 32, responseTime: '1.5s', requestsPerMin: 0, errorRate: 0.4, version: '3.0.0', model: 'GPT-4 Executive', alerts: 1 },
  { id: '13', name: 'AI Complaint Handling', type: 'sub', parentAgent: 'Customer Experience AI', category: 'customer', icon: Headphones, color: '#007AFF', status: 'training', health: 78, uptime: '5d 12h', uptimePercent: 95.2, lastActive: '1h ago', tasksInQueue: 0, cpu: 45, memory: 52, responseTime: '2.2s', requestsPerMin: 0, errorRate: 3.2, version: '3.2.0-beta', model: 'GPT-4 Turbo', alerts: 0 },
];

const mockAlerts: AlertItem[] = [
  { id: '1', agentName: 'AI Negotiator', message: 'Success rate dropped below 85% threshold', type: 'warning', timestamp: '15 min ago', acknowledged: false },
  { id: '2', agentName: 'AI Customer Support', message: 'Queue depth exceeding normal levels', type: 'warning', timestamp: '32 min ago', acknowledged: false },
  { id: '3', agentName: 'Sales & Revenue AI', message: 'Memory usage approaching 80%', type: 'info', timestamp: '1 hour ago', acknowledged: true },
  { id: '4', agentName: 'Analysis & Performance AI', message: 'Scheduled maintenance in progress', type: 'info', timestamp: '20 min ago', acknowledged: true },
  { id: '5', agentName: 'AI Negotiator', message: 'Response time degradation detected', type: 'warning', timestamp: '45 min ago', acknowledged: false },
];

export default function AgentStatusScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  // Fetch real status data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'all' });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ limit: 5 });

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'main' | 'sub'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedAgents, setExpandedAgents] = useState<Set<string>>(new Set());
  const [showAlerts, setShowAlerts] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();

    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();

    return () => pulse.stop();
  }, [fadeAnim, pulseAnim]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const toggleExpanded = useCallback((agentId: string) => {
    setExpandedAgents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  }, []);

  const filteredAgents = useMemo(() => {
    return mockAgentStatuses.filter(agent => {
      const matchesType = selectedFilter === 'all' || agent.type === selectedFilter;
      const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
      return matchesType && matchesStatus;
    });
  }, [selectedFilter, selectedStatus]);

  const statusCounts = useMemo(() => {
    if (statsData) {
      return {
        total: statsData.totalAgents,
        online: statsData.activeAgents,
        busy: Math.round(statsData.activeAgents * 0.4),
        idle: Math.round(statsData.activeAgents * 0.6),
        offline: statsData.totalAgents - statsData.activeAgents,
        training: 0,
        avgHealth: statsData.avgHealthScore,
        totalAlerts: mockAlerts.filter(a => !a.acknowledged).length,
      };
    }
    return {
      total: mockAgentStatuses.length,
      online: mockAgentStatuses.filter(a => a.status === 'online').length,
      busy: mockAgentStatuses.filter(a => a.status === 'busy').length,
      idle: mockAgentStatuses.filter(a => a.status === 'idle').length,
      offline: mockAgentStatuses.filter(a => ['offline', 'error', 'maintenance'].includes(a.status)).length,
      training: mockAgentStatuses.filter(a => a.status === 'training').length,
      avgHealth: Math.round(mockAgentStatuses.reduce((acc, a) => acc + a.health, 0) / mockAgentStatuses.length),
      totalAlerts: mockAlerts.filter(a => !a.acknowledged).length,
    };
  }, [statsData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#34C759';
      case 'busy': return '#FF9500';
      case 'idle': return '#007AFF';
      case 'offline': return '#8E8E93';
      case 'error': return '#FF3B30';
      case 'maintenance': return '#AF52DE';
      case 'training': return '#00C7BE';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return Wifi;
      case 'busy': return Activity;
      case 'idle': return Clock;
      case 'offline': return WifiOff;
      case 'error': return CircleX;
      case 'maintenance': return Settings;
      case 'training': return Brain;
      default: return CircleDot;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 95) return '#34C759';
    if (health >= 85) return '#FF9500';
    return '#FF3B30';
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return '#FF3B30';
      case 'warning': return '#FF9500';
      default: return '#007AFF';
    }
  };

  const renderSystemHealth = () => (
    <View style={[styles.systemHealthCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.systemHealthHeader}>
        <View style={styles.systemHealthTitleRow}>
          <Server size={18} color={theme.colors.primary} />
          <Text style={[styles.systemHealthTitle, { color: theme.colors.text }]}>System Health</Text>
        </View>
        <View style={[styles.overallHealthBadge, { backgroundColor: statusCounts.avgHealth >= 95 ? '#34C75920' : statusCounts.avgHealth >= 85 ? '#FF950020' : '#FF3B3020' }]}>
          <Gauge size={14} color={getHealthColor(statusCounts.avgHealth)} />
          <Text style={[styles.overallHealthText, { color: getHealthColor(statusCounts.avgHealth) }]}>{statusCounts.avgHealth}%</Text>
        </View>
      </View>
      <View style={styles.systemMetricsGrid}>
        {systemHealthMetrics.map((metric) => {
          const percentage = (metric.value / metric.max) * 100;
          const TrendIcon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Activity;
          return (
            <View key={metric.id} style={styles.systemMetricItem}>
              <View style={styles.systemMetricHeader}>
                <metric.icon size={12} color={metric.color} />
                <Text style={[styles.systemMetricLabel, { color: theme.colors.secondaryText }]} numberOfLines={1}>{metric.name}</Text>
                <TrendIcon size={10} color={metric.trend === 'up' ? '#34C759' : metric.trend === 'down' ? '#FF3B30' : '#8E8E93'} />
              </View>
              <Text style={[styles.systemMetricValue, { color: theme.colors.text }]}>
                {metric.value.toLocaleString()}{metric.unit}
              </Text>
              <View style={styles.systemMetricBarBg}>
                <View style={[styles.systemMetricBarFill, { width: `${Math.min(percentage, 100)}%`, backgroundColor: percentage > 80 ? '#FF3B30' : percentage > 60 ? '#FF9500' : metric.color }]} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderAlertItem = (alert: AlertItem) => (
    <TouchableOpacity 
      key={alert.id} 
      style={[styles.alertItem, { backgroundColor: `${getAlertColor(alert.type)}10`, opacity: alert.acknowledged ? 0.6 : 1 }]}
    >
      <View style={[styles.alertIconBg, { backgroundColor: `${getAlertColor(alert.type)}20` }]}>
        <TriangleAlert size={14} color={getAlertColor(alert.type)} />
      </View>
      <View style={styles.alertContent}>
        <Text style={[styles.alertAgent, { color: theme.colors.text }]}>{alert.agentName}</Text>
        <Text style={[styles.alertMessage, { color: theme.colors.secondaryText }]} numberOfLines={1}>{alert.message}</Text>
        <Text style={[styles.alertTime, { color: theme.colors.secondaryText }]}>{alert.timestamp}</Text>
      </View>
      {!alert.acknowledged && (
        <View style={[styles.alertDot, { backgroundColor: getAlertColor(alert.type) }]} />
      )}
    </TouchableOpacity>
  );

  const renderAgentStatusCard = (agent: AgentStatusData) => {
    const StatusIcon = getStatusIcon(agent.status);
    const statusColor = getStatusColor(agent.status);
    const isExpanded = expandedAgents.has(agent.id);

    return (
      <Animated.View key={agent.id} style={{ opacity: fadeAnim }}>
        <TouchableOpacity 
          style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => toggleExpanded(agent.id)}
          activeOpacity={0.7}
        >
          <View style={styles.agentHeader}>
            <View style={[styles.agentIconBg, { backgroundColor: `${agent.color}20` }]}>
              <agent.icon size={20} color={agent.color} />
            </View>
            <View style={styles.agentInfo}>
              <View style={styles.agentNameRow}>
                <Text style={[styles.agentName, { color: theme.colors.text }]} numberOfLines={1}>{agent.name}</Text>
                {agent.type === 'sub' && (
                  <View style={[styles.typeBadge, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                    <Text style={[styles.typeText, { color: theme.colors.secondaryText }]}>Sub</Text>
                  </View>
                )}
              </View>
              {agent.parentAgent && (
                <Text style={[styles.parentText, { color: theme.colors.secondaryText }]}>↳ {agent.parentAgent}</Text>
              )}
            </View>
            <View style={styles.statusContainer}>
              {(agent.status === 'online' || agent.status === 'busy') && (
                <Animated.View style={[styles.statusDot, { backgroundColor: statusColor, transform: [{ scale: pulseAnim }] }]} />
              )}
              {agent.status !== 'online' && agent.status !== 'busy' && (
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
              )}
              <StatusIcon size={14} color={statusColor} />
              <Text style={[styles.statusText, { color: statusColor }]}>{agent.status}</Text>
            </View>
          </View>

          {agent.currentTask && (
            <View style={[styles.taskBar, { backgroundColor: `${agent.color}10` }]}>
              <Zap size={12} color={agent.color} />
              <Text style={[styles.taskText, { color: agent.color }]} numberOfLines={1}>{agent.currentTask}</Text>
            </View>
          )}

          <View style={styles.quickMetricsRow}>
            <View style={styles.quickMetric}>
              <Gauge size={12} color={getHealthColor(agent.health)} />
              <Text style={[styles.quickMetricValue, { color: getHealthColor(agent.health) }]}>{agent.health}%</Text>
              <Text style={[styles.quickMetricLabel, { color: theme.colors.secondaryText }]}>Health</Text>
            </View>
            <View style={styles.quickMetric}>
              <Clock size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.quickMetricValue, { color: theme.colors.text }]}>{agent.responseTime}</Text>
              <Text style={[styles.quickMetricLabel, { color: theme.colors.secondaryText }]}>Response</Text>
            </View>
            <View style={styles.quickMetric}>
              <Layers size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.quickMetricValue, { color: theme.colors.text }]}>{agent.tasksInQueue}</Text>
              <Text style={[styles.quickMetricLabel, { color: theme.colors.secondaryText }]}>Queue</Text>
            </View>
            <View style={styles.quickMetric}>
              <Activity size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.quickMetricValue, { color: theme.colors.text }]}>{agent.requestsPerMin}</Text>
              <Text style={[styles.quickMetricLabel, { color: theme.colors.secondaryText }]}>Req/min</Text>
            </View>
            {agent.alerts > 0 && (
              <View style={[styles.alertBadge, { backgroundColor: '#FF3B3020' }]}>
                <Bell size={10} color="#FF3B30" />
                <Text style={[styles.alertBadgeText, { color: '#FF3B30' }]}>{agent.alerts}</Text>
              </View>
            )}
            <ChevronRight 
              size={16} 
              color={theme.colors.secondaryText}
              style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }], marginLeft: 'auto' }}
            />
          </View>

          {isExpanded && (
            <View style={[styles.expandedSection, { borderTopColor: theme.colors.border }]}>
              <View style={styles.resourceBars}>
                <View style={styles.resourceItem}>
                  <Text style={[styles.resourceLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
                  <View style={styles.resourceBarBg}>
                    <View style={[styles.resourceBarFill, { width: `${agent.cpu}%`, backgroundColor: agent.cpu > 80 ? '#FF3B30' : agent.cpu > 60 ? '#FF9500' : '#34C759' }]} />
                  </View>
                  <Text style={[styles.resourceValue, { color: theme.colors.secondaryText }]}>{agent.cpu}%</Text>
                </View>
                <View style={styles.resourceItem}>
                  <Text style={[styles.resourceLabel, { color: theme.colors.secondaryText }]}>MEM</Text>
                  <View style={styles.resourceBarBg}>
                    <View style={[styles.resourceBarFill, { width: `${agent.memory}%`, backgroundColor: agent.memory > 80 ? '#FF3B30' : agent.memory > 60 ? '#FF9500' : '#007AFF' }]} />
                  </View>
                  <Text style={[styles.resourceValue, { color: theme.colors.secondaryText }]}>{agent.memory}%</Text>
                </View>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{agent.uptime}</Text>
                  <Text style={[styles.detailSubvalue, { color: '#34C759' }]}>{agent.uptimePercent}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Last Active</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>{agent.lastActive}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Error Rate</Text>
                  <Text style={[styles.detailValue, { color: agent.errorRate > 2 ? '#FF3B30' : agent.errorRate > 1 ? '#FF9500' : '#34C759' }]}>{agent.errorRate}%</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={[styles.detailLabel, { color: theme.colors.secondaryText }]}>Version</Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>v{agent.version}</Text>
                </View>
              </View>

              <View style={styles.modelInfo}>
                <Brain size={12} color={theme.colors.secondaryText} />
                <Text style={[styles.modelText, { color: theme.colors.secondaryText }]}>{agent.model}</Text>
              </View>

              <View style={styles.actionButtonsRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                  <RefreshCw size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.actionBtnText, { color: theme.colors.secondaryText }]}>Restart</Text>
                </TouchableOpacity>
                {agent.status === 'online' || agent.status === 'busy' ? (
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF3B3015' }]}>
                    <Pause size={14} color="#FF3B30" />
                    <Text style={[styles.actionBtnText, { color: '#FF3B30' }]}>Pause</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#34C75915' }]}>
                    <Play size={14} color="#34C759" />
                    <Text style={[styles.actionBtnText, { color: '#34C759' }]}>Start</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                  <Eye size={14} color={theme.colors.secondaryText} />
                  <Text style={[styles.actionBtnText, { color: theme.colors.secondaryText }]}>Logs</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Agent Status</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Real-time Health Monitoring
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Animated.View style={[styles.liveIndicator, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </Animated.View>
          <TouchableOpacity 
            style={[styles.autoRefreshBtn, { backgroundColor: autoRefresh ? '#34C75920' : theme.colors.cardBackground }]}
            onPress={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw size={16} color={autoRefresh ? '#34C759' : theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.statusBar, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity 
          style={[styles.statusBtn, selectedStatus === 'all' && styles.statusBtnActive]}
          onPress={() => setSelectedStatus('all')}
        >
          <User size={12} color={selectedStatus === 'all' ? '#fff' : theme.colors.secondaryText} />
          <Text style={[styles.statusBtnText, { color: selectedStatus === 'all' ? '#fff' : theme.colors.secondaryText }]}>{statusCounts.total}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.statusBtn, selectedStatus === 'online' && { backgroundColor: '#34C759' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'online' ? 'all' : 'online')}
        >
          <Wifi size={12} color={selectedStatus === 'online' ? '#fff' : '#34C759'} />
          <Text style={[styles.statusBtnText, { color: selectedStatus === 'online' ? '#fff' : '#34C759' }]}>{statusCounts.online}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.statusBtn, selectedStatus === 'busy' && { backgroundColor: '#FF9500' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'busy' ? 'all' : 'busy')}
        >
          <Activity size={12} color={selectedStatus === 'busy' ? '#fff' : '#FF9500'} />
          <Text style={[styles.statusBtnText, { color: selectedStatus === 'busy' ? '#fff' : '#FF9500' }]}>{statusCounts.busy}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.statusBtn, selectedStatus === 'idle' && { backgroundColor: '#007AFF' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'idle' ? 'all' : 'idle')}
        >
          <Clock size={12} color={selectedStatus === 'idle' ? '#fff' : '#007AFF'} />
          <Text style={[styles.statusBtnText, { color: selectedStatus === 'idle' ? '#fff' : '#007AFF' }]}>{statusCounts.idle}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.statusBtn, selectedStatus === 'training' && { backgroundColor: '#00C7BE' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'training' ? 'all' : 'training')}
        >
          <Brain size={12} color={selectedStatus === 'training' ? '#fff' : '#00C7BE'} />
          <Text style={[styles.statusBtnText, { color: selectedStatus === 'training' ? '#fff' : '#00C7BE' }]}>{statusCounts.training}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'main', 'sub'] as const).map((Filter) => (
          <TouchableOpacity
            key={Funnel}
            style={[styles.filterBtn, selectedFilter === Filter && { backgroundColor: theme.colors.primary }]}
            onPress={() => setSelectedFilter(Filter)}
          >
            <Text style={[styles.filterText, { color: selectedFilter === Filter ? '#fff' : theme.colors.secondaryText }]}>
              {Filter === 'all' ? 'All' : Filter === 'main' ? 'Main' : 'Sub'}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={[styles.alertsToggle, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => setShowAlerts(!showAlerts)}
        >
          {showAlerts ? <Bell size={16} color={statusCounts.totalAlerts > 0 ? '#FF3B30' : theme.colors.primary} /> : <BellOff size={16} color={theme.colors.secondaryText} />}
          {statusCounts.totalAlerts > 0 && (
            <View style={styles.alertCountBadge}>
              <Text style={styles.alertCountText}>{statusCounts.totalAlerts}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {renderSystemHealth()}

        {showAlerts && statusCounts.totalAlerts > 0 && (
          <View style={styles.alertsSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Active Alerts</Text>
              <TouchableOpacity>
                <Text style={[styles.clearAllText, { color: theme.colors.primary }]}>Clear All</Text>
              </TouchableOpacity>
            </View>
            {mockAlerts.filter(a => !a.acknowledged).map(renderAlertItem)}
          </View>
        )}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Agent Status ({filteredAgents.length})</Text>
        </View>

        {filteredAgents.map(renderAgentStatusCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF3B30',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  autoRefreshBtn: {
    padding: 8,
    borderRadius: 10,
  },
  statusBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  statusBtnActive: {
    backgroundColor: '#007AFF',
  },
  statusBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 12,
    gap: 8,
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  alertsToggle: {
    padding: 8,
    borderRadius: 10,
    marginLeft: 'auto',
    position: 'relative',
  },
  alertCountBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertCountText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  systemHealthCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
  },
  systemHealthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemHealthTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  systemHealthTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  overallHealthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  overallHealthText: {
    fontSize: 13,
    fontWeight: '700',
  },
  systemMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  systemMetricItem: {
    width: (width - 72) / 3,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 10,
  },
  systemMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  systemMetricLabel: {
    fontSize: 9,
    flex: 1,
  },
  systemMetricValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  systemMetricBarBg: {
    height: 3,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
  },
  systemMetricBarFill: {
    height: 3,
    borderRadius: 2,
  },
  alertsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearAllText: {
    fontSize: 13,
    fontWeight: '500',
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  alertIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertAgent: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  alertMessage: {
    fontSize: 11,
    marginBottom: 2,
  },
  alertTime: {
    fontSize: 10,
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  agentCard: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  agentIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 9,
    fontWeight: '600',
  },
  parentText: {
    fontSize: 10,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  taskBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  quickMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quickMetric: {
    alignItems: 'center',
    gap: 2,
  },
  quickMetricValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  quickMetricLabel: {
    fontSize: 9,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  alertBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  expandedSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  resourceBars: {
    gap: 8,
    marginBottom: 12,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resourceLabel: {
    fontSize: 10,
    fontWeight: '600',
    width: 30,
  },
  resourceBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 3,
  },
  resourceBarFill: {
    height: 6,
    borderRadius: 3,
  },
  resourceValue: {
    fontSize: 10,
    width: 32,
    textAlign: 'right',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  detailItem: {
    width: (width - 88) / 4,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailSubvalue: {
    fontSize: 9,
    fontWeight: '600',
  },
  modelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  modelText: {
    fontSize: 11,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
