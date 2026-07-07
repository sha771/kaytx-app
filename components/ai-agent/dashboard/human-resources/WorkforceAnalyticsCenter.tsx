import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Users, Building2, Clock, Globe, PieChart, TrendingUp, ArrowUpRight, ArrowDownRight, Building, Sparkles, Target } from 'lucide-react-native';

interface DepartmentData {
  name: string;
  headcount: number;
  growth: number;
  color: string;
}

interface WorkforceMetrics {
  totalHeadcount: number;
  avgTenure: number;
  diversityScore: number;
  remotePercentage: number;
  genderDistribution: {
    male: number;
    female: number;
    nonBinary: number;
  };
  ageDistribution: {
    range: string;
    percentage: number;
  }[];
}

interface WorkforceAnalyticsCenterProps {
  departments: DepartmentData[];
  metrics: WorkforceMetrics;
}

export default function WorkforceAnalyticsCenter({ departments, metrics }: WorkforceAnalyticsCenterProps) {
  const { theme } = useTheme();

  const workforceMetrics = [
    {
      label: 'Total Headcount',
      value: metrics.totalHeadcount.toLocaleString(),
      icon: Users,
      color: '#3B82F6',
      subtitle: 'Active employees',
      trend: 'up' as const
    },
    {
      label: 'Average Tenure',
      value: `${metrics.avgTenure} years`,
      icon: Clock,
      color: '#10B981',
      subtitle: 'Years of service',
      trend: 'up' as const
    },
    {
      label: 'Diversity Score',
      value: `${metrics.diversityScore}%`,
      icon: Globe,
      color: '#8B5CF6',
      subtitle: 'Inclusion index',
      trend: 'up' as const
    },
    {
      label: 'Remote Workforce',
      value: `${metrics.remotePercentage}%`,
      icon: Building2,
      color: '#06B6D4',
      subtitle: 'Remote/hybrid',
      trend: 'up' as const
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' 
      ? <ArrowUpRight size={14} color="#10B981" />
      : <ArrowDownRight size={14} color="#EF4444" />;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={[styles.headerIcon, { backgroundColor: '#3B82F6' + '20' }]}>
          <PieChart size={24} color="#3B82F6" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Workforce Analytics Center
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Organizational Intelligence
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.metricsRow}>
          {workforceMetrics.map((metric, index) => {
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
                <View style={styles.metricFooter}>
                  {getTrendIcon(metric.trend)}
                  <Text style={[styles.metricSubtitle, { color: theme.colors.textSecondary }]}>
                    {metric.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Building size={20} color="#8B5CF6" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Headcount by Department
          </Text>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.departmentsRow}>
            {departments.map((dept, index) => (
              <View key={index} style={[styles.departmentCard, { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: dept.color + '30', borderWidth: 1 }]}>
                <View style={[styles.deptDot, { backgroundColor: dept.color }]} />
                <Text style={[styles.departmentName, { color: theme.colors.text }]}>
                  {dept.name}
                </Text>
                <Text style={[styles.departmentHeadcount, { color: dept.color }]}>
                  {dept.headcount.toLocaleString()}
                </Text>
                <View style={styles.growthBadge}>
                  {getTrendIcon(dept.growth >= 0 ? 'up' : 'down')}
                  <Text style={[styles.growthText, { color: dept.growth >= 0 ? '#10B981' : '#EF4444' }]}>
                    {dept.growth >= 0 ? '+' : ''}{dept.growth}%
                  </Text>
                </View>
                <View style={[styles.headcountBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <View 
                    style={[
                      styles.headcountFill, 
                      { 
                        backgroundColor: dept.color,
                        width: `${(dept.headcount / metrics.totalHeadcount) * 100}%`,
                        shadowColor: dept.color,
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Globe size={20} color="#EC4899" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Gender Distribution
          </Text>
        </View>
        
        <View style={styles.distributionGrid}>
          <View style={[styles.distributionCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: '#3B82F6' + '30', borderWidth: 1 }]}>
            <Text style={[styles.distributionLabel, { color: theme.colors.textSecondary }]}>
              Male
            </Text>
            <Text style={[styles.distributionValue, { color: '#3B82F6' }]}>
              {metrics.genderDistribution.male}%
            </Text>
            <View style={[styles.distributionBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <View 
                style={[
                  styles.distributionFill, 
                  { 
                    backgroundColor: '#3B82F6',
                    width: `${metrics.genderDistribution.male}%`,
                    shadowColor: '#3B82F6',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }
                ]} 
              />
            </View>
          </View>

          <View style={[styles.distributionCard, { backgroundColor: 'rgba(236, 72, 153, 0.1)', borderColor: '#EC4899' + '30', borderWidth: 1 }]}>
            <Text style={[styles.distributionLabel, { color: theme.colors.textSecondary }]}>
              Female
            </Text>
            <Text style={[styles.distributionValue, { color: '#EC4899' }]}>
              {metrics.genderDistribution.female}%
            </Text>
            <View style={[styles.distributionBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <View 
                style={[
                  styles.distributionFill, 
                  { 
                    backgroundColor: '#EC4899',
                    width: `${metrics.genderDistribution.female}%`,
                    shadowColor: '#EC4899',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }
                ]} 
              />
            </View>
          </View>

          <View style={[styles.distributionCard, { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: '#8B5CF6' + '30', borderWidth: 1 }]}>
            <Text style={[styles.distributionLabel, { color: theme.colors.textSecondary }]}>
              Non-Binary
            </Text>
            <Text style={[styles.distributionValue, { color: '#8B5CF6' }]}>
              {metrics.genderDistribution.nonBinary}%
            </Text>
            <View style={[styles.distributionBar, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
              <View 
                style={[
                  styles.distributionFill, 
                  { 
                    backgroundColor: '#8B5CF6',
                    width: `${metrics.genderDistribution.nonBinary}%`,
                    shadowColor: '#8B5CF6',
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.4,
                    shadowRadius: 8,
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1 }]}>
        <View style={styles.sectionHeader}>
          <Clock size={20} color="#06B6D4" />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Age Distribution
          </Text>
        </View>
        
        <View style={styles.ageDistribution}>
          {metrics.ageDistribution.map((age, index) => (
            <View key={index} style={styles.ageRow}>
              <View style={[styles.ageDot, { backgroundColor: '#06B6D4' }]} />
              <Text style={[styles.ageRange, { color: theme.colors.text }]}>
                {age.range}
              </Text>
              <View style={[styles.ageBar, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                <View 
                  style={[
                    styles.ageFill, 
                    { 
                      backgroundColor: '#06B6D4',
                      width: `${age.percentage}%`,
                      shadowColor: '#06B6D4',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.3,
                      shadowRadius: 6,
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.agePercentage, { color: '#06B6D4' }]}>
                {age.percentage}%
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.insightsRow, { backgroundColor: 'rgba(255,255,255,0.03)' }]}>
          <View style={styles.insightItem}>
            <Target size={14} color="#10B981" />
            <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
              Millennial workforce grew by 8% this quarter
            </Text>
          </View>
          <View style={styles.insightItem}>
            <Sparkles size={14} color="#8B5CF6" />
            <Text style={[styles.insightText, { color: theme.colors.textSecondary }]}>
              Gen Z talent pipeline increased by 15%
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
  metricFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metricSubtitle: {
    fontSize: 11,
    opacity: 0.7,
  },
  section: {
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  departmentsRow: {
    flexDirection: 'row',
    gap: 14,
  },
  departmentCard: {
    width: 140,
    padding: 16,
    borderRadius: 14,
  },
  deptDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  departmentName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  departmentHeadcount: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  growthText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headcountBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  headcountFill: {
    height: '100%',
    borderRadius: 4,
  },
  distributionGrid: {
    flexDirection: 'row',
    gap: 14,
  },
  distributionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
  },
  distributionLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    opacity: 0.7,
  },
  distributionValue: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
  },
  distributionBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 5,
  },
  ageDistribution: {
    gap: 12,
    marginBottom: 16,
  },
  ageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  ageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  ageRange: {
    width: 90,
    fontSize: 13,
    fontWeight: '600',
  },
  ageBar: {
    flex: 1,
    height: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  ageFill: {
    height: '100%',
    borderRadius: 8,
  },
  agePercentage: {
    width: 50,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  insightsRow: {
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