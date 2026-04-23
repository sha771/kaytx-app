 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Clock,
  Zap,
  Award,
  ArrowUpRight,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';

export default function EngagementHub() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const [selectedMetric, setSelectedMetric] = useState<'likes' | 'comments' | 'shares' | 'saves'>('likes');

  const engagementMetrics = [
    { id: 'likes', label: 'Likes', value: '186.2K', change: '+18.2%', icon: Heart, color: '#FF2D55' },
    { id: 'comments', label: 'Comments', value: '24.5K', change: '+12.8%', icon: MessageCircle, color: '#007AFF' },
    { id: 'shares', label: 'Shares', value: '15.3K', change: '+22.1%', icon: Share2, color: '#34C759' },
    { id: 'saves', label: 'Saves', value: '8.7K', change: '+31.4%', icon: Bookmark, color: '#FF9500' },
  ];

  const topEngagers = [
    { id: '1', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', interactions: 156, badge: '🏆' },
    { id: '2', name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', interactions: 134, badge: '🥈' },
    { id: '3', name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', interactions: 121, badge: '🥉' },
    { id: '4', name: 'Alex Turner', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', interactions: 98 },
    { id: '5', name: 'Jessica Park', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', interactions: 87 },
  ];

  const engagementTasks = [
    { id: '1', title: 'Reply to 12 comments', platform: 'Instagram', priority: 'high', dueIn: '2 hours' },
    { id: '2', title: 'Respond to 5 DMs', platform: 'Twitter', priority: 'medium', dueIn: '4 hours' },
    { id: '3', title: 'Thank new followers', platform: 'LinkedIn', priority: 'low', dueIn: 'Today' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Engagement Hub',
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
        {/* Engagement Metrics */}
        <View style={styles.metricsRow}>
          {engagementMetrics.map((metric) => {
            const IconComponent = metric.icon;
            const isSelected = selectedMetric === metric.id;
            return (
              <TouchableOpacity
                key={metric.id}
                style={[
                  styles.metricCard,
                  { backgroundColor: theme.colors.cardBackground },
                  isSelected && { borderColor: metric.color, borderWidth: 2 },
                ]}
                onPress={() => setSelectedMetric(metric.id as any)}
              >
                <View style={[styles.metricIcon, { backgroundColor: `${metric.color}15` }]}>
                  <IconComponent size={18} color={metric.color} />
                </View>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>{metric.value}</Text>
                <Text style={[styles.metricLabel, { color: theme.colors.secondaryText }]}>{metric.label}</Text>
                <View style={styles.metricChange}>
                  <ArrowUpRight size={10} color="#34C759" />
                  <Text style={styles.changeText}>{metric.change}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Engagement Rate */}
        <View style={[styles.rateCard, { backgroundColor: theme.colors.cardBackground }]}>
          <View style={styles.rateHeader}>
            <View style={[styles.rateIcon, { backgroundColor: '#AF52DE15' }]}>
              <TrendingUp size={22} color="#AF52DE" />
            </View>
            <View style={styles.rateInfo}>
              <Text style={[styles.rateLabel, { color: theme.colors.secondaryText }]}>Overall Engagement Rate</Text>
              <Text style={[styles.rateValue, { color: theme.colors.text }]}>4.8%</Text>
            </View>
            <View style={[styles.rateBadge, { backgroundColor: '#34C75915' }]}>
              <Text style={styles.rateBadgeText}>+0.6% from last month</Text>
            </View>
          </View>
          <View style={styles.rateBar}>
            <View style={[styles.rateProgress, { width: '48%', backgroundColor: '#AF52DE' }]} />
          </View>
          <Text style={[styles.rateNote, { color: theme.colors.secondaryText }]}>
            Industry average: 3.2%
          </Text>
        </View>

        {/* Top Engagers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Top Engagers</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>View All</Text>
            </TouchableOpacity>
          </View>
          {topEngagers.map((user, index) => (
            <View key={user.id} style={[styles.engagerCard, { backgroundColor: theme.colors.cardBackground }]}>
              <Text style={[styles.engagerRank, { color: theme.colors.secondaryText }]}>{index + 1}</Text>
              <Image source={{ uri: user.avatar }} style={styles.engagerAvatar} />
              <View style={styles.engagerInfo}>
                <View style={styles.engagerNameRow}>
                  <Text style={[styles.engagerName, { color: theme.colors.text }]}>{user.name}</Text>
                  {user.badge && <Text style={styles.engagerBadge}>{user.badge}</Text>}
                </View>
                <Text style={[styles.engagerInteractions, { color: theme.colors.secondaryText }]}>
                  {user.interactions} interactions this month
                </Text>
              </View>
              <TouchableOpacity style={[styles.followButton, { backgroundColor: `${theme.colors.primary}15` }]}>
                <Text style={[styles.followButtonText, { color: theme.colors.primary }]}>Thank</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Engagement Tasks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Pending Tasks</Text>
            <View style={[styles.taskCount, { backgroundColor: '#FF3B3015' }]}>
              <Text style={styles.taskCountText}>{engagementTasks.length}</Text>
            </View>
          </View>
          {engagementTasks.map((task) => (
            <TouchableOpacity key={task.id} style={[styles.taskCard, { backgroundColor: theme.colors.cardBackground }]}>
              <View style={[
                styles.taskPriority,
                { backgroundColor: task.priority === 'high' ? '#FF3B30' : task.priority === 'medium' ? '#FF9500' : '#34C759' }
              ]} />
              <View style={styles.taskContent}>
                <Text style={[styles.taskTitle, { color: theme.colors.text }]}>{task.title}</Text>
                <View style={styles.taskMeta}>
                  <Text style={[styles.taskPlatform, { color: theme.colors.secondaryText }]}>{task.platform}</Text>
                  <View style={styles.taskDue}>
                    <Clock size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.taskDueText, { color: theme.colors.secondaryText }]}>{task.dueIn}</Text>
                  </View>
                </View>
              </View>
              <Zap size={18} color={theme.colors.primary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <View style={[styles.tipsCard, { backgroundColor: '#007AFF10', borderColor: '#007AFF' }]}>
          <Award size={20} color="#007AFF" />
          <View style={styles.tipsContent}>
            <Text style={[styles.tipsTitle, { color: theme.colors.text }]}>Engagement Tips</Text>
            <Text style={[styles.tipsText, { color: theme.colors.secondaryText }]}>
              Respond to comments within 1 hour for 3x higher engagement. Ask questions in your posts to boost interactions.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 16 },
  metricsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  metricCard: { width: '48%', padding: 14, borderRadius: 14, alignItems: 'center' },
  metricIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  metricValue: { fontSize: 20, fontWeight: '700', marginBottom: 2 },
  metricLabel: { fontSize: 12, marginBottom: 6 },
  metricChange: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  changeText: { fontSize: 11, color: '#34C759', fontWeight: '600' },
  rateCard: { padding: 16, borderRadius: 16, marginBottom: 24 },
  rateHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  rateIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rateInfo: { flex: 1 },
  rateLabel: { fontSize: 12, marginBottom: 2 },
  rateValue: { fontSize: 28, fontWeight: '700' },
  rateBadge: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  rateBadgeText: { fontSize: 11, color: '#34C759', fontWeight: '600' },
  rateBar: { height: 8, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 4, marginBottom: 8 },
  rateProgress: { height: '100%', borderRadius: 4 },
  rateNote: { fontSize: 12 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  taskCount: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  taskCountText: { fontSize: 13, fontWeight: '700', color: '#FF3B30' },
  engagerCard: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 14, marginBottom: 10 },
  engagerRank: { width: 24, fontSize: 14, fontWeight: '600' },
  engagerAvatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  engagerInfo: { flex: 1 },
  engagerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  engagerName: { fontSize: 15, fontWeight: '600' },
  engagerBadge: { fontSize: 14 },
  engagerInteractions: { fontSize: 12, marginTop: 2 },
  followButton: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  followButtonText: { fontSize: 13, fontWeight: '600' },
  taskCard: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 14, marginBottom: 10 },
  taskPriority: { width: 4, height: 36, borderRadius: 2, marginRight: 12 },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '600', marginBottom: 4 },
  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  taskPlatform: { fontSize: 12 },
  taskDue: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  taskDueText: { fontSize: 12 },
  tipsCard: { flexDirection: 'row', padding: 16, borderRadius: 14, borderLeftWidth: 4, gap: 12, marginBottom: 20 },
  tipsContent: { flex: 1 },
  tipsTitle: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  tipsText: { fontSize: 13, lineHeight: 18 },
});
