/**
 * =============================================================================
 * MEDIA & ENTERTAINMENT AI COMMAND CENTER
 * =============================================================================
 * 
 * Enterprise-grade Media & Entertainment AI Operating System
 * Managing autonomous AI agents for content production, audience intelligence,
 * streaming analytics, advertising revenue optimization, content recommendations,
 * social media engagement, rights management, talent operations, campaign
 * performance, and entertainment business intelligence.
 * 
 * @version 1.0.0
 * @lastUpdated 2026-06-25
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
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import {
  Users,
  TrendingUp,
  DollarSign,
  Play,
  Share2,
  Brain,
  Sparkles,
  Globe,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Target,
  Eye,
  Heart,
  MessageSquare,
  Radio,
  Film,
  Tv,
  Music,
  Mic,
  Video,
  Monitor,
  Smartphone,
  Wifi,
  Server,
  Shield,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Pause,
  PlayCircle,
  Clock,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  Award,
  Star,
  Flame,
  Crown,
  Gem,
  Rocket,
  LayoutDashboard,
  LineChart,
  ScatterChart,
  ChevronLeft,
  Lightbulb,
  HeartPulse,
  UserPlus,
  Menu,
  X,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DATA STRUCTURES
// ============================================================================

const EXECUTIVE_KPIS = {
  audience: {
    totalAudience: '180M',
    monthlyActiveViewers: '142M',
    dailyActiveUsers: '48M',
    watchTime: '5.8B hours',
    engagementRate: '78%',
    trend: '+18%',
    sparkline: [0.3, 0.45, 0.52, 0.61, 0.68, 0.74, 0.82, 0.89, 0.95, 1.0],
  },
  revenue: {
    advertisingRevenue: '$1.8B',
    subscriptionRevenue: '$1.2B',
    contentRevenue: '$420M',
    sponsorshipRevenue: '$180M',
    totalRevenue: '$3.6B',
    trend: '+24%',
    sparkline: [0.4, 0.48, 0.55, 0.62, 0.71, 0.78, 0.85, 0.89, 0.94, 1.0],
  },
  content: {
    contentPublished: '12,450',
    topPerformingContent: '847',
    completionRate: '72%',
    averageWatchDuration: '34 min',
    contentROI: '340%',
    trend: '+15%',
    sparkline: [0.35, 0.42, 0.51, 0.58, 0.65, 0.72, 0.78, 0.85, 0.91, 1.0],
  },
  social: {
    followersGrowth: '+2.4M',
    engagementGrowth: '+18%',
    viralContentScore: '89',
    communitySentiment: '92%',
    trend: '+12%',
    sparkline: [0.38, 0.45, 0.52, 0.59, 0.66, 0.73, 0.79, 0.86, 0.93, 1.0],
  },
  ai: {
    aiContentGenerated: '45,000',
    aiRevenueImpact: '$280M',
    audienceGrowthPredicted: '+22%',
    engagementUplift: '+28%',
    recommendationsGenerated: '8.9M',
    trend: '+35%',
    sparkline: [0.25, 0.38, 0.48, 0.59, 0.68, 0.76, 0.84, 0.91, 0.96, 1.0],
  },
};

const AI_MEDIA_AGENTS = [
  {
    id: 'agent-vision',
    name: 'Agent Vision',
    title: 'Content Strategy Agent',
    icon: Lightbulb,
    color: '#A855F7',
    status: 'active',
    efficiency: '94%',
    responsibilities: [
      'Content planning',
      'Trend prediction',
      'Audience targeting',
      'Programming strategy',
    ],
    metrics: {
      contentSuccessRate: '87%',
      engagementLift: '+24%',
      audienceGrowth: '+18%',
    },
  },
  {
    id: 'agent-pulse',
    name: 'Agent Pulse',
    title: 'Audience Intelligence Agent',
    icon: HeartPulse,
    color: '#3B82F6',
    status: 'active',
    efficiency: '91%',
    responsibilities: [
      'Audience analysis',
      'Behavioral tracking',
      'Viewer segmentation',
      'Retention prediction',
    ],
    metrics: {
      viewersAnalyzed: '180M',
      predictionAccuracy: '94%',
      retentionImprovement: '+22%',
    },
  },
  {
    id: 'agent-echo',
    name: 'Agent Echo',
    title: 'Social Media Agent',
    icon: MessageSquare,
    color: '#EC4899',
    status: 'active',
    efficiency: '89%',
    responsibilities: [
      'Community engagement',
      'Social monitoring',
      'Trend detection',
      'Viral opportunity identification',
    ],
    metrics: {
      postsManaged: '125,000',
      engagementGrowth: '+32%',
      reachExpansion: '+45%',
    },
  },
  {
    id: 'agent-monetize',
    name: 'Agent Monetize',
    title: 'Revenue Optimization Agent',
    icon: DollarSign,
    color: '#10B981',
    status: 'active',
    efficiency: '96%',
    responsibilities: [
      'Ad optimization',
      'Sponsorship management',
      'Revenue forecasting',
      'Monetization strategy',
    ],
    metrics: {
      revenueInfluenced: '$280M',
      roasImprovement: '+38%',
      yieldOptimization: '+29%',
    },
  },
  {
    id: 'agent-spotlight',
    name: 'Agent Spotlight',
    title: 'Creator & Talent Agent',
    icon: Star,
    color: '#F59E0B',
    status: 'active',
    efficiency: '92%',
    responsibilities: [
      'Creator performance',
      'Talent analytics',
      'Collaboration recommendations',
      'Contract intelligence',
    ],
    metrics: {
      creatorsManaged: '24,500',
      campaignSuccess: '94%',
      partnershipValue: '$8.4M',
    },
  },
];

const CONTENT_PIPELINE = [
  { stage: 'Idea', count: 342, status: 'pending', color: '#6B7280' },
  { stage: 'Production', count: 156, status: 'in-progress', color: '#3B82F6' },
  { stage: 'Editing', count: 89, status: 'in-progress', color: '#8B5CF6' },
  { stage: 'Review', count: 45, status: 'review', color: '#F59E0B' },
  { stage: 'Publishing', count: 23, status: 'publishing', color: '#10B981' },
  { stage: 'Distribution', count: 67, status: 'distributed', color: '#06B6D4' },
  { stage: 'Monetization', count: 234, status: 'monetized', color: '#EC4899' },
];

const AUDIENCE_SEGMENTS = [
  { name: 'Gen Z', size: '48M', engagement: '82%', growth: '+24%' },
  { name: 'Millennials', size: '62M', engagement: '78%', growth: '+18%' },
  { name: 'Gen X', size: '38M', engagement: '71%', growth: '+12%' },
  { name: 'Boomers', size: '32M', engagement: '65%', growth: '+8%' },
];

const STREAMING_METRICS = {
  liveViewers: '2.4M',
  concurrentStreams: '1.8M',
  watchTime: '5.8B hours',
  bufferingEvents: '0.3%',
  viewerRetention: '78%',
};

const REVENUE_METRICS = {
  adRevenue: '$1.8B',
  sponsorshipRevenue: '$180M',
  cpm: '$24.50',
  fillRate: '94%',
  yieldOptimization: '+29%',
};

const SOCIAL_METRICS = {
  followers: '45.2M',
  reach: '180M',
  impressions: '890M',
  shares: '12.4M',
  communityGrowth: '+18%',
};

const TOP_CONTENT = [
  { title: 'The Last Kingdom', views: '45M', engagement: '92%', completion: '78%' },
  { title: 'Cyber Chronicles', views: '38M', engagement: '89%', completion: '82%' },
  { title: 'Mystery Files', views: '32M', engagement: '87%', completion: '75%' },
  { title: 'Tech Revolution', views: '28M', engagement: '85%', completion: '71%' },
  { title: 'Nature Unveiled', views: '24M', engagement: '83%', completion: '68%' },
];

const AI_INSIGHTS = [
  {
    type: 'alert',
    icon: AlertTriangle,
    color: '#EF4444',
    title: 'Viewer Retention Drop',
    message: 'Viewer retention drops after minute 12 in Episode 5 of The Last Kingdom',
    impact: 'High',
    action: 'Review content pacing',
  },
  {
    type: 'opportunity',
    icon: TrendingUp,
    color: '#10B981',
    title: 'Gaming Audience Surge',
    message: 'Gaming audience segment increased engagement by 24% this week',
    impact: 'Medium',
    action: 'Increase gaming content',
  },
  {
    type: 'revenue',
    icon: DollarSign,
    color: '#F59E0B',
    title: 'Creator Partnership',
    message: 'Creator partnership opportunity detected worth $8.4M',
    impact: 'High',
    action: 'Initiate negotiations',
  },
  {
    type: 'optimization',
    icon: Zap,
    color: '#3B82F6',
    title: 'Ad Inventory Issue',
    message: 'Ad inventory utilization can improve by 11%',
    impact: 'Medium',
    action: 'Optimize ad placement',
  },
  {
    type: 'trend',
    icon: Flame,
    color: '#EC4899',
    title: 'True Crime Growth',
    message: 'Content category "True Crime" projected to grow 18% next quarter',
    impact: 'Medium',
    action: 'Expand true crime library',
  },
];

const REAL_TIME_ACTIVITY = [
  { event: 'Content published', time: '2 min ago', icon: Video, color: '#10B981' },
  { event: 'Video trending', time: '5 min ago', icon: Flame, color: '#F59E0B' },
  { event: 'Revenue milestone', time: '8 min ago', icon: DollarSign, color: '#10B981' },
  { event: 'Campaign launched', time: '12 min ago', icon: Rocket, color: '#3B82F6' },
  { event: 'Viewer spike', time: '15 min ago', icon: Users, color: '#EC4899' },
  { event: 'Creator onboarded', time: '18 min ago', icon: UserPlus, color: '#8B5CF6' },
  { event: 'Rights approved', time: '22 min ago', icon: CheckCircle, color: '#10B981' },
  { event: 'Viral trend', time: '25 min ago', icon: Sparkles, color: '#F59E0B' },
];

const GLOBAL_REGIONS = [
  { region: 'North America', audience: '52M', revenue: '$1.4B', growth: '+18%' },
  { region: 'Europe', audience: '48M', revenue: '$1.1B', growth: '+22%' },
  { region: 'Asia Pacific', audience: '62M', revenue: '$980M', growth: '+35%' },
  { region: 'Latin America', audience: '12M', revenue: '$85M', growth: '+28%' },
  { region: 'Middle East', audience: '6M', revenue: '$35M', growth: '+15%' },
];

const SYSTEM_HEALTH = {
  aiAgents: { status: 'healthy', uptime: '99.7%', performance: '94%' },
  streamingSystems: { status: 'healthy', uptime: '99.9%', performance: '96%' },
  contentDelivery: { status: 'healthy', uptime: '99.8%', performance: '95%' },
  recommendationEngine: { status: 'healthy', uptime: '99.6%', performance: '93%' },
  advertisingPlatform: { status: 'healthy', uptime: '99.5%', performance: '92%' },
};

const RIGHTS_LICENSING = [
  { title: 'The Last Kingdom', rights: 'Exclusive', territory: 'Global', expires: '2027-12-31', revenue: '$45M' },
  { title: 'Cyber Chronicles', rights: 'Non-Exclusive', territory: 'North America', expires: '2026-06-30', revenue: '$12M' },
  { title: 'Mystery Files', rights: 'Exclusive', territory: 'Europe', expires: '2028-03-15', revenue: '$28M' },
  { title: 'Tech Revolution', rights: 'Limited', territory: 'Asia Pacific', expires: '2026-09-01', revenue: '$8M' },
];

const CAMPAIGNS = [
  { name: 'Summer Blockbuster Launch', status: 'active', budget: '$2.4M', spent: '$1.8M', roi: '340%' },
  { name: 'Creator Partnership Program', status: 'active', budget: '$1.2M', spent: '$980K', roi: '280%' },
  { name: 'Q3 Content Push', status: 'planned', budget: '$3.6M', spent: '$0', roi: '-' },
  { name: 'Holiday Special Campaign', status: 'completed', budget: '$4.2M', spent: '$4.1M', roi: '420%' },
];

const CREATORS = [
  { name: 'TechVisionary', subscribers: '4.2M', revenue: '$1.2M', engagement: '92%', tier: 'Premium' },
  { name: 'GamingMaster', subscribers: '3.8M', revenue: '$980K', engagement: '89%', tier: 'Premium' },
  { name: 'LifestyleQueen', subscribers: '2.9M', revenue: '$720K', engagement: '86%', tier: 'Standard' },
  { name: 'MusicVibes', subscribers: '2.4M', revenue: '$580K', engagement: '84%', tier: 'Standard' },
];

const CONTENT_MATRIX = [
  { category: 'Drama', views: '45M', engagement: '92%', retention: '78%', revenue: '$12M' },
  { category: 'Comedy', views: '38M', engagement: '89%', retention: '82%', revenue: '$9.8M' },
  { category: 'Action', views: '32M', engagement: '87%', retention: '75%', revenue: '$8.5M' },
  { category: 'Documentary', views: '28M', engagement: '85%', retention: '71%', revenue: '$7.2M' },
  { category: 'Reality', views: '24M', engagement: '83%', retention: '68%', revenue: '$6.5M' },
];

const AUDIENCE_JOURNEY = [
  { stage: 'Discovery', users: '180M', conversion: '45%', avgTime: '2 min' },
  { stage: 'Engagement', users: '81M', conversion: '72%', avgTime: '8 min' },
  { stage: 'Subscription', users: '58M', conversion: '38%', avgTime: '5 min' },
  { stage: 'Retention', users: '22M', conversion: '85%', avgTime: '45 min' },
  { stage: 'Advocacy', users: '19M', conversion: '92%', avgTime: '30 min' },
];

const TREND_PREDICTIONS = [
  { trend: 'True Crime', growth: '+18%', confidence: '94%', timeframe: 'Q3 2026' },
  { trend: 'Gaming Content', growth: '+24%', confidence: '89%', timeframe: 'Q2 2026' },
  { trend: 'Short-Form Video', growth: '+35%', confidence: '91%', timeframe: 'Q4 2026' },
  { trend: 'Live Streaming', growth: '+28%', confidence: '87%', timeframe: 'Q3 2026' },
  { trend: 'Interactive Content', growth: '+42%', confidence: '85%', timeframe: 'Q4 2026' },
];

const RECOMMENDATION_GRID = [
  { type: 'Personalized', accuracy: '94%', clickRate: '12%', revenue: '$1.8B' },
  { type: 'Trending', accuracy: '89%', clickRate: '18%', revenue: '$980M' },
  { type: 'Collaborative', accuracy: '86%', clickRate: '9%', revenue: '$720M' },
  { type: 'Content-Based', accuracy: '82%', clickRate: '7%', revenue: '$580M' },
  { type: 'Hybrid', accuracy: '91%', clickRate: '15%', revenue: '$1.2B' },
];

const AUDIENCE_HEATMAP = [
  { region: 'North America', intensity: 0.95, audience: '52M' },
  { region: 'Europe', intensity: 0.88, audience: '48M' },
  { region: 'Asia Pacific', intensity: 0.92, audience: '62M' },
  { region: 'Latin America', intensity: 0.65, audience: '12M' },
  { region: 'Middle East', intensity: 0.45, audience: '6M' },
  { region: 'Africa', intensity: 0.38, audience: '4M' },
];

const STREAMING_INTELLIGENCE = [
  { metric: 'Concurrent Viewers', value: '2.4M', peak: '3.2M', trend: '+18%' },
  { metric: 'Bandwidth Usage', value: '8.5 TB/s', peak: '12 TB/s', trend: '+24%' },
  { metric: 'Buffer Rate', value: '0.3%', peak: '0.8%', trend: '-45%' },
  { metric: 'Avg Bitrate', value: '4.2 Mbps', peak: '8 Mbps', trend: '+12%' },
  { metric: 'Session Duration', value: '34 min', peak: '58 min', trend: '+8%' },
  { metric: 'Quality Score', value: '94%', peak: '98%', trend: '+5%' },
];

const NAVIGATION_ITEMS = [
  { id: 'executive', label: 'Executive Dashboard', icon: LayoutDashboard },
  { id: 'agents', label: 'AI Media Agents', icon: Brain },
  { id: 'studio', label: 'Content Studio', icon: Film },
  { id: 'audience', label: 'Audience Intelligence', icon: Users },
  { id: 'streaming', label: 'Streaming Analytics', icon: Radio },
  { id: 'revenue', label: 'Advertising & Revenue', icon: DollarSign },
  { id: 'social', label: 'Social Media Intelligence', icon: Share2 },
  { id: 'performance', label: 'Content Performance', icon: TrendingUp },
  { id: 'creators', label: 'Creator Management', icon: Star },
  { id: 'rights', label: 'Rights & Licensing', icon: Shield },
  { id: 'campaigns', label: 'Campaign Center', icon: Rocket },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const KPICard = ({ title, value, trend, icon: Icon, color, sparklineData }: any) => (
  <Animated.View entering={FadeInUp.delay(100).springify()} style={[styles.kpiCard, { borderLeftColor: color }]}>
    <View style={styles.kpiHeader}>
      <Icon size={20} color={color} />
      <Text style={styles.kpiTitle}>{title}</Text>
    </View>
    <Text style={styles.kpiValue}>{value}</Text>
    <View style={styles.kpiSparkline}>
      {sparklineData && sparklineData.map((point: number, index: number) => (
        <View
          key={index}
          style={[
            styles.sparklinePoint,
            {
              height: `${point * 100}%`,
              backgroundColor: color,
            },
          ]}
        />
      ))}
    </View>
    <View style={styles.kpiTrend}>
      <TrendingUp size={14} color="#10B981" />
      <Text style={styles.kpiTrendText}>{trend}</Text>
    </View>
  </Animated.View>
);

const AgentCard = ({ agent }: any) => (
  <Animated.View entering={FadeInUp.springify()} style={[styles.agentCard, { borderLeftColor: agent.color }]}>
    <View style={styles.agentHeader}>
      <View style={[styles.agentIconContainer, { backgroundColor: `${agent.color}20` }]}>
        <agent.icon size={24} color={agent.color} />
      </View>
      <View style={styles.agentInfo}>
        <Text style={styles.agentName}>{agent.name}</Text>
        <Text style={styles.agentTitle}>{agent.title}</Text>
      </View>
      <View style={[styles.agentStatus, { backgroundColor: agent.status === 'active' ? '#10B981' : '#EF4444' }]}>
        <Text style={styles.agentStatusText}>{agent.status}</Text>
      </View>
    </View>
    <Text style={styles.agentEfficiency}>Efficiency: {agent.efficiency}</Text>
    <View style={styles.agentMetrics}>
      {Object.entries(agent.metrics).map(([key, value]) => (
        <View key={key} style={styles.agentMetric}>
          <Text style={styles.agentMetricLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
          <Text style={styles.agentMetricValue}>{value as string}</Text>
        </View>
      ))}
    </View>
  </Animated.View>
);

const PipelineStage = ({ stage, count, status, color }: any) => (
  <View style={styles.pipelineStage}>
    <View style={styles.pipelineStageHeader}>
      <View style={[styles.pipelineDot, { backgroundColor: color }]} />
      <Text style={styles.pipelineStageName}>{stage}</Text>
      <Text style={styles.pipelineStageCount}>{count}</Text>
    </View>
    <View style={[styles.pipelineProgressBar, { backgroundColor: `${color}20` }]}>
      <View style={[styles.pipelineProgressFill, { backgroundColor: color, width: `${(count / 342) * 100}%` }]} />
    </View>
  </View>
);

const InsightCard = ({ insight }: any) => (
  <Animated.View entering={FadeInUp.springify()} style={[styles.insightCard, { borderLeftColor: insight.color }]}>
    <View style={styles.insightHeader}>
      <insight.icon size={20} color={insight.color} />
      <Text style={[styles.insightType, { color: insight.color }]}>{insight.type.toUpperCase()}</Text>
      <View style={[styles.insightImpact, { backgroundColor: `${insight.color}20` }]}>
        <Text style={[styles.insightImpactText, { color: insight.color }]}>{insight.impact}</Text>
      </View>
    </View>
    <Text style={styles.insightTitle}>{insight.title}</Text>
    <Text style={styles.insightMessage}>{insight.message}</Text>
    <TouchableOpacity style={styles.insightAction}>
      <Text style={styles.insightActionText}>{insight.action}</Text>
      <ArrowUpRight size={16} color="#3B82F6" />
    </TouchableOpacity>
  </Animated.View>
);

const ActivityItem = ({ activity }: any) => (
  <View style={styles.activityItem}>
    <View style={[styles.activityIcon, { backgroundColor: `${activity.color}20` }]}>
      <activity.icon size={16} color={activity.color} />
    </View>
    <Text style={styles.activityEvent}>{activity.event}</Text>
    <Text style={styles.activityTime}>{activity.time}</Text>
  </View>
);

const RegionCard = ({ region }: any) => (
  <View style={styles.regionCard}>
    <Text style={styles.regionName}>{region.region}</Text>
    <View style={styles.regionMetrics}>
      <View>
        <Text style={styles.regionMetricLabel}>Audience</Text>
        <Text style={styles.regionMetricValue}>{region.audience}</Text>
      </View>
      <View>
        <Text style={styles.regionMetricLabel}>Revenue</Text>
        <Text style={styles.regionMetricValue}>{region.revenue}</Text>
      </View>
      <View>
        <Text style={styles.regionMetricLabel}>Growth</Text>
        <Text style={[styles.regionMetricValue, { color: '#10B981' }]}>{region.growth}</Text>
      </View>
    </View>
  </View>
);

const SystemHealthCard = ({ system, health }: any) => (
  <View style={styles.healthCard}>
    <View style={styles.healthHeader}>
      <Text style={styles.healthSystem}>{system}</Text>
      <View style={[styles.healthStatus, { backgroundColor: health.status === 'healthy' ? '#10B98120' : '#EF444420' }]}>
        <View style={[styles.healthDot, { backgroundColor: health.status === 'healthy' ? '#10B981' : '#EF4444' }]} />
        <Text style={[styles.healthStatusText, { color: health.status === 'healthy' ? '#10B981' : '#EF4444' }]}>
          {health.status}
        </Text>
      </View>
    </View>
    <View style={styles.healthMetrics}>
      <View style={styles.healthMetric}>
        <Text style={styles.healthMetricLabel}>Uptime</Text>
        <Text style={styles.healthMetricValue}>{health.uptime}</Text>
      </View>
      <View style={styles.healthMetric}>
        <Text style={styles.healthMetricLabel}>Performance</Text>
        <Text style={styles.healthMetricValue}>{health.performance}</Text>
      </View>
    </View>
  </View>
);

const RightsCard = ({ item }: any) => (
  <View style={styles.rightsCard}>
    <View style={styles.rightsHeader}>
      <Text style={styles.rightsTitle}>{item.title}</Text>
      <View style={[styles.rightsBadge, { backgroundColor: item.rights === 'Exclusive' ? '#10B98120' : '#3B82F620' }]}>
        <Text style={[styles.rightsBadgeText, { color: item.rights === 'Exclusive' ? '#10B981' : '#3B82F6' }]}>{item.rights}</Text>
      </View>
    </View>
    <View style={styles.rightsDetails}>
      <View>
        <Text style={styles.rightsLabel}>Territory</Text>
        <Text style={styles.rightsValue}>{item.territory}</Text>
      </View>
      <View>
        <Text style={styles.rightsLabel}>Expires</Text>
        <Text style={styles.rightsValue}>{item.expires}</Text>
      </View>
      <View>
        <Text style={styles.rightsLabel}>Revenue</Text>
        <Text style={[styles.rightsValue, { color: '#10B981' }]}>{item.revenue}</Text>
      </View>
    </View>
  </View>
);

const CampaignCard = ({ campaign }: any) => (
  <View style={styles.campaignCard}>
    <View style={styles.campaignHeader}>
      <Text style={styles.campaignName}>{campaign.name}</Text>
      <View style={[styles.campaignStatus, { backgroundColor: campaign.status === 'active' ? '#10B98120' : campaign.status === 'completed' ? '#3B82F620' : '#F59E0B20' }]}>
        <Text style={[styles.campaignStatusText, { color: campaign.status === 'active' ? '#10B981' : campaign.status === 'completed' ? '#3B82F6' : '#F59E0B' }]}>{campaign.status}</Text>
      </View>
    </View>
    <View style={styles.campaignMetrics}>
      <View>
        <Text style={styles.campaignLabel}>Budget</Text>
        <Text style={styles.campaignValue}>{campaign.budget}</Text>
      </View>
      <View>
        <Text style={styles.campaignLabel}>Spent</Text>
        <Text style={styles.campaignValue}>{campaign.spent}</Text>
      </View>
      <View>
        <Text style={styles.campaignLabel}>ROI</Text>
        <Text style={[styles.campaignValue, { color: '#10B981' }]}>{campaign.roi}</Text>
      </View>
    </View>
  </View>
);

const CreatorCard = ({ creator }: any) => (
  <View style={styles.creatorCard}>
    <View style={styles.creatorHeader}>
      <View style={styles.creatorAvatar}>
        <Star size={20} color={creator.tier === 'Premium' ? '#F59E0B' : '#6B7280'} />
      </View>
      <View style={styles.creatorInfo}>
        <Text style={styles.creatorName}>{creator.name}</Text>
        <Text style={styles.creatorTier}>{creator.tier}</Text>
      </View>
    </View>
    <View style={styles.creatorMetrics}>
      <View>
        <Text style={styles.creatorLabel}>Subscribers</Text>
        <Text style={styles.creatorValue}>{creator.subscribers}</Text>
      </View>
      <View>
        <Text style={styles.creatorLabel}>Revenue</Text>
        <Text style={[styles.creatorValue, { color: '#10B981' }]}>{creator.revenue}</Text>
      </View>
      <View>
        <Text style={styles.creatorLabel}>Engagement</Text>
        <Text style={styles.creatorValue}>{creator.engagement}</Text>
      </View>
    </View>
  </View>
);

const NavigationItem = ({ item, isSelected, onPress }: any) => (
  <TouchableOpacity
    style={[styles.navItem, isSelected && styles.navItemSelected]}
    onPress={onPress}
  >
    <item.icon size={20} color={isSelected ? '#FFFFFF' : '#888888'} />
    <Text style={[styles.navItemText, isSelected && styles.navItemTextSelected]}>{item.label}</Text>
  </TouchableOpacity>
);

const MatrixCell = ({ item, index }: any) => (
  <View style={[styles.matrixCell, { borderLeftColor: index % 2 === 0 ? '#3B82F6' : '#8B5CF6' }]}>
    <Text style={styles.matrixCategory}>{item.category}</Text>
    <View style={styles.matrixMetrics}>
      <View style={styles.matrixMetric}>
        <Text style={styles.matrixLabel}>Views</Text>
        <Text style={styles.matrixValue}>{item.views}</Text>
      </View>
      <View style={styles.matrixMetric}>
        <Text style={styles.matrixLabel}>Engagement</Text>
        <Text style={[styles.matrixValue, { color: '#10B981' }]}>{item.engagement}</Text>
      </View>
      <View style={styles.matrixMetric}>
        <Text style={styles.matrixLabel}>Retention</Text>
        <Text style={styles.matrixValue}>{item.retention}</Text>
      </View>
      <View style={styles.matrixMetric}>
        <Text style={styles.matrixLabel}>Revenue</Text>
        <Text style={[styles.matrixValue, { color: '#F59E0B' }]}>{item.revenue}</Text>
      </View>
    </View>
  </View>
);

const JourneyStage = ({ stage, index }: any) => (
  <View style={styles.journeyStage}>
    <View style={[styles.journeyDot, { backgroundColor: index % 2 === 0 ? '#3B82F6' : '#8B5CF6' }]}>
      <Text style={styles.journeyDotNumber}>{index + 1}</Text>
    </View>
    <View style={styles.journeyContent}>
      <Text style={styles.journeyStageName}>{stage.stage}</Text>
      <View style={styles.journeyMetrics}>
        <View>
          <Text style={styles.journeyLabel}>Users</Text>
          <Text style={styles.journeyValue}>{stage.users}</Text>
        </View>
        <View>
          <Text style={styles.journeyLabel}>Conversion</Text>
          <Text style={[styles.journeyValue, { color: '#10B981' }]}>{stage.conversion}</Text>
        </View>
        <View>
          <Text style={styles.journeyLabel}>Avg Time</Text>
          <Text style={styles.journeyValue}>{stage.avgTime}</Text>
        </View>
      </View>
    </View>
    {index < AUDIENCE_JOURNEY.length - 1 && <View style={styles.journeyConnector} />}
  </View>
);

const TrendPredictionCard = ({ prediction }: any) => (
  <View style={styles.trendCard}>
    <View style={styles.trendHeader}>
      <Flame size={20} color="#F59E0B" />
      <Text style={styles.trendName}>{prediction.trend}</Text>
    </View>
    <View style={styles.trendMetrics}>
      <View>
        <Text style={styles.trendLabel}>Growth</Text>
        <Text style={[styles.trendValue, { color: '#10B981' }]}>{prediction.growth}</Text>
      </View>
      <View>
        <Text style={styles.trendLabel}>Confidence</Text>
        <Text style={styles.trendValue}>{prediction.confidence}</Text>
      </View>
      <View>
        <Text style={styles.trendLabel}>Timeframe</Text>
        <Text style={styles.trendValue}>{prediction.timeframe}</Text>
      </View>
    </View>
  </View>
);

const RecommendationCard = ({ rec }: any) => (
  <View style={styles.recCard}>
    <View style={styles.recHeader}>
      <Sparkles size={20} color="#8B5CF6" />
      <Text style={styles.recType}>{rec.type}</Text>
    </View>
    <View style={styles.recMetrics}>
      <View>
        <Text style={styles.recLabel}>Accuracy</Text>
        <Text style={[styles.recValue, { color: '#10B981' }]}>{rec.accuracy}</Text>
      </View>
      <View>
        <Text style={styles.recLabel}>Click Rate</Text>
        <Text style={styles.recValue}>{rec.clickRate}</Text>
      </View>
      <View>
        <Text style={styles.recLabel}>Revenue</Text>
        <Text style={[styles.recValue, { color: '#F59E0B' }]}>{rec.revenue}</Text>
      </View>
    </View>
  </View>
);

const HeatmapRegion = ({ region }: any) => (
  <View style={styles.heatmapRegion}>
    <View style={[styles.heatmapBar, { width: `${region.intensity * 100}%`, backgroundColor: `rgba(59, 130, 246, ${region.intensity})` }]} />
    <View style={styles.heatmapInfo}>
      <Text style={styles.heatmapRegionName}>{region.region}</Text>
      <Text style={styles.heatmapAudience}>{region.audience}</Text>
    </View>
  </View>
);

const StreamingMetric = ({ metric }: any) => (
  <View style={styles.streamingMetric}>
    <View style={styles.streamingMetricHeader}>
      <Activity size={16} color="#3B82F6" />
      <Text style={styles.streamingMetricName}>{metric.metric}</Text>
    </View>
    <View style={styles.streamingMetricValues}>
      <View>
        <Text style={styles.streamingMetricLabel}>Current</Text>
        <Text style={styles.streamingMetricValue}>{metric.value}</Text>
      </View>
      <View>
        <Text style={styles.streamingMetricLabel}>Peak</Text>
        <Text style={styles.streamingMetricValue}>{metric.peak}</Text>
      </View>
      <View>
        <Text style={styles.streamingMetricLabel}>Trend</Text>
        <Text style={[styles.streamingMetricValue, { color: metric.trend.startsWith('+') ? '#10B981' : '#EF4444' }]}>{metric.trend}</Text>
      </View>
    </View>
  </View>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function MediaCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedSection, setSelectedSection] = useState('executive');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
            <Menu size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Media & Entertainment</Text>
            <Text style={styles.headerSubtitle}>AI Command Center</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Bell size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Left Navigation Sidebar */}
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Navigation</Text>
            <TouchableOpacity onPress={() => setSidebarOpen(false)} style={styles.closeSidebar}>
              <X size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.sidebarContent}>
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                isSelected={selectedSection === item.id}
                onPress={() => {
                  setSelectedSection(item.id);
                  setSidebarOpen(false);
                }}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Executive KPI Bar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive KPIs</Text>
          
          <View style={styles.kpiRow}>
            <KPICard
              title="Total Audience"
              value={EXECUTIVE_KPIS.audience.totalAudience}
              trend={EXECUTIVE_KPIS.audience.trend}
              icon={Users}
              color="#3B82F6"
              sparklineData={EXECUTIVE_KPIS.audience.sparkline}
            />
            <KPICard
              title="Monthly Watch Hours"
              value={EXECUTIVE_KPIS.audience.watchTime}
              trend={EXECUTIVE_KPIS.audience.trend}
              icon={Clock}
              color="#8B5CF6"
              sparklineData={EXECUTIVE_KPIS.audience.sparkline}
            />
          </View>

          <View style={styles.kpiRow}>
            <KPICard
              title="Total Revenue"
              value={EXECUTIVE_KPIS.revenue.totalRevenue}
              trend={EXECUTIVE_KPIS.revenue.trend}
              icon={DollarSign}
              color="#10B981"
              sparklineData={EXECUTIVE_KPIS.revenue.sparkline}
            />
            <KPICard
              title="Active Creators"
              value="24,500"
              trend="+12%"
              icon={Star}
              color="#F59E0B"
              sparklineData={EXECUTIVE_KPIS.content.sparkline}
            />
          </View>

          <View style={styles.kpiRow}>
            <KPICard
              title="Subscriber Growth"
              value="+18%"
              trend="+5%"
              icon={TrendingUp}
              color="#EC4899"
              sparklineData={EXECUTIVE_KPIS.social.sparkline}
            />
            <KPICard
              title="AI Revenue Impact"
              value={EXECUTIVE_KPIS.ai.aiRevenueImpact}
              trend="+35%"
              icon={Brain}
              color="#06B6D4"
              sparklineData={EXECUTIVE_KPIS.ai.sparkline}
            />
          </View>
        </View>

        {/* AI Media Agents */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AI Media Agents</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All</Text>
              <ArrowUpRight size={16} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            {AI_MEDIA_AGENTS.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </ScrollView>
        </View>

        {/* Chief Media Officer Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chief Media Officer Command Center</Text>
          
          <View style={styles.commandCenter}>
            <View style={styles.commandMetric}>
              <Text style={styles.commandMetricLabel}>Total Audience</Text>
              <Text style={styles.commandMetricValue}>180M</Text>
              <Text style={[styles.commandMetricTrend, { color: '#10B981' }]}>+18%</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={styles.commandMetricLabel}>Monthly Watch Hours</Text>
              <Text style={styles.commandMetricValue}>5.8B</Text>
              <Text style={[styles.commandMetricTrend, { color: '#10B981' }]}>+24%</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={styles.commandMetricLabel}>Revenue</Text>
              <Text style={styles.commandMetricValue}>$3.6B</Text>
              <Text style={[styles.commandMetricTrend, { color: '#10B981' }]}>+24%</Text>
            </View>
            <View style={styles.commandMetric}>
              <Text style={styles.commandMetricLabel}>Active Creators</Text>
              <Text style={styles.commandMetricValue}>24,500</Text>
              <Text style={[styles.commandMetricTrend, { color: '#10B981' }]}>+12%</Text>
            </View>
          </View>
        </View>

        {/* Content Studio Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Studio Command Center</Text>
          
          <View style={styles.contentPipeline}>
            {CONTENT_PIPELINE.map((stage) => (
              <PipelineStage key={stage.stage} {...stage} />
            ))}
          </View>

          <View style={styles.workflowLegend}>
            <Text style={styles.workflowTitle}>Content Workflow</Text>
            <View style={styles.workflowSteps}>
              <Text style={styles.workflowStep}>Idea → Production → Editing → Review → Publishing → Distribution → Monetization</Text>
            </View>
          </View>
        </View>

        {/* Audience Intelligence Hub */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audience Intelligence Hub</Text>
          
          <View style={styles.audienceSegments}>
            {AUDIENCE_SEGMENTS.map((segment) => (
              <View key={segment.name} style={styles.segmentCard}>
                <Text style={styles.segmentName}>{segment.name}</Text>
                <Text style={styles.segmentSize}>{segment.size}</Text>
                <View style={styles.segmentMetrics}>
                  <View>
                    <Text style={styles.segmentMetricLabel}>Engagement</Text>
                    <Text style={styles.segmentMetricValue}>{segment.engagement}</Text>
                  </View>
                  <View>
                    <Text style={styles.segmentMetricLabel}>Growth</Text>
                    <Text style={[styles.segmentMetricValue, { color: '#10B981' }]}>{segment.growth}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Streaming Analytics Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streaming Analytics Center</Text>
          
          <View style={styles.streamingGrid}>
            <View style={styles.streamingCard}>
              <Radio size={24} color="#3B82F6" />
              <Text style={styles.streamingLabel}>Live Viewers</Text>
              <Text style={styles.streamingValue}>{STREAMING_METRICS.liveViewers}</Text>
            </View>
            <View style={styles.streamingCard}>
              <Wifi size={24} color="#8B5CF6" />
              <Text style={styles.streamingLabel}>Concurrent Streams</Text>
              <Text style={styles.streamingValue}>{STREAMING_METRICS.concurrentStreams}</Text>
            </View>
            <View style={styles.streamingCard}>
              <Clock size={24} color="#10B981" />
              <Text style={styles.streamingLabel}>Watch Time</Text>
              <Text style={styles.streamingValue}>{STREAMING_METRICS.watchTime}</Text>
            </View>
            <View style={styles.streamingCard}>
              <Activity size={24} color="#F59E0B" />
              <Text style={styles.streamingLabel}>Buffering Events</Text>
              <Text style={styles.streamingValue}>{STREAMING_METRICS.bufferingEvents}</Text>
            </View>
            <View style={styles.streamingCard}>
              <Users size={24} color="#EC4899" />
              <Text style={styles.streamingLabel}>Viewer Retention</Text>
              <Text style={styles.streamingValue}>{STREAMING_METRICS.viewerRetention}</Text>
            </View>
          </View>
        </View>

        {/* Advertising & Revenue Engine */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advertising & Revenue Engine</Text>
          
          <View style={styles.revenueGrid}>
            <View style={styles.revenueCard}>
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.revenueLabel}>Ad Revenue</Text>
              <Text style={styles.revenueValue}>{REVENUE_METRICS.adRevenue}</Text>
            </View>
            <View style={styles.revenueCard}>
              <Award size={24} color="#F59E0B" />
              <Text style={styles.revenueLabel}>Sponsorship Revenue</Text>
              <Text style={styles.revenueValue}>{REVENUE_METRICS.sponsorshipRevenue}</Text>
            </View>
            <View style={styles.revenueCard}>
              <BarChart3 size={24} color="#3B82F6" />
              <Text style={styles.revenueLabel}>CPM</Text>
              <Text style={styles.revenueValue}>{REVENUE_METRICS.cpm}</Text>
            </View>
            <View style={styles.revenueCard}>
              <PieChart size={24} color="#8B5CF6" />
              <Text style={styles.revenueLabel}>Fill Rate</Text>
              <Text style={styles.revenueValue}>{REVENUE_METRICS.fillRate}</Text>
            </View>
            <View style={styles.revenueCard}>
              <TrendingUp size={24} color="#EC4899" />
              <Text style={styles.revenueLabel}>Yield Optimization</Text>
              <Text style={[styles.revenueValue, { color: '#10B981' }]}>{REVENUE_METRICS.yieldOptimization}</Text>
            </View>
          </View>
        </View>

        {/* Social Media Intelligence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Media Intelligence</Text>
          
          <View style={styles.socialGrid}>
            <View style={styles.socialCard}>
              <Users size={24} color="#3B82F6" />
              <Text style={styles.socialLabel}>Followers</Text>
              <Text style={styles.socialValue}>{SOCIAL_METRICS.followers}</Text>
            </View>
            <View style={styles.socialCard}>
              <Eye size={24} color="#8B5CF6" />
              <Text style={styles.socialLabel}>Reach</Text>
              <Text style={styles.socialValue}>{SOCIAL_METRICS.reach}</Text>
            </View>
            <View style={styles.socialCard}>
              <Sparkles size={24} color="#F59E0B" />
              <Text style={styles.socialLabel}>Impressions</Text>
              <Text style={styles.socialValue}>{SOCIAL_METRICS.impressions}</Text>
            </View>
            <View style={styles.socialCard}>
              <Share2 size={24} color="#EC4899" />
              <Text style={styles.socialLabel}>Shares</Text>
              <Text style={styles.socialValue}>{SOCIAL_METRICS.shares}</Text>
            </View>
            <View style={styles.socialCard}>
              <TrendingUp size={24} color="#10B981" />
              <Text style={styles.socialLabel}>Community Growth</Text>
              <Text style={[styles.socialValue, { color: '#10B981' }]}>{SOCIAL_METRICS.communityGrowth}</Text>
            </View>
          </View>
        </View>

        {/* Content Performance Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Performance Center</Text>
          
          <View style={styles.contentList}>
            {TOP_CONTENT.map((content, index) => (
              <View key={index} style={styles.contentItem}>
                <View style={styles.contentRank}>
                  <Text style={styles.contentRankText}>{index + 1}</Text>
                </View>
                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle}>{content.title}</Text>
                  <View style={styles.contentMetrics}>
                    <Text style={styles.contentMetric}>{content.views} views</Text>
                    <Text style={styles.contentMetric}>{content.engagement} engagement</Text>
                    <Text style={styles.contentMetric}>{content.completion} completion</Text>
                  </View>
                </View>
                <Flame size={20} color="#F59E0B" />
              </View>
            ))}
          </View>
        </View>

        {/* AI Insights Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights Center</Text>
          
          <View style={styles.insightsGrid}>
            {AI_INSIGHTS.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </View>
        </View>

        {/* Real-Time Media Activity Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-Time Media Activity</Text>
          
          <View style={styles.activityFeed}>
            {REAL_TIME_ACTIVITY.map((activity, index) => (
              <ActivityItem key={index} activity={activity} />
            ))}
          </View>
        </View>

        {/* Global Media Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Media Operations</Text>
          
          <View style={styles.regionsGrid}>
            {GLOBAL_REGIONS.map((region) => (
              <RegionCard key={region.region} region={region} />
            ))}
          </View>
        </View>

        {/* Rights & Licensing Command Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rights & Licensing Command Center</Text>
          
          <View style={styles.rightsGrid}>
            {RIGHTS_LICENSING.map((item, index) => (
              <RightsCard key={index} item={item} />
            ))}
          </View>
        </View>

        {/* Campaign Performance Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campaign Performance Center</Text>
          
          <View style={styles.campaignsGrid}>
            {CAMPAIGNS.map((campaign, index) => (
              <CampaignCard key={index} campaign={campaign} />
            ))}
          </View>
        </View>

        {/* Creator & Talent Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Creator & Talent Management</Text>
          
          <View style={styles.creatorsGrid}>
            {CREATORS.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </View>
        </View>

        {/* Content Performance Matrix */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Performance Matrix</Text>
          
          <View style={styles.matrixGrid}>
            {CONTENT_MATRIX.map((item, index) => (
              <MatrixCell key={index} item={item} index={index} />
            ))}
          </View>
        </View>

        {/* Audience Journey Visualization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audience Journey Visualization</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.journeyScroll}>
            <View style={styles.journeyContainer}>
              {AUDIENCE_JOURNEY.map((stage, index) => (
                <JourneyStage key={index} stage={stage} index={index} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Trend Prediction Center */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trend Prediction Center</Text>
          
          <View style={styles.trendsGrid}>
            {TREND_PREDICTIONS.map((prediction, index) => (
              <TrendPredictionCard key={index} prediction={prediction} />
            ))}
          </View>
        </View>

        {/* Recommendation Intelligence Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendation Intelligence Grid</Text>
          
          <View style={styles.recGrid}>
            {RECOMMENDATION_GRID.map((rec, index) => (
              <RecommendationCard key={index} rec={rec} />
            ))}
          </View>
        </View>

        {/* Global Audience Heatmap */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Global Audience Heatmap</Text>
          
          <View style={styles.heatmapContainer}>
            {AUDIENCE_HEATMAP.map((region, index) => (
              <HeatmapRegion key={index} region={region} />
            ))}
          </View>
        </View>

        {/* Streaming Intelligence Wall */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streaming Intelligence Wall</Text>
          
          <View style={styles.streamingWall}>
            {STREAMING_INTELLIGENCE.map((metric, index) => (
              <StreamingMetric key={index} metric={metric} />
            ))}
          </View>
        </View>

        {/* System Health & AI Infrastructure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Health & AI Infrastructure</Text>
          
          <View style={styles.healthGrid}>
            {Object.entries(SYSTEM_HEALTH).map(([system, health]) => (
              <SystemHealthCard key={system} system={system.replace(/([A-Z])/g, ' $1').trim()} health={health} />
            ))}
          </View>
        </View>

        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040404',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0A0A0A',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888888',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
  },
  kpiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  kpiTitle: {
    fontSize: 12,
    color: '#888888',
    fontWeight: '500',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  kpiTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  kpiTrendText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  kpiSparkline: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 30,
    gap: 3,
    marginBottom: 8,
  },
  sparklinePoint: {
    flex: 1,
    borderRadius: 2,
    minWidth: 3,
  },
  agentsScroll: {
    flexDirection: 'row',
  },
  agentCard: {
    width: 280,
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    borderLeftWidth: 3,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  agentTitle: {
    fontSize: 12,
    color: '#888888',
  },
  agentStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  agentStatusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  agentEfficiency: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 12,
  },
  agentMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  agentMetric: {
    flex: 1,
    minWidth: '45%',
  },
  agentMetricLabel: {
    fontSize: 10,
    color: '#666666',
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  commandCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  commandMetric: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  commandMetricLabel: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 4,
  },
  commandMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  commandMetricTrend: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentPipeline: {
    gap: 12,
  },
  pipelineStage: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  pipelineStageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pipelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  pipelineStageName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pipelineStageCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  pipelineProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  pipelineProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  workflowLegend: {
    marginTop: 16,
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  workflowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  workflowSteps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  workflowStep: {
    fontSize: 12,
    color: '#888888',
  },
  audienceSegments: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  segmentCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  segmentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  segmentSize: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 12,
  },
  segmentMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  segmentMetricLabel: {
    fontSize: 10,
    color: '#888888',
  },
  segmentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  streamingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  streamingCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  streamingLabel: {
    fontSize: 10,
    color: '#888888',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  streamingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  revenueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  revenueCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  revenueLabel: {
    fontSize: 10,
    color: '#888888',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  socialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  socialLabel: {
    fontSize: 10,
    color: '#888888',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  socialValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contentList: {
    gap: 8,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  contentRank: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentRankText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  contentMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  contentMetric: {
    fontSize: 12,
    color: '#888888',
  },
  insightsGrid: {
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightType: {
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 8,
    marginRight: 8,
  },
  insightImpact: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  insightMessage: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 12,
  },
  insightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insightActionText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
  activityFeed: {
    gap: 8,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 12,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityEvent: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
  },
  activityTime: {
    fontSize: 12,
    color: '#888888',
  },
  regionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  regionCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  regionName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  regionMetrics: {
    gap: 8,
  },
  regionMetricLabel: {
    fontSize: 10,
    color: '#888888',
  },
  regionMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  healthCard: {
    flex: 1,
    minWidth: '31%',
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  healthSystem: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  healthStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  healthDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  healthStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  healthMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  healthMetric: {
    flex: 1,
  },
  healthMetricLabel: {
    fontSize: 10,
    color: '#888888',
  },
  healthMetricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    height: 40,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
    marginRight: 8,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: '#0A0A0A',
    borderRightWidth: 1,
    borderRightColor: '#1A1A1A',
    zIndex: 1000,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeSidebar: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  navItemSelected: {
    backgroundColor: '#1A1A1A',
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  navItemText: {
    fontSize: 14,
    color: '#888888',
  },
  navItemTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rightsGrid: {
    gap: 12,
  },
  rightsCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  rightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rightsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  rightsBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  rightsDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  rightsLabel: {
    fontSize: 10,
    color: '#888888',
  },
  rightsValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  campaignsGrid: {
    gap: 12,
  },
  campaignCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  campaignName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  campaignStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  campaignStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  campaignMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  campaignLabel: {
    fontSize: 10,
    color: '#888888',
  },
  campaignValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  creatorsGrid: {
    gap: 12,
  },
  creatorCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  creatorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  creatorTier: {
    fontSize: 12,
    color: '#888888',
  },
  creatorMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  creatorLabel: {
    fontSize: 10,
    color: '#888888',
  },
  creatorValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  matrixGrid: {
    gap: 12,
  },
  matrixCell: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 3,
  },
  matrixCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  matrixMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  matrixMetric: {
    flex: 1,
  },
  matrixLabel: {
    fontSize: 10,
    color: '#888888',
  },
  matrixValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  journeyScroll: {
    flexDirection: 'row',
  },
  journeyContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  journeyStage: {
    alignItems: 'center',
    marginRight: 24,
  },
  journeyDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  journeyDotNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  journeyContent: {
    width: 140,
  },
  journeyStageName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  journeyMetrics: {
    gap: 4,
  },
  journeyLabel: {
    fontSize: 9,
    color: '#888888',
  },
  journeyValue: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  journeyConnector: {
    width: 24,
    height: 2,
    backgroundColor: '#1A1A1A',
    marginTop: -20,
  },
  trendsGrid: {
    gap: 12,
  },
  trendCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  trendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  trendMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  trendLabel: {
    fontSize: 10,
    color: '#888888',
  },
  trendValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recGrid: {
    gap: 12,
  },
  recCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  recLabel: {
    fontSize: 10,
    color: '#888888',
  },
  recValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heatmapContainer: {
    gap: 12,
  },
  heatmapRegion: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  heatmapBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  heatmapInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heatmapRegionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heatmapAudience: {
    fontSize: 12,
    color: '#888888',
  },
  streamingWall: {
    gap: 12,
  },
  streamingMetric: {
    backgroundColor: '#0A0A0A',
    borderRadius: 12,
    padding: 16,
  },
  streamingMetricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  streamingMetricName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  streamingMetricValues: {
    flexDirection: 'row',
    gap: 16,
  },
  streamingMetricLabel: {
    fontSize: 10,
    color: '#888888',
  },
  streamingMetricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
