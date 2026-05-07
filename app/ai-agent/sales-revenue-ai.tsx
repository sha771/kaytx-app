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
  TrendingUp,
  UserCheck,
  Briefcase,
  Building,
  Database,
  FileText,
  Handshake,
  ArrowUpRight,
  Users,
  DollarSign,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Power,
  Sparkles,
  Crown,
  Star,
  CircleCheck,
  Settings,
  ChartBarBig,
  Zap,
  Target,
  ChartPie,
  Radio,
  Eye,
  Brain,
  ArrowDownRight,
  Activity,
  Shield,
  Gauge,
  Timer,
  Wallet,
  TrendingDown,
  Award,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { trpc } from '@/lib/trpc';
import { useAIAssistant } from '@/providers/AIAssistantProvider';

const ACCENT_COLOR = '#34C759';
const GRADIENT_COLORS = ['#34C759', '#30B050'] as const;

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
  dealsWon: number;
  revenue: string;
  conversionRate: number;
  trend: 'up' | 'down' | 'stable';
  recentActions: string[];
  healthScore: number;
  weeklyGrowth: number;
  pipelineValue: string;
  avgDealSize: string;
  activeDeals: number;
}

const initialSubAgents: SubAgent[] = [
  {
    id: 'sr-1',
    name: 'AI Lead Development Rep (SDR)',
    description: 'Qualifies and nurtures leads through intelligent outreach',
    icon: UserCheck,
    enabled: true,
    status: 'active',
    tasksCompleted: 2340,
    successRate: 87,
    lastActive: '4 min ago',
    capabilities: ['Lead Scoring', 'Outreach Automation', 'Lead Qualification', 'Nurturing Sequences', 'Email Personalization', 'Follow-up Management'],
    tier: 'enterprise',
    learningProgress: 86,
    efficiency: 91,
    dealsWon: 156,
    revenue: '$245K',
    conversionRate: 23,
    trend: 'up',
    recentActions: ['Qualified 12 new leads', 'Sent personalized outreach', 'Scheduled 5 demos'],
    healthScore: 92,
    weeklyGrowth: 15,
    pipelineValue: '$1.2M',
    avgDealSize: '$8.5K',
    activeDeals: 45,
  },
  {
    id: 'sr-2',
    name: 'AI Sales Rep',
    description: 'Handles sales conversations, demos, and negotiations',
    icon: Briefcase,
    enabled: true,
    status: 'active',
    tasksCompleted: 1890,
    successRate: 85,
    lastActive: '2 min ago',
    capabilities: ['Product Demo', 'Objection Handling', 'Quote Generation', 'Follow-up', 'Meeting Scheduling', 'Needs Assessment'],
    tier: 'premium',
    learningProgress: 82,
    efficiency: 88,
    dealsWon: 89,
    revenue: '$178K',
    conversionRate: 19,
    trend: 'up',
    recentActions: ['Completed demo for Acme Corp', 'Generated quote #2341', 'Handled pricing objection'],
    healthScore: 88,
    weeklyGrowth: 12,
    pipelineValue: '$890K',
    avgDealSize: '$12K',
    activeDeals: 32,
  },
  {
    id: 'sr-3',
    name: 'AI Sales Executive',
    description: 'Full cycle sales from qualification to close',
    icon: Building,
    enabled: true,
    status: 'active',
    tasksCompleted: 1120,
    successRate: 91,
    lastActive: '6 min ago',
    capabilities: ['Deal Management', 'Contract Negotiation', 'Account Planning', 'Revenue Forecasting', 'Strategic Selling', 'Executive Presentations'],
    tier: 'enterprise',
    learningProgress: 90,
    efficiency: 94,
    dealsWon: 67,
    revenue: '$890K',
    conversionRate: 34,
    trend: 'up',
    recentActions: ['Closed $120K enterprise deal', 'Updated pipeline forecast', 'Prepared board presentation'],
    healthScore: 96,
    weeklyGrowth: 22,
    pipelineValue: '$2.4M',
    avgDealSize: '$45K',
    activeDeals: 18,
  },
  {
    id: 'sr-4',
    name: 'AI CRM Assistant',
    description: 'Manages CRM data, pipeline insights, and enrichment',
    icon: Database,
    enabled: true,
    status: 'active',
    tasksCompleted: 1560,
    successRate: 94,
    lastActive: '1 min ago',
    capabilities: ['Data Entry', 'Pipeline Management', 'Reporting', 'Contact Enrichment', 'Activity Logging', 'Duplicate Detection'],
    tier: 'standard',
    learningProgress: 95,
    efficiency: 98,
    dealsWon: 0,
    revenue: '-',
    conversionRate: 0,
    trend: 'stable',
    recentActions: ['Enriched 45 contacts', 'Updated 23 deal stages', 'Generated weekly report'],
    healthScore: 99,
    weeklyGrowth: 5,
    pipelineValue: '-',
    avgDealSize: '-',
    activeDeals: 0,
  },
  {
    id: 'sr-5',
    name: 'AI Proposal Generator',
    description: 'Creates customized proposals with dynamic pricing',
    icon: FileText,
    enabled: true,
    status: 'active',
    tasksCompleted: 780,
    successRate: 92,
    lastActive: '12 min ago',
    capabilities: ['Template Creation', 'Personalization', 'Approval Workflow', 'Document Assembly', 'E-Signature Integration', 'Version Control'],
    tier: 'premium',
    learningProgress: 88,
    efficiency: 92,
    dealsWon: 45,
    revenue: '$320K',
    conversionRate: 41,
    trend: 'up',
    recentActions: ['Generated enterprise proposal', 'Applied custom pricing', 'Sent for e-signature'],
    healthScore: 91,
    weeklyGrowth: 18,
    pipelineValue: '$780K',
    avgDealSize: '$18K',
    activeDeals: 28,
  },
  {
    id: 'sr-6',
    name: 'AI Negotiator',
    description: 'Handles deal negotiations with strategic pricing',
    icon: Handshake,
    enabled: true,
    status: 'training',
    tasksCompleted: 450,
    successRate: 86,
    lastActive: '20 min ago',
    capabilities: ['Price Negotiation', 'Term Discussion', 'Win-Win Solutions', 'Deal Structuring', 'Concession Strategy', 'BATNA Analysis'],
    tier: 'enterprise',
    learningProgress: 75,
    efficiency: 84,
    dealsWon: 34,
    revenue: '$456K',
    conversionRate: 28,
    trend: 'up',
    recentActions: ['Negotiated 15% discount approval', 'Structured payment terms', 'Identified win-win scenario'],
    healthScore: 82,
    weeklyGrowth: 25,
    pipelineValue: '$1.6M',
    avgDealSize: '$32K',
    activeDeals: 15,
  },
  {
    id: 'sr-7',
    name: 'AI Upsell & Cross-sell Agent',
    description: 'Identifies and executes expansion opportunities',
    icon: ArrowUpRight,
    enabled: true,
    status: 'active',
    tasksCompleted: 340,
    successRate: 88,
    lastActive: '9 min ago',
    capabilities: ['Opportunity Detection', 'Product Recommendations', 'Bundle Offers', 'Timing Optimization', 'Customer Analysis', 'Revenue Expansion'],
    tier: 'premium',
    learningProgress: 84,
    efficiency: 90,
    dealsWon: 78,
    revenue: '$234K',
    conversionRate: 31,
    trend: 'up',
    recentActions: ['Identified 8 upsell opportunities', 'Created bundle offer', 'Increased ARR by $12K'],
    healthScore: 89,
    weeklyGrowth: 20,
    pipelineValue: '$560K',
    avgDealSize: '$6K',
    activeDeals: 42,
  },
  {
    id: 'sr-8',
    name: 'AI Account Manager',
    description: 'Manages key accounts for retention and growth',
    icon: Users,
    enabled: false,
    status: 'inactive',
    tasksCompleted: 290,
    successRate: 90,
    lastActive: '2 hours ago',
    capabilities: ['Relationship Management', 'Health Scoring', 'Growth Planning', 'QBR Preparation', 'Executive Alignment', 'Risk Mitigation'],
    tier: 'enterprise',
    learningProgress: 79,
    efficiency: 87,
    dealsWon: 23,
    revenue: '$567K',
    conversionRate: 45,
    trend: 'stable',
    recentActions: ['Paused - awaiting activation'],
    healthScore: 70,
    weeklyGrowth: 0,
    pipelineValue: '$890K',
    avgDealSize: '$28K',
    activeDeals: 0,
  },
  {
    id: 'sr-9',
    name: 'AI Pricing Strategist',
    description: 'Optimizes pricing for maximum revenue',
    icon: DollarSign,
    enabled: true,
    status: 'active',
    tasksCompleted: 180,
    successRate: 93,
    lastActive: '30 min ago',
    capabilities: ['Dynamic Pricing', 'Competitor Analysis', 'Margin Optimization', 'Discount Strategy', 'Price Testing', 'Revenue Modeling'],
    tier: 'enterprise',
    learningProgress: 92,
    efficiency: 96,
    dealsWon: 0,
    revenue: '+$123K',
    conversionRate: 0,
    trend: 'up',
    recentActions: ['Optimized enterprise tier pricing', 'Analyzed competitor rates', 'Increased margins by 8%'],
    healthScore: 95,
    weeklyGrowth: 10,
    pipelineValue: '-',
    avgDealSize: '-',
    activeDeals: 0,
  },
];

