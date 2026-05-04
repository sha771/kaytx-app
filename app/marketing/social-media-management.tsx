 
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeft,
  Share2,
  Plus,
  Search,
  MessageSquare,
  Heart,
  Eye,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface SocialAccount {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  username: string;
  followers: number;
  isConnected: boolean;
  lastPost: string;
}

interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  content: string;
  status: 'published' | 'scheduled' | 'draft';
  publishDate: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  hashtags: string[];
}

interface Campaign {
  id: string;
  name: string;
  platforms: string[];
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  postsCount: number;
  totalEngagement: number;
}

const mockAccounts: SocialAccount[] = [
  {
    id: '1',
    platform: 'instagram',
    username: '@company_official',
    followers: 15420,
    isConnected: true,
    lastPost: '2 hours ago',
  },
  {
    id: '2',
    platform: 'facebook',
    username: 'Company Page',
    followers: 8900,
    isConnected: true,
    lastPost: '1 day ago',
  },
  {
    id: '3',
    platform: 'twitter',
    username: '@company',
    followers: 5600,
    isConnected: false,
    lastPost: '3 days ago',
  },
  {
    id: '4',
    platform: 'linkedin',
    username: 'Company LinkedIn',
    followers: 3200,
    isConnected: true,
    lastPost: '1 week ago',
  },
];

const mockPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'instagram',
    content: 'Excited to announce our new product launch! 🚀 #innovation #product',
    status: 'published',
    publishDate: '2024-01-19 10:00',
    engagement: { likes: 245, comments: 18, shares: 12, views: 1200 },
    hashtags: ['innovation', 'product', 'launch'],
  },
  {
    id: '2',
    platform: 'facebook',
    content: 'Join us for our upcoming webinar on digital marketing trends.',
    status: 'scheduled',
    publishDate: '2024-01-20 14:00',
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    hashtags: ['webinar', 'marketing', 'trends'],
  },
  {
    id: '3',
    platform: 'twitter',
    content: 'Quick tip: Always engage with your audience authentically! #socialmedia',
    status: 'draft',
    publishDate: '2024-01-21 09:00',
    engagement: { likes: 0, comments: 0, shares: 0, views: 0 },
    hashtags: ['socialmedia', 'tips', 'engagement'],
  },
];

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Product Launch Campaign',
    platforms: ['instagram', 'facebook', 'twitter'],
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    postsCount: 12,
    totalEngagement: 3450,
  },
  {
    id: '2',
    name: 'Brand Awareness',
    platforms: ['linkedin', 'facebook'],
    status: 'completed',
    startDate: '2024-01-01',
    endDate: '2024-01-14',
    postsCount: 8,
    totalEngagement: 1890,
  },
];

