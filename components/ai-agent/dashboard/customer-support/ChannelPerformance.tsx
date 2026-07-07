import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ChannelData {
  name: string;
  icon: string;
  volume: number;
  responseTime: string;
  resolutionRate: number;
  satisfaction: number;
}

interface ChannelPerformanceProps {
  channels: ChannelData[];
}

export default function ChannelPerformance({ channels }: ChannelPerformanceProps) {
  const { theme } = useTheme();

  const getSatisfactionColor = (score: number) => {
    if (score >= 4.5) return '#10B981';
    if (score >= 4.0) return '#10B981';
    if (score >= 3.5) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Channel Performance
      </Text>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {channels.map((channel, index) => (
          <View 
            key={index}
            style={[styles.channelCard, { 
              backgroundColor: 'rgba(11, 15, 20, 0.6)',
              borderColor: 'rgba(16, 185, 129, 0.3)',
              borderWidth: 1
            }]}
          >
            {/* Channel Header */}
            <View style={styles.channelHeader}>
              <View style={styles.channelInfo}>
                <Text style={styles.channelIcon}>{channel.icon}</Text>
                <Text style={[styles.channelName, { color: '#FFFFFF' }]}>
                  {channel.name}
                </Text>
              </View>
              <View style={[
                styles.satisfactionBadge, 
                { backgroundColor: `${getSatisfactionColor(channel.satisfaction)}20`, borderColor: `${getSatisfactionColor(channel.satisfaction)}40`, borderWidth: 1 }
              ]}>
                <Text style={[
                  styles.satisfactionText, 
                  { color: getSatisfactionColor(channel.satisfaction) }
                ]}>
                  {channel.satisfaction}/5.0
                </Text>
              </View>
            </View>

            {/* Channel Metrics */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Volume
                </Text>
                <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>
                  {channel.volume}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Response Time
                </Text>
                <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>
                  {channel.responseTime}
                </Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  Resolution Rate
                </Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  {channel.resolutionRate}%
                </Text>
              </View>
            </View>

            {/* Performance Bar */}
            <View style={styles.performanceBar}>
              <View style={[styles.barBackground, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                <View 
                  style={[
                    styles.barFill, 
                    { backgroundColor: getSatisfactionColor(channel.satisfaction), width: `${channel.resolutionRate}%` }
                  ]} 
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Channel Summary */}
      <View style={[styles.summarySection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.summaryTitle, { color: '#FFFFFF' }]}>
          Channel Summary
        </Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Total Volume
            </Text>
            <Text style={[styles.summaryValue, { color: '#FFFFFF' }]}>
              {channels.reduce((sum, ch) => sum + ch.volume, 0).toLocaleString()}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Avg Satisfaction
            </Text>
            <Text style={[styles.summaryValue, { color: '#10B981' }]}>
              {(channels.reduce((sum, ch) => sum + ch.satisfaction, 0) / channels.length).toFixed(1)}/5.0
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Best Channel
            </Text>
            <Text style={[styles.summaryValue, { color: '#FFFFFF' }]}>
              {channels.reduce((best, ch) => ch.satisfaction > best.satisfaction ? ch : best).name}
            </Text>
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
    maxHeight: 450,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 12,
  },
  channelCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  channelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  channelIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  channelName: {
    fontSize: 15,
    fontWeight: '600',
  },
  satisfactionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  satisfactionText: {
    fontSize: 11,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  metricItem: {
    flex: 1,
    marginRight: 12,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  performanceBar: {
    marginTop: 4,
  },
  barBackground: {
    height: 6,
    borderRadius: 3,
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  summarySection: {
    padding: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});