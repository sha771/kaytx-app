import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { BlurView } from 'expo-blur';
import { Brain, Lightbulb, AlertTriangle, Zap, TrendingUp, Shield, Cpu, CheckCircle, Sparkles } from 'lucide-react-native';

interface AIInsight {
  id: string;
  type: 'performance' | 'security' | 'cost' | 'capacity' | 'quality';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  action: string;
  impact: string;
  timestamp: string;
}

interface AIEngineeringInsightsProps {
  insights: AIInsight[];
}

export default function AIEngineeringInsights({ insights }: AIEngineeringInsightsProps) {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return Zap;
      case 'security':
        return Shield;
      case 'cost':
        return TrendingUp;
      case 'capacity':
        return Cpu;
      case 'quality':
        return CheckCircle;
      default:
        return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance':
        return '#F59E0B';
      case 'security':
        return '#EF4444';
      case 'cost':
        return '#10B981';
      case 'capacity':
        return '#3B82F6';
      case 'quality':
        return '#8B5CF6';
      default:
        return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#3B82F6';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#EF4444';
      case 'high':
        return '#F59E0B';
      case 'medium':
        return '#3B82F6';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  return (
    <BlurView
      intensity={80}
      tint="dark"
      style={[styles.container, { backgroundColor: theme.colors.card + '90' }]}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Brain size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              AI Engineering Insights
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Intelligent Recommendations & Analysis
            </Text>
          </View>
        </View>
        <View style={[styles.aiBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Sparkles size={14} color="#8B5CF6" />
          <Text style={[styles.aiBadgeText, { color: '#8B5CF6' }]}>AI Powered</Text>
        </View>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              Total Insights
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              {insights.length}
            </Text>
          </View>
          <View style={styles.summaryBreakdown}>
            <View style={styles.breakdownItem}>
              <View style={[styles.breakdownDot, { backgroundColor: '#EF4444' }]} />
              <Text style={[styles.breakdownText, { color: theme.colors.textSecondary }]}>
                Critical: {insights.filter(i => i.severity === 'critical').length}
              </Text>
            </View>
            <View style={styles.breakdownItem}>
              <View style={[styles.breakdownDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={[styles.breakdownText, { color: theme.colors.textSecondary }]}>
                High: {insights.filter(i => i.severity === 'high').length}
              </Text>
            </View>
            <View style={styles.breakdownItem}>
              <View style={[styles.breakdownDot, { backgroundColor: '#3B82F6' }]} />
              <Text style={[styles.breakdownText, { color: theme.colors.textSecondary }]}>
                Medium: {insights.filter(i => i.severity === 'medium').length}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>
              AI Confidence
            </Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>
              94.2%
            </Text>
          </View>
          <View style={[styles.confidenceBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[styles.confidenceFill, { 
                backgroundColor: '#10B981',
                width: '94.2%' 
              }]} 
            />
          </View>
          <Text style={[styles.confidenceText, { color: theme.colors.textSecondary }]}>
            Based on 1,247 data points
          </Text>
        </View>
      </View>

      <View style={styles.insightsSection}>
        <Text style={[styles.insightsTitle, { color: theme.colors.text }]}>
          Active Recommendations
        </Text>

        {insights.map((insight) => {
          const TypeIcon = getTypeIcon(insight.type);
          const typeColor = getTypeColor(insight.type);
          const severityColor = getSeverityColor(insight.severity);
          const severityBorder = getSeverityBorder(insight.severity);
          
          return (
            <View key={insight.id} style={[styles.insightCard, { borderLeftColor: severityBorder, backgroundColor: 'rgba(255,255,255,0.03)' }]}>
              <View style={styles.insightHeader}>
                <View style={styles.insightType}>
                  <View style={[styles.typeBadge, { backgroundColor: typeColor + '20' }]}>
                    <TypeIcon size={16} color={typeColor} />
                  </View>
                  <View style={styles.insightInfo}>
                    <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                      {insight.title}
                    </Text>
                    <View style={styles.insightMeta}>
                      <View style={[styles.severityBadge, { backgroundColor: severityColor + '20' }]}>
                        <Text style={[styles.severityText, { color: severityColor }]}>
                          {insight.severity.toUpperCase()}
                        </Text>
                      </View>
                      <Text style={[styles.insightTimestamp, { color: theme.colors.textSecondary }]}>
                        {insight.timestamp}
                      </Text>
                    </View>
                  </View>
                </View>
                <Lightbulb size={20} color="#F59E0B" />
              </View>

              <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
                {insight.description}
              </Text>

              <View style={styles.insightAction}>
                <View style={styles.actionLeft}>
                  <Text style={[styles.actionLabel, { color: theme.colors.textSecondary }]}>
                    Suggested Action
                  </Text>
                  <Text style={[styles.actionText, { color: theme.colors.text }]}>
                    {insight.action}
                  </Text>
                </View>
                <View style={styles.actionRight}>
                  <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>
                    Expected Impact
                  </Text>
                  <Text style={[styles.impactText, { color: '#10B981' }]}>
                    {insight.impact}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.categoriesSection}>
        <Text style={[styles.categoriesTitle, { color: theme.colors.text }]}>
          Insight Categories
        </Text>

        <View style={styles.categoriesGrid}>
          <View style={[styles.categoryCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' }]}>
            <Zap size={24} color="#F59E0B" />
            <Text style={[styles.categoryLabel, { color: theme.colors.text }]}>
              Performance
            </Text>
            <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
              {insights.filter(i => i.type === 'performance').length} insights
            </Text>
          </View>

          <View style={[styles.categoryCard, { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444' }]}>
            <Shield size={24} color="#EF4444" />
            <Text style={[styles.categoryLabel, { color: theme.colors.text }]}>
              Security
            </Text>
            <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
              {insights.filter(i => i.type === 'security').length} insights
            </Text>
          </View>

          <View style={[styles.categoryCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }]}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={[styles.categoryLabel, { color: theme.colors.text }]}>
              Cost
            </Text>
            <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
              {insights.filter(i => i.type === 'cost').length} insights
            </Text>
          </View>

          <View style={[styles.categoryCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' }]}>
            <Cpu size={24} color="#3B82F6" />
            <Text style={[styles.categoryLabel, { color: theme.colors.text }]}>
              Capacity
            </Text>
            <Text style={[styles.categoryCount, { color: theme.colors.textSecondary }]}>
              {insights.filter(i => i.type === 'capacity').length} insights
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
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    opacity: 0.7,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  summarySection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  summaryBreakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  breakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownText: {
    fontSize: 11,
    opacity: 0.8,
  },
  confidenceBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 4,
  },
  confidenceText: {
    fontSize: 10,
    opacity: 0.7,
  },
  insightsSection: {
    marginBottom: 20,
  },
  insightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightType: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
  },
  typeBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightInfo: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  insightMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightTimestamp: {
    fontSize: 10,
    opacity: 0.7,
  },
  insightDescription: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 12,
    lineHeight: 18,
  },
  insightAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  actionLeft: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 10,
    marginBottom: 4,
    opacity: 0.7,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionRight: {
    alignItems: 'flex-end',
  },
  impactLabel: {
    fontSize: 10,
    marginBottom: 4,
    opacity: 0.7,
  },
  impactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  categoriesSection: {
    marginTop: 8,
  },
  categoriesTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 11,
    opacity: 0.7,
  }
});