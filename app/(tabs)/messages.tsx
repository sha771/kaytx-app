 import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Plus,
  Settings,
  Phone,
  Video,
  Info,
  Pin,
  Check,
  CheckCheck,
  Menu,
  X,
  Activity,
  CircleCheck,
  RefreshCw,
  Globe,
  Newspaper,
  ListFilter,
  Sparkles,
  Crown,
  Zap,
  ChevronRight,
} from 'lucide-react-native';
import UniversalSearchModal from '@/components/messaging/UniversalSearchModal';
import PriorityMessagingModal from '@/components/messaging/PriorityMessagingModal';
import DailyBriefingModal from '@/components/messaging/DailyBriefingModal';
import { useMessaging } from '@/providers/MessagingProvider';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';
import { Message, Conversation } from '@/types/messaging';
import { getServiceIcon, getServiceColor } from '@/utils/services';
import { sanitization } from '@/utils/security';
import { RelatedFeatures, QuickLinks } from '@/components/RelatedFeatures';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width > 768 ? 320 : width * 0.85;

export default function MessagesScreen() {
  const { theme } = useTheme();
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    markAsRead,
    searchConversations,
    isRealTimeConnected,
    syncStatus,
    incomingMessages,
    reconnectRealTime,
  } = useMessaging();

  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showRealTimeIndicator, setShowRealTimeIndicator] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'universal' | 'priority' | 'briefing'>('all');
  const [showUniversalSearch, setShowUniversalSearch] = useState(false);
  const [showPriorityMessaging, setShowPriorityMessaging] = useState(false);
  const [showDailyBriefing, setShowDailyBriefing] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  React.useEffect(() => {
    setShowSidebar(width > 768);
  }, []);

  const filteredConversations = useMemo(() => {
    let result = conversations;
    
    if (searchQuery) {
      result = searchConversations(searchQuery);
    }
    
    switch (activeFilter) {
      case 'universal':
        return result;
      case 'priority':
        return result.filter(c => c.unreadCount > 0 || c.isPinned);
      case 'briefing':
        const today = new Date().toDateString();
        return result.filter(c => {
          const msgDate = new Date().toDateString();
          return msgDate === today;
        }).slice(0, 10);
      default:
        return result;
    }
  }, [searchQuery, conversations, searchConversations, activeFilter]);

  const handleSendMessage = useCallback(() => {
    if (!message.trim() || !activeConversation) return;
    
    sendMessage(activeConversation.id, message.trim());
    setMessage('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [message, activeConversation, sendMessage]);

  const handleSelectConversation = useCallback((conversation: Conversation) => {
    setActiveConversation(conversation);
    markAsRead(conversation.id);
    setTimeout(() => {
      if (width <= 768) {
        setShowSidebar(false);
      }
    }, 0);
  }, [setActiveConversation, markAsRead]);

  const renderConversationItem = ({ item }: { item: Conversation }) => {
    const isActive = activeConversation?.id === item.id;
    const ServiceIcon = getServiceIcon(item.service);
    const serviceColor = getServiceColor(item.service);

    return (
      <TouchableOpacity
        style= [
          styles.conversationItem,
          isActive && { backgroundColor: theme.colors.activeBackground },
        ]}
        onPress={() => handleSelectConversation(item)}
        accessibilityRole="button"
        accessibilityLabel={`Conversation with ${item.name}`}
        accessibilityHint={`${item.unreadCount > 0 ? `${item.unreadCount} unread messages. ` : ''}Tap to open conversation`}
        accessibilityState={{ selected: isActive }}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style= [styles.serviceIndicator, { backgroundColor: serviceColor }]}>
            <ServiceIcon size={10} color="white" />
          </View>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style= [styles.conversationName, { color: theme.colors.text }]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style= [styles.timestamp, { color: theme.colors.secondaryText }]}>
              {item.timestamp}
            </Text>
          </View>
          
          <View style={styles.conversationPreview}>
            <Text
              style= [
                styles.lastMessage,
                { color: theme.colors.secondaryText },
                item.unreadCount > 0 && { color: theme.colors.text, fontWeight: '600' },
              ]}
              numberOfLines={1}
            >
              {sanitization.text(item.lastMessage)}
            </Text>
            {item.unreadCount > 0 && (
              <View style= [styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
                <Text style={styles.unreadCount}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>

        {item.isPinned && (
          <Pin size={14} color={theme.colors.secondaryText} style={styles.pinnedIcon} />
        )}
      </TouchableOpacity>
    );
  };

  const renderMessage = (msg: Message, index: number) => {
    const isOwn = msg.isOwn;
    const messages = activeConversation?.messages || [];
    const showAvatar = !isOwn && (index === 0 || messages[index - 1]?.isOwn !== msg.isOwn);

    return (
      <View key={msg.id} style= [styles.messageRow, isOwn && styles.ownMessageRow]}>
        {!isOwn && showAvatar && (
          <Image source={{ uri: activeConversation?.avatar }} style={styles.messageAvatar} />
        )}
        {!isOwn && !showAvatar && <View style={styles.messageAvatarSpace} />}
        
        <View
          style= [
            styles.messageBubble,
            isOwn ? styles.ownMessage : styles.otherMessage,
            { backgroundColor: isOwn ? theme.colors.primary : theme.colors.messageBackground },
          ]}
        >
          <Text style= [styles.messageText, { color: isOwn ? 'white' : theme.colors.text }]}>
            {sanitization.text(msg.text)}
          </Text>
          <View style={styles.messageFooter}>
            <Text style= [styles.messageTime, { color: isOwn ? 'rgba(255,255,255,0.7)' : theme.colors.secondaryText }]}>
              {msg.timestamp}
            </Text>
            {isOwn && (
              <View style={styles.readStatus}>
                {msg.isRead ? (
                  <CheckCheck size={14} color="rgba(255,255,255,0.7)" />
                ) : (
                  <Check size={14} color="rgba(255,255,255,0.7)" />
                )}
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style= [styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.mainContainer}>
        {/* Sidebar */}
        {showSidebar && (
          <View style= [styles.sidebar, { backgroundColor: theme.colors.sidebarBackground }]}>
            {/* Real-time Status Banner */}
            {showRealTimeIndicator && (
              <View style= [styles.realTimeStatus, { 
                backgroundColor: isRealTimeConnected ? '#E8F5E9' : '#FFF3E0' 
              }]}>
                <View style={styles.realTimeLeft}>
                  {isRealTimeConnected ? (
                    <CircleCheck size={16} color="#4CAF50" />
                  ) : (
                    <Activity size={16} color="#FF9800" />
                  )}
                  <Text style= [styles.realTimeText, { 
                    color: isRealTimeConnected ? '#2E7D32' : '#F57C00' 
                  }]}>
                    {isRealTimeConnected ? 'Real-time Connected' : 'Reconnecting...'}
                  </Text>
                  {syncStatus === 'syncing' && (
                    <Activity size={14} color="#2196F3" style={styles.syncingIcon} />
                  )}
                  {incomingMessages > 0 && (
                    <View style={styles.incomingBadge}>
                      <Text style={styles.incomingText}>+{incomingMessages}</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.closeRealTime}
                  onPress={() => setShowRealTimeIndicator(false)}
                >
                  <X size={14} color={theme.colors.secondaryText} />
                </TouchableOpacity>
              </View>
            )}

            {/* Sidebar Header */}
            <View style= [styles.sidebarHeader, { borderBottomColor: theme.colors.border }]}>
              <View style={styles.sidebarTitleContainer}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => setShowSidebar(false)}
                >
                  <Menu size={20} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style= [styles.appTitle, { color: theme.colors.text }]}>Messages</Text>
              </View>
              <View style={styles.headerActions}>
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={() => router.push('/add-service')}
                  accessibilityRole="button"
                  accessibilityLabel="Add new service"
                  accessibilityHint="Opens dialog to add a new messaging service"
                >
                  <Plus size={20} color={theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style= [styles.headerButton, !isRealTimeConnected && styles.reconnectButton]}
                  onPress={reconnectRealTime}
                >
                  <RefreshCw size={20} color={!isRealTimeConnected ? '#FF9800' : theme.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.headerButton}
                  onPress={() => router.push('/settings')}
                >
                  <Settings size={20} color={theme.colors.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Search size={18} color={theme.colors.secondaryText} />
              <TextInput
                style= [styles.searchInput, { color: theme.colors.text }]}
                placeholder="Search conversations..."
                placeholderTextColor={theme.colors.secondaryText}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Filter Options */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterContainer}
              contentContainerStyle={styles.filterContent}
            >
              <TouchableOpacity
                style= [
                  styles.filterChip,
                  activeFilter === 'all' && styles.filterChipActive,
                  activeFilter === 'all' && { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => setActiveFilter('all')}
              >
                <ListFilter size={14} color={activeFilter === 'all' ? '#FFF' : theme.colors.secondaryText} />
                <Text style= [
                  styles.filterChipText,
                  { color: activeFilter === 'all' ? '#FFF' : theme.colors.text },
                ]}>
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style= [styles.advancedFilterChip, { backgroundColor: '#3B82F615', borderColor: '#3B82F6' }]}
                onPress={() => setShowUniversalSearch(true)}
              >
                <View style={styles.filterChipContent}>
                  <Globe size={16} color="#3B82F6" />
                  <View style={styles.filterChipTextContainer}>
                    <Text style= [styles.filterChipTitle, { color: '#3B82F6' }]}>
                      Universal Search
                    </Text>
                    <Text style= [styles.filterChipSubtitle, { color: theme.colors.secondaryText }]}>
                      Cross-platform
                    </Text>
                  </View>
                </View>
                <View style= [styles.filterChipBadge, { backgroundColor: '#3B82F6' }]}>
                  <Sparkles size={10} color="#FFF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style= [styles.advancedFilterChip, { backgroundColor: '#F59E0B15', borderColor: '#F59E0B' }]}
                onPress={() => setShowPriorityMessaging(true)}
              >
                <View style={styles.filterChipContent}>
                  <Crown size={16} color="#F59E0B" />
                  <View style={styles.filterChipTextContainer}>
                    <Text style= [styles.filterChipTitle, { color: '#F59E0B' }]}>
                      Priority
                    </Text>
                    <Text style= [styles.filterChipSubtitle, { color: theme.colors.secondaryText }]}>
                      VIP & Urgent
                    </Text>
                  </View>
                </View>
                <View style= [styles.filterChipBadge, { backgroundColor: '#F59E0B' }]}>
                  <Zap size={10} color="#FFF" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style= [styles.advancedFilterChip, { backgroundColor: '#10B98115', borderColor: '#10B981' }]}
                onPress={() => setShowDailyBriefing(true)}
              >
                <View style={styles.filterChipContent}>
                  <Newspaper size={16} color="#10B981" />
                  <View style={styles.filterChipTextContainer}>
                    <Text style= [styles.filterChipTitle, { color: '#10B981' }]}>
                      Daily Briefing
                    </Text>
                    <Text style= [styles.filterChipSubtitle, { color: theme.colors.secondaryText }]}>
                      AI Summary
                    </Text>
                  </View>
                </View>
                <View style= [styles.filterChipBadge, { backgroundColor: '#10B981' }]}>
                  <ChevronRight size={10} color="#FFF" />
                </View>
              </TouchableOpacity>
            </ScrollView>

            {/* Conversations List */}
            <FlatList
              data={filteredConversations}
              renderItem={renderConversationItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.conversationsList}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={10}
              windowSize={10}
              removeClippedSubviews={true}
              initialNumToRender={15}
            />

            {/* Related Features */}
            <RelatedFeatures
              featureId="unified-inbox"
              title="Related Communication Features"
              maxItems={6}
              layout="horizontal"
            />
            <QuickLinks
              groupId="communications"
              title="Communication Tools"
              maxItems={4}
            />
          </View>
        )}

        {/* Chat Area */}
        <View style= [styles.chatArea, { backgroundColor: theme.colors.chatBackground }]}>
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <View style= [styles.chatHeader, { borderBottomColor: theme.colors.border }]}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setShowSidebar(true)}
                >
                  <Menu size={20} color={theme.colors.text} />
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.chatHeaderInfo}
                  onPress={() => router.push('/profile')}
                >
                  <Image source={{ uri: activeConversation.avatar }} style={styles.chatAvatar} />
                  <View>
                    <Text style= [styles.chatName, { color: theme.colors.text }]}>
                      {activeConversation.name}
                    </Text>
                    <Text style= [styles.chatStatus, { color: theme.colors.secondaryText }]}>
                      {activeConversation.isOnline ? 'Active now' : 'Offline'}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.chatActions}>
                  <TouchableOpacity style={styles.chatActionButton}>
                    <Phone size={20} color={theme.colors.text} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatActionButton}>
                    <Video size={20} color={theme.colors.text} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.chatActionButton}>
                    <Info size={20} color={theme.colors.text} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Messages */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
                showsVerticalScrollIndicator={false}
              >
                {activeConversation.messages.map((msg, index) => renderMessage(msg, index))}
              </ScrollView>

              {/* Input Area */}
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={0}
              >
                <View style= [styles.inputContainer, { borderTopColor: theme.colors.border }]}>
                  <TouchableOpacity style={styles.attachButton}>
                    <Paperclip size={20} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                  
                  <TextInput
                    style= [styles.messageInput, { color: theme.colors.text }]}
                    placeholder="Type a message..."
                    placeholderTextColor={theme.colors.secondaryText}
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    onSubmitEditing={handleSendMessage}
                  />
                  
                  <TouchableOpacity style={styles.emojiButton}>
                    <Smile size={20} color={theme.colors.secondaryText} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style= [styles.sendButton, { backgroundColor: theme.colors.primary }]}
                    onPress={handleSendMessage}
                    disabled={!message.trim()}
                    accessibilityRole="button"
                    accessibilityLabel="Send message"
                    accessibilityHint="Sends the message you typed"
                    accessibilityState={{ disabled: !message.trim() }}
                  >
                    <Send size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </>
          ) : (
            <View style={styles.emptyState}>
              <Text style= [styles.emptyStateTitle, { color: theme.colors.text }]}>
                Select a conversation
              </Text>
              <Text style= [styles.emptyStateText, { color: theme.colors.secondaryText }]}>
                Choose a conversation from the sidebar to start messaging
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Advanced Feature Modals */}
      <UniversalSearchModal
        visible={showUniversalSearch}
        onClose={() => setShowUniversalSearch(false)}
      />
      <PriorityMessagingModal
        visible={showPriorityMessaging}
        onClose={() => setShowPriorityMessaging(false)}
      />
      <DailyBriefingModal
        visible={showDailyBriefing}
        onClose={() => setShowDailyBriefing(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  sidebarTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 8,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    margin: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
  },
  conversationsList: {
    paddingBottom: 20,
  },
  conversationItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  serviceIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
  },
  conversationPreview: {
    flexDirection: 'row',
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
    marginLeft: 8,
  },
  unreadCount: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  pinnedIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  chatArea: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
  },
  chatStatus: {
    fontSize: 13,
    marginTop: 2,
  },
  chatActions: {
    flexDirection: 'row',
    gap: 16,
  },
  chatActionButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  ownMessageRow: {
    justifyContent: 'flex-end',
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  messageAvatarSpace: {
    width: 36,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 18,
  },
  ownMessage: {
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  messageTime: {
    fontSize: 11,
  },
  readStatus: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  messageInput: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 20,
  },
  emojiButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 15,
    textAlign: 'center',
  },
  realTimeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  realTimeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  realTimeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  syncingIcon: {
    marginLeft: 4,
  },
  incomingBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  incomingText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  closeRealTime: {
    padding: 4,
  },
  reconnectButton: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 6,
  },
  filterContainer: {
    maxHeight: 60,
  },
  filterContent: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 6,
    marginRight: 8,
  },
  filterChipActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  advancedFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 10,
    minWidth: 140,
  },
  filterChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  filterChipTextContainer: {
    gap: 2,
  },
  filterChipTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipSubtitle: {
    fontSize: 10,
  },
  filterChipBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

