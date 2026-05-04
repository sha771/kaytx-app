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
  Megaphone,
  Target,
  Sparkles,
  Share2,
  Palette,
  Search,
  Mail,
  Eye,
  Crosshair,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Power,
  Crown,
  Star,
  CircleCheck,
  TrendingUp,
  Settings,
  ChartBar,
  Zap,
  Users,
  Globe,
  MousePointer,
  Radio,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  Gauge,
  Image,
  FileText,
  Send,
  ChartLine,
  ChartPie,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

const ACCENT_COLOR = '#FF9500';
const GRADIENT_COLORS = ['#FF9500', '#FF6B00'] as const;

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
  campaignsRun: number;
  reach: string;
  engagement: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  impressions: string;
  conversions: number;
  roi: string;
}

const initialSubAgents: SubAgent[] = [
  {
    id: 'mg-1',
    name: 'AI Chief Marketing Officer (AI-CMO)',
    description: 'Strategic leadership with budget allocation and oversight',
    icon: Target,
    enabled: true,
    status: 'active',
    tasksCompleted: 890,
    successRate: 94,
    lastActive: '5 min ago',
    capabilities: ['Strategy Planning', 'Budget Allocation', 'Performance Review', 'Market Analysis', 'Brand Strategy', 'Campaign Oversight'],
    tier: 'enterprise',
    learningProgress: 93,
    efficiency: 97,
    campaignsRun: 45,
    reach: '2.4M',
    engagement: 8.5,
    trend: 'up',
    recentActions: ['Approved Q1 budget allocation', 'Reviewed campaign performance', 'Set new OKRs'],
    healthScore: 97,
    weeklyGrowth: 18,
    impressions: '12.5M',
    conversions: 4520,
    roi: '320%',
  },
  {
    id: 'mg-2',
    name: 'AI Campaign Optimizer',
    description: 'Optimizes campaigns through A/B testing and adjustments',
    icon: Sparkles,
    enabled: true,
    status: 'active',
    tasksCompleted: 2340,
    successRate: 92,
    lastActive: '3 min ago',
    capabilities: ['A/B Testing', 'Bid Optimization', 'Creative Testing', 'Budget Reallocation', 'Performance Tracking', 'ROI Optimization'],
    tier: 'premium',
    learningProgress: 89,
    efficiency: 94,
    campaignsRun: 234,
    reach: '5.6M',
    engagement: 7.2,
    trend: 'up',
    recentActions: ['Optimized ad spend by 23%', 'Launched 3 A/B tests', 'Reallocated budget to top performers'],
    healthScore: 94,
    weeklyGrowth: 22,
    impressions: '28.4M',
    conversions: 8920,
    roi: '285%',
  },
  {
    id: 'mg-3',
    name: 'AI Digital Marketer',
    description: 'Manages PPC, display, and retargeting campaigns',
    icon: Globe,
    enabled: true,
    status: 'active',
    tasksCompleted: 3120,
    successRate: 89,
    lastActive: '1 min ago',
    capabilities: ['PPC Management', 'Display Ads', 'Retargeting', 'Attribution', 'Channel Optimization', 'Conversion Tracking'],
    tier: 'premium',
    learningProgress: 85,
    efficiency: 91,
    campaignsRun: 312,
    reach: '8.9M',
    engagement: 6.8,
    trend: 'up',
    recentActions: ['Launched Google Ads campaign', 'Set up retargeting pixels', 'Optimized landing pages'],
    healthScore: 91,
    weeklyGrowth: 15,
    impressions: '45.2M',
    conversions: 12340,
    roi: '245%',
  },
  {
    id: 'mg-4',
    name: 'AI Content Generator',
    description: 'Creates compelling content across all channels',
    icon: Palette,
    enabled: true,
    status: 'active',
    tasksCompleted: 2890,
    successRate: 93,
    lastActive: '7 min ago',
    capabilities: ['Copywriting', 'Blog Posts', 'Social Content', 'Video Scripts', 'Ad Copy', 'Landing Pages'],
    tier: 'enterprise',
    learningProgress: 91,
    efficiency: 95,
    campaignsRun: 0,
    reach: '-',
    engagement: 9.1,
    trend: 'up',
    recentActions: ['Generated 15 blog posts', 'Created email sequences', 'Wrote product descriptions'],
    healthScore: 95,
    weeklyGrowth: 28,
    impressions: '-',
    conversions: 0,
    roi: '-',
  },
  {
    id: 'mg-5',
    name: 'AI Social Media Manager',
    description: 'Manages social presence with scheduling and engagement',
    icon: Share2,
    enabled: true,
    status: 'active',
    tasksCompleted: 1560,
    successRate: 91,
    lastActive: '2 min ago',
    capabilities: ['Scheduling', 'Community Management', 'Analytics', 'Trend Detection', 'Influencer Outreach', 'Crisis Management'],
    tier: 'premium',
    learningProgress: 87,
    efficiency: 93,
    campaignsRun: 89,
    reach: '3.2M',
    engagement: 8.9,
    trend: 'up',
    recentActions: ['Scheduled 45 posts', 'Responded to 123 comments', 'Identified viral trend'],
    healthScore: 93,
    weeklyGrowth: 35,
    impressions: '18.7M',
    conversions: 3450,
    roi: '180%',
  },
  {
    id: 'mg-6',
    name: 'AI SEO Agent',
    description: 'Optimizes search rankings through keyword research',
    icon: Search,
    enabled: true,
    status: 'training',
    tasksCompleted: 670,
    successRate: 88,
    lastActive: '15 min ago',
    capabilities: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Technical SEO', 'Content Optimization', 'Rank Tracking'],
    tier: 'premium',
    learningProgress: 76,
    efficiency: 85,
    campaignsRun: 0,
    reach: '1.8M',
    engagement: 0,
    trend: 'up',
    recentActions: ['Analyzed 500 keywords', 'Fixed technical SEO issues', 'Built 12 backlinks'],
    healthScore: 82,
    weeklyGrowth: 12,
    impressions: '8.4M',
    conversions: 2890,
    roi: '420%',
  },
  {
    id: 'mg-7',
    name: 'AI Email Marketing Agent',
    description: 'Manages email campaigns with segmentation',
    icon: Mail,
    enabled: true,
    status: 'active',
    tasksCompleted: 450,
    successRate: 90,
    lastActive: '10 min ago',
    capabilities: ['Campaign Creation', 'Segmentation', 'Automation', 'Deliverability', 'Personalization', 'A/B Testing'],
    tier: 'standard',
    learningProgress: 88,
    efficiency: 92,
    campaignsRun: 156,
    reach: '890K',
    engagement: 24.5,
    trend: 'stable',
    recentActions: ['Sent newsletter to 50K subscribers', 'Created drip campaign', 'Improved open rates by 15%'],
    healthScore: 90,
    weeklyGrowth: 8,
    impressions: '4.2M',
    conversions: 1890,
    roi: '380%',
  },
  {
    id: 'mg-8',
    name: 'AI Competitive Intelligence Agent',
    description: 'Monitors competition and market opportunities',
    icon: Eye,
    enabled: false,
    status: 'inactive',
    tasksCompleted: 230,
    successRate: 95,
    lastActive: '3 hours ago',
    capabilities: ['Competitor Tracking', 'Market Analysis', 'Trend Detection', 'Pricing Intel', 'SWOT Analysis', 'Opportunity Alerts'],
    tier: 'enterprise',
    learningProgress: 81,
    efficiency: 89,
    campaignsRun: 0,
    reach: '-',
    engagement: 0,
    trend: 'stable',
    recentActions: ['Paused - awaiting activation'],
    healthScore: 70,
    weeklyGrowth: 0,
    impressions: '-',
    conversions: 0,
    roi: '-',
  },
  {
    id: 'mg-9',
    name: 'AI Audience Targeting Agent',
    description: 'Identifies and segments target audiences',
    icon: Crosshair,
    enabled: true,
    status: 'active',
    tasksCompleted: 190,
    successRate: 87,
    lastActive: '20 min ago',
    capabilities: ['Audience Segmentation', 'Lookalike Creation', 'Persona Development', 'Intent Signals', 'Behavioral Analysis', 'Custom Audiences'],
    tier: 'premium',
    learningProgress: 83,
    efficiency: 88,
    campaignsRun: 67,
    reach: '4.5M',
    engagement: 5.2,
    trend: 'up',
    recentActions: ['Created 5 lookalike audiences', 'Refined buyer personas', 'Identified new segment'],
    healthScore: 88,
    weeklyGrowth: 16,
    impressions: '22.1M',
    conversions: 5670,
    roi: '210%',
  },
];

