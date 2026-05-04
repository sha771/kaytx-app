import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Activity,
  Wifi,
  WifiOff,
  Users,
  Play,
  Pause,
  RefreshCw,
  CircleCheck,
  CircleX,
  Clock,
  Zap,
  TriangleAlert,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Target,
  DollarSign,
  FileText,
  Shield,
  Brain,
  Headphones,
  Settings,
  ChartBar,
  Megaphone,
  Circle,
  Cpu,
  Database,
  Globe,
  Signal,
  BatteryCharging,
  Thermometer,
  HardDrive,
  Network,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  ListFilter,
  Layers,
  Sparkles,
  Plus,
  User,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';

const { width } = Dimensions.get('window');

interface AgentStatus {
  id: string;
  name: string;
  type: 'main' | 'sub';
  parentAgent?: string;
  status: 'online' | 'busy' | 'idle' | 'offline' | 'error' | 'maintenance';
  currentTask?: string;
  tasksInQueue: number;
  lastActivity: string;
  uptime: string;
  cpu: number;
  memory: number;
  icon: React.ComponentType<any>;
  color: string;
  responseTime: string;
  successRate: number;
  tokensUsed: number;
  requestsPerMin: number;
  errorRate: number;
  healthScore: number;
}

interface LiveActivity {
  id: string;
  agentName: string;
  action: string;
  timestamp: string;
  status: 'processing' | 'completed' | 'failed' | 'queued';
  icon: React.ComponentType<any>;
  color: string;
  duration?: string;
  confidence?: number;
}

