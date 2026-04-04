import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Mail,
  MessageSquare,
  Phone,
  Instagram,
  Twitter,
  Facebook,
  Search,
  Filter,
  Archive,
  Star,
  MoreVertical,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface UnifiedMessage {
  id: string;
  platform: 'email' | 'sms' | 'whatsapp' | 'instagram' | 'twitter' | 'facebook';
  sender: string;
  senderAvatar: string;
  subject?: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  priority: 'high' | 'medium' | 'low';
  attachments?: number;
}

const mockMessages: UnifiedMessage[] = [
  {
    id: '1',
    platform: 'email',
    sender: 'john@company.com',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    subject: 'Project Update Required',
    preview: 'Hi there, I need an update on the current project status...',
    timestamp: '2m ago',
    isRead: false,
    isStarred: true,
    priority: 'high',
    attachments: 2,
  },
  {
    id: '2',
    platform: 'whatsapp',
    sender: 'Sarah Johnson',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    preview: 'Hey! Are we still on for the meeting today?',
    timestamp: '15m ago',
    isRead: false,
    isStarred: false,
    priority: 'medium',
  },
  {
    id: '3',
    platform: 'instagram',
    sender: '@marketing_team',
    senderAvatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    preview: 'New campaign performance metrics are available',
    timestamp: '1h ago',
    isRead: true,
    isStarred: false,
    priority: 'low',
  },
  {
    id: '4',
    platform: 'sms',
    sender: '+1 (555) 123-4567',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    preview: 'Your appointment is confirmed for tomorrow at 3 PM',
    timestamp: '2h ago',
    isRead: true,
    isStarred: false,
    priority: 'medium',
  },
];

const platformIcons = {
  email: Mail,
  sms: MessageSquare,
  whatsapp: MessageSquare,
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
};

const platformColors = {
  email: '#007AFF',
  sms: '#34C759',
  whatsapp: '#25D366',
  instagram: '#E4405F',
  twitter: '#1DA1F2',
  facebook: '#1877F2',
};

export default function UnifiedInboxScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'starred' | 'high'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const filteredMessages = mockMessages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (message.subject && message.subject.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && !message.isRead) ||
                         (selectedFilter === 'starred' && message.isStarred) ||
                         (selectedFilter === 'high' && message.priority === 'high');
    
    const matchesPlatform = selectedPlatform === 'all' || message.platform === selectedPlatform;
    
    return matchesSearch && matchesFilter && matchesPlatform;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return theme.colors.secondaryText;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Clock;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  const renderMessage = ({ item }: { item: UnifiedMessage }) => {
    const PlatformIcon = platformIcons[item.platform];
    const PriorityIcon = getPriorityIcon(item.priority);
    
    return (
      <TouchableOpacity
        style={[
          styles.messageItem,
          { backgroundColor: theme.colors.cardBackground },
          !item.isRead && { borderLeftWidth: 3, borderLeftColor: theme.colors.primary }
        ]}
      >
        <View style={styles.messageHeader}>
          <View style={styles.senderInfo}>
            <Image source={{ uri: item.senderAvatar }} style={styles.senderAvatar} />
            <View style={styles.platformBadge}>
              <PlatformIcon size={12} color={platformColors[item.platform]} />
            </View>
          </View>
          <View style={styles.messageContent}>
            <View style={styles.messageTop}>
              <Text style={[styles.senderName, { color: theme.colors.text }]} numberOfLines={1}>
                {item.sender}
              </Text>
              <View style={styles.messageActions}>
                <PriorityIcon size={14} color={getPriorityColor(item.priority)} />
                <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>
                  {item.timestamp}
                </Text>
                <TouchableOpacity>
                  <Star 
                    size={16} 
                    color={item.isStarred ? '#FFD700' : theme.colors.secondaryText}
                    fill={item.isStarred ? '#FFD700' : 'none'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {item.subject && (
              <Text style={[styles.subject, { color: theme.colors.text }]} numberOfLines={1}>
                {item.subject}
              </Text>
            )}
            <Text style={[styles.preview, { color: theme.colors.secondaryText }]} numberOfLines={2}>
              {item.preview}
            </Text>
            <View style={styles.messageFooter}>
              <View style={styles.messageStats}>
                {item.attachments && (
                  <Text style={[styles.attachmentCount, { color: theme.colors.secondaryText }]}>
                    📎 {item.attachments}
                  </Text>
                )}
              </View>
              <TouchableOpacity>
                <MoreVertical size={16} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Unified Inbox</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Archive size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search messages..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filters}>
          {(['all', 'unread', 'starred', 'high'] as const).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                selectedFilter === filter && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  {
                    color: selectedFilter === filter ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Platform Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.platformsContainer}>
        <View style={styles.platforms}>
          <TouchableOpacity
            style={[
              styles.platformChip,
              selectedPlatform === 'all' && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedPlatform('all')}
          >
            <Text
              style={[
                styles.platformText,
                {
                  color: selectedPlatform === 'all' ? 'white' : theme.colors.secondaryText,
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {Object.entries(platformIcons).map(([platform, Icon]) => (
            <TouchableOpacity
              key={platform}
              style={[
                styles.platformChip,
                selectedPlatform === platform && { backgroundColor: platformColors[platform as keyof typeof platformColors] },
              ]}
              onPress={() => setSelectedPlatform(platform)}
            >
              <Icon 
                size={16} 
                color={selectedPlatform === platform ? 'white' : platformColors[platform as keyof typeof platformColors]} 
              />
              <Text
                style={[
                  styles.platformText,
                  {
                    color: selectedPlatform === platform ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      />
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
  filtersContainer: {
    marginBottom: 8,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  platformsContainer: {
    marginBottom: 16,
  },
  platforms: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 6,
  },
  platformText: {
    fontSize: 12,
    fontWeight: '500',
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
  },
  messageItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  messageHeader: {
    flexDirection: 'row',
  },
  senderInfo: {
    position: 'relative',
    marginRight: 12,
  },
  senderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  platformBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  messageContent: {
    flex: 1,
  },
  messageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timestamp: {
    fontSize: 12,
  },
  subject: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 8,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  attachmentCount: {
    fontSize: 12,
  },
});