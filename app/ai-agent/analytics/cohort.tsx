import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  ChevronLeft, Users, Calendar, TrendingUp, TrendingDown, Funnel,
  BarChart3, PieChart, ArrowUpRight, Download, Share2, Info
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';

const COHORT_PERIODS = ['Daily', 'Weekly', 'Monthly', 'Quarterly'];
const METRICS = ['Retention', 'Churn', 'Revenue', 'Engagement'];

const COHORT_DATA = [
  {
    cohort: 'Jan 2026',
    users: 1250,
    weeks: [100, 85, 78, 72, 68, 65, 62, 60]
  },
  {
    cohort: 'Dec 2025',
    users: 1180,
    weeks: [100, 82, 75, 70, 66, 63, 60, 58]
  },
  {
    cohort: 'Nov 2025',
    users: 1320,
    weeks: [100, 88, 80, 74, 70, 67, 65, 63]
  },
  {
    cohort: 'Oct 2025',
    users: 1150,
    weeks: [100, 84, 76, 71, 67, 64, 61, 59]
  },
  {
    cohort: 'Sep 2025',
    users: 1080,
    weeks: [100, 80, 72, 68, 64, 60, 58, 55]
  },
  {
    cohort: 'Aug 2025',
    users: 950,
    weeks: [100, 78, 70, 65, 61, 58, 55, 52]
  },
];

const RETENTION_INSIGHTS = [
  { week: 'Week 1', rate: '84%', trend: 'stable', insight: 'Strong onboarding flow' },
  { week: 'Week 4', rate: '71%', trend: 'improving', insight: 'Feature adoption peaks' },
  { week: 'Week 8', rate: '58%', trend: 'declining', insight: 'Consider re-engagement' },
];

const SEGMENTS = [
  { name: 'Enterprise', retention: 78, color: '#3B82F6' },
  { name: 'Mid-Market', retention: 65, color: '#10B981' },
  { name: 'SMB', retention: 52, color: '#F59E0B' },
  { name: 'Startup', retention: 45, color: '#EC4899' },
];

