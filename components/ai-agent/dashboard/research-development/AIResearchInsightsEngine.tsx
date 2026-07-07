import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Lightbulb, Zap, AlertTriangle, TrendingUp, ArrowRight, CheckCircle, Target, Sparkles } from 'lucide-react-native';

export default function AIResearchInsightsEngine() {
  const { theme } = useTheme();

  const aiInsights = [
    {
      id: 'insight-001',
      type: 'opportunity',
      title: 'Emerging technology identified with 3-year disruption potential',
      description: 'Quantum-resistant cryptography shows 94% probability of market disruption within 3 years',
      confidence: 94,
      impact: 'high',
      actionItems: ['Initiate research program', 'Assess patent landscape', 'Evaluate partnerships']
    },
    {
      id: 'insight-002',
      type: 'opportunity',
      title: 'Research cluster shows strong commercialization opportunity',
      description: 'Neuromorphic computing research cluster indicates 87% commercialization potential',
      confidence: 87,
      impact: 'high',
      actionItems: ['Form cross-functional team', 'Develop prototype', 'Secure funding']
    },
    {
      id: 'insight-003',
      type: 'risk',
      title: 'Patent gap detected in strategic market segment',
      description: 'Competitor patent activity increased 45% in battery technology segment',
      confidence: 91,
      impact: 'high',
      actionItems: ['Conduct patent analysis', 'Accelerate filing', 'Explore licensing']
    },
    {
      id: 'insight-004',
      type: 'opportunity',
      title: 'Experiment series indicates breakthrough probability increase',
      description: 'Quantum coherence experiments show 34% improvement in breakthrough probability',
      confidence: 82,
      impact: 'medium',
      actionItems: ['Scale experiments', 'Document findings', 'Prepare publication']
    },
    {
      id: 'insight-005',
      type: 'intelligence',
      title: 'Competitive research suggests acceleration of AI investment',
      description: 'Top 5 competitors increased AI R&D investment by average of 67%',
      confidence: 89,
      impact: 'medium',
      actionItems: ['Review investment strategy', 'Assess competitive position', 'Adjust priorities']
    }
  ];

  const insightStats = [
    { label: 'Total Insights', value: '1,247', change: '+89', color: '#0B8AFF' },
    { label: 'High Impact', value: '234', change: '+34', color: '#EF4444' },
    { label: 'Implemented', value: '892', change: '+156', color: '#10B981' },
    { label: 'Success Rate', value: '78%', change: '+5%', color: '#8B5CF6' }
  ];

  const trendingTopics = [
    { topic: 'Quantum AI', growth: '+45%', mentions: 234, color: '#0B8AFF' },
    { topic: 'Neuromorphic Computing', growth: '+38%', mentions: 189, color: '#8B5CF6' },
    { topic: 'Solid-State Batteries', growth: '+32%', mentions: 156, color: '#10B981' },
    { topic: 'Bio-Informatics', growth: '+28%', mentions: 134, color: '#F59E0B' }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Sparkles size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            AI Research Insights Engine
          </Text>
        </View>
      </View>

      {/* Insight Statistics */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsScroll}>
        {insightStats.map((stat) => (
          <View 
            key={stat.label}
            style={[
              styles.statCard,
              { 
                backgroundColor: stat.color + '15',
                borderColor: stat.color + '30'
              }
            ]}
          >
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              {stat.label}
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {stat.value}
            </Text>
            <View style={styles.statChange}>
              <TrendingUp size={12} color="#22C55E" />
              <Text style={[styles.statChangeText, { color: '#22C55E' }]}>
                {stat.change}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* AI Insights */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          AI-Generated Insights
        </Text>
        <ScrollView style={styles.insightsScroll} showsVerticalScrollIndicator={false}>
          {aiInsights.map((insight) => (
            <View 
              key={insight.id}
              style={[
                styles.insightCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: insight.type === 'risk' ? '#EF4444' + '30' : 
                           insight.type === 'opportunity' ? '#10B981' + '30' : '#0B8AFF' + '30',
                  borderLeftWidth: insight.type === 'risk' ? 4 : 
                                 insight.type === 'opportunity' ? 4 : 4,
                  borderLeftColor: insight.type === 'risk' ? '#EF4444' : 
                                  insight.type === 'opportunity' ? '#10B981' : '#0B8AFF'
                }
              ]}
            >
              <View style={styles.insightHeader}>
                <View style={styles.insightType}>
                  {insight.type === 'opportunity' && <Lightbulb size={16} color="#10B981" />}
                  {insight.type === 'risk' && <AlertTriangle size={16} color="#EF4444" />}
                  {insight.type === 'intelligence' && <Zap size={16} color="#0B8AFF" />}
                  <Text style={[
                    styles.insightTypeText,
                    { 
                      color: insight.type === 'risk' ? '#EF4444' : 
                             insight.type === 'opportunity' ? '#10B981' : '#0B8AFF'
                    }
                  ]}>
                    {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                  </Text>
                </View>
                <View style={[styles.confidenceBadge, { backgroundColor: '#0B8AFF' + '20' }]}>
                  <Target size={12} color="#0B8AFF" />
                  <Text style={[styles.confidenceText, { color: '#0B8AFF' }]}>
                    {insight.confidence}% confidence
                  </Text>
                </View>
              </View>

              <Text style={[styles.insightTitle, { color: theme.colors.text }]}>
                {insight.title}
              </Text>

              <Text style={[styles.insightDescription, { color: theme.colors.textSecondary }]}>
                {insight.description}
              </Text>

              <View style={styles.actionItemsSection}>
                <Text style={[styles.actionItemsLabel, { color: theme.colors.textSecondary }]}>
                  Recommended Actions
                </Text>
                <View style={styles.actionItemsList}>
                  {insight.actionItems.map((action, index) => (
                    <View key={index} style={styles.actionItem}>
                      <CheckCircle size={12} color="#10B981" />
                      <Text style={[styles.actionItemText, { color: theme.colors.text }]}>
                        {action}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Trending Topics */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Trending Research Topics
        </Text>
        <View style={styles.trendingGrid}>
          {trendingTopics.map((topic) => (
            <View 
              key={topic.topic}
              style={[
                styles.trendingCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={[styles.trendingDot, { backgroundColor: topic.color }]} />
              <Text style={[styles.trendingTopic, { color: theme.colors.text }]}>
                {topic.topic}
              </Text>
              <View style={styles.trendingMetrics}>
                <View style={styles.trendingMetric}>
                  <TrendingUp size={12} color="#22C55E" />
                  <Text style={[styles.trendingGrowth, { color: '#22C55E' }]}>
                    {topic.growth}
                  </Text>
                </View>
                <Text style={[styles.trendingMentions, { color: theme.colors.textSecondary }]}>
                  {topic.mentions} mentions
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Insight Performance */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Insight Performance
        </Text>
        <View style={styles.performanceContainer}>
          <View style={styles.performanceRow}>
            <View style={styles.performanceInfo}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Insight Accuracy
              </Text>
              <Text style={[styles.performanceValue, { color: '#0B8AFF' }]}>
                94%
              </Text>
            </View>
            <View style={[styles.performanceBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.performanceFill, { backgroundColor: '#0B8AFF', width: '94%' }]} />
            </View>
          </View>

          <View style={styles.performanceRow}>
            <View style={styles.performanceInfo}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Implementation Rate
              </Text>
              <Text style={[styles.performanceValue, { color: '#10B981' }]}>
                78%
              </Text>
            </View>
            <View style={[styles.performanceBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.performanceFill, { backgroundColor: '#10B981', width: '78%' }]} />
            </View>
          </View>

          <View style={styles.performanceRow}>
            <View style={styles.performanceInfo}>
              <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                Success Rate
              </Text>
              <Text style={[styles.performanceValue, { color: '#8B5CF6' }]}>
                82%
              </Text>
            </View>
            <View style={[styles.performanceBar, { backgroundColor: theme.colors.border }]}>
              <View style={[styles.performanceFill, { backgroundColor: '#8B5CF6', width: '82%' }]} />
            </View>
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
  statsScroll: {
    marginBottom: 20,
  },
  statCard: {
    width: 120,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  statChange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChangeText: {
    fontSize: 11,
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
  insightsScroll: {
    maxHeight: 400,
  },
  insightCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  insightType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightTypeText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 6,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  insightDescription: {
    fontSize: 12,
    marginBottom: 12,
    lineHeight: 18,
  },
  actionItemsSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  actionItemsLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 8,
  },
  actionItemsList: {
    gap: 6,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionItemText: {
    fontSize: 11,
    marginLeft: 8,
  },
  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trendingCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 10,
  },
  trendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  trendingTopic: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  trendingMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendingGrowth: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  trendingMentions: {
    fontSize: 10,
  },
  performanceContainer: {
    marginTop: 8,
  },
  performanceRow: {
    marginBottom: 16,
  },
  performanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  performanceLabel: {
    fontSize: 12,
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  performanceBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  performanceFill: {
    height: '100%',
    borderRadius: 4,
  },
});