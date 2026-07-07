import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, AlertTriangle, TrendingUp, Zap, CheckCircle, Clock, ArrowRight } from 'lucide-react-native';

export default function AISupplyChainInsights() {
  const { theme } = useTheme();

  const aiInsights = [
    {
      id: 1,
      type: 'optimization' as const,
      priority: 'high' as const,
      title: 'Route Optimization Opportunity',
      description: 'Route optimization could reduce logistics cost by 12% across North American corridors.',
      impact: '$12.4M savings',
      timeline: '3 months',
      confidence: 94,
      actions: ['Implement AI route planning', 'Carrier renegotiation', 'Network rebalancing']
    },
    {
      id: 2,
      type: 'risk' as const,
      priority: 'high' as const,
      title: 'Supplier Lead Time Risk',
      description: 'Supplier lead times increasing in APAC region. 3 suppliers showing 15% delay pattern.',
      impact: '8% fulfillment risk',
      timeline: 'Immediate',
      confidence: 91,
      actions: ['Diversify supplier base', 'Increase safety stock', 'Activate backup suppliers']
    },
    {
      id: 3,
      type: 'efficiency' as const,
      priority: 'medium' as const,
      title: 'Inventory Imbalance Detected',
      description: 'Inventory imbalance detected across 3 distribution centers. 18% excess in DC#2, shortage in DC#4.',
      impact: '$4.2M carrying cost',
      timeline: '30 days',
      confidence: 88,
      actions: ['Initiate inventory transfer', 'Rebalance allocation rules', 'Adjust demand forecasting']
    },
    {
      id: 4,
      type: 'demand' as const,
      priority: 'high' as const,
      title: 'Q4 Seasonal Demand Surge',
      description: 'Demand surge predicted for Q4 seasonal SKUs. 24% increase expected in electronics category.',
      impact: '+$28M revenue opportunity',
      timeline: '90 days',
      confidence: 96,
      actions: ['Increase production capacity', 'Pre-position inventory', 'Secure additional logistics']
    },
    {
      id: 5,
      type: 'risk' as const,
      priority: 'medium' as const,
      title: 'Manufacturing Delay Risk',
      description: 'Manufacturing delay risk affecting downstream fulfillment. Component X-12 shortage expected.',
      impact: '15% production reduction',
      timeline: '14 days',
      confidence: 87,
      actions: ['Accelerate alternative sourcing', 'Reallocate production capacity', 'Customer communication']
    },
    {
      id: 6,
      type: 'cost' as const,
      priority: 'medium' as const,
      title: 'Procurement Cost Reduction',
      description: 'Contract consolidation opportunity identified. 12 suppliers with similar terms can be consolidated.',
      impact: '$8.6M savings',
      timeline: '6 months',
      confidence: 92,
      actions: ['Supplier consolidation analysis', 'Contract renegotiation', 'Transition planning']
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return '#10B981';
      case 'risk': return '#EF4444';
      case 'efficiency': return '#3B82F6';
      case 'demand': return '#8B5CF6';
      case 'cost': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return '#10B981';
    if (confidence >= 90) return '#3B82F6';
    if (confidence >= 85) return '#06B6D4';
    return '#F59E0B';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap size={16} color="#10B981" />;
      case 'risk': return <AlertTriangle size={16} color="#EF4444" />;
      case 'efficiency': return <TrendingUp size={16} color="#3B82F6" />;
      case 'demand': return <TrendingUp size={16} color="#8B5CF6" />;
      case 'cost': return <TrendingUp size={16} color="#F59E0B" />;
      default: return <Lightbulb size={16} color="#6B7280" />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <Lightbulb size={20} color="#F59E0B" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Supply Chain Insights
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.insightsScroll}
      >
        {aiInsights.map((insight) => (
          <View 
            key={insight.id}
            style={[
              styles.insightCard, 
              { 
                backgroundColor: `${getTypeColor(insight.type)}08`,
                borderColor: `${getTypeColor(insight.type)}30`,
                borderWidth: 1
              }
            ]}
          >
            {/* Insight Header */}
            <View style={styles.insightHeader}>
              <View style={styles.insightIconContainer}>
                {getTypeIcon(insight.type)}
              </View>
              <View style={styles.insightMeta}>
                <View style={[
                  styles.typeBadge, 
                  { backgroundColor: getTypeColor(insight.type) + '20' }
                ]}>
                  <Text style={[
                    styles.typeText, 
                    { color: getTypeColor(insight.type) }
                  ]}>
                    {insight.type.toUpperCase()}
                  </Text>
                </View>
                <View style={[
                  styles.priorityBadge, 
                  { backgroundColor: getPriorityColor(insight.priority) + '20' }
                ]}>
                  <Text style={[
                    styles.priorityText, 
                    { color: getPriorityColor(insight.priority) }
                  ]}>
                    {insight.priority.toUpperCase()} PRIORITY
                  </Text>
                </View>
              </View>
            </View>

            {/* Insight Content */}
            <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
              {insight.title}
            </Text>
            <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
              {insight.description}
            </Text>

            {/* Insight Metrics */}
            <View style={styles.insightMetrics}>
              <View style={styles.metricItem}>
                <TrendingUp size={12} color="#10B981" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Impact
                </Text>
                <Text style={[styles.metricValue, { color: '#10B981' }]}>
                  {insight.impact}
                </Text>
              </View>

              <View style={styles.metricItem}>
                <Clock size={12} color="#8B5CF6" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Timeline
                </Text>
                <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>
                  {insight.timeline}
                </Text>
              </View>

              <View style={styles.metricItem}>
                <CheckCircle size={12} color="#06B6D4" />
                <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                  Confidence
                </Text>
                <Text style={[
                  styles.metricValue, 
                  { color: getConfidenceColor(insight.confidence) }
                ]}>
                  {insight.confidence}%
                </Text>
              </View>
            </View>

            {/* Recommended Actions */}
            <View style={styles.actionsSection}>
              <Text style={[styles.actionsTitle, { color: theme.colors.textSecondary }]}>
                Recommended Actions
              </Text>
              {insight.actions.map((action, index) => (
                <View key={index} style={styles.actionItem}>
                  <ArrowRight size={12} color="#6B7280" />
                  <Text style={[styles.actionText, { color: theme.colors.text }]}>
                    {action}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
  insightsScroll: {
    paddingRight: 16,
  },
  insightCard: {
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    minWidth: 280,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  insightIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightMeta: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 12,
  },
  insightMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 80,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionsSection: {
    marginTop: 8,
  },
  actionsTitle: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  actionText: {
    fontSize: 11,
    flex: 1,
  },
});