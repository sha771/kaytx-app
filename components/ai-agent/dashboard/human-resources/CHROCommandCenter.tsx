import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Heart, TrendingUp, Briefcase, Filter, Activity, CheckCircle, AlertCircle, ArrowUpRight, ArrowDownRight, Sparkles, Target, Crown, ShieldAlert } from 'lucide-react-native';

interface CHROMetrics {
  totalWorkforce: number;
  employeeEngagement: number;
  retentionRate: number;
  openRoles: number;
  hiringPipeline: number;
  headcountGrowth: number;
  attritionRisk: number;
  workforceProductivity: number;
}

interface CHROCommandCenterProps {
  metrics: CHROMetrics;
  trends: {
    engagement: string;
    retention: string;
    hiring: string;
    productivity: string;
  };
}

export default function CHROCommandCenter({ metrics, trends }: CHROCommandCenterProps) {
  const { theme } = useTheme();

  const largeMetricCards = [
    {
      label: 'Total Workforce',
      value: metrics.totalWorkforce.toLocaleString(),
      change: trends.hiring,
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Active employees',
      trend: 'up' as const
    },
    {
      label: 'Employee Engagement',
      value: `${metrics.employeeEngagement}%`,
      change: trends.engagement,
      icon: Heart,
      color: '#10B981',
      subtitle: 'Satisfaction score',
      trend: 'up' as const
    },
    {
      label: 'Retention Rate',
      value: `${metrics.retentionRate}%`,
      change: trends.retention,
      icon: TrendingUp,
      color: '#8B5CF6',
      subtitle: 'Year-to-date',
      trend: 'up' as const
    },
    {
      label: 'Open Roles',
      value: metrics.openRoles.toString(),
      change: '-12%',
      icon: Briefcase,
      color: '#F59E0B',
      subtitle: 'Active positions',
      trend: 'down' as const
    },
    {
      label: 'Hiring Pipeline',
      value: metrics.hiringPipeline.toLocaleString(),
      change: trends.hiring,
      icon: Filter,
      color: '#06B6D4',
      subtitle: 'Candidates in process',
      trend: 'up' as const
    },
    {
      label: 'Attrition Risk',
      value: `${metrics.attritionRisk}%`,
      change: '-5%',
      icon: AlertCircle,
      color: '#EF4444',
      subtitle: 'High-risk employees',
      trend: 'down' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={16} color="#10B981" />
      : <ArrowDownRight size={16} color="#EF4444" />;
  };

  const getHealthScore = () => {
    const scores = [
      metrics.employeeEngagement,
      metrics.retentionRate,
      metrics.workforceProductivity,
      100 - metrics.attritionRisk
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
              CHRO Command Center
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              People Operations Overview
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
                        width: card.trend === 'up' ? '80%' : '30%'
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

      <View style={[styles.healthOverview, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.healthHeader}>
          <View style={styles.healthHeaderLeft}>
            <ShieldAlert size={20} color="#8B5CF6" />
            <Text style={[styles.healthTitle, { color: theme.colors.text }]}>
              Workforce Intelligence
            </Text>
          </View>
          <View style={[styles.healthBadge, { backgroundColor: healthScore >= 85 ? '#10B981' + '20' : healthScore >= 70 ? '#F59E0B' + '20' : '#EF4444' + '20' }]}>
            <CheckCircle size={16} color={healthScore >= 85 ? '#10B981' : healthScore >= 70 ? '#F59E0B' : '#EF4444'} />
            <Text style={[styles.healthBadgeText, { color: healthScore >= 85 ? '#10B981' : healthScore >= 70 ? '#F59E0B' : '#EF4444' }]}>
              {healthScore >= 85 ? 'Optimal' : healthScore >= 70 ? 'Good' : 'Attention'}
            </Text>
          </View>
        </View>

        <View style={styles.healthMetrics}>
          <View style={[styles.healthMetric, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
            <View style={[styles.healthMetricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Users size={22} color="#3B82F6" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Headcount Growth
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                +{metrics.headcountGrowth}%
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#3B82F6', width: `${metrics.headcountGrowth}%` }]} />
              </View>
            </View>
          </View>

          <View style={[styles.healthMetric, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
            <View style={[styles.healthMetricIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Heart size={22} color="#10B981" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Engagement Trend
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                {trends.engagement}
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#10B981', width: '89%' }]} />
              </View>
            </View>
          </View>

          <View style={[styles.healthMetric, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
            <View style={[styles.healthMetricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <TrendingUp size={22} color="#8B5CF6" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Retention Trend
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                {trends.retention}
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#8B5CF6', width: '94%' }]} />
              </View>
            </View>
          </View>

          <View style={[styles.healthMetric, { backgroundColor: 'rgba(6, 182, 212, 0.1)', borderColor: '#06B6D4' + '30' }]}>
            <View style={[styles.healthMetricIcon, { backgroundColor: '#06B6D4' + '20' }]}>
              <Activity size={22} color="#06B6D4" />
            </View>
            <View style={styles.healthMetricInfo}>
              <Text style={[styles.healthMetricLabel, { color: theme.colors.textSecondary }]}>
                Productivity Score
              </Text>
              <Text style={[styles.healthMetricValue, { color: theme.colors.text }]}>
                {metrics.workforceProductivity}%
              </Text>
              <View style={[styles.miniProgress, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                <View style={[styles.miniProgressFill, { backgroundColor: '#06B6D4', width: `${metrics.workforceProductivity}%` }]} />
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.quickInsights, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
          <View style={styles.insightItem}>
            <Target size={14} color="#8B5CF6" />
            <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
              23 high-potential employees identified for succession
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Sparkles size={14} color="#10B981" />
            <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
              Engineering team showing 14% improved engagement
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  healthScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
  },
  healthScoreText: {
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  metricCard: {
    width: 190,
    padding: 18,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 10,
  },
  metricChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  trendIconWrapper: {
    width: 20,
    height: 20,
  },
  changeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressIndicator: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  metricSubtitle: {
    fontSize: 10,
    opacity: 0.6,
  },
  healthOverview: {
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  healthHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  healthTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  healthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 22,
  },
  healthBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  healthMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  healthMetric: {
    flex: 1,
    minWidth: 150,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  healthMetricIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthMetricInfo: {
    flex: 1,
  },
  healthMetricLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    opacity: 0.7,
  },
  healthMetricValue: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  miniProgress: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  quickInsights: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
  },
  insightItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  insightText: {
    fontSize: 11,
    opacity: 0.8,
    flex: 1,
  },
});