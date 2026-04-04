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
  Megaphone,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Play,
  Pause,
  Edit,
  Copy,
  Trash2,
  ArrowLeft,
  Plus,
  Filter,
  BarChart3,
  Activity,
  Mail,
  MessageSquare,
  Share2,
  Eye,
  MousePointer,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Campaign {
  id: string;
  name: string;
  description: string;
  type: 'email' | 'social' | 'content' | 'paid' | 'seo';
  status: 'active' | 'paused' | 'draft' | 'completed';
  budget: number;
  spent: number;
  reach: number;
  engagement: number;
  conversions: number;
  roi: number;
  startDate: string;
  endDate: string;
  channels: string[];
}

interface CampaignMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Product Launch',
    description: 'Multi-channel campaign for new product line',
    type: 'content',
    status: 'active',
    budget: 25000,
    spent: 18500,
    reach: 125000,
    engagement: 8750,
    conversions: 342,
    roi: 4.2,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    channels: ['Email', 'Social Media', 'Blog', 'Paid Ads'],
  },
  {
    id: '2',
    name: 'Brand Awareness Q3',
    description: 'Building brand recognition across all channels',
    type: 'social',
    status: 'active',
    budget: 15000,
    spent: 9200,
    reach: 89000,
    engagement: 5340,
    conversions: 156,
    roi: 2.8,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    channels: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter'],
  },
  {
    id: '3',
    name: 'Email Newsletter Series',
    description: 'Weekly newsletter campaign for customer retention',
    type: 'email',
    status: 'active',
    budget: 5000,
    spent: 3200,
    reach: 45000,
    engagement: 9000,
    conversions: 225,
    roi: 6.1,
    startDate: '2024-05-01',
    endDate: '2024-12-31',
    channels: ['Email', 'Automation'],
  },
];

const campaignMetrics: CampaignMetric[] = [
  {
    title: 'Total Reach',
    value: '259K',
    change: '+18%',
    icon: Eye,
    color: '#007AFF',
  },
  {
    title: 'Engagement',
    value: '23.1K',
    change: '+25%',
    icon: MessageSquare,
    color: '#34C759',
  },
  {
    title: 'Conversions',
    value: '723',
    change: '+12%',
    icon: Target,
    color: '#FF9500',
  },
  {
    title: 'Avg ROI',
    value: '4.4x',
    change: '+0.6x',
    icon: TrendingUp,
    color: '#AF52DE',
  },
];

