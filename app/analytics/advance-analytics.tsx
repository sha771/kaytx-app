 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ChartBarBig,
  ChartPie,
  Calendar,
  ListFilter,
  Download,
  ArrowLeft,
  Plus,
  Eye,
  MousePointer,
  Users,
  Clock,
  Target,
  Activity,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface AdvancedAnalytic {
  id: string;
  name: string;
  description: string;
  category: 'user_behavior' | 'performance' | 'conversion' | 'engagement' | 'retention';
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
  insights: string[];
  recommendations: string[];
}

interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const mockAnalytics: AdvancedAnalytic[] = [
  {
    id: '1',
    name: 'User Journey Analysis',
    description: 'Complete path analysis from acquisition to conversion',
    category: 'user_behavior',
    value: '4.2%',
    change: 12.5,
    trend: 'up',
    period: 'Last 30 days',
    insights: [
      'Users spend 3.2 minutes on average before converting',
      'Mobile users have 15% higher conversion rate',
      'Social media traffic shows best engagement'
    ],
    recommendations: [
      'Optimize mobile checkout flow',
      'Increase social media ad spend',
      'Reduce form fields on landing pages'
    ],
  },
  {
    id: '2',
    name: 'Cohort Retention Analysis',
    description: 'User retention patterns across different time periods',
    category: 'retention',
    value: '68%',
    change: -5.2,
    trend: 'down',
    period: 'Last 90 days',
    insights: [
      'Day 7 retention dropped by 8%',
      'Email campaigns improve retention by 23%',
      'Premium users have 2x better retention'
    ],
    recommendations: [
      'Implement onboarding improvements',
      'Increase email campaign frequency',
      'Focus on premium feature adoption'
    ],
  },
  {
    id: '3',
    name: 'Conversion Funnel Optimization',
    description: 'Multi-step conversion analysis with drop-off points',
    category: 'conversion',
    value: '23.8%',
    change: 8.7,
    trend: 'up',
    period: 'Last 7 days',
    insights: [
      'Cart abandonment reduced by 12%',
      'Payment page conversion improved',
      'Mobile funnel outperforming desktop'
    ],
    recommendations: [
      'A/B test checkout button colors',
      'Add trust badges on payment page',
      'Optimize mobile payment flow'
    ],
  },
];

const analyticsMetrics: AnalyticsMetric[] = [
  {
    title: 'Total Sessions',
    value: '125.4K',
    change: '+18%',
    icon: Users,
    color: '#007AFF',
  },
  {
    title: 'Conversion Rate',
    value: '4.2%',
    change: '+0.8%',
    icon: Target,
    color: '#34C759',
  },
  {
    title: 'Avg Session Duration',
    value: '3m 42s',
    change: '+12s',
    icon: Clock,
    color: '#FF9500',
  },
  {
    title: 'Bounce Rate',
    value: '32.1%',
    change: '-2.3%',
    icon: TrendingDown,
    color: '#AF52DE',
  },
];

