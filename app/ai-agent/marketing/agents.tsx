 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  Plus,
  Search,
  Filter,
  BarChart3,
  Megaphone,
  Palette,
  PenTool,
  Share2,
  MessageCircle,
  Video,
  Mail,
  Globe,
  Sparkles,
  Bot,
  Star,
  CheckCircle,
  Clock,
  MessageSquare,
  TrendingUp as Trending,
  Users,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Agent Types
interface SubAgent {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: any;
  status: 'active' | 'busy' | 'offline' | 'training';
  tasksCompleted: number;
  performance: number;
  capabilities: string[];
  lastActive: string;
  isOnline: boolean;
}

// Marketing Sub-Agents Data
const MARKETING_SUB_AGENTS: SubAgent[] = [
  {
    id: 'content-creator',
    name: 'Content Creator AI',
    title: 'Senior Content Strategist',
    description: 'Generates blog posts, articles, and long-form content optimized for SEO',
    icon: PenTool,
    status: 'active',
    tasksCompleted: 3421,
    performance: 92.8,
    capabilities: ['Blog Writing', 'SEO Optimization', 'Topic Research', 'Content Calendar'],
    lastActive: '3 min ago',
    isOnline: true,
  },
  {
    id: 'social-media',
    name: 'Social Media AI',
    title: 'Social Media Manager',
    description: 'Manages all social platforms, schedules posts, and engages with audience',
    icon: Share2,
    status: 'active',
    tasksCompleted: 8934,
    performance: 89.5,
    capabilities: ['Post Scheduling', 'Engagement', 'Hashtag Research', 'Trend Monitoring'],
    lastActive: 'Just now',
    isOnline: true,
  },
  {
    id: 'email-marketing',
    name: 'Email Marketing AI',
    title: 'Campaign Specialist',
    description: 'Creates email campaigns, segments lists, and optimizes open rates',
    icon: Mail,
    status: 'active',
    tasksCompleted: 4567,
    performance: 94.3,
    capabilities: ['Campaign Design', 'A/B Testing', 'List Segmentation', 'Automation'],
    lastActive: '5 min ago',
    isOnline: true,
  },
  {
    id: 'ad-manager',
    name: 'Ad Campaign AI',
    title: 'Paid Media Specialist',
    description: 'Manages PPC campaigns, optimizes bids, and tracks ROI across platforms',
    icon: Megaphone,
    status: 'active',
    tasksCompleted: 2134,
    performance: 91.7,
    capabilities: ['PPC Management', 'Bid Optimization', 'Budget Tracking', 'Retargeting'],
    lastActive: '8 min ago',
    isOnline: true,
  },
  {
    id: 'analytics',
    name: 'Marketing Analytics AI',
    title: 'Data & Insights Specialist',
    description: 'Analyzes marketing data, generates reports, and provides actionable insights',
    icon: BarChart3,
    status: 'active',
    tasksCompleted: 1876,
    performance: 96.2,
    capabilities: ['ROI Analysis', 'Attribution Modeling', 'Forecasting', 'Dashboards'],
    lastActive: '12 min ago',
    isOnline: true,
  },
  {
    id: 'design-assistant',
    name: 'Design AI',
    title: 'Creative Designer',
    description: 'Creates graphics, banners, and visual assets for marketing campaigns',
    icon: Palette,
    status: 'active',
    tasksCompleted: 5634,
    performance: 88.9,
    capabilities: ['Graphic Design', 'Brand Assets', 'Ad Creatives', 'Social Graphics'],
    lastActive: '15 min ago',
    isOnline: true,
  },
  {
    id: 'video-producer',
    name: 'Video AI',
    title: 'Video Production Specialist',
    description: 'Creates and edits marketing videos, reels, and promotional content',
    icon: Video,
    status: 'active',
    tasksCompleted: 1245,
    performance: 90.4,
    capabilities: ['Video Editing', 'Script Writing', 'Thumbnail Design', 'Publishing'],
    lastActive: '20 min ago',
    isOnline: true,
  },
  {
    id: 'seo-specialist',
    name: 'SEO AI',
    title: 'Search Optimization Specialist',
    description: 'Optimizes website content, tracks rankings, and improves organic traffic',
    icon: Globe,
    status: 'active',
    tasksCompleted: 3456,
    performance: 93.1,
    capabilities: ['Keyword Research', 'On-Page SEO', 'Link Building', 'Rank Tracking'],
    lastActive: '10 min ago',
    isOnline: true,
  },
  {
    id: 'influencer',
    name: 'Influencer AI',
    title: 'Partnership Manager',
    description: 'Identifies influencers, manages partnerships, and tracks collaboration ROI',
    icon: Users,
    status: 'active',
    tasksCompleted: 876,
    performance: 87.6,
    capabilities: ['Influencer Discovery', 'Outreach', 'Contract Management', 'ROI Tracking'],
    lastActive: '1 hour ago',
    isOnline: true,
  },
  {
    id: 'community',
    name: 'Community AI',
    title: 'Community Manager',
    description: 'Builds and engages with online communities, forums, and user groups',
    icon: MessageCircle,
    status: 'active',
    tasksCompleted: 2345,
    performance: 91.2,
    capabilities: ['Community Engagement', 'Moderation', 'Event Planning', 'Advocacy Programs'],
    lastActive: '25 min ago',
    isOnline: true,
  },
];

