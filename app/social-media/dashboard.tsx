 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import {
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Clock,
  Hash,
  Image,
  Video,
  ChartBar,
  ArrowUpRight,
  ArrowDownRight,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Sparkles,
  Target,
  Zap,
  ChevronRight,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface PlatformStat {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  followers: string;
  growth: string;
  engagement: string;
  posts: number;
  connected: boolean;
}

interface QuickMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

interface ScheduledPost {
  id: string;
  platform: string;
  platformIcon: React.ComponentType<any>;
  platformColor: string;
  content: string;
  scheduledTime: string;
  type: 'image' | 'video' | 'text' | 'story';
}

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  route: string;
}

export default function SocialMediaDashboard() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  const platforms: PlatformStat[] = [
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: '#E4405F',
      followers: '125.4K',
      growth: '+2.8%',
      engagement: '4.2%',
      posts: 156,
      connected: true,
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      color: '#1DA1F2',
      followers: '89.2K',
      growth: '+1.5%',
      engagement: '2.1%',
      posts: 342,
      connected: true,
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: '#1877F2',
      followers: '234.1K',
      growth: '+0.8%',
      engagement: '1.8%',
      posts: 89,
      connected: true,
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0A66C2',
      followers: '45.6K',
      growth: '+3.2%',
      engagement: '5.4%',
      posts: 67,
      connected: true,
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      color: '#FF0000',
      followers: '67.8K',
      growth: '+4.1%',
      engagement: '6.2%',
      posts: 45,
      connected: true,
    },
  ];

  const quickMetrics: QuickMetric[] = [
    {
      id: 'reach',
      title: 'Total Reach',
      value: '2.4M',
      change: '+18.5%',
      isPositive: true,
      icon: Eye,
      color: '#007AFF',
    },
    {
      id: 'engagement',
      title: 'Engagement',
      value: '186.2K',
      change: '+12.3%',
      isPositive: true,
      icon: Heart,
      color: '#FF2D55',
    },
    {
      id: 'followers',
      title: 'New Followers',
      value: '+8,432',
      change: '+24.1%',
      isPositive: true,
      icon: Users,
      color: '#34C759',
    },
    {
      id: 'posts',
      title: 'Posts Published',
      value: '47',
      change: '-5.2%',
      isPositive: false,
      icon: Share2,
      color: '#AF52DE',
    },
  ];

  const scheduledPosts: ScheduledPost[] = [
    {
      id: '1',
      platform: 'Instagram',
      platformIcon: Instagram,
      platformColor: '#E4405F',
      content: 'New product launch announcement with exclusive behind-the-scenes...',
      scheduledTime: 'Today, 2:00 PM',
      type: 'image',
    },
    {
      id: '2',
      platform: 'Twitter',
      platformIcon: Twitter,
      platformColor: '#1DA1F2',
      content: 'Join us for our weekly #TechTuesday thread discussing AI trends...',
      scheduledTime: 'Today, 4:30 PM',
      type: 'text',
    },
    {
      id: '3',
      platform: 'LinkedIn',
      platformIcon: Linkedin,
      platformColor: '#0A66C2',
      content: 'Excited to share our Q4 results and company milestones...',
      scheduledTime: 'Tomorrow, 9:00 AM',
      type: 'image',
    },
    {
      id: '4',
      platform: 'YouTube',
      platformIcon: Youtube,
      platformColor: '#FF0000',
      content: 'Weekly tutorial: Advanced marketing strategies for 2024...',
      scheduledTime: 'Tomorrow, 12:00 PM',
      type: 'video',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'schedule',
      title: 'Schedule Post',
      subtitle: 'Create and schedule content',
      icon: Calendar,
      color: '#007AFF',
      route: '/social-media/post-scheduler',
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      subtitle: 'Detailed performance metrics',
      icon: ChartBar,
      color: '#FF9500',
      route: '/social-media/analytics',
    },
    {
      id: 'ai-content',
      title: 'AI Content',
      subtitle: 'Generate with AI',
      icon: Sparkles,
      color: '#AF52DE',
      route: '/social-media/ai-content',
    },
    {
      id: 'inbox',
      title: 'Social Inbox',
      subtitle: 'Messages & mentions',
      icon: MessageCircle,
      color: '#34C759',
      route: '/social-media/social-inbox',
    },
  ];

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return Image;
      case 'video':
        return Video;
      case 'story':
        return Zap;
      default:
        return MessageCircle;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Social Media',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {(['7d', '30d', '90d'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodText,
                  { color: selectedPeriod === period ? '#FFF' : theme.colors.secondaryText },
                ]}
              >
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : '90 Days'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Metrics */}
        <View style={styles.metricsGrid}>
          {quickMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <View
                key={metric.id}
                style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <View style={styles.metricHeader}>
                  <View style={[styles.metricIcon, { backgroundColor: `${metric.color}15` }]}>
                    <IconComponent size={18} color={metric.color} />
                  </View>
                  <View style={[styles.changeContainer, { backgroundColor: metric.isPositive ? '#34C75915' : '#FF3B3015' }]}>
                    {metric.isPositive ? (
                      <ArrowUpRight size={12} color="#34C759" />
                    ) : (
                      <ArrowDownRight size={12} color="#FF3B30" />
                    )}
                    <Text style={[styles.changeText, { color: metric.isPositive ? '#34C759' : '#FF3B30' }]}>
                      {metric.change}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>{metric.title}</Text>
              </View>
            );
          })}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <TouchableOpacity
                  key={action.id}
                  style={[styles.actionCard, { backgroundColor: theme.colors.cardBackground }]}
                  onPress={() => router.push(action.route)}
                >
                  <View style={[styles.actionIcon, { backgroundColor: `${action.color}15` }]}>
                    <IconComponent size={22} color={action.color} />
                  </View>
                  <Text style={[styles.actionTitle, { color: theme.colors.text }]}>{action.title}</Text>
                  <Text style={[styles.actionSubtitle, { color: theme.colors.secondaryText }]}>{action.subtitle}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Platform Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Platform Overview</Text>
            <TouchableOpacity onPress={() => router.push('/social-media/multi-account')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>Manage</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {platforms.map((platform) => {
              const IconComponent = platform.icon;
              return (
                <View
                  key={platform.id}
                  style={[styles.platformCard, { backgroundColor: theme.colors.cardBackground }]}
                >
                  <View style={styles.platformHeader}>
                    <View style={[styles.platformIcon, { backgroundColor: `${platform.color}15` }]}>
                      <IconComponent size={20} color={platform.color} />
                    </View>
                    <View style={[styles.connectedBadge, { backgroundColor: '#34C75915' }]}>
                      <View style={styles.connectedDot} />
                      <Text style={styles.connectedText}>Connected</Text>
                    </View>
                  </View>
                  <Text style={[styles.platformName, { color: theme.colors.text }]}>{platform.name}</Text>
                  <Text style={[styles.followersCount, { color: theme.colors.text }]}>{platform.followers}</Text>
                  <Text style={[styles.followersLabel, { color: theme.colors.secondaryText }]}>Followers</Text>
                  <View style={styles.platformStats}>
                    <View style={styles.platformStat}>
                      <Text style={[styles.platformStatValue, { color: '#34C759' }]}>{platform.growth}</Text>
                      <Text style={[styles.platformStatLabel, { color: theme.colors.secondaryText }]}>Growth</Text>
                    </View>
                    <View style={[styles.platformStatDivider, { backgroundColor: theme.colors.border }]} />
                    <View style={styles.platformStat}>
                      <Text style={[styles.platformStatValue, { color: theme.colors.primary }]}>{platform.engagement}</Text>
                      <Text style={[styles.platformStatLabel, { color: theme.colors.secondaryText }]}>Engage</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Scheduled Posts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Scheduled Posts</Text>
            <TouchableOpacity onPress={() => router.push('/social-media/content-calendar')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>View Calendar</Text>
            </TouchableOpacity>
          </View>
          {scheduledPosts.map((post) => {
            const PlatformIcon = post.platformIcon;
            const TypeIcon = getPostTypeIcon(post.type);
            return (
              <TouchableOpacity
                key={post.id}
                style={[styles.postCard, { backgroundColor: theme.colors.cardBackground }]}
                onPress={() => router.push('/social-media/post-scheduler')}
              >
                <View style={[styles.postPlatformIcon, { backgroundColor: `${post.platformColor}15` }]}>
                  <PlatformIcon size={20} color={post.platformColor} />
                </View>
                <View style={styles.postContent}>
                  <View style={styles.postHeader}>
                    <Text style={[styles.postPlatform, { color: theme.colors.text }]}>{post.platform}</Text>
                    <View style={[styles.postType, { backgroundColor: `${theme.colors.primary}15` }]}>
                      <TypeIcon size={12} color={theme.colors.primary} />
                    </View>
                  </View>
                  <Text style={[styles.postText, { color: theme.colors.secondaryText }]} numberOfLines={2}>
                    {post.content}
                  </Text>
                  <View style={styles.postFooter}>
                    <Clock size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.postTime, { color: theme.colors.secondaryText }]}>{post.scheduledTime}</Text>
                  </View>
                </View>
                <ChevronRight size={18} color={theme.colors.secondaryText} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Performance Insights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>AI Insights</Text>
            <Sparkles size={18} color="#AF52DE" />
          </View>
          <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.insightIcon, { backgroundColor: '#FF950015' }]}>
              <Target size={20} color="#FF9500" />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Best Time to Post</Text>
              <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
                Your audience is most active between 2-4 PM on weekdays. Consider scheduling posts during this window.
              </Text>
            </View>
          </View>
          <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.insightIcon, { backgroundColor: '#34C75915' }]}>
              <TrendingUp size={20} color="#34C759" />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Trending Content</Text>
              <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
                Video content is getting 3x more engagement. Try creating more Reels and short-form videos.
              </Text>
            </View>
          </View>
          <View style={[styles.insightCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={[styles.insightIcon, { backgroundColor: '#007AFF15' }]}>
              <Hash size={20} color="#007AFF" />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>Hashtag Performance</Text>
              <Text style={[styles.insightText, { color: theme.colors.secondaryText }]}>
                #Innovation and #TechTrends are driving 45% more reach. Use them in your next posts.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  periodContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 2,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
  },
  platformCard: {
    width: 160,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  connectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34C759',
  },
  connectedText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#34C759',
  },
  platformName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  followersCount: {
    fontSize: 22,
    fontWeight: '700',
  },
  followersLabel: {
    fontSize: 12,
    marginBottom: 12,
  },
  platformStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformStat: {
    flex: 1,
    alignItems: 'center',
  },
  platformStatDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 8,
  },
  platformStatValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  platformStatLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  postCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  postPlatformIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postContent: {
    flex: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  postPlatform: {
    fontSize: 14,
    fontWeight: '600',
  },
  postType: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postTime: {
    fontSize: 12,
  },
  insightCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  insightIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
