/**
 * =============================================================================
 * CURRICULUM & COURSE COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive curriculum and course management dashboard that tracks active courses,
 * curriculum updates, course ratings, learning outcomes, and completion rates with
 * AI-powered insights and optimization recommendations.
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
  BookOpen,
  TrendingUp,
  Activity,
  Zap,
  Clock,
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
  Star,
  CheckCircle,
  AlertTriangle,
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

// Curriculum Data
const CURRICULUM_DATA = {
  activeCourses: 1247,
  curriculumUpdates: 89,
  avgCourseRating: 4.6,
  learningOutcomeAchievement: 87,
  completionRate: 91,
  trend: [1200, 1210, 1220, 1230, 1240, 1247],
};

// Top Courses
const TOP_COURSES = [
  { name: 'Machine Learning Fundamentals', students: '45.2K', rating: 4.8, completion: 89, outcomes: 94 },
  { name: 'Data Science Bootcamp', students: '38.7K', rating: 4.7, completion: 86, outcomes: 91 },
  { name: 'Python for Data Analysis', students: '52.1K', rating: 4.6, completion: 92, outcomes: 88 },
  { name: 'Deep Learning Specialization', students: '28.9K', rating: 4.5, completion: 84, outcomes: 86 },
  { name: 'Statistical Analysis', students: '34.2K', rating: 4.4, completion: 88, outcomes: 85 },
];

// Curriculum Updates
const CURRICULUM_UPDATES = [
  { id: 1, course: 'Machine Learning', type: 'Content Update', status: 'Completed', impact: 'High' },
  { id: 2, course: 'Data Visualization', type: 'New Module', status: 'In Progress', impact: 'Medium' },
  { id: 3, course: 'Python Advanced', type: 'Assessment Update', status: 'Pending', impact: 'Medium' },
  { id: 4, course: 'Statistics', type: 'Video Refresh', status: 'Completed', impact: 'Low' },
];

// Learning Outcomes
const LEARNING_OUTCOMES = {
  technicalSkills: 89,
  practicalApplication: 87,
  theoreticalKnowledge: 85,
  problemSolving: 91,
  communication: 82,
};

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'performance',
    title: 'Course Performance',
    message: 'Interactive courses show 23% higher completion rates. Consider adding more interactive elements.',
    impact: 'High',
    action: 'Increase interactive content modules',
  },
  {
    type: 'outcomes',
    title: 'Learning Outcomes',
    message: 'Problem-solving skills show strongest correlation with job placement. Emphasize in curriculum.',
    impact: 'Medium',
    action: 'Enhance problem-solving focus',
  },
  {
    type: 'curriculum',
    title: 'Curriculum Optimization',
    message: 'Industry demand for AI ethics content increased 45%. Add dedicated module.',
    impact: 'High',
    action: 'Develop AI ethics curriculum',
  },
];

export default function CurriculumCourseCommandCenter() {
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

  const renderMetricCard = (title: string, value: string, color: string, subtitle?: string) => (
    <BlurView intensity={20} tint="dark" style={styles.metricCard}>
      <Text style={styles.metricLabel}>{title}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
    </BlurView>
  );

  const renderCourseCard = (course: typeof TOP_COURSES[0]) => (
    <BlurView key={course.name} intensity={20} tint="dark" style={styles.courseCard}>
      <Text style={styles.courseName}>{course.name}</Text>
      <View style={styles.courseMetrics}>
        <View style={styles.courseMetric}>
          <Text style={styles.courseMetricLabel}>Students</Text>
          <Text style={[styles.courseMetricValue, { color: THEME.neonCyan }]}>{course.students}</Text>
        </View>
        <View style={styles.courseMetric}>
          <Text style={styles.courseMetricLabel}>Rating</Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={THEME.amber} fill={THEME.amber} />
            <Text style={[styles.courseMetricValue, { color: THEME.amber }]}>{course.rating}</Text>
          </View>
        </View>
        <View style={styles.courseMetric}>
          <Text style={styles.courseMetricLabel}>Completion</Text>
          <Text style={[styles.courseMetricValue, { color: THEME.emeraldGreen }]}>{course.completion}%</Text>
        </View>
        <View style={styles.courseMetric}>
          <Text style={styles.courseMetricLabel}>Outcomes</Text>
          <Text style={[styles.courseMetricValue, { color: THEME.purple }]}>{course.outcomes}%</Text>
        </View>
      </View>
      <View style={styles.courseBar}>
        <View style={[styles.courseBarFill, { width: `${course.completion}%`, backgroundColor: THEME.emeraldGreen }]} />
      </View>
    </BlurView>
  );

  const renderUpdateCard = (update: typeof CURRICULUM_UPDATES[0]) => {
    const statusColors = {
      Completed: THEME.emeraldGreen,
      'In Progress': THEME.amber,
      Pending: THEME.red,
    };
    const statusColor = statusColors[update.status as keyof typeof statusColors];
    const impactColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.emeraldGreen,
    };
    const impactColor = impactColors[update.impact as keyof typeof impactColors];

    return (
      <BlurView key={update.id} intensity={20} tint="dark" style={styles.updateCard}>
        <View style={styles.updateHeader}>
          <Text style={styles.updateCourse}>{update.course}</Text>
          <View style={[styles.updateStatus, { backgroundColor: statusColor + '30' }]}>
            <Text style={[styles.updateStatusText, { color: statusColor }]}>{update.status}</Text>
          </View>
        </View>
        <View style={styles.updateDetails}>
          <View style={styles.updateDetail}>
            <Text style={styles.updateDetailLabel}>Type</Text>
            <Text style={styles.updateDetailValue}>{update.type}</Text>
          </View>
          <View style={styles.updateDetail}>
            <Text style={styles.updateDetailLabel}>Impact</Text>
            <Text style={[styles.updateDetailValue, { color: impactColor }]}>{update.impact}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderOutcomeCard = (label: string, value: number, color: string) => (
    <BlurView key={label} intensity={20} tint="dark" style={styles.outcomeCard}>
      <Text style={styles.outcomeLabel}>{label}</Text>
      <Text style={[styles.outcomeValue, { color }]}>{value}%</Text>
      <View style={styles.outcomeBar}>
        <View style={[styles.outcomeBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      performance: THEME.neonCyan,
      outcomes: THEME.emeraldGreen,
      curriculum: THEME.purple,
    };
    const typeIcons = {
      performance: TrendingUp,
      outcomes: Award,
      curriculum: BookOpen,
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
            <BookOpen size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Curriculum & Course Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Curriculum Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Curriculum Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Active Courses', CURRICULUM_DATA.activeCourses.toString(), THEME.neonCyan, 'Currently active')}
              {renderMetricCard('Curriculum Updates', CURRICULUM_DATA.curriculumUpdates.toString(), THEME.electricBlue, 'This quarter')}
              {renderMetricCard('Avg Rating', CURRICULUM_DATA.avgCourseRating.toFixed(1), THEME.amber, 'Out of 5')}
              {renderMetricCard('Learning Outcomes', `${CURRICULUM_DATA.learningOutcomeAchievement}%`, THEME.emeraldGreen, 'Achievement rate')}
              {renderMetricCard('Completion Rate', `${CURRICULUM_DATA.completionRate}%`, THEME.purple, 'Overall completion')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Top Courses */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Top Performing Courses</Text>
          </View>
          <View style={styles.coursesContainer}>
            {TOP_COURSES.map((course) => renderCourseCard(course))}
          </View>
        </Animated.View>

        {/* Curriculum Updates */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Curriculum Updates</Text>
          </View>
          <View style={styles.updatesContainer}>
            {CURRICULUM_UPDATES.map((update) => renderUpdateCard(update))}
          </View>
        </Animated.View>

        {/* Learning Outcomes */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Learning Outcomes</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.outcomesOverviewCard}>
            <View style={styles.outcomesGrid}>
              {renderOutcomeCard('Technical Skills', LEARNING_OUTCOMES.technicalSkills, THEME.neonCyan)}
              {renderOutcomeCard('Practical Application', LEARNING_OUTCOMES.practicalApplication, THEME.electricBlue)}
              {renderOutcomeCard('Theoretical Knowledge', LEARNING_OUTCOMES.theoreticalKnowledge, THEME.purple)}
              {renderOutcomeCard('Problem Solving', LEARNING_OUTCOMES.problemSolving, THEME.emeraldGreen)}
              {renderOutcomeCard('Communication', LEARNING_OUTCOMES.communication, THEME.amber)}
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
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
  metricsScroll: {
    marginBottom: 0,
  },
  metricsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  metricCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  metricLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
  },
  coursesContainer: {
    gap: 12,
  },
  courseCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  courseName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  courseMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  courseMetric: {
    alignItems: 'center',
  },
  courseMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  courseMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courseBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  courseBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  updatesContainer: {
    gap: 12,
  },
  updateCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  updateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  updateCourse: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  updateStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  updateStatusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  updateDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateDetail: {
    flex: 1,
  },
  updateDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  updateDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  outcomesOverviewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  outcomesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  outcomeCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  outcomeLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  outcomeValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  outcomeBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  outcomeBarFill: {
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
