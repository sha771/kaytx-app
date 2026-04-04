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
  MessageCircle,
  Search,
  Plus,
  Filter,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  ArrowLeft,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'direct' | 'group';
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
}

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    lastMessage: 'Hey! How are you doing?',
    timestamp: '2m ago',
    unreadCount: 2,
    isOnline: true,
    type: 'direct',
  },
  {
    id: '2',
    name: 'Team Alpha',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
    lastMessage: 'Meeting at 3 PM today',
    timestamp: '15m ago',
    unreadCount: 0,
    isOnline: false,
    type: 'group',
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastMessage: 'Thanks for the update!',
    timestamp: '1h ago',
    unreadCount: 0,
    isOnline: true,
    type: 'direct',
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Hey! How are you doing?',
    timestamp: '2:30 PM',
    isOwn: false,
    status: 'read',
  },
  {
    id: '2',
    text: 'I\'m doing great! Just finished the project presentation.',
    timestamp: '2:32 PM',
    isOwn: true,
    status: 'read',
  },
  {
    id: '3',
    text: 'That\'s awesome! How did it go?',
    timestamp: '2:33 PM',
    isOwn: false,
    status: 'read',
  },
];

export default function ChatsMessagingScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messageText, setMessageText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'groups'>('all');

  const filteredChats = mockChats.filter(chat => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'unread' && chat.unreadCount > 0) ||
                      (activeTab === 'groups' && chat.type === 'group');
    return matchesSearch && matchesTab;
  });

  const renderChatItem = ({ item }: { item: Chat }) => (
    <TouchableOpacity
      style={[styles.chatItem, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => setSelectedChat(item)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        {item.isOnline && <View style={[styles.onlineIndicator, { backgroundColor: '#34C759' }]} />}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={[styles.chatName, { color: theme.colors.text }]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.timestamp, { color: theme.colors.secondaryText }]}>
            {item.timestamp}
          </Text>
        </View>
        <View style={styles.chatFooter}>
          <Text style={[styles.lastMessage, { color: theme.colors.secondaryText }]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isOwn && styles.ownMessage]}>
      <View style={[
        styles.messageBubble,
        {
          backgroundColor: item.isOwn ? theme.colors.primary : theme.colors.cardBackground,
        }
      ]}>
        <Text style={[styles.messageText, { color: item.isOwn ? 'white' : theme.colors.text }]}>
          {item.text}
        </Text>
        <Text style={[styles.messageTime, { color: item.isOwn ? 'rgba(255,255,255,0.7)' : theme.colors.secondaryText }]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  if (selectedChat) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Chat Header */}
        <View style={[styles.chatHeader, { backgroundColor: theme.colors.cardBackground, paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => setSelectedChat(null)} style={styles.backButton}>
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.chatInfo}>
            <Image source={{ uri: selectedChat.avatar }} style={styles.headerAvatar} />
            <View>
              <Text style={[styles.headerName, { color: theme.colors.text }]}>{selectedChat.name}</Text>
              <Text style={[styles.headerStatus, { color: theme.colors.secondaryText }]}>
                {selectedChat.isOnline ? 'Online' : 'Last seen 1h ago'}
              </Text>
            </View>
          </View>
          <View style={styles.chatActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Phone size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Video size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MoreVertical size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          data={mockMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
        />

        {/* Message Input */}
        <View style={[styles.messageInput, { backgroundColor: theme.colors.cardBackground }]}>
          <TouchableOpacity style={styles.attachButton}>
            <Paperclip size={20} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TextInput
            style={[styles.textInput, { color: theme.colors.text }]}
            placeholder="Type a message..."
            placeholderTextColor={theme.colors.secondaryText}
            value={messageText}
            onChangeText={setMessageText}
            multiline
          />
          <TouchableOpacity style={styles.emojiButton}>
            <Smile size={20} color={theme.colors.secondaryText} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.colors.primary }]}>
            <Send size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background, paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Chats & Messaging</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Filter size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Plus size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
          <Search size={20} color={theme.colors.secondaryText} />
          <TextInput
            style={[styles.searchInput, { color: theme.colors.text }]}
            placeholder="Search chats..."
            placeholderTextColor={theme.colors.secondaryText}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['all', 'unread', 'groups'] as const).map((tab) => (
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

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
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
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    flex: 1,
  },
  unreadBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  // Chat Screen Styles
  chatInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerStatus: {
    fontSize: 12,
  },
  chatActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    marginTop: 4,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 16,
    paddingVertical: 8,
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});