import React from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { TrendingUp, Activity, Zap, Shield, Server, Clock } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AdvancedChartsProps {
  chartType?: 'deployment' | 'performance' | 'cost' | 'incidents';
}

export default function AdvancedCharts({ chartType = 'deployment' }: AdvancedChartsProps) {
  const { theme } = useTheme();

  const chartConfig = {
    backgroundColor: 'rgba(255,255,255,0.05)',
    backgroundGradientFrom: 'rgba(255,255,255,0.05)',
    backgroundGradientTo: 'rgba(255,255,255,0.02)',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.7})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#06B6D4',
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: 'rgba(255,255,255,0.1)',
    },
  };

  const deploymentData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [32, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: [20, 35, 25, 45, 60, 30, 35],
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Successful', 'Failed'],
  };

  const performanceData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        data: [85, 92, 78, 88, 95, 82, 90],
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const costData = {
    labels: ['AWS', 'GCP', 'Azure', 'Other'],
    datasets: [
      {
        data: [45000, 32000, 28000, 15000],
      },
    ],
  };

  const incidentData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [2, 8, 15, 25],
      },
    ],
  };

  const pieChartData = [
    {
      name: 'AWS',
      population: 45000,
      color: '#FF9900',
      legendFontColor: '#7CAFC2',
      legendFontSize: 12,
    },
    {
      name: 'GCP',
      population: 32000,
      color: '#4285F4',
      legendFontColor: '#7CAFC2',
      legendFontSize: 12,
    },
    {
      name: 'Azure',
      population: 28000,
      color: '#0078D4',
      legendFontColor: '#7CAFC2',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      population: 15000,
      color: '#8B5CF6',
      legendFontColor: '#7CAFC2',
      legendFontSize: 12,
    },
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'deployment':
        return (
          <View>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleRow}>
                <Activity size={20} color="#06B6D4" />
                <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
                  Deployment Trends
                </Text>
              </View>
              <Text style={[styles.chartSubtitle, { color: theme.colors.textSecondary }]}>
                Last 7 days
              </Text>
            </View>
            <LineChart
              data={deploymentData}
              width={SCREEN_WIDTH - 64}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withLegend
            />
          </View>
        );
      case 'performance':
        return (
          <View>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleRow}>
                <Zap size={20} color="#10B981" />
                <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
                  System Performance
                </Text>
              </View>
              <Text style={[styles.chartSubtitle, { color: theme.colors.textSecondary }]}>
                Response time (ms)
              </Text>
            </View>
            <LineChart
              data={performanceData}
              width={SCREEN_WIDTH - 64}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              }}
              bezier
              style={styles.chart}
            />
          </View>
        );
      case 'cost':
        return (
          <View>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleRow}>
                <TrendingUp size={20} color="#8B5CF6" />
                <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
                  Cloud Cost Distribution
                </Text>
              </View>
              <Text style={[styles.chartSubtitle, { color: theme.colors.textSecondary }]}>
                Monthly spend by provider
              </Text>
            </View>
            <PieChart
              data={pieChartData}
              width={SCREEN_WIDTH - 64}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
              style={styles.chart}
            />
          </View>
        );
      case 'incidents':
        return (
          <View>
            <View style={styles.chartHeader}>
              <View style={styles.chartTitleRow}>
                <Shield size={20} color="#EF4444" />
                <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
                  Incident Distribution
                </Text>
              </View>
              <Text style={[styles.chartSubtitle, { color: theme.colors.textSecondary }]}>
                By severity level
              </Text>
            </View>
            <BarChart
              data={incidentData}
              width={SCREEN_WIDTH - 64}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
              }}
              style={styles.chart}
              showBarTops={false}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.chartsRow}>
          {renderChart()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chartsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  chartSubtitle: {
    fontSize: 12,
    opacity: 0.7,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
});