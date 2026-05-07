 
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
  Send,
  Mail,
  Target,
  Users,
  TrendingUp,
  ChartBarBig,
  Plus,
  Search,
  ArrowLeft,
  Pencil,
  MousePointer,
  Share2,
  Zap,
  DollarSign,
  Award,
  Activity,
  Sparkles,
  Globe,
  MessageSquare,
  Bell,
  ChevronRight,
  ChartPie,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social' | 'ads' | 'push' | 'multi-channel';
  status: 'draft' | 'active' | 'paused' | 'completed' | 'scheduled';
  audience: number;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  budget: number;
  spent: number;
  roi: number;
  startDate: string;
  endDate: string;
  description: string;
  performance: 'excellent' | 'good' | 'average' | 'poor';
}

interface MarketingMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  trend: number[];
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Email Campaign',
    type: 'email',
    status: 'active',
    audience: 15000,
    sent: 14500,
    opened: 7250,
    clicked: 1450,
    converted: 290,
    budget: 5000,
    spent: 3200,
    roi: 420,
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    description: 'Promote summer sale with 30% discount on all products',
    performance: 'excellent',
  },
  {
    id: '2',
    name: 'Product Launch SMS',
    type: 'sms',
    status: 'completed',
    audience: 8000,
    sent: 7800,
    opened: 6240,
    clicked: 936,
    converted: 187,
    budget: 2000,
    spent: 1850,
    roi: 285,
    startDate: '2024-01-15',
    endDate: '2024-01-20',
    description: 'Announce new product launch to existing customers',
    performance: 'good',
  },
  {
    id: '3',
    name: 'Social Media Awareness',
    type: 'social',
    status: 'scheduled',
    audience: 25000,
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    budget: 8000,
    spent: 0,
    roi: 0,
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    description: 'Increase brand awareness through social media campaigns',
    performance: 'average',
  },
  {
    id: '4',
    name: 'Multi-Channel Retargeting',
    type: 'multi-channel',
    status: 'active',
    audience: 12000,
    sent: 11500,
    opened: 6900,
    clicked: 2070,
    converted: 414,
    budget: 7500,
    spent: 5200,
    roi: 560,
    startDate: '2024-02-10',
    endDate: '2024-03-10',
    description: 'Retarget cart abandoners across email, SMS, and push',
    performance: 'excellent',
  },
  {
    id: '5',
    name: 'Black Friday Push Campaign',
    type: 'push',
    status: 'draft',
    audience: 18000,
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    budget: 3500,
    spent: 0,
    roi: 0,
    startDate: '2024-11-25',
    endDate: '2024-11-28',
    description: 'Push notification campaign for Black Friday deals',
    performance: 'average',
  },
];

const marketingMetrics: MarketingMetric[] = [
  {
    title: 'Autonomous Revenue',
    value: '$124.5K',
    change: '+18.2%',
    icon: DollarSign,
    color: '#34C759',
    trend: [20, 35, 28, 42, 38, 55, 48, 62],
  },
  {
    title: 'Active Campaigns',
    value: '24',
    change: '+6',
    icon: Target,
    color: '#007AFF',
    trend: [12, 14, 15, 18, 20, 21, 23, 24],
  },
  {
    title: 'Avg. ROI',
    value: '385%',
    change: '+24%',
    icon: TrendingUp,
    color: '#FF9500',
    trend: [280, 295, 310, 325, 340, 360, 370, 385],
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    change: '+1.2%',
    icon: Award,
    color: '#AF52DE',
    trend: [3.2, 3.5, 3.8, 4.0, 4.2, 4.4, 4.6, 4.8],
  },
  {
    title: 'Email Open Rate',
    value: '52.4%',
    change: '+8.3%',
    icon: Mail,
    color: '#FF2D92',
    trend: [40, 42, 45, 47, 48, 50, 51, 52.4],
  },
  {
    title: 'Click-through Rate',
    value: '12.7%',
    change: '+3.5%',
    icon: MousePointer,
    color: '#5AC8FA',
    trend: [8, 9, 9.5, 10, 10.8, 11.5, 12, 12.7],
  },
  {
    title: 'Total Audience',
    value: '156K',
    change: '+12.4K',
    icon: Users,
    color: '#32D74B',
    trend: [120, 125, 132, 138, 142, 148, 152, 156],
  },
  {
    title: 'Engagement Score',
    value: '87%',
    change: '+5%',
    icon: Activity,
    color: '#FFD60A',
    trend: [75, 77, 79, 81, 83, 84, 86, 87],
  },
];

