import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import {
  X,
  Sunrise,
  Sun,
  Moon,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  Calendar,
  CircleCheck,
  CircleAlert,
  Sparkles,
  Play,
  Volume2,
  Share2,
  Bookmark,
  ChartBar,
  Zap,
  Coffee,
  Target,
  Bell,
  Brain,
  Trophy,
  Flame,
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  MessageSquare,
  Heart,
  ThumbsUp,
  Pause,
  SkipForward,
  RefreshCw,
  Settings,
  Award,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useMessaging } from '@/providers/MessagingProvider';
import { getServiceIcon, getServiceColor } from '@/utils/services';
import { ServiceType } from '@/types/messaging';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
}

interface WeatherMood {
  emoji: string;
  label: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  isNew: boolean;
}

export default function DailyBriefingModal({ visible, onClose }: Props) {
  const { theme } = useTheme();
  const { conversations } = useMessaging();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'messages' | 'insights' | 'goals'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      progressAnim.setValue(0);
    }
  }, [visible, fadeAnim, progressAnim]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { 
      text: 'Good Morning', 
      icon: <Sunrise size={28} color="#F59E0B" />,
      gradient: ['#FEF3C7', '#FDE68A'],
      subtitle: 'Rise and shine! Here\'s your day at a glance.',
    };
    if (hour < 18) return { 
      text: 'Good Afternoon', 
      icon: <Sun size={28} color="#F59E0B" />,
      gradient: ['#FEF9C3', '#FDE047'],
      subtitle: 'Keep up the great work! Here\'s your update.',
    };
    return { 
      text: 'Good Evening', 
      icon: <Moon size={28} color="#6366F1" />,
      gradient: ['#E0E7FF', '#C7D2FE'],
      subtitle: 'Winding down? Here\'s your evening summary.',
    };
  };

  const greeting = getGreeting();

  const weatherMood: WeatherMood = useMemo(() => {
    const moods = [
      { emoji: '🔥', label: 'On Fire', color: '#EF4444' },
      { emoji: '⚡', label: 'Productive', color: '#F59E0B' },
      { emoji: '😊', label: 'Great', color: '#10B981' },
      { emoji: '😌', label: 'Calm', color: '#3B82F6' },
    ];
    return moods[Math.floor(Math.random() * moods.length)];
  }, []);

  const todayStats = useMemo(() => {
    const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
    const activeConversations = conversations.filter(c => c.unreadCount > 0).length;
    const platforms = [...new Set(conversations.map(c => c.service))].length;
    const totalMessages = conversations.reduce((acc, c) => acc + c.messages.length, 0);
    
    return {
      totalUnread,
      activeConversations,
      platforms,
      totalMessages,
      responseRate: 92,
      avgResponseTime: '8m',
      sentToday: 47,
      receivedToday: 63,
      productivityScore: 87,
      streakDays: 12,
    };
  }, [conversations]);

  const aiInsights = useMemo(() => [
    {
      id: '1',
      type: 'positive',
      title: 'Response Time Improved',
      description: 'Your average response time is 23% faster than last week',
      metric: '-23%',
      icon: <Clock size={20} color="#10B981" />,
      color: '#10B981',
    },
    {
      id: '2',
      type: 'alert',
      title: '3 VIP Messages Pending',
      description: 'Important contacts are waiting for your response',
      metric: '3',
      icon: <Star size={20} color="#F59E0B" />,
      color: '#F59E0B',
    },
    {
      id: '3',
      type: 'trend',
      title: 'Message Volume Up',
      description: 'You received 18% more messages today compared to average',
      metric: '+18%',
      icon: <TrendingUp size={20} color="#3B82F6" />,
      color: '#3B82F6',
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Engagement Milestone',
      description: 'You\'ve maintained a 90%+ response rate for 7 days',
      metric: '7 days',
      icon: <Trophy size={20} color="#8B5CF6" />,
      color: '#8B5CF6',
    },
  ], []);

  const achievements: Achievement[] = useMemo(() => [
    {
      id: '1',
      title: 'Quick Responder',
      description: 'Reply to 50 messages under 5 minutes',
      icon: <Zap size={18} color="#F59E0B" />,
      color: '#F59E0B',
      progress: 78,
      isNew: false,
    },
    {
      id: '2',
      title: 'Conversation Streak',
      description: 'Keep conversations active for 14 days',
      icon: <Flame size={18} color="#EF4444" />,
      color: '#EF4444',
      progress: 86,
      isNew: true,
    },
    {
      id: '3',
      title: 'Multi-Platform Pro',
      description: 'Active on 5+ platforms daily',
      icon: <Award size={18} color="#8B5CF6" />,
      color: '#8B5CF6',
      progress: 100,
      isNew: false,
    },
  ], []);

  const priorityMessages = useMemo(() => {
    return conversations
      .filter(c => c.unreadCount > 0)
      .slice(0, 5)
      .map(c => ({
        id: c.id,
        name: c.name,
        avatar: c.avatar,
        platform: c.service,
        message: c.lastMessage,
        time: c.timestamp,
        unread: c.unreadCount,
        isOnline: c.isOnline,
        priority: Math.random() > 0.5 ? 'high' : 'medium',
        sentiment: Math.random() > 0.6 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
      }));
  }, [conversations]);

  const upcomingTasks = useMemo(() => [
    {
      id: '1',
      title: 'Reply to John about project update',
      time: '10:00 AM',
      priority: 'high' as const,
      completed: false,
      platform: 'slack',
    },
    {
      id: '2',
      title: 'Review shared documents from Sarah',
      time: '11:30 AM',
      priority: 'medium' as const,
      completed: false,
      platform: 'whatsapp',
    },
    {
      id: '3',
      title: 'Schedule team sync call',
      time: '2:00 PM',
      priority: 'low' as const,
      completed: true,
      platform: 'telegram',
    },
    {
      id: '4',
      title: 'Send weekly report to clients',
      time: '4:00 PM',
      priority: 'high' as const,
      completed: false,
      platform: 'messenger',
    },
  ], []);

  const platformBreakdown = useMemo(() => {
    const breakdown: Record<string, { count: number; sent: number; received: number }> = {};
    conversations.forEach(c => {
      if (!breakdown[c.service]) {
        breakdown[c.service] = { count: 0, sent: 0, received: 0 };
      }
      breakdown[c.service].count += c.unreadCount;
      breakdown[c.service].sent += Math.floor(Math.random() * 20) + 5;
      breakdown[c.service].received += Math.floor(Math.random() * 25) + 10;
    });
    return Object.entries(breakdown).map(([platform, data]) => ({
      platform,
      ...data,
      color: getServiceColor(platform as ServiceType),
    }));
  }, [conversations]);

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <ThumbsUp size={12} color="#10B981" />;
      case 'negative': return <CircleAlert size={12} color="#EF4444" />;
      default: return <MessageSquare size={12} color="#6B7280" />;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.headerContent}>
            <View style={styles.headerTop}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color="#FFF" />
              </TouchableOpacity>
              <View style={styles.headerActions}>
                <TouchableOpacity style={styles.headerActionButton}>
                  <Settings size={20} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.headerActionButton}
                  onPress={() => setIsSaved(!isSaved)}
                >
                  <Bookmark 
                    size={20} 
                    color={isSaved ? '#F59E0B' : 'rgba(255,255,255,0.8)'} 
                    fill={isSaved ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.greetingSection}>
              <View style={styles.greetingRow}>
                {greeting.icon}
                <Text style={styles.greetingText}>{greeting.text}</Text>
                <View style={[styles.moodBadge, { backgroundColor: weatherMood.color + '20' }]}>
                  <Text style={styles.moodEmoji}>{weatherMood.emoji}</Text>
                  <Text style={[styles.moodLabel, { color: weatherMood.color }]}>{weatherMood.label}</Text>
                </View>
              </View>
              <Text style={styles.dateText}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
              <Text style={styles.subtitleText}>{greeting.subtitle}</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <MessageCircle size={18} color="#FFF" />
                <Text style={styles.statValue}>{todayStats.totalUnread}</Text>
                <Text style={styles.statLabel}>Unread</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Users size={18} color="#FFF" />
                <Text style={styles.statValue}>{todayStats.activeConversations}</Text>
                <Text style={styles.statLabel}>Active</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Clock size={18} color="#FFF" />
                <Text style={styles.statValue}>{todayStats.avgResponseTime}</Text>
                <Text style={styles.statLabel}>Response</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Trophy size={18} color="#FFF" />
                <Text style={styles.statValue}>{todayStats.productivityScore}%</Text>
                <Text style={styles.statLabel}>Score</Text>
              </View>
            </View>

            <View style={styles.streakBanner}>
              <Flame size={16} color="#F59E0B" />
              <Text style={styles.streakText}>
                {todayStats.streakDays} Day Productivity Streak!
              </Text>
              <Flame size={16} color="#F59E0B" />
            </View>
          </View>
        </View>

        <View style={styles.tabBar}>
          {(['overview', 'messages', 'insights', 'goals'] as const).map(tab => {
            const tabIcons = {
              overview: Eye,
              messages: MessageCircle,
              insights: Brain,
              goals: Target,
            };
            const TabIcon = tabIcons[tab];
            return (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabItem,
                  activeSection === tab && { borderBottomColor: theme.colors.primary, borderBottomWidth: 2 },
                ]}
                onPress={() => setActiveSection(tab)}
              >
                <TabIcon size={18} color={activeSection === tab ? theme.colors.primary : theme.colors.secondaryText} />
                <Text style={[
                  styles.tabLabel,
                  { color: activeSection === tab ? theme.colors.primary : theme.colors.secondaryText },
                ]}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeSection === 'overview' && (
            <>
              <View style={[styles.aiBriefing, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.aiHeader}>
                  <View style={styles.aiTitleRow}>
                    <View style={[styles.aiIconBg, { backgroundColor: theme.colors.primary + '15' }]}>
                      <Brain size={22} color={theme.colors.primary} />
                    </View>
                    <View>
                      <Text style={[styles.aiTitle, { color: theme.colors.text }]}>
                        AI Daily Summary
                      </Text>
                      <Text style={[styles.aiSubtitle, { color: theme.colors.secondaryText }]}>
                        Personalized for you
                      </Text>
                    </View>
                  </View>
                  <View style={styles.aiControls}>
                    <TouchableOpacity 
                      style={[styles.playButton, { backgroundColor: theme.colors.primary }]}
                      onPress={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause size={18} color="#FFF" />
                      ) : (
                        <Play size={18} color="#FFF" />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.skipButton}>
                      <SkipForward size={18} color={theme.colors.secondaryText} />
                    </TouchableOpacity>
                  </View>
                </View>
                
                {isPlaying && (
                  <View style={styles.playingIndicator}>
                    <Volume2 size={14} color={theme.colors.primary} />
                    <View style={styles.waveform}>
                      {[...Array(20)].map((_, i) => (
                        <Animated.View 
                          key={i}
                          style={[
                            styles.waveBar,
                            { 
                              backgroundColor: theme.colors.primary,
                              height: Math.random() * 20 + 5,
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text style={[styles.playingTime, { color: theme.colors.secondaryText }]}>0:42</Text>
                  </View>
                )}
                
                <Text style={[styles.aiSummary, { color: theme.colors.secondaryText }]}>
                  Good {greeting.text.split(' ')[1].toLowerCase()}! You have{' '}
                  <Text style={{ fontWeight: '600', color: theme.colors.text }}>{todayStats.totalUnread} unread messages</Text>
                  {' '}across{' '}
                  <Text style={{ fontWeight: '600', color: theme.colors.text }}>{todayStats.platforms} platforms</Text>.
                  {priorityMessages.length > 0 && (
                    <Text>
                      {' '}<Text style={{ fontWeight: '600', color: theme.colors.text }}>{priorityMessages[0].name}</Text>
                      {' '}sent you a message that might need attention.
                    </Text>
                  )}
                  {' '}Your response rate is at{' '}
                  <Text style={{ fontWeight: '600', color: '#10B981' }}>{todayStats.responseRate}%</Text>
                  {' '}— keep it up!
                </Text>
                
                <View style={styles.aiActions}>
                  <TouchableOpacity style={[styles.aiActionButton, { backgroundColor: theme.colors.primary + '15' }]}>
                    <RefreshCw size={14} color={theme.colors.primary} />
                    <Text style={[styles.aiActionText, { color: theme.colors.primary }]}>Regenerate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.aiActionButton, { backgroundColor: theme.colors.cardBackground }]}>
                    <Share2 size={14} color={theme.colors.secondaryText} />
                    <Text style={[styles.aiActionText, { color: theme.colors.secondaryText }]}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Sparkles size={18} color={theme.colors.primary} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    AI Insights
                  </Text>
                </View>
                {aiInsights.map(insight => (
                  <TouchableOpacity 
                    key={insight.id}
                    style={[styles.insightCard, { backgroundColor: insight.color + '10' }]}
                  >
                    <View style={[styles.insightIcon, { backgroundColor: insight.color + '20' }]}>
                      {insight.icon}
                    </View>
                    <View style={styles.insightContent}>
                      <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                        {insight.title}
                      </Text>
                      <Text style={[styles.insightDesc, { color: theme.colors.secondaryText }]}>
                        {insight.description}
                      </Text>
                    </View>
                    <View style={[styles.insightMetric, { backgroundColor: insight.color }]}>
                      <Text style={styles.insightMetricText}>{insight.metric}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <ChartBarBig size={18} color="#10B981" />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Today Activity
                  </Text>
                </View>
                <View style={[styles.activityCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.activityRow}>
                    <View style={styles.activityItem}>
                      <ArrowUp size={16} color="#10B981" />
                      <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                        {todayStats.sentToday}
                      </Text>
                      <Text style={[styles.activityLabel, { color: theme.colors.secondaryText }]}>
                        Sent
                      </Text>
                    </View>
                    <View style={[styles.activityDivider, { backgroundColor: theme.colors.border }]} />
                    <View style={styles.activityItem}>
                      <ArrowDown size={16} color="#3B82F6" />
                      <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                        {todayStats.receivedToday}
                      </Text>
                      <Text style={[styles.activityLabel, { color: theme.colors.secondaryText }]}>
                        Received
                      </Text>
                    </View>
                    <View style={[styles.activityDivider, { backgroundColor: theme.colors.border }]} />
                    <View style={styles.activityItem}>
                      <CircleCheck size={16} color="#8B5CF6" />
                      <Text style={[styles.activityValue, { color: theme.colors.text }]}>
                        {todayStats.responseRate}%
                      </Text>
                      <Text style={[styles.activityLabel, { color: theme.colors.secondaryText }]}>
                        Response
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          {activeSection === 'messages' && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Bell size={18} color="#EF4444" />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Priority Messages
                  </Text>
                  <View style={[styles.badge, { backgroundColor: '#EF4444' }]}>
                    <Text style={styles.badgeText}>{priorityMessages.length}</Text>
                  </View>
                </View>
                {priorityMessages.map(msg => {
                  const ServiceIcon = getServiceIcon(msg.platform as ServiceType);
                  const serviceColor = getServiceColor(msg.platform);
                  
                  return (
                    <TouchableOpacity 
                      key={msg.id}
                      style={[styles.messageCard, { backgroundColor: theme.colors.cardBackground }]}
                    >
                      <View style={styles.messageAvatar}>
                        <Image source={{ uri: msg.avatar }} style={styles.avatar} />
                        <View style={[styles.platformBadge, { backgroundColor: serviceColor }]}>
                          <ServiceIcon size={10} color="#FFF" />
                        </View>
                        {msg.isOnline && <View style={styles.onlineIndicator} />}
                      </View>
                      <View style={styles.messageContent}>
                        <View style={styles.messageHeader}>
                          <Text style={[styles.messageName, { color: theme.colors.text }]}>
                            {msg.name}
                          </Text>
                          <View style={styles.messageMeta}>
                            {getSentimentIcon(msg.sentiment)}
                            <Text style={[styles.messageTime, { color: theme.colors.secondaryText }]}>
                              {msg.time}
                            </Text>
                          </View>
                        </View>
                        <Text 
                          style={[styles.messageText, { color: theme.colors.secondaryText }]}
                          numberOfLines={2}
                        >
                          {msg.message}
                        </Text>
                        {msg.priority === 'high' && (
                          <View style={[styles.priorityTag, { backgroundColor: '#FEE2E2' }]}>
                            <CircleAlert size={12} color="#EF4444" />
                            <Text style={styles.priorityTagText}>High Priority</Text>
                          </View>
                        )}
                      </View>
                      {msg.unread > 0 && (
                        <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
                          <Text style={styles.unreadText}>{msg.unread}</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <ChartBarBig size={18} color={theme.colors.primary} />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Platform Breakdown
                  </Text>
                </View>
                <View style={[styles.platformCard, { backgroundColor: theme.colors.cardBackground }]}>
                  {platformBreakdown.map(item => {
                    const ServiceIcon = getServiceIcon(item.platform as ServiceType);
                    const maxCount = Math.max(...platformBreakdown.map(p => p.count), 1);
                    const percentage = (item.count / maxCount) * 100;
                    
                    return (
                      <View key={item.platform} style={styles.platformRow}>
                        <View style={styles.platformInfo}>
                          <View style={[styles.platformIcon, { backgroundColor: item.color + '20' }]}>
                            <ServiceIcon size={16} color={item.color} />
                          </View>
                          <View>
                            <Text style={[styles.platformName, { color: theme.colors.text }]}>
                              {item.platform}
                            </Text>
                            <Text style={[styles.platformStats, { color: theme.colors.secondaryText }]}>
                              {item.sent}↑ {item.received}↓
                            </Text>
                          </View>
                        </View>
                        <View style={styles.platformBar}>
                          <View style={styles.barBackground}>
                            <Animated.View 
                              style={[
                                styles.barFill, 
                                { 
                                  width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', `${percentage}%`],
                                  }),
                                  backgroundColor: item.color,
                                },
                              ]} 
                            />
                          </View>
                          <Text style={[styles.platformCount, { color: item.color }]}>
                            {item.count}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </>
          )}

          {activeSection === 'insights' && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Brain size={18} color="#8B5CF6" />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Deep Analysis
                  </Text>
                </View>
                
                <View style={[styles.analysisCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.analysisHeader}>
                    <Text style={[styles.analysisTitle, { color: theme.colors.text }]}>
                      Communication Patterns
                    </Text>
                    <TrendingUp size={16} color="#10B981" />
                  </View>
                  <Text style={[styles.analysisText, { color: theme.colors.secondaryText }]}>
                    Your most active communication hours are between 
                    <Text style={{ fontWeight: '600', color: theme.colors.text }}>9 AM - 11 AM</Text>
                    {' '}and{' '}
                    <Text style={{ fontWeight: '600', color: theme.colors.text }}>2 PM - 4 PM</Text>.
                    Consider scheduling important conversations during these peak times.
                  </Text>
                </View>

                <View style={[styles.analysisCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.analysisHeader}>
                    <Text style={[styles.analysisTitle, { color: theme.colors.text }]}>
                      Sentiment Overview
                    </Text>
                    <Heart size={16} color="#EF4444" />
                  </View>
                  <View style={styles.sentimentBars}>
                    <View style={styles.sentimentRow}>
                      <Text style={[styles.sentimentLabel, { color: theme.colors.secondaryText }]}>Positive</Text>
                      <View style={styles.sentimentBarBg}>
                        <View style={[styles.sentimentBarFill, { width: '68%', backgroundColor: '#10B981' }]} />
                      </View>
                      <Text style={[styles.sentimentValue, { color: '#10B981' }]}>68%</Text>
                    </View>
                    <View style={styles.sentimentRow}>
                      <Text style={[styles.sentimentLabel, { color: theme.colors.secondaryText }]}>Neutral</Text>
                      <View style={styles.sentimentBarBg}>
                        <View style={[styles.sentimentBarFill, { width: '24%', backgroundColor: '#6B7280' }]} />
                      </View>
                      <Text style={[styles.sentimentValue, { color: '#6B7280' }]}>24%</Text>
                    </View>
                    <View style={styles.sentimentRow}>
                      <Text style={[styles.sentimentLabel, { color: theme.colors.secondaryText }]}>Needs Attention</Text>
                      <View style={styles.sentimentBarBg}>
                        <View style={[styles.sentimentBarFill, { width: '8%', backgroundColor: '#EF4444' }]} />
                      </View>
                      <Text style={[styles.sentimentValue, { color: '#EF4444' }]}>8%</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.analysisCard, { backgroundColor: theme.colors.cardBackground }]}>
                  <View style={styles.analysisHeader}>
                    <Text style={[styles.analysisTitle, { color: theme.colors.text }]}>
                      Recommendations
                    </Text>
                    <Sparkles size={16} color="#F59E0B" />
                  </View>
                  <View style={styles.recommendationList}>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationDot, { backgroundColor: '#10B981' }]} />
                      <Text style={[styles.recommendationText, { color: theme.colors.secondaryText }]}>
                        Respond to Sarah message about the project deadline
                      </Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationDot, { backgroundColor: '#3B82F6' }]} />
                      <Text style={[styles.recommendationText, { color: theme.colors.secondaryText }]}>
                        Schedule a follow-up with the marketing team
                      </Text>
                    </View>
                    <View style={styles.recommendationItem}>
                      <View style={[styles.recommendationDot, { backgroundColor: '#F59E0B' }]} />
                      <Text style={[styles.recommendationText, { color: theme.colors.secondaryText }]}>
                        Review and archive 12 completed conversations
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          {activeSection === 'goals' && (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Target size={18} color="#8B5CF6" />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Action Items
                  </Text>
                </View>
                {upcomingTasks.map(task => {
                  const ServiceIcon = getServiceIcon(task.platform as ServiceType);
                  const serviceColor = getServiceColor(task.platform as ServiceType);
                  
                  return (
                    <View 
                      key={task.id}
                      style={[styles.taskCard, { backgroundColor: theme.colors.cardBackground }]}
                    >
                      <TouchableOpacity style={styles.taskCheckbox}>
                        {task.completed ? (
                          <CircleCheck size={24} color="#10B981" />
                        ) : (
                          <View style={[styles.checkbox, { borderColor: theme.colors.border }]} />
                        )}
                      </TouchableOpacity>
                      <View style={styles.taskContent}>
                        <Text style={[
                          styles.taskTitle, 
                          { color: theme.colors.text },
                          task.completed && styles.taskCompleted,
                        ]}>
                          {task.title}
                        </Text>
                        <View style={styles.taskMeta}>
                          <Clock size={12} color={theme.colors.secondaryText} />
                          <Text style={[styles.taskTime, { color: theme.colors.secondaryText }]}>
                            {task.time}
                          </Text>
                          <View style={[styles.taskPlatform, { backgroundColor: serviceColor + '20' }]}>
                            <ServiceIcon size={12} color={serviceColor} />
                          </View>
                          <View style={[
                            styles.priorityDot,
                            { backgroundColor: task.priority === 'high' ? '#EF4444' : task.priority === 'medium' ? '#F59E0B' : '#6B7280' },
                          ]} />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Trophy size={18} color="#F59E0B" />
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Achievements
                  </Text>
                </View>
                {achievements.map(achievement => (
                  <View 
                    key={achievement.id}
                    style={[styles.achievementCard, { backgroundColor: theme.colors.cardBackground }]}
                  >
                    <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '15' }]}>
                      {achievement.icon}
                      {achievement.isNew && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>NEW</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.achievementContent}>
                      <Text style={[styles.achievementTitle, { color: theme.colors.text }]}>
                        {achievement.title}
                      </Text>
                      <Text style={[styles.achievementDesc, { color: theme.colors.secondaryText }]}>
                        {achievement.description}
                      </Text>
                      <View style={styles.progressContainer}>
                        <View style={[styles.progressBg, { backgroundColor: achievement.color + '20' }]}>
                          <Animated.View 
                            style={[
                              styles.progressFill, 
                              { 
                                width: progressAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ['0%', `${achievement.progress}%`],
                                }),
                                backgroundColor: achievement.color,
                              },
                            ]} 
                          />
                        </View>
                        <Text style={[styles.progressText, { color: achievement.color }]}>
                          {achievement.progress}%
                        </Text>
                      </View>
                    </View>
                    {achievement.progress === 100 && (
                      <CircleCheck size={20} color="#10B981" />
                    )}
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text, marginBottom: 14 }]}>
                  Quick Actions
                </Text>
                <View style={styles.quickActionsGrid}>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#3B82F620' }]}>
                    <MessageCircle size={24} color="#3B82F6" />
                    <Text style={[styles.quickActionText, { color: '#3B82F6' }]}>
                      Reply All
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#10B98120' }]}>
                    <CircleCheck size={24} color="#10B981" />
                    <Text style={[styles.quickActionText, { color: '#10B981' }]}>
                      Mark Read
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#8B5CF620' }]}>
                    <Calendar size={24} color="#8B5CF6" />
                    <Text style={[styles.quickActionText, { color: '#8B5CF6' }]}>
                      Schedule
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#F59E0B20' }]}>
                    <Coffee size={24} color="#F59E0B" />
                    <Text style={[styles.quickActionText, { color: '#F59E0B' }]}>
                      Snooze
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}

          <View style={{ height: 40 }} />
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
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerActionButton: {
    padding: 8,
  },
  greetingSection: {
    marginBottom: 20,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  moodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  moodEmoji: {
    fontSize: 14,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  streakBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    padding: 10,
    gap: 8,
  },
  streakText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  aiBriefing: {
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  aiSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  aiControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    padding: 8,
  },
  playingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    gap: 10,
  },
  waveform: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  waveBar: {
    width: 3,
    borderRadius: 2,
  },
  playingTime: {
    fontSize: 12,
    fontWeight: '500',
  },
  aiSummary: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  aiActions: {
    flexDirection: 'row',
    gap: 10,
  },
  aiActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  aiActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 14,
  },
  insightIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  insightMetric: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  insightMetricText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  activityCard: {
    padding: 18,
    borderRadius: 16,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  activityValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  activityLabel: {
    fontSize: 12,
  },
  activityDivider: {
    width: 1,
    height: 50,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 12,
  },
  messageAvatar: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 14,
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
  onlineIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  messageName: {
    fontSize: 15,
    fontWeight: '600',
  },
  messageMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  messageTime: {
    fontSize: 12,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  priorityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  priorityTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#EF4444',
  },
  unreadBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 28,
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  platformCard: {
    padding: 18,
    borderRadius: 16,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 130,
    gap: 12,
  },
  platformIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformName: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  platformStats: {
    fontSize: 11,
    marginTop: 2,
  },
  platformBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
  },
  platformCount: {
    fontSize: 14,
    fontWeight: '700',
    width: 35,
    textAlign: 'right',
  },
  analysisCard: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },
  analysisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  analysisText: {
    fontSize: 14,
    lineHeight: 22,
  },
  sentimentBars: {
    gap: 12,
  },
  sentimentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sentimentLabel: {
    width: 100,
    fontSize: 13,
  },
  sentimentBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sentimentBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  sentimentValue: {
    width: 40,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
  },
  recommendationList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recommendationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 14,
  },
  taskCheckbox: {
    padding: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskTime: {
    fontSize: 12,
  },
  taskPlatform: {
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 14,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  newBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  newBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '700',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 12,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    width: 35,
    textAlign: 'right',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAction: {
    width: (width - 44) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 10,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
