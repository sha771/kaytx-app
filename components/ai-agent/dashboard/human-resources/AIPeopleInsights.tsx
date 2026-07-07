import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain, Lightbulb, AlertTriangle, TrendingUp, CheckCircle, Zap, Sparkles, Flame, ArrowRight } from 'lucide-react-native';

interface AIInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
}

interface AIPeopleInsightsProps {
  insights: AIInsight[];
}

export default function AIPeopleInsights({ insights }: AIPeopleInsightsProps) {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <Lightbulb size={18} color="#10B981" />;
      case 'risk':
        return <AlertTriangle size={18} color="#EF4444" />;
      case 'recommendation':
        return <Brain size={18} color="#3B82F6" />;
      case 'alert':
        return <Zap size={18} color="#F59E0B" />;
      default:
        return <CheckCircle size={18} color="#6B7280" />;
    }
  };

  const getTypeColor = (type: string) => {
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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#3B82F6' + '20' }]}>
          <Brain size={24} color="#3B82F6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            AI People Insights
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Intelligent Recommendations
          </Text>
        </View>
      </View>

      <ScrollView style={styles.insightsScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.insightsList}>
          {insights.map((insight) => (
            <View 
              key={insight.id} 
              style={[
                styles.insightCard, 
                { 
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderColor: getTypeColor(insight.type) + '30',
                  borderWidth: 1,
                  borderLeftWidth: 4,
                  borderLeftColor: getTypeColor(insight.type)
                }
              ]}
            >
              <View style={styles.insightHeader}>
                <View style={styles.insightTypeRow}>
                  <View style={[styles.iconWrapper, { backgroundColor: getTypeColor(insight.type) + '15' }]}>
                    {getTypeIcon(insight.type)}
                  </View>
                  <View style={[styles.typeBadge, { backgroundColor: getTypeColor(insight.type) + '20' }]}>
                    <Text style={[styles.typeText, { color: getTypeColor(insight.type) }]}>
                      {insight.type}
                    </Text>
                  </View>
                </View>
                {insight.actionable && (
                  <View style={[styles.actionableBadge, { backgroundColor: '#10B981' + '20', borderColor: '#10B981' + '30', borderWidth: 1 }]}>
                    <CheckCircle size={14} color="#10B981" />
                    <Text style={[styles.actionableText, { color: '#10B981' }]}>
                      Actionable
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                {insight.title}
              </Text>

              <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
                {insight.description}
              </Text>

              <View style={styles.insightFooter}>
                <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) + '20' }]}>
                  <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>
                    {insight.impact} impact
                  </Text>
                </View>
                <View style={styles.confidenceSection}>
                  <Text style={[styles.confidenceLabel, { color: theme.colors.textSecondary }]}>
                    AI Confidence
                  </Text>
                  <Text style={[styles.confidenceValue, { color: insight.confidence >= 80 ? '#10B981' : insight.confidence >= 60 ? '#F59E0B' : '#EF4444' }]}>
                    {insight.confidence}%
                  </Text>
                </View>
              </View>

              <View style={[styles.confidenceBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.confidenceFill, 
                    { 
                      backgroundColor: insight.confidence >= 80 ? '#10B981' : 
                                   insight.confidence >= 60 ? '#F59E0B' : '#EF4444',
                      width: `${insight.confidence}%`,
                      shadowColor: insight.confidence >= 80 ? '#10B981' : insight.confidence >= 60 ? '#F59E0B' : '#EF4444',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.4,
                      shadowRadius: 8,
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.quickActions, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.quickActionItem}>
          <Flame size={14} color="#F59E0B" />
          <Text style={[styles.quickActionText, { color: theme.colors.textSecondary }]}>
            3 high-priority risks
          </Text>
          <ArrowRight size={14} color="#6B7280" />
        </View>
        <View style={styles.quickActionItem}>
          <Sparkles size={14} color="#10B981" />
          <Text style={[styles.quickActionText, { color: theme.colors.textSecondary }]}>
            5 growth opportunities
          </Text>
          <ArrowRight size={14} color="#6B7280" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  insightsScroll: {
    maxHeight: 400,
  },
  insightsList: {
    gap: 14,
  },
  insightCard: {
    padding: 18,
    borderRadius: 14,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  insightTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  actionableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionableText: {
    fontSize: 11,
    fontWeight: '700',
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  insightDescription: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 14,
    lineHeight: 20,
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  impactBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 11,
    fontWeight: '700',
  },
  confidenceSection: {
    alignItems: 'flex-end',
  },
  confidenceLabel: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 4,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  confidenceBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
  },
  quickActionItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  quickActionText: {
    fontSize: 11,
    opacity: 0.8,
    flex: 1,
  },
});