 
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
  FileText,
  Users,
  Target,
  Calendar,
  Plus,
  Search,
  Pencil,
  Share2,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Clock,
  Image as ImageIcon,
  Video,
  Mic,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface ContentItem {
  id: string;
  title: string;
  type: 'article' | 'video' | 'image' | 'audio' | 'social';
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  createdDate: string;
  publishDate?: string;
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
  tags: string[];
}

interface ContentTemplate {
  id: string;
  name: string;
  type: 'article' | 'video' | 'image' | 'audio' | 'social';
  description: string;
  usageCount: number;
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: '10 Marketing Trends for 2024',
    type: 'article',
    status: 'published',
    author: 'Sarah Johnson',
    createdDate: '2024-01-15',
    publishDate: '2024-01-16',
    engagement: { views: 2450, likes: 189, comments: 34, shares: 67 },
    tags: ['Marketing', 'Trends', '2024'],
  },
  {
    id: '2',
    title: 'Product Demo Video',
    type: 'video',
    status: 'scheduled',
    author: 'Mike Chen',
    createdDate: '2024-01-18',
    publishDate: '2024-01-20',
    engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
    tags: ['Product', 'Demo', 'Video'],
  },
  {
    id: '3',
    title: 'Social Media Campaign Graphics',
    type: 'image',
    status: 'draft',
    author: 'Emma Wilson',
    createdDate: '2024-01-19',
    engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
    tags: ['Social Media', 'Graphics', 'Campaign'],
  },
];

const mockTemplates: ContentTemplate[] = [
  {
    id: '1',
    name: 'Blog Post Template',
    type: 'article',
    description: 'Standard blog post structure with introduction, body, and conclusion',
    usageCount: 45,
  },
  {
    id: '2',
    name: 'Social Media Post',
    type: 'social',
    description: 'Engaging social media post template with call-to-action',
    usageCount: 128,
  },
  {
    id: '3',
    name: 'Product Showcase Video',
    type: 'video',
    description: 'Video template for showcasing product features and benefits',
    usageCount: 23,
  },
];

