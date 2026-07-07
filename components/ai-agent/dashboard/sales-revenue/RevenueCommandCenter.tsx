import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, TrendingUp, Target, Award, ArrowUpRight, Activity, Zap, BarChart3, LineChart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RevenueMetrics {
  revenueToday: string;
  mrr: string;
  arr: string;
  pipelineValue: string;
  forecastedRevenue: string;
  monthlyRevenue: string;
  quarterlyRevenue: string;
  annualRevenue: string;
  revenueGrowth: number;
  salesTargetProgress: number;
}

interface RevenueCommandCenterProps {
  metrics: RevenueMetrics;
}

export default function RevenueCommandCenter({ metrics }: RevenueCommandCenterProps) {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={['rgba(16, 185, 129, 0.05)', 'rgba(59, 130, 246, 0.05)', 'rgba(139, 92, 246, 0.05)']}
      style={[styles.container, { backgroundColor: theme.colors.card }]}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <DollarSign size={20} color="#10B981" />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Revenue Command Center
        </Text>
        <View style={[styles.liveIndicator, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
          <Activity size={12} color="#10B981" />
          <Text style={[styles.liveText, { color: '#10B981' }]}>LIVE</Text>
        </View>
      </View>

      <View style={styles.mainMetrics}>
        <LinearGradient
          colors={['rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0.05)']}
          style={[styles.mainMetricCard, { borderColor: '#10B981' }]}
        >
          <View style={styles.metricIconContainer}>
            <DollarSign size={16} color="#10B981" />
          </View>
          <Text style={[styles.mainMetricLabel, { color: theme.colors.textSecondary }]}>
            Revenue Today
          </Text>
          <Text style={[styles.mainMetricValue, { color: '#10B981' }]}>
            {metrics.revenueToday}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={14} color="#10B981" />
            <Text style={[styles.metricTrendText, { color: '#10B981' }]}>
              +8.2% vs yesterday
            </Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(59, 130, 246, 0.15)', 'rgba(59, 130, 246, 0.05)']}
          style={[styles.mainMetricCard, { borderColor: '#3B82F6' }]}
        >
          <View style={styles.metricIconContainer}>
            <TrendingUp size={16} color="#3B82F6" />
          </View>
          <Text style={[styles.mainMetricLabel, { color: theme.colors.textSecondary }]}>
            MRR
          </Text>
          <Text style={[styles.mainMetricValue, { color: '#3B82F6' }]}>
            {metrics.mrr}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={14} color="#3B82F6" />
            <Text style={[styles.metricTrendText, { color: '#3B82F6' }]}>
              +12% vs last month
            </Text>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['rgba(139, 92, 246, 0.15)', 'rgba(139, 92, 246, 0.05)']}
          style={[styles.mainMetricCard, { borderColor: '#8B5CF6' }]}
        >
          <View style={styles.metricIconContainer}>
            <Zap size={16} color="#8B5CF6" />
          </View>
          <Text style={[styles.mainMetricLabel, { color: theme.colors.textSecondary }]}>
            ARR
          </Text>
          <Text style={[styles.mainMetricValue, { color: '#8B5CF6' }]}>
            {metrics.arr}
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={14} color="#8B5CF6" />
            <Text style={[styles.metricTrendText, { color: '#8B5CF6' }]}>
              +18% YoY
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.secondaryMetrics}>
        <View style={styles.metricRow}>
          <LinearGradient
            colors={['rgba(6, 182, 212, 0.1)', 'rgba(6, 182, 212, 0.05)']}
            style={[styles.metricItem, { borderColor: '#06B6D4' }]}
          >
            <View style={[styles.metricIcon, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
              <Target size={16} color="#06B6D4" />
            </View>
            <View style={styles.metricContent}>
              <Text style={[styles.metricItemLabel, { color: theme.colors.textSecondary }]}>
                Pipeline Value
              </Text>
              <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
                {metrics.pipelineValue}
              </Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(245, 158, 11, 0.1)', 'rgba(245, 158, 11, 0.05)']}
            style={[styles.metricItem, { borderColor: '#F59E0B' }]}
          >
            <View style={[styles.metricIcon, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <TrendingUp size={16} color="#F59E0B" />
            </View>
            <View style={styles.metricContent}>
              <Text style={[styles.metricItemLabel, { color: theme.colors.textSecondary }]}>
                Forecasted Revenue
              </Text>
              <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
                {metrics.forecastedRevenue}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.metricRow}>
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)']}
            style={[styles.metricItem, { borderColor: '#10B981' }]}
          >
            <View style={[styles.metricIcon, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Award size={16} color="#10B981" />
            </View>
            <View style={styles.metricContent}>
              <Text style={[styles.metricItemLabel, { color: theme.colors.textSecondary }]}>
                Sales Target Progress
              </Text>
              <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
                {metrics.salesTargetProgress}%
              </Text>
            </View>
            <View style={[styles.progressBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: metrics.salesTargetProgress >= 90 ? '#10B981' : 
                                 metrics.salesTargetProgress >= 70 ? '#3B82F6' : '#F59E0B',
                    width: `${metrics.salesTargetProgress}%`
                  }
                ]} 
              />
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(236, 72, 153, 0.1)', 'rgba(236, 72, 153, 0.05)']}
            style={[styles.metricItem, { borderColor: '#EC4899' }]}
          >
            <View style={[styles.metricIcon, { backgroundColor: 'rgba(236, 72, 153, 0.2)' }]}>
              <DollarSign size={16} color="#EC4899" />
            </View>
            <View style={styles.metricContent}>
              <Text style={[styles.metricItemLabel, { color: theme.colors.textSecondary }]}>
                Revenue Growth
              </Text>
              <Text style={[styles.metricItemValue, { color: theme.colors.text }]}>
                {metrics.revenueGrowth}%
              </Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Revenue Trend Chart */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleContainer}>
            <LineChart size={18} color="#06B6D4" />
            <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
              Revenue Trend
            </Text>
          </View>
          <View style={styles.chartPeriodSelector}>
            <Text style={[styles.periodText, { color: '#06B6D4' }]}>6M</Text>
            <Text style={[styles.periodText, { color: theme.colors.textSecondary }]}>1Y</Text>
            <Text style={[styles.periodText, { color: theme.colors.textSecondary }]}>ALL</Text>
          </View>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            {[
              { month: 'Jan', value: 48, actual: 46 },
              { month: 'Feb', value: 54, actual: 55 },
              { month: 'Mar', value: 58, actual: 61 },
              { month: 'Apr', value: 62, actual: 64 },
              { month: 'May', value: 66, actual: 69 },
              { month: 'Jun', value: 70, actual: 72 },
            ].map((data, index) => (
              <View key={data.month} style={styles.chartBarContainer}>
                <View style={styles.chartBars}>
                  <View style={[
                    styles.chartBar,
                    styles.forecastBar,
                    { height: data.value, backgroundColor: '#06B6D4' + '40' }
                  ]} />
                  <View style={[
                    styles.chartBar,
                    styles.actualBar,
                    { height: data.actual, backgroundColor: '#06B6D4' }
                  ]} />
                </View>
                <Text style={[styles.chartLabel, { color: theme.colors.textSecondary }]}>
                  {data.month}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
  },
  mainMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  mainMetricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  mainMetricLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  mainMetricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricTrendText: {
    fontSize: 11,
    fontWeight: '500',
  },
  secondaryMetrics: {
    gap: 12,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricContent: {
    marginBottom: 8,
  },
  metricItemLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricItemValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  chartSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartPeriodSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  periodText: {
    fontSize: 11,
    fontWeight: '600',
  },
  chartContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 8,
  },
  chartBarContainer: {
    alignItems: 'center',
    gap: 8,
  },
  chartBars: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'flex-end',
    height: 80,
  },
  chartBar: {
    width: 16,
    borderRadius: 4,
  },
  forecastBar: {
    opacity: 0.5,
  },
  actualBar: {
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    fontWeight: '500',
  }
});