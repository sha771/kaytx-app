import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Settings,
  Cog,
  Workflow,
  ListTodo,
  RefreshCw,
  Package,
  Shield,
  Boxes,
  CircleCheck,
  ChevronRight,
  Play,
  Pause,
  Power,
  Sparkles,
  Crown,
  Star,
  TrendingUp,
  Clock,
  ChartBar,
  Zap,
  Activity,
  Gauge,
  Radio,
  Eye,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Cpu,
  GitBranch,
  TriangleAlert,
  Target,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

const ACCENT_COLOR = '#5856D6';
const GRADIENT_COLORS = ['#5856D6', '#7B68EE'] as const;

interface SubAgent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  enabled: boolean;
  status: 'active' | 'paused' | 'training' | 'inactive' | 'optimizing';
  tasksCompleted: number;
  successRate: number;
  lastActive: string;
  capabilities: string[];
  tier: 'standard' | 'premium' | 'enterprise';
  learningProgress: number;
  efficiency: number;
  processesOptimized: number;
  timeSaved: string;
  automationRate: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  activeWorkflows: number;
  errorRate: number;
  uptime: string;
}

const initialSubAgents: SubAgent[] = [
  {
    id: 'om-1',
    name: 'AI Operations Manager',
    description: 'Oversees daily operations with intelligent monitoring',
    icon: Cog,
    enabled: true,
    status: 'active',
    tasksCompleted: 1890,
    successRate: 97,
    lastActive: '4 min ago',
    capabilities: ['Process Monitoring', 'Resource Allocation', 'Performance Tracking', 'Incident Management', 'Capacity Planning', 'SLA Management'],
    tier: 'enterprise',
    learningProgress: 94,
    efficiency: 98,
    processesOptimized: 234,
    timeSaved: '156h',
    automationRate: 87,
    trend: 'up',
    recentActions: ['Optimized resource allocation', 'Resolved incident #789', 'Updated SLA metrics'],
    healthScore: 98,
    weeklyGrowth: 12,
    activeWorkflows: 45,
    errorRate: 0.2,
    uptime: '99.9%',
  },
  {
    id: 'om-2',
    name: 'AI Workflow Automation Agent',
    description: 'Automates workflows with intelligent process mining',
    icon: Workflow,
    enabled: true,
    status: 'active',
    tasksCompleted: 1560,
    successRate: 98,
    lastActive: '1 min ago',
    capabilities: ['Workflow Design', 'Trigger Management', 'Integration', 'Process Mining', 'Error Handling', 'Version Control'],
    tier: 'enterprise',
    learningProgress: 96,
    efficiency: 99,
    processesOptimized: 312,
    timeSaved: '289h',
    automationRate: 94,
    trend: 'up',
    recentActions: ['Deployed 3 new workflows', 'Reduced manual tasks by 45%', 'Integrated with CRM'],
    healthScore: 99,
    weeklyGrowth: 18,
    activeWorkflows: 89,
    errorRate: 0.1,
    uptime: '99.99%',
  },
  {
    id: 'om-3',
    name: 'AI Task Coordinator',
    description: 'Coordinates tasks across teams with smart prioritization',
    icon: ListTodo,
    enabled: true,
    status: 'active',
    tasksCompleted: 1120,
    successRate: 95,
    lastActive: '6 min ago',
    capabilities: ['Task Assignment', 'Progress Tracking', 'Deadline Management', 'Dependency Mapping', 'Resource Balancing', 'Priority Optimization'],
    tier: 'premium',
    learningProgress: 90,
    efficiency: 95,
    processesOptimized: 156,
    timeSaved: '98h',
    automationRate: 78,
    trend: 'stable',
    recentActions: ['Assigned 45 tasks', 'Rebalanced team workload', 'Updated project timeline'],
    healthScore: 94,
    weeklyGrowth: 8,
    activeWorkflows: 34,
    errorRate: 0.5,
    uptime: '99.8%',
  },
  {
    id: 'om-4',
    name: 'AI Process Optimization Agent',
    description: 'Optimizes processes through analysis and simulation',
    icon: RefreshCw,
    enabled: true,
    status: 'training',
    tasksCompleted: 780,
    successRate: 94,
    lastActive: '25 min ago',
    capabilities: ['Bottleneck Detection', 'Efficiency Analysis', 'Improvement Suggestions', 'Simulation', 'Cost Reduction', 'Quality Improvement'],
    tier: 'enterprise',
    learningProgress: 82,
    efficiency: 91,
    processesOptimized: 89,
    timeSaved: '67h',
    automationRate: 65,
    trend: 'up',
    recentActions: ['Identified 5 bottlenecks', 'Proposed efficiency improvements', 'Ran process simulation'],
    healthScore: 88,
    weeklyGrowth: 22,
    activeWorkflows: 12,
    errorRate: 0.8,
    uptime: '99.5%',
  },
  {
    id: 'om-5',
    name: 'AI Resource Planner',
    description: 'Plans resource allocation for optimal utilization',
    icon: Package,
    enabled: true,
    status: 'active',
    tasksCompleted: 560,
    successRate: 96,
    lastActive: '12 min ago',
    capabilities: ['Capacity Planning', 'Budget Forecasting', 'Resource Optimization', 'Demand Planning', 'Utilization Tracking', 'Cost Analysis'],
    tier: 'premium',
    learningProgress: 91,
    efficiency: 96,
    processesOptimized: 67,
    timeSaved: '45h',
    automationRate: 72,
    trend: 'up',
    recentActions: ['Forecasted Q2 capacity', 'Optimized team allocation', 'Reduced idle resources by 23%'],
    healthScore: 95,
    weeklyGrowth: 15,
    activeWorkflows: 23,
    errorRate: 0.3,
    uptime: '99.7%',
  },
  {
    id: 'om-6',
    name: 'AI Compliance Monitoring Agent',
    description: 'Ensures regulatory compliance with automated auditing',
    icon: Shield,
    enabled: true,
    status: 'active',
    tasksCompleted: 450,
    successRate: 99,
    lastActive: '8 min ago',
    capabilities: ['Policy Enforcement', 'Audit Trails', 'Risk Assessment', 'Regulatory Updates', 'Compliance Reporting', 'Exception Management'],
    tier: 'enterprise',
    learningProgress: 97,
    efficiency: 99,
    processesOptimized: 45,
    timeSaved: '78h',
    automationRate: 91,
    trend: 'stable',
    recentActions: ['Completed GDPR audit', 'Updated compliance policies', 'Generated audit report'],
    healthScore: 99,
    weeklyGrowth: 5,
    activeWorkflows: 18,
    errorRate: 0.05,
    uptime: '100%',
  },
  {
    id: 'om-7',
    name: 'AI Vendor Management Agent',
    description: 'Manages vendor relationships and procurement',
    icon: Boxes,
    enabled: false,
    status: 'inactive',
    tasksCompleted: 230,
    successRate: 93,
    lastActive: '4 hours ago',
    capabilities: ['Vendor Evaluation', 'Contract Management', 'Performance Review', 'Procurement', 'Negotiation Support', 'Risk Monitoring'],
    tier: 'premium',
    learningProgress: 78,
    efficiency: 88,
    processesOptimized: 23,
    timeSaved: '34h',
    automationRate: 56,
    trend: 'stable',
    recentActions: ['Paused - awaiting activation'],
    healthScore: 70,
    weeklyGrowth: 0,
    activeWorkflows: 0,
    errorRate: 0,
    uptime: '-',
  },
  {
    id: 'om-8',
    name: 'AI Quality Control Agent',
    description: 'Maintains quality with automated testing and monitoring',
    icon: CircleCheck,
    enabled: true,
    status: 'active',
    tasksCompleted: 190,
    successRate: 97,
    lastActive: '18 min ago',
    capabilities: ['Quality Audits', 'Defect Detection', 'Process Improvement', 'Standards Compliance', 'Testing Automation', 'Quality Metrics'],
    tier: 'premium',
    learningProgress: 93,
    efficiency: 97,
    processesOptimized: 34,
    timeSaved: '56h',
    automationRate: 83,
    trend: 'up',
    recentActions: ['Detected 12 defects', 'Improved quality score by 8%', 'Updated QA standards'],
    healthScore: 96,
    weeklyGrowth: 10,
    activeWorkflows: 28,
    errorRate: 0.4,
    uptime: '99.6%',
  },
];

