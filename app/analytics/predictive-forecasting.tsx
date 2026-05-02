 
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Stack } from 'expo-router';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  TriangleAlert,
  CircleCheck,
} from 'lucide-react-native';

interface Forecast {
  metric: string;
  current: number;
  predicted: number;
  change: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
}

export default function PredictiveForecastingScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const forecasts: Forecast[] = [
    {
      metric: 'Revenue',
      current: 125000,
      predicted: 156000,
      change: 24.8,
      confidence: 87,
      trend: 'up',
      timeframe: '30 days',
    },
    {
      metric: 'New Customers',
      current: 450,
      predicted: 580,
      change: 28.9,
      confidence: 82,
      trend: 'up',
      timeframe: '30 days',
    },
    {
      metric: 'Churn Rate',
      current: 5.2,
      predicted: 4.1,
      change: -21.2,
      confidence: 78,
      trend: 'down',
      timeframe: '30 days',
    },
    {
      metric: 'Conversion Rate',
      current: 3.8,
      predicted: 4.5,
      change: 18.4,
      confidence: 85,
      trend: 'up',
      timeframe: '30 days',
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp size={20} color="#10B981" />;
    if (trend === 'down') return <TrendingDown size={20} color="#EF4444" />;
    return <Target size={20} color="#F59E0B" />;
  };

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return '#10B981';
    if (trend === 'down') return '#EF4444';
    return '#F59E0B';
  };

  const formatValue = (metric: string, value: number) => {
    if (metric === 'Revenue') return `$${(value / 1000).toFixed(0)}K`;
    if (metric.includes('Rate')) return `${value.toFixed(1)}%`;
    return value.toString();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Predictive Forecasting',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#fff',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>AI-Powered Forecasts</Text>
          <Text style={styles.subtitle}>Data-driven predictions for growth</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.timeframeScroll}
          contentContainerStyle={styles.timeframeContent}
        >
          {['7d', '30d', '90d', '1y'].map((timeframe) => (
            <TouchableOpacity
              key={timeframe}
              style={[
                styles.timeframeButton,
                selectedTimeframe === timeframe && styles.timeframeButtonActive,
              ]}
              onPress={() => setSelectedTimeframe(timeframe)}
            >
              <Calendar
                size={16}
                color={selectedTimeframe === timeframe ? '#fff' : '#64748B'}
              />
              <Text
                style={[
                  styles.timeframeText,
                  selectedTimeframe === timeframe && styles.timeframeTextActive,
                ]}
              >
                {timeframe}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <View style={styles.insightsCard}>
            <CircleCheck size={24} color="#10B981" />
            <View style={styles.insightsText}>
              <Text style={styles.insightsTitle}>Strong Growth Predicted</Text>
              <Text style={styles.insightsSubtitle}>
                3 out of 4 metrics show positive trends
              </Text>
            </View>
          </View>

          {forecasts.map((forecast, index) => (
            <View key={index} style={styles.forecastCard}>
              <View style={styles.forecastHeader}>
                <Text style={styles.metricName}>{forecast.metric}</Text>
                {getTrendIcon(forecast.trend)}
              </View>

              <View style={styles.valuesRow}>
                <View style={styles.valueBox}>
                  <Text style={styles.valueLabel}>Current</Text>
                  <Text style={styles.valueText}>
                    {formatValue(forecast.metric, forecast.current)}
                  </Text>
                </View>

                <View style={styles.arrow}>
                  <Text style={styles.arrowText}>→</Text>
                </View>

                <View style={styles.valueBox}>
                  <Text style={styles.valueLabel}>Predicted</Text>
                  <Text style={[styles.valueText, { color: '#3B82F6' }]}>
                    {formatValue(forecast.metric, forecast.predicted)}
                  </Text>
                </View>
              </View>

              <View style={styles.changeRow}>
                <View style={styles.changeBox}>
                  <Text
                    style={[
                      styles.changeValue,
                      { color: getTrendColor(forecast.trend) },
                    ]}
                  >
                    {forecast.change > 0 ? '+' : ''}
                    {forecast.change.toFixed(1)}%
                  </Text>
                  <Text style={styles.changeLabel}>Expected Change</Text>
                </View>

                <View style={styles.confidenceBox}>
                  <Text style={styles.confidenceValue}>{forecast.confidence}%</Text>
                  <Text style={styles.confidenceLabel}>Confidence</Text>
                  <View style={styles.confidenceBar}>
                    <View
                      style={[
                        styles.confidenceFill,
                        { width: `${forecast.confidence}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.timeframeInfo}>
                <Calendar size={14} color="#64748B" />
                <Text style={styles.timeframeInfoText}>
                  Forecast for next {forecast.timeframe}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.warningCard}>
            <TriangleAlert size={20} color="#F59E0B" />
            <View style={styles.warningText}>
              <Text style={styles.warningTitle}>Action Required</Text>
              <Text style={styles.warningMessage}>
                Churn rate requires attention. Consider launching retention campaign.
              </Text>
            </View>
          </View>

          <View style={styles.recommendationsCard}>
            <Text style={styles.recommendationsTitle}>AI Recommendations</Text>
            <View style={styles.recommendationsList}>
              <View style={styles.recommendationItem}>
                <CircleCheck size={16} color="#10B981" />
                <Text style={styles.recommendationText}>
                  Increase marketing spend by 15% to maximize predicted growth
                </Text>
              </View>
              <View style={styles.recommendationItem}>
                <CircleCheck size={16} color="#10B981" />
                <Text style={styles.recommendationText}>
                  Focus on customer retention programs to reduce churn
                </Text>
              </View>
              <View style={styles.recommendationItem}>
                <CircleCheck size={16} color="#10B981" />
                <Text style={styles.recommendationText}>
                  Optimize conversion funnel for 20% improvement potential
                </Text>
              </View>
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
    backgroundColor: '#0F172A',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  timeframeScroll: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  timeframeContent: {
    gap: 8,
  },
  timeframeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    gap: 6,
  },
  timeframeButtonActive: {
    backgroundColor: '#3B82F6',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  timeframeTextActive: {
    color: '#fff',
  },
  section: {
    padding: 16,
  },
  insightsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B98120',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  insightsText: {
    flex: 1,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 4,
  },
  insightsSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  forecastCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  valueBox: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
  },
  valueLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  valueText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  arrow: {
    paddingHorizontal: 12,
  },
  arrowText: {
    fontSize: 24,
    color: '#64748B',
  },
  changeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  changeBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  changeValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  changeLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  confidenceBox: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confidenceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  confidenceLabel: {
    fontSize: 11,
    color: '#64748B',
    marginBottom: 8,
  },
  confidenceBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  timeframeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  timeframeInfoText: {
    fontSize: 12,
    color: '#64748B',
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  warningText: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F59E0B',
    marginBottom: 4,
  },
  warningMessage: {
    fontSize: 14,
    color: '#94A3B8',
  },
  recommendationsCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  recommendationsList: {
    gap: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
