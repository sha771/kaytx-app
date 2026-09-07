import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye,
  BarChart3,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  Zap,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface MetricData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  color: string;
}

interface PlatformPerformance {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  followers: string;
  engagement: string;
  reach: string;
  impressions: string;
  growth: string;
}

interface TopPost {
  id: string;
  platform: string;
  platformIcon: React.ComponentType<any>;
  platformColor: string;
  content: string;
  likes: string;
  comments: string;
  shares: string;
  reach: string;
}


export default function SocialAnalytics() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const overviewMetrics: MetricData[] = [
    { id: 'reach', title: 'Total Reach', value: '4.2M', change: '+28.5%', isPositive: true, icon: Eye, color: '#007AFF' },
    { id: 'engagement', title: 'Engagement', value: '324K', change: '+18.2%', isPositive: true, icon: Heart, color: '#FF2D55' },
    { id: 'followers', title: 'Total Followers', value: '562K', change: '+12.4%', isPositive: true, icon: Users, color: '#34C759' },
    { id: 'posts', title: 'Posts Published', value: '156', change: '+8.1%', isPositive: true, icon: Share2, color: '#AF52DE' },
    { id: 'impressions', title: 'Impressions', value: '8.7M', change: '+32.1%', isPositive: true, icon: BarChart3, color: '#FF9500' },
    { id: 'clicks', title: 'Link Clicks', value: '45.2K', change: '-2.3%', isPositive: false, icon: Target, color: '#5AC8FA' },
  ];

  const platformPerformance: PlatformPerformance[] = [
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', followers: '125.4K', engagement: '4.8%', reach: '1.2M', impressions: '3.4M', growth: '+3.2%' },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: '#1DA1F2', followers: '89.2K', engagement: '2.4%', reach: '890K', impressions: '2.1M', growth: '+1.8%' },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', followers: '234.1K', engagement: '1.9%', reach: '1.5M', impressions: '2.8M', growth: '+0.9%' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0A66C2', followers: '45.6K', engagement: '5.2%', reach: '420K', impressions: '680K', growth: '+4.1%' },
    { id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000', followers: '67.8K', engagement: '6.8%', reach: '780K', impressions: '1.2M', growth: '+5.6%' },
  ];

  const topPosts: TopPost[] = [
    { id: '1', platform: 'Instagram', platformIcon: Instagram, platformColor: '#E4405F', content: 'Our biggest product launch yet! ?? Thank you for 1M...', likes: '45.2K', comments: '3.2K', shares: '8.4K', reach: '890K' },
    { id: '2', platform: 'LinkedIn', platformIcon: Linkedin, platformColor: '#0A66C2', content: 'Excited to announce our partnership with industry leaders...', likes: '12.4K', comments: '1.8K', shares: '4.2K', reach: '320K' },
    { id: '3', platform: 'Twitter', platformIcon: Twitter, platformColor: '#1DA1F2', content: 'Thread: 10 lessons we learned building a $10M business...', likes: '28.1K', comments: '2.1K', shares: '12.3K', reach: '1.2M' },
    { id: '4', platform: 'YouTube', platformIcon: Youtube, platformColor: '#FF0000', content: 'How We Grew Our Startup to 1M Users in 6 Months', likes: '18.7K', comments: '4.5K', shares: '2.8K', reach: '450K' },
  ];

  const engagementByType = [
    { type: 'Likes', value: 68, color: '#FF2D55' },
    { type: 'Comments', value: 18, color: '#007AFF' },
    { type: 'Shares', value: 10, color: '#34C759' },
    { type: 'Saves', value: 4, color: '#FF9500' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Social Analytics',
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodContainer}>
          {(['7d', '30d', '90d', '1y'] as const).map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[styles.periodText, { color: selectedPeriod === period ? '#FFF' : theme.colors.secondaryText }]}>
                {period === '7d' ? '7 Days' : period === '30d' ? '30 Days' : period === '90d' ? '90 Days' : '1 Year'}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Overview Metrics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Overview</Text>
          <View style={styles.metricsGrid}>
            {overviewMetrics.map((metric) => {
              const IconComponent = metric.icon;
              return (
                <View key={metric.id} style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}>
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
        </View>

        {/* Engagement Breakdown */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Engagement Breakdown</Text>
          <View style={[styles.engagementCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.engagementBars}>
              {engagementByType.map((item) => (
                <View key={item.type} style={styles.engagementItem}>
                  <View style={styles.engagementBarContainer}>
                    <View style={[styles.engagementBar, { height: `${item.value}%`, backgroundColor: item.color }]} />
                  </View>
                  <Text style={[styles.engagementValue, { color: theme.colors.text }]}>{item.value}%</Text>
                  <Text style={[styles.engagementLabel, { color: theme.colors.secondaryText }]}>{item.type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Platform Performance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Platform Performance</Text>
          {platformPerformance.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <View key={platform.id} style={[styles.platformCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.platformHeader}>
                  <View style={[styles.platformIcon, { backgroundColor: `${platform.color}15` }]}>
                    <IconComponent size={22} color={platform.color} />
                  </View>
                  <View style={styles.platformInfo}>
                    <Text style={[styles.platformName, { color: theme.colors.text }]}>{platform.name}</Text>
                    <Text style={[styles.platformFollowers, { color: theme.colors.secondaryText }]}>
                      {platform.followers} followers
                    </Text>
                  </View>
                  <View style={[styles.growthBadge, { backgroundColor: '#34C75915' }]}>
                    <TrendingUp size={12} color="#34C759" />
                    <Text style={styles.growthText}>{platform.growth}</Text>
                  </View>
                </View>
                <View style={styles.platformStats}>
                  <View style={styles.platformStat}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>{platform.engagement}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Engagement</Text>
                  </View>
                  <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
                  <View style={styles.platformStat}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>{platform.reach}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Reach</Text>
                  </View>
                  <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
                  <View style={styles.platformStat}>
                    <Text style={[styles.statValue, { color: theme.colors.text }]}>{platform.impressions}</Text>
                    <Text style={[styles.statLabel, { color: theme.colors.secondaryText }]}>Impressions</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Top Performing Posts */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Performing Posts</Text>
          {topPosts.map((post, index) => {
            const PlatformIcon = post.platformIcon;
            return (
              <View key={post.id} style={[styles.postCard, { backgroundColor: theme.colors.cardBackground }]}>
                <View style={styles.postHeader}>
                  <View style={styles.postRank}>
                    <Text style={[styles.rankText, { color: theme.colors.primary }]}>#{index + 1}</Text>
                  </View>
                  <View style={[styles.postPlatformIcon, { backgroundColor: `${post.platformColor}15` }]}>
                    <PlatformIcon size={16} color={post.platformColor} />
                  </View>
                  <Text style={[styles.postPlatform, { color: theme.colors.secondaryText }]}>{post.platform}</Text>
                </View>
                <Text style={[styles.postContent, { color: theme.colors.text }]} numberOfLines={2}>
                  {post.content}
                </Text>
                <View style={styles.postStats}>
                  <View style={styles.postStat}>
                    <Heart size={14} color="#FF2D55" />
                    <Text style={[styles.postStatText, { color: theme.colors.secondaryText }]}>{post.likes}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <MessageCircle size={14} color="#007AFF" />
                    <Text style={[styles.postStatText, { color: theme.colors.secondaryText }]}>{post.comments}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <Share2 size={14} color="#34C759" />
                    <Text style={[styles.postStatText, { color: theme.colors.secondaryText }]}>{post.shares}</Text>
                  </View>
                  <View style={styles.postStat}>
                    <Eye size={14} color="#FF9500" />
                    <Text style={[styles.postStatText, { color: theme.colors.secondaryText }]}>{post.reach}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Best Posting Times */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Best Posting Times</Text>
          <View style={[styles.timesCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.timeRow}>
              <View style={[styles.timeIcon, { backgroundColor: '#FF950015' }]}>
                <Clock size={18} color="#FF9500" />
              </View>
              <View style={styles.timeInfo}>
                <Text style={[styles.timeLabel, { color: theme.colors.text }]}>Weekdays</Text>
                <Text style={[styles.timeValue, { color: theme.colors.secondaryText }]}>2:00 PM - 4:00 PM EST</Text>
              </View>
              <View style={[styles.engagementBadge, { backgroundColor: '#34C75915' }]}>
                <Zap size={12} color="#34C759" />
                <Text style={styles.engagementBadgeText}>High</Text>
              </View>
            </View>
            <View style={[styles.timeDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.timeRow}>
              <View style={[styles.timeIcon, { backgroundColor: '#007AFF15' }]}>
                <Clock size={18} color="#007AFF" />
              </View>
              <View style={styles.timeInfo}>
                <Text style={[styles.timeLabel, { color: theme.colors.text }]}>Weekends</Text>
                <Text style={[styles.timeValue, { color: theme.colors.secondaryText }]}>10:00 AM - 12:00 PM EST</Text>
              </View>
              <View style={[styles.engagementBadge, { backgroundColor: '#FF950015' }]}>
                <Zap size={12} color="#FF9500" />
                <Text style={[styles.engagementBadgeTextMed]}>Medium</Text>
              </View>
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
    marginBottom: 20,
  },
  periodButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
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
    fontSize: 11,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  engagementCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  engagementBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
  },
  engagementItem: {
    alignItems: 'center',
    flex: 1,
  },
  engagementBarContainer: {
    height: 100,
    width: 32,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  engagementBar: {
    width: '100%',
    borderRadius: 6,
  },
  engagementValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  engagementLabel: {
    fontSize: 11,
  },
  platformCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  platformIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  platformFollowers: {
    fontSize: 13,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  growthText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#34C759',
  },
  platformStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformStat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
  },
  postCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postRank: {
    marginRight: 10,
  },
  rankText: {
    fontSize: 16,
    fontWeight: '700',
  },
  postPlatformIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  postPlatform: {
    fontSize: 13,
    fontWeight: '500',
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    gap: 20,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  postStatText: {
    fontSize: 13,
    fontWeight: '500',
  },
  timesCard: {
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  timeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  timeInfo: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  timeValue: {
    fontSize: 13,
  },
  timeDivider: {
    height: 1,
    marginHorizontal: 14,
  },
  engagementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  engagementBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
  },
  engagementBadgeTextMed: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF9500',
  },
});
