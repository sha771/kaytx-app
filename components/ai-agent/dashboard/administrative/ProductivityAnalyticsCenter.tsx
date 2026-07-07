import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Users, Target, Clock, Zap, BarChart3, Activity, Sparkles, ArrowUpRight, ArrowDownRight, Award, Flame, Brain } from 'lucide-react-native';

interface DepartmentProductivity {
  name: string;
  productivity: number;
  efficiency: number;
  timeSavings: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface ProductivityMetrics {
  teamProductivity: number;
  administrativeLoad: number;
  workflowEfficiency: number;
  timeSavings: number;
  resourceAllocation: number;
  employeeSatisfaction: number;
  taskCompletionRate: number;
  collaborationScore: number;
}

interface ProductivityAnalyticsCenterProps {
  metrics: ProductivityMetrics;
  departments: DepartmentProductivity[];
}

export default function ProductivityAnalyticsCenter({ metrics, departments }: ProductivityAnalyticsCenterProps) {
  const { theme } = useTheme();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUpRight size={12} color="#10B981" />;
      case 'down': return <ArrowDownRight size={12} color="#EF4444" />;
      default: return <Activity size={12} color="#6B7280" />;
    }
  };

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return '#10B981';
    if (productivity >= 75) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.headerIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <TrendingUp size={24} color="#8B5CF6" />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
              Organizational Productivity Analytics
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
              Enterprise performance insights
            </Text>
          </View>
        </View>
        <View style={[styles.productivityBadge, { backgroundColor: '#10B981' + '20' }]}>
          <Sparkles size={16} color="#10B981" />
          <Text style={[styles.productivityBadgeText, { color: '#10B981' }]}>
            {metrics.teamProductivity}% Productive
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#3B82F6' + '20' }]}>
            <Users size={20} color="#3B82F6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Team Productivity
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.teamProductivity}%
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +7.2%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#10B981' + '20' }]}>
            <Zap size={20} color="#10B981" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Workflow Efficiency
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.workflowEfficiency}%
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +12.5%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Clock size={20} color="#F59E0B" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Time Savings
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.timeSavings}h
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +18.3%
            </Text>
          </View>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30' }]}>
          <View style={[styles.metricIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
            <Target size={20} color="#8B5CF6" />
          </View>
          <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
            Resource Allocation
          </Text>
          <Text style={[styles.metricValue, { color: theme.colors.text }]}>
            {metrics.resourceAllocation}%
          </Text>
          <View style={styles.metricTrend}>
            <ArrowUpRight size={12} color="#10B981" />
            <Text style={[styles.trendText, { color: '#10B981' }]}>
              +5.8%
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.departmentsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.departmentsHeader}>
          <BarChart3 size={20} color="#8B5CF6" />
          <Text style={[styles.departmentsTitle, { color: theme.colors.text }]}>
            Department Performance
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.departmentsScroll}>
          {departments.map((dept, index) => (
            <View key={index} style={[styles.deptCard, { borderColor: dept.color + '30', borderWidth: 1 }]}>
              <View style={styles.deptHeader}>
                <View style={[styles.deptIcon, { backgroundColor: dept.color + '20' }]}>
                  <Users size={20} color={dept.color} />
                </View>
                {getTrendIcon(dept.trend)}
              </View>

              <Text style={[styles.deptName, { color: theme.colors.text }]}>
                {dept.name}
              </Text>

              <View style={styles.deptMetrics}>
                <View style={styles.deptMetric}>
                  <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>
                    Productivity
                  </Text>
                  <Text style={[styles.deptMetricValue, { color: getProductivityColor(dept.productivity) }]}>
                    {dept.productivity}%
                  </Text>
                </View>

                <View style={styles.deptMetric}>
                  <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>
                    Efficiency
                  </Text>
                  <Text style={[styles.deptMetricValue, { color: theme.colors.text }]}>
                    {dept.efficiency}%
                  </Text>
                </View>

                <View style={styles.deptMetric}>
                  <Text style={[styles.deptMetricLabel, { color: theme.colors.textSecondary }]}>
                    Time Saved
                  </Text>
                  <Text style={[styles.deptMetricValue, { color: '#10B981' }]}>
                    {dept.timeSavings}
                  </Text>
                </View>
              </View>

              <View style={[styles.deptProgress, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.deptProgressFill, 
                    { 
                      backgroundColor: getProductivityColor(dept.productivity),
                      width: `${dept.productivity}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.insightsSection}>
        <View style={styles.insightsHeader}>
          <Brain size={20} color="#8B5CF6" />
          <Text style={[styles.insightsTitle, { color: theme.colors.text }]}>
            Productivity Insights
          </Text>
        </View>

        <View style={styles.insightsGrid}>
          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#3B82F6' + '20' }]}>
              <Award size={16} color="#3B82F6" />
            </View>
            <View style={styles.insightInfo}>
              <Text style={[styles.insightLabel, { color: theme.colors.textSecondary }]}>
                Task Completion
              </Text>
              <Text style={[styles.insightValue, { color: theme.colors.text }]}>
                {metrics.taskCompletionRate}%
              </Text>
            </View>
            <View style={[styles.insightProgress, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
              <View style={[styles.insightProgressFill, { backgroundColor: '#3B82F6', width: `${metrics.taskCompletionRate}%` }]} />
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#10B981' + '20' }]}>
              <Flame size={16} color="#10B981" />
            </View>
            <View style={styles.insightInfo}>
              <Text style={[styles.insightLabel, { color: theme.colors.textSecondary }]}>
                Employee Satisfaction
              </Text>
              <Text style={[styles.insightValue, { color: theme.colors.text }]}>
                {metrics.employeeSatisfaction}%
              </Text>
            </View>
            <View style={[styles.insightProgress, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <View style={[styles.insightProgressFill, { backgroundColor: '#10B981', width: `${metrics.employeeSatisfaction}%` }]} />
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#8B5CF6' + '20' }]}>
              <Activity size={16} color="#8B5CF6" />
            </View>
            <View style={styles.insightInfo}>
              <Text style={[styles.insightLabel, { color: theme.colors.textSecondary }]}>
                Collaboration Score
              </Text>
              <Text style={[styles.insightValue, { color: theme.colors.text }]}>
                {metrics.collaborationScore}%
              </Text>
            </View>
            <View style={[styles.insightProgress, { backgroundColor: 'rgba(139, 92, 246, 0.2)' }]}>
              <View style={[styles.insightProgressFill, { backgroundColor: '#8B5CF6', width: `${metrics.collaborationScore}%` }]} />
            </View>
          </View>

          <View style={styles.insightCard}>
            <View style={[styles.insightIcon, { backgroundColor: '#F59E0B' + '20' }]}>
              <Target size={16} color="#F59E0B" />
            </View>
            <View style={styles.insightInfo}>
              <Text style={[styles.insightLabel, { color: theme.colors.textSecondary }]}>
                Administrative Load
              </Text>
              <Text style={[styles.insightValue, { color: theme.colors.text }]}>
                {metrics.administrativeLoad}%
              </Text>
            </View>
            <View style={[styles.insightProgress, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
              <View style={[styles.insightProgressFill, { backgroundColor: '#F59E0B', width: `${metrics.administrativeLoad}%` }]} />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.recommendationsSection, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }]}>
        <View style={styles.recommendationsHeader}>
          <Sparkles size={20} color="#8B5CF6" />
          <Text style={[styles.recommendationsTitle, { color: theme.colors.text }]}>
            AI Recommendations
          </Text>
        </View>
        <View style={styles.recommendationsList}>
          <View style={styles.recommendationItem}>
            <TrendingUp size={14} color="#10B981" />
            <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>
              Marketing team shows 18% productivity increase with new automation
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Target size={14} color="#F59E0B" />
            <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>
              Consider reallocating resources from HR to Operations
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Zap size={14} color="#3B82F6" />
            <Text style={[styles.recommendationText, { color: theme.colors.textSecondary }]}>
              Workflow automation could save additional 42 hours/week
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
  productivityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  productivityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    minWidth: 140,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
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
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
  departmentsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  departmentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  departmentsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  departmentsScroll: {
    gap: 12,
  },
  deptCard: {
    width: 180,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  deptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  deptIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deptName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  deptMetrics: {
    gap: 8,
    marginBottom: 12,
  },
  deptMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deptMetricLabel: {
    fontSize: 10,
  },
  deptMetricValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  deptProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  deptProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  insightsSection: {
    marginBottom: 16,
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  insightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  insightCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 8,
    padding: 12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  insightInfo: {
    marginBottom: 8,
  },
  insightLabel: {
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  insightProgress: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  insightProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  recommendationsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  recommendationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  recommendationsTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  recommendationsList: {
    gap: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recommendationText: {
    fontSize: 12,
    flex: 1,
  },
});
