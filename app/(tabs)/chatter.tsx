 import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import {
  Phone,
  EllipsisVertical,
  Send,
  Check,
  CheckCheck,
  Reply,
  X,
  LogOut,
  Forward,
  Trash2,
  Pin,
  BellOff,
  Bell,
  Plus,
  Settings,
  Search,
  Hash,
  Video,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  Archive,
  UserPlus,
  Copy,
  Star,
  PenLine,
  Mic,
  Users,
  AtSign,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  Headphones,
  Monitor,
  Camera,
  Folder,
  FileText,
  Image as ImageIcon,
  Film,
  Headphones as HeadphonesIcon,
  Radio,
  Inbox,
  Command,
  ListFilter,
  Clock,
  MessageCircle,
  CornerUpLeft,
  CornerDownRight,
  Download,
  Eye,
  EyeOff,
  Lock,
  LockOpen,
  GripHorizontal,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { trpc } from '@/lib/trpc';
import CreateChannelModal from '@/components/messaging/CreateChannelModal';
import { RelatedFeatures, QuickLinks } from '@/components/RelatedFeatures';

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
  category?: string;
  position?: number;
}

interface ChannelCategory {
  id: string;
  name: string;
  position: number;
  isCollapsed?: boolean;
}

interface TypingIndicator {
  userId: string;
  userName: string;
  timestamp: number;
}

interface Thread {
  id: string;
  parentMessageId: string;
  replyCount: number;
  lastReplyAt: string;
  participants: string[];
}

interface Attachment {
  id: string;
  type: 'image' | 'file' | 'video' | 'voice';
  url: string;
  name: string;
  size?: number;
  duration?: number;
  thumbnailUrl?: string;
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
  isOwn?: boolean;
}

const mockCategories: ChannelCategory[] = [
  { id: 'pinned', name: 'Pinned', position: 0 },
  { id: 'text', name: 'Text Channels', position: 1 },
  { id: 'voice', name: 'Voice Channels', position: 2 },
  { id: 'video', name: 'Video Rooms', position: 3 },
  { id: 'dms', name: 'Direct Messages', position: 4 },
];

