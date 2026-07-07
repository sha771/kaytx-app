/**
 * =============================================================================
 * FACULTY OPERATIONS CENTER
 * =============================================================================
 *
 * A comprehensive faculty operations dashboard that tracks teaching performance,
 * faculty productivity, course delivery, research output, and student feedback with
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
  Users,
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
  BookOpen,
  Star,
  MessageSquare,
  GraduationCap,
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

// Faculty Data
const FACULTY_DATA = {
  totalFaculty: '42K',
  activeFaculty: '38.5K',
  avgTeachingScore: 87,
  researchOutput: 1247,
  studentSatisfaction: 92,
  trend: [38000, 38100, 38200, 38300, 38400, 38500],
};

// Top Faculty
const TOP_FACULTY = [
  { name: 'Dr. Sarah Chen', department: 'Computer Science', courses: 4, rating: 4.9, students: '2.4K' },
  { name: 'Dr. Michael Roberts', department: 'Data Science', courses: 3, rating: 4.8, students: '1.8K' },
  { name: 'Dr. Emily Watson', department: 'Machine Learning', courses: 5, rating: 4.7, students: '3.2K' },
  { name: 'Dr. James Liu', department: 'Statistics', courses: 3, rating: 4.6, students: '1.5K' },
];

// Teaching Performance
const TEACHING_PERFORMANCE = {
  courseDelivery: 89,
  studentEngagement: 87,
  contentQuality: 91,
  responsiveness: 85,
  accessibility: 94,
};

// Research Output
const RESEARCH_OUTPUT = [
  { name: 'Dr. Sarah Chen', publications: 12, citations: 847, grants: '$2.4M' },
  { name: 'Dr. Michael Roberts', publications: 8, citations: 523, grants: '$1.8M' },
  { name: 'Dr. Emily Watson', publications:15, citations: 1205, grants: '$3.2M' },
  { name: 'Dr. James Liu', publications: 6, citations: 389, grants: '$1.2M' },
];

// Student Feedback
const STUDENT_FEEDBACK = {
  overallSatisfaction: 92,
  teachingQuality: 90,
  courseContent: 88,
  supportAvailability: 85,
  communication: 87,
};

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'performance',
    title: 'Teaching Performance',
    message: 'Faculty with interactive teaching methods show 23% higher student engagement scores.',
    impact: 'High',
    action: 'Promote interactive teaching workshops',
  },
  {
    type: 'research',
    title: 'Research Productivity',
    message: 'Faculty with dedicated research time produce 45% more publications. Consider schedule optimization.',
    impact: 'Medium',
    action: 'Optimize faculty schedules for research',
  },
  {
    type: 'feedback',
    title: 'Student Feedback',
    message: 'Faculty response time correlates with 18% higher satisfaction scores.',
    impact: 'Medium',
    action: 'Implement response time guidelines',
  },
];

export default function FacultyOperationsCenter() {
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

  const renderFacultyCard = (faculty: typeof TOP_FACULTY[0]) => (
    <BlurView key={faculty.name} intensity={20} tint="dark" style={styles.facultyCard}>
      <View style={styles.facultyHeader}>
        <Text style={styles.facultyName}>{faculty.name}</Text>
        <View style={styles.ratingContainer}>
          <Star size={14} color={THEME.amber} fill={THEME.amber} />
          <Text style={[styles.facultyRating, { color: THEME.amber }]}>{faculty.rating}</Text>
        </View>
      </View>
      <Text style={styles.facultyDepartment}>{faculty.department}</Text>
      <View style={styles.facultyMetrics}>
        <View style={styles.facultyMetric}>
          <Text style={styles.facultyMetricLabel}>Courses</Text>
          <Text style={[styles.facultyMetricValue, { color: THEME.neonCyan }]}>{faculty.courses}</Text>
        </View>
        <View style={styles.facultyMetric}>
          <Text style={styles.facultyMetricLabel}>Students</Text>
          <Text style={[styles.facultyMetricValue, { color: THEME.electricBlue }]}>{faculty.students}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderPerformanceCard = (label: string, value: number, color: string) => (
    <BlurView key={label} intensity={20} tint="dark" style={styles.performanceCard}>
      <Text style={styles.performanceLabel}>{label}</Text>
      <Text style={[styles.performanceValue, { color }]}>{value}%</Text>
      <View style={styles.performanceBar}>
        <View style={[styles.performanceBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </BlurView>
  );

  const renderResearchCard = (research: typeof RESEARCH_OUTPUT[0]) => (
    <BlurView key={research.name} intensity={20} tint="dark" style={styles.researchCard}>
      <Text style={styles.researchName}>{research.name}</Text>
      <View style={styles.researchMetrics}>
        <View style={styles.researchMetric}>
          <Text style={styles.researchMetricLabel}>Publications</Text>
          <Text style={[styles.researchMetricValue, { color: THEME.neonCyan }]}>{research.publications}</Text>
        </View>
        <View style={styles.researchMetric}>
          <Text style={styles.researchMetricLabel}>Citations</Text>
          <Text style={[styles.researchMetricValue, { color: THEME.electricBlue }]}>{research.citations}</Text>
        </View>
        <View style={styles.researchMetric}>
          <Text style={styles.researchMetricLabel}>Grants</Text>
          <Text style={[styles.researchMetricValue, { color: THEME.emeraldGreen }]}>{research.grants}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      performance: THEME.neonCyan,
      research: THEME.purple,
      feedback: THEME.emeraldGreen,
    };
    const typeIcons = {
      performance: TrendingUp,
      research: BookOpen,
      feedback: MessageSquare,
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
            <GraduationCap size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Faculty Operations Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Faculty Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Faculty Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Total Faculty', FACULTY_DATA.totalFaculty, THEME.neonCyan, 'All faculty members')}
              {renderMetricCard('Active Faculty', FACULTY_DATA.activeFaculty, THEME.electricBlue, 'Currently teaching')}
              {renderMetricCard('Teaching Score', `${FACULTY_DATA.avgTeachingScore}%`, THEME.emeraldGreen, 'Average performance')}
              {renderMetricCard('Research Output', FACULTY_DATA.researchOutput.toString(), THEME.purple, 'Publications this year')}
              {renderMetricCard('Student Satisfaction', `${FACULTY_DATA.studentSatisfaction}%`, THEME.amber, 'Faculty feedback')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Top Faculty */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Top Performing Faculty</Text>
          </View>
          <View style={styles.facultyContainer}>
            {TOP_FACULTY.map((faculty) => renderFacultyCard(faculty))}
          </View>
        </Animated.View>

        {/* Teaching Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Teaching Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.teachingCard}>
            <View style={styles.teachingGrid}>
              {renderPerformanceCard('Course Delivery', TEACHING_PERFORMANCE.courseDelivery, THEME.neonCyan)}
              {renderPerformanceCard('Student Engagement', TEACHING_PERFORMANCE.studentEngagement, THEME.electricBlue)}
              {renderPerformanceCard('Content Quality', TEACHING_PERFORMANCE.contentQuality, THEME.emeraldGreen)}
              {renderPerformanceCard('Responsiveness', TEACHING_PERFORMANCE.responsiveness, THEME.purple)}
              {renderPerformanceCard('Accessibility', TEACHING_PERFORMANCE.accessibility, THEME.amber)}
            </View>
          </BlurView>
        </Animated.View>

        {/* Research Output */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Research Output</Text>
          </View>
          <View style={styles.researchContainer}>
            {RESEARCH_OUTPUT.map((research) => renderResearchCard(research))}
          </View>
        </Animated.View>

        {/* Student Feedback */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Student Feedback</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.feedbackCard}>
            <View style={styles.feedbackOverview}>
              <View style={styles.feedbackMetric}>
                <Text style={styles.feedbackLabel}>Overall Satisfaction</Text>
                <Text style={[styles.feedbackValue, { color: THEME.neonCyan }]}>{STUDENT_FEEDBACK.overallSatisfaction}%</Text>
              </View>
              <View style={styles.feedbackMetric}>
                <Text style={styles.feedbackLabel}>Teaching Quality</Text>
                <Text style={[styles.feedbackValue, { color: THEME.electricBlue }]}>{STUDENT_FEEDBACK.teachingQuality}%</Text>
              </View>
              <View style={styles.feedbackMetric}>
                <Text style={styles.feedbackLabel}>Course Content</Text>
                <Text style={[styles.feedbackValue, { color: THEME.emeraldGreen }]}>{STUDENT_FEEDBACK.courseContent}%</Text>
              </View>
              <View style={styles.feedbackMetric}>
                <Text style={styles.feedbackLabel}>Support Availability</Text>
                <Text style={[styles.feedbackValue, { color: THEME.purple }]}>{STUDENT_FEEDBACK.supportAvailability}%</Text>
              </View>
              <View style={styles.feedbackMetric}>
                <Text style={styles.feedbackLabel}>Communication</Text>
                <Text style={[styles.feedbackValue, { color: THEME.amber }]}>{STUDENT_FEEDBACK.communication}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
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
  facultyContainer: {
    gap: 12,
  },
  facultyCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  facultyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  facultyName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  facultyRating: {
    fontSize: 14,
    fontWeight: '600',
  },
  facultyDepartment: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 12,
  },
  facultyMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  facultyMetric: {
    alignItems: 'center',
  },
  facultyMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  facultyMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  teachingCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  teachingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  performanceCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  performanceLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  performanceBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  performanceBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  researchContainer: {
    gap: 12,
  },
  researchCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  researchName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  researchMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  researchMetric: {
    alignItems: 'center',
  },
  researchMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  researchMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  feedbackCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  feedbackOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  feedbackMetric: {
    alignItems: 'center',
  },
  feedbackLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  feedbackValue: {
    fontSize: 20,
    fontWeight: '700',
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
