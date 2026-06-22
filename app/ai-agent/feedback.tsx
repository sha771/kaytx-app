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
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  ListFilter,
  Search,
  EllipsisVertical,
  CircleCheck,
  CircleAlert,
  Clock,
  User,
  TrendingUp,
  ChartBarBig,
  Flag,
  Lightbulb,
  ChevronRight,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface FeedbackItem {
  id: string;
  type: 'rating' | 'comment' | 'suggestion' | 'bug';
  rating?: number;
  content: string;
  author: string;
  authorType: 'user' | 'admin';
  agent: string;
  timestamp: string;
  status: 'new' | 'reviewed' | 'resolved' | 'in_progress';
  category: string;
  helpful: boolean;
}

interface FeedbackStats {
  totalFeedback: number;
  avgRating: number;
  responseRate: number;
  pendingIssues: number;
}

// Mock Data
const FEEDBACK_DATA: FeedbackItem[] = [
  {
    id: '1',
    type: 'rating',
    rating: 5,
    content: 'Support AI was incredibly helpful and resolved my issue quickly!',
    author: 'Sarah Chen',
    authorType: 'user',
    agent: 'Support AI',
    timestamp: '2 hours ago',
    status: 'reviewed',
    category: 'Support',
    helpful: true,
  },
  {
    id: '2',
    type: 'comment',
    content: 'Sales AI misunderstood my pricing question. It quoted the wrong plan.',
    author: 'Mike Johnson',
    authorType: 'user',
    agent: 'Sales AI',
    timestamp: '4 hours ago',
    status: 'new',
    category: 'Accuracy',
    helpful: false,
  },
  {
    id: '3',
    type: 'suggestion',
    content: 'It would be great if HR AI could handle vacation request approvals automatically.',
    author: 'Emily Davis',
    authorType: 'user',
    agent: 'HR AI',
    timestamp: '1 day ago',
    status: 'in_progress',
    category: 'Feature Request',
    helpful: true,
  },
  {
    id: '4',
    type: 'bug',
    content: 'Marketing AI keeps repeating the same response when asked about campaign metrics.',
    author: 'Alex Kim',
    authorType: 'user',
    agent: 'Marketing AI',
    timestamp: '2 days ago',
    status: 'resolved',
    category: 'Bug Report',
    helpful: true,
  },
  {
    id: '5',
    type: 'rating',
    rating: 4,
    content: 'Good response but took a bit longer than expected.',
    author: 'Jordan Taylor',
    authorType: 'user',
    agent: 'Accounting AI',
    timestamp: '3 days ago',
    status: 'reviewed',
    category: 'Performance',
    helpful: true,
  },
];

const TYPE_CONFIG = {
  rating: { icon: Star, color: '#F59E0B', label: 'Rating' },
  comment: { icon: MessageSquare, color: '#3B82F6', label: 'Comment' },
  suggestion: { icon: Lightbulb, color: '#10B981', label: 'Suggestion' },
  bug: { icon: CircleAlert, color: '#EF4444', label: 'Bug Report' },


};
const STATUS_COLORS = {
  new: '#3B82F6',
  reviewed: '#8B5CF6',
  'in_progress': '#F59E0B',
  resolved: '#10B981',
};

