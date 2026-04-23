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
  Share2,
  PenTool,
  Calendar,
  MessageCircle,
  BarChart3,
  Users,
  Eye,
  Megaphone,
  Heart,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Power,
  Sparkles,
  Crown,
  Star,
  CheckCircle,
  TrendingUp,
  Settings,
  Zap,
  Radio,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  Gauge,
  Timer,
  ThumbsUp,
  Globe,
  Target,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

const ACCENT_COLOR = '#1DA1F2';
const GRADIENT_COLORS = ['#1DA1F2', '#0A66C2'] as const;

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
  engagementRate: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  postsToday: number;
  reachToday: string;
}

const initialSubAgents: SubAgent[] = [
  {
    id: 'smm-1',
    name: 'AI Content Creator',
    description: 'Creates engaging social media posts, captions, and visual concepts for all platforms',
    icon: PenTool,
    enabled: true,
    status: 'active',
    tasksCompleted: 4520,
    successRate: 94,
    lastActive: '1 min ago',
    capabilities: ['Post Creation', 'Caption Writing', 'Hashtag Optimization', 'Visual Concepts', 'Story Creation', 'Reel Scripts'],
    tier: 'enterprise',
    learningProgress: 92,
    efficiency: 96,
    todayTasks: 156,
    avgResponseTime: '1.2s',
    engagementRate: 4.8,
    trend: 'up',
    recentActions: ['Created 12 Instagram posts', 'Generated Twitter thread', 'Designed carousel concept'],
    healthScore: 97,
    weeklyGrowth: 18,
    postsToday: 24,
    reachToday: '45.2K',
  },
  {
    id: 'smm-2',
    name: 'AI Post Scheduler',
    description: 'Optimizes posting times and manages content calendar across all social platforms',
    icon: Calendar,
    enabled: true,
    status: 'active',
    tasksCompleted: 3890,
    successRate: 97,
    lastActive: '3 min ago',
    capabilities: ['Optimal Timing', 'A/B Scheduling', 'Content Calendar', 'Multi-Platform Sync', 'Time Zone Management', 'Auto-Repost'],
    tier: 'premium',
    learningProgress: 95,
    efficiency: 98,
    todayTasks: 89,
    avgResponseTime: '0.5s',
    engagementRate: 5.2,
    trend: 'up',
    recentActions: ['Scheduled 15 posts for peak hours', 'Optimized LinkedIn timing', 'Set up weekend queue'],
    healthScore: 99,
    weeklyGrowth: 12,
    postsToday: 42,
    reachToday: '78.5K',
  },
  {
    id: 'smm-3',
    name: 'AI Community Manager',
    description: 'Monitors and engages with community, handles comments and DMs with empathy',
    icon: MessageCircle,
    enabled: true,
    status: 'active',
    tasksCompleted: 5670,
    successRate: 91,
    lastActive: '30 sec ago',
    capabilities: ['Comment Moderation', 'DM Response', 'Community Building', 'Sentiment Analysis', 'Crisis Detection', 'Influencer Engagement'],
    tier: 'enterprise',
    learningProgress: 88,
    efficiency: 93,
    todayTasks: 234,
    avgResponseTime: '0.8s',
    engagementRate: 4.5,
    trend: 'up',
    recentActions: ['Responded to 45 comments', 'Moderated spam content', 'Engaged with brand ambassadors'],
    healthScore: 94,
    weeklyGrowth: 15,
    postsToday: 0,
    reachToday: '12.1K',
  },
  {
    id: 'smm-4',
    name: 'AI Social Analytics Agent',
    description: 'Tracks performance metrics, generates reports, and provides actionable insights',
    icon: BarChart3,
    enabled: true,
    status: 'active',
    tasksCompleted: 2140,
    successRate: 96,
    lastActive: '5 min ago',
    capabilities: ['Performance Tracking', 'ROI Analysis', 'Competitor Benchmarking', 'Trend Detection', 'Audience Insights', 'Custom Reports'],
    tier: 'enterprise',
    learningProgress: 94,
    efficiency: 97,
    todayTasks: 67,
    avgResponseTime: '1.5s',
    engagementRate: 0,
    trend: 'up',
    recentActions: ['Generated weekly performance report', 'Detected trending hashtag', 'Analyzed competitor strategy'],
    healthScore: 98,
    weeklyGrowth: 22,
    postsToday: 0,
    reachToday: '-',
  },
  {
    id: 'smm-5',
    name: 'AI Influencer Outreach',
    description: 'Identifies, evaluates, and manages influencer partnerships and collaborations',
    icon: Users,
    enabled: true,
    status: 'training',
    tasksCompleted: 890,
    successRate: 88,
    lastActive: '15 min ago',
    capabilities: ['Influencer Discovery', 'Audience Analysis', 'Campaign Management', 'ROI Tracking', 'Contract Templates', 'Performance Reports'],
    tier: 'premium',
    learningProgress: 78,
    efficiency: 86,
    todayTasks: 23,
    avgResponseTime: '3.2s',
    engagementRate: 6.1,
    trend: 'up',
    recentActions: ['Identified 8 micro-influencers', 'Sent collaboration proposal', 'Analyzed influencer ROI'],
    healthScore: 85,
    weeklyGrowth: 28,
    postsToday: 0,
    reachToday: '156K',
  },
  {
    id: 'smm-6',
    name: 'AI Brand Monitor',
    description: 'Monitors brand mentions, reputation, and sentiment across all social channels',
    icon: Eye,
    enabled: true,
    status: 'active',
    tasksCompleted: 3210,
    successRate: 95,
    lastActive: '2 min ago',
    capabilities: ['Mention Tracking', 'Sentiment Analysis', 'Crisis Alerts', 'Competitor Monitoring', 'Review Management', 'Brand Health Score'],
    tier: 'enterprise',
    learningProgress: 91,
    efficiency: 95,
    todayTasks: 178,
    avgResponseTime: '0.3s',
    engagementRate: 0,
    trend: 'stable',
    recentActions: ['Detected 23 brand mentions', 'Flagged negative review', 'Updated brand health score'],
    healthScore: 96,
    weeklyGrowth: 8,
    postsToday: 0,
    reachToday: '-',
  },
  {
    id: 'smm-7',
    name: 'AI Social Ad Manager',
    description: 'Creates, optimizes, and manages paid social media advertising campaigns',
    icon: Megaphone,
    enabled: true,
    status: 'active',
    tasksCompleted: 1560,
    successRate: 92,
    lastActive: '8 min ago',
    capabilities: ['Ad Creation', 'Audience Targeting', 'Budget Optimization', 'A/B Testing', 'Conversion Tracking', 'ROAS Optimization'],
    tier: 'enterprise',
    learningProgress: 89,
    efficiency: 94,
    todayTasks: 45,
    avgResponseTime: '2.1s',
    engagementRate: 3.8,
    trend: 'up',
    recentActions: ['Optimized Facebook ad set', 'Paused underperforming ads', 'Created lookalike audience'],
    healthScore: 93,
    weeklyGrowth: 16,
    postsToday: 8,
    reachToday: '234K',
  },
  {
    id: 'smm-8',
    name: 'AI Engagement Optimizer',
    description: 'Maximizes engagement through smart interactions, polls, stories, and viral content strategies',
    icon: Heart,
    enabled: false,
    status: 'inactive',
    tasksCompleted: 1120,
    successRate: 90,
    lastActive: '1 hour ago',
    capabilities: ['Viral Content Strategy', 'Poll Creation', 'Story Optimization', 'Engagement Triggers', 'UGC Campaigns', 'Community Challenges'],
    tier: 'premium',
    learningProgress: 82,
    efficiency: 88,
    todayTasks: 0,
    avgResponseTime: '-',
    engagementRate: 5.6,
    trend: 'stable',
    recentActions: ['Paused - awaiting activation'],
    healthScore: 72,
    weeklyGrowth: 0,
    postsToday: 0,
    reachToday: '-',
  },
];

