import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Clock, TrendingUp, Calendar, Sun, Moon, Users } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TimeSlot {
  hour: number;
  label: string;
  engagement: number;
  conversions: number;
  traffic: number;
}

interface DayAnalysis {
  day: string;
  bestTime: string;
  avgEngagement: number;
  peakHour: number;
  recommendation: string;
}

export default function BestTimeAnalysisScreen() {
  const insets = useSafeAreaInsets();
  const [selectedMetric, setSelectedMetric] = useState<'engagement' | 'conversions' | 'traffic'>('engagement');
  
  const [timeSlots] = useState<TimeSlot[]>([
    { hour: 0, label: '12 AM', engagement: 15, conversions: 8, traffic: 120 },
    { hour: 3, label: '3 AM', engagement: 8, conversions: 4, traffic: 80 },
    { hour: 6, label: '6 AM', engagement: 25, conversions: 15, traffic: 200 },
    { hour: 9, label: '9 AM', engagement: 65, conversions: 45, traffic: 450 },
    { hour: 12, label: '12 PM', engagement: 85, conversions: 72, traffic: 680 },
    { hour: 15, label: '3 PM', engagement: 92, conversions: 85, traffic: 720 },
    { hour: 18, label: '6 PM', engagement: 78, conversions: 65, traffic: 580 },
    { hour: 21, label: '9 PM', engagement: 55, conversions: 42, traffic: 420 },
  ]);

  const [weekAnalysis] = useState<DayAnalysis[]>([
    {
      day: 'Monday',
      bestTime: '2-4 PM',
      avgEngagement: 72,
      peakHour: 15,
      recommendation: 'Schedule posts for early afternoon',
    },
    {
      day: 'Tuesday',
      bestTime: '3-5 PM',
      avgEngagement: 78,
      peakHour: 16,
      recommendation: 'Best day for product launches',
    },
    {
      day: 'Wednesday',
      bestTime: '12-2 PM',
      avgEngagement: 68,
      peakHour: 13,
      recommendation: 'Peak lunch hour engagement',
    },
    {
      day: 'Thursday',
      bestTime: '2-4 PM',
      avgEngagement: 85,
      peakHour: 15,
      recommendation: 'Highest conversion rates',
    },
    {
      day: 'Friday',
      bestTime: '11 AM-1 PM',
      avgEngagement: 65,
      peakHour: 12,
      recommendation: 'End of week activity spike',
    },
    {
      day: 'Saturday',
      bestTime: '10 AM-12 PM',
      avgEngagement: 55,
      peakHour: 11,
      recommendation: 'Weekend casual browsing',
    },
    {
      day: 'Sunday',
      bestTime: '7-9 PM',
      avgEngagement: 48,
      peakHour: 20,
      recommendation: 'Evening leisure time',
    },
  ]);

  const getMetricValue = (slot: TimeSlot) => {
    switch (selectedMetric) {
      case 'engagement':
        return slot.engagement;
      case 'conversions':
        return slot.conversions;
      case 'traffic':
        return slot.traffic / 10;
      default:
        return slot.engagement;
    }
  };

  const maxValue = Math.max(...timeSlots.map(getMetricValue));

  const bestTime = timeSlots.reduce((best, current) => 
    getMetricValue(current) > getMetricValue(best) ? current : best
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Best Time Analysis',
          headerStyle: { backgroundColor: '#0A0F1E' },
          headerTintColor: '#FFFFFF',
        }}
      />
      
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Optimal Timing</Text>
          <Text style={styles.headerSubtitle}>When your audience is most active</Text>
        </View>

        <View style={styles.metricSelector}>
          {(['engagement', 'conversions', 'traffic'] as const).map((metric) => (
            <TouchableOpacity
              key={metric}
              style={[
                styles.metricButton,
                selectedMetric === metric && styles.metricButtonActive,
              ]}
              onPress={() => setSelectedMetric(metric)}
            >
              <Text
                style={[
                  styles.metricButtonText,
                  selectedMetric === metric && styles.metricButtonTextActive,
                ]}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bestTimeCard}>
        <View style={styles.bestTimeIcon}>
          <Sun size={24} color="#F59E0B" />
        </View>
        <View style={styles.bestTimeContent}>
          <Text style={styles.bestTimeLabel}>Best Time to Post</Text>
          <Text style={styles.bestTimeValue}>{bestTime.label}</Text>
          <Text style={styles.bestTimeDescription}>
            Peak {selectedMetric} with {getMetricValue(bestTime).toFixed(0)}% activity
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>24-Hour Activity</Text>
          <View style={styles.chart}>
            {timeSlots.map((slot) => {
              const value = getMetricValue(slot);
              const height = (value / maxValue) * 120;
              const isNight = slot.hour < 6 || slot.hour >= 21;
              
              return (
                <View key={slot.hour} style={styles.chartColumn}>
                  <View style={styles.chartBarContainer}>
                    <View
                      style={[
                        styles.chartBar,
                        {
                          height: height || 5,
                          backgroundColor: value === getMetricValue(bestTime) ? '#10B981' : '#60A5FA',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.chartLabel}>{slot.label}</Text>
                  {isNight && <Moon size={10} color="#6B7280" />}
                  {!isNight && <Sun size={10} color="#F59E0B" />}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.weekSection}>
          <View style={styles.weekHeader}>
            <Calendar size={20} color="#60A5FA" />
            <Text style={styles.sectionTitle}>Weekly Analysis</Text>
          </View>

          {weekAnalysis.map((day) => (
            <View key={day.day} style={styles.dayCard}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayName}>{day.day}</Text>
                <View style={styles.engagementBadge}>
                  <TrendingUp size={12} color="#10B981" />
                  <Text style={styles.engagementValue}>{day.avgEngagement}%</Text>
                </View>
              </View>

              <View style={styles.dayDetails}>
                <View style={styles.dayDetail}>
                  <Clock size={14} color="#9CA3AF" />
                  <Text style={styles.dayDetailLabel}>Best Time:</Text>
                  <Text style={styles.dayDetailValue}>{day.bestTime}</Text>
                </View>
                <View style={styles.dayDetail}>
                  <Users size={14} color="#9CA3AF" />
                  <Text style={styles.dayDetailLabel}>Peak Hour:</Text>
                  <Text style={styles.dayDetailValue}>{day.peakHour}:00</Text>
                </View>
              </View>

              <View style={styles.recommendation}>
                <Text style={styles.recommendationText}>{day.recommendation}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Key Insights</Text>

          <View style={styles.insightCard}>
            <View style={styles.insightIconContainer}>
              <TrendingUp size={20} color="#10B981" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Afternoon Peak</Text>
              <Text style={styles.insightDescription}>
                2-4 PM shows consistently high engagement across all weekdays
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIconContainer}>
              <Moon size={20} color="#6B7280" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Low Night Activity</Text>
              <Text style={styles.insightDescription}>
                Avoid posting between 12 AM - 6 AM for optimal reach
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightIconContainer}>
              <Calendar size={20} color="#60A5FA" />
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Thursday is Golden</Text>
              <Text style={styles.insightDescription}>
                Thursday 3 PM has the highest conversion rate at 85%
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
  headerInfo: {
    marginBottom: 16,
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
  metricSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  metricButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1F2937',
    alignItems: 'center',
  },
  metricButtonActive: {
    backgroundColor: '#60A5FA',
  },
  metricButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  metricButtonTextActive: {
    color: '#FFFFFF',
  },
  bestTimeCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  bestTimeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3A2E1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bestTimeContent: {
    flex: 1,
  },
  bestTimeLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  bestTimeValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  bestTimeDescription: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  scrollView: {
    flex: 1,
  },
  chartSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  chartBarContainer: {
    height: 120,
    justifyContent: 'flex-end',
    width: '100%',
  },
  chartBar: {
    width: '100%',
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  weekSection: {
    padding: 16,
  },
  weekHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  dayCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  engagementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A3A2E',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  engagementValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#10B981',
  },
  dayDetails: {
    gap: 8,
    marginBottom: 12,
  },
  dayDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayDetailLabel: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  dayDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recommendation: {
    backgroundColor: '#374151',
    padding: 10,
    borderRadius: 8,
  },
  recommendationText: {
    fontSize: 12,
    color: '#93C5FD',
  },
  insightsSection: {
    padding: 16,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  insightIconContainer: {
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
