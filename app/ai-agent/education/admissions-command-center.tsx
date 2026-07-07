/**
 * =============================================================================
 * ADMISSIONS COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive admissions dashboard that tracks applications, acceptance rates,
 * enrollment pipelines, geographic distribution, and student demographics with AI-powered
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
  Globe,
  MapPin,
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

// Admissions Data
const ADMISSIONS_DATA = {
  totalApplications: '2.4M',
  acceptanceRate: 78,
  enrollmentRate: 65,
  conversionRate: 84,
  avgProcessingTime: '5.2 days',
  trend: [2300, 2320, 2340, 2360, 2380, 2400],
};

// Geographic Distribution
const GEOGRAPHIC_DATA = [
  { region: 'North America', applications: '847K', acceptance: 82, enrollment: 68 },
  { region: 'Europe', applications: '623K', acceptance: 76, enrollment: 62 },
  { region: 'Asia Pacific', applications: '521K', acceptance: 74, enrollment: 64 },
  { region: 'Latin America', applications: '289K', acceptance: 71, enrollment: 58 },
  { region: 'Middle East', applications: '120K', acceptance: 68, enrollment: 55 },
];

// Student Demographics
const DEMOGRAPHICS = {
  ageGroups: [
    { group: '18-22', percentage: 45 },
    { group: '23-27', percentage: 32 },
    { group: '28-32', percentage: 15 },
    { group: '33+', percentage: 8 },
  ],
  gender: {
    male: 52,
    female: 46,
    other: 2,
  },
  education: {
    highSchool: 38,
    bachelor: 42,
    master: 18,
    phd: 2,
  },
};

// Enrollment Pipeline
const ENROLLMENT_PIPELINE = [
  { stage: 'Applications', count: '2.4M', conversion: 100, color: THEME.neonCyan },
  { stage: 'Reviewed', count: '2.1M', conversion: 87, color: THEME.electricBlue },
  { stage: 'Accepted', count: '1.9M', conversion: 78, color: THEME.emeraldGreen },
  { stage: 'Enrolled', count: '1.6M', conversion: 65, color: THEME.purple },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'conversion',
    title: 'Conversion Optimization',
    message: 'Applications from Asia Pacific show 23% higher enrollment rates with personalized outreach.',
    impact: 'High',
    action: 'Implement targeted outreach campaigns',
  },
  {
    type: 'demographics',
    title: 'Demographic Analysis',
    message: 'Bachelor degree holders show 34% higher completion rates. Prioritize in admissions.',
    impact: 'Medium',
    action: 'Adjust admission criteria weighting',
  },
  {
    type: 'geographic',
    title: 'Geographic Expansion',
    message: 'Latin America shows 45% growth potential. Increase recruitment efforts.',
    impact: 'High',
    action: 'Expand Latin America recruitment',
  },
];

export default function AdmissionsCommandCenter() {
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

  const renderGeographicCard = (geo: typeof GEOGRAPHIC_DATA[0]) => (
    <BlurView key={geo.region} intensity={20} tint="dark" style={styles.geoCard}>
      <View style={styles.geoHeader}>
        <Text style={styles.geoRegion}>{geo.region}</Text>
        <MapPin size={16} color={THEME.neonCyan} />
      </View>
      <View style={styles.geoMetrics}>
        <View style={styles.geoMetric}>
          <Text style={styles.geoMetricLabel}>Applications</Text>
          <Text style={[styles.geoMetricValue, { color: THEME.neonCyan }]}>{geo.applications}</Text>
        </View>
        <View style={styles.geoMetric}>
          <Text style={styles.geoMetricLabel}>Acceptance</Text>
          <Text style={[styles.geoMetricValue, { color: THEME.electricBlue }]}>{geo.acceptance}%</Text>
        </View>
        <View style={styles.geoMetric}>
          <Text style={styles.geoMetricLabel}>Enrollment</Text>
          <Text style={[styles.geoMetricValue, { color: THEME.emeraldGreen }]}>{geo.enrollment}%</Text>
        </View>
      </View>
    </BlurView>
  );

  const renderPipelineStage = (stage: typeof ENROLLMENT_PIPELINE[0]) => (
    <BlurView key={stage.stage} intensity={20} tint="dark" style={styles.pipelineCard}>
      <Text style={styles.pipelineStage}>{stage.stage}</Text>
      <Text style={[styles.pipelineCount, { color: stage.color }]}>{stage.count}</Text>
      <Text style={styles.pipelineConversion}>{stage.conversion}% conversion</Text>
      <View style={styles.pipelineBar}>
        <View style={[styles.pipelineBarFill, { width: `${stage.conversion}%`, backgroundColor: stage.color }]} />
      </View>
    </BlurView>
  );

  const renderDemographicCard = (label: string, value: number, color: string) => (
    <BlurView key={label} intensity={20} tint="dark" style={styles.demographicCard}>
      <Text style={styles.demographicLabel}>{label}</Text>
      <Text style={[styles.demographicValue, { color }]}>{value}%</Text>
      <View style={styles.demographicBar}>
        <View style={[styles.demographicBarFill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </BlurView>
  );

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      conversion: THEME.neonCyan,
      demographics: THEME.purple,
      geographic: THEME.emeraldGreen,
    };
    const typeIcons = {
      conversion: TrendingUp,
      demographics: Users,
      geographic: Globe,
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
            <FileText size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>Admissions Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Admissions Metrics */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Admissions Metrics</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
            <View style={styles.metricsContainer}>
              {renderMetricCard('Total Applications', ADMISSIONS_DATA.totalApplications, THEME.neonCyan, 'This year')}
              {renderMetricCard('Acceptance Rate', `${ADMISSIONS_DATA.acceptanceRate}%`, THEME.electricBlue, 'Overall rate')}
              {renderMetricCard('Enrollment Rate', `${ADMISSIONS_DATA.enrollmentRate}%`, THEME.emeraldGreen, 'Conversion to enrolled')}
              {renderMetricCard('Conversion Rate', `${ADMISSIONS_DATA.conversionRate}%`, THEME.purple, 'Accepted to enrolled')}
              {renderMetricCard('Processing Time', ADMISSIONS_DATA.avgProcessingTime, THEME.amber, 'Average time')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Enrollment Pipeline */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Enrollment Pipeline</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pipelineScroll}>
            <View style={styles.pipelineContainer}>
              {ENROLLMENT_PIPELINE.map((stage) => renderPipelineStage(stage))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Geographic Distribution */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Globe size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Geographic Distribution</Text>
          </View>
          <View style={styles.geoContainer}>
            {GEOGRAPHIC_DATA.map((geo) => renderGeographicCard(geo))}
          </View>
        </Animated.View>

        {/* Student Demographics */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Student Demographics</Text>
          </View>
          
          <Text style={styles.demographicSectionTitle}>Age Groups</Text>
          <BlurView intensity={20} tint="dark" style={styles.demographicsCard}>
            <View style={styles.demographicsGrid}>
              {DEMOGRAPHICS.ageGroups.map((age) => renderDemographicCard(age.group, age.percentage, THEME.neonCyan))}
            </View>
          </BlurView>

          <Text style={styles.demographicSectionTitle}>Gender Distribution</Text>
          <BlurView intensity={20} tint="dark" style={styles.demographicsCard}>
            <View style={styles.demographicsGrid}>
              {renderDemographicCard('Male', DEMOGRAPHICS.gender.male, THEME.electricBlue)}
              {renderDemographicCard('Female', DEMOGRAPHICS.gender.female, THEME.purple)}
              {renderDemographicCard('Other', DEMOGRAPHICS.gender.other, THEME.amber)}
            </View>
          </BlurView>

          <Text style={styles.demographicSectionTitle}>Education Level</Text>
          <BlurView intensity={20} tint="dark" style={styles.demographicsCard}>
            <View style={styles.demographicsGrid}>
              {renderDemographicCard('High School', DEMOGRAPHICS.education.highSchool, THEME.neonCyan)}
              {renderDemographicCard('Bachelor', DEMOGRAPHICS.education.bachelor, THEME.electricBlue)}
              {renderDemographicCard('Master', DEMOGRAPHICS.education.master, THEME.purple)}
              {renderDemographicCard('PhD', DEMOGRAPHICS.education.phd, THEME.amber)}
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
  pipelineScroll: {
    marginBottom: 0,
  },
  pipelineContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  pipelineCard: {
    width: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  pipelineStage: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  pipelineCount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  pipelineConversion: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  pipelineBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  pipelineBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  geoContainer: {
    gap: 12,
  },
  geoCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  geoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  geoRegion: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  geoMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  geoMetric: {
    alignItems: 'center',
  },
  geoMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  geoMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  demographicSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginTop: 16,
    marginBottom: 12,
  },
  demographicsCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  demographicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  demographicCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  demographicLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  demographicValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  demographicBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  demographicBarFill: {
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
