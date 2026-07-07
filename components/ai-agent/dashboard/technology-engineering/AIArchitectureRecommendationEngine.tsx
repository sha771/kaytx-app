import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Brain, Zap, Shield, TrendingUp, AlertTriangle, CheckCircle, Lightbulb, Target, ArrowRight, Sparkles } from 'lucide-react-native';

interface Recommendation {
  id: string;
  type: 'performance' | 'security' | 'cost' | 'scalability' | 'reliability';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  estimatedBenefit: string;
  status: 'pending' | 'in_progress' | 'implemented';
}

interface AIArchitectureRecommendationEngineProps {
  recommendations: Recommendation[];
}

export default function AIArchitectureRecommendationEngine({ recommendations }: AIArchitectureRecommendationEngineProps) {
  const { theme } = useTheme();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return Zap;
      case 'security': return Shield;
      case 'cost': return TrendingUp;
      case 'scalability': return Target;
      case 'reliability': return CheckCircle;
      default: return Lightbulb;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return '#8B5CF6';
      case 'security': return '#EF4444';
      case 'cost': return '#10B981';
      case 'scalability': return '#3B82F6';
      case 'reliability': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#3B82F6';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#6B7280';
      case 'in_progress': return '#3B82F6';
      case 'implemented': return '#10B981';
      default: return '#6B7280';
    }
  };

  const recommendationStats = [
    { label: 'Total Recommendations', value: recommendations.length, icon: Brain, color: '#8B5CF6' },
    { label: 'Critical Priority', value: recommendations.filter(r => r.priority === 'critical').length, icon: AlertTriangle, color: '#EF4444' },
    { label: 'Implemented', value: recommendations.filter(r => r.status === 'implemented').length, icon: CheckCircle, color: '#10B981' },
    { label: 'In Progress', value: recommendations.filter(r => r.status === 'in_progress').length, icon: Zap, color: '#3B82F6' },
  ];

  const priorityDistribution = [
    { label: 'Critical', count: recommendations.filter(r => r.priority === 'critical').length, color: '#EF4444' },
    { label: 'High', count: recommendations.filter(r => r.priority === 'high').length, color: '#F59E0B' },
    { label: 'Medium', count: recommendations.filter(r => r.priority === 'medium').length, color: '#3B82F6' },
    { label: 'Low', count: recommendations.filter(r => r.priority === 'low').length, color: '#10B981' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Brain size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              AI Architecture Recommendation Engine
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Intelligent System Optimization
            </Text>
          </View>
        </View>
        <View style={[styles.aiBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
          <Sparkles size={14} color="#8B5CF6" />
          <Text style={[styles.aiBadgeText, { color: '#8B5CF6' }]}>AI Powered</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.statsRow}>
          {recommendationStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Icon size={20} color={stat.color} />
                </View>
                <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                  {stat.label}
                </Text>
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {stat.value}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.prioritySection}>
        <Text style={[styles.priorityTitle, { color: theme.colors.text }]}>
          Priority Distribution
        </Text>
        <View style={styles.priorityBars}>
          {priorityDistribution.map((item) => (
            <View key={item.label} style={styles.priorityItem}>
              <View style={styles.priorityInfo}>
                <Text style={[styles.priorityLabel, { color: theme.colors.textSecondary }]}>
                  {item.label}
                </Text>
                <Text style={[styles.priorityCount, { color: theme.colors.text }]}>
                  {item.count}
                </Text>
              </View>
              <View style={[styles.priorityBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <View 
                  style={[
                    styles.priorityFill, 
                    { 
                      backgroundColor: item.color, 
                      width: `${(item.count / recommendations.length) * 100}%` 
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.recommendationsSection}>
        <View style={styles.recommendationsHeader}>
          <Text style={[styles.recommendationsTitle, { color: theme.colors.text }]}>
            Active Recommendations
          </Text>
          <View style={styles.typeFilter}>
            <View style={styles.filterItem}>
              <View style={[styles.filterDot, { backgroundColor: '#8B5CF6' }]} />
              <Text style={[styles.filterText, { color: theme.colors.textSecondary }]}>Performance</Text>
            </View>
            <View style={styles.filterItem}>
              <View style={[styles.filterDot, { backgroundColor: '#EF4444' }]} />
              <Text style={[styles.filterText, { color: theme.colors.textSecondary }]}>Security</Text>
            </View>
            <View style={styles.filterItem}>
              <View style={[styles.filterDot, { backgroundColor: '#10B981' }]} />
              <Text style={[styles.filterText, { color: theme.colors.textSecondary }]}>Cost</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.recommendationsScroll} showsVerticalScrollIndicator={false}>
          {recommendations.map((recommendation) => {
            const TypeIcon = getTypeIcon(recommendation.type);
            const typeColor = getTypeColor(recommendation.type);
            const priorityColor = getPriorityColor(recommendation.priority);
            const effortColor = getEffortColor(recommendation.effort);
            const statusColor = getStatusColor(recommendation.status);
            
            return (
              <View key={recommendation.id} style={[styles.recommendationCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderLeftColor: priorityColor }]}>
                <View style={styles.recommendationHeader}>
                  <View style={styles.recommendationLeft}>
                    <View style={[styles.typeIcon, { backgroundColor: typeColor + '20' }]}>
                      <TypeIcon size={18} color={typeColor} />
                    </View>
                    <View style={styles.recommendationInfo}>
                      <Text style={[styles.recommendationTitle, { color: theme.colors.text }]}>
                        {recommendation.title}
                      </Text>
                      <Text style={[styles.recommendationType, { color: typeColor }]}>
                        {recommendation.type.charAt(0).toUpperCase() + recommendation.type.slice(1)}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.priorityBadge, { backgroundColor: priorityColor + '20' }]}>
                    <Text style={[styles.priorityText, { color: priorityColor }]}>
                      {recommendation.priority.toUpperCase()}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.recommendationDescription, { color: theme.colors.textSecondary }]}>
                  {recommendation.description}
                </Text>

                <View style={styles.recommendationMeta}>
                  <View style={styles.metaItem}>
                    <Target size={14} color="#3B82F6" />
                    <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>Impact</Text>
                    <Text style={[styles.metaValue, { color: theme.colors.text }]}>{recommendation.impact}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Zap size={14} color={effortColor} />
                    <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>Effort</Text>
                    <Text style={[styles.metaValue, { color: effortColor }]}>{recommendation.effort}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <TrendingUp size={14} color="#10B981" />
                    <Text style={[styles.metaLabel, { color: theme.colors.textSecondary }]}>Benefit</Text>
                    <Text style={[styles.metaValue, { color: '#10B981' }]}>{recommendation.estimatedBenefit}</Text>
                  </View>
                </View>

                <View style={styles.recommendationFooter}>
                  <View style={[styles.statusBadge, { backgroundColor: statusColor + '20' }]}>
                    <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
                    <Text style={[styles.statusText, { color: statusColor }]}>
                      {recommendation.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                  {recommendation.status === 'pending' && (
                    <View style={styles.actionButton}>
                      <Text style={[styles.actionButtonText, { color: '#3B82F6' }]}>
                        Implement
                      </Text>
                      <ArrowRight size={14} color="#3B82F6" />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.insightsSection}>
        <Text style={[styles.insightsTitle, { color: theme.colors.text }]}>
          AI Insights
        </Text>
        <View style={styles.insightsList}>
          <View style={styles.insightItem}>
            <View style={[styles.insightIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Lightbulb size={16} color="#10B981" />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightText, { color: theme.colors.text }]}>
                Implementing critical recommendations could improve system performance by 34%
              </Text>
              <Text style={[styles.insightSubtext, { color: theme.colors.textSecondary }]}>
                Based on analysis of 1,248 system metrics
              </Text>
            </View>
          </View>
          <View style={styles.insightItem}>
            <View style={[styles.insightIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <AlertTriangle size={16} color="#F59E0B" />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightText, { color: theme.colors.text }]}>
                3 high-priority security recommendations require immediate attention
              </Text>
              <Text style={[styles.insightSubtext, { color: theme.colors.textSecondary }]}>
                Potential vulnerabilities detected in authentication layer
              </Text>
            </View>
          </View>
          <View style={styles.insightItem}>
            <View style={[styles.insightIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Brain size={16} color="#8B5CF6" />
            </View>
            <View style={styles.insightContent}>
              <Text style={[styles.insightText, { color: theme.colors.text }]}>
                Cost optimization opportunities identified: $28K monthly savings potential
              </Text>
              <Text style={[styles.insightSubtext, { color: theme.colors.textSecondary }]}>
                Through resource right-sizing and reserved instances
              </Text>
            </View>
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
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  aiBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: 120,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderLeftWidth: 3,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  prioritySection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginBottom: 16,
  },
  priorityTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  priorityBars: {
    gap: 8,
  },
  priorityItem: {
    gap: 4,
  },
  priorityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityLabel: {
    fontSize: 11,
  },
  priorityCount: {
    fontSize: 11,
    fontWeight: '600',
  },
  priorityBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  priorityFill: {
    height: '100%',
    borderRadius: 3,
  },
  recommendationsSection: {
    marginBottom: 16,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  typeFilter: {
    flexDirection: 'row',
    gap: 12,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  filterDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  filterText: {
    fontSize: 11,
  },
  recommendationsScroll: {
    maxHeight: 500,
  },
  recommendationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recommendationLeft: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  typeIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  recommendationType: {
    fontSize: 11,
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  recommendationDescription: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    opacity: 0.8,
  },
  recommendationMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaLabel: {
    fontSize: 10,
  },
  metaValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  recommendationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 11,
    fontWeight: '600',
  },
  insightsSection: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  insightsList: {
    gap: 12,
  },
  insightItem: {
    flexDirection: 'row',
    gap: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  insightContent: {
    flex: 1,
  },
  insightText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 2,
  },
  insightSubtext: {
    fontSize: 11,
    opacity: 0.7,
  },
});