const mockChannels: Channel[] = [
  // Pinned Channels
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
    category: 'pinned',
    position: 0,
  },
  {
    id: '2',
    name: 'announcements',
    description: 'Important company announcements',
    type: 'text',
    members: 1247,
    lastMessage: 'New features released! 🚀',
    timestamp: '1h ago',
    unread: 1,
    isPinned: true,
    category: 'pinned',
    position: 1,
  },
  // Text Channels
  {
    id: '5',
    name: 'development',
    description: 'Development team channel',
    type: 'text',
    members: 45,
    lastMessage: 'Code review needed for PR #234',
    timestamp: '30m ago',
    unread: 5,
    category: 'text',
    position: 0,
  },
  {
    id: '6',
    name: 'marketing',
    description: 'Marketing campaigns and strategies',
    type: 'text',
    members: 32,
    lastMessage: 'Q4 campaign results are in! 📊',
    timestamp: '2h ago',
    category: 'text',
    position: 1,
  },
  {
    id: 'dev-design',
    name: 'design',
    description: 'Design team discussions',
    type: 'text',
    members: 12,
    lastMessage: 'New mockups uploaded',
    timestamp: '15m ago',
    unread: 2,
    category: 'text',
    position: 2,
  },
  {
    id: 'dev-random',
    name: 'random',
    description: 'Off-topic conversations',
    type: 'text',
    members: 89,
    lastMessage: 'Anyone up for lunch? 🍕',
    timestamp: '5m ago',
    unread: 12,
    category: 'text',
    position: 3,
  },
  // Voice Channels
  {
    id: '7',
    name: 'General Voice',
    description: 'Casual voice discussions',
    type: 'voice',
    members: 8,
    category: 'voice',
    position: 0,
  },
  {
    id: 'voice-dev',
    name: 'Dev Standup',
    description: 'Daily dev team standup',
    type: 'voice',
    members: 12,
    category: 'voice',
    position: 1,
  },
  {
    id: 'voice-gaming',
    name: 'Gaming Lounge',
    description: 'Gaming and fun',
    type: 'voice',
    members: 5,
    category: 'voice',
    position: 2,
  },
  // Video Rooms
  {
    id: '8',
    name: 'Meeting Room A',
    description: 'Team meetings',
    type: 'video',
    members: 0,
    category: 'video',
    position: 0,
  },
  {
    id: 'video-b',
    name: 'Meeting Room B',
    description: 'Client calls',
    type: 'video',
    members: 3,
    category: 'video',
    position: 1,
  },
  // Direct Messages
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
    category: 'dms',
    position: 0,
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
    category: 'dms',
    position: 1,
  },
  {
    id: 'dm-jessica',
    name: 'Jessica Chen',
    type: 'private',
    members: 2,
    lastMessage: 'Can you review my PR?',
    timestamp: 'Just now',
    isPrivate: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    isOnline: true,
    unread: 2,
    category: 'dms',
    position: 2,
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
  const router = useRouter();
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
  const [categories, setCategories] = useState<ChannelCategory[]>(mockCategories);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Enhanced Slack/Discord features
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [activeThread, setActiveThread] = useState<Message | null>(null);
  const [showThreadPanel, setShowThreadPanel] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState<Message[]>([]);
  const [showPinnedModal, setShowPinnedModal] = useState(false);
  const [collapsedCategories, setCollapsedCategories] = useState<string[]>([]);
  const [isInCall, setIsInCall] = useState(false);
  const [callType, setCallType] = useState<'voice' | 'video' | null>(null);
  const [messageMenuPosition, setMessageMenuPosition] = useState({ x: 0, y: 0 });
  const [showMessageActions, setShowMessageActions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const typingAnim = useRef(new Animated.Value(0)).current;

  // tRPC data fetching
  const { data: channelsData, isLoading: channelsLoading, refetch: refetchChannels } = trpc.messaging.getChannels.useQuery();
  const { data: messagesData, isLoading: messagesLoading, refetch: refetchMessages } = trpc.messaging.getMessages.useQuery({ channelId: selectedChannel.id });
  const sendMessageMutation = trpc.messaging.sendMessage.useMutation();
  const createChannelMutation = trpc.messaging.createChannel.useMutation();

  // Simulate typing indicator
  useEffect(() => {
    if (messageText.length > 0 && messageText.length % 5 === 0) {
      // Simulate other users typing randomly
      if (Math.random() > 0.7) {
        const mockTypers = ['Alice', 'Bob', 'Carol'];
        const typer = mockTypers[Math.floor(Math.random() * mockTypers.length)];
        setTypingUsers([{ userId: typer, userName: typer, timestamp: Date.now() }]);
        setTimeout(() => setTypingUsers([]), 3000);
      }
    }
  }, [messageText]);

  useEffect(() => {
    if (!channelsData?.channels) return;

    const mapped: Channel[] = channelsData.channels.map((c: any) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      type: c.type === 'channel' ? 'text' : c.type === 'dm' ? 'private' : 'private',
      members: (c.metadata?.memberCount ?? 0) as number,
      isPrivate: c.visibility !== 'org',
    }));

    if (mapped.length === 0) return;
    setChannels(mapped);

    setSelectedChannel(prev => {
      const stillExists = mapped.some(ch => ch.id === prev.id);
      return stillExists ? prev : mapped[0]!;
    });
  }, [channelsData]);

  useEffect(() => {
    if (!messagesData?.messages) return;

    const mapped: Message[] = messagesData.messages.map((m: any) => {
      const isOwn = m.isOwn === true;
      return {
        id: m.id,
        user: isOwn ? 'You' : 'Member',
        userId: isOwn ? 'currentUser' : (m.userId ?? 'member'),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        message: m.isE2EE ? '[Encrypted message]' : (m.message ?? ''),
        timestamp: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        type: 'text',
        status: m.status,
        isOwn: m.isOwn,
      };
    });

    setMessages(mapped);
  }, [messagesData]);

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
        return Volume2;
      case 'video':
        return Video;
      case 'private':
        return Users;
      default:
        return Hash;
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'pinned':
        return Pin;
      case 'text':
        return MessageSquare;
      case 'voice':
        return Headphones;
      case 'video':
        return Monitor;
      case 'dms':
        return Users;
      default:
        return Folder;
    }
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const startVoiceCall = () => {
    setCallType('voice');
    setIsInCall(true);
    Alert.alert('Voice Call', `Joining voice channel: ${selectedChannel.name}`);
  };

  const startVideoCall = () => {
    setCallType('video');
    setIsInCall(true);
    Alert.alert('Video Call', `Starting video call in: ${selectedChannel.name}`);
  };

  const endCall = () => {
    setIsInCall(false);
    setCallType(null);
  };

  const searchMessages = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const results = messages.filter(m => 
      m.message.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const openThread = (message: Message) => {
    setActiveThread(message);
    setShowThreadPanel(true);
  };

  const closeThread = () => {
    setActiveThread(null);
    setShowThreadPanel(false);
  };

  const pinMessage = (message: Message) => {
    setPinnedMessages(prev => {
      const exists = prev.find(m => m.id === message.id);
      if (exists) {
        return prev.filter(m => m.id !== message.id);
      }
      return [...prev, message];
    });
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDuration(0);
    recordingTimerRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    // Add voice message
    const voiceMessage: Message = {
      id: `voice-${Date.now()}`,
      user: 'You',
      userId: 'currentUser',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: `🎤 Voice message (${recordingDuration}s)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'voice',
      status: 'sent',
      isOwn: true,
    };
    setMessages(prev => [...prev, voiceMessage]);
    setRecordingDuration(0);
  };

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    const optimisticId = `optimistic-${Date.now()}`;
    const optimistic: Message = {
      id: optimisticId,
      user: 'You',
      userId: 'currentUser',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      message: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sending',
      replyTo: replyingTo?.id,
      isOwn: true,
    };

    setMessages(prev => [...prev, optimistic]);
    const content = messageText;
    setMessageText('');
    setReplyingTo(null);

    try {
      await sendMessageMutation.mutateAsync({ channelId: selectedChannel.id, content });
      await refetchMessages();
      setMessages(prev => prev.filter(m => m.id !== optimisticId));
    } catch {
      setMessages(prev => prev.map(m => (m.id === optimisticId ? { ...m, status: 'sent' } : m)));
    }
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

  const getChannelsByCategory = (categoryId: string) => {
    return filteredChannels
      .filter(ch => ch.category === categoryId)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  };

  const renderChannelItem = ({ item }: { item: Channel }) => {
    const IconComponent = getChannelIcon(item.type);
    const isSelected = selectedChannel.id === item.id;
    const isCollapsed = collapsedCategories.includes(item.category || '');
    
    if (isCollapsed) return null;
    
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
        onLongPress={() => {
          if (item.type === 'voice' || item.type === 'video') {
            Alert.alert(
              'Join Channel',
              `Join ${item.name}?`,
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: item.type === 'voice' ? 'Join Voice' : 'Join Video', 
                  onPress: () => item.type === 'voice' ? startVoiceCall() : startVideoCall()
                },
              ]
            );
          }
        }}
      >
        {item.isPrivate && item.avatar ? (
          <View style={styles.avatarContainer}>
            <Image source={{ uri: item.avatar }} style={styles.channelAvatar} />
            {item.isOnline && <View style={styles.onlineIndicator} />}
          </View>
        ) : (
          <View style={[styles.channelIconContainer, { 
            backgroundColor: isSelected ? theme.colors.primary : theme.colors.cardBackground,
          }]}>
            <IconComponent size={18} color={isSelected ? 'white' : theme.colors.primary} />
          </View>
        )}
        <View style={styles.channelInfo}>
          <View style={styles.channelNameRow}>
            <Text style={[styles.channelName, { 
              color: theme.colors.text,
              fontWeight: isSelected ? '600' : '400',
            }]} numberOfLines={1}>
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
          {(item.type === 'voice' || item.type === 'video') && item.members > 0 && (
            <View style={styles.voiceChannelInfo}>
              <View style={[styles.liveIndicator, { 
                backgroundColor: item.type === 'voice' ? '#34C759' : '#FF9500' 
              }]} />
              <Text style={[styles.voiceChannelText, { color: theme.colors.secondaryText }]}>
                {item.members} {item.members === 1 ? 'person' : 'people'} active
              </Text>
            </View>
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
              <Text style={styles.unreadText}>{item.unread > 99 ? '99+' : item.unread}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategory = (category: ChannelCategory) => {
    const CategoryIcon = getCategoryIcon(category.id);
    const categoryChannels = getChannelsByCategory(category.id);
    const isCollapsed = collapsedCategories.includes(category.id);
    
    if (categoryChannels.length === 0) return null;

    return (
      <View key={category.id} style={styles.categorySection}>
        <TouchableOpacity 
          style={styles.categoryHeader}
          onPress={() => toggleCategory(category.id)}
        >
          <View style={styles.categoryHeaderLeft}>
            <CategoryIcon size={16} color={theme.colors.secondaryText} />
            <Text style={[styles.categoryTitle, { color: theme.colors.secondaryText }]}>
              {category.name.toUpperCase()}
            </Text>
            <Text style={[styles.categoryCount, { color: theme.colors.secondaryText }]}>
              {categoryChannels.length}
            </Text>
          </View>
          {isCollapsed ? (
            <ChevronRight size={16} color={theme.colors.secondaryText} />
          ) : (
            <ChevronDown size={16} color={theme.colors.secondaryText} />
          )}
        </TouchableOpacity>
        {!isCollapsed && categoryChannels.map(item => (
          <View key={item.id}>{renderChannelItem({ item })}</View>
        ))}
      </View>
    );
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwn = item.isOwn;
    return (
      <View style={[styles.messageItem, isOwn ? styles.ownMessage : styles.otherMessage]}>
        {!isOwn && (
          <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
        )}
        <View style={styles.messageContent}>
          <View style={styles.messageHeader}>
            {!isOwn && (
              <Text style={[styles.messageUser, { color: theme.colors.text }]}>
                {item.user}
              </Text>
            )}
            <Text style={[styles.messageTimestamp, { color: theme.colors.secondaryText }]}>
              {item.timestamp}
            </Text>
          </View>
          <TouchableOpacity
            onLongPress={() => setSelectedMessage(item)}
            style={[
              styles.messageBubble,
              {
                backgroundColor: isOwn 
                  ? theme.colors.primary 
                  : theme.colors.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                { color: isOwn ? 'white' : theme.colors.text },
              ]}
            >
              {item.message}
            </Text>
          </TouchableOpacity>
          {item.reactions && item.reactions.length > 0 && (
            <View style={styles.reactionsContainer}>
              {item.reactions.map((reaction, index) => (
                <View
                  key={index}
                  style={[
                    styles.reactionBadge,
                    { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border },
                  ]}
                >
                  <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                  <Text style={[styles.reactionCount, { color: theme.colors.secondaryText }]}>
                    {reaction.count}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (typingUsers.length === 0) return null;
    const names = typingUsers.map(u => u.userName).join(', ');
    return (
      <View style={styles.typingContainer}>
        <View style={styles.typingDots}>
          <View style={[styles.typingDot, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.typingDot, { backgroundColor: theme.colors.primary }]} />
          <View style={[styles.typingDot, { backgroundColor: theme.colors.primary }]} />
        </View>
        <Text style={[styles.typingText, { color: theme.colors.secondaryText }]}>
          {names} {typingUsers.length === 1 ? 'is' : 'are'} typing...
        </Text>
      </View>
    );
  };

  const renderCallOverlay = () => {
    if (!isInCall) return null;
    return (
      <View style={styles.callOverlay}>
        <View style={[styles.callContainer, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.callHeader}>
            <View style={[styles.callIndicator, { 
              backgroundColor: callType === 'voice' ? '#34C759' : '#FF9500' 
            }]}>
              {callType === 'voice' ? (
                <Phone size={24} color="white" />
              ) : (
                <Video size={24} color="white" />
              )}
            </View>
            <Text style={[styles.callTitle, { color: theme.colors.text }]}>
              {callType === 'voice' ? 'Voice Call' : 'Video Call'}
            </Text>
            <Text style={[styles.callSubtitle, { color: theme.colors.secondaryText }]}>
              {selectedChannel.name}
            </Text>
          </View>
          <TouchableOpacity 
            style={[styles.endCallButton, { backgroundColor: '#FF3B30' }]}
            onPress={endCall}
          >
            <Phone size={24} color="white" />
            <Text style={styles.endCallText}>End Call</Text>
          </TouchableOpacity>
        </View>
      </View>
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
              {channels.filter(c => c.type === 'text' || c.type === 'private').length} channels • {channels.filter(c => c.type === 'voice' || c.type === 'video').length} rooms
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} onPress={() => setShowSearchModal(true)}>
              <Search size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={() => setShowCreateModal(true)}>
              <Plus size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <Settings size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchContainer, { paddingHorizontal: 20 }]}>
          <TouchableOpacity 
            style={[styles.searchBar, { backgroundColor: theme.colors.cardBackground }]}
            onPress={() => setShowSearchModal(true)}
          >
            <Search size={18} color={theme.colors.secondaryText} />
            <Text style={[styles.searchPlaceholder, { color: theme.colors.secondaryText }]}>
              Search messages, channels, people...
            </Text>
            <View style={styles.searchShortcut}>
              <Command size={14} color={theme.colors.secondaryText} />
              <Text style={[styles.shortcutText, { color: theme.colors.secondaryText }]}>K</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.sort((a, b) => a.position - b.position).map(renderCategory)}
          
          {/* Related Features */}
          <RelatedFeatures
            featureId="team-communication"
            title="Related Collaboration Features"
            maxItems={6}
            layout="horizontal"
          />
          <QuickLinks
            groupId="communications"
            title="Communication Tools"
            maxItems={4}
          />
        </ScrollView>

        {/* Search Modal */}
        <Modal visible={showSearchModal} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={[styles.searchModalContent, { backgroundColor: theme.colors.background }]}>
              <View style={styles.searchModalHeader}>
                <View style={[styles.searchModalBar, { backgroundColor: theme.colors.cardBackground }]}>
                  <Search size={20} color={theme.colors.secondaryText} />
                  <TextInput
                    style={[styles.searchModalInput, { color: theme.colors.text }]}
                    placeholder="Search everything..."
                    placeholderTextColor={theme.colors.secondaryText}
                    value={searchQuery}
                    onChangeText={(text) => {
                      setSearchQuery(text);
                      searchMessages(text);
                    }}
                    autoFocus
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => { setSearchQuery(''); setSearchResults([]); }}>
                      <X size={18} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => { setShowSearchModal(false); setSearchQuery(''); setSearchResults([]); }}
                >
                  <Text style={[styles.cancelText, { color: theme.colors.primary }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
              
              <ScrollView style={styles.searchResults}>
                {searchResults.length > 0 ? (
                  <View style={styles.searchSection}>
                    <Text style={[styles.searchSectionTitle, { color: theme.colors.secondaryText }]}>
                      Messages ({searchResults.length})
                    </Text>
                    {searchResults.map(msg => (
                      <TouchableOpacity 
                        key={msg.id} 
                        style={[styles.searchResultItem, { backgroundColor: theme.colors.cardBackground }]}
                        onPress={() => {
                          setShowSearchModal(false);
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                      >
                        <Image source={{ uri: msg.avatar }} style={styles.searchResultAvatar} />
                        <View style={styles.searchResultContent}>
                          <Text style={[styles.searchResultUser, { color: theme.colors.text }]}>{msg.user}</Text>
                          <Text style={[styles.searchResultMessage, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                            {msg.message}
                          </Text>
                        </View>
                        <Text style={[styles.searchResultTime, { color: theme.colors.secondaryText }]}>{msg.timestamp}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : searchQuery.length > 0 ? (
                  <View style={styles.noResults}>
                    <Search size={48} color={theme.colors.secondaryText} />
                    <Text style={[styles.noResultsText, { color: theme.colors.secondaryText }]}>
                      No results found for &quot;{searchQuery}&quot;
                    </Text>
                  </View>
                ) : (
                  <View style={styles.searchSuggestions}>
                    <Text style={[styles.suggestionTitle, { color: theme.colors.secondaryText }]}>Try searching for:</Text>
                    {['Messages containing "project"', 'From: Alice', 'In: #development', 'Has: image'].map((suggestion, idx) => (
                      <TouchableOpacity 
                        key={idx} 
                        style={[styles.suggestionItem, { backgroundColor: theme.colors.cardBackground }]}
                        onPress={() => setSearchQuery(suggestion.replace(/^Messages containing |^From: |^In: |^Has: /, ''))}
                      >
                        <Text style={[styles.suggestionText, { color: theme.colors.text }]}>{suggestion}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
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
            <EllipsisVertical size={18} color={theme.colors.text} />
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
                  <PenLine size={20} color={theme.colors.text} />
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

      <CreateChannelModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={(channelId) => {
          setShowCreateModal(false);
          refetchChannels();
          // Navigate to the new channel
          setTimeout(() => {
            if (channelsData?.channels) {
              const newChannel = channelsData.channels.find((c: any) => c.id === channelId);
              if (newChannel) {
                setSelectedChannel({
                  id: newChannel.id,
                  name: newChannel.name,
                  description: newChannel.description,
                  type: newChannel.type === 'channel' ? 'text' : newChannel.type === 'dm' ? 'private' : 'private',
                  members: (newChannel.metadata?.memberCount ?? 0) as number,
                  isPrivate: newChannel.visibility !== 'org',
                });
                setShowChannels(false);
              }
            }
          }, 500);
        }}
      />
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
  ownMessage: {
    flexDirection: 'row-reverse',
  },
  otherMessage: {
    flexDirection: 'row',
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
  reactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  reactionEmoji: {
    fontSize: 14,
  },
  reactionCount: {
    fontSize: 11,
    fontWeight: '600',
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
  // Category styles
  categorySection: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  categoryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryCount: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  // Voice channel styles
  voiceChannelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  voiceChannelText: {
    fontSize: 12,
  },
  // Search styles
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
  },
  searchShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  shortcutText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchModalContent: {
    flex: 1,
    marginTop: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  searchModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  searchModalBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 10,
  },
  searchModalInput: {
    flex: 1,
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  searchResults: {
    flex: 1,
    padding: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  searchSectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  searchResultAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  searchResultContent: {
    flex: 1,
  },
  searchResultUser: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  searchResultMessage: {
    fontSize: 14,
  },
  searchResultTime: {
    fontSize: 12,
    marginLeft: 8,
  },
  noResults: {
    alignItems: 'center',
    paddingTop: 60,
  },
  noResultsText: {
    fontSize: 16,
    marginTop: 16,
  },
  searchSuggestions: {
    paddingTop: 20,
  },
  suggestionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  suggestionItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 15,
  },
  // Typing indicator styles
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  typingDots: {
    flexDirection: 'row',
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  typingText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  // Call overlay styles
  callOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  callContainer: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    width: 280,
  },
  callHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  callIndicator: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  callTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  callSubtitle: {
    fontSize: 14,
  },
  endCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  endCallText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});