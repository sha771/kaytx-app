import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface KnowledgeGraph {
  nodes: number;
  connections: number;
  expertiseAreas: number;
}

interface KnowledgeManagementSystemProps {
  data: {
    caseStudies?: any;
    bestPractices?: any;
    deliveryTemplates?: any;
    internalKnowledgeBase?: any;
    aiGeneratedInsights?: any;
  };
}

export default function KnowledgeManagementSystem({ data }: KnowledgeManagementSystemProps) {
  const caseStudies = data.caseStudies || {};
  const bestPractices = data.bestPractices || {};
  const deliveryTemplates = data.deliveryTemplates || {};
  const internalKnowledgeBase = data.internalKnowledgeBase || {};
  const aiGeneratedInsights = data.aiGeneratedInsights || {};
  const { theme } = useTheme();

  const knowledgeAreas = [
    { name: 'Digital Transformation', articles: 1240, usage: 89 },
    { name: 'Cloud Migration', articles: 980, usage: 82 },
    { name: 'AI/ML Implementation', articles: 860, usage: 94 },
    { name: 'Data Analytics', articles: 720, usage: 76 },
    { name: 'Security & Compliance', articles: 640, usage: 88 },
  ];

  const topInsights = [
    { title: 'Optimizing Cloud Migration Costs', category: 'Best Practice', impact: 'High', usage: 156 },
    { title: 'AI Implementation Risk Framework', category: 'Framework', impact: 'High', usage: 142 },
    { title: 'Client Communication Templates', category: 'Template', impact: 'Medium', usage: 128 },
    { title: 'Agile Delivery Methodology', category: 'Methodology', impact: 'High', usage: 118 },
    { title: 'Security Assessment Checklist', category: 'Checklist', impact: 'Medium', usage: 98 },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return '#10B981';
      case 'medium': return '#06B6D4';
      case 'low': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <Text style={[styles.title, { color: '#10B981' }]}>
        Knowledge Management System
      </Text>

      {/* Knowledge Overview */}
      <View style={styles.metricsGrid}>
        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Case Studies</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.caseStudies}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>+12% this quarter</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(6, 182, 212, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Best Practices</Text>
          <Text style={[styles.metricValue, { color: '#06B6D4' }]}>{data.bestPractices}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Curated guidelines</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Delivery Templates</Text>
          <Text style={[styles.metricValue, { color: '#8B5CF6' }]}>{data.deliveryTemplates}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Reusable assets</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
          <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>AI Insights</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{data.aiGeneratedInsights}</Text>
          <Text style={[styles.metricSubtitle, { color: 'rgba(255, 255, 255, 0.4)' }]}>Auto-generated</Text>
        </View>
      </View>

      {/* Knowledge Graph */}
      <View style={[styles.graphSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Knowledge Graph Network
        </Text>
        <View style={styles.graphVisualization}>
          <View style={styles.graphCenter}>
            <View style={[styles.graphNode, { backgroundColor: '#10B981' }]} />
            <Text style={[styles.graphCenterText, { color: '#FFFFFF' }]}>Knowledge Hub</Text>
          </View>
          <View style={styles.graphConnections}>
            <View style={[styles.connectionLine, { transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.connectionLine, { transform: [{ rotate: '135deg' }] }]} />
            <View style={[styles.connectionLine, { transform: [{ rotate: '225deg' }] }]} />
            <View style={[styles.connectionLine, { transform: [{ rotate: '315deg' }] }]} />
          </View>
          <View style={styles.graphNodes}>
            <View style={[styles.nodeDot, { backgroundColor: '#06B6D4' }]} />
            <View style={[styles.nodeDot, { backgroundColor: '#8B5CF6' }]} />
            <View style={[styles.nodeDot, { backgroundColor: '#F59E0B' }]} />
            <View style={[styles.nodeDot, { backgroundColor: '#EF4444' }]} />
          </View>
        </View>
        <View style={styles.graphStats}>
          <View style={styles.graphStat}>
            <Text style={[styles.graphStatLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Total Articles</Text>
            <Text style={[styles.graphStatValue, { color: '#FFFFFF' }]}>{internalKnowledgeBase.articles?.toLocaleString() || '15,678'}</Text>
          </View>
          <View style={styles.graphStat}>
            <Text style={[styles.graphStatLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Search Success</Text>
            <Text style={[styles.graphStatValue, { color: '#FFFFFF' }]}>{internalKnowledgeBase.searchSuccess || '94'}%</Text>
          </View>
          <View style={styles.graphStat}>
            <Text style={[styles.graphStatLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Daily Insights</Text>
            <Text style={[styles.graphStatValue, { color: '#FFFFFF' }]}>{aiGeneratedInsights.dailyInsights || '234'}</Text>
          </View>
        </View>
      </View>

      {/* Expertise Areas */}
      <View style={[styles.expertiseSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Expertise Areas
        </Text>
        <ScrollView style={styles.expertiseScroll} showsVerticalScrollIndicator={false}>
          {knowledgeAreas.map((area, index) => (
            <View key={index} style={styles.expertiseCard}>
              <View style={styles.expertiseHeader}>
                <Text style={[styles.expertiseName, { color: '#FFFFFF' }]}>{area.name}</Text>
                <Text style={[styles.expertiseArticles, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {area.articles} articles
                </Text>
              </View>
              <View style={styles.expertiseBar}>
                <View style={[styles.expertiseBarFill, { backgroundColor: '#10B981', width: `${area.usage}%` }]} />
              </View>
              <Text style={[styles.expertiseUsage, { color: '#10B981' }]}>
                {area.usage}% usage rate
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Top Insights */}
      <View style={[styles.insightsSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Top AI-Generated Insights
        </Text>
        <ScrollView style={styles.insightsScroll} showsVerticalScrollIndicator={false}>
          {topInsights.map((insight, index) => (
            <View key={index} style={styles.insightCard}>
              <View style={styles.insightHeader}>
                <View style={styles.insightRank}>
                  <Text style={[styles.rankNumber, { color: '#FFFFFF' }]}>#{index + 1}</Text>
                </View>
                <View style={styles.insightInfo}>
                  <Text style={[styles.insightTitle, { color: '#FFFFFF' }]}>{insight.title}</Text>
                  <View style={styles.insightMeta}>
                    <View style={[styles.categoryBadge, { backgroundColor: 'rgba(6, 182, 212, 0.2)' }]}>
                      <Text style={[styles.categoryText, { color: '#06B6D4' }]}>{insight.category}</Text>
                    </View>
                    <View style={[styles.impactBadge, { backgroundColor: `${getImpactColor(insight.impact)}20` }]}>
                      <Text style={[styles.impactText, { color: getImpactColor(insight.impact) }]}>{insight.impact} Impact</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.insightFooter}>
                <Text style={[styles.usageText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  Used {insight.usage} times this month
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Knowledge Reuse Impact */}
      <View style={[styles.reuseSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Knowledge Reuse Impact
        </Text>
        <View style={styles.reuseGrid}>
          <View style={styles.reuseItem}>
            <Text style={[styles.reuseLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Time Saved</Text>
            <Text style={[styles.reuseValue, { color: '#10B981' }]}>18%</Text>
            <Text style={[styles.reuseDescription, { color: 'rgba(255, 255, 255, 0.4)' }]}>Delivery acceleration</Text>
          </View>
          <View style={styles.reuseItem}>
            <Text style={[styles.reuseLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Quality Score</Text>
            <Text style={[styles.reuseValue, { color: '#06B6D4' }]}>+24%</Text>
            <Text style={[styles.reuseDescription, { color: 'rgba(255, 255, 255, 0.4)' }]}>Consistency improvement</Text>
          </View>
          <View style={styles.reuseItem}>
            <Text style={[styles.reuseLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Cost Reduction</Text>
            <Text style={[styles.reuseValue, { color: '#8B5CF6' }]}>12%</Text>
            <Text style={[styles.reuseDescription, { color: 'rgba(255, 255, 255, 0.4)' }]}>Resource efficiency</Text>
          </View>
        </View>
      </View>

      {/* Search Intelligence */}
      <View style={[styles.searchSection, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
        <Text style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Search Intelligence
        </Text>
        <View style={styles.searchStats}>
          <View style={styles.searchStat}>
            <Text style={[styles.searchLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Daily Searches</Text>
            <Text style={[styles.searchValue, { color: '#FFFFFF' }]}>2,840</Text>
          </View>
          <View style={styles.searchStat}>
            <Text style={[styles.searchLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Success Rate</Text>
            <Text style={[styles.searchValue, { color: '#10B981' }]}>94%</Text>
          </View>
          <View style={styles.searchStat}>
            <Text style={[styles.searchLabel, { color: 'rgba(255, 255, 255, 0.6)' }]}>Avg Response</Text>
            <Text style={[styles.searchValue, { color: '#06B6D4' }]}>0.3s</Text>
          </View>
        </View>
        <View style={styles.topQueries}>
          <Text style={[styles.queriesTitle, { color: 'rgba(255, 255, 255, 0.8)' }]}>Top Search Queries:</Text>
          <View style={styles.queryList}>
            <View style={styles.queryItem}>
              <Text style={[styles.queryText, { color: 'rgba(255, 255, 255, 0.6)' }]}>• Cloud migration best practices</Text>
            </View>
            <View style={styles.queryItem}>
              <Text style={[styles.queryText, { color: 'rgba(255, 255, 255, 0.6)' }]}>• AI implementation framework</Text>
            </View>
            <View style={styles.queryItem}>
              <Text style={[styles.queryText, { color: 'rgba(255, 255, 255, 0.6)' }]}>• Security assessment checklist</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    padding: 14,
    borderRadius: 12,
  },
  metricLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  metricSubtitle: {
    fontSize: 10,
  },
  graphSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  graphVisualization: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  graphCenter: {
    alignItems: 'center',
  },
  graphNode: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  graphCenterText: {
    fontSize: 12,
    fontWeight: '600',
  },
  graphConnections: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  connectionLine: {
    position: 'absolute',
    width: 2,
    height: 50,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    left: 49,
    top: 25,
  },
  graphNodes: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  nodeDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  graphStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  graphStat: {
    alignItems: 'center',
  },
  graphStatLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  graphStatValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  expertiseSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 300,
  },
  expertiseScroll: {
    flex: 1,
  },
  expertiseCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  expertiseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  expertiseName: {
    fontSize: 13,
    fontWeight: '600',
  },
  expertiseArticles: {
    fontSize: 11,
  },
  expertiseBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  expertiseBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  expertiseUsage: {
    fontSize: 10,
    fontWeight: '500',
  },
  insightsSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 350,
  },
  insightsScroll: {
    flex: 1,
  },
  insightCard: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    marginBottom: 8,
  },
  insightHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  insightRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: '700',
  },
  insightInfo: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  insightMeta: {
    flexDirection: 'row',
    gap: 6,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '500',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  usageText: {
    fontSize: 10,
  },
  reuseSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  reuseGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reuseItem: {
    flex: 1,
    alignItems: 'center',
  },
  reuseLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  reuseValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  reuseDescription: {
    fontSize: 10,
  },
  searchSection: {
    padding: 16,
    borderRadius: 12,
  },
  searchStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  searchStat: {
    alignItems: 'center',
  },
  searchLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  searchValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  topQueries: {
    gap: 6,
  },
  queriesTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  queryList: {
    gap: 4,
  },
  queryItem: {
    paddingLeft: 8,
  },
  queryText: {
    fontSize: 11,
  },
});
