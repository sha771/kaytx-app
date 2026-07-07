import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Calendar, DollarSign, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface ForecastMonth {
  month: string;
  forecast: number;
  actual?: number;
}

interface RevenueForecastConfig {
  monthly: number;
  quarterly: number;
  annual: number;
  bestCase: number;
  expectedCase: number;
  worstCase: number;
  forecastAccuracy: number;
  months: ForecastMonth[];
}

interface RevenueForecastingEngineProps {
  config: RevenueForecastConfig;
}

export default function RevenueForecastingEngine({ config }: RevenueForecastingEngineProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const getVariance = (forecast: number, actual?: number) => {
    if (!actual) return null;
    const variance = ((actual - forecast) / forecast) * 100;
    return variance;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <TrendingUp size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Revenue Forecasting Engine
        </Text>
      </View>

      <View style={styles.forecastSummary}>
        <View style={styles.forecastCard}>
          <View style={styles.forecastIcon}>
            <Calendar size={16} color="#3B82F6" />
          </View>
          <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>
            Monthly Forecast
          </Text>
          <Text style={[styles.forecastValue, { color: theme.colors.text }]}>
            {formatCurrency(config.monthly)}
          </Text>
        </View>

        <View style={styles.forecastCard}>
          <View style={styles.forecastIcon}>
            <Calendar size={16} color="#8B5CF6" />
          </View>
          <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>
            Quarterly Forecast
          </Text>
          <Text style={[styles.forecastValue, { color: theme.colors.text }]}>
            {formatCurrency(config.quarterly)}
          </Text>
        </View>

        <View style={styles.forecastCard}>
          <View style={styles.forecastIcon}>
            <Calendar size={16} color="#10B981" />
          </View>
          <Text style={[styles.forecastLabel, { color: theme.colors.textSecondary }]}>
            Annual Forecast
          </Text>
          <Text style={[styles.forecastValue, { color: theme.colors.text }]}>
            {formatCurrency(config.annual)}
          </Text>
        </View>
      </View>

      <View style={styles.scenarios}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Forecast Scenarios
        </Text>
        
        <View style={styles.scenarioGrid}>
          <View style={[styles.scenarioCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <View style={styles.scenarioHeader}>
              <ArrowUpRight size={14} color="#10B981" />
              <Text style={[styles.scenarioTitle, { color: '#10B981' }]}>
                Best Case
              </Text>
            </View>
            <Text style={[styles.scenarioValue, { color: theme.colors.text }]}>
              {formatCurrency(config.bestCase)}
            </Text>
            <Text style={[styles.scenarioSubtext, { color: theme.colors.textSecondary }]}>
              +{((config.bestCase - config.expectedCase) / config.expectedCase * 100).toFixed(0)}% vs expected
            </Text>
          </View>

          <View style={[styles.scenarioCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
            <View style={styles.scenarioHeader}>
              <Target size={14} color="#3B82F6" />
              <Text style={[styles.scenarioTitle, { color: '#3B82F6' }]}>
                Expected Case
              </Text>
            </View>
            <Text style={[styles.scenarioValue, { color: theme.colors.text }]}>
              {formatCurrency(config.expectedCase)}
            </Text>
            <Text style={[styles.scenarioSubtext, { color: theme.colors.textSecondary }]}>
              Base forecast
            </Text>
          </View>

          <View style={[styles.scenarioCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
            <View style={styles.scenarioHeader}>
              <ArrowDownRight size={14} color="#EF4444" />
              <Text style={[styles.scenarioTitle, { color: '#EF4444' }]}>
                Worst Case
              </Text>
            </View>
            <Text style={[styles.scenarioValue, { color: theme.colors.text }]}>
              {formatCurrency(config.worstCase)}
            </Text>
            <Text style={[styles.scenarioSubtext, { color: theme.colors.textSecondary }]}>
              -{((config.expectedCase - config.worstCase) / config.expectedCase * 100).toFixed(0)}% vs expected
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.accuracyCard}>
        <View style={styles.accuracyHeader}>
          <DollarSign size={16} color="#10B981" />
          <Text style={[styles.accuracyLabel, { color: theme.colors.textSecondary }]}>
            Forecast Accuracy
          </Text>
        </View>
        <Text style={[styles.accuracyValue, { color: '#10B981' }]}>
          {config.forecastAccuracy}%
        </Text>
        <View style={[styles.accuracyBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
          <View 
            style={[
              styles.accuracyFill, 
              { 
                backgroundColor: config.forecastAccuracy >= 90 ? '#10B981' : 
                             config.forecastAccuracy >= 80 ? '#3B82F6' : '#F59E0B',
                width: `${config.forecastAccuracy}%`
              }
            ]} 
          />
        </View>
      </View>

      <View style={styles.monthlyForecast}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Monthly Forecast vs Actual
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.monthsRow}>
            {config.months.map((month) => {
              const variance = getVariance(month.forecast, month.actual);
              return (
                <View key={month.month} style={styles.monthCard}>
                  <Text style={[styles.monthName, { color: theme.colors.textSecondary }]}>
                    {month.month}
                  </Text>
                  <View style={styles.monthMetrics}>
                    <View style={styles.monthMetric}>
                      <Text style={[styles.monthMetricLabel, { color: theme.colors.textSecondary }]}>
                        Forecast
                      </Text>
                      <Text style={[styles.monthMetricValue, { color: theme.colors.text }]}>
                        {formatCurrency(month.forecast)}
                      </Text>
                    </View>
                    {month.actual && (
                      <View style={styles.monthMetric}>
                        <Text style={[styles.monthMetricLabel, { color: theme.colors.textSecondary }]}>
                          Actual
                      </Text>
                        <Text style={[styles.monthMetricValue, { color: '#10B981' }]}>
                          {formatCurrency(month.actual)}
                        </Text>
                      </View>
                    )}
                  </View>
                  {variance !== null && (
                    <View style={[
                      styles.varianceBadge, 
                      { backgroundColor: variance >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }
                    ]}>
                      <Text style={[
                        styles.varianceText, 
                        { color: variance >= 0 ? '#10B981' : '#EF4444' }
                      ]}>
                        {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
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
  forecastSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  forecastCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  forecastIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  forecastLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  forecastValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  scenarios: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  scenarioGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  scenarioCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  scenarioTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  scenarioValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  scenarioSubtext: {
    fontSize: 10,
  },
  accuracyCard: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 16,
  },
  accuracyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  accuracyLabel: {
    fontSize: 12,
  },
  accuracyValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  accuracyBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    borderRadius: 3,
  },
  monthlyForecast: {
    marginBottom: 8,
  },
  monthsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  monthCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 120,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  monthName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  monthMetrics: {
    gap: 8,
    marginBottom: 8,
  },
  monthMetric: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 8,
  },
  monthMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  monthMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  varianceBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  varianceText: {
    fontSize: 10,
    fontWeight: '600',
  }
});