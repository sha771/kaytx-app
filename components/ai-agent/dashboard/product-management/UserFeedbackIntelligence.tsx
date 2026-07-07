import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface FeedbackItem {
  id: string;
  source: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
}

interface UserFeedbackIntelligenceProps {
  feedback: FeedbackItem[];
}

export default function UserFeedbackIntelligence({ feedback }: UserFeedbackIntelligenceProps) {
  const { theme } = useTheme();

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '#22C55E';
      case 'neutral': return '#F59E0B';
      case 'negative': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'in-app': return '📱';
      case 'email': return '📧';
      case 'support': return '💬';
      case 'reviews': return '⭐';
      default: return '📝';
    }
  };

  const sentimentCounts = {
    positive: feedback.filter(f => f.sentiment === 'positive').length,
    neutral: feedback.filter(f => f.sentiment === 'neutral').length,
    negative: feedback.filter(f => f.sentiment === 'negative').length,
  };

  const categoryCounts = feedback.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        User Feedback Intelligence Center
      </Text>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Sentiment Overview */}
        <View style={[styles.sentimentCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Sentiment Analysis
          </Text>
          <View style={styles.sentimentMetrics}>
            <View style={styles.sentimentMetric}>
              <View style={[styles.sentimentDot, { backgroundColor: getSentimentColor('positive') }]} />
              <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
                Positive
              </Text>
              <Text style={[styles.sentimentCount, { color: getSentimentColor('positive') }]}>
                {sentimentCounts.positive}
              </Text>
            </View>
            <View style={styles.sentimentMetric}>
              <View style={[styles.sentimentDot, { backgroundColor: getSentimentColor('neutral') }]} />
              <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
                Neutral
              </Text>
              <Text style={[styles.sentimentCount, { color: getSentimentColor('neutral') }]}>
                {sentimentCounts.neutral}
              </Text>
            </View>
            <View style={styles.sentimentMetric}>
              <View style={[styles.sentimentDot, { backgroundColor: getSentimentColor('negative') }]} />
              <Text style={[styles.sentimentLabel, { color: theme.colors.textSecondary }]}>
                Negative
              </Text>
              <Text style={[styles.sentimentCount, { color: getSentimentColor('negative') }]}>
                {sentimentCounts.negative}
              </Text>
            </View>
          </View>
        </View>

        {/* Category Breakdown */}
        <View style={[styles.categoryCard, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Feedback Categories
          </Text>
          <View style={styles.categoryList}>
            {Object.entries(categoryCounts).map(([category, count]) => (
              <View key={category} style={styles.categoryItem}>
                <Text style={[styles.categoryName, { color: theme.colors.text }]}>
                  {category}
                </Text>
                <View style={styles.categoryBar}>
                  <View 
                    style={[
                      styles.categoryFill, 
                      { 
                        width: `${(count / feedback.length) * 100}%`,
                        backgroundColor: '#3B82F6'
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
                  {count}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Feedback */}
        <View style={styles.feedbackSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Feedback
          </Text>
          {feedback.slice(0, 10).map((item) => (
            <View 
              key={item.id}
              style={[styles.feedbackCard, { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border,
                borderLeftColor: getPriorityColor(item.priority),
                borderLeftWidth: 3
              }]}
            >
              <View style={styles.feedbackHeader}>
                <View style={styles.feedbackMeta}>
                  <Text style={styles.sourceIcon}>{getSourceIcon(item.source)}</Text>
                  <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>
                    {item.source}
                  </Text>
                </View>
                <View style={styles.feedbackBadges}>
                  <View style={[styles.sentimentBadge, { backgroundColor: `${getSentimentColor(item.sentiment)}20` }]}>
                    <Text style={[styles.badgeText, { color: getSentimentColor(item.sentiment) }]}>
                      {item.sentiment}
                    </Text>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: `${getPriorityColor(item.priority)}20` }]}>
                    <Text style={[styles.badgeText, { color: getPriorityColor(item.priority) }]}>
                      {item.priority}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.feedbackCategory, { color: theme.colors.textSecondary }]}>
                {item.category}
              </Text>
              <Text style={[styles.feedbackDescription, { color: theme.colors.text }]}>
                {item.description}
              </Text>

              <Text style={[styles.feedbackTimestamp, { color: theme.colors.textSecondary }]}>
                {item.timestamp}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 700,
  },
  sentimentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sentimentMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sentimentMetric: {
    alignItems: 'center',
  },
  sentimentDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  sentimentLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  sentimentCount: {
    fontSize: 18,
    fontWeight: '700',
  },
  categoryCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  categoryList: {
    marginTop: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    width: 120,
    fontSize: 12,
  },
  categoryBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  categoryFill: {
    height: '100%',
    borderRadius: 4,
  },
  categoryCount: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'right',
  },
  feedbackSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  feedbackCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sourceIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  sourceText: {
    fontSize: 12,
  },
  feedbackBadges: {
    flexDirection: 'row',
  },
  sentimentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  feedbackCategory: {
    fontSize: 11,
    marginBottom: 4,
  },
  feedbackDescription: {
    fontSize: 13,
    marginBottom: 8,
    lineHeight: 18,
  },
  feedbackTimestamp: {
    fontSize: 10,
  },
});
