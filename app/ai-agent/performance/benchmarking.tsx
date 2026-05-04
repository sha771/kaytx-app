import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Trophy, Target, TrendingUp, Users, Zap,
  BarChart3, Globe, Building2, ArrowUpRight, ArrowDownRight,
  Star, Award, Medal, Funnel, Share2
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const BENCHMARK_CATEGORIES = ['Industry', 'Company Size', 'Region', 'Revenue'];
const TIME_PERIODS = ['Q1 2026', 'Q4 2025', 'Q3 2025', 'YTD 2026'];

const METRICS = [
  {
    name: 'Revenue per Employee',
    yourValue: 285000,
    benchmark: 245000,
    top: 350000,
    unit: '$',
    percentile: 82,
    trend: 'up'
  },
  {
    name: 'CAC Payback Period',
    yourValue: 8.5,
    benchmark: 12,
    top: 6,
    unit: 'mo',
    percentile: 76,
    trend: 'up'
  },
  {
    name: 'Net Revenue Retention',
    yourValue: 112,
    benchmark: 105,
    top: 125,
    unit: '%',
    percentile: 68,
    trend: 'up'
  },
  {
    name: 'Gross Margin',
    yourValue: 78,
    benchmark: 72,
    top: 85,
    unit: '%',
    percentile: 85,
    trend: 'stable'
  },
  {
    name: 'Sales Cycle Length',
    yourValue: 32,
    benchmark: 45,
    top: 21,
    unit: 'days',
    percentile: 71,
    trend: 'up'
  },
  {
    name: 'Customer Satisfaction',
    yourValue: 4.6,
    benchmark: 4.2,
    top: 4.9,
    unit: '/5',
    percentile: 88,
    trend: 'up'
  },
];

const COMPETITORS = [
  { name: 'Your Company', score: 87, position: 1, trend: 'up' },
  { name: 'TechLeader Inc', score: 84, position: 2, trend: 'stable' },
  { name: 'GrowthCorp', score: 79, position: 3, trend: 'up' },
  { name: 'ScaleUp Ltd', score: 76, position: 4, trend: 'down' },
  { name: 'InnovateCo', score: 72, position: 5, trend: 'stable' },
];

const ACHIEVEMENTS = [
  { icon: Trophy, title: 'Top Performer', desc: 'Revenue growth in top 5%', color: '#F59E0B' },
  { icon: Medal, title: 'Efficiency Master', desc: 'CAC ratio beats 90%', color: '#3B82F6' },
  { icon: Award, title: 'Growth Champion', desc: '112% net retention', color: '#10B981' },
  { icon: Star, title: 'Customer Love', desc: '4.6/5 satisfaction', color: '#EC4899' },
];

