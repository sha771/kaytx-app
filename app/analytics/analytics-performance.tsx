 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChartBar,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  DollarSign,
  Calendar,
  ListFilter,
  Download,
  ArrowLeft,
  ChartPie,
  ChartLine,
  Activity,
  Target,
  Clock,
  Zap,
  CircleCheck,
  TriangleAlert,
  ArrowUp,
  ArrowDown,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface ReportItem {
  id: string;
  title: string;
  description: string;
  type: 'traffic' | 'conversion' | 'revenue' | 'engagement';
  period: string;
  status: 'ready' | 'generating' | 'scheduled';
  lastUpdated: string;
}

interface InsightItem {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'performance' | 'audience' | 'content' | 'technical';
  recommendation: string;
}

const analyticsMetrics: AnalyticsMetric[] = [
  {
    title: 'Autonomous Insight',
    value: '24,567',
    change: '+12.5%',
    trend: 'up',
    icon: Zap,
    color: '#007AFF',
  },
  {
    title: 'Predictive Revenue',
    value: '$840K',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
    color: '#34C759',
  },
  {
    title: 'Anomalies Detected',
    value: '0',
    change: 'Clean',
    trend: 'neutral',
    icon: TriangleAlert,
    color: '#FF9500',
  },
  {
    title: 'Data Flow Velocity',
    value: '1.2 GB/s',
    change: '+15%',
    trend: 'up',
    icon: Activity,
    color: '#AF52DE',
  },
];

const mockReports: ReportItem[] = [
  {
    id: '1',
    title: 'Monthly Traffic Report',
    description: 'Comprehensive analysis of website traffic patterns',
    type: 'traffic',
    period: 'Monthly',
    status: 'ready',
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    title: 'Conversion Funnel Analysis',
    description: 'Detailed breakdown of conversion paths and drop-offs',
    type: 'conversion',
    period: 'Weekly',
    status: 'generating',
    lastUpdated: 'In progress',
  },
  {
    id: '3',
    title: 'Revenue Performance',
    description: 'Revenue trends and forecasting analysis',
    type: 'revenue',
    period: 'Quarterly',
    status: 'scheduled',
    lastUpdated: 'Scheduled for tomorrow',
  },
];

const mockInsights: InsightItem[] = [
  {
    id: '1',
    title: 'Mobile Traffic Surge',
    description: 'Mobile traffic increased by 45% this month, but conversion rate is 20% lower than desktop',
    impact: 'high',
    category: 'performance',
    recommendation: 'Optimize mobile checkout process to improve conversion rates',
  },
  {
    id: '2',
    title: 'Content Engagement Drop',
    description: 'Blog post engagement decreased by 15% compared to last month',
    impact: 'medium',
    category: 'content',
    recommendation: 'Review content strategy and focus on trending topics',
  },
  {
    id: '3',
    title: 'Page Load Speed',
    description: 'Average page load time increased to 3.2 seconds',
    impact: 'high',
    category: 'technical',
    recommendation: 'Optimize images and implement caching to improve load times',
  },
];