export default function OperationsManagementAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();
  
  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'operations-management' 
  });
  
  const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

  const subAgents = useMemo(() => {
    return initialSubAgents.map(agent => ({
      ...agent,
      enabled: activeAgents[agent.id] ?? agent.enabled
    }));
  }, [activeAgents]);

  const toggleSubAgent = useCallback(async (agentId: string) => {
    try {
      const currentEnabled = activeAgents[agentId] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId,
        enabled: !currentEnabled,
        agentType: 'sub'
      });
      toggleAgent(agentId);
    } catch {
      console.error('Failed to toggle agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const activateAll = useCallback(async () => {
    for (const agent of subAgents) {
      if (!activeAgents[agent.id]) {
        await toggleSubAgent(agent.id);
      }
    }
  }, [subAgents, activeAgents, toggleSubAgent]);

  const deactivateAll = useCallback(async () => {
    for (const agent of subAgents) {
      if (activeAgents[agent.id]) {
        await toggleSubAgent(agent.id);
      }
    }
  }, [subAgents, activeAgents, toggleSubAgent]);

  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
    Animated.timing(progressAnim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();
  }, [pulseAnim, progressAnim]);

  const toggleMainAgent = useCallback(async () => {
    try {
      const currentEnabled = activeAgents['main-om'] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId: 'main-om',
        enabled: !currentEnabled,
        agentType: 'main'
      });
      toggleAgent('main-om');
    } catch {
      console.error('Failed to toggle main agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const mainAgentEnabled = activeAgents['main-om'] ?? true;

  const stats = useMemo(() => {
    if (statsData) {
      return {
        activeAgents: statsData.activeAgents,
        totalOptimized: Math.round(statsData.totalTasks * 0.08), // Mocking from tasks
        avgSuccess: statsData.avgSuccessRate,
        avgAutomation: Math.round(statsData.avgHealthScore * 0.9), // Mocking from health
        totalWorkflows: statsData.activeConnections,
        avgHealth: statsData.avgHealthScore
      };
    }
    return { 
      activeAgents: 0, totalOptimized: 0, avgSuccess: 0, 
      avgAutomation: 0, totalWorkflows: 0, avgHealth: 0 
    };
  }, [statsData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'training': return '#007AFF';
      case 'inactive': return '#8E8E93';
      case 'optimizing': return '#AF52DE';
      default: return '#8E8E93';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return Play;
      case 'paused': return Pause;
      case 'training': return RefreshCw;
      case 'inactive': return Power;
      case 'optimizing': return Sparkles;
      default: return Power;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'enterprise': return '#AF52DE';
      case 'premium': return '#FF9500';
      case 'standard': return '#007AFF';
      default: return '#8E8E93';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'enterprise': return Crown;
      case 'premium': return Star;
      default: return CircleCheck;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUpRight;
      case 'down': return ArrowDownRight;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#34C759';
      case 'down': return '#FF3B30';
      default: return '#FF9500';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return '#34C759';
    if (score >= 70) return '#FF9500';
    return '#FF3B30';
  };

  const renderSubAgent = (agent: SubAgent) => {
    const StatusIcon = getStatusIcon(agent.status);
    const TierIcon = getTierIcon(agent.tier);
    const TrendIcon = getTrendIcon(agent.trend);
    const isExpanded = expandedAgent === agent.id;

    return (
      <View key={agent.id} style={[styles.agentCard, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity
          style={styles.agentHeader}
          onPress={() => setExpandedAgent(isExpanded ? null : agent.id)}
          activeOpacity={0.7}
        >
          <View style={styles.agentIconWrapper}>
            <View style={[styles.agentIconContainer, { backgroundColor: `${ACCENT_COLOR}15` }]}>
              <agent.icon size={22} color={ACCENT_COLOR} />
            </View>
            {agent.status === 'active' && (
              <Animated.View style={[styles.liveIndicator, { transform: [{ scale: pulseAnim }] }]}>
                <View style={styles.liveIndicatorInner} />
              </Animated.View>
            )}
          </View>
          <View style={styles.agentInfo}>
            <View style={styles.agentTitleRow}>
              <Text style={[styles.agentName, { color: theme.colors.text }]} numberOfLines={1}>
                {agent.name}
              </Text>
              <View style={[styles.tierBadge, { backgroundColor: `${getTierColor(agent.tier)}15` }]}>
                <TierIcon size={10} color={getTierColor(agent.tier)} />
                <Text style={[styles.tierText, { color: getTierColor(agent.tier) }]}>{agent.tier}</Text>
              </View>
            </View>
            <Text style={[styles.agentDesc, { color: theme.colors.secondaryText }]} numberOfLines={1}>
              {agent.description}
            </Text>
            <View style={styles.agentMetaRow}>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
                <StatusIcon size={10} color={getStatusColor(agent.status)} />
                <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>{agent.status}</Text>
              </View>
              <View style={[styles.healthBadge, { backgroundColor: `${getHealthColor(agent.healthScore)}15` }]}>
                <Shield size={10} color={getHealthColor(agent.healthScore)} />
                <Text style={[styles.healthText, { color: getHealthColor(agent.healthScore) }]}>{agent.healthScore}%</Text>
              </View>
              <View style={[styles.trendBadge, { backgroundColor: `${getTrendColor(agent.trend)}15` }]}>
                <TrendIcon size={10} color={getTrendColor(agent.trend)} />
                {agent.weeklyGrowth > 0 && (
                  <Text style={[styles.trendText, { color: getTrendColor(agent.trend) }]}>+{agent.weeklyGrowth}%</Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.agentActions}>
            <Switch
              value={agent.enabled && mainAgentEnabled}
              onValueChange={() => toggleSubAgent(agent.id)}
              trackColor={{ false: '#E5E5EA', true: `${ACCENT_COLOR}50` }}
              thumbColor={agent.enabled && mainAgentEnabled ? ACCENT_COLOR : '#fff'}
              disabled={!mainAgentEnabled}
            />
            <ChevronRight
              size={18}
              color={theme.colors.secondaryText}
              style={{ transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] }}
            />
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={[styles.divider, { backgroundColor: `${ACCENT_COLOR}30` }]} />
            
            <View style={styles.quickStats}>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Activity size={14} color={ACCENT_COLOR} />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.processesOptimized}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Optimized</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Clock size={14} color="#34C759" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.timeSaved}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Saved</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Gauge size={14} color="#007AFF" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.automationRate}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Auto</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <TrendingUp size={14} color="#FF9500" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              </View>
            </View>

            <View style={styles.liveMetrics}>
              <View style={[styles.liveMetricItem, { backgroundColor: `${ACCENT_COLOR}08` }]}>
                <GitBranch size={16} color={ACCENT_COLOR} />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.activeWorkflows}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Active Workflows</Text>
                </View>
              </View>
              <View style={[styles.liveMetricItem, { backgroundColor: '#34C75908' }]}>
                <Cpu size={16} color="#34C759" />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.uptime}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Uptime</Text>
                </View>
              </View>
            </View>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Brain size={14} color={ACCENT_COLOR} />
                <Text style={[styles.progressLabel, { color: theme.colors.secondaryText }]}>AI Learning Progress</Text>
                <Text style={[styles.progressValue, { color: theme.colors.text }]}>{agent.learningProgress}%</Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: 'rgba(0,0,0,0.08)' }]}>
                <Animated.View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', `${agent.learningProgress}%`]
                      }),
                      backgroundColor: ACCENT_COLOR 
                    }
                  ]} 
                />
              </View>
            </View>

            <View style={styles.recentActivitySection}>
              <View style={styles.sectionHeader}>
                <Radio size={14} color="#34C759" />
                <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>Recent Activity</Text>
              </View>
              {agent.recentActions.slice(0, 3).map((action, index) => (
                <View key={index} style={styles.activityItem}>
                  <View style={[styles.activityDot, { backgroundColor: '#34C759' }]} />
                  <Text style={[styles.activityText, { color: theme.colors.text }]} numberOfLines={1}>{action}</Text>
                </View>
              ))}
            </View>

            <View style={styles.capabilitiesSection}>
              <View style={styles.sectionHeader}>
                <Sparkles size={14} color={ACCENT_COLOR} />
                <Text style={[styles.sectionLabel, { color: theme.colors.secondaryText }]}>Capabilities</Text>
              </View>
              <View style={styles.capabilitiesList}>
                {agent.capabilities.map((cap, index) => (
                  <View key={index} style={[styles.capabilityTag, { backgroundColor: `${ACCENT_COLOR}10` }]}>
                    <Text style={[styles.capabilityText, { color: ACCENT_COLOR }]}>{cap}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${ACCENT_COLOR}15` }]}>
                <Settings size={16} color={ACCENT_COLOR} />
                <Text style={[styles.actionButtonText, { color: ACCENT_COLOR }]}>Configure</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#007AFF15' }]}>
                <ChartBar size={16} color="#007AFF" />
                <Text style={[styles.actionButtonText, { color: '#007AFF' }]}>Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#34C75915' }]}>
                <Eye size={16} color="#34C759" />
                <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Monitor</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.headerGradient, { paddingTop: insets.top }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Operations & Management AI</Text>
            <Text style={styles.subtitle}>Business Execution & Internal Operations</Text>
          </View>
          <Switch
            value={mainAgentEnabled}
            onValueChange={toggleMainAgent}
            trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.5)' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.mainAgentCard}>
          <View style={styles.mainAgentHeader}>
            <View style={styles.mainAgentIcon}>
              <Settings size={28} color="#fff" />
              {mainAgentEnabled && (
                <Animated.View style={[styles.mainLiveIndicator, { transform: [{ scale: pulseAnim }] }]}>
                  <View style={styles.mainLiveIndicatorInner} />
                </Animated.View>
              )}
            </View>
            <View style={styles.mainAgentTitleSection}>
              <Text style={styles.mainAgentTitle}>Main Agent</Text>
              <View style={[styles.mainStatusBadge, { backgroundColor: mainAgentEnabled ? 'rgba(255,255,255,0.3)' : 'rgba(142,142,147,0.3)' }]}>
                <View style={[styles.mainStatusDot, { backgroundColor: mainAgentEnabled ? '#fff' : '#8E8E93' }]} />
                <Text style={[styles.mainStatusText, { color: '#fff' }]}>
                  {mainAgentEnabled ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthCircle, { borderColor: '#fff' }]}>
                <Text style={styles.healthValue}>{stats.avgHealth}%</Text>
              </View>
              <Text style={styles.healthLabel}>Health</Text>
            </View>
          </View>
          <View style={styles.mainAgentStats}>
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.activeAgents}/{subAgents.length}</Text>
              <Text style={styles.mainStatLabel}>Sub-Agents</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.totalWorkflows}</Text>
              <Text style={styles.mainStatLabel}>Workflows</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.totalOptimized}</Text>
              <Text style={styles.mainStatLabel}>Optimized</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.avgAutomation}%</Text>
              <Text style={styles.mainStatLabel}>Auto</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.bulkActions}>
        <TouchableOpacity
          style={[styles.bulkButton, { backgroundColor: '#34C75915' }]}
          onPress={activateAll}
          disabled={!mainAgentEnabled}
        >
          <Zap size={16} color={mainAgentEnabled ? '#34C759' : '#8E8E93'} />
          <Text style={[styles.bulkButtonText, { color: mainAgentEnabled ? '#34C759' : '#8E8E93' }]}>Activate All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bulkButton, { backgroundColor: '#FF3B3015' }]} onPress={deactivateAll}>
          <Power size={16} color="#FF3B30" />
          <Text style={[styles.bulkButtonText, { color: '#FF3B30' }]}>Deactivate All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sub-Agents</Text>
          <View style={[styles.countBadge, { backgroundColor: `${ACCENT_COLOR}15` }]}>
            <Text style={[styles.countText, { color: ACCENT_COLOR }]}>{stats.activeAgents} Active</Text>
          </View>
        </View>
        {subAgents.map(renderSubAgent)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerGradient: { paddingBottom: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  backButton: { padding: 8, marginRight: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
  headerCenter: { flex: 1 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 13, marginTop: 2, color: 'rgba(255,255,255,0.8)' },
  mainAgentCard: { marginHorizontal: 20, padding: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16 },
  mainAgentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mainAgentIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12, position: 'relative' },
  mainLiveIndicator: { position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(255, 255, 255, 0.4)', justifyContent: 'center', alignItems: 'center' },
  mainLiveIndicatorInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  mainAgentTitleSection: { flex: 1 },
  mainAgentTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 4 },
  mainStatusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start', gap: 6 },
  mainStatusDot: { width: 6, height: 6, borderRadius: 3 },
  mainStatusText: { fontSize: 12, fontWeight: '600' },
  healthIndicator: { alignItems: 'center' },
  healthCircle: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' },
  healthValue: { fontSize: 14, fontWeight: '700', color: '#fff' },
  healthLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  mainAgentStats: { flexDirection: 'row', alignItems: 'center' },
  mainStat: { flex: 1, alignItems: 'center' },
  mainStatValue: { fontSize: 20, fontWeight: '700', color: '#fff' },
  mainStatLabel: { fontSize: 11, marginTop: 2, color: 'rgba(255,255,255,0.7)' },
  mainStatDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  bulkActions: { flexDirection: 'row', marginHorizontal: 20, marginTop: 16, gap: 12 },
  bulkButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 12, gap: 8 },
  bulkButtonText: { fontSize: 14, fontWeight: '600' },
  content: { flex: 1, marginTop: 16 },
  contentContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600' },
  countBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  countText: { fontSize: 12, fontWeight: '600' },
  agentCard: { borderRadius: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  agentHeader: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  agentIconWrapper: { position: 'relative' },
  agentIconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  liveIndicator: { position: 'absolute', top: -2, right: 8, width: 12, height: 12, borderRadius: 6, backgroundColor: 'rgba(52, 199, 89, 0.3)', justifyContent: 'center', alignItems: 'center' },
  liveIndicatorInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#34C759' },
  agentInfo: { flex: 1 },
  agentTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  agentName: { fontSize: 15, fontWeight: '600', flex: 1 },
  tierBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  tierText: { fontSize: 9, fontWeight: '600', textTransform: 'uppercase' },
  agentDesc: { fontSize: 12, marginBottom: 6 },
  agentMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  statusText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  healthBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 4 },
  healthText: { fontSize: 10, fontWeight: '600' },
  trendBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, gap: 2 },
  trendText: { fontSize: 10, fontWeight: '600' },
  agentActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  expandedContent: { paddingHorizontal: 14, paddingBottom: 14 },
  divider: { height: 2, borderRadius: 1, marginBottom: 14 },
  quickStats: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  quickStatItem: { flex: 1, alignItems: 'center', padding: 10, borderRadius: 10 },
  quickStatValue: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  quickStatLabel: { fontSize: 10, marginTop: 2 },
  liveMetrics: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  liveMetricItem: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 10 },
  liveMetricContent: { flex: 1 },
  liveMetricValue: { fontSize: 18, fontWeight: '700' },
  liveMetricLabel: { fontSize: 11, marginTop: 2 },
  progressSection: { marginBottom: 14 },
  progressHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  progressLabel: { flex: 1, fontSize: 12 },
  progressValue: { fontSize: 12, fontWeight: '600' },
  progressBar: { height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  recentActivitySection: { marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  sectionLabel: { fontSize: 12 },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  activityDot: { width: 6, height: 6, borderRadius: 3 },
  activityText: { flex: 1, fontSize: 12 },
  capabilitiesSection: { marginBottom: 14 },
  capabilitiesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  capabilityTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  capabilityText: { fontSize: 11, fontWeight: '500' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, gap: 6 },
  actionButtonText: { fontSize: 12, fontWeight: '600' },
});
