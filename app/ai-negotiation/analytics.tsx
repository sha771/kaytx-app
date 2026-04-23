 
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Percent,
  Phone,
  ArrowUp,
  ArrowDown,
  Filter,
} from 'lucide-react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Stack } from 'expo-router';
import { trpc } from '@/lib/trpc';
import { mockAnalyticsData } from '@/utils/mockNegotiationData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 52) / 2;

export default function AnalyticsScreen() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'deals' | 'winRate'>('revenue');

  // Fetch real-time analytics data from tRPC
  const { data: statsData } = trpc.aiAgents.getStats.useQuery({ category: 'negotiation' });
  const { data: negotiationAnalytics } = trpc.negotiation.getAnalytics.useQuery({ 
    period: selectedPeriod === 'month' ? 'month' : selectedPeriod === 'quarter' ? 'month' : 'month' // Simplified for mapping
  });

  const periods = [
    { key: 'month' as const, label: 'This Month' },
    { key: 'quarter' as const, label: 'This Quarter' },
    { key: 'year' as const, label: 'This Year' },
  ];

  const metrics = [
    { key: 'revenue' as const, label: 'Revenue', icon: DollarSign, color: '#34C759' },
    { key: 'deals' as const, label: 'Deals', icon: Target, color: '#007AFF' },
    { key: 'winRate' as const, label: 'Win Rate', icon: Award, color: '#FF9500' },
  ];

  const currentMetricData = mockAnalyticsData[selectedMetric];

  const keyMetrics = useMemo(() => [
    {
      title: 'Total Revenue',
      value: statsData?.totalTasks ? `$${((statsData.totalTasks * 1500) / 1000000).toFixed(1)}M` : '$5.3M',
      change: '+30.2%',
      trend: 'up' as const,
      icon: DollarSign,
      color: '#34C759',
    },
    {
      title: 'Total Deals',
      value: statsData?.totalTasks ? Math.round(statsData.totalTasks * 0.05).toString() : '342',
      change: '+26.2%',
      trend: 'up' as const,
      icon: Target,
      color: '#007AFF',
    },
    {
      title: 'Win Rate',
      value: statsData?.avgSuccessRate ? `${statsData.avgSuccessRate}%` : '70%',
      change: '+7.7%',
      trend: 'up' as const,
      icon: Award,
      color: '#FF9500',
    },
    {
      title: 'Avg Deal Size',
      value: '$15.5K',
      change: '+4.1%',
      trend: 'up' as const,
      icon: TrendingUp,
      color: '#AF52DE',
    },
    {
      title: 'Total Calls',
      value: statsData?.totalTasks ? statsData.totalTasks.toLocaleString() : '2,847',
      change: '+15.9%',
      trend: 'up' as const,
      icon: Phone,
      color: '#FF2D92',
    },
    {
      title: 'Conversion Rate',
      value: statsData?.avgSuccessRate ? `${Math.round(statsData.avgSuccessRate * 0.9)}%` : '68%',
      change: '+9.2%',
      trend: 'up' as const,
      icon: Percent,
      color: '#5856D6',
    },
  ], [statsData]);

  const getMaxValue = () => {
    const values = currentMetricData.chartData.map((d: { value: number }) => d.value);
    return Math.max(...values);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Stack.Screen
        options={{
          title: 'Analytics',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.text,
          headerRight: () => (
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color={theme.colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Performance Analytics</Text>
          <Text style={[styles.subtitle, { color: theme.colors.secondaryText }]}>
            Track your negotiation performance and trends
          </Text>
        </View>

        <View style={styles.periodSelector}>
          {periods.map((period: { key: 'month' | 'quarter' | 'year'; label: string }) => (
            <TouchableOpacity
              key={period.key}
              style={[
                styles.periodButton,
                selectedPeriod === period.key && { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => setSelectedPeriod(period.key)}
            >
              <Text
                style={[
                  styles.periodText,
                  {
                    color: selectedPeriod === period.key ? 'white' : theme.colors.secondaryText,
                  },
                ]}
              >
                {period.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.metricsGrid}>
          {keyMetrics.map((metric: any, index: number) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === 'up' ? ArrowUp : ArrowDown;
            return (
              <View
                key={index}
                style={[styles.metricCard, { backgroundColor: theme.colors.cardBackground }]}
              >
                <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
                  <Icon size={20} color={metric.color} />
                </View>
                <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                  {metric.value}
                </Text>
                <Text style={[styles.metricTitle, { color: theme.colors.secondaryText }]}>
                  {metric.title}
                </Text>
                <View style={styles.metricChange}>
                  <TrendIcon
                    size={14}
                    color={metric.trend === 'up' ? '#34C759' : '#FF3B30'}
                  />
                  <Text
                    style={[
                      styles.metricChangeText,
                      { color: metric.trend === 'up' ? '#34C759' : '#FF3B30' },
                    ]}
                  >
                    {metric.change}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Trend Analysis</Text>
          
          <View style={styles.metricTabs}>
            {metrics.map((metric: any) => {
              const Icon = metric.icon;
              return (
                <TouchableOpacity
                  key={metric.key}
                  style={[
                    styles.metricTab,
                    {
                      backgroundColor:
                        selectedMetric === metric.key ? `${metric.color}20` : theme.colors.cardBackground,
                      borderColor:
                        selectedMetric === metric.key ? metric.color : 'transparent',
                    },
                  ]}
                  onPress={() => setSelectedMetric(metric.key)}
                >
                  <Icon
                    size={18}
                    color={selectedMetric === metric.key ? metric.color : theme.colors.secondaryText}
                  />
                  <Text
                    style={[
                      styles.metricTabText,
                      {
                        color:
                          selectedMetric === metric.key ? metric.color : theme.colors.secondaryText,
                      },
                    ]}
                  >
                    {metric.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={[styles.chartCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.chartHeader}>
              <View>
                <Text style={[styles.chartValue, { color: theme.colors.text }]}>
                  {selectedMetric === 'revenue' && `$${(currentMetricData.current / 1000000).toFixed(1)}M`}
                  {selectedMetric === 'deals' && currentMetricData.current}
                  {selectedMetric === 'winRate' && `${currentMetricData.current}%`}
                </Text>
                <Text style={[styles.chartLabel, { color: theme.colors.secondaryText }]}>
                  Current {metrics.find(m => m.key === selectedMetric)?.label}
                </Text>
              </View>
              <View style={[styles.chartBadge, { backgroundColor: '#34C75920' }]}>
                <TrendingUp size={16} color="#34C759" />
                <Text style={[styles.chartBadgeText, { color: '#34C759' }]}>
                  +{currentMetricData.change}%
                </Text>
              </View>
            </View>

            <View style={styles.chart}>
              {currentMetricData.chartData.map((data: { month: string; value: number }, index: number) => {
                const height = (data.value / getMaxValue()) * 150;
                return (
                  <View key={index} style={styles.chartBarContainer}>
                    <View style={styles.chartBarWrapper}>
                      <View
                        style={[
                          styles.chartBar,
                          {
                            height,
                            backgroundColor: metrics.find((m: any) => m.key === selectedMetric)?.color,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.chartMonth, { color: theme.colors.secondaryText }]}>
                      {data.month}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Conversion Funnel
          </Text>
          <View style={[styles.funnelCard, { backgroundColor: theme.colors.cardBackground }]}>
            {mockAnalyticsData.conversionFunnel.map((stage: any, index: number) => {
              const isLast = index === mockAnalyticsData.conversionFunnel.length - 1;
              const prevStage = index > 0 ? mockAnalyticsData.conversionFunnel[index - 1] : null;
              const dropOff = prevStage
                ? ((prevStage.count - stage.count) / prevStage.count) * 100
                : 0;

              return (
                <View key={stage.stage}>
                  <View style={styles.funnelStage}>
                    <View style={styles.funnelLeft}>
                      <View
                        style={[
                          styles.funnelBar,
                          {
                            width: `${stage.conversion}%`,
                            backgroundColor: isLast ? '#34C759' : theme.colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <View style={styles.funnelRight}>
                      <View style={styles.funnelInfo}>
                        <Text style={[styles.funnelStageText, { color: theme.colors.text }]}>
                          {stage.stage}
                        </Text>
                        {index > 0 && (
                          <Text style={[styles.funnelDropOff, { color: '#FF3B30' }]}>
                            -{dropOff.toFixed(1)}%
                          </Text>
                        )}
                      </View>
                      <View style={styles.funnelStats}>
                        <Text style={[styles.funnelCount, { color: theme.colors.text }]}>
                          {stage.count}
                        </Text>
                        <Text style={[styles.funnelConversion, { color: '#34C759' }]}>
                          {stage.conversion}%
                        </Text>
                      </View>
                    </View>
                  </View>
                  {!isLast && <View style={styles.funnelDivider} />}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Call Volume by Hour
          </Text>
          <View style={[styles.timeCard, { backgroundColor: theme.colors.cardBackground }]}>
            <View style={styles.timeChart}>
              {mockAnalyticsData.callVolume.byHour.map((data: any, index: number) => {
                const maxCalls = Math.max(...mockAnalyticsData.callVolume.byHour.map((d: any) => d.calls));
                const height = (data.calls / maxCalls) * 100;
                return (
                  <View key={index} style={styles.timeBar}>
                    <View style={styles.timeBarWrapper}>
                      <View
                        style={[
                          styles.timeBarFill,
                          {
                            height: `${height}%`,
                            backgroundColor: theme.colors.primary,
                          },
                        ]}
                      />
                    </View>
                    <Text style={[styles.timeLabel, { color: theme.colors.secondaryText }]}>
                      {data.hour.replace(' ', '\n')}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Top Performers
          </Text>
          {mockAnalyticsData.topPerformers.map((performer: any, index: number) => (
            <View
              key={performer.name}
              style={[styles.performerCard, { backgroundColor: theme.colors.cardBackground }]}
            >
              <View style={styles.performerRank}>
                <Text style={[styles.rankNumber, { color: theme.colors.text }]}>
                  {index + 1}
                </Text>
              </View>
              <View style={styles.performerInfo}>
                <Text style={[styles.performerName, { color: theme.colors.text }]}>
                  {performer.name}
                </Text>
                <View style={styles.performerStats}>
                  <View style={styles.performerStat}>
                    <Target size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.performerStatText, { color: theme.colors.secondaryText }]}>
                      {performer.deals} deals
                    </Text>
                  </View>
                  <View style={styles.performerStat}>
                    <DollarSign size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.performerStatText, { color: theme.colors.secondaryText }]}>
                      ${(performer.revenue / 1000000).toFixed(1)}M
                    </Text>
                  </View>
                  <View style={styles.performerStat}>
                    <Award size={12} color={theme.colors.secondaryText} />
                    <Text style={[styles.performerStatText, { color: theme.colors.secondaryText }]}>
                      {performer.winRate}%
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.winRateBadge, { backgroundColor: '#34C75920' }]}>
                <Text style={[styles.winRateText, { color: '#34C759' }]}>
                  {performer.winRate}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  filterButton: {
    padding: 8,
    marginRight: 8,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 12,
    marginBottom: 8,
  },
  metricCard: {
    width: CARD_WIDTH,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  metricTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricChangeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  metricTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  metricTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    gap: 6,
  },
  metricTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  chartValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  chartLabel: {
    fontSize: 13,
  },
  chartBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  chartBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 170,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarWrapper: {
    flex: 1,
    width: '70%',
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 4,
  },
  chartMonth: {
    fontSize: 11,
    marginTop: 8,
    fontWeight: '600',
  },
  funnelCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  funnelStage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  funnelLeft: {
    width: 80,
    height: 40,
    justifyContent: 'center',
  },
  funnelBar: {
    height: 40,
    borderRadius: 8,
  },
  funnelRight: {
    flex: 1,
  },
  funnelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  funnelStageText: {
    fontSize: 15,
    fontWeight: '600',
  },
  funnelDropOff: {
    fontSize: 12,
    fontWeight: '600',
  },
  funnelStats: {
    flexDirection: 'row',
    gap: 16,
  },
  funnelCount: {
    fontSize: 13,
    fontWeight: '700',
  },
  funnelConversion: {
    fontSize: 13,
    fontWeight: '700',
  },
  funnelDivider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 16,
  },
  timeCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  timeChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 160,
  },
  timeBar: {
    flex: 1,
    alignItems: 'center',
  },
  timeBarWrapper: {
    flex: 1,
    width: '60%',
    justifyContent: 'flex-end',
  },
  timeBarFill: {
    width: '100%',
    borderRadius: 4,
  },
  timeLabel: {
    fontSize: 9,
    marginTop: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
  performerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  performerRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,122,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '800',
  },
  performerInfo: {
    flex: 1,
  },
  performerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  performerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  performerStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  performerStatText: {
    fontSize: 12,
  },
  winRateBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  winRateText: {
    fontSize: 14,
    fontWeight: '800',
  },
});
