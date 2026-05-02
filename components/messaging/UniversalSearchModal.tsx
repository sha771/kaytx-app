import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  MessageCircle,
  Image as ImageIcon,
  FileText,
  Link2,
  Globe,
  ChevronDown,
  Sparkles,
  Hash,
  Mic,
  Camera,
  Star,
  Bookmark,
  History,
  Zap,
  Brain,
  SlidersHorizontal,
  ArrowRight,
  CircleCheck,
  Eye,
  Download,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useMessaging } from '@/providers/MessagingProvider';
import { getServiceIcon, getServiceColor } from '@/utils/services';
import { ServiceType } from '@/types/messaging';

const { width } = Dimensions.get('window');

interface SearchResult {
  id: string;
  type: 'message' | 'contact' | 'attachment' | 'link' | 'file' | 'location';
  title: string;
  subtitle: string;
  timestamp: string;
  platform: string;
  avatar?: string;
  highlight?: string;
  conversationId?: string;
  relevanceScore?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  hasAttachment?: boolean;
  isStarred?: boolean;
}

interface SearchFilter {
  platforms: string[];
  dateRange: 'all' | 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  contentType: 'all' | 'messages' | 'media' | 'links' | 'files' | 'locations';
  contacts: string[];
  sentiment: 'all' | 'positive' | 'neutral' | 'negative';
  hasAttachment: boolean;
  isStarred: boolean;
  customDateStart?: Date;
  customDateEnd?: Date;
}

