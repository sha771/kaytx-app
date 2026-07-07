import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, AlertTriangle, CheckCircle, Zap, Shield, TrendingUp, Clock, Target, Brain, FileText, Database, Lock, Activity } from 'lucide-react-native';

interface GovernanceInsight {
  id: string;
  type: 'risk' | 'opportunity' | 'compliance' | 'optimization' | 'security';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  recommendedActions: string[];
  affectedSystems: string[];
  timeToImplement: string;
  estimatedBenefit: string;
  source: string;
  timestamp: string;
}

interface AIGovernanceInsightsProps {
  insights: GovernanceInsight[];
}

export default function AIGovernanceInsights({ insights }: AIGovernanceInsightsProps) {
  const { theme } = useTheme();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'risk': return '#EF4444';
      case 'opportunity': return '#10B981';
      case 'compliance': return '#8B5CF6';
      case 'optimization': return '#06B6D4';
      case 'security': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getTypeBackground = (type: string) => {
    const color = getTypeColor(type);
    return color + '15';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#06B6D4';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return '#10B981';
    if (confidence >= 70) return '#06B6D4';
    if (confidence >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'risk': return <AlertTriangle size={16} color="#EF4444" />;
      case 'opportunity': return <TrendingUp size={16} color="#10B981" />;
      case 'compliance': return <Shield size={16} color="#8B5CF6" />;
      case 'optimization': return <Zap size={16} color="#06B6D4" />;
      case 'security': return <Lock size={16} color="#F59E0B" />;
      default: return <Lightbulb size={16} color="#6B7280" />;
    }
  };

  const insightStats = [
    { label: 'Total Insights', value: insights.length, color: '#06B6D4' },
    { label: 'Critical', value: insights.filter(i => i.priority === 'critical').length, color: '#EF4444' },
    { label: 'High Priority', value: insights.filter(i => i.priority === 'high').length, color: '#F59E0B' },
    { label: 'Avg Confidence', value: Math.round(insights.reduce((acc, i) => acc + i.confidence, 0) / insights.length) + '%', color: '#10B981' },
  ];

  const insightDistribution = [
    { type: 'Risk', count: insights.filter(i => i.type === 'risk').length, color: '#EF4444' },
    { type: 'Opportunity', count: insights.filter(i => i.type === 'opportunity').length, color: '#10B981' },
    { type: 'Compliance', count: insights.filter(i => i.type === 'compliance').length, color: '#8B5CF6' },
    { type: 'Optimization', count: insights.filter(i => i.type === 'optimization').length, color: '#06B6D4' },
    { type: 'Security', count: insights.filter(i => i.type === 'security').length, color: '#F59E0B' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Brain size={20} color="#8B5CF6" />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          AI Governance Insights
        </Text>
        <View style={[styles.aiBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Activity size={12} color="#8B5CF6" />
          <Text style={[styles.aiBadgeText, { color: '#8B5CF6' }]}>
            AI-Generated
          </Text>
        </View>
      </View>

      {/* Insight Statistics */}
      <View style={[styles.statsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.statsGrid}>
          {insightStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                {stat.label}
              </Text>
              <Text style={[styles.statValue, { color: stat.color }]}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Insight Distribution */}
      <View style={[styles.distributionSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.distributionHeader}>
          <Activity size={18} color="#06B6D4" />
          <Text style={[styles.distributionTitle, { color: theme.colors.text }]}>
            Insight Distribution
          </Text>
        </View>
        <View style={styles.distributionGrid}>
          {insightDistribution.map((item) => (
            <View key={item.type} style={styles.distributionItem}>
              <Text style={[styles.distributionLabel, { color: theme.colors.textSecondary }]}>
                {item.type}
              </Text>
              <View style={[styles.distributionBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.distributionFill, 
                    { backgroundColor: item.color, width: `${(item.count / insights.length) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={[styles.distributionValue, { color: item.color }]}>
                {item.count}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Insight Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.insightsScroll}
      >
        {insights.map((insight) => {
          const typeColor = getTypeColor(insight.type);
          const typeBackground = getTypeBackground(insight.type);
          const priorityColor = getPriorityColor(insight.priority);
          const confidenceColor = getConfidenceColor(insight.confidence);

          return (
            <View 
              key={insight.id} 
              style={[
                styles.insightCard, 
                { 
                  backgroundColor: typeBackground,
                  borderColor: typeColor + '30',
                  borderWidth: 1
                }
              ]}
            >
              <View style={styles.insightHeader}>
                <View style={[styles.insightIcon, { backgroundColor: typeColor + '20' }]}>
                  {getTypeIcon(insight.type)}
                </View>
                <View style={styles.insightMeta}>
                  <View style={[
                    styles.priorityBadge, 
                    { backgroundColor: priorityColor + '20' }
                  ]}>
                    <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
                    <Text style={[styles.priorityText, { color: priorityColor }]}>
                      {insight.priority.toUpperCase()} PRIORITY
                    </Text>
                  </View>
                  <View style={styles.confidenceRow}>
                    <Target size={12} color={confidenceColor} />
                    <Text style={[styles.confidenceText, { color: confidenceColor }]}>
                      {insight.confidence}% confidence
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                {insight.title}
              </Text>
              <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
                {insight.description}
              </Text>

              <View style={styles.insightImpact}>
                <View style={styles.impactRow}>
                  <TrendingUp size={14} color="#10B981" />
                  <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>
                    Impact
                  </Text>
                  <Text style={[styles.impactValue, { color: '#10B981' }]}>
                    {insight.impact}
                  </Text>
                </View>
                <View style={styles.impactRow}>
                  <Clock size={14} color="#8B5CF6" />
                  <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>
                    Time to Implement
                  </Text>
                  <Text style={[styles.impactValue, { color: '#8B5CF6' }]}>
                    {insight.timeToImplement}
                  </Text>
                </View>
                <View style={styles.impactRow}>
                  <Zap size={14} color="#F59E0B" />
                  <Text style={[styles.impactLabel, { color: theme.colors.textSecondary }]}>
                    Estimated Benefit
                  </Text>
                  <Text style={[styles.impactValue, { color: '#F59E0B' }]}>
                    {insight.estimatedBenefit}
                  </Text>
                </View>
              </View>

              <View style={styles.actionsSection}>
                <Text style={[styles.actionsTitle, { color: theme.colors.textSecondary }]}>
                  Recommended Actions
                </Text>
                {insight.recommendedActions.map((action, index) => (
                  <View key={index} style={styles.actionItem}>
                    <CheckCircle size={12} color="#10B981" />
                    <Text style={[styles.actionText, { color: theme.colors.text }]}>
                      {action}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.systemsSection}>
                <Text style={[styles.systemsTitle, { color: theme.colors.textSecondary }]}>
                  Affected Systems
                </Text>
                <View style={styles.systemsList}>
                  {insight.affectedSystems.slice(0, 3).map((system, index) => (
                    <View key={index} style={[styles.systemBadge, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                      <Database size={10} color={theme.colors.textSecondary} />
                      <Text style={[styles.systemText, { color: theme.colors.text }]}>
                        {system}
                      </Text>
                    </View>
                  ))}
                  {insight.affectedSystems.length > 3 && (
                    <Text style={[styles.systemsMore, { color: theme.colors.textSecondary }]}>
                      +{insight.affectedSystems.length - 3} more
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.insightFooter}>
                <View style={styles.sourceRow}>
                  <FileText size={12} color={theme.colors.textSecondary} />
                  <Text style={[styles.sourceText, { color: theme.colors.textSecondary }]}>
                    Source: {insight.source}
                  </Text>
                </View>
                <Text style={[styles.timestampText, { color: theme.colors.textSecondary }]}>
                  {insight.timestamp}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Top Priority Insights */}
      <View style={[styles.prioritySection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.priorityHeader}>
          <AlertTriangle size={18} color="#EF4444" />
          <Text style={[styles.priorityTitle, { color: theme.colors.text }]}>
            Top Priority Insights
          </Text>
        </View>
        <View style={styles.priorityList}>
          {insights.filter(i => i.priority === 'critical' || i.priority === 'high').slice(0, 3).map((insight, index) => (
            <View key={insight.id} style={styles.priorityItem}>
              <View style={[
                styles.priorityRank, 
                { backgroundColor: getTypeColor(insight.type) + '20' }
              ]}>
                <Text style={[
                  styles.priorityRankText, 
                  { color: getTypeColor(insight.type) }
                ]}>
                  #{index + 1}
                </Text>
              </View>
              <View style={styles.priorityInfo}>
                <Text style={[styles.priorityInsightTitle, { color: theme.colors.text }]}>
                  {insight.title}
                </Text>
                <Text style={[styles.priorityInsightDesc, { color: theme.colors.textSecondary }]}>
                  {insight.description}
                </Text>
              </View>
              <View style={[
                styles.priorityStatus, 
                { backgroundColor: getPriorityColor(insight.priority) + '20' }
              ]}>
                <Text style={[
                  styles.priorityStatusText, 
                  { color: getPriorityColor(insight.priority) }
                ]}>
                  {insight.priority.toUpperCase()}
                </Text>
              </View>
            </View>
          ))}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  statsSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  distributionSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  distributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  distributionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  distributionGrid: {
    gap: 8,
  },
  distributionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distributionLabel: {
    fontSize: 12,
    fontWeight: '500',
    width: 80,
  },
  distributionBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionValue: {
    fontSize: 12,
    fontWeight: '600',
    width: 30,
    textAlign: 'right',
  },
  insightsScroll: {
    gap: 16,
    paddingHorizontal: 4,
  },
  insightCard: {
    borderRadius: 16,
    padding: 20,
    minWidth: 300,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightMeta: {
    alignItems: 'flex-end',
    gap: 4,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
  },
  insightDescription: {
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 12,
    lineHeight: 16,
  },
  insightImpact: {
    gap: 6,
    marginBottom: 12,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: '500',
  },
  impactValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionsSection: {
    marginBottom: 12,
  },
  actionsTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  actionText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
  },
  systemsSection: {
    marginBottom: 12,
  },
  systemsTitle: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
  },
  systemsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  systemBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  systemText: {
    fontSize: 10,
    fontWeight: '600',
  },
  systemsMore: {
    fontSize: 10,
    fontWeight: '500',
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sourceText: {
    fontSize: 10,
    fontWeight: '500',
  },
  timestampText: {
    fontSize: 10,
    fontWeight: '500',
  },
  prioritySection: {
    borderRadius: 12,
    padding: 16,
  },
  priorityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  priorityTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  priorityList: {
    gap: 8,
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 8,
    padding: 12,
  },
  priorityRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityRankText: {
    fontSize: 12,
    fontWeight: '700',
  },
  priorityInfo: {
    flex: 1,
  },
  priorityInsightTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  priorityInsightDesc: {
    fontSize: 11,
    fontWeight: '400',
  },
  priorityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
});