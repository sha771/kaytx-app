import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { AlertTriangle, TrendingUp, Sparkles, ArrowRight, CheckCircle, XCircle } from 'lucide-react-native';
import { AIProfessionalServicesInsightsConfig } from '../types';

interface AIProfessionalServicesInsightsProps extends AIProfessionalServicesInsightsConfig {}

export default function AIProfessionalServicesInsights({ insights }: AIProfessionalServicesInsightsProps) {
  const { theme } = useTheme();

  const getInsightConfig = (type: string) => {
    switch (type) {
      case 'risk':
        return {
          icon: AlertTriangle,
          color: '#EF4444',
          bgColor: '#EF4444' + '20',
          label: 'Risk'
        };
      case 'opportunity':
        return {
          icon: TrendingUp,
          color: '#10B981',
          bgColor: '#10B981' + '20',
          label: 'Opportunity'
        };
      case 'recommendation':
        return {
          icon: Sparkles,
          color: '#3B82F6',
          bgColor: '#3B82F6' + '20',
          label: 'Recommendation'
        };
      default:
        return {
          icon: Sparkles,
          color: '#6B7280',
          bgColor: '#6B7280' + '20',
          label: 'Insight'
        };
    }
  };

  const getImpactConfig = (impact: string) => {
    switch (impact) {
      case 'high':
        return { color: '#EF4444', bgColor: '#EF4444' + '20' };
      case 'medium':
        return { color: '#F59E0B', bgColor: '#F59E0B' + '20' };
      case 'low':
        return { color: '#10B981', bgColor: '#10B981' + '20' };
      default:
        return { color: '#6B7280', bgColor: '#6B7280' + '20' };
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: '#10B981' }]}>
          AI Professional Services Insights
        </Text>
        <View style={[styles.insightCount, { backgroundColor: '#10B981' + '20' }]}>
          <Text style={[styles.insightCountText, { color: '#10B981' }]}>{insights.length} Active</Text>
        </View>
      </View>

      <ScrollView style={styles.insightsScroll} showsVerticalScrollIndicator={false}>
        {insights.map((insight) => {
          const insightConfig = getInsightConfig(insight.type);
          const impactConfig = getImpactConfig(insight.impact);
          const Icon = insightConfig.icon;

          return (
            <View key={insight.id} style={[styles.insightCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderLeftColor: insightConfig.color, borderLeftWidth: 4 }]}>
              <View style={styles.insightHeader}>
                <View style={[styles.insightTypeBadge, { backgroundColor: insightConfig.bgColor }]}>
                  <Icon size={16} color={insightConfig.color} />
                  <Text style={[styles.insightTypeText, { color: insightConfig.color }]}>{insightConfig.label}</Text>
                </View>
                <View style={[styles.impactBadge, { backgroundColor: impactConfig.bgColor }]}>
                  <Text style={[styles.impactText, { color: impactConfig.color }]}>{insight.impact}</Text>
                </View>
              </View>

              <Text style={[styles.insightTitle, { color: '#FFFFFF' }]}>{insight.title}</Text>
              <Text style={[styles.insightDescription, { color: 'rgba(255, 255, 255, 0.6)' }]}>{insight.description}</Text>

              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' + '20' }]}>
                <Text style={[styles.actionText, { color: '#10B981' }]}>{insight.action}</Text>
                <ArrowRight size={16} color="#10B981" />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  insightCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  insightCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsScroll: {
    maxHeight: 400,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  insightTypeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
});