const quickActions = [
  { id: '1', title: 'Email Campaign', icon: Mail, color: '#007AFF', route: '/marketing/email-marketing-hub' },
  { id: '2', title: 'SMS Campaign', icon: Send, color: '#34C759', route: '/marketing/sms-marketing-hub' },
  { id: '3', title: 'Social Media', icon: Share2, color: '#AF52DE', route: '/marketing/social-media-management' },
  { id: '4', title: 'Ads Manager', icon: Target, color: '#FF9500', route: '/marketing/ads-manager' },
  { id: '5', title: 'Cold Email', icon: Mail, color: '#5AC8FA', route: '/marketing/cold-email' },
  { id: '6', title: 'Cold Calling', icon: Share2, color: '#FF2D92', route: '/marketing/cold-calling' },
  { id: '7', title: 'SEO', icon: Globe, color: '#32D74B', route: '/marketing/seo-optimization' },
  { id: '8', title: 'Analytics', icon: ChartBarBig, color: '#FFD60A', route: '/analytics/analytics-performance' },
  { id: '9', title: 'A/B Testing', icon: ChartPie, color: '#007AFF', route: '/analytics/ab-testing' },
  { id: '10', title: 'Content', icon: Pencil, color: '#34C759', route: '/marketing/content-creation' },
  { id: '11', title: 'Lead Gen', icon: Users, color: '#FF9500', route: '/automation/lead-generation' },
  { id: '12', title: 'Campaigns', icon: Target, color: '#AF52DE', route: '/marketing/campaign' },
];

