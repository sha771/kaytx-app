/**
 * =============================================================================
 * LEARNING ANALYTICS COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive learning analytics dashboard that monitors course engagement,
 * learning behavior, content performance, knowledge retention, and study patterns
 * with AI-powered insights and optimization recommendations.
 *
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import {
  ChevronLeft,
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Clock,
  BookOpen,
  Target,
  Award,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Flame,
  Shield,
  Users,
  Eye,
  MousePointer,
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line, Rect } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Theme Colors
const THEME = {
  background: '#03050A',
  card: '#0A0F1E',
  cardLight: '#121829',
  neonCyan: '#00F0FF',
  electricBlue: '#3B82F6',
  emeraldGreen: '#10B981',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Learning Analytics Data
const ANALYTICS_DATA = {
  courseEngagement: {
    daily: 87,
    weekly: 92,
    monthly: 100,
    trend: [85, 86, 87, 88, 87, 87],
  },
  learningBehavior: {
    avgSessionDuration: '4.2h',
    avgSessionsPerWeek: 8.7,
    peakLearningHours: '2PM-6PM',
    consistencyScore: 84,
    trend: [4.0, 4.1, 4.2, 4.3, 4.2, 4.2],
  },
  contentPerformance: {
    videoCompletion: 78,
    quizPassRate: 82,
    assignmentCompletion: 91,
    discussionParticipation: 67,
    trend: [75, 76, 77, 78, 79, 78],
  },
  knowledgeRetention: {
    immediate: 94,
    week1: 87,
    week2: 82,
    week4: 76,
    week8: 71,
    trend: [95, 94, 93, 94, 94, 94],
  },
  studyPatterns: {
    morningLearners: 28,
    afternoonLearners: 42,
    eveningLearners: 24,
    nightLearners: 6,
    trend: [30, 40, 25, 5],
  },
};

// Top Performing Content
const TOP_CONTENT = [
  { name: 'Machine Learning Fundamentals', engagement: 94, completion: 89, retention: 87 },
  { name: 'Data Visualization Mastery', engagement: 91, completion: 86, retention: 84 },
  { name: 'Python for Data Science', engagement: 88, completion: 84, retention: 82 },
  { name: 'Statistical Analysis', engagement: 85, completion: 81, retention: 79 },
  { name: 'Deep Learning Basics', engagement: 82, completion: 78, retention: 76 },
];

// Learning Heatmap Data
const HEATMAP_DATA = [
  { day: 'Monday', hours: 4.2, engagement: 87 },
  { day: 'Tuesday', hours: 4.5, engagement: 89 },
  { day: 'Wednesday', hours: 4.8, engagement: 91 },
  { day: 'Thursday', hours: 4.3, engagement: 88 },
  { day: 'Friday', hours: 3.9, engagement: 85 },
  { day: 'Saturday', hours: 5.2, engagement: 92 },
  { day: 'Sunday', hours: 4.7, engagement: 90 },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'engagement',
    title: 'Engagement Optimization',
    message: 'Interactive content shows 34% higher engagement than static content. Consider adding more interactive elements.',
    impact: 'High',
    action: 'Increase interactive content modules',
  },
  {
    type: 'retention',
    title: 'Knowledge Retention',
    message: 'Spaced repetition exercises improve long-term retention by 28%. Implement review schedules.',
    impact: 'Medium',
    action: 'Add spaced repetition to curriculum',
  },
  {
    type: 'pattern',
    title: 'Learning Pattern Analysis',
    message: 'Peak learning hours are 2PM-6PM. Schedule important content during these times.',
    impact: 'Positive',
    action: 'Optimize content scheduling',
  },
];

export default function LearningAnalyticsCommandCenter() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderTrendIndicator = (change: number, trend: string) => {
    if (trend === 'up') {
      return (
        <View style={styles.trendUp}>
          <ArrowUpRight size={12} color={THEME.emeraldGreen} />
          <Text style={[styles.trendText, { color: THEME.emeraldGreen }]}>{change}%</Text>
        </View>
      );
    } else if (trend === 'down') {
      return (
        <View style={styles.trendDown}>
          <ArrowDownRight size={12} color={THEME.red} />
          <Text style={[styles.trendText, { color: THEME.red }]}>{change}%</Text>
        </View>
      );
    }
    return null;
  };

  const renderSparkline = (data: number[], color: string) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const chartWidth = 100;
    const chartHeight = 40;

    const points = data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * chartWidth;
      const y = chartHeight - ((val - minVal) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');

    return (
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={color} stopOpacity="0.3" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path
          d={`M 0,${chartHeight} L ${points} L ${chartWidth},${chartHeight} Z`}
          fill={`url(#gradient-${color})`}
        />
        <Path
          d={`M ${points}`}
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      </Svg>
    );
  };

  const renderAnalyticsCard = (title: string, value: string, trend: number[], color: string, subtitle?: string) => (
    <BlurView intensity={20} tint="dark" style={styles.analyticsCard}>
      <Text style={styles.analyticsLabel}>{title}</Text>
      <Text style={[styles.analyticsValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.analyticsSubtitle}>{subtitle}</Text>}
      {renderSparkline(trend, color)}
    </BlurView>
  );

  const renderContentCard = (content: typeof TOP_CONTENT[0]) => (
    <BlurView key={content.name} intensity={20} tint="dark" style={styles.contentCard}>
      <Text style={styles.contentName}>{content.name}</Text>
      <View style={styles.contentMetrics}>
        <View style={styles.contentMetric}>
          <Text style={styles.contentMetricLabel}>Engagement</Text>
          <Text style={[styles.contentMetricValue, { color: THEME.neonCyan }]}>{content.engagement}%</Text>
        </View>
        <View style={styles.contentMetric}>
          <Text style={styles.contentMetricLabel}>Completion</Text>
          <Text style={[styles.contentMetricValue, { color: THEME.emeraldGreen }]}>{content.completion}%</Text>
        </View>
        <View style={styles.contentMetric}>
          <Text style={styles.contentMetricLabel}>Retention</Text>
          <Text style={[styles.contentMetricValue, { color: THEME.purple }]}>{content.retention}%</Text>
        </View>
      </View>
      <View style={styles.contentBar}>
        <View style={[styles.contentBarFill, { width: `${content.engagement}%`, backgroundColor: THEME.neonCyan }]} />
      </View>
    </BlurView>
  );

  const renderHeatmapItem = (item: typeof HEATMAP_DATA[0]) => {
    const engagementColor = item.engagement > 90 ? THEME.emeraldGreen : item.engagement > 85 ? THEME.amber : THEME.neonCyan;
    return (
      <BlurView key={item.day} intensity={20} tint="dark" style={styles.heatmapCard}>
        <Text style={styles.heatmapDay}>{item.day}</Text>
        <View style={styles.heatmapMetrics}>
          <View style={styles.heatmapMetric}>
            <Text style={styles.heatmapMetricLabel}>Hours</Text>
            <Text style={[styles.heatmapMetricValue, { color: THEME.electricBlue }]}>{item.hours}h</Text>
          </View>
          <View style={styles.heatmapMetric}>
            <Text style={styles.heatmapMetricLabel}>Engagement</Text>
            <Text style={[styles.heatmapMetricValue, { color: engagementColor }]}>{item.engagement}%</Text>
          </View>
        </View>
        <View style={styles.heatmapBar}>
          <View style={[styles.heatmapBarFill, { width: `${item.engagement}%`, backgroundColor: engagementColor }]} />
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      engagement: THEME.neonCyan,
      retention: THEME.purple,
      pattern: THEME.emeraldGreen,
    };
    const typeIcons = {
      engagement: Activity,
      retention: Brain,
      pattern: Clock,
    };
    const Icon = typeIcons[insight.type as keyof typeof typeIcons];
    const color = typeColors[insight.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.insightCard}>
        <BlurView intensity={20} tint="dark" style={styles.insightCardBlur}>
          <View style={styles.insightHeader}>
            <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.insightMeta}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <View style={[styles.insightImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.insightImpactText, { color }]}>{insight.impact}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.insightMessage}>{insight.message}</Text>
          <View style={styles.insightAction}>
            <Text style={styles.insightActionLabel}>Suggested Action:</Text>
            <Text style={styles.insightActionText}>{insight.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <BarChart3 size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Learning Analytics Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Course Engagement */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Course Engagement</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.analyticsScroll}>
            <View style={styles.analyticsContainer}>
              {renderAnalyticsCard('Daily Engagement', `${ANALYTICS_DATA.courseEngagement.daily}%`, ANALYTICS_DATA.courseEngagement.trend, THEME.neonCyan, '87% daily active')}
              {renderAnalyticsCard('Weekly Engagement', `${ANALYTICS_DATA.courseEngagement.weekly}%`, ANALYTICS_DATA.courseEngagement.trend, THEME.electricBlue, '92% weekly active')}
              {renderAnalyticsCard('Monthly Engagement', `${ANALYTICS_DATA.courseEngagement.monthly}%`, ANALYTICS_DATA.courseEngagement.trend, THEME.emeraldGreen, '100% monthly active')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Learning Behavior */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Learning Behavior</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.behaviorCard}>
            <View style={styles.behaviorGrid}>
              <View style={styles.behaviorMetric}>
                <Text style={styles.behaviorLabel}>Avg Session Duration</Text>
                <Text style={[styles.behaviorValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.learningBehavior.avgSessionDuration}</Text>
                {renderSparkline(ANALYTICS_DATA.learningBehavior.trend, THEME.neonCyan)}
              </View>
              <View style={styles.behaviorMetric}>
                <Text style={styles.behaviorLabel}>Sessions/Week</Text>
                <Text style={[styles.behaviorValue, { color: THEME.electricBlue }]}>{ANALYTICS_DATA.learningBehavior.avgSessionsPerWeek}</Text>
              </View>
              <View style={styles.behaviorMetric}>
                <Text style={styles.behaviorLabel}>Peak Hours</Text>
                <Text style={[styles.behaviorValue, { color: THEME.emeraldGreen }]}>{ANALYTICS_DATA.learningBehavior.peakLearningHours}</Text>
              </View>
              <View style={styles.behaviorMetric}>
                <Text style={styles.behaviorLabel}>Consistency Score</Text>
                <Text style={[styles.behaviorValue, { color: THEME.purple }]}>{ANALYTICS_DATA.learningBehavior.consistencyScore}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Content Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Content Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.contentPerformanceCard}>
            <View style={styles.contentPerformanceOverview}>
              <View style={styles.contentPerformanceMetric}>
                <Text style={styles.contentPerformanceLabel}>Video Completion</Text>
                <Text style={[styles.contentPerformanceValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.contentPerformance.videoCompletion}%</Text>
              </View>
              <View style={styles.contentPerformanceMetric}>
                <Text style={styles.contentPerformanceLabel}>Quiz Pass Rate</Text>
                <Text style={[styles.contentPerformanceValue, { color: THEME.electricBlue }]}>{ANALYTICS_DATA.contentPerformance.quizPassRate}%</Text>
              </View>
              <View style={styles.contentPerformanceMetric}>
                <Text style={styles.contentPerformanceLabel}>Assignment Completion</Text>
                <Text style={[styles.contentPerformanceValue, { color: THEME.emeraldGreen }]}>{ANALYTICS_DATA.contentPerformance.assignmentCompletion}%</Text>
              </View>
              <View style={styles.contentPerformanceMetric}>
                <Text style={styles.contentPerformanceLabel}>Discussion Participation</Text>
                <Text style={[styles.contentPerformanceValue, { color: THEME.purple }]}>{ANALYTICS_DATA.contentPerformance.discussionParticipation}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.topContentContainer}>
            {TOP_CONTENT.map((content) => renderContentCard(content))}
          </View>
        </Animated.View>

        {/* Knowledge Retention */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Knowledge Retention</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.retentionCard}>
            <View style={styles.retentionOverview}>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Immediate</Text>
                <Text style={[styles.retentionValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.knowledgeRetention.immediate}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Week 1</Text>
                <Text style={[styles.retentionValue, { color: THEME.electricBlue }]}>{ANALYTICS_DATA.knowledgeRetention.week1}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Week 2</Text>
                <Text style={[styles.retentionValue, { color: THEME.emeraldGreen }]}>{ANALYTICS_DATA.knowledgeRetention.week2}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Week 4</Text>
                <Text style={[styles.retentionValue, { color: THEME.purple }]}>{ANALYTICS_DATA.knowledgeRetention.week4}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Week 8</Text>
                <Text style={[styles.retentionValue, { color: THEME.amber }]}>{ANALYTICS_DATA.knowledgeRetention.week8}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Study Patterns */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Study Patterns</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.patternsCard}>
            <View style={styles.patternsOverview}>
              <View style={styles.patternMetric}>
                <Text style={styles.patternLabel}>Morning Learners</Text>
                <Text style={[styles.patternValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.studyPatterns.morningLearners}%</Text>
              </View>
              <View style={styles.patternMetric}>
                <Text style={styles.patternLabel}>Afternoon Learners</Text>
                <Text style={[styles.patternValue, { color: THEME.electricBlue }]}>{ANALYTICS_DATA.studyPatterns.afternoonLearners}%</Text>
              </View>
              <View style={styles.patternMetric}>
                <Text style={styles.patternLabel}>Evening Learners</Text>
                <Text style={[styles.patternValue, { color: THEME.purple }]}>{ANALYTICS_DATA.studyPatterns.eveningLearners}%</Text>
              </View>
              <View style={styles.patternMetric}>
                <Text style={styles.patternLabel}>Night Learners</Text>
                <Text style={[styles.patternValue, { color: THEME.amber }]}>{ANALYTICS_DATA.studyPatterns.nightLearners}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.heatmapContainer}>
            {HEATMAP_DATA.map((item) => renderHeatmapItem(item))}
          </View>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text,
  },
  timeText: {
    fontSize: 12,
    color: THEME.textMuted,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.text,
  },
  analyticsScroll: {
    marginBottom: 0,
  },
  analyticsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  analyticsCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  analyticsLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  analyticsValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  analyticsSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  behaviorCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  behaviorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  behaviorMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  behaviorLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  behaviorValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  contentPerformanceCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  contentPerformanceOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentPerformanceMetric: {
    alignItems: 'center',
  },
  contentPerformanceLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  contentPerformanceValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  topContentContainer: {
    gap: 12,
  },
  contentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  contentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  contentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  contentMetric: {
    alignItems: 'center',
  },
  contentMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  contentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  contentBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  retentionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  retentionOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  retentionMetric: {
    alignItems: 'center',
  },
  retentionLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  retentionValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  patternsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  patternsOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  patternMetric: {
    alignItems: 'center',
  },
  patternLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  patternValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  heatmapContainer: {
    gap: 12,
  },
  heatmapCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  heatmapDay: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  heatmapMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  heatmapMetric: {
    alignItems: 'center',
  },
  heatmapMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  heatmapMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  heatmapBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  heatmapBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  insightsContainer: {
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  insightCardBlur: {
    padding: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightMeta: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  insightImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  insightImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  insightAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  insightActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  insightActionText: {
    fontSize: 13,
    color: THEME.text,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendDown: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
