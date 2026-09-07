 
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { BarChart3, TrendingUp, ChartPie, ChartLine, Download, Share2, Calendar } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ChartData {
  id: string;
  title: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  value: string;
  change: number;
  data: number[];
}

export default function DataVisualizationScreen() {
  const insets = useSafeAreaInsets();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [charts] = useState<ChartData[]>([
    {
      id: '1',
      title: 'Revenue Trend',
      type: 'line',
      value: '$145,234',
      change: 12.5,
      data: [45, 52, 48, 65, 72, 68, 75, 82, 78, 85, 92, 88],
    },
    {
      id: '2',
      title: 'Customer Acquisition',
      type: 'bar',
      value: '1,234',
      change: 8.3,
      data: [120, 145, 132, 158, 142, 165, 178, 156, 189, 175, 198, 205],
    },
    {
      id: '3',
      title: 'Traffic Sources',
      type: 'pie',
      value: '45.2K',
      change: 5.7,
      data: [35, 25, 20, 12, 8],
    },
    {
      id: '4',
      title: 'Conversion Rate',
      type: 'area',
      value: '12.8%',
      change: 2.1,
      data: [10.2, 10.8, 11.5, 11.2, 12.1, 11.8, 12.5, 12.8, 12.3, 13.1, 12.9, 13.4],
    },
  ]);

  const getChartIcon = (type: ChartData['type']) => {
    switch (type) {
      case 'bar':
        return <BarChart3 size={24} color="#60A5FA" />;
      case 'line':
        return <ChartLine size={24} color="#10B981" />;
      case 'pie':
        return <ChartPie size={24} color="#F59E0B" />;
      case 'area':
        return <TrendingUp size={24} color="#A78BFA" />;
      default:
        return <BarChart3 size={24} color="#60A5FA" />;
    }
  };

  const renderMiniChart = (data: number[], type: ChartData['type']) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;

    return (
      <View style={styles.miniChart}>
        {data.map((value, index) => {
          const height = ((value - min) / range) * 40 + 10;
          return (
            <View
              key={index}
              style={[
                styles.miniBarChart3,
                {
                  height,
                  backgroundColor: type === 'line' ? '#10B981' : type === 'bar' ? '#60A5FA' : type === 'pie' ? '#F59E0B' : '#A78BFA',
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Data Visualization',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Analytics Dashboard</Text>
            <Text style={styles.headerSubtitle}>Real-time insights</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Download size={20} color="#60A5FA" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Share2 size={20} color="#60A5FA" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeRangeSelector}>
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <TouchableOpacity
              key={range}
              style={[
                styles.timeRangeButton,
                timeRange === range && styles.timeRangeButtonActive,
              ]}
              onPress={() => setTimeRange(range)}
            >
              <Text
                style={[
                  styles.timeRangeText,
                  timeRange === range && styles.timeRangeTextActive,
                ]}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {charts.map((chart) => (
          <TouchableOpacity key={chart.id} style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <View style={styles.chartIconContainer}>
                {getChartIcon(chart.type)}
              </View>
              <View style={styles.chartInfo}>
                <Text style={styles.chartTitle}>{chart.title}</Text>
                <View style={styles.chartMetrics}>
                  <Text style={styles.chartValue}>{chart.value}</Text>
                  <View
                    style={[
                      styles.changeBadge,
                      chart.change >= 0 ? styles.changeBadgePositive : styles.changeBadgeNegative,
                    ]}
                  >
                    <TrendingUp size={12} color={chart.change >= 0 ? '#10B981' : '#EF4444'} />
                    <Text
                      style={[
                        styles.changeText,
                        chart.change >= 0 ? styles.changeTextPositive : styles.changeTextNegative,
                      ]}
                    >
                      {chart.change >= 0 ? '+' : ''}{chart.change}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {renderMiniChart(chart.data, chart.type)}

            <View style={styles.chartFooter}>
              <View style={styles.chartType}>
                <Text style={styles.chartTypeText}>{chart.type.toUpperCase()} CHART</Text>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.insightsSection}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#60A5FA" />
            <Text style={styles.sectionTitle}>Key Insights</Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <TrendingUp size={20} color="#10B981" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Revenue Growth Accelerating</Text>
              <Text style={styles.insightDescription}>
                Your revenue has grown by 12.5% this month, outpacing the 8.3% from last month
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <Calendar size={20} color="#60A5FA" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Best Performance Day</Text>
              <Text style={styles.insightDescription}>
                Thursdays show 23% higher conversion rates compared to other weekdays
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIcon}>
              <BarChart3 size={20} color="#F59E0B" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Top Traffic Source</Text>
              <Text style={styles.insightDescription}>
                Organic search contributes 35% of total traffic, up from 28% last period
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F2937',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1F2937',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeRangeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    alignItems: 'center',
  },
  timeRangeButtonActive: {
    backgroundColor: '#60A5FA',
  },
  timeRangeText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  timeRangeTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  chartCard: {
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  chartHeader: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  chartIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartInfo: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  chartMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chartValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  changeBadgePositive: {
    backgroundColor: '#1A3A2E',
  },
  changeBadgeNegative: {
    backgroundColor: '#3A1A1A',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  changeTextPositive: {
    color: '#10B981',
  },
  changeTextNegative: {
    color: '#EF4444',
  },
  miniChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 60,
    gap: 4,
    marginBottom: 16,
  },
  miniBarChart3: {
    flex: 1,
    borderRadius: 2,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartType: {
    backgroundColor: '#374151',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  chartTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  viewDetailsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#60A5FA',
  },
  insightsSection: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  insightDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    lineHeight: 18,
  },
});
