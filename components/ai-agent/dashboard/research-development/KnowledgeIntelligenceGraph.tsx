import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Network, FileText, Lightbulb, Users, BookOpen, GitBranch, Link, Star } from 'lucide-react-native';

export default function KnowledgeIntelligenceGraph() {
  const { theme } = useTheme();

  const researchDomains = [
    { name: 'Machine Learning', papers: 12450, connections: 892, color: '#0B8AFF' },
    { name: 'Quantum Computing', papers: 8320, connections: 645, color: '#8B5CF6' },
    { name: 'Biotechnology', papers: 15670, connections: 1203, color: '#10B981' },
    { name: 'Materials Science', papers: 9840, connections: 756, color: '#F59E0B' },
    { name: 'Neuroscience', papers: 7230, connections: 534, color: '#06B6D4' }
  ];

  const conceptRelationships = [
    { from: 'Neural Networks', to: 'Deep Learning', strength: 95, type: 'strong' },
    { from: 'Quantum Entanglement', to: 'Cryptography', strength: 82, type: 'strong' },
    { from: 'CRISPR', to: 'Gene Editing', strength: 91, type: 'strong' },
    { from: 'Graphene', to: 'Battery Tech', strength: 78, type: 'moderate' },
    { from: 'Brain-Computer Interface', to: 'Neuroscience', strength: 85, type: 'strong' }
  ];

  const citationNetwork = [
    { cluster: 'AI Research', papers: 3240, citations: 15600, growth: '+12%', color: '#0B8AFF' },
    { cluster: 'Quantum Physics', papers: 2180, citations: 8900, growth: '+18%', color: '#8B5CF6' },
    { cluster: 'Life Sciences', papers: 4560, citations: 23400, growth: '+8%', color: '#10B981' },
    { cluster: 'Engineering', papers: 2890, citations: 11200, growth: '+15%', color: '#F59E0B' }
  ];

  const researchClusters = [
    {
      name: 'Artificial Intelligence',
      size: 124,
      impact: 94,
      trending: true,
      topics: ['Deep Learning', 'NLP', 'Computer Vision', 'Reinforcement Learning']
    },
    {
      name: 'Quantum Technologies',
      size: 89,
      impact: 88,
      trending: true,
      topics: ['Quantum Computing', 'Cryptography', 'Sensing', 'Communication']
    },
    {
      name: 'Sustainable Energy',
      size: 76,
      impact: 82,
      trending: false,
      topics: ['Solar Cells', 'Battery Tech', 'Hydrogen', 'Grid Storage']
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Network size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Knowledge Intelligence Graph
          </Text>
        </View>
      </View>

      {/* Research Domains */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Research Domains
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {researchDomains.map((domain) => (
            <View 
              key={domain.name}
              style={[
                styles.domainCard,
                { 
                  backgroundColor: domain.color + '15',
                  borderColor: domain.color + '30'
                }
              ]}
            >
              <View style={[styles.domainIcon, { backgroundColor: domain.color + '25' }]}>
                <BookOpen size={20} color={domain.color} />
              </View>
              <Text style={[styles.domainName, { color: theme.colors.text }]}>
                {domain.name}
              </Text>
              <View style={styles.domainMetrics}>
                <View style={styles.domainMetric}>
                  <FileText size={12} color={domain.color} />
                  <Text style={[styles.domainMetricText, { color: theme.colors.textSecondary }]}>
                    {domain.papers.toLocaleString()} papers
                  </Text>
                </View>
                <View style={styles.domainMetric}>
                  <Link size={12} color={domain.color} />
                  <Text style={[styles.domainMetricText, { color: theme.colors.textSecondary }]}>
                    {domain.connections} connections
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Concept Relationships */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Concept Relationship Map
        </Text>
        <View style={styles.relationshipsGrid}>
          {conceptRelationships.map((rel, index) => (
            <View 
              key={index}
              style={[
                styles.relationshipCard,
                { backgroundColor: theme.colors.background }
              ]}
            >
              <View style={styles.relationshipConnection}>
                <Text style={[styles.conceptText, { color: theme.colors.text }]}>
                  {rel.from}
                </Text>
                <GitBranch size={16} color={rel.type === 'strong' ? '#10B981' : '#F59E0B'} />
                <Text style={[styles.conceptText, { color: theme.colors.text }]}>
                  {rel.to}
                </Text>
              </View>
              <View style={styles.strengthBar}>
                <View style={[styles.strengthFill, { 
                  backgroundColor: rel.type === 'strong' ? '#10B981' : '#F59E0B',
                  width: `${rel.strength}%`
                }]} />
                <Text style={[styles.strengthText, { color: theme.colors.textSecondary }]}>
                  {rel.strength}% strength
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Citation Network Analysis */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Citation Network Analysis
        </Text>
        <View style={styles.citationGrid}>
          {citationNetwork.map((cluster) => (
            <View 
              key={cluster.cluster}
              style={[
                styles.citationCard,
                { 
                  backgroundColor: cluster.color + '15',
                  borderColor: cluster.color + '30'
                }
              ]}
            >
              <View style={[styles.citationDot, { backgroundColor: cluster.color }]} />
              <Text style={[styles.citationLabel, { color: theme.colors.text }]}>
                {cluster.cluster}
              </Text>
              <View style={styles.citationMetrics}>
                <View style={styles.citationMetric}>
                  <Text style={[styles.citationValue, { color: theme.colors.text }]}>
                    {cluster.papers.toLocaleString()}
                  </Text>
                  <Text style={[styles.citationSubtext, { color: theme.colors.textSecondary }]}>
                    papers
                  </Text>
                </View>
                <View style={styles.citationMetric}>
                  <Text style={[styles.citationValue, { color: theme.colors.text }]}>
                    {cluster.citations.toLocaleString()}
                  </Text>
                  <Text style={[styles.citationSubtext, { color: theme.colors.textSecondary }]}>
                    citations
                  </Text>
                </View>
              </View>
              <View style={styles.growthBadge}>
                <Star size={12} color="#22C55E" />
                <Text style={[styles.growthText, { color: '#22C55E' }]}>
                  {cluster.growth}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Research Clusters */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Research Clusters
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {researchClusters.map((cluster) => (
            <View 
              key={cluster.name}
              style={[
                styles.clusterCard,
                { 
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border
                }
              ]}
            >
              <View style={styles.clusterHeader}>
                <Text style={[styles.clusterName, { color: theme.colors.text }]}>
                  {cluster.name}
                </Text>
                {cluster.trending && (
                  <View style={[styles.trendingBadge, { backgroundColor: '#F59E0B' + '20' }]}>
                    <Star size={12} color="#F59E0B" />
                    <Text style={[styles.trendingText, { color: '#F59E0B' }]}>
                      Trending
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.clusterMetrics}>
                <View style={styles.clusterMetric}>
                  <Users size={14} color="#0B8AFF" />
                  <Text style={[styles.clusterMetricText, { color: theme.colors.textSecondary }]}>
                    Size: {cluster.size}
                  </Text>
                </View>
                <View style={styles.clusterMetric}>
                  <Lightbulb size={14} color="#10B981" />
                  <Text style={[styles.clusterMetricText, { color: theme.colors.textSecondary }]}>
                    Impact: {cluster.impact}%
                  </Text>
                </View>
              </View>

              <View style={styles.topicsSection}>
                <Text style={[styles.topicsLabel, { color: theme.colors.textSecondary }]}>
                  Key Topics
                </Text>
                <View style={styles.topicsList}>
                  {cluster.topics.map((topic, index) => (
                    <View 
                      key={index}
                      style={[
                        styles.topicBadge,
                        { backgroundColor: '#0B8AFF' + '15' }
                      ]}
                    >
                      <Text style={[styles.topicText, { color: '#0B8AFF' }]}>
                        {topic}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
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
  domainCard: {
    width: 160,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  domainIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  domainName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  domainMetrics: {
    gap: 6,
  },
  domainMetric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  domainMetricText: {
    fontSize: 10,
    marginLeft: 6,
  },
  relationshipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  relationshipCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
  },
  relationshipConnection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  conceptText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  strengthBar: {
    position: 'relative',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 3,
  },
  strengthText: {
    position: 'absolute',
    right: 0,
    top: -16,
    fontSize: 9,
  },
  citationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  citationCard: {
    width: '48%',
    marginRight: '2%',
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  citationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  citationLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  citationMetrics: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  citationMetric: {
    flex: 1,
  },
  citationValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  citationSubtext: {
    fontSize: 10,
  },
  growthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  growthText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  clusterCard: {
    width: 280,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  clusterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clusterName: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendingText: {
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 4,
  },
  clusterMetrics: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  clusterMetric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  clusterMetricText: {
    fontSize: 11,
    marginLeft: 6,
  },
  topicsSection: {
    marginTop: 8,
  },
  topicsLabel: {
    fontSize: 11,
    marginBottom: 8,
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  topicBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  topicText: {
    fontSize: 10,
    fontWeight: '500',
  },
});