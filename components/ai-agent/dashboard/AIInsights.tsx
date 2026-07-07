import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react-native';
import { AIInsightsConfig } from './types';

interface AIInsightsProps {
  config: AIInsightsConfig;
}

export default function AIInsights({ config }: AIInsightsProps) {
  const { theme } = useTheme();

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return TrendingUp;
      case 'risk': return AlertTriangle;
      case 'recommendation': return Lightbulb;
      default: return Lightbulb;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return '#10B981';
      case 'risk': return '#EF4444';
      case 'recommendation': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#6B7280';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Lightbulb size={20} color={theme.colors.primary} />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            AI Insights Center
          </Text>
        </View>
        <View style={[styles.insightCount, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.insightCountText, { color: theme.colors.text }]}>
            {config.insights.length} Insights
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.insightsContainer}>
          {config.insights.map((insight) => {
            const Icon = getInsightIcon(insight.type);
            const color = getInsightColor(insight.type);
            
            return (
              <View key={insight.id} style={[styles.insightCard, { backgroundColor: theme.colors.background }]}>
                <View style={styles.insightHeader}>
                  <View style={[styles.insightIcon, { backgroundColor: color + '20' }]}>
                    <Icon size={16} color={color} />
                  </View>
                  <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) + '20' }]}>
                    <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>
                      {insight.impact.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.insightTitle, { color: theme.colors.text }]} numberOfLines={2}>
                  {insight.title}
                </Text>

                <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]} numberOfLines={3}>
                  {insight.description}
                </Text>

                <View style={[styles.actionSection, { backgroundColor: theme.colors.card }]}>
                  <Text style={[styles.actionLabel, { color: theme.colors.textSecondary }]}>
                    Suggested Action
                  </Text>
                  <View style={styles.actionRow}>
                    <Text style={[styles.actionText, { color: theme.colors.text }]} numberOfLines={1}>
                      {insight.action}
                    </Text>
                    <ArrowRight size={14} color={theme.colors.primary} />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
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
  insightCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  insightCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 4,
  },
  insightCard: {
    width: 240,
    padding: 12,
    borderRadius: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '700',
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 11,
    marginBottom: 12,
    lineHeight: 16,
  },
  actionSection: {
    padding: 10,
    borderRadius: 8,
  },
  actionLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
});
