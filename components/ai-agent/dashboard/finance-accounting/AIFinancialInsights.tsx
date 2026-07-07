import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain, TrendingUp, AlertTriangle, DollarSign, Zap, Target, CheckCircle, Lightbulb } from 'lucide-react-native';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
  category: string;
}

interface AIFinancialInsightsProps {
  insights: Insight[];
}

export default function AIFinancialInsights({ insights }: AIFinancialInsightsProps) {
  const { theme } = useTheme();

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return '#10B981';
      case 'risk':
        return '#EF4444';
      case 'recommendation':
        return '#3B82F6';
      case 'alert':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp size={16} color="#10B981" />;
      case 'risk':
        return <AlertTriangle size={16} color="#EF4444" />;
      case 'recommendation':
        return <Lightbulb size={16} color="#3B82F6" />;
      case 'alert':
        return <Zap size={16} color="#F59E0B" />;
      default:
        return <Brain size={16} color="#6B7280" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Revenue':
        return <DollarSign size={12} color="#F59E0B" />;
      case 'Cash Flow':
        return <Target size={12} color="#3B82F6" />;
      case 'Cost':
        return <Zap size={12} color="#EF4444" />;
      case 'Compliance':
        return <CheckCircle size={12} color="#10B981" />;
      default:
        return <Brain size={12} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Brain size={20} color={theme.colors.primary} />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Financial Insights
        </Text>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryCard}>
          <TrendingUp size={16} color="#10B981" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Opportunities
          </Text>
          <Text style={[styles.summaryValue, { color: '#10B981' }]}>
            {insights.filter(i => i.type === 'opportunity').length}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <AlertTriangle size={16} color="#EF4444" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Risks
          </Text>
          <Text style={[styles.summaryValue, { color: '#EF4444' }]}>
            {insights.filter(i => i.type === 'risk').length}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Lightbulb size={16} color="#3B82F6" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Recommendations
          </Text>
          <Text style={[styles.summaryValue, { color: '#3B82F6' }]}>
            {insights.filter(i => i.type === 'recommendation').length}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Zap size={16} color="#F59E0B" />
          <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
            Alerts
          </Text>
          <Text style={[styles.summaryValue, { color: '#F59E0B' }]}>
            {insights.filter(i => i.type === 'alert').length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.insightsList} showsVerticalScrollIndicator={false}>
        {insights.map((insight) => (
          <View 
            key={insight.id} 
            style={[
              styles.insightCard, 
              { borderLeftColor: getInsightColor(insight.type) }
            ]}
          >
            <View style={styles.insightHeader}>
              <View style={styles.insightIconContainer}>
                {getInsightIcon(insight.type)}
              </View>
              <View style={styles.insightHeaderContent}>
                <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                  {insight.title}
                </Text>
                <View style={styles.insightMeta}>
                  <View style={styles.insightMetaItem}>
                    {getCategoryIcon(insight.category)}
                    <Text style={[styles.insightCategory, { color: theme.colors.textSecondary }]}>
                      {insight.category}
                    </Text>
                  </View>
                  <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) + '20' }]}>
                    <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>
                      {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
              {insight.description}
            </Text>

            <View style={styles.actionSection}>
              <View style={styles.actionIcon}>
                <Target size={14} color="#3B82F6" />
              </View>
              <Text style={[styles.actionText, { color: theme.colors.text }]}>
                {insight.action}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    maxHeight: 500,
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
  summarySection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  insightsList: {
    flex: 1,
  },
  insightCard: {
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    borderLeftWidth: 3,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
  },
  insightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  insightHeaderContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  insightCategory: {
    fontSize: 11,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 8,
  },
  actionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
  },
  actionText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
  }
});