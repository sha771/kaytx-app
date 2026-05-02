import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Headphones,
  Phone,
  Ticket,
  CircleAlert,
  Heart,
  Gift,
  ClipboardList,
  CreditCard,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Power,
  Sparkles,
  Crown,
  Star,
  CircleCheck,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Activity,
  Settings,
  ChartBar,
  Zap,
  Radio,
  Eye,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  MessageCircle,
  ThumbsUp,
  Timer,
  Shield,
  Target,
  Gauge,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

const { width } = Dimensions.get('window');
const ACCENT_COLOR = '#007AFF';
const GRADIENT_COLORS = ['#007AFF', '#5856D6'] as const;

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
  todayTasks: number;
  avgResponseTime: string;
  customerSatisfaction: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  activeConversations: number;
  resolvedToday: number;
}

const initialSubAgents: SubAgent[] = [
  {
    id: 'ce-1',
    name: 'AI Receptionist',
    description: 'First point of contact - handles calls, schedules appointments, answers FAQs',
    icon: Phone,
    enabled: true,
    status: 'active',
    tasksCompleted: 3240,
    successRate: 96,
    lastActive: '2 min ago',
    capabilities: ['Call Handling', 'Appointment Scheduling', 'FAQ Response', 'Multi-language Support', 'Call Routing', 'Voicemail Management'],
    tier: 'premium',
    learningProgress: 92,
    efficiency: 98,
    todayTasks: 156,
    avgResponseTime: '1.2s',
    customerSatisfaction: 4.8,
    trend: 'up',
    recentActions: ['Scheduled appointment for John D.', 'Answered billing inquiry', 'Routed call to Sales'],
    healthScore: 98,
    weeklyGrowth: 12,
    activeConversations: 8,
    resolvedToday: 142,
  },
  {
    id: 'ce-2',
    name: 'AI Customer Support Agent',
    description: 'Handles support via chat, email, and voice with intelligent routing',
    icon: Headphones,
    enabled: true,
    status: 'active',
    tasksCompleted: 4520,
    successRate: 93,
    lastActive: '1 min ago',
    capabilities: ['Ticket Resolution', 'Live Chat', 'Email Support', 'Knowledge Base', 'Escalation Management', 'SLA Tracking'],
    tier: 'enterprise',
    learningProgress: 88,
    efficiency: 95,
    todayTasks: 234,
    avgResponseTime: '0.8s',
    customerSatisfaction: 4.6,
    trend: 'up',
    recentActions: ['Resolved ticket #4521', 'Initiated live chat with Sarah M.', 'Sent follow-up email'],
    healthScore: 95,
    weeklyGrowth: 8,
    activeConversations: 24,
    resolvedToday: 198,
  },
  {
    id: 'ce-3',
    name: 'AI Ticket Resolution Agent',
    description: 'Auto-resolves tickets using AI analysis and pattern matching',
    icon: Ticket,
    enabled: true,
    status: 'active',
    tasksCompleted: 2890,
    successRate: 91,
    lastActive: '5 min ago',
    capabilities: ['Auto-Resolution', 'Intelligent Escalation', 'SLA Tracking', 'Priority Management', 'Pattern Recognition', 'Root Cause Analysis'],
    tier: 'premium',
    learningProgress: 85,
    efficiency: 92,
    todayTasks: 89,
    avgResponseTime: '2.4s',
    customerSatisfaction: 4.5,
    trend: 'stable',
    recentActions: ['Auto-resolved 12 tickets', 'Escalated priority issue', 'Updated knowledge base'],
    healthScore: 92,
    weeklyGrowth: 5,
    activeConversations: 12,
    resolvedToday: 78,
  },
  {
    id: 'ce-4',
    name: 'AI Complaint Handling Agent',
    description: 'Manages complaints with empathy, efficiency, and resolution tracking',
    icon: CircleAlert,
    enabled: true,
    status: 'training',
    tasksCompleted: 1560,
    successRate: 88,
    lastActive: '10 min ago',
    capabilities: ['Complaint Analysis', 'Resolution Suggestions', 'Follow-up Automation', 'Sentiment Detection', 'Escalation Protocols', 'Compensation Management'],
    tier: 'enterprise',
    learningProgress: 78,
    efficiency: 86,
    todayTasks: 45,
    avgResponseTime: '3.1s',
    customerSatisfaction: 4.3,
    trend: 'up',
    recentActions: ['Processed refund request', 'De-escalated angry customer', 'Offered loyalty discount'],
    healthScore: 85,
    weeklyGrowth: 15,
    activeConversations: 6,
    resolvedToday: 38,
  },
  {
    id: 'ce-5',
    name: 'AI Retention Specialist',
    description: 'Prevents churn through proactive engagement and personalized offers',
    icon: Heart,
    enabled: true,
    status: 'active',
    tasksCompleted: 890,
    successRate: 95,
    lastActive: '3 min ago',
    capabilities: ['Churn Prediction', 'Win-back Campaigns', 'Loyalty Offers', 'Journey Optimization', 'Risk Scoring', 'Personalized Outreach'],
    tier: 'enterprise',
    learningProgress: 91,
    efficiency: 97,
    todayTasks: 67,
    avgResponseTime: '1.5s',
    customerSatisfaction: 4.9,
    trend: 'up',
    recentActions: ['Saved at-risk customer', 'Launched win-back campaign', 'Applied retention offer'],
    healthScore: 97,
    weeklyGrowth: 22,
    activeConversations: 4,
    resolvedToday: 62,
  },
  {
    id: 'ce-6',
    name: 'AI Loyalty & Engagement Agent',
    description: 'Drives loyalty programs and engagement through gamification',
    icon: Gift,
    enabled: false,
    status: 'inactive',
    tasksCompleted: 650,
    successRate: 92,
    lastActive: '1 hour ago',
    capabilities: ['Rewards Management', 'Engagement Tracking', 'Program Optimization', 'Gamification', 'Points Management', 'Tier Progression'],
    tier: 'premium',
    learningProgress: 72,
    efficiency: 88,
    todayTasks: 0,
    avgResponseTime: '-',
    customerSatisfaction: 4.4,
    trend: 'stable',
    recentActions: ['Paused - awaiting activation'],
    healthScore: 70,
    weeklyGrowth: 0,
    activeConversations: 0,
    resolvedToday: 0,
  },
  {
    id: 'ce-7',
    name: 'AI Feedback & Survey Agent',
    description: 'Collects, analyzes, and acts on customer feedback in real-time',
    icon: ClipboardList,
    enabled: true,
    status: 'active',
    tasksCompleted: 1120,
    successRate: 97,
    lastActive: '8 min ago',
    capabilities: ['Survey Creation', 'Sentiment Analysis', 'Insight Generation', 'NPS Tracking', 'Trend Detection', 'Action Recommendations'],
    tier: 'standard',
    learningProgress: 94,
    efficiency: 99,
    todayTasks: 78,
    avgResponseTime: '0.5s',
    customerSatisfaction: 4.7,
    trend: 'up',
    recentActions: ['Analyzed 234 feedback responses', 'Generated NPS report', 'Flagged trending issue'],
    healthScore: 99,
    weeklyGrowth: 18,
    activeConversations: 0,
    resolvedToday: 78,
  },
  {
    id: 'ce-8',
    name: 'AI Billing Support Agent',
    description: 'Handles billing inquiries, payments, and dispute resolution',
    icon: CreditCard,
    enabled: true,
    status: 'active',
    tasksCompleted: 550,
    successRate: 94,
    lastActive: '15 min ago',
    capabilities: ['Invoice Queries', 'Payment Processing', 'Dispute Resolution', 'Subscription Management', 'Refund Processing', 'Payment Plans'],
    tier: 'premium',
    learningProgress: 89,
    efficiency: 93,
    todayTasks: 34,
    avgResponseTime: '1.8s',
    customerSatisfaction: 4.5,
    trend: 'stable',
    recentActions: ['Processed 5 refunds', 'Set up payment plan', 'Resolved billing dispute'],
    healthScore: 93,
    weeklyGrowth: 7,
    activeConversations: 3,
    resolvedToday: 31,
  },
];

