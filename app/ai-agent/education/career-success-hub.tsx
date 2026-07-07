/**
 * =============================================================================
 * CAREER SUCCESS HUB
 * =============================================================================
 *
 * A comprehensive career services dashboard that tracks job placements, internship
 * opportunities, employer partnerships, graduate outcomes, and salary analytics with
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
  Briefcase,
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
  Building2,
  DollarSign,
  GraduationCap,
  CheckCircle,
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

// Career Data
const CAREER_DATA = {
  totalPlacements: '425K',
  internshipMatches: '89K',
  careerSuccessRate: 92,
  avgSalary: '$87K',
  employerPartnerships: 1247,
  trend: [420, 421, 422, 423, 424, 425],
};

// Top Employers
const TOP_EMPLOYERS = [
  { name: 'Google', placements: '12.4K', avgSalary: '$145K', satisfaction: 94 },
  { name: 'Microsoft', placements: '10.8K', avgSalary: '$138K', satisfaction: 92 },
  { name: 'Amazon', placements: '9.7K', avgSalary: '$132K', satisfaction: 89 },
  { name: 'Meta', placements: '8.2K', avgSalary: '$142K', satisfaction: 91 },
  { name: 'Apple', placements: '7.5K', avgSalary: '$139K', satisfaction: 93 },
];

// Industry Demand
const INDUSTRY_DEMAND = [
  { industry: 'Data Science', demand: 94, growth: 34, avgSalary: '$125K' },
  { industry: 'Machine Learning', demand: 91, growth: 45, avgSalary: '$142K' },
  { industry: 'Software Engineering', demand: 88, growth: 22, avgSalary: '$118K' },
  { industry: 'Product Management', demand: 85, growth: 18, avgSalary: '$135K' },
  { industry: 'UX Design', demand: 82, growth: 28, avgSalary: '$108K' },
];

// Graduate Outcomes
const GRADUATE_OUTCOMES = {
  employedWithin3Months: 87,
  employedWithin6Months: 94,
  avgJobSearchTime: '2.4 months',
  salaryIncrease: 45,
  careerSatisfaction: 89,
};

// Internship Opportunities
const INTERNSHIP_OPPORTUNITIES = [
  { company: 'Google Research', positions: 245, type: 'Paid', duration: '12 weeks' },
  { company: 'Microsoft AI', positions: 189, type: 'Paid', duration: '16 weeks' },
  { company: 'Amazon ML', positions: 167, type: 'Paid', duration: '12 weeks' },
  { company: 'Meta AI', positions: 134, type: 'Paid', duration: '16 weeks' },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'placement',
    title: 'Placement Optimization',
    message: 'Graduates with internship experience show 67% higher placement rates. Expand internship programs.',
    impact: 'High',
    action: 'Increase internship partnerships',
  },
  {
    type: 'salary',
    title: 'Salary Analysis',
    message: 'Machine Learning specialization commands 18% higher salaries. Promote ML track.',
    impact: 'Medium',
    action: 'Highlight ML program benefits',
  },
  {
    type: 'industry',
    title: 'Industry Demand',
    message: 'AI/ML demand projected to grow 45% next year. Expand curriculum capacity.',
    impact: 'High',
    action: 'Scale AI/ML program enrollment',
  },
];

export default function CareerSuccessHub() {
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

  const renderEmployerCard = (employer: typeof TOP_EMPLOYERS[0]) => (
    <BlurView key={employer.name} intensity={20} tint="dark" style={styles.employerCard}>
      <View style={styles.employerHeader}>
        <Text style={styles.employerName}>{employer.name}</Text>
        <Building2 size={16} color={THEME.neonCyan} />
      </View>
      <View style={styles.employerMetrics}>
        <View style={styles.employerMetric}>
          <Text style={styles.employerMetricLabel}>Placements</Text>
          <Text style={[styles.employerMetricValue, { color: THEME.neonCyan }]}>{employer.placements}</Text>
        </View>
        <View style={styles.employerMetric}>
          <Text style={styles.employerMetricLabel}>Avg Salary</Text>
          <Text style={[styles.employerMetricValue, { color: THEME.emeraldGreen }]}>{employer.avgSalary}</Text>
        </View>
        <View style={styles.employerMetric}>
          <Text style={styles.employerMetricLabel}>Satisfaction</Text>
          <Text style={[styles.employerMetricValue, { color: THEME.amber }]}>{employer.satisfaction}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderIndustryCard = (industry: typeof INDUSTRY_DEMAND[0]) => (
    <BlurView key={industry.industry} intensity={20} tint="dark" style={styles.industryCard}>
      <Text style={styles.industryName}>{industry.industry}</Text>
      <View style={styles.industryMetrics}>
        <View style={styles.industryMetric}>
          <Text style={styles.industryMetricLabel}>Demand</Text>
          <Text style={[styles.industryMetricValue, { color: THEME.neonCyan }]}>{industry.demand}%</Text>
        </View>
        <View style={styles.industryMetric}>
          <Text style={styles.industryMetricLabel}>Growth</Text>
          <Text style={[styles.industryMetricValue, { color: THEME.emeraldGreen }]}>{industry.growth}%</Text>
        </View>
        <View style={styles.industryMetric}>
          <Text style={styles.industryMetricLabel}>Avg Salary</Text>
          <Text style={[styles.industryMetricValue, { color: THEME.purple }]}>{industry.avgSalary}</Text>
        </View>
      </View>
      <View style={styles.industryBar}>
        <View style={[styles.industryBarFill, { width: `${industry.demand}%`, backgroundColor: THEME.neonCyan }]} />
      </View>
    </BlurView>
  );

  const renderInternshipCard = (internship: typeof INTERNSHIP_OPPORTUNITIES[0]) => (
    <BlurView key={internship.company} intensity={20} tint="dark" style={styles.internshipCard}>
      <View style={styles.internshipHeader}>
        <Text style={styles.internshipCompany}>{internship.company}</Text>
        <CheckCircle size={16} color={THEME.emeraldGreen} />
      </View>
      <View style={styles.internshipDetails}>
        <View style={styles.internshipDetail}>
          <Text style={styles.internshipDetailLabel}>Positions</Text>
          <Text style={styles.internshipDetailValue}>{internship.positions}</Text>
        </View>
        <View style={styles.internshipDetail}>
          <Text style={styles.internshipDetailLabel}>Type</Text>
          <Text style={[styles.internshipDetailValue, { color: THEME.emeraldGreen }]}>{internship.type}</Text>
        </View>
        <View style={styles.internshipDetail}>
          <Text style={styles.internshipDetailLabel}>Duration</Text>
          <Text style={styles.internshipDetailValue}>{internship.duration}</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      placement: THEME.neonCyan,
      salary: THEME.emeraldGreen,
      industry: THEME.purple,
    };
    const typeIcons = {
      placement: Briefcase,
      salary: DollarSign,
      industry: TrendingUp,
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
            <Briefcase size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Career Success Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Career Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Career Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Total Placements', CAREER_DATA.totalPlacements, THEME.neonCyan, 'All time')}
              {renderMetricCard('Internship Matches', CAREER_DATA.internshipMatches, THEME.electricBlue, 'This year')}
              {renderMetricCard('Success Rate', `${CAREER_DATA.careerSuccessRate}%`, THEME.emeraldGreen, 'Placement rate')}
              {renderMetricCard('Avg Salary', CAREER_DATA.avgSalary, THEME.amber, 'Starting salary')}
              {renderMetricCard('Employer Partners', CAREER_DATA.employerPartnerships.toString(), THEME.purple, 'Active partnerships')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Top Employers */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Building2 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Top Employers</Text>
          </View>
          <View style={styles.employersContainer}>
            {TOP_EMPLOYERS.map((employer) => renderEmployerCard(employer))}
          </View>
        </Animated.View>

        {/* Industry Demand */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Industry Demand</Text>
          </View>
          <View style={styles.industriesContainer}>
            {INDUSTRY_DEMAND.map((industry) => renderIndustryCard(industry))}
          </View>
        </Animated.View>

        {/* Graduate Outcomes */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <GraduationCap size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Graduate Outcomes</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.outcomesCard}>
            <View style={styles.outcomesGrid}>
              <View style={styles.outcomeMetric}>
                <Text style={styles.outcomeLabel}>Employed (3 months)</Text>
                <Text style={[styles.outcomeValue, { color: THEME.neonCyan }]}>{GRADUATE_OUTCOMES.employedWithin3Months}%</Text>
              </View>
              <View style={styles.outcomeMetric}>
                <Text style={styles.outcomeLabel}>Employed (6 months)</Text>
                <Text style={[styles.outcomeValue, { color: THEME.electricBlue }]}>{GRADUATE_OUTCOMES.employedWithin6Months}%</Text>
              </View>
              <View style={styles.outcomeMetric}>
                <Text style={styles.outcomeLabel}>Avg Job Search</Text>
                <Text style={[styles.outcomeValue, { color: THEME.emeraldGreen }]}>{GRADUATE_OUTCOMES.avgJobSearchTime}</Text>
              </View>
              <View style={styles.outcomeMetric}>
                <Text style={styles.outcomeLabel}>Salary Increase</Text>
                <Text style={[styles.outcomeValue, { color: THEME.purple }]}>{GRADUATE_OUTCOMES.salaryIncrease}%</Text>
              </View>
              <View style={styles.outcomeMetric}>
                <Text style={styles.outcomeLabel}>Career Satisfaction</Text>
                <Text style={[styles.outcomeValue, { color: THEME.amber }]}>{GRADUATE_OUTCOMES.careerSatisfaction}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Internship Opportunities */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Internship Opportunities</Text>
          </View>
          <View style={styles.internshipsContainer}>
            {INTERNSHIP_OPPORTUNITIES.map((internship) => renderInternshipCard(internship))}
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
  employersContainer: {
    gap: 12,
  },
  employerCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  employerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  employerName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  employerMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  employerMetric: {
    alignItems: 'center',
  },
  employerMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  employerMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  industriesContainer: {
    gap: 12,
  },
  industryCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  industryName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  industryMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  industryMetric: {
    alignItems: 'center',
  },
  industryMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  industryMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  industryBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  industryBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  outcomesCard: {
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
  outcomeMetric: {
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
    fontSize: 20,
    fontWeight: '700',
  },
  internshipsContainer: {
    gap: 12,
  },
  internshipCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  internshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  internshipCompany: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  internshipDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  internshipDetail: {
    flex: 1,
  },
  internshipDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  internshipDetailValue: {
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