export default function SalesRevenueAIScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { activeAgents, toggleAgent } = useAIAssistant();
  
  // Fetch real data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ 
    category: 'sales-revenue' 
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
      const currentEnabled = activeAgents['main-sr'] ?? true;
      await toggleAgentMutation.mutateAsync({
        agentId: 'main-sr',
        enabled: !currentEnabled,
        agentType: 'main'
      });
      toggleAgent('main-sr');
    } catch {
      console.error('Failed to toggle main agent:');
    }
  }, [activeAgents, toggleAgent, toggleAgentMutation]);

  const mainAgentEnabled = activeAgents['main-sr'] ?? true;

  const stats = useMemo(() => {
    if (statsData) {
      return {
        activeAgents: statsData.activeAgents,
        totalDeals: Math.round(statsData.totalTasks * 0.05), // Mocking deals from tasks
        avgSuccess: statsData.avgSuccessRate,
        avgConversion: Math.round(statsData.avgSuccessRate * 0.4), // Mocking conversion
        totalActiveDeals: statsData.activeConnections,
        avgHealth: statsData.avgHealthScore
      };
    }
    return { 
      activeAgents: 0, totalDeals: 0, avgSuccess: 0, 
      avgConversion: 0, totalActiveDeals: 0, avgHealth: 0 
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
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.dealsWon}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Deals</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <DollarSign size={14} color="#FFD700" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.revenue}</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Revenue</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <ChartPie size={14} color="#007AFF" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.conversionRate}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Convert</Text>
              </View>
              <View style={[styles.quickStatItem, { backgroundColor: theme.colors.background }]}>
                <Gauge size={14} color="#FF9500" />
                <Text style={[styles.quickStatValue, { color: theme.colors.text }]}>{agent.efficiency}%</Text>
                <Text style={[styles.quickStatLabel, { color: theme.colors.secondaryText }]}>Efficiency</Text>
              </View>
            </View>

            <View style={styles.liveMetrics}>
              <View style={[styles.liveMetricItem, { backgroundColor: `${ACCENT_COLOR}08` }]}>
                <Wallet size={16} color={ACCENT_COLOR} />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.pipelineValue}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Pipeline Value</Text>
                </View>
              </View>
              <View style={[styles.liveMetricItem, { backgroundColor: '#FF950008' }]}>
                <Award size={16} color="#FF9500" />
                <View style={styles.liveMetricContent}>
                  <Text style={[styles.liveMetricValue, { color: theme.colors.text }]}>{agent.activeDeals}</Text>
                  <Text style={[styles.liveMetricLabel, { color: theme.colors.secondaryText }]}>Active Deals</Text>
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
                <ChartBarBig size={16} color="#007AFF" />
                <Text style={[styles.actionButtonText, { color: '#007AFF' }]}>Analytics</Text>
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
            <Text style={styles.title}>Sales & Revenue AI</Text>
            <Text style={styles.subtitle}>Lead Generation → Deal Closing → Revenue</Text>
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
              <TrendingUp size={28} color="#fff" />
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
              <Text style={styles.mainStatValue}>{stats.totalDeals}</Text>
              <Text style={styles.mainStatLabel}>Deals Won</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.totalActiveDeals}</Text>
              <Text style={styles.mainStatLabel}>Active</Text>
            </View>
            <View style={styles.mainStatDivider} />
            <View style={styles.mainStat}>
              <Text style={styles.mainStatValue}>{stats.avgConversion}%</Text>
              <Text style={styles.mainStatLabel}>Convert</Text>
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

