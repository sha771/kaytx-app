/**
 * =============================================================================
 * PLAYER INTELLIGENCE HUB
 * =============================================================================
 *
 * A comprehensive player intelligence dashboard that tracks player segments,
 * retention, churn risk, progression, and engagement with AI-powered insights.
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
  Map,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Zap,
  Shield,
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

// Player Intelligence Data
const PLAYER_DATA = {
  segments: [
    { name: 'New Players', count: '12.5M', percentage: 10.4, color: THEME.neonCyan },
    { name: 'Casual', count: '45.2M', percentage: 37.7, color: THEME.electricPurple },
    { name: 'Regular', count: '38.7M', percentage: 32.3, color: THEME.neonGreen },
    { name: 'Hardcore', count: '18.4M', percentage: 15.3, color: THEME.amber },
    { name: 'Whales', count: '5.2M', percentage: 4.3, color: THEME.magenta },
  ],
  retention: {
    day1: 78,
    day7: 62,
    day30: 45,
    day90: 32,
    day180: 28,
  },
  churnRisk: {
    high: 8.5,
    medium: 15.2,
    low: 76.3,
  },
  progression: {
    avgLevel: 47,
    avgPlaytime: '4.2h',
    avgMatches: 1247,
    avgWins: 587,
  },
  engagement: {
    dailyActive: 45,
    weeklyActive: 72,
    monthlyActive: 100,
    score: 87,
  },
};

// Churn Risk Players
const CHURN_RISK_PLAYERS = [
  { id: 1, name: 'Player_X99', risk: 'High', lastActive: '3 days ago', spend: '$1,240', level: 52 },
  { id: 2, name: 'ProGamer2024', risk: 'High', lastActive: '5 days ago', spend: '$3,450', level: 87 },
  { id: 3, name: 'NightOwl', risk: 'Medium', lastActive: '7 days ago', spend: '$890', level: 34 },
  { id: 4, name: 'DragonSlayer', risk: 'Medium', lastActive: '10 days ago', spend: '$2,100', level: 65 },
  { id: 5, name: 'CasualJoe', risk: 'Low', lastActive: '14 days ago', spend: '$120', level: 12 },
];

// AI Recommendations
const AI_RECOMMENDATIONS = [
  {
    type: 'retention',
    title: 'Retention Opportunity',
    message: 'Players who complete the tutorial have 45% higher retention. Consider tutorial optimization.',
    impact: 'High',
    action: 'Launch tutorial improvement campaign',
  },
  {
    type: 'churn',
    title: 'Churn Prevention',
    message: 'High-value players at risk: 847. Targeted retention campaign could save $2.4M in revenue.',
    impact: 'Critical',
    action: 'Deploy personalized retention offers',
  },
  {
    type: 'engagement',
    title: 'Engagement Boost',
    message: 'Weekend events show 67% higher engagement. Increase weekend event frequency.',
    impact: 'Medium',
    action: 'Schedule additional weekend events',
  },
];

export default function PlayerIntelligenceHub() {
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

  const renderSegmentCard = (segment: typeof PLAYER_DATA.segments[0]) => (
    <BlurView key={segment.name} intensity={20} tint="dark" style={styles.segmentCard}>
      <View style={[styles.segmentIndicator, { backgroundColor: segment.color }]} />
      <Text style={styles.segmentName}>{segment.name}</Text>
      <Text style={[styles.segmentCount, { color: segment.color }]}>{segment.count}</Text>
      <Text style={styles.segmentPercentage}>{segment.percentage}%</Text>
    </BlurView>
  );

  const renderRetentionChart = () => {
    const data = [78, 62, 45, 32, 28];
    const labels = ['Day 1', 'Day 7', 'Day 30', 'Day 90', 'Day 180'];
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

  const renderChurnRiskCard = (player: typeof CHURN_RISK_PLAYERS[0]) => {
    const riskColors = {
      High: THEME.red,
      Medium: THEME.amber,
      Low: THEME.neonGreen,
    };
    const riskColor = riskColors[player.risk as keyof typeof riskColors];

    return (
      <BlurView key={player.id} intensity={20} tint="dark" style={styles.churnCard}>
        <View style={styles.churnHeader}>
          <Text style={styles.churnPlayerName}>{player.name}</Text>
          <View style={[styles.churnRiskBadge, { backgroundColor: riskColor + '30' }]}>
            <Text style={[styles.churnRiskText, { color: riskColor }]}>{player.risk}</Text>
          </View>
        </View>
        <View style={styles.churnDetails}>
          <View style={styles.churnDetail}>
            <Text style={styles.churnDetailLabel}>Last Active</Text>
            <Text style={styles.churnDetailValue}>{player.lastActive}</Text>
          </View>
          <View style={styles.churnDetail}>
            <Text style={styles.churnDetailLabel}>Total Spend</Text>
            <Text style={[styles.churnDetailValue, { color: THEME.neonGreen }]}>{player.spend}</Text>
          </View>
          <View style={styles.churnDetail}>
            <Text style={styles.churnDetailLabel}>Level</Text>
            <Text style={[styles.churnDetailValue, { color: THEME.electricPurple }]}>{player.level}</Text>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderRecommendationCard = (rec: typeof AI_RECOMMENDATIONS[0]) => {
    const typeColors = {
      retention: THEME.neonCyan,
      churn: THEME.red,
      engagement: THEME.neonGreen,
    };
    const typeIcons = {
      retention: Heart,
      churn: AlertTriangle,
      engagement: Flame,
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
            <Text style={styles.headerText}>Player Intelligence Hub</Text>
          </View>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Player Segments */}
        <Animated.View entering={FadeInUp.springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Target size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Player Segments</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.segmentsScroll}>
            <View style={styles.segmentsContainer}>
              {PLAYER_DATA.segments.map((segment) => renderSegmentCard(segment))}
            </View>
          </ScrollView>
        </Animated.View>

        {/* Retention Analysis */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Retention Analysis</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.retentionCard}>
            <View style={styles.retentionMetrics}>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Day 1</Text>
                <Text style={[styles.retentionValue, { color: THEME.neonCyan }]}>{PLAYER_DATA.retention.day1}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Day 7</Text>
                <Text style={[styles.retentionValue, { color: THEME.electricPurple }]}>{PLAYER_DATA.retention.day7}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Day 30</Text>
                <Text style={[styles.retentionValue, { color: THEME.neonGreen }]}>{PLAYER_DATA.retention.day30}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Day 90</Text>
                <Text style={[styles.retentionValue, { color: THEME.amber }]}>{PLAYER_DATA.retention.day90}%</Text>
              </View>
              <View style={styles.retentionMetric}>
                <Text style={styles.retentionLabel}>Day 180</Text>
                <Text style={[styles.retentionValue, { color: THEME.magenta }]}>{PLAYER_DATA.retention.day180}%</Text>
              </View>
            </View>
            {renderRetentionChart()}
          </BlurView>
        </Animated.View>

        {/* Churn Risk Analysis */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={THEME.red} />
            <Text style={styles.sectionTitle}>Churn Risk Analysis</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.churnRiskCard}>
            <View style={styles.churnRiskOverview}>
              <View style={styles.churnRiskItem}>
                <Text style={styles.churnRiskLabel}>High Risk</Text>
                <Text style={[styles.churnRiskValue, { color: THEME.red }]}>{PLAYER_DATA.churnRisk.high}%</Text>
              </View>
              <View style={styles.churnRiskItem}>
                <Text style={styles.churnRiskLabel}>Medium Risk</Text>
                <Text style={[styles.churnRiskValue, { color: THEME.amber }]}>{PLAYER_DATA.churnRisk.medium}%</Text>
              </View>
              <View style={styles.churnRiskItem}>
                <Text style={styles.churnRiskLabel}>Low Risk</Text>
                <Text style={[styles.churnRiskValue, { color: THEME.neonGreen }]}>{PLAYER_DATA.churnRisk.low}%</Text>
              </View>
            </View>
          </BlurView>
          <View style={styles.churnPlayersContainer}>
            {CHURN_RISK_PLAYERS.map((player) => renderChurnRiskCard(player))}
          </View>
        </Animated.View>

        {/* Player Progression */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Player Progression</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.progressionCard}>
            <View style={styles.progressionGrid}>
              <View style={styles.progressionMetric}>
                <Text style={styles.progressionLabel}>Average Level</Text>
                <Text style={[styles.progressionValue, { color: THEME.electricPurple }]}>Lvl {PLAYER_DATA.progression.avgLevel}</Text>
              </View>
              <View style={styles.progressionMetric}>
                <Text style={styles.progressionLabel}>Average Playtime</Text>
                <Text style={[styles.progressionValue, { color: THEME.neonCyan }]}>{PLAYER_DATA.progression.avgPlaytime}</Text>
              </View>
              <View style={styles.progressionMetric}>
                <Text style={styles.progressionLabel}>Average Matches</Text>
                <Text style={[styles.progressionValue, { color: THEME.neonGreen }]}>{PLAYER_DATA.progression.avgMatches}</Text>
              </View>
              <View style={styles.progressionMetric}>
                <Text style={styles.progressionLabel}>Average Wins</Text>
                <Text style={[styles.progressionValue, { color: THEME.amber }]}>{PLAYER_DATA.progression.avgWins}</Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* Engagement Score */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Flame size={24} color={THEME.neonCyan} />
            <Text style={styles.sectionTitle}>Engagement Score</Text>
          </View>
          <BlurView intensity={20} tint="dark" style={styles.engagementCard}>
            <View style={styles.engagementOverview}>
              <View style={styles.engagementScoreContainer}>
                <Text style={styles.engagementScoreLabel}>Overall Score</Text>
                <Text style={[styles.engagementScoreValue, { color: THEME.neonCyan }]}>{PLAYER_DATA.engagement.score}/100</Text>
              </View>
              <View style={styles.engagementBreakdown}>
                <View style={styles.engagementBreakdownItem}>
                  <Text style={styles.engagementBreakdownLabel}>Daily Active</Text>
                  <Text style={[styles.engagementBreakdownValue, { color: THEME.neonGreen }]}>{PLAYER_DATA.engagement.dailyActive}%</Text>
                </View>
                <View style={styles.engagementBreakdownItem}>
                  <Text style={styles.engagementBreakdownLabel}>Weekly Active</Text>
                  <Text style={[styles.engagementBreakdownValue, { color: THEME.electricPurple }]}>{PLAYER_DATA.engagement.weeklyActive}%</Text>
                </View>
                <View style={styles.engagementBreakdownItem}>
                  <Text style={styles.engagementBreakdownLabel}>Monthly Active</Text>
                  <Text style={[styles.engagementBreakdownValue, { color: THEME.amber }]}>{PLAYER_DATA.engagement.monthlyActive}%</Text>
                </View>
              </View>
            </View>
          </BlurView>
        </Animated.View>

        {/* AI Recommendations */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
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
  retentionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  retentionMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  retentionMetric: {
    alignItems: 'center',
  },
  retentionLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  retentionValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  chartContainer: {
    marginTop: 16,
  },
  churnRiskCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 16,
  },
  churnRiskOverview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  churnRiskItem: {
    alignItems: 'center',
  },
  churnRiskLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  churnRiskValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  churnPlayersContainer: {
    gap: 12,
  },
  churnCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  churnHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  churnPlayerName: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.text,
  },
  churnRiskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  churnRiskText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  churnDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  churnDetail: {
    flex: 1,
  },
  churnDetailLabel: {
    fontSize: 11,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  churnDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.text,
  },
  progressionCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  progressionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  progressionMetric: {
    width: (SCREEN_WIDTH - 64) / 2,
    backgroundColor: THEME.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  progressionLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  progressionValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  engagementCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  engagementOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  engagementScoreContainer: {
    alignItems: 'center',
  },
  engagementScoreLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 8,
  },
  engagementScoreValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  engagementBreakdown: {
    flex: 1,
    marginLeft: 20,
  },
  engagementBreakdownItem: {
    marginBottom: 12,
  },
  engagementBreakdownLabel: {
    fontSize: 12,
    color: THEME.textMuted,
    marginBottom: 4,
  },
  engagementBreakdownValue: {
    fontSize: 16,
    fontWeight: '600',
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
