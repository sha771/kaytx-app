/**
 * =============================================================================
 * STUDENT INTELLIGENCE HUB
 * =============================================================================
 *
 * A comprehensive student intelligence dashboard that tracks learning progress,
 * attendance, engagement, academic performance, and risk assessment with AI-powered
 * insights and intervention recommendations.
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
  AlertTriangle,
  Target,
  Flame,
  Heart,
  Award,
  BarChart3,
  LineChart,
  PieChart,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Zap,
  Shield,
  GraduationCap,
  BookOpen,
  Activity,
  Map,
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

// Student Segments
const STUDENT_SEGMENTS = [
  { name: 'New Students', count: '245K', percentage: 13.6, color: THEME.neonCyan },
  { name: 'Active Learners', count: '1.2M', percentage: 66.7, color: THEME.electricBlue },
  { name: 'At-Risk', count: '89K', percentage: 4.9, color: THEME.red },
  { name: 'High Performers', count: '267K', percentage: 14.8, color: THEME.emeraldGreen },
];

// Learning Progress Data
const LEARNING_PROGRESS = {
  overall: 76,
  byProgram: {
    'Data Science': 82,
    'Computer Science': 78,
    'Business Analytics': 74,
    'Digital Marketing': 71,
    'UX Design': 68,
  },
  completionRates: {
    week1: 94,
    week2: 89,
    week3: 84,
    week4: 79,
    week5: 76,
    week6: 73,
  },
};

// Risk Assessment
const RISK_ASSESSMENT = {
  high: 4.9,
  medium: 12.3,
  low: 82.8,
  interventions: {
    deployed: 1247,
    successful: 892,
    pending: 355,
  },
};

// At-Risk Students
const AT_RISK_STUDENTS = [
  { id: 1, name: 'Sarah Johnson', risk: 'High', program: 'Data Science', lastActive: '5 days ago', gpa: 2.1, attendance: 68 },
  { id: 2, name: 'Michael Chen', risk: 'High', program: 'Computer Science', lastActive: '7 days ago', gpa: 2.3, attendance: 72 },
  { id: 3, name: 'Emily Rodriguez', risk: 'Medium', program: 'Business Analytics', lastActive: '10 days ago', gpa: 2.5, attendance: 78 },
  { id: 4, name: 'David Kim', risk: 'Medium', program: 'Digital Marketing', lastActive: '12 days ago', gpa: 2.4, attendance: 75 },
  { id: 5, name: 'Jessica Taylor', risk: 'Low', program: 'UX Design', lastActive: '14 days ago', gpa: 2.7, attendance: 82 },
];

// Engagement Metrics
const ENGAGEMENT_METRICS = {
  dailyActive: 87,
  weeklyActive: 92,
  monthlyActive: 100,
  avgSessionDuration: '4.2h',
  avgWeeklyHours: '18.5h',
  consistencyScore: 84,
};

// AI Recommendations
const AI_RECOMMENDATIONS = [
  {
    type: 'intervention',
    title: 'Immediate Intervention Required',
    message: '89 students showing critical risk factors. Targeted outreach recommended within 24 hours.',
    impact: 'Critical',
    action: 'Deploy intervention team for high-risk students',
  },
  {
    type: 'engagement',
    title: 'Engagement Opportunity',
    message: 'Students who participate in discussion forums show 23% higher completion rates.',
    impact: 'High',
    action: 'Increase forum engagement initiatives',
  },
  {
    type: 'progress',
    title: 'Learning Path Optimization',
    message: 'Adaptive learning paths could improve completion rates by 15% for struggling students.',
    impact: 'Medium',
    action: 'Implement personalized learning pathways',
  },
];

export default function StudentIntelligenceHub() {
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

  const renderSegmentCard = (segment: typeof STUDENT_SEGMENTS[0]) => (
    <BlurView key={segment.name} intensity={20} tint="dark" style={styles.segmentCard}>
      <View style={[styles.segmentIndicator, { backgroundColor: segment.color }]} />
      <Text style={styles.segmentName}>{segment.name}</Text>
      <Text style={[styles.segmentCount, { color: segment.color }]}>{segment.count}</Text>
      <Text style={styles.segmentPercentage}>{segment.percentage}%</Text>
    </BlurView>
  );

  const renderProgressChart = () => {
    const data = [94, 89, 84, 79, 76, 73];
    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];
    const maxVal = Math.max(...data);
    const chartWidth = SCREEN_WIDTH - 64;
    const chartHeight = 200;
    const barWidth = (chartWidth / data.length) - 20;

    return (
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {data.map((val, idx) => {
            const barHeight = (val / maxVal) * (chartHeight - 40);
            const x = idx * (chartWidth / data.length) + 10;
            const y = chartHeight - barHeight - 30;
            return (
              <React.Fragment key={idx}>
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={THEME.neonCyan}
                  opacity={0.8}
                  rx={4}
                />
                <Text
                  x={x + barWidth / 2}
                  y={y - 10}
                  fill={THEME.text}
                  fontSize={12}
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {val}%
                </Text>
                <Text
                  x={x + barWidth / 2}
                  y={chartHeight - 10}
                  fill={THEME.textMuted}
                  fontSize={10}
                  textAnchor="middle"
                >
                  {labels[idx]}
                </Text>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    );
  };

  const renderRiskCard = (student: typeof AT_RISK_STUDENTS[0]) => {
    const riskColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.emeraldGreen,
    };
    const riskColor = riskColors[student.risk as keyof typeof riskColors];

    return (
      <BlurView key={student.id} intensity={20} tint="dark" style={styles.riskCard}>
        <View style={styles.riskHeader}>
          <Text style={styles.riskStudentName}>{student.name}</Text>
          <View style={[styles.riskBadge, { backgroundColor: riskColor + '30' }]}>
            <Text style={[styles.riskBadgeText, { color: riskColor }]}>{student.risk}</Text>
          </View>
        </View>
        <View style={styles.riskDetails}>
          <View style={styles.riskDetail}>
            <Text style={styles.riskDetailLabel}>Program</Text>
            <Text style={styles.riskDetailValue}>{student.program}</Text>
          </View>
          <View style={styles.riskDetail}>
            <Text style={styles.riskDetailLabel}>Last Active</Text>
            <Text style={styles.riskDetailValue}>{student.lastActive}</Text>
          </View>
          <View style={styles.riskDetail}>
            <Text style={styles.riskDetailLabel}>GPA</Text>
            <Text style={[styles.riskDetailValue, { color: riskColor }]}>{student.gpa}</Text>
          </View>
          <View style={styles.riskDetail}>
            <Text style={styles.riskDetailLabel}>Attendance</Text>
            <Text style={[styles.riskDetailValue, { color: THEME.electricBlue }]}>{student.attendance}%</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderRecommendationCard = (rec: typeof AI_RECOMMENDATIONS[0]) => {
    const typeColors = {
      intervention: THEME.red,
      engagement: THEME.emeraldGreen,
      progress: THEME.neonCyan,
    };
    const typeIcons = {
      intervention: AlertTriangle,
      engagement: Flame,
      progress: TrendingUp,
    };
    const Icon = typeIcons[rec.type as keyof typeof typeIcons];
    const color = typeColors[rec.type as keyof typeof typeColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.recommendationCard}>
        <BlurView intensity={20} tint="dark" style={styles.recommendationCardBlur}>
          <View style={styles.recommendationHeader}>
            <View style={[styles.recommendationIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.recommendationMeta}>
              <Text style={styles.recommendationTitle}>{rec.title}</Text>
              <View style={[styles.recommendationImpact, { backgroundColor: color + '30' }]}>
                <Text style={[styles.recommendationImpactText, { color }]}>{rec.impact}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.recommendationMessage}>{rec.message}</Text>
          <View style={styles.recommendationAction}>
            <Text style={styles.recommendationActionLabel}>Suggested Action:</Text>
            <Text style={styles.recommendationActionText}>{rec.action}</Text>
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
            <Users size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Student Intelligence Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Student Segments */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Student Segments</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.segmentsScroll}>
            <View style={styles.segmentsContainer}>
              {STUDENT_SEGMENTS.map((segment) => renderSegmentCard(segment))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Learning Progress */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Learning Progress</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.progressCard}>
            <View style={styles.progressOverview}>
              <View style={styles.progressMetric}>
                <Text style={styles.progressLabel}>Overall Progress</Text>
                <Text style={[styles.progressValue, { color: THEME.neonCyan }]}>{LEARNING_PROGRESS.overall}%</Text>
              </View>
              <View style={styles.progressMetric}>
                <Text style={styles.progressLabel}>Avg Session Duration</Text>
                <Text style={[styles.progressValue, { color: THEME.electricBlue }]}>{ENGAGEMENT_METRICS.avgSessionDuration}</Text>
              </View>
              <View style={styles.progressMetric}>
                <Text style={styles.progressLabel}>Avg Weekly Hours</Text>
                <Text style={[styles.progressValue, { color: THEME.emeraldGreen }]}>{ENGAGEMENT_METRICS.avgWeeklyHours}</Text>
              </View>
              <View style={styles.progressMetric}>
                <Text style={styles.progressLabel}>Consistency Score</Text>
                <Text style={[styles.progressValue, { color: THEME.purple }]}>{ENGAGEMENT_METRICS.consistencyScore}%</Text>
              </View>
            </View>
            {renderProgressChart()}
          </BlurView>
        </Animated.View>

        {/* Risk Assessment */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={THEME.red} />
            <Text style={styles.sectionTitle}>Risk Assessment</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.riskOverviewCard}>
            <View style={styles.riskOverview}>
              <View style={styles.riskItem}>
                <Text style={styles.riskLabel}>High Risk</Text>
                <Text style={[styles.riskValue, { color: THEME.red }]}>{RISK_ASSESSMENT.high}%</Text>
              </View>
              <View style={styles.riskItem}>
                <Text style={styles.riskLabel}>Medium Risk</Text>
                <Text style={[styles.riskValue, { color: THEME.amber }]}>{RISK_ASSESSMENT.medium}%</Text>
              </View>
              <View style={styles.riskItem}>
                <Text style={styles.riskLabel}>Low Risk</Text>
                <Text style={[styles.riskValue, { color: THEME.emeraldGreen }]}>{RISK_ASSESSMENT.low}%</Text>
              </View>
            </View>
            <View style={styles.interventionStats}>
              <View style={styles.interventionStat}>
                <Text style={styles.interventionLabel}>Interventions Deployed</Text>
                <Text style={[styles.interventionValue, { color: THEME.neonCyan }]}>{RISK_ASSESSMENT.interventions.deployed}</Text>
              </View>
              <View style={styles.interventionStat}>
                <Text style={styles.interventionLabel}>Successful</Text>
                <Text style={[styles.interventionValue, { color: THEME.emeraldGreen }]}>{RISK_ASSESSMENT.interventions.successful}</Text>
              </View>
              <View style={styles.interventionStat}>
                <Text style={styles.interventionLabel}>Pending</Text>
                <Text style={[styles.interventionValue, { color: THEME.amber }]}>{RISK_ASSESSMENT.interventions.pending}</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.riskStudentsContainer}>
            {AT_RISK_STUDENTS.map((student) => renderRiskCard(student))}
          </View>
        </Animated.View>

        {/* Engagement Metrics */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flame size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Engagement Metrics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.engagementCard}>
            <View style={styles.engagementGrid}>
              <View style={styles.engagementMetric}>
                <Text style={styles.engagementLabel}>Daily Active</Text>
                <Text style={[styles.engagementValue, { color: THEME.emeraldGreen }]}>{ENGAGEMENT_METRICS.dailyActive}%</Text>
              </View>
              <View style={styles.engagementMetric}>
                <Text style={styles.engagementLabel}>Weekly Active</Text>
                <Text style={[styles.engagementValue, { color: THEME.electricBlue }]}>{ENGAGEMENT_METRICS.weeklyActive}%</Text>
              </View>
              <View style={styles.engagementMetric}>
                <Text style={styles.engagementLabel}>Monthly Active</Text>
                <Text style={[styles.engagementValue, { color: THEME.purple }]}>{ENGAGEMENT_METRICS.monthlyActive}%</Text>
              </View>
              <View style={styles.engagementMetric}>
                <Text style={styles.engagementLabel}>Consistency</Text>
                <Text style={[styles.engagementValue, { color: THEME.amber }]}>{ENGAGEMENT_METRICS.consistencyScore}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Recommendations */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Recommendations</Text>
          </View>
          <View style={styles.recommendationsContainer}>
            {AI_RECOMMENDATIONS.map((rec) => renderRecommendationCard(rec))}
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
  segmentsScroll: {
    marginBottom: 0,
  },
  segmentsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  segmentCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: 'hidden',
  },
  segmentIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  segmentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 8,
  },
  segmentCount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  segmentPercentage: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  progressCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  progressOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressMetric: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartContainer: {
    marginTop: 16,
  },
  riskOverviewCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  riskOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  riskItem: {
    alignItems: 'center',
  },
  riskLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  riskValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  interventionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    paddingTop: 16,
  },
  interventionStat: {
    alignItems: 'center',
  },
  interventionLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  interventionValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  riskStudentsContainer: {
    gap: 12,
  },
  riskCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  riskStudentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  riskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  riskDetail: {
    flex: 1,
  },
  riskDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  riskDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  engagementCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  engagementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  engagementMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  engagementLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  engagementValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  recommendationsContainer: {
    gap: 12,
  },
  recommendationCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  recommendationCardBlur: {
    padding: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  recommendationMeta: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  recommendationImpact: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  recommendationImpactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  recommendationMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  recommendationAction: {
    backgroundColor: THEME.card,
    padding: 12,
    borderRadius: 8,
  },
  recommendationActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
    marginBottom: 4,
  },
  recommendationActionText: {
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