export default function AdvanceAnalyticsScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'insights' | 'reports'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [realTimeEnabled, setRealTimeEnabled] = useState<boolean>(true);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user_behavior': return '#007AFF';
      case 'performance': return '#34C759';
      case 'conversion': return '#FF9500';
      case 'engagement': return '#AF52DE';
      case 'retention': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
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

  const filteredAnalytics = mockAnalytics.filter(analytic => {
    const matchesSearch = analytic.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || analytic.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderMetric = ({ item }: { item: AnalyticsMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.metricChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderAnalytic = ({ item }: { item: AdvancedAnalytic }) => {
    const categoryColor = getCategoryColor(item.category);
    const TrendIcon = getTrendIcon(item.trend);
    const trendColor = getTrendColor(item.trend);
    
    return (
      <View style={[styles.analyticCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.analyticHeader}>
          <View style={styles.analyticInfo}>
            <Text style={[styles.analyticName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.analyticDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={styles.analyticBadges}>
              <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
                <Text style={[styles.categoryText, { color: categoryColor }]}>
                  {item.category.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
              <Text style={[styles.periodText, { color: theme.colors.secondaryText }]}>{item.period}</Text>
            </View>
          </View>
          <View style={styles.analyticValue}>
            <View style={styles.valueContainer}>
              <Text style={[styles.mainValue, { color: theme.colors.text }]}>{item.value}</Text>
              <View style={styles.trendContainer}>
                <TrendIcon size={16} color={trendColor} />
                <Text style={[styles.changeValue, { color: trendColor }]}>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.insightsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Key Insights</Text>
          {item.insights.map((insight, index) => (
            <View key={index} style={styles.insightItem}>
              <View style={[styles.insightDot, { backgroundColor: theme.colors.primary }]} />
              <Text style={[styles.insightText, { color: theme.colors.text }]}>{insight}</Text>
            </View>
          ))}
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Recommendations</Text>
          {item.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={[styles.recommendationDot, { backgroundColor: '#34C759' }]} />
              <Text style={[styles.recommendationText, { color: theme.colors.text }]}>{recommendation}</Text>
            </View>
          ))}
        </View>

        <View style={styles.analyticFooter}>
          <TouchableOpacity style={[styles.viewReportButton, { backgroundColor: theme.colors.primary }]}>
            <ChartBarBig size={14} color="white" />
            <Text style={styles.viewReportText}>View Full Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Real-time Toggle */}
      <View style={[styles.realTimeSection, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.realTimeInfo}>
          <Text style={[styles.realTimeTitle, { color: theme.colors.text }]}>Real-time Analytics</Text>
          <Text style={[styles.realTimeDescription, { color: theme.colors.secondaryText }]}>
            Live data updates every 30 seconds
          </Text>
        </View>
        <Switch
          value={realTimeEnabled}
          onValueChange={setRealTimeEnabled}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={realTimeEnabled ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      {/* Metrics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Overview</Text>
        <FlatList
          data={analyticsMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search analytics..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
          {['all', 'user_behavior', 'performance', 'conversion', 'engagement', 'retention'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryFilter,
                filterCategory === category && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterCategory(category)}
            >
              <Text
                style={[
                  styles.categoryFilterText,
                  {
                    color: filterCategory === category ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {category.replace('_', ' ').charAt(0).toUpperCase() + category.replace('_', ' ').slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredAnalytics}
        renderItem={renderAnalytic}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.analyticsList}
      />
    </ScrollView>
  );

  const renderInsights = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI-Powered Insights</Text>
        <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.insightCardTitle, { color: theme.colors.text }]}>Anomaly Detection</Text>
          <Text style={[styles.insightCardDescription, { color: theme.colors.secondaryText }]}>
            Unusual spike in mobile traffic detected at 2:30 PM - investigate potential viral content or campaign success.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderReports = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Custom Reports</Text>
        <View style={[styles.reportCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.reportCardTitle, { color: theme.colors.text }]}>Weekly Performance Report</Text>
          <Text style={[styles.reportCardDescription, { color: theme.colors.secondaryText }]}>
            Comprehensive analysis of key metrics, trends, and actionable insights for the past week.
          </Text>
          <TouchableOpacity style={[styles.generateButton, { backgroundColor: theme.colors.primary }]}>
            <Download size={16} color="white" />
            <Text style={styles.generateButtonText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Advanced Analytics</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <ListFilter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['overview', 'insights', 'reports'] as const).map((tab) => (
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
      {selectedTab === 'overview' && renderOverview()}
      {selectedTab === 'insights' && renderInsights()}
      {selectedTab === 'reports' && renderReports()}
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
  headerActions: {
    flexDirection: 'row',
    gap: 8,
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
  realTimeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  realTimeInfo: {
    flex: 1,
  },
  realTimeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  realTimeDescription: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
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
  filtersSection: {
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoryFilters: {
    flexDirection: 'row',
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  analyticsList: {
    gap: 16,
  },
  analyticCard: {
    padding: 16,
    borderRadius: 12,
  },
  analyticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  analyticInfo: {
    flex: 1,
  },
  analyticName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  analyticDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  analyticBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
  periodText: {
    fontSize: 12,
  },
  analyticValue: {
    alignItems: 'flex-end',
  },
  valueContainer: {
    alignItems: 'center',
  },
  mainValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  changeValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsSection: {
    marginBottom: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  insightDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  recommendationsSection: {
    marginBottom: 16,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    gap: 8,
  },
  recommendationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  analyticFooter: {
    alignItems: 'flex-end',
  },
  viewReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  viewReportText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightCardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  reportCard: {
    padding: 16,
    borderRadius: 12,
  },
  reportCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  reportCardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
