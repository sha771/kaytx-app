import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Calendar, DollarSign, Target, ArrowUpRight, ArrowDownRight, Activity, Zap } from 'lucide-react-native';

interface ForecastMonth {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

interface ForecastScenario {
  name: string;
  revenue: number;
  expenses: number;
  profit: number;
  confidence: number;
}

interface FinancialForecastingEngineProps {
  currentRevenue: number;
  currentExpenses: number;
  currentProfit: number;
  forecastAccuracy: number;
  scenarios: ForecastScenario[];
  monthlyForecast: ForecastMonth[];
}

export default function FinancialForecastingEngine({ 
  currentRevenue, 
  currentExpenses, 
  currentProfit,
  forecastAccuracy,
  scenarios,
  monthlyForecast 
}: FinancialForecastingEngineProps) {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const getScenarioColor = (name: string) => {
    switch (name) {
      case 'Best Case':
        return '#10B981';
      case 'Expected Case':
        return '#3B82F6';
      case 'Worst Case':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return '#10B981';
    if (confidence >= 60) return '#3B82F6';
    if (confidence >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <TrendingUp size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Financial Forecasting Engine
        </Text>
      </View>

      <View style={styles.currentMetrics}>
        <View style={styles.metricCard}>
          <DollarSign size={16} color="#F59E0B" />
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Current Revenue
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(currentRevenue)}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Activity size={16} color="#EF4444" />
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Current Expenses
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {formatCurrency(currentExpenses)}
          </Text>
        </View>

        <View style={styles.metricCard}>
          <Target size={16} color="#10B981" />
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Current Profit
          </Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>
            {formatCurrency(currentProfit)}
          </Text>
        </View>
      </View>

      <View style={styles.accuracySection}>
        <View style={styles.accuracyCard}>
          <Zap size={16} color={getConfidenceColor(forecastAccuracy)} />
          <Text style={[styles.accuracyLabel, { color: theme.colors.textSecondary }]}>
            Forecast Accuracy
          </Text>
          <Text style={[styles.accuracyValue, { color: getConfidenceColor(forecastAccuracy) }]}>
            {forecastAccuracy}%
          </Text>
          <View style={[styles.accuracyBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.accuracyFill, 
                { 
                  backgroundColor: getConfidenceColor(forecastAccuracy),
                  width: `${forecastAccuracy}%`
                }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.scenariosSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Forecast Scenarios
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.scenariosRow}>
            {scenarios.map((scenario) => (
              <View 
                key={scenario.name} 
                style={[
                  styles.scenarioCard, 
                  { borderColor: getScenarioColor(scenario.name) }
                ]}
              >
                <View style={styles.scenarioHeader}>
                  {scenario.name === 'Best Case' && <ArrowUpRight size={14} color={getScenarioColor(scenario.name)} />}
                  {scenario.name === 'Expected Case' && <Target size={14} color={getScenarioColor(scenario.name)} />}
                  {scenario.name === 'Worst Case' && <ArrowDownRight size={14} color={getScenarioColor(scenario.name)} />}
                  <Text style={[styles.scenarioTitle, { color: getScenarioColor(scenario.name) }]}>
                    {scenario.name}
                  </Text>
                </View>

                <View style={styles.scenarioMetric}>
                  <Text style={[styles.scenarioMetricLabel, { color: theme.colors.textSecondary }]}>
                    Revenue
                  </Text>
                  <Text style={[styles.scenarioMetricValue, { color: theme.colors.text }]}>
                    {formatCurrency(scenario.revenue)}
                  </Text>
                </View>

                <View style={styles.scenarioMetric}>
                  <Text style={[styles.scenarioMetricLabel, { color: theme.colors.textSecondary }]}>
                    Expenses
                  </Text>
                  <Text style={[styles.scenarioMetricValue, { color: theme.colors.text }]}>
                    {formatCurrency(scenario.expenses)}
                  </Text>
                </View>

                <View style={styles.scenarioMetric}>
                  <Text style={[styles.scenarioMetricLabel, { color: theme.colors.textSecondary }]}>
                    Profit
                  </Text>
                  <Text style={[styles.scenarioMetricValue, { color: '#10B981' }]}>
                    {formatCurrency(scenario.profit)}
                  </Text>
                </View>

                <View style={styles.confidenceSection}>
                  <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>
                    Confidence
                  </Text>
                  <Text style={[styles.confidenceValue, { color: getConfidenceColor(scenario.confidence) }]}>
                    {scenario.confidence}%
                  </Text>
                  <View style={[styles.confidenceBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                    <View 
                      style={[
                        styles.confidenceFill, 
                        { 
                          backgroundColor: getConfidenceColor(scenario.confidence),
                          width: `${scenario.confidence}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.monthlySection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Monthly Forecast
        </Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.monthlyRow}>
            {monthlyForecast.map((month) => (
              <View key={month.month} style={styles.monthCard}>
                <Text style={[styles.monthName, { color: theme.colors.textSecondary }]}>
                  {month.month}
                </Text>
                
                <View style={styles.monthMetric}>
                  <Text style={[styles.monthMetricLabel, { color: theme.colors.textSecondary }]}>
                    Revenue
                  </Text>
                  <Text style={[styles.monthMetricValue, { color: '#10B981' }]}>
                    {formatCurrency(month.revenue)}
                  </Text>
                </View>

                <View style={styles.monthMetric}>
                  <Text style={[styles.monthMetricLabel, { color: theme.colors.textSecondary }]}>
                    Expenses
                  </Text>
                  <Text style={[styles.monthMetricValue, { color: '#EF4444' }]}>
                    {formatCurrency(month.expenses)}
                  </Text>
                </View>

                <View style={styles.monthMetric}>
                  <Text style={[styles.monthMetricLabel, { color: theme.colors.textSecondary }]}>
                    Profit
                  </Text>
                  <Text style={[styles.monthMetricValue, { color: '#3B82F6' }]}>
                    {formatCurrency(month.profit)}
                  </Text>
                </View>

                <View style={[styles.profitBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <View 
                    style={[
                      styles.profitFill, 
                      { 
                        backgroundColor: month.profit > 0 ? '#10B981' : '#EF4444',
                        width: `${Math.min(Math.abs(month.profit / month.revenue) * 100, 100)}%`
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
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
  currentMetrics: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  accuracySection: {
    marginBottom: 16,
  },
  accuracyCard: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  accuracyLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
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
  scenariosSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  scenariosRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scenarioCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 2,
    minWidth: 140,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  scenarioTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  scenarioMetric: {
    marginBottom: 8,
  },
  scenarioMetricLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  scenarioMetricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  confidenceSection: {
    marginTop: 8,
  },
  confidenceLabel: {
    fontSize: 10,
    marginBottom: 2,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  confidenceBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 2,
  },
  monthlySection: {
    marginBottom: 8,
  },
  monthlyRow: {
    flexDirection: 'row',
    gap: 12,
  },
  monthCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minWidth: 120,
  },
  monthName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  monthMetric: {
    marginBottom: 6,
  },
  monthMetricLabel: {
    fontSize: 9,
    marginBottom: 2,
  },
  monthMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  profitBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  profitFill: {
    height: '100%',
    borderRadius: 2,
  }
});