export default function CustomerExperienceAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();
  
  // Fetch real data from tRPC
  const { data: statsData, isLoading: isStatsLoading } = trpc.aiAgents.getStats.useQuery({ 
    category: 'customer-experience' 
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({ 
    category: 'customer-experience',
    limit: 10 
  });
  
  const toggleAgentMutation = trpc.aiAgents.toggleAgent.useMutation();

  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);

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
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    Animated.timing(progressAnim, { toValue: 1, duration: 1500, useNativeDriver: false }).start();

    Animated.loop(
      Animated.timing(waveAnim, { toValue: 1, duration: 2000, useNativeDriver: false })
    ).start();
  }, [pulseAnim, progressAnim, waveAnim]);

  const toggleMainAgent = useCallback(async () => {
    try {
      const currentEnabled = activeAgents['main-ce'] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId: 'main-ce',
        enabled: !currentEnabled,
        agentType: 'main'
      });
      toggleAgent('main-ce');

    } catch {
      console.error('Failed to toggle main agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const mainAgentEnabled = activeAgents['main-ce'] ?? true;

  const stats = useMemo(() => {
    if (statsData) {
      return {
        activeAgents: statsData.activeAgents,
        totalTasks: statsData.totalTasks,
        todayTasks: statsData.tasksToday,
        avgSuccess: statsData.avgSuccessRate,
        avgSatisfaction: (statsData.avgHealthScore / 20).toFixed(1), // Mocking CSAT from health
        totalConversations: statsData.activeConnections,
        totalResolved: Math.round(statsData.tasksToday * 0.9),
        avgHealth: statsData.avgHealthScore
      };
    }
    return { 
      activeAgents: 0, totalTasks: 0, todayTasks: 0, avgSuccess: 0, 
      avgSatisfaction: '0.0', totalConversations: 0, totalResolved: 0, avgHealth: 0 
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
                <ThumbsUp size={14} color={ACCENT_COLOR} />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.successRate}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Success</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Timer size={14} color="#FF9500" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.avgResponseTime}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Response</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Star size={14} color="#FFD700" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.customerSatisfaction}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>CSAT</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Gauge size={14} color="#34C759" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              </View>
            </View>

            <View style={styles.liveMetrics}>
              <View style={[styles.liveMetricItem, { backgroundColor: `${ACCENT_COLOR}08` }]}>
                <MessageCircle size={16} color={ACCENT_COLOR} />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.activeConversations}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Active Chats</Text>
                </View>
              </View>
              <View style={[styles.liveMetricItem, { backgroundColor: '#34C75908' }]}>
                <CircleCheck size={16} color="#34C759" />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.resolvedToday}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Resolved Today</Text>
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
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#34C75915' }]}>
                <ChartBarBig size={16} color="#34C759" />
                <Text style={[styles.actionButtonText, { color: '#34C759' }]}>Analytics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF950015' }]}>
                <Eye size={16} color="#FF9500" />
                <Text style={[styles.actionButtonText, { color: '#FF9500' }]}>Monitor</Text>
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
            <Text style={styles.title}>Customer Experience AI</Text>
            <Text style={styles.subtitle}>Customer Interaction & Support</Text>
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
              <Headphones size={28} color="#fff" />
              {mainAgentEnabled && (
                <Animated.View style={[styles.mainLiveIndicator, { transform: [{ scale: pulseAnim }] }]}>
                  <View style={styles.mainLiveIndicatorInner} />
                </Animated.View>
              )}
            </View>
            <View style={styles.mainAgentTitleSection}>
              <Text style={styles.mainAgentTitle}>Main Agent</Text>
              <View style={[styles.mainStatusBadge, { backgroundColor: mainAgentEnabled ? 'rgba(52,199,89,0.3)' : 'rgba(142,142,147,0.3)' }]}>
                <View style={[styles.mainStatusDot, { backgroundColor: mainAgentEnabled ? '#34C759' : '#8E8E93' }]} />
                <Text style={[styles.mainStatusText, { color: '#fff' }]}>
                  {mainAgentEnabled ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
            <View style={styles.healthIndicator}>
              <View style={[styles.healthCircle, { borderColor: getHealthColor(stats.avgHealth) }]}>
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
              <Text style={styles.mainStatValue}>{stats.totalConversations}</Text>
              <Text style={styles.mainStatLabel}>Active</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.totalResolved}</Text>
              <Text style={styles.mainStatLabel}>Resolved</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.avgSatisfaction}</Text>
              <Text style={styles.mainStatLabel}>CSAT</Text>
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
          <Text style={[styles.bulkButtonText, { color: mainAgentEnabled ? '#34C759' : '#8E8E93' }]}>
            Activate All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.bulkButton, { backgroundColor: '#FF3B3015' }]}
          onPress={deactivateAll}
        >
          <Power size={16} color="#FF3B30" />
          <Text style={[styles.bulkButtonText, { color: '#FF3B30' }]}>Deactivate All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Sub-Agents
          </Text>
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
  mainAgentCard: { marginHorizontal: 20, padding: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16, backdropFilter: 'blur(10px)' },
  mainAgentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mainAgentIcon: { width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12, position: 'relative' },
  mainLiveIndicator: { position: 'absolute', top: -2, right: -2, width: 14, height: 14, borderRadius: 7, backgroundColor: 'rgba(52, 199, 89, 0.4)', justifyContent: 'center', alignItems: 'center' },
  mainLiveIndicatorInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34C759' },
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
  quickStatValue: { fontSize: 15, fontWeight: '700', marginTop: 4 },
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
