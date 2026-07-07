import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

interface ProductAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  confidenceScore: number;
  metrics: {
    sessionsAnalyzed?: number;
    insightsGenerated?: number;
    retentionImprovements?: number;
    abTestsRunning?: number;
    winningVariants?: number;
    conversionLift?: number;
    feedbackProcessed?: number;
    sentimentAccuracy?: number;
    featureRequestsClustered?: number;
  };
  productImpact: string;
  recentActivity?: string[];
  capabilities?: string[];
}

interface AIAgentOverviewProps {
  agents: ProductAgent[];
}

export default function AIAgentOverview({ agents }: AIAgentOverviewProps) {
  const { theme } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#22C55E';
      case 'busy': return '#F59E0B';
      case 'offline': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Processing';
      case 'offline': return 'Offline';
      default: return status;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#22C55E';
      default: return '#6B7280';
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(11, 15, 20, 0.95)' }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          AI Product Agents
        </Text>
        <View style={styles.agentStats}>
          <View style={[styles.statBadge, { backgroundColor: 'rgba(34, 197, 94, 0.2)' }]}>
            <Text style={[styles.statText, { color: '#22C55E' }]}>
              {agents.filter(a => a.status === 'online').length} Online
            </Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: 'rgba(245, 158, 11, 0.2)' }]}>
            <Text style={[styles.statText, { color: '#F59E0B' }]}>
              {agents.filter(a => a.status === 'busy').length} Busy
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {agents.map((agent) => (
          <View 
            key={agent.id} 
            style={[
              styles.agentCard, 
              { 
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.08)',
                borderLeftColor: getStatusColor(agent.status)
              }
            ]}
          >
            {/* Agent Header */}
            <View style={styles.agentHeader}>
              <View style={[styles.avatarContainer, { backgroundColor: `${getStatusColor(agent.status)}15` }]}>
                <Text style={[styles.avatarText, { color: getStatusColor(agent.status) }]}>
                  {agent.avatar}
                </Text>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(agent.status) }]} />
              </View>
              <View style={styles.agentInfo}>
                <Text style={[styles.agentName, { color: theme.colors.text }]}>
                  {agent.name}
                </Text>
                <Text style={[styles.agentRole, { color: theme.colors.textSecondary }]}>
                  {agent.role}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(agent.status)}20` }]}>
                <Text style={[styles.statusText, { color: getStatusColor(agent.status) }]}>
                  {getStatusLabel(agent.status)}
                </Text>
              </View>
            </View>

            {/* Performance Scores */}
            <View style={styles.performanceSection}>
              <View style={styles.performanceItem}>
                <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                  AI Confidence
                </Text>
                <View style={styles.performanceBarContainer}>
                  <View 
                    style={[
                      styles.performanceBar, 
                      { 
                        width: `${agent.confidenceScore}%`,
                        backgroundColor: agent.confidenceScore > 90 ? '#22C55E' : agent.confidenceScore > 75 ? '#F59E0B' : '#EF4444'
                      }
                    ]} 
                  />
                </View>
                <Text style={[styles.performanceValue, { color: theme.colors.text }]}>
                  {agent.confidenceScore}%
                </Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={[styles.performanceLabel, { color: theme.colors.textSecondary }]}>
                  Product Impact
                </Text>
                <View style={[styles.impactBadge, { backgroundColor: `${getImpactColor(agent.productImpact)}20` }]}>
                  <Text style={[styles.impactText, { color: getImpactColor(agent.productImpact) }]}>
                    {agent.productImpact}
                  </Text>
                </View>
              </View>
            </View>

            {/* Key Metrics */}
            <View style={styles.metricsGrid}>
              {agent.metrics.sessionsAnalyzed && (
                <View style={styles.metricCard}>
                  <Text style={[styles.metricIcon, { color: '#06B6D4' }]}>📊</Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {(agent.metrics.sessionsAnalyzed / 1000000).toFixed(1)}M
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Sessions
                  </Text>
                </View>
              )}
              {agent.metrics.insightsGenerated && (
                <View style={styles.metricCard}>
                  <Text style={[styles.metricIcon, { color: '#8B5CF6' }]}>💡</Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.metrics.insightsGenerated.toLocaleString()}
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Insights
                  </Text>
                </View>
              )}
              {agent.metrics.abTestsRunning && (
                <View style={styles.metricCard}>
                  <Text style={[styles.metricIcon, { color: '#F59E0B' }]}>🧪</Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text }]}>
                    {agent.metrics.abTestsRunning}
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    A/B Tests
                  </Text>
                </View>
              )}
              {agent.metrics.conversionLift && (
                <View style={styles.metricCard}>
                  <Text style={[styles.metricIcon, { color: '#22C55E' }]}>📈</Text>
                  <Text style={[styles.metricValue, { color: '#22C55E' }]}>
                    +{agent.metrics.conversionLift}%
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.colors.textSecondary }]}>
                    Conv. Lift
                  </Text>
                </View>
              )}
            </View>

            {/* Capabilities */}
            {agent.capabilities && (
              <View style={styles.capabilitiesSection}>
                <Text style={[styles.capabilitiesTitle, { color: theme.colors.textSecondary }]}>
                  Capabilities
                </Text>
                <View style={styles.capabilitiesList}>
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <View key={index} style={[styles.capabilityChip, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
                      <Text style={[styles.capabilityText, { color: '#06B6D4' }]}>
                        {capability}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Recent Activity */}
            {agent.recentActivity && (
              <View style={styles.activitySection}>
                <Text style={[styles.activityTitle, { color: theme.colors.textSecondary }]}>
                  Recent Activity
                </Text>
                {agent.recentActivity.slice(0, 2).map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <View style={[styles.activityDot, { backgroundColor: '#06B6D4' }]} />
                    <Text style={[styles.activityText, { color: theme.colors.text }]}>
                      {activity}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 500,
  },
  agentCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
  },
  impactSection: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  impactItem: {
    flex: 1,
  },
  impactLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  impactValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  metricItem: {
    width: '50%',
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 11,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
  },
});