interface SmartSuggestion {
  id: string;
  query: string;
  type: 'ai' | 'recent' | 'trending' | 'saved';
  icon: React.ReactNode;
  description?: string;
  relevance: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function UniversalSearchModal({ visible, onClose }: Props) {
  const { theme } = useTheme();
  const { conversations } = useMessaging();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'all' | 'messages' | 'contacts' | 'media' | 'files'>('all');
  const [isSearching, setIsSearching] = useState(false);
  
  
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'platform'>('relevance');
  
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'project update',
    'meeting tomorrow',
    'invoice #2024',
    'John Smith contract',
    'budget report Q4',
  ]);
  
  const [savedSearches, setSavedSearches] = useState<string[]>([
    'VIP client messages',
    'Urgent unread',
    'Weekly reports',
  ]);
  
  const [filters, setFilters] = useState<SearchFilter>({
    platforms: [],
    dateRange: 'all',
    contentType: 'all',
    contacts: [],
    sentiment: 'all',
    hasAttachment: false,
    isStarred: false,
  });

  const searchAnimation = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      Animated.spring(searchAnimation, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      searchAnimation.setValue(0);
    }
  }, [visible, searchAnimation]);

  const smartSuggestions = useMemo((): SmartSuggestion[] => {
    const suggestions: SmartSuggestion[] = [
      {
        id: 'ai-1',
        query: 'urgent messages this week',
        type: 'ai',
        icon: <Brain size={16} color="#8B5CF6" />,
        description: 'AI detected 12 urgent messages',
        relevance: 95,
      },
      {
        id: 'ai-2',
        query: 'unread from VIP contacts',
        type: 'ai',
        icon: <Star size={16} color="#F59E0B" />,
        description: '5 VIP messages need attention',
        relevance: 90,
      },
      {
        id: 'ai-3',
        query: 'shared files last month',
        type: 'ai',
        icon: <FileText size={16} color="#10B981" />,
        description: '28 files shared across platforms',
        relevance: 85,
      },
      {
        id: 'trend-1',
        query: '#project-alpha',
        type: 'trending',
        icon: <TrendingUp size={16} color="#3B82F6" />,
        description: 'Trending in your workspace',
        relevance: 80,
      },
    ];
    
    recentSearches.slice(0, 3).forEach((search, i) => {
      suggestions.push({
        id: `recent-${i}`,
        query: search,
        type: 'recent',
        icon: <History size={16} color={theme.colors.secondaryText} />,
        relevance: 70 - i * 5,
      });
    });
    
    return suggestions.sort((a, b) => b.relevance - a.relevance);
  }, [recentSearches, theme.colors.secondaryText]);

  const trendingTopics = useMemo(() => [
    { tag: '#project-alpha', count: 47, trend: '+15%', color: '#3B82F6' },
    { tag: '#urgent', count: 23, trend: '+8%', color: '#EF4444' },
    { tag: '#meeting-notes', count: 19, trend: '+12%', color: '#10B981' },
    { tag: '#budget-review', count: 15, trend: '+5%', color: '#F59E0B' },
    { tag: '#team-update', count: 12, trend: '+3%', color: '#8B5CF6' },
  ], []);

  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);

    const results: SearchResult[] = [];
    const query = searchQuery.toLowerCase();

    conversations.forEach(conv => {
      if (conv.name.toLowerCase().includes(query)) {
        results.push({
          id: `contact-${conv.id}`,
          type: 'contact',
          title: conv.name,
          subtitle: `${conv.service} • ${conv.isOnline ? 'Online' : 'Offline'} • ${conv.messages.length} messages`,
          timestamp: conv.timestamp,
          platform: conv.service,
          avatar: conv.avatar,
          relevanceScore: 95,
          sentiment: 'neutral',
          isStarred: conv.isPinned,
        });
      }

      conv.messages.forEach(msg => {
        if (msg.text.toLowerCase().includes(query)) {
          const highlightStart = msg.text.toLowerCase().indexOf(query);
          const highlightEnd = highlightStart + query.length;
          const highlight = `...${msg.text.slice(Math.max(0, highlightStart - 30), highlightEnd + 30)}...`;
          
          results.push({
            id: `msg-${conv.id}-${msg.id}`,
            type: 'message',
            title: conv.name,
            subtitle: highlight,
            timestamp: msg.timestamp,
            platform: conv.service,
            avatar: conv.avatar,
            highlight: query,
            conversationId: conv.id,
            relevanceScore: Math.floor(Math.random() * 30) + 70,
            sentiment: Math.random() > 0.7 ? 'positive' : Math.random() > 0.5 ? 'neutral' : 'negative',
            hasAttachment: Math.random() > 0.8,
          });
        }
      });
    });

    if (filters.platforms.length > 0) {
      return results.filter(r => filters.platforms.includes(r.platform));
    }

    if (filters.sentiment !== 'all') {
      return results.filter(r => r.sentiment === filters.sentiment);
    }

    if (filters.isStarred) {
      return results.filter(r => r.isStarred);
    }

    const sorted = [...results];
    if (sortBy === 'relevance') {
      sorted.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));
    } else if (sortBy === 'date') {
      sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    return sorted.slice(0, 100);
  }, [searchQuery, conversations, filters, sortBy]);

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return searchResults;
    if (activeTab === 'messages') return searchResults.filter(r => r.type === 'message');
    if (activeTab === 'contacts') return searchResults.filter(r => r.type === 'contact');
    if (activeTab === 'media') return searchResults.filter(r => r.type === 'attachment');
    if (activeTab === 'files') return searchResults.filter(r => r.type === 'file');
    return searchResults;
  }, [searchResults, activeTab]);

  const tabCounts = useMemo(() => ({
    all: searchResults.length,
    messages: searchResults.filter(r => r.type === 'message').length,
    contacts: searchResults.filter(r => r.type === 'contact').length,
    media: searchResults.filter(r => r.type === 'attachment').length,
    files: searchResults.filter(r => r.type === 'file').length,
  }), [searchResults]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query.trim())) {
      setRecentSearches(prev => [query.trim(), ...prev.slice(0, 9)]);
    }
  }, [recentSearches]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const saveSearch = useCallback((query: string) => {
    if (!savedSearches.includes(query)) {
      setSavedSearches(prev => [query, ...prev]);
    }
  }, [savedSearches]);

  const platforms = ['whatsapp', 'telegram', 'instagram', 'messenger', 'sms', 'slack', 'discord'];

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => {
    const ServiceIcon = getServiceIcon(item.platform as ServiceType);
    const serviceColor = getServiceColor(item.platform as ServiceType);

    return (
      <TouchableOpacity 
        style={[styles.resultItem, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
        onPress={() => console.log('Selected:', item.id)}
      >
        <View style={styles.resultAvatar}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          ) : (
            <View style={[styles.iconAvatar, { backgroundColor: serviceColor + '20' }]}>
              {item.type === 'message' && <MessageCircle size={20} color={serviceColor} />}
              {item.type === 'attachment' && <ImageIcon size={20} color={serviceColor} />}
              {item.type === 'link' && <Link2 size={20} color={serviceColor} />}
              {item.type === 'file' && <FileText size={20} color={serviceColor} />}
            </View>
          )}
          <View style={[styles.platformBadge, { backgroundColor: serviceColor }]}>
            <ServiceIcon size={10} color="#FFF" />
          </View>
        </View>
        
        <View style={styles.resultContent}>
          <View style={styles.resultHeader}>
            <Text style={[styles.resultTitle, { color: theme.colors.text }]} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.resultMeta}>
              {item.relevanceScore && (
                <View style={[styles.relevanceBadge, { backgroundColor: theme.colors.primary + '15' }]}>
                  <Zap size={10} color={theme.colors.primary} />
                  <Text style={[styles.relevanceText, { color: theme.colors.primary }]}>
                    {item.relevanceScore}%
                  </Text>
                </View>
              )}
              {item.isStarred && <Star size={12} color="#F59E0B" fill="#F59E0B" />}
            </View>
          </View>
          <Text style={[styles.resultSubtitle, { color: theme.colors.secondaryText }]} numberOfLines={2}>
            {item.subtitle}
          </Text>
          <View style={styles.resultFooter}>
            <Text style={[styles.resultTime, { color: theme.colors.secondaryText }]}>
              {item.timestamp}
            </Text>
            {item.sentiment && (
              <View style={[styles.sentimentDot, { backgroundColor: getSentimentColor(item.sentiment) }]} />
            )}
            {item.hasAttachment && <FileText size={12} color={theme.colors.secondaryText} />}
          </View>
        </View>

        <View style={styles.resultActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Eye size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Bookmark size={16} color={theme.colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSmartSuggestion = ({ item }: { item: SmartSuggestion }) => (
    <TouchableOpacity
      style={[styles.suggestionCard, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => handleSearch(item.query)}
    >
      <View style={styles.suggestionIcon}>{item.icon}</View>
      <View style={styles.suggestionContent}>
        <Text style={[styles.suggestionQuery, { color: theme.colors.text }]}>{item.query}</Text>
        {item.description && (
          <Text style={[styles.suggestionDesc, { color: theme.colors.secondaryText }]}>
            {item.description}
          </Text>
        )}
      </View>
      <ArrowRight size={16} color={theme.colors.secondaryText} />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
          <View style={styles.headerTop}>
            <View style={styles.titleRow}>
              <View style={[styles.titleIcon, { backgroundColor: '#3B82F615' }]}>
                <Globe size={22} color="#3B82F6" />
              </View>
              <View>
                <Text style={[styles.title, { color: theme.colors.text }]}>Universal Search</Text>
                <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
                  Search across all platforms
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <Animated.View style={[
            styles.searchContainer, 
            { 
              backgroundColor: theme.colors.cardBackground,
              transform: [{ scale: searchAnimation.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
            }
          ]}>
            <Search size={20} color={theme.colors.secondaryText} />
            <TextInput
              ref={inputRef}
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search messages, contacts, files..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <X size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            )}
            <View style={styles.searchActions}>
              <TouchableOpacity style={styles.searchActionButton}>
                <Mic size={18} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.searchActionButton}>
                <Camera size={18} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.filterToggle, showFilters && { backgroundColor: theme.colors.primary }]}
                onPress={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} color={showFilters ? '#FFF' : theme.colors.secondaryText} />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {searchQuery.length > 0 && (
            <View style={styles.aiSuggestions}>
              <View style={styles.aiHeader}>
                <Sparkles size={14} color={theme.colors.primary} />
                <Text style={[styles.aiLabel, { color: theme.colors.primary }]}>AI-Powered Suggestions</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {['exact match', 'similar context', 'related topics', 'sentiment analysis'].map((suggestion, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[styles.aiChip, { backgroundColor: theme.colors.primary + '15' }]}
                    onPress={() => handleSearch(`${searchQuery} ${suggestion}`)}
                  >
                    <Text style={[styles.aiChipText, { color: theme.colors.primary }]}>
                      {suggestion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {showFilters && (
            <ScrollView 
              style={[styles.filterPanel, { backgroundColor: theme.colors.cardBackground }]}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.filterSection}>
                <Text style={[styles.filterTitle, { color: theme.colors.text }]}>Platforms</Text>
                <View style={styles.platformFilters}>
                  {platforms.map(platform => {
                    const isSelected = filters.platforms.includes(platform);
                    const ServiceIcon = getServiceIcon(platform as ServiceType);
                    const color = getServiceColor(platform as ServiceType);
                    return (
                      <TouchableOpacity
                        key={platform}
                        style={[
                          styles.platformChip,
                          { borderColor: color },
                          isSelected && { backgroundColor: color },
                        ]}
                        onPress={() => {
                          setFilters(prev => ({
                            ...prev,
                            platforms: isSelected
                              ? prev.platforms.filter(p => p !== platform)
                              : [...prev.platforms, platform],
                          }));
                        }}
                      >
                        <ServiceIcon size={14} color={isSelected ? '#FFF' : color} />
                        <Text style={[styles.platformChipText, { color: isSelected ? '#FFF' : color }]}>
                          {platform}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterTitle, { color: theme.colors.text }]}>Date Range</Text>
                <View style={styles.dateFilters}>
                  {(['all', 'today', 'week', 'month', 'quarter', 'year'] as const).map(range => (
                    <TouchableOpacity
                      key={range}
                      style={[
                        styles.dateChip,
                        { borderColor: theme.colors.border },
                        filters.dateRange === range && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
                      ]}
                      onPress={() => setFilters(prev => ({ ...prev, dateRange: range }))}
                    >
                      <Text style={[
                        styles.dateChipText,
                        { color: filters.dateRange === range ? '#FFF' : theme.colors.text },
                      ]}>
                        {range === 'all' ? 'All Time' : range.charAt(0).toUpperCase() + range.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={[styles.filterTitle, { color: theme.colors.text }]}>Sentiment</Text>
                <View style={styles.sentimentFilters}>
                  {(['all', 'positive', 'neutral', 'negative'] as const).map(sentiment => (
                    <TouchableOpacity
                      key={sentiment}
                      style={[
                        styles.sentimentChip,
                        { borderColor: getSentimentColor(sentiment === 'all' ? undefined : sentiment) },
                        filters.sentiment === sentiment && { 
                          backgroundColor: getSentimentColor(sentiment === 'all' ? undefined : sentiment),
                        },
                      ]}
                      onPress={() => setFilters(prev => ({ ...prev, sentiment }))}
                    >
                      <Text style={[
                        styles.sentimentChipText,
                        { color: filters.sentiment === sentiment ? '#FFF' : getSentimentColor(sentiment === 'all' ? undefined : sentiment) },
                      ]}>
                        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterToggles}>
                <TouchableOpacity
                  style={[
                    styles.toggleFilter,
                    filters.hasAttachment && { backgroundColor: theme.colors.primary + '15' },
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, hasAttachment: !prev.hasAttachment }))}
                >
                  <FileText size={16} color={filters.hasAttachment ? theme.colors.primary : theme.colors.secondaryText} />
                  <Text style={[styles.toggleText, { color: filters.hasAttachment ? theme.colors.primary : theme.colors.text }]}>
                    Has Attachments
                  </Text>
                  {filters.hasAttachment && <CircleCheck size={16} color={theme.colors.primary} />}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.toggleFilter,
                    filters.isStarred && { backgroundColor: '#F59E0B15' },
                  ]}
                  onPress={() => setFilters(prev => ({ ...prev, isStarred: !prev.isStarred }))}
                >
                  <Star size={16} color={filters.isStarred ? '#F59E0B' : theme.colors.secondaryText} />
                  <Text style={[styles.toggleText, { color: filters.isStarred ? '#F59E0B' : theme.colors.text }]}>
                    Starred Only
                  </Text>
                  {filters.isStarred && <CircleCheck size={16} color="#F59E0B" />}
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}

          {searchQuery.length > 0 && (
            <View style={styles.tabs}>
              {(['all', 'messages', 'contacts', 'media', 'files'] as const).map(tab => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    activeTab === tab && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
                  ]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[
                    styles.tabText,
                    { color: activeTab === tab ? theme.colors.primary : theme.colors.secondaryText },
                  ]}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                  {tabCounts[tab] > 0 && (
                    <View style={[
                      styles.tabBadge, 
                      { backgroundColor: activeTab === tab ? theme.colors.primary : theme.colors.border }
                    ]}>
                      <Text style={[
                        styles.tabBadgeText,
                        { color: activeTab === tab ? '#FFF' : theme.colors.secondaryText }
                      ]}>
                        {tabCounts[tab]}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!searchQuery ? (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <Brain size={18} color={theme.colors.primary} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                      Smart Suggestions
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={smartSuggestions.slice(0, 5)}
                  renderItem={renderSmartSuggestion}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                />
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionTitleRow}>
                    <Clock size={18} color={theme.colors.secondaryText} />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                      Recent Searches
                    </Text>
                  </View>
                  <TouchableOpacity onPress={clearRecentSearches}>
                    <Text style={[styles.clearText, { color: theme.colors.primary }]}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentItem}
                    onPress={() => handleSearch(search)}
                  >
                    <History size={16} color={theme.colors.secondaryText} />
                    <Text style={[styles.recentText, { color: theme.colors.text }]}>{search}</Text>
                    <View style={styles.recentActions}>
                      <TouchableOpacity onPress={() => saveSearch(search)}>
                        <Bookmark size={16} color={theme.colors.secondaryText} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setRecentSearches(prev => prev.filter((_, i) => i !== index))}
                      >
                        <X size={16} color={theme.colors.secondaryText} />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {savedSearches.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionTitleRow}>
                    <Bookmark size={18} color="#F59E0B" />
                    <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                      Saved Searches
                    </Text>
                  </View>
                  <View style={styles.savedGrid}>
                    {savedSearches.map((search, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[styles.savedChip, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B' }]}
                        onPress={() => handleSearch(search)}
                      >
                        <Bookmark size={14} color="#F59E0B" />
                        <Text style={[styles.savedText, { color: '#F59E0B' }]}>{search}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <TrendingUp size={18} color="#10B981" />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Trending in Your Messages
                  </Text>
                </View>
                <View style={styles.trendingGrid}>
                  {trendingTopics.map((topic, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.trendingItem, { backgroundColor: topic.color + '10', borderColor: topic.color }]}
                      onPress={() => handleSearch(topic.tag)}
                    >
                      <View style={styles.trendingHeader}>
                        <Hash size={14} color={topic.color} />
                        <Text style={[styles.trendingTag, { color: topic.color }]}>
                          {topic.tag}
                        </Text>
                      </View>
                      <View style={styles.trendingStats}>
                        <Text style={[styles.trendingCount, { color: theme.colors.text }]}>
                          {topic.count} mentions
                        </Text>
                        <Text style={[styles.trendingTrend, { color: '#10B981' }]}>
                          {topic.trend}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Quick Access
                </Text>
                <View style={styles.quickActions}>
                  <TouchableOpacity 
                    style={[styles.quickAction, { backgroundColor: '#3B82F615' }]}
                    onPress={() => handleSearch('unread')}
                  >
                    <View style={[styles.quickIconBg, { backgroundColor: '#3B82F6' }]}>
                      <MessageCircle size={22} color="#FFF" />
                    </View>
                    <Text style={[styles.quickActionTitle, { color: '#3B82F6' }]}>Unread</Text>
                    <Text style={[styles.quickActionCount, { color: theme.colors.secondaryText }]}>47</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.quickAction, { backgroundColor: '#10B98115' }]}
                    onPress={() => handleSearch('images')}
                  >
                    <View style={[styles.quickIconBg, { backgroundColor: '#10B981' }]}>
                      <ImageIcon size={22} color="#FFF" />
                    </View>
                    <Text style={[styles.quickActionTitle, { color: '#10B981' }]}>Media</Text>
                    <Text style={[styles.quickActionCount, { color: theme.colors.secondaryText }]}>128</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.quickAction, { backgroundColor: '#F59E0B15' }]}
                    onPress={() => handleSearch('links')}
                  >
                    <View style={[styles.quickIconBg, { backgroundColor: '#F59E0B' }]}>
                      <Link2 size={22} color="#FFF" />
                    </View>
                    <Text style={[styles.quickActionTitle, { color: '#F59E0B' }]}>Links</Text>
                    <Text style={[styles.quickActionCount, { color: theme.colors.secondaryText }]}>56</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.quickAction, { backgroundColor: '#8B5CF615' }]}
                    onPress={() => handleSearch('files')}
                  >
                    <View style={[styles.quickIconBg, { backgroundColor: '#8B5CF6' }]}>
                      <FileText size={22} color="#FFF" />
                    </View>
                    <Text style={[styles.quickActionTitle, { color: '#8B5CF6' }]}>Files</Text>
                    <Text style={[styles.quickActionCount, { color: theme.colors.secondaryText }]}>34</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <>
              {isSearching ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={theme.colors.primary} />
                  <Text style={[styles.loadingText, { color: theme.colors.secondaryText }]}>
                    Searching across all platforms...
                  </Text>
                </View>
              ) : filteredResults.length > 0 ? (
                <View style={styles.resultsContainer}>
                  <View style={styles.resultsHeader}>
                    <Text style={[styles.resultsCount, { color: theme.colors.secondaryText }]}>
                      {filteredResults.length} results found
                    </Text>
                    <View style={styles.resultsActions}>
                      <TouchableOpacity 
                        style={styles.sortButton}
                        onPress={() => setSortBy(sortBy === 'relevance' ? 'date' : 'relevance')}
                      >
                        <Text style={[styles.sortText, { color: theme.colors.primary }]}>
                          {sortBy === 'relevance' ? 'Most Relevant' : 'Most Recent'}
                        </Text>
                        <ChevronDown size={16} color={theme.colors.primary} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => saveSearch(searchQuery)}>
                        <Bookmark size={18} color={theme.colors.secondaryText} />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Download size={18} color={theme.colors.secondaryText} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={filteredResults}
                    renderItem={renderSearchResult}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  />
                </View>
              ) : (
                <View style={styles.noResults}>
                  <View style={[styles.noResultsIcon, { backgroundColor: theme.colors.cardBackground }]}>
                    <Search size={48} color={theme.colors.secondaryText} />
                  </View>
                  <Text style={[styles.noResultsTitle, { color: theme.colors.text }]}>
                    No results found
                  </Text>
                  <Text style={[styles.noResultsText, { color: theme.colors.secondaryText }]}>
                    Try adjusting your search terms or filters
                  </Text>
                  <View style={styles.noResultsSuggestions}>
                    <Text style={[styles.suggestionLabel, { color: theme.colors.secondaryText }]}>
                      Try searching for:
                    </Text>
                    {['recent messages', 'important contacts', 'shared files'].map((suggestion, i) => (
                      <TouchableOpacity
                        key={i}
                        style={[styles.noResultChip, { backgroundColor: theme.colors.primary + '15' }]}
                        onPress={() => handleSearch(suggestion)}
                      >
                        <Text style={[styles.noResultChipText, { color: theme.colors.primary }]}>
                          {suggestion}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    paddingTop: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  closeButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  searchActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchActionButton: {
    padding: 6,
  },
  filterToggle: {
    padding: 8,
    borderRadius: 8,
  },
  aiSuggestions: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  aiLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  aiChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  aiChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  filterPanel: {
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    maxHeight: 300,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  platformFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 6,
  },
  platformChipText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  dateFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dateChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  dateChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  sentimentFilters: {
    flexDirection: 'row',
    gap: 8,
  },
  sentimentChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  sentimentChipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  filterToggles: {
    gap: 10,
  },
  toggleFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  toggleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 20,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  clearText: {
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
  },
  suggestionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionQuery: {
    fontSize: 15,
    fontWeight: '500',
  },
  suggestionDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  recentText: {
    flex: 1,
    fontSize: 15,
  },
  recentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  savedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  savedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  savedText: {
    fontSize: 13,
    fontWeight: '500',
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  trendingItem: {
    width: (width - 42) / 2,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  trendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  trendingTag: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingCount: {
    fontSize: 12,
  },
  trendingTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  quickAction: {
    width: (width - 44) / 2,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    gap: 10,
  },
  quickIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionCount: {
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    gap: 16,
  },
  loadingText: {
    fontSize: 14,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsCount: {
    fontSize: 14,
  },
  resultsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 16,
    gap: 12,
  },
  resultAvatar: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  iconAvatar: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  resultContent: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  relevanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  relevanceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  resultSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 6,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resultTime: {
    fontSize: 12,
  },
  sentimentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  resultActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 6,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  noResultsIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  noResultsSuggestions: {
    alignItems: 'center',
    gap: 12,
  },
  suggestionLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  noResultChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  noResultChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
