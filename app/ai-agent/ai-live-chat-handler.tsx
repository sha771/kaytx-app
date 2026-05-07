import React, { useMemo, useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  Switch,
} from 'react-native';
import {
  MessageCircle,
  Headphones,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Settings,
  Lock,
  ChartBarBig,
  BarChart3,
  Zap,
  ChevronRight,
  Plus,
  Sparkles,
  Filter,
  Search,
  MoreHorizontal,
  Send,
  MessageSquare,
  Bot,
  User,
  Star,
  Activity,
  Globe,
  Smile,
  ThumbsUp,
  Eye,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { aiEmployees } from '@/constants/aiEmployees';
import { AgentShell } from '@/components/ai-agent/AgentShell';
import { trpc } from '@/lib/trpc';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function AILiveChatHandlerScreen() {
  const { theme } = useTheme();
  const agent = aiEmployees.find((e) => e.id === 'ai-live-chat-handler')!;

  const { data: subscription } = trpc.enterprise.getSubscription.useQuery();

  const [activeTab, setActiveTab] = useState('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const isPremiumLocked = useMemo(() => {
    return (
      agent.isPremium &&
      (subscription?.plan === 'free' || subscription?.plan === 'starter')
    );
  }, [agent.isPremium, subscription]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isPremiumLocked) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isPremiumLocked, fadeAnim]);

  // Live Chat Metrics
  const liveMetrics = {
    activeChats: 42,
    queuedVisitors: 18,
    avgResponseTime: '1.2s',
    satisfactionScore: '94.6%',
    resolvedToday: 287,
    avgChatDuration: '4m 32s',
  };

  // Active Chat Sessions
  const activeSessions = [
    {
      id: 'CH-001',
      visitor: 'Sarah Johnson',
      source: 'Website',
      duration: '3m 24s',
      status: 'active',
      sentiment: 'positive',
      topic: 'Product Inquiry',
    },
    {
      id: 'CH-002',
      visitor: 'Mike Chen',
      source: 'Mobile App',
      duration: '5m 12s',
      status: 'active',
      sentiment: 'neutral',
      topic: 'Billing Question',
    },
    {
      id: 'CH-003',
      visitor: 'Emily Davis',
      source: 'Website',
      duration: '2m 08s',
      status: 'waiting',
      sentiment: 'frustrated',
      topic: 'Technical Issue',
    },
    {
      id: 'CH-004',
      visitor: 'David Wilson',
      source: 'WhatsApp',
      duration: '7m 45s',
      status: 'active',
      sentiment: 'positive',
      topic: 'Order Status',
    },
  ];

  // Chat Queue
  const chatQueue = [
    { id: 'Q-001', visitor: 'Alex Turner', waitTime: '2m 15s', topic: 'Returns', priority: 'high' },
    { id: 'Q-002', visitor: 'Lisa Park', waitTime: '1m 42s', topic: 'Pricing', priority: 'medium' },
    { id: 'Q-003', visitor: 'James Lee', waitTime: '45s', topic: 'General', priority: 'low' },
  ];

  // Chat Templates
  const chatTemplates = [
    { id: 1, name: 'Welcome Greeting', usage: 1240, category: 'Opening', active: true },
    { id: 2, name: 'Order Status Check', usage: 890, category: 'Support', active: true },
    { id: 3, name: 'Billing Explanation', usage: 670, category: 'Billing', active: true },
    { id: 4, name: 'Product Recommendation', usage: 540, category: 'Sales', active: true },
    { id: 5, name: 'Closing & Survey', usage: 1120, category: 'Closing', active: true },
  ];

  // Channel Performance
  const channelPerformance = [
    { channel: 'Website', chats: 1240, satisfaction: '95.2%', avgTime: '3m 42s', icon: Globe },
    { channel: 'Mobile App', chats: 890, satisfaction: '93.8%', avgTime: '4m 18s', icon: MessageSquare },
    { channel: 'WhatsApp', chats: 560, satisfaction: '96.1%', avgTime: '5m 24s', icon: Send },
    { channel: 'Facebook', chats: 340, satisfaction: '91.4%', avgTime: '4m 56s', icon: MessageCircle },
  ];

  const renderLiveTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {/* Key Metrics Grid */}
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <MessageCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveMetrics.activeChats}</Text>
            <Text style={styles.metricLabel}>Active Chats</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+18%</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveMetrics.avgResponseTime}</Text>
            <Text style={styles.metricLabel}>Avg Response</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>-0.3s</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Star size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveMetrics.satisfactionScore}</Text>
            <Text style={styles.metricLabel}>Satisfaction</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+2.1%</Text>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.metricValue}>{liveMetrics.resolvedToday}</Text>
            <Text style={styles.metricLabel}>Resolved Today</Text>
            <View style={styles.metricChange}>
              <TrendingUp size={12} color="#34C759" />
              <Text style={styles.metricChangeText}>+24%</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Active Chat Sessions */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Headphones size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Active Sessions
              </Text>
            </View>
            <TouchableOpacity>
              <MoreHorizontal size={20} color={theme.colors.secondaryText} />
            </TouchableOpacity>
          </View>

          {activeSessions.map((session) => (
            <TouchableOpacity key={session.id} style={styles.sessionRow}>
              <View style={styles.sessionInfo}>
                <View style={[styles.sessionIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                  {session.sentiment === 'positive' ? (
                    <Smile size={18} color="#10B981" />
                  ) : session.sentiment === 'frustrated' ? (
                    <AlertCircle size={18} color="#EF4444" />
                  ) : (
                    <MessageCircle size={18} color={theme.colors.primary} />
                  )}
                </View>
                <View>
                  <Text style={[styles.sessionVisitor, { color: theme.colors.text }]}>
                    {session.visitor}
                  </Text>
                  <Text style={[styles.sessionTopic, { color: theme.colors.secondaryText }]}>
                    {session.topic} · {session.source}
                  </Text>
                </View>
              </View>
              <View style={styles.sessionMeta}>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: session.status === 'active' ? '#10B98120' : '#F59E0B20' },
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: session.status === 'active' ? '#10B981' : '#F59E0B' },
                  ]}>
                    {session.status === 'active' ? '● Active' : '○ Waiting'}
                  </Text>
                </View>
                <Text style={[styles.sessionDuration, { color: theme.colors.secondaryText }]}>
                  {session.duration}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chat Queue */}
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Users size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Queue ({chatQueue.length})
              </Text>
            </View>
            <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}>
              <Plus size={16} color="#fff" />
              <Text style={styles.createBtnText}>Assign All</Text>
            </TouchableOpacity>
          </View>

          {chatQueue.map((item) => (
            <View key={item.id} style={styles.queueRow}>
              <View style={styles.queueInfo}>
                <View style={[
                  styles.priorityDot,
                  { backgroundColor: item.priority === 'high' ? '#EF4444' : item.priority === 'medium' ? '#F59E0B' : '#10B981' },
                ]} />
                <View>
                  <Text style={[styles.queueVisitor, { color: theme.colors.text }]}>
                    {item.visitor}
                  </Text>
                  <Text style={[styles.queueTopic, { color: theme.colors.secondaryText }]}>
                    {item.topic}
                  </Text>
                </View>
              </View>
              <View style={styles.queueMeta}>
                <Text style={[styles.queueWait, { color: theme.colors.secondaryText }]}>
                  {item.waitTime}
                </Text>
                <ChevronRight size={18} color={theme.colors.secondaryText} />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {isPremiumLocked && (
        <Animated.View style={[styles.lockOverlay, { opacity: fadeAnim, backgroundColor: theme.colors.background + 'CC' }]}>
          <View style={[styles.lockCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.lockIconContainer, { backgroundColor: theme.colors.primary + '15' }]}>
              <Lock size={32} color={theme.colors.primary} />
            </View>
            <Text style={[styles.lockTitle, { color: theme.colors.text }]}>Premium Agent</Text>
            <Text style={[styles.lockDesc, { color: theme.colors.secondaryText }]}>
              The AI Live Chat Handler is part of our Enterprise suite. Upgrade your plan to activate this agent.
            </Text>
            <TouchableOpacity style={[styles.upgradeBtn, { backgroundColor: theme.colors.primary }]} onPress={() => router.push('/enterprise/billing')}>
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );

  const renderTemplatesTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <MessageSquare size={20} color="#fff" />
            <Text style={styles.metricValue}>5</Text>
            <Text style={styles.metricLabel}>Templates</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <Eye size={20} color="#fff" />
            <Text style={styles.metricValue}>4,460</Text>
            <Text style={styles.metricLabel}>Total Usage</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <ThumbsUp size={20} color="#fff" />
            <Text style={styles.metricValue}>89.2%</Text>
            <Text style={styles.metricLabel}>Effectiveness</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Zap size={20} color="#fff" />
            <Text style={styles.metricValue}>1.8s</Text>
            <Text style={styles.metricLabel}>Deploy Time</Text>
          </LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Sparkles size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Chat Templates
              </Text>
            </View>
            <TouchableOpacity style={[styles.createBtn, { backgroundColor: theme.colors.primary }]}>
              <Plus size={16} color="#fff" />
              <Text style={styles.createBtnText}>New Template</Text>
            </TouchableOpacity>
          </View>

          {chatTemplates.map((template) => (
            <View key={template.id} style={styles.templateRow}>
              <View style={styles.templateInfo}>
                <View style={[styles.templateIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                  <MessageSquare size={18} color={theme.colors.primary} />
                </View>
                <View>
                  <Text style={[styles.templateName, { color: theme.colors.text }]}>
                    {template.name}
                  </Text>
                  <Text style={[styles.templateCategory, { color: theme.colors.secondaryText }]}>
                    {template.category} · {template.usage} uses
                  </Text>
                </View>
              </View>
              <Switch value={template.active} onValueChange={() => {}} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderChannelsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={styles.analyticsHeader}>
          <View style={styles.searchContainer}>
            <Search size={18} color={theme.colors.secondaryText} />
            <TextInput
              style={[styles.searchInput, { color: theme.colors.text }]}
              placeholder="Search channels..."
              placeholderTextColor={theme.colors.secondaryText}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={[styles.filterBtn, { backgroundColor: theme.colors.cardBackground }]} onPress={() => setShowFilters(!showFilters)}>
            <Filter size={18} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.metricsGrid}>
          <LinearGradient colors={['#3B82F6', '#2563EB']} style={styles.metricCard}>
            <Globe size={20} color="#fff" />
            <Text style={styles.metricValue}>4</Text>
            <Text style={styles.metricLabel}>Active Channels</Text>
          </LinearGradient>

          <LinearGradient colors={['#10B981', '#059669']} style={styles.metricCard}>
            <BarChart3 size={20} color="#fff" />
            <Text style={styles.metricValue}>3,030</Text>
            <Text style={styles.metricLabel}>Total Chats</Text>
          </LinearGradient>

          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.metricCard}>
            <Star size={20} color="#fff" />
            <Text style={styles.metricValue}>94.1%</Text>
            <Text style={styles.metricLabel}>Avg Satisfaction</Text>
          </LinearGradient>

          <LinearGradient colors={['#F59E0B', '#D97706']} style={styles.metricCard}>
            <Clock size={20} color="#fff" />
            <Text style={styles.metricValue}>4m 30s</Text>
            <Text style={styles.metricLabel}>Avg Duration</Text>
          </LinearGradient>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Activity size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Channel Performance
              </Text>
            </View>
          </View>

          {channelPerformance.map((channel) => (
            <TouchableOpacity key={channel.channel} style={styles.channelRow}>
              <View style={styles.channelInfo}>
                <View style={[styles.channelIcon, { backgroundColor: theme.colors.primary + '15' }]}>
                  <channel.icon size={18} color={theme.colors.primary} />
                </View>
                <View>
                  <Text style={[styles.channelName, { color: theme.colors.text }]}>
                    {channel.channel}
                  </Text>
                  <Text style={[styles.channelStats, { color: theme.colors.secondaryText }]}>
                    {channel.chats} chats · {channel.avgTime} avg
                  </Text>
                </View>
              </View>
              <View style={styles.channelMeta}>
                <Text style={[styles.channelSatisfaction, { color: '#10B981' }]}>
                  {channel.satisfaction}
                </Text>
                <ChevronRight size={18} color={theme.colors.secondaryText} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.container}>
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Settings size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Chat Configuration
              </Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Auto-Response</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Automatically respond to common queries
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Sentiment Detection</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Detect customer sentiment in real-time
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Smart Routing</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Route chats to best available agent
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Proactive Engagement</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Initiate chat based on visitor behavior
              </Text>
            </View>
            <Switch value={false} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Chat Transcripts</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Auto-save all chat transcripts
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Post-Chat Survey</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Send satisfaction survey after each chat
              </Text>
            </View>
            <Switch value={true} onValueChange={() => {}} />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Bot size={20} color={theme.colors.primary} />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                AI Behavior
              </Text>
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Tone Style</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Professional and friendly
              </Text>
            </View>
            <TouchableOpacity style={[styles.tierConfigBtn, { backgroundColor: theme.colors.primary + '15' }]}>
              <Text style={[styles.tierConfigBtnText, { color: theme.colors.primary }]}>Configure</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.colors.text }]}>Escalation Threshold</Text>
              <Text style={[styles.settingDesc, { color: theme.colors.secondaryText }]}>
                Escalate when sentiment drops below 30%
              </Text>
            </View>
            <TouchableOpacity style={[styles.tierConfigBtn, { backgroundColor: theme.colors.primary + '15' }]}>
              <Text style={[styles.tierConfigBtnText, { color: theme.colors.primary }]}>Adjust</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  const customTabs = [
    { id: 'live', label: 'Live Chats', icon: MessageCircle, component: renderLiveTab() },
    { id: 'templates', label: 'Templates', icon: MessageSquare, component: renderTemplatesTab() },
    { id: 'channels', label: 'Channels', icon: Globe, component: renderChannelsTab() },
    { id: 'settings', label: 'Settings', icon: Settings, component: renderSettingsTab() },
  ];

  return <AgentShell agent={agent} customTabs={customTabs} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContent: { padding: 20 },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 25,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  metricValue: { fontSize: 22, fontWeight: '800', color: '#fff' },
  metricLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    textTransform: 'uppercase',
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  metricChangeText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  section: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  sessionInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  sessionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionVisitor: { fontSize: 15, fontWeight: '600' },
  sessionTopic: { fontSize: 12, marginTop: 2 },
  sessionMeta: { alignItems: 'flex-end', gap: 4 },
  sessionDuration: { fontSize: 12, fontWeight: '500' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
  queueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  queueInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  priorityDot: { width: 10, height: 10, borderRadius: 5 },
  queueVisitor: { fontSize: 14, fontWeight: '600' },
  queueTopic: { fontSize: 12, marginTop: 2 },
  queueMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  queueWait: { fontSize: 12, fontWeight: '500' },
  templateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  templateInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  templateIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateName: { fontSize: 15, fontWeight: '600' },
  templateCategory: { fontSize: 12, marginTop: 2 },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  channelInfo: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  channelIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelName: { fontSize: 15, fontWeight: '600' },
  channelStats: { fontSize: 12, marginTop: 2 },
  channelMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  channelSatisfaction: { fontSize: 14, fontWeight: '700' },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  createBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  analyticsHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  settingInfo: { flex: 1, marginRight: 16 },
  settingLabel: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  settingDesc: { fontSize: 13 },
  tierConfigBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  tierConfigBtnText: { fontSize: 13, fontWeight: '600' },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 100,
  },
  lockCard: {
    width: '100%',
    padding: 30,
    borderRadius: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  lockIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  lockTitle: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  lockDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  upgradeBtn: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upgradeBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});
