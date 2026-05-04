 
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
  Megaphone,
  Target,
  Users,
  TrendingUp,
  Calendar,
  Play,
  Pause,
  Pencil,
  Copy,
  Trash2,
  ArrowLeft,
  Plus,
  ListFilter,
  ChartBar,
  Activity,
  Zap,
  Clock,
  CircleCheck,
  TriangleAlert,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface AdsManager {
  id: string;
  name: string;
  platform: string;
  campaignType: 'search' | 'display' | 'video' | 'shopping' | 'social';
  status: 'active' | 'paused' | 'draft' | 'ended';
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
}

interface AdMetric {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
}

const mockAdsData: AdsManager[] = [
  {
    id: '1',
    name: 'Summer Sale Search Campaign',
    platform: 'Google Ads',
    campaignType: 'search',
    status: 'active',
    budget: 5000,
    spent: 3750,
    impressions: 125000,
    clicks: 3750,
    conversions: 187,
    ctr: 3.0,
    cpc: 1.0,
    roas: 4.2,
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    targetAudience: 'Adults 25-45, interested in fashion',
  },
  {
    id: '2',
    name: 'Brand Video Campaign',
    platform: 'YouTube',
    campaignType: 'video',
    status: 'active',
    budget: 8000,
    spent: 4800,
    impressions: 89000,
    clicks: 1780,
    conversions: 89,
    ctr: 2.0,
    cpc: 2.7,
    roas: 3.1,
    startDate: '2024-07-01',
    endDate: '2024-09-30',
    targetAudience: 'Young adults 18-35, tech enthusiasts',
  },
  {
    id: '3',
    name: 'Social Media Retargeting',
    platform: 'Facebook',
    campaignType: 'social',
    status: 'paused',
    budget: 3000,
    spent: 2100,
    impressions: 67000,
    clicks: 1340,
    conversions: 67,
    ctr: 2.0,
    cpc: 1.6,
    roas: 2.8,
    startDate: '2024-05-15',
    endDate: '2024-07-15',
    targetAudience: 'Website visitors, cart abandoners',
  },
];

const adMetrics: AdMetric[] = [
  {
    title: 'Total Spend',
    value: '$10.65K',
    change: '+12%',
    icon: Target,
    color: '#007AFF',
  },
  {
    title: 'Impressions',
    value: '281K',
    change: '+18%',
    icon: Activity,
    color: '#34C759',
  },
  {
    title: 'Clicks',
    value: '6.87K',
    change: '+15%',
    icon: Zap,
    color: '#FF9500',
  },
  {
    title: 'ROAS',
    value: '3.4x',
    change: '+0.3x',
    icon: TrendingUp,
    color: '#AF52DE',
  },
];

