import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Target, TrendingUp, TrendingDown, Users, Clock, Zap, Award, 
  BarChart3, PieChart, ChevronRight, Funnel, Calendar, AlertCircle, CheckCircle
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const KPI_CATEGORIES = [
  { id: 'revenue', name: 'Revenue', icon: TrendingUp, color: '#10B981', count: 6 },
  { id: 'growth', name: 'Growth', icon: Zap, color: '#3B82F6', count: 4 },
  { id: 'efficiency', name: 'Efficiency', icon: Clock, color: '#F59E0B', count: 5 },
  { id: 'quality', name: 'Quality', icon: Award, color: '#8B5CF6', count: 3 },
];

const KPI_METRICS = [
  {
    id: 'mrr',
    name: 'Monthly Recurring Revenue',
    category: 'revenue',
    value: '$124.5K',
    target: '$130K',
    change: '+12.5%',
    status: 'on_track',
    progress: 96,
    trend: [100, 105, 110, 108, 115, 120, 124],
    period: 'This Month'
  },
  {
    id: 'arr',
    name: 'Annual Recurring Revenue',
    category: 'revenue',
    value: '$1.49M',
    target: '$1.5M',
    change: '+18.2%',
    status: 'on_track',
    progress: 99,
    trend: [1.2, 1.25, 1.3, 1.35, 1.4, 1.45, 1.49],
    period: 'YTD'
  },
  {
    id: 'nrr',
    name: 'Net Revenue Retention',
    category: 'revenue',
    value: '112%',
    target: '110%',
    change: '+2.1%',
    status: 'exceeding',
    progress: 102,
    trend: [105, 106, 107, 108, 109, 111, 112],
    period: 'This Quarter'
  },
  {
    id: 'cac',
    name: 'Customer Acquisition Cost',
    category: 'growth',
    value: '$1,240',
    target: '$1,100',
    change: '+8.5%',
    status: 'at_risk',
    progress: 88,
    trend: [980, 1020, 1050, 1080, 1100, 1150, 1240],
    period: 'This Month'
  },
  {
    id: 'ltv',
    name: 'Customer Lifetime Value',
    category: 'growth',
    value: '$8,450',
    target: '$8,000',
    change: '+15.3%',
    status: 'exceeding',
    progress: 106,
    trend: [6800, 7000, 7200, 7500, 7800, 8100, 8450],
    period: 'Avg'
  },
  {
    id: 'churn',
    name: 'Monthly Churn Rate',
    category: 'growth',
    value: '2.1%',
    target: '3.0%',
    change: '-0.8%',
    status: 'exceeding',
    progress: 70,
    trend: [3.5, 3.2, 2.9, 2.7, 2.5, 2.3, 2.1],
    period: 'This Month'
  },
  {
    id: 'nps',
    name: 'Net Promoter Score',
    category: 'quality',
    value: '52',
    target: '50',
    change: '+8',
    status: 'exceeding',
    progress: 104,
    trend: [38, 40, 42, 44, 46, 48, 52],
    period: 'This Quarter'
  },
  {
    id: 'csat',
    name: 'Customer Satisfaction',
    category: 'quality',
    value: '4.6/5',
    target: '4.5/5',
    change: '+0.2',
    status: 'on_track',
    progress: 98,
    trend: [4.2, 4.3, 4.3, 4.4, 4.5, 4.5, 4.6],
    period: 'Avg'
  },
  {
    id: 'response',
    name: 'Avg Response Time',
    category: 'efficiency',
    value: '2.3h',
    target: '2h',
    change: '+15%',
    status: 'at_risk',
    progress: 87,
    trend: [1.5, 1.6, 1.7, 1.9, 2.0, 2.1, 2.3],
    period: 'This Week'
  },
  {
    id: 'resolution',
    name: 'First Contact Resolution',
    category: 'efficiency',
    value: '76%',
    target: '80%',
    change: '+3%',
    status: 'on_track',
    progress: 95,
    trend: [68, 70, 71, 72, 73, 74, 76],
    period: 'This Month'
  },
];

