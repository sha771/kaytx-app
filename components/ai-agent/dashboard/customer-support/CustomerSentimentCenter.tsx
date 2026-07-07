import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface SentimentData {
  positive: number;
  neutral: number;
  negative: number;
  frustrated: number;
  happy: number;
  atRisk: number;
}

interface CustomerSentimentCenterProps {
  sentimentData: SentimentData;
  trendData: Array<{ period: string; score: number }>;
}

export default function CustomerSentimentCenter({ sentimentData, trendData }: CustomerSentimentCenterProps) {
  const { theme } = useTheme();

  const total = sentimentData.positive + sentimentData.neutral + sentimentData.negative + 
                sentimentData.frustrated + sentimentData.happy + sentimentData.atRisk;

  const SentimentBar = ({ label, value, color }: any) => (
    <View style={styles.sentimentBar}>
      <Text style={[styles.sentimentLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>
        {label}
      </Text>
      <View style={[styles.sentimentProgress, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
        <View 
          style={[
            styles.sentimentFill, 
            { backgroundColor: color, width: `${(value / total) * 100}%` }
          ]} 
        />
      </View>
      <Text style={[styles.sentimentValue, { color: '#FFFFFF' }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Customer Sentiment Center
      </Text>

      {/* Sentiment Distribution */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Sentiment Distribution
        </Text>
        <View style={styles.sentimentGrid}>
          <SentimentBar label="Positive" value={sentimentData.positive} color="#22C55E" />
          <SentimentBar label="Happy" value={sentimentData.happy} color="#10B981" />
          <SentimentBar label="Neutral" value={sentimentData.neutral} color="#F59E0B" />
          <SentimentBar label="Negative" value={sentimentData.negative} color="#EF4444" />
          <SentimentBar label="Frustrated" value={sentimentData.frustrated} color="#DC2626" />
          <SentimentBar label="At Risk" value={sentimentData.atRisk} color="#B91C1C" />
        </View>
      </View>

      {/* Sentiment Trend */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Sentiment Trend (Last 7 Days)
        </Text>
        <View style={styles.trendChart}>
          {trendData.map((item, index) => {
            const maxScore = Math.max(...trendData.map(d => d.score));
            const height = (item.score / maxScore) * 100;
            const isPositive = item.score >= 70;
            
            return (
              <View key={index} style={styles.trendColumn}>
                <View 
                  style={[
                    styles.trendBar, 
                    { 
                      backgroundColor: isPositive ? '#22C55E' : item.score >= 50 ? '#F59E0B' : '#EF4444',
                      height: `${height}%`
                    }
                  ]} 
                />
                <Text style={[styles.trendLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  {item.period}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Customer Mood Indicators */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Customer Mood Indicators
        </Text>
        <View style={styles.moodGrid}>
          <View style={[styles.moodCard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
            <Text style={styles.moodEmoji}>😊</Text>
            <Text style={[styles.moodLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Satisfied
            </Text>
            <Text style={[styles.moodValue, { color: '#10B981' }]}>
              {Math.round((sentimentData.positive + sentimentData.happy) / total * 100)}%
            </Text>
          </View>
          <View style={[styles.moodCard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
            <Text style={styles.moodEmoji}>😐</Text>
            <Text style={[styles.moodLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Neutral
            </Text>
            <Text style={[styles.moodValue, { color: '#F59E0B' }]}>
              {Math.round(sentimentData.neutral / total * 100)}%
            </Text>
          </View>
          <View style={[styles.moodCard, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.3)', borderWidth: 1 }]}>
            <Text style={styles.moodEmoji}>😠</Text>
            <Text style={[styles.moodLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
              Frustrated
            </Text>
            <Text style={[styles.moodValue, { color: '#EF4444' }]}>
              {Math.round((sentimentData.negative + sentimentData.frustrated) / total * 100)}%
            </Text>
          </View>
        </View>
      </View>

      {/* At Risk Customers Alert */}
      {sentimentData.atRisk > 0 && (
        <View style={[styles.alertSection, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
          <Text style={[styles.alertTitle, { color: '#EF4444' }]}>
            ⚠️ At Risk Customers
          </Text>
          <Text style={[styles.alertText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
            {sentimentData.atRisk} customers require immediate attention
          </Text>
        </View>
      )}
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
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  sentimentGrid: {
    gap: 8,
  },
  sentimentBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sentimentLabel: {
    width: 80,
    fontSize: 12,
  },
  sentimentProgress: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 12,
  },
  sentimentFill: {
    height: '100%',
    borderRadius: 5,
  },
  sentimentValue: {
    fontSize: 13,
    fontWeight: '700',
    width: 40,
    textAlign: 'right',
  },
  trendChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    paddingTop: 8,
  },
  trendColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  trendBar: {
    width: '100%',
    borderRadius: 5,
    marginBottom: 8,
  },
  trendLabel: {
    fontSize: 10,
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodCard: {
    flex: 1,
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  moodValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  alertSection: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  alertText: {
    fontSize: 12,
  },
});