export default function AnalyticsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'reports' | 'insights' | 'realtime'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'quarter'>('month');

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return '#34C759';
      case 'generating': return '#FF9500';
      case 'scheduled': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return CircleCheck;
      case 'generating': return Activity;
      case 'scheduled': return Calendar;
      default: return TriangleAlert;
    }
  };

  const renderMetric = ({ item }: { item: AnalyticsMetric }) => {
    const IconComponent = item.icon;
    const TrendIcon = item.trend === 'up' ? ArrowUp : item.trend === 'down' ? ArrowDown : Activity;
    const trendColor = item.trend === 'up' ? '#34C759' : item.trend === 'down' ? '#FF3B30' : theme.colors.secondaryText;

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
      </View>
    );
  };

  const renderReport = ({ item }: { item: ReportItem }) => {
    const StatusIcon = getStatusIcon(item.status);

    return (
      <TouchableOpacity style={[styles.reportCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.reportHeader}>
          <View style={styles.reportInfo}>
            <Text style={[styles.reportTitle, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.reportDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <Text style={[styles.reportPeriod, { color: theme.colors.secondaryText }]}>
              {item.period} • {item.lastUpdated}
            </Text>
          </View>
          <View style={styles.reportStatus}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
              <StatusIcon size={12} color={getStatusColor(item.status)} />
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {item.status === 'ready' && (
          <View style={styles.reportActions}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}>
              <Download size={16} color="white" />
              <Text style={styles.actionText}>Download</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderInsight = ({ item }: { item: InsightItem }) => (
    <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.insightHeader}>
        <View style={styles.insightInfo}>
          <Text style={[styles.insightTitle, { color: theme.colors.text }]}>{item.title}</Text>
          <View style={[styles.impactBadge, { backgroundColor: getImpactColor(item.impact) + '20' }]}>
            <Text style={[styles.impactText, { color: getImpactColor(item.impact) }]}>
              {item.impact.toUpperCase()} IMPACT
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.insightDescription, { color: theme.colors.secondaryText }]}>
        {item.description}
      </Text>

      <View style={styles.insightRecommendation}>
        <Text style={[styles.recommendationLabel, { color: theme.colors.text }]}>Recommendation:</Text>
        <Text style={[styles.recommendationText, { color: theme.colors.secondaryText }]}>
          {item.recommendation}
        </Text>
      </View>
    </View>
  );

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {(['today', 'week', 'month', 'quarter'] as const).map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedPeriod(period)}
          >
            <Text
              style={[
                styles.periodText,
                {
                  color: selectedPeriod === period ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Metrics Grid */}
      <FlatList
        data={analyticsMetrics}
        renderItem={renderMetric}
        keyExtractor={(item) => item.title}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.metricsContainer}
      />

      {/* Chart Placeholder */}
      <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>Traffic Overview</Text>
        <View style={styles.chartPlaceholder}>
          <ChartLine size={48} color={theme.colors.primary} />
          <Text style={[styles.chartPlaceholderText, { color: theme.colors.secondaryText }]}>
            Interactive chart will be displayed here
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderReports = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={mockReports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.reportsContainer}
      />
    </ScrollView>
  );

  const renderInsights = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <FlatList
        data={mockInsights}
        renderItem={renderInsight}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.insightsContainer}
      />
    </ScrollView>
  );

  const renderRealtime = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={[styles.realtimeCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.realtimeHeader}>
          <Text style={[styles.realtimeTitle, { color: theme.colors.text }]}>Live Visitors</Text>
          <View style={styles.liveIndicator}>
            <View style={[styles.liveDot, { backgroundColor: '#34C759' }]} />
            <Text style={[styles.liveText, { color: '#34C759' }]}>LIVE</Text>
          </View>
        </View>
        <Text style={[styles.realtimeValue, { color: theme.colors.primary }]}>127</Text>
        <Text style={[styles.realtimeDescription, { color: theme.colors.secondaryText }]}>
          Active users on your site right now
        </Text>
      </View>

      <View style={[styles.realtimeCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.realtimeTitle, { color: theme.colors.text }]}>Top Pages</Text>
        <View style={styles.pagesList}>
          <View style={styles.pageItem}>
            <Text style={[styles.pagePath, { color: theme.colors.text }]}>/home</Text>
            <Text style={[styles.pageViews, { color: theme.colors.primary }]}>45</Text>
          </View>
          <View style={styles.pageItem}>
            <Text style={[styles.pagePath, { color: theme.colors.text }]}>/products</Text>
            <Text style={[styles.pageViews, { color: theme.colors.primary }]}>32</Text>
          </View>
          <View style={styles.pageItem}>
            <Text style={[styles.pagePath, { color: theme.colors.text }]}>/about</Text>
            <Text style={[styles.pageViews, { color: theme.colors.primary }]}>18</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Premium Analysis Header */}
      <View style={[styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Insight Core</Text>
          <TouchableOpacity style={[styles.plusBtn, { backgroundColor: theme.colors.primary }]}>
            <Download size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMetrics}>
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>1.2B</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Points Analyzed</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: '#34C759' }]}>99.9%</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Signal Faith</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: theme.colors.primary }]}>Live</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Feed Status</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['overview', 'reports', 'insights', 'realtime'] as const).map((tab) => (
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
      <View style={{ flex: 1 }}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'reports' && renderReports()}
        {selectedTab === 'insights' && renderInsights()}
        {selectedTab === 'realtime' && renderRealtime()}
      </View>
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
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 2,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  metricsContainer: {
    gap: 12,
    marginBottom: 20,
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
  },
  chartCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartPlaceholder: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  chartPlaceholderText: {
    fontSize: 14,
    marginTop: 12,
  },
  reportsContainer: {
    gap: 16,
  },
  reportCard: {
    padding: 16,
    borderRadius: 12,
  },
  reportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reportDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  reportPeriod: {
    fontSize: 12,
  },
  reportStatus: {},
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  reportActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  insightsContainer: {
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
  insightInfo: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  insightRecommendation: {},
  recommendationLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  realtimeCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  realtimeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  realtimeTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
  },
  realtimeValue: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },
  realtimeDescription: {
    fontSize: 14,
  },
  pagesList: {
    gap: 12,
    marginTop: 16,
  },
  pageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagePath: {
    fontSize: 14,
    fontWeight: '500',
  },
  pageViews: {
    fontSize: 14,
    fontWeight: '600',
  },
  premiumHeader: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  premiumTitle: {
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
  },
  plusBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMetrics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  hMetric: {
    alignItems: 'center',
  },
  hMetricVal: {
    fontSize: 18,
    fontWeight: '900',
  },
  hMetricLab: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  hMetricDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(150,150,150,0.1)',
  },
});