export default function SocialMediaManagementScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'accounts' | 'posts' | 'campaigns' | 'analytics'>('accounts');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getPlatformIcon = (platform: SocialAccount['platform']) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'facebook': return Facebook;
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'youtube': return Youtube;
      default: return Share2;
    }
  };

  const getPlatformColor = (platform: SocialAccount['platform']) => {
    switch (platform) {
      case 'instagram': return '#E4405F';
      case 'facebook': return '#1877F2';
      case 'twitter': return '#1DA1F2';
      case 'linkedin': return '#0A66C2';
      case 'youtube': return '#FF0000';
      default: return '#8E8E93';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return '#34C759';
      case 'scheduled': return '#FF9500';
      case 'draft': return '#8E8E93';
      case 'active': return '#34C759';
      case 'paused': return '#FF9500';
      case 'completed': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const renderAccountItem = ({ item }: { item: SocialAccount }) => {
    const IconComponent = getPlatformIcon(item.platform);
    const platformColor = getPlatformColor(item.platform);
    
    return (
      <View style={[styles.accountCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.accountHeader}>
          <View style={styles.accountInfo}>
            <View style={[styles.platformIcon, { backgroundColor: platformColor + '20' }]}>
              <IconComponent size={24} color={platformColor} />
            </View>
            <View>
              <Text style={[styles.accountUsername, { color: theme.colors.text }]}>
                {item.username}
              </Text>
              <Text style={[styles.accountFollowers, { color: theme.colors.secondaryText }]}>
                {item.followers.toLocaleString()} followers
              </Text>
            </View>
          </View>
          <View style={[styles.connectionStatus, { 
            backgroundColor: item.isConnected ? '#34C759' : '#FF3B30' 
          }]}>
            <Text style={styles.connectionText}>
              {item.isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>
        
        <View style={styles.accountFooter}>
          <Text style={[styles.lastPost, { color: theme.colors.secondaryText }]}>
            Last post: {item.lastPost}
          </Text>
          <TouchableOpacity 
            style={[styles.manageButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => Alert.alert('Manage Account', `Managing ${item.platform} account`)}
          >
            <Text style={styles.manageButtonText}>Manage</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPostItem = ({ item }: { item: SocialPost }) => {
    const IconComponent = getPlatformIcon(item.platform);
    const platformColor = getPlatformColor(item.platform);
    
    return (
      <View style={[styles.postCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.postHeader}>
          <View style={styles.postPlatform}>
            <IconComponent size={16} color={platformColor} />
            <Text style={[styles.platformName, { color: theme.colors.text }]}>
              {item.platform.charAt(0).toUpperCase() + item.platform.slice(1)}
            </Text>
          </View>
          <View style={[styles.postStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.postStatusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.postContent, { color: theme.colors.text }]} numberOfLines={3}>
          {item.content}
        </Text>
        
        <View style={styles.postMeta}>
          <Text style={[styles.postDate, { color: theme.colors.secondaryText }]}>
            {item.publishDate}
          </Text>
        </View>
        
        {item.status === 'published' && (
          <View style={styles.postEngagement}>
            <View style={styles.engagementItem}>
              <Heart size={14} color="#FF3B30" />
              <Text style={[styles.engagementText, { color: theme.colors.secondaryText }]}>
                {item.engagement.likes}
              </Text>
            </View>
            <View style={styles.engagementItem}>
              <MessageSquare size={14} color="#007AFF" />
              <Text style={[styles.engagementText, { color: theme.colors.secondaryText }]}>
                {item.engagement.comments}
              </Text>
            </View>
            <View style={styles.engagementItem}>
              <Share2 size={14} color="#34C759" />
              <Text style={[styles.engagementText, { color: theme.colors.secondaryText }]}>
                {item.engagement.shares}
              </Text>
            </View>
            <View style={styles.engagementItem}>
              <Eye size={14} color="#FF9500" />
              <Text style={[styles.engagementText, { color: theme.colors.secondaryText }]}>
                {item.engagement.views}
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.hashtagsContainer}>
          {item.hashtags.map((hashtag, index) => (
            <Text key={index} style={[styles.hashtag, { color: theme.colors.primary }]}>
              #{hashtag}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderCampaignItem = ({ item }: { item: Campaign }) => (
    <View style={[styles.campaignCard, { backgroundColor: theme.colors.cardBackground }]}>
      <View style={styles.campaignHeader}>
        <View>
          <Text style={[styles.campaignName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.campaignDates, { color: theme.colors.secondaryText }]}>
            {item.startDate} - {item.endDate}
          </Text>
        </View>
        <View style={[styles.campaignStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.campaignStatusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.campaignPlatforms}>
        {item.platforms.map((platform, index) => {
          const IconComponent = getPlatformIcon(platform as SocialAccount['platform']);
          const platformColor = getPlatformColor(platform as SocialAccount['platform']);
          return (
            <View key={index} style={[styles.campaignPlatform, { backgroundColor: platformColor + '20' }]}>
              <IconComponent size={12} color={platformColor} />
            </View>
          );
        })}
      </View>
      
      <View style={styles.campaignStats}>
        <View style={styles.campaignStat}>
          <Text style={[styles.campaignStatValue, { color: theme.colors.text }]}>{item.postsCount}</Text>
          <Text style={[styles.campaignStatLabel, { color: theme.colors.secondaryText }]}>Posts</Text>
        </View>
        <View style={styles.campaignStat}>
          <Text style={[styles.campaignStatValue, { color: theme.colors.text }]}>{item.totalEngagement}</Text>
          <Text style={[styles.campaignStatLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
        </View>
      </View>
    </View>
  );

  const renderAnalytics = () => (
    <ScrollView style={styles.analyticsContainer}>
      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Overall Performance</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#007AFF' }]}>45.2K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Total Reach</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#34C759' }]}>3.2K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Engagements</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF9500' }]}>7.1%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Engagement Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF3B30' }]}>28</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Posts This Month</Text>
          </View>
        </View>
      </View>

      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Platform Performance</Text>
        {mockAccounts.map((account) => {
          const IconComponent = getPlatformIcon(account.platform);
          const platformColor = getPlatformColor(account.platform);
          return (
            <View key={account.id} style={styles.platformPerformance}>
              <View style={styles.platformInfo}>
                <IconComponent size={16} color={platformColor} />
                <Text style={[styles.platformPerformanceName, { color: theme.colors.text }]}>
                  {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                </Text>
              </View>
              <Text style={[styles.platformPerformanceValue, { color: '#34C759' }]}>
                +12.5%
              </Text>
            </View>
          );
        })}
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Social Media Management</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['accounts', 'posts', 'campaigns', 'analytics'] as const).map((tab) => (
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

      {/* Search */}
      {(activeTab === 'posts' || activeTab === 'campaigns') && (
        <View style={styles.searchContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder={`Search ${activeTab}...`}
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      )}

      {/* Content */}
      {activeTab === 'accounts' && (
        <FlatList
          data={mockAccounts}
          renderItem={renderAccountItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'posts' && (
        <FlatList
          data={mockPosts}
          renderItem={renderPostItem}
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

      {activeTab === 'analytics' && renderAnalytics()}

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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  accountCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  accountHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  platformIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountUsername: {
    fontSize: 16,
    fontWeight: '600',
  },
  accountFollowers: {
    fontSize: 12,
    marginTop: 2,
  },
  connectionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  connectionText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  accountFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastPost: {
    fontSize: 12,
  },
  manageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  manageButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  postCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  postPlatform: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  platformName: {
    fontSize: 12,
    fontWeight: '500',
  },
  postStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  postStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postMeta: {
    marginBottom: 12,
  },
  postDate: {
    fontSize: 12,
  },
  postEngagement: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  engagementText: {
    fontSize: 12,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  hashtag: {
    fontSize: 12,
    fontWeight: '500',
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
    marginBottom: 12,
  },
  campaignName: {
    fontSize: 16,
    fontWeight: '600',
  },
  campaignDates: {
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
  campaignPlatforms: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  campaignPlatform: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  campaignStat: {
    alignItems: 'center',
  },
  campaignStatValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  campaignStatLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  analyticsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  analyticsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsTitle: {
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
  },
  metricLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  platformPerformance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  platformPerformanceName: {
    fontSize: 14,
    fontWeight: '500',
  },
  platformPerformanceValue: {
    fontSize: 14,
    fontWeight: '600',
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