export default function MarketingHubScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'campaigns' | 'analytics' | 'automation'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft' | 'completed' | 'scheduled'>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'quarter'>('month');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'completed': return '#007AFF';
      case 'paused': return '#FF9500';
      case 'scheduled': return '#AF52DE';
      case 'draft': return '#8E8E93';
      default: return theme.colors.secondaryText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return '#007AFF';
      case 'sms': return '#34C759';
      case 'social': return '#AF52DE';
      case 'ads': return '#FF9500';
      case 'push': return '#FF2D92';
      case 'multi-channel': return '#5AC8FA';
      default: return theme.colors.secondaryText;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return Send;
      case 'social': return Share2;
      case 'ads': return Target;
      case 'push': return Bell;
      case 'multi-channel': return Zap;
      default: return Target;
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return '#34C759';
      case 'good': return '#5AC8FA';
      case 'average': return '#FF9500';
      case 'poor': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderMetric = ({ item }: { item: MarketingMetric }) => {
    const IconComponent = item.icon;
    const isPositive = item.change.startsWith('+');

    return (
      <View style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.metricHeader}>
          <View style={[styles.metricIcon, { backgroundColor: `${item.color}20` }]}>
            <IconComponent size={18} color={item.color} />
          </View>
          <View style={[styles.trendBadge, { backgroundColor: isPositive ? '#34C75920' : '#FF3B3020' }]}>
            <Text style={[styles.metricChange, { color: isPositive ? '#34C759' : '#FF3B30' }]}>
              {item.change}
            </Text>
          </View>
        </View>
        <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.value}</Text>
        <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{item.title}</Text>

        <View style={styles.trendChart}>
          {item.trend.map((value, index) => {
            const maxValue = Math.max(...item.trend);
            const height = (value / maxValue) * 30;
            return (
              <View
                key={index}
                style={[
                  styles.trendBar,
                  {
                    height,
                    backgroundColor: item.color + '60',
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderCampaign = ({ item }: { item: Campaign }) => {
    const TypeIcon = getTypeIcon(item.type);
    const openRate = item.sent > 0 ? ((item.opened / item.sent) * 100).toFixed(1) : '0';
    const clickRate = item.opened > 0 ? ((item.clicked / item.opened) * 100).toFixed(1) : '0';
    const conversionRate = item.clicked > 0 ? ((item.converted / item.clicked) * 100).toFixed(1) : '0';

    return (
      <TouchableOpacity style={[styles.campaignCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.campaignHeader}>
          <View style={styles.campaignInfo}>
            <View style={styles.campaignTitleRow}>
              <View style={[styles.campaignIconWrapper, { backgroundColor: getTypeColor(item.type) + '20' }]}>
                <TypeIcon size={18} color={getTypeColor(item.type)} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.campaignName, { color: theme.colors.text }]}>{item.name}</Text>
                <Text style={[styles.campaignDescription, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.campaignBadges}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) + '20' }]}>
            <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
              {item.type.toUpperCase()}
            </Text>
          </View>
          <View style={[styles.performanceBadge, { backgroundColor: getPerformanceColor(item.performance) + '20' }]}>
            <Text style={[styles.performanceText, { color: getPerformanceColor(item.performance) }]}>
              {item.performance.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.campaignStats}>
          <View style={styles.statRow}>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{item.audience.toLocaleString()}</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Audience</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{openRate}%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Open</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{clickRate}%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Click</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: theme.colors.text }]}>{conversionRate}%</Text>
              <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Convert</Text>
            </View>
          </View>
        </View>

        <View style={styles.campaignFooter}>
          <View style={styles.roiContainer}>
            <Text style={[styles.roiLabel, { color: theme.colors.secondaryText }]}>ROI:</Text>
            <Text style={[styles.roiValue, { color: item.roi > 300 ? '#34C759' : '#FF9500' }]}>
              {item.roi}%
            </Text>
          </View>
          <View style={styles.budgetContainer}>
            <Text style={[styles.budgetText, { color: theme.colors.secondaryText }]}>
              ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
            </Text>
            <View style={[styles.budgetBar, { backgroundColor: theme.colors.border }]}>
              <View
                style={[
                  styles.budgetFill,
                  {
                    backgroundColor: item.spent > item.budget ? '#FF3B30' : theme.colors.primary,
                    width: `${Math.min((item.spent / item.budget) * 100, 100)}%`
                  }
                ]}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderQuickAction = ({ item }: { item: typeof quickActions[0] }) => {
    const IconComponent = item.icon;
    return (
      <TouchableOpacity
        style={[styles.quickActionCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => router.push(item.route)}
      >
        <View style={[styles.quickActionIcon, { backgroundColor: item.color + '20' }]}>
          <IconComponent size={20} color={item.color} />
        </View>
        <Text style={[styles.quickActionTitle, { color: theme.colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderOverview = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
        </View>
        <FlatList
          data={quickActions}
          renderItem={renderQuickAction}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickActionsContainer}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Performance Metrics</Text>
          <View style={styles.periodSelector}>
            {(['week', 'month', 'quarter'] as const).map((period) => (
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
        </View>
        <FlatList
          data={marketingMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performing Campaigns</Text>
          <TouchableOpacity onPress={() => setSelectedTab('campaigns')}>
            <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={mockCampaigns.slice(0, 3)}
          renderItem={renderCampaign}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI-Powered Tools</Text>

        <TouchableOpacity style={[styles.aiToolCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.aiToolIcon, { backgroundColor: '#007AFF20' }]}>
            <Sparkles size={24} color="#007AFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiToolTitle, { color: theme.colors.text }]}>Smart Campaign Generator</Text>
            <Text style={[styles.aiToolDescription, { color: theme.colors.secondaryText }]}>
              AI generates optimized campaigns based on your goals and audience
            </Text>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.aiToolCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.aiToolIcon, { backgroundColor: '#34C75920' }]}>
            <Target size={24} color="#34C759" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiToolTitle, { color: theme.colors.text }]}>Predictive Analytics</Text>
            <Text style={[styles.aiToolDescription, { color: theme.colors.secondaryText }]}>
              Forecast campaign performance and budget optimization
            </Text>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.aiToolCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.aiToolIcon, { backgroundColor: '#FF950020' }]}>
            <Users size={24} color="#FF9500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiToolTitle, { color: theme.colors.text }]}>Advanced Segmentation</Text>
            <Text style={[styles.aiToolDescription, { color: theme.colors.secondaryText }]}>
              ML-powered audience segmentation with behavioral insights
            </Text>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.aiToolCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.aiToolIcon, { backgroundColor: '#AF52DE20' }]}>
            <Activity size={24} color="#AF52DE" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.aiToolTitle, { color: theme.colors.text }]}>Customer Journey Mapping</Text>
            <Text style={[styles.aiToolDescription, { color: theme.colors.secondaryText }]}>
              Visualize and optimize every touchpoint in the customer journey
            </Text>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.insightHeader}>
            <Sparkles size={24} color={theme.colors.primary} />
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>AI Insights</Text>
          </View>
          <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
            Your email campaigns perform 23% better on Tuesday mornings. Consider scheduling more campaigns during this time.
          </Text>
          <TouchableOpacity style={[styles.insightButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.insightButtonText}>View More Insights</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderCampaigns = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search campaigns..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filters}>
          {(['all', 'active', 'scheduled', 'draft', 'completed'] as const).map((Filter) => (
            <TouchableOpacity
              key={Funnel}
              style={[
                styles.filterChip,
                filterStatus === Filter && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setFilterStatus(Filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: filterStatus === Filter ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {Filter.charAt(0).toUpperCase() + Filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={filteredCampaigns}
        renderItem={renderCampaign}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.campaignsContainer}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Marketing Analytics</Text>
        <FlatList
          data={marketingMetrics}
          renderItem={renderMetric}
          keyExtractor={(item) => item.title}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
        />
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <ChartBarBig size={24} color="#007AFF" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Channel Performance</Text>
          </View>
          <Text style={[styles.analyticsSubtitle, { color: theme.colors.secondaryText }]}>
            View detailed performance by marketing channel
          </Text>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <ChartPie size={24} color="#34C759" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Audience Insights</Text>
          </View>
          <Text style={[styles.analyticsSubtitle, { color: theme.colors.secondaryText }]}>
            Demographics and behavior analysis
          </Text>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.analyticsHeader}>
            <TrendingUp size={24} color="#FF9500" />
            <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>ROI Analysis</Text>
          </View>
          <Text style={[styles.analyticsSubtitle, { color: theme.colors.secondaryText }]}>
            Detailed return on investment tracking
          </Text>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAutomation = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Marketing Automation</Text>

        <TouchableOpacity style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.automationIcon, { backgroundColor: '#007AFF20' }]}>
            <Zap size={24} color="#007AFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.automationTitle, { color: theme.colors.text }]}>Email Sequences</Text>
            <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>
              Automate your email marketing with smart sequences
            </Text>
            <View style={styles.automationStats}>
              <Text style={[styles.automationStat, { color: theme.colors.secondaryText }]}>8 active</Text>
              <Text style={[styles.automationStat, { color: '#34C759' }]}>92% delivery rate</Text>
            </View>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.automationIcon, { backgroundColor: '#34C75920' }]}>
            <Target size={24} color="#34C759" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.automationTitle, { color: theme.colors.text }]}>Lead Scoring</Text>
            <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>
              Automatically score and qualify leads based on behavior
            </Text>
            <View style={styles.automationStats}>
              <Text style={[styles.automationStat, { color: theme.colors.secondaryText }]}>2,450 leads scored</Text>
              <Text style={[styles.automationStat, { color: '#34C759' }]}>78% accuracy</Text>
            </View>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.automationIcon, { backgroundColor: '#FF950020' }]}>
            <MessageSquare size={24} color="#FF9500" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.automationTitle, { color: theme.colors.text }]}>SMS Drip Campaigns</Text>
            <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>
              Set up automated SMS sequences for nurturing
            </Text>
            <View style={styles.automationStats}>
              <Text style={[styles.automationStat, { color: theme.colors.secondaryText }]}>5 active</Text>
              <Text style={[styles.automationStat, { color: '#34C759' }]}>86% open rate</Text>
            </View>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={[styles.automationIcon, { backgroundColor: '#AF52DE20' }]}>
            <Users size={24} color="#AF52DE" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.automationTitle, { color: theme.colors.text }]}>Audience Segmentation</Text>
            <Text style={[styles.automationDescription, { color: theme.colors.secondaryText }]}>
              Dynamic audience segments based on user behavior
            </Text>
            <View style={styles.automationStats}>
              <Text style={[styles.automationStat, { color: theme.colors.secondaryText }]}>24 segments</Text>
              <Text style={[styles.automationStat, { color: '#34C759' }]}>Real-time updates</Text>
            </View>
          </View>
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Premium Marketing Header */}
      <View style={[styles.premiumHeader, { paddingTop: insets.top + 20, backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.premiumTitle, { color: theme.colors.text }]}>Autonomous Marketing</Text>
          <TouchableOpacity style={[styles.plusBtn, { backgroundColor: theme.colors.primary }]}>
            <Plus size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMetrics}>
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: theme.colors.text }]}>156k</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Total Audience</Text>
          </View>
          <View style={styles.hMetricDivider} />
          <View style={styles.hMetric}>
            <Text style={[styles.hMetricVal, { color: '#34C759' }]}>385%</Text>
            <Text style={[styles.hMetricLab, { color: theme.colors.secondaryText }]}>Autonomous ROI</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {(['overview', 'campaigns', 'analytics', 'automation'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.pTab,
                selectedTab === tab && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.pTabText,
                  {
                    color: selectedTab === tab ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'campaigns' && renderCampaigns()}
        {selectedTab === 'analytics' && renderAnalytics()}
        {selectedTab === 'automation' && renderAutomation()}
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
    marginRight: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
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
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    padding: 2,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  periodText: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActionsContainer: {
    gap: 12,
    paddingRight: 20,
  },
  quickActionCard: {
    width: 100,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  metricsContainer: {
    gap: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metricChange: {
    fontSize: 11,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  trendChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 30,
  },
  trendBar: {
    flex: 1,
    borderRadius: 2,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
  },
  campaignsContainer: {
    gap: 16,
    paddingBottom: 20,
  },
  campaignCard: {
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  campaignHeader: {
    marginBottom: 12,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  campaignIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  campaignDescription: {
    fontSize: 13,
  },
  campaignBadges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  performanceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  performanceText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  campaignStats: {
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statColumn: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roiLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  roiValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  budgetContainer: {
    flex: 1,
    marginLeft: 16,
  },
  budgetText: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  budgetBar: {
    height: 6,
    borderRadius: 3,
  },
  budgetFill: {
    height: '100%',
    borderRadius: 3,
  },
  insightCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  insightTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  insightButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  insightButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  analyticsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  analyticsSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  automationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  automationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  automationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  automationDescription: {
    fontSize: 13,
    marginBottom: 8,
  },
  automationStats: {
    flexDirection: 'row',
    gap: 12,
  },
  automationStat: {
    fontSize: 12,
    fontWeight: '500',
  },
  aiToolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  aiToolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  aiToolTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  aiToolDescription: {
    fontSize: 13,
    lineHeight: 18,
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
  tabsWrapper: {
    marginBottom: 16,
  },
  tabsScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  pTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: 'rgba(150,150,150,0.05)',
  },
  pTabText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