export default function ContentCreationScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'content' | 'templates' | 'analytics'>('content');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'article' | 'video' | 'image' | 'audio' | 'social'>('all');

  const getContentIcon = (type: ContentItem['type']) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'image': return ImageIcon;
      case 'audio': return Mic;
      case 'social': return Share2;
      default: return FileText;
    }
  };

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'published': return '#34C759';
      case 'scheduled': return '#FF9500';
      case 'draft': return '#8E8E93';
      default: return '#8E8E93';
    }
  };

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const renderContentItem = ({ item }: { item: ContentItem }) => {
    const IconComponent = getContentIcon(item.type);
    
    return (
      <View style={[styles.contentCard, { backgroundColor: theme.colors.cardBackground }]}>
        <View style={styles.contentHeader}>
          <View style={styles.contentInfo}>
            <View style={[styles.contentIcon, { backgroundColor: theme.colors.primary + '20' }]}>
              <IconComponent size={20} color={theme.colors.primary} />
            </View>
            <View style={styles.contentDetails}>
              <Text style={[styles.contentTitle, { color: theme.colors.text }]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={[styles.contentAuthor, { color: theme.colors.secondaryText }]}>
                by {item.author}
              </Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.contentMeta}>
          <Text style={[styles.contentDate, { color: theme.colors.secondaryText }]}>
            Created: {item.createdDate}
          </Text>
          {item.publishDate && (
            <Text style={[styles.contentDate, { color: theme.colors.secondaryText }]}>
              Publish: {item.publishDate}
            </Text>
          )}
        </View>

        <View style={styles.engagementStats}>
          <View style={styles.statItem}>
            <Eye size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
              {item.engagement.views}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Heart size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
              {item.engagement.likes}
            </Text>
          </View>
          <View style={styles.statItem}>
            <MessageCircle size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
              {item.engagement.comments}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Share2 size={14} color={theme.colors.secondaryText} />
            <Text style={[styles.statText, { color: theme.colors.secondaryText }]}>
              {item.engagement.shares}
            </Text>
          </View>
        </View>

        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <View key={index} style={[styles.tag, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.tagText, { color: theme.colors.secondaryText }]}>#{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.contentActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Pencil size={16} color={theme.colors.primary} />
            <Text style={[styles.actionText, { color: theme.colors.primary }]}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share2 size={16} color={theme.colors.primary} />
            <Text style={[styles.actionText, { color: theme.colors.primary }]}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTemplateItem = ({ item }: { item: ContentTemplate }) => {
    const IconComponent = getContentIcon(item.type);
    
    return (
      <TouchableOpacity 
        style={[styles.templateCard, { backgroundColor: theme.colors.cardBackground }]}
        onPress={() => Alert.alert('Use Template', `Using template: ${item.name}`)}
      >
        <View style={styles.templateHeader}>
          <View style={[styles.templateIcon, { backgroundColor: theme.colors.primary + '20' }]}>
            <IconComponent size={24} color={theme.colors.primary} />
          </View>
          <View style={styles.templateInfo}>
            <Text style={[styles.templateName, { color: theme.colors.text }]}>{item.name}</Text>
            <Text style={[styles.templateDescription, { color: theme.colors.secondaryText }]} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
        </View>
        <View style={styles.templateFooter}>
          <Text style={[styles.usageCount, { color: theme.colors.secondaryText }]}>
            Used {item.usageCount} times
          </Text>
          <View style={[styles.templateType, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.templateTypeText, { color: theme.colors.text }]}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderAnalytics = () => (
    <ScrollView style={styles.analyticsContainer}>
      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Content Performance</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#007AFF' }]}>12.5K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Total Views</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#34C759' }]}>1.2K</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Engagements</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF9500' }]}>8.7%</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Engagement Rate</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={[styles.metricValue, { color: '#FF3B30' }]}>45</Text>
            <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>Published</Text>
          </View>
        </View>
      </View>

      <View style={[styles.analyticsCard, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.analyticsTitle, { color: theme.colors.text }]}>Top Performing Content</Text>
        {mockContent.slice(0, 3).map((item) => (
          <View key={item.id} style={styles.topContentItem}>
            <Text style={[styles.topContentTitle, { color: theme.colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.topContentStats}>
              <Text style={[styles.topContentStat, { color: '#007AFF' }]}>
                {item.engagement.views} views
              </Text>
              <Text style={[styles.topContentStat, { color: '#34C759' }]}>
                {item.engagement.likes} likes
              </Text>
            </View>
          </View>
        ))}
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
        <Text style={[styles.title, { color: theme.colors.text }]}>Content Creation</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Plus size={20} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['content', 'templates', 'analytics'] as const).map((tab) => (
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

      {/* Search and Filters */}
      {activeTab === 'content' && (
        <View style={styles.filtersContainer}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search content..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeFilters}>
            {(['all', 'article', 'video', 'image', 'audio', 'social'] as const).map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeFilter,
                  filterType === type && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setFilterType(type)}
              >
                <Text
                  style={[
                    styles.typeFilterText,
                    {
                      color: filterType === type ? 'white' : theme.colors.secondaryText,
                    },
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Content */}
      {activeTab === 'content' && (
        <FlatList
          data={filteredContent}
          renderItem={renderContentItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'templates' && (
        <FlatList
          data={mockTemplates}
          renderItem={renderTemplateItem}
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
        onPress={() => Alert.alert('Create Content', 'Content creation feature coming soon!')}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  filtersContainer: {
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
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  typeFilters: {
    flexDirection: 'row',
  },
  typeFilter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginRight: 8,
  },
  typeFilterText: {
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
  contentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentInfo: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  contentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDetails: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contentAuthor: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  contentMeta: {
    marginBottom: 12,
  },
  contentDate: {
    fontSize: 12,
    marginBottom: 2,
  },
  engagementStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 10,
  },
  contentActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  templateCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templateHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usageCount: {
    fontSize: 12,
  },
  templateType: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  templateTypeText: {
    fontSize: 10,
    fontWeight: '500',
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
  topContentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  topContentTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  topContentStats: {
    flexDirection: 'row',
    gap: 12,
  },
  topContentStat: {
    fontSize: 12,
    fontWeight: '500',
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