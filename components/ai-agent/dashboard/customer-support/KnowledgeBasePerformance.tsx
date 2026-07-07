import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Article {
  title: string;
  views: number;
  successRate: number;
}

interface KnowledgeGap {
  topic: string;
  requestCount: number;
  priority: 'high' | 'medium' | 'low';
}

interface KnowledgeBasePerformanceProps {
  topArticles: Article[];
  searchSuccessRate: number;
  retrievalAccuracy: number;
  gaps: KnowledgeGap[];
}

export default function KnowledgeBasePerformance({ 
  topArticles, 
  searchSuccessRate,
  retrievalAccuracy,
  gaps 
}: KnowledgeBasePerformanceProps) {
  const { theme } = useTheme();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Knowledge Base Performance
      </Text>

      {/* Key Metrics */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            Search Success Rate
          </Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>
            {searchSuccessRate}%
          </Text>
        </View>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>
            AI Retrieval Accuracy
          </Text>
          <Text style={[styles.metricValue, { color: '#3B82F6' }]}>
            {retrievalAccuracy}%
          </Text>
        </View>
      </View>

      {/* Top Articles */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Most Used Articles
        </Text>
        <ScrollView style={styles.articlesScroll} showsVerticalScrollIndicator={false}>
          {topArticles.map((article, index) => (
            <View key={index} style={styles.articleItem}>
              <View style={styles.articleRank}>
                <Text style={[styles.rankText, { color: '#FFFFFF' }]}>
                  #{index + 1}
                </Text>
              </View>
              <View style={styles.articleInfo}>
                <Text style={[styles.articleTitle, { color: '#FFFFFF' }]} numberOfLines={2}>
                  {article.title}
                </Text>
                <View style={styles.articleStats}>
                  <Text style={[styles.statText, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                    {article.views} views
                  </Text>
                  <View style={[styles.statDivider, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]} />
                  <Text style={[styles.statText, { color: '#10B981' }]}>
                    {article.successRate}% success
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Knowledge Gaps */}
      <View style={[styles.section, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Knowledge Gaps
        </Text>
        <ScrollView style={styles.gapsScroll} showsVerticalScrollIndicator={false}>
          {gaps.map((gap, index) => (
            <View key={index} style={styles.gapItem}>
              <View style={styles.gapInfo}>
                <Text style={[styles.gapTopic, { color: '#FFFFFF' }]}>
                  {gap.topic}
                </Text>
                <Text style={[styles.gapRequests, { color: 'rgba(255, 255, 255, 0.5)' }]}>
                  {gap.requestCount} requests
                </Text>
              </View>
              <View style={[
                styles.priorityBadge, 
                { backgroundColor: `${getPriorityColor(gap.priority)}20`, borderColor: `${getPriorityColor(gap.priority)}40`, borderWidth: 1 }
              ]}>
                <Text style={[styles.priorityText, { color: getPriorityColor(gap.priority) }]}>
                  {gap.priority}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Suggested Articles */}
      <View style={[styles.suggestionsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Suggested New Articles
        </Text>
        <View style={styles.suggestionList}>
          <View style={styles.suggestionItem}>
            <Text style={[styles.suggestionText, { color: '#FFFFFF' }]}>
              • How to handle subscription billing disputes
            </Text>
          </View>
          <View style={styles.suggestionItem}>
            <Text style={[styles.suggestionText, { color: '#FFFFFF' }]}>
              • Integration guide for third-party apps
            </Text>
          </View>
          <View style={styles.suggestionItem}>
            <Text style={[styles.suggestionText, { color: '#FFFFFF' }]}>
              • Troubleshooting API connection errors
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
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    maxHeight: 180,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  articlesScroll: {
    flex: 1,
  },
  articleItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  articleRank: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '700',
  },
  articleInfo: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  articleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 10,
  },
  statDivider: {
    width: 1,
    height: 12,
    marginHorizontal: 8,
  },
  gapsScroll: {
    flex: 1,
  },
  gapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  gapInfo: {
    flex: 1,
  },
  gapTopic: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  gapRequests: {
    fontSize: 10,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  suggestionsSection: {
    padding: 16,
    borderRadius: 12,
  },
  suggestionList: {
    gap: 8,
  },
  suggestionItem: {
    paddingVertical: 4,
  },
  suggestionText: {
    fontSize: 13,
  },
});