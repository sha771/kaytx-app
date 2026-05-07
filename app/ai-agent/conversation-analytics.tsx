import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  ChevronLeft,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CircleCheck,
  CircleAlert,
  ChartBarBig,
  ChartPie,
  Calendar,
  ListFilter,
  EllipsisVertical,
  Download,
  ChevronDown,
  Zap,
  Target,
  ThumbsUp,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Types
interface ConversationMetric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

interface TopTopic {
  topic: string;
  count: number;
  percentage: number;
}

interface AgentPerformance {
  agent: string;
  conversations: number;
  avgResponseTime: number;
  satisfaction: number;
  resolutionRate: number;
}

// Mock Data
const METRICS: ConversationMetric[] = [
  { label: 'Total Conversations', value: '12,456', change: 12.5, trend: 'up' },
  { label: 'Avg Response Time', value: '1.2s', change: -8.3, trend: 'down' },
  { label: 'User Satisfaction', value: '94.2%', change: 3.1, trend: 'up' },
  { label: 'Resolution Rate', value: '87.5%', change: 5.2, trend: 'up' },
];

const TOP_TOPICS: TopTopic[] = [
  { topic: 'Account Issues', count: 2340, percentage: 18.8 },
  { topic: 'Billing Questions', count: 1890, percentage: 15.2 },
  { topic: 'Feature Requests', count: 1567, percentage: 12.6 },
  { topic: 'Technical Support', count: 1432, percentage: 11.5 },
  { topic: 'General Inquiry', count: 1123, percentage: 9.0 },
];

const AGENT_PERFORMANCE: AgentPerformance[] = [
  { agent: 'Support AI', conversations: 4567, avgResponseTime: 1.1, satisfaction: 95.2, resolutionRate: 89.5 },
  { agent: 'Sales AI', conversations: 3245, avgResponseTime: 1.4, satisfaction: 92.8, resolutionRate: 85.3 },
  { agent: 'HR AI', conversations: 2134, avgResponseTime: 1.3, satisfaction: 94.1, resolutionRate: 88.7 },
  { agent: 'Marketing AI', conversations: 1890, avgResponseTime: 1.5, satisfaction: 91.5, resolutionRate: 82.1 },
  { agent: 'Accounting AI', conversations: 620, avgResponseTime: 1.2, satisfaction: 96.0, resolutionRate: 92.3 },
];

const HOURLY_DATA = [
  { hour: '00:00', conversations: 45 },
  { hour: '04:00', conversations: 23 },
  { hour: '08:00', conversations: 234 },
  { hour: '12:00', conversations: 456 },
  { hour: '16:00', conversations: 389 },
  { hour: '20:00', conversations: 167 },
];

