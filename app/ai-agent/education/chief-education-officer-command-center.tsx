/**
 * =============================================================================
 * CHIEF EDUCATION OFFICER COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive executive education dashboard that monitors student success,
 * academic performance, institutional health, faculty productivity, and AI-powered
 * learning intelligence across the global education ecosystem.
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
  GraduationCap,
  BookOpen,
  TrendingUp,
  DollarSign,
  Brain,
  Award,
  Activity,
  Globe,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Shield,
  Clock,
  BarChart3,
  LineChart,
  PieChart,
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

// Executive KPI Data
const EXECUTIVE_KPIS = {
  students: {
    total: '1.8M',
    active: '1.6M',
    completionRate: 91,
    graduationRate: 88,
    satisfaction: 94,
  },
  academic: {
    avgGpa: 3.42,
    assessmentPerformance: 87,
    learningProgress: 76,
    curriculumEffectiveness: 89,
    facultyProductivity: 92,
  },
  financial: {
    tuitionRevenue: '$4.2B',
    enrollmentGrowth: 12,
    scholarshipAllocation: '$890M',
    retentionRevenue: '$3.8B',
    lifetimeValue: '$45K',
  },
  engagement: {
    dailyLearningHours: '4.2h',
    attendanceRate: 94,
    communityParticipation: 78,
    assignmentCompletion: 91,
    learningConsistency: 87,
  },
  ai: {
    tutorSessions: '12.5M',
    recommendations: '8.7M',
    interventionSuccess: 89,
    riskPredictions: '2.4M',
    academicImpact: 12,
  },
};

// AI Education Agents
const EDUCATION_AGENTS = [
  {
    id: 'scholar',
    name: 'Agent Scholar',
    role: 'Student Success Agent',
    icon: GraduationCap,
    color: THEME.neonCyan,
    metrics: { studentsAssisted: '847K', successRate: 94, gpaImprovement: 0.34 },
  },
  {
    id: 'mentor',
    name: 'Agent Mentor',
    role: 'AI Tutor Agent',
    icon: BookOpen,
    color: THEME.electricBlue,
    metrics: { sessions: '12.5M', satisfaction: 96, retention: 89 },
  },
  {
    id: 'compass',
    name: 'Agent Compass',
    role: 'Admissions Agent',
    icon: Target,
    color: THEME.emeraldGreen,
    metrics: { applications: '2.4M', enrollmentGrowth: 15, conversionRate: 78 },
  },
  {
    id: 'insight',
    name: 'Agent Insight',
    role: 'Academic Analytics Agent',
    icon: BarChart3,
    color: THEME.purple,
    metrics: { reports: '156K', accuracy: 94, improvements: 89 },
  },
  {
    id: 'career',
    name: 'Agent Career',
    role: 'Career Readiness Agent',
    icon: Award,
    color: THEME.amber,
    metrics: { placements: '425K', internships: '89K', successRate: 92 },
  },
  {
    id: 'researcher',
    name: 'Agent Researcher',
    role: 'Research Intelligence Agent',
    icon: Brain,
    color: THEME.magenta,
    metrics: { papers: '45K', opportunities: '12K', impact: 87 },
  },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'performance',
    title: 'Learning Performance',
    message: 'Students in Data Science courses show 18% higher completion rates with AI tutoring.',
    impact: 'High',
    action: 'Expand AI tutoring to STEM programs',
  },
  {
    type: 'intervention',
    title: 'Student Intervention',
    message: 'Early intervention could improve graduation rates by 6% across all programs.',
    impact: 'Critical',
    action: 'Deploy proactive intervention system',
  },
  {
    type: 'engagement',
    title: 'AI Tutor Impact',
    message: 'AI Tutor usage correlates with a 12% GPA increase among active users.',
    impact: 'Positive',
    action: 'Increase AI Tutor promotion',
  },
  {
    type: 'enrollment',
    title: 'Enrollment Forecast',
    message: 'Enrollment demand for AI-related programs is projected to grow 34% next semester.',
    impact: 'High',
    action: 'Expand AI program capacity',
  },
  {
    type: 'curriculum',
    title: 'Curriculum Optimization',
    message: 'Curriculum update opportunity identified for STEM courses based on industry trends.',
    impact: 'Medium',
    action: 'Initiate curriculum review process',
  },
];

// Real-Time Activity Feed
const ACTIVITY_FEED = [
  { event: 'Student enrolled', time: '2 min ago', type: 'enrollment' },
  { event: 'Course completed', time: '5 min ago', type: 'achievement' },
  { event: 'Exam submitted', time: '8 min ago', type: 'assessment' },
  { event: 'AI tutoring session started', time: '12 min ago', type: 'tutoring' },
  { event: 'Scholarship awarded', time: '15 min ago', type: 'financial' },
  { event: 'Faculty published research', time: '18 min ago', type: 'research' },
  { event: 'Internship secured', time: '22 min ago', type: 'career' },
  { event: 'Certification achieved', time: '25 min ago', type: 'achievement' },
];

export default function ChiefEducationOfficerCommandCenter() {
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

  const renderKPICard = (title: string, value: string, subtitle: string, color: string, trend?: { value: number, direction: string }) => (
    <BlurView intensity={20} tint="dark" style={styles.kpiCard}>
      <Text style={styles.kpiLabel}>{title}</Text>
      <Text style={[styles.kpiValue, { color }]}>{value}</Text>
      <Text style={styles.kpiSubtitle}>{subtitle}</Text>
      {trend && renderTrendIndicator(trend.value, trend.direction)}
    </BlurView>
  );

  const renderAgentCard = (agent: typeof EDUCATION_AGENTS[0]) => {
    const Icon = agent.icon;
    return (
      <BlurView key={agent.id} intensity={20} tint="dark" style={styles.agentCard}>
        <View style={[styles.agentIcon, { backgroundColor: agent.color + '20' }]}>
          <Icon size={24} color={agent.color} />
        </View>
        <Text style={styles.agentName}>{agent.name}</Text>
        <Text style={styles.agentRole}>{agent.role}</Text>
        <View style={styles.agentMetrics}>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Students</Text>
            <Text style={[styles.agentMetricValue, { color: agent.color }]}>{agent.metrics.studentsAssisted || agent.metrics.sessions || agent.metrics.applications || agent.metrics.reports || agent.metrics.placements || agent.metrics.papers}</Text>
          </View>
          <View style={styles.agentMetric}>
            <Text style={styles.agentMetricLabel}>Success</Text>
            <Text style={[styles.agentMetricValue, { color: agent.color }]}>{agent.metrics.successRate || agent.metrics.satisfaction || agent.metrics.enrollmentGrowth || agent.metrics.accuracy || agent.metrics.successRate || agent.metrics.impact}%</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      performance: THEME.neonCyan,
      intervention: THEME.red,
      engagement: THEME.emeraldGreen,
      enrollment: THEME.electricBlue,
      curriculum: THEME.purple,
    };
    const typeIcons = {
      performance: TrendingUp,
      intervention: Shield,
      engagement: Flame,
      enrollment: Users,
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

  const renderActivityItem = (activity: typeof ACTIVITY_FEED[0]) => {
    const typeColors = {
      enrollment: THEME.neonCyan,
      achievement: THEME.emeraldGreen,
      assessment: THEME.purple,
      tutoring: THEME.electricBlue,
      financial: THEME.amber,
      research: THEME.magenta,
      career: THEME.red,
    };
    const color = typeColors[activity.type as keyof typeof typeColors];

    return (
      <View key={activity.time} style={styles.activityItem}>
        <View style={[styles.activityDot, { backgroundColor: color }]} />
        <View style={styles.activityContent}>
          <Text style={styles.activityEvent}>{activity.event}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
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
            <Text style={styles.headerText}>Chief Education Officer Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Executive KPIs */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <BarChart3 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Executive KPIs</Text>
          </View>
          
          {/* Student KPIs */}
          <Text style={styles.kpiSectionTitle}>Student KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Total Students', EXECUTIVE_KPIS.students.total, 'Active learners', THEME.neonCyan, { value: 12, direction: 'up' })}
              {renderKPICard('Active Learners', EXECUTIVE_KPIS.students.active, 'Currently enrolled', THEME.electricBlue, { value: 8, direction: 'up' })}
              {renderKPICard('Completion Rate', `${EXECUTIVE_KPIS.students.completionRate}%`, 'Course completion', THEME.emeraldGreen, { value: 5, direction: 'up' })}
              {renderKPICard('Graduation Rate', `${EXECUTIVE_KPIS.students.graduationRate}%`, 'On-time graduation', THEME.purple, { value: 3, direction: 'up' })}
              {renderKPICard('Satisfaction', `${EXECUTIVE_KPIS.students.satisfaction}%`, 'Student feedback', THEME.amber, { value: 2, direction: 'up' })}
            </View>
          </ScrollView>

          {/* Academic KPIs */}
          <Text style={styles.kpiSectionTitle}>Academic KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Average GPA', EXECUTIVE_KPIS.academic.avgGpa.toFixed(2), 'Overall performance', THEME.neonCyan, { value: 4, direction: 'up' })}
              {renderKPICard('Assessment Performance', `${EXECUTIVE_KPIS.academic.assessmentPerformance}%`, 'Test scores', THEME.electricBlue, { value: 6, direction: 'up' })}
              {renderKPICard('Learning Progress', `${EXECUTIVE_KPIS.academic.learningProgress}%`, 'Course progress', THEME.emeraldGreen, { value: 8, direction: 'up' })}
              {renderKPICard('Curriculum Effectiveness', `${EXECUTIVE_KPIS.academic.curriculumEffectiveness}%`, 'Learning outcomes', THEME.purple, { value: 3, direction: 'up' })}
              {renderKPICard('Faculty Productivity', `${EXECUTIVE_KPIS.academic.facultyProductivity}%`, 'Teaching efficiency', THEME.amber, { value: 5, direction: 'up' })}
            </View>
          </ScrollView>

          {/* Financial KPIs */}
          <Text style={styles.kpiSectionTitle}>Financial KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Tuition Revenue', EXECUTIVE_KPIS.financial.tuitionRevenue, 'Annual revenue', THEME.neonCyan, { value: 15, direction: 'up' })}
              {renderKPICard('Enrollment Growth', `${EXECUTIVE_KPIS.financial.enrollmentGrowth}%`, 'YoY growth', THEME.emeraldGreen, { value: 12, direction: 'up' })}
              {renderKPICard('Scholarship Allocation', EXECUTIVE_KPIS.financial.scholarshipAllocation, 'Financial aid', THEME.amber, { value: 8, direction: 'up' })}
              {renderKPICard('Retention Revenue', EXECUTIVE_KPIS.financial.retentionRevenue, 'Recurring revenue', THEME.purple, { value: 10, direction: 'up' })}
              {renderKPICard('Lifetime Value', EXECUTIVE_KPIS.financial.lifetimeValue, 'Per student', THEME.electricBlue, { value: 7, direction: 'up' })}
            </View>
          </ScrollView>

          {/* Engagement KPIs */}
          <Text style={styles.kpiSectionTitle}>Engagement KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('Daily Learning Hours', EXECUTIVE_KPIS.engagement.dailyLearningHours, 'Avg per student', THEME.neonCyan, { value: 5, direction: 'up' })}
              {renderKPICard('Attendance Rate', `${EXECUTIVE_KPIS.engagement.attendanceRate}%`, 'Class attendance', THEME.emeraldGreen, { value: 2, direction: 'up' })}
              {renderKPICard('Community Participation', `${EXECUTIVE_KPIS.engagement.communityParticipation}%`, 'Forum activity', THEME.purple, { value: 12, direction: 'up' })}
              {renderKPICard('Assignment Completion', `${EXECUTIVE_KPIS.engagement.assignmentCompletion}%`, 'Task completion', THEME.electricBlue, { value: 4, direction: 'up' })}
              {renderKPICard('Learning Consistency', `${EXECUTIVE_KPIS.engagement.learningConsistency}%`, 'Regular engagement', THEME.amber, { value: 6, direction: 'up' })}
            </View>
          </ScrollView>

          {/* AI KPIs */}
          <Text style={styles.kpiSectionTitle}>AI KPIs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
            <View style={styles.kpiContainer}>
              {renderKPICard('AI Tutor Sessions', EXECUTIVE_KPIS.ai.tutorSessions, 'Total sessions', THEME.neonCyan, { value: 25, direction: 'up' })}
              {renderKPICard('Recommendations', EXECUTIVE_KPIS.ai.recommendations, 'AI suggestions', THEME.electricBlue, { value: 18, direction: 'up' })}
              {renderKPICard('Intervention Success', `${EXECUTIVE_KPIS.ai.interventionSuccess}%`, 'Success rate', THEME.emeraldGreen, { value: 8, direction: 'up' })}
              {renderKPICard('Risk Predictions', EXECUTIVE_KPIS.ai.riskPredictions, 'Students identified', THEME.amber, { value: 15, direction: 'up' })}
              {renderKPICard('Academic Impact', `${EXECUTIVE_KPIS.ai.academicImpact}%`, 'GPA improvement', THEME.purple, { value: 12, direction: 'up' })}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Education Agents */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Brain size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Education Agents</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.agentsScroll}>
            <View style={styles.agentsContainer}>
              {EDUCATION_AGENTS.map((agent) => renderAgentCard(agent))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Zap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Insights</Text>
          </View>
          <View style={styles.insightsContainer}>
            {AI_INSIGHTS.map((insight) => renderInsightCard(insight))}
          </View>
        </Animated.View>

        {/* Real-Time Activity Feed */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Real-Time Activity Feed</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.activityFeedCard}>
            {ACTIVITY_FEED.map((activity) => renderActivityItem(activity))}
          </BlurView>
        </Animated.View>

        {/* Global Education Overview */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Global Education Overview</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.globalCard}>
            <View style={styles.globalMetrics}>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Campuses</Text>
                <Text style={[styles.globalValue, { color: THEME.neonCyan }]}>247</Text>
              </View>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Countries</Text>
                <Text style={[styles.globalValue, { color: THEME.electricBlue }]}>89</Text>
              </View>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Programs</Text>
                <Text style={[styles.globalValue, { color: THEME.emeraldGreen }]}>1,247</Text>
              </View>
              <View style={styles.globalMetric}>
                <Text style={styles.globalLabel}>Faculty</Text>
                <Text style={[styles.globalValue, { color: THEME.purple }]}>42K</Text>
              </View>
            </View>
          </BlurView>
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
  kpiSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.textMuted,
    marginTop: 16,
    marginBottom: 12,
  },
  kpiScroll: {
    marginBottom: 0,
  },
  kpiContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  kpiCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  kpiLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  kpiSubtitle: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  agentsScroll: {
    marginBottom: 0,
  },
  agentsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  agentCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    alignItems: 'center',
  },
  agentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  agentName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 4,
  },
  agentRole: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 12,
    textAlign: 'center',
  },
  agentMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  agentMetric: {
    alignItems: 'center',
  },
  agentMetricLabel: {
    fontSize: 10,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  agentMetricValue: {
    fontSize: 12,
    fontWeight: '600',
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
  activityFeedCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityEvent: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: THEME.textMuted,
  },
  globalCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  globalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  globalMetric: {
    alignItems: 'center',
  },
  globalLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  globalValue: {
    fontSize: 24,
    fontWeight: '700',
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
