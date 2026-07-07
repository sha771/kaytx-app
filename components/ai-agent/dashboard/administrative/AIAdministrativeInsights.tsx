import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, AlertTriangle, TrendingUp, Zap, Clock, Target, CheckCircle, Sparkles, ArrowRight, ChevronRight, Brain, Shield } from 'lucide-react-native';

interface Insight {
  id: string;
  type: 'optimization' | 'warning' | 'opportunity' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action: string;
  icon: string;
}

interface AIAdministrativeInsightsProps {
  insights: Insight[];
}

export default function AIAdministrativeInsights({ insights }: AIAdministrativeInsightsProps) {
  const { theme } = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return '#10B981';
      case 'warning': return '#F59E0B';
      case 'opportunity': return '#3B82F6';
      case 'alert': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <TrendingUp size={16} color="#10B981" />;
      case 'warning': return <AlertTriangle size={16} color="#F59E0B" />;
      case 'opportunity': return <Lightbulb size={16} color="#3B82F6" />;
      case 'alert': return <Shield size={16} color="#EF4444" />;
      default: return <Sparkles size={16} color="#6B7280" />;
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Brain size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              AI Administrative Insights
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Intelligent recommendations
            </Text>
          </View>
        </View>
        <View style={[styles.insightCountBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Sparkles size={16} color="#8B5CF6" />
          <Text style={[styles.insightCountText, { color: '#8B5CF6' }]}>
            {insights.length} Insights
          </Text>
        </View>
      </View>

      <ScrollView style={styles.insightsScroll} showsVerticalScrollIndicator={false}>
        {insights.map((insight) => (
          <View key={insight.id} style={[styles.insightCard, { borderColor: getTypeColor(insight.type) + '30', borderWidth: 1 }]}>
            <View style={styles.insightHeader}>
              <View style={[styles.insightTypeIcon, { backgroundColor: getTypeColor(insight.type) + '20' }]}>
                {getTypeIcon(insight.type)}
              </View>
              <View style={[styles.impactBadge, { backgroundColor: getImpactColor(insight.impact) + '20' }]}>
                <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>
                  {insight.impact.toUpperCase()} IMPACT
                </Text>
              </View>
            </View>

            <View style={styles.insightContent}>
              <Text style={[styles.insightIcon, { color: getTypeColor(insight.type) }]}>
                {insight.icon}
              </Text>
              <View style={styles.insightText}>
                <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                  {insight.title}
                </Text>
                <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
                  {insight.description}
                </Text>
              </View>
            </View>

            <View style={styles.insightAction}>
              <View style={styles.actionLeft}>
                <Zap size={14} color="#8B5CF6" />
                <Text style={[styles.actionLabel, { color: theme.colors.textSecondary }]}>
                  Suggested Action
                </Text>
              </View>
              <View style={styles.actionRight}>
                <Text style={[styles.actionText, { color: theme.colors.text }]}>
                  {insight.action}
                </Text>
                <ChevronRight size={16} color="#8B5CF6" />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.summarySection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.summaryHeader}>
          <Target size={20} color="#8B5CF6" />
          <Text style={[styles.summaryTitle, { color: theme.colors.text }]}>
            Impact Summary
          </Text>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: '#EF4444' }]}>
              {insights.filter(i => i.impact === 'high').length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              High Impact
            </Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: '#F59E0B' }]}>
              {insights.filter(i => i.impact === 'medium').length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              Medium Impact
            </Text>
          </View>
          <View style={styles.summaryStat}>
            <Text style={[styles.summaryStatValue, { color: '#10B981' }]}>
              {insights.filter(i => i.impact === 'low').length}
            </Text>
            <Text style={[styles.summaryStatLabel, { color: theme.colors.textSecondary }]}>
              Low Impact
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    maxHeight: 600,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  insightCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  insightCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  insightsScroll: {
    marginBottom: 16,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightTypeIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  insightIcon: {
    fontSize: 24,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  insightAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  actionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  summarySection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryStatValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryStatLabel: {
    fontSize: 10,
  },
});
