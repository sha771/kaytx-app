 
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
  TrendingUp,
  Target,
  Users,
  Zap,
  ChartBarBig,
  ChartPie,
  Calendar,
  ListFilter,
  Download,
  ArrowLeft,
  Plus,
  Activity,
  DollarSign,
  Percent,
  Clock,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface GrowthMetric {
  id: string;
  name: string;
  description: string;
  currentValue: number;
  targetValue: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
  category: 'acquisition' | 'activation' | 'retention' | 'revenue' | 'referral';
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

interface OptimizationTest {
  id: string;
  name: string;
  type: 'ab_test' | 'multivariate' | 'split_url' | 'redirect';
  status: 'running' | 'completed' | 'draft' | 'paused';
  improvement: number;
  confidence: number;
  participants: number;
  duration: string;
}

interface GrowthInsight {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const mockGrowthMetrics: GrowthMetric[] = [
  {
    id: '1',
    name: 'Customer Acquisition Cost',
    description: 'Cost to acquire a new customer',
    currentValue: 45,
    targetValue: 35,
    progress: 78,
    trend: 'down',
    category: 'acquisition',
    recommendations: [
      'Optimize ad targeting to reduce CAC',
      'Improve landing page conversion rates',
      'Focus on high-performing channels'
    ],
    priority: 'high',
  },
  {
    id: '2',
    name: 'Monthly Recurring Revenue',
    description: 'Predictable monthly revenue from subscriptions',
    currentValue: 125000,
    targetValue: 150000,
    progress: 83,
    trend: 'up',
    category: 'revenue',
    recommendations: [
      'Increase upselling to existing customers',
      'Launch premium tier features',
      'Improve customer retention programs'
    ],
    priority: 'high',
  },
  {
    id: '3',
    name: 'User Activation Rate',
    description: 'Percentage of users who complete onboarding',
    currentValue: 68,
    targetValue: 80,
    progress: 85,
    trend: 'up',
    category: 'activation',
    recommendations: [
      'Simplify onboarding flow',
      'Add progress indicators',
      'Provide better guidance'
    ],
    priority: 'medium',
  },
];

const mockOptimizationTests: OptimizationTest[] = [
  {
    id: '1',
    name: 'Homepage CTA Button',
    type: 'ab_test',
    status: 'running',
    improvement: 12.5,
    confidence: 95,
    participants: 5420,
    duration: '14 days',
  },
  {
    id: '2',
    name: 'Pricing Page Layout',
    type: 'multivariate',
    status: 'completed',
    improvement: 23.8,
    confidence: 99,
    participants: 8750,
    duration: '21 days',
  },
  {
    id: '3',
    name: 'Email Subject Lines',
    type: 'ab_test',
    status: 'running',
    improvement: 8.2,
    confidence: 87,
    participants: 12000,
    duration: '7 days',
  },
];

const growthInsights: GrowthInsight[] = [
  {
    title: 'Growth Rate',
    value: '+23%',
    change: '+5%',
    icon: TrendingUp,
    color: '#34C759',
  },
  {
    title: 'Conversion Rate',
    value: '4.2%',
    change: '+0.8%',
    icon: Target,
    color: '#007AFF',
  },
  {
    title: 'Customer LTV',
    value: '$1,247',
    change: '+$156',
    icon: DollarSign,
    color: '#FF9500',
  },
  {
    title: 'Churn Rate',
    value: '2.1%',
    change: '-0.5%',
    icon: Users,
    color: '#AF52DE',
  },
];

export default function GrowthOptimizationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'tests' | 'insights' | 'recommendations'>('metrics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [autoOptimization, setAutoOptimization] = useState<boolean>(true);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'acquisition': return '#007AFF';
      case 'activation': return '#34C759';
      case 'retention': return '#FF9500';
      case 'revenue': return '#AF52DE';
      case 'referral': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return theme.colors.secondaryText;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingUp;
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

  const getTestStatusColor = (status: string) => {
    switch (status) {
      case 'running': return '#34C759';
      case 'completed': return '#007AFF';
      case 'draft': return '#8E8E93';
      case 'paused': return '#FF9500';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredMetrics = mockGrowthMetrics.filter(metric => {
    const matchesSearch = metric.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || metric.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const renderInsight = ({ item }: { item: GrowthInsight }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+') || item.change.startsWith('-');
    const changeColor = item.change.startsWith('+') ? '#34C759' : 
                       item.change.startsWith('-') ? '#FF3B30' : theme.colors.secondaryText;
    
    return (
      <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.insightHeader}>
          <View style={[styles.insightIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={20} color={item.color} />
          </View>
          <Text style={[styles.insightChange, { color: changeColor }]}>
            {item.change}
          </Text>
        </View>
        <Text style={[styles.insightValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.insightTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>
      </View>
    );
  };

  const renderMetric = ({ item }: { item: GrowthMetric }) => {
    const categoryColor = getCategoryColor(item.category);
    const priorityColor = getPriorityColor(item.priority);
    const TrendIcon = getTrendIcon(item.trend);
    const trendColor = getTrendColor(item.trend);
    
    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={styles.metricInfo}>
            <Text style={[styles.metricName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.metricDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={styles.metricBadges}>
              <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '20' }]}>
                <Text style={[styles.categoryText, { color: categoryColor }]}>
                  {item.category.toUpperCase()}
                </Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
                <Text style={[styles.priorityText, { color: priorityColor }]}>
                  {item.priority.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.metricValue}>
            <View style={styles.valueContainer}>
              <Text style={[styles.currentValue, { color: theme.colors.text }]}>
                {typeof item.currentValue === 'number' && item.currentValue > 1000 
                  ? `$${(item.currentValue / 1000).toFixed(0)}K`
                  : item.currentValue
                }
              </Text>
              <View style={styles.trendContainer}>
                <TrendIcon size={16} color={trendColor} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressInfo}>
            <Text style={[styles.progressLabel, { color: theme.colors.secondaryText }]}>
              Progress to Target
            </Text>
            <Text style={[styles.progressValue, { color: theme.colors.text }]}>
              {item.progress}%
            </Text>
          </View>
          <View style={[styles.progressBar, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: item.progress >= 80 ? '#34C759' : theme.colors.primary,
                  width: `${Math.min(item.progress, 100)}%`
                }
              ]} 
            />
          </View>
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={[styles.recommendationsTitle, { color: theme.colors.text }]}>Recommendations:</Text>
          {item.recommendations.slice(0, 2).map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={[styles.recommendationDot, { backgroundColor: '#34C759' }]} />
              <Text style={[styles.recommendationText, { color: theme.colors.text }]}>
                {recommendation}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderTest = ({ item }: { item: OptimizationTest }) => {
    const statusColor = getTestStatusColor(item.status);
    
    return (
      <View style={[styles.testCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.testHeader}>
          <View style={styles.testInfo}>
            <Text style={[styles.testName, { color: theme.colors.text }]}>{item.name}</Text>
            <View style={styles.testBadges}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: theme.colors.primary + '20' }]}>
                <Text style={[styles.typeText, { color: theme.colors.primary }]}>
                  {item.type.replace('_', ' ').toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.testMetrics}>
            <Text style={[styles.improvementValue, { color: '#34C759' }]}>
              +{item.improvement}%
            </Text>
            <Text style={[styles.improvementLabel, { color: theme.colors.secondaryText }]}>
              Improvement
            </Text>
          </View>
        </View>

        <View style={styles.testStats}>
          <View style={styles.testStat}>
            <Text style={[styles.testStatValue, { color: theme.colors.text }]}>{item.confidence}%</Text>
            <Text style={[styles.testStatLabel, { color: theme.colors.secondaryText }]}>Confidence</Text>
          </View>
          <View style={styles.testStat}>
            <Text style={[styles.testStatValue, { color: theme.colors.text }]}>
              {item.participants.toLocaleString()}
            </Text>
            <Text style={[styles.testStatLabel, { color: theme.colors.secondaryText }]}>Participants</Text>
          </View>
          <View style={styles.testStat}>
            <Text style={[styles.testStatValue, { color: theme.colors.text }]}>{item.duration}</Text>
            <Text style={[styles.testStatLabel, { color: theme.colors.secondaryText }]}>Duration</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderMetrics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Auto Optimization Toggle */}
      <View style={[styles.autoOptimizationSection, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.autoOptimizationInfo}>
          <Text style={[styles.autoOptimizationTitle, { color: theme.colors.text }]}>Auto Optimization</Text>
          <Text style={[styles.autoOptimizationDescription, { color: theme.colors.secondaryText }]}>
            Automatically apply winning variations
          </Text>
        </View>
        <Switch
          value={autoOptimization}
          onValueChange={setAutoOptimization}
          trackColor={{ false: '#767577', true: theme.colors.primary }}
          thumbColor={autoOptimization ? '#f4f3f4' : '#f4f3f4'}
        />
      </View>

      {/* Growth Insights */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Growth Insights</Text>
        <FlatList
          data={growthInsights}
          renderItem={renderInsight}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.insightsContainer}
        />
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersSection}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search metrics..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryFilters}>
          {['all', 'acquisition', 'activation', 'retention', 'revenue', 'referral'].map((category) => (
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
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredMetrics}
        renderItem={renderMetric}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.metricsList}
      />
    </ScrollView>
  );

  const renderTests = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Optimization Tests</Text>
        <FlatList
          data={mockOptimizationTests}
          renderItem={renderTest}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.testsList}
        />
      </View>
    </ScrollView>
  );

  const renderInsightsTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Growth Insights</Text>
        <View style={[styles.insightDetailCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.insightDetailTitle, { color: theme.colors.text }]}>Key Growth Drivers</Text>
          <Text style={[styles.insightDetailDescription, { color: theme.colors.secondaryText }]}>
            Email marketing campaigns are driving 35% of new customer acquisitions, while social media referrals show the highest lifetime value.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderRecommendations = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Recommendations</Text>
        <View style={[styles.recommendationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.recommendationCardTitle, { color: theme.colors.text }]}>Priority Actions</Text>
          <Text style={[styles.recommendationCardDescription, { color: theme.colors.secondaryText }]}>
            Focus on reducing customer acquisition cost by optimizing ad targeting and improving landing page conversion rates.
          </Text>
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Growth Optimization</Text>
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
        {(['metrics', 'tests', 'insights', 'recommendations'] as const).map((tab) => (
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
      {selectedTab === 'metrics' && renderMetrics()}
      {selectedTab === 'tests' && renderTests()}
      {selectedTab === 'insights' && renderInsightsTab()}
      {selectedTab === 'recommendations' && renderRecommendations()}
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
  autoOptimizationSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  autoOptimizationInfo: {
    flex: 1,
  },
  autoOptimizationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  autoOptimizationDescription: {
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
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  insightTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  filtersSection: {
    marginBottom: 20,
  },
  searchBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
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
  metricsList: {
    gap: 16,
  },
  metricCard: {
    padding: 16,
    borderRadius: 12,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricInfo: {
    flex: 1,
  },
  metricName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metricDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  metricBadges: {
    flexDirection: 'row',
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
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricValue: {
    alignItems: 'center',
  },
  valueContainer: {
    alignItems: 'center',
  },
  currentValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  trendContainer: {
    padding: 4,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  recommendationsSection: {},
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
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
  testsList: {
    gap: 12,
  },
  testCard: {
    padding: 16,
    borderRadius: 12,
  },
  testHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  testBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  testMetrics: {
    alignItems: 'center',
  },
  improvementValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  improvementLabel: {
    fontSize: 12,
  },
  testStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  testStat: {
    alignItems: 'center',
  },
  testStatValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  testStatLabel: {
    fontSize: 12,
  },
  insightDetailCard: {
    padding: 16,
    borderRadius: 12,
  },
  insightDetailTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightDetailDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
  },
  recommendationCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationCardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
