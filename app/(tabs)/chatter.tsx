import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Hash,
  Plus,
  Search,
  Settings,
  Phone,
  Video,
  Mic,
  Send,
  Users,
  BellOff,
  Pin,
  MoreVertical,
  Smile,
  Paperclip,
  X,
  Check,
  CheckCheck,
  Edit3,
  Trash2,
  Reply,
  Forward,
  Copy,
  Star,
  Archive,
  Volume2,
  VolumeX,
  UserPlus,
  LogOut,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Channel {
  id: string;
  name: string;
  description?: string;
  type: 'text' | 'voice' | 'video' | 'private';
  members: number;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
  isPinned?: boolean;
  isMuted?: boolean;
  isPrivate?: boolean;
  avatar?: string;
  isOnline?: boolean;
}

interface Message {
  id: string;
  user: string;
  userId: string;
  avatar: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'video';
  isEdited?: boolean;
  replyTo?: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'general',
    description: 'General team discussions',
    type: 'text',
    members: 1247,
    lastMessage: 'Welcome to Chatter! 👋',
    timestamp: '2m ago',
    unread: 3,
    isPinned: true,
  },
  {
    id: '2',
    name: 'announcements',
    description: 'Important company announcements',
    type: 'text',
    members: 1247,
    lastMessage: 'New features released!',
    timestamp: '1h ago',
    unread: 1,
    isPinned: true,
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    type: 'private',
    members: 2,
    lastMessage: 'See you at the meeting!',
    timestamp: '5m ago',
    isPrivate: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Mike Davis',
    type: 'private',
    members: 2,
    lastMessage: 'Thanks for the update',
    timestamp: '1h ago',
    isPrivate: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    isOnline: false,
  },
  {
    id: '5',
    name: 'development',
    description: 'Development team channel',
    type: 'text',
    members: 45,
    lastMessage: 'Code review needed',
    timestamp: '30m ago',
    unread: 5,
  },
  {
    id: '6',
    name: 'marketing',
    description: 'Marketing campaigns and strategies',
    type: 'text',
    members: 32,
    lastMessage: 'Campaign results are in!',
    timestamp: '2h ago',
  },
  {
    id: '7',
    name: 'voice-chat',
    description: 'Voice discussions',
    type: 'voice',
    members: 23,
  },
  {
    id: '8',
    name: 'video-calls',
    description: 'Video meetings',
    type: 'video',
    members: 45,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    user: 'Alice Johnson',
    userId: 'user1',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
    message: 'Hey everyone! How is everyone doing today?',
    timestamp: '10:30 AM',
    type: 'text',
    status: 'read',
    reactions: [{ emoji: '👍', count: 3, users: ['user2', 'user3', 'user4'] }],
  },
  {
    id: '2',
    user: 'Bob Smith',
    userId: 'user2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
    message: 'Great! Just finished the new messaging integration.',
    timestamp: '10:32 AM',
    type: 'text',
    status: 'read',
  },
  {
    id: '3',
    user: 'Carol Davis',
    userId: 'user3',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    message: 'That sounds awesome! Can\'t wait to try it out.',
    timestamp: '10:35 AM',
    type: 'text',
    status: 'read',
    reactions: [{ emoji: '🎉', count: 2, users: ['user1', 'user2'] }],
  },
  {
    id: '4',
    user: 'You',
    userId: 'currentUser',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    message: 'Looking forward to testing it!',
    timestamp: '10:36 AM',
    type: 'text',
    status: 'delivered',
  },
];