export default function MarketingGrowthAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();
  
  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'marketing-growth' 
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
      const currentEnabled = activeAgents['main-mg'] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId: 'main-mg',
        enabled: !currentEnabled,
        agentType: 'main'
      });
      toggleAgent('main-mg');
    } catch {
      console.error('Failed to toggle main agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const mainAgentEnabled = activeAgents['main-mg'] ?? true;

  const stats = useMemo(() => {
    if (statsData) {
      return {
        activeAgents: statsData.activeAgents,
        totalCampaigns: Math.round(statsData.totalTasks * 0.12), // Mocking campaigns from tasks
        avgSuccess: statsData.avgSuccessRate,
        avgEngagement: (statsData.avgHealthScore / 10).toFixed(1), // Mocking engagement from health
        totalConversions: Math.round(statsData.tasksToday * 0.45),
        avgHealth: statsData.avgHealthScore
      };
    }
    return { 
      activeAgents: 0, totalCampaigns: 0, avgSuccess: 0, 
      avgEngagement: '0.0', totalConversions: 0, avgHealth: 0 
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
                <Target size={14} color={ACCENT_COLOR} />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.campaignsRun}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Campaigns</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Users size={14} color="#007AFF" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.reach}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Reach</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <MousePointer size={14} color="#34C759" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.engagement}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Engage</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Gauge size={14} color="#AF52DE" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              </View>
            </View>

            <View style={styles.liveMetrics}>
              <View style={[styles.liveMetricItem, { backgroundColor: `${ACCENT_COLOR}08` }]}>
                <ChartLine size={16} color={ACCENT_COLOR} />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.impressions}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Impressions</Text>
                </View>
              </View>
              <View style={[styles.liveMetricItem, { backgroundColor: '#34C75908' }]}>
                <ChartPie size={16} color="#34C759" />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.roi}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>ROI</Text>
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
            <Text style={styles.title}>Marketing & Growth AI</Text>
            <Text style={styles.subtitle}>Customer Acquisition & Brand Growth</Text>
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
              <Megaphone size={28} color="#fff" />
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
              <Text style={styles.mainStatValue}>{stats.totalCampaigns}</Text>
              <Text style={styles.mainStatLabel}>Campaigns</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{(stats.totalConversions / 1000).toFixed(1)}K</Text>
              <Text style={styles.mainStatLabel}>Converts</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.avgEngagement}%</Text>
              <Text style={styles.mainStatLabel}>Engage</Text>
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

