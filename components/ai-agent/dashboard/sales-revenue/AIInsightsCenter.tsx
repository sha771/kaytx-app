import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, AlertTriangle, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react-native';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
}

interface AIInsightsConfig {
  insights: Insight[];
}

interface AIInsightsCenterProps {
  config: AIInsightsConfig;
}

export default function AIInsightsCenter({ config }: AIInsightsCenterProps) {
  const { theme } = useTheme();

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return '#10B981';
      case 'risk':
        return '#EF4444';
      case 'recommendation':
        return '#3B82F6';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return TrendingUp;
      case 'risk':
        return AlertTriangle;
      case 'recommendation':
        return Lightbulb;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Lightbulb size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Insights Center
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.insightsRow}>
          {config.insights.map((insight) => {
            const InsightIcon = getInsightIcon(insight.type);
            const insightColor = getInsightColor(insight.type);
            
            return (
              <View 
                key={insight.id} 
                style={[
                  styles.insightCard, 
                  { backgroundColor: 'rgba(255,255,255,0.03)', borderLeftColor: insightColor }
                ]}
              >
                <View style={styles.insightHeader}>
                  <View style={[styles.insightIcon, { backgroundColor: insightColor + '20' }]}>
                    <InsightIcon size={14} color={insightColor} />
                  </View>
                  <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) + '20' }]}>
                    <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>
                      {insight.impact.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                  {insight.title}
                </Text>
                
                <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
                  {insight.description}
                </Text>

                <View style={[styles.actionCard, { backgroundColor: insightColor + '10' }]}>
                  <CheckCircle size={12} color={insightColor} />
                  <Text style={[styles.actionText, { color: insightColor }]}>
                    {insight.action}
                  </Text>
                  <ArrowRight size={12} color={insightColor} />
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
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  insightsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  insightCard: {
    borderRadius: 12,
    padding: 12,
    minWidth: 240,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderLeftWidth: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  insightIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 9,
    fontWeight: '700',
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  insightDescription: {
    fontSize: 11,
    marginBottom: 10,
    lineHeight: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 6,
  },
  actionText: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
  }
});