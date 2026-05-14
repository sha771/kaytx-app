import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { 
  Funnel, Users, MousePointer, ShoppingCart, CheckCircle, 
  ChevronRight, ArrowDown, TrendingUp, AlertCircle, Sliders
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const FUNNEL_STAGES = [
  { 
    id: 'awareness', 
    name: 'Awareness', 
    visitors: 50000, 
    dropOff: 0,
    color: '#3B82F6',
    icon: Users,
    metrics: { impressions: 125000, reach: 85000, ctr: '4.2%' }
  },
  { 
    id: 'interest', 
    name: 'Interest', 
    visitors: 28450, 
    dropOff: 43,
    color: '#8B5CF6',
    icon: MousePointer,
    metrics: { pageViews: 28450, avgTime: '2m 34s', bounceRate: '35%' }
  },
  { 
    id: 'consideration', 
    name: 'Consideration', 
    visitors: 12500, 
    dropOff: 56,
    color: '#F59E0B',
    icon: Sliders,
    metrics: { signups: 12500, contentDownloads: 3400, demoRequests: 890 }
  },
  { 
    id: 'intent', 
    name: 'Purchase Intent', 
    visitors: 4200, 
    dropOff: 66,
    color: '#EC4899',
    icon: ShoppingCart,
    metrics: { cartAdds: 4200, checkoutStarts: 3150, abandonment: '25%' }
  },
  { 
    id: 'conversion', 
    name: 'Conversion', 
    visitors: 1840, 
    dropOff: 56,
    color: '#10B981',
    icon: CheckCircle,
    metrics: { purchases: 1840, revenue: '$276,000', aov: '$150' }
  },
];

const CONVERSION_INSIGHTS = [
  { title: 'Biggest Drop-off', stage: 'Interest → Consideration', rate: '56%', action: 'Improve landing page content' },
  { title: 'Best Performing', stage: 'Intent → Conversion', rate: '44%', action: 'Checkout optimization working' },
  { title: 'Opportunity', stage: 'Cart Recovery', value: '$69K', action: 'Send abandoned cart emails' },
];

const COMPARISON_PERIODS = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date'];

export default function FunnelAnalyticsScreen() {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const totalConversion = ((FUNNEL_STAGES[FUNNEL_STAGES.length - 1].visitors / FUNNEL_STAGES[0].visitors) * 100).toFixed(2);
  const avgDropOff = (FUNNEL_STAGES.reduce((acc, stage) => acc + stage.dropOff, 0) / FUNNEL_STAGES.length).toFixed(0);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <View style={styles.headerTop}>
          <View style={[styles.iconWrap, { backgroundColor: '#8B5CF615' }]}>
            <Funnel size={28} color="#8B5CF6" />
          </View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Funnel Analytics
          </Text>
        </View>

        {/* Period Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.periodScroll}>
          {COMPARISON_PERIODS.map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                styles.periodChip,
                selectedPeriod === period && { backgroundColor: '#8B5CF6' }
              ]}
            >
              <Text style={[
                styles.periodText,
                { color: selectedPeriod === period ? '#fff' : theme.colors.text }
              ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryGrid}>
        <Animated.View entering={FadeInUp} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>{totalConversion}%</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Total Conversion</Text>
          <View style={[styles.trendBadge, { backgroundColor: '#10B98115' }]}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>+2.3%</Text>
          </View>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(50)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{avgDropOff}%</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Avg Drop-off</Text>
          <View style={[styles.trendBadge, { backgroundColor: '#F59E0B15' }]}>
            <AlertCircle size={14} color="#F59E0B" />
            <Text style={[styles.trendText, { color: '#F59E0B' }]}>Watch</Text>
          </View>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(100)} style={[styles.summaryCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>$276K</Text>
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Revenue</Text>
          <View style={[styles.trendBadge, { backgroundColor: '#3B82F615' }]}>
            <TrendingUp size={14} color="#3B82F6" />
            <Text style={[styles.trendText, { color: '#3B82F6' }]}>+12%</Text>
          </View>
        </Animated.View>
      </View>

      {/* Funnel Visualization */}
      <View style={[styles.funnelSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Conversion Funnel
        </Text>
        
        {FUNNEL_STAGES.map((stage, index) => (
          <Animated.View key={stage.id} entering={FadeInUp.delay(index * 100)}>
            <TouchableOpacity
              style={styles.stageContainer}
              onPress={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
            >
              {/* Stage Bar */}
              <View style={styles.stageRow}>
                <View style={styles.stageLeft}>
                  <View style={[styles.stageIcon, { backgroundColor: stage.color + '15' }]}>
                    <stage.icon size={18} color={stage.color} />
                  </View>
                  <View>
                    <Text style={[styles.stageName, { color: theme.colors.text }]}>
                      {stage.name}
                    </Text>
                    <Text style={[styles.stageVisitors, { color: theme.colors.textSecondary }]}>
                      {formatNumber(stage.visitors)} visitors
                    </Text>
                  </View>
                </View>
                <View style={styles.stageRight}>
                  {stage.dropOff > 0 && (
                    <View style={[styles.dropBadge, { backgroundColor: '#EF444415' }]}>
                      <ArrowDown size={12} color="#EF4444" />
                      <Text style={[styles.dropText, { color: '#EF4444' }]}>
                        {stage.dropOff}%
                      </Text>
                    </View>
                  )}
                  <ChevronRight size={18} color={theme.colors.textSecondary} />
                </View>
              </View>

              {/* Progress Bar */}
              <View style={[styles.progressBar, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(stage.visitors / FUNNEL_STAGES[0].visitors) * 100}%`, 
                      backgroundColor: stage.color 
                    }
                  ]} 
                />
              </View>

              {/* Conversion Rate */}
              <View style={styles.conversionRow}>
                <Text style={[styles.conversionLabel, { color: theme.colors.textSecondary }]}>
                  Conversion Rate
                </Text>
                <Text style={[styles.conversionValue, { color: stage.color }]}>
                  {index === 0 ? '100%' : ((stage.visitors / FUNNEL_STAGES[index - 1].visitors) * 100).toFixed(1) + '%'}
                </Text>
              </View>

              {/* Expanded Metrics */}
              {expandedStage === stage.id && (
                <View style={[styles.metricsPanel, { backgroundColor: theme.colors.background }]}>
                  <Text style={[styles.metricsTitle, { color: theme.colors.text }]}>
                    Stage Metrics
                  </Text>
                  <View style={styles.metricsGrid}>
                    {Object.entries(stage.metrics).map(([key, value]) => (
                      <View key={key} style={styles.metricBox}>
                        <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                          {value}
                        </Text>
                        <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Insights */}
      <View style={[styles.insightsSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Insights & Recommendations
        </Text>
        {CONVERSION_INSIGHTS.map((insight, i) => (
          <Animated.View 
            key={insight.title}
            entering={FadeInUp.delay(i * 50)}
            style={[styles.insightCard, { backgroundColor: theme.colors.background }]}
          >
            <View style={styles.insightHeader}>
              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                {insight.title}
              </Text>
              <View style={[
                styles.insightBadge,
                { backgroundColor: insight.title.includes('Drop') ? '#EF444415' : insight.title.includes('Opportunity') ? '#F59E0B15' : '#10B98115' }
              ]}>
                <Text style={[
                  styles.insightRate,
                  { color: insight.title.includes('Drop') ? '#EF4444' : insight.title.includes('Opportunity') ? '#F59E0B' : '#10B981' }
                ]}>
                  {insight.rate || insight.value}
                </Text>
              </View>
            </View>
            <Text style={[styles.insightStage, { color: theme.colors.textSecondary }]}>
              {insight.stage}
            </Text>
            <View style={styles.actionRow}>
              <TrendingUp size={14} color="#3B82F6" />
              <Text style={[styles.actionText, { color: '#3B82F6' }]}>
                {insight.action}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Comparison Chart */}
      <View style={[styles.comparisonSection, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Funnel Comparison
        </Text>
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonItem}>
            <Text style={[styles.comparisonLabel, { color: theme.colors.textSecondary }]}>
              Current Period
            </Text>
            <Text style={[styles.comparisonValue, { color: '#10B981' }]}>
              3.68%
            </Text>
          </View>
          <View style={styles.comparisonDivider} />
          <View style={styles.comparisonItem}>
            <Text style={[styles.comparisonLabel, { color: theme.colors.textSecondary }]}>
              Previous Period
            </Text>
            <Text style={[styles.comparisonValue, { color: theme.colors.text }]}>
              3.42%
            </Text>
          </View>
          <View style={styles.comparisonDivider} />
          <View style={styles.comparisonItem}>
            <Text style={[styles.comparisonLabel, { color: theme.colors.textSecondary }]}>
              Change
            </Text>
            <View style={styles.changeRow}>
              <TrendingUp size={14} color="#10B981" />
              <Text style={[styles.changeValue, { color: '#10B981' }]}>+7.6%</Text>
            </View>
          </View>
        </View>
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
  periodScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  periodChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  periodText: { fontSize: 13, fontWeight: '600' },
  summaryGrid: { flexDirection: 'row', padding: 16, gap: 10 },
  summaryCard: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center' },
  summaryValue: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  summaryLabel: { fontSize: 12, marginBottom: 8 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  trendText: { fontSize: 11, fontWeight: '700' },
  funnelSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  stageContainer: { marginBottom: 16 },
  stageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  stageLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stageIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  stageName: { fontSize: 15, fontWeight: '600' },
  stageVisitors: { fontSize: 13, marginTop: 2 },
  stageRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dropBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  dropText: { fontSize: 11, fontWeight: '700' },
  progressBar: { height: 8, borderRadius: 4, marginBottom: 8 },
  progressFill: { height: 8, borderRadius: 4 },
  conversionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  conversionLabel: { fontSize: 12 },
  conversionValue: { fontSize: 14, fontWeight: '700' },
  metricsPanel: { marginTop: 12, padding: 12, borderRadius: 12 },
  metricsTitle: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metricBox: { flex: 1, minWidth: '45%', padding: 10, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8 },
  metricValue: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  metricLabel: { fontSize: 11 },
  insightsSection: { marginHorizontal: 16, marginBottom: 16, padding: 16, borderRadius: 16 },
  insightCard: { padding: 14, borderRadius: 12, marginBottom: 10 },
  insightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  insightTitle: { fontSize: 15, fontWeight: '600' },
  insightBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  insightRate: { fontSize: 12, fontWeight: '700' },
  insightStage: { fontSize: 13, marginBottom: 8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actionText: { fontSize: 13, fontWeight: '600' },
  comparisonSection: { marginHorizontal: 16, marginBottom: 30, padding: 16, borderRadius: 16 },
  comparisonRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
  comparisonItem: { flex: 1, alignItems: 'center' },
  comparisonLabel: { fontSize: 12, marginBottom: 6 },
  comparisonValue: { fontSize: 20, fontWeight: '700' },
  comparisonDivider: { width: 1, height: 40, backgroundColor: 'rgba(0,0,0,0.1)' },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  changeValue: { fontSize: 16, fontWeight: '700' },
});
