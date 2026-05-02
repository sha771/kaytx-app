 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  TrendingUp,
  ChartBar,
  Users,
  Target,
  Eye,
  MousePointer,
  DollarSign,
  Calendar,
  ListFilter,
  Download,
  Lightbulb,
  TriangleAlert,
  CircleCheck,
  ArrowUp,
  ArrowDown,
  Activity,
  Zap,
  Mail,
  MessageSquare,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface MarketingInsight {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'audience' | 'content' | 'channels' | 'conversion';
  recommendation: string;
  potentialGain: string;
  effort: 'low' | 'medium' | 'high';
  priority: number;
  dataPoints: string[];
}

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
  insight?: string;
}

interface ChannelPerformance {
  id: string;
  name: string;
  type: 'email' | 'social' | 'paid' | 'organic' | 'direct';
  metrics: {
    reach: number;
    engagement: number;
    conversion: number;
    roi: number;
    cost: number;
  };
  trend: 'up' | 'down' | 'stable';
  insights: string[];
}

const marketingInsights: MarketingInsight[] = [
  {
    id: '1',
    title: 'Mobile Conversion Opportunity',
    description: 'Mobile traffic accounts for 68% of visits but only 32% of conversions',
    impact: 'high',
    category: 'conversion',
    recommendation: 'Optimize mobile checkout flow and implement one-click purchasing',
    potentialGain: '+$45K monthly revenue',
    effort: 'medium',
    priority: 1,
    dataPoints: ['68% mobile traffic', '32% mobile conversions', '2.1x desktop conversion rate'],
  },
  {
    id: '2',
    title: 'Email Engagement Decline',
    description: 'Email open rates dropped 15% over the last 3 months',
    impact: 'medium',
    category: 'channels',
    recommendation: 'A/B test subject lines and send time optimization',
    potentialGain: '+12% open rate',
    effort: 'low',
    priority: 2,
    dataPoints: ['15% decline in opens', '8% decline in clicks', 'Industry avg: 22%'],
  },
  {
    id: '3',
    title: 'High-Value Audience Segment',
    description: 'Users from organic search have 3x higher lifetime value',
    impact: 'high',
    category: 'audience',
    recommendation: 'Increase SEO investment and create targeted content',
    potentialGain: '+$78K quarterly',
    effort: 'high',
    priority: 3,
    dataPoints: ['3x higher LTV', '45% better retention', '2.8x conversion rate'],
  },
  {
    id: '4',
    title: 'Content Performance Gap',
    description: 'Video content generates 5x more engagement than static posts',
    impact: 'medium',
    category: 'content',
    recommendation: 'Shift content strategy to focus 60% on video content',
    potentialGain: '+35% engagement',
    effort: 'medium',
    priority: 4,
    dataPoints: ['5x more engagement', '3x more shares', '2x longer session time'],
  },
];

const analyticsMetrics: AnalyticsMetric[] = [
  {
    title: 'Total Revenue',
    value: '$127,450',
    change: '+18.5%',
    trend: 'up',
    icon: DollarSign,
    color: '#34C759',
    insight: 'Strong growth driven by mobile optimization',
  },
  {
    title: 'Conversion Rate',
    value: '3.8%',
    change: '+0.7%',
    trend: 'up',
    icon: Target,
    color: '#007AFF',
    insight: 'Above industry average of 2.9%',
  },
  {
    title: 'Customer Acquisition Cost',
    value: '$42',
    change: '-$8',
    trend: 'up',
    icon: Users,
    color: '#FF9500',
    insight: 'Improved efficiency in paid channels',
  },
  {
    title: 'Email Open Rate',
    value: '24.2%',
    change: '-2.1%',
    trend: 'down',
    icon: Mail,
    color: '#FF3B30',
    insight: 'Needs attention - below industry benchmark',
  },
];

