import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, Users, CheckCircle, Clock, TrendingUp, ArrowDown, Send, Award, ArrowUpRight, ArrowDownRight, Filter, Target, Sparkles, Zap } from 'lucide-react-native';

interface RecruitmentMetrics {
  openPositions: number;
  applicationsReceived: number;
  qualifiedCandidates: number;
  interviewsScheduled: number;
  offersExtended: number;
  hiresCompleted: number;
  timeToHire: number;
  costPerHire: string;
  offerAcceptanceRate: number;
}

interface RecruitmentFunnel {
  stage: string;
  count: number;
  conversionRate: number;
  color: string;
}

interface TalentAcquisitionHubProps {
  metrics: RecruitmentMetrics;
  funnel: RecruitmentFunnel[];
}

export default function TalentAcquisitionHub({ metrics, funnel }: TalentAcquisitionHubProps) {
  const { theme } = useTheme();

  const topMetrics = [
    {
      label: 'Open Positions',
      value: metrics.openPositions.toString(),
      icon: Briefcase,
      color: '#3B82F6',
      change: '+5',
      trend: 'up' as const
    },
    {
      label: 'Applications',
      value: metrics.applicationsReceived.toLocaleString(),
      icon: Users,
      color: '#10B981',
      change: '+23%',
      trend: 'up' as const
    },
    {
      label: 'Qualified Candidates',
      value: metrics.qualifiedCandidates.toLocaleString(),
      icon: CheckCircle,
      color: '#8B5CF6',
      change: '+18%',
      trend: 'up' as const
    },
    {
      label: 'Interviews Scheduled',
      value: metrics.interviewsScheduled.toLocaleString(),
      icon: Clock,
      color: '#F59E0B',
      change: '+12%',
      trend: 'up' as const
    }
  ];

  const bottomMetrics = [
    {
      label: 'Offers Extended',
      value: metrics.offersExtended.toString(),
      icon: Send,
      color: '#06B6D4',
      change: '+8%',
      trend: 'up' as const
    },
    {
      label: 'Hires Completed',
      value: metrics.hiresCompleted.toString(),
      icon: Award,
      color: '#10B981',
      change: '+15%',
      trend: 'up' as const
    },
    {
      label: 'Time to Hire',
      value: `${metrics.timeToHire} days`,
      icon: Clock,
      color: '#EF4444',
      change: '-5 days',
      trend: 'down' as const
    },
    {
      label: 'Cost per Hire',
      value: metrics.costPerHire,
      icon: TrendingUp,
      color: '#8B5CF6',
      change: '-8%',
      trend: 'down' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={14} color="#10B981" />
      : <ArrowDownRight size={14} color="#EF4444" />;
  };

  const getOverallConversionRate = () => {
    const hired = funnel.find(f => f.stage === 'Hired')?.count || 0;
    const applicants = funnel[0]?.count || 1;
    return Math.round((hired / applicants) * 100);
  };

  const overallConversion = getOverallConversionRate();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#3B82F6' + '20' }]}>
          <Briefcase size={24} color="#3B82F6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Talent Acquisition Hub
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Recruitment Pipeline Intelligence
          </Text>
        </View>
        <View style={[styles.conversionBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Zap size={16} color="#10B981" />
          <Text style={[styles.conversionText, { color: '#10B981' }]}>
            {overallConversion}% Overall
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.metricsRow}>
          {topMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <View key={index} style={[styles.metricCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: metric.color + '30', borderWidth: 1 }]}>
                <View style={[styles.iconContainer, { backgroundColor: metric.color + '15' }]}>
                  <Icon size={22} color={metric.color} />
                </View>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  {metric.label}
                </Text>
                <Text style={[styles.metricValue, { color: metric.color }]}>
                  {metric.value}
                </Text>
                <View style={styles.metricChange}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.changeText, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.funnelSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.funnelHeader}>
          <View style={styles.funnelHeaderLeft}>
            <Filter size={20} color="#8B5CF6" />
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recruitment Funnel
            </Text>
          </View>
          <View style={[styles.funnelBadge, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Text style={[styles.funnelBadgeText, { color: '#8B5CF6' }]}>
              {funnel.length} Stages
            </Text>
          </View>
        </View>
        
        <View style={styles.funnelContainer}>
          {funnel.map((stage, index) => (
            <View key={stage.stage} style={styles.funnelStage}>
              <View style={styles.stageHeader}>
                <View style={[styles.stageDot, { backgroundColor: stage.color }]} />
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  {stage.stage}
                </Text>
                <Text style={[styles.stageCount, { color: stage.color }]}>
                  {stage.count.toLocaleString()}
                </Text>
              </View>
              
              <View style={[styles.funnelBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.funnelFill, 
                    { 
                      backgroundColor: stage.color,
                      width: `${stage.conversionRate}%`,
                      shadowColor: stage.color,
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.stageFooter}>
                <Text style={[styles.conversionRate, { color: theme.colors.textSecondary }]}>
                  {stage.conversionRate}% conversion
                </Text>
                <View style={[styles.stageArrow, { backgroundColor: stage.color + '20' }]}>
                  <ArrowDown size={12} color={stage.color} />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.funnelInsights, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
          <View style={styles.insightItem}>
            <Target size={14} color="#10B981" />
            <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
              Top of funnel conversion improved by 12% this month
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Sparkles size={14} color="#8B5CF6" />
            <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
              AI screening reduced time-to-interview by 35%
            </Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.metricsRow}>
          {bottomMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <View key={index} style={[styles.metricCard, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: metric.color + '30', borderWidth: 1 }]}>
                <View style={[styles.iconContainer, { backgroundColor: metric.color + '15' }]}>
                  <Icon size={22} color={metric.color} />
                </View>
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  {metric.label}
                </Text>
                <Text style={[styles.metricValue, { color: metric.color }]}>
                  {metric.value}
                </Text>
                <View style={styles.metricChange}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.changeText, { color: metric.trend === 'up' ? '#10B981' : '#EF4444' }]}>
                    {metric.change}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.offerAcceptanceSection, { backgroundColor: 'rgba(16, 185, 129, 0.08)', borderColor: '#10B981' + '30', borderWidth: 1 }]}>
        <View style={styles.offerAcceptanceCard}>
          <View style={styles.offerHeader}>
            <View style={[styles.offerIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Award size={20} color="#10B981" />
            </View>
            <View style={styles.offerHeaderInfo}>
              <Text style={[styles.offerLabel, { color: theme.colors.textSecondary }]}>
                Offer Acceptance Rate
              </Text>
              <Text style={[styles.offerSubtitle, { color: theme.colors.textSecondary }]}>
                Industry benchmark: 82%
              </Text>
            </View>
          </View>
          <Text style={[styles.offerValue, { color: '#10B981' }]}>
            {metrics.offerAcceptanceRate}%
          </Text>
          <View style={[styles.offerBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <View 
              style={[
                styles.offerFill, 
                { 
                  backgroundColor: '#10B981',
                  width: `${metrics.offerAcceptanceRate}%`,
                  shadowColor: '#10B981',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                }
              ]} 
            />
          </View>
          <View style={styles.offerComparison}>
            <Text style={[styles.comparisonText, { color: theme.colors.textSecondary }]}>
              {metrics.offerAcceptanceRate > 82 ? '+' : ''}{metrics.offerAcceptanceRate - 82}% vs benchmark
            </Text>
          </View>
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
  conversionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  conversionText: {
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 20,
  },
  metricCard: {
    width: 160,
    padding: 16,
    borderRadius: 14,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.7,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 10,
  },
  metricChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  funnelSection: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },
  funnelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  funnelHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  funnelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  funnelBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  funnelContainer: {
    gap: 14,
  },
  funnelStage: {
    marginBottom: 4,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  stageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stageName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  stageCount: {
    fontSize: 14,
    fontWeight: '700',
  },
  funnelBar: {
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
  },
  funnelFill: {
    height: '100%',
    borderRadius: 8,
  },
  stageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversionRate: {
    fontSize: 11,
    opacity: 0.7,
  },
  stageArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  funnelInsights: {
    flexDirection: 'row',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginTop: 16,
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
  offerAcceptanceSection: {
    padding: 18,
    borderRadius: 16,
  },
  offerAcceptanceCard: {
    padding: 8,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  offerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerHeaderInfo: {
    flex: 1,
  },
  offerLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  offerSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  offerValue: {
    fontSize: 42,
    fontWeight: '800',
    marginBottom: 14,
  },
  offerBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 12,
  },
  offerFill: {
    height: '100%',
    borderRadius: 5,
  },
  offerComparison: {
    alignItems: 'center',
  },
  comparisonText: {
    fontSize: 12,
    fontWeight: '600',
  },
});