export default function BenchmarkingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Industry');
  const [selectedPeriod, setSelectedPeriod] = useState('Q1 2026');

  const formatValue = (metric: typeof METRICS[0]) => {
    if (metric.unit === '$') return `$${(metric.yourValue / 1000).toFixed(0)}K`;
    return `${metric.yourValue}${metric.unit}`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Benchmarking
          </Text>
          <TouchableOpacity style={styles.filterBtn}>
            <Funnel size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>

        {/* Category Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {BENCHMARK_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryChip,
                selectedCategory === cat && { backgroundColor: '#F59E0B' }
              ]}
            >
              <Text style={[
                styles.categoryText,
                { color: selectedCategory === cat ? '#fff' : theme.colors.text }
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Period Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {TIME_PERIODS.map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                styles.periodChip,
                selectedPeriod === period && { backgroundColor: '#3B82F6' }
              ]}
            >
              <Text style={[
                styles.periodText,
                { color: selectedPeriod === period ? '#fff' : theme.colors.textSecondary }
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Overall Score */}
      <View style={[styles.scoreSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.scoreHeader}>
          <View style={styles.scoreLeft}>
            <Trophy size={28} color="#F59E0B" />
            <View>
              <Text style={[styles.scoreTitle, { color: theme.colors.text }]}>
                Performance Score
              </Text>
              <Text style={[styles.scoreSubtitle, { color: theme.colors.textSecondary }]}>
                vs {selectedCategory} Benchmark
              </Text>
            </View>
          </View>
          <View style={styles.scoreRight}>
            <Text style={[styles.scoreValue, { color: '#F59E0B' }]}>87</Text>
            <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>/100</Text>
          </View>
        </View>
        <View style={styles.scoreBar}>
          <View style={[styles.scoreBarFill, { width: '87%', backgroundColor: '#F59E0B' }]} />
        </View>
        <Text style={[styles.scoreRank, { color: theme.colors.textSecondary }]}>
          Ranked #1 out of 50 companies in your {selectedCategory.toLowerCase()}
        </Text>
      </View>

      {/* Metrics Comparison */}
      <View style={[styles.metricsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Metrics vs Benchmark
        </Text>
        {METRICS.map((metric, i) => (
          <Animated.View 
            key={metric.name}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.metricCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={styles.metricHeader}>
              <Text style={[styles.metricName, { color: theme.colors.text }]}>{metric.name}</Text>
              <View style={[styles.percentileBadge, { backgroundColor: '#3B82F615' }]}>
                <Text style={[styles.percentileText, { color: '#3B82F6' }]}>
                  {metric.percentile}th %ile
                </Text>
              </View>
            </View>
            
            <View style={styles.metricComparison}>
              <View style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>You</Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  {formatValue(metric)}
                </Text>
                {metric.trend === 'up' && <TrendingUp size={16} color="#10B981" />}
                {metric.trend === 'down' && <ArrowDownRight size={16} color="#EF4444" />}
              </View>
              <View style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Avg</Text>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {metric.unit === '$' ? `$${(metric.benchmark / 1000).toFixed(0)}K` : `${metric.benchmark}${metric.unit}`}
                </Text>
              </View>
              <View style={styles.metricRow}>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>Top 10%</Text>
                <Text style={[styles.metricValue, { color: '#F59E0B' }]}>
                  {metric.unit === '$' ? `$${(metric.top / 1000).toFixed(0)}K` : `${metric.top}${metric.unit}`}
                </Text>
              </View>
            </View>

            {/* Benchmark Bar */}
            <View style={styles.benchmarkBar}>
              <View style={[styles.benchmarkBg, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.benchmarkFill,
                    { 
                      width: `${(metric.yourValue / metric.top) * 100}%`,
                      backgroundColor: metric.percentile >= 80 ? '#10B981' : metric.percentile >= 60 ? '#F59E0B' : '#EF4444'
                    }
                  ]} 
                />
                <View style={[styles.benchmarkMarker, { left: `${(metric.benchmark / metric.top) * 100}%` }]}>
                  <View style={styles.markerLine} />
                </View>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Leaderboard */}
      <View style={[styles.leaderboardSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Competitive Leaderboard
        </Text>
        {COMPETITORS.map((comp, i) => (
          <Animated.View 
            key={comp.name}
            entering={FadeInUp.delay(i * 50)}
            style={[
              styles.competitorRow,
              { backgroundColor: comp.position === 1 ? '#F59E0B15' : theme.colors.background }
            ]}
          >
            <View style={styles.positionBadge}>
              {comp.position === 1 ? (
                <Trophy size={16} color="#F59E0B" />
              ) : comp.position === 2 ? (
                <Medal size={16} color="#9CA3AF" />
              ) : comp.position === 3 ? (
                <Award size={16} color="#B45309" />
              ) : (
                <Text style={[styles.positionText, { color: theme.colors.textSecondary }]}>
                  {comp.position}
                </Text>
              )}
            </View>
            <Text style={[
              styles.competitorName, 
              { color: comp.position === 1 ? '#F59E0B' : theme.colors.text, fontWeight: comp.position === 1 ? '700' : '500' }
            ]}>
              {comp.name}
            </Text>
            <View style={styles.competitorRight}>
              {comp.trend === 'up' && <TrendingUp size={14} color="#10B981" />}
              {comp.trend === 'down' && <ArrowDownRight size={14} color="#EF4444" />}
              <Text style={[styles.competitorScore, { color: theme.colors.text }]}>{comp.score}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Achievements */}
      <View style={[styles.achievementsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Benchmark Achievements
        </Text>
        <View style={styles.achievementsGrid}>
          {ACHIEVEMENTS.map((achievement, i) => (
            <Animated.View 
              key={achievement.title}
              entering={FadeInUp.delay(i * 50)}
              style={[styles.achievementCard, { backgroundColor: theme.colors.background }]}
            >
              <View style={[styles.achievementIcon, { backgroundColor: achievement.color + '15' }]}>
                <achievement.icon size={24} color={achievement.color} />
              </View>
              <Text style={[styles.achievementTitle, { color: theme.colors.text }]}>
                {achievement.title}
              </Text>
              <Text style={[styles.achievementDesc, { color: theme.colors.textSecondary }]}>
                {achievement.desc}
              </Text>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  filterBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  categoryScroll: { marginBottom: 10 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  categoryText: { fontSize: 13, fontWeight: '600' },
  periodScroll: {},
  periodChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  periodText: { fontSize: 12, fontWeight: '600' },
  scoreSection: { marginHorizontal: 16, marginTop: 16, marginBottom: 16, padding: 20, borderRadius: 16 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  scoreLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  scoreTitle: { fontSize: 16, fontWeight: '600' },
  scoreSubtitle: { fontSize: 13, marginTop: 2 },
  scoreRight: { flexDirection: 'row', alignItems: 'baseline' },
  scoreValue: { fontSize: 36, fontWeight: '800' },
  scoreLabel: { fontSize: 16, marginLeft: 2 },
  scoreBar: { height: 8, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 4, marginBottom: 10 },
  scoreBarFill: { height: 8, borderRadius: 4 },
  scoreRank: { fontSize: 13, textAlign: 'center' },
  metricsSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 16 },
  metricCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  metricName: { fontSize: 14, fontWeight: '600' },
  percentileBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  percentileText: { fontSize: 11, fontWeight: '700' },
  metricComparison: { gap: 6 },
  metricRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  metricLabel: { fontSize: 13 },
  metricValue: { fontSize: 14, fontWeight: '700' },
  benchmarkBar: { marginTop: 12 },
  benchmarkBg: { height: 10, borderRadius: 5, position: 'relative' },
  benchmarkFill: { height: 10, borderRadius: 5 },
  benchmarkMarker: { position: 'absolute', top: -3, bottom: -3 },
  markerLine: { width: 2, height: 16, backgroundColor: '#6B7280', borderRadius: 1 },
  leaderboardSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  competitorRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, marginBottom: 8 },
  positionBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  positionText: { fontSize: 13, fontWeight: '700' },
  competitorName: { flex: 1, fontSize: 14 },
  competitorRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  competitorScore: { fontSize: 16, fontWeight: '700' },
  achievementsSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  achievementCard: { width: '47%', alignItems: 'center', padding: 14, borderRadius: 12 },
  achievementIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  achievementTitle: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  achievementDesc: { fontSize: 11, textAlign: 'center' },
});
