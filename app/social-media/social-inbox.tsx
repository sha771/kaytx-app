 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Search,
  ListFilter,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Heart,
  AtSign,
  Send,
  GripHorizontal,
  Clock,
  Star,
  StarOff,
  Archive,
  CircleCheck,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface InboxMessage {
  id: string;
  platform: string;
  platformIcon: React.ComponentType<any>;
  platformColor: string;
  type: 'dm' | 'comment' | 'mention';
  senderName: string;
  senderAvatar: string;
  content: string;
  postPreview?: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
}

export default function SocialInbox() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'starred' | 'dm' | 'comments' | 'mentions'>('all');
  const [messages, setMessages] = useState<InboxMessage[]>([
    {
      id: '1',
      platform: 'Instagram',
      platformIcon: Instagram,
      platformColor: '#E4405F',
      type: 'dm',
      senderName: 'Sarah Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      content: 'Hey! I love your latest product. Can you tell me more about the pricing options?',
      timestamp: '2 min ago',
      isRead: false,
      isStarred: true,
    },
    {
      id: '2',
      platform: 'Twitter',
      platformIcon: Twitter,
      platformColor: '#1DA1F2',
      type: 'mention',
      senderName: 'TechNews Daily',
      senderAvatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
      content: '@yourcompany just announced their revolutionary new AI feature! This is going to change everything 🚀',
      timestamp: '15 min ago',
      isRead: false,
      isStarred: false,
    },
    {
      id: '3',
      platform: 'Facebook',
      platformIcon: Facebook,
      platformColor: '#1877F2',
      type: 'comment',
      senderName: 'Mike Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      content: 'This is exactly what I was looking for! Great job team! 👏',
      postPreview: 'Our biggest product launch yet...',
      timestamp: '1 hour ago',
      isRead: true,
      isStarred: false,
    },
    {
      id: '4',
      platform: 'LinkedIn',
      platformIcon: Linkedin,
      platformColor: '#0A66C2',
      type: 'dm',
      senderName: 'Emily Rodriguez',
      senderAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      content: 'Hi there! I saw your company&apos;s presentation at the conference. Would love to discuss a potential partnership.',
      timestamp: '2 hours ago',
      isRead: true,
      isStarred: true,
    },
    {
      id: '5',
      platform: 'Instagram',
      platformIcon: Instagram,
      platformColor: '#E4405F',
      type: 'comment',
      senderName: 'Alex Turner',
      senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      content: 'When will this be available in Europe? 🇪🇺',
      postPreview: 'Introducing our new product line...',
      timestamp: '3 hours ago',
      isRead: true,
      isStarred: false,
    },
    {
      id: '6',
      platform: 'Twitter',
      platformIcon: Twitter,
      platformColor: '#1DA1F2',
      type: 'dm',
      senderName: 'Jessica Park',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
      content: 'Thank you for the quick response! I&apos;ll definitely consider your solution for our team.',
      timestamp: '5 hours ago',
      isRead: true,
      isStarred: false,
    },
  ]);

  const filters = [
    { id: 'all', label: 'All', count: messages.length },
    { id: 'unread', label: 'Unread', count: messages.filter(m => !m.isRead).length },
    { id: 'starred', label: 'Starred', count: messages.filter(m => m.isStarred).length },
    { id: 'dm', label: 'DMs', count: messages.filter(m => m.type === 'dm').length },
    { id: 'comments', label: 'Comments', count: messages.filter(m => m.type === 'comment').length },
    { id: 'mentions', label: 'Mentions', count: messages.filter(m => m.type === 'mention').length },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dm':
        return MessageCircle;
      case 'comment':
        return Heart;
      case 'mention':
        return AtSign;
      default:
        return MessageCircle;
    }
  };

  const toggleStar = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
    );
  };

  const markAsRead = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  const filteredMessages = messages.filter(m => {
    if (selectedFilter === 'unread') return !m.isRead;
    if (selectedFilter === 'starred') return m.isStarred;
    if (selectedFilter === 'dm') return m.type === 'dm';
    if (selectedFilter === 'comments') return m.type === 'comment';
    if (selectedFilter === 'mentions') return m.type === 'mention';
    return true;
  }).filter(m => 
    searchQuery ? m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) || m.content.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Social Inbox',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={18} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search messages..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={[styles.filterButton, { backgroundColor: theme.colors.cardBackground }]}>
          <ListFilter size={18} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              selectedFilter === filter.id && { backgroundColor: theme.colors.primary },
            ]}
            onPress={() => setSelectedFilter(filter.id as any)}
          >
            <Text
              style={[
                styles.filterTabText,
                { color: selectedFilter === filter.id ? '#FFF' : theme.colors.secondaryText },
              ]}
            >
              {filter.label}
            </Text>
            <View
              style={[
                styles.filterCount,
                { backgroundColor: selectedFilter === filter.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)' },
              ]}
            >
              <Text
                style={[
                  styles.filterCountText,
                  { color: selectedFilter === filter.id ? '#FFF' : theme.colors.secondaryText },
                ]}
              >
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Messages List */}
      <ScrollView
        style={styles.messagesList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {filteredMessages.map((message) => {
          const PlatformIcon = message.platformIcon;
          const TypeIcon = getTypeIcon(message.type);
          
          return (
            <TouchableOpacity
              key={message.id}
              style={[
                styles.messageCard,
                { backgroundColor: theme.colors.cardBackground },
                !message.isRead && styles.unreadCard,
              ]}
              onPress={() => markAsRead(message.id)}
            >
              <View style={styles.messageHeader}>
                <View style={styles.senderInfo}>
                  <View style={styles.avatarContainer}>
                    <Image source={{ uri: message.senderAvatar }} style={styles.avatar} />
                    <View style={[styles.platformBadge, { backgroundColor: message.platformColor }]}>
                      <PlatformIcon size={10} color="#FFF" />
                    </View>
                  </View>
                  <View style={styles.senderDetails}>
                    <View style={styles.nameRow}>
                      <Text style={[styles.senderName, { color: theme.colors.text }]}>{message.senderName}</Text>
                      {!message.isRead && <View style={[styles.unreadDot, { backgroundColor: theme.colors.primary }]} />}
                    </View>
                    <View style={styles.typeRow}>
                      <View style={[styles.typeBadge, { backgroundColor: `${message.platformColor}15` }]}>
                        <TypeIcon size={10} color={message.platformColor} />
                        <Text style={[styles.typeText, { color: message.platformColor }]}>
                          {message.type === 'dm' ? 'Direct Message' : message.type === 'comment' ? 'Comment' : 'Mention'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.messageActions}>
                  <TouchableOpacity onPress={() => toggleStar(message.id)} style={styles.actionButton}>
                    {message.isStarred ? (
                      <Star size={16} color="#FFD700" fill="#FFD700" />
                    ) : (
                      <StarOff size={16} color={theme.colors.secondaryText} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <GripHorizontal size={16} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={[styles.messageContent, { color: theme.colors.text }]} numberOfLines={2}>
                {message.content}
              </Text>

              {message.postPreview && (
                <View style={[styles.postPreview, { backgroundColor: 'rgba(0,0,0,0.03)' }]}>
                  <Text style={[styles.postPreviewText, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                    Re: &quot;{message.postPreview}&quot;
                  </Text>
                </View>
              )}

              <View style={styles.messageFooter}>
                <View style={styles.timeContainer}>
                  <Clock size={12} color={theme.colors.secondaryText} />
                  <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>{message.timestamp}</Text>
                </View>
                <View style={styles.quickActions}>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: `${theme.colors.primary}15` }]}>
                    <Send size={12} color={theme.colors.primary} />
                    <Text style={[styles.quickActionText, { color: theme.colors.primary }]}>Reply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                    <Archive size={12} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: 'rgba(0,0,0,0.05)' }]}>
                    <CircleCheck size={12} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {filteredMessages.length === 0 && (
          <View style={styles.emptyState}>
            <MessageCircle size={48} color={theme.colors.secondaryText} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>No messages found</Text>
            <Text style={[styles.emptySubtitle, { color: theme.colors.secondaryText }]}>
              {searchQuery ? 'Try a different search term' : 'Messages will appear here'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    maxHeight: 50,
  },
  filterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 6,
    marginRight: 8,
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterCount: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  filterCountText: {
    fontSize: 11,
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  messageCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  platformBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  senderDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  senderName: {
    fontSize: 15,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  typeRow: {
    marginTop: 4,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  messageActions: {
    flexDirection: 'row',
    gap: 4,
  },
  actionButton: {
    padding: 6,
  },
  messageContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  postPreview: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  postPreviewText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timestamp: {
    fontSize: 12,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
  },
});
