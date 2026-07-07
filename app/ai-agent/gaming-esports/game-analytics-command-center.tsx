/**
 * =============================================================================
 * GAME ANALYTICS COMMAND CENTER
 * =============================================================================
 *
 * A comprehensive game analytics dashboard that monitors match activity,
 * session data, economy balance, feature usage, and gameplay performance.
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
  Gamepad2,
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
  DollarSign,
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
  electricPurple: '#8B5CF6',
  neonGreen: '#10B981',
  amber: '#F59E0B',
  red: '#EF4444',
  magenta: '#EC4899',
  text: '#E2E8F0',
  textMuted: '#94A3B8',
  border: '#1E293B',
};

// Game Analytics Data
const ANALYTICS_DATA = {
  matchActivity: {
    daily: 2.4,
    weekly: 16.8,
    monthly: 72,
    trend: [2.1, 2.2, 2.3, 2.4, 2.5, 2.4],
  },
  sessionData: {
    avgDuration: '4.2h',
    avgMatches: 8.7,
    peakConcurrent: 8.5,
    trend: [4.0, 4.1, 4.2, 4.3, 4.2, 4.2],
  },
  economyBalance: {
    currencyInFlow: 847,
    currencyOutFlow: 812,
    balance: 98.2,
    trend: [97, 97.5, 98, 98.2, 98.1, 98.2],
  },
  featureUsage: {
    battlePass: 76,
    marketplace: 68,
    events: 82,
    cosmetics: 71,
    trend: [72, 74, 75, 76, 77, 76],
  },
  gameplayPerformance: {
    avgFps: 92,
    avgLatency: 24,
    crashRate: 0.02,
    serverUptime: 99.7,
    trend: [88, 90, 91, 92, 93, 92],
  },
};

// Top Performing Features
const TOP_FEATURES = [
  { name: 'Battle Pass Season 7', usage: 82, revenue: '$1.2B', satisfaction: 87 },
  { name: 'Summer Event', usage: 76, revenue: '$340M', satisfaction: 92 },
  { name: 'New Character Pack', usage: 71, revenue: '$280M', satisfaction: 85 },
  { name: 'Ranked Season', usage: 68, revenue: '$180M', satisfaction: 89 },
  { name: 'Cosmetic Bundle', usage: 65, revenue: '$150M', satisfaction: 91 },
];

// Gameplay Heatmap Data
const HEATMAP_DATA = [
  { region: 'North America', activity: 95, latency: 22 },
  { region: 'Europe', activity: 88, latency: 28 },
  { region: 'Asia Pacific', activity: 92, latency: 35 },
  { region: 'Latin America', activity: 72, latency: 45 },
  { region: 'Middle East', activity: 65, latency: 52 },
];

// AI Insights
const AI_INSIGHTS = [
  {
    type: 'performance',
    title: 'Performance Optimization',
    message: 'FPS dropped 5% during peak hours in Asia Pacific. Consider server scaling.',
    impact: 'Medium',
    action: 'Scale Asia Pacific servers during peak hours',
  },
  {
    type: 'economy',
    title: 'Economy Balance Alert',
    message: 'Currency outflow increased 12% after latest update. Monitor inflation.',
    impact: 'High',
    action: 'Implement currency sink mechanisms',
  },
  {
    type: 'feature',
    title: 'Feature Adoption',
    message: 'New battle pass features showing 45% higher engagement than expected.',
    impact: 'Positive',
    action: 'Expand similar features to other content',
  },
];

export default function GameAnalyticsCommandCenter() {
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
          <ArrowUpRight size={12} color={THEME.neonGreen} />
          <Text style={[styles.trendText, { color: THEME.neonGreen }]}>{change}%</Text>
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

  const renderFeatureCard = (feature: typeof TOP_FEATURES[0]) => (
    <BlurView key={feature.name} intensity={20} tint="dark" style={styles.featureCard}>
      <Text style={styles.featureName}>{feature.name}</Text>
      <View style={styles.featureMetrics}>
        <View style={styles.featureMetric}>
          <Text style={styles.featureMetricLabel}>Usage</Text>
          <Text style={[styles.featureMetricValue, { color: THEME.neonCyan }]}>{feature.usage}%</Text>
        </View>
        <View style={styles.featureMetric}>
          <Text style={styles.featureMetricLabel}>Revenue</Text>
          <Text style={[styles.featureMetricValue, { color: THEME.neonGreen }]}>{feature.revenue}</Text>
        </View>
        <View style={styles.featureMetric}>
          <Text style={styles.featureMetricLabel}>Satisfaction</Text>
          <Text style={[styles.featureMetricValue, { color: THEME.electricPurple }]}>{feature.satisfaction}%</Text>
        </View>
      </View>
      <View style={styles.featureBar}>
        <View style={[styles.featureBarFill, { width: `${feature.usage}%`, backgroundColor: THEME.neonCyan }]} />
      </View>
    </BlurView>
  );

  const renderHeatmapItem = (item: typeof HEATMAP_DATA[0]) => {
    const activityColor = item.activity > 80 ? THEME.neonGreen : item.activity > 70 ? THEME.amber : THEME.red;
    return (
      <BlurView key={item.region} intensity={20} tint="dark" style={styles.heatmapCard}>
        <Text style={styles.heatmapRegion}>{item.region}</Text>
        <View style={styles.heatmapMetrics}>
          <View style={styles.heatmapMetric}>
            <Text style={styles.heatmapMetricLabel}>Activity</Text>
            <Text style={[styles.heatmapMetricValue, { color: activityColor }]}>{item.activity}%</Text>
          </View>
          <View style={styles.heatmapMetric}>
            <Text style={styles.heatmapMetricLabel}>Latency</Text>
            <Text style={[styles.heatmapMetricValue, { color: THEME.electricPurple }]}>{item.latency}ms</Text>
          </View>
        </View>
        <View style={styles.heatmapBar}>
          <View style={[styles.heatmapBarFill, { width: `${item.activity}%`, backgroundColor: activityColor }]} />
        </View>
      </BlurView>
    );
  };

  const renderInsightCard = (insight: typeof AI_INSIGHTS[0]) => {
    const typeColors = {
      performance: THEME.amber,
      economy: THEME.red,
      feature: THEME.neonGreen,
    };
    const typeIcons = {
      performance: Activity,
      economy: DollarSign,
      feature: Flame,
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
            <Text style={styles.headerText}>Game Analytics Command Center</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Match Activity */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Activity size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Match Activity</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.analyticsScroll}>
            <View style={styles.analyticsContainer}>
              {renderAnalyticsCard('Daily Matches', `${ANALYTICS_DATA.matchActivity.daily}M`, ANALYTICS_DATA.matchActivity.trend, THEME.neonCyan, '2.4M matches/day')}
              {renderAnalyticsCard('Weekly Matches', `${ANALYTICS_DATA.matchActivity.weekly}M`, ANALYTICS_DATA.matchActivity.trend, THEME.electricPurple, '16.8M matches/week')}
              {renderAnalyticsCard('Monthly Matches', `${ANALYTICS_DATA.matchActivity.monthly}M`, ANALYTICS_DATA.matchActivity.trend, THEME.neonGreen, '72M matches/month')}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Session Data */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Session Data</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.sessionCard}>
            <View style={styles.sessionGrid}>
              <View style={styles.sessionMetric}>
                <Text style={styles.sessionLabel}>Avg Duration</Text>
                <Text style={[styles.sessionValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.sessionData.avgDuration}</Text>
                {renderSparkline(ANALYTICS_DATA.sessionData.trend, THEME.neonCyan)}
              </View>
              <View style={styles.sessionMetric}>
                <Text style={styles.sessionLabel}>Avg Matches/Session</Text>
                <Text style={[styles.sessionValue, { color: THEME.electricPurple }]}>{ANALYTICS_DATA.sessionData.avgMatches}</Text>
              </View>
              <View style={styles.sessionMetric}>
                <Text style={styles.sessionLabel}>Peak Concurrent</Text>
                <Text style={[styles.sessionValue, { color: THEME.neonGreen }]}>{ANALYTICS_DATA.sessionData.peakConcurrent}M</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Economy Balance */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <DollarSign size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Economy Balance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.economyCard}>
            <View style={styles.economyOverview}>
              <View style={styles.economyMetric}>
                <Text style={styles.economyLabel}>Currency Inflow</Text>
                <Text style={[styles.economyValue, { color: THEME.neonGreen }]}>{ANALYTICS_DATA.economyBalance.currencyInFlow}M</Text>
              </View>
              <View style={styles.economyMetric}>
                <Text style={styles.economyLabel}>Currency Outflow</Text>
                <Text style={[styles.economyValue, { color: THEME.red }]}>{ANALYTICS_DATA.economyBalance.currencyOutFlow}M</Text>
              </View>
              <View style={styles.economyMetric}>
                <Text style={styles.economyLabel}>Balance Score</Text>
                <Text style={[styles.economyValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.economyBalance.balance}%</Text>
                {renderSparkline(ANALYTICS_DATA.economyBalance.trend, THEME.neonCyan)}
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Feature Usage */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flame size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Feature Usage</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.featuresCard}>
            <View style={styles.featuresOverview}>
              <View style={styles.featuresMetric}>
                <Text style={styles.featuresLabel}>Battle Pass</Text>
                <Text style={[styles.featuresValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.featureUsage.battlePass}%</Text>
              </View>
              <View style={styles.featuresMetric}>
                <Text style={styles.featuresLabel}>Marketplace</Text>
                <Text style={[styles.featuresValue, { color: THEME.electricPurple }]}>{ANALYTICS_DATA.featureUsage.marketplace}%</Text>
              </View>
              <View style={styles.featuresMetric}>
                <Text style={styles.featuresLabel}>Events</Text>
                <Text style={[styles.featuresValue, { color: THEME.amber }]}>{ANALYTICS_DATA.featureUsage.events}%</Text>
              </View>
              <View style={styles.featuresMetric}>
                <Text style={styles.featuresLabel}>Cosmetics</Text>
                <Text style={[styles.featuresValue, { color: THEME.magenta }]}>{ANALYTICS_DATA.featureUsage.cosmetics}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.topFeaturesContainer}>
            {TOP_FEATURES.map((feature) => renderFeatureCard(feature))}
          </View>
        </Animated.View>

        {/* Gameplay Performance */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Gamepad2 size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Gameplay Performance</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.performanceCard}>
            <View style={styles.performanceGrid}>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Avg FPS</Text>
                <Text style={[styles.performanceValue, { color: THEME.neonGreen }]}>{ANALYTICS_DATA.gameplayPerformance.avgFps}</Text>
                {renderSparkline(ANALYTICS_DATA.gameplayPerformance.trend, THEME.neonGreen)}
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Avg Latency</Text>
                <Text style={[styles.performanceValue, { color: THEME.electricPurple }]}>{ANALYTICS_DATA.gameplayPerformance.avgLatency}ms</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Crash Rate</Text>
                <Text style={[styles.performanceValue, { color: THEME.red }]}>{ANALYTICS_DATA.gameplayPerformance.crashRate}%</Text>
              </View>
              <View style={styles.performanceMetric}>
                <Text style={styles.performanceLabel}>Server Uptime</Text>
                <Text style={[styles.performanceValue, { color: THEME.neonCyan }]}>{ANALYTICS_DATA.gameplayPerformance.serverUptime}%</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Regional Heatmap */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Regional Activity Heatmap</Text>
          </View>
          <View style={styles.heatmapContainer}>
            {HEATMAP_DATA.map((item) => renderHeatmapItem(item))}
          </View>
        </Animated.View>

        {/* AI Insights */}
        <Animated.View entering={FadeInUp.delay(600).springify()} style={styles.section}>
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
  sessionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  sessionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  sessionMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  sessionLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  sessionValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  economyCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  economyOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  economyMetric: {
    alignItems: 'center',
  },
  economyLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  economyValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  featuresCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  featuresOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  featuresMetric: {
    alignItems: 'center',
  },
  featuresLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  featuresValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  topFeaturesContainer: {
    gap: 12,
  },
  featureCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
    marginBottom: 12,
  },
  featureMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featureMetric: {
    alignItems: 'center',
  },
  featureMetricLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  featureMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureBar: {
    height: 4,
    backgroundColor: THEME.cardLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  featureBarFill: {
    height: '100%',
    borderRadius: 2,
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
    marginBottom: 8,
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
  heatmapRegion: {
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