export default function SocialMediaManagementAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();

  const { data: statsData } = trpc.aiAgents.getStats.useQuery({
    category: 'social-media-management'
  });
  const { data: activityData } = trpc.aiAgents.getActivity.useQuery({
    category: 'social-media-management',
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
      const currentEnabled = activeAgents['main-smm'] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId: 'main-smm',
        enabled: !currentEnabled,
        agentType: 'main'
      });
      toggleAgent('main-smm');
    } catch {
      console.error('Failed to toggle main agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const mainAgentEnabled = activeAgents['main-smm'] ?? true;

  const stats = useMemo(() => {
    if (statsData) {
      return {
        activeAgents: statsData.activeAgents,
        totalTasks: statsData.totalTasks,
        todayTasks: statsData.tasksToday,
        avgSuccess: statsData.avgSuccessRate,
        totalPosts: Math.round(statsData.tasksToday * 0.3),
        totalReach: '526K',
        avgHealth: statsData.avgHealthScore,
      };
    }
    return {
      activeAgents: 0, totalTasks: 0, todayTasks: 0, avgSuccess: 0,
      totalPosts: 0, totalReach: '0', avgHealth: 0,
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
      default: return CheckCircle;
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
                <Heart size={14} color="#FF2D55" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.engagementRate}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Engage</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Gauge size={14} color="#34C759" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              </View>
            </View>

            <View style={styles.liveMetrics}>
              <View style={[styles.liveMetricItem, { backgroundColor: `${ACCENT_COLOR}08` }]}>
                <Globe size={16} color={ACCENT_COLOR} />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.postsToday}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Posts Today</Text>
                </View>
              </View>
              <View style={[styles.liveMetricItem, { backgroundColor: '#34C75908' }]}>
                <Target size={16} color="#34C759" />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.reachToday}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Reach Today</Text>
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
                <BarChart3 size={16} color="#34C759" />
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
            <Text style={styles.title}>Social Media Management AI</Text>
            <Text style={styles.subtitle}>Content → Engagement → Growth</Text>
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
              <Share2 size={28} color="#fff" />
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
              <Text style={styles.mainStatValue}>{stats.totalPosts}</Text>
              <Text style={styles.mainStatLabel}>Posts Today</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.totalReach}</Text>
              <Text style={styles.mainStatLabel}>Reach</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.avgSuccess}%</Text>
              <Text style={styles.mainStatLabel}>Success</Text>
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
  mainAgentCard: { marginHorizontal: 20, padding: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 16 },
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
  agentActions: { alignItems: 'center', gap: 8 },
  divider: { height: 1, marginHorizontal: 14 },
  expandedContent: { paddingHorizontal: 14, paddingBottom: 14 },
  quickStats: { flexDirection: 'row', gap: 8, marginTop: 12 },
  quickStatItem: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10, gap: 4 },
  quickStatValue: { fontSize: 14, fontWeight: '700' },
  quickStatLabel: { fontSize: 10 },
  liveMetrics: { flexDirection: 'row', gap: 10, marginTop: 12 },
  liveMetricItem: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, gap: 10 },
  liveMetricContent: { flex: 1 },
  liveMetricValue: { fontSize: 16, fontWeight: '700' },
  liveMetricLabel: { fontSize: 10, marginTop: 2 },
  progressSection: { marginTop: 12 },
  progressHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  progressLabel: { flex: 1, fontSize: 12 },
  progressValue: { fontSize: 14, fontWeight: '700' },
  progressBar: { height: 6, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  recentActivitySection: { marginTop: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionLabel: { fontSize: 12, fontWeight: '600' },
  activityItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  activityDot: { width: 6, height: 6, borderRadius: 3 },
  activityText: { fontSize: 12, flex: 1 },
  capabilitiesSection: { marginTop: 14 },
  capabilitiesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  capabilityTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  capabilityText: { fontSize: 11, fontWeight: '500' },
  actionButtons: { flexDirection: 'row', gap: 8, marginTop: 14 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10, gap: 6 },
  actionButtonText: { fontSize: 12, fontWeight: '600' },
});
