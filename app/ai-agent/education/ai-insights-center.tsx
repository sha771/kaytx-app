/**
 * =============================================================================
 * AI INSIGHTS CENTER
 * =============================================================================
 *
 * A comprehensive AI insights dashboard that displays AI-powered recommendations,
 * predictive analytics, optimization suggestions, and strategic insights across
 * the entire education ecosystem.
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
  Brain,
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
  Lightbulb,
  Flame,
  Shield,
  Users,
  CheckCircle,
  AlertTriangle,
  Info,
  BookOpen,
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

// AI Insights Categories
const INSIGHT_CATEGORIES = [
  { name: 'Performance', count: 47, color: THEME.neonCyan },
  { name: 'Engagement', count: 38, color: THEME.electricBlue },
  { name: 'Retention', count: 29, color: THEME.emeraldGreen },
  { name: 'Curriculum', count: 24, color: THEME.purple },
  { name: 'Career', count: 19, color: THEME.amber },
];

// AI Recommendations
const AI_RECOMMENDATIONS = [
  {
    id: 1,
    type: 'critical',
    title: 'Student Retention Alert',
    message: '89 students at high risk of dropout. Immediate intervention recommended within 24 hours.',
    impact: 'Critical',
    action: 'Deploy intervention team',
    category: 'Retention',
    priority: 'high',
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'Engagement Optimization',
    message: 'Interactive content shows 34% higher engagement. Convert 15 static modules to interactive format.',
    impact: 'High',
    action: 'Convert content modules',
    category: 'Engagement',
    priority: 'high',
  },
  {
    id: 3,
    type: 'performance',
    title: 'Learning Path Optimization',
    message: 'Adaptive learning paths could improve completion rates by 15% for struggling students.',
    impact: 'Medium',
    action: 'Implement adaptive learning',
    category: 'Performance',
    priority: 'medium',
  },
  {
    id: 4,
    type: 'curriculum',
    title: 'Industry Alignment',
    message: 'AI ethics demand increased 45%. Add dedicated module to curriculum.',
    impact: 'High',
    action: 'Develop AI ethics module',
    category: 'Curriculum',
    priority: 'high',
  },
  {
    id: 5,
    type: 'career',
    title: 'Career Readiness',
    message: 'Students with internship experience show 67% higher placement rates. Expand partnerships.',
    impact: 'High',
    action: 'Expand internship program',
    category: 'Career',
    priority: 'high',
  },
  {
    id: 6,
    type: 'performance',
    title: 'Faculty Productivity',
    message: 'Faculty with dedicated research time produce 45% more publications. Optimize schedules.',
    impact: 'Medium',
    action: 'Optimize faculty schedules',
    category: 'Performance',
    priority: 'medium',
  },
];

// Predictive Analytics
const PREDICTIVE_ANALYTICS = {
  enrollmentGrowth: 34,
  retentionImprovement: 12,
  placementIncrease: 18,
  satisfactionTrend: 8,
};

// Strategic Insights
const STRATEGIC_INSIGHTS = [
  {
    title: 'Market Opportunity',
    insight: 'AI/ML program demand projected to grow 45% next year. Expand capacity by 30%.',
    confidence: 94,
  },
  {
    title: 'Competitive Advantage',
    insight: 'AI Tutor usage correlates with 12% GPA improvement. Leverage in marketing.',
    confidence: 89,
  },
  {
    title: 'Revenue Potential',
    insight: 'Corporate training market shows 67% growth opportunity. Launch B2B program.',
    confidence: 87,
  },
];

export default function AIInsightsCenter() {
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

  const renderCategoryCard = (category: typeof INSIGHT_CATEGORIES[0]) => (
    <BlurView key={category.name} intensity={20} tint="dark" style={styles.categoryCard}>
      <View style={[styles.categoryIndicator, { backgroundColor: category.color }]} />
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={[styles.categoryCount, { color: category.color }]}>{category.count}</Text>
    </BlurView>
  );

  const renderRecommendationCard = (rec: typeof AI_RECOMMENDATIONS[0]) => {
    const typeColors = {
      critical: THEME.red,
      opportunity: THEME.emeraldGreen,
      performance: THEME.neonCyan,
      curriculum: THEME.purple,
      career: THEME.amber,
    };
    const typeIcons = {
      critical: AlertTriangle,
      opportunity: Flame,
      performance: TrendingUp,
      curriculum: BookOpen,
      career: Award,
    };
    const Icon = typeIcons[rec.type as keyof typeof typeIcons];
    const color = typeColors[rec.type as keyof typeof typeColors];
    const priorityColors = {
      high: THEME.red,
      medium: THEME.amber,
      low: THEME.emeraldGreen,
    };
    const priorityColor = priorityColors[rec.priority as keyof typeof priorityColors];

    return (
      <Animated.View entering={FadeInUp.springify()} style={styles.recommendationCard}>
        <BlurView intensity={20} tint="dark" style={styles.recommendationCardBlur}>
          <View style={styles.recommendationHeader}>
            <View style={[styles.recommendationIcon, { backgroundColor: color + '20' }]}>
              <Icon size={20} color={color} />
            </View>
            <View style={styles.recommendationMeta}>
              <Text style={styles.recommendationTitle}>{rec.title}</Text>
              <View style={styles.recommendationBadges}>
                <View style={[styles.recommendationCategory, { backgroundColor: color + '30' }]}>
                  <Text style={[styles.recommendationCategoryText, { color }]}>{rec.category}</Text>
                </View>
                <View style={[styles.recommendationPriority, { backgroundColor: priorityColor + '30' }]}>
                  <Text style={[styles.recommendationPriorityText, { color: priorityColor }]}>{rec.priority}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.recommendationMessage}>{rec.message}</Text>
          <View style={[styles.recommendationImpact, { backgroundColor: color + '30' }]}>
            <Text style={[styles.recommendationImpactLabel, { color }]}>Impact: {rec.impact}</Text>
          </View>
          <View style={styles.recommendationAction}>
            <Text style={styles.recommendationActionLabel}>Suggested Action:</Text>
            <Text style={styles.recommendationActionText}>{rec.action}</Text>
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderPredictiveCard = (label: string, value: number, color: string) => (
    <BlurView key={label} intensity={20} tint="dark" style={styles.predictiveCard}>
      <Text style={styles.predictiveLabel}>{label}</Text>
      <Text style={[styles.predictiveValue, { color }]}>{value}%</Text>
      {renderTrendIndicator(value, 'up')}
    </BlurView>
  );

  const renderStrategicCard = (insight: typeof STRATEGIC_INSIGHTS[0]) => (
    <BlurView key={insight.title} intensity={20} tint="dark" style={styles.strategicCard}>
      <View style={styles.strategicHeader}>
        <Text style={styles.strategicTitle}>{insight.title}</Text>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>{insight.confidence}% confidence</Text>
        </View>
      </View>
      <Text style={styles.strategicInsight}>{insight.insight}</Text>
    </BlurView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: THEME.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={THEME.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerTitle}>
            <Brain size={28} color={THEME.neonCyan} />
            <Text style={styles.headerText}>AI Insights Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Insight Categories */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Insight Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            <View style={styles.categoriesContainer}>
              {INSIGHT_CATEGORIES.map((category) => renderCategoryCard(category))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* AI Recommendations */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>AI Recommendations</Text>
          </View>
          <View style={styles.recommendationsContainer}>
            {AI_RECOMMENDATIONS.map((rec) => renderRecommendationCard(rec))}
          </View>
        </Animated.View>

        {/* Predictive Analytics */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Predictive Analytics</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.predictiveCardContainer}>
            <View style={styles.predictiveGrid}>
              {renderPredictiveCard('Enrollment Growth', PREDICTIVE_ANALYTICS.enrollmentGrowth, THEME.neonCyan)}
              {renderPredictiveCard('Retention Improvement', PREDICTIVE_ANALYTICS.retentionImprovement, THEME.emeraldGreen)}
              {renderPredictiveCard('Placement Increase', PREDICTIVE_ANALYTICS.placementIncrease, THEME.purple)}
              {renderPredictiveCard('Satisfaction Trend', PREDICTIVE_ANALYTICS.satisfactionTrend, THEME.amber)}
            </View>
          </BlurView>
        </Animated.View>

        {/* Strategic Insights */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Strategic Insights</Text>
          </View>
          <View style={styles.strategicContainer}>
            {STRATEGIC_INSIGHTS.map((insight) => renderStrategicCard(insight))}
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
  categoriesScroll: {
    marginBottom: 0,
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  categoryCard: {
    width: 120,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    overflow: 'hidden',
  },
  categoryIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 8,
  },
  categoryCount: {
    fontSize: 24,
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
    marginBottom: 8,
  },
  recommendationBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  recommendationCategory: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendationCategoryText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
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
  recommendationMessage: {
    fontSize: 14,
    color: THEME.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  recommendationImpact: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  recommendationImpactLabel: {
    fontSize: 13,
    fontWeight: '600',
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
  predictiveCardContainer: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  predictiveGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  predictiveCard: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  predictiveLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  predictiveValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  strategicContainer: {
    gap: 12,
  },
  strategicCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  strategicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  strategicTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  confidenceBadge: {
    backgroundColor: THEME.neonCyan + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.neonCyan,
  },
  strategicInsight: {
    fontSize: 14,
    color: THEME.text,
    lineHeight: 20,
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
