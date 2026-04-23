 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  Plus,
  Search,
  Filter,
  Zap,
  Globe,
  Mail,
  MessageSquare,
  Calendar,
  Eye,
  MousePointer,
  DollarSign,
  Percent,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface MarketingChannel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'social' | 'ads' | 'content';
  status: 'active' | 'paused' | 'draft';
  performance: {
    reach: number;
    engagement: number;
    conversion: number;
    roi: number;
  };
  budget: number;
  spent: number;
}

interface Campaign {
  id: string;
  name: string;
  type: 'awareness' | 'conversion' | 'retention';
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  metrics: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
    roas: number;
  };
}

interface Automation {
  id: string;
  name: string;
  trigger: string;
  status: 'active' | 'paused';
  conversions: number;
  revenue: number;
}

const mockChannels: MarketingChannel[] = [
  {
    id: '1',
    name: 'Email Marketing',
    type: 'email',
    status: 'active',
    performance: { reach: 15420, engagement: 68.5, conversion: 12.3, roi: 340 },
    budget: 5000,
    spent: 3200,
  },
  {
    id: '2',
    name: 'Google Ads',
    type: 'ads',
    status: 'active',
    performance: { reach: 45200, engagement: 3.2, conversion: 8.7, roi: 280 },
    budget: 15000,
    spent: 12800,
  },
  {
    id: '3',
    name: 'Social Media',
    type: 'social',
    status: 'active',
    performance: { reach: 28900, engagement: 15.6, conversion: 4.2, roi: 150 },
    budget: 8000,
    spent: 6500,
  },
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Product Launch',
    type: 'awareness',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    budget: 25000,
    spent: 18500,
    metrics: {
      impressions: 125000,
      clicks: 3200,
      conversions: 280,
      ctr: 2.56,
      cpc: 5.78,
      roas: 4.2,
    },
  },
  {
    id: '2',
    name: 'Customer Retention',
    type: 'retention',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    budget: 12000,
    spent: 4200,
    metrics: {
      impressions: 45000,
      clicks: 1800,
      conversions: 156,
      ctr: 4.0,
      cpc: 2.33,
      roas: 6.8,
    },
  },
];

const mockAutomations: Automation[] = [
  {
    id: '1',
    name: 'Welcome Series',
    trigger: 'New subscriber',
    status: 'active',
    conversions: 145,
    revenue: 12500,
  },
  {
    id: '2',
    name: 'Abandoned Cart',
    trigger: 'Cart abandonment',
    status: 'active',
    conversions: 89,
    revenue: 8900,
  },
];