export default function CampaignScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'campaigns' | 'analytics' | 'templates'>('campaigns');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'draft': return '#8E8E93';
      case 'completed': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return '#007AFF';
      case 'social': return '#34C759';
      case 'content': return '#FF9500';
      case 'paid': return '#AF52DE';
      case 'seo': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    const matchesType = filterType === 'all' || campaign.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const renderMetric = ({ item }: { item: CampaignMetric }) => {
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

  const renderCampaign = ({ item }: { item: Campaign }) => {
    const statusColor = getStatusColor(item.status);
    const typeColor = getTypeColor(item.type);
    const budgetUsed = (item.spent / item.budget) * 100;
    
    return (
      <View style={[styles.campaignCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.campaignHeader}>
          <View style={styles.campaignInfo}>
            <Text style={[styles.campaignName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.campaignDescription, { color: theme.colors.secondaryText }]}>
              {item.description}
            </Text>
            <View style={styles.campaignBadges}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                <Text style={[styles.typeText, { color: typeColor }]}>
                  {item.type.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.campaignActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Edit size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Copy size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <Switch
              value={item.status === 'active'}
              onValueChange={() => {}}
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={item.status === 'active' ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.channelsSection}>
          <Text style={[styles.channelsTitle, { color: theme.colors.text }]}>Channels:</Text>
          <View style={styles.channelsList}>
            {item.channels.map((channel, index) => (
              <View key={index} style={[styles.channelTag, { backgroundColor: theme.colors.primary + '20' }]}>
                <Text style={[styles.channelText, { color: theme.colors.primary }]}>{channel}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.budgetSection}>
          <View style={styles.budgetInfo}>
            <Text style={[styles.budgetLabel, { color: theme.colors.secondaryText }]}>Budget</Text>
            <Text style={[styles.budgetValue, { color: theme.colors.text }]}>
              ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.budgetBar, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
            <View 
              style={[
                styles.budgetProgress, 
                { 
                  backgroundColor: budgetUsed > 90 ? '#FF3B30' : theme.colors.primary,
                  width: `${Math.min(budgetUsed, 100)}%`
                }
              ]} 
            />
          </View>
          <Text style={[styles.budgetPercentage, { color: theme.colors.secondaryText }]}>
            {budgetUsed.toFixed(0)}% used
          </Text>
        </View>

        <View style={styles.campaignMetrics}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.reach.toLocaleString()}
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Reach</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.engagement.toLocaleString()}
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.conversions}
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Conversions</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.roi}x
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>ROI</Text>
          </View>
        </View>

        <View style={styles.campaignFooter}>
          <Text style={[styles.campaignDates, { color: theme.colors.secondaryText }]}>
            {item.startDate} - {item.endDate}
          </Text>
          <TouchableOpacity style={[styles.viewDetailsButton, { backgroundColor: theme.colors.primary }]}>
            <BarChart3 size={14} color="white" />
            <Text style={styles.viewDetailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCampaigns = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Metrics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Campaign Overview</Text>
        <FlatList
          data={campaignMetrics}
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
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search campaigns..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          <View style={styles.filterGroup}>
            <Text style={[styles.filterGroupTitle, { color: theme.colors.text }]}>Status:</Text>
            {['all', 'active', 'paused', 'draft', 'completed'].map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterChip,
                  filterStatus === status && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color: filterStatus === status ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={styles.filterGroup}>
            <Text style={[styles.filterGroupTitle, { color: theme.colors.text }]}>Type:</Text>
            {['all', 'email', 'social', 'content', 'paid', 'seo'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterChip,
                  filterType === type && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterType(type)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color: filterType === type ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={filteredCampaigns}
        renderItem={renderCampaign}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.campaignsList}
      />
    </ScrollView>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Campaign Analytics</Text>
        <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Performance Summary</Text>
          <Text style={[styles.analyticsDescription, { color: theme.colors.secondaryText }]}>
            Email campaigns are showing the highest ROI at 6.1x, while social campaigns have the best engagement rates.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderTemplates = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Campaign Templates</Text>
        <View style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.templateTitle, { color: theme.colors.text }]}>Product Launch Template</Text>
          <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]}>
            Complete multi-channel campaign template for new product launches.
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Campaign</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['campaigns', 'analytics', 'templates'] as const).map((tab) => (
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
      {selectedTab === 'campaigns' && renderCampaigns()}
      {selectedTab === 'analytics' && renderAnalytics()}
      {selectedTab === 'templates' && renderTemplates()}
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  filters: {
    flexDirection: 'row',
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    gap: 8,
  },
  filterGroupTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  campaignsList: {
    gap: 16,
  },
  campaignCard: {
    padding: 16,
    borderRadius: 12,
  },
  campaignHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  campaignInfo: {
    flex: 1,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  campaignDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  campaignBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
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
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  campaignActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  channelsSection: {
    marginBottom: 16,
  },
  channelsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  channelsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  channelTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  channelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  budgetSection: {
    marginBottom: 16,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  budgetValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  budgetBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  budgetProgress: {
    height: '100%',
    borderRadius: 3,
  },
  budgetPercentage: {
    fontSize: 12,
    textAlign: 'right',
  },
  campaignMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricItemValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricItemLabel: {
    fontSize: 12,
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campaignDates: {
    fontSize: 12,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  viewDetailsText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
  },
  analyticsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  analyticsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  templateCard: {
    padding: 16,
    borderRadius: 12,
  },
  templateTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});