import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Calendar, DollarSign, Target } from 'lucide-react-native';
import { RevenueForecastConfig } from './types';

interface RevenueForecastProps {
  config: RevenueForecastConfig;
}

export default function RevenueForecast({ config }: RevenueForecastProps) {
  const { theme } = useTheme();

  const getScenarioColor = (scenario: string) => {
    switch (scenario) {
      case 'best': return '#10B981';
      case 'expected': return '#3B82F6';
      case 'worst': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const maxForecast = Math.max(config.bestCase, config.expectedCase, config.worstCase);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <TrendingUp size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Revenue Forecast
          </Text>
        </View>
        <View style={[styles.accuracyBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Text style={[styles.accuracyText, { color: '#10B981' }]}>
            {config.forecastAccuracy.toFixed(1)}% Accuracy
          </Text>
        </View>
      </View>

      {/* Revenue Summary */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
          <Calendar size={16} color={theme.colors.primary} />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Monthly
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            ${(config.monthly / 1000).toFixed(0)}K
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
          <Calendar size={16} color={theme.colors.primary} />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Quarterly
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            ${(config.quarterly / 1000000).toFixed(1)}M
          </Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: theme.colors.background }]}>
          <Target size={16} color={theme.colors.primary} />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Annual
          </Text>
          <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
            ${(config.annual / 1000000).toFixed(1)}M
          </Text>
        </View>
      </View>

      {/* Scenarios */}
      <View style={styles.scenariosSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Forecast Scenarios
        </Text>
        <View style={styles.scenariosContainer}>
          <View style={styles.scenarioItem}>
            <View style={styles.scenarioHeader}>
              <Text style={[styles.scenarioLabel, { color: theme.colors.text }]}>
                Best Case
              </Text>
              <Text style={[styles.scenarioValue, { color: '#10B981' }]}>
                ${(config.bestCase / 1000000).toFixed(1)}M
              </Text>
            </View>
            <View style={styles.scenarioBar}>
              <View style={[styles.scenarioTrack, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.scenarioFill, 
                    { 
                      backgroundColor: '#10B981',
                      width: `${(config.bestCase / maxForecast) * 100}%`
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
          <View style={styles.scenarioItem}>
            <View style={styles.scenarioHeader}>
              <Text style={[styles.scenarioLabel, { color: theme.colors.text }]}>
                Expected
              </Text>
              <Text style={[styles.scenarioValue, { color: '#3B82F6' }]}>
                ${(config.expectedCase / 1000000).toFixed(1)}M
              </Text>
            </View>
            <View style={styles.scenarioBar}>
              <View style={[styles.scenarioTrack, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.scenarioFill, 
                    { 
                      backgroundColor: '#3B82F6',
                      width: `${(config.expectedCase / maxForecast) * 100}%`
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
          <View style={styles.scenarioItem}>
            <View style={styles.scenarioHeader}>
              <Text style={[styles.scenarioLabel, { color: theme.colors.text }]}>
                Worst Case
              </Text>
              <Text style={[styles.scenarioValue, { color: '#EF4444' }]}>
                ${(config.worstCase / 1000000).toFixed(1)}M
              </Text>
            </View>
            <View style={styles.scenarioBar}>
              <View style={[styles.scenarioTrack, { backgroundColor: theme.colors.background }]}>
                <View 
                  style={[
                    styles.scenarioFill, 
                    { 
                      backgroundColor: '#EF4444',
                      width: `${(config.worstCase / maxForecast) * 100}%`
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Monthly Forecast Chart */}
      <View style={styles.chartSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Monthly Forecast
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            {config.months.map((month, index) => {
              const maxMonthValue = Math.max(...config.months.map(m => m.forecast));
              const height = (month.forecast / maxMonthValue) * 100;
              
              return (
                <View key={index} style={styles.chartBarContainer}>
                  <View style={styles.chartBarWrapper}>
                    <View 
                      style={[
                        styles.chartBar, 
                        { 
                          height: `${height}%`,
                          backgroundColor: month.actual ? '#10B981' : '#3B82F6',
                          opacity: month.actual ? 1 : 0.7
                        }
                      ]} 
                    />
                    {month.actual && (
                      <View style={[styles.actualDot, { backgroundColor: '#10B981' }]} />
                    )}
                  </View>
                  <Text style={[styles.chartLabel, { color: theme.colors.textSecondary }]}>
                    {month.month}
                  </Text>
                  <Text style={[styles.chartValue, { color: theme.colors.text }]}>
                    ${(month.forecast / 1000).toFixed(0)}K
                  </Text>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  accuracyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  accuracyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  scenariosSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  scenariosContainer: {
    gap: 12,
  },
  scenarioItem: {
    gap: 6,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scenarioLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  scenarioValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  scenarioBar: {
    width: '100%',
  },
  scenarioTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scenarioFill: {
    height: '100%',
    borderRadius: 4,
  },
  chartSection: {
    marginBottom: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  chartBarContainer: {
    alignItems: 'center',
    width: 50,
  },
  chartBarWrapper: {
    height: 120,
    width: 24,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  chartBar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  actualDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 0,
  },
  chartLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  chartValue: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
