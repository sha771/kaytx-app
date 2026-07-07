import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Crown, Sparkles, Activity, TrendingUp, CheckCircle, Clock, Users, FileText, Zap, Target, ShieldAlert, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

interface CAOMetrics {
  activeWorkflows: number;
  meetingsToday: number;
  documentsProcessed: number;
  administrativeEfficiency: number;
  timeSavedByAI: number;
  tasksCompleted: number;
  approvalTurnaround: string;
  employeeSupportRequests: number;
  executiveProductivityIndex: number;
  aiAutomationSavings: string;
}

interface CAOCommandCenterProps {
  metrics: CAOMetrics;
  trends: {
    workflows: string;
    meetings: string;
    documents: string;
    efficiency: string;
    timeSaved: string;
  };
}

export default function CAOCommandCenter({ metrics, trends }: CAOCommandCenterProps) {
  const { theme } = useTheme();

  const largeMetricCards = [
    {
      label: 'Active Workflows',
      value: metrics.activeWorkflows.toLocaleString(),
      change: trends.workflows,
      icon: Activity,
      color: '#3B82F6',
      subtitle: 'In progress',
      trend: 'up' as const
    },
    {
      label: 'Meetings Today',
      value: metrics.meetingsToday.toString(),
      change: trends.meetings,
      icon: Users,
      color: '#8B5CF6',
      subtitle: 'Scheduled',
      trend: 'up' as const
    },
    {
      label: 'Documents Processed',
      value: metrics.documentsProcessed.toLocaleString(),
      change: trends.documents,
      icon: FileText,
      color: '#06B6D4',
      subtitle: 'This month',
      trend: 'up' as const
    },
    {
      label: 'Administrative Efficiency',
      value: `${metrics.administrativeEfficiency}%`,
      change: trends.efficiency,
      icon: Zap,
      color: '#10B981',
      subtitle: 'Overall score',
      trend: 'up' as const
    },
    {
      label: 'Time Saved by AI',
      value: `${metrics.timeSavedByAI.toLocaleString()}h`,
      change: trends.timeSaved,
      icon: Clock,
      color: '#F59E0B',
      subtitle: 'This quarter',
      trend: 'up' as const
    },
    {
      label: 'Tasks Completed',
      value: metrics.tasksCompleted.toLocaleString(),
      change: '+12.5%',
      icon: CheckCircle,
      color: '#22C55E',
      subtitle: 'Today',
      trend: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={16} color="#10B981" />
      : <ArrowDownRight size={16} color="#EF4444" />;
  };

  const getHealthScore = () => {
    const scores = [
      metrics.administrativeEfficiency,
      metrics.executiveProductivityIndex,
      100 - (parseFloat(metrics.approvalTurnaround) / 10),
      95
    ];
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round(avg);
  };

  const healthScore = getHealthScore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Crown size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              CAO Command Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Administrative Operations Overview
            </Text>
          </View>
        </View>
        <View style={[styles.healthScoreBadge, { backgroundColor: healthScore >= 85 ? '#10B981' + '20' : healthScore >= 70 ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
          <Sparkles size={16} color={healthScore >= 85 ? '#10B981' : healthScore >= 70 ? '#F59E0B' : '#EF4444'} />
          <Text style={[styles.healthScoreText, { color: healthScore >= 85 ? '#10B981' : healthScore >= 70 ? '#F59E0B' : '#EF4444' }]}>
            {healthScore}% Health
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.metricsGrid}>
          {largeMetricCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <View key={index} style={[styles.metricCard, { borderColor: card.color + '30', borderWidth: 1 }]}>
                <View style={[styles.iconContainer, { backgroundColor: card.color + '15' }]}>
                  <Icon size={28} color={card.color} />
                </View>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  {card.label}
                </Text>
                <Text style={[styles.metricValue, { color: card.color }]}>
                  {card.value}
                </Text>
                <View style={styles.metricChangeRow}>
                  <View style={styles.trendIconWrapper}>
                    {getTrendIcon(card.trend)}
                  </View>
                  <Text style={[styles.changeText, { color: card.trend === 'up' ? '#10B981' : '#EF4444' }]}>
                    {card.change}
                  </Text>
                </View>
                <View style={[styles.progressIndicator, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: card.color,
                        width: card.trend === 'up' ? '75%' : '25%'
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
                  {card.subtitle}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.operationsOverview, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.operationsHeader}>
          <View style={styles.operationsHeaderLeft}>
            <ShieldAlert size={20} color="#8B5CF6" />
            <Text style={[styles.operationsTitle, { color: theme.colors.text }]}>
              Operations Intelligence
            </Text>
          </View>
          <View style={[styles.operationsBadge, { backgroundColor: healthScore >= 85 ? '#10B981' + '20' : healthScore >= 70 ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
            <CheckCircle size={16} color={healthScore >= 85 ? '#10B981' : healthScore >= 70 ? '#F59E0B' : '#EF4444'} />
            <Text style={[styles.operationsBadgeText, { color: healthScore >= 85 ? '#10B981' : healthScore >= 70 ? '#F59E0B' : '#EF4444' }]}>
              {healthScore >= 85 ? 'Optimal' : healthScore >= 70 ? 'Good' : 'Attention'}
            </Text>
          </View>
        </View>

        <View style={styles.operationsMetrics}>
          <View style={[styles.operationsMetric, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
            <View style={[styles.operationsMetricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Clock size={22} color="#3B82F6" />
            </View>
            <View style={styles.operationsMetricInfo}>
              <Text style={[styles.operationsMetricLabel, { color: theme.colors.textSecondary }]}>
                Approval Turnaround
              </Text>
              <Text style={[styles.operationsMetricValue, { color: theme.colors.text }]}>
                {metrics.approvalTurnaround}
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#3B82F6', width: '85%' }]} />
              </View>
            </View>
          </View>

          <View style={[styles.operationsMetric, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
            <View style={[styles.operationsMetricIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Target size={22} color="#10B981" />
            </View>
            <View style={styles.operationsMetricInfo}>
              <Text style={[styles.operationsMetricLabel, { color: theme.colors.textSecondary }]}>
                Executive Productivity
              </Text>
              <Text style={[styles.operationsMetricValue, { color: theme.colors.text }]}>
                {metrics.executiveProductivityIndex}%
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#10B981', width: `${metrics.executiveProductivityIndex}%` }]} />
              </View>
            </View>
          </View>

          <View style={[styles.operationsMetric, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
            <View style={[styles.operationsMetricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Users size={22} color="#F59E0B" />
            </View>
            <View style={styles.operationsMetricInfo}>
              <Text style={[styles.operationsMetricLabel, { color: theme.colors.textSecondary }]}>
                Support Requests
              </Text>
              <Text style={[styles.operationsMetricValue, { color: theme.colors.text }]}>
                {metrics.employeeSupportRequests}
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#F59E0B', width: '65%' }]} />
              </View>
            </View>
          </View>

          <View style={[styles.operationsMetric, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
            <View style={[styles.operationsMetricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <TrendingUp size={22} color="#8B5CF6" />
            </View>
            <View style={styles.operationsMetricInfo}>
              <Text style={[styles.operationsMetricLabel, { color: theme.colors.textSecondary }]}>
                AI Automation Savings
              </Text>
              <Text style={[styles.operationsMetricValue, { color: theme.colors.text }]}>
                {metrics.aiAutomationSavings}
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#8B5CF6', width: '92%' }]} />
              </View>
            </View>
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
  healthScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  healthScoreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scrollContent: {
    gap: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricCard: {
    width: 160,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  metricChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  trendIconWrapper: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressIndicator: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  metricSubtitle: {
    fontSize: 10,
  },
  operationsOverview: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  operationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  operationsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  operationsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  operationsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  operationsBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  operationsMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  operationsMetric: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  operationsMetricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  operationsMetricInfo: {
    flex: 1,
  },
  operationsMetricLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  operationsMetricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  miniProgress: {
    height: 3,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
});