const STATUS_CONFIG = {
  on_track: { color: '#3B82F6', icon: CheckCircle, label: 'On Track' },
  exceeding: { color: '#10B981', icon: TrendingUp, label: 'Exceeding' },
  at_risk: { color: '#F59E0B', icon: AlertCircle, label: 'At Risk' },
  behind: { color: '#EF4444', icon: TrendingDown, label: 'Behind' },
};

export default function KPIDashboardScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredMetrics = selectedCategory === 'all' 
    ? KPI_METRICS 
    : KPI_METRICS.filter(m => m.category === selectedCategory);

  const getStatusConfig = (status: string) => STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.on_track;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <View style={[styles.iconWrap, { backgroundColor: '#10B98115' }]}>
            <Target size={28} color="#10B981" />
          </View>
          <View>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              KPI Dashboard
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Track key performance indicators
            </Text>
          </View>
        </View>

        {/* Summary Stats */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryBadge, { backgroundColor: '#10B98115' }]}>
            <Text style={[styles.summaryCount, { color: '#10B981' }]}>4</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Exceeding</Text>
          </View>
          <View style={[styles.summaryBadge, { backgroundColor: '#3B82F615' }]}>
            <Text style={[styles.summaryCount, { color: '#3B82F6' }]}>3</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>On Track</Text>
          </View>
          <View style={[styles.summaryBadge, { backgroundColor: '#F59E0B15' }]}>
            <Text style={[styles.summaryCount, { color: '#F59E0B' }]}>2</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>At Risk</Text>
          </View>
          <View style={[styles.summaryBadge, { backgroundColor: '#EF444415' }]}>
            <Text style={[styles.summaryCount, { color: '#EF4444' }]}>1</Text>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Behind</Text>
          </View>
        </View>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        <TouchableOpacity
          onPress={() => setSelectedCategory('all')}
          style={[
            styles.categoryChip,
            selectedCategory === 'all' && { backgroundColor: '#3B82F6' }
          ]}
        >
          <Text style={[
            styles.categoryText,
            { color: selectedCategory === 'all' ? '#fff' : theme.colors.text }
          ]}>
            All KPIs
          </Text>
        </TouchableOpacity>
        {KPI_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            style={[
              styles.categoryChip,
              selectedCategory === cat.id && { backgroundColor: cat.color }
            ]}
          >
            <cat.icon size={14} color={selectedCategory === cat.id ? '#fff' : cat.color} />
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === cat.id ? '#fff' : theme.colors.text }
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* KPI Cards */}
      <View style={styles.kpiGrid}>
        {filteredMetrics.map((metric, index) => {
          const status = getStatusConfig(metric.status);
          return (
            <Animated.View 
              key={metric.id}
              entering={FadeInUp.delay(index * 50)}
              style={[styles.kpiCard, { backgroundColor: theme.colors.card }]}
            >
              {/* Card Header */}
              <View style={styles.kpiHeader}>
                <View style={styles.kpiTitleRow}>
                  <Text style={[styles.kpiName, { color: theme.colors.text }]} numberOfLines={2}>
                    {metric.name}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '15' }]}>
                    <status.icon size={14} color={status.color} />
                  </View>
                </View>
                <Text style={[styles.kpiPeriod, { color: theme.colors.textSecondary }]}>
                  {metric.period}
                </Text>
              </View>

              {/* Main Value */}
              <View style={styles.kpiValueSection}>
                <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                  {metric.value}
                </Text>
                <View style={styles.kpiMeta}>
                  <Text style={[styles.kpiTarget, { color: theme.colors.textSecondary }]}>
                    Target: {metric.target}
                  </Text>
                  <View style={[
                    styles.changeBadge,
                    { backgroundColor: metric.change.startsWith('+') ? '#10B98115' : '#EF444415' }
                  ]}>
                    <Text style={[
                      styles.changeText,
                      { color: metric.change.startsWith('+') ? '#10B981' : '#EF4444' }
                    ]}>
                      {metric.change}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressLabel, { color: theme.colors.textSecondary }]}>
                    Progress
                  </Text>
                  <Text style={[styles.progressValue, { color: status.color }]}>
                    {metric.progress}%
                  </Text>
                </View>
                <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${Math.min(metric.progress, 100)}%`, backgroundColor: status.color }
                    ]} 
                  />
                </View>
              </View>

              {/* Mini Trend */}
              <View style={styles.trendSection}>
                <View style={styles.trendBar}>
                  {metric.trend.map((val, i) => (
                    <View 
                      key={i}
                      style={[
                        styles.trendDot,
                        { 
                          backgroundColor: i === metric.trend.length - 1 ? status.color : theme.colors.textSecondary + '40',
                          height: Math.max(4, (val / Math.max(...metric.trend)) * 20)
                        }
                      ]}
                    />
                  ))}
                </View>
              </View>
            </Animated.View>
          );
        })}
      </View>

      {/* Category Overview */}
      <View style={[styles.overviewSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Category Overview
        </Text>
        {KPI_CATEGORIES.map((cat, i) => (
          <Animated.View 
            key={cat.id}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.categoryRow, { backgroundColor: theme.colors.background }]}
          >
            <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}>
              <cat.icon size={18} color={cat.color} />
            </View>
            <View style={styles.categoryInfo}>
              <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                {cat.name}
              </Text>
              <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
                {cat.count} metrics
              </Text>
            </View>
            <View style={styles.categoryStats}>
              <View style={[styles.healthIndicator, { backgroundColor: cat.color }]} />
              <Text style={[styles.healthText, { color: cat.color }]}>
                {Math.round((KPI_METRICS.filter(m => m.category === cat.id && (m.status === 'on_track' || m.status === 'exceeding')).length / cat.count) * 100)}%
              </Text>
              <ChevronRight size={18} color={theme.colors.textSecondary} />
            </View>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 60 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  iconWrap: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '700' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  summaryRow: { flexDirection: 'row', gap: 8 },
  summaryBadge: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 10 },
  summaryCount: { fontSize: 20, fontWeight: '800' },
  summaryLabel: { fontSize: 11, marginTop: 2 },
  categoryScroll: { marginTop: 16 },
  categoryContent: { paddingHorizontal: 16, gap: 8 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  categoryText: { fontSize: 13, fontWeight: '600' },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 12 },
  kpiCard: { width: (width - 44) / 2, padding: 14, borderRadius: 16 },
  kpiHeader: { marginBottom: 10 },
  kpiTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  kpiName: { flex: 1, fontSize: 13, fontWeight: '600', marginRight: 8, lineHeight: 18 },
  statusBadge: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  kpiPeriod: { fontSize: 11 },
  kpiValueSection: { marginBottom: 12 },
  kpiValue: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  kpiMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kpiTarget: { fontSize: 11 },
  changeBadge: { paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4 },
  changeText: { fontSize: 10, fontWeight: '700' },
  progressSection: { marginBottom: 10 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  progressLabel: { fontSize: 11 },
  progressValue: { fontSize: 12, fontWeight: '700' },
  progressBar: { height: 6, borderRadius: 3 },
  progressFill: { height: 6, borderRadius: 3 },
  trendSection: {},
  trendBar: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 20 },
  trendDot: { width: 4, borderRadius: 2 },
  overviewSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 14 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 10 },
  categoryIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  categoryInfo: { flex: 1, marginLeft: 12 },
  categoryName: { fontSize: 15, fontWeight: '600' },
  categoryCount: { fontSize: 12, marginTop: 2 },
  categoryStats: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  healthIndicator: { width: 8, height: 8, borderRadius: 4 },
  healthText: { fontSize: 14, fontWeight: '700' },
});
