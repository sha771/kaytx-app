import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Briefcase, FlaskConical, TrendingUp, FileText, DollarSign, Zap, Activity, Award } from 'lucide-react-native';

export default function ChiefInnovationOfficerCenter() {
  const { theme } = useTheme();

  const innovationMetrics = [
    {
      id: 'active-programs',
      label: 'Active Research Programs',
      value: '248',
      change: '+12',
      trend: 'up',
      icon: Briefcase,
      color: '#0B8AFF'
    },
    {
      id: 'experiments-running',
      label: 'Experiments Running',
      value: '4,281',
      change: '+156',
      trend: 'up',
      icon: FlaskConical,
      color: '#8B5CF6'
    },
    {
      id: 'innovation-score',
      label: 'Innovation Score',
      value: '94%',
      change: '+2.1%',
      trend: 'up',
      icon: Award,
      color: '#10B981'
    },
    {
      id: 'patent-opportunities',
      label: 'Patent Opportunities',
      value: '128',
      change: '+18',
      trend: 'up',
      icon: FileText,
      color: '#F59E0B'
    },
    {
      id: 'pipeline-value',
      label: 'Discovery Pipeline Value',
      value: '$184M',
      change: '+$12M',
      trend: 'up',
      icon: DollarSign,
      color: '#06B6D4'
    }
  ];

  const researchProgress = [
    { period: 'Jan', value: 65 },
    { period: 'Feb', value: 72 },
    { period: 'Mar', value: 78 },
    { period: 'Apr', value: 81 },
    { period: 'May', value: 85 },
    { period: 'Jun', value: 89 },
    { period: 'Jul', value: 92 },
    { period: 'Aug', value: 94 }
  ];

  const discoveryAnalytics = [
    { category: 'Fundamental Research', value: 32, color: '#0B8AFF' },
    { category: 'Applied Research', value: 28, color: '#8B5CF6' },
    { category: 'Product Innovation', value: 24, color: '#10B981' },
    { category: 'Technology Exploration', value: 16, color: '#F59E0B' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Award size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Chief Innovation Officer Command Center
          </Text>
        </View>
      </View>

      {/* Innovation KPI Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll}>
        {innovationMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <View 
              key={metric.id}
              style={[
                styles.kpiCard,
                { 
                  backgroundColor: metric.color + '15',
                  borderColor: metric.color + '30'
                }
              ]}
            >
              <View style={[styles.iconContainer, { backgroundColor: metric.color + '25' }]}>
                <Icon size={24} color={metric.color} />
              </View>
              <Text style={[styles.kpiLabel, { color: theme.colors.textSecondary }]}>
                {metric.label}
              </Text>
              <Text style={[styles.kpiValue, { color: theme.colors.text }]}>
                {metric.value}
              </Text>
              <View style={styles.kpiChange}>
                <Activity size={12} color="#22C55E" />
                <Text style={[styles.kpiChangeText, { color: '#22C55E' }]}>
                  {metric.change}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Research Progress Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Research Progress Trends
        </Text>
        <View style={styles.chartContainer}>
          {researchProgress.map((item, index) => (
            <View key={index} style={styles.chartBar}>
              <View 
                style={[
                  styles.barFill,
                  { 
                    height: `${item.value}%`,
                    backgroundColor: index === researchProgress.length - 1 ? '#0B8AFF' : '#0B8AFF' + '60'
                  }
                ]} 
              />
              <Text style={[styles.barLabel, { color: theme.colors.textSecondary }]}>
                {item.period}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Discovery Analytics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Discovery Analytics
        </Text>
        <View style={styles.analyticsGrid}>
          {discoveryAnalytics.map((item) => (
            <View key={item.category} style={styles.analyticsItem}>
              <View style={styles.analyticsHeader}>
                <View style={[styles.analyticsDot, { backgroundColor: item.color }]} />
                <Text style={[styles.analyticsLabel, { color: theme.colors.textSecondary }]}>
                  {item.category}
                </Text>
              </View>
              <Text style={[styles.analyticsValue, { color: theme.colors.text }]}>
                {item.value}%
              </Text>
              <View style={[styles.analyticsBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.analyticsBarFill,
                    { 
                      backgroundColor: item.color,
                      width: `${item.value}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Strategic R&D Performance */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Strategic R&D Performance
        </Text>
        <View style={styles.performanceGrid}>
          <View style={[styles.performanceCard, { backgroundColor: theme.colors.background }]}>
            <Zap size={20} color="#F59E0B" />
            <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
              Research Velocity
            </Text>
            <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
              2.4x
            </Text>
            <Text style={[styles.performanceTrend, { color: '#22C55E' }]}>
              +0.3x vs last quarter
            </Text>
          </View>

          <View style={[styles.performanceCard, { backgroundColor: theme.colors.background }]}>
            <TrendingUp size={20} color="#10B981" />
            <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
              Breakthrough Rate
            </Text>
            <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
              18.7%
            </Text>
            <Text style={[styles.performanceTrend, { color: '#22C55E' }]}>
              +2.4% improvement
            </Text>
          </View>

          <View style={[styles.performanceCard, { backgroundColor: theme.colors.background }]}>
            <Award size={20} color="#8B5CF6" />
            <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
              Innovation ROI
            </Text>
            <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
              312%
            </Text>
            <Text style={[styles.performanceTrend, { color: '#22C55E' }]}>
              +24% YoY growth
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  kpiScroll: {
    marginBottom: 20,
  },
  kpiCard: {
    width: 160,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  kpiChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  kpiChangeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  barFill: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 10,
    marginTop: 8,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  analyticsItem: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 16,
  },
  analyticsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  analyticsDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  analyticsLabel: {
    fontSize: 12,
  },
  analyticsValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  analyticsBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  analyticsBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  performanceCard: {
    width: '31%',
    marginRight: '2%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  performanceLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  performanceTrend: {
    fontSize: 11,
  },
});