import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Bot, Activity, TrendingUp, Zap, CheckCircle, Search } from 'lucide-react-native';

interface ResearchAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'learning' | 'idle';
  confidence: number;
  researchPapersAnalyzed?: number;
  insightsGenerated?: number;
  discoveryAccuracy?: number;
  experimentsManaged?: number;
  successRate?: number;
  optimizationGains?: number;
  technologiesEvaluated?: number;
  opportunitiesIdentified?: number;
  forecastConfidence?: number;
  activeInvestigations: number;
  researchImpactScore: number;
}

interface AIAgentOverviewProps {
  agents: ResearchAgent[];
}

export default function AIAgentOverview({ agents }: AIAgentOverviewProps) {
  const { theme } = useTheme();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Bot size={24} color="#0B8AFF" />
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            AI Research Agents
          </Text>
        </View>
        <View style={[styles.agentCount, { backgroundColor: '#0B8AFF' + '20' }]}>
          <Text style={[styles.agentCountText, { color: '#0B8AFF' }]}>
            {agents.length} Active
          </Text>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.agentScroll}
      >
        {agents.map((agent) => (
          <View 
            key={agent.id}
            style={[
              styles.agentCard, 
              { 
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border
              }
            ]}
          >
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={[
                styles.avatar, 
                { backgroundColor: '#0B8AFF' + '20' }
              ]}>
                <Bot size={28} color="#0B8AFF" />
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>
                  {agent.name}
                </Text>
                <Text style={[styles.agentType, { color: theme.colors.textSecondary }]}>
                  {agent.type}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                { 
                  backgroundColor: agent.status === 'active' ? '#22C55E' + '20' : '#F59E0B' + '20'
                }
              ]}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: agent.status === 'active' ? '#22C55E' : '#F59E0B' }
                ]} />
                <Text style={[
                  styles.statusText,
                  { 
                    color: agent.status === 'active' ? '#22C55E' : '#F59E0B'
                  }
                ]}>
                  {agent.status}
                </Text>
              </View>
            </View>

            {/* Agent Metrics */}
            <View style={styles.metricsGrid}>
              {agent.researchPapersAnalyzed && (
                <View style={styles.metricItem}>
                  <Activity size={16} color="#3B82F6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Papers Analyzed
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {formatNumber(agent.researchPapersAnalyzed)}
                  </Text>
                </View>
              )}
              
              {agent.insightsGenerated && (
                <View style={styles.metricItem}>
                  <Zap size={16} color="#8B5CF6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Insights Generated
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {formatNumber(agent.insightsGenerated)}
                  </Text>
                </View>
              )}

              {agent.discoveryAccuracy && (
                <View style={styles.metricItem}>
                  <TrendingUp size={16} color="#10B981" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Discovery Accuracy
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.discoveryAccuracy}%
                  </Text>
                </View>
              )}

              {agent.experimentsManaged && (
                <View style={styles.metricItem}>
                  <Activity size={16} color="#3B82F6" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Experiments Managed
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {formatNumber(agent.experimentsManaged)}
                  </Text>
                </View>
              )}

              {agent.successRate && (
                <View style={styles.metricItem}>
                  <CheckCircle size={16} color="#22C55E" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Success Rate
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.successRate}%
                  </Text>
                </View>
              )}

              {agent.optimizationGains && (
                <View style={styles.metricItem}>
                  <TrendingUp size={16} color="#F59E0B" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Optimization Gains
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.optimizationGains}%
                  </Text>
                </View>
              )}

              {agent.technologiesEvaluated && (
                <View style={styles.metricItem}>
                  <Search size={16} color="#06B6D4" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Technologies Evaluated
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {formatNumber(agent.technologiesEvaluated)}
                  </Text>
                </View>
              )}

              {agent.opportunitiesIdentified && (
                <View style={styles.metricItem}>
                  <Zap size={16} color="#EC4899" />
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Opportunities Identified
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {formatNumber(agent.opportunitiesIdentified)}
                  </Text>
                </View>
              )}
            </View>

            {/* Agent Score */}
            <View style={styles.scoreSection}>
              <View style={styles.scoreRow}>
                <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                  Confidence Score
                </Text>
                <Text style={[styles.scoreValue, { color: '#0B8AFF' }]}>
                  {agent.confidence}%
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: '#0B8AFF',
                      width: `${agent.confidence}%`
                    }
                  ]} 
                />
              </View>
              
              <View style={styles.scoreRow}>
                <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                  Research Impact
                </Text>
                <Text style={[styles.scoreValue, { color: '#10B981' }]}>
                  {agent.researchImpactScore}%
                </Text>
              </View>
              <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      backgroundColor: '#10B981',
                      width: `${agent.researchImpactScore}%`
                    }
                  ]} 
                />
              </View>

              <View style={styles.scoreRow}>
                <Text style={[styles.scoreLabel, { color: theme.colors.textSecondary }]}>
                  Active Investigations
                </Text>
                <Text style={[styles.scoreValue, { color: '#8B5CF6' }]}>
                  {agent.activeInvestigations}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
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
    justifyContent: 'space-between',
    marginBottom: 16,
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
  agentCount: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  agentCountText: {
    fontSize: 12,
    fontWeight: '600',
  },
  agentScroll: {
    paddingRight: 8,
  },
  agentCard: {
    width: 280,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    marginRight: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  agentType: {
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  metricItem: {
    width: '50%',
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  scoreSection: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  scoreLabel: {
    fontSize: 11,
  },
  scoreValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});