export default function AgentFeedbackScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'all' | 'ratings' | 'issues' | 'suggestions'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredFeedback = FEEDBACK_DATA.filter(item => {
    if (activeTab === 'ratings') return item.type === 'rating';
    if (activeTab === 'issues') return item.type === 'bug' || (item.type === 'comment' && !item.helpful);
    if (activeTab === 'suggestions') return item.type === 'suggestion';
    return true;
  }).filter(item =>
    item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.agent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalFeedback: FEEDBACK_DATA.length,
    avgRating: 4.2,
    responseRate: 87,
    pendingIssues: FEEDBACK_DATA.filter(f => f.status === 'new' || f.status === 'in_progress').length,
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            color={star <= rating ? '#F59E0B' : '#E5E7EB'}
            fill={star <= rating ? '#F59E0B' : 'transparent'}
          />
        ))}
      </View>
    );
  };

  const renderFeedbackCard = (feedback: FeedbackItem, index: number) => {
    const config = TYPE_CONFIG[feedback.type];
    const Icon = config.icon;
    const isExpanded = selectedFeedback?.id === feedback.id;

    return (
      <Animated.View
        key={feedback.id}
        entering={FadeInUp.delay(index * 50)}
        style={[styles.feedbackCard, { backgroundColor: colors.card }]}
      >
        <TouchableOpacity
          style={styles.feedbackHeader}
          onPress={() => setSelectedFeedback(isExpanded ? null : feedback)}
        >
          <View style={[styles.typeIcon, { backgroundColor: config.color + '15' }]}>
            <Icon size={18} color={config.color} />
          </View>
          <View style={styles.feedbackInfo}>
            <View style={styles.feedbackMeta}>
              <Text style={[styles.feedbackType, { color: config.color }]}>
                {config.label}
              </Text>
              <Text style={[styles.feedbackTime, { color: colors.icon }]}>
                {feedback.timestamp}
              </Text>
            </View>
            <Text style={[styles.feedbackAgent, { color: colors.text }]}>
              {feedback.agent}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[feedback.status] + '15' }]}>
            <Text style={[styles.statusText, { color: STATUS_COLORS[feedback.status] }]}>
              {feedback.status.replace('_', ' ')}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.feedbackBody}>
          {feedback.rating && (
            <View style={styles.ratingRow}>
              {renderStars(feedback.rating)}
              <Text style={[styles.ratingText, { color: colors.text }]}>
                {feedback.rating}/5
              </Text>
            </View>
          )}
          <Text style={[styles.feedbackContent, { color: colors.text }]}>
            {feedback.content}
          </Text>
          <View style={styles.feedbackAuthor}>
            <User size={12} color={colors.icon} />
            <Text style={[styles.authorText, { color: colors.icon }]}>
              {feedback.author}
            </Text>
          </View>
        </View>

        {isExpanded && (
          <Animated.View entering={FadeInUp} style={styles.feedbackActions}>
            <View style={[styles.replySection, { backgroundColor: colors.background }]}>
              <Text style={[styles.replyTitle, { color: colors.text }]}>
                Reply to feedback
              </Text>
              <TextInput
                style={[styles.replyInput, { color: colors.text, borderColor: colors.icon }]}
                placeholder="Type your response..."
                placeholderTextColor={colors.icon}
                value={replyText}
                onChangeText={setReplyText}
                multiline
              />
              <View style={styles.replyButtons}>
                <TouchableOpacity style={[styles.sendButton, { backgroundColor: colors.tint }]}>
                  <Send size={14} color="white" />
                  <Text style={styles.sendButtonText}>Send Reply</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.background }]}>
                  <Flag size={14} color={colors.icon} />
                  <Text style={[styles.actionBtnText, { color: colors.icon }]}>Flag</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.quickActions}>
              <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#10B981' + '15' }]}>
                <CircleCheck size={16} color="#10B981" />
                <Text style={[styles.quickActionText, { color: '#10B981' }]}>
                  Mark Resolved
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#3B82F6' + '15' }]}>
                <Clock size={16} color="#3B82F6" />
                <Text style={[styles.quickActionText, { color: '#3B82F6' }]}>
                  In Progress
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.quickAction, { backgroundColor: '#EF4444' + '15' }]}>
                <CircleAlert size={16} color="#EF4444" />
                <Text style={[styles.quickActionText, { color: '#EF4444' }]}>
                  Escalate
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={28} color={colors.text} />
          </TouchableOpacity>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Feedback & Reviews
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Manage user feedback and ratings
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <ChartBarBig size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Stats Overview */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#F59E0B' + '15' }]}>
            <Star size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.avgRating}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Avg Rating</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#3B82F6' + '15' }]}>
            <MessageSquare size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.totalFeedback}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Total</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View style={[styles.statIcon, { backgroundColor: '#10B981' + '15' }]}>
            <TrendingUp size={20} color="#10B981" />
          </View>
          <Text style={[styles.statValue, { color: colors.text }]}>{stats.responseRate}%</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Response Rate</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#EF4444' + '10' }]}>
          <View style={[styles.statIcon, { backgroundColor: '#EF4444' + '15' }]}>
            <CircleAlert size={20} color="#EF4444" />
          </View>
          <Text style={[styles.statValue, { color: '#EF4444' }]}>{stats.pendingIssues}</Text>
          <Text style={[styles.statLabel, { color: colors.icon }]}>Pending</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('all')}
        >
          <MessageSquare size={16} color={activeTab === 'all' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'all' ? 'white' : colors.text }]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ratings' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('ratings')}
        >
          <Star size={16} color={activeTab === 'ratings' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'ratings' ? 'white' : colors.text }]}>
            Ratings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'issues' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('issues')}
        >
          <CircleAlert size={16} color={activeTab === 'issues' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'issues' ? 'white' : colors.text }]}>
            Issues
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'suggestions' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('suggestions')}
        >
          <Lightbulb size={16} color={activeTab === 'suggestions' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'suggestions' ? 'white' : colors.text }]}>
            Ideas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Search size={18} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search feedback..."
          placeholderTextColor={colors.icon}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredFeedback.map((feedback, index) => renderFeedbackCard(feedback, index))}

        {filteredFeedback.length === 0 && (
          <View style={styles.emptyState}>
            <MessageSquare size={48} color={colors.icon} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              No feedback found
            </Text>
            <Text style={[styles.emptyText, { color: colors.icon }]}>
              Try adjusting your filters or search query
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  feedbackCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  feedbackInfo: {
    flex: 1,
  },
  feedbackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  feedbackType: {
    fontSize: 12,
    fontWeight: '600',
  },
  feedbackTime: {
    fontSize: 11,
  },
  feedbackAgent: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  feedbackBody: {
    marginLeft: 52,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  feedbackAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  authorText: {
    fontSize: 12,
  },
  feedbackActions: {
    marginTop: 16,
    marginLeft: 52,
  },
  replySection: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  replyTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  replyInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  replyButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  quickActionText: {
    fontSize: 12,
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