export default function ChatterScreen() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedChannel, setSelectedChannel] = useState<Channel>(mockChannels[0]);
  const [messageText, setMessageText] = useState<string>('');
  const [showChannels, setShowChannels] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showChannelInfo, setShowChannelInfo] = useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const [channels, setChannels] = useState<Channel[]>(mockChannels);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const getChannelIcon = (type: Channel['type']) => {
    switch (type) {
      case 'voice':
        return Mic;
      case 'video':
        return Video;
      case 'private':
        return Users;
      default:
        return Hash;
    }
  };

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'You',
      userId: 'currentUser',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sending',
      replyTo: replyingTo?.id,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
    setReplyingTo(null);

    setTimeout(() => {
      setMessages(prev =>
        prev.map(msg => (msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg))
      );
    }, 1000);
  };

  const togglePin = (channelId: string) => {
    setChannels(prev =>
      prev.map(ch => (ch.id === channelId ? { ...ch, isPinned: !ch.isPinned } : ch))
    );
  };

  const toggleMute = (channelId: string) => {
    setChannels(prev =>
      prev.map(ch => (ch.id === channelId ? { ...ch, isMuted: !ch.isMuted } : ch))
    );
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: reactions.map(r =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, 'currentUser'] }
                  : r
              ),
            };
          } else {
            return {
              ...msg,
              reactions: [...reactions, { emoji, count: 1, users: ['currentUser'] }],
            };
          }
        }
        return msg;
      })
    );
  };

  const filteredChannels = searchQuery
    ? channels.filter(ch => ch.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : channels;

  const pinnedChannels = filteredChannels.filter(ch => ch.isPinned);
  const regularChannels = filteredChannels.filter(ch => !ch.isPinned);

  const renderChannelItem = ({ item }: { item: Channel }) => {
    const IconComponent = getChannelIcon(item.type);
    const isSelected = selectedChannel.id === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.channelItem,
          {
            backgroundColor: isSelected 
              ? theme.colors.primary + '20' 
              : 'transparent',
          },
        ]}
        onPress={() => {
          setSelectedChannel(item);
          setShowChannels(false);
        }}
      >
        {item.isPrivate && item.avatar ? (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.channelAvatar} />
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>
        ) : (
          <View style={[styles.channelIconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
            <IconComponent size={18} color={theme.colors.primary} />
          </View>
        )}
        <View style={styles.channelInfo}>
          <View style={styles.channelNameRow}>
            <Text style={[styles.channelName, { color: theme.colors.text }]} numberOfLines={1}>
              {item.isPrivate ? item.name : `#${item.name}`}
            </Text>
            {item.isPinned && <Pin size={12} color={theme.colors.primary} />}
            {item.isMuted && <BellOff size={12} color={theme.colors.secondaryText} />}
          </View>
          {item.lastMessage && (
            <Text style={[styles.channelLastMessage, { color: theme.colors.secondaryText }]} numberOfLines={1}>
              {item.lastMessage}
            </Text>
          )}
        </View>
        <View style={styles.channelMeta}>
          {item.timestamp && (
            <Text style={[styles.channelTimestamp, { color: theme.colors.secondaryText }]}>
              {item.timestamp}
            </Text>
          )}
          {item.unread && item.unread > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.unreadText}>{item.unread}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwnMessage = item.userId === 'currentUser';
    const replyMessage = item.replyTo ? messages.find(m => m.id === item.replyTo) : null;

    return (
      <TouchableOpacity
        style={[styles.messageItem, isOwnMessage && styles.ownMessageItem]}
        onLongPress={() => setSelectedMessage(item)}
        activeOpacity={0.7}
      >
        {!isOwnMessage && (
          <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
        )}
        <View style={[styles.messageContent, isOwnMessage && styles.ownMessageContent]}>
          {!isOwnMessage && (
            <Text style={[styles.messageUser, { color: theme.colors.primary }]}>
              {item.user}
            </Text>
          )}
          {replyMessage && (
            <View style={[styles.replyContainer, { backgroundColor: theme.colors.background }]}>
              <View style={[styles.replyBar, { backgroundColor: theme.colors.primary }]} />
              <View style={styles.replyContent}>
                <Text style={[styles.replyUser, { color: theme.colors.primary }]}>
                  {replyMessage.user}
                </Text>
                <Text style={[styles.replyText, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                  {replyMessage.message}
                </Text>
              </View>
            </View>
          )}
          <View
            style={[
              styles.messageBubble,
              {
                backgroundColor: isOwnMessage ? theme.colors.primary : theme.colors.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                { color: isOwnMessage ? 'white' : theme.colors.text },
              ]}
            >
              {item.message}
            </Text>
            <View style={styles.messageFooter}>
              <Text
                style={[
                  styles.messageTimestamp,
                  { color: isOwnMessage ? 'rgba(255,255,255,0.7)' : theme.colors.secondaryText },
                ]}
              >
                {item.timestamp}
              </Text>
              {isOwnMessage && (
                <View style={styles.messageStatus}>
                  {item.status === 'read' && <CheckCheck size={14} color="rgba(255,255,255,0.7)" />}
                  {item.status === 'delivered' && <CheckCheck size={14} color="rgba(255,255,255,0.7)" />}
                  {item.status === 'sent' && <Check size={14} color="rgba(255,255,255,0.7)" />}
                </View>
              )}
            </View>
          </View>
          {item.reactions && item.reactions.length > 0 && (
            <View style={styles.reactionsContainer}>
              {item.reactions.map((reaction, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.reactionBubble, { backgroundColor: theme.colors.background }]}
                  onPress={() => addReaction(item.id, reaction.emoji)}
                >
                  <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                  <Text style={[styles.reactionCount, { color: theme.colors.text }]}>
                    {reaction.count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {isOwnMessage && (
          <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
        )}
      </TouchableOpacity>
    );
  };

  if (showChannels) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <View>
            <Text style={[styles.title, { color: theme.colors.text }]}>Chatter</Text>
            <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
              {channels.length} conversations
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Plus size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchContainer, { paddingHorizontal: 20 }]}>
          <View style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}>
            <Search size={18} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search conversations..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {pinnedChannels.length > 0 && (
            <View style={styles.channelSection}>
              <View style={styles.sectionHeader}>
                <Pin size={16} color={theme.colors.primary} />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pinned</Text>
              </View>
              {pinnedChannels.map(item => (
                <View key={item.id}>{renderChannelItem({ item })}</View>
              ))}
            </View>
          )}

          <View style={styles.channelSection}>
            <View style={styles.sectionHeader}>
              <Hash size={16} color={theme.colors.text} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>All Conversations</Text>
            </View>
            {regularChannels.map(item => (
              <View key={item.id}>{renderChannelItem({ item })}</View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.chatHeader, { backgroundColor: theme.colors.cardBackground, paddingTop: insets.top + 16 }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setShowChannels(true)}
        >
          <Text style={[styles.backText, { color: theme.colors.primary }]}>←</Text>
        </TouchableOpacity>
        {selectedChannel.isPrivate && selectedChannel.avatar ? (
          <View style={styles.headerAvatarContainer}>
            <Image source={{ uri: selectedChannel.avatar }} style={styles.headerAvatar} />
            {selectedChannel.isOnline && <View style={styles.headerOnlineIndicator} />}
          </View>
        ) : (
          <View style={[styles.headerIconContainer, { backgroundColor: theme.colors.primary + '20' }]}>
            {React.createElement(getChannelIcon(selectedChannel.type), {
              size: 20,
              color: theme.colors.primary,
            })}
          </View>
        )}
        <View style={styles.chatHeaderInfo}>
          <Text style={[styles.chatTitle, { color: theme.colors.text }]} numberOfLines={1}>
            {selectedChannel.isPrivate ? selectedChannel.name : `#${selectedChannel.name}`}
          </Text>
          <Text style={[styles.chatMembers, { color: theme.colors.secondaryText }]}>
            {selectedChannel.isOnline ? 'Online' : `${selectedChannel.members} members`}
          </Text>
        </View>
        <View style={styles.chatActions}>
          <TouchableOpacity style={styles.chatActionButton}>
            <Phone size={18} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatActionButton}>
            <Video size={18} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatActionButton} onPress={() => setShowChannelInfo(true)}>
            <MoreVertical size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {replyingTo && (
        <View style={[styles.replyingToContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.replyingToContent}>
            <Reply size={16} color={theme.colors.primary} />
            <View style={styles.replyingToText}>
              <Text style={[styles.replyingToUser, { color: theme.colors.primary }]}>
                Replying to {replyingTo.user}
              </Text>
              <Text style={[styles.replyingToMessage, { color: theme.colors.secondaryText }]} numberOfLines={1}>
                {replyingTo.message}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setReplyingTo(null)}>
            <X size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      )}

      <View style={[styles.messageInput, { backgroundColor: theme.colors.cardBackground }]}>
        <TouchableOpacity style={styles.inputActionButton}>
          <Paperclip size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
            },
          ]}
          placeholder={`Message ${selectedChannel.isPrivate ? selectedChannel.name : `#${selectedChannel.name}`}`}
          placeholderTextColor={theme.colors.secondaryText}
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={2000}
        />
        <TouchableOpacity style={styles.inputActionButton}>
          <Smile size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.sendButton,
            { backgroundColor: messageText.trim() ? theme.colors.primary : theme.colors.border },
          ]}
          disabled={!messageText.trim()}
          onPress={sendMessage}
        >
          <Send size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Modal visible={showChannelInfo} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Channel Info</Text>
              <TouchableOpacity onPress={() => setShowChannelInfo(false)}>
                <X size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.channelInfoSection}>
                {selectedChannel.isPrivate && selectedChannel.avatar ? (
                  <Image source={{ uri: selectedChannel.avatar }} style={styles.channelInfoAvatar} />
                ) : (
                  <View style={[styles.channelInfoIcon, { backgroundColor: theme.colors.primary + '20' }]}>
                    {React.createElement(getChannelIcon(selectedChannel.type), {
                      size: 32,
                      color: theme.colors.primary,
                    })}
                  </View>
                )}
                <Text style={[styles.channelInfoName, { color: theme.colors.text }]}>
                  {selectedChannel.isPrivate ? selectedChannel.name : `#${selectedChannel.name}`}
                </Text>
                {selectedChannel.description && (
                  <Text style={[styles.channelInfoDescription, { color: theme.colors.secondaryText }]}>
                    {selectedChannel.description}
                  </Text>
                )}
              </View>

              <View style={styles.channelActions}>
                <TouchableOpacity
                  style={[styles.channelActionButton, { backgroundColor: theme.colors.background }]}
                  onPress={() => toggleMute(selectedChannel.id)}
                >
                  {selectedChannel.isMuted ? (
                    <Volume2 size={20} color={theme.colors.text} />
                  ) : (
                    <VolumeX size={20} color={theme.colors.text} />
                  )}
                  <Text style={[styles.channelActionText, { color: theme.colors.text }]}>
                    {selectedChannel.isMuted ? 'Unmute' : 'Mute'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.channelActionButton, { backgroundColor: theme.colors.background }]}
                  onPress={() => togglePin(selectedChannel.id)}
                >
                  <Pin size={20} color={theme.colors.text} />
                  <Text style={[styles.channelActionText, { color: theme.colors.text }]}>
                    {selectedChannel.isPinned ? 'Unpin' : 'Pin'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.channelActionButton, { backgroundColor: theme.colors.background }]}
                >
                  <Archive size={20} color={theme.colors.text} />
                  <Text style={[styles.channelActionText, { color: theme.colors.text }]}>Archive</Text>
                </TouchableOpacity>

                {!selectedChannel.isPrivate && (
                  <TouchableOpacity
                    style={[styles.channelActionButton, { backgroundColor: theme.colors.background }]}
                  >
                    <UserPlus size={20} color={theme.colors.text} />
                    <Text style={[styles.channelActionText, { color: theme.colors.text }]}>Add Members</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.channelActionButton, { backgroundColor: '#FF3B3020' }]}
                >
                  <LogOut size={20} color="#FF3B30" />
                  <Text style={[styles.channelActionText, { color: '#FF3B30' }]}>Leave Channel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Modal visible={selectedMessage !== null} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.messageModalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedMessage(null)}
        >
          <View style={[styles.messageActionsModal, { backgroundColor: theme.colors.cardBackground }]}>
            <TouchableOpacity
              style={styles.messageAction}
              onPress={() => {
                setReplyingTo(selectedMessage);
                setSelectedMessage(null);
              }}
            >
              <Reply size={20} color={theme.colors.text} />
              <Text style={[styles.messageActionText, { color: theme.colors.text }]}>Reply</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageAction}>
              <Forward size={20} color={theme.colors.text} />
              <Text style={[styles.messageActionText, { color: theme.colors.text }]}>Forward</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageAction}>
              <Copy size={20} color={theme.colors.text} />
              <Text style={[styles.messageActionText, { color: theme.colors.text }]}>Copy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageAction}>
              <Star size={20} color={theme.colors.text} />
              <Text style={[styles.messageActionText, { color: theme.colors.text }]}>Star</Text>
            </TouchableOpacity>

            <View style={styles.reactionPicker}>
              {['👍', '❤️', '😂', '😮', '😢', '🎉'].map(emoji => (
                <TouchableOpacity
                  key={emoji}
                  style={styles.reactionButton}
                  onPress={() => {
                    if (selectedMessage) {
                      addReaction(selectedMessage.id, emoji);
                    }
                    setSelectedMessage(null);
                  }}
                >
                  <Text style={styles.reactionButtonEmoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedMessage?.userId === 'currentUser' && (
              <>
                <TouchableOpacity style={styles.messageAction}>
                  <Edit3 size={20} color={theme.colors.text} />
                  <Text style={[styles.messageActionText, { color: theme.colors.text }]}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.messageAction}>
                  <Trash2 size={20} color="#FF3B30" />
                  <Text style={[styles.messageActionText, { color: '#FF3B30' }]}>Delete</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  channelsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  addButton: {
    padding: 8,
  },
  channelsList: {
    paddingHorizontal: 20,
  },
  channelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  channelIcon: {
    marginRight: 12,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  channelLastMessage: {
    fontSize: 14,
  },
  channelMeta: {
    alignItems: 'flex-end',
  },
  channelMembers: {
    fontSize: 12,
    marginBottom: 4,
  },
  unreadBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 16,
    fontWeight: '500',
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  chatMembers: {
    fontSize: 12,
    marginTop: 2,
  },
  chatActions: {
    flexDirection: 'row',
    gap: 12,
  },
  chatActionButton: {
    padding: 8,
  },
  messagesList: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageUser: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  messageTimestamp: {
    fontSize: 12,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    fontSize: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: 'white',
  },
  channelIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  channelNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  channelTimestamp: {
    fontSize: 11,
    marginBottom: 4,
  },
  ownMessageItem: {
    flexDirection: 'row-reverse',
  },
  ownMessageContent: {
    alignItems: 'flex-end',
  },
  replyContainer: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    marginBottom: 6,
  },
  replyBar: {
    width: 3,
    borderRadius: 2,
    marginRight: 8,
  },
  replyContent: {
    flex: 1,
  },
  replyUser: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  replyText: {
    fontSize: 12,
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    maxWidth: '80%',
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  messageStatus: {
    marginLeft: 4,
  },
  reactionsContainer: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 6,
  },
  reactionBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  reactionEmoji: {
    fontSize: 14,
  },
  reactionCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  channelSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  headerAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  headerOnlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: 'white',
  },
  headerIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  replyingToContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  replyingToContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  replyingToText: {
    flex: 1,
  },
  replyingToUser: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  replyingToMessage: {
    fontSize: 12,
  },
  inputActionButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  channelInfoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  channelInfoAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  channelInfoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  channelInfoName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  channelInfoDescription: {
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  channelActions: {
    gap: 12,
  },
  channelActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  channelActionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  messageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageActionsModal: {
    width: '100%',
    borderRadius: 16,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  messageAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 8,
  },
  messageActionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  reactionPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginVertical: 8,
  },
  reactionButton: {
    padding: 8,
  },
  reactionButtonEmoji: {
    fontSize: 24,
  },
});