export default function AdsManagerScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState<'campaigns' | 'audiences' | 'creatives'>('campaigns');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'draft': return '#8E8E93';
      case 'ended': return '#007AFF';
      default: return theme.colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CircleCheck;
      case 'paused': return Pause;
      case 'draft': return Pencil;
      case 'ended': return Clock;
      default: return TriangleAlert;
    }
  };

  const getCampaignTypeColor = (type: string) => {
    switch (type) {
      case 'search': return '#007AFF';
      case 'display': return '#34C759';
      case 'video': return '#AF52DE';
      case 'shopping': return '#FF9500';
      case 'social': return '#FF3B30';
      default: return theme.colors.secondaryText;
    }
  };

  const filteredAds = mockAdsData.filter(ad => {
    const matchesSearch = ad.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ad.status === filterStatus;
    const matchesPlatform = filterPlatform === 'all' || ad.platform.toLowerCase().includes(filterPlatform.toLowerCase());
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  const renderMetric = ({ item }: { item: AdMetric }) => {
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

  const renderAd = ({ item }: { item: AdsManager }) => {
    const statusColor = getStatusColor(item.status);
    const StatusIcon = getStatusIcon(item.status);
    const typeColor = getCampaignTypeColor(item.campaignType);
    const budgetUsed = (item.spent / item.budget) * 100;
    
    return (
      <View style={[styles.adCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.adHeader}>
          <View style={styles.adInfo}>
            <Text style={[styles.adName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.adPlatform, { color: theme.colors.secondaryText }]}>
              {item.platform}
            </Text>
            <View style={styles.adBadges}>
              <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                <StatusIcon size={12} color={statusColor} />
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                <Text style={[styles.typeText, { color: typeColor }]}>
                  {item.campaignType.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.adActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Pencil size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Copy size={16} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              {item.status === 'active' ? (
                <Pause size={16} color={theme.colors.text} />
              ) : (
                <Play size={16} color={theme.colors.text} />
              )}
            </TouchableOpacity>
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

        <View style={styles.adMetrics}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.impressions.toLocaleString()}
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Impressions</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.clicks.toLocaleString()}
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>Clicks</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.ctr}%
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>CTR</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
              {item.roas}x
            </Text>
            <Text style={[styles.metricItemLabel, { color: theme.colors.secondaryText }]}>ROAS</Text>
          </View>
        </View>

        <View style={styles.audienceSection}>
          <Text style={[styles.audienceLabel, { color: theme.colors.secondaryText }]}>Target Audience:</Text>
          <Text style={[styles.audienceText, { color: theme.colors.text }]}>{item.targetAudience}</Text>
        </View>

        <View style={styles.adFooter}>
          <Text style={[styles.adDates, { color: theme.colors.secondaryText }]}>
            {item.startDate} - {item.endDate}
          </Text>
          <TouchableOpacity style={[styles.viewDetailsButton, { backgroundColor: theme.colors.primary }]}>
            <ChartBar size={14} color="white" />
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
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Ads Overview</Text>
        <FlatList
          data={adMetrics}
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
            placeholder="Search ads..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
          <View style={styles.filterGroup}>
            <Text style={[styles.filterGroupTitle, { color: theme.colors.text }]}>Status:</Text>
            {['all', 'active', 'paused', 'draft', 'ended'].map((status) => (
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
            <Text style={[styles.filterGroupTitle, { color: theme.colors.text }]}>Platform:</Text>
            {['all', 'google', 'facebook', 'youtube', 'instagram'].map((platform) => (
              <TouchableOpacity
                key={platform}
                style={[
                  styles.filterChip,
                  filterPlatform === platform && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterPlatform(platform)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    {
                      color: filterPlatform === platform ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <FlatList
        data={filteredAds}
        renderItem={renderAd}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.adsList}
      />
    </ScrollView>
  );

  const renderAudiences = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Audience Insights</Text>
        <View style={[styles.audienceCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.audienceCardTitle, { color: theme.colors.text }]}>Top Performing Audiences</Text>
          <Text style={[styles.audienceCardDescription, { color: theme.colors.secondaryText }]}>
            Adults 25-45 interested in fashion show the highest conversion rates at 4.2x ROAS.
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderCreatives = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Ad Creatives</Text>
        <View style={[styles.creativeCard, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.creativeCardTitle, { color: theme.colors.text }]}>Creative Performance</Text>
          <Text style={[styles.creativeCardDescription, { color: theme.colors.secondaryText }]}>
            Video creatives are outperforming static images by 35% in engagement rates.
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Ads Manager</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <ListFilter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['campaigns', 'audiences', 'creatives'] as const).map((tab) => (
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
      {selectedTab === 'audiences' && renderAudiences()}
      {selectedTab === 'creatives' && renderCreatives()}
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
  adsList: {
    gap: 16,
  },
  adCard: {
    padding: 16,
    borderRadius: 12,
  },
  adHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  adInfo: {
    flex: 1,
  },
  adName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  adPlatform: {
    fontSize: 14,
    marginBottom: 8,
  },
  adBadges: {
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
  adActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
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
  adMetrics: {
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
  audienceSection: {
    marginBottom: 16,
  },
  audienceLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  audienceText: {
    fontSize: 14,
  },
  adFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adDates: {
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
  audienceCard: {
    padding: 16,
    borderRadius: 12,
  },
  audienceCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  audienceCardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  creativeCard: {
    padding: 16,
    borderRadius: 12,
  },
  creativeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  creativeCardDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
