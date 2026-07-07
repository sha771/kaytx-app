import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, Target, ArrowRight, ChevronRight } from 'lucide-react-native';

interface Recommendation {
  id: string;
  type: 'opportunity' | 'risk' | 'warning' | 'action';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  action: string;
  priority: number;
  estimatedValue?: string;
}

interface AICFORecommendationEngineProps {
  recommendations: Recommendation[];
}

export default function AICFORecommendationEngine({ recommendations }: AICFORecommendationEngineProps) {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp size={18} color="#10B981" />;
      case 'risk':
        return <AlertTriangle size={18} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={18} color="#F59E0B" />;
      case 'action':
        return <Zap size={18} color="#3B82F6" />;
      default:
        return <Sparkles size={18} color="#6B7280" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'opportunity': return '#10B981';
      case 'risk': return '#EF4444';
      case 'warning': return '#F59E0B';
      case 'action': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => b.priority - a.priority);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Sparkles size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI CFO Recommendation Engine
        </Text>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
          <CheckCircle size={16} color="#10B981" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Opportunities</Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {recommendations.filter(r => r.type === 'opportunity').length}
          </Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
          <AlertTriangle size={16} color="#EF4444" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Risks</Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            {recommendations.filter(r => r.type === 'risk').length}
          </Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
          <Target size={16} color="#3B82F6" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>Actions</Text>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
            {recommendations.filter(r => r.type === 'action').length}
          </Text>
        </View>
      </View>

      {/* Recommendations List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.recommendationsList}>
        {sortedRecommendations.map((recommendation) => (
          <View key={recommendation.id} style={[styles.recommendationCard, { backgroundColor: theme.colors.background }]}>
            <View style={styles.recommendationHeader}>
              <View style={[styles.recommendationIcon, { backgroundColor: `${getTypeColor(recommendation.type)}20` }]}>
                {getTypeIcon(recommendation.type)}
              </View>
              <View style={styles.recommendationMeta}>
                <Text style={[styles.recommendationTitle, { color: theme.colors.text }]}>
                  {recommendation.title}
                </Text>
                <View style={styles.recommendationTags}>
                  <View style={[styles.tag, { backgroundColor: `${getTypeColor(recommendation.type)}20` }]}>
                    <Text style={[styles.tagText, { color: getTypeColor(recommendation.type) }]}>
                      {recommendation.type.toUpperCase()}
                    </Text>
                  </View>
                  <View style={[styles.tag, { backgroundColor: `${getImpactColor(recommendation.impact)}20` }]}>
                    <Text style={[styles.tagText, { color: getImpactColor(recommendation.impact) }]}>
                      {recommendation.impact.toUpperCase()} IMPACT
                    </Text>
                  </View>
                  {recommendation.estimatedValue && (
                    <View style={[styles.tag, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                      <Text style={[styles.tagText, { color: '#F59E0B' }]}>
                        {recommendation.estimatedValue}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <Text style={[styles.recommendationDescription, { color: theme.colors.textSecondary }]}>
              {recommendation.description}
            </Text>

            <View style={styles.recommendationFooter}>
              <View style={styles.categoryBadge}>
                <Text style={[styles.categoryText, { color: theme.colors.textSecondary }]}>
                  {recommendation.category}
                </Text>
              </View>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: `${theme.colors.primary}20` }]}>
                <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>
                  {recommendation.action}
                </Text>
                <ChevronRight size={14} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* AI Confidence */}
      <View style={[styles.confidenceContainer, { backgroundColor: theme.colors.background }]}>
        <View style={styles.confidenceRow}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.confidenceText, { color: theme.colors.text }]}>
            AI Confidence: <Text style={{ color: '#10B981', fontWeight: '600' }}>94.2%</Text>
          </Text>
        </View>
        <Text style={[styles.confidenceSubtext, { color: theme.colors.textSecondary }]}>
          Based on analysis of 1,248 financial data points and 42 predictive models
        </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  recommendationsList: {
    maxHeight: 400,
    marginBottom: 16,
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  recommendationIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationMeta: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  recommendationTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 9,
    fontWeight: '600',
  },
  recommendationDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
  },
  recommendationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  confidenceContainer: {
    padding: 12,
    borderRadius: 10,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 12,
  },
  confidenceSubtext: {
    fontSize: 10,
  },
});
