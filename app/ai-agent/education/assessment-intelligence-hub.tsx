/**
 * =============================================================================
 * ASSESSMENT INTELLIGENCE HUB
 * =============================================================================
 *
 * A comprehensive assessment dashboard that monitors exams, assignments,
 * quiz performance, skill assessments, and certification progress with AI-powered
 * insights and optimization recommendations.
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
  ClipboardCheck,
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
  CheckCircle,
  AlertCircle,
  FileText,
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

// Assessment Data
const ASSESSMENT_DATA = {
  totalExams: 1247,
  totalAssignments: '8.9K',
  avgQuizScore: 87,
  skillAssessmentRate: 92,
  certificationProgress: 78,
  trend: [1200, 1210, 1220, 1230, 1240, 1247],
};

// Recent Exams
const RECENT_EXAMS = [
  { name: 'Machine Learning Final', students: '12.4K', avgScore: 87, passRate: 94, completion: 98 },
  { name: 'Data Science Midterm', students: '15.2K', avgScore: 84, passRate: 91, completion: 96 },
  { name: 'Python Assessment', students: '18.7K', avgScore: 89, passRate: 95, completion: 97 },
  { name: 'Statistics Quiz', students: '22.1K', avgScore: 82, passRate: 89, completion: 95 },
];

// Assignment Performance
const ASSIGNMENT_PERFORMANCE = [
  { name: 'ML Project', submitted: '45.2K', avgGrade: 88, onTime: 94 },
  { name: 'Data Analysis', submitted: '38.7K', avgGrade: 85, onTime: 91 },
  { name: 'Visualization Task', submitted: '52.1K', avgGrade: 87, onTime: 93 },
  { name: 'Algorithm Challenge', submitted: '28.9K', avgGrade: 82, onTime: 89 },
];

// Certification Progress
const CERTIFICATION_PROGRESS = [
  { name: 'Data Science Professional', enrolled: '45.2K', completed: 78, inProgress: 18, notStarted: 4 },
  { name: 'Machine Learning Engineer', enrolled: '38.7K', completed: 72, inProgress: 22, notStarted: 6 },
  { name: 'Python Developer', enrolled: '52.1K', completed: 85, inProgress: 12, notStarted: 3 },
  { name: 'Data Analyst', enrolled: '34.2K', completed: 81, inProgress: 15, notStarted: 4 },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'performance',
    title: 'Assessment Performance',
    message: 'Students who complete practice quizzes show 23% higher exam scores. Increase practice availability.',
    impact: 'High',
    action: 'Add more practice quizzes',
  },
  {
    type: 'engagement',
    title: 'Assignment Engagement',
    message: 'Interactive assignments show 34% higher completion rates than traditional ones.',
    impact: 'Medium',
    action: 'Convert assignments to interactive format',
  },
  {
    type: 'certification',
    title: 'Certification Success',
    message: 'Students with mentor support show 45% higher certification completion rates.',
    impact: 'High',
    action: 'Expand mentor program',
  },
];

export default function AssessmentIntelligenceHub() {
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

  const renderExamCard = (exam: typeof RECENT_EXAMS[0]) => (
    <BlurView key={exam.name} intensity={20} tint="dark" style={styles.examCard}>
      <Text style={styles.examName}>{exam.name}</Text>
      <View style={styles.examMetrics}>
        <View style={styles.examMetric}>
          <Text style={styles.examMetricLabel}>Students</Text>
          <Text style={[styles.examMetricValue, { color: THEME.neonCyan }]}>{exam.students}</Text>
        </View>
        <View style={styles.examMetric}>
          <Text style={styles.examMetricLabel}>Avg Score</Text>
          <Text style={[styles.examMetricValue, { color: THEME.electricBlue }]}>{exam.avgScore}%</Text>
        </View>
        <View style={styles.examMetric}>
          <Text style={styles.examMetricLabel}>Pass Rate</Text>
          <Text style={[styles.examMetricValue, { color: THEME.emeraldGreen }]}>{exam.passRate}%</Text>
        </View>
        <View style={styles.examMetric}>
          <Text style={styles.examMetricLabel}>Completion</Text>
          <Text style={[styles.examMetricValue, { color: THEME.purple }]}>{exam.completion}%</Text>
        </View>
      </View>
      <View style={styles.examBar}>
        <View style={[styles.examBarFill, { width: `${exam.passRate}%`, backgroundColor: THEME.emeraldGreen }]} />
      </View>
    </BlurView>
  );

  const renderAssignmentCard = (assignment: typeof ASSIGNMENT_PERFORMANCE[0]) => (
    <BlurView key={assignment.name} intensity={20} tint="dark" style={styles.assignmentCard}>
      <View style={styles.assignmentHeader}>
        <Text style={styles.assignmentName}>{assignment.name}</Text>
        <FileText size={20} color={THEME.neonCyan} />
      </View>
      <View style={styles.assignmentMetrics}>
        <View style={styles.assignmentMetric}>
          <Text style={styles.assignmentMetricLabel}>Submitted</Text>
          <Text style={[styles.assignmentMetricValue, { color: THEME.neonCyan }]}>{assignment.submitted}</Text>
        </View>
        <View style={styles.assignmentMetric}>
          <Text style={styles.assignmentMetricLabel}>Avg Grade</Text>
          <Text style={[styles.assignmentMetricValue, { color: THEME.electricBlue }]}>{assignment.avgGrade}%</Text>
        </View>
        <View style={styles.assignmentMetric}>
          <Text style={styles.assignmentMetricLabel}>On Time</Text>
          <Text style={[styles.assignmentMetricValue, { color: THEME.emeraldGreen }]}>{assignment.onTime}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderCertificationCard = (cert: typeof CERTIFICATION_PROGRESS[0]) => (
    <BlurView key={cert.name} intensity={20} tint="dark" style={styles.certCard}>
      <Text style={styles.certName}>{cert.name}</Text>
      <View style={styles.certOverview}>
        <View style={styles.certMetric}>
          <Text style={styles.certMetricLabel}>Enrolled</Text>
          <Text style={[styles.certMetricValue, { color: THEME.neonCyan }]}>{cert.enrolled}</Text>
        </View>
        <View style={styles.certMetric}>
          <Text style={styles.certMetricLabel}>Completed</Text>
          <Text style={[styles.certMetricValue, { color: THEME.emeraldGreen }]}>{cert.completed}%</Text>
        </View>
      </View>
      <View style={styles.certProgress}>
        <View style={styles.certProgressSegment}>
          <View style={[styles.certProgressFill, { width: `${cert.completed}%`, backgroundColor: THEME.emeraldGreen }]} />
        </View>
        <View style={styles.certProgressSegment}>
          <View style={[styles.certProgressFill, { width: `${cert.inProgress}%`, backgroundColor: THEME.amber }]} />
        </View>
        <View style={styles.certProgressSegment}>
          <View style={[styles.certProgressFill, { width: `${cert.notStarted}%`, backgroundColor: THEME.cardLight }]} />
        </View>
      </View>
      <View style={styles.certLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: THEME.emeraldGreen }]} />
          <Text style={styles.legendText}>Completed</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: THEME.amber }]} />
          <Text style={styles.legendText}>In Progress</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: THEME.cardLight }]} />
          <Text style={styles.legendText}>Not Started</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      performance: THEME.neonCyan,
      engagement: THEME.emeraldGreen,
      certification: THEME.purple,
    };
    const typeIcons = {
      performance: TrendingUp,
      engagement: Flame,
      certification: Award,
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
            <ClipboardCheck size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Assessment Intelligence Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Assessment Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Assessment Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Total Exams', ASSESSMENT_DATA.totalExams.toString(), THEME.neonCyan, 'This quarter')}
              {renderMetricCard('Total Assignments', ASSESSMENT_DATA.totalAssignments, THEME.electricBlue, 'All time')}
              {renderMetricCard('Avg Quiz Score', `${ASSESSMENT_DATA.avgQuizScore}%`, THEME.emeraldGreen, 'Performance')}
              {renderMetricCard('Skill Assessment', `${ASSESSMENT_DATA.skillAssessmentRate}%`, THEME.purple, 'Completion rate')}
              {renderMetricCard('Certification Progress', `${ASSESSMENT_DATA.certificationProgress}%`, THEME.amber, 'Overall progress')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Recent Exams */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Recent Exams</Text>
          </View>
          <View style={styles.examsContainer}>
            {RECENT_EXAMS.map((exam) => renderExamCard(exam))}
          </View>
        </Animated.View>

        {/* Assignment Performance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <FileText size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Assignment Performance</Text>
          </View>
          <View style={styles.assignmentsContainer}>
            {ASSIGNMENT_PERFORMANCE.map((assignment) => renderAssignmentCard(assignment))}
          </View>
        </Animated.View>

        {/* Certification Progress */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Certification Progress</Text>
          </View>
          <View style={styles.certsContainer}>
            {CERTIFICATION_PROGRESS.map((cert) => renderCertificationCard(cert))}
          </View>
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
  examsContainer: {
    gap: 12,
  },
  examCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  examName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  examMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  examMetric: {
    alignItems: 'center',
  },
  examMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  examMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  examBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  examBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  assignmentsContainer: {
    gap: 12,
  },
  assignmentCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assignmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  assignmentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assignmentMetric: {
    alignItems: 'center',
  },
  assignmentMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  assignmentMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  certsContainer: {
    gap: 12,
  },
  certCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  certName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  certOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  certMetric: {
    alignItems: 'center',
  },
  certMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  certMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  certProgress: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  certProgressSegment: {
    flex: 1,
    marginRight: 2,
  },
  certProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  certLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: THEME.textMuted,
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
