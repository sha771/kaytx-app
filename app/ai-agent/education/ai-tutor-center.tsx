/**
 * =============================================================================
 * AI TUTOR CENTER
 * =============================================================================
 *
 * A comprehensive AI tutoring dashboard that displays active tutor sessions,
 * personalized learning plans, student questions, tutoring performance, and
 * knowledge recommendations with AI-powered insights.
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
  MessageSquare,
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
  Lightbulb,
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

// AI Tutor Data
const TUTOR_DATA = {
  activeSessions: 1247,
  totalSessions: '12.5M',
  avgSessionDuration: '18.5min',
  satisfactionRate: 96,
  knowledgeRetention: 87,
  trend: [1200, 1220, 1230, 1240, 1245, 1247],
};

// Learning Plans
const LEARNING_PLANS = [
  { name: 'Data Science Path', students: '45.2K', completion: 78, satisfaction: 94 },
  { name: 'Machine Learning Track', students: '38.7K', completion: 74, satisfaction: 92 },
  { name: 'Python Mastery', students: '52.1K', completion: 82, satisfaction: 95 },
  { name: 'Statistics Fundamentals', students: '28.9K', completion: 71, satisfaction: 89 },
];

// Student Questions
const STUDENT_QUESTIONS = [
  { id: 1, question: 'How do I implement gradient descent?', subject: 'Machine Learning', difficulty: 'Medium', answered: true },
  { id: 2, question: 'What is the difference between supervised and unsupervised learning?', subject: 'AI Fundamentals', difficulty: 'Easy', answered: true },
  { id: 3, question: 'Explain backpropagation in neural networks', subject: 'Deep Learning', difficulty: 'Hard', answered: false },
  { id: 4, question: 'How to handle missing data in datasets?', subject: 'Data Preprocessing', difficulty: 'Medium', answered: true },
  { id: 5, question: 'What are the best practices for model evaluation?', subject: 'Model Evaluation', difficulty: 'Medium', answered: false },
];

// Tutoring Performance
const TUTORING_PERFORMANCE = {
  responseTime: '2.3s',
  accuracy: 94,
  helpfulness: 96,
  followUpRate: 78,
  resolutionRate: 89,
};

// Knowledge Recommendations
const KNOWLEDGE_RECOMMENDATIONS = [
  { topic: 'Linear Algebra', priority: 'High', students: '12.4K', reason: 'Foundation for ML' },
  { topic: 'Calculus', priority: 'High', students: '10.8K', reason: 'Required for optimization' },
  { topic: 'Probability Theory', priority: 'Medium', students: '8.9K', reason: 'Essential for statistics' },
  { topic: 'Data Structures', priority: 'Medium', students: '7.2K', reason: 'Algorithm efficiency' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'performance',
    title: 'Tutor Performance',
    message: 'AI Tutor accuracy improved 8% after knowledge base expansion. Continue updating content.',
    impact: 'Positive',
    action: 'Expand knowledge base coverage',
  },
  {
    type: 'engagement',
    title: 'Session Engagement',
    message: 'Students who use AI Tutor show 23% higher course completion rates.',
    impact: 'High',
    action: 'Increase AI Tutor promotion',
  },
  {
    type: 'recommendation',
    title: 'Knowledge Gaps',
    message: 'Identified 47 knowledge gaps in advanced topics. Prioritize content creation.',
    impact: 'Medium',
    action: 'Create advanced topic content',
  },
];

export default function AITutorCenter() {
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

  const renderLearningPlanCard = (plan: typeof LEARNING_PLANS[0]) => (
    <BlurView key={plan.name} intensity={20} tint="dark" style={styles.planCard}>
      <Text style={styles.planName}>{plan.name}</Text>
      <View style={styles.planMetrics}>
        <View style={styles.planMetric}>
          <Text style={styles.planMetricLabel}>Students</Text>
          <Text style={[styles.planMetricValue, { color: THEME.neonCyan }]}>{plan.students}</Text>
        </View>
        <View style={styles.planMetric}>
          <Text style={styles.planMetricLabel}>Completion</Text>
          <Text style={[styles.planMetricValue, { color: THEME.emeraldGreen }]}>{plan.completion}%</Text>
        </View>
        <View style={styles.planMetric}>
          <Text style={styles.planMetricLabel}>Satisfaction</Text>
          <Text style={[styles.planMetricValue, { color: THEME.purple }]}>{plan.satisfaction}%</Text>
        </View>
      </View>
      <View style={styles.planBar}>
        <View style={[styles.planBarFill, { width: `${plan.completion}%`, backgroundColor: THEME.emeraldGreen }]} />
      </View>
    </BlurView>
  );

  const renderQuestionCard = (question: typeof STUDENT_QUESTIONS[0]) => (
    <BlurView key={question.id} intensity={20} tint="dark" style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={styles.questionText}>{question.question}</Text>
        {question.answered ? (
          <CheckCircle size={20} color={THEME.emeraldGreen} />
        ) : (
          <AlertCircle size={20} color={THEME.amber} />
        )}
      </View>
      <View style={styles.questionDetails}>
        <View style={styles.questionDetail}>
          <Text style={styles.questionDetailLabel}>Subject</Text>
          <Text style={styles.questionDetailValue}>{question.subject}</Text>
        </View>
        <View style={styles.questionDetail}>
          <Text style={styles.questionDetailLabel}>Difficulty</Text>
          <Text style={[styles.questionDetailValue, { color: question.difficulty === 'Hard' ? THEME.red : question.difficulty === 'Medium' ? THEME.amber : THEME.emeraldGreen }]}>{question.difficulty}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderRecommendationCard = (rec: typeof KNOWLEDGE_RECOMMENDATIONS[0]) => {
    const priorityColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.emeraldGreen,
    };
    const priorityColor = priorityColors[rec.priority as keyof typeof priorityColors];

    return (
      <BlurView key={rec.topic} intensity={20} tint="dark" style={styles.recommendationCard}>
        <View style={styles.recommendationHeader}>
          <Text style={styles.recommendationTopic}>{rec.topic}</Text>
          <View style={[styles.recommendationPriority, { backgroundColor: priorityColor + '30' }]}>
            <Text style={[styles.recommendationPriorityText, { color: priorityColor }]}>{rec.priority}</Text>
          </View>
        </View>
        <View style={styles.recommendationDetails}>
          <View style={styles.recommendationDetail}>
            <Text style={styles.recommendationDetailLabel}>Students</Text>
            <Text style={styles.recommendationDetailValue}>{rec.students}</Text>
          </View>
          <View style={styles.recommendationDetail}>
            <Text style={styles.recommendationDetailLabel}>Reason</Text>
            <Text style={styles.recommendationDetailValue}>{rec.reason}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      performance: THEME.emeraldGreen,
      engagement: THEME.neonCyan,
      recommendation: THEME.purple,
    };
    const typeIcons = {
      performance: TrendingUp,
      engagement: Flame,
      recommendation: Lightbulb,
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
            <Text style={styles.headerText}>AI Tutor Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Active Sessions */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Active Sessions</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Active Sessions', TUTOR_DATA.activeSessions.toString(), THEME.neonCyan, 'Currently active')}
              {renderMetricCard('Total Sessions', TUTOR_DATA.totalSessions, THEME.electricBlue, 'All time')}
              {renderMetricCard('Avg Duration', TUTOR_DATA.avgSessionDuration, THEME.emeraldGreen, 'Per session')}
              {renderMetricCard('Satisfaction', `${TUTOR_DATA.satisfactionRate}%`, THEME.purple, 'Student feedback')}
              {renderMetricCard('Knowledge Retention', `${TUTOR_DATA.knowledgeRetention}%`, THEME.amber, 'Post-session')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Learning Plans */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Personalized Learning Plans</Text>
          </View>
          <View style={styles.plansContainer}>
            {LEARNING_PLANS.map((plan) => renderLearningPlanCard(plan))}
          </View>
        </Animated.View>

        {/* Student Questions */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Student Questions</Text>
          </View>
          <View style={styles.questionsContainer}>
            {STUDENT_QUESTIONS.map((question) => renderQuestionCard(question))}
          </View>
        </Animated.View>

        {/* Tutoring Performance */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Tutoring Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.performanceCard}>
            <View style={styles.performanceGrid}>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Response Time</Text>
                <Text style={[styles.performanceValue, { color: THEME.neonCyan }]}>{TUTORING_PERFORMANCE.responseTime}</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Accuracy</Text>
                <Text style={[styles.performanceValue, { color: THEME.electricBlue }]}>{TUTORING_PERFORMANCE.accuracy}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Helpfulness</Text>
                <Text style={[styles.performanceValue, { color: THEME.emeraldGreen }]}>{TUTORING_PERFORMANCE.helpfulness}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Follow-up Rate</Text>
                <Text style={[styles.performanceValue, { color: THEME.purple }]}>{TUTORING_PERFORMANCE.followUpRate}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Resolution Rate</Text>
                <Text style={[styles.performanceValue, { color: THEME.amber }]}>{TUTORING_PERFORMANCE.resolutionRate}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Knowledge Recommendations */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Knowledge Recommendations</Text>
          </View>
          <View style={styles.recommendationsContainer}>
            {KNOWLEDGE_RECOMMENDATIONS.map((rec) => renderRecommendationCard(rec))}
          </View>
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
  plansContainer: {
    gap: 12,
  },
  planCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  planName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  planMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planMetric: {
    alignItems: 'center',
  },
  planMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  planMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  planBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  planBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  questionsContainer: {
    gap: 12,
  },
  questionCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: THEME.text,
    marginRight: 12,
  },
  questionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionDetail: {
    flex: 1,
  },
  questionDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  questionDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  performanceCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  performanceMetric: {
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
    fontSize: 20,
    fontWeight: '700',
  },
  recommendationsContainer: {
    gap: 12,
  },
  recommendationCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationTopic: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  recommendationPriority: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendationPriorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  recommendationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationDetail: {
    flex: 1,
  },
  recommendationDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  recommendationDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
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
