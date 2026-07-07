import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { DollarSign, TrendingUp, PieChart, BarChart3, Target, Zap } from 'lucide-react-native';

export default function CostEfficiency() {
  const { theme } = useTheme();

  const costMetrics = [
    { label: 'Logistics Costs', value: '$428M', change: '-$18M', trend: 'up' as const, color: '#3B82F6' },
    { label: 'Procurement Costs', value: '$1.2B', change: '-$42M', trend: 'up' as const, color: '#10B981' },
    { label: 'Inventory Carrying Cost', value: '$84M', change: '-$8M', trend: 'up' as const, color: '#06B6D4' },
    { label: 'Waste Reduction', value: '23%', change: '+4%', trend: 'up' as const, color: '#8B5CF6' },
    { label: 'Efficiency Gains', value: '$284M', change: '+$52M', trend: 'up' as const, color: '#F59E0B' },
  ];

  const costBreakdown = [
    { category: 'Transportation', amount: '$184M', percentage: 43, trend: 'down' as const, color: '#3B82F6' },
    { category: 'Warehousing', amount: '$92M', percentage: 21, trend: 'down' as const, color: '#10B981' },
    { category: 'Inventory Holding', amount: '$84M', percentage: 20, trend: 'down' as const, color: '#06B6D4' },
    { category: 'Procurement', amount: '$68M', percentage: 16, trend: 'down' as const, color: '#8B5CF6' },
  ];

  const optimizationOpportunities = [
    { area: 'Route Optimization', potential: '$12.4M', difficulty: 'medium' as const, timeline: '3 months', impact: 'high' as const },
    { area: 'Supplier Consolidation', potential: '$8.2M', difficulty: 'low' as const, timeline: '6 months', impact: 'medium' as const },
    { area: 'Warehouse Automation', potential: '$18.6M', difficulty: 'high' as const, timeline: '12 months', impact: 'high' as const },
    { area: 'Demand Forecasting AI', potential: '$14.8M', difficulty: 'medium' as const, timeline: '6 months', impact: 'high' as const },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↓';
      case 'down': return '↑';
      case 'stable': return '→';
      default: return '';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return '#3B82F6';
      case 'medium': return '#8B5CF6';
      case 'high': return '#10B981';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <DollarSign size={20} color="#3B82F6" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Cost & Efficiency Optimization
        </Text>
      </View>

      {/* Cost Metrics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
        {costMetrics.map((metric, index) => (
          <View 
            key={index}
            style={[styles.metricCard, { backgroundColor: 'rgba(59, 130, 246, 0.08)', borderColor: `${metric.color}30` }]}
          >
            <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
              {metric.label}
            </Text>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            <View style={styles.metricChange}>
              <Text style={[styles.changeText, { color: '#10B981' }]}>
                {metric.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Cost Breakdown */}
      <View style={styles.breakdownSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          Cost Breakdown
        </Text>
        <View style={styles.breakdownList}>
          {costBreakdown.map((item, index) => (
            <View 
              key={index}
              style={[styles.breakdownCard, { backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: `${item.color}30` }]}
            >
              <View style={styles.breakdownHeader}>
                <View style={styles.breakdownInfo}>
                  <View style={[styles.breakdownIcon, { backgroundColor: item.color + '20' }]}>
                    <PieChart size={16} color={item.color} />
                  </View>
                  <View>
                    <Text style={[styles.breakdownCategory, { color: theme.colors.text }]}>
                      {item.category}
                    </Text>
                    <Text style={[styles.breakdownAmount, { color: item.color }]}>
                      {item.amount}
                    </Text>
                  </View>
                </View>
                <View style={styles.breakdownPercentage}>
                  <Text style={[styles.percentageText, { color: item.color }]}>
                    {item.percentage}%
                  </Text>
                  <Text style={[styles.trendIcon, { color: '#10B981' }]}>
                    {getTrendIcon(item.trend)}
                  </Text>
                </View>
              </View>
              <View style={styles.breakdownBar}>
                <View 
                  style={[
                    styles.breakdownFill, 
                    { 
                      backgroundColor: item.color,
                      width: `${item.percentage}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Optimization Opportunities */}
      <View style={styles.opportunitiesSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}>
          AI-Identified Optimization Opportunities
        </Text>
        <View style={styles.opportunitiesList}>
          {optimizationOpportunities.map((opportunity, index) => (
            <View 
              key={index}
              style={[styles.opportunityCard, { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }]}
            >
              <View style={styles.opportunityHeader}>
                <View style={styles.opportunityInfo}>
                  <View style={styles.opportunityIconContainer}>
                    <Zap size={16} color="#F59E0B" />
                  </View>
                  <View>
                    <Text style={[styles.opportunityArea, { color: theme.colors.text }]}>
                      {opportunity.area}
                    </Text>
                    <Text style={[styles.opportunityPotential, { color: '#10B981' }]}>
                      Potential Savings: {opportunity.potential}
                    </Text>
                  </View>
                </View>
                <View style={[styles.impactBadge, { backgroundColor: getImpactColor(opportunity.impact) + '20' }]}>
                  <Text style={[styles.impactText, { color: getImpactColor(opportunity.impact) }]}>
                    {opportunity.impact.charAt(0).toUpperCase() + opportunity.impact.slice(1)} Impact
                  </Text>
                </View>
              </View>

              <View style={styles.opportunityMetrics}>
                <View style={styles.opportunityMetric}>
                  <Target size={12} color="#8B5CF6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Difficulty: {opportunity.difficulty.charAt(0).toUpperCase() + opportunity.difficulty.slice(1)}
                  </Text>
                </View>
                <View style={styles.opportunityMetric}>
                  <BarChart3 size={12} color="#06B6D4" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Timeline: {opportunity.timeline}
                  </Text>
                </View>
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
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  metricsScroll: {
    marginHorizontal: -8,
    marginBottom: 16,
  },
  metricCard: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    minWidth: 120,
    borderWidth: 1,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricChange: {
    marginTop: 4,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  breakdownSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  breakdownList: {
    gap: 8,
  },
  breakdownCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  breakdownInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breakdownIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownCategory: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  breakdownPercentage: {
    alignItems: 'flex-end',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '700',
  },
  trendIcon: {
    fontSize: 12,
    marginTop: 2,
  },
  breakdownBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
  },
  breakdownFill: {
    height: '100%',
    borderRadius: 3,
  },
  opportunitiesSection: {
    marginBottom: 8,
  },
  opportunitiesList: {
    gap: 8,
  },
  opportunityCard: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
  },
  opportunityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  opportunityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  opportunityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opportunityArea: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  opportunityPotential: {
    fontSize: 11,
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
  opportunityMetrics: {
    flexDirection: 'row',
    gap: 16,
  },
  opportunityMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontSize: 10,
  },
});