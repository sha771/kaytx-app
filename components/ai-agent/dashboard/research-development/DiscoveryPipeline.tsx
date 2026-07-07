import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { TrendingUp, Lightbulb, CheckCircle, ArrowRight, Zap, Target, Clock, DollarSign } from 'lucide-react-native';

export default function DiscoveryPipeline() {
  const { theme } = useTheme();

  const pipelineStages = [
    {
      stage: 'Idea',
      count: 1247,
      value: '$2.4M',
      conversion: 100,
      color: '#0B8AFF'
    },
    {
      stage: 'Research',
      count: 892,
      value: '$8.9M',
      conversion: 72,
      color: '#8B5CF6'
    },
    {
      stage: 'Validation',
      count: 567,
      value: '$24M',
      conversion: 64,
      color: '#10B981'
    },
    {
      stage: 'Prototype',
      count: 234,
      value: '$67M',
      conversion: 41,
      color: '#F59E0B'
    },
    {
      stage: 'Pilot',
      count: 89,
      value: '$89M',
      conversion: 38,
      color: '#06B6D4'
    },
    {
      stage: 'Commercialization',
      count: 34,
      value: '$184M',
      conversion: 38,
      color: '#EC4899'
    }
  ];

  const innovationFunnel = [
    { category: 'Breakthrough Ideas', value: 156, potential: '$4.2B', color: '#0B8AFF' },
    { category: 'Validated Concepts', value: 89, potential: '$2.8B', color: '#8B5CF6' },
    { category: 'Development Ready', value: 45, potential: '$1.2B', color: '#10B981' },
    { category: 'Market Ready', value: 23, potential: '$890M', color: '#F59E0B' }
  ];

  const stageGateAnalytics = [
    { gate: 'Gate 1: Feasibility', passRate: 78, avgTime: '14 days', color: '#0B8AFF' },
    { gate: 'Gate 2: Viability', passRate: 65, avgTime: '21 days', color: '#8B5CF6' },
    { gate: 'Gate 3: Capability', passRate: 54, avgTime: '28 days', color: '#10B981' },
    { gate: 'Gate 4: Market', passRate: 42, avgTime: '35 days', color: '#F59E0B' }
  ];

  const pipelineVelocity = {
    current: '2.4x',
    target: '3.0x',
    improvement: '+0.4x',
    trend: 'positive'
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TrendingUp size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Discovery Pipeline
          </Text>
        </View>
      </View>

      {/* Pipeline Overview */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Innovation Pipeline
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pipelineStages.map((stage, index) => (
            <View key={stage.stage}>
              <View 
                style={[
                  styles.stageCard,
                  { 
                    backgroundColor: stage.color + '15',
                    borderColor: stage.color + '30'
                  }
                ]}
              >
                <Text style={[styles.stageName, { color: theme.colors.text }]}>
                  {stage.stage}
                </Text>
                <Text style={[styles.stageCount, { color: theme.colors.text }]}>
                  {stage.count}
                </Text>
                <Text style={[styles.stageValue, { color: stage.color }]}>
                  {stage.value}
                </Text>
                <View style={styles.conversionSection}>
                  <Text style={[styles.conversionLabel, { color: theme.colors.textSecondary }]}>
                    Conversion
                  </Text>
                  <Text style={[styles.conversionValue, { color: stage.color }]}>
                    {stage.conversion}%
                  </Text>
                </View>
              </View>
              {index < pipelineStages.length - 1 && (
                <ArrowRight size={20} color="#6B7280" style={styles.arrowConnector} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Innovation Funnel */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Innovation Funnel
        </Text>
        <View style={styles.funnelContainer}>
          {innovationFunnel.map((item, index) => (
            <View key={item.category} style={styles.funnelLevel}>
              <View 
                style={[
                  styles.funnelBar,
                  { 
                    backgroundColor: item.color + '30',
                    borderColor: item.color,
                    width: `${100 - (index * 20)}%`
                  }
                ]}
              >
                <View style={styles.funnelBarContent}>
                  <Text style={[styles.funnelCategory, { color: theme.colors.text }]}>
                    {item.category}
                  </Text>
                  <View style={styles.funnelMetrics}>
                    <Text style={[styles.funnelCount, { color: theme.colors.text }]}>
                      {item.value}
                    </Text>
                    <Text style={[styles.funnelPotential, { color: item.color }]}>
                      {item.potential}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Stage Gate Analytics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Stage Gate Analytics
        </Text>
        <View style={styles.gateGrid}>
          {stageGateAnalytics.map((gate) => (
            <View 
              key={gate.gate}
              style={[
                styles.gateCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.gateDot, { backgroundColor: gate.color }]} />
              <Text style={[styles.gateName, { color: theme.colors.text }]}>
                {gate.gate}
              </Text>
              <View style={styles.gateMetrics}>
                <View style={styles.gateMetric}>
                  <Target size={14} color="#0B8AFF" />
                  <Text style={[styles.gateMetricText, { color: theme.colors.textSecondary }]}>
                    Pass Rate: {gate.passRate}%
                  </Text>
                </View>
                <View style={styles.gateMetric}>
                  <Clock size={14} color="#8B5CF6" />
                  <Text style={[styles.gateMetricText, { color: theme.colors.textSecondary }]}>
                    Avg Time: {gate.avgTime}
                  </Text>
                </View>
              </View>
              <View style={[styles.gateProgressBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.gateProgressFill,
                    { 
                      backgroundColor: gate.color,
                      width: `${gate.passRate}%`
                    }
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Pipeline Velocity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Pipeline Velocity
        </Text>
        <View style={[styles.velocityCard, { backgroundColor: theme.colors.background }]}>
          <View style={styles.velocityHeader}>
            <Zap size={24} color="#F59E0B" />
            <View>
              <Text style={[styles.velocityLabel, { color: theme.colors.textSecondary }]}>
                Pipeline Velocity
              </Text>
              <Text style={[styles.velocityValue, { color: theme.colors.text }]}>
                {pipelineVelocity.current}
              </Text>
            </View>
          </View>
          <View style={styles.velocityComparison}>
            <View style={styles.velocityMetric}>
              <Text style={[styles.velocityMetricLabel, { color: theme.colors.textSecondary }]}>
                Target
              </Text>
              <Text style={[styles.velocityMetricValue, { color: '#10B981' }]}>
                {pipelineVelocity.target}
              </Text>
            </View>
            <View style={styles.velocityMetric}>
              <Text style={[styles.velocityMetricLabel, { color: theme.colors.textSecondary }]}>
                Improvement
              </Text>
              <Text style={[styles.velocityMetricValue, { color: '#22C55E' }]}>
                {pipelineVelocity.improvement}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pipeline Value */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Pipeline Value Analysis
        </Text>
        <View style={styles.valueGrid}>
          <View style={[styles.valueCard, { backgroundColor: theme.colors.background }]}>
            <DollarSign size={20} color="#10B981" />
            <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>
              Total Pipeline Value
            </Text>
            <Text style={[styles.valueAmount, { color: theme.colors.text }]}>
              $184M
            </Text>
            <Text style={[styles.valueTrend, { color: '#22C55E' }]}>
              +$12M this quarter
            </Text>
          </View>

          <View style={[styles.valueCard, { backgroundColor: theme.colors.background }]}>
            <Lightbulb size={20} color="#8B5CF6" />
            <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>
              High-Value Projects
            </Text>
            <Text style={[styles.valueAmount, { color: theme.colors.text }]}>
              23
            </Text>
            <Text style={[styles.valueTrend, { color: '#22C55E' }]}>
              +4 new additions
            </Text>
          </View>

          <View style={[styles.valueCard, { backgroundColor: theme.colors.background }]}>
            <CheckCircle size={20} color="#0B8AFF" />
            <Text style={[styles.valueLabel, { color: theme.colors.textSecondary }]}>
              Ready for Commercialization
            </Text>
            <Text style={[styles.valueAmount, { color: theme.colors.text }]}>
              34
            </Text>
            <Text style={[styles.valueTrend, { color: '#22C55E' }]}>
              +6 this quarter
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
  stageCard: {
    width: 120,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  arrowConnector: {
    marginHorizontal: 4,
    marginTop: 20,
  },
  stageName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  stageCount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  stageValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  conversionSection: {
    marginTop: 8,
  },
  conversionLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  conversionValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  funnelContainer: {
    paddingHorizontal: 8,
  },
  funnelLevel: {
    marginBottom: 12,
    alignItems: 'center',
  },
  funnelBar: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  funnelBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  funnelCategory: {
    fontSize: 12,
    fontWeight: '600',
  },
  funnelMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  funnelCount: {
    fontSize: 14,
    fontWeight: '700',
    marginRight: 12,
  },
  funnelPotential: {
    fontSize: 12,
    fontWeight: '600',
  },
  gateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gateCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
  },
  gateDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  gateName: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  gateMetrics: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  gateMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  gateMetricText: {
    fontSize: 10,
    marginLeft: 6,
  },
  gateProgressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  gateProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  velocityCard: {
    padding: 16,
    borderRadius: 12,
  },
  velocityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  velocityLabel: {
    fontSize: 12,
    marginLeft: 12,
  },
  velocityValue: {
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
  },
  velocityComparison: {
    flexDirection: 'row',
  },
  velocityMetric: {
    flex: 1,
  },
  velocityMetricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  velocityMetricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  valueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  valueCard: {
    width: '31%',
    marginRight: '2%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  valueLabel: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 4,
  },
  valueAmount: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  valueTrend: {
    fontSize: 11,
  },
});