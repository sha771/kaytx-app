import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface AnalyticsMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface HourlyData {
  hour: string;
  messages: number;
  conversations: number;
}

interface LiveConversationAnalyticsProps {
  metrics: AnalyticsMetric[];
  hourlyData: HourlyData[];
  peakHours: string[];
}

export default function LiveConversationAnalytics({ metrics, hourlyData, peakHours }: LiveConversationAnalyticsProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      case 'stable': return '→';
      default: return '';
    }
  };

  const maxMessages = Math.max(...hourlyData.map(d => d.messages));
  const maxConversations = Math.max(...hourlyData.map(d => d.conversations));

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Live Conversation Analytics
      </Text>

      {/* Real-time Metrics */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${metric.color}30`, borderWidth: 1 }]}>
            <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <View style={styles.metricTrend}>
              <Text style={[styles.trendIcon, { color: metric.color }]}>
                {getTrendIcon(metric.trend)}
              </Text>
              <Text style={[styles.trendText, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                {metric.trend === 'up' ? 'Increasing' : metric.trend === 'down' ? 'Decreasing' : 'Stable'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Hourly Activity Chart */}
      <View style={[styles.chartSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Hourly Activity (Today)
        </Text>
        <View style={styles.chartLegend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.5)' }]}>Messages</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={[styles.legendText, { color: 'rgba(255, 255, 255, 0.5)' }]}>Conversations</Text>
          </View>
        </View>
        <View style={styles.chartContainer}>
          {hourlyData.map((data, index) => (
            <View key={index} style={styles.chartColumn}>
              <View style={styles.barsContainer}>
                <View 
                  style={[
                    styles.messageBar, 
                    { 
                      backgroundColor: '#10B981',
                      height: `${(data.messages / maxMessages) * 100}%`
                    }
                  ]} 
                />
                <View 
                  style={[
                    styles.conversationBar, 
                    { 
                      backgroundColor: '#3B82F6',
                      height: `${(data.conversations / maxConversations) * 100}%`
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.hourLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                {data.hour}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Peak Hours */}
      <View style={[styles.peakSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Peak Support Hours
        </Text>
        <View style={styles.peakHoursContainer}>
          {peakHours.map((hour, index) => (
            <View key={index} style={styles.peakHourItem}>
              <View style={[styles.peakBadge, { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10B981', borderWidth: 1 }]}>
                <Text style={[styles.peakBadgeText, { color: '#10B981' }]}>
                  {hour}
                </Text>
              </View>
              <Text style={[styles.peakLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                {index === 0 ? 'Highest' : index === 1 ? 'Second' : 'Third'} peak
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Response Time Distribution */}
      <View style={[styles.responseSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Response Time Distribution
        </Text>
        <View style={styles.responseBars}>
          <View style={styles.responseBar}>
            <Text style={[styles.responseLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              {'< 30s'}
            </Text>
            <View style={[styles.responseProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.responseFill, { backgroundColor: '#10B981', width: '45%' }]} />
            </View>
            <Text style={[styles.responsePercent, { color: '#FFFFFF' }]}>45%</Text>
          </View>
          <View style={styles.responseBar}>
            <Text style={[styles.responseLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              30s - 1m
            </Text>
            <View style={[styles.responseProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.responseFill, { backgroundColor: '#10B981', width: '30%' }]} />
            </View>
            <Text style={[styles.responsePercent, { color: '#FFFFFF' }]}>30%</Text>
          </View>
          <View style={styles.responseBar}>
            <Text style={[styles.responseLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              1m - 2m
            </Text>
            <View style={[styles.responseProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.responseFill, { backgroundColor: '#F59E0B', width: '18%' }]} />
            </View>
            <Text style={[styles.responsePercent, { color: '#FFFFFF' }]}>18%</Text>
          </View>
          <View style={styles.responseBar}>
            <Text style={[styles.responseLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              {'> 2m'}
            </Text>
            <View style={[styles.responseProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
              <View style={[styles.responseFill, { backgroundColor: '#EF4444', width: '7%' }]} />
            </View>
            <Text style={[styles.responsePercent, { color: '#FFFFFF' }]}>7%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 12,
  },
  metricCard: {
    width: '50%',
    paddingHorizontal: 6,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  trendText: {
    fontSize: 10,
  },
  chartSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  chartLegend: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 2,
  },
  messageBar: {
    width: 8,
    borderRadius: 3,
  },
  conversationBar: {
    width: 8,
    borderRadius: 3,
  },
  hourLabel: {
    fontSize: 9,
    marginTop: 6,
  },
  peakSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  peakHoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  peakHourItem: {
    alignItems: 'center',
  },
  peakBadge: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    marginBottom: 6,
  },
  peakBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  peakLabel: {
    fontSize: 10,
  },
  responseSection: {
    padding: 16,
    borderRadius: 12,
  },
  responseBars: {
    gap: 10,
  },
  responseBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  responseLabel: {
    width: 60,
    fontSize: 11,
  },
  responseProgress: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  responseFill: {
    height: '100%',
    borderRadius: 4,
  },
  responsePercent: {
    fontSize: 12,
    fontWeight: '700',
    width: 35,
    textAlign: 'right',
  },
});