export default function ConversationAnalyticsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'topics' | 'trends'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  const maxConversations = Math.max(...HOURLY_DATA.map(d => d.conversations));

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
              Conversation Analytics
            </Text>
            <Text style={[styles.headerSubtitle, { color: colors.icon }]}>
              Insights from agent interactions
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Download size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Time Range Selector */}
      <View style={styles.timeRangeContainer}>
        {(['24h', '7d', '30d', '90d'] as const).map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeChip,
              timeRange === range && { backgroundColor: colors.tint },
            ]}
            onPress={() => setTimeRange(range)}
          >
            <Text
              style={[
                styles.timeChipText,
                { color: timeRange === range ? 'white' : colors.text },
              ]}
            >
              {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'overview' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('overview')}
        >
          <ChartBarBig size={16} color={activeTab === 'overview' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'overview' ? 'white' : colors.text }]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'agents' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('agents')}
        >
          <Users size={16} color={activeTab === 'agents' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'agents' ? 'white' : colors.text }]}>
            Agents
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'topics' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('topics')}
        >
          <ChartPie size={16} color={activeTab === 'topics' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'topics' ? 'white' : colors.text }]}>
            Topics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'trends' && { backgroundColor: colors.tint }]}
          onPress={() => setActiveTab('trends')}
        >
          <TrendingUp size={16} color={activeTab === 'trends' ? 'white' : colors.icon} />
          <Text style={[styles.tabText, { color: activeTab === 'trends' ? 'white' : colors.text }]}>
            Trends
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'overview' && (
          <>
            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
              {METRICS.map((metric, index) => (
                <Animated.View
                  key={metric.label}
                  entering={FadeInUp.delay(index * 50)}
                  style={[styles.metricCard, { backgroundColor: colors.card }]}
                >
                  <Text style={[styles.metricLabel, { color: colors.icon }]}>
                    {metric.label}
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {metric.value}
                  </Text>
                  <View style={styles.trendRow}>
                    {metric.trend === 'up' ? (
                      <TrendingUp size={14} color="#10B981" />
                    ) : (
                      <TrendingDown size={14} color={metric.change < 0 ? '#10B981' : '#EF4444'} />
                    )}
                    <Text
                      style={[
                        styles.trendText,
                        {
                          color:
                            metric.change > 0
                              ? '#10B981'
                              : metric.change < 0 && metric.label.includes('Time')
                              ? '#10B981'
                              : '#EF4444',
                        },
                      ]}
                    >
                      {metric.change > 0 ? '+' : ''}
                      {metric.change}%
                    </Text>
                    <Text style={[styles.trendLabel, { color: colors.icon }]}>vs last period</Text>
                  </View>
                </Animated.View>
              ))}
            </View>

            {/* Activity Chart */}
            <Animated.View
              entering={FadeInUp.delay(200)}
              style={[styles.chartCard, { backgroundColor: colors.card }]}
            >
              <View style={styles.chartHeader}>
                <Text style={[styles.chartTitle, { color: colors.text }]}>
                  Conversation Volume
                </Text>
                <TouchableOpacity style={styles.filterButton}>
                  <ListFilter size={16} color={colors.icon} />
                </TouchableOpacity>
              </View>

              {/* Simple Bar Chart */}
              <View style={styles.barChart}>
                {HOURLY_DATA.map((data, index) => (
                  <View key={index} style={styles.barColumn}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${(data.conversations / maxConversations) * 100}%`,
                          backgroundColor: colors.tint,
                        },
                      ]}
                    />
                    <Text style={[styles.barLabel, { color: colors.icon }]}>
                      {data.hour}
                    </Text>
                  </View>
                ))}
              </View>
            </Animated.View>

            {/* Quick Insights */}
            <Animated.View
              entering={FadeInUp.delay(300)}
              style={[styles.insightsCard, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.insightsTitle, { color: colors.text }]}>
                AI-Generated Insights
              </Text>
              <View style={styles.insightRow}>
                <Zap size={16} color="#F59E0B" />
                <Text style={[styles.insightText, { color: colors.text }]}>
                  Peak activity between 12:00-16:00. Consider scaling agents during these hours.
                </Text>
              </View>
              <View style={styles.insightRow}>
                <Target size={16} color="#3B82F6" />
                <Text style={[styles.insightText, { color: colors.text }]}>
                  Support AI has 15% higher resolution rate than other agents.
                </Text>
              </View>
              <View style={styles.insightRow}>
                <ThumbsUp size={16} color="#10B981" />
                <Text style={[styles.insightText, { color: colors.text }]}>
                  User satisfaction improved by 3.1% after latest agent update.
                </Text>
              </View>
            </Animated.View>
          </>
        )}

        {activeTab === 'agents' && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Agent Performance
            </Text>
            {AGENT_PERFORMANCE.map((agent, index) => (
              <Animated.View
                key={agent.agent}
                entering={FadeInUp.delay(index * 50)}
                style={[styles.agentCard, { backgroundColor: colors.card }]}
              >
                <View style={styles.agentHeader}>
                  <Text style={[styles.agentName, { color: colors.text }]}>
                    {agent.agent}
                  </Text>
                  <View style={[styles.satisfactionBadge, { backgroundColor: '#10B981' + '15' }]}>
                    <ThumbsUp size={12} color="#10B981" />
                    <Text style={[styles.satisfactionText, { color: '#10B981' }]}>
                      {agent.satisfaction}%
                    </Text>
                  </View>
                </View>

                <View style={styles.agentMetrics}>
                  <View style={styles.agentMetric}>
                    <MessageSquare size={14} color={colors.icon} />
                    <Text style={[styles.agentMetricValue, { color: colors.text }]}>
                      {agent.conversations.toLocaleString()}
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: colors.icon }]}>
                      conversations
                    </Text>
                  </View>
                  <View style={styles.agentMetric}>
                    <Clock size={14} color={colors.icon} />
                    <Text style={[styles.agentMetricValue, { color: colors.text }]}>
                      {agent.avgResponseTime}s
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: colors.icon }]}>
                      avg response
                    </Text>
                  </View>
                  <View style={styles.agentMetric}>
                    <CircleCheck size={14} color={colors.icon} />
                    <Text style={[styles.agentMetricValue, { color: colors.text }]}>
                      {agent.resolutionRate}%
                    </Text>
                    <Text style={[styles.agentMetricLabel, { color: colors.icon }]}>
                      resolved
                    </Text>
                  </View>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressRow}>
                    <Text style={[styles.progressLabel, { color: colors.icon }]}>
                      Resolution Rate
                    </Text>
                    <Text style={[styles.progressValue, { color: colors.text }]}>
                      {agent.resolutionRate}%
                    </Text>
                  </View>
                  <View style={[styles.progressBar, { backgroundColor: colors.background }]}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${agent.resolutionRate}%`,
                          backgroundColor:
                            agent.resolutionRate > 90
                              ? '#10B981'
                              : agent.resolutionRate > 80
                              ? '#F59E0B'
                              : '#EF4444',
                        },
                      ]}
                    />
                  </View>
                </View>
              </Animated.View>
            ))}
          </>
        )}

        {activeTab === 'topics' && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Top Conversation Topics
            </Text>
            {TOP_TOPICS.map((topic, index) => (
              <Animated.View
                key={topic.topic}
                entering={FadeInUp.delay(index * 50)}
                style={[styles.topicCard, { backgroundColor: colors.card }]}
              >
                <View style={styles.topicRow}>
                  <View style={styles.topicRank}>
                    <Text style={[styles.topicRankText, { color: colors.tint }]}>
                      #{index + 1}
                    </Text>
                  </View>
                  <View style={styles.topicInfo}>
                    <Text style={[styles.topicName, { color: colors.text }]}>
                      {topic.topic}
                    </Text>
                    <Text style={[styles.topicCount, { color: colors.icon }]}>
                      {topic.count.toLocaleString()} conversations
                    </Text>
                  </View>
                  <View style={styles.topicPercentage}>
                    <Text style={[styles.percentageText, { color: colors.text }]}>
                      {topic.percentage}%
                    </Text>
                  </View>
                </View>
                <View style={[styles.topicBar, { backgroundColor: colors.background }]}>
                  <View
                    style={[
                      styles.topicBarFill,
                      {
                        width: `${topic.percentage}%`,
                        backgroundColor: colors.tint,
                      },
                    ]}
                  />
                </View>
              </Animated.View>
            ))}
          </>
        )}

        {activeTab === 'trends' && (
          <View style={[styles.trendsCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.trendsTitle, { color: colors.text }]}>
              Trend Analysis
            </Text>
            <View style={styles.trendItem}>
              <View style={[styles.trendIcon, { backgroundColor: '#10B981' + '15' }]}>
                <TrendingUp size={20} color="#10B981" />
              </View>
              <View style={styles.trendContent}>
                <Text style={[styles.trendItemTitle, { color: colors.text }]}>
                  Conversation Volume
                </Text>
                <Text style={[styles.trendItemDesc, { color: colors.icon }]}>
                  Increased by 23% compared to last month
                </Text>
              </View>
            </View>
            <View style={styles.trendItem}>
              <View style={[styles.trendIcon, { backgroundColor: '#3B82F6' + '15' }]}>
                <Clock size={20} color="#3B82F6" />
              </View>
              <View style={styles.trendContent}>
                <Text style={[styles.trendItemTitle, { color: colors.text }]}>
                  Response Time
                </Text>
                <Text style={[styles.trendItemDesc, { color: colors.icon }]}>
                  Improved by 15% - agents responding faster
                </Text>
              </View>
            </View>
            <View style={styles.trendItem}>
              <View style={[styles.trendIcon, { backgroundColor: '#8B5CF6' + '15' }]}>
                <Users size={20} color="#8B5CF6" />
              </View>
              <View style={styles.trendContent}>
                <Text style={[styles.trendItemTitle, { color: colors.text }]}>
                  Active Users
                </Text>
                <Text style={[styles.trendItemDesc, { color: colors.icon }]}>
                  1,234 unique users this week (+8%)
                </Text>
              </View>
            </View>
            <View style={styles.trendItem}>
              <View style={[styles.trendIcon, { backgroundColor: '#F59E0B' + '15' }]}>
                <CircleAlert size={20} color="#F59E0B" />
              </View>
              <View style={styles.trendContent}>
                <Text style={[styles.trendItemTitle, { color: colors.text }]}>
                  Escalation Rate
                </Text>
                <Text style={[styles.trendItemDesc, { color: colors.icon }]}>
                  Decreased by 5% - better first-contact resolution
                </Text>
              </View>
            </View>
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
  timeRangeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  timeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#00000010',
  },
  timeChipText: {
    fontSize: 13,
    fontWeight: '600',
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
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '47%',
    padding: 16,
    borderRadius: 16,
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 13,
    fontWeight: '600',
  },
  trendLabel: {
    fontSize: 11,
    marginLeft: 4,
  },
  chartCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  filterButton: {
    padding: 8,
  },
  barChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: 8,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 32,
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 11,
    marginTop: 8,
  },
  insightsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 8,
  },
  agentCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  satisfactionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  satisfactionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  agentMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  agentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentMetricLabel: {
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
  },
  topicCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicRank: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#00000005',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  topicRankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  topicCount: {
    fontSize: 12,
  },
  topicPercentage: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
  },
  topicBar: {
    height: 6,
    borderRadius: 3,
  },
  topicBarFill: {
    height: 6,
    borderRadius: 3,
  },
  trendsCard: {
    borderRadius: 16,
    padding: 16,
  },
  trendsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  trendIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContent: {
    flex: 1,
  },
  trendItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  trendItemDesc: {
    fontSize: 13,
  },
});