export default function AdvanceMarketingScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'campaigns' | 'automation'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getChannelIcon = (type: MarketingChannel['type']) => {
    switch (type) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'social': return Users;
      case 'ads': return Target;
      case 'content': return Globe;
      default: return Target;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'completed': return '#8E8E93';
      case 'draft': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const renderOverview = () => (
    <ScrollView style={styles.overviewContainer}>
      {/* Key Metrics */}
      <View style={[styles.metricsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Key Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Eye size={20} color="#007AFF" />
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>2.4M</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Total Reach</Text>
          </View>
          <View style={styles.metricItem}>
            <MousePointer size={20} color="#34C759" />
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>8.7%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Avg CTR</Text>
          </View>
          <View style={styles.metricItem}>
            <DollarSign size={20} color="#FF9500" />
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>$45K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Revenue</Text>
          </View>
          <View style={styles.metricItem}>
            <Percent size={20} color="#FF3B30" />
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>320%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Avg ROI</Text>
          </View>
        </View>
      </View>

      {/* Performance Chart */}
      <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Performance Trends</Text>
        <View style={styles.chartPlaceholder}>
          <BarChart3 size={48} color={theme.colors.secondaryText} />
          <Text style={[styles.chartText, { color: theme.colors.secondaryText }]}>Chart visualization would go here</Text>
        </View>
      </View>

      {/* Top Performing Channels */}
      <View style={[styles.channelsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>Top Performing Channels</Text>
        {mockChannels.slice(0, 3).map((channel) => {
          const IconComponent = getChannelIcon(channel.type);
          return (
            <View key={channel.id} style={styles.channelItem}>
              <View style={styles.channelInfo}>
                <View style={[styles.channelIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                  <IconComponent size={16} color={theme.colors.primary} />
                </View>
                <Text style={[styles.channelName, { color: theme.colors.text }]}>{channel.name}</Text>
              </View>
              <Text style={[styles.channelRoi, { color: '#34C759' }]}>+{channel.performance.roi}%</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );

  const renderChannelItem = ({ item }: { item: MarketingChannel }) => {
    const IconComponent = getChannelIcon(item.type);
    const budgetUsed = (item.spent / item.budget) * 100;

    return (
      <View style={[styles.channelCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.channelHeader}>
          <View style={styles.channelTitleContainer}>
            <View style={[styles.channelIconLarge, { backgroundColor: theme.colors.primary + '20' }]}>
              <IconComponent size={24} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={[styles.channelTitle, { color: theme.colors.text }]}>{item.name}</Text>
              <View style={styles.statusContainer}>
                <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.channelMetrics}>
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Reach</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.performance.reach.toLocaleString()}</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.performance.engagement}%</Text>
          </View>
          <View style={styles.metricRow}>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Conversion</Text>
            <Text style={[styles.metricValue, { color: theme.colors.text }]}>{item.performance.conversion}%</Text>
          </View>
        </View>
        
        <View style={styles.budgetContainer}>
          <View style={styles.budgetHeader}>
            <Text style={[styles.budgetLabel, { color: theme.colors.secondaryText }]}>Budget Usage</Text>
            <Text style={[styles.budgetText, { color: theme.colors.text }]}>
              ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.budgetBar, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.budgetProgress, { width: `${budgetUsed}%`, backgroundColor: theme.colors.primary }]} />
          </View>
        </View>
      </View>
    );
  };

  const renderCampaignItem = ({ item }: { item: Campaign }) => (
    <View style={[styles.campaignCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.campaignHeader}>
        <View>
          <Text style={[styles.campaignName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.campaignType, { color: theme.colors.secondaryText }]}>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Campaign
          </Text>
        </View>
        <View style={[styles.campaignStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.campaignStatusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.campaignMetrics}>
        <View style={styles.campaignMetricItem}>
          <Text style={[styles.campaignMetricValue, { color: theme.colors.text }]}>{item.metrics.impressions.toLocaleString()}</Text>
          <Text style={[styles.campaignMetricLabel, { color: theme.colors.secondaryText }]}>Impressions</Text>
        </View>
        <View style={styles.campaignMetricItem}>
          <Text style={[styles.campaignMetricValue, { color: theme.colors.text }]}>{item.metrics.clicks.toLocaleString()}</Text>
          <Text style={[styles.campaignMetricLabel, { color: theme.colors.secondaryText }]}>Clicks</Text>
        </View>
        <View style={styles.campaignMetricItem}>
          <Text style={[styles.campaignMetricValue, { color: theme.colors.text }]}>{item.metrics.ctr}%</Text>
          <Text style={[styles.campaignMetricLabel, { color: theme.colors.secondaryText }]}>CTR</Text>
        </View>
        <View style={styles.campaignMetricItem}>
          <Text style={[styles.campaignMetricValue, { color: '#34C759' }]}>{item.metrics.roas}x</Text>
          <Text style={[styles.campaignMetricLabel, { color: theme.colors.secondaryText }]}>ROAS</Text>
        </View>
      </View>
    </View>
  );

  const renderAutomationItem = ({ item }: { item: Automation }) => (
    <View style={[styles.automationCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.automationHeader}>
        <View style={styles.automationInfo}>
          <Text style={[styles.automationName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.automationTrigger, { color: theme.colors.secondaryText }]}>{item.trigger}</Text>
        </View>
        <Switch
          value={item.status === 'active'}
          onValueChange={() => Alert.alert('Toggle Automation', 'Feature coming soon!')}
          trackColor={{ false: '#8E8E93', true: theme.colors.primary }}
        />
      </View>
      
      <View style={styles.automationMetrics}>
        <View style={styles.automationMetric}>
          <Text style={[styles.automationMetricValue, { color: theme.colors.text }]}>{item.conversions}</Text>
          <Text style={[styles.automationMetricLabel, { color: theme.colors.secondaryText }]}>Conversions</Text>
        </View>
        <View style={styles.automationMetric}>
          <Text style={[styles.automationMetricValue, { color: '#34C759' }]}>${item.revenue.toLocaleString()}</Text>
          <Text style={[styles.automationMetricLabel, { color: theme.colors.secondaryText }]}>Revenue</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Advanced Marketing</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Settings size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['overview', 'channels', 'campaigns', 'automation'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: activeTab === tab ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      
      {activeTab === 'channels' && (
        <FlatList
          data={mockChannels}
          renderItem={renderChannelItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {activeTab === 'campaigns' && (
        <FlatList
          data={mockCampaigns}
          renderItem={renderCampaignItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {activeTab === 'automation' && (
        <FlatList
          data={mockAutomations}
          renderItem={renderAutomationItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => Alert.alert('Create New', 'Feature coming soon!')}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  overviewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  metricsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  chartCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    marginTop: 8,
    fontSize: 14,
  },
  channelsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  channelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  channelIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelName: {
    fontSize: 14,
    fontWeight: '500',
  },
  channelRoi: {
    fontSize: 14,
    fontWeight: '600',
  },
  channelCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  channelHeader: {
    marginBottom: 16,
  },
  channelTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  channelIconLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  channelMetrics: {
    marginBottom: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  budgetContainer: {
    marginTop: 8,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 12,
  },
  budgetText: {
    fontSize: 12,
    fontWeight: '500',
  },
  budgetBar: {
    height: 4,
    borderRadius: 2,
  },
  budgetProgress: {
    height: '100%',
    borderRadius: 2,
  },
  campaignCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
  },
  campaignType: {
    fontSize: 12,
    marginTop: 2,
  },
  campaignStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  campaignStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  campaignMetricItem: {
    alignItems: 'center',
  },
  campaignMetricValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  campaignMetricLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  automationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  automationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  automationInfo: {
    flex: 1,
  },
  automationName: {
    fontSize: 16,
    fontWeight: '600',
  },
  automationTrigger: {
    fontSize: 12,
    marginTop: 2,
  },
  automationMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  automationMetric: {
    alignItems: 'center',
  },
  automationMetricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  automationMetricLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});