import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  performanceScore: number;
  projectsManaged?: string;
  deliveryEfficiency?: string;
  marginImprovement?: string;
  clientsAnalyzed?: string;
  satisfactionPrediction?: string;
  upsellOpportunities?: string;
  renewalInfluence?: string;
  consultantsOptimized?: string;
  utilizationIncrease?: string;
  forecastAccuracy?: string;
  proposalsGenerated?: string;
  winRateImpact?: string;
  turnaroundTime?: string;
  risksPrevented?: string;
  budgetSavings?: string;
  predictionAccuracy?: string;
  status: string;
  lastActivity: string;
  confidenceScore: number;
  engagementImpact: string;
  revenueContribution: string;
  deliveryEfficiencyMetric: string;
  color: string;
}

interface AIProfessionalServicesAgentsProps {
  agents: Agent[];
}

export default function AIProfessionalServicesAgents({ agents }: AIProfessionalServicesAgentsProps) {
  const { theme } = useTheme();

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10B981';
    if (score >= 80) return '#3B82F6';
    if (score >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? '#10B981' : '#F59E0B';
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'High') return '#10B981';
    if (impact === 'Medium') return '#3B82F6';
    return '#8B5CF6';
  };

  const getAgentCategoryColor = (role: string) => {
    if (role.includes('Project Delivery')) return '#3B82F6';
    if (role.includes('Proposal') || role.includes('SOW')) return '#8B5CF6';
    if (role.includes('Client Success')) return '#10B981';
    if (role.includes('Resource')) return '#F59E0B';
    if (role.includes('Risk')) return '#EF4444';
    return '#06B6D4';
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.8)', borderColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1 }]}>
      <View style={styles.headerSection}>
        <Text style={[styles.title, { color: '#10B981' }]}>
          AI Professional Services Agents
        </Text>
        <Text style={[styles.subtitle, { color: 'rgba(255, 255, 255, 0.5)' }]}>
          Enterprise AI Workforce for Consulting Operations
        </Text>
      </View>

      <ScrollView style={styles.agentsScroll} showsVerticalScrollIndicator={false}>
        {agents.map((agent) => (
          <View key={agent.id} style={[styles.agentCard, { backgroundColor: 'rgba(11, 15, 20, 0.6)', borderColor: `${agent.color}40`, borderWidth: 1 }]}>
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{agent.avatar}</Text>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(agent.status) }]} />
              </View>
              <View style={styles.agentInfo}>
                <View style={styles.agentNameRow}>
                  <Text style={[styles.agentName, { color: '#FFFFFF' }]}>{agent.name}</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: `${getAgentCategoryColor(agent.role)}20`, borderColor: getAgentCategoryColor(agent.role) }]}>
                    <Text style={[styles.categoryText, { color: getAgentCategoryColor(agent.role) }]}>
                      {agent.role.split(' ')[0]}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.agentRole, { color: 'rgba(255, 255, 255, 0.6)' }]}>{agent.role}</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: `${getScoreColor(agent.performanceScore)}20` }]}>
                <Text style={[styles.scoreText, { color: getScoreColor(agent.performanceScore) }]}>
                  {agent.performanceScore}
                </Text>
              </View>
            </View>

            {/* Confidence & Impact */}
            <View style={styles.confidenceSection}>
              <View style={styles.confidenceBar}>
                <Text style={[styles.confidenceLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>AI Confidence</Text>
                <View style={styles.confidenceTrack}>
                  <View style={[styles.confidenceFill, { width: `${agent.confidenceScore}%`, backgroundColor: getScoreColor(agent.confidenceScore) }]} />
                </View>
                <Text style={[styles.confidenceValue, { color: getScoreColor(agent.confidenceScore) }]}>{agent.confidenceScore}%</Text>
              </View>
              <View style={[styles.impactBadge, { backgroundColor: `${getImpactColor(agent.engagementImpact)}20` }]}>
                <Text style={[styles.impactText, { color: getImpactColor(agent.engagementImpact) }]}>
                  {agent.engagementImpact} Impact
                </Text>
              </View>
            </View>

            {/* Revenue Contribution */}
            <View style={[styles.revenueSection, { backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }]}>
              <Text style={[styles.revenueLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Revenue Contribution</Text>
              <Text style={[styles.revenueValue, { color: '#10B981' }]}>{agent.revenueContribution}</Text>
            </View>

            {/* Agent Metrics */}
            <View style={styles.metricsGrid}>
              {agent.projectsManaged && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Projects Managed</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.projectsManaged}</Text>
                </View>
              )}
              {agent.deliveryEfficiency && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Delivery Efficiency</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.deliveryEfficiency}</Text>
                </View>
              )}
              {agent.marginImprovement && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Margin Improvement</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.marginImprovement}</Text>
                </View>
              )}
              {agent.clientsAnalyzed && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Clients Analyzed</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.clientsAnalyzed}</Text>
                </View>
              )}
              {agent.satisfactionPrediction && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Satisfaction Prediction</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.satisfactionPrediction}</Text>
                </View>
              )}
              {agent.upsellOpportunities && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Upsell Opportunities</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.upsellOpportunities}</Text>
                </View>
              )}
              {agent.consultantsOptimized && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Consultants Optimized</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.consultantsOptimized}</Text>
                </View>
              )}
              {agent.utilizationIncrease && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Utilization Increase</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.utilizationIncrease}</Text>
                </View>
              )}
              {agent.forecastAccuracy && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Forecast Accuracy</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.forecastAccuracy}</Text>
                </View>
              )}
              {agent.proposalsGenerated && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Proposals Generated</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.proposalsGenerated}</Text>
                </View>
              )}
              {agent.winRateImpact && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Win Rate Impact</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.winRateImpact}</Text>
                </View>
              )}
              {agent.turnaroundTime && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Turnaround Time</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.turnaroundTime}</Text>
                </View>
              )}
              {agent.renewalInfluence && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Renewal Influence</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.renewalInfluence}</Text>
                </View>
              )}
              {agent.risksPrevented && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Risks Prevented</Text>
                  <Text style={[styles.metricValue, { color: '#3B82F6' }]}>{agent.risksPrevented}</Text>
                </View>
              )}
              {agent.budgetSavings && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Budget Savings</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.budgetSavings}</Text>
                </View>
              )}
              {agent.predictionAccuracy && (
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: 'rgba(255, 255, 255, 0.5)' }]}>Prediction Accuracy</Text>
                  <Text style={[styles.metricValue, { color: '#10B981' }]}>{agent.predictionAccuracy}</Text>
                </View>
              )}
            </View>

            {/* Agent Footer */}
            <View style={styles.agentFooter}>
              <View style={styles.footerLeft}>
                <View style={[styles.impactBadge, { backgroundColor: `${getImpactColor(agent.engagementImpact)}20` }]}>
                  <Text style={[styles.impactText, { color: getImpactColor(agent.engagementImpact) }]}>
                    {agent.engagementImpact} Impact
                  </Text>
                </View>
                <Text style={[styles.revenueText, { color: '#10B981' }]}>
                  {agent.revenueContribution}
                </Text>
              </View>
              <View style={styles.footerRight}>
                <Text style={[styles.confidenceText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  Confidence: {agent.confidenceScore}%
                </Text>
                <Text style={[styles.efficiencyText, { color: '#06B6D4' }]}>
                  {agent.deliveryEfficiencyMetric}
                </Text>
              </View>
            </View>

            {/* Activity Status */}
            <View style={styles.activitySection}>
              <View style={styles.activityIndicator}>
                <View style={[styles.activityDot, { backgroundColor: getStatusColor(agent.status) }]} />
                <Text style={[styles.activityText, { color: 'rgba(255, 255, 255, 0.6)' }]}>
                  {agent.lastActivity}
                </Text>
              </View>
              <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>
                {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  headerSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  agentsScroll: {
    maxHeight: 600,
  },
  agentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#0B0F14',
  },
  agentInfo: {
    flex: 1,
  },
  agentNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 9,
    fontWeight: '600',
  },
  agentRole: {
    fontSize: 12,
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
  },
  confidenceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
  },
  confidenceBar: {
    flex: 1,
    marginRight: 12,
  },
  confidenceLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  confidenceTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 4,
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 3,
  },
  confidenceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
  },
  revenueSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
  },
  revenueLabel: {
    fontSize: 10,
  },
  revenueValue: {
    fontSize: 14,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  metricItem: {
    width: '50%',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  agentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  impactBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  impactText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  revenueText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footerRight: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 10,
    marginBottom: 2,
  },
  efficiencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  activityText: {
    fontSize: 11,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
