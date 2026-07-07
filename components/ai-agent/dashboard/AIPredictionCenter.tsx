import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Calendar, Activity, Target } from 'lucide-react-native';

interface ForecastData {
  period: string;
  predicted: number;
  confidence: number;
  actual?: number;
}

interface AIPredictionCenterProps {
  forecast24h: ForecastData[];
  forecast7d: ForecastData[];
  volatilityForecast: number;
  probabilityDistribution: {
    bullish: number;
    neutral: number;
    bearish: number;
  };
}

export default function AIPredictionCenter({ 
  forecast24h, 
  forecast7d, 
  volatilityForecast, 
  probabilityDistribution 
}: AIPredictionCenterProps) {
  const { theme } = useTheme();

  const maxPrediction = Math.max(...forecast24h.map(f => f.predicted));
  const minPrediction = Math.min(...forecast24h.map(f => f.predicted));
  const range = maxPrediction - minPrediction;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Target size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            AI Prediction Center
          </Text>
        </View>
      </View>

      {/* Probability Distribution */}
      <View style={[styles.probabilitySection, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
          Probability Distribution
        </Text>
        <View style={styles.probabilityBars}>
          <View style={styles.probabilityItem}>
            <View style={styles.probabilityHeader}>
              <Text style={[styles.probabilityLabel, { color: theme.colors.text }]}>
                Bullish
              </Text>
              <Text style={[styles.probabilityValue, { color: '#10B981' }]}>
                {probabilityDistribution.bullish}%
              </Text>
            </View>
            <View style={styles.probabilityBar}>
              <View style={[styles.probabilityFill, { backgroundColor: '#10B981', width: `${probabilityDistribution.bullish}%` }]} />
            </View>
          </View>
          <View style={styles.probabilityItem}>
            <View style={styles.probabilityHeader}>
              <Text style={[styles.probabilityLabel, { color: theme.colors.text }]}>
                Neutral
              </Text>
              <Text style={[styles.probabilityValue, { color: '#6B7280' }]}>
                {probabilityDistribution.neutral}%
              </Text>
            </View>
            <View style={styles.probabilityBar}>
              <View style={[styles.probabilityFill, { backgroundColor: '#6B7280', width: `${probabilityDistribution.neutral}%` }]} />
            </View>
          </View>
          <View style={styles.probabilityItem}>
            <View style={styles.probabilityHeader}>
              <Text style={[styles.probabilityLabel, { color: theme.colors.text }]}>
                Bearish
              </Text>
              <Text style={[styles.probabilityValue, { color: '#EF4444' }]}>
                {probabilityDistribution.bearish}%
              </Text>
            </View>
            <View style={styles.probabilityBar}>
              <View style={[styles.probabilityFill, { backgroundColor: '#EF4444', width: `${probabilityDistribution.bearish}%` }]} />
            </View>
          </View>
        </View>
      </View>

      {/* 24h Forecast */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar size={16} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            24h Forecast
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <View style={styles.chartContainer}>
            {forecast24h.map((data, index) => {
              const height = range > 0 ? ((data.predicted - minPrediction) / range) * 100 : 50;
              const isActual = data.actual !== undefined;
              
              return (
                <View key={index} style={styles.chartBarContainer}>
                  <View style={styles.chartBarWrapper}>
                    <View 
                      style={[
                        styles.chartBar, 
                        { 
                          height: `${height}%`,
                          backgroundColor: isActual ? '#10B981' : '#3B82F6',
                          opacity: isActual ? 1 : 0.7
                        }
                      ]} 
                    />
                    {isActual && (
                      <View style={[styles.actualDot, { backgroundColor: '#10B981' }]} />
                    )}
                  </View>
                  <Text style={[styles.chartLabel, { color: theme.colors.textSecondary }]}>
                    {data.period}
                  </Text>
                  <Text style={[styles.chartValue, { color: theme.colors.text }]}>
                    {data.predicted.toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* 7-Day Forecast */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TrendingUp size={16} color={theme.colors.primary} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            7-Day Forecast
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <View style={styles.chartContainer}>
            {forecast7d.map((data, index) => {
              const height = range > 0 ? ((data.predicted - minPrediction) / range) * 100 : 50;
              
              return (
                <View key={index} style={styles.chartBarContainer}>
                  <View style={styles.chartBarWrapper}>
                    <View 
                      style={[
                        styles.chartBar, 
                        { 
                          height: `${height}%`,
                          backgroundColor: '#8B5CF6',
                          opacity: 0.7
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.chartLabel, { color: theme.colors.textSecondary }]}>
                    {data.period}
                  </Text>
                  <Text style={[styles.chartValue, { color: theme.colors.text }]}>
                    {data.predicted.toFixed(2)}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Volatility Forecast */}
      <View style={[styles.volatilitySection, { backgroundColor: theme.colors.background }]}>
        <View style={styles.volatilityHeader}>
          <Activity size={16} color={theme.colors.primary} />
          <Text style={[styles.volatilityTitle, { color: theme.colors.text }]}>
            Volatility Forecast
          </Text>
        </View>
        <View style={styles.volatilityContent}>
          <Text style={[styles.volatilityValue, { color: theme.colors.text }]}>
            {volatilityForecast.toFixed(1)}%
          </Text>
          <Text style={[styles.volatilityLabel, { color: theme.colors.textSecondary }]}>
            Expected volatility over next 24 hours
          </Text>
          <View style={styles.volatilityGauge}>
            <View style={styles.volatilityTrack}>
              <View 
                style={[
                  styles.volatilityFill, 
                  { 
                    backgroundColor: volatilityForecast < 20 ? '#10B981' : volatilityForecast < 40 ? '#F59E0B' : '#EF4444',
                    width: `${Math.min(volatilityForecast, 100)}%`
                  }
                ]} 
              />
            </View>
            <View style={styles.volatilityMarkers}>
              <Text style={[styles.volatilityMarker, { color: theme.colors.textSecondary }]}>0%</Text>
              <Text style={[styles.volatilityMarker, { color: theme.colors.textSecondary }]}>50%</Text>
              <Text style={[styles.volatilityMarker, { color: theme.colors.textSecondary }]}>100%</Text>
            </View>
          </View>
        </View>
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
  probabilitySection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    marginBottom: 12,
  },
  probabilityBars: {
    gap: 12,
  },
  probabilityItem: {
    gap: 6,
  },
  probabilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  probabilityLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  probabilityValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  probabilityBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  probabilityFill: {
    height: '100%',
    borderRadius: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  chartScroll: {
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
  volatilitySection: {
    padding: 16,
    borderRadius: 12,
  },
  volatilityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  volatilityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  volatilityContent: {
    alignItems: 'center',
  },
  volatilityValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  volatilityLabel: {
    fontSize: 12,
    marginBottom: 12,
  },
  volatilityGauge: {
    width: '100%',
  },
  volatilityTrack: {
    width: '100%',
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  volatilityFill: {
    height: '100%',
    borderRadius: 6,
  },
  volatilityMarkers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  volatilityMarker: {
    fontSize: 10,
  },
});