export default function CohortAnalysisScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [selectedMetric, setSelectedMetric] = useState('Retention');
  const [showHeatmap, setShowHeatmap] = useState(true);

  const getRetentionColor = (value: number) => {
    if (value >= 70) return '#10B981';
    if (value >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getBackgroundColor = (value: number) => {
    if (value >= 70) return '#10B98120';
    if (value >= 50) return '#F59E0B20';
    return '#EF444420';
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
            Cohort Analysis
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Download size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
            {COHORT_PERIODS.map((period) => (
              <TouchableOpacity
                key={period}
                onPress={() => setSelectedPeriod(period)}
                style={[
                  styles.controlChip,
                  selectedPeriod === period && { backgroundColor: '#8B5CF6' }
                ]}
              >
                <Text style={[
                  styles.controlText,
                  { color: selectedPeriod === period ? '#fff' : theme.colors.text }
                ]}>
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricScroll}>
            {METRICS.map((metric) => (
              <TouchableOpacity
                key={metric}
                onPress={() => setSelectedMetric(metric)}
                style={[
                  styles.controlChip,
                  selectedMetric === metric && { backgroundColor: '#3B82F6' }
                ]}
              >
                <Text style={[
                  styles.controlText,
                  { color: selectedMetric === metric ? '#fff' : theme.colors.text }
                ]}>
                  {metric}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryRow}>
        <Animated.View entering={FadeInUp} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#10B98115' }]}>
            <Users size={20} color="#10B981" />
          </View>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>68.4%</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Avg Retention</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(50)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#3B82F615' }]}>
            <Calendar size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>8.2</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Avg Lifetime (mo)</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <View style={[styles.summaryIcon, { backgroundColor: '#8B5CF615' }]}>
            <TrendingUp size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>+4.3%</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>MoM Change</Text>
        </Animated.View>
      </View>

      {/* Cohort Heatmap */}
      <View style={[styles.heatmapSection, { backgroundColor: theme.colors.card }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Retention Heatmap
          </Text>
          <TouchableOpacity onPress={() => setShowHeatmap(!showHeatmap)}>
            <Text style={[styles.toggleText, { color: '#8B5CF6' }]}>
              {showHeatmap ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>

        {showHeatmap && (
          <View style={styles.heatmapContainer}>
            {/* Header Row */}
            <View style={styles.heatmapHeader}>
              <Text style={[styles.headerCell, { color: theme.colors.textSecondary, flex: 2 }]}>Cohort</Text>
              <Text style={[styles.headerCell, { color: theme.colors.textSecondary }]}>Users</Text>
              {['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'].map((week) => (
                <Text key={week} style={[styles.headerCell, { color: theme.colors.textSecondary }]}>
                  {week}
                </Text>
              ))}
            </View>

            {/* Data Rows */}
            {COHORT_DATA.map((cohort, i) => (
              <Animated.View 
                key={cohort.cohort}
                entering={FadeInUp.delay(i * 30)}
                style={styles.cohortRow}
              >
                <Text style={[styles.cohortCell, { color: theme.colors.text, flex: 2 }]}>
                  {cohort.cohort}
                </Text>
                <Text style={[styles.cohortCell, { color: theme.colors.textSecondary }]}>
                  {cohort.users}
                </Text>
                {cohort.weeks.map((value, j) => (
                  <View 
                    key={j}
                    style={[
                      styles.dataCell,
                      { backgroundColor: getBackgroundColor(value) }
                    ]}
                  >
                    <Text style={[styles.dataText, { color: getRetentionColor(value) }]}>
                      {value}%
                    </Text>
                  </View>
                ))}
              </Animated.View>
            ))}
          </View>
        )}
      </View>

      {/* Retention Insights */}
      <View style={[styles.insightsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Key Insights
        </Text>
        {RETENTION_INSIGHTS.map((insight, i) => (
          <Animated.View 
            key={insight.week}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.insightCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={styles.insightLeft}>
              <Text style={[styles.insightWeek, { color: theme.colors.text }]}>{insight.week}</Text>
              <View style={styles.insightRow}>
                <Text style={[styles.insightRate, { color: '#3B82F6' }]}>{insight.rate}</Text>
                {insight.trend === 'improving' && <TrendingUp size={14} color="#10B981" />}
                {insight.trend === 'declining' && <TrendingDown size="14" color="#EF4444" />}
              </View>
            </View>
            <View style={styles.insightRight}>
              <Info size={16} color={theme.colors.textSecondary} />
              <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
                {insight.insight}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Segments */}
      <View style={[styles.segmentsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Retention by Segment
        </Text>
        {SEGMENTS.map((segment, i) => (
          <Animated.View 
            key={segment.name}
            entering={FadeInUp.delay(i * 50)}
            style={styles.segmentRow}
          >
            <View style={styles.segmentLeft}>
              <View style={[styles.segmentDot, { backgroundColor: segment.color }]} />
              <Text style={[styles.segmentName, { color: theme.colors.text }]}>
                {segment.name}
              </Text>
            </View>
            <View style={styles.segmentCenter}>
              <View style={[styles.segmentBar, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.segmentFill, 
                    { width: `${segment.retention}%`, backgroundColor: segment.color }
                  ]} 
                />
              </View>
            </View>
            <Text style={[styles.segmentValue, { color: segment.color }]}>
              {segment.retention}%
            </Text>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '700', flex: 1, marginLeft: 12 },
  headerActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  controls: { gap: 10 },
  periodScroll: { marginBottom: 8 },
  metricScroll: {},
  controlChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  controlText: { fontSize: 13, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', padding: 16, gap: 10 },
  summaryCard: { flex: 1, alignItems: 'center', padding: 16, borderRadius: 16 },
  summaryIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  summaryValue: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  summaryLabel: { fontSize: 12 },
  heatmapSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '700' },
  toggleText: { fontSize: 14, fontWeight: '600' },
  heatmapContainer: {},
  heatmapHeader: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' },
  headerCell: { fontSize: 11, fontWeight: '600', flex: 1, textAlign: 'center' },
  cohortRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  cohortCell: { fontSize: 12, flex: 1, textAlign: 'center', fontWeight: '500' },
  dataCell: { flex: 1, margin: 1, paddingVertical: 6, borderRadius: 4, alignItems: 'center' },
  dataText: { fontSize: 10, fontWeight: '700' },
  insightsSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  insightCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10 },
  insightLeft: {},
  insightWeek: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  insightRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  insightRate: { fontSize: 18, fontWeight: '800' },
  insightRight: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' },
  insightText: { fontSize: 12, flex: 1, textAlign: 'right' },
  segmentsSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  segmentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  segmentLeft: { flexDirection: 'row', alignItems: 'center', width: 100 },
  segmentDot: { width: 10, height: 10, borderRadius: 5, marginRight: 10 },
  segmentName: { fontSize: 14, fontWeight: '500' },
  segmentCenter: { flex: 1, marginHorizontal: 12 },
  segmentBar: { height: 8, borderRadius: 4 },
  segmentFill: { height: 8, borderRadius: 4 },
  segmentValue: { fontSize: 16, fontWeight: '700', width: 50, textAlign: 'right' },
});