const channelPerformance: ChannelPerformance[] = [
  {
    id: '1',
    name: 'Email Marketing',
    type: 'email',
    metrics: {
      reach: 15420,
      engagement: 24.2,
      conversion: 4.8,
      roi: 420,
      cost: 2400,
    },
    trend: 'down',
    insights: ['Open rates declining', 'High ROI channel', 'Mobile optimization needed'],
  },
  {
    id: '2',
    name: 'Social Media',
    type: 'social',
    metrics: {
      reach: 45200,
      engagement: 8.7,
      conversion: 2.1,
      roi: 180,
      cost: 5600,
    },
    trend: 'up',
    insights: ['Video content performing well', 'Instagram driving most traffic', 'Low conversion rate'],
  },
  {
    id: '3',
    name: 'Paid Search',
    type: 'paid',
    metrics: {
      reach: 28900,
      engagement: 12.4,
      conversion: 6.2,
      roi: 340,
      cost: 8900,
    },
    trend: 'stable',
    insights: ['High conversion rate', 'Expensive but effective', 'Brand keywords performing best'],
  },
];

export default function MarketingAnalyticsInsightsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'insights' | 'analytics' | 'channels'>('insights');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return theme.colors.secondaryText;
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return '#34C759';
      case 'medium': return '#FF9500';
      case 'high': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'social': return MessageSquare;
      case 'paid': return Target;
      case 'organic': return TrendingUp;
      case 'direct': return Activity;
      default: return ChartBarBig;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      default: return Activity;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#34C759';
      case 'down': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredInsights = marketingInsights.filter(insight => 
    selectedCategory === 'all' || insight.category === selectedCategory
  ).sort((a, b) => a.priority - b.priority);

  const renderInsight = ({ item }: { item: MarketingInsight }) => {
    const impactColor = getImpactColor(item.impact);
    const effortColor = getEffortColor(item.effort);
    
    return (
      <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.insightHeader}>
          <View style={styles.insightTitleContainer}>
            <Lightbulb size={20} color={theme.colors.primary} />
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{item.title}</Text>
          </View>
          <View style={styles.insightBadges}>
            <View style={[styles.impactBadge, { backgroundColor: impactColor + '20' }]}>
              <Text style={[styles.badgeText, { color: impactColor }]}>
                {item.impact.toUpperCase()}
              </Text>
            </View>
            <View style={[styles.effortBadge, { backgroundColor: effortColor + '20' }]}>
              <Text style={[styles.badgeText, { color: effortColor }]}>
                {item.effort.toUpperCase()} EFFORT
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={[styles.insightDescription, { color: theme.colors.secondaryText }]}>
          {item.description}
        </Text>
        
        <View style={styles.dataPoints}>
          {item.dataPoints.map((point, index) => (
            <View key={index} style={styles.dataPoint}>
              <View style={[styles.dataDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.dataPointText, { color: theme.colors.secondaryText }]}>
                {point}
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.insightRecommendation}>
          <Text style={[styles.recommendationLabel, { color: theme.colors.text }]}>
            Recommendation:
          </Text>
          <Text style={[styles.recommendationText, { color: theme.colors.secondaryText }]}>
            {item.recommendation}
          </Text>
        </View>
        
        <View style={styles.insightFooter}>
          <Text style={[styles.potentialGain, { color: '#34C759' }]}>
            {item.potentialGain}
          </Text>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.actionButtonText}>Take Action</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMetric = ({ item }: { item: AnalyticsMetric }) => {
    const IconComponent = item.icon;
    const TrendIcon = getTrendIcon(item.trend);
    const trendColor = getTrendColor(item.trend);
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <View style={styles.metricTrend}>
            <TrendIcon size={12} color={trendColor} />
            <Text style={[styles.metricChange, { color: trendColor }]}>
              {item.change}
            </Text>
          </View>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
        {item.insight && (
          <Text style={[styles.metricInsight, { color: theme.colors.secondaryText }]}>
            {item.insight}
          </Text>
        )}
      </View>
    );
  };

  const renderChannel = ({ item }: { item: ChannelPerformance }) => {
    const IconComponent = getChannelIcon(item.type);
    const TrendIcon = getTrendIcon(item.trend);
    const trendColor = getTrendColor(item.trend);
    
    return (
      <View style={[styles.channelCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.channelHeader}>
          <View style={styles.channelInfo}>
            <View style={[styles.channelIcon, { backgroundColor: theme.colors.primary + '20' }]}>
              <IconComponent size={20} color={theme.colors.primary} />
            </View>
            <Text style={[styles.channelName, { color: theme.colors.text }]}>{item.name}</Text>
          </View>
          <View style={styles.channelTrend}>
            <TrendIcon size={16} color={trendColor} />
          </View>
        </View>
        
        <View style={styles.channelMetrics}>
          <View style={styles.channelMetric}>
            <Text style={[styles.channelMetricValue, { color: theme.colors.text }]}>
              {item.metrics.reach.toLocaleString()}
            </Text>
            <Text style={[styles.channelMetricLabel, { color: theme.colors.secondaryText }]}>Reach</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={[styles.channelMetricValue, { color: theme.colors.text }]}>
              {item.metrics.engagement}%
            </Text>
            <Text style={[styles.channelMetricLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={[styles.channelMetricValue, { color: theme.colors.text }]}>
              {item.metrics.conversion}%
            </Text>
            <Text style={[styles.channelMetricLabel, { color: theme.colors.secondaryText }]}>Conversion</Text>
          </View>
          <View style={styles.channelMetric}>
            <Text style={[styles.channelMetricValue, { color: '#34C759' }]}>
              {item.metrics.roi}%
            </Text>
            <Text style={[styles.channelMetricLabel, { color: theme.colors.secondaryText }]}>ROI</Text>
          </View>
        </View>
        
        <View style={styles.channelInsights}>
          <Text style={[styles.channelInsightsTitle, { color: theme.colors.text }]}>Key Insights:</Text>
          {item.insights.map((insight, index) => (
            <View key={index} style={styles.channelInsight}>
              <View style={[styles.insightDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.channelInsightText, { color: theme.colors.secondaryText }]}>
                {insight}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderInsights = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Category Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilter}>
        {['all', 'performance', 'audience', 'content', 'channels', 'conversion'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                {
                  color: selectedCategory === category ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredInsights}
        renderItem={renderInsight}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.insightsList}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={analyticsMetrics}
        renderItem={renderMetric}
        keyExtractor={(item) => item.title}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.metricsContainer}
      />
    </ScrollView>
  );

  const renderChannels = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={channelPerformance}
        renderItem={renderChannel}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.channelsList}
      />
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Marketing Analytics & Insights</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Download size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['insights', 'analytics', 'channels'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {selectedTab === 'insights' && renderInsights()}
      {selectedTab === 'analytics' && renderAnalytics()}
      {selectedTab === 'channels' && renderChannels()}
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
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categoryFilter: {
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  insightsList: {
    gap: 16,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  insightBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  impactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  effortBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  dataPoints: {
    marginBottom: 12,
  },
  dataPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dataDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  dataPointText: {
    fontSize: 12,
  },
  insightRecommendation: {
    marginBottom: 16,
  },
  recommendationLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  potentialGain: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  metricInsight: {
    fontSize: 11,
    lineHeight: 14,
  },
  channelsList: {
    gap: 16,
  },
  channelCard: {
    padding: 16,
    borderRadius: 12,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelName: {
    fontSize: 16,
    fontWeight: '600',
  },
  channelTrend: {},
  channelMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  channelMetric: {
    alignItems: 'center',
  },
  channelMetricValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  channelMetricLabel: {
    fontSize: 12,
  },
  channelInsights: {},
  channelInsightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  channelInsight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  insightDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
  },
  channelInsightText: {
    fontSize: 12,
  },
});