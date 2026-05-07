import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Switch,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import {
  X,
  Star,
  Bell,
  BellOff,
  Clock,
  Crown,
  Shield,
  TriangleAlert,
  MessageCircle,
  ChevronRight,
  Settings,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Circle,
  Brain,
  Zap,
  TrendingUp,
  EyeOff,
  VolumeX,
  Timer,
  Target,
  ChartBarBig,
  Layers,
  CircleCheck,
  Plus,
  Trash2,
  PenLine,
  RefreshCw,
  Award,
  Flame,
  Heart,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { useMessaging } from '@/providers/MessagingProvider';
import { getServiceIcon, getServiceColor } from '@/utils/services';
import { ServiceType } from '@/types/messaging';

const { width } = Dimensions.get('window');

interface PriorityContact {
  id: string;
  name: string;
  avatar: string;
  platform: string;
  priorityLevel: 'vip' | 'high' | 'medium' | 'low';
  responseTime: string;
  unreadCount: number;
  lastActive: string;
  aiScore: number;
  isOnline: boolean;
  sentimentTrend: 'positive' | 'neutral' | 'negative';
  engagementRate: number;
  totalMessages: number;
}

interface PriorityRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  enabled: boolean;
  icon: React.ReactNode;
  color: string;
}

interface PrioritySettings {
  vipNotifications: boolean;
  urgentKeywords: string[];
  autoSnooze: boolean;
  focusMode: boolean;
  smartGrouping: boolean;
  aiPrioritization: boolean;
  quietHours: { enabled: boolean; start: string; end: string };
  doNotDisturb: boolean;
  vipBypass: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function PriorityMessagingModal({ visible, onClose }: Props) {
  const { theme } = useTheme();
  const { conversations } = useMessaging();
  
  const [activeTab, setActiveTab] = useState<'inbox' | 'vip' | 'rules' | 'analytics' | 'settings'>('inbox');
  const [newKeyword, setNewKeyword] = useState('');
  const [showAddKeyword, setShowAddKeyword] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'day' | 'week' | 'month'>('week');
  
  const [settings, setSettings] = useState<PrioritySettings>({
    vipNotifications: true,
    urgentKeywords: ['urgent', 'asap', 'important', 'deadline', 'critical', 'emergency'],
    autoSnooze: false,
    focusMode: false,
    smartGrouping: true,
    aiPrioritization: true,
    quietHours: { enabled: false, start: '22:00', end: '07:00' },
    doNotDisturb: false,
    vipBypass: true,
    soundEnabled: true,
    vibrationEnabled: true,
  });

  const [priorityRules, setPriorityRules] = useState<PriorityRule[]>([
    {
      id: '1',
      name: 'VIP Auto-Priority',
      condition: 'Contact is marked as VIP',
      action: 'Always show at top, bypass DND',
      enabled: true,
      icon: <Crown size={18} color="#F59E0B" />,
      color: '#F59E0B',
    },
    {
      id: '2',
      name: 'Urgent Keywords',
      condition: 'Message contains urgent keywords',
      action: 'Mark as high priority, send alert',
      enabled: true,
      icon: <TriangleAlert size={18} color="#EF4444" />,
      color: '#EF4444',
    },
    {
      id: '3',
      name: 'Quick Response Needed',
      condition: 'No reply in 2+ hours from important contact',
      action: 'Escalate to high priority',
      enabled: true,
      icon: <Timer size={18} color="#3B82F6" />,
      color: '#3B82F6',
    },
    {
      id: '4',
      name: 'Low Engagement Filter',
      condition: 'Contact with < 5% engagement rate',
      action: 'Auto-snooze notifications',
      enabled: false,
      icon: <EyeOff size={18} color="#6B7280" />,
      color: '#6B7280',
    },
  ]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const priorityContacts = useMemo((): PriorityContact[] => {
    return conversations.map((conv, index) => ({
      id: conv.id,
      name: conv.name,
      avatar: conv.avatar,
      platform: conv.service,
      priorityLevel: index < 2 ? 'vip' : index < 5 ? 'high' : index < 8 ? 'medium' : 'low',
      responseTime: `${Math.floor(Math.random() * 45) + 5}m`,
      unreadCount: conv.unreadCount,
      lastActive: conv.timestamp,
      aiScore: Math.floor(Math.random() * 30) + 70,
      isOnline: conv.isOnline || false,
      sentimentTrend: Math.random() > 0.6 ? 'positive' : Math.random() > 0.3 ? 'neutral' : 'negative',
      engagementRate: Math.floor(Math.random() * 60) + 40,
      totalMessages: Math.floor(Math.random() * 500) + 50,
    }));
  }, [conversations]);

  const priorityInbox = useMemo(() => {
    const vip = priorityContacts.filter(c => c.priorityLevel === 'vip');
    const high = priorityContacts.filter(c => c.priorityLevel === 'high');
    const medium = priorityContacts.filter(c => c.priorityLevel === 'medium');
    const low = priorityContacts.filter(c => c.priorityLevel === 'low');
    
    return { vip, high, medium, low };
  }, [priorityContacts]);

  const urgentMessages = useMemo(() => {
    return conversations
      .filter(c => c.unreadCount > 0)
      .flatMap(c => c.messages.filter(m => !m.isOwn && !m.isRead))
      .filter(m => settings.urgentKeywords.some(k => m.text.toLowerCase().includes(k)))
      .slice(0, 5);
  }, [conversations, settings.urgentKeywords]);

  const analyticsData = useMemo(() => ({
    totalPrioritized: priorityContacts.filter(c => c.priorityLevel !== 'low').length,
    vipCount: priorityInbox.vip.length,
    avgResponseTime: '18m',
    urgentHandled: 24,
    aiAccuracy: 94,
    savedTime: '2.5h',
    topPlatform: 'WhatsApp',
    peakHours: '9AM - 11AM',
  }), [priorityContacts, priorityInbox]);

  const getPriorityColor = (level: string) => {
    switch (level) {
      case 'vip': return '#F59E0B';
      case 'high': return '#EF4444';
      case 'medium': return '#3B82F6';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getPriorityIcon = (level: string) => {
    switch (level) {
      case 'vip': return Crown;
      case 'high': return Flame;
      case 'medium': return ArrowUp;
      case 'low': return ArrowDown;
      default: return Circle;
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Heart size={12} color="#10B981" />;
      case 'negative': return <TriangleAlert size={12} color="#EF4444" />;
      default: return <Circle size={12} color="#6B7280" />;
    }
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !settings.urgentKeywords.includes(newKeyword.trim().toLowerCase())) {
      setSettings(prev => ({
        ...prev,
        urgentKeywords: [...prev.urgentKeywords, newKeyword.trim().toLowerCase()],
      }));
      setNewKeyword('');
      setShowAddKeyword(false);
    }
  };

  const toggleRule = (ruleId: string) => {
    setPriorityRules(prev => 
      prev.map(rule => rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)
    );
  };

  const renderPriorityContact = ({ item }: { item: PriorityContact }) => {
    const ServiceIcon = getServiceIcon(item.platform as ServiceType);
    const serviceColor = getServiceColor(item.platform as ServiceType);
    const PriorityIcon = getPriorityIcon(item.priorityLevel);
    const priorityColor = getPriorityColor(item.priorityLevel);

    return (
      <TouchableOpacity 
        style={[styles.contactCard, { backgroundColor: theme.colors.cardBackground }]}
        activeOpacity={0.7}
      >
        <View style={styles.contactAvatar}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={[styles.platformBadge, { backgroundColor: serviceColor }]}>
            <ServiceIcon size={10} color="#FFF" />
          </View>
          {item.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        
        <View style={styles.contactInfo}>
          <View style={styles.contactHeader}>
            <Text style={[styles.contactName, { color: theme.colors.text }]} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
              <PriorityIcon size={12} color={priorityColor} />
              <Text style={[styles.priorityText, { color: priorityColor }]}>
                {item.priorityLevel.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <View style={styles.contactMeta}>
            <View style={styles.metaItem}>
              <Clock size={12} color={theme.colors.secondaryText} />
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {item.responseTime}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Sparkles size={12} color={theme.colors.primary} />
              <Text style={[styles.metaText, { color: theme.colors.primary }]}>
                {item.aiScore}%
              </Text>
            </View>
            <View style={styles.metaItem}>
              {getSentimentIcon(item.sentimentTrend)}
              <Text style={[styles.metaText, { color: theme.colors.secondaryText }]}>
                {item.engagementRate}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contactActions}>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.unreadText}>{item.unreadCount}</Text>
            </View>
          )}
          <ChevronRight size={20} color={theme.colors.secondaryText} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderPrioritySection = (title: string, contacts: PriorityContact[], icon: React.ReactNode, color: string) => {
    if (contacts.length === 0) return null;
    
    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.sectionIconBg, { backgroundColor: color + '15' }]}>
            {icon}
          </View>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{title}</Text>
          <View style={[styles.countBadge, { backgroundColor: color + '20' }]}>
            <Text style={[styles.countText, { color }]}>
              {contacts.length}
            </Text>
          </View>
        </View>
        <FlatList
          data={contacts}
          renderItem={renderPriorityContact}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  };

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
              <View style={[styles.titleIcon, { backgroundColor: '#F59E0B15' }]}>
                <Star size={22} color="#F59E0B" />
              </View>
              <View>
                <Text style={[styles.title, { color: theme.colors.text }]}>Priority Messaging</Text>
                <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
                  AI-powered message prioritization
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <View style={[styles.aiBanner, { backgroundColor: theme.colors.primary + '10' }]}>
            <View style={styles.aiIconContainer}>
              <Brain size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.aiContent}>
              <Text style={[styles.aiTitle, { color: theme.colors.primary }]}>
                AI Priority Engine Active
              </Text>
              <Text style={[styles.aiText, { color: theme.colors.secondaryText }]}>
                {analyticsData.vipCount} VIP • {urgentMessages.length} urgent • {analyticsData.aiAccuracy}% accuracy
              </Text>
            </View>
            <TouchableOpacity style={[styles.aiAction, { backgroundColor: theme.colors.primary }]}>
              <RefreshCw size={16} color="#FFF" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            <View style={styles.tabs}>
              {(['inbox', 'vip', 'rules', 'analytics', 'settings'] as const).map(tab => {
                const tabIcons = {
                  inbox: MessageCircle,
                  vip: Crown,
                  rules: Layers,
                  analytics: ChartBarBig,
                  settings: Settings,
                };
                const TabIcon = tabIcons[tab];
                const tabColors = {
                  inbox: theme.colors.primary,
                  vip: '#F59E0B',
                  rules: '#8B5CF6',
                  analytics: '#10B981',
                  settings: '#6B7280',
                };
                
                return (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.tab,
                      activeTab === tab && { backgroundColor: tabColors[tab] + '15' },
                    ]}
                    onPress={() => setActiveTab(tab)}
                  >
                    <TabIcon size={18} color={activeTab === tab ? tabColors[tab] : theme.colors.secondaryText} />
                    <Text style={[
                      styles.tabText,
                      { color: activeTab === tab ? tabColors[tab] : theme.colors.secondaryText },
                    ]}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {activeTab === 'inbox' && (
            <>
              {urgentMessages.length > 0 && (
                <View style={[styles.urgentAlert, { backgroundColor: '#FEE2E2' }]}>
                  <View style={styles.urgentHeader}>
                    <View style={[styles.urgentIconBg, { backgroundColor: '#EF4444' }]}>
                      <TriangleAlert size={18} color="#FFF" />
                    </View>
                    <View style={styles.urgentContent}>
                      <Text style={styles.urgentTitle}>Urgent Messages</Text>
                      <Text style={styles.urgentDescription}>
                        {urgentMessages.length} messages require immediate attention
                      </Text>
                    </View>
                    <View style={[styles.urgentCount, { backgroundColor: '#EF4444' }]}>
                      <Text style={styles.urgentCountText}>{urgentMessages.length}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={[styles.urgentAction, { backgroundColor: '#EF4444' }]}>
                    <Text style={styles.urgentActionText}>View All Urgent</Text>
                    <ChevronRight size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
              )}

              {renderPrioritySection(
                'VIP Contacts',
                priorityInbox.vip,
                <Crown size={18} color="#F59E0B" />,
                '#F59E0B'
              )}
              {renderPrioritySection(
                'High Priority',
                priorityInbox.high,
                <Flame size={18} color="#EF4444" />,
                '#EF4444'
              )}
              {renderPrioritySection(
                'Medium Priority',
                priorityInbox.medium,
                <ArrowUp size={18} color="#3B82F6" />,
                '#3B82F6'
              )}
              {renderPrioritySection(
                'Low Priority',
                priorityInbox.low,
                <ArrowDown size={18} color="#6B7280" />,
                '#6B7280'
              )}
            </>
          )}

          {activeTab === 'vip' && (
            <View style={styles.vipTab}>
              <View style={styles.vipStatsGrid}>
                <View style={[styles.vipStatCard, { backgroundColor: '#FEF3C715' }]}>
                  <Crown size={28} color="#F59E0B" />
                  <Text style={[styles.vipStatValue, { color: theme.colors.text }]}>
                    {priorityInbox.vip.length}
                  </Text>
                  <Text style={[styles.vipStatLabel, { color: theme.colors.secondaryText }]}>
                    VIP Contacts
                  </Text>
                </View>
                <View style={[styles.vipStatCard, { backgroundColor: theme.colors.primary + '10' }]}>
                  <MessageCircle size={28} color={theme.colors.primary} />
                  <Text style={[styles.vipStatValue, { color: theme.colors.text }]}>
                    {priorityInbox.vip.reduce((acc, c) => acc + c.unreadCount, 0)}
                  </Text>
                  <Text style={[styles.vipStatLabel, { color: theme.colors.secondaryText }]}>
                    Unread
                  </Text>
                </View>
                <View style={[styles.vipStatCard, { backgroundColor: '#10B98115' }]}>
                  <Clock size={28} color="#10B981" />
                  <Text style={[styles.vipStatValue, { color: theme.colors.text }]}>
                    12m
                  </Text>
                  <Text style={[styles.vipStatLabel, { color: theme.colors.secondaryText }]}>
                    Avg Response
                  </Text>
                </View>
                <View style={[styles.vipStatCard, { backgroundColor: '#8B5CF615' }]}>
                  <Award size={28} color="#8B5CF6" />
                  <Text style={[styles.vipStatValue, { color: theme.colors.text }]}>
                    98%
                  </Text>
                  <Text style={[styles.vipStatLabel, { color: theme.colors.secondaryText }]}>
                    Response Rate
                  </Text>
                </View>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionIconBg, { backgroundColor: '#F59E0B15' }]}>
                    <Crown size={18} color="#F59E0B" />
                  </View>
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Manage VIP Contacts
                  </Text>
                  <TouchableOpacity style={[styles.addVipButton, { backgroundColor: '#F59E0B' }]}>
                    <Plus size={16} color="#FFF" />
                  </TouchableOpacity>
                </View>
                
                {priorityContacts.slice(0, 10).map(contact => {
                  const isVip = contact.priorityLevel === 'vip';
                  return (
                    <View 
                      key={contact.id}
                      style={[styles.vipItem, { backgroundColor: theme.colors.cardBackground }]}
                    >
                      <Image source={{ uri: contact.avatar }} style={styles.vipAvatar} />
                      <View style={styles.vipInfo}>
                        <Text style={[styles.vipName, { color: theme.colors.text }]}>
                          {contact.name}
                        </Text>
                        <View style={styles.vipMetaRow}>
                          <Text style={[styles.vipPlatform, { color: theme.colors.secondaryText }]}>
                            {contact.platform}
                          </Text>
                          <Text style={[styles.vipDot, { color: theme.colors.secondaryText }]}>•</Text>
                          <Text style={[styles.vipMessages, { color: theme.colors.secondaryText }]}>
                            {contact.totalMessages} messages
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.vipToggle,
                          isVip 
                            ? { backgroundColor: '#F59E0B' }
                            : { backgroundColor: theme.colors.cardBackground, borderWidth: 2, borderColor: theme.colors.border },
                        ]}
                      >
                        {isVip ? (
                          <Crown size={16} color="#FFF" />
                        ) : (
                          <Star size={16} color={theme.colors.secondaryText} />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {activeTab === 'rules' && (
            <View style={styles.rulesTab}>
              <View style={[styles.rulesInfo, { backgroundColor: theme.colors.primary + '10' }]}>
                <Sparkles size={20} color={theme.colors.primary} />
                <Text style={[styles.rulesInfoText, { color: theme.colors.secondaryText }]}>
                  AI-powered rules automatically prioritize your messages based on patterns and importance.
                </Text>
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={[styles.sectionIconBg, { backgroundColor: '#8B5CF615' }]}>
                    <Layers size={18} color="#8B5CF6" />
                  </View>
                  <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Priority Rules
                  </Text>
                  <TouchableOpacity style={[styles.addRuleButton, { borderColor: theme.colors.primary }]}>
                    <Plus size={16} color={theme.colors.primary} />
                    <Text style={[styles.addRuleText, { color: theme.colors.primary }]}>Add Rule</Text>
                  </TouchableOpacity>
                </View>

                {priorityRules.map(rule => (
                  <View 
                    key={rule.id}
                    style={[
                      styles.ruleCard, 
                      { backgroundColor: theme.colors.cardBackground },
                      !rule.enabled && { opacity: 0.6 },
                    ]}
                  >
                    <View style={styles.ruleHeader}>
                      <View style={[styles.ruleIconBg, { backgroundColor: rule.color + '15' }]}>
                        {rule.icon}
                      </View>
                      <View style={styles.ruleInfo}>
                        <Text style={[styles.ruleName, { color: theme.colors.text }]}>
                          {rule.name}
                        </Text>
                        <Text style={[styles.ruleCondition, { color: theme.colors.secondaryText }]}>
                          {rule.condition}
                        </Text>
                      </View>
                      <Switch
                        value={rule.enabled}
                        onValueChange={() => toggleRule(rule.id)}
                        trackColor={{ false: theme.colors.border, true: rule.color + '50' }}
                        thumbColor={rule.enabled ? rule.color : '#FFF'}
                      />
                    </View>
                    <View style={[styles.ruleAction, { backgroundColor: rule.color + '10' }]}>
                      <Zap size={14} color={rule.color} />
                      <Text style={[styles.ruleActionText, { color: rule.color }]}>
                        {rule.action}
                      </Text>
                    </View>
                    <View style={styles.ruleFooter}>
                      <TouchableOpacity style={styles.ruleEditButton}>
                        <PenLine size={14} color={theme.colors.secondaryText} />
                        <Text style={[styles.ruleEditText, { color: theme.colors.secondaryText }]}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.ruleDeleteButton}>
                        <Trash2 size={14} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'analytics' && (
            <View style={styles.analyticsTab}>
              <View style={styles.timeframeSelector}>
                {(['day', 'week', 'month'] as const).map(tf => (
                  <TouchableOpacity
                    key={tf}
                    style={[
                      styles.timeframeButton,
                      selectedTimeframe === tf && { backgroundColor: theme.colors.primary },
                    ]}
                    onPress={() => setSelectedTimeframe(tf)}
                  >
                    <Text style={[
                      styles.timeframeText,
                      { color: selectedTimeframe === tf ? '#FFF' : theme.colors.text },
                    ]}>
                      {tf.charAt(0).toUpperCase() + tf.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.analyticsGrid}>
                <View style={[styles.analyticsCard, { backgroundColor: '#3B82F615' }]}>
                  <View style={styles.analyticsCardHeader}>
                    <Target size={20} color="#3B82F6" />
                    <TrendingUp size={14} color="#10B981" />
                  </View>
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>
                    {analyticsData.totalPrioritized}
                  </Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>
                    Prioritized Contacts
                  </Text>
                </View>

                <View style={[styles.analyticsCard, { backgroundColor: '#10B98115' }]}>
                  <View style={styles.analyticsCardHeader}>
                    <Clock size={20} color="#10B981" />
                    <Text style={[styles.analyticsTrend, { color: '#10B981' }]}>-23%</Text>
                  </View>
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>
                    {analyticsData.avgResponseTime}
                  </Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>
                    Avg Response Time
                  </Text>
                </View>

                <View style={[styles.analyticsCard, { backgroundColor: '#F59E0B15' }]}>
                  <View style={styles.analyticsCardHeader}>
                    <Zap size={20} color="#F59E0B" />
                    <Text style={[styles.analyticsTrend, { color: '#10B981' }]}>+12</Text>
                  </View>
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>
                    {analyticsData.urgentHandled}
                  </Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>
                    Urgent Handled
                  </Text>
                </View>

                <View style={[styles.analyticsCard, { backgroundColor: '#8B5CF615' }]}>
                  <View style={styles.analyticsCardHeader}>
                    <Brain size={20} color="#8B5CF6" />
                    <CircleCheck size={14} color="#10B981" />
                  </View>
                  <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>
                    {analyticsData.aiAccuracy}%
                  </Text>
                  <Text style={[styles.analyticsLabel, { color: theme.colors.secondaryText }]}>
                    AI Accuracy
                  </Text>
                </View>
              </View>

              <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.insightHeader}>
                  <Sparkles size={18} color={theme.colors.primary} />
                  <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                    AI Insights
                  </Text>
                </View>
                <View style={styles.insightList}>
                  <View style={styles.insightItem}>
                    <View style={[styles.insightDot, { backgroundColor: '#10B981' }]} />
                    <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
                      You saved <Text style={{ fontWeight: '600', color: theme.colors.text }}>{analyticsData.savedTime}</Text> this week with smart prioritization
                    </Text>
                  </View>
                  <View style={styles.insightItem}>
                    <View style={[styles.insightDot, { backgroundColor: '#3B82F6' }]} />
                    <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
                      Peak activity hours: <Text style={{ fontWeight: '600', color: theme.colors.text }}>{analyticsData.peakHours}</Text>
                    </Text>
                  </View>
                  <View style={styles.insightItem}>
                    <View style={[styles.insightDot, { backgroundColor: '#F59E0B' }]} />
                    <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
                      Most active platform: <Text style={{ fontWeight: '600', color: theme.colors.text }}>{analyticsData.topPlatform}</Text>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {activeTab === 'settings' && (
            <View style={styles.settingsTab}>
              <View style={[styles.settingsSection, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>
                  Notifications
                </Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Bell size={20} color={theme.colors.primary} />
                    <View style={styles.settingText}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        VIP Notifications
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                        Always notify for VIP contacts
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.vipNotifications}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, vipNotifications: value }))}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary + '50' }}
                    thumbColor={settings.vipNotifications ? theme.colors.primary : '#FFF'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <VolumeX size={20} color="#6B7280" />
                    <View style={styles.settingText}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        Do Not Disturb
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                        Silence all non-VIP notifications
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.doNotDisturb}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, doNotDisturb: value }))}
                    trackColor={{ false: theme.colors.border, true: '#EF4444' + '50' }}
                    thumbColor={settings.doNotDisturb ? '#EF4444' : '#FFF'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <BellOff size={20} color="#6B7280" />
                    <View style={styles.settingText}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        Auto Snooze Low Priority
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                        Automatically snooze low priority messages
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.autoSnooze}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, autoSnooze: value }))}
                    trackColor={{ false: theme.colors.border, true: theme.colors.primary + '50' }}
                    thumbColor={settings.autoSnooze ? theme.colors.primary : '#FFF'}
                  />
                </View>
              </View>

              <View style={[styles.settingsSection, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>
                  AI Features
                </Text>
                
                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Brain size={20} color="#8B5CF6" />
                    <View style={styles.settingText}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        AI Prioritization
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                        Let AI automatically prioritize messages
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.aiPrioritization}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, aiPrioritization: value }))}
                    trackColor={{ false: theme.colors.border, true: '#8B5CF6' + '50' }}
                    thumbColor={settings.aiPrioritization ? '#8B5CF6' : '#FFF'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Layers size={20} color="#10B981" />
                    <View style={styles.settingText}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        Smart Grouping
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                        Group similar messages together
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.smartGrouping}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, smartGrouping: value }))}
                    trackColor={{ false: theme.colors.border, true: '#10B981' + '50' }}
                    thumbColor={settings.smartGrouping ? '#10B981' : '#FFF'}
                  />
                </View>

                <View style={styles.settingItem}>
                  <View style={styles.settingInfo}>
                    <Shield size={20} color="#3B82F6" />
                    <View style={styles.settingText}>
                      <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
                        Focus Mode
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.secondaryText }]}>
                        Only show VIP messages
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={settings.focusMode}
                    onValueChange={(value) => setSettings(prev => ({ ...prev, focusMode: value }))}
                    trackColor={{ false: theme.colors.border, true: '#3B82F6' + '50' }}
                    thumbColor={settings.focusMode ? '#3B82F6' : '#FFF'}
                  />
                </View>
              </View>

              <View style={[styles.settingsSection, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.settingsSectionTitle, { color: theme.colors.text }]}>
                  Urgent Keywords
                </Text>
                <Text style={[styles.keywordsDescription, { color: theme.colors.secondaryText }]}>
                  Messages with these keywords are automatically marked as urgent
                </Text>
                <View style={styles.keywordsList}>
                  {settings.urgentKeywords.map((keyword, index) => (
                    <View key={index} style={[styles.keywordChip, { backgroundColor: '#FEE2E2' }]}>
                      <Text style={styles.keywordText}>{keyword}</Text>
                      <TouchableOpacity
                        onPress={() => setSettings(prev => ({
                          ...prev,
                          urgentKeywords: prev.urgentKeywords.filter((_, i) => i !== index),
                        }))}
                      >
                        <X size={14} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  {showAddKeyword ? (
                    <View style={[styles.addKeywordInput, { borderColor: theme.colors.primary }]}>
                      <TextInput
                        style={[styles.keywordInput, { color: theme.colors.text }]}
                        placeholder="New keyword"
                        placeholderTextColor={theme.colors.secondaryText}
                        value={newKeyword}
                        onChangeText={setNewKeyword}
                        onSubmitEditing={addKeyword}
                        autoFocus
                      />
                      <TouchableOpacity onPress={addKeyword}>
                        <CircleCheck size={18} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.addKeyword, { borderColor: theme.colors.border }]}
                      onPress={() => setShowAddKeyword(true)}
                    >
                      <Plus size={14} color={theme.colors.primary} />
                      <Text style={[styles.addKeywordText, { color: theme.colors.primary }]}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
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
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    gap: 12,
  },
  aiIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiContent: {
    flex: 1,
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  aiText: {
    fontSize: 12,
  },
  aiAction: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    paddingHorizontal: 16,
  },
  tabs: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  urgentAlert: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  urgentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  urgentIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentContent: {
    flex: 1,
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#991B1B',
    marginBottom: 2,
  },
  urgentDescription: {
    fontSize: 13,
    color: '#DC2626',
  },
  urgentCount: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  urgentCountText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  urgentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 6,
  },
  urgentActionText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  sectionIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    flex: 1,
  },
  countBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 13,
    fontWeight: '700',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 16,
    gap: 12,
  },
  contactAvatar: {
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
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
  contactInfo: {
    flex: 1,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
  },
  contactMeta: {
    flexDirection: 'row',
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  unreadBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 26,
    alignItems: 'center',
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  vipTab: {
    flex: 1,
  },
  vipStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  vipStatCard: {
    width: (width - 44) / 2,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  vipStatValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  vipStatLabel: {
    fontSize: 12,
  },
  addVipButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    gap: 12,
  },
  vipAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
  },
  vipInfo: {
    flex: 1,
  },
  vipName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  vipMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vipPlatform: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  vipDot: {
    marginHorizontal: 6,
  },
  vipMessages: {
    fontSize: 13,
  },
  vipToggle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rulesTab: {
    flex: 1,
  },
  rulesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    gap: 12,
    marginBottom: 20,
  },
  rulesInfoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
  addRuleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    gap: 6,
  },
  addRuleText: {
    fontSize: 13,
    fontWeight: '600',
  },
  ruleCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  ruleIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ruleInfo: {
    flex: 1,
  },
  ruleName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  ruleCondition: {
    fontSize: 12,
  },
  ruleAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    gap: 8,
    marginBottom: 12,
  },
  ruleActionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  ruleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ruleEditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ruleEditText: {
    fontSize: 13,
  },
  ruleDeleteButton: {
    padding: 8,
  },
  analyticsTab: {
    flex: 1,
  },
  timeframeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  timeframeButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  analyticsCard: {
    width: (width - 44) / 2,
    padding: 18,
    borderRadius: 16,
    gap: 8,
  },
  analyticsCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analyticsTrend: {
    fontSize: 12,
    fontWeight: '600',
  },
  analyticsValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  analyticsLabel: {
    fontSize: 12,
  },
  insightCard: {
    padding: 18,
    borderRadius: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  insightList: {
    gap: 14,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  insightDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  settingsTab: {
    flex: 1,
    gap: 16,
  },
  settingsSection: {
    padding: 16,
    borderRadius: 16,
  },
  settingsSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 14,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
  },
  keywordsDescription: {
    fontSize: 13,
    marginBottom: 14,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  keywordText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '500',
  },
  addKeyword: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    gap: 6,
  },
  addKeywordText: {
    fontSize: 13,
    fontWeight: '500',
  },
  addKeywordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    gap: 8,
  },
  keywordInput: {
    fontSize: 13,
    minWidth: 80,
  },
});