// Marketing Metrics
const MARKETING_METRICS = [
  { label: 'Total Reach', value: '2.4M', change: '+18% vs last month', positive: true },
  { label: 'Engagement Rate', value: '4.8%', change: '+0.6% vs last month', positive: true },
  { label: 'Lead Generation', value: '1,247', change: '+32% vs last month', positive: true },
  { label: 'Campaign ROI', value: '342%', change: '+12% vs last month', positive: true },
];

export default function MarketingAgentsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = MARKETING_SUB_AGENTS.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.capabilities.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeAgents = MARKETING_SUB_AGENTS.filter(a => a.isOnline).length;
  const totalTasks = MARKETING_SUB_AGENTS.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const avgPerformance = MARKETING_SUB_AGENTS.reduce((sum, a) => sum + a.performance, 0) / MARKETING_SUB_AGENTS.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'busy': return '#F59E0B';
      case 'offline': return '#6B7280';
      case 'training': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const renderAgentCard = (agent: SubAgent, index: number) => {
    const Icon = agent.icon;

    return (
      <Animated.View
        key={agent.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.agentCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.agentCardContent}
          onPress={() => router.push(`/ai-agent/marketing/${agent.id}`)}
        >
          <View style={styles.agentHeader}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: colors.tint + '15' }]}>
                <Icon size={24} color={colors.tint} />
              </View>
              <View
                style={[
                  styles.statusIndicator,
                  { backgroundColor: getStatusColor(agent.status) },
                ]}
              />
            </View>

            <View style={styles.agentInfo}>
              <Text style={[styles.agentName, { color: colors.text }]}>
                {agent.name}
              </Text>
              <Text style={[styles.agentTitle, { color: colors.icon }]}>
                {agent.title}
              </Text>
            </View>

            <View style={styles.performanceBadge}>
              <Star size={14} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.performanceText, { color: '#F59E0B' }]}>
                {agent.performance}%
              </Text>
            </View>
          </View>

          <Text style={[styles.agentDescription, { color: colors.icon }]}>
            {agent.description}
          </Text>

          <View style={styles.capabilitiesContainer}>
            {agent.capabilities.map((capability, idx) => (
              <View
                key={idx}
                style={[styles.capabilityBadge, { backgroundColor: colors.background }]}
              >
                <Text style={[styles.capabilityText, { color: colors.icon }]}>
                  {capability}
                </Text>
              </View>
            ))}
          </View>

          <View style={[styles.agentStats, { borderTopColor: colors.border }]}>
            <View style={styles.stat}>
              <CheckCircle size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.tasksCompleted.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Tasks</Text>
            </View>
            <View style={styles.stat}>
              <Clock size={14} color={colors.tint} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {agent.lastActive}
              </Text>
              <Text style={[styles.statLabel, { color: colors.icon }]}>Active</Text>
            </View>
            <TouchableOpacity
              style={[styles.chatButton, { backgroundColor: colors.tint }]}
              onPress={() => router.push(`/ai-agent/marketing/${agent.id}/chat`)}
            >
              <MessageSquare size={16} color="white" />
              <Text style={styles.chatButtonText}>Chat</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={28} color={colors.text} />
        </TouchableOpacity>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Marketing & Growth AI
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
            {MARKETING_SUB_AGENTS.length} sub-agents available
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.tint }]}
          onPress={() => router.push('/ai-agent/marketing/create')}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main Agent Card */}
      <Animated.View entering={FadeIn} style={[styles.mainAgentCard, { backgroundColor: colors.tint }]}>
        <View style={styles.mainAgentHeader}>
          <View style={styles.mainAgentIcon}>
            <Trending size={32} color="white" />
          </View>
          <View style={styles.mainAgentInfo}>
            <Text style={styles.mainAgentName}>Marketing & Growth AI</Text>
            <Text style={styles.mainAgentTitle}>Chief Marketing Officer AI</Text>
          </View>
          <View style={styles.mainAgentBadge}>
            <Sparkles size={16} color={colors.tint} />
            <Text style={[styles.mainAgentBadgeText, { color: colors.tint }]}>Lead</Text>
          </View>
        </View>

        <View style={styles.mainAgentStats}>
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{activeAgents}</Text>
            <Text style={styles.mainStatLabel}>Active Agents</Text>
          </View>
          <View style={styles.mainStatDivider} />
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{(totalTasks / 1000).toFixed(1)}K</Text>
            <Text style={styles.mainStatLabel}>Tasks Done</Text>
          </View>
          <View style={styles.mainStatDivider} />
          <View style={styles.mainStat}>
            <Text style={styles.mainStatValue}>{avgPerformance.toFixed(1)}%</Text>
            <Text style={styles.mainStatLabel}>Avg Performance</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.chatWithLeadButton}
          onPress={() => router.push('/ai-agent/marketing/main/chat')}
        >
          <MessageSquare size={18} color={colors.tint} />
          <Text style={[styles.chatWithLeadText, { color: colors.tint }]}>
            Chat with Marketing Lead
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Marketing Metrics */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsContainer}
      >
        {MARKETING_METRICS.map((metric, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(index * 50)}
            style={[styles.metricCard, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricLabel, { color: colors.icon }]}>{metric.label}</Text>
            <Text
              style={[
                styles.metricChange,
                { color: metric.positive ? '#10B981' : '#EF4444' },
              ]}
            >
              {metric.change}
            </Text>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search marketing agents, capabilities..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Filter size={20} color={colors.icon} />
        </TouchableOpacity>
      </View>

      {/* Sub-Agents List */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Marketing Sub-Agents
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.icon }]}>
            {filteredAgents.length} agents
          </Text>
        </View>

        {filteredAgents.map((agent, index) => renderAgentCard(agent, index))}

        {filteredAgents.length === 0 && (
          <View style={styles.emptyState}>
            <Bot size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No agents found
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Try adjusting your search
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainAgentCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  mainAgentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainAgentIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainAgentInfo: {
    flex: 1,
    marginLeft: 16,
  },
  mainAgentName: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  mainAgentTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  mainAgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  mainAgentBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  mainAgentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  mainStat: {
    flex: 1,
    alignItems: 'center',
  },
  mainStatValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  mainStatLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  mainStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  chatWithLeadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 16,
  },
  chatWithLeadText: {
    fontSize: 15,
    fontWeight: '600',
  },
  metricsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  metricCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 11,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  agentCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  agentCardContent: {
    padding: 16,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'white',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 2,
  },
  agentTitle: {
    fontSize: 13,
  },
  performanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  performanceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  capabilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  capabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  capabilityText: {
    fontSize: 12,
  },
  agentStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  chatButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