interface SystemMetric {
  label: string;
  value: number;
  max: number;
  unit: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

const mockAgentStatuses: AgentStatus[] = [
  { id: '1', name: 'Customer Experience AI', type: 'main', status: 'online', currentTask: 'Handling 12 active conversations', tasksInQueue: 34, lastActivity: 'Just now', uptime: '99.9%', cpu: 45, memory: 62, icon: Headphones, color: '#007AFF', responseTime: '1.2s', successRate: 94, tokensUsed: 124500, requestsPerMin: 45, errorRate: 0.8, healthScore: 98 },
  { id: '2', name: 'AI Receptionist', type: 'sub', parentAgent: 'Customer Experience AI', status: 'busy', currentTask: 'Processing incoming call from +1-555-0123', tasksInQueue: 8, lastActivity: '30s ago', uptime: '99.8%', cpu: 78, memory: 54, icon: Phone, color: '#007AFF', responseTime: '0.8s', successRate: 96, tokensUsed: 45200, requestsPerMin: 12, errorRate: 0.4, healthScore: 96 },
  { id: '3', name: 'AI Customer Support', type: 'sub', parentAgent: 'Customer Experience AI', status: 'online', currentTask: 'Resolving ticket #4521 - Password reset', tasksInQueue: 15, lastActivity: '1m ago', uptime: '99.7%', cpu: 52, memory: 48, icon: MessageSquare, color: '#007AFF', responseTime: '1.5s', successRate: 93, tokensUsed: 67800, requestsPerMin: 28, errorRate: 1.2, healthScore: 94 },
  { id: '4', name: 'Sales & Revenue AI', type: 'main', status: 'online', currentTask: 'Managing 8 active deals in pipeline', tasksInQueue: 22, lastActivity: '2m ago', uptime: '99.5%', cpu: 38, memory: 56, icon: TrendingUp, color: '#34C759', responseTime: '2.1s', successRate: 89, tokensUsed: 89300, requestsPerMin: 18, errorRate: 1.5, healthScore: 92 },
  { id: '5', name: 'AI Lead Development Rep', type: 'sub', parentAgent: 'Sales & Revenue AI', status: 'busy', currentTask: 'Qualifying lead from TechCorp Inc.', tasksInQueue: 12, lastActivity: '45s ago', uptime: '99.4%', cpu: 65, memory: 51, icon: Target, color: '#34C759', responseTime: '1.8s', successRate: 87, tokensUsed: 34500, requestsPerMin: 8, errorRate: 1.8, healthScore: 90 },
  { id: '6', name: 'AI Negotiator', type: 'sub', parentAgent: 'Sales & Revenue AI', status: 'idle', tasksInQueue: 3, lastActivity: '15m ago', uptime: '98.9%', cpu: 12, memory: 35, icon: DollarSign, color: '#34C759', responseTime: '2.5s', successRate: 86, tokensUsed: 12300, requestsPerMin: 2, errorRate: 2.1, healthScore: 85 },
  { id: '7', name: 'Marketing & Growth AI', type: 'main', status: 'online', currentTask: 'Optimizing 5 active campaigns', tasksInQueue: 18, lastActivity: '3m ago', uptime: '99.6%', cpu: 42, memory: 58, icon: Megaphone, color: '#FF9500', responseTime: '1.8s', successRate: 91, tokensUsed: 156700, requestsPerMin: 35, errorRate: 0.9, healthScore: 95 },
  { id: '8', name: 'AI Email Marketing', type: 'sub', parentAgent: 'Marketing & Growth AI', status: 'busy', currentTask: 'Sending batch emails - 2,450/5,000', tasksInQueue: 5, lastActivity: '1m ago', uptime: '99.5%', cpu: 72, memory: 64, icon: Mail, color: '#FF9500', responseTime: '1.2s', successRate: 90, tokensUsed: 78900, requestsPerMin: 125, errorRate: 0.5, healthScore: 97 },
  { id: '9', name: 'Operations & Management AI', type: 'main', status: 'online', currentTask: 'Monitoring 24 active workflows', tasksInQueue: 8, lastActivity: '1m ago', uptime: '99.9%', cpu: 28, memory: 42, icon: Settings, color: '#5856D6', responseTime: '0.9s', successRate: 96, tokensUsed: 45600, requestsPerMin: 52, errorRate: 0.3, healthScore: 99 },
  { id: '10', name: 'Data & Intelligence AI', type: 'main', status: 'online', currentTask: 'Analyzing Q4 sales data patterns', tasksInQueue: 14, lastActivity: '5m ago', uptime: '99.7%', cpu: 55, memory: 68, icon: ChartBar, color: '#FF2D55', responseTime: '2.5s', successRate: 93, tokensUsed: 234500, requestsPerMin: 15, errorRate: 0.7, healthScore: 94 },
  { id: '11', name: 'AI Fraud Detection', type: 'sub', parentAgent: 'Data & Intelligence AI', status: 'online', currentTask: 'Real-time transaction monitoring', tasksInQueue: 0, lastActivity: '10s ago', uptime: '99.99%', cpu: 35, memory: 45, icon: Shield, color: '#FF2D55', responseTime: '0.5s', successRate: 98, tokensUsed: 89200, requestsPerMin: 245, errorRate: 0.1, healthScore: 99 },
  { id: '12', name: 'Analysis & Performance AI', type: 'main', status: 'maintenance', tasksInQueue: 2, lastActivity: '20m ago', uptime: '99.8%', cpu: 8, memory: 32, icon: Brain, color: '#AF52DE', responseTime: '1.5s', successRate: 95, tokensUsed: 67800, requestsPerMin: 0, errorRate: 0.6, healthScore: 88 },
];

const mockLiveActivities: LiveActivity[] = [
  { id: '1', agentName: 'AI Receptionist', action: 'Routing call to support team - VIP customer detected', timestamp: 'Just now', status: 'processing', icon: Phone, color: '#007AFF', confidence: 96 },
  { id: '2', agentName: 'AI Lead Development Rep', action: 'Qualified new lead (Score: 85) - TechCorp Inc.', timestamp: '15s ago', status: 'completed', icon: Target, color: '#34C759', duration: '8m 15s', confidence: 94 },
  { id: '3', agentName: 'AI Email Marketing', action: 'Sent 500/5000 promotional emails', timestamp: '30s ago', status: 'processing', icon: Mail, color: '#FF9500', confidence: 97 },
  { id: '4', agentName: 'AI Customer Support', action: 'Resolved ticket #4518 - Auto-resolution', timestamp: '1m ago', status: 'completed', icon: MessageSquare, color: '#007AFF', duration: '2m 45s', confidence: 98 },
  { id: '5', agentName: 'AI Fraud Detection', action: 'Flagged suspicious transaction $4,250', timestamp: '2m ago', status: 'completed', icon: Shield, color: '#FF2D55', duration: '0.3s', confidence: 91 },
  { id: '6', agentName: 'AI Campaign Optimizer', action: 'Adjusting bid strategy - Holiday Campaign', timestamp: '3m ago', status: 'processing', icon: TrendingUp, color: '#FF9500', confidence: 89 },
  { id: '7', agentName: 'AI Negotiator', action: 'Deal negotiation paused - awaiting response', timestamp: '5m ago', status: 'queued', icon: DollarSign, color: '#34C759' },
  { id: '8', agentName: 'AI Data Analyst', action: 'Generated weekly sales report', timestamp: '8m ago', status: 'completed', icon: ChartBar, color: '#FF2D55', duration: '4m 12s', confidence: 99 },
];

const systemMetrics: SystemMetric[] = [
  { label: 'Total CPU', value: 42, max: 100, unit: '%', icon: Cpu, color: '#007AFF', trend: 'stable' },
  { label: 'Memory', value: 58, max: 100, unit: '%', icon: HardDrive, color: '#34C759', trend: 'up' },
  { label: 'Network', value: 245, max: 500, unit: 'req/s', icon: Network, color: '#FF9500', trend: 'up' },
  { label: 'Tokens/min', value: 12400, max: 20000, unit: '', icon: Database, color: '#AF52DE', trend: 'stable' },
];

export default function AgentActivityScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Fetch real activity and stats data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'all' });
  const { data: activityData, isLoading: isActivityLoading } = trpc.aiAgents.getActivity.useQuery({ 
    limit: 50 
  });

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'main' | 'sub'>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showSystemMetrics, setShowSystemMetrics] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    pulse.start();

    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    return () => pulse.stop();
  }, [pulseAnim, fadeAnim, slideAnim]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#34C759';
      case 'busy': return '#FF9500';
      case 'idle': return '#007AFF';
      case 'offline': return '#8E8E93';
      case 'error': return '#FF3B30';
      case 'maintenance': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return Wifi;
      case 'busy': return Activity;
      case 'idle': return Clock;
      case 'offline': return WifiOff;
      case 'error': return TriangleAlert;
      case 'maintenance': return Settings;
      default: return Circle;
    }
  };

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case 'processing': return Activity;
      case 'completed': return CircleCheck;
      case 'failed': return CircleX;
      case 'queued': return Clock;
      default: return Circle;
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return '#FF9500';
      case 'completed': return '#34C759';
      case 'failed': return '#FF3B30';
      case 'queued': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const filteredAgents = mockAgentStatuses.filter(agent => {
    const matchesType = selectedFilter === 'all' || agent.type === selectedFilter;
    const matchesStatus = selectedStatus === 'all' || agent.status === selectedStatus;
    return matchesType && matchesStatus;
  });
  const liveActivities = useMemo(() => {
    if (activityData?.activities && activityData.activities.length > 0) {
      return activityData.activities.map((a: any) => ({
        id: a.id,
        agentName: a.agentName,
        action: a.action,
        timestamp: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: a.status as any,
        icon: a.details?.category === 'sales' ? DollarSign : 
              a.details?.category === 'customer' ? Headphones : 
              a.details?.category === 'marketing' ? Megaphone : Activity,
        color: a.details?.category === 'sales' ? '#34C759' : 
               a.details?.category === 'customer' ? '#007AFF' : 
               a.details?.category === 'marketing' ? '#FF9500' : '#8E8E93',
        duration: a.details?.duration ? `${Math.floor(a.details.duration / 60)}m ${a.details.duration % 60}s` : undefined,
        confidence: a.details?.confidence,
      }));
    }
    return mockLiveActivities;
  }, [activityData]);

  const stats = useMemo(() => {
    if (statsData) {
      return {
        online: statsData.activeAgents,
        busy: Math.round(statsData.activeAgents * 0.4),
        idle: Math.round(statsData.activeAgents * 0.6),
        offline: statsData.totalAgents - statsData.activeAgents,
        totalTasks: statsData.tasksToday,
        avgHealth: statsData.avgHealthScore,
      };
    }
    const total = mockAgentStatuses.length;
    const online = mockAgentStatuses.filter(a => a.status === 'online').length;
    const busy = mockAgentStatuses.filter(a => a.status === 'busy').length;
    const idle = mockAgentStatuses.filter(a => a.status === 'idle').length;
    const offline = mockAgentStatuses.filter(a => ['offline', 'error', 'maintenance'].includes(a.status)).length;
    return {
      online, busy, idle, offline, totalTasks: 124, avgHealth: 96
    };
  }, [statsData]);

  const renderSystemMetric = (metric: SystemMetric, index: number) => {
    const percentage = (metric.value / metric.max) * 100;
    const TrendIcon = metric.trend === 'up' ? ArrowUpRight : metric.trend === 'down' ? ArrowDownRight : Circle;
    
    return (
      <View key={index} style= [styles.systemMetricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.systemMetricHeader}>
          <metric.icon size={14} color={metric.color} />
          <Text style= [styles.systemMetricLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
          <TrendIcon size={10} color={metric.trend === 'up' ? '#34C759' : metric.trend === 'down' ? '#FF3B30' : '#8E8E93'} />
        </View>
        <Text style= [styles.systemMetricValue, { color: theme.colors.text }]}>
          {metric.value.toLocaleString()}{metric.unit}
        </Text>
        <View style={styles.systemMetricBarBg}>
          <View style= [styles.systemMetricBarFill, { width: `${percentage}%`, backgroundColor: metric.color }]} />
        </View>
      </View>
    );
  };

  const renderAgentStatus = (agent: AgentStatus) => {
    const StatusIcon = getStatusIcon(agent.status);
    const statusColor = getStatusColor(agent.status);
    
    return (
      <Animated.View 
        key={agent.id}
        style= [
          styles.agentCard, 
          { backgroundColor: theme.colors.cardBackground, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View style={styles.agentHeader}>
          <View style= [styles.agentIconBg, { backgroundColor: `${agent.color}20` }]}>
            <agent.icon size={20} color={agent.color} />
          </View>
          <View style={styles.agentInfo}>
            <View style={styles.agentNameRow}>
              <Text style= [styles.agentName, { color: theme.colors.text }]} numberOfLines={1}>
                {agent.name}
              </Text>
              {agent.type === 'sub' && (
                <View style= [styles.typeBadge, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                  <Text style= [styles.typeText, { color: theme.colors.secondaryText }]}>Sub</Text>
                </View>
              )}
            </View>
            {agent.parentAgent && (
              <Text style= [styles.parentText, { color: theme.colors.secondaryText }]}>
                ↳ {agent.parentAgent}
              </Text>
            )}
          </View>
          <View style={styles.statusContainer}>
            <Animated.View 
              style= [
                styles.statusDot, 
                { backgroundColor: statusColor },
                (agent.status === 'busy' || agent.status === 'online') && { transform: [{ scale: pulseAnim }] }
              ]} 
            />
            <StatusIcon size={14} color={statusColor} />
            <Text style= [styles.statusText, { color: statusColor }]}>{agent.status}</Text>
          </View>
        </View>

        {agent.currentTask && (
          <View style= [styles.taskBar, { backgroundColor: `${agent.color}10` }]}>
            <Zap size={12} color={agent.color} />
            <Text style= [styles.taskText, { color: agent.color }]} numberOfLines={1}>
              {agent.currentTask}
            </Text>
          </View>
        )}

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style= [styles.metricValue, { color: theme.colors.text }]}>{agent.tasksInQueue}</Text>
            <Text style= [styles.metricLabel, { color: theme.colors.secondaryText }]}>Queue</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style= [styles.metricValue, { color: theme.colors.text }]}>{agent.responseTime}</Text>
            <Text style= [styles.metricLabel, { color: theme.colors.secondaryText }]}>Response</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style= [styles.metricValue, { color: agent.successRate > 90 ? '#34C759' : agent.successRate > 80 ? '#FF9500' : '#FF3B30' }]}>{agent.successRate}%</Text>
            <Text style= [styles.metricLabel, { color: theme.colors.secondaryText }]}>Success</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style= [styles.metricValue, { color: agent.healthScore > 95 ? '#34C759' : agent.healthScore > 85 ? '#FF9500' : '#FF3B30' }]}>{agent.healthScore}</Text>
            <Text style= [styles.metricLabel, { color: theme.colors.secondaryText }]}>Health</Text>
          </View>
        </View>

        <View style={styles.resourceBars}>
          <View style={styles.resourceItem}>
            <Text style= [styles.resourceLabel, { color: theme.colors.secondaryText }]}>CPU</Text>
            <View style={styles.resourceBarBg}>
              <View 
                style= [
                  styles.resourceBarFill, 
                  { 
                    width: `${agent.cpu}%`, 
                    backgroundColor: agent.cpu > 80 ? '#FF3B30' : agent.cpu > 60 ? '#FF9500' : '#34C759' 
                  }
                ]} 
              />
            </View>
            <Text style= [styles.resourceValue, { color: theme.colors.secondaryText }]}>{agent.cpu}%</Text>
          </View>
          <View style={styles.resourceItem}>
            <Text style= [styles.resourceLabel, { color: theme.colors.secondaryText }]}>MEM</Text>
            <View style={styles.resourceBarBg}>
              <View 
                style= [
                  styles.resourceBarFill, 
                  { 
                    width: `${agent.memory}%`, 
                    backgroundColor: agent.memory > 80 ? '#FF3B30' : agent.memory > 60 ? '#FF9500' : '#007AFF' 
                  }
                ]} 
              />
            </View>
            <Text style= [styles.resourceValue, { color: theme.colors.secondaryText }]}>{agent.memory}%</Text>
          </View>
        </View>

        <View style={styles.agentFooter}>
          <View style={styles.footerStats}>
            <View style={styles.footerStatItem}>
              <Database size={10} color={theme.colors.secondaryText} />
              <Text style= [styles.footerStatText, { color: theme.colors.secondaryText }]}>{(agent.tokensUsed / 1000).toFixed(0)}K tokens</Text>
            </View>
            <View style={styles.footerStatItem}>
              <Zap size={10} color={theme.colors.secondaryText} />
              <Text style= [styles.footerStatText, { color: theme.colors.secondaryText }]}>{agent.requestsPerMin}/min</Text>
            </View>
            <View style={styles.footerStatItem}>
              <TriangleAlert size={10} color={agent.errorRate > 2 ? '#FF3B30' : theme.colors.secondaryText} />
              <Text style= [styles.footerStatText, { color: agent.errorRate > 2 ? '#FF3B30' : theme.colors.secondaryText }]}>{agent.errorRate}% err</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style= [styles.actionBtn, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
              <RefreshCw size={14} color={theme.colors.secondaryText} />
            </TouchableOpacity>
            <TouchableOpacity style= [styles.actionBtn, { backgroundColor: agent.status === 'online' || agent.status === 'busy' ? '#FF3B3020' : '#34C75920' }]}>
              {agent.status === 'online' || agent.status === 'busy' ? (
                <Pause size={14} color="#FF3B30" />
              ) : (
                <Play size={14} color="#34C759" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderLiveActivity = (activity: LiveActivity, index: number) => {
    const StatusIcon = getActivityStatusIcon(activity.status);
    const statusColor = getActivityStatusColor(activity.status);
    
    return (
      <View key={activity.id} style= [styles.liveItem, { backgroundColor: theme.colors.cardBackground }]}>
        <View style= [styles.liveIconBg, { backgroundColor: `${activity.color}20` }]}>
          <activity.icon size={14} color={activity.color} />
        </View>
        <View style={styles.liveInfo}>
          <Text style= [styles.liveAgent, { color: theme.colors.text }]}>{activity.agentName}</Text>
          <Text style= [styles.liveAction, { color: theme.colors.secondaryText }]} numberOfLines={1}>
            {activity.action}
          </Text>
          <View style={styles.liveMetaRow}>
            {activity.duration && (
              <View style={styles.liveMeta}>
                <Clock size={10} color={theme.colors.secondaryText} />
                <Text style= [styles.liveMetaText, { color: theme.colors.secondaryText }]}>{activity.duration}</Text>
              </View>
            )}
            {activity.confidence && (
              <View style={styles.liveMeta}>
                <Brain size={10} color={theme.colors.secondaryText} />
                <Text style= [styles.liveMetaText, { color: activity.confidence > 90 ? '#34C759' : '#FF9500' }]}>{activity.confidence}%</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.liveStatus}>
          {activity.status === 'processing' ? (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <StatusIcon size={16} color={statusColor} />
            </Animated.View>
          ) : (
            <StatusIcon size={16} color={statusColor} />
          )}
          <Text style= [styles.liveTime, { color: theme.colors.secondaryText }]}>{activity.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style= [styles.container, { backgroundColor: theme.colors.background }]}>
      <View style= [styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style= [styles.title, { color: theme.colors.text }]}>Agent Activity</Text>
          <Text style= [styles.subtitle, { color: theme.colors.secondaryText }]}>
            Real-time monitoring & status
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Animated.View style= [styles.liveIndicator, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </Animated.View>
          <TouchableOpacity 
            style= [styles.autoRefreshBtn, { backgroundColor: autoRefresh ? '#34C75920' : theme.colors.cardBackground }]}
            onPress={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw size={16} color={autoRefresh ? '#34C759' : theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      <View style= [styles.statsBar, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity 
          style= [styles.statBtn, selectedStatus === 'all' && styles.statBtnActive]}
          onPress={() => setSelectedStatus('all')}
        >
          <User size={14} color={selectedStatus === 'all' ? '#fff' : theme.colors.secondaryText} />
          <Text style= [styles.statBtnText, { color: selectedStatus === 'all' ? '#fff' : theme.colors.secondaryText }]}>
            All ({mockAgentStatuses.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style= [styles.statBtn, selectedStatus === 'online' && { backgroundColor: '#34C759' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'online' ? 'all' : 'online')}
        >
          <Wifi size={14} color={selectedStatus === 'online' ? '#fff' : '#34C759'} />
          <Text style= [styles.statBtnText, { color: selectedStatus === 'online' ? '#fff' : '#34C759' }]}>
            {stats.online}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style= [styles.statBtn, selectedStatus === 'busy' && { backgroundColor: '#FF9500' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'busy' ? 'all' : 'busy')}
        >
          <Activity size={14} color={selectedStatus === 'busy' ? '#fff' : '#FF9500'} />
          <Text style= [styles.statBtnText, { color: selectedStatus === 'busy' ? '#fff' : '#FF9500' }]}>
            {stats.busy}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style= [styles.statBtn, selectedStatus === 'idle' && { backgroundColor: '#007AFF' }]}
          onPress={() => setSelectedStatus(selectedStatus === 'idle' ? 'all' : 'idle')}
        >
          <Clock size={14} color={selectedStatus === 'idle' ? '#fff' : '#007AFF'} />
          <Text style= [styles.statBtnText, { color: selectedStatus === 'idle' ? '#fff' : '#007AFF' }]}>
            {stats.idle}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {(['all', 'main', 'sub'] as const).map((Filter) => (
          <TouchableOpacity
            key={Funnel}
            style= [
              styles.filterBtn,
              selectedFilter === Filter && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedFilter(Filter)}
          >
            <Text style= [
              styles.filterText,
              { color: selectedFilter === Filter ? '#fff' : theme.colors.secondaryText }
            ]}>
              {Filter === 'all' ? 'All Agents' : Filter === 'main' ? 'Main Agents' : 'Sub-Agents'}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style= [styles.metricsToggle, { backgroundColor: theme.colors.cardBackground }]}
          onPress={() => setShowSystemMetrics(!showSystemMetrics)}
        >
          {showSystemMetrics ? <Eye size={16} color={theme.colors.primary} /> : <EyeOff size={16} color={theme.colors.secondaryText} />}
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {showSystemMetrics && (
          <View style={styles.systemMetricsSection}>
            <View style={styles.sectionHeader}>
              <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>System Health</Text>
              <View style= [styles.healthBadge, { backgroundColor: stats.avgHealth > 95 ? '#34C75920' : stats.avgHealth > 85 ? '#FF950020' : '#FF3B3020' }]}>
                <Sparkles size={12} color={stats.avgHealth > 95 ? '#34C759' : stats.avgHealth > 85 ? '#FF9500' : '#FF3B30'} />
                <Text style= [styles.healthText, { color: stats.avgHealth > 95 ? '#34C759' : stats.avgHealth > 85 ? '#FF9500' : '#FF3B30' }]}>{stats.avgHealth}%</Text>
              </View>
            </View>
            <View style={styles.systemMetricsGrid}>
              {systemMetrics.map(renderSystemMetric)}
            </View>
          </View>
        )}

        <View style={styles.liveSection}>
          <View style={styles.sectionHeader}>
            <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>Live Activity Feed</Text>
            <View style={styles.tasksSummary}>
              <Zap size={12} color={theme.colors.primary} />
              <Text style= [styles.tasksText, { color: theme.colors.secondaryText }]}>
                {stats.totalTasks} tasks in queue
              </Text>
            </View>
          </View>
          <View style={styles.liveList}>
            {liveActivities.map(renderLiveActivity)}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style= [styles.sectionTitle, { color: theme.colors.text }]}>
            Agent Status ({filteredAgents.length})
          </Text>
        </View>

        {filteredAgents.map(renderAgentStatus)}
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
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 6,
    borderRadius: 12,
    gap: 4,
  },
  statBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  statBtnActive: {
    backgroundColor: '#007AFF',
  },
  statBtnText: {
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsToggle: {
    padding: 8,
    borderRadius: 10,
    marginLeft: 'auto',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  systemMetricsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  healthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  systemMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  systemMetricCard: {
    width: (width - 56) / 2,
    padding: 12,
    borderRadius: 12,
  },
  systemMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  systemMetricLabel: {
    fontSize: 11,
    flex: 1,
  },
  systemMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  systemMetricBarBg: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
  },
  systemMetricBarFill: {
    height: 4,
    borderRadius: 2,
  },
  liveSection: {
    marginBottom: 16,
  },
  tasksSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tasksText: {
    fontSize: 12,
  },
  liveList: {
    gap: 8,
  },
  liveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  liveIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  liveInfo: {
    flex: 1,
  },
  liveAgent: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  liveAction: {
    fontSize: 11,
    marginBottom: 4,
  },
  liveMetaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  liveMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  liveMetaText: {
    fontSize: 10,
  },
  liveStatus: {
    alignItems: 'flex-end',
    gap: 4,
  },
  liveTime: {
    fontSize: 10,
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
    marginBottom: 12,
  },
  taskText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '700',
  },
  metricLabel: {
    fontSize: 9,
    marginTop: 2,
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
    fontSize: 9,
    fontWeight: '600',
    width: 28,
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
    fontSize: 9,
    width: 28,
    textAlign: 'right',
  },
  agentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  footerStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  footerStatText: {
    fontSize: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    padding: 8,
    borderRadius: 